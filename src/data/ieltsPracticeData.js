// ═════════════════════════════════════════════════════════════════════════════
// IELTS PRACTICE REAL-EXAM DATA (LISTENING, READING, WRITING, SPEAKING & AWL)
// ═════════════════════════════════════════════════════════════════════════════

// ─── 0. IELTS LISTENING CAMBRIDGE TESTS & AUDIO SCRIPTS ──────────────────────
export const IELTS_LISTENING_TESTS = [
  {
    id: 'cam12_test1_part1',
    title: 'Cambridge IELTS 12: Family Excursion & Accommodation Booking',
    part: 'Part 1: Everyday Social Context',
    cambridgeBook: 'Cambridge 12 - Test 1',
    durationMinutes: 10,
    scenario: 'A customer calls an excursion booking center to reserve holiday accommodation and activity passes for his family.',
    audioScript: `Agent: Good morning, Highlands Travel and Excursions. How may I assist you today?
Customer: Good morning. I'd like to book some accommodation for a family holiday next month, and also enquire about excursion passes.
Agent: Certainly, sir. May I take your full name first?
Customer: Yes, it's Peter MacIntyre. That's M-A-C-I-N-T-Y-R-E.
Agent: Thank you, Mr. MacIntyre. And a contact mobile number?
Customer: It's 07700 900461.
Agent: Got that. Now, what type of accommodation are you looking for? We have luxury chalets, self-catering apartments, and traditional country cottages.
Customer: We definitely prefer a self-catering cottage with a garden for the children.
Agent: Excellent. How many people will be staying?
Customer: There will be four of us—two adults and two children, aged seven and ten.
Agent: Right. What is your preferred date of arrival?
Customer: We were originally planning for the 10th of July, but my wife's leave was pushed back, so we will arrive on the 17th of July.
Agent: Okay, arriving on the 17th of July for seven nights. We have Rowan Cottage available near Lake Windermere. The standard rate is £850 for the week, with a refundable security deposit of £150.
Customer: That sounds very reasonable. What about local activities?
Agent: We recommend the Lake Steam Cruise on Wednesday morning and the Forest Wildlife Trail on Friday.
Customer: Wonderful. Does the cottage provide bicycles for hire?
Agent: Yes, complimentary bicycles are included for all guests.
Customer: Perfect. One last thing—my younger daughter has a severe peanut allergy.
Agent: Noted on the booking file: peanut allergy, all welcome packs will be strictly nut-free.`,
    questions: [
      {
        id: 'lis_q1',
        type: 'MULTIPLE_CHOICE',
        question: 'How does the customer spell his surname?',
        options: ['A. MacIntire', 'B. MacIntyre', 'C. McIntire', 'D. Mackintyre'],
        correctAnswer: 'B. MacIntyre',
        explanation: 'The customer spells out: M-A-C-I-N-T-Y-R-E (with a "Y" instead of "I").',
      },
      {
        id: 'lis_q2',
        type: 'MULTIPLE_CHOICE',
        question: 'What type of accommodation does Mr. MacIntyre book for his family?',
        options: [
          'A. A luxury wooden chalet',
          'B. A serviced city apartment',
          'C. A self-catering cottage',
          'D. A boutique hotel suite',
        ],
        correctAnswer: 'C. A self-catering cottage',
        explanation: 'Customer explicitly states: "We definitely prefer a self-catering cottage with a garden for the children."',
      },
      {
        id: 'lis_q3',
        type: 'MULTIPLE_CHOICE',
        question: 'What is the confirmed date of arrival for the holiday?',
        options: ['A. 10th July', 'B. 17th July', 'C. 24th July', 'D. 31st July'],
        correctAnswer: 'B. 17th July',
        explanation: 'Distractor trap: The 10th of July was original plan, but arrival was confirmed for 17th July.',
      },
      {
        id: 'lis_q4',
        type: 'MULTIPLE_CHOICE',
        question: 'What is the amount required for the refundable security deposit?',
        options: ['A. £850', 'B. £150', 'C. £200', 'D. £100'],
        correctAnswer: 'B. £150',
        explanation: '£850 is the weekly rate; £150 is the refundable deposit.',
      },
      {
        id: 'lis_q5',
        type: 'MULTIPLE_CHOICE',
        question: 'What complimentary item is included free for all guests at Rowan Cottage?',
        options: [
          'A. Lake boat cruise vouchers',
          'B. Mountain bicycles for hire',
          'C. Private airport shuttle',
          'D. Daily breakfast buffet',
        ],
        correctAnswer: 'B. Mountain bicycles for hire',
        explanation: 'Agent states: "Yes, complimentary bicycles are included for all guests."',
      },
      {
        id: 'lis_q6',
        type: 'MULTIPLE_CHOICE',
        question: 'What dietary requirement must the travel agent record for the customer\'s daughter?',
        options: [
          'A. Gluten intolerance',
          'B. Vegetarian only',
          'C. Severe peanut allergy',
          'D. Dairy-free diet',
        ],
        correctAnswer: 'C. Severe peanut allergy',
        explanation: 'Customer notes: "my younger daughter has a severe peanut allergy... strictly nut-free."',
      },
    ],
  },
  {
    id: 'cam18_test2_part3',
    title: 'Cambridge IELTS 18: Marine Biology Dissertation Consultation',
    part: 'Part 3: Academic Discussion (Tutor & Student)',
    cambridgeBook: 'Cambridge 18 - Test 2',
    durationMinutes: 12,
    scenario: 'A postgraduate student, Jack, meets his academic supervisor, Professor Vance, to evaluate the methodology of his coastal microplastic research.',
    audioScript: `Prof Vance: Come in, Jack. Take a seat. How is your literature review progressing for the coastal microplastic project?
Jack: Well, Professor Vance, I've compiled over forty peer-reviewed articles, but I'm finding substantial discrepancies in how researchers measure sediment concentrations.
Prof Vance: That's a well-known hurdle. Some papers use density separation with concentrated sodium chloride, while others prefer zinc chloride.
Jack: Exactly. Zinc chloride yields a higher extraction rate for denser polymers, but it's much more toxic and expensive.
Prof Vance: Given our laboratory budget and safety regulations, standard brine solution or sodium iodide would be safer for your preliminary trials.
Jack: That makes sense. Regarding the sampling locations along the estuary: I was planning to take samples every fifty metres along the shoreline.
Prof Vance: Fifty metres? That might generate an unmanageable volume of sediment samples for one master's student to process within three months. I'd strongly suggest spacing your transects at two hundred metres instead, but collecting three replicates at each site.
Jack: Replicates at two hundred metres... yes, that would give statistical validity without overwhelming the filtration apparatus.
Prof Vance: Precisely. And what about your analytical spectroscopy? Have you secured training on the FTIR microscope?
Jack: I've booked the introductory workshop for next Tuesday morning.
Prof Vance: Good. Make sure you submit your finalized risk assessment form to the department safety officer at least forty-eight hours prior to field sampling.`,
    questions: [
      {
        id: 'lis_p3_q1',
        type: 'MULTIPLE_CHOICE',
        question: 'What main difficulty has Jack encountered during his literature review?',
        options: [
          'A. A lack of published studies on marine plastic polymers',
          'B. Inconsistent measurement methods among different research papers',
          'C. Unreliable statistical software in the university computer lab',
          'D. Contradictory safety guidelines regarding field expeditions',
        ],
        correctAnswer: 'B. Inconsistent measurement methods among different research papers',
        explanation: 'Jack states: "I\'m finding substantial discrepancies in how researchers measure sediment concentrations."',
      },
      {
        id: 'lis_p3_q2',
        type: 'MULTIPLE_CHOICE',
        question: 'Why does Professor Vance advise against using zinc chloride in Jack\'s experiments?',
        options: [
          'A. It fails to extract high-density plastic polymers effectively.',
          'B. It is too hazardous and costly for the laboratory setting.',
          'C. It cannot dissolve in standard aquatic solutions.',
          'D. It has been prohibited by international maritime law.',
        ],
        correctAnswer: 'B. It is too hazardous and costly for the laboratory setting.',
        explanation: 'Professor notes: "it\'s much more toxic and expensive. Given our laboratory budget and safety regulations, standard brine solution... would be safer."',
      },
      {
        id: 'lis_p3_q3',
        type: 'MULTIPLE_CHOICE',
        question: 'What modification does Professor Vance recommend for the estuary sampling strategy?',
        options: [
          'A. Taking single samples at fifty-metre intervals',
          'B. Increasing distance to two hundred metres with three replicates',
          'C. Restricting sampling exclusively to low-tide periods',
          'D. Hiring commercial diving equipment for deep-water cores',
        ],
        correctAnswer: 'B. Increasing distance to two hundred metres with three replicates',
        explanation: 'Professor Vance: "I\'d strongly suggest spacing your transects at two hundred metres instead, but collecting three replicates at each site."',
      },
      {
        id: 'lis_p3_q4',
        type: 'MULTIPLE_CHOICE',
        question: 'When must Jack submit his department risk assessment form?',
        options: [
          'A. Immediately after Tuesday\'s workshop',
          'B. Within forty-eight hours after processing samples',
          'C. At least forty-eight hours before field sampling begins',
          'D. At the end of the three-month research semester',
        ],
        correctAnswer: 'C. At least forty-eight hours before field sampling begins',
        explanation: 'Prof Vance: "at least forty-eight hours prior to field sampling."',
      },
    ],
  },
];

