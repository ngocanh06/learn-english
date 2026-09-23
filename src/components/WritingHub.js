import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { WRITING_CATEGORIES, WRITING_LESSONS } from '../data/writingTranslationData';
import { useUserStorage } from '../hooks/useUserStorage';
import { useAuth } from '../context/AuthContext';
import WordLookupModal from './WordLookupModal';
import { getDisplayIpa, healSavedVocabList } from '../services/ipaService';

// Fuzzy similarity scoring using Levenshtein distance
function calculateSimilarity(str1, str2) {
  const s1 = (str1 || '').toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '').replace(/\s+/g, ' ');
  const s2 = (str2 || '').toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '').replace(/\s+/g, ' ');
  if (!s1 && !s2) return 100;
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;

  const len1 = s1.length;
  const len2 = s2.length;
  const matrix = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  const score = Math.round(((maxLen - distance) / maxLen) * 100);
  return Math.max(0, Math.min(100, score));
}

// Tokenize sentence into words
function tokenizeWords(text) {
  if (!text) return [];
  return text.trim().split(/\s+/).filter(Boolean);
}

// Strip leading/trailing punctuation for fair comparison
function cleanWordForCompare(w) {
  return (w || '')
    .toLowerCase()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()?'"]+|[.,/#!$%^&*;:{}=\-_`~()?'"]+$/g, '')
    .trim();
}

// Mask word Daily Dictation style: only reveal 1st character and replace the rest with asterisks
function maskWordPartially(word, revealFirstChar = true) {
  if (!word) return '';
  const match = word.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9].*?)([^a-zA-Z0-9]*)$/);
  if (!match) return word.replace(/[a-zA-Z0-9]/g, '*');
  const [, prefix, core, suffix] = match;
  if (core.length <= 1) {
    return prefix + core + suffix;
  }
  if (revealFirstChar) {
    let maskedCore = core[0];
    for (let i = 1; i < core.length; i++) {
      if (core[i] === "'" || core[i] === '-') {
        maskedCore += core[i];
      } else {
        maskedCore += '*';
      }
    }
    return prefix + maskedCore + suffix;
  }
  let maskedCore = '';
  for (let i = 0; i < core.length; i++) {
    if (core[i] === "'" || core[i] === '-') {
      maskedCore += core[i];
    } else {
      maskedCore += '*';
    }
  }
  return prefix + maskedCore + suffix;
}

