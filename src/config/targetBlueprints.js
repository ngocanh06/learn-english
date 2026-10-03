/**
 * Target Blueprints
 * Defines distinct competency, grammar, vocabulary, question-type, and accuracy requirements
 * for each Target Score / Band.
 *
 * CRITICAL RULE: Target score is NOT a cosmetic label.
 * TOEIC 450 != TOEIC 650 != TOEIC 850
 * IELTS 5.0 != IELTS 6.0 != IELTS 6.5 != IELTS 7.0
 */

export const TARGET_BLUEPRINTS = {
  // ─────────────────────────────────────────────────────────────────────────
  // TOEIC TARGET BLUEPRINTS
  // ─────────────────────────────────────────────────────────────────────────
  'toeic_450': {
    targetId: 'toeic_450',
    certificationId: 'toeic',
    score: 450,
    label: 'TOEIC 450 (Chuẩn tốt nghiệp Cao đẳng & Nền tảng Doanh nghiệp)',
    cefrEquivalent: 'A2',
    estimatedScoreRange: { min: 400, max: 495 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Tập trung xây chắc ngữ pháp căn bản, từ vựng sinh hoạt văn phòng cốt lõi và làm chủ các câu hỏi trực diện Part 1, Part 2 và Part 5.',
    requiredSkillCompetencies: {
      listening: 'A2',
      reading: 'A2',
      grammar: 'A2',
      vocabulary: 'A2',
      speaking: 'A1',
      writing: 'A1',
    },
    prioritySkills: ['grammar', 'vocabulary', 'listening'],
    recommendedVocabRange: {
      totalWords: 1500,
      dailyNewWords: 10,
      focusDomains: ['Sinh hoạt công sở', 'Thông báo đơn giản', 'Mua sắm & Ăn uống', 'Giao thông đi lại'],
    },
    grammarRequirements: {
      complexityLevel: 'Foundation (Cơ bản)',
      keyTopics: [
        'Thì hiện tại đơn, quá khứ đơn, tương lai đơn',
        'Động từ To Be và trợ động từ Do/Does/Did',
        'Đại từ nhân xưng, tính từ sở hữu, đại từ tân ngữ',
        'Giới từ thời gian và nơi chốn căn bản (In, At, On)',
        'Danh từ đếm được và không đếm được cơ bản',
      ],
      recommendedLessonIds: ['1', '2', '3', '6', '7', '9', '10', '13', '16', '17', '20', '23', '26', '27', '28'],
    },
    questionTypeCompetency: {
      masteryRequired: ['photo_desc', 'wh_questions', 'grammar_fill'],
      minAccuracyTarget: 0.55,
      sectionTargets: {
        listeningScore: 230,
        readingScore: 220,
        listeningCorrectCount: '52 - 58 / 100',
        readingCorrectCount: '50 - 55 / 100',
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 3,
      passThreshold: 450,
    },
  },

  'toeic_550': {
    targetId: 'toeic_550',
    certificationId: 'toeic',
    score: 550,
    label: 'TOEIC 550 (Chuẩn tốt nghiệp Đại học & Làm việc cơ bản)',
    cefrEquivalent: 'B1-',
    estimatedScoreRange: { min: 500, max: 595 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Mở rộng vốn từ vựng thương mại, làm chủ các dạng câu hỏi gián tiếp Part 2, bắt đầu đọc hiểu nhanh văn bản ngắn Part 6 và đoạn đơn Part 7.',
    requiredSkillCompetencies: {
      listening: 'B1',
      reading: 'B1',
      grammar: 'B1',
      vocabulary: 'B1',
      speaking: 'A2',
      writing: 'A2',
    },
    prioritySkills: ['listening', 'vocabulary', 'reading'],
    recommendedVocabRange: {
      totalWords: 2500,
      dailyNewWords: 15,
      focusDomains: ['Họp hành & Lịch trình', 'Email & Bản ghi nhớ nội bộ', 'Dịch vụ khách hàng', 'Hóa đơn & Đặt vé'],
    },
    grammarRequirements: {
      complexityLevel: 'Pre-Intermediate (Sơ trung cấp)',
      keyTopics: [
        'Hiện tại hoàn thành & Quá khứ tiếp diễn',
        'Hòa hợp chủ vị nâng cao',
        'Động từ khuyết thiếu (Can, Could, Should, Must, May)',
        'Câu bị động cơ bản',
        'Mệnh đề quan hệ Who, Which, That',
        'Liên từ đẳng lập và phụ thuộc (Because, Although, But, So)',
      ],
      recommendedLessonIds: ['11', '12', '18', '21', '27', '29', '30', '31', '33', '37', '38', '42', '49'],
    },
    questionTypeCompetency: {
      masteryRequired: ['wh_questions', 'indirect_response', 'grammar_fill', 'collocation_fill', 'single_passage'],
      minAccuracyTarget: 0.65,
      sectionTargets: {
        listeningScore: 285,
        readingScore: 265,
        listeningCorrectCount: '63 - 68 / 100',
        readingCorrectCount: '58 - 63 / 100',
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 4,
      passThreshold: 550,
    },
  },

  'toeic_650': {
    targetId: 'toeic_650',
    certificationId: 'toeic',
    score: 650,
    label: 'TOEIC 650 (Tiêu chuẩn Doanh nghiệp FDI & Văn phòng Chuyên nghiệp)',
    cefrEquivalent: 'B1',
    estimatedScoreRange: { min: 600, max: 695 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Xử lý tốt các đoạn hội thoại 3 người Part 3, nghe hiểu thông báo Part 4, tối ưu thời gian đọc Part 5-6 (dưới 20 phút) để dành đủ 55 phút cho Part 7.',
    requiredSkillCompetencies: {
      listening: 'B1',
      reading: 'B1',
      grammar: 'B2',
      vocabulary: 'B1',
      speaking: 'B1',
      writing: 'B1',
    },
    prioritySkills: ['listening', 'reading', 'vocabulary'],
    recommendedVocabRange: {
      totalWords: 3500,
      dailyNewWords: 20,
      focusDomains: ['Hợp đồng kinh tế', 'Tài chính - Ngân sách', 'Tuyển dụng & Đào tạo', 'Marketing & Tiếp thị sản phẩm'],
    },
    grammarRequirements: {
      complexityLevel: 'Intermediate (Trung cấp)',
      keyTopics: [
        'Cụm phân từ hiện tại và quá khứ (V-ing, V-ed)',
        'Câu điều kiện loại 1, 2, 3 và hỗn hợp',
        'Rút gọn mệnh đề quan hệ',
        'Cụm giới từ phức hợp và liên từ nối câu',
        'So sánh kép và so sánh đặc biệt',
        'Cụm động từ (Phrasal Verbs) thường gặp trong kinh doanh',
      ],
      recommendedLessonIds: ['35', '36', '37', '38', '40', '41', '42', '43', '44', '50', '53', '54', '58'],
    },
    questionTypeCompetency: {
      masteryRequired: ['graphic_inference', 'collocation_fill', 'sentence_insertion', 'single_passage', 'multiple_passages'],
      minAccuracyTarget: 0.74,
      sectionTargets: {
        listeningScore: 345,
        readingScore: 305,
        listeningCorrectCount: '73 - 78 / 100',
        readingCorrectCount: '68 - 72 / 100',
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 5,
      passThreshold: 650,
    },
  },

  'toeic_750': {
    targetId: 'toeic_750',
    certificationId: 'toeic',
    score: 750,
    label: 'TOEIC 750 (Đa quốc gia & Quản lý Dự án Quốc tế)',
    cefrEquivalent: 'B2-',
    estimatedScoreRange: { min: 700, max: 795 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Đạt phản xạ nghe tự nhiên không cần dịch thầm, xử lý trơn tru đoạn đọc kép Part 7, làm chủ câu hỏi hàm ý (Inference) và kiểm soát bẫy từ vựng đồng nghĩa.',
    requiredSkillCompetencies: {
      listening: 'B2',
      reading: 'B2',
      grammar: 'B2',
      vocabulary: 'B2',
      speaking: 'B1',
      writing: 'B1',
    },
    prioritySkills: ['reading', 'listening', 'vocabulary'],
    recommendedVocabRange: {
      totalWords: 4500,
      dailyNewWords: 25,
      focusDomains: ['Luật thương mại', 'Sáp nhập & Mua lại', 'Vận tải quốc tế & Logistics', 'Báo cáo thường niên'],
    },
    grammarRequirements: {
      complexityLevel: 'Upper-Intermediate (Trung cao cấp)',
      keyTopics: [
        'Đảo ngữ (Inversion with Negative Adverbs)',
        'Giả định cách (Subjunctive mood with recommend, suggest, imperative)',
        'Mệnh đề danh từ làm tân ngữ/chủ ngữ phức tạp',
        'Parallel Structure (Cấu trúc song song nâng cao)',
      ],
      recommendedLessonIds: ['25', '39', '44', '61', '62', '64', '65', '70', '71', '72', '80'],
    },
    questionTypeCompetency: {
      masteryRequired: ['graphic_inference', 'multiple_passages', 'sentence_insertion'],
      minAccuracyTarget: 0.82,
      sectionTargets: {
        listeningScore: 390,
        readingScore: 360,
        listeningCorrectCount: '81 - 86 / 100',
        readingCorrectCount: '77 - 82 / 100',
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 6,
      passThreshold: 750,
    },
  },

  'toeic_850': {
    targetId: 'toeic_850',
    certificationId: 'toeic',
    score: 850,
    label: 'TOEIC 850+ (Chuyên gia ngôn ngữ & Đàm phán Cấp cao)',
    cefrEquivalent: 'B2',
    estimatedScoreRange: { min: 800, max: 895 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Tốc độ đọc lướt (Skimming & Scanning) đạt chuẩn 150-180 từ/phút; kiểm soát toàn bộ 25 câu hỏi đoạn ba (Triple Passages); sai sót Part 5 không quá 3 câu.',
    requiredSkillCompetencies: {
      listening: 'C1',
      reading: 'B2',
      grammar: 'C1',
      vocabulary: 'B2',
      speaking: 'B2',
      writing: 'B2',
    },
    prioritySkills: ['reading', 'listening', 'vocabulary'],
    recommendedVocabRange: {
      totalWords: 6000,
      dailyNewWords: 30,
      focusDomains: ['Chiến lược doanh nghiệp', 'Phân tích tài chính chuyên sâu', 'Thị trường chứng khoán', 'Sở hữu trí tuệ'],
    },
    grammarRequirements: {
      complexityLevel: 'Advanced (Cao cấp)',
      keyTopics: [
        'Cấu trúc đảo ngữ toàn phần và bán phần',
        'Thành ngữ kinh doanh & Collocations nâng cao',
        'Tuyệt chiêu phân biệt từ đồng nghĩa gây nhiễu trong ngữ cảnh kinh tế',
        'Độ chính xác ngữ pháp tuyệt đối dưới áp lực thời gian',
      ],
      recommendedLessonIds: ['25', '35', '40', '44', '61', '62', '64', '65', '71', '72', '80', '82', '85'],
    },
    questionTypeCompetency: {
      masteryRequired: ['multiple_passages', 'graphic_inference', 'collocation_fill'],
      minAccuracyTarget: 0.90,
      sectionTargets: {
        listeningScore: 440,
        readingScore: 410,
        listeningCorrectCount: '89 - 94 / 100',
        readingCorrectCount: '86 - 91 / 100',
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 8,
      passThreshold: 850,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // IELTS TARGET BLUEPRINTS
  // ─────────────────────────────────────────────────────────────────────────
  'ielts_5.0': {
    targetId: 'ielts_5.0',
    certificationId: 'ielts',
    score: 5.0,
    label: 'IELTS Band 5.0 (Modest User - Chuẩn xét tuyển cơ bản)',
    cefrEquivalent: 'B1',
    estimatedScoreRange: { min: 4.5, max: 5.0 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Làm quen định dạng đề IELTS, nắm chắc Section 1-2 Listening, Passage 1 Reading, viết được đoạn văn có cấu trúc và trả lời trôi chảy Part 1 Speaking.',
    requiredSkillCompetencies: {
      listening: 'B1',
      reading: 'B1',
      writing: 'B1',
      speaking: 'B1',
      grammar: 'B1',
      vocabulary: 'B1',
    },
    prioritySkills: ['listening', 'reading', 'grammar'],
    recommendedVocabRange: {
      totalWords: 2000,
      dailyNewWords: 15,
      focusDomains: ['Gia đình, bạn bè', 'Sở thích & Du lịch', 'Công việc & Trường học', 'Môi trường sống'],
    },
    grammarRequirements: {
      complexityLevel: 'Pre-Intermediate',
      keyTopics: ['Thì cơ bản', 'Mẫu câu đơn & câu ghép cơ bản', 'Từ nối đơn giản (And, But, Because)', 'So sánh'],
      recommendedLessonIds: ['1', '2', '6', '10', '16', '17', '20', '23', '27', '31', '33', '38', '42'],
    },
    questionTypeCompetency: {
      masteryRequired: ['listening_form_map', 'true_false_not_given', 'speaking_fluency_coherence'],
      minAccuracyTarget: 0.55,
      sectionTargets: {
        listeningScore: 5.0,
        readingScore: 5.0,
        writingScore: 4.5,
        speakingScore: 5.0,
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 3,
      passThreshold: 5.0,
    },
  },

  'ielts_5.5': {
    targetId: 'ielts_5.5',
    certificationId: 'ielts',
    score: 5.5,
    label: 'IELTS Band 5.5 (Đủ chuẩn tuyển sinh Đại học trong nước)',
    cefrEquivalent: 'B1',
    estimatedScoreRange: { min: 5.0, max: 5.5 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Nâng cao khả năng nghe Section 3, bắt đầu đọc hiểu Passage 2, viết đúng cấu trúc 4 đoạn cho Task 2 và mô tả xu hướng biểu đồ đường/cột Task 1.',
    requiredSkillCompetencies: {
      listening: 'B1',
      reading: 'B1',
      writing: 'B1',
      speaking: 'B1',
      grammar: 'B1',
      vocabulary: 'B1',
    },
    prioritySkills: ['writing', 'listening', 'reading'],
    recommendedVocabRange: {
      totalWords: 2800,
      dailyNewWords: 15,
      focusDomains: ['Giáo dục & Công nghệ', 'Giao thông & Đô thị hóa', 'Sức khỏe & Dinh dưỡng'],
    },
    grammarRequirements: {
      complexityLevel: 'Intermediate',
      keyTopics: ['Câu ghép & câu phức cơ bản', 'Mệnh đề quan hệ xác định', 'Câu bị động trong báo cáo', 'Các dạng câu điều kiện'],
      recommendedLessonIds: ['11', '12', '18', '21', '27', '33', '37', '38', '41', '42', '44', '49'],
    },
    questionTypeCompetency: {
      masteryRequired: ['listening_form_map', 'true_false_not_given', 'task1_trend_comparison'],
      minAccuracyTarget: 0.62,
      sectionTargets: {
        listeningScore: 5.5,
        readingScore: 5.5,
        writingScore: 5.0,
        speakingScore: 5.5,
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 4,
      passThreshold: 5.5,
    },
  },

  'ielts_6.0': {
    targetId: 'ielts_6.0',
    certificationId: 'ielts',
    score: 6.0,
    label: 'IELTS Band 6.0 (Competent User - Chuẩn Tốt nghiệp Đại học)',
    cefrEquivalent: 'B2-',
    estimatedScoreRange: { min: 5.5, max: 6.0 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Làm chủ kỹ thuật Paraphrase & Skimming/Scanning, xử lý bẫy thông tin Reading Passage 2, viết Task 2 có luận điểm rõ ràng kèm ví dụ, duy trì phản xạ Speaking Part 2 trên 1.5 phút.',
    requiredSkillCompetencies: {
      listening: 'B2',
      reading: 'B2',
      writing: 'B1',
      speaking: 'B1',
      grammar: 'B2',
      vocabulary: 'B2',
    },
    prioritySkills: ['writing', 'speaking', 'reading'],
    recommendedVocabRange: {
      totalWords: 3800,
      dailyNewWords: 20,
      focusDomains: ['Khoa học môi trường', 'Truyền thông & Quảng cáo', 'Toàn cầu hóa & Văn hóa'],
    },
    grammarRequirements: {
      complexityLevel: 'Upper-Intermediate',
      keyTopics: ['Mệnh đề danh từ', 'Rút gọn mệnh đề phân từ', 'Mệnh đề nhượng bộ (Although, Despite, In spite of)', 'Đảo ngữ cơ bản'],
      recommendedLessonIds: ['25', '35', '37', '41', '44', '49', '53', '61', '62'],
    },
    questionTypeCompetency: {
      masteryRequired: ['matching_headings', 'ielts_summary_completion', 'task1_trend_comparison', 'task2_argumentative_essay'],
      minAccuracyTarget: 0.70,
      sectionTargets: {
        listeningScore: 6.0,
        readingScore: 6.0,
        writingScore: 5.5,
        speakingScore: 6.0,
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 5,
      passThreshold: 6.0,
    },
  },

  'ielts_6.5': {
    targetId: 'ielts_6.5',
    certificationId: 'ielts',
    score: 6.5,
    label: 'IELTS Band 6.5 (Chuẩn Du học Đại học & Định cư Quốc tế)',
    cefrEquivalent: 'B2',
    estimatedScoreRange: { min: 6.0, max: 6.5 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Không có kỹ năng nào dưới 6.0. Đẩy mạnh Listening & Reading lên 7.0 để kéo Writing & Speaking (yêu cầu tối thiểu 6.0). Nắm vững tiêu chí chấm Cohesion & Lexical Resource.',
    requiredSkillCompetencies: {
      listening: 'B2',
      reading: 'B2',
      writing: 'B2',
      speaking: 'B2',
      grammar: 'B2',
      vocabulary: 'B2',
    },
    prioritySkills: ['writing', 'speaking', 'listening'],
    recommendedVocabRange: {
      totalWords: 5000,
      dailyNewWords: 25,
      focusDomains: ['Academic Word List (AWL)', 'Kinh tế học & Phát triển bền vững', 'Tâm lý học hành vi', 'Trí tuệ nhân tạo'],
    },
    grammarRequirements: {
      complexityLevel: 'Upper-Intermediate (Chính xác cao)',
      keyTopics: ['Đa dạng cấu trúc câu (Simple, Compound, Complex, Compound-Complex)', 'Câu điều kiện hỗn hợp', 'Giả định cách', 'Mệnh đề quan hệ rút gọn'],
      recommendedLessonIds: ['35', '37', '41', '44', '61', '62', '64', '65', '71', '72'],
    },
    questionTypeCompetency: {
      masteryRequired: ['matching_headings', 'task2_argumentative_essay', 'speaking_fluency_coherence', 'listening_lecture_notes'],
      minAccuracyTarget: 0.78,
      sectionTargets: {
        listeningScore: 7.0,
        readingScore: 7.0,
        writingScore: 6.0,
        speakingScore: 6.0,
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 6,
      passThreshold: 6.5,
    },
  },

  'ielts_7.0': {
    targetId: 'ielts_7.0',
    certificationId: 'ielts',
    score: 7.0,
    label: 'IELTS Band 7.0 (Good User - Học bổng Toàn phần & Giảng dạy)',
    cefrEquivalent: 'C1-',
    estimatedScoreRange: { min: 6.5, max: 7.0 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Sử dụng ngôn ngữ học thuật tự nhiên, linh hoạt Collocations và Idiomatic Expressions. Task 2 có lập luận sắc bén với Counter-argument. Listening Section 4 ghi chú trọn vẹn thuật ngữ.',
    requiredSkillCompetencies: {
      listening: 'C1',
      reading: 'C1',
      writing: 'B2',
      speaking: 'B2',
      grammar: 'C1',
      vocabulary: 'C1',
    },
    prioritySkills: ['writing', 'speaking', 'reading'],
    recommendedVocabRange: {
      totalWords: 6500,
      dailyNewWords: 30,
      focusDomains: ['33 chủ đề từ vựng chuyên sâu Cambridge', 'Collocations C1-C2', 'Thành ngữ học thuật', 'Từ vựng trừu tượng triết học'],
    },
    grammarRequirements: {
      complexityLevel: 'Advanced (Linh hoạt & Hiếm khi có lỗi)',
      keyTopics: ['Đảo ngữ với cụm từ phủ định & Not only... but also', 'Cấu trúc nhấn mạnh (Cleft sentences: It is... that...)', 'Danh từ hóa (Nominalisation trong Academic Writing)', 'Mệnh đề song song phức hợp'],
      recommendedLessonIds: ['25', '35', '40', '44', '61', '62', '64', '65', '71', '72', '80', '82', '85'],
    },
    questionTypeCompetency: {
      masteryRequired: ['matching_headings', 'task2_argumentative_essay', 'listening_lecture_notes', 'speaking_fluency_coherence'],
      minAccuracyTarget: 0.84,
      sectionTargets: {
        listeningScore: 7.5,
        readingScore: 7.5,
        writingScore: 6.5,
        speakingScore: 6.5,
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 8,
      passThreshold: 7.0,
    },
  },

  'ielts_7.5': {
    targetId: 'ielts_7.5',
    certificationId: 'ielts',
    score: 7.5,
    label: 'IELTS Band 7.5+ (Xuất sắc - Định cư & Du học Top ĐH Thế giới)',
    cefrEquivalent: 'C1',
    estimatedScoreRange: { min: 7.0, max: 8.0 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Đạt điểm số 8.0+ ở 2 kỹ năng tiếp nhận (Listening/Reading) và tối thiểu 7.0 ở cả Writing và Speaking. Tư duy phản biện sắc bén và vốn từ học thuật phong phú.',
    requiredSkillCompetencies: {
      listening: 'C1',
      reading: 'C1',
      writing: 'C1',
      speaking: 'C1',
      grammar: 'C1',
      vocabulary: 'C1',
    },
    prioritySkills: ['writing', 'speaking', 'listening'],
    recommendedVocabRange: {
      totalWords: 8000,
      dailyNewWords: 35,
      focusDomains: ['Academic Word List toàn diện', 'Học thuật chuyên ngành sâu', 'Từ ngữ phong cách văn học & báo chí'],
    },
    grammarRequirements: {
      complexityLevel: 'Expert (Chuẩn mực học thuật)',
      keyTopics: ['Toàn bộ cấu trúc ngữ pháp cao cấp', 'Phong cách văn phong khách quan (Impersonal Academic Tone)', 'Xử lý cấu trúc cú pháp phức hợp liên tầng'],
      recommendedLessonIds: ['25', '35', '40', '44', '61', '62', '64', '65', '71', '72', '80', '82', '85'],
    },
    questionTypeCompetency: {
      masteryRequired: ['task2_argumentative_essay', 'listening_lecture_notes', 'matching_headings', 'speaking_fluency_coherence'],
      minAccuracyTarget: 0.90,
      sectionTargets: {
        listeningScore: 8.0,
        readingScore: 8.0,
        writingScore: 7.0,
        speakingScore: 7.0,
      },
    },
    mockExamBenchmark: {
      requiredFullMocks: 10,
      passThreshold: 7.5,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // VSTEP TARGET BLUEPRINTS
  // ─────────────────────────────────────────────────────────────────────────
  'vstep_B1': {
    targetId: 'vstep_B1',
    certificationId: 'vstep',
    score: 'B1',
    label: 'VSTEP Bậc 3 (B1) - Đầu vào/ra Thạc sĩ & Chuẩn tốt nghiệp ĐH',
    cefrEquivalent: 'B1',
    estimatedScoreRange: { min: 4.0, max: 5.5 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Đạt tối thiểu 4.0/10 điểm quy đổi. Làm quen cấu trúc bài thi VSTEP, viết được thư giao tiếp và đoạn văn đơn giản.',
    requiredSkillCompetencies: { listening: 'B1', reading: 'B1', writing: 'B1', speaking: 'B1', grammar: 'B1', vocabulary: 'B1' },
    prioritySkills: ['reading', 'writing', 'grammar'],
    recommendedVocabRange: { totalWords: 2500, dailyNewWords: 15, focusDomains: ['Đời sống hàng ngày', 'Du lịch', 'Giáo dục cơ bản'] },
    grammarRequirements: { complexityLevel: 'Intermediate', keyTopics: ['Các thì cơ bản', 'Câu ghép', 'Mệnh đề quan hệ cơ bản'], recommendedLessonIds: ['1', '6', '10', '16', '17', '20', '23', '27', '33', '38'] },
    questionTypeCompetency: { masteryRequired: ['vstep_read', 'vstep_write'], minAccuracyTarget: 0.60, sectionTargets: { overallScore: 4.5 } },
    mockExamBenchmark: { requiredFullMocks: 3, passThreshold: 4.5 },
  },

  'vstep_B2': {
    targetId: 'vstep_B2',
    certificationId: 'vstep',
    score: 'B2',
    label: 'VSTEP Bậc 4 (B2) - Chuẩn Giáo viên Tiếng Anh & Đầu ra Tiến sĩ',
    cefrEquivalent: 'B2',
    estimatedScoreRange: { min: 6.0, max: 8.0 },
    isOfficialSpec: false,
    pedagogicalRationale: 'Đạt tối thiểu 6.0/10 điểm quy đổi. Đọc hiểu 4 bài đọc dài, viết bài luận 250 từ mạch lạc, nói phản xạ 3 phần tự tin.',
    requiredSkillCompetencies: { listening: 'B2', reading: 'B2', writing: 'B2', speaking: 'B2', grammar: 'B2', vocabulary: 'B2' },
    prioritySkills: ['writing', 'speaking', 'reading'],
    recommendedVocabRange: { totalWords: 4500, dailyNewWords: 20, focusDomains: ['Giáo dục', 'Kinh tế xã hội', 'Môi trường'] },
    grammarRequirements: { complexityLevel: 'Upper-Intermediate', keyTopics: ['Rút gọn mệnh đề', 'Câu điều kiện nâng cao', 'Đảo ngữ', 'Từ nối nâng cao'], recommendedLessonIds: ['35', '37', '41', '44', '61', '62'] },
    questionTypeCompetency: { masteryRequired: ['vstep_read', 'vstep_write', 'vstep_speak'], minAccuracyTarget: 0.75, sectionTargets: { overallScore: 6.5 } },
    mockExamBenchmark: { requiredFullMocks: 5, passThreshold: 6.5 },
  },
};

/**
 * Helper to get blueprint for a certification and target
 */
export function getTargetBlueprint(certificationId, targetScore) {
  if (!certificationId) return null;
  const key = `${certificationId.toLowerCase()}_${targetScore}`;
  if (TARGET_BLUEPRINTS[key]) return TARGET_BLUEPRINTS[key];

  // Fallback search by certification and numeric match
  const matches = Object.values(TARGET_BLUEPRINTS).filter(
    (bp) => bp.certificationId === certificationId.toLowerCase()
  );
  if (matches.length > 0) {
    return matches[0];
  }
  return null;
}