// ─── 1. IELTS READING ACADEMIC PASSAGES & QUESTIONS ─────────────────────────
export const IELTS_READING_TESTS = [
  {
    id: 'cam17_test1_p1',
    title: 'Cambridge IELTS 17: The Development of the London Underground Railway',
    category: 'Lịch sử & Giao thông đô thị',
    timeAllowed: 20, // minutes
    passage: `[Paragraph A]
In the first half of the 19th century, London's population grew at an astonishing rate, and the central area became extremely congested. In addition, the expansion of the overground railway network resulted in more than 200,000 people arriving in London by train each day, adding to the overcrowded streets. The problem was that the railway termini were located around the periphery of central London, as parliament refused to allow trains into the heart of the city for fear of damaging historic buildings.

[Paragraph B]
Numerous schemes were proposed to solve the congestion problem, but few were considered practical. One Charles Pearson, a solicitor for the City of London, became a tireless campaigner for an underground railway. He argued that it would not only reduce street traffic, but also provide cheap and fast transport for working-class Londoners living in slums, enabling them to move to healthier suburban homes. Although Pearson received little support at first, his persistent efforts gradually won over the City Corporation, which eventually invested £200,000 in the project.

[Paragraph C]
The first line, known as the Metropolitan Railway, was constructed using the 'cut-and-cover' technique. A trench approximately ten metres deep was excavated along the planned route, brick walls and an arch were built to form a tunnel, and the road was rebuilt above. The construction caused immense disruption to local commerce and daily life. Despite these immense obstacles, the line opened between Paddington and Farringdon on 10 January 1863, carrying over 30,000 passengers on its very first day of public operation.

[Paragraph D]
Although the initial service was a tremendous commercial success, passengers suffered severely from the steam and smoke produced by the locomotives. Ventilation shafts were introduced, but the air underground remained noxious and sulfurous. It was not until the late 19th century, with the development of electric power, that true deep-level 'tube' railways could be bored deep beneath London using circular shields, without causing catastrophic street-level disruption.`,
    questions: [
      {
        id: 'q1',
        type: 'TFNG',
        question: 'Railway companies were permitted to build train stations in the heart of London.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Trong Đoạn A có câu: "parliament refused to allow trains into the heart of the city for fear of damaging historic buildings" (Nghị viện từ chối cho phép tàu hỏa vào trung tâm vì sợ làm hỏng các tòa nhà lịch sử). Do đó phát biểu này hoàn toàn trái ngược (FALSE).',
        paragraph: 'Paragraph A',
      },
      {
        id: 'q2',
        type: 'TFNG',
        question: 'Charles Pearson believed the underground railway would help poor workers live in better conditions.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation: 'Trong Đoạn B: "provide cheap and fast transport for working-class Londoners living in slums, enabling them to move to healthier suburban homes" (cung cấp phương tiện giá rẻ cho công nhân chuyển đến vùng ngoại ô lành mạnh hơn) -> TRUE.',
        paragraph: 'Paragraph B',
      },
      {
        id: 'q3',
        type: 'TFNG',
        question: 'The City Corporation immediately approved Charles Pearson\'s proposal without hesitation.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn B nêu rõ: "Although Pearson received little support at first, his persistent efforts gradually won over the City Corporation" (ban đầu nhận được rất ít sự ủng hộ, nỗ lực bền bỉ mới dần thuyết phục được) -> FALSE.',
        paragraph: 'Paragraph B',
      },
      {
        id: 'q4',
        type: 'TFNG',
        question: 'Over 50,000 passengers traveled on the Metropolitan Railway on its opening day.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn C ghi: "carrying over 30,000 passengers on its very first day" (hơn 30.000 khách, không phải hơn 50.000) -> FALSE.',
        paragraph: 'Paragraph C',
      },
      {
        id: 'q5',
        type: 'TFNG',
        question: 'Many shopkeepers received financial compensation for the disruption caused by construction.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'NOT GIVEN',
        explanation: 'Đoạn C có nhắc đến "caused immense disruption to local commerce", nhưng không hề đề cập đến việc các chủ cửa hàng có được đền bù tiền bạc (compensation) hay không -> NOT GIVEN.',
        paragraph: 'Paragraph C',
      },
      {
        id: 'q6',
        type: 'MULTIPLE_CHOICE',
        question: 'What technique was originally used to construct the Metropolitan Railway?',
        options: [
          'A. Deep underground circular boring shields',
          'B. The cut-and-cover excavation trench method',
          'C. Elevated steel viaducts built over roads',
          'D. Hydraulic tunnelling underwater',
        ],
        correctAnswer: 'B. The cut-and-cover excavation trench method',
        explanation: 'Đoạn C ghi: "constructed using the \'cut-and-cover\' technique. A trench approximately ten metres deep was excavated..."',
        paragraph: 'Paragraph C',
      },
      {
        id: 'q7',
        type: 'MULTIPLE_CHOICE',
        question: 'What was the primary environmental problem passengers experienced on early underground trains?',
        options: [
          'A. Overcrowded carriages with lack of seating',
          'B. Excessive water leakage from tunnel roofs',
          'C. Noxious steam and smoke from steam locomotives',
          'D. Frequent electrical malfunctions and blackouts',
        ],
        correctAnswer: 'C. Noxious steam and smoke from steam locomotives',
        explanation: 'Đoạn D ghi: "passengers suffered severely from the steam and smoke produced by the locomotives... the air underground remained noxious and sulfurous."',
        paragraph: 'Paragraph D',
      },
    ],
  },
  {
    id: 'cam18_test2_p2',
    title: 'Cambridge IELTS 18: The Ecological Impact of Urban Rewilding',
    category: 'Môi trường & Sinh thái học',
    timeAllowed: 20,
    passage: `[Paragraph A]
Urban rewilding is an ecological conservation strategy that seeks to restore natural processes and biodiversity within cities. Unlike traditional manicured municipal parks, which typically feature monoculture grass lawns and chemically maintained ornamental flower beds, rewilded spaces allow native flora and fauna to self-regulate with minimal human intervention. This shift in urban planning has gained substantial momentum across European and North American metropolitan areas.

[Paragraph B]
One of the most immediate benefits of urban rewilding is microclimate regulation. Modern cities suffer from the 'urban heat island' effect, where dense concentrations of concrete, glass, and asphalt absorb solar radiation and elevate ambient temperatures by up to 5°C compared to surrounding rural districts. By replacing impervious pavement with multi-layered native vegetation, evapotranspiration is dramatically enhanced, significantly cooling the surrounding air and reducing the demand for artificial air conditioning.

[Paragraph C]
Furthermore, rewilding plays an instrumental role in sustainable stormwater management. As extreme meteorological events become more frequent due to climate change, conventional drainage systems are routinely overwhelmed, leading to destructive urban flash flooding. Deep-rooted indigenous perennial grasses and wetland swales act as natural retention basins, filtering chemical contaminants and permitting rainwater to infiltrate deep aquifers at natural rates.

[Paragraph D]
Despite these unequivocal ecological advantages, municipal authorities often confront considerable public resistance. Many urban citizens perceive unmanaged wild growth as untidy, neglected, or hazardous, fearing that tall grasses harbor disease-carrying ticks and rodents. Landscape architects emphasize that successful rewilding requires 'cues to care'—such as clearly mown perimeter borders, well-crafted educational signage, and sculptural boardwalks—which signal that the landscape is intentionally designed rather than abandoned.`,
    questions: [
      {
        id: 'q8',
        type: 'TFNG',
        question: 'Traditional city parks usually require chemical treatments and monoculture vegetation.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn A: "traditional manicured municipal parks, which typically feature monoculture grass lawns and chemically maintained ornamental flower beds" -> TRUE.',
        paragraph: 'Paragraph A',
      },
      {
        id: 'q9',
        type: 'TFNG',
        question: 'Urban rewilding can help reduce the amount of electricity consumed by air conditioning.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn B: "significantly cooling the surrounding air and reducing the demand for artificial air conditioning" -> TRUE.',
        paragraph: 'Paragraph B',
      },
      {
        id: 'q10',
        type: 'TFNG',
        question: 'Rewilding projects have successfully eliminated flash flooding in all participating cities.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Từ "eliminated... in all participating cities" là khẳng định cực đoan. Bài đọc chỉ nói nó "plays an instrumental role in stormwater management" chứ không triệt tiêu hoàn toàn ở mọi nơi -> FALSE.',
        paragraph: 'Paragraph C',
      },
      {
        id: 'q11',
        type: 'TFNG',
        question: 'All urban residents enthusiastically welcome rewilded landscapes in their neighborhoods.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn D: "municipal authorities often confront considerable public resistance. Many urban citizens perceive unmanaged wild growth as untidy" -> FALSE.',
        paragraph: 'Paragraph D',
      },
      {
        id: 'q12',
        type: 'MULTIPLE_CHOICE',
        question: 'According to Paragraph D, what is meant by "cues to care"?',
        options: [
          'A. Employing full-time gardeners to trim every plant daily',
          'B. Visible design elements showing that a wild landscape is intentionally maintained',
          'C. Distributing brochures door-to-door to warn residents about pests',
          'D. Installing pesticide dispensers along pedestrian walkways',
        ],
        correctAnswer: 'B. Visible design elements showing that a wild landscape is intentionally maintained',
        explanation: 'Đoạn D: "\'cues to care\'—such as clearly mown perimeter borders, well-crafted educational signage... which signal that the landscape is intentionally designed rather than abandoned."',
        paragraph: 'Paragraph D',
      },
    ],
  },
];

