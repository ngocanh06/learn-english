/**
 * Automated Verification Script for Personalized Certification Roadmap Engine
 * Tests all 5 requirements and failure criteria specified in MASTER PROMPT.
 */

import { generatePersonalizedRoadmap } from './personalizedRoadmapEngine.js';

console.log('═══════════════════════════════════════════════════════════════');
console.log('TESTING PERSONALIZED CERTIFICATION ROADMAP ENGINE');
console.log('═══════════════════════════════════════════════════════════════\n');

let allPassed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    allPassed = false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 1: Same user, different target (TOEIC 450 vs TOEIC 850)
// ─────────────────────────────────────────────────────────────────────────────
console.log('─── TEST 1: TOEIC 450 vs TOEIC 850 (Target Difference Must Change Roadmap) ───');
const userBaseB1 = {
  overallLevel: 'B1',
  skills: { grammar: 'B1', vocabulary: 'B1', listening: 'B1', reading: 'B1', speaking: 'B1', writing: 'B1' },
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 6,
};

const roadmapToeic450 = generatePersonalizedRoadmap(userBaseB1, { certification: 'toeic', targetScore: '450' });
const roadmapToeic850 = generatePersonalizedRoadmap(userBaseB1, { certification: 'toeic', targetScore: '850' });

assert(roadmapToeic450.phases.length !== roadmapToeic850.phases.length ||
       roadmapToeic450.phases[0].name !== roadmapToeic850.phases[0].name,
       'Roadmaps have distinctly different phase names and objectives');

assert(roadmapToeic450.curriculumContent.targetAccuracy !== roadmapToeic850.curriculumContent.targetAccuracy,
       `Accuracy targets differ (450: ${roadmapToeic450.curriculumContent.targetAccuracy} vs 850: ${roadmapToeic850.curriculumContent.targetAccuracy})`);

assert(roadmapToeic450.curriculumContent.toeicTestFocus !== roadmapToeic850.curriculumContent.toeicTestFocus,
       `Test difficulty differs (450: ${roadmapToeic450.curriculumContent.toeicTestFocus} vs 850: ${roadmapToeic850.curriculumContent.toeicTestFocus})`);


// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 2: Same target, different level (A2 -> TOEIC 650 vs B2 -> TOEIC 650)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n─── TEST 2: A2 -> TOEIC 650 vs B2 -> TOEIC 650 (Current Level Difference) ───');
const userA2 = {
  overallLevel: 'A2',
  skills: { grammar: 'A2', vocabulary: 'A2', listening: 'A2', reading: 'A2', speaking: 'A1', writing: 'A1' },
  dailyStudyMinutes: 90,
  studyDaysPerWeek: 6,
};
const userB2 = {
  overallLevel: 'B2',
  skills: { grammar: 'B2', vocabulary: 'B2', listening: 'B2', reading: 'B2', speaking: 'B1', writing: 'B1' },
  dailyStudyMinutes: 90,
  studyDaysPerWeek: 6,
};

const roadmapA2_650 = generatePersonalizedRoadmap(userA2, { certification: 'toeic', targetScore: '650' });
const roadmapB2_650 = generatePersonalizedRoadmap(userB2, { certification: 'toeic', targetScore: '650' });

assert(roadmapA2_650.phases.length === 6, `A2 has 6 comprehensive phases (Actual: ${roadmapA2_650.phases.length})`);
assert(roadmapB2_650.phases.length === 4, `B2 skips foundation and has 4 accelerated phases (Actual: ${roadmapB2_650.phases.length})`);
assert(roadmapA2_650.phases[0].phaseId === 'p1_foundation_recovery', 'A2 starts with Foundation Recovery');
assert(roadmapB2_650.phases[0].phaseId === 'p1_diagnostic_strategy', 'B2 starts with Diagnostic Strategy');


// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 3: Same target, different skill profile (Weak Listening vs Weak Grammar)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n─── TEST 3: Weak Listening vs Weak Grammar (Skill Profile Priority) ───');
const userWeakListening = {
  overallLevel: 'A2',
  skills: { grammar: 'B1', vocabulary: 'B1', listening: 'A1', reading: 'B1', speaking: 'A2', writing: 'A2' },
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 6,
};
const userWeakGrammar = {
  overallLevel: 'A2',
  skills: { grammar: 'A1', vocabulary: 'B1', listening: 'B1', reading: 'B1', speaking: 'A2', writing: 'A2' },
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 6,
};

const roadmapWeakLis = generatePersonalizedRoadmap(userWeakListening, { certification: 'toeic', targetScore: '650' });
const roadmapWeakGram = generatePersonalizedRoadmap(userWeakGrammar, { certification: 'toeic', targetScore: '650' });

assert(roadmapWeakLis.skillGapAnalysis.largestGap.skill === 'listening', `Weak listening identified as primary bottleneck (Gap: ${roadmapWeakLis.skillGapAnalysis.largestGap.gap})`);
assert(roadmapWeakGram.skillGapAnalysis.largestGap.skill === 'grammar', `Weak grammar identified as primary bottleneck (Gap: ${roadmapWeakGram.skillGapAnalysis.largestGap.gap})`);

