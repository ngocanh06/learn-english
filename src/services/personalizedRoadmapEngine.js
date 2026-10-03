/**
 * Personalized Certification Roadmap Engine
 *
 * Core Service: generatePersonalizedRoadmap(userProfile, certificationGoal)
 *
 * Implements:
 * - Dynamic Phase Generation (A2->650 != B2->650, 450 != 850, IELTS 5.5 != 7.0)
 * - Deadline Engine (Calculates available hours, expands/condenses phases)
 * - Time Budget Engine (Daily tasks strictly <= dailyStudyMinutes)
 * - Priority-Weighted Daily Task Generator
 * - Deterministic 'Why This Task?' Reason Engine
 * - Phase Completion Competency Gates & Mock Exam Gate
 * - Real Content Mapping (Links to existing lessons, vocab, and practice data)
 */

import { normalizeUserProfile, cefrToNumeric } from '../config/userSkillProfileModel.js';
import { getTargetBlueprint } from '../config/targetBlueprints.js';
import { calculateSkillGaps } from './skillGapEngine.js';
import { calculateSkillPriorities } from './priorityEngine.js';

// ─── REAL CONTENT REFERENCES HELPER ─────────────────────────────────────────
function getRealContentCurriculum(certId, targetScore, focusLevel) {
  const isIelts = certId === 'ielts';
  const isToeic = certId === 'toeic';
  const numScore = parseFloat(targetScore) || 650;

  if (isToeic) {
    if (numScore <= 500) {
      return {
        grammarLessons: ['1', '2', '3', '6', '7', '9', '10', '13', '16', '17', '20', '23', '26', '27', '28'],
        readingCurriculum: 'A1-A2 (Test-English Short Articles)',
        listeningCurriculum: 'Daily Dictation Short Stories (Tracks 1 - 50) + TOEIC Part 1-2 Flashcards',
        toeicTestFocus: 'Study4 Test 1 - Test 2 (Part 1, 2, 5 focus)',
        targetAccuracy: '55% - 60%',
      };
    } else if (numScore <= 700) {
      return {
        grammarLessons: ['11', '12', '18', '21', '27', '29', '30', '31', '33', '35', '37', '38', '41', '42', '44', '49'],
        readingCurriculum: 'B1-B1+ (Business Emails, Notices, Single Passages)',
        listeningCurriculum: 'Daily Dictation Intermediate + TOEIC Part 3 Conversations',
        toeicTestFocus: 'Study4 Test 3 - Test 6 (Full 7 Parts under timed pressure)',
        targetAccuracy: '70% - 75%',
      };
    } else {
      // 750 - 850+
      return {
        grammarLessons: ['25', '35', '39', '40', '44', '61', '62', '64', '65', '70', '71', '72', '80', '82', '85'],
        readingCurriculum: 'B2-C1 (Double & Triple Passages, Financial Reports)',
        listeningCurriculum: 'Fast Audio Monologues Part 4 + Native Speed Dictation',
        toeicTestFocus: 'Study4 Test 7 - Test 10 (Full Test 120-minute simulation)',
        targetAccuracy: '88% - 94%',
      };
    }
  }

  if (isIelts) {
    if (numScore <= 5.5) {
      return {
        grammarLessons: ['1', '6', '10', '16', '17', '20', '23', '27', '33', '38', '42'],
        readingCurriculum: 'A2-B1 Academic Reading Foundation',
        listeningCurriculum: 'Section 1 Form Filling & Section 2 Social Monologues',
        ieltsVocabTopics: ['Topic 1: Family & Society', 'Topic 2: Hobbies & Leisure', 'Topic 3: Education Basics'],
        writingFocus: 'Task 1 Line & Bar Chart Overview + Task 2 4-Paragraph Structure',
        targetAccuracy: '60%',
      };
    } else if (numScore <= 6.5) {
      return {
        grammarLessons: ['11', '12', '27', '33', '35', '37', '38', '41', '42', '44', '49', '53', '61'],
        readingCurriculum: 'B1-B2 Academic Reading (Heading Matching & Summary Completion)',
        listeningCurriculum: 'Section 2 Map Labelling & Section 3 Academic Discussions',
        ieltsVocabTopics: ['Topic 5: Environmental Science', 'Topic 8: Technology & AI', 'Topic 12: Urbanization'],
        writingFocus: 'Task 1 Process/Map Reports + Task 2 Discussion & Problem-Solution Essays',
        targetAccuracy: '75%',
      };
    } else {
      // 7.0 - 8.0+
      return {
        grammarLessons: ['25', '35', '40', '44', '61', '62', '64', '65', '71', '72', '80', '82', '85'],
        readingCurriculum: 'B2-C1 Complex Philosophical & Scientific Discursive Passages',
        listeningCurriculum: 'Section 4 Rapid Academic Lectures (Uninterrupted Note Taking)',
        ieltsVocabTopics: ['Academic Word List (AWL) 33 Topics Full (4,050 words)', 'Advanced C1-C2 Collocations'],
        writingFocus: 'Task 1 Advanced Data Synthesis + Task 2 Discursive Argumentation with Nuanced Counter-arguments',
        targetAccuracy: '88%+',
      };
    }
  }

  // Fallback
  return {
    grammarLessons: ['1', '2', '6', '10', '16', '20', '27', '33', '38'],
    readingCurriculum: 'B1 General English',
    listeningCurriculum: 'Daily Dictation Tracks',
    targetAccuracy: '70%',
  };
}

/**
 * Generate multi-phase roadmap structure dynamically based on:
 * - Current level (e.g. A1, A2, B1, B2)
 * - Target score (e.g. TOEIC 450 vs 650 vs 850, IELTS 5.5 vs 7.0)
 * - Total weeks available
 */
