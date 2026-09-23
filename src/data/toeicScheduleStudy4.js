import { SHORT_STORIES_LESSONS } from './dailyDictationFullData.js';

export const DAILY_DICTATION_DATA = {
  user: 'Học viên',
  completedCount: 290,
  activeHours: 54.1,
  activeDays: 124,
  lessons: SHORT_STORIES_LESSONS,
};

// ─── STUDY4 49-SESSION COMPLETE TOEIC ROADMAP ───
// Tách biệt rõ ràng: 'test' (Làm đề), 'review' (Chữa đề), 'vocab' (Học từ vựng), 'summary' (Tổng kết)
export const STUDY4_TOEIC_SCHEDULE = [
  // Tuần 1: Nền tảng từ vựng đề thi Test 1 (Toàn bộ 286 từ thực chiến: Listening 236 từ + Reading 50 từ)
  { day: 1, date: '01/09/2026', week: 'Tuần 1', skill: 'Listening', category: 'vocab', testNum: 1, chunkIndex: 1, partFilter: 'day-1', startWord: 1, endWord: 50, wordCount: 50, activity: 'Từ vựng Test 1 Listening (Buổi 1/5: Từ 1 - 50)', duration: 45, note: '50 từ vựng cốt lõi Part 1-2 (Tranh ảnh & Hỏi đáp giao tiếp văn phòng)', status: 'Chưa làm' },
  { day: 2, date: '02/09/2026', week: 'Tuần 1', skill: 'Listening', category: 'vocab', testNum: 1, chunkIndex: 2, partFilter: 'day-2', startWord: 51, endWord: 100, wordCount: 50, activity: 'Từ vựng Test 1 Listening (Buổi 2/5: Từ 51 - 100)', duration: 45, note: '50 từ vựng đối thoại Part 2-3 (Hội thoại ngắn, trao đổi đồng nghiệp)', status: 'Chưa làm' },
  { day: 3, date: '03/09/2026', week: 'Tuần 1', skill: 'Listening', category: 'vocab', testNum: 1, chunkIndex: 3, partFilter: 'day-3', startWord: 101, endWord: 150, wordCount: 50, activity: 'Từ vựng Test 1 Listening (Buổi 3/5: Từ 101 - 150)', duration: 45, note: '50 từ vựng công sở & dịch vụ Part 3 (Tình huống mua sắm & hội họp)', status: 'Chưa làm' },
  { day: 4, date: '04/09/2026', week: 'Tuần 1', skill: 'Listening', category: 'vocab', testNum: 1, chunkIndex: 4, partFilter: 'day-4', startWord: 151, endWord: 200, wordCount: 50, activity: 'Từ vựng Test 1 Listening (Buổi 4/5: Từ 151 - 200)', duration: 45, note: '50 từ vựng bài nói & thông báo Part 4 (Bài nói độc thoại, phát thanh)', status: 'Chưa làm' },
  { day: 5, date: '05/09/2026', week: 'Tuần 1', skill: 'Listening', category: 'vocab', testNum: 1, chunkIndex: 5, partFilter: 'day-5', startWord: 201, endWord: 236, wordCount: 36, activity: 'Từ vựng Test 1 Listening (Buổi 5/5: Từ 201 - 236)', duration: 45, note: '36 từ vựng về đích hoàn tất 100% từ vựng Listening Test 1', status: 'Chưa làm' },
  { day: 6, date: '06/09/2026', week: 'Tuần 1', skill: 'Reading', category: 'vocab', testNum: 1, chunkIndex: 1, partFilter: 'day-1', startWord: 1, endWord: 50, wordCount: 50, activity: 'Từ vựng Test 1 Reading (Buổi 1/1: Từ 1 - 50)', duration: 45, note: '50 từ vựng đọc hiểu Part 5-7 Test 1 (Hợp đồng, email, thông báo)', status: 'Chưa làm' },
  { day: 7, date: '07/09/2026', week: 'Tuần 1', skill: 'Tổng hợp', category: 'vocab', testNum: 1, chunkIndex: 1, partFilter: 'review-all', startWord: 1, endWord: 286, wordCount: 286, activity: 'Ôn tập & Spaced Repetition toàn bộ 286 từ Test 1', duration: 60, note: 'Tổng duyệt Flashcard & Trắc nghiệm toàn bộ 286 từ vựng đề Test 1', status: 'Chưa làm' },

  // Tuần 2: Nền tảng từ vựng đề thi Test 2 (Đến ngày 11 bắt đầu tuyến Làm & Chữa đề)
  { day: 8, date: '08/09/2026', week: 'Tuần 2', skill: 'Listening', category: 'vocab', testNum: 2, chunkIndex: 1, partFilter: 'day-1', startWord: 1, endWord: 50, wordCount: 50, activity: 'Từ vựng Test 2 Listening (Buổi 1/5: Từ 1 - 50)', duration: 45, note: '50 từ vựng cốt lõi Part 1-2 Test 2', status: 'Chưa làm' },
  { day: 9, date: '09/09/2026', week: 'Tuần 2', skill: 'Listening', category: 'vocab', testNum: 2, chunkIndex: 2, partFilter: 'day-2', startWord: 51, endWord: 100, wordCount: 50, activity: 'Từ vựng Test 2 Listening (Buổi 2/5: Từ 51 - 100)', duration: 45, note: '50 từ vựng Part 3 Test 2', status: 'Chưa làm' },
  { day: 10, date: '10/09/2026', week: 'Tuần 2', skill: 'Reading', category: 'vocab', testNum: 2, chunkIndex: 1, partFilter: 'day-1', startWord: 1, endWord: 50, wordCount: 50, activity: 'Từ vựng Test 2 Reading (Buổi 1/2: Từ 1 - 50)', duration: 45, note: '50 từ vựng Part 5-6 Test 2', status: 'Chưa làm' },
  { day: 11, date: '11/09/2026', week: 'Tuần 2', skill: 'Listening', category: 'review', testNum: 3, activity: 'Chữa đề Listening Test 3', duration: 90, note: 'Chữa chi tiết và lọc từ vựng', status: 'Chưa làm' },
  { day: 12, date: '12/09/2026', week: 'Tuần 2', skill: 'Listening', category: 'vocab', testNum: 3, activity: 'Học từ vựng Listening Test 3', duration: 60, note: 'Học từ vựng đã lọc', status: 'Chưa làm' },
  { day: 13, date: '13/09/2026', week: 'Tuần 2', skill: 'Reading', category: 'test', testNum: 3, activity: 'Làm đề Reading Test 3', duration: 75, note: 'Bắt đầu bấm giờ Test 3 RC (100 câu)', status: 'Chưa làm' },
  { day: 14, date: '14/09/2026', week: 'Tuần 2', skill: 'Tổng hợp', category: 'vocab', testNum: 3, activity: 'Ôn tập từ vựng Test 3', duration: 60, note: 'Tổng kết tuần 2', status: 'Chưa làm' },

  // Tuần 3
  { day: 15, date: '15/09/2026', week: 'Tuần 3', skill: 'Reading', category: 'review', testNum: 3, activity: 'Chữa đề Reading Test 3', duration: 90, note: 'Chữa chi tiết Part 7', status: 'Chưa làm' },
  { day: 16, date: '16/09/2026', week: 'Tuần 3', skill: 'Reading', category: 'vocab', testNum: 3, activity: 'Học từ vựng Reading Test 3', duration: 60, note: 'Lọc collocations', status: 'Chưa làm' },
  { day: 17, date: '17/09/2026', week: 'Tuần 3', skill: 'Listening', category: 'test', testNum: 4, activity: 'Làm đề Listening Test 4', duration: 45, note: 'Bấm giờ Test 4 LC (100 câu)', status: 'Chưa làm' },
  { day: 18, date: '18/09/2026', week: 'Tuần 3', skill: 'Listening', category: 'review', testNum: 4, activity: 'Chữa đề Listening Test 4', duration: 90, note: 'Chữa chi tiết', status: 'Chưa làm' },
  { day: 19, date: '19/09/2026', week: 'Tuần 3', skill: 'Listening', category: 'vocab', testNum: 4, activity: 'Học từ vựng Listening Test 4', duration: 60, note: 'Lưu từ vào sổ', status: 'Chưa làm' },
  { day: 20, date: '20/09/2026', week: 'Tuần 3', skill: 'Reading', category: 'test', testNum: 4, activity: 'Làm đề Reading Test 4', duration: 75, note: 'Bấm giờ Test 4 RC (100 câu)', status: 'Chưa làm' },
  { day: 21, date: '21/09/2026', week: 'Tuần 3', skill: 'Tổng hợp', category: 'vocab', testNum: 4, activity: 'Ôn tập từ vựng Test 4', duration: 60, note: 'Tổng kết tuần 3', status: 'Chưa làm' },

  // Tuần 4
  { day: 22, date: '22/09/2026', week: 'Tuần 4', skill: 'Reading', category: 'review', testNum: 4, activity: 'Chữa đề Reading Test 4', duration: 90, note: 'Chữa chi tiết câu sai Part 5-7', status: 'Chưa làm' },
  { day: 23, date: '23/09/2026', week: 'Tuần 4', skill: 'Reading', category: 'vocab', testNum: 4, activity: 'Học từ vựng Reading Test 4', duration: 60, note: 'Lọc từ vựng thương mại & email', status: 'Chưa làm' },
  { day: 24, date: '24/09/2026', week: 'Tuần 4', skill: 'Listening', category: 'test', testNum: 5, activity: 'Làm đề Listening Test 5', duration: 45, note: 'Bấm giờ chuẩn áp lực Test 5 LC', status: 'Chưa làm' },
  { day: 25, date: '25/09/2026', week: 'Tuần 4', skill: 'Listening', category: 'review', testNum: 5, activity: 'Chữa đề Listening Test 5', duration: 90, note: 'Chữa bẫy Part 3-4 đoạn đối thoại nhanh', status: 'Chưa làm' },
  { day: 26, date: '26/09/2026', week: 'Tuần 4', skill: 'Listening', category: 'vocab', testNum: 5, activity: 'Học từ vựng Listening Test 5', duration: 60, note: 'Lọc các cụm từ nối âm khó', status: 'Chưa làm' },
  { day: 27, date: '27/09/2026', week: 'Tuần 4', skill: 'Reading', category: 'test', testNum: 5, activity: 'Làm đề Reading Test 5', duration: 75, note: 'Kiểm soát thời gian 75 phút Test 5 RC', status: 'Chưa làm' },
  { day: 28, date: '28/09/2026', week: 'Tuần 4', skill: 'Tổng hợp', category: 'vocab', testNum: 5, activity: 'Ôn tập từ vựng Test 5', duration: 60, note: 'Luyện Flashcard & tổng kết tuần 4', status: 'Chưa làm' },

  // Tuần 5
  { day: 29, date: '29/09/2026', week: 'Tuần 5', skill: 'Reading', category: 'review', testNum: 5, activity: 'Chữa đề Reading Test 5', duration: 90, note: 'Phân tích kỹ thuật Skimming & Scanning', status: 'Chưa làm' },
  { day: 30, date: '30/09/2026', week: 'Tuần 5', skill: 'Reading', category: 'vocab', testNum: 5, activity: 'Học từ vựng Reading Test 5', duration: 60, note: 'Lọc collocations chuyên ngành', status: 'Chưa làm' },
  { day: 31, date: '01/10/2026', week: 'Tuần 5', skill: 'Listening', category: 'test', testNum: 6, activity: 'Làm đề Listening Test 6', duration: 45, note: 'Đo mốc cuối Chặng 2 (Target ≥ 650-700)', status: 'Chưa làm' },
  { day: 32, date: '02/10/2026', week: 'Tuần 5', skill: 'Listening', category: 'review', testNum: 6, activity: 'Chữa đề Listening Test 6', duration: 90, note: 'Chữa chi tiết toàn bộ Part 1-4', status: 'Chưa làm' },
  { day: 33, date: '03/10/2026', week: 'Tuần 5', skill: 'Listening', category: 'vocab', testNum: 6, activity: 'Học từ vựng Listening Test 6', duration: 60, note: 'Lưu từ vựng bẫy giọng Úc/Canada', status: 'Chưa làm' },
  { day: 34, date: '04/10/2026', week: 'Tuần 5', skill: 'Reading', category: 'test', testNum: 6, activity: 'Làm đề Reading Test 6', duration: 75, note: 'Đẩy nhanh tốc độ đọc Part 7', status: 'Chưa làm' },
  { day: 35, date: '05/10/2026', week: 'Tuần 5', skill: 'Tổng hợp', category: 'review', testNum: 6, activity: 'Chữa Test 6 & Tổng kết Chặng 2', duration: 90, note: 'Nghiệm thu năng lực cán mốc 650-700', status: 'Chưa làm' },

  // Tuần 6
  { day: 36, date: '06/10/2026', week: 'Tuần 6', skill: 'Full Test', category: 'test', testNum: 7, activity: 'Làm Full Test 7 (Áp lực 120 phút)', duration: 120, note: 'Bấm giờ chuẩn phòng thi 200 câu', status: 'Chưa làm' },
  { day: 37, date: '07/10/2026', week: 'Tuần 6', skill: 'Listening', category: 'review', testNum: 7, activity: 'Chữa chi tiết Test 7 Listening', duration: 90, note: 'Tối ưu bẫy câu suy luận khó Part 3-4', status: 'Chưa làm' },
  { day: 38, date: '08/10/2026', week: 'Tuần 6', skill: 'Reading', category: 'review', testNum: 7, activity: 'Chữa chi tiết Test 7 Reading', duration: 90, note: 'Chữa đoạn 3 bài đọc liên kết Part 7', status: 'Chưa làm' },
  { day: 39, date: '09/10/2026', week: 'Tuần 6', skill: 'Tổng hợp', category: 'vocab', testNum: 7, activity: 'Học từ vựng Test 7 & Lọc Sổ tay sai', duration: 60, note: 'Lưu toàn bộ cụm từ nâng cao', status: 'Chưa làm' },
  { day: 40, date: '10/10/2026', week: 'Tuần 6', skill: 'Full Test', category: 'test', testNum: 8, activity: 'Làm Full Test 8 (Áp lực 120 phút)', duration: 120, note: 'Đo lường độ ổn định điểm số', status: 'Chưa làm' },
  { day: 41, date: '11/10/2026', week: 'Tuần 6', skill: 'Listening', category: 'review', testNum: 8, activity: 'Chữa đề Listening Test 8', duration: 90, note: 'Tối đa hóa điểm số Listening (Target 400+)', status: 'Chưa làm' },
  { day: 42, date: '12/10/2026', week: 'Tuần 6', skill: 'Reading', category: 'review', testNum: 8, activity: 'Chữa đề Reading Test 8', duration: 90, note: 'Tối ưu hóa thời gian làm Part 5 chỉ 12 phút', status: 'Chưa làm' },

  // Tuần 7
  { day: 43, date: '13/10/2026', week: 'Tuần 7', skill: 'Tổng hợp', category: 'vocab', testNum: 8, activity: 'Học từ vựng Test 8 & Ôn Collocations', duration: 60, note: 'Củng cố kho từ vựng 800+', status: 'Chưa làm' },
  { day: 44, date: '14/10/2026', week: 'Tuần 7', skill: 'Full Test', category: 'test', testNum: 9, activity: 'Làm Full Test 9 (Tổng duyệt phòng thi)', duration: 120, note: 'Bấm giờ thi thật với tai nghe/loa ngoài', status: 'Chưa làm' },
  { day: 45, date: '15/10/2026', week: 'Tuần 7', skill: 'Listening', category: 'review', testNum: 9, activity: 'Chữa sâu Test 9 Listening', duration: 90, note: 'Triệt tiêu mọi lỗi sai bất cẩn', status: 'Chưa làm' },
  { day: 46, date: '16/10/2026', week: 'Tuần 7', skill: 'Reading', category: 'review', testNum: 9, activity: 'Chữa sâu Test 9 Reading', duration: 90, note: 'Hoàn thiện chiến thuật phân bổ thời gian', status: 'Chưa làm' },
  { day: 47, date: '17/10/2026', week: 'Tuần 7', skill: 'Tổng hợp', category: 'vocab', testNum: 9, activity: 'Ôn tập toàn diện Sổ tay bẫy & Sai lầm', duration: 75, note: 'Rà soát 100 câu hay sai nhất', status: 'Chưa làm' },
  { day: 48, date: '18/10/2026', week: 'Tuần 7', skill: 'Full Test', category: 'test', testNum: 10, activity: 'Làm Full Test 10 - Bứt Phá Về Đích 850+', duration: 120, note: 'Bài thi tổng kết toàn bộ lộ trình', status: 'Chưa làm' },
  { day: 49, date: '19/10/2026', week: 'Tuần 7', skill: 'Tổng hợp', category: 'summary', testNum: 10, activity: 'Tổng kết Điểm số & Chiến lược thi thật', duration: 60, note: 'Tổng kết 49 ngày & chuẩn bị ngày thi chính thức', status: 'Chưa làm' },
];

