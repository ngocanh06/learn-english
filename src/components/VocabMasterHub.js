import React, { useState, useMemo, useEffect } from 'react';
import VocabByPart from './VocabByPart';
import VocabFromSheet from './VocabFromSheet';
import NotebookVocabStudio from './NotebookVocabStudio';
import VocabStudyStudio from './VocabStudyStudio';
import { DAILY_DICTATION_SHEET, TEST_VOCAB_SHEET, IELTS_VOCAB_SHEET } from '../config/sheets';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { useUserStorage } from '../hooks/useUserStorage';
import { VOCAB_DATABASE } from '../data/vocabularyByLevelAndPart';
import { speakEnglish } from '../utils/speechHelper';
import IELTS33TopicsStudio from './ielts/IELTS33TopicsStudio';
import { IELTS_ALL_33_TOPICS_WORDS } from '../data/ieltsVocab33Topics';

// Precompute total static database words once outside component to eliminate lag on re-renders
const STATIC_ALL_WORDS_SET = (() => {
  const set = new Set();
  try {
    Object.values(VOCAB_DATABASE).forEach((levelParts) => {
      levelParts.forEach((p) => {
        p.words.forEach((w) => {
          if (w && w.word) set.add(w.word.toLowerCase());
        });
      });
    });
  } catch (e) {}
  return set;
})();