function buildPhases({ certId, currentLevel, targetScore, targetBlueprint, totalWeeks, skillGapAnalysis, realContent }) {
  const currentNum = cefrToNumeric(currentLevel);
  const numScore = parseFloat(targetScore) || 650;

  const phases = [];

  // SCENARIO 1: TOEIC
  if (certId === 'toeic') {
    if (numScore <= 500) {
      // TOEIC 450 TARGET
      if (currentNum <= 2.0) { // Current A1 or A2
        const p1Weeks = Math.max(2, Math.round(totalWeeks * 0.40));
        const p2Weeks = Math.max(2, Math.round(totalWeeks * 0.35));
        const p3Weeks = Math.max(1, totalWeeks - p1Weeks - p2Weeks);

        phases.push({
          phaseId: 'p1_foundation',
          phaseIndex: 1,
          name: 'Phase 1: Phục hồi Ngữ pháp Căn bản & Từ vựng Part 1-2',
          durationWeeks: p1Weeks,
          objective: 'Nắm vững 15 bài ngữ pháp sơ cấp cốt lõi (Thì, danh từ, đại từ, giới từ) và 500 từ vựng tranh ảnh/hỏi đáp văn phòng.',
          focusSkills: ['grammar', 'vocabulary', 'listening'],
          curriculumMapping: {
            grammarLessons: realContent.grammarLessons.slice(0, 8),
            vocabTarget: '500 từ vựng cốt lõi',
            listeningSource: 'Daily Dictation Tracks 1 - 25 & Part 1 Photos',
          },
          competencyGate: {
            minGrammarCheckpointScore: 70,
            minListeningAccuracy: 60,
            assessmentType: 'Foundation Diagnostic Test 1',
            gateDescription: 'Đạt tối thiểu 70% bài kiểm tra ngữ pháp sơ cấp và nhận diện đúng 7/10 tranh Part 1.',
          },
        });

        phases.push({
          phaseId: 'p2_core_toeic',
          phaseIndex: 2,
          name: 'Phase 2: Rèn luyện Phản xạ Part 2 & Đọc hiểu Part 5 Căn bản',
          durationWeeks: p2Weeks,
          objective: 'Bắt nhịp phản xạ hỏi đáp trực tiếp Wh-questions Part 2 và giải quyết 30 câu Part 5 trong 20 phút.',
          focusSkills: ['listening', 'reading', 'grammar'],
          curriculumMapping: {
            grammarLessons: realContent.grammarLessons.slice(8),
            toeicStudy4Days: 'Study4 Day 1 - Day 14 (Test 1 & Test 2 Vocab + Part 1-2 Drills)',
            readingPassages: 'Reading A1-A2 ngắn',
          },
          competencyGate: {
            minGrammarCheckpointScore: 75,
            minListeningAccuracy: 65,
            assessmentType: 'Mini Test ETS 1 (50 câu Listening + 50 câu Reading)',
            gateDescription: 'Đúng tối thiểu 28/50 câu LC và 25/50 câu RC (Dự phóng 420+ điểm).',
          },
        });

        phases.push({
          phaseId: 'p3_mock_target',
          phaseIndex: 3,
          name: 'Phase 3: Luyện Đề Mock Test 450+ & Kiểm soát Thời gian',
          durationWeeks: p3Weeks,
          objective: 'Làm trọn vẹn 2 đề Full Test ETS 2024, làm quen với áp lực 120 phút và tối ưu số câu đúng ở các phần dễ.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicTests: 'Study4 ETS Full Test 1 & 2',
            errorLogReview: 'Sổ tay tổng hợp bẫy Part 2 và các câu sai Part 5',
          },
          competencyGate: {
            mockScoreThreshold: 450,
            assessmentType: 'Official Simulation Mock Test 2',
            gateDescription: 'Đạt điểm Mock Test chính thức từ 450 điểm trở lên trước khi đăng ký thi.',
          },
        });
      } else {
        // Current already B1+ aiming for 450 (Super Fast Refresher)
        phases.push({
          phaseId: 'p1_fast_toeic_format',
          phaseIndex: 1,
          name: 'Phase 1: Làm quen Định dạng ETS & Chiến thuật Part 1, 2, 5',
          durationWeeks: Math.max(1, Math.round(totalWeeks * 0.5)),
          objective: 'Nắm chắc format đề thi, quy tắc tô đáp án và các bẫy thường gặp trong Part 2 và Part 5.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicStudy4Days: 'Study4 Day 1 - Day 10',
          },
          competencyGate: {
            mockScoreThreshold: 480,
            assessmentType: 'Full Mock Test 1',
            gateDescription: 'Đạt điểm Mock Test trên 480 điểm.',
          },
        });
        phases.push({
          phaseId: 'p2_speed_mock',
          phaseIndex: 2,
          name: 'Phase 2: Luyện đề Thực chiến & Tối ưu Điểm số',
          durationWeeks: Math.max(1, totalWeeks - Math.round(totalWeeks * 0.5)),
          objective: 'Thi thử 2 đề ETS dưới áp lực thời gian chuẩn, hoàn thành mục tiêu 450+.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicTests: 'Study4 ETS Full Test 1 & 2',
          },
          competencyGate: {
            mockScoreThreshold: 500,
            assessmentType: 'Final Mock Test',
            gateDescription: 'Đạt điểm Mock Test trên 500 điểm.',
          },
        });
      }
    } else if (numScore <= 700) {
      // TOEIC 650 TARGET
      if (currentNum <= 2.0) {
        // A2 -> TOEIC 650: NEEDS FULL 6 PHASES (From Foundation to Target Mastery)
        const w1 = Math.max(2, Math.round(totalWeeks * 0.25));
        const w2 = Math.max(2, Math.round(totalWeeks * 0.20));
        const w3 = Math.max(2, Math.round(totalWeeks * 0.20));
        const w4 = Math.max(1, Math.round(totalWeeks * 0.15));
        const w5 = Math.max(1, Math.round(totalWeeks * 0.12));
        const w6 = Math.max(1, totalWeeks - (w1 + w2 + w3 + w4 + w5));

        phases.push({
          phaseId: 'p1_foundation_recovery',
          phaseIndex: 1,
          name: 'Phase 1: Foundation Recovery (Khôi phục Nền tảng Ngữ pháp & Từ vựng)',
          durationWeeks: w1,
          objective: 'Lấp đầy toàn bộ lỗ hổng ngữ pháp cốt lõi (16 chuyên đề trung cấp) và nạp 1,200 từ vựng căn bản văn phòng.',
          focusSkills: ['grammar', 'vocabulary', 'listening'],
          curriculumMapping: {
            grammarLessons: realContent.grammarLessons.slice(0, 10),
            vocabTarget: '1,200 từ vựng Study4 Test 1-2',
            dictationSource: 'Daily Dictation Tracks 1 - 40',
          },
          competencyGate: {
            minGrammarCheckpointScore: 80,
            minListeningAccuracy: 68,
            assessmentType: 'Foundation Competency Exam',
            gateDescription: 'Đạt tối thiểu 80% bài kiểm tra ngữ pháp và điểm danh hoàn thành 100% bài nghe chính tả tuần 1-3.',
          },
        });

        phases.push({
          phaseId: 'p2_core_toeic_skills',
          phaseIndex: 2,
          name: 'Phase 2: Core TOEIC Skills (Làm chủ Part 1, 2, 5 & Đọc hiểu Đoạn đơn)',
          durationWeeks: w2,
          objective: 'Đạt độ chính xác 80% Part 1, 70% Part 2 (xử lý bẫy từ đồng âm) và rút ngắn thời gian làm 30 câu Part 5 xuống 15 phút.',
          focusSkills: ['listening', 'reading', 'grammar'],
          curriculumMapping: {
            grammarLessons: realContent.grammarLessons.slice(10),
            toeicStudy4Days: 'Study4 Day 11 - Day 25 (Làm & chữa Part 1-3, Part 5-6)',
          },
          competencyGate: {
            minGrammarCheckpointScore: 82,
            minListeningAccuracy: 72,
            assessmentType: 'Mid-term Diagnostic Exam',
            gateDescription: 'Điểm Mini-Test đạt tương đương 550+ TOEIC.',
          },
        });

        phases.push({
          phaseId: 'p3_target_skill_dev',
          phaseIndex: 3,
          name: 'Phase 3: Target Skill Development (Bứt phá Part 3, 4, 6 & Đoạn kép Part 7)',
          durationWeeks: w3,
          objective: 'Luyện kỹ thuật đọc trước câu hỏi Part 3-4, nghe bắt thông tin biểu đồ và đọc quét (Scanning) thông tin đoạn kép Part 7.',
          focusSkills: ['listening', 'reading', 'vocabulary'],
          curriculumMapping: {
            toeicStudy4Days: 'Study4 Day 26 - Day 40 (Chữa sâu bẫy Part 3, 4, 7)',
            readingPassages: 'Reading B1+ Business Contexts',
          },
          competencyGate: {
            minListeningAccuracy: 75,
            minReadingAccuracy: 70,
            assessmentType: 'Sectional Progress Test (100 câu LC / 100 câu RC)',
            gateDescription: 'Đạt tối thiểu 70/100 câu Listening và 65/100 câu Reading.',
          },
        });

        phases.push({
          phaseId: 'p4_timed_practice',
          phaseIndex: 4,
          name: 'Phase 4: Timed Practice (Luyện tập Tốc độ & Quản lý Thời gian)',
          durationWeeks: w4,
          objective: 'Phân bổ nghiêm ngặt: Part 5 (12 phút), Part 6 (8 phút), Part 7 (55 phút), không để sót câu hỏi cuối giờ.',
          focusSkills: ['reading', 'listening'],
          curriculumMapping: {
            toeicStudy4Days: 'Study4 Day 41 - Day 50 (Bấm giờ giải đề liên tục)',
          },
          competencyGate: {
            mockScoreThreshold: 620,
            assessmentType: 'Timed Simulation Test 1',
            gateDescription: 'Làm đề trong đúng 120 phút đạt từ 620 điểm trở lên.',
          },
        });

        phases.push({
          phaseId: 'p5_mock_exam',
          phaseIndex: 5,
          name: 'Phase 5: Full Mock Simulation & Error Analysis (Thực chiến Đề thi ETS)',
          durationWeeks: w5,
          objective: 'Giải 4 đề Full Test ETS 2024, ghi chép sổ tay lỗi sai (Deep Error Log) và vá triệt để các lỗ hổng.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicTests: 'Study4 ETS Full Test 4, 5, 6',
          },
          competencyGate: {
            mockScoreThreshold: 650,
            assessmentType: 'Official Simulation Mock Test 2',
            gateDescription: 'Đạt điểm Mock Test chính thức từ 650 điểm trở lên trong 2 lần liên tiếp.',
          },
        });

        phases.push({
          phaseId: 'p6_final_review',
          phaseIndex: 6,
          name: 'Phase 6: Final Review & Target Optimization (Tổng duyệt & Tự tin Đi thi)',
          durationWeeks: w6,
          objective: 'Ôn tập 286 từ vựng hay bẫy nhất, làm lại các câu sai trong sổ tay và duy trì phong độ tâm lý phòng thi.',
          focusSkills: ['vocabulary', 'grammar'],
          curriculumMapping: {
            errorLogReview: 'Deep Error Log toàn bộ 6 đề thi',
          },
          competencyGate: {
            mockScoreThreshold: 660,
            assessmentType: 'Final Readiness Check',
            gateDescription: 'Sẵn sàng 100% cho kỳ thi chính thức.',
          },
        });
      } else {
        // B2 -> TOEIC 650: USER ALREADY HAS STRONG LANGUAGE BASE. NO NEED FOR FOUNDATION!
        const w1 = Math.max(1, Math.round(totalWeeks * 0.25));
        const w2 = Math.max(1, Math.round(totalWeeks * 0.25));
        const w3 = Math.max(1, Math.round(totalWeeks * 0.25));
        const w4 = Math.max(1, totalWeeks - (w1 + w2 + w3));

        phases.push({
          phaseId: 'p1_diagnostic_strategy',
          phaseIndex: 1,
          name: 'Phase 1: Diagnostic & TOEIC Format Strategy (Đánh giá & Chiến lược Format)',
          durationWeeks: w1,
          objective: 'Xác định điểm mạnh/yếu cụ thể qua đề thi chẩn đoán, nắm bắt các bẫy thời gian đặc thù của TOEIC ETS.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicTests: 'Study4 Diagnostic Full Test 1',
            toeicStudy4Days: 'Study4 Strategy Review Part 2 & Part 7',
          },
          competencyGate: {
            mockScoreThreshold: 650,
            assessmentType: 'Diagnostic Mock Test',
            gateDescription: 'Xác lập điểm chuẩn ban đầu và phân tích chi tiết phổ điểm từng Part.',
          },
        });

        phases.push({
          phaseId: 'p2_weakness_elimination',
          phaseIndex: 2,
          name: 'Phase 2: High-Yield Trap Elimination (Triệt tiêu Bẫy & Tối ưu Tốc độ)',
          durationWeeks: w2,
          objective: 'Tập trung xử lý các câu bẫy Part 3-4 (đối thoại chuyển hướng) và Part 7 (đoạn văn đối chiếu email - hóa đơn).',
          focusSkills: ['reading', 'listening'],
          curriculumMapping: {
            toeicStudy4Days: 'Study4 Day 20 - Day 35 (Part 3-4, Part 7 Speed Drills)',
          },
          competencyGate: {
            mockScoreThreshold: 680,
            assessmentType: 'Progress Mock Test 2',
            gateDescription: 'Đạt tối thiểu 680 điểm trên đề thi ETS thực chiến.',
          },
        });

        phases.push({
          phaseId: 'p3_timed_practice',
          phaseIndex: 3,
          name: 'Phase 3: Timed Practice & Section Speed Drills (Luyện Tốc độ Dưới áp lực)',
          durationWeeks: w3,
          objective: 'Rèn luyện tốc độ đọc hiểu văn bản thương mại 160 từ/phút và duy trì độ tập trung 45 phút nghe liên tục.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicTests: 'Study4 Full Test 3 & 4',
          },
          competencyGate: {
            mockScoreThreshold: 700,
            assessmentType: 'Simulation Test 3',
            gateDescription: 'Đạt điểm số 700+ dưới điều kiện thời gian khắt khe.',
          },
        });

        phases.push({
          phaseId: 'p4_target_optimization',
          phaseIndex: 4,
          name: 'Phase 4: Target Score Confirmation & Final Peak (Khẳng định Điểm rơi Phong độ)',
          durationWeeks: w4,
          objective: 'Chốt vững mục tiêu 650+ (hướng tới 750+) với các đề thi mẫu ETS mới nhất.',
          focusSkills: ['listening', 'reading'],
          curriculumMapping: {
            toeicTests: 'Study4 Full Test 5 & 6',
          },
          competencyGate: {
            mockScoreThreshold: 720,
            assessmentType: 'Official Readiness Test',
            gateDescription: 'Vượt ngưỡng mục tiêu 650 với biên độ an toàn cao.',
          },
        });
      }
    } else {
      // TOEIC 850+ TARGET (Advanced)
      const w1 = Math.max(2, Math.round(totalWeeks * 0.25));
      const w2 = Math.max(2, Math.round(totalWeeks * 0.30));
      const w3 = Math.max(2, Math.round(totalWeeks * 0.25));
      const w4 = Math.max(1, totalWeeks - (w1 + w2 + w3));

      phases.push({
        phaseId: 'p1_advanced_grammar_vocab',
        phaseIndex: 1,
        name: 'Phase 1: Ngữ pháp Cao cấp & 4,500 Từ vựng Thương mại Chuyên sâu',
        durationWeeks: w1,
        objective: 'Làm chủ toàn bộ các cấu trúc ngữ pháp khó (Đảo ngữ, giả định cách, rút gọn phân từ) và từ vựng tài chính/hợp đồng.',
        focusSkills: ['grammar', 'vocabulary', 'reading'],
        curriculumMapping: {
          grammarLessons: realContent.grammarLessons,
          vocabTarget: '4,500 từ vựng C1 Business',
        },
        competencyGate: {
          minGrammarCheckpointScore: 92,
          minReadingAccuracy: 85,
          assessmentType: 'Advanced Grammar & Collocation Exam',
          gateDescription: 'Đạt tối thiểu 92% độ chính xác trong bài test Part 5 nâng cao.',
        },
      });

      phases.push({
        phaseId: 'p2_triple_passages_mastery',
        phaseIndex: 2,
        name: 'Phase 2: Chinh phục Đoạn văn Ba (Triple Passages) & Bẫy Hàm ý Part 3-4',
        durationWeeks: w2,
        objective: 'Tối ưu kỹ thuật đọc liên kết chéo giữa 3 văn bản Part 7 và nghe hiểu 100% ngữ điệu ẩn ý trong Part 3-4.',
        focusSkills: ['reading', 'listening'],
        curriculumMapping: {
          toeicStudy4Days: 'Study4 Day 25 - Day 45 (Triple Passages & Inference Questions)',
        },
        competencyGate: {
          minReadingAccuracy: 88,
          minListeningAccuracy: 90,
          assessmentType: 'Advanced Sectional Drill (Part 4 & Part 7)',
          gateDescription: 'Đúng tối thiểu 48/54 câu Part 7 và 26/30 câu Part 4.',
        },
      });

      phases.push({
        phaseId: 'p3_full_ets_marathon',
        phaseIndex: 3,
        name: 'Phase 3: ETS Full Test Marathon (Luyện đề Cường độ cao Chuẩn 850+)',
        durationWeeks: w3,
        objective: 'Giải liên tiếp 6 đề ETS Test 5 - Test 10 với mục tiêu điểm số đều đặn trên 850 điểm.',
        focusSkills: ['listening', 'reading'],
        curriculumMapping: {
          toeicTests: 'Study4 ETS Full Test 5, 6, 7, 8',
        },
        competencyGate: {
          mockScoreThreshold: 850,
          assessmentType: 'ETS Simulation Marathon',
          gateDescription: 'Đạt tối thiểu 850 điểm trong ít nhất 3 đề thi thử liên tiếp.',
        },
      });

      phases.push({
        phaseId: 'p4_error_perfection',
        phaseIndex: 4,
        name: 'Phase 4: Zero-Error Optimization & Peak Performance',
        durationWeeks: w4,
        objective: 'Giảm thiểu tối đa lỗi sai ngớ ngẩn (Careless mistakes), đạt phong độ 900+ khi vào phòng thi.',
        focusSkills: ['reading', 'listening'],
        curriculumMapping: {
          errorLogReview: 'Sổ tay 100 bẫy tinh vi nhất của ETS',
        },
        competencyGate: {
          mockScoreThreshold: 880,
          assessmentType: 'Final Master Mock Test',
          gateDescription: 'Đạt mốc 880+ điểm trong bài thi thử tổng kết.',
        },
      });
    }
  }

  // SCENARIO 2: IELTS
  if (certId === 'ielts') {
    if (numScore <= 5.5) {
      // IELTS 5.0 - 5.5
      const w1 = Math.max(2, Math.round(totalWeeks * 0.35));
      const w2 = Math.max(2, Math.round(totalWeeks * 0.40));
      const w3 = Math.max(1, totalWeeks - w1 - w2);

      phases.push({
        phaseId: 'p1_ielts_foundation',
        phaseIndex: 1,
        name: 'Phase 1: Academic English Foundation & Core Formats (5.0)',
        durationWeeks: w1,
        objective: 'Làm quen định dạng đề thi IELTS 4 kỹ năng, củng cố ngữ pháp câu đơn/câu ghép và từ vựng đời sống xã hội.',
        focusSkills: ['grammar', 'listening', 'reading'],
        curriculumMapping: {
          grammarLessons: realContent.grammarLessons,
          listeningSource: 'Cambridge Listening Section 1-2 & Form Completion',
          vocabTarget: 'Topic 1-4 trong 33 Chủ Đề Từ Vựng IELTS',
        },
        competencyGate: {
          minListeningAccuracy: 60,
          minReadingAccuracy: 60,
          assessmentType: 'IELTS Foundation Diagnostic',
          gateDescription: 'Đúng tối thiểu 20/40 câu Listening và 20/40 câu Reading Cambridge.',
        },
      });

      phases.push({
        phaseId: 'p2_ielts_skill_building',
        phaseIndex: 2,
        name: 'Phase 2: Task 1 Report Basics & Speaking Part 1-2 Fluency (5.5)',
        durationWeeks: w2,
        objective: 'Viết hoàn chỉnh bài Task 1 miêu tả xu hướng biểu đồ đường/cột và trả lời tự tin các chủ đề quen thuộc Part 1 Speaking.',
        focusSkills: ['writing', 'speaking', 'listening'],
        curriculumMapping: {
          writingFocus: 'Task 1 Line Graph, Bar Chart & Task 2 Opinion Essay template',
          speakingFocus: 'Speaking Part 1 & Part 2 Cue Cards',
        },
        competencyGate: {
          mockScoreThreshold: 5.5,
          assessmentType: 'Mini IELTS Test (4 skills)',
          gateDescription: 'Đạt điểm tổng kết tối thiểu Band 5.5.',
        },
      });

      phases.push({
        phaseId: 'p3_ielts_mock_prep',
        phaseIndex: 3,
        name: 'Phase 3: Cambridge Timed Practice & Final Readiness (5.5+)',
        durationWeeks: w3,
        objective: 'Luyện 2 bộ đề Cambridge 12-14 chuẩn thời gian thi thật, kiểm soát không bị quá giờ ở bài Writing.',
        focusSkills: ['listening', 'reading', 'writing', 'speaking'],
        curriculumMapping: {
          ieltsPracticeTests: 'Cambridge 12 & 13 Full Tests',
        },
        competencyGate: {
          mockScoreThreshold: 5.5,
          assessmentType: 'Full Cambridge Mock Exam',
          gateDescription: 'Đạt Band 5.5 ổn định trong 2 bài thi thử liên tiếp.',
        },
      });
    } else if (numScore <= 6.5) {
      // IELTS 6.0 - 6.5
      const w1 = Math.max(2, Math.round(totalWeeks * 0.25));
      const w2 = Math.max(2, Math.round(totalWeeks * 0.35));
      const w3 = Math.max(2, Math.round(totalWeeks * 0.25));
      const w4 = Math.max(1, totalWeeks - (w1 + w2 + w3));

      phases.push({
        phaseId: 'p1_academic_core_upgrade',
        phaseIndex: 1,
        name: 'Phase 1: Academic Vocabulary (AWL) & Reading Heading Matching (6.0)',
        durationWeeks: w1,
        objective: 'Nạp 1,500 từ vựng Academic Word List, làm chủ dạng bài khó Matching Headings & True/False/Not Given trong Reading.',
        focusSkills: ['reading', 'vocabulary', 'listening'],
        curriculumMapping: {
          vocabTarget: 'Chủ đề môi trường, công nghệ, giáo dục (15 topics)',
          readingPassages: 'Passage 1 & 2 Cambridge 14-16',
        },
        competencyGate: {
          minReadingAccuracy: 70,
          minListeningAccuracy: 70,
          assessmentType: 'Academic Reading/Listening Diagnostic',
          gateDescription: 'Đúng từ 26-29/40 câu Listening và Reading (tương đương Band 6.5).',
        },
      });

      phases.push({
        phaseId: 'p2_writing_speaking_mastery',
        phaseIndex: 2,
        name: 'Phase 2: Writing Task 1-2 Structure & Speaking Part 2-3 Argumentation (6.5)',
        durationWeeks: w2,
        objective: 'Hoàn thiện kỹ năng viết bài luận Task 2 (Discussion & Problem-Solution) đạt tiêu chí Cohesion & Lexical Resource Band 6.5.',
        focusSkills: ['writing', 'speaking'],
        curriculumMapping: {
          writingFocus: 'Viết 8 bài luận Task 2 kèm phân tích bài mẫu Band 8.0+',
          speakingFocus: 'Luyện 15 chủ đề Speaking Part 2 & thảo luận trừu tượng Part 3',
        },
        competencyGate: {
          assessmentType: 'Writing & Speaking Evaluated Assessment',
          gateDescription: 'Bài viết Task 2 và phỏng vấn Speaking được chấm đạt tối thiểu Band 6.0 - 6.5.',
        },
      });

      phases.push({
        phaseId: 'p3_cambridge_simulation',
        phaseIndex: 3,
        name: 'Phase 3: Cambridge 16 - 18 Full Test Simulation & Error Diagnosis',
        durationWeeks: w3,
        objective: 'Giải trọn vẹn các bộ đề Cambridge mới nhất dưới áp lực thời gian chuẩn thi thật, phân tích sâu các lỗi sai nghe sót từ.',
        focusSkills: ['listening', 'reading', 'writing'],
        curriculumMapping: {
          ieltsPracticeTests: 'Cambridge 16 & 17 Full Tests',
        },
        competencyGate: {
          mockScoreThreshold: 6.5,
          assessmentType: 'Official Cambridge Simulation Mock',
          gateDescription: 'Overall Band đạt 6.5 (không có kỹ năng nào dưới 6.0).',
        },
      });

      phases.push({
        phaseId: 'p4_target_fine_tuning',
        phaseIndex: 4,
        name: 'Phase 4: Target Fine-Tuning & Exam Day Readiness',
        durationWeeks: w4,
        objective: 'Tổng duyệt từ vựng collocations, rà soát lại dàn ý các chủ đề Writing nóng hổi và chuẩn bị tâm lý phòng thi.',
        focusSkills: ['writing', 'speaking'],
        curriculumMapping: {
          errorLogReview: 'IELTS Deep Error Log & Speaking Formula Review',
        },
        competencyGate: {
          mockScoreThreshold: 6.5,
          assessmentType: 'Final Readiness Check',
          gateDescription: 'Sẵn sàng toàn diện cho kỳ thi chính thức.',
        },
      });
    } else {
      // IELTS 7.0 - 7.5+
      const w1 = Math.max(2, Math.round(totalWeeks * 0.25));
      const w2 = Math.max(2, Math.round(totalWeeks * 0.30));
      const w3 = Math.max(2, Math.round(totalWeeks * 0.25));
      const w4 = Math.max(1, totalWeeks - (w1 + w2 + w3));

      phases.push({
        phaseId: 'p1_c1_lexical_syntactic',
        phaseIndex: 1,
        name: 'Phase 1: C1 Lexical Resource, Complex Syntax & Advanced Reading (7.0+)',
        durationWeeks: w1,
        objective: 'Làm chủ toàn bộ 33 chủ đề từ vựng IELTS (4,050 từ), nâng cao khả năng đọc hiểu triết học/xã hội học Passage 3.',
        focusSkills: ['vocabulary', 'grammar', 'reading'],
        curriculumMapping: {
          vocabTarget: 'Trọn bộ 33 chủ đề IELTS Vocab (4,050 từ) & AWL',
          grammarLessons: realContent.grammarLessons,
        },
        competencyGate: {
          minReadingAccuracy: 85,
          minListeningAccuracy: 85,
          assessmentType: 'C1 Academic Diagnostic',
          gateDescription: 'Đúng tối thiểu 32/40 câu Listening và Reading (Band 7.5+).',
        },
      });

      phases.push({
        phaseId: 'p2_critical_writing_speaking',
        phaseIndex: 2,
        name: 'Phase 2: Critical Thinking Essays (Task 2) & Natural Idiomatic Speaking',
        durationWeeks: w2,
        objective: 'Phát triển lập luận đa chiều với phản biện sắc bén (Counter-argument) cho Task 2; nói tự nhiên với discourse markers Band 7.5.',
        focusSkills: ['writing', 'speaking'],
        curriculumMapping: {
          writingFocus: 'Viết và sửa sâu 12 bài luận Task 2 (Band 7.5+ model essays)',
          speakingFocus: 'Speaking Part 3 Fluency & Idiomatic expression practice',
        },
        competencyGate: {
          assessmentType: 'Expert Band Assessment',
          gateDescription: 'Writing Task 2 và Speaking đạt ngưỡng đánh giá Band 7.0+.',
        },
      });

      phases.push({
        phaseId: 'p3_cambridge_18_19_mastery',
        phaseIndex: 3,
        name: 'Phase 3: Cambridge 18 - 19 Mastery & Section 4 Lecture Note Taking',
        durationWeeks: w3,
        objective: 'Giải trọn vẹn Cambridge 18 & 19, nghe chuẩn xác các thuật ngữ học thuật Section 4 và đạt tốc độ đọc 200 từ/phút.',
        focusSkills: ['listening', 'reading', 'writing', 'speaking'],
        curriculumMapping: {
          ieltsPracticeTests: 'Cambridge 18 & 19 Full Tests',
        },
        competencyGate: {
          mockScoreThreshold: 7.0,
          assessmentType: 'Cambridge 19 Full Simulation',
          gateDescription: 'Đạt Overall Band 7.0 - 7.5 trong ít nhất 2 bài thi liên tiếp.',
        },
      });

      phases.push({
        phaseId: 'p4_peak_performance',
        phaseIndex: 4,
        name: 'Phase 4: Peak Performance & Deep Error Elimination',
        durationWeeks: w4,
        objective: 'Khóa chặt Band 7.0 - 7.5+, loại bỏ hoàn toàn các lỗi bất cẩn, chuẩn bị tinh thần bước vào kỳ thi thực tế.',
        focusSkills: ['writing', 'speaking', 'listening'],
        curriculumMapping: {
          errorLogReview: 'Chữa sâu 100% câu sai Cambridge 15-19',
        },
        competencyGate: {
          mockScoreThreshold: 7.5,
          assessmentType: 'Official Readiness Test',
          gateDescription: 'Đạt điểm số xuất sắc và sẵn sàng cho kỳ thi.',
        },
      });
    }
  }

  // Fallback if other certification (e.g. VSTEP)
  if (phases.length === 0) {
    phases.push({
      phaseId: 'p1_standard_foundation',
      phaseIndex: 1,
      name: 'Phase 1: Chuẩn bị Nền tảng & Kiến thức Thi cử',
      durationWeeks: Math.round(totalWeeks * 0.5),
      objective: 'Củng cố ngữ pháp, từ vựng và nắm vững cấu trúc đề thi.',
      focusSkills: ['grammar', 'vocabulary', 'reading'],
      competencyGate: {
        minGrammarCheckpointScore: 75,
        gateDescription: 'Đạt tối thiểu 75% bài kiểm tra tiến độ.',
      },
    });
    phases.push({
      phaseId: 'p2_standard_mock',
      phaseIndex: 2,
      name: 'Phase 2: Luyện đề & Đạt Chuẩn Điểm Mục tiêu',
      durationWeeks: totalWeeks - Math.round(totalWeeks * 0.5),
      objective: 'Làm quen áp lực phòng thi và hoàn thành chỉ tiêu điểm số.',
      focusSkills: ['listening', 'reading', 'writing'],
      competencyGate: {
        mockScoreThreshold: targetScore,
        gateDescription: 'Đạt điểm mục tiêu trong bài thi thử.',
      },
    });
  }

  return phases;
}

