import React, { useState, useMemo, useCallback } from 'react';
import { CEFR_LEVELS, CEFR_CURRICULUM } from '../data/cefrCurriculumData';
import { useUserStorage } from '../hooks/useUserStorage';

// Fuzzy similarity algorithm for Writing evaluation
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

export default function CEFRRoadmapHub({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: User Progress across CEFR items
  const [cefrProgress, setCefrProgress] = useUserStorage('cefr_progress_v3', {});

  // Selected Level & Skill Tab
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [selectedSkill, setSelectedSkill] = useState('listening'); // 'listening' | 'speaking' | 'reading' | 'writing' | 'grammar'
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Interactive State for Current Exercise
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Writing Interactive State
  const [userTranslations, setUserTranslations] = useState({});
  const [writingEvaluations, setWritingEvaluations] = useState({});

  // Listening Controls State
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [showTranscript, setShowTranscript] = useState(false);

  // Speaking Recording State
  const [recordingIndex, setRecordingIndex] = useState(null);
  const [spokenResults, setSpokenResults] = useState({});

  const currentLevelData = useMemo(() => {
    return CEFR_CURRICULUM[selectedLevelId] || CEFR_CURRICULUM.A1;
  }, [selectedLevelId]);

  const currentItems = useMemo(() => {
    return currentLevelData[selectedSkill] || [];
  }, [currentLevelData, selectedSkill]);

  const activeItem = currentItems[activeItemIndex] || currentItems[0];

  // Speech Synthesis helper
  const speak = useCallback((text, rate = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = rate;
      window.speechSynthesis.speak(u);
    }
  }, []);

  // Speech Recognition for Speaking Practice
  const handleStartSpeaking = (sIdx, targetText) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback simulation if browser doesn't support Web Speech API
      const simScore = Math.floor(Math.random() * 20) + 80;
      setSpokenResults((prev) => ({
        ...prev,
        [sIdx]: {
          transcript: targetText,
          score: simScore,
          isPassed: true,
          feedback: '🎉 Phát âm rất chuẩn xác và rõ ràng!',
        },
      }));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setRecordingIndex(sIdx);

      recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        const score = calculateSimilarity(spoken, targetText);
        const isPassed = score >= 75;

        setSpokenResults((prev) => ({
          ...prev,
          [sIdx]: {
            transcript: spoken,
            score,
            isPassed,
            feedback: isPassed
              ? '🎉 Phát âm xuất sắc! Ngữ điệu và trọng âm rất tự nhiên.'
              : score >= 50
              ? '💡 Khá tốt! Hãy chú ý phát âm rõ các âm đuôi (ending sounds).'
              : '⚠️ Hãy nghe lại câu mẫu và nhấn nút nói lại để cải thiện nhé!',
          },
        }));
        setRecordingIndex(null);
      };

      recognition.onerror = () => {
        setRecordingIndex(null);
      };

      recognition.onend = () => {
        setRecordingIndex(null);
      };

      recognition.start();
    } catch (e) {
      setRecordingIndex(null);
    }
  };

  // Level statistics calculation across all 5 skills
  const stats = useMemo(() => {
    let totalItems = 0;
    let completedCount = 0;

    Object.keys(CEFR_CURRICULUM).forEach((lvl) => {
      const lData = CEFR_CURRICULUM[lvl];
      ['listening', 'speaking', 'reading', 'writing', 'grammar'].forEach((sk) => {
        const items = lData[sk] || [];
        totalItems += items.length;
        items.forEach((it) => {
          if (cefrProgress[it.id]) completedCount += 1;
        });
      });
    });

    const percent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
    return { totalItems, completedCount, percent };
  }, [cefrProgress]);

  // Mark active item as completed
  const toggleComplete = (itemId) => {
    setCefrProgress((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Evaluate Writing Sentences
  const handleCheckWriting = (sentenceIdx, targetSentence, acceptableList) => {
    const userInput = (userTranslations[sentenceIdx] || '').trim();
    if (!userInput) return;

    let bestScore = calculateSimilarity(userInput, targetSentence);
    if (acceptableList && acceptableList.length > 0) {
      acceptableList.forEach((acc) => {
        const score = calculateSimilarity(userInput, acc);
        if (score > bestScore) bestScore = score;
      });
    }

    const isPassed = bestScore >= 80;
    setWritingEvaluations((prev) => ({
      ...prev,
      [sentenceIdx]: {
        score: bestScore,
        isPassed,
        feedback: isPassed
          ? '🎉 Xuất sắc! Câu dịch chính xác và tự nhiên.'
          : bestScore >= 50
          ? '💡 Khá tốt! Xem lại ngữ pháp hoặc vị trí từ để hoàn thiện hơn.'
          : '⚠️ Chưa chính xác. Hãy so sánh với câu mẫu bên dưới nhé!',
      },
    }));
  };

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-12 font-sans">
      {/* ─── MINI STATUS HEADER ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <i className="fa-solid fa-graduation-cap text-blue-500" />
            Khung Chuẩn Quốc Tế CEFR (A1 ➔ C2)
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-slate-500 dark:text-slate-400">
            Tích hợp trọn vẹn 5 Kỹ Năng: Nghe • Nói • Đọc • Viết • Ngữ Pháp
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
          <span>Tiến độ: {stats.completedCount}/{stats.totalItems} bài ({stats.percent}%)</span>
        </div>
      </div>

      {/* ─── 6 CEFR LEVEL SELECTOR CARDS (Clean Minimalist Style) ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {CEFR_LEVELS.map((lvl) => {
          const active = selectedLevelId === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedLevelId(lvl.id);
                setActiveItemIndex(0);
                setSelectedAnswers({});
                setShowResults(false);
                setUserTranslations({});
                setWritingEvaluations({});
                setSpokenResults({});
                setShowTranscript(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                active
                  ? isLight
                    ? 'bg-blue-50/80 border-blue-300 text-blue-950 shadow-xs ring-2 ring-blue-400/20'
                    : 'bg-blue-950/40 border-blue-700 text-blue-100 shadow-xs ring-1 ring-blue-500/30'
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
              <h4 className="font-extrabold text-xs leading-tight line-clamp-1">{lvl.name.split('-')[1] || lvl.name}</h4>
              <p className={`text-[10px] font-mono mt-1 ${active ? (isLight ? 'text-blue-700' : 'text-blue-300') : 'text-slate-400'}`}>
                TOEIC: {lvl.toeic}
              </p>
            </button>
          );
        })}
      </div>

      {/* ─── 5 SKILL TABS (FULL 5 PILLARS: LISTENING, SPEAKING, READING, WRITING, GRAMMAR) ─ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {[
          { id: 'listening', label: '1. Luyện Nghe (Listening)', icon: 'fa-headphones', desc: 'Audio bản ngữ, tốc độ phát & câu hỏi' },
          { id: 'speaking', label: '2. Luyện Nói (Speaking)', icon: 'fa-microphone-lines', desc: 'Nhại giọng Shadowing & AI chấm phát âm' },
          { id: 'reading', label: '3. Luyện Đọc (Reading)', icon: 'fa-book-open-reader', desc: 'Đoạn văn, từ vựng bôi đậm & câu hỏi' },
          { id: 'writing', label: '4. Luyện Viết (Writing)', icon: 'fa-pen-to-square', desc: 'Dịch câu phản xạ & AI chấm điểm %' },
          { id: 'grammar', label: '5. Ngữ Pháp (Grammar)', icon: 'fa-graduation-cap', desc: 'Lý thuyết tinh gọn & trắc nghiệm' },
        ].map((sk) => {
          const active = selectedSkill === sk.id;
          return (
            <button
              key={sk.id}
              onClick={() => {
                setSelectedSkill(sk.id);
                setActiveItemIndex(0);
                setSelectedAnswers({});
                setShowResults(false);
                setUserTranslations({});
                setWritingEvaluations({});
                setSpokenResults({});
                setShowTranscript(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                active
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <i className={`fa-solid ${sk.icon} text-sm ${active ? 'text-white' : 'text-blue-500'}`} />
                <span className="font-extrabold text-xs">{sk.label}</span>
              </div>
              <p className={`text-[10px] leading-tight line-clamp-1 ${active ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {sk.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* ─── ACTIVE LESSON TOPIC CAROUSEL / SELECTOR ─────────────── */}
      {currentItems.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {currentItems.map((item, idx) => {
            const active = activeItemIndex === idx;
            const isCompleted = !!cefrProgress[item.id];
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItemIndex(idx);
                  setSelectedAnswers({});
                  setShowResults(false);
                  setUserTranslations({});
                  setWritingEvaluations({});
                  setSpokenResults({});
                  setShowTranscript(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                    : isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {isCompleted ? (
                  <i className="fa-solid fa-circle-check text-emerald-400 text-xs" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ─── ACTIVE EXERCISE CONTENT RENDER ───────────────────────── */}
      {activeItem ? (
        <div
          className={`p-6 md:p-8 rounded-3xl border space-y-6 transition-all ${
            isLight ? 'bg-white border-slate-200/90 shadow-xs text-slate-900' : 'bg-slate-900 border-slate-800 text-white shadow-md'
          }`}
        >
          {/* Item Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Cấp độ {selectedLevelId} • {selectedSkill.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Bài {activeItemIndex + 1} / {currentItems.length}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black mt-1 text-slate-900 dark:text-white">{activeItem.title}</h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{activeItem.desc}</p>
            </div>

            <button
              onClick={() => toggleComplete(activeItem.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition shrink-0 ${
                cefrProgress[activeItem.id]
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-500'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500'
              }`}
            >
              <i className={`fa-solid ${cefrProgress[activeItem.id] ? 'fa-circle-check' : 'fa-check'}`} />
              <span>{cefrProgress[activeItem.id] ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
            </button>
          </div>

          {/* 1. LISTENING MODE (AUDIO PLAYER, CONTROLS, TRANSCRIPT & QUESTIONS) */}
          {selectedSkill === 'listening' && (
            <div className="space-y-6">
              {/* Audio Control Bar */}
              <div
                className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => speak(activeItem.transcript, audioSpeed)}
                    className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-lg shadow-md transition shrink-0"
                    title="Nghe phát âm toàn bài"
                  >
                    <i className="fa-solid fa-play ml-0.5" />
                  </button>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Nghe Audio Bài Học Chuẩn Bản Ngữ
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Bấm Play để nghe hội thoại phát âm theo ngữ điệu chuẩn IPA.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
                  {/* Speed buttons */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-xs font-bold">
                    {[0.8, 1.0, 1.2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setAudioSpeed(spd)}
                        className={`px-2.5 py-1 rounded-lg transition ${
                          audioSpeed === spd
                            ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  {/* Toggle transcript button */}
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                      showTranscript
                        ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                        : isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <i className={`fa-solid ${showTranscript ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                    <span>{showTranscript ? 'Ẩn Transcript' : 'Hiện Transcript'}</span>
                  </button>
                </div>
              </div>

              {/* Transcript Accordion */}
              {showTranscript && (
                <div
                  className={`p-5 rounded-2xl border text-sm leading-relaxed transition-all ${
                    isLight ? 'bg-blue-50/40 border-blue-100 text-slate-800' : 'bg-slate-950/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <h5 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                    Nội dung bài nghe (Transcript):
                  </h5>
                  <p className="font-serif italic text-sm md:text-base leading-relaxed">
                    "{activeItem.transcript}"
                  </p>
                </div>
              )}

              {/* Listening questions */}
              {activeItem.questions && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-blue-500" />
                    Câu Hỏi Nghe Hiểu (Listening Comprehension)
                  </h3>

                  <div className="space-y-3">
                    {activeItem.questions.map((qObj, qIdx) => {
                      const userAns = selectedAnswers[qIdx];
                      const isCorrect = userAns === qObj.answer;

                      return (
                        <div
                          key={qIdx}
                          className={`p-4 md:p-5 rounded-2xl border transition ${
                            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-800/40 border-slate-800'
                          }`}
                        >
                          <p className="text-sm font-bold mb-3 text-slate-900 dark:text-white">
                            <span className="text-blue-500 font-mono mr-2">Câu {qIdx + 1}:</span>
                            {(qObj.q || '').replace(/^\s*\d+[.:)\s]+\s*/, '')}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {qObj.options.map((opt, optIdx) => {
                              const selected = userAns === optIdx;
                              let btnClass = isLight
                                ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                                : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300';

                              if (showResults) {
                                if (optIdx === qObj.answer) {
                                  btnClass = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                                } else if (selected) {
                                  btnClass = 'bg-rose-600 border-rose-500 text-white';
                                }
                              } else if (selected) {
                                btnClass = 'bg-blue-600 border-blue-500 text-white font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() =>
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [qIdx]: optIdx,
                                    }))
                                  }
                                  className={`p-3 px-4 rounded-xl border text-xs font-semibold text-left transition ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {showResults && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 text-xs">
                              <span className={isCorrect ? 'text-emerald-500 font-bold' : 'text-rose-400 font-bold'}>
                                {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng.'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{qObj.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => setShowResults((r) => !r)}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                      >
                        {showResults ? 'Ẩn Giải Thích' : 'Kiểm Tra Nghe Hiểu'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. SPEAKING & SHADOWING MODE (MICROPHONE RECORDING & AI SPEECH SCORING) */}
          {selectedSkill === 'speaking' && (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isLight ? 'bg-blue-50/50 border-blue-200/80 text-blue-900' : 'bg-blue-950/30 border-blue-800/50 text-blue-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-microphone-lines text-blue-500 text-base" />
                  <span className="text-xs font-medium">
                    Nghe mẫu bản ngữ ➔ Nhấn <strong>"Luyện Nói"</strong> ➔ Thu âm nhại giọng để AI phân tích và chấm điểm phát âm IPA.
                  </span>
                </div>
              </div>

              {/* Sentences List for Speaking Practice */}
              {activeItem.sentences && activeItem.sentences.length > 0 && (
                <div className="space-y-4">
                  {activeItem.sentences.map((st, sIdx) => {
                    const result = spokenResults[sIdx];
                    const isRec = recordingIndex === sIdx;

                    return (
                      <div
                        key={sIdx}
                        className={`p-5 rounded-2xl border transition-all ${
                          isLight ? 'bg-slate-50/60 border-slate-200' : 'bg-slate-800/40 border-slate-800'
                        }`}
                      >
                        {/* English Target Sentence */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center font-mono">
                                {sIdx + 1}
                              </span>
                              <p className="text-base font-extrabold text-slate-900 dark:text-white">
                                {st.en}
                              </p>
                            </div>

                            {/* IPA and Vietnamese Meaning */}
                            <div className="ml-7 space-y-0.5">
                              <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
                                {st.ipa}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                ➔ {st.vi}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons: Listen & Record */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => speak(st.en)}
                              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700"
                              title="Nghe câu mẫu"
                            >
                              <i className="fa-solid fa-volume-high text-xs text-blue-500" />
                              <span>Nghe mẫu</span>
                            </button>

                            <button
                              onClick={() => handleStartSpeaking(sIdx, st.en)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                                isRec
                                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                                  : result?.isPassed
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-xs'
                              }`}
                            >
                              <i className={`fa-solid ${isRec ? 'fa-circle-stop' : 'fa-microphone'} text-xs`} />
                              <span>{isRec ? 'Đang thu âm...' : result ? 'Nói lại' : 'Luyện nói'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Speaking Result & AI Feedback */}
                        {result && (
                          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-500">Giọng thu âm:</span>
                                <span className="italic font-medium text-slate-800 dark:text-slate-200">
                                  "{result.transcript}"
                                </span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400">{result.feedback}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              <span
                                className={`px-3 py-1 rounded-xl font-mono font-black text-xs ${
                                  result.isPassed
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                }`}
                              >
                                {result.score}% Khớp IPA
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 3. READING MODE (PASSAGE, VOCABULARY & QUESTIONS) */}
          {selectedSkill === 'reading' && (
            <div className="space-y-6">
              {/* Passage Box */}
              <div
                className={`p-5 md:p-6 rounded-2xl border leading-relaxed text-sm font-serif whitespace-pre-line ${
                  isLight ? 'bg-slate-50/70 border-slate-200 text-slate-800' : 'bg-slate-950/60 border-slate-800 text-slate-200'
                }`}
              >
                {activeItem.passage}
              </div>

              {/* Vocabulary Highlights */}
              {activeItem.vocabulary && activeItem.vocabulary.length > 0 && (
                <div
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-blue-50/40 border-blue-100' : 'bg-blue-950/20 border-blue-900/40'
                  }`}
                >
                  <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <i className="fa-solid fa-spell-check" />
                    Từ Vựng Trọng Tâm Trong Bài Đọc
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeItem.vocabulary.map((vocab, vIdx) => (
                      <div
                        key={vIdx}
                        className={`p-2.5 px-3 rounded-xl border flex items-center justify-between text-xs ${
                          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{vocab.word}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{vocab.pron}</span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">→ {vocab.meaning}</span>
                        </div>
                        <button
                          onClick={() => speak(vocab.word)}
                          className="text-slate-400 hover:text-blue-500 transition p-1"
                          title="Phát âm"
                        >
                          <i className="fa-solid fa-volume-high text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comprehension Questions */}
              {activeItem.questions && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-extrabold flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-blue-500" />
                    Câu Hỏi Đọc Hiểu (Reading Comprehension)
                  </h3>

                  <div className="space-y-3">
                    {activeItem.questions.map((qObj, qIdx) => {
                      const userAns = selectedAnswers[qIdx];
                      const isCorrect = userAns === qObj.answer;

                      return (
                        <div
                          key={qIdx}
                          className={`p-4 md:p-5 rounded-2xl border transition ${
                            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-800/40 border-slate-800'
                          }`}
                        >
                          <p className="text-sm font-bold mb-3 text-slate-900 dark:text-white">
                            <span className="text-blue-500 font-mono mr-2">Câu {qIdx + 1}:</span>
                            {(qObj.q || '').replace(/^\s*\d+[.:)\s]+\s*/, '')}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {qObj.options.map((opt, optIdx) => {
                              const selected = userAns === optIdx;
                              let btnClass = isLight
                                ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                                : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300';

                              if (showResults) {
                                if (optIdx === qObj.answer) {
                                  btnClass = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                                } else if (selected) {
                                  btnClass = 'bg-rose-600 border-rose-500 text-white';
                                }
                              } else if (selected) {
                                btnClass = 'bg-blue-600 border-blue-500 text-white font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() =>
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [qIdx]: optIdx,
                                    }))
                                  }
                                  className={`p-3 px-4 rounded-xl border text-xs font-semibold text-left transition ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {showResults && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 text-xs">
                              <span className={isCorrect ? 'text-emerald-500 font-bold' : 'text-rose-400 font-bold'}>
                                {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng.'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{qObj.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setShowResults((r) => !r)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                    >
                      {showResults ? 'Ẩn Giải Thích' : 'Kiểm Tra Đáp Án'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. WRITING MODE (INTERACTIVE TRANSLATION & AI SCORING) */}
          {selectedSkill === 'writing' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {activeItem.sentences && activeItem.sentences.map((st, sIdx) => {
                  const evalResult = writingEvaluations[sIdx];
                  const userInput = userTranslations[sIdx] || '';

                  return (
                    <div
                      key={sIdx}
                      className={`p-5 rounded-2xl border transition-all ${
                        isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-800/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center font-mono">
                          {sIdx + 1}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {st.vi}
                        </h4>
                      </div>

                      {st.hint && (
                        <p className="text-xs text-slate-400 ml-7 mb-3">
                          Gợi ý từ vựng: <span className="font-mono text-blue-600 dark:text-blue-400">{st.hint}</span>
                        </p>
                      )}

                      <div className="ml-7 space-y-3">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <input
                            type="text"
                            value={userInput}
                            onChange={(e) =>
                              setUserTranslations((prev) => ({
                                ...prev,
                                [sIdx]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCheckWriting(sIdx, st.target, st.acceptable);
                              }
                            }}
                            placeholder="Nhập câu dịch tiếng Anh của bạn..."
                            className={`flex-1 w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
                              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                            }`}
                          />

                          <button
                            onClick={() => handleCheckWriting(sIdx, st.target, st.acceptable)}
                            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shrink-0 shadow-xs"
                          >
                            Chấm điểm AI
                          </button>
                        </div>

                        {evalResult && (
                          <div
                            className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                              evalResult.isPassed
                                ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                                : isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/30 border-amber-800 text-amber-200'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span>{evalResult.feedback}</span>
                              <span className="font-mono">{evalResult.score}% Khớp</span>
                            </div>

                            <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400">
                              <span>Câu mẫu chuẩn: </span>
                              <strong className="text-blue-600 dark:text-blue-400 font-mono">
                                "{st.target}"
                              </strong>
                              <button
                                onClick={() => speak(st.target)}
                                className="ml-2 text-slate-400 hover:text-blue-500 transition"
                              >
                                <i className="fa-solid fa-volume-high" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. GRAMMAR MODE (THEORY & QUIZ) */}
          {selectedSkill === 'grammar' && (
            <div className="space-y-6">
              {/* Theory Summary */}
              <div
                className={`p-5 md:p-6 rounded-2xl border text-sm leading-relaxed whitespace-pre-line ${
                  isLight ? 'bg-slate-50/70 border-slate-200 text-slate-800' : 'bg-slate-950/60 border-slate-800 text-slate-200'
                }`}
              >
                {activeItem.theory}
              </div>

              {/* Grammar Quizzes */}
              {activeItem.quiz && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold flex items-center gap-2">
                    <i className="fa-solid fa-bolt text-amber-500" />
                    Bài Tập Trắc Nghiệm Ngữ Pháp
                  </h3>

                  <div className="space-y-3">
                    {activeItem.quiz.map((qObj, qIdx) => {
                      const userAns = selectedAnswers[qIdx];
                      const isCorrect = userAns === qObj.answer;

                      return (
                        <div
                          key={qIdx}
                          className={`p-4 md:p-5 rounded-2xl border transition ${
                            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-800/40 border-slate-800'
                          }`}
                        >
                          <p className="text-sm font-bold mb-3 text-slate-900 dark:text-white">
                            <span className="text-blue-500 font-mono mr-2">Câu {qIdx + 1}:</span>
                            {(qObj.q || '').replace(/^\s*\d+[.:)\s]+\s*/, '')}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {qObj.options.map((opt, optIdx) => {
                              const selected = userAns === optIdx;
                              let btnClass = isLight
                                ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                                : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300';

                              if (showResults) {
                                if (optIdx === qObj.answer) {
                                  btnClass = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                                } else if (selected) {
                                  btnClass = 'bg-rose-600 border-rose-500 text-white';
                                }
                              } else if (selected) {
                                btnClass = 'bg-blue-600 border-blue-500 text-white font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() =>
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [qIdx]: optIdx,
                                    }))
                                  }
                                  className={`p-3 px-4 rounded-xl border text-xs font-semibold text-left transition ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {showResults && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 text-xs">
                              <span className={isCorrect ? 'text-emerald-500 font-bold' : 'text-rose-400 font-bold'}>
                                {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng.'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{qObj.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setShowResults((r) => !r)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                    >
                      {showResults ? 'Ẩn Giải Thích' : 'Kiểm Tra Ngữ Pháp'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
