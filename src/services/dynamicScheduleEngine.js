/**
 * Dynamic Schedule Engine
 *
 * Generates truly personalized, adaptive session-by-session schedules for:
 * - TOEIC (Study4 ETS 10 Tests Curriculum)
 * - IELTS (Cambridge 12-19 Academic Curriculum)
 *
 * Adapts to:
 * 1. Target Score / Band (TOEIC 450 vs 650 vs 850; IELTS 5.5 vs 6.5 vs 7.5)
 * 2. Exam Deadline / Remaining Duration (30 days vs 60 days vs 90 days vs 180 days)
 * 3. Daily Study Time (30 min vs 60 min vs 90 min)
 * 4. User Skill Bottlenecks (Weak Listening vs Weak Reading/Grammar)
 */

import { cefrToNumeric } from '../config/userSkillProfileModel.js';
import { getTargetBlueprint } from '../config/targetBlueprints.js';
import { calculateSkillGaps } from './skillGapEngine.js';
import { calculateSkillPriorities } from './priorityEngine.js';

/**
 * Generate a personalized, dynamic session list for TOEIC
 */
export function generateDynamicToeicSchedule(profile = {}) {
  const currentLevel = profile.overallLevel || profile.currentLevel || 'A2';
  const targetScoreNum = parseFloat(profile.targetScore) || 650;
  const dailyMinutes = Number(profile.dailyStudyMinutes || profile.dailyGoalMin || 60);

  // 1. Calculate time horizon (support explicit daysRemaining, targetDurationMonths, or examDate)
  let daysRemaining = 60; // default 2 months

  if (profile.daysRemaining !== undefined && profile.daysRemaining !== null) {
    daysRemaining = Number(profile.daysRemaining);
  } else if (profile.targetDurationMonths) {
    daysRemaining = Number(profile.targetDurationMonths) * 30;
  } else if (profile.examDate) {
    const today = new Date();
    const targetDate = new Date(profile.examDate);
    const diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) {
      daysRemaining = diff;
    }
  }

  // 2. Classify pace and determine target session count & strategy
  let paceType = 'standard';
  let paceLabel = '🎯 Lộ Trình Chuẩn (90 Ngày)';
  let targetSessionCount = 36;
  let strategyTitle = 'Chiến Thuật Chuẩn Vững Chắc';
  let strategyDesc = 'Cân bằng vững chắc giữa giải đề ETS, chữa sâu bẫy đề thi và mở rộng vốn từ vựng thương mại.';

  if (daysRemaining <= 35) {
    paceType = 'sprint';
    paceLabel = `⚡ Sprint Cấp Tốc (${daysRemaining} Ngày)`;
    targetSessionCount = 16;
    strategyTitle = '⚡ Chiến Thuật 80/20 Cấp Tốc (30 Ngày)';
    strategyDesc = 'Tập trung tuyệt đối vào dạng câu dễ ăn điểm (Part 1, 2, 5). Lược bỏ đoạn đọc ba Triple Passages để tối ưu điểm số nhanh nhất kịp ngày thi.';
  } else if (daysRemaining <= 70) {
    paceType = 'accelerated';
    paceLabel = `🚀 Tăng Tốc (${Math.round(daysRemaining / 7)} Tuần)`;
    targetSessionCount = 28;
    strategyTitle = '🚀 Chiến Thuật Tăng Tốc Bứt Phá (60 Ngày)';
    strategyDesc = 'Luyện đề trọng tâm kết hợp chữa sâu từng dạng lỗi sai. Tối ưu thời gian đọc Part 5-6 dưới 20 phút và bắt từ khóa Part 3-4.';
  } else if (daysRemaining <= 130) {
    paceType = 'standard';
    paceLabel = `🎯 Chuẩn Điểm (${Math.round(daysRemaining / 7)} Tuần)`;
    targetSessionCount = 36;
    strategyTitle = '🎯 Chiến Thuật Chuẩn Điểm Toàn Diện (90 Ngày)';
    strategyDesc = 'Lộ trình chuẩn chỉnh: Phân tích toàn bộ 7 Part đề thi, lập sổ tay lỗi sai Deep Error Log và làm quen 6-8 bộ đề ETS chuẩn.';
  } else {
    paceType = 'comprehensive';
    paceLabel = `📚 Toàn Diện 6 Tháng (${Math.round(daysRemaining / 7)} Tuần)`;
    targetSessionCount = 48;
    strategyTitle = '📚 Chiến Thuật Bền Vững Đỉnh Cao (180 Ngày)';
    strategyDesc = 'Xây dựng năng lực ngôn ngữ bản chất: Củng cố ngữ pháp nền tảng, quét sạch 10 bộ đề ETS và thi thử mô phỏng 120 phút chuẩn phòng thi.';
  }

  // 3. Skill Gap & Priority Evaluation
  const targetBlueprint = getTargetBlueprint('toeic', String(targetScoreNum));
  const gapAnalysis = calculateSkillGaps(profile, targetBlueprint);
  const priorities = calculateSkillPriorities(gapAnalysis, profile, { daysRemaining });

  const isWeakListening = profile.primaryBottleneck === 'listening' || priorities.topPrioritySkill === 'listening' || gapAnalysis.primaryBottleneck === 'listening';
  const isWeakReading = profile.primaryBottleneck === 'reading' || priorities.topPrioritySkill === 'reading' || gapAnalysis.primaryBottleneck === 'reading';

  // 4. Select Eligible Test Range according to Target Score & Pace
  let eligibleTests = [1, 2, 3, 4, 5];
  if (targetScoreNum <= 500) {
    // TOEIC 450 Target: Foundation & core tests only
    eligibleTests = paceType === 'sprint' ? [1, 2] : [1, 2, 3];
  } else if (targetScoreNum <= 700) {
    // TOEIC 650 Target: Standard enterprise tests
    eligibleTests = paceType === 'sprint' ? [1, 2, 3] : paceType === 'accelerated' ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6];
  } else {
    // TOEIC 850 Target: High difficulty tests 4 - 10
    eligibleTests = paceType === 'sprint' ? [5, 6, 7] : paceType === 'accelerated' ? [4, 5, 6, 7, 8] : [4, 5, 6, 7, 8, 9, 10];
  }

  // 5. Generate Structured Sessions
  const sessions = [];
  let currentSessionIndex = 1;

  // Add Foundation Sessions if user starts at A1-A2 and has >= 60 days
  const currentNum = cefrToNumeric(currentLevel);
  if (currentNum <= 2.0 && paceType !== 'sprint') {
    sessions.push({
      trackIndex: currentSessionIndex++,
      day: currentSessionIndex,
      skill: 'Grammar',
      category: 'foundation',
      testNum: eligibleTests[0],
      activity: 'Củng cố Ngữ pháp Nền tảng: 12 Thì & Trợ Động Từ Part 5',
      duration: Math.min(45, dailyMinutes),
      note: 'Khôi phục ngữ pháp cốt lõi để làm đúng các câu thì & từ loại trong 30 giây.',
      status: 'Hoàn thành',
      whyThisTask: 'Trình độ hiện tại cần củng cố ngữ pháp trước khi bấm giờ giải đề ETS.',
    });

    sessions.push({
      trackIndex: currentSessionIndex++,
      day: currentSessionIndex,
      skill: 'Listening',
      category: 'foundation',
      testNum: eligibleTests[0],
      activity: 'Luyện Phản Xạ Nghe: Bắt bẫy tranh con người & vật thể Part 1',
      duration: Math.min(45, dailyMinutes),
      note: 'Phân biệt hành động chủ động (V-ing) và trạng thái bị động (Being + V3).',
      status: 'Hoàn thành',
      whyThisTask: 'Listening cần khởi động với dạng bài trực quan dễ ăn điểm nhất.',
    });
  }

  // Session Duration sizing based on user's daily study time
  const testLisDuration = dailyMinutes <= 35 ? 30 : 45;
  const reviewLisDuration = dailyMinutes <= 35 ? 30 : Math.min(90, dailyMinutes);
  const testReadDuration = dailyMinutes <= 35 ? 30 : Math.min(75, dailyMinutes);
  const reviewReadDuration = dailyMinutes <= 35 ? 30 : Math.min(90, dailyMinutes);

  // Generate sessions across tests
  eligibleTests.forEach((testNum) => {
    if (sessions.length >= targetSessionCount) return;

    // A. LISTENING SESSION
    let lisTitle = `Làm đề Listening Test ${testNum}`;
    let lisNote = 'Bấm giờ chuẩn áp lực 45 phút Part 1 - 4 (100 câu)';
    let lisWhy = isWeakListening
      ? `Listening là điểm yếu số 1 của bạn: Cần luyện phản xạ nghe liên tục để không bị khớp.`
      : `Luyện giữ nhịp tập trung và phán đoán đáp án trước khi băng đọc.`;

    if (targetScoreNum <= 500) {
      lisTitle = `Làm đề Listening Test ${testNum} (Tập trung Part 1 & 2 - Mục tiêu 55/100)`;
      lisNote = 'Tập trung 100% đúng câu hỏi Wh- & Yes/No Part 2. Bỏ qua câu quá dài Part 4.';
      lisWhy = 'Với mục tiêu 450, Part 1 & 2 chiếm 80% số điểm cần thiết.';
    } else if (targetScoreNum >= 800) {
      lisTitle = `Làm đề Listening Test ${testNum} (Bẫy Part 3 & 4 + Accent Anh/Úc)`;
      lisNote = 'Tăng tốc độ nghe 1.1x, đọc trước 3 câu hỏi và biểu đồ kèm theo.';
      lisWhy = 'Với mục tiêu 850+, chỉ có thể bứt phá bằng cách đúng các câu suy luận ngụ ý Part 3 & 4.';
    }

    if (dailyMinutes <= 35) {
      lisTitle += ' [Rút gọn 30p]';
      lisNote = 'Làm 50 câu trọng tâm Part 1, 2 và Part 3 cơ bản trong 30 phút.';
    }

    sessions.push({
      trackIndex: currentSessionIndex++,
      day: currentSessionIndex,
      skill: 'Listening',
      category: 'test',
      testNum,
      activity: lisTitle,
      duration: testLisDuration,
      note: lisNote,
      status: sessions.length < 4 ? 'Hoàn thành' : 'Chưa làm',
      whyThisTask: lisWhy,
    });

    // B. LISTENING REVIEW SESSION
    if (sessions.length < targetSessionCount) {
      sessions.push({
        trackIndex: currentSessionIndex++,
        day: currentSessionIndex,
        skill: 'Listening',
        category: 'review',
        testNum,
        activity: `Chữa đề Listening Test ${testNum} & Lọc Từ Vựng Bẫy`,
        duration: reviewLisDuration,
        note: paceType === 'sprint'
          ? 'Chữa nhanh 20 câu sai thường gặp nhất Part 1-2, tra từ vựng ngay.'
          : 'Nghe lại Audio Script, ghi chép bẫy âm nối/nuốt âm và từ đồng âm.',
        status: sessions.length < 4 ? 'Hoàn thành' : 'Chưa làm',
        whyThisTask: 'Chữa đề chi tiết quyết định 70% tiến bộ, triệt tiêu việc sai lại cùng 1 bẫy.',
      });
    }

    // C. READING SESSION
    if (sessions.length >= targetSessionCount) return;

    let readTitle = `Làm đề Reading Test ${testNum}`;
    let readNote = 'Bấm giờ chuẩn áp lực 75 phút Part 5 - 7 (100 câu)';
    let readWhy = isWeakReading
      ? `Reading là điểm nghẽn của bạn: Cần rèn thói quen căn giờ nghiêm ngặt.`
      : `Rèn luyện tốc độ đọc lướt Skimming/Scanning để không bao giờ bị bỏ sót câu.`;

    if (targetScoreNum <= 500) {
      readTitle = `Làm đề Reading Test ${testNum} (Chắc 30 câu Part 5 & Email ngắn)`;
      readNote = 'Chiến thuật 450: Làm thật chắc Part 5 ngữ pháp cơ bản và các đoạn đơn ngắn.';
      readWhy = 'Không phân tán thời gian vào bài đọc ba quá dài, tối ưu điểm ăn chắc.';
    } else if (targetScoreNum >= 800) {
      readTitle = `Làm đề Reading Test ${testNum} (Thực chiến Đoạn Ba Triple Passages)`;
      readNote = 'Áp lực thời gian: Part 5 (12p), Part 6 (8p), Part 7 (55p - liên kết 3 văn bản).';
      readWhy = 'Để đạt 850+, bạn bắt buộc phải thành thạo kỹ năng đối chiếu thông tin chéo 3 đoạn.';
    }

    if (dailyMinutes <= 35) {
      readTitle += ' [Rút gọn 30p]';
      readNote = 'Làm 40 câu trọng tâm Part 5 và 2 bài đọc ngắn Part 7 trong 30 phút.';
    }

    sessions.push({
      trackIndex: currentSessionIndex++,
      day: currentSessionIndex,
      skill: 'Reading',
      category: 'test',
      testNum,
      activity: readTitle,
      duration: testReadDuration,
      note: readNote,
      status: sessions.length < 4 ? 'Hoàn thành' : 'Chưa làm',
      whyThisTask: readWhy,
    });

    // D. READING REVIEW SESSION
    if (sessions.length < targetSessionCount) {
      sessions.push({
        trackIndex: currentSessionIndex++,
        day: currentSessionIndex,
        skill: 'Reading',
        category: 'review',
        testNum,
        activity: `Chữa đề Reading Test ${testNum} & Lập Bảng Từ Đồng Nghĩa`,
        duration: reviewReadDuration,
        note: paceType === 'sprint'
          ? 'Chữa chi tiết câu sai Part 5 và ghi nhớ các cặp từ khóa then chốt.'
          : 'Phân tích ngữ pháp câu sai Part 5, lập bảng paraphrase đối chiếu Part 7.',
        status: sessions.length < 4 ? 'Hoàn thành' : 'Chưa làm',
        whyThisTask: 'Phát hiện lỗ hổng ngữ pháp và từ vựng thông qua câu sai thực tế.',
      });
    }

    // E. VOCABULARY DRILL (For non-sprint pace)
    if (paceType !== 'sprint' && sessions.length < targetSessionCount && testNum % 2 === 0) {
      sessions.push({
        trackIndex: currentSessionIndex++,
        day: currentSessionIndex,
        skill: 'Tổng hợp',
        category: 'vocab',
        testNum,
        activity: `Ôn tập Flashcard & Từ Vựng Cốt Lõi Test ${testNum - 1} - ${testNum}`,
        duration: Math.min(45, dailyMinutes),
        note: 'Kiểm tra độ nhớ 100 từ vựng thương mại và các collocations tần suất cao.',
        status: 'Chưa làm',
        whyThisTask: 'Nâng dung lượng từ vựng nhận diện giúp tăng tốc độ đọc hiểu lên 30%.',
      });
    }
  });

  // Cycle error drills for comprehensive or standard long roadmaps
  let cycle = 1;
  while (sessions.length < targetSessionCount - 1) {
    const testToReview = eligibleTests[sessions.length % eligibleTests.length];
    const isLis = sessions.length % 2 === 0;
    sessions.push({
      trackIndex: currentSessionIndex++,
      day: currentSessionIndex,
      skill: isLis ? 'Listening' : 'Reading',
      category: 'review',
      testNum: testToReview,
      activity: `Vòng ${cycle++}: Triệt tiêu lỗi sai Test ${testToReview} (${isLis ? 'LC' : 'RC'})`,
      duration: Math.min(60, dailyMinutes),
      note: 'Làm lại các câu sai trong Deep Error Log dưới áp lực thời gian tăng tốc 1.1x.',
      status: 'Chưa làm',
      whyThisTask: 'Lặp lại có khoảng cách giúp biến phản xạ làm bài thành trực giác.',
    });
  }

  // Final Mock Exam Simulation Session
  if (sessions.length < targetSessionCount) {
    sessions.push({
      trackIndex: currentSessionIndex++,
      day: currentSessionIndex,
      skill: 'Full Test',
      category: 'mock',
      testNum: eligibleTests[eligibleTests.length - 1],
      activity: `Thi Thử Full Test 120 Phút Tổng Kết Mục Tiêu ${targetScoreNum}+`,
      duration: Math.min(120, Math.max(60, dailyMinutes * 1.5)),
      note: 'Mô phỏng 100% áp lực phòng thi thật: 200 câu hỏi trong 120 phút không dừng.',
      status: 'Chưa làm',
      whyThisTask: `Đo lường chính xác band điểm thực tế trước khi bước vào phòng thi thật.`,
    });
  }

  return {
    sessions,
    totalSessions: sessions.length,
    paceType,
    paceLabel,
    daysRemaining,
    strategyTitle,
    strategyDesc,
    targetScore: targetScoreNum,
    eligibleTests,
    dailyMinutes,
    gapAnalysis,
    priorities,
  };
}

