// ═════════════════════════════════════════════════════════════════════════════
// SHADOWING DATA REPOSITORY (KHO BÀI TẬP SHADOWING TOÀN DIỆN TỪ A1 ĐẾN C2)
// Levels: A1 (Beginner) ➔ A2 (Elementary) ➔ B1 (Intermediate) ➔ B2 (Upper-Int) ➔ C1 (Advanced) ➔ C2 (Mastery)
// Plus: TOEIC Part 3 & 4 + Connected Speech (Nối âm & Ngữ điệu bản ngữ)
// ═════════════════════════════════════════════════════════════════════════════

export const SHADOWING_CATEGORIES = [
  { id: 'all', label: 'Tất cả chủ đề', icon: 'fa-globe' },
  { id: 'cefr-a1', label: 'A1 Sơ cấp (Căn bản)', icon: 'fa-seedling' },
  { id: 'cefr-a2', label: 'A2 Tiền trung cấp', icon: 'fa-shoe-prints' },
  { id: 'cefr-b1', label: 'B1 Trung cấp', icon: 'fa-feather' },
  { id: 'cefr-b2', label: 'B2 Trung cao cấp', icon: 'fa-bolt' },
  { id: 'cefr-c1-c2', label: 'C1 - C2 Cao cấp & Diễn thuyết', icon: 'fa-crown' },
  { id: 'toeic-part3', label: 'TOEIC Part 3 (Hội thoại)', icon: 'fa-comments' },
  { id: 'toeic-part4', label: 'TOEIC Part 4 (Đoạn thông tin)', icon: 'fa-bullhorn' },
  { id: 'connected-speech', label: 'Luyện nối âm & Giảm âm', icon: 'fa-wand-magic-sparkles' },
];

