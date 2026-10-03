/**
 * Configurable Learning Goals, CEFR Levels, and Certifications
 * Extensible data model for English Foundation + Certification platform
 */

export const LEARNING_GOALS = [
  {
    id: 'general',
    title: 'Cải thiện tiếng Anh tổng quát',
    subtitle: 'Nâng cao vốn từ, ngữ pháp và sự tự tin khi sử dụng tiếng Anh',
    icon: 'fa-book-open',
    recommendedFocus: 'foundation',
  },
  {
    id: 'communication',
    title: 'Giao tiếp & Phản xạ thực tế',
    subtitle: 'Tập trung phát âm, nghe hiểu và phản xạ nói tự nhiên hàng ngày',
    icon: 'fa-comments',
    recommendedFocus: 'foundation',
  },
  {
    id: 'certification',
    title: 'Luyện thi chứng chỉ quốc tế',
    subtitle: 'Mục tiêu điểm số IELTS, TOEIC, TOEFL, VSTEP để du học hoặc đi làm',
    icon: 'fa-award',
    recommendedFocus: 'mixed',
  },
  {
    id: 'career',
    title: 'Tiếng Anh học thuật & sự nghiệp',
    subtitle: 'Phục vụ viết luận, nghiên cứu học thuật, phỏng vấn và thăng tiến',
    icon: 'fa-briefcase',
    recommendedFocus: 'mixed',
  },
];

export const CEFR_LEVELS = [
  {
    code: 'A1',
    name: 'Mất gốc / Mới bắt đầu (Beginner)',
    description: 'Hiểu các câu đơn giản, từ vựng rất cơ bản về bản thân và gia đình',
    vocabTarget: '500 - 1,000 từ',
    foundationWeight: 0.8,
  },
  {
    code: 'A2',
    name: 'Sơ cấp (Elementary)',
    description: 'Giao tiếp các tình huống đơn giản thường nhật, ngữ pháp cơ bản',
    vocabTarget: '1,000 - 2,000 từ',
    foundationWeight: 0.65,
  },
  {
    code: 'B1',
    name: 'Trung cấp (Intermediate)',
    description: 'Hiểu các ý chính trong văn bản rõ ràng, diễn đạt ý kiến và trải nghiệm',
    vocabTarget: '2,000 - 3,500 từ',
    foundationWeight: 0.45,
  },
  {
    code: 'B2',
    name: 'Trung cao cấp (Upper Intermediate)',
    description: 'Hiểu văn bản phức tạp, giao tiếp trôi chảy với người bản xứ',
    vocabTarget: '3,500 - 5,000 từ',
    foundationWeight: 0.3,
  },
  {
    code: 'C1',
    name: 'Cao cấp (Advanced)',
    description: 'Sử dụng ngôn ngữ linh hoạt cho mục đích học thuật, chuyên môn cao',
    vocabTarget: '5,000+ từ',
    foundationWeight: 0.15,
  },
];