/**
 * Generate a personalized, dynamic schedule for IELTS
 */
export function generateDynamicIeltsSchedule(profile = {}) {
  const targetBand = parseFloat(profile.targetScore) || 7.0;
  const dailyMinutes = Number(profile.dailyStudyMinutes || profile.dailyGoalMin || 60);

  let daysRemaining = 60;
  if (profile.daysRemaining !== undefined && profile.daysRemaining !== null) {
    daysRemaining = Number(profile.daysRemaining);
  } else if (profile.targetDurationMonths) {
    daysRemaining = Number(profile.targetDurationMonths) * 30;
  } else if (profile.examDate) {
    const today = new Date();
    const targetDate = new Date(profile.examDate);
    const diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) daysRemaining = diff;
  }

  let paceType = 'standard';
  let paceLabel = `🎯 Lộ Trình Chuẩn (${Math.round(daysRemaining / 7)} Tuần)`;
  let strategyTitle = 'Chiến Thuật IELTS Chuẩn Bị Toàn Diện';
  let totalWeeks = Math.max(4, Math.ceil(daysRemaining / 7));

  if (daysRemaining <= 35) {
    paceType = 'sprint';
    paceLabel = `⚡ Sprint Cấp Tốc (${daysRemaining} Ngày)`;
    strategyTitle = '⚡ Chiến Thuật IELTS Cấp Tốc 30 Ngày (Cam 18-19 + Writing Template)';
  } else if (daysRemaining <= 70) {
    paceType = 'accelerated';
    paceLabel = `🚀 Tăng Tốc (${Math.round(daysRemaining / 7)} Tuần)`;
    strategyTitle = '🚀 Chiến Thuật IELTS Tăng Tốc 60 Ngày (Quét sạch 4 Kỹ Năng)';
  } else if (daysRemaining <= 130) {
    paceType = 'standard';
    paceLabel = `🎯 Chuẩn Điểm (${Math.round(daysRemaining / 7)} Tuần)`;
    strategyTitle = '🎯 Chiến Thuật IELTS Chuẩn Điểm 90 Ngày';
  } else {
    paceType = 'comprehensive';
    paceLabel = `📚 Toàn Diện 6 Tháng (${Math.round(daysRemaining / 7)} Tuần)`;
    strategyTitle = '📚 Chiến Thuật IELTS Toàn Diện 180 Ngày (Từ Vựng AWL & Viết Học Thuật)';
  }

  // Select Cambridge test series according to target band and pace
  let cambridgeSeries = 'Cambridge 12 - 14';
  if (targetBand >= 7.0) {
    cambridgeSeries = 'Cambridge 17 - 19 (Mới nhất & Sát đề thi thực tế)';
  } else if (targetBand >= 6.0) {
    cambridgeSeries = 'Cambridge 15 - 17';
  }

  return {
    targetBand,
    daysRemaining,
    totalWeeks,
    paceType,
    paceLabel,
    strategyTitle,
    dailyMinutes,
    cambridgeSeries,
  };
}