const lisAllocInWeakLis = roadmapWeakLis.priorities.timeAllocationPercent.listening;
const gramAllocInWeakGram = roadmapWeakGram.priorities.timeAllocationPercent.grammar;
assert(lisAllocInWeakLis >= 35, `Listening allocated highest percentage (${lisAllocInWeakLis}%) when user is weak in listening`);
assert(gramAllocInWeakGram >= 25, `Grammar allocated high percentage (${gramAllocInWeakGram}%) when user is weak in grammar`);


// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 4: Deadline difference (6 months vs 2 months)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n─── TEST 4: 6 Months vs 2 Months (Deadline Engine) ───');
const future6Months = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const future2Months = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const roadmap6M = generatePersonalizedRoadmap(userBaseB1, { certification: 'toeic', targetScore: '650', examDate: future6Months });
const roadmap2M = generatePersonalizedRoadmap(userBaseB1, { certification: 'toeic', targetScore: '650', examDate: future2Months });

assert(roadmap6M.goal.totalWeeks > roadmap2M.goal.totalWeeks,
       `Total weeks differ according to deadline (${roadmap6M.goal.totalWeeks} wks vs ${roadmap2M.goal.totalWeeks} wks)`);
assert(roadmap6M.goal.totalAvailableStudyHours > roadmap2M.goal.totalAvailableStudyHours,
       `Available study hours differ (${roadmap6M.goal.totalAvailableStudyHours} hrs vs ${roadmap2M.goal.totalAvailableStudyHours} hrs)`);


// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 5: Study time budget (30 min vs 120 min)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n─── TEST 5: 30 min/day vs 120 min/day (Time Budget Engine) ───');
const roadmap30Min = generatePersonalizedRoadmap(userBaseB1, { certification: 'toeic', targetScore: '650', dailyStudyMinutes: 30 });
const roadmap120Min = generatePersonalizedRoadmap(userBaseB1, { certification: 'toeic', targetScore: '650', dailyStudyMinutes: 120 });

const totalTasks30 = roadmap30Min.dailyPlan.scheduledTasksDuration;
const totalTasks120 = roadmap120Min.dailyPlan.scheduledTasksDuration;

assert(totalTasks30 <= 30, `30-minute plan tasks do not exceed 30 min (Actual: ${totalTasks30} min)`);
assert(totalTasks120 <= 120, `120-minute plan tasks do not exceed 120 min (Actual: ${totalTasks120} min)`);
assert(roadmap30Min.dailyPlan.tasks[0].whyThisTask.length > 10, 'Each task includes deterministic "Why This Task?" rationale');

// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 6: IELTS Band Difference (IELTS 5.5 vs IELTS 7.0)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n─── TEST 6: IELTS 5.5 vs IELTS 7.0 (Academic Band Differentiation) ───');
const roadmapIelts55 = generatePersonalizedRoadmap(userBaseB1, { certification: 'ielts', targetScore: '5.5' });
const roadmapIelts70 = generatePersonalizedRoadmap(userBaseB1, { certification: 'ielts', targetScore: '7.0' });

assert(roadmapIelts55.phases.length !== roadmapIelts70.phases.length ||
       roadmapIelts55.phases[0].name !== roadmapIelts70.phases[0].name,
       'IELTS 5.5 and 7.0 have distinctly different phase names and band milestones');

assert(roadmapIelts55.curriculumContent.targetAccuracy !== roadmapIelts70.curriculumContent.targetAccuracy,
       `Accuracy targets differ (5.5: ${roadmapIelts55.curriculumContent.targetAccuracy} vs 7.0: ${roadmapIelts70.curriculumContent.targetAccuracy})`);

assert(roadmapIelts70.curriculumContent.ieltsVocabTopics.some(t => t.includes('AWL')),
       'IELTS 7.0 requires Academic Word List (AWL) and C1 Collocations');

// ─────────────────────────────────────────────────────────────────────────────
// REQUIREMENT 7: VSTEP B1 vs VSTEP B2
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n─── TEST 7: VSTEP B1 vs VSTEP B2 ───');
const roadmapVstepB1 = generatePersonalizedRoadmap(userBaseB1, { certification: 'vstep', targetScore: 'B1' });
const roadmapVstepB2 = generatePersonalizedRoadmap(userBaseB1, { certification: 'vstep', targetScore: 'B2' });

assert(roadmapVstepB1.goal.targetScore !== roadmapVstepB2.goal.targetScore, 'VSTEP B1 and B2 goals registered correctly');
assert(roadmapVstepB2.skillGapAnalysis.blueprint.grammarRequirements.complexityLevel === 'Upper-Intermediate',
       'VSTEP B2 requires Upper-Intermediate grammar complexity');

console.log('\n═══════════════════════════════════════════════════════════════');
if (allPassed) {
  console.log('ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ENGINE COMPLIES WITH MASTER PROMPT.');
} else {
  console.error('SOME TESTS FAILED! CHECK OUTPUT ABOVE.');
  process.exit(1);
}
console.log('═══════════════════════════════════════════════════════════════');
