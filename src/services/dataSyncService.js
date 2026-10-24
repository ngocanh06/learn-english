/**
 * Data Sync Service
 * Handles offline / direct export & import of all user learning data:
 * - Vocabulary mastery (Leitner L1..L4, Known words, Notebook)
 * - Study streak, calendar missions, dictation, quizzes
 * - Smart bidirectional merge (keeps highest level & latest progress)
 */

export const SYNC_DATA_PREFIX = 'LE_SYNC_V1:';

// Known keys that represent learning progress
export const LEARNING_DATA_KEYS = [
  'notebook_vocab_mastery_v1',
  'vocab_mastery_v2',
  'saved_video_vocab_v1',
  'master_calendar_completed_tasks_v2',
  'calendar_completed_tasks_v1',
  'ai_study_streak_v2',
  'ai_completed_missions_v3',
  'study4_status_map_v1',
  'dailydictation_stars_v4',
  'dictation_transcripts_v1',
  'daily_dictation_completed_v1',
  'grammar_remembered_v2',
  'grammar_quiz_submitted_v2',
  'writing_practice_completed_v2',
  'reading_completed_tests_v2',
  'reading_quiz_submitted_v1',
  'shadowing_speaking_seconds_v1',
  'shadowing_sentences_done_v2',
  'vocab_day_completed_v1',
  'cefr_progress_v3',
  'score_entries_v2',
  'ielts_speaking_completed_tasks_v1',
  'ielts_writing_completed_tasks_v1',
  'ielts_reading_completed_tasks_v1',
  'ielts_diagnostic_test_result',
  'ielts_user_profile',
  'user_learning_profile_v1',
  'exam_records_v1',
  'learning_history_v1',
];

/**
 * Merge two Leitner mastery maps keeping the highest level for every word
 */
export function mergeMasteryMaps(mapA = {}, mapB = {}) {
  const merged = { ...mapA };
  for (const [wordKey, itemB] of Object.entries(mapB || {})) {
    if (!merged[wordKey]) {
      merged[wordKey] = itemB;
    } else {
      const itemA = merged[wordKey];
      if (typeof itemA === 'object' && typeof itemB === 'object') {
        const lvlA = itemA.level || 1;
        const lvlB = itemB.level || 1;
        merged[wordKey] = {
          ...itemA,
          ...itemB,
          level: Math.max(lvlA, lvlB),
          correctStreak: Math.max(itemA.correctStreak || 0, itemB.correctStreak || 0),
          lastReview: Math.max(itemA.lastReview || 0, itemB.lastReview || 0),
        };
      } else {
        merged[wordKey] = itemB;
      }
    }
  }
  return merged;
}

/**
 * Merge two boolean known words maps
 */
export function mergeKnownWordsMaps(mapA = {}, mapB = {}) {
  const merged = { ...mapA };
  for (const [w, isKnown] of Object.entries(mapB || {})) {
    merged[w] = Boolean(merged[w] || isKnown);
  }
  return merged;
}

/**
 * Merge lists of items uniquely
 */
export function mergeUniqueList(listA = [], listB = [], keyProp = 'word') {
  const seen = new Set();
  const result = [];
  const combined = [...(Array.isArray(listA) ? listA : []), ...(Array.isArray(listB) ? listB : [])];
  for (const item of combined) {
    if (!item) continue;
    const identifier = typeof item === 'object' ? (item[keyProp] || item.id || JSON.stringify(item)) : item;
    const cleanId = String(identifier).toLowerCase().trim();
    if (!seen.has(cleanId)) {
      seen.add(cleanId);
      result.push(item);
    }
  }
  return result;
}

/**
 * Gather all data for a specific user from localStorage
 */
export function collectUserData(userId = 'guest') {
  if (typeof window === 'undefined') return {};
  const rawUserId = String(userId).replace(/^user_/, '');
  const candidatePrefixes = [
    `user_${userId}_`,
    `user_${rawUserId}_`,
    `user_user_${rawUserId}_`,
    'user_guest_',
  ];

  const allKeys = new Set(LEARNING_DATA_KEYS);
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      for (const p of candidatePrefixes) {
        if (k.startsWith(p)) {
          allKeys.add(k.slice(p.length));
          break;
        }
      }
    }
  } catch (e) {}

  const payload = {};

  allKeys.forEach((baseKey) => {
    const candidateKeys = [
      `user_${userId}_${baseKey}`,
      `user_${rawUserId}_${baseKey}`,
      `user_user_${rawUserId}_${baseKey}`,
      `user_guest_${baseKey}`,
      baseKey,
    ];

    let resolved = null;
    for (const cand of candidateKeys) {
      try {
        const raw = localStorage.getItem(cand);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed !== null && parsed !== undefined) {
            if (baseKey === 'notebook_vocab_mastery_v1') {
              resolved = mergeMasteryMaps(resolved || {}, parsed);
            } else if (baseKey === 'vocab_mastery_v2') {
              resolved = mergeKnownWordsMaps(resolved || {}, parsed);
            } else if (Array.isArray(parsed)) {
              resolved = mergeUniqueList(resolved || [], parsed);
            } else if (typeof parsed === 'object') {
              resolved = { ...(resolved || {}), ...parsed };
            } else if (resolved === null) {
              resolved = parsed;
            }
          }
        }
      } catch (e) {}
    }

    if (resolved !== null && resolved !== undefined) {
      payload[baseKey] = resolved;
    }
  });

  return payload;
}

/**
 * Generate a statistical summary of user progress
 */
