// ═════════════════════════════════════════════════════════════════════════════
// CEFR COMPREHENSIVE CURRICULUM DATABASE (A1 -> C2 FULL MASTERY)
// 5 Core Skills: Reading, Listening, Speaking (Shadowing), Writing, Grammar
// ═════════════════════════════════════════════════════════════════════════════

export const CEFR_LEVELS = [
  {
    "id": "A1",
    "name": "A1 - Beginner / Sơ Cấp",
    "toeic": "100-250",
    "ielts": "2.0-3.0",
    "color": "emerald",
    "icon": "fa-seedling",
    "desc": "Giao tiếp tình huống hàng ngày, giới thiệu bản thân & câu đơn"
  },
  {
    "id": "A2",
    "name": "A2 - Elementary / Tiền Trung Cấp",
    "toeic": "255-500",
    "ielts": "3.5-4.5",
    "color": "teal",
    "icon": "fa-tree",
    "desc": "Miêu tả công việc, sở thích, mua sắm & quá khứ đơn"
  },
  {
    "id": "B1",
    "name": "B1 - Intermediate / Trung Cấp",
    "toeic": "505-700",
    "ielts": "5.0-6.0",
    "color": "blue",
    "icon": "fa-mountain",
    "desc": "Thuyết trình, viết email công việc, xử lý tình huống du lịch & công sở"
  },
  {
    "id": "B2",
    "name": "B2 - Upper-Intermediate / Cao Cấp",
    "toeic": "705-850",
    "ielts": "6.5-7.5",
    "color": "indigo",
    "icon": "fa-rocket",
    "desc": "Tranh luận chủ đề phức tạp, đọc hiểu báo cáo, văn phong tự nhiên"
  },
  {
    "id": "C1",
    "name": "C1 - Advanced / Nâng Cao",
    "toeic": "855-950",
    "ielts": "7.5-8.5",
    "color": "purple",
    "icon": "fa-crown",
    "desc": "Văn phong học thuật, đàm phán thương mại, thành ngữ & ẩn dụ"
  },
  {
    "id": "C2",
    "name": "C2 - Mastery / Thành Thạo",
    "toeic": "955-990",
    "ielts": "8.5-9.0",
    "color": "rose",
    "icon": "fa-gem",
    "desc": "Sử dụng tiếng Anh linh hoạt, tinh tế tương đương người bản ngữ"
  }
];

