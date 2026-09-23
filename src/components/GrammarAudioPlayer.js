import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import {
  buildTeacherLecture,
  getAvailableTutorVoices,
  pickBestVoice,
} from '../utils/grammarLectures';

export default function GrammarAudioPlayer({ lesson, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence for user preferences
  const [preferredGender, setPreferredGender] = useUserStorage('grammar_tutor_gender_v1', 'female');
  const [playbackRate, setPlaybackRate] = useUserStorage('grammar_tutor_speed_v1', 0.95);
  const [mode, setMode] = useState('bilingual'); // 'bilingual' | 'examples-only'

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableVoices, setAvailableVoices] = useState({ viVoices: [], enVoices: [] });

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef(null);
  const isCancelledRef = useRef(false);

  // Generate real structured teacher lecture segments
  const allSegments = useMemo(() => buildTeacherLecture(lesson), [lesson]);

  const activeSegments = useMemo(() => {
    if (mode === 'examples-only') {
      const filtered = allSegments.filter((s) => s.type === 'example' || s.lang === 'en-US');
      return filtered.length > 0 ? filtered : allSegments;
    }
    return allSegments;
  }, [allSegments, mode]);

  // Load and refresh available voices when browser is ready
  useEffect(() => {
    if (!synthRef.current) return;

    const updateVoices = () => {
      const v = getAvailableTutorVoices(synthRef.current);
      setAvailableVoices(v);
    };

    updateVoices();

    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = updateVoices;
    }
  }, []);

  // Stop when changing lesson or unmounting
  const stopAudio = useCallback(() => {
    isCancelledRef.current = true;
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {}
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  }, [lesson, stopAudio]);

  // Speak a specific segment
  const speakSegment = useCallback(
    (index) => {
      if (!synthRef.current || index >= activeSegments.length || isCancelledRef.current) {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentIndex(0);
        return;
      }

      synthRef.current.cancel();
      const seg = activeSegments[index];
      setCurrentIndex(index);

      const u = new SpeechSynthesisUtterance(seg.text);
      u.rate = playbackRate;
      u.lang = seg.lang;

      // Select high-quality natural voice based on language and gender
      if (seg.lang === 'vi-VN') {
        const viVoice = pickBestVoice(availableVoices.viVoices, 'vi-VN', preferredGender);
        if (viVoice) u.voice = viVoice;
      } else {
        const enVoice = pickBestVoice(availableVoices.enVoices, 'en-US');
        if (enVoice) u.voice = enVoice;
      }

      u.onend = () => {
        if (!isCancelledRef.current) {
          if (index + 1 < activeSegments.length) {
            // Short natural pause between teacher sentences
            setTimeout(() => {
              if (!isCancelledRef.current) {
                speakSegment(index + 1);
              }
            }, 300);
          } else {
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentIndex(0);
          }
        }
      };

      u.onerror = () => {
        if (!isCancelledRef.current && index + 1 < activeSegments.length) {
          speakSegment(index + 1);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
        }
      };

      utteranceRef.current = u;
      synthRef.current.speak(u);
    },
    [activeSegments, availableVoices, playbackRate, preferredGender]
  );

  const togglePlay = () => {
    if (!synthRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ tính năng phát âm thanh Text-to-Speech.');
      return;
    }

    if (isPlaying) {
      if (isPaused) {
        synthRef.current.resume();
        setIsPaused(false);
      } else {
        synthRef.current.pause();
        setIsPaused(true);
      }
    } else {
      isCancelledRef.current = false;
      setIsPlaying(true);
      setIsPaused(false);
      speakSegment(currentIndex || 0);
    }
  };

  const nextSegment = () => {
    if (currentIndex + 1 < activeSegments.length) {
      speakSegment(currentIndex + 1);
    }
  };

  const prevSegment = () => {
    if (currentIndex > 0) {
      speakSegment(currentIndex - 1);
    }
  };

  const restartLecture = () => {
    stopAudio();
    setTimeout(() => {
      isCancelledRef.current = false;
      setIsPlaying(true);
      speakSegment(0);
    }, 100);
  };

  const currentSeg = activeSegments[currentIndex] || activeSegments[0];
  const progressPct =
    activeSegments.length > 0 ? Math.round(((currentIndex + 1) / activeSegments.length) * 100) : 0;

  // Detect active voice label
  const activeVoiceName = useMemo(() => {
    if (!currentSeg) return 'Giọng mặc định';
    if (currentSeg.lang === 'vi-VN') {
      const v = pickBestVoice(availableVoices.viVoices, 'vi-VN', preferredGender);
      return v ? v.name.replace(/(Microsoft|Google)\s*/, '') : 'Giọng tiếng Việt';
    } else {
      const v = pickBestVoice(availableVoices.enVoices, 'en-US');
      return v ? v.name.replace(/(Microsoft|Google)\s*/, '') : 'Giọng tiếng Anh (Bản ngữ)';
    }
  }, [currentSeg, availableVoices, preferredGender]);

  return (
    <div
      className={`p-4 md:p-5 rounded-3xl border transition-all select-none shadow-md ${
        isLight
          ? 'bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/80 border-indigo-200 text-slate-900 shadow-indigo-100/50'
          : 'bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 border-slate-800 text-white shadow-slate-950/50'
      }`}
    >
      {/* Top Header: Title, Mode & Voice Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg shadow-sm shrink-0 transition-all ${
              isPlaying && !isPaused
                ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white scale-105 ring-4 ring-blue-500/20'
                : isLight
                ? 'bg-white border border-slate-200 text-blue-600'
                : 'bg-slate-800 border border-slate-700 text-blue-400'
            }`}
          >
            {isPlaying && !isPaused ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-white rounded-full animate-bounce h-3" />
                <span className="w-1 bg-white rounded-full animate-bounce h-4 delay-75" />
                <span className="w-1 bg-white rounded-full animate-bounce h-2 delay-150" />
              </div>
            ) : (
              <i className="fa-solid fa-chalkboard-user" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono flex items-center gap-1 shadow-xs">
                <i className="fa-solid fa-graduation-cap text-[9px]" /> AI Teacher Lecture
              </span>
              <span className="text-xs font-black truncate text-slate-900 dark:text-white">
                Giáo Viên AI Giảng Giải Chi Tiết
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium flex items-center gap-1.5">
              <span>🎙️ Đang dùng:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-mono">
                {preferredGender === 'female' ? 'Cô giáo' : 'Thầy giáo'} ({activeVoiceName})
              </strong>
            </p>
          </div>
        </div>

        {/* Top Controls: Voice Gender Toggle & Mode */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {/* Gender voice switch */}
          <button
            onClick={() => {
              const next = preferredGender === 'female' ? 'male' : 'female';
              setPreferredGender(next);
              if (isPlaying) {
                synthRef.current?.cancel();
                speakSegment(currentIndex);
              }
            }}
            className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500'
            }`}
            title="Đổi giọng giảng bài (Nữ / Nam)"
          >
            <span>{preferredGender === 'female' ? '👩 Cô Giáo' : '👨 Thầy Giáo'}</span>
            <i className="fa-solid fa-arrows-rotate text-[10px] text-blue-500" />
          </button>

          {/* Mode Switch: Bilingual vs Examples only */}
          <button
            onClick={() => {
              stopAudio();
              setMode((m) => (m === 'bilingual' ? 'examples-only' : 'bilingual'));
            }}
            className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
              mode === 'examples-only'
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-black'
                : isLight
                ? 'bg-white border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Chuyển chế độ giảng"
          >
            <i className="fa-solid fa-sliders text-[10px]" />
            <span>{mode === 'bilingual' ? 'Bài Giảng Đầy Đủ' : 'Chỉ Nghe Ví Dụ 🇺🇸'}</span>
          </button>
        </div>
      </div>

      {/* Main Playback Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
        {/* Status prompt */}
        <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          {isPlaying ? (
            isPaused ? (
              <span className="text-amber-500 font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-pause" /> Đang tạm dừng bài giảng
              </span>
            ) : currentSeg?.lang === 'en-US' ? (
              <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-volume-high" /> 🇺🇸 Đang phát âm ví dụ tiếng Anh chuẩn bản ngữ...
              </span>
            ) : (
              <span className="text-blue-500 font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-chalkboard-user" /> 🇻🇳 Giáo viên đang giảng giải lý thuyết...
              </span>
            )
          ) : (
            <span>Bấm phát để giáo viên AI giảng giải trọn vẹn từng phần bài học</span>
          )}
        </div>

        {/* Player Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {/* Previous section */}
          <button
            onClick={prevSegment}
            disabled={!isPlaying || currentIndex === 0}
            className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 disabled:opacity-30 transition cursor-pointer"
            title="Phần trước"
          >
            <i className="fa-solid fa-backward-step text-xs" />
          </button>

          {/* Primary Play / Pause button */}
          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition shadow-md flex items-center gap-2 hover:scale-102 cursor-pointer ${
              isPlaying && !isPaused
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <i className={`fa-solid ${isPlaying && !isPaused ? 'fa-pause' : 'fa-play'} text-xs`} />
            <span>
              {isPlaying && !isPaused ? 'Tạm Dừng' : isPaused ? 'Tiếp Tục' : 'Bắt Đầu Giảng Bài'}
            </span>
          </button>

          {/* Next section */}
          <button
            onClick={nextSegment}
            disabled={!isPlaying || currentIndex >= activeSegments.length - 1}
            className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 disabled:opacity-30 transition cursor-pointer"
            title="Phần kế tiếp"
          >
            <i className="fa-solid fa-forward-step text-xs" />
          </button>

          {/* Restart from beginning */}
          {isPlaying && (
            <button
              onClick={restartLecture}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 transition cursor-pointer"
              title="Nghe lại từ đầu"
            >
              <i className="fa-solid fa-rotate-left text-xs" />
            </button>
          )}

          {/* Stop button */}
          {isPlaying && (
            <button
              onClick={stopAudio}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-rose-200 dark:border-rose-800 text-rose-500 hover:bg-rose-500 hover:text-white transition cursor-pointer"
              title="Dừng giảng bài"
            >
              <i className="fa-solid fa-stop text-xs" />
            </button>
          )}

          {/* Speed Selector */}
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className={`px-2 py-1.5 rounded-xl border text-xs font-bold font-mono focus:outline-none transition cursor-pointer ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Tốc độ giảng bài"
          >
            <option value="0.8">0.8x (Chậm)</option>
            <option value="0.95">0.95x (Tự nhiên)</option>
            <option value="1.0">1.0x (Chuẩn)</option>
            <option value="1.15">1.15x (Nhanh)</option>
          </select>
        </div>
      </div>

      {/* Progress & Live Subtitle Card */}
      {isPlaying && (
        <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>
                Phần {currentIndex + 1} / {activeSegments.length}:{' '}
                <strong className="text-slate-900 dark:text-white">{currentSeg?.title}</strong>
              </span>
            </span>
            <span>{progressPct}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Subtitle Box */}
          {currentSeg && (
            <div
              className={`p-3.5 px-4 rounded-2xl border transition-all text-xs leading-relaxed space-y-1.5 shadow-xs ${
                currentSeg.type === 'example'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                  : currentSeg.type === 'tip'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200'
                  : isLight
                  ? 'bg-white/90 border-blue-200/90 text-slate-800'
                  : 'bg-slate-800/90 border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 font-mono">
                  {currentSeg.type === 'example' ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <i className="fa-solid fa-microphone-lines" /> Ví dụ phát âm bản ngữ (US English)
                    </span>
                  ) : currentSeg.type === 'tip' ? (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <i className="fa-solid fa-lightbulb" /> Mẹo ghi nhớ & Bẫy thi cử
                    </span>
                  ) : (
                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <i className="fa-solid fa-book-open-reader" /> Giảng giải lý thuyết
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentSeg.lang === 'en-US' ? '🇺🇸 US Accent' : '🇻🇳 Tiếng Việt'}
                </span>
              </div>

              <p className="text-xs md:text-sm font-semibold whitespace-pre-line leading-relaxed">
                {currentSeg.display || currentSeg.text}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
