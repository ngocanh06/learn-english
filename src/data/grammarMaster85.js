import React from 'react';

// ─── TẬP 1 (TRANG 1): 100 BÀI NGỮ PHÁP TỔNG HỢP ───────────────────────────
export const GRAMMAR_PAGE1_CATALOG = [
  { id: '1', title: 'Articles (A, An, The)', subtitle: 'Mạo từ (A, An, The)', category: 'Mạo từ' },
  { id: '2', title: 'Am, is, are', subtitle: 'Động từ to be ở hiện tại', category: 'Động từ To Be' },
  { id: '3', title: 'Were, Was', subtitle: 'Động từ to be ở quá khứ', category: 'Động từ To Be' },
  { id: '4', title: 'There is/are, There was/were', subtitle: 'Cấu trúc tồn tại Có... / Đã có...', category: 'Cấu trúc câu' },
  { id: '5', title: 'Pseudo-subject "It/There"', subtitle: 'Chủ ngữ giả "It/There"', category: 'Chủ ngữ giả' },
  { id: '6', title: 'Nouns', subtitle: 'Tổng quan danh từ trong tiếng Anh', category: 'Danh từ' },
  { id: '7', title: 'Plural Nouns', subtitle: 'Quy tắc chuyển danh từ số nhiều', category: 'Danh từ' },
  { id: '8', title: 'Gerunds', subtitle: 'Danh động từ (V-ing) & vị trí đứng', category: 'Danh động từ' },
  { id: '9', title: 'Pronouns', subtitle: 'Đại từ nhân xưng, tân ngữ & sở hữu', category: 'Đại từ' },
  { id: '10', title: 'Verbs', subtitle: 'Tổng quan động từ & các dạng', category: 'Động từ' },
  { id: '11', title: 'Infinitives', subtitle: 'Động từ nguyên mẫu To-V & V-bare', category: 'Động từ nguyên mẫu' },
  { id: '12', title: 'Modal Verbs', subtitle: 'Động từ khuyết thiếu cơ bản', category: 'Động từ khuyết thiếu' },
  { id: '13', title: 'Commonly used prepositions In, At, On', subtitle: 'Giới từ hay dùng In, At, On', category: 'Giới từ' },
  { id: '14', title: 'Imperative Sentences', subtitle: 'Câu mệnh lệnh & yêu cầu', category: 'Câu mệnh lệnh' },
  { id: '15', title: 'Question Tag', subtitle: 'Quy tắc thành lập câu hỏi đuôi', category: 'Câu hỏi đuôi' },
  { id: '16', title: 'Simple present tense with the verb to be', subtitle: 'Thì hiện tại đơn với động từ to be', category: 'Các Thì' },
  { id: '17', title: 'Simple present tense with regular verbs', subtitle: 'Thì hiện tại đơn với động từ thường', category: 'Các Thì' },
  { id: '18', title: 'Present continuous', subtitle: 'Thì hiện tại tiếp diễn', category: 'Các Thì' },
  { id: '19', title: 'Compare the present simple and the present continuous', subtitle: 'Phân biệt Hiện tại đơn & Tiếp diễn', category: 'So sánh thì' },
  { id: '20', title: 'Simple past', subtitle: 'Thì quá khứ đơn', category: 'Các Thì' },
  { id: '21', title: 'Past continuous', subtitle: 'Thì quá khứ tiếp diễn', category: 'Các Thì' },
  { id: '22', title: 'Compare the past simple and past continuous', subtitle: 'Phân biệt Quá khứ đơn & Quá khứ tiếp diễn', category: 'So sánh thì' },
  { id: '23', title: 'Simple future tense', subtitle: 'Thì tương lai đơn (Will + V)', category: 'Các Thì' },
  { id: '24', title: 'Future expressions', subtitle: 'Các cách diễn đạt tương lai (Be going to...)', category: 'Các Thì' },
  { id: '25', title: 'Emphatic words', subtitle: 'Từ nhấn mạnh trong câu', category: 'Cấu trúc câu' },
  { id: '26', title: 'Auxiliary verbs', subtitle: 'Trợ động từ Do/Does/Did/Have/Be', category: 'Trợ động từ' },
  { id: '27', title: 'Subject and Verb Agreement', subtitle: 'Quy tắc hòa hợp Chủ ngữ & Động từ', category: 'Hòa hợp S-V' },
  { id: '28', title: 'Regular and Irregular Verbs', subtitle: 'Động từ có quy tắc và bất quy tắc', category: 'Động từ' },
  { id: '29', title: 'Adjectives', subtitle: 'Tính từ & vị trí trong câu', category: 'Tính từ' },
  { id: '30', title: 'Adverbs', subtitle: 'Trạng từ & cách thành lập', category: 'Trạng từ' },
  { id: '31', title: 'Adjectives and Adverbs', subtitle: 'Phân biệt Tính từ và Trạng từ', category: 'Tính & Trạng từ' },
  { id: '32', title: 'Interrogative Pronouns', subtitle: 'Đại từ nghi vấn (Who, Whom, Whose, Which...)', category: 'Đại từ nghi vấn' },
  { id: '33', title: 'Relative Pronoun', subtitle: 'Đại từ quan hệ Who, Whom, Which, That', category: 'Mệnh đề quan hệ' },
  { id: '34', title: 'Adjectives as Nouns', subtitle: 'Tính từ dùng như danh từ (The + Adj)', category: 'Tính từ đặc biệt' },
  { id: '35', title: 'Sentence Patterns', subtitle: '5 Mẫu câu cơ bản trong tiếng Anh', category: 'Cấu trúc câu' },
  { id: '36', title: 'Reported Speech', subtitle: 'Câu gián tiếp & quy tắc lùi thì', category: 'Câu gián tiếp' },
  { id: '37', title: 'Conditional Sentences', subtitle: 'Tổng quan câu điều kiện If', category: 'Câu điều kiện' },
  { id: '38', title: 'Passive Voice', subtitle: 'Tổng quan câu bị động', category: 'Câu bị động' },
  { id: '39', title: 'Narration', subtitle: 'Tường thuật lại lời nói & sự việc', category: 'Tường thuật' },
  { id: '40', title: 'Mixed Comparisons', subtitle: 'So sánh hỗn hợp & tổng hợp', category: 'So sánh' },
  { id: '41', title: 'Relative Clauses', subtitle: 'Mệnh đề quan hệ xác định & không xác định', category: 'Mệnh đề quan hệ' },
  { id: '42', title: 'Conjunctions', subtitle: 'Liên từ đẳng lập & phụ thuộc', category: 'Liên từ' },
  { id: '43', title: 'Phrasal verbs', subtitle: 'Cụm động từ thông dụng', category: 'Cụm động từ' },
  { id: '44', title: 'Participle Phrases', subtitle: 'Cụm phân từ hiện tại (V-ing) & quá khứ (V-ed)', category: 'Phân từ' },
  { id: '45', title: 'Measures', subtitle: 'Từ chỉ số lượng & đo lường', category: 'Đo lường' },
  { id: '46', title: 'Verbal', subtitle: 'Các dạng biến đổi của động từ', category: 'Dạng động từ' },
  { id: '47', title: 'Present simple', subtitle: 'Thì hiện tại đơn (Tổng kết)', category: 'Các Thì' },
  { id: '48', title: 'Present continuous', subtitle: 'Thì hiện tại tiếp diễn (Tổng kết)', category: 'Các Thì' },
  { id: '49', title: 'Present perfect', subtitle: 'Thì hiện tại hoàn thành (Have/Has + V3)', category: 'Các Thì' },
  { id: '50', title: 'Present perfect continuous', subtitle: 'Thì hiện tại hoàn thành tiếp diễn', category: 'Các Thì' },
  { id: '51', title: 'Simple past', subtitle: 'Thì quá khứ đơn (Tổng kết)', category: 'Các Thì' },
  { id: '52', title: 'Past continuous', subtitle: 'Thì quá khứ tiếp diễn (Tổng kết)', category: 'Các Thì' },
  { id: '53', title: 'Past perfect', subtitle: 'Thì quá khứ hoàn thành (Had + V3)', category: 'Các Thì' },
  { id: '54', title: 'Past perfect continuous', subtitle: 'Thì quá khứ hoàn thành tiếp diễn', category: 'Các Thì' },
  { id: '55', title: 'Simple future', subtitle: 'Thì tương lai đơn (Tổng kết)', category: 'Các Thì' },
  { id: '56', title: 'Future continuous', subtitle: 'Thì tương lai tiếp diễn (Will be + V-ing)', category: 'Các Thì' },
  { id: '57', title: 'Future perfect', subtitle: 'Thì tương lai hoàn thành (Will have + V3)', category: 'Các Thì' },
  { id: '58', title: 'Future perfect continuous', subtitle: 'Thì tương lai hoàn thành tiếp diễn', category: 'Các Thì' },
  { id: '59', title: 'Passive Voice (Grammar Structure)', subtitle: 'Cấu trúc câu bị động chuẩn 12 thì', category: 'Câu bị động' },
  { id: '60', title: 'Passive Voice (Special Cases)', subtitle: 'Các trường hợp câu bị động đặc biệt', category: 'Câu bị động' },
  { id: '61', title: 'Wishes Type 1 (Future)', subtitle: 'Câu ước loại 1 (Tương lai)', category: 'Câu điều ước' },
  { id: '62', title: 'Wishes Type 2 (Present)', subtitle: 'Câu ước loại 2 (Hiện tại)', category: 'Câu điều ước' },
  { id: '63', title: 'Wishes Type 3 (Past)', subtitle: 'Câu ước loại 3 (Quá khứ / Nuối tiếc)', category: 'Câu điều ước' },
  { id: '64', title: 'Indirect sentence', subtitle: 'Câu gián tiếp (câu hỏi, câu cầu khiến)', category: 'Câu gián tiếp' },
  { id: '65', title: 'Conditional sentence Type 1', subtitle: 'Câu điều kiện loại 1 (Có thật ở hiện tại)', category: 'Câu điều kiện' },
  { id: '66', title: 'Conditional sentence Type 2', subtitle: 'Câu điều kiện loại 2 (Giả định hiện tại)', category: 'Câu điều kiện' },
  { id: '67', title: 'Conditional sentence Type 3', subtitle: 'Câu điều kiện loại 3 (Giả định quá khứ)', category: 'Câu điều kiện' },
  { id: '68', title: 'Conditional sentences in inverted form', subtitle: 'Đảo ngữ câu điều kiện loại 1, 2, 3', category: 'Đảo ngữ điều kiện' },
  { id: '69', title: 'Special form of conditional sentences', subtitle: 'Câu điều kiện dạng đặc biệt (Unless, In case...)', category: 'Câu điều kiện đặc biệt' },
  { id: '70', title: 'Compare equals, compare multiples', subtitle: 'So sánh bằng & so sánh bội số', category: 'So sánh' },
  { id: '71', title: 'Compare more', subtitle: 'Cấu trúc so sánh hơn (Tính từ ngắn/dài)', category: 'So sánh' },
  { id: '72', title: 'Comparative superlative', subtitle: 'Cấu trúc so sánh hơn nhất', category: 'So sánh' },
  { id: '73', title: 'Double comparison', subtitle: 'So sánh kép (Càng... Càng...)', category: 'So sánh' },
  { id: '74', title: 'Compare many times more', subtitle: 'So sánh hơn gấp nhiều lần', category: 'So sánh' },
  { id: '75', title: 'Comparison table of irregular adjectives and adverbs', subtitle: 'Bảng so sánh tính/trạng từ bất quy tắc', category: 'So sánh' },
  { id: '76', title: 'Relative Pronouns, Relative Adverbs', subtitle: 'Đại từ & Trạng từ quan hệ (Where, When, Why)', category: 'Mệnh đề quan hệ' },
  { id: '77', title: 'Reducing Clauses, Omitting Relative Pronouns', subtitle: 'Rút gọn mệnh đề & lược bỏ đại từ quan hệ', category: 'Mệnh đề quan hệ' },
  { id: '78', title: 'Exclamations', subtitle: 'Cấu trúc câu cảm thán (What/How)', category: 'Câu cảm thán' },
  { id: '79', title: 'Tag Questions (Formula)', subtitle: 'Công thức câu hỏi đuôi cơ bản', category: 'Câu hỏi đuôi' },
  { id: '80', title: 'Tag Questions (Special Forms)', subtitle: 'Các dạng câu hỏi đuôi đặc biệt', category: 'Câu hỏi đuôi' },
  { id: '81', title: 'Anagram sentence', subtitle: 'Cấu trúc câu đảo ngữ tổng hợp', category: 'Đảo ngữ' },
  { id: '82', title: 'Imperative Sentences', subtitle: 'Câu mệnh lệnh khẳng định & phủ định', category: 'Câu mệnh lệnh' },
  { id: '83', title: 'Emphatic sentence', subtitle: 'Câu nhấn mạnh (It is... that)', category: 'Câu nhấn mạnh' },
  { id: '84', title: 'Rewriting Sentence Formula (Part 1)', subtitle: 'Công thức viết lại câu (Phần 1 - So sánh, Thì)', category: 'Viết lại câu' },
  { id: '85', title: 'Rewriting Sentence Formula (Part 2)', subtitle: 'Công thức viết lại câu (Phần 2 - Too, Enough, So)', category: 'Viết lại câu' },
  { id: '86', title: 'Rewriting Sentence Formula (Part 3)', subtitle: 'Công thức viết lại câu (Phần 3 - Because, Although)', category: 'Viết lại câu' },
  { id: '87', title: 'Rewriting Sentence Formula (Part 4)', subtitle: 'Công thức viết lại câu (Phần 4 - Điều kiện, Bị động)', category: 'Viết lại câu' },
  { id: '88', title: 'Idioms and proverbs', subtitle: 'Thành ngữ & tục ngữ tiếng Anh thông dụng', category: 'Thành ngữ' },
  { id: '89', title: 'Sentence agrees', subtitle: 'Câu đồng tình (So, Too, Either, Neither)', category: 'Cấu trúc câu' },
  { id: '90', title: 'Table of irregular verbs', subtitle: 'Bảng 360 động từ bất quy tắc tra cứu nhanh', category: 'Động từ' },
  { id: '91', title: 'Types of nouns', subtitle: 'Phân loại các loại danh từ trong tiếng Anh', category: 'Danh từ' },
  { id: '92', title: 'Countable and uncountable nouns', subtitle: 'Danh từ đếm được & không đếm được', category: 'Danh từ' },
  { id: '93', title: 'Singular and plural nouns', subtitle: 'Quy tắc chuyển danh từ số ít sang số nhiều', category: 'Danh từ' },
  { id: '94', title: 'Synthesis of irregular nouns', subtitle: 'Tổng hợp danh từ số nhiều bất quy tắc', category: 'Danh từ' },
  { id: '95', title: 'Modal verbs', subtitle: 'Động từ khuyết thiếu nâng cao & suy đoán', category: 'Động từ khuyết thiếu' },
  { id: '96', title: 'Intransitive verbs and transitive verbs', subtitle: 'Nội động từ và ngoại động từ', category: 'Động từ' },
  { id: '97', title: 'Adjective position', subtitle: 'Vị trí của tính từ trong câu', category: 'Tính từ' },
  { id: '98', title: 'Adjectives ending in -ing and -ed', subtitle: 'Phân biệt tính từ đuôi -ing và -ed', category: 'Tính từ' },
  { id: '99', title: 'Compound adjectives', subtitle: 'Cấu tạo tính từ ghép trong tiếng Anh', category: 'Tính từ' },
  { id: '100', title: 'Adjective order structure', subtitle: 'Cấu trúc trật tự tính từ (OpSASCOMP)', category: 'Tính từ' },
];

