// ─── AI TEACHER GRAMMAR LECTURE ENGINE ───
// Curated pedagogical audio scripts & intelligent fallback lecture generator for grammar lessons.

/**
 * Curated master teacher lecture scripts for high-frequency core grammar lessons.
 * Spoken naturally with pedagogical transitions, conceptual explanations, and native English examples.
 */
export const MASTER_LECTURES = {
  '1': [
    {
      title: 'Chào mừng & Định hướng',
      type: 'intro',
      lang: 'vi-VN',
      text: 'Chào bạn! Chào mừng bạn đến với bài giảng về Mạo từ trong tiếng Anh. Mạo từ là phần ngữ pháp cực kỳ quan trọng, luôn xuất hiện trong giao tiếp hàng ngày cũng như các bài thi TOEIC và IELTS.',
      display: 'Chào bạn! Chào mừng bạn đến với bài giảng về Mạo từ (A, An, The) trong tiếng Anh.',
    },
    {
      title: 'Khái niệm & Phân loại',
      type: 'theory',
      lang: 'vi-VN',
      text: 'Trong tiếng Anh, chúng ta có ba mạo từ quen thuộc là: A, An, và The. Mạo từ được chia làm hai nhóm chính: Mạo từ bất định gồm A và An, và mạo từ xác định là The.',
      display: 'Trong tiếng Anh có 3 mạo từ chính: Mạo từ bất định (A, An) và Mạo từ xác định (The).',
    },
    {
      title: 'Cách dùng mạo từ A và An',
      type: 'theory',
      lang: 'vi-VN',
      text: 'Đầu tiên, quy tắc dùng A và An: Ta dùng A hoặc An trước danh từ số ít đếm được khi lần đầu nhắc tới một người hay một vật chưa xác định, hoặc khi nói về nghề nghiệp. Bạn hãy nghe ví dụ sau:',
      display: 'Dùng A / An trước danh từ số ít đếm được khi nhắc tới lần đầu, mang nghĩa "một", hoặc chỉ nghề nghiệp.',
    },
    {
      title: 'Ví dụ thực tế về A & An',
      type: 'example',
      lang: 'en-US',
      text: 'I saw a cat in the garden. She is an engineer.',
      display: '• I saw a cat in the garden. (Tôi thấy một con mèo trong vườn)\n• She is an engineer. (Cô ấy là một kỹ sư)',
    },
    {
      title: 'Mẹo phân biệt A và An',
      type: 'tip',
      lang: 'vi-VN',
      text: 'Mẹo cốt lõi để phân biệt: Ta dùng An khi từ đứng sau bắt đầu bằng một nguyên âm theo phát âm, bạn có thể nhớ bằng từ UỂ OẢI, gồm các âm u, e, o, a, i. Ví dụ:',
      display: 'Mẹo ghi nhớ: Dùng An trước từ bắt đầu bằng nguyên âm phát âm (u, e, o, a, i trong từ "UỂ OẢI").',
    },
    {
      title: 'Phát âm ví dụ nguyên âm',
      type: 'example',
      lang: 'en-US',
      text: 'An apple, an hour, an umbrella.',
      display: '• An apple (Một quả táo)\n• An hour (Một giờ - âm h câm)\n• An umbrella (Một chiếc ô)',
    },
    {
      title: 'Lưu ý về chữ H câm và Bán nguyên âm',
      type: 'tip',
      lang: 'vi-VN',
      text: 'Lưu ý đặc biệt: Từ hour bắt đầu bằng chữ h nhưng h là âm câm, nên ta đọc là our và dùng An hour. Ngược lại, từ university bắt đầu bằng chữ u nhưng phát âm là phụ âm du, nên ta vẫn dùng A university.',
      display: 'Lưu ý: "An hour" (h câm) nhưng "A university" (phát âm phụ âm /j/).',
    },
    {
      title: 'Cách dùng mạo từ xác định The',
      type: 'theory',
      lang: 'vi-VN',
      text: 'Nhóm thứ hai là mạo từ xác định The. Ta dùng The khi cả người nói và người nghe đều biết rõ về đối tượng đó, hoặc sự vật đó là duy nhất trên thế giới. Hãy lắng nghe ví dụ:',
      display: 'Dùng The khi đối tượng đã được xác định rõ ràng, đã nhắc đến lần 2, hoặc là vật thể duy nhất.',
    },
    {
      title: 'Ví dụ về mạo từ The',
      type: 'example',
      lang: 'en-US',
      text: 'The sun rises in the east. The book you gave me is great.',
      display: '• The sun rises in the east. (Mặt trời mọc ở hướng đông)\n• The book you gave me is great. (Cuốn sách bạn tặng tôi rất hay)',
    },
    {
      title: 'Phát âm The khi đứng trước nguyên âm',
      type: 'tip',
      lang: 'vi-VN',
      text: 'Một mẹo phát âm cực hay: Khi đứng trước một từ bắt đầu bằng nguyên âm, The sẽ được phát âm thành Thi thay vì The. Bạn hãy nghe phát âm chuẩn nhé:',
      display: 'Quy tắc phát âm: The đọc thành /ðiː/ (Thi) khi đứng trước nguyên âm.',
    },
    {
      title: 'Luyện nghe phát âm The / Thi',
      type: 'example',
      lang: 'en-US',
      text: 'The apple, the earth, the end.',
      display: '• The apple /ðiː ˈæp.əl/\n• The earth /ðiː ɜːθ/\n• The end /ðiː end/',
    },
    {
      title: 'Khi nào KHÔNG dùng mạo từ',
      type: 'theory',
      lang: 'vi-VN',
      text: 'Tiếp theo, những trường hợp tuyệt đối không dùng mạo từ: Ta không dùng mạo từ trước danh từ số nhiều nói chung chung, trước bữa ăn như have breakfast, have lunch, hoặc các danh từ trừu tượng mang tính tổng quát như life is hard.',
      display: 'Không dùng mạo từ: Bữa ăn (have lunch), danh từ số nhiều nói chung (Books are friends), danh từ trừu tượng.',
    },
    {
      title: 'Lưu ý phân biệt bẫy đề thi',
      type: 'tip',
      lang: 'vi-VN',
      text: 'Một bẫy kinh điển trong đề thi: Khi ta nói He goes to school, nghĩa là cậu ấy đi học với tư cách học sinh. Nhưng nếu có The: He goes to the school, thì nghĩa là anh ấy đến trường để làm việc khác, ví dụ họp phụ huynh hoặc gặp thầy cô.',
      display: 'Bẫy thi cử: "Go to school" (đi học đúng nghĩa) vs "Go to the school" (đến trường làm việc khác).',
    },
    {
      title: 'Tổng kết bài học & Khích lệ',
      type: 'outro',
      lang: 'vi-VN',
      text: 'Như vậy, bạn chỉ cần nhớ: Sự vật chưa xác định thì dùng A hoặc An; đã rõ ràng hoặc độc nhất thì dùng The; và bữa ăn hay danh từ chung chung thì không dùng mạo từ. Bây giờ, mời bạn cùng làm bài tập trắc nghiệm bên dưới để kiểm tra mức độ ghi nhớ nhé!',
      display: 'Tóm tắt: Chưa xác định ➔ A/An • Đã rõ ràng/duy nhất ➔ The • Tổng quát/bữa ăn ➔ Không mạo từ. Hãy làm bài tập ngay bên dưới!',
    },
  ],
  '2': [
    {
      title: 'Giới thiệu động từ To Be',
      type: 'intro',
      lang: 'vi-VN',
      text: 'Chào bạn! Hôm nay chúng ta cùng học về động từ To Be ở thì hiện tại đơn, bao gồm ba dạng quen thuộc: Am, Is, và Are. Trong tiếng Việt, To Be có 4 nghĩa cơ bản: Là, Thì, Ở, hoặc Bị.',
      display: 'Động từ TO BE ở hiện tại đơn: Am, Is, Are. Mang 4 nghĩa: Là, Thì, Ở, Bị.',
    },
    {
      title: 'Quy tắc chia theo chủ ngữ',
      type: 'theory',
      lang: 'vi-VN',
      text: 'Quy tắc chia động từ To Be cực kỳ dễ nhớ: Chủ ngữ I luôn đi với Am. Chủ ngữ số ít gồm He, She, It hoặc danh từ số ít đi với Is. Còn chủ ngữ số nhiều gồm You, We, They đi với Are.',
      display: '• I ➔ AM\n• He / She / It / Danh từ số ít ➔ IS\n• You / We / They / Danh từ số nhiều ➔ ARE',
    },
    {
      title: 'Ví dụ chia To Be với các đại từ',
      type: 'example',
      lang: 'en-US',
      text: 'I am a student. She is very kind. They are my friends.',
      display: '• I am a student. (Tôi là học sinh)\n• She is very kind. (Cô ấy rất tốt bụng)\n• They are my friends. (Họ là bạn của tôi)',
    },
    {
      title: 'Vị trí của To Be trong câu',
      type: 'theory',
      lang: 'vi-VN',
      text: 'Về vị trí trong câu: Động từ To Be có thể đứng trước một tính từ để miêu tả tính chất, đứng trước danh từ để chỉ nghề nghiệp danh tính, hoặc đứng trước cụm giới từ để chỉ nơi chốn. Bạn hãy nghe các câu ví dụ sau:',
      display: 'Vị trí To Be:\n1. Trước tính từ (He is handsome)\n2. Trước danh từ (Ms Hoa is a teacher)\n3. Trước giới từ (The cat is on the table)',
    },
    {
      title: 'Phát âm ví dụ vị trí To Be',
      type: 'example',
      lang: 'en-US',
      text: 'He is handsome. Ms Hoa is a teacher. The cat is on the table.',
      display: '• He is handsome. (Anh ấy đẹp trai)\n• Ms Hoa is a teacher. (Cô Hoa là giáo viên)\n• The cat is on the table. (Con mèo ở trên bàn)',
    },
    {
      title: 'Tổng kết & Làm bài tập',
      type: 'outro',
      lang: 'vi-VN',
      text: 'Đó là quy tắc cốt lõi của động từ To Be. Bạn hãy làm ngay 4 câu trắc nghiệm bên dưới để kiểm tra phản xạ của mình nhé!',
      display: 'Hoàn thành bài giảng To Be! Hãy làm bài tập trắc nghiệm bên dưới.',
    },
  ],
};

