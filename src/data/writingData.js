// ═════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE WRITING DATABASE (TEST-ENGLISH & IELTS STYLE A1 -> C1)
// ═════════════════════════════════════════════════════════════════════════════

export const WRITING_LEVELS = [
  { id: 'A1', name: 'A1 Elementary', icon: 'fa-seedling', desc: 'Viết về gia đình, thói quen hàng ngày, khu phố' },
  { id: 'A2', name: 'A2 Pre-intermediate', icon: 'fa-shoe-prints', desc: 'Blog du lịch, email hỏi thông tin, đánh giá nhà hàng' },
  { id: 'B1', name: 'B1 Intermediate', icon: 'fa-feather', desc: 'Bài văn nêu quan điểm (Opinion Essay), thư phàn nàn' },
  { id: 'B1-plus', name: 'B1+ Upper-intermediate', icon: 'fa-compass', desc: 'Bài luận giải pháp vấn đề (Problem-Solution), thư xin việc' },
  { id: 'B2', name: 'B2 Pre-advanced', icon: 'fa-bolt', desc: 'IELTS Writing Task 2, thảo luận hai luồng ý kiến (Discuss Both Views)' },
  { id: 'C1', name: 'C1 Advanced', icon: 'fa-crown', desc: 'Báo cáo học thuật chuyên sâu & Phân tích đạo đức công nghệ' },
];

