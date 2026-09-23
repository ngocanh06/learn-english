// ─── AI ASSISTANT INTELLIGENCE ENGINE ───
// Context-aware grammar explanations, vocabulary analysis, and interactive learning mentor.

export const GRAMMAR_KNOWLEDGE_BASE = {
  articles: {
    keywords: ['mạo từ', 'article', 'a an', 'a/an', 'the', 'an hour', 'university'],
    summary: 'Mạo từ (Articles) trong tiếng Anh gồm A, An (bất định) và The (xác định).',
    details: `📌 **QUY TẮC MẠO TỪ CỐT LÕI (A, AN, THE):**

1. **A / AN (Mạo từ bất định):**
   • Dùng cho danh từ số ít đếm được khi nhắc đến lần đầu tiên hoặc mang nghĩa "một" chung chung.
   • **Quy tắc vàng:** Dùng **AN** khi từ đứng sau bắt đầu bằng **nguyên âm phát âm** (u, e, o, a, i - mẹo nhớ: *UỂ OẢI*).
   • *Ví dụ:* **an apple**, **an umbrella**, **an engineer**.
   • **Bẫy thi cử cần nhớ:**
     - **an hour** (vì chữ *h* câm ➔ phát âm là /ˈaʊ.ər/).
     - **a university**, **a uniform** (vì chữ *u* phát âm là phụ âm /j/ chứ không phải nguyên âm).

2. **THE (Mạo từ xác định):**
   • Dùng khi người nghe và người nói đều biết rõ đối tượng đang nói đến, hoặc vật là duy nhất (*the sun, the moon, the earth*).
   • Dùng trước so sánh nhất: *the best, the most beautiful*.
   • Dùng trước nhạc cụ: *play the piano, play the guitar*.
   • Dùng trước tên sông, đại dương, dãy núi: *the Nile, the Pacific, the Alps*.
   • **Phát âm:** Đọc là **/ðiː/** (Thi) khi đứng trước nguyên âm: *the apple, the end*.

3. **KHI NÀO KHÔNG DÙNG MẠO TỪ (ZERO ARTICLE):**
   • Trước danh từ số nhiều hoặc không đếm được mang nghĩa chung: *Life is beautiful*, *Books are friends*.
   • Trước bữa ăn: *have breakfast, have lunch, have dinner*.
   • Trước tên môn học, ngôn ngữ, thể thao: *English, math, play football*.
   • **Bẫy phân biệt:**
     - *Go to school / hospital / church:* Đi học, nằm viện, đi lễ (đúng mục đích chính).
     - *Go to the school / the hospital:* Đến đó với mục đích khác (thăm người, họp phụ huynh).`,
  },
  tobe: {
    keywords: ['to be', 'am is are', 'was were', 'động từ tobe', 'chia tobe'],
    summary: 'Động từ To Be có nghĩa là: Thì, Là, Ở, hoặc Bị.',
    details: `📌 **QUY TẮC ĐỘNG TỪ TO BE:**

1. **Hiện tại đơn (Am / Is / Are):**
   • **I** ➔ **am** (*I am a student*).
   • **He / She / It / Danh từ số ít** ➔ **is** (*She is a doctor, He is tall*).
   • **You / We / They / Danh từ số nhiều** ➔ **are** (*We are ready, They are friends*).

2. **Quá khứ đơn (Was / Were):**
   • **I / He / She / It / Danh từ số ít** ➔ **was**.
   • **You / We / They / Danh từ số nhiều** ➔ **were**.

3. **Vị trí của To Be trong câu:**
   • Đứng trước **Tính từ**: *He is very handsome.*
   • Đứng trước **Danh từ**: *Ms Hoa is a teacher.*
   • Đứng trước **Cụm giới từ** (chỉ nơi chốn): *The cat is on the table.*
   • Trong thể **Bị động (Passive Voice)**: *To be + V3/ed* (*The car was repaired yesterday*).`,
  },
  tenses: {
    keywords: ['thì', 'tense', 'hiện tại đơn', 'quá khứ', 'tương lai', 'present perfect', 'hiện tại hoàn thành'],
    summary: '12 thì cơ bản trong tiếng Anh chia theo 3 mốc: Quá khứ, Hiện tại, Tương lai.',
    details: `📌 **CÁC THÌ TRỌNG TÂM TRONG GIAO TIẾP & THI TOEIC:**

1. **Hiện tại đơn (Present Simple):**
   • Công thức: **S + V(s/es)** | Phủ định: **do/does not + V-bare**.
   • Dùng cho: Thói quen, sự thật hiển nhiên, lịch trình cố định.
   • Dấu hiệu: *always, usually, often, every day, on Mondays*.

2. **Hiện tại tiếp diễn (Present Continuous):**
   • Công thức: **S + am/is/are + V-ing**.
   • Dùng cho: Hành động đang xảy ra tại thời điểm nói hoặc kế hoạch chắc chắn.
   • Dấu hiệu: *now, right now, at the moment, look!, listen!*.

3. **Hiện tại hoàn thành (Present Perfect):**
   • Công thức: **S + have/has + V3/ed**.
   • Dùng cho: Hành động xảy ra trong quá khứ kéo dài đến hiện tại, hoặc trải nghiệm.
   • Dấu hiệu: *since, for, already, yet, just, ever, never, so far, recently*.

4. **Quá khứ đơn (Past Simple):**
   • Công thức: **S + V2/ed** | Phủ định: **did not + V-bare**.
   • Dùng cho: Hành động đã chấm dứt hoàn toàn trong quá khứ có thời gian xác định.
   • Dấu hiệu: *yesterday, last night/week, ago, in 2020*.`,
  },
  passive: {
    keywords: ['bị động', 'passive', 'passive voice', 'bị hoặc được'],
    summary: 'Câu bị động nhấn mạnh vào đối tượng chịu tác động của hành động.',
    details: `📌 **CÂU BỊ ĐỘNG (PASSIVE VOICE):**

1. **Cấu trúc tổng quát:**
   **S (Tân ngữ cũ) + BE (chia theo thì) + V3/ed + (by + O)**

2. **Bảng biến đổi nhanh theo thì:**
   • Hiện tại đơn: **am / is / are + V3/ed**
     *Ví dụ:* English is spoken all over the world.
   • Quá khứ đơn: **was / were + V3/ed**
     *Ví dụ:* The house was built in 1995.
   • Hiện tại hoàn thành: **have / has + been + V3/ed**
     *Ví dụ:* The report has been completed.
   • Động từ khuyết thiếu (Modal verbs): **can / must / will + be + V3/ed**
     *Ví dụ:* This rule must be followed.

3. **Mẹo làm bài thi:**
   • Nếu chủ ngữ là vật và phía sau không có tân ngữ, khả năng 90% là câu bị động!`,
  },
  toeic_tips: {
    keywords: ['toeic', 'mẹo thi', 'part 5', 'part 7', 'luyện thi', 'study4'],
    summary: 'Chiến thuật và mẹo làm bài thi TOEIC Listening & Reading.',
    details: `📌 **CHIẾN THUẬT NÂNG BAND ĐIỂM TOEIC THỰC CHIẾN:**

1. **Part 5 (Ngữ pháp & Từ vựng - 30 câu):**
   • Nhìn 4 đáp án trước:
     - Nếu cùng gốc từ khác đuôi (word family): Đây là câu từ loại (danh/tính/động/trạng). Hãy xét vị trí trước và sau chỗ trống.
     - Nếu 4 từ nghĩa khác nhau: Dịch nghĩa và xét cụm Collocation đi kèm.
   • Thời gian lý tưởng: Tối đa 10-12 phút cho 30 câu (khoảng 20-25 giây/câu).

2. **Part 1 & 2 (Listening):**
   • Part 1 (Tranh): Nhìn nhanh hành động của người (V-ing) hoặc vị trí đồ vật.
   • Part 2 (Hỏi - Đáp): Bắt từ để hỏi đầu tiên (Who, Where, When, Why, How). Tuyệt đối tránh các đáp án lặp lại từ phát âm giống câu hỏi (bẫy âm trùng).

3. **Part 7 (Đọc hiểu):**
   • Đọc câu hỏi trước, xác định từ khóa (Keyword), sau đó mới quét (Scan) lên bài đọc tìm thông tin đối chiếu.`,
  },
};

