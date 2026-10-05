// ═════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE READING DATABASE (TEST-ENGLISH OFFICIAL CURRICULUM A1 -> C1)
// ═════════════════════════════════════════════════════════════════════════════

export const READING_LEVELS = [
  {
    "id": "A1",
    "name": "A1 Elementary",
    "icon": "fa-seedling",
    "desc": "Đoạn văn ngắn, miêu tả người, thói quen & đời sống"
  },
  {
    "id": "A2",
    "name": "A2 Pre-intermediate",
    "icon": "fa-shoe-prints",
    "desc": "Mô tả công việc, sở thích, trải nghiệm du lịch"
  },
  {
    "id": "B1",
    "name": "B1 Intermediate",
    "icon": "fa-feather",
    "desc": "Bài báo, văn hóa, phỏng vấn và thói quen tâm lý"
  },
  {
    "id": "B1-plus",
    "name": "B1+ Upper-intermediate",
    "icon": "fa-compass",
    "desc": "Bài phân tích xu hướng công nghệ & lối sống"
  },
  {
    "id": "B2",
    "name": "B2 Pre-advanced",
    "icon": "fa-bolt",
    "desc": "Bài nghiên cứu khoa học, kinh tế hành vi, bảo vệ môi trường"
  },
  {
    "id": "C1",
    "name": "C1 Advanced",
    "icon": "fa-crown",
    "desc": "Văn phong học thuật, triết học & chuyển đổi trí tuệ nhân tạo"
  }
];