/**
 * Generate a strict daily schedule respecting dailyStudyMinutes & skill priorities.
 * Every task has a deterministic `whyThisTask` explanation.
 */
function buildDailyPlan({ dailyStudyMinutes, priorities, activePhase, certId, targetScore, targetBlueprint }) {
  const tasks = [];

  const sortedSkills = priorities.sortedSkills;
  const allocation = priorities.timeAllocationPercent;

  // Adapt task count to available daily minutes
  let taskCount = 3;
  if (dailyStudyMinutes <= 35) {
    taskCount = 1;
  } else if (dailyStudyMinutes <= 55) {
    taskCount = 2;
  } else if (dailyStudyMinutes <= 85) {
    taskCount = 3;
  } else {
    taskCount = Math.min(4, sortedSkills.length);
  }

  const todaySkills = sortedSkills.slice(0, taskCount);

  // Distribute minutes strictly so sum equals dailyStudyMinutes
  const skillMinutes = {};
  const activeWeights = todaySkills.map((s) => Math.max(5, allocation[s] || 25));
  const totalActiveWeight = activeWeights.reduce((a, b) => a + b, 0);

  let allocated = 0;
  for (let i = 0; i < todaySkills.length; i++) {
    const skill = todaySkills[i];
    if (i === todaySkills.length - 1) {
      skillMinutes[skill] = Math.max(5, dailyStudyMinutes - allocated);
    } else {
      const rawShare = Math.floor((dailyStudyMinutes * activeWeights[i]) / totalActiveWeight);
      const remainingReserved = (todaySkills.length - 1 - i) * 10;
      const min = Math.max(10, Math.min(rawShare, dailyStudyMinutes - allocated - remainingReserved));
      skillMinutes[skill] = min;
      allocated += min;
    }
  }

  // Build concrete tasks with Why This Task explanations
  todaySkills.forEach((skill, idx) => {
    const duration = skillMinutes[skill];
    const skillPriorityInfo = priorities.priorities[skill];
    const tier = skillPriorityInfo?.tier || 'Medium';

    let title = '';
    let category = '';
    let whyThisTask = '';
    let contentRef = '';

    if (skill === 'listening') {
      category = 'Nghe hiểu';
      if (certId === 'toeic') {
        title = `Luyện nghe TOEIC Part 1 - 2 & Chép chính tả (${duration} phút)`;
        contentRef = 'toeicScheduleStudy4: Test 1 Listening Flashcard & Audio Drill';
        whyThisTask = tier === 'Critical'
          ? `Kỹ năng Nghe hiện là lỗ hổng lớn nhất (Tier: Critical) cần bù đắp ngay để đạt mốc ${targetScore} TOEIC.`
          : `Rèn luyện phản xạ nghe phân biệt từ đồng âm và các câu trả lời gián tiếp trong Part 2.`;
      } else {
        title = `Academic Listening Section 1-2 & Form/Map Drills (${duration} phút)`;
        contentRef = 'ieltsPracticeData: Cambridge Listening Audio Scripts & Questions';
        whyThisTask = `Kỹ năng Nghe chiếm 25% tổng điểm thi IELTS và là đòn bẩy kéo band điểm nhanh nhất.`;
      }
    } else if (skill === 'reading') {
      category = 'Đọc hiểu';
      if (certId === 'toeic') {
        title = `Đọc hiểu thương mại & Điền câu Part 5-6 (${duration} phút)`;
        contentRef = 'readingData: Business Contexts & TOEIC Part 5 Drills';
        whyThisTask = `Part 5 và Part 7 quyết định 50% điểm số TOEIC. Cần rèn thói quen đọc lướt để không bị thiếu giờ.`;
      } else {
        title = `Academic Reading Passage Analysis & Heading Matching (${duration} phút)`;
        contentRef = 'readingData: Level B1-B2 Academic Passages';
        whyThisTask = `Luyện tập kỹ thuật Skimming & Scanning định vị từ khóa paraphrased trong bài đọc Cambridge.`;
      }
    } else if (skill === 'grammar') {
      category = 'Ngữ pháp';
      title = `Chuyên đề Ngữ pháp Trọng tâm: Câu ghép & Mệnh đề (${duration} phút)`;
      contentRef = 'grammarMaster85: Bài 27 Subject-Verb Agreement & Bài 33 Relative Clauses';
      whyThisTask = `Ngữ pháp là điều kiện tiên quyết (Prerequisite Gate) trong ${activePhase.name} trước khi chuyển phase.`;
    } else if (skill === 'vocabulary') {
      category = 'Từ vựng';
      title = `Nạp Từ vựng Trọng tâm & Flashcard Spaced Repetition (${duration} phút)`;
      contentRef = certId === 'ielts' ? 'ieltsVocab33Topics: Academic Word List (AWL)' : 'toeicScheduleStudy4: 50 từ vựng cốt lõi Test 1';
      whyThisTask = `Mục tiêu ${targetScore} yêu cầu vốn từ tối thiểu ${targetBlueprint?.recommendedVocabRange?.totalWords || 2500} từ để hiểu đề trơn tru.`;
    } else if (skill === 'writing') {
      category = 'Kỹ năng Viết';
      title = `Luyện viết câu phức & Cấu trúc bài luận Task 1/2 (${duration} phút)`;
      contentRef = 'writingTranslationData: Academic Translation & Sentence Building';
      whyThisTask = `Writing là kỹ năng output có chênh lệch lớn so với chuẩn Band ${targetScore}.`;
    } else if (skill === 'speaking') {
      category = 'Kỹ năng Nói';
      title = `Shadowing phản xạ phát âm & Trả lời câu hỏi phỏng vấn (${duration} phút)`;
      contentRef = 'shadowingData: Cambridge Real-life Dialogues';
      whyThisTask = `Rèn luyện độ trôi chảy (Fluency) và phát âm tự nhiên trước khi bước vào kỳ thi.`;
    } else {
      category = 'Ôn tập';
      title = `Tổng duyệt & Rà soát Lỗi sai (${duration} phút)`;
      whyThisTask = `Củng cố kiến thức và ghi chép vào sổ tay Deep Error Log.`;
    }

    tasks.push({
      id: `task_${idx + 1}`,
      skill,
      category,
      title,
      durationMinutes: duration,
      priorityTier: tier,
      whyThisTask,
      contentRef,
      isCompleted: false,
    });
  });

  return {
    dailyTotalMinutes: dailyStudyMinutes,
    scheduledTasksDuration: tasks.reduce((sum, t) => sum + t.durationMinutes, 0),
    tasks,
  };
}

