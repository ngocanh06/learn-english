import React, { useState, useMemo, useEffect } from 'react';
import VocabByPart from './VocabByPart';
import VocabFromSheet from './VocabFromSheet';
import NotebookVocabStudio from './NotebookVocabStudio';
import { DAILY_DICTATION_SHEET, TEST_VOCAB_SHEET, IELTS_VOCAB_SHEET } from '../config/sheets';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { useUserStorage } from '../hooks/useUserStorage';
import { VOCAB_DATABASE } from '../data/vocabularyByLevelAndPart';

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

  // Sub-section Tab: 'study4' | 'ielts' | 'part' | 'daily-dictation' | 'notebook'
  const [activeSection, setActiveSection] = useState(initialSection || 'study4');
  const [partFilterState, setPartFilterState] = useState(initialPartFilter || 'all');
  const [dayState, setDayState] = useState(initialDay || null);

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
    if (initialSection) setActiveSection(initialSection);
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

  const deleteSavedWord = (wordToDelete) => {
    setSavedVocab((prev) => prev.filter((w) => w.word !== wordToDelete));
  };

  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
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
      label: 'Từ Vựng IELTS (Google Sheet)',
      icon: 'fa-earth-americas',
      desc: `Từ vựng học thuật IELTS trực tiếp từ Google Sheet (${ieltsData?.length || 0} từ)`,
      badge: 'IELTS Du Học',
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
        className={`p-6 md:p-8 rounded-3xl border transition-all ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left info */}
          <div className="space-y-2 max-w-xl">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                isLight
                  ? 'bg-blue-50 border-blue-200/80 text-blue-700'
                  : 'bg-blue-950/40 border-blue-800/60 text-blue-300'
              }`}
            >
              <i className="fa-solid fa-chart-line text-blue-500" />
              Đo Lường Tiến Độ Học Từ Vựng
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Kho Từ Vựng & Đo Lường Thành Thạo
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
              Theo dõi chính xác số từ đã thuộc, số từ chưa thuộc cần ôn tập, luyện phản xạ qua Flashcard và bài tập tương tác.
            </p>
          </div>

          {/* Right: Key Metric Cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight
                  ? 'bg-emerald-50/60 border-emerald-200/80 text-slate-900'
                  : 'bg-emerald-950/30 border-emerald-800/60 text-white'
              }`}
            >
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
                Đã Thuộc
              </span>
              <span className="text-xl md:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300">
                {stats.known}
              </span>
              <span className="text-[10px] text-slate-400 block">từ vựng</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight
                  ? 'bg-amber-50/60 border-amber-200/80 text-slate-900'
                  : 'bg-amber-950/30 border-amber-800/60 text-white'
              }`}
            >
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block uppercase">
                Chưa Học
              </span>
              <span className="text-xl md:text-2xl font-black font-mono text-amber-700 dark:text-amber-300">
                {stats.unlearned}
              </span>
              <span className="text-[10px] text-slate-400 block">cần ôn</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight
                  ? 'bg-blue-50/60 border-blue-200/80 text-slate-900'
                  : 'bg-blue-950/30 border-blue-800/60 text-white'
              }`}
            >
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block uppercase">
                Tiến Độ
              </span>
              <span className="text-xl md:text-2xl font-black font-mono text-blue-700 dark:text-blue-300">
                {stats.percent}%
              </span>
              <span className="text-[10px] text-slate-400 block">hoàn thành</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            <span>Tiến độ ghi nhớ toàn bộ kho từ vựng ({stats.known} / {stats.total} từ)</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-extrabold">{stats.percent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500 shadow-sm"
              style={{ width: `${Math.max(4, stats.percent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 4 MAIN SUB-SECTION TABS ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {SECTIONS.map((sec) => {
          const active = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex flex-col text-left p-3.5 md:p-4 rounded-2xl border transition-all duration-200 ${
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

      {/* ─── SMART ALTERNATING FAST-TRACK HELPER (Học Xen Kẽ Tăng Tốc) ─── */}
      <div
        className={`p-5 rounded-3xl border transition-all ${
          isLight
            ? 'bg-gradient-to-r from-rose-50/50 via-blue-50/40 to-indigo-50/30 border-blue-200/80 text-slate-900'
            : 'bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border-rose-900/40 text-white'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-wider">
              <i className="fa-solid fa-graduation-cap" />
              Lộ Trình Từ Vựng: Tuyến Cố Định & Tuyến Xen Kẽ
            </div>
            <h3 className="text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Đề Thi Study4 (Cố định hàng ngày) ⮂ Xen kẽ: TOEIC Theo Part ⮂ Daily Dictation ⮂ Sổ Từ Vựng</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Phân bổ chuẩn:</strong> <em>Từ vựng Đề thi Study4</em> là tuyến học cố định mỗi ngày bám sát 100% đề thi TOEIC thật (Task 2). Còn <em>Từ vựng xen kẽ</em> (Task 5) luân phiên mỗi ngày giữa <strong>Từ vựng theo Part</strong>, <strong>Từ vựng Daily Dictation</strong> và <strong>Sổ từ vựng cá nhân đã lưu</strong>.
            </p>
          </div>

          {/* Quick Switch Action Buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveSection('study4')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border shadow-xs ${
                activeSection === 'study4'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-rose-500/20'
                  : isLight
                  ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border-slate-700'
              }`}
            >
              <i className="fa-solid fa-graduation-cap" />
              <span>Đề Study4</span>
            </button>

            <button
              onClick={() => setActiveSection('ielts')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border shadow-xs ${
                activeSection === 'ielts'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-amber-500/20'
                  : isLight
                  ? 'bg-white hover:bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
              }`}
            >
              <i className="fa-solid fa-earth-americas" />
              <span>Từ Vựng IELTS ({ieltsData?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveSection('part')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border shadow-xs ${
                activeSection === 'part'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/20'
                  : isLight
                  ? 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-slate-700'
              }`}
            >
              <i className="fa-solid fa-layer-group" />
              <span>Theo Part</span>
            </button>

            <button
              onClick={() => setActiveSection('daily-dictation')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border shadow-xs ${
                activeSection === 'daily-dictation'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20'
                  : isLight
                  ? 'bg-white hover:bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-blue-300 border-slate-700'
              }`}
            >
              <i className="fa-solid fa-headphones" />
              <span>Daily Dictation</span>
            </button>

            <button
              onClick={() => setActiveSection('notebook')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border shadow-xs ${
                activeSection === 'notebook'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-amber-500/20'
                  : isLight
                  ? 'bg-white hover:bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
              }`}
            >
              <i className="fa-solid fa-book-bookmark" />
              <span>Sổ Từ Vựng ({savedVocab.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── ACTIVE SECTION RENDER ─── */}
      <div>
        {activeSection === 'ielts' && (
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
  );
}
