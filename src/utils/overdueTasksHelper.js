import { UNIFIED_MASTER_DAYS } from '../data/unifiedMasterRoadmap';
import { READING_DATABASE } from '../data/readingData';
import { getDayDictationStatus } from './dictationProgress';

const DOW_LABELS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

/**
 * Helper to get reading test ID for a day
 */
export function getReadingTestIdForDay(dayNum) {
  const day = dayNum || 1;
  const a1Tests = READING_DATABASE?.A1 || [];
  const a2Tests = READING_DATABASE?.A2 || [];
  const b1Tests = READING_DATABASE?.B1 || [];

  if (day <= 15) {
    const idx = (day - 1) % (a1Tests.length || 1);
    return a1Tests[idx]?.id || a1Tests[0]?.id;
  } else if (day <= 35) {
    const idx = (day - 16) % (a2Tests.length || 1);
    return a2Tests[idx]?.id || a2Tests[0]?.id;
  } else {
    const idx = (day - 36) % (b1Tests.length || 1);
    return b1Tests[idx]?.id || b1Tests[0]?.id;
  }
}

/**
 * Helper to calculate plan for a specific date
 */
export function getPlanForDate(dateObj) {
  if (!dateObj) return null;
  const start = new Date(2026, 8, 1); // 01/09/2026
  const d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  const diffDays = Math.round((d - start) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return null;
  const idx = diffDays % UNIFIED_MASTER_DAYS.length;
  return UNIFIED_MASTER_DAYS[idx] || null;
}

/**
 * Calculate all incomplete/overdue tasks from previous days (prior to today).
 *
 * @param {Object} storage - All relevant user storage maps
 * @returns {Object} { overdueTasks, overdueGroupedByDate, totalOverdueCount, overdueDaysCount }
 */
export function calculateOverdueTasks({
  completedTasks = {},
  grammarRemembered = {},
  grammarQuizSubmitted = {},
  completedReading = {},
  readingQuizSubmitted = {},
  dictationStars = {},
  vocabDayCompleted = {},
  knownWordsMap = {},
  speakingSecondsMap = {},
  shadowedSentencesMap = {},
  completedWriting = {},
  activeTestNum = 1,
  study4StatusMap = {},
} = {}) {
  const today = new Date();
  const start = new Date(2026, 8, 1); // Roadmap start date: 01/09/2026
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Check if today is before start date
  if (todayZero <= start) {
    return {
      overdueTasks: [],
      overdueGroupedByDate: [],
      totalOverdueCount: 0,
      overdueDaysCount: 0,
    };
  }

  const overdueTasks = [];
  const overdueGroupedByDate = [];

  // Yesterday zero date
  const yesterdayZero = new Date(todayZero);
  yesterdayZero.setDate(yesterdayZero.getDate() - 1);

  // Iterate backwards from yesterday down to start date (up to maximum 30 past days to keep UI fast & focused)
  const maxDaysToCheck = 30;
  const curr = new Date(yesterdayZero);
  let checkedCount = 0;

  while (curr >= start && checkedCount < maxDaysToCheck) {
    checkedCount++;
    const dateObj = new Date(curr);
    const dateKey = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
    const plan = getPlanForDate(dateObj);

    if (plan) {
      const dayNum = plan.day || 1;
      const unpaddedDateKey = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
      const isPillarCompleted = (pillarKey) => {
        return Boolean(
          completedTasks[`${dateKey}_${pillarKey}`] ||
          completedTasks[`${unpaddedDateKey}_${pillarKey}`] ||
          completedTasks[`day_${dayNum}_${pillarKey}`] ||
          (pillarKey === 'study4_vocab' && (completedTasks[`${dateKey}_study4`] || completedTasks[`day_${dayNum}_study4`])) ||
          (pillarKey === 'shadowing' && (completedTasks[`${dateKey}_speaking`] || completedTasks[`day_${dayNum}_speaking`]))
        );
      };

      const dowLabel = DOW_LABELS[dateObj.getDay()];
      const isYesterday = dateObj.toDateString() === yesterdayZero.toDateString();
      const dayOverdueTasks = [];

      // ─── 1. DAILY DICTATION (3 TRACKS COMBO) ───
      const ddStatus = getDayDictationStatus(plan.dailyDictation, dictationStars);
      const isDdDone = Boolean(isPillarCompleted('dd') || ddStatus.isAllDone);
      if (!isDdDone) {
        dayOverdueTasks.push({
          id: 'dd',
          pillarKey: 'dd',
          dateKey,
          dateObj,
          dayNum,
          dowLabel,
          isYesterday,
          category: 'Nghe Chép Chính Tả',
          title: `DailyDictation 3 Bài (Ngày ${dayNum})`,
          detail: plan.dailyDictation?.summary || 'Nghe chép chính tả 3 bài luyện bắt âm & phản xạ',
          icon: 'fa-solid fa-headphones',
          badgeColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-800',
          actionNav: { tab: 'dailydictation' },
        });
      }

      // ─── 2. NGỮ PHÁP (GRAMMAR) ───
      const grammarLessonId = String(plan.grammar?.lessonId || '');
      const isGrammarDone = Boolean(
        isPillarCompleted('grammar') ||
        (grammarLessonId && (grammarRemembered[grammarLessonId] || grammarQuizSubmitted[grammarLessonId]))
      );
      if (!isGrammarDone && plan.grammar?.topic) {
        dayOverdueTasks.push({
          id: 'grammar',
          pillarKey: 'grammar',
          dateKey,
          dateObj,
          dayNum,
          dowLabel,
          isYesterday,
          category: 'Ngữ Pháp Chuyên Đề',
          title: plan.grammar.topic,
          detail: plan.grammar.note || 'Lý thuyết & bài tập trắc nghiệm ngữ pháp',
          icon: 'fa-solid fa-graduation-cap',
          badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800',
          actionNav: { tab: 'grammar', params: { lessonId: grammarLessonId } },
        });
      }



      // ─── 4. LUYỆN ĐỌC CEFR (READING) ───
      const rTestId = getReadingTestIdForDay(dayNum);
      const isReadingDone = Boolean(
        isPillarCompleted('reading') ||
        (rTestId && (completedReading[rTestId] || readingQuizSubmitted[rTestId]))
      );
      if (!isReadingDone) {
        dayOverdueTasks.push({
          id: 'reading',
          pillarKey: 'reading',
          dateKey,
          dateObj,
          dayNum,
          dowLabel,
          isYesterday,
          category: 'Luyện Đọc CEFR',
          title: `Đọc hiểu CEFR A1-B1 (Ngày ${dayNum})`,
          detail: 'Bài đọc hiểu chọn lọc kèm phân tích từ vựng ngữ cảnh',
          icon: 'fa-solid fa-book-open-reader',
          badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
          actionNav: { tab: 'reading', params: { testId: rTestId } },
        });
      }

      // ─── 5. LUYỆN DỊCH CÂU (WRITING) ───
      const writingLessonId = plan.writing?.lessonId || `day_${dayNum}`;
      const isWritingDone = Boolean(
        isPillarCompleted('writing') ||
        completedWriting[writingLessonId]
      );
      if (!isWritingDone && plan.writing) {
        dayOverdueTasks.push({
          id: 'writing',
          pillarKey: 'writing',
          dateKey,
          dateObj,
          dayNum,
          dowLabel,
          isYesterday,
          category: 'Luyện Dịch Câu',
          title: `Luyện Dịch Câu (The IELTS Dict): Ngày ${dayNum}`,
          detail: plan.writing.note || 'Luyện dịch câu Anh - Việt nâng cao phản xạ cấu trúc',
          icon: 'fa-solid fa-pen-nib',
          badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800',
          actionNav: { tab: 'writing', params: { lessonId: writingLessonId } },
        });
      }

      // ─── 6. VIDEO SHADOWING AI (SPEAKING) ───
      const spkSec = speakingSecondsMap[dateKey] || 0;
      const shdSentences = shadowedSentencesMap[dateKey] || [];
      const isSpeakingDone = Boolean(
        isPillarCompleted('shadowing') ||
        spkSec >= 300 ||
        shdSentences.length >= 5
      );
      if (!isSpeakingDone) {
        dayOverdueTasks.push({
          id: 'shadowing',
          pillarKey: 'shadowing',
          dateKey,
          dateObj,
          dayNum,
          dowLabel,
          isYesterday,
          category: 'Video Shadowing AI',
          title: `Luyện Nói Shadowing AI (Ngày ${dayNum})`,
          detail: 'Luyện nhại giọng & phát âm chuẩn theo video bản xứ',
          icon: 'fa-solid fa-microphone-lines',
          badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800',
          actionNav: { tab: 'video-hub' },
        });
      }

      // If this past day has any incomplete tasks, record them
      if (dayOverdueTasks.length > 0) {
        overdueTasks.push(...dayOverdueTasks);
        overdueGroupedByDate.push({
          dateKey,
          dateObj,
          dayNum,
          dowLabel,
          isYesterday,
          tasks: dayOverdueTasks,
        });
      }
    }

    // Step back 1 day
    curr.setDate(curr.getDate() - 1);
  }

  return {
    overdueTasks,
    overdueGroupedByDate,
    totalOverdueCount: overdueTasks.length,
    overdueDaysCount: overdueGroupedByDate.length,
  };
}