// ─── MASTER EXPORTED FUNCTION ───────────────────────────────────────────────
/**
 * Generates a complete personalized roadmap
 * @param {Object} rawUserProfile - Normalized or raw user learning profile
 * @param {Object} rawGoal - Target certification goal specification
 */
export function generatePersonalizedRoadmap(rawUserProfile, rawGoal = {}) {
  const userProfile = normalizeUserProfile(rawUserProfile);

  const certId = (rawGoal.certification || userProfile.certification || 'toeic').toLowerCase();
  const targetScore = rawGoal.targetScore || userProfile.targetScore || (certId === 'ielts' ? '6.5' : '650');
  const dailyStudyMinutes = Number(rawGoal.dailyStudyMinutes || userProfile.dailyStudyMinutes || 60);
  const studyDaysPerWeek = Number(rawGoal.studyDaysPerWeek || userProfile.studyDaysPerWeek || 6);
  const examDate = rawGoal.examDate || userProfile.examDate || null;

  // 1. Get Target Blueprint
  const targetBlueprint = getTargetBlueprint(certId, targetScore);

  // 2. Skill Gap Engine
  const skillGapAnalysis = calculateSkillGaps(userProfile, targetBlueprint);

  // 3. Deadline Engine Calculation
  let daysRemaining = null;
  let totalWeeks = 16; // default 4 months
  let hasSpecificDeadline = false;

  if (examDate) {
    const today = new Date();
    const targetDate = new Date(examDate);
    const diffTime = targetDate - today;
    if (diffTime > 0) {
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      totalWeeks = Math.max(3, Math.ceil(daysRemaining / 7));
      hasSpecificDeadline = true;
    }
  }

  // If no deadline, calibrate total weeks based on gap size
  if (!hasSpecificDeadline) {
    const deficit = skillGapAnalysis.totalSkillDeficit;
    if (deficit > 5) totalWeeks = 24; // ~6 months
    else if (deficit > 3) totalWeeks = 18; // ~4.5 months
    else if (deficit > 1.5) totalWeeks = 12; // ~3 months
    else totalWeeks = 8; // ~2 months
  }

  const totalAvailableStudyHours = Math.round(((dailyStudyMinutes / 60) * studyDaysPerWeek * totalWeeks));

  // 4. Priority Engine
  const priorities = calculateSkillPriorities(skillGapAnalysis, userProfile, { daysRemaining });

  // 5. Real Content Mapping
  const realContent = getRealContentCurriculum(certId, targetScore, userProfile.overallLevel);

  // 6. Generate Roadmap Phases
  const phases = buildPhases({
    certId,
    currentLevel: userProfile.overallLevel,
    targetScore,
    targetBlueprint,
    totalWeeks,
    skillGapAnalysis,
    realContent,
  });

  const activePhase = phases[0] || {};

  // 7. Generate Time-Budgeted Daily Plan
  const dailyPlan = buildDailyPlan({
    dailyStudyMinutes,
    priorities,
    activePhase,
    certId,
    targetScore,
    targetBlueprint,
  });

  // 8. Weekly Milestones Summary
  const weeklyMilestones = [];
  for (let w = 1; w <= Math.min(totalWeeks, 12); w++) {
    const matchingPhase = phases.find((p, idx) => {
      let cumulative = 0;
      for (let i = 0; i <= idx; i++) cumulative += phases[i].durationWeeks;
      return w <= cumulative;
    }) || phases[phases.length - 1];

    weeklyMilestones.push({
      weekNumber: w,
      phaseId: matchingPhase?.phaseId,
      phaseName: matchingPhase?.name,
      weeklyFocus: matchingPhase?.focusSkills?.join(', ') || 'Tổng hợp',
      weeklyTargetHours: +( (dailyStudyMinutes / 60) * studyDaysPerWeek ).toFixed(1),
    });
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      engineVersion: '2.5.0-PersonalizedCertification',
      isOfficialSpec: false,
      disclaimer: 'Lộ trình được tạo tự động bởi Engine phân tích năng lực cá nhân hóa, kết hợp chuẩn thi quốc tế và kho học liệu thực chiến.',
    },
    goal: {
      certification: certId,
      certificationName: certId.toUpperCase(),
      targetScore,
      targetBlueprintLabel: targetBlueprint.label,
      requiredOverallLevel: targetBlueprint.cefrEquivalent,
      examDate,
      hasSpecificDeadline,
      daysRemaining,
      totalWeeks,
      totalAvailableStudyHours,
      dailyStudyMinutes,
      studyDaysPerWeek,
    },
    currentState: {
      overallLevel: userProfile.overallLevel,
      currentEstimatedScore: skillGapAnalysis.currentEstimatedScore,
      scoreUnit: skillGapAnalysis.scoreUnit,
      targetScoreGap: skillGapAnalysis.targetScoreGap,
      primaryBottleneck: skillGapAnalysis.primaryBottleneck,
      userSkillProfile: userProfile.skills,
    },
    targetBlueprint,
    skillGapAnalysis: {
      totalDeficit: skillGapAnalysis.totalSkillDeficit,
      skillGaps: skillGapAnalysis.skillGaps,
      largestGap: skillGapAnalysis.largestGap,
      blueprint: skillGapAnalysis.blueprint,
    },
    priorities: {
      priorityTiers: priorities.priorities,
      sortedSkills: priorities.sortedSkills,
      timeAllocationPercent: priorities.timeAllocationPercent,
      deadlineUrgency: priorities.deadlineUrgency,
    },
    curriculumContent: realContent,
    phases,
    currentPhase: activePhase,
    dailyPlan,
    weeklyMilestones,
  };
}
