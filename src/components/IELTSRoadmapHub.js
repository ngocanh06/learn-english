import React, { useState, useMemo, useCallback } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import {
  IELTS_PHASES,
  IELTS_WEEKS_DATA,
  IELTS_DAILY_SLOTS,
  calculateIeltsBand,
  IELTS_WRITING_CHEAT_SHEET,
  IELTS_SPEAKING_CUE_CARDS,
} from '../data/ieltsAcademicRoadmap';
import IELTSListeningLab from './ielts/IELTSListeningLab';
import IELTSReadingLab from './ielts/IELTSReadingLab';
import IELTSWritingStudioPro from './ielts/IELTSWritingStudioPro';
import IELTSSpeakingSimulator from './ielts/IELTSSpeakingSimulator';
import IELTSVocabStudio from './ielts/IELTSVocabStudio';
import IELTSPlacementTest from './ielts/IELTSPlacementTest';
import IELTS33TopicsStudio from './ielts/IELTS33TopicsStudio';
import VocabFromSheet from './VocabFromSheet';
import { IELTS_VOCAB_SHEET } from '../config/sheets';
import { useGoogleSheet } from '../hooks/useGoogleSheet';

export default function IELTSRoadmapHub({ onNavigate, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: Completed IELTS tasks { [taskId]: boolean }
  const [completedTasks, setCompletedTasks] = useUserStorage('ielts_completed_tasks_v1', {});
  const [diagnosticResult] = useUserStorage('ielts_diagnostic_result_v1', null);
  const [, setRecommendedStartWeek] = useUserStorage('ielts_recommended_start_week_v1', 1);

  // IELTS Google Sheet vocab hook
  const [ieltsSheetTab, setIeltsSheetTab] = useState(IELTS_VOCAB_SHEET.tabs[0]);
  const {
    data: ieltsSheetData,
    loading: ieltsSheetLoading,
    error: ieltsSheetError,
    refresh: ieltsSheetRefresh,
  } = useGoogleSheet(IELTS_VOCAB_SHEET.baseUrl, ieltsSheetTab.gid, 3);

  // Sub-tabs inside IELTS Hub: 'roadmap' | 'calculator' | 'writing' | 'speaking' | 'routine'
  const [activeSubTab, setActiveSubTab] = useState('roadmap');

  // Filters for Roadmap
  const [selectedPhase, setSelectedPhase] = useState('ALL');
  const [selectedSkill, setSelectedSkill] = useState('ALL');
  const [expandedWeek, setExpandedWeek] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Band Score Calculator state
  const [calcType, setCalcType] = useState('reading'); // 'reading' | 'listening'
  const [correctAnswers, setCorrectAnswers] = useState(30);

  // Toggle task completion
  const toggleTask = useCallback(
    (taskId) => {
      setCompletedTasks((prev) => ({
        ...prev,
        [taskId]: !prev[taskId],
      }));
    },
    [setCompletedTasks]
  );

  // Metrics computation
  const { totalTasksCount, completedCount, progressPercent, completedWeeksCount } = useMemo(() => {
    let total = 0;
    let done = 0;
    let doneWeeks = 0;

    IELTS_WEEKS_DATA.forEach((w) => {
      let weekAllDone = true;
      w.tasks.forEach((t) => {
        total += 1;
        if (completedTasks[t.id]) {
          done += 1;
        } else {
          weekAllDone = false;
        }
      });
      if (weekAllDone && w.tasks.length > 0) {
        doneWeeks += 1;
      }
    });

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return {
      totalTasksCount: total,
      completedCount: done,
      progressPercent: percent,
      completedWeeksCount: doneWeeks,
    };
  }, [completedTasks]);

  // Filtered weeks
  const filteredWeeks = useMemo(() => {
    return IELTS_WEEKS_DATA.filter((w) => {
      if (selectedPhase !== 'ALL' && w.phase !== selectedPhase) return false;
      if (selectedSkill !== 'ALL') {
        const hasSkill = w.tasks.some(
          (t) => t.skill.toLowerCase() === selectedSkill.toLowerCase()
        );
        if (!hasSkill) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(query);
        const matchesTarget = w.target.toLowerCase().includes(query);
        const matchesTasks = w.tasks.some(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.desc.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesTarget && !matchesTasks) return false;
      }
      return true;
    });
  }, [selectedPhase, selectedSkill, searchQuery]);

  // Calculated Band
  const currentBandResult = useMemo(() => {
    return calculateIeltsBand(calcType, correctAnswers);
  }, [calcType, correctAnswers]);

  // Adaptive learning analysis (Current Band vs Target 7.0+, Skill Gap & Next Lesson)
  const adaptiveAnalysis = useMemo(() => {
    const currentBand = diagnosticResult?.estimatedBand ? diagnosticResult.estimatedBand.toFixed(1) : '5.5';
    const targetBand = '7.0+';

    const skillStats = {
      listening: { total: 0, done: 0 },
      reading: { total: 0, done: 0 },
      writing: { total: 0, done: 0 },
      speaking: { total: 0, done: 0 },
      vocab: { total: 0, done: 0 },
    };

    IELTS_WEEKS_DATA.forEach((w) => {
      w.tasks.forEach((t) => {
        const s = (t.skill || 'vocab').toLowerCase();
        const key = skillStats[s] ? s : 'vocab';
        skillStats[key].total += 1;
        if (completedTasks[t.id]) {
          skillStats[key].done += 1;
        }
      });
    });

    const skillKeys = ['writing', 'speaking', 'listening', 'reading'];
    let lowestSkill = 'writing';
    let lowestPct = 100;
    skillKeys.forEach((k) => {
      const { total, done } = skillStats[k];
      const p = total > 0 ? (done / total) * 100 : 0;
      if (p <= lowestPct) {
        lowestPct = p;
        lowestSkill = k;
      }
    });

    let nextTask = null;
    let nextWeek = null;
    for (const w of IELTS_WEEKS_DATA) {
      for (const t of w.tasks) {
        if (!completedTasks[t.id]) {
          nextTask = t;
          nextWeek = w;
          break;
        }
      }
      if (nextTask) break;
    }

    return {
      currentBand,
      targetBand,
      skillStats,
      weakSkill: lowestSkill,
      weakSkillLabel:
        lowestSkill === 'writing'
          ? 'Writing (Task 1 & Task 2)'
          : lowestSkill === 'speaking'
          ? 'Speaking (Phản xạ 3 Part)'
          : lowestSkill === 'reading'
          ? 'Reading (Tốc độ & bẫy)'
          : 'Listening (Cam 12-18)',
      nextTask,
      nextWeek,
    };
  }, [diagnosticResult, completedTasks]);

  const getSkillBadge = (skill) => {
    const s = (skill || '').toLowerCase();
    switch (s) {
      case 'listening':
        return {
          bg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
          icon: 'fa-headphones',
          name: 'Listening',
        };
      case 'reading':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          icon: 'fa-book-open',
          name: 'Reading',
        };
      case 'writing':
        return {
          bg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
          icon: 'fa-pen-nib',
          name: 'Writing',
        };
      case 'speaking':
        return {
          bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          icon: 'fa-microphone-lines',
          name: 'Speaking',
        };
      default:
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: 'fa-layer-group',
          name: 'Vocab & Error Log',
        };
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ─── 1. HERO STUDY ABROAD BANNER ─────────────────────────────── */}
      <div
        className={`relative overflow-hidden rounded-xl p-6 md:p-7 border transition-all duration-200 ${
          isLight
            ? 'bg-slate-900 text-white border-slate-800'
            : 'bg-slate-900 text-white border-slate-800'
        }`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-xs font-semibold tracking-wide uppercase">
              <i className="fa-solid fa-graduation-cap text-blue-400" />
              <span>IELTS Academic Track • Mục Tiêu 7.0+</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">
              Lộ Trình Ôn Luyện IELTS Academic 5.5 → 7.0+
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Chiến lược 24 tuần cấp tốc chia theo 4 khung giờ khoa học: giải bộ
              Cambridge IELTS 12 - 19, làm chủ Writing Task 1 & 2, phản xạ Speaking Part 1 - 3 và
              hấp thụ 570 từ vựng Academic Word List.
            </p>

            {/* Quick Metrics Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 text-slate-200">
                <i className="fa-solid fa-bullseye text-blue-400" />
                <span>Target: <strong className="text-white">7.0+ Overall</strong></span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 text-slate-200">
                <i className="fa-solid fa-clock text-blue-400" />
                <span>Cường độ: <strong className="text-white">3 - 4 giờ/ngày</strong></span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 text-slate-200">
                <i className="fa-solid fa-certificate text-emerald-400" />
                <span>Chuẩn: <strong className="text-white">Đại học quốc tế</strong></span>
              </span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10 min-w-[260px] lg:w-72 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tiến Độ Lộ Trình
              </span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2 rounded-lg bg-black/20 text-center">
                <div className="font-bold text-white font-mono text-sm">
                  {completedCount} / {totalTasksCount}
                </div>
                <div className="text-[10px] text-slate-400">Nhiệm vụ xong</div>
              </div>
              <div className="p-2 rounded-lg bg-black/20 text-center">
                <div className="font-bold text-white font-mono text-sm">
                  {completedWeeksCount} / 24
                </div>
                <div className="text-[10px] text-slate-400">Tuần hoàn tất</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. SUB-NAV TABS ────────────────────────────────────────── */}
      <div
        id="ielts-subnav-root"
        className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide"
      >
        {[
          {
            id: 'placement-test',
            label: 'Đánh giá năng lực đầu vào',
            icon: 'fa-crosshairs',
            badge: diagnosticResult ? `Band ${diagnosticResult.estimatedBand.toFixed(1)}` : 'Nên làm',
          },
          { id: 'roadmap', label: 'Lộ Trình 24 Tuần', icon: 'fa-calendar-week' },
          { id: 'listening-lab', label: 'Phòng Luyện Nghe', icon: 'fa-headphones', badge: 'Cam 12-18' },
          { id: 'reading-lab', label: 'Phòng Luyện Đọc', icon: 'fa-book-open', badge: 'Cam 17-18' },
          { id: 'writing-studio', label: 'Luyện Viết (Writing)', icon: 'fa-pen-nib', badge: 'Chấm bài' },
          { id: 'speaking-sim', label: 'Luyện Nói (Speaking)', icon: 'fa-microphone-lines', badge: 'Thu âm' },
          { id: 'ielts-33-topics', label: '33 Chủ Đề Từ Vựng IELTS', icon: 'fa-book-bookmark', badge: '4,050 từ' },
          { id: 'sheet-vocab', label: 'Từ Vựng IELTS (Google Sheet)', icon: 'fa-earth-americas', badge: `${ieltsSheetData?.length || 0} từ` },
          { id: 'awl-vocab', label: 'Từ Vựng AWL (Flashcards)', icon: 'fa-layer-group', badge: '570 từ' },
          { id: 'calculator', label: 'Bảng Điểm & Quy Đổi Band', icon: 'fa-calculator' },
          { id: 'writing', label: 'Writing Cheat Sheet', icon: 'fa-file-lines' },
          { id: 'speaking', label: 'Speaking Cue Cards', icon: 'fa-comments' },
          { id: 'routine', label: 'Thời Khóa Biểu 3 - 4h', icon: 'fa-clock' },
        ].map((tab) => {
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap select-none ${
                active
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xs`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium leading-none ${
                    active
                      ? 'bg-white text-blue-600'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: TEST ĐÁNH GIÁ NĂNG LỰC ĐẦU VÀO (PLACEMENT TEST) ─────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'placement-test' && (
        <IELTSPlacementTest
          onApplyStartingWeek={(startWk) => {
            setRecommendedStartWeek(startWk);
            setExpandedWeek(startWk);
            setActiveSubTab('roadmap');
            window.scrollTo({ top: 350, behavior: 'smooth' });
          }}
          theme={theme}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 1: LỘ TRÌNH 24 TUẦN (WEEKLY ROADMAP) ────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6">
          {/* ─── IELTS ADAPTIVE GUIDANCE & ACTION CARD (MASTER PROMPT V2.1) ─── */}
          <div
            className={`p-6 rounded-3xl border transition-all shadow-sm ${
              isLight
                ? 'bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white border-blue-200 text-slate-900'
                : 'bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 border-blue-900/60 text-white'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Adaptive Level & Skill Gap Analysis */}
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-xs">
                    <i className="fa-solid fa-compass mr-1.5" />
                    Lộ Trình Thích Ứng (Adaptive Path)
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Mục tiêu: Du học Đại học / Thạc sĩ quốc tế
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Trình độ hiện tại</span>
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                      Band {adaptiveAnalysis.currentBand}
                    </span>
                  </div>
                  <i className="fa-solid fa-arrow-right text-slate-400 text-sm" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Mục tiêu bứt phá</span>
                    <span className="text-2xl font-black text-amber-500 font-mono">
                      Band {adaptiveAnalysis.targetBand}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider block">Kỹ năng cần tập trung</span>
                    <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                      {adaptiveAnalysis.weakSkillLabel}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {diagnosticResult
                    ? `Dựa trên kết quả Test Năng Lực (${diagnosticResult.score}/25 câu đúng), hệ thống đề xuất học tập từ Tuần ${diagnosticResult.recommendedWeek} và tập trung giải quyết bẫy điểm yếu.`
                    : 'Chưa làm bài test đánh giá đầu vào. Hãy làm bài test 15 phút để hệ thống tự động cá nhân hóa lộ trình và nhảy thẳng vào tuần phù hợp.'}
                </p>
              </div>

              {/* Right Column: Next Recommended Action */}
              <div
                className={`p-5 rounded-2xl border flex flex-col justify-between min-w-[300px] lg:w-96 shrink-0 ${
                  isLight
                    ? 'bg-white border-blue-200/90 shadow-sm'
                    : 'bg-slate-800/90 border-slate-700 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <i className="fa-solid fa-bolt" />
                      Bài Học Kế Tiếp Hôm Nay
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {completedCount}/{totalTasksCount} ({progressPercent}%)
                    </span>
                  </div>

                  {adaptiveAnalysis.nextTask ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                          Tuần {adaptiveAnalysis.nextWeek?.weekNum}
                        </span>
                        <h5 className="font-bold text-xs truncate text-slate-900 dark:text-white">
                          {adaptiveAnalysis.nextTask.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                        {adaptiveAnalysis.nextTask.desc}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-500 font-bold">
                      Xuất sắc! Bạn đã hoàn thành toàn bộ các bài học trong lộ trình 24 tuần.
                    </p>
                  )}
                </div>

                <div className="pt-4 flex items-center gap-2">
                  {adaptiveAnalysis.nextTask && (
                    <>
                      <button
                        onClick={() => {
                          if (adaptiveAnalysis.nextWeek) {
                            setExpandedWeek(adaptiveAnalysis.nextWeek.weekNum);
                            const el = document.getElementById(`week-card-${adaptiveAnalysis.nextWeek.weekNum}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                      >
                        <i className="fa-solid fa-play text-[10px]" />
                        <span>Vào Học Ngay</span>
                      </button>

                      <button
                        onClick={() => toggleTask(adaptiveAnalysis.nextTask.id)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                          isLight
                            ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                            : 'border-slate-600 hover:bg-slate-700 text-slate-200'
                        }`}
                        title="Đánh dấu hoàn thành"
                      >
                        <i className="fa-solid fa-check text-xs" />
                        <span>Xong</span>
                      </button>
                    </>
                  )}

                  {!diagnosticResult && (
                    <button
                      onClick={() => setActiveSubTab('placement-test')}
                      className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <i className="fa-solid fa-crosshairs text-[10px]" />
                      <span>Làm Test</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Cards Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {IELTS_PHASES.map((phase) => {
              const active = selectedPhase === phase.id;
              return (
                <div
                  key={phase.id}
                  onClick={() =>
                    setSelectedPhase(selectedPhase === phase.id ? 'ALL' : phase.id)
                  }
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 select-none flex flex-col justify-between group ${
                    active
                      ? 'bg-blue-600/10 border-blue-500 ring-2 ring-blue-500/30 shadow-md -translate-y-0.5'
                      : isLight
                      ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                      : 'bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                          active
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {phase.weeks}
                      </span>
                      <span className="text-xs font-bold font-mono text-amber-500 shrink-0">
                        {phase.targetBand}
                      </span>
                    </div>

                    <h3
                      className={`font-bold text-sm leading-snug mb-2 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {phase.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Filters & Search Bar */}
          <div
            className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Skill Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-hide">
              <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">Kỹ năng:</span>
              {['ALL', 'Listening', 'Reading', 'Writing', 'Speaking', 'Vocab'].map((sk) => {
                const active = selectedSkill === sk;
                return (
                  <button
                    key={sk}
                    onClick={() => setSelectedSkill(sk)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all select-none whitespace-nowrap ${
                      active
                        ? 'bg-blue-600 text-white'
                        : isLight
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {sk === 'ALL' ? 'Tất cả' : sk}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài học, Cambridge, dạng bài..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-900'
                    : 'bg-slate-800 border-slate-700 focus:border-blue-500 text-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
          </div>

          {/* Weeks Accordion List */}
          <div className="space-y-4">
            {filteredWeeks.length === 0 ? (
              <div
                className={`p-12 text-center rounded-2xl border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <i className="fa-solid fa-clipboard-question text-4xl text-slate-400 mb-3" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Không tìm thấy tuần học phù hợp
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Vui lòng chọn lại bộ lọc giai đoạn hoặc kỹ năng.
                </p>
              </div>
            ) : (
              filteredWeeks.map((weekItem) => {
                const isExpanded = expandedWeek === weekItem.week;
                const weekDoneCount = weekItem.tasks.filter((t) => completedTasks[t.id]).length;
                const weekTotalCount = weekItem.tasks.length;
                const isAllDone = weekDoneCount === weekTotalCount;

                return (
                  <div
                    key={weekItem.week}
                    id={`week-card-${weekItem.week}`}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? isLight
                          ? 'bg-white border-blue-400 shadow-md ring-1 ring-blue-400/20'
                          : 'bg-slate-900 border-blue-600/60 shadow-lg ring-1 ring-blue-600/20'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Week Header / Click to Expand */}
                    <div
                      onClick={() => setExpandedWeek(isExpanded ? null : weekItem.week)}
                      className="p-4 md:p-5 flex items-center justify-between cursor-pointer select-none gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                            isAllDone
                              ? 'bg-emerald-500 text-white'
                              : isExpanded
                              ? 'bg-blue-600 text-white'
                              : isLight
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {isAllDone ? (
                            <i className="fa-solid fa-check" />
                          ) : (
                            `W${weekItem.week}`
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                weekItem.phase === 'phase-1'
                                  ? 'bg-emerald-500/15 text-emerald-500'
                                  : weekItem.phase === 'phase-2'
                                  ? 'bg-blue-500/15 text-blue-500'
                                  : 'bg-amber-500/15 text-amber-500'
                              }`}
                            >
                              {weekItem.phase === 'phase-1'
                                ? 'Chặng 1 (5.5 -> 6.0)'
                                : weekItem.phase === 'phase-2'
                                ? 'Chặng 2 (6.0 -> 6.5)'
                                : 'Chặng 3 (6.5 -> 7.0+)'}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {weekDoneCount}/{weekTotalCount} hoàn thành
                            </span>
                          </div>

                          <h3
                            className={`font-bold text-sm md:text-base truncate ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {weekItem.title}
                          </h3>
                        </div>
                      </div>

                      {/* Right side: Expand indicator & progress */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:block text-right">
                          <div className="text-xs font-semibold text-slate-400">Mục tiêu</div>
                          <div className="text-xs font-bold text-amber-500 max-w-[200px] truncate">
                            {weekItem.target}
                          </div>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 bg-blue-600/10 text-blue-500' : 'text-slate-400'
                          }`}
                        >
                          <i className="fa-solid fa-chevron-down text-xs" />
                        </div>
                      </div>
                    </div>

                    {/* Week Task Body */}
                    {isExpanded && (
                      <div
                        className={`p-4 md:p-6 border-t space-y-3 ${
                          isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800'
                        }`}
                      >
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                          <i className="fa-solid fa-bullseye text-amber-500" />
                          <span>Chi tiết 5 nhiệm vụ trọng tâm trong tuần (3 - 4 giờ/ngày):</span>
                        </div>

                        <div className="space-y-2.5">
                          {weekItem.tasks.map((task) => {
                            const isDone = Boolean(completedTasks[task.id]);
                            const skillBadge = getSkillBadge(task.skill);

                            return (
                              <div
                                key={task.id}
                                className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                  isDone
                                    ? isLight
                                      ? 'bg-emerald-50/60 border-emerald-200'
                                      : 'bg-emerald-950/20 border-emerald-800/40'
                                    : isLight
                                    ? 'bg-white border-slate-200 hover:border-slate-300'
                                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-start gap-3 min-w-0">
                                  {/* Custom Checkbox */}
                                  <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                                      isDone
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : isLight
                                        ? 'border-slate-300 hover:border-blue-500 bg-white'
                                        : 'border-slate-600 hover:border-blue-400 bg-slate-800'
                                    }`}
                                    title={isDone ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                                  >
                                    {isDone && <i className="fa-solid fa-check text-[10px]" />}
                                  </button>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <span
                                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${skillBadge.bg}`}
                                      >
                                        <i className={`fa-solid ${skillBadge.icon} text-[9px]`} />
                                        <span>{skillBadge.name}</span>
                                      </span>

                                      <span className="text-[11px] font-mono text-slate-400">
                                        <i className="fa-regular fa-clock text-[10px] mr-1" />
                                        {task.duration}
                                      </span>
                                    </div>

                                    <h4
                                      className={`text-xs md:text-sm font-bold ${
                                        isDone
                                          ? 'line-through text-slate-400 dark:text-slate-500'
                                          : isLight
                                          ? 'text-slate-900'
                                          : 'text-white'
                                      }`}
                                    >
                                      {task.title}
                                    </h4>

                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                      {task.desc}
                                    </p>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                  <button
                                    onClick={() => {
                                      const s = (task.skill || '').toLowerCase();
                                      if (s.includes('listen')) {
                                        setActiveSubTab('listening-lab');
                                      } else if (s.includes('read')) {
                                        setActiveSubTab('reading-lab');
                                      } else if (s.includes('writ')) {
                                        setActiveSubTab('writing-studio');
                                      } else if (s.includes('speak')) {
                                        setActiveSubTab('speaking-sim');
                                      } else if (s.includes('vocab') || s.includes('word') || s.includes('awl')) {
                                        setActiveSubTab('awl-vocab');
                                      } else if (task.toolLink && onNavigate) {
                                        onNavigate(task.toolLink);
                                      }

                                      // Scroll directly to the practice room so the user sees the lesson immediately
                                      setTimeout(() => {
                                        const el = document.getElementById('ielts-subnav-root');
                                        if (el) {
                                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                      }, 50);
                                    }}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                                      isLight
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-500'
                                    }`}
                                  >
                                    <span>Luyện ngay</span>
                                    <i className="fa-solid fa-arrow-right text-[10px]" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: PHÒNG LUYỆN NGHE CAMBRIDGE LISTENING LAB ───────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'listening-lab' && (
        <IELTSListeningLab theme={theme} />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: PHÒNG LUYỆN ĐỌC CAMBRIDGE READING LAB ──────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'reading-lab' && (
        <IELTSReadingLab theme={theme} />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: PHÒNG LUYỆN VIẾT IELTS WRITING STUDIO PRO ──────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'writing-studio' && (
        <IELTSWritingStudioPro theme={theme} />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: PHÒNG LUYỆN NÓI SPEAKING SIMULATOR (MICRO GHI ÂM) ──── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'speaking-sim' && (
        <IELTSSpeakingSimulator theme={theme} />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: 33 CHỦ ĐỀ TỪ VỰNG IELTS THỰC CHIẾN (4,050 TỪ) ────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'ielts-33-topics' && (
        <IELTS33TopicsStudio theme={theme} />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: TỪ VỰNG IELTS TỪ GOOGLE SHEET ─────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'sheet-vocab' && (
        <VocabFromSheet
          data={ieltsSheetData}
          loading={ieltsSheetLoading}
          error={ieltsSheetError}
          onRefresh={ieltsSheetRefresh}
          tabs={IELTS_VOCAB_SHEET.tabs}
          activeTab={ieltsSheetTab}
          onTabChange={setIeltsSheetTab}
          title="Từ Vựng IELTS (Google Sheet)"
          icon={<i className="fa-solid fa-earth-americas text-amber-500" />}
          theme={theme}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB: KHO TỪ VỰNG HỌC THUẬT AWL FLASHCARDS 3D ────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'awl-vocab' && (
        <IELTSVocabStudio theme={theme} />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 2: BẢNG QUY ĐỔI BAND SCORE (CALCULATOR) ─────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center mx-auto text-xl">
                <i className="fa-solid fa-calculator" />
              </div>
              <h2
                className={`text-xl md:text-2xl font-black ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Công Cụ Tính Điểm IELTS Band Score
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                Nhập số câu trả lời chính xác trên tổng số 40 câu bài thi Cambridge IELTS Reading hoặc
                Listening để quy đổi ra Band điểm tương ứng chuẩn IDP / British Council.
              </p>
            </div>

            {/* Interactive Calculator Controls */}
            <div className="max-w-xl mx-auto space-y-6">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <button
                  onClick={() => setCalcType('reading')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    calcType === 'reading'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className="fa-solid fa-book-open text-xs" />
                  <span>Reading (Academic)</span>
                </button>
                <button
                  onClick={() => setCalcType('listening')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    calcType === 'listening'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className="fa-solid fa-headphones text-xs" />
                  <span>Listening</span>
                </button>
              </div>

              {/* Slider & Number input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Số câu đúng (0 - 40):</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={correctAnswers}
                      onChange={(e) =>
                        setCorrectAnswers(
                          Math.max(0, Math.min(40, parseInt(e.target.value, 10) || 0))
                        )
                      }
                      className={`w-16 text-center py-1.5 px-2 rounded-xl border text-base font-mono font-black outline-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                          : 'bg-slate-800 border-slate-700 text-white focus:border-blue-500'
                      }`}
                    />
                    <span className="text-sm font-mono text-slate-400">/ 40</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={40}
                  value={correctAnswers}
                  onChange={(e) => setCorrectAnswers(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-800 appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Result Showcase Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center shadow-lg relative overflow-hidden">
                <div className="text-xs uppercase font-bold tracking-wider text-blue-200 mb-1">
                  Ước Tính Band Điểm Đạt Được
                </div>

                <div className="text-5xl md:text-6xl font-black font-mono tracking-tight my-2">
                  {currentBandResult.band.toFixed(1)}
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3">
                  {currentBandResult.desc}
                </div>

                <p className="text-xs text-blue-100/90 max-w-md mx-auto leading-relaxed">
                  {currentBandResult.band >= 7.0
                    ? '🎉 Xuất sắc! Mức điểm này đủ điều kiện nộp hồ sơ xin học bổng toàn phần hoặc vào thẳng các trường Đại học danh tiếng tại Úc, Anh, Canada, Mỹ.'
                    : currentBandResult.band >= 6.5
                    ? '👍 Rất tốt! Bạn đã đạt chuẩn đầu vào hầu hết các chương trình Thạc sĩ & Đại học quốc tế. Hãy tiếp tục kiên trì để bứt phá lên 7.0+.'
                    : currentBandResult.band >= 6.0
                    ? '⚡ Khá tốt! Đã đủ điều kiện xét tuyển một số trường cao đẳng / đại học. Cần đẩy mạnh thêm tốc độ làm bài và bắt từ đồng nghĩa.'
                    : '💡 Cần tập trung ôn luyện kỹ càng các dạng bài cơ bản Part 1 & 2 để củng cố nền tảng vững chắc.'}
                </p>
              </div>
            </div>

            {/* Complete Band Table */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h3
                className={`text-sm font-bold uppercase tracking-wider mb-4 text-center ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                Bảng Quy Đổi Chi Tiết Cả 2 Kỹ Năng (Cambridge Reference)
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead
                    className={`font-bold uppercase tracking-wider border-b ${
                      isLight
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <tr>
                      <th className="p-3">Band Score</th>
                      <th className="p-3">Reading Academic (Số câu đúng)</th>
                      <th className="p-3">Listening (Số câu đúng)</th>
                      <th className="p-3">Đánh giá chuẩn du học</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {[
                      { band: '8.0 - 9.0', r: '35 - 40', l: '35 - 40', desc: 'Rất tốt / Xuất sắc' },
                      { band: '7.5', r: '33 - 34', l: '32 - 34', desc: 'Vững vàng học bổng cao' },
                      { band: '7.0', r: '30 - 32', l: '30 - 31', desc: 'Mục tiêu vàng Du học' },
                      { band: '6.5', r: '27 - 29', l: '26 - 29', desc: 'Chuẩn vào thẳng Đại học' },
                      { band: '6.0', r: '23 - 26', l: '23 - 25', desc: 'Khá, điều kiện tối thiểu' },
                      { band: '5.5', r: '19 - 22', l: '18 - 22', desc: 'Cần học thêm dự bị' },
                      { band: '5.0', r: '15 - 18', l: '16 - 17', desc: 'Cơ bản, cần bứt phá' },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={`${
                          row.band === '7.0'
                            ? isLight
                              ? 'bg-blue-50/80 font-bold text-blue-700'
                              : 'bg-blue-950/40 font-bold text-blue-300'
                            : isLight
                            ? 'hover:bg-slate-50'
                            : 'hover:bg-slate-850'
                        }`}
                      >
                        <td className="p-3 font-mono font-bold">{row.band}</td>
                        <td className="p-3 font-mono">{row.r}</td>
                        <td className="p-3 font-mono">{row.l}</td>
                        <td className="p-3">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 3: WRITING TASK 1 & 2 CHEAT SHEET ───────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'writing' && (
        <div className="space-y-6">
          {/* Task 1 Section */}
          <div
            className={`p-6 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                  T1
                </span>
                <h3
                  className={`text-base md:text-lg font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Writing Task 1: Dàn Ý 4 Đoạn Chuẩn Mực (150 từ - 20 phút)
                </h3>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('writing')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-pen-to-square text-xs" />
                <span>Mở Writing Studio</span>
              </button>
            </div>

            <div className="space-y-4">
              {IELTS_WRITING_CHEAT_SHEET.task1.structure.map((part, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
                    {part.part}
                  </h4>
                  <p
                    className={`text-xs font-mono mb-2 ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    <strong>Công thức:</strong> {part.formula}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    <strong>Ví dụ:</strong> "{part.example}"
                  </p>
                </div>
              ))}
            </div>

            {/* Lexical Resource Table for Task 1 */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Từ Vựng Diễn Tả Xu Hướng &amp; Số Liệu (Lexical Resource Band 7+)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {IELTS_WRITING_CHEAT_SHEET.task1.lexicalResource.map((lex, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-500 mb-1">{lex.type}</div>
                    <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                      {lex.words}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task 2 Section */}
          <div
            className={`p-6 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-purple-600/10 text-purple-500 flex items-center justify-center font-bold text-xs">
                T2
              </span>
              <h3
                className={`text-base md:text-lg font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Writing Task 2: Cấu Trúc Các Dạng Bài Luận &amp; Liên Từ Vàng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {IELTS_WRITING_CHEAT_SHEET.task2.structures.map((st, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold text-purple-500 mb-2">{st.type}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {st.structure}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Mẫu Câu Mở Rộng &amp; Liên Từ Học Thuật (Academic Transitions)
              </h4>
              <div className="space-y-2">
                {IELTS_WRITING_CHEAT_SHEET.task2.goldTransitions.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-850 border-slate-750 text-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-quote-left text-purple-500 text-[10px]" />
                    <span>{tr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 4: SPEAKING FORECAST & CUE CARDS ────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'speaking' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className={`text-base md:text-lg font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  IELTS Speaking Part 2 Golden Cue Cards (Bộ Đề Tủ Du Học)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Chiến lược 1 phút take notes chia 4 nhánh và ý tưởng trả lời chạm Band 7.5+
                </p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('video-hub')}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-microphone-lines text-xs" />
                <span>Luyện Shadowing AI</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {IELTS_SPEAKING_CUE_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/70 border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400">
                      {card.category}
                    </span>

                    <h4
                      className={`font-bold text-sm leading-snug ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {card.topic}
                    </h4>

                    <div className="p-3 rounded-xl bg-black/20 text-xs space-y-1 text-slate-300">
                      <div className="text-[10px] font-bold uppercase text-slate-400">
                        Prompts (Gợi ý):
                      </div>
                      {card.prompts.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-1.5 text-[11px]">
                          <i className="fa-solid fa-circle-dot text-[8px] text-purple-400" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <strong className="text-amber-500">Ý tưởng Band 7+:</strong> {card.band7Idea}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/50 text-[11px] text-purple-400 font-mono">
                    <i className="fa-solid fa-key mr-1" />
                    {card.vocabKey}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 5: THỜI KHÓA BIỂU 3 - 4H/NGÀY (DAILY ROUTINE) ───────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'routine' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
              <h3
                className={`text-xl md:text-2xl font-black ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Phân Bổ Thời Khóa Biểu 3 - 4 Tiếng/Ngày (4 Khung Giờ Vàng)
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                Lịch trình tối ưu hóa nhịp sinh học: Kỹ năng tiếp nhận (Input) buổi sáng khi não bộ
                tỉnh táo nhất, Kỹ năng sản xuất (Output) buổi chiều và luyện phản xạ nói buổi tối.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {IELTS_DAILY_SLOTS.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <i className={`fa-solid ${slot.icon} ${slot.color} text-base`} />
                      <h4
                        className={`font-bold text-sm ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {slot.slot}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-600/10 text-blue-500">
                      {slot.duration}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-amber-500 mb-2">
                    Trọng tâm: {slot.focus}
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {slot.tasks.map((tsk, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <i className="fa-solid fa-check text-emerald-500 text-[10px] mt-1 shrink-0" />
                        <span>{tsk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Golden Study Advice for Study Abroad */}
            <div
              className={`mt-8 p-5 rounded-2xl border flex items-start gap-4 ${
                isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
              }`}
            >
              <i className="fa-solid fa-lightbulb text-xl text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-sm">Lời Khuyên Cấp Tốc Dành Cho Người Đi Du Học:</div>
                <p className="leading-relaxed">
                  1. Không học quá nhiều tài liệu trôi nổi: Chỉ trung thành tuyệt đối với bộ <strong>Cambridge IELTS 12 - 19</strong> (đề thi thật của Cambridge English).<br />
                  2. Chữa đề quan trọng gấp 3 lần làm đề: Sau mỗi bài Test, dành ít nhất 60 phút để lập bảng Paraphrase và tìm ra lý do tại sao mình bị đánh lừa.<br />
                  3. Không bỏ sót tiêu chí Task Achievement &amp; Cohesion trong Writing: Luôn viết Overview rõ ràng và chia đoạn mạch lạc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