// ─── 2. IELTS WRITING TASK 1 & TASK 2 PRACTICE PROMPTS & BAND 8.5 SAMPLES ───
export const IELTS_WRITING_PROMPTS = [
  {
    id: 'w_task1_line',
    taskType: 'Task 1',
    chartType: 'Line Graph',
    title: 'Fast Food Consumption in the UK (1970 - 1990)',
    timeAllowed: 20,
    minWords: 150,
    prompt:
      'The graph below shows the consumption of fish and chips, pizza, and hamburgers in the UK between 1970 and 1990. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataSummary: [
      'Fish & Chips: Bắt đầu ở mức 300 grams/người (1970) -> giảm đều đặn xuống 220 grams (1990).',
      'Pizza: Bắt đầu rất thấp ở 50 grams (1970) -> tăng vọt lên 280 grams (1990), vượt qua Fish & Chips.',
      'Hamburgers: Xuất phát ở mức 100 grams (1970) -> tăng liên tục đạt đỉnh 290 grams (1990).',
    ],
    sampleBand85: `The line graph illustrates the weekly consumption of three distinct fast food categories—fish and chips, pizza, and hamburgers—in the United Kingdom over a 20-year period from 1970 to 1990.

Overall, it is readily apparent that hamburgers and pizza experienced dramatic upward trajectories over the given timeframe, whereas the consumption of fish and chips followed a persistent downward trend. By 1990, hamburgers had emerged as the most widely consumed fast food item in the nation.

In 1970, fish and chips was by far the most popular fast food, with British citizens consuming approximately 300 grams per person per week. However, this figure underwent a gradual yet steady decline over the subsequent two decades, eventually hitting a low of roughly 220 grams by 1990.

In sharp contrast, the consumption of both hamburgers and pizza commenced at relatively modest levels, standing at 100 grams and merely 50 grams per person respectively in 1970. Hamburger intake escalated exponentially, overtaking fish and chips in 1985 before peaking at approximately 290 grams in 1990. Similarly, pizza consumption witnessed a substantial surge throughout the period, finishing at 280 grams in 1990, closely trailing hamburgers.`,
    keyFeatures: [
      'Overview nêu rõ 2 xu hướng tương phản: Hamburger & Pizza tăng vọt, Fish & Chips giảm.',
      'Sử dụng động từ học thuật: experienced dramatic upward trajectories, escalated exponentially, witnessed a substantial surge.',
      'So sánh thời điểm giao thoa: overtaking fish and chips in 1985.',
    ],
  },
  {
    id: 'w_task1_process',
    taskType: 'Task 1',
    chartType: 'Process Diagram',
    title: 'The Manufacturing Process of Instant Noodles',
    timeAllowed: 20,
    minWords: 150,
    prompt:
      'The diagram illustrates how instant noodles are produced in a modern automated factory. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataSummary: [
      'Nguyên liệu thô: Bột mì (Flour) trong silo -> pha trộn với nước & dầu trong bồn trộn.',
      'Tạo hình: Cán mỏng qua các con lăn (Rollers) -> Cắt thành sợi lượn sóng (Dough strips).',
      'Định hình & Chiên: Ép vào khuôn thành vắt mì tròn -> Hấp chín rồi chiên dầu nhanh -> Làm nguội.',
      'Đóng gói: Thêm gói gia vị (Seasoning sachets) và rau củ sấy -> Dán nắp & đóng thùng carton.',
    ],
    sampleBand85: `The provided flow diagram delineates the sequential stages involved in the automated manufacturing and packaging of instant noodles in an industrial facility.

Overall, the process encompasses eight distinct stages, commencing with the storage and blending of raw ingredients and culminating in the sealing and distribution of the finished packaged noodle cups.

At the initial stage, flour stored in bulk storage silos is transferred into a mechanical mixer, where it is thoroughly combined with water and oil to form a consistent dough. Subsequently, this dough mixture is passed through a sequence of heavy rollers that compress it into elongated flat sheets. These sheets are then guided through mechanical cutters, transforming them into signature undulating noodle strands.

Following this, the noodle strands are segmented into uniform disc-shaped portions before being subjected to high-temperature steam. Once cooked, the noodle cakes are flash-fried in hot oil to dehydrate them and ensure long-term shelf stability, after which they are rapidly cooled. In the final phase, the dehydrated cakes are deposited into paper cups alongside dehydrated vegetables and seasoning sachets. Finally, the containers are hermetically sealed with foil lids and packaged into cardboard cartons for commercial dispatch.`,
    keyFeatures: [
      'Sử dụng triệt để câu bị động (Passive Voice): is transferred, are guided, are flash-fried, are hermetically sealed.',
      'Liên từ chỉ thứ tự thời gian mượt mà: At the initial stage, Subsequently, Following this, In the final phase.',
    ],
  },
  {
    id: 'w_task2_opinion',
    taskType: 'Task 2',
    chartType: 'Agree / Disagree Essay',
    title: 'Artificial Intelligence in Higher Education',
    timeAllowed: 40,
    minWords: 250,
    prompt:
      'Some people believe that artificial intelligence will soon replace human professors in universities, making traditional campus degrees obsolete. To what extent do you agree or disagree with this statement?',
    sampleBand85: `In contemporary academic discourse, the rapid proliferation of artificial intelligence has sparked intense debate regarding the future of higher education. While some commentators argue that AI-powered algorithmic systems will inevitably supersede human university professors and render campus degrees obsolete, I fundamentally disagree with this contention, as machines lack the indispensable human faculties of mentorship, ethical reasoning, and pedagogical adaptability.

Admittedly, artificial intelligence possesses unprecedented capabilities in disseminating and synthesising information. Sophisticated language models and automated tutoring platforms can analyze complex academic datasets instantaneously, providing students with round-the-clock tailored explanations and personalized study trajectories. In fields centered around objective facts and rote computation, such as introductory calculus or basic syntax programming, AI can indeed augment learning efficiency. Furthermore, digital coursework offers geographic flexibility, allowing learners worldwide to access high-caliber instructional materials without relocating to expensive university campuses.

Nevertheless, higher education extends far beyond the passive absorption of theoretical knowledge; it is an intrinsically social and transformative endeavor. Human educators provide pastoral guidance, inspire intellectual curiosity, and cultivate critical thinking through dynamic seminar discourse—qualities that algorithms cannot replicate. A professor does not merely deliver lectures, but also models intellectual skepticism, evaluates nuanced philosophical arguments, and provides compassionate encouragement when a student grapples with academic distress. Moreover, attending a university fosters interpersonal collaboration, cross-cultural diplomacy, and emotional maturity, which are vital competencies demanded in today's globalized workforce.

In conclusion, although artificial intelligence will undeniably serve as a formidable pedagogical tool that enriches learning, it cannot substitute the profound human connection, ethical stewardship, and holistic mentorship embodied by university professors. Therefore, physical university campuses and human faculty will remain paramount pillars of higher education for the foreseeable future.`,
    keyFeatures: [
      'Mở bài rõ ràng: Nêu định hướng lập luận và khẳng định phản đối hoàn toàn (fundamentally disagree).',
      'Đoạn thân bài 1 thừa nhận khách quan thế mạnh của AI trước khi bẻ gãy ở đoạn 2.',
      'Từ vựng C1/C2 học thuật phong phú: pedagogical adaptability, unprecedented capabilities, pastoral guidance, intellectual skepticism.',
      'Kết bài tóm tắt và tái khẳng định luận điểm dứt khoát.',
    ],
  },
];

