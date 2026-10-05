import React, { useState, useMemo } from 'react';
import { AWL_SUBLISTS } from '../../data/ieltsPracticeData';
import { useUserStorage } from '../../hooks/useUserStorage';

export default function IELTSVocabStudio({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Sublist tab: 1 | 2 | 3
  const [activeSublistNum, setActiveSublistNum] = useState(1);
  const activeSublist = useMemo(() => {
    return AWL_SUBLISTS.find((s) => s.sublist === activeSublistNum) || AWL_SUBLISTS[0];
  }, [activeSublistNum]);

  // Mode: 'flashcards' | 'list' | 'quiz'
  const [studyMode, setStudyMode] = useState('flashcards');

  // Flashcard carousel index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Persistence: Mastered words map { [word]: boolean }
  const [masteredWords, setMasteredWords] = useUserStorage('ielts_awl_mastered_words_v1', {});

  // Active word
  const currentWord = activeSublist.words[currentCardIndex] || activeSublist.words[0];

  // Speech pronunciation
  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle mastered status
  const toggleMastered = (wordKey) => {
    setMasteredWords((prev) => ({
      ...prev,
      [wordKey]: !prev[wordKey],
    }));
  };

  // Next / Prev card
  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((i) => (i + 1) % activeSublist.words.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((i) =>
      i === 0 ? activeSublist.words.length - 1 : i - 1
    );
  };

  // Metrics
  const sublistMasteredCount = activeSublist.words.filter(
    (w) => masteredWords[w.word]
  ).length;
  const sublistTotal = activeSublist.words.length;
  const sublistPercent = Math.round((sublistMasteredCount / sublistTotal) * 100);

  return (
    <div className="space-y-6 font-sans">
      {/* ─── HEADER & CONTROLS ───────────────────────────────────────── */}
      <div
        className={`p-5 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-layer-group" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-500/15 text-amber-500">
                Academic Word List (AWL)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                570 Từ Vựng Học Thuật Cốt Lõi
              </span>
            </div>
            <h2
              className={`text-base md:text-lg font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {activeSublist.title}
            </h2>
          </div>
        </div>

        {/* Sublist & Mode Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Sublists pills */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
            {AWL_SUBLISTS.map((s) => (
              <button
                key={s.sublist}
                onClick={() => {
                  setActiveSublistNum(s.sublist);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSublistNum === s.sublist
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                Sublist {s.sublist}
              </button>
            ))}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => setStudyMode('flashcards')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                studyMode === 'flashcards'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setStudyMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                studyMode === 'list'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              Danh Sách
            </button>
          </div>
        </div>
      </div>

      {/* ─── PROGRESS BAR ────────────────────────────────────────────── */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2 text-xs">
          <i className="fa-solid fa-graduation-cap text-amber-500" />
          <span className="font-bold">
            Tiến độ Sublist {activeSublistNum}:
          </span>
          <span className="text-slate-400 font-mono">
            {sublistMasteredCount}/{sublistTotal} từ đã thuộc ({sublistPercent}%)
          </span>
        </div>

        <div className="w-48 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-300"
            style={{ width: `${Math.max(5, sublistPercent)}%` }}
          />
        </div>
      </div>

      {/* ─── MODE 1: 3D FLASHCARDS ───────────────────────────────────── */}
      {studyMode === 'flashcards' && currentWord && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              Thẻ {currentCardIndex + 1} / {activeSublist.words.length}
            </span>
            <span>Bấm vào thẻ để lật mặt</span>
          </div>

          {/* Flashcard Frame */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[320px] p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 select-none flex flex-col justify-between relative shadow-lg group ${
              isFlipped
                ? isLight
                  ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-white border-amber-300'
                  : 'bg-gradient-to-br from-amber-950/40 via-orange-950/20 to-slate-900 border-amber-600/50'
                : isLight
                ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-xl'
            }`}
          >
            {/* Front of card */}
            {!isFlipped ? (
              <div className="my-auto text-center space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/15 text-amber-500">
                  {currentWord.pos}
                </span>

                <h3
                  className={`text-4xl md:text-5xl font-black tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {currentWord.word}
                </h3>

                <div className="flex items-center justify-center gap-2 font-mono text-sm text-slate-400">
                  <span>{currentWord.ipa}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/15 transition-colors"
                  >
                    <i className="fa-solid fa-volume-high" />
                  </button>
                </div>

                <div className="text-xs text-slate-400 pt-4 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-rotate text-[10px]" />
                  <span>Chạm để xem nghĩa tiếng Việt &amp; ví dụ học thuật</span>
                </div>
              </div>
            ) : (
              /* Back of card */
              <div className="space-y-4 my-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500 uppercase">
                    Định nghĩa &amp; Ngữ cảnh học thuật
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="p-1 rounded-lg text-amber-500 hover:bg-amber-500/15"
                  >
                    <i className="fa-solid fa-volume-high text-xs" />
                  </button>
                </div>

                <div>
                  <h4
                    className={`text-xl font-black ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {currentWord.meaning}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                    {currentWord.definition}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl text-xs space-y-1 ${
                    isLight ? 'bg-amber-100/50' : 'bg-black/25'
                  }`}
                >
                  <div className="font-bold text-amber-500 text-[10px] uppercase">
                    Ví dụ câu văn Cambridge:
                  </div>
                  <p
                    className={`leading-relaxed ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    "{currentWord.example}"
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-400">
                  <strong className="text-amber-500">Collocations:</strong> {currentWord.collocations}
                </div>
              </div>
            )}

            {/* Mastered Badge bottom right */}
            {masteredWords[currentWord.word] && (
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1">
                <i className="fa-solid fa-check text-[9px]" />
                <span>Đã thuộc</span>
              </div>
            )}
          </div>

          {/* Flashcard Controller Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="p-3 rounded-2xl border text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left" />
              <span>Từ trước</span>
            </button>

            <button
              onClick={() => toggleMastered(currentWord.word)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                masteredWords[currentWord.word]
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-check" />
              <span>
                {masteredWords[currentWord.word] ? 'Đã nhớ từ này' : 'Đánh dấu đã thuộc'}
              </span>
            </button>

            <button
              onClick={handleNextCard}
              className="p-3 rounded-2xl border text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <span>Từ tiếp</span>
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      )}

      {/* ─── MODE 2: TABLE LIST VIEW ─────────────────────────────────── */}
      {studyMode === 'list' && (
        <div
          className={`rounded-3xl border overflow-hidden ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {activeSublist.words.map((w) => {
              const isMastered = Boolean(masteredWords[w.word]);
              return (
                <div
                  key={w.word}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isMastered
                      ? isLight
                        ? 'bg-emerald-50/40'
                        : 'bg-emerald-950/10'
                      : isLight
                      ? 'hover:bg-slate-50'
                      : 'hover:bg-slate-850'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className={`text-base font-black ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {w.word}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {w.ipa}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/15 text-amber-500">
                        {w.pos}
                      </span>
                      <button
                        onClick={() => speakWord(w.word)}
                        className="text-slate-400 hover:text-amber-500 transition-colors"
                      >
                        <i className="fa-solid fa-volume-high text-xs" />
                      </button>
                    </div>

                    <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                      {w.meaning}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      "{w.example}"
                    </p>
                  </div>

                  <button
                    onClick={() => toggleMastered(w.word)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 self-end sm:self-center flex items-center gap-1.5 cursor-pointer ${
                      isMastered
                        ? 'bg-emerald-500 text-white'
                        : 'border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <i className="fa-solid fa-check text-[10px]" />
                    <span>{isMastered ? 'Đã thuộc' : 'Chưa thuộc'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