export default function VocabMasterHub({
  theme = 'dark',
  initialSection,
  initialLevel,
  initialPartNum,
  initialTabId,
  initialPartFilter,
  initialDay,
  dateKey,
  onNavigate,
}) {
  const isLight = theme === 'light';

  // Master Entry Experience Mode: 'entry' | 'learn' | 'review' | 'library'
  const [mainMode, setMainMode] = useState(() => {
    if (initialSection || initialPartNum || initialTabId || initialDay || dateKey) {
      return 'library';
    }
    return 'entry';
  });

  const [lastVocabSession, setLastVocabSession] = useUserStorage('last_vocab_session_v1', {
    section: 'study4',
    title: 'Từ Vựng Đề Thi Study4',
    day: 1,
  });

  // Sub-section Tab: 'study4' | 'ielts' | 'part' | 'daily-dictation' | 'notebook'
  const [activeSection, setActiveSection] = useState(initialSection || 'study4');
  const [partFilterState, setPartFilterState] = useState(initialPartFilter || 'all');
  const [dayState, setDayState] = useState(initialDay || null);
  const [ieltsSubViewMode, setIeltsSubViewMode] = useState('33-topics'); // '33-topics' | 'sheet'

  // Daily Dictation Sheet Data
  const [ddTab, setDdTab] = useState(() => {
    if (initialTabId) {
      const found = DAILY_DICTATION_SHEET.tabs.find((t) => t.id === initialTabId);
      if (found) return found;
    }
    return DAILY_DICTATION_SHEET.tabs[0];
  });
  const {
    data: ddData,
    loading: ddLoading,
    error: ddError,
    refresh: ddRefresh,
  } = useGoogleSheet(DAILY_DICTATION_SHEET.baseUrl, ddTab.gid, 1);

  // Study4 Test Vocab Sheet Data
  const [tvTab, setTvTab] = useState(() => {
    if (initialTabId) {
      const found = TEST_VOCAB_SHEET.tabs.find((t) => t.id === initialTabId);
      if (found) return found;
    }
    return TEST_VOCAB_SHEET.tabs[0];
  });
  const {
    data: tvData,
    loading: tvLoading,
    error: tvError,
    refresh: tvRefresh,
  } = useGoogleSheet(TEST_VOCAB_SHEET.baseUrl, tvTab.gid, 2);

  // IELTS Vocab Sheet Data (From User's Google Sheet)
  const [ieltsTab, setIeltsTab] = useState(() => {
    if (initialTabId) {
      const found = IELTS_VOCAB_SHEET.tabs.find((t) => t.id === initialTabId);
      if (found) return found;
    }
    return IELTS_VOCAB_SHEET.tabs[0];
  });
  const {
    data: ieltsData,
    loading: ieltsLoading,
    error: ieltsError,
    refresh: ieltsRefresh,
  } = useGoogleSheet(IELTS_VOCAB_SHEET.baseUrl, ieltsTab.gid, 3);

  React.useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
      setMainMode('library');
    }
    if (initialPartFilter) setPartFilterState(initialPartFilter);
    if (initialDay) setDayState(initialDay);
    if (initialTabId) {
      const foundDd = DAILY_DICTATION_SHEET.tabs.find((t) => t.id === initialTabId);
      if (foundDd) setDdTab(foundDd);
      const foundTv =
        TEST_VOCAB_SHEET.tabs.find((t) => t.id === initialTabId) ||
        (['study4', 'study4-toeic'].includes(initialTabId) ? TEST_VOCAB_SHEET.tabs[0] : null);
      if (foundTv) setTvTab(foundTv);
      const foundIelts = IELTS_VOCAB_SHEET.tabs.find((t) => t.id === initialTabId);
      if (foundIelts) setIeltsTab(foundIelts);
    }
  }, [initialSection, initialTabId, initialPartFilter, initialDay]);

  // Persistence: Mastered/Known Words & Starred Words
  const [knownWordsMap, setKnownWordsMap] = useUserStorage('vocab_mastery_v2', {});
  const [starredWordsMap, setStarredWordsMap] = useUserStorage('vocab_starred_v2', {});
  const [savedVocab, setSavedVocab] = useUserStorage('saved_video_vocab_v1', []);
  const [completedCalendarTasks, setCompletedCalendarTasks] = useUserStorage('calendar_tasks_completed_v1', {});
  const [vocabDayCompleted, setVocabDayCompleted] = useUserStorage('vocab_day_completed_v1', {});

  const speakWord = (text) => {
    speakEnglish(text, { rate: 0.85 });
  };


  // Calculate Overall Vocabulary Statistics lightning-fast
  const stats = useMemo(() => {
    let knownCount = 0;
    if (knownWordsMap) {
      const keys = Object.keys(knownWordsMap);
      for (let i = 0; i < keys.length; i++) {
        if (knownWordsMap[keys[i]]) knownCount++;
      }
    }

    const totalWordsCount =
      (STATIC_ALL_WORDS_SET.size || 500) +
      (Array.isArray(ddData) ? ddData.length : 0) +
      (Array.isArray(ieltsData) ? ieltsData.length : 0);
    const unlearnedCount = Math.max(0, totalWordsCount - knownCount);
    const percent = Math.min(100, Math.round((knownCount / (totalWordsCount || 1)) * 100));

    let starredCount = 0;
    if (starredWordsMap) {
      const sKeys = Object.keys(starredWordsMap);
      for (let i = 0; i < sKeys.length; i++) {
        if (starredWordsMap[sKeys[i]]) starredCount++;
      }
    }

    return {
      total: totalWordsCount,
      known: knownCount,
      unlearned: unlearnedCount,
      percent,
      partCounts: {},
      starredCount,
    };
  }, [knownWordsMap, starredWordsMap, ddData, ieltsData]);

  const activeWordsPool = useMemo(() => {
    if (activeSection === 'study4' && Array.isArray(tvData) && tvData.length > 0) return tvData;
    if (activeSection === 'ielts') {
      if (ieltsSubViewMode === 'sheet' && Array.isArray(ieltsData) && ieltsData.length > 0) {
        return ieltsData;
      }
      return IELTS_ALL_33_TOPICS_WORDS;
    }
    if (activeSection === 'daily-dictation' && Array.isArray(ddData) && ddData.length > 0) return ddData;
    if (activeSection === 'notebook') return savedVocab;
    const list = [];
    try {
      Object.values(VOCAB_DATABASE).forEach((levelParts) => {
        levelParts.forEach((p) => {
          p.words.forEach((w) => {
            if (w && w.word) list.push(w);
          });
        });
      });
    } catch (e) {}
    return list;
  }, [activeSection, tvData, ieltsData, ddData, savedVocab, ieltsSubViewMode]);

  const unlearnedWords = useMemo(() => {
    return activeWordsPool.filter((w) => !knownWordsMap?.[(w.word || '').toLowerCase().trim()]);
  }, [activeWordsPool, knownWordsMap]);

  const deleteSavedWord = (wordToDelete) => {
    setSavedVocab((prev) => prev.filter((w) => w.word !== wordToDelete));
  };

  const SECTIONS = [
    {
      id: 'study4',
      label: 'Từ Vựng Đề Thi Study4',
      icon: 'fa-graduation-cap',
      desc: 'Từ vựng trích lọc trực tiếp khi giải đề thi TOEIC thật',
      badge: 'Thực Chiến Đề Thi',
    },
    {
      id: 'ielts',
      label: 'Từ Vựng IELTS 33 Chủ Đề',
      icon: 'fa-earth-americas',
      desc: '33 Chủ đề IELTS Academic chuyên sâu (4,050 từ) kèm đồng bộ Google Sheet',
      badge: '33 Chủ Đề ✈️',
    },
    {
      id: 'part',
      label: 'Từ Vựng Theo Part (1-7)',
      icon: 'fa-layer-group',
      desc: 'Phân loại theo cấu trúc Part 1-7 & 5 Level điểm số',
      badge: 'Căn Bản',
    },
    {
      id: 'daily-dictation',
      label: 'Từ Vựng Daily Dictation',
      icon: 'fa-headphones',
      desc: 'Luyện nghe phản xạ & từ vựng audio bài nghe',
      badge: 'Bắt Âm',
    },
    {
      id: 'notebook',
      label: `Sổ từ vựng (${savedVocab.length})`,
      icon: 'fa-book-bookmark',
      desc: 'Từ đã lưu khi xem Video & làm bài',
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Return to Calendar Banner if opened from Calendar */}
      {dateKey && onNavigate && (
        <div
          className={`p-3 px-4 rounded-2xl border flex items-center justify-between gap-3 text-xs animate-fadeIn ${
            isLight
              ? 'bg-blue-50/90 border-blue-200 text-blue-900 shadow-xs'
              : 'bg-blue-950/40 border-blue-800 text-blue-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar-check text-blue-500 text-sm shrink-0" />
            <span>
              Đang mở bài học từ vựng theo lịch học ngày <strong>{dateKey}</strong>.
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

      {/* ─── VOCABULARY PROGRESS & MEASUREMENT DASHBOARD BANNER (Soothing & Clean) ─── */}
      <div
        className={`p-6 md:p-7 rounded-xl border transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-xs'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left info */}
          <div className="space-y-2 max-w-xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${
                isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-blue-950/40 border-blue-800/60 text-blue-300'
              }`}
            >
              <i className="fa-solid fa-chart-line text-blue-500" />
              Đo Lường Tiến Độ Học Từ Vựng
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Kho Từ Vựng & Đo Lường Thành Thạo
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
              Theo dõi chính xác số từ đã thuộc, số từ chưa thuộc cần ôn tập, luyện phản xạ qua Flashcard và bài tập tương tác.
            </p>
          </div>

          {/* Right: Key Metric Cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div
              className={`p-3.5 rounded-xl border text-center ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900'
                  : 'bg-slate-800/60 border-slate-700 text-white'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
                Đã Thuộc
              </span>
              <span className="text-xl md:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {stats.known}
              </span>
              <span className="text-[10px] text-slate-400 block">từ vựng</span>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-center ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900'
                  : 'bg-slate-800/60 border-slate-700 text-white'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
                Chưa Học
              </span>
              <span className="text-xl md:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
                {stats.unlearned}
              </span>
              <span className="text-[10px] text-slate-400 block">cần ôn</span>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-center ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900'
                  : 'bg-slate-800/60 border-slate-700 text-white'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
                Tiến Độ
              </span>
              <span className="text-xl md:text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                {stats.percent}%
              </span>
              <span className="text-[10px] text-slate-400 block">hoàn thành</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            <span>Tiến độ ghi nhớ toàn bộ kho từ vựng ({stats.known} / {stats.total} từ)</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{stats.percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${Math.max(4, stats.percent)}%` }}
            />
          </div>
        </div>
      </div>

        {/* Offline Stale Cache Warning if fetch had error */}
        {(ddError || tvError || ieltsError) && (
          <div
            className={`mt-4 p-3.5 px-4 rounded-xl border flex items-center justify-between gap-3 text-xs ${
              isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/40 border-amber-800 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-cloud-arrow-down text-amber-500 text-sm shrink-0" />
              <span>
                Không thể đồng bộ dữ liệu mới nhất từ Google Sheets. Hệ thống đang bảo toàn dữ liệu ngoại tuyến để bạn tiếp tục học mà không mất tiến độ.
              </span>
            </div>
            <button
              onClick={() => {
                if (ddRefresh) ddRefresh();
                if (tvRefresh) tvRefresh();
                if (ieltsRefresh) ieltsRefresh();
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] shrink-0 transition cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}

      {/* ─── VOCABULARY LEARNING WORKFLOW MODES (MASTER PROMPT V2.1) ─── */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMainMode('entry')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              mainMode === 'entry'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <i className="fa-solid fa-compass" />
            <span>Mục Tiêu & Lộ Trình</span>
          </button>

          <button
            onClick={() => setMainMode('learn')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              mainMode === 'learn'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <i className="fa-solid fa-graduation-cap" />
            <span>Học Từ Mới ({unlearnedWords.length})</span>
          </button>

          <button
            onClick={() => setMainMode('review')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              mainMode === 'review'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <i className="fa-solid fa-repeat" />
            <span>Ôn Tập Đến Hạn</span>
          </button>

          <button
            onClick={() => setMainMode('library')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              mainMode === 'library'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <i className="fa-solid fa-book-open" />
            <span>Thư Viện Từ Vựng</span>
          </button>
        </div>

        {mainMode !== 'library' && (
          <button
            onClick={() => setMainMode('library')}
            className="text-xs text-blue-600 dark:text-blue-400 font-bold px-3 py-1.5 hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>Mở kho từ</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>
        )}
      </div>

      {/* ─── 1. ENTRY EXPERIENCE (LANDING ACTIONS) ─── */}
      {mainMode === 'entry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Học Từ Mới */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:border-emerald-300'
                : 'bg-slate-900 border-slate-800 shadow-md hover:border-emerald-700/60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                  <i className="fa-solid fa-bolt" />
                  Tiếp Thu Từ Mới
                </span>
                <span className="font-mono text-xs font-bold text-slate-400">
                  {unlearnedWords.length} từ chờ học
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                1. Học Từ Mới (Learn New Words)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Nạp từ vựng có hướng dẫn chuẩn: Từ vựng &rarr; Phát âm bản ngữ &rarr; Từ loại &rarr; Nghĩa tiếng Việt &rarr; Câu ví dụ ngữ cảnh &rarr; Flashcard 3D kiểm tra phản xạ tức thì.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => {
                  setLastVocabSession({
                    section: activeSection,
                    title: SECTIONS.find((s) => s.id === activeSection)?.label || 'Đề Thi Study4',
                    day: 1,
                  });
                  setMainMode('learn');
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-play" />
                <span>Bắt Đầu Học Ngay ({unlearnedWords.length > 0 ? unlearnedWords.length : stats.unlearned} từ)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Ôn Tập Đến Hạn */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:border-purple-300'
                : 'bg-slate-900 border-slate-800 shadow-md hover:border-purple-700/60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-wider">
                  <i className="fa-solid fa-brain" />
                  Spaced Repetition
                </span>
                <span className="font-mono text-xs font-bold text-slate-400">
                  {stats.unlearned} từ cần ôn
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                2. Ôn Tập Đến Hạn (Review Words)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Áp dụng nguyên lý ngắt quãng Leitner 4 cấp độ ghi nhớ. Hệ thống tự động đẩy từ vựng hay quên vào vòng lặp ôn tập cho đến khi đạt mức thành thạo vĩnh viễn.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setMainMode('review')}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-repeat" />
                <span>Vào Ôn Tập Ngay (Leitner Review)</span>
              </button>
            </div>
          </div>

          {/* Card 3: Tiếp Tục Học Dở */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
                : 'bg-slate-900 border-slate-800 shadow-md hover:border-blue-700/60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
                  <i className="fa-solid fa-clock-rotate-left" />
                  Gần Đây Nhất
                </span>
                <span className="font-mono text-xs font-bold text-slate-400">Đã lưu phiên</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                3. Tiếp Tục Phiên Trước (Continue)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Đang dừng ở kho từ: <strong>{lastVocabSession?.title || 'Từ Vựng Đề Thi Study4'}</strong>. Tiếp tục phiên học mà không cần tìm lại bài.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => {
                  if (lastVocabSession?.section) setActiveSection(lastVocabSession.section);
                  setMainMode('library');
                }}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-forward-step" />
                <span>Tiếp Tục Bài Trước: {lastVocabSession?.title || 'Đề Study4'}</span>
              </button>
            </div>
          </div>

          {/* Card 4: Thư Viện Từ Vựng */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-sm hover:border-indigo-300'
                : 'bg-slate-900 border-slate-800 shadow-md hover:border-indigo-700/60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider">
                  <i className="fa-solid fa-layer-group" />
                  5 Kho Dữ Liệu
                </span>
                <span className="font-mono text-xs font-bold text-slate-400">
                  {stats.total} từ vựng
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                4. Thư Viện Từ Vựng (Library)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tra cứu, tìm kiếm và lọc danh sách từ vựng theo cấu trúc Đề thi TOEIC thật, Từ vựng IELTS Du học, Phân loại theo Part 1-7, Daily Dictation và Sổ tay cá nhân.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setMainMode('library')}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-book-open" />
                <span>Mở Thư Viện Tra Cứu Toàn Diện</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 2. LEARN NEW WORDS MODE ─── */}
      {mainMode === 'learn' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setMainMode('entry')}
              className="font-bold text-slate-600 dark:text-slate-300 hover:text-blue-500 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left" />
              <span>Quay lại Mục tiêu học</span>
            </button>
            <div className="flex items-center gap-2 text-slate-400">
              <span>Đang học từ mới từ: <strong>{SECTIONS.find((s) => s.id === activeSection)?.label}</strong></span>
              <button
                onClick={() => setMainMode('library')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-2 cursor-pointer"
              >
                Đổi kho từ
              </button>
            </div>
          </div>

          <VocabStudyStudio
            words={unlearnedWords.length > 0 ? unlearnedWords : activeWordsPool}
            theme={theme}
            initialMode="flashcard"
            deckBadge="HỌC TỪ MỚI"
            emptyTitle="Bạn đã hoàn thành các từ mới của phần này!"
            emptyDesc="Hãy bấm vào Ôn Tập Đến Hạn để làm bài tập củng cố, hoặc mở Thư Viện để chọn phần tiếp theo."
          />
        </div>
      )}

      {/* ─── 3. REVIEW WORDS MODE ─── */}
      {mainMode === 'review' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setMainMode('entry')}
              className="font-bold text-slate-600 dark:text-slate-300 hover:text-blue-500 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left" />
              <span>Quay lại Mục tiêu học</span>
            </button>
            <div className="flex items-center gap-2 text-slate-400">
              <span>Ôn tập ngắt quãng Spaced Repetition (4 cấp độ Leitner)</span>
            </div>
          </div>

          <VocabStudyStudio
            words={activeWordsPool}
            theme={theme}
            initialMode="flashcard"
            initialLevelFilter="need_review"
            deckBadge="ÔN TẬP ĐẾN HẠN"
            emptyTitle="Chưa có từ nào đến hạn ôn tập!"
            emptyDesc="Bạn đã nắm vững các từ trong phần này. Hãy học thêm từ mới hoặc chọn danh mục khác."
          />
        </div>
      )}

      {/* ─── 4. VOCABULARY LIBRARY (PRESERVES 100% EXISTING WORD LIST & SECTIONS) ─── */}
      {mainMode === 'library' && (
        <div className="space-y-6">
          {/* Sub-section Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {SECTIONS.map((sec) => {
              const active = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    setLastVocabSession({
                      section: sec.id,
                      title: sec.label,
                      day: 1,
                    });
                  }}
                  className={`flex flex-col text-left p-3.5 md:p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    active
                      ? isLight
                        ? 'bg-blue-50/90 border-blue-400 text-blue-950 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-blue-950/40 border-blue-600 text-blue-100 shadow-sm ring-1 ring-blue-500/30'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <i className={`fa-solid ${sec.icon} text-sm ${active ? (isLight ? 'text-blue-600' : 'text-blue-400') : 'text-blue-500'}`} />
                    <span className="font-extrabold text-xs md:text-sm truncate">{sec.label}</span>
                  </div>
                  <span className={`text-[11px] leading-tight truncate ${active ? (isLight ? 'text-blue-700' : 'text-blue-300') : 'text-slate-400'}`}>
                    {sec.desc}
                  </span>
                </button>
              );
            })}
          </div>


          {/* Active Section Sub-View */}
          <div>
            {activeSection === 'ielts' && (
              <div className="space-y-4">
                {/* IELTS Sub-mode Switcher */}
                <div className="flex items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto scrollbar-hide">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIeltsSubViewMode('33-topics')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                        ieltsSubViewMode === '33-topics'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <i className="fa-solid fa-layer-group" />
                      <span>33 Chủ Đề Thực Chiến (4,050 từ)</span>
                    </button>

                    <button
                      onClick={() => setIeltsSubViewMode('sheet')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                        ieltsSubViewMode === 'sheet'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <i className="fa-solid fa-table" />
                      <span>Google Sheet Đồng Bộ ({ieltsData?.length || 0} từ)</span>
                    </button>
                  </div>
                </div>

                {ieltsSubViewMode === '33-topics' ? (
                  <IELTS33TopicsStudio
                    theme={theme}
                    knownWordsMap={knownWordsMap}
                    setKnownWordsMap={setKnownWordsMap}
                    starredWordsMap={starredWordsMap}
                    setStarredWordsMap={setStarredWordsMap}
                  />
                ) : (
                  <VocabFromSheet
                    data={ieltsData}
                    loading={ieltsLoading}
                    error={ieltsError}
                    onRefresh={ieltsRefresh}
                    tabs={IELTS_VOCAB_SHEET.tabs}
                    activeTab={ieltsTab}
                    onTabChange={setIeltsTab}
                    initialPartFilter={partFilterState}
                    targetDay={dayState}
                    title="Từ Vựng IELTS (Google Sheet)"
                    icon={<i className="fa-solid fa-earth-americas text-amber-500" />}
                    theme={theme}
                    knownWordsMap={knownWordsMap}
                    setKnownWordsMap={setKnownWordsMap}
                  />
                )}
              </div>
            )}

            {activeSection === 'part' && (
              <VocabByPart
                theme={theme}
                initialLevelId={initialLevel}
                initialPartNum={initialPartNum}
                knownWordsMap={knownWordsMap}
                setKnownWordsMap={setKnownWordsMap}
                starredWordsMap={starredWordsMap}
                setStarredWordsMap={setStarredWordsMap}
              />
            )}

            {activeSection === 'daily-dictation' && (
              <VocabFromSheet
                data={ddData}
                loading={ddLoading}
                error={ddError}
                onRefresh={ddRefresh}
                tabs={DAILY_DICTATION_SHEET.tabs}
                activeTab={ddTab}
                onTabChange={setDdTab}
                initialPartFilter={partFilterState}
                targetDay={dayState}
                title="Daily Dictation"
                icon={<i className="fa-solid fa-headphones text-indigo-500" />}
                theme={theme}
                knownWordsMap={knownWordsMap}
                setKnownWordsMap={setKnownWordsMap}
              />
            )}

            {activeSection === 'study4' && (
              <VocabFromSheet
                data={tvData}
                loading={tvLoading}
                error={tvError}
                onRefresh={tvRefresh}
                tabs={TEST_VOCAB_SHEET.tabs}
                activeTab={tvTab}
                onTabChange={setTvTab}
                initialPartFilter={partFilterState}
                targetDay={dayState}
                title="Từ Vựng Đề Thi Study4"
                icon={<i className="fa-solid fa-graduation-cap text-rose-500" />}
                theme={theme}
                knownWordsMap={knownWordsMap}
                setKnownWordsMap={setKnownWordsMap}
              />
            )}

            {activeSection === 'notebook' && (
              <NotebookVocabStudio
                theme={theme}
                dateKey={dateKey}
                dayState={dayState}
                onNavigate={onNavigate}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