// ─── NGÀY BẮT ĐẦU TUYẾN THỰC CHIẾN LÀM & CHỮA ĐỀ ───
// Học viên đã hoàn thành Test 1 (Baseline). Hiện tại đang ở Test 2!
// Tuyến thực chiến Test 2 chính thức bắt đầu từ ngày 14/09/2026.
export const DEFAULT_ACTIVE_TEST_NUM = 2;
export const ACTIVE_TEST_BASE_DATE = new Date(2026, 8, 14); // 14/09/2026 (Hôm nay bắt đầu Test 2)
export const TEST_TRACK_START_DATE = new Date(2026, 8, 10); // Lùi về 10/09 để bao quát cả 4 buổi Test 1 đã làm

// ─── TUYẾN 1: LỊCH THỰC CHIẾN LÀM & CHỮA ĐỀ (32 BUỔI CHO 10 BỘ ĐỀ TOEIC) ───
export const STUDY4_TEST_TRACK = [
  // ── TEST 1: Đo lường đầu vào (ĐÃ HOÀN THÀNH ✓) ──
  { trackIndex: 1, testNum: 1, skill: 'Listening', category: 'test', activity: 'Làm đề Listening Test 1', duration: 45, note: '✓ Đã hoàn thành (Baseline đo lường đầu vào Part 1-4)', status: 'Hoàn thành', isCompleted: true },
  { trackIndex: 2, testNum: 1, skill: 'Listening', category: 'review', activity: 'Chữa đề Listening Test 1', duration: 90, note: '✓ Đã hoàn thành (Chữa chi tiết câu sai & kỹ thuật nghe Part 3-4)', status: 'Hoàn thành', isCompleted: true },
  { trackIndex: 3, testNum: 1, skill: 'Reading', category: 'test', activity: 'Làm đề Reading Test 1', duration: 75, note: '✓ Đã hoàn thành (Bấm giờ chuẩn áp lực phòng thi Part 5-7)', status: 'Hoàn thành', isCompleted: true },
  { trackIndex: 4, testNum: 1, skill: 'Reading', category: 'review', activity: 'Chữa đề Reading Test 1', duration: 90, note: '✓ Đã hoàn thành (Chữa chi tiết câu sai ngữ pháp Part 5-6 & Part 7)', status: 'Hoàn thành', isCompleted: true },

  // ── TEST 2: ĐANG HỌC THỰC CHIẾN (Bắt nhịp phản xạ Part 1-4 & Part 5-6 ⭐) ──
  { trackIndex: 5, testNum: 2, skill: 'Listening', category: 'test', activity: 'Làm đề Listening Test 2', duration: 45, note: 'Tăng tốc phản xạ bắt keyword Part 2 & Part 3 (100 câu)', status: 'Chưa làm', isCurrentTestStart: true },
  { trackIndex: 6, testNum: 2, skill: 'Listening', category: 'review', activity: 'Chữa đề Listening Test 2', duration: 90, note: 'Chữa chi tiết & ghi chú bẫy âm đồng âm Part 1-2', status: 'Chưa làm' },
  { trackIndex: 7, testNum: 2, skill: 'Reading', category: 'test', activity: 'Làm đề Reading Test 2', duration: 75, note: 'Kiểm soát thời gian Part 5 dưới 15 phút (100 câu)', status: 'Chưa làm' },
  { trackIndex: 8, testNum: 2, skill: 'Reading', category: 'review', activity: 'Chữa đề Reading Test 2', duration: 90, note: 'Chữa chi tiết Part 5-7 & rút kinh nghiệm bẫy từ loại', status: 'Chưa làm' },

  // ── TEST 3: Chinh phục mốc 500+ ──
  { trackIndex: 9, testNum: 3, skill: 'Listening', category: 'test', activity: 'Làm đề Listening Test 3', duration: 45, note: 'Bắt đầu bấm giờ Test 3 LC (100 câu)', status: 'Chưa làm' },
  { trackIndex: 10, testNum: 3, skill: 'Listening', category: 'review', activity: 'Chữa đề Listening Test 3', duration: 90, note: 'Chữa chi tiết và phân tích bẫy nghe Part 3', status: 'Chưa làm' },
  { trackIndex: 11, testNum: 3, skill: 'Reading', category: 'test', activity: 'Làm đề Reading Test 3', duration: 75, note: 'Bắt đầu bấm giờ Test 3 RC (100 câu)', status: 'Chưa làm' },
  { trackIndex: 12, testNum: 3, skill: 'Reading', category: 'review', activity: 'Chữa đề Reading Test 3', duration: 90, note: 'Chữa chi tiết Part 7 đoạn đơn và đoạn kép', status: 'Chưa làm' },

  // ── TEST 4: Kiểm soát bẫy đoạn đối thoại nhanh Part 3 ──
  { trackIndex: 13, testNum: 4, skill: 'Listening', category: 'test', activity: 'Làm đề Listening Test 4', duration: 45, note: 'Bấm giờ chuẩn áp lực Test 4 LC', status: 'Chưa làm' },
  { trackIndex: 14, testNum: 4, skill: 'Listening', category: 'review', activity: 'Chữa đề Listening Test 4', duration: 90, note: 'Chữa chi tiết đoạn đối thoại nhanh Part 3-4', status: 'Chưa làm' },
  { trackIndex: 15, testNum: 4, skill: 'Reading', category: 'test', activity: 'Làm đề Reading Test 4', duration: 75, note: 'Bấm giờ Test 4 RC (100 câu)', status: 'Chưa làm' },
  { trackIndex: 16, testNum: 4, skill: 'Reading', category: 'review', activity: 'Chữa đề Reading Test 4', duration: 90, note: 'Chữa chi tiết câu sai Part 5-7', status: 'Chưa làm' },

  // ── TEST 5: Tăng tốc độ đọc lướt Skimming Part 7 ──
  { trackIndex: 17, testNum: 5, skill: 'Listening', category: 'test', activity: 'Làm đề Listening Test 5', duration: 45, note: 'Bấm giờ chuẩn áp lực Test 5 LC', status: 'Chưa làm' },
  { trackIndex: 18, testNum: 5, skill: 'Listening', category: 'review', activity: 'Chữa đề Listening Test 5', duration: 90, note: 'Chữa bẫy Part 3-4 đoạn đối thoại nhanh', status: 'Chưa làm' },
  { trackIndex: 19, testNum: 5, skill: 'Reading', category: 'test', activity: 'Làm đề Reading Test 5', duration: 75, note: 'Kiểm soát thời gian 75 phút Test 5 RC', status: 'Chưa làm' },
  { trackIndex: 20, testNum: 5, skill: 'Reading', category: 'review', activity: 'Chữa đề Reading Test 5', duration: 90, note: 'Phân tích kỹ thuật Skimming & Scanning Part 7', status: 'Chưa làm' },

  // ── TEST 6: Cán mốc 650 - 700 điểm ──
  { trackIndex: 21, testNum: 6, skill: 'Listening', category: 'test', activity: 'Làm đề Listening Test 6', duration: 45, note: 'Đo mốc cuối Chặng 2 (Target ≥ 650-700)', status: 'Chưa làm' },
  { trackIndex: 22, testNum: 6, skill: 'Listening', category: 'review', activity: 'Chữa đề Listening Test 6', duration: 90, note: 'Chữa chi tiết toàn bộ Part 1-4', status: 'Chưa làm' },
  { trackIndex: 23, testNum: 6, skill: 'Reading', category: 'test', activity: 'Làm đề Reading Test 6', duration: 75, note: 'Đẩy nhanh tốc độ đọc Part 7', status: 'Chưa làm' },
  { trackIndex: 24, testNum: 6, skill: 'Reading', category: 'review', activity: 'Chữa đề Reading Test 6', duration: 90, note: 'Nghiệm thu năng lực cán mốc 650-700', status: 'Chưa làm' },

  // ── TEST 7: Full Test 120 phút áp lực phòng thi ──
  { trackIndex: 25, testNum: 7, skill: 'Full Test', category: 'test', activity: 'Làm Full Test 7 (Áp lực 120 phút)', duration: 120, note: 'Bấm giờ chuẩn phòng thi 200 câu', isFullTest: true, status: 'Chưa làm' },
  { trackIndex: 26, testNum: 7, skill: 'Listening & Reading', category: 'review', activity: 'Chữa chi tiết Test 7', duration: 90, note: 'Tối ưu bẫy câu suy luận khó Part 3-4 & Part 7', status: 'Chưa làm' },

  // ── TEST 8: Tối ưu thời gian làm Part 5 dưới 12 phút ──
  { trackIndex: 27, testNum: 8, skill: 'Full Test', category: 'test', activity: 'Làm Full Test 8 (Áp lực 120 phút)', duration: 120, note: 'Đo lường độ ổn định điểm số', isFullTest: true, status: 'Chưa làm' },
  { trackIndex: 28, testNum: 8, skill: 'Listening & Reading', category: 'review', activity: 'Chữa chi tiết Test 8', duration: 90, note: 'Tối ưu hóa thời gian làm Part 5 chỉ 12 phút', status: 'Chưa làm' },

  // ── TEST 9: Tổng duyệt phòng thi bấm giờ thật ──
  { trackIndex: 29, testNum: 9, skill: 'Full Test', category: 'test', activity: 'Làm Full Test 9 (Tổng duyệt phòng thi)', duration: 120, note: 'Bấm giờ thi thật với tai nghe/loa ngoài', isFullTest: true, status: 'Chưa làm' },
  { trackIndex: 30, testNum: 9, skill: 'Listening & Reading', category: 'review', activity: 'Chữa sâu Test 9', duration: 90, note: 'Triệt tiêu mọi lỗi sai bất cẩn', status: 'Chưa làm' },

  // ── TEST 10: Bứt phá về đích 800 - 850+ điểm ──
  { trackIndex: 31, testNum: 10, skill: 'Full Test', category: 'test', activity: 'Làm Full Test 10 - Bứt Phá Về Đích 850+', duration: 120, note: 'Bài thi tổng kết toàn bộ lộ trình', isFullTest: true, status: 'Chưa làm' },
  { trackIndex: 32, testNum: 10, skill: 'Tổng hợp', category: 'summary', activity: 'Tổng kết Điểm số & Chiến lược thi thật', duration: 60, note: 'Tổng kết 32 buổi luyện đề & chuẩn bị thi chính thức', status: 'Chưa làm' },
].map((s) => ({
  ...s,
  totalTrackSessions: 32,
}));

