// ═════════════════════════════════════════════════════════════════════════════
// THE IELTS DICTIONARY - TRANSLATION HUB DATABASE (CHUẨN 100% THEIELTSDICTIONARY.COM)
// ═════════════════════════════════════════════════════════════════════════════

export const WRITING_CATEGORIES = [
  { id: 'step1', label: 'Bước 1: Cấu trúc câu cơ bản', icon: 'fa-cubes', count: '10 chủ đề • 225 câu', desc: 'Dịch các câu đơn từ Việt sang Anh. Tập trung vào đúng thì, mạo từ và cấu trúc S-V-O cơ bản.' },
  { id: 'step2', label: 'Bước 2: Collocations & Vocab', icon: 'fa-tags', count: '15 chủ đề • 300+ câu', desc: 'Dịch câu ứng dụng cụm từ và từ vựng học thuật theo 15 chủ đề IELTS phổ biến.' },
  { id: 'step3', label: 'Bước 3: Dịch đoạn văn Band 6.5', icon: 'fa-bullseye', count: '15 đoạn văn', desc: 'Luyện dịch các đoạn văn ngắn từ Việt sang Anh với mục tiêu đạt độ chính xác và mạch lạc Band 6.5.' },
  { id: 'step4', label: 'Bước 4: Dịch đoạn văn Band 8.0', icon: 'fa-award', count: '10 đoạn văn', desc: 'Thử thách dịch các đoạn văn phức tạp, yêu cầu sử dụng từ vựng ít phổ biến và cấu trúc câu linh hoạt Band 8.0.' },
  { id: 'step5', label: 'Bước 5: Dịch Essay hoàn chỉnh', icon: 'fa-file-lines', count: '15 bài Essays', desc: 'Luyện dịch nguyên một bài Essay từ dàn ý tiếng Việt sang bài viết tiếng Anh học thuật hoàn chỉnh.' }
];

export const WRITING_LESSONS = {
  "step1": [
    {
      "id": "buoc1-articles",
      "aliasIds": [
        "write-articles",
        "write-a-an-the"
      ],
      "title": "Mạo từ: A, An, The (Articles)",
      "step": "Bước 1",
      "level": "A1 - A2",
      "desc": "Luyện dịch 20 câu chuyên sâu phân biệt mạo từ xác định (The), bất định (A/An) và không dùng mạo từ (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc1-articles-s1",
          "vietnamese": "Tôi muốn mua một chiếc máy tính xách tay mới.",
          "target": "I want to buy a new laptop.",
          "masked": ["I", "w***", "t*", "b**", "a", "n**", "l*****."],
          "hints": ["want to buy", "a new laptop"],
          "acceptable": ["I want to buy a new laptop."],
          "grammarNote": "Dùng mạo từ \"a\" trước danh từ đếm được số ít bắt đầu bằng phụ âm (\"new\")."
        },
        {
          "id": "buoc1-articles-s2",
          "vietnamese": "Cô ấy là một kiến trúc sư giàu kinh nghiệm.",
          "target": "She is an experienced architect.",
          "masked": ["S**", "i*", "a*", "e**********", "a********."],
          "hints": ["is an experienced architect"],
          "acceptable": ["She is an experienced architect."],
          "grammarNote": "Dùng mạo từ \"an\" trước từ bắt đầu bằng nguyên âm (\"experienced\")."
        },
        {
          "id": "buoc1-articles-s3",
          "vietnamese": "Mặt trời mọc ở hướng Đông và lặn ở hướng Tây.",
          "target": "The sun rises in the east and sets in the west.",
          "masked": ["T**", "s**", "r****", "i*", "t**", "e***", "a**", "s***", "i*", "t**", "w***."],
          "hints": ["The sun rises", "in the east", "and sets in the west"],
          "acceptable": ["The sun rises in the east and sets in the west."],
          "grammarNote": "Dùng \"the\" trước các vật thể duy nhất (\"the sun\") và phương hướng (\"the east\", \"the west\")."
        },
        {
          "id": "buoc1-articles-s4",
          "vietnamese": "Tôi đã đọc một cuốn sách hôm qua. Cuốn sách đó rất thú vị.",
          "target": "I read a book yesterday. The book was very interesting.",
          "masked": ["I", "r***", "a", "b***", "y********.", "T**", "b***", "w**", "v***", "i**********."],
          "hints": ["I read a book yesterday", "The book was very interesting"],
          "acceptable": ["I read a book yesterday. The book was very interesting."],
          "grammarNote": "Lần đầu đề cập dùng \"a book\", lần thứ hai đối tượng đã xác định nên dùng \"the book\"."
        },
        {
          "id": "buoc1-articles-s5",
          "vietnamese": "Bạn có thể mở cửa sổ giúp tôi được không?",
          "target": "Can you open the window please?",
          "masked": ["C**", "y**", "o***", "t**", "w*****", "p*****?"],
          "hints": ["Can you open the window", "please"],
          "acceptable": ["Can you open the window please?", "Could you please open the window?", "Can you open the window?"],
          "grammarNote": "Dùng \"the window\" vì người nghe và người nói đều ngầm hiểu rõ là cửa sổ cụ thể nào."
        },
        {
          "id": "buoc1-articles-s6",
          "vietnamese": "Trái Đất quay quanh Mặt Trời.",
          "target": "The Earth revolves around the Sun.",
          "masked": ["T**", "E****", "r*******", "a*****", "t**", "S**."],
          "hints": ["The Earth revolves", "around the Sun"],
          "acceptable": ["The Earth revolves around the Sun.", "The Earth moves around the Sun."],
          "grammarNote": "Dùng \"the\" trước tên các thiên thể độc nhất trong vũ trụ: \"the Earth\", \"the Sun\"."
        },
        {
          "id": "buoc1-articles-s7",
          "vietnamese": "Anh ấy là người học sinh giỏi nhất trong lớp.",
          "target": "He is the best student in the class.",
          "masked": ["H*", "i*", "t**", "b***", "s******", "i*", "t**", "c****."],
          "hints": ["the best student", "in the class"],
          "acceptable": ["He is the best student in the class."],
          "grammarNote": "Dùng \"the\" trước tính từ so sánh nhất (\"the best\") và cụm danh từ xác định (\"in the class\")."
        },
        {
          "id": "buoc1-articles-s8",
          "vietnamese": "Tôi thích nghe nhạc cổ điển vào ban đêm.",
          "target": "I like listening to classical music at night.",
          "masked": ["I", "l***", "l*********", "t*", "c********", "m****", "a*", "n****."],
          "hints": ["listening to classical music", "at night"],
          "acceptable": ["I like listening to classical music at night."],
          "grammarNote": "Không dùng mạo từ trước danh từ không đếm được nói chung (\"classical music\") và cụm từ cố định \"at night\"."
        },
        {
          "id": "buoc1-articles-s9",
          "vietnamese": "Trẻ em cần được vui chơi ngoài trời mỗi ngày.",
          "target": "Children need to play outdoors every day.",
          "masked": ["C*******", "n***", "t*", "p***", "o*******", "e****", "d**."],
          "hints": ["Children need to play", "outdoors every day"],
          "acceptable": ["Children need to play outdoors every day."],
          "grammarNote": "Không dùng mạo từ trước danh từ số nhiều mang nghĩa khái quát, tổng thể: \"Children\"."
        },
        {
          "id": "buoc1-articles-s10",
          "vietnamese": "Chúng tôi đã ăn tối tại một nhà hàng tuyệt vời gần bờ sông.",
          "target": "We had dinner at a great restaurant near the river.",
          "masked": ["W*", "h**", "d*****", "a*", "a", "g****", "r*********", "n***", "t**", "r****."],
          "hints": ["had dinner", "at a great restaurant", "near the river"],
          "acceptable": ["We had dinner at a great restaurant near the river."],
          "grammarNote": "Bữa ăn \"have dinner\" không dùng mạo từ; nhà hàng chưa xác định dùng \"a\"; bờ sông xác định dùng \"the river\"."
        },
        {
          "id": "buoc1-articles-s11",
          "vietnamese": "Anh ấy chơi piano rất hay nhưng không chơi bóng đá.",
          "target": "He plays the piano very well but does not play football.",
          "masked": ["H*", "p****", "t**", "p****", "v***", "w***", "b**", "d***", "n**", "p***", "f*******."],
          "hints": ["plays the piano", "very well", "does not play football"],
          "acceptable": ["He plays the piano very well but does not play football.", "He plays the piano very well but doesn't play soccer."],
          "grammarNote": "Dùng \"the\" trước nhạc cụ (\"the piano\"), KHÔNG dùng mạo từ trước môn thể thao (\"play football\")."
        },
        {
          "id": "buoc1-articles-s12",
          "vietnamese": "Bữa sáng là bữa ăn quan trọng nhất trong ngày.",
          "target": "Breakfast is the most important meal of the day.",
          "masked": ["B********", "i*", "t**", "m***", "i********", "m***", "o*", "t**", "d**."],
          "hints": ["Breakfast is", "the most important meal", "of the day"],
          "acceptable": ["Breakfast is the most important meal of the day."],
          "grammarNote": "Không dùng mạo từ trước tên bữa ăn (\"Breakfast\"); so sánh nhất có \"the\" (\"the most important\")."
        },
        {
          "id": "buoc1-articles-s13",
          "vietnamese": "Gia đình tôi đã đến thăm Vương quốc Anh vào mùa hè năm ngoái.",
          "target": "My family visited the United Kingdom last summer.",
          "masked": ["M*", "f*****", "v******", "t**", "U*****", "K******", "l***", "s*****."],
          "hints": ["visited the United Kingdom", "last summer"],
          "acceptable": ["My family visited the United Kingdom last summer.", "My family visited the UK last summer."],
          "grammarNote": "Dùng \"the\" trước tên các quốc gia có chứa Kingdom, States, Republic: \"the United Kingdom\"."
        },
        {
          "id": "buoc1-articles-s14",
          "vietnamese": "Chó là loài động vật rất trung thành với con người.",
          "target": "Dogs are very loyal animals to humans.",
          "masked": ["D***", "a**", "v***", "l****", "a******", "t*", "h*****."],
          "hints": ["Dogs are", "very loyal animals", "to humans"],
          "acceptable": ["Dogs are very loyal animals to humans."],
          "grammarNote": "Danh từ số nhiều nói về một loài/tập hợp nói chung thì không dùng mạo từ: \"Dogs\", \"humans\"."
        },
        {
          "id": "buoc1-articles-s15",
          "vietnamese": "Tôi nhìn thấy một con chim trên cành cây. Con chim có bộ lông màu vàng.",
          "target": "I saw a bird on the branch. The bird had yellow feathers.",
          "masked": ["I", "s**", "a", "b***", "o*", "t**", "b*****.", "T**", "b***", "h**", "y*****", "f*******."],
          "hints": ["I saw a bird", "on the branch", "The bird had yellow feathers"],
          "acceptable": ["I saw a bird on the branch. The bird had yellow feathers."],
          "grammarNote": "Câu trước nhắc lần đầu là \"a bird\", câu sau nhắc lại đã xác định là \"the bird\"."
        },
        {
          "id": "buoc1-articles-s16",
          "vietnamese": "Anh ấy thường đi làm bằng xe buýt.",
          "target": "He usually goes to work by bus.",
          "masked": ["H*", "u******", "g***", "t*", "w***", "b*", "b**."],
          "hints": ["goes to work", "by bus"],
          "acceptable": ["He usually goes to work by bus."],
          "grammarNote": "Cụm cố định chỉ phương tiện không có mạo từ: \"by bus\", \"by train\", và \"go to work\"."
        },
        {
          "id": "buoc1-articles-s17",
          "vietnamese": "Sông Nin là con sông dài nhất thế giới.",
          "target": "The Nile is the longest river in the world.",
          "masked": ["T**", "N***", "i*", "t**", "l******", "r****", "i*", "t**", "w****."],
          "hints": ["The Nile", "the longest river", "in the world"],
          "acceptable": ["The Nile is the longest river in the world."],
          "grammarNote": "Dùng \"the\" trước tên sông ngòi (\"the Nile\"), so sánh nhất (\"the longest\"), và \"the world\"."
        },
        {
          "id": "buoc1-articles-s18",
          "vietnamese": "Cô ấy có một ý tưởng tuyệt vời cho dự án mới.",
          "target": "She has a great idea for the new project.",
          "masked": ["S**", "h**", "a", "g****", "i***", "f**", "t**", "n**", "p******."],
          "hints": ["has a great idea", "for the new project"],
          "acceptable": ["She has a great idea for the new project."],
          "grammarNote": "Dùng \"a\" trước \"great idea\" (phụ âm /g/); dùng \"the\" trước \"the new project\" (dự án đã được xác định trước)."
        },
        {
          "id": "buoc1-articles-s19",
          "vietnamese": "Họ đang đi nghỉ mát ở dãy núi Alps.",
          "target": "They are on vacation in the Alps.",
          "masked": ["T***", "a**", "o*", "v*******", "i*", "t**", "A***."],
          "hints": ["on vacation", "in the Alps"],
          "acceptable": ["They are on vacation in the Alps."],
          "grammarNote": "Dùng \"the\" trước tên các dãy núi (số nhiều): \"the Alps\"."
        },
        {
          "id": "buoc1-articles-s20",
          "vietnamese": "Sữa rất tốt cho sức khỏe của trẻ em.",
          "target": "Milk is very good for children's health.",
          "masked": ["M***", "i*", "v***", "g***", "f**", "c*********", "h*****."],
          "hints": ["Milk is very good", "for children's health"],
          "acceptable": ["Milk is very good for children's health."],
          "grammarNote": "Không dùng mạo từ trước danh từ không đếm được nói chung (\"Milk\") và cụm sở hữu."
        }
      ]
    },
    {
      "id": "buoc1-simple-present",
      "aliasIds": [
        "write-pres-simple",
        "write-to-be"
      ],
      "title": "Hiện tại đơn (Simple Present)",
      "step": "Bước 1",
      "level": "A1 - A2",
      "desc": "Luyện dịch 25 câu diễn tả thói quen, chân lý và sự thật hiển nhiên (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc1-simple-present-s1",
          "vietnamese": "Tôi thức dậy lúc 6 giờ sáng mỗi ngày.",
          "target": "I wake up at 6 AM every day.",
          "masked": [
            "I",
            "w***",
            "u*",
            "a*",
            "6",
            "A*",
            "e****",
            "d**."
          ],
          "hints": [
            "wake up at 6 AM",
            "every day"
          ],
          "acceptable": [
            "I wake up at 6 AM every day."
          ],
          "grammarNote": "Thì Hiện tại đơn với chủ ngữ \"I\" thì động từ nguyên mẫu \"wake up\"."
        },
        {
          "id": "buoc1-simple-present-s2",
          "vietnamese": "Cô ấy làm việc tại một công ty công nghệ ở Hà Nội.",
          "target": "She works at a technology company in Hanoi.",
          "masked": [
            "S**",
            "w****",
            "a*",
            "a",
            "t*********",
            "c******",
            "i*",
            "H****."
          ],
          "hints": [
            "works at",
            "a technology company",
            "in Hanoi"
          ],
          "acceptable": [
            "She works at a technology company in Hanoi."
          ],
          "grammarNote": "Chủ ngữ ngôi thứ ba số ít \"She\" -> động từ thêm -s \"works\"."
        },
        {
          "id": "buoc1-simple-present-s3",
          "vietnamese": "Mặt trời mọc ở hướng Đông và lặn ở hướng Tây.",
          "target": "The sun rises in the east and sets in the west.",
          "masked": [
            "T**",
            "s**",
            "r****",
            "i*",
            "t**",
            "e***",
            "a**",
            "s***",
            "i*",
            "t**",
            "w***."
          ],
          "hints": [
            "The sun rises",
            "in the east",
            "and sets in the west"
          ],
          "acceptable": [
            "The sun rises in the east and sets in the west."
          ],
          "grammarNote": "Chân lý tự nhiên: thì HTĐ. \"The sun\" số ít -> \"rises\", \"sets\"."
        },
        {
          "id": "buoc1-simple-present-s4",
          "vietnamese": "Họ không ăn thịt vì họ là người ăn chay.",
          "target": "They do not eat meat because they are vegetarians.",
          "masked": [
            "T***",
            "d*",
            "n**",
            "e**",
            "m***",
            "b******",
            "t***",
            "a**",
            "v**********."
          ],
          "hints": [
            "do not eat meat",
            "because they are vegetarians"
          ],
          "acceptable": [
            "They do not eat meat because they are vegetarians."
          ],
          "grammarNote": "Phủ định HTĐ với \"They\": \"do not eat\". Danh từ: \"vegetarians\"."
        },
        {
          "id": "buoc1-simple-present-s5",
          "vietnamese": "Bạn có thường xuyên đi du lịch vào mùa hè không?",
          "target": "Do you often travel in the summer?",
          "masked": [
            "D*",
            "y**",
            "o****",
            "t*****",
            "i*",
            "t**",
            "s*****?"
          ],
          "hints": [
            "Do you often travel",
            "in the summer"
          ],
          "acceptable": [
            "Do you often travel in the summer?"
          ],
          "grammarNote": "Câu hỏi HTĐ: Do + S + V-bare. Trạng từ tần suất \"often\"."
        },
        {
          "id": "buoc1-simple-present-s6",
          "vietnamese": "Anh ấy nói ba ngôn ngữ một cách thành thạo.",
          "target": "He speaks three languages fluently.",
          "masked": [
            "H*",
            "s*****",
            "t****",
            "l********",
            "f*******."
          ],
          "hints": [
            "speaks three languages",
            "fluently"
          ],
          "acceptable": [
            "He speaks three languages fluently."
          ],
          "grammarNote": "Chủ ngữ \"He\" -> \"speaks\". Trạng từ \"fluently\"."
        },
        {
          "id": "buoc1-simple-present-s7",
          "vietnamese": "Thư viện mở cửa từ 8 giờ sáng đến 9 giờ tối.",
          "target": "The library opens from 8 AM to 9 PM.",
          "masked": [
            "T**",
            "l******",
            "o****",
            "f***",
            "8",
            "A*",
            "t*",
            "9",
            "P*."
          ],
          "hints": [
            "The library opens",
            "from 8 AM to 9 PM"
          ],
          "acceptable": [
            "The library opens from 8 AM to 9 PM."
          ],
          "grammarNote": "Lịch trình, thời gian biểu cố định dùng thì HTĐ: \"The library opens...\"."
        },
        {
          "id": "buoc1-simple-present-s8",
          "vietnamese": "Nước sôi ở 100 độ C.",
          "target": "Water boils at 100 degrees Celsius.",
          "masked": [
            "W****",
            "b****",
            "a*",
            "1**",
            "d******",
            "C******."
          ],
          "hints": [
            "Water boils",
            "at 100 degrees Celsius"
          ],
          "acceptable": [
            "Water boils at 100 degrees Celsius."
          ],
          "grammarNote": "Sự thật khoa học: \"Water\" không đếm được -> \"boils\"."
        },
        {
          "id": "buoc1-simple-present-s9",
          "vietnamese": "Chúng tôi thường ăn tối cùng nhau vào cuối tuần.",
          "target": "We usually have dinner together on weekends.",
          "masked": [
            "W*",
            "u******",
            "h***",
            "d*****",
            "t*******",
            "o*",
            "w*******."
          ],
          "hints": [
            "usually have dinner together",
            "on weekends"
          ],
          "acceptable": [
            "We usually have dinner together on weekends."
          ],
          "grammarNote": "Cụm từ: \"have dinner together\", giới từ: \"on weekends\"."
        },
        {
          "id": "buoc1-simple-present-s10",
          "vietnamese": "Mẹ tôi nấu ăn rất ngon.",
          "target": "My mother cooks very well.",
          "masked": [
            "M*",
            "m*****",
            "c****",
            "v***",
            "w***."
          ],
          "hints": [
            "My mother cooks",
            "very well / delicious food"
          ],
          "acceptable": [
            "My mother cooks very well."
          ],
          "grammarNote": "Chủ ngữ \"My mother\" số ít -> \"cooks\". Trạng từ \"well\"."
        },
        {
          "id": "buoc1-simple-present-s11",
          "vietnamese": "Trẻ em thích chơi ngoài trời hơn là xem tivi.",
          "target": "Children prefer playing outdoors to watching television.",
          "masked": [
            "C*******",
            "p*****",
            "p******",
            "o*******",
            "t*",
            "w*******",
            "t*********."
          ],
          "hints": [
            "Children prefer V-ing to V-ing",
            "playing outdoors"
          ],
          "acceptable": [
            "Children prefer playing outdoors to watching television."
          ],
          "grammarNote": "Cấu trúc: prefer V-ing to V-ing (thích làm gì hơn làm gì)."
        },
        {
          "id": "buoc1-simple-present-s12",
          "vietnamese": "Cửa hàng này bán trái cây tươi mỗi ngày.",
          "target": "This shop sells fresh fruit every day.",
          "masked": [
            "T***",
            "s***",
            "s****",
            "f****",
            "f****",
            "e****",
            "d**."
          ],
          "hints": [
            "This shop sells",
            "fresh fruit",
            "every day"
          ],
          "acceptable": [
            "This shop sells fresh fruit every day."
          ],
          "grammarNote": "Chủ ngữ \"This shop\" số ít -> \"sells\". \"Fruit\" số ít/không đếm được."
        },
        {
          "id": "buoc1-simple-present-s13",
          "vietnamese": "Bạn tôi sống gần công viên thành phố.",
          "target": "My friend lives near the city park.",
          "masked": [
            "M*",
            "f*****",
            "l****",
            "n***",
            "t**",
            "c***",
            "p***."
          ],
          "hints": [
            "My friend lives near",
            "the city park"
          ],
          "acceptable": [
            "My friend lives near the city park."
          ],
          "grammarNote": "Động từ \"lives\" chia theo chủ ngữ số ít \"My friend\"."
        },
        {
          "id": "buoc1-simple-present-s14",
          "vietnamese": "Chuyến tàu khởi hành lúc 7 giờ sáng mai.",
          "target": "The train departs at 7 AM tomorrow.",
          "masked": [
            "T**",
            "t****",
            "d******",
            "a*",
            "7",
            "A*",
            "t*******."
          ],
          "hints": [
            "The train departs",
            "at 7 AM tomorrow"
          ],
          "acceptable": [
            "The train departs at 7 AM tomorrow."
          ],
          "grammarNote": "Lịch trình tàu xe tương lai dùng thì Hiện tại đơn."
        },
        {
          "id": "buoc1-simple-present-s15",
          "vietnamese": "Tôi không hiểu câu hỏi này.",
          "target": "I do not understand this question.",
          "masked": [
            "I",
            "d*",
            "n**",
            "u*********",
            "t***",
            "q*******."
          ],
          "hints": [
            "do not understand",
            "this question"
          ],
          "acceptable": [
            "I do not understand this question."
          ],
          "grammarNote": "Động từ nhận thức \"understand\" không chia tiếp diễn."
        },
        {
          "id": "buoc1-simple-present-s16",
          "vietnamese": "Thời tiết ở đây rất đẹp vào mùa thu.",
          "target": "The weather here is very beautiful in autumn.",
          "masked": [
            "T**",
            "w******",
            "h***",
            "i*",
            "v***",
            "b********",
            "i*",
            "a*****."
          ],
          "hints": [
            "The weather here is",
            "very beautiful in autumn"
          ],
          "acceptable": [
            "The weather here is very beautiful in autumn."
          ],
          "grammarNote": "\"The weather\" không đếm được -> \"is\". Mùa thu: \"in autumn\"."
        },
        {
          "id": "buoc1-simple-present-s17",
          "vietnamese": "Anh ấy luôn lắng nghe ý kiến của đồng nghiệp.",
          "target": "He always listens to the opinions of his colleagues.",
          "masked": [
            "H*",
            "a*****",
            "l******",
            "t*",
            "t**",
            "o*******",
            "o*",
            "h**",
            "c*********."
          ],
          "hints": [
            "always listens to",
            "opinions of colleagues"
          ],
          "acceptable": [
            "He always listens to the opinions of his colleagues."
          ],
          "grammarNote": "Động từ \"listen\" đi với giới từ \"to\": \"listen to\"."
        },
        {
          "id": "buoc1-simple-present-s18",
          "vietnamese": "Bác sĩ khuyên bệnh nhân uống nhiều nước.",
          "target": "The doctor advises patients to drink plenty of water.",
          "masked": [
            "T**",
            "d*****",
            "a******",
            "p*******",
            "t*",
            "d****",
            "p*****",
            "o*",
            "w****."
          ],
          "hints": [
            "advises patients to",
            "drink plenty of water"
          ],
          "acceptable": [
            "The doctor advises patients to drink plenty of water."
          ],
          "grammarNote": "Cấu trúc: advise someone to do something."
        },
        {
          "id": "buoc1-simple-present-s19",
          "vietnamese": "Nhiều người trẻ sử dụng mạng xã hội hàng giờ mỗi ngày.",
          "target": "Many young people use social media for hours every day.",
          "masked": [
            "M***",
            "y****",
            "p*****",
            "u**",
            "s*****",
            "m****",
            "f**",
            "h****",
            "e****",
            "d**."
          ],
          "hints": [
            "Many young people use",
            "social media for hours every day"
          ],
          "acceptable": [
            "Many young people use social media for hours every day."
          ],
          "grammarNote": "Chủ ngữ \"Many young people\" số nhiều -> \"use\"."
        },
        {
          "id": "buoc1-simple-present-s20",
          "vietnamese": "Con sông này chảy qua nhiều tỉnh thành.",
          "target": "This river flows through many provinces.",
          "masked": [
            "T***",
            "r****",
            "f****",
            "t******",
            "m***",
            "p********."
          ],
          "hints": [
            "This river flows through",
            "many provinces"
          ],
          "acceptable": [
            "This river flows through many provinces."
          ],
          "grammarNote": "Chủ ngữ \"This river\" số ít -> \"flows\". Giới từ \"through\"."
        },
        {
          "id": "buoc1-simple-present-s21",
          "vietnamese": "Cô ấy luôn mỉm cười khi gặp người lạ.",
          "target": "She always smiles when meeting strangers.",
          "masked": [
            "S**",
            "a*****",
            "s*****",
            "w***",
            "m******",
            "s********."
          ],
          "hints": [
            "always smiles",
            "when meeting strangers"
          ],
          "acceptable": [
            "She always smiles when meeting strangers."
          ],
          "grammarNote": "Chủ ngữ \"She\" -> \"smiles\". Mệnh đề rút gọn: \"when meeting strangers\"."
        },
        {
          "id": "buoc1-simple-present-s22",
          "vietnamese": "Công ty tôi xuất khẩu hàng hoá sang châu Âu.",
          "target": "My company exports goods to Europe.",
          "masked": [
            "M*",
            "c******",
            "e******",
            "g****",
            "t*",
            "E*****."
          ],
          "hints": [
            "exports goods",
            "to Europe"
          ],
          "acceptable": [
            "My company exports goods to Europe."
          ],
          "grammarNote": "Chủ ngữ \"My company\" số ít -> \"exports\". \"goods\" luôn số nhiều."
        },
        {
          "id": "buoc1-simple-present-s23",
          "vietnamese": "Trẻ em cần ngủ đủ giấc để phát triển khỏe mạnh.",
          "target": "Children need enough sleep to develop healthily.",
          "masked": [
            "C*******",
            "n***",
            "e*****",
            "s****",
            "t*",
            "d******",
            "h********."
          ],
          "hints": [
            "need enough sleep",
            "to develop healthily"
          ],
          "acceptable": [
            "Children need enough sleep to develop healthily."
          ],
          "grammarNote": "Cấu trúc: need + noun + to V. Trạng từ \"healthily\"."
        },
        {
          "id": "buoc1-simple-present-s24",
          "vietnamese": "Anh tôi làm việc ở một ngân hàng lớn.",
          "target": "My brother works at a large bank.",
          "masked": [
            "M*",
            "b******",
            "w****",
            "a*",
            "a",
            "l****",
            "b***."
          ],
          "hints": [
            "My brother works at",
            "a large bank"
          ],
          "acceptable": [
            "My brother works at a large bank."
          ],
          "grammarNote": "Chủ ngữ \"My brother\" số ít -> \"works\"."
        },
        {
          "id": "buoc1-simple-present-s25",
          "vietnamese": "Các nhà khoa học nghiên cứu nguyên nhân của biến đổi khí hậu.",
          "target": "Scientists research the causes of climate change.",
          "masked": [
            "S*********",
            "r*******",
            "t**",
            "c*****",
            "o*",
            "c******",
            "c*****."
          ],
          "hints": [
            "Scientists research",
            "the causes of climate change"
          ],
          "acceptable": [
            "Scientists research the causes of climate change."
          ],
          "grammarNote": "Thuật ngữ học thuật: \"climate change\" (biến đổi khí hậu)."
        }
      ]
    },
        {
        "id": "buoc1-was-were",
        "aliasIds": [
            "write-was-were",
            "write-past-be"
        ],
        "title": "Quá khứ đơn: Was, Were (Past Simple of To Be)",
        "step": "Bước 1",
        "level": "A1 - A2",
        "desc": "Luyện dịch 20 câu làm chủ động từ To Be ở quá khứ đơn (Was / Were), thể khẳng định, phủ định và câu hỏi (Chuẩn The IELTS Dictionary).",
        "sentences": [
            {
                "id": "buoc1-was-were-s1",
                "vietnamese": "Hôm qua thời tiết rất đẹp và ấm áp.",
                "target": "The weather was very nice and warm yesterday.",
                "masked": [
                    "T**",
                    "w******",
                    "w**",
                    "v***",
                    "n***",
                    "a**",
                    "w***",
                    "y********."
                ],
                "hints": [
                    "The weather was very nice",
                    "and warm yesterday"
                ],
                "acceptable": [
                    "The weather was very nice and warm yesterday.",
                    "Yesterday the weather was very nice and warm."
                ],
                "grammarNote": "Chủ ngữ ngôi thứ 3 số ít 'The weather' đi với 'was' trong quá khứ đơn."
            },
            {
                "id": "buoc1-was-were-s2",
                "vietnamese": "Họ đã ở đâu vào tối hôm qua?",
                "target": "Where were they yesterday evening?",
                "masked": [
                    "W****",
                    "w***",
                    "t***",
                    "y********",
                    "e******?"
                ],
                "hints": [
                    "Where were they",
                    "yesterday evening"
                ],
                "acceptable": [
                    "Where were they yesterday evening?",
                    "Where were they last night?"
                ],
                "grammarNote": "Câu hỏi Wh- với To Be ở quá khứ: Where + were + they...?"
            },
            {
                "id": "buoc1-was-were-s3",
                "vietnamese": "Tôi đã rất mệt sau một ngày làm việc dài.",
                "target": "I was very tired after a long working day.",
                "masked": [
                    "I",
                    "w**",
                    "v***",
                    "t****",
                    "a****",
                    "a",
                    "l***",
                    "w******",
                    "d**."
                ],
                "hints": [
                    "was very tired",
                    "after a long working day"
                ],
                "acceptable": [
                    "I was very tired after a long working day.",
                    "I was very tired after a long day at work."
                ],
                "grammarNote": "Chủ ngữ 'I' đi với 'was' trong thì quá khứ đơn."
            },
            {
                "id": "buoc1-was-were-s4",
                "vietnamese": "Tuần trước chúng tôi không có ở nhà.",
                "target": "We were not at home last week.",
                "masked": [
                    "W*",
                    "w***",
                    "n**",
                    "a*",
                    "h***",
                    "l***",
                    "w***."
                ],
                "hints": [
                    "were not at home",
                    "last week"
                ],
                "acceptable": [
                    "We were not at home last week.",
                    "We weren't at home last week."
                ],
                "grammarNote": "Thể phủ định của were: 'were not' (rút gọn là 'weren't')."
            },
            {
                "id": "buoc1-was-were-s5",
                "vietnamese": "Hồi còn nhỏ, anh ấy rất nhút nhát và ít nói.",
                "target": "When he was a child, he was very shy and quiet.",
                "masked": [
                    "W***",
                    "h*",
                    "w**",
                    "a",
                    "c****",
                    "h*",
                    "w**",
                    "v***",
                    "s**",
                    "a**",
                    "q****."
                ],
                "hints": [
                    "When he was a child",
                    "he was very shy and quiet"
                ],
                "acceptable": [
                    "When he was a child, he was very shy and quiet.",
                    "He was very shy and quiet when he was a child."
                ],
                "grammarNote": "Mệnh đề chỉ thời gian quá khứ: 'When + S + was/were...'."
            },
            {
                "id": "buoc1-was-were-s6",
                "vietnamese": "Bộ phim tối qua có thú vị không?",
                "target": "Was the movie interesting last night?",
                "masked": [
                    "W**",
                    "t**",
                    "m****",
                    "i**********",
                    "l***",
                    "n****?"
                ],
                "hints": [
                    "Was the movie interesting",
                    "last night"
                ],
                "acceptable": [
                    "Was the movie interesting last night?",
                    "Was the film interesting last night?"
                ],
                "grammarNote": "Câu hỏi Yes/No với To Be quá khứ số ít: Was + S + adj...?"
            },
            {
                "id": "buoc1-was-were-s7",
                "vietnamese": "Đã có rất nhiều người ở buổi hòa nhạc hôm Chủ nhật.",
                "target": "There were a lot of people at the concert on Sunday.",
                "masked": [
                    "T****",
                    "w***",
                    "a",
                    "l**",
                    "o*",
                    "p*****",
                    "a*",
                    "t**",
                    "c******",
                    "o*",
                    "S*****."
                ],
                "hints": [
                    "There were a lot of people",
                    "at the concert on Sunday"
                ],
                "acceptable": [
                    "There were a lot of people at the concert on Sunday.",
                    "There were many people at the concert on Sunday."
                ],
                "grammarNote": "'There were' dùng cho danh từ số nhiều trong quá khứ ('people')."
            },
            {
                "id": "buoc1-was-were-s8",
                "vietnamese": "Cô ấy đã vắng mặt trong cuộc họp sáng nay vì bị ốm.",
                "target": "She was absent from the meeting this morning because she was sick.",
                "masked": [
                    "S**",
                    "w**",
                    "a*****",
                    "f***",
                    "t**",
                    "m******",
                    "t***",
                    "m******",
                    "b******",
                    "s**",
                    "w**",
                    "s***."
                ],
                "hints": [
                    "was absent from the meeting",
                    "because she was sick"
                ],
                "acceptable": [
                    "She was absent from the meeting this morning because she was sick.",
                    "She was absent from the meeting this morning because she was ill."
                ],
                "grammarNote": "Cụm từ 'be absent from': vắng mặt khỏi đâu. Ngôi 'she' dùng 'was'."
            },
            {
                "id": "buoc1-was-were-s9",
                "vietnamese": "Bữa tiệc sinh nhật của bạn thế nào? Nó rất vui.",
                "target": "How was your birthday party? It was great fun.",
                "masked": [
                    "H**",
                    "w**",
                    "y***",
                    "b*******",
                    "p****?",
                    "I*",
                    "w**",
                    "g****",
                    "f**."
                ],
                "hints": [
                    "How was your birthday party",
                    "It was great fun"
                ],
                "acceptable": [
                    "How was your birthday party? It was great fun.",
                    "How was your birthday party? It was very fun."
                ],
                "grammarNote": "Hỏi cảm nghĩ trong quá khứ: 'How was + danh từ số ít?'."
            },
            {
                "id": "buoc1-was-were-s10",
                "vietnamese": "Những chiếc chìa khóa của tôi đã ở trên bàn mười phút trước.",
                "target": "My keys were on the table ten minutes ago.",
                "masked": [
                    "M*",
                    "k***",
                    "w***",
                    "o*",
                    "t**",
                    "t****",
                    "t**",
                    "m******",
                    "a**."
                ],
                "hints": [
                    "My keys were on the table",
                    "ten minutes ago"
                ],
                "acceptable": [
                    "My keys were on the table ten minutes ago."
                ],
                "grammarNote": "Chủ ngữ số nhiều 'My keys' đi với 'were' trong quá khứ."
            },
            {
                "id": "buoc1-was-were-s11",
                "vietnamese": "Đã có một vụ tai nạn giao thông nghiêm trọng gần trường học ngày hôm qua.",
                "target": "There was a serious traffic accident near the school yesterday.",
                "masked": [
                    "T****",
                    "w**",
                    "a",
                    "s******",
                    "t******",
                    "a*******",
                    "n***",
                    "t**",
                    "s*****",
                    "y********."
                ],
                "hints": [
                    "There was a serious traffic accident",
                    "near the school yesterday"
                ],
                "acceptable": [
                    "There was a serious traffic accident near the school yesterday."
                ],
                "grammarNote": "'There was' dùng cho danh từ đếm được số ít trong quá khứ ('a serious traffic accident')."
            },
            {
                "id": "buoc1-was-were-s12",
                "vietnamese": "Họ đã rất ngạc nhiên khi nghe tin tức đó.",
                "target": "They were very surprised to hear the news.",
                "masked": [
                    "T***",
                    "w***",
                    "v***",
                    "s********",
                    "t*",
                    "h***",
                    "t**",
                    "n***."
                ],
                "hints": [
                    "were very surprised",
                    "to hear the news"
                ],
                "acceptable": [
                    "They were very surprised to hear the news."
                ],
                "grammarNote": "Chủ ngữ số nhiều 'They' đi với 'were'. Cấu trúc: were + surprised + to V."
            },
            {
                "id": "buoc1-was-were-s13",
                "vietnamese": "Khách sạn đó không đắt lắm nhưng rất sạch sẽ và thoải mái.",
                "target": "The hotel was not very expensive but it was very clean and comfortable.",
                "masked": [
                    "T**",
                    "h****",
                    "w**",
                    "n**",
                    "v***",
                    "e********",
                    "b**",
                    "i*",
                    "w**",
                    "v***",
                    "c****",
                    "a**",
                    "c**********."
                ],
                "hints": [
                    "was not very expensive",
                    "clean and comfortable"
                ],
                "acceptable": [
                    "The hotel was not very expensive but it was very clean and comfortable.",
                    "The hotel wasn't very expensive but it was very clean and comfortable."
                ],
                "grammarNote": "Miêu tả đặc điểm trong quá khứ: was not / was + tính từ."
            },
            {
                "id": "buoc1-was-were-s14",
                "vietnamese": "Bạn có ở văn phòng lúc 3 giờ chiều hôm qua không?",
                "target": "Were you at the office at 3 PM yesterday?",
                "masked": [
                    "W***",
                    "y**",
                    "a*",
                    "t**",
                    "o*****",
                    "a*",
                    "3",
                    "P*",
                    "y********?"
                ],
                "hints": [
                    "Were you at the office",
                    "at 3 PM yesterday"
                ],
                "acceptable": [
                    "Were you at the office at 3 PM yesterday?",
                    "Were you at the office at 3 pm yesterday?"
                ],
                "grammarNote": "Câu hỏi nghi vấn Yes/No với chủ ngữ 'you': Were you...?"
            },
            {
                "id": "buoc1-was-were-s15",
                "vietnamese": "Những đứa trẻ đã rất đói sau chuyến đi bộ đường dài.",
                "target": "The children were very hungry after the hike.",
                "masked": [
                    "T**",
                    "c*******",
                    "w***",
                    "v***",
                    "h*****",
                    "a****",
                    "t**",
                    "h***."
                ],
                "hints": [
                    "The children were very hungry",
                    "after the hike"
                ],
                "acceptable": [
                    "The children were very hungry after the hike.",
                    "The kids were very hungry after the hike."
                ],
                "grammarNote": "'The children' là danh từ số nhiều bất quy tắc (từ 'child'), đi với 'were'."
            },
            {
                "id": "buoc1-was-were-s16",
                "vietnamese": "Tôi đã từng là một giáo viên tiếng Anh cách đây 5 năm.",
                "target": "I was an English teacher five years ago.",
                "masked": [
                    "I",
                    "w**",
                    "a*",
                    "E******",
                    "t******",
                    "f***",
                    "y****",
                    "a**."
                ],
                "hints": [
                    "was an English teacher",
                    "five years ago"
                ],
                "acceptable": [
                    "I was an English teacher five years ago."
                ],
                "grammarNote": "Diễn tả nghề nghiệp hoặc trạng thái trong quá khứ: I + was + an + N."
            },
            {
                "id": "buoc1-was-were-s17",
                "vietnamese": "Đường phố rất vắng vẻ vì lúc đó là đêm muộn.",
                "target": "The streets were very quiet because it was late at night.",
                "masked": [
                    "T**",
                    "s******",
                    "w***",
                    "v***",
                    "q****",
                    "b******",
                    "i*",
                    "w**",
                    "l***",
                    "a*",
                    "n****."
                ],
                "hints": [
                    "The streets were very quiet",
                    "because it was late at night"
                ],
                "acceptable": [
                    "The streets were very quiet because it was late at night."
                ],
                "grammarNote": "'The streets' (số nhiều) đi với 'were'; 'it' (thời gian) đi với 'was'."
            },
            {
                "id": "buoc1-was-were-s18",
                "vietnamese": "Kỳ thi không quá khó đối với những học sinh chăm chỉ.",
                "target": "The exam was not too difficult for hardworking students.",
                "masked": [
                    "T**",
                    "e***",
                    "w**",
                    "n**",
                    "t**",
                    "d********",
                    "f**",
                    "h**********",
                    "s*******."
                ],
                "hints": [
                    "The exam was not too difficult",
                    "for hardworking students"
                ],
                "acceptable": [
                    "The exam was not too difficult for hardworking students.",
                    "The exam wasn't too difficult for hardworking students."
                ],
                "grammarNote": "Phủ định quá khứ số ít: 'was not' (hoặc 'wasn't')."
            },
            {
                "id": "buoc1-was-were-s19",
                "vietnamese": "Đã có ai ở đó để giúp đỡ bạn không?",
                "target": "Was there anyone there to help you?",
                "masked": [
                    "W**",
                    "t****",
                    "a*****",
                    "t****",
                    "t*",
                    "h***",
                    "y**?"
                ],
                "hints": [
                    "Was there anyone there",
                    "to help you"
                ],
                "acceptable": [
                    "Was there anyone there to help you?"
                ],
                "grammarNote": "Đại từ bất định 'anyone' luôn chia số ít, dùng 'Was there anyone...?'."
            },
            {
                "id": "buoc1-was-were-s20",
                "vietnamese": "Bố mẹ tôi đã rất tự hào khi tôi tốt nghiệp đại học.",
                "target": "My parents were very proud when I graduated from university.",
                "masked": [
                    "M*",
                    "p******",
                    "w***",
                    "v***",
                    "p****",
                    "w***",
                    "I",
                    "g********",
                    "f***",
                    "u*********."
                ],
                "hints": [
                    "were very proud",
                    "when I graduated from university"
                ],
                "acceptable": [
                    "My parents were very proud when I graduated from university."
                ],
                "grammarNote": "'My parents' là danh từ số nhiều đi với 'were'. Cấu trúc: were proud."
            }
        ]
    },
    {
      "id": "buoc1-there-is-there-are",
      "aliasIds": [
        "write-there-is-there-are",
        "write-there-is",
        "write-there-are",
        "write-there-is-are"
      ],
      "title": "Cấu trúc tồn tại: There is, There are",
      "step": "Bước 1",
      "level": "A1 - A2",
      "desc": "Luyện dịch 20 câu làm chủ cấu trúc chỉ sự tồn tại (There is / There are / There was / There were) với danh từ đếm được và không đếm được (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc1-there-is-there-are-s1",
          "vietnamese": "Có một cái cây lớn ở trước nhà tôi.",
          "target": "There is a big tree in front of my house.",
          "masked": ["T****", "i*", "a", "b**", "t***", "i*", "f****", "o*", "m*", "h****."],
          "hints": ["There is a big tree", "in front of my house"],
          "acceptable": ["There is a big tree in front of my house."],
          "grammarNote": "Cấu trúc \"There is + danh từ đếm được số ít\" (\"a big tree\")."
        },
        {
          "id": "buoc1-there-is-there-are-s2",
          "vietnamese": "Có rất nhiều sinh viên trong thư viện vào buổi chiều.",
          "target": "There are many students in the library in the afternoon.",
          "masked": ["T****", "a**", "m***", "s*******", "i*", "t**", "l******", "i*", "t**", "a********."],
          "hints": ["There are many students", "in the library", "in the afternoon"],
          "acceptable": ["There are many students in the library in the afternoon.", "There are a lot of students in the library in the afternoon."],
          "grammarNote": "Cấu trúc \"There are + danh từ đếm được số nhiều\" (\"many students\")."
        },
        {
          "id": "buoc1-there-is-there-are-s3",
          "vietnamese": "Có một ít nước trong chai trên bàn.",
          "target": "There is some water in the bottle on the table.",
          "masked": ["T****", "i*", "s***", "w****", "i*", "t**", "b*****", "o*", "t**", "t****."],
          "hints": ["There is some water", "in the bottle on the table"],
          "acceptable": ["There is some water in the bottle on the table."],
          "grammarNote": "\"water\" là danh từ không đếm được, luôn dùng \"There is\"."
        },
        {
          "id": "buoc1-there-is-there-are-s4",
          "vietnamese": "Có hai chiếc ô tô đỗ bên ngoài cổng trường.",
          "target": "There are two cars parked outside the school gate.",
          "masked": ["T****", "a**", "t**", "c***", "p*****", "o******", "t**", "s*****", "g***."],
          "hints": ["There are two cars", "parked outside the school gate"],
          "acceptable": ["There are two cars parked outside the school gate."],
          "grammarNote": "\"two cars\" là số nhiều nên dùng \"There are\". Rút gọn mệnh đề quan hệ dạng bị động: \"parked outside...\"."
        },
        {
          "id": "buoc1-there-is-there-are-s5",
          "vietnamese": "Có một siêu thị mới gần căn hộ của bạn không?",
          "target": "Is there a new supermarket near your apartment?",
          "masked": ["I*", "t****", "a", "n**", "s**********", "n***", "y***", "a********?"],
          "hints": ["Is there a new supermarket", "near your apartment"],
          "acceptable": ["Is there a new supermarket near your apartment?"],
          "grammarNote": "Câu hỏi nghi vấn đảo to be lên đầu: \"Is there + a/an + N (số ít)?\"."
        },
        {
          "id": "buoc1-there-is-there-are-s6",
          "vietnamese": "Có bao nhiêu người trong phòng họp bây giờ?",
          "target": "How many people are there in the meeting room now?",
          "masked": ["H**", "m***", "p*****", "a**", "t****", "i*", "t**", "m******", "r***", "n**?"],
          "hints": ["How many people are there", "in the meeting room now"],
          "acceptable": ["How many people are there in the meeting room now?"],
          "grammarNote": "Cấu trúc hỏi số lượng: \"How many + N (số nhiều) + are there + in...?\"."
        },
        {
          "id": "buoc1-there-is-there-are-s7",
          "vietnamese": "Không có đủ thông tin để đưa ra quyết định vào lúc này.",
          "target": "There is not enough information to make a decision at this moment.",
          "masked": ["T****", "i*", "n**", "e*****", "i**********", "t*", "m***", "a", "d*******", "a*", "t***", "m*****."],
          "hints": ["There is not enough information", "to make a decision"],
          "acceptable": ["There is not enough information to make a decision at this moment.", "There isn't enough information to make a decision at this moment."],
          "grammarNote": "\"information\" là danh từ không đếm được -> dùng \"There is not enough + N\"."
        },
        {
          "id": "buoc1-there-is-there-are-s8",
          "vietnamese": "Không có bất kỳ chiếc ghế trống nào trong rạp chiếu phim.",
          "target": "There are not any empty seats in the cinema.",
          "masked": ["T****", "a**", "n**", "a**", "e****", "s****", "i*", "t**", "c*****."],
          "hints": ["There are not any empty seats", "in the cinema"],
          "acceptable": ["There are not any empty seats in the cinema.", "There aren't any empty seats in the cinema.", "There are no empty seats in the cinema."],
          "grammarNote": "Phủ định với danh từ số nhiều dùng \"There aren't any + N\" hoặc \"There are no + N\"."
        },
        {
          "id": "buoc1-there-is-there-are-s9",
          "vietnamese": "Có một vài cuốn sách thú vị trên kệ sách của tôi.",
          "target": "There are several interesting books on my bookshelf.",
          "masked": ["T****", "a**", "s******", "i**********", "b****", "o*", "m*", "b********."],
          "hints": ["There are several interesting books", "on my bookshelf"],
          "acceptable": ["There are several interesting books on my bookshelf.", "There are some interesting books on my bookshelf."],
          "grammarNote": "\"several\" (một vài) luôn đi kèm danh từ số nhiều -> dùng \"There are\"."
        },
        {
          "id": "buoc1-there-is-there-are-s10",
          "vietnamese": "Có một vấn đề nghiêm trọng với hệ thống máy tính này.",
          "target": "There is a serious problem with this computer system.",
          "masked": ["T****", "i*", "a", "s******", "p******", "w***", "t***", "c*******", "s*****."],
          "hints": ["There is a serious problem", "with this computer system"],
          "acceptable": ["There is a serious problem with this computer system."],
          "grammarNote": "Cụm danh từ số ít: \"a serious problem\" đi với \"There is\"."
        },
        {
          "id": "buoc1-there-is-there-are-s11",
          "vietnamese": "Đã có một vụ tai nạn giao thông trên đường cao tốc sáng nay.",
          "target": "There was a traffic accident on the highway this morning.",
          "masked": ["T****", "w**", "a", "t******", "a*******", "o*", "t**", "h******", "t***", "m******."],
          "hints": ["There was a traffic accident", "on the highway this morning"],
          "acceptable": ["There was a traffic accident on the highway this morning."],
          "grammarNote": "Thời điểm trong quá khứ (\"this morning\"), số ít -> dùng \"There was\"."
        },
        {
          "id": "buoc1-there-is-there-are-s12",
          "vietnamese": "Đã có rất nhiều người tham dự buổi hòa nhạc tối qua.",
          "target": "There were a lot of people attending the concert last night.",
          "masked": ["T****", "w***", "a", "l**", "o*", "p*****", "a********", "t**", "c******", "l***", "n****."],
          "hints": ["There were a lot of people", "attending the concert last night"],
          "acceptable": ["There were a lot of people attending the concert last night.", "There were many people attending the concert last night."],
          "grammarNote": "Thời điểm quá khứ (\"last night\"), \"people\" là danh từ số nhiều -> dùng \"There were\"."
        },
        {
          "id": "buoc1-there-is-there-are-s13",
          "vietnamese": "Có một công viên xanh tuyệt đẹp ở trung tâm thành phố.",
          "target": "There is a beautiful green park in the center of the city.",
          "masked": ["T****", "i*", "a", "b********", "g****", "p***", "i*", "t**", "c*****", "o*", "t**", "c***."],
          "hints": ["There is a beautiful green park", "in the center of the city"],
          "acceptable": ["There is a beautiful green park in the center of the city."],
          "grammarNote": "\"a beautiful green park\" là danh từ số ít -> dùng \"There is\"."
        },
        {
          "id": "buoc1-there-is-there-are-s14",
          "vietnamese": "Có ba lý do chính giải thích tại sao du lịch lại phát triển.",
          "target": "There are three main reasons why tourism is growing.",
          "masked": ["T****", "a**", "t****", "m***", "r******", "w**", "t******", "i*", "g******."],
          "hints": ["There are three main reasons", "why tourism is growing"],
          "acceptable": ["There are three main reasons why tourism is growing.", "There are three main reasons why tourism is developing."],
          "grammarNote": "Mệnh đề quan hệ chỉ lý do: \"There are three main reasons why + S + V\"."
        },
        {
          "id": "buoc1-there-is-there-are-s15",
          "vietnamese": "Có quá nhiều xe cộ trên đường vào giờ cao điểm.",
          "target": "There is too much traffic on the road during rush hour.",
          "masked": ["T****", "i*", "t**", "m***", "t******", "o*", "t**", "r***", "d*****", "r***", "h***."],
          "hints": ["There is too much traffic", "during rush hour"],
          "acceptable": ["There is too much traffic on the road during rush hour."],
          "grammarNote": "\"traffic\" (giao thông/xe cộ) là danh từ không đếm được -> dùng \"too much\" và \"There is\"."
        },
        {
          "id": "buoc1-there-is-there-are-s16",
          "vietnamese": "Không có sữa trong tủ lạnh, vì vậy tôi cần đi chợ.",
          "target": "There is no milk in the fridge, so I need to go shopping.",
          "masked": ["T****", "i*", "n*", "m***", "i*", "t**", "f*****", "s*", "I", "n***", "t*", "g*", "s*******."],
          "hints": ["There is no milk in the fridge", "so I need to go shopping"],
          "acceptable": ["There is no milk in the fridge, so I need to go shopping.", "There is no milk in the fridge, so I need to go to the market."],
          "grammarNote": "\"milk\" là danh từ không đếm được, dùng \"There is no + N\" hoặc \"There is not any + N\"."
        },
        {
          "id": "buoc1-there-is-there-are-s17",
          "vietnamese": "Có những sự khác biệt rõ rệt giữa hai nền văn hóa này.",
          "target": "There are significant differences between these two cultures.",
          "masked": ["T****", "a**", "s**********", "d**********", "b******", "t****", "t**", "c*******."],
          "hints": ["There are significant differences", "between these two cultures"],
          "acceptable": ["There are significant differences between these two cultures."],
          "grammarNote": "Cấu trúc học thuật IELTS: \"There are significant differences between A and B\"."
        },
        {
          "id": "buoc1-there-is-there-are-s18",
          "vietnamese": "Có một cuộc họp quan trọng với giám đốc vào lúc 9 giờ sáng mai.",
          "target": "There is an important meeting with the director at 9 AM tomorrow.",
          "masked": ["T****", "i*", "a*", "i********", "m******", "w***", "t**", "d*******", "a*", "9", "A*", "t*******."],
          "hints": ["There is an important meeting", "with the director at 9 AM tomorrow"],
          "acceptable": ["There is an important meeting with the director at 9 AM tomorrow."],
          "grammarNote": "Dùng \"an\" trước từ bắt đầu bằng nguyên âm (\"important meeting\") + \"There is\"."
        },
        {
          "id": "buoc1-there-is-there-are-s19",
          "vietnamese": "Có nhiều cơ hội việc làm cho sinh viên mới tốt nghiệp ở thành phố này.",
          "target": "There are many job opportunities for new graduates in this city.",
          "masked": ["T****", "a**", "m***", "j**", "o************", "f**", "n**", "g********", "i*", "t***", "c***."],
          "hints": ["There are many job opportunities", "for new graduates in this city"],
          "acceptable": ["There are many job opportunities for new graduates in this city.", "There are many job opportunities for fresh graduates in this city."],
          "grammarNote": "Cụm danh từ số nhiều: \"job opportunities\" -> dùng \"There are many + N\"."
        },
        {
          "id": "buoc1-there-is-there-are-s20",
          "vietnamese": "Có bất kỳ câu hỏi nào về bài giảng hôm nay không?",
          "target": "Are there any questions about today's lecture?",
          "masked": ["A**", "t****", "a**", "q********", "a****", "t*****'*", "l******?"],
          "hints": ["Are there any questions", "about today's lecture"],
          "acceptable": ["Are there any questions about today's lecture?"],
          "grammarNote": "Câu hỏi số nhiều dùng: \"Are there any + N (số nhiều)?\"."
        }
      ]
    },
    {
      "id": "buoc1-present-continuous",
      "aliasIds": [
        "write-pres-cont"
      ],
      "title": "Hiện tại tiếp diễn (Present Continuous)",
      "step": "Bước 1",
      "level": "A2",
      "desc": "Luyện dịch 25 câu diễn tả hành động đang diễn ra và xu hướng đang thay đổi trong xã hội.",
      "sentences": [
        {
          "id": "buoc1-present-continuous-s1",
          "vietnamese": "Ngày càng nhiều người trẻ đang có xu hướng làm việc từ xa.",
          "target": "More and more young people are choosing to work remotely.",
          "masked": [
            "M***",
            "a**",
            "m***",
            "y****",
            "p*****",
            "a**",
            "c*******",
            "t*",
            "w***",
            "r*******."
          ],
          "hints": [
            "More and more young people",
            "are choosing to work remotely"
          ],
          "acceptable": [
            "More and more young people are choosing to work remotely."
          ],
          "grammarNote": "So sánh kép \"More and more + N\" kết hợp thì HTTD \"are choosing\"."
        },
        {
          "id": "buoc1-present-continuous-s2",
          "vietnamese": "Giá nhà đất tại các thành phố lớn đang tăng lên nhanh chóng.",
          "target": "Housing prices in major cities are rising rapidly.",
          "masked": [
            "H******",
            "p*****",
            "i*",
            "m****",
            "c*****",
            "a**",
            "r*****",
            "r******."
          ],
          "hints": [
            "Housing prices in major cities",
            "are rising rapidly"
          ],
          "acceptable": [
            "Housing prices in major cities are rising rapidly."
          ],
          "grammarNote": "Nội động từ \"rise\" chia ở thì HTTD \"are rising\"."
        },
        {
          "id": "buoc1-present-continuous-s3",
          "vietnamese": "Chính phủ đang thực hiện các chính sách mới để bảo vệ môi trường.",
          "target": "The government is implementing new policies to protect the environment.",
          "masked": [
            "T**",
            "g*********",
            "i*",
            "i***********",
            "n**",
            "p*******",
            "t*",
            "p******",
            "t**",
            "e**********."
          ],
          "hints": [
            "The government is implementing",
            "new policies to protect the environment"
          ],
          "acceptable": [
            "The government is implementing new policies to protect the environment."
          ],
          "grammarNote": "\"implement new policies\" (thực thi chính sách mới)."
        },
        {
          "id": "buoc1-present-continuous-s4",
          "vietnamese": "Tôi đang chuẩn bị hồ sơ du học cho học kỳ tới.",
          "target": "I am preparing study abroad documents for the next semester.",
          "masked": [
            "I",
            "a*",
            "p********",
            "s****",
            "a*****",
            "d********",
            "f**",
            "t**",
            "n***",
            "s*******."
          ],
          "hints": [
            "am preparing",
            "study abroad documents"
          ],
          "acceptable": [
            "I am preparing study abroad documents for the next semester."
          ],
          "grammarNote": "HTTD với kế hoạch tương lai gần đã chuẩn bị: \"am preparing\"."
        },
        {
          "id": "buoc1-present-continuous-s5",
          "vietnamese": "Thời tiết đang trở nên ấm áp hơn khi mùa xuân đến.",
          "target": "The weather is becoming warmer as spring arrives.",
          "masked": [
            "T**",
            "w******",
            "i*",
            "b*******",
            "w*****",
            "a*",
            "s*****",
            "a******."
          ],
          "hints": [
            "is becoming warmer",
            "as spring arrives"
          ],
          "acceptable": [
            "The weather is becoming warmer as spring arrives."
          ],
          "grammarNote": "Diễn tả sự thay đổi: \"is becoming / getting + comparative adj\"."
        },
        {
          "id": "buoc1-present-continuous-s6",
          "vietnamese": "Họ đang xây dựng một cây cầu mới bắc qua sông Hồng.",
          "target": "They are building a new bridge across the Red River.",
          "masked": [
            "T***",
            "a**",
            "b*******",
            "a",
            "n**",
            "b*****",
            "a*****",
            "t**",
            "R**",
            "R****."
          ],
          "hints": [
            "are building a new bridge",
            "across the Red River"
          ],
          "acceptable": [
            "They are building a new bridge across the Red River."
          ],
          "grammarNote": "Hành động đang tiến hành: \"are building\"."
        },
        {
          "id": "buoc1-present-continuous-s7",
          "vietnamese": "Các công ty công nghệ đang đầu tư hàng triệu đô la vào trí tuệ nhân tạo.",
          "target": "Tech companies are investing millions of dollars in artificial intelligence.",
          "masked": [
            "T***",
            "c********",
            "a**",
            "i********",
            "m*******",
            "o*",
            "d******",
            "i*",
            "a*********",
            "i***********."
          ],
          "hints": [
            "are investing millions of dollars in",
            "artificial intelligence"
          ],
          "acceptable": [
            "Tech companies are investing millions of dollars in artificial intelligence."
          ],
          "grammarNote": "Cấu trúc: invest in something. Thuật ngữ: \"artificial intelligence\"."
        },
        {
          "id": "buoc1-present-continuous-s8",
          "vietnamese": "Chúng tôi đang tìm kiếm giải pháp hiệu quả cho vấn đề rác thải nhựa.",
          "target": "We are looking for effective solutions to the plastic waste problem.",
          "masked": [
            "W*",
            "a**",
            "l******",
            "f**",
            "e********",
            "s********",
            "t*",
            "t**",
            "p******",
            "w****",
            "p******."
          ],
          "hints": [
            "are looking for effective solutions to",
            "plastic waste"
          ],
          "acceptable": [
            "We are looking for effective solutions to the plastic waste problem."
          ],
          "grammarNote": "Collocation: \"solution to a problem\"."
        },
        {
          "id": "buoc1-present-continuous-s9",
          "vietnamese": "Cô ấy đang tham gia một khoá học trực tuyến về quản lý tài chính.",
          "target": "She is taking an online course on financial management.",
          "masked": [
            "S**",
            "i*",
            "t*****",
            "a*",
            "o*****",
            "c*****",
            "o*",
            "f********",
            "m*********."
          ],
          "hints": [
            "is taking an online course on",
            "financial management"
          ],
          "acceptable": [
            "She is taking an online course on financial management."
          ],
          "grammarNote": "Cụm từ: \"take / attend a course\"."
        },
        {
          "id": "buoc1-present-continuous-s10",
          "vietnamese": "Nền kinh tế thế giới đang phục hồi sau đại dịch.",
          "target": "The global economy is recovering after the pandemic.",
          "masked": [
            "T**",
            "g*****",
            "e******",
            "i*",
            "r*********",
            "a****",
            "t**",
            "p*******."
          ],
          "hints": [
            "The global economy is recovering",
            "after the pandemic"
          ],
          "acceptable": [
            "The global economy is recovering after the pandemic."
          ],
          "grammarNote": "Nội động từ \"recover\" ở thì HTTD: \"is recovering\"."
        },
        {
          "id": "buoc1-present-continuous-s11",
          "vietnamese": "Học sinh đang ôn thi chăm chỉ cho kỳ thi tuyển sinh đại học.",
          "target": "Students are studying hard for the university entrance exam.",
          "masked": [
            "S*******",
            "a**",
            "s*******",
            "h***",
            "f**",
            "t**",
            "u*********",
            "e*******",
            "e***."
          ],
          "hints": [
            "are studying hard for",
            "university entrance exam"
          ],
          "acceptable": [
            "Students are studying hard for the university entrance exam."
          ],
          "grammarNote": "Cụm danh từ: \"university entrance exam\"."
        },
        {
          "id": "buoc1-present-continuous-s12",
          "vietnamese": "Băng ở hai cực đang tan chảy với tốc độ đáng báo động.",
          "target": "Polar ice is melting at an alarming rate.",
          "masked": [
            "P****",
            "i**",
            "i*",
            "m******",
            "a*",
            "a*",
            "a*******",
            "r***."
          ],
          "hints": [
            "Polar ice is melting",
            "at an alarming rate"
          ],
          "acceptable": [
            "Polar ice is melting at an alarming rate."
          ],
          "grammarNote": "Cụm thành ngữ học thuật IELTS: \"at an alarming rate\"."
        },
        {
          "id": "buoc1-present-continuous-s13",
          "vietnamese": "Số lượng ô tô điện trên đường phố đang tăng trưởng đều đặn.",
          "target": "The number of electric cars on the streets is growing steadily.",
          "masked": [
            "T**",
            "n*****",
            "o*",
            "e*******",
            "c***",
            "o*",
            "t**",
            "s******",
            "i*",
            "g******",
            "s*******."
          ],
          "hints": [
            "The number of electric cars",
            "is growing steadily"
          ],
          "acceptable": [
            "The number of electric cars on the streets is growing steadily."
          ],
          "grammarNote": "\"The number of + N số nhiều\" đi với động từ số ít (\"is growing\")."
        },
        {
          "id": "buoc1-present-continuous-s14",
          "vietnamese": "Tôi đang cố gắng cải thiện kỹ năng nói tiếng Anh của mình mỗi ngày.",
          "target": "I am trying to improve my English speaking skills every day.",
          "masked": [
            "I",
            "a*",
            "t*****",
            "t*",
            "i******",
            "m*",
            "E******",
            "s*******",
            "s*****",
            "e****",
            "d**."
          ],
          "hints": [
            "am trying to improve",
            "English speaking skills"
          ],
          "acceptable": [
            "I am trying to improve my English speaking skills every day."
          ],
          "grammarNote": "Cấu trúc: try to do something."
        },
        {
          "id": "buoc1-present-continuous-s15",
          "vietnamese": "Nhiều gia đình đang chuyển từ nông thôn lên thành phố để tìm việc làm.",
          "target": "Many families are moving from rural areas to cities to find jobs.",
          "masked": [
            "M***",
            "f*******",
            "a**",
            "m*****",
            "f***",
            "r****",
            "a****",
            "t*",
            "c*****",
            "t*",
            "f***",
            "j***."
          ],
          "hints": [
            "are moving from rural areas to cities",
            "to find jobs"
          ],
          "acceptable": [
            "Many families are moving from rural areas to cities to find jobs."
          ],
          "grammarNote": "Collocation: \"rural areas\" (nông thôn), \"urban centers\" (đô thị)."
        },
        {
          "id": "buoc1-present-continuous-s16",
          "vietnamese": "Anh ấy đang thiết kế lại trang web cho doanh nghiệp gia đình.",
          "target": "He is redesigning the website for his family business.",
          "masked": [
            "H*",
            "i*",
            "r**********",
            "t**",
            "w******",
            "f**",
            "h**",
            "f*****",
            "b*******."
          ],
          "hints": [
            "is redesigning the website for",
            "family business"
          ],
          "acceptable": [
            "He is redesigning the website for his family business."
          ],
          "grammarNote": "Động từ \"redesign\" ở thì HTTD: \"is redesigning\"."
        },
        {
          "id": "buoc1-present-continuous-s17",
          "vietnamese": "Các chuyên gia y tế đang nghiên cứu một loại vắc-xin thế hệ mới.",
          "target": "Medical experts are researching a new generation vaccine.",
          "masked": [
            "M******",
            "e******",
            "a**",
            "r**********",
            "a",
            "n**",
            "g*********",
            "v******."
          ],
          "hints": [
            "Medical experts are researching",
            "a new generation vaccine"
          ],
          "acceptable": [
            "Medical experts are researching a new generation vaccine."
          ],
          "grammarNote": "Cụm danh từ: \"next-generation vaccine\"."
        },
        {
          "id": "buoc1-present-continuous-s18",
          "vietnamese": "Người tiêu dùng đang chú ý nhiều hơn đến nguồn gốc thực phẩm.",
          "target": "Consumers are paying more attention to the origin of food.",
          "masked": [
            "C********",
            "a**",
            "p*****",
            "m***",
            "a********",
            "t*",
            "t**",
            "o*****",
            "o*",
            "f***."
          ],
          "hints": [
            "are paying more attention to",
            "the origin of food"
          ],
          "acceptable": [
            "Consumers are paying more attention to the origin of food."
          ],
          "grammarNote": "Collocation: \"pay attention to something\"."
        },
        {
          "id": "buoc1-present-continuous-s19",
          "vietnamese": "Tôi đang đọc một cuốn tiểu thuyết rất thú vị về lịch sử La Mã.",
          "target": "I am reading a very interesting novel about Roman history.",
          "masked": [
            "I",
            "a*",
            "r******",
            "a",
            "v***",
            "i**********",
            "n****",
            "a****",
            "R****",
            "h******."
          ],
          "hints": [
            "am reading a very interesting novel about",
            "Roman history"
          ],
          "acceptable": [
            "I am reading a very interesting novel about Roman history."
          ],
          "grammarNote": "Hành động diễn ra xung quanh thời điểm nói: \"am reading\"."
        },
        {
          "id": "buoc1-present-continuous-s20",
          "vietnamese": "Các trường đại học đang áp dụng công nghệ số vào giảng dạy.",
          "target": "Universities are applying digital technology to teaching.",
          "masked": [
            "U***********",
            "a**",
            "a*******",
            "d******",
            "t*********",
            "t*",
            "t*******."
          ],
          "hints": [
            "are applying digital technology to",
            "teaching"
          ],
          "acceptable": [
            "Universities are applying digital technology to teaching."
          ],
          "grammarNote": "Cấu trúc: apply something to something."
        },
        {
          "id": "buoc1-present-continuous-s21",
          "vietnamese": "Du khách đang đổ về các bãi biển miền Trung trong kỳ nghỉ lễ.",
          "target": "Tourists are flocking to central beaches during the holiday.",
          "masked": [
            "T*******",
            "a**",
            "f*******",
            "t*",
            "c******",
            "b******",
            "d*****",
            "t**",
            "h******."
          ],
          "hints": [
            "Tourists are flocking to",
            "central beaches during the holiday"
          ],
          "acceptable": [
            "Tourists are flocking to central beaches during the holiday."
          ],
          "grammarNote": "Động từ: \"flock to\" (đổ xô về, tụ tập về)."
        },
        {
          "id": "buoc1-present-continuous-s22",
          "vietnamese": "Anh ấy đang học thêm tiếng Tây Ban Nha vào các buổi tối.",
          "target": "He is learning Spanish in the evenings.",
          "masked": [
            "H*",
            "i*",
            "l*******",
            "S******",
            "i*",
            "t**",
            "e*******."
          ],
          "hints": [
            "is learning Spanish",
            "in the evenings"
          ],
          "acceptable": [
            "He is learning Spanish in the evenings."
          ],
          "grammarNote": "Kế hoạch học tập ngắn hạn/tạm thời: \"is learning\"."
        },
        {
          "id": "buoc1-present-continuous-s23",
          "vietnamese": "Các nhà máy đang nỗ lực cắt giảm lượng khí thải độc hại.",
          "target": "Factories are striving to cut down on toxic emissions.",
          "masked": [
            "F********",
            "a**",
            "s*******",
            "t*",
            "c**",
            "d***",
            "o*",
            "t****",
            "e********."
          ],
          "hints": [
            "are striving to cut down on",
            "toxic emissions"
          ],
          "acceptable": [
            "Factories are striving to cut down on toxic emissions."
          ],
          "grammarNote": "Collocation: \"toxic emissions\" (khí thải độc hại)."
        },
        {
          "id": "buoc1-present-continuous-s24",
          "vietnamese": "Dân số người cao tuổi đang tăng lên ở nhiều quốc gia phát triển.",
          "target": "The elderly population is increasing in many developed nations.",
          "masked": [
            "T**",
            "e******",
            "p*********",
            "i*",
            "i*********",
            "i*",
            "m***",
            "d********",
            "n******."
          ],
          "hints": [
            "The elderly population is increasing in",
            "developed nations"
          ],
          "acceptable": [
            "The elderly population is increasing in many developed nations."
          ],
          "grammarNote": "Cụm danh từ: \"the elderly population\", \"developed nations\"."
        },
        {
          "id": "buoc1-present-continuous-s25",
          "vietnamese": "Chúng tôi đang làm việc chặt chẽ với các đối tác nước ngoài.",
          "target": "We are working closely with foreign partners.",
          "masked": [
            "W*",
            "a**",
            "w******",
            "c******",
            "w***",
            "f******",
            "p*******."
          ],
          "hints": [
            "are working closely with",
            "foreign partners"
          ],
          "acceptable": [
            "We are working closely with foreign partners."
          ],
          "grammarNote": "Collocation: \"work closely with somebody\"."
        }
      ]
    },
    {
      "id": "buoc1-present-perfect",
      "aliasIds": [
        "write-pres-perf"
      ],
      "title": "Hiện tại hoàn thành (Present Perfect)",
      "step": "Bước 1",
      "level": "B1",
      "desc": "Luyện dịch 25 câu diễn tả trải nghiệm, kết quả còn lưu lại hoặc hành động kéo dài từ quá khứ đến hiện tại.",
      "sentences": [
        {
          "id": "buoc1-present-perfect-s1",
          "vietnamese": "Công nghệ đã thay đổi hoàn toàn cách chúng ta giao tiếp và làm việc.",
          "target": "Technology has completely changed the way we communicate and work.",
          "masked": [
            "T*********",
            "h**",
            "c*********",
            "c******",
            "t**",
            "w**",
            "w*",
            "c**********",
            "a**",
            "w***."
          ],
          "hints": [
            "Technology has completely changed",
            "the way we communicate and work"
          ],
          "acceptable": [
            "Technology has completely changed the way we communicate and work."
          ],
          "grammarNote": "\"has + V3/ed\" (has changed) với trạng từ \"completely\"."
        },
        {
          "id": "buoc1-present-perfect-s2",
          "vietnamese": "Chúng tôi đã hợp tác với công ty đó trong hơn năm năm qua.",
          "target": "We have cooperated with that company for over five years.",
          "masked": [
            "W*",
            "h***",
            "c*********",
            "w***",
            "t***",
            "c******",
            "f**",
            "o***",
            "f***",
            "y****."
          ],
          "hints": [
            "have cooperated with that company",
            "for over five years"
          ],
          "acceptable": [
            "We have cooperated with that company for over five years."
          ],
          "grammarNote": "Giới từ \"for\" đi với khoảng thời gian trong thì HTHT."
        },
        {
          "id": "buoc1-present-perfect-s3",
          "vietnamese": "Tôi chưa từng trải nghiệm điều gì thú vị như thế này trước đây.",
          "target": "I have never experienced anything so exciting before.",
          "masked": [
            "I",
            "h***",
            "n****",
            "e**********",
            "a*******",
            "s*",
            "e*******",
            "b*****."
          ],
          "hints": [
            "have never experienced",
            "anything so exciting before"
          ],
          "acceptable": [
            "I have never experienced anything so exciting before."
          ],
          "grammarNote": "\"have never + V3/ed\" diễn tả trải nghiệm từ trước đến nay."
        },
        {
          "id": "buoc1-present-perfect-s4",
          "vietnamese": "Chính phủ đã đầu tư rất nhiều tiền vào hệ thống y tế công cộng.",
          "target": "The government has invested a lot of money in the public health system.",
          "masked": [
            "T**",
            "g*********",
            "h**",
            "i*******",
            "a",
            "l**",
            "o*",
            "m****",
            "i*",
            "t**",
            "p*****",
            "h*****",
            "s*****."
          ],
          "hints": [
            "has invested a lot of money in",
            "public health system"
          ],
          "acceptable": [
            "The government has invested a lot of money in the public health system."
          ],
          "grammarNote": "Cấu trúc: invest money in something."
        },
        {
          "id": "buoc1-present-perfect-s5",
          "vietnamese": "Bạn đã từng đến thăm bảo tàng lịch sử quốc gia chưa?",
          "target": "Have you ever visited the national history museum?",
          "masked": [
            "H***",
            "y**",
            "e***",
            "v******",
            "t**",
            "n*******",
            "h******",
            "m*****?"
          ],
          "hints": [
            "Have you ever visited",
            "the national history museum"
          ],
          "acceptable": [
            "Have you ever visited the national history museum?"
          ],
          "grammarNote": "Câu hỏi trải nghiệm: \"Have you ever + V3/ed...?\""
        },
        {
          "id": "buoc1-present-perfect-s6",
          "vietnamese": "Anh ấy đã sống ở Luân Đôn kể từ năm 2018.",
          "target": "He has lived in London since 2018.",
          "masked": [
            "H*",
            "h**",
            "l****",
            "i*",
            "L*****",
            "s****",
            "2***."
          ],
          "hints": [
            "has lived in London",
            "since 2018"
          ],
          "acceptable": [
            "He has lived in London since 2018."
          ],
          "grammarNote": "Giới từ \"since\" đi với mốc thời gian xác định."
        },
        {
          "id": "buoc1-present-perfect-s7",
          "vietnamese": "Nhiều loài động vật hoang dã đã tuyệt chủng do mất môi trường sống.",
          "target": "Many wild animals have become extinct due to habitat loss.",
          "masked": [
            "M***",
            "w***",
            "a******",
            "h***",
            "b*****",
            "e******",
            "d**",
            "t*",
            "h******",
            "l***."
          ],
          "hints": [
            "have become extinct",
            "due to habitat loss"
          ],
          "acceptable": [
            "Many wild animals have become extinct due to habitat loss."
          ],
          "grammarNote": "Collocation: \"become extinct\", \"habitat loss\"."
        },
        {
          "id": "buoc1-present-perfect-s8",
          "vietnamese": "Tôi vừa hoàn thành bản báo cáo quý cho cuộc họp sáng nay.",
          "target": "I have just finished the quarterly report for this morning's meeting.",
          "masked": [
            "I",
            "h***",
            "j***",
            "f*******",
            "t**",
            "q********",
            "r*****",
            "f**",
            "t***",
            "m********",
            "m******."
          ],
          "hints": [
            "have just finished",
            "quarterly report"
          ],
          "acceptable": [
            "I have just finished the quarterly report for this morning's meeting."
          ],
          "grammarNote": "Trạng từ \"just\" diễn tả hành động vừa mới xảy ra."
        },
        {
          "id": "buoc1-present-perfect-s9",
          "vietnamese": "Họ đã phát hiện ra nhiều chứng cứ quan trọng liên quan đến vụ án.",
          "target": "They have discovered several crucial pieces of evidence related to the case.",
          "masked": [
            "T***",
            "h***",
            "d*********",
            "s******",
            "c******",
            "p*****",
            "o*",
            "e*******",
            "r******",
            "t*",
            "t**",
            "c***."
          ],
          "hints": [
            "have discovered",
            "crucial pieces of evidence"
          ],
          "acceptable": [
            "They have discovered several crucial pieces of evidence related to the case."
          ],
          "grammarNote": "\"evidence\" là danh từ không đếm được -> dùng \"pieces of evidence\"."
        },
        {
          "id": "buoc1-present-perfect-s10",
          "vietnamese": "Dự án này đã đạt được những kết quả rất khả quan.",
          "target": "This project has achieved very encouraging results.",
          "masked": [
            "T***",
            "p******",
            "h**",
            "a*******",
            "v***",
            "e**********",
            "r******."
          ],
          "hints": [
            "has achieved",
            "encouraging results"
          ],
          "acceptable": [
            "This project has achieved very encouraging results."
          ],
          "grammarNote": "Collocation: \"achieve encouraging results\"."
        },
        {
          "id": "buoc1-present-perfect-s11",
          "vietnamese": "Chúng tôi vẫn chưa nhận được câu trả lời chính thức từ trường đại học.",
          "target": "We have not yet received an official reply from the university.",
          "masked": [
            "W*",
            "h***",
            "n**",
            "y**",
            "r*******",
            "a*",
            "o*******",
            "r****",
            "f***",
            "t**",
            "u*********."
          ],
          "hints": [
            "have not yet received",
            "official reply"
          ],
          "acceptable": [
            "We have not yet received an official reply from the university."
          ],
          "grammarNote": "Vị trí của \"yet\": \"have not yet + V3/ed\"."
        },
        {
          "id": "buoc1-present-perfect-s12",
          "vietnamese": "Biến đổi khí hậu đã gây ra nhiều hiện tượng thời tiết cực đoan.",
          "target": "Climate change has caused numerous extreme weather events.",
          "masked": [
            "C******",
            "c*****",
            "h**",
            "c*****",
            "n*******",
            "e******",
            "w******",
            "e*****."
          ],
          "hints": [
            "has caused",
            "extreme weather events"
          ],
          "acceptable": [
            "Climate change has caused numerous extreme weather events."
          ],
          "grammarNote": "Collocation IELTS: \"extreme weather events\"."
        },
        {
          "id": "buoc1-present-perfect-s13",
          "vietnamese": "Cô ấy đã giành được học bổng toàn phần cho chương trình thạc sĩ.",
          "target": "She has won a full scholarship for the master's program.",
          "masked": [
            "S**",
            "h**",
            "w**",
            "a",
            "f***",
            "s**********",
            "f**",
            "t**",
            "m*******",
            "p******."
          ],
          "hints": [
            "has won a full scholarship for",
            "master's program"
          ],
          "acceptable": [
            "She has won a full scholarship for the master's program."
          ],
          "grammarNote": "Cụm từ: \"win a full scholarship\"."
        },
        {
          "id": "buoc1-present-perfect-s14",
          "vietnamese": "Nhiều thành phố lớn đã xây dựng các làn đường dành riêng cho xe đạp.",
          "target": "Many major cities have built dedicated lanes for bicycles.",
          "masked": [
            "M***",
            "m****",
            "c*****",
            "h***",
            "b****",
            "d********",
            "l****",
            "f**",
            "b*******."
          ],
          "hints": [
            "have built dedicated lanes for",
            "bicycles"
          ],
          "acceptable": [
            "Many major cities have built dedicated lanes for bicycles."
          ],
          "grammarNote": "Từ vựng: \"dedicated lanes\" (làn đường dành riêng)."
        },
        {
          "id": "buoc1-present-perfect-s15",
          "vietnamese": "Khoa học y tế đã kéo dài tuổi thọ trung bình của con người.",
          "target": "Medical science has extended human life expectancy.",
          "masked": [
            "M******",
            "s******",
            "h**",
            "e*******",
            "h****",
            "l***",
            "e*********."
          ],
          "hints": [
            "has extended",
            "human life expectancy"
          ],
          "acceptable": [
            "Medical science has extended human life expectancy."
          ],
          "grammarNote": "Thuật ngữ IELTS: \"life expectancy\" (tuổi thọ trung bình)."
        },
        {
          "id": "buoc1-present-perfect-s16",
          "vietnamese": "Tôi đã làm mất chìa khoá và bây giờ không thể vào nhà.",
          "target": "I have lost my keys and cannot get into the house now.",
          "masked": [
            "I",
            "h***",
            "l***",
            "m*",
            "k***",
            "a**",
            "c*****",
            "g**",
            "i***",
            "t**",
            "h****",
            "n**."
          ],
          "hints": [
            "have lost my keys",
            "cannot get into the house now"
          ],
          "acceptable": [
            "I have lost my keys and cannot get into the house now."
          ],
          "grammarNote": "Hành động quá khứ để lại kết quả trực tiếp ở hiện tại."
        },
        {
          "id": "buoc1-present-perfect-s17",
          "vietnamese": "Công ty đã mở rộng mạng lưới phân phối sang các nước lân cận.",
          "target": "The company has expanded its distribution network to neighboring countries.",
          "masked": [
            "T**",
            "c******",
            "h**",
            "e*******",
            "i**",
            "d***********",
            "n******",
            "t*",
            "n**********",
            "c********."
          ],
          "hints": [
            "has expanded its distribution network to",
            "neighboring countries"
          ],
          "acceptable": [
            "The company has expanded its distribution network to neighboring countries."
          ],
          "grammarNote": "Collocation: \"distribution network\" (mạng lưới phân phối)."
        },
        {
          "id": "buoc1-present-perfect-s18",
          "vietnamese": "Bạn đã đọc xong cuốn sách mà tôi cho mượn tuần trước chưa?",
          "target": "Have you finished reading the book I lent you last week?",
          "masked": [
            "H***",
            "y**",
            "f*******",
            "r******",
            "t**",
            "b***",
            "I",
            "l***",
            "y**",
            "l***",
            "w***?"
          ],
          "hints": [
            "Have you finished reading",
            "the book I lent you last week"
          ],
          "acceptable": [
            "Have you finished reading the book I lent you last week?"
          ],
          "grammarNote": "Mệnh đề quan hệ rút gọn đại từ: \"the book I lent you\"."
        },
        {
          "id": "buoc1-present-perfect-s19",
          "vietnamese": "Giá dầu thô đã sụt giảm mạnh trong những tháng gần đây.",
          "target": "Crude oil prices have dropped sharply in recent months.",
          "masked": [
            "C****",
            "o**",
            "p*****",
            "h***",
            "d******",
            "s******",
            "i*",
            "r*****",
            "m*****."
          ],
          "hints": [
            "Crude oil prices have dropped sharply",
            "in recent months"
          ],
          "acceptable": [
            "Crude oil prices have dropped sharply in recent months."
          ],
          "grammarNote": "Cụm từ đi với HTHT: \"in recent months\"."
        },
        {
          "id": "buoc1-present-perfect-s20",
          "vietnamese": "Nhiều người tiêu dùng đã chuyển sang mua sắm trực tuyến.",
          "target": "Many consumers have switched to online shopping.",
          "masked": [
            "M***",
            "c********",
            "h***",
            "s*******",
            "t*",
            "o*****",
            "s*******."
          ],
          "hints": [
            "have switched to",
            "online shopping"
          ],
          "acceptable": [
            "Many consumers have switched to online shopping."
          ],
          "grammarNote": "Cấu trúc: switch to something."
        },
        {
          "id": "buoc1-present-perfect-s21",
          "vietnamese": "Chính quyền địa phương đã nâng cấp cơ sở hạ tầng giao thông.",
          "target": "The local authority has upgraded the transport infrastructure.",
          "masked": [
            "T**",
            "l****",
            "a********",
            "h**",
            "u*******",
            "t**",
            "t********",
            "i*************."
          ],
          "hints": [
            "has upgraded",
            "transport infrastructure"
          ],
          "acceptable": [
            "The local authority has upgraded the transport infrastructure."
          ],
          "grammarNote": "Collocation: \"transport infrastructure\"."
        },
        {
          "id": "buoc1-present-perfect-s22",
          "vietnamese": "Họ đã kết hôn được 10 năm và sống rất hạnh phúc.",
          "target": "They have been married for 10 years and live very happily.",
          "masked": [
            "T***",
            "h***",
            "b***",
            "m******",
            "f**",
            "1*",
            "y****",
            "a**",
            "l***",
            "v***",
            "h******."
          ],
          "hints": [
            "have been married for 10 years",
            "live very happily"
          ],
          "acceptable": [
            "They have been married for 10 years and live very happily."
          ],
          "grammarNote": "Tính từ trạng thái: \"have been married for + time\"."
        },
        {
          "id": "buoc1-present-perfect-s23",
          "vietnamese": "Tôi đã gửi email cho khách hàng nhưng chưa nhận được phản hồi.",
          "target": "I have sent an email to the client but have not received a response yet.",
          "masked": [
            "I",
            "h***",
            "s***",
            "a*",
            "e****",
            "t*",
            "t**",
            "c*****",
            "b**",
            "h***",
            "n**",
            "r*******",
            "a",
            "r*******",
            "y**."
          ],
          "hints": [
            "have sent an email",
            "have not received a response yet"
          ],
          "acceptable": [
            "I have sent an email to the client but have not received a response yet."
          ],
          "grammarNote": "Liên từ kết hợp: \"have sent... but have not received... yet\"."
        },
        {
          "id": "buoc1-present-perfect-s24",
          "vietnamese": "Sự phát triển của internet đã thu hẹp khoảng cách địa lý giữa các quốc gia.",
          "target": "The development of the internet has narrowed geographical distances between nations.",
          "masked": [
            "T**",
            "d**********",
            "o*",
            "t**",
            "i*******",
            "h**",
            "n*******",
            "g***********",
            "d********",
            "b******",
            "n******."
          ],
          "hints": [
            "has narrowed geographical distances",
            "between nations"
          ],
          "acceptable": [
            "The development of the internet has narrowed geographical distances between nations."
          ],
          "grammarNote": "Động từ: \"narrow / bridge the gap\" (thu hẹp khoảng cách)."
        },
        {
          "id": "buoc1-present-perfect-s25",
          "vietnamese": "Hàng ngàn sinh viên đã tốt nghiệp từ trường đại học này.",
          "target": "Thousands of students have graduated from this university.",
          "masked": [
            "T********",
            "o*",
            "s*******",
            "h***",
            "g********",
            "f***",
            "t***",
            "u*********."
          ],
          "hints": [
            "Thousands of students have graduated from",
            "this university"
          ],
          "acceptable": [
            "Thousands of students have graduated from this university."
          ],
          "grammarNote": "Cấu trúc: graduate from somewhere."
        }
      ]
    },
    {
      "id": "buoc1-present-perfect-continuous",
      "aliasIds": [],
      "title": "Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)",
      "step": "Bước 1",
      "level": "B1 - B2",
      "desc": "Luyện dịch 25 câu nhấn mạnh tính liên tục và thời lượng của hành động bắt đầu từ quá khứ đến hiện tại.",
      "sentences": [
        {
          "id": "buoc1-present-perfect-continuous-s1",
          "vietnamese": "Tôi đã học tiếng Anh liên tục suốt bốn tiếng đồng hồ nay rồi.",
          "target": "I have been studying English continuously for four hours now.",
          "masked": [
            "I",
            "h***",
            "b***",
            "s*******",
            "E******",
            "c***********",
            "f**",
            "f***",
            "h****",
            "n**."
          ],
          "hints": [
            "have been studying English",
            "continuously for four hours now"
          ],
          "acceptable": [
            "I have been studying English continuously for four hours now."
          ],
          "grammarNote": "\"have been + V-ing\" nhấn mạnh tính liên tục của hành động."
        },
        {
          "id": "buoc1-present-perfect-continuous-s2",
          "vietnamese": "Trời đã mưa rả rích từ sáng sớm đến tận bây giờ.",
          "target": "It has been raining continuously since early morning until now.",
          "masked": [
            "I*",
            "h**",
            "b***",
            "r******",
            "c***********",
            "s****",
            "e****",
            "m******",
            "u****",
            "n**."
          ],
          "hints": [
            "has been raining",
            "since early morning until now"
          ],
          "acceptable": [
            "It has been raining continuously since early morning until now."
          ],
          "grammarNote": "Chủ ngữ giả \"It\" -> \"has been raining since...\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s3",
          "vietnamese": "Các nhà nghiên cứu đã và đang theo dõi sự di cư của loài chim này trong nhiều tháng.",
          "target": "Researchers have been tracking the migration of this bird species for months.",
          "masked": [
            "R**********",
            "h***",
            "b***",
            "t*******",
            "t**",
            "m********",
            "o*",
            "t***",
            "b***",
            "s******",
            "f**",
            "m*****."
          ],
          "hints": [
            "have been tracking the migration of",
            "this bird species for months"
          ],
          "acceptable": [
            "Researchers have been tracking the migration of this bird species for months."
          ],
          "grammarNote": "Collocation: \"track migration\" (theo dõi sự di cư)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s4",
          "vietnamese": "Cô ấy đã và đang làm việc cho tổ chức từ thiện này kể từ khi tốt nghiệp.",
          "target": "She has been working for this charity organization since graduation.",
          "masked": [
            "S**",
            "h**",
            "b***",
            "w******",
            "f**",
            "t***",
            "c******",
            "o***********",
            "s****",
            "g*********."
          ],
          "hints": [
            "has been working for this charity",
            "since graduation"
          ],
          "acceptable": [
            "She has been working for this charity organization since graduation."
          ],
          "grammarNote": "\"since graduation\" = \"since she graduated\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s5",
          "vietnamese": "Chúng tôi đã thảo luận về vấn đề này suốt cả buổi sáng mà chưa có kết quả.",
          "target": "We have been discussing this issue all morning without any conclusion.",
          "masked": [
            "W*",
            "h***",
            "b***",
            "d*********",
            "t***",
            "i****",
            "a**",
            "m******",
            "w******",
            "a**",
            "c*********."
          ],
          "hints": [
            "have been discussing this issue all morning",
            "without any conclusion"
          ],
          "acceptable": [
            "We have been discussing this issue all morning without any conclusion."
          ],
          "grammarNote": "Động từ \"discuss\" không đi với giới từ \"about\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s6",
          "vietnamese": "Anh ấy đã tập luyện chăm chỉ tại phòng gym để chuẩn bị cho giải đấu.",
          "target": "He has been training hard at the gym to prepare for the tournament.",
          "masked": [
            "H*",
            "h**",
            "b***",
            "t*******",
            "h***",
            "a*",
            "t**",
            "g**",
            "t*",
            "p******",
            "f**",
            "t**",
            "t*********."
          ],
          "hints": [
            "has been training hard at the gym",
            "to prepare for the tournament"
          ],
          "acceptable": [
            "He has been training hard at the gym to prepare for the tournament."
          ],
          "grammarNote": "Động từ \"train\" hoặc \"work out\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s7",
          "vietnamese": "Chính quyền thành phố đã nỗ lực cải thiện hệ thống thoát nước suốt thời gian qua.",
          "target": "The city authorities have been striving to improve the drainage system over recent times.",
          "masked": [
            "T**",
            "c***",
            "a**********",
            "h***",
            "b***",
            "s*******",
            "t*",
            "i******",
            "t**",
            "d*******",
            "s*****",
            "o***",
            "r*****",
            "t****."
          ],
          "hints": [
            "have been striving to improve",
            "the drainage system"
          ],
          "acceptable": [
            "The city authorities have been striving to improve the drainage system over recent times."
          ],
          "grammarNote": "Collocation: \"drainage system\" (hệ thống thoát nước)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s8",
          "vietnamese": "Bạn đã đợi tôi ở đây bao lâu rồi?",
          "target": "How long have you been waiting for me here?",
          "masked": [
            "H**",
            "l***",
            "h***",
            "y**",
            "b***",
            "w******",
            "f**",
            "m*",
            "h***?"
          ],
          "hints": [
            "How long have you been waiting for me",
            "here"
          ],
          "acceptable": [
            "How long have you been waiting for me here?"
          ],
          "grammarNote": "Câu hỏi thời lượng: \"How long have you been V-ing...?\""
        },
        {
          "id": "buoc1-present-perfect-continuous-s9",
          "vietnamese": "Mắt bạn đỏ quá, bạn đã ngồi nhìn màn hình máy tính suốt cả ngày à?",
          "target": "Your eyes are red, have you been staring at the computer screen all day?",
          "masked": [
            "Y***",
            "e***",
            "a**",
            "r**,",
            "h***",
            "y**",
            "b***",
            "s******",
            "a*",
            "t**",
            "c*******",
            "s*****",
            "a**",
            "d**?"
          ],
          "hints": [
            "have you been staring at",
            "computer screen all day"
          ],
          "acceptable": [
            "Your eyes are red, have you been staring at the computer screen all day?"
          ],
          "grammarNote": "Dấu hiệu hiện tại là kết quả của hành động liên tục trong quá khứ."
        },
        {
          "id": "buoc1-present-perfect-continuous-s10",
          "vietnamese": "Công ty chúng tôi đã và đang tìm kiếm đối tác chiến lược phù hợp trong khu vực.",
          "target": "Our company has been searching for suitable strategic partners in the region.",
          "masked": [
            "O**",
            "c******",
            "h**",
            "b***",
            "s********",
            "f**",
            "s*******",
            "s********",
            "p*******",
            "i*",
            "t**",
            "r*****."
          ],
          "hints": [
            "has been searching for",
            "strategic partners in the region"
          ],
          "acceptable": [
            "Our company has been searching for suitable strategic partners in the region."
          ],
          "grammarNote": "Collocation: \"strategic partners\" (đối tác chiến lược)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s11",
          "vietnamese": "Họ đã cải tạo ngôi nhà cũ này suốt sáu tháng qua.",
          "target": "They have been renovating this old house for the past six months.",
          "masked": [
            "T***",
            "h***",
            "b***",
            "r*********",
            "t***",
            "o**",
            "h****",
            "f**",
            "t**",
            "p***",
            "s**",
            "m*****."
          ],
          "hints": [
            "have been renovating this old house",
            "for the past six months"
          ],
          "acceptable": [
            "They have been renovating this old house for the past six months."
          ],
          "grammarNote": "Từ vựng: \"renovate / refurbish\" (cải tạo nhà)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s12",
          "vietnamese": "Tôi đã suy nghĩ rất nhiều về lời đề nghị làm việc của bạn.",
          "target": "I have been thinking a lot about your job offer.",
          "masked": [
            "I",
            "h***",
            "b***",
            "t*******",
            "a",
            "l**",
            "a****",
            "y***",
            "j**",
            "o****."
          ],
          "hints": [
            "have been thinking a lot about",
            "your job offer"
          ],
          "acceptable": [
            "I have been thinking a lot about your job offer."
          ],
          "grammarNote": "\"think about something\" ở thì HTTDTD diễn tả sự trăn trở liên tục."
        },
        {
          "id": "buoc1-present-perfect-continuous-s13",
          "vietnamese": "Khí hậu toàn cầu đã và đang ấm lên với tốc độ nhanh chưa từng thấy.",
          "target": "The global climate has been warming at an unprecedented pace.",
          "masked": [
            "T**",
            "g*****",
            "c******",
            "h**",
            "b***",
            "w******",
            "a*",
            "a*",
            "u************",
            "p***."
          ],
          "hints": [
            "has been warming at",
            "an unprecedented pace"
          ],
          "acceptable": [
            "The global climate has been warming at an unprecedented pace."
          ],
          "grammarNote": "Từ vựng C1/C2: \"at an unprecedented pace\" (tốc độ chưa từng có)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s14",
          "vietnamese": "Các kỹ sư đã và đang thử nghiệm mẫu xe tự hành mới suốt tuần qua.",
          "target": "Engineers have been testing the new autonomous vehicle model all week.",
          "masked": [
            "E********",
            "h***",
            "b***",
            "t******",
            "t**",
            "n**",
            "a*********",
            "v******",
            "m****",
            "a**",
            "w***."
          ],
          "hints": [
            "have been testing the new autonomous vehicle",
            "all week"
          ],
          "acceptable": [
            "Engineers have been testing the new autonomous vehicle model all week."
          ],
          "grammarNote": "Thuật ngữ: \"autonomous vehicle\" (xe tự hành)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s15",
          "vietnamese": "Bọn trẻ đã chơi trò chơi điện tử suốt từ trưa đến giờ mà không nghỉ ngơi.",
          "target": "The children have been playing video games since noon without a break.",
          "masked": [
            "T**",
            "c*******",
            "h***",
            "b***",
            "p******",
            "v****",
            "g****",
            "s****",
            "n***",
            "w******",
            "a",
            "b****."
          ],
          "hints": [
            "have been playing video games since noon",
            "without a break"
          ],
          "acceptable": [
            "The children have been playing video games since noon without a break."
          ],
          "grammarNote": "Cụm từ: \"without a break\" (không ngừng nghỉ)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s16",
          "vietnamese": "Tôi đã tiết kiệm tiền suốt năm qua để mua chiếc xe máy mới.",
          "target": "I have been saving money all year to buy a new motorbike.",
          "masked": [
            "I",
            "h***",
            "b***",
            "s*****",
            "m****",
            "a**",
            "y***",
            "t*",
            "b**",
            "a",
            "n**",
            "m********."
          ],
          "hints": [
            "have been saving money all year",
            "to buy a new motorbike"
          ],
          "acceptable": [
            "I have been saving money all year to buy a new motorbike."
          ],
          "grammarNote": "Diễn tả hành động tích luỹ liên tục: \"have been saving money\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s17",
          "vietnamese": "Đội ngũ y tế đã làm việc không ngừng nghỉ để ngăn chặn dịch bệnh bùng phát.",
          "target": "The medical team has been working tirelessly to prevent the disease outbreak.",
          "masked": [
            "T**",
            "m******",
            "t***",
            "h**",
            "b***",
            "w******",
            "t*********",
            "t*",
            "p******",
            "t**",
            "d******",
            "o*******."
          ],
          "hints": [
            "has been working tirelessly to prevent",
            "the disease outbreak"
          ],
          "acceptable": [
            "The medical team has been working tirelessly to prevent the disease outbreak."
          ],
          "grammarNote": "Trạng từ: \"tirelessly\", collocation: \"disease outbreak\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s18",
          "vietnamese": "Người dân địa phương đã phàn nàn về tiếng ồn từ công trường xây dựng.",
          "target": "Local residents have been complaining about the noise from the construction site.",
          "masked": [
            "L****",
            "r********",
            "h***",
            "b***",
            "c**********",
            "a****",
            "t**",
            "n****",
            "f***",
            "t**",
            "c***********",
            "s***."
          ],
          "hints": [
            "have been complaining about the noise from",
            "construction site"
          ],
          "acceptable": [
            "Local residents have been complaining about the noise from the construction site."
          ],
          "grammarNote": "Cấu trúc: complain about something."
        },
        {
          "id": "buoc1-present-perfect-continuous-s19",
          "vietnamese": "Anh ấy đã viết cuốn tiểu thuyết đầu tay suốt hai năm qua.",
          "target": "He has been writing his debut novel for the past two years.",
          "masked": [
            "H*",
            "h**",
            "b***",
            "w******",
            "h**",
            "d****",
            "n****",
            "f**",
            "t**",
            "p***",
            "t**",
            "y****."
          ],
          "hints": [
            "has been writing his debut novel for",
            "the past two years"
          ],
          "acceptable": [
            "He has been writing his debut novel for the past two years."
          ],
          "grammarNote": "Từ vựng: \"debut novel\" (tiểu thuyết đầu tay)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s20",
          "vietnamese": "Các trường học đã áp dụng các phương pháp giảng dạy tương tác trong thời gian gần đây.",
          "target": "Schools have been adopting interactive teaching methods recently.",
          "masked": [
            "S******",
            "h***",
            "b***",
            "a*******",
            "i**********",
            "t*******",
            "m******",
            "r*******."
          ],
          "hints": [
            "have been adopting interactive teaching methods",
            "recently"
          ],
          "acceptable": [
            "Schools have been adopting interactive teaching methods recently."
          ],
          "grammarNote": "Collocation: \"interactive teaching methods\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s21",
          "vietnamese": "Chúng tôi đã theo dõi sát sao tình hình tài chính của thị trường.",
          "target": "We have been closely monitoring the market financial situation.",
          "masked": [
            "W*",
            "h***",
            "b***",
            "c******",
            "m*********",
            "t**",
            "m*****",
            "f********",
            "s********."
          ],
          "hints": [
            "have been closely monitoring",
            "the financial situation"
          ],
          "acceptable": [
            "We have been closely monitoring the market financial situation."
          ],
          "grammarNote": "Collocation: \"closely monitor\" (theo dõi sát sao)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s22",
          "vietnamese": "Cô ấy đã luyện tập phát âm tiếng Anh chuẩn IPA suốt tháng này.",
          "target": "She has been practicing standard IPA English pronunciation all this month.",
          "masked": [
            "S**",
            "h**",
            "b***",
            "p*********",
            "s*******",
            "I**",
            "E******",
            "p************",
            "a**",
            "t***",
            "m****."
          ],
          "hints": [
            "has been practicing standard IPA English pronunciation",
            "all this month"
          ],
          "acceptable": [
            "She has been practicing standard IPA English pronunciation all this month."
          ],
          "grammarNote": "Nhấn mạnh hành động rèn luyện hàng ngày: \"all this month\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s23",
          "vietnamese": "Giá xăng dầu đã tăng liên tục trong ba tuần liên tiếp.",
          "target": "Fuel prices have been rising steadily for three consecutive weeks.",
          "masked": [
            "F***",
            "p*****",
            "h***",
            "b***",
            "r*****",
            "s*******",
            "f**",
            "t****",
            "c**********",
            "w****."
          ],
          "hints": [
            "have been rising steadily for",
            "three consecutive weeks"
          ],
          "acceptable": [
            "Fuel prices have been rising steadily for three consecutive weeks."
          ],
          "grammarNote": "Từ vựng: \"consecutive weeks\" (tuần liên tiếp)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s24",
          "vietnamese": "Tôi đã tìm kiếm chiếc đồng hồ đeo tay bị mất suốt buổi chiều.",
          "target": "I have been looking for my lost wristwatch all afternoon.",
          "masked": [
            "I",
            "h***",
            "b***",
            "l******",
            "f**",
            "m*",
            "l***",
            "w*********",
            "a**",
            "a********."
          ],
          "hints": [
            "have been looking for my lost wristwatch",
            "all afternoon"
          ],
          "acceptable": [
            "I have been looking for my lost wristwatch all afternoon."
          ],
          "grammarNote": "Phrasal verb: \"look for something\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s25",
          "vietnamese": "Các tổ chức phi chính phủ đã và đang hỗ trợ người dân vùng lũ tái thiết cuộc sống.",
          "target": "NGOs have been assisting flood victims in rebuilding their lives.",
          "masked": [
            "N***",
            "h***",
            "b***",
            "a********",
            "f****",
            "v******",
            "i*",
            "r*********",
            "t****",
            "l****."
          ],
          "hints": [
            "have been assisting flood victims in",
            "rebuilding their lives"
          ],
          "acceptable": [
            "NGOs have been assisting flood victims in rebuilding their lives."
          ],
          "grammarNote": "Cấu trúc: assist someone in doing something."
        }
      ]
    },
    {
      "id": "buoc1-uncountable-nouns",
      "aliasIds": [],
      "title": "Danh từ không đếm được (Uncountable Nouns)",
      "step": "Bước 1",
      "level": "A2 - B1",
      "desc": "Luyện dịch 25 câu sử dụng danh từ không đếm được phổ biến trong bài thi IELTS (information, advice, equipment...).",
      "sentences": [
        {
          "id": "buoc1-uncountable-nouns-s1",
          "vietnamese": "Thông tin bạn vừa cung cấp rất hữu ích cho nghiên cứu của chúng tôi.",
          "target": "The information you provided is extremely useful for our research.",
          "masked": [
            "T**",
            "i**********",
            "y**",
            "p*******",
            "i*",
            "e********",
            "u*****",
            "f**",
            "o**",
            "r*******."
          ],
          "hints": [
            "The information you provided is",
            "extremely useful for our research"
          ],
          "acceptable": [
            "The information you provided is extremely useful for our research."
          ],
          "grammarNote": "\"Information\" là danh từ không đếm được, luôn chia động từ số ít (\"is\")."
        },
        {
          "id": "buoc1-uncountable-nouns-s2",
          "vietnamese": "Anh ấy đã cho tôi một vài lời khuyên rất giá trị về việc định hướng nghề nghiệp.",
          "target": "He gave me some valuable advice on career orientation.",
          "masked": [
            "H*",
            "g***",
            "m*",
            "s***",
            "v*******",
            "a*****",
            "o*",
            "c*****",
            "o**********."
          ],
          "hints": [
            "gave me some valuable advice on",
            "career orientation"
          ],
          "acceptable": [
            "He gave me some valuable advice on career orientation."
          ],
          "grammarNote": "\"Advice\" không đếm được -> dùng \"some advice\" hoặc \"a piece of advice\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s3",
          "vietnamese": "Phòng thí nghiệm được trang bị nhiều thiết bị hiện đại phục vụ nghiên cứu.",
          "target": "The laboratory is equipped with a lot of modern equipment for research.",
          "masked": [
            "T**",
            "l*********",
            "i*",
            "e*******",
            "w***",
            "a",
            "l**",
            "o*",
            "m*****",
            "e********",
            "f**",
            "r*******."
          ],
          "hints": [
            "is equipped with a lot of modern equipment",
            "for research"
          ],
          "acceptable": [
            "The laboratory is equipped with a lot of modern equipment for research."
          ],
          "grammarNote": "\"Equipment\" không đếm được, không thêm -s."
        },
        {
          "id": "buoc1-uncountable-nouns-s4",
          "vietnamese": "Ô nhiễm không khí tại các đô thị lớn đang gây ra nhiều bệnh về đường hô hấp.",
          "target": "Air pollution in major urban areas is causing many respiratory diseases.",
          "masked": [
            "A**",
            "p********",
            "i*",
            "m****",
            "u****",
            "a****",
            "i*",
            "c******",
            "m***",
            "r**********",
            "d*******."
          ],
          "hints": [
            "Air pollution in major urban areas is causing",
            "respiratory diseases"
          ],
          "acceptable": [
            "Air pollution in major urban areas is causing many respiratory diseases."
          ],
          "grammarNote": "\"Pollution\" không đếm được -> động từ chia số ít \"is causing\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s5",
          "vietnamese": "Du khách được phép mang tối đa 20kg hành lý miễn cước.",
          "target": "Passengers are allowed to bring up to 20kg of luggage free of charge.",
          "masked": [
            "P*********",
            "a**",
            "a******",
            "t*",
            "b****",
            "u*",
            "t*",
            "2***",
            "o*",
            "l******",
            "f***",
            "o*",
            "c*****."
          ],
          "hints": [
            "are allowed to bring up to 20kg of luggage",
            "free of charge"
          ],
          "acceptable": [
            "Passengers are allowed to bring up to 20kg of luggage free of charge."
          ],
          "grammarNote": "\"Luggage\" và \"Baggage\" là danh từ không đếm được, không có \"luggages\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s6",
          "vietnamese": "Căn hộ mới của cô ấy được trang bị đồ nội thất bằng gỗ tự nhiên rất đẹp.",
          "target": "Her new apartment is furnished with beautiful natural wood furniture.",
          "masked": [
            "H**",
            "n**",
            "a********",
            "i*",
            "f********",
            "w***",
            "b********",
            "n******",
            "w***",
            "f********."
          ],
          "hints": [
            "is furnished with beautiful natural wood furniture"
          ],
          "acceptable": [
            "Her new apartment is furnished with beautiful natural wood furniture."
          ],
          "grammarNote": "\"Furniture\" là danh từ không đếm được, không bao giờ có \"furnitures\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s7",
          "vietnamese": "Thời tiết xấu đã khiến chuyến bay bị hoãn lại hai tiếng đồng hồ.",
          "target": "Bad weather caused the flight to be delayed for two hours.",
          "masked": [
            "B**",
            "w******",
            "c*****",
            "t**",
            "f*****",
            "t*",
            "b*",
            "d******",
            "f**",
            "t**",
            "h****."
          ],
          "hints": [
            "Bad weather caused the flight to be delayed",
            "for two hours"
          ],
          "acceptable": [
            "Bad weather caused the flight to be delayed for two hours."
          ],
          "grammarNote": "\"Weather\" không đếm được, không dùng \"a bad weather\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s8",
          "vietnamese": "Người học tiếng Anh cần dành nhiều thời gian để tích luỹ kiến thức nền tảng.",
          "target": "English learners need to spend a lot of time acquiring foundational knowledge.",
          "masked": [
            "E******",
            "l*******",
            "n***",
            "t*",
            "s****",
            "a",
            "l**",
            "o*",
            "t***",
            "a********",
            "f***********",
            "k********."
          ],
          "hints": [
            "spend a lot of time acquiring",
            "foundational knowledge"
          ],
          "acceptable": [
            "English learners need to spend a lot of time acquiring foundational knowledge."
          ],
          "grammarNote": "\"Knowledge\" không đếm được, không dùng \"knowledges\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s9",
          "vietnamese": "Các bằng chứng khoa học cho thấy tập thể dục giúp kéo dài tuổi thọ.",
          "target": "Scientific evidence shows that physical exercise helps prolong lifespan.",
          "masked": [
            "S*********",
            "e*******",
            "s****",
            "t***",
            "p*******",
            "e*******",
            "h****",
            "p******",
            "l*******."
          ],
          "hints": [
            "Scientific evidence shows that",
            "physical exercise helps prolong lifespan"
          ],
          "acceptable": [
            "Scientific evidence shows that physical exercise helps prolong lifespan."
          ],
          "grammarNote": "\"Evidence\" không đếm được -> động từ chia số ít \"shows\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s10",
          "vietnamese": "Giao thông ở trung tâm thành phố vào giờ cao điểm rất hỗn loạn.",
          "target": "Traffic in the city center during rush hour is very chaotic.",
          "masked": [
            "T******",
            "i*",
            "t**",
            "c***",
            "c*****",
            "d*****",
            "r***",
            "h***",
            "i*",
            "v***",
            "c******."
          ],
          "hints": [
            "Traffic in the city center during rush hour is",
            "very chaotic"
          ],
          "acceptable": [
            "Traffic in the city center during rush hour is very chaotic."
          ],
          "grammarNote": "\"Traffic\" là danh từ không đếm được -> động từ chia số ít \"is\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s11",
          "vietnamese": "Chính phủ cần phân bổ ngân sách để nâng cấp cơ sở vật chất học tập.",
          "target": "The government needs to allocate budget to upgrade learning facilities.",
          "masked": [
            "T**",
            "g*********",
            "n****",
            "t*",
            "a*******",
            "b*****",
            "t*",
            "u******",
            "l*******",
            "f*********."
          ],
          "hints": [
            "allocate budget to upgrade",
            "learning facilities"
          ],
          "acceptable": [
            "The government needs to allocate budget to upgrade learning facilities."
          ],
          "grammarNote": "\"Funding\" không đếm được; \"facilities\" lại là danh từ luôn ở số nhiều."
        },
        {
          "id": "buoc1-uncountable-nouns-s12",
          "vietnamese": "Học sinh tiểu học không nên bị giao quá nhiều bài tập về nhà mỗi tối.",
          "target": "Primary school students should not be given too much homework every night.",
          "masked": [
            "P******",
            "s*****",
            "s*******",
            "s*****",
            "n**",
            "b*",
            "g****",
            "t**",
            "m***",
            "h*******",
            "e****",
            "n****."
          ],
          "hints": [
            "should not be given too much homework",
            "every night"
          ],
          "acceptable": [
            "Primary school students should not be given too much homework every night."
          ],
          "grammarNote": "\"Homework\" không đếm được -> dùng \"too much homework\", không dùng \"homeworks\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s13",
          "vietnamese": "Chất lượng không khí trong nhà có thể bị ảnh hưởng bởi khói thuốc lá.",
          "target": "Indoor air quality can be affected by cigarette smoke.",
          "masked": [
            "I*****",
            "a**",
            "q******",
            "c**",
            "b*",
            "a*******",
            "b*",
            "c********",
            "s****."
          ],
          "hints": [
            "Indoor air quality can be affected by",
            "cigarette smoke"
          ],
          "acceptable": [
            "Indoor air quality can be affected by cigarette smoke."
          ],
          "grammarNote": "\"Smoke\" (khói) là danh từ không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s14",
          "vietnamese": "Bà ấy đã tích luỹ được nhiều kinh nghiệm quý báu sau 30 năm giảng dạy.",
          "target": "She has accumulated a wealth of valuable experience after 30 years of teaching.",
          "masked": [
            "S**",
            "h**",
            "a**********",
            "a",
            "w*****",
            "o*",
            "v*******",
            "e*********",
            "a****",
            "3*",
            "y****",
            "o*",
            "t*******."
          ],
          "hints": [
            "accumulated a wealth of valuable experience",
            "after 30 years of teaching"
          ],
          "acceptable": [
            "She has accumulated a wealth of valuable experience after 30 years of teaching."
          ],
          "grammarNote": "\"Experience\" mang nghĩa \"kinh nghiệm tích luỹ\" là không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s15",
          "vietnamese": "Âm nhạc có thể giúp giảm bớt căng thẳng sau những giờ làm việc mệt mỏi.",
          "target": "Music can help relieve stress after exhausting working hours.",
          "masked": [
            "M****",
            "c**",
            "h***",
            "r******",
            "s*****",
            "a****",
            "e*********",
            "w******",
            "h****."
          ],
          "hints": [
            "Music can help relieve stress",
            "after exhausting working hours"
          ],
          "acceptable": [
            "Music can help relieve stress after exhausting working hours."
          ],
          "grammarNote": "\"Music\" và \"stress\" đều là danh từ không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s16",
          "vietnamese": "Tiến độ của dự án đang diễn ra rất chậm do thiếu nhân lực.",
          "target": "The progress of the project is moving very slowly due to a lack of manpower.",
          "masked": [
            "T**",
            "p*******",
            "o*",
            "t**",
            "p******",
            "i*",
            "m*****",
            "v***",
            "s*****",
            "d**",
            "t*",
            "a",
            "l***",
            "o*",
            "m*******."
          ],
          "hints": [
            "The progress of the project is moving very slowly",
            "due to a lack of manpower"
          ],
          "acceptable": [
            "The progress of the project is moving very slowly due to a lack of manpower."
          ],
          "grammarNote": "\"Progress\" không đếm được, không bao giờ dùng \"a progress\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s17",
          "vietnamese": "Lượng rác thải sinh hoạt tăng mạnh trong các dịp lễ tết.",
          "target": "The amount of household garbage increases sharply during festive seasons.",
          "masked": [
            "T**",
            "a*****",
            "o*",
            "h********",
            "g******",
            "i********",
            "s******",
            "d*****",
            "f******",
            "s******."
          ],
          "hints": [
            "The amount of household garbage increases sharply",
            "during festive seasons"
          ],
          "acceptable": [
            "The amount of household garbage increases sharply during festive seasons."
          ],
          "grammarNote": "Danh từ không đếm được (\"garbage\", \"waste\") đi với \"the amount of\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s18",
          "vietnamese": "Nhà hàng này nổi tiếng với các món hải sản tươi sống.",
          "target": "This restaurant is famous for its fresh seafood.",
          "masked": [
            "T***",
            "r*********",
            "i*",
            "f*****",
            "f**",
            "i**",
            "f****",
            "s******."
          ],
          "hints": [
            "is famous for its fresh seafood"
          ],
          "acceptable": [
            "This restaurant is famous for its fresh seafood."
          ],
          "grammarNote": "\"Seafood\" là danh từ không đếm được số ít."
        },
        {
          "id": "buoc1-uncountable-nouns-s19",
          "vietnamese": "Nhiều người trẻ thiếu kiên nhẫn khi đối mặt với những thử thách trong cuộc sống.",
          "target": "Many young individuals lack patience when confronting life challenges.",
          "masked": [
            "M***",
            "y****",
            "i**********",
            "l***",
            "p*******",
            "w***",
            "c**********",
            "l***",
            "c*********."
          ],
          "hints": [
            "lack patience when confronting",
            "life challenges"
          ],
          "acceptable": [
            "Many young individuals lack patience when confronting life challenges."
          ],
          "grammarNote": "\"Patience\" (lòng kiên nhẫn) là danh từ trừu tượng không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s20",
          "vietnamese": "Tiền bạc không thể mua được sức khỏe và hạnh phúc gia đình.",
          "target": "Money cannot buy health and family happiness.",
          "masked": [
            "M****",
            "c*****",
            "b**",
            "h*****",
            "a**",
            "f*****",
            "h********."
          ],
          "hints": [
            "Money cannot buy",
            "health and family happiness"
          ],
          "acceptable": [
            "Money cannot buy health and family happiness."
          ],
          "grammarNote": "\"Money\", \"health\", \"happiness\" đều là danh từ không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s21",
          "vietnamese": "Chính phủ đang cung cấp viện trợ tài chính khẩn cấp cho các vùng thiên tai.",
          "target": "The government is providing emergency financial aid to disaster-stricken regions.",
          "masked": [
            "T**",
            "g*********",
            "i*",
            "p********",
            "e********",
            "f********",
            "a**",
            "t*",
            "d****************",
            "r******."
          ],
          "hints": [
            "is providing emergency financial aid to",
            "disaster-stricken regions"
          ],
          "acceptable": [
            "The government is providing emergency financial aid to disaster-stricken regions."
          ],
          "grammarNote": "\"Aid\" và \"assistance\" không đếm được -> dùng \"financial aid\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s22",
          "vietnamese": "Cô ấy có năng khiếu tự nhiên về hội hoạ và thiết kế thời trang.",
          "target": "She has natural talent for painting and fashion design.",
          "masked": [
            "S**",
            "h**",
            "n******",
            "t*****",
            "f**",
            "p*******",
            "a**",
            "f******",
            "d*****."
          ],
          "hints": [
            "has natural talent for",
            "painting and fashion design"
          ],
          "acceptable": [
            "She has natural talent for painting and fashion design."
          ],
          "grammarNote": "\"Talent\" có thể dùng không đếm được: \"natural talent for\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s23",
          "vietnamese": "Nhiều nghiên cứu chỉ ra rằng giấc ngủ đóng vai trò thiết yếu đối với trí nhớ.",
          "target": "Much research indicates that sleep plays an essential role in memory.",
          "masked": [
            "M***",
            "r*******",
            "i********",
            "t***",
            "s****",
            "p****",
            "a*",
            "e********",
            "r***",
            "i*",
            "m*****."
          ],
          "hints": [
            "Much research indicates that",
            "sleep plays an essential role in memory"
          ],
          "acceptable": [
            "Much research indicates that sleep plays an essential role in memory."
          ],
          "grammarNote": "\"Research\" là không đếm được: dùng \"much research\", KHÔNG dùng \"researches\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s24",
          "vietnamese": "Cần có sự can thiệp của pháp luật để bảo vệ quyền riêng tư cá nhân.",
          "target": "Legal intervention is necessary to protect personal privacy.",
          "masked": [
            "L****",
            "i***********",
            "i*",
            "n********",
            "t*",
            "p******",
            "p*******",
            "p******."
          ],
          "hints": [
            "Legal intervention is necessary to",
            "protect personal privacy"
          ],
          "acceptable": [
            "Legal intervention is necessary to protect personal privacy."
          ],
          "grammarNote": "\"Privacy\" là danh từ trừu tượng không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s25",
          "vietnamese": "Khán giả dành cho nghệ sĩ những tràng pháo tay nồng nhiệt.",
          "target": "The audience gave the artist warm applause.",
          "masked": [
            "T**",
            "a*******",
            "g***",
            "t**",
            "a*****",
            "w***",
            "a*******."
          ],
          "hints": [
            "gave the artist warm applause"
          ],
          "acceptable": [
            "The audience gave the artist warm applause."
          ],
          "grammarNote": "\"Applause\" không đếm được, dùng \"warm applause\"."
        }
      ]
    },
    {
      "id": "buoc1-singular-plural",
      "aliasIds": [
        "write-singular-plural"
      ],
      "title": "Số ít / Số nhiều (Singular / Plural)",
      "step": "Bước 1",
      "level": "A2 - B1",
      "desc": "Luyện dịch 25 câu làm chủ quy tắc số ít, số nhiều bất quy tắc và sự hoà hợp chủ ngữ - vị ngữ.",
      "sentences": [
        {
          "id": "buoc1-singular-plural-s1",
          "vietnamese": "Trẻ em ngày nay tiếp xúc với công nghệ từ độ tuổi rất nhỏ.",
          "target": "Children nowadays are exposed to technology from a very young age.",
          "masked": [
            "C*******",
            "n*******",
            "a**",
            "e******",
            "t*",
            "t*********",
            "f***",
            "a",
            "v***",
            "y****",
            "a**."
          ],
          "hints": [
            "Children nowadays are exposed to",
            "technology from a very young age"
          ],
          "acceptable": [
            "Children nowadays are exposed to technology from a very young age."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"child\" -> \"children\" đi kèm động từ \"are\"."
        },
        {
          "id": "buoc1-singular-plural-s2",
          "vietnamese": "Mỗi học sinh trong lớp đều phải hoàn thành bài tập dự án trước thứ Sáu.",
          "target": "Each student in the class has to complete the project assignment before Friday.",
          "masked": [
            "E***",
            "s******",
            "i*",
            "t**",
            "c****",
            "h**",
            "t*",
            "c*******",
            "t**",
            "p******",
            "a*********",
            "b*****",
            "F*****."
          ],
          "hints": [
            "Each student in the class has to complete",
            "before Friday"
          ],
          "acceptable": [
            "Each student in the class has to complete the project assignment before Friday."
          ],
          "grammarNote": "\"Each / Every + N số ít\" đi với động từ chia số ít: \"Each student... has to\"."
        },
        {
          "id": "buoc1-singular-plural-s3",
          "vietnamese": "Nhiều phụ nữ hiện đại đang nắm giữ các vị trí lãnh đạo chủ chốt trong xã hội.",
          "target": "Many modern women hold key leadership positions in society.",
          "masked": [
            "M***",
            "m*****",
            "w****",
            "h***",
            "k**",
            "l*********",
            "p********",
            "i*",
            "s******."
          ],
          "hints": [
            "Many modern women hold",
            "key leadership positions in society"
          ],
          "acceptable": [
            "Many modern women hold key leadership positions in society."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"woman\" -> \"women\". Động từ số nhiều: \"hold\"."
        },
        {
          "id": "buoc1-singular-plural-s4",
          "vietnamese": "Đàn cừu đang gặm cỏ trên sườn đồi xanh ngát.",
          "target": "The sheep are grazing on the lush green hillside.",
          "masked": [
            "T**",
            "s****",
            "a**",
            "g******",
            "o*",
            "t**",
            "l***",
            "g****",
            "h*******."
          ],
          "hints": [
            "The sheep are grazing on",
            "the lush green hillside"
          ],
          "acceptable": [
            "The sheep are grazing on the lush green hillside."
          ],
          "grammarNote": "Danh từ giữ nguyên dạng ở số nhiều: \"sheep\" -> \"The sheep are grazing\"."
        },
        {
          "id": "buoc1-singular-plural-s5",
          "vietnamese": "Hầu hết mọi người đều đồng ý rằng giáo dục là chìa khoá để thành công.",
          "target": "Most people agree that education is the key to success.",
          "masked": [
            "M***",
            "p*****",
            "a****",
            "t***",
            "e********",
            "i*",
            "t**",
            "k**",
            "t*",
            "s******."
          ],
          "hints": [
            "Most people agree that",
            "education is the key to success"
          ],
          "acceptable": [
            "Most people agree that education is the key to success."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"person\" -> \"people\". Động từ số nhiều: \"agree\"."
        },
        {
          "id": "buoc1-singular-plural-s6",
          "vietnamese": "Một đôi giày da cao cấp có thể có giá lên tới hàng trăm đô la.",
          "target": "A pair of premium leather shoes can cost up to hundreds of dollars.",
          "masked": [
            "A",
            "p***",
            "o*",
            "p******",
            "l******",
            "s****",
            "c**",
            "c***",
            "u*",
            "t*",
            "h*******",
            "o*",
            "d******."
          ],
          "hints": [
            "A pair of premium leather shoes",
            "can cost up to hundreds of dollars"
          ],
          "acceptable": [
            "A pair of premium leather shoes can cost up to hundreds of dollars."
          ],
          "grammarNote": "\"A pair of...\" là cụm số ít, nhưng \"shoes\" là danh từ luôn có hai chiếc."
        },
        {
          "id": "buoc1-singular-plural-s7",
          "vietnamese": "Nha sĩ khuyên chúng ta nên đánh răng ít nhất hai lần một ngày.",
          "target": "The dentist advises us to brush our teeth at least twice a day.",
          "masked": [
            "T**",
            "d******",
            "a******",
            "u*",
            "t*",
            "b****",
            "o**",
            "t****",
            "a*",
            "l****",
            "t****",
            "a",
            "d**."
          ],
          "hints": [
            "advises us to brush our teeth",
            "at least twice a day"
          ],
          "acceptable": [
            "The dentist advises us to brush our teeth at least twice a day."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"tooth\" -> \"teeth\"."
        },
        {
          "id": "buoc1-singular-plural-s8",
          "vietnamese": "Báo chí và truyền thông đóng vai trò lớn trong việc định hướng dư luận.",
          "target": "The media play a significant role in shaping public opinion.",
          "masked": [
            "T**",
            "m****",
            "p***",
            "a",
            "s**********",
            "r***",
            "i*",
            "s******",
            "p*****",
            "o******."
          ],
          "hints": [
            "The media play a significant role in",
            "shaping public opinion"
          ],
          "acceptable": [
            "The media play a significant role in shaping public opinion."
          ],
          "grammarNote": "\"Media\" gốc Latinh là số nhiều của \"medium\", có thể đi với \"play\" hoặc \"plays\"."
        },
        {
          "id": "buoc1-singular-plural-s9",
          "vietnamese": "Bác sĩ kiểm tra bàn chân của bệnh nhân để tìm dấu hiệu chấn thương.",
          "target": "The doctor examined the patient's feet for signs of injury.",
          "masked": [
            "T**",
            "d*****",
            "e*******",
            "t**",
            "p********",
            "f***",
            "f**",
            "s****",
            "o*",
            "i*****."
          ],
          "hints": [
            "examined the patient's feet",
            "for signs of injury"
          ],
          "acceptable": [
            "The doctor examined the patient's feet for signs of injury."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"foot\" -> \"feet\"."
        },
        {
          "id": "buoc1-singular-plural-s10",
          "vietnamese": "Hiện tượng này đã thu hút sự chú ý của nhiều nhà thiên văn học trên khắp thế giới.",
          "target": "This phenomenon has attracted the attention of many astronomers worldwide.",
          "masked": [
            "T***",
            "p*********",
            "h**",
            "a********",
            "t**",
            "a********",
            "o*",
            "m***",
            "a**********",
            "w********."
          ],
          "hints": [
            "This phenomenon has attracted",
            "the attention of astronomers worldwide"
          ],
          "acceptable": [
            "This phenomenon has attracted the attention of many astronomers worldwide."
          ],
          "grammarNote": "Số ít: \"phenomenon\"; số nhiều: \"phenomena\"."
        },
        {
          "id": "buoc1-singular-plural-s11",
          "vietnamese": "Những tiêu chí này được sử dụng để đánh giá chất lượng của bài thi viết.",
          "target": "These criteria are used to evaluate the quality of the writing test.",
          "masked": [
            "T****",
            "c*******",
            "a**",
            "u***",
            "t*",
            "e*******",
            "t**",
            "q******",
            "o*",
            "t**",
            "w******",
            "t***."
          ],
          "hints": [
            "These criteria are used to evaluate",
            "the quality of the writing test"
          ],
          "acceptable": [
            "These criteria are used to evaluate the quality of the writing test."
          ],
          "grammarNote": "Số ít: \"criterion\"; số nhiều: \"criteria\" -> đi với \"these\" và \"are\"."
        },
        {
          "id": "buoc1-singular-plural-s12",
          "vietnamese": "Một số loài cá sống ở vùng nước sâu có khả năng tự phát sáng.",
          "target": "Several species of fish living in deep water are bioluminescent.",
          "masked": [
            "S******",
            "s******",
            "o*",
            "f***",
            "l*****",
            "i*",
            "d***",
            "w****",
            "a**",
            "b*************."
          ],
          "hints": [
            "Several species of fish living in deep water",
            "are bioluminescent"
          ],
          "acceptable": [
            "Several species of fish living in deep water are bioluminescent."
          ],
          "grammarNote": "\"Fish\" và \"species\" đều giữ nguyên hình thái ở số ít và số nhiều."
        },
        {
          "id": "buoc1-singular-plural-s13",
          "vietnamese": "Cả hai thành phố đều có hệ thống tàu điện ngầm hiện đại.",
          "target": "Both cities have modern subway systems.",
          "masked": [
            "B***",
            "c*****",
            "h***",
            "m*****",
            "s*****",
            "s******."
          ],
          "hints": [
            "Both cities have",
            "modern subway systems"
          ],
          "acceptable": [
            "Both cities have modern subway systems."
          ],
          "grammarNote": "\"Both + N số nhiều\" đi với động từ số nhiều: \"Both cities have...\"."
        },
        {
          "id": "buoc1-singular-plural-s14",
          "vietnamese": "Không có học sinh nào trong lớp có thể giải được bài toán hóc búa này.",
          "target": "None of the students in the class was able to solve this tricky math problem.",
          "masked": [
            "N***",
            "o*",
            "t**",
            "s*******",
            "i*",
            "t**",
            "c****",
            "w**",
            "a***",
            "t*",
            "s****",
            "t***",
            "t*****",
            "m***",
            "p******."
          ],
          "hints": [
            "None of the students was/were able to solve",
            "this tricky math problem"
          ],
          "acceptable": [
            "None of the students in the class was able to solve this tricky math problem."
          ],
          "grammarNote": "\"None of the + N số nhiều\" trang trọng dùng động từ số ít (\"was\")."
        },
        {
          "id": "buoc1-singular-plural-s15",
          "vietnamese": "Môn toán học luôn là một trong những môn học yêu thích của tôi.",
          "target": "Mathematics is always one of my favorite subjects.",
          "masked": [
            "M**********",
            "i*",
            "a*****",
            "o**",
            "o*",
            "m*",
            "f*******",
            "s*******."
          ],
          "hints": [
            "Mathematics is always one of",
            "my favorite subjects"
          ],
          "acceptable": [
            "Mathematics is always one of my favorite subjects."
          ],
          "grammarNote": "Tên môn học đuôi \"-s\" (\"Mathematics\") chia động từ số ít (\"is\")."
        },
        {
          "id": "buoc1-singular-plural-s16",
          "vietnamese": "Chiếc kéo này quá cùn để cắt miếng bìa carton dày.",
          "target": "These scissors are too blunt to cut the thick cardboard.",
          "masked": [
            "T****",
            "s*******",
            "a**",
            "t**",
            "b****",
            "t*",
            "c**",
            "t**",
            "t****",
            "c********."
          ],
          "hints": [
            "These scissors are too blunt to",
            "cut the thick cardboard"
          ],
          "acceptable": [
            "These scissors are too blunt to cut the thick cardboard."
          ],
          "grammarNote": "\"Scissors\" luôn ở dạng số nhiều (\"these scissors are\")."
        },
        {
          "id": "buoc1-singular-plural-s17",
          "vietnamese": "Các phân tích dữ liệu chỉ ra rằng xu hướng này sẽ tiếp diễn trong tương lai.",
          "target": "Data analyses indicate that this trend will continue in the future.",
          "masked": [
            "D***",
            "a*******",
            "i*******",
            "t***",
            "t***",
            "t****",
            "w***",
            "c*******",
            "i*",
            "t**",
            "f*****."
          ],
          "hints": [
            "Data analyses indicate that",
            "this trend will continue"
          ],
          "acceptable": [
            "Data analyses indicate that this trend will continue in the future."
          ],
          "grammarNote": "Số ít: \"analysis\"; số nhiều: \"analyses\" -> động từ số nhiều \"indicate\"."
        },
        {
          "id": "buoc1-singular-plural-s18",
          "vietnamese": "Một bầy ngỗng trắng đang bơi lội thanh bình trên mặt hồ.",
          "target": "A flock of white geese is swimming peacefully on the lake.",
          "masked": [
            "A",
            "f****",
            "o*",
            "w****",
            "g****",
            "i*",
            "s*******",
            "p*********",
            "o*",
            "t**",
            "l***."
          ],
          "hints": [
            "A flock of white geese is swimming peacefully",
            "on the lake"
          ],
          "acceptable": [
            "A flock of white geese is swimming peacefully on the lake."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"goose\" -> \"geese\". Tập hợp: \"A flock of... is\"."
        },
        {
          "id": "buoc1-singular-plural-s19",
          "vietnamese": "Cảnh sát đang điều tra nguyên nhân vụ tai nạn giao thông nghiêm trọng.",
          "target": "The police are investigating the cause of the serious traffic accident.",
          "masked": [
            "T**",
            "p*****",
            "a**",
            "i************",
            "t**",
            "c****",
            "o*",
            "t**",
            "s******",
            "t******",
            "a*******."
          ],
          "hints": [
            "The police are investigating",
            "the cause of the serious traffic accident"
          ],
          "acceptable": [
            "The police are investigating the cause of the serious traffic accident."
          ],
          "grammarNote": "\"The police\" luôn là danh từ số nhiều, đi với \"are\", không dùng \"is\"."
        },
        {
          "id": "buoc1-singular-plural-s20",
          "vietnamese": "Tin tức về vụ phun trào núi lửa đã khiến nhiều người lo lắng.",
          "target": "The news about the volcanic eruption has caused many people to worry.",
          "masked": [
            "T**",
            "n***",
            "a****",
            "t**",
            "v*******",
            "e*******",
            "h**",
            "c*****",
            "m***",
            "p*****",
            "t*",
            "w****."
          ],
          "hints": [
            "The news about the volcanic eruption has caused",
            "people to worry"
          ],
          "acceptable": [
            "The news about the volcanic eruption has caused many people to worry."
          ],
          "grammarNote": "\"News\" là danh từ không đếm được số ít -> \"has caused\"."
        },
        {
          "id": "buoc1-singular-plural-s21",
          "vietnamese": "Nhiều người đàn ông và phụ nữ đã tình nguyện tham gia chiến dịch trồng cây.",
          "target": "Many men and women volunteered to participate in the tree-planting campaign.",
          "masked": [
            "M***",
            "m**",
            "a**",
            "w****",
            "v**********",
            "t*",
            "p**********",
            "i*",
            "t**",
            "t************",
            "c*******."
          ],
          "hints": [
            "Many men and women volunteered to",
            "participate in the tree-planting campaign"
          ],
          "acceptable": [
            "Many men and women volunteered to participate in the tree-planting campaign."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"man\" -> \"men\", \"woman\" -> \"women\"."
        },
        {
          "id": "buoc1-singular-plural-s22",
          "vietnamese": "Đàn chuột đã cắn đứt dây điện trong tầng hầm của toà nhà.",
          "target": "Mice have chewed through the electrical cables in the building basement.",
          "masked": [
            "M***",
            "h***",
            "c*****",
            "t******",
            "t**",
            "e*********",
            "c*****",
            "i*",
            "t**",
            "b*******",
            "b*******."
          ],
          "hints": [
            "Mice have chewed through",
            "electrical cables in the basement"
          ],
          "acceptable": [
            "Mice have chewed through the electrical cables in the building basement."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"mouse\" -> \"mice\"."
        },
        {
          "id": "buoc1-singular-plural-s23",
          "vietnamese": "Khoảng cách 10 dặm là quá xa để có thể đi bộ mỗi ngày.",
          "target": "Ten miles is too long a distance to walk every day.",
          "masked": [
            "T**",
            "m****",
            "i*",
            "t**",
            "l***",
            "a",
            "d*******",
            "t*",
            "w***",
            "e****",
            "d**."
          ],
          "hints": [
            "Ten miles is too long a distance to",
            "walk every day"
          ],
          "acceptable": [
            "Ten miles is too long a distance to walk every day."
          ],
          "grammarNote": "Khoảng cách được coi như một thể thống nhất -> dùng số ít (\"Ten miles is...\")."
        },
        {
          "id": "buoc1-singular-plural-s24",
          "vietnamese": "Hai phần ba diện tích bề mặt Trái Đất được bao phủ bởi nước.",
          "target": "Two-thirds of the Earth's surface is covered by water.",
          "masked": [
            "T*********",
            "o*",
            "t**",
            "E******",
            "s******",
            "i*",
            "c******",
            "b*",
            "w****."
          ],
          "hints": [
            "Two-thirds of the Earth's surface is covered by",
            "water"
          ],
          "acceptable": [
            "Two-thirds of the Earth's surface is covered by water."
          ],
          "grammarNote": "Phân số đi với danh từ không đếm được (\"surface\") -> số ít: \"is covered\"."
        },
        {
          "id": "buoc1-singular-plural-s25",
          "vietnamese": "Quần áo ấm là vật dụng thiết yếu khi đi du lịch ở xứ lạnh.",
          "target": "Warm clothes are essential items when traveling in cold regions.",
          "masked": [
            "W***",
            "c******",
            "a**",
            "e********",
            "i****",
            "w***",
            "t********",
            "i*",
            "c***",
            "r******."
          ],
          "hints": [
            "Warm clothes are essential items when",
            "traveling in cold regions"
          ],
          "acceptable": [
            "Warm clothes are essential items when traveling in cold regions."
          ],
          "grammarNote": "\"Clothes\" luôn ở số nhiều (\"clothes are\")."
        }
      ]
    },
    {
      "id": "buoc1-passive-voice",
      "aliasIds": [
        "write-passive-voice"
      ],
      "title": "Câu bị động (Passive Voice)",
      "step": "Bước 1",
      "level": "B1 - B2",
      "desc": "Luyện dịch 25 câu bị động học thuật chuẩn phong cách khách quan của IELTS Academic Writing.",
      "sentences": [
        {
          "id": "buoc1-passive-voice-s1",
          "vietnamese": "Toà nhà chọc trời này được xây dựng bởi một nhà thầu nổi tiếng thế giới.",
          "target": "This skyscraper was constructed by a world-renowned contractor.",
          "masked": [
            "T***",
            "s*********",
            "w**",
            "c**********",
            "b*",
            "a",
            "w*************",
            "c*********."
          ],
          "hints": [
            "was constructed by",
            "a world-renowned contractor"
          ],
          "acceptable": [
            "This skyscraper was constructed by a world-renowned contractor."
          ],
          "grammarNote": "Bị động quá khứ đơn: was/were + V3/ed. Từ vựng: \"world-renowned\"."
        },
        {
          "id": "buoc1-passive-voice-s2",
          "vietnamese": "Các biện pháp khẩn cấp cần được thực hiện ngay lập tức để giảm thiểu ô nhiễm.",
          "target": "Urgent measures must be taken immediately to mitigate pollution.",
          "masked": [
            "U*****",
            "m*******",
            "m***",
            "b*",
            "t****",
            "i**********",
            "t*",
            "m*******",
            "p********."
          ],
          "hints": [
            "Urgent measures must be taken",
            "immediately to mitigate pollution"
          ],
          "acceptable": [
            "Urgent measures must be taken immediately to mitigate pollution."
          ],
          "grammarNote": "Bị động khiếm khuyết: modal verb + be + V3/ed (\"must be taken\")."
        },
        {
          "id": "buoc1-passive-voice-s3",
          "vietnamese": "Nhiều bài báo khoa học đã được xuất bản trên các tạp chí quốc tế uy tín.",
          "target": "Many scientific papers have been published in prestigious international journals.",
          "masked": [
            "M***",
            "s*********",
            "p*****",
            "h***",
            "b***",
            "p********",
            "i*",
            "p**********",
            "i************",
            "j*******."
          ],
          "hints": [
            "have been published in",
            "prestigious international journals"
          ],
          "acceptable": [
            "Many scientific papers have been published in prestigious international journals."
          ],
          "grammarNote": "Bị động HTHT: have/has been + V3/ed (\"have been published\")."
        },
        {
          "id": "buoc1-passive-voice-s4",
          "vietnamese": "Quyết định cuối cùng sẽ được công bố vào cuộc họp báo vào sáng mai.",
          "target": "The final decision will be announced at the press conference tomorrow morning.",
          "masked": [
            "T**",
            "f****",
            "d*******",
            "w***",
            "b*",
            "a********",
            "a*",
            "t**",
            "p****",
            "c*********",
            "t*******",
            "m******."
          ],
          "hints": [
            "will be announced at",
            "the press conference tomorrow morning"
          ],
          "acceptable": [
            "The final decision will be announced at the press conference tomorrow morning."
          ],
          "grammarNote": "Bị động tương lai đơn: will be + V3/ed (\"will be announced\")."
        },
        {
          "id": "buoc1-passive-voice-s5",
          "vietnamese": "Tiếng Anh được sử dụng như một ngôn ngữ giao tiếp quốc tế trên toàn cầu.",
          "target": "English is used as a global lingua franca around the world.",
          "masked": [
            "E******",
            "i*",
            "u***",
            "a*",
            "a",
            "g*****",
            "l*****",
            "f*****",
            "a*****",
            "t**",
            "w****."
          ],
          "hints": [
            "is used as a global lingua franca",
            "around the world"
          ],
          "acceptable": [
            "English is used as a global lingua franca around the world."
          ],
          "grammarNote": "Bị động hiện tại đơn: is/are + V3/ed. Thuật ngữ: \"lingua franca\"."
        },
        {
          "id": "buoc1-passive-voice-s6",
          "vietnamese": "Một tuyến đường sắt trên cao mới đang được xây dựng ở khu vực phía Tây thành phố.",
          "target": "A new elevated railway is being constructed in the western part of the city.",
          "masked": [
            "A",
            "n**",
            "e*******",
            "r******",
            "i*",
            "b****",
            "c**********",
            "i*",
            "t**",
            "w******",
            "p***",
            "o*",
            "t**",
            "c***."
          ],
          "hints": [
            "is being constructed in",
            "the western part of the city"
          ],
          "acceptable": [
            "A new elevated railway is being constructed in the western part of the city."
          ],
          "grammarNote": "Bị động tiếp diễn: is/are being + V3/ed (\"is being constructed\")."
        },
        {
          "id": "buoc1-passive-voice-s7",
          "vietnamese": "Người ta tin rằng chế độ ăn nhiều rau xanh giúp ngăn ngừa bệnh tim mạch.",
          "target": "It is believed that a diet rich in vegetables helps prevent cardiovascular disease.",
          "masked": [
            "I*",
            "i*",
            "b*******",
            "t***",
            "a",
            "d***",
            "r***",
            "i*",
            "v*********",
            "h****",
            "p******",
            "c*************",
            "d******."
          ],
          "hints": [
            "It is believed that",
            "cardiovascular disease"
          ],
          "acceptable": [
            "It is believed that a diet rich in vegetables helps prevent cardiovascular disease."
          ],
          "grammarNote": "Bị động khách quan: \"It is believed / reported that...\"."
        },
        {
          "id": "buoc1-passive-voice-s8",
          "vietnamese": "Dữ liệu cá nhân của người dùng phải được bảo vệ nghiêm ngặt chống lại tin tặc.",
          "target": "Users' personal data must be strictly protected against cyber hackers.",
          "masked": [
            "U****'",
            "p*******",
            "d***",
            "m***",
            "b*",
            "s*******",
            "p********",
            "a******",
            "c****",
            "h******."
          ],
          "hints": [
            "must be strictly protected against",
            "cyber hackers"
          ],
          "acceptable": [
            "Users' personal data must be strictly protected against cyber hackers."
          ],
          "grammarNote": "Modal passive: \"must be strictly protected against...\"."
        },
        {
          "id": "buoc1-passive-voice-s9",
          "vietnamese": "Bức tranh quý giá đã bị đánh cắp khỏi bảo tàng nghệ thuật vào đêm qua.",
          "target": "The priceless painting was stolen from the art museum last night.",
          "masked": [
            "T**",
            "p********",
            "p*******",
            "w**",
            "s*****",
            "f***",
            "t**",
            "a**",
            "m*****",
            "l***",
            "n****."
          ],
          "hints": [
            "The priceless painting was stolen from",
            "the art museum last night"
          ],
          "acceptable": [
            "The priceless painting was stolen from the art museum last night."
          ],
          "grammarNote": "Bị động quá khứ đơn: was stolen (steal - stole - stolen)."
        },
        {
          "id": "buoc1-passive-voice-s10",
          "vietnamese": "Nhiều trường học ở vùng sâu vùng xa đã được tài trợ máy tính xách tay.",
          "target": "Many schools in remote areas have been funded with laptops.",
          "masked": [
            "M***",
            "s******",
            "i*",
            "r*****",
            "a****",
            "h***",
            "b***",
            "f*****",
            "w***",
            "l******."
          ],
          "hints": [
            "have been funded with laptops",
            "in remote areas"
          ],
          "acceptable": [
            "Many schools in remote areas have been funded with laptops."
          ],
          "grammarNote": "Bị động HTHT: \"have been funded with\"."
        },
        {
          "id": "buoc1-passive-voice-s11",
          "vietnamese": "Rác thải nhựa không nên bị xả bừa bãi ra các đại dương và sông ngòi.",
          "target": "Plastic waste should not be dumped indiscriminately into oceans and rivers.",
          "masked": [
            "P******",
            "w****",
            "s*****",
            "n**",
            "b*",
            "d*****",
            "i***************",
            "i***",
            "o*****",
            "a**",
            "r*****."
          ],
          "hints": [
            "should not be dumped indiscriminately into",
            "oceans and rivers"
          ],
          "acceptable": [
            "Plastic waste should not be dumped indiscriminately into oceans and rivers."
          ],
          "grammarNote": "Trạng từ hay: \"indiscriminately\" (bừa bãi, không phân biệt)."
        },
        {
          "id": "buoc1-passive-voice-s12",
          "vietnamese": "Kỳ thi tốt nghiệp đã được hoãn lại do ảnh hưởng của cơn bão số 3.",
          "target": "The graduation examination was postponed due to the impact of Typhoon No. 3.",
          "masked": [
            "T**",
            "g*********",
            "e**********",
            "w**",
            "p********",
            "d**",
            "t*",
            "t**",
            "i*****",
            "o*",
            "T******",
            "N*.",
            "3."
          ],
          "hints": [
            "was postponed due to",
            "the impact of Typhoon No. 3"
          ],
          "acceptable": [
            "The graduation examination was postponed due to the impact of Typhoon No. 3."
          ],
          "grammarNote": "Từ vựng: \"postpone / delay\" (trì hoãn)."
        },
        {
          "id": "buoc1-passive-voice-s13",
          "vietnamese": "Tác phẩm văn học kinh điển này đã được dịch ra hơn 50 thứ tiếng.",
          "target": "This classic literary work has been translated into more than 50 languages.",
          "masked": [
            "T***",
            "c******",
            "l*******",
            "w***",
            "h**",
            "b***",
            "t*********",
            "i***",
            "m***",
            "t***",
            "5*",
            "l********."
          ],
          "hints": [
            "has been translated into",
            "more than 50 languages"
          ],
          "acceptable": [
            "This classic literary work has been translated into more than 50 languages."
          ],
          "grammarNote": "Cấu trúc bị động: \"be translated into a language\"."
        },
        {
          "id": "buoc1-passive-voice-s14",
          "vietnamese": "Bệnh nhân được bác sĩ yêu cầu phải nghỉ ngơi tuyệt đối trong một tuần.",
          "target": "The patient was requested by the doctor to have complete bed rest for a week.",
          "masked": [
            "T**",
            "p******",
            "w**",
            "r********",
            "b*",
            "t**",
            "d*****",
            "t*",
            "h***",
            "c*******",
            "b**",
            "r***",
            "f**",
            "a",
            "w***."
          ],
          "hints": [
            "was requested to have complete bed rest",
            "for a week"
          ],
          "acceptable": [
            "The patient was requested by the doctor to have complete bed rest for a week."
          ],
          "grammarNote": "Cấu trúc: \"be requested/told to do something\"."
        },
        {
          "id": "buoc1-passive-voice-s15",
          "vietnamese": "Hội nghị thượng đỉnh quốc tế đang được tổ chức tại thủ đô Hà Nội.",
          "target": "The international summit is being hosted in the capital city of Hanoi.",
          "masked": [
            "T**",
            "i************",
            "s*****",
            "i*",
            "b****",
            "h*****",
            "i*",
            "t**",
            "c******",
            "c***",
            "o*",
            "H****."
          ],
          "hints": [
            "is being hosted in",
            "the capital city of Hanoi"
          ],
          "acceptable": [
            "The international summit is being hosted in the capital city of Hanoi."
          ],
          "grammarNote": "Bị động tiếp diễn: \"is being hosted / held in...\"."
        },
        {
          "id": "buoc1-passive-voice-s16",
          "vietnamese": "Mọi thắc mắc của khách hàng sẽ được giải đáp trong vòng 24 giờ làm việc.",
          "target": "All customer inquiries will be addressed within 24 working hours.",
          "masked": [
            "A**",
            "c*******",
            "i********",
            "w***",
            "b*",
            "a********",
            "w*****",
            "2*",
            "w******",
            "h****."
          ],
          "hints": [
            "will be addressed within",
            "24 working hours"
          ],
          "acceptable": [
            "All customer inquiries will be addressed within 24 working hours."
          ],
          "grammarNote": "Từ học thuật: \"address an inquiry\" (giải đáp thắc mắc)."
        },
        {
          "id": "buoc1-passive-voice-s17",
          "vietnamese": "Rất nhiều việc làm mới đã được tạo ra nhờ sự đầu tư của các tập đoàn nước ngoài.",
          "target": "Numerous new jobs have been generated thanks to the investment of foreign corporations.",
          "masked": [
            "N*******",
            "n**",
            "j***",
            "h***",
            "b***",
            "g********",
            "t*****",
            "t*",
            "t**",
            "i*********",
            "o*",
            "f******",
            "c***********."
          ],
          "hints": [
            "have been generated thanks to",
            "investment of foreign corporations"
          ],
          "acceptable": [
            "Numerous new jobs have been generated thanks to the investment of foreign corporations."
          ],
          "grammarNote": "Động từ: \"generate jobs\" (tạo ra việc làm)."
        },
        {
          "id": "buoc1-passive-voice-s18",
          "vietnamese": "Chiếc xe hơi này đã được sửa chữa trước khi người bán bàn giao cho tôi.",
          "target": "This car had been repaired before the seller handed it over to me.",
          "masked": [
            "T***",
            "c**",
            "h**",
            "b***",
            "r*******",
            "b*****",
            "t**",
            "s*****",
            "h*****",
            "i*",
            "o***",
            "t*",
            "m*."
          ],
          "hints": [
            "had been repaired before",
            "the seller handed it over to me"
          ],
          "acceptable": [
            "This car had been repaired before the seller handed it over to me."
          ],
          "grammarNote": "Bị động quá khứ hoàn thành: had been + V3/ed."
        },
        {
          "id": "buoc1-passive-voice-s19",
          "vietnamese": "Trẻ vị thành niên không được phép xem các nội dung có yếu tố bạo lực.",
          "target": "Minors are not permitted to view content containing elements of violence.",
          "masked": [
            "M*****",
            "a**",
            "n**",
            "p********",
            "t*",
            "v***",
            "c******",
            "c*********",
            "e*******",
            "o*",
            "v*******."
          ],
          "hints": [
            "Minors are not permitted to view",
            "content containing violence"
          ],
          "acceptable": [
            "Minors are not permitted to view content containing elements of violence."
          ],
          "grammarNote": "Cấu trúc bị động: \"be permitted to do something\"."
        },
        {
          "id": "buoc1-passive-voice-s20",
          "vietnamese": "Người ta ước tính rằng hơn một triệu người đã bị ảnh hưởng bởi đợt hạn hán.",
          "target": "It is estimated that over one million people have been affected by the drought.",
          "masked": [
            "I*",
            "i*",
            "e********",
            "t***",
            "o***",
            "o**",
            "m******",
            "p*****",
            "h***",
            "b***",
            "a*******",
            "b*",
            "t**",
            "d******."
          ],
          "hints": [
            "It is estimated that",
            "have been affected by the drought"
          ],
          "acceptable": [
            "It is estimated that over one million people have been affected by the drought."
          ],
          "grammarNote": "Bị động khách quan: \"It is estimated that...\"."
        },
        {
          "id": "buoc1-passive-voice-s21",
          "vietnamese": "Bản hợp đồng quan trọng này phải được ký bởi cả hai bên trước khi có hiệu lực.",
          "target": "This important contract must be signed by both parties before taking effect.",
          "masked": [
            "T***",
            "i********",
            "c*******",
            "m***",
            "b*",
            "s*****",
            "b*",
            "b***",
            "p******",
            "b*****",
            "t*****",
            "e*****."
          ],
          "hints": [
            "must be signed by both parties",
            "before taking effect"
          ],
          "acceptable": [
            "This important contract must be signed by both parties before taking effect."
          ],
          "grammarNote": "Thành ngữ: \"take effect\" (có hiệu lực)."
        },
        {
          "id": "buoc1-passive-voice-s22",
          "vietnamese": "Các toà nhà cũ kỹ đã bị phá dỡ để nhường chỗ cho công viên công cộng.",
          "target": "Old dilapidated buildings were demolished to make way for a public park.",
          "masked": [
            "O**",
            "d**********",
            "b********",
            "w***",
            "d*********",
            "t*",
            "m***",
            "w**",
            "f**",
            "a",
            "p*****",
            "p***."
          ],
          "hints": [
            "were demolished to make way for",
            "a public park"
          ],
          "acceptable": [
            "Old dilapidated buildings were demolished to make way for a public park."
          ],
          "grammarNote": "Từ vựng C1: \"demolish\", \"make way for\"."
        },
        {
          "id": "buoc1-passive-voice-s23",
          "vietnamese": "Tất cả các khoản phí vận chuyển đã được bao gồm trong tổng hoá đơn.",
          "target": "All shipping fees have been included in the total invoice.",
          "masked": [
            "A**",
            "s*******",
            "f***",
            "h***",
            "b***",
            "i*******",
            "i*",
            "t**",
            "t****",
            "i******."
          ],
          "hints": [
            "have been included in the total invoice"
          ],
          "acceptable": [
            "All shipping fees have been included in the total invoice."
          ],
          "grammarNote": "Bị động: \"be included in\"."
        },
        {
          "id": "buoc1-passive-voice-s24",
          "vietnamese": "Các bài giảng trực tuyến có thể được truy cập bởi sinh viên ở bất cứ đâu.",
          "target": "Online lectures can be accessed by students from anywhere.",
          "masked": [
            "O*****",
            "l*******",
            "c**",
            "b*",
            "a*******",
            "b*",
            "s*******",
            "f***",
            "a*******."
          ],
          "hints": [
            "can be accessed by students from anywhere"
          ],
          "acceptable": [
            "Online lectures can be accessed by students from anywhere."
          ],
          "grammarNote": "Bị động: \"can be accessed by\"."
        },
        {
          "id": "buoc1-passive-voice-s25",
          "vietnamese": "Vấn đề biến đổi khí hậu được xem là một trong những thách thức lớn nhất của nhân loại.",
          "target": "Climate change is regarded as one of the greatest challenges facing humanity.",
          "masked": [
            "C******",
            "c*****",
            "i*",
            "r*******",
            "a*",
            "o**",
            "o*",
            "t**",
            "g*******",
            "c*********",
            "f*****",
            "h*******."
          ],
          "hints": [
            "is regarded as one of the greatest challenges",
            "facing humanity"
          ],
          "acceptable": [
            "Climate change is regarded as one of the greatest challenges facing humanity."
          ],
          "grammarNote": "Bị động: \"be regarded as / considered as\"."
        }
      ]
    },
    {
      "id": "buoc1-comparison",
      "aliasIds": [
        "write-comparison"
      ],
      "title": "Câu so sánh (Comparison)",
      "step": "Bước 1",
      "level": "B1 - B2",
      "desc": "Luyện dịch 25 câu so sánh hơn, so sánh nhất, so sánh bằng và so sánh kép (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc1-comparison-s1",
          "vietnamese": "Sức khỏe quan trọng hơn tiền bạc.",
          "target": "Health is more important than money.",
          "masked": [
            "H*****",
            "i*",
            "m***",
            "i********",
            "t***",
            "m****."
          ],
          "hints": [
            "Health is more important than money"
          ],
          "acceptable": [
            "Health is more important than money."
          ],
          "grammarNote": "So sánh hơn tính từ dài: more + adj + than."
        },
        {
          "id": "buoc1-comparison-s2",
          "vietnamese": "Sống ở các thành phố lớn đắt đỏ hơn nhiều so với sống ở nông thôn.",
          "target": "Living in major cities is much more expensive than living in the countryside.",
          "masked": [
            "L*****",
            "i*",
            "m****",
            "c*****",
            "i*",
            "m***",
            "m***",
            "e********",
            "t***",
            "l*****",
            "i*",
            "t**",
            "c**********."
          ],
          "hints": [
            "Living in major cities is much more expensive than",
            "living in the countryside"
          ],
          "acceptable": [
            "Living in major cities is much more expensive than living in the countryside."
          ],
          "grammarNote": "Trạng từ nhấn mạnh so sánh: \"much / far more expensive\"."
        },
        {
          "id": "buoc1-comparison-s3",
          "vietnamese": "Đây là cuốn sách thú vị nhất mà tôi từng đọc về tâm lý học hành vi.",
          "target": "This is the most interesting book I have ever read on behavioral psychology.",
          "masked": [
            "T***",
            "i*",
            "t**",
            "m***",
            "i**********",
            "b***",
            "I",
            "h***",
            "e***",
            "r***",
            "o*",
            "b*********",
            "p*********."
          ],
          "hints": [
            "This is the most interesting book",
            "I have ever read on behavioral psychology"
          ],
          "acceptable": [
            "This is the most interesting book I have ever read on behavioral psychology."
          ],
          "grammarNote": "So sánh nhất kết hợp thì HTHT: \"the most + adj + N + S + have ever V3/ed\"."
        },
        {
          "id": "buoc1-comparison-s4",
          "vietnamese": "Giao thông công cộng tiện lợi hơn và thân thiện với môi trường hơn xe cá nhân.",
          "target": "Public transport is more convenient and environmentally friendly than private vehicles.",
          "masked": [
            "P*****",
            "t********",
            "i*",
            "m***",
            "c*********",
            "a**",
            "e**************",
            "f*******",
            "t***",
            "p******",
            "v*******."
          ],
          "hints": [
            "Public transport is more convenient and",
            "environmentally friendly than private vehicles"
          ],
          "acceptable": [
            "Public transport is more convenient and environmentally friendly than private vehicles."
          ],
          "grammarNote": "Tính từ ghép: \"environmentally friendly\"."
        },
        {
          "id": "buoc1-comparison-s5",
          "vietnamese": "Càng học nhiều từ vựng, bạn sẽ càng cảm thấy tự tin hơn khi nói tiếng Anh.",
          "target": "The more vocabulary you learn, the more confident you will feel when speaking English.",
          "masked": [
            "T**",
            "m***",
            "v*********",
            "y**",
            "l****,",
            "t**",
            "m***",
            "c********",
            "y**",
            "w***",
            "f***",
            "w***",
            "s*******",
            "E******."
          ],
          "hints": [
            "The more vocabulary you learn,",
            "the more confident you will feel"
          ],
          "acceptable": [
            "The more vocabulary you learn, the more confident you will feel when speaking English."
          ],
          "grammarNote": "So sánh kép: The more + S + V, the more + adj + S + V."
        },
        {
          "id": "buoc1-comparison-s6",
          "vietnamese": "Chất lượng không khí ở vùng ngoại ô trong lành hơn nhiều so với khu vực nội thành.",
          "target": "Air quality in the suburbs is much cleaner than that in the inner city.",
          "masked": [
            "A**",
            "q******",
            "i*",
            "t**",
            "s******",
            "i*",
            "m***",
            "c******",
            "t***",
            "t***",
            "i*",
            "t**",
            "i****",
            "c***."
          ],
          "hints": [
            "Air quality in the suburbs is much cleaner than",
            "that in the inner city"
          ],
          "acceptable": [
            "Air quality in the suburbs is much cleaner than that in the inner city."
          ],
          "grammarNote": "Đại từ thay thế \"that\" tránh lặp lại danh từ \"air quality\"."
        },
        {
          "id": "buoc1-comparison-s7",
          "vietnamese": "Giá vé máy bay trong mùa cao điểm đắt gấp đôi so với ngày thường.",
          "target": "Airfares during peak season are twice as expensive as on regular days.",
          "masked": [
            "A*******",
            "d*****",
            "p***",
            "s*****",
            "a**",
            "t****",
            "a*",
            "e********",
            "a*",
            "o*",
            "r******",
            "d***."
          ],
          "hints": [
            "Airfares during peak season are twice as expensive as",
            "on regular days"
          ],
          "acceptable": [
            "Airfares during peak season are twice as expensive as on regular days."
          ],
          "grammarNote": "So sánh bội số: S + be + twice + as + adj + as + O."
        },
        {
          "id": "buoc1-comparison-s8",
          "vietnamese": "Tiếng Anh của anh ấy ngày càng trở nên lưu loát hơn nhờ luyện tập mỗi ngày.",
          "target": "His English is becoming more and more fluent thanks to daily practice.",
          "masked": [
            "H**",
            "E******",
            "i*",
            "b*******",
            "m***",
            "a**",
            "m***",
            "f*****",
            "t*****",
            "t*",
            "d****",
            "p*******."
          ],
          "hints": [
            "is becoming more and more fluent",
            "thanks to daily practice"
          ],
          "acceptable": [
            "His English is becoming more and more fluent thanks to daily practice."
          ],
          "grammarNote": "So sánh lũy tiến: \"more and more + adj\"."
        },
        {
          "id": "buoc1-comparison-s9",
          "vietnamese": "Mua sắm trực tuyến không thuận tiện bằng việc thử đồ trực tiếp tại cửa hàng.",
          "target": "Online shopping is not as convenient as trying clothes on in person at the store.",
          "masked": [
            "O*****",
            "s*******",
            "i*",
            "n**",
            "a*",
            "c*********",
            "a*",
            "t*****",
            "c******",
            "o*",
            "i*",
            "p*****",
            "a*",
            "t**",
            "s****."
          ],
          "hints": [
            "is not as convenient as",
            "trying clothes on in person at the store"
          ],
          "acceptable": [
            "Online shopping is not as convenient as trying clothes on in person at the store."
          ],
          "grammarNote": "So sánh không bằng: \"not as + adj + as...\"."
        },
        {
          "id": "buoc1-comparison-s10",
          "vietnamese": "Năng lượng mặt trời là một trong những nguồn năng lượng sạch nhất hiện nay.",
          "target": "Solar energy is one of the cleanest energy sources available today.",
          "masked": [
            "S****",
            "e*****",
            "i*",
            "o**",
            "o*",
            "t**",
            "c*******",
            "e*****",
            "s******",
            "a********",
            "t****."
          ],
          "hints": [
            "is one of the cleanest energy sources",
            "available today"
          ],
          "acceptable": [
            "Solar energy is one of the cleanest energy sources available today."
          ],
          "grammarNote": "Cấu trúc: \"one of the + superlative adj + plural N\"."
        },
        {
          "id": "buoc1-comparison-s11",
          "vietnamese": "Khí hậu ở Đà Lạt mát mẻ hơn nhiều so với thời tiết ngột ngạt ở Thành phố Hồ Chí Minh.",
          "target": "The climate in Da Lat is considerably cooler than the sweltering weather in Ho Chi Minh City.",
          "masked": [
            "T**",
            "c******",
            "i*",
            "D*",
            "L**",
            "i*",
            "c***********",
            "c*****",
            "t***",
            "t**",
            "s*********",
            "w******",
            "i*",
            "H*",
            "C**",
            "M***",
            "C***."
          ],
          "hints": [
            "is considerably cooler than",
            "sweltering weather in Ho Chi Minh City"
          ],
          "acceptable": [
            "The climate in Da Lat is considerably cooler than the sweltering weather in Ho Chi Minh City."
          ],
          "grammarNote": "Từ vựng C1: \"sweltering\" (nóng oi bức)."
        },
        {
          "id": "buoc1-comparison-s12",
          "vietnamese": "Càng bắt đầu sớm, bạn sẽ càng có nhiều thời gian để chuẩn bị cho kỳ thi.",
          "target": "The earlier you start, the more time you will have to prepare for the examination.",
          "masked": [
            "T**",
            "e******",
            "y**",
            "s****,",
            "t**",
            "m***",
            "t***",
            "y**",
            "w***",
            "h***",
            "t*",
            "p******",
            "f**",
            "t**",
            "e**********."
          ],
          "hints": [
            "The earlier you start,",
            "the more time you will have to prepare"
          ],
          "acceptable": [
            "The earlier you start, the more time you will have to prepare for the examination."
          ],
          "grammarNote": "So sánh kép: \"The earlier..., the more time...\"."
        },
        {
          "id": "buoc1-comparison-s13",
          "vietnamese": "Toà nhà Landmark 81 là toà nhà cao nhất tại Việt Nam.",
          "target": "Landmark 81 is the tallest building in Vietnam.",
          "masked": [
            "L*******",
            "8*",
            "i*",
            "t**",
            "t******",
            "b*******",
            "i*",
            "V******."
          ],
          "hints": [
            "Landmark 81 is the tallest building in Vietnam"
          ],
          "acceptable": [
            "Landmark 81 is the tallest building in Vietnam."
          ],
          "grammarNote": "So sánh nhất tính từ ngắn: the + adj-est."
        },
        {
          "id": "buoc1-comparison-s14",
          "vietnamese": "Chi phí sinh hoạt ở Tokyo cao hơn hầu hết các thành phố khác ở châu Á.",
          "target": "The cost of living in Tokyo is higher than that of most other Asian cities.",
          "masked": [
            "T**",
            "c***",
            "o*",
            "l*****",
            "i*",
            "T****",
            "i*",
            "h*****",
            "t***",
            "t***",
            "o*",
            "m***",
            "o****",
            "A****",
            "c*****."
          ],
          "hints": [
            "The cost of living in Tokyo is higher than that of",
            "most other Asian cities"
          ],
          "acceptable": [
            "The cost of living in Tokyo is higher than that of most other Asian cities."
          ],
          "grammarNote": "Dùng \"that of\" để so sánh ngang bằng với \"The cost of living\"."
        },
        {
          "id": "buoc1-comparison-s15",
          "vietnamese": "Bài thi nói hôm nay khó hơn nhiều so với những gì tôi tưởng tượng.",
          "target": "Today's speaking test was much more difficult than what I had imagined.",
          "masked": [
            "T******",
            "s*******",
            "t***",
            "w**",
            "m***",
            "m***",
            "d********",
            "t***",
            "w***",
            "I",
            "h**",
            "i*******."
          ],
          "hints": [
            "was much more difficult than",
            "what I had imagined"
          ],
          "acceptable": [
            "Today's speaking test was much more difficult than what I had imagined."
          ],
          "grammarNote": "So sánh với mệnh đề: \"than what I had imagined\"."
        },
        {
          "id": "buoc1-comparison-s16",
          "vietnamese": "Học một ngôn ngữ mới khi còn nhỏ dễ dàng hơn nhiều so với khi trưởng thành.",
          "target": "Learning a new language in childhood is far easier than in adulthood.",
          "masked": [
            "L*******",
            "a",
            "n**",
            "l*******",
            "i*",
            "c********",
            "i*",
            "f**",
            "e*****",
            "t***",
            "i*",
            "a********."
          ],
          "hints": [
            "Learning a new language in childhood is far easier than",
            "in adulthood"
          ],
          "acceptable": [
            "Learning a new language in childhood is far easier than in adulthood."
          ],
          "grammarNote": "Trạng từ \"far\" bổ nghĩa so sánh hơn cho \"easier\"."
        },
        {
          "id": "buoc1-comparison-s17",
          "vietnamese": "Chiếc máy tính xách tay này nhẹ gấp ba lần chiếc máy cũ của tôi.",
          "target": "This laptop is three times as light as my old one.",
          "masked": [
            "T***",
            "l*****",
            "i*",
            "t****",
            "t****",
            "a*",
            "l****",
            "a*",
            "m*",
            "o**",
            "o**."
          ],
          "hints": [
            "is three times as light as my old one"
          ],
          "acceptable": [
            "This laptop is three times as light as my old one."
          ],
          "grammarNote": "So sánh bội số: \"three times as light as...\"."
        },
        {
          "id": "buoc1-comparison-s18",
          "vietnamese": "Ô nhiễm rác thải nhựa là một trong những mối đe doạ nghiêm trọng nhất đối với đại dương.",
          "target": "Plastic pollution is one of the most severe threats to the oceans.",
          "masked": [
            "P******",
            "p********",
            "i*",
            "o**",
            "o*",
            "t**",
            "m***",
            "s*****",
            "t******",
            "t*",
            "t**",
            "o*****."
          ],
          "hints": [
            "is one of the most severe threats to",
            "the oceans"
          ],
          "acceptable": [
            "Plastic pollution is one of the most severe threats to the oceans."
          ],
          "grammarNote": "Collocation: \"severe threats to something\"."
        },
        {
          "id": "buoc1-comparison-s19",
          "vietnamese": "Công việc hiện tại của cô ấy áp lực hơn nhưng thu nhập lại cao hơn công việc trước.",
          "target": "Her current job is more stressful but more lucrative than her previous one.",
          "masked": [
            "H**",
            "c******",
            "j**",
            "i*",
            "m***",
            "s********",
            "b**",
            "m***",
            "l********",
            "t***",
            "h**",
            "p*******",
            "o**."
          ],
          "hints": [
            "is more stressful but more lucrative than",
            "her previous one"
          ],
          "acceptable": [
            "Her current job is more stressful but more lucrative than her previous one."
          ],
          "grammarNote": "Từ vựng C1: \"lucrative\" (thu nhập cao)."
        },
        {
          "id": "buoc1-comparison-s20",
          "vietnamese": "Xe hơi điện vận hành êm ái hơn nhiều so với xe chạy bằng xăng truyền thống.",
          "target": "Electric vehicles operate much more quietly than traditional gasoline cars.",
          "masked": [
            "E*******",
            "v*******",
            "o******",
            "m***",
            "m***",
            "q******",
            "t***",
            "t**********",
            "g*******",
            "c***."
          ],
          "hints": [
            "operate much more quietly than",
            "traditional gasoline cars"
          ],
          "acceptable": [
            "Electric vehicles operate much more quietly than traditional gasoline cars."
          ],
          "grammarNote": "So sánh hơn trạng từ: \"more quietly than\"."
        },
        {
          "id": "buoc1-comparison-s21",
          "vietnamese": "Càng ít sử dụng túi nilon, môi trường của chúng ta sẽ càng được bảo vệ tốt hơn.",
          "target": "The fewer plastic bags we use, the better our environment will be protected.",
          "masked": [
            "T**",
            "f****",
            "p******",
            "b***",
            "w*",
            "u**,",
            "t**",
            "b*****",
            "o**",
            "e**********",
            "w***",
            "b*",
            "p********."
          ],
          "hints": [
            "The fewer plastic bags we use,",
            "the better our environment will be protected"
          ],
          "acceptable": [
            "The fewer plastic bags we use, the better our environment will be protected."
          ],
          "grammarNote": "So sánh kép danh từ đếm được: \"The fewer + Ns...\"."
        },
        {
          "id": "buoc1-comparison-s22",
          "vietnamese": "Cửa hàng này bán cà phê ngon không kém gì những thương hiệu nổi tiếng.",
          "target": "This coffee shop sells coffee no less delicious than famous brands.",
          "masked": [
            "T***",
            "c*****",
            "s***",
            "s****",
            "c*****",
            "n*",
            "l***",
            "d********",
            "t***",
            "f*****",
            "b*****."
          ],
          "hints": [
            "sells coffee no less delicious than",
            "famous brands"
          ],
          "acceptable": [
            "This coffee shop sells coffee no less delicious than famous brands."
          ],
          "grammarNote": "Cấu trúc so sánh \"no less + adj + than\"."
        },
        {
          "id": "buoc1-comparison-s23",
          "vietnamese": "Khoảng cách giữa người giàu và người nghèo đang ngày càng nới rộng hơn.",
          "target": "The gap between the rich and the poor is growing wider and wider.",
          "masked": [
            "T**",
            "g**",
            "b******",
            "t**",
            "r***",
            "a**",
            "t**",
            "p***",
            "i*",
            "g******",
            "w****",
            "a**",
            "w****."
          ],
          "hints": [
            "The gap between the rich and the poor",
            "is growing wider and wider"
          ],
          "acceptable": [
            "The gap between the rich and the poor is growing wider and wider."
          ],
          "grammarNote": "So sánh lũy tiến: \"wider and wider\"."
        },
        {
          "id": "buoc1-comparison-s24",
          "vietnamese": "Việc bảo tồn các loài động vật quý hiếm quan trọng như việc bảo vệ rừng rậm.",
          "target": "Conserving rare animals is as important as protecting the rainforests.",
          "masked": [
            "C*********",
            "r***",
            "a******",
            "i*",
            "a*",
            "i********",
            "a*",
            "p*********",
            "t**",
            "r**********."
          ],
          "hints": [
            "Conserving rare animals is as important as",
            "protecting the rainforests"
          ],
          "acceptable": [
            "Conserving rare animals is as important as protecting the rainforests."
          ],
          "grammarNote": "So sánh bằng với hai V-ing: \"Conserving... is as important as protecting...\"."
        },
        {
          "id": "buoc1-comparison-s25",
          "vietnamese": "Đây là quyết định khó khăn nhất mà hội đồng quản trị từng phải đưa ra.",
          "target": "This is the most difficult decision the board of directors has ever had to make.",
          "masked": [
            "T***",
            "i*",
            "t**",
            "m***",
            "d********",
            "d*******",
            "t**",
            "b****",
            "o*",
            "d********",
            "h**",
            "e***",
            "h**",
            "t*",
            "m***."
          ],
          "hints": [
            "This is the most difficult decision",
            "the board of directors has ever had to make"
          ],
          "acceptable": [
            "This is the most difficult decision the board of directors has ever had to make."
          ],
          "grammarNote": "Collocation: \"make a decision\"."
        }
      ]
    }
  ],
  "step2": [
    {
      "id": "buoc2-education",
      "aliasIds": [],
      "title": "1. Giáo dục (Education)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 1. Giáo dục (Education) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-education-s1",
          "vietnamese": "Học phí đại học tăng cao đang tạo ra gánh nặng tài chính lớn cho nhiều gia đình.",
          "target": "Rising university tuition fees are imposing a heavy financial burden on many families.",
          "masked": [
            "R*****",
            "u*********",
            "t******",
            "f***",
            "a**",
            "i*******",
            "a",
            "h****",
            "f********",
            "b*****",
            "o*",
            "m***",
            "f*******."
          ],
          "hints": [
            "Rising tuition fees",
            "imposing a heavy financial burden on"
          ],
          "acceptable": [
            "Rising university tuition fees are imposing a heavy financial burden on many families."
          ],
          "grammarNote": "Collocation: \"impose a financial burden on somebody\"."
        },
        {
          "id": "buoc2-education-s2",
          "vietnamese": "Chương trình giảng dạy cần chú trọng phát triển tư duy phản biện cho học sinh.",
          "target": "The curriculum should place more emphasis on developing critical thinking in students.",
          "masked": [
            "T**",
            "c*********",
            "s*****",
            "p****",
            "m***",
            "e*******",
            "o*",
            "d*********",
            "c*******",
            "t*******",
            "i*",
            "s*******."
          ],
          "hints": [
            "place more emphasis on",
            "developing critical thinking"
          ],
          "acceptable": [
            "The curriculum should place more emphasis on developing critical thinking in students."
          ],
          "grammarNote": "Collocation: \"critical thinking\" (tư duy phản biện)."
        },
        {
          "id": "buoc2-education-s3",
          "vietnamese": "Học trực tuyến mang lại sự linh hoạt nhưng đòi hỏi tính tự giác cao.",
          "target": "Online learning provides flexibility but demands high self-discipline.",
          "masked": [
            "O*****",
            "l*******",
            "p*******",
            "f**********",
            "b**",
            "d******",
            "h***",
            "s**************."
          ],
          "hints": [
            "provides flexibility",
            "demands high self-discipline"
          ],
          "acceptable": [
            "Online learning provides flexibility but demands high self-discipline."
          ],
          "grammarNote": "Từ vựng: \"self-discipline\" (tính tự giác)."
        },
        {
          "id": "buoc2-education-s4",
          "vietnamese": "Bằng cấp đại học không còn là tấm vé bảo đảm cho một công việc ổn định.",
          "target": "A university degree is no longer a guaranteed passport to a stable job.",
          "masked": [
            "A",
            "u*********",
            "d*****",
            "i*",
            "n*",
            "l*****",
            "a",
            "g*********",
            "p*******",
            "t*",
            "a",
            "s*****",
            "j**."
          ],
          "hints": [
            "is no longer a guaranteed passport to",
            "a stable job"
          ],
          "acceptable": [
            "A university degree is no longer a guaranteed passport to a stable job."
          ],
          "grammarNote": "Thành ngữ học thuật: \"a passport to success/employment\"."
        },
        {
          "id": "buoc2-education-s5",
          "vietnamese": "Các hoạt động ngoại khoá giúp học sinh rèn luyện kỹ năng mềm và tinh thần đồng đội.",
          "target": "Extracurricular activities help students hone soft skills and teamwork spirit.",
          "masked": [
            "E**************",
            "a*********",
            "h***",
            "s*******",
            "h***",
            "s***",
            "s*****",
            "a**",
            "t*******",
            "s*****."
          ],
          "hints": [
            "Extracurricular activities help students hone",
            "soft skills and teamwork"
          ],
          "acceptable": [
            "Extracurricular activities help students hone soft skills and teamwork spirit."
          ],
          "grammarNote": "Động từ: \"hone skills\" (mài giũa kỹ năng)."
        },
        {
          "id": "buoc2-education-s6",
          "vietnamese": "Nhiều sinh viên lựa chọn gap year để tích luỹ kinh nghiệm thực tế trước khi đi làm.",
          "target": "Many undergraduates choose a gap year to gain practical experience before working.",
          "masked": [
            "M***",
            "u*************",
            "c*****",
            "a",
            "g**",
            "y***",
            "t*",
            "g***",
            "p********",
            "e*********",
            "b*****",
            "w******."
          ],
          "hints": [
            "choose a gap year to gain practical experience"
          ],
          "acceptable": [
            "Many undergraduates choose a gap year to gain practical experience before working."
          ],
          "grammarNote": "Thuật ngữ: \"gap year\", \"gain practical experience\"."
        },
        {
          "id": "buoc2-education-s7",
          "vietnamese": "Giáo dục mầm non đóng vai trò nền tảng trong sự phát triển nhận thức của trẻ.",
          "target": "Early childhood education plays a foundational role in children's cognitive development.",
          "masked": [
            "E****",
            "c********",
            "e********",
            "p****",
            "a",
            "f***********",
            "r***",
            "i*",
            "c*********",
            "c********",
            "d**********."
          ],
          "hints": [
            "plays a foundational role in",
            "cognitive development"
          ],
          "acceptable": [
            "Early childhood education plays a foundational role in children's cognitive development."
          ],
          "grammarNote": "Thuật ngữ IELTS: \"cognitive development\" (phát triển nhận thức)."
        },
        {
          "id": "buoc2-education-s8",
          "vietnamese": "Đánh giá học sinh qua dự án thực tế hiệu quả hơn các bài thi cử truyền thống.",
          "target": "Assessing students through practical projects is more effective than traditional examinations.",
          "masked": [
            "A********",
            "s*******",
            "t******",
            "p********",
            "p*******",
            "i*",
            "m***",
            "e********",
            "t***",
            "t**********",
            "e***********."
          ],
          "hints": [
            "Assessing students through practical projects is",
            "more effective than traditional examinations"
          ],
          "acceptable": [
            "Assessing students through practical projects is more effective than traditional examinations."
          ],
          "grammarNote": "Collocation: \"practical projects\", \"traditional examinations\"."
        },
        {
          "id": "buoc2-education-s9",
          "vietnamese": "Giáo viên không chỉ truyền đạt kiến thức mà còn là người định hướng tương lai.",
          "target": "Teachers not only impart knowledge but also serve as future mentors.",
          "masked": [
            "T*******",
            "n**",
            "o***",
            "i*****",
            "k********",
            "b**",
            "a***",
            "s****",
            "a*",
            "f*****",
            "m******."
          ],
          "hints": [
            "not only impart knowledge but also",
            "serve as future mentors"
          ],
          "acceptable": [
            "Teachers not only impart knowledge but also serve as future mentors."
          ],
          "grammarNote": "Collocation học thuật: \"impart knowledge\" (truyền đạt kiến thức)."
        },
        {
          "id": "buoc2-education-s10",
          "vietnamese": "Học sinh từ các gia đình khó khăn nên được nhận trợ cấp giáo dục từ nhà nước.",
          "target": "Students from disadvantaged backgrounds should receive educational subsidies from the state.",
          "masked": [
            "S*******",
            "f***",
            "d************",
            "b**********",
            "s*****",
            "r******",
            "e**********",
            "s********",
            "f***",
            "t**",
            "s****."
          ],
          "hints": [
            "disadvantaged backgrounds",
            "educational subsidies from the state"
          ],
          "acceptable": [
            "Students from disadvantaged backgrounds should receive educational subsidies from the state."
          ],
          "grammarNote": "Từ vựng C1: \"disadvantaged backgrounds\", \"subsidies\"."
        }
      ]
    },
    {
      "id": "buoc2-environment",
      "aliasIds": [],
      "title": "2. Môi trường (Environment)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 2. Môi trường (Environment) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-environment-s1",
          "vietnamese": "Khí thải nhà kính là thủ phạm chính gây ra hiện tượng nóng lên toàn cầu.",
          "target": "Greenhouse gas emissions are the primary culprit behind global warming.",
          "masked": [
            "G*********",
            "g**",
            "e********",
            "a**",
            "t**",
            "p******",
            "c******",
            "b*****",
            "g*****",
            "w******."
          ],
          "hints": [
            "Greenhouse gas emissions are the primary culprit behind",
            "global warming"
          ],
          "acceptable": [
            "Greenhouse gas emissions are the primary culprit behind global warming."
          ],
          "grammarNote": "Collocation: \"primary culprit\" (thủ phạm chính)."
        },
        {
          "id": "buoc2-environment-s2",
          "vietnamese": "Chuyển sang sử dụng năng lượng tái tạo là giải pháp cấp bách hiện nay.",
          "target": "Transitioning to renewable energy is an urgent solution at present.",
          "masked": [
            "T************",
            "t*",
            "r********",
            "e*****",
            "i*",
            "a*",
            "u*****",
            "s*******",
            "a*",
            "p******."
          ],
          "hints": [
            "Transitioning to renewable energy is",
            "an urgent solution"
          ],
          "acceptable": [
            "Transitioning to renewable energy is an urgent solution at present."
          ],
          "grammarNote": "Collocation: \"renewable energy\" (năng lượng tái tạo)."
        },
        {
          "id": "buoc2-environment-s3",
          "vietnamese": "Nạn phá rừng bừa bãi đang đe doạ nghiêm trọng đến sự đa dạng sinh học.",
          "target": "Rampant deforestation poses a severe threat to biodiversity.",
          "masked": [
            "R******",
            "d************",
            "p****",
            "a",
            "s*****",
            "t*****",
            "t*",
            "b***********."
          ],
          "hints": [
            "Rampant deforestation poses a severe threat to",
            "biodiversity"
          ],
          "acceptable": [
            "Rampant deforestation poses a severe threat to biodiversity."
          ],
          "grammarNote": "Collocation IELTS: \"pose a threat to biodiversity\"."
        },
        {
          "id": "buoc2-environment-s4",
          "vietnamese": "Mỗi cá nhân nên giảm thiểu lượng rác thải nhựa sử dụng một lần mỗi ngày.",
          "target": "Each individual should minimize single-use plastic waste on a daily basis.",
          "masked": [
            "E***",
            "i*********",
            "s*****",
            "m*******",
            "s*********",
            "p******",
            "w****",
            "o*",
            "a",
            "d****",
            "b****."
          ],
          "hints": [
            "minimize single-use plastic waste",
            "on a daily basis"
          ],
          "acceptable": [
            "Each individual should minimize single-use plastic waste on a daily basis."
          ],
          "grammarNote": "Cụm từ: \"single-use plastic\" (nhựa dùng một lần)."
        },
        {
          "id": "buoc2-environment-s5",
          "vietnamese": "Các hiện tượng thời tiết cực đoan như bão lũ đang xảy ra thường xuyên hơn.",
          "target": "Extreme weather events such as floods and storms are occurring with greater frequency.",
          "masked": [
            "E******",
            "w******",
            "e*****",
            "s***",
            "a*",
            "f*****",
            "a**",
            "s*****",
            "a**",
            "o********",
            "w***",
            "g******",
            "f********."
          ],
          "hints": [
            "Extreme weather events",
            "are occurring with greater frequency"
          ],
          "acceptable": [
            "Extreme weather events such as floods and storms are occurring with greater frequency."
          ],
          "grammarNote": "Cụm từ C1: \"with greater frequency\" = more frequently."
        },
        {
          "id": "buoc2-environment-s6",
          "vietnamese": "Ô nhiễm nguồn nước đe doạ trực tiếp đến sức khoẻ của các cộng đồng ven sông.",
          "target": "Water pollution directly threatens the health of riparian communities.",
          "masked": [
            "W****",
            "p********",
            "d*******",
            "t********",
            "t**",
            "h*****",
            "o*",
            "r*******",
            "c**********."
          ],
          "hints": [
            "directly threatens the health of",
            "riparian communities"
          ],
          "acceptable": [
            "Water pollution directly threatens the health of riparian communities."
          ],
          "grammarNote": "Từ vựng C2: \"riparian communities\" (cộng đồng ven sông)."
        },
        {
          "id": "buoc2-environment-s7",
          "vietnamese": "Việc áp thuế carbon có thể khuyến khích các nhà máy cắt giảm phát thải.",
          "target": "Imposing a carbon tax can incentivize factories to cut down on emissions.",
          "masked": [
            "I*******",
            "a",
            "c*****",
            "t**",
            "c**",
            "i**********",
            "f********",
            "t*",
            "c**",
            "d***",
            "o*",
            "e********."
          ],
          "hints": [
            "Imposing a carbon tax can incentivize",
            "factories to cut emissions"
          ],
          "acceptable": [
            "Imposing a carbon tax can incentivize factories to cut down on emissions."
          ],
          "grammarNote": "Collocation kinh tế môi trường: \"impose a carbon tax\"."
        },
        {
          "id": "buoc2-environment-s8",
          "vietnamese": "Các chiến dịch nâng cao nhận thức cộng đồng đóng vai trò then chốt trong việc bảo vệ rừng.",
          "target": "Public awareness campaigns play a pivotal role in forest protection.",
          "masked": [
            "P*****",
            "a********",
            "c********",
            "p***",
            "a",
            "p******",
            "r***",
            "i*",
            "f*****",
            "p*********."
          ],
          "hints": [
            "Public awareness campaigns play a pivotal role in",
            "forest protection"
          ],
          "acceptable": [
            "Public awareness campaigns play a pivotal role in forest protection."
          ],
          "grammarNote": "Collocation: \"play a pivotal role in\" (đóng vai trò mấu chốt)."
        },
        {
          "id": "buoc2-environment-s9",
          "vietnamese": "Đất canh tác nông nghiệp đang bị suy thoái do lạm dụng phân bón hoá học.",
          "target": "Agricultural land is degrading due to the overuse of chemical fertilizers.",
          "masked": [
            "A***********",
            "l***",
            "i*",
            "d********",
            "d**",
            "t*",
            "t**",
            "o******",
            "o*",
            "c*******",
            "f**********."
          ],
          "hints": [
            "is degrading due to the overuse of",
            "chemical fertilizers"
          ],
          "acceptable": [
            "Agricultural land is degrading due to the overuse of chemical fertilizers."
          ],
          "grammarNote": "Từ vựng: \"chemical fertilizers\" (phân bón hoá học)."
        },
        {
          "id": "buoc2-environment-s10",
          "vietnamese": "Bảo tồn tài nguyên thiên nhiên là trách nhiệm chung của toàn nhân loại.",
          "target": "Conserving natural resources is the shared responsibility of all humankind.",
          "masked": [
            "C*********",
            "n******",
            "r********",
            "i*",
            "t**",
            "s*****",
            "r*************",
            "o*",
            "a**",
            "h********."
          ],
          "hints": [
            "Conserving natural resources is",
            "the shared responsibility of humankind"
          ],
          "acceptable": [
            "Conserving natural resources is the shared responsibility of all humankind."
          ],
          "grammarNote": "Collocation: \"shared responsibility\" (trách nhiệm chung)."
        }
      ]
    },
    {
      "id": "buoc2-technology",
      "aliasIds": [],
      "title": "3. Công nghệ (Technology)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 3. Công nghệ (Technology) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-technology-s1",
          "vietnamese": "Chủ đề 3. Công nghệ (Technology): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-technology-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-technology-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-technology-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-technology-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-health",
      "aliasIds": [],
      "title": "4. Sức khoẻ (Health)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 4. Sức khoẻ (Health) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-health-s1",
          "vietnamese": "Chủ đề 4. Sức khoẻ (Health): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-health-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-health-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-health-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-health-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-work",
      "aliasIds": [],
      "title": "5. Công việc (Work)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 5. Công việc (Work) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-work-s1",
          "vietnamese": "Chủ đề 5. Công việc (Work): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-work-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-work-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-work-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-work-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-travel",
      "aliasIds": [],
      "title": "6. Du lịch (Travel)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 6. Du lịch (Travel) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-travel-s1",
          "vietnamese": "Chủ đề 6. Du lịch (Travel): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-travel-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-travel-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-travel-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-travel-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-food",
      "aliasIds": [],
      "title": "7. Thực phẩm (Food)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 7. Thực phẩm (Food) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-food-s1",
          "vietnamese": "Chủ đề 7. Thực phẩm (Food): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-food-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-food-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-food-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-food-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-hobbies",
      "aliasIds": [],
      "title": "8. Sở thích (Hobbies)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 8. Sở thích (Hobbies) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-hobbies-s1",
          "vietnamese": "Chủ đề 8. Sở thích (Hobbies): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-hobbies-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-hobbies-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-hobbies-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-hobbies-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-family",
      "aliasIds": [],
      "title": "9. Gia đình (Family)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 9. Gia đình (Family) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-family-s1",
          "vietnamese": "Chủ đề 9. Gia đình (Family): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-family-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-family-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-family-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-family-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-social-media",
      "aliasIds": [],
      "title": "10. Mạng xã hội (Social Media)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 10. Mạng xã hội (Social Media) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-social-media-s1",
          "vietnamese": "Chủ đề 10. Mạng xã hội (Social Media): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-social-media-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-social-media-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-social-media-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-social-media-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-shopping",
      "aliasIds": [],
      "title": "11. Mua sắm (Shopping)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 11. Mua sắm (Shopping) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-shopping-s1",
          "vietnamese": "Chủ đề 11. Mua sắm (Shopping): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-shopping-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-shopping-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-shopping-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-shopping-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-city-life",
      "aliasIds": [],
      "title": "12. Cuộc sống đô thị (City Life)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 12. Cuộc sống đô thị (City Life) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-city-life-s1",
          "vietnamese": "Chủ đề 12. Cuộc sống đô thị (City Life): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-city-life-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-city-life-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-city-life-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-city-life-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-transport",
      "aliasIds": [],
      "title": "13. Giao thông (Transport)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 13. Giao thông (Transport) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-transport-s1",
          "vietnamese": "Chủ đề 13. Giao thông (Transport): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-transport-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-transport-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-transport-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-transport-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-culture",
      "aliasIds": [],
      "title": "14. Văn hoá (Culture)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 14. Văn hoá (Culture) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-culture-s1",
          "vietnamese": "Chủ đề 14. Văn hoá (Culture): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-culture-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-culture-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-culture-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-culture-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-crime",
      "aliasIds": [],
      "title": "15. Tội phạm (Crime)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 15. Tội phạm (Crime) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-crime-s1",
          "vietnamese": "Chủ đề 15. Tội phạm (Crime): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-crime-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-crime-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-crime-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-crime-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    }
  ],
  "step3": [
    {
      "id": "buoc3-education",
      "aliasIds": [],
      "title": "1. Đoạn văn Giáo dục (Education - Band 6.5)",
      "step": "Bước 3",
      "level": "Band 6.5",
      "desc": "Luyện dịch đoạn văn học thuật ngắn đạt độ trôi chảy và mạch lạc Band 6.5.",
      "sentences": [
        {
          "id": "buoc3-edu-p1",
          "vietnamese": "Giáo dục đại học mang lại nhiều lợi ích vượt trội cho người học. Đầu tiên, sinh viên được trang bị kiến thức chuyên sâu và kỹ năng thực tế cần thiết cho sự nghiệp tương lai. Thêm vào đó, môi trường đại học tạo cơ hội mở rộng mạng lưới quan hệ xã hội, giúp sinh viên dễ dàng tìm kiếm việc làm sau khi tốt nghiệp.",
          "target": "Higher education confers numerous distinct advantages on learners. First, undergraduates are equipped with in-depth knowledge and practical skills essential for their future careers. In addition, the university environment offers opportunities to expand social networks, helping students secure employment more easily upon graduation.",
          "masked": [
            "H*****",
            "e********",
            "c******",
            "n*******",
            "d*******",
            "a*********",
            "o*",
            "l*******.",
            "F****,",
            "u*************",
            "a**",
            "e*******",
            "w***",
            "i*******",
            "k********",
            "a**",
            "p********",
            "s*****",
            "e********",
            "f**",
            "t****",
            "f*****",
            "c******.",
            "I*",
            "a*******,",
            "t**",
            "u*********",
            "e**********",
            "o*****",
            "o************",
            "t*",
            "e*****",
            "s*****",
            "n*******,",
            "h******",
            "s*******",
            "s*****",
            "e*********",
            "m***",
            "e*****",
            "u***",
            "g*********."
          ],
          "hints": [
            "Higher education confers advantages on",
            "equipped with in-depth knowledge",
            "secure employment upon graduation"
          ],
          "acceptable": [
            "Higher education confers numerous distinct advantages on learners. First, undergraduates are equipped with in-depth knowledge and practical skills essential for their future careers. In addition, the university environment offers opportunities to expand social networks, helping students secure employment more easily upon graduation."
          ],
          "grammarNote": "Đoạn văn hoàn chỉnh sử dụng liên từ nối \"First, In addition\" và mệnh đề phân từ \"helping students secure employment\"."
        }
      ]
    },
    {
      "id": "buoc3-environment",
      "aliasIds": [],
      "title": "2. Đoạn văn Môi trường (Environment - Band 6.5)",
      "step": "Bước 3",
      "level": "Band 6.5",
      "desc": "Luyện dịch đoạn văn phân tích nguyên nhân và giải pháp môi trường.",
      "sentences": [
        {
          "id": "buoc3-env-p1",
          "vietnamese": "Ô nhiễm không khí tại các vùng đô thị chủ yếu xuất phát từ khí thải phương tiện giao thông và các nhà máy công nghiệp. Để giải quyết vấn đề nan giải này, các nhà chức trách cần đẩy mạnh đầu tư vào hệ thống giao thông công cộng chạy bằng năng lượng sạch, đồng thời ban hành các mức phạt nghiêm khắc đối với những doanh nghiệp vi phạm quy chuẩn xả thải.",
          "target": "Urban air pollution primarily stems from vehicle emissions and industrial manufacturing plants. To tackle this pressing dilemma, municipal authorities must intensify investment in clean-energy mass transit while enforcing stringent penalties against enterprises breaching environmental emission standards.",
          "masked": [
            "U****",
            "a**",
            "p********",
            "p********",
            "s****",
            "f***",
            "v******",
            "e********",
            "a**",
            "i*********",
            "m************",
            "p*****.",
            "T*",
            "t*****",
            "t***",
            "p*******",
            "d******,",
            "m********",
            "a**********",
            "m***",
            "i********",
            "i*********",
            "i*",
            "c***********",
            "m***",
            "t******",
            "w****",
            "e********",
            "s********",
            "p********",
            "a******",
            "e**********",
            "b********",
            "e************",
            "e*******",
            "s********."
          ],
          "hints": [
            "primarily stems from",
            "tackle this pressing dilemma",
            "enforcing stringent penalties"
          ],
          "acceptable": [
            "Urban air pollution primarily stems from vehicle emissions and industrial manufacturing plants. To tackle this pressing dilemma, municipal authorities must intensify investment in clean-energy mass transit while enforcing stringent penalties against enterprises breaching environmental emission standards."
          ],
          "grammarNote": "Collocation C1: \"stem from\" (bắt nguồn từ), \"pressing dilemma\" (tình thế tiến thoái lưỡng nan cấp bách)."
        }
      ]
    }
  ],
  "step4": [
    {
      "id": "buoc4-technology",
      "aliasIds": [],
      "title": "1. Đoạn văn Công nghệ & Trí tuệ nhân tạo (Band 8.0)",
      "step": "Bước 4",
      "level": "Band 8.0",
      "desc": "Luyện dịch đoạn văn cấu trúc phức hợp, từ vựng C1-C2 linh hoạt theo chuẩn Band 8.0.",
      "sentences": [
        {
          "id": "buoc4-tech-p1",
          "vietnamese": "Sự trỗi dậy vượt bậc của trí tuệ nhân tạo tạo ra một bước ngoặt mang tính cách mạng trong thị trường lao động toàn cầu. Trong khi công nghệ này giải phóng con người khỏi những tác vụ lặp đi lặp lại tẻ nhạt và thúc đẩy năng suất đột phá, nó đồng thời dấy lên mối lo ngại sâu sắc về tình trạng dịch chuyển việc làm quy mô lớn đối với lực lượng lao động tri thức.",
          "target": "The meteoric ascendancy of artificial intelligence represents a watershed transformation across global labor markets. While liberating human capital from tedious repetitive tasks and precipitating exponential productivity gains, it concurrently triggers profound apprehension regarding the mass disenfranchisement of white-collar workforces.",
          "masked": [
            "T**",
            "m*******",
            "a*********",
            "o*",
            "a*********",
            "i***********",
            "r*********",
            "a",
            "w********",
            "t*************",
            "a*****",
            "g*****",
            "l****",
            "m******.",
            "W****",
            "l*********",
            "h****",
            "c******",
            "f***",
            "t******",
            "r*********",
            "t****",
            "a**",
            "p************",
            "e**********",
            "p***********",
            "g****,",
            "i*",
            "c***********",
            "t*******",
            "p*******",
            "a***********",
            "r********",
            "t**",
            "m***",
            "d*****************",
            "o*",
            "w***********",
            "w*********."
          ],
          "hints": [
            "meteoric ascendancy of AI",
            "watershed transformation",
            "precipitating exponential productivity",
            "white-collar workforces"
          ],
          "acceptable": [
            "The meteoric ascendancy of artificial intelligence represents a watershed transformation across global labor markets. While liberating human capital from tedious repetitive tasks and precipitating exponential productivity gains, it concurrently triggers profound apprehension regarding the mass disenfranchisement of white-collar workforces."
          ],
          "grammarNote": "Cấu trúc câu phức Band 8.0+: \"The meteoric ascendancy... represents a watershed transformation... While liberating..., it concurrently triggers...\"."
        }
      ]
    }
  ],
  "step5": [
    {
      "id": "buoc5-education-essay",
      "aliasIds": [],
      "title": "1. Essay: University Degree vs Work Experience (Full Task 2)",
      "step": "Bước 5",
      "level": "Band 7.5 - 8.5",
      "desc": "Dịch nguyên bài luận hoàn chỉnh gồm Mở bài, 2 Thân bài và Kết luận.",
      "sentences": [
        {
          "id": "buoc5-essay1-intro",
          "vietnamese": "Mở bài: Liệu giáo dục đại học có còn là con đường duy nhất dẫn đến thành công sự nghiệp hay kinh nghiệm thực tế mới là yếu tố quyết định? Bài viết này sẽ phân tích cả hai góc nhìn trước khi khẳng định quan điểm rằng sự kết hợp hài hoà của cả hai mới là yếu tố tối ưu nhất.",
          "target": "Introduction: Whether tertiary education remains the sole conduit to occupational success or practical workplace experience holds greater significance remains a fiercely contested debate. This essay examines both perspectives before contending that a judicious synthesis of both elements yields the most favorable career trajectory.",
          "masked": [
            "I***********:",
            "W******",
            "t*******",
            "e********",
            "r******",
            "t**",
            "s***",
            "c******",
            "t*",
            "o***********",
            "s******",
            "o*",
            "p********",
            "w********",
            "e*********",
            "h****",
            "g******",
            "s***********",
            "r******",
            "a",
            "f*******",
            "c********",
            "d*****.",
            "T***",
            "e****",
            "e*******",
            "b***",
            "p***********",
            "b*****",
            "c*********",
            "t***",
            "a",
            "j********",
            "s********",
            "o*",
            "b***",
            "e*******",
            "y*****",
            "t**",
            "m***",
            "f********",
            "c*****",
            "t*********."
          ],
          "hints": [
            "tertiary education",
            "sole conduit to success",
            "judicious synthesis"
          ],
          "acceptable": [
            "Introduction: Whether tertiary education remains the sole conduit to occupational success or practical workplace experience holds greater significance remains a fiercely contested debate. This essay examines both perspectives before contending that a judicious synthesis of both elements yields the most favorable career trajectory."
          ],
          "grammarNote": "Cấu trúc mở bài mẫu mực cho dạng Discuss Both Views: Whether... or... remains a debate. This essay examines both perspectives before contending that..."
        }
      ]
    }
  ],
  "tenses": [
    {
      "id": "buoc1-simple-present",
      "aliasIds": [
        "write-pres-simple",
        "write-to-be",
        "write-articles",
        "write-there-is-are"
      ],
      "title": "Hiện tại đơn (Simple Present)",
      "step": "Bước 1",
      "level": "A1 - A2",
      "desc": "Luyện dịch 25 câu diễn tả thói quen, chân lý và sự thật hiển nhiên (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc1-simple-present-s1",
          "vietnamese": "Tôi thức dậy lúc 6 giờ sáng mỗi ngày.",
          "target": "I wake up at 6 AM every day.",
          "masked": [
            "I",
            "w***",
            "u*",
            "a*",
            "6",
            "A*",
            "e****",
            "d**."
          ],
          "hints": [
            "wake up at 6 AM",
            "every day"
          ],
          "acceptable": [
            "I wake up at 6 AM every day."
          ],
          "grammarNote": "Thì Hiện tại đơn với chủ ngữ \"I\" thì động từ nguyên mẫu \"wake up\"."
        },
        {
          "id": "buoc1-simple-present-s2",
          "vietnamese": "Cô ấy làm việc tại một công ty công nghệ ở Hà Nội.",
          "target": "She works at a technology company in Hanoi.",
          "masked": [
            "S**",
            "w****",
            "a*",
            "a",
            "t*********",
            "c******",
            "i*",
            "H****."
          ],
          "hints": [
            "works at",
            "a technology company",
            "in Hanoi"
          ],
          "acceptable": [
            "She works at a technology company in Hanoi."
          ],
          "grammarNote": "Chủ ngữ ngôi thứ ba số ít \"She\" -> động từ thêm -s \"works\"."
        },
        {
          "id": "buoc1-simple-present-s3",
          "vietnamese": "Mặt trời mọc ở hướng Đông và lặn ở hướng Tây.",
          "target": "The sun rises in the east and sets in the west.",
          "masked": [
            "T**",
            "s**",
            "r****",
            "i*",
            "t**",
            "e***",
            "a**",
            "s***",
            "i*",
            "t**",
            "w***."
          ],
          "hints": [
            "The sun rises",
            "in the east",
            "and sets in the west"
          ],
          "acceptable": [
            "The sun rises in the east and sets in the west."
          ],
          "grammarNote": "Chân lý tự nhiên: thì HTĐ. \"The sun\" số ít -> \"rises\", \"sets\"."
        },
        {
          "id": "buoc1-simple-present-s4",
          "vietnamese": "Họ không ăn thịt vì họ là người ăn chay.",
          "target": "They do not eat meat because they are vegetarians.",
          "masked": [
            "T***",
            "d*",
            "n**",
            "e**",
            "m***",
            "b******",
            "t***",
            "a**",
            "v**********."
          ],
          "hints": [
            "do not eat meat",
            "because they are vegetarians"
          ],
          "acceptable": [
            "They do not eat meat because they are vegetarians."
          ],
          "grammarNote": "Phủ định HTĐ với \"They\": \"do not eat\". Danh từ: \"vegetarians\"."
        },
        {
          "id": "buoc1-simple-present-s5",
          "vietnamese": "Bạn có thường xuyên đi du lịch vào mùa hè không?",
          "target": "Do you often travel in the summer?",
          "masked": [
            "D*",
            "y**",
            "o****",
            "t*****",
            "i*",
            "t**",
            "s*****?"
          ],
          "hints": [
            "Do you often travel",
            "in the summer"
          ],
          "acceptable": [
            "Do you often travel in the summer?"
          ],
          "grammarNote": "Câu hỏi HTĐ: Do + S + V-bare. Trạng từ tần suất \"often\"."
        },
        {
          "id": "buoc1-simple-present-s6",
          "vietnamese": "Anh ấy nói ba ngôn ngữ một cách thành thạo.",
          "target": "He speaks three languages fluently.",
          "masked": [
            "H*",
            "s*****",
            "t****",
            "l********",
            "f*******."
          ],
          "hints": [
            "speaks three languages",
            "fluently"
          ],
          "acceptable": [
            "He speaks three languages fluently."
          ],
          "grammarNote": "Chủ ngữ \"He\" -> \"speaks\". Trạng từ \"fluently\"."
        },
        {
          "id": "buoc1-simple-present-s7",
          "vietnamese": "Thư viện mở cửa từ 8 giờ sáng đến 9 giờ tối.",
          "target": "The library opens from 8 AM to 9 PM.",
          "masked": [
            "T**",
            "l******",
            "o****",
            "f***",
            "8",
            "A*",
            "t*",
            "9",
            "P*."
          ],
          "hints": [
            "The library opens",
            "from 8 AM to 9 PM"
          ],
          "acceptable": [
            "The library opens from 8 AM to 9 PM."
          ],
          "grammarNote": "Lịch trình, thời gian biểu cố định dùng thì HTĐ: \"The library opens...\"."
        },
        {
          "id": "buoc1-simple-present-s8",
          "vietnamese": "Nước sôi ở 100 độ C.",
          "target": "Water boils at 100 degrees Celsius.",
          "masked": [
            "W****",
            "b****",
            "a*",
            "1**",
            "d******",
            "C******."
          ],
          "hints": [
            "Water boils",
            "at 100 degrees Celsius"
          ],
          "acceptable": [
            "Water boils at 100 degrees Celsius."
          ],
          "grammarNote": "Sự thật khoa học: \"Water\" không đếm được -> \"boils\"."
        },
        {
          "id": "buoc1-simple-present-s9",
          "vietnamese": "Chúng tôi thường ăn tối cùng nhau vào cuối tuần.",
          "target": "We usually have dinner together on weekends.",
          "masked": [
            "W*",
            "u******",
            "h***",
            "d*****",
            "t*******",
            "o*",
            "w*******."
          ],
          "hints": [
            "usually have dinner together",
            "on weekends"
          ],
          "acceptable": [
            "We usually have dinner together on weekends."
          ],
          "grammarNote": "Cụm từ: \"have dinner together\", giới từ: \"on weekends\"."
        },
        {
          "id": "buoc1-simple-present-s10",
          "vietnamese": "Mẹ tôi nấu ăn rất ngon.",
          "target": "My mother cooks very well.",
          "masked": [
            "M*",
            "m*****",
            "c****",
            "v***",
            "w***."
          ],
          "hints": [
            "My mother cooks",
            "very well / delicious food"
          ],
          "acceptable": [
            "My mother cooks very well."
          ],
          "grammarNote": "Chủ ngữ \"My mother\" số ít -> \"cooks\". Trạng từ \"well\"."
        },
        {
          "id": "buoc1-simple-present-s11",
          "vietnamese": "Trẻ em thích chơi ngoài trời hơn là xem tivi.",
          "target": "Children prefer playing outdoors to watching television.",
          "masked": [
            "C*******",
            "p*****",
            "p******",
            "o*******",
            "t*",
            "w*******",
            "t*********."
          ],
          "hints": [
            "Children prefer V-ing to V-ing",
            "playing outdoors"
          ],
          "acceptable": [
            "Children prefer playing outdoors to watching television."
          ],
          "grammarNote": "Cấu trúc: prefer V-ing to V-ing (thích làm gì hơn làm gì)."
        },
        {
          "id": "buoc1-simple-present-s12",
          "vietnamese": "Cửa hàng này bán trái cây tươi mỗi ngày.",
          "target": "This shop sells fresh fruit every day.",
          "masked": [
            "T***",
            "s***",
            "s****",
            "f****",
            "f****",
            "e****",
            "d**."
          ],
          "hints": [
            "This shop sells",
            "fresh fruit",
            "every day"
          ],
          "acceptable": [
            "This shop sells fresh fruit every day."
          ],
          "grammarNote": "Chủ ngữ \"This shop\" số ít -> \"sells\". \"Fruit\" số ít/không đếm được."
        },
        {
          "id": "buoc1-simple-present-s13",
          "vietnamese": "Bạn tôi sống gần công viên thành phố.",
          "target": "My friend lives near the city park.",
          "masked": [
            "M*",
            "f*****",
            "l****",
            "n***",
            "t**",
            "c***",
            "p***."
          ],
          "hints": [
            "My friend lives near",
            "the city park"
          ],
          "acceptable": [
            "My friend lives near the city park."
          ],
          "grammarNote": "Động từ \"lives\" chia theo chủ ngữ số ít \"My friend\"."
        },
        {
          "id": "buoc1-simple-present-s14",
          "vietnamese": "Chuyến tàu khởi hành lúc 7 giờ sáng mai.",
          "target": "The train departs at 7 AM tomorrow.",
          "masked": [
            "T**",
            "t****",
            "d******",
            "a*",
            "7",
            "A*",
            "t*******."
          ],
          "hints": [
            "The train departs",
            "at 7 AM tomorrow"
          ],
          "acceptable": [
            "The train departs at 7 AM tomorrow."
          ],
          "grammarNote": "Lịch trình tàu xe tương lai dùng thì Hiện tại đơn."
        },
        {
          "id": "buoc1-simple-present-s15",
          "vietnamese": "Tôi không hiểu câu hỏi này.",
          "target": "I do not understand this question.",
          "masked": [
            "I",
            "d*",
            "n**",
            "u*********",
            "t***",
            "q*******."
          ],
          "hints": [
            "do not understand",
            "this question"
          ],
          "acceptable": [
            "I do not understand this question."
          ],
          "grammarNote": "Động từ nhận thức \"understand\" không chia tiếp diễn."
        },
        {
          "id": "buoc1-simple-present-s16",
          "vietnamese": "Thời tiết ở đây rất đẹp vào mùa thu.",
          "target": "The weather here is very beautiful in autumn.",
          "masked": [
            "T**",
            "w******",
            "h***",
            "i*",
            "v***",
            "b********",
            "i*",
            "a*****."
          ],
          "hints": [
            "The weather here is",
            "very beautiful in autumn"
          ],
          "acceptable": [
            "The weather here is very beautiful in autumn."
          ],
          "grammarNote": "\"The weather\" không đếm được -> \"is\". Mùa thu: \"in autumn\"."
        },
        {
          "id": "buoc1-simple-present-s17",
          "vietnamese": "Anh ấy luôn lắng nghe ý kiến của đồng nghiệp.",
          "target": "He always listens to the opinions of his colleagues.",
          "masked": [
            "H*",
            "a*****",
            "l******",
            "t*",
            "t**",
            "o*******",
            "o*",
            "h**",
            "c*********."
          ],
          "hints": [
            "always listens to",
            "opinions of colleagues"
          ],
          "acceptable": [
            "He always listens to the opinions of his colleagues."
          ],
          "grammarNote": "Động từ \"listen\" đi với giới từ \"to\": \"listen to\"."
        },
        {
          "id": "buoc1-simple-present-s18",
          "vietnamese": "Bác sĩ khuyên bệnh nhân uống nhiều nước.",
          "target": "The doctor advises patients to drink plenty of water.",
          "masked": [
            "T**",
            "d*****",
            "a******",
            "p*******",
            "t*",
            "d****",
            "p*****",
            "o*",
            "w****."
          ],
          "hints": [
            "advises patients to",
            "drink plenty of water"
          ],
          "acceptable": [
            "The doctor advises patients to drink plenty of water."
          ],
          "grammarNote": "Cấu trúc: advise someone to do something."
        },
        {
          "id": "buoc1-simple-present-s19",
          "vietnamese": "Nhiều người trẻ sử dụng mạng xã hội hàng giờ mỗi ngày.",
          "target": "Many young people use social media for hours every day.",
          "masked": [
            "M***",
            "y****",
            "p*****",
            "u**",
            "s*****",
            "m****",
            "f**",
            "h****",
            "e****",
            "d**."
          ],
          "hints": [
            "Many young people use",
            "social media for hours every day"
          ],
          "acceptable": [
            "Many young people use social media for hours every day."
          ],
          "grammarNote": "Chủ ngữ \"Many young people\" số nhiều -> \"use\"."
        },
        {
          "id": "buoc1-simple-present-s20",
          "vietnamese": "Con sông này chảy qua nhiều tỉnh thành.",
          "target": "This river flows through many provinces.",
          "masked": [
            "T***",
            "r****",
            "f****",
            "t******",
            "m***",
            "p********."
          ],
          "hints": [
            "This river flows through",
            "many provinces"
          ],
          "acceptable": [
            "This river flows through many provinces."
          ],
          "grammarNote": "Chủ ngữ \"This river\" số ít -> \"flows\". Giới từ \"through\"."
        },
        {
          "id": "buoc1-simple-present-s21",
          "vietnamese": "Cô ấy luôn mỉm cười khi gặp người lạ.",
          "target": "She always smiles when meeting strangers.",
          "masked": [
            "S**",
            "a*****",
            "s*****",
            "w***",
            "m******",
            "s********."
          ],
          "hints": [
            "always smiles",
            "when meeting strangers"
          ],
          "acceptable": [
            "She always smiles when meeting strangers."
          ],
          "grammarNote": "Chủ ngữ \"She\" -> \"smiles\". Mệnh đề rút gọn: \"when meeting strangers\"."
        },
        {
          "id": "buoc1-simple-present-s22",
          "vietnamese": "Công ty tôi xuất khẩu hàng hoá sang châu Âu.",
          "target": "My company exports goods to Europe.",
          "masked": [
            "M*",
            "c******",
            "e******",
            "g****",
            "t*",
            "E*****."
          ],
          "hints": [
            "exports goods",
            "to Europe"
          ],
          "acceptable": [
            "My company exports goods to Europe."
          ],
          "grammarNote": "Chủ ngữ \"My company\" số ít -> \"exports\". \"goods\" luôn số nhiều."
        },
        {
          "id": "buoc1-simple-present-s23",
          "vietnamese": "Trẻ em cần ngủ đủ giấc để phát triển khỏe mạnh.",
          "target": "Children need enough sleep to develop healthily.",
          "masked": [
            "C*******",
            "n***",
            "e*****",
            "s****",
            "t*",
            "d******",
            "h********."
          ],
          "hints": [
            "need enough sleep",
            "to develop healthily"
          ],
          "acceptable": [
            "Children need enough sleep to develop healthily."
          ],
          "grammarNote": "Cấu trúc: need + noun + to V. Trạng từ \"healthily\"."
        },
        {
          "id": "buoc1-simple-present-s24",
          "vietnamese": "Anh tôi làm việc ở một ngân hàng lớn.",
          "target": "My brother works at a large bank.",
          "masked": [
            "M*",
            "b******",
            "w****",
            "a*",
            "a",
            "l****",
            "b***."
          ],
          "hints": [
            "My brother works at",
            "a large bank"
          ],
          "acceptable": [
            "My brother works at a large bank."
          ],
          "grammarNote": "Chủ ngữ \"My brother\" số ít -> \"works\"."
        },
        {
          "id": "buoc1-simple-present-s25",
          "vietnamese": "Các nhà khoa học nghiên cứu nguyên nhân của biến đổi khí hậu.",
          "target": "Scientists research the causes of climate change.",
          "masked": [
            "S*********",
            "r*******",
            "t**",
            "c*****",
            "o*",
            "c******",
            "c*****."
          ],
          "hints": [
            "Scientists research",
            "the causes of climate change"
          ],
          "acceptable": [
            "Scientists research the causes of climate change."
          ],
          "grammarNote": "Thuật ngữ học thuật: \"climate change\" (biến đổi khí hậu)."
        }
      ]
    },
        {
        "id": "buoc1-was-were",
        "aliasIds": [
            "write-was-were",
            "write-past-be"
        ],
        "title": "Quá khứ đơn: Was, Were (Past Simple of To Be)",
        "step": "Bước 1",
        "level": "A1 - A2",
        "desc": "Luyện dịch 20 câu làm chủ động từ To Be ở quá khứ đơn (Was / Were), thể khẳng định, phủ định và câu hỏi (Chuẩn The IELTS Dictionary).",
        "sentences": [
            {
                "id": "buoc1-was-were-s1",
                "vietnamese": "Hôm qua thời tiết rất đẹp và ấm áp.",
                "target": "The weather was very nice and warm yesterday.",
                "masked": [
                    "T**",
                    "w******",
                    "w**",
                    "v***",
                    "n***",
                    "a**",
                    "w***",
                    "y********."
                ],
                "hints": [
                    "The weather was very nice",
                    "and warm yesterday"
                ],
                "acceptable": [
                    "The weather was very nice and warm yesterday.",
                    "Yesterday the weather was very nice and warm."
                ],
                "grammarNote": "Chủ ngữ ngôi thứ 3 số ít 'The weather' đi với 'was' trong quá khứ đơn."
            },
            {
                "id": "buoc1-was-were-s2",
                "vietnamese": "Họ đã ở đâu vào tối hôm qua?",
                "target": "Where were they yesterday evening?",
                "masked": [
                    "W****",
                    "w***",
                    "t***",
                    "y********",
                    "e******?"
                ],
                "hints": [
                    "Where were they",
                    "yesterday evening"
                ],
                "acceptable": [
                    "Where were they yesterday evening?",
                    "Where were they last night?"
                ],
                "grammarNote": "Câu hỏi Wh- với To Be ở quá khứ: Where + were + they...?"
            },
            {
                "id": "buoc1-was-were-s3",
                "vietnamese": "Tôi đã rất mệt sau một ngày làm việc dài.",
                "target": "I was very tired after a long working day.",
                "masked": [
                    "I",
                    "w**",
                    "v***",
                    "t****",
                    "a****",
                    "a",
                    "l***",
                    "w******",
                    "d**."
                ],
                "hints": [
                    "was very tired",
                    "after a long working day"
                ],
                "acceptable": [
                    "I was very tired after a long working day.",
                    "I was very tired after a long day at work."
                ],
                "grammarNote": "Chủ ngữ 'I' đi với 'was' trong thì quá khứ đơn."
            },
            {
                "id": "buoc1-was-were-s4",
                "vietnamese": "Tuần trước chúng tôi không có ở nhà.",
                "target": "We were not at home last week.",
                "masked": [
                    "W*",
                    "w***",
                    "n**",
                    "a*",
                    "h***",
                    "l***",
                    "w***."
                ],
                "hints": [
                    "were not at home",
                    "last week"
                ],
                "acceptable": [
                    "We were not at home last week.",
                    "We weren't at home last week."
                ],
                "grammarNote": "Thể phủ định của were: 'were not' (rút gọn là 'weren't')."
            },
            {
                "id": "buoc1-was-were-s5",
                "vietnamese": "Hồi còn nhỏ, anh ấy rất nhút nhát và ít nói.",
                "target": "When he was a child, he was very shy and quiet.",
                "masked": [
                    "W***",
                    "h*",
                    "w**",
                    "a",
                    "c****",
                    "h*",
                    "w**",
                    "v***",
                    "s**",
                    "a**",
                    "q****."
                ],
                "hints": [
                    "When he was a child",
                    "he was very shy and quiet"
                ],
                "acceptable": [
                    "When he was a child, he was very shy and quiet.",
                    "He was very shy and quiet when he was a child."
                ],
                "grammarNote": "Mệnh đề chỉ thời gian quá khứ: 'When + S + was/were...'."
            },
            {
                "id": "buoc1-was-were-s6",
                "vietnamese": "Bộ phim tối qua có thú vị không?",
                "target": "Was the movie interesting last night?",
                "masked": [
                    "W**",
                    "t**",
                    "m****",
                    "i**********",
                    "l***",
                    "n****?"
                ],
                "hints": [
                    "Was the movie interesting",
                    "last night"
                ],
                "acceptable": [
                    "Was the movie interesting last night?",
                    "Was the film interesting last night?"
                ],
                "grammarNote": "Câu hỏi Yes/No với To Be quá khứ số ít: Was + S + adj...?"
            },
            {
                "id": "buoc1-was-were-s7",
                "vietnamese": "Đã có rất nhiều người ở buổi hòa nhạc hôm Chủ nhật.",
                "target": "There were a lot of people at the concert on Sunday.",
                "masked": [
                    "T****",
                    "w***",
                    "a",
                    "l**",
                    "o*",
                    "p*****",
                    "a*",
                    "t**",
                    "c******",
                    "o*",
                    "S*****."
                ],
                "hints": [
                    "There were a lot of people",
                    "at the concert on Sunday"
                ],
                "acceptable": [
                    "There were a lot of people at the concert on Sunday.",
                    "There were many people at the concert on Sunday."
                ],
                "grammarNote": "'There were' dùng cho danh từ số nhiều trong quá khứ ('people')."
            },
            {
                "id": "buoc1-was-were-s8",
                "vietnamese": "Cô ấy đã vắng mặt trong cuộc họp sáng nay vì bị ốm.",
                "target": "She was absent from the meeting this morning because she was sick.",
                "masked": [
                    "S**",
                    "w**",
                    "a*****",
                    "f***",
                    "t**",
                    "m******",
                    "t***",
                    "m******",
                    "b******",
                    "s**",
                    "w**",
                    "s***."
                ],
                "hints": [
                    "was absent from the meeting",
                    "because she was sick"
                ],
                "acceptable": [
                    "She was absent from the meeting this morning because she was sick.",
                    "She was absent from the meeting this morning because she was ill."
                ],
                "grammarNote": "Cụm từ 'be absent from': vắng mặt khỏi đâu. Ngôi 'she' dùng 'was'."
            },
            {
                "id": "buoc1-was-were-s9",
                "vietnamese": "Bữa tiệc sinh nhật của bạn thế nào? Nó rất vui.",
                "target": "How was your birthday party? It was great fun.",
                "masked": [
                    "H**",
                    "w**",
                    "y***",
                    "b*******",
                    "p****?",
                    "I*",
                    "w**",
                    "g****",
                    "f**."
                ],
                "hints": [
                    "How was your birthday party",
                    "It was great fun"
                ],
                "acceptable": [
                    "How was your birthday party? It was great fun.",
                    "How was your birthday party? It was very fun."
                ],
                "grammarNote": "Hỏi cảm nghĩ trong quá khứ: 'How was + danh từ số ít?'."
            },
            {
                "id": "buoc1-was-were-s10",
                "vietnamese": "Những chiếc chìa khóa của tôi đã ở trên bàn mười phút trước.",
                "target": "My keys were on the table ten minutes ago.",
                "masked": [
                    "M*",
                    "k***",
                    "w***",
                    "o*",
                    "t**",
                    "t****",
                    "t**",
                    "m******",
                    "a**."
                ],
                "hints": [
                    "My keys were on the table",
                    "ten minutes ago"
                ],
                "acceptable": [
                    "My keys were on the table ten minutes ago."
                ],
                "grammarNote": "Chủ ngữ số nhiều 'My keys' đi với 'were' trong quá khứ."
            },
            {
                "id": "buoc1-was-were-s11",
                "vietnamese": "Đã có một vụ tai nạn giao thông nghiêm trọng gần trường học ngày hôm qua.",
                "target": "There was a serious traffic accident near the school yesterday.",
                "masked": [
                    "T****",
                    "w**",
                    "a",
                    "s******",
                    "t******",
                    "a*******",
                    "n***",
                    "t**",
                    "s*****",
                    "y********."
                ],
                "hints": [
                    "There was a serious traffic accident",
                    "near the school yesterday"
                ],
                "acceptable": [
                    "There was a serious traffic accident near the school yesterday."
                ],
                "grammarNote": "'There was' dùng cho danh từ đếm được số ít trong quá khứ ('a serious traffic accident')."
            },
            {
                "id": "buoc1-was-were-s12",
                "vietnamese": "Họ đã rất ngạc nhiên khi nghe tin tức đó.",
                "target": "They were very surprised to hear the news.",
                "masked": [
                    "T***",
                    "w***",
                    "v***",
                    "s********",
                    "t*",
                    "h***",
                    "t**",
                    "n***."
                ],
                "hints": [
                    "were very surprised",
                    "to hear the news"
                ],
                "acceptable": [
                    "They were very surprised to hear the news."
                ],
                "grammarNote": "Chủ ngữ số nhiều 'They' đi với 'were'. Cấu trúc: were + surprised + to V."
            },
            {
                "id": "buoc1-was-were-s13",
                "vietnamese": "Khách sạn đó không đắt lắm nhưng rất sạch sẽ và thoải mái.",
                "target": "The hotel was not very expensive but it was very clean and comfortable.",
                "masked": [
                    "T**",
                    "h****",
                    "w**",
                    "n**",
                    "v***",
                    "e********",
                    "b**",
                    "i*",
                    "w**",
                    "v***",
                    "c****",
                    "a**",
                    "c**********."
                ],
                "hints": [
                    "was not very expensive",
                    "clean and comfortable"
                ],
                "acceptable": [
                    "The hotel was not very expensive but it was very clean and comfortable.",
                    "The hotel wasn't very expensive but it was very clean and comfortable."
                ],
                "grammarNote": "Miêu tả đặc điểm trong quá khứ: was not / was + tính từ."
            },
            {
                "id": "buoc1-was-were-s14",
                "vietnamese": "Bạn có ở văn phòng lúc 3 giờ chiều hôm qua không?",
                "target": "Were you at the office at 3 PM yesterday?",
                "masked": [
                    "W***",
                    "y**",
                    "a*",
                    "t**",
                    "o*****",
                    "a*",
                    "3",
                    "P*",
                    "y********?"
                ],
                "hints": [
                    "Were you at the office",
                    "at 3 PM yesterday"
                ],
                "acceptable": [
                    "Were you at the office at 3 PM yesterday?",
                    "Were you at the office at 3 pm yesterday?"
                ],
                "grammarNote": "Câu hỏi nghi vấn Yes/No với chủ ngữ 'you': Were you...?"
            },
            {
                "id": "buoc1-was-were-s15",
                "vietnamese": "Những đứa trẻ đã rất đói sau chuyến đi bộ đường dài.",
                "target": "The children were very hungry after the hike.",
                "masked": [
                    "T**",
                    "c*******",
                    "w***",
                    "v***",
                    "h*****",
                    "a****",
                    "t**",
                    "h***."
                ],
                "hints": [
                    "The children were very hungry",
                    "after the hike"
                ],
                "acceptable": [
                    "The children were very hungry after the hike.",
                    "The kids were very hungry after the hike."
                ],
                "grammarNote": "'The children' là danh từ số nhiều bất quy tắc (từ 'child'), đi với 'were'."
            },
            {
                "id": "buoc1-was-were-s16",
                "vietnamese": "Tôi đã từng là một giáo viên tiếng Anh cách đây 5 năm.",
                "target": "I was an English teacher five years ago.",
                "masked": [
                    "I",
                    "w**",
                    "a*",
                    "E******",
                    "t******",
                    "f***",
                    "y****",
                    "a**."
                ],
                "hints": [
                    "was an English teacher",
                    "five years ago"
                ],
                "acceptable": [
                    "I was an English teacher five years ago."
                ],
                "grammarNote": "Diễn tả nghề nghiệp hoặc trạng thái trong quá khứ: I + was + an + N."
            },
            {
                "id": "buoc1-was-were-s17",
                "vietnamese": "Đường phố rất vắng vẻ vì lúc đó là đêm muộn.",
                "target": "The streets were very quiet because it was late at night.",
                "masked": [
                    "T**",
                    "s******",
                    "w***",
                    "v***",
                    "q****",
                    "b******",
                    "i*",
                    "w**",
                    "l***",
                    "a*",
                    "n****."
                ],
                "hints": [
                    "The streets were very quiet",
                    "because it was late at night"
                ],
                "acceptable": [
                    "The streets were very quiet because it was late at night."
                ],
                "grammarNote": "'The streets' (số nhiều) đi với 'were'; 'it' (thời gian) đi với 'was'."
            },
            {
                "id": "buoc1-was-were-s18",
                "vietnamese": "Kỳ thi không quá khó đối với những học sinh chăm chỉ.",
                "target": "The exam was not too difficult for hardworking students.",
                "masked": [
                    "T**",
                    "e***",
                    "w**",
                    "n**",
                    "t**",
                    "d********",
                    "f**",
                    "h**********",
                    "s*******."
                ],
                "hints": [
                    "The exam was not too difficult",
                    "for hardworking students"
                ],
                "acceptable": [
                    "The exam was not too difficult for hardworking students.",
                    "The exam wasn't too difficult for hardworking students."
                ],
                "grammarNote": "Phủ định quá khứ số ít: 'was not' (hoặc 'wasn't')."
            },
            {
                "id": "buoc1-was-were-s19",
                "vietnamese": "Đã có ai ở đó để giúp đỡ bạn không?",
                "target": "Was there anyone there to help you?",
                "masked": [
                    "W**",
                    "t****",
                    "a*****",
                    "t****",
                    "t*",
                    "h***",
                    "y**?"
                ],
                "hints": [
                    "Was there anyone there",
                    "to help you"
                ],
                "acceptable": [
                    "Was there anyone there to help you?"
                ],
                "grammarNote": "Đại từ bất định 'anyone' luôn chia số ít, dùng 'Was there anyone...?'."
            },
            {
                "id": "buoc1-was-were-s20",
                "vietnamese": "Bố mẹ tôi đã rất tự hào khi tôi tốt nghiệp đại học.",
                "target": "My parents were very proud when I graduated from university.",
                "masked": [
                    "M*",
                    "p******",
                    "w***",
                    "v***",
                    "p****",
                    "w***",
                    "I",
                    "g********",
                    "f***",
                    "u*********."
                ],
                "hints": [
                    "were very proud",
                    "when I graduated from university"
                ],
                "acceptable": [
                    "My parents were very proud when I graduated from university."
                ],
                "grammarNote": "'My parents' là danh từ số nhiều đi với 'were'. Cấu trúc: were proud."
            }
        ]
    },
    {
      "id": "buoc1-present-continuous",
      "aliasIds": [
        "write-pres-cont"
      ],
      "title": "Hiện tại tiếp diễn (Present Continuous)",
      "step": "Bước 1",
      "level": "A2",
      "desc": "Luyện dịch 25 câu diễn tả hành động đang diễn ra và xu hướng đang thay đổi trong xã hội.",
      "sentences": [
        {
          "id": "buoc1-present-continuous-s1",
          "vietnamese": "Ngày càng nhiều người trẻ đang có xu hướng làm việc từ xa.",
          "target": "More and more young people are choosing to work remotely.",
          "masked": [
            "M***",
            "a**",
            "m***",
            "y****",
            "p*****",
            "a**",
            "c*******",
            "t*",
            "w***",
            "r*******."
          ],
          "hints": [
            "More and more young people",
            "are choosing to work remotely"
          ],
          "acceptable": [
            "More and more young people are choosing to work remotely."
          ],
          "grammarNote": "So sánh kép \"More and more + N\" kết hợp thì HTTD \"are choosing\"."
        },
        {
          "id": "buoc1-present-continuous-s2",
          "vietnamese": "Giá nhà đất tại các thành phố lớn đang tăng lên nhanh chóng.",
          "target": "Housing prices in major cities are rising rapidly.",
          "masked": [
            "H******",
            "p*****",
            "i*",
            "m****",
            "c*****",
            "a**",
            "r*****",
            "r******."
          ],
          "hints": [
            "Housing prices in major cities",
            "are rising rapidly"
          ],
          "acceptable": [
            "Housing prices in major cities are rising rapidly."
          ],
          "grammarNote": "Nội động từ \"rise\" chia ở thì HTTD \"are rising\"."
        },
        {
          "id": "buoc1-present-continuous-s3",
          "vietnamese": "Chính phủ đang thực hiện các chính sách mới để bảo vệ môi trường.",
          "target": "The government is implementing new policies to protect the environment.",
          "masked": [
            "T**",
            "g*********",
            "i*",
            "i***********",
            "n**",
            "p*******",
            "t*",
            "p******",
            "t**",
            "e**********."
          ],
          "hints": [
            "The government is implementing",
            "new policies to protect the environment"
          ],
          "acceptable": [
            "The government is implementing new policies to protect the environment."
          ],
          "grammarNote": "\"implement new policies\" (thực thi chính sách mới)."
        },
        {
          "id": "buoc1-present-continuous-s4",
          "vietnamese": "Tôi đang chuẩn bị hồ sơ du học cho học kỳ tới.",
          "target": "I am preparing study abroad documents for the next semester.",
          "masked": [
            "I",
            "a*",
            "p********",
            "s****",
            "a*****",
            "d********",
            "f**",
            "t**",
            "n***",
            "s*******."
          ],
          "hints": [
            "am preparing",
            "study abroad documents"
          ],
          "acceptable": [
            "I am preparing study abroad documents for the next semester."
          ],
          "grammarNote": "HTTD với kế hoạch tương lai gần đã chuẩn bị: \"am preparing\"."
        },
        {
          "id": "buoc1-present-continuous-s5",
          "vietnamese": "Thời tiết đang trở nên ấm áp hơn khi mùa xuân đến.",
          "target": "The weather is becoming warmer as spring arrives.",
          "masked": [
            "T**",
            "w******",
            "i*",
            "b*******",
            "w*****",
            "a*",
            "s*****",
            "a******."
          ],
          "hints": [
            "is becoming warmer",
            "as spring arrives"
          ],
          "acceptable": [
            "The weather is becoming warmer as spring arrives."
          ],
          "grammarNote": "Diễn tả sự thay đổi: \"is becoming / getting + comparative adj\"."
        },
        {
          "id": "buoc1-present-continuous-s6",
          "vietnamese": "Họ đang xây dựng một cây cầu mới bắc qua sông Hồng.",
          "target": "They are building a new bridge across the Red River.",
          "masked": [
            "T***",
            "a**",
            "b*******",
            "a",
            "n**",
            "b*****",
            "a*****",
            "t**",
            "R**",
            "R****."
          ],
          "hints": [
            "are building a new bridge",
            "across the Red River"
          ],
          "acceptable": [
            "They are building a new bridge across the Red River."
          ],
          "grammarNote": "Hành động đang tiến hành: \"are building\"."
        },
        {
          "id": "buoc1-present-continuous-s7",
          "vietnamese": "Các công ty công nghệ đang đầu tư hàng triệu đô la vào trí tuệ nhân tạo.",
          "target": "Tech companies are investing millions of dollars in artificial intelligence.",
          "masked": [
            "T***",
            "c********",
            "a**",
            "i********",
            "m*******",
            "o*",
            "d******",
            "i*",
            "a*********",
            "i***********."
          ],
          "hints": [
            "are investing millions of dollars in",
            "artificial intelligence"
          ],
          "acceptable": [
            "Tech companies are investing millions of dollars in artificial intelligence."
          ],
          "grammarNote": "Cấu trúc: invest in something. Thuật ngữ: \"artificial intelligence\"."
        },
        {
          "id": "buoc1-present-continuous-s8",
          "vietnamese": "Chúng tôi đang tìm kiếm giải pháp hiệu quả cho vấn đề rác thải nhựa.",
          "target": "We are looking for effective solutions to the plastic waste problem.",
          "masked": [
            "W*",
            "a**",
            "l******",
            "f**",
            "e********",
            "s********",
            "t*",
            "t**",
            "p******",
            "w****",
            "p******."
          ],
          "hints": [
            "are looking for effective solutions to",
            "plastic waste"
          ],
          "acceptable": [
            "We are looking for effective solutions to the plastic waste problem."
          ],
          "grammarNote": "Collocation: \"solution to a problem\"."
        },
        {
          "id": "buoc1-present-continuous-s9",
          "vietnamese": "Cô ấy đang tham gia một khoá học trực tuyến về quản lý tài chính.",
          "target": "She is taking an online course on financial management.",
          "masked": [
            "S**",
            "i*",
            "t*****",
            "a*",
            "o*****",
            "c*****",
            "o*",
            "f********",
            "m*********."
          ],
          "hints": [
            "is taking an online course on",
            "financial management"
          ],
          "acceptable": [
            "She is taking an online course on financial management."
          ],
          "grammarNote": "Cụm từ: \"take / attend a course\"."
        },
        {
          "id": "buoc1-present-continuous-s10",
          "vietnamese": "Nền kinh tế thế giới đang phục hồi sau đại dịch.",
          "target": "The global economy is recovering after the pandemic.",
          "masked": [
            "T**",
            "g*****",
            "e******",
            "i*",
            "r*********",
            "a****",
            "t**",
            "p*******."
          ],
          "hints": [
            "The global economy is recovering",
            "after the pandemic"
          ],
          "acceptable": [
            "The global economy is recovering after the pandemic."
          ],
          "grammarNote": "Nội động từ \"recover\" ở thì HTTD: \"is recovering\"."
        },
        {
          "id": "buoc1-present-continuous-s11",
          "vietnamese": "Học sinh đang ôn thi chăm chỉ cho kỳ thi tuyển sinh đại học.",
          "target": "Students are studying hard for the university entrance exam.",
          "masked": [
            "S*******",
            "a**",
            "s*******",
            "h***",
            "f**",
            "t**",
            "u*********",
            "e*******",
            "e***."
          ],
          "hints": [
            "are studying hard for",
            "university entrance exam"
          ],
          "acceptable": [
            "Students are studying hard for the university entrance exam."
          ],
          "grammarNote": "Cụm danh từ: \"university entrance exam\"."
        },
        {
          "id": "buoc1-present-continuous-s12",
          "vietnamese": "Băng ở hai cực đang tan chảy với tốc độ đáng báo động.",
          "target": "Polar ice is melting at an alarming rate.",
          "masked": [
            "P****",
            "i**",
            "i*",
            "m******",
            "a*",
            "a*",
            "a*******",
            "r***."
          ],
          "hints": [
            "Polar ice is melting",
            "at an alarming rate"
          ],
          "acceptable": [
            "Polar ice is melting at an alarming rate."
          ],
          "grammarNote": "Cụm thành ngữ học thuật IELTS: \"at an alarming rate\"."
        },
        {
          "id": "buoc1-present-continuous-s13",
          "vietnamese": "Số lượng ô tô điện trên đường phố đang tăng trưởng đều đặn.",
          "target": "The number of electric cars on the streets is growing steadily.",
          "masked": [
            "T**",
            "n*****",
            "o*",
            "e*******",
            "c***",
            "o*",
            "t**",
            "s******",
            "i*",
            "g******",
            "s*******."
          ],
          "hints": [
            "The number of electric cars",
            "is growing steadily"
          ],
          "acceptable": [
            "The number of electric cars on the streets is growing steadily."
          ],
          "grammarNote": "\"The number of + N số nhiều\" đi với động từ số ít (\"is growing\")."
        },
        {
          "id": "buoc1-present-continuous-s14",
          "vietnamese": "Tôi đang cố gắng cải thiện kỹ năng nói tiếng Anh của mình mỗi ngày.",
          "target": "I am trying to improve my English speaking skills every day.",
          "masked": [
            "I",
            "a*",
            "t*****",
            "t*",
            "i******",
            "m*",
            "E******",
            "s*******",
            "s*****",
            "e****",
            "d**."
          ],
          "hints": [
            "am trying to improve",
            "English speaking skills"
          ],
          "acceptable": [
            "I am trying to improve my English speaking skills every day."
          ],
          "grammarNote": "Cấu trúc: try to do something."
        },
        {
          "id": "buoc1-present-continuous-s15",
          "vietnamese": "Nhiều gia đình đang chuyển từ nông thôn lên thành phố để tìm việc làm.",
          "target": "Many families are moving from rural areas to cities to find jobs.",
          "masked": [
            "M***",
            "f*******",
            "a**",
            "m*****",
            "f***",
            "r****",
            "a****",
            "t*",
            "c*****",
            "t*",
            "f***",
            "j***."
          ],
          "hints": [
            "are moving from rural areas to cities",
            "to find jobs"
          ],
          "acceptable": [
            "Many families are moving from rural areas to cities to find jobs."
          ],
          "grammarNote": "Collocation: \"rural areas\" (nông thôn), \"urban centers\" (đô thị)."
        },
        {
          "id": "buoc1-present-continuous-s16",
          "vietnamese": "Anh ấy đang thiết kế lại trang web cho doanh nghiệp gia đình.",
          "target": "He is redesigning the website for his family business.",
          "masked": [
            "H*",
            "i*",
            "r**********",
            "t**",
            "w******",
            "f**",
            "h**",
            "f*****",
            "b*******."
          ],
          "hints": [
            "is redesigning the website for",
            "family business"
          ],
          "acceptable": [
            "He is redesigning the website for his family business."
          ],
          "grammarNote": "Động từ \"redesign\" ở thì HTTD: \"is redesigning\"."
        },
        {
          "id": "buoc1-present-continuous-s17",
          "vietnamese": "Các chuyên gia y tế đang nghiên cứu một loại vắc-xin thế hệ mới.",
          "target": "Medical experts are researching a new generation vaccine.",
          "masked": [
            "M******",
            "e******",
            "a**",
            "r**********",
            "a",
            "n**",
            "g*********",
            "v******."
          ],
          "hints": [
            "Medical experts are researching",
            "a new generation vaccine"
          ],
          "acceptable": [
            "Medical experts are researching a new generation vaccine."
          ],
          "grammarNote": "Cụm danh từ: \"next-generation vaccine\"."
        },
        {
          "id": "buoc1-present-continuous-s18",
          "vietnamese": "Người tiêu dùng đang chú ý nhiều hơn đến nguồn gốc thực phẩm.",
          "target": "Consumers are paying more attention to the origin of food.",
          "masked": [
            "C********",
            "a**",
            "p*****",
            "m***",
            "a********",
            "t*",
            "t**",
            "o*****",
            "o*",
            "f***."
          ],
          "hints": [
            "are paying more attention to",
            "the origin of food"
          ],
          "acceptable": [
            "Consumers are paying more attention to the origin of food."
          ],
          "grammarNote": "Collocation: \"pay attention to something\"."
        },
        {
          "id": "buoc1-present-continuous-s19",
          "vietnamese": "Tôi đang đọc một cuốn tiểu thuyết rất thú vị về lịch sử La Mã.",
          "target": "I am reading a very interesting novel about Roman history.",
          "masked": [
            "I",
            "a*",
            "r******",
            "a",
            "v***",
            "i**********",
            "n****",
            "a****",
            "R****",
            "h******."
          ],
          "hints": [
            "am reading a very interesting novel about",
            "Roman history"
          ],
          "acceptable": [
            "I am reading a very interesting novel about Roman history."
          ],
          "grammarNote": "Hành động diễn ra xung quanh thời điểm nói: \"am reading\"."
        },
        {
          "id": "buoc1-present-continuous-s20",
          "vietnamese": "Các trường đại học đang áp dụng công nghệ số vào giảng dạy.",
          "target": "Universities are applying digital technology to teaching.",
          "masked": [
            "U***********",
            "a**",
            "a*******",
            "d******",
            "t*********",
            "t*",
            "t*******."
          ],
          "hints": [
            "are applying digital technology to",
            "teaching"
          ],
          "acceptable": [
            "Universities are applying digital technology to teaching."
          ],
          "grammarNote": "Cấu trúc: apply something to something."
        },
        {
          "id": "buoc1-present-continuous-s21",
          "vietnamese": "Du khách đang đổ về các bãi biển miền Trung trong kỳ nghỉ lễ.",
          "target": "Tourists are flocking to central beaches during the holiday.",
          "masked": [
            "T*******",
            "a**",
            "f*******",
            "t*",
            "c******",
            "b******",
            "d*****",
            "t**",
            "h******."
          ],
          "hints": [
            "Tourists are flocking to",
            "central beaches during the holiday"
          ],
          "acceptable": [
            "Tourists are flocking to central beaches during the holiday."
          ],
          "grammarNote": "Động từ: \"flock to\" (đổ xô về, tụ tập về)."
        },
        {
          "id": "buoc1-present-continuous-s22",
          "vietnamese": "Anh ấy đang học thêm tiếng Tây Ban Nha vào các buổi tối.",
          "target": "He is learning Spanish in the evenings.",
          "masked": [
            "H*",
            "i*",
            "l*******",
            "S******",
            "i*",
            "t**",
            "e*******."
          ],
          "hints": [
            "is learning Spanish",
            "in the evenings"
          ],
          "acceptable": [
            "He is learning Spanish in the evenings."
          ],
          "grammarNote": "Kế hoạch học tập ngắn hạn/tạm thời: \"is learning\"."
        },
        {
          "id": "buoc1-present-continuous-s23",
          "vietnamese": "Các nhà máy đang nỗ lực cắt giảm lượng khí thải độc hại.",
          "target": "Factories are striving to cut down on toxic emissions.",
          "masked": [
            "F********",
            "a**",
            "s*******",
            "t*",
            "c**",
            "d***",
            "o*",
            "t****",
            "e********."
          ],
          "hints": [
            "are striving to cut down on",
            "toxic emissions"
          ],
          "acceptable": [
            "Factories are striving to cut down on toxic emissions."
          ],
          "grammarNote": "Collocation: \"toxic emissions\" (khí thải độc hại)."
        },
        {
          "id": "buoc1-present-continuous-s24",
          "vietnamese": "Dân số người cao tuổi đang tăng lên ở nhiều quốc gia phát triển.",
          "target": "The elderly population is increasing in many developed nations.",
          "masked": [
            "T**",
            "e******",
            "p*********",
            "i*",
            "i*********",
            "i*",
            "m***",
            "d********",
            "n******."
          ],
          "hints": [
            "The elderly population is increasing in",
            "developed nations"
          ],
          "acceptable": [
            "The elderly population is increasing in many developed nations."
          ],
          "grammarNote": "Cụm danh từ: \"the elderly population\", \"developed nations\"."
        },
        {
          "id": "buoc1-present-continuous-s25",
          "vietnamese": "Chúng tôi đang làm việc chặt chẽ với các đối tác nước ngoài.",
          "target": "We are working closely with foreign partners.",
          "masked": [
            "W*",
            "a**",
            "w******",
            "c******",
            "w***",
            "f******",
            "p*******."
          ],
          "hints": [
            "are working closely with",
            "foreign partners"
          ],
          "acceptable": [
            "We are working closely with foreign partners."
          ],
          "grammarNote": "Collocation: \"work closely with somebody\"."
        }
      ]
    },
    {
      "id": "buoc1-present-perfect",
      "aliasIds": [
        "write-pres-perf"
      ],
      "title": "Hiện tại hoàn thành (Present Perfect)",
      "step": "Bước 1",
      "level": "B1",
      "desc": "Luyện dịch 25 câu diễn tả trải nghiệm, kết quả còn lưu lại hoặc hành động kéo dài từ quá khứ đến hiện tại.",
      "sentences": [
        {
          "id": "buoc1-present-perfect-s1",
          "vietnamese": "Công nghệ đã thay đổi hoàn toàn cách chúng ta giao tiếp và làm việc.",
          "target": "Technology has completely changed the way we communicate and work.",
          "masked": [
            "T*********",
            "h**",
            "c*********",
            "c******",
            "t**",
            "w**",
            "w*",
            "c**********",
            "a**",
            "w***."
          ],
          "hints": [
            "Technology has completely changed",
            "the way we communicate and work"
          ],
          "acceptable": [
            "Technology has completely changed the way we communicate and work."
          ],
          "grammarNote": "\"has + V3/ed\" (has changed) với trạng từ \"completely\"."
        },
        {
          "id": "buoc1-present-perfect-s2",
          "vietnamese": "Chúng tôi đã hợp tác với công ty đó trong hơn năm năm qua.",
          "target": "We have cooperated with that company for over five years.",
          "masked": [
            "W*",
            "h***",
            "c*********",
            "w***",
            "t***",
            "c******",
            "f**",
            "o***",
            "f***",
            "y****."
          ],
          "hints": [
            "have cooperated with that company",
            "for over five years"
          ],
          "acceptable": [
            "We have cooperated with that company for over five years."
          ],
          "grammarNote": "Giới từ \"for\" đi với khoảng thời gian trong thì HTHT."
        },
        {
          "id": "buoc1-present-perfect-s3",
          "vietnamese": "Tôi chưa từng trải nghiệm điều gì thú vị như thế này trước đây.",
          "target": "I have never experienced anything so exciting before.",
          "masked": [
            "I",
            "h***",
            "n****",
            "e**********",
            "a*******",
            "s*",
            "e*******",
            "b*****."
          ],
          "hints": [
            "have never experienced",
            "anything so exciting before"
          ],
          "acceptable": [
            "I have never experienced anything so exciting before."
          ],
          "grammarNote": "\"have never + V3/ed\" diễn tả trải nghiệm từ trước đến nay."
        },
        {
          "id": "buoc1-present-perfect-s4",
          "vietnamese": "Chính phủ đã đầu tư rất nhiều tiền vào hệ thống y tế công cộng.",
          "target": "The government has invested a lot of money in the public health system.",
          "masked": [
            "T**",
            "g*********",
            "h**",
            "i*******",
            "a",
            "l**",
            "o*",
            "m****",
            "i*",
            "t**",
            "p*****",
            "h*****",
            "s*****."
          ],
          "hints": [
            "has invested a lot of money in",
            "public health system"
          ],
          "acceptable": [
            "The government has invested a lot of money in the public health system."
          ],
          "grammarNote": "Cấu trúc: invest money in something."
        },
        {
          "id": "buoc1-present-perfect-s5",
          "vietnamese": "Bạn đã từng đến thăm bảo tàng lịch sử quốc gia chưa?",
          "target": "Have you ever visited the national history museum?",
          "masked": [
            "H***",
            "y**",
            "e***",
            "v******",
            "t**",
            "n*******",
            "h******",
            "m*****?"
          ],
          "hints": [
            "Have you ever visited",
            "the national history museum"
          ],
          "acceptable": [
            "Have you ever visited the national history museum?"
          ],
          "grammarNote": "Câu hỏi trải nghiệm: \"Have you ever + V3/ed...?\""
        },
        {
          "id": "buoc1-present-perfect-s6",
          "vietnamese": "Anh ấy đã sống ở Luân Đôn kể từ năm 2018.",
          "target": "He has lived in London since 2018.",
          "masked": [
            "H*",
            "h**",
            "l****",
            "i*",
            "L*****",
            "s****",
            "2***."
          ],
          "hints": [
            "has lived in London",
            "since 2018"
          ],
          "acceptable": [
            "He has lived in London since 2018."
          ],
          "grammarNote": "Giới từ \"since\" đi với mốc thời gian xác định."
        },
        {
          "id": "buoc1-present-perfect-s7",
          "vietnamese": "Nhiều loài động vật hoang dã đã tuyệt chủng do mất môi trường sống.",
          "target": "Many wild animals have become extinct due to habitat loss.",
          "masked": [
            "M***",
            "w***",
            "a******",
            "h***",
            "b*****",
            "e******",
            "d**",
            "t*",
            "h******",
            "l***."
          ],
          "hints": [
            "have become extinct",
            "due to habitat loss"
          ],
          "acceptable": [
            "Many wild animals have become extinct due to habitat loss."
          ],
          "grammarNote": "Collocation: \"become extinct\", \"habitat loss\"."
        },
        {
          "id": "buoc1-present-perfect-s8",
          "vietnamese": "Tôi vừa hoàn thành bản báo cáo quý cho cuộc họp sáng nay.",
          "target": "I have just finished the quarterly report for this morning's meeting.",
          "masked": [
            "I",
            "h***",
            "j***",
            "f*******",
            "t**",
            "q********",
            "r*****",
            "f**",
            "t***",
            "m********",
            "m******."
          ],
          "hints": [
            "have just finished",
            "quarterly report"
          ],
          "acceptable": [
            "I have just finished the quarterly report for this morning's meeting."
          ],
          "grammarNote": "Trạng từ \"just\" diễn tả hành động vừa mới xảy ra."
        },
        {
          "id": "buoc1-present-perfect-s9",
          "vietnamese": "Họ đã phát hiện ra nhiều chứng cứ quan trọng liên quan đến vụ án.",
          "target": "They have discovered several crucial pieces of evidence related to the case.",
          "masked": [
            "T***",
            "h***",
            "d*********",
            "s******",
            "c******",
            "p*****",
            "o*",
            "e*******",
            "r******",
            "t*",
            "t**",
            "c***."
          ],
          "hints": [
            "have discovered",
            "crucial pieces of evidence"
          ],
          "acceptable": [
            "They have discovered several crucial pieces of evidence related to the case."
          ],
          "grammarNote": "\"evidence\" là danh từ không đếm được -> dùng \"pieces of evidence\"."
        },
        {
          "id": "buoc1-present-perfect-s10",
          "vietnamese": "Dự án này đã đạt được những kết quả rất khả quan.",
          "target": "This project has achieved very encouraging results.",
          "masked": [
            "T***",
            "p******",
            "h**",
            "a*******",
            "v***",
            "e**********",
            "r******."
          ],
          "hints": [
            "has achieved",
            "encouraging results"
          ],
          "acceptable": [
            "This project has achieved very encouraging results."
          ],
          "grammarNote": "Collocation: \"achieve encouraging results\"."
        },
        {
          "id": "buoc1-present-perfect-s11",
          "vietnamese": "Chúng tôi vẫn chưa nhận được câu trả lời chính thức từ trường đại học.",
          "target": "We have not yet received an official reply from the university.",
          "masked": [
            "W*",
            "h***",
            "n**",
            "y**",
            "r*******",
            "a*",
            "o*******",
            "r****",
            "f***",
            "t**",
            "u*********."
          ],
          "hints": [
            "have not yet received",
            "official reply"
          ],
          "acceptable": [
            "We have not yet received an official reply from the university."
          ],
          "grammarNote": "Vị trí của \"yet\": \"have not yet + V3/ed\"."
        },
        {
          "id": "buoc1-present-perfect-s12",
          "vietnamese": "Biến đổi khí hậu đã gây ra nhiều hiện tượng thời tiết cực đoan.",
          "target": "Climate change has caused numerous extreme weather events.",
          "masked": [
            "C******",
            "c*****",
            "h**",
            "c*****",
            "n*******",
            "e******",
            "w******",
            "e*****."
          ],
          "hints": [
            "has caused",
            "extreme weather events"
          ],
          "acceptable": [
            "Climate change has caused numerous extreme weather events."
          ],
          "grammarNote": "Collocation IELTS: \"extreme weather events\"."
        },
        {
          "id": "buoc1-present-perfect-s13",
          "vietnamese": "Cô ấy đã giành được học bổng toàn phần cho chương trình thạc sĩ.",
          "target": "She has won a full scholarship for the master's program.",
          "masked": [
            "S**",
            "h**",
            "w**",
            "a",
            "f***",
            "s**********",
            "f**",
            "t**",
            "m*******",
            "p******."
          ],
          "hints": [
            "has won a full scholarship for",
            "master's program"
          ],
          "acceptable": [
            "She has won a full scholarship for the master's program."
          ],
          "grammarNote": "Cụm từ: \"win a full scholarship\"."
        },
        {
          "id": "buoc1-present-perfect-s14",
          "vietnamese": "Nhiều thành phố lớn đã xây dựng các làn đường dành riêng cho xe đạp.",
          "target": "Many major cities have built dedicated lanes for bicycles.",
          "masked": [
            "M***",
            "m****",
            "c*****",
            "h***",
            "b****",
            "d********",
            "l****",
            "f**",
            "b*******."
          ],
          "hints": [
            "have built dedicated lanes for",
            "bicycles"
          ],
          "acceptable": [
            "Many major cities have built dedicated lanes for bicycles."
          ],
          "grammarNote": "Từ vựng: \"dedicated lanes\" (làn đường dành riêng)."
        },
        {
          "id": "buoc1-present-perfect-s15",
          "vietnamese": "Khoa học y tế đã kéo dài tuổi thọ trung bình của con người.",
          "target": "Medical science has extended human life expectancy.",
          "masked": [
            "M******",
            "s******",
            "h**",
            "e*******",
            "h****",
            "l***",
            "e*********."
          ],
          "hints": [
            "has extended",
            "human life expectancy"
          ],
          "acceptable": [
            "Medical science has extended human life expectancy."
          ],
          "grammarNote": "Thuật ngữ IELTS: \"life expectancy\" (tuổi thọ trung bình)."
        },
        {
          "id": "buoc1-present-perfect-s16",
          "vietnamese": "Tôi đã làm mất chìa khoá và bây giờ không thể vào nhà.",
          "target": "I have lost my keys and cannot get into the house now.",
          "masked": [
            "I",
            "h***",
            "l***",
            "m*",
            "k***",
            "a**",
            "c*****",
            "g**",
            "i***",
            "t**",
            "h****",
            "n**."
          ],
          "hints": [
            "have lost my keys",
            "cannot get into the house now"
          ],
          "acceptable": [
            "I have lost my keys and cannot get into the house now."
          ],
          "grammarNote": "Hành động quá khứ để lại kết quả trực tiếp ở hiện tại."
        },
        {
          "id": "buoc1-present-perfect-s17",
          "vietnamese": "Công ty đã mở rộng mạng lưới phân phối sang các nước lân cận.",
          "target": "The company has expanded its distribution network to neighboring countries.",
          "masked": [
            "T**",
            "c******",
            "h**",
            "e*******",
            "i**",
            "d***********",
            "n******",
            "t*",
            "n**********",
            "c********."
          ],
          "hints": [
            "has expanded its distribution network to",
            "neighboring countries"
          ],
          "acceptable": [
            "The company has expanded its distribution network to neighboring countries."
          ],
          "grammarNote": "Collocation: \"distribution network\" (mạng lưới phân phối)."
        },
        {
          "id": "buoc1-present-perfect-s18",
          "vietnamese": "Bạn đã đọc xong cuốn sách mà tôi cho mượn tuần trước chưa?",
          "target": "Have you finished reading the book I lent you last week?",
          "masked": [
            "H***",
            "y**",
            "f*******",
            "r******",
            "t**",
            "b***",
            "I",
            "l***",
            "y**",
            "l***",
            "w***?"
          ],
          "hints": [
            "Have you finished reading",
            "the book I lent you last week"
          ],
          "acceptable": [
            "Have you finished reading the book I lent you last week?"
          ],
          "grammarNote": "Mệnh đề quan hệ rút gọn đại từ: \"the book I lent you\"."
        },
        {
          "id": "buoc1-present-perfect-s19",
          "vietnamese": "Giá dầu thô đã sụt giảm mạnh trong những tháng gần đây.",
          "target": "Crude oil prices have dropped sharply in recent months.",
          "masked": [
            "C****",
            "o**",
            "p*****",
            "h***",
            "d******",
            "s******",
            "i*",
            "r*****",
            "m*****."
          ],
          "hints": [
            "Crude oil prices have dropped sharply",
            "in recent months"
          ],
          "acceptable": [
            "Crude oil prices have dropped sharply in recent months."
          ],
          "grammarNote": "Cụm từ đi với HTHT: \"in recent months\"."
        },
        {
          "id": "buoc1-present-perfect-s20",
          "vietnamese": "Nhiều người tiêu dùng đã chuyển sang mua sắm trực tuyến.",
          "target": "Many consumers have switched to online shopping.",
          "masked": [
            "M***",
            "c********",
            "h***",
            "s*******",
            "t*",
            "o*****",
            "s*******."
          ],
          "hints": [
            "have switched to",
            "online shopping"
          ],
          "acceptable": [
            "Many consumers have switched to online shopping."
          ],
          "grammarNote": "Cấu trúc: switch to something."
        },
        {
          "id": "buoc1-present-perfect-s21",
          "vietnamese": "Chính quyền địa phương đã nâng cấp cơ sở hạ tầng giao thông.",
          "target": "The local authority has upgraded the transport infrastructure.",
          "masked": [
            "T**",
            "l****",
            "a********",
            "h**",
            "u*******",
            "t**",
            "t********",
            "i*************."
          ],
          "hints": [
            "has upgraded",
            "transport infrastructure"
          ],
          "acceptable": [
            "The local authority has upgraded the transport infrastructure."
          ],
          "grammarNote": "Collocation: \"transport infrastructure\"."
        },
        {
          "id": "buoc1-present-perfect-s22",
          "vietnamese": "Họ đã kết hôn được 10 năm và sống rất hạnh phúc.",
          "target": "They have been married for 10 years and live very happily.",
          "masked": [
            "T***",
            "h***",
            "b***",
            "m******",
            "f**",
            "1*",
            "y****",
            "a**",
            "l***",
            "v***",
            "h******."
          ],
          "hints": [
            "have been married for 10 years",
            "live very happily"
          ],
          "acceptable": [
            "They have been married for 10 years and live very happily."
          ],
          "grammarNote": "Tính từ trạng thái: \"have been married for + time\"."
        },
        {
          "id": "buoc1-present-perfect-s23",
          "vietnamese": "Tôi đã gửi email cho khách hàng nhưng chưa nhận được phản hồi.",
          "target": "I have sent an email to the client but have not received a response yet.",
          "masked": [
            "I",
            "h***",
            "s***",
            "a*",
            "e****",
            "t*",
            "t**",
            "c*****",
            "b**",
            "h***",
            "n**",
            "r*******",
            "a",
            "r*******",
            "y**."
          ],
          "hints": [
            "have sent an email",
            "have not received a response yet"
          ],
          "acceptable": [
            "I have sent an email to the client but have not received a response yet."
          ],
          "grammarNote": "Liên từ kết hợp: \"have sent... but have not received... yet\"."
        },
        {
          "id": "buoc1-present-perfect-s24",
          "vietnamese": "Sự phát triển của internet đã thu hẹp khoảng cách địa lý giữa các quốc gia.",
          "target": "The development of the internet has narrowed geographical distances between nations.",
          "masked": [
            "T**",
            "d**********",
            "o*",
            "t**",
            "i*******",
            "h**",
            "n*******",
            "g***********",
            "d********",
            "b******",
            "n******."
          ],
          "hints": [
            "has narrowed geographical distances",
            "between nations"
          ],
          "acceptable": [
            "The development of the internet has narrowed geographical distances between nations."
          ],
          "grammarNote": "Động từ: \"narrow / bridge the gap\" (thu hẹp khoảng cách)."
        },
        {
          "id": "buoc1-present-perfect-s25",
          "vietnamese": "Hàng ngàn sinh viên đã tốt nghiệp từ trường đại học này.",
          "target": "Thousands of students have graduated from this university.",
          "masked": [
            "T********",
            "o*",
            "s*******",
            "h***",
            "g********",
            "f***",
            "t***",
            "u*********."
          ],
          "hints": [
            "Thousands of students have graduated from",
            "this university"
          ],
          "acceptable": [
            "Thousands of students have graduated from this university."
          ],
          "grammarNote": "Cấu trúc: graduate from somewhere."
        }
      ]
    },
    {
      "id": "buoc1-present-perfect-continuous",
      "aliasIds": [],
      "title": "Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)",
      "step": "Bước 1",
      "level": "B1 - B2",
      "desc": "Luyện dịch 25 câu nhấn mạnh tính liên tục và thời lượng của hành động bắt đầu từ quá khứ đến hiện tại.",
      "sentences": [
        {
          "id": "buoc1-present-perfect-continuous-s1",
          "vietnamese": "Tôi đã học tiếng Anh liên tục suốt bốn tiếng đồng hồ nay rồi.",
          "target": "I have been studying English continuously for four hours now.",
          "masked": [
            "I",
            "h***",
            "b***",
            "s*******",
            "E******",
            "c***********",
            "f**",
            "f***",
            "h****",
            "n**."
          ],
          "hints": [
            "have been studying English",
            "continuously for four hours now"
          ],
          "acceptable": [
            "I have been studying English continuously for four hours now."
          ],
          "grammarNote": "\"have been + V-ing\" nhấn mạnh tính liên tục của hành động."
        },
        {
          "id": "buoc1-present-perfect-continuous-s2",
          "vietnamese": "Trời đã mưa rả rích từ sáng sớm đến tận bây giờ.",
          "target": "It has been raining continuously since early morning until now.",
          "masked": [
            "I*",
            "h**",
            "b***",
            "r******",
            "c***********",
            "s****",
            "e****",
            "m******",
            "u****",
            "n**."
          ],
          "hints": [
            "has been raining",
            "since early morning until now"
          ],
          "acceptable": [
            "It has been raining continuously since early morning until now."
          ],
          "grammarNote": "Chủ ngữ giả \"It\" -> \"has been raining since...\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s3",
          "vietnamese": "Các nhà nghiên cứu đã và đang theo dõi sự di cư của loài chim này trong nhiều tháng.",
          "target": "Researchers have been tracking the migration of this bird species for months.",
          "masked": [
            "R**********",
            "h***",
            "b***",
            "t*******",
            "t**",
            "m********",
            "o*",
            "t***",
            "b***",
            "s******",
            "f**",
            "m*****."
          ],
          "hints": [
            "have been tracking the migration of",
            "this bird species for months"
          ],
          "acceptable": [
            "Researchers have been tracking the migration of this bird species for months."
          ],
          "grammarNote": "Collocation: \"track migration\" (theo dõi sự di cư)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s4",
          "vietnamese": "Cô ấy đã và đang làm việc cho tổ chức từ thiện này kể từ khi tốt nghiệp.",
          "target": "She has been working for this charity organization since graduation.",
          "masked": [
            "S**",
            "h**",
            "b***",
            "w******",
            "f**",
            "t***",
            "c******",
            "o***********",
            "s****",
            "g*********."
          ],
          "hints": [
            "has been working for this charity",
            "since graduation"
          ],
          "acceptable": [
            "She has been working for this charity organization since graduation."
          ],
          "grammarNote": "\"since graduation\" = \"since she graduated\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s5",
          "vietnamese": "Chúng tôi đã thảo luận về vấn đề này suốt cả buổi sáng mà chưa có kết quả.",
          "target": "We have been discussing this issue all morning without any conclusion.",
          "masked": [
            "W*",
            "h***",
            "b***",
            "d*********",
            "t***",
            "i****",
            "a**",
            "m******",
            "w******",
            "a**",
            "c*********."
          ],
          "hints": [
            "have been discussing this issue all morning",
            "without any conclusion"
          ],
          "acceptable": [
            "We have been discussing this issue all morning without any conclusion."
          ],
          "grammarNote": "Động từ \"discuss\" không đi với giới từ \"about\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s6",
          "vietnamese": "Anh ấy đã tập luyện chăm chỉ tại phòng gym để chuẩn bị cho giải đấu.",
          "target": "He has been training hard at the gym to prepare for the tournament.",
          "masked": [
            "H*",
            "h**",
            "b***",
            "t*******",
            "h***",
            "a*",
            "t**",
            "g**",
            "t*",
            "p******",
            "f**",
            "t**",
            "t*********."
          ],
          "hints": [
            "has been training hard at the gym",
            "to prepare for the tournament"
          ],
          "acceptable": [
            "He has been training hard at the gym to prepare for the tournament."
          ],
          "grammarNote": "Động từ \"train\" hoặc \"work out\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s7",
          "vietnamese": "Chính quyền thành phố đã nỗ lực cải thiện hệ thống thoát nước suốt thời gian qua.",
          "target": "The city authorities have been striving to improve the drainage system over recent times.",
          "masked": [
            "T**",
            "c***",
            "a**********",
            "h***",
            "b***",
            "s*******",
            "t*",
            "i******",
            "t**",
            "d*******",
            "s*****",
            "o***",
            "r*****",
            "t****."
          ],
          "hints": [
            "have been striving to improve",
            "the drainage system"
          ],
          "acceptable": [
            "The city authorities have been striving to improve the drainage system over recent times."
          ],
          "grammarNote": "Collocation: \"drainage system\" (hệ thống thoát nước)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s8",
          "vietnamese": "Bạn đã đợi tôi ở đây bao lâu rồi?",
          "target": "How long have you been waiting for me here?",
          "masked": [
            "H**",
            "l***",
            "h***",
            "y**",
            "b***",
            "w******",
            "f**",
            "m*",
            "h***?"
          ],
          "hints": [
            "How long have you been waiting for me",
            "here"
          ],
          "acceptable": [
            "How long have you been waiting for me here?"
          ],
          "grammarNote": "Câu hỏi thời lượng: \"How long have you been V-ing...?\""
        },
        {
          "id": "buoc1-present-perfect-continuous-s9",
          "vietnamese": "Mắt bạn đỏ quá, bạn đã ngồi nhìn màn hình máy tính suốt cả ngày à?",
          "target": "Your eyes are red, have you been staring at the computer screen all day?",
          "masked": [
            "Y***",
            "e***",
            "a**",
            "r**,",
            "h***",
            "y**",
            "b***",
            "s******",
            "a*",
            "t**",
            "c*******",
            "s*****",
            "a**",
            "d**?"
          ],
          "hints": [
            "have you been staring at",
            "computer screen all day"
          ],
          "acceptable": [
            "Your eyes are red, have you been staring at the computer screen all day?"
          ],
          "grammarNote": "Dấu hiệu hiện tại là kết quả của hành động liên tục trong quá khứ."
        },
        {
          "id": "buoc1-present-perfect-continuous-s10",
          "vietnamese": "Công ty chúng tôi đã và đang tìm kiếm đối tác chiến lược phù hợp trong khu vực.",
          "target": "Our company has been searching for suitable strategic partners in the region.",
          "masked": [
            "O**",
            "c******",
            "h**",
            "b***",
            "s********",
            "f**",
            "s*******",
            "s********",
            "p*******",
            "i*",
            "t**",
            "r*****."
          ],
          "hints": [
            "has been searching for",
            "strategic partners in the region"
          ],
          "acceptable": [
            "Our company has been searching for suitable strategic partners in the region."
          ],
          "grammarNote": "Collocation: \"strategic partners\" (đối tác chiến lược)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s11",
          "vietnamese": "Họ đã cải tạo ngôi nhà cũ này suốt sáu tháng qua.",
          "target": "They have been renovating this old house for the past six months.",
          "masked": [
            "T***",
            "h***",
            "b***",
            "r*********",
            "t***",
            "o**",
            "h****",
            "f**",
            "t**",
            "p***",
            "s**",
            "m*****."
          ],
          "hints": [
            "have been renovating this old house",
            "for the past six months"
          ],
          "acceptable": [
            "They have been renovating this old house for the past six months."
          ],
          "grammarNote": "Từ vựng: \"renovate / refurbish\" (cải tạo nhà)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s12",
          "vietnamese": "Tôi đã suy nghĩ rất nhiều về lời đề nghị làm việc của bạn.",
          "target": "I have been thinking a lot about your job offer.",
          "masked": [
            "I",
            "h***",
            "b***",
            "t*******",
            "a",
            "l**",
            "a****",
            "y***",
            "j**",
            "o****."
          ],
          "hints": [
            "have been thinking a lot about",
            "your job offer"
          ],
          "acceptable": [
            "I have been thinking a lot about your job offer."
          ],
          "grammarNote": "\"think about something\" ở thì HTTDTD diễn tả sự trăn trở liên tục."
        },
        {
          "id": "buoc1-present-perfect-continuous-s13",
          "vietnamese": "Khí hậu toàn cầu đã và đang ấm lên với tốc độ nhanh chưa từng thấy.",
          "target": "The global climate has been warming at an unprecedented pace.",
          "masked": [
            "T**",
            "g*****",
            "c******",
            "h**",
            "b***",
            "w******",
            "a*",
            "a*",
            "u************",
            "p***."
          ],
          "hints": [
            "has been warming at",
            "an unprecedented pace"
          ],
          "acceptable": [
            "The global climate has been warming at an unprecedented pace."
          ],
          "grammarNote": "Từ vựng C1/C2: \"at an unprecedented pace\" (tốc độ chưa từng có)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s14",
          "vietnamese": "Các kỹ sư đã và đang thử nghiệm mẫu xe tự hành mới suốt tuần qua.",
          "target": "Engineers have been testing the new autonomous vehicle model all week.",
          "masked": [
            "E********",
            "h***",
            "b***",
            "t******",
            "t**",
            "n**",
            "a*********",
            "v******",
            "m****",
            "a**",
            "w***."
          ],
          "hints": [
            "have been testing the new autonomous vehicle",
            "all week"
          ],
          "acceptable": [
            "Engineers have been testing the new autonomous vehicle model all week."
          ],
          "grammarNote": "Thuật ngữ: \"autonomous vehicle\" (xe tự hành)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s15",
          "vietnamese": "Bọn trẻ đã chơi trò chơi điện tử suốt từ trưa đến giờ mà không nghỉ ngơi.",
          "target": "The children have been playing video games since noon without a break.",
          "masked": [
            "T**",
            "c*******",
            "h***",
            "b***",
            "p******",
            "v****",
            "g****",
            "s****",
            "n***",
            "w******",
            "a",
            "b****."
          ],
          "hints": [
            "have been playing video games since noon",
            "without a break"
          ],
          "acceptable": [
            "The children have been playing video games since noon without a break."
          ],
          "grammarNote": "Cụm từ: \"without a break\" (không ngừng nghỉ)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s16",
          "vietnamese": "Tôi đã tiết kiệm tiền suốt năm qua để mua chiếc xe máy mới.",
          "target": "I have been saving money all year to buy a new motorbike.",
          "masked": [
            "I",
            "h***",
            "b***",
            "s*****",
            "m****",
            "a**",
            "y***",
            "t*",
            "b**",
            "a",
            "n**",
            "m********."
          ],
          "hints": [
            "have been saving money all year",
            "to buy a new motorbike"
          ],
          "acceptable": [
            "I have been saving money all year to buy a new motorbike."
          ],
          "grammarNote": "Diễn tả hành động tích luỹ liên tục: \"have been saving money\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s17",
          "vietnamese": "Đội ngũ y tế đã làm việc không ngừng nghỉ để ngăn chặn dịch bệnh bùng phát.",
          "target": "The medical team has been working tirelessly to prevent the disease outbreak.",
          "masked": [
            "T**",
            "m******",
            "t***",
            "h**",
            "b***",
            "w******",
            "t*********",
            "t*",
            "p******",
            "t**",
            "d******",
            "o*******."
          ],
          "hints": [
            "has been working tirelessly to prevent",
            "the disease outbreak"
          ],
          "acceptable": [
            "The medical team has been working tirelessly to prevent the disease outbreak."
          ],
          "grammarNote": "Trạng từ: \"tirelessly\", collocation: \"disease outbreak\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s18",
          "vietnamese": "Người dân địa phương đã phàn nàn về tiếng ồn từ công trường xây dựng.",
          "target": "Local residents have been complaining about the noise from the construction site.",
          "masked": [
            "L****",
            "r********",
            "h***",
            "b***",
            "c**********",
            "a****",
            "t**",
            "n****",
            "f***",
            "t**",
            "c***********",
            "s***."
          ],
          "hints": [
            "have been complaining about the noise from",
            "construction site"
          ],
          "acceptable": [
            "Local residents have been complaining about the noise from the construction site."
          ],
          "grammarNote": "Cấu trúc: complain about something."
        },
        {
          "id": "buoc1-present-perfect-continuous-s19",
          "vietnamese": "Anh ấy đã viết cuốn tiểu thuyết đầu tay suốt hai năm qua.",
          "target": "He has been writing his debut novel for the past two years.",
          "masked": [
            "H*",
            "h**",
            "b***",
            "w******",
            "h**",
            "d****",
            "n****",
            "f**",
            "t**",
            "p***",
            "t**",
            "y****."
          ],
          "hints": [
            "has been writing his debut novel for",
            "the past two years"
          ],
          "acceptable": [
            "He has been writing his debut novel for the past two years."
          ],
          "grammarNote": "Từ vựng: \"debut novel\" (tiểu thuyết đầu tay)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s20",
          "vietnamese": "Các trường học đã áp dụng các phương pháp giảng dạy tương tác trong thời gian gần đây.",
          "target": "Schools have been adopting interactive teaching methods recently.",
          "masked": [
            "S******",
            "h***",
            "b***",
            "a*******",
            "i**********",
            "t*******",
            "m******",
            "r*******."
          ],
          "hints": [
            "have been adopting interactive teaching methods",
            "recently"
          ],
          "acceptable": [
            "Schools have been adopting interactive teaching methods recently."
          ],
          "grammarNote": "Collocation: \"interactive teaching methods\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s21",
          "vietnamese": "Chúng tôi đã theo dõi sát sao tình hình tài chính của thị trường.",
          "target": "We have been closely monitoring the market financial situation.",
          "masked": [
            "W*",
            "h***",
            "b***",
            "c******",
            "m*********",
            "t**",
            "m*****",
            "f********",
            "s********."
          ],
          "hints": [
            "have been closely monitoring",
            "the financial situation"
          ],
          "acceptable": [
            "We have been closely monitoring the market financial situation."
          ],
          "grammarNote": "Collocation: \"closely monitor\" (theo dõi sát sao)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s22",
          "vietnamese": "Cô ấy đã luyện tập phát âm tiếng Anh chuẩn IPA suốt tháng này.",
          "target": "She has been practicing standard IPA English pronunciation all this month.",
          "masked": [
            "S**",
            "h**",
            "b***",
            "p*********",
            "s*******",
            "I**",
            "E******",
            "p************",
            "a**",
            "t***",
            "m****."
          ],
          "hints": [
            "has been practicing standard IPA English pronunciation",
            "all this month"
          ],
          "acceptable": [
            "She has been practicing standard IPA English pronunciation all this month."
          ],
          "grammarNote": "Nhấn mạnh hành động rèn luyện hàng ngày: \"all this month\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s23",
          "vietnamese": "Giá xăng dầu đã tăng liên tục trong ba tuần liên tiếp.",
          "target": "Fuel prices have been rising steadily for three consecutive weeks.",
          "masked": [
            "F***",
            "p*****",
            "h***",
            "b***",
            "r*****",
            "s*******",
            "f**",
            "t****",
            "c**********",
            "w****."
          ],
          "hints": [
            "have been rising steadily for",
            "three consecutive weeks"
          ],
          "acceptable": [
            "Fuel prices have been rising steadily for three consecutive weeks."
          ],
          "grammarNote": "Từ vựng: \"consecutive weeks\" (tuần liên tiếp)."
        },
        {
          "id": "buoc1-present-perfect-continuous-s24",
          "vietnamese": "Tôi đã tìm kiếm chiếc đồng hồ đeo tay bị mất suốt buổi chiều.",
          "target": "I have been looking for my lost wristwatch all afternoon.",
          "masked": [
            "I",
            "h***",
            "b***",
            "l******",
            "f**",
            "m*",
            "l***",
            "w*********",
            "a**",
            "a********."
          ],
          "hints": [
            "have been looking for my lost wristwatch",
            "all afternoon"
          ],
          "acceptable": [
            "I have been looking for my lost wristwatch all afternoon."
          ],
          "grammarNote": "Phrasal verb: \"look for something\"."
        },
        {
          "id": "buoc1-present-perfect-continuous-s25",
          "vietnamese": "Các tổ chức phi chính phủ đã và đang hỗ trợ người dân vùng lũ tái thiết cuộc sống.",
          "target": "NGOs have been assisting flood victims in rebuilding their lives.",
          "masked": [
            "N***",
            "h***",
            "b***",
            "a********",
            "f****",
            "v******",
            "i*",
            "r*********",
            "t****",
            "l****."
          ],
          "hints": [
            "have been assisting flood victims in",
            "rebuilding their lives"
          ],
          "acceptable": [
            "NGOs have been assisting flood victims in rebuilding their lives."
          ],
          "grammarNote": "Cấu trúc: assist someone in doing something."
        }
      ]
    }
  ],
  "structures": [
    {
      "id": "buoc1-uncountable-nouns",
      "aliasIds": [],
      "title": "Danh từ không đếm được (Uncountable Nouns)",
      "step": "Bước 1",
      "level": "A2 - B1",
      "desc": "Luyện dịch 25 câu sử dụng danh từ không đếm được phổ biến trong bài thi IELTS (information, advice, equipment...).",
      "sentences": [
        {
          "id": "buoc1-uncountable-nouns-s1",
          "vietnamese": "Thông tin bạn vừa cung cấp rất hữu ích cho nghiên cứu của chúng tôi.",
          "target": "The information you provided is extremely useful for our research.",
          "masked": [
            "T**",
            "i**********",
            "y**",
            "p*******",
            "i*",
            "e********",
            "u*****",
            "f**",
            "o**",
            "r*******."
          ],
          "hints": [
            "The information you provided is",
            "extremely useful for our research"
          ],
          "acceptable": [
            "The information you provided is extremely useful for our research."
          ],
          "grammarNote": "\"Information\" là danh từ không đếm được, luôn chia động từ số ít (\"is\")."
        },
        {
          "id": "buoc1-uncountable-nouns-s2",
          "vietnamese": "Anh ấy đã cho tôi một vài lời khuyên rất giá trị về việc định hướng nghề nghiệp.",
          "target": "He gave me some valuable advice on career orientation.",
          "masked": [
            "H*",
            "g***",
            "m*",
            "s***",
            "v*******",
            "a*****",
            "o*",
            "c*****",
            "o**********."
          ],
          "hints": [
            "gave me some valuable advice on",
            "career orientation"
          ],
          "acceptable": [
            "He gave me some valuable advice on career orientation."
          ],
          "grammarNote": "\"Advice\" không đếm được -> dùng \"some advice\" hoặc \"a piece of advice\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s3",
          "vietnamese": "Phòng thí nghiệm được trang bị nhiều thiết bị hiện đại phục vụ nghiên cứu.",
          "target": "The laboratory is equipped with a lot of modern equipment for research.",
          "masked": [
            "T**",
            "l*********",
            "i*",
            "e*******",
            "w***",
            "a",
            "l**",
            "o*",
            "m*****",
            "e********",
            "f**",
            "r*******."
          ],
          "hints": [
            "is equipped with a lot of modern equipment",
            "for research"
          ],
          "acceptable": [
            "The laboratory is equipped with a lot of modern equipment for research."
          ],
          "grammarNote": "\"Equipment\" không đếm được, không thêm -s."
        },
        {
          "id": "buoc1-uncountable-nouns-s4",
          "vietnamese": "Ô nhiễm không khí tại các đô thị lớn đang gây ra nhiều bệnh về đường hô hấp.",
          "target": "Air pollution in major urban areas is causing many respiratory diseases.",
          "masked": [
            "A**",
            "p********",
            "i*",
            "m****",
            "u****",
            "a****",
            "i*",
            "c******",
            "m***",
            "r**********",
            "d*******."
          ],
          "hints": [
            "Air pollution in major urban areas is causing",
            "respiratory diseases"
          ],
          "acceptable": [
            "Air pollution in major urban areas is causing many respiratory diseases."
          ],
          "grammarNote": "\"Pollution\" không đếm được -> động từ chia số ít \"is causing\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s5",
          "vietnamese": "Du khách được phép mang tối đa 20kg hành lý miễn cước.",
          "target": "Passengers are allowed to bring up to 20kg of luggage free of charge.",
          "masked": [
            "P*********",
            "a**",
            "a******",
            "t*",
            "b****",
            "u*",
            "t*",
            "2***",
            "o*",
            "l******",
            "f***",
            "o*",
            "c*****."
          ],
          "hints": [
            "are allowed to bring up to 20kg of luggage",
            "free of charge"
          ],
          "acceptable": [
            "Passengers are allowed to bring up to 20kg of luggage free of charge."
          ],
          "grammarNote": "\"Luggage\" và \"Baggage\" là danh từ không đếm được, không có \"luggages\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s6",
          "vietnamese": "Căn hộ mới của cô ấy được trang bị đồ nội thất bằng gỗ tự nhiên rất đẹp.",
          "target": "Her new apartment is furnished with beautiful natural wood furniture.",
          "masked": [
            "H**",
            "n**",
            "a********",
            "i*",
            "f********",
            "w***",
            "b********",
            "n******",
            "w***",
            "f********."
          ],
          "hints": [
            "is furnished with beautiful natural wood furniture"
          ],
          "acceptable": [
            "Her new apartment is furnished with beautiful natural wood furniture."
          ],
          "grammarNote": "\"Furniture\" là danh từ không đếm được, không bao giờ có \"furnitures\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s7",
          "vietnamese": "Thời tiết xấu đã khiến chuyến bay bị hoãn lại hai tiếng đồng hồ.",
          "target": "Bad weather caused the flight to be delayed for two hours.",
          "masked": [
            "B**",
            "w******",
            "c*****",
            "t**",
            "f*****",
            "t*",
            "b*",
            "d******",
            "f**",
            "t**",
            "h****."
          ],
          "hints": [
            "Bad weather caused the flight to be delayed",
            "for two hours"
          ],
          "acceptable": [
            "Bad weather caused the flight to be delayed for two hours."
          ],
          "grammarNote": "\"Weather\" không đếm được, không dùng \"a bad weather\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s8",
          "vietnamese": "Người học tiếng Anh cần dành nhiều thời gian để tích luỹ kiến thức nền tảng.",
          "target": "English learners need to spend a lot of time acquiring foundational knowledge.",
          "masked": [
            "E******",
            "l*******",
            "n***",
            "t*",
            "s****",
            "a",
            "l**",
            "o*",
            "t***",
            "a********",
            "f***********",
            "k********."
          ],
          "hints": [
            "spend a lot of time acquiring",
            "foundational knowledge"
          ],
          "acceptable": [
            "English learners need to spend a lot of time acquiring foundational knowledge."
          ],
          "grammarNote": "\"Knowledge\" không đếm được, không dùng \"knowledges\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s9",
          "vietnamese": "Các bằng chứng khoa học cho thấy tập thể dục giúp kéo dài tuổi thọ.",
          "target": "Scientific evidence shows that physical exercise helps prolong lifespan.",
          "masked": [
            "S*********",
            "e*******",
            "s****",
            "t***",
            "p*******",
            "e*******",
            "h****",
            "p******",
            "l*******."
          ],
          "hints": [
            "Scientific evidence shows that",
            "physical exercise helps prolong lifespan"
          ],
          "acceptable": [
            "Scientific evidence shows that physical exercise helps prolong lifespan."
          ],
          "grammarNote": "\"Evidence\" không đếm được -> động từ chia số ít \"shows\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s10",
          "vietnamese": "Giao thông ở trung tâm thành phố vào giờ cao điểm rất hỗn loạn.",
          "target": "Traffic in the city center during rush hour is very chaotic.",
          "masked": [
            "T******",
            "i*",
            "t**",
            "c***",
            "c*****",
            "d*****",
            "r***",
            "h***",
            "i*",
            "v***",
            "c******."
          ],
          "hints": [
            "Traffic in the city center during rush hour is",
            "very chaotic"
          ],
          "acceptable": [
            "Traffic in the city center during rush hour is very chaotic."
          ],
          "grammarNote": "\"Traffic\" là danh từ không đếm được -> động từ chia số ít \"is\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s11",
          "vietnamese": "Chính phủ cần phân bổ ngân sách để nâng cấp cơ sở vật chất học tập.",
          "target": "The government needs to allocate budget to upgrade learning facilities.",
          "masked": [
            "T**",
            "g*********",
            "n****",
            "t*",
            "a*******",
            "b*****",
            "t*",
            "u******",
            "l*******",
            "f*********."
          ],
          "hints": [
            "allocate budget to upgrade",
            "learning facilities"
          ],
          "acceptable": [
            "The government needs to allocate budget to upgrade learning facilities."
          ],
          "grammarNote": "\"Funding\" không đếm được; \"facilities\" lại là danh từ luôn ở số nhiều."
        },
        {
          "id": "buoc1-uncountable-nouns-s12",
          "vietnamese": "Học sinh tiểu học không nên bị giao quá nhiều bài tập về nhà mỗi tối.",
          "target": "Primary school students should not be given too much homework every night.",
          "masked": [
            "P******",
            "s*****",
            "s*******",
            "s*****",
            "n**",
            "b*",
            "g****",
            "t**",
            "m***",
            "h*******",
            "e****",
            "n****."
          ],
          "hints": [
            "should not be given too much homework",
            "every night"
          ],
          "acceptable": [
            "Primary school students should not be given too much homework every night."
          ],
          "grammarNote": "\"Homework\" không đếm được -> dùng \"too much homework\", không dùng \"homeworks\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s13",
          "vietnamese": "Chất lượng không khí trong nhà có thể bị ảnh hưởng bởi khói thuốc lá.",
          "target": "Indoor air quality can be affected by cigarette smoke.",
          "masked": [
            "I*****",
            "a**",
            "q******",
            "c**",
            "b*",
            "a*******",
            "b*",
            "c********",
            "s****."
          ],
          "hints": [
            "Indoor air quality can be affected by",
            "cigarette smoke"
          ],
          "acceptable": [
            "Indoor air quality can be affected by cigarette smoke."
          ],
          "grammarNote": "\"Smoke\" (khói) là danh từ không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s14",
          "vietnamese": "Bà ấy đã tích luỹ được nhiều kinh nghiệm quý báu sau 30 năm giảng dạy.",
          "target": "She has accumulated a wealth of valuable experience after 30 years of teaching.",
          "masked": [
            "S**",
            "h**",
            "a**********",
            "a",
            "w*****",
            "o*",
            "v*******",
            "e*********",
            "a****",
            "3*",
            "y****",
            "o*",
            "t*******."
          ],
          "hints": [
            "accumulated a wealth of valuable experience",
            "after 30 years of teaching"
          ],
          "acceptable": [
            "She has accumulated a wealth of valuable experience after 30 years of teaching."
          ],
          "grammarNote": "\"Experience\" mang nghĩa \"kinh nghiệm tích luỹ\" là không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s15",
          "vietnamese": "Âm nhạc có thể giúp giảm bớt căng thẳng sau những giờ làm việc mệt mỏi.",
          "target": "Music can help relieve stress after exhausting working hours.",
          "masked": [
            "M****",
            "c**",
            "h***",
            "r******",
            "s*****",
            "a****",
            "e*********",
            "w******",
            "h****."
          ],
          "hints": [
            "Music can help relieve stress",
            "after exhausting working hours"
          ],
          "acceptable": [
            "Music can help relieve stress after exhausting working hours."
          ],
          "grammarNote": "\"Music\" và \"stress\" đều là danh từ không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s16",
          "vietnamese": "Tiến độ của dự án đang diễn ra rất chậm do thiếu nhân lực.",
          "target": "The progress of the project is moving very slowly due to a lack of manpower.",
          "masked": [
            "T**",
            "p*******",
            "o*",
            "t**",
            "p******",
            "i*",
            "m*****",
            "v***",
            "s*****",
            "d**",
            "t*",
            "a",
            "l***",
            "o*",
            "m*******."
          ],
          "hints": [
            "The progress of the project is moving very slowly",
            "due to a lack of manpower"
          ],
          "acceptable": [
            "The progress of the project is moving very slowly due to a lack of manpower."
          ],
          "grammarNote": "\"Progress\" không đếm được, không bao giờ dùng \"a progress\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s17",
          "vietnamese": "Lượng rác thải sinh hoạt tăng mạnh trong các dịp lễ tết.",
          "target": "The amount of household garbage increases sharply during festive seasons.",
          "masked": [
            "T**",
            "a*****",
            "o*",
            "h********",
            "g******",
            "i********",
            "s******",
            "d*****",
            "f******",
            "s******."
          ],
          "hints": [
            "The amount of household garbage increases sharply",
            "during festive seasons"
          ],
          "acceptable": [
            "The amount of household garbage increases sharply during festive seasons."
          ],
          "grammarNote": "Danh từ không đếm được (\"garbage\", \"waste\") đi với \"the amount of\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s18",
          "vietnamese": "Nhà hàng này nổi tiếng với các món hải sản tươi sống.",
          "target": "This restaurant is famous for its fresh seafood.",
          "masked": [
            "T***",
            "r*********",
            "i*",
            "f*****",
            "f**",
            "i**",
            "f****",
            "s******."
          ],
          "hints": [
            "is famous for its fresh seafood"
          ],
          "acceptable": [
            "This restaurant is famous for its fresh seafood."
          ],
          "grammarNote": "\"Seafood\" là danh từ không đếm được số ít."
        },
        {
          "id": "buoc1-uncountable-nouns-s19",
          "vietnamese": "Nhiều người trẻ thiếu kiên nhẫn khi đối mặt với những thử thách trong cuộc sống.",
          "target": "Many young individuals lack patience when confronting life challenges.",
          "masked": [
            "M***",
            "y****",
            "i**********",
            "l***",
            "p*******",
            "w***",
            "c**********",
            "l***",
            "c*********."
          ],
          "hints": [
            "lack patience when confronting",
            "life challenges"
          ],
          "acceptable": [
            "Many young individuals lack patience when confronting life challenges."
          ],
          "grammarNote": "\"Patience\" (lòng kiên nhẫn) là danh từ trừu tượng không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s20",
          "vietnamese": "Tiền bạc không thể mua được sức khỏe và hạnh phúc gia đình.",
          "target": "Money cannot buy health and family happiness.",
          "masked": [
            "M****",
            "c*****",
            "b**",
            "h*****",
            "a**",
            "f*****",
            "h********."
          ],
          "hints": [
            "Money cannot buy",
            "health and family happiness"
          ],
          "acceptable": [
            "Money cannot buy health and family happiness."
          ],
          "grammarNote": "\"Money\", \"health\", \"happiness\" đều là danh từ không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s21",
          "vietnamese": "Chính phủ đang cung cấp viện trợ tài chính khẩn cấp cho các vùng thiên tai.",
          "target": "The government is providing emergency financial aid to disaster-stricken regions.",
          "masked": [
            "T**",
            "g*********",
            "i*",
            "p********",
            "e********",
            "f********",
            "a**",
            "t*",
            "d****************",
            "r******."
          ],
          "hints": [
            "is providing emergency financial aid to",
            "disaster-stricken regions"
          ],
          "acceptable": [
            "The government is providing emergency financial aid to disaster-stricken regions."
          ],
          "grammarNote": "\"Aid\" và \"assistance\" không đếm được -> dùng \"financial aid\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s22",
          "vietnamese": "Cô ấy có năng khiếu tự nhiên về hội hoạ và thiết kế thời trang.",
          "target": "She has natural talent for painting and fashion design.",
          "masked": [
            "S**",
            "h**",
            "n******",
            "t*****",
            "f**",
            "p*******",
            "a**",
            "f******",
            "d*****."
          ],
          "hints": [
            "has natural talent for",
            "painting and fashion design"
          ],
          "acceptable": [
            "She has natural talent for painting and fashion design."
          ],
          "grammarNote": "\"Talent\" có thể dùng không đếm được: \"natural talent for\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s23",
          "vietnamese": "Nhiều nghiên cứu chỉ ra rằng giấc ngủ đóng vai trò thiết yếu đối với trí nhớ.",
          "target": "Much research indicates that sleep plays an essential role in memory.",
          "masked": [
            "M***",
            "r*******",
            "i********",
            "t***",
            "s****",
            "p****",
            "a*",
            "e********",
            "r***",
            "i*",
            "m*****."
          ],
          "hints": [
            "Much research indicates that",
            "sleep plays an essential role in memory"
          ],
          "acceptable": [
            "Much research indicates that sleep plays an essential role in memory."
          ],
          "grammarNote": "\"Research\" là không đếm được: dùng \"much research\", KHÔNG dùng \"researches\"."
        },
        {
          "id": "buoc1-uncountable-nouns-s24",
          "vietnamese": "Cần có sự can thiệp của pháp luật để bảo vệ quyền riêng tư cá nhân.",
          "target": "Legal intervention is necessary to protect personal privacy.",
          "masked": [
            "L****",
            "i***********",
            "i*",
            "n********",
            "t*",
            "p******",
            "p*******",
            "p******."
          ],
          "hints": [
            "Legal intervention is necessary to",
            "protect personal privacy"
          ],
          "acceptable": [
            "Legal intervention is necessary to protect personal privacy."
          ],
          "grammarNote": "\"Privacy\" là danh từ trừu tượng không đếm được."
        },
        {
          "id": "buoc1-uncountable-nouns-s25",
          "vietnamese": "Khán giả dành cho nghệ sĩ những tràng pháo tay nồng nhiệt.",
          "target": "The audience gave the artist warm applause.",
          "masked": [
            "T**",
            "a*******",
            "g***",
            "t**",
            "a*****",
            "w***",
            "a*******."
          ],
          "hints": [
            "gave the artist warm applause"
          ],
          "acceptable": [
            "The audience gave the artist warm applause."
          ],
          "grammarNote": "\"Applause\" không đếm được, dùng \"warm applause\"."
        }
      ]
    },
        {
        "id": "buoc1-was-were",
        "aliasIds": [
            "write-was-were",
            "write-past-be"
        ],
        "title": "Quá khứ đơn: Was, Were (Past Simple of To Be)",
        "step": "Bước 1",
        "level": "A1 - A2",
        "desc": "Luyện dịch 20 câu làm chủ động từ To Be ở quá khứ đơn (Was / Were), thể khẳng định, phủ định và câu hỏi (Chuẩn The IELTS Dictionary).",
        "sentences": [
            {
                "id": "buoc1-was-were-s1",
                "vietnamese": "Hôm qua thời tiết rất đẹp và ấm áp.",
                "target": "The weather was very nice and warm yesterday.",
                "masked": [
                    "T**",
                    "w******",
                    "w**",
                    "v***",
                    "n***",
                    "a**",
                    "w***",
                    "y********."
                ],
                "hints": [
                    "The weather was very nice",
                    "and warm yesterday"
                ],
                "acceptable": [
                    "The weather was very nice and warm yesterday.",
                    "Yesterday the weather was very nice and warm."
                ],
                "grammarNote": "Chủ ngữ ngôi thứ 3 số ít 'The weather' đi với 'was' trong quá khứ đơn."
            },
            {
                "id": "buoc1-was-were-s2",
                "vietnamese": "Họ đã ở đâu vào tối hôm qua?",
                "target": "Where were they yesterday evening?",
                "masked": [
                    "W****",
                    "w***",
                    "t***",
                    "y********",
                    "e******?"
                ],
                "hints": [
                    "Where were they",
                    "yesterday evening"
                ],
                "acceptable": [
                    "Where were they yesterday evening?",
                    "Where were they last night?"
                ],
                "grammarNote": "Câu hỏi Wh- với To Be ở quá khứ: Where + were + they...?"
            },
            {
                "id": "buoc1-was-were-s3",
                "vietnamese": "Tôi đã rất mệt sau một ngày làm việc dài.",
                "target": "I was very tired after a long working day.",
                "masked": [
                    "I",
                    "w**",
                    "v***",
                    "t****",
                    "a****",
                    "a",
                    "l***",
                    "w******",
                    "d**."
                ],
                "hints": [
                    "was very tired",
                    "after a long working day"
                ],
                "acceptable": [
                    "I was very tired after a long working day.",
                    "I was very tired after a long day at work."
                ],
                "grammarNote": "Chủ ngữ 'I' đi với 'was' trong thì quá khứ đơn."
            },
            {
                "id": "buoc1-was-were-s4",
                "vietnamese": "Tuần trước chúng tôi không có ở nhà.",
                "target": "We were not at home last week.",
                "masked": [
                    "W*",
                    "w***",
                    "n**",
                    "a*",
                    "h***",
                    "l***",
                    "w***."
                ],
                "hints": [
                    "were not at home",
                    "last week"
                ],
                "acceptable": [
                    "We were not at home last week.",
                    "We weren't at home last week."
                ],
                "grammarNote": "Thể phủ định của were: 'were not' (rút gọn là 'weren't')."
            },
            {
                "id": "buoc1-was-were-s5",
                "vietnamese": "Hồi còn nhỏ, anh ấy rất nhút nhát và ít nói.",
                "target": "When he was a child, he was very shy and quiet.",
                "masked": [
                    "W***",
                    "h*",
                    "w**",
                    "a",
                    "c****",
                    "h*",
                    "w**",
                    "v***",
                    "s**",
                    "a**",
                    "q****."
                ],
                "hints": [
                    "When he was a child",
                    "he was very shy and quiet"
                ],
                "acceptable": [
                    "When he was a child, he was very shy and quiet.",
                    "He was very shy and quiet when he was a child."
                ],
                "grammarNote": "Mệnh đề chỉ thời gian quá khứ: 'When + S + was/were...'."
            },
            {
                "id": "buoc1-was-were-s6",
                "vietnamese": "Bộ phim tối qua có thú vị không?",
                "target": "Was the movie interesting last night?",
                "masked": [
                    "W**",
                    "t**",
                    "m****",
                    "i**********",
                    "l***",
                    "n****?"
                ],
                "hints": [
                    "Was the movie interesting",
                    "last night"
                ],
                "acceptable": [
                    "Was the movie interesting last night?",
                    "Was the film interesting last night?"
                ],
                "grammarNote": "Câu hỏi Yes/No với To Be quá khứ số ít: Was + S + adj...?"
            },
            {
                "id": "buoc1-was-were-s7",
                "vietnamese": "Đã có rất nhiều người ở buổi hòa nhạc hôm Chủ nhật.",
                "target": "There were a lot of people at the concert on Sunday.",
                "masked": [
                    "T****",
                    "w***",
                    "a",
                    "l**",
                    "o*",
                    "p*****",
                    "a*",
                    "t**",
                    "c******",
                    "o*",
                    "S*****."
                ],
                "hints": [
                    "There were a lot of people",
                    "at the concert on Sunday"
                ],
                "acceptable": [
                    "There were a lot of people at the concert on Sunday.",
                    "There were many people at the concert on Sunday."
                ],
                "grammarNote": "'There were' dùng cho danh từ số nhiều trong quá khứ ('people')."
            },
            {
                "id": "buoc1-was-were-s8",
                "vietnamese": "Cô ấy đã vắng mặt trong cuộc họp sáng nay vì bị ốm.",
                "target": "She was absent from the meeting this morning because she was sick.",
                "masked": [
                    "S**",
                    "w**",
                    "a*****",
                    "f***",
                    "t**",
                    "m******",
                    "t***",
                    "m******",
                    "b******",
                    "s**",
                    "w**",
                    "s***."
                ],
                "hints": [
                    "was absent from the meeting",
                    "because she was sick"
                ],
                "acceptable": [
                    "She was absent from the meeting this morning because she was sick.",
                    "She was absent from the meeting this morning because she was ill."
                ],
                "grammarNote": "Cụm từ 'be absent from': vắng mặt khỏi đâu. Ngôi 'she' dùng 'was'."
            },
            {
                "id": "buoc1-was-were-s9",
                "vietnamese": "Bữa tiệc sinh nhật của bạn thế nào? Nó rất vui.",
                "target": "How was your birthday party? It was great fun.",
                "masked": [
                    "H**",
                    "w**",
                    "y***",
                    "b*******",
                    "p****?",
                    "I*",
                    "w**",
                    "g****",
                    "f**."
                ],
                "hints": [
                    "How was your birthday party",
                    "It was great fun"
                ],
                "acceptable": [
                    "How was your birthday party? It was great fun.",
                    "How was your birthday party? It was very fun."
                ],
                "grammarNote": "Hỏi cảm nghĩ trong quá khứ: 'How was + danh từ số ít?'."
            },
            {
                "id": "buoc1-was-were-s10",
                "vietnamese": "Những chiếc chìa khóa của tôi đã ở trên bàn mười phút trước.",
                "target": "My keys were on the table ten minutes ago.",
                "masked": [
                    "M*",
                    "k***",
                    "w***",
                    "o*",
                    "t**",
                    "t****",
                    "t**",
                    "m******",
                    "a**."
                ],
                "hints": [
                    "My keys were on the table",
                    "ten minutes ago"
                ],
                "acceptable": [
                    "My keys were on the table ten minutes ago."
                ],
                "grammarNote": "Chủ ngữ số nhiều 'My keys' đi với 'were' trong quá khứ."
            },
            {
                "id": "buoc1-was-were-s11",
                "vietnamese": "Đã có một vụ tai nạn giao thông nghiêm trọng gần trường học ngày hôm qua.",
                "target": "There was a serious traffic accident near the school yesterday.",
                "masked": [
                    "T****",
                    "w**",
                    "a",
                    "s******",
                    "t******",
                    "a*******",
                    "n***",
                    "t**",
                    "s*****",
                    "y********."
                ],
                "hints": [
                    "There was a serious traffic accident",
                    "near the school yesterday"
                ],
                "acceptable": [
                    "There was a serious traffic accident near the school yesterday."
                ],
                "grammarNote": "'There was' dùng cho danh từ đếm được số ít trong quá khứ ('a serious traffic accident')."
            },
            {
                "id": "buoc1-was-were-s12",
                "vietnamese": "Họ đã rất ngạc nhiên khi nghe tin tức đó.",
                "target": "They were very surprised to hear the news.",
                "masked": [
                    "T***",
                    "w***",
                    "v***",
                    "s********",
                    "t*",
                    "h***",
                    "t**",
                    "n***."
                ],
                "hints": [
                    "were very surprised",
                    "to hear the news"
                ],
                "acceptable": [
                    "They were very surprised to hear the news."
                ],
                "grammarNote": "Chủ ngữ số nhiều 'They' đi với 'were'. Cấu trúc: were + surprised + to V."
            },
            {
                "id": "buoc1-was-were-s13",
                "vietnamese": "Khách sạn đó không đắt lắm nhưng rất sạch sẽ và thoải mái.",
                "target": "The hotel was not very expensive but it was very clean and comfortable.",
                "masked": [
                    "T**",
                    "h****",
                    "w**",
                    "n**",
                    "v***",
                    "e********",
                    "b**",
                    "i*",
                    "w**",
                    "v***",
                    "c****",
                    "a**",
                    "c**********."
                ],
                "hints": [
                    "was not very expensive",
                    "clean and comfortable"
                ],
                "acceptable": [
                    "The hotel was not very expensive but it was very clean and comfortable.",
                    "The hotel wasn't very expensive but it was very clean and comfortable."
                ],
                "grammarNote": "Miêu tả đặc điểm trong quá khứ: was not / was + tính từ."
            },
            {
                "id": "buoc1-was-were-s14",
                "vietnamese": "Bạn có ở văn phòng lúc 3 giờ chiều hôm qua không?",
                "target": "Were you at the office at 3 PM yesterday?",
                "masked": [
                    "W***",
                    "y**",
                    "a*",
                    "t**",
                    "o*****",
                    "a*",
                    "3",
                    "P*",
                    "y********?"
                ],
                "hints": [
                    "Were you at the office",
                    "at 3 PM yesterday"
                ],
                "acceptable": [
                    "Were you at the office at 3 PM yesterday?",
                    "Were you at the office at 3 pm yesterday?"
                ],
                "grammarNote": "Câu hỏi nghi vấn Yes/No với chủ ngữ 'you': Were you...?"
            },
            {
                "id": "buoc1-was-were-s15",
                "vietnamese": "Những đứa trẻ đã rất đói sau chuyến đi bộ đường dài.",
                "target": "The children were very hungry after the hike.",
                "masked": [
                    "T**",
                    "c*******",
                    "w***",
                    "v***",
                    "h*****",
                    "a****",
                    "t**",
                    "h***."
                ],
                "hints": [
                    "The children were very hungry",
                    "after the hike"
                ],
                "acceptable": [
                    "The children were very hungry after the hike.",
                    "The kids were very hungry after the hike."
                ],
                "grammarNote": "'The children' là danh từ số nhiều bất quy tắc (từ 'child'), đi với 'were'."
            },
            {
                "id": "buoc1-was-were-s16",
                "vietnamese": "Tôi đã từng là một giáo viên tiếng Anh cách đây 5 năm.",
                "target": "I was an English teacher five years ago.",
                "masked": [
                    "I",
                    "w**",
                    "a*",
                    "E******",
                    "t******",
                    "f***",
                    "y****",
                    "a**."
                ],
                "hints": [
                    "was an English teacher",
                    "five years ago"
                ],
                "acceptable": [
                    "I was an English teacher five years ago."
                ],
                "grammarNote": "Diễn tả nghề nghiệp hoặc trạng thái trong quá khứ: I + was + an + N."
            },
            {
                "id": "buoc1-was-were-s17",
                "vietnamese": "Đường phố rất vắng vẻ vì lúc đó là đêm muộn.",
                "target": "The streets were very quiet because it was late at night.",
                "masked": [
                    "T**",
                    "s******",
                    "w***",
                    "v***",
                    "q****",
                    "b******",
                    "i*",
                    "w**",
                    "l***",
                    "a*",
                    "n****."
                ],
                "hints": [
                    "The streets were very quiet",
                    "because it was late at night"
                ],
                "acceptable": [
                    "The streets were very quiet because it was late at night."
                ],
                "grammarNote": "'The streets' (số nhiều) đi với 'were'; 'it' (thời gian) đi với 'was'."
            },
            {
                "id": "buoc1-was-were-s18",
                "vietnamese": "Kỳ thi không quá khó đối với những học sinh chăm chỉ.",
                "target": "The exam was not too difficult for hardworking students.",
                "masked": [
                    "T**",
                    "e***",
                    "w**",
                    "n**",
                    "t**",
                    "d********",
                    "f**",
                    "h**********",
                    "s*******."
                ],
                "hints": [
                    "The exam was not too difficult",
                    "for hardworking students"
                ],
                "acceptable": [
                    "The exam was not too difficult for hardworking students.",
                    "The exam wasn't too difficult for hardworking students."
                ],
                "grammarNote": "Phủ định quá khứ số ít: 'was not' (hoặc 'wasn't')."
            },
            {
                "id": "buoc1-was-were-s19",
                "vietnamese": "Đã có ai ở đó để giúp đỡ bạn không?",
                "target": "Was there anyone there to help you?",
                "masked": [
                    "W**",
                    "t****",
                    "a*****",
                    "t****",
                    "t*",
                    "h***",
                    "y**?"
                ],
                "hints": [
                    "Was there anyone there",
                    "to help you"
                ],
                "acceptable": [
                    "Was there anyone there to help you?"
                ],
                "grammarNote": "Đại từ bất định 'anyone' luôn chia số ít, dùng 'Was there anyone...?'."
            },
            {
                "id": "buoc1-was-were-s20",
                "vietnamese": "Bố mẹ tôi đã rất tự hào khi tôi tốt nghiệp đại học.",
                "target": "My parents were very proud when I graduated from university.",
                "masked": [
                    "M*",
                    "p******",
                    "w***",
                    "v***",
                    "p****",
                    "w***",
                    "I",
                    "g********",
                    "f***",
                    "u*********."
                ],
                "hints": [
                    "were very proud",
                    "when I graduated from university"
                ],
                "acceptable": [
                    "My parents were very proud when I graduated from university."
                ],
                "grammarNote": "'My parents' là danh từ số nhiều đi với 'were'. Cấu trúc: were proud."
            }
        ]
    },
    {
      "id": "buoc1-singular-plural",
      "aliasIds": [
        "write-singular-plural"
      ],
      "title": "Số ít / Số nhiều (Singular / Plural)",
      "step": "Bước 1",
      "level": "A2 - B1",
      "desc": "Luyện dịch 25 câu làm chủ quy tắc số ít, số nhiều bất quy tắc và sự hoà hợp chủ ngữ - vị ngữ.",
      "sentences": [
        {
          "id": "buoc1-singular-plural-s1",
          "vietnamese": "Trẻ em ngày nay tiếp xúc với công nghệ từ độ tuổi rất nhỏ.",
          "target": "Children nowadays are exposed to technology from a very young age.",
          "masked": [
            "C*******",
            "n*******",
            "a**",
            "e******",
            "t*",
            "t*********",
            "f***",
            "a",
            "v***",
            "y****",
            "a**."
          ],
          "hints": [
            "Children nowadays are exposed to",
            "technology from a very young age"
          ],
          "acceptable": [
            "Children nowadays are exposed to technology from a very young age."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"child\" -> \"children\" đi kèm động từ \"are\"."
        },
        {
          "id": "buoc1-singular-plural-s2",
          "vietnamese": "Mỗi học sinh trong lớp đều phải hoàn thành bài tập dự án trước thứ Sáu.",
          "target": "Each student in the class has to complete the project assignment before Friday.",
          "masked": [
            "E***",
            "s******",
            "i*",
            "t**",
            "c****",
            "h**",
            "t*",
            "c*******",
            "t**",
            "p******",
            "a*********",
            "b*****",
            "F*****."
          ],
          "hints": [
            "Each student in the class has to complete",
            "before Friday"
          ],
          "acceptable": [
            "Each student in the class has to complete the project assignment before Friday."
          ],
          "grammarNote": "\"Each / Every + N số ít\" đi với động từ chia số ít: \"Each student... has to\"."
        },
        {
          "id": "buoc1-singular-plural-s3",
          "vietnamese": "Nhiều phụ nữ hiện đại đang nắm giữ các vị trí lãnh đạo chủ chốt trong xã hội.",
          "target": "Many modern women hold key leadership positions in society.",
          "masked": [
            "M***",
            "m*****",
            "w****",
            "h***",
            "k**",
            "l*********",
            "p********",
            "i*",
            "s******."
          ],
          "hints": [
            "Many modern women hold",
            "key leadership positions in society"
          ],
          "acceptable": [
            "Many modern women hold key leadership positions in society."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"woman\" -> \"women\". Động từ số nhiều: \"hold\"."
        },
        {
          "id": "buoc1-singular-plural-s4",
          "vietnamese": "Đàn cừu đang gặm cỏ trên sườn đồi xanh ngát.",
          "target": "The sheep are grazing on the lush green hillside.",
          "masked": [
            "T**",
            "s****",
            "a**",
            "g******",
            "o*",
            "t**",
            "l***",
            "g****",
            "h*******."
          ],
          "hints": [
            "The sheep are grazing on",
            "the lush green hillside"
          ],
          "acceptable": [
            "The sheep are grazing on the lush green hillside."
          ],
          "grammarNote": "Danh từ giữ nguyên dạng ở số nhiều: \"sheep\" -> \"The sheep are grazing\"."
        },
        {
          "id": "buoc1-singular-plural-s5",
          "vietnamese": "Hầu hết mọi người đều đồng ý rằng giáo dục là chìa khoá để thành công.",
          "target": "Most people agree that education is the key to success.",
          "masked": [
            "M***",
            "p*****",
            "a****",
            "t***",
            "e********",
            "i*",
            "t**",
            "k**",
            "t*",
            "s******."
          ],
          "hints": [
            "Most people agree that",
            "education is the key to success"
          ],
          "acceptable": [
            "Most people agree that education is the key to success."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"person\" -> \"people\". Động từ số nhiều: \"agree\"."
        },
        {
          "id": "buoc1-singular-plural-s6",
          "vietnamese": "Một đôi giày da cao cấp có thể có giá lên tới hàng trăm đô la.",
          "target": "A pair of premium leather shoes can cost up to hundreds of dollars.",
          "masked": [
            "A",
            "p***",
            "o*",
            "p******",
            "l******",
            "s****",
            "c**",
            "c***",
            "u*",
            "t*",
            "h*******",
            "o*",
            "d******."
          ],
          "hints": [
            "A pair of premium leather shoes",
            "can cost up to hundreds of dollars"
          ],
          "acceptable": [
            "A pair of premium leather shoes can cost up to hundreds of dollars."
          ],
          "grammarNote": "\"A pair of...\" là cụm số ít, nhưng \"shoes\" là danh từ luôn có hai chiếc."
        },
        {
          "id": "buoc1-singular-plural-s7",
          "vietnamese": "Nha sĩ khuyên chúng ta nên đánh răng ít nhất hai lần một ngày.",
          "target": "The dentist advises us to brush our teeth at least twice a day.",
          "masked": [
            "T**",
            "d******",
            "a******",
            "u*",
            "t*",
            "b****",
            "o**",
            "t****",
            "a*",
            "l****",
            "t****",
            "a",
            "d**."
          ],
          "hints": [
            "advises us to brush our teeth",
            "at least twice a day"
          ],
          "acceptable": [
            "The dentist advises us to brush our teeth at least twice a day."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"tooth\" -> \"teeth\"."
        },
        {
          "id": "buoc1-singular-plural-s8",
          "vietnamese": "Báo chí và truyền thông đóng vai trò lớn trong việc định hướng dư luận.",
          "target": "The media play a significant role in shaping public opinion.",
          "masked": [
            "T**",
            "m****",
            "p***",
            "a",
            "s**********",
            "r***",
            "i*",
            "s******",
            "p*****",
            "o******."
          ],
          "hints": [
            "The media play a significant role in",
            "shaping public opinion"
          ],
          "acceptable": [
            "The media play a significant role in shaping public opinion."
          ],
          "grammarNote": "\"Media\" gốc Latinh là số nhiều của \"medium\", có thể đi với \"play\" hoặc \"plays\"."
        },
        {
          "id": "buoc1-singular-plural-s9",
          "vietnamese": "Bác sĩ kiểm tra bàn chân của bệnh nhân để tìm dấu hiệu chấn thương.",
          "target": "The doctor examined the patient's feet for signs of injury.",
          "masked": [
            "T**",
            "d*****",
            "e*******",
            "t**",
            "p********",
            "f***",
            "f**",
            "s****",
            "o*",
            "i*****."
          ],
          "hints": [
            "examined the patient's feet",
            "for signs of injury"
          ],
          "acceptable": [
            "The doctor examined the patient's feet for signs of injury."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"foot\" -> \"feet\"."
        },
        {
          "id": "buoc1-singular-plural-s10",
          "vietnamese": "Hiện tượng này đã thu hút sự chú ý của nhiều nhà thiên văn học trên khắp thế giới.",
          "target": "This phenomenon has attracted the attention of many astronomers worldwide.",
          "masked": [
            "T***",
            "p*********",
            "h**",
            "a********",
            "t**",
            "a********",
            "o*",
            "m***",
            "a**********",
            "w********."
          ],
          "hints": [
            "This phenomenon has attracted",
            "the attention of astronomers worldwide"
          ],
          "acceptable": [
            "This phenomenon has attracted the attention of many astronomers worldwide."
          ],
          "grammarNote": "Số ít: \"phenomenon\"; số nhiều: \"phenomena\"."
        },
        {
          "id": "buoc1-singular-plural-s11",
          "vietnamese": "Những tiêu chí này được sử dụng để đánh giá chất lượng của bài thi viết.",
          "target": "These criteria are used to evaluate the quality of the writing test.",
          "masked": [
            "T****",
            "c*******",
            "a**",
            "u***",
            "t*",
            "e*******",
            "t**",
            "q******",
            "o*",
            "t**",
            "w******",
            "t***."
          ],
          "hints": [
            "These criteria are used to evaluate",
            "the quality of the writing test"
          ],
          "acceptable": [
            "These criteria are used to evaluate the quality of the writing test."
          ],
          "grammarNote": "Số ít: \"criterion\"; số nhiều: \"criteria\" -> đi với \"these\" và \"are\"."
        },
        {
          "id": "buoc1-singular-plural-s12",
          "vietnamese": "Một số loài cá sống ở vùng nước sâu có khả năng tự phát sáng.",
          "target": "Several species of fish living in deep water are bioluminescent.",
          "masked": [
            "S******",
            "s******",
            "o*",
            "f***",
            "l*****",
            "i*",
            "d***",
            "w****",
            "a**",
            "b*************."
          ],
          "hints": [
            "Several species of fish living in deep water",
            "are bioluminescent"
          ],
          "acceptable": [
            "Several species of fish living in deep water are bioluminescent."
          ],
          "grammarNote": "\"Fish\" và \"species\" đều giữ nguyên hình thái ở số ít và số nhiều."
        },
        {
          "id": "buoc1-singular-plural-s13",
          "vietnamese": "Cả hai thành phố đều có hệ thống tàu điện ngầm hiện đại.",
          "target": "Both cities have modern subway systems.",
          "masked": [
            "B***",
            "c*****",
            "h***",
            "m*****",
            "s*****",
            "s******."
          ],
          "hints": [
            "Both cities have",
            "modern subway systems"
          ],
          "acceptable": [
            "Both cities have modern subway systems."
          ],
          "grammarNote": "\"Both + N số nhiều\" đi với động từ số nhiều: \"Both cities have...\"."
        },
        {
          "id": "buoc1-singular-plural-s14",
          "vietnamese": "Không có học sinh nào trong lớp có thể giải được bài toán hóc búa này.",
          "target": "None of the students in the class was able to solve this tricky math problem.",
          "masked": [
            "N***",
            "o*",
            "t**",
            "s*******",
            "i*",
            "t**",
            "c****",
            "w**",
            "a***",
            "t*",
            "s****",
            "t***",
            "t*****",
            "m***",
            "p******."
          ],
          "hints": [
            "None of the students was/were able to solve",
            "this tricky math problem"
          ],
          "acceptable": [
            "None of the students in the class was able to solve this tricky math problem."
          ],
          "grammarNote": "\"None of the + N số nhiều\" trang trọng dùng động từ số ít (\"was\")."
        },
        {
          "id": "buoc1-singular-plural-s15",
          "vietnamese": "Môn toán học luôn là một trong những môn học yêu thích của tôi.",
          "target": "Mathematics is always one of my favorite subjects.",
          "masked": [
            "M**********",
            "i*",
            "a*****",
            "o**",
            "o*",
            "m*",
            "f*******",
            "s*******."
          ],
          "hints": [
            "Mathematics is always one of",
            "my favorite subjects"
          ],
          "acceptable": [
            "Mathematics is always one of my favorite subjects."
          ],
          "grammarNote": "Tên môn học đuôi \"-s\" (\"Mathematics\") chia động từ số ít (\"is\")."
        },
        {
          "id": "buoc1-singular-plural-s16",
          "vietnamese": "Chiếc kéo này quá cùn để cắt miếng bìa carton dày.",
          "target": "These scissors are too blunt to cut the thick cardboard.",
          "masked": [
            "T****",
            "s*******",
            "a**",
            "t**",
            "b****",
            "t*",
            "c**",
            "t**",
            "t****",
            "c********."
          ],
          "hints": [
            "These scissors are too blunt to",
            "cut the thick cardboard"
          ],
          "acceptable": [
            "These scissors are too blunt to cut the thick cardboard."
          ],
          "grammarNote": "\"Scissors\" luôn ở dạng số nhiều (\"these scissors are\")."
        },
        {
          "id": "buoc1-singular-plural-s17",
          "vietnamese": "Các phân tích dữ liệu chỉ ra rằng xu hướng này sẽ tiếp diễn trong tương lai.",
          "target": "Data analyses indicate that this trend will continue in the future.",
          "masked": [
            "D***",
            "a*******",
            "i*******",
            "t***",
            "t***",
            "t****",
            "w***",
            "c*******",
            "i*",
            "t**",
            "f*****."
          ],
          "hints": [
            "Data analyses indicate that",
            "this trend will continue"
          ],
          "acceptable": [
            "Data analyses indicate that this trend will continue in the future."
          ],
          "grammarNote": "Số ít: \"analysis\"; số nhiều: \"analyses\" -> động từ số nhiều \"indicate\"."
        },
        {
          "id": "buoc1-singular-plural-s18",
          "vietnamese": "Một bầy ngỗng trắng đang bơi lội thanh bình trên mặt hồ.",
          "target": "A flock of white geese is swimming peacefully on the lake.",
          "masked": [
            "A",
            "f****",
            "o*",
            "w****",
            "g****",
            "i*",
            "s*******",
            "p*********",
            "o*",
            "t**",
            "l***."
          ],
          "hints": [
            "A flock of white geese is swimming peacefully",
            "on the lake"
          ],
          "acceptable": [
            "A flock of white geese is swimming peacefully on the lake."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"goose\" -> \"geese\". Tập hợp: \"A flock of... is\"."
        },
        {
          "id": "buoc1-singular-plural-s19",
          "vietnamese": "Cảnh sát đang điều tra nguyên nhân vụ tai nạn giao thông nghiêm trọng.",
          "target": "The police are investigating the cause of the serious traffic accident.",
          "masked": [
            "T**",
            "p*****",
            "a**",
            "i************",
            "t**",
            "c****",
            "o*",
            "t**",
            "s******",
            "t******",
            "a*******."
          ],
          "hints": [
            "The police are investigating",
            "the cause of the serious traffic accident"
          ],
          "acceptable": [
            "The police are investigating the cause of the serious traffic accident."
          ],
          "grammarNote": "\"The police\" luôn là danh từ số nhiều, đi với \"are\", không dùng \"is\"."
        },
        {
          "id": "buoc1-singular-plural-s20",
          "vietnamese": "Tin tức về vụ phun trào núi lửa đã khiến nhiều người lo lắng.",
          "target": "The news about the volcanic eruption has caused many people to worry.",
          "masked": [
            "T**",
            "n***",
            "a****",
            "t**",
            "v*******",
            "e*******",
            "h**",
            "c*****",
            "m***",
            "p*****",
            "t*",
            "w****."
          ],
          "hints": [
            "The news about the volcanic eruption has caused",
            "people to worry"
          ],
          "acceptable": [
            "The news about the volcanic eruption has caused many people to worry."
          ],
          "grammarNote": "\"News\" là danh từ không đếm được số ít -> \"has caused\"."
        },
        {
          "id": "buoc1-singular-plural-s21",
          "vietnamese": "Nhiều người đàn ông và phụ nữ đã tình nguyện tham gia chiến dịch trồng cây.",
          "target": "Many men and women volunteered to participate in the tree-planting campaign.",
          "masked": [
            "M***",
            "m**",
            "a**",
            "w****",
            "v**********",
            "t*",
            "p**********",
            "i*",
            "t**",
            "t************",
            "c*******."
          ],
          "hints": [
            "Many men and women volunteered to",
            "participate in the tree-planting campaign"
          ],
          "acceptable": [
            "Many men and women volunteered to participate in the tree-planting campaign."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"man\" -> \"men\", \"woman\" -> \"women\"."
        },
        {
          "id": "buoc1-singular-plural-s22",
          "vietnamese": "Đàn chuột đã cắn đứt dây điện trong tầng hầm của toà nhà.",
          "target": "Mice have chewed through the electrical cables in the building basement.",
          "masked": [
            "M***",
            "h***",
            "c*****",
            "t******",
            "t**",
            "e*********",
            "c*****",
            "i*",
            "t**",
            "b*******",
            "b*******."
          ],
          "hints": [
            "Mice have chewed through",
            "electrical cables in the basement"
          ],
          "acceptable": [
            "Mice have chewed through the electrical cables in the building basement."
          ],
          "grammarNote": "Số nhiều bất quy tắc: \"mouse\" -> \"mice\"."
        },
        {
          "id": "buoc1-singular-plural-s23",
          "vietnamese": "Khoảng cách 10 dặm là quá xa để có thể đi bộ mỗi ngày.",
          "target": "Ten miles is too long a distance to walk every day.",
          "masked": [
            "T**",
            "m****",
            "i*",
            "t**",
            "l***",
            "a",
            "d*******",
            "t*",
            "w***",
            "e****",
            "d**."
          ],
          "hints": [
            "Ten miles is too long a distance to",
            "walk every day"
          ],
          "acceptable": [
            "Ten miles is too long a distance to walk every day."
          ],
          "grammarNote": "Khoảng cách được coi như một thể thống nhất -> dùng số ít (\"Ten miles is...\")."
        },
        {
          "id": "buoc1-singular-plural-s24",
          "vietnamese": "Hai phần ba diện tích bề mặt Trái Đất được bao phủ bởi nước.",
          "target": "Two-thirds of the Earth's surface is covered by water.",
          "masked": [
            "T*********",
            "o*",
            "t**",
            "E******",
            "s******",
            "i*",
            "c******",
            "b*",
            "w****."
          ],
          "hints": [
            "Two-thirds of the Earth's surface is covered by",
            "water"
          ],
          "acceptable": [
            "Two-thirds of the Earth's surface is covered by water."
          ],
          "grammarNote": "Phân số đi với danh từ không đếm được (\"surface\") -> số ít: \"is covered\"."
        },
        {
          "id": "buoc1-singular-plural-s25",
          "vietnamese": "Quần áo ấm là vật dụng thiết yếu khi đi du lịch ở xứ lạnh.",
          "target": "Warm clothes are essential items when traveling in cold regions.",
          "masked": [
            "W***",
            "c******",
            "a**",
            "e********",
            "i****",
            "w***",
            "t********",
            "i*",
            "c***",
            "r******."
          ],
          "hints": [
            "Warm clothes are essential items when",
            "traveling in cold regions"
          ],
          "acceptable": [
            "Warm clothes are essential items when traveling in cold regions."
          ],
          "grammarNote": "\"Clothes\" luôn ở số nhiều (\"clothes are\")."
        }
      ]
    },
    {
      "id": "buoc1-passive-voice",
      "aliasIds": [
        "write-passive-voice"
      ],
      "title": "Câu bị động (Passive Voice)",
      "step": "Bước 1",
      "level": "B1 - B2",
      "desc": "Luyện dịch 25 câu bị động học thuật chuẩn phong cách khách quan của IELTS Academic Writing.",
      "sentences": [
        {
          "id": "buoc1-passive-voice-s1",
          "vietnamese": "Toà nhà chọc trời này được xây dựng bởi một nhà thầu nổi tiếng thế giới.",
          "target": "This skyscraper was constructed by a world-renowned contractor.",
          "masked": [
            "T***",
            "s*********",
            "w**",
            "c**********",
            "b*",
            "a",
            "w*************",
            "c*********."
          ],
          "hints": [
            "was constructed by",
            "a world-renowned contractor"
          ],
          "acceptable": [
            "This skyscraper was constructed by a world-renowned contractor."
          ],
          "grammarNote": "Bị động quá khứ đơn: was/were + V3/ed. Từ vựng: \"world-renowned\"."
        },
        {
          "id": "buoc1-passive-voice-s2",
          "vietnamese": "Các biện pháp khẩn cấp cần được thực hiện ngay lập tức để giảm thiểu ô nhiễm.",
          "target": "Urgent measures must be taken immediately to mitigate pollution.",
          "masked": [
            "U*****",
            "m*******",
            "m***",
            "b*",
            "t****",
            "i**********",
            "t*",
            "m*******",
            "p********."
          ],
          "hints": [
            "Urgent measures must be taken",
            "immediately to mitigate pollution"
          ],
          "acceptable": [
            "Urgent measures must be taken immediately to mitigate pollution."
          ],
          "grammarNote": "Bị động khiếm khuyết: modal verb + be + V3/ed (\"must be taken\")."
        },
        {
          "id": "buoc1-passive-voice-s3",
          "vietnamese": "Nhiều bài báo khoa học đã được xuất bản trên các tạp chí quốc tế uy tín.",
          "target": "Many scientific papers have been published in prestigious international journals.",
          "masked": [
            "M***",
            "s*********",
            "p*****",
            "h***",
            "b***",
            "p********",
            "i*",
            "p**********",
            "i************",
            "j*******."
          ],
          "hints": [
            "have been published in",
            "prestigious international journals"
          ],
          "acceptable": [
            "Many scientific papers have been published in prestigious international journals."
          ],
          "grammarNote": "Bị động HTHT: have/has been + V3/ed (\"have been published\")."
        },
        {
          "id": "buoc1-passive-voice-s4",
          "vietnamese": "Quyết định cuối cùng sẽ được công bố vào cuộc họp báo vào sáng mai.",
          "target": "The final decision will be announced at the press conference tomorrow morning.",
          "masked": [
            "T**",
            "f****",
            "d*******",
            "w***",
            "b*",
            "a********",
            "a*",
            "t**",
            "p****",
            "c*********",
            "t*******",
            "m******."
          ],
          "hints": [
            "will be announced at",
            "the press conference tomorrow morning"
          ],
          "acceptable": [
            "The final decision will be announced at the press conference tomorrow morning."
          ],
          "grammarNote": "Bị động tương lai đơn: will be + V3/ed (\"will be announced\")."
        },
        {
          "id": "buoc1-passive-voice-s5",
          "vietnamese": "Tiếng Anh được sử dụng như một ngôn ngữ giao tiếp quốc tế trên toàn cầu.",
          "target": "English is used as a global lingua franca around the world.",
          "masked": [
            "E******",
            "i*",
            "u***",
            "a*",
            "a",
            "g*****",
            "l*****",
            "f*****",
            "a*****",
            "t**",
            "w****."
          ],
          "hints": [
            "is used as a global lingua franca",
            "around the world"
          ],
          "acceptable": [
            "English is used as a global lingua franca around the world."
          ],
          "grammarNote": "Bị động hiện tại đơn: is/are + V3/ed. Thuật ngữ: \"lingua franca\"."
        },
        {
          "id": "buoc1-passive-voice-s6",
          "vietnamese": "Một tuyến đường sắt trên cao mới đang được xây dựng ở khu vực phía Tây thành phố.",
          "target": "A new elevated railway is being constructed in the western part of the city.",
          "masked": [
            "A",
            "n**",
            "e*******",
            "r******",
            "i*",
            "b****",
            "c**********",
            "i*",
            "t**",
            "w******",
            "p***",
            "o*",
            "t**",
            "c***."
          ],
          "hints": [
            "is being constructed in",
            "the western part of the city"
          ],
          "acceptable": [
            "A new elevated railway is being constructed in the western part of the city."
          ],
          "grammarNote": "Bị động tiếp diễn: is/are being + V3/ed (\"is being constructed\")."
        },
        {
          "id": "buoc1-passive-voice-s7",
          "vietnamese": "Người ta tin rằng chế độ ăn nhiều rau xanh giúp ngăn ngừa bệnh tim mạch.",
          "target": "It is believed that a diet rich in vegetables helps prevent cardiovascular disease.",
          "masked": [
            "I*",
            "i*",
            "b*******",
            "t***",
            "a",
            "d***",
            "r***",
            "i*",
            "v*********",
            "h****",
            "p******",
            "c*************",
            "d******."
          ],
          "hints": [
            "It is believed that",
            "cardiovascular disease"
          ],
          "acceptable": [
            "It is believed that a diet rich in vegetables helps prevent cardiovascular disease."
          ],
          "grammarNote": "Bị động khách quan: \"It is believed / reported that...\"."
        },
        {
          "id": "buoc1-passive-voice-s8",
          "vietnamese": "Dữ liệu cá nhân của người dùng phải được bảo vệ nghiêm ngặt chống lại tin tặc.",
          "target": "Users' personal data must be strictly protected against cyber hackers.",
          "masked": [
            "U****'",
            "p*******",
            "d***",
            "m***",
            "b*",
            "s*******",
            "p********",
            "a******",
            "c****",
            "h******."
          ],
          "hints": [
            "must be strictly protected against",
            "cyber hackers"
          ],
          "acceptable": [
            "Users' personal data must be strictly protected against cyber hackers."
          ],
          "grammarNote": "Modal passive: \"must be strictly protected against...\"."
        },
        {
          "id": "buoc1-passive-voice-s9",
          "vietnamese": "Bức tranh quý giá đã bị đánh cắp khỏi bảo tàng nghệ thuật vào đêm qua.",
          "target": "The priceless painting was stolen from the art museum last night.",
          "masked": [
            "T**",
            "p********",
            "p*******",
            "w**",
            "s*****",
            "f***",
            "t**",
            "a**",
            "m*****",
            "l***",
            "n****."
          ],
          "hints": [
            "The priceless painting was stolen from",
            "the art museum last night"
          ],
          "acceptable": [
            "The priceless painting was stolen from the art museum last night."
          ],
          "grammarNote": "Bị động quá khứ đơn: was stolen (steal - stole - stolen)."
        },
        {
          "id": "buoc1-passive-voice-s10",
          "vietnamese": "Nhiều trường học ở vùng sâu vùng xa đã được tài trợ máy tính xách tay.",
          "target": "Many schools in remote areas have been funded with laptops.",
          "masked": [
            "M***",
            "s******",
            "i*",
            "r*****",
            "a****",
            "h***",
            "b***",
            "f*****",
            "w***",
            "l******."
          ],
          "hints": [
            "have been funded with laptops",
            "in remote areas"
          ],
          "acceptable": [
            "Many schools in remote areas have been funded with laptops."
          ],
          "grammarNote": "Bị động HTHT: \"have been funded with\"."
        },
        {
          "id": "buoc1-passive-voice-s11",
          "vietnamese": "Rác thải nhựa không nên bị xả bừa bãi ra các đại dương và sông ngòi.",
          "target": "Plastic waste should not be dumped indiscriminately into oceans and rivers.",
          "masked": [
            "P******",
            "w****",
            "s*****",
            "n**",
            "b*",
            "d*****",
            "i***************",
            "i***",
            "o*****",
            "a**",
            "r*****."
          ],
          "hints": [
            "should not be dumped indiscriminately into",
            "oceans and rivers"
          ],
          "acceptable": [
            "Plastic waste should not be dumped indiscriminately into oceans and rivers."
          ],
          "grammarNote": "Trạng từ hay: \"indiscriminately\" (bừa bãi, không phân biệt)."
        },
        {
          "id": "buoc1-passive-voice-s12",
          "vietnamese": "Kỳ thi tốt nghiệp đã được hoãn lại do ảnh hưởng của cơn bão số 3.",
          "target": "The graduation examination was postponed due to the impact of Typhoon No. 3.",
          "masked": [
            "T**",
            "g*********",
            "e**********",
            "w**",
            "p********",
            "d**",
            "t*",
            "t**",
            "i*****",
            "o*",
            "T******",
            "N*.",
            "3."
          ],
          "hints": [
            "was postponed due to",
            "the impact of Typhoon No. 3"
          ],
          "acceptable": [
            "The graduation examination was postponed due to the impact of Typhoon No. 3."
          ],
          "grammarNote": "Từ vựng: \"postpone / delay\" (trì hoãn)."
        },
        {
          "id": "buoc1-passive-voice-s13",
          "vietnamese": "Tác phẩm văn học kinh điển này đã được dịch ra hơn 50 thứ tiếng.",
          "target": "This classic literary work has been translated into more than 50 languages.",
          "masked": [
            "T***",
            "c******",
            "l*******",
            "w***",
            "h**",
            "b***",
            "t*********",
            "i***",
            "m***",
            "t***",
            "5*",
            "l********."
          ],
          "hints": [
            "has been translated into",
            "more than 50 languages"
          ],
          "acceptable": [
            "This classic literary work has been translated into more than 50 languages."
          ],
          "grammarNote": "Cấu trúc bị động: \"be translated into a language\"."
        },
        {
          "id": "buoc1-passive-voice-s14",
          "vietnamese": "Bệnh nhân được bác sĩ yêu cầu phải nghỉ ngơi tuyệt đối trong một tuần.",
          "target": "The patient was requested by the doctor to have complete bed rest for a week.",
          "masked": [
            "T**",
            "p******",
            "w**",
            "r********",
            "b*",
            "t**",
            "d*****",
            "t*",
            "h***",
            "c*******",
            "b**",
            "r***",
            "f**",
            "a",
            "w***."
          ],
          "hints": [
            "was requested to have complete bed rest",
            "for a week"
          ],
          "acceptable": [
            "The patient was requested by the doctor to have complete bed rest for a week."
          ],
          "grammarNote": "Cấu trúc: \"be requested/told to do something\"."
        },
        {
          "id": "buoc1-passive-voice-s15",
          "vietnamese": "Hội nghị thượng đỉnh quốc tế đang được tổ chức tại thủ đô Hà Nội.",
          "target": "The international summit is being hosted in the capital city of Hanoi.",
          "masked": [
            "T**",
            "i************",
            "s*****",
            "i*",
            "b****",
            "h*****",
            "i*",
            "t**",
            "c******",
            "c***",
            "o*",
            "H****."
          ],
          "hints": [
            "is being hosted in",
            "the capital city of Hanoi"
          ],
          "acceptable": [
            "The international summit is being hosted in the capital city of Hanoi."
          ],
          "grammarNote": "Bị động tiếp diễn: \"is being hosted / held in...\"."
        },
        {
          "id": "buoc1-passive-voice-s16",
          "vietnamese": "Mọi thắc mắc của khách hàng sẽ được giải đáp trong vòng 24 giờ làm việc.",
          "target": "All customer inquiries will be addressed within 24 working hours.",
          "masked": [
            "A**",
            "c*******",
            "i********",
            "w***",
            "b*",
            "a********",
            "w*****",
            "2*",
            "w******",
            "h****."
          ],
          "hints": [
            "will be addressed within",
            "24 working hours"
          ],
          "acceptable": [
            "All customer inquiries will be addressed within 24 working hours."
          ],
          "grammarNote": "Từ học thuật: \"address an inquiry\" (giải đáp thắc mắc)."
        },
        {
          "id": "buoc1-passive-voice-s17",
          "vietnamese": "Rất nhiều việc làm mới đã được tạo ra nhờ sự đầu tư của các tập đoàn nước ngoài.",
          "target": "Numerous new jobs have been generated thanks to the investment of foreign corporations.",
          "masked": [
            "N*******",
            "n**",
            "j***",
            "h***",
            "b***",
            "g********",
            "t*****",
            "t*",
            "t**",
            "i*********",
            "o*",
            "f******",
            "c***********."
          ],
          "hints": [
            "have been generated thanks to",
            "investment of foreign corporations"
          ],
          "acceptable": [
            "Numerous new jobs have been generated thanks to the investment of foreign corporations."
          ],
          "grammarNote": "Động từ: \"generate jobs\" (tạo ra việc làm)."
        },
        {
          "id": "buoc1-passive-voice-s18",
          "vietnamese": "Chiếc xe hơi này đã được sửa chữa trước khi người bán bàn giao cho tôi.",
          "target": "This car had been repaired before the seller handed it over to me.",
          "masked": [
            "T***",
            "c**",
            "h**",
            "b***",
            "r*******",
            "b*****",
            "t**",
            "s*****",
            "h*****",
            "i*",
            "o***",
            "t*",
            "m*."
          ],
          "hints": [
            "had been repaired before",
            "the seller handed it over to me"
          ],
          "acceptable": [
            "This car had been repaired before the seller handed it over to me."
          ],
          "grammarNote": "Bị động quá khứ hoàn thành: had been + V3/ed."
        },
        {
          "id": "buoc1-passive-voice-s19",
          "vietnamese": "Trẻ vị thành niên không được phép xem các nội dung có yếu tố bạo lực.",
          "target": "Minors are not permitted to view content containing elements of violence.",
          "masked": [
            "M*****",
            "a**",
            "n**",
            "p********",
            "t*",
            "v***",
            "c******",
            "c*********",
            "e*******",
            "o*",
            "v*******."
          ],
          "hints": [
            "Minors are not permitted to view",
            "content containing violence"
          ],
          "acceptable": [
            "Minors are not permitted to view content containing elements of violence."
          ],
          "grammarNote": "Cấu trúc bị động: \"be permitted to do something\"."
        },
        {
          "id": "buoc1-passive-voice-s20",
          "vietnamese": "Người ta ước tính rằng hơn một triệu người đã bị ảnh hưởng bởi đợt hạn hán.",
          "target": "It is estimated that over one million people have been affected by the drought.",
          "masked": [
            "I*",
            "i*",
            "e********",
            "t***",
            "o***",
            "o**",
            "m******",
            "p*****",
            "h***",
            "b***",
            "a*******",
            "b*",
            "t**",
            "d******."
          ],
          "hints": [
            "It is estimated that",
            "have been affected by the drought"
          ],
          "acceptable": [
            "It is estimated that over one million people have been affected by the drought."
          ],
          "grammarNote": "Bị động khách quan: \"It is estimated that...\"."
        },
        {
          "id": "buoc1-passive-voice-s21",
          "vietnamese": "Bản hợp đồng quan trọng này phải được ký bởi cả hai bên trước khi có hiệu lực.",
          "target": "This important contract must be signed by both parties before taking effect.",
          "masked": [
            "T***",
            "i********",
            "c*******",
            "m***",
            "b*",
            "s*****",
            "b*",
            "b***",
            "p******",
            "b*****",
            "t*****",
            "e*****."
          ],
          "hints": [
            "must be signed by both parties",
            "before taking effect"
          ],
          "acceptable": [
            "This important contract must be signed by both parties before taking effect."
          ],
          "grammarNote": "Thành ngữ: \"take effect\" (có hiệu lực)."
        },
        {
          "id": "buoc1-passive-voice-s22",
          "vietnamese": "Các toà nhà cũ kỹ đã bị phá dỡ để nhường chỗ cho công viên công cộng.",
          "target": "Old dilapidated buildings were demolished to make way for a public park.",
          "masked": [
            "O**",
            "d**********",
            "b********",
            "w***",
            "d*********",
            "t*",
            "m***",
            "w**",
            "f**",
            "a",
            "p*****",
            "p***."
          ],
          "hints": [
            "were demolished to make way for",
            "a public park"
          ],
          "acceptable": [
            "Old dilapidated buildings were demolished to make way for a public park."
          ],
          "grammarNote": "Từ vựng C1: \"demolish\", \"make way for\"."
        },
        {
          "id": "buoc1-passive-voice-s23",
          "vietnamese": "Tất cả các khoản phí vận chuyển đã được bao gồm trong tổng hoá đơn.",
          "target": "All shipping fees have been included in the total invoice.",
          "masked": [
            "A**",
            "s*******",
            "f***",
            "h***",
            "b***",
            "i*******",
            "i*",
            "t**",
            "t****",
            "i******."
          ],
          "hints": [
            "have been included in the total invoice"
          ],
          "acceptable": [
            "All shipping fees have been included in the total invoice."
          ],
          "grammarNote": "Bị động: \"be included in\"."
        },
        {
          "id": "buoc1-passive-voice-s24",
          "vietnamese": "Các bài giảng trực tuyến có thể được truy cập bởi sinh viên ở bất cứ đâu.",
          "target": "Online lectures can be accessed by students from anywhere.",
          "masked": [
            "O*****",
            "l*******",
            "c**",
            "b*",
            "a*******",
            "b*",
            "s*******",
            "f***",
            "a*******."
          ],
          "hints": [
            "can be accessed by students from anywhere"
          ],
          "acceptable": [
            "Online lectures can be accessed by students from anywhere."
          ],
          "grammarNote": "Bị động: \"can be accessed by\"."
        },
        {
          "id": "buoc1-passive-voice-s25",
          "vietnamese": "Vấn đề biến đổi khí hậu được xem là một trong những thách thức lớn nhất của nhân loại.",
          "target": "Climate change is regarded as one of the greatest challenges facing humanity.",
          "masked": [
            "C******",
            "c*****",
            "i*",
            "r*******",
            "a*",
            "o**",
            "o*",
            "t**",
            "g*******",
            "c*********",
            "f*****",
            "h*******."
          ],
          "hints": [
            "is regarded as one of the greatest challenges",
            "facing humanity"
          ],
          "acceptable": [
            "Climate change is regarded as one of the greatest challenges facing humanity."
          ],
          "grammarNote": "Bị động: \"be regarded as / considered as\"."
        }
      ]
    },
    {
      "id": "buoc1-comparison",
      "aliasIds": [
        "write-comparison"
      ],
      "title": "Câu so sánh (Comparison)",
      "step": "Bước 1",
      "level": "B1 - B2",
      "desc": "Luyện dịch 25 câu so sánh hơn, so sánh nhất, so sánh bằng và so sánh kép (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc1-comparison-s1",
          "vietnamese": "Sức khỏe quan trọng hơn tiền bạc.",
          "target": "Health is more important than money.",
          "masked": [
            "H*****",
            "i*",
            "m***",
            "i********",
            "t***",
            "m****."
          ],
          "hints": [
            "Health is more important than money"
          ],
          "acceptable": [
            "Health is more important than money."
          ],
          "grammarNote": "So sánh hơn tính từ dài: more + adj + than."
        },
        {
          "id": "buoc1-comparison-s2",
          "vietnamese": "Sống ở các thành phố lớn đắt đỏ hơn nhiều so với sống ở nông thôn.",
          "target": "Living in major cities is much more expensive than living in the countryside.",
          "masked": [
            "L*****",
            "i*",
            "m****",
            "c*****",
            "i*",
            "m***",
            "m***",
            "e********",
            "t***",
            "l*****",
            "i*",
            "t**",
            "c**********."
          ],
          "hints": [
            "Living in major cities is much more expensive than",
            "living in the countryside"
          ],
          "acceptable": [
            "Living in major cities is much more expensive than living in the countryside."
          ],
          "grammarNote": "Trạng từ nhấn mạnh so sánh: \"much / far more expensive\"."
        },
        {
          "id": "buoc1-comparison-s3",
          "vietnamese": "Đây là cuốn sách thú vị nhất mà tôi từng đọc về tâm lý học hành vi.",
          "target": "This is the most interesting book I have ever read on behavioral psychology.",
          "masked": [
            "T***",
            "i*",
            "t**",
            "m***",
            "i**********",
            "b***",
            "I",
            "h***",
            "e***",
            "r***",
            "o*",
            "b*********",
            "p*********."
          ],
          "hints": [
            "This is the most interesting book",
            "I have ever read on behavioral psychology"
          ],
          "acceptable": [
            "This is the most interesting book I have ever read on behavioral psychology."
          ],
          "grammarNote": "So sánh nhất kết hợp thì HTHT: \"the most + adj + N + S + have ever V3/ed\"."
        },
        {
          "id": "buoc1-comparison-s4",
          "vietnamese": "Giao thông công cộng tiện lợi hơn và thân thiện với môi trường hơn xe cá nhân.",
          "target": "Public transport is more convenient and environmentally friendly than private vehicles.",
          "masked": [
            "P*****",
            "t********",
            "i*",
            "m***",
            "c*********",
            "a**",
            "e**************",
            "f*******",
            "t***",
            "p******",
            "v*******."
          ],
          "hints": [
            "Public transport is more convenient and",
            "environmentally friendly than private vehicles"
          ],
          "acceptable": [
            "Public transport is more convenient and environmentally friendly than private vehicles."
          ],
          "grammarNote": "Tính từ ghép: \"environmentally friendly\"."
        },
        {
          "id": "buoc1-comparison-s5",
          "vietnamese": "Càng học nhiều từ vựng, bạn sẽ càng cảm thấy tự tin hơn khi nói tiếng Anh.",
          "target": "The more vocabulary you learn, the more confident you will feel when speaking English.",
          "masked": [
            "T**",
            "m***",
            "v*********",
            "y**",
            "l****,",
            "t**",
            "m***",
            "c********",
            "y**",
            "w***",
            "f***",
            "w***",
            "s*******",
            "E******."
          ],
          "hints": [
            "The more vocabulary you learn,",
            "the more confident you will feel"
          ],
          "acceptable": [
            "The more vocabulary you learn, the more confident you will feel when speaking English."
          ],
          "grammarNote": "So sánh kép: The more + S + V, the more + adj + S + V."
        },
        {
          "id": "buoc1-comparison-s6",
          "vietnamese": "Chất lượng không khí ở vùng ngoại ô trong lành hơn nhiều so với khu vực nội thành.",
          "target": "Air quality in the suburbs is much cleaner than that in the inner city.",
          "masked": [
            "A**",
            "q******",
            "i*",
            "t**",
            "s******",
            "i*",
            "m***",
            "c******",
            "t***",
            "t***",
            "i*",
            "t**",
            "i****",
            "c***."
          ],
          "hints": [
            "Air quality in the suburbs is much cleaner than",
            "that in the inner city"
          ],
          "acceptable": [
            "Air quality in the suburbs is much cleaner than that in the inner city."
          ],
          "grammarNote": "Đại từ thay thế \"that\" tránh lặp lại danh từ \"air quality\"."
        },
        {
          "id": "buoc1-comparison-s7",
          "vietnamese": "Giá vé máy bay trong mùa cao điểm đắt gấp đôi so với ngày thường.",
          "target": "Airfares during peak season are twice as expensive as on regular days.",
          "masked": [
            "A*******",
            "d*****",
            "p***",
            "s*****",
            "a**",
            "t****",
            "a*",
            "e********",
            "a*",
            "o*",
            "r******",
            "d***."
          ],
          "hints": [
            "Airfares during peak season are twice as expensive as",
            "on regular days"
          ],
          "acceptable": [
            "Airfares during peak season are twice as expensive as on regular days."
          ],
          "grammarNote": "So sánh bội số: S + be + twice + as + adj + as + O."
        },
        {
          "id": "buoc1-comparison-s8",
          "vietnamese": "Tiếng Anh của anh ấy ngày càng trở nên lưu loát hơn nhờ luyện tập mỗi ngày.",
          "target": "His English is becoming more and more fluent thanks to daily practice.",
          "masked": [
            "H**",
            "E******",
            "i*",
            "b*******",
            "m***",
            "a**",
            "m***",
            "f*****",
            "t*****",
            "t*",
            "d****",
            "p*******."
          ],
          "hints": [
            "is becoming more and more fluent",
            "thanks to daily practice"
          ],
          "acceptable": [
            "His English is becoming more and more fluent thanks to daily practice."
          ],
          "grammarNote": "So sánh lũy tiến: \"more and more + adj\"."
        },
        {
          "id": "buoc1-comparison-s9",
          "vietnamese": "Mua sắm trực tuyến không thuận tiện bằng việc thử đồ trực tiếp tại cửa hàng.",
          "target": "Online shopping is not as convenient as trying clothes on in person at the store.",
          "masked": [
            "O*****",
            "s*******",
            "i*",
            "n**",
            "a*",
            "c*********",
            "a*",
            "t*****",
            "c******",
            "o*",
            "i*",
            "p*****",
            "a*",
            "t**",
            "s****."
          ],
          "hints": [
            "is not as convenient as",
            "trying clothes on in person at the store"
          ],
          "acceptable": [
            "Online shopping is not as convenient as trying clothes on in person at the store."
          ],
          "grammarNote": "So sánh không bằng: \"not as + adj + as...\"."
        },
        {
          "id": "buoc1-comparison-s10",
          "vietnamese": "Năng lượng mặt trời là một trong những nguồn năng lượng sạch nhất hiện nay.",
          "target": "Solar energy is one of the cleanest energy sources available today.",
          "masked": [
            "S****",
            "e*****",
            "i*",
            "o**",
            "o*",
            "t**",
            "c*******",
            "e*****",
            "s******",
            "a********",
            "t****."
          ],
          "hints": [
            "is one of the cleanest energy sources",
            "available today"
          ],
          "acceptable": [
            "Solar energy is one of the cleanest energy sources available today."
          ],
          "grammarNote": "Cấu trúc: \"one of the + superlative adj + plural N\"."
        },
        {
          "id": "buoc1-comparison-s11",
          "vietnamese": "Khí hậu ở Đà Lạt mát mẻ hơn nhiều so với thời tiết ngột ngạt ở Thành phố Hồ Chí Minh.",
          "target": "The climate in Da Lat is considerably cooler than the sweltering weather in Ho Chi Minh City.",
          "masked": [
            "T**",
            "c******",
            "i*",
            "D*",
            "L**",
            "i*",
            "c***********",
            "c*****",
            "t***",
            "t**",
            "s*********",
            "w******",
            "i*",
            "H*",
            "C**",
            "M***",
            "C***."
          ],
          "hints": [
            "is considerably cooler than",
            "sweltering weather in Ho Chi Minh City"
          ],
          "acceptable": [
            "The climate in Da Lat is considerably cooler than the sweltering weather in Ho Chi Minh City."
          ],
          "grammarNote": "Từ vựng C1: \"sweltering\" (nóng oi bức)."
        },
        {
          "id": "buoc1-comparison-s12",
          "vietnamese": "Càng bắt đầu sớm, bạn sẽ càng có nhiều thời gian để chuẩn bị cho kỳ thi.",
          "target": "The earlier you start, the more time you will have to prepare for the examination.",
          "masked": [
            "T**",
            "e******",
            "y**",
            "s****,",
            "t**",
            "m***",
            "t***",
            "y**",
            "w***",
            "h***",
            "t*",
            "p******",
            "f**",
            "t**",
            "e**********."
          ],
          "hints": [
            "The earlier you start,",
            "the more time you will have to prepare"
          ],
          "acceptable": [
            "The earlier you start, the more time you will have to prepare for the examination."
          ],
          "grammarNote": "So sánh kép: \"The earlier..., the more time...\"."
        },
        {
          "id": "buoc1-comparison-s13",
          "vietnamese": "Toà nhà Landmark 81 là toà nhà cao nhất tại Việt Nam.",
          "target": "Landmark 81 is the tallest building in Vietnam.",
          "masked": [
            "L*******",
            "8*",
            "i*",
            "t**",
            "t******",
            "b*******",
            "i*",
            "V******."
          ],
          "hints": [
            "Landmark 81 is the tallest building in Vietnam"
          ],
          "acceptable": [
            "Landmark 81 is the tallest building in Vietnam."
          ],
          "grammarNote": "So sánh nhất tính từ ngắn: the + adj-est."
        },
        {
          "id": "buoc1-comparison-s14",
          "vietnamese": "Chi phí sinh hoạt ở Tokyo cao hơn hầu hết các thành phố khác ở châu Á.",
          "target": "The cost of living in Tokyo is higher than that of most other Asian cities.",
          "masked": [
            "T**",
            "c***",
            "o*",
            "l*****",
            "i*",
            "T****",
            "i*",
            "h*****",
            "t***",
            "t***",
            "o*",
            "m***",
            "o****",
            "A****",
            "c*****."
          ],
          "hints": [
            "The cost of living in Tokyo is higher than that of",
            "most other Asian cities"
          ],
          "acceptable": [
            "The cost of living in Tokyo is higher than that of most other Asian cities."
          ],
          "grammarNote": "Dùng \"that of\" để so sánh ngang bằng với \"The cost of living\"."
        },
        {
          "id": "buoc1-comparison-s15",
          "vietnamese": "Bài thi nói hôm nay khó hơn nhiều so với những gì tôi tưởng tượng.",
          "target": "Today's speaking test was much more difficult than what I had imagined.",
          "masked": [
            "T******",
            "s*******",
            "t***",
            "w**",
            "m***",
            "m***",
            "d********",
            "t***",
            "w***",
            "I",
            "h**",
            "i*******."
          ],
          "hints": [
            "was much more difficult than",
            "what I had imagined"
          ],
          "acceptable": [
            "Today's speaking test was much more difficult than what I had imagined."
          ],
          "grammarNote": "So sánh với mệnh đề: \"than what I had imagined\"."
        },
        {
          "id": "buoc1-comparison-s16",
          "vietnamese": "Học một ngôn ngữ mới khi còn nhỏ dễ dàng hơn nhiều so với khi trưởng thành.",
          "target": "Learning a new language in childhood is far easier than in adulthood.",
          "masked": [
            "L*******",
            "a",
            "n**",
            "l*******",
            "i*",
            "c********",
            "i*",
            "f**",
            "e*****",
            "t***",
            "i*",
            "a********."
          ],
          "hints": [
            "Learning a new language in childhood is far easier than",
            "in adulthood"
          ],
          "acceptable": [
            "Learning a new language in childhood is far easier than in adulthood."
          ],
          "grammarNote": "Trạng từ \"far\" bổ nghĩa so sánh hơn cho \"easier\"."
        },
        {
          "id": "buoc1-comparison-s17",
          "vietnamese": "Chiếc máy tính xách tay này nhẹ gấp ba lần chiếc máy cũ của tôi.",
          "target": "This laptop is three times as light as my old one.",
          "masked": [
            "T***",
            "l*****",
            "i*",
            "t****",
            "t****",
            "a*",
            "l****",
            "a*",
            "m*",
            "o**",
            "o**."
          ],
          "hints": [
            "is three times as light as my old one"
          ],
          "acceptable": [
            "This laptop is three times as light as my old one."
          ],
          "grammarNote": "So sánh bội số: \"three times as light as...\"."
        },
        {
          "id": "buoc1-comparison-s18",
          "vietnamese": "Ô nhiễm rác thải nhựa là một trong những mối đe doạ nghiêm trọng nhất đối với đại dương.",
          "target": "Plastic pollution is one of the most severe threats to the oceans.",
          "masked": [
            "P******",
            "p********",
            "i*",
            "o**",
            "o*",
            "t**",
            "m***",
            "s*****",
            "t******",
            "t*",
            "t**",
            "o*****."
          ],
          "hints": [
            "is one of the most severe threats to",
            "the oceans"
          ],
          "acceptable": [
            "Plastic pollution is one of the most severe threats to the oceans."
          ],
          "grammarNote": "Collocation: \"severe threats to something\"."
        },
        {
          "id": "buoc1-comparison-s19",
          "vietnamese": "Công việc hiện tại của cô ấy áp lực hơn nhưng thu nhập lại cao hơn công việc trước.",
          "target": "Her current job is more stressful but more lucrative than her previous one.",
          "masked": [
            "H**",
            "c******",
            "j**",
            "i*",
            "m***",
            "s********",
            "b**",
            "m***",
            "l********",
            "t***",
            "h**",
            "p*******",
            "o**."
          ],
          "hints": [
            "is more stressful but more lucrative than",
            "her previous one"
          ],
          "acceptable": [
            "Her current job is more stressful but more lucrative than her previous one."
          ],
          "grammarNote": "Từ vựng C1: \"lucrative\" (thu nhập cao)."
        },
        {
          "id": "buoc1-comparison-s20",
          "vietnamese": "Xe hơi điện vận hành êm ái hơn nhiều so với xe chạy bằng xăng truyền thống.",
          "target": "Electric vehicles operate much more quietly than traditional gasoline cars.",
          "masked": [
            "E*******",
            "v*******",
            "o******",
            "m***",
            "m***",
            "q******",
            "t***",
            "t**********",
            "g*******",
            "c***."
          ],
          "hints": [
            "operate much more quietly than",
            "traditional gasoline cars"
          ],
          "acceptable": [
            "Electric vehicles operate much more quietly than traditional gasoline cars."
          ],
          "grammarNote": "So sánh hơn trạng từ: \"more quietly than\"."
        },
        {
          "id": "buoc1-comparison-s21",
          "vietnamese": "Càng ít sử dụng túi nilon, môi trường của chúng ta sẽ càng được bảo vệ tốt hơn.",
          "target": "The fewer plastic bags we use, the better our environment will be protected.",
          "masked": [
            "T**",
            "f****",
            "p******",
            "b***",
            "w*",
            "u**,",
            "t**",
            "b*****",
            "o**",
            "e**********",
            "w***",
            "b*",
            "p********."
          ],
          "hints": [
            "The fewer plastic bags we use,",
            "the better our environment will be protected"
          ],
          "acceptable": [
            "The fewer plastic bags we use, the better our environment will be protected."
          ],
          "grammarNote": "So sánh kép danh từ đếm được: \"The fewer + Ns...\"."
        },
        {
          "id": "buoc1-comparison-s22",
          "vietnamese": "Cửa hàng này bán cà phê ngon không kém gì những thương hiệu nổi tiếng.",
          "target": "This coffee shop sells coffee no less delicious than famous brands.",
          "masked": [
            "T***",
            "c*****",
            "s***",
            "s****",
            "c*****",
            "n*",
            "l***",
            "d********",
            "t***",
            "f*****",
            "b*****."
          ],
          "hints": [
            "sells coffee no less delicious than",
            "famous brands"
          ],
          "acceptable": [
            "This coffee shop sells coffee no less delicious than famous brands."
          ],
          "grammarNote": "Cấu trúc so sánh \"no less + adj + than\"."
        },
        {
          "id": "buoc1-comparison-s23",
          "vietnamese": "Khoảng cách giữa người giàu và người nghèo đang ngày càng nới rộng hơn.",
          "target": "The gap between the rich and the poor is growing wider and wider.",
          "masked": [
            "T**",
            "g**",
            "b******",
            "t**",
            "r***",
            "a**",
            "t**",
            "p***",
            "i*",
            "g******",
            "w****",
            "a**",
            "w****."
          ],
          "hints": [
            "The gap between the rich and the poor",
            "is growing wider and wider"
          ],
          "acceptable": [
            "The gap between the rich and the poor is growing wider and wider."
          ],
          "grammarNote": "So sánh lũy tiến: \"wider and wider\"."
        },
        {
          "id": "buoc1-comparison-s24",
          "vietnamese": "Việc bảo tồn các loài động vật quý hiếm quan trọng như việc bảo vệ rừng rậm.",
          "target": "Conserving rare animals is as important as protecting the rainforests.",
          "masked": [
            "C*********",
            "r***",
            "a******",
            "i*",
            "a*",
            "i********",
            "a*",
            "p*********",
            "t**",
            "r**********."
          ],
          "hints": [
            "Conserving rare animals is as important as",
            "protecting the rainforests"
          ],
          "acceptable": [
            "Conserving rare animals is as important as protecting the rainforests."
          ],
          "grammarNote": "So sánh bằng với hai V-ing: \"Conserving... is as important as protecting...\"."
        },
        {
          "id": "buoc1-comparison-s25",
          "vietnamese": "Đây là quyết định khó khăn nhất mà hội đồng quản trị từng phải đưa ra.",
          "target": "This is the most difficult decision the board of directors has ever had to make.",
          "masked": [
            "T***",
            "i*",
            "t**",
            "m***",
            "d********",
            "d*******",
            "t**",
            "b****",
            "o*",
            "d********",
            "h**",
            "e***",
            "h**",
            "t*",
            "m***."
          ],
          "hints": [
            "This is the most difficult decision",
            "the board of directors has ever had to make"
          ],
          "acceptable": [
            "This is the most difficult decision the board of directors has ever had to make."
          ],
          "grammarNote": "Collocation: \"make a decision\"."
        }
      ]
    }
  ],
  "ielts-topics": [
    {
      "id": "buoc2-education",
      "aliasIds": [],
      "title": "1. Giáo dục (Education)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 1. Giáo dục (Education) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-education-s1",
          "vietnamese": "Học phí đại học tăng cao đang tạo ra gánh nặng tài chính lớn cho nhiều gia đình.",
          "target": "Rising university tuition fees are imposing a heavy financial burden on many families.",
          "masked": [
            "R*****",
            "u*********",
            "t******",
            "f***",
            "a**",
            "i*******",
            "a",
            "h****",
            "f********",
            "b*****",
            "o*",
            "m***",
            "f*******."
          ],
          "hints": [
            "Rising tuition fees",
            "imposing a heavy financial burden on"
          ],
          "acceptable": [
            "Rising university tuition fees are imposing a heavy financial burden on many families."
          ],
          "grammarNote": "Collocation: \"impose a financial burden on somebody\"."
        },
        {
          "id": "buoc2-education-s2",
          "vietnamese": "Chương trình giảng dạy cần chú trọng phát triển tư duy phản biện cho học sinh.",
          "target": "The curriculum should place more emphasis on developing critical thinking in students.",
          "masked": [
            "T**",
            "c*********",
            "s*****",
            "p****",
            "m***",
            "e*******",
            "o*",
            "d*********",
            "c*******",
            "t*******",
            "i*",
            "s*******."
          ],
          "hints": [
            "place more emphasis on",
            "developing critical thinking"
          ],
          "acceptable": [
            "The curriculum should place more emphasis on developing critical thinking in students."
          ],
          "grammarNote": "Collocation: \"critical thinking\" (tư duy phản biện)."
        },
        {
          "id": "buoc2-education-s3",
          "vietnamese": "Học trực tuyến mang lại sự linh hoạt nhưng đòi hỏi tính tự giác cao.",
          "target": "Online learning provides flexibility but demands high self-discipline.",
          "masked": [
            "O*****",
            "l*******",
            "p*******",
            "f**********",
            "b**",
            "d******",
            "h***",
            "s**************."
          ],
          "hints": [
            "provides flexibility",
            "demands high self-discipline"
          ],
          "acceptable": [
            "Online learning provides flexibility but demands high self-discipline."
          ],
          "grammarNote": "Từ vựng: \"self-discipline\" (tính tự giác)."
        },
        {
          "id": "buoc2-education-s4",
          "vietnamese": "Bằng cấp đại học không còn là tấm vé bảo đảm cho một công việc ổn định.",
          "target": "A university degree is no longer a guaranteed passport to a stable job.",
          "masked": [
            "A",
            "u*********",
            "d*****",
            "i*",
            "n*",
            "l*****",
            "a",
            "g*********",
            "p*******",
            "t*",
            "a",
            "s*****",
            "j**."
          ],
          "hints": [
            "is no longer a guaranteed passport to",
            "a stable job"
          ],
          "acceptable": [
            "A university degree is no longer a guaranteed passport to a stable job."
          ],
          "grammarNote": "Thành ngữ học thuật: \"a passport to success/employment\"."
        },
        {
          "id": "buoc2-education-s5",
          "vietnamese": "Các hoạt động ngoại khoá giúp học sinh rèn luyện kỹ năng mềm và tinh thần đồng đội.",
          "target": "Extracurricular activities help students hone soft skills and teamwork spirit.",
          "masked": [
            "E**************",
            "a*********",
            "h***",
            "s*******",
            "h***",
            "s***",
            "s*****",
            "a**",
            "t*******",
            "s*****."
          ],
          "hints": [
            "Extracurricular activities help students hone",
            "soft skills and teamwork"
          ],
          "acceptable": [
            "Extracurricular activities help students hone soft skills and teamwork spirit."
          ],
          "grammarNote": "Động từ: \"hone skills\" (mài giũa kỹ năng)."
        },
        {
          "id": "buoc2-education-s6",
          "vietnamese": "Nhiều sinh viên lựa chọn gap year để tích luỹ kinh nghiệm thực tế trước khi đi làm.",
          "target": "Many undergraduates choose a gap year to gain practical experience before working.",
          "masked": [
            "M***",
            "u*************",
            "c*****",
            "a",
            "g**",
            "y***",
            "t*",
            "g***",
            "p********",
            "e*********",
            "b*****",
            "w******."
          ],
          "hints": [
            "choose a gap year to gain practical experience"
          ],
          "acceptable": [
            "Many undergraduates choose a gap year to gain practical experience before working."
          ],
          "grammarNote": "Thuật ngữ: \"gap year\", \"gain practical experience\"."
        },
        {
          "id": "buoc2-education-s7",
          "vietnamese": "Giáo dục mầm non đóng vai trò nền tảng trong sự phát triển nhận thức của trẻ.",
          "target": "Early childhood education plays a foundational role in children's cognitive development.",
          "masked": [
            "E****",
            "c********",
            "e********",
            "p****",
            "a",
            "f***********",
            "r***",
            "i*",
            "c*********",
            "c********",
            "d**********."
          ],
          "hints": [
            "plays a foundational role in",
            "cognitive development"
          ],
          "acceptable": [
            "Early childhood education plays a foundational role in children's cognitive development."
          ],
          "grammarNote": "Thuật ngữ IELTS: \"cognitive development\" (phát triển nhận thức)."
        },
        {
          "id": "buoc2-education-s8",
          "vietnamese": "Đánh giá học sinh qua dự án thực tế hiệu quả hơn các bài thi cử truyền thống.",
          "target": "Assessing students through practical projects is more effective than traditional examinations.",
          "masked": [
            "A********",
            "s*******",
            "t******",
            "p********",
            "p*******",
            "i*",
            "m***",
            "e********",
            "t***",
            "t**********",
            "e***********."
          ],
          "hints": [
            "Assessing students through practical projects is",
            "more effective than traditional examinations"
          ],
          "acceptable": [
            "Assessing students through practical projects is more effective than traditional examinations."
          ],
          "grammarNote": "Collocation: \"practical projects\", \"traditional examinations\"."
        },
        {
          "id": "buoc2-education-s9",
          "vietnamese": "Giáo viên không chỉ truyền đạt kiến thức mà còn là người định hướng tương lai.",
          "target": "Teachers not only impart knowledge but also serve as future mentors.",
          "masked": [
            "T*******",
            "n**",
            "o***",
            "i*****",
            "k********",
            "b**",
            "a***",
            "s****",
            "a*",
            "f*****",
            "m******."
          ],
          "hints": [
            "not only impart knowledge but also",
            "serve as future mentors"
          ],
          "acceptable": [
            "Teachers not only impart knowledge but also serve as future mentors."
          ],
          "grammarNote": "Collocation học thuật: \"impart knowledge\" (truyền đạt kiến thức)."
        },
        {
          "id": "buoc2-education-s10",
          "vietnamese": "Học sinh từ các gia đình khó khăn nên được nhận trợ cấp giáo dục từ nhà nước.",
          "target": "Students from disadvantaged backgrounds should receive educational subsidies from the state.",
          "masked": [
            "S*******",
            "f***",
            "d************",
            "b**********",
            "s*****",
            "r******",
            "e**********",
            "s********",
            "f***",
            "t**",
            "s****."
          ],
          "hints": [
            "disadvantaged backgrounds",
            "educational subsidies from the state"
          ],
          "acceptable": [
            "Students from disadvantaged backgrounds should receive educational subsidies from the state."
          ],
          "grammarNote": "Từ vựng C1: \"disadvantaged backgrounds\", \"subsidies\"."
        }
      ]
    },
    {
      "id": "buoc2-environment",
      "aliasIds": [],
      "title": "2. Môi trường (Environment)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 2. Môi trường (Environment) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-environment-s1",
          "vietnamese": "Khí thải nhà kính là thủ phạm chính gây ra hiện tượng nóng lên toàn cầu.",
          "target": "Greenhouse gas emissions are the primary culprit behind global warming.",
          "masked": [
            "G*********",
            "g**",
            "e********",
            "a**",
            "t**",
            "p******",
            "c******",
            "b*****",
            "g*****",
            "w******."
          ],
          "hints": [
            "Greenhouse gas emissions are the primary culprit behind",
            "global warming"
          ],
          "acceptable": [
            "Greenhouse gas emissions are the primary culprit behind global warming."
          ],
          "grammarNote": "Collocation: \"primary culprit\" (thủ phạm chính)."
        },
        {
          "id": "buoc2-environment-s2",
          "vietnamese": "Chuyển sang sử dụng năng lượng tái tạo là giải pháp cấp bách hiện nay.",
          "target": "Transitioning to renewable energy is an urgent solution at present.",
          "masked": [
            "T************",
            "t*",
            "r********",
            "e*****",
            "i*",
            "a*",
            "u*****",
            "s*******",
            "a*",
            "p******."
          ],
          "hints": [
            "Transitioning to renewable energy is",
            "an urgent solution"
          ],
          "acceptable": [
            "Transitioning to renewable energy is an urgent solution at present."
          ],
          "grammarNote": "Collocation: \"renewable energy\" (năng lượng tái tạo)."
        },
        {
          "id": "buoc2-environment-s3",
          "vietnamese": "Nạn phá rừng bừa bãi đang đe doạ nghiêm trọng đến sự đa dạng sinh học.",
          "target": "Rampant deforestation poses a severe threat to biodiversity.",
          "masked": [
            "R******",
            "d************",
            "p****",
            "a",
            "s*****",
            "t*****",
            "t*",
            "b***********."
          ],
          "hints": [
            "Rampant deforestation poses a severe threat to",
            "biodiversity"
          ],
          "acceptable": [
            "Rampant deforestation poses a severe threat to biodiversity."
          ],
          "grammarNote": "Collocation IELTS: \"pose a threat to biodiversity\"."
        },
        {
          "id": "buoc2-environment-s4",
          "vietnamese": "Mỗi cá nhân nên giảm thiểu lượng rác thải nhựa sử dụng một lần mỗi ngày.",
          "target": "Each individual should minimize single-use plastic waste on a daily basis.",
          "masked": [
            "E***",
            "i*********",
            "s*****",
            "m*******",
            "s*********",
            "p******",
            "w****",
            "o*",
            "a",
            "d****",
            "b****."
          ],
          "hints": [
            "minimize single-use plastic waste",
            "on a daily basis"
          ],
          "acceptable": [
            "Each individual should minimize single-use plastic waste on a daily basis."
          ],
          "grammarNote": "Cụm từ: \"single-use plastic\" (nhựa dùng một lần)."
        },
        {
          "id": "buoc2-environment-s5",
          "vietnamese": "Các hiện tượng thời tiết cực đoan như bão lũ đang xảy ra thường xuyên hơn.",
          "target": "Extreme weather events such as floods and storms are occurring with greater frequency.",
          "masked": [
            "E******",
            "w******",
            "e*****",
            "s***",
            "a*",
            "f*****",
            "a**",
            "s*****",
            "a**",
            "o********",
            "w***",
            "g******",
            "f********."
          ],
          "hints": [
            "Extreme weather events",
            "are occurring with greater frequency"
          ],
          "acceptable": [
            "Extreme weather events such as floods and storms are occurring with greater frequency."
          ],
          "grammarNote": "Cụm từ C1: \"with greater frequency\" = more frequently."
        },
        {
          "id": "buoc2-environment-s6",
          "vietnamese": "Ô nhiễm nguồn nước đe doạ trực tiếp đến sức khoẻ của các cộng đồng ven sông.",
          "target": "Water pollution directly threatens the health of riparian communities.",
          "masked": [
            "W****",
            "p********",
            "d*******",
            "t********",
            "t**",
            "h*****",
            "o*",
            "r*******",
            "c**********."
          ],
          "hints": [
            "directly threatens the health of",
            "riparian communities"
          ],
          "acceptable": [
            "Water pollution directly threatens the health of riparian communities."
          ],
          "grammarNote": "Từ vựng C2: \"riparian communities\" (cộng đồng ven sông)."
        },
        {
          "id": "buoc2-environment-s7",
          "vietnamese": "Việc áp thuế carbon có thể khuyến khích các nhà máy cắt giảm phát thải.",
          "target": "Imposing a carbon tax can incentivize factories to cut down on emissions.",
          "masked": [
            "I*******",
            "a",
            "c*****",
            "t**",
            "c**",
            "i**********",
            "f********",
            "t*",
            "c**",
            "d***",
            "o*",
            "e********."
          ],
          "hints": [
            "Imposing a carbon tax can incentivize",
            "factories to cut emissions"
          ],
          "acceptable": [
            "Imposing a carbon tax can incentivize factories to cut down on emissions."
          ],
          "grammarNote": "Collocation kinh tế môi trường: \"impose a carbon tax\"."
        },
        {
          "id": "buoc2-environment-s8",
          "vietnamese": "Các chiến dịch nâng cao nhận thức cộng đồng đóng vai trò then chốt trong việc bảo vệ rừng.",
          "target": "Public awareness campaigns play a pivotal role in forest protection.",
          "masked": [
            "P*****",
            "a********",
            "c********",
            "p***",
            "a",
            "p******",
            "r***",
            "i*",
            "f*****",
            "p*********."
          ],
          "hints": [
            "Public awareness campaigns play a pivotal role in",
            "forest protection"
          ],
          "acceptable": [
            "Public awareness campaigns play a pivotal role in forest protection."
          ],
          "grammarNote": "Collocation: \"play a pivotal role in\" (đóng vai trò mấu chốt)."
        },
        {
          "id": "buoc2-environment-s9",
          "vietnamese": "Đất canh tác nông nghiệp đang bị suy thoái do lạm dụng phân bón hoá học.",
          "target": "Agricultural land is degrading due to the overuse of chemical fertilizers.",
          "masked": [
            "A***********",
            "l***",
            "i*",
            "d********",
            "d**",
            "t*",
            "t**",
            "o******",
            "o*",
            "c*******",
            "f**********."
          ],
          "hints": [
            "is degrading due to the overuse of",
            "chemical fertilizers"
          ],
          "acceptable": [
            "Agricultural land is degrading due to the overuse of chemical fertilizers."
          ],
          "grammarNote": "Từ vựng: \"chemical fertilizers\" (phân bón hoá học)."
        },
        {
          "id": "buoc2-environment-s10",
          "vietnamese": "Bảo tồn tài nguyên thiên nhiên là trách nhiệm chung của toàn nhân loại.",
          "target": "Conserving natural resources is the shared responsibility of all humankind.",
          "masked": [
            "C*********",
            "n******",
            "r********",
            "i*",
            "t**",
            "s*****",
            "r*************",
            "o*",
            "a**",
            "h********."
          ],
          "hints": [
            "Conserving natural resources is",
            "the shared responsibility of humankind"
          ],
          "acceptable": [
            "Conserving natural resources is the shared responsibility of all humankind."
          ],
          "grammarNote": "Collocation: \"shared responsibility\" (trách nhiệm chung)."
        }
      ]
    },
    {
      "id": "buoc2-technology",
      "aliasIds": [],
      "title": "3. Công nghệ (Technology)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 3. Công nghệ (Technology) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-technology-s1",
          "vietnamese": "Chủ đề 3. Công nghệ (Technology): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-technology-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-technology-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-technology-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-technology-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-health",
      "aliasIds": [],
      "title": "4. Sức khoẻ (Health)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 4. Sức khoẻ (Health) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-health-s1",
          "vietnamese": "Chủ đề 4. Sức khoẻ (Health): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-health-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-health-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-health-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-health-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-work",
      "aliasIds": [],
      "title": "5. Công việc (Work)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 5. Công việc (Work) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-work-s1",
          "vietnamese": "Chủ đề 5. Công việc (Work): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-work-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-work-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-work-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-work-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-travel",
      "aliasIds": [],
      "title": "6. Du lịch (Travel)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 6. Du lịch (Travel) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-travel-s1",
          "vietnamese": "Chủ đề 6. Du lịch (Travel): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-travel-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-travel-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-travel-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-travel-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-food",
      "aliasIds": [],
      "title": "7. Thực phẩm (Food)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 7. Thực phẩm (Food) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-food-s1",
          "vietnamese": "Chủ đề 7. Thực phẩm (Food): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-food-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-food-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-food-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-food-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-hobbies",
      "aliasIds": [],
      "title": "8. Sở thích (Hobbies)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 8. Sở thích (Hobbies) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-hobbies-s1",
          "vietnamese": "Chủ đề 8. Sở thích (Hobbies): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-hobbies-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-hobbies-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-hobbies-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-hobbies-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-family",
      "aliasIds": [],
      "title": "9. Gia đình (Family)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 9. Gia đình (Family) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-family-s1",
          "vietnamese": "Chủ đề 9. Gia đình (Family): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-family-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-family-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-family-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-family-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-social-media",
      "aliasIds": [],
      "title": "10. Mạng xã hội (Social Media)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 10. Mạng xã hội (Social Media) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-social-media-s1",
          "vietnamese": "Chủ đề 10. Mạng xã hội (Social Media): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-social-media-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-social-media-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-social-media-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-social-media-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-shopping",
      "aliasIds": [],
      "title": "11. Mua sắm (Shopping)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 11. Mua sắm (Shopping) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-shopping-s1",
          "vietnamese": "Chủ đề 11. Mua sắm (Shopping): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-shopping-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-shopping-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-shopping-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-shopping-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-city-life",
      "aliasIds": [],
      "title": "12. Cuộc sống đô thị (City Life)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 12. Cuộc sống đô thị (City Life) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-city-life-s1",
          "vietnamese": "Chủ đề 12. Cuộc sống đô thị (City Life): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-city-life-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-city-life-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-city-life-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-city-life-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-transport",
      "aliasIds": [],
      "title": "13. Giao thông (Transport)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 13. Giao thông (Transport) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-transport-s1",
          "vietnamese": "Chủ đề 13. Giao thông (Transport): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-transport-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-transport-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-transport-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-transport-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-culture",
      "aliasIds": [],
      "title": "14. Văn hoá (Culture)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 14. Văn hoá (Culture) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-culture-s1",
          "vietnamese": "Chủ đề 14. Văn hoá (Culture): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-culture-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-culture-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-culture-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-culture-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    },
    {
      "id": "buoc2-crime",
      "aliasIds": [],
      "title": "15. Tội phạm (Crime)",
      "step": "Bước 2",
      "level": "B2",
      "desc": "Luyện dịch câu ứng dụng cụm từ và từ vựng học thuật chủ đề 15. Tội phạm (Crime) (Chuẩn The IELTS Dictionary).",
      "sentences": [
        {
          "id": "buoc2-crime-s1",
          "vietnamese": "Chủ đề 15. Tội phạm (Crime): Nghiên cứu học thuật về vấn đề này đóng vai trò quan trọng trong xã hội hiện đại.",
          "target": "Academic research on this subject plays a vital role in modern society.",
          "masked": [
            "A*******",
            "r*******",
            "o*",
            "t***",
            "s******",
            "p****",
            "a",
            "v****",
            "r***",
            "i*",
            "m*****",
            "s******."
          ],
          "hints": [
            "Academic research on this subject",
            "plays a vital role in modern society"
          ],
          "acceptable": [
            "Academic research on this subject plays a vital role in modern society."
          ],
          "grammarNote": "Collocation IELTS: \"play a vital role in\"."
        },
        {
          "id": "buoc2-crime-s2",
          "vietnamese": "Nhiều chuyên gia khuyến nghị các biện pháp can thiệp kịp thời từ phía chính phủ.",
          "target": "Many specialists advocate timely intervention from the government.",
          "masked": [
            "M***",
            "s**********",
            "a*******",
            "t*****",
            "i***********",
            "f***",
            "t**",
            "g*********."
          ],
          "hints": [
            "specialists advocate timely intervention from",
            "the government"
          ],
          "acceptable": [
            "Many specialists advocate timely intervention from the government."
          ],
          "grammarNote": "Cấu trúc: advocate + noun (ủng hộ cái gì)."
        },
        {
          "id": "buoc2-crime-s3",
          "vietnamese": "Tác động lâu dài của xu hướng này cần được đánh giá một cách toàn diện và khoa học.",
          "target": "The long-term repercussions of this trend need to be assessed comprehensively.",
          "masked": [
            "T**",
            "l********",
            "r************",
            "o*",
            "t***",
            "t****",
            "n***",
            "t*",
            "b*",
            "a*******",
            "c**************."
          ],
          "hints": [
            "long-term repercussions",
            "assessed comprehensively"
          ],
          "acceptable": [
            "The long-term repercussions of this trend need to be assessed comprehensively."
          ],
          "grammarNote": "Từ vựng C1: \"repercussions\" (hệ luỵ, tác động)."
        },
        {
          "id": "buoc2-crime-s4",
          "vietnamese": "Các số liệu thống kê gần đây phản ánh sự thay đổi rõ rệt trong nhận thức của người dân.",
          "target": "Recent statistical figures reflect a perceptible shift in public perception.",
          "masked": [
            "R*****",
            "s**********",
            "f******",
            "r******",
            "a",
            "p**********",
            "s****",
            "i*",
            "p*****",
            "p*********."
          ],
          "hints": [
            "Recent statistical figures reflect",
            "a perceptible shift in public perception"
          ],
          "acceptable": [
            "Recent statistical figures reflect a perceptible shift in public perception."
          ],
          "grammarNote": "Collocation học thuật: \"a perceptible shift\" (sự chuyển dịch rõ rệt)."
        },
        {
          "id": "buoc2-crime-s5",
          "vietnamese": "Cần có sự phối hợp chặt chẽ giữa các bên liên quan để đạt được hiệu quả tối ưu.",
          "target": "Close collaboration among relevant stakeholders is imperative for optimal efficacy.",
          "masked": [
            "C****",
            "c************",
            "a****",
            "r*******",
            "s***********",
            "i*",
            "i*********",
            "f**",
            "o******",
            "e*******."
          ],
          "hints": [
            "Close collaboration among stakeholders is imperative for",
            "optimal efficacy"
          ],
          "acceptable": [
            "Close collaboration among relevant stakeholders is imperative for optimal efficacy."
          ],
          "grammarNote": "Từ vựng C2: \"stakeholders\" (các bên liên quan), \"imperative\" (cấp bách)."
        }
      ]
    }
  ]
};
