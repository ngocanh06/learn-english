// ─── DAILY DICTATION PROGRESS UTILITIES ───
// Centralized helper for checking, syncing, and auto-completing DailyDictation 3-track combo tasks.

export const DEFAULT_DICTATION_STARS = {
  // Short Stories completed baseline (up to 79, excluding diamond 80)
  'ss-67': true,
  'ss-74': true,
  // Conversations completed baseline (up to 67)
  'cv-61': true,
  'cv-62': true,
  'cv-63': true,
  'cv-64': true,
  'cv-65': true,
  'cv-66': true,
  'cv-67': true,
  // TOEIC Listening completed baseline (up to 37)
  'tc-31': true,
  'tc-32': true,
  'tc-33': true,
  'tc-34': true,
  'tc-35': true,
  'tc-36': true,
  'tc-37': true,
};

/**
 * Checks if a specific dictation lesson is locked with PRO Diamond 💎.
 * On DailyDictation, every 10th lesson (10, 20, 30... 300) and SS 288 require PRO upgrade.
 */
export const isDiamondLesson = (lessonId) => {
  if (!lessonId) return false;
  const num = parseInt(lessonId.match(/\d+/)?.[0] || '0', 10);
  if (num === 0) return false;
  if (num % 10 === 0) return true;
  if (lessonId.startsWith('ss-') && num === 288) return true;
  return false;
};

/**
 * Checks if a specific dictation lesson is completed/starred.
 * Diamond lessons require PRO upgrade and are NEVER auto-completed.
 *
 * @param {string} lessonId - e.g. 'ss-81', 'cv-68', 'tc-38'
 * @param {Object} dictationStars - the user's stored star overrides
 * @returns {boolean}
 */
export const isLessonStarred = (lessonId, dictationStars = {}) => {
  if (!lessonId) return false;

  // Diamond PRO lessons cannot be listened to on a free account, so they are not completed
  if (isDiamondLesson(lessonId) && !dictationStars?.[lessonId]) {
    return false;
  }

  if (dictationStars && dictationStars[lessonId] !== undefined) {
    return Boolean(dictationStars[lessonId]);
  }

  // Baseline fallbacks based on original progress
  if (lessonId.startsWith('ss-')) {
    const num = parseInt(lessonId.replace('ss-', ''), 10);
    return !isNaN(num) && num < 80;
  }
  if (lessonId.startsWith('cv-')) {
    const num = parseInt(lessonId.replace('cv-', ''), 10);
    return !isNaN(num) && num <= 67;
  }
  if (lessonId.startsWith('tc-')) {
    const num = parseInt(lessonId.replace('tc-', ''), 10);
    return !isNaN(num) && num <= 37;
  }
  if (lessonId.startsWith('st-')) {
    const num = parseInt(lessonId.replace('st-', ''), 10);
    return !isNaN(num) && num <= 30;
  }

  return false;
};

/**
 * Evaluates the completion of the 3 DailyDictation tracks assigned to a specific day.
 *
 * @param {Object} dailyDictationPlan - object from UNIFIED_MASTER_DAYS with shortStories, conversations, toeicListening
 * @param {Object} dictationStars - current dictationStars storage
 * @returns {{ isAllDone: boolean, doneCount: number, totalTracks: number, tracks: Array }}
 */
export const getDayDictationStatus = (dailyDictationPlan, dictationStars = {}) => {
  if (!dailyDictationPlan) {
    return { isAllDone: false, doneCount: 0, totalTracks: 3, tracks: [] };
  }

  const ssNum = dailyDictationPlan.shortStories?.match(/\d+/)?.[0] || '81';
  const cvNum = dailyDictationPlan.conversations?.match(/\d+/)?.[0] || '68';
  const tcNum = dailyDictationPlan.toeicListening?.match(/\d+/)?.[0] || '38';

  const ssId = `ss-${ssNum}`;
  const cvId = `cv-${cvNum}`;
  const isShortTalk = /Short Talk/i.test(dailyDictationPlan.toeicListening || '');
  const tcId = isShortTalk ? `st-${tcNum}` : `tc-${tcNum}`;

  const ssDone = isLessonStarred(ssId, dictationStars);
  const cvDone = isLessonStarred(cvId, dictationStars);
  const tcDone = isLessonStarred(tcId, dictationStars);

  const doneCount = [ssDone, cvDone, tcDone].filter(Boolean).length;
  const isAllDone = doneCount === 3;

  return {
    isAllDone,
    doneCount,
    totalTracks: 3,
    tracks: [
      {
        id: ssId,
        type: 'short-stories',
        num: ssNum,
        name: 'Short Stories',
        lesson: dailyDictationPlan.shortStories,
        isDone: ssDone,
        icon: 'fa-book-open',
        color: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800',
      },
      {
        id: cvId,
        type: 'conversations',
        num: cvNum,
        name: 'Conversations',
        lesson: dailyDictationPlan.conversations,
        isDone: cvDone,
        icon: 'fa-comments',
        color: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
      },
      {
        id: tcId,
        type: 'toeic-listening',
        num: tcNum,
        name: 'TOEIC (Nghe)',
        lesson: dailyDictationPlan.toeicListening,
        isDone: tcDone,
        icon: 'fa-headphones',
        color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      },
    ],
  };
};