export const SHADOWING_LESSONS = [
  // ─── A1 LEVEL: BEGINNER (DAILY LIFE & ROUTINES) ────────────────────────────
  {
    id: 'sh-a1-01',
    title: 'Self-Introduction and Daily Routine',
    category: 'cefr-a1',
    level: 'A1 Beginner',
    topic: 'Personal Info & Routine',
    type: 'monologue',
    speakers: ['Emma'],
    description: 'Bài tự giới thiệu bản thân, nghề nghiệp và lịch trình sinh hoạt một ngày cơ bản.',
    sentences: [
      {
        id: 1,
        speaker: 'Emma',
        text: "Hello, my name is Emma and I live in a quiet neighborhood near the city center.",
        vietnamese: "Xin chào, tên tôi là Emma và tôi sống ở một khu phố yên tĩnh gần trung tâm thành phố.",
        ipa: "/həˈloʊ, maɪ neɪm ɪz ˈɛmə ænd aɪ lɪv ɪn ə ˈkwaɪət ˈneɪbərˌhʊd nɪər ðə ˈsɪti ˈsɛntər/",
        linkingHints: "name is -> nay-miz | live in a -> li-vi-nuh | and I -> an-dai",
        focalWords: ["quiet neighborhood", "city center", "live in"]
      },
      {
        id: 2,
        speaker: 'Emma',
        text: "Every morning, I wake up at six thirty and brew a fresh cup of coffee.",
        vietnamese: "Mỗi buổi sáng, tôi thức dậy lúc 6 giờ 30 và pha một tách cà phê thơm ngon.",
        ipa: "/ˈɛvri ˈmɔːrnɪŋ, aɪ weɪk ʌp æt sɪks ˈθɜːrti ænd bruː ə frɛʃ kʌp ɒv ˈkɒfi/",
        linkingHints: "wake up at -> way-ku-pat | cup of -> cu-puhv",
        focalWords: ["wake up", "brew", "fresh cup"]
      },
      {
        id: 3,
        speaker: 'Emma',
        text: "I work as an elementary school teacher, so my workday is always filled with energy.",
        vietnamese: "Tôi làm việc với tư cách là giáo viên tiểu học, nên ngày làm việc của tôi luôn tràn đầy năng lượng.",
        ipa: "/aɪ wɜːrk æz ən ˌɛlɪˈmɛntəri skuːl ˈtiːtʃər, soʊ maɪ ˈwɜːrkdeɪ ɪz ˈɔːlweɪz fɪld wɪð ˈɛnərdʒi/",
        linkingHints: "work as an -> wer-ka-zuhn | is always -> i-zall-ways",
        focalWords: ["elementary school", "workday", "filled with energy"]
      },
      {
        id: 4,
        speaker: 'Emma',
        text: "In the evening, I enjoy cooking healthy meals and reading books before going to bed.",
        vietnamese: "Vào buổi tối, tôi thích nấu các bữa ăn lành mạnh và đọc sách trước khi đi ngủ.",
        ipa: "/ɪn ði ˈiːvnɪŋ, aɪ ɪnˈdʒɔɪ ˈkʊkɪŋ ˈhɛlθi miːlz ænd ˈriːdɪŋ bʊks bɪˈfɔːr ˈɡoʊɪŋ tuː bɛd/",
        linkingHints: "In the evening -> in-thee-evening | cooking healthy -> cookin-healthy",
        focalWords: ["healthy meals", "reading books", "going to bed"]
      }
    ]
  },
  {
    id: 'sh-a1-02',
    title: 'Ordering Food and Drinks at a Bakery Cafe',
    category: 'cefr-a1',
    level: 'A1 Beginner',
    topic: 'Food & Ordering',
    type: 'dialogue',
    speakers: ['Barista', 'Customer (David)'],
    description: 'Hội thoại gọi món đồ uống và bánh ngọt tại quán cà phê.',
    sentences: [
      {
        id: 1,
        speaker: 'Barista',
        text: "Good morning! What can I get started for you today?",
        vietnamese: "Chào buổi sáng! Tôi có thể lấy món gì để bắt đầu cho bạn hôm nay?",
        ipa: "/ɡʊd ˈmɔːrnɪŋ! wɒt kæn aɪ ɡɛt ˈstɑːrtɪd fɔːr juː təˈdeɪ/",
        linkingHints: "What can I -> Wha-kuh-nai | get started -> get-star-ted",
        focalWords: ["get started", "good morning"]
      },
      {
        id: 2,
        speaker: 'David',
        text: "Hi! Can I have a large iced latte with oat milk, please?",
        vietnamese: "Chào bạn! Cho tôi một ly latte đá cỡ lớn dùng sữa yến mạch nhé?",
        ipa: "/haɪ! kæn aɪ hæv ə lɑːrdʒ aɪst ˈlɑːteɪ wɪð oʊt mɪlk, pliːz/",
        linkingHints: "Can I have a -> Ca-nai-ha-vuh | iced latte -> ice-lat-te",
        focalWords: ["iced latte", "oat milk", "large"]
      },
      {
        id: 3,
        speaker: 'Barista',
        text: "Sure thing. Would you also like any pastry or croissant with that?",
        vietnamese: "Chắc chắn rồi. Bạn có muốn dùng thêm bánh ngọt hay bánh sừng bò không?",
        ipa: "/ʃʊr θɪŋ. wʊd juː ˈɔːlsoʊ laɪk ˈɛni ˈpeɪstri ɔːr krwɑːˈsɒŋ wɪð ðæt/",
        linkingHints: "Would you -> Wou-jew | like any -> li-keh-nee",
        focalWords: ["pastry", "croissant", "sure thing"]
      },
      {
        id: 4,
        speaker: 'David',
        text: "I'll take a warm chocolate croissant to go, thank you.",
        vietnamese: "Tôi sẽ lấy một chiếc bánh sừng bò sô cô la hâm nóng mang đi, cảm ơn bạn.",
        ipa: "/aɪl teɪk ə wɔːrm ˈtʃɒklət krwɑːˈsɒŋ tuː ɡoʊ, θæŋk juː/",
        linkingHints: "take a -> tay-kuh | to go -> to-go",
        focalWords: ["warm chocolate", "to go"]
      }
    ]
  },

  // ─── A2 LEVEL: ELEMENTARY (SHOPPING, TRAVEL & HEALTH) ─────────────────────
  {
    id: 'sh-a2-01',
    title: 'Visiting the Doctor for a Health Checkup',
    category: 'cefr-a2',
    level: 'A2 Elementary',
    topic: 'Doctor & Health Care',
    type: 'dialogue',
    speakers: ['Dr. Watson', 'Patient (Anna)'],
    description: 'Cuộc trò chuyện khám bệnh giữa bác sĩ và bệnh nhân về triệu chứng đau đầu và sốt nhẹ.',
    sentences: [
      {
        id: 1,
        speaker: 'Dr. Watson',
        text: "Good afternoon Anna. Please take a seat. What seems to be bothering you today?",
        vietnamese: "Chào buổi chiều Anna. Mời cô ngồi. Hôm nay cô đang cảm thấy khó chịu ở đâu?",
        ipa: "/ɡʊd ˌæftərˈnuːn ˈænə. pliːz teɪk ə siːt. wɒt siːmz tuː biː ˈbɒðərɪŋ juː təˈdeɪ/",
        linkingHints: "take a seat -> tay-kuh-seat | seems to be -> seem-stuh-bee",
        focalWords: ["take a seat", "bothering you", "symptoms"]
      },
      {
        id: 2,
        speaker: 'Anna',
        text: "I've had a persistent headache and a mild fever for the past three days.",
        vietnamese: "Tôi bị đau đầu liên tục và sốt nhẹ suốt ba ngày qua.",
        ipa: "/aɪv hæd ə pərˈsɪstənt ˈhɛdeɪk ænd ə maɪld ˈfiːvər fɔːr ðə pæst θriː deɪz/",
        linkingHints: "had a -> ha-duh | fever for -> fee-ver-fer",
        focalWords: ["persistent headache", "mild fever", "past three days"]
      },
      {
        id: 3,
        speaker: 'Dr. Watson',
        text: "Let me check your blood pressure and temperature first to see what's going on.",
        vietnamese: "Để tôi kiểm tra huyết áp và nhiệt độ cho cô trước xem tình hình thế nào nhé.",
        ipa: "/lɛt miː tʃɛk jɔːr blʌd ˈprɛʃər ænd ˈtɛmprətʃər fɜːrst tuː siː wɒts ˈɡoʊɪŋ ɒn/",
        linkingHints: "Let me -> Lem-mee | check your -> che-kyoor | going on -> go-wing-on",
        focalWords: ["blood pressure", "temperature", "check"]
      },
      {
        id: 4,
        speaker: 'Dr. Watson',
        text: "It looks like a seasonal flu. Drink plenty of warm water and take this medicine twice a day.",
        vietnamese: "Có vẻ như là cảm cúm theo mùa thôi. Hãy uống nhiều nước ấm và uống thuốc này 2 lần mỗi ngày.",
        ipa: "/ɪt lʊks laɪk ə ˈsiːzənl fluː. drɪŋk ˈplɛnti ɒv wɔːrm ˈwɔːtər ænd teɪk ðɪs ˈmɛdsn twaɪs ə deɪ/",
        linkingHints: "looks like a -> looks-li-kuh | plenty of -> plen-ti-yuhv | twice a day -> twi-suh-day",
        focalWords: ["seasonal flu", "plenty of water", "twice a day"]
      }
    ]
  },
  {
    id: 'sh-a2-02',
    title: 'Asking for Directions and Public Transit in a New City',
    category: 'cefr-a2',
    level: 'A2 Elementary',
    topic: 'Travel & Directions',
    type: 'dialogue',
    speakers: ['Tourist (Ken)', 'Local Resident'],
    description: 'Hỏi đường đến ga tàu điện ngầm và cách mua vé tự động.',
    sentences: [
      {
        id: 1,
        speaker: 'Ken',
        text: "Excuse me, could you tell me how to get to the nearest subway station from here?",
        vietnamese: "Xin lỗi, bạn có thể chỉ cho tôi cách đến ga tàu điện ngầm gần nhất từ đây không?",
        ipa: "/ɪkˈskjuːz miː, kʊd juː tɛl miː haʊ tuː ɡɛt tuː ðə ˈnɪərɪst ˈsʌbweɪ ˈsteɪʃn frɒm hɪər/",
        linkingHints: "Excuse me -> Ex-cyuz-mee | tell me -> tel-mee | get to -> get-to",
        focalWords: ["nearest subway station", "how to get to"]
      },
      {
        id: 2,
        speaker: 'Local Resident',
        text: "Walk straight ahead for two blocks, then turn left at the traffic light next to the supermarket.",
        vietnamese: "Đi thẳng về phía trước qua hai dãy nhà, sau đó rẽ trái ở cột đèn giao thông cạnh siêu thị.",
        ipa: "/wɔːk streɪt əˈhɛd fɔːr tuː blɒks, ðɛn tɜːrn lɛft æt ðə ˈtræfɪk laɪt nɛkst tuː ðə ˈsuːpərmɑːrkɪt/",
        linkingHints: "straight ahead -> strai-tuh-head | turn left at -> turn-lef-tat",
        focalWords: ["walk straight ahead", "two blocks", "traffic light"]
      },
      {
        id: 3,
        speaker: 'Ken',
        text: "Is the ticket machine easy to use for foreigners who speak English?",
        vietnamese: "Máy bán vé có dễ sử dụng cho người nước ngoài nói tiếng Anh không?",
        ipa: "/ɪz ðə ˈtɪkɪt məˈʃiːn ˈiːzi tuː juːz fɔːr ˈfɒrənərz huː spiːk ˈɪŋɡlɪʃ/",
        linkingHints: "easy to use -> ee-zi-tuh-yooz | speak English -> spee-king-glish",
        focalWords: ["ticket machine", "easy to use", "foreigners"]
      },
      {
        id: 4,
        speaker: 'Local Resident',
        text: "Yes, there is an English language button right on the home screen.",
        vietnamese: "Có chứ, có một nút chọn tiếng Anh ngay trên màn hình chính.",
        ipa: "/jɛs, ðɛər ɪz ən ˈɪŋɡlɪʃ ˈlæŋɡwɪdʒ ˈbʌtn raɪt ɒn ðə hoʊm skriːn/",
        linkingHints: "there is an -> the-ri-zuhn | right on -> righ-ton",
        focalWords: ["English button", "home screen"]
      }
    ]
  },

  // ─── B1 LEVEL: INTERMEDIATE (WORKPLACE & JOB INTERVIEWS) ───────────────────
  {
    id: 'sh-b1-01',
    title: 'Answering Strengths and Weaknesses in a Job Interview',
    category: 'cefr-b1',
    level: 'B1 Intermediate',
    topic: 'Career & Interview',
    type: 'dialogue',
    speakers: ['Interviewer (Ms. Taylor)', 'Candidate (Leo)'],
    description: 'Phỏng vấn xin việc: Trả lời thông minh về điểm mạnh và cách khắc phục điểm yếu chuyên môn.',
    sentences: [
      {
        id: 1,
        speaker: 'Ms. Taylor',
        text: "Leo, how would you describe your greatest professional strength and how it benefits our team?",
        vietnamese: "Leo, bạn sẽ mô tả điểm mạnh chuyên môn lớn nhất của mình là gì và nó giúp ích thế nào cho nhóm của chúng tôi?",
        ipa: "/ˈliːoʊ, haʊ wʊd juː dɪˈskraɪb jɔːr ˈɡreɪtɪst prəˈfɛʃənl strɛŋkθ ænd haʊ ɪt ˈbɛnɪfɪts ˈaʊər tiːm/",
        linkingHints: "would you -> wud-jew | benefits our -> be-ne-fit-sour",
        focalWords: ["professional strength", "benefits our team"]
      },
      {
        id: 2,
        speaker: 'Leo',
        text: "My greatest strength is problem-solving under pressure and facilitating clear cross-functional communication.",
        vietnamese: "Điểm mạnh lớn nhất của tôi là giải quyết vấn đề dưới áp lực và thúc đẩy giao tiếp liên phòng ban một cách rõ ràng.",
        ipa: "/maɪ ˈɡreɪtɪst strɛŋkθ ɪz ˈprɒbləm ˈsɒlvɪŋ ˈʌndər ˈprɛʃər ænd fəˈsɪlɪteɪtɪŋ klɪər krɒs ˈfʌŋkʃənl kəˌmjuːnɪˈkeɪʃn/",
        linkingHints: "problem-solving under -> problem-solvin-gun-der | clear cross -> clear-cross",
        focalWords: ["problem-solving", "under pressure", "cross-functional"]
      },
      {
        id: 3,
        speaker: 'Ms. Taylor',
        text: "That's very valuable. And what area are you currently trying to improve the most?",
        vietnamese: "Điều đó rất đáng giá. Và lĩnh vực nào bạn đang nỗ lực cải thiện nhiều nhất hiện nay?",
        ipa: "/ðæts ˈvɛri ˈvæljuəbl. ænd wɒt ˈeəriə ɑːr juː ˈkʌrəntli ˈtraɪɪŋ tuː ɪmˈpruːv ðə moʊst/",
        linkingHints: "That's very -> Tha-tsve-ry | trying to -> try-in-tuh",
        focalWords: ["valuable", "currently trying", "improve"]
      },
      {
        id: 4,
        speaker: 'Leo',
        text: "In the past, I tended to take on too many tasks at once, but now I use project management software to delegate effectively.",
        vietnamese: "Trước đây, tôi có xu hướng ôm đồm quá nhiều việc cùng lúc, nhưng giờ tôi dùng phần mềm quản lý dự án để phân công hiệu quả hơn.",
        ipa: "/ɪn ðə pæst, aɪ ˈtɛndɪd tuː teɪk ɒn tuː ˈmɛni tɑːsks æt wʌns, bʌt naʊ aɪ juːz ˈprɒdʒɛkt ˈmænɪdʒmənt ˈsɒftwɛər tuː ˈdɛlɪɡeɪt ɪˈfɛktɪvli/",
        linkingHints: "take on -> tay-kon | at once -> a-twuns | delegate effectively -> de-le-ga-tef-fec-tive-ly",
        focalWords: ["take on too many", "project management", "delegate effectively"]
      }
    ]
  },
  {
    id: 'sh-b1-02',
    title: 'Discussing Environmental Sustainability and Green Energy',
    category: 'cefr-b1',
    level: 'B1 Intermediate',
    topic: 'Environment & Climate',
    type: 'monologue',
    speakers: ['Narrator'],
    description: 'Bình luận về chuyển đổi năng lượng xanh, giảm thiểu rác thải nhựa và bảo vệ môi trường bền vững.',
    sentences: [
      {
        id: 1,
        speaker: 'Narrator',
        text: "Transitioning to renewable energy sources like solar and wind power is essential for combating climate change.",
        vietnamese: "Chuyển dịch sang các nguồn năng lượng tái tạo như điện mặt trời và gió là điều cốt yếu để chống lại biến đổi khí hậu.",
        ipa: "/trænˈzɪʃnɪŋ tuː rɪˈnjuːəbl ˈɛnərdʒi ˈsɔːrsɪz laɪk ˈsoʊlər ænd wɪnd ˈpaʊər ɪz ɪˈsɛnʃl fɔːr kəmˈbætɪŋ ˈklaɪmət tʃeɪndʒ/",
        linkingHints: "Transitioning to -> tran-zi-shnin-tuh | solar and -> so-la-rand | power is -> pow-rihz",
        focalWords: ["renewable energy", "solar and wind", "combating climate change"]
      },
      {
        id: 2,
        speaker: 'Narrator',
        text: "In addition to clean electricity, reducing single-use plastics directly protects marine ecosystems worldwide.",
        vietnamese: "Bên cạnh điện sạch, việc giảm thiểu đồ nhựa dùng một lần sẽ trực tiếp bảo vệ hệ sinh thái biển trên toàn cầu.",
        ipa: "/ɪn əˈdɪʃn tuː kliːn ɪˌlɛkˈtrɪsəti, rɪˈdjuːsɪŋ ˈsɪŋɡl juːz ˈplæstɪks dəˈrɛktli prəˈtɛkts məˈriːn ˈiːkoʊˌsɪstəmz ˌwɜːrldˈwaɪd/",
        linkingHints: "In addition to -> i-nuh-di-shuhn-tuh | single-use -> sin-gle-yoos",
        focalWords: ["clean electricity", "single-use plastics", "marine ecosystems"]
      },
      {
        id: 3,
        speaker: 'Narrator',
        text: "Many innovative companies are adopting circular economy models to eliminate unnecessary waste.",
        vietnamese: "Nhiều doanh nghiệp đổi mới đang áp dụng các mô hình kinh tế tuần hoàn để loại bỏ lãng phí không cần thiết.",
        ipa: "/ˈmɛni ˈɪnəveɪtɪv ˈkʌmpəniz ɑːr əˈdɒptɪŋ ˈsɜːrkjələr ɪˈkɒnəmi ˈmɒdlz tuː ɪˈlɪmɪneɪt ʌnˈnɛsəsəri weɪst/",
        linkingHints: "are adopting -> a-radopt-ing | eliminate unnecessary -> e-li-mi-na-tun-ne-ces-sa-ry",
        focalWords: ["innovative companies", "circular economy", "eliminate waste"]
      }
    ]
  },

  // ─── B2 LEVEL: UPPER-INTERMEDIATE (TECH, AI & BUSINESS STRATEGY) ───────────
  {
    id: 'sh-b2-01',
    title: 'The Impact of Generative Artificial Intelligence on the Future of Work',
    category: 'cefr-b2',
    level: 'B2 Upper-Intermediate',
    topic: 'Technology & AI',
    type: 'speech',
    speakers: ['Tech Speaker (Rachel)'],
    description: 'Bài thuyết trình về tác động của Trí tuệ nhân tạo (AI) tới năng suất lao động và kỹ năng thế kỷ 21.',
    sentences: [
      {
        id: 1,
        speaker: 'Rachel',
        text: "Generative AI is not merely a passing technological trend; it represents a fundamental paradigm shift in how we create and innovate.",
        vietnamese: "AI tạo sinh không chỉ là một trào lưu công nghệ thoáng qua; nó đại diện cho một sự chuyển dịch mô hình căn bản trong cách chúng ta sáng tạo và đổi mới.",
        ipa: "/ˈdʒɛnərətɪv eɪ-aɪ ɪz nɒt ˈmɪərli ə ˈpæsɪŋ ˌtɛknəˈlɒdʒɪkl trɛnd; ɪt ˌrɛprɪˈzɛnts ə ˌfʌndəˈmɛntl ˈpærədaɪm ʃɪft ɪn haʊ wiː kriˈeɪt ænd ˈɪnəveɪt/",
        linkingHints: "AI is not -> A-I-iz-not | paradigm shift in -> pa-ra-dime-shif-tin",
        focalWords: ["Generative AI", "passing trend", "paradigm shift", "innovate"]
      },
      {
        id: 2,
        speaker: 'Rachel',
        text: "By automating routine cognitive tasks, professionals can redirect their attention toward strategic decision-making and creative collaboration.",
        vietnamese: "Bằng cách tự động hóa các tác vụ nhận thức lặp lại, các chuyên gia có thể chuyển hướng sự chú ý sang việc ra quyết định chiến lược và hợp tác sáng tạo.",
        ipa: "/baɪ ˈɔːtəmeɪtɪŋ ruːˈtiːn ˈkɒɡnətɪv tɑːsks, prəˈfɛʃənlz kæn ˌriːdəˈrɛkt ðɛər əˈtɛnʃn təˈwɔːrd strəˈtiːdʒɪk dɪˈsɪʒn ˈmeɪkɪŋ ænd kriˈeɪtɪv kəˌlæbəˈreɪʃn/",
        linkingHints: "automating routine -> au-to-ma-tin-rou-tine | attention toward -> at-ten-shun-toward",
        focalWords: ["automating", "routine cognitive tasks", "strategic decision-making"]
      },
      {
        id: 3,
        speaker: 'Rachel',
        text: "Consequently, critical thinking and adaptability will become the most decisive assets in the modern job market.",
        vietnamese: "Hệ quả là, tư duy phản biện và khả năng thích ứng sẽ trở thành những tài sản mang tính quyết định nhất trên thị trường việc làm hiện đại.",
        ipa: "/ˈkɒnsɪkwəntli, ˈkrɪtɪkl ˈθɪŋkɪŋ ænd əˌdæptəˈbɪləti wɪl bɪˈkʌm ðə moʊst dɪˈsaɪsɪv ˈæsɛts ɪn ðə ˈmɒdərn dʒɒb ˈmɑːrkɪt/",
        linkingHints: "thinking and -> think-in-gand | decisive assets -> de-ci-si-va-ssets",
        focalWords: ["critical thinking", "adaptability", "decisive assets"]
      }
    ]
  },
  {
    id: 'sh-b2-02',
    title: 'Negotiating a Strategic Corporate Partnership',
    category: 'cefr-b2',
    level: 'B2 Upper-Intermediate',
    topic: 'Business & Negotiation',
    type: 'dialogue',
    speakers: ['James (VP of Strategy)', 'Elena (Managing Partner)'],
    description: 'Cuộc đàm phán cấp cao về việc chia sẻ doanh thu và quyền sở hữu trí tuệ giữa hai tập đoàn.',
    sentences: [
      {
        id: 1,
        speaker: 'James',
        text: "We appreciate your proposal, Elena, but our executive board has reservations regarding the revenue-sharing model in clause four.",
        vietnamese: "Chúng tôi đánh giá cao đề xuất của phía bạn, Elena, nhưng hội đồng quản trị của chúng tôi có chút băn khoăn về mô hình chia sẻ doanh thu ở điều khoản thứ tư.",
        ipa: "/wiː əˈpriːʃieɪt jɔːr prəˈpoʊzl, ˈɛlənə, bʌt ˈaʊər ɪɡˈzɛkjətɪv bɔːrd hæz ˌrɛzərˈveɪʃnz rɪˈɡɑːrdɪŋ ðə ˈrɛvənjuː ˈʃɛərɪŋ ˈmɒdl ɪn klɔːz fɔːr/",
        linkingHints: "appreciate your -> ap-pre-she-ate-cher | board has -> boar-dhas",
        focalWords: ["proposal", "executive board", "revenue-sharing model"]
      },
      {
        id: 2,
        speaker: 'Elena',
        text: "We understand your concerns. If we adjust the initial royalty rate to fifteen percent, would that bridge the gap?",
        vietnamese: "Chúng tôi hiểu mối quan tâm của các bạn. Nếu chúng tôi điều chỉnh tỷ lệ tiền bản quyền ban đầu xuống 15%, liệu điều đó có thu hẹp được khoảng cách bất đồng không?",
        ipa: "/wiː ˌʌndərˈstænd jɔːr kənˈsɜːrnz. ɪf wiː əˈdʒʌst ði ɪˈnɪʃl ˈrɔɪəlti reɪt tuː ˈfɪfˈtiːn pərˈsɛnt, wʊd ðæt brɪdʒ ðə ɡæp/",
        linkingHints: "adjust the -> ad-jus-the | bridge the gap -> bridge-the-gap",
        focalWords: ["royalty rate", "bridge the gap", "concerns"]
      },
      {
        id: 3,
        speaker: 'James',
        text: "That sounds like a fair compromise, provided we maintain exclusivity in the Southeast Asian market for the next two fiscal years.",
        vietnamese: "Đó là một sự thỏa hiệp công bằng, với điều kiện chúng tôi duy trì quyền độc quyền tại thị trường Đông Nam Á trong hai năm tài chính tới.",
        ipa: "/ðæt saʊndz laɪk ə fɛər ˈkɒmprəmaɪz, prəˈvaɪdɪd wiː meɪnˈteɪn ˌɛkskluːˈsɪvəti ɪn ðə saʊθˈiːst ˈeɪʒn ˈmɑːrkɪt fɔːr ðə nɛkst tuː ˈfɪskl jɪərz/",
        linkingHints: "compromise, provided -> com-pro-mise-pro-vi-ded | market for -> mar-ket-fer",
        focalWords: ["fair compromise", "maintain exclusivity", "fiscal years"]
      }
    ]
  },

  // ─── C1 - C2 LEVEL: ADVANCED & MASTERY SPEECHES (TED & INSPIRATIONAL) ──────
  {
    id: 'sh-c1-01',
    title: 'Steve Jobs Stanford Commencement Speech: Connecting the Dots',
    category: 'cefr-c1-c2',
    level: 'C1 Advanced',
    topic: 'Master Speeches & Life Philosophy',
    type: 'speech',
    speakers: ['Steve Jobs'],
    description: 'Trích đoạn kinh điển của Steve Jobs tại Stanford: Bạn không thể kết nối các dấu mốc khi nhìn về phía trước, mà chỉ có thể kết nối chúng khi nhìn lại.',
    sentences: [
      {
        id: 1,
        speaker: 'Steve Jobs',
        text: "You can't connect the dots looking forward; you can only connect them looking backwards.",
        vietnamese: "Bạn không thể kết nối các dấu mốc cuộc đời khi nhìn về tương lai; bạn chỉ có thể kết nối chúng khi nhìn lại quá khứ.",
        ipa: "/juː kænt kəˈnɛkt ðə dɒts ˈlʊkɪŋ ˈfɔːrwərd; juː kæn ˈoʊnli kəˈnɛkt ðɛm ˈlʊkɪŋ ˈbækwərdz/",
        linkingHints: "can't connect -> can-con-nect | connect them -> con-nec-them",
        focalWords: ["connect the dots", "looking forward", "looking backwards"]
      },
      {
        id: 2,
        speaker: 'Steve Jobs',
        text: "So you have to trust that the dots will somehow connect in your future.",
        vietnamese: "Vì vậy, bạn phải tin tưởng rằng những dấu mốc đó bằng cách nào đó sẽ kết nối lại trong tương lai của bạn.",
        ipa: "/soʊ juː hæv tuː trʌst ðæt ðə dɒts wɪl ˈsʌmhaʊ kəˈnɛkt ɪn jɔːr ˈfjuːtʃər/",
        linkingHints: "have to trust -> haf-tuh-trust | connect in -> con-nec-tin",
        focalWords: ["have to trust", "somehow connect", "future"]
      },
      {
        id: 3,
        speaker: 'Steve Jobs',
        text: "You have to trust in something — your gut, destiny, life, karma, whatever.",
        vietnamese: "Bạn phải tin vào một điều gì đó — trực giác, số phận, cuộc đời, nhân quả, bất kể điều gì.",
        ipa: "/juː hæv tuː trʌst ɪn ˈsʌmθɪŋ — jɔːr ɡʌt, ˈdɛstəni, laɪf, ˈkɑːrmə, wɒtˈɛvər/",
        linkingHints: "trust in -> trus-tin | whatever -> wha-te-ver",
        focalWords: ["your gut", "destiny", "karma", "whatever"]
      },
      {
        id: 4,
        speaker: 'Steve Jobs',
        text: "Because believing that the dots will connect down the road will give you the confidence to follow your heart, even when it leads you off the well-worn path.",
        vietnamese: "Bởi vì việc tin rằng những dấu mốc sẽ kết nối trên chặng đường phía trước sẽ cho bạn sự tự tin để đi theo tiếng gọi của trái tim, ngay cả khi nó dẫn bạn ra khỏi lối mòn thông thường.",
        ipa: "/bɪˈkɒz bɪˈliːvɪŋ ðæt ðə dɒts wɪl kəˈnɛkt daʊn ðə roʊd wɪl ɡɪv juː ðə ˈkɒnfɪdəns tuː ˈfɒloʊ jɔːr hɑːrt, ˈiːvn wɛn ɪt liːdz juː ɒf ðə wɛl-wɔːrn pæθ/",
        linkingHints: "connect down -> con-nec-down | give you -> gi-vyoo | off the -> of-the",
        focalWords: ["down the road", "confidence", "follow your heart", "well-worn path"]
      }
    ]
  },
  {
    id: 'sh-c2-01',
    title: 'The Architecture of Human Consciousness and Stoic Resilience',
    category: 'cefr-c1-c2',
    level: 'C2 Mastery',
    topic: 'Philosophy & Psychology',
    type: 'speech',
    speakers: ['Philosopher (Marcus)'],
    description: 'Nghệ thuật làm chủ tâm trí và sự kiên cường khắc kỷ trước những biến cố khó đoán của cuộc sống.',
    sentences: [
      {
        id: 1,
        speaker: 'Marcus',
        text: "You have power over your mind — not outside events. Realize this, and you will find unstoppable inner strength.",
        vietnamese: "Bạn có quyền năng tuyệt đối đối với tâm trí của chính mình — chứ không phải các biến cố bên ngoài. Nhận thức thấu đáo điều này, bạn sẽ tìm thấy sức mạnh nội tại bất diệt.",
        ipa: "/juː hæv ˈpaʊər ˈoʊvər jɔːr maɪnd — nɒt ˌaʊtˈsaɪd ɪˈvɛnts. ˈrɪəlaɪz ðɪs, ænd juː wɪl faɪnd ʌnˈstɒpəbl ˈɪnər strɛŋkθ/",
        linkingHints: "power over -> pow-ro-ver | mind not -> min-not | find unstoppable -> fin-dun-stop-pa-ble",
        focalWords: ["power over your mind", "outside events", "inner strength"]
      },
      {
        id: 2,
        speaker: 'Marcus',
        text: "The impediment to action advances action. What stands in the way becomes the way.",
        vietnamese: "Trở ngại đối với hành động chính là động lực thúc đẩy hành động. Những gì cản đường bạn sẽ biến thành con đường bạn đi.",
        ipa: "/ði ɪmˈpɛdɪmənt tuː ˈækʃn ədˈvɑːnsɪz ˈækʃn. wɒt stændz ɪn ðə weɪ bɪˈkʌmz ðə weɪ/",
        linkingHints: "impediment to -> im-pe-di-men-tuh | stands in -> stan-dzin",
        focalWords: ["impediment", "advances action", "becomes the way"]
      },
      {
        id: 3,
        speaker: 'Marcus',
        text: "When you arise in the morning think of what a precious privilege it is to be alive, to think, to enjoy, and to love.",
        vietnamese: "Khi bạn thức dậy vào mỗi buổi sớm mai, hãy nghĩ về đặc ân quý giá nhường nào khi được sống, được suy ngẫm, được thưởng thức và được yêu thương.",
        ipa: "/wɛn juː əˈraɪz ɪn ðə ˈmɔːrnɪŋ θɪŋk ɒv wɒt ə ˈprɛʃəs ˈprɪvəlɪdʒ ɪt ɪz tuː biː əˈlaɪv, tuː θɪŋk, tuː ɪnˈdʒɔɪ, ænd tuː lʌv/",
        linkingHints: "arise in -> a-ri-zin | think of -> thin-kuhv | what a -> wha-tuh",
        focalWords: ["arise", "precious privilege", "to be alive"]
      }
    ]
  },

  // ─── TOEIC PART 3 & 4 (REAL WORKPLACE CONVERSATIONS) ───────────────────────
  {
    id: 'sh-p3-01',
    title: 'Rescheduling a Marketing Meeting (TOEIC Part 3)',
    category: 'toeic-part3',
    level: 'B1 Intermediate',
    topic: 'Office & Scheduling',
    type: 'dialogue',
    speakers: ['Alex (Marketing Lead)', 'Sarah (Project Manager)'],
    description: 'Cuộc hội thoại nơi công sở về việc dời lịch họp do xung đột lịch trình và giải quyết phòng họp.',
    sentences: [
      {
        id: 1,
        speaker: 'Alex',
        text: "Hi Sarah, do you have a quick minute to talk about the quarterly marketing review?",
        vietnamese: "Chào Sarah, bạn có rảnh một phút để nói về buổi đánh giá tiếp thị quý này không?",
        ipa: "/haɪ ˈsɛərə, duː juː hæv ə kwɪk ˈmɪnɪt tuː tɔːk əˈbaʊt ðə ˈkwɔːrtərli ˈmɑːrkɪtɪŋ rɪˈvjuː/",
        linkingHints: "have a -> ha-va | talk about -> tal-kabout",
        focalWords: ["quick minute", "quarterly", "marketing review"]
      },
      {
        id: 2,
        speaker: 'Sarah',
        text: "Sure! Are we still on track to meet in Conference Room B this Thursday afternoon?",
        vietnamese: "Chắc chắn rồi! Chúng ta vẫn theo đúng kế hoạch họp ở Phòng họp B chiều thứ Năm này chứ?",
        ipa: "/ʃʊr! ɑːr wiː stɪl ɒn træk tuː miːt ɪn ˈkɒnfərəns ruːm biː ðɪs ˈθɜːrzdeɪ ˌæftərˈnuːn/",
        linkingHints: "on track -> on-track | meet in -> mee-tin",
        focalWords: ["still on track", "Conference Room B", "Thursday afternoon"]
      },
      {
        id: 3,
        speaker: 'Alex',
        text: "Actually, our regional director will be visiting our client in Chicago that day, so we need to reschedule.",
        vietnamese: "Thực ra, giám đốc khu vực của chúng ta sẽ đi thăm khách hàng ở Chicago hôm đó, nên chúng ta cần dời lịch.",
        ipa: "/ˈæktʃuəli, ˈaʊər ˈriːdʒənl dɪˈrɛktər wɪl biː ˈvɪzɪtɪŋ ˈaʊər ˈklaɪənt ɪn ʃɪˈkɑːɡoʊ ðæt deɪ, soʊ wiː niːd tuː ˌriːˈskɛdʒuːl/",
        linkingHints: "need to -> nee-to | visit our -> vi-si-tour",
        focalWords: ["regional director", "visiting our client", "reschedule"]
      },
      {
        id: 4,
        speaker: 'Sarah',
        text: "I see. How about moving it to Friday morning around ten o'clock? That works for my team.",
        vietnamese: "Tôi hiểu rồi. Vậy dời sang sáng thứ Sáu khoảng 10 giờ thì sao? Giờ đó phù hợp với nhóm của tôi.",
        ipa: "/aɪ siː. haʊ əˈbaʊt ˈmuːvɪŋ ɪt tuː ˈfraɪdeɪ ˈmɔːrnɪŋ əˈraʊnd tɛn əˈklɒk? ðæt wɜːrks fɔːr maɪ tiːm/",
        linkingHints: "How about -> How-wabout | moving it -> moo-ving-git | ten o'clock -> te-no-clock",
        focalWords: ["How about", "Friday morning", "works for my team"]
      }
    ]
  },
  {
    id: 'sh-p4-01',
    title: 'Airport Flight Delay & Gate Change Announcement (TOEIC Part 4)',
    category: 'toeic-part4',
    level: 'B2 Upper-Intermediate',
    topic: 'Airport & Travel',
    type: 'monologue',
    speakers: ['Airport Announcer'],
    description: 'Thông báo loa phát thanh sân bay về việc đổi cửa khởi hành và hoãn chuyến bay do thời tiết xấu.',
    sentences: [
      {
        id: 1,
        speaker: 'Announcer',
        text: "Attention all passengers on Pacific Coast Airlines Flight 408 with nonstop service to Seattle.",
        vietnamese: "Xin quý hành khách trên chuyến bay 408 của hãng Pacific Coast Airlines bay thẳng đến Seattle chú ý.",
        ipa: "/əˈtɛnʃn ɔːl ˈpæsɪndʒərz ɒn pəˈsɪfɪk koʊst ˈeərlaɪnz flaɪt fɔːr-oʊ-eɪt wɪð ˌnɒnˈstɒp ˈsɜːrvɪs tuː siˈætəl/",
        linkingHints: "Attention all -> at-ten-shuh-nall | Flight 408 -> fligh-for-oh-eight",
        focalWords: ["passengers", "nonstop service", "flight number"]
      },
      {
        id: 2,
        speaker: 'Announcer',
        text: "Due to severe thunderstorm warnings along the flight corridor, boarding will be delayed by forty-five minutes.",
        vietnamese: "Do cảnh báo dông bão nghiêm trọng dọc theo hành lang bay, thời gian lên máy bay sẽ bị lùi lại 45 phút.",
        ipa: "/djuː tuː sɪˈvɪər ˈθʌndərstɔːrm ˈwɔːrnɪŋz əˈlɒŋ ðə flaɪt ˈkɒrɪdɔːr, ˈbɔːrdɪŋ wɪl biː dɪˈleɪd baɪ ˈfɔːrti faɪv ˈmɪnɪts/",
        linkingHints: "Due to -> dyoo-tuh | delayed by -> de-lay-dby",
        focalWords: ["severe thunderstorm", "flight corridor", "delayed"]
      },
      {
        id: 3,
        speaker: 'Announcer',
        text: "Additionally, our departure gate has been moved from Gate B12 to Gate C24 in the international concourse.",
        vietnamese: "Ngoài ra, cửa khởi hành đã được chuyển từ Cổng B12 sang Cổng C24 ở sảnh quốc tế.",
        ipa: "/əˈdɪʃnəli, ˈaʊər dɪˈpɑːrtʃər ɡeɪt hæz biːn muːvd frɒm ɡeɪt biː-twɛlv tuː ɡeɪt siː-twɛnti-fɔːr ɪn ði ˌɪntərˈnæʃnəl ˈkɒŋkɔːrs/",
        linkingHints: "departure gate -> de-par-chur-gate | has been moved -> has-bin-moovd",
        focalWords: ["departure gate", "international concourse"]
      },
      {
        id: 4,
        speaker: 'Announcer',
        text: "Please present your boarding pass at the counter to receive complimentary snack vouchers.",
        vietnamese: "Vui lòng xuất trình thẻ lên máy bay tại quầy để nhận phiếu đồ ăn nhẹ miễn phí.",
        ipa: "/pliːz prɪˈzɛnt jɔːr ˈbɔːrdɪŋ pɑːs æt ðə ˈkaʊntər tuː rɪˈsiːv ˌkɒmplɪˈmɛntri snæk ˈvaʊtʃərz/",
        linkingHints: "present your -> pre-zen-cher | at the -> a-the",
        focalWords: ["boarding pass", "complimentary", "snack vouchers"]
      }
    ]
  },

  // ─── CONNECTED SPEECH: LINKING WORDS, FLAP T & INTONATION ─────────────────
  {
    id: 'sh-cs-01',
    title: 'Mastering American Connected Speech and Reductions',
    category: 'connected-speech',
    level: 'B1 Intermediate',
    topic: 'Pronunciation & Flow',
    type: 'speech',
    speakers: ['Pronunciation Coach'],
    description: 'Luyện tập kỹ thuật nuốt âm, nối âm (Liaison) và Flap T để nói tiếng Anh trôi chảy như người bản xứ.',
    sentences: [
      {
        id: 1,
        speaker: 'Coach',
        text: "What are you going to do this weekend? turns into: Whatcha gonna do this weekend?",
        vietnamese: "\"What are you going to do this weekend?\" khi nói nhanh sẽ biến thành: \"Whatcha gonna do this weekend?\"",
        ipa: "/wɒt ɑːr juː ˈɡoʊɪŋ tuː duː ðɪs ˌwiːkˈɛnd -> ˈwɒtʃə ˈɡənə duː ðɪs ˌwiːkˈɛnd/",
        linkingHints: "What are you -> Whatcha | going to -> gonna",
        focalWords: ["Whatcha gonna do", "connected speech reduction"]
      },
      {
        id: 2,
        speaker: 'Coach',
        text: "Notice how native speakers connect the consonant at the end of a word to the vowel at the start of the next.",
        vietnamese: "Hãy để ý cách người bản ngữ nối phụ âm cuối của một từ với nguyên âm đầu của từ tiếp theo.",
        ipa: "/ˈnoʊtɪs haʊ ˈneɪtɪv ˈspiːkərz kəˈnɛkt ðə ˈkɒnsənənt æt ði ɛnd ɒv ə wɜːrd tuː ðə ˈvaʊəl æt ðə stɑːrt ɒv ðə nɛkst/",
        linkingHints: "end of a -> en-duh-vuh | vowel at the -> vow-wul-lat-the",
        focalWords: ["consonant to vowel", "smooth linking"]
      },
      {
        id: 3,
        speaker: 'Coach',
        text: "Practice saying 'Check it out' as 'Che-ki-tout' and 'Pick it up' as 'Pi-ki-tup' for effortless natural rhythm.",
        vietnamese: "Hãy luyện nói 'Check it out' thành 'Che-ki-tout' và 'Pick it up' thành 'Pi-ki-tup' để có nhịp điệu tự nhiên mượt mà.",
        ipa: "/ˈpræktɪs ˈseɪɪŋ tʃɛk ɪt aʊt æz tʃɛ-kɪ-taʊt ænd pɪk ɪt ʌp æz pɪ-kɪ-tʌp fɔːr ˈɛfərtlɪs ˈnætʃrəl ˈrɪðəm/",
        linkingHints: "Check it out -> Che-ki-tout | Pick it up -> Pi-ki-tup",
        focalWords: ["effortless rhythm", "natural linking"]
      }
    ]
  }
];
