import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { READING_LEVELS, READING_DATABASE } from '../data/readingData';
import { READING_TRANSLATIONS } from '../data/readingTranslations';
import { useUserStorage } from '../hooks/useUserStorage';
import WordLookupModal from './WordLookupModal';
import { getDisplayIpa, healSavedVocabList } from '../services/ipaService';

export default function ReadingHub({
  initialLevel,
  initialTestId,
  dateKey,
  onNavigate,
  theme = 'dark',
}) {
  const isLight = theme === 'light';

  // Persistence: Completed reading tests & Calendar tasks
  const [completedReading, setCompletedReading] = useUserStorage('reading_completed_tests_v2', {});
  const [calendarCompletedTasks, setCalendarCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});

  // Vocabulary Notebook persistence (synchronized with VocabMasterHub Sổ từ vựng)
  const [savedVocab, setSavedVocab] = useUserStorage('saved_video_vocab_v1', []);
  const [starredWordsMap, setStarredWordsMap] = useUserStorage('vocab_starred_v2', {});
  const [lookupWord, setLookupWord] = useState(null);

  // Auto-heal legacy saved words (including non-standard IPA transcriptions)
  useEffect(() => {
    if (Array.isArray(savedVocab) && savedVocab.length > 0) {
      healSavedVocabList(savedVocab, setSavedVocab);
    }
  }, []);

  // Split-View & Layout states (IELTS Computer-based Studio layout)
  const [readingLayoutMode, setReadingLayoutMode] = useUserStorage('reading_layout_mode_v2', 'split'); // 'split' | 'stacked'
  const [readingFontSize, setReadingFontSize] = useState('base'); // 'sm' | 'base' | 'lg'
  const [leftTab, setLeftTab] = useState('passage'); // 'passage' | 'translation' | 'vocab'
  const [showBilingual, setShowBilingual] = useUserStorage('reading_show_bilingual_v1', false);
  const [copiedTranslation, setCopiedTranslation] = useState(false);
  const [showMobilePassage, setShowMobilePassage] = useState(false);

  const fontClass = useMemo(() => {
    switch (readingFontSize) {
      case 'sm':
        return 'text-xs md:text-sm leading-relaxed';
      case 'lg':
        return 'text-base md:text-lg leading-loose';
      default:
        return 'text-sm md:text-base leading-relaxed';
    }
  }, [readingFontSize]);

  // Selected Level & Active Test
  const [selectedLevelId, setSelectedLevelId] = useState(initialLevel || 'A1');
  const [activeTestId, setActiveTestId] = useState(initialTestId || null);

  useEffect(() => {
    if (initialLevel) setSelectedLevelId(initialLevel);
    if (initialTestId) setActiveTestId(initialTestId);
  }, [initialLevel, initialTestId]);

  // Persistence: User answers and submitted state per test (Identical to Grammar & Writing)
  const [readingQuizAnswers, setReadingQuizAnswers] = useUserStorage('reading_quiz_answers_v1', {});
  const [readingQuizSubmitted, setReadingQuizSubmitted] = useUserStorage('reading_quiz_submitted_v1', {});

  // Current active test answers & submission state
  const currentTestAnswers = useMemo(() => {
    return (activeTestId && readingQuizAnswers[activeTestId]) || {};
  }, [activeTestId, readingQuizAnswers]);

  const isCurrentTestSubmitted = useMemo(() => {
    return Boolean(activeTestId && readingQuizSubmitted[activeTestId]);
  }, [activeTestId, readingQuizSubmitted]);

  const testsInLevel = useMemo(() => {
    return READING_DATABASE[selectedLevelId] || [];
  }, [selectedLevelId]);

  const activeTest = useMemo(() => {
    if (!activeTestId) return null;
    // Search in current level first
    const inCurrent = testsInLevel.find((t) => t.id === activeTestId);
    if (inCurrent) return inCurrent;
    // Search across all CEFR levels
    for (const lvl of Object.keys(READING_DATABASE)) {
      const found = READING_DATABASE[lvl].find((t) => t.id === activeTestId);
      if (found) {
        setSelectedLevelId(lvl);
        return found;
      }
    }
    return null;
  }, [activeTestId, testsInLevel]);

  // Current Active Test Translation & Paragraphs
  const currentTranslation = useMemo(() => {
    if (!activeTestId) return null;
    return READING_TRANSLATIONS[activeTestId] || null;
  }, [activeTestId]);

  const passageParagraphs = useMemo(() => {
    if (!activeTest?.passage) return [];
    return activeTest.passage.split('\n\n');
  }, [activeTest?.passage]);

  const handleCopyTranslation = useCallback(() => {
    if (!currentTranslation?.passageVi) return;
    navigator.clipboard?.writeText(currentTranslation.passageVi);
    setCopiedTranslation(true);
    setTimeout(() => setCopiedTranslation(false), 2000);
  }, [currentTranslation?.passageVi]);

  // Audio Speech helper
  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const handleSelectTest = (test) => {
    setActiveTestId(test.id);
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (!activeTestId) return;
    setReadingQuizAnswers((prev) => ({
      ...prev,
      [activeTestId]: {
        ...(prev[activeTestId] || {}),
        [qIdx]: optIdx,
      },
    }));
  };

  const toggleComplete = (testId) => {
    const qList = activeTest?.questions || [];
    const totalQ = qList.length;
    const currentTestAnswers = (activeTestId && readingQuizAnswers[activeTestId]) || {};
    const answeredCount = qList.filter((_, idx) => currentTestAnswers[idx] !== undefined).length;
    const isSubmitted = Boolean(activeTestId && readingQuizSubmitted[activeTestId]);

    if (!completedReading[testId] && (!isSubmitted || (totalQ > 0 && answeredCount < totalQ))) {
      alert(`⚠️ Bạn cần trả lời và nộp đầy đủ tất cả ${totalQ} câu hỏi đọc hiểu của bài này trước khi đánh dấu hoàn thành (hiện tại mới trả lời ${answeredCount}/${totalQ} câu).`);
      return;
    }

    const nextVal = !completedReading[testId];
    setCompletedReading((prev) => ({
      ...prev,
      [testId]: nextVal,
    }));
    const now = new Date();
    const todayDateKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const targetDate = dateKey || todayDateKey;
    setCalendarCompletedTasks((prev) => ({
      ...prev,
      [`${targetDate}_reading`]: nextVal,
    }));
  };

  const handleToggleSubmitAnswers = () => {
    if (!activeTestId) return;

    const qList = activeTest?.questions || [];
    const totalQ = qList.length;
    const currentTestAnswers = (activeTestId && readingQuizAnswers[activeTestId]) || {};
    const answeredCount = qList.filter((_, idx) => currentTestAnswers[idx] !== undefined).length;

    // Strict constraint: Must answer ALL questions before submitting!
    if (!isCurrentTestSubmitted && totalQ > 0 && answeredCount < totalQ) {
      alert(`⚠️ Bạn cần trả lời đầy đủ tất cả ${totalQ} câu hỏi trong bài đọc trước khi nộp bài và kiểm tra đáp án (hiện tại mới trả lời ${answeredCount}/${totalQ} câu).`);
      return;
    }

    const nextSubmitted = !isCurrentTestSubmitted;
    setReadingQuizSubmitted((prev) => ({
      ...prev,
      [activeTestId]: nextSubmitted,
    }));

    if (nextSubmitted) {
      // Auto-mark reading test as completed!
      setCompletedReading((prev) => ({
        ...prev,
        [activeTestId]: true,
      }));
      // Auto-mark calendar task as completed!
      const now = new Date();
      const todayDateKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      const targetDate = dateKey || todayDateKey;
      setCalendarCompletedTasks((prev) => ({
        ...prev,
        [`${targetDate}_reading`]: true,
      }));
    }
  };

  const handleResetQuiz = () => {
    if (!activeTestId) return;
    setReadingQuizAnswers((prev) => {
      const updated = { ...prev };
      delete updated[activeTestId];
      return updated;
    });
    setReadingQuizSubmitted((prev) => ({
      ...prev,
      [activeTestId]: false,
    }));
  };

  const isWordSaved = useCallback(
    (w) => {
      const clean = (w || '').toLowerCase().trim();
      if (!clean) return false;
      return savedVocab.some((v) => (v.word || '').toLowerCase() === clean) || !!starredWordsMap[clean];
    },
    [savedVocab, starredWordsMap]
  );

  const toggleSaveWord = useCallback(
    (vocabItem) => {
      const clean = (vocabItem.word || '').toLowerCase().trim();
      if (!clean) return;
      const alreadySaved = isWordSaved(clean);
      if (alreadySaved) {
        setSavedVocab((prev) => prev.filter((v) => (v.word || '').toLowerCase() !== clean));
        setStarredWordsMap((prev) => ({ ...prev, [clean]: false }));
      } else {
        const newEntry = {
          word: clean,
          ipa: getDisplayIpa(clean, vocabItem.pron || vocabItem.ipa),
          pos: 'Reading',
          meaning: vocabItem.meaning || `Từ vựng trong bài đọc ${activeTest?.title || ''}`,
          savedAt: new Date().toISOString(),
        };
        setSavedVocab((prev) => [newEntry, ...prev.filter((v) => (v.word || '').toLowerCase() !== clean)]);
        setStarredWordsMap((prev) => ({ ...prev, [clean]: true }));
      }
    },
    [isWordSaved, setSavedVocab, setStarredWordsMap, activeTest]
  );

  const handlePassageMouseUp = useCallback(() => {
    // Delay slightly to ensure browser selection has stabilized
    setTimeout(() => {
      try {
        const raw = window.getSelection()?.toString() || '';
        if (!raw || !raw.trim()) return;
        // Strip leading and trailing non-alphanumeric characters (quotes, dots, commas, parens, hyphens)
        const clean = raw.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim();
        // Allow single words or phrases (2 to 80 characters, up to 8 words)
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

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ─── BANNER (Clean, Elegant & Soothing) ───────────────────── */}
      <div
        className={`p-6 md:p-8 rounded-3xl border transition-all ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-blue-950/40 border-blue-800/60 text-blue-300'
              }`}
            >
              <i className="fa-solid fa-book-open-reader text-blue-500" />
              Luyện Đọc Hiểu Chuẩn CEFR (A1 ➔ C1)
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Phòng Luyện Đọc Hiểu (Reading Comprehension)
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
              Hệ thống bài đọc hiểu phong phú theo chuẩn quốc tế từ Sơ cấp (A1) đến Nâng cao (C1). Đi kèm từ vựng bôi đậm, phiên âm IPA, phát âm âm thanh và bài tập trắc nghiệm giải thích chi tiết.
            </p>
          </div>

          {/* Quick Access to Sổ từ vựng */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('vocabulary', { section: 'notebook' })}
              className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2 font-bold text-xs transition cursor-pointer shadow-xs ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 text-amber-900'
                  : 'bg-amber-950/40 hover:bg-amber-950/70 border-amber-700/50 text-amber-300'
              }`}
              title="Mở Sổ từ vựng cá nhân (Xem tất cả từ đã lưu)"
            >
              <i className="fa-solid fa-book-bookmark text-amber-500 text-sm" />
              <span>Sổ Từ Vựng ({savedVocab.length})</span>
              <i className="fa-solid fa-arrow-right text-[10px] opacity-70" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── CEFR LEVEL SELECTOR (A1 -> C1) ──────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {READING_LEVELS.map((lvl) => {
          const active = selectedLevelId === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedLevelId(lvl.id);
                setActiveTestId(null);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                active
                  ? isLight
                    ? 'bg-blue-50/80 border-blue-300 text-blue-950 shadow-sm ring-2 ring-blue-400/20'
                    : 'bg-blue-950/40 border-blue-700 text-blue-100 shadow-sm ring-1 ring-blue-500/30'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    active
                      ? isLight ? 'bg-blue-200/80 text-blue-800' : 'bg-blue-500/30 text-blue-200'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {lvl.id}
                </span>
                <i className={`fa-solid ${lvl.icon} text-xs text-blue-500`} />
              </div>
              <h4 className="font-extrabold text-xs leading-tight">{lvl.name}</h4>
              <p className={`text-[10px] mt-1 line-clamp-1 ${active ? (isLight ? 'text-blue-700' : 'text-blue-300') : 'text-slate-500 dark:text-slate-400'}`}>
                {lvl.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* ─── MAIN CONTENT: TEST LIST OR ACTIVE EXAM STUDIO ───────── */}
      {!activeTest ? (
        <div className="space-y-4">
          {/* Return to Calendar Banner */}
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
                  Đang mở bài đọc theo lịch học ngày <strong>{dateKey}</strong>.
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

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-list text-blue-500" />
              Danh Sách Bài Đọc Cấp Độ {selectedLevelId} ({testsInLevel.length} bài)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testsInLevel.map((t) => {
              const isDone = !!completedReading[t.id];
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTest(t)}
                  className={`rounded-3xl border overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:shadow-lg ${
                    isDone
                      ? isLight ? 'bg-emerald-50/40 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800/40'
                      : isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div>
                    {/* Featured Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                      <img
                        src={t.img}
                        alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          e.target.src = 'https://test-english.com/staging11/wp-content/uploads/Guess-who_A1-Reading-test.webp';
                        }}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase shadow-sm">
                        Level {t.level}
                      </span>
                      {isDone && (
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                          <i className="fa-solid fa-check" /> Đã xong
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1"><i className="fa-regular fa-clock text-[10px]" /> {t.duration}</span>
                        <span>•</span>
                        <span>{t.questions.length} câu hỏi trắc nghiệm</span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition">
                        {t.title}
                      </h4>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {t.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
                      Làm Bài Đọc Này ➔
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ─── ACTIVE READING TEST WORKSPACE ──────────────────────── */
        <div
          className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
            isLight ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <button
                  onClick={() => setActiveTestId(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left" />
                  <span>Quay lại danh sách bài đọc</span>
                </button>

                {onNavigate && (
                  <button
                    onClick={() =>
                      onNavigate('ai-coach', {
                        dateKey,
                        tab: 'calendar-view',
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      isLight
                        ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 shadow-xs'
                        : 'bg-blue-950/50 hover:bg-blue-900/60 border-blue-800 text-blue-300'
                    }`}
                  >
                    <i className="fa-solid fa-calendar-days text-blue-500" />
                    <span>Quay lại Lịch học {dateKey ? `ngày ${dateKey}` : ''}</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  Level {activeTest.level} Reading
                </span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1"><i className="fa-regular fa-clock text-[11px]" /> {activeTest.duration}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black mt-1">{activeTest.title}</h2>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Layout Mode Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setReadingLayoutMode('split')}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    readingLayoutMode === 'split'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-500'
                  }`}
                  title="Chế độ Song Song (Chuẩn thi máy: Bài đọc bên trái, Câu hỏi bên phải)"
                >
                  <i className="fa-solid fa-table-columns text-xs" />
                  <span className="hidden sm:inline">Song song (Split)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReadingLayoutMode('stacked')}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    readingLayoutMode === 'stacked'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-500'
                  }`}
                  title="Chế độ Xếp Dọc (Bài đọc ở trên, Câu hỏi ở dưới)"
                >
                  <i className="fa-solid fa-bars text-xs" />
                  <span className="hidden sm:inline">Xếp dọc (Stacked)</span>
                </button>
              </div>

              <a
                href="#/vocabulary?section=notebook"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition shadow-xs cursor-pointer ${
                  isLight
                    ? 'bg-amber-50/80 border-amber-300 text-amber-900 hover:bg-amber-100'
                    : 'bg-amber-950/30 border-amber-800 text-amber-300 hover:bg-amber-900/40'
                }`}
                title="Mở Sổ tay từ vựng của bạn để ôn tập"
              >
                <i className="fa-solid fa-book-bookmark text-amber-500" />
                <span>Sổ từ vựng ({savedVocab.length})</span>
              </a>

              <button
                onClick={() => toggleComplete(activeTest.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold border transition shrink-0 cursor-pointer ${
                  completedReading[activeTest.id]
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500'
                }`}
              >
                <i className={`fa-solid ${completedReading[activeTest.id] ? 'fa-circle-check' : 'fa-check'}`} />
                <span>{completedReading[activeTest.id] ? '✓ Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
              </button>
            </div>
          </div>

          {/* Auto-completion Status Banner */}
          {completedReading[activeTest.id] && (
            <div className="p-3.5 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between gap-3 text-xs text-emerald-700 dark:text-emerald-300 animate-fadeIn">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-500 text-sm shrink-0" />
                <span className="font-extrabold">
                  🎉 Tuyệt vời! Bạn đã hoàn thành bài đọc này. Hệ thống đã tự động lưu & đồng bộ hoàn tất nhiệm vụ Luyện Đọc trên Lịch Học!
                </span>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* ─── READING STUDIO LAYOUT: SPLIT-VIEW OR STACKED VIEW ──── */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {(() => {
            const qList = activeTest.questions || [];
            const totalQ = qList.length;
            const answeredQ = qList.filter((_, idx) => currentTestAnswers[idx] !== undefined).length;
            const correctQ = qList.filter((q, idx) => currentTestAnswers[idx] === q.answer).length;
            const scorePct = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;

            // Render Passage & Vocab Column
            const renderPassageSection = (isSplit) => (
              <div className="space-y-3">
                {/* Passage Toolbar */}
                <div
                  className={`p-3 px-4 rounded-2xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setLeftTab('passage');
                        setShowBilingual(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        leftTab === 'passage' && !showBilingual
                          ? 'bg-blue-600 text-white shadow-xs'
                          : isLight
                          ? 'text-slate-600 hover:bg-slate-200/70'
                          : 'text-slate-400 hover:bg-slate-800'
                      }`}
                      title="Xem bài đọc tiếng Anh"
                    >
                      <i className="fa-solid fa-book-open text-xs" />
                      <span>Bài đọc (Passage)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLeftTab('passage');
                        setShowBilingual(true);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                        leftTab === 'passage' && showBilingual
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : isLight
                          ? 'text-teal-700 bg-teal-50 hover:bg-teal-100 border-teal-200'
                          : 'text-teal-400 bg-teal-950/40 hover:bg-teal-900/60 border-teal-800'
                      }`}
                      title="Xem bài đọc song ngữ Anh - Việt song song dưới từng đoạn"
                    >
                      <i className="fa-solid fa-language text-xs" />
                      <span>Song Ngữ Anh - Việt</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLeftTab('translation')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                        leftTab === 'translation'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : isLight
                          ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                          : 'text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800'
                      }`}
                      title="Xem toàn bộ bản dịch tiếng Việt nguyên bài đọc"
                    >
                      <i className="fa-solid fa-file-lines text-xs" />
                      <span>Dịch tiếng Việt 🇻🇳</span>
                    </button>

                    {activeTest.vocabulary?.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setLeftTab('vocab')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          leftTab === 'vocab'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : isLight
                            ? 'text-slate-600 hover:bg-slate-200/70'
                            : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <i className="fa-solid fa-spell-check text-xs" />
                        <span>Từ vựng ({activeTest.vocabulary.length})</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('vocabulary', { section: 'notebook' })}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition flex items-center gap-1.5 cursor-pointer"
                      title="Mở Sổ từ vựng cá nhân"
                    >
                      <i className="fa-solid fa-book-bookmark text-amber-500 text-xs" />
                      <span className="hidden sm:inline">Sổ từ ({savedVocab.length})</span>
                    </button>
                  </div>

                  {/* Font Size & Speech Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 font-bold hidden sm:inline">Cỡ chữ:</span>
                    <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setReadingFontSize('sm')}
                        className={`px-2 py-1 rounded-lg font-black transition cursor-pointer ${
                          readingFontSize === 'sm'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                        title="Cỡ chữ nhỏ"
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={() => setReadingFontSize('base')}
                        className={`px-2 py-1 rounded-lg font-black transition cursor-pointer ${
                          readingFontSize === 'base'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                        title="Cỡ chữ vừa"
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => setReadingFontSize('lg')}
                        className={`px-2 py-1 rounded-lg font-black transition cursor-pointer ${
                          readingFontSize === 'lg'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                        title="Cỡ chữ to"
                      >
                        A+
                      </button>
                    </div>
                  </div>
                </div>

                {/* Left Content Area: Passage or Vocabulary */}
                {leftTab === 'passage' ? (
                  <div
                    onMouseUp={handlePassageMouseUp}
                    onDoubleClick={handlePassageMouseUp}
                    onTouchEnd={handlePassageMouseUp}
                    className={`p-6 md:p-7 rounded-3xl border font-sans select-text cursor-text shadow-xs transition-all ${fontClass} ${
                      isSplit
                        ? 'lg:overflow-y-auto lg:max-h-[calc(100vh-210px)] pr-2'
                        : ''
                    } ${
                      isLight
                        ? 'bg-slate-50/90 border-slate-200 text-slate-800'
                        : 'bg-slate-950/70 border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60 text-xs font-sans">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono text-blue-600 dark:text-blue-400">
                          <i className="fa-solid fa-file-lines" />
                          READING PASSAGE
                        </span>
                        {showBilingual ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-mono flex items-center gap-1">
                            <i className="fa-solid fa-check text-[9px]" /> CHẾ ĐỘ SONG NGỮ
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] italic hidden md:inline text-slate-400">
                          💡 Bôi đen từ bất kỳ để tra & lưu
                        </span>
                        <button
                          type="button"
                          onClick={() => setLeftTab('translation')}
                          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>Xem dịch nguyên bài ➔</span>
                        </button>
                      </div>
                    </div>

                    {/* Passage Content: Bilingual vs Normal */}
                    {showBilingual && currentTranslation?.paragraphsVi ? (
                      <div
                        onMouseUp={handlePassageMouseUp}
                        onDoubleClick={handlePassageMouseUp}
                        onTouchEnd={handlePassageMouseUp}
                        className="space-y-4 select-text cursor-text"
                      >
                        {passageParagraphs.map((para, pIdx) => {
                          const viPara = currentTranslation.paragraphsVi[pIdx];
                          return (
                            <div
                              key={pIdx}
                              className={`p-4 rounded-2xl border transition-all ${
                                isLight
                                  ? 'bg-white/80 border-slate-200/90 shadow-2xs'
                                  : 'bg-slate-900/70 border-slate-800'
                              }`}
                            >
                              <p className="whitespace-pre-line leading-relaxed font-sans text-slate-900 dark:text-slate-100">
                                {para}
                              </p>
                              {viPara && (
                                <div className="mt-3 p-3.5 rounded-xl bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200 text-xs md:text-sm font-sans italic leading-relaxed select-text animate-fadeIn">
                                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-emerald-600 dark:text-emerald-400 not-italic mb-1 font-mono">
                                    <i className="fa-solid fa-language" />
                                    <span>Bản dịch tiếng Việt (Đoạn {pIdx + 1}):</span>
                                  </div>
                                  {(viPara || '').normalize('NFC')}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        onMouseUp={handlePassageMouseUp}
                        onDoubleClick={handlePassageMouseUp}
                        onTouchEnd={handlePassageMouseUp}
                        className="whitespace-pre-line leading-relaxed space-y-4 select-text cursor-text"
                      >
                        {activeTest.passage}
                      </div>
                    )}

                    {/* Collapsible Key Vocabulary Footer inside Passage tab */}
                    {activeTest.vocabulary?.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 font-sans">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <i className="fa-solid fa-spell-check text-indigo-500" />
                            Từ vựng cốt lõi:
                          </span>
                          <button
                            type="button"
                            onClick={() => setLeftTab('vocab')}
                            className="text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Xem chi tiết ({activeTest.vocabulary.length})</span>
                            <i className="fa-solid fa-arrow-right text-[10px]" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeTest.vocabulary.map((v, vIdx) => (
                            <span
                              key={vIdx}
                              onClick={() => speak(v.word)}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer flex items-center gap-1 transition"
                              title={`Nhấn nghe phát âm: ${v.word} (${v.pron}) -> ${v.meaning}`}
                            >
                              <span>{v.word}</span>
                              <i className="fa-solid fa-volume-high text-[10px] opacity-60" />
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : leftTab === 'translation' ? (
                  /* Dedicated Full Translation Tab */
                  <div
                    className={`p-6 md:p-7 rounded-3xl border select-text cursor-text shadow-xs transition-all ${fontClass} ${
                      isSplit
                        ? 'lg:overflow-y-auto lg:max-h-[calc(100vh-210px)] pr-2'
                        : ''
                    } ${
                      isLight
                        ? 'bg-amber-50/15 border-amber-200/70 text-slate-800'
                        : 'bg-slate-950/70 border-slate-800 text-slate-200'
                    }`}
                  >
                    {/* Translation Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200/60 dark:border-slate-800/60 font-sans">
                      <div>
                        <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                          <i className="fa-solid fa-language text-sm" />
                          BẢN DỊCH NGUYÊN BÀI ĐỌC (TIẾNG VIỆT)
                        </span>
                        <h3 className="text-base md:text-lg font-black mt-1 text-slate-900 dark:text-white">
                          {currentTranslation?.titleVi || activeTest.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyTranslation}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                            copiedTranslation
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                          title="Sao chép toàn bộ bản dịch tiếng Việt"
                        >
                          <i className={`fa-solid ${copiedTranslation ? 'fa-check' : 'fa-copy'}`} />
                          <span>{copiedTranslation ? 'Đã chép' : 'Sao chép'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setLeftTab('passage');
                            setShowBilingual(true);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Xem bài đọc ở chế độ song ngữ từng đoạn"
                        >
                          <i className="fa-solid fa-table-columns text-xs" />
                          <span>Xem song ngữ</span>
                        </button>
                      </div>
                    </div>

                    {/* Vietnamese Passage Body */}
                    {currentTranslation?.passageVi ? (
                      <div className="whitespace-pre-line leading-relaxed space-y-4 select-text font-sans text-slate-900 dark:text-slate-100">
                        {currentTranslation.passageVi.normalize('NFC')}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400 font-sans">
                        <i className="fa-solid fa-spinner fa-spin text-2xl text-emerald-500 mb-2" />
                        <p>Đang chuẩn bị bản dịch cho bài đọc này...</p>
                      </div>
                    )}

                    {/* Footnote */}
                    <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 font-sans flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
                      <span className="flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-check text-emerald-500" />
                        Bản dịch tiếng Việt sát nghĩa ngữ cảnh giúp bạn nắm chắc 100% nội dung & câu hỏi.
                      </span>
                      <button
                        type="button"
                        onClick={() => setLeftTab('passage')}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Quay lại bài đọc tiếng Anh</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Dedicated Vocabulary Tab */
                  <div
                    className={`p-5 md:p-6 rounded-3xl border space-y-3.5 shadow-xs ${
                      isSplit
                        ? 'lg:overflow-y-auto lg:max-h-[calc(100vh-210px)] pr-2'
                        : ''
                    } ${
                      isLight ? 'bg-indigo-50/40 border-indigo-100/80' : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                        <i className="fa-solid fa-spell-check" />
                        Từ Vựng Trọng Tâm Trong Bài Đọc ({activeTest.vocabulary.length} từ)
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Nhấn <i className="fa-solid fa-bookmark text-amber-500 mx-1" /> để lưu vào Sổ từ vựng
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTest.vocabulary.map((v, vIdx) => {
                        const saved = isWordSaved(v.word);
                        return (
                          <div
                            key={vIdx}
                            className={`p-3 px-4 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                              saved
                                ? isLight
                                  ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                                  : 'bg-amber-950/30 border-amber-800 shadow-xs'
                                : isLight
                                ? 'bg-white border-slate-200 hover:border-slate-300'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-wrap pr-2">
                              <span className="font-black text-sm text-blue-600 dark:text-blue-400">{v.word}</span>
                              <span className="text-[11px] text-slate-400 font-mono font-bold">{v.pron}</span>
                              <span className="text-slate-700 dark:text-slate-300 font-medium">→ {v.meaning}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => speak(v.word)}
                                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-500 dark:text-slate-400 flex items-center justify-center transition cursor-pointer"
                                title="Nghe phát âm"
                              >
                                <i className="fa-solid fa-volume-high text-xs" />
                              </button>

                              <button
                                onClick={() => toggleSaveWord(v)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                                  saved
                                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                    : isLight
                                    ? 'bg-white border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300'
                                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-700'
                                }`}
                                title={saved ? 'Đã lưu trong Sổ từ vựng' : 'Lưu từ này vào Sổ từ vựng'}
                              >
                                <i className="fa-solid fa-bookmark" />
                                <span>{saved ? 'Đã lưu' : 'Lưu từ'}</span>
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

            // Render Questions & Quiz Section
            const renderQuestionsSection = (isSplit) => (
              <div className="space-y-4">
                {/* Questions Palette & Jump Header */}
                <div
                  className={`p-3.5 px-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                      Câu hỏi ({answeredQ}/{totalQ}):
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto max-w-[65vw] sm:max-w-none scrollbar-hide py-0.5">
                      {qList.map((q, idx) => {
                        const isAnswered = currentTestAnswers[idx] !== undefined;
                        const isCorrect = isCurrentTestSubmitted && currentTestAnswers[idx] === q.answer;
                        const isWrong = isCurrentTestSubmitted && isAnswered && currentTestAnswers[idx] !== q.answer;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(`reading-q-${idx}`);
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                el.classList.add('ring-2', 'ring-blue-500');
                                setTimeout(() => el.classList.remove('ring-2', 'ring-blue-500'), 1200);
                              }
                            }}
                            className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
                              isCurrentTestSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : isWrong
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                : isAnswered
                                ? 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-400/30'
                                : isLight
                                ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                            }`}
                            title={`Câu ${idx + 1}${isAnswered ? ' (Đã chọn)' : ' (Chưa làm)'} - Bấm để cuộn đến`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isCurrentTestSubmitted && (
                    <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                      Đúng: {correctQ}/{totalQ} ({scorePct}%)
                    </span>
                  )}
                </div>

                {/* Score & Feedback Banner (When submitted) */}
                {isCurrentTestSubmitted && (
                  <div
                    className={`p-4 md:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition-all ${
                      scorePct >= 70
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0 ${
                          scorePct >= 70 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        <i className={`fa-solid ${scorePct >= 70 ? 'fa-award' : 'fa-chart-pie'}`} />
                      </div>
                      <div>
                        <h4 className="font-black text-sm md:text-base flex items-center gap-2">
                          <span>Kết quả: {correctQ}/{totalQ} câu đúng ({scorePct}%)</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 dark:bg-slate-800/80 font-bold">
                            {scorePct >= 70 ? 'Đạt chuẩn CEFR ⭐' : 'Cần xem lại giải thích 📖'}
                          </span>
                        </h4>
                        <p className="text-xs opacity-90 font-medium mt-0.5">
                          {scorePct >= 70
                            ? '🎉 Bạn đã nắm rất tốt thông điệp bài đọc! Đáp án đã được tự động lưu vĩnh viễn.'
                            : '💪 Hãy tham khảo phần giải thích chi tiết dưới từng câu để rút kinh nghiệm từ vựng & ngữ cảnh nhé.'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleResetQuiz}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <i className="fa-solid fa-rotate-left text-[11px]" />
                      <span>Làm lại bài</span>
                    </button>
                  </div>
                )}

                {/* Questions List Container */}
                <div
                  className={`space-y-4 ${
                    isSplit ? 'lg:overflow-y-auto lg:max-h-[calc(100vh-210px)] pr-2' : ''
                  }`}
                >
                  {qList.map((qObj, qIdx) => {
                    const userAns = currentTestAnswers[qIdx];
                    const isCorrect = userAns === qObj.answer;

                    return (
                      <div
                        id={`reading-q-${qIdx}`}
                        key={qIdx}
                        className={`p-5 rounded-2xl border transition-all duration-300 ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-800'
                        }`}
                      >
                        <p className="text-sm font-bold mb-3 leading-snug">
                          <span className="text-blue-600 dark:text-blue-400 font-mono font-black mr-2">
                            Câu {qIdx + 1}:
                          </span>
                          {(qObj.q || '').replace(/^\s*\d+[.:)\s]+\s*/, '')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {qObj.options.map((opt, optIdx) => {
                            const selected = userAns === optIdx;
                            let btnClass = isLight
                              ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                              : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300';

                            if (isCurrentTestSubmitted) {
                              if (optIdx === qObj.answer) {
                                btnClass = 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs';
                              } else if (selected) {
                                btnClass = 'bg-rose-600 border-rose-500 text-white shadow-xs';
                              }
                            } else if (selected) {
                              btnClass = 'bg-blue-600 border-blue-500 text-white font-bold shadow-sm';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(qIdx, optIdx)}
                                className={`p-3 px-4 rounded-xl border text-xs font-semibold text-left transition cursor-pointer flex items-center justify-between gap-2 ${btnClass}`}
                              >
                                <span>{opt}</span>
                                {isCurrentTestSubmitted && optIdx === qObj.answer && (
                                  <i className="fa-solid fa-check text-xs shrink-0" />
                                )}
                                {isCurrentTestSubmitted && selected && optIdx !== qObj.answer && (
                                  <i className="fa-solid fa-xmark text-xs shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {isCurrentTestSubmitted && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 text-xs animate-fadeIn">
                            <span className={isCorrect ? 'text-emerald-500 font-bold' : 'text-rose-400 font-bold'}>
                              {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng.'}
                            </span>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {qObj.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Action Controls at bottom of quiz */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-2 pb-2">
                    {answeredQ > 0 && (
                      <button
                        onClick={handleResetQuiz}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                          isLight
                            ? 'border-slate-200 bg-white hover:bg-slate-100 text-slate-600'
                            : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <i className="fa-solid fa-rotate-left text-[11px]" />
                        <span>Làm lại từ đầu</span>
                      </button>
                    )}

                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={handleToggleSubmitAnswers}
                        className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer flex items-center gap-2 ${
                          isCurrentTestSubmitted
                            ? 'bg-slate-700 hover:bg-slate-800 text-white'
                            : answeredQ < totalQ
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-102'
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            isCurrentTestSubmitted
                              ? 'fa-eye-slash'
                              : answeredQ < totalQ
                              ? 'fa-circle-exclamation'
                              : 'fa-circle-check'
                          }`}
                        />
                        <span>
                          {isCurrentTestSubmitted
                            ? 'Ẩn Đáp Án & Giải Thích'
                            : answeredQ < totalQ
                            ? `Cần trả lời đủ (${answeredQ}/${totalQ} câu)`
                            : 'Kiểm Tra & Lưu Đáp Án ➔'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );

            // Render Split-View vs Stacked View
            if (readingLayoutMode === 'split') {
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
                  {/* Left Column: Reading Passage & Vocab (Sticky on Desktop) */}
                  <div className="lg:col-span-6 xl:col-span-7 space-y-4 lg:sticky lg:top-4">
                    {renderPassageSection(true)}
                  </div>

                  {/* Right Column: Questions & Quiz */}
                  <div className="lg:col-span-6 xl:col-span-5 space-y-4">
                    {renderQuestionsSection(true)}
                  </div>
                </div>
              );
            }

            // Stacked View
            return (
              <div className="space-y-6 animate-fadeIn">
                {renderPassageSection(false)}
                {renderQuestionsSection(false)}
              </div>
            );
          })()}

          {/* ─── MOBILE QUICK PEEK FLOATING BUTTON ────────────────── */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              type="button"
              onClick={() => setShowMobilePassage(true)}
              className="px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition active:scale-95 ring-4 ring-blue-500/20"
            >
              <i className="fa-solid fa-book-open text-sm" />
              <span>Xem bài đọc</span>
            </button>
          </div>

          {/* ─── MOBILE PASSAGE DRAWER MODAL ──────────────────────── */}
          {showMobilePassage && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
              <div
                className={`rounded-t-3xl border-t p-5 max-h-[85vh] flex flex-col space-y-4 shadow-2xl animate-slideUp ${
                  isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-book-open text-blue-500" />
                    <h3 className="font-black text-sm line-clamp-1">{activeTest.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMobilePassage(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-sm" />
                  </button>
                </div>

                {/* Mobile Tabs: Original, Bilingual, Vietnamese Translation */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setLeftTab('passage');
                      setShowBilingual(false);
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition text-center ${
                      leftTab === 'passage' && !showBilingual
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Tiếng Anh
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLeftTab('passage');
                      setShowBilingual(true);
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition text-center ${
                      leftTab === 'passage' && showBilingual
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Song ngữ
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeftTab('translation')}
                    className={`flex-1 py-1.5 rounded-lg transition text-center ${
                      leftTab === 'translation'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Dịch TV 🇻🇳
                  </button>
                </div>

                <div
                  onMouseUp={handlePassageMouseUp}
                  onDoubleClick={handlePassageMouseUp}
                  onTouchEnd={handlePassageMouseUp}
                  className={`overflow-y-auto pr-1 font-serif whitespace-pre-line leading-relaxed ${fontClass}`}
                >
                  {leftTab === 'translation' ? (
                    <div className="space-y-3 font-serif">
                      <h4 className="font-sans font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                        {currentTranslation?.titleVi || activeTest.title}
                      </h4>
                      {currentTranslation?.passageVi || 'Đang chuẩn bị bản dịch...'}
                    </div>
                  ) : showBilingual && currentTranslation?.paragraphsVi ? (
                    <div className="space-y-3.5">
                      {passageParagraphs.map((para, pIdx) => (
                        <div key={pIdx} className="space-y-1.5 p-2.5 rounded-xl bg-slate-500/5">
                          <p>{para}</p>
                          {currentTranslation.paragraphsVi[pIdx] && (
                            <p className="text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 p-2 rounded-lg font-sans italic">
                              🇻🇳 {currentTranslation.paragraphsVi[pIdx]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    activeTest.passage
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowMobilePassage(false)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-md transition"
                >
                  Quay lại làm câu hỏi
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Word Lookup Modal for double-click / selection */}
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
