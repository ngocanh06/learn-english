/**
 * Adaptive Roadmap Engine
 * Handles assessment results, competency gates, remediation, and dynamic roadmap recalculation.
 */

import { generatePersonalizedRoadmap } from './personalizedRoadmapEngine.js';
import { normalizeUserProfile, cefrToNumeric, numericToCefr } from '../config/userSkillProfileModel.js';

/**
 * Evaluates whether a user passes the competency gate of a phase
 */
export function evaluatePhaseGate(phase, assessmentResult) {
  const gate = phase.competencyGate;
  if (!gate) return { passed: true, reason: 'Không có điều kiện cổng khắt khe cho phase này.' };

  const reasons = [];
  let passed = true;

  if (gate.minGrammarCheckpointScore && assessmentResult.grammarScore !== undefined) {
    if (assessmentResult.grammarScore < gate.minGrammarCheckpointScore) {
      passed = false;
      reasons.push(`Điểm Ngữ pháp (${assessmentResult.grammarScore}%) chưa đạt ngưỡng tối thiểu ${gate.minGrammarCheckpointScore}%.`);
    }
  }

  if (gate.minListeningAccuracy && assessmentResult.listeningAccuracy !== undefined) {
    if (assessmentResult.listeningAccuracy < gate.minListeningAccuracy) {
      passed = false;
      reasons.push(`Độ chính xác Nghe (${assessmentResult.listeningAccuracy}%) chưa đạt ngưỡng tối thiểu ${gate.minListeningAccuracy}%.`);
    }
  }

  if (gate.minReadingAccuracy && assessmentResult.readingAccuracy !== undefined) {
    if (assessmentResult.readingAccuracy < gate.minReadingAccuracy) {
      passed = false;
      reasons.push(`Độ chính xác Đọc (${assessmentResult.readingAccuracy}%) chưa đạt ngưỡng tối thiểu ${gate.minReadingAccuracy}%.`);
    }
  }

  if (gate.mockScoreThreshold && assessmentResult.mockScore !== undefined) {
    if (assessmentResult.mockScore < gate.mockScoreThreshold) {
      passed = false;
      reasons.push(`Điểm thi thử (${assessmentResult.mockScore}) chưa chạm ngưỡng chuẩn ${gate.mockScoreThreshold} điểm.`);
    }
  }

  return {
    passed,
    reasons,
    summary: passed
      ? 'Chúc mừng! Bạn đã vượt qua Cổng Năng Lực (Competency Gate) để mở khóa Phase tiếp theo.'
      : `Chưa đạt điều kiện chuyển Phase. Hệ thống kích hoạt Gói Củng Cố Bổ Sung (Remediation Plan).`,
    gateDetails: gate,
  };
}

/**
 * Ingests a new assessment result, updates the user's skill profile,
 * and recalculates the dynamic roadmap.
 */
export function adaptRoadmapWithAssessment(currentUserProfile, currentGoal, assessmentResult) {
  const profile = normalizeUserProfile(currentUserProfile);
  const updatedSkills = { ...profile.skills };

  // Adjust skill levels based on test performance
  // E.g. If listening scored 85%+, bump listening CEFR by 0.5 step
  if (assessmentResult.skillScores) {
    Object.keys(assessmentResult.skillScores).forEach((skill) => {
      const score = assessmentResult.skillScores[skill]; // percentage 0-100 or Band
      const currentNum = cefrToNumeric(updatedSkills[skill] || 'A2');
      let newNum = currentNum;

      if (score >= 85) {
        newNum = Math.min(6.0, currentNum + 0.5);
      } else if (score >= 70) {
        newNum = Math.min(6.0, currentNum + 0.25);
      } else if (score < 45) {
        // slight drop or weakness detected
        newNum = Math.max(1.0, currentNum - 0.25);
      }

      updatedSkills[skill] = numericToCefr(newNum);
    });
  }

  // Update mock history
  const updatedMockHistory = [...(profile.mockHistory || [])];
  if (assessmentResult.mockScore) {
    updatedMockHistory.push({
      date: new Date().toISOString(),
      score: assessmentResult.mockScore,
      details: assessmentResult,
    });
  }

  const updatedProfile = {
    ...profile,
    skills: updatedSkills,
    mockHistory: updatedMockHistory,
    assessmentHistory: [
      ...(profile.assessmentHistory || []),
      {
        date: new Date().toISOString(),
        assessmentResult,
      },
    ],
  };

  // Re-generate the entire personalized roadmap with the updated skill profile
  const newRoadmap = generatePersonalizedRoadmap(updatedProfile, currentGoal);

  return {
    updatedProfile,
    newRoadmap,
    adaptationNotes: 'Lộ trình và tỷ trọng thời gian đã được tự động điều chỉnh theo kết quả đánh giá mới nhất.',
  };
}