/**
 * Intelligent Fallback Lecture Generator
 * Cleans up raw lesson content into a coherent, pedagogical, step-by-step teacher lecture.
 */
export function buildTeacherLecture(lesson) {
  if (!lesson) return [];

  // Check if we have a handcrafted master lecture
  if (MASTER_LECTURES[lesson.id]) {
    return MASTER_LECTURES[lesson.id];
  }

  const segments = [];

  // 1. Intro
  segments.push({
    title: 'Giới thiệu bài học',
    type: 'intro',
    lang: 'vi-VN',
    text: `Chào bạn! Hôm nay chúng ta cùng tìm hiểu bài giảng: ${lesson.title.replace(/^\d+\.\s*/, '')}. Đây là chủ đề trọng tâm trong chuyên đề ${lesson.category || 'ngữ pháp tiếng Anh'}.`,
    display: `Chào bạn! Chúng ta cùng bắt đầu bài giảng: ${lesson.title}.`,
  });

  // 2. Extract and clean text from content
  let textPool = '';
  if (typeof lesson.content === 'string') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(lesson.content, 'text/html');
    textPool = doc.body.textContent || '';
  } else if (lesson.content && lesson.content.props) {
    const extractStrings = (node) => {
      if (!node) return '';
      if (typeof node === 'string' || typeof node === 'number') return String(node) + ' ';
      if (Array.isArray(node)) return node.map(extractStrings).join(' ');
      if (node.props && node.props.children) return extractStrings(node.props.children);
      return '';
    };
    textPool = extractStrings(lesson.content);
  }

  if (textPool) {
    // Remove technical section numbers and bullets
    const cleanedText = textPool
      .replace(/•/g, '')
      .replace(/\b\d+\.\d+\.\s*/g, '') // remove 1.1., 1.2., etc.
      .replace(/\/\w+ː?\/?/g, '') // remove raw IPA slashes
      .replace(/\s+/g, ' ')
      .trim();

    // Break into sentences
    const rawSentences = cleanedText
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10 && !s.startsWith('http'));

    // Separate English examples from Vietnamese theory
    const viSentences = [];
    const enSentences = [];

    rawSentences.forEach((s) => {
      const englishWords = (s.match(/\b(the|is|are|am|was|were|have|has|had|will|would|can|could|should|do|does|did|in|on|at|to|for|with|by|from|about|of|and|or|but|if|they|he|she|it|we|you|this|that|these|those)\b/gi) || []).length;
      const isEnglish = englishWords >= 2 || /^[A-Z][a-zA-Z\s,.'"-]{12,}$/.test(s);

      if (isEnglish) {
        enSentences.push(s);
      } else {
        viSentences.push(s);
      }
    });

    // Group Vietnamese theory into 2-3 pedagogical paragraphs
    if (viSentences.length > 0) {
      const chunkSize = Math.ceil(viSentences.length / 3);
      for (let i = 0; i < viSentences.length; i += chunkSize) {
        const chunk = viSentences.slice(i, i + chunkSize).join(' ');
        const sectionNum = Math.floor(i / chunkSize) + 1;
        segments.push({
          title: `Lý thuyết trọng tâm - Phần ${sectionNum}`,
          type: 'theory',
          lang: 'vi-VN',
          text: `Về phần ${sectionNum}: ${chunk}`,
          display: chunk,
        });

        // Add 1-2 English examples after each theory part if available
        const exampleChunk = enSentences.slice((sectionNum - 1) * 2, sectionNum * 2);
        exampleChunk.forEach((ex) => {
          segments.push({
            title: 'Ví dụ thực hành',
            type: 'example',
            lang: 'en-US',
            text: ex,
            display: `• ${ex}`,
          });
        });
      }
    }
  }

  // 3. Outro
  segments.push({
    title: 'Tổng kết & Bài tập',
    type: 'outro',
    lang: 'vi-VN',
    text: 'Đó là toàn bộ nội dung lý thuyết trọng tâm của bài học hôm nay. Bạn hãy làm phần trắc nghiệm bên dưới để kiểm tra mức độ hiểu bài và tích lũy điểm số nhé!',
    display: 'Đó là toàn bộ lý thuyết trọng tâm. Hãy làm bài tập trắc nghiệm bên dưới để củng cố kiến thức!',
  });

  return segments;
}

