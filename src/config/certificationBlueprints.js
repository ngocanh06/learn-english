/**
 * Certification Blueprints
 * Defines official exam structure, sections, skills, question types, and scoring rules.
 * Separates Official Exam Specifications from Internal Pedagogical Recommendations.
 */

export const CERTIFICATION_BLUEPRINTS = {
  toeic: {
    id: 'toeic',
    name: 'TOEIC Listening & Reading',
    fullName: 'Test of English for International Communication',
    governingBody: 'ETS (Educational Testing Service)',
    officialSpecDisclaimer: 'Cấu trúc bài thi dựa trên quy chuẩn đề thi thật ETS TOEIC 2 kỹ năng (Listening & Reading). Dữ liệu điểm số và năng lực phản ánh chuẩn quốc tế.',
    totalQuestions: 200,
    totalMinutes: 120,
    scoreRange: { min: 10, max: 990, step: 5 },
    sections: [
      {
        id: 'listening',
        name: 'TOEIC Listening',
        questions: 100,
        minutes: 45,
        scoreRange: { min: 5, max: 495 },
        weight: 0.5,
        parts: [
          { id: 'part_1', name: 'Part 1: Photographs', questions: 6, difficulty: 'A1-A2', focus: 'Mô tả tranh ảnh con người và vật cảnh' },
          { id: 'part_2', name: 'Part 2: Question - Response', questions: 25, difficulty: 'A2-B1', focus: 'Hỏi đáp phản xạ nhanh, bẫy từ đồng âm' },
          { id: 'part_3', name: 'Part 3: Short Conversations', questions: 39, difficulty: 'B1-B2', focus: 'Hội thoại 2-3 người, biểu đồ & câu hỏi ngụ ý' },
          { id: 'part_4', name: 'Part 4: Short Talks', questions: 30, difficulty: 'B1-B2', focus: 'Bài nói độc thoại thông báo, quảng cáo, tin nhắn' },
        ],
      },
      {
        id: 'reading',
        name: 'TOEIC Reading',
        questions: 100,
        minutes: 75,
        scoreRange: { min: 5, max: 495 },
        weight: 0.5,
        parts: [
          { id: 'part_5', name: 'Part 5: Incomplete Sentences', questions: 30, difficulty: 'A2-B2', focus: 'Điền từ ngữ pháp & từ vựng công sở' },
          { id: 'part_6', name: 'Part 6: Text Completion', questions: 16, difficulty: 'B1-B2', focus: 'Điền câu và từ vựng trong văn bản thương mại' },
          { id: 'part_7', name: 'Part 7: Reading Comprehension', questions: 54, difficulty: 'B1-C1', focus: 'Đoạn đơn (29 câu) & đoạn kép/ba (25 câu)' },
        ],
      },
    ],
    questionTypes: [
      { id: 'photo_desc', name: 'Mô tả tranh ảnh (Part 1)', primarySkill: 'listening', targetParts: ['part_1'] },
      { id: 'wh_questions', name: 'Câu hỏi Wh- & Yes/No (Part 2)', primarySkill: 'listening', targetParts: ['part_2'] },
      { id: 'indirect_response', name: 'Câu trả lời gián tiếp / phản xạ (Part 2)', primarySkill: 'listening', targetParts: ['part_2'] },
      { id: 'graphic_inference', name: 'Nghe kết hợp biểu đồ / suy luận ngụ ý (Part 3-4)', primarySkill: 'listening', targetParts: ['part_3', 'part_4'] },
      { id: 'grammar_fill', name: 'Ngữ pháp điền câu (Từ loại, thì, mệnh đề) (Part 5)', primarySkill: 'grammar', targetParts: ['part_5'] },
      { id: 'collocation_fill', name: 'Cụm từ vựng cố định & liên từ (Part 5-6)', primarySkill: 'vocabulary', targetParts: ['part_5', 'part_6'] },
      { id: 'sentence_insertion', name: 'Điền câu vào ngữ cảnh đoạn văn (Part 6)', primarySkill: 'reading', targetParts: ['part_6'] },
      { id: 'single_passage', name: 'Đọc hiểu đoạn đơn: Email, hóa đơn, thông báo (Part 7)', primarySkill: 'reading', targetParts: ['part_7'] },
      { id: 'multiple_passages', name: 'Đọc đối chiếu đoạn kép / đoạn ba (Part 7)', primarySkill: 'reading', targetParts: ['part_7'] },
    ],
  },

  ielts: {
    id: 'ielts',
    name: 'IELTS Academic',
    fullName: 'International English Language Testing System (Academic)',
    governingBody: 'IDP & British Council & Cambridge English',
    officialSpecDisclaimer: 'Quy chuẩn theo thang điểm 9.0 IELTS Academic gồm 4 kỹ năng riêng biệt. Nội dung học thuật đòi hỏi tư duy phân tích và ngôn ngữ học thuật.',
    totalQuestions: '40 Listening + 40 Reading + 2 Writing Tasks + 3 Speaking Parts',
    totalMinutes: 165,
    scoreRange: { min: 1.0, max: 9.0, step: 0.5 },
    sections: [
      {
        id: 'listening',
        name: 'IELTS Listening',
        questions: 40,
        minutes: 30,
        scoreRange: { min: 1.0, max: 9.0 },
        weight: 0.25,
        parts: [
          { id: 'sec_1', name: 'Section 1: Daily Social Conversation', questions: 10, difficulty: 'A2-B1', focus: 'Điền thông tin đặt chỗ, số điện thoại, tên riêng' },
          { id: 'sec_2', name: 'Section 2: Social Context Monologue', questions: 10, difficulty: 'B1', focus: 'Hướng dẫn tham quan, chỉ đường trên bản đồ' },
          { id: 'sec_3', name: 'Section 3: Educational/Academic Dialogue', questions: 10, difficulty: 'B2', focus: 'Thảo luận đề tài nghiên cứu giữa giảng viên và sinh viên' },
          { id: 'sec_4', name: 'Section 4: Academic Lecture Monologue', questions: 10, difficulty: 'B2-C1', focus: 'Bài giảng học thuật chuyên ngành tự nhiên / xã hội' },
        ],
      },
      {
        id: 'reading',
        name: 'IELTS Academic Reading',
        questions: 40,
        minutes: 60,
        scoreRange: { min: 1.0, max: 9.0 },
        weight: 0.25,
        parts: [
          { id: 'pass_1', name: 'Passage 1: Descriptive Article', questions: 13, difficulty: 'B1-B2', focus: 'Chủ đề khoa học đời sống, True/False/Not Given, Gap Fill' },
          { id: 'pass_2', name: 'Passage 2: Analytical Article', questions: 13, difficulty: 'B2', focus: 'Phân tích nghiên cứu, Matching Headings, Information Matching' },
          { id: 'pass_3', name: 'Passage 3: Complex Discursive Text', questions: 14, difficulty: 'B2-C1', focus: 'Lập luận học thuật sâu sắc, Multiple Choice, Summary Completion' },
        ],
      },
      {
        id: 'writing',
        name: 'IELTS Academic Writing',
        questions: 2,
        minutes: 60,
        scoreRange: { min: 1.0, max: 9.0 },
        weight: 0.25,
        parts: [
          { id: 'task_1', name: 'Task 1: Report Visual Data', questions: 1, difficulty: 'B1-C1', focus: 'Miêu tả biểu đồ xu hướng (Line, Bar, Pie, Table, Map, Process) tối thiểu 150 từ' },
          { id: 'task_2', name: 'Task 2: Discursive Essay', questions: 1, difficulty: 'B2-C1', focus: 'Bài luận học thuật (Opinion, Discussion, Problem-Solution, Two-Part) tối thiểu 250 từ' },
        ],
      },
      {
        id: 'speaking',
        name: 'IELTS Speaking',
        questions: 3,
        minutes: 14,
        scoreRange: { min: 1.0, max: 9.0 },
        weight: 0.25,
        parts: [
          { id: 'part_1', name: 'Part 1: Introduction & Interview', questions: '4-5 câu hỏi', difficulty: 'B1', focus: 'Sở thích cá nhân, công việc, quê hương, thói quen' },
          { id: 'part_2', name: 'Part 2: Long Turn (Cue Card)', questions: '1 chủ đề', difficulty: 'B1-B2', focus: 'Nói độc thoại 2 phút về trải nghiệm, sự kiện, con người' },
          { id: 'part_3', name: 'Part 3: Discussion & Speculation', questions: '4-6 câu hỏi', difficulty: 'B2-C1', focus: 'Thảo luận trừu tượng, quan điểm xã hội, nguyên nhân & hệ quả' },
        ],
      },
    ],
    questionTypes: [
      { id: 'matching_headings', name: 'Nối tiêu đề đoạn văn (Matching Headings)', primarySkill: 'reading', targetParts: ['pass_2', 'pass_3'] },
      { id: 'true_false_not_given', name: 'Đúng / Sai / Không đề cập (TFNG / YNNG)', primarySkill: 'reading', targetParts: ['pass_1', 'pass_2'] },
      { id: 'ielts_summary_completion', name: 'Hoàn thành đoạn tóm tắt (Summary Completion)', primarySkill: 'reading', targetParts: ['pass_1', 'pass_3'] },
      { id: 'listening_form_map', name: 'Điền form & gán nhãn bản đồ (Map Labelling)', primarySkill: 'listening', targetParts: ['sec_1', 'sec_2'] },
      { id: 'listening_lecture_notes', name: 'Ghi chú bài giảng Section 4', primarySkill: 'listening', targetParts: ['sec_4'] },
      { id: 'task1_trend_comparison', name: 'Viết báo cáo xu hướng & so sánh dữ liệu', primarySkill: 'writing', targetParts: ['task_1'] },
      { id: 'task2_argumentative_essay', name: 'Viết bài luận lập luận chặt chẽ có chứng cứ', primarySkill: 'writing', targetParts: ['task_2'] },
      { id: 'speaking_fluency_coherence', name: 'Phản xạ nói trôi chảy & liên kết mạch lạc', primarySkill: 'speaking', targetParts: ['part_2', 'part_3'] },
    ],
  },

  vstep: {
    id: 'vstep',
    name: 'VSTEP (B1 - B2 - C1)',
    fullName: 'Vietnamese Standardized Test of English Proficiency',
    governingBody: 'Bộ Giáo dục và Đào tạo Việt Nam',
    officialSpecDisclaimer: 'Quy chuẩn theo khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (KNLNNVN). Đánh giá 4 kỹ năng trên thang điểm 10.',
    totalQuestions: '3 Listening + 4 Reading Passages + 2 Writing Tasks + 3 Speaking Parts',
    totalMinutes: 175,
    scoreRange: { min: 0, max: 10, step: 0.5 },
    sections: [
      { id: 'listening', name: 'VSTEP Listening', questions: 35, minutes: 40, weight: 0.25 },
      { id: 'reading', name: 'VSTEP Reading', questions: 40, minutes: 60, weight: 0.25 },
      { id: 'writing', name: 'VSTEP Writing (Letter & Essay)', questions: 2, minutes: 60, weight: 0.25 },
      { id: 'speaking', name: 'VSTEP Speaking', questions: 3, minutes: 12, weight: 0.25 },
    ],
  },
};
