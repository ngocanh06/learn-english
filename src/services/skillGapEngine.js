/**
 * Skill Gap Engine
 * Computes exact gap between Required Competency (Target Blueprint)
 * and Current Competency (User Skill Profile) for each skill.
 */

import { cefrToNumeric, estimateCurrentScore, normalizeUserProfile } from '../config/userSkillProfileModel.js';
import { getTargetBlueprint } from '../config/targetBlueprints.js';

export function calculateSkillGaps(userProfile, targetBlueprintOrGoal) {
  const profile = normalizeUserProfile(userProfile);

  let blueprint = null;
  if (targetBlueprintOrGoal && targetBlueprintOrGoal.requiredSkillCompetencies) {
    blueprint = targetBlueprintOrGoal;
  } else {
    const certId = targetBlueprintOrGoal?.certification || profile.certification;
    const targetScore = targetBlueprintOrGoal?.targetScore || profile.targetScore;
    blueprint = getTargetBlueprint(certId, targetScore);
  }

  if (!blueprint) {
    // Fallback if blueprint not found: build standard B1 requirements
    blueprint = {
      targetId: 'generic_fallback',
      score: profile.targetScore || 'B1',
      requiredSkillCompetencies: {
        listening: 'B1',
        reading: 'B1',
        writing: 'B1',
        speaking: 'B1',
        grammar: 'B1',
        vocabulary: 'B1',
        pronunciation: 'B1',
      },
      prioritySkills: ['listening', 'reading', 'vocabulary'],
    };
  }

  const skillGaps = {};
  let totalDeficit = 0;
  let largestGap = { skill: null, gap: -1 };
  let smallestGap = { skill: null, gap: 999 };

  const skillsToEvaluate = ['listening', 'reading', 'writing', 'speaking', 'grammar', 'vocabulary', 'pronunciation'];

  skillsToEvaluate.forEach((skill) => {
    const currentCefr = profile.skills[skill] || profile.overallLevel || 'A2';
    const requiredCefr = blueprint.requiredSkillCompetencies[skill] || 'B1';

    const currentScore = cefrToNumeric(currentCefr);
    const requiredScore = cefrToNumeric(requiredCefr);

    const gap = Math.max(0, +(requiredScore - currentScore).toFixed(2));
    totalDeficit += gap;

    let gapLevel = 'None';
    if (gap >= 1.5) gapLevel = 'Critical';
    else if (gap >= 1.0) gapLevel = 'High';
    else if (gap >= 0.5) gapLevel = 'Medium';
    else if (gap > 0) gapLevel = 'Low';
    else gapLevel = 'Satisfied';

    skillGaps[skill] = {
      skill,
      currentCefr,
      requiredCefr,
      currentNumeric: currentScore,
      requiredNumeric: requiredScore,
      gap,
      gapLevel,
      isTargetPriority: blueprint.prioritySkills.includes(skill),
    };

    if (gap > largestGap.gap) {
      largestGap = { skill, gap, gapLevel };
    }
    if (gap < smallestGap.gap) {
      smallestGap = { skill, gap, gapLevel };
    }
  });

  // Target Score Gap (e.g. 650 - 390 = 260)
  const currentEstimation = estimateCurrentScore(profile, blueprint.certificationId);
  let numericalTargetScore = typeof blueprint.score === 'number' ? blueprint.score : parseFloat(blueprint.score);
  let currentNumScore = parseFloat(currentEstimation.estimatedScore);

  let scoreGap = null;
  if (!isNaN(numericalTargetScore) && !isNaN(currentNumScore)) {
    scoreGap = Math.max(0, +(numericalTargetScore - currentNumScore).toFixed(1));
  }

  return {
    targetId: blueprint.targetId,
    certificationId: blueprint.certificationId,
    targetScore: blueprint.score,
    currentEstimatedScore: currentEstimation.estimatedScore,
    scoreUnit: currentEstimation.scoreUnit,
    targetScoreGap: scoreGap,
    totalSkillDeficit: +totalDeficit.toFixed(2),
    skillGaps,
    primaryBottleneck: largestGap.skill,
    largestGap,
    isMeetingTarget: totalDeficit === 0,
    blueprint,
  };
}
