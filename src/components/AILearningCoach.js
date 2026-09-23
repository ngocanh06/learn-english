import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import { fullIndex } from '../data/lessons';
import { ROADMAP_45_DAYS } from '../data/multiSourceRoadmap';
import {
  DAILY_DICTATION_DATA,
  STUDY4_TOEIC_SCHEDULE,
  STUDY4_TEST_TRACK,
  STUDY4_VOCAB_TRACK,
  STUDY4_EXAMS_OVERVIEW,
  TEST_TRACK_START_DATE,
  getStudy4TestSession,
  DEFAULT_ACTIVE_TEST_NUM,
} from '../data/toeicScheduleStudy4';
import { DAILY_DICTATION_3_TRACKS } from '../data/dailyDictation3Tracks';
import { UNIFIED_MASTER_DAYS } from '../data/unifiedMasterRoadmap';
import { VIDEO_LESSONS_DATABASE } from '../data/videoLessonsData';
import WritingStudio from './WritingStudio';
import UnifiedMasterRoadmapHub from './UnifiedMasterRoadmapHub';
import GoogleCalendarScheduleHub from './GoogleCalendarScheduleHub';
import IELTSRoadmapHub from './IELTSRoadmapHub';
import { useAuth } from '../context/AuthContext';
import {
  DEFAULT_DICTATION_STARS,
  getDayDictationStatus,
  isLessonStarred,
} from '../utils/dictationProgress';

