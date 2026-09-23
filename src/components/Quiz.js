import React, { useState, useMemo } from 'react';
import { getQuestionExplanation } from '../utils/quizExplanationEngine';
import { EXERCISE_FORMATS, FORMAT_LABELS } from '../data/grammarExercisesMaster';

// Normalizes text for lenient checking (ignoring trailing punctuation & casing)
function normalizeAnswer(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()?'"]+|[.,/#!$%^&*;:{}=\-_`~()?'"]+$/g, '')
    .replace(/\s+/g, ' ');
}

// Checks if user's answer is correct for any of the 4 formats
function checkQuestionCorrectness(q, userAns) {
  if (userAns === undefined || userAns === null || userAns === '') return false;
  const fmt = q.format || 'multiple-choice';

  if (fmt === 'multiple-choice') {
    return userAns === q.correct;
  }

  if (fmt === 'fill-in-blank') {
    const u = normalizeAnswer(userAns);
    const t = normalizeAnswer(q.target);
    if (u === t) return true;
    if (Array.isArray(q.acceptable)) {
      return q.acceptable.some((acc) => normalizeAnswer(acc) === u);
    }
    return false;
  }

  if (fmt === 'error-identification') {
    return userAns === q.incorrectIdx;
  }

  if (fmt === 'sentence-unscramble') {
    const assembled = Array.isArray(userAns) ? userAns.join(' ') : String(userAns);
    return normalizeAnswer(assembled) === normalizeAnswer(q.targetSentence);
  }

  return false;
}