/**
 * Generate context-aware suggestions based on current section and lesson
 */
export function getContextSuggestions(activeNav, currentLesson) {
  if (activeNav === 'grammar') {
    const lessonTitle = currentLesson?.title || 'Ngữ pháp';
    const lessonId = currentLesson?.id;

    if (lessonId === '1') {
      return [
        { label: 'Tại sao dùng "an hour" mà là "a university"?', query: 'Tại sao lại dùng an hour mà không dùng a hour, và tại sao lại là a university?' },
        { label: 'Phân biệt khi nào dùng The và Không mạo từ?', query: 'Giải thích chi tiết khi nào dùng The và khi nào không dùng mạo từ' },
        { label: '3 ví dụ thực tế về Mạo từ trong đề thi', query: 'Cho 3 ví dụ thực tế về mạo từ hay gặp trong đề thi TOEIC' },
        { label: 'Phân biệt "go to school" và "go to the school"', query: 'Phân biệt ý nghĩa khác nhau giữa go to school và go to the school' },
      ];
    }

    if (lessonId === '2') {
      return [
        { label: 'Cách chia To Be theo các đại từ', query: 'Tóm tắt cách chia động từ To Be theo các đại từ trong tiếng Anh' },
        { label: 'Vị trí của To Be đứng trước từ loại nào?', query: 'Động từ To Be thường đứng trước những từ loại nào trong câu?' },
        { label: 'Phân biệt To Be ở hiện tại và quá khứ', query: 'Phân biệt Am, Is, Are với Was, Were' },
      ];
    }

    return [
      { label: `Giải thích kiến thức cốt lõi ${lessonTitle}`, query: `Giải thích chi tiết và dễ hiểu nhất về bài học ${lessonTitle}` },
      { label: 'Cho ví dụ thực tế và giải thích', query: `Cho 3 ví dụ thực tế kèm giải thích ngữ pháp về ${lessonTitle}` },
      { label: 'Các bẫy đề thi hay gặp về phần này', query: `Những lỗi sai và bẫy đề thi hay gặp nhất của bài ${lessonTitle}` },
      { label: 'Kiểm tra nhanh: Cho 1 câu đố để thử sức', query: `Hãy đặt cho mình 1 câu trắc nghiệm về bài ${lessonTitle} để mình làm thử nhé!` },
    ];
  }

  if (activeNav === 'vocabulary') {
    return [
      { label: 'Mẹo nhớ 50 từ vựng mỗi ngày', query: 'Chia sẻ phương pháp nhớ 50 từ vựng mỗi ngày hiệu quả nhất' },
      { label: 'Cách học từ vựng bằng Spaced Repetition', query: 'Phương pháp lặp lại ngắt quãng Spaced Repetition hoạt động như thế nào?' },
      { label: 'Collocations thường gặp trong TOEIC', query: 'Cho mình 5 cụm collocations xuất hiện nhiều nhất trong đề thi TOEIC' },
    ];
  }

  if (activeNav === 'reading') {
    return [
      { label: 'Mẹo làm bài đọc hiểu Part 7', query: 'Chia sẻ chiến thuật làm bài đọc hiểu Part 7 TOEIC để kịp thời gian' },
      { label: 'Cách tra cứu và ghi nhớ từ trong bài đọc', query: 'Cách học từ mới hiệu quả khi đọc bài đọc tiếng Anh' },
      { label: 'Kỹ năng Skimming và Scanning', query: 'Hướng dẫn cách áp dụng kỹ năng Skimming và Scanning khi đọc hiểu' },
    ];
  }

  if (activeNav === 'writing') {
    return [
      { label: 'Cách nối câu đơn thành câu ghép/phức', query: 'Hướng dẫn cách biến câu đơn thành câu ghép hoặc câu phức hay hơn' },
      { label: 'Cấu trúc câu viết chuẩn tự nhiên', query: 'Các cấu trúc câu tiếng Anh viết tự nhiên và ấn tượng' },
      { label: 'Sửa lỗi ngữ pháp thường gặp khi viết', query: 'Những lỗi ngữ pháp người Việt hay mắc phải nhất khi viết tiếng Anh' },
    ];
  }

  return [
    { label: 'Lộ trình học tiếng Anh hiệu quả hôm nay', query: 'Gợi ý thứ tự học các phần hôm nay thế nào là tối ưu nhất?' },
    { label: 'Giải thích ngữ pháp bất kỳ', query: 'Giải thích giúp mình quy tắc dùng mạo từ A, An, The' },
    { label: 'Mẹo luyện nghe Daily Dictation', query: 'Cách luyện chép chính tả trên Daily Dictation để cải thiện bắt âm nhanh nhất' },
    { label: 'Chiến thuật thi TOEIC 650-800+', query: 'Để đạt TOEIC 750+ cần tập trung vào những kỹ năng nào?' },
  ];
}