/**
 * Natural voice selector for Web Speech Synthesis
 * Prioritizes Microsoft Natural/Online Neural voices and Google Online voices.
 */
export function getAvailableTutorVoices(synth) {
  if (!synth || !synth.getVoices) return { viVoices: [], enVoices: [] };

  const allVoices = synth.getVoices();

  // Vietnamese voices
  const vi = allVoices.filter(
    (v) => v.lang.includes('vi') || v.name.toLowerCase().includes('vietnam')
  );

  // English voices
  const en = allVoices.filter(
    (v) => v.lang.startsWith('en')
  );

  return { viVoices: vi, enVoices: en };
}

export function pickBestVoice(voices, lang, preferredGender = 'female') {
  if (!voices || voices.length === 0) return null;

  if (lang === 'vi-VN') {
    // 1. Natural / Online Azure voices (in Microsoft Edge)
    if (preferredGender === 'female') {
      const hoaiMy = voices.find(
        (v) => v.name.includes('HoaiMy') || (v.name.includes('Natural') && v.name.includes('Female'))
      );
      if (hoaiMy) return hoaiMy;
    } else {
      const namMinh = voices.find(
        (v) => v.name.includes('NamMinh') || (v.name.includes('Natural') && v.name.includes('Male'))
      );
      if (namMinh) return namMinh;
    }

    // 2. Google tiếng Việt (Chrome)
    const googleVi = voices.find((v) => v.name.includes('Google') && v.lang.includes('vi'));
    if (googleVi) return googleVi;

    // 3. Any Natural / Online voice
    const anyNatural = voices.find(
      (v) => v.name.includes('Natural') || v.name.includes('Online')
    );
    if (anyNatural) return anyNatural;

    return voices[0];
  } else {
    // English US/UK Natural voices
    const naturalEn = voices.find(
      (v) =>
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Jenny') || v.name.includes('Guy')) &&
        (v.lang.includes('US') || v.lang.includes('GB'))
    );
    if (naturalEn) return naturalEn;

    const usVoice = voices.find((v) => v.lang.includes('US'));
    return usVoice || voices[0];
  }
}