// ─── 3. IELTS SPEAKING SIMULATOR MOCK INTERVIEW DATA ────────────────────────
export const IELTS_SPEAKING_INTERVIEWS = [
  {
    id: 'speaking_mock_1',
    title: 'Speaking Mock Test 1: University Life, Travel & Future Ambitions',
    part1: {
      intro: 'In this first part, I will ask you some general questions about yourself, your studies, and your daily life.',
      questions: [
        {
          id: 'sp1_q1',
          question: 'Are you currently a student or do you work?',
          modelAnswer: 'Currently, I am an undergraduate student majoring in Information Technology. I am in my final academic year, so my schedule is primarily occupied with capstone research projects and preparing for my upcoming IELTS examination.',
          tips: 'Trả lời trực diện trong câu đầu tiên, sau đó mở rộng 1-2 câu giải thích chi tiết.',
        },
        {
          id: 'sp1_q2',
          question: 'Why did you choose this particular field of study?',
          modelAnswer: 'Ever since high school, I have been captivated by technological innovation and software architecture. Furthermore, pursuing a degree in computer science offers exceptional career prospects and international mobility, especially as I am aiming to pursue a Master’s degree overseas.',
          tips: 'Nhấn mạnh động lực cá nhân kết hợp định hướng du học tương lai.',
        },
        {
          id: 'sp1_q3',
          question: 'Do you prefer studying alone or with a group of classmates?',
          modelAnswer: 'Frankly speaking, I would say it depends on the nature of the academic task. When it comes to absorbing dense theoretical concepts, I prefer solitude because it eliminates distractions. However, for collaborative programming assignments, brain-storming in a study group is undeniably more productive.',
          tips: 'Dùng từ nối tự nhiên: Frankly speaking, When it comes to..., However.',
        },
      ],
    },
    part2: {
      topic: 'Describe a significant challenge you faced and successfully overcame.',
      prompts: [
        'What the challenge was',
        'When and why it occurred',
        'What specific actions you took to resolve it',
        'And explain what valuable lesson you learned from the experience',
      ],
      prepTimeSeconds: 60,
      speakingTimeSeconds: 120,
      notesSample: '1. Challenge: Overcoming IELTS plateau at 5.5 while working\n2. Actions: Made strict daily 4-slot routine, used Cam 17-19, error notebook\n3. Result: Jumped to 7.0 in mock test, regained confidence\n4. Lesson: Consistency & error analysis beat mindless cramming',
      modelTranscript: `I would like to share an experience regarding a daunting academic hurdle that I encountered about six months ago. At that time, I was preparing for the IELTS exam alongside my university coursework, but my scores had stagnated stubbornly around the 5.5 band, which caused me immense anxiety since my dream university in Australia required a minimum of 6.5 overall with no band under 6.0.

To overcome this discouraging impasse, I completely revamped my learning methodology. Rather than blindly doing multiple mock tests every day without reflecting, I implemented a disciplined four-slot daily schedule. Every morning, I focused on high-focus listening and reading using authentic Cambridge past papers. Crucially, I maintained a comprehensive 'Error Notebook' where I cataloged every single mistake, identifying whether it stemmed from a tricky distractor, vocabulary deficiency, or poor time management.

In the afternoons and evenings, I dedicated myself to writing essays and practicing speaking aloud into my voice recorder. Whenever I encountered an unfamiliar academic collocation, I immediately reviewed it using spaced repetition flashcards.

Gradually, within ten weeks of persistent execution, my test scores improved remarkably, surpassing 7.0 in my full-length diagnostic exams. This challenging endeavor taught me an invaluable lifelong lesson: achieving an ambitious objective is rarely about innate genius; rather, it hinges upon systematic strategy, emotional resilience, and honest self-critique.`,
    },
    part3: {
      intro: 'Now let us consider some wider questions related to challenges, personal resilience, and education.',
      questions: [
        {
          id: 'sp3_q1',
          question: 'Do you think young people today face more intense pressure than previous generations?',
          modelAnswer: 'Undeniably, yes. While previous generations contended with physical hardships, modern youths navigate intense psychological pressure driven by hyper-competitive global job markets and social media comparison. To secure lucrative employment, students must not only achieve academic excellence, but also acquire foreign language credentials and professional internships simultaneously.',
        },
        {
          id: 'sp3_q2',
          question: 'How can educational institutions better prepare students to handle adversity?',
          modelAnswer: 'In my view, universities should integrate emotional intelligence and problem-solving workshops directly into their curricula. Rather than merely assessing theoretical regurgitation, educators ought to design experiential group projects that simulate real-world crises, allowing students to build resilience and conflict resolution skills in a secure environment.',
        },
      ],
    },
  },
];

