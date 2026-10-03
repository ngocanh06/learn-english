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
      label: 'Lộ Trình IELTS 7.0+ Du Học',
      badge: 'Mục Tiêu Du Học ✈️',
      desc: 'Chiến lược 24 tuần cấp tốc bứt phá 5.5 lên 7.0+ chuẩn Cambridge 12 - 19 cho du học',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-rose-500 font-bold border border-rose-500/30',
    },
    {
      id: 'ai-coach',
      icon: 'fa-robot',
      label: 'Lộ Trình & AI Coach',
      badge: 'Master Schedule',
      desc: 'Đồng bộ 5 trụ cột đa nguồn, lịch học thông minh và tự cân bằng',
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    },
    {
      id: 'reading',
      icon: 'fa-book-open-reader',
      label: 'Luyện Đọc (Reading)',
      badge: 'Test-English & CEFR',
      desc: 'Đọc hiểu chuyên sâu theo cấp độ CEFR A1-C1 kèm giải thích chi tiết',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'writing',
      icon: 'fa-pen-to-square',
      label: 'Luyện Viết (Writing)',
      badge: 'The IELTS Dict',
      desc: 'Luyện dịch câu, viết luận và phân tích ngữ pháp trực quan',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    },
    {
      id: 'video-hub',
      icon: 'fa-circle-play',
      label: 'Video & Shadowing',
      badge: 'Đa Nguồn',
      desc: 'Học qua video YouTube/TikTok, tra từ, shadowing & chính tả',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'grammar',
      icon: 'fa-book-open',
      label: 'Ngữ Pháp Chuyên Đề',
      badge: '115 Bài CEFR',
      desc: 'Lý thuyết, bài tập trắc nghiệm và đo lường tiến độ hoàn thành',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'vocabulary',
      icon: 'fa-layer-group',
      label: 'Kho Từ Vựng TOEIC',
      badge: 'Part 1-7 & 4 Level',
      desc: 'Từ vựng TOEIC Part 1-7, Daily Dictation, Study4 đề thi và Flashcard',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80',
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
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
        className={`p-6 rounded-xl border transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-xs'
            : 'bg-slate-900 border-slate-800 text-white shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {todayStr}
            </span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Xin chào, {currentUser ? currentUser.name : 'Học viên'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
              Trung tâm học tiếng Anh &amp; luyện thi TOEIC với 5 trụ cột: Luyện Đọc, Luyện Viết, Nghe Chép Chính Tả, Ngữ Pháp &amp; Video Shadowing.
            </p>
            <div className="pt-2 flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => onNavigate('ai-coach')}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer"
              >
                Vào lộ trình hôm nay
              </button>
              <button
                onClick={() => onNavigate('reading')}
                className={`px-4 py-2 rounded-lg font-semibold text-xs transition border cursor-pointer ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                Luyện đọc CEFR
              </button>
            </div>
          </div>

          {/* Goal & Score Stat Badge */}
          <div
            className={`flex items-center gap-4 p-4 rounded-xl border shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'
            }`}
          >
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                Điểm cao nhất
              </span>
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {bestScore || 0}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Mục tiêu: {targetScore}</span>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs ${
                isLight ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-950/40 text-blue-300 border border-blue-800'
              }`}
            >
              <span>{bestScore ? Math.min(100, Math.round((bestScore / targetScore) * 100)) : 0}%</span>
              <span className="text-[8px] font-medium uppercase text-slate-400">Tiến độ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. CONTINUE LEARNING & TODAY'S LEARNING ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Continue Learning Card */}
        <div
          className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                Tiếp tục bài học dở
              </span>
              <span className="text-xs font-mono text-slate-400">
                Ngày {continueLearningItem.dayNum}
              </span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">
              {continueLearningItem.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {continueLearningItem.desc}
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => onNavigate(continueLearningItem.targetNav, continueLearningItem.params)}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer"
            >
              Tiếp tục học ngay
            </button>
          </div>
        </div>

        {/* Today's Learning Overview Card */}
        <div
          className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Lộ trình hôm nay
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {pct}% hoàn thành
              </span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
              5 Trụ cột: Nghe, Nói, Đọc, Viết, Từ vựng & Ngữ pháp
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              Đã hoàn thành {completedDays} / {totalScheduledDays} ngày theo tiến trình học tập.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('ai-coach')}
              className={`w-full py-2 px-3 rounded-lg font-semibold text-xs transition border cursor-pointer ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
              }`}
            >
              Mở lịch học hôm nay
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. REVIEW & WEAK AREA (SECTION 17) ─── */}
      <div className="space-y-4">
        {/* Review: Overdue Task Reminder Banner */}
        <OverdueStudyReminderBanner
          overdueData={overdueData}
          onNavigate={onNavigate}
          onSelectDate={() => onNavigate('ai-coach', { tab: 'calendar-view' })}
          onToggleTaskDone={handleToggleTaskDone}
          theme={theme}
        />

        {/* Weak Area / Focus Skill Insight Card */}
        <div
          className={`p-4 px-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900'
              : 'bg-slate-850 border-slate-800 text-slate-100'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block">
              Trọng tâm cần rèn luyện: {weakAreaAnalysis.skill}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              {weakAreaAnalysis.tip}
            </p>
          </div>
          <button
            onClick={() => onNavigate(weakAreaAnalysis.navTarget)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shrink-0 transition cursor-pointer self-end sm:self-center"
          >
            {weakAreaAnalysis.actionLabel}
          </button>
        </div>
      </div>

      {/* 4 Clean, Unified Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
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
            className={`rounded-2xl p-4 border transition-all duration-200 flex items-center justify-between shadow-xs ${
              isLight
                ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-slate-100/50'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {s.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{s.label}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isLight
                ? 'bg-blue-50 text-blue-600 border border-blue-100/80'
                : 'bg-blue-950/40 text-blue-400 border border-blue-800/60'
            }`}>
              <i className={`fa-solid ${s.icon} text-sm`} />
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
          className={`border rounded-2xl p-5 shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Điểm Listening & Reading
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" /> Listening
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-400 inline-block" /> Reading
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={scoreTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#f1f5f9' : '#1e293b'} />
              <XAxis dataKey="date" tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[0, 990]} tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: isLight ? '#ffffff' : '#0f172a', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="Listening" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Reading" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Phân hệ học tập & Lối tắt nhanh */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-black text-sm uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Phân hệ học tập & Lối tắt nhanh
          </h3>
          <span className="text-xs font-bold text-slate-400 font-mono">7 Phân hệ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {QUICK_CARDS.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigate(c.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                isLight
                  ? 'bg-white border-slate-200/90 hover:border-indigo-500/50 hover:bg-slate-50/50'
                  : 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                  <i className={`fa-solid ${c.icon}`} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {c.badge}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs md:text-sm text-slate-900 dark:text-white flex items-center justify-between group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <span>{c.label}</span>
                  <i className="fa-solid fa-arrow-right text-[11px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
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