/**
 * Helper tính toán chính xác buổi làm đề theo ngày:
 * - Mặc định học viên đang ở Test 2 (Test 1 đã hoàn thành).
 * - Ngày 14/09/2026 chính thức là buổi Làm đề Listening Test 2 (Buổi 5/32).
 * - Các ngày tiếp theo nối tiếp nhau: Chữa Listening Test 2 -> Làm Reading Test 2 -> Chữa Reading Test 2 -> Test 3...
 */
export function getStudy4TestSession(dateObj, activeTestNum = 2) {
  if (!dateObj) return null;
  const d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  const baseDate = new Date(ACTIVE_TEST_BASE_DATE.getFullYear(), ACTIVE_TEST_BASE_DATE.getMonth(), ACTIVE_TEST_BASE_DATE.getDate());
  const diffDays = Math.round((d - baseDate) / (1000 * 60 * 60 * 24));

  // Vị trí xuất phát của Test hiện tại trong mảng STUDY4_TEST_TRACK (Test 2 là index 4)
  const activeTestFirstIdx = STUDY4_TEST_TRACK.findIndex((s) => s.testNum === (activeTestNum || 2));
  const baseIdx = activeTestFirstIdx >= 0 ? activeTestFirstIdx : 4;

  const targetIdx = baseIdx + diffDays;
  if (targetIdx < 0) {
    // Trước ngày bắt đầu đề hiện tại, hiển thị các buổi đề trước (nếu trong phạm vi)
    if (targetIdx >= -baseIdx) {
      return STUDY4_TEST_TRACK[baseIdx + diffDays] || null;
    }
    return null; // Ngày nền tảng trước khi bắt đầu tuyến đề
  }

  const cyclicIdx = targetIdx % STUDY4_TEST_TRACK.length;
  return STUDY4_TEST_TRACK[cyclicIdx] || STUDY4_TEST_TRACK[baseIdx];
}

