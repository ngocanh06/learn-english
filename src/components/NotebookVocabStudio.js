import React, { useCallback, useMemo, useEffect } from 'react';
import VocabStudyStudio from './VocabStudyStudio';
import { useUserStorage } from '../hooks/useUserStorage';
import { healSavedVocabList } from '../services/ipaService';

export default function NotebookVocabStudio({
  theme = 'dark',
  dateKey,
  dayState,
  onNavigate,
}) {
  const isLight = theme === 'light';

  // Persistence: Saved vocabulary list
  const [savedVocab, setSavedVocab] = useUserStorage('saved_video_vocab_v1', []);
  const [completedCalendarTasks, setCompletedCalendarTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const [vocabDayCompleted, setVocabDayCompleted] = useUserStorage('vocab_day_completed_v1', {});

  // Auto-heal legacy saved words (e.g. /shrove/ -> /ʃroʊv/)
  useEffect(() => {
    if (Array.isArray(savedVocab) && savedVocab.length > 0) {
      healSavedVocabList(savedVocab, setSavedVocab);
    }
  }, []);

  const deleteSavedWord = (wordToDelete) => {
    if (window.confirm(`Bạn có chắc muốn xóa từ "${wordToDelete}" khỏi Sổ tay từ vựng không?`)) {
      setSavedVocab((prev) => prev.filter((w) => w.word !== wordToDelete));
    }
  };

  // Mark Day Completed & Sync with Master Calendar
  const handleMarkCompletedToday = useCallback(() => {
    const now = new Date();
    const todayKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const targetDate = dateKey || todayKey;
    const dNum = dayState || now.getDate();

    setVocabDayCompleted((prev) => ({
      ...prev,
      [`notebook_vocab_day_${dNum}`]: true,
      [`notebook_day_${dNum}`]: true,
      [`${targetDate}_vocab`]: true,
    }));

    setCompletedCalendarTasks((prev) => ({
      ...prev,
      [`${targetDate}_vocab`]: true,
    }));
  }, [dateKey, dayState, setVocabDayCompleted, setCompletedCalendarTasks]);

  const isCompletedToday = useMemo(() => {
    const now = new Date();
    const todayKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const targetDate = dateKey || todayKey;
    const dNum = dayState || now.getDate();
    return Boolean(
      completedCalendarTasks[`${targetDate}_vocab`] ||
      vocabDayCompleted[`notebook_vocab_day_${dNum}`] ||
      vocabDayCompleted[`notebook_day_${dNum}`]
    );
  }, [completedCalendarTasks, vocabDayCompleted, dateKey, dayState]);

  return (
    <div className={`p-6 md:p-8 rounded-3xl border space-y-6 shadow-sm ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      {/* ─── TOP BAR: TITLE, STATS & COMPLETION BUTTON ──────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-book-bookmark" />
            </span>
            <h2 className="text-xl md:text-2xl font-black">Sổ Tay Từ Vựng Của Bạn</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              {savedVocab.length} từ vựng
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tổng hợp toàn bộ từ vựng bạn đã lưu khi đọc bài, xem video và làm bài tập. Học theo cơ chế lặp lại ngắt quãng (Spaced Repetition).
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleMarkCompletedToday}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-xs cursor-pointer ${
              isCompletedToday
                ? 'bg-emerald-600 text-white shadow-emerald-600/25 ring-2 ring-emerald-500/30'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 hover:scale-102 active:scale-95'
            }`}
          >
            <i className={`fa-solid ${isCompletedToday ? 'fa-circle-check' : 'fa-check'}`} />
            <span>{isCompletedToday ? '✓ Đã Hoàn Thành Ôn Tập Hôm Nay' : 'Đánh Dấu Đã Ôn Tập Hôm Nay'}</span>
          </button>
        </div>
      </div>

      {/* ─── UNIFIED VOCAB STUDY STUDIO ─────────────────────────────────────── */}
      <VocabStudyStudio
        words={savedVocab}
        theme={theme}
        canDeleteWord={true}
        onDeleteWord={deleteSavedWord}
        onStudyComplete={handleMarkCompletedToday}
        emptyTitle="Sổ từ vựng đang trống"
        emptyDesc="Khi xem bài đọc hoặc video, bôi đen từ bất kỳ hoặc bấm nút ⭐ trên các bài học để lưu vào Sổ từ nhé!"
        deckBadge="SỔ TỪ VỰNG"
      />
    </div>
  );
}
