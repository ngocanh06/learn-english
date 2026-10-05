import React, { useState, useMemo } from 'react';
import {
  IELTS_33_TOPICS_META,
  IELTS_33_TOPICS_DATABASE,
  IELTS_ALL_33_TOPICS_WORDS,
} from '../../data/ieltsVocab33Topics';
import VocabStudyStudio from '../VocabStudyStudio';
import { useUserStorage } from '../../hooks/useUserStorage';

export default function IELTS33TopicsStudio({
  theme = 'dark',
  initialTopicId = 'topic-1',
}) {
  const isLight = theme === 'light';

  // Selected Topic
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('current'); // 'current' | 'all'

  // Global Spaced Repetition Mastery & Known Words
  const [vocabMastery] = useUserStorage('notebook_vocab_mastery_v1', {});
  const [knownWordsMap] = useUserStorage('vocab_mastery_v2', {});

  const isWordMastered = (wordStr) => {
    if (!wordStr) return false;
    const k = wordStr.toLowerCase().trim();
    return (vocabMastery?.[k]?.level >= 4) || Boolean(knownWordsMap?.[k]);
  };

  // Current Topic object
  const currentTopic = useMemo(() => {
    return (
      IELTS_33_TOPICS_DATABASE.find((t) => t.id === selectedTopicId) ||
      IELTS_33_TOPICS_DATABASE[0]
    );
  }, [selectedTopicId]);

  // Words list based on search and scope
  const displayWords = useMemo(() => {
    const pool =
      searchScope === 'all'
        ? IELTS_ALL_33_TOPICS_WORDS
        : currentTopic.words;

    if (!searchQuery.trim()) return pool;
    const q = searchQuery.toLowerCase().trim();
    return pool.filter(
      (w) =>
        (w.word && w.word.toLowerCase().includes(q)) ||
        (w.meaning && w.meaning.toLowerCase().includes(q)) ||
        (w.ipa && w.ipa.toLowerCase().includes(q))
    );
  }, [currentTopic, searchQuery, searchScope]);

  // Topic metrics
  const topicMasteredCount = useMemo(() => {
    return currentTopic.words.filter((w) => isWordMastered(w.word)).length;
  }, [currentTopic, vocabMastery, knownWordsMap]);

  const topicPct = Math.round(
    (topicMasteredCount / (currentTopic.words.length || 1)) * 100
  );

  // Total global metrics across all 4,050 words
  const totalMasteredCount = useMemo(() => {
    let count = 0;
    IELTS_ALL_33_TOPICS_WORDS.forEach((w) => {
      if (isWordMastered(w.word)) count += 1;
    });
    return count;
  }, [vocabMastery, knownWordsMap]);

  const totalPct = Math.round(
    (totalMasteredCount / (IELTS_ALL_33_TOPICS_WORDS.length || 1)) * 100
  );

  return (
    <div className="space-y-6 font-sans">
      {/* ─── HEADER: 33 TOPICS OVERVIEW & OVERALL PROGRESS ─── */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isLight
            ? 'bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/20 border-slate-200/90 shadow-sm'
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border-slate-800 shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <i className="fa-solid fa-graduation-cap" />
              IELTS Academic 33 Chủ Đề (Band 6.0 - 8.0+)
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Kho 4,050 Từ Vựng IELTS 33 Chủ Đề Thực Chiến
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Trích lọc toàn diện từ giáo trình IELTS chuyên sâu. Phân loại theo 33 chủ đề trọng điểm của bài thi Speaking & Writing kèm phiên âm IPA chuẩn, giải nghĩa tiếng Việt, 4 cấp độ nhớ Leitner và 5 chế độ luyện tập thông minh.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Chủ đề</span>
              <span className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">33</span>
              <span className="text-[10px] text-slate-400 block">chuyên sâu</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Đã thuộc</span>
              <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {totalMasteredCount}
              </span>
              <span className="text-[10px] text-slate-400 block">/ 4,050 từ</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Tiến độ</span>
              <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                {totalPct}%
              </span>
              <span className="text-[10px] text-slate-400 block">toàn bộ kho</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600 dark:text-slate-400">
              Tiến độ ghi nhớ toàn bộ 33 Chủ Đề IELTS ({totalMasteredCount} / 4,050 từ)
            </span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{totalPct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.max(2, totalPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 33 TOPICS SELECTOR CAROUSEL / GRID ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-black text-xs uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Chọn Chủ Đề Học Tập (1 - 33)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Đang mở: <strong>{currentTopic.titleEn}</strong> ({currentTopic.wordCount} từ)
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {IELTS_33_TOPICS_META.map((meta) => {
            const isSelected = meta.id === selectedTopicId;
            return (
              <button
                key={meta.id}
                onClick={() => {
                  setSelectedTopicId(meta.id);
                  setSearchScope('current');
                }}
                className={`px-3.5 py-2.5 rounded-2xl border text-left shrink-0 transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                  }`}
                >
                  <i className={`fa-solid ${meta.icon}`} />
                </div>
                <div>
                  <p className="text-xs font-bold whitespace-nowrap">
                    {meta.num}. {meta.titleEn}
                  </p>
                  <p
                    className={`text-[10px] truncate max-w-[120px] ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {meta.titleVi} • {meta.wordCount} từ
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── ACTIVE TOPIC BAR & SEARCH FILTER CONTROLLER ─── */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center text-base shrink-0">
            <i className={`fa-solid ${currentTopic.icon}`} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {currentTopic.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span>{currentTopic.wordCount} từ học thuật</span>
              <span>•</span>
              <span className="text-emerald-500 font-semibold">
                Đã thuộc: {topicMasteredCount}/{currentTopic.wordCount} ({topicPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Search & Scope */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchScope === 'current'
                  ? `Tìm trong ${currentTopic.titleEn}...`
                  : 'Tìm trên 4,050 từ...'
              }
              className={`w-full pl-8 pr-7 py-2 rounded-xl text-xs border outline-none transition ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                  : 'bg-slate-800 border-slate-700 text-white focus:border-blue-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSearchScope('current')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                searchScope === 'current'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Chủ đề ({currentTopic.wordCount})
            </button>
            <button
              onClick={() => setSearchScope('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                searchScope === 'all'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Tất cả (4,050)
            </button>
          </div>
        </div>
      </div>

      {/* ─── STANDARDIZED UNIFIED VOCAB STUDY STUDIO (SAME AS STUDY4) ─── */}
      <div className="pt-1">
        <VocabStudyStudio
          key={`${selectedTopicId}_${searchScope}_${searchQuery ? 'filtered' : 'raw'}`}
          words={displayWords}
          theme={theme}
          deckBadge={`IELTS • ${searchScope === 'all' ? '33 CHỦ ĐỀ' : currentTopic.titleEn.toUpperCase()}`}
          emptyTitle={`Chưa có từ vựng nào trong danh sách`}
          emptyDesc="Vui lòng thử tìm kiếm khác hoặc chuyển sang chủ đề tiếp theo."
        />
      </div>
    </div>
  );
}
