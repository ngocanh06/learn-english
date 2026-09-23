import React, { useState, useMemo, useEffect, useCallback } from 'react';
import VocabStudyStudio from './VocabStudyStudio';
import { useUserStorage } from '../hooks/useUserStorage';

// ─── STATES ───────────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-slate-400">Đang tải từ vựng từ Google Sheet...</p>
    </div>
  );
}

function ErrorState({ error, onRefresh }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <i className="fa-solid fa-triangle-exclamation text-rose-500 text-5xl" />
      <p className="text-rose-500 font-bold">Không thể tải dữ liệu</p>
      <p className="text-slate-400 text-sm text-center max-w-sm">{error}</p>
      <button onClick={onRefresh}
        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition shadow-lg cursor-pointer">
        <i className="fa-solid fa-rotate-right" /> Thử lại
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VocabFromSheet({
  data = [],
  loading,
  error,
  onRefresh,
  tabs,
  activeTab,
  onTabChange,
  title,
  icon,
  theme,
  initialPartFilter = null,
  targetDay = null,
  knownWordsMap: propKnownWordsMap,
}) {
  const [localKnownMap] = useUserStorage('vocab_mastery_v2', {});
  const knownWordsMap = propKnownWordsMap || localKnownMap;
  const [vocabDayCompleted, setVocabDayCompleted] = useUserStorage('vocab_day_completed_v1', {});
  const [, setCompletedCalendarTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});

  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const totalWords = safeData.length;
  const WORDS_PER_DAY = 50;
  const baseWordChunks = Math.max(1, Math.ceil(totalWords / WORDS_PER_DAY));

  // Determine current day number in roadmap (Roadmap starts 01/09/2026)
  const todayDayNum = useMemo(() => {
    if (targetDay && Number(targetDay) > 0) {
      return Number(targetDay);
    }
    const start = new Date(2026, 8, 1);
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round((d - start) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays + 1 : 1;
  }, [targetDay]);

  const todayChunkId = `day-${todayDayNum}`;

  const [filterTopic, setFilt] = useState('all');
  const [partFilter, setPartFilter] = useState(() => {
    if (initialPartFilter && initialPartFilter !== 'all') {
      if (initialPartFilter === 'part1') return 'day-1';
      if (initialPartFilter === 'part2') return 'day-2';
      return initialPartFilter;
    }
    return `day-${todayDayNum}`;
  });

  const isLight = theme === 'light';

  const isWordKnown = useCallback((w) => !!knownWordsMap?.[(w || '').toLowerCase().trim()], [knownWordsMap]);

  useEffect(() => {
    setFilt('all');
  }, [activeTab?.id]);

  const totalChunksNeeded = useMemo(() => {
    const dayReq = Math.max(todayDayNum, 20);
    return Math.max(baseWordChunks, dayReq);
  }, [baseWordChunks, todayDayNum]);

  const dayChunks = useMemo(() => {
    const chunks = [];
    if (safeData.length === 0) return chunks;

    for (let i = 0; i < totalChunksNeeded; i++) {
      const dayNum = i + 1;
      const isToday = dayNum === todayDayNum;

      const chunkIdx = i % baseWordChunks;
      const start = chunkIdx * WORDS_PER_DAY;
      const end = Math.min(start + WORDS_PER_DAY, totalWords);
      const cards = safeData.slice(start, end);
      const round = Math.floor(i / baseWordChunks) + 1;

      const label = round > 1
        ? (isToday ? `⭐ [Hôm nay: Ngày ${dayNum}] • Ôn củng cố vòng ${round} (Từ ${start + 1} - ${end})` : `Ngày ${dayNum} • Ôn củng cố vòng ${round} (Từ ${start + 1} - ${end})`)
        : (isToday ? `⭐ [Hôm nay: Ngày ${dayNum}] (Từ ${start + 1} - ${end})` : `Ngày ${dayNum} (Từ ${start + 1} - ${end})`);

      chunks.push({
        id: `day-${dayNum}`,
        dayNum,
        startIdx: start,
        endIdx: end,
        isToday,
        label,
        shortLabel: isToday ? `⭐ Ngày ${dayNum} (Hôm nay)` : `Ngày ${dayNum}`,
        cards,
      });
    }
    return chunks;
  }, [safeData, totalChunksNeeded, baseWordChunks, totalWords, todayDayNum]);

  const totalDays = dayChunks.length;

  // Proactively select the target day chunk
  useEffect(() => {
    if (initialPartFilter && initialPartFilter !== 'all') {
      if (initialPartFilter === 'part1') setPartFilter('day-1');
      else if (initialPartFilter === 'part2') setPartFilter('day-2');
      else setPartFilter(initialPartFilter);
    } else {
      setPartFilter(todayChunkId);
    }
  }, [initialPartFilter, activeTab?.id, todayChunkId]);

  const currentChunk = useMemo(() => {
    if (partFilter === 'all' || partFilter === 'review-all') return null;
    return dayChunks.find((c) => c.id === partFilter) || (dayChunks.length > 0 ? dayChunks[0] : null);
  }, [dayChunks, partFilter]);

  const topics = useMemo(() => {
    const t = new Set();
    safeData.forEach((d) => {
      if (d && d.topic) t.add(d.topic);
    });
    return Array.from(t);
  }, [safeData]);

  const baseCardsByPart = useMemo(() => {
    if (partFilter === 'review-all') {
      const known = safeData.filter(c => c && c.word && isWordKnown(c.word));
      return known.length > 0 ? known : safeData;
    }
    if (partFilter === 'all') return safeData;
    if (currentChunk) return currentChunk.cards;
    return safeData;
  }, [partFilter, currentChunk, safeData, isWordKnown]);

  const isDailyDictationTab = ['short-stories', 'conversation', 'toeic', 'ielts', 'stories-kids'].includes(activeTab?.id);
  const isReadingTab = activeTab?.id === 'toeic-reading';
  const currentSkillKey = isDailyDictationTab
    ? (activeTab?.id || 'short-stories')
    : isReadingTab
    ? 'reading'
    : 'listening';

  const currentChunkDayKey = currentChunk
    ? (isDailyDictationTab
        ? `dd_vocab_${currentSkillKey}_day_${currentChunk.dayNum}`
        : `study4_${currentSkillKey}_day_${currentChunk.dayNum}`)
    : null;

  const isDayChunkCompleted = useMemo(() => {
    if (!currentChunk || !currentChunkDayKey) return false;
    if (
      vocabDayCompleted[currentChunkDayKey] ||
      (isDailyDictationTab && (
        vocabDayCompleted[`dd_vocab_day_${currentChunk.dayNum}`] ||
        vocabDayCompleted[`day_${currentChunk.dayNum}_vocab`]
      )) ||
      (!isDailyDictationTab && vocabDayCompleted[`study4_day_${currentChunk.dayNum}`])
    ) {
      return true;
    }
    return false;
  }, [currentChunk, currentChunkDayKey, isDailyDictationTab, vocabDayCompleted]);

  // Handle day completion toggle & calendar sync
  const handleToggleDayComplete = useCallback(() => {
    if (!currentChunk || !currentChunkDayKey) return;
    const nextVal = !isDayChunkCompleted;
    setVocabDayCompleted((prev) => ({
      ...prev,
      [currentChunkDayKey]: nextVal,
      ...(isDailyDictationTab
        ? {
            [`dd_vocab_day_${currentChunk.dayNum}`]: nextVal,
            [`day_${currentChunk.dayNum}_vocab`]: nextVal,
          }
        : {
            [`study4_day_${currentChunk.dayNum}`]: nextVal,
          }),
    }));

    const dayNum = currentChunk.dayNum;
    const chunkDate = new Date(2026, 8, dayNum);
    const chunkDateKey = `${String(chunkDate.getDate()).padStart(2, '0')}/${String(chunkDate.getMonth() + 1).padStart(2, '0')}/${chunkDate.getFullYear()}`;
    const today = new Date();
    const todayDateKey = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    setCompletedCalendarTasks((prev) => ({
      ...prev,
      ...(isDailyDictationTab
        ? {
            [`${chunkDateKey}_vocab`]: nextVal,
            ...(dayNum === todayDayNum ? { [`${todayDateKey}_vocab`]: nextVal } : {}),
          }
        : {
            [`${chunkDateKey}_study4_vocab`]: nextVal,
            ...(dayNum === todayDayNum ? { [`${todayDateKey}_study4_vocab`]: nextVal } : {}),
          }),
    }));
  }, [currentChunk, currentChunkDayKey, isDayChunkCompleted, isDailyDictationTab, setVocabDayCompleted, setCompletedCalendarTasks, todayDayNum]);

  // Words list passed into unified VocabStudyStudio
  const wordsToStudy = useMemo(() => {
    let cards = baseCardsByPart;
    if (filterTopic !== 'all') {
      cards = cards.filter((d) => d && d.topic === filterTopic);
    }
    return cards.filter((c) => c && c.word && c.word.trim() !== '');
  }, [baseCardsByPart, filterTopic]);

  const knownCount = useMemo(() => {
    return safeData.filter(c => c && c.word && isWordKnown(c.word)).length;
  }, [safeData, isWordKnown]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-black flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>{icon} {title}</h2>
          <p className={`text-xs md:text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Đã thuộc <strong className="text-emerald-500 font-bold">{knownCount}</strong> / {safeData.length} từ ({Math.max(0, safeData.length - knownCount)} từ chưa học)
          </p>
        </div>
        <button onClick={onRefresh} className={`p-2 rounded-xl border transition cursor-pointer ${
          isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
        }`} title="Làm mới dữ liệu">
          <i className="fa-solid fa-rotate-right" />
        </button>
      </div>

      {/* Sheet tabs */}
      {tabs && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => onTabChange(tab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border cursor-pointer ${
                activeTab?.id === tab.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}>
              {typeof tab.icon === 'string' && tab.icon.startsWith('fa-') ? (
                <i className={`fa-solid ${tab.icon}`} />
              ) : (
                tab.icon
              )}{' '}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingState />}
      {error && !loading && <ErrorState error={error} onRefresh={onRefresh} />}

      {!loading && !error && safeData.length > 0 && (
        <div className="space-y-6">
          {/* 50-Word Daily Splitter Bar */}
          {totalWords > 50 && (
            <div
              className={`p-3.5 md:p-4 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs ${
                isLight
                  ? 'bg-blue-50/80 border-blue-200 text-slate-900'
                  : 'bg-slate-900/90 border-slate-700/80 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center text-base font-black shrink-0">
                  <i className="fa-solid fa-calendar-check" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-black tracking-tight flex items-center gap-2 flex-wrap">
                    <span>Lộ trình chia 50 từ / ngày ({totalWords} từ • {totalDays} ngày học):</span>
                    {currentChunk && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-xs flex items-center gap-1.5 ${
                        currentChunk.dayNum === todayDayNum
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/40'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {currentChunk.dayNum === todayDayNum && <i className="fa-solid fa-star text-[9px] text-amber-300" />}
                        <span>{currentChunk.dayNum === todayDayNum ? `Hôm nay (Ngày ${currentChunk.dayNum})` : `Ngày ${currentChunk.dayNum}`}: Từ {currentChunk.startIdx + 1} ➔ {currentChunk.endIdx}</span>
                      </span>
                    )}
                    {partFilter === 'all' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-600 text-white font-extrabold uppercase">
                        Toàn Bộ Danh Sách ({totalWords} từ)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentChunk
                      ? currentChunk.dayNum === todayDayNum
                        ? `🎯 Hôm nay là Ngày ${todayDayNum} của lộ trình: Học trọng tâm ${currentChunk.cards.length} từ (STT ${currentChunk.startIdx + 1} đến ${currentChunk.endIdx})`
                        : `Đang xem Ngày ${currentChunk.dayNum}: ${currentChunk.cards.length} từ (STT ${currentChunk.startIdx + 1} đến ${currentChunk.endIdx})`
                      : `Học toàn bộ ${totalWords} từ trong phần này`}
                  </p>
                </div>
              </div>

              {/* Day Selector & Navigation */}
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap shrink-0">
                {/* Day Completion Sync Toggle Button */}
                {currentChunk && (
                  <button
                    type="button"
                    onClick={handleToggleDayComplete}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer ${
                      isDayChunkCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/40'
                        : isLight
                        ? 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-slate-800 hover:bg-emerald-950/40 text-emerald-300 border border-emerald-700'
                    }`}
                    title={isDayChunkCompleted ? "Bấm để hủy tích hoàn thành" : "Bấm để tích hoàn thành ngày này và tự động đồng bộ vào Lịch học"}
                  >
                    <i className={isDayChunkCompleted ? "fa-solid fa-circle-check text-white" : "fa-regular fa-circle-check text-emerald-500"} />
                    <span>{isDayChunkCompleted ? `Đã Hoàn Thành Ngày ${currentChunk.dayNum}` : `Tích Hoàn Thành Ngày ${currentChunk.dayNum}`}</span>
                  </button>
                )}

                {/* Quick Jump to Today's Day Button (if not already viewing today) */}
                {partFilter !== todayChunkId && totalWords > 50 && (
                  <button
                    type="button"
                    onClick={() => setPartFilter(todayChunkId)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer hover:scale-102 shrink-0"
                    title={`Chuyển về 50 từ của ngày hôm nay (Ngày ${todayDayNum})`}
                  >
                    <i className="fa-solid fa-calendar-day text-[11px]" />
                    <span>Hôm nay (Ngày {todayDayNum})</span>
                  </button>
                )}

                {/* Prev Day Button */}
                <button
                  onClick={() => {
                    const curIdx = dayChunks.findIndex((c) => c.id === partFilter);
                    if (curIdx > 0) {
                      setPartFilter(dayChunks[curIdx - 1].id);
                    } else if (partFilter === 'all') {
                      setPartFilter(dayChunks[dayChunks.length - 1].id);
                    }
                  }}
                  disabled={partFilter === 'day-1'}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border text-xs font-bold transition ${
                    partFilter === 'day-1'
                      ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs cursor-pointer'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 cursor-pointer'
                  }`}
                  title="Ngày trước"
                >
                  <i className="fa-solid fa-chevron-left text-[10px]" />
                </button>

                {/* Day Select Dropdown */}
                <select
                  value={partFilter}
                  onChange={(e) => setPartFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold border outline-none cursor-pointer transition shadow-xs ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 hover:border-blue-500'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-400'
                  }`}
                >
                  {dayChunks.map((chunk) => (
                    <option key={chunk.id} value={chunk.id}>
                      {chunk.label}
                    </option>
                  ))}
                  <option value="all">Toàn bộ danh sách ({totalWords} từ)</option>
                  {knownCount > 0 && (
                    <option value="review-all">
                      🔄 Ôn tập tất cả từ đã thuộc toàn bộ ({knownCount} từ)
                    </option>
                  )}
                </select>

                {/* Next Day Button */}
                <button
                  onClick={() => {
                    const curIdx = dayChunks.findIndex((c) => c.id === partFilter);
                    if (curIdx >= 0 && curIdx < dayChunks.length - 1) {
                      setPartFilter(dayChunks[curIdx + 1].id);
                    }
                  }}
                  disabled={partFilter === `day-${totalDays}`}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border text-xs font-bold transition ${
                    partFilter === `day-${totalDays}`
                      ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs cursor-pointer'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 cursor-pointer'
                  }`}
                  title="Ngày tiếp theo"
                >
                  <i className="fa-solid fa-chevron-right text-[10px]" />
                </button>

                {/* Quick Toggle to View All */}
                <button
                  onClick={() => setPartFilter(partFilter === 'all' ? todayChunkId : 'all')}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition border shadow-xs cursor-pointer ${
                    partFilter === 'all'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {partFilter === 'all' ? `Học Ngày ${todayDayNum}` : 'Xem tất cả'}
                </button>
              </div>
            </div>
          )}

          {/* Topics filter (if topics available) */}
          {topics.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Chủ đề:</span>
              <select
                value={filterTopic}
                onChange={(e) => setFilt(e.target.value)}
                className={`border rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-indigo-500 transition cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800 shadow-xs'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <option value="all">Tất cả chủ đề ({safeData.length} từ)</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ─── STANDARDIZED UNIFIED VOCAB STUDY STUDIO ─── */}
          <VocabStudyStudio
            words={wordsToStudy}
            theme={theme}
            canDeleteWord={false}
            onStudyComplete={() => {
              if (currentChunk && !isDayChunkCompleted) {
                handleToggleDayComplete();
              }
            }}
            deckBadge={activeTab?.label || title || 'TỪ VỰNG'}
            emptyTitle="Chưa có từ vựng nào"
            emptyDesc="Không tìm thấy từ vựng trong ngày hoặc chủ đề đã chọn."
          />
        </div>
      )}
    </div>
  );
}
