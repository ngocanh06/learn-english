/**
 * Learning Plan Engine (Foundation + Certification Mixing Engine)
 * Determines the optimal balance between General Foundation and Certification Preparation.
 * Generates personalized daily and weekly schedules based on user level, target, time, and deadline.
 */

import { CEFR_LEVELS } from '../config/learningCertifications';
import { UNIFIED_MASTER_DAYS } from '../data/unifiedMasterRoadmap';
import { READING_DATABASE } from '../data/readingData';

/**
 * Calculate the Foundation vs Certification distribution ratio
 * Returns { foundationPercent, certificationPercent, phaseIndex, phaseName }
 */
export function calculateLearningMix(profile = {}) {
  const {
    currentLevel = 'B1',
    certification = 'ielts',
    examDate = null,
  } = profile;

  if (certification === 'none' || !certification) {
    return {
      foundationPercent: 100,
      certificationPercent: 0,
      phaseIndex: 1,
      phaseName: 'Toàn Diện Nền Tảng (General Foundation)',
      description: 'Tập trung 100% vào việc củng cố vốn từ, ngữ pháp và 4 kỹ năng thực chiến.',
    };
  }

  // Base weight by current level
  const levelObj = CEFR_LEVELS.find((l) => l.code === currentLevel) || CEFR_LEVELS[2];
  let foundationRatio = levelObj.foundationWeight; // e.g. A1: 0.8, A2: 0.65, B1: 0.45, B2: 0.3, C1: 0.15

  // Adjust by exam deadline urgency if provided
  let urgencyBonus = 0;
  if (examDate) {
    const today = new Date();
    const exam = new Date(examDate);
    const diffDays = Math.max(0, Math.round((exam - today) / (1000 * 60 * 60 * 24)));
    if (diffDays <= 30) {
      // Less than 1 month: heavy focus on certification practice
      urgencyBonus = 0.25;
    } else if (diffDays <= 90) {
      // 1 - 3 months: increase certification focus
      urgencyBonus = 0.15;
    }
  }

  foundationRatio = Math.max(0.15, Math.min(0.85, foundationRatio - urgencyBonus));
  const foundationPercent = Math.round(foundationRatio * 100);
  const certificationPercent = 100 - foundationPercent;

  // Determine current phase
  let phaseIndex = 1;
  let phaseName = 'Giai đoạn 1: Xây dựng Nền tảng & Làm quen cấu trúc đề';
  if (foundationPercent <= 25) {
    phaseIndex = 4;
    phaseName = 'Giai đoạn 4: Luyện Đề Thực Chiến & Tổng Ôn Áp Lực';
  } else if (foundationPercent <= 40) {
    phaseIndex = 3;
    phaseName = 'Giai đoạn 3: Bứt Phá Kỹ Năng & Chiến Thuật Điểm Cao';
  } else if (foundationPercent <= 60) {
    phaseIndex = 2;
    phaseName = 'Giai đoạn 2: Tăng Tốc Toàn Diện & Mở Rộng Chuyên Sâu';
  }

  return {
    foundationPercent,
    certificationPercent,
    phaseIndex,
    phaseName,
    description: `Phân bổ ${foundationPercent}% thời lượng cho Nền tảng (Ngữ pháp, Đọc, Viết) và ${certificationPercent}% cho Luyện thi ${certification.toUpperCase()}.`,
  };
}

/**
 * Generate Today's Plan according to study time and active certification
 */
