import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import { UNIFIED_MASTER_DAYS } from '../data/unifiedMasterRoadmap';
import {
  STUDY4_TEST_TRACK,
  STUDY4_VOCAB_TRACK,
  TEST_TRACK_START_DATE,
  getStudy4TestSession,
  DEFAULT_ACTIVE_TEST_NUM,
} from '../data/toeicScheduleStudy4';
import { READING_DATABASE } from '../data/readingData';
import { VIDEO_LESSONS_DATABASE } from '../data/videoLessonsData';
import ScheduleRoadmapSidePanel from './ScheduleRoadmapSidePanel';
import {
  DEFAULT_DICTATION_STARS,
  getDayDictationStatus,
  isLessonStarred,
} from '../utils/dictationProgress';
import study4ListeningData from '../data/study4ListeningTest1.json';
import study4ReadingData from '../data/study4ReadingTest1.json';
import { VOCAB_DATABASE } from '../data/vocabularyByLevelAndPart';
import OverdueStudyReminderBanner from './OverdueStudyReminderBanner';
import { calculateOverdueTasks } from '../utils/overdueTasksHelper';
import { DEFAULT_USER_LEARNING_PROFILE } from '../config/learningCertifications';

const PILLAR_CONFIG = {
  study4Test: { label: 'Làm & Chữa Đề Study4', color: 'bg-rose-500 text-white border-rose-600', lightBg: 'bg-rose-50 border-rose-200 text-rose-800', icon: 'fa-bullseye' },
  study4Vocab: { label: 'Từ Vựng Study4', color: 'bg-purple-600 text-white border-purple-700', lightBg: 'bg-purple-50 border-purple-200 text-purple-800', icon: 'fa-book-open' },
  dd: { label: 'DailyDictation', color: 'bg-sky-500 text-white border-sky-600', lightBg: 'bg-sky-50 border-sky-200 text-sky-800', icon: 'fa-headphones' },
  grammar: { label: 'Test-English (Grammar/Read)', color: 'bg-amber-500 text-slate-950 border-amber-600', lightBg: 'bg-amber-50 border-amber-200 text-amber-900', icon: 'fa-book-open' },
  writing: { label: 'The IELTS Dict (Dịch câu)', color: 'bg-indigo-600 text-white border-indigo-700', lightBg: 'bg-indigo-50 border-indigo-200 text-indigo-900', icon: 'fa-pen-nib' },
  speaking: { label: 'Video Shadowing AI', color: 'bg-emerald-600 text-white border-emerald-700', lightBg: 'bg-emerald-50 border-emerald-200 text-emerald-900', icon: 'fa-microphone-lines' },
};

const DOW_LABELS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

