import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { SHADOWING_CATEGORIES, SHADOWING_LESSONS } from '../data/shadowingData';
import { useUserStorage } from '../hooks/useUserStorage';
import { createOptimizedAudioStream, getOptimalAudioMimeType } from '../utils/audioRecorderHelper';

// Helper: Levenshtein distance similarity (0-100)
function calculateSimilarity(str1, str2) {
  const s1 = (str1 || '').toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  const s2 = (str2 || '').toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');

  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;
  if (s1.includes(s2) || s2.includes(s1)) return 85;

  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null)
  );
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
}

// Helper: Word-by-word diff matching
function compareWords(targetText, recognizedText) {
  const clean = (s) => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
  const targetWords = clean(targetText);
  const recWords = clean(recognizedText);

  const matched = targetWords.map((word) => {
    const isExact = recWords.includes(word);
    let isClose = false;
    if (!isExact) {
      isClose = recWords.some((r) => calculateSimilarity(word, r) >= 70);
    }
    return {
      word,
      status: isExact ? 'correct' : isClose ? 'close' : 'missing',
    };
  });

  return matched;
}

export default function ShadowingStudio({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: Completed lesson sentences & stats
  const [shadowStats, setShadowStats] = useUserStorage('shadowing_stats_v1', {
    completedSentences: {}, // { [lessonId_sentenceId]: { score: number, date: string } }
    totalSessions: 0,
    streakDays: 1,
  });

  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLesson, setSelectedLesson] = useState(SHADOWING_LESSONS[0]);
  const [practiceMode, setPracticeMode] = useState('sentence'); // 'sentence' | 'continuous' | 'roleplay' | 'custom'
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  // Settings
  const [speechRate, setSpeechRate] = useState(0.9); // 0.75, 0.9, 1.0, 1.25
  const [voiceGender, setVoiceGender] = useState('us-female'); // 'us-female', 'us-male', 'uk'
  const [pauseDuration, setPauseDuration] = useState(3); // In continuous mode: seconds to repeat (1-5s)
  const [showIpa, setShowIpa] = useState(true);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [roleSelected, setRoleSelected] = useState(0); // 0 for Speaker 1, 1 for Speaker 2

  // Custom text mode state
  const [customTextInput, setCustomTextInput] = useState('');
  const [customLessonData, setCustomLessonData] = useState(null);

  // Audio Playback & Voice Recorder State
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [recognizedTranscript, setRecognizedTranscript] = useState('');
  const [recognitionScore, setRecognitionScore] = useState(null);
  const [wordDiffs, setWordDiffs] = useState([]);
  const [countdown, setCountdown] = useState(null); // For continuous mode delay
  const [continuousRunning, setContinuousRunning] = useState(false);

  // Refs
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const userAudioPlayerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const streamCleanupRef = useRef(null);

  // Active Lesson Sentences
  const activeLesson = practiceMode === 'custom' && customLessonData ? customLessonData : selectedLesson;
  const currentSentence = activeLesson?.sentences?.[currentSentenceIdx] || activeLesson?.sentences?.[0];

  // Speech Recognition API Check
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    if (selectedCategory === 'all') return SHADOWING_LESSONS;
    return SHADOWING_LESSONS.filter((l) => l.category === selectedCategory);
  }, [selectedCategory]);

  // Clean up audio on sentence change
  useEffect(() => {
    stopAllAudioAndRecording();
    setRecognizedTranscript('');
    setRecognitionScore(null);
    setWordDiffs([]);
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSentenceIdx, selectedLesson, practiceMode]);

  // Handle TTS Native Speech
  const playNativeAudio = useCallback(
    (textToPlay, onFinish) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToPlay || currentSentence?.text);
      utterance.rate = speechRate;

      // Select voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (voiceGender === 'uk') {
          const ukVoice = voices.find((v) => v.lang.includes('en-GB') || v.name.includes('UK'));
          if (ukVoice) utterance.voice = ukVoice;
        } else if (voiceGender === 'us-male') {
          const maleVoice = voices.find((v) => v.lang.includes('en-US') && (v.name.includes('David') || v.name.includes('Male') || v.name.includes('Guy')));
          if (maleVoice) utterance.voice = maleVoice;
        } else {
          const femaleVoice = voices.find((v) => v.lang.includes('en-US') && (v.name.includes('Zira') || v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Jenny')));
          if (femaleVoice) utterance.voice = femaleVoice;
        }
      }

      utterance.onstart = () => setIsPlayingNative(true);
      utterance.onend = () => {
        setIsPlayingNative(false);
        if (onFinish) onFinish();
      };
      utterance.onerror = () => setIsPlayingNative(false);

      window.speechSynthesis.speak(utterance);
    },
    [currentSentence, speechRate, voiceGender]
  );

  // Stop all audio & recorder
  const stopAllAudioAndRecording = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingNative(false);
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    setIsPlayingRecording(false);
    if (isRecording) {
      stopRecording();
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      setCountdown(null);
    }
    setContinuousRunning(false);
  };

  // Start Mic Recording & Recognition
  const startRecording = async () => {
    if (isPlayingNative) {
      window.speechSynthesis.cancel();
      setIsPlayingNative(false);
    }

    setRecognizedTranscript('');
    setRecognitionScore(null);
    setWordDiffs([]);
    audioChunksRef.current = [];

    // 1. MediaRecorder with Studio-Quality Constraints & Compressor
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const { stream, cleanup } = await createOptimizedAudioStream();
        streamCleanupRef.current = cleanup;

        const mimeType = getOptimalAudioMimeType();

        const recorder = mimeType
          ? new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 128000 })
          : new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
          if (streamCleanupRef.current) {
            streamCleanupRef.current();
            streamCleanupRef.current = null;
          }
        };

        recorder.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Microphone permission error:', err);
      }
    }

    // 2. SpeechRecognition
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event) => {
          const spoken = event.results[0][0].transcript;
          setRecognizedTranscript(spoken);

          // Calculate Accuracy
          const target = currentSentence?.text || '';
          const simScore = calculateSimilarity(spoken, target);
          setRecognitionScore(simScore);

          // Word diffs
          const diffs = compareWords(target, spoken);
          setWordDiffs(diffs);

          // Stop mic
          stopRecording();

          // Save score to stats
          if (activeLesson?.id && currentSentence?.id) {
            const key = `${activeLesson.id}_${currentSentence.id}`;
            setShadowStats((prev) => ({
              ...prev,
              completedSentences: {
                ...prev.completedSentences,
                [key]: {
                  score: Math.max(simScore, prev.completedSentences?.[key]?.score || 0),
                  date: new Date().toISOString(),
                },
              },
            }));
          }
        };

        recognition.onerror = (event) => {
          console.warn('Recognition error:', event.error);
          stopRecording();
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (err) {
        console.error('Speech recognition failed to start:', err);
        stopRecording();
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    if (streamCleanupRef.current) {
      streamCleanupRef.current();
      streamCleanupRef.current = null;
    }
  };

  // Play User's Recorded Audio
  const playRecordedAudio = () => {
    if (!recordedAudioUrl) return;
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingRecording(true);
    audio.play();
    audio.onended = () => setIsPlayingRecording(false);
  };

  // Play Native then Immediately Play User Audio for Direct Comparison
  const playComparisonAudio = () => {
    playNativeAudio(currentSentence?.text, () => {
      setTimeout(() => {
        playRecordedAudio();
      }, 500);
    });
  };

  // Continuous Shadowing Mode Loop
  const startContinuousMode = () => {
    setContinuousRunning(true);
    runContinuousStep(0);
  };

  const runContinuousStep = (idx) => {
    if (!activeLesson?.sentences || idx >= activeLesson.sentences.length) {
      setContinuousRunning(false);
      setCountdown(null);
      return;
    }

    setCurrentSentenceIdx(idx);
    const sentence = activeLesson.sentences[idx];

    // Check Role-play logic
    const isUserRole =
      practiceMode === 'roleplay' &&
      activeLesson?.speakers &&
      activeLesson.speakers.length > 1 &&
      ((roleSelected === 0 && idx % 2 === 0) || (roleSelected === 1 && idx % 2 === 1));

    if (isUserRole) {
      // Prompt user to speak their role
      let count = pauseDuration + 1;
      setCountdown(count);
      countdownTimerRef.current = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          clearInterval(countdownTimerRef.current);
          setCountdown(null);
          runContinuousStep(idx + 1);
        } else {
          setCountdown(count);
        }
      }, 1000);
    } else {
      // Play native audio for this line
      playNativeAudio(sentence.text, () => {
        // After native audio finishes, trigger countdown pause for shadowing
        let count = pauseDuration;
        setCountdown(count);
        countdownTimerRef.current = setInterval(() => {
          count -= 1;
          if (count <= 0) {
            clearInterval(countdownTimerRef.current);
            setCountdown(null);
            runContinuousStep(idx + 1);
          } else {
            setCountdown(count);
          }
        }, 1000);
      });
    }
  };

  // Custom text generator
  const handleProcessCustomText = () => {
    if (!customTextInput.trim()) return;
    const rawSentences = customTextInput
      .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
      .split('|')
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    const generated = {
      id: 'custom-lesson-' + Date.now(),
      title: 'Bài Tự Nhập Của Bạn (' + rawSentences.length + ' câu)',
      category: 'custom',
      level: 'Custom',
      topic: 'Personal Practice',
      type: 'monologue',
      description: 'Đoạn văn do bạn tự thêm để luyện Shadowing chuyên biệt.',
      sentences: rawSentences.map((st, i) => ({
        id: i + 1,
        speaker: 'Voice',
        text: st,
        vietnamese: 'Nhấn vào các chế độ để luyện nói từng câu.',
        ipa: '',
        linkingHints: '',
        focalWords: [],
      })),
    };

    setCustomLessonData(generated);
    setCurrentSentenceIdx(0);
  };

  // Completed count for current lesson
  const completedSentencesInLesson = useMemo(() => {
    if (!activeLesson?.sentences) return 0;
    return activeLesson.sentences.filter(
      (s) => shadowStats.completedSentences?.[`${activeLesson.id}_${s.id}`]?.score >= 60
    ).length;
  }, [activeLesson, shadowStats]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ─── HEADER BANNER ─────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 md:p-8 border transition-all ${
          isLight
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg border-blue-500'
            : 'bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-slate-900 border-indigo-900/50 text-white shadow-xl'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-microphone-lines text-amber-300 animate-pulse" />
              Kỹ Thuật Nhại Giọng Bản Xứ
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Shadowing Practice Studio
            </h1>
            <p className="text-blue-100/90 text-sm md:text-base max-w-2xl leading-relaxed">
              Luyện phát âm chuẩn, bắt kịp ngữ điệu tự nhiên, phản xạ nối âm và tốc độ nói của người bản ngữ qua 4 chế độ tương tác cao.
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-black/20 backdrop-blur-md p-3.5 px-5 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center border-r border-white/15 pr-4">
              <div className="text-2xl font-black text-amber-300">
                {Object.keys(shadowStats.completedSentences || {}).length}
              </div>
              <div className="text-[11px] text-blue-200 uppercase font-bold">Câu Đã Luyện</div>
            </div>
            <div className="text-center pl-2">
              <div className="text-2xl font-black text-emerald-300">
                {filteredLessons.length}
              </div>
              <div className="text-[11px] text-blue-200 uppercase font-bold">Bài Học Có Sẵn</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PRACTICE MODES TABS ───────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {[
          { id: 'sentence', label: '1. Luyện Từng Câu', icon: 'fa-spell-check', desc: 'IPA, nối âm & chấm điểm mic' },
          { id: 'continuous', label: '2. Shadowing Liên Tục', icon: 'fa-forward-fast', desc: 'Karaoke đếm nhịp nghỉ' },
          { id: 'roleplay', label: '3. Đóng Vai Đối Thoại', icon: 'fa-people-arrows', desc: 'Chọn Speaker A hoặc B' },
          { id: 'custom', label: '4. Tự Nhập Văn Bản', icon: 'fa-pen-to-square', desc: 'Dán bài báo/đoạn văn của bạn' },
        ].map((mode) => {
          const active = practiceMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => {
                setPracticeMode(mode.id);
                stopAllAudioAndRecording();
              }}
              className={`flex flex-col text-left p-3.5 md:p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                active
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md scale-101'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <i className={`fa-solid ${mode.icon} text-sm ${active ? 'text-white' : 'text-blue-500'}`} />
                <span className="font-extrabold text-xs md:text-sm truncate">{mode.label}</span>
              </div>
              <span className={`text-[11px] leading-tight truncate ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                {mode.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── CUSTOM TEXT INPUT PANEL (IF MODE === 'custom') ────────── */}
      {practiceMode === 'custom' && (
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-file-lines text-indigo-500" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Dán văn bản tiếng Anh để tự động tạo bài Shadowing
              </h3>
            </div>
          </div>
          <textarea
            rows={4}
            value={customTextInput}
            onChange={(e) => setCustomTextInput(e.target.value)}
            placeholder="Ví dụ: Good morning everyone. Today I'd like to present our quarterly sales performance. We achieved a fifteen percent increase in revenue compared to last year..."
            className={`w-full p-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
            }`}
          />
          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={handleProcessCustomText}
              disabled={!customTextInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow transition flex items-center gap-2"
            >
              <i className="fa-solid fa-wand-magic-sparkles" />
              Tách câu & Bắt đầu Luyện tập
            </button>
          </div>
        </div>
      )}

      {/* ─── MAIN TWO-COLUMN STUDIO WORKSPACE ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LESSON SELECTOR & CATEGORIES (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Category Filter Chips */}
          <div
            className={`p-4 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Chủ đề bài học</span>
              <span className="text-[11px] font-semibold text-blue-500">{filteredLessons.length} bài</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {SHADOWING_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} text-[10px]`} />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Lesson Cards List */}
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-hide">
              {filteredLessons.map((lesson) => {
                const isSelected = activeLesson?.id === lesson.id;
                const completedInThis = lesson.sentences.filter(
                  (s) => shadowStats.completedSentences?.[`${lesson.id}_${s.id}`]?.score >= 60
                ).length;
                const isFullyDone = completedInThis === lesson.sentences.length;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setCurrentSentenceIdx(0);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? isLight
                          ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                          : 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20'
                        : isLight
                        ? 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider ${
                          lesson.level === 'Beginner'
                            ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                            : lesson.level === 'Intermediate'
                            ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                            : 'bg-purple-500/15 text-purple-500 border border-purple-500/30'
                        }`}
                      >
                        {lesson.level}
                      </span>
                      {isFullyDone ? (
                        <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                          <i className="fa-solid fa-circle-check" /> Đã hoàn thành
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">
                          {completedInThis}/{lesson.sentences.length} câu
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-xs font-bold leading-snug line-clamp-1 ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                          : isLight
                          ? 'text-slate-900'
                          : 'text-white'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {lesson.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Studio Audio Settings Control Panel */}
          <div
            className={`p-4 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-sliders text-blue-500" />
              <span>Cài đặt giọng mẫu & Tốc độ</span>
            </div>

            <div className="space-y-3">
              {/* Voice Speed */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                  <span>Tốc độ đọc giọng mẫu:</span>
                  <span className="text-blue-500 font-mono font-bold">{speechRate}x</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0.75, 0.9, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`py-1 rounded-xl text-xs font-bold border transition ${
                        speechRate === rate
                          ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                          : isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent / Voice Gender */}
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1.5">Giọng đọc bản ngữ:</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'us-female', label: 'US Nữ', icon: 'fa-user' },
                    { id: 'us-male', label: 'US Nam', icon: 'fa-user-tie' },
                    { id: 'uk', label: 'UK Anh', icon: 'fa-crown' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVoiceGender(v.id)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                        voiceGender === v.id
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                          : isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <i className={`fa-solid ${v.icon} text-[10px]`} />
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pause Interval for Continuous Mode */}
              {practiceMode === 'continuous' && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                    <span>Khoảng nghỉ lặp lại (Shadowing Delay):</span>
                    <span className="text-indigo-500 font-bold">{pauseDuration} giây</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={pauseDuration}
                    onChange={(e) => setPauseDuration(+e.target.value)}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1s (Nhanh)</span>
                    <span>3s (Chuẩn)</span>
                    <span>5s (Chậm)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE SHADOWING PLAYER (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Active Lesson Header & Step Navigator */}
          <div
            className={`p-5 rounded-3xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
                  <span>{activeLesson?.topic || 'Shadowing Practice'}</span>
                  <span>•</span>
                  <span>{activeLesson?.sentences?.length || 0} câu</span>
                  {completedSentencesInLesson > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-500 font-bold lowercase">
                        {completedSentencesInLesson}/{activeLesson?.sentences?.length || 0} câu đạt
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                  {activeLesson?.title}
                </h2>
              </div>

              {/* Role Play Selector if dialogue */}
              {practiceMode === 'roleplay' && activeLesson?.speakers && activeLesson.speakers.length > 1 && (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-400 px-2">Vai của bạn:</span>
                  {activeLesson.speakers.map((spk, idx) => (
                    <button
                      key={idx}
                      onClick={() => setRoleSelected(idx)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        roleSelected === idx
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-white'
                      }`}
                    >
                      {spk}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sentence Slider / Pill Navigator */}
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              {activeLesson?.sentences?.map((st, idx) => {
                const isCurrent = currentSentenceIdx === idx;
                const isDone =
                  shadowStats.completedSentences?.[`${activeLesson.id}_${st.id}`]?.score >= 60;
                return (
                  <button
                    key={st.id || idx}
                    onClick={() => {
                      setCurrentSentenceIdx(idx);
                      stopAllAudioAndRecording();
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      isCurrent
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm scale-105'
                        : isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20'
                        : isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <span>Câu {idx + 1}</span>
                    {isDone && <i className="fa-solid fa-check text-[10px]" />}
                  </button>
                );
              })}
            </div>

            {/* ─── FOCAL SENTENCE DISPLAY CARD ─── */}
            <div
              className={`mt-2 p-6 md:p-8 rounded-3xl border relative transition-all duration-300 ${
                isPlayingNative
                  ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50/20 dark:bg-blue-950/20 border-blue-400'
                  : isLight
                  ? 'bg-slate-50/90 border-slate-200'
                  : 'bg-slate-800/70 border-slate-700/80'
              }`}
            >
              {/* Speaker Badge */}
              {currentSentence?.speaker && (
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
                    <i className="fa-solid fa-user-circle" /> {currentSentence.speaker}
                  </span>

                  {/* Toggle Toggles */}
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={showIpa}
                        onChange={(e) => setShowIpa(e.target.checked)}
                        className="accent-blue-600"
                      />
                      <span>IPA</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={showVietnamese}
                        onChange={(e) => setShowVietnamese(e.target.checked)}
                        className="accent-blue-600"
                      />
                      <span>Dịch nghĩa</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Main English Text (with highlight focal points) */}
              <div className="text-xl md:text-2xl font-black leading-relaxed tracking-tight text-slate-900 dark:text-white my-3">
                {currentSentence?.text}
              </div>

              {/* IPA Phonetic line */}
              {showIpa && currentSentence?.ipa && (
                <div className="text-xs md:text-sm font-mono text-indigo-500 dark:text-indigo-400 font-semibold mt-1">
                  {currentSentence.ipa}
                </div>
              )}

              {/* Vietnamese Meaning */}
              {showVietnamese && currentSentence?.vietnamese && (
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  → {currentSentence.vietnamese}
                </div>
              )}

              {/* Connected Speech & Linking Sounds Hint */}
              {currentSentence?.linkingHints && (
                <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-300">
                  <i className="fa-solid fa-bolt text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Quy tắc nối âm / Nuốt âm gợi ý: </span>
                    <span className="font-mono">{currentSentence.linkingHints}</span>
                  </div>
                </div>
              )}

              {/* Countdown Alert in Continuous Mode */}
              {countdown !== null && (
                <div className="mt-4 p-3.5 rounded-2xl bg-blue-600 text-white flex items-center justify-center gap-3 animate-pulse shadow-lg font-bold text-sm">
                  <i className="fa-solid fa-microphone-lines text-amber-300 text-lg animate-bounce" />
                  <span>
                    Hãy nhại lại ngay bây giờ! (Đếm ngược: <strong>{countdown}s</strong>)
                  </span>
                </div>
              )}
            </div>

            {/* ─── STUDIO CONTROLLER BAR ─── */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {/* Native Speech Play Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playNativeAudio(currentSentence?.text)}
                  disabled={isPlayingNative || isRecording}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs md:text-sm font-extrabold shadow-md transition-all ${
                    isPlayingNative
                      ? 'bg-blue-500 text-white animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-102'
                  }`}
                >
                  <i className={`fa-solid ${isPlayingNative ? 'fa-volume-high animate-bounce' : 'fa-play'}`} />
                  {isPlayingNative ? 'Đang phát giọng mẫu...' : 'Nghe Giọng Mẫu'}
                </button>

                <button
                  onClick={() => playNativeAudio(currentSentence?.text)}
                  title="Nghe chậm (0.75x)"
                  className={`p-3 rounded-2xl border transition ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  }`}
                >
                  <i className="fa-solid fa-turtle" />
                </button>
              </div>

              {/* Mic Record Button */}
              <div className="flex items-center gap-2">
                {isRecording ? (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs md:text-sm font-extrabold animate-pulse shadow-lg"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    Đang thu âm... (Nhấn để dừng)
                  </button>
                ) : (
                  <button
                    onClick={startRecording}
                    disabled={isPlayingNative}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-extrabold shadow-md transition hover:scale-102"
                  >
                    <i className="fa-solid fa-microphone" />
                    Ghi Âm & Chấm Điểm
                  </button>
                )}

                {/* Play User's Audio */}
                {recordedAudioUrl && !isRecording && (
                  <button
                    onClick={playRecordedAudio}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs md:text-sm font-bold border transition ${
                      isPlayingRecording
                        ? 'bg-amber-500 text-slate-900 border-amber-400 font-extrabold'
                        : isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <i className={`fa-solid ${isPlayingRecording ? 'fa-square' : 'fa-play'}`} />
                    Nghe Lại Giọng Bạn
                  </button>
                )}

                {/* Compare A/B Button */}
                {recordedAudioUrl && !isRecording && (
                  <button
                    onClick={playComparisonAudio}
                    title="Phát giọng mẫu rồi tự động phát tiếp giọng bạn để so sánh ngữ điệu"
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs md:text-sm font-bold shadow transition"
                  >
                    <i className="fa-solid fa-code-compare" />
                    So Sánh 2 Giọng
                  </button>
                )}
              </div>

              {/* Continuous Stream Playback Start/Stop */}
              {practiceMode === 'continuous' && (
                <div className="w-full pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  {continuousRunning ? (
                    <button
                      onClick={stopAllAudioAndRecording}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow"
                    >
                      <i className="fa-solid fa-stop" /> Dừng Chuỗi Shadowing
                    </button>
                  ) : (
                    <button
                      onClick={startContinuousMode}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow hover:scale-102 transition"
                    >
                      <i className="fa-solid fa-forward-fast" /> Bắt Đầu Chạy Liên Tục Cả Bài
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ─── LIVE RECOGNITION & WORD ACCURACY RESULT ─── */}
            {recognitionScore !== null && (
              <div
                className={`mt-6 p-5 rounded-3xl border transition-all ${
                  recognitionScore >= 85
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
                    : recognitionScore >= 60
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black">{recognitionScore}%</span>
                    <span className="font-extrabold text-sm">
                      {recognitionScore >= 85
                        ? '🌟 Xuất sắc! Phát âm và ngữ điệu rất chuẩn'
                        : recognitionScore >= 60
                        ? '👍 Khá tốt! Cần chú ý thêm một số từ chưa rõ âm cuối'
                        : '💪 Hãy thử lại! Nghe lại giọng mẫu và nói to rõ ràng hơn nhé'}
                    </span>
                  </div>

                  {recognizedTranscript && (
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Máy nghe được: <strong className="text-indigo-500">"{recognizedTranscript}"</strong>
                    </div>
                  )}
                </div>

                {/* Word-by-word Breakdown Pills */}
                {wordDiffs.length > 0 && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Chi tiết từng từ bạn đã phát âm:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {wordDiffs.map((w, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                            w.status === 'correct'
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                              : w.status === 'close'
                              ? 'bg-amber-500 text-white border-amber-600'
                              : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30 line-through'
                          }`}
                        >
                          {w.word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── BOTTOM PREV / NEXT NAVIGATION ─── */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentSentenceIdx((i) => Math.max(0, i - 1));
                  stopAllAudioAndRecording();
                }}
                disabled={currentSentenceIdx === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition disabled:opacity-30 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <i className="fa-solid fa-chevron-left" /> Câu trước
              </button>

              <span className="text-xs font-bold text-slate-400">
                Câu {currentSentenceIdx + 1} / {activeLesson?.sentences?.length || 1}
              </span>

              <button
                onClick={() => {
                  setCurrentSentenceIdx((i) =>
                    Math.min((activeLesson?.sentences?.length || 1) - 1, i + 1)
                  );
                  stopAllAudioAndRecording();
                }}
                disabled={currentSentenceIdx >= (activeLesson?.sentences?.length || 1) - 1}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition disabled:opacity-30 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Câu tiếp theo <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