export function generateTodayPlan({
  profile = {},
  dayOffset = 0,
  completedTasksMap = {},
  calendarTasks = {},
  date = new Date(),
} = {}) {
  const {
    currentLevel = 'B1',
    certification = 'ielts',
    dailyGoalMin = 45,
  } = profile;

  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + dayOffset);
  const dateKey = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
  
  // Find mapped day in roadmap (1..60)
  const start = new Date(2026, 8, 1);
  const diffDays = Math.max(0, Math.round((dateObj - start) / (1000 * 60 * 60 * 24)));
  const dayNum = (diffDays % 60) + 1;
  const roadmapDay = UNIFIED_MASTER_DAYS.find((d) => d.day === dayNum) || UNIFIED_MASTER_DAYS[0];

  const mix = calculateLearningMix(profile);
  const tasks = [];

  // Determine budget in minutes
  const totalMin = Number(dailyGoalMin) || 45;
  const certMin = mix.certificationPercent > 0 ? Math.round((totalMin * mix.certificationPercent) / 100) : 0;
  const foundMin = totalMin - certMin;

  // 1. Task: Certification Focus (if certification selected)
  if (certification === 'ielts') {
    const isCertDone = Boolean(
      calendarTasks[`${dateKey}_ielts_academic`] ||
      calendarTasks[`${dateKey}_ielts`] ||
      completedTasksMap[`today_${dateKey}_ielts`]
    );
    tasks.push({
      id: `task_${dateKey}_ielts`,
      key: 'ielts_academic',
      title: `Lộ trình IELTS 7.0+: Tuần ${Math.ceil(dayNum / 3)} - Kỹ Năng Học Thuật`,
      skill: 'IELTS Academic',
      category: 'certification',
      duration: Math.max(15, certMin),
      difficulty: 'Academic B2 - C1',
      badge: 'IELTS 7.0+',
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      icon: 'fa-graduation-cap',
      actionNav: { tab: 'ielts-roadmap' },
      isCompleted: isCertDone,
      why: 'Rèn luyện tư duy phản biện, kỹ năng đọc lướt (Skimming/Scanning) và từ vựng học thuật chuẩn Cambridge.',
    });
  } else if (certification === 'toeic') {
    const isCertDone = Boolean(
      calendarTasks[`${dateKey}_study4_test`] ||
      calendarTasks[`${dateKey}_study4_vocab`] ||
      completedTasksMap[`today_${dateKey}_toeic`]
    );
    tasks.push({
      id: `task_${dateKey}_toeic`,
      key: 'study4_test',
      title: `TOEIC Thực Chiến: ETS Study4 - Luyện Kỹ Năng Đề Thi`,
      skill: 'TOEIC ETS',
      category: 'certification',
      duration: Math.max(15, certMin),
      difficulty: 'Business English 750+',
      badge: 'TOEIC ETS',
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: 'fa-bullseye',
      actionNav: { tab: 'study4-toeic' },
      isCompleted: isCertDone,
      why: 'Tăng tốc phản xạ xử lý bẫy câu hỏi Part 5-7 và nhận diện từ vựng công sở chuẩn đề thi thật.',
    });
  }

  // 2. Task: Daily Dictation (Listening Foundation)
  const isDdDone = Boolean(
    calendarTasks[`${dateKey}_dd`] ||
    completedTasksMap[`today_${dateKey}_dd`]
  );
  tasks.push({
    id: `task_${dateKey}_dd`,
    key: 'dd',
    title: `DailyDictation: ${roadmapDay.dailyDictation?.shortStories || 'Short Stories & Conversations'}`,
    skill: 'Listening',
    category: 'foundation',
    duration: Math.min(20, Math.max(10, Math.round(foundMin * 0.4))),
    difficulty: currentLevel,
    badge: 'Nghe Chép',
    badgeColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20',
    icon: 'fa-headphones',
    actionNav: { tab: 'dailydictation' },
    isCompleted: isDdDone,
    why: 'Luyện tai bắt âm thanh tốc độ chuẩn của người bản xứ và xóa bỏ thói quen dịch nhẩm.',
  });

  // 3. Task: Core Grammar (Ngữ Pháp Nền Tảng)
  const grammarLessonId = roadmapDay.grammar?.lessonId || ((dayNum % 85) + 1);
  const isGrammarDone = Boolean(
    calendarTasks[`${dateKey}_grammar`] ||
    completedTasksMap[`today_${dateKey}_grammar`]
  );
  tasks.push({
    id: `task_${dateKey}_grammar`,
    key: 'grammar',
    title: `Ngữ Pháp Bài ${grammarLessonId}: ${roadmapDay.grammar?.topic || 'Cấu trúc cốt lõi'}`,
    skill: 'Grammar',
    category: 'foundation',
    duration: Math.min(20, Math.max(10, Math.round(foundMin * 0.35))),
    difficulty: currentLevel,
    badge: 'Ngữ Pháp',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: 'fa-book-open',
    actionNav: { tab: 'grammar', params: { lessonId: grammarLessonId } },
    isCompleted: isGrammarDone,
    why: 'Nắm chắc bản chất cấu trúc ngữ pháp để viết câu chuẩn xác và không bị bối rối khi đọc câu dài.',
  });

  // 4. Task: Active Vocabulary / Reading / Writing (Alternating)
  const altMod = dayNum % 3;
  if (altMod === 0) {
    const isVocabDone = Boolean(
      calendarTasks[`${dateKey}_vocab`] ||
      completedTasksMap[`today_${dateKey}_vocab`]
    );
    tasks.push({
      id: `task_${dateKey}_vocab`,
      key: 'vocab',
      title: certification === 'ielts' 
        ? `Từ Vựng IELTS: 33 Chủ Đề (Topic #${((dayNum % 33) + 1)})`
        : `Từ Vựng Nền Tảng: Chủ Đề Ngày #${dayNum}`,
      skill: 'Vocabulary',
      category: 'foundation',
      duration: Math.max(10, Math.round(foundMin * 0.25)),
      difficulty: currentLevel,
      badge: 'Từ Vựng',
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: 'fa-layer-group',
      actionNav: { tab: 'vocabulary', params: certification === 'ielts' ? { section: 'ielts-33-topics' } : {} },
      isCompleted: isVocabDone,
      why: 'Mở rộng vốn từ vựng theo ngữ cảnh để ứng dụng tự nhiên vào giao tiếp và bài thi.',
    });
  } else if (altMod === 1) {
    const rTestId = ((dayNum - 1) % READING_DATABASE.length) + 1;
    const isReadingDone = Boolean(
      calendarTasks[`${dateKey}_reading`] ||
      completedTasksMap[`today_${dateKey}_reading`]
    );
    tasks.push({
      id: `task_${dateKey}_reading`,
      key: 'reading',
      title: `Đọc Hiểu CEFR: Bài Đọc #${rTestId}`,
      skill: 'Reading',
      category: 'foundation',
      duration: Math.max(10, Math.round(foundMin * 0.25)),
      difficulty: currentLevel,
      badge: 'Đọc Hiểu',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: 'fa-newspaper',
      actionNav: { tab: 'reading', params: { testId: rTestId } },
      isCompleted: isReadingDone,
      why: 'Tăng tốc độ đọc hiểu văn bản thực tế và rèn luyện kỹ năng định vị thông tin nhanh.',
    });
  } else {
    const isWritingDone = Boolean(
      calendarTasks[`${dateKey}_writing`] ||
      completedTasksMap[`today_${dateKey}_writing`]
    );
    tasks.push({
      id: `task_${dateKey}_writing`,
      key: 'writing',
      title: `Luyện Viết & Dịch Câu: Chủ đề Ngày #${dayNum}`,
      skill: 'Writing',
      category: 'foundation',
      duration: Math.max(10, Math.round(foundMin * 0.25)),
      difficulty: currentLevel,
      badge: 'Luyện Viết',
      badgeColor: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20',
      icon: 'fa-pen-fancy',
      actionNav: { tab: 'writing' },
      isCompleted: isWritingDone,
      why: 'Chuyển hóa từ vựng và ngữ pháp đã học thành câu văn hoàn chỉnh, mượt mà.',
    });
  }

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return {
    dateKey,
    dayNum,
    totalMinutes: totalMin,
    mix,
    tasks,
    completedCount,
    totalTasks: tasks.length,
    progressPercent,
    isAllDone: completedCount === tasks.length,
  };
}

/**
 * Generate 7-day Weekly Schedule overview based on user availability
 */
export function generateWeeklyOverview({
  profile = {},
  startDate = new Date(),
  completedTasksMap = {},
  calendarTasks = {},
} = {}) {
  const days = [];
  const startDay = new Date(startDate);
  // Shift to start of week (Monday)
  const dayOfWeek = startDay.getDay(); // 0 is Sunday
  const distanceToMonday = (dayOfWeek + 6) % 7;
  startDay.setDate(startDay.getDate() - distanceToMonday);

  const DOW_NAMES = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
  const studyDaysCount = Number(profile.studyDaysPerWeek) || 6;

  for (let i = 0; i < 7; i++) {
    const current = new Date(startDay);
    current.setDate(startDay.getDate() + i);
    const isStudyDay = i < studyDaysCount;

    const plan = generateTodayPlan({
      profile,
      dayOffset: 0,
      completedTasksMap,
      calendarTasks,
      date: current,
    });

    days.push({
      index: i,
      dayName: DOW_NAMES[i],
      dateObj: current,
      dateKey: plan.dateKey,
      isStudyDay,
      plan,
      isToday: current.toDateString() === new Date().toDateString(),
    });
  }

  return days;
}