const Quiz = ({
  currentLesson,
  quizState,
  quizSubmitted,
  handleOptionSelect,
  submitQuiz,
  resetQuiz,
  theme,
}) => {
  const isLight = theme === 'light';

  // Selected format filter: 'all' | 'multiple-choice' | 'fill-in-blank' | 'error-identification' | 'sentence-unscramble'
  const [selectedFormat, setSelectedFormat] = useState(EXERCISE_FORMATS.ALL);

  // Question limit filter: '5' | '10' | 'all'
  const [questionLimit, setQuestionLimit] = useState('all');

  // Revealed hints for fill-in-the-blank questions: { [qIdx]: true }
  const [revealedHints, setRevealedHints] = useState({});

  const lessonId = currentLesson?.id || '1';
  const currentLessonState = (currentLesson && quizState[lessonId]) || {};
  const isSubmitted = currentLesson ? quizSubmitted[lessonId] : false;

  const allQuestions = useMemo(() => {
    return (currentLesson && currentLesson.questions) || [];
  }, [currentLesson]);

  // Count questions per format for filter badges
  const formatCounts = useMemo(() => {
    const counts = {
      [EXERCISE_FORMATS.ALL]: allQuestions.length,
      [EXERCISE_FORMATS.MULTIPLE_CHOICE]: 0,
      [EXERCISE_FORMATS.FILL_IN_BLANK]: 0,
      [EXERCISE_FORMATS.ERROR_IDENTIFICATION]: 0,
      [EXERCISE_FORMATS.SENTENCE_UNSCRAMBLE]: 0,
    };
    allQuestions.forEach((q) => {
      const fmt = q.format || EXERCISE_FORMATS.MULTIPLE_CHOICE;
      if (counts[fmt] !== undefined) counts[fmt]++;
    });
    return counts;
  }, [allQuestions]);

  // Questions filtered by format and question limit
  const displayedQuestions = useMemo(() => {
    let list = allQuestions;
    if (selectedFormat !== EXERCISE_FORMATS.ALL) {
      list = list.filter((q) => (q.format || EXERCISE_FORMATS.MULTIPLE_CHOICE) === selectedFormat);
    }
    if (questionLimit === '5') return list.slice(0, 5);
    if (questionLimit === '10') return list.slice(0, 10);
    return list;
  }, [allQuestions, selectedFormat, questionLimit]);

  if (!currentLesson || allQuestions.length === 0) {
    return null;
  }

  // Calculate scores
  const correctCount = displayedQuestions.filter((q, idx) =>
    checkQuestionCorrectness(q, currentLessonState[idx])
  ).length;

  const answeredCount = displayedQuestions.filter(
    (q, idx) => currentLessonState[idx] !== undefined && currentLessonState[idx] !== ''
  ).length;

  const totalQuestions = displayedQuestions.length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const answeredPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Speak full sentence for listening feedback
  const speakSentence = (text) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  return (
    <div
      className={`mt-10 rounded-3xl border p-5 md:p-8 transition-all shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}
    >
      {/* ─── QUIZ HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-graduation-cap" />
            </span>
            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
              Luyện Tập Toàn Diện & Ghi Nhớ Sâu
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono border border-blue-500/30">
              {allQuestions.length} câu hỏi • 4 dạng bài
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Luyện tập đa chiều: Trắc nghiệm, Điền từ, Tìm lỗi sai (TOEIC) và Sắp xếp câu để làm chủ hoàn toàn chủ điểm này.
          </p>
        </div>

        {/* Action button: Reset quiz */}
        {isSubmitted && (
          <button
            onClick={() => {
              resetQuiz(lessonId);
              setRevealedHints({});
            }}
            className="px-4 py-2 rounded-2xl text-xs font-black text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-750 transition flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer self-start lg:self-auto"
          >
            <i className="fa-solid fa-rotate-right text-xs" />
            <span>Reset Quiz</span>
          </button>
        )}
      </div>

      {/* ─── FORMAT FILTER TABS ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Format Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {Object.values(EXERCISE_FORMATS).map((fmt) => {
            const conf = FORMAT_LABELS[fmt];
            const count = formatCounts[fmt] || 0;
            if (fmt !== EXERCISE_FORMATS.ALL && count === 0) return null;
            const active = selectedFormat === fmt;

            return (
              <button
                key={fmt}
                type="button"
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                  active
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : isLight
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                }`}
              >
                <i className={`fa-solid ${conf.icon} text-[11px]`} />
                <span>{conf.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Question Limit Pills */}
        {!isSubmitted && (
          <div className="flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setQuestionLimit('5')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                questionLimit === '5'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              5 Quick
            </button>
            {totalQuestions > 5 && (
              <button
                type="button"
                onClick={() => setQuestionLimit('10')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                  questionLimit === '10'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                10 Questions
              </button>
            )}
            <button
              type="button"
              onClick={() => setQuestionLimit('all')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                questionLimit === 'all'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All ({displayedQuestions.length})
            </button>
          </div>
        )}
      </div>

      {/* ─── PROGRESS BAR ────────────────────────────────────────────────────── */}
      {!isSubmitted && (
        <div className="mb-6 space-y-1.5 bg-slate-50 dark:bg-slate-850 p-3 px-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
            <span>
              Progress: <strong className="text-blue-600 dark:text-blue-400">{answeredCount}</strong> / {totalQuestions} answered
            </span>
            <span>{answeredPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-750 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${answeredPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* ─── QUESTION LIST ───────────────────────────────────────────────────── */}
      <div className="space-y-6">
        {displayedQuestions.map((q, idx) => {
          const fmt = q.format || EXERCISE_FORMATS.MULTIPLE_CHOICE;
          const userAns = currentLessonState[idx];
          const isCorrect = checkQuestionCorrectness(q, userAns);

          return (
            <div
              key={q.id || idx}
              className={`p-4 md:p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-slate-50/50 border-slate-200' : 'bg-slate-850/60 border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-3">
                <span className="shrink-0 text-xs font-black text-slate-400 mt-0.5 w-6 h-6 rounded-xl bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center font-mono">
                  {idx + 1}
                </span>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                      <i className={`fa-solid ${FORMAT_LABELS[fmt]?.icon || 'fa-question'}`} />
                      <span>{FORMAT_LABELS[fmt]?.label || 'Trắc nghiệm'}</span>
                    </span>

                    {q.hint && (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium">
                        <i className="fa-solid fa-lightbulb text-[10px]" />
                        <span>Hint: {q.hint}</span>
                      </span>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <p className={`text-sm md:text-base font-bold leading-relaxed ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                    {(q.q || q.sentence || q.targetSentence || '').replace(/^\s*\d+[.:)\s]+\s*/, '')}
                  </p>
                </div>
              </div>

              {/* ─── FORMAT 1: MULTIPLE CHOICE ─────────────────────────────────── */}
              {fmt === EXERCISE_FORMATS.MULTIPLE_CHOICE && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 sm:pl-9">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns === optIdx;
                    const isOptCorrect = q.correct === optIdx;

                    let btnStyle = isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

                    if (isSelected) {
                      btnStyle = isLight
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                        : 'bg-blue-950/40 border-blue-500 text-blue-200 font-bold';
                    }

                    if (isSubmitted) {
                      if (isOptCorrect) {
                        btnStyle = isLight
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                          : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle = isLight
                          ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                          : 'bg-rose-950/40 border-rose-500 text-rose-200 font-bold';
                      } else {
                        btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800 grayscale cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleOptionSelect(lessonId, idx, optIdx)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs font-semibold transition cursor-pointer ${btnStyle}`}
                      >
                        <span className="flex-1">{opt}</span>
                        {isSubmitted && isOptCorrect && (
                          <i className="fa-solid fa-circle-check text-emerald-500 text-sm ml-2" />
                        )}
                        {isSubmitted && isSelected && !isOptCorrect && (
                          <i className="fa-solid fa-circle-xmark text-rose-500 text-sm ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ─── FORMAT 2: FILL IN THE BLANK ──────────────────────────────── */}
              {fmt === EXERCISE_FORMATS.FILL_IN_BLANK && (
                <div className="pl-0 sm:pl-9 space-y-2">
                  <div className="flex items-center gap-2 max-w-lg">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={userAns || ''}
                      onChange={(e) => handleOptionSelect(lessonId, idx, e.target.value)}
                      placeholder="Type the word or correct verb form..."
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-xs md:text-sm font-semibold transition outline-none ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 font-bold'
                            : 'bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200 font-bold'
                          : isLight
                          ? 'bg-white border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          : 'bg-slate-900 border-slate-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />

                    {!isSubmitted && (
                      <button
                        type="button"
                        onClick={() => {
                          setRevealedHints((prev) => ({ ...prev, [idx]: true }));
                          const hintChar = (q.target || '')[0] || '';
                          if (!userAns) handleOptionSelect(lessonId, idx, hintChar);
                        }}
                        className="px-3 py-2.5 rounded-xl text-xs font-bold text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition cursor-pointer shrink-0"
                        title="Show first letter hint"
                      >
                        <i className="fa-solid fa-wand-magic-sparkles text-[11px]" />
                        <span className="hidden sm:inline ml-1">Hint</span>
                      </button>
                    )}
                  </div>

                  {revealedHints[idx] && !isSubmitted && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                      💡 Starting letter: <strong>"{(q.target || '')[0]}"</strong> ({q.target?.length || 0} letters)
                    </p>
                  )}
                </div>
              )}

              {/* ─── FORMAT 3: ERROR IDENTIFICATION ───────────────────────────── */}
              {fmt === EXERCISE_FORMATS.ERROR_IDENTIFICATION && q.segments && (
                <div className="pl-0 sm:pl-9 space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Click on the underlined segment that contains a grammatical error:
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {q.segments.map((seg, segIdx) => {
                      const label = String.fromCharCode(65 + segIdx); // A, B, C, D
                      const isSegSelected = userAns === segIdx;
                      const isSegTheError = q.incorrectIdx === segIdx;

                      let segStyle = isLight
                        ? 'bg-white border-slate-300 text-slate-800 hover:border-blue-400'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-blue-400';

                      if (isSegSelected) {
                        segStyle = 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-500/30';
                      }

                      if (isSubmitted) {
                        if (isSegTheError) {
                          segStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                        } else if (isSegSelected) {
                          segStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                        } else {
                          segStyle = 'opacity-40 border-slate-300 dark:border-slate-800 grayscale cursor-not-allowed';
                        }
                      }

                      return (
                        <button
                          key={segIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleOptionSelect(lessonId, idx, segIdx)}
                          className={`px-3.5 py-2 rounded-xl border text-xs md:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${segStyle}`}
                        >
                          <span className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[10px] font-black font-mono">
                            {label}
                          </span>
                          <span className="underline underline-offset-4 decoration-2">{seg}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── FORMAT 4: SENTENCE UNSCRAMBLE ────────────────────────────── */}
              {fmt === EXERCISE_FORMATS.SENTENCE_UNSCRAMBLE && q.tokens && (
                <div className="pl-0 sm:pl-9 space-y-3">
                  {/* Word Tray (Selected sentence) */}
                  <div
                    className={`p-3.5 rounded-2xl border min-h-[50px] flex items-center gap-1.5 flex-wrap ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50/70 border-emerald-400 dark:bg-emerald-950/30'
                          : 'bg-rose-50/70 border-rose-400 dark:bg-rose-950/30'
                        : isLight
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    {Array.isArray(userAns) && userAns.length > 0 ? (
                      userAns.map((tok, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => {
                            const next = [...userAns];
                            next.splice(tIdx, 1);
                            handleOptionSelect(lessonId, idx, next);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-2xs hover:bg-rose-600 transition cursor-pointer flex items-center gap-1"
                        >
                          <span>{tok}</span>
                          {!isSubmitted && <i className="fa-solid fa-xmark text-[10px] opacity-70" />}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Click words below in the correct order to assemble the sentence...
                      </span>
                    )}
                  </div>

                  {/* Word Bank Chips */}
                  {!isSubmitted && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {q.tokens.map((tok, tIdx) => {
                        const countInAns = (Array.isArray(userAns) ? userAns : []).filter((w) => w === tok).length;
                        const countInTokens = q.tokens.filter((w) => w === tok).length;
                        const isUsed = countInAns >= countInTokens;

                        return (
                          <button
                            key={tIdx}
                            type="button"
                            disabled={isUsed}
                            onClick={() => {
                              const curr = Array.isArray(userAns) ? [...userAns] : [];
                              curr.push(tok);
                              handleOptionSelect(lessonId, idx, curr);
                            }}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                              isUsed
                                ? 'opacity-25 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                                : isLight
                                ? 'bg-white hover:bg-blue-50 text-slate-700 border-slate-200 shadow-2xs hover:border-blue-400'
                                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                            }`}
                          >
                            {tok}
                          </button>
                        );
                      })}

                      {Array.isArray(userAns) && userAns.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleOptionSelect(lessonId, idx, [])}
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-400 hover:text-rose-500 transition cursor-pointer"
                        >
                          <i className="fa-solid fa-rotate-left mr-1" />
                          Reset Order
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ─── EXPLANATION & PEDAGOGICAL FEEDBACK (When submitted) ──────── */}
              {isSubmitted && (
                <div
                  className={`mt-4 ml-0 sm:ml-9 p-4 rounded-2xl border text-xs leading-relaxed space-y-2.5 transition-all shadow-2xs ${
                    isCorrect
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/25 border-emerald-300/80 dark:border-emerald-900/60 text-slate-800 dark:text-slate-200'
                      : 'bg-rose-50/90 dark:bg-rose-950/25 border-rose-300/80 dark:border-rose-900/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {/* Status Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="font-black text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <i className="fa-solid fa-circle-check text-sm" />
                          <span>Correct! Excellent work.</span>
                        </span>
                      ) : (
                        <span className="font-black text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                          <i className="fa-solid fa-circle-xmark text-sm" />
                          <span>
                            {fmt === EXERCISE_FORMATS.FILL_IN_BLANK && (
                              <>Correct answer: <strong>"{q.target}"</strong> {q.acceptable ? `(or ${q.acceptable.join(', ')})` : ''}</>
                            )}
                            {fmt === EXERCISE_FORMATS.ERROR_IDENTIFICATION && (
                              <>Error found: <strong>[{q.segments[q.incorrectIdx]}]</strong> ➔ Correction: <strong>"{q.correction}"</strong></>
                            )}
                            {fmt === EXERCISE_FORMATS.SENTENCE_UNSCRAMBLE && (
                              <>Correct sentence: <strong>"{q.targetSentence}"</strong></>
                            )}
                            {fmt === EXERCISE_FORMATS.MULTIPLE_CHOICE && (
                              <>Correct answer: <strong>"{q.options[q.correct]}"</strong></>
                            )}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Audio pronounce complete sentence */}
                    <button
                      type="button"
                      onClick={() => {
                        const textToSpeak =
                          q.targetSentence ||
                          (q.q ? q.q.replace(/____+/, q.target || (q.options && q.options[q.correct]) || '') : '');
                        speakSentence(textToSpeak);
                      }}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                      title="Nghe phát âm câu đúng"
                    >
                      <i className="fa-solid fa-volume-high text-[10px]" />
                      <span>Nghe phát âm</span>
                    </button>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-lightbulb text-amber-500 text-xs mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-extrabold text-slate-900 dark:text-white">
                        Giải thích quy tắc:{' '}
                      </strong>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {q.explain || getQuestionExplanation(q, currentLesson, userAns)}
                      </span>
                    </div>
                  </div>

                  {/* Ask AI Trigger */}
                  <div className="flex justify-end pt-1 border-t border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent('open-ai-assistant', {
                            detail: {
                              query: `Giải thích chi tiết hơn giúp mình bài tập này: "${q.q || q.sentence || q.targetSentence}". Đáp án là "${q.target || q.correction || q.targetSentence || (q.options && q.options[q.correct])}", tại sao lại như vậy và lưu ý ngữ pháp là gì?`,
                            },
                          })
                        );
                      }}
                      className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-solid fa-robot text-xs" />
                      <span>Chưa hiểu rõ? Bấm để hỏi Trợ Lý AI về câu này ➔</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── SUBMIT / RESULTS FOOTER ─────────────────────────────────────────── */}
      {!isSubmitted ? (
        <button
          type="button"
          onClick={() => submitQuiz(lessonId, scorePercent, currentLessonState)}
          disabled={answeredCount === 0}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold text-xs shadow-md disabled:opacity-30 transition flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-98"
        >
          <i className="fa-solid fa-check" />
          <span>Check Answers ({answeredCount}/{totalQuestions} completed) & Save Progress</span>
        </button>
      ) : (
        <div
          className={`mt-6 p-5 rounded-2xl border flex items-center justify-between ${
            scorePercent >= 70
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <i
                className={`fa-solid ${
                  scorePercent >= 70 ? 'fa-circle-check text-emerald-500' : 'fa-circle-info text-amber-500'
                } text-base`}
              />
              <span className="text-sm font-black">
                Kết quả: {correctCount}/{totalQuestions} câu đúng ({scorePercent}%)
              </span>
            </div>
            <span className="text-xs font-medium opacity-80 mt-1 block">
              {scorePercent >= 80
                ? '🎉 Hoàn thành xuất sắc! Bài học đã được tự động đánh dấu Đã nhớ.'
                : scorePercent >= 50
                ? '👍 Đã nắm vững các quy tắc cốt lõi.'
                : '📚 Bạn nên xem lại phần lý thuyết và ví dụ minh họa bên trên nhé.'}
            </span>
          </div>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
            {scorePercent}%
          </span>
        </div>
      )}
    </div>
  );
};

export default Quiz;