// ─── TẬP 2 (TRANG 2): 15 BÀI NGỮ PHÁP MỞ RỘNG & PHÁT ÂM ────────────────────
export const GRAMMAR_PAGE2_CATALOG = [
  { id: 'p2-1', title: 'Common adjectives', subtitle: 'Các tính từ thông dụng nhất', category: 'Tính từ mở rộng' },
  { id: 'p2-2', title: 'Adverb position', subtitle: 'Vị trí của trạng từ trong câu', category: 'Trạng từ mở rộng' },
  { id: 'p2-3', title: 'Types of adverbs', subtitle: 'Các loại trạng từ trong tiếng Anh', category: 'Trạng từ mở rộng' },
  { id: 'p2-4', title: 'Classification of adverbs', subtitle: 'Phân loại chi tiết trạng từ', category: 'Trạng từ mở rộng' },
  { id: 'p2-5', title: 'Common adverbs', subtitle: 'Các trạng từ thường gặp nhất', category: 'Trạng từ mở rộng' },
  { id: 'p2-6', title: 'Definition, usage of prepositions', subtitle: 'Định nghĩa & cách dùng giới từ', category: 'Giới từ mở rộng' },
  { id: 'p2-7', title: 'Types of prepositions', subtitle: 'Phân loại giới từ (Thời gian, Nơi chốn)', category: 'Giới từ mở rộng' },
  { id: 'p2-8', title: 'Accent rules', subtitle: 'Quy tắc đánh trọng âm từ 2-3 âm tiết', category: 'Quy tắc trọng âm' },
  { id: 'p2-9', title: 'How to pronounce "s/es"', subtitle: 'Quy tắc phát âm đuôi "s/es" (/s/, /z/, /iz/)', category: 'Phát âm đuôi' },
  { id: 'p2-10', title: 'How to pronounce "ed"', subtitle: 'Quy tắc phát âm đuôi "ed" (/t/, /d/, /id/)', category: 'Phát âm đuôi' },
  { id: 'p2-11', title: 'Position of Adjective - Noun - Verb - Adverb', subtitle: 'Vị trí của Tính từ - Danh từ - Động từ - Trạng từ', category: 'Vị trí từ loại' },
  { id: 'p2-12', title: 'Collocations in TOEIC', subtitle: 'Các cụm từ cố định hay gặp trong đề thi TOEIC', category: 'Cụm từ cố định' },
  { id: 'p2-13', title: 'Common Phrasal Verbs', subtitle: 'Tổng hợp cụm động từ thường gặp trong giao tiếp', category: 'Cụm động từ' },
  { id: 'p2-14', title: 'Advanced Conjunctions', subtitle: 'Liên từ nâng cao (Notwithstanding, Whereas...)', category: 'Liên từ mở rộng' },
  { id: 'p2-15', title: 'Inversion with Negative Adverbs', subtitle: 'Đảo ngữ với phó từ phủ định (Never, Hardly...)', category: 'Đảo ngữ nâng cao' },
];