export default function AILearningCoach({
  initialTab,
  initialDateKey,
  initialDay,
  initialViewMode,
  onNavigate,
  theme = 'dark',
}) {
  const isLight = theme === 'light';
  const { currentUser, isAuthenticated, openLogin } = useAuth();

  // Persistent User Goal Configuration
  const [userGoal] = useUserStorage('ai_coach_goal_v1', {
    targetLevel: '650-800',
    dailyMinutes: 45,
    targetWeeks: 8,
    focusSkill: 'balanced',
    startDate: '01/09/2026',
  });

  // Real-time Dynamic Study Metrics (Computed from system clock)
  const now = new Date();
  const todayKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const [completedMissions, setCompletedMissions] = useUserStorage('ai_completed_missions_v3', {});
  const [studyStreak, setStudyStreak] = useUserStorage('ai_study_streak_v2', { count: 0, lastDate: '' });
  const [studyMinutesToday, setStudyMinutesToday] = useUserStorage(`ai_minutes_${todayKey}`, 0);

  // 45-Day Roadmap Completed State Map: { [dayNum]: boolean }
  const [completed45DaysMap, setCompleted45DaysMap] = useUserStorage('roadmap_45days_completed_v1', {
    1: true,
    2: true,
    3: true,
  });

  // Selected skill filter for 45-day roadmap
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('ALL');

  // Active DailyDictation Sub-Track: 'short-stories' | 'conversations' | 'toeic-listening'
  const [activeDictationSubTrack, setActiveDictationSubTrack] = useState('short-stories');
  const [dictationSectionFilter, setDictationSectionFilter] = useState('all'); // 'all' | 'active' | sectionId
  const [dictationSearchQuery, setDictationSearchQuery] = useState('');
  const [dictationStatusFilter, setDictationStatusFilter] = useState('all'); // 'all' | 'todo' | 'completed'

  // Active test number for Study4 test track (defaults to Test 2)
  const [activeTestNum, setActiveTestNum] = useUserStorage('study4_active_test_num_v1', DEFAULT_ACTIVE_TEST_NUM);

  // Study4 Schedule status map: { [dayIndex]: 'Chưa làm' | 'Đang làm' | 'Hoàn thành' }
  // Test 1 (sessions 1, 2, 3, 4) is completed baseline
  const [study4StatusMap, setStudy4StatusMap] = useUserStorage('study4_status_map_v1', {
    1: 'Hoàn thành',
    2: 'Hoàn thành',
    3: 'Hoàn thành',
    4: 'Hoàn thành',
  });

  // DailyDictation Local Star Overrides (Synced: Short stories <= 80, Conversations <= 67, TOEIC <= 37)
  const [dictationStars, setDictationStars] = useUserStorage('dailydictation_stars_v4', DEFAULT_DICTATION_STARS);

  // Master calendar completed tasks for auto-completing DailyDictation task
  const [calendarCompletedTasks, setCalendarCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});

  // Grammar & Vocab real-time persistence
  const [rememberedGrammar] = useUserStorage('grammar_remembered_v2', {});
  const [knownVocab] = useUserStorage('vocab_mastery_v2', {});

  // Active Hub Tab: 'calendar-view' | 'master-roadmap' | 'writing-studio' | 'cefr-hub' | 'today-plan' | 'dailydictation' | 'study4-toeic' | 'roadmap-45days'
  const [savedActiveTab, setSavedActiveTab] = useUserStorage('ai_coach_active_tab_v2', 'calendar-view');
  const [activeTab, setActiveTabState] = useState(() => initialTab || savedActiveTab || 'calendar-view');

  const setActiveTab = useCallback((tab) => {
    setActiveTabState(tab);
    setSavedActiveTab(tab);
  }, [setSavedActiveTab]);

  // Study4 Dual Track View: 'tests' (Làm & chữa đề) | 'exams-grid' (Bảng 10 Đề) | 'vocab' (Học từ vựng) | 'all' (Tất cả)
  const [study4SubView, setStudy4SubView] = useState('tests');

  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, activeTab, setActiveTab]);

  // Next Grammar Lesson
  const nextGrammar = useMemo(() => {
    return fullIndex.find((l) => !rememberedGrammar[l.id]) || fullIndex[0];
  }, [rememberedGrammar]);

  // Today's Study4 Target Session
  // Today's Study4 Target Sessions (Tách biệt Làm đề & Từ vựng)
  // Mặc định học viên đang ở Test 2, ngày 14/09 là Làm đề Listening Test 2
  const todayTestSession = useMemo(() => {
    return getStudy4TestSession(now, activeTestNum);
  }, [now, activeTestNum]);

  const todayVocabSession = useMemo(() => {
    const start = new Date(2026, 8, 1);
    const diffDays = Math.round((now - start) / (1000 * 60 * 60 * 24));
    const idx = diffDays >= 0 ? diffDays % STUDY4_VOCAB_TRACK.length : 0;
    return STUDY4_VOCAB_TRACK[idx] || STUDY4_VOCAB_TRACK[0];
  }, [now]);

  // Current Short Story dynamic target
  const currentShortStory = useMemo(() => {
    const ssCat = DAILY_DICTATION_3_TRACKS.categories.find((c) => c.id === 'short-stories');
    const ssLessons = ssCat?.sampleLessons || [];
    const firstUnfinished = ssLessons.find((l) => !isLessonStarred(l.id, dictationStars));
    return firstUnfinished || ssLessons[ssLessons.length - 1] || { num: 82, title: 'Hobbies', parts: 33 };
  }, [dictationStars]);

  // Today's 5 Micro-Missions (Crystal Clear Specifics: Làm đề & Từ vựng tách riêng)
  const todaySpecificMissions = useMemo(() => {
    const isDdDone = !!completedMissions[`${todayKey}_dd`] || !!calendarCompletedTasks[`${todayKey}_dd`];
    const isTestDone = !!completedMissions[`${todayKey}_study4_test`] || !!calendarCompletedTasks[`${todayKey}_study4_test`] || !!calendarCompletedTasks[`${todayKey}_study4`];
    const isVocabDone = !!completedMissions[`${todayKey}_study4_vocab`] || !!calendarCompletedTasks[`${todayKey}_study4_vocab`];
    const isGrammarDone = !!completedMissions[`${todayKey}_grammar`] || !!calendarCompletedTasks[`${todayKey}_grammar`];
    const isShadowDone = !!completedMissions[`${todayKey}_shadow`] || !!calendarCompletedTasks[`${todayKey}_shadowing`];

    return [
      todayTestSession
        ? {
            id: 'study4_test',
            tag: `1. STUDY4 LÀM & CHỮA ĐỀ (${todayTestSession.skill?.toUpperCase() || 'TOEIC'})`,
            title: `Luyện Đề: ${todayTestSession.activity}`,
            desc: `${todayTestSession.note} • Bấm giờ áp lực thi thật & triệt tiêu lỗi sai`,
            nextLessonNote: `Buổi ${todayTestSession.trackIndex || 1}/32 • Test ${todayTestSession.testNum}`,
            duration: `${todayTestSession.duration} phút`,
            icon: 'fa-bullseye',
            color: 'from-rose-500 to-red-600',
            route: 'study4-toeic',
            completed: isTestDone,
          }
        : null,
      {
        id: 'study4_vocab',
        tag: '2. STUDY4 TỪ VỰNG CHUYÊN SÂU',
        title: `Từ Vựng: ${todayVocabSession.activity}`,
        desc: `${todayVocabSession.note} • Học Flashcard Spaced Repetition & Quiz`,
        nextLessonNote: `Buổi ${todayVocabSession.trackIndex || 1}/20 • Test ${todayVocabSession.testNum}`,
        duration: `${todayVocabSession.duration} phút`,
        icon: 'fa-book-open',
        color: 'from-purple-600 to-indigo-600',
        route: 'vocabulary',
        completed: isVocabDone,
      },
      {
        id: 'dd',
        tag: 'DAILY DICTATION',
        title: `Nghe Chép Chính Tả: Bài ${currentShortStory.num}. ${currentShortStory.title} (${currentShortStory.parts || 30} parts)`,
        desc: 'Nghe bắt âm, chép chính tả & chắt lọc các từ vựng nghe chưa ra vào Sổ tay',
        nextLessonNote: `Bài kế tiếp: ${currentShortStory.num + 1}`,
        duration: '20 phút',
        icon: 'fa-headphones',
        color: 'from-blue-600 to-cyan-600',
        externalUrl: 'https://dailydictation.com/exercises/short-stories',
        route: 'video-hub',
        completed: isDdDone,
      },
      {
        id: 'grammar',
        tag: 'NGỮ PHÁP 16 CHUYÊN ĐỀ',
        title: `Ngữ Pháp: Bài ${nextGrammar.id} - ${nextGrammar.title.replace(/^\d+\.\s*/, '')}`,
        desc: `${nextGrammar.subtitle || nextGrammar.category} • Làm 5 câu trắc nghiệm củng cố`,
        nextLessonNote: 'Đạt >= 60% để đánh dấu Đã nhớ',
        duration: '15 phút',
        icon: 'fa-book-open',
        color: 'from-amber-500 to-orange-600',
        route: 'grammar',
        completed: isGrammarDone,
      },
      {
        id: 'shadow',
        tag: 'VIDEO SHADOWING AI',
        title: `Luyện Nói & Nhại Giọng: ${VIDEO_LESSONS_DATABASE[0]?.title || '6 Minute English'}`,
        desc: `${VIDEO_LESSONS_DATABASE[0]?.channelName || 'BBC Learning English'} • Level ${VIDEO_LESSONS_DATABASE[0]?.level || 'A2'} • Nhại giọng từng câu & chấm điểm AI`,
        nextLessonNote: `Chủ đề: ${VIDEO_LESSONS_DATABASE[0]?.title || 'Giao tiếp cơ bản'} (${VIDEO_LESSONS_DATABASE[0]?.level || 'A2'})`,
        duration: '10 phút',
        icon: 'fa-microphone-lines',
        color: 'from-emerald-500 to-teal-600',
        route: 'video-hub',
        completed: isShadowDone,
      },
    ].filter(Boolean);
  }, [completedMissions, todayKey, nextGrammar, todayTestSession, todayVocabSession]);

  // Overall Goal Readiness Calculation
  const readinessMetrics = useMemo(() => {
    const grammarCount = Object.values(rememberedGrammar).filter(Boolean).length;
    const vocabCount = Object.values(knownVocab).filter(Boolean).length;
    const ddStarsCount = Object.values(dictationStars).filter(Boolean).length;
    const study4DoneCount = Object.values(study4StatusMap).filter((s) => s === 'Hoàn thành').length;

    const overallReadiness = Math.min(100, Math.round(
      (grammarCount / 115) * 30 +
      (vocabCount / 300) * 30 +
      (ddStarsCount / 17) * 20 +
      (study4DoneCount / 21) * 20
    ));

    return {
      grammarCount,
      vocabCount,
      ddStarsCount,
      study4DoneCount,
      overallReadiness,
    };
  }, [rememberedGrammar, knownVocab, dictationStars, study4StatusMap]);

  // Toggle mission completion
  const toggleMission = (missionId) => {
    const key = `${todayKey}_${missionId}`;
    const nextState = !completedMissions[key];
    setCompletedMissions((prev) => ({ ...prev, [key]: nextState }));

    if (nextState) {
      setStudyMinutesToday((m) => Math.min(120, m + 15));
    }
  };

  // Toggle DailyDictation Star
  const toggleDictationStar = (lessonId) => {
    const curVal = isLessonStarred(lessonId, dictationStars);
    const nextVal = !curVal;
    const nextStars = {
      ...dictationStars,
      [lessonId]: nextVal,
    };
    setDictationStars(nextStars);

    // Auto sync Day 1 DailyDictation task if all 3 tracks are completed
    const day1Plan = UNIFIED_MASTER_DAYS[0];
    const ddStatus = getDayDictationStatus(day1Plan?.dailyDictation, nextStars);
    if (ddStatus.isAllDone && !calendarCompletedTasks[`${todayKey}_dd`]) {
      setCalendarCompletedTasks((prev) => ({
        ...prev,
        [`${todayKey}_dd`]: true,
      }));
    }
  };

  // Toggle Study4 status
  const cycleStudy4Status = (dayNum) => {
    setStudy4StatusMap((prev) => {
      const cur = prev[dayNum] || 'Chưa làm';
      const next = cur === 'Chưa làm' ? 'Đang làm' : cur === 'Đang làm' ? 'Hoàn thành' : 'Chưa làm';
      return { ...prev, [dayNum]: next };
    });
  };



  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ─── 1. TOP HERO DASHBOARD (Clean, Elegant & Cohesive Style like ReadingHub) ─── */}
      <div
        className={`p-6 md:p-8 rounded-3xl border transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
            : 'bg-slate-900 border-slate-800 text-white shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: User Title & Info */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  isLight
                    ? 'bg-blue-50 border-blue-200/80 text-blue-700'
                    : 'bg-blue-950/40 border-blue-800/60 text-blue-300'
                }`}
              >
                <i className="fa-solid fa-graduation-cap text-blue-500" />
                Lộ Trình Thành Thạo Toàn Diện 4 Kỹ Năng • A1 ➔ C1
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                01/09/2026
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('ielts-roadmap')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-xs hover:scale-105 transition-transform cursor-pointer ml-auto sm:ml-0"
                title="Chuyển sang Lộ Trình Luyện Thi IELTS Academic 7.0+ Du Học"
              >
                <i className="fa-solid fa-plane-departure text-[10px]" />
                <span>Mục Tiêu Du Học: IELTS 7.0+ ✈️</span>
              </button>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Kế Hoạch & Lộ Trình Học Tập
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
              Hệ thống theo dõi và điều phối 6 trụ cột: Nghe chép chính tả phản xạ, Ngữ pháp toàn diện (115 chuyên đề), Đọc hiểu chuẩn CEFR A1-C1, Dịch viết câu phản xạ, Luyện nói Shadowing AI và Luyện đề thực chiến.
            </p>

            {/* User Details Pill */}
            <div
              className={`flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-xl border w-fit flex-wrap ${
                isLight
                  ? 'bg-slate-50 border-slate-200/80 text-slate-700'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-1.5 font-bold">
                    <i className="fa-solid fa-circle-user text-emerald-500" />
                    <span className="text-slate-900 dark:text-white">
                      {currentUser?.name || currentUser?.username}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      @{currentUser?.username}
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong>{readinessMetrics.ddStarsCount}</strong> bài nghe đã xong
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    Mục tiêu: {currentUser?.targetScore ? `TOEIC ${currentUser.targetScore}+` : 'Thành thạo 4 kỹ năng & Ngữ pháp'}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                    <i className="fa-solid fa-user-clock text-amber-500" />
                    <span>Khách vãng lai (Chưa đăng nhập)</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong>{readinessMetrics.ddStarsCount}</strong> bài nghe đã xong
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <button
                    type="button"
                    onClick={openLogin}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Đăng nhập để đồng bộ tiến độ</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right: 3 Sleek Clean Stat Cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {/* Card 1: Streak */}
            <div
              className={`p-4 rounded-2xl border text-center transition ${
                isLight
                  ? 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                  : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-amber-500 uppercase tracking-wider mb-1">
                <i className="fa-solid fa-fire text-amber-500 text-xs" />
                <span>Chuỗi</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {studyStreak.count || 0}
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">ngày liên tục</span>
            </div>

            {/* Card 2: Time Today */}
            <div
              className={`p-4 rounded-2xl border text-center transition ${
                isLight
                  ? 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                  : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <i className="fa-solid fa-clock text-emerald-500 text-xs" />
                <span>Hôm Nay</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {studyMinutesToday || 0}
                <span className="text-xs font-sans text-slate-400 font-medium">/{userGoal.dailyMinutes}m</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">thời gian học</span>
            </div>

            {/* Card 3: Overall Readiness */}
            <div
              className={`p-4 rounded-2xl border text-center transition ${
                isLight
                  ? 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                  : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                <i className="fa-solid fa-bullseye text-blue-500 text-xs" />
                <span>Tiến Độ</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {readinessMetrics.overallReadiness}%
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">mục tiêu sẵn sàng</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: 4 Pillar Mini Chips + Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* 4 Micro Chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span
                className={`px-3 py-1 rounded-xl border font-medium flex items-center gap-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                }`}
              >
                <i className="fa-solid fa-graduation-cap text-amber-500" />
                <strong className="text-slate-900 dark:text-white font-mono">{readinessMetrics.grammarCount}/115</strong> Ngữ pháp
              </span>
              <span
                className={`px-3 py-1 rounded-xl border font-medium flex items-center gap-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                }`}
              >
                <i className="fa-solid fa-book-bookmark text-purple-500" />
                <strong className="text-slate-900 dark:text-white font-mono">{readinessMetrics.vocabCount}</strong> Từ vựng
              </span>
              <span
                className={`px-3 py-1 rounded-xl border font-medium flex items-center gap-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                }`}
              >
                <i className="fa-solid fa-headphones text-cyan-500" />
                <strong className="text-slate-900 dark:text-white font-mono">{readinessMetrics.ddStarsCount}</strong> Bài nghe đã xong
              </span>
              <span
                className={`px-3 py-1 rounded-xl border font-medium flex items-center gap-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                }`}
              >
                <i className="fa-solid fa-file-signature text-rose-500" />
                <strong className="text-slate-900 dark:text-white font-mono">{readinessMetrics.study4DoneCount}/10</strong> Đề Thi Đã Luyện
              </span>
            </div>

            <span className="text-xs font-mono font-bold text-slate-500">
              Tổng thể: <strong className="text-blue-600 dark:text-blue-400">{readinessMetrics.overallReadiness}%</strong>
            </span>
          </div>

          {/* Clean Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${Math.max(6, readinessMetrics.overallReadiness)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 5 TABS NAVIGATION (Clean Segmented Pills like ReadingHub) ─── */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'calendar-view', label: 'Lịch Học (Tháng / Tuần / Ngày)', icon: 'fa-calendar-days' },
          { id: 'ielts-roadmap', label: 'Lộ Trình IELTS 7.0+ Du Học ✈️', icon: 'fa-plane-departure', badge: '7.0+ Du Học' },
          { id: 'master-roadmap', label: 'Lộ Trình Toàn Diện 4 Kỹ Năng', icon: 'fa-layer-group' },
          { id: 'dailydictation', label: 'DailyDictation (3 Tracks)', icon: 'fa-headphones' },
          { id: 'study4-toeic', label: 'Luyện Đề Thực Chiến (Study4)', icon: 'fa-table-list' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap select-none ${
                active
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xs ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-gradient-to-r from-amber-500 to-rose-500 text-white leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── 2. MAIN WORKSPACE (FULL WIDTH FOR CALENDAR & ROADMAP) ─── */}
      <div className="w-full space-y-6">
          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB: LỊCH GOOGLE CALENDAR (THÁNG / TUẦN / NGÀY) ────────────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'calendar-view' && (
            <GoogleCalendarScheduleHub
              initialDateKey={initialDateKey}
              initialDay={initialDay}
              initialViewMode={initialViewMode}
              onNavigateTab={(t, params) => {
                if (['vocab', 'vocabulary', 'reading', 'writing', 'video-hub', 'grammar'].includes(t)) {
                  onNavigate && onNavigate(t, params);
                } else {
                  setActiveTab(t);
                }
              }}
              theme={theme}
            />
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB: LỘ TRÌNH IELTS ACADEMIC 7.0+ (MỤC TIÊU DU HỌC) ────────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'ielts-roadmap' && (
            <IELTSRoadmapHub onNavigate={onNavigate} theme={theme} />
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB: LỘ TRÌNH TỔNG HỢP 5 TRỤ CỘT (MASTER ROADMAP HUB) ───────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'master-roadmap' && (
            <UnifiedMasterRoadmapHub
              onNavigate={onNavigate}
              onOpenWriting={() => setActiveTab('writing-studio')}
              theme={theme}
            />
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB: LUYỆN DỊCH CÂU (THE IELTS DICTIONARY STYLE) ──────────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'writing-studio' && (
            <WritingStudio theme={theme} />
          )}


          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB: NHIỆM VỤ CỤ THỂ HÔM NAY (TODAY PLAN) ─────────────────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'today-plan' && (
            <div
              className={`p-6 rounded-3xl border shadow-sm ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <i className="fa-solid fa-bullseye text-blue-500" />
                    4 Nhiệm Vụ Cụ Thể Hôm Nay (01/09/2026)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Học xen kẽ chính xác từng bài của DailyDictation, Study4 và Ngữ pháp
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-extrabold font-mono">
                  {todaySpecificMissions.filter((m) => m.completed).length} / 4 Hoàn thành
                </span>
              </div>

              {/* Specific Mission List */}
              <div className="space-y-4">
                {todaySpecificMissions.map((mission) => (
                  <div
                    key={mission.id}
                    className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      mission.completed
                        ? isLight
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-emerald-950/20 border-emerald-800/40'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 hover:border-blue-400'
                        : 'bg-slate-800/60 border-slate-700/80 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleMission(mission.id)}
                        className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center shrink-0 mt-1 transition ${
                          mission.completed
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : isLight
                            ? 'border-slate-300 hover:border-emerald-500'
                            : 'border-slate-600 hover:border-emerald-500'
                        }`}
                      >
                        {mission.completed && <i className="fa-solid fa-check text-xs" />}
                      </button>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-500 font-mono">
                            {mission.tag}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono flex items-center gap-1">
                            <i className="fa-regular fa-clock text-[10px]" /> {mission.duration}
                          </span>
                        </div>

                        <h3
                          className={`text-sm md:text-base font-extrabold leading-snug ${
                            mission.completed
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : isLight
                              ? 'text-slate-900'
                              : 'text-white'
                          }`}
                        >
                          {mission.title}
                        </h3>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {mission.desc}
                        </p>

                        <div className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1 pt-0.5">
                          <i className="fa-solid fa-arrow-right text-[10px]" />
                          <span>{mission.nextLessonNote}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                      {mission.externalUrl ? (
                        <a
                          href={mission.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Mở bài nghe</span>
                          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                        </a>
                      ) : (
                        <button
                          onClick={() => onNavigate && onNavigate(mission.route)}
                          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm ${
                            mission.completed
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-102'
                          }`}
                        >
                          <span>{mission.completed ? 'Ôn lại' : 'Học ngay'}</span>
                          <i className="fa-solid fa-arrow-right text-[10px]" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB 2: LỘ TRÌNH 45 NGÀY CÓ LINK HỌC & BÀI TẬP TRỰC TIẾP ──── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'roadmap-45days' && (
            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-5 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-500 text-xs font-black uppercase">
                      Đồng bộ Google Sheet
                    </span>
                    <h2 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
                      Lộ Trình 45 Ngày Lấy Gốc Cấp Tốc (Có Link Bài Tập ↗)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Bao gồm link làm bài tập trực tiếp: Nghe, Nói, Đọc, Viết, Ngữ pháp từ Test-English, DailyDictation, The IELTS Dictionary
                  </p>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                    {Object.values(completed45DaysMap).filter(Boolean).length} / {ROADMAP_45_DAYS.length} Ngày ({Math.round((Object.values(completed45DaysMap).filter(Boolean).length / ROADMAP_45_DAYS.length) * 100)}%)
                  </span>
                  <div className="w-20 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          (Object.values(completed45DaysMap).filter(Boolean).length / ROADMAP_45_DAYS.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Skill Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
                {['ALL', 'Listening', 'Reading', 'Grammar', 'Writing', 'Speaking'].map((sk) => (
                  <button
                    key={sk}
                    onClick={() => setSelectedSkillFilter(sk)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      selectedSkillFilter === sk
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {sk === 'ALL' ? 'Tất cả 45 Ngày' : sk}
                  </button>
                ))}
              </div>

              {/* 45 Days List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {ROADMAP_45_DAYS.filter(
                  (d) => selectedSkillFilter === 'ALL' || d.skill.toLowerCase() === selectedSkillFilter.toLowerCase()
                ).map((item) => {
                  const isDone = !!completed45DaysMap[item.day];

                  return (
                    <div
                      key={item.day}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isDone
                          ? isLight
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-emerald-950/20 border-emerald-800/40'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                          : 'bg-slate-800/50 hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {/* Checkbox */}
                        <button
                          onClick={() =>
                            setCompleted45DaysMap((prev) => ({
                              ...prev,
                              [item.day]: !prev[item.day],
                            }))
                          }
                          className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
                            isDone
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : isLight
                              ? 'border-slate-300 hover:border-emerald-500'
                              : 'border-slate-600 hover:border-emerald-500'
                          }`}
                        >
                          {isDone && <i className="fa-solid fa-check text-xs" />}
                        </button>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-black text-blue-600 dark:text-blue-400">
                              Day {String(item.day).padStart(2, '0')}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                item.skill === 'Listening'
                                  ? 'bg-blue-500/15 text-blue-500'
                                  : item.skill === 'Reading'
                                  ? 'bg-purple-500/15 text-purple-500'
                                  : item.skill === 'Grammar'
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : item.skill === 'Writing'
                                  ? 'bg-rose-500/15 text-rose-500'
                                  : 'bg-emerald-500/15 text-emerald-500'
                              }`}
                            >
                              {item.skill}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <i className="fa-regular fa-clock text-[9px]" /> {item.duration} • Trình độ {item.level}
                            </span>
                          </div>

                          <h3
                            className={`text-sm font-extrabold leading-snug ${
                              isDone
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : isLight
                                ? 'text-slate-900'
                                : 'text-white'
                            }`}
                          >
                            {item.title}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Nguồn: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.source}</span>
                          </p>
                        </div>
                      </div>

                      {/* Direct Clickable Website Link Button */}
                      <div className="shrink-0 self-end sm:self-center">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-xs"
                          >
                            <span>Làm bài tập ngay</span>
                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                          </a>
                        ) : (
                          <button
                            onClick={() => onNavigate && onNavigate('video-hub')}
                            className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white font-extrabold text-xs transition flex items-center gap-1.5"
                          >
                            <span>Luyện nói Shadowing</span>
                            <i className="fa-solid fa-microphone text-[10px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB 3: THEO DÕI DAILY DICTATION (3 PHẦN: STORIES, CONVOS, TOEIC) */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'dailydictation' && (
            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-6 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Header with Account Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
                      Trung Tâm DailyDictation: 3 Phần Học Toàn Diện
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tài khoản:{' '}
                    <strong className="text-blue-500">
                      {isAuthenticated ? (currentUser?.name || currentUser?.username) : 'Khách vãng lai'}
                    </strong>{' '}
                    (290 bài hoàn thành • 54.1 giờ luyện nghe)
                  </p>
                </div>

                <a
                  href="https://dailydictation.com/exercises"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 font-extrabold text-xs transition flex items-center gap-1.5 self-start sm:self-center"
                >
                  <i className="fa-solid fa-external-link" />
                  <span>Vào DailyDictation.com</span>
                </a>
              </div>

              {/* 4 Main Category Cards (Matching User's DailyDictation Screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {DAILY_DICTATION_3_TRACKS.categories.map((cat) => {
                  const isSelected = activeDictationSubTrack === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => setActiveDictationSubTrack(cat.id)}
                      className={`p-3.5 md:p-4 rounded-2xl border cursor-pointer transition-all duration-200 select-none flex items-center gap-3.5 group ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-400/30 shadow-sm'
                            : 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 shadow-sm'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                          : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
                      }`}
                    >
                      {/* Left Thumbnail Cover Image */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800 shadow-xs">
                        <img
                          src={cat.coverImage}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay text badge */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-1">
                          <span className="text-[9px] font-black text-white tracking-tight uppercase">
                            {cat.coverBadge}
                          </span>
                        </div>
                      </div>

                      {/* Right Meta Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm md:text-base font-extrabold text-blue-600 dark:text-blue-400 group-hover:underline underline-offset-2 leading-snug truncate">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                          {cat.levelText || 'Levels: A1-C1'}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] text-slate-600 dark:text-slate-300 font-bold font-mono">
                            {cat.lessonCountText || '100 lessons'}
                          </span>
                          <span className="text-slate-400 text-xs tracking-widest font-black leading-none">
                            •••
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Track Details & Lessons */}
              {(() => {
                const currentCat = DAILY_DICTATION_3_TRACKS.categories.find(
                  (c) => c.id === activeDictationSubTrack
                ) || DAILY_DICTATION_3_TRACKS.categories[0];

                const lessons = currentCat.lessons || currentCat.sampleLessons || DAILY_DICTATION_DATA.lessons;
                // Dynamically find active target lesson: first unstarred and non-diamond lesson
                const firstUnstarred = lessons.find(
                  (l) => !isLessonStarred(l.id, dictationStars) && !l.isDiamond && l.status !== 'skipped'
                );
                const currentTargetLesson = firstUnstarred || lessons[lessons.length - 1];
                const currentIdx = lessons.findIndex((l) => l.id === currentTargetLesson?.id);
                const nextTargetLesson = lessons.slice(currentIdx + 1).find((l) => !l.isDiamond && l.status !== 'skipped');

                // Determine active section containing currentTargetLesson
                const activeSec = (currentCat.sections || []).find((s) => {
                  if (s.start !== undefined && s.end !== undefined) {
                    return currentTargetLesson.num >= s.start && currentTargetLesson.num <= s.end;
                  }
                  return false;
                }) || (currentCat.sections && currentCat.sections[0]) || null;

                // Active filtered section
                const selectedSec = dictationSectionFilter === 'all'
                  ? null
                  : dictationSectionFilter === 'active'
                  ? activeSec
                  : (currentCat.sections || []).find((s) => s.id === dictationSectionFilter) || activeSec;

                // Apply filtering to lessons
                let displayLessons = lessons;

                // Filter by section if not 'all'
                if (selectedSec && dictationSectionFilter !== 'all') {
                  displayLessons = displayLessons.filter((l) => {
                    if (selectedSec.start !== undefined && selectedSec.end !== undefined) {
                      return l.num >= selectedSec.start && l.num <= selectedSec.end;
                    }
                    return true;
                  });
                }

                // Filter by search query
                if (dictationSearchQuery.trim()) {
                  const q = dictationSearchQuery.trim().toLowerCase();
                  displayLessons = displayLessons.filter((l) => {
                    const numMatch = String(l.num) === q || String(l.num).startsWith(q);
                    const titleMatch = l.title?.toLowerCase().includes(q);
                    const idMatch = l.id?.toLowerCase().includes(q);
                    return numMatch || titleMatch || idMatch;
                  });
                }

                // Filter by status
                if (dictationStatusFilter === 'todo') {
                  displayLessons = displayLessons.filter((l) => !isLessonStarred(l.id, dictationStars));
                } else if (dictationStatusFilter === 'completed') {
                  displayLessons = displayLessons.filter((l) => isLessonStarred(l.id, dictationStars));
                }

                const totalStarredInCat = lessons.filter((l) => isLessonStarred(l.id, dictationStars)).length;

                return (
                  <div className="space-y-5 pt-2">
                    {/* Track Header Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <i className={`fa-solid ${currentCat.icon} text-blue-500`} />
                          {currentCat.title} • {currentCat.badge}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {currentCat.desc}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                          <span>
                            Tiến độ: <strong className="text-blue-600 dark:text-blue-400">{totalStarredInCat}</strong> / {lessons.length} bài ⭐
                          </span>
                          <span>•</span>
                          <span>
                            Còn lại: <strong className="text-amber-600 dark:text-amber-400">{lessons.length - totalStarredInCat}</strong> bài
                          </span>
                        </div>
                      </div>

                      <a
                        href={currentCat.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition flex items-center gap-1.5 self-start sm:self-center shrink-0 shadow-xs"
                      >
                        <span>Mở trang DailyDictation</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                      </a>
                    </div>

                    {/* Section Breakdown Badges (Interactive Filter) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                          Chọn Section học tập ({currentCat.sections?.length || 0} phần):
                        </span>
                        <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                          Bấm vào thẻ để xem bài trong Section đó
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1">
                        {currentCat.sections?.map((sec, sIdx) => {
                          const secLessons = lessons.filter((l) => l.num >= sec.start && l.num <= sec.end);
                          const secStarred = secLessons.filter((l) => isLessonStarred(l.id, dictationStars)).length;
                          const isSecActive = selectedSec?.id === sec.id && dictationSectionFilter !== 'all';
                          const isSecFullyDone = secStarred === secLessons.length && secLessons.length > 0;

                          return (
                            <button
                              key={sIdx}
                              onClick={() => {
                                if (isSecActive) {
                                  setDictationSectionFilter('all');
                                } else {
                                  setDictationSectionFilter(sec.id);
                                }
                              }}
                              className={`p-2.5 rounded-xl border text-left transition text-xs flex flex-col justify-between gap-1 cursor-pointer ${
                                isSecActive
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/40'
                                  : isSecFullyDone
                                  ? isLight
                                    ? 'bg-blue-50/70 border-blue-200 hover:bg-blue-100/80 text-slate-800'
                                    : 'bg-blue-950/20 border-blue-800/40 hover:bg-blue-900/30 text-slate-200'
                                  : isLight
                                  ? 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 w-full">
                                <span className={`font-black truncate ${isSecActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                  {sec.name}
                                </span>
                                {isSecFullyDone && (
                                  <i className={`fa-solid fa-circle-check text-[10px] shrink-0 ${isSecActive ? 'text-white' : 'text-blue-500'}`} />
                                )}
                              </div>
                              <span className={`text-[11px] font-mono block ${isSecActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                {secStarred}/{secLessons.length} ⭐ {isSecFullyDone ? 'Xong' : secStarred > 0 ? 'Đang học' : 'Chưa'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Target In-progress Lesson Highlight (Dynamic for any active track) */}
                    {currentTargetLesson && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-teal-600/10 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center gap-1.5">
                            <i className="fa-solid fa-bullseye text-xs" /> BÀI HỌC TRỌNG TÂM TIẾP THEO ({currentCat.title})
                          </span>
                          <h4 className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                            Bài {currentTargetLesson.num}: {currentTargetLesson.title} ({currentTargetLesson.parts || 30} parts • Vocab level: {currentTargetLesson.level || 'B1'})
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="w-28 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 transition-all duration-500"
                                style={{
                                  width: isLessonStarred(currentTargetLesson.id, dictationStars)
                                    ? '100%'
                                    : '50%',
                                }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-500">
                              {isLessonStarred(currentTargetLesson.id, dictationStars)
                                ? 'Đã hoàn thành ⭐'
                                : `Đang học ${nextTargetLesson ? `• Bài kế: ${nextTargetLesson.num}. ${nextTargetLesson.title}` : '• Sắp hoàn thành'}`}
                            </span>
                          </div>
                        </div>

                        <a
                          href={currentTargetLesson.url || currentCat.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shrink-0 transition shadow-xs flex items-center gap-1.5 self-start sm:self-center"
                        >
                          <span>Học tiếp bài {currentTargetLesson.num}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                        </a>
                      </div>
                    )}

                    {/* Lesson Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      {/* Left: Quick section/view tabs */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => setDictationSectionFilter('active')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            dictationSectionFilter === 'active'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          <i className="fa-solid fa-crosshairs mr-1 text-[10px]" />
                          Section đang học ({activeSec ? activeSec.name : 'Hiện tại'})
                        </button>

                        <button
                          onClick={() => setDictationSectionFilter('all')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            dictationSectionFilter === 'all'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          Tất cả ({lessons.length} bài)
                        </button>

                        <select
                          value={dictationStatusFilter}
                          onChange={(e) => setDictationStatusFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="all">Tất cả trạng thái</option>
                          <option value="todo">Chưa học ({lessons.length - totalStarredInCat})</option>
                          <option value="completed">Đã xong ⭐ ({totalStarredInCat})</option>
                        </select>
                      </div>

                      {/* Right: Quick search input */}
                      <div className="relative min-w-[200px] sm:w-64">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                        <input
                          type="text"
                          value={dictationSearchQuery}
                          onChange={(e) => setDictationSearchQuery(e.target.value)}
                          placeholder="Tìm số bài hoặc tên (vd: 84, Pretending...)"
                          className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        {dictationSearchQuery && (
                          <button
                            onClick={() => setDictationSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                          >
                            <i className="fa-solid fa-xmark" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Lesson Grid for selected sub-track */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                          Danh sách bài học ({displayLessons.length} / {lessons.length} bài)
                          {selectedSec && dictationSectionFilter !== 'all' && (
                            <span className="text-blue-500 normal-case font-bold ml-1.5">
                              • Đang hiển thị {selectedSec.name}
                            </span>
                          )}
                        </h4>
                        {displayLessons.length === 0 && (
                          <span className="text-xs text-amber-500 font-bold">Không tìm thấy bài học phù hợp</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                        {displayLessons.map((lesson) => {
                          const isStarred = isLessonStarred(lesson.id, dictationStars);
                          const isCurrent = !isStarred && currentTargetLesson?.id === lesson.id;
                          const isDiamond = !!lesson.isDiamond;

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => !isDiamond && toggleDictationStar(lesson.id)}
                              className={`p-3.5 px-4 rounded-2xl border flex items-center justify-between gap-3 transition select-none ${
                                isDiamond
                                  ? isLight
                                    ? 'bg-amber-50/40 border-amber-200/60 opacity-75 cursor-not-allowed'
                                    : 'bg-amber-950/20 border-amber-800/40 opacity-75 cursor-not-allowed'
                                  : isStarred
                                  ? isLight
                                    ? 'bg-blue-50/50 border-blue-200 cursor-pointer'
                                    : 'bg-blue-950/20 border-blue-800/40 cursor-pointer'
                                  : isCurrent
                                  ? isLight
                                    ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400 cursor-pointer'
                                    : 'bg-emerald-950/30 border-emerald-600/60 ring-1 ring-emerald-500 cursor-pointer'
                                  : isLight
                                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 cursor-pointer'
                                  : 'bg-slate-800/40 hover:bg-slate-800 border-slate-800 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                {isDiamond ? (
                                  <span className="text-base shrink-0 text-cyan-500" title="Bài khóa VIP (Kim cương)">
                                    💎
                                  </span>
                                ) : (
                                  <i
                                    className={`fa-star text-base shrink-0 transition ${
                                      isStarred
                                        ? 'fa-solid text-blue-500'
                                        : 'fa-regular text-slate-400 hover:text-blue-500'
                                    }`}
                                    title={isStarred ? 'Đã học (Bấm để hủy)' : 'Chưa học (Bấm để đánh dấu)'}
                                  />
                                )}

                                <div className="min-w-0 flex-1">
                                  <h4
                                    className={`text-xs md:text-sm font-extrabold leading-snug truncate ${
                                      isDiamond
                                        ? 'text-slate-500 dark:text-slate-400'
                                        : isStarred
                                        ? 'text-slate-700 dark:text-slate-300'
                                        : 'text-slate-900 dark:text-white'
                                    }`}
                                  >
                                    {lesson.num}. {lesson.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                                    <span>{lesson.parts} parts</span>
                                    <span>•</span>
                                    <span>Vocab: {lesson.level}</span>
                                    {isDiamond && <span className="text-cyan-500 font-bold">• Khóa VIP 💎</span>}
                                  </p>
                                </div>
                              </div>

                              <div className="shrink-0 flex items-center gap-2">
                                <a
                                  href={lesson.url || currentCat.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                                  title="Mở bài học này trên DailyDictation"
                                >
                                  <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                                </a>

                                {isDiamond ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono">
                                    Khóa VIP 💎
                                  </span>
                                ) : isCurrent ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 font-mono">
                                    Đang học
                                  </span>
                                ) : isStarred ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-500 font-mono">
                                    Đã xong ⭐
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                                    Chưa học
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom Navigation & Section Pager */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-layer-group text-blue-500" />
                          <span className="font-extrabold text-slate-700 dark:text-slate-200">
                            {dictationSectionFilter === 'all'
                              ? `Đang hiển thị toàn bộ ${lessons.length} bài học (${currentCat.title})`
                              : `Đang xem: ${selectedSec?.name || 'Section'} (${displayLessons.length} bài)`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {selectedSec && dictationSectionFilter !== 'all' ? (
                            <>
                              {/* Previous Section */}
                              {(() => {
                                const secIdx = (currentCat.sections || []).findIndex((s) => s.id === selectedSec.id);
                                const prevSec = secIdx > 0 ? currentCat.sections[secIdx - 1] : null;
                                return prevSec ? (
                                  <button
                                    onClick={() => setDictationSectionFilter(prevSec.id)}
                                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                  >
                                    <i className="fa-solid fa-arrow-left text-[10px]" />
                                    <span>{prevSec.name}</span>
                                  </button>
                                ) : null;
                              })()}

                              {/* Show All */}
                              <button
                                onClick={() => setDictationSectionFilter('all')}
                                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition shadow-xs cursor-pointer flex items-center gap-1.5"
                              >
                                <i className="fa-solid fa-list-ul text-[10px]" />
                                <span>Xem toàn bộ {lessons.length} bài</span>
                              </button>

                              {/* Next Section */}
                              {(() => {
                                const secIdx = (currentCat.sections || []).findIndex((s) => s.id === selectedSec.id);
                                const nextSec = secIdx >= 0 && secIdx < (currentCat.sections?.length || 0) - 1 ? currentCat.sections[secIdx + 1] : null;
                                return nextSec ? (
                                  <button
                                    onClick={() => setDictationSectionFilter(nextSec.id)}
                                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition flex items-center gap-1.5 cursor-pointer text-blue-600 dark:text-blue-400 shadow-2xs"
                                  >
                                    <span>{nextSec.name}</span>
                                    <i className="fa-solid fa-arrow-right text-[10px]" />
                                  </button>
                                ) : null;
                              })()}
                            </>
                          ) : (
                            <button
                              onClick={() => setDictationSectionFilter('active')}
                              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition cursor-pointer text-blue-600 dark:text-blue-400 flex items-center gap-1.5 shadow-2xs"
                            >
                              <i className="fa-solid fa-crosshairs text-[10px]" />
                              <span>Thu gọn về Section đang học ({activeSec?.name || 'Hiện tại'})</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── TAB 3: LỊCH 49 BUỔI TOEIC STUDY4 (CHI TIẾT TỪNG NGÀY) ─────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'study4-toeic' && (
            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-6 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Header with Dual Track Philosophy */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                      <i className="fa-solid fa-bolt" />
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                      Lộ Trình TOEIC Study4 (Tách Biệt Lịch Làm Đề & Từ Vựng)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                    💡 <strong>Chiến thuật học song song:</strong> Làm đề bấm giờ thực chiến ngay theo từng Test mà không cần chờ học xong từ vựng (tránh bị delay tiến độ). Từ vựng Study4 được tách riêng để bạn tự học tích lũy và ôn Flashcard bất cứ lúc nào.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {Object.values(study4StatusMap).filter((s) => s === 'Hoàn thành').length} / {STUDY4_TOEIC_SCHEDULE.length} Buổi Xong
                  </span>
                </div>
              </div>

              {/* ─── DUAL TRACK SELECTOR (SUB-TABS) ─── */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 overflow-x-auto scrollbar-hide">
                {[
                  {
                    id: 'tests',
                    icon: 'fa-solid fa-bullseye',
                    label: `Lịch Làm & Chữa Đề (${STUDY4_TEST_TRACK.length} Buổi)`,
                    desc: 'Ưu tiên giải đề thực chiến',
                    badge: `${STUDY4_TEST_TRACK.length} buổi`,
                    badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                  },
                  {
                    id: 'exams-grid',
                    icon: 'fa-solid fa-bolt',
                    label: 'Bảng 10 Đề Thi (Test 1 ➔ 10)',
                    desc: 'Chọn đề làm ngay',
                    badge: '10 Tests',
                    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
                  },
                  {
                    id: 'vocab',
                    icon: 'fa-solid fa-book-open',
                    label: `Kho Từ Vựng Study4 (${STUDY4_VOCAB_TRACK.length} Buổi)`,
                    desc: 'Tự học song song',
                    badge: `${STUDY4_VOCAB_TRACK.length} buổi`,
                    badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
                  },
                  {
                    id: 'all',
                    icon: 'fa-solid fa-clipboard-list',
                    label: 'Toàn Bộ 49 Buổi',
                    desc: 'Xem tổng quan',
                    badge: '49 buổi',
                    badgeColor: 'bg-slate-500/15 text-slate-600 dark:text-slate-400',
                  },
                ].map((st) => {
                  const active = study4SubView === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setStudy4SubView(st.id)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap select-none ${
                        active
                          ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <i className={`${st.icon} text-xs`} />
                      <span>{st.label}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${st.badgeColor}`}>
                        {st.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ─── SUB-VIEW 1: BẢNG 10 ĐỀ THI THỰC CHIẾN (EXAMS GRID) ─── */}
              {study4SubView === 'exams-grid' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <i className="fa-solid fa-stopwatch text-base text-blue-600 dark:text-blue-400" />
                      <span>
                        <strong>Làm đề bất kỳ lúc nào:</strong> Bấm chọn Test và phần thi bạn muốn làm ngay hôm nay. Không cần chờ học xong từ vựng!
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {STUDY4_EXAMS_OVERVIEW.map((exam) => {
                      const isPastDone = exam.testNum < activeTestNum;
                      const isCurrentActive = exam.testNum === activeTestNum;

                      return (
                        <div
                          key={exam.testNum}
                          className={`p-5 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between gap-4 relative overflow-hidden ${
                            isCurrentActive
                              ? isLight
                                ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 border-blue-400 shadow-md ring-2 ring-blue-500/30'
                                : 'bg-gradient-to-br from-blue-950/40 to-slate-900 border-blue-500/60 shadow-lg ring-1 ring-blue-500/40'
                              : isLight
                              ? 'bg-slate-50/70 border-slate-200 hover:border-blue-300 hover:bg-white'
                              : 'bg-slate-850/60 border-slate-800 hover:border-blue-500/40 hover:bg-slate-850'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                                  isCurrentActive
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : isPastDone
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-blue-600/15 text-blue-600 dark:text-blue-400'
                                }`}>
                                  T{exam.testNum}
                                </span>
                                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                                  {exam.title}
                                </h3>
                              </div>

                              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                {isCurrentActive && (
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs flex items-center gap-1">
                                    <i className="fa-solid fa-star text-[9px]" /> Đang Học
                                  </span>
                                )}
                                {isPastDone && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                    <i className="fa-solid fa-check text-[9px]" /> Đã Xong
                                  </span>
                                )}
                                {exam.isFullTest ? (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-500">
                                    Full 120p
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-500/15 text-slate-500">
                                    Mini/Chữa
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                              {exam.target}
                            </p>
                          </div>

                          {/* Test Action Buttons */}
                          <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => {
                                  onNavigate && onNavigate('study4-toeic');
                                }}
                                className="px-2.5 py-2 rounded-xl text-[11px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-1.5 shadow-xs"
                              >
                                <i className="fa-solid fa-headphones text-[10px]" />
                                <span>Listening ({exam.lisTime}p)</span>
                              </button>
                              <button
                                onClick={() => {
                                  onNavigate && onNavigate('study4-toeic');
                                }}
                                className="px-2.5 py-2 rounded-xl text-[11px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition flex items-center justify-center gap-1.5 shadow-xs"
                              >
                                <i className="fa-solid fa-book-open text-[10px]" />
                                <span>Reading ({exam.readTime}p)</span>
                              </button>
                            </div>

                            {/* Quick Set Active Test Button */}
                            {!isCurrentActive && (
                              <button
                                onClick={() => {
                                  setActiveTestNum(exam.testNum);
                                  // Auto-mark all previous tests as completed
                                  setStudy4StatusMap((prev) => {
                                    const next = { ...prev };
                                    STUDY4_TEST_TRACK.forEach((s) => {
                                      if (s.testNum < exam.testNum) {
                                        next[s.trackIndex] = 'Hoàn thành';
                                      }
                                    });
                                    return next;
                                  });
                                }}
                                className="w-full py-1.5 rounded-xl text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 transition flex items-center justify-center gap-1.5"
                                title={`Chọn Test ${exam.testNum} làm mốc đề đang học`}
                              >
                                <i className="fa-solid fa-location-crosshairs text-[9px]" />
                                <span>Đặt Test {exam.testNum} làm Đề Đang Học ➔</span>
                              </button>
                            )}

                            {/* Vocab Button (Independent Side Track) */}
                            <button
                              onClick={() => {
                                onNavigate &&
                                  onNavigate('vocabulary', {
                                    section: 'study4',
                                    tabId: 'toeic-listening',
                                    day: exam.testNum,
                                    partFilter: `day-${exam.testNum}`,
                                  });
                              }}
                              className="w-full py-1.5 rounded-xl text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
                            >
                              <i className="fa-solid fa-graduation-cap text-[10px]" />
                              <span>Học từ vựng Test {exam.testNum} (Flashcard riêng) ➔</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── SUB-VIEW 2: BẢNG DANH SÁCH BUỔI HỌC (THEO BỘ LỌC SUBVIEW) ─── */}
              {study4SubView !== 'exams-grid' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3 px-2">Ngày / Buổi</th>
                        <th className="pb-3 px-2">Kỹ năng</th>
                        <th className="pb-3 px-2">Phân loại</th>
                        <th className="pb-3 px-3">Nội dung hoạt động</th>
                        <th className="pb-3 px-2">Thời gian</th>
                        <th className="pb-3 px-2 text-center">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {(study4SubView === 'tests'
                        ? STUDY4_TEST_TRACK
                        : study4SubView === 'vocab'
                        ? STUDY4_VOCAB_TRACK
                        : STUDY4_TOEIC_SCHEDULE
                      ).map((session) => {
                        // TEST_TRACK dùng trackIndex, VOCAB_TRACK cũng dùng trackIndex; main schedule dùng day
                        const sessionKey = session.trackIndex ?? session.day;
                        const status = study4StatusMap[sessionKey] || session.status;
                        const isDone = status === 'Hoàn thành';
                        const isInProg = status === 'Đang làm';
                        const isTestAct = session.category === 'test';
                        const isReviewAct = session.category === 'review';
                        const isVocabAct = session.category === 'vocab';

                        return (
                          <tr
                            key={session.trackIndex ?? session.day}
                            className={`transition ${
                              session.date === todayKey
                                ? isLight
                                  ? 'bg-blue-50/70'
                                  : 'bg-blue-950/30'
                                : isLight
                                ? 'hover:bg-slate-50'
                                : 'hover:bg-slate-800/40'
                            }`}
                          >
                            <td className="py-3.5 px-2 font-mono">
                              <span className="font-extrabold block text-slate-900 dark:text-white">
                                Buổi {session.trackIndex ?? session.day}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {session.date ? `${session.date} • ${session.week}` : `Test ${session.testNum}`}
                              </span>
                            </td>

                            <td className="py-3.5 px-2">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                  session.skill === 'Listening'
                                    ? 'bg-blue-500/15 text-blue-500'
                                    : session.skill === 'Reading'
                                    ? 'bg-purple-500/15 text-purple-500'
                                    : 'bg-emerald-500/15 text-emerald-500'
                                }`}
                              >
                                {session.skill}
                              </span>
                            </td>

                            <td className="py-3.5 px-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                  isTestAct
                                    ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                    : isReviewAct
                                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                    : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                                }`}
                              >
                                {isTestAct ? (
                                  <>
                                    <i className="fa-solid fa-bullseye text-[10px]" />
                                    <span>Làm Đề</span>
                                  </>
                                ) : isReviewAct ? (
                                  <>
                                    <i className="fa-solid fa-magnifying-glass text-[10px]" />
                                    <span>Chữa Đề</span>
                                  </>
                                ) : (
                                  <>
                                    <i className="fa-solid fa-book-open text-[10px]" />
                                    <span>Từ Vựng</span>
                                  </>
                                )}
                              </span>
                            </td>

                            <td className="py-3.5 px-3 min-w-[240px]">
                              <div className="font-bold text-slate-900 dark:text-white leading-snug flex items-center justify-between gap-2">
                                <span>{session.activity}</span>
                                {isVocabAct && (
                                  <button
                                    onClick={() => {
                                      const isP1 = session.activity?.includes('Phần 1') || session.note?.toLowerCase().includes('nửa đầu');
                                      const isP2 = session.activity?.includes('Phần 2') || session.note?.toLowerCase().includes('nửa sau');
                                      onNavigate &&
                                        onNavigate('vocabulary', {
                                          section: 'study4',
                                          tabId: session.skill === 'Reading' ? 'toeic-reading' : 'toeic-listening',
                                          partFilter: isP1 ? 'part1' : isP2 ? 'part2' : 'all',
                                        });
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-500/15 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition flex items-center gap-1 shadow-xs"
                                    title="Mở kho từ vựng Study4 này"
                                  >
                                    <i className="fa-solid fa-graduation-cap" />
                                    <span>Học từ vựng ➔</span>
                                  </button>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{session.note}</div>
                            </td>

                            <td className="py-3.5 px-2 font-mono font-bold text-slate-500">
                              {session.duration}p
                            </td>

                            <td className="py-3.5 px-2 text-center">
                              <button
                                onClick={() => cycleStudy4Status(sessionKey)}
                                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition shadow-xs ${
                                  isDone
                                    ? 'bg-emerald-500 text-white'
                                    : isInProg
                                    ? 'bg-amber-500 text-slate-950'
                                    : isLight
                                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                                }`}
                              >
                                {status}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}