export function generateProgressSummary(data) {
  const mastery = data['notebook_vocab_mastery_v1'] || {};
  const known = data['vocab_mastery_v2'] || {};

  let l1 = 0;
  let l2 = 0;
  let l3 = 0;
  let l4 = 0;

  const countedWords = new Set();

  Object.entries(mastery).forEach(([w, item]) => {
    countedWords.add(w.toLowerCase().trim());
    const lvl = item?.level || 1;
    if (lvl === 4) l4++;
    else if (lvl === 3) l3++;
    else if (lvl === 2) l2++;
    else l1++;
  });

  Object.entries(known).forEach(([w, isK]) => {
    const clean = w.toLowerCase().trim();
    if (!countedWords.has(clean) && isK) {
      countedWords.add(clean);
      l4++;
    }
  });

  const savedCount = Array.isArray(data['saved_video_vocab_v1']) ? data['saved_video_vocab_v1'].length : 0;
  const streak = data['ai_study_streak_v2']?.count || 0;
  const calendarTasks = Object.keys(data['master_calendar_completed_tasks_v2'] || {}).length;

  return {
    masteredCount: l4,
    goodCount: l3,
    learningCount: l2,
    newCount: l1,
    totalTrackedWords: countedWords.size,
    savedVocabCount: savedCount,
    streak,
    calendarTasks,
  };
}

/**
 * Export full learning progress as an encrypted/compressed or formatted text string
 */
export function exportProgressString(userId = 'guest', userName = '') {
  const data = collectUserData(userId);
  const summary = generateProgressSummary(data);

  const exportObject = {
    app: 'LearnEnglish-IELTS',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    user: {
      id: userId,
      name: userName || 'Trần Thị Ngọc Anh',
    },
    summary,
    data,
  };

  const jsonStr = JSON.stringify(exportObject);
  // Base64 encode for easy copying without line break corruption
  let b64 = '';
  try {
    b64 = btoa(encodeURIComponent(jsonStr));
  } catch (e) {
    b64 = jsonStr;
  }

  return {
    syncCode: `${SYNC_DATA_PREFIX}${b64}`,
    summary,
    rawJson: jsonStr,
    fileName: `learn_english_backup_${new Date().toISOString().slice(0, 10)}.json`,
  };
}

/**
 * Import and merge progress string or JSON into local storage
 */
export function importProgressData(inputString, targetUserId = 'guest') {
  if (!inputString || typeof inputString !== 'string') {
    throw new Error('Dữ liệu nhập vào trống hoặc không hợp lệ.');
  }

  let cleanStr = inputString.trim();
  let parsedObject = null;

  if (cleanStr.startsWith(SYNC_DATA_PREFIX)) {
    const b64 = cleanStr.slice(SYNC_DATA_PREFIX.length);
    try {
      const decoded = decodeURIComponent(atob(b64));
      parsedObject = JSON.parse(decoded);
    } catch (e) {
      // Fallback in case raw json was appended
      try {
        parsedObject = JSON.parse(b64);
      } catch (err2) {
        throw new Error('Mã đồng bộ bị hỏng hoặc không đúng định dạng.');
      }
    }
  } else {
    try {
      parsedObject = JSON.parse(cleanStr);
    } catch (e) {
      throw new Error('Định dạng mã đồng bộ không đúng chuẩn (Vui lòng dán mã bắt đầu bằng LE_SYNC_V1 hoặc file JSON).');
    }
  }

  if (!parsedObject || typeof parsedObject !== 'object') {
    throw new Error('Nội dung file không hợp lệ.');
  }

  const incomingData = parsedObject.data || parsedObject;
  if (!incomingData || typeof incomingData !== 'object') {
    throw new Error('Không tìm thấy dữ liệu học tập trong mã đồng bộ.');
  }

  const rawUserId = String(targetUserId).replace(/^user_/, '');
  const existingData = collectUserData(targetUserId);

  let mergedKeysCount = 0;

  Object.entries(incomingData).forEach(([baseKey, incomingVal]) => {
    if (incomingVal === null || incomingVal === undefined) return;

    let finalVal = incomingVal;
    const existingVal = existingData[baseKey];

    if (existingVal !== undefined && existingVal !== null) {
      if (baseKey === 'notebook_vocab_mastery_v1') {
        finalVal = mergeMasteryMaps(existingVal, incomingVal);
      } else if (baseKey === 'vocab_mastery_v2') {
        finalVal = mergeKnownWordsMaps(existingVal, incomingVal);
      } else if (Array.isArray(incomingVal)) {
        finalVal = mergeUniqueList(existingVal, incomingVal);
      } else if (typeof incomingVal === 'object') {
        finalVal = { ...existingVal, ...incomingVal };
      }
    }

    try {
      const serialized = JSON.stringify(finalVal);
      localStorage.setItem(`user_${targetUserId}_${baseKey}`, serialized);
      localStorage.setItem(`user_${rawUserId}_${baseKey}`, serialized);
      localStorage.setItem(`user_guest_${baseKey}`, serialized);
      localStorage.setItem(baseKey, serialized);
      mergedKeysCount++;
    } catch (e) {
      console.warn(`Failed to store key ${baseKey}:`, e);
    }
  });

  // Calculate new merged summary
  const finalMergedData = collectUserData(targetUserId);
  const newSummary = generateProgressSummary(finalMergedData);

  // Dispatch full update event to instantly refresh all UI components across the app
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('user-storage-update', {
        detail: { fullSync: true, userId: targetUserId, mergedKeys: mergedKeysCount },
      })
    );
  }

  return {
    success: true,
    mergedKeysCount,
    summary: newSummary,
  };
}
