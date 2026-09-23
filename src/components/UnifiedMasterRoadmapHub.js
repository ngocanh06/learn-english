import React, { useState } from 'react';
import { ROADMAP_STAGES, UNIFIED_MASTER_DAYS } from '../data/unifiedMasterRoadmap';
import { STUDY4_TOEIC_SCHEDULE } from '../data/toeicScheduleStudy4';
import { useUserStorage } from '../hooks/useUserStorage';
import { DEFAULT_DICTATION_STARS, getDayDictationStatus } from '../utils/dictationProgress';

export default function UnifiedMasterRoadmapHub({ onNavigate, onOpenWriting, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: Completed sub-tasks map: { [`day_${day}_${taskKey}`]: boolean }
  const [completedTasksMap, setCompletedTasksMap] = useUserStorage('master_roadmap_completed_tasks_v1', {});
  const [calendarTasks, setCalendarTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const [dictationStars, setDictationStars] = useUserStorage('dailydictation_stars_v4', DEFAULT_DICTATION_STARS);
  const [selectedStage, setSelectedStage] = useState('ALL');

  const getDateKeyForDay = (day) => {
    const startDate = new Date(2026, 8, 1);
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + (day - 1));
    return `${String(dayDate.getDate()).padStart(2, '0')}/${String(dayDate.getMonth() + 1).padStart(2, '0')}/${dayDate.getFullYear()}`;
  };

  const toggleTask = (day, taskKey) => {
    const key = `day_${day}_${taskKey}`;
    const dateKey = getDateKeyForDay(day);
    const dayItem = UNIFIED_MASTER_DAYS.find((d) => d.day === day);
    const ddStatus = taskKey === 'dd' ? getDayDictationStatus(dayItem?.dailyDictation, dictationStars) : null;
    const wasCompleted = Boolean(
      completedTasksMap[key] ||
      calendarTasks[`${dateKey}_${taskKey}`] ||
      calendarTasks[key] ||
      (taskKey === 'study4' && (calendarTasks[`${dateKey}_study4_vocab`] || calendarTasks[`${dateKey}_study4_test`])) ||
      (taskKey === 'speaking' && (calendarTasks[`${dateKey}_shadowing`] || calendarTasks[`${dateKey}_speaking`])) ||
      (taskKey === 'dd' && ddStatus?.isAllDone)
    );
    const nextVal = !wasCompleted;

    setCompletedTasksMap((prev) => ({
      ...prev,
      [key]: nextVal,
    }));

    setCalendarTasks((prev) => {
      const updated = {
        ...prev,
        [`${dateKey}_${taskKey}`]: nextVal,
        [key]: nextVal,
      };
      if (taskKey === 'study4') {
        updated[`${dateKey}_study4_vocab`] = nextVal;
        updated[`${dateKey}_study4`] = nextVal;
      }
      if (taskKey === 'speaking') {
        updated[`${dateKey}_shadowing`] = nextVal;
        updated[`${dateKey}_speaking`] = nextVal;
      }
      return updated;
    });

    if (taskKey === 'dd' && ddStatus?.tracks?.length > 0) {
      setDictationStars((prev) => {
        const updated = { ...prev };
        ddStatus.tracks.forEach((t) => { updated[t.id] = nextVal; });
        return updated;
      });
    }
  };

  const filteredDays = UNIFIED_MASTER_DAYS.filter(
    (d) => selectedStage === 'ALL' || d.stage === selectedStage
  );

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* ─── STAGE FILTER SELECTOR ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {ROADMAP_STAGES.map((stg) => {
          const active = selectedStage === stg.id;
          return (
            <button
              key={stg.id}
              onClick={() => setSelectedStage(selectedStage === stg.id ? 'ALL' : stg.id)}
              className={`p-3.5 rounded-3xl border text-left transition-all duration-200 flex items-center gap-3.5 group select-none ${
                active
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg ring-2 ring-blue-400/30'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs hover:border-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              {/* Stage Thumbnail */}
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <img
                  src={stg.image}
                  alt={stg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                  <i className={`fa-solid ${stg.icon} text-[10px] text-white`} />
                </div>
              </div>

              {/* Stage Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                      active ? 'bg-white/25 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {stg.days}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs leading-tight line-clamp-2 mt-0.5">
                  {stg.name}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── DAYS LIST ──────────────────────────────────────────── */}
      <div className="space-y-6">
        {filteredDays.map((dayItem) => {
          const ddStatus = getDayDictationStatus(dayItem.dailyDictation, dictationStars);
          const dateKey = getDateKeyForDay(dayItem.day);
          const isStudy4Done = Boolean(
            completedTasksMap[`day_${dayItem.day}_study4`] ||
            calendarTasks[`${dateKey}_study4_vocab`] ||
            calendarTasks[`${dateKey}_study4_test`] ||
            calendarTasks[`${dateKey}_study4`] ||
            calendarTasks[`day_${dayItem.day}_study4`]
          );
          const isDdDone = Boolean(
            completedTasksMap[`day_${dayItem.day}_dd`] ||
            calendarTasks[`${dateKey}_dd`] ||
            calendarTasks[`day_${dayItem.day}_dd`] ||
            ddStatus.isAllDone
          );
          const isGrammarDone = Boolean(
            completedTasksMap[`day_${dayItem.day}_grammar`] ||
            calendarTasks[`${dateKey}_grammar`] ||
            calendarTasks[`day_${dayItem.day}_grammar`]
          );
          const isWritingDone = Boolean(
            completedTasksMap[`day_${dayItem.day}_writing`] ||
            calendarTasks[`${dateKey}_writing`] ||
            calendarTasks[`day_${dayItem.day}_writing`]
          );
          const isSpeakingDone = Boolean(
            completedTasksMap[`day_${dayItem.day}_speaking`] ||
            calendarTasks[`${dateKey}_shadowing`] ||
            calendarTasks[`${dateKey}_speaking`] ||
            calendarTasks[`day_${dayItem.day}_speaking`]
          );

          const completedCount = [isStudy4Done, isDdDone, isGrammarDone, isWritingDone, isSpeakingDone].filter(Boolean).length;
          const isAllDone = completedCount === 5;

          // Find corresponding Study4 session safely
          const study4Session = STUDY4_TOEIC_SCHEDULE.find((s) => s.day === dayItem.day) || {
            skill: 'Listening',
            activity: 'Luyện đề & Từ vựng TOEIC Study4',
            duration: 60,
            note: 'Ôn tập và kiểm tra chi tiết theo lịch',
          };

          return (
            <div
              key={dayItem.day}
              className={`p-6 rounded-3xl border transition-all space-y-4 ${
                isAllDone
                  ? isLight ? 'bg-emerald-50/40 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800/40'
                  : isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-sm font-black font-mono shadow-sm">
                    D{dayItem.day}
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      {dayItem.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-bold">
                      Giai đoạn {dayItem.stage === 'stage-1' ? '1: Lấy Gốc' : dayItem.stage === 'stage-2' ? '2: Tăng Tốc' : '3: Bứt Phá'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {completedCount} / 5 Trụ cột hoàn thành
                  </span>
                  <div className="w-20 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${(completedCount / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 5 Integrated Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 1. Study4 TOEIC */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                    isStudy4Done
                      ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-rose-500 mb-1">
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-bullseye text-xs" /> Study4 TOEIC</span>
                      <span className="font-mono">{study4Session?.duration ? `${study4Session.duration}p` : '60p'}</span>
                    </div>
                    <h4 className="text-xs font-extrabold line-clamp-2">{study4Session?.activity || 'Luyện Đề TOEIC'}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{study4Session?.note || 'Chữa chi tiết & lọc từ vựng'}</p>
                  </div>

                  <button
                    onClick={() => toggleTask(dayItem.day, 'study4')}
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      isStudy4Done
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isStudy4Done ? 'fa-circle-check' : 'fa-check'}`} />
                    <span>{isStudy4Done ? 'Đã xong' : 'Hoàn thành'}</span>
                  </button>
                </div>

                {/* 2. DailyDictation (3 Tracks) */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                    isDdDone
                      ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-cyan-500 mb-1">
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-headphones text-xs" /> DailyDictation</span>
                      <span className="font-mono">{dayItem.dailyDictation?.duration || '30 phút'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        Bộ 3 Track
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        ddStatus.isAllDone
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-500'
                      }`}>
                        {ddStatus.doneCount}/3 track {ddStatus.isAllDone ? '⭐' : ''}
                      </span>
                    </div>
                    <h4 className="text-xs font-extrabold line-clamp-2">
                      {dayItem.dailyDictation?.shortStories || 'Nghe chép chính tả'}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {dayItem.dailyDictation?.conversations || dayItem.dailyDictation?.summary || 'Hội thoại & TOEIC'}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleTask(dayItem.day, 'dd')}
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      isDdDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isDdDone ? 'fa-circle-check' : 'fa-check'}`} />
                    <span>{isDdDone ? 'Đã xong' : 'Hoàn thành'}</span>
                  </button>
                </div>

                {/* 3. Grammar & Vocab (Test-English) */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                    isGrammarDone
                      ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-amber-500 mb-1">
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-book-open text-xs" /> Ngữ Pháp & Từ Vựng</span>
                      <span className="font-mono">{dayItem.grammar?.duration || '20 phút'}</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 block w-fit mb-1 truncate max-w-full">
                      {dayItem.grammar?.source || '115 Bài Ngữ Pháp'}
                    </span>
                    <h4 className="text-xs font-extrabold line-clamp-2">
                      {dayItem.grammar?.topic || 'Ngữ Pháp CEFR'}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                      {dayItem.vocabAlternating?.topic || 'Từ vựng xen kẽ'}
                    </p>
                    {dayItem.vocabAlternating && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const v = dayItem.vocabAlternating;
                          const studyDay = dayItem.day || 1;
                          if (v?.category === 'daily-dictation') {
                            onNavigate && onNavigate('vocabulary', { section: 'daily-dictation', tabId: v.tabId || 'short-stories', day: studyDay, partFilter: `day-${studyDay}` });
                          } else if (v?.category === 'notebook') {
                            onNavigate && onNavigate('vocabulary', { section: 'notebook', day: studyDay });
                          } else if (v?.category === 'study4') {
                            onNavigate && onNavigate('vocabulary', { section: 'study4', tabId: v.tabId || 'toeic-listening', day: studyDay, partFilter: `day-${studyDay}` });
                          } else {
                            onNavigate && onNavigate('vocabulary', { section: 'part', levelId: v?.levelId || 'so-cap', partNum: v?.partNum || 1, day: studyDay });
                          }
                        }}
                        className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 mt-1 pt-1 border-t border-amber-500/20"
                      >
                        <i className="fa-solid fa-fire text-amber-500 text-[9px]" />
                        <span>Học thử thách ({dayItem.vocabAlternating.targetWordsCount === 'Toàn bộ' ? 'Ôn tập' : `${dayItem.vocabAlternating.targetWordsCount || 50} từ`}) ➔</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => toggleTask(dayItem.day, 'grammar')}
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      isGrammarDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isGrammarDone ? 'fa-circle-check' : 'fa-check'}`} />
                    <span>{isGrammarDone ? 'Đã xong' : 'Hoàn thành'}</span>
                  </button>
                </div>

                {/* 4. Reading Comprehension */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                    isWritingDone
                      ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-rose-500 mb-1">
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-book-reader text-xs" /> Luyện Đọc (Reading)</span>
                      <span className="font-mono">{dayItem.reading?.duration || '15 phút'}</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 block w-fit mb-1">
                      Test-English A1-C1
                    </span>
                    <h4 className="text-xs font-extrabold line-clamp-2">
                      {dayItem.reading?.topic || 'Đọc hiểu chuyên sâu'}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {dayItem.reading?.note || 'Tra từ có phiên âm & Audio'}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleTask(dayItem.day, 'writing')}
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      isWritingDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isWritingDone ? 'fa-circle-check' : 'fa-check'}`} />
                    <span>{isWritingDone ? 'Đã xong' : 'Hoàn thành'}</span>
                  </button>
                </div>

                {/* 5. Writing & Shadowing Output */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                    isSpeakingDone
                      ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-purple-500 mb-1">
                      <span className="flex items-center gap-1.5"><i className="fa-solid fa-pen-nib text-xs" /> Dịch & Shadowing</span>
                      <span className="font-mono">{dayItem.writing?.duration || '15 phút'}</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 block w-fit mb-1">
                      AI Output Hub
                    </span>
                    <h4 className="text-xs font-extrabold line-clamp-2">
                      {dayItem.writing?.topic || 'Dịch câu phản xạ'}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {dayItem.shadowing?.topic || 'Nhại giọng bản ngữ AI'}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleTask(dayItem.day, 'speaking')}
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      isSpeakingDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isSpeakingDone ? 'fa-circle-check' : 'fa-check'}`} />
                    <span>{isSpeakingDone ? 'Đã xong' : 'Hoàn thành'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