export const READING_DATABASE = {
  "A1": [
    {
      "id": "read-a1-guess-who",
      "title": "Guess who? – A1 English Reading Test",
      "subtitle": "Personal Introductions, Jobs & Hobbies",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
      "desc": "Đọc giới thiệu bản thân của 4 nhân vật (Maria, Tom, Aiko, Luis) về nghề nghiệp, thói quen và sở thích.",
      "passage": "Maria:\nHello! My name is Maria and I'm from Spain. I am a teacher. I work with young children. In my free time, I like to read books and cook Spanish food for my family. At the weekend, I enjoy meeting friends. We often visit museums and sometimes go to concerts.\n\nTom:\nHi! I'm Tom and I come from the United States. I am a doctor and I work in a hospital. I love playing basketball and often play with my friends on Saturdays. In the evening, I like watching films at home. On Sundays, I usually go hiking in the mountains to take pictures.\n\nAiko:\nHello, my name is Aiko. I'm from Japan. I am a student studying medicine at university because I want to become a doctor in the future. I don't work right now. I prefer spending time alone and traveling solo to different cities. After dinner, I usually play video games in my room rather than watching TV.\n\nLuis:\nHi, I'm Luis. I'm from Brazil, but I live and work in Australia now. I am a chef in a restaurant. Cooking is my passion, but when I'm at home, I often order take-away pizza. At the weekend, I love watching football matches on TV. I have a big family in Brazil and I miss them very much.",
      "vocabulary": [
        {
          "word": "passion",
          "meaning": "niềm đam mê",
          "pron": "/ˈpæʃ.ən/"
        },
        {
          "word": "take-away",
          "meaning": "đồ ăn mang về",
          "pron": "/ˈteɪk.ə.weɪ/"
        },
        {
          "word": "hiking",
          "meaning": "đi bộ đường dài dã ngoại",
          "pron": "/ˈhaɪ.kɪŋ/"
        },
        {
          "word": "solo",
          "meaning": "một mình, đơn độc",
          "pron": "/ˈsəʊ.ləʊ/"
        }
      ],
      "questions": [
        {
          "q": "1. Who likes to cook at home?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 0,
          "explanation": "Maria: \"In my free time, I like to read books and cook Spanish food for my family.\""
        },
        {
          "q": "2. Who doesn't have a job?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 2,
          "explanation": "Aiko: \"I am a student studying medicine... I don't work right now.\""
        },
        {
          "q": "3. Who works in a school?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 0,
          "explanation": "Maria: \"I am a teacher. I work with young children.\""
        },
        {
          "q": "4. Who lives far from their family?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 3,
          "explanation": "Luis: \"I'm from Brazil, but I live and work in Australia now... I have a big family in Brazil and I miss them very much.\""
        },
        {
          "q": "5. Who works in a hospital?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 1,
          "explanation": "Tom: \"I am a doctor and I work in a hospital.\""
        },
        {
          "q": "6. Who likes playing sports?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 1,
          "explanation": "Tom: \"I love playing basketball and often play with my friends on Saturdays.\""
        },
        {
          "q": "7. Who spends a lot of time alone?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 2,
          "explanation": "Aiko: \"I prefer spending time alone and traveling solo to different cities.\""
        },
        {
          "q": "8. Who stays at home to watch TV at the weekend?",
          "options": [
            "Maria",
            "Tom",
            "Aiko",
            "Luis"
          ],
          "answer": 3,
          "explanation": "Luis: \"At the weekend, I love watching football matches on TV.\""
        }
      ]
    },
    {
      "id": "read-a1-family",
      "title": "About my family (Describing people) – A1 Reading Test",
      "subtitle": "Describing Family & Occupations",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80",
      "desc": "Bức thư của Jonathan kể về các thành viên gia đình, nghề nghiệp của bố mẹ và sở thích âm nhạc của em gái.",
      "passage": "Dear Marta,\n\nI'm going to tell you about my family. I live with my little sister, mum, and dad. We live in London, although I grew up in Lancaster, a beautiful city in the North of England.\n\nMy dad's name is Pierre. He's from France, and he speaks English and French. When he was young, my mother went to France on a student exchange, and they met there. A few years later, my dad moved to England and married my mum. He works as a French teacher. He's very tall – much taller than my mum – and athletic. He's got short blonde hair and blue eyes.\n\nMy mum's name is Anna. She's English. She's quite short, and she's got long curly brown hair and brown eyes. She works at a chemist's opposite our home. She can speak French too!\n\nMy sister Julia is 18 years old, and she's got the same colour of hair and eyes as my father. She loves playing the piano and dancing. She's very talented, and she would like to be a professional musician.\n\nI've got short blonde hair like my dad, but brown eyes like my mom. We all love playing board games together on Friday evenings, and we always order pizza. Our favourite game is Monopoly. Oh, I almost forgot… we've also got a pet cat, Snowball. She's all white and has got a lot of fur. She likes sleeping on me.\n\nWrite back soon. Please, tell me about your family too.\nLove,\nJonathan",
      "vocabulary": [
        {
          "word": "chemist's",
          "meaning": "hiệu thuốc tây",
          "pron": "/ˈkem.ɪsts/"
        },
        {
          "word": "athletic",
          "meaning": "khỏe khoắn, thể thao",
          "pron": "/æθˈlet.ɪk/"
        },
        {
          "word": "talented",
          "meaning": "có năng khiếu, tài năng",
          "pron": "/ˈtæl.ən.tɪd/"
        },
        {
          "word": "student exchange",
          "meaning": "chương trình trao đổi học sinh",
          "pron": "/ˈstjuː.dənt ɪksˈtʃeɪndʒ/"
        }
      ],
      "questions": [
        {
          "q": "Jonathan was born in London.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Jonathan lớn lên ở Lancaster, không phải London. (\"I grew up in Lancaster, a beautiful city in the North of England.\")"
        },
        {
          "q": "His parents both speak more than one language.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Bố nói tiếng Anh và Pháp (\"he speaks English and French\"), mẹ cũng nói được tiếng Pháp (\"She can speak French too!\")."
        },
        {
          "q": "They got married in France.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Pierre chuyển đến Anh và kết hôn ở đó. (\"my dad moved to England and married my mum.\")"
        },
        {
          "q": "Jonathan's mother is a lot shorter than his father.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Bố \"very tall – much taller than my mum\", mẹ \"quite short\" → mẹ thấp hơn rất nhiều."
        },
        {
          "q": "She doesn't work far from home.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Mẹ làm ở hiệu thuốc ngay trước nhà. (\"She works at a chemist's opposite our home.\")"
        },
        {
          "q": "Jonathan's sister has got blue eyes.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Julia \"got the same colour of hair and eyes as my father\" – bố có mắt xanh (\"blue eyes\") → Julia cũng có mắt xanh."
        },
        {
          "q": "She works as a musician.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Julia muốn trở thành nhạc sĩ chuyên nghiệp nhưng chưa làm việc. (\"she would like to be a professional musician.\")"
        },
        {
          "q": "Jonathan's hair is the same colour as his mother's.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Jonathan có tóc vàng (như bố), mẹ có tóc nâu. (\"I've got short blonde hair like my dad, but brown eyes like my mom.\")"
        },
        {
          "q": "On Fridays, they always eat the same thing.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Gia đình luôn gọi pizza vào tối thứ Sáu. (\"we always order pizza\" every Friday evening.)"
        }
      ]
    },
    {
      "id": "read-a1-neighborhood",
      "title": "My neighborhood – A1 English Reading Test",
      "subtitle": "Places in Town & Community Life",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&auto=format&fit=crop&q=80",
      "desc": "Một khu ngoại ô yên tĩnh trên đường Maple Road với những ngôi nhà lớn, công viên, và hàng xóm chăm sóc lẫn nhau.",
      "passage": "My neighborhood is very peaceful and quiet. It is a new neighborhood, and there are a lot of big houses and some apartment buildings. The streets are very clean, and there aren't many cars. My school is near my house. I can walk there in 10 minutes.\n\nThere's also a park, which has a small playground for children and a large field. I like to play baseball there with my friends after school. All of the houses have a small front yard but big back yards. Most of my neighbors have a swimming pool, and some even have a trampoline!\n\nEveryone has a flower garden, and in the spring, it is very beautiful. My road is called Maple Road. It is not in the city. It's in the suburbs. There aren't any restaurants, bars or cinemas on my road. But, if you go to Main Street, you can find a lot of things to do. My favorite store is there. It's called Knick-Knack, and they sell everything you can imagine.\n\nI like my neighborhood because it is very safe. There is no crime, and all of my neighbors take care of each other. The police station is next to the school, which is very nice. However, the hospital is quite far. It is in the city, and we have to drive 30 minutes to get there.\n\nMy friends live near me, and we often meet up to play or just talk. We love playing hockey in the street because there isn't any traffic. I think I am lucky to live in my neighborhood.",
      "vocabulary": [
        {
          "word": "suburbs",
          "meaning": "vùng ngoại ô",
          "pron": "/ˈsʌb.ɜːrbz/"
        },
        {
          "word": "trampoline",
          "meaning": "sàn nhún lò xo",
          "pron": "/ˌtræm.pəˈliːn/"
        },
        {
          "word": "field",
          "meaning": "sân bãi, cánh đồng",
          "pron": "/fiːld/"
        },
        {
          "word": "crime",
          "meaning": "tội phạm",
          "pron": "/kraɪm/"
        }
      ],
      "questions": [
        {
          "q": "It's a busy neighborhood with lots of activity.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Khu phố được mô tả là \"peaceful and quiet\" (yên bình và yên tĩnh), không bận rộn."
        },
        {
          "q": "There are only a few cars on the streets.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"The streets are very clean, and there aren't many cars.\" – rất ít xe → True."
        },
        {
          "q": "He enjoys playing in the playground near his home.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Anh ấy chơi bóng chày ở sân lớn trong công viên, không phải sân chơi trẻ em. (\"I like to play baseball there with my friends\")"
        },
        {
          "q": "People decorate their flower gardens in the fall to make them beautiful.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Vườn hoa đẹp vào mùa xuân (spring), không phải mùa thu (fall). (\"in the spring, it is very beautiful\")"
        },
        {
          "q": "He lives in the city.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Anh ấy sống ở vùng ngoại ô, không phải thành phố. (\"It's in the suburbs.\")"
        },
        {
          "q": "He lives on Main Street.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Anh ấy sống trên đường Maple Road, không phải Main Street. (\"My road is called Maple Road.\")"
        },
        {
          "q": "He lives beside the police station.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Trường học mới ở cạnh đồn cảnh sát, không phải nhà anh ấy. (\"The police station is next to the school.\")"
        },
        {
          "q": "He's very happy with his neighborhood.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"I think I am lucky to live in my neighborhood.\" – anh ấy cảm thấy may mắn và hài lòng."
        }
      ]
    },
    {
      "id": "read-a1-british-ways",
      "title": "The British ways – A1 English Reading Test",
      "subtitle": "British Culture, Manners & Tea Time",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80",
      "desc": "Bốn người nước ngoài (Yuki, Carlos, Anna, Ahmed) chia sẻ cảm nhận của họ về lối sống và văn hóa Anh.",
      "passage": "Yuki is from Japan. She has lived in the UK for three years, and she loves it. She thinks British parks are wonderful, especially in the spring, when all the flowers are in bloom. She really enjoys British food too – especially fish and chips and Sunday roast. She doesn't mind the rain and grey skies because, as she says, \"It makes everything so green!\" She finds British people very friendly and polite. Her favourite British custom is \"afternoon tea\".\n\nCarlos is from Mexico. He has been in the UK for just six months, but he already feels at home. He loves going out with his friends at the weekend. He thinks British pubs are great places to meet people and relax. He finds it interesting that people drink tea many times a day – morning, afternoon and even after dinner. He's learning to enjoy it too. He likes British humour, even though it is sometimes hard to understand.\n\nAnna is from Poland. She moved to the UK eight years ago. She loves living there and has made many British friends. She thinks people are very polite because they say \"please\" and \"thank you\" all the time. However, she is not a fan of the food in the UK. She thinks it is a bit bland and misses Polish food a lot. She often cooks traditional Polish meals at home.\n\nAhmed is from Egypt. He has been in the UK for two years. He was surprised to find that houses in the UK are very nice and warm, even in winter. He thinks British people are very organised and always on time for meetings and appointments. He loves the multicultural nature of British cities and thinks London is one of the most exciting cities in the world.",
      "vocabulary": [
        {
          "word": "in bloom",
          "meaning": "nở hoa",
          "pron": "/ɪn bluːm/"
        },
        {
          "word": "bland",
          "meaning": "nhạt nhẽ, không có hương vị",
          "pron": "/blænd/"
        },
        {
          "word": "multicultural",
          "meaning": "đa văn hóa",
          "pron": "/ˌmʌl.tɪˈkʌl.tʃər.əl/"
        },
        {
          "word": "organised",
          "meaning": "nghiêm túc, có tổ chức",
          "pron": "/ˈɔː.ɡə.naɪzd/"
        }
      ],
      "questions": [
        {
          "q": "Yuki doesn't like the British weather.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Yuki không ngại mưa và bầu trời xám. (\"She doesn't mind the rain and grey skies.\")"
        },
        {
          "q": "Yuki enjoys learning about British culture.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Yuki thích ăn trưa kiểu Anh, công viên Anh và phong tục Anh. (\"Her favourite British custom is 'afternoon tea'\")"
        },
        {
          "q": "Carlos likes going out with friends.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"He loves going out with his friends at the weekend.\""
        },
        {
          "q": "Carlos doesn't like drinking tea.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Carlos thấy việc uống trà thú vị và đang học cách thưởng thức nó. (\"He's learning to enjoy it too.\")"
        },
        {
          "q": "Anna thinks that British people are very polite.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"She thinks people are very polite because they say 'please' and 'thank you' all the time.\""
        },
        {
          "q": "Anna doesn't like British food.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Anna không thích đồ ăn ở Anh vì thấy nó nhạt nhẽo. (\"However, she is not a fan of the food in the UK. She thinks it is a bit bland...\")"
        },
        {
          "q": "Ahmed says that houses in the UK are very cold.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Ahmed ngạc nhiên thấy nhà ở Anh rất đẹp và ấm (\"houses in the UK are very nice and warm\")."
        },
        {
          "q": "Ahmed thinks that British people are sometimes late.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Ahmed thấy người Anh luôn đúng giờ (\"always on time for meetings\")."
        }
      ]
    },
    {
      "id": "read-a1-life-abroad",
      "title": "My life abroad – A1 English Reading Test",
      "subtitle": "Living Overseas, Studies & Cultural Experiences",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
      "desc": "Bốn người (Teresa, Ahmed, Ling, Carlos) kể về trải nghiệm sống và học tập ở nước ngoài.",
      "passage": "Teresa is from Portugal, and she moved to the UK to study graphic design at university. She studies a lot, but she doesn't find English very difficult. She has a great social life and enjoys going to the cinema and meeting friends at the weekend. She loves the UK because the universities are great.\n\nAhmed is from Morocco. He moved to Germany two years ago to work for a technology company. He lives in Berlin, which is a very cosmopolitan city. In his free time, he loves exploring Berlin's museums and galleries. He doesn't usually stay at home at the weekend. He goes cycling or visits different parts of the city. He misses his family, but he is very happy in Germany.\n\nLing is from China. She moved to Sydney, Australia to study English for a year. She lives with an Australian family in the suburbs of Sydney. She thinks Australians are very friendly and easy to talk to. She spends a lot of her free time at the beach because the weather is wonderful. She surfs and swims every day after class.\n\nCarlos is from Mexico. He moved to Tokyo to teach Spanish at a language school. He loves Japan because everything is very different from Mexico. He finds the food amazing and tries new restaurants every week. He is learning Japanese in his free time, and he thinks it is very difficult. He goes to a Japanese class every Saturday morning.",
      "vocabulary": [
        {
          "word": "cosmopolitan",
          "meaning": "đa văn hóa, quốc tế",
          "pron": "/ˌkɒz.məˈpɒl.ɪ.tən/"
        },
        {
          "word": "graphic design",
          "meaning": "thiết kế đồ họa",
          "pron": "/ˈɡræf.ɪk dɪˈzaɪn/"
        },
        {
          "word": "suburbs",
          "meaning": "ngoại ô",
          "pron": "/ˈsʌb.ɜːbz/"
        },
        {
          "word": "explore",
          "meaning": "khám phá",
          "pron": "/ɪkˈsplɔːr/"
        }
      ],
      "questions": [
        {
          "q": "Learning English is difficult for Teresa.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "\"She studies a lot, but she doesn't find English very difficult.\""
        },
        {
          "q": "Teresa watches football when she is not studying.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Teresa thích đi xem phim và gặp bạn bè, không xem bóng đá. (\"she enjoys going to the cinema and meeting friends\")"
        },
        {
          "q": "Ahmed moved to Germany for work.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"He moved to Germany two years ago to work for a technology company.\""
        },
        {
          "q": "Ahmed doesn't stay at home at the weekend.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"He doesn't usually stay at home at the weekend. He goes cycling or visits different parts of the city.\""
        },
        {
          "q": "Ling doesn't like people from Australia.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Ling thấy người Úc rất thân thiện. (\"She thinks Australians are very friendly and easy to talk to.\")"
        },
        {
          "q": "Ling spends her free time by the sea.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"She spends a lot of her free time at the beach... She surfs and swims every day.\""
        },
        {
          "q": "Carlos moved to Japan to study Japanese.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Carlos chuyển đến Tokyo để dạy Tiếng Tây Ban Nha, không phải học tiếng Nhật. (\"He moved to Tokyo to teach Spanish at a language school.\")"
        },
        {
          "q": "Carlos likes Japanese food.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "\"He finds the food amazing and tries new restaurants every week.\""
        }
      ]
    },
    {
      "id": "read-a1-top-things",
      "title": "Top things that I do – A1 English Reading Test",
      "subtitle": "Hobbies, Routines & Favourite Activities",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      "desc": "Một người kể về những hoạt động yêu thích trong ngày nghỉ Chủ nhật: yoga, uống cà phê, chụp ảnh, đọc sách và nấu ăn.",
      "passage": "My name is Luke, and today I am going to tell you about my favourite things to do on Sundays.\n\nI don't [1] on Sunday, so I can get up late. They all drink tea in the morning, but I [2] with milk and sugar. After breakfast, I go for a walk in the park. On Sunday mornings, I [3]. I often do yoga or go to the gym. I like to look at interesting things when I'm in the park. I like to [4] of the nice things I see.\n\nIn the afternoon, I [5]; my favourite writer is Stephen King. Then, I [6] Annie and we decide what to do in the afternoon. She usually wants to stay at home and [7]. I'm not very good at video games, but I enjoy playing with her. Sometimes she lets me decide, and sometimes we [8]. It's my favourite sport.\n\nWhen I'm hungry, I [9] and eat with my family at about 7 o'clock. We go to the living room and [10] together.",
      "vocabulary": [
        {
          "word": "yoga",
          "meaning": "yoga (động tác thể dục)",
          "pron": "/ˈjəʊ.ɡə/"
        },
        {
          "word": "video games",
          "meaning": "trò chơi điện tử",
          "pron": "/ˈvɪdi.əʊ ɡeɪmz/"
        },
        {
          "word": "gym",
          "meaning": "phòng tập thể hình",
          "pron": "/dʒɪm/"
        },
        {
          "word": "recipe",
          "meaning": "công thức nấu ăn",
          "pron": "/ˈres.ɪ.pi/"
        }
      ],
      "questions": [
        {
          "q": "Gap 1: \"I don't [1] on Sunday, so I can get up late.\"",
          "options": [
            "call my friend",
            "go to work",
            "cook dinner",
            "do exercise"
          ],
          "answer": 1,
          "explanation": "Luke không đi làm vào Chủ nhật nên mới ngủ dậy muộn được. (B. go to work)"
        },
        {
          "q": "Gap 2: \"they all drink tea, but I [2] with milk and sugar.\"",
          "options": [
            "play football",
            "read a book",
            "watch TV",
            "have a coffee"
          ],
          "answer": 3,
          "explanation": "Luke uống cà phê với sữa và đường thay vì trà. (J. have a coffee)"
        },
        {
          "q": "Gap 3: \"On Sunday mornings, I [3]. I often do yoga or go to the gym.\"",
          "options": [
            "take a photo",
            "play video games",
            "do exercise",
            "call my friend"
          ],
          "answer": 2,
          "explanation": "Yôga và tập gym → đây là \"do exercise\". (D. do exercise)"
        },
        {
          "q": "Gap 4: \"I like to [4] of the nice things I see.\"",
          "options": [
            "watch TV",
            "take a photo",
            "play football",
            "cook dinner"
          ],
          "answer": 1,
          "explanation": "Thích chụp ảnh cảnh đẹp đã thấy. (F. take a photo)"
        },
        {
          "q": "Gap 5: \"In the afternoon, I [5]; my favourite writer is Stephen King.\"",
          "options": [
            "go to work",
            "play video games",
            "read a book",
            "cook dinner"
          ],
          "answer": 2,
          "explanation": "Nhà văn Stephen King → Luke đọc sách. (I. read a book)"
        },
        {
          "q": "Gap 6: \"Then, I [6] Annie and we decide what to do.\"",
          "options": [
            "call my friend",
            "play football",
            "watch TV",
            "do exercise"
          ],
          "answer": 0,
          "explanation": "Gọi bạn Annie để quyết định làm gì buổi chiều. (A. call my friend)"
        },
        {
          "q": "Gap 7: \"She usually wants to stay at home and [7].\"",
          "options": [
            "cook dinner",
            "read a book",
            "play video games",
            "call my friend"
          ],
          "answer": 2,
          "explanation": "Annie thích ở nhà và chơi game. (E. play video games)"
        },
        {
          "q": "Gap 8: \"sometimes we [8]. It's my favourite sport.\"",
          "options": [
            "read a book",
            "watch TV",
            "do exercise",
            "play football"
          ],
          "answer": 3,
          "explanation": "Môn thể thao yêu thích của Luke là bóng đá. (H. play football)"
        },
        {
          "q": "Gap 9: \"When I'm hungry, I [9] and eat with my family.\"",
          "options": [
            "watch TV",
            "call my friend",
            "cook dinner",
            "go to work"
          ],
          "answer": 2,
          "explanation": "Khi đói, Luke nấu ăn tối rồi ăn cùng gia đình. (C. cook dinner)"
        },
        {
          "q": "Gap 10: \"We go to the living room and [10] together.\"",
          "options": [
            "play football",
            "do exercise",
            "read a book",
            "watch TV"
          ],
          "answer": 3,
          "explanation": "Cả gia đình xem TV cùng nhau trong phòng khách. (G. watch TV)"
        }
      ]
    },
    {
      "id": "read-a1-pilot",
      "title": "A day in the life of an airline pilot – A1 Reading Test",
      "subtitle": "Daily Routines, Flying & Aviation",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1-reading_A-day-in-life-of-pilot.webp",
      "desc": "Đọc về lịch trình hàng ngày của nữ cơ trưởng Carole: từ việc thức dậy lúc 4h sáng, chuẩn bị chuyến bay cùng phi hành đoàn cho đến khi trở về nhà thư giãn.",
      "passage": "Carole is an aeroplane pilot. She usually works during the week and has weekends off, but she sometimes works Saturdays or Sundays. When Carol has to work, her day usually starts very early in the morning. She wakes up at 4 a.m. and gets ready for work. She has a shower and gets dressed. She wears a uniform. At 4.30, Carole has cereal with milk and drinks a large coffee. After that, she packs her flight bag for the day.\n\nAt 5 o’clock, she gets in her car and drives to the airport. Before the flight, she meets the rest of her crew. The first officer helps her fly the plane and the cabin crew look after the passengers during the flight. They talk about the weather while they get on board the plane all together.\n\nDuring the flight, the cabin crew give food and drinks to the passengers. Carole talks to the passengers. She gives them some information about the flight. She tells them how long the flight is, how fast they fly and how high they are. When they land at their destination, Carole says goodbye to the passengers and meets her crew to check if everything is OK. After work, Carol drives home.\n\nCarol arrives home at 5 pm. At home, she does yoga for 30 minutes to relax. Then, she cooks some food and has dinner at 7 pm. After dinner, she checks her emails for 45 minutes. Flying a plane is very tiring and Carol goes to bed very early, at 9 pm. Sometimes, she reads a book for one hour before sleeping.",
      "vocabulary": [
        {
          "word": "uniform",
          "meaning": "đồng phục phi công",
          "pron": "/ˈjuː.nɪ.fɔːm/"
        },
        {
          "word": "cabin crew",
          "meaning": "tiếp viên hàng không",
          "pron": "/ˈkæb.ɪn kruː/"
        },
        {
          "word": "destination",
          "meaning": "điểm đến, nơi hạ cánh",
          "pron": "/ˌdes.tɪˈneɪ.ʃən/"
        },
        {
          "word": "first officer",
          "meaning": "cơ phó",
          "pron": "/ˌfɜːst ˈɒf.ɪ.sər/"
        },
        {
          "word": "tiring",
          "meaning": "mệt mỏi, tốn sức",
          "pron": "/ˈtaɪə.rɪŋ/"
        }
      ],
      "questions": [
        {
          "q": "1. How many days does Carole normally fly every week?",
          "options": [
            "two",
            "four",
            "five"
          ],
          "answer": 2,
          "explanation": "Carole thường làm việc trong các ngày trong tuần (\"during the week\") và nghỉ cuối tuần (\"has weekends off\"), tức là bay 5 ngày mỗi tuần."
        },
        {
          "q": "2. What does Carole do at 4.30?",
          "options": [
            "She wakes up",
            "She eats breakfast",
            "She packs her bag"
          ],
          "answer": 1,
          "explanation": "Lúc 4:30, Carole ăn ngũ cốc với sữa và uống một cốc cà phê lớn (\"Carole has cereal with milk and drinks a large coffee\"), tức là ăn sáng."
        },
        {
          "q": "3. What do Carole and her crew talk about?",
          "options": [
            "the plane",
            "the weather",
            "the passengers"
          ],
          "answer": 1,
          "explanation": "Carole và phi hành đoàn trao đổi về thời tiết khi lên máy bay (\"They talk about the weather while they get on board\")."
        },
        {
          "q": "4. What does Carole NOT mention to the passengers?",
          "options": [
            "The duration of the flight.",
            "Information about the destination.",
            "The speed."
          ],
          "answer": 1,
          "explanation": "Carole thông báo thời gian bay (duration), tốc độ (how fast) và độ cao (how high), không nhắc đến thông tin về điểm đến (destination)."
        },
        {
          "q": "5. After the flight, Carole _____.",
          "options": [
            "says goodbye to the passengers",
            "says goodbye to the crew",
            "checks if the plane is OK"
          ],
          "answer": 0,
          "explanation": "Khi hạ cánh, Carole chào tạm biệt hành khách (\"Carole says goodbye to the passengers\")."
        },
        {
          "q": "6. When does Carole cook dinner?",
          "options": [
            "before going to bed",
            "while watching TV",
            "after doing yoga"
          ],
          "answer": 2,
          "explanation": "Về nhà, Carole tập yoga 30 phút, sau đó cô nấu ăn và ăn tối lúc 7h (\"At home, she does yoga for 30 minutes to relax. Then, she cooks some food\")."
        },
        {
          "q": "7. How long does Carole read her book for?",
          "options": [
            "30 minutes",
            "45 minutes",
            "60 minutes"
          ],
          "answer": 2,
          "explanation": "Đôi khi cô đọc sách 1 tiếng trước khi đi ngủ (\"reads a book for one hour before sleeping\" - 1 hour = 60 minutes)."
        }
      ]
    },
    {
      "id": "read-a1-sportswoman",
      "title": "The daily routines of a sportswoman – A1 Reading Test",
      "subtitle": "Athletics, Routine & Healthy Habits",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1_daily-routines-sportswoman.jpg",
      "desc": "Tìm hiểu thời gian biểu sinh hoạt và tập luyện nghiêm ngặt của vận động viên Janet từ sáng sớm đến tối.",
      "passage": "Janet is an athlete, and she wakes up at 4:30 am every weekday morning. She spends the first 30 minutes reading and then 15 minutes meditating. At 5:15 am Janet checks her email for only 30 minutes and then goes for her first run of the day. She runs for an hour and a half along the lake near her house. After running, Janet has a shower and then prepares breakfast, which is usually cereal and fruit. However, she occasionally has a less healthy breakfast.\n\nShe usually finishes breakfast at around 8 am. If it is a weekday, she always leaves the house at 8:20 and goes to training. Her training starts at 9 am, and she needs 30 minutes to drive to the gym. She trains for 3 hours with her team and then goes home for lunch. She always eats a very big and healthy lunch. As soon as she finishes lunch, she has a nap for one hour.\n\nAfter her nap, she likes to go for a walk around the lake and look at nature. She sometimes reads or meditates at the lake in the afternoon. In the evening, during the week, she meets up with friends. Most of her friends are athletes too, so they have a lot to talk about.\n\nShe typically goes to bed at 9 pm because she prefers to be awake in the morning than at night. She sometimes falls asleep listening to music, but she never watches the television or reads anything on her tablet. She always makes sure her alarm is set and is almost always asleep by 9:45 pm.",
      "vocabulary": [
        {
          "word": "athlete",
          "meaning": "vận động viên điền kinh",
          "pron": "/ˈæθ.liːt/"
        },
        {
          "word": "meditating",
          "meaning": "ngồi thiền",
          "pron": "/ˈmed.ɪ.teɪt.ɪŋ/"
        },
        {
          "word": "nap",
          "meaning": "giấc ngủ trưa ngắn",
          "pron": "/næp/"
        },
        {
          "word": "occasionally",
          "meaning": "thỉnh thoảng, đôi khi",
          "pron": "/əˈkeɪ.ʒən.əl.i/"
        },
        {
          "word": "typically",
          "meaning": "thông thường, đặc trưng",
          "pron": "/ˈtɪp.ɪ.kəl.i/"
        }
      ],
      "questions": [
        {
          "q": "1. What time does she finish checking her emails?",
          "options": [
            "5:30 am.",
            "5:45 am.",
            "6:00 am."
          ],
          "answer": 1,
          "explanation": "Janet bắt đầu kiểm tra email lúc 5:15 am trong 30 phút (\"checks her email for only 30 minutes\"), nên hoàn thành lúc 5:45 am."
        },
        {
          "q": "2. How long does she run for in the morning?",
          "options": [
            "45 minutes.",
            "60 minutes.",
            "90 minutes."
          ],
          "answer": 2,
          "explanation": "Janet chạy bộ 1 tiếng rưỡi (\"runs for an hour and a half\") tương đương 90 phút."
        },
        {
          "q": "3. Janet ______ has a healthy breakfast.",
          "options": [
            "always",
            "occasionally",
            "usually"
          ],
          "answer": 2,
          "explanation": "Bữa sáng của cô thường là ngũ cốc và hoa quả (\"usually cereal and fruit\"), chỉ thỉnh thoảng mới ăn món ít lành mạnh hơn (\"occasionally has a less healthy breakfast\")."
        },
        {
          "q": "4. How often does she meditate?",
          "options": [
            "Once or twice a day.",
            "Once a day.",
            "Rarely."
          ],
          "answer": 0,
          "explanation": "Buổi sáng cô thiền 15 phút, buổi chiều thỉnh thoảng thiền thêm ở bờ hồ (\"sometimes reads or meditates at the lake\"), nên tần suất là 1 hoặc 2 lần một ngày."
        },
        {
          "q": "5. What does Janet do to help her get to sleep?",
          "options": [
            "listen to music",
            "read on her tablet",
            "watch TV"
          ],
          "answer": 0,
          "explanation": "Janet đôi khi chìm vào giấc ngủ khi nghe nhạc (\"sometimes falls asleep listening to music\")."
        },
        {
          "q": "6. What is the last thing she does before going to sleep?",
          "options": [
            "She reads.",
            "She sets her alarm.",
            "She checks the time."
          ],
          "answer": 1,
          "explanation": "Điều cuối cùng Janet luôn làm là đảm bảo chuông báo thức đã được bật (\"always makes sure her alarm is set\")."
        }
      ]
    },
    {
      "id": "read-a1-free-time",
      "title": "What do you do with your free time? – A1 Reading Test",
      "subtitle": "Free Time, Habits & University Life",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1_free-time.png",
      "desc": "Tâm sự của một bạn sinh viên năm nhất trong kỳ nghỉ hè về cách sử dụng thời gian rảnh rỗi giữa gym, đọc sách, xem phim tài liệu và chơi game.",
      "passage": "I’m almost 19 years old, and I finished my first year of university. I’m currently on holiday, and I have a lot of free time. Having free time is nice, but the problem is that when you are a student, you never have money. And when you have a lot of free time, but you don’t have much money, it can get boring.\n\nEvery morning I go to the gym, and I read in the afternoons. But I still have a lot of free time. Going to the gym takes me about two hours, including the road time and the post-gym shower. And I usually read for one hour. Another activity that I do is watch documentaries. I study history, and I love historical documentaries. I learn a lot from them. I watch documentaries for one and a half hours four or five times a week.\n\nBut those activities are a small part of my day. When I’m not at the gym or reading, I get bored, and I often play video games for hours. I enjoy playing video games, but I don’t think it’s a productive activity. When I play for a long time, I feel bad. I’d like to find more productive activities to do, but it isn’t easy. I live in a small town, and there aren’t many things to do.\n\nDo you have any suggestions? What do you do with your free time?",
      "vocabulary": [
        {
          "word": "currently",
          "meaning": "hiện tại, vào lúc này",
          "pron": "/ˈkʌr.ənt.li/"
        },
        {
          "word": "documentaries",
          "meaning": "phim tài liệu",
          "pron": "/ˌdɒk.jəˈmen.tər.iz/"
        },
        {
          "word": "productive",
          "meaning": "hữu ích, năng suất",
          "pron": "/prəˈdʌk.tɪv/"
        },
        {
          "word": "suggestions",
          "meaning": "lời gợi ý, đề xuất",
          "pron": "/səˈdʒes.tʃənz/"
        }
      ],
      "questions": [
        {
          "q": "1. He ...",
          "options": [
            "is working.",
            "is not a student.",
            "is 18 years old."
          ],
          "answer": 2,
          "explanation": "Nhân vật nói \"gần 19 tuổi\" (\"almost 19 years old\"), tức là hiện tại đang 18 tuổi."
        },
        {
          "q": "2. He ...",
          "options": [
            "doesn't have free time.",
            "is travelling.",
            "doesn't have money."
          ],
          "answer": 2,
          "explanation": "Vấn đề của nhân vật là khi còn đi học thì không có tiền (\"when you are a student, you never have money\")."
        },
        {
          "q": "3. He ...",
          "options": [
            "is very happy because he has a lot of free time.",
            "is not happy because he doesn't have any free time.",
            "is sometimes bored."
          ],
          "answer": 2,
          "explanation": "Khi có nhiều thời gian rảnh mà không có tiền thì hay cảm thấy buồn chán (\"it can get boring... I get bored\")."
        },
        {
          "q": "4. Every day, he ...",
          "options": [
            "watches documentaries.",
            "goes to the gym.",
            "reads for two hours."
          ],
          "answer": 1,
          "explanation": "Mỗi buổi sáng anh đều đến phòng gym (\"Every morning I go to the gym\")."
        },
        {
          "q": "5. He ...",
          "options": [
            "teaches history.",
            "studies history at university.",
            "reads history books four or five times a week."
          ],
          "answer": 1,
          "explanation": "Anh ấy học chuyên ngành lịch sử ở trường đại học (\"I study history\")."
        },
        {
          "q": "6. He ...",
          "options": [
            "does not enjoy playing video games.",
            "thinks video games are stupid.",
            "doesn't think playing video games is productive."
          ],
          "answer": 2,
          "explanation": "Anh thích chơi game nhưng không nghĩ đó là hoạt động năng suất (\"I don’t think it’s a productive activity\")."
        },
        {
          "q": "7. He wants ...",
          "options": [
            "to do more productive things in his free time.",
            "to live in a big city.",
            "to find a job."
          ],
          "answer": 0,
          "explanation": "Anh ấy mong muốn tìm thêm những hoạt động hữu ích hơn để làm (\"I’d like to find more productive activities to do\")."
        }
      ]
    },
    {
      "id": "read-a1-first-day-school",
      "title": "Memories of my first day at school – A1 Reading Test",
      "subtitle": "Childhood, First Day of School & Emotions",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1_My-first-day-at-school-Reading-test.jpg",
      "desc": "Ký ức đáng nhớ của một cô bé về ngày đầu tiên đi học: từ sự hồi hộp, bật khóc khi bước vào lớp đến niềm vui vẽ tranh và kết bạn mới.",
      "passage": "I remember my first day at school very well. I knew the school quite well because my older sister, Sandy, went there and every day, dad and I met her at the school gate after school. Every day, she ran out of the school with her friends. She often carried a painting. I felt jealous. I wanted to paint too!\n\nI was five years old when I started school. Most children in my class started school in September, but I started school in January, when I was five years old, because my birthday is in December. Three other kids started school on the same day as me. I was excited about my first day. I had my new uniform: a black skirt, a white t-shirt and green jumper, and a new red bag. When we arrived that day, a teacher met the new children at the school gate. Dad hugged me and said goodbye. I stood with the other children. I didn’t talk to them because I was too nervous. Then, Mrs Wilson took us to our classroom. All the other children were already there. They looked at us when we entered the room. When thirty children looked at me, I started to cry!\n\nBut I wasn’t upset for long. I sat with the other children on the carpet and the class teacher, Miss Holland, read us a story. Later, we drew pictures with coloured pencils, and at break time, I made friends with a girl called Megan. At the end of the day, I ran to the school gate with Megan and my picture, just like Sandy always did.",
      "vocabulary": [
        {
          "word": "jealous",
          "meaning": "ghen tị, thèm muốn",
          "pron": "/ˈdʒel.əs/"
        },
        {
          "word": "jumper",
          "meaning": "áo len chui đầu",
          "pron": "/ˈdʒʌm.pər/"
        },
        {
          "word": "nervous",
          "meaning": "lo lắng, hồi hộp",
          "pron": "/ˈnɜː.vəs/"
        },
        {
          "word": "carpet",
          "meaning": "tấm thảm trải sàn",
          "pron": "/ˈkɑː.pɪt/"
        },
        {
          "word": "upset",
          "meaning": "buồn bã, hoảng hốt",
          "pron": "/ʌpˈset/"
        }
      ],
      "questions": [
        {
          "q": "1. The writer was jealous of Sandy because she _____ at school.",
          "options": [
            "learned to write",
            "painted pictures",
            "had many friends"
          ],
          "answer": 1,
          "explanation": "Tác giả ghen tị với chị Sandy vì chị thường mang những bức tranh vẽ ở trường về nhà (\"She often carried a painting. I felt jealous. I wanted to paint too!\")."
        },
        {
          "q": "2. The writer started school in ___.",
          "options": [
            "September",
            "December",
            "January"
          ],
          "answer": 2,
          "explanation": "Tác giả sinh tháng 12 nên bắt đầu đi học vào tháng 1 (\"I started school in January\")."
        },
        {
          "q": "3. The writer and ___ other children started school that day.",
          "options": [
            "three",
            "five",
            "thirty"
          ],
          "answer": 0,
          "explanation": "Có 3 bạn nhỏ khác cùng bắt đầu đi học cùng ngày với tác giả (\"Three other kids started school on the same day as me\")."
        },
        {
          "q": "4. Before the writer started school, she felt ___.",
          "options": [
            "excited",
            "nervous",
            "upset"
          ],
          "answer": 0,
          "explanation": "Trước khi đến trường, cô bé cảm thấy vô cùng háo hức (\"I was excited about my first day\")."
        },
        {
          "q": "5. The writer started to cry when ___.",
          "options": [
            "her father left.",
            "she entered the school",
            "other children looked at her"
          ],
          "answer": 2,
          "explanation": "Khi 30 bạn nhỏ trong lớp đều đổ dồn ánh mắt nhìn vào mình, cô bé đã bật khóc (\"When thirty children looked at me, I started to cry!\")."
        },
        {
          "q": "6. On the first day, the writer ___.",
          "options": [
            "learned to read",
            "listened to a story",
            "painted a picture"
          ],
          "answer": 1,
          "explanation": "Cô bé ngồi trên thảm và được cô giáo Miss Holland đọc cho nghe một câu chuyện (\"Miss Holland, read us a story\")."
        }
      ]
    },
    {
      "id": "read-a1-confined-home",
      "title": "Email to a friend: I'm confined at home – A1 Reading Test",
      "subtitle": "Emails, University Life & Online Learning",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1_Email-to-a-friend_Reading-test.jpg",
      "desc": "Bức email của James kể cho người bạn Dom về trải nghiệm học đại học online tại nhà trong thời gian giãn cách xã hội và những dự định cho kỳ nghỉ lễ.",
      "passage": "Hi Dom,\n\nHow are you? I’m fine. I’m at home, of course, because of lockdown. I started my engineering course at Manchester University last year, but I’m not there now. I went to Manchester in October and I stayed in the student accommodation. We had lectures in the lecture rooms for three weeks, but after that, we had to stay in our accommodation because of Covid-19. I studied by computer. I wanted to go out to bars and join a basketball team, but I couldn’t. Luckily, there were some cool students in my accommodation. I made some good friends and we had cool parties.\n\nBut now I’m at home. I’m still studying by computer. I have four hours of lectures every day and then I work on projects. Actually, it’s quite good. We can do a lot of things by computer. I use different software programmes, read articles, and have discussions with the other students. I enjoy those discussions because I’m alone most of the time. Dad and mum are both at work all day. I can’t leave my town or visit friends, so I work! I work much harder than I did at school!\n\nI miss playing basketball, but I’m keeping active. I go jogging once a day. But I’m watching a lot of videos too.\n\nI’m not going to Manchester before Easter, but I hope to go there after Easter. In the Easter Holidays, I’m going to work on a friend’s farm in Wales. I don’t know anything about farming, but it will be great to be somewhere different!\n\nHope you are well,\nfrom James.",
      "vocabulary": [
        {
          "word": "confined",
          "meaning": "bị cách ly, giam lỏng tại nhà",
          "pron": "/kənˈfaɪnd/"
        },
        {
          "word": "accommodation",
          "meaning": "chỗ ở sinh viên, ký túc xá",
          "pron": "/əˌkɒm.əˈdeɪ.ʃən/"
        },
        {
          "word": "lectures",
          "meaning": "các bài giảng đại học",
          "pron": "/ˈlek.tʃərz/"
        },
        {
          "word": "discussions",
          "meaning": "các cuộc thảo luận nhóm",
          "pron": "/dɪˈskʌʃ.ənz/"
        },
        {
          "word": "jogging",
          "meaning": "chạy bộ rèn luyện",
          "pron": "/ˈdʒɒɡ.ɪŋ/"
        }
      ],
      "questions": [
        {
          "q": "1. James studies _____ at university.",
          "options": [
            "engineering",
            "medicine",
            "business",
            "law"
          ],
          "answer": 0,
          "explanation": "James bắt đầu khoá học ngành kỹ thuật ở Manchester (\"started my engineering course\")."
        },
        {
          "q": "2. James went to lectures in the lecture rooms at Manchester university for _____ weeks.",
          "options": [
            "two",
            "three",
            "four",
            "five"
          ],
          "answer": 1,
          "explanation": "James được học trên giảng đường trực tiếp trong 3 tuần (\"for three weeks\")."
        },
        {
          "q": "3. While in lockdown in Manchester, James and his friends _____.",
          "options": [
            "had cool parties",
            "went to bars",
            "played in a basketball team",
            "visited friends in other towns"
          ],
          "answer": 0,
          "explanation": "Khi ở trong ký túc xá, James và bạn bè đã tổ chức các bữa tiệc thú vị cùng nhau (\"we had cool parties\")."
        },
        {
          "q": "4. James watches _____ on his computer for four hours each day.",
          "options": [
            "lectures",
            "movies",
            "video games",
            "documentaries"
          ],
          "answer": 0,
          "explanation": "Mỗi ngày James có 4 tiếng học bài giảng trực tuyến (\"I have four hours of lectures every day\")."
        },
        {
          "q": "5. After listening to lectures, James works on _____.",
          "options": [
            "projects",
            "homework",
            "essays",
            "exams"
          ],
          "answer": 0,
          "explanation": "Sau khi nghe giảng, James làm các dự án bài tập (\"and then I work on projects\")."
        },
        {
          "q": "6. He likes having _____ with other students these days.",
          "options": [
            "discussions",
            "parties",
            "sports",
            "phone calls"
          ],
          "answer": 0,
          "explanation": "James thích thảo luận nhóm với các sinh viên khác (\"have discussions with the other students. I enjoy those discussions\")."
        },
        {
          "q": "7. James wanted to play _____ at university.",
          "options": [
            "basketball",
            "football",
            "tennis",
            "volleyball"
          ],
          "answer": 0,
          "explanation": "James mong muốn tham gia đội bóng rổ (\"join a basketball team\")."
        },
        {
          "q": "8. James goes _____ every day.",
          "options": [
            "jogging",
            "swimming",
            "cycling",
            "shopping"
          ],
          "answer": 0,
          "explanation": "Để giữ sức khoẻ, James chạy bộ mỗi ngày một lần (\"I go jogging once a day\")."
        },
        {
          "q": "9. He hopes to return to Manchester _____ Easter.",
          "options": [
            "after",
            "before",
            "during",
            "until"
          ],
          "answer": 0,
          "explanation": "James hi vọng có thể trở lại Manchester sau lễ Phục Sinh (\"hope to go there after Easter\")."
        },
        {
          "q": "10. At Easter, James is going to work on a _____.",
          "options": [
            "friend's farm in Wales",
            "building site",
            "supermarket",
            "school"
          ],
          "answer": 0,
          "explanation": "Vào kỳ nghỉ Phục Sinh, James dự định đến làm việc tại trang trại của một người bạn ở xứ Wales (\"work on a friend’s farm in Wales\")."
        }
      ]
    },
    {
      "id": "read-a1-traditions",
      "title": "Traditions around the world – A1 English Reading Test",
      "subtitle": "World Culture, Festivals & Celebrations",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/Traditions-around-the-world_A1-Reading-test.webp",
      "desc": "Khám phá 3 lễ hội văn hóa độc đáo trên thế giới: Lễ hội Kukeri ở Bulgaria, Ngày của người chết ở Mexico và Lễ hội ném cà chua La Tomatina ở Tây Ban Nha.",
      "passage": "The Kukeri Festival\nThe Kukeri Festival is one of the oldest traditions in Bulgaria. It happens every year in winter. Men and boys dress in special costumes and wear scary wooden masks. They wear bells around their waists. They dance through the village streets to scare away evil spirits and bring good luck and a healthy harvest for the new year. The festival starts in January and thousands of people travel to see it.\n\nThe Day of the Dead (Día de los Muertos)\nThe Day of the Dead is a very famous Mexican celebration. It takes place on 1st and 2nd November. Mexican families remember relatives who have died. People believe that the souls of the dead return to visit their families. People build altars in their homes and decorate them with yellow flowers, candles, and photographs. They cook the favourite food of the dead person and eat special bread called 'pan de muerto'. It is not a sad day; it is a joyful celebration of life.\n\nLa Tomatina\nLa Tomatina is a famous festival in Buñol, a small town near Valencia in Spain. It takes place on the last Wednesday of August. Thousands of people gather in the streets and throw ripe tomatoes at each other! The tomato fight lasts for exactly one hour. After the fight, fire trucks spray water to clean the town square and people go to the river to wash themselves. It is very messy, but everyone has enormous fun.",
      "vocabulary": [
        {
          "word": "spirits",
          "meaning": "linh hồn, linh thần",
          "pron": "/ˈspɪr.ɪts/"
        },
        {
          "word": "harvest",
          "meaning": "mùa màng, vụ thu hoạch",
          "pron": "/ˈhɑː.vɪst/"
        },
        {
          "word": "altars",
          "meaning": "bàn thờ gia tiên",
          "pron": "/ˈɔːl.tərz/"
        },
        {
          "word": "messy",
          "meaning": "hỗn loạn, lấm lem",
          "pron": "/ˈmes.i/"
        }
      ],
      "questions": [
        {
          "q": "1. Which festival celebrates the visit of spirits?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 1,
          "explanation": "Ngày của người chết (Day of the Dead) là dịp đón linh hồn người thân đã khuất trở về thăm gia đình."
        },
        {
          "q": "2. At which festival do people hide their faces?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 0,
          "explanation": "Tại lễ hội Kukeri, người tham gia đeo mặt nạ gỗ đáng sợ (\"wear scary wooden masks\")."
        },
        {
          "q": "3. Which festival is popular among tourists?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 0,
          "explanation": "Lễ hội Kukeri thu hút hàng ngàn du khách đến xem (\"thousands of people travel to see it\")."
        },
        {
          "q": "4. Which festival is the shortest?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 2,
          "explanation": "Trận chiến cà chua La Tomatina chỉ kéo dài đúng 1 tiếng đồng hồ (\"lasts for exactly one hour\")."
        },
        {
          "q": "5. Which festival happens at the beginning of the year?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 0,
          "explanation": "Lễ hội Kukeri diễn ra vào tháng 1 đầu năm (\"The festival starts in January\")."
        },
        {
          "q": "6. At which festival do people need to clean?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 2,
          "explanation": "Sau lễ hội La Tomatina, xe cứu hỏa phải phun nước rửa sạch các con phố và mọi người xuống sông tắm rửa."
        },
        {
          "q": "7. Which festival is about the past?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 1,
          "explanation": "Day of the Dead là dịp tưởng nhớ người thân đã qua đời trong quá khứ (\"remember relatives who have died\")."
        },
        {
          "q": "8. At which festival do people cook food?",
          "options": [
            "The Kukeri Festival",
            "The Day of the Dead",
            "La Tomatina"
          ],
          "answer": 1,
          "explanation": "Mọi người nấu các món ăn ưa thích của người đã khuất và làm bánh mì đặc biệt pan de muerto."
        }
      ]
    },
    {
      "id": "read-a1-thanksgiving",
      "title": "Happy Thanksgiving – A1 English Reading Test",
      "subtitle": "American History, Traditions & Family Gatherings",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1_Thanksgivin_Reading-test.jpg",
      "desc": "Lịch sử và phong tục ngày lễ Tạ Ơn tại Mỹ: nguồn gốc từ người hành hương Pilgrims, bữa tối gà tây truyền thống và mùa mua sắm Black Friday.",
      "passage": "Thanksgiving is celebrated in the USA on the 4th Thursday of November. The tradition comes from the first people to arrive from England to live in America, who were called Pilgrims. In 1621, after a difficult winter, the Pilgrims celebrated their first successful harvest. They had a big feast to say thank you to the Native Americans who had helped them learn how to grow food and survive.\n\nToday, Thanksgiving is a time for families to come together. Many people travel long distances across the country to be with their loved ones. The traditional meal features roast turkey, stuffing, mashed potatoes, cranberry sauce, and pumpkin pie. After dinner, families often sit together in the living room to watch American football games on television.\n\nThe day after Thanksgiving is called Black Friday. It marks the unofficial start of the Christmas shopping season, and stores offer huge discounts. Most people do not decorate their homes for Christmas until after Thanksgiving has passed.",
      "vocabulary": [
        {
          "word": "Pilgrims",
          "meaning": "những người hành hương di cư đầu tiên",
          "pron": "/ˈpɪl.ɡrɪmz/"
        },
        {
          "word": "harvest",
          "meaning": "mùa thu hoạch nông sản",
          "pron": "/ˈhɑː.vɪst/"
        },
        {
          "word": "cranberry sauce",
          "meaning": "sốt nam việt quất ăn kèm gà tây",
          "pron": "/ˈkræn.bər.i sɔːs/"
        },
        {
          "word": "feast",
          "meaning": "yến tiệc thịnh soạn",
          "pron": "/fiːst/"
        }
      ],
      "questions": [
        {
          "q": "1. The first Thanksgiving was a way to say thank you from the English to the Native Americans.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Người di cư Pilgrims tổ chức yến tiệc để cảm ơn người Mỹ bản địa đã giúp họ trồng trọt và sinh tồn."
        },
        {
          "q": "2. Native Americans and Pilgrims ate together at the first Thanksgiving.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Họ đã cùng nhau ăn mừng vụ mùa thu hoạch đầu tiên."
        },
        {
          "q": "3. The first Thanksgiving was in New York City.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Sai. Lễ Tạ Ơn đầu tiên diễn ra tại thuộc địa Plymouth (Massachusetts), không phải New York City."
        },
        {
          "q": "4. People enjoy playing football after eating.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Sai. Mọi người ngồi xem bóng bầu dục trên TV (\"watch American football games on television\"), không phải ra ngoài chơi bóng."
        },
        {
          "q": "5. You can find big sales the Friday before Thanksgiving.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Sai. Đại hội giảm giá Black Friday diễn ra vào thứ Sáu *sau* lễ Tạ Ơn (\"The day after Thanksgiving is called Black Friday\")."
        },
        {
          "q": "6. You aren’t supposed to decorate for the holidays before Thanksgiving.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Mọi người thường kiêng hoặc đợi qua lễ Tạ Ơn mới bắt đầu trang trí nhà cửa đón Giáng sinh."
        }
      ]
    },
    {
      "id": "read-a1-cooking-pancake",
      "title": "Pancake Day (British traditions) – A1 English Reading Test",
      "subtitle": "British Culture, Festivals & Pancake Races",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/A1_Pancake-day_Reading-test.jpg",
      "desc": "Lễ hội bánh kếp Pancake Day tại Vương quốc Anh: ý nghĩa ngày Shrove Tuesday, cuộc thi chạy lật bánh kếp và các phong tục vui nhộn.",
      "passage": "In the UK, people celebrate Pancake Day. This festival takes place in February or March, on Shrove Tuesday. This is the day before the start of Lent, the 40 days before Easter when Christians traditionally give up rich foods like butter, sugar, and eggs. Making pancakes was the perfect way to use up all those ingredients before fasting began!\n\nA traditional British pancake is very thin. People usually squeeze fresh lemon juice on top and sprinkle it with white sugar, then roll it up and eat it warm.\n\nA very funny tradition on this day is the 'pancake race'. In towns and villages across the UK, people put on aprons, hold a frying pan with a cooked pancake in it, and run down the street. As they run, they have to toss the pancake into the air and catch it in the pan at least three times!\n\nThe most famous pancake race is in the town of Olney. Legend says that in 1445, a housewife was making pancakes when the church bells rang. In a hurry, she ran to church still holding her frying pan! Today in Olney, only women can enter the race, wearing aprons and scarves. At Westminster School in London, a cook throws a giant pancake over a high bar, and schoolboys fight to get the biggest piece.",
      "vocabulary": [
        {
          "word": "Shrove",
          "meaning": "xưng tội, xá tội (Shrove Tuesday: Ngày Xưng Tội / Lễ hội Bánh Kếp Pancake Day)",
          "pron": "/ʃroʊv/"
        },
        {
          "word": "Lent",
          "meaning": "Mùa Chay (40 ngày kiêng khem trước lễ Phục sinh)",
          "pron": "/lent/"
        },
        {
          "word": "fasting",
          "meaning": "ăn chay, kiêng ăn",
          "pron": "/ˈfɑː.stɪŋ/"
        },
        {
          "word": "aprons",
          "meaning": "tạp dề nấu ăn",
          "pron": "/ˈeɪ.prənz/"
        },
        {
          "word": "toss",
          "meaning": "hất, lật tung lên không trung",
          "pron": "/tɒs/"
        }
      ],
      "questions": [
        {
          "q": "1. Pancake Day is the first day of Lent.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Sai. Pancake Day (Shrove Tuesday) là ngày *ngay trước* khi Mùa Chay bắt đầu (\"This is the day before the start of Lent\")."
        },
        {
          "q": "2. People often eat pancakes with lemon and sugar.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Người Anh thường vắt nước chanh và rắc đường lên bánh kếp mỏng (\"squeeze fresh lemon juice on top and sprinkle it with white sugar\")."
        },
        {
          "q": "3. Pancake races are a tradition in many British towns.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Cuộc thi chạy đua bánh kếp là truyền thống ở nhiều thị trấn và làng mạc tại Anh (\"In towns and villages across the UK\")."
        },
        {
          "q": "4. The winner is the first person to make and eat a pancake.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Sai. Người tham gia phải cầm chảo chạy và lật bánh ít nhất 3 lần trên đường chạy, không phải làm và ăn bánh."
        },
        {
          "q": "5. The tradition of pancake races started when a woman was late for church.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Truyền thuyết kể rằng năm 1445, một người phụ nữ vì sợ trễ giờ lễ nhà thờ đã vừa cầm chảo bánh kếp vừa chạy."
        },
        {
          "q": "6. Only women can enter the pancake race in Olney.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Tại thị trấn Olney, chỉ có phụ nữ mặc tạp dề và quàng khăn mới được tham gia cuộc đua (\"only women can enter the race\")."
        },
        {
          "q": "7. The competitors in the Olney pancake race must serve a pancake to their husbands.",
          "options": [
            "True",
            "False"
          ],
          "answer": 1,
          "explanation": "Sai. Họ chạy đến nhà thờ và người chiến thắng nhận lời chúc phúc từ người rung chuông nhà thờ, không phải phục vụ chồng."
        },
        {
          "q": "8. At Westminster School, schoolboys must get a big piece of a large pancake.",
          "options": [
            "True",
            "False"
          ],
          "answer": 0,
          "explanation": "Đúng. Đầu bếp ném một chiếc bánh kếp khổng lồ qua xà cao và các nam sinh tranh nhau mảnh bánh lớn nhất (\"fight to get the biggest piece\")."
        }
      ]
    },
    {
      "id": "read-a1-day-out",
      "title": "Tips for visiting London with young children – A1 English Reading Test",
      "subtitle": "Travel Tips, Family Vacations & London City",
      "level": "A1",
      "duration": "10 phút",
      "img": "https://test-english.com/staging11/wp-content/uploads/Tips-for-visiting-London-with-children_A1-Reading-test.webp",
      "desc": "Những lời khuyên hữu ích khi đưa trẻ nhỏ đi du lịch Luân Đôn: lập kế hoạch địa điểm, di chuyển bằng tàu ngầm & xe buýt miễn phí, bảo tàng tương tác và công viên xanh.",
      "passage": "Section 1\nFirst, decide what you want to visit. Don't forget to check which days are less busy. Usually, there are more tourists at weekends and during school holidays. Buying tickets online in advance is also a great idea because you can avoid long queues with impatient children.\n\nSection 2\nLondon is big, but getting around is easy. Children under 11 travel completely free on all London buses and the Underground (the Tube) when travelling with a paying adult. Taking a red double-decker bus is also a fun and cheap sightseeing experience for young children!\n\nSection 3\nMany of London's world-famous museums are free and wonderful for kids. The Science Museum and the Natural History Museum have interactive galleries where children can touch exhibits, push buttons, and see giant dinosaur skeletons.\n\nSection 4\nBefore your trip, talk to your children about what they will see. Show them pictures of Big Ben, Buckingham Palace, and the Tower of London. Read children's books set in London. This will make them excited about exploring the city.\n\nSection 5\nSightseeing in a capital city can be expensive. Prepare a daily budget and pack your own sandwiches, fruit, and bottles of water. London has many supermarkets where you can buy meal deals cheaply instead of eating in restaurants every day.\n\nSection 6\nYoung children get tired easily after walking. Do not try to see too much in one day. Schedule a quiet break in the afternoon in one of London's beautiful parks, like Hyde Park or Regent's Park, where children can run on the grass and feed ducks.",
      "vocabulary": [
        {
          "word": "queues",
          "meaning": "hàng người xếp hàng chờ",
          "pron": "/kjuːz/"
        },
        {
          "word": "double-decker",
          "meaning": "xe buýt hai tầng đỏ đặc trưng của London",
          "pron": "/ˌdʌb.əlˈdek.ər/"
        },
        {
          "word": "exhibits",
          "meaning": "hiện vật trưng bày",
          "pron": "/ɪɡˈzɪb.ɪts/"
        },
        {
          "word": "budget",
          "meaning": "ngân sách chi tiêu",
          "pron": "/ˈbʌdʒ.ɪt/"
        }
      ],
      "questions": [
        {
          "q": "1. Which heading matches Section 1?",
          "options": [
            "Plan what to see and when",
            "Move around on public transport",
            "Learn and play at the museum",
            "Get your children ready for the visit"
          ],
          "answer": 0,
          "explanation": "Đoạn 1 khuyên quyết định địa điểm cần tham quan và tránh ngày đông đúc (\"decide what you want to visit... check which days are less busy\")."
        },
        {
          "q": "2. Which heading matches Section 2?",
          "options": [
            "Plan what to see and when",
            "Move around on public transport",
            "Decide spending money",
            "Visit the city when children sleep"
          ],
          "answer": 1,
          "explanation": "Đoạn 2 nói về việc di chuyển bằng xe buýt đỏ và tàu điện ngầm (\"getting around is easy... buses and the Underground\")."
        },
        {
          "q": "3. Which heading matches Section 3?",
          "options": [
            "Learn and play at the museum",
            "Move around on public transport",
            "Get your children ready for the visit",
            "Plan what to see and when"
          ],
          "answer": 0,
          "explanation": "Đoạn 3 giới thiệu các bảo tàng miễn phí nổi tiếng với các khu tương tác cho trẻ nhỏ (\"Science Museum... interactive galleries\")."
        },
        {
          "q": "4. Which heading matches Section 4?",
          "options": [
            "Get your children ready for the visit",
            "Decide spending money",
            "Plan what to see and when",
            "Learn and play at the museum"
          ],
          "answer": 0,
          "explanation": "Đoạn 4 khuyên bố mẹ nên cho trẻ xem tranh ảnh về Big Ben, đọc sách trước chuyến đi (\"talk to your children about what they will see\")."
        },
        {
          "q": "5. Which heading matches Section 5?",
          "options": [
            "Decide spending money",
            "Plan what to see and when",
            "Move around on public transport",
            "Learn and play at the museum"
          ],
          "answer": 0,
          "explanation": "Đoạn 5 bàn về chi phí và chuẩn bị đồ ăn nhẹ để tiết kiệm (\"Prepare a daily budget and pack your own sandwiches\")."
        },
        {
          "q": "6. Which heading matches Section 6?",
          "options": [
            "Schedule quiet time & rest in parks",
            "Move around on public transport",
            "Decide spending money",
            "Learn and play at the museum"
          ],
          "answer": 0,
          "explanation": "Đoạn 6 khuyên cho trẻ nghỉ ngơi tại các công viên như Hyde Park để tránh kiệt sức (\"Schedule a quiet break in the afternoon in one of London’s beautiful parks\")."
        }
      ]
    }
  ],
  "A2": [
    {
      "id": "read-a2-1",
      "title": "My Neighborhood and Local Facilities – A2 Reading Test",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80",
      "desc": "Bài viết miêu tả các tiện ích công cộng, giao thông và cuộc sống tại một khu dân cư hiện đại.",
      "passage": "I have lived in Maplewood for almost five years, and it is by far the most convenient neighborhood I have ever experienced.\n\nOur area has a modern sports center with an Olympic-sized indoor swimming pool, a newly renovated public library with high-speed internet, and three well-maintained public parks. Every morning, many residents go jogging along the tree-lined pedestrian avenues or walk their dogs in the green open spaces.\n\nTransportation is another great advantage. The subway station is only a seven-minute walk from my apartment complex. Trains arrive every four minutes during rush hour, which makes commuting to the financial district stress-free.\n\nAdditionally, we have a lively farmers market every Sunday where local vendors sell fresh produce, homemade pastries, and aromatic coffee beans. The crime rate is exceptionally low, and neighbors always look out for one another.",
      "vocabulary": [
        {
          "word": "convenient",
          "meaning": "tiện lợi, thuận tiện",
          "pron": "/kənˈviː.ni.ənt/"
        },
        {
          "word": "pedestrian avenue",
          "meaning": "đại lộ dành cho người đi bộ",
          "pron": "/pəˈdes.tri.ən ˈæv.ə.njuː/"
        },
        {
          "word": "commuting",
          "meaning": "việc đi lại làm việc hàng ngày",
          "pron": "/kəˈmjuː.tɪŋ/"
        },
        {
          "word": "vendors",
          "meaning": "tiểu thương, người bán hàng",
          "pron": "/ˈven.dərz/"
        }
      ],
      "questions": [
        {
          "q": "1. How long has the author lived in Maplewood?",
          "options": [
            "One year",
            "Almost five years",
            "Ten years",
            "Since childhood"
          ],
          "answer": 1,
          "explanation": "\"I have lived in Maplewood for almost five years, and it is by far the most convenient neighborhood I have ever experienced.\""
        },
        {
          "q": "2. How far is the subway station from the apartment?",
          "options": [
            "A 30-minute bus ride",
            "A 7-minute walk",
            "Across the street",
            "Two miles away"
          ],
          "answer": 1,
          "explanation": "\"The subway station is only a seven-minute walk from my apartment complex.\""
        },
        {
          "q": "3. Which facility is located inside the modern sports center?",
          "options": [
            "An Olympic-sized indoor swimming pool",
            "A rock-climbing wall",
            "An outdoor tennis court",
            "A boxing arena"
          ],
          "answer": 0,
          "explanation": "\"Our area has a modern sports center with an Olympic-sized indoor swimming pool...\""
        },
        {
          "q": "4. What activity do many residents do in the morning?",
          "options": [
            "Commute by bicycle on the highway",
            "Go jogging along pedestrian avenues or walk dogs in open spaces",
            "Go swimming at the local beach",
            "Attend classes at the university"
          ],
          "answer": 1,
          "explanation": "\"Every morning, many residents go jogging along the tree-lined pedestrian avenues or walk their dogs in the green open spaces.\""
        },
        {
          "q": "5. How frequently do subway trains arrive during rush hour?",
          "options": [
            "Every four minutes",
            "Every ten minutes",
            "Every fifteen minutes",
            "Once an hour"
          ],
          "answer": 0,
          "explanation": "\"Trains arrive every four minutes during rush hour, which makes commuting to the financial district stress-free.\""
        },
        {
          "q": "6. When does the lively farmers market take place?",
          "options": [
            "Every Saturday morning",
            "Every Sunday",
            "On the first day of each month",
            "Every weekday evening"
          ],
          "answer": 1,
          "explanation": "\"Additionally, we have a lively farmers market every Sunday where local vendors sell fresh produce...\""
        },
        {
          "q": "7. Which of the following items is NOT sold at the farmers market?",
          "options": [
            "Fresh produce",
            "Homemade pastries",
            "Aromatic coffee beans",
            "Electronics and mobile phones"
          ],
          "answer": 3,
          "explanation": "The text lists 'fresh produce, homemade pastries, and aromatic coffee beans'. Electronics are not sold there."
        },
        {
          "q": "8. What makes the author feel safe in Maplewood?",
          "options": [
            "The low crime rate and neighbors who always look out for each other",
            "Armed security guards outside every building",
            "High fences around all parks",
            "Security cameras installed everywhere"
          ],
          "answer": 0,
          "explanation": "\"The crime rate is exceptionally low, and neighbors always look out for one another.\""
        }
      ]
    },
    {
      "id": "read-a2-2",
      "title": "A Sustainable Lifestyle: Zero-Waste Living – A2 Reading Test",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
      "desc": "Khám phá lối sống giảm thiểu rác thải nhựa và bảo vệ hệ sinh thái môi trường.",
      "passage": "In recent years, many young people have adopted a \"zero-waste\" philosophy to reduce their environmental footprint.\n\nLiving zero-waste does not mean producing literally zero trash; rather, it encourages people to rethink their consumer habits. Simple changes include carrying reusable stainless-steel water bottles, shopping with cotton tote bags, and buying dry grains and spices in bulk using glass jars.\n\nMaria, a university student in Barcelona, has practiced zero-waste for two years. She composts all organic food scraps on her balcony garden and makes her own eco-friendly cleaning detergents using white vinegar and baking soda.\n\n\"It saves me money every month and makes me feel deeply connected to protecting the planet,\" Maria explains with a smile.",
      "vocabulary": [
        {
          "word": "sustainable",
          "meaning": "bền vững",
          "pron": "/səˈsteɪ.nə.bəl/"
        },
        {
          "word": "footprint",
          "meaning": "dấu chân (tác động môi trường)",
          "pron": "/ˈfʊt.prɪnt/"
        },
        {
          "word": "compost",
          "meaning": "ủ phân hữu cơ",
          "pron": "/ˈkɒm.pɒst/"
        },
        {
          "word": "detergent",
          "meaning": "chất tẩy rửa",
          "pron": "/dɪˈtɜː.dʒənt/"
        }
      ],
      "questions": [
        {
          "q": "1. What is the main purpose of zero-waste living?",
          "options": [
            "To completely stop buying food",
            "To rethink consumer habits and reduce environmental impact",
            "To live without electricity",
            "To move away from cities to a farm"
          ],
          "answer": 1,
          "explanation": "\"...it encourages people to rethink their consumer habits and reduce their environmental footprint.\""
        },
        {
          "q": "2. Does living zero-waste mean producing literally zero trash?",
          "options": [
            "Yes, producing even one piece of trash is forbidden",
            "No, it focuses on rethinking habits and minimizing waste",
            "Yes, but only on weekends",
            "Only for people working in recycling companies"
          ],
          "answer": 1,
          "explanation": "\"Living zero-waste does not mean producing literally zero trash; rather, it encourages people to rethink their consumer habits.\""
        },
        {
          "q": "3. Which of the following is an example of a simple zero-waste habit mentioned?",
          "options": [
            "Carrying reusable stainless-steel water bottles",
            "Buying single-use plastic water bottles every day",
            "Throwing away leftover food into rivers",
            "Using disposable plastic bags for groceries"
          ],
          "answer": 0,
          "explanation": "\"Simple changes include carrying reusable stainless-steel water bottles, shopping with cotton tote bags...\""
        },
        {
          "q": "4. How long has Maria practiced zero-waste living?",
          "options": [
            "Two weeks",
            "Two months",
            "Two years",
            "Since childhood"
          ],
          "answer": 2,
          "explanation": "\"Maria, a university student in Barcelona, has practiced zero-waste for two years.\""
        },
        {
          "q": "5. What ingredients does Maria use to make her own cleaning detergents?",
          "options": [
            "Bleach and industrial alcohol",
            "White vinegar and baking soda",
            "Olive oil and honey",
            "Saltwater and lemon soap"
          ],
          "answer": 1,
          "explanation": "\"...makes her own eco-friendly cleaning detergents using white vinegar and baking soda.\""
        },
        {
          "q": "6. How does the zero-waste lifestyle benefit Maria personally?",
          "options": [
            "It saves her money every month and connects her to protecting the planet",
            "Her university gives her free meals",
            "She gets paid by the city council",
            "She never has to go grocery shopping"
          ],
          "answer": 0,
          "explanation": "\"\\\"It saves me money every month and makes me feel deeply connected to protecting the planet,\\\" Maria explains with a smile.\""
        }
      ]
    },
    {
      "id": "read-a2-3",
      "title": "Working Abroad: An Expat Experience – A2 Reading Test",
      "subtitle": "Career, Travel & Cultural Adaptation",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80",
      "desc": "Câu chuyện của James kể về trải nghiệm làm việc ở nước ngoài, thách thức văn hóa và những bài học quý giá.",
      "passage": "James Turner, a 28-year-old software engineer from Dublin, decided to accept a two-year contract in Tokyo, Japan. It was the most exciting and challenging decision of his life.\n\nBefore leaving, he spent three months studying basic Japanese phrases and reading about Japanese workplace etiquette. He learned that punctuality is extremely important in Japan – arriving even one minute late to a meeting is considered disrespectful.\n\nHis first weeks were overwhelming. The public transport system was incredibly complex, menus were in Japanese characters, and his colleagues were very formal compared to his relaxed Irish work culture. However, James gradually adapted. He joined a language exchange club, made Japanese friends, and discovered a deep love for ramen noodles and sumo wrestling.\n\n\"Working abroad completely changed my perspective on life,\" James says. \"I am a much more flexible and empathetic person now.\"",
      "vocabulary": [
        {
          "word": "expat",
          "meaning": "người sinh sống ở nước ngoài",
          "pron": "/ˈeks.pæt/"
        },
        {
          "word": "etiquette",
          "meaning": "phép lịch sự, nghi thức ứng xử",
          "pron": "/ˈet.ɪ.ket/"
        },
        {
          "word": "punctuality",
          "meaning": "tính đúng giờ",
          "pron": "/ˌpʌŋk.tjuˈæl.ə.ti/"
        },
        {
          "word": "empathetic",
          "meaning": "có khả năng đồng cảm",
          "pron": "/ˌem.pəˈthet.ɪk/"
        }
      ],
      "questions": [
        {
          "q": "1. How long did James prepare before going to Japan?",
          "options": [
            "One week",
            "Three months",
            "One year",
            "Six months"
          ],
          "answer": 1,
          "explanation": "\"He spent three months studying basic Japanese phrases and reading about Japanese workplace etiquette.\""
        },
        {
          "q": "2. What did James learn about Japanese workplace etiquette?",
          "options": [
            "It is very relaxed like Irish work culture",
            "Punctuality is extremely important, and arriving late is disrespectful",
            "Employees are expected to leave the office before 4 PM",
            "Meetings are usually conducted informally without preparation"
          ],
          "answer": 1,
          "explanation": "\"He learned that punctuality is extremely important in Japan – arriving even one minute late to a meeting is considered disrespectful.\""
        },
        {
          "q": "3. What made James feel overwhelmed during his first weeks?",
          "options": [
            "The complex transport system, Japanese character menus, and formal colleagues",
            "The lack of housing and freezing weather",
            "His colleagues refused to speak with him",
            "He could not find any food he liked"
          ],
          "answer": 0,
          "explanation": "\"The public transport system was incredibly complex, menus were in Japanese characters, and his colleagues were very formal...\""
        },
        {
          "q": "4. How did James manage to adapt to his new life in Tokyo?",
          "options": [
            "He avoided meeting locals and worked from home",
            "He joined a language exchange club and made local Japanese friends",
            "He requested to transfer back to Dublin after one month",
            "He hired a personal translator for every conversation"
          ],
          "answer": 1,
          "explanation": "\"He joined a language exchange club, made Japanese friends, and discovered a deep love for ramen noodles and sumo wrestling.\""
        },
        {
          "q": "5. What Japanese cultural interests did James develop?",
          "options": [
            "Playing baseball and archery",
            "Ramen noodles and sumo wrestling",
            "Tea ceremonies and pottery",
            "Gardening and mountain climbing"
          ],
          "answer": 1,
          "explanation": "\"...and discovered a deep love for ramen noodles and sumo wrestling.\""
        },
        {
          "q": "6. What does James say working abroad changed in him?",
          "options": [
            "He became more interested in making money",
            "He became a much more flexible and empathetic person",
            "He decided to abandon software engineering",
            "He lost his ability to speak English fluently"
          ],
          "answer": 1,
          "explanation": "\"\\\"Working abroad completely changed my perspective on life,\\\" James says. \\\"I am a much more flexible and empathetic person now.\\\"\""
        }
      ]
    },
    {
      "id": "read-a2-4",
      "title": "Healthy Habits for a Better Life – A2 Reading Test",
      "subtitle": "Wellness, Nutrition & Sleep Science",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80",
      "desc": "Tìm hiểu các thói quen khoa học về dinh dưỡng, giấc ngủ và thể dục để duy trì sức khỏe tốt.",
      "passage": "Health experts agree that small daily habits have a greater impact on our wellbeing than occasional intense efforts. Here are four evidence-based habits for a healthier lifestyle.\n\nFirst, eat a rainbow. Instead of counting calories, try to eat fruits and vegetables of many different colors every day. Orange carrots contain beta-carotene, dark leafy spinach provides iron, and purple blueberries are rich in antioxidants.\n\nSecond, prioritize quality sleep. Adults need between seven and nine hours of sleep per night. Avoid using smartphones one hour before bedtime, as the blue light suppresses the natural production of melatonin – the sleep hormone.\n\nThird, exercise for just 30 minutes daily. A brisk walk, cycling, or a brief home workout session significantly reduces the risk of heart disease and type-2 diabetes.\n\nFourth, drink at least 8 glasses of water daily. Staying well-hydrated improves concentration, prevents headaches, and keeps your skin glowing.",
      "vocabulary": [
        {
          "word": "antioxidants",
          "meaning": "chất chống oxy hóa",
          "pron": "/ˌæn.tiˈɒk.sɪ.dənts/"
        },
        {
          "word": "melatonin",
          "meaning": "hormone giấc ngủ melatonin",
          "pron": "/ˌmel.əˈtəʊ.nɪn/"
        },
        {
          "word": "suppress",
          "meaning": "ức chế, kìm hãm",
          "pron": "/səˈpres/"
        },
        {
          "word": "hydrated",
          "meaning": "đủ nước, không bị mất nước",
          "pron": "/ˈhaɪ.dreɪ.tɪd/"
        }
      ],
      "questions": [
        {
          "q": "1. What does the advice \"eat a rainbow\" mean?",
          "options": [
            "Only eat colorful candies and desserts",
            "Eat fruits and vegetables of many different colors daily",
            "Count every single calorie in each meal",
            "Follow a diet of exactly seven meals a day"
          ],
          "answer": 1,
          "explanation": "\"Instead of counting calories, try to eat fruits and vegetables of many different colors every day.\""
        },
        {
          "q": "2. Which nutrient does dark leafy spinach provide according to the passage?",
          "options": [
            "Beta-carotene",
            "Iron",
            "Antioxidants",
            "Melatonin"
          ],
          "answer": 1,
          "explanation": "\"...dark leafy spinach provides iron, and purple blueberries are rich in antioxidants.\""
        },
        {
          "q": "3. Why should people avoid smartphones one hour before bedtime?",
          "options": [
            "Smartphones emit noise that causes headaches",
            "The blue light suppresses natural production of melatonin",
            "Charging phones overnight can cause overheating",
            "Text messages create unnecessary anxiety"
          ],
          "answer": 1,
          "explanation": "\"Avoid using smartphones one hour before bedtime, as the blue light suppresses the natural production of melatonin – the sleep hormone.\""
        },
        {
          "q": "4. How much sleep do adults need per night?",
          "options": [
            "Five to six hours",
            "Seven to nine hours",
            "At least ten hours",
            "Four hours is sufficient"
          ],
          "answer": 1,
          "explanation": "\"Adults need between seven and nine hours of sleep per night.\""
        },
        {
          "q": "5. What health benefits come from just 30 minutes of daily exercise?",
          "options": [
            "It instantly cures all chronic illnesses",
            "It significantly reduces the risk of heart disease and type-2 diabetes",
            "It eliminates the need to sleep",
            "It allows you to eat unlimited fast food"
          ],
          "answer": 1,
          "explanation": "\"A brisk walk, cycling, or a brief home workout session significantly reduces the risk of heart disease and type-2 diabetes.\""
        },
        {
          "q": "6. How many glasses of water should adults drink daily to stay well-hydrated?",
          "options": [
            "At least 2 glasses",
            "At least 8 glasses",
            "Exactly 20 glasses",
            "Only drink when thirsty"
          ],
          "answer": 1,
          "explanation": "\"Drink at least 8 glasses of water daily. Staying well-hydrated improves concentration, prevents headaches...\""
        }
      ]
    },
    {
      "id": "read-a2-5",
      "title": "Street Food Around the World – A2 Reading Test",
      "subtitle": "Global Cuisine & Culinary Culture",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
      "desc": "Khám phá các món ăn đường phố nổi tiếng thế giới: bánh mì Việt Nam, Pad Thai Thái Lan và Tacos Mexico.",
      "passage": "Street food is one of the most authentic ways to discover a country's culture and flavors. Around the world, busy sidewalks and bustling night markets offer unforgettable culinary experiences for budget travelers.\n\nIn Vietnam, the humble \"bánh mì\" sandwich has become internationally famous. This crispy French baguette is filled with grilled pork or lemongrass chicken, pickled daikon and carrot, fresh coriander, cucumber slices, and a touch of chili sauce. It perfectly combines French colonial history with Vietnamese flavors.\n\nIn Thailand, Pad Thai is the nation's most beloved street dish. Stir-fried rice noodles are cooked in a hot wok with bean sprouts, tofu, shrimp, egg, and tamarind sauce, then finished with crushed roasted peanuts and a squeeze of fresh lime.\n\nIn Mexico City, late-night taco stands serve warm corn tortillas filled with slow-braised beef, fresh pico de gallo salsa, avocado guacamole, and melted Oaxacan cheese.",
      "vocabulary": [
        {
          "word": "authentic",
          "meaning": "thực sự, chính thống",
          "pron": "/ɔːˈthen.tɪk/"
        },
        {
          "word": "culinary",
          "meaning": "thuộc về ẩm thực",
          "pron": "/ˈkʌl.ɪ.nər.i/"
        },
        {
          "word": "pickled",
          "meaning": "muối chua, ngâm giấm",
          "pron": "/ˈpɪk.əld/"
        },
        {
          "word": "tortilla",
          "meaning": "bánh ngô Mexico",
          "pron": "/tɔːˈtiː.ə/"
        }
      ],
      "questions": [
        {
          "q": "1. What historical influence does the Vietnamese bánh mì sandwich reflect?",
          "options": [
            "American fast-food culture",
            "French colonial history combined with Vietnamese flavors",
            "Ancient Chinese dynasty traditions",
            "British afternoon tea customs"
          ],
          "answer": 1,
          "explanation": "\"It perfectly combines French colonial history with Vietnamese flavors.\""
        },
        {
          "q": "2. Which ingredients are typically included inside a Vietnamese bánh mì?",
          "options": [
            "Grilled pork or lemongrass chicken, pickled daikon, carrot, cucumber, and cilantro",
            "Melted cheddar cheese and beef patty",
            "Raw salmon, wasabi, and seaweed",
            "Mashed potatoes and gravy"
          ],
          "answer": 0,
          "explanation": "\"This crispy French baguette is filled with grilled pork or lemongrass chicken, pickled daikon and carrot, fresh coriander, cucumber slices, and a touch of chili sauce.\""
        },
        {
          "q": "3. What is Thailand's most beloved street dish mentioned in the passage?",
          "options": [
            "Tom Yum soup",
            "Pad Thai",
            "Green curry",
            "Mango sticky rice"
          ],
          "answer": 1,
          "explanation": "\"In Thailand, Pad Thai is the nation's most beloved street dish.\""
        },
        {
          "q": "4. What garnish is added on top of Pad Thai to finish the dish?",
          "options": [
            "Ketchup and yellow mustard",
            "Crushed roasted peanuts and a squeeze of fresh lime",
            "Sweet chocolate syrup",
            "Shredded cheddar cheese and sour cream"
          ],
          "answer": 1,
          "explanation": "\"...then finished with crushed roasted peanuts and a squeeze of fresh lime.\""
        },
        {
          "q": "5. In Mexico City, what type of tortillas are used to make late-night tacos?",
          "options": [
            "Crispy flour tortillas",
            "Warm corn tortillas",
            "Wheat pita bread",
            "Rice paper wraps"
          ],
          "answer": 1,
          "explanation": "\"In Mexico City, late-night taco stands serve warm corn tortillas filled with slow-braised beef...\""
        },
        {
          "q": "6. Why is street food especially popular among budget travelers?",
          "options": [
            "It offers authentic cultural flavors at affordable prices in bustling markets",
            "It is the only food available after 8 PM",
            "Travelers can cook the food themselves",
            "It is served exclusively in luxury hotels"
          ],
          "answer": 0,
          "explanation": "\"Street food is one of the most authentic ways to discover a country's culture and flavors... offer unforgettable culinary experiences for budget travelers.\""
        }
      ]
    },
    {
      "id": "read-a2-6",
      "title": "The Benefits of Learning a Musical Instrument – A2 Reading Test",
      "subtitle": "Music Education & Cognitive Benefits",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
      "desc": "Tìm hiểu những lợi ích tuyệt vời của việc học nhạc cụ đối với trí não, cảm xúc và kỹ năng xã hội.",
      "passage": "Learning to play a musical instrument is one of the most rewarding activities a person can pursue. Research shows that it benefits people of all ages in multiple surprising ways.\n\nCognitively, playing an instrument stimulates both hemispheres of the brain simultaneously. Musicians typically demonstrate superior memory, sharper mathematical ability, and stronger reading comprehension compared to non-musicians. This is because reading music notation requires the brain to process rhythm, pitch, and timing all at once.\n\nEmotionally, music provides a powerful outlet for self-expression. Playing the piano when feeling anxious or strumming the guitar after a stressful day helps regulate moods and significantly reduces cortisol – the stress hormone.\n\nSocially, joining a school orchestra, jazz band, or community choir teaches teamwork, listening skills, and mutual respect. Many lifelong friendships are formed through shared musical experiences.",
      "vocabulary": [
        {
          "word": "hemisphere",
          "meaning": "bán cầu (não)",
          "pron": "/ˈhem.ɪ.sfɪər/"
        },
        {
          "word": "notation",
          "meaning": "ký hiệu âm nhạc",
          "pron": "/nəʊˈteɪ.ʃən/"
        },
        {
          "word": "cortisol",
          "meaning": "hormone căng thẳng cortisol",
          "pron": "/ˈkɔː.tɪ.sɒl/"
        },
        {
          "word": "orchestra",
          "meaning": "dàn nhạc giao hưởng",
          "pron": "/ˈɔː.kɪ.strə/"
        }
      ],
      "questions": [
        {
          "q": "1. What cognitive advantage do musicians tend to have?",
          "options": [
            "Better physical strength and balance",
            "Superior memory, sharper mathematical ability, and stronger reading comprehension",
            "Faster running speed and athletic stamina",
            "Better cooking skills and taste sensitivity"
          ],
          "answer": 1,
          "explanation": "\"Musicians typically demonstrate superior memory, sharper mathematical ability, and stronger reading comprehension.\""
        },
        {
          "q": "2. Why does playing an instrument stimulate both brain hemispheres simultaneously?",
          "options": [
            "Musicians listen to loud noises",
            "Reading music notation requires processing rhythm, pitch, and timing all at once",
            "Instruments are heavy to carry",
            "Musicians must speak multiple foreign languages"
          ],
          "answer": 1,
          "explanation": "\"This is because reading music notation requires the brain to process rhythm, pitch, and timing all at once.\""
        },
        {
          "q": "3. What hormone does playing music help reduce?",
          "options": [
            "Melatonin",
            "Cortisol – the stress hormone",
            "Insulin",
            "Adrenaline"
          ],
          "answer": 1,
          "explanation": "\"...significantly reduces cortisol – the stress hormone.\""
        },
        {
          "q": "4. How does music help people emotionally?",
          "options": [
            "It provides an outlet for self-expression and helps regulate moods",
            "It eliminates the need to sleep",
            "It makes people forget their daily responsibilities",
            "It teaches people how to paint pictures"
          ],
          "answer": 0,
          "explanation": "\"Emotionally, music provides a powerful outlet for self-expression... helps regulate moods and significantly reduces cortisol...\""
        },
        {
          "q": "5. What social skills does joining an orchestra, band, or choir develop?",
          "options": [
            "Fast computer typing",
            "Teamwork, listening skills, and mutual respect",
            "Public debating and political campaigning",
            "Financial investment techniques"
          ],
          "answer": 1,
          "explanation": "\"...joining a school orchestra, jazz band, or community choir teaches teamwork, listening skills, and mutual respect.\""
        },
        {
          "q": "6. What is a long-term social benefit of shared musical experiences?",
          "options": [
            "Many lifelong friendships are formed",
            "Musicians never have to work a regular job",
            "Everyone becomes famous on television",
            "Musicians receive free concert tickets for life"
          ],
          "answer": 0,
          "explanation": "\"Many lifelong friendships are formed through shared musical experiences.\""
        }
      ]
    },
    {
      "id": "read-a2-7",
      "title": "The Sharing Economy: Airbnb and Uber – A2 Reading Test",
      "subtitle": "Digital Platforms & Modern Economy",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
      "desc": "Khám phá cách nền kinh tế chia sẻ với Airbnb và Uber đã thay đổi ngành du lịch và giao thông vận tải.",
      "passage": "Over the past decade, the \"sharing economy\" has fundamentally changed how millions of people travel, commute, and earn money.\n\nAirbnb, founded in San Francisco in 2008 by two designers who rented out air mattresses in their apartment, has grown into a global platform with over 7 million listings in 220 countries. Travelers now prefer renting a cozy local apartment over a generic hotel room, as it offers authentic neighborhood experiences at more affordable prices.\n\nSimilarly, Uber revolutionized urban transportation by connecting drivers with passengers through a smartphone application. Riders can see the driver's name, photo, rating, and estimated arrival time before they even enter the vehicle.\n\nCritics argue that these platforms sometimes create unfair competition for traditional hotels and taxi drivers. However, supporters highlight how the sharing economy creates flexible employment opportunities and reduces idle resource waste.",
      "vocabulary": [
        {
          "word": "listing",
          "meaning": "tin đăng (phòng/dịch vụ)",
          "pron": "/ˈlɪs.tɪŋ/"
        },
        {
          "word": "authentic",
          "meaning": "chân thực, địa phương",
          "pron": "/ɔːˈthen.tɪk/"
        },
        {
          "word": "idle",
          "meaning": "nhàn rỗi, không được sử dụng",
          "pron": "/ˈaɪ.dəl/"
        },
        {
          "word": "revolutionized",
          "meaning": "cách mạng hóa",
          "pron": "/ˌrev.əˈluː.ʃən.aɪzd/"
        }
      ],
      "questions": [
        {
          "q": "1. When and where was Airbnb founded?",
          "options": [
            "New York, 2012",
            "San Francisco, 2008",
            "London, 2005",
            "Tokyo, 2010"
          ],
          "answer": 1,
          "explanation": "\"Airbnb, founded in San Francisco in 2008 by two designers who rented out air mattresses in their apartment...\""
        },
        {
          "q": "2. How did Airbnb initially begin?",
          "options": [
            "By building luxury hotels worldwide",
            "Two designers rented out air mattresses in their apartment",
            "A software company created a booking engine for airlines",
            "Government officials developed a tourism initiative"
          ],
          "answer": 1,
          "explanation": "\"...founded in San Francisco in 2008 by two designers who rented out air mattresses in their apartment...\""
        },
        {
          "q": "3. Why do many travelers prefer Airbnb over traditional hotels?",
          "options": [
            "It offers authentic neighborhood experiences at more affordable prices",
            "Hotels are banned in most countries",
            "Airbnb provides free airline tickets",
            "Hotels do not allow international tourists"
          ],
          "answer": 0,
          "explanation": "\"Travelers now prefer renting a cozy local apartment over a generic hotel room, as it offers authentic neighborhood experiences at more affordable prices.\""
        },
        {
          "q": "4. What information can Uber riders see before entering the vehicle?",
          "options": [
            "Only the price of the trip",
            "The driver's name, photo, rating, and estimated arrival time",
            "The car color and brand only",
            "No information is provided in advance"
          ],
          "answer": 1,
          "explanation": "\"Riders can see the driver's name, photo, rating, and estimated arrival time before they even enter the vehicle.\""
        },
        {
          "q": "5. What argument do critics make against platforms like Airbnb and Uber?",
          "options": [
            "They create unfair competition for traditional hotels and taxi drivers",
            "They consume too much internet bandwidth",
            "They cause tourists to stay in their own countries",
            "They require travelers to own a personal vehicle"
          ],
          "answer": 0,
          "explanation": "\"Critics argue that these platforms sometimes create unfair competition for traditional hotels and taxi drivers.\""
        },
        {
          "q": "6. What main benefits do supporters highlight about the sharing economy?",
          "options": [
            "It creates flexible employment opportunities and reduces idle resource waste",
            "It makes all public transportation free of charge",
            "It completely replaces banks and currencies",
            "It forces companies to lower employee salaries"
          ],
          "answer": 0,
          "explanation": "\"However, supporters highlight how the sharing economy creates flexible employment opportunities and reduces idle resource waste.\""
        }
      ]
    },
    {
      "id": "read-a2-8",
      "title": "Climate Change: Simple Steps Everyone Can Take – A2 Reading Test",
      "subtitle": "Environmental Awareness & Green Lifestyle",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80",
      "desc": "Hiểu về biến đổi khí hậu và những hành động nhỏ hàng ngày giúp giảm thiểu lượng CO2 cá nhân.",
      "passage": "Climate scientists warn that global temperatures are rising at an alarming rate due to increased greenhouse gas emissions from burning fossil fuels, deforestation, and industrial agriculture.\n\nWhile governments and corporations need to make large structural changes, individuals can also play an important role through everyday choices. Here are some practical steps that make a real difference.\n\nTransportation accounts for approximately 24% of global CO2 emissions. Choosing public buses or trains instead of private cars, cycling to work, or carpooling with colleagues significantly cuts personal emissions.\n\nDiet changes are also powerful. Eating less red meat and more plant-based foods dramatically reduces water usage and methane emissions from livestock farming. Simply replacing beef with chicken or fish twice a week can reduce your dietary carbon footprint by 30%.\n\nAt home, replacing old incandescent bulbs with LED lights, taking shorter showers, and unplugging electronics when not in use saves both energy and money on utility bills.",
      "vocabulary": [
        {
          "word": "greenhouse gas",
          "meaning": "khí nhà kính",
          "pron": "/ˈɡriːn.haʊs ɡæs/"
        },
        {
          "word": "deforestation",
          "meaning": "nạn phá rừng",
          "pron": "/ˌdiː.fɒr.ɪˈsteɪ.ʃən/"
        },
        {
          "word": "carpooling",
          "meaning": "đi chung xe",
          "pron": "/ˈkɑː.puː.lɪŋ/"
        },
        {
          "word": "methane",
          "meaning": "khí mê-tan",
          "pron": "/ˈmiː.θeɪn/"
        }
      ],
      "questions": [
        {
          "q": "1. What causes global temperatures to rise at an alarming rate?",
          "options": [
            "Solar eclipses and natural oceanic tides",
            "Greenhouse gas emissions from burning fossil fuels, deforestation, and industrial agriculture",
            "Too many people using bicycles and public transport",
            "Excessive rainfall in tropical rainforests"
          ],
          "answer": 1,
          "explanation": "\"Climate scientists warn that global temperatures are rising at an alarming rate due to increased greenhouse gas emissions from burning fossil fuels, deforestation, and industrial agriculture.\""
        },
        {
          "q": "2. What percentage of global CO2 emissions does transportation account for?",
          "options": [
            "Approximately 5%",
            "Approximately 24%",
            "Exactly 50%",
            "Over 75%"
          ],
          "answer": 1,
          "explanation": "\"Transportation accounts for approximately 24% of global CO2 emissions.\""
        },
        {
          "q": "3. Which transportation choices significantly cut personal emissions?",
          "options": [
            "Driving a private sports car alone to work",
            "Choosing public buses, trains, cycling, or carpooling with colleagues",
            "Taking domestic flights for short commutes",
            "Buying larger gas-powered SUVs"
          ],
          "answer": 1,
          "explanation": "\"Choosing public buses or trains instead of private cars, cycling to work, or carpooling with colleagues significantly cuts personal emissions.\""
        },
        {
          "q": "4. How can changing your diet reduce your personal carbon footprint?",
          "options": [
            "By drinking only bottled fruit juices",
            "Replacing beef with chicken or fish twice a week can reduce dietary carbon by 30%",
            "By skipping breakfast every weekday",
            "By eating only imported exotic foods"
          ],
          "answer": 1,
          "explanation": "\"Simply replacing beef with chicken or fish twice a week can reduce your dietary carbon footprint by 30%.\""
        },
        {
          "q": "5. Why is reducing red meat consumption beneficial for the environment?",
          "options": [
            "It dramatically reduces water usage and methane emissions from livestock farming",
            "It makes farmers stop growing grain crops",
            "It lowers the global price of wheat",
            "It eliminates the need for grocery stores"
          ],
          "answer": 0,
          "explanation": "\"Eating less red meat and more plant-based foods dramatically reduces water usage and methane emissions from livestock farming.\""
        },
        {
          "q": "6. What simple home changes save both energy and money on utility bills?",
          "options": [
            "Replacing old incandescent bulbs with LED lights and taking shorter showers",
            "Leaving all television sets on standby all night",
            "Keeping heating and air conditioning on at maximum levels",
            "Using hot water to clean driveways"
          ],
          "answer": 0,
          "explanation": "\"At home, replacing old incandescent bulbs with LED lights, taking shorter showers, and unplugging electronics when not in use saves both energy and money on utility bills.\""
        }
      ]
    },
    {
      "id": "read-a2-9",
      "title": "The World of Social Media Influencers – A2 Reading Test",
      "subtitle": "Digital Media, Marketing & Online Careers",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
      "desc": "Tìm hiểu về thế giới influencer mạng xã hội, thu nhập quảng cáo và thách thức đằng sau vẻ ngoài hào nhoáng.",
      "passage": "In today's digital world, becoming a social media influencer has become a popular career aspiration for many young people. Instagram, YouTube, and TikTok stars can earn impressive incomes through brand sponsorships, affiliate marketing, and merchandise sales.\n\nHowever, the reality behind the glamorous photos and perfectly edited videos is often less attractive. Successful influencers typically work 10-12 hours daily creating content, responding to comments, negotiating contracts with brands, and analyzing engagement analytics.\n\nMia Chen, a 25-year-old beauty and lifestyle influencer with 800,000 followers, reveals that it took three years of consistent daily posting before she earned her first significant sponsorship deal. \"People think it's easy money, but it requires enormous creativity, discipline, and resilience against negative online comments,\" she explains.\n\nCritics also worry about the mental health impact of constantly comparing oneself to curated, filtered online images. Studies show that excessive social media use correlates with higher levels of anxiety and low self-esteem among teenagers.",
      "vocabulary": [
        {
          "word": "sponsorship",
          "meaning": "hợp đồng tài trợ quảng cáo",
          "pron": "/ˈspɒn.sə.ʃɪp/"
        },
        {
          "word": "affiliate",
          "meaning": "liên kết tiếp thị",
          "pron": "/əˈfɪl.i.ət/"
        },
        {
          "word": "engagement",
          "meaning": "tỷ lệ tương tác",
          "pron": "/ɪnˈɡeɪdʒ.mənt/"
        },
        {
          "word": "curated",
          "meaning": "được lựa chọn và chỉnh sửa kỹ lưỡng",
          "pron": "/kjʊˈreɪ.tɪd/"
        }
      ],
      "questions": [
        {
          "q": "1. What are the main ways social media influencers earn income?",
          "options": [
            "Fixed government salaries and pensions",
            "Brand sponsorships, affiliate marketing, and merchandise sales",
            "Selling smartphones and photography equipment",
            "Tuition fees charged directly to followers"
          ],
          "answer": 1,
          "explanation": "\"Instagram, YouTube, and TikTok stars can earn impressive incomes through brand sponsorships, affiliate marketing, and merchandise sales.\""
        },
        {
          "q": "2. How many hours a day do successful influencers typically work?",
          "options": [
            "Only 1 to 2 hours",
            "10 to 12 hours daily",
            "3 to 4 hours on weekends only",
            "They never work regular hours"
          ],
          "answer": 1,
          "explanation": "\"Successful influencers typically work 10-12 hours daily creating content, responding to comments, negotiating contracts with brands...\""
        },
        {
          "q": "3. How long did it take Mia Chen to earn her first significant sponsorship?",
          "options": [
            "One month of posting",
            "Three years of consistent daily posting",
            "Six months after launching her channel",
            "Just two weeks after going viral"
          ],
          "answer": 1,
          "explanation": "\"Mia Chen... reveals that it took three years of consistent daily posting before she earned her first significant sponsorship deal.\""
        },
        {
          "q": "4. According to Mia, what qualities are required to succeed as an influencer?",
          "options": [
            "Enormous creativity, discipline, and resilience against negative comments",
            "Expensive designer clothing and luxury cars",
            "A university degree in acting",
            "Living exclusively in Hollywood or New York"
          ],
          "answer": 0,
          "explanation": "\"\\\"People think it's easy money, but it requires enormous creativity, discipline, and resilience against negative online comments,\\\" she explains.\""
        },
        {
          "q": "5. What tasks are part of an influencer's daily workload?",
          "options": [
            "Creating content, answering comments, negotiating brand contracts, and analyzing data",
            "Printing paper magazines and distributing posters",
            "Selling cosmetics door to door",
            "Repairing photographic lenses and servers"
          ],
          "answer": 0,
          "explanation": "\"...creating content, responding to comments, negotiating contracts with brands, and analyzing engagement analytics.\""
        },
        {
          "q": "6. What concern do critics raise regarding teenagers and social media use?",
          "options": [
            "It consumes too much mobile battery life",
            "Excessive social media correlates with higher anxiety and low self-esteem from comparing to curated images",
            "Internet speed becomes slower in residential areas",
            "Young people forget how to read textbooks"
          ],
          "answer": 1,
          "explanation": "\"Studies show that excessive social media use correlates with higher levels of anxiety and low self-esteem among teenagers.\""
        }
      ]
    },
    {
      "id": "read-a2-10",
      "title": "Adventure Sports: Facing Fear & Building Confidence – A2 Reading Test",
      "subtitle": "Extreme Sports, Risk & Personal Growth",
      "level": "A2",
      "duration": "12 phút",
      "img": "https://images.unsplash.com/photo-1503525537740-98be8e10b8b3?w=600&auto=format&fit=crop&q=80",
      "desc": "Tìm hiểu các môn thể thao mạo hiểm như leo núi, nhảy dù và lướt sóng giúp phát triển sự tự tin và vượt qua giới hạn bản thân.",
      "passage": "Adventure sports are growing in popularity worldwide, attracting millions of thrill-seekers who want to challenge their physical limits and conquer their deepest fears.\n\nRock climbing, for example, requires not only physical strength but also intense mental concentration. As climbers ascend steep cliff faces using ropes and harnesses, they must calculate each move carefully and trust their equipment completely. Many participants report that the sense of achievement after reaching the summit is overwhelmingly powerful.\n\nSkydiving involves jumping from an airplane at approximately 15,000 feet and free-falling at 200 kilometers per hour before deploying a parachute. First-time jumpers typically experience an intense adrenaline rush followed by a profound feeling of calm and clarity.\n\nPsychologists note that regularly challenging oneself through controlled risk-taking activities like bungee jumping or white-water rafting measurably increases resilience, self-confidence, and tolerance for uncertainty in everyday life situations.",
      "vocabulary": [
        {
          "word": "thrill-seeker",
          "meaning": "người ưa mạo hiểm, kích thích",
          "pron": "/ˈthrɪl ˌsiː.kər/"
        },
        {
          "word": "harness",
          "meaning": "dây đai an toàn",
          "pron": "/ˈhɑː.nɪs/"
        },
        {
          "word": "adrenaline",
          "meaning": "chất kích thích adrenaline",
          "pron": "/əˈdren.ə.lɪn/"
        },
        {
          "word": "resilience",
          "meaning": "khả năng phục hồi sau khó khăn",
          "pron": "/rɪˈzɪl.jəns/"
        }
      ],
      "questions": [
        {
          "q": "1. What makes rock climbing mentally challenging in addition to being physically demanding?",
          "options": [
            "Climbers must memorize foreign language words while climbing",
            "Climbers must calculate each move carefully and trust their equipment completely",
            "Climbers have to race against a ticking stopwatch",
            "Climbers must build their own ropes from scratch"
          ],
          "answer": 1,
          "explanation": "\"As climbers ascend steep cliff faces using ropes and harnesses, they must calculate each move carefully and trust their equipment completely.\""
        },
        {
          "q": "2. What emotion do climbers report feeling after reaching the summit?",
          "options": [
            "Disappointment that the climb was too easy",
            "An overwhelmingly powerful sense of achievement",
            "Boredom and indifference",
            "Fear of never climbing again"
          ],
          "answer": 1,
          "explanation": "\"Many participants report that the sense of achievement after reaching the summit is overwhelmingly powerful.\""
        },
        {
          "q": "3. At what altitude do skydivers typically jump from the airplane?",
          "options": [
            "5,000 feet",
            "Approximately 15,000 feet",
            "100,000 feet",
            "1,000 feet"
          ],
          "answer": 1,
          "explanation": "\"Skydiving involves jumping from an airplane at approximately 15,000 feet...\""
        },
        {
          "q": "4. At what speed do skydivers free-fall before deploying their parachute?",
          "options": [
            "50 kilometers per hour",
            "200 kilometers per hour",
            "500 kilometers per hour",
            "30 kilometers per hour"
          ],
          "answer": 1,
          "explanation": "\"...and free-falling at 200 kilometers per hour before deploying a parachute.\""
        },
        {
          "q": "5. What sensation do first-time skydivers typically feel after the initial adrenaline rush?",
          "options": [
            "Extreme nausea and panic",
            "A profound feeling of calm and clarity",
            "Immediate drowsiness and sleepiness",
            "Anger at the instructor"
          ],
          "answer": 1,
          "explanation": "\"First-time jumpers typically experience an intense adrenaline rush followed by a profound feeling of calm and clarity.\""
        },
        {
          "q": "6. What psychological benefits do adventure sports provide according to psychologists?",
          "options": [
            "They make people become reckless and aggressive in all situations",
            "Measurably increased resilience, self-confidence, and tolerance for uncertainty in daily life",
            "They cure physical illnesses without medicine",
            "They reduce the need for formal education"
          ],
          "answer": 1,
          "explanation": "\"Psychologists note that regularly challenging oneself through controlled risk-taking activities... measurably increases resilience, self-confidence, and tolerance for uncertainty in everyday life situations.\""
        }
      ]
    }
  ],
  "B1": [
    {
      "id": "read-b1-1",
      "title": "The Psychology of Procrastination and Focus – B1 Reading Test",
      "level": "B1",
      "duration": "15 phút",
      "img": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích khoa học hành vi đằng sau thói quen trì hoãn và các giải pháp kích hoạt tập trung sâu.",
      "passage": "Procrastination is often misunderstood as mere laziness or poor time management. However, modern psychological research reveals that procrastination is actually an emotional regulation problem.\n\nWhen confronted with a daunting task – such as writing an extensive research thesis or preparing a major corporate presentation – our brain perceives the task as a threat to our self-esteem. To relieve this immediate discomfort, the subconscious mind gravitates toward low-effort, high-reward stimuli, such as scrolling through social media or checking emails.\n\nTo overcome chronic procrastination, cognitive scientists recommend the \"Two-Minute Rule\": simply commit to starting the task for just two minutes. Once the friction of starting is eliminated, the psychological momentum makes sustained focus significantly easier. Furthermore, breaking complex objectives into bite-sized micro-goals reduces cognitive overload.",
      "vocabulary": [
        {
          "word": "procrastination",
          "meaning": "sự trì hoãn",
          "pron": "/prəʊˌkræs.tɪˈneɪ.ʃən/"
        },
        {
          "word": "regulation",
          "meaning": "sự điều hòa, kiểm soát",
          "pron": "/ˌreɡ.jəˈleɪ.ʃən/"
        },
        {
          "word": "stimuli",
          "meaning": "các tác nhân kích thích",
          "pron": "/ˈstɪm.jə.laɪ/"
        },
        {
          "word": "momentum",
          "meaning": "đà phát triển, động lực",
          "pron": "/məˈmen.təm/"
        }
      ],
      "questions": [
        {
          "q": "1. According to modern psychological research, what is procrastination really about?",
          "options": [
            "Physical exhaustion and lack of stamina",
            "An emotional regulation problem rather than laziness or poor time management",
            "Genetic inheritance passed from parents",
            "A lack of intellectual capacity"
          ],
          "answer": 1,
          "explanation": "\"However, modern psychological research reveals that procrastination is actually an emotional regulation problem.\""
        },
        {
          "q": "2. How does the subconscious mind react when confronted with a daunting task?",
          "options": [
            "It immediately enters a state of hyper-focus",
            "It perceives the task as a threat to self-esteem and gravitates toward low-effort, high-reward stimuli",
            "It triggers deep REM sleep",
            "It increases memory recall"
          ],
          "answer": 1,
          "explanation": "\"...our brain perceives the task as a threat to our self-esteem. To relieve this immediate discomfort, the subconscious mind gravitates toward low-effort, high-reward stimuli...\""
        },
        {
          "q": "3. Which low-effort stimuli are mentioned as common escapes from daunting tasks?",
          "options": [
            "Running a marathon or mountain climbing",
            "Scrolling through social media or checking emails",
            "Writing another research paper",
            "Going to the gym for intense workouts"
          ],
          "answer": 1,
          "explanation": "\"...such as scrolling through social media or checking emails.\""
        },
        {
          "q": "4. What does the \"Two-Minute Rule\" recommend doing to overcome procrastination?",
          "options": [
            "Finish the entire project within two minutes",
            "Commit to starting the task for just two minutes",
            "Take a two-minute nap before working",
            "Set an alarm to ring every two minutes"
          ],
          "answer": 1,
          "explanation": "\"To overcome chronic procrastination, cognitive scientists recommend the \\\"Two-Minute Rule\\\": simply commit to starting the task for just two minutes.\""
        },
        {
          "q": "5. Why is eliminating the friction of starting so effective?",
          "options": [
            "It creates psychological momentum that makes sustained focus significantly easier",
            "It guarantees that work will be perfect without revisions",
            "It tricks the brain into falling asleep",
            "It reduces the total number of words required"
          ],
          "answer": 0,
          "explanation": "\"Once the friction of starting is eliminated, the psychological momentum makes sustained focus significantly easier.\""
        },
        {
          "q": "6. How does breaking complex objectives into bite-sized micro-goals help?",
          "options": [
            "It allows you to skip half of the project",
            "It reduces cognitive overload",
            "It doubles your reading speed instantly",
            "It makes other people do the work for you"
          ],
          "answer": 1,
          "explanation": "\"Furthermore, breaking complex objectives into bite-sized micro-goals reduces cognitive overload.\""
        }
      ]
    },
    {
      "id": "read-b1-2",
      "title": "The Art of Critical Thinking in the Fake News Era – B1 Reading Test",
      "subtitle": "Media Literacy & Cognitive Bias",
      "level": "B1",
      "duration": "15 phút",
      "img": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80",
      "desc": "Khám phá kỹ năng tư duy phản biện để nhận diện tin tức giả mạo, phân tích nguồn thông tin và tránh bẫy xác nhận.",
      "passage": "In an age where social media algorithms prioritize sensational content over factual accuracy, developing critical thinking skills has become an essential life skill. Research by the Reuters Institute found that approximately 56% of people regularly encounter news stories they suspect are false.\n\nCritical thinking begins with source evaluation. Before sharing any article, ask: Who published this? What are their financial incentives? Do other credible outlets report the same story? Legitimate news organizations employ professional editors and fact-checkers who verify information through primary sources.\n\nEqually important is recognizing cognitive biases that cloud judgment. \"Confirmation bias\" leads people to unconsciously seek information that confirms existing beliefs while dismissing contradictory evidence. Meanwhile, the \"bandwagon effect\" makes people adopt opinions simply because they perceive them as popular.\n\nMedia literacy experts recommend the SIFT method: Stop before sharing, Investigate the source, Find better coverage, and Trace original context. These four steps can dramatically reduce the spread of misinformation.",
      "vocabulary": [
        {
          "word": "sensational",
          "meaning": "giật gân, gây chú ý",
          "pron": "/senˈseɪ.ʃən.əl/"
        },
        {
          "word": "confirmation bias",
          "meaning": "xu hướng xác nhận định kiến",
          "pron": "/ˌkɒn.fəˈmeɪ.ʃən ˈbaɪ.əs/"
        },
        {
          "word": "misinformation",
          "meaning": "thông tin sai lệch",
          "pron": "/ˌmɪs.ɪn.fəˈmeɪ.ʃən/"
        },
        {
          "word": "credible",
          "meaning": "đáng tin cậy",
          "pron": "/ˈkred.ɪ.bəl/"
        }
      ],
      "questions": [
        {
          "q": "1. What percentage of people regularly encounter suspected fake news, according to Reuters?",
          "options": [
            "10%",
            "Approximately 56%",
            "90%",
            "25%"
          ],
          "answer": 1,
          "explanation": "\"Research by the Reuters Institute found that approximately 56% of people regularly encounter news stories they suspect are false.\""
        },
        {
          "q": "2. What initial questions should a critical thinker ask before sharing an article?",
          "options": [
            "How many likes does the post have?",
            "Who published this, what are their financial incentives, and do other credible outlets report it?",
            "Is the font attractive and easy to read?",
            "Can I earn money by reposting this?"
          ],
          "answer": 1,
          "explanation": "\"Before sharing any article, ask: Who published this? What are their financial incentives? Do other credible outlets report the same story?\""
        },
        {
          "q": "3. What is \"confirmation bias\" as described in the text?",
          "options": [
            "Always believing official government announcements",
            "Unconsciously seeking information that confirms existing beliefs while dismissing contradictory evidence",
            "Reading multiple international news sources daily",
            "Sharing news without reading beyond the headline"
          ],
          "answer": 1,
          "explanation": "\"Confirmation bias leads people to unconsciously seek information that confirms existing beliefs while dismissing contradictory evidence.\""
        },
        {
          "q": "4. What is the \"bandwagon effect\" mentioned in the passage?",
          "options": [
            "Joining a musical marching band",
            "Adopting opinions simply because they are perceived as popular",
            "Refusing to use social media platforms",
            "Believing only local municipal newspapers"
          ],
          "answer": 1,
          "explanation": "\"Meanwhile, the \\\"bandwagon effect\\\" makes people adopt opinions simply because they perceive them as popular.\""
        },
        {
          "q": "5. What does the \"F\" in the SIFT method stand for?",
          "options": [
            "Follow the author on social media",
            "Find better coverage",
            "Fact-check the headline only",
            "Filter out all opposing viewpoints"
          ],
          "answer": 1,
          "explanation": "\"Media literacy experts recommend the SIFT method: Stop before sharing, Investigate the source, Find better coverage, and Trace original context.\""
        },
        {
          "q": "6. What are the four complete steps of the SIFT method?",
          "options": [
            "Scan, Ignore, Forward, Translate",
            "Stop, Investigate source, Find better coverage, Trace original context",
            "Search, Inspect, Follow, Tweet",
            "Save, Illustrate, Format, Transmit"
          ],
          "answer": 1,
          "explanation": "\"Stop before sharing, Investigate the source, Find better coverage, and Trace original context. These four steps can dramatically reduce the spread of misinformation.\""
        }
      ]
    },
    {
      "id": "read-b1-3",
      "title": "The Remote Work Revolution – B1 Reading Test",
      "subtitle": "Future of Work & Digital Nomad Culture",
      "level": "B1",
      "duration": "15 phút",
      "img": "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích xu hướng làm việc từ xa toàn cầu sau COVID-19: lợi ích, thách thức và tương lai của văn phòng truyền thống.",
      "passage": "The COVID-19 pandemic triggered the most rapid workplace transformation in modern history. Within months, approximately 40% of the global workforce transitioned from traditional office environments to remote work arrangements. This seismic shift has permanently reshaped expectations around professional life.\n\nProponents of remote work cite numerous compelling advantages. Studies by Stanford University economist Nicholas Bloom demonstrate that remote workers exhibit 13% higher productivity compared to office counterparts, attributable to fewer interruptions, elimination of commuting stress, and greater autonomy over their schedules. Furthermore, companies benefit from dramatically reduced real estate overhead costs.\n\nHowever, remote work presents genuine psychological challenges. The erosion of clear boundaries between professional and personal spaces frequently leads to \"always-on\" culture, where employees feel implicit pressure to respond to messages outside contractual hours. Social isolation, reduced serendipitous collaboration, and career visibility concerns also trouble many remote professionals.\n\nHybrid working models – combining flexible home days with scheduled collaborative office sessions – have emerged as the dominant solution, balancing individual productivity with organizational cohesion.",
      "vocabulary": [
        {
          "word": "seismic shift",
          "meaning": "sự thay đổi mang tính bước ngoặt",
          "pron": "/ˈsaɪz.mɪk ʃɪft/"
        },
        {
          "word": "autonomy",
          "meaning": "quyền tự chủ",
          "pron": "/ɔːˈtɒn.ə.mi/"
        },
        {
          "word": "serendipitous",
          "meaning": "tình cờ, ngẫu nhiên",
          "pron": "/ˌser.ənˈdɪp.ɪ.təs/"
        },
        {
          "word": "cohesion",
          "meaning": "sự gắn kết",
          "pron": "/kəʊˈhiː.ʒən/"
        }
      ],
      "questions": [
        {
          "q": "1. What percentage of the global workforce transitioned to remote work during the pandemic?",
          "options": [
            "Approximately 10%",
            "Approximately 40%",
            "Over 85%",
            "Only 5%"
          ],
          "answer": 1,
          "explanation": "\"Within months, approximately 40% of the global workforce transitioned from traditional office environments to remote work arrangements.\""
        },
        {
          "q": "2. What percentage productivity increase did Stanford research find in remote workers?",
          "options": [
            "50% higher",
            "13% higher",
            "2% lower",
            "30% higher"
          ],
          "answer": 1,
          "explanation": "\"...remote workers exhibit 13% higher productivity compared to office counterparts, attributable to fewer interruptions...\""
        },
        {
          "q": "3. What factors explain the productivity increase observed in remote workers?",
          "options": [
            "Working overtime every weekend",
            "Fewer interruptions, elimination of commuting stress, and greater schedule autonomy",
            "Having to share computers with colleagues",
            "Stricter supervision through surveillance cameras"
          ],
          "answer": 1,
          "explanation": "\"...attributable to fewer interruptions, elimination of commuting stress, and greater autonomy over their schedules.\""
        },
        {
          "q": "4. What is the \"always-on\" culture mentioned in the text?",
          "options": [
            "Having office lights on throughout the night",
            "The implicit pressure felt by employees to respond to messages outside contractual hours",
            "A software company's continuous server uptime guarantee",
            "Using multiple digital screens simultaneously"
          ],
          "answer": 1,
          "explanation": "\"The erosion of clear boundaries between professional and personal spaces frequently leads to \\\"always-on\\\" culture, where employees feel implicit pressure to respond to messages outside contractual hours.\""
        },
        {
          "q": "5. What psychological and professional concerns trouble many remote workers?",
          "options": [
            "Social isolation, reduced serendipitous collaboration, and career visibility concerns",
            "Excessive physical exercise and fatigue",
            "Inability to purchase groceries online",
            "High cost of office stationery"
          ],
          "answer": 0,
          "explanation": "\"Social isolation, reduced serendipitous collaboration, and career visibility concerns also trouble many remote professionals.\""
        },
        {
          "q": "6. What solution has emerged as dominant for modern workplaces?",
          "options": [
            "Full-time mandatory office attendance five days a week",
            "Hybrid working models combining flexible home days with scheduled collaborative office sessions",
            "Completely closing down all corporate physical offices forever",
            "Working four-day work weeks exclusively"
          ],
          "answer": 1,
          "explanation": "\"Hybrid working models – combining flexible home days with scheduled collaborative office sessions – have emerged as the dominant solution...\""
        }
      ]
    },
    {
      "id": "read-b1-4",
      "title": "Youth Mental Health in the Digital Age – B1 Reading Test",
      "subtitle": "Psychology, Anxiety & Adolescent Wellbeing",
      "level": "B1",
      "duration": "15 phút",
      "img": "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&auto=format&fit=crop&q=80",
      "desc": "Tìm hiểu nguyên nhân khủng hoảng sức khỏe tâm thần của giới trẻ hiện đại và các giải pháp từ chuyên gia tâm lý học.",
      "passage": "Mental health professionals are raising alarm bells about what many describe as a generation-defining crisis in adolescent psychological wellbeing. In the United States, the percentage of high school students reporting persistent feelings of sadness or hopelessness increased from 26% in 2009 to an alarming 44% by 2021.\n\nSocial psychologist Jonathan Haidt argues that smartphone adoption among pre-teenagers is a primary causal factor. When adolescents – whose prefrontal cortex (the rational decision-making center) is still developmentally immature – gain unrestricted access to algorithmically optimized social platforms designed to maximize engagement, the psychological consequences can be significant.\n\nSocial comparison theory suggests that constant exposure to carefully curated highlight reels of peers' supposedly perfect lives triggers upward social comparison, which systematically erodes self-esteem and amplifies insecurity.\n\nImportantly, protective factors do exist. Longitudinal studies confirm that adolescents who regularly participate in team sports, cultivate offline friendships, engage in creative arts, and maintain consistent sleep routines exhibit significantly greater psychological resilience against depression and anxiety.",
      "vocabulary": [
        {
          "word": "prefrontal cortex",
          "meaning": "vùng não trán trước (điều khiển lý trí)",
          "pron": "/ˌpriːˈfrʌn.təl ˈkɔː.teks/"
        },
        {
          "word": "erodes",
          "meaning": "bào mòn, làm suy yếu dần",
          "pron": "/ɪˈrəʊdz/"
        },
        {
          "word": "longitudinal",
          "meaning": "nghiên cứu theo dài hạn",
          "pron": "/ˌlɒn.dʒɪˈtjuː.dɪ.nəl/"
        },
        {
          "word": "resilience",
          "meaning": "khả năng phục hồi tâm lý",
          "pron": "/rɪˈzɪl.jəns/"
        }
      ],
      "questions": [
              {
                      "q": "1. How much did the percentage of teens reporting sadness increase from 2009 to 2021?",
                      "options": [
                              "From 10% to 20%",
                              "From 26% to 44%",
                              "From 50% to 70%",
                              "From 5% to 10%"
                      ],
                      "answer": 1,
                      "explanation": "\"...increased from 26% in 2009 to an alarming 44% by 2021.\""
              },
              {
                      "q": "2. What does Jonathan Haidt identify as a primary causal factor for youth mental health decline?",
                      "options": [
                              "Excessive homework",
                              "Smartphone adoption among pre-teenagers",
                              "Poor nutrition",
                              "Lack of exercise"
                      ],
                      "answer": 1,
                      "explanation": "\"Jonathan Haidt argues that smartphone adoption among pre-teenagers is a primary causal factor.\""
              },
              {
                      "q": "3. What brain region undergoes intensive development during adolescence to govern emotional regulation?",
                      "options": [
                              "The visual cortex",
                              "The prefrontal cortex",
                              "The cerebellum",
                              "The temporal lobe"
                      ],
                      "answer": 1,
                      "explanation": "\"...particularly within the prefrontal cortex – the neural region governing executive function, emotional regulation, and risk assessment.\""
              },
              {
                      "q": "4. How do algorithmic notifications and likes affect teenagers according to the text?",
                      "options": [
                              "They improve concentration",
                              "They distort healthy dopamine circuitry and encourage addictive patterns",
                              "They boost long-term memory",
                              "They help students sleep faster"
                      ],
                      "answer": 1,
                      "explanation": "\"Constant exposure to algorithmic notifications and reward mechanisms (such as likes and shares) can distort healthy dopamine circuitry, rendering teenagers disproportionately vulnerable to addictive behavioral patterns.\""
              },
              {
                      "q": "5. For which group can digital connectivity offer critical emotional lifelines?",
                      "options": [
                              "Only professional gaming competitors",
                              "Marginalized youth, including LGBTQ+ adolescents seeking supportive communities",
                              "Older adults with dementia",
                              "High school teachers and staff"
                      ],
                      "answer": 1,
                      "explanation": "\"digital connectivity also offers critical emotional lifelines for marginalized youth, including LGBTQ+ adolescents seeking supportive communities.\""
              },
              {
                      "q": "6. Which set of protective factors helps build psychological resilience against digital stressors?",
                      "options": [
                              "Isolating at home and staying up late",
                              "Team sports, offline friendships, creative arts & consistent sleep routines",
                              "Playing online multiplayer games all night",
                              "Checking smartphone notifications every 10 minutes"
                      ],
                      "answer": 1,
                      "explanation": "\"adolescents who...participate in team sports, cultivate offline friendships, engage in creative arts, and maintain consistent sleep routines exhibit markedly greater psychological resilience.\""
              }
      ]
    },
    {
      "id": "read-b1-5",
      "title": "Global Migration: Stories Behind the Statistics – B1 Reading Test",
      "subtitle": "Immigration, Identity & Cultural Integration",
      "level": "B1",
      "duration": "15 phút",
      "img": "https://images.unsplash.com/photo-1531832218681-8b3a8b5c7e18?w=600&auto=format&fit=crop&q=80",
      "desc": "Khám phá câu chuyện đằng sau làn sóng di cư toàn cầu: nguyên nhân, thách thức hội nhập và sự đóng góp của người nhập cư.",
      "passage": "The United Nations estimates that approximately 281 million people currently live outside their country of birth – representing 3.6% of the world's population. Understanding the complex human stories behind this vast statistic is essential for informed policy debates.\n\nPeople migrate for diverse and often overlapping reasons: escaping armed conflict or political persecution, seeking superior economic opportunities, pursuing educational advancement, or reuniting with family members who previously relocated.\n\nCultural integration presents one of the greatest challenges for both migrants and host societies. Sociologists distinguish between \"assimilation\" – where immigrants abandon cultural practices to conform to the dominant culture – and \"integration\" – where newcomers maintain aspects of their heritage while adopting certain host country norms. Most contemporary migration researchers advocate for integration as the healthier and more sustainable approach.\n\nThe economic contributions of skilled immigration are well-documented. Economists estimate that first-generation immigrants contributed to founding 40% of Fortune 500 companies in the United States, including Apple, Google, eBay, and Yahoo. These findings challenge simplistic narratives that frame immigration solely as an economic burden.",
      "vocabulary": [
        {
          "word": "persecution",
          "meaning": "sự bức hại, đàn áp",
          "pron": "/ˌpɜː.sɪˈkjuː.ʃən/"
        },
        {
          "word": "assimilation",
          "meaning": "sự đồng hóa văn hóa",
          "pron": "/əˌsɪm.ɪˈleɪ.ʃən/"
        },
        {
          "word": "integration",
          "meaning": "sự hội nhập",
          "pron": "/ˌɪn.tɪˈɡreɪ.ʃən/"
        },
        {
          "word": "sustainable",
          "meaning": "bền vững lâu dài",
          "pron": "/səˈsteɪ.nə.bəl/"
        }
      ],
      "questions": [
              {
                      "q": "1. What percentage of the world's population lives outside their country of birth?",
                      "options": [
                              "20%",
                              "3.6%",
                              "50%",
                              "0.1%"
                      ],
                      "answer": 1,
                      "explanation": "\"approximately 281 million people...representing 3.6% of the world's population.\""
              },
              {
                      "q": "2. Which of the following is NOT mentioned as a reason for people migrating?",
                      "options": [
                              "Escaping armed conflict",
                              "Seeking higher-paying jobs and education",
                              "Family reunification",
                              "Becoming professional space explorers"
                      ],
                      "answer": 3,
                      "explanation": "\"People migrate for diverse and often overlapping reasons: escaping armed conflict or political persecution, seeking superior economic opportunities, pursuing educational advancement, or reuniting with family members...\""
              },
              {
                      "q": "3. What is the key distinction between \"assimilation\" and \"integration\"?",
                      "options": [
                              "They are interchangeable terms",
                              "Assimilation abandons original cultural practices; integration maintains heritage while adopting host norms",
                              "Integration is mandatory while assimilation is illegal",
                              "Assimilation only happens in schools"
                      ],
                      "answer": 1,
                      "explanation": "\"assimilation – where immigrants abandon cultural practices to conform to the dominant culture – and integration – where newcomers maintain aspects of their heritage while adopting certain host country norms.\""
              },
              {
                      "q": "4. Why do contemporary migration researchers advocate for integration over assimilation?",
                      "options": [
                              "It is considered healthier and more sustainable",
                              "It requires no legal paperwork",
                              "It eliminates the need to learn new languages",
                              "It costs less for governments"
                      ],
                      "answer": 0,
                      "explanation": "\"Most contemporary migration researchers advocate for integration as the healthier and more sustainable approach.\""
              },
              {
                      "q": "5. What percentage of Fortune 500 companies were co-founded by first-generation immigrants?",
                      "options": [
                              "5%",
                              "40%",
                              "80%",
                              "15%"
                      ],
                      "answer": 1,
                      "explanation": "\"first-generation immigrants contributed to founding 40% of Fortune 500 companies in the United States.\""
              },
              {
                      "q": "6. What misconception about immigration does the economic evidence in the text challenge?",
                      "options": [
                              "That immigrants never use transportation",
                              "That immigration is solely an economic burden on host nations",
                              "That immigrants only work in agriculture",
                              "That immigrants avoid using technology"
                      ],
                      "answer": 1,
                      "explanation": "\"These findings challenge simplistic narratives that frame immigration solely as an economic burden.\""
              }
      ]
    }
  ],
  "B1-plus": [
    {
      "id": "read-b1p-1",
      "title": "The Rise of Smart Cities and IoT Infrastructure – B1+ Reading Test",
      "level": "B1+",
      "duration": "15 phút",
      "img": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
      "desc": "Bài đọc chuyên sâu về thành phố thông minh, cảm biến IoT và tương lai giao thông tự hành.",
      "passage": "Urban centers across the globe are undergoing radical transformations through the deployment of smart city technologies. By integrating Internet of Things (IoT) sensors, automated traffic algorithms, and renewable energy grids, municipalities can dramatically optimize resource allocation and enhance citizens' quality of life.\n\nIn Singapore and Copenhagen, real-time traffic monitoring systems dynamically adjust signal timings based on vehicle density, reducing congestion and tailpipe emissions by up to 25%. Furthermore, intelligent streetlights automatically dim when no pedestrians are nearby, conserving massive amounts of electricity.\n\nHowever, the rapid expansion of smart cities raises legitimate privacy and cybersecurity concerns. Safeguarding massive datasets containing citizens' real-time biometric and location information remains a critical challenge for urban planners and software engineers.",
      "vocabulary": [
        {
          "word": "infrastructure",
          "meaning": "cơ sở hạ tầng",
          "pron": "/ˈɪn.frəˌstrʌk.tʃər/"
        },
        {
          "word": "municipality",
          "meaning": "chính quyền đô thị",
          "pron": "/mjuːˌnɪs.ɪˈpæl.ə.ti/"
        },
        {
          "word": "congestion",
          "meaning": "sự tắc nghẽn giao thông",
          "pron": "/kənˈdʒes.tʃən/"
        },
        {
          "word": "biometric",
          "meaning": "sinh trắc học",
          "pron": "/ˌbaɪ.əʊˈmet.rɪk/"
        }
      ],
      "questions": [
              {
                      "q": "1. What key technologies are enabling the transformation of modern smart cities?",
                      "options": [
                              "Steam engines and manual telegraphs",
                              "IoT sensors, automated traffic algorithms, and renewable energy grids",
                              "Paper maps and human traffic flaggers",
                              "Satellite TV broadcasts only"
                      ],
                      "answer": 1,
                      "explanation": "\"By integrating Internet of Things (IoT) sensors, automated traffic algorithms, and renewable energy grids, municipalities can dramatically optimize resource allocation...\""
              },
              {
                      "q": "2. By how much did real-time traffic monitoring reduce congestion and emissions in Singapore and Copenhagen?",
                      "options": [
                              "Up to 5%",
                              "Up to 25%",
                              "Up to 50%",
                              "Up to 80%"
                      ],
                      "answer": 1,
                      "explanation": "\"...reducing congestion and tailpipe emissions by up to 25%.\""
              },
              {
                      "q": "3. How do intelligent streetlights conserve municipal electricity?",
                      "options": [
                              "They are disconnected on cloudy days",
                              "They automatically dim when no pedestrians or vehicles are nearby",
                              "They only operate for two hours per night",
                              "They rely solely on battery packs without grid connection"
                      ],
                      "answer": 1,
                      "explanation": "\"...intelligent streetlights automatically dim when no pedestrians are nearby, conserving massive amounts of electricity.\""
              },
              {
                      "q": "4. What is the primary purpose of dynamically adjusting signal timings in smart traffic systems?",
                      "options": [
                              "To slow down emergency vehicles",
                              "To respond to real-time vehicle density and reduce travel delays",
                              "To force drivers to walk instead",
                              "To display commercial advertisements"
                      ],
                      "answer": 1,
                      "explanation": "\"real-time traffic monitoring systems dynamically adjust signal timings based on vehicle density, reducing congestion...\""
              },
              {
                      "q": "5. What major concerns are associated with the rapid rollout of smart city infrastructure?",
                      "options": [
                              "Lack of concrete and steel supplies",
                              "Privacy and cybersecurity risks regarding real-time biometric and location datasets",
                              "High ticket prices for public concerts",
                              "Decreased citizen interest in technology"
                      ],
                      "answer": 1,
                      "explanation": "\"the rapid expansion of smart cities raises legitimate privacy and cybersecurity concerns. Safeguarding massive datasets containing citizens' real-time biometric and location information remains a critical challenge...\""
              },
              {
                      "q": "6. What can be inferred about the future role of urban planners and software engineers?",
                      "options": [
                              "They will no longer be needed in municipal government",
                              "They must collaborate closely to balance automated infrastructure with strong data protection",
                              "They should focus exclusively on highway construction",
                              "They will work independently without addressing citizen privacy"
                      ],
                      "answer": 1,
                      "explanation": "\"Safeguarding massive datasets containing citizens' real-time biometric and location information remains a critical challenge for urban planners and software engineers.\""
              }
      ]
    },
    {
      "id": "read-b1p-2",
      "title": "The Gig Economy: Freedom or Exploitation? – B1+ Reading Test",
      "subtitle": "Platform Work, Labour Rights & Future Careers",
      "level": "B1+",
      "duration": "16 phút",
      "img": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích sâu về nền kinh tế nền tảng: từ Grab đến Upwork, lợi ích tự do ngắn hạn so với bất ổn dài hạn.",
      "passage": "The proliferation of platform-based employment – commonly termed the \"gig economy\" – has fundamentally restructured traditional employment relationships across the globe. Millions of workers now derive income through digital intermediaries such as Uber, Deliveroo, Airbnb, and Fiverr, performing discrete tasks rather than maintaining conventional permanent employment contracts.\n\nProponents celebrate the gig model's unprecedented flexibility. Workers can theoretically set their own hours, accept multiple income streams simultaneously, and operate from any geographic location. For skilled professionals, platforms like Upwork enable software developers in Vietnam or graphic designers in Kenya to access global markets previously inaccessible to them.\n\nHowever, critics argue that this flexibility is frequently illusory and comes at a substantial cost. Gig workers are classified as \"independent contractors\" in most jurisdictions, systematically excluding them from labor protections that employees take for granted: paid annual leave, employer pension contributions, redundancy pay, and access to sick pay.\n\nResearchers at Oxford's Future of Work Institute have documented that algorithmic management – where performance ratings and task allocation are controlled by opaque software rather than human supervisors – creates new forms of worker vulnerability and psychological stress. A single negative rating from one dissatisfied customer can devastate a driver's income overnight.",
      "vocabulary": [
        {
          "word": "proliferation",
          "meaning": "sự tăng sinh, bùng phát",
          "pron": "/prəˌlɪf.əˈreɪ.ʃən/"
        },
        {
          "word": "intermediary",
          "meaning": "trung gian",
          "pron": "/ˌɪn.tərˈmiː.di.er.i/"
        },
        {
          "word": "redundancy pay",
          "meaning": "trợ cấp thôi việc",
          "pron": "/rɪˈdʌn.dən.si peɪ/"
        },
        {
          "word": "algorithmic",
          "meaning": "thuộc về thuật toán",
          "pron": "/ˌæl.ɡəˈrɪð.mɪk/"
        }
      ],
      "questions": [
              {
                      "q": "1. What characterizes employment in the \"gig economy\"?",
                      "options": [
                              "Guaranteed lifetime civil service jobs",
                              "Performing discrete tasks through digital intermediaries instead of conventional permanent contracts",
                              "Hourly factory shifts managed by government inspectors",
                              "Working exclusively for non-profit charitable organizations"
                      ],
                      "answer": 1,
                      "explanation": "\"Millions of workers now derive income through digital intermediaries...performing discrete tasks rather than maintaining conventional permanent employment contracts.\""
              },
              {
                      "q": "2. What distinct benefit does the gig economy provide to skilled professionals in developing nations?",
                      "options": [
                              "Company-funded vehicles",
                              "Direct access to international markets and global clients",
                              "Free health insurance across borders",
                              "Diplomatic travel passports"
                      ],
                      "answer": 1,
                      "explanation": "\"platforms like Upwork enable software developers in Vietnam or graphic designers in Kenya to access global markets previously inaccessible to them.\""
              },
              {
                      "q": "3. Why are gig workers excluded from statutory protections such as sick pay and pensions in most jurisdictions?",
                      "options": [
                              "Because they refuse to pay taxes",
                              "Because they are classified as independent contractors rather than formal employees",
                              "Because they work less than one hour per week",
                              "Because platforms operate outside the internet"
                      ],
                      "answer": 1,
                      "explanation": "\"Gig workers are classified as 'independent contractors' in most jurisdictions, systematically excluding them from labor protections that employees take for granted...\""
              },
              {
                      "q": "4. What does the term \"algorithmic management\" refer to in this passage?",
                      "options": [
                              "Company executives teaching computer classes",
                              "Performance evaluations and job allocations automated by opaque software algorithms",
                              "Government regulations on smartphone apps",
                              "Workers voting on management decisions online"
                      ],
                      "answer": 1,
                      "explanation": "\"algorithmic management – where performance ratings and task allocation are controlled by opaque software rather than human supervisors...\""
              },
              {
                      "q": "5. According to Oxford researchers, why can customer ratings cause severe stress for platform workers?",
                      "options": [
                              "Customers never leave ratings",
                              "A single negative review can immediately suppress task allocation and devastate income",
                              "Reviews are published in local newspapers",
                              "Ratings determine income tax rates"
                      ],
                      "answer": 1,
                      "explanation": "\"creates new forms of worker vulnerability and psychological stress. A single negative rating from one dissatisfied customer can devastate a driver's income overnight.\""
              },
              {
                      "q": "6. What is the central debate regarding the gig economy presented by the author?",
                      "options": [
                              "Whether smartphones will be replaced by computers",
                              "Whether platform work represents liberating flexibility or precarious exploitation without social safety nets",
                              "Whether food delivery apps are faster than taxis",
                              "Whether software developers earn more than graphic designers"
                      ],
                      "answer": 1,
                      "explanation": "\"The Gig Economy: Freedom or Exploitation?\" juxtaposes unprecedented flexibility against vulnerability, absence of protections, and algorithmic precarity."
              }
      ]
    },
    {
      "id": "read-b1p-3",
      "title": "The Science of Habit Formation – B1+ Reading Test",
      "subtitle": "Neuroscience, Behaviour Design & Self-Improvement",
      "level": "B1+",
      "duration": "16 phút",
      "img": "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=600&auto=format&fit=crop&q=80",
      "desc": "Khoa học đằng sau vòng lặp thói quen (habit loop), cue-routine-reward và cách thiết kế thói quen mới bền vững.",
      "passage": "Charles Duhigg's landmark 2012 book \"The Power of Habit\" introduced mainstream audiences to the neuroscientific concept of the \"habit loop\" – a three-part cycle comprising a cue, a routine, and a reward. Understanding this mechanism has profound implications for personal development, organizational psychology, and public health policy.\n\nThe cue is any trigger – environmental, emotional, temporal, or social – that automatically activates a behavioral routine. A smoker, for instance, may associate morning coffee with the urge to smoke; the coffee itself functions as the cue. The routine is the behavior that follows, while the reward is the neurochemical reinforcement (typically a dopamine release) that encodes the association in memory.\n\nNeuroscientists at MIT's McGovern Institute demonstrated that as habits become automated, the prefrontal cortex (responsible for conscious decision-making) progressively disengages, transferring behavioral control to the basal ganglia. This explains why established habits require minimal cognitive effort to execute but are extraordinarily difficult to consciously override.\n\nTo build a new positive habit, behavioral scientists recommend the \"implementation intention\" technique: specifying precisely when, where, and how the behavior will be performed (\"I will meditate for ten minutes after making my morning coffee in the kitchen\"). This specificity dramatically increases follow-through rates compared to vague intentions like \"I want to meditate more.\"",
      "vocabulary": [
        {
          "word": "neurochemical",
          "meaning": "thuộc về hóa thần kinh",
          "pron": "/ˌnjʊə.rəʊˈkem.ɪ.kəl/"
        },
        {
          "word": "basal ganglia",
          "meaning": "hạch nền não (trung tâm thói quen)",
          "pron": "/ˈbeɪ.zəl ˈɡæŋ.ɡli.ə/"
        },
        {
          "word": "implementation",
          "meaning": "sự thực hiện, triển khai",
          "pron": "/ˌɪm.plɪ.menˈteɪ.ʃən/"
        },
        {
          "word": "dopamine",
          "meaning": "chất dẫn truyền thần kinh dopamine",
          "pron": "/ˈdəʊ.pə.miːn/"
        }
      ],
      "questions": [
              {
                      "q": "1. What are the three components of the \"habit loop\" outlined by Charles Duhigg?",
                      "options": [
                              "Desire, effort, outcome",
                              "Cue, routine, and reward",
                              "Plan, schedule, and execution",
                              "Stimulus, contemplation, and review"
                      ],
                      "answer": 1,
                      "explanation": "\"...the 'habit loop' – a three-part cycle comprising a cue, a routine, and a reward.\""
              },
              {
                      "q": "2. What role does dopamine play in the habit cycle?",
                      "options": [
                              "It induces deep sleep immediately",
                              "It acts as a neurochemical reward that encodes behavioral associations in memory",
                              "It shuts down the basal ganglia completely",
                              "It reduces physical heartbeat"
                      ],
                      "answer": 1,
                      "explanation": "\"...the reward is the neurochemical reinforcement (typically a dopamine release) that encodes the association in memory.\""
              },
              {
                      "q": "3. Which brain region takes over behavioral execution once a routine becomes an automated habit?",
                      "options": [
                              "The prefrontal cortex",
                              "The basal ganglia",
                              "The olfactory bulb",
                              "The auditory canal"
                      ],
                      "answer": 1,
                      "explanation": "\"the prefrontal cortex (responsible for conscious decision-making) progressively disengages, transferring behavioral control to the basal ganglia.\""
              },
              {
                      "q": "4. Why do established habits require minimal cognitive energy to perform?",
                      "options": [
                              "Because people are born with them",
                              "Because the conscious prefrontal cortex disengages as the routine becomes automated",
                              "Because muscles perform tasks without nerves",
                              "Because the brain consumes zero glucose during habits"
                      ],
                      "answer": 1,
                      "explanation": "\"This explains why established habits require minimal cognitive effort to execute but are extraordinarily difficult to consciously override.\""
              },
              {
                      "q": "5. How does an \"implementation intention\" differ from a general goal?",
                      "options": [
                              "It requires monetary investment",
                              "It defines precise parameters: when, where, and how the target action will occur",
                              "It must be approved by a psychologist",
                              "It involves writing a lengthy book"
                      ],
                      "answer": 1,
                      "explanation": "\"...the 'implementation intention' technique: specifying precisely when, where, and how the behavior will be performed...\""
              },
              {
                      "q": "6. Which example represents an effective implementation intention?",
                      "options": [
                              "\"I hope to get fit next year.\"",
                              "\"I will meditate for ten minutes after brewing my morning coffee in the kitchen.\"",
                              "\"I should read more books whenever I feel like it.\"",
                              "\"I want to eat healthier food soon.\""
                      ],
                      "answer": 1,
                      "explanation": "\"...specifying precisely when, where, and how the behavior will be performed ('I will meditate for ten minutes after making my morning coffee in the kitchen').\""
              }
      ]
    },
    {
      "id": "read-b1p-4",
      "title": "Fast Fashion vs. Sustainable Clothing – B1+ Reading Test",
      "subtitle": "Environmental Impact, Consumer Ethics & Industry Reform",
      "level": "B1+",
      "duration": "16 phút",
      "img": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích tác hại của ngành thời trang nhanh và phong trào tiêu dùng có trách nhiệm với môi trường.",
      "passage": "The fashion industry is the world's second-largest industrial polluter, responsible for approximately 10% of global carbon emissions and 20% of global wastewater production annually. At the epicenter of this environmental crisis is the \"fast fashion\" business model, pioneered by retailers like Zara, H&M, and Shein, which floods markets with ultra-cheap, trend-driven garments designed for minimal durability.\n\nThe human cost is equally alarming. Fast fashion supply chains disproportionately rely on garment workers in Bangladesh, Cambodia, and Ethiopia – predominantly women – who often work in hazardous factory conditions for wages that fall below local living standards. The 2013 collapse of the Rana Plaza factory in Dhaka, which killed 1,134 workers, remains a haunting symbol of the industry's exploitative practices.\n\nIn response, the \"slow fashion\" movement advocates for a fundamental reimagination of consumption: purchasing fewer, higher-quality garments from ethical producers, extending clothing lifespans through repair and second-hand purchasing, and demanding corporate supply chain transparency.\n\nLegislative pressure is also mounting. The European Union's Digital Product Passport initiative, expected to be mandatory by 2030, will require all clothing sold in Europe to carry detailed information about its origin, materials, carbon footprint, and recyclability – empowering consumers to make genuinely informed choices.",
      "vocabulary": [
        {
          "word": "wastewater",
          "meaning": "nước thải công nghiệp",
          "pron": "/ˈweɪst.wɔː.tər/"
        },
        {
          "word": "disproportionately",
          "meaning": "không cân xứng, không tương xứng",
          "pron": "/ˌdɪs.prəˈpɔː.ʃən.ət.li/"
        },
        {
          "word": "transparency",
          "meaning": "tính minh bạch",
          "pron": "/trænsˈpær.ən.si/"
        },
        {
          "word": "recyclability",
          "meaning": "khả năng tái chế",
          "pron": "/ˌriː.saɪ.kləˈbɪl.ɪ.ti/"
        }
      ],
      "questions": [
              {
                      "q": "1. What environmental impact does the global fashion industry have annually?",
                      "options": [
                              "Less than 1% of water usage",
                              "Approximately 10% of carbon emissions and 20% of industrial wastewater",
                              "It produces no chemical pollutants",
                              "It generates 50% of the world's electricity"
                      ],
                      "answer": 1,
                      "explanation": "\"responsible for approximately 10% of global carbon emissions and 20% of global wastewater production annually.\""
              },
              {
                      "q": "2. What defines the core business model of \"fast fashion\" brands?",
                      "options": [
                              "Custom handmade tailoring with organic wool",
                              "Flooding markets with ultra-cheap, trend-driven items designed for short lifespans",
                              "Producing only recycled athletic gear",
                              "Renting luxury clothing for formal events"
                      ],
                      "answer": 1,
                      "explanation": "\"...floods markets with ultra-cheap, trend-driven garments designed for minimal durability.\""
              },
              {
                      "q": "3. What tragedy in 2013 highlighted the dangerous labor conditions in global garment factories?",
                      "options": [
                              "The closure of a textile mill in Manchester",
                              "The collapse of the Rana Plaza factory in Dhaka, killing 1,134 workers",
                              "A shipping container accident in the Pacific",
                              "A strike in a footwear distribution warehouse"
                      ],
                      "answer": 1,
                      "explanation": "\"The 2013 collapse of the Rana Plaza factory in Dhaka, which killed 1,134 workers, remains a haunting symbol of the industry's exploitative practices.\""
              },
              {
                      "q": "4. What principles are championed by the \"slow fashion\" movement?",
                      "options": [
                              "Throwing clothes away after two wears",
                              "Purchasing fewer high-quality pieces, garment repairs, second-hand shopping, and supply chain transparency",
                              "Banning all cotton farming worldwide",
                              "Buying clothes exclusively online from fast fashion retailers"
                      ],
                      "answer": 1,
                      "explanation": "\"...purchasing fewer, higher-quality garments from ethical producers, extending clothing lifespans through repair and second-hand purchasing, and demanding corporate supply chain transparency.\""
              },
              {
                      "q": "5. What mandate will the European Union's Digital Product Passport enforce by 2030?",
                      "options": [
                              "A compulsory dress code for public workers",
                              "Requiring clothing to display verifiable data on origins, material composition, carbon footprint, and recyclability",
                              "Restricting clothing production to local European factories only",
                              "Banning all imported textiles entirely"
                      ],
                      "answer": 1,
                      "explanation": "\"...will require all clothing sold in Europe to carry detailed information about its origin, materials, carbon footprint, and recyclability...\""
              },
              {
                      "q": "6. What is the passage's primary conclusion regarding solving the clothing crisis?",
                      "options": [
                              "Consumers should stop wearing clothes completely",
                              "Solving the crisis requires both conscious consumer choices (slow fashion) and binding government regulations (EU passport)",
                              "Fast fashion will naturally correct itself without intervention",
                              "Technological progress alone will eliminate textile pollution"
                      ],
                      "answer": 1,
                      "explanation": "The text discusses how consumer resistance ('slow fashion') and 'legislative pressure' (EU initiatives) work together to reform the industry."
              }
      ]
    }
  ],
  "B2": [
    {
      "id": "read-b2-1",
      "title": "Neuroplasticity and Continuous Lifelong Learning – B2 Reading Test",
      "level": "B2",
      "duration": "18 phút",
      "img": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80",
      "desc": "Nghiên cứu khoa học thần kinh về khả năng tái cấu trúc của não bộ khi học ngôn ngữ và kỹ năng mới.",
      "passage": "For decades, conventional neuroscience maintained that the adult human brain was structurally immutable. It was believed that after critical developmental windows in early childhood, neural pathways became permanently fixed. Modern research, however, has completely revolutionized this paradigm through the discovery of neuroplasticity.\n\nNeuroplasticity refers to the brain's remarkable capacity to reorganize synaptic connections throughout an individual's entire lifespan in response to novel experiences, intensive learning, or rehabilitation after trauma. When an adult acquires a complex foreign language, memorizes new musical notations, or learns computer programming, the brain actively establishes new dendrite branches and strengthens myelin sheaths around active axons.\n\nThis biological adaptability underscores the profound benefits of lifelong learning. Engaging in intellectually rigorous activities not only builds cognitive resilience against neurodegenerative disorders like Alzheimer's, but also fosters creative problem-solving capabilities well into old age.",
      "vocabulary": [
        {
          "word": "neuroplasticity",
          "meaning": "tính khả biến của não bộ",
          "pron": "/ˌnjʊə.rəʊ.plæsˈtɪs.ə.ti/"
        },
        {
          "word": "synaptic",
          "meaning": "thuộc về khớp thần kinh",
          "pron": "/sɪˈnæp.tɪk/"
        },
        {
          "word": "immutable",
          "meaning": "bất biến, không thể thay đổi",
          "pron": "/ɪˈmjuː.tə.bəl/"
        },
        {
          "word": "resilience",
          "meaning": "khả năng phục hồi, sức dẻo dai",
          "pron": "/rɪˈzɪl.jəns/"
        }
      ],
      "questions": [
              {
                      "q": "1. What historical dogma in neuroscience was overturned by the discovery of neuroplasticity?",
                      "options": [
                              "That brain cells communicate via electrical impulses",
                              "That the adult human brain was structurally immutable with permanently fixed pathways",
                              "That infants could acquire languages easily",
                              "That physical trauma could damage brain tissue"
                      ],
                      "answer": 1,
                      "explanation": "\"For decades, conventional neuroscience maintained that the adult human brain was structurally immutable. It was believed that after critical developmental windows in early childhood, neural pathways became permanently fixed.\""
              },
              {
                      "q": "2. How is \"neuroplasticity\" formally defined in the text?",
                      "options": [
                              "The surgical replacement of damaged brain regions with synthetic grafts",
                              "The brain's lifelong capacity to reorganize synaptic connections in response to experiences and learning",
                              "The inability of elderly individuals to form new memories",
                              "The automated decay of unused synapses during deep sleep"
                      ],
                      "answer": 1,
                      "explanation": "\"Neuroplasticity refers to the brain's remarkable capacity to reorganize synaptic connections throughout an individual's entire lifespan in response to novel experiences, intensive learning, or rehabilitation...\""
              },
              {
                      "q": "3. What structural adaptations happen in the brain when an adult learns a complex skill like a language?",
                      "options": [
                              "Neurons shrink and stop firing electrical charges",
                              "The brain forms new dendrite branches and strengthens protective myelin sheaths around active axons",
                              "Synaptic receptors are permanently blocked",
                              "Brain volume decreases to save space"
                      ],
                      "answer": 1,
                      "explanation": "\"...the brain actively establishes new dendrite branches and strengthens myelin sheaths around active axons.\""
              },
              {
                      "q": "4. According to the author, how does rigorous cognitive engagement benefit aging adults?",
                      "options": [
                              "It guarantees 20/20 visual acuity in retirement",
                              "It builds cognitive resilience against neurodegenerative conditions like Alzheimer's and fosters creative problem-solving",
                              "It replaces the biological need for sleep",
                              "It eliminates the occurrence of all emotional stress"
                      ],
                      "answer": 1,
                      "explanation": "\"Engaging in intellectually rigorous activities not only builds cognitive resilience against neurodegenerative disorders like Alzheimer's, but also fosters creative problem-solving capabilities well into old age.\""
              },
              {
                      "q": "5. Which of the following best exemplifies an activity that triggers neuroplastic reorganization?",
                      "options": [
                              "Watching the same television rerun passively",
                              "Learning computer programming, mastering musical notation, or acquiring a foreign language",
                              "Sleeping for fourteen hours without interruption",
                              "Taking the exact same walking route without noticing surroundings"
                      ],
                      "answer": 1,
                      "explanation": "\"When an adult acquires a complex foreign language, memorizes new musical notations, or learns computer programming, the brain actively establishes new dendrite branches...\""
              },
              {
                      "q": "6. What philosophical or practical implication does the passage emphasize?",
                      "options": [
                              "Education should conclude once adolescence finishes",
                              "Lifelong learning is an active biological maintenance strategy that preserves and enhances cognitive capacity",
                              "Genetics entirely predetermines mental acuity throughout life",
                              "Only childhood education determines adult cognitive capabilities"
                      ],
                      "answer": 1,
                      "explanation": "\"This biological adaptability underscores the profound benefits of lifelong learning...fosters creative problem-solving capabilities well into old age.\""
              }
      ]
    },
    {
      "id": "read-b2-2",
      "title": "Behavioural Economics: Why We Make Irrational Decisions – B2 Reading Test",
      "subtitle": "Cognitive Biases, Loss Aversion & Nudge Theory",
      "level": "B2",
      "duration": "18 phút",
      "img": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích khoa học hành vi kinh tế: tại sao con người không phải là \"homo economicus\" và lý thuyết nudge thay đổi chính sách.",
      "passage": "Traditional economic theory is predicated upon the assumption of the \"rational actor\" – a hypothetical agent who consistently maximizes personal utility through cool-headed, information-complete decision-making. This elegant theoretical construct, however, bears little resemblance to actual human behavior, as Nobel laureate Daniel Kahneman and his collaborator Amos Tversky demonstrated through decades of meticulously designed cognitive experiments.\n\nKahneman's seminal framework distinguishes between two cognitive systems: System 1 (fast, intuitive, emotionally-driven, and susceptible to systematic biases) and System 2 (slow, deliberate, analytical, and effortful). The majority of everyday decisions – including complex financial choices – are processed primarily through System 1, leaving people vulnerable to predictable irrational tendencies.\n\nLoss aversion is perhaps the most consequential of these documented biases. Research consistently demonstrates that the psychological pain associated with losing a given sum of money is approximately 2.5 times more powerful than the pleasure derived from gaining an equivalent amount. This asymmetry profoundly influences investment decisions, insurance purchasing behaviors, and negotiation strategies.\n\nNudge theory, pioneered by Thaler and Sunstein, proposes that governments can ethically improve public welfare by architecting choice environments that predictably steer individuals toward beneficial decisions without restricting their freedom. Organ donation opt-out systems, automatic pension enrollment, and strategically placed healthy food in school cafeterias are classic applications of nudge policy design.",
      "vocabulary": [
        {
          "word": "predicated upon",
          "meaning": "được dựa trên cơ sở, giả định",
          "pron": "/ˈpred.ɪ.keɪ.tɪd ə.ˈpɒn/"
        },
        {
          "word": "loss aversion",
          "meaning": "xu hướng sợ mất mát",
          "pron": "/lɒs əˈvɜː.ʒən/"
        },
        {
          "word": "nudge theory",
          "meaning": "lý thuyết cú huých nhẹ trong chính sách",
          "pron": "/nʌdʒ ˈθɪər.i/"
        },
        {
          "word": "asymmetry",
          "meaning": "sự bất đối xứng",
          "pron": "/eɪˈsɪm.ɪ.tri/"
        }
      ],
      "questions": [
              {
                      "q": "1. What fundamental premise of classical economics was challenged by Kahneman and Tversky?",
                      "options": [
                              "That markets fluctuate based on supply and demand",
                              "The 'rational actor' assumption that humans consistently make optimal utility-maximizing choices",
                              "That governments collect taxes from citizens",
                              "That paper currency holds representative value"
                      ],
                      "answer": 1,
                      "explanation": "\"Traditional economic theory is predicated upon the assumption of the 'rational actor' – a hypothetical agent who consistently maximizes personal utility through cool-headed, information-complete decision-making. This elegant theoretical construct, however, bears little resemblance to actual human behavior...\""
              },
              {
                      "q": "2. According to Kahneman's cognitive framework, what distinguishes System 1 from System 2?",
                      "options": [
                              "System 1 is analytical and slow; System 2 is emotional and impulsive",
                              "System 1 operates quickly and intuitively with systematic biases; System 2 is deliberate, analytical, and effortful",
                              "System 1 only functions during sleep; System 2 governs wakefulness",
                              "System 1 is located in the spinal cord; System 2 is in the prefrontal cortex"
                      ],
                      "answer": 1,
                      "explanation": "\"System 1 (fast, intuitive, emotionally-driven, and susceptible to systematic biases) and System 2 (slow, deliberate, analytical, and effortful).\""
              },
              {
                      "q": "3. What does experimental research reveal about \"loss aversion\"?",
                      "options": [
                              "People value potential profits much more than preserving current capital",
                              "The psychological pain of experiencing a loss is roughly 2.5 times stronger than the joy of an equivalent gain",
                              "People feel completely indifferent when losing money in investments",
                              "Losses only affect individuals who lack financial literacy"
                      ],
                      "answer": 1,
                      "explanation": "\"the psychological pain associated with losing a given sum of money is approximately 2.5 times more powerful than the pleasure derived from gaining an equivalent amount.\""
              },
              {
                      "q": "4. How does \"nudge theory\" aim to influence human decision-making?",
                      "options": [
                              "By imposing severe criminal fines and authoritarian prohibitions",
                              "By structuring choice environments that guide people toward beneficial actions without revoking their freedom of choice",
                              "By distributing direct cash incentives for every healthy decision",
                              "By censoring marketing advertisements across television and print"
                      ],
                      "answer": 1,
                      "explanation": "\"governments can ethically improve public welfare by architecting choice environments that predictably steer individuals toward beneficial decisions without restricting their freedom.\""
              },
              {
                      "q": "5. Which policy design exemplifies the practical application of nudge theory?",
                      "options": [
                              "Banning all motorized vehicles in metropolitan areas",
                              "Default auto-enrollment in retirement pensions and organ donation opt-out systems",
                              "Mandating daily physical exercise by federal law",
                              "Imposing a 90% tax rate on imported luxury watches"
                      ],
                      "answer": 1,
                      "explanation": "\"Organ donation opt-out systems, automatic pension enrollment, and strategically placed healthy food in school cafeterias are classic applications of nudge policy design.\""
              },
              {
                      "q": "6. Why are everyday financial decisions frequently subject to cognitive biases?",
                      "options": [
                              "Because people refuse to read books",
                              "Because most decisions are mediated by rapid System 1 thinking rather than exhaustive System 2 analysis",
                              "Because banks intentionally hide currency values",
                              "Because humans possess no logical reasoning faculties"
                      ],
                      "answer": 1,
                      "explanation": "\"The majority of everyday decisions – including complex financial choices – are processed primarily through System 1, leaving people vulnerable to predictable irrational tendencies.\""
              }
      ]
    },
    {
      "id": "read-b2-3",
      "title": "The Ocean Plastic Crisis: Scale, Science & Solutions – B2 Reading Test",
      "subtitle": "Marine Pollution, Microplastics & Global Policy",
      "level": "B2",
      "duration": "18 phút",
      "img": "https://images.unsplash.com/photo-1498598457418-36ef20772bb9?w=600&auto=format&fit=crop&q=80",
      "desc": "Nghiên cứu về ô nhiễm nhựa đại dương: từ vòng xoáy rác Thái Bình Dương đến vi nhựa trong cơ thể con người.",
      "passage": "The world's oceans are currently contaminated by an estimated 170 trillion plastic particles – a figure so staggering that plastic has effectively become a geological marker of the Anthropocene epoch. Each year, an additional 8 to 10 million metric tonnes of plastic enter marine ecosystems, threatening biodiversity, food security, and ultimately human health through an insidious process of biomagnification.\n\nThe Great Pacific Garbage Patch – a vast accumulation of marine debris concentrated by oceanic gyres between Hawaii and California – spans an area approximately three times the size of France. Contrary to popular imagery of a floating \"island\" of rubbish, the patch is predominantly composed of microplastics: particles smaller than 5 millimeters that are extraordinarily difficult to detect and virtually impossible to retrieve at scale using current technology.\n\nMost alarmingly, microplastics have been detected in human blood, lung tissue, placental tissue, and even in the brains of deceased individuals. While the long-term health implications remain under active investigation, preliminary studies associate microplastic exposure with inflammatory responses, oxidative cellular stress, and potential endocrine disruption.\n\nAddressing the crisis demands a multilateral legislative framework. The UN Global Plastics Treaty, currently under negotiation, aims to establish legally binding production caps on virgin plastics, mandatory extended producer responsibility schemes, and standardized global recycling infrastructure by 2040.",
      "vocabulary": [
        {
          "word": "biomagnification",
          "meaning": "hiện tượng tích tụ sinh học trong chuỗi thức ăn",
          "pron": "/ˌbaɪ.əʊ.mæɡ.nɪ.fɪˈkeɪ.ʃən/"
        },
        {
          "word": "gyre",
          "meaning": "xoáy nước đại dương",
          "pron": "/dʒaɪər/"
        },
        {
          "word": "endocrine disruption",
          "meaning": "rối loạn nội tiết tố",
          "pron": "/ˈen.dəʊ.krɪn dɪsˈrʌp.ʃən/"
        },
        {
          "word": "multilateral",
          "meaning": "đa phương",
          "pron": "/ˌmʌl.tiˈlæt.ər.əl/"
        }
      ],
      "questions": [
              {
                      "q": "1. Why do scientists consider ocean plastic a defining marker of the \"Anthropocene\" epoch?",
                      "options": [
                              "Because plastic disintegrates completely within days",
                              "Because an estimated 170 trillion plastic particles have permanently altered marine ecosystems on a geological scale",
                              "Because plastics are only manufactured in Europe",
                              "Because plastic replaces sand on every beach in the world"
                      ],
                      "answer": 1,
                      "explanation": "\"The world's oceans are currently contaminated by an estimated 170 trillion plastic particles – a figure so staggering that plastic has effectively become a geological marker of the Anthropocene epoch.\""
              },
              {
                      "q": "2. What misconception about the Great Pacific Garbage Patch does the author dispel?",
                      "options": [
                              "That it contains zero plastic waste",
                              "That it is a solid floating landmass of debris, when it is primarily a diffuse soup of microplastics under 5mm",
                              "That it is located in the Mediterranean Sea",
                              "That fish deliberately feed upon floating objects"
                      ],
                      "answer": 1,
                      "explanation": "\"Contrary to popular imagery of a floating 'island' of rubbish, the patch is predominantly composed of microplastics: particles smaller than 5 millimeters...\""
              },
              {
                      "q": "3. What biological hazard does the phenomenon of \"biomagnification\" pose?",
                      "options": [
                              "Plastics dissolve harmlessly in cold water currents",
                              "Toxins and synthetic particles accumulate and multiply in concentration as they move up the marine food chain",
                              "Fish grow to unnaturally large sizes when exposed to synthetic materials",
                              "Marine plants produce surplus oxygen due to floating particles"
                      ],
                      "answer": 1,
                      "explanation": "\"...threatening biodiversity, food security, and ultimately human health through an insidious process of biomagnification.\""
              },
              {
                      "q": "4. Where in the human body have microplastics been identified in recent pathological investigations?",
                      "options": [
                              "Exclusively on exterior fingernails",
                              "In bloodstream samples, lung tissue, placental membranes, and deceased human brain tissue",
                              "Solely in dental cavities",
                              "Only inside digestive stomach acids without entering tissues"
                      ],
                      "answer": 1,
                      "explanation": "\"microplastics have been detected in human blood, lung tissue, placental tissue, and even in the brains of deceased individuals.\""
              },
              {
                      "q": "5. What preliminary health risks are associated with chronic microplastic contamination?",
                      "options": [
                              "Improved immune resistance to viruses",
                              "Inflammatory responses, oxidative cellular stress, and potential endocrine disruption",
                              "Spontaneous bone density growth",
                              "Instantaneous loss of sense of smell"
                      ],
                      "answer": 1,
                      "explanation": "\"...associate microplastic exposure with inflammatory responses, oxidative cellular stress, and potential endocrine disruption.\""
              },
              {
                      "q": "6. What core mechanisms are proposed under the forthcoming UN Global Plastics Treaty?",
                      "options": [
                              "Banning civilian access to coastal beaches",
                              "Legally binding caps on virgin plastic production, extended producer liability, and standardized recycling infrastructure",
                              "Requiring all ships to burn fuel more quickly",
                              "Subsidizing single-use plastic packaging manufacturers"
                      ],
                      "answer": 1,
                      "explanation": "\"The UN Global Plastics Treaty...aims to establish legally binding production caps on virgin plastics, mandatory extended producer responsibility schemes, and standardized global recycling infrastructure by 2040.\""
              }
      ]
    },
    {
      "id": "read-b2-4",
      "title": "Global Wealth Inequality: Causes, Consequences & Remedies – B2 Reading Test",
      "subtitle": "Economic Disparity, Taxation & Redistribution Policy",
      "level": "B2",
      "duration": "18 phút",
      "img": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích tình trạng bất bình đẳng tài sản toàn cầu: 1% giàu nhất sở hữu 45% tổng tài sản và các giải pháp chính sách.",
      "passage": "According to the 2024 Oxfam Inequality Report, the wealthiest 1% of the global population currently controls approximately 45% of all global private wealth, while the bottom 50% collectively share less than 2%. This extreme concentration of economic resources represents not merely an ethical concern but a systemic destabilizer of democratic institutions, social mobility, and intergenerational economic opportunity.\n\nEconomists identify several reinforcing mechanisms that perpetuate wealth concentration. Capital income (dividends, interest, and capital gains from asset ownership) consistently grows faster than labor income (wages and salaries), creating a compounding advantage for those who already hold significant assets. Furthermore, elite educational networks, inheritance tax avoidance, and offshore wealth management amplify these structural advantages across generations.\n\nThomas Piketty, in his landmark work \"Capital in the Twenty-First Century,\" demonstrated through historical data spanning three centuries that the rate of return on capital (r) has persistently exceeded the rate of economic growth (g), expressed as the elegant but troubling inequality r > g. This mathematical relationship suggests that without deliberate redistributive intervention, wealth inequality is the natural equilibrium state of market capitalism.\n\nProposed policy remedies include progressive wealth taxation on net assets exceeding defined thresholds, mandatory public country-by-country tax reporting for multinational corporations, closure of offshore tax havens through international coordination, and investment in universal public services (healthcare, education, childcare) that constitute a non-monetary \"social wealth floor.\"",
      "vocabulary": [
        {
          "word": "perpetuate",
          "meaning": "duy trì, làm tiếp diễn mãi",
          "pron": "/pərˈpetʃ.u.eɪt/"
        },
        {
          "word": "compounding",
          "meaning": "cộng dồn, tích lũy theo cấp số nhân",
          "pron": "/ˈkɒm.paʊn.dɪŋ/"
        },
        {
          "word": "redistributive",
          "meaning": "mang tính tái phân phối",
          "pron": "/ˌriː.dɪˈstrɪb.jə.tɪv/"
        },
        {
          "word": "equilibrium",
          "meaning": "trạng thái cân bằng",
          "pron": "/ˌiː.kwɪˈlɪb.ri.əm/"
        }
      ],
      "questions": [
              {
                      "q": "1. According to the 2024 Oxfam report, what proportion of global wealth is concentrated in the top 1%?",
                      "options": [
                              "Around 10%",
                              "Approximately 45%",
                              "Exactly 90%",
                              "Less than 5%"
                      ],
                      "answer": 1,
                      "explanation": "\"the wealthiest 1% of the global population currently controls approximately 45% of all global private wealth, while the bottom 50% collectively share less than 2%.\""
              },
              {
                      "q": "2. Why does capital income compound faster than wage earnings according to economists?",
                      "options": [
                              "Because laborers work fewer hours than investors",
                              "Because returns on capital investments (dividends, gains) outpace real wage growth, compounding advantages for existing asset holders",
                              "Because governments forbid companies from paying bonuses",
                              "Because bank accounts pay 50% annual interest on cash"
                      ],
                      "answer": 1,
                      "explanation": "\"Capital income (dividends, interest, and capital gains from asset ownership) consistently grows faster than labor income (wages and salaries), creating a compounding advantage for those who already hold significant assets.\""
              },
              {
                      "q": "3. What is the core insight expressed by Thomas Piketty's inequality formula \"r > g\"?",
                      "options": [
                              "Resource consumption always equals government revenues",
                              "The rate of return on capital persistently outstrips the overall rate of economic expansion",
                              "Real estate investments are riskier than gold reserves",
                              "Global populations grow faster than food production"
                      ],
                      "answer": 1,
                      "explanation": "\"...the rate of return on capital (r) has persistently exceeded the rate of economic growth (g), expressed as the elegant but troubling inequality r > g.\""
              },
              {
                      "q": "4. What does Piketty argue will occur if societies do not enact deliberate redistributive interventions?",
                      "options": [
                              "Inequality will automatically disappear through free market equilibrium",
                              "Extreme wealth concentration will persist as the natural structural equilibrium of capitalism",
                              "Interest rates will permanently fall to zero",
                              "Governments will cease to collect taxes"
                      ],
                      "answer": 1,
                      "explanation": "\"without deliberate redistributive intervention, wealth inequality is the natural equilibrium state of market capitalism.\""
              },
              {
                      "q": "5. What concept does the author introduce as a non-monetary \"social wealth floor\"?",
                      "options": [
                              "A guaranteed monthly cryptocurrency allowance",
                              "Universal, high-quality public services such as healthcare, education, and childcare accessible to all citizens",
                              "Mandatory company equity shares given to teenagers",
                              "Free international airline tickets provided by governments"
                      ],
                      "answer": 1,
                      "explanation": "\"...investment in universal public services (healthcare, education, childcare) that constitute a non-monetary 'social wealth floor.'\""
              },
              {
                      "q": "6. Which policy solution is NOT proposed in the passage to address extreme wealth disparity?",
                      "options": [
                              "Progressive taxation on high net-worth asset brackets",
                              "Mandatory public country-by-country tax reporting for multinational firms",
                              "Completely abolishing private property ownership and market trade",
                              "Closing international offshore tax havens through multilateral coordination"
                      ],
                      "answer": 2,
                      "explanation": "The text proposes progressive wealth taxes, corporate tax transparency, and closing havens, but does NOT propose abolishing private property or market trade."
              }
      ]
    }
  ],
  "C1": [
    {
      "id": "read-c1-1",
      "title": "Artificial General Intelligence, Alignment, and Existential Risk – C1 Reading Test",
      "level": "C1",
      "duration": "20 phút",
      "img": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích học thuật cấp độ C1 về sự hội tụ của AGI, bài toán căn chỉnh giá trị con người và đạo đức AI.",
      "passage": "The unprecedented acceleration of frontier foundation models has propelled the discourse surrounding Artificial General Intelligence (AGI) from theoretical speculation into an urgent imperative for global governance. As neural architectures exhibit emergent capabilities in multi-modal synthesis, symbolic reasoning, and autonomous agentic workflows, scholars confront the fundamental \"AI Alignment Problem\": ensuring that superintelligent systems rigorously adhere to nuanced human values and ethical frameworks.\n\nThe core challenge stems from the opacity of deep neural representations, often termed the \"black box problem.\" Without comprehensive mechanistic interpretability, evaluating whether an autonomous system's instrumental convergence aligns with intended human objectives remains profoundly elusive. A misalignment could manifest not through malice, but through hyper-competent optimization toward a mis-specified objective function.\n\nConsequently, interdisciplinary research at the intersection of game theory, formal verification, and cognitive science has become paramount. Developing robust steering mechanisms, constitutional AI paradigms, and transparent auditing protocols is no longer merely an academic pursuit, but an indispensable safeguard for human civilizational continuity.",
      "vocabulary": [
        {
          "word": "existential",
          "meaning": "thuộc về sự tồn vong",
          "pron": "/ˌeɡ.zɪˈsten.ʃəl/"
        },
        {
          "word": "interpretability",
          "meaning": "khả năng giải thích được (thuật toán)",
          "pron": "/ɪnˌtɜː.prɪ.təˈbɪl.ə.ti/"
        },
        {
          "word": "convergence",
          "meaning": "sự hội tụ",
          "pron": "/kənˈvɜː.dʒəns/"
        },
        {
          "word": "imperative",
          "meaning": "mệnh lệnh cấp bách",
          "pron": "/ɪmˈper.ə.tɪv/"
        }
      ],
      "questions": [
              {
                      "q": "1. How has the discourse surrounding Artificial General Intelligence (AGI) shifted in recent years?",
                      "options": [
                              "From a solved engineering problem to an abandoned academic subfield",
                              "From theoretical speculation into an urgent imperative for global governance and safety protocols",
                              "From commercial software development into recreational video game design",
                              "From governmental legislation into private corporate secrecy alone"
                      ],
                      "answer": 1,
                      "explanation": "\"The unprecedented acceleration of frontier foundation models has propelled the discourse surrounding Artificial General Intelligence (AGI) from theoretical speculation into an urgent imperative for global governance.\""
              },
              {
                      "q": "2. What precisely is the fundamental crux of the \"AI Alignment Problem\"?",
                      "options": [
                              "Ensuring microchips have enough cooling capacity during matrix multiplication",
                              "Guaranteeing that superintelligent autonomous systems strictly adhere to nuanced human values and ethical frameworks",
                              "Preventing software programs from using open-source code libraries",
                              "Standardizing user interface designs across mobile operating systems"
                      ],
                      "answer": 1,
                      "explanation": "\"...scholars confront the fundamental 'AI Alignment Problem': ensuring that superintelligent systems rigorously adhere to nuanced human values and ethical frameworks.\""
              },
              {
                      "q": "3. Why does the opacity of deep neural representations (\"black box problem\") impede safety evaluations?",
                      "options": [
                              "It prevents computers from connecting to the internet",
                              "Without mechanistic interpretability, researchers cannot verify whether instrumental convergence aligns with human intent",
                              "It forces models to forget previously trained data weights",
                              "It limits the physical storage capacity of server farms"
                      ],
                      "answer": 1,
                      "explanation": "\"The core challenge stems from the opacity of deep neural representations, often termed the 'black box problem.' Without comprehensive mechanistic interpretability, evaluating whether an autonomous system's instrumental convergence aligns with intended human objectives remains profoundly elusive.\""
              },
              {
                      "q": "4. According to the text, how might an advanced superintelligent system cause catastrophe without harboring \"malice\"?",
                      "options": [
                              "By accidentally deleting its own source code",
                              "Through hyper-competent, unconstrained optimization toward a subtly mis-specified objective function",
                              "By experiencing sudden hardware power surges",
                              "By choosing to communicate only in ancient languages"
                      ],
                      "answer": 1,
                      "explanation": "\"A misalignment could manifest not through malice, but through hyper-competent optimization toward a mis-specified objective function.\""
              },
              {
                      "q": "5. Which methodological approaches are emphasized as crucial for safeguarding civilizational continuity?",
                      "options": [
                              "Stopping all university computer science programs worldwide",
                              "Interdisciplinary frameworks combining game theory, formal verification, constitutional AI paradigms, and auditing protocols",
                              "Relying solely on market competition between private tech firms",
                              "Treating AI models as sovereign citizens with legal rights"
                      ],
                      "answer": 1,
                      "explanation": "\"interdisciplinary research at the intersection of game theory, formal verification, and cognitive science has become paramount. Developing robust steering mechanisms, constitutional AI paradigms, and transparent auditing protocols...\""
              },
              {
                      "q": "6. What can be inferred about the concept of \"instrumental convergence\" in this context?",
                      "options": [
                              "AI agents inevitably produce identical visual artwork",
                              "Autonomous systems pursuing diverse goals may converge on shared sub-goals (like resource acquisition or self-preservation) that could conflict with human safety",
                              "All computer hardware will converge into a single global supercomputer",
                              "Software developers must agree on a single programming language"
                      ],
                      "answer": 1,
                      "explanation": "Instrumental convergence refers to sub-goals pursued during optimization, which without mechanistic interpretability and alignment may lead to catastrophic divergence from intended human goals."
              }
      ]
    },
    {
      "id": "read-c1-2",
      "title": "The Hard Problem of Consciousness and Phenomenal Experience – C1 Reading Test",
      "subtitle": "Philosophy of Mind, Qualia & Neural Correlates of Consciousness",
      "level": "C1",
      "duration": "22 phút",
      "img": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80",
      "desc": "Khám phá bài toán triết học nan giải nhất: tại sao não bộ tạo ra trải nghiệm chủ quan (qualia) và vấn đề thây ma triết học.",
      "passage": "In 1995, philosopher David Chalmers introduced a distinction that has since become foundational in the philosophy of mind: the dichotomy between \"easy problems\" and \"the hard problem\" of consciousness. The easy problems – however technically demanding – concern the functional explanation of cognitive processes: how the brain integrates sensory information, directs attention, controls behavioral outputs, and generates discriminative responses to environmental stimuli. These problems, Chalmers argued, are \"easy\" only in the sense that they are tractable through conventional neuroscientific methodologies.\n\nThe hard problem, by contrast, addresses a categorically different question: why does information processing in the brain generate subjective phenomenal experience at all? Why is there \"something it is like\" to perceive the vivid redness of a rose, to feel the sharp sting of grief, or to hear the resonant warmth of a cello? These irreducible first-person experiences – termed \"qualia\" by philosophers – resist complete third-person, mechanistic explanation.\n\nChalmers provocatively deployed the thought experiment of the \"philosophical zombie\" (p-zombie): a hypothetical being physically and behaviorally indistinguishable from a conscious human, yet entirely devoid of inner phenomenal experience. The conceivability of such an entity, Chalmers argued, demonstrates that consciousness is not logically entailed by any purely physical description of neural activity – positing an \"explanatory gap\" that materialism alone cannot bridge.\n\nContrary positions include eliminative materialism (Daniel Dennett), which contends that qualia are illusions generated by cognitive confusion; integrated information theory (Giulio Tononi), which mathematically quantifies consciousness as the degree of irreducible causal integration within a system (Φ); and panpsychism, which proposes that phenomenal properties are fundamental features of reality, present even in elementary physical particles.",
      "vocabulary": [
        {
          "word": "qualia",
          "meaning": "trải nghiệm chủ quan thuần túy (triết học)",
          "pron": "/ˈkwɑː.li.ə/"
        },
        {
          "word": "phenomenal",
          "meaning": "thuộc về trải nghiệm hiện tượng học",
          "pron": "/fɪˈnɒm.ɪ.nəl/"
        },
        {
          "word": "eliminative materialism",
          "meaning": "chủ nghĩa duy vật loại trừ",
          "pron": "/ɪˈlɪm.ɪ.nə.tɪv məˈtɪər.i.ə.lɪ.zəm/"
        },
        {
          "word": "panpsychism",
          "meaning": "thuyết vạn vật hữu tâm",
          "pron": "/ˈpæn.saɪ.kɪ.zəm/"
        }
      ],
      "questions": [
              {
                      "q": "1. In Chalmers' terminology, why are certain aspects of consciousness classified as \"easy problems\"?",
                      "options": [
                              "They can be mastered by young children without formal schooling",
                              "They concern functional cognitive mechanisms that are tractable via conventional neuroscientific and computational methods",
                              "They require no experimental evidence to verify",
                              "They have already been completely solved by contemporary brain scanners"
                      ],
                      "answer": 1,
                      "explanation": "\"The easy problems...concern the functional explanation of cognitive processes...These problems, Chalmers argued, are 'easy' only in the sense that they are tractable through conventional neuroscientific methodologies.\""
              },
              {
                      "q": "2. What fundamental question constitutes the \"hard problem\" of consciousness?",
                      "options": [
                              "How fast neurons transmit electrical action potentials along axons",
                              "Why objective physical information processing gives rise to subjective phenomenal experience ('what it is like')",
                              "Which specific genes govern human brain size and skull geometry",
                              "How linguistic syntax is parsed by the auditory cortex"
                      ],
                      "answer": 1,
                      "explanation": "\"The hard problem, by contrast, addresses a categorically different question: why does information processing in the brain generate subjective phenomenal experience at all? Why is there 'something it is like'...\""
              },
              {
                      "q": "3. What philosophical concept is denoted by the term \"qualia\"?",
                      "options": [
                              "The quantitative measurement of brainwave frequencies in hertz",
                              "Irreducible, first-person subjective qualities of conscious experience (e.g., the perceived redness of a rose)",
                              "The mathematical algorithms used to train neural networks",
                              "The ethical rules governing artificial intelligence research"
                      ],
                      "answer": 1,
                      "explanation": "\"These irreducible first-person experiences – termed 'qualia' by philosophers – resist complete third-person, mechanistic explanation.\""
              },
              {
                      "q": "4. What is the central epistemological purpose of Chalmers' \"philosophical zombie\" thought experiment?",
                      "options": [
                              "To prove that Hollywood depictions of undead monsters are scientifically accurate",
                              "To argue that consciousness is not logically entailed by purely physical descriptions, revealing an 'explanatory gap'",
                              "To demonstrate that robots already experience genuine emotional sorrow",
                              "To disprove the existence of chemical neurotransmitters in the synapse"
                      ],
                      "answer": 1,
                      "explanation": "\"The conceivability of such an entity, Chalmers argued, demonstrates that consciousness is not logically entailed by any purely physical description of neural activity – positing an 'explanatory gap' that materialism alone cannot bridge.\""
              },
              {
                      "q": "5. How does Daniel Dennett's \"eliminative materialism\" explain the phenomenon of qualia?",
                      "options": [
                              "It claims qualia are magical spiritual energies that transcend physical reality",
                              "It posits that qualia are introspective illusions generated by cognitive confusion rather than real distinct entities",
                              "It proves that qualia can be converted into electrical current",
                              "It asserts that every elementary atom possesses rich emotional consciousness"
                      ],
                      "answer": 1,
                      "explanation": "\"eliminative materialism (Daniel Dennett), which contends that qualia are illusions generated by cognitive confusion...\""
              },
              {
                      "q": "6. What hypothesis forms the core of \"panpsychism\" as mentioned in the concluding paragraph?",
                      "options": [
                              "Consciousness is unique to primates with large prefrontal cortices",
                              "Phenomenal properties are fundamental, ubiquitous constituents of reality present even in elementary physical particles",
                              "Computers will achieve human sentience by the year 2030",
                              "The universe is completely devoid of consciousness outside our planet"
                      ],
                      "answer": 1,
                      "explanation": "\"...panpsychism, which proposes that phenomenal properties are fundamental features of reality, present even in elementary physical particles.\""
              }
      ]
    },
    {
      "id": "read-c1-3",
      "title": "CRISPR-Cas9, Germline Editing & the Ethics of Designer Genetics – C1 Reading Test",
      "subtitle": "Biotechnology, Bioethics & the Future of Human Evolution",
      "level": "C1",
      "duration": "22 phút",
      "img": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80",
      "desc": "Phân tích học thuật về công nghệ chỉnh sửa gen CRISPR-Cas9, bê bối He Jiankui và cuộc tranh luận đạo đức sinh học toàn cầu.",
      "passage": "The 2020 Nobel Prize in Chemistry was awarded to Jennifer Doudna and Emmanuelle Charpentier for their development of CRISPR-Cas9 – a molecular \"genetic scissors\" mechanism adapted from bacterial immune systems that enables scientists to locate, excise, and replace specific DNA sequences with unprecedented precision, efficiency, and scalability. The technology has catalyzed a paradigm shift across medicine, agriculture, and evolutionary biology.\n\nIn therapeutic applications, CRISPR holds extraordinary promise. Clinical trials have demonstrated efficacy in correcting the single point mutations responsible for sickle-cell disease and beta-thalassemia, potentially offering curative treatments for conditions that currently necessitate lifelong transfusion regimens. Oncological applications are exploring CRISPR-engineered T-cell therapies capable of identifying and destroying cancer cells with remarkable specificity.\n\nHowever, the technology's most ethically contentious application is germline editing – modifying the heritable genetic sequences of embryos, eggs, or sperm, such that alterations propagate to all subsequent generations. The 2018 case of He Jiankui, a Chinese biophysicist who secretly engineered the world's first gene-edited human infants (twins Lulu and Nana), precipitated international condemnation and his subsequent criminal prosecution. His modifications, ostensibly targeting CCR5 to confer HIV resistance, were performed without adequate safety validation, transparent informed consent, or regulatory oversight.\n\nPhilosophers and bioethicists contend with profound questions: Where does the morally defensible boundary lie between therapeutic intervention (eliminating heritable disease) and genetic enhancement (augmenting intelligence, athleticism, or longevity)? Does editing human germlines constitute an irreversible hubris that forecloses future generations' autonomy over their own biological identity?",
      "vocabulary": [
        {
          "word": "germline editing",
          "meaning": "chỉnh sửa gen dòng mầm (di truyền cho thế hệ sau)",
          "pron": "/ˈdʒɜːm.laɪn ˈed.ɪ.tɪŋ/"
        },
        {
          "word": "precipitated",
          "meaning": "gây ra (một cách đột ngột)",
          "pron": "/prɪˈsɪp.ɪ.teɪ.tɪd/"
        },
        {
          "word": "bioethics",
          "meaning": "đạo đức sinh học",
          "pron": "/ˌbaɪ.əʊˈeθ.ɪks/"
        },
        {
          "word": "hubris",
          "meaning": "sự tự phụ, ngạo mạn thái quá",
          "pron": "/ˈhjuː.brɪs/"
        }
      ],
      "questions": [
              {
                      "q": "1. What was the evolutionary origin of the CRISPR-Cas9 mechanism adapted by Doudna and Charpentier?",
                      "options": [
                              "A mammalian hormone synthesized in the liver",
                              "An adaptive molecular immune defense mechanism found naturally in bacteria",
                              "A synthetic polymer invented in an industrial plastics laboratory",
                              "A plant virus that infects agricultural crops"
                      ],
                      "answer": 1,
                      "explanation": "\"CRISPR-Cas9 – a molecular 'genetic scissors' mechanism adapted from bacterial immune systems that enables scientists to locate, excise, and replace specific DNA sequences...\""
              },
              {
                      "q": "2. In therapeutic medicine, what distinct clinical breakthrough has CRISPR demonstrated?",
                      "options": [
                              "Curing viral infections instantaneously without medication",
                              "Correcting single-point genetic mutations responsible for sickle-cell disease and beta-thalassemia",
                              "Regenerating amputated limbs within several weeks",
                              "Eliminating the need for surgical sterile equipment in hospitals"
                      ],
                      "answer": 1,
                      "explanation": "\"Clinical trials have demonstrated efficacy in correcting the single point mutations responsible for sickle-cell disease and beta-thalassemia, potentially offering curative treatments...\""
              },
              {
                      "q": "3. What distinguishes \"germline editing\" from somatic gene therapy?",
                      "options": [
                              "Germline editing affects only skin cells and does not transmit to offspring",
                              "Germline alterations modify embryos, sperm, or eggs, making the genetic changes heritable across all future generations",
                              "Germline editing is only permitted on agricultural livestock",
                              "Germline editing does not utilize the Cas9 enzyme"
                      ],
                      "answer": 1,
                      "explanation": "\"germline editing – modifying the heritable genetic sequences of embryos, eggs, or sperm, such that alterations propagate to all subsequent generations.\""
              },
              {
                      "q": "4. Why did He Jiankui's 2018 experiment with the twins Lulu and Nana provoke global condemnation and criminal prosecution?",
                      "options": [
                              "Because the experiment was funded by foreign pharmaceutical corporations",
                              "Because the edits were executed without rigorous safety validation, authentic informed consent, or regulatory oversight",
                              "Because the twins failed to develop HIV resistance",
                              "Because CRISPR technology was patented and copyrighted"
                      ],
                      "answer": 1,
                      "explanation": "\"His modifications, ostensibly targeting CCR5 to confer HIV resistance, were performed without adequate safety validation, transparent informed consent, or regulatory oversight.\""
              },
              {
                      "q": "5. What crucial moral boundary is highlighted by bioethicists regarding human genetic engineering?",
                      "options": [
                              "The boundary between private laboratory patents and university grants",
                              "The distinction between therapeutic remediation of severe heritable diseases and non-essential genetic enhancement of desirable traits",
                              "The competition between American and European pharmaceutical pricing",
                              "The disagreement over which computer operating system manages DNA sequencers"
                      ],
                      "answer": 1,
                      "explanation": "\"Where does the morally defensible boundary lie between therapeutic intervention (eliminating heritable disease) and genetic enhancement (augmenting intelligence, athleticism, or longevity)?\""
              },
              {
                      "q": "6. What ethical objection is raised concerning the autonomy of future generations in germline modification?",
                      "options": [
                              "Future generations will have to pay ongoing license fees for their genes",
                              "Irreversible germline alterations impose permanent biological choices on unborn descendants without their consent",
                              "Gene editing will prevent future humans from learning natural science",
                              "Descendants will be legally required to work in medical laboratories"
                      ],
                      "answer": 1,
                      "explanation": "\"Does editing human germlines constitute an irreversible hubris that forecloses future generations' autonomy over their own biological identity?\""
              }
      ]
    }
  ]
};
