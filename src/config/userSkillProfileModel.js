/**
 * User Skill Profile Model & Helper Utilities
 * Manages fine-grained per-skill levels (CEFR & Numeric) and history.
 */

export const CEFR_NUMERIC_SCALE = {
  'A1-': 0.5,
  'A1': 1.0,
  'A1+': 1.5,
  'A2-': 1.75,
  'A2': 2.0,
  'A2+': 2.5,
  'B1-': 2.75,
  'B1': 3.0,
  'B1+': 3.5,
  'B2-': 3.75,
  'B2': 4.0,
  'B2+': 4.5,
  'C1-': 4.75,
  'C1': 5.0,
  'C1+': 5.5,
  'C2': 6.0,
};

export const CEFR_LABELS = {
  'A1': 'A1 - Căn bản / Mới bắt đầu',
  'A2': 'A2 - Sơ cấp',
  'B1': 'B1 - Trung cấp',
  'B2': 'B2 - Trung cao cấp',
  'C1': 'C1 - Cao cấp',
  'C2': 'C2 - Thành thạo bản xứ',
};

/**
 * Convert CEFR letter code to numeric score (1.0 to 6.0)
 */
export function cefrToNumeric(cefrCode) {
  if (!cefrCode) return 2.0; // default A2
  const cleaned = String(cefrCode).trim().toUpperCase();
  return CEFR_NUMERIC_SCALE[cleaned] || 2.0;
}

/**
 * Convert numeric score back to CEFR string
 */
export function numericToCefr(num) {
  if (num < 1.4) return 'A1';
  if (num < 2.4) return 'A2';
  if (num < 3.4) return 'B1';
  if (num < 4.4) return 'B2';
  if (num < 5.4) return 'C1';
  return 'C2';
}

/**
 * Standardize user skill profile, ensuring all skills are populated.
 * If individual skills are omitted, they inherit from overallLevel.
 */
export function normalizeUserProfile(rawProfile = {}) {
  const overallLevel = rawProfile.overallLevel || rawProfile.currentLevel || 'A2';
  const defaultSkillLevel = overallLevel;

  const rawSkills = rawProfile.skills || rawProfile.skillLevels || {};

  const skills = {
    grammar: rawSkills.grammar || rawProfile.grammarLevel || defaultSkillLevel,
    vocabulary: rawSkills.vocabulary || rawProfile.vocabLevel || defaultSkillLevel,
    listening: rawSkills.listening || rawProfile.listeningLevel || defaultSkillLevel,
    reading: rawSkills.reading || rawProfile.readingLevel || defaultSkillLevel,
    speaking: rawSkills.speaking || rawProfile.speakingLevel || defaultSkillLevel,
    writing: rawSkills.writing || rawProfile.writingLevel || defaultSkillLevel,
    pronunciation: rawSkills.pronunciation || defaultSkillLevel,
  };

  return {
    userId: rawProfile.userId || 'current_user',
    name: rawProfile.name || 'Học viên',
    overallLevel,
    skills,
    learningGoal: rawProfile.learningGoal || 'certification',
    certification: rawProfile.certification || 'ielts',
    targetScore: rawProfile.targetScore || '6.5',
    examDate: rawProfile.examDate || null, // YYYY-MM-DD or null
    dailyStudyMinutes: Number(rawProfile.dailyStudyMinutes || rawProfile.dailyGoalMin || 60),
    studyDaysPerWeek: Number(rawProfile.studyDaysPerWeek || 6),
    mockHistory: rawProfile.mockHistory || [],
    assessmentHistory: rawProfile.assessmentHistory || [],
    completedMilestones: rawProfile.completedMilestones || [],
    onboardingCompleted: rawProfile.onboardingCompleted ?? true,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Estimate current score equivalent for a certification based on user profile
 */
export function estimateCurrentScore(userProfile, certificationId) {
  const profile = normalizeUserProfile(userProfile);
  const cert = certificationId ? certificationId.toLowerCase() : 'toeic';

  // Calculate weighted competency
  const lisNum = cefrToNumeric(profile.skills.listening);
  const readNum = cefrToNumeric(profile.skills.reading);
  const gramNum = cefrToNumeric(profile.skills.grammar);
  const vocNum = cefrToNumeric(profile.skills.vocabulary);
  const writeNum = cefrToNumeric(profile.skills.writing);
  const speakNum = cefrToNumeric(profile.skills.speaking);

  if (cert === 'toeic') {
    // TOEIC 10-990 based primarily on Listening (45%), Reading (45%), Gram/Vocab (10%)
    const composite = lisNum * 0.4 + readNum * 0.4 + gramNum * 0.1 + vocNum * 0.1;
    // Map composite (1.0 = 200, 2.0 = 390, 3.0 = 550, 4.0 = 750, 5.0 = 900)
    let estimated = Math.round(100 + composite * 160);
    // Clamp to 10 - 990, rounded to nearest 5
    estimated = Math.min(990, Math.max(100, Math.round(estimated / 5) * 5));
    return {
      estimatedScore: estimated,
      scoreUnit: 'điểm',
      accuracyReliability: profile.mockHistory.length > 0 ? 'High (Từ kết quả Mock)' : 'Estimated (Dựa trên CEFR Profile)',
    };
  }

  if (cert === 'ielts') {
    // IELTS 0 - 9.0 based on 4 skills equally
    const composite = (lisNum + readNum + writeNum + speakNum) / 4;
    // Map 1.0 (A1) -> 3.5, 2.0 (A2) -> 4.5, 3.0 (B1) -> 5.5, 4.0 (B2) -> 6.5, 5.0 (C1) -> 7.5
    let band = 2.5 + composite * 1.0;
    // Round to nearest 0.5
    band = Math.round(band * 2) / 2;
    band = Math.min(9.0, Math.max(3.0, band));
    return {
      estimatedScore: band.toFixed(1),
      scoreUnit: 'Band',
      accuracyReliability: profile.mockHistory.length > 0 ? 'High' : 'Estimated',
    };
  }

  if (cert === 'vstep') {
    const composite = (lisNum + readNum + writeNum + speakNum) / 4;
    let score = composite * 1.6;
    score = Math.round(score * 2) / 2;
    return {
      estimatedScore: score.toFixed(1),
      scoreUnit: '/ 10',
      accuracyReliability: 'Estimated',
    };
  }

  return {
    estimatedScore: profile.overallLevel,
    scoreUnit: 'CEFR',
    accuracyReliability: 'Estimated',
  };
}