/**
 * Intelligent AI Answer Generator
 * Analyzes the user's question, identifies intent, checks knowledge base, and formulates a helpful response.
 */
export function generateAIAnswer(question, context = {}) {
  const q = question.toLowerCase().trim();

  // 1. Check direct grammar topics
  if (q.includes('a an') || q.includes('a/an') || q.includes('mạo từ') || q.includes('the') || q.includes('hour') || q.includes('university')) {
    if (q.includes('hour') || q.includes('university') || q.includes('uể oải') || q.includes('tại sao')) {
      return `💡 **GIẢI THÍCH CHI TIẾT: TẠI SAO LÀ "AN HOUR" NHƯNG LẠI LÀ "A UNIVERSITY"?**

Rất nhiều bạn nhầm rằng cứ nhìn thấy chữ cái là chia. Nhưng quy tắc chuẩn quốc tế dựa trên **PHÁT ÂM (Âm thanh)** chứ không phải chữ viết:

1. **Vì sao dùng "An hour"?**
   • Từ **"hour"** bắt đầu bằng chữ *H*, nhưng âm */h/* ở đây là **âm câm (silent letter)**.
   • Bạn đọc từ này là **/ˈaʊ.ər/** (bắt đầu bằng nguyên âm /aʊ/).
   • Vì âm thanh bắt đầu là nguyên âm ➔ Bắt buộc dùng **AN**:
     👉 **An hour** (Một tiếng đồng hồ).
   • Tương tự: *an honest person* (người thật thà - chữ h câm), *an honor* (niềm vinh hạnh).

2. **Vì sao dùng "A university"?**
   • Từ **"university"** bắt đầu bằng chữ cái *U*, nhưng phiên âm quốc tế là **/ˌjuː.nɪˈvɜː.sə.ti/**.
   • Âm bắt đầu là **/j/** (âm "du" - một bán phụ âm, giống như trong từ *yellow* hay *yes*).
   • Vì âm thanh bắt đầu là phụ âm ➔ Dùng **A**:
     👉 **A university** (Một trường đại học).
   • Tương tự: *a European country*, *a uniform*, *a one-way ticket* (phát âm /w/).

🎯 **Tóm tắt mẹo làm bài thi:** Luôn đọc nhẩm từ đó lên, nếu âm phát ra là nguyên âm thì dùng **AN**, nếu là phụ âm thì dùng **A**!`;
    }

    if (q.includes('school') || q.includes('bệnh viện') || q.includes('hospital')) {
      return `🏫 **PHÂN BIỆT KINH ĐIỂN: "GO TO SCHOOL" VÀ "GO TO THE SCHOOL"**

Đây là bẫy ngữ pháp cực kỳ phổ biến trong các đề thi TOEIC và THPT Quốc gia:

1. **KHÔNG CÓ "THE" (Go to school / hospital / prison / church):**
   • Dùng khi người đó đến địa điểm để **thực hiện đúng mục đích/chức năng chính** của nơi đó.
   • *Ví dụ 1:* **He goes to school every morning.**
     ➔ Cậu ấy là học sinh, đến trường để học tập.
   • *Ví dụ 2:* **He is in hospital.**
     ➔ Anh ấy đang là bệnh nhân nằm viện điều trị.

2. **CÓ "THE" (Go to the school / the hospital):**
   • Dùng khi người đó đến nơi đó **với một mục đích khác**, không phải mục đích chính.
   • *Ví dụ 1:* **My father went to the school to meet my teacher.**
     ➔ Bố tôi đến trường không phải để học, mà là để họp phụ huynh.
   • *Ví dụ 2:* **I went to the hospital to visit my sick friend.**
     ➔ Tôi đến bệnh viện để thăm bạn chứ không phải tôi bị ốm.

✨ Hãy nhớ: Làm đúng chức năng ➔ **Không "The"**; Đi việc khác hoặc nơi cụ thể ➔ **Có "The"**!`;
    }

    return GRAMMAR_KNOWLEDGE_BASE.articles.details;
  }

  // 2. To Be
  if (q.includes('to be') || q.includes('am is are') || q.includes('was were') || q.includes('tobe')) {
    return GRAMMAR_KNOWLEDGE_BASE.tobe.details;
  }

  // 3. Passive Voice
  if (q.includes('bị động') || q.includes('passive')) {
    return GRAMMAR_KNOWLEDGE_BASE.passive.details;
  }

  // 4. Tenses
  if (q.includes('thì') || q.includes('tense') || q.includes('hiện tại đơn') || q.includes('hiện tại hoàn thành') || q.includes('quá khứ')) {
    return GRAMMAR_KNOWLEDGE_BASE.tenses.details;
  }

  // 5. TOEIC Tips
  if (q.includes('toeic') || q.includes('part 5') || q.includes('part 7') || q.includes('mẹo thi')) {
    return GRAMMAR_KNOWLEDGE_BASE.toeic_tips.details;
  }

  // 6. Sentence Translation / Analysis Request
  if (q.startsWith('dịch') || q.includes('nghĩa là gì') || q.startsWith('translate')) {
    return `🔍 **PHÂN TÍCH & GIẢI NGHĨA CÂU:**

Khi phân tích câu tiếng Anh, bạn hãy xác định theo 3 bước:
1. **Chủ ngữ (Subject):** Ai hoặc cái gì thực hiện hành động?
2. **Vị ngữ (Verb):** Hành động diễn ra ở thì nào? Chủ động hay bị động?
3. **Thành phần bổ ngữ:** Bổ nghĩa cho đối tượng nào?

Bạn hãy dán nguyên văn câu hoặc đoạn văn bạn cần phân tích vào đây, mình sẽ dịch nghĩa chuẩn xác và chỉ rõ cấu trúc ngữ pháp từng thành phần cho bạn nhé!`;
  }

  // 7. Requesting examples
  if (q.includes('ví dụ') || q.includes('example')) {
    if (context.lessonTitle?.includes('Article') || context.lessonTitle?.includes('Mạo từ')) {
      return `🎯 **3 VÍ DỤ THỰC TẾ VỀ MẠO TỪ HAY GẶP TRONG ĐỀ THI:**

1. **Câu mạo từ chỉ nghề nghiệp (A / An):**
   • *Câu gốc:* Mr. Johnson has been working as **an** accountant for five years.
   • *Giải thích:* Trước danh từ nghề nghiệp số ít đếm được (*accountant* bắt đầu bằng nguyên âm /ə/), ta dùng **an**.

2. **Câu mạo từ chỉ danh từ duy nhất hoặc xác định (The):**
   • *Câu gốc:* **The** CEO will give a presentation at the annual meeting.
   • *Giải thích:* Giám đốc điều hành của công ty là vị trí cụ thể duy nhất được xác định rõ, nên dùng **The**.

3. **Câu không dùng mạo từ (Zero Article):**
   • *Câu gốc:* The employees usually have **lunch** together in the cafeteria.
   • *Giải thích:* Trước các danh từ chỉ bữa ăn thông thường (*breakfast, lunch, dinner*), ta **không** dùng mạo từ!`;
    }
  }

  // 8. General AI Mentor Guidance
  return `🤖 **TRỢ LÝ HỌC TẬP AI ĐÃ GHI NHẬN CÂU HỎI CỦA BẠN!**

Về câu hỏi: *" ${question} "*

Dưới đây là lời giải thích trọng tâm:
• **Về mặt nguyên lý:** Trong tiếng Anh, mỗi cấu trúc ngữ pháp đều phục vụ cho việc truyền đạt thông tin rõ ràng và tự nhiên. Hãy tập trung hiểu bản chất *"Tại sao người bản ngữ lại dùng như vậy"* thay vì học vẹt công thức.
• **Ứng dụng thực hành:** Bạn hãy thử đặt ngay 1 câu ví dụ áp dụng kiến thức này trong cuộc sống hàng ngày hoặc trong môi trường làm việc.
• **Cần trợ giúp thêm?** Bạn có thể hỏi cụ thể hơn như:
  - *"Cho ví dụ cụ thể về..."*
  - *"Phân biệt giữa A và B..."*
  - *"Kiểm tra câu này giúp mình: [câu tiếng Anh]"*

Mình luôn sẵn sàng giải đáp chi tiết từng thắc mắc của bạn!`;
}