// ─── TUYẾN 2: KHO TỪ VỰNG STUDY4 HỌC SONG SONG ĐỘC LẬP (75 BUỔI • 50 TỪ/NGÀY) ─
// Phân chia chuẩn xác: Mỗi buổi 50 từ, học hết 100% toàn bộ từ vựng đề thi, không bỏ sót bất kỳ từ nào.
const TEST_VOCAB_SPECS = [
  { testNum: 1, lisCount: 236, readCount: 50, lisNote: 'cốt lõi Part 1-4 Test 1', readNote: 'đọc hiểu Part 5-7 Test 1' },
  { testNum: 2, lisCount: 250, readCount: 100, lisNote: 'Part 1-4 Test 2', readNote: 'Part 5-7 Test 2' },
  { testNum: 3, lisCount: 250, readCount: 100, lisNote: 'Part 1-4 Test 3', readNote: 'Part 5-7 Test 3' },
  { testNum: 4, lisCount: 250, readCount: 100, lisNote: 'Part 1-4 Test 4', readNote: 'Part 5-7 Test 4' },
  { testNum: 5, lisCount: 250, readCount: 100, lisNote: 'Part 1-4 Test 5', readNote: 'Part 5-7 Test 5' },
  { testNum: 6, lisCount: 250, readCount: 100, lisNote: 'Part 1-4 Test 6', readNote: 'Part 5-7 Test 6' },
  { testNum: 7, lisCount: 200, readCount: 100, lisNote: 'Full Test 7', readNote: 'Full Test 7' },
  { testNum: 8, lisCount: 200, readCount: 100, lisNote: 'Full Test 8', readNote: 'Full Test 8' },
  { testNum: 9, lisCount: 200, readCount: 100, lisNote: 'Full Test 9', readNote: 'Full Test 9' },
  { testNum: 10, lisCount: 200, readCount: 100, lisNote: 'Full Test 10', readNote: 'Full Test 10' },
];

