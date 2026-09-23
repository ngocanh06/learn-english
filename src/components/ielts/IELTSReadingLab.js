import React, { useState, useEffect, useMemo } from 'react';
import { IELTS_READING_TESTS } from '../../data/ieltsPracticeData';
import { useUserStorage } from '../../hooks/useUserStorage';
import { calculateIeltsBand } from '../../data/ieltsAcademicRoadmap';

export default function IELTSReadingLab({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // State: selected test
  const [selectedTestId, setSelectedTestId] = useState(IELTS_READING_TESTS[0]?.id || '');
  const activeTest = useMemo(() => {
    return IELTS_READING_TESTS.find((t) => t.id === selectedTestId) || IELTS_READING_TESTS[0];
  }, [selectedTestId]);

  // User answers map: { [questionId]: string }
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Persistent user scores map: { [testId]: { score: number, total: number, date: string } }
  const [, setReadingScores] = useUserStorage('ielts_reading_scores_v1', {});

  // Timer: 20 minutes (1200 seconds)
  const [timeLeft, setTimeLeft] = useState((activeTest?.timeAllowed || 20) * 60);
  const [timerRunning, setTimerRunning] = useState(true);
  const [passageFontSize, setPassageFontSize] = useState('large'); // 'normal' | 'large' | 'xlarge'

  // Reset when test changes
  useEffect(() => {
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeLeft((activeTest?.timeAllowed || 20) * 60);
    setTimerRunning(true);
  }, [selectedTestId, activeTest]);

  // Countdown effect
  useEffect(() => {
    if (!timerRunning || isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isSubmitted, timeLeft]);

  // Format time mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Select an answer
  const handleSelectAnswer = (qId, option) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  // Calculate score
  const { correctCount, totalQuestions, percentage, estimatedBand } = useMemo(() => {
    if (!activeTest) return { correctCount: 0, totalQuestions: 0, percentage: 0, estimatedBand: 0 };
    let correct = 0;
    activeTest.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });
    const total = activeTest.questions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    // Scale to standard 40-question scale for band approximation
    const scaledCount = Math.round((correct / total) * 40);
    const bandInfo = calculateIeltsBand('reading', scaledCount);

    return {
      correctCount: correct,
      totalQuestions: total,
      percentage: pct,
      estimatedBand: bandInfo.band,
    };
  }, [activeTest, userAnswers]);

  // Submit test
  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimerRunning(false);

    // Persist score
    setReadingScores((prev) => ({
      ...prev,
      [selectedTestId]: {
        score: correctCount,
        total: totalQuestions,
        percent: percentage,
        band: estimatedBand,
        date: new Date().toLocaleDateString('vi-VN'),
      },
    }));
  };

  // Reset test to redo
  const handleRedo = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeLeft((activeTest?.timeAllowed || 20) * 60);
    setTimerRunning(true);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ─── HEADER & CONTROLS ───────────────────────────────────────── */}
      <div
        className={`p-5 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-book-open" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-500">
                Cambridge Reading Lab
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeTest.category}
              </span>
            </div>
            <h2
              className={`text-base md:text-lg font-bold truncate max-w-md ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {activeTest.title}
            </h2>
          </div>
        </div>

        {/* Test Selector & Timer & Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {/* Test Selector Dropdown */}
          <select
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                : 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
            }`}
          >
            {IELTS_READING_TESTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title.split(':')[0]} ({t.questions.length} câu)
              </option>
            ))}
          </select>

          {/* Countdown Timer */}
          <div
            className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-mono text-xs font-bold ${
              timeLeft < 300 && !isSubmitted
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-500 animate-pulse'
                : isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <i className="fa-regular fa-clock" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Submit / Redo Button */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              <span>Nộp Bài Chấm Điểm</span>
            </button>
          ) : (
            <button
              onClick={handleRedo}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-rotate-right text-xs" />
              <span>Làm Lại Đề Này</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── RESULTS BANNER (WHEN SUBMITTED) ─────────────────────────── */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-3xl border shadow-lg transition-all animate-fadeIn ${
            isLight
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-300'
              : 'bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border-emerald-700/50'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 text-xs font-bold uppercase">
                <i className="fa-solid fa-circle-check" />
                <span>Kết Quả Đọc Hiểu Cambridge Academic</span>
              </div>
              <h3
                className={`text-xl font-black ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Bạn trả lời đúng {correctCount} / {totalQuestions} câu ({percentage}%)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Đối chiếu lời giải chi tiết và vị trí đoạn văn trích dẫn ở cột bên phải để nắm bắt bẫy Paraphrase.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-center p-3 px-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[10px] font-bold uppercase text-emerald-500">Ước tính Band</div>
                <div className="text-3xl font-black font-mono text-emerald-500">
                  {estimatedBand.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SPLIT-VIEW: PASSAGE (LEFT) VS QUESTIONS (RIGHT) ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: READING PASSAGE TEXT (7 cols) */}
        <div
          className={`lg:col-span-7 p-6 rounded-3xl border max-h-[750px] overflow-y-auto ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-inherit z-10">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-file-lines text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Academic Reading Passage
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ~700 words • Cambridge
              </span>

              {/* Font Size Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  title="Cỡ chữ chuẩn (15px)"
                  onClick={() => setPassageFontSize('normal')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    passageFontSize === 'normal'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aa
                </button>
                <button
                  type="button"
                  title="Cỡ chữ lớn (17px)"
                  onClick={() => setPassageFontSize('large')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    passageFontSize === 'large'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aa+
                </button>
                <button
                  type="button"
                  title="Cỡ chữ rất lớn (19px)"
                  onClick={() => setPassageFontSize('xlarge')}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    passageFontSize === 'xlarge'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aa++
                </button>
              </div>
            </div>
          </div>

          <div
            className={`prose max-w-none font-serif leading-relaxed md:leading-loose whitespace-pre-line tracking-wide select-text ${
              passageFontSize === 'xlarge'
                ? 'text-lg md:text-xl'
                : passageFontSize === 'large'
                ? 'text-base md:text-lg'
                : 'text-sm md:text-base md:text-[16px]'
            } ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}
          >
            {activeTest.passage}
          </div>
        </div>

        {/* RIGHT COLUMN: QUESTIONS & EXPLANATIONS (5 cols) */}
        <div className="lg:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-1">
          <div
            className={`p-4 rounded-2xl border sticky top-0 z-10 flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-750'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Danh Sách Câu Hỏi ({activeTest.questions.length} câu)
            </span>
            <span className="text-xs font-mono font-bold text-emerald-500">
              Đã làm: {Object.keys(userAnswers).length}/{activeTest.questions.length}
            </span>
          </div>

          {activeTest.questions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  isSubmitted
                    ? isCorrect
                      ? isLight
                        ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300'
                        : 'bg-emerald-950/20 border-emerald-700/60 ring-1 ring-emerald-700/40'
                      : isLight
                      ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-300'
                      : 'bg-rose-950/20 border-rose-700/60 ring-1 ring-rose-700/40'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-mono font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500">
                      {q.type === 'TFNG' ? 'True / False / Not Given' : 'Multiple Choice'}
                    </span>
                  </div>

                  {isSubmitted && (
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      <i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}`} />
                      <span>{isCorrect ? 'ĐÚNG' : 'SAI'}</span>
                    </span>
                  )}
                </div>

                {/* Question Prompt */}
                <p
                  className={`text-xs md:text-sm font-bold mb-3 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt;
                    const isTheCorrectAnswer = q.correctAnswer === opt;

                    let optStyle = isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800';

                    if (isSelected) {
                      optStyle = 'bg-blue-600 border-blue-500 text-white font-bold';
                    }

                    if (isSubmitted) {
                      if (isTheCorrectAnswer) {
                        optStyle = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                      } else if (isSelected && !isTheCorrectAnswer) {
                        optStyle = 'bg-rose-600 border-rose-500 text-white line-through';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`w-full text-left p-2.5 px-3.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {isSelected && !isSubmitted && (
                          <i className="fa-solid fa-circle-check text-xs" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation when submitted */}
                {isSubmitted && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-500 text-[11px]">
                      <i className="fa-solid fa-lightbulb" />
                      <span>Vị trí: {q.paragraph}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