export function buildFallbackLesson(item) {
  const num = item.id.replace('p2-', '');
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    category: item.category,
    content: (
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
          <h3 className="font-extrabold text-blue-600 dark:text-blue-400 text-base mb-1">
            📚 Lý thuyết trọng tâm: {item.title}
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.subtitle}. Chủ điểm ngữ pháp này xuất hiện thường xuyên trong các bài thi TOEIC và giao tiếp hàng ngày.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <i className="fa-solid fa-lightbulb text-amber-500" />
            Ví dụ minh họa & Cấu trúc:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 block mb-1">Example 1:</span>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">"She reviewed the {item.title.toLowerCase()} carefully."</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 italic">→ Cô ấy đã ôn tập chủ điểm này một cách cẩn thận.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Example 2:</span>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">"Understanding {item.title.toLowerCase()} helps boost your score."</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 italic">→ Nắm vững phần này giúp bạn nâng cao điểm số rõ rệt.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    questions: [
      {
        question: `Chọn phương án sử dụng chính xác liên quan đến "${item.title}":`,
        options: [
          `Áp dụng đúng cấu trúc ngữ pháp chuẩn của ${item.title}.`,
          `Sử dụng sai vị trí từ loại trong câu.`,
          `Bỏ qua quy tắc hòa hợp ngữ pháp.`,
          `Không thay đổi dạng từ khi cần thiết.`
        ],
        correct: 0,
        explanation: `Phương án A là chính xác theo cấu trúc của bài học ${item.title}.`
      },
      {
        question: `Mục đích chính của chủ điểm "${item.title}" trong tiếng Anh là gì?`,
        options: [
          `Tạo câu hoàn chỉnh, đúng ngữ pháp và diễn đạt tự nhiên.`,
          `Chỉ dùng trong văn viết trang trọng, không dùng giao tiếp.`,
          `Thay thế hoàn toàn cho danh từ và động từ.`,
          `Không có quy tắc cụ thể, dùng tùy ý.`
        ],
        correct: 0,
        explanation: `Chủ điểm ${item.title} giúp câu văn chính xác, mạch lạc và tự nhiên.`
      }
    ]
  };
}