function buildStudy4VocabTrack() {
  const sessions = [];
  let trackIndex = 1;

  TEST_VOCAB_SPECS.forEach((cfg) => {
    const lisChunks = Math.ceil(cfg.lisCount / 50);
    for (let c = 1; c <= lisChunks; c++) {
      const start = (c - 1) * 50 + 1;
      const end = Math.min(c * 50, cfg.lisCount);
      const count = end - start + 1;
      sessions.push({
        trackIndex: trackIndex++,
        testNum: cfg.testNum,
        skill: 'Listening',
        category: 'vocab',
        chunkIndex: c,
        partFilter: 'day-' + c,
        startWord: start,
        endWord: end,
        wordCount: count,
        activity: `Từ vựng Test ${cfg.testNum} Listening (Buổi ${c}/${lisChunks}: Từ ${start} - ${end})`,
        duration: 45,
        note: `${count} từ vựng ${cfg.lisNote} (Từ ${start} - ${end})`,
        status: 'Chưa làm',
      });
    }

    const readChunks = Math.ceil(cfg.readCount / 50);
    for (let r = 1; r <= readChunks; r++) {
      const start = (r - 1) * 50 + 1;
      const end = Math.min(r * 50, cfg.readCount);
      const count = end - start + 1;
      sessions.push({
        trackIndex: trackIndex++,
        testNum: cfg.testNum,
        skill: 'Reading',
        category: 'vocab',
        chunkIndex: r,
        partFilter: 'day-' + r,
        startWord: start,
        endWord: end,
        wordCount: count,
        activity: `Từ vựng Test ${cfg.testNum} Reading (Buổi ${r}/${readChunks}: Từ ${start} - ${end})`,
        duration: 45,
        note: `${count} từ vựng ${cfg.readNote} (Từ ${start} - ${end})`,
        status: 'Chưa làm',
      });
    }

    const totalTestWords = cfg.lisCount + cfg.readCount;
    sessions.push({
      trackIndex: trackIndex++,
      testNum: cfg.testNum,
      skill: 'Tổng hợp',
      category: 'vocab',
      chunkIndex: 1,
      partFilter: 'review-all',
      startWord: 1,
      endWord: totalTestWords,
      wordCount: totalTestWords,
      activity: `Ôn tập & Spaced Repetition toàn bộ ${totalTestWords} từ Test ${cfg.testNum}`,
      duration: 60,
      note: `Tổng duyệt Flashcard & Trắc nghiệm toàn bộ ${totalTestWords} từ vựng Test ${cfg.testNum}`,
      status: 'Chưa làm',
    });
  });

  return sessions.map((s) => ({
    ...s,
    totalTrackSessions: sessions.length,
  }));
}