// ─── 4. ACADEMIC WORD LIST (AWL) 570 WORDS - CORE STUDY DATA ───────────────
export const AWL_SUBLISTS = [
  {
    sublist: 1,
    title: 'Sublist 1: Cốt Lõi Tần Suất Cao Nhất (Most Frequent Academic Terms)',
    words: [
      {
        word: 'analyze',
        pos: 'verb',
        ipa: '/ˈæn.əl.aɪz/',
        meaning: 'Phân tích chi tiết từng bộ phận',
        definition: 'To examine something in detail in order to understand it or find out what it consists of.',
        example: 'Researchers analyzed the demographic data to discern emerging migration trends.',
        collocations: 'analyze data, analyze thoroughly, statistical analysis',
      },
      {
        word: 'approach',
        pos: 'noun / verb',
        ipa: '/əˈproʊtʃ/',
        meaning: 'Phương pháp tiếp cận / Tiếp cận',
        definition: 'A way of dealing with something, or the action of coming closer.',
        example: 'A multidisciplinary approach is imperative when tackling global climate change.',
        collocations: 'holistic approach, innovative approach, adopt an approach',
      },
      {
        word: 'assess',
        pos: 'verb',
        ipa: '/əˈses/',
        meaning: 'Đánh giá, thẩm định',
        definition: 'To judge or decide the amount, value, quality, or importance of something.',
        example: 'The committee was appointed to assess the environmental impact of urban expansion.',
        collocations: 'assess the impact, assess performance, comprehensive assessment',
      },
      {
        word: 'assume',
        pos: 'verb',
        ipa: '/əˈsuːm/',
        meaning: 'Giả định, cho rằng (chưa có bằng chứng)',
        definition: 'To accept something to be true without question or definitive proof.',
        example: 'It is erroneous to assume that technological advancement automatically guarantees societal prosperity.',
        collocations: 'safely assume, assume responsibility, underlying assumption',
      },
      {
        word: 'authority',
        pos: 'noun',
        ipa: '/əˈθɔːr.ə.t̬i/',
        meaning: 'Chính quyền, cơ quan có thẩm quyền / Chuyên gia uy tín',
        definition: 'The moral or legal right to rule; an expert whose views are respected.',
        example: 'Municipal authorities must impose stringent regulations on industrial emissions.',
        collocations: 'governing authority, question authority, recognized authority',
      },
      {
        word: 'concept',
        pos: 'noun',
        ipa: '/ˈkɑːn.sept/',
        meaning: 'Khái niệm, ý niệm trừu tượng',
        definition: 'An abstract principle or idea.',
        example: 'The concept of sustainable development reconciles economic progress with ecological balance.',
        collocations: 'fundamental concept, grasp the concept, conceptual framework',
      },
      {
        word: 'consistent',
        pos: 'adj',
        ipa: '/kənˈsɪs.tənt/',
        meaning: 'Nhất quán, kiên định, không thay đổi',
        definition: 'Always behaving or happening in a similar, especially positive, way.',
        example: 'Consistent daily revision is far more effective than intermittent cramming before exams.',
        collocations: 'consistent results, consistent with findings, remain consistent',
      },
      {
        word: 'establish',
        pos: 'verb',
        ipa: '/ɪˈstæb.lɪʃ/',
        meaning: 'Thiết lập, thành lập, chứng minh rõ ràng',
        definition: 'To start having a relationship with, or to discover facts that prove something.',
        example: 'Extensive empirical trials were conducted to establish the efficacy of the new vaccine.',
        collocations: 'establish guidelines, establish a correlation, newly established',
      },
      {
        word: 'indicate',
        pos: 'verb',
        ipa: '/ˈɪn.də.keɪt/',
        meaning: 'Chỉ ra, biểu thị, cho thấy',
        definition: 'To show, point, or make clear in another way.',
        example: 'The latest statistical indicators indicate a robust resurgence in renewable energy investment.',
        collocations: 'clearly indicate, indicate a tendency, empirical indicator',
      },
      {
        word: 'significant',
        pos: 'adj',
        ipa: '/sɪɡˈnɪf.ə.kənt/',
        meaning: 'Đáng kể, có ý nghĩa quan trọng',
        definition: 'Important or noticeable; having or likely to have a major effect.',
        example: 'There was a significant disparity between rural and metropolitan household incomes.',
        collocations: 'statistically significant, significant difference, play a significant role',
      },
    ],
  },
  {
    sublist: 2,
    title: 'Sublist 2: Thuật Ngữ Nghiên Cứu & Đánh Giá (Research & Academic Evaluation)',
    words: [
      {
        word: 'acquire',
        pos: 'verb',
        ipa: '/əˈkwaɪ.ɚ/',
        meaning: 'Thu nhận, đạt được (kiến thức, kỹ năng)',
        definition: 'To obtain or learn something through personal effort or study.',
        example: 'Studying abroad enables students to acquire cross-cultural communication competencies.',
        collocations: 'acquire knowledge, language acquisition, newly acquired',
      },
      {
        word: 'conduct',
        pos: 'verb / noun',
        ipa: '/kənˈdʌkt/',
        meaning: 'Tiến hành (khảo sát, nghiên cứu) / Hành vi',
        definition: 'To organize and perform a particular activity, especially research or a study.',
        example: 'Scientists conducted an extensive survey across six continents.',
        collocations: 'conduct research, conduct an investigation, ethical conduct',
      },
      {
        word: 'consequence',
        pos: 'noun',
        ipa: '/ˈkɑːn.sə.kwəns/',
        meaning: 'Hậu quả, kết quả tất yếu',
        definition: 'A result of a particular action or situation, often one that is bad or not convenient.',
        example: 'Severe soil erosion is a direct consequence of unconstrained deforestation.',
        collocations: 'unintended consequence, disastrous consequences, as a consequence',
      },
      {
        word: 'evaluate',
        pos: 'verb',
        ipa: '/ɪˈvæl.ju.eɪt/',
        meaning: 'Đánh giá kỹ lưỡng giá trị hoặc chất lượng',
        definition: 'To judge the value, quality, importance, or condition of something carefully.',
        example: 'Examiners evaluate IELTS candidates based on four rigorous assessment criteria.',
        collocations: 'critically evaluate, evaluate effectiveness, formal evaluation',
      },
      {
        word: 'impact',
        pos: 'noun / verb',
        ipa: '/ˈɪm.pækt/',
        meaning: 'Tác động mạnh mẽ / Tác động đến',
        definition: 'A powerful effect that something, especially something new, has on a situation or person.',
        example: 'Urbanization has exerted a profound impact on indigenous wildlife habitats.',
        collocations: 'profound impact, adverse impact, impact significantly',
      },
      {
        word: 'maintain',
        pos: 'verb',
        ipa: '/meɪnˈteɪn/',
        meaning: 'Duy trì, bảo toàn / Khẳng định quan điểm',
        definition: 'To continue to have; to keep in existence, or to express firmly that something is true.',
        example: 'The author maintains that technological automation will generate more employment than it destroys.',
        collocations: 'maintain standards, maintain momentum, maintain that...',
      },
      {
        word: 'obtain',
        pos: 'verb',
        ipa: '/əbˈteɪn/',
        meaning: 'Đạt được, thu được bằng nỗ lực',
        definition: 'To get something, especially by asking for it, buying it, or making an effort.',
        example: 'Candidates must obtain a minimum band score of 6.5 to be eligible for international admission.',
        collocations: 'obtain permission, obtain credentials, obtain evidence',
      },
      {
        word: 'potential',
        pos: 'adj / noun',
        ipa: '/poʊˈten.ʃəl/',
        meaning: 'Tiềm năng, tiềm tàng / Khả năng phát triển',
        definition: 'Someone\'s or something\'s ability to develop, achieve, or succeed.',
        example: 'Artificial intelligence possesses the potential to revolutionize diagnostic medicine.',
        collocations: 'unlock potential, potential hazard, high potential',
      },
    ],
  },
  {
    sublist: 3,
    title: 'Sublist 3: Phân Tích Luận Điểm & Dữ Liệu (Argumentation & Analysis)',
    words: [
      {
        word: 'alternative',
        pos: 'noun / adj',
        ipa: '/ɑːlˈtɝː.nə.t̬ɪv/',
        meaning: 'Phương án thay thế / Thay thế',
        definition: 'Something that is different from something else, especially from what is usual, and offering the possibility of choice.',
        example: 'Solar and wind energy provide viable alternatives to carbon-intensive fossil fuels.',
        collocations: 'viable alternative, attractive alternative, alternative solution',
      },
      {
        word: 'circumstance',
        pos: 'noun',
        ipa: '/ˈsɝː.kəm.stæns/',
        meaning: 'Hoàn cảnh, tình huống xung quanh',
        definition: 'A condition or fact connected with or having an effect on an event or action.',
        example: 'Under exceptional circumstances, students may apply for a scholarship deadline extension.',
        collocations: 'unforeseen circumstances, in difficult circumstances, under no circumstances',
      },
      {
        word: 'deduce',
        pos: 'verb',
        ipa: '/dɪˈduːs/',
        meaning: 'Suy luận logic từ các bằng chứng có sẵn',
        definition: 'To reach an answer or a decision by thinking carefully about the known facts.',
        example: 'From the statistical distribution, economists deduced that consumer spending had rebounded.',
        collocations: 'deduce from, logically deduce, deductive reasoning',
      },
      {
        word: 'fund',
        pos: 'noun / verb',
        ipa: '/fʌnd/',
        meaning: 'Nguồn quỹ, kinh phí / Cấp vốn tài trợ',
        definition: 'An amount of money saved, collected, or provided for a particular purpose.',
        example: 'The national government allocated substantial funds to subsidize green energy research.',
        collocations: 'allocate funds, government-funded, mutual fund',
      },
      {
        word: 'imply',
        pos: 'verb',
        ipa: '/ɪmˈplaɪ/',
        meaning: 'Ngụ ý, hàm ý, gợi ý gián tiếp',
        definition: 'To communicate an idea or feeling without stating it directly.',
        example: 'The preliminary survey results imply that public transit satisfaction has substantially deteriorated.',
        collocations: 'strongly imply, imply that..., implicit meaning',
      },
    ],
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// 5. IELTS DIAGNOSTIC PLACEMENT TEST (BÀI TEST ĐÁNH GIÁ NĂNG LỰC ĐẦU VÀO)
// 25 câu hỏi chuẩn hóa đa kỹ năng để xác định mốc xuất phát chuẩn xác (Band 3.5 -> 7.0+)
// ═════════════════════════════════════════════════════════════════════════════
export const IELTS_PLACEMENT_TEST = {
  id: 'ielts_diagnostic_placement_2026',
  title: 'Bài Test Đánh Giá Năng Lực IELTS Đầu Vào Chuẩn Quốc Tế',
  timeAllowedMinutes: 25,
  totalQuestions: 25,
  sections: [
    { id: 'sec_listening', name: 'Section 1: Listening Comprehension', questionCount: 6 },
    { id: 'sec_reading', name: 'Section 2: Academic Reading Comprehension', questionCount: 7 },
    { id: 'sec_grammar', name: 'Section 3: Academic Grammar & Structure', questionCount: 6 },
    { id: 'sec_vocab', name: 'Section 4: Academic Vocabulary (AWL)', questionCount: 6 },
  ],
  questions: [
    // ─── SECTION 1: LISTENING & PHONETICS (Q1 - Q6) ──────────────────────────
    {
      id: 'pt_q1',
      section: 'listening',
      skill: 'Listening',
      audioText: 'Good morning, Riverside Hotel reservations. Can I take your surname, please? - Yes, it is MacIntyre, spelled M-A-C-I-N-T-Y-R-E.',
      question: 'How does the caller spell his surname?',
      options: ['A. MacIntire', 'B. MacIntyre', 'C. McIntire', 'D. Mackintyre'],
      correctAnswer: 'B. MacIntyre',
      explanation: 'Trong audio đánh vần từng chữ cái: M-A-C-I-N-T-Y-R-E (chữ "Y" thay vì chữ "I").',
    },
    {
      id: 'pt_q2',
      section: 'listening',
      skill: 'Listening',
      audioText: 'The standard conference ticket was originally ninety pounds, but if you register before Friday, it is reduced to seventy-five pounds. Students pay fifty pounds.',
      question: 'How much does a regular attendee pay if they register before Friday?',
      options: ['A. £90', 'B. £75', 'C. £50', 'D. £65'],
      correctAnswer: 'B. £75',
      explanation: 'Giá gốc là £90 (bẫy ban đầu), sinh viên là £50 (bẫy đối tượng), người đăng ký trước thứ Sáu được giảm còn £75.',
    },
    {
      id: 'pt_q3',
      section: 'listening',
      skill: 'Listening',
      audioText: 'We initially scheduled the biology tutorial for room 4B, but due to water leakage, we have relocated to the seminar room on the third floor, room 302.',
      question: 'To which room has the biology tutorial been relocated?',
      options: ['A. Room 4B', 'B. Room 3B', 'C. Room 302', 'D. Room 402'],
      correctAnswer: 'C. Room 302',
      explanation: 'Room 4B là địa điểm ban đầu nhưng bị hủy do rò rỉ nước. Phòng học thực tế được chuyển sang room 302 ở tầng 3.',
    },
    {
      id: 'pt_q4',
      section: 'listening',
      skill: 'Listening',
      audioText: 'Professor Clark emphasized that the field research project must be submitted no later than midnight on April 23rd, though the online portal opens on the 16th.',
      question: 'What is the final submission deadline for the research project?',
      options: ['A. 16th April', 'B. 23rd April', 'C. 24th April', 'D. 30th April'],
      correctAnswer: 'B. 23rd April',
      explanation: '"no later than midnight on April 23rd" -> hạn chót chính thức là ngày 23 tháng 4 (ngày 16 chỉ là ngày mở cổng).',
    },
    {
      id: 'pt_q5',
      section: 'listening',
      skill: 'Listening',
      audioText: 'I used to believe that solar panels required direct intense sunlight to function efficiently, but modern photovoltaic cells can generate substantial electricity even beneath overcast skies.',
      question: 'What does the speaker currently understand about modern photovoltaic cells?',
      options: [
        'A. They only operate efficiently under direct, blazing sunlight.',
        'B. They can produce substantial electricity even under overcast skies.',
        'C. Their maintenance costs are prohibitively expensive for households.',
        'D. They become completely non-functional in cold climate zones.',
      ],
      correctAnswer: 'B. They can produce substantial electricity even under overcast skies.',
      explanation: '"modern photovoltaic cells can generate substantial electricity even beneath overcast skies" (overcast = trời nhiều mây/u ám).',
    },
    {
      id: 'pt_q6',
      section: 'listening',
      skill: 'Listening',
      audioText: 'The key factor contributing to urban heat retention is the lack of permeable green spaces, which prevents evaporative cooling from occurring naturally.',
      question: 'According to the speaker, what is the primary cause of urban heat retention?',
      options: [
        'A. A deficiency of permeable green areas that facilitate evaporative cooling.',
        'B. An unprecedented surge in privately owned motor vehicle emissions.',
        'C. Residual radiation escaping from high-density nuclear power stations.',
        'D. Tropical monsoon winds that carry warm maritime currents inland.',
      ],
      correctAnswer: 'A. A deficiency of permeable green areas that facilitate evaporative cooling.',
      explanation: '"lack of permeable green spaces, which prevents evaporative cooling" -> đồng nghĩa với deficiency of permeable green areas.',
    },

    // ─── SECTION 2: READING COMPREHENSION (Q7 - Q13) ─────────────────────────
    {
      id: 'pt_q7',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'Marine bioluminescence—the production of visible light by ocean organisms—serves predominantly as an anti-predator defense mechanism. When threatened by carnivorous fish, certain deep-sea dinoflagellates emit sudden blinding flashes of light that either startle the aggressor or reveal its position to larger secondary predators.',
      question: 'Do the following statement agree with the information in the passage? "Marine bioluminescence is primarily utilized to attract prospective mates during the breeding season."',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'FALSE',
      explanation: 'Đoạn văn khẳng định: "serves predominantly as an anti-predator defense mechanism" (chủ yếu là cơ chế tự vệ), đối lập hoàn toàn với mục đích thu hút bạn tình.',
    },
    {
      id: 'pt_q8',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'Marine bioluminescence—the production of visible light by ocean organisms—serves predominantly as an anti-predator defense mechanism. When threatened by carnivorous fish, certain deep-sea dinoflagellates emit sudden blinding flashes of light that either startle the aggressor or reveal its position to larger secondary predators.',
      question: 'According to the passage, when dinoflagellates are attacked, whose attention can their light flashes draw to the attacker?',
      options: [
        'A. Marine researchers conducting nocturnal ecological surveys.',
        'B. Larger secondary predatory creatures in the surrounding waters.',
        'C. Their own offspring sheltering inside adjacent coral structures.',
        'D. Deep-sea commercial trawlers harvesting marine organisms.',
      ],
      correctAnswer: 'B. Larger secondary predatory creatures in the surrounding waters.',
      explanation: '"reveal its position to larger secondary predators" -> chỉ điểm vị trí kẻ săn mồi cho các loài săn mồi thứ cấp lớn hơn.',
    },
    {
      id: 'pt_q9',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'Unlike classical economic models which assume rational decision-making, behavioral economics demonstrates that cognitive biases systematically distort consumer evaluations. For instance, the "loss aversion" principle indicates that psychological distress from losing $100 is approximately twice as intense as the gratification derived from gaining the equivalent sum.',
      question: 'Do the following statement agree with the information in the passage? "Individuals generally experience identical psychological intensity when gaining or losing $100."',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'FALSE',
      explanation: 'Đoạn văn chỉ ra: nỗi đau tâm lý khi mất 100$ gấp đôi mức độ thỏa mãn khi nhận được số tiền tương đương -> câu khẳng định bằng nhau là FALSE.',
    },
    {
      id: 'pt_q10',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'Unlike classical economic models which assume rational decision-making, behavioral economics demonstrates that cognitive biases systematically distort consumer evaluations. For instance, the "loss aversion" principle indicates that psychological distress from losing $100 is approximately twice as intense as the gratification derived from gaining the equivalent sum.',
      question: 'Which of the following words or phrases is closest in meaning to "distort" as used in the passage?',
      options: [
        'A. Clarify unambiguously',
        'B. Alter in an inaccurate or misleading manner',
        'C. Substantially improve upon',
        'D. Replicate with utmost precision',
      ],
      correctAnswer: 'B. Alter in an inaccurate or misleading manner',
      explanation: '"distort" nghĩa là bóp méo, làm sai lệch hoặc biến tướng bản chất (alter in an inaccurate manner).',
    },
    {
      id: 'pt_q11',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'Archaeological evidence suggests that agricultural cultivation emerged independently in at least eleven distinct geographic epicenters around the globe, rather than diffusing outwards from a single Mesopotamian cradle as 19th-century historians had long hypothesized.',
      question: 'Do the following statement agree with the information in the passage? "Contemporary scientific evidence disproves the premise that farming developed exclusively within Mesopotamia."',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'TRUE',
      explanation: 'Bằng chứng khảo cổ cho thấy nông nghiệp xuất hiện độc lập ở 11 trung tâm khác nhau thay vì chỉ lan từ Lưỡng Hà -> TRUE.',
    },
    {
      id: 'pt_q12',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'In high-latitude tundra biomes, permafrost thaw releases stored organic methane at exponential velocities. Because methane exerts a warming potential approximately 28 times greater than carbon dioxide over a century-long timeframe, this thawing triggers an accelerating positive feedback loop.',
      question: 'What does the term "positive feedback loop" refer to within the context of the tundra permafrost phenomenon?',
      options: [
        'A. A constructive ecological cycle that neutralizes greenhouse pollutants.',
        'B. A self-reinforcing process where thawing induces warming that speeds up further thawing.',
        'C. An international treaty aimed at preserving global wetland reserves.',
        'D. A gradual behavioral adaptation among migratory tundra wildlife populations.',
      ],
      correctAnswer: 'B. A self-reinforcing process where thawing induces warming that speeds up further thawing.',
      explanation: '"positive feedback loop" trong khoa học khí hậu là chu trình tự khuếch đại: Băng tan sinh khí metan làm nóng khí quyển, nhiệt độ tăng lại đẩy nhanh tốc độ tan băng.',
    },
    {
      id: 'pt_q13',
      section: 'reading',
      skill: 'Reading',
      audioText: '',
      passageExcerpt: 'In high-latitude tundra biomes, permafrost thaw releases stored organic methane at exponential velocities. Because methane exerts a warming potential approximately 28 times greater than carbon dioxide over a century-long timeframe, this thawing triggers an accelerating positive feedback loop.',
      question: 'Do the following statement agree with the information in the passage? "Scientists have successfully manufactured a subterranean chemical substance capable of immobilizing permafrost methane permanently."',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'NOT GIVEN',
      explanation: 'Bài đọc không hề đề cập đến việc các nhà khoa học đã chế tạo thành công chất hóa học nào để giữ khí metan vĩnh viễn dưới lòng đất hay chưa -> NOT GIVEN.',
    },

    // ─── SECTION 3: GRAMMAR & SENTENCE STRUCTURE (Q14 - Q19) ─────────────────
    {
      id: 'pt_q14',
      section: 'grammar',
      skill: 'Grammar',
      audioText: '',
      question: 'Choose the sentence that correctly employs negative inversion for academic emphasis:',
      options: [
        'A. Seldom the researchers have encountered such contradictory empirical results.',
        'B. Seldom have the researchers encountered such contradictory empirical results.',
        'C. Seldom did the researchers had encountered such contradictory empirical results.',
        'D. Seldom the researchers did encounter such contradictory empirical results.',
      ],
      correctAnswer: 'B. Seldom have the researchers encountered such contradictory empirical results.',
      explanation: 'Cấu trúc đảo ngữ với phó từ phủ định đứng đầu câu: Seldom + auxiliary (have) + subject (the researchers) + V3/ed (encountered).',
    },
    {
      id: 'pt_q15',
      section: 'grammar',
      skill: 'Grammar',
      audioText: '',
      question: 'Complete the sentence with the appropriate conditional verb forms: "If national governments _______ strict carbon quotas earlier, oceanic acidification _______ to current catastrophic levels."',
      options: [
        'A. implemented / will not escalate',
        'B. had implemented / would not have escalated',
        'C. would implement / had not escalated',
        'D. implement / would not escalate',
      ],
      correctAnswer: 'B. had implemented / would not have escalated',
      explanation: 'Third conditional (Câu điều kiện loại 3 diễn tả giả định trái ngược với quá khứ): If + S + had + V3, S + would have + V3.',
    },
    {
      id: 'pt_q16',
      section: 'grammar',
      skill: 'Grammar',
      audioText: '',
      question: 'Select the correct reduced relative clause form: "The statistical anomalies _______ by the automated monitoring sensors were promptly audited by the chief engineer."',
      options: [
        'A. which detected',
        'B. detecting',
        'C. detected',
        'D. were detected',
      ],
      correctAnswer: 'C. detected',
      explanation: 'Rút gọn mệnh đề quan hệ dạng bị động: "The statistical anomalies (which were detected) by..." rút gọn thành phân từ quá khứ "detected".',
    },
    {
      id: 'pt_q17',
      section: 'grammar',
      skill: 'Grammar',
      audioText: '',
      question: 'Choose the correct passive reporting structure: "It _______ that renewable energy investments will surpass fossil fuel subsidies before 2030."',
      options: [
        'A. is widely anticipated',
        'B. widely anticipates',
        'C. had widely anticipated',
        'D. has widely anticipating',
      ],
      correctAnswer: 'A. is widely anticipated',
      explanation: 'Cấu trúc câu tường thuật bị động khách quan chuẩn mực trong IELTS Writing: It is widely anticipated/believed/acknowledged that + clause.',
    },
    {
      id: 'pt_q18',
      section: 'grammar',
      skill: 'Grammar',
      audioText: '',
      question: 'Identify the word that maintains grammatical parallelism: "The municipal master plan aims to expand light rail transit, reduce greenhouse emissions, and _______ active pedestrian infrastructure."',
      options: [
        'A. to modernizing',
        'B. modernize',
        'C. modernizes',
        'D. modernized',
      ],
      correctAnswer: 'B. modernize',
      explanation: 'Quy tắc song hành (Parallelism): aims to expand [V-inf], reduce [V-inf], and modernize [V-inf].',
    },
    {
      id: 'pt_q19',
      section: 'grammar',
      skill: 'Grammar',
      audioText: '',
      question: 'Choose the appropriate cohesive conjunction: "_______ commendable technological progress has been achieved in battery efficiency, range anxiety remains a prevalent deterrent for consumers."',
      options: [
        'A. Despite',
        'B. Although',
        'C. In spite of',
        'D. Nevertheless',
      ],
      correctAnswer: 'B. Although',
      explanation: 'Theo sau là một mệnh đề hoàn chỉnh (S + V) -> chọn liên từ "Although". "Despite" và "In spite of" chỉ đi với cụm danh từ hoặc V-ing.',
    },

    // ─── SECTION 4: ACADEMIC VOCABULARY AWL (Q20 - Q25) ──────────────────────
    {
      id: 'pt_q20',
      section: 'vocab',
      skill: 'Vocabulary',
      audioText: '',
      question: 'Select the most appropriate academic adjective: "The international environmental protocol establishes _______ guidelines to curb unregulated industrial wastewater discharge."',
      options: ['A. negligible', 'B. stringent', 'C. haphazard', 'D. dormant'],
      correctAnswer: 'B. stringent',
      explanation: '"stringent guidelines / regulations" là collocation học thuật đắt giá chỉ các quy định nghiêm ngặt, khắt khe.',
    },
    {
      id: 'pt_q21',
      section: 'vocab',
      skill: 'Vocabulary',
      audioText: '',
      question: 'Select the most appropriate AWL term: "Disproportionate economic reliance on overseas tourism renders small island states acutely _______ to external market disruptions."',
      options: ['A. vulnerable', 'B. impervious', 'C. omnipotent', 'D. stationary'],
      correctAnswer: 'A. vulnerable',
      explanation: '"vulnerable to..." (tính từ AWL Sublist 1) mang nghĩa dễ bị tổn thương hoặc chịu tác động xấu trước các biến động bên ngoài.',
    },
    {
      id: 'pt_q22',
      section: 'vocab',
      skill: 'Vocabulary',
      audioText: '',
      question: 'Identify the standard academic collocation: "The university admissions board gave _______ consideration to candidates demonstrating extraordinary humanitarian service."',
      options: ['A. deep', 'B. heavy', 'C. careful', 'D. wide'],
      correctAnswer: 'C. careful',
      explanation: '"give careful consideration to something" (cân nhắc kỹ lưỡng, thấu đáo) là collocation học thuật chuẩn mực trong văn cảnh đại học.',
    },
    {
      id: 'pt_q23',
      section: 'vocab',
      skill: 'Vocabulary',
      audioText: '',
      question: 'Choose the accurate trend verb for IELTS Writing Task 1: "Between 2012 and 2022, domestic airfares _______ between $180 and $320 in response to unpredictable jet fuel tariffs."',
      options: ['A. fluctuated', 'B. plummeted', 'C. leveled off', 'D. stagnated'],
      correctAnswer: 'A. fluctuated',
      explanation: '"fluctuated between X and Y" mô tả sự biến động liên tục trong một khoảng giá trị trên biểu đồ đường Task 1.',
    },
    {
      id: 'pt_q24',
      section: 'vocab',
      skill: 'Vocabulary',
      audioText: '',
      question: 'Select the most appropriate verb: "High-resolution digital scanning projects serve to _______ ancient archaeological manuscripts from chemical and biological degradation."',
      options: ['A. maintain', 'B. preserve', 'C. sustain', 'D. conserve'],
      correctAnswer: 'B. preserve',
      explanation: '"preserve something from degradation/decay" nghĩa là bảo tồn tài liệu cổ khỏi sự phân rã hư hại.',
    },
    {
      id: 'pt_q25',
      section: 'vocab',
      skill: 'Vocabulary',
      audioText: '',
      question: 'Select the appropriate high-level transitional adverb: "Automation substantially optimizes manufacturing throughput; _______, it displaces routine manual labor across regional industrial hubs."',
      options: ['A. furthermore', 'B. consequently', 'C. conversely', 'D. likewise'],
      correctAnswer: 'C. conversely',
      explanation: '"Conversely" (ngược lại, ở chiều ngược lại) dùng để nối 2 vế đối lập: một mặt tối ưu hóa năng suất, mặt khác làm mất việc làm thủ công.',
    },
  ],
};

// Hàm đánh giá năng lực đầu vào và khuyến nghị mốc xuất phát chuẩn xác
export function evaluateIeltsPlacementTest(userAnswersMap) {
  let score = 0;
  const sectionScores = {
    listening: { correct: 0, total: 6 },
    reading: { correct: 0, total: 7 },
    grammar: { correct: 0, total: 6 },
    vocab: { correct: 0, total: 6 },
  };

  IELTS_PLACEMENT_TEST.questions.forEach((q) => {
    const isCorrect = userAnswersMap[q.id] === q.correctAnswer;
    if (isCorrect) {
      score += 1;
      if (sectionScores[q.section]) {
        sectionScores[q.section].correct += 1;
      }
    }
  });

  // Calculate percentage
  const percent = Math.round((score / 25) * 100);

  // Compute accurate Baseline Band & Starting Week
  let estimatedBand = 4.0;
  let bandLevel = 'Sơ cấp (A2/B1 cơ bản)';
  let startingWeek = 1;
  let startingPhase = 'phase-1';
  let skipWeeks = 0;
  let diagnosticSummary = '';
  let priorityFocus = '';

  if (score >= 22) {
    // 22 - 25 câu: ~6.5+
    estimatedBand = 6.5;
    bandLevel = 'Khá giỏi (B2+ vững vàng)';
    startingWeek = 12;
    startingPhase = 'phase-2';
    skipWeeks = 11;
    diagnosticSummary = 'Nền tảng của bạn cực kỳ vững chắc! Ngữ pháp và từ vựng học thuật C1 đã rất tốt. Bạn không cần học lại các bài vỡ lòng, có thể bắt đầu ngay từ Tuần 12 để tăng tốc làm chủ đề Cambridge khó và bứt phá lên 7.0 - 7.5+.';
    priorityFocus = 'Tập trung luyện đề Full Mock Test Cambridge 16-19 và tối ưu hóa Speaking Part 3 & Writing Task 2 Cohesion.';
  } else if (score >= 18) {
    // 18 - 21 câu: ~6.0
    estimatedBand = 6.0;
    bandLevel = 'Khá (B2 - Đã có nền tảng tốt)';
    startingWeek = 7;
    startingPhase = 'phase-2';
    skipWeeks = 6;
    diagnosticSummary = 'Bạn đã có nền tảng ngữ pháp câu phức tốt và nghe hiểu được ý chính. Bạn có thể bỏ qua toàn bộ 6 tuần Chặng 1 (tiết kiệm được 1.5 tháng!) và bắt đầu ngay từ Chặng 2 (Tuần 7) để giải quyết các dạng bài khó như Heading Matching, Map/Process và Speaking Cue Cards.';
    priorityFocus = 'Tập trung cải thiện tốc độ làm Reading Passage 2 & 3, bẫy Distractors trong Listening và dàn ý Task 2.';
  } else if (score >= 14) {
    // 14 - 17 câu: ~5.5
    estimatedBand = 5.5;
    bandLevel = 'Trung cấp (B1/B2 - Đúng thực lực hiện tại)';
    startingWeek = 4;
    startingPhase = 'phase-1';
    skipWeeks = 3;
    diagnosticSummary = 'Bạn có vốn từ vựng cơ bản khá và bắt được một số âm quan trọng, nhưng vẫn còn bị vấp ở các câu phức, bẫy phủ định và từ vựng học thuật chuyên sâu. Điểm xuất phát tối ưu nhất là Tuần 4 (vào thẳng Task 1 & Task 2 cơ bản), giúp bạn rút ngắn được 3 tuần học lý thuyết ban đầu.';
    priorityFocus = 'Xây dựng vốn từ Academic Word List (AWL Sublist 1-3), làm quen dạng bài True/False/Not Given và cấu trúc 4 đoạn Task 1.';
  } else if (score >= 9) {
    // 9 - 13 câu: ~5.0
    estimatedBand = 5.0;
    bandLevel = 'Trung cấp cơ bản (B1)';
    startingWeek = 2;
    startingPhase = 'phase-1';
    skipWeeks = 1;
    diagnosticSummary = 'Bạn có nhận biết được một số ngữ pháp thông dụng nhưng phản xạ nghe còn dễ bị phân tâm bởi bẫy distractors và chưa nắm rõ các dạng bài IELTS học thuật. Nên bắt đầu từ Tuần 2 để xây nền chắc chắn.';
    priorityFocus = 'Luyện nghe chính tả (Dictation) để bắt âm chuẩn, học quy tắc so sánh số liệu Task 1 và từ vựng tăng giảm.';
  } else {
    // 0 - 8 câu: < 5.0
    estimatedBand = 4.5;
    bandLevel = 'Sơ cấp (Cần lấy gốc bài bản)';
    startingWeek = 1;
    startingPhase = 'phase-1';
    skipWeeks = 0;
    diagnosticSummary = 'Nền tảng học thuật hiện tại còn nhiều lỗ hổng lớn về ngữ pháp câu phức và từ vựng học thuật. Hãy kiên trì học đúng từ Tuần 1 theo lộ trình 24 tuần để xây gốc vững vàng từng bước.';
    priorityFocus = 'Phát âm chuẩn IPA, nghe bắt số/tên riêng Part 1, ngữ pháp thì và mạo từ cốt lõi.';
  }

  return {
    score,
    total: 25,
    percent,
    estimatedBand,
    bandLevel,
    startingWeek,
    startingPhase,
    skipWeeks,
    sectionScores,
    diagnosticSummary,
    priorityFocus,
  };
}