export const CERTIFICATIONS = [
  {
    id: 'none',
    name: 'Không thi chứng chỉ',
    shortName: 'Nền tảng',
    badge: 'Foundation',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: '100% tập trung lấy gốc, phản xạ nghe nói và hoàn thiện ngữ pháp',
    icon: 'fa-compass',
    targetScores: [
      { value: 'A2', label: 'Cán mốc A2 (Sơ cấp vững vàng)' },
      { value: 'B1', label: 'Cán mốc B1 (Tự tin giao tiếp)' },
      { value: 'B2', label: 'Cán mốc B2 (Thành thạo công việc)' },
    ],
    defaultScore: 'B1',
    sections: [
      { id: 'listening', name: 'Nghe Chép Chính Tả', icon: 'fa-headphones' },
      { id: 'grammar', name: 'Ngữ Pháp Cốt Lõi', icon: 'fa-book-open' },
      { id: 'vocab', name: 'Từ Vựng Thông Dụng', icon: 'fa-layer-group' },
      { id: 'reading', name: 'Đọc Hiểu CEFR', icon: 'fa-newspaper' },
      { id: 'speaking', name: 'Nói & Shadowing', icon: 'fa-microphone' },
    ],
  },
  {
    id: 'ielts',
    name: 'IELTS Academic',
    shortName: 'IELTS 7.0+',
    badge: 'IELTS Academic',
    badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    description: 'Lộ trình 24 tuần Cambridge, 33 chủ đề từ vựng chuyên sâu (4,050 từ) & Task 1-2',
    icon: 'fa-graduation-cap',
    targetScores: [
      { value: '5.5', label: 'Band 5.5 (Đủ điều kiện xét tuyển ĐH)' },
      { value: '6.0', label: 'Band 6.0 (Chuẩn tốt nghiệp ĐH)' },
      { value: '6.5', label: 'Band 6.5 (Chuẩn du học phổ thông / ĐH)' },
      { value: '7.0', label: 'Band 7.0 (Học bổng & Định cư quốc tế)' },
      { value: '7.5', label: 'Band 7.5+ (Học bổng toàn phần / Giảng dạy)' },
      { value: '8.0', label: 'Band 8.0+ (Xuất sắc)' },
    ],
    defaultScore: '7.0',
    sections: [
      { id: 'ielts_reading', name: 'Academic Reading (Cam 15-19)', icon: 'fa-book-reader' },
      { id: 'ielts_listening', name: 'Academic Listening', icon: 'fa-headphones-simple' },
      { id: 'ielts_writing', name: 'Writing Task 1 & 2', icon: 'fa-pen-fancy' },
      { id: 'ielts_speaking', name: 'Speaking Part 1, 2, 3', icon: 'fa-microphone-lines' },
      { id: 'ielts_vocab', name: '33 Chủ Đề Từ Vựng IELTS (4,050 từ)', icon: 'fa-spell-check' },
    ],
  },
  {
    id: 'toeic',
    name: 'TOEIC Listening & Reading',
    shortName: 'TOEIC 800+',
    badge: 'TOEIC ETS',
    badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20',
    description: 'Lộ trình 60 ngày Study4 ETS TOEIC, 10 đề Full Test kèm giải chi tiết & từ vựng công sở',
    icon: 'fa-bullseye',
    targetScores: [
      { value: '550', label: '550+ (Tốt nghiệp cao đẳng / ĐH)' },
      { value: '650', label: '650+ (Đi làm văn phòng / DN nước ngoài)' },
      { value: '750', label: '750+ (Doanh nghiệp đa quốc gia)' },
      { value: '850', label: '850+ (Quản lý / Giao dịch quốc tế)' },
      { value: '900', label: '900+ (Chuyên gia ngôn ngữ)' },
    ],
    defaultScore: '750',
    sections: [
      { id: 'toeic_listening', name: 'TOEIC Listening Part 1-4', icon: 'fa-headphones' },
      { id: 'toeic_reading', name: 'TOEIC Reading Part 5-7', icon: 'fa-file-lines' },
      { id: 'toeic_vocab', name: 'Từ Vựng Doanh Nghiệp (1,000 từ)', icon: 'fa-briefcase' },
      { id: 'toeic_tests', name: '10 Bộ Đề Thi Thật ETS Study4', icon: 'fa-clipboard-check' },
    ],
  },
  {
    id: 'vstep',
    name: 'VSTEP B1 - B2 - C1',
    shortName: 'VSTEP B2',
    badge: 'VSTEP Bộ GD',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'Khung năng lực ngoại ngữ 6 bậc Việt Nam, chuẩn đầu ra thạc sĩ / giảng viên',
    icon: 'fa-shield-halved',
    targetScores: [
      { value: 'B1', label: 'Bậc 3 (B1) - Đầu vào/ra Thạc sĩ' },
      { value: 'B2', label: 'Bậc 4 (B2) - Chuẩn Giáo viên Anh ngữ' },
      { value: 'C1', label: 'Bậc 5 (C1) - Chuẩn Giảng viên Đại học' },
    ],
    defaultScore: 'B2',
    sections: [
      { id: 'vstep_listen', name: 'VSTEP Listening (3 phần)', icon: 'fa-headphones' },
      { id: 'vstep_read', name: 'VSTEP Reading (4 bài đọc)', icon: 'fa-book-open' },
      { id: 'vstep_write', name: 'VSTEP Writing (Thư & Luận)', icon: 'fa-pen-nib' },
      { id: 'vstep_speak', name: 'VSTEP Speaking (3 phần)', icon: 'fa-microphone' },
    ],
  },
  {
    id: 'toefl',
    name: 'TOEFL iBT',
    shortName: 'TOEFL 90+',
    badge: 'TOEFL iBT',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
    description: 'Chứng chỉ học thuật tiêu chuẩn Bắc Mỹ (Mỹ, Canada) cho bậc Đại học & Sau ĐH',
    icon: 'fa-earth-americas',
    targetScores: [
      { value: '70', label: '70 - 79 điểm (Đại học cơ bản)' },
      { value: '80', label: '80 - 89 điểm (Chuẩn du học Mỹ)' },
      { value: '95', label: '95 - 104 điểm (Top 100 ĐH Mỹ)' },
      { value: '105', label: '105+ điểm (Ivy League / Học bổng)' },
    ],
    defaultScore: '85',
    sections: [
      { id: 'toefl_reading', name: 'Academic Reading', icon: 'fa-book-open' },
      { id: 'toefl_listening', name: 'Lectures & Conversations', icon: 'fa-headphones' },
      { id: 'toefl_speaking', name: 'Integrated Speaking', icon: 'fa-microphone' },
      { id: 'toefl_writing', name: 'Academic Discussion Writing', icon: 'fa-pen-fancy' },
    ],
  },
];

export const STUDY_TIME_OPTIONS = [
  { minutes: 15, label: '15 phút/ngày (Bận rộn / Duy trì phản xạ)' },
  { minutes: 30, label: '30 phút/ngày (Mỗi ngày một bài học)' },
  { minutes: 45, label: '45 phút/ngày (Cân bằng & hiệu quả - Khuyên dùng)' },
  { minutes: 60, label: '60 phút/ngày (Tăng tốc vững chắc)' },
  { minutes: 90, label: '90 phút/ngày (Cấp tốc chuẩn bị thi)' },
  { minutes: 120, label: '120+ phút/ngày (Toàn tâm toàn ý bứt phá)' },
];

export const STUDY_DAYS_OPTIONS = [
  { days: 3, label: '3 ngày/tuần (Thứ 2, 4, 6 hoặc tùy chọn)' },
  { days: 4, label: '4 ngày/tuần' },
  { days: 5, label: '5 ngày/tuần (Thứ 2 đến Thứ 6)' },
  { days: 6, label: '6 ngày/tuần (Thứ 2 đến Thứ 7 - Khuyên dùng)' },
  { days: 7, label: '7 ngày/tuần (Học đều đặn mỗi ngày)' },
];

export const DEFAULT_USER_LEARNING_PROFILE = {
  learningGoal: 'certification',
  currentLevel: 'B1',
  certification: 'ielts',
  targetScore: '7.0',
  examDate: null, // YYYY-MM-DD or null
  dailyGoalMin: 45,
  studyDaysPerWeek: 6,
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
};
