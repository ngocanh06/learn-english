import React, { useState, useMemo, useCallback } from 'react';
import { WRITING_CATEGORIES, WRITING_LESSONS } from '../data/writingTranslationData';
import { useUserStorage } from '../hooks/useUserStorage';

// Fuzzy similarity algorithm for translation comparison
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

export default function WritingStudio({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: Completed writing sentences
  const [completedWritingMap, setCompletedWritingMap] = useUserStorage('writing_practice_completed_v1', {});

  // Selected Category & Lesson
  const [selectedCat, setSelectedCat] = useState('tenses');
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);

  // User input per sentence: { [sentenceId]: string }
  const [userInputs, setUserInputs] = useState({});
  // Evaluation per sentence: { [sentenceId]: { score: number, isPassed: boolean, feedback: string } }
  const [evaluations, setEvaluations] = useState({});

  const lessonsInCat = useMemo(() => {
    return WRITING_LESSONS[selectedCat] || [];
  }, [selectedCat]);

  const activeLesson = lessonsInCat[selectedLessonIdx] || lessonsInCat[0];

  // Speech pronunciation
  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const handleEvaluate = (sentenceId, targetSentence, acceptableList) => {
    const userInput = (userInputs[sentenceId] || '').trim();
    if (!userInput) return;

    let bestScore = calculateSimilarity(userInput, targetSentence);
    if (acceptableList && acceptableList.length > 0) {
      acceptableList.forEach((acc) => {
        const score = calculateSimilarity(userInput, acc);
        if (score > bestScore) bestScore = score;
      });
    }

    const isPassed = bestScore >= 80;
    setEvaluations((prev) => ({
      ...prev,
      [sentenceId]: {
        score: bestScore,
        isPassed,
        feedback: isPassed
          ? '🎉 Rất tốt! Câu dịch chuẩn xác và tự nhiên.'
          : bestScore >= 50
          ? '💡 Khá tốt! Kiểm tra lại cấu trúc ngữ pháp hoặc từ nối để câu mượt hơn.'
          : '⚠️ Chưa chính xác. Hãy quan sát câu mẫu bên dưới để rút kinh nghiệm nhé!',
      },
    }));

    if (isPassed) {
      setCompletedWritingMap((prev) => ({
        ...prev,
        [sentenceId]: true,
      }));
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* ─── BANNER ─────────────────────────────────────────────── */}
      <div
        className={`p-6 md:p-8 rounded-3xl border transition-all ${
          isLight
            ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-700 text-white shadow-lg border-rose-500'
            : 'bg-gradient-to-r from-slate-900 via-rose-950/60 to-slate-950 border-slate-800 text-white shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-pen-nib" />
              Luyện Viết & Dịch Câu Tương Tác (The IELTS Dictionary Style)
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Phòng Luyện Viết Dịch Câu Nâng Cao
            </h1>
            <p className="text-rose-100/90 text-xs md:text-sm">
              Luyện dịch câu từ căn bản (12 thì) đến cấu trúc học thuật và bài luận IELTS Writing Task 2. Tự động chấm điểm, phân tích ngữ pháp và so sánh với câu chuẩn bản xứ.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 3 MAIN CATEGORIES ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {WRITING_CATEGORIES.map((cat) => {
          const active = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCat(cat.id);
                setSelectedLessonIdx(0);
                setUserInputs({});
                setEvaluations({});
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 ${
                active
                  ? 'bg-rose-600 border-rose-500 text-white shadow-md'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                active ? 'bg-white/20 text-white' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
              }`}>
                <i className={`fa-solid ${cat.icon}`} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs md:text-sm leading-tight">{cat.label}</h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── LESSON LIST CAROUSEL ───────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        {lessonsInCat.map((lesson, idx) => {
          const active = selectedLessonIdx === idx;
          return (
            <button
              key={lesson.id}
              onClick={() => {
                setSelectedLessonIdx(idx);
                setUserInputs({});
                setEvaluations({});
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border ${
                active
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] uppercase font-mono">
                {lesson.level}
              </span>
              <span>{lesson.title}</span>
            </button>
          );
        })}
      </div>

      {/* ─── ACTIVE LESSON WORKSPACE ────────────────────────────── */}
      {activeLesson && (
        <div
          className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
            isLight ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400">
                {activeLesson.level}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                {activeLesson.sentences.length} câu luyện tập
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black mt-1.5">{activeLesson.title}</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{activeLesson.desc}</p>
          </div>

          {/* Sentences List */}
          <div className="space-y-5">
            {activeLesson.sentences.map((st, sIdx) => {
              const evalRes = evaluations[st.id];
              const isDone = !!completedWritingMap[st.id];

              return (
                <div
                  key={st.id}
                  className={`p-5 rounded-2xl border space-y-3.5 transition-all ${
                    isDone
                      ? isLight ? 'bg-emerald-50/40 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800/40'
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-rose-500">
                      Câu {sIdx + 1}
                    </span>
                    {evalRes && (
                      <span
                        className={`text-xs font-black px-3 py-0.5 rounded-full ${
                          evalRes.isPassed
                            ? 'bg-emerald-500/20 text-emerald-500'
                            : 'bg-amber-500/20 text-amber-500'
                        }`}
                      >
                        Độ tương đồng: {evalRes.score}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-start gap-2">
                    <span className="shrink-0 text-base">🇻🇳</span>
                    <span>{st.vietnamese}</span>
                  </h3>

                  {/* Vocabulary hints */}
                  {st.hints && st.hints.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap text-xs">
                      <span className="text-slate-400 font-bold">Gợi ý từ vựng:</span>
                      {st.hints.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className={`px-2 py-0.5 rounded-md border text-[11px] font-mono ${
                            isLight ? 'bg-white border-slate-200 text-rose-600' : 'bg-slate-900 border-slate-700 text-rose-300'
                          }`}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Input field */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInputs[st.id] || ''}
                      onChange={(e) =>
                        setUserInputs((prev) => ({
                          ...prev,
                          [st.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEvaluate(st.id, st.target, st.acceptable);
                        }
                      }}
                      placeholder="Gõ bản dịch tiếng Anh của bạn tại đây rồi bấm Chấm bài..."
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900'
                          : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                    <button
                      onClick={() => handleEvaluate(st.id, st.target, st.acceptable)}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider transition shrink-0 shadow-sm"
                    >
                      Chấm bài
                    </button>
                  </div>

                  {/* Feedback & Grammar Note */}
                  {evalRes && (
                    <div
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        evalRes.isPassed
                          ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                          : isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/40 border-amber-800 text-amber-200'
                      }`}
                    >
                      <p className="font-bold">{evalRes.feedback}</p>

                      <div className="pt-1 text-slate-800 dark:text-slate-200">
                        <strong>Câu chuẩn mẫu:</strong>{' '}
                        <span className="font-semibold text-rose-600 dark:text-rose-400 font-mono">
                          "{st.target}"
                        </span>
                        <button
                          onClick={() => speak(st.target)}
                          className="ml-2 text-slate-400 hover:text-rose-500 transition"
                          title="Nghe phát âm"
                        >
                          <i className="fa-solid fa-volume-high" />
                        </button>
                      </div>

                      {st.grammarNote && (
                        <div className="pt-1 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60">
                          <strong className="text-slate-700 dark:text-slate-300">Phân tích ngữ pháp:</strong> {st.grammarNote}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