export const WRITING_DATABASE = {
  A1: [
    {
      id: 'write-a1-1',
      title: 'Writing about My Family (Describing People)',
      level: 'A1',
      duration: '12 phút',
      img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80',
      desc: 'Học cách viết đoạn văn giới thiệu các thành viên trong gia đình, nghề nghiệp và ngoại hình.',
      modelText: `I would like to tell you about my family. There are four people in my family: my father, my mother, my older brother, and me.

My father is named David. He is 48 years old and works as an engineer. He is tall and has short dark hair. My mother, Sarah, is 45 years old. She is a friendly high school teacher.

My brother, Jack, is a university student studying computer science. We enjoy watching movies together on weekends. I love my family very much.`,
      keyPhrases: [
        'There are ... people in my family (Có ... người trong gia đình tôi)',
        'He/She works as a/an ... (Ông ấy/Bà ấy làm nghề ...)',
        'He is tall with short dark hair (Anh ấy cao với mái tóc đen ngắn)',
        'We enjoy ... together on weekends (Chúng tôi thích cùng nhau ... vào cuối tuần)'
      ],
      exercises: [
        {
          id: 'ex-a1-1-1',
          vi: 'Có bốn người trong gia đình tôi: bố, mẹ, anh trai và tôi.',
          target: 'There are four people in my family: my father, my mother, my older brother, and me.',
          variants: ['There are 4 people in my family: my dad, my mom, my brother, and me.']
        },
        {
          id: 'ex-a1-1-2',
          vi: 'Bố tôi 48 tuổi và làm việc như một kỹ sư.',
          target: 'My father is 48 years old and works as an engineer.',
          variants: ['My dad is 48 years old and he works as an engineer.']
        },
        {
          id: 'ex-a1-1-3',
          vi: 'Chúng tôi thích xem phim cùng nhau vào mỗi cuối tuần.',
          target: 'We enjoy watching movies together on weekends.',
          variants: ['We like watching movies together every weekend.']
        }
      ]
    },
    {
      id: 'write-a1-2',
      title: 'Writing about My Daily Routine',
      level: 'A1',
      duration: '12 phút',
      img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
      desc: 'Sử dụng thì Hiện Tại Đơn và các liên từ thời gian (first, then, after that, finally) để kể về một ngày của bạn.',
      modelText: `Every day, my morning routine begins at 6:30 AM. First, I get out of bed and drink a glass of warm water. Then, I brush my teeth and take a quick shower.

At 7:15 AM, I eat breakfast with toast and orange juice. After that, I leave home and take the bus to work. I usually start work at 8:30 AM.

In the evening, I return home at 6:00 PM, cook dinner, and read a book before going to sleep at 10:30 PM.`,
      keyPhrases: [
        'My morning routine begins at ... (Thói quen buổi sáng của tôi bắt đầu lúc ...)',
        'First, I ... Then, I ... (Đầu tiên tôi ... Sau đó tôi ...)',
        'After that, I leave home (Sau đó, tôi rời khỏi nhà)',
        'In the evening, I return home (Vào buổi tối, tôi trở về nhà)'
      ],
      exercises: [
        {
          id: 'ex-a1-2-1',
          vi: 'Mỗi ngày, tôi thức dậy lúc 6 giờ 30 sáng.',
          target: 'Every day, I wake up at 6:30 AM.',
          variants: ['Every day, I get up at 6:30 in the morning.']
        },
        {
          id: 'ex-a1-2-2',
          vi: 'Sau đó, tôi đánh răng và tắm nhanh.',
          target: 'Then, I brush my teeth and take a quick shower.',
          variants: ['Then I brush my teeth and have a quick shower.']
        }
      ]
    }
  ],

  A2: [
    {
      id: 'write-a2-1',
      title: 'A Blog Post about My Holiday Experience',
      level: 'A2',
      duration: '15 phút',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      desc: 'Viết bài blog chia sẻ về chuyến du lịch đáng nhớ sử dụng thì Quá khứ đơn (Past Simple).',
      modelText: `Last summer, my friends and I traveled to Da Nang for a four-day vacation. The weather was sunny and breezy throughout our trip.

On the first day, we visited My Khe Beach and swam in the crystal-clear ocean. In the evening, we explored the night market and tasted amazing local seafood like grilled squid and shrimp.

It was one of the most memorable vacations of my life because we took hundreds of beautiful photos and created unforgettable memories together.`,
      keyPhrases: [
        'Last summer, my friends and I traveled to ... (Mùa hè năm ngoái, bạn bè và tôi đã đến ...)',
        'The weather was sunny and breezy (Thời tiết có nắng và gió nhẹ)',
        'It was one of the most memorable vacations (Đó là một trong những kỳ nghỉ đáng nhớ nhất)'
      ],
      exercises: [
        {
          id: 'ex-a2-1-1',
          vi: 'Mùa hè năm ngoái, chúng tôi đã đi du lịch Đà Nẵng trong bốn ngày.',
          target: 'Last summer, we traveled to Da Nang for four days.',
          variants: ['Last summer, we went to Da Nang for a four-day trip.']
        },
        {
          id: 'ex-a2-1-2',
          vi: 'Thời tiết có nắng và gió nhẹ trong suốt chuyến đi của chúng tôi.',
          target: 'The weather was sunny and breezy throughout our trip.',
          variants: ['It was sunny and breezy during our whole trip.']
        }
      ]
    },
    {
      id: 'write-a2-2',
      title: 'An Email Requesting Information from a Language School',
      level: 'A2',
      duration: '14 phút',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      desc: 'Viết email trang trọng hỏi về học phí, thời khóa biểu và thủ tục đăng ký khóa học tiếng Anh.',
      modelText: `Dear Admissions Team,

I am writing to inquire about the Intensive English Course starting next month at your institution.

Could you please provide detailed information regarding the weekly timetable, tuition fees, and maximum class sizes? Additionally, I would like to know if there is an online placement test prior to enrollment.

Thank you very much for your time and assistance. I look forward to hearing from you soon.

Sincerely,
Nguyen Van An`,
      keyPhrases: [
        'I am writing to inquire about ... (Tôi viết thư này để hỏi thông tin về ...)',
        'Could you please provide detailed information regarding ... (Bạn có thể vui lòng cung cấp thông tin chi tiết về ...)',
        'I look forward to hearing from you soon (Tôi rất mong sớm nhận được hồi âm từ bạn)'
      ],
      exercises: [
        {
          id: 'ex-a2-2-1',
          vi: 'Tôi viết thư này để hỏi về khóa học tiếng Anh cấp tốc.',
          target: 'I am writing to inquire about the Intensive English Course.',
          variants: ['I am writing to ask about the intensive English class.']
        }
      ]
    }
  ],

  B1: [
    {
      id: 'write-b1-1',
      title: 'An Opinion Essay: Online Learning vs Traditional Classroom',
      level: 'B1',
      duration: '18 phút',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      desc: 'Cấu trúc bài luận nêu quan điểm 4 đoạn hoàn chỉnh (Introduction, Body 1, Body 2, Conclusion).',
      modelText: `In recent years, distance learning has become increasingly widespread due to advancements in digital technology. In my opinion, while online courses offer unparalleled flexibility, traditional classrooms remain essential for social development.

On the one hand, online education allows students to learn at their own pace without geographical boundaries. On the other hand, face-to-face interaction fosters teamwork and emotional intelligence.

In conclusion, a blended approach combining digital convenience with classroom collaboration is the optimal solution.`,
      keyPhrases: [
        'In recent years, ... has become increasingly widespread (Trong những năm gần đây, ... ngày càng phổ biến)',
        'On the one hand, ... On the other hand, ... (Một mặt, ... Mặt khác, ...)',
        'In conclusion, a blended approach is optimal (Tóm lại, giải pháp kết hợp là tối ưu)'
      ],
      exercises: [
        {
          id: 'ex-b1-1-1',
          vi: 'Theo quan điểm của tôi, việc học trực tuyến mang lại sự linh hoạt vượt trội.',
          target: 'In my opinion, online learning offers unparalleled flexibility.',
          variants: ['In my view, e-learning provides exceptional flexibility.']
        },
        {
          id: 'ex-b1-1-2',
          vi: 'Tóm lại, giải pháp kết hợp giữa công nghệ số và lớp học trực tiếp là tối ưu nhất.',
          target: 'In conclusion, a blended approach combining digital convenience with classroom collaboration is optimal.',
          variants: ['In conclusion, combining digital learning and classroom interaction is the best solution.']
        }
      ]
    }
  ],

  'B1-plus': [
    {
      id: 'write-b1p-1',
      title: 'A Problem-Solution Essay: Combating Urban Plastic Waste',
      level: 'B1+',
      duration: '20 phút',
      img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80',
      desc: 'Phân tích nguyên nhân tích tụ rác thải nhựa tại các đô thị và đề xuất hai giải pháp thiết thực.',
      modelText: `The relentless accumulation of single-use plastics represents one of the most pressing environmental crises facing modern metropolises. This phenomenon is predominantly driven by consumer reliance on packaging convenience and insufficient municipal recycling infrastructure.

To alleviate this predicament, municipal authorities should implement stringent levies on disposable plastic bags while subsidizing biodegradable alternatives. Furthermore, widespread public awareness campaigns must be launched in schools and communities to encourage reusable containers.

Ultimately, mitigating plastic pollution necessitates collaborative dedication from both proactive policymakers and conscious citizens.`,
      keyPhrases: [
        'The relentless accumulation of ... represents a pressing crisis (Sự tích tụ liên tục của ... đại diện cho một khủng hoảng cấp bách)',
        'To alleviate this predicament, authorities should ... (Để giảm nhẹ tình trạng này, chính quyền nên ...)',
        'Ultimately, mitigating ... necessitates collaborative dedication (Xét cho cùng, việc giảm thiểu ... đòi hỏi sự cống hiến hợp tác)'
      ],
      exercises: [
        {
          id: 'ex-b1p-1-1',
          vi: 'Chính quyền thành phố nên áp dụng các mức thuế nghiêm ngặt đối với túi nhựa dùng một lần.',
          target: 'Municipal authorities should implement stringent levies on disposable plastic bags.',
          variants: ['City governments should impose strict taxes on single-use plastic bags.']
        }
      ]
    }
  ],

  B2: [
    {
      id: 'write-b2-1',
      title: 'IELTS Writing Task 2: Artificial Intelligence in Healthcare',
      level: 'B2',
      duration: '22 phút',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      desc: 'Bài luận thảo luận hai mặt (Discuss Both Views) về ứng dụng chẩn đoán bệnh của AI so với bác sĩ con người.',
      modelText: `The integration of artificial intelligence into clinical diagnostics has ignited intense global discourse. While proponents argue that machine learning algorithms significantly minimize diagnostic errors, skeptics contend that automated systems lack vital human empathy and clinical intuition.

On the one hand, AI systems can process massive datasets of radiological scans within seconds, identifying malignant tumors far earlier than the human eye. On the other hand, the doctor-patient relationship relies heavily on interpersonal compassion, which no algorithm can authentically replicate.

In conclusion, artificial intelligence should serve as an augmentative tool to assist medical practitioners rather than completely replace them.`,
      keyPhrases: [
        'The integration of ... has ignited intense discourse (Sự tích hợp của ... đã châm ngòi cho cuộc tranh luận sôi nổi)',
        'While proponents argue that ..., skeptics contend that ... (Trong khi những người ủng hộ cho rằng ..., thì những người hoài nghi lập luận rằng ...)',
        '... should serve as an augmentative tool rather than replace ... (... nên đóng vai trò là công cụ hỗ trợ bổ sung thay vì thay thế hoàn toàn ...)'
      ],
      exercises: [
        {
          id: 'ex-b2-1-1',
          vi: 'Trí tuệ nhân tạo nên đóng vai trò như một công cụ hỗ trợ bác sĩ thay vì thay thế họ hoàn toàn.',
          target: 'Artificial intelligence should serve as an augmentative tool to assist doctors rather than replace them completely.',
          variants: ['AI should be an assisting tool for physicians rather than a complete replacement.']
        }
      ]
    }
  ],

  C1: [
    {
      id: 'write-c1-1',
      title: 'Academic Policy Proposal: Ethical Governance of Autonomous Algorithms',
      level: 'C1',
      duration: '25 phút',
      img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      desc: 'Văn bản học thuật chuyên sâu đề xuất khung khổ pháp lý và kiểm toán thuật toán AI chống thiên vị.',
      modelText: `The unbridled deployment of black-box machine learning algorithms in judicial sentencing, automated recruitment, and credit scoring introduces profound systemic vulnerabilities regarding algorithmic bias and democratic accountability.

To counteract these opaque risks, international regulatory bodies must establish standardized algorithmic auditing frameworks that mandate explainability and transparent bias testing prior to public deployment. Moreover, legal liability structures must be codified to ensure technological developers remain accountable for discriminatory automated decisions.

In essence, technological innovation must never outpace foundational human rights and ethical safeguards.`,
      keyPhrases: [
        'The unbridled deployment of ... introduces profound systemic vulnerabilities (Việc triển khai không kiểm soát của ... đem đến những lỗ hổng mang tính hệ thống sâu sắc)',
        'To counteract these opaque risks, regulatory bodies must ... (Để đối phó với những rủi ro thiếu minh bạch này, các cơ quan quản lý phải ...)',
        'In essence, technological innovation must never outpace ethical safeguards (Về bản chất, đổi mới công nghệ không bao giờ được đi trước các biện pháp bảo vệ đạo đức)'
      ],
      exercises: [
        {
          id: 'ex-c1-1-1',
          vi: 'Về bản chất, đổi mới công nghệ không bao giờ được phép đi trước các biện pháp bảo vệ đạo đức và nhân quyền.',
          target: 'In essence, technological innovation must never outpace ethical safeguards and foundational human rights.',
          variants: ['Essentially, technological advancement must never surpass fundamental human rights and ethical protections.']
        }
      ]
    }
  ]
};
