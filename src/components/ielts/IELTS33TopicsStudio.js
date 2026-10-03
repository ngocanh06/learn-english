import React, { useState, useMemo } from 'react';
import {
  IELTS_33_TOPICS_META,
  IELTS_33_TOPICS_DATABASE,
  IELTS_ALL_33_TOPICS_WORDS,
} from '../../data/ieltsVocab33Topics';
import { speakEnglish } from '../../utils/speechHelper';

export default function IELTS33TopicsStudio({
  theme = 'dark',
  knownWordsMap = {},
  setKnownWordsMap,
  starredWordsMap = {},
  setStarredWordsMap,
  initialTopicId = 'topic-1',
  onSelectWord,
}) {
  const isLight = theme === 'light';

  // Selected Topic
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('current'); // 'current' | 'all'
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'flashcard' | 'quiz' | 'match'

  // Flashcard State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Match Game State
  const [selectedWordCard, setSelectedWordCard] = useState(null);
  const [selectedMeaningCard, setSelectedMeaningCard] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState(new Set());

  // Topic object
  const currentTopic = useMemo(() => {
    return (
      IELTS_33_TOPICS_DATABASE.find((t) => t.id === selectedTopicId) ||
      IELTS_33_TOPICS_DATABASE[0]
    );
  }, [selectedTopicId]);

  // Words list based on search and scope
  const displayWords = useMemo(() => {
    const pool =
      searchScope === 'all' && searchQuery.trim()
        ? IELTS_ALL_33_TOPICS_WORDS
        : currentTopic.words;

    if (!searchQuery.trim()) return pool;
    const q = searchQuery.toLowerCase().trim();
    return pool.filter(
      (w) =>
        (w.word && w.word.toLowerCase().includes(q)) ||
        (w.meaning && w.meaning.toLowerCase().includes(q)) ||
        (w.ipa && w.ipa.toLowerCase().includes(q))
    );
  }, [currentTopic, searchQuery, searchScope]);

  // Topic metrics
  const topicMasteredCount = useMemo(() => {
    return currentTopic.words.filter(
      (w) => knownWordsMap?.[(w.word || '').toLowerCase().trim()]
    ).length;
  }, [currentTopic, knownWordsMap]);

  const topicPct = Math.round(
    (topicMasteredCount / (currentTopic.words.length || 1)) * 100
  );

  // Total global metrics
  const totalMasteredCount = useMemo(() => {
    let count = 0;
    IELTS_ALL_33_TOPICS_WORDS.forEach((w) => {
      if (knownWordsMap?.[(w.word || '').toLowerCase().trim()]) count += 1;
    });
    return count;
  }, [knownWordsMap]);

  const totalPct = Math.round(
    (totalMasteredCount / (IELTS_ALL_33_TOPICS_WORDS.length || 1)) * 100
  );

  // Handlers
  const toggleMastered = (wordStr) => {
    if (!setKnownWordsMap) return;
    const key = (wordStr || '').toLowerCase().trim();
    setKnownWordsMap((prev) => ({
      ...prev,
      [key]: !prev?.[key],
    }));
  };

  const toggleStarred = (wordStr) => {
    if (!setStarredWordsMap) return;
    const key = (wordStr || '').toLowerCase().trim();
    setStarredWordsMap((prev) => ({
      ...prev,
      [key]: !prev?.[key],
    }));
  };

  // Flashcard Handlers
  const currentCard = displayWords[cardIndex] || displayWords[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % (displayWords.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) =>
      prev === 0 ? Math.max(0, displayWords.length - 1) : prev - 1
    );
  };

  // Dynamic Quiz Generator for current topic
  const quizQuestions = useMemo(() => {
    const list = [...currentTopic.words];
    if (list.length < 4) return [];
    return list.slice(0, 20).map((targetWord) => {
      const distractors = list
        .filter((w) => w.word !== targetWord.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.meaning);

      const options = [...distractors, targetWord.meaning].sort(
        () => 0.5 - Math.random()
      );
      return {
        word: targetWord.word,
        ipa: targetWord.ipa,
        correctMeaning: targetWord.meaning,
        options,
      };
    });
  }, [currentTopic]);

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectQuizOption = (opt) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(opt);
    setIsAnswerChecked(true);
    if (opt === currentQuiz.correctMeaning) {
      setQuizScore((s) => s + 1);
      toggleMastered(currentQuiz.word);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setQuizIndex((idx) => (idx + 1) % quizQuestions.length);
  };

  // Match Game Pairs
  const matchWordsPool = useMemo(() => {
    return currentTopic.words.slice(0, 6);
  }, [currentTopic]);

  const shuffledMeanings = useMemo(() => {
    return [...matchWordsPool]
      .sort(() => 0.5 - Math.random())
      .map((w) => ({ id: w.id, text: w.meaning, wordKey: w.word }));
  }, [matchWordsPool]);

  const handleWordCardClick = (w) => {
    if (matchedPairs.has(w.word)) return;
    setSelectedWordCard(w.word);
    if (selectedMeaningCard) {
      if (selectedMeaningCard.wordKey === w.word) {
        setMatchedPairs((prev) => new Set([...prev, w.word]));
        toggleMastered(w.word);
      }
      setSelectedWordCard(null);
      setSelectedMeaningCard(null);
    }
  };

  const handleMeaningCardClick = (m) => {
    if (matchedPairs.has(m.wordKey)) return;
    setSelectedMeaningCard(m);
    if (selectedWordCard) {
      if (selectedWordCard === m.wordKey) {
        setMatchedPairs((prev) => new Set([...prev, m.wordKey]));
        toggleMastered(m.wordKey);
      }
      setSelectedWordCard(null);
      setSelectedMeaningCard(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ─── HEADER: 33 TOPICS OVERVIEW & OVERALL PROGRESS ─── */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isLight
            ? 'bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/20 border-slate-200/90 shadow-sm'
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border-slate-800 shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <i className="fa-solid fa-graduation-cap" />
              IELTS Academic 33 Chủ Đề (Band 6.0 - 8.0+)
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Kho 4,050 Từ Vựng IELTS 33 Chủ Đề Thực Chiến
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Trích lọc toàn diện từ giáo trình IELTS chuyên sâu. Phân loại theo 33 chủ đề trọng điểm của bài thi Speaking & Writing kèm phiên âm IPA, giải nghĩa tiếng Việt và 4 chế độ luyện tập thông minh.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Chủ đề</span>
              <span className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">33</span>
              <span className="text-[10px] text-slate-400 block">chuyên sâu</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Đã thuộc</span>
              <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {totalMasteredCount}
              </span>
              <span className="text-[10px] text-slate-400 block">/ 4,050 từ</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Tiến độ</span>
              <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                {totalPct}%
              </span>
              <span className="text-[10px] text-slate-400 block">toàn bộ kho</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600 dark:text-slate-400">
              Tiến độ ghi nhớ toàn bộ 33 Chủ Đề IELTS ({totalMasteredCount} / 4,050 từ)
            </span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{totalPct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.max(2, totalPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 33 TOPICS SELECTOR CAROUSEL / GRID ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-black text-xs uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Chọn Chủ Đề Học Tập (1 - 33)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Đang mở: <strong>{currentTopic.titleEn}</strong> ({currentTopic.wordCount} từ)
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {IELTS_33_TOPICS_META.map((meta) => {
            const isSelected = meta.id === selectedTopicId;
            return (
              <button
                key={meta.id}
                onClick={() => {
                  setSelectedTopicId(meta.id);
                  setCardIndex(0);
                  setIsFlipped(false);
                  setQuizIndex(0);
                  setMatchedPairs(new Set());
                }}
                className={`px-3.5 py-2.5 rounded-2xl border text-left shrink-0 transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                  }`}
                >
                  <i className={`fa-solid ${meta.icon}`} />
                </div>
                <div>
                  <p className="text-xs font-bold whitespace-nowrap">
                    {meta.num}. {meta.titleEn}
                  </p>
                  <p
                    className={`text-[10px] truncate max-w-[120px] ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {meta.titleVi} • {meta.wordCount} từ
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── ACTIVE TOPIC BAR & STUDY MODES CONTROLLER ─── */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center text-base shrink-0">
            <i className={`fa-solid ${currentTopic.icon}`} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {currentTopic.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span>{currentTopic.wordCount} từ học thuật</span>
              <span>•</span>
              <span className="text-emerald-500 font-semibold">
                Đã thuộc: {topicMasteredCount}/{currentTopic.wordCount} ({topicPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Study Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-stretch md:self-auto overflow-x-auto">
          {[
            { id: 'list', label: 'Bảng Từ Vựng', icon: 'fa-table-list' },
            { id: 'flashcard', label: 'Flashcard 3D', icon: 'fa-clone' },
            { id: 'quiz', label: 'Trắc Nghiệm', icon: 'fa-circle-question' },
            { id: 'match', label: 'Nối Từ', icon: 'fa-puzzle-piece' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveTab(mode.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
                activeTab === mode.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className={`fa-solid ${mode.icon} text-[11px]`} />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── SEARCH & FILTER CONTROLS ─── */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchScope === 'current'
                ? `Tìm từ trong chủ đề ${currentTopic.titleEn}...`
                : 'Tìm kiếm trên toàn bộ 4,050 từ IELTS...'
            }
            className={`w-full pl-9 pr-8 py-2.5 rounded-xl text-xs border outline-hidden transition ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                : 'bg-slate-900 border-slate-800 text-white focus:border-blue-500'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setSearchScope('current')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              searchScope === 'current'
                ? 'bg-blue-600 text-white border-blue-500'
                : isLight
                ? 'bg-white border-slate-200 text-slate-600'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            Chủ đề này ({currentTopic.wordCount})
          </button>
          <button
            onClick={() => setSearchScope('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              searchScope === 'all'
                ? 'bg-blue-600 text-white border-blue-500'
                : isLight
                ? 'bg-white border-slate-200 text-slate-600'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            Tất cả 33 chủ đề (4,050)
          </button>
        </div>
      </div>

      {/* ─── TAB 1: LIST VIEW ─── */}
      {activeTab === 'list' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Hiển thị: {displayWords.length} từ</span>
            <span>Click loa để nghe phát âm chuẩn</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayWords.map((item) => {
              const isKnown = !!knownWordsMap?.[(item.word || '').toLowerCase().trim()];
              const isStarred = !!starredWordsMap?.[(item.word || '').toLowerCase().trim()];

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isKnown
                      ? isLight
                        ? 'bg-emerald-50/40 border-emerald-200/80'
                        : 'bg-emerald-950/20 border-emerald-900/40'
                      : isLight
                      ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-sm md:text-base text-slate-900 dark:text-white">
                          {item.word}
                        </h4>
                        <button
                          onClick={() => speakEnglish(item.word)}
                          title="Nghe phát âm"
                          className="w-6 h-6 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs transition cursor-pointer"
                        >
                          <i className="fa-solid fa-volume-high text-[10px]" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleStarred(item.word)}
                          title={isStarred ? 'Bỏ lưu' : 'Lưu từ'}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition cursor-pointer ${
                            isStarred
                              ? 'text-amber-500 bg-amber-500/15'
                              : 'text-slate-400 hover:text-amber-500'
                          }`}
                        >
                          <i className={`fa-${isStarred ? 'solid' : 'regular'} fa-star`} />
                        </button>

                        <button
                          onClick={() => toggleMastered(item.word)}
                          title={isKnown ? 'Đánh dấu chưa thuộc' : 'Đánh dấu đã thuộc'}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition cursor-pointer ${
                            isKnown
                              ? 'text-emerald-500 bg-emerald-500/15'
                              : 'text-slate-400 hover:text-emerald-500'
                          }`}
                        >
                          <i className={`fa-${isKnown ? 'solid' : 'regular'} fa-circle-check`} />
                        </button>
                      </div>
                    </div>

                    {item.ipa && (
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
                        {item.ipa}
                      </p>
                    )}

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">
                      Chủ đề {item.topicNum}: {item.topicEn}
                    </span>
                    <span className={`text-[10px] font-bold ${isKnown ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {isKnown ? '✓ Đã thuộc' : 'Chưa thuộc'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 2: FLASHCARD 3D ─── */}
      {activeTab === 'flashcard' && currentCard && (
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="w-full max-w-lg">
            {/* Flashcard container with flip animation */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[260px] md:min-h-[300px] p-8 rounded-3xl border shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-300 relative select-none ${
                isFlipped
                  ? isLight
                    ? 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 text-slate-900'
                    : 'bg-gradient-to-br from-slate-900 to-indigo-950/70 border-indigo-800 text-white'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold">
                  {currentTopic.titleEn} • Thẻ {cardIndex + 1}/{displayWords.length}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {isFlipped ? 'Mặt Sau (Nghĩa)' : 'Mặt Trước (Từ)'}
                </span>
              </div>

              {/* Card Body */}
              <div className="text-center py-6 space-y-3">
                {!isFlipped ? (
                  <>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                      {currentCard.word}
                    </h3>
                    <p className="text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      {currentCard.ipa}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      <i className="fa-solid fa-hand-pointer mr-1.5" />
                      Chạm để xem nghĩa tiếng Việt
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {currentCard.meaning}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {currentCard.word} • {currentCard.ipa}
                    </p>
                  </>
                )}
              </div>

              {/* Card Footer Actions */}
              <div
                className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => speakEnglish(currentCard.word)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-volume-high" />
                  <span>Phát âm</span>
                </button>

                <button
                  onClick={() => toggleMastered(currentCard.word)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition ${
                    knownWordsMap?.[(currentCard.word || '').toLowerCase().trim()]
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500'
                  }`}
                >
                  <i className="fa-solid fa-circle-check" />
                  <span>
                    {knownWordsMap?.[(currentCard.word || '').toLowerCase().trim()]
                      ? 'Đã thuộc'
                      : 'Đánh dấu đã thuộc'}
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4 mt-4">
              <button
                onClick={handlePrevCard}
                className="flex-1 py-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <i className="fa-solid fa-arrow-left" />
                <span>Từ trước</span>
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
              >
                <i className="fa-solid fa-rotate" />
                <span>Lật thẻ</span>
              </button>

              <button
                onClick={handleNextCard}
                className="flex-1 py-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>Từ tiếp theo</span>
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: QUIZ MODE ─── */}
      {activeTab === 'quiz' && currentQuiz && (
        <div className="max-w-xl mx-auto py-4 space-y-6">
          <div
            className={`p-6 md:p-8 rounded-3xl border shadow-lg space-y-6 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">
                Câu hỏi {quizIndex + 1}/{quizQuestions.length}
              </span>
              <span className="text-emerald-500 font-mono font-bold">
                Điểm số: {quizScore}
              </span>
            </div>

            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Từ này có nghĩa là gì?
              </span>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                  {currentQuiz.word}
                </h3>
                <button
                  onClick={() => speakEnglish(currentQuiz.word)}
                  className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs"
                >
                  <i className="fa-solid fa-volume-high" />
                </button>
              </div>
              <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
                {currentQuiz.ipa}
              </p>
            </div>

            {/* 4 Choices */}
            <div className="space-y-2.5">
              {currentQuiz.options.map((opt, idx) => {
                let btnStyle = isLight
                  ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-200';

                if (isAnswerChecked) {
                  if (opt === currentQuiz.correctMeaning) {
                    btnStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold';
                  } else if (selectedAnswer === opt) {
                    btnStyle = 'bg-rose-500 border-rose-500 text-white';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectQuizOption(opt)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerChecked && opt === currentQuiz.correctMeaning && (
                      <i className="fa-solid fa-check text-sm text-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerChecked && (
              <button
                onClick={handleNextQuiz}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-md"
              >
                Câu tiếp theo <i className="fa-solid fa-arrow-right ml-1.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 4: MATCH GAME ─── */}
      {activeTab === 'match' && (
        <div className="max-w-2xl mx-auto py-4 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Nối từ tiếng Anh với bản dịch tiếng Việt tương ứng
            </h3>
            <p className="text-xs text-slate-400">
              Đã ghép đúng: {matchedPairs.size} / {matchWordsPool.length} cặp
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Left: Words */}
            <div className="space-y-2.5">
              {matchWordsPool.map((w) => {
                const isMatched = matchedPairs.has(w.word);
                const isSelected = selectedWordCard === w.word;

                return (
                  <button
                    key={w.id}
                    disabled={isMatched}
                    onClick={() => handleWordCardClick(w)}
                    className={`w-full p-4 rounded-2xl border text-center font-bold text-xs transition cursor-pointer ${
                      isMatched
                        ? 'opacity-40 bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                        : isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-[1.02]'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-blue-400 text-slate-800'
                        : 'bg-slate-900 border-slate-800 hover:border-blue-400 text-slate-200'
                    }`}
                  >
                    {w.word}
                  </button>
                );
              })}
            </div>

            {/* Right: Meanings */}
            <div className="space-y-2.5">
              {shuffledMeanings.map((m) => {
                const isMatched = matchedPairs.has(m.wordKey);
                const isSelected = selectedMeaningCard?.id === m.id;

                return (
                  <button
                    key={m.id}
                    disabled={isMatched}
                    onClick={() => handleMeaningCardClick(m)}
                    className={`w-full p-4 rounded-2xl border text-center font-medium text-xs transition cursor-pointer ${
                      isMatched
                        ? 'opacity-40 bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                        : isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-[1.02]'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800'
                        : 'bg-slate-900 border-slate-800 hover:border-indigo-400 text-slate-200'
                    }`}
                  >
                    {m.text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