// Word-level LCS Diff to detect specific missing, extra, and replaced words
function computeWordDiff(userInput, target) {
  const uWords = tokenizeWords(userInput);
  const tWords = tokenizeWords(target);
  const n = uWords.length;
  const m = tWords.length;

  if (n === 0) {
    return {
      diffs: tWords.map((w) => ({ type: 'missing', targetWord: w })),
      errors: tWords.map((w) => ({ type: 'missing', expected: w })),
      isExact: false,
    };
  }

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (cleanWordForCompare(uWords[i - 1]) === cleanWordForCompare(tWords[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = n;
  let j = m;
  const rawDiff = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cleanWordForCompare(uWords[i - 1]) === cleanWordForCompare(tWords[j - 1])) {
      rawDiff.unshift({ type: 'match', userWord: uWords[i - 1], targetWord: tWords[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawDiff.unshift({ type: 'missing', targetWord: tWords[j - 1] });
      j--;
    } else if (i > 0) {
      rawDiff.unshift({ type: 'extra', userWord: uWords[i - 1] });
      i--;
    }
  }

  const diffs = [];
  const errors = [];
  for (let k = 0; k < rawDiff.length; k++) {
    const curr = rawDiff[k];
    const next = rawDiff[k + 1];
    if (curr.type === 'extra' && next && next.type === 'missing') {
      diffs.push({ type: 'replace', userWord: curr.userWord, targetWord: next.targetWord });
      errors.push({
        type: 'replace',
        userWord: curr.userWord,
        expected: next.targetWord,
      });
      k++;
    } else if (curr.type === 'extra') {
      diffs.push(curr);
      errors.push({
        type: 'extra',
        userWord: curr.userWord,
      });
    } else if (curr.type === 'missing') {
      diffs.push(curr);
      errors.push({
        type: 'missing',
        expected: curr.targetWord,
      });
    } else {
      diffs.push(curr);
    }
  }

  return {
    diffs,
    errors,
    isExact: errors.length === 0,
  };
}

// Compute live correct word count
function computeLiveMatchingWords(userInput, target) {
  const uWords = tokenizeWords(userInput).map(cleanWordForCompare);
  const tWords = tokenizeWords(target).map(cleanWordForCompare);
  if (uWords.length === 0 || tWords.length === 0) return { matched: 0, total: tWords.length };

  let count = 0;
  const usedIndices = new Set();

  uWords.forEach(uw => {
    for (let idx = 0; idx < tWords.length; idx++) {
      if (!usedIndices.has(idx) && tWords[idx] === uw) {
        usedIndices.add(idx);
        count++;
        break;
      }
    }
  });

  return { matched: count, total: tWords.length };
}

// Map whitespace-separated tokens to character spans in text
function getTokenSpans(text) {
  const spans = [];
  const regex = /\S+/g;
  let match;
  while ((match = regex.exec(text || '')) !== null) {
    spans.push({
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return spans;
}

// Find exact error position in rawInput like Daily Dictation
function findFirstErrorSelection(rawInput, diffResult) {
  if (!rawInput) return { start: 0, end: 0 };
  const spans = getTokenSpans(rawInput);
  let spanIdx = 0;

  for (const item of (diffResult?.diffs || [])) {
    if (item.type === 'match') {
      spanIdx++;
    } else if (item.type === 'replace') {
      const span = spans[spanIdx] || { start: rawInput.length, end: rawInput.length, word: '' };
      const rawWord = span.word || item.userWord || '';
      const uClean = cleanWordForCompare(item.userWord);
      const tClean = cleanWordForCompare(item.targetWord);

      // Find common prefix length (case-insensitive)
      let prefixLen = 0;
      while (
        prefixLen < uClean.length &&
        prefixLen < tClean.length &&
        uClean[prefixLen] === tClean[prefixLen]
      ) {
        prefixLen++;
      }

      // If user word is a prefix of target word (e.g. smile -> smiles)
      if (prefixLen === uClean.length) {
        const cleanStartOffset = rawWord.toLowerCase().indexOf(uClean);
        const offsetInSpan = cleanStartOffset >= 0 ? cleanStartOffset + uClean.length : rawWord.length;
        const pos = span.start + offsetInSpan;
        return { start: pos, end: pos };
      }

      // If user word has a partial prefix (e.g. smild -> smiles)
      if (prefixLen > 0 && prefixLen < uClean.length) {
        const cleanStartOffset = Math.max(0, rawWord.toLowerCase().indexOf(uClean));
        return {
          start: span.start + cleanStartOffset + prefixLen,
          end: span.end,
        };
      }

      // Completely different word: select the whole word
      return { start: span.start, end: span.end };

    } else if (item.type === 'extra') {
      const span = spans[spanIdx] || { start: rawInput.length, end: rawInput.length };
      let end = span.end;
      if (rawInput[end] === ' ') end++;
      return { start: span.start, end };

    } else if (item.type === 'missing') {
      if (spanIdx === 0) {
        return { start: 0, end: 0 };
      }
      const prevSpan = spans[spanIdx - 1];
      if (prevSpan) {
        let pos = prevSpan.end;
        if (rawInput[pos] === ' ') pos++;
        return { start: pos, end: pos };
      }
      return { start: rawInput.length, end: rawInput.length };
    }
  }

  return { start: rawInput.length, end: rawInput.length };
}

export default function WritingHub({
  theme = 'dark',
  initialLessonId,
  initialCategory,
  dateKey,
  onNavigate,
}) {
  const isLight = theme === 'light';
  const { currentUser, isAuthenticated, openLogin } = useAuth();

  // Persistence for IELTS Translation & Calendar Tasks
  const [completedIeltsTasks, setCompletedIeltsTasks] = useUserStorage('writing_practice_completed_v2', {});
  const [completedLessonRecords, setCompletedLessonRecords] = useUserStorage('writing_lesson_completed_v2', {});
  const [calendarCompletedTasks, setCalendarCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});

  // Vocabulary Notebook persistence (synchronized with VocabMasterHub & ReadingHub)
  const [savedVocab, setSavedVocab] = useUserStorage('saved_video_vocab_v1', []);
  const [starredWordsMap, setStarredWordsMap] = useUserStorage('vocab_starred_v2', {});
  const [lookupWord, setLookupWord] = useState(null);

  const isWordSaved = useCallback(
    (w) => {
      const clean = (w || '').toLowerCase().trim().replace(/^[.,/#!$%^&*;:{}=\-_`~()?'"]+|[.,/#!$%^&*;:{}=\-_`~()?'"]+$/g, '');
      if (!clean) return false;
      return savedVocab.some((v) => (v.word || '').toLowerCase() === clean) || !!starredWordsMap[clean];
    },
    [savedVocab, starredWordsMap]
  );

  const toggleSaveWord = useCallback(
    (rawWord, meaningHint = '') => {
      const clean = (rawWord || '').toLowerCase().trim().replace(/^[.,/#!$%^&*;:{}=\-_`~()?'"]+|[.,/#!$%^&*;:{}=\-_`~()?'"]+$/g, '');
      if (!clean) return;
      const alreadySaved = isWordSaved(clean);
      if (alreadySaved) {
        setSavedVocab((prev) => prev.filter((v) => (v.word || '').toLowerCase() !== clean));
        setStarredWordsMap((prev) => ({ ...prev, [clean]: false }));
      } else {
        const newEntry = {
          word: clean,
          ipa: getDisplayIpa(clean),
          pos: 'Writing',
          meaning: meaningHint || `Từ vựng trong bài dịch IELTS`,
          savedAt: new Date().toISOString(),
        };
        setSavedVocab((prev) => [newEntry, ...prev.filter((v) => (v.word || '').toLowerCase() !== clean)]);
        setStarredWordsMap((prev) => ({ ...prev, [clean]: true }));
      }
    },
    [isWordSaved, setSavedVocab, setStarredWordsMap]
  );

  // Auto-heal legacy saved words (e.g. /shrove/ -> /ʃroʊv/)
  useEffect(() => {
    if (Array.isArray(savedVocab) && savedVocab.length > 0) {
      healSavedVocabList(savedVocab, setSavedVocab);
    }
  }, []);

  const handleWordDoubleClick = useCallback((rawWord) => {
    if (!rawWord) return;
    const clean = cleanWordForCompare(rawWord);
    if (clean && clean.length >= 2 && /[a-zA-Z]/.test(clean)) {
      setLookupWord(clean);
    }
  }, []);

  const handleTextareaDoubleClick = useCallback((e) => {
    try {
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      let text = (textarea.value || '').substring(start, end).trim();
      if (!text) {
        const val = textarea.value || '';
        const left = val.slice(0, start).search(/[a-zA-Z0-9_-]+$/);
        const right = val.slice(start).search(/[^a-zA-Z0-9_-]/);
        if (left !== -1) {
          const wordStart = left;
          const wordEnd = right === -1 ? val.length : start + right;
          text = val.slice(wordStart, wordEnd);
        }
      }
      if (text) {
        const clean = text.replace(/\s+/g, ' ').replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim();
        if (clean && clean.length >= 2 && /[a-zA-Z]/.test(clean)) {
          setLookupWord(clean);
        }
      }
    } catch (err) {}
  }, []);

  const handleTextareaMouseUp = useCallback((e) => {
    setTimeout(() => {
      try {
        const textarea = e.target;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        if (start === end || Math.abs(end - start) < 2) return;
        const raw = (textarea.value || '').substring(start, end);
        if (!raw || !raw.trim()) return;
        const clean = raw.replace(/\s+/g, ' ').replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim();
        if (
          clean &&
          clean.length >= 2 &&
          clean.length <= 80 &&
          clean.split(/\s+/).length <= 8 &&
          /[a-zA-Z]/.test(clean)
        ) {
          setLookupWord(clean);
        }
      } catch (err) {}
    }, 60);
  }, []);

  const handleSelectionLookup = useCallback(() => {
    setTimeout(() => {
      try {
        const raw = window.getSelection()?.toString() || '';
        if (!raw || !raw.trim()) return;
        const clean = raw.replace(/\s+/g, ' ').replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim();
        if (
          clean &&
          clean.length >= 2 &&
          clean.length <= 80 &&
          clean.split(/\s+/).length <= 8 &&
          /[a-zA-Z]/.test(clean)
        ) {
          setLookupWord(clean);
        }
      } catch (e) {}
    }, 40);
  }, []);

  const effectiveDateKey = useMemo(() => {
    if (dateKey) return dateKey;
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }, [dateKey]);

  const isCalendarTaskCompleted = !!calendarCompletedTasks[`${effectiveDateKey}_writing`];

  // ─── STATE FOR THE IELTS DICTIONARY ─────────────────────────────
  const [persistedStep, setPersistedStep] = useUserStorage('writing_ielts_step_v3', 'step1');
  const [persistedLessonId, setPersistedLessonId] = useUserStorage('writing_ielts_lid_v3', 'buoc1-simple-present');

  // Map backward compatibility categories ('tenses', 'structures', 'ielts-topics') to 'step1' / 'step2'
  const resolveInitialCategory = (cat) => {
    if (!cat) return null;
    if (cat === 'tenses' || cat === 'structures') return 'step1';
    if (cat === 'ielts-topics') return 'step2';
    if (['step1', 'step2', 'step3', 'step4', 'step5'].includes(cat)) return cat;
    return null;
  };

  const [activeStep, setActiveStepState] = useState(
    resolveInitialCategory(initialCategory) || persistedStep || 'step1'
  );

  const [activeLessonId, setActiveLessonIdState] = useState(
    initialLessonId || persistedLessonId || 'buoc1-simple-present'
  );

  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [viewMode, setViewMode] = useState('focus'); // 'focus' (IELTS Dict style) | 'list' (All sentences)

  const setActiveStep = (step) => {
    setActiveStepState(step);
    setPersistedStep(step);
    const firstLesson = (WRITING_LESSONS[step] || [])[0];
    if (firstLesson) {
      setActiveLessonIdState(firstLesson.id);
      setPersistedLessonId(firstLesson.id);
      setActiveSentenceIndex(0);
    }
  };

  const setActiveLessonId = (lid) => {
    setActiveLessonIdState(lid);
    setPersistedLessonId(lid);
    setActiveSentenceIndex(0);
  };

  // Persist inputs, check states, revealed hints
  const [ieltsInputs, setIeltsInputs] = useUserStorage('writing_ielts_inputs_v2', {});
  const [ieltsCheckState, setIeltsCheckState] = useUserStorage('writing_ielts_checks_v2', {});
  const [showHints, setShowHints] = useUserStorage('writing_show_hints_v2', {});
  const [revealedWordIndices, setRevealedWordIndices] = useState({}); // { [sentenceId]: Set of indices or true }
  const [revealedDiffWords, setRevealedDiffWords] = useState({}); // { [`${sentenceId}_${dfIdx}`]: boolean }
  const [showFullTargetSentence, setShowFullTargetSentence] = useState({}); // { [sentenceId]: boolean }

  useEffect(() => {
    const resolvedCat = resolveInitialCategory(initialCategory);
    if (resolvedCat) setActiveStep(resolvedCat);
    if (initialLessonId) setActiveLessonId(initialLessonId);
  }, [initialCategory, initialLessonId]);

  // Robust lesson resolution (supports alias IDs like 'write-pres-simple', 'write-to-be', etc.)
  const activeLesson = useMemo(() => {
    // 1. Search in active step
    let list = WRITING_LESSONS[activeStep] || [];
    let found = list.find((l) => l.id === activeLessonId || (l.aliasIds && l.aliasIds.includes(activeLessonId)));
    if (found) return found;

    // 2. Search across all steps
    for (const stepKey of ['step1', 'step2', 'step3', 'step4', 'step5', 'tenses', 'structures', 'ielts-topics']) {
      const candidateList = WRITING_LESSONS[stepKey] || [];
      const match = candidateList.find((l) => l.id === activeLessonId || (l.aliasIds && l.aliasIds.includes(activeLessonId)));
      if (match) {
        if (['step1', 'step2', 'step3', 'step4', 'step5'].includes(stepKey)) {
          setActiveStepState(stepKey);
        }
        return match;
      }
    }
    return (WRITING_LESSONS.step1 || [])[0] || null;
  }, [activeStep, activeLessonId]);

  const currentSentenceList = useMemo(() => activeLesson?.sentences || [], [activeLesson]);
  const totalLessonSentences = currentSentenceList.length;

  const currentSentence = useMemo(() => {
    if (totalLessonSentences === 0) return null;
    const safeIdx = Math.max(0, Math.min(totalLessonSentences - 1, activeSentenceIndex));
    return currentSentenceList[safeIdx];
  }, [currentSentenceList, activeSentenceIndex, totalLessonSentences]);

  // Progress metrics
  const completedLessonSentencesCount = useMemo(() => {
    if (!currentSentenceList.length) return 0;
    return currentSentenceList.filter((st) => {
      const ch = ieltsCheckState[st.id];
      return ch && ch.checked && ch.score === 100;
    }).length;
  }, [currentSentenceList, ieltsCheckState]);

  const isAllSentencesCompleted = totalLessonSentences > 0 && completedLessonSentencesCount === totalLessonSentences;

  // Sync calendar task when complete
  useEffect(() => {
    if (currentSentenceList.length && totalLessonSentences > 0) {
      if (!isAllSentencesCompleted && calendarCompletedTasks[`${effectiveDateKey}_writing`]) {
        setCalendarCompletedTasks((prev) => {
          const next = { ...prev };
          delete next[`${effectiveDateKey}_writing`];
          return next;
        });
      }
    }
  }, [isAllSentencesCompleted, totalLessonSentences, effectiveDateKey, calendarCompletedTasks, setCalendarCompletedTasks]);

  const toggleCompleteWritingTask = () => {
    if (!isAllSentencesCompleted && !isCalendarTaskCompleted) {
      alert(`⚠️ Bạn cần hoàn thành tất cả ${totalLessonSentences}/${totalLessonSentences} câu trong bài học trước khi đánh dấu hoàn thành (hiện tại mới xong ${completedLessonSentencesCount}/${totalLessonSentences} câu).`);
      return;
    }
    const nextVal = !isCalendarTaskCompleted;
    setCalendarCompletedTasks((prev) => ({
      ...prev,
      [`${effectiveDateKey}_writing`]: nextVal,
    }));
    if (activeLesson?.id) {
      setCompletedLessonRecords((prev) => ({
        ...prev,
        [activeLesson.id]: nextVal,
      }));
    }
  };

  // Check sentence answer
  const handleCheckSentence = useCallback((sentenceItem) => {
    const rawInput = ieltsInputs[sentenceItem.id] || '';
    if (!rawInput.trim()) return;

    let bestScore = calculateSimilarity(rawInput, sentenceItem.target);
    let bestTarget = sentenceItem.target;

    (sentenceItem.acceptable || []).forEach((acc) => {
      const s = calculateSimilarity(rawInput, acc);
      if (s > bestScore) {
        bestScore = s;
        bestTarget = acc;
      }
    });

    const diffResult = computeWordDiff(rawInput, bestTarget);
    if (diffResult.isExact) {
      bestScore = 100;
    }

    const firstError = !diffResult.isExact ? findFirstErrorSelection(rawInput, diffResult) : null;

    setIeltsCheckState((prev) => ({
      ...prev,
      [sentenceItem.id]: {
        checked: true,
        score: bestScore,
        diff: diffResult.diffs,
        errors: diffResult.errors,
        bestTarget,
        checkedInput: rawInput.trim(),
        firstError,
        timestamp: Date.now(),
      },
    }));

    if (bestScore === 100) {
      setCompletedIeltsTasks((prev) => ({
        ...prev,
        [sentenceItem.id]: true,
      }));
    } else {
      setCompletedIeltsTasks((prev) => {
        const next = { ...prev };
        delete next[sentenceItem.id];
        return next;
      });

      // Daily Dictation behavior: automatically focus and position cursor at first error!
      if (firstError) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(firstError.start, firstError.end);
          }
        }, 50);
      }
    }
  }, [ieltsInputs, setIeltsCheckState, setCompletedIeltsTasks]);

  // Handle reveal word in masked hint
  const toggleRevealWord = (sentenceId, wordIdx) => {
    setRevealedWordIndices((prev) => {
      const current = prev[sentenceId] || new Set();
      const updated = new Set(current);
      if (updated.has(wordIdx)) updated.delete(wordIdx);
      else updated.add(wordIdx);
      return { ...prev, [sentenceId]: updated };
    });
  };

  const revealAllWords = (sentenceId) => {
    setRevealedWordIndices((prev) => ({
      ...prev,
      [`${sentenceId}_all`]: true,
    }));
  };

  const isWordRevealed = (sentenceId, wordIdx) => {
    if (revealedWordIndices[`${sentenceId}_all`]) return true;
    const s = revealedWordIndices[sentenceId];
    return s && s.has(wordIdx);
  };

  // Live match calculation for focus mode
  const currentSentenceInput = currentSentence ? (ieltsInputs[currentSentence.id] || '') : '';
  const liveMatch = useMemo(() => {
    if (!currentSentence) return { matched: 0, total: 0 };
    return computeLiveMatchingWords(currentSentenceInput, currentSentence.target);
  }, [currentSentence, currentSentenceInput]);

  const inputRef = useRef(null);

  const isCurrentSentenceCompleted = useMemo(() => {
    if (!currentSentence) return false;
    const ch = ieltsCheckState[currentSentence.id];
    return Boolean(ch && ch.checked && ch.score === 100);
  }, [currentSentence, ieltsCheckState]);

  const currentSentenceCheck = currentSentence ? ieltsCheckState[currentSentence.id] : null;
  const isAlreadyCheckedForCurrentInput = Boolean(
    currentSentenceCheck?.checked &&
    (currentSentenceCheck.checkedInput !== undefined
      ? currentSentenceCheck.checkedInput === currentSentenceInput.trim()
      : currentSentenceInput.trim().length > 0)
  );

  const canAdvanceToNext = isCurrentSentenceCompleted && isAlreadyCheckedForCurrentInput;

  const handleNextSentence = useCallback(() => {
    if (activeSentenceIndex < totalLessonSentences - 1) {
      setActiveSentenceIndex((prev) => prev + 1);
    } else if (isAllSentencesCompleted) {
      toggleCompleteWritingTask();
    }
  }, [activeSentenceIndex, totalLessonSentences, isAllSentencesCompleted, toggleCompleteWritingTask]);

  // Auto focus input when switching sentences
  useEffect(() => {
    if (viewMode === 'focus') {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeSentenceIndex, activeLessonId, viewMode]);

  // Global enter key listener for focus mode when answer is already checked
  useEffect(() => {
    if (viewMode !== 'focus') return;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
          return;
        }
        if (canAdvanceToNext) {
          e.preventDefault();
          handleNextSentence();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, canAdvanceToNext, handleNextSentence]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ─── SLEEK LUXURY HEADER ──────────────────────────────────── */}
      <div
        className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
          isLight
            ? 'bg-slate-900 border-slate-800 text-white shadow-md'
            : 'bg-slate-900/90 border-slate-800 text-white shadow-xl'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                <i className="fa-solid fa-pen-nib text-xs" />
                THE IELTS DICTIONARY • TẬP DỊCH IELTS
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                100% Phản Xạ Dịch Câu Bản Ngữ
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Phòng Luyện Dịch & Viết Chuẩn IELTS
            </h1>

            <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
              Phương pháp luyện tập dịch từ Việt sang Anh giúp củng cố ngữ pháp, từ vựng và tư duy viết học thuật
              chuẩn 100% giáo trình The IELTS Dictionary với 5 bước từ cơ bản đến Band 8.0+.
            </p>
          </div>

          {/* Header Controls & User Status */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('vocabulary', { section: 'notebook' })}
                className="px-4 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
                title="Mở Sổ từ vựng cá nhân"
              >
                <i className="fa-solid fa-book-bookmark text-amber-400 text-sm" />
                <span>Sổ từ vựng ({savedVocab.length})</span>
                <i className="fa-solid fa-arrow-right text-[10px] opacity-70" />
              </button>
            )}

            {/* User Status Card */}
            <div
              className={`p-4 rounded-2xl border text-xs flex flex-col justify-center space-y-1 ${
                isLight
                  ? 'bg-slate-800/80 border-slate-700/80 text-white shadow-xs'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 shadow-xs'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 font-bold">
                    <i className="fa-solid fa-circle-check text-emerald-400" />
                    <span>{currentUser?.name || currentUser?.username}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-mono">
                    Tài khoản đã đồng bộ dữ liệu dịch câu
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <i className="fa-solid fa-user-clock text-amber-400" />
                    <span>Chế độ Khách</span>
                  </div>
                  <button
                    type="button"
                    onClick={openLogin}
                    className="text-blue-400 text-[11px] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Đăng nhập lưu bài làm</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── RETURN TO CALENDAR BANNER (IF NAVIGATED FROM SCHEDULE) ─── */}
      {dateKey && onNavigate && (
        <div
          className={`p-3.5 px-4 rounded-2xl border flex items-center justify-between gap-3 text-xs animate-fadeIn ${
            isLight
              ? 'bg-blue-50/90 border-blue-200 text-blue-900 shadow-xs'
              : 'bg-blue-950/40 border-blue-800 text-blue-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar-check text-blue-500 text-sm shrink-0" />
            <span>
              Đang mở bài luyện dịch câu theo lịch học ngày <strong>{dateKey}</strong>.
            </span>
          </div>
          <button
            onClick={() =>
              onNavigate('ai-coach', {
                dateKey,
                tab: 'calendar-view',
              })
            }
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shrink-0 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left text-[11px]" />
            <span>Quay lại Lịch học {dateKey}</span>
          </button>
        </div>
      )}

      {/* ─── 5 BƯỚC TRANSLATION HUB (THE IELTS DICTIONARY STEPS) ──────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {WRITING_CATEGORIES.map((cat, idx) => {
          const active = activeStep === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveStep(cat.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                active
                  ? isLight
                    ? 'bg-blue-50/95 border-blue-500 text-blue-950 shadow-sm ring-2 ring-blue-500/20'
                    : 'bg-blue-950/50 border-blue-500 text-blue-100 shadow-sm ring-1 ring-blue-500/30'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-black ${
                    active
                      ? 'bg-blue-600 text-white'
                      : isLight
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  0{idx + 1}
                </span>
                <i className={`fa-solid ${cat.icon} text-xs ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs leading-tight line-clamp-1">{cat.label}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{cat.count}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── SUB-TOPICS PILL CAROUSEL ─────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {(WRITING_LESSONS[activeStep] || []).map((les, lIdx) => {
          const active = activeLesson?.id === les.id;
          return (
            <button
              key={les.id}
              onClick={() => setActiveLessonId(les.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                active
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className={`text-[10px] font-mono font-black opacity-80 ${active ? 'text-white' : 'text-slate-400'}`}>
                {lIdx + 1 < 10 ? `0${lIdx + 1}` : lIdx + 1}
              </span>
              <span>{les.title}</span>
              <span className="text-[10px] opacity-70">({les.sentences.length})</span>
            </button>
          );
        })}
      </div>

      {/* ─── ACTIVE LESSON WORKSPACE ───────────────────────────────── */}
      {activeLesson && (
        <div className="space-y-4">
          {/* Sub-header & Controls bar */}
          <div
            className={`p-4 md:px-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isLight ? 'bg-white border-slate-200 shadow-xs text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {activeLesson.level}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {activeLesson.sentences.length} câu dịch phản xạ
                </span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                  Đã làm: {completedLessonSentencesCount}/{totalLessonSentences} câu
                </span>
              </div>
              <h2 className="text-base md:text-lg font-black">{activeLesson.title}</h2>
            </div>

            {/* View Switcher & Complete Task */}
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="#/vocabulary?section=notebook"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition shadow-xs cursor-pointer ${
                  isLight
                    ? 'bg-amber-50/80 border-amber-300 text-amber-900 hover:bg-amber-100'
                    : 'bg-amber-950/30 border-amber-800 text-amber-300 hover:bg-amber-900/40'
                }`}
                title="Mở Sổ tay từ vựng của bạn để ôn tập"
              >
                <i className="fa-solid fa-book-bookmark text-amber-500" />
                <span>Sổ từ vựng ({savedVocab.length})</span>
              </a>

              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  onClick={() => setViewMode('focus')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    viewMode === 'focus' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className="fa-solid fa-bullseye mr-1.5" />
                  Chế độ Tập Dịch (IELTS Dict)
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className="fa-solid fa-list-check mr-1.5" />
                  Toàn bộ danh sách
                </button>
              </div>

              <button
                onClick={toggleCompleteWritingTask}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  isCalendarTaskCompleted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : isAllSentencesCompleted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 animate-bounce'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-80'
                }`}
              >
                <i className={`fa-solid ${isCalendarTaskCompleted ? 'fa-circle-check' : 'fa-check'}`} />
                <span>{isCalendarTaskCompleted ? 'Đã xong bài tập' : 'Hoàn thành bài tập'}</span>
              </button>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* ─── 1. FOCUS VIEW (AUTHENTIC THE IELTS DICTIONARY LAYOUT) ──── */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {viewMode === 'focus' && currentSentence && (
            <div className="space-y-4 animate-fadeIn">
              {/* Top Pagination Bar */}
              <div
                className={`p-3 px-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Câu hỏi:
                  </span>
                  <div className="flex items-center gap-1 overflow-x-auto max-w-[60vw] scrollbar-hide py-1">
                    {currentSentenceList.map((st, sIdx) => {
                      const isCurr = sIdx === activeSentenceIndex;
                      const isDone = ieltsCheckState[st.id]?.checked && ieltsCheckState[st.id]?.score === 100;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setActiveSentenceIndex(sIdx)}
                          className={`w-7 h-7 rounded-lg text-[11px] font-mono font-black transition flex items-center justify-center shrink-0 cursor-pointer ${
                            isCurr
                              ? 'bg-blue-600 text-white ring-2 ring-blue-500/30'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                          title={`Câu ${sIdx + 1}`}
                        >
                          {sIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-mono font-black text-slate-500">
                  <span>Câu {activeSentenceIndex + 1}/{totalLessonSentences}</span>
                </div>
              </div>

              {/* 2-Column IELTS Dictionary Translation Studio */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* ─── LEFT COLUMN: PROMPT & MASKED HINTS & REMAINING ─── */}
                <div
                  className={`lg:col-span-6 p-6 md:p-8 rounded-3xl border space-y-6 ${
                    isLight ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      ĐỀ BÀI ({activeLesson.step} — {activeLesson.title})
                    </span>
                    <p className="text-xs text-slate-400 font-medium">
                      Dịch câu tiếng Việt sau sang tiếng Anh. Nhấn vào từ để xem gợi ý.
                    </p>
                  </div>

                  {/* Vietnamese Prompt */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      TIẾNG VIỆT ➔ ENGLISH
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-relaxed">
                      {currentSentence.vietnamese}
                    </h3>
                  </div>

                  {/* IELTS Dictionary Masked Word Hints */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
                        CÂU MẪU - NHỚ ĐÚNG ĐỂ MỞ TỪ:
                      </span>
                      <button
                        type="button"
                        onClick={() => revealAllWords(currentSentence.id)}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <i className="fa-solid fa-eye text-[10px]" />
                        <span>Hiện tất cả</span>
                      </button>
                    </div>

                    {/* Word-by-word Masked Pills */}
                    <div className="flex flex-wrap gap-2">
                      {currentSentence.masked.map((maskedWord, wIdx) => {
                        const revealed = isWordRevealed(currentSentence.id, wIdx);
                        const targetWord = tokenizeWords(currentSentence.target)[wIdx] || maskedWord;
                        return (
                          <button
                            key={wIdx}
                            type="button"
                            onClick={() => toggleRevealWord(currentSentence.id, wIdx)}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleWordDoubleClick(targetWord);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-mono font-bold transition-all border flex items-center gap-1.5 cursor-pointer select-none ${
                              revealed
                                ? 'bg-blue-500/15 border-blue-400 text-blue-700 dark:text-blue-300 shadow-xs'
                                : isLight
                                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                            }`}
                            title={revealed ? 'Nhấn để ẩn từ • Nhấp đúp để tra & lưu từ này' : 'Nhấn để xem từ này • Nhấp đúp để tra & lưu từ này'}
                          >
                            <i className={`fa-solid ${revealed ? 'fa-eye text-blue-500' : 'fa-eye-slash text-slate-400'} text-[10px]`} />
                            <span>{revealed ? targetWord : maskedWord}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vocabulary & Grammar Note Dropdown */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowHints((prev) => ({
                          ...prev,
                          [currentSentence.id]: !prev[currentSentence.id],
                        }))
                      }
                      className="text-amber-600 dark:text-amber-400 hover:underline text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-regular fa-lightbulb text-amber-500" />
                      <span>{showHints[currentSentence.id] ? 'Ẩn gợi ý ngữ pháp & từ vựng' : '💡 Xem gợi ý từ vựng'}</span>
                    </button>

                    {showHints[currentSentence.id] && (
                      <div
                        className={`mt-2 p-3.5 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
                          isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                        }`}
                      >
                        {currentSentence.hints?.length > 0 && (
                          <div className="space-y-1">
                            <span className="font-bold text-[11px] uppercase tracking-wide">Cụm từ gợi ý (bấm để tra nghĩa & lưu):</span>
                            <div className="flex flex-wrap gap-1.5">
                              {currentSentence.hints.map((h, hIdx) => {
                                const saved = isWordSaved(h);
                                return (
                                  <div
                                    key={hIdx}
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition ${
                                      saved
                                        ? 'bg-amber-500/25 text-amber-800 dark:text-amber-200 border-amber-400 shadow-xs'
                                        : 'bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-500/20 hover:bg-amber-500/20'
                                    }`}
                                  >
                                    <span
                                      onClick={() => setLookupWord(h)}
                                      className="cursor-pointer hover:underline"
                                      title="Nhấp để tra từ điển & nghe phát âm"
                                    >
                                      {h}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSaveWord(h);
                                      }}
                                      className="text-amber-600 dark:text-amber-400 hover:scale-125 transition cursor-pointer"
                                      title={saved ? 'Đã lưu trong Sổ từ vựng (Nhấn để hủy lưu)' : 'Lưu từ này vào Sổ từ vựng'}
                                    >
                                      <i className={`fa-solid ${saved ? 'fa-bookmark text-amber-500' : 'fa-regular fa-bookmark text-slate-400'}`} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {currentSentence.grammarNote && (
                          <p className="text-[11px] leading-relaxed opacity-90 pt-1 border-t border-amber-500/20">
                            <strong>Ngữ pháp:</strong> {currentSentence.grammarNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Remaining Sentences Preview */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      CÁC CÂU CÒN LẠI ({completedLessonSentencesCount}/{totalLessonSentences})
                    </span>
                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
                      {currentSentenceList.map((st, idx) => {
                        const isDone = ieltsCheckState[st.id]?.checked && ieltsCheckState[st.id]?.score === 100;
                        const isCurr = idx === activeSentenceIndex;
                        return (
                          <div
                            key={st.id}
                            onClick={() => setActiveSentenceIndex(idx)}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition ${
                              isCurr
                                ? isLight ? 'bg-blue-50 border-blue-300 font-bold' : 'bg-blue-950/40 border-blue-700 font-bold'
                                : isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
                            }`}
                          >
                            <span className="truncate flex-1">
                              <strong>Câu {idx + 1}:</strong> {st.vietnamese}
                            </span>
                            {isDone ? (
                              <i className="fa-solid fa-circle-check text-emerald-500 text-xs shrink-0" />
                            ) : (
                              <i className="fa-regular fa-circle text-slate-400 text-xs shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ─── RIGHT COLUMN: USER TRANSLATION & SUBMISSION ──── */}
                <div
                  className={`lg:col-span-6 p-6 md:p-8 rounded-3xl border space-y-5 ${
                    isLight ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <span>BÀI DỊCH CỦA BẠN:</span>
                      <span className="text-[10px] font-normal text-slate-400 italic hidden sm:inline">
                        (Bôi đen từ hoặc cụm từ để tra & lưu)
                      </span>
                    </span>
                    <span
                      className={`font-mono font-bold px-2.5 py-0.5 rounded-full border text-xs ${
                        liveMatch.matched === liveMatch.total && liveMatch.total > 0
                          ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {liveMatch.matched}/{liveMatch.total} từ đúng
                    </span>
                  </div>

                  {/* Input Textarea */}
                  <textarea
                    ref={inputRef}
                    rows={5}
                    value={currentSentenceInput}
                    onChange={(e) =>
                      setIeltsInputs((prev) => ({
                        ...prev,
                        [currentSentence.id]: e.target.value,
                      }))
                    }
                    onMouseUp={handleTextareaMouseUp}
                    onDoubleClick={handleTextareaDoubleClick}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (canAdvanceToNext) {
                          handleNextSentence();
                        } else {
                          handleCheckSentence(currentSentence);
                        }
                      }
                    }}
                    placeholder={
                      canAdvanceToNext
                        ? "Chính xác 100%! Nhấn Enter để qua câu tiếp theo..."
                        : currentSentenceCheck?.checked && !isCurrentSentenceCompleted
                        ? "Chưa đạt 100%. Sửa câu và nhấn Enter để nộp lại..."
                        : "Gõ bản dịch tiếng Anh của bạn tại đây... (Nhấn Enter để nộp)"
                    }
                    className={`w-full p-4 rounded-2xl text-sm md:text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none ${
                      isLight
                        ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400'
                        : 'bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-500'
                    }`}
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setIeltsInputs((prev) => ({
                          ...prev,
                          [currentSentence.id]: '',
                        }))
                      }
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-slate-500"
                    >
                      XOÁ HẾT
                    </button>

                    {canAdvanceToNext && activeSentenceIndex < totalLessonSentences - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextSentence}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs md:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer animate-fadeIn"
                      >
                        <span>CÂU TIẾP THEO (ENTER)</span>
                        <i className="fa-solid fa-arrow-right text-xs" />
                      </button>
                    ) : canAdvanceToNext && activeSentenceIndex === totalLessonSentences - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextSentence}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs md:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer animate-fadeIn"
                      >
                        <i className="fa-solid fa-circle-check text-xs" />
                        <span>HOÀN THÀNH BÀI (ENTER)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCheckSentence(currentSentence)}
                        disabled={!currentSentenceInput.trim()}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs md:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <i className={`fa-solid ${currentSentenceCheck?.checked && !isCurrentSentenceCompleted ? 'fa-rotate-right' : 'fa-paper-plane'} text-xs`} />
                        <span>{currentSentenceCheck?.checked && !isCurrentSentenceCompleted ? 'NỘP LẠI (ENTER)' : 'NỘP (ENTER)'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] font-mono text-center">
                    {canAdvanceToNext ? (
                      <span className="text-emerald-500 font-bold">
                        {activeSentenceIndex < totalLessonSentences - 1
                          ? '✓ Chính xác 100%! Nhấn Enter để qua câu tiếp theo • Shift+Enter xuống dòng'
                          : '🎉 Hoàn thành 100%! Nhấn Enter để hoàn tất bài học • Shift+Enter xuống dòng'}
                      </span>
                    ) : currentSentenceCheck?.checked && !isCurrentSentenceCompleted ? (
                      <span className="text-amber-500 font-bold">
                        ⚠️ Chưa đạt 100% • Sửa lại các từ chưa đúng và nhấn Enter để nộp lại
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Enter nộp bài • Shift+Enter xuống dòng • Nhấn từ để mở • Nhấp đúp từ bất kỳ để tra & lưu
                      </span>
                    )}
                  </p>

                  {/* Evaluation Result Feedback */}
                  {ieltsCheckState[currentSentence.id]?.checked && (
                    <div
                      className={`p-4 md:p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                        ieltsCheckState[currentSentence.id].score === 100
                          ? isLight
                            ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                            : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                          : isLight
                          ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                          : 'bg-amber-950/30 border-amber-800 text-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                              ieltsCheckState[currentSentence.id].score === 100
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-600 text-white'
                            }`}
                          >
                            <i
                              className={`fa-solid ${
                                ieltsCheckState[currentSentence.id].score === 100 ? 'fa-check' : 'fa-triangle-exclamation'
                              }`}
                            />
                          </span>
                          <span className="font-extrabold text-sm">
                            {ieltsCheckState[currentSentence.id].score === 100 ? 'Chính xác 100%! Đạt chuẩn bản ngữ' : 'Chưa chính xác (Cần đạt 100%)'}
                          </span>
                        </div>
                        <span className="font-mono font-black text-sm">
                          {ieltsCheckState[currentSentence.id].score}% tương đồng
                        </span>
                      </div>

                      {/* Word Diff Visualization - Daily Dictation Style */}
                      <div className="p-3.5 rounded-2xl bg-black/10 dark:bg-black/30 border border-black/10 text-xs font-mono space-y-2">
                        <div className="flex items-center justify-between text-[11px] opacity-80">
                          <span className="font-bold flex items-center gap-1.5">
                            <i className="fa-solid fa-spell-check text-blue-500" />
                            <span>Đối soát (kiểu Daily Dictation):</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 italic hidden sm:inline">
                              Chỉ hiện ký tự gợi ý • Nhấn vào từ để mở toàn bộ
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const sId = currentSentence.id;
                                const isAllOpen = revealedDiffWords[`${sId}_all`];
                                setRevealedDiffWords((prev) => ({
                                  ...prev,
                                  [`${sId}_all`]: !isAllOpen,
                                }));
                              }}
                              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                            >
                              {revealedDiffWords[`${currentSentence.id}_all`] ? 'Ẩn bớt từ' : 'Hiện tất cả'}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
                          {ieltsCheckState[currentSentence.id].diff.map((df, dfIdx) => {
                            const isAllRevealed = revealedDiffWords[`${currentSentence.id}_all`];
                            const isWordExplicitlyRevealed = isAllRevealed || revealedDiffWords[`${currentSentence.id}_${dfIdx}`] || ieltsCheckState[currentSentence.id].score === 100;

                            if (df.type === 'match') {
                              return (
                                <span
                                  key={dfIdx}
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleWordDoubleClick(df.userWord);
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold cursor-pointer hover:underline hover:opacity-80 transition"
                                  title="Chính xác! Nhấp đúp để tra từ điển"
                                >
                                  {df.userWord}
                                </span>
                              );
                            }
                            if (df.type === 'replace') {
                              return (
                                <span
                                  key={dfIdx}
                                  onClick={() => {
                                    const err = findFirstErrorSelection(currentSentenceInput, { diffs: [df] });
                                    if (inputRef.current) {
                                      inputRef.current.focus();
                                      inputRef.current.setSelectionRange(err.start, err.end);
                                    }
                                    setRevealedDiffWords((prev) => ({
                                      ...prev,
                                      [`${currentSentence.id}_${dfIdx}`]: !prev[`${currentSentence.id}_${dfIdx}`],
                                    }));
                                  }}
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleWordDoubleClick(df.targetWord || df.userWord);
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold cursor-pointer hover:ring-1 hover:ring-amber-400 transition select-none"
                                  title={isWordExplicitlyRevealed ? 'Đã mở từ • Nhấn để trỏ con trỏ sửa lỗi • Nhấp đúp để tra từ' : 'Nhấn để mở từ này / trỏ sửa lỗi • Nhấp đúp để tra từ'}
                                >
                                  <span className="line-through opacity-75">{df.userWord}</span>
                                  <span className="mx-1 text-slate-400 font-normal">➔</span>
                                  <span>{isWordExplicitlyRevealed ? df.targetWord : maskWordPartially(df.targetWord, true)}</span>
                                </span>
                              );
                            }
                            if (df.type === 'extra') {
                              return (
                                <span
                                  key={dfIdx}
                                  onClick={() => {
                                    const err = findFirstErrorSelection(currentSentenceInput, { diffs: [df] });
                                    if (inputRef.current) {
                                      inputRef.current.focus();
                                      inputRef.current.setSelectionRange(err.start, err.end);
                                    }
                                  }}
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleWordDoubleClick(df.userWord);
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 line-through cursor-pointer hover:ring-1 hover:ring-rose-400 transition font-bold"
                                  title="Từ thừa • Nhấn để trỏ con trỏ về vị trí này • Nhấp đúp để tra từ"
                                >
                                  +{df.userWord}
                                </span>
                              );
                            }
                            if (df.type === 'missing') {
                              return (
                                <span
                                  key={dfIdx}
                                  onClick={() => {
                                    setRevealedDiffWords((prev) => ({
                                      ...prev,
                                      [`${currentSentence.id}_${dfIdx}`]: !prev[`${currentSentence.id}_${dfIdx}`],
                                    }));
                                  }}
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleWordDoubleClick(df.targetWord);
                                  }}
                                  className={`px-1.5 py-0.5 rounded border border-dashed font-bold cursor-pointer transition select-none ${
                                    isWordExplicitlyRevealed
                                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-300 shadow-xs'
                                      : 'border-blue-400/60 text-blue-500/80 hover:bg-blue-500/10 hover:border-blue-500'
                                  }`}
                                  title={isWordExplicitlyRevealed ? 'Đã mở từ • Nhấn để ẩn bớt • Nhấp đúp tra từ' : 'Từ còn thiếu • Nhấn để mở toàn bộ từ này • Nhấp đúp tra từ'}
                                >
                                  [{isWordExplicitlyRevealed ? df.targetWord : maskWordPartially(df.targetWord, true)}]
                                </span>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>

                      {/* Target Sentence Display - Protected until 100% or explicitly revealed */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] opacity-80 uppercase tracking-wider">
                            Bản dịch chuẩn IELTS:
                          </span>
                          {ieltsCheckState[currentSentence.id].score < 100 ? (
                            <button
                              type="button"
                              onClick={() =>
                                setShowFullTargetSentence((prev) => ({
                                  ...prev,
                                  [currentSentence.id]: !prev[currentSentence.id],
                                }))
                              }
                              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <i className={`fa-solid ${showFullTargetSentence[currentSentence.id] ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`} />
                              <span>{showFullTargetSentence[currentSentence.id] ? 'Ẩn đáp án đầy đủ' : 'Xem toàn bộ đáp án'}</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">
                              💡 Nhấp đúp hoặc bôi đen từ bất kỳ để tra nghĩa & lưu từ
                            </span>
                          )}
                        </div>

                        {ieltsCheckState[currentSentence.id].score === 100 || showFullTargetSentence[currentSentence.id] ? (
                          <p
                            onMouseUp={handleSelectionLookup}
                            onDoubleClick={handleSelectionLookup}
                            className="font-semibold text-slate-800 dark:text-slate-100 select-all p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 leading-relaxed cursor-text animate-fadeIn"
                          >
                            {ieltsCheckState[currentSentence.id].bestTarget}
                          </p>
                        ) : (
                          <div
                            onClick={() =>
                              setShowFullTargetSentence((prev) => ({
                                ...prev,
                                [currentSentence.id]: true,
                              }))
                            }
                            className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-[11px] flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition select-none"
                            title="Nhấn để xem toàn bộ đáp án nếu bạn muốn tham khảo"
                          >
                            <span className="flex items-center gap-1.5 font-mono">
                              <i className="fa-solid fa-lock text-[10px] text-amber-500" />
                              <span>Đáp án đầy đủ đang được ẩn để bạn tự nhớ & gõ (nhấn để mở xem)</span>
                            </span>
                            <span className="text-[10px] text-blue-500 font-bold hover:underline shrink-0">Mở đáp án ➔</span>
                          </div>
                        )}
                      </div>

                      {/* Next Question Navigation */}
                      {isCurrentSentenceCompleted ? (
                        activeSentenceIndex < totalLessonSentences - 1 ? (
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={handleNextSentence}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <span>Sang câu tiếp theo (Enter)</span>
                              <i className="fa-solid fa-arrow-right text-[11px]" />
                            </button>
                          </div>
                        ) : (
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={handleNextSentence}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <i className="fa-solid fa-circle-check text-[11px]" />
                              <span>Hoàn thành bài tập (Enter)</span>
                            </button>
                          </div>
                        )
                      ) : (
                        <div className="pt-2 flex items-center justify-between text-xs bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                          <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5 text-xs">
                            <i className="fa-solid fa-circle-exclamation text-xs" />
                            <span>Chưa đạt 100%: Cần viết đúng chính xác câu mẫu để mở câu tiếp theo</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (inputRef.current) {
                                inputRef.current.focus();
                                const ch = ieltsCheckState[currentSentence.id];
                                const err = ch?.firstError || (ch?.diff ? findFirstErrorSelection(currentSentenceInput, ch) : null);
                                if (err) {
                                  inputRef.current.setSelectionRange(err.start, err.end);
                                }
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                          >
                            <span>Trỏ con trỏ sửa lỗi</span>
                            <i className="fa-solid fa-i-cursor text-[10px]" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* ─── 2. LIST VIEW (ALL SENTENCES OF LESSON) ───────────────── */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {viewMode === 'list' && (
            <div className="space-y-4 animate-fadeIn">
              {currentSentenceList.map((st, idx) => {
                const userVal = ieltsInputs[st.id] || '';
                const ch = ieltsCheckState[st.id];
                return (
                  <div
                    key={st.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-400">Câu {idx + 1}</span>
                      {ch?.checked && (
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded-full ${
                            ch.score >= 75 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                          }`}
                        >
                          {ch.score}% đúng
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-sm text-slate-900 dark:text-white">{st.vietnamese}</p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) =>
                          setIeltsInputs((prev) => ({
                            ...prev,
                            [st.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCheckSentence(st);
                        }}
                        placeholder="Gõ bản dịch tiếng Anh..."
                        className={`flex-1 p-2.5 px-3.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleCheckSentence(st)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shrink-0 cursor-pointer"
                      >
                        Kiểm tra
                      </button>
                    </div>

                    {ch?.checked && (
                      <div className="text-xs space-y-1 pt-1 font-mono">
                        <span className="text-slate-400">Đáp án chuẩn: </span>
                        <span
                          onMouseUp={handleSelectionLookup}
                          onDoubleClick={handleSelectionLookup}
                          className="text-emerald-600 dark:text-emerald-400 font-bold cursor-pointer select-text"
                          title="Nhấp đúp hoặc bôi đen để tra & lưu từ"
                        >
                          {st.target}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Quick Word Lookup Modal for double-click / selection in Writing */}
      {lookupWord && (
        <WordLookupModal
          word={lookupWord}
          onClose={() => setLookupWord(null)}
          theme={theme}
        />
      )}
    </div>
  );
}
