// ─── DAILY DICTATION 3 MAIN TRACKS (Short Stories, Conversations, TOEIC Listening) ───
// Synchronized with official DailyDictation data and user's actual progress:
// - Short Stories: 289 lessons (1 - 289). Đã học xong 80, đang học tiến trình từ 81 (The lie), 82 (Hobbies), 83 (Christmas), 84 (Pretending)...
// - Conversations: 100 lessons (1 - 100). Đã học xong 67, đang học Bài 68 (Doctor's Appointment)...
// - TOEIC Listening: 600 lessons (Practice Tests 1 - 30, Conv 1-300 & Short Talk 1-300). Đang học Practice Test 4...

import {
  SHORT_STORIES_LESSONS,
  CONVERSATIONS_LESSONS,
  TOEIC_LISTENING_LESSONS
} from './dailyDictationFullData.js';

// Helper to generate Short Stories sections (15 sections)
const SHORT_STORIES_SECTIONS = [];
for (let i = 0; i < 14; i++) {
  const start = i * 20 + 1;
  const end = (i + 1) * 20;
  SHORT_STORIES_SECTIONS.push({
    id: `ss-sec-${i + 1}`,
    name: `Section ${i + 1} (${start} - ${end})`,
    range: `${start}-${end}`,
    start,
    end,
    status: end <= 80 ? '20 ⭐ Đã hoàn thành' : start === 81 ? 'Đang học (Bài 81 - 100)' : 'Chưa học'
  });
}
SHORT_STORIES_SECTIONS.push({
  id: 'ss-sec-15',
  name: 'Section 15 (281 - 289)',
  range: '281-289',
  start: 281,
  end: 289,
  status: 'Chưa học'
});

// Helper to generate Conversations sections (5 sections)
const CONVERSATIONS_SECTIONS = [
  { id: 'cv-sec-1', name: 'Section 1 (1 - 20)', range: '1-20', start: 1, end: 20, status: '20 ⭐ Đã hoàn thành' },
  { id: 'cv-sec-2', name: 'Section 2 (21 - 40)', range: '21-40', start: 21, end: 40, status: '20 ⭐ Đã hoàn thành' },
  { id: 'cv-sec-3', name: 'Section 3 (41 - 60)', range: '41-60', start: 41, end: 60, status: '20 ⭐ Đã hoàn thành' },
  { id: 'cv-sec-4', name: 'Section 4 (61 - 80)', range: '61-80', start: 61, end: 80, status: 'Đang học (Đã xong 61-67, Bài 68 ➔ 80)' },
  { id: 'cv-sec-5', name: 'Section 5 (81 - 100)', range: '81-100', start: 81, end: 100, status: 'Chưa học' },
];

// Helper to generate TOEIC sections (Practice Tests 1 - 30)
const TOEIC_SECTIONS = [];
for (let t = 1; t <= 30; t++) {
  const start = (t - 1) * 10 + 1;
  const end = t * 10;
  TOEIC_SECTIONS.push({
    id: `tc-test-${t}`,
    name: `Practice Test ${t} (${start} - ${end})`,
    range: `${start}-${end}`,
    testNum: t,
    start,
    end,
    status: t <= 3 ? '20 ⭐ Đã hoàn thành' : t === 4 ? 'Đang học (Conv 38-40 & Short Talk 31-40)' : 'Chưa học'
  });
}

export const DAILY_DICTATION_3_TRACKS = {
  user: 'Học viên',
  totalCompleted: 184,
  categories: [
    {
      id: 'short-stories',
      title: 'Short Stories',
      levelText: 'Levels: A1-C1',
      lessonCountText: '289 lessons',
      badge: 'Levels: A1-C1 • 289 lessons',
      icon: 'fa-book-bookmark',
      color: 'from-amber-500 to-orange-600',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=240&auto=format&fit=crop&q=80',
      coverBadge: 'STORIES',
      url: 'https://dailydictation.com/exercises/short-stories',
      desc: '289 bài truyện ngắn theo cấp độ A1 - C1, luyện tai bắt từ vựng phong phú',
      sections: SHORT_STORIES_SECTIONS,
      lessons: SHORT_STORIES_LESSONS,
      sampleLessons: SHORT_STORIES_LESSONS
    },
    {
      id: 'conversations',
      title: 'Conversations',
      levelText: 'Levels: A1-B1',
      lessonCountText: '100 lessons',
      badge: 'Levels: A1-B1 • 100 lessons',
      icon: 'fa-comments',
      color: 'from-blue-600 to-indigo-600',
      coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=240&auto=format&fit=crop&q=80',
      coverBadge: 'CONVERSATIONS',
      url: 'https://dailydictation.com/exercises/english-conversations',
      desc: '100 bài hội thoại giao tiếp đời sống hàng ngày, luyện phản xạ nối âm và ngữ điệu tự nhiên',
      sections: CONVERSATIONS_SECTIONS,
      lessons: CONVERSATIONS_LESSONS,
      sampleLessons: CONVERSATIONS_LESSONS
    },
    {
      id: 'toeic-listening',
      title: 'TOEIC Listening',
      levelText: 'Levels: A2-C1',
      lessonCountText: '600 lessons',
      badge: 'Levels: A2-C1 • 600 lessons',
      icon: 'fa-graduation-cap',
      color: 'from-emerald-600 to-teal-700',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=240&auto=format&fit=crop&q=80',
      coverBadge: 'TOEIC',
      url: 'https://dailydictation.com/exercises/toeic',
      desc: '600 bài nghe chép chính tả TOEIC (300 Conversations + 300 Short Talks) chuẩn format đề thi thật',
      sections: TOEIC_SECTIONS,
      lessons: TOEIC_LISTENING_LESSONS,
      sampleLessons: TOEIC_LISTENING_LESSONS
    },
    {
      id: 'ielts-listening',
      title: 'IELTS Listening',
      levelText: 'Levels: B1-C1',
      lessonCountText: '360 lessons',
      badge: 'Levels: B1-C1 • 360 lessons',
      icon: 'fa-earth-americas',
      color: 'from-purple-600 to-indigo-700',
      coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=240&auto=format&fit=crop&q=80',
      coverBadge: 'IELTS',
      url: 'https://dailydictation.com/exercises/ielts',
      desc: '360 bài luyện nghe chép chính tả IELTS theo 4 Section học thuật & đời sống quốc tế',
      sections: [
        { id: 'ielts-sec-1', name: 'Section 1: Daily Social Context', range: '1-90', status: 'Luyện nghe thông tin cá nhân & form' },
        { id: 'ielts-sec-2', name: 'Section 2: Public Facilities & Monologue', range: '91-180', status: 'Luyện nghe hướng dẫn & bản đồ' },
        { id: 'ielts-sec-3', name: 'Section 3: Academic Discussion', range: '181-270', status: 'Luyện nghe thảo luận nhóm đại học' },
        { id: 'ielts-sec-4', name: 'Section 4: University Lecture', range: '271-360', status: 'Luyện nghe bài giảng chuyên ngành' }
      ],
      sampleLessons: [
        { id: 'ielts-01', num: 1, title: 'Student Accommodation Registration', parts: 10, level: 'B1', status: 'todo' },
        { id: 'ielts-02', num: 2, title: 'City Library Membership Tour', parts: 10, level: 'B1', status: 'todo' },
        { id: 'ielts-03', num: 3, title: 'Marine Biology Research Project', parts: 12, level: 'B2', status: 'todo' },
        { id: 'ielts-04', num: 4, title: 'History of Urban Architecture', parts: 14, level: 'C1', status: 'todo' }
      ]
    }
  ]
};
