import React, { useState, useEffect } from 'react';
import {
  IELTS_PLACEMENT_TEST,
  evaluateIeltsPlacementTest,
} from '../../data/ieltsPracticeData';
import { useUserStorage } from '../../hooks/useUserStorage';

export default function IELTSPlacementTest({ onApplyStartingWeek, theme = 'dark' }) {
  const isLight = theme === 'light';

  // State: 'intro' | 'testing' | 'result'
  const [testStage, setTestStage] = useState('intro');

  // Persistence: Saved Diagnostic Test Result
  const [savedResult, setSavedResult] = useUserStorage('ielts_diagnostic_result_v1', null);
  const [, setRecommendedStartWeek] = useUserStorage('ielts_recommended_start_week_v1', 1);

  // Active question index in test
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Countdown timer (25 minutes = 1500 seconds)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [passageFontSize, setPassageFontSize] = useState('large'); // 'normal' | 'large' | 'xlarge'

  // Active question
  const currentQ = IELTS_PLACEMENT_TEST.questions[currentQIndex];

  // Auto-open result if user already completed test before
  useEffect(() => {
    if (savedResult && testStage === 'intro') {
      // Keep intro but show "Xem kết quả lần trước"
    }
  }, [savedResult, testStage]);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (timerRunning && testStage === 'testing') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, testStage]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Start the test
  const handleStartTest = () => {
    setUserAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(25 * 60);
    setTimerRunning(true);
    setTestStage('testing');
  };

  // Select an answer
  const handleAnswerSelect = (option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  // Finish and compute diagnostic score
  const handleFinishTest = () => {
    setTimerRunning(false);
    const result = evaluateIeltsPlacementTest(userAnswers);
    result.testedDate = new Date().toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    setSavedResult(result);
    setRecommendedStartWeek(result.startingWeek);
    setTestStage('result');
  };

  // Speech TTS for listening questions
  const playAudioPrompt = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = IELTS_PLACEMENT_TEST.questions.length;
  const isAllAnswered = answeredCount === totalQuestions;

  return (
    <div className="space-y-6 font-sans">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── STAGE 1: INTRO SCREEN ───────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {testStage === 'intro' && (
        <div
          className={`p-6 md:p-10 rounded-3xl border shadow-lg ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <i className="fa-solid fa-crosshairs" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <span>Đánh Giá Chuẩn Xác • Tiết Kiệm Thời Gian Học</span>
            </div>

            <h2
              className={`text-2xl md:text-3xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Bài Test Đánh Giá Năng Lực Đầu Vào IELTS
            </h2>

            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Trước khi bước vào lộ trình 24 tuần, việc kiểm tra năng lực thực tế là bước bắt buộc để
              xác định chính xác bạn đang ở đâu. Bạn sẽ không bị bắt ép phải học lại những kiến thức
              mình đã nắm vững, đồng thời biết rõ lỗ hổng cần vá ngay để đạt <strong>Band 7.0+ Du học</strong>.
            </p>

            {/* Test Structure 4 Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
              {[
                { label: 'Listening', count: '6 câu', icon: 'fa-headphones', color: 'text-sky-400' },
                { label: 'Reading', count: '7 câu', icon: 'fa-book-open', color: 'text-emerald-400' },
                { label: 'Grammar', count: '6 câu', icon: 'fa-spell-check', color: 'text-purple-400' },
                { label: 'AWL Vocab', count: '6 câu', icon: 'fa-layer-group', color: 'text-amber-400' },
              ].map((sec, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <i className={`fa-solid ${sec.icon} ${sec.color} text-sm mb-1`} />
                  <div
                    className={`font-bold text-xs ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {sec.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{sec.count}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleStartTest}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-play text-xs" />
                <span>Bắt Đầu Làm Test (25 Phút)</span>
              </button>

              {savedResult && (
                <button
                  onClick={() => setTestStage('result')}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-chart-simple" />
                  <span>Xem Kết Quả Test Lần Trước (Band {savedResult.estimatedBand.toFixed(1)})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── STAGE 2: ACTIVE TESTING SCREEN ──────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {testStage === 'testing' && currentQ && (
        <div className="space-y-6">
          {/* Top Bar: Progress & Timer */}
          <div
            className={`p-4 md:p-5 rounded-3xl border flex items-center justify-between gap-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                {currentQIndex + 1}/{totalQuestions}
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  Section: {currentQ.skill}
                </span>
                <div className="text-xs text-slate-400 truncate">
                  Answered: {answeredCount}/{totalQuestions} questions
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 px-1 hidden sm:inline">Font:</span>
                <button
                  type="button"
                  title="Standard Font (16px)"
                  onClick={() => setPassageFontSize('normal')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    passageFontSize === 'normal'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aa
                </button>
                <button
                  type="button"
                  title="Large Font (18px)"
                  onClick={() => setPassageFontSize('large')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    passageFontSize === 'large'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aa+
                </button>
                <button
                  type="button"
                  title="Extra Large Font (20px)"
                  onClick={() => setPassageFontSize('xlarge')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    passageFontSize === 'xlarge'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Aa++
                </button>
              </div>

              {/* Timer */}
              <div
                className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-mono text-xs font-bold ${
                  timeLeft < 300
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-500 animate-pulse'
                    : isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <i className="fa-regular fa-clock" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Question Card Frame */}
          <div
            className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* If Listening: Audio Player Simulation */}
            {currentQ.audioText && (
              <div
                className={`p-4 md:p-5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isLight ? 'bg-sky-50 border-sky-200 text-sky-900' : 'bg-sky-950/20 border-sky-800/40 text-sky-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-headphones text-sky-500 text-lg" />
                  <div>
                    <span className="text-xs md:text-sm font-bold block">Listening Audio Prompt</span>
                    <span className="text-[11px] text-slate-400">Click to listen and select the best answer</span>
                  </div>
                </div>

                <button
                  onClick={() => playAudioPrompt(currentQ.audioText)}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs md:text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-volume-high text-sm" />
                  <span>Play Audio</span>
                </button>
              </div>
            )}

            {/* If Reading: Passage Excerpt */}
            {currentQ.passageExcerpt && (
              <div
                className={`p-5 md:p-7 rounded-3xl border-l-4 border-l-emerald-500 border shadow-xs transition-all ${
                  isLight ? 'bg-slate-50/90 border-slate-200 text-slate-900' : 'bg-slate-850/90 border-slate-750 text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-book-open-reader text-emerald-500 text-sm" />
                    <strong className="not-italic text-emerald-600 dark:text-emerald-400 font-bold uppercase text-xs md:text-sm tracking-wider">
                      Reading Passage Excerpt
                    </strong>
                  </div>
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    Read the excerpt carefully before answering
                  </span>
                </div>
                <div
                  className={`font-serif select-text leading-relaxed md:leading-loose tracking-wide ${
                    passageFontSize === 'xlarge'
                      ? 'text-lg md:text-xl'
                      : passageFontSize === 'large'
                      ? 'text-base md:text-lg'
                      : 'text-sm md:text-base md:text-[16.5px]'
                  }`}
                >
                  "{currentQ.passageExcerpt}"
                </div>
              </div>
            )}

            {/* Question Title */}
            <h3
              className={`font-bold leading-relaxed ${
                passageFontSize === 'xlarge'
                  ? 'text-lg md:text-xl'
                  : passageFontSize === 'large'
                  ? 'text-base md:text-lg'
                  : 'text-base md:text-[17px]'
              } ${isLight ? 'text-slate-900' : 'text-white'}`}
            >
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswerSelect(opt)}
                    className={`w-full text-left p-4 px-5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      passageFontSize === 'xlarge'
                        ? 'text-base md:text-lg'
                        : 'text-sm md:text-base'
                    } ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-md ring-2 ring-amber-500/30'
                        : isLight
                        ? 'bg-slate-50/90 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-100 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="leading-relaxed">{opt}</span>
                    {isSelected && <i className="fa-solid fa-circle-check text-sm text-slate-950 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((i) => i - 1)}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold border disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-xs" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {currentQIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((i) => i + 1)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next</span>
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTest}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                      isAllAnswered
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
                        : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    }`}
                  >
                    <i className="fa-solid fa-flag-checkered text-xs" />
                    <span>Submit &amp; View Results</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── STAGE 3: DIAGNOSTIC RESULT & PERSONALIZED PRESCRIPTION ──── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {testStage === 'result' && savedResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Result Hero Banner */}
          <div
            className={`p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
              isLight
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white border-amber-400'
                : 'bg-gradient-to-r from-amber-950/80 via-orange-950/60 to-slate-900 text-white border-amber-600/50'
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center lg:text-left">
                <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                  Kết Quả Đánh Giá Năng Lực Đầu Vào Chuẩn Xác
                </span>

                <h2 className="text-2xl md:text-3xl font-black">
                  Trình Độ Hiện Tại: Band {savedResult.estimatedBand.toFixed(1)}
                </h2>

                <p className="text-xs md:text-sm text-amber-100 max-w-xl leading-relaxed">
                  {savedResult.diagnosticSummary}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md font-bold">
                    Tổng điểm: {savedResult.score} / {savedResult.total} câu ({savedResult.percent}%)
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md font-bold text-amber-300">
                    Phân loại: {savedResult.bandLevel}
                  </span>
                </div>
              </div>

              {/* Personalized Starting Point Box */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[260px] shrink-0 shadow-lg">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200 mb-1">
                  Điểm Bắt Đầu Tối Ưu Nhất
                </div>
                <div className="text-3xl md:text-4xl font-black font-mono text-white mb-1">
                  Tuần {savedResult.startingWeek}
                </div>
                <div className="text-xs font-bold text-amber-300 mb-3">
                  {savedResult.skipWeeks > 0
                    ? `Tiết kiệm được ${savedResult.skipWeeks} tuần học!`
                    : 'Học chắc từng tuần từ đầu'}
                </div>

                <button
                  onClick={() => {
                    if (onApplyStartingWeek) {
                      onApplyStartingWeek(savedResult.startingWeek);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-950 font-bold text-xs hover:scale-105 transition-transform shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-arrow-trend-up text-amber-500 text-xs" />
                  <span>Bắt Đầu Từ Tuần {savedResult.startingWeek}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Skill Performance Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 'listening',
                label: 'Listening (Nghe)',
                icon: 'fa-headphones',
                color: 'text-sky-400',
                score: savedResult.sectionScores.listening.correct,
                total: savedResult.sectionScores.listening.total,
              },
              {
                id: 'reading',
                label: 'Reading (Đọc)',
                icon: 'fa-book-open',
                color: 'text-emerald-400',
                score: savedResult.sectionScores.reading.correct,
                total: savedResult.sectionScores.reading.total,
              },
              {
                id: 'grammar',
                label: 'Grammar (Ngữ pháp)',
                icon: 'fa-spell-check',
                color: 'text-purple-400',
                score: savedResult.sectionScores.grammar.correct,
                total: savedResult.sectionScores.grammar.total,
              },
              {
                id: 'vocab',
                label: 'Vocabulary (Từ vựng)',
                icon: 'fa-layer-group',
                color: 'text-amber-400',
                score: savedResult.sectionScores.vocab.correct,
                total: savedResult.sectionScores.vocab.total,
              },
            ].map((sec) => {
              const secPct = Math.round((sec.score / sec.total) * 100);
              return (
                <div
                  key={sec.id}
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold">
                      <i className={`fa-solid ${sec.icon} ${sec.color}`} />
                      <span>{sec.label}</span>
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {sec.score}/{sec.total}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${Math.max(8, secPct)}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 text-right font-mono">
                    Độ chính xác: {secPct}%
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strategic Action Plan for Study Abroad */}
          <div
            className={`p-6 rounded-3xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bullseye text-rose-500 text-base" />
              <h3
                className={`font-bold text-sm md:text-base ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Hành Động Trọng Tâm Cần Thực Hiện Ngay:
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {savedResult.priorityFocus}
            </p>

            <div className="pt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Đã kiểm tra vào: {savedResult.testedDate}</span>
              <button
                onClick={handleStartTest}
                className="px-3.5 py-1.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-rotate-right text-[10px]" />
                <span>Làm Lại Bài Test Đánh Giá</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