export const STUDY4_VOCAB_TRACK = buildStudy4VocabTrack();

// ─── BẢNG TỔNG HỢP 10 ĐỀ THI TOEIC THỰC CHIẾN (TEST 1 -> TEST 10) ────────────
export const STUDY4_EXAMS_OVERVIEW = [
  { testNum: 1, title: 'TOEIC Test 1', target: 'Đo lường đầu vào (Baseline) • Đã hoàn thành ✓', status: 'Hoàn thành', isCompleted: true, lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 286 },
  { testNum: 2, title: 'TOEIC Test 2', target: 'Bắt nhịp phản xạ Part 1-4 & Part 5-6 • Đang thực chiến ⭐', status: 'Đang làm', isCurrent: true, lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 350 },
  { testNum: 3, title: 'TOEIC Test 3', target: 'Chinh phục mốc 500+', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 350 },
  { testNum: 4, title: 'TOEIC Test 4', target: 'Kiểm soát bẫy đoạn đối thoại nhanh Part 3', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 350 },
  { testNum: 5, title: 'TOEIC Test 5', target: 'Tăng tốc độ đọc lướt Skimming Part 7', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 350 },
  { testNum: 6, title: 'TOEIC Test 6', target: 'Cán mốc 650 - 700 điểm', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 350 },
  { testNum: 7, title: 'TOEIC Test 7', target: 'Full Test 120 phút áp lực phòng thi', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 300, isFullTest: true },
  { testNum: 8, title: 'TOEIC Test 8', target: 'Tối ưu thời gian làm Part 5 dưới 12 phút', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 300, isFullTest: true },
  { testNum: 9, title: 'TOEIC Test 9', target: 'Tổng duyệt phòng thi bấm giờ thật', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 300, isFullTest: true },
  { testNum: 10, title: 'TOEIC Test 10', target: 'Bứt phá về đích 800 - 850+ điểm', status: 'Chưa làm', lisQuestions: 100, lisTime: 45, readQuestions: 100, readTime: 75, vocabCount: 300, isFullTest: true },
];

