import React, { useState, useEffect, useRef } from 'react';
import { IELTS_LISTENING_TESTS } from '../../data/ieltsPracticeData';
import { useUserStorage } from '../../hooks/useUserStorage';

export default function IELTSListeningLab({ theme = 'dark' }) {
  const isLight = theme === 'light';

  const [selectedTestId, setSelectedTestId] = useState(IELTS_LISTENING_TESTS[0].id);
  const activeTest =
    IELTS_LISTENING_TESTS.find((t) => t.id === selectedTestId) || IELTS_LISTENING_TESTS[0];

  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Persistence: User listening scores { [testId]: { score, total, band, date } }
  const [, setListeningScores] = useUserStorage('ielts_listening_scores_v1', {});

  // Audio Playback state (TTS)
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const utteranceRef = useRef(null);

  // Reset when test changes
  useEffect(() => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowTranscript(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [selectedTestId]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (!window.speechSynthesis) {
      alert('Trình duyệt của bạn không hỗ trợ phát âm thanh Web Speech.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(activeTest.audioScript);
    utter.rate = playbackSpeed;
    utter.lang = 'en-GB';

    // Find British or English voice
    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find(
      (v) => v.lang.includes('en-GB') || v.lang.includes('en_GB') || v.name.includes('UK')
    );
    if (gbVoice) utter.voice = gbVoice;

    utter.onend = () => setIsPlaying(false);
    utter.onerror = () => setIsPlaying(false);

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
    setIsPlaying(true);
  };

  const handleSelectAnswer = (qId, option) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let score = 0;
    activeTest.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) score += 1;
    });

    const total = activeTest.questions.length;
    let band = 5.0;
    const pct = score / total;
    if (pct >= 0.9) band = 8.0;
    else if (pct >= 0.8) band = 7.5;
    else if (pct >= 0.65) band = 7.0;
    else if (pct >= 0.5) band = 6.5;
    else if (pct >= 0.35) band = 6.0;

    setListeningScores((prev) => ({
      ...prev,
      [activeTest.id]: {
        score,
        total,
        band,
        date: new Date().toISOString(),
      },
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Score computation
  const correctCount = activeTest.questions.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;
  const totalCount = activeTest.questions.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  return (
    <div id="ielts-listening-lab-root" className="space-y-6 animate-fadeIn">
      {/* ─── 1. HEADER & TEST PICKER ───────────────────────────────── */}
      <div
        className={`p-6 rounded-3xl border ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500 text-white">
                Listening Lab
              </span>
              <span className="text-xs font-bold text-sky-500 font-mono">
                Cambridge Real Audio
              </span>
            </div>
            <h2
              className={`text-xl md:text-2xl font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Phòng Luyện Nghe IELTS Cambridge (Listening Lab)
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Luyện nghe các dạng đề thi thật từ bộ Cambridge 12 - 19: Bắt âm chính tả tên riêng, bẫy
              số tiền, thời gian và thảo luận học thuật.
            </p>
          </div>

          {/* Test Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {IELTS_LISTENING_TESTS.map((t) => {
              const active = t.id === selectedTestId;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTestId(t.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-sky-600 text-white shadow-md'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <i className="fa-solid fa-headphones text-xs mr-1.5" />
                  <span>{t.cambridgeBook}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── AUDIO PLAYER BAR ────────────────────────────────────── */}
        <div
          className={`mt-6 p-4 md:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isLight ? 'bg-sky-50/80 border-sky-200 text-sky-950' : 'bg-sky-950/30 border-sky-800/60 text-sky-100'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <button
              onClick={handlePlayAudio}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-500'
              }`}
              title={isPlaying ? 'Dừng phát âm thanh' : 'Bấm để nghe đoạn hội thoại'}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-0.5'}`} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono">
                  {isPlaying ? 'Đang phát âm thanh Cambridge...' : 'Bấm Play để bắt đầu nghe'}
                </span>
                {isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                {activeTest.scenario}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-white/70 dark:bg-slate-900/80 p-1 rounded-xl border border-sky-200 dark:border-sky-800 text-xs font-bold">
              {[0.9, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    setPlaybackSpeed(spd);
                    if (isPlaying) {
                      window.speechSynthesis.cancel();
                      setIsPlaying(false);
                    }
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    playbackSpeed === spd
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Transcript Toggle */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                showTranscript
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : isLight
                  ? 'bg-white border-sky-300 text-sky-800 hover:bg-sky-100'
                  : 'bg-slate-900 border-sky-700 text-sky-300 hover:bg-slate-800'
              }`}
            >
              <i className="fa-solid fa-file-lines text-xs" />
              <span>{showTranscript ? 'Ẩn Audio Script' : 'Xem Audio Script'}</span>
            </button>
          </div>
        </div>

        {/* Audio Script Drawer */}
        {showTranscript && (
          <div
            className={`mt-4 p-5 rounded-2xl border text-xs md:text-sm font-serif leading-relaxed whitespace-pre-line animate-fadeIn ${
              isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-slate-850 border-slate-750 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-sans text-xs font-bold mb-2 text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-closed-captioning" />
                Audio Script (Bản ghi âm thanh chi tiết):
              </span>
              <span className="text-[11px] font-normal">Dùng để kiểm tra bẫy sau khi nghe</span>
            </div>
            {activeTest.audioScript}
          </div>
        )}
      </div>

      {/* ─── 2. SCORE BANNER (IF SUBMITTED) ────────────────────────── */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn ${
            percentage >= 70
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
              {correctCount}/{totalCount}
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Kết Quả Bài Luyện Nghe: {percentage}% Chính Xác
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {percentage >= 80
                  ? 'Tuyệt vời! Bạn có phản xạ bắt âm và tránh bẫy distractor rất tốt.'
                  : 'Hãy xem kỹ các câu sai và đọc Audio Script để ghi nhận bẫy chính tả/con số vào Notebook.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <i className="fa-solid fa-rotate-right text-xs" />
            <span>Làm Lại Bài Này</span>
          </button>
        </div>
      )}

      {/* ─── 3. QUESTIONS LIST ─────────────────────────────────────── */}
      <div className="space-y-4">
        {activeTest.questions.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-5 md:p-6 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? isLight
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-emerald-950/20 border-emerald-700/60'
                    : isLight
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-rose-950/20 border-rose-700/60'
                  : isLight
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-500 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4
                    className={`text-sm md:text-base font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {q.question}
                  </h4>
                </div>

                {isSubmitted && (
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}`} />
                    <span>{isCorrect ? 'Chính xác' : 'Sai'}</span>
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {q.options.map((opt) => {
                  const isOptSelected = selected === opt;
                  const isRightOpt = opt === q.correctAnswer;

                  let optClass = isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800';

                  if (isSubmitted) {
                    if (isRightOpt) {
                      optClass = 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-sm';
                    } else if (isOptSelected && !isRightOpt) {
                      optClass = 'bg-rose-500 text-white line-through border-rose-500';
                    }
                  } else if (isOptSelected) {
                    optClass = 'bg-sky-600 text-white font-bold border-sky-600 shadow-md';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectAnswer(q.id, opt)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 px-4 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${optClass}`}
                    >
                      <span>{opt}</span>
                      {isOptSelected && !isSubmitted && (
                        <i className="fa-solid fa-check text-xs text-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {isSubmitted && q.explanation && (
                <div
                  className={`mt-3 p-3 rounded-xl text-xs leading-relaxed border ${
                    isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <strong className="text-sky-500 mr-1">Giải thích bẫy:</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── 4. SUBMIT ACTION BAR ───────────────────────────────────── */}
      {!isSubmitted && (
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length === 0}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-sky-500/25 disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-paper-plane text-xs" />
            <span>Chấm Điểm Bài Nghe</span>
          </button>
        </div>
      )}
    </div>
  );
}
