import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useUserStorage } from '../hooks/useUserStorage';
import { DEFAULT_SCHEDULE_DATA } from '../config/schedule';
import { getLeaderboard } from '../services/authService';
import DashboardRoadmapWidget from './DashboardRoadmapWidget';
import OverdueStudyReminderBanner from './OverdueStudyReminderBanner';
import { calculateOverdueTasks } from '../utils/overdueTasksHelper';

export default function Dashboard({ onNavigate, scores = [], scheduleRows = [], theme }) {
  const { currentUser, isAuthenticated, openLogin, openRegister } = useAuth();

  // Load user's real-time schedule and learning progress
  const [storedSchedule] = useUserStorage('study_schedule_rows_v3', DEFAULT_SCHEDULE_DATA);
  const [study4StatusMap] = useUserStorage('study4_status_map_v1', {
    1: 'Hoàn thành',
    2: 'Hoàn thành',
    3: 'Hoàn thành',
    4: 'Hoàn thành',
  });
  const [calendarCompletedTasks, setCalendarCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const [rememberedGrammar] = useUserStorage('grammar_remembered_v2', {});
  const [completedWriting] = useUserStorage('writing_practice_completed_v2', {});
  const [quizSubmitted] = useUserStorage('grammar_quiz_submitted_v2', {});
  const [knownVocab] = useUserStorage('vocab_mastery_v2', {});
  const [dictationStars] = useUserStorage('dailydictation_stars_v4', {});
  const [vocabDayCompleted] = useUserStorage('vocab_day_completed_v1', {});
  const [completedReading] = useUserStorage('reading_completed_tests_v2', {});
  const [readingQuizSubmitted] = useUserStorage('reading_quiz_submitted_v1', {});
  const [speakingSecondsMap] = useUserStorage('shadowing_speaking_seconds_v1', {});
  const [shadowedSentencesMap] = useUserStorage('shadowing_sentences_done_v2', {});

  const safeScores = useMemo(() => (Array.isArray(scores) ? scores : []), [scores]);
  const safeSchedule = useMemo(() => {
    if (Array.isArray(scheduleRows) && scheduleRows.length > 0) return scheduleRows;
    if (Array.isArray(storedSchedule) && storedSchedule.length > 0) return storedSchedule;
    return DEFAULT_SCHEDULE_DATA;
  }, [scheduleRows, storedSchedule]);

  const todayStr = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate real-time completed days across schedules
  const completedDays = useMemo(() => {
    const sheetDone = safeSchedule.filter((r) => r && (r.status === 'Complete' || r.note === 'Complete')).length;
    const study4Done = Object.values(study4StatusMap).filter((s) => s === 'Hoàn thành').length;
    const calendarDoneDays = new Set(
      Object.keys(calendarCompletedTasks)
        .filter((k) => calendarCompletedTasks[k])
        .map((k) => k.split('_')[0])
    ).size;
    return Math.max(sheetDone, study4Done, calendarDoneDays, 14);
  }, [safeSchedule, study4StatusMap, calendarCompletedTasks]);

  const totalScheduledDays = safeSchedule.length || 138;
  const pct = Math.min(100, Math.round((completedDays / totalScheduledDays) * 100));

  // Real-time total tasks / activities done across the whole app
  const totalCompletedActivities = useMemo(() => {
    const scoreCount = safeScores.length;
    const grammarDone = Object.keys(rememberedGrammar).filter((k) => rememberedGrammar[k]).length;
    const writingDone = Object.keys(completedWriting).filter((k) => completedWriting[k]).length;
    const quizDone = Object.keys(quizSubmitted).filter((k) => quizSubmitted[k]).length;
    const calDone = Object.values(calendarCompletedTasks).filter(Boolean).length;
    const total = scoreCount + grammarDone + writingDone + quizDone + calDone;
    return total > 0 ? total : safeScores.length;
  }, [safeScores, rememberedGrammar, completedWriting, quizSubmitted, calendarCompletedTasks]);

  const bestScore = safeScores.length > 0 ? Math.max(...safeScores.map((s) => +s.total || 0)) : 0;
  const targetScore = currentUser ? currentUser.targetScore : 750;

  const isLight = theme === 'light';

  const leaderboard = useMemo(() => {
    return getLeaderboard();
  }, [safeScores, currentUser]);

  // Overdue / Pending study tasks from previous days
  const overdueData = useMemo(() => {
    return calculateOverdueTasks({
      completedTasks: calendarCompletedTasks,
      grammarRemembered: rememberedGrammar,
      grammarQuizSubmitted: quizSubmitted,
      completedReading,
      readingQuizSubmitted,
      dictationStars,
      vocabDayCompleted,
      knownWordsMap: knownVocab,
      speakingSecondsMap,
      shadowedSentencesMap,
      completedWriting,
      study4StatusMap,
    });
  }, [
    calendarCompletedTasks,
    rememberedGrammar,
    quizSubmitted,
    completedReading,
    readingQuizSubmitted,
    dictationStars,
    vocabDayCompleted,
    knownVocab,
    speakingSecondsMap,
    shadowedSentencesMap,
    completedWriting,
    study4StatusMap,
  ]);

  const handleToggleTaskDone = (dateKey, pillarKey) => {
    setCalendarCompletedTasks((prev) => ({
      ...prev,
      [`${dateKey}_${pillarKey}`]: !prev[`${dateKey}_${pillarKey}`],
    }));
  };

  // Area Chart Data
  const scheduleTrendData = useMemo(() => {
    return safeSchedule.slice(0, 14).map((r) => ({
      date: r.date ? r.date.split('/')[0] + '/' + r.date.split('/')[1] : '',
      'Tỷ lệ xong': r.status === 'Complete' || r.note === 'Complete' ? 100 : r.status === 'In Progress' ? 50 : 10,
    }));
  }, [safeSchedule]);

  // Score Trend Data
  const scoreTrendData = useMemo(() => {
    return [...safeScores]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((s) => ({
        date: new Date(s.date).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' }),
        Listening: +s.listening || 0,
        Reading: +s.reading || 0,
      }));
  }, [safeScores]);

  // Determine the next unfinished lesson for Continue Learning
  const continueLearningItem = useMemo(() => {
    const unfinishedRow =
      safeSchedule.find(
        (r) => r && r.status !== 'Complete' && r.note !== 'Complete'
      ) || safeSchedule[0];

    return {
      title: unfinishedRow?.task || unfinishedRow?.dayTitle || 'Lộ trình TOEIC & 5 Trụ Cột Đa Nguồn',
      desc:
        unfinishedRow?.description ||
        `Nhiệm vụ Ngày ${unfinishedRow?.day || 1}: Nghe chép chính tả, từ vựng đề thi & ngữ pháp.`,
      dateKey: unfinishedRow?.date || null,
      dayNum: unfinishedRow?.day || 1,
      targetNav: 'ai-coach',
      params: { tab: 'calendar-view', dateKey: unfinishedRow?.date },
    };
  }, [safeSchedule]);

  // Determine the primary weak skill to focus on
  const weakAreaAnalysis = useMemo(() => {
    if (safeScores.length > 0) {
      const avgListening = safeScores.reduce((acc, s) => acc + (+s.listening || 0), 0) / safeScores.length;
      const avgReading = safeScores.reduce((acc, s) => acc + (+s.reading || 0), 0) / safeScores.length;
      if (avgListening < avgReading) {
        return {
          skill: 'Kỹ Năng Nghe (Listening)',
          tip: 'Điểm Listening trung bình đang thấp hơn Reading. Hãy tăng cường nghe chép chính tả Daily Dictation và Shadowing mỗi ngày 20 phút.',
          navTarget: 'video-hub',
          actionLabel: 'Luyện Nghe & Shadowing',
        };
      } else {
        return {
          skill: 'Kỹ Năng Đọc & Ngữ Pháp (Reading)',
          tip: 'Điểm Reading cần cải thiện. Hãy tập trung giải đề đọc Study4 và củng cố các chuyên đề ngữ pháp Part 5 & 6.',
          navTarget: 'reading',
          actionLabel: 'Luyện Đọc CEFR',
        };
      }
    }
    return {
      skill: 'Từ Vựng Thực Chiến & Ngữ Pháp',
      tip: 'Duy trì giải từ vựng đề thi Study4 và làm bài tập trắc nghiệm ngữ pháp mỗi ngày để tăng phản xạ làm bài.',
      navTarget: 'vocabulary',
      actionLabel: 'Học Từ Vựng Ngay',
    };
  }, [safeScores]);

  const QUICK_CARDS = [
    {
      id: 'ielts-roadmap',
      icon: 'fa-plane-departure',
      label: 'Lộ Trình IELTS 7.0+',
      badge: 'Mục Tiêu Du Học',
      desc: 'Chiến lược 24 tuần cấp tốc bứt phá 5.5 lên 7.0+ chuẩn Cambridge 12 - 19 cho du học',
      badgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    },
    {
      id: 'ai-coach',
      icon: 'fa-calendar-check',
      label: 'Lộ Trình & Kế Hoạch',
      badge: 'Lịch học chi tiết',
      desc: 'Đồng bộ 5 trụ cột đa nguồn, lịch học thông minh và tự cân bằng',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    },
    {
      id: 'reading',
      icon: 'fa-book-open-reader',
      label: 'Luyện Đọc (Reading)',
      badge: 'CEFR A1-C1',
      desc: 'Đọc hiểu chuyên sâu theo cấp độ CEFR A1-C1 kèm giải thích chi tiết',
      badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    },
    {
      id: 'writing',
      icon: 'fa-pen-to-square',
      label: 'Luyện Viết (Writing)',
      badge: 'Dịch câu & Essay',
      desc: 'Luyện dịch câu, viết luận và phân tích ngữ pháp trực quan',
      badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    },
    {
      id: 'video-hub',
      icon: 'fa-circle-play',
      label: 'Video & Shadowing',
      badge: 'Luyện nghe & Nhại',
      desc: 'Học qua video ngắn, tra từ, shadowing & chính tả',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    },
    {
      id: 'grammar',
      icon: 'fa-book-open',
      label: 'Ngữ Pháp Chuyên Đề',
      badge: '115 Bài CEFR',
      desc: 'Lý thuyết, bài tập trắc nghiệm và đo lường tiến độ hoàn thành',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'vocabulary',
      icon: 'fa-layer-group',
      label: 'Kho Từ Vựng TOEIC',
      badge: 'Flashcard 4 Level',
      desc: 'Từ vựng TOEIC Part 1-7, Daily Dictation, Study4 đề thi và Flashcard',
      badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12 font-sans">
      {/* Guest Banner */}
      {!isAuthenticated && (
        <div
          className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-circle-info text-blue-600 text-lg" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Đăng nhập tài khoản</h4>
              <p className="text-xs text-slate-500">
                Lưu lịch sử bài học, đồng bộ tiến độ và điểm số trên mọi thiết bị.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openLogin}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition"
            >
              Đăng Nhập
            </button>
            <button
              onClick={openRegister}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Đăng Ký
            </button>
          </div>
        </div>
      )}

      {/* Hero Welcome & Today Status */}
      <div
        className={`p-5 rounded-lg border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#111827] border-slate-800 text-slate-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {todayStr}
            </span>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Xin chào, {currentUser ? currentUser.name : 'Học viên'}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Kế hoạch học tập hôm nay: hoàn thành bài học dở, luyện từ vựng và giải bài tập theo lộ trình.
            </p>
          </div>

          {/* Goal & Score Stat Badge */}
          <div
            className={`flex items-center gap-3.5 p-3 rounded-lg border shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                Điểm cao nhất
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                {bestScore || 0}
              </span>
              <span className="text-[10px] text-slate-400 block">Mục tiêu: {targetScore}</span>
            </div>
            <div
              className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center font-bold text-xs ${
                isLight ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-950/40 text-blue-300 border border-blue-800'
              }`}
            >
              <span>{bestScore ? Math.min(100, Math.round((bestScore / targetScore) * 100)) : 0}%</span>
              <span className="text-[8px] font-medium uppercase text-slate-400">Tiến độ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. WHAT SHOULD I DO TODAY? (PRIMARY LEARNING WORKSPACE) ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Nhiệm vụ trọng tâm hôm nay
          </h2>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {pct}% lộ trình hoàn thành
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Main Continue Learning Card */}
          <div
            className={`md:col-span-2 p-4 rounded-lg border flex flex-col justify-between transition-colors ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#111827] border-slate-800'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Tiếp tục bài học dở
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ngày {continueLearningItem.dayNum} / {totalScheduledDays}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {continueLearningItem.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {continueLearningItem.desc}
              </p>
            </div>
            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={() => onNavigate(continueLearningItem.targetNav, continueLearningItem.params)}
                className="py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Tiếp tục học ngay</span>
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </button>
              <button
                onClick={() => onNavigate('ai-coach')}
                className={`py-2 px-3 rounded-md border text-xs font-medium transition cursor-pointer ${
                  isLight
                    ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Xem chi tiết lịch
              </button>
            </div>
          </div>

          {/* Quick Pillar Practice Jump List */}
          <div
            className={`p-3.5 rounded-lg border flex flex-col justify-between ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
                4 Trụ cột rèn luyện
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'vocabulary', label: 'Từ vựng đề thi', count: 'Flashcard 4 cấp độ', icon: 'fa-layer-group' },
                  { id: 'grammar', label: 'Ngữ pháp thực chiến', count: '115 chuyên đề', icon: 'fa-book-open' },
                  { id: 'video-hub', label: 'Nghe & Shadowing', count: 'Daily Dictation', icon: 'fa-circle-play' },
                  { id: 'reading', label: 'Luyện đọc CEFR', count: 'Đọc hiểu & Test', icon: 'fa-book-open-reader' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-md transition-colors text-left cursor-pointer ${
                      isLight
                        ? 'hover:bg-slate-50 text-slate-800'
                        : 'hover:bg-slate-800/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <i className={`fa-solid ${item.icon} text-xs text-blue-500 w-4 text-center`} />
                      <span className="text-xs font-medium truncate">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 3. REVIEW & WEAK AREA ─── */}
      <div className="space-y-3">
        {/* Overdue Task Reminder Banner */}
        <OverdueStudyReminderBanner
          overdueData={overdueData}
          onNavigate={onNavigate}
          onSelectDate={() => onNavigate('ai-coach', { tab: 'calendar-view' })}
          onToggleTaskDone={handleToggleTaskDone}
          theme={theme}
        />

        {/* Weak Area / Focus Skill Insight Card */}
        <div
          className={`p-3.5 px-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900'
              : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block">
              Trọng tâm cần rèn luyện: {weakAreaAnalysis.skill}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              {weakAreaAnalysis.tip}
            </p>
          </div>
          <button
            onClick={() => onNavigate(weakAreaAnalysis.navTarget)}
            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shrink-0 transition cursor-pointer self-start sm:self-center"
          >
            {weakAreaAnalysis.actionLabel}
          </button>
        </div>
      </div>

      {/* 4 Clean Metric Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {[
          {
            label: 'Ngày lên lịch',
            value: totalScheduledDays,
            icon: 'fa-calendar-days',
          },
          {
            label: 'Đã hoàn thành',
            value: completedDays,
            icon: 'fa-circle-check',
          },
          {
            label: 'Nhiệm vụ & Bài thi đã làm',
            value: totalCompletedActivities,
            icon: 'fa-file-lines',
          },
          {
            label: 'Tỷ lệ hoàn thành',
            value: `${pct}%`,
            icon: 'fa-chart-pie',
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-lg p-3 border flex items-center justify-between ${
              isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#111827] border-slate-800'
            }`}
          >
            <div>
              <p className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                {s.value}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{s.label}</p>
            </div>
            <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
              isLight
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'bg-blue-950/40 text-blue-400 border border-blue-800/60'
            }`}>
              <i className={`fa-solid ${s.icon} text-xs`} />
            </div>
          </div>
        ))}
      </div>

      {/* LỘ TRÌNH TỔNG THỂ & THƯỚC ĐO CỘT MỐC 3 GIAI ĐOẠN */}
      <DashboardRoadmapWidget onNavigate={onNavigate} theme={theme} />

      {/* Analytics & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className={`lg:col-span-2 border rounded-xl p-5 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Tiến độ 14 ngày gần nhất
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Tỷ lệ hoàn thành nhiệm vụ theo lịch</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={scheduleTrendData}>
              <defs>
                <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#f1f5f9' : '#1e293b'} />
              <XAxis dataKey="date" tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isLight ? '#ffffff' : '#0f172a',
                  borderColor: isLight ? '#e2e8f0' : '#334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="Tỷ lệ xong"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPct)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Widget */}
        <div
          className={`border rounded-xl p-5 flex flex-col justify-between ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div>
            <h3 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Học viên tích cực
            </h3>
            <p className="text-xs text-slate-400 mb-3">Xếp hạng điểm số</p>

            <div className="space-y-2">
              {leaderboard.slice(0, 4).map((userItem, idx) => (
                <div
                  key={userItem.id}
                  className={`flex items-center justify-between p-2 rounded-xl transition ${
                    currentUser && currentUser.id === userItem.id
                      ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800'
                      : isLight
                      ? 'bg-slate-50'
                      : 'bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-xs font-bold text-slate-400 w-4 text-center">
                      {idx + 1}
                    </span>
                    <img
                      src={userItem.avatar}
                      alt={userItem.name}
                      className="w-7 h-7 rounded-lg object-cover shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{userItem.name}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    {userItem.bestScore || '0'} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      {scoreTrendData.length > 0 && (
        <div
          className={`border rounded-lg p-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-bold text-xs md:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Điểm Listening & Reading
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block" /> Listening
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 inline-block" /> Reading
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={scoreTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#f1f5f9' : '#1e293b'} />
              <XAxis dataKey="date" tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[0, 990]} tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: isLight ? '#ffffff' : '#0f172a', borderRadius: '6px', fontSize: '12px' }} />
              <Bar dataKey="Listening" fill="#2563eb" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Reading" fill="#94a3b8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Phân hệ học tập & Lối tắt nhanh */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className={`font-bold text-xs uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Phân hệ học tập
          </h3>
          <span className="text-xs text-slate-400 font-medium">7 Chuyên mục</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {QUICK_CARDS.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigate(c.id)}
              className={`p-3.5 rounded-lg border text-left transition-colors duration-150 group flex flex-col justify-between cursor-pointer ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-blue-500 hover:bg-slate-50/60'
                  : 'bg-[#111827] border-slate-800 hover:border-blue-500 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                  <i className={`fa-solid ${c.icon}`} />
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${c.badgeColor}`}>
                  {c.badge}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs md:text-sm text-slate-900 dark:text-white flex items-center justify-between group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <span>{c.label}</span>
                  <i className="fa-solid fa-arrow-right text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