export default function GoogleCalendarScheduleHub({
  initialDateKey,
  initialDay,
  initialDate,
  initialViewMode,
  onNavigateTab,
  theme = 'dark',
}) {
  const isLight = theme === 'light';

  // Persistence: Completed tasks map: { [`${dateStr}_${pillarKey}`]: boolean }
  const [completedTasks, setCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const [roadmapTasks, setRoadmapTasks] = useUserStorage('master_roadmap_completed_tasks_v1', {});
  const [activeTestNum, setActiveTestNum] = useUserStorage('study4_active_test_num_v1', DEFAULT_ACTIVE_TEST_NUM);
  const [study4StatusMap, setStudy4StatusMap] = useUserStorage('study4_status_map_v1', {
    1: 'Hoàn thành',
    2: 'Hoàn thành',
    3: 'Hoàn thành',
    4: 'Hoàn thành',
  });

  // Grammar Remembered & Quiz persistence
  const [grammarRemembered, setGrammarRemembered] = useUserStorage('grammar_remembered_v2', {});
  const [grammarQuizSubmitted] = useUserStorage('grammar_quiz_submitted_v2', {});
  const [grammarQuizScores] = useUserStorage('grammar_quiz_scores_v2', {});

  const isGrammarLessonCompleted = useCallback((lessonId) => {
    if (!lessonId) return false;
    const lid = String(lessonId);
    const qScore = grammarQuizScores && grammarQuizScores[lid];
    const qPassed = Boolean(qScore && (qScore.percent >= 60 || qScore.score >= 3));
    return Boolean(grammarRemembered[lid] || grammarQuizSubmitted[lid] || qPassed);
  }, [grammarRemembered, grammarQuizSubmitted, grammarQuizScores]);

  // Robust helper to verify if a task is completed across all date key formats and roadmap day mappings
  const isTaskKeyCompleted = useCallback((dateKey, pillarKey, plan) => {
    if (!completedTasks && !roadmapTasks) return false;

    // 1. Direct key on completedTasks: e.g. 01/09/2026_dd
    if (completedTasks && completedTasks[`${dateKey}_${pillarKey}`]) return true;

    // 2. Unpadded/padded date key variation: e.g. 1/9/2026_dd vs 01/09/2026_dd
    if (dateKey && dateKey.includes('/')) {
      const parts = dateKey.split('/');
      if (parts.length === 3) {
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const y = parts[2];
        const unpaddedKey = `${d}/${m}/${y}_${pillarKey}`;
        const paddedKey = `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}_${pillarKey}`;
        if (completedTasks && (completedTasks[unpaddedKey] || completedTasks[paddedKey])) return true;
      }
    }

    // 3. Day num keys on completedTasks or roadmapTasks: e.g. day_1_grammar, day_1_dd
    const dayNum = plan?.day;
    if (dayNum) {
      if (completedTasks && (completedTasks[`day_${dayNum}_${pillarKey}`] || completedTasks[`day_${dayNum}`])) return true;
      if (roadmapTasks && (roadmapTasks[`day_${dayNum}_${pillarKey}`] || roadmapTasks[`day_${dayNum}`])) return true;
      if (pillarKey === 'study4_vocab') {
        if (roadmapTasks && (roadmapTasks[`day_${dayNum}_study4`] || roadmapTasks[`day_${dayNum}_study4_vocab`])) return true;
        if (completedTasks && (completedTasks[`day_${dayNum}_study4`] || completedTasks[`${dateKey}_study4`])) return true;
      }
      if (pillarKey === 'shadowing') {
        if (roadmapTasks && (roadmapTasks[`day_${dayNum}_speaking`] || roadmapTasks[`day_${dayNum}_shadowing`])) return true;
        if (completedTasks && (completedTasks[`${dateKey}_speaking`] || completedTasks[`day_${dayNum}_speaking`])) return true;
      }
    }

    return false;
  }, [completedTasks, roadmapTasks]);

  // Reading Completed & Quiz persistence
  const [completedReading, setCompletedReading] = useUserStorage('reading_completed_tests_v2', {});
  const [readingQuizSubmitted, setReadingQuizSubmitted] = useUserStorage('reading_quiz_submitted_v1', {});

  const getReadingTestIdForDay = useCallback((dayNum) => {
    const day = dayNum || 1;
    const a1Tests = READING_DATABASE.A1 || [];
    const a2Tests = READING_DATABASE.A2 || [];
    const b1Tests = READING_DATABASE.B1 || [];

    if (day <= 15) {
      const idx = (day - 1) % a1Tests.length;
      return a1Tests[idx]?.id || a1Tests[0]?.id;
    } else if (day <= 35) {
      const idx = (day - 16) % a2Tests.length;
      return a2Tests[idx]?.id || a2Tests[0]?.id;
    } else {
      const idx = (day - 36) % b1Tests.length;
      return b1Tests[idx]?.id || b1Tests[0]?.id;
    }
  }, []);

  // DailyDictation Star Overrides
  const [dictationStars, setDictationStars] = useUserStorage('dailydictation_stars_v4', DEFAULT_DICTATION_STARS);

  // Vocabulary persistence for auto-sync
  const [knownWordsMap] = useUserStorage('vocab_mastery_v2', {});
  const [vocabDayCompleted, setVocabDayCompleted] = useUserStorage('vocab_day_completed_v1', {});

  // Shadowing Speaking Time & Sentence Completion persistence
  const [speakingSecondsMap] = useUserStorage('shadowing_speaking_seconds_v1', {});
  const [shadowedSentencesMap] = useUserStorage('shadowing_sentences_done_v2', {});
  const [completedWriting] = useUserStorage('writing_practice_completed_v2', {});

  // Overdue / Pending tasks from previous days calculation
  const overdueData = useMemo(() => {
    return calculateOverdueTasks({
      completedTasks,
      grammarRemembered,
      grammarQuizSubmitted,
      completedReading,
      readingQuizSubmitted,
      dictationStars,
      vocabDayCompleted,
      knownWordsMap,
      speakingSecondsMap,
      shadowedSentencesMap,
      completedWriting,
      activeTestNum,
      study4StatusMap,
    });
  }, [
    completedTasks,
    grammarRemembered,
    grammarQuizSubmitted,
    completedReading,
    readingQuizSubmitted,
    dictationStars,
    vocabDayCompleted,
    knownWordsMap,
    speakingSecondsMap,
    shadowedSentencesMap,
    completedWriting,
    activeTestNum,
    study4StatusMap,
  ]);

  // Side Roadmap visibility state
  const [showSideRoadmap, setShowSideRoadmap] = useUserStorage('show_side_roadmap_v1', true);

  // Helper to parse date string 'DD/MM/YYYY' into Date object
  const parseDateKey = useCallback((str) => {
    if (!str || typeof str !== 'string' || !str.includes('/')) return null;
    const parts = str.split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
        return new Date(y, m, d);
      }
    }
    return null;
  }, []);

  const getDateFromDayNum = useCallback((dayNum) => {
    const num = parseInt(dayNum, 10);
    if (!isNaN(num) && num >= 1) {
      const start = new Date(2026, 8, 1);
      const target = new Date(start);
      target.setDate(target.getDate() + (num - 1));
      return target;
    }
    return null;
  }, []);

  // Persistent storage for calendar state so navigating away and returning preserves exact position
  const [savedDateKey, setSavedDateKey] = useUserStorage('calendar_last_date_key_v2', '');
  const [savedViewMode, setSavedViewMode] = useUserStorage('calendar_view_mode_v2', 'day');
  const [learningProfile] = useUserStorage('user_learning_profile_v1', DEFAULT_USER_LEARNING_PROFILE);

  // Current Calendar Focus: Day / Week / Month
  const [viewMode, setViewModeState] = useState(() => initialViewMode || savedViewMode || 'day');

  const setViewMode = useCallback((mode) => {
    setViewModeState(mode);
    setSavedViewMode(mode);
  }, [setSavedViewMode]);

  const [currentDate, setCurrentDateState] = useState(() => {
    if (initialDate instanceof Date && !isNaN(initialDate.getTime())) return initialDate;
    if (initialDateKey) {
      const p = parseDateKey(initialDateKey);
      if (p) return p;
    }
    if (initialDay) {
      const p = getDateFromDayNum(initialDay);
      if (p) return p;
    }
    if (savedDateKey) {
      const p = parseDateKey(savedDateKey);
      if (p) return p;
    }
    return new Date();
  });

  const setCurrentDate = useCallback((dateOrUpdater) => {
    setCurrentDateState((prev) => {
      const next = typeof dateOrUpdater === 'function' ? dateOrUpdater(prev) : dateOrUpdater;
      if (next instanceof Date && !isNaN(next.getTime())) {
        const nextKey = `${String(next.getDate()).padStart(2, '0')}/${String(next.getMonth() + 1).padStart(2, '0')}/${next.getFullYear()}`;
        setSavedDateKey(nextKey);
      }
      return next;
    });
  }, [setSavedDateKey]);

  // Sync if initialDateKey or initialDate changes from outside (e.g. clicking 'Xem ngày này trên Lịch' or URL navigation)
  useEffect(() => {
    if (initialDate instanceof Date && !isNaN(initialDate.getTime())) {
      setCurrentDate(initialDate);
    } else if (initialDateKey) {
      const p = parseDateKey(initialDateKey);
      if (p) setCurrentDate(p);
    } else if (initialDay) {
      const p = getDateFromDayNum(initialDay);
      if (p) setCurrentDate(p);
    }
  }, [initialDate, initialDateKey, initialDay, parseDateKey, getDateFromDayNum, setCurrentDate]);

  useEffect(() => {
    if (initialViewMode && initialViewMode !== viewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode, viewMode, setViewMode]);

  const [selectedDayObj, setSelectedDayObj] = useState(null);

  // Active Pillar Filter
  const [activeFilters, setActiveFilters] = useState({
    study4: true,
    dd: true,
    grammar: true,
    writing: true,
    speaking: true,
  });

  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTaskDone = (dateKey, pillarKey) => {
    const plan = getDayPlan(currentDate, true);
    const ddStatus = getDayDictationStatus(plan?.dailyDictation, dictationStars);
    const isGrammarAutoDone = pillarKey === 'grammar' && isGrammarLessonCompleted(plan?.grammar?.lessonId);
    const wasCompleted = Boolean(
      isTaskKeyCompleted(dateKey, pillarKey, plan) ||
      (pillarKey === 'dd' && ddStatus.isAllDone) ||
      isGrammarAutoDone
    );
    const nextVal = !wasCompleted;

    const parts = dateKey && dateKey.includes('/') ? dateKey.split('/') : [];
    const keysToUpdate = [`${dateKey}_${pillarKey}`];
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const y = parts[2];
      keysToUpdate.push(`${d}/${m}/${y}_${pillarKey}`);
      keysToUpdate.push(`${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}_${pillarKey}`);
    }
    if (plan && plan.day) {
      keysToUpdate.push(`day_${plan.day}_${pillarKey}`);
      if (pillarKey === 'study4_vocab') {
        keysToUpdate.push(`day_${plan.day}_study4`);
        keysToUpdate.push(`${dateKey}_study4`);
      }
      if (pillarKey === 'shadowing') {
        keysToUpdate.push(`day_${plan.day}_speaking`);
        keysToUpdate.push(`${dateKey}_speaking`);
      }
    }

    setCompletedTasks((prev) => {
      const updated = { ...prev };
      keysToUpdate.forEach((k) => {
        updated[k] = nextVal;
      });
      return updated;
    });

    setRoadmapTasks((prev) => {
      const updated = { ...prev };
      if (plan && plan.day) {
        updated[`day_${plan.day}_${pillarKey}`] = nextVal;
        if (pillarKey === 'study4_vocab') updated[`day_${plan.day}_study4`] = nextVal;
        if (pillarKey === 'shadowing') updated[`day_${plan.day}_speaking`] = nextVal;
      }
      return updated;
    });

    // If completing the DailyDictation task, also mark all 3 tracks of that day as starred
    if (pillarKey === 'dd' && ddStatus.tracks.length > 0) {
      setDictationStars((prev) => {
        const updated = { ...prev };
        ddStatus.tracks.forEach((tr) => {
          updated[tr.id] = nextVal;
        });
        return updated;
      });
    }

    // If toggling grammar task, sync with grammar_remembered_v2
    if (pillarKey === 'grammar' && plan?.grammar?.lessonId) {
      setGrammarRemembered((prev) => ({
        ...prev,
        [String(plan.grammar.lessonId)]: nextVal,
      }));
    }

    // If toggling reading task, sync with completedReading
    if (pillarKey === 'reading') {
      const rTestId = getReadingTestIdForDay(plan?.day);
      if (rTestId) {
        setCompletedReading((prev) => ({
          ...prev,
          [rTestId]: nextVal,
        }));
      }
    }

    // If toggling study4 vocab task, sync with vocab_day_completed_v1
    if (pillarKey === 'study4_vocab' && currentVocabSession) {
      const trackIdx = currentVocabSession.trackIndex || 1;
      const chunkIdx = currentVocabSession.chunkIndex || 1;
      const skill = (currentVocabSession.skill || 'Listening').toLowerCase();
      setVocabDayCompleted((prev) => ({
        ...prev,
        [`study4_${skill}_day_${chunkIdx}`]: nextVal,
        [`study4_day_${chunkIdx}`]: nextVal,
        [`study4_${skill}_day_${trackIdx}`]: nextVal,
        [`study4_day_${trackIdx}`]: nextVal,
        [`${dateKey}_study4_vocab`]: nextVal,
      }));
    }

    // If toggling vocab (alternating vocab) task, sync with vocab_day_completed_v1
    if (pillarKey === 'vocab' && plan) {
      const dayNum = plan.day || 1;
      setVocabDayCompleted((prev) => ({
        ...prev,
        [`day_${dayNum}_vocab`]: nextVal,
        [`dd_vocab_day_${dayNum}`]: nextVal,
        [`part_vocab_day_${dayNum}`]: nextVal,
        [`${dateKey}_vocab`]: nextVal,
      }));
    }
  };

  const toggleTrackStar = (trackId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const curVal = isLessonStarred(trackId, dictationStars);
    const nextVal = !curVal;
    setDictationStars((prev) => ({
      ...prev,
      [trackId]: nextVal,
    }));
  };

  // Helper date conversions
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Navigation handlers
  const prevPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === 'week') {
      const prev = new Date(currentDate);
      prev.setDate(prev.getDate() - 7);
      setCurrentDate(prev);
    } else {
      const prev = new Date(currentDate);
      prev.setDate(prev.getDate() - 1);
      setCurrentDate(prev);
    }
  };

  const nextPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === 'week') {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 7);
      setCurrentDate(next);
    } else {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 1);
      setCurrentDate(next);
    }
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  // Helper to map date to master roadmap data item
  const getDayPlan = (dateOrDayNum, isCurrentMonth = true) => {
    if (!isCurrentMonth) return null;
    let dayIndex = 0;
    if (dateOrDayNum instanceof Date) {
      const start = new Date(2026, 8, 1); // Roadmap starts on 01/09/2026
      const d = new Date(dateOrDayNum.getFullYear(), dateOrDayNum.getMonth(), dateOrDayNum.getDate());
      const diffDays = Math.round((d - start) / (1000 * 60 * 60 * 24));
      // Dates prior to 01/09/2026 have no scheduled roadmap!
      if (diffDays < 0) return null;
      dayIndex = diffDays;
    } else {
      dayIndex = dateOrDayNum - 1;
    }
    if (dayIndex < 0) return null;
    const idx = dayIndex % UNIFIED_MASTER_DAYS.length;
    return UNIFIED_MASTER_DAYS[idx] || null;
  };

  const currentDateKey = useMemo(() => {
    return `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${year}`;
  }, [currentDate, year]);

  const currentDayPlan = useMemo(() => {
    return getDayPlan(currentDate, true);
  }, [currentDate]);

  // Generate Month Grid (42 cells)
  const monthGrid = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    let startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInMonth = lastDayOfMonth.getDate();
    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const dateObj = new Date(year, month - 1, d);
      days.push({
        dateObj,
        dayNum: d,
        isCurrentMonth: false,
        dateKey: `${String(d).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const dateKey = `${String(d).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
      days.push({
        dateObj,
        dayNum: d,
        isCurrentMonth: true,
        dateKey,
      });
    }

    const totalCells = days.length > 35 ? 42 : 35;
    const remaining = totalCells - days.length;
    for (let d = 1; d <= remaining; d++) {
      const dateObj = new Date(year, month + 1, d);
      const dateKey = `${String(d).padStart(2, '0')}/${String(month + 2).padStart(2, '0')}/${year}`;
      days.push({
        dateObj,
        dayNum: d,
        isCurrentMonth: false,
        dateKey,
      });
    }
    return days;
  }, [year, month]);

  // Week Grid (7 days)
  const weekGrid = useMemo(() => {
    const curr = new Date(currentDate);
    const dayOfWeek = (curr.getDay() + 6) % 7;
    const startOfWeek = new Date(curr);
    startOfWeek.setDate(curr.getDate() - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateKey = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
      days.push({
        dateObj: d,
        dayNum: d.getDate(),
        dowLabel: DOW_LABELS[i],
        dateKey,
        isCurrentMonth: d.getMonth() === month,
      });
    }
    return days;
  }, [currentDate, month]);

  const isSelectedToday = (dateObj) => {
    if (!dateObj) return false;
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  };

  // ─── 1. TUYẾN THỰC CHIẾN LÀM & CHỮA ĐỀ (TEST & REVIEW TRACK - 32 BUỔI) ───
  // Mặc định học viên đang ở Test 2 (Test 1 đã hoàn thành). Ngày 14/09 là Làm đề Listening Test 2.
  const currentTestSession = useMemo(() => {
    return getStudy4TestSession(currentDate, activeTestNum);
  }, [currentDate, activeTestNum]);

  // ─── 2. TUYẾN TỪ VỰNG STUDY4 CHUYÊN SÂU (VOCAB TRACK SONG SONG - 20 BUỔI) ───
  const currentVocabSession = useMemo(() => {
    const start = new Date(2026, 8, 1);
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const diffDays = Math.round((d - start) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return STUDY4_VOCAB_TRACK[0];
    const idx = diffDays % STUDY4_VOCAB_TRACK.length;
    return STUDY4_VOCAB_TRACK[idx] || STUDY4_VOCAB_TRACK[0];
  }, [currentDate]);

  const currentDdStatus = useMemo(() => {
    return getDayDictationStatus(currentDayPlan?.dailyDictation, dictationStars, currentDayPlan?.day);
  }, [currentDayPlan, dictationStars]);

  // Auto-sync completed status when all 3 DailyDictation tracks are completed
  useEffect(() => {
    if (currentDdStatus.isAllDone && !completedTasks[`${currentDateKey}_dd`]) {
      setCompletedTasks((prev) => ({
        ...prev,
        [`${currentDateKey}_dd`]: true,
      }));
    }
  }, [currentDdStatus.isAllDone, currentDateKey, completedTasks, setCompletedTasks]);

  // Auto-sync completed status when current day's grammar lesson is marked as remembered or quiz passed
  useEffect(() => {
    const lessonId = currentDayPlan?.grammar?.lessonId;
    if (lessonId && isGrammarLessonCompleted(lessonId) && !completedTasks[`${currentDateKey}_grammar`]) {
      setCompletedTasks((prev) => ({
        ...prev,
        [`${currentDateKey}_grammar`]: true,
      }));
    }
  }, [currentDayPlan?.grammar?.lessonId, isGrammarLessonCompleted, currentDateKey, completedTasks, setCompletedTasks]);

  // Auto-sync completed status when current day's reading test is completed or quiz submitted
  useEffect(() => {
    const rTestId = getReadingTestIdForDay(currentDayPlan?.day);
    if (rTestId && (completedReading[rTestId] || readingQuizSubmitted[rTestId]) && !completedTasks[`${currentDateKey}_reading`]) {
      setCompletedTasks((prev) => ({
        ...prev,
        [`${currentDateKey}_reading`]: true,
      }));
    }
  }, [currentDayPlan?.day, getReadingTestIdForDay, completedReading, readingQuizSubmitted, currentDateKey, completedTasks, setCompletedTasks]);

  // Helper to check if current vocab track session is completed
  const isVocabTrackDone = useCallback((vocabSession, dateKey) => {
    if (!vocabSession) return false;
    const trackIdx = vocabSession.trackIndex || 1;
    const chunkIdx = vocabSession.chunkIndex || 1;
    const skill = (vocabSession.skill || 'Listening').toLowerCase();

    // 1. Direct task completion record in calendar
    if (completedTasks[`${dateKey}_study4_vocab`]) return true;

    // 2. Day-level completion flag from Vocab tab
    if (
      vocabDayCompleted[`study4_${skill}_day_${chunkIdx}`] ||
      vocabDayCompleted[`study4_day_${chunkIdx}`] ||
      vocabDayCompleted[`study4_${skill}_day_${trackIdx}`] ||
      vocabDayCompleted[`study4_day_${trackIdx}`] ||
      vocabDayCompleted[`day_${chunkIdx}`] ||
      vocabDayCompleted[`${dateKey}_study4_vocab`]
    ) {
      return true;
    }

    // 3. Direct check from knownWordsMap (vocab_mastery_v2)
    const WORDS_PER_DAY = 50;
    const start = (chunkIdx - 1) * WORDS_PER_DAY;
    const sourceData = vocabSession.skill === 'Reading' ? study4ReadingData : study4ListeningData;
    const dayWords = Array.isArray(sourceData) ? sourceData.slice(start, start + WORDS_PER_DAY) : [];
    if (dayWords.length > 0) {
      let knownCount = 0;
      for (const item of dayWords) {
        if (item && item.word && knownWordsMap[item.word.trim().toLowerCase()]) {
          knownCount++;
        }
      }
      // If user learned at least 10 words or >= 25% of the day chunk, consider completed
      if (knownCount >= Math.min(dayWords.length, 10) || knownCount >= dayWords.length * 0.25) {
        return true;
      }
    }

    return false;
  }, [completedTasks, vocabDayCompleted, knownWordsMap]);

  // Helper to check if alternating vocab task (Task 5) is completed
  const isVocabAlternatingTaskDone = useCallback((plan, dateKey) => {
    if (!plan) return false;
    const dayNum = plan.day || 1;
    const va = plan.vocabAlternating;

    // 1. Direct task completion record in calendar
    if (completedTasks[`${dateKey}_vocab`]) return true;

    // 2. Day-level completion flag from Vocab tab
    if (
      vocabDayCompleted[`day_${dayNum}_vocab`] ||
      vocabDayCompleted[`dd_vocab_day_${dayNum}`] ||
      vocabDayCompleted[`dd_vocab_${va?.tabId || 'short-stories'}_day_${dayNum}`] ||
      vocabDayCompleted[`part_vocab_day_${dayNum}`] ||
      vocabDayCompleted[`notebook_vocab_day_${dayNum}`] ||
      vocabDayCompleted[`notebook_day_${dayNum}`] ||
      vocabDayCompleted[`study4_vocab_day_${dayNum}`] ||
      vocabDayCompleted[`${dateKey}_vocab`]
    ) {
      return true;
    }

    // 3. Direct check for notebook category
    if (va?.category === 'notebook') {
      if (
        vocabDayCompleted[`notebook_vocab_day_${dayNum}`] ||
        vocabDayCompleted[`notebook_day_${dayNum}`]
      ) {
        return true;
      }
    }

    // 4. Direct check for daily-dictation vocab using cached sheet in localStorage
    if (va?.category === 'daily-dictation') {
      try {
        const gid = va.tabId === 'conversation' ? '702236284' : '1196919825';
        const cacheKey = `gsheet_${gid}_1`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { payload } = JSON.parse(cached);
          if (Array.isArray(payload) && payload.length > 0) {
            const WORDS_PER_DAY = 50;
            const start = (dayNum - 1) * WORDS_PER_DAY;
            const dayWords = payload.slice(start, start + WORDS_PER_DAY);
            if (dayWords.length > 0) {
              let knownCount = 0;
              for (const item of dayWords) {
                if (item && item.word && knownWordsMap[item.word.trim().toLowerCase()]) {
                  knownCount++;
                }
              }
              if (knownCount >= Math.min(dayWords.length, 10) || knownCount >= dayWords.length * 0.25) {
                return true;
              }
            }
          }
        }
      } catch (e) {}
    }

    // 4. Direct check for Part vocab using VOCAB_DATABASE
    if (va?.category === 'part' && VOCAB_DATABASE) {
      try {
        const levelParts = VOCAB_DATABASE[va.levelId || 'so-cap'] || [];
        const partIdx = (va.partNum || 1) - 1;
        const partItem = levelParts[partIdx];
        const partWords = partItem?.words || [];
        if (partWords.length > 0) {
          let knownCount = 0;
          for (const item of partWords) {
            const w = typeof item === 'string' ? item : item?.word;
            if (w && knownWordsMap[w.trim().toLowerCase()]) {
              knownCount++;
            }
          }
          if (knownCount >= Math.min(partWords.length, 10) || knownCount >= partWords.length * 0.25) {
            return true;
          }
        }
      } catch (e) {}
    }

    return false;
  }, [completedTasks, vocabDayCompleted, knownWordsMap]);

  // Auto-sync completed status when current day's study4 vocab is completed
  useEffect(() => {
    if (!currentVocabSession) return;
    const autoDone = isVocabTrackDone(currentVocabSession, currentDateKey);
    if (autoDone && completedTasks[`${currentDateKey}_study4_vocab`] === undefined) {
      setCompletedTasks((prev) => ({
        ...prev,
        [`${currentDateKey}_study4_vocab`]: true,
      }));
    }
  }, [currentVocabSession, currentDateKey, isVocabTrackDone, completedTasks, setCompletedTasks]);

  // Auto-sync completed status when current day's alternating vocab (Task 5) is completed
  useEffect(() => {
    if (!currentDayPlan) return;
    const autoDone = isVocabAlternatingTaskDone(currentDayPlan, currentDateKey);
    if (autoDone && completedTasks[`${currentDateKey}_vocab`] === undefined) {
      setCompletedTasks((prev) => ({
        ...prev,
        [`${currentDateKey}_vocab`]: true,
      }));
    }
  }, [currentDayPlan, currentDateKey, isVocabAlternatingTaskDone, completedTasks, setCompletedTasks]);

  // Auto-sync completed status when shadowing speaking goal is reached (>= 15 mins speaking or >= 10 sentences)
  useEffect(() => {
    if (!currentDayPlan) return;
    const targetVideo =
      VIDEO_LESSONS_DATABASE[((currentDayPlan.day || 1) - 1) % VIDEO_LESSONS_DATABASE.length] ||
      VIDEO_LESSONS_DATABASE[0];
    const todaySpeakingSec = speakingSecondsMap[currentDateKey] || 0;
    const doneSentences = targetVideo ? Object.keys(shadowedSentencesMap[targetVideo.id] || {}).filter(k => shadowedSentencesMap[targetVideo.id][k]).length : 0;
    const isSpeakingGoalMet = todaySpeakingSec >= 900 || doneSentences >= 10 || (targetVideo?.subtitles?.length > 0 && doneSentences >= targetVideo.subtitles.length);
    if (isSpeakingGoalMet && !completedTasks[`${currentDateKey}_shadowing`]) {
      setCompletedTasks((prev) => ({
        ...prev,
        [`${currentDateKey}_shadowing`]: true,
      }));
    }
  }, [currentDayPlan, currentDateKey, speakingSecondsMap, shadowedSentencesMap, completedTasks, setCompletedTasks]);

  // Auto-heal Day 1 and cross-sync roadmapTasks <-> completedTasks
  useEffect(() => {
    // If Day 1 was completed/studied in any session, restore all Day 1 tasks so user never loses checkmarks
    const isDay1Studied = Boolean(
      completedTasks['01/09/2026_reading'] ||
      completedTasks['01/09/2026_writing'] ||
      completedTasks['01/09/2026_shadowing'] ||
      completedTasks['day_1_reading'] ||
      roadmapTasks['day_1_reading'] ||
      roadmapTasks['day_1_dd'] ||
      roadmapTasks['day_1_grammar']
    );

    if (isDay1Studied) {
      const needsDay1Patch =
        !completedTasks['01/09/2026_study4_vocab'] ||
        !completedTasks['01/09/2026_dd'] ||
        !completedTasks['01/09/2026_grammar'] ||
        !completedTasks['01/09/2026_vocab'];

      if (needsDay1Patch) {
        setCompletedTasks((prev) => ({
          ...prev,
          '01/09/2026_study4_vocab': true,
          '01/09/2026_dd': true,
          '01/09/2026_grammar': true,
          '01/09/2026_vocab': true,
          '01/09/2026_reading': true,
          '01/09/2026_writing': true,
          '01/09/2026_shadowing': true,
          '1/9/2026_study4_vocab': true,
          '1/9/2026_dd': true,
          '1/9/2026_grammar': true,
          '1/9/2026_vocab': true,
          'day_1_study4': true,
          'day_1_dd': true,
          'day_1_grammar': true,
          'day_1_vocab': true,
        }));

        setDictationStars((prev) => ({
          ...prev,
          'short-stories-8': true,
          'conversations-6': true,
          'toeic-listening-1': true,
        }));

        setGrammarRemembered((prev) => ({
          ...prev,
          '1': true,
        }));

        setVocabDayCompleted((prev) => ({
          ...prev,
          'study4_listening_day_1': true,
          'study4_day_1': true,
          'day_1_vocab': true,
        }));
      }
    }
  }, [completedTasks, roadmapTasks, setCompletedTasks, setDictationStars, setGrammarRemembered, setVocabDayCompleted]);

  // 8 Comprehensive Daily Missions (Unified & Cohesive Design System)
  const dailyTasks = useMemo(() => {
    if (!currentDayPlan) return [];
    const isGrammarTaskDone = Boolean(
      isTaskKeyCompleted(currentDateKey, 'grammar', currentDayPlan) ||
      isGrammarLessonCompleted(currentDayPlan.grammar?.lessonId)
    );
    const rTestId = getReadingTestIdForDay(currentDayPlan.day);
    const isReadingTaskDone = Boolean(
      isTaskKeyCompleted(currentDateKey, 'reading', currentDayPlan) ||
      (rTestId && (completedReading[rTestId] || readingQuizSubmitted[rTestId]))
    );
    const isStudy4VocabDone = Boolean(
      isTaskKeyCompleted(currentDateKey, 'study4_vocab', currentDayPlan) ||
      isVocabTrackDone(currentVocabSession, currentDateKey)
    );
    const isVocabAlternatingDone = Boolean(
      isTaskKeyCompleted(currentDateKey, 'vocab', currentDayPlan) ||
      isVocabAlternatingTaskDone(currentDayPlan, currentDateKey)
    );

    const UNIFIED_TAG_STYLE = 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60';

    const certType = learningProfile?.certification || 'ielts';
    let task1;
    if (certType === 'toeic') {
      task1 = {
        id: 'study4_test',
        tag: '1. LUYỆN ĐỀ THỰC CHIẾN TOEIC STUDY4 (ETS)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: '60 phút',
        title: 'TOEIC Thực Chiến: ETS Study4 - Luyện Đề & Chữa Chi Tiết',
        desc: 'Luyện 10 đề thi thật ETS, phân tích bẫy câu hỏi Part 1-7 và bổ sung từ vựng công sở',
        nextLessonNote: 'Mục tiêu 650 - 850+ chuẩn bị cho môi trường làm việc doanh nghiệp',
        btnText: 'Mở Đề Thi TOEIC ➔',
        action: () => {
          onNavigateTab && onNavigateTab('study4-toeic');
        },
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-bullseye',
        completed: Boolean(
          completedTasks[`${currentDateKey}_study4_test`] ||
          completedTasks[`${currentDateKey}_study4`] ||
          roadmapTasks[`day_${currentDayPlan?.day}_study4`]
        ),
      };
    } else if (certType === 'none') {
      task1 = {
        id: 'foundation_focus',
        tag: '1. CỦNG CỐ NỀN TẢNG TIẾNG ANH (LẤY GỐC)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: '30 phút',
        title: 'Lấy Gốc & Phản Xạ: Từ Vựng Thông Dụng & Ngữ Pháp',
        desc: 'Tập trung rèn luyện vốn từ cốt lõi, phát âm chuẩn và tự tin giao tiếp hàng ngày',
        nextLessonNote: 'Học tiếng Anh tự nhiên, không áp lực luyện đề thi',
        btnText: 'Vào Học Ngay ➔',
        action: () => {
          onNavigateTab && onNavigateTab('my-plan');
        },
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-compass',
        completed: Boolean(
          completedTasks[`${currentDateKey}_foundation`] ||
          completedTasks[`${currentDateKey}_grammar`]
        ),
      };
    } else {
      task1 = {
        id: 'ielts_academic',
        tag: '1. LỘ TRÌNH IELTS ACADEMIC (MỤC TIÊU 7.0+)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: '60 phút',
        title: 'Lộ Trình IELTS Academic: Luyện Đề & Kỹ Năng Trọng Tâm',
        desc: 'Luyện bộ Cambridge IELTS 12 - 19, Writing Task 1 & 2, Speaking Cue Cards & 33 Chủ Đề Từ Vựng (4,050 từ)',
        nextLessonNote: 'Tập trung bứt phá band điểm 5.5 → 7.0+ phục vụ mục tiêu du học',
        btnText: 'Mở Lộ Trình IELTS ➔',
        action: () => {
          onNavigateTab && onNavigateTab('ielts-roadmap');
        },
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-graduation-cap',
        completed: Boolean(
          completedTasks[`${currentDateKey}_ielts`] ||
          roadmapTasks[`day_${currentDayPlan?.day}_ielts`]
        ),
      };
    }

    return [
      task1,

      // 2. DAILY DICTATION (NGHE CHÉP CHÍNH TẢ PHẢN XẠ - 3 BÀI)
      {
        id: 'dd',
        tag: '2. DAILY DICTATION (NGHE CHÉP CHÍNH TẢ)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: currentDayPlan.dailyDictation.duration || '30 phút',
        title: 'Nghe Chép Chính Tả: Luyện Phản Xạ Bắt Âm',
        desc: 'Luyện bắt âm & phản xạ ngữ điệu tự nhiên qua Truyện ngắn, Hội thoại & IELTS Listening',
        tracks: (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening'),
        ddStatus: {
          ...currentDdStatus,
          tracks: (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening'),
          doneCount: (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening' && t.isDone).length,
          isAllDone: (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening').every(t => t.isDone),
        },
        nextLessonNote: (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening').every(t => t.isDone)
          ? '🎉 Bạn đã nghe xong 3 bài DailyDictation! Task tự động hoàn thành.'
          : 'Luyện nghe & chép chính tả 3 bài để hoàn thiện phản xạ bắt âm',
        btnText: (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening').every(t => t.isDone) ? 'Xem lại bài nghe ↗' : 'Mở bài nghe ↗',
        action: () => onNavigateTab && onNavigateTab('dailydictation', { track: 'ielts-listening' }),
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-headphones',
        completed: Boolean(
          isTaskKeyCompleted(currentDateKey, 'dd', currentDayPlan) ||
          (currentDdStatus.tracks || []).filter(t => t.type !== 'toeic-listening').every(t => t.isDone)
        ),
      },

      // 3. NGỮ PHÁP (GRAMMAR)
      {
        id: 'grammar',
        tag: '3. NGỮ PHÁP (GRAMMAR)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: currentDayPlan.grammar?.duration || '20 phút',
        title: `Học Ngữ Pháp: ${currentDayPlan.grammar?.topic}`,
        desc: `${currentDayPlan.grammar?.note} • Hệ thống 115 bài & Trắc nghiệm chuẩn CEFR`,
        nextLessonNote: isGrammarTaskDone
          ? '🎉 Bạn đã ghi nhớ bài ngữ pháp này! Task tự động hoàn thành.'
          : 'Bấm "Đã nhớ bài" hoặc đạt >= 60% trắc nghiệm để tự động hoàn thành',
        btnText: isGrammarTaskDone ? 'Xem lại bài học ➔' : 'Học ngay ➔',
        action: () => onNavigateTab && onNavigateTab('grammar', { lessonId: currentDayPlan.grammar?.lessonId || '1', dateKey: currentDateKey }),
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-spell-check',
        completed: isGrammarTaskDone,
      },

      // 4. TỪ VỰNG XEN KẼ
      {
        id: 'vocab',
        tag: `4. TỪ VỰNG XEN KẼ (${currentDayPlan.vocabAlternating?.type || 'Xen kẽ'}) • ${currentDayPlan.vocabAlternating?.targetWordsCount === 'Toàn bộ' ? 'Ôn tập' : `${currentDayPlan.vocabAlternating?.targetWordsCount || 50} từ`}`,
        tagColor: UNIFIED_TAG_STYLE,
        duration: currentDayPlan.vocabAlternating?.duration || '45 phút',
        title: `Ghi Nhớ Từ Vựng: ${currentDayPlan.vocabAlternating?.category === 'study4' ? '33 Chủ Đề Từ Vựng IELTS' : currentDayPlan.vocabAlternating?.topic}`,
        desc: `${currentDayPlan.vocabAlternating?.note} • Nguồn: ${currentDayPlan.vocabAlternating?.category === 'study4' ? '33 Chủ Đề IELTS Academic' : (currentDayPlan.vocabAlternating?.source || 'Kho Từ Vựng')}`,
        nextLessonNote: isVocabAlternatingDone
          ? '🎉 Bạn đã hoàn thành thử thách từ vựng này! Task tự động hoàn thành.'
          : currentDayPlan.vocabAlternating?.category === 'notebook'
          ? 'Mục tiêu hôm nay: Ôn tập lại toàn bộ các từ vựng bạn đã lưu trong Sổ từ vựng cá nhân & nghe phát âm Audio'
          : `Mục tiêu thử thách hôm nay: ${currentDayPlan.vocabAlternating?.targetWordsCount || 50} từ • Học Flashcard Spaced Repetition & kiểm tra phản xạ Quiz`,
        btnText: currentDayPlan.vocabAlternating?.category === 'daily-dictation'
          ? 'Luyện từ vựng Dictation ➔'
          : currentDayPlan.vocabAlternating?.category === 'notebook'
          ? 'Ôn sổ từ vựng đã lưu ➔'
          : currentDayPlan.vocabAlternating?.category === 'study4'
          ? 'Học từ vựng IELTS ➔'
          : `Luyện 50 từ Part ${currentDayPlan.vocabAlternating?.partNum || 1} ➔`,
        action: () => {
          const v = currentDayPlan.vocabAlternating;
          const studyDay = currentDayPlan?.day || 1;
          if (v?.category === 'daily-dictation') {
            onNavigateTab && onNavigateTab('vocabulary', {
              section: 'daily-dictation',
              tabId: v.tabId || 'short-stories',
              day: studyDay,
              partFilter: `day-${studyDay}`,
              dateKey: currentDateKey,
            });
          } else if (v?.category === 'notebook') {
            onNavigateTab && onNavigateTab('vocabulary', {
              section: 'notebook',
              day: studyDay,
              dateKey: currentDateKey,
            });
          } else if (v?.category === 'study4') {
            onNavigateTab && onNavigateTab('vocabulary', {
              section: 'ielts-33-topics',
              dateKey: currentDateKey,
            });
          } else {
            onNavigateTab && onNavigateTab('vocabulary', {
              section: 'part',
              levelId: v?.levelId || 'so-cap',
              partNum: v?.partNum || 1,
              day: studyDay,
              dateKey: currentDateKey,
            });
          }
        },
        image: currentDayPlan.vocabAlternating?.category === 'notebook'
          ? 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
        icon: currentDayPlan.vocabAlternating?.category === 'notebook'
          ? 'fa-solid fa-book-bookmark'
          : 'fa-solid fa-seedling',
        completed: isVocabAlternatingDone,
      },

      // 5. LUYỆN ĐỌC (READING)
      {
        id: 'reading',
        tag: '5. LUYỆN ĐỌC (READING)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: currentDayPlan.reading?.duration || '15 phút',
        title: `Đọc Hiểu CEFR: ${currentDayPlan.reading?.topic}`,
        desc: `${currentDayPlan.reading?.note} • Tra từ vựng có sẵn phiên âm IPA & Audio`,
        nextLessonNote: isReadingTaskDone
          ? '🎉 Bạn đã hoàn thành bài đọc này! Task tự động hoàn thành.'
          : 'Làm câu hỏi đọc hiểu & kiểm tra đáp án để tự động hoàn thành',
        btnText: isReadingTaskDone ? 'Xem lại bài đọc ➔' : 'Luyện đọc CEFR ➔',
        action: () => {
          const day = currentDayPlan.day || 1;
          const a1Tests = READING_DATABASE.A1 || [];
          const a2Tests = READING_DATABASE.A2 || [];
          const b1Tests = READING_DATABASE.B1 || [];

          let level = 'A1';
          let testId = a1Tests[0]?.id || 'read-a1-guess-who';

          if (day <= 15) {
            level = 'A1';
            const idx = (day - 1) % a1Tests.length;
            testId = a1Tests[idx]?.id || a1Tests[0]?.id;
          } else if (day <= 35) {
            level = 'A2';
            const idx = (day - 16) % a2Tests.length;
            testId = a2Tests[idx]?.id || a2Tests[0]?.id;
          } else {
            level = 'B1';
            const idx = (day - 36) % b1Tests.length;
            testId = b1Tests[idx]?.id || b1Tests[0]?.id;
          }

          onNavigateTab &&
            onNavigateTab('reading', {
              level,
              testId,
              dateKey: currentDateKey,
            });
        },
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-newspaper',
        completed: isReadingTaskDone,
      },

      // 6. LUYỆN VIẾT (WRITING)
      {
        id: 'writing',
        tag: '6. LUYỆN VIẾT (WRITING)',
        tagColor: UNIFIED_TAG_STYLE,
        duration: currentDayPlan.writing?.duration || '15 phút',
        title: currentDayPlan.writing?.topic?.includes('Dịch câu phản xạ:')
          ? `Luyện Dịch Câu: ${currentDayPlan.writing.topic.replace(/Dịch câu phản xạ:\s*/g, '').trim()}`
          : `Luyện Dịch Câu: ${currentDayPlan.writing?.topic || 'Dịch câu phản xạ'}`,
        desc: `${currentDayPlan.writing?.note} • The IELTS Dictionary (Tập Dịch IELTS)`,
        nextLessonNote: 'Đạt >= 75% độ tương đồng bản xứ',
        btnText: 'Luyện dịch câu ➔',
        action: () => {
          if (currentDayPlan.writing?.lessonId) {
            onNavigateTab && onNavigateTab('writing', {
              category: currentDayPlan.writing?.category || 'step1',
              lessonId: currentDayPlan.writing.lessonId,
              dateKey: currentDateKey
            });
            return;
          }
          const topic = (currentDayPlan.writing?.topic || '').toLowerCase();
          if (currentDayPlan.day === 2 || topic.includes('am, is, are') || topic.includes('to be ở hiện tại')) {
            onNavigateTab && onNavigateTab('writing', { category: 'step1', lessonId: 'buoc1-simple-present', dateKey: currentDateKey });
          } else if (currentDayPlan.day === 3 || topic.includes('was, were') || topic.includes('to be ở quá khứ')) {
            onNavigateTab && onNavigateTab('writing', { category: 'step1', lessonId: 'buoc1-was-were', dateKey: currentDateKey });
          } else if (currentDayPlan.day === 4 || topic.includes('there is') || topic.includes('there are')) {
            onNavigateTab && onNavigateTab('writing', { category: 'step1', lessonId: 'buoc1-there-is-there-are', dateKey: currentDateKey });
          } else if (currentDayPlan.day === 1 || topic.includes('articles') || topic.includes('mạo từ')) {
            onNavigateTab && onNavigateTab('writing', { category: 'step1', lessonId: 'buoc1-articles', dateKey: currentDateKey });
          } else if (topic.includes('hiện tại đơn') || topic.includes('present simple')) {
            onNavigateTab && onNavigateTab('writing', { category: 'tenses', lessonId: 'write-pres-simple', dateKey: currentDateKey });
          } else if (topic.includes('hiện tại tiếp diễn') || topic.includes('present continuous')) {
            onNavigateTab && onNavigateTab('writing', { category: 'tenses', lessonId: 'write-pres-cont', dateKey: currentDateKey });
          } else if (topic.includes('hiện tại hoàn thành') || topic.includes('present perfect')) {
            onNavigateTab && onNavigateTab('writing', { category: 'tenses', lessonId: 'write-pres-perf', dateKey: currentDateKey });
          } else if (topic.includes('quá khứ') || topic.includes('past')) {
            onNavigateTab && onNavigateTab('writing', { category: 'tenses', lessonId: 'write-past-simple', dateKey: currentDateKey });
          } else if (topic.includes('tương lai') || topic.includes('future')) {
            onNavigateTab && onNavigateTab('writing', { category: 'tenses', lessonId: 'write-future', dateKey: currentDateKey });
          } else if (topic.includes('điều kiện') || topic.includes('conditional')) {
            onNavigateTab && onNavigateTab('writing', { category: 'conditionals', lessonId: 'write-cond-1', dateKey: currentDateKey });
          } else {
            onNavigateTab && onNavigateTab('writing', { category: 'vocabulary', lessonId: 'write-vocab-common', dateKey: currentDateKey });
          }
        },
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop&q=80',
        icon: 'fa-solid fa-pen-fancy',
        completed: Boolean(
          isTaskKeyCompleted(currentDateKey, 'writing', currentDayPlan) ||
          (currentDayPlan?.writing?.lessonId && completedWriting[currentDayPlan.writing.lessonId])
        ),
      },

      // 7. SHADOWING (SPEAKING)
      (() => {
        const targetVideo =
          VIDEO_LESSONS_DATABASE[((currentDayPlan.day || 1) - 1) % VIDEO_LESSONS_DATABASE.length] ||
          VIDEO_LESSONS_DATABASE[0];
        const todaySpeakingSec = speakingSecondsMap[currentDateKey] || 0;
        const todaySpeakingMin = Math.floor(todaySpeakingSec / 60);
        const doneSentences = targetVideo ? Object.keys(shadowedSentencesMap[targetVideo.id] || {}).filter(k => shadowedSentencesMap[targetVideo.id][k]).length : 0;
        const isSpeakingGoalMet = todaySpeakingSec >= 900 || doneSentences >= 10 || (targetVideo?.subtitles?.length > 0 && doneSentences >= targetVideo.subtitles.length);
        const isSpeakingTaskDone = Boolean(isTaskKeyCompleted(currentDateKey, 'shadowing', currentDayPlan) || isSpeakingGoalMet);

        return {
          id: 'shadowing',
          tag: '7. LUYỆN NÓI (SHADOWING AI)',
          tagColor: UNIFIED_TAG_STYLE,
          duration: `${targetVideo.duration || '19:04'} (Video) • Mục tiêu nói: 15p`,
          title: `Luyện Nói & Nhại Giọng: ${targetVideo.title}`,
          desc: `${targetVideo.channelName} • Level ${targetVideo.level} • Video ${targetVideo.duration} • Nhại giọng từng câu & chấm điểm AI`,
          nextLessonNote: (todaySpeakingMin > 0 || doneSentences > 0)
            ? `🎙️ Đã luyện nói: ${todaySpeakingMin}/15 phút (${doneSentences} câu)${isSpeakingTaskDone ? ' • Đạt mục tiêu hôm nay! ⭐' : ''}`
            : `Bài thực hành: ${targetVideo.title} • Thời lượng video ${targetVideo.duration} • Mục tiêu: Luyện nói 15 phút hoặc hoàn thành các câu trọng tâm`,
          btnText: isSpeakingTaskDone ? 'Xem lại bài nói ➔' : 'Luyện Shadowing AI ➔',
          action: () => {
            onNavigateTab &&
              onNavigateTab('video-hub', {
                videoId: targetVideo.id,
                dateKey: currentDateKey,
              });
          },
          image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=80',
          icon: 'fa-solid fa-microphone-lines',
          completed: isSpeakingTaskDone,
        };
      })(),
    ].filter(Boolean);
  }, [currentDayPlan, currentDateKey, completedTasks, roadmapTasks, isTaskKeyCompleted, onNavigateTab, currentTestSession, currentVocabSession, currentDdStatus, isGrammarLessonCompleted, completedReading, readingQuizSubmitted, getReadingTestIdForDay, isVocabTrackDone, isVocabAlternatingTaskDone, speakingSecondsMap, shadowedSentencesMap, completedWriting, activeTestNum, study4StatusMap]);

  return (
    <div className="flex flex-col gap-6 font-sans max-w-7xl mx-auto pb-12">
      {/* ─── TOP BAR CONTROLS (Clean, Elegant & Spacious) ─────────────── */}
      <div
        className={`p-4 md:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
          isLight ? 'bg-white border-slate-200/90 text-slate-900 shadow-xs' : 'bg-slate-900 border-slate-800 text-white shadow-md'
        }`}
      >
        {/* Left: Navigation Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-950/50 text-blue-400 border border-blue-800/60'
              }`}
            >
              <i className="fa-solid fa-calendar-days" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base md:text-lg font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                  {viewMode === 'day' && `Kế Hoạch Ngày ${currentDateKey}`}
                  {viewMode === 'week' && `Tuần Ngày ${weekGrid[0].dateKey} - ${weekGrid[6].dateKey}`}
                  {viewMode === 'month' && `Tháng ${month + 1}, ${year}`}
                </h2>
                {viewMode === 'day' && isSelectedToday(currentDate) && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-500 text-white uppercase tracking-wider animate-pulse shadow-xs">
                    Hôm nay
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Kế hoạch học tập & Lộ trình thực chiến hàng ngày
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 ml-0 md:ml-3">
            <button
              onClick={goToday}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                !isSelectedToday(currentDate)
                  ? isLight
                    ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 shadow-xs'
                    : 'bg-blue-950/60 hover:bg-blue-900 border-blue-800 text-blue-300'
                  : isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                  : 'bg-slate-800/60 border-slate-800 text-slate-500 cursor-default'
              }`}
              title="Nhảy về ngày hôm nay"
            >
              <i className="fa-solid fa-calendar-day text-[11px]" />
              <span>Về hôm nay</span>
            </button>
            <button
              onClick={prevPeriod}
              className={`w-8 h-8 rounded-xl flex items-center justify-center border transition ${
                isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-50' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
              title="Kỳ trước"
            >
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>
            <button
              onClick={nextPeriod}
              className={`w-8 h-8 rounded-xl flex items-center justify-center border transition ${
                isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-50' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
              title="Kỳ sau"
            >
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          </div>
        </div>

        {/* Right: Quick IELTS Roadmap Button + Side Roadmap Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigateTab && onNavigateTab('ielts-roadmap')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 shadow-xs cursor-pointer"
            title="Mở Lộ Trình IELTS Academic 7.0+ Du Học"
          >
            <i className="fa-solid fa-graduation-cap text-xs text-blue-600 dark:text-blue-400" />
            <span>Lộ Trình IELTS 7.0+ (24 Tuần)</span>
          </button>

          {/* Side Roadmap Toggle Button */}
          <button
            onClick={() => setShowSideRoadmap(!showSideRoadmap)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
              showSideRoadmap
                ? isLight
                  ? 'bg-blue-50/80 text-blue-700 border-blue-200/80'
                  : 'bg-blue-950/40 text-blue-300 border-blue-800/60'
                : isLight
                ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
            }`}
            title={showSideRoadmap ? 'Thu gọn cột lộ trình bên cạnh' : 'Mở cột lộ trình tổng quan bên cạnh'}
          >
            <i className="fa-solid fa-table-columns text-xs text-blue-500" />
            <span>{showSideRoadmap ? 'Lộ Trình: BẬT' : 'Lộ Trình: TẮT'}</span>
          </button>

          <div
            className={`p-1 rounded-xl border flex items-center gap-1 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'day'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fa-solid fa-calendar-day text-[10px]" />
              <span>Ngày</span>
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'week'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fa-solid fa-calendar-week text-[10px]" />
              <span>Tuần</span>
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'month'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fa-regular fa-calendar text-[10px]" />
              <span>Tháng</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── VIEW MODE CONTENT & OPTIONAL SIDE ROADMAP ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cột chính: Lịch học (Ngày / Tuần / Tháng) */}
        <div className={`${showSideRoadmap ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
          {/* ─── NHẮC NHỞ HỌC BÙ BÀI HỌC CÁC NGÀY TRƯỚC ─── */}
          <OverdueStudyReminderBanner
            overdueData={overdueData}
            onNavigate={onNavigateTab}
            onSelectDate={(date) => {
              setCurrentDate(date);
              setViewMode('day');
            }}
            onToggleTaskDone={toggleTaskDone}
            theme={theme}
          />

          {/* ─── 1. CHẾ ĐỘ NGÀY (MẶC ĐỊNH) ──── */}
      {viewMode === 'day' && (
        <div className="space-y-6">
          {dailyTasks.length > 0 ? (
            <>
              {/* ─── HERO BANNER: TIẾN ĐỘ & MỤC TIÊU NGÀY ─── */}
              {(() => {
                const completedCount = dailyTasks.filter((t) => t.completed).length;
                const totalCount = dailyTasks.length;
                const percentDone = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                return (
                  <div
                    className={`p-6 rounded-3xl border relative overflow-hidden transition-all shadow-sm ${
                      isLight
                        ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white border-slate-800'
                        : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white border-slate-800'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5">
                            <i className="fa-solid fa-sparkles text-amber-300 animate-pulse" />
                            <span>Mục tiêu hàng ngày</span>
                          </span>
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold flex items-center gap-1.5">
                            <i className="fa-solid fa-fire text-amber-400" />
                            <span>{totalCount} nhiệm vụ thực chiến</span>
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                          <span>Kế hoạch rèn luyện {currentDateKey}</span>
                          {percentDone === 100 && (
                            <i className="fa-solid fa-circle-check text-emerald-400 text-xl animate-bounce" />
                          )}
                        </h2>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          Lộ trình trọng tâm IELTS Academic kết hợp Nghe chép chính tả phản xạ, Ngữ pháp chuyên sâu (115 chuyên đề), Luyện đọc CEFR, Dịch câu phản xạ và Nhại giọng Shadowing AI.
                        </p>
                      </div>

                      {/* Progress Radial / Bar Card */}
                      <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 min-w-[220px] space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-bold flex items-center gap-1.5">
                            <i className="fa-solid fa-chart-pie text-blue-400" />
                            Tiến độ hôm nay
                          </span>
                          <span className="font-mono font-black text-white text-sm">
                            {completedCount}/{totalCount} ({percentDone}%)
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-700"
                            style={{ width: `${percentDone}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-300 flex items-center justify-between font-medium">
                          <span>{percentDone === 100 ? '🎉 Xuất sắc! Hoàn thành 100%' : 'Tiếp tục rèn luyện nhé!'}</span>
                          <span className="text-amber-300 font-bold flex items-center gap-1">
                            <i className="fa-solid fa-bolt" /> +{completedCount * 25} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ─── DANH SÁCH CÁC NHIỆM VỤ THỰC CHIẾN ─── */}
              <div className="space-y-3">
                {dailyTasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden ${
                      task.completed
                        ? isLight
                          ? 'bg-slate-50/70 border-slate-200/70 shadow-2xs'
                          : 'bg-slate-900/40 border-slate-800/60 shadow-2xs'
                        : isLight
                        ? 'bg-white hover:bg-slate-50/50 border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300'
                        : 'bg-slate-900 hover:bg-slate-850/70 border-slate-800 shadow-2xs hover:shadow-md hover:border-blue-700/60'
                    }`}
                  >
                    {/* Left: Circle Checkbox, Image & Clean Content */}
                    <div className="relative z-10 flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Circle Checkbox Button */}
                      <button
                        type="button"
                        onClick={() => toggleTaskDone(currentDateKey, task.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm ring-4 ring-emerald-500/15 scale-100'
                            : isLight
                            ? 'border-slate-300 hover:border-blue-500 bg-white hover:scale-105'
                            : 'border-slate-600 hover:border-blue-500 bg-slate-800 hover:scale-105'
                        }`}
                        title={task.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
                      >
                        {task.completed && <i className="fa-solid fa-check text-xs font-black" />}
                      </button>

                      {/* Visual Image Thumbnail */}
                      {task.image && (
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 shadow-xs border border-slate-200/80 dark:border-slate-700/80">
                          <img
                            src={task.image}
                            alt={task.title}
                            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                              task.completed ? 'grayscale contrast-75 opacity-60' : ''
                            }`}
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Task Text Content (Clean, No Long Descriptions) */}
                      <div className="space-y-1 min-w-0 flex-1">
                        {/* Meta Tags: Category + Duration + Done Status */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] sm:text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-lg tracking-wide flex items-center gap-1.5 ${task.tagColor}`}
                          >
                            <i className={task.icon} />
                            {`${idx + 1}. ${task.tag.replace(/^\d+\.\s*/, '')}`}
                          </span>
                          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <i className="fa-regular fa-clock text-[11px]" />
                            {task.duration}
                          </span>
                          {task.completed && (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                              <i className="fa-solid fa-circle-check text-[10px]" />
                              Đã hoàn thành
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-sm sm:text-base font-bold tracking-tight leading-snug transition-colors ${
                            task.completed
                              ? 'text-slate-400 dark:text-slate-500 line-through'
                              : isLight
                              ? 'text-slate-900 group-hover:text-blue-600'
                              : 'text-white group-hover:text-blue-400'
                          }`}
                        >
                          {task.title}
                        </h3>

                        {/* Sub-Tracks for DailyDictation (Compact & Interactive) */}
                        {task.id === 'dd' && task.tracks && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1.5">
                            {task.tracks.map((tr) => (
                              <div
                                key={tr.id}
                                onClick={(e) => toggleTrackStar(tr.id, e)}
                                className={`px-2.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 select-none ${
                                  tr.isDone
                                    ? isLight
                                      ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-2xs'
                                      : 'bg-sky-950/40 border-sky-800/60 text-sky-300'
                                    : isLight
                                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-300'
                                }`}
                                title={tr.isDone ? 'Đã hoàn thành (Bấm để hủy)' : 'Chưa xong (Bấm để đánh dấu)'}
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <i
                                    className={`text-[11px] shrink-0 ${
                                      tr.isDone
                                        ? 'fa-solid fa-star text-amber-500'
                                        : 'fa-regular fa-star text-slate-400 hover:text-amber-500'
                                    }`}
                                  />
                                  <div className="min-w-0">
                                    <span className="font-bold text-xs block truncate leading-tight">
                                      {tr.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block truncate font-mono">
                                      {tr.lesson}
                                    </span>
                                  </div>
                                </div>
                                {tr.isDone && (
                                  <i className="fa-solid fa-check text-[11px] text-emerald-500 shrink-0 font-bold" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Primary Action Button & Optional Secondary Link */}
                    <div className="relative z-10 shrink-0 md:self-center flex flex-col sm:items-end gap-1.5 sm:pl-4">
                      <button
                        type="button"
                        onClick={task.action}
                        className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-98 whitespace-nowrap ${
                          task.completed
                            ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-400'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                        }`}
                      >
                        <i className={task.icon} />
                        <span>{task.btnText}</span>
                      </button>
                      {task.secondaryAction && (
                        <button
                          type="button"
                          onClick={task.secondaryAction}
                          className={`text-[11px] font-semibold transition flex items-center gap-1 hover:underline cursor-pointer ${
                            isLight ? 'text-slate-500 hover:text-blue-600' : 'text-slate-400 hover:text-blue-400'
                          }`}
                        >
                          <span>{task.secondaryBtnText}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              className={`p-10 rounded-3xl border text-center space-y-4 shadow-sm ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-3xl">
                <i className="fa-regular fa-calendar-xmark" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Chưa có lịch học cho ngày này
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Lộ trình học thực chiến 5 trụ cột được lên lịch bắt đầu từ ngày <strong>01/09/2026</strong>. Các ngày trước đó (như <strong>{currentDateKey}</strong>) không có nhiệm vụ học tập.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={goToday}
                  className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <i className="fa-solid fa-calendar-day" />
                  <span>Về ngày hôm nay (03/09/2026)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(2026, 8, 1))}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs transition border flex items-center gap-2 cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <i className="fa-solid fa-flag-checkered" />
                  <span>Đến Ngày 1 (01/09/2026)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* ─── 2. CHẾ ĐỘ TUẦN (WEEK VIEW TABLE - EXACT MATCH REFERENCE) ─ */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {viewMode === 'week' && (
        <div
          className={`p-5 md:p-6 rounded-3xl border shadow-sm space-y-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Ngày / Tuần</th>
                  <th className="pb-3 px-3">Kỹ năng</th>
                  <th className="pb-3 px-3">Hoạt động & Bài tập</th>
                  <th className="pb-3 px-3 text-center">Thời gian</th>
                  <th className="pb-3 px-3 text-center">Trạng thái</th>
                  <th className="pb-3 px-2 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {weekGrid.map((wDay, idx) => {
                  const isTodayCell = isSelectedToday(wDay.dateObj);
                  const plan = getDayPlan(wDay.dateObj, true);
                  if (!plan) return null;

                  const grammarDone = Boolean(isTaskKeyCompleted(wDay.dateKey, 'grammar', plan) || isGrammarLessonCompleted(plan?.grammar?.lessonId));
                  const ddStatus = getDayDictationStatus(plan?.dailyDictation, dictationStars);
                  const ddDone = Boolean(isTaskKeyCompleted(wDay.dateKey, 'dd', plan) || ddStatus.isAllDone);
                  const isDone = ddDone && grammarDone;
                  const isInProg = !isDone && (ddDone || grammarDone);
                  const statusLabel = isDone ? 'Hoàn thành' : isInProg ? 'Đang làm' : 'Chưa làm';

                  return (
                    <tr
                      key={idx}
                      className={`transition ${
                        isTodayCell
                          ? isLight
                            ? 'bg-blue-50/70'
                            : 'bg-blue-950/30'
                          : isLight
                          ? 'hover:bg-slate-50'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Ngày / Tuần */}
                      <td className="py-4 px-3 font-mono">
                        <span className="font-extrabold text-sm block text-slate-900 dark:text-white">
                          {wDay.dateKey}
                        </span>
                        <span className="text-[11px] text-slate-400 font-sans">
                          {wDay.dowLabel} • Ngày {wDay.dayNum}
                        </span>
                      </td>

                      {/* Kỹ năng */}
                      <td className="py-4 px-3">
                        <span className="px-3 py-1 rounded-xl text-[11px] font-extrabold font-mono inline-block bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          {learningProfile?.certification === 'toeic' ? 'TOEIC & 5 Kỹ Năng' : learningProfile?.certification === 'none' ? '5 Kỹ Năng Nền Tảng' : 'IELTS & 5 Kỹ Năng'}
                        </span>
                      </td>

                      {/* Hoạt động & Bài tập */}
                      <td className="py-4 px-3 min-w-[280px]">
                        {/* Certificate / Foundation Track */}
                        {learningProfile?.certification === 'toeic' ? (
                          <div
                            onClick={() => onNavigateTab && onNavigateTab('study4-toeic')}
                            className="font-bold text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 cursor-pointer hover:underline mb-1.5"
                            title="Luyện Đề TOEIC Thực Chiến Study4"
                          >
                            <i className="fa-solid fa-bullseye text-rose-500 text-xs shrink-0" />
                            <span>[TOEIC 750+] Luyện Đề Thi Thật ETS Study4 & Từ Vựng (60p)</span>
                          </div>
                        ) : learningProfile?.certification === 'none' ? null : (
                          <div
                            onClick={() => onNavigateTab && onNavigateTab('ielts-roadmap')}
                            className="font-bold text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5 cursor-pointer hover:underline mb-1.5"
                            title="Lộ Trình IELTS Academic 7.0+"
                          >
                            <i className="fa-solid fa-graduation-cap text-blue-500 text-xs shrink-0" />
                            <span>[IELTS 7.0+] Cambridge & 33 Chủ Đề Từ Vựng (60p)</span>
                          </div>
                        )}
                        <div className="font-bold text-sm text-slate-900 dark:text-white leading-snug flex items-center gap-2">
                          <i className="fa-solid fa-headphones text-sky-500 text-xs shrink-0" />
                          <span>DailyDictation: {plan.dailyDictation?.shortStories || 'Nghe chép chính tả'}</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2.5 flex-wrap">
                          {plan.dailyDictation?.conversations && (
                            <span className="inline-flex items-center gap-1.5">
                              <i className="fa-solid fa-comments text-indigo-400 text-[11px]" />
                              <span>{plan.dailyDictation.conversations}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1.5 flex items-center gap-2 flex-wrap">
                          {plan.grammar?.topic && (
                            <span className="inline-flex items-center gap-1.5">
                              <i className="fa-solid fa-book-open text-amber-500 text-[11px]" />
                              <span>{plan.grammar.topic}</span>
                            </span>
                          )}
                          {plan.grammar?.topic && plan.vocabAlternating?.topic && (
                            <span className="text-slate-400">•</span>
                          )}
                          {plan.vocabAlternating?.topic && (
                            <span className="inline-flex items-center gap-1.5">
                              <i className="fa-solid fa-brain text-purple-400 text-[11px]" />
                              <span>{plan.vocabAlternating.topic}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-2 flex-wrap">
                          {plan.reading?.topic && (
                            <span className="inline-flex items-center gap-1.5">
                              <i className="fa-solid fa-book-reader text-emerald-400 text-[10px]" />
                              <span>{plan.reading.topic}</span>
                            </span>
                          )}
                          {plan.reading?.topic && plan.writing?.topic && (
                            <span className="text-slate-400">•</span>
                          )}
                          {plan.writing?.topic && (
                            <span className="inline-flex items-center gap-1.5">
                              <i className="fa-solid fa-pen-nib text-violet-400 text-[10px]" />
                              <span>{plan.writing.topic}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Thời gian */}
                      <td className="py-4 px-3 font-mono font-bold text-slate-500 text-center">
                        90p
                      </td>

                      {/* Trạng thái */}
                      <td className="py-4 px-3 text-center">
                        <button
                          onClick={() => toggleTaskDone(wDay.dateKey, 'dd')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shadow-xs ${
                            isDone
                              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                              : isInProg
                              ? 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                              : isLight
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {statusLabel}
                        </button>
                      </td>

                      {/* Chi tiết Ngày */}
                      <td className="py-4 px-2 text-right">
                        <button
                          onClick={() => {
                            setCurrentDate(wDay.dateObj);
                            setViewMode('day');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white text-[11px] font-bold transition"
                          title="Xem chi tiết ngày này"
                        >
                          Xem ngày ➔
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* ─── 3. CHẾ ĐỘ THÁNG (MONTH VIEW) ─────────────────────────── */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {viewMode === 'month' && (
        <div
          className={`rounded-3xl border overflow-hidden shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          {/* Day of week header */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 text-center py-2.5 text-xs font-black uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-950/30">
            {DOW_LABELS.map((dow, idx) => (
              <div key={idx} className={idx >= 5 ? 'text-amber-500 dark:text-amber-400' : ''}>
                {dow}
              </div>
            ))}
          </div>

          {/* 7 Columns Grid */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-200 dark:divide-slate-800">
            {monthGrid.map((cell, cIdx) => {
              const isTodayCell = isSelectedToday(cell.dateObj);
              const plan = getDayPlan(cell.dateObj, cell.isCurrentMonth);

              return (
                <div
                  key={cIdx}
                  onClick={() => {
                    if (plan) {
                      setCurrentDate(cell.dateObj);
                      setViewMode('day');
                    }
                  }}
                  className={`min-h-[120px] p-2 flex flex-col justify-between transition-all cursor-pointer group ${
                    !cell.isCurrentMonth
                      ? isLight ? 'bg-slate-50/50 text-slate-300' : 'bg-slate-950/40 text-slate-700'
                      : isTodayCell
                      ? isLight ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'bg-blue-950/20 hover:bg-blue-950/40'
                      : isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isTodayCell
                          ? 'bg-blue-600 text-white shadow-sm'
                          : cell.isCurrentMonth
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {cell.dayNum}
                    </span>

                    {plan && cell.isCurrentMonth && (
                      <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-500 transition">
                        D{plan.day}
                      </span>
                    )}
                  </div>

                  {plan && cell.isCurrentMonth ? (
                    <div className="space-y-1 overflow-hidden">
                      {/* Lộ trình Mục Tiêu (IELTS / TOEIC / Foundation) */}
                      {(() => {
                        const cert = learningProfile?.certification || 'ielts';
                        if (cert === 'toeic') {
                          const isDone = Boolean(isTaskKeyCompleted(cell.dateKey, 'study4_test', plan));
                          return (
                            <div
                              className={`px-1.5 py-0.5 rounded text-[9px] font-black truncate border flex items-center gap-1 ${
                                isDone
                                  ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 line-through'
                                  : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30'
                              }`}
                              title="Luyện Đề TOEIC ETS Study4"
                            >
                              <i className="fa-solid fa-bullseye text-[8px] shrink-0" />
                              <span className="truncate">TOEIC ETS</span>
                            </div>
                          );
                        }
                        if (cert === 'none') {
                          return null;
                        }
                        const isIeltsDone = Boolean(isTaskKeyCompleted(cell.dateKey, 'ielts_academic', plan));
                        return (
                          <div
                            className={`px-1.5 py-0.5 rounded text-[9px] font-black truncate border flex items-center gap-1 ${
                              isIeltsDone
                                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 line-through'
                                : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                            }`}
                            title="Lộ Trình IELTS 7.0+ (Mục tiêu học thuật)"
                          >
                            <i className="fa-solid fa-graduation-cap text-[8px] shrink-0" />
                            <span className="truncate">IELTS 7.0+ Focus</span>
                          </div>
                        );
                      })()}

                      <div
                        className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold truncate border flex items-center gap-1.5 ${
                          Boolean(completedTasks[`${cell.dateKey}_dd`] || getDayDictationStatus(plan.dailyDictation, dictationStars).isAllDone)
                            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 line-through'
                            : 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20'
                        }`}
                      >
                        <i className="fa-solid fa-headphones text-[9px] shrink-0" />
                        <span className="truncate">{plan.dailyDictation?.shortStories || 'DailyDictation'}</span>
                      </div>

                      <div
                        className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold truncate border flex items-center gap-1.5 ${
                          Boolean(completedTasks[`${cell.dateKey}_grammar`] || isGrammarLessonCompleted(plan.grammar?.lessonId))
                            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 line-through'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}
                      >
                        <i className="fa-solid fa-book-open text-[9px] shrink-0" />
                        <span className="truncate">{plan.grammar?.topic || 'Ngữ pháp'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>

        {/* Cột bên cạnh: Lộ Trình Tổng Quan (Side Roadmap Panel) */}
        {showSideRoadmap && (
          <div className="lg:col-span-4 space-y-4 transition-all duration-300">
            <ScheduleRoadmapSidePanel
              currentDate={currentDate}
              onSelectDate={(newDate) => {
                setCurrentDate(newDate);
                setViewMode('day');
              }}
              onOpenMasterRoadmap={() => onNavigateTab && onNavigateTab('master-roadmap')}
              onOpenStudy4Roadmap={() => onNavigateTab && onNavigateTab('study4-toeic')}
              completedTasks={completedTasks}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
}