export const CEFR_CURRICULUM = {
  "A1": {
    "reading": [
      {
        "id": "a1-read-1",
        "title": "About My Family (Gia Đình & Ngoại Hình)",
        "desc": "Đọc bức thư của Jonathan giới thiệu về gia đình, nghề nghiệp và ngoại hình.",
        "passage": "Dear Marta,\n\nI'm going to tell you about my family. I live with my little sister, mum, and dad. We live in London, although I grew up in Lancaster, a beautiful city in the North of England.\n\nMy dad's name is Pierre. He's from France, and he speaks English and French. He works as a French teacher. He's very tall and athletic. He's got short blonde hair and blue eyes.\n\nMy mum's name is Anna. She's English. She works at a chemist's opposite our home. She can speak French too!\n\nMy sister Julia is 18 years old. She loves playing the piano and dancing. She's very talented.\n\nWrite back soon.\nLove,\nJonathan",
        "vocabulary": [
          {
            "word": "chemist's",
            "meaning": "hiệu thuốc",
            "pron": "/ˈkem.ɪsts/"
          },
          {
            "word": "athletic",
            "meaning": "dáng thể thao",
            "pron": "/æθˈlet.ɪk/"
          },
          {
            "word": "talented",
            "meaning": "có tài năng",
            "pron": "/ˈtæl.ən.tɪd/"
          }
        ],
        "questions": [
          {
            "q": "Where does Jonathan live now?",
            "options": [
              "Lancaster",
              "London",
              "Paris",
              "Manchester"
            ],
            "answer": 1,
            "explanation": "Trong bài viết: We live in London."
          },
          {
            "q": "What is his father's profession?",
            "options": [
              "Chemist",
              "Musician",
              "French teacher",
              "Doctor"
            ],
            "answer": 2,
            "explanation": "He works as a French teacher."
          }
        ]
      },
      {
        "id": "a1-read-2",
        "title": "My Daily Routine (Thói Quen Hàng Ngày)",
        "desc": "Khám phá một ngày làm việc điển hình của Sarah tại tiệm bánh.",
        "passage": "I get up at 6:00 every morning from Monday to Friday. I wash my face, brush my teeth, and make a cup of hot black coffee.\n\nAt 6:45, I walk to the bakery where I work. The bakery is only ten minutes from my apartment. I prepare fresh bread and croissants for customers.\n\nAt 12:00, I have a quick lunch with my coworker Elena. In the evening, I return home, cook dinner, read a book, and go to bed at 22:30.",
        "vocabulary": [
          {
            "word": "bakery",
            "meaning": "tiệm bánh mì",
            "pron": "/ˈbeɪ.kər.i/"
          },
          {
            "word": "coworker",
            "meaning": "đồng nghiệp",
            "pron": "/ˌkoʊˈwɜːr.kər/"
          },
          {
            "word": "prepare",
            "meaning": "chuẩn bị",
            "pron": "/prɪˈper/"
          }
        ],
        "questions": [
          {
            "q": "How does Sarah travel to work?",
            "options": [
              "By bus",
              "By car",
              "On foot",
              "By bicycle"
            ],
            "answer": 2,
            "explanation": "I walk to the bakery where I work."
          },
          {
            "q": "What does she do at 12:00?",
            "options": [
              "Go to bed",
              "Have lunch",
              "Make coffee",
              "Walk home"
            ],
            "answer": 1,
            "explanation": "At 12:00, I have a quick lunch."
          }
        ]
      },
      {
        "id": "a1-read-3",
        "title": "At The Supermarket (Mua Sắm Hàng Ngày)",
        "desc": "Học từ vựng về thực phẩm, đồ gia dụng và thanh toán hóa đơn.",
        "passage": "Every Saturday morning, David goes to the local supermarket. He always brings a shopping list so he doesn't forget anything.\n\nToday, he needs milk, eggs, cheddar cheese, and fresh oranges. The fruits and vegetables are always fresh and cheap in the morning.\n\nAfter picking up everything on his list, he goes to checkout counter number 3 and pays with his credit card.",
        "vocabulary": [
          {
            "word": "supermarket",
            "meaning": "siêu thị",
            "pron": "/ˈsuː.pɚˌmɑːr.kɪt/"
          },
          {
            "word": "checkout counter",
            "meaning": "quầy thanh toán",
            "pron": "/ˈtʃek.aʊt ˈkaʊn.t̬ɚ/"
          },
          {
            "word": "credit card",
            "meaning": "thẻ tín dụng",
            "pron": "/ˈkred.ɪt kɑːrd/"
          }
        ],
        "questions": [
          {
            "q": "When does David go to the supermarket?",
            "options": [
              "Sunday evening",
              "Saturday morning",
              "Friday afternoon",
              "Every day"
            ],
            "answer": 1,
            "explanation": "Every Saturday morning, David goes to the local supermarket."
          }
        ]
      },
      {
        "id": "a1-read-4",
        "title": "My Favorite Weekend (Kỳ Nghỉ Cuối Tuần)",
        "desc": "Cách diễn đạt các hoạt động thư giãn, gặp gỡ bạn bè và thể thao cuối tuần.",
        "passage": "Weekends are my favorite time of the week. On Saturday afternoons, I usually go to the central park to play badminton with my best friend Mark.\n\nIf the weather is sunny, we sit on the grass and enjoy some ice cream. On Sundays, I stay home and clean my room or watch an English movie with subtitles.",
        "vocabulary": [
          {
            "word": "badminton",
            "meaning": "cầu lông",
            "pron": "/ˈbæd.mɪn.tən/"
          },
          {
            "word": "subtitles",
            "meaning": "phụ đề",
            "pron": "/ˈsʌbˌtaɪ.təlz/"
          }
        ],
        "questions": [
          {
            "q": "Who does the author play badminton with?",
            "options": [
              "Elena",
              "His brother",
              "Mark",
              "David"
            ],
            "answer": 2,
            "explanation": "Play badminton with my best friend Mark."
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "a1-lis-1",
        "title": "Ordering Food at a Cafe (Gọi Món Tại Quán Cafe)",
        "desc": "Hội thoại gọi đồ uống và đồ ăn nhẹ tại quán cafe phong cách Anh.",
        "transcript": "Good morning! Can I help you? - Yes, please. I'd like a medium cappuccino and a chocolate muffin. - Sure! Would you like that for here or to go? - For here, please. - That will be four pounds fifty, please. - Here is five pounds. - And here is fifty pence change. Thank you!",
        "audioSpeed": 0.9,
        "questions": [
          {
            "q": "What drink does the customer order?",
            "options": [
              "Hot tea",
              "Medium cappuccino",
              "Orange juice",
              "Iced latte"
            ],
            "answer": 1,
            "explanation": "Khách hàng nói: I would like a medium cappuccino."
          },
          {
            "q": "How much does the order cost?",
            "options": [
              "£4.00",
              "£5.00",
              "£4.50",
              "£5.50"
            ],
            "answer": 2,
            "explanation": "Người bán hàng nói: That will be four pounds fifty (£4.50)."
          }
        ]
      },
      {
        "id": "a1-lis-2",
        "title": "Asking for Directions (Hỏi Đường Cơ Bản)",
        "desc": "Học cách hỏi và chỉ đường đến trạm xe buýt hoặc bảo tàng.",
        "transcript": "Excuse me, is there a post office near here? - Yes, there is one on Green Street. Walk straight ahead for two blocks, then turn left at the traffic lights. It's next to the library. - Thank you very much! - You're welcome!",
        "audioSpeed": 0.9,
        "questions": [
          {
            "q": "Where is the post office located?",
            "options": [
              "Opposite the hospital",
              "Next to the library",
              "Behind the school",
              "Inside the station"
            ],
            "answer": 1,
            "explanation": "It is next to the library."
          }
        ]
      },
      {
        "id": "a1-lis-3",
        "title": "Checking in at a Hotel (Thủ Tục Nhận Phòng Khách Sạn)",
        "desc": "Hội thoại chào hỏi và nhận chìa khóa phòng tại quầy lễ tân.",
        "transcript": "Hello, welcome to Royal Hotel. Do you have a reservation? - Yes, my name is Robert Smith. I booked a single room for two nights. - Perfect, Mr. Smith. Here is your key card for room 304 on the third floor. Breakfast is from 7:00 to 9:30. - Great, thank you!",
        "audioSpeed": 0.9,
        "questions": [
          {
            "q": "What room number is Mr. Smith assigned?",
            "options": [
              "Room 204",
              "Room 304",
              "Room 404",
              "Room 340"
            ],
            "answer": 1,
            "explanation": "Room 304 on the third floor."
          }
        ]
      }
    ],
    "speaking": [
      {
        "id": "a1-spk-1",
        "title": "Self-Introduction (Giới Thiệu Bản Thân)",
        "desc": "Luyện phát âm các mẫu câu tự giới thiệu tên, tuổi, quê quán và nghề nghiệp.",
        "sentences": [
          {
            "en": "Hello, my name is John and I come from Vietnam.",
            "vi": "Xin chào, tôi tên là John và tôi đến từ Việt Nam.",
            "ipa": "/həˈloʊ maɪ neɪm ɪz dʒɑːn ænd aɪ kʌm frəm vjetˈnɑːm/"
          },
          {
            "en": "I am twenty-five years old.",
            "vi": "Tôi 25 tuổi.",
            "ipa": "/aɪ æm ˈtwen.ti faɪv jɪərz oʊld/"
          },
          {
            "en": "I work as an office employee in Hanoi.",
            "vi": "Tôi làm nhân viên văn phòng tại Hà Nội.",
            "ipa": "/aɪ wɜːrk æz ən ˈɑː.fɪs ɪmˈplɔɪ.iː ɪn hæˈnɔɪ/"
          },
          {
            "en": "Nice to meet you!",
            "vi": "Rất vui được gặp bạn!",
            "ipa": "/naɪs tuː miːt juː/"
          }
        ]
      },
      {
        "id": "a1-spk-2",
        "title": "Daily Greetings & Small Talk (Chào Hỏi Hàng Ngày)",
        "desc": "Thực hành các câu chào hỏi lịch sự và hỏi thăm sức khỏe.",
        "sentences": [
          {
            "en": "Good morning! How are you doing today?",
            "vi": "Chào buổi sáng! Hôm nay bạn thế nào?",
            "ipa": "/ɡʊd ˈmɔːr.nɪŋ haʊ ɑːr juː ˈduː.ɪŋ təˈdeɪ/"
          },
          {
            "en": "I am doing great, thank you. And you?",
            "vi": "Tôi khỏe, cảm ơn bạn. Còn bạn thì sao?",
            "ipa": "/aɪ æm ˈduː.ɪŋ ɡreɪt ˈθæŋk juː ænd juː/"
          },
          {
            "en": "Have a wonderful weekend!",
            "vi": "Chúc bạn một cuối tuần tuyệt vời!",
            "ipa": "/hæv ə ˈwʌn.dɚ.fəl ˈwiːk.end/"
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "a1-wrt-1",
        "title": "Luyện Dịch Câu Đơn: Thì Hiện Tại Đơn",
        "desc": "Thực hành dịch các câu khẳng định và phủ định mô tả thói quen đời sống.",
        "sentences": [
          {
            "vi": "Tôi thức dậy lúc 6 giờ sáng mỗi ngày.",
            "target": "I wake up at 6 am every day.",
            "hint": "wake up / get up, every day"
          },
          {
            "vi": "Anh ấy không thích uống cà phê đen.",
            "target": "He does not like drinking black coffee.",
            "hint": "does not like, black coffee"
          },
          {
            "vi": "Chúng tôi sống trong một căn hộ nhỏ ở London.",
            "target": "We live in a small apartment in London.",
            "hint": "live in, small apartment"
          }
        ]
      },
      {
        "id": "a1-wrt-2",
        "title": "Luyện Dịch Câu: Mạo Từ & Đại Từ Sở Hữu",
        "desc": "Rèn luyện khả năng dùng đúng a, an, the, my, his, her.",
        "sentences": [
          {
            "vi": "Đây là chiếc xe hơi mới của bố tôi.",
            "target": "This is my father's new car.",
            "hint": "father's new car"
          },
          {
            "vi": "Cô ấy có một quả táo và một quả cam.",
            "target": "She has an apple and an orange.",
            "hint": "an apple, an orange"
          }
        ]
      }
    ],
    "grammar": [
      {
        "id": "a1-grm-1",
        "title": "Động Từ To Be & Đại Từ Nhân Xưng (Am, Is, Are)",
        "desc": "Nắm vững cách chia To Be với I, You, We, They, He, She, It.",
        "theory": "1. Khẳng định: I am | He/She/It is | We/You/They are\n2. Phủ định: Thêm NOT sau To Be (am not, isn't, aren't)\n3. Nghi vấn: Đưa To Be lên đầu câu (Are you ready? Yes, I am).",
        "quiz": [
          {
            "q": "My parents _____ retired teachers.",
            "options": [
              "is",
              "are",
              "am",
              "be"
            ],
            "answer": 1,
            "explanation": "My parents là chủ ngữ số nhiều (They) nên dùng are."
          },
          {
            "q": "_____ your sister a doctor?",
            "options": [
              "Is",
              "Are",
              "Am",
              "Do"
            ],
            "answer": 0,
            "explanation": "Your sister là ngôi thứ 3 số ít (She) nên dùng Is."
          }
        ]
      },
      {
        "id": "a1-grm-2",
        "title": "Thì Hiện Tại Đơn (Simple Present Tense)",
        "desc": "Quy tắc thêm -s/-es và cách sử dụng trợ động từ Do/Does.",
        "theory": "1. V-bare với I/You/We/They; V-s/es với He/She/It.\n2. Phủ định: S + don't / doesn't + V-bare.\n3. Dấu hiệu: always, usually, often, every day/week.",
        "quiz": [
          {
            "q": "He usually _____ to work by subway.",
            "options": [
              "go",
              "goes",
              "going",
              "is go"
            ],
            "answer": 1,
            "explanation": "He đi với động từ thêm -es: goes."
          }
        ]
      }
    ]
  },
  "A2": {
    "reading": [
      {
        "id": "a2-read-1",
        "title": "A Weekend Trip to Edinburgh (Du Lịch Cuối Tuần)",
        "desc": "Hành trình khám phá lâu đài cổ kính và phong cảnh tuyệt đẹp ở Scotland.",
        "passage": "Last weekend, my wife and I decided to take a short trip to Edinburgh by train. The journey from London took just over four hours, but the countryside scenery was spectacular.\n\nOn Saturday morning, we climbed up to Edinburgh Castle, which sits on an extinct volcano. The view of the city and the ocean was breathtaking. In the afternoon, we explored the Royal Mile and stopped at a traditional pub to taste Scottish soup and pies.\n\nIt was cold and rainy on Sunday, so we spent most of the day inside the National Museum of Scotland. We bought some wool scarves as souvenirs before heading back to the station.",
        "vocabulary": [
          {
            "word": "spectacular",
            "meaning": "ngoạn mục, hùng vĩ",
            "pron": "/spekˈtæk.jə.lɚ/"
          },
          {
            "word": "breathtaking",
            "meaning": "đẹp đến nín thở",
            "pron": "/ˈbreθˌteɪ.kɪŋ/"
          },
          {
            "word": "souvenir",
            "meaning": "quà lưu niệm",
            "pron": "/ˌsuː.vəˈnɪr/"
          }
        ],
        "questions": [
          {
            "q": "How did they travel to Edinburgh?",
            "options": [
              "By plane",
              "By train",
              "By bus",
              "By car"
            ],
            "answer": 1,
            "explanation": "We took a short trip to Edinburgh by train."
          },
          {
            "q": "Where is Edinburgh Castle located?",
            "options": [
              "By the beach",
              "On an extinct volcano",
              "Inside a forest",
              "Next to the railway"
            ],
            "answer": 1,
            "explanation": "Which sits on an extinct volcano."
          }
        ]
      },
      {
        "id": "a2-read-2",
        "title": "Healthy Eating Habits (Thói Quen Ăn Uống Lành Mạnh)",
        "desc": "Lời khuyên dinh dưỡng để duy trì sức khỏe và năng lượng mỗi ngày.",
        "passage": "Eating healthy does not mean following strict diets or starving yourself. It is about feeling great, having more energy, and improving your overall well-being.\n\nNutritionists recommend replacing processed foods with whole grains, fresh vegetables, and lean protein like fish and chicken. Drinking at least two liters of water a day is also essential to keep your body hydrated.",
        "vocabulary": [
          {
            "word": "nutritionist",
            "meaning": "chuyên gia dinh dưỡng",
            "pron": "/nuːˈtrɪʃ.ən.ɪst/"
          },
          {
            "word": "hydrated",
            "meaning": "đủ nước",
            "pron": "/ˈhaɪ.dreɪ.t̬ɪd/"
          }
        ],
        "questions": [
          {
            "q": "What do nutritionists recommend?",
            "options": [
              "Skipping breakfast",
              "Replacing processed food with whole grains",
              "Drinking soda",
              "Only eating fruit"
            ],
            "answer": 1,
            "explanation": "Replacing processed foods with whole grains, fresh vegetables..."
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "a2-lis-1",
        "title": "Planning a Birthday Party (Lên Kế Hoạch Tiệc Sinh Nhật)",
        "desc": "Hai người bạn bàn bạc về địa điểm, đồ ăn và danh sách khách mời.",
        "transcript": "Hi Lisa, have you planned Tom's surprise birthday party yet? - Yes! I reserved a private room at the Italian restaurant on Main Street for Saturday at 7:00 PM. - Awesome! How many people are coming? - Around fifteen friends. I ordered a chocolate cake and some party decorations. Can you bring your camera? - Definitely! I will take lots of pictures.",
        "audioSpeed": 0.95,
        "questions": [
          {
            "q": "Where will the birthday party take place?",
            "options": [
              "At Lisa's house",
              "At an Italian restaurant",
              "In a park",
              "At school"
            ],
            "answer": 1,
            "explanation": "I reserved a private room at the Italian restaurant."
          }
        ]
      },
      {
        "id": "a2-lis-2",
        "title": "Making a Doctor Appointment (Đặt Lịch Khám Bác Sĩ)",
        "desc": "Hội thoại gọi điện thoại đến phòng khám để đăng ký khám bệnh.",
        "transcript": "Greenwood Clinic, how can I help you? - Hello, I'd like to make an appointment with Dr. Miller, please. I have a terrible sore throat and fever. - I see. The earliest available slot is tomorrow morning at 9:15 AM. Does that suit you? - Yes, tomorrow at 9:15 is fine. My name is Alex Davis. - Okay Mr. Davis, please bring your medical insurance card. See you tomorrow.",
        "audioSpeed": 0.95,
        "questions": [
          {
            "q": "What symptoms does Alex have?",
            "options": [
              "Broken leg",
              "Sore throat and fever",
              "Headache only",
              "Stomachache"
            ],
            "answer": 1,
            "explanation": "I have a terrible sore throat and fever."
          }
        ]
      }
    ],
    "speaking": [
      {
        "id": "a2-spk-1",
        "title": "Talking About Past Experiences (Kể Về Trải Nghiệm Đã Qua)",
        "desc": "Sử dụng thì quá khứ đơn để kể lại kỳ nghỉ hoặc sự kiện đáng nhớ.",
        "sentences": [
          {
            "en": "Last summer, I visited Da Nang with my best friends.",
            "vi": "Mùa hè năm ngoái, tôi đã đến thăm Đà Nẵng cùng những người bạn thân nhất.",
            "ipa": "/læst ˈsʌm.ɚ aɪ ˈvɪz.ɪ.tɪd dɑː næŋ wɪð maɪ best frendz/"
          },
          {
            "en": "We enjoyed the seafood and swam in the clear blue sea.",
            "vi": "Chúng tôi đã thưởng thức hải sản và bơi dưới làn nước biển trong xanh.",
            "ipa": "/wiː ɪnˈdʒɔɪd ðə ˈsiː.fuːd ænd swæm ɪn ðə klɪr bluː siː/"
          },
          {
            "en": "It was an unforgettable trip!",
            "vi": "Đó là một chuyến đi khó quên!",
            "ipa": "/ɪt wʌz ən ˌʌn.fɚˈɡet̬.ə.bəl trɪp/"
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "a2-wrt-1",
        "title": "Luyện Dịch Câu: Quá Khứ Đơn & Quá Khứ Tiếp Diễn",
        "desc": "Phối hợp When và While để diễn tả hành động đang diễn ra thì bị cắt ngang.",
        "sentences": [
          {
            "vi": "Khi tôi đang nấu ăn thì chuông điện thoại reo.",
            "target": "While I was cooking, the phone rang.",
            "hint": "While I was cooking, phone rang"
          },
          {
            "vi": "Hôm qua anh ấy đã không đi làm vì bị ốm.",
            "target": "He did not go to work yesterday because he was sick.",
            "hint": "did not go to work, because he was sick"
          }
        ]
      }
    ],
    "grammar": [
      {
        "id": "a2-grm-1",
        "title": "Thì Quá Khứ Đơn (Past Simple Tense)",
        "desc": "Động từ có quy tắc -ed và các động từ bất quy tắc hay gặp nhất.",
        "theory": "1. V-ed (played, watched, visited) & Bất quy tắc (went, saw, ate, took).\n2. Phủ định: S + didn't + V-bare.\n3. Nghi vấn: Did + S + V-bare?",
        "quiz": [
          {
            "q": "She _____ a new laptop two days ago.",
            "options": [
              "bought",
              "buy",
              "buys",
              "buying"
            ],
            "answer": 0,
            "explanation": "Two days ago là dấu hiệu quá khứ đơn, dùng bought."
          }
        ]
      }
    ]
  },
  "B1": {
    "reading": [
      {
        "id": "b1-read-1",
        "title": "Remote Work: Benefits and Challenges (Làm Việc Từ Xa)",
        "desc": "Phân tích xu hướng làm việc linh hoạt từ xa và tác động tới năng suất lao động.",
        "passage": "The COVID-19 pandemic permanently transformed the modern workplace. What began as an emergency measure has evolved into a standard working model for millions worldwide.\n\nProponents of remote work highlight increased flexibility, eliminated commute times, and higher employee satisfaction. Without spending hours stuck in traffic, professionals can invest more time in personal hobbies or family.\n\nHowever, remote work is not without its drawbacks. Many employees report feelings of isolation and struggle to maintain a clear boundary between professional duties and private life. Managers also face difficulties in fostering company culture and evaluating employee output objectively. As a result, many corporations are now adopting a hybrid arrangement, requiring staff to be in the office two or three days a week.",
        "vocabulary": [
          {
            "word": "proponent",
            "meaning": "người ủng hộ",
            "pron": "/prəˈpoʊ.nənt/"
          },
          {
            "word": "commute",
            "meaning": "quãng đường đi làm",
            "pron": "/kəˈmjuːt/"
          },
          {
            "word": "isolation",
            "meaning": "sự cô lập, lẻ loi",
            "pron": "/ˌaɪ.səˈleɪ.ʃən/"
          },
          {
            "word": "hybrid arrangement",
            "meaning": "mô hình kết hợp (online & văn phòng)",
            "pron": "/ˈhaɪ.brɪd əˈreɪndʒ.mənt/"
          }
        ],
        "questions": [
          {
            "q": "What is a major advantage of remote work mentioned in the text?",
            "options": [
              "Higher taxes",
              "Eliminated commute times",
              "Longer working hours",
              "Free office meals"
            ],
            "answer": 1,
            "explanation": "Proponents highlight increased flexibility, eliminated commute times..."
          },
          {
            "q": "Why are corporations adopting hybrid models?",
            "options": [
              "To save electricity only",
              "To balance flexibility with company culture and collaboration",
              "Because employees dislike technology",
              "To cut all salaries"
            ],
            "answer": 1,
            "explanation": "Hybrid helps address isolation and maintains company culture."
          }
        ]
      },
      {
        "id": "b1-read-2",
        "title": "Writing Professional Business Emails (Kỹ Năng Viết Email Công Sở)",
        "desc": "Quy tắc và các cấu trúc tiêu chuẩn khi gửi email cho khách hàng và đối tác.",
        "passage": "In international business, clear communication is crucial. A well-written email reflects professionalism and respect for the recipient's time.\n\nAlways use an informative subject line that summarizes the email's purpose. Open with a courteous greeting, state your objective concisely in the opening paragraph, and conclude with a specific call to action. Avoid overly casual slang or emotional punctuation.",
        "vocabulary": [
          {
            "word": "recipient",
            "meaning": "người nhận",
            "pron": "/rɪˈsɪp.i.ənt/"
          },
          {
            "word": "call to action",
            "meaning": "lời kêu gọi hành động",
            "pron": "/kɔːl tuː ˈæk.ʃən/"
          },
          {
            "word": "courteous",
            "meaning": "lịch thiệp, nhã nhặn",
            "pron": "/ˈkɝː.t̬i.əs/"
          }
        ],
        "questions": [
          {
            "q": "What should the opening paragraph do?",
            "options": [
              "Tell a personal joke",
              "State the objective concisely",
              "Complain about workload",
              "List 20 bullet points"
            ],
            "answer": 1,
            "explanation": "State your objective concisely in the opening paragraph."
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "b1-lis-1",
        "title": "Project Status Update Meeting (Cuộc Họp Báo Cáo Dự Án)",
        "desc": "Trưởng nhóm báo cáo tiến độ ra mắt phần mềm và xử lý sự cố kỹ thuật.",
        "transcript": "Good morning team. Let's start our weekly sprint review. Regarding the mobile app release, our developers have finished implementing the payment gateway. However, QA reported two critical bugs during the stress testing yesterday. Therefore, we decided to push back the public beta launch by five days to ensure stability. Marketing, please update the social media schedule accordingly. Questions? - Are we still within budget? - Yes, current expenditures are 12% below our projected forecast.",
        "audioSpeed": 1,
        "questions": [
          {
            "q": "Why was the beta launch postponed?",
            "options": [
              "Lack of budget",
              "Two critical bugs found in stress testing",
              "The marketing manager was absent",
              "The client cancelled the project"
            ],
            "answer": 1,
            "explanation": "QA reported two critical bugs during stress testing yesterday."
          },
          {
            "q": "How is the project budget performing?",
            "options": [
              "12% over budget",
              "Completely exhausted",
              "12% below projected forecast",
              "Needs urgent funding"
            ],
            "answer": 2,
            "explanation": "Current expenditures are 12% below our projected forecast."
          }
        ]
      }
    ],
    "speaking": [
      {
        "id": "b1-spk-1",
        "title": "Presenting a Project Idea (Thuyết Trình Ý Tưởng Dự Án)",
        "desc": "Luyện tập các cấu trúc mở đầu, triển khai và kết luận bài thuyết trình.",
        "sentences": [
          {
            "en": "Today, I would like to propose a new digital marketing strategy for our company.",
            "vi": "Hôm nay, tôi muốn đề xuất một chiến lược tiếp thị kỹ thuật số mới cho công ty chúng ta.",
            "ipa": "/təˈdeɪ aɪ wʊd laɪk tuː prəˈpoʊz ə njuː ˈdɪdʒ.ə.t̬əl ˈmɑːr.kɪ.t̬ɪŋ ˈstræt̬.ə.dʒi fɔːr ˈaʊ.ɚ ˈkʌm.pə.ni/"
          },
          {
            "en": "By leveraging social media advertising, we can reach up to fifty thousand potential customers.",
            "vi": "Bằng cách tận dụng quảng cáo mạng xã hội, chúng ta có thể tiếp cận tới năm mươi nghìn khách hàng tiềm năng.",
            "ipa": "/baɪ ˈlev.ɚ.ɪ.dʒɪŋ ˈsoʊ.ʃəl ˈmiː.di.ə ˈæd.vɚ.taɪ.zɪŋ wiː kæn riːtʃ ʌp tuː ˈfɪf.ti ˈθaʊ.zənd poʊˈten.ʃəl ˈkʌs.tə.mɚz/"
          },
          {
            "en": "Thank you for listening. I would be pleased to answer any questions.",
            "vi": "Cảm ơn quý vị đã lắng nghe. Tôi rất vui lòng được giải đáp các câu hỏi.",
            "ipa": "/θæŋk juː fɔːr ˈlɪs.ən.ɪŋ aɪ wʊd biː pliːzd tuː ˈæn.sɚ ˈen.i ˈkwes.tʃənz/"
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "b1-wrt-1",
        "title": "Luyện Dịch Câu: Mệnh Đề Quan Hệ & Câu Bị Động",
        "desc": "Dịch câu phức mô tả công việc văn phòng và hợp đồng dịch vụ.",
        "sentences": [
          {
            "vi": "Bản hợp đồng đã được ký bởi giám đốc điều hành vào sáng nay.",
            "target": "The contract was signed by the executive director this morning.",
            "hint": "contract was signed, executive director"
          },
          {
            "vi": "Nhân viên người mà đạt doanh số cao nhất sẽ nhận được phần thưởng.",
            "target": "The employee who achieves the highest sales will receive an award.",
            "hint": "employee who achieves, highest sales, receive an award"
          }
        ]
      }
    ],
    "grammar": [
      {
        "id": "b1-grm-1",
        "title": "Câu Bị Động (Passive Voice: S + Be + V3/ed)",
        "desc": "Nguyên tắc chuyển câu chủ động sang bị động với các thì cơ bản.",
        "theory": "1. Công thức: S + be (chia theo thì) + V3/ed (+ by O).\n2. Hiện tại đơn: am/is/are + V3/ed | Quá khứ đơn: was/were + V3/ed | Hoàn thành: have/has been + V3/ed.\n3. Dùng khi đối tượng chịu tác động quan trọng hơn người thực hiện.",
        "quiz": [
          {
            "q": "The financial report _____ by the accounting department yesterday.",
            "options": [
              "prepared",
              "was prepared",
              "is prepared",
              "has been prepared"
            ],
            "answer": 1,
            "explanation": "Yesterday là quá khứ đơn, chủ ngữ The financial report số ít nên dùng was prepared."
          }
        ]
      }
    ]
  },
  "B2": {
    "reading": [
      {
        "id": "b2-read-1",
        "title": "Artificial Intelligence and the Future of Employment",
        "desc": "Khảo sát tác động sâu rộng của trí tuệ nhân tạo đối với thị trường lao động toàn cầu.",
        "passage": "The rapid emergence of generative AI has sparked fierce debate among economists and policymakers. While previous automation waves primarily displaced routine manual labor, current algorithmic systems are increasingly capable of performing complex cognitive tasks such as code generation, legal contract synthesis, and diagnostic medical analysis.\n\nOptimists argue that AI will not render humans obsolete, but rather augment productivity, freeing workers from tedious administrative overhead and enabling higher-order strategic innovation. Nevertheless, the transition period may prove turbulent, demanding substantial public investment in workforce retraining programs to prevent widespread socioeconomic polarization.",
        "vocabulary": [
          {
            "word": "obsolete",
            "meaning": "lỗi thời, bị đào thải",
            "pron": "/ˌɑːb.səˈliːt/"
          },
          {
            "word": "augment",
            "meaning": "gia tăng, bổ trợ",
            "pron": "/ɑːɡˈment/"
          },
          {
            "word": "polarization",
            "meaning": "sự phân cực xã hội",
            "pron": "/ˌpoʊ.lɚ.əˈzeɪ.ʃən/"
          },
          {
            "word": "turbulent",
            "meaning": "hỗn loạn, biến động mạnh",
            "pron": "/ˈtɝː.bjə.lənt/"
          }
        ],
        "questions": [
          {
            "q": "How does modern AI differ from previous automation waves?",
            "options": [
              "It only affects agriculture",
              "It can perform complex cognitive tasks",
              "It is much cheaper to build",
              "It has completely stopped working"
            ],
            "answer": 1,
            "explanation": "Current systems are increasingly capable of performing complex cognitive tasks."
          },
          {
            "q": "What is necessary during the transition period according to the text?",
            "options": [
              "Banning all computers",
              "Substantial investment in workforce retraining",
              "Immediate reduction of all taxes",
              "Decreasing university enrollment"
            ],
            "answer": 1,
            "explanation": "Demanding substantial public investment in workforce retraining programs."
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "b2-lis-1",
        "title": "Corporate Financial Earnings Call (Hội Nghị Báo Cáo Tài Chính)",
        "desc": "Giám đốc tài chính trình bày kết quả kinh doanh quý 3 và dự báo quý tới.",
        "transcript": "Good afternoon shareholders. In Q3, our consolidated revenue grew by 18.5% year-over-year, reaching 4.2 billion dollars, driven predominantly by our cloud enterprise subscriptions. Gross margin expanded by 230 basis points due to optimized supply chain logistics and lower procurement costs. Looking forward to Q4, despite macroeconomic headwinds and exchange rate volatility, we reaffirm our full-year guidance with anticipated operating margins between 24 and 26 percent.",
        "audioSpeed": 1.05,
        "questions": [
          {
            "q": "What was the primary driver of revenue growth in Q3?",
            "options": [
              "Hardware sales",
              "Cloud enterprise subscriptions",
              "Real estate investments",
              "Government grants"
            ],
            "answer": 1,
            "explanation": "Driven predominantly by our cloud enterprise subscriptions."
          }
        ]
      }
    ],
    "speaking": [
      {
        "id": "b2-spk-1",
        "title": "Negotiating Business Contracts (Đàm Phán Hợp Đồng Thương Mại)",
        "desc": "Luyện tập các mẫu câu phản biện, bảo vệ lợi ích và đạt được thỏa thuận đôi bên cùng có lợi.",
        "sentences": [
          {
            "en": "While we appreciate your proposal, the requested delivery timeframe appears overly ambitious.",
            "vi": "Mặc dù chúng tôi đánh giá cao đề xuất của quý công ty, khung thời gian giao hàng được yêu cầu có vẻ hơi quá gấp.",
            "ipa": "/waɪl wiː əˈpriː.ʃi.eɪt jʊər prəˈpoʊ.zəl ðə rɪˈkwes.tɪd dɪˈlɪv.ɚ.i ˈteɪm.freɪm əˈpɪrz ˈoʊ.vɚ.li æmˈbɪʃ.əs/"
          },
          {
            "en": "If you could extend the payment terms to sixty days, we would be willing to commit to a higher volume.",
            "vi": "Nếu quý vị có thể gia hạn điều khoản thanh toán lên 60 ngày, chúng tôi sẵn sàng cam kết số lượng lớn hơn.",
            "ipa": "/ɪf juː kʊd ɪkˈstend ðə ˈpeɪ.mənt tɝːmz tuː ˈsɪks.ti deɪz wiː wʊd biː ˈwɪl.ɪŋ tuː kəˈmɪt tuː ə ˈhaɪ.ɚ ˈvɑːl.juːm/"
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "b2-wrt-1",
        "title": "Luyện Dịch Câu: Đảo Ngữ & Câu Điều Kiện Hỗn Hợp",
        "desc": "Dịch câu văn phong báo chí, tài chính và cấu trúc nâng cao.",
        "sentences": [
          {
            "vi": "Hiếm khi chúng ta chứng kiến một sự biến động thị trường đột ngột như vậy.",
            "target": "Rarely have we witnessed such a sudden market volatility.",
            "hint": "Rarely have we witnessed, sudden market volatility"
          },
          {
            "vi": "Nếu hôm qua bạn chuẩn bị kỹ hơn, thì hôm nay bạn đã không lo lắng thế này.",
            "target": "If you had prepared more thoroughly yesterday, you would not be so worried today.",
            "hint": "If you had prepared, would not be so worried"
          }
        ]
      }
    ],
    "grammar": [
      {
        "id": "b2-grm-1",
        "title": "Đảo Ngữ Với Phó Từ Phủ Định (Inversion with Negative Adverbs)",
        "desc": "Cấu trúc đảo trợ động từ lên trước chủ ngữ khi từ phủ định đứng đầu câu.",
        "theory": "1. Từ đảo ngữ: Never, Rarely, Seldom, Hardly, Scarcely, Under no circumstances.\n2. Cấu trúc: Negative Word + Trợ động từ (Auxiliary) + S + V-bare.\n3. Ví dụ: Never have I seen such beauty = I have never seen such beauty.",
        "quiz": [
          {
            "q": "Hardly _____ the office when the fire alarm went off.",
            "options": [
              "had he entered",
              "he had entered",
              "he entered",
              "did he entered"
            ],
            "answer": 0,
            "explanation": "Cấu trúc Hardly had + S + V3/ed when... đảo Had lên trước he."
          }
        ]
      }
    ]
  },
  "C1": {
    "reading": [
      {
        "id": "c1-read-1",
        "title": "The Epistemology of Cognitive Bias in Institutional Decision-Making",
        "desc": "Phân tích bản chất nhận thức luận về các định kiến tâm lý trong ban lãnh đạo tập đoàn.",
        "passage": "Organizational epistemology suggests that institutional failures rarely stem from an absolute dearth of empirical data. Rather, they are precipitated by systemic cognitive heuristics, predominantly confirmation bias and groupthink, which coalesce to filter contradictory evidence prior to executive deliberation.\n\nWhen hierarchical hierarchies disincentivize intellectual dissent, collective inertia takes hold. Counteracting this institutional ossification necessitates deliberately instituted red-teaming protocols, thereby enshrining dialectical scrutiny as a prerequisite for capital allocation.",
        "vocabulary": [
          {
            "word": "dearth",
            "meaning": "sự khan hiếm trầm trọng",
            "pron": "/dɝːθ/"
          },
          {
            "word": "ossification",
            "meaning": "sự cứng nhắc, bảo thủ",
            "pron": "/ˌɑː.sə.fəˈkeɪ.ʃən/"
          },
          {
            "word": "dialectical",
            "meaning": "mang tính biện chứng",
            "pron": "/ˌdaɪ.əˈlek.tɪ.kəl/"
          }
        ],
        "questions": [
          {
            "q": "What is the primary cause of institutional failures discussed?",
            "options": [
              "Lack of budget",
              "Systemic cognitive heuristics and groupthink",
              "Slow internet connections",
              "Employee illness"
            ],
            "answer": 1,
            "explanation": "They are precipitated by systemic cognitive heuristics, predominantly confirmation bias..."
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "c1-lis-1",
        "title": "Geopolitical & Monetary Policy Keynote (Tham Luận Chính Sách Tiền Tệ)",
        "desc": "Bài diễn thuyết chuyên sâu của Thống đốc Ngân hàng Trung ương về kiềm chế lạm phát.",
        "transcript": "Distinguished guests, navigating the protracted macroeconomic conundrum of quantitative tightening requires monetary precision. Transitory supply shocks have compounded entrenched wage pressures, complicating our core inflation trajectory. We must remain steadfast, resisting premature easing until qualitative indicators unequivocally corroborate durable disinflation.",
        "audioSpeed": 1.1,
        "questions": [
          {
            "q": "What is the speaker's stance on interest rate easing?",
            "options": [
              "Ease rates immediately",
              "Resist premature easing until disinflation is durable",
              "Double interest rates tomorrow",
              "Abolish all central banks"
            ],
            "answer": 1,
            "explanation": "Resisting premature easing until qualitative indicators unequivocally corroborate durable disinflation."
          }
        ]
      }
    ],
    "speaking": [
      {
        "id": "c1-spk-1",
        "title": "Academic Debate & Rhetoric (Hùng Biện Học Thuật & Diễn Thuyết)",
        "desc": "Mẫu câu diễn đạt sắc sảo, tính thuyết phục cao và từ vựng tinh hoa.",
        "sentences": [
          {
            "en": "It is incumbent upon us to critically interrogate the tacit assumptions underpinning this thesis.",
            "vi": "Trách nhiệm của chúng ta là phải chất vấn sâu sắc những giả định ngầm làm nền tảng cho luận điểm này.",
            "ipa": "/ɪt ɪz ɪnˈkʌm.bənt əˈpɑːn ʌs tuː ˈkrɪt̬.ɪ.kəl.i ɪnˈter.ə.ɡeɪt ðə ˈtæs.ɪt əˈsʌmp.ʃənz ˌʌn.dɚˈpɪn.ɪŋ ðɪs ˈθiː.sɪs/"
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "c1-wrt-1",
        "title": "Luyện Dịch Văn Phong Học Thuật C1",
        "desc": "Biến đổi câu văn thông thường thành phong cách trang trọng và uyên bác.",
        "sentences": [
          {
            "vi": "Sự chậm trễ này không thể quy trách nhiệm cho sự tắc trách của bộ phận vận hành.",
            "target": "This delay cannot be attributed to the negligence of the operational department.",
            "hint": "attributed to, negligence of operational department"
          }
        ]
      }
    ],
    "grammar": [
      {
        "id": "c1-grm-1",
        "title": "Thể Giả Định & Cấu Trúc Khách Quan (Subjunctive Mood & Impersonal Passive)",
        "desc": "Sử dụng It is imperative that S + (should) + V-bare trong văn bản pháp quy.",
        "theory": "1. Cấu trúc: It is essential/vital/imperative/recommended that S + (should) + V-bare (không chia theo thì/ngôi).\n2. Ví dụ: It is recommended that he be present at the court.",
        "quiz": [
          {
            "q": "The board recommended that the CEO _____ immediately.",
            "options": [
              "resigns",
              "resign",
              "resigned",
              "is resign"
            ],
            "answer": 1,
            "explanation": "Thể giả định dùng động từ nguyên thể V-bare (resign)."
          }
        ]
      }
    ]
  },
  "C2": {
    "reading": [
      {
        "id": "c2-read-1",
        "title": "The Semantic Drift of Literary Postmodernism (Ngữ Nghĩa Học Hậu Hiện Đại)",
        "desc": "Khám phá sự biến chuyển tinh tế của ngôn ngữ văn học và cấu trúc tự sự đương đại.",
        "passage": "In scrutinizing the variegated tapestry of postmodern literature, one encounters an intractable paradox: the deliberate subversion of authorial intentionality. Language ceases to function merely as a transparent conduit for metaphysical truth; rather, it metastasizes into an autonomous play of signifiers, rendering canonical interpretations perpetually contingent and irremediably polysemic.",
        "vocabulary": [
          {
            "word": "intractable",
            "meaning": "nan giải, khó kiểm soát",
            "pron": "/ɪnˈtræk.tə.bəl/"
          },
          {
            "word": "polysemic",
            "meaning": "đa nghĩa, nhiều tầng hàm ý",
            "pron": "/ˌpɑː.liˈsiː.mɪk/"
          }
        ],
        "questions": [
          {
            "q": "How does language function in postmodern literature according to the passage?",
            "options": [
              "As an infallible scientific tool",
              "As an autonomous play of signifiers",
              "Purely as a musical rhyme",
              "Only for basic commercial transactions"
            ],
            "answer": 1,
            "explanation": "It metastasizes into an autonomous play of signifiers."
          }
        ]
      }
    ],
    "listening": [
      {
        "id": "c2-lis-1",
        "title": "Philosophical Discourse on Aesthetics (Triết Học Thẩm Mỹ)",
        "desc": "Đối thoại học thuật đỉnh cao giữa hai triết gia về ranh giới cái đẹp và nghệ thuật.",
        "transcript": "To conflate sensory aesthetic gratification with ontological veracity is an egregious philosophical misstep. Art attains sublime transcendence precisely when it repudiates mimetic verisimilitude, forcing the observer to confront the uncanny interstices between reality and representation.",
        "audioSpeed": 1.15,
        "questions": [
          {
            "q": "When does art attain transcendence according to the speaker?",
            "options": [
              "When it sells for billions",
              "When it repudiates mimetic verisimilitude",
              "When everyone agrees with it",
              "When painted in blue"
            ],
            "answer": 1,
            "explanation": "Art attains sublime transcendence precisely when it repudiates mimetic verisimilitude."
          }
        ]
      }
    ],
    "speaking": [
      {
        "id": "c2-spk-1",
        "title": "Nuanced Rhetoric and Eloquence (Diễn Ngôn Nghệ Thuật & Bản Ngữ)",
        "desc": "Rèn luyện ngữ điệu, nhịp dừng và khả năng sử dụng từ ngữ tao nhã tuyệt đối.",
        "sentences": [
          {
            "en": "Such ostensibly innocuous concessions invariably culminate in an irreversible erosion of our fundamental prerogatives.",
            "vi": "Những sự nhượng bộ bề ngoài tưởng như vô hại đó chắc chắn sẽ dẫn đến sự xói mòn không thể đảo ngược các đặc quyền cơ bản của chúng ta.",
            "ipa": "/sʌtʃ ɑːˈsten.sə.bli ɪˈnɑːk.ju.əs kənˈseʃ.ənz ɪnˈver.i.ə.bli ˈkʌl.mə.neɪt ɪn ən ˌɪr.əˈvɝː.sə.bəl ɪˈroʊ.ʒən əv ˈaʊ.ɚ ˌfʌn.dəˈmen.t̬əl prɪˈrɑː.ɡə.t̬ɪvz/"
          }
        ]
      }
    ],
    "writing": [
      {
        "id": "c2-wrt-1",
        "title": "Luyện Dịch Văn Phong Đỉnh Cao C2 (Mastery Translation)",
        "desc": "Truyền tải các sắc thái biểu cảm sâu sắc và cấu trúc ngôn từ tinh tế.",
        "sentences": [
          {
            "vi": "Sự thiếu quyết đoán triền miên của ban điều hành đã vô tình bóp nghẹt mọi sáng kiến đột phá.",
            "target": "The chronic vacillation of the management has inadvertently stifled all groundbreaking initiatives.",
            "hint": "chronic vacillation, inadvertently stifled, groundbreaking initiatives"
          }
        ]
      }
    ],
    "grammar": [
      {
        "id": "c2-grm-1",
        "title": "Cấu Trúc Tỉnh Lược & Câu Chẻ Nâng Cao (Ellipsis & Advanced Clefts)",
        "desc": "Nghệ thuật tỉnh lược để câu văn ngắn gọn, sắc sảo mà vẫn chặt chẽ ngữ pháp.",
        "theory": "1. Câu chẻ đảo: What he lacked in formal education, he compensated for with tenacity.\n2. Tỉnh lược nâng cao: Though weary, the negotiators persevered (= Though they were weary...).",
        "quiz": [
          {
            "q": "_____ surprising was not his victory, but the margin by which he won.",
            "options": [
              "What",
              "What was",
              "It was",
              "That was"
            ],
            "answer": 1,
            "explanation": "Cấu trúc câu chẻ với What: What was surprising was not..."
          }
        ]
      }
    ]
  }
};
