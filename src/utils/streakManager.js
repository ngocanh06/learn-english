/**
 * Automatic Study Streak Manager
 * Automatically calculates, updates, and persists the user's daily study streak.
 * Key: 'ai_study_streak_v2' -> { count: number, lastDate: string, history: string[] }
 */

const STREAK_KEY = 'ai_study_streak_v2';
const DATES_KEY = 'study_activity_dates_v1';

/**
 * Format Date to YYYY-MM-DD
 */
export function formatISODate(dateObj) {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    dateObj = new Date();
  }
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Get date N days offset from reference date
 */
function getOffsetDate(dateObj, offsetDays) {
  const d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  d.setDate(d.getDate() + offsetDays);
  return d;
}

/**
 * Load all recorded activity dates (array of 'YYYY-MM-DD')
 */
export function getActivityDates() {
  const datesSet = new Set();

  try {
    const raw = localStorage.getItem(DATES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((d) => {
          if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
            datesSet.add(d);
          }
        });
      }
    }
  } catch (e) {}

  // Also check if streak object has history
  try {
    const rawStreak = localStorage.getItem(STREAK_KEY);
    if (rawStreak) {
      const parsed = JSON.parse(rawStreak);
      if (parsed && Array.isArray(parsed.history)) {
        parsed.history.forEach((d) => {
          if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
            datesSet.add(d);
          }
        });
      }
      if (parsed && parsed.lastDate && /^\d{4}-\d{2}-\d{2}$/.test(parsed.lastDate)) {
        datesSet.add(parsed.lastDate);
      }
    }
  } catch (e) {}

  return Array.from(datesSet).sort();
}

/**
 * Calculate current consecutive streak from activity dates
 */
export function calculateStreakFromDates(datesList, refDate = new Date()) {
  if (!Array.isArray(datesList) || datesList.length === 0) {
    return { count: 0, lastDate: '', isActiveToday: false };
  }

  const dateSet = new Set(datesList);
  const todayStr = formatISODate(refDate);
  const yesterdayStr = formatISODate(getOffsetDate(refDate, -1));

  const isActiveToday = dateSet.has(todayStr);
  const isActiveYesterday = dateSet.has(yesterdayStr);

  if (!isActiveToday && !isActiveYesterday) {
    // Streak broken
    return {
      count: 0,
      lastDate: datesList[datesList.length - 1] || '',
      isActiveToday: false,
    };
  }

  let streak = 0;
  // If active today, count backwards from today.
  // If not active today but active yesterday, streak is alive pending today's study.
  let curr = isActiveToday ? new Date(refDate) : getOffsetDate(refDate, -1);

  while (true) {
    const checkStr = formatISODate(curr);
    if (dateSet.has(checkStr)) {
      streak += 1;
      curr = getOffsetDate(curr, -1);
    } else {
      break;
    }
  }

  return {
    count: streak,
    lastDate: isActiveToday ? todayStr : yesterdayStr,
    isActiveToday,
  };
}

/**
 * Record a study activity and automatically compute & persist streak.
 * Called whenever user completes a task, quiz, flashcard, shadowing, dictation, etc.
 *
 * @param {Date|string} [targetDate] - Date of activity, defaults to today
 * @returns {Object} Updated streak { count, lastDate, isActiveToday, isNewStreakDay }
 */
