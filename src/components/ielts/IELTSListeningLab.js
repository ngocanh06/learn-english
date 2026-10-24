import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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

  // Parse dialogue lines into turns: { id, speaker, text, raw }
  const scriptLines = useMemo(() => {
    if (!activeTest?.audioScript) return [];
    return activeTest.audioScript
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, idx) => {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0 && colonIdx < 35) {
          return {
            id: idx,
            speaker: line.substring(0, colonIdx).trim(),
            text: line.substring(colonIdx + 1).trim(),
            raw: line,
          };
        }
        return { id: idx, speaker: 'Narrator', text: line, raw: line };
      });
  }, [activeTest]);

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const isCancelledRef = useRef(false);
  const timerRef = useRef(null);
  const activeUtteranceRef = useRef(null);
  const audioFallbackRef = useRef(null);
  const voicesRef = useRef([]);

  // Load available speech voices asynchronously
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => {
      try {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          voicesRef.current = v;
        }
      } catch (e) {}
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Stop playback cleanly
  const stopAudio = useCallback(() => {
    isCancelledRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (audioFallbackRef.current) {
      try {
        audioFallbackRef.current.pause();
        audioFallbackRef.current.currentTime = 0;
      } catch (e) {}
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setIsPlaying(false);
  }, []);

  // Speak a specific dialogue line sequentially
  const speakLine = useCallback(
    (index) => {
      if (isCancelledRef.current || index >= scriptLines.length) {
        setIsPlaying(false);
        setCurrentLineIndex(0);
        return;
      }

      setCurrentLineIndex(index);
      const line = scriptLines[index];
      if (!line || !line.text) {
        speakLine(index + 1);
        return;
      }

      if (typeof window === 'undefined') return;

      let handled = false;
      const advanceToNext = () => {
        if (handled || isCancelledRef.current) return;
        handled = true;
        timerRef.current = setTimeout(() => {
          if (!isCancelledRef.current) {
            speakLine(index + 1);
          }
        }, 380); // Natural pause between speakers
      };

      // 1. Try Browser SpeechSynthesis first
      if ('speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }

          const utter = new SpeechSynthesisUtterance(line.text);
          utter.rate = playbackSpeed;
          utter.lang = 'en-GB';

          // Natural voice & pitch modulation based on speaker
          const firstSpeaker = scriptLines[0]?.speaker || 'Agent';
          const isFirstSpeaker = line.speaker === firstSpeaker;
          utter.pitch = isFirstSpeaker ? 0.95 : 1.15;

          const allVoices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
          if (allVoices && allVoices.length > 0) {
            const ukVoices = allVoices.filter(
              (v) => v.lang && (v.lang.includes('en-GB') || v.lang.includes('en_GB') || v.name.toLowerCase().includes('uk'))
            );
            const enVoices = allVoices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));

            if (ukVoices.length >= 2) {
              utter.voice = isFirstSpeaker ? ukVoices[0] : ukVoices[1];
            } else if (ukVoices.length === 1) {
              utter.voice = ukVoices[0];
            } else if (enVoices.length > 0) {
              utter.voice = isFirstSpeaker ? enVoices[0] : enVoices[1] || enVoices[0];
            }
          }

          utter.onend = () => {
            advanceToNext();
          };

          utter.onerror = (e) => {
            if (handled || isCancelledRef.current) return;
            if (e && (e.error === 'canceled' || e.error === 'interrupted')) return;
            handled = true;

            // Fallback to Google Audio endpoint
            try {
              const clean = encodeURIComponent(line.text.slice(0, 180));
              const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${clean}`);
              audio.playbackRate = playbackSpeed;
              audioFallbackRef.current = audio;
              audio.onended = () => {
                if (!isCancelledRef.current) {
                  timerRef.current = setTimeout(() => speakLine(index + 1), 380);
                }
              };
              audio.onerror = () => {
                if (!isCancelledRef.current) speakLine(index + 1);
              };
              audio.play().catch(() => {
                if (!isCancelledRef.current) speakLine(index + 1);
              });
            } catch (err) {
              if (!isCancelledRef.current) speakLine(index + 1);
            }
          };

          // Chrome Garbage Collection protection
          activeUtteranceRef.current = utter;
          window.__activeIeltsUtterance = utter;

          window.speechSynthesis.speak(utter);
          return;
        } catch (err) {}
      }

      // 2. Audio Fallback if SpeechSynthesis is unavailable
      try {
        const clean = encodeURIComponent(line.text.slice(0, 180));
        const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${clean}`);
        audio.playbackRate = playbackSpeed;
        audioFallbackRef.current = audio;
        audio.onended = () => {
          if (!isCancelledRef.current) {
            timerRef.current = setTimeout(() => speakLine(index + 1), 380);
          }
        };
        audio.onerror = () => {
          if (!isCancelledRef.current) speakLine(index + 1);
        };
        audio.play().catch(() => {
          if (!isCancelledRef.current) speakLine(index + 1);
        });
      } catch (err) {
        if (!isCancelledRef.current) speakLine(index + 1);
      }
    },
    [scriptLines, playbackSpeed]
  );

  // Reset when test changes
  useEffect(() => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowTranscript(false);
    stopAudio();
    setCurrentLineIndex(0);
  }, [selectedTestId, stopAudio]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  // Master Play/Pause Toggle
  const handlePlayAudio = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    isCancelledRef.current = false;
    setIsPlaying(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    // Crucial 60ms delay after cancel() for Chromium audio thread readiness
    setTimeout(() => {
      if (!isCancelledRef.current) {
        const startIndex = currentLineIndex < scriptLines.length ? currentLineIndex : 0;
        speakLine(startIndex);
      }
    }, 60);
  };

  const jumpToLine = (idx) => {
    stopAudio();
    isCancelledRef.current = false;
    setIsPlaying(true);
    setTimeout(() => {
      speakLine(idx);
    }, 60);
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
        {/* ─── AUDIO PLAYER BAR ────────────────────────────────────── */}
        <div
          className={`mt-6 p-4 md:p-5 rounded-2xl border transition-all ${
            isLight ? 'bg-sky-50/80 border-sky-200 text-sky-950' : 'bg-sky-950/30 border-sky-800/60 text-sky-100'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Play Button & Info */}
            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
              <button
                type="button"
                onClick={handlePlayAudio}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 ${
                  isPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 animate-pulse'
                    : 'bg-sky-600 hover:bg-sky-500'
                }`}
                title={isPlaying ? 'Tạm dừng phát âm thanh' : 'Bấm để nghe đoạn hội thoại'}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-0.5'}`} />
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold font-mono">
                    {isPlaying
                      ? `Đang phát câu ${currentLineIndex + 1}/${scriptLines.length}`
                      : currentLineIndex > 0
                      ? `Đã dừng ở câu ${currentLineIndex + 1}/${scriptLines.length}`
                      : 'Bấm Play để bắt đầu nghe'}
                  </span>
                  {isPlaying && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-200 dark:bg-sky-800 text-sky-900 dark:text-sky-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {scriptLines[currentLineIndex]?.speaker}
                    </span>
                  )}
                  {!isPlaying && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      ({scriptLines.length} lượt thoại)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5 italic">
                  {isPlaying && scriptLines[currentLineIndex]
                    ? `"${scriptLines[currentLineIndex].text}"`
                    : activeTest.scenario}
                </p>
              </div>
            </div>

            {/* Playback Controls & Settings */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center flex-wrap">
              {/* Navigation Steps */}
              <div className="flex items-center gap-1 bg-white/70 dark:bg-slate-900/80 p-1 rounded-xl border border-sky-200 dark:border-sky-800">
                <button
                  type="button"
                  onClick={() => jumpToLine(Math.max(0, currentLineIndex - 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Câu trước đó"
                >
                  <i className="fa-solid fa-backward-step text-xs" />
                </button>
                <button
                  type="button"
                  onClick={() => jumpToLine(Math.min(scriptLines.length - 1, currentLineIndex + 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Câu kế tiếp"
                >
                  <i className="fa-solid fa-forward-step text-xs" />
                </button>
                <button
                  type="button"
                  onClick={() => jumpToLine(0)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Phát lại từ đầu"
                >
                  <i className="fa-solid fa-rotate-left text-[11px]" />
                </button>
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-1 bg-white/70 dark:bg-slate-900/80 p-1 rounded-xl border border-sky-200 dark:border-sky-800 text-xs font-bold">
                {[0.9, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => {
                      setPlaybackSpeed(spd);
                      if (isPlaying) {
                        stopAudio();
                      }
                    }}
                    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
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
                type="button"
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

          {/* Progress bar across dialogue */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-sky-500 h-full transition-all duration-300"
              style={{
                width: `${Math.round(((currentLineIndex + (isPlaying ? 1 : 0)) / (scriptLines.length || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Audio Script Drawer with Click-to-Play turns */}
        {showTranscript && (
          <div
            className={`mt-4 p-5 rounded-2xl border space-y-2 animate-fadeIn ${
              isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-slate-850 border-slate-750 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-sans text-xs font-bold mb-3 text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-closed-captioning" />
                Audio Script (Bấm vào câu bất kỳ để nghe lại lượt thoại đó):
              </span>
              <span className="text-[11px] font-normal">Dùng để kiểm tra bẫy sau khi nghe</span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {scriptLines.map((line, idx) => {
                const isCurrent = currentLineIndex === idx && isPlaying;
                const isSpeaker1 = line.speaker === scriptLines[0]?.speaker;

                return (
                  <div
                    key={line.id}
                    onClick={() => jumpToLine(idx)}
                    className={`p-2.5 rounded-xl border text-xs md:text-sm transition-all cursor-pointer flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-sky-500/15 border-sky-500 shadow-sm ring-1 ring-sky-500'
                        : isLight
                        ? 'bg-white/80 border-amber-200/80 hover:bg-amber-100/50'
                        : 'bg-slate-900/60 border-slate-700/60 hover:bg-slate-800/80'
                    }`}
                  >
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 mt-0.5 ${
                        isSpeaker1
                          ? 'bg-blue-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {line.speaker}
                    </span>
                    <span className="flex-1 leading-relaxed">{line.text}</span>
                    <i
                      className={`fa-solid ${
                        isCurrent ? 'fa-volume-high text-sky-500 animate-pulse' : 'fa-play text-slate-400'
                      } text-[10px] shrink-0 mt-1`}
                    />
                  </div>
                );
              })}
            </div>
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