export function recordStudyActivity(targetDate) {
  let dateObj = targetDate instanceof Date ? targetDate : new Date();
  if (typeof targetDate === 'string') {
    // If DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(targetDate)) {
      const parts = targetDate.split('/');
      dateObj = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
      const parts = targetDate.split('-');
      dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
  }

  const dateStr = formatISODate(dateObj);
  const currentDates = getActivityDates();
  const dateSet = new Set(currentDates);
  const isNewDay = !dateSet.has(dateStr);

  dateSet.add(dateStr);
  const sortedDates = Array.from(dateSet).sort();

  // Save dates list
  try {
    const serializedDates = JSON.stringify(sortedDates);
    localStorage.setItem(DATES_KEY, serializedDates);
    localStorage.setItem(`user_guest_${DATES_KEY}`, serializedDates);
  } catch (e) {}

  // Recalculate streak
  const streakResult = calculateStreakFromDates(sortedDates, new Date());
  const streakPayload = {
    count: streakResult.count,
    lastDate: streakResult.lastDate,
    history: sortedDates,
  };

  try {
    const serializedStreak = JSON.stringify(streakPayload);
    localStorage.setItem(STREAK_KEY, serializedStreak);
    localStorage.setItem(`user_guest_${STREAK_KEY}`, serializedStreak);

    // Also write to any scoped keys
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.endsWith(`_${STREAK_KEY}`)) {
        localStorage.setItem(k, serializedStreak);
      }
    }

    // Broadcast updates so React components re-render immediately
    window.dispatchEvent(
      new CustomEvent('study-streak-updated', {
        detail: streakPayload,
      })
    );
    window.dispatchEvent(
      new CustomEvent('user-storage-update', {
        detail: { baseKey: STREAK_KEY, value: streakPayload },
      })
    );
  } catch (e) {}

  return {
    ...streakResult,
    isNewStreakDay: isNewDay,
  };
}

/**
 * Scan all local storage activity indicators to retroactively populate dates & streak.
 */
export function scanAndSyncExistingActivities() {
  const datesFound = new Set(getActivityDates());

  try {
    // 1. Calendar completed tasks: keys like "DD/MM/YYYY_pillar"
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;

      if (k.includes('master_calendar_completed_tasks_v2') || k.includes('study_schedule_rows_v3')) {
        try {
          const val = JSON.parse(localStorage.getItem(k));
          if (val && typeof val === 'object') {
            Object.keys(val).forEach((taskKey) => {
              if (val[taskKey]) {
                const dateMatch = taskKey.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
                if (dateMatch) {
                  const iso = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
                  datesFound.add(iso);
                }
              }
            });
          }
        } catch (e) {}
      }

      // Check Daily study minutes: keys like "ai_minutes_YYYY-MM-DD"
      const minMatch = k.match(/ai_minutes_(\d{4}-\d{2}-\d{2})/);
      if (minMatch) {
        try {
          const minVal = parseInt(localStorage.getItem(k), 10);
          if (minVal > 0) {
            datesFound.add(minMatch[1]);
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  if (datesFound.size > 0) {
    const sorted = Array.from(datesFound).sort();
    try {
      localStorage.setItem(DATES_KEY, JSON.stringify(sorted));
    } catch (e) {}
    const streakResult = calculateStreakFromDates(sorted, new Date());
    const payload = {
      count: streakResult.count,
      lastDate: streakResult.lastDate,
      history: sorted,
    };
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(payload));
      window.dispatchEvent(
        new CustomEvent('study-streak-updated', { detail: payload })
      );
    } catch (e) {}
    return streakResult;
  }

  return { count: 0, lastDate: '', isActiveToday: false };
}

/**
 * List of storage baseKeys that constitute study actions
 */
export const STUDY_ACTIVITY_STORAGE_KEYS = [
  'master_calendar_completed_tasks_v2',
  'master_roadmap_completed_tasks_v1',
  'grammar_remembered_v2',
  'grammar_quiz_submitted_v2',
  'grammar_quiz_scores_v2',
  'writing_practice_completed_v2',
  'writing_ielts_checks_v2',
  'vocab_mastery_v2',
  'vocab_day_completed_v1',
  'saved_video_vocab_v1',
  'dailydictation_stars_v4',
  'reading_completed_tests_v2',
  'reading_quiz_submitted_v1',
  'shadowing_speaking_seconds_v1',
  'shadowing_sentences_done_v2',
  'score_entries_v2',
  'study4_status_map_v1',
  'roadmap_45days_completed_v1',
];

/**
 * Checks if a given baseKey represents a learning action
 */
export function isStudyActivityKey(baseKey) {
  if (!baseKey) return false;
  if (STUDY_ACTIVITY_STORAGE_KEYS.includes(baseKey)) return true;
  if (baseKey.startsWith('ai_minutes_')) return true;
  return false;
}
