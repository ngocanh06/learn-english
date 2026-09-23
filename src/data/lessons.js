import React from 'react';
import { XCircle } from 'lucide-react';
import InteractiveRuleItem from '../components/InteractiveRuleItem';
import { lessonsGroup1 } from './lessonsGroup1';
import { lessonsGroup2 } from './lessonsGroup2';
import { lessonsGroup3 } from './lessonsGroup3';
import { lessonsGroup4 } from './lessonsGroup4';
import { lessonsGroup5, lessonsGroup6 } from './lessonsGroup5and6';
import { lessonsGroup7to12 } from './lessonsGroup7to12';
import { GRAMMAR_PAGE1_CATALOG, GRAMMAR_PAGE2_CATALOG, buildFallbackLesson } from './grammarMaster85';
import { getExercisesForLesson } from './grammarExercisesMaster';

export const lessonsData = [
  {
  id: '1',
  category: 'Mạo từ',
  title: '1. Articles',
  content: (
    <div className="space-y-8 text-sm leading-relaxed text-slate-700">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Mạo từ A, An, The</span>
      </div>

      {/* 1.1. Định nghĩa */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">1.1. Định nghĩa</h3>
        <ul className="space-y-3">
          <li>• <strong>A</strong> là mạo từ không xác định hay bất định (Indefinite Article).</li>
          <li>• <strong>A</strong> được đổi thành <strong>"an"</strong> khi đứng trước một danh từ bắt đầu bằng một nguyên âm (u, e, o, a, i).</li>
          <li>• <strong>The</strong> là mạo từ xác định (Definite Article).</li>
          <li>• <strong>The</strong> đọc thành <strong>/ðiː/</strong> khi đứng trước nguyên âm.</li>
        </ul>
      </section>

      {/* 1.2. Cách dùng */}
      <section className="bg-white dark:bg-slate-900 p-6 md:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-slate-800 pb-3">
          <h3 className="text-xl font-black text-indigo-700 dark:text-indigo-400">1.2. Cách dùng chi tiết & Quy tắc ứng dụng</h3>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            <i className="fa-solid fa-hand-pointer text-amber-500 animate-pulse" />
            <span>Bấm vào từng quy tắc để xem ví dụ & phát âm</span>
          </span>
        </div>

        <div className="space-y-6">
          {/* A/An */}
          <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-slate-800/80 dark:to-slate-850 p-5 md:p-6 rounded-3xl border border-blue-200/90 dark:border-slate-700 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-blue-200 dark:border-slate-700 pb-2.5">
              <h4 className="font-black text-blue-800 dark:text-blue-300 uppercase text-xs md:text-sm tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>A / AN: Dùng khi nói chung chung, chưa xác định</span>
              </h4>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 font-mono">9 quy tắc</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <InteractiveRuleItem
                num={1}
                rule="Danh từ số ít đếm được (nhắc tới lần đầu, chưa xác định)."
                example="I bought a new book yesterday."
                translation="Tôi đã mua một cuốn sách mới vào ngày hôm qua."
                explanation="'Book' là danh từ số ít đếm được. Khi nhắc đến lần đầu tiên mang nghĩa 'một cuốn sách chưa xác định', ta bắt buộc phải dùng mạo từ 'a'."
                defaultOpen={true}
              />
              <InteractiveRuleItem
                num={2}
                rule="Ý nghĩa 'một' (người, vật, một cái bất kỳ trong số nhiều thứ)."
                example="Can you give me an apple?"
                translation="Bạn có thể cho tôi một quả táo bất kỳ được không?"
                explanation="Mang ý nghĩa là 'một quả táo bất kỳ'. Dùng 'an' vì từ apple bắt đầu bằng nguyên âm phát âm /æ/."
              />
              <InteractiveRuleItem
                num={3}
                rule="Nghề nghiệp, thương mại, tôn giáo, giai cấp của một người."
                example="She is an engineer, and her husband is a doctor."
                translation="Cô ấy là một kỹ sư, còn chồng cô ấy là một bác sĩ."
                explanation="Trong tiếng Anh, khi nói về nghề nghiệp của ai đó, bắt buộc phải dùng A hoặc An trước danh từ chỉ nghề nghiệp số ít."
              />
              <InteractiveRuleItem
                num={4}
                rule="Lần đầu nhắc tới sự vật trong văn cảnh."
                example="There is a cat in the garden. The cat is playing with a ball."
                translation="Có một con mèo trong vườn. Con mèo đó đang chơi với một quả bóng."
                explanation="Lần đầu nhắc tới con mèo ta dùng 'a cat'. Khi sang câu thứ hai, vì con mèo đã được nhắc đến nên người nghe đã biết, chuyển sang dùng 'the cat'."
              />
              <InteractiveRuleItem
                num={5}
                rule="Trong các thành ngữ chỉ một sự đo lường, tần suất hoặc tốc độ."
                example="I exercise three times a week and run 60 miles an hour."
                translation="Tôi tập thể dục ba lần một tuần và lái xe 60 dặm một giờ."
                explanation="Cụm 'a week' = mỗi tuần (per week), 'an hour' = mỗi giờ (per hour). Chữ 'hour' có âm H câm nên dùng 'an'."
              />
              <InteractiveRuleItem
                num={6}
                rule="Trước một danh từ riêng khi đề cập đến nhân vật ấy như một người lạ."
                example="A Mr. Smith left this message for you."
                translation="Có một người tên là Smith nào đó đã để lại tin nhắn này cho bạn."
                explanation="Dùng 'A Mr. Smith' để nhấn mạnh rằng người nói không hề quen biết nhân vật này, chỉ biết họ tên là Smith."
              />
              <InteractiveRuleItem
                num={7}
                rule="Với ý nghĩa cùng, giống nhau (same) trong các câu tục ngữ, thành ngữ."
                example="Birds of a feather flock together."
                translation="Những chú chim cùng màu lông thường bay cùng nhau (Ngưu tầm ngưu, mã tầm mã)."
                explanation="Ở đây 'a feather' mang ý nghĩa là 'cùng một loại lông' (the same feather)."
              />
              <InteractiveRuleItem
                num={8}
                rule="Trước một ngữ đồng vị (appositive) giải thích địa vị hoặc vai trò."
                example="Nguyen Du, a great Vietnamese poet, wrote Truyen Kieu."
                translation="Nguyễn Du, một đại thi hào của Việt Nam, đã sáng tác Truyện Kiều."
                explanation="Cụm 'a great Vietnamese poet' đóng vai trò là ngữ đồng vị đứng sau tên riêng để giải thích thân thế của tác giả."
              />
              <InteractiveRuleItem
                num={9}
                rule="Trong câu cảm thán bắt đầu bằng 'What' theo sau là danh từ số ít đếm được."
                example="What a beautiful dress! What an amazing story!"
                translation="Thật là một chiếc váy đẹp! Thật là một câu chuyện thú vị!"
                explanation="Công thức câu cảm thán kinh điển: What + a/an + Tính từ + Danh từ số ít đếm được!"
              />
            </div>
          </div>

          {/* The */}
          <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/70 dark:from-slate-800/80 dark:to-slate-850 p-5 md:p-6 rounded-3xl border border-indigo-200/90 dark:border-slate-700 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-indigo-200 dark:border-slate-700 pb-2.5">
              <h4 className="font-black text-indigo-800 dark:text-indigo-300 uppercase text-xs md:text-sm tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>THE: Dùng khi người nghe biết rõ sự vật hoặc vật là duy nhất</span>
              </h4>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 font-mono">10 quy tắc</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <InteractiveRuleItem
                num={1}
                rule="Đứng trước một danh từ chỉ người hay vật độc nhất vô nhị trên thế giới."
                example="The sun rises in the east and the moon shines at night."
                translation="Mặt trời mọc ở hướng đông và mặt trăng tỏa sáng vào ban đêm."
                explanation="Mặt trời (the sun), mặt trăng (the moon), trái đất (the earth) là những vật thể duy nhất trong tự nhiên, luôn có 'The'."
              />
              <InteractiveRuleItem
                num={2}
                rule="Người hay vật mà cả người nói và người nghe vừa đề cập đến."
                example="I saw a movie yesterday. The movie was absolutely fantastic."
                translation="Hôm qua tôi xem một bộ phim. Bộ phim đó thực sự quá tuyệt vời."
                explanation="Bộ phim đã được giới thiệu ở câu thứ nhất, nên sang câu thứ hai dùng 'The movie' vì người nghe đã biết đang nói về bộ phim nào."
              />
              <InteractiveRuleItem
                num={3}
                rule="Trước tên quốc gia dạng số nhiều hoặc quốc gia liên bang (liên kết nhiều đơn vị)."
                example="She has worked in the USA, the UK, and the Philippines."
                translation="Cô ấy từng làm việc tại Mỹ, Anh quốc và Philippines."
                explanation="Các quốc gia có từ 'United' (The USA, The UK) hoặc quần đảo số nhiều (The Philippines, The Netherlands) luôn có 'The'."
              />
              <InteractiveRuleItem
                num={4}
                rule="Trước địa danh công cộng mà danh từ chung đã được hiểu ngầm trong khu vực."
                example="Let's go to the cinema or the post office this afternoon."
                translation="Chiều nay chúng mình cùng đến rạp chiếu phim hoặc bưu điện nhé."
                explanation="Rạp chiếu phim (the cinema), rạp hát (the theatre), ngân hàng (the bank) được ngầm hiểu là địa điểm quen thuộc của địa phương."
              />
              <InteractiveRuleItem
                num={5}
                rule="Trước quần đảo, sông, dãy núi, đại dương, sa mạc và nhạc cụ."
                example="The Amazon is a huge river. John can play the guitar and the piano."
                translation="Sông Amazon là một dòng sông khổng lồ. John biết chơi đàn guitar và đàn piano."
                explanation="Tên sông (the Amazon), dãy núi (the Himalayas) và nhạc cụ (play the guitar, play the piano) bắt buộc dùng 'The'."
              />
              <InteractiveRuleItem
                num={6}
                rule="Trước một danh từ số ít đếm được dùng với ý nghĩa tổng quát để chỉ một chủng loại."
                example="The blue whale is the largest animal on earth."
                translation="Cá voi xanh là loài động vật lớn nhất trên trái đất."
                explanation="Dùng 'The blue whale' ở dạng số ít nhưng mang ý nghĩa đại diện cho toàn bộ chủng loài cá voi xanh."
              />
              <InteractiveRuleItem
                num={7}
                rule="Trước danh từ chung có danh từ riêng theo sau bổ nghĩa."
                example="The city of Paris is famous for the Eiffel Tower."
                translation="Thành phố Paris nổi tiếng với tháp Eiffel."
                explanation="Cấu trúc 'The + danh từ chung + of + tên riêng' (The city of Paris, The Republic of Vietnam) luôn có 'The'."
              />
              <InteractiveRuleItem
                num={8}
                rule="Trước một tước hiệu gọi theo số thứ tự của các bậc vua chúa, triều đại."
                example="King Henry the Eighth was a powerful ruler."
                translation="Vua Henry Đệ Bát là một vị vua quyền lực."
                explanation="Số thứ tự danh xưng hoàng gia bắt buộc phát âm có 'The' (the First, the Second, the Eighth)."
              />
              <InteractiveRuleItem
                num={9}
                rule="Trong so sánh nhất (Superlative) và so sánh kép (Double Comparative)."
                example="She is the tallest in class. The more you learn, the better you become."
                translation="Cô ấy cao nhất lớp. Bạn càng học nhiều thì bạn càng giỏi hơn."
                explanation="So sánh nhất: 'the tallest', 'the most beautiful'. So sánh kép: 'The + comparative..., the + comparative...'."
              />
              <InteractiveRuleItem
                num={10}
                rule="Trước danh từ được một ngữ giới từ hoặc mệnh đề quan hệ xác định cụ thể."
                example="The girl in the red dress is my younger sister."
                translation="Cô gái mặc chiếc váy màu đỏ là em gái của tôi."
                explanation="Cụm giới từ 'in the red dress' đã chỉ rõ chính xác là cô gái nào, do đó cô gái trở thành đối tượng xác định mang 'The'."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 1.3. Những trường hợp không dùng */}
      <section className="bg-red-50/80 dark:bg-red-950/20 p-6 md:p-7 rounded-3xl border border-red-200/80 dark:border-red-900/50 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-200 dark:border-red-900/60 pb-3">
          <h3 className="text-xl font-black text-red-700 dark:text-red-400 flex items-center gap-2">
            <XCircle size={22} className="text-red-600 dark:text-red-400" />
            <span>1.3. Những trường hợp KHÔNG DÙNG mạo từ (Zero Article)</span>
          </h3>
          <span className="text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
            Bấm vào xem ví dụ & giải thích
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Không dùng A/An */}
          <div className="space-y-2.5">
            <h4 className="font-black text-red-800 dark:text-red-300 uppercase text-xs md:text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Không dùng A / An:</span>
            </h4>
            <div className="space-y-2">
              <InteractiveRuleItem
                rule="Trước các danh từ chỉ bữa ăn thông thường."
                example="We have lunch at 12 PM and have dinner at 7 PM."
                translation="Chúng tôi ăn trưa lúc 12 giờ trưa và ăn tối lúc 7 giờ tối."
                explanation="Không dùng mạo từ trước bữa ăn (have lunch, have breakfast). Chỉ dùng khi có tính từ khen ngợi như 'have a delicious lunch'."
              />
              <InteractiveRuleItem
                rule="Trước danh từ không đếm được (uncountable nouns) nói chung."
                example="Water is essential for life. Milk is good for health."
                translation="Nước rất cần thiết cho sự sống. Sữa rất tốt cho sức khỏe."
                explanation="Danh từ không đếm được (water, milk, advice, money) mang nghĩa tổng quát không dùng A/An."
              />
              <InteractiveRuleItem
                rule="Trước danh từ chỉ nơi công cộng khi diễn tả hành động đúng mục đích."
                example="He goes to school by bus every morning."
                translation="Cậu ấy đến trường bằng xe buýt vào mỗi buổi sáng."
                explanation="Đi học (go to school), đi làm (go to work), đi ngủ (go to bed) không dùng mạo từ."
              />
              <InteractiveRuleItem
                rule="Trước danh từ chỉ ngày, tháng, mùa và sau từ 'turn'."
                example="I will see you on Monday. Leaves turn yellow in autumn."
                translation="Tôi sẽ gặp bạn vào thứ Hai. Lá cây chuyển sang màu vàng vào mùa thu."
                explanation="Tên thứ trong tuần (Monday), mùa (autumn), và sau động từ 'turn' không dùng mạo từ."
              />
            </div>
          </div>

          {/* Không dùng The */}
          <div className="space-y-2.5">
            <h4 className="font-black text-red-800 dark:text-red-300 uppercase text-xs md:text-sm tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Không dùng The:</span>
            </h4>
            <div className="space-y-2">
              <InteractiveRuleItem
                rule="Trước danh từ trừu tượng dùng theo nghĩa tổng quát."
                example="Life is hard, but love and peace make it beautiful."
                translation="Cuộc sống đầy gian khó, nhưng tình yêu và hòa bình làm cho nó tươi đẹp."
                explanation="Các khái niệm trừu tượng chung (Life, Love, Peace, Time) không có 'The'."
              />
              <InteractiveRuleItem
                rule="Trước danh từ số nhiều dùng theo nghĩa tổng quát."
                example="Books are friends, and dogs are faithful companions."
                translation="Sách là những người bạn, và chó là những người bạn đồng hành trung thành."
                explanation="Nói về loài chó hay sách vở nói chung không dùng 'The' (không dùng The books / The dogs)."
              />
              <InteractiveRuleItem
                rule="Trước hầu hết tên riêng của người, thành phố, quốc gia thông thường."
                example="John lives in Tokyo, Japan."
                translation="John sống ở Tokyo, Nhật Bản."
                explanation="Tên người (John), tên thành phố (Tokyo), tên quốc gia đơn lẻ (Japan, Vietnam) không có 'The'."
              />
              <InteractiveRuleItem
                rule="Trước ngôn ngữ và các môn thể thao."
                example="She can speak English fluently and plays football."
                translation="Cô ấy có thể nói tiếng Anh lưu loát và chơi bóng đá."
                explanation="Không dùng mạo từ trước tên ngôn ngữ (English, Vietnamese) hay môn thể thao (football, tennis)."
              />
            </div>
          </div>
        </div>

        {/* Ví dụ đặc biệt kinh điển */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800/60 text-xs space-y-1.5">
          <p className="font-black text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <i className="fa-solid fa-star text-amber-500" />
            <span>Bẫy thi cử kinh điển cần đặc biệt ghi nhớ:</span>
          </p>
          <div className="space-y-1 pl-5 list-disc text-slate-700 dark:text-slate-300">
            <p>
              • <strong>He goes to school in the morning:</strong> Đi học với tư cách là học sinh (đúng mục đích chính ➔ Không dùng The).
            </p>
            <p>
              • <strong>He goes to the school to meet his old teacher:</strong> Đến trường để gặp thầy giáo cũ (không phải để học ➔ Có dùng The).
            </p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    {
      q: "He is ____ accountant at a multinational corporation.",
      options: ["a", "an", "the", "X"],
      correct: 1,
      explain: "Trước danh từ chỉ nghề nghiệp số ít đếm được ('accountant'), ta bắt buộc phải dùng mạo từ bất định (a/an). Vì từ 'accountant' bắt đầu bằng nguyên âm /ə/, ta chọn 'an'."
    },
    {
      q: "____ Nile is the longest river in the world.",
      options: ["A", "An", "The", "X"],
      correct: 2,
      explain: "Quy tắc mạo từ xác định: Trước tên các con sông, dãy núi, đại dương (sông Nile, sông Amazon, đại dương Thái Bình Dương...), ta luôn luôn phải dùng 'The'."
    },
    {
      q: "We usually have ____ lunch together at noon.",
      options: ["a", "an", "the", "X"],
      correct: 3,
      explain: "Quy tắc Zero Article: Trước các danh từ chỉ bữa ăn thông thường trong ngày (have breakfast, have lunch, have dinner), ta tuyệt đối không dùng mạo từ (chọn X)."
    },
    {
      q: "What ____ beautiful house you have!",
      options: ["a", "an", "the", "X"],
      correct: 0,
      explain: "Cấu trúc câu cảm thán kinh điển: What + a/an + Tính từ + Danh từ số ít đếm được! Vì 'beautiful house' bắt đầu bằng phụ âm /b/, ta chọn 'a'."
    },
    {
      q: "____ butter is made from milk.",
      options: ["A", "An", "The", "X"],
      correct: 3,
      explain: "'Butter' (bơ) là danh từ không đếm được dùng mang nghĩa tổng quát chung ('Bơ được làm từ sữa'), do đó theo quy tắc ta không dùng mạo từ (chọn X)."
    },
    {
      q: "It took us ____ hour to finish the English grammar test.",
      options: ["a", "an", "the", "X"],
      correct: 1,
      explain: "Bẫy âm câm: Từ 'hour' bắt đầu bằng chữ 'h' nhưng 'h' là âm câm (phát âm là /ˈaʊ.ər/). Vì âm bắt đầu là một nguyên âm, ta bắt buộc dùng 'an'."
    },
    {
      q: "She wants to study at ____ university in the UK.",
      options: ["a", "an", "the", "X"],
      correct: 0,
      explain: "Bẫy bán phụ âm: Từ 'university' bắt đầu bằng chữ cái 'u', nhưng phiên âm quốc tế là /ˌjuː.nɪˈvɜː.sə.ti/ bắt đầu bằng phụ âm /j/. Vì vậy ta dùng 'a' chứ không dùng 'an'."
    },
    {
      q: "____ sun rises in the east and sets in the west.",
      options: ["A", "An", "The", "X"],
      correct: 2,
      explain: "Vật thể độc nhất vô nhị: Mặt trời (the sun), mặt trăng (the moon), trái đất (the earth) là những sự vật duy nhất trong vũ trụ, luôn luôn dùng 'The'."
    },
    {
      q: "My sister can play ____ piano very well.",
      options: ["a", "an", "the", "X"],
      correct: 2,
      explain: "Quy tắc nhạc cụ: Khi nói về việc chơi một nhạc cụ (play the piano, play the guitar, play the violin), ta luôn phải có 'the' trước tên nhạc cụ."
    },
    {
      q: "My brother plays ____ football with his friends every weekend.",
      options: ["a", "an", "the", "X"],
      correct: 3,
      explain: "Quy tắc thể thao: Trước tên các môn thể thao (football, tennis, basketball, badminton), ta tuyệt đối không dùng mạo từ (chọn X)."
    },
    {
      q: "Emily is ____ most intelligent student in our classroom.",
      options: ["a", "an", "the", "X"],
      correct: 2,
      explain: "So sánh nhất: Trước tính từ ở dạng so sánh nhất (the most intelligent, the tallest, the best), ta luôn dùng mạo từ xác định 'the'."
    },
    {
      q: "Mr. Thomas is ____ honest and hardworking businessman.",
      options: ["a", "an", "the", "X"],
      correct: 1,
      explain: "Bẫy âm câm: Từ 'honest' có chữ 'h' câm (phát âm là /ˈɒn.ɪst/), bắt đầu bằng nguyên âm /ɒ/. Do đó ta dùng 'an'."
    },
    {
      q: "Have you ever traveled to ____ United States?",
      options: ["a", "an", "the", "X"],
      correct: 2,
      explain: "Tên quốc gia liên bang: Các quốc gia là sự liên kết nhiều bang hoặc có từ 'United' (The USA, The UK, The UAE) luôn dùng 'The'."
    },
    {
      q: "My father goes to ____ work by train every day.",
      options: ["a", "an", "the", "X"],
      correct: 3,
      explain: "Cụm từ cố định: 'Go to work' (đi làm) và 'by train' (bằng tàu hỏa) là các thành ngữ cố định không dùng bất kỳ mạo từ nào (chọn X)."
    },
    {
      q: "We went to ____ hospital to visit our sick colleague.",
      options: ["a", "an", "the", "X"],
      correct: 2,
      explain: "Bẫy ngữ cảnh: Chúng tôi đến bệnh viện để thăm đồng nghiệp ốm (mục đích phụ, không phải bệnh nhân nằm viện), do đó ta phải dùng 'the hospital'."
    },
    {
      q: "I bought a novel and a comic. ____ novel was very interesting.",
      options: ["A", "An", "The", "X"],
      correct: 2,
      explain: "Lần thứ 2 nhắc lại: Cuốn tiểu thuyết ('novel') đã được nhắc ở câu trước, sang câu sau người nghe đã biết rõ cuốn nào nên dùng 'The novel'."
    },
    {
      q: "He runs five miles ____ day to stay healthy.",
      options: ["a", "an", "the", "X"],
      correct: 0,
      explain: "Thành ngữ đo lường: Cụm từ chỉ tần suất 'a day' mang nghĩa 'mỗi ngày' (per day), 'twice a week' (hai lần một tuần), ta dùng 'a'."
    },
    {
      q: "____ Pacific Ocean covers more than 30% of the Earth's surface.",
      options: ["A", "An", "The", "X"],
      correct: 2,
      explain: "Tên đại dương: Trước tên các đại dương trên thế giới (The Pacific Ocean, The Atlantic Ocean), ta luôn phải dùng mạo từ 'The'."
    },
    {
      q: "Can you speak ____ English as fluently as a native speaker?",
      options: ["a", "an", "the", "X"],
      correct: 3,
      explain: "Tên ngôn ngữ: Trước tên các ngôn ngữ (English, Vietnamese, French, Japanese), ta tuyệt đối không dùng mạo từ (chọn X)."
    },
    {
      q: "In our society, ____ rich should help ____ poor.",
      options: ["a / a", "the / the", "an / an", "X / X"],
      correct: 1,
      explain: "Cụm 'The + Tính từ': Dùng 'the' kết hợp với một tính từ để chỉ cả một tập thể người mang đặc điểm đó (The rich = những người giàu, The poor = những người nghèo)."
    }
  ]
},
  {
  id: '2',
  category: 'To Be',
  title: '2. Am/Is/Are',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Động từ TO BE - Thì hiện tại đơn</span>
      </div>

      {/* 2.1. Định nghĩa */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">2.1. Định nghĩa</h3>
        <p className="mb-4 font-medium italic">Động từ Tobe có nghĩa là: <strong>LÀ, THÌ, Ở, BỊ</strong></p>
        <div className="grid md:grid-cols-3 gap-4 font-bold">
          <div className="p-4 bg-blue-50 rounded-xl border text-center">
            <span className="text-blue-800">AM</span>
            <p className="text-xs font-normal mt-1">Dùng cho chủ ngữ duy nhất <strong>I</strong></p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border text-center">
            <span className="text-indigo-800">IS</span>
            <p className="text-xs font-normal mt-1">Dùng cho <strong>He, She, It</strong> và danh từ số ít</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border text-center">
            <span className="text-purple-800">ARE</span>
            <p className="text-xs font-normal mt-1">Dùng cho <strong>You, We, They</strong> và danh từ số nhiều</p>
          </div>
        </div>
      </section>

      {/* 2.2. Vị trí của động từ Tobe */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">2.2. Vị trí của động từ Tobe</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>Đứng trước tính từ:</strong> <span className="italic text-slate-600">He is very handsome</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>Đứng trước danh từ:</strong> <span className="italic text-slate-600">Ms Hoa is a teacher</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>Đứng trước cụm giới từ:</strong> <span className="italic text-slate-600">The cat is on the table</span></span>
          </li>
        </ul>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
        <h4 className="font-bold text-center text-blue-800 mb-3">Bảng tóm tắt</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-blue-600">Chủ ngữ</p>
            <p>I</p>
            <p className="font-bold text-green-600 mt-1">→ AM</p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-blue-600">Chủ ngữ</p>
            <p>He / She / It / Danh từ số ít</p>
            <p className="font-bold text-green-600 mt-1">→ IS</p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-blue-600">Chủ ngữ</p>
            <p>You / We / They / Danh từ số nhiều</p>
            <p className="font-bold text-green-600 mt-1">→ ARE</p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    {
      q: "They ____ my friends at university.",
      options: ["am", "is", "are", "was"],
      correct: 2,
      explain: "Chủ ngữ 'They' (họ/chúng nó) là đại từ nhân xưng số nhiều, ở hiện tại đơn luôn đi kèm với động từ To Be là 'are'."
    },
    {
      q: "She ____ a dedicated doctor at the central hospital.",
      options: ["am", "is", "are", "be"],
      correct: 1,
      explain: "Chủ ngữ 'She' (cô ấy) là ngôi thứ ba số ít, ở hiện tại đơn đi kèm với động từ To Be là 'is'."
    },
    {
      q: "I ____ very excited about our new project.",
      options: ["am", "is", "are", "be"],
      correct: 0,
      explain: "Chủ ngữ 'I' (tôi) ở thì hiện tại đơn luôn luôn đi với 'am' (I am)."
    },
    {
      q: "My parents ____ relaxing at home right now.",
      options: ["am", "is", "are", "be"],
      correct: 2,
      explain: "'My parents' (bố mẹ tôi) là danh từ số nhiều (2 người), do đó động từ To Be chia là 'are'."
    },
    {
      q: "The weather today ____ sunny and warm.",
      options: ["am", "is", "are", "be"],
      correct: 1,
      explain: "'The weather' (thời tiết) là danh từ không đếm được, tương đương ngôi thứ 3 số ít 'it', nên đi với 'is'."
    },
    {
      q: "You and I ____ in the same study group.",
      options: ["am", "is", "are", "be"],
      correct: 2,
      explain: "Bẫy chủ ngữ ghép: 'You and I' (Bạn và tôi) = 'We' (chúng ta), là chủ ngữ số nhiều, do đó động từ To Be phải là 'are', không chia theo 'I'."
    },
    {
      q: "There ____ a big cat sleeping on the sofa.",
      options: ["am", "is", "are", "be"],
      correct: 1,
      explain: "Cấu trúc 'There is / There are': Danh từ đứng sau là 'a big cat' (số ít), vì vậy ta dùng 'There is'."
    },
    {
      q: "There ____ twenty students in this classroom.",
      options: ["am", "is", "are", "be"],
      correct: 2,
      explain: "Cấu trúc 'There is / There are': Danh từ đứng sau là 'twenty students' (số nhiều), vì vậy ta dùng 'There are'."
    },
    {
      q: "Physics ____ my favorite subject at school.",
      options: ["am", "is", "are", "be"],
      correct: 1,
      explain: "Bẫy danh từ tận cùng bằng S: 'Physics' (môn Vật lý) tuy có chữ 's' ở cuối nhưng là tên một môn học (danh từ số ít), do đó đi với 'is'."
    },
    {
      q: "This cup of coffee ____ too hot to drink.",
      options: ["am", "is", "are", "be"],
      correct: 1,
      explain: "'This cup of coffee' có chủ ngữ cốt lõi là 'This cup' (chiếc tách này - danh từ số ít), do đó đi với 'is'."
    }
  ]
},
 {
  id: '3',
  category: 'To Be',
  title: '3. Were/Was',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Động từ TO BE - Thì quá khứ đơn</span>
      </div>

      {/* 3.1. Định nghĩa */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">3.1. Định nghĩa</h3>
        <p className="mb-3">
          <strong>Was</strong> và <strong>Were</strong> là hai dạng của động từ <strong>Tobe</strong> được chia ở thì <strong>quá khứ</strong>.
          Được sử dụng để diễn tả hành động hoặc trạng thái của chủ ngữ <strong>trong quá khứ</strong>.
        </p>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center mt-3">
          <p className="font-mono font-bold text-lg">S + was/were + noun / adjective / preposition phrase</p>
        </div>
      </section>

      {/* 3.2. Phân biệt Was và Were */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">3.2. Phân biệt Was và Were</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-black text-blue-800 text-center text-lg mb-3">WAS</h4>
            <ul className="space-y-2 text-sm list-disc ml-5">
              <li><strong>I</strong> was tired yesterday.</li>
              <li><strong>He</strong> was a good student.</li>
              <li><strong>She</strong> was happy.</li>
              <li><strong>It</strong> was cold last night.</li>
              <li><strong>Danh từ số ít</strong> (The cat, My father, Hanoi...)</li>
              <li><strong>Tên riêng</strong> (John, Mary, Vietnam...)</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <h4 className="font-black text-purple-800 text-center text-lg mb-3">WERE</h4>
            <ul className="space-y-2 text-sm list-disc ml-5">
              <li><strong>You</strong> were late this morning.</li>
              <li><strong>We</strong> were at the party.</li>
              <li><strong>They</strong> were best friends.</li>
              <li><strong>Danh từ số nhiều</strong> (The cats, My parents, The books...)</li>
              <li><strong>You (số nhiều)</strong> were all great!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3.3. Các dạng câu */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">3.3. Các dạng câu với Was/Were</h3>
        <div className="space-y-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="font-bold text-green-700">Khẳng định:</p>
            <p className="font-mono text-sm">S + was/were + ...</p>
            <p className="italic text-xs mt-1">Ex: She was a teacher. / They were students.</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="font-bold text-red-700">Phủ định:</p>
            <p className="font-mono text-sm">S + was/were + not + ...</p>
            <p className="italic text-xs mt-1">Ex: She was not (wasn't) a teacher. / They were not (weren't) students.</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-bold text-blue-700">Nghi vấn:</p>
            <p className="font-mono text-sm">Was/Were + S + ...?</p>
            <p className="italic text-xs mt-1">Ex: Was she a teacher? / Were they students?</p>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-2xl border border-orange-200">
        <h4 className="font-bold text-center text-orange-800 mb-3">Bảng tóm tắt Was/Were</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-blue-600">WAS</p>
            <hr className="my-2" />
            <p>✓ I</p>
            <p>✓ He / She / It</p>
            <p>✓ Danh từ số ít</p>
            <p>✓ Tên riêng</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-purple-600">WERE</p>
            <hr className="my-2" />
            <p>✓ You</p>
            <p>✓ We / They</p>
            <p>✓ Danh từ số nhiều</p>
            <p>✓ You (số nhiều)</p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    {
      type: "Điền từ cơ bản",
      q: "Yesterday ____ rainy and chilly all day.",
      options: ["is", "am", "was", "were"],
      correct: 2,
      explain: "Có trạng từ chỉ thời gian quá khứ 'Yesterday' và chủ ngữ 'It/Thời tiết' ẩn (Yesterday đóng vai trò trạng từ, danh từ ngầm chỉ thời tiết số ít) hoặc đóng vai trò chủ ngữ thời gian số ít → dùng 'was'."
    },
    {
      type: "Điền từ cơ bản",
      q: "They ____ at the international conference in Singapore last week.",
      options: ["was", "were", "is", "are"],
      correct: 1,
      explain: "Chủ ngữ 'They' (họ) là đại từ số nhiều, đi kèm dấu hiệu quá khứ 'last week' → chọn 'were'."
    },
    {
      type: "Điền từ cơ bản",
      q: "I ____ exhausted after finishing the 10-kilometer marathon yesterday.",
      options: ["was", "were", "am", "is"],
      correct: 0,
      explain: "Chủ ngữ 'I' ở quá khứ đơn luôn đi với 'was' (I was / He was / She was / It was)."
    },
    {
      type: "Câu phủ định",
      q: "We ____ satisfied with the hotel service during our trip to Da Nang.",
      options: ["wasn't", "weren't", "aren't", "didn't"],
      correct: 1,
      explain: "Chủ ngữ 'We' (chúng tôi) số nhiều. Sau chỗ trống là tính từ 'satisfied', do đó thể phủ định của To Be trong quá khứ là 'weren't'."
    },
    {
      type: "Câu hỏi nghi vấn",
      q: "____ your brother at home when the parcel arrived yesterday afternoon?",
      options: ["Was", "Were", "Did", "Is"],
      correct: 0,
      explain: "Chủ ngữ là 'your brother' (ngôi thứ ba số ít, tương đương 'he'). Khi hỏi về trạng thái/địa điểm ở quá khứ, ta đảo 'Was' lên đầu câu."
    },
    {
      type: "Bẫy chủ ngữ ghép",
      q: "Both Sarah and her brother ____ invited to the annual gala last Friday.",
      options: ["was", "were", "is", "are"],
      correct: 1,
      explain: "Cấu trúc 'Both A and B' luôn làm chủ ngữ số nhiều. Có thời gian 'last Friday' nên dùng 'were'."
    },
    {
      type: "Bẫy Neither... Nor",
      q: "Neither the manager nor the employees ____ aware of the emergency meeting yesterday.",
      options: ["was", "were", "are", "have been"],
      correct: 1,
      explain: "Quy tắc hòa hợp chủ vị với 'Neither... nor...': Động từ chia theo danh từ gần nó nhất. 'the employees' là danh từ số nhiều đứng sát động từ → chọn 'were'."
    },
    {
      type: "Bẫy danh từ tập hợp",
      q: "The whole team ____ extremely proud of their final project presentation.",
      options: ["was", "were", "are", "is"],
      correct: 0,
      explain: "Danh từ tập hợp 'The whole team' được nhìn nhận như một thể thống nhất duy nhất → chia động từ to be số ít 'was'."
    },
    {
      type: "Bẫy câu điều kiện loại 2",
      q: "If I ____ you, I would accept that overseas job offer immediately.",
      options: ["was", "were", "am", "would be"],
      correct: 1,
      explain: "Trong mệnh đề điều kiện loại 2 (giả định trái với hiện tại), theo chuẩn ngữ pháp học thuật, động từ To Be chia là 'were' cho tất cả các ngôi (kể cả I/he/she/it): 'If I were you'."
    },
    {
      type: "Bẫy câu ước Wish",
      q: "She wishes she ____ taller so she could participate in the basketball team.",
      options: ["is", "was", "were", "will be"],
      correct: 2,
      explain: "Cấu trúc câu ước không có thật ở hiện tại: S + wish(es) + S + V2/ed. Với To Be, dạng giả định chuẩn mực là 'were' cho mọi ngôi: 'She wishes she were taller'."
    },
    {
      type: "Tìm lỗi sai",
      q: "Tìm lỗi sai trong câu: 'The books (A) on the top shelf (B) was (C) covered in thick dust (D).'",
      options: ["(A) The books", "(B) on the top shelf", "(C) was", "(D) covered"],
      correct: 2,
      explain: "Chủ ngữ chính của câu là danh từ số nhiều 'The books' (cụm 'on the top shelf' chỉ là giới từ bổ nghĩa). Do đó 'was' phải sửa thành 'were'."
    },
    {
      type: "Tìm lỗi sai",
      q: "Tìm lỗi sai trong câu: 'Where (A) was (B) you and your family (C) during the heavy storm (D)?'",
      options: ["(A) Where", "(B) was", "(C) you and your family", "(D) heavy storm"],
      correct: 1,
      explain: "Chủ ngữ là 'you and your family' (bạn và gia đình bạn = chủ ngữ số nhiều), do đó trợ động từ to be phải là 'were', không được dùng 'was'."
    },
    {
      type: "Viết lại câu tương đương",
      q: "Chọn câu có nghĩa tương đương: 'The meeting finished, and everyone felt satisfied.'",
      options: [
        "Everyone was satisfied after the meeting.",
        "Everyone were satisfied after the meeting.",
        "The meeting were satisfied for everyone.",
        "Everyone are satisfied after the meeting."
      ],
      correct: 0,
      explain: "Đại từ bất định 'Everyone' luôn luôn chia động từ số ít ('was satisfied'), và sự việc đã xảy ra trong quá khứ nên dùng thì quá khứ đơn."
    },
    {
      type: "Viết lại câu tương đương",
      q: "Chọn câu viết đúng ngữ pháp: 'Khi chúng tôi còn nhỏ, chúng tôi rất nghịch ngợm.'",
      options: [
        "When we was children, we were very naughty.",
        "When we were children, we were very naughty.",
        "When we were children, we was very naughty.",
        "When we are children, we were very naughty."
      ],
      correct: 1,
      explain: "Cả hai mệnh đề đều có chủ ngữ 'we' (chúng tôi - số nhiều) trong quá khứ, nên cả 2 động từ To Be đều phải dùng 'were'."
    },
    {
      type: "Tình huống giao tiếp",
      q: "— 'Why didn't you answer my phone call last night?' — 'Sorry, I ____ in the shower.'",
      options: ["am", "was", "were", "have been"],
      correct: 1,
      explain: "Tình huống giải thích lý do không nghe máy tối qua (hành động đang diễn ra lúc đó) với chủ ngữ 'I' → chọn 'was'."
    },
    {
      type: "Hội thoại hỏi thăm",
      q: "— 'How ____ your job interview at Google this morning?' — 'It went really well!'",
      options: ["is", "was", "were", "did"],
      correct: 1,
      explain: "Hỏi về buổi phỏng vấn 'your job interview' (danh từ số ít) diễn ra sáng nay (đã kết thúc) → dùng 'How was...'."
    },
    {
      type: "Dấu hiệu nhận biết",
      q: "Ten years ago, smart home devices ____ not popular in our country.",
      options: ["were", "was", "are", "have been"],
      correct: 0,
      explain: "Có dấu hiệu thời gian 'Ten years ago' (10 năm trước) và chủ ngữ số nhiều 'smart home devices' (các thiết bị nhà thông minh) → chọn 'were'."
    },
    {
      type: "Danh từ số ít đặc biệt",
      q: "The news about the company merger ____ a huge shock to all employees.",
      options: ["were", "was", "are", "have been"],
      correct: 1,
      explain: "Bẫy danh từ kết thúc bằng 's': Từ 'news' (tin tức) là danh từ không đếm được, luôn chia theo số ít. Do đó ta dùng 'was'."
    },
    {
      type: "Bẫy 'As well as'",
      q: "The teacher, as well as her students, ____ excited about the field trip yesterday.",
      options: ["was", "were", "are", "is"],
      correct: 0,
      explain: "Quy tắc ngữ pháp quan trọng: Khi chủ ngữ nối bởi 'as well as', động từ chia theo chủ ngữ đầu tiên ('The teacher' - số ít) → chọn 'was'."
    },
    {
      type: "Câu hỏi đuôi (Tag Question)",
      q: "The children were very well-behaved yesterday, ____?",
      options: ["weren't they", "wasn't they", "didn't they", "aren't they"],
      correct: 0,
      explain: "Mệnh đề chính khẳng định 'The children were...' → câu hỏi đuôi phải phủ định ở quá khứ: 'weren't they?'."
    }
  ]
},
  {
  id: '4',
  category: 'Cấu trúc',
  title: '4. There is/are | There was/were',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Cấu trúc "There is/are/was/were"</span>
      </div>

      {/* 4.1. Khái niệm */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-emerald-700 mb-4 border-b border-emerald-200 pb-2">4.1. Khái niệm</h3>
        <div className="space-y-3">
          <p>• <strong>There is/are/was/were</strong> có nghĩa là <strong>"có"</strong> hoặc <strong>"có gì đó"</strong>.</p>
          <p>• Là cấu trúc dùng để <strong>miêu tả sự vật, sự việc hoặc một hiện tượng</strong> nhất định.</p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center mt-3">
            <p className="font-mono font-bold text-lg">There + be + Noun</p>
            <p className="text-xs italic mt-1">(be chia theo danh từ phía sau)</p>
          </div>
        </div>
      </section>

      {/* 4.2. Cấu trúc chi tiết */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-emerald-700 mb-4 border-b border-emerald-200 pb-2">4.2. Cấu trúc chi tiết</h3>
        
        <div className="space-y-5">
          {/* Dạng khẳng định */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">Dạng khẳng định</h4>
            <div className="space-y-2 text-sm">
              <p>• <strong>There is + a/an/one/the + danh từ số ít/danh từ không đếm được</strong></p>
              <p className="italic ml-4">Ex: There is a book on the table.</p>
              <p className="italic ml-4">Ex: There is some water in the bottle.</p>
              <p>• <strong>There are + danh từ đếm được số nhiều</strong></p>
              <p className="italic ml-4">Ex: There are many students in the classroom.</p>
            </div>
          </div>

          {/* Dạng phủ định */}
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">Dạng phủ định</h4>
            <div className="space-y-2 text-sm">
              <p>• <strong>There is not (isn't) + danh từ không đếm được</strong></p>
              <p className="italic ml-4">Ex: There isn't any milk left.</p>
              <p>• <strong>There is not (isn't) + a/an/any + danh từ số ít</strong></p>
              <p className="italic ml-4">Ex: There isn't a pen on the desk.</p>
              <p>• <strong>There are not (aren't) + đại từ chỉ số lượng + danh từ số nhiều</strong></p>
              <p className="italic ml-4">Ex: There aren't many cars on the street.</p>
            </div>
          </div>

          {/* Dạng nghi vấn */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">Dạng nghi vấn</h4>
            <div className="space-y-2 text-sm">
              <p>• <strong>Is there any + danh từ không đếm được?</strong></p>
              <p className="italic ml-4">Ex: Is there any sugar in the jar?</p>
              <p>• <strong>Is there + a/an/any + danh từ đếm được số ít?</strong></p>
              <p className="italic ml-4">Ex: Is there a post office near here?</p>
              <p>• <strong>How many + danh từ số nhiều + are there?</strong></p>
              <p className="italic ml-4">Ex: How many people are there in your family?</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.3. There was/were (Quá khứ) */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-emerald-700 mb-4 border-b border-emerald-200 pb-2">4.3. There was / There were (Thì quá khứ)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <p className="font-bold text-orange-700">There was + danh từ số ít/không đếm được</p>
            <p className="italic text-sm mt-2">Ex: There was a cat in the garden yesterday.</p>
            <p className="italic text-sm">Ex: There was some water in the glass.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="font-bold text-purple-700">There were + danh từ số nhiều</p>
            <p className="italic text-sm mt-2">Ex: There were many people at the party last night.</p>
            <p className="italic text-sm">Ex: There were three books on the shelf.</p>
          </div>
        </div>
      </section>

      {/* 4.4. Lưu ý quan trọng */}
      <section className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">LƯU Ý QUAN TRỌNG</h4>
        <ul className="space-y-2 text-sm">
          <li>• <strong>There</strong> được gọi là <strong>chủ ngữ giả</strong> (tobe chia theo danh từ đứng ngay phía sau → chủ ngữ thật)</li>
          <li>• <strong>Dạng 1:</strong> Đứng đầu chuỗi liệt kê là danh từ số ít hoặc không đếm được → dùng <strong>There is</strong></li>
          <li>• <strong>Dạng 2:</strong> Đứng đầu chuỗi liệt kê là danh từ số nhiều → dùng <strong>There are</strong></li>
        </ul>
        <div className="mt-3 p-3 bg-white rounded-lg">
          <p className="font-bold text-sm">Ví dụ phân biệt:</p>
          <p className="italic text-sm">There <strong>is</strong> a book, two pens and three notebooks on the table.</p>
          <p className="italic text-sm mt-1">There <strong>are</strong> two pens, a book and three notebooks on the table.</p>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200">
        <h4 className="font-bold text-center text-emerald-800 mb-3">Bảng tóm tắt nhanh</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-emerald-600">Hiện tại</p>
            <p>Số ít → <strong>There is</strong></p>
            <p>Số nhiều → <strong>There are</strong></p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-orange-600">Quá khứ</p>
            <p>Số ít → <strong>There was</strong></p>
            <p>Số nhiều → <strong>There were</strong></p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-red-600">Phủ định</p>
            <p>isn't / aren't</p>
            <p>wasn't / weren't</p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="font-bold text-blue-600">Nghi vấn</p>
            <p>Is/Are + there?</p>
            <p>Was/Were + there?</p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    {
      type: "Điền từ cơ bản",
      q: "____ a lot of fresh milk left in the refrigerator.",
      options: ["There is", "There are", "There was", "There were"],
      correct: 0,
      explain: "'milk' là danh từ không đếm được, ở hiện tại dùng 'There is'."
    },
    {
      type: "Điền từ cơ bản",
      q: "____ twenty candidates waiting in the interview room right now.",
      options: ["There is", "There are", "There was", "There were"],
      correct: 1,
      explain: "'twenty candidates' là danh từ số nhiều đếm được, có 'right now' (hiện tại) → dùng 'There are'."
    },
    {
      type: "Phân biệt Quá khứ",
      q: "Fifty years ago, ____ only a few small houses in this neighborhood.",
      options: ["there is", "there are", "there was", "there were"],
      correct: 3,
      explain: "'Fifty years ago' (50 năm trước) là thời gian quá khứ, đi kèm danh từ số nhiều 'a few small houses' → dùng 'there were'."
    },
    {
      type: "Câu hỏi nghi vấn",
      q: "____ any good coffee shops near our office?",
      options: ["Is there", "Are there", "There is", "There are"],
      correct: 1,
      explain: "Câu hỏi nghi vấn với danh từ số nhiều 'coffee shops' ở hiện tại → đảo 'Are there' lên trước."
    },
    {
      type: "Bẫy danh từ gần nhất",
      q: "On the desk, there ____ a laptop and three notebooks.",
      options: ["is", "are", "were", "have"],
      correct: 0,
      explain: "Quy tắc hòa hợp với 'There be': Động từ 'be' chia theo danh từ đứng liền ngay sau nó. Vì 'a laptop' là danh từ số ít đứng đầu tiên → dùng 'is' (chứ không dùng 'are')."
    },
    {
      type: "Bẫy danh từ gần nhất",
      q: "On the shelf, there ____ three notebooks and a laptop.",
      options: ["is", "are", "was", "has"],
      correct: 1,
      explain: "Ngược lại, khi danh từ đứng liền kề ngay sau 'there' là danh từ số nhiều ('three notebooks') → chia động từ to be là 'are'."
    },
    {
      type: "Câu phủ định số nhiều",
      q: "There ____ many cars on the highway due to the holiday yesterday.",
      options: ["isn't", "aren't", "wasn't", "weren't"],
      correct: 3,
      explain: "Có thời gian 'yesterday' (quá khứ) và danh từ số nhiều 'many cars' → thể phủ định là 'weren't'."
    },
    {
      type: "Danh từ không đếm được",
      q: "There ____ much traffic in Hanoi this early morning.",
      options: ["isn't", "aren't", "wasn't", "weren't"],
      correct: 0,
      explain: "'traffic' (giao thông) là danh từ không đếm được. Với danh từ không đếm được ở hiện tại ta dùng 'There isn't'."
    },
    {
      type: "Câu hỏi số lượng",
      q: "How many days ____ in a leap year?",
      options: ["there is", "there are", "is there", "are there"],
      correct: 3,
      explain: "Cấu trúc câu hỏi số lượng: How many + N(số nhiều) + are there...? → chọn 'are there'."
    },
    {
      type: "Quá khứ số ít",
      q: "Yesterday morning, there ____ a serious traffic accident near the bridge.",
      options: ["is", "are", "was", "were"],
      correct: 2,
      explain: "'a serious traffic accident' là một vụ tai nạn (danh từ số ít), diễn ra vào 'Yesterday morning' → dùng 'was'."
    },
    {
      type: "Tìm lỗi sai",
      q: "Tìm lỗi sai trong câu: 'There (A) are (B) too much noise (C) in this crowded room (D).'",
      options: ["(A) There", "(B) are", "(C) too much noise", "(D) in this"],
      correct: 1,
      explain: "'noise' (tiếng ồn) là danh từ không đếm được, phải đi với 'There is', không được dùng 'There are'."
    },
    {
      type: "Tìm lỗi sai",
      q: "Tìm lỗi sai trong câu: 'Was (A) there (B) any students (C) absent yesterday (D)?'",
      options: ["(A) Was", "(B) there", "(C) any students", "(D) absent yesterday"],
      correct: 0,
      explain: "Danh từ trong câu hỏi là 'any students' (số nhiều), nên câu hỏi ở quá khứ phải là 'Were there', không dùng 'Was there'."
    },
    {
      type: "Bẫy Có vs Có của sở hữu",
      q: "Chọn câu viết đúng nghĩa: 'Thành phố này có một công viên rất đẹp.'",
      options: [
        "This city has a very beautiful park.",
        "There have a very beautiful park in this city.",
        "In this city has a very beautiful park.",
        "There is have a very beautiful park in this city."
      ],
      correct: 0,
      explain: "Bẫy kinh điển: Không bao giờ viết 'There have...'. Ta chỉ dùng 'There is/are...' để chỉ sự tồn tại, hoặc dùng 'S + has/have...' (This city has a very beautiful park)."
    },
    {
      type: "Viết lại câu tương đương",
      q: "Chọn câu đồng nghĩa với: 'Our company has 500 dedicated employees.'",
      options: [
        "There is 500 dedicated employees in our company.",
        "There are 500 dedicated employees in our company.",
        "There has 500 dedicated employees in our company.",
        "There was 500 dedicated employees in our company."
      ],
      correct: 1,
      explain: "Chuyển từ 'Company has 500 employees' sang cấu trúc tồn tại: 'There are 500 dedicated employees in our company'."
    },
    {
      type: "Tình huống nhà hàng",
      q: "— Customer: 'Excuse me, ____ any vegetarian options on the menu?' — Waiter: 'Yes, of course!'",
      options: ["is there", "are there", "there is", "there are"],
      correct: 1,
      explain: "Khách hàng hỏi lịch sự về các món chay ('vegetarian options' - số nhiều) → 'Are there any...?'."
    },
    {
      type: "Tình huống thời tiết",
      q: "Look at the dark clouds! ____ going to be a heavy rainstorm soon.",
      options: ["There is", "There was", "There are", "It is"],
      correct: 0,
      explain: "Cấu trúc dự đoán tương lai gần: 'There is going to be + Noun' (Sắp sửa có một cơn giông bão lớn)."
    },
    {
      type: "Bẫy danh từ People",
      q: "In the conference hall, there ____ about three hundred people listening attentively.",
      options: ["is", "are", "was", "has been"],
      correct: 1,
      explain: "'people' là danh từ số nhiều (số nhiều của person), luôn đi với động từ số nhiều 'There are'."
    },
    {
      type: "Bẫy đại từ bất định",
      q: "Don't worry, there ____ someone at the front desk to assist you.",
      options: ["is", "are", "were", "have"],
      correct: 0,
      explain: "Các đại từ bất định như 'someone', 'everyone', 'anyone', 'no one' luôn đi với động từ số ít → 'There is someone'."
    },
    {
      type: "Quá khứ không đếm được",
      q: "When we arrived at the campsite, there ____ no fresh water left in the tank.",
      options: ["were", "was", "are", "is"],
      correct: 1,
      explain: "Hành động trong quá khứ ('When we arrived') và 'water' là danh từ không đếm được → dùng 'there was no fresh water'."
    },
    {
      type: "Câu hỏi đuôi (Tag Question)",
      q: "There isn't any problem with the server, ____?",
      options: ["is there", "isn't there", "is it", "isn't it"],
      correct: 0,
      explain: "Câu hỏi đuôi của cấu trúc 'There is/are': Mệnh đề chính phủ định 'There isn't...' → câu hỏi đuôi giữ nguyên chủ ngữ giả: 'is there?'."
    }
  ]
},
  {
  id: '5',
  category: 'Chủ ngữ giả',
  title: '5. Pseudo-subject "It/There"',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Chủ ngữ giả - It và There</span>
      </div>

      {/* 5.1. It làm chủ ngữ giả */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">5.1. It làm chủ ngữ giả</h3>
        
        <div className="space-y-5">
          {/* a. Thời gian */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-700 mb-2">a. Nói về thời gian, ngày tháng</h4>
            <p className="italic">It takes me 10 minutes to go to work.</p>
            <p className="italic mt-1">It is 8 o'clock now.</p>
            <p className="italic mt-1">It was Monday yesterday.</p>
          </div>

          {/* b. Khoảng cách */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-bold text-green-700 mb-2">b. Nói về khoảng cách</h4>
            <p className="italic">It is very far from here to the North Pole.</p>
            <p className="italic mt-1">It is 5 kilometers from my house to school.</p>
          </div>

          {/* c. Thời tiết */}
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-yellow-700 mb-2">c. Nói về thời tiết và nhiệt độ</h4>
            <p className="italic">It was snowy yesterday.</p>
            <p className="italic mt-1">It is raining heavily outside.</p>
            <p className="italic mt-1">It is 25 degrees Celsius today.</p>
          </div>

          {/* d. Quan điểm, cảm nhận */}
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-700 mb-2">d. Nói về quan điểm, cảm nhận</h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-bold text-sm">Cấu trúc 1:</p>
                <p className="font-mono text-sm">It + to be + adj + to V</p>
                <p className="italic text-xs mt-1">Ex: It is necessary to learn English.</p>
                <p className="italic text-xs">Ex: It is important to arrive on time.</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-bold text-sm">Cấu trúc 2:</p>
                <p className="font-mono text-sm">It + to be + adj + of + O + to V</p>
                <p className="italic text-xs mt-1">Ex: It is kind of you to help me.</p>
                <p className="italic text-xs">Ex: It is foolish of him to say that.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chú ý về It */}
        <div className="mt-5 p-3 bg-red-50 rounded-xl border-l-4 border-red-500">
          <p className="font-bold text-red-700 text-sm">CHÚ Ý:</p>
          <ul className="list-disc ml-5 text-xs space-y-1 mt-1">
            <li><strong>It</strong> luôn chia ở <strong>số ít</strong></li>
            <li>Sau <strong>it</strong> có thể dùng các động từ: <strong>seem, like, appear, look like</strong></li>
            <li className="italic">Ex: It seems that he is tired.</li>
          </ul>
        </div>
      </section>

      {/* 5.2. There làm chủ ngữ giả */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">5.2. There làm chủ ngữ giả</h3>
        
        <div className="space-y-5">
          {/* a. Sự tồn tại */}
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
            <h4 className="font-bold text-teal-700 mb-2">a. Nói về sự tồn tại của sự vật</h4>
            <p className="italic">There will be 50 guests at the wedding.</p>
            <p className="italic mt-1">There is a beautiful park near my house.</p>
          </div>

          {/* b. Sự diễn ra */}
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <h4 className="font-bold text-indigo-700 mb-2">b. Nói về sự diễn ra của một việc</h4>
            <p className="italic">There was an important meeting yesterday.</p>
            <p className="italic mt-1">There will be a concert tomorrow night.</p>
          </div>
        </div>

        {/* Chú ý về There */}
        <div className="mt-5 p-3 bg-red-50 rounded-xl border-l-4 border-red-500">
          <p className="font-bold text-red-700 text-sm">CHÚ Ý:</p>
          <ul className="list-disc ml-5 text-xs space-y-1 mt-1">
            <li><strong>There</strong> được chia <strong>phù hợp với danh từ</strong> đi ngay sau nó</li>
            <li>Sau <strong>there</strong> ngoài động từ tobe có thể dùng: <strong>seem to be, need to be, appear to be</strong></li>
            <li className="italic">Ex: There seem to be some problems.</li>
          </ul>
        </div>
      </section>

      {/* Bảng so sánh It và There */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-200">
        <h4 className="font-bold text-center text-purple-800 mb-3">SO SÁNH NHANH IT VÀ THERE</h4>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-purple-600 mb-2">IT</p>
            <ul className="space-y-1 list-disc ml-4">
              <li>Thời gian, ngày tháng</li>
              <li>Khoảng cách</li>
              <li>Thời tiết, nhiệt độ</li>
              <li>Quan điểm, cảm nhận</li>
            </ul>
            <p className="italic text-center mt-2 text-purple-600">→ It + to be + adj + to V</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-teal-600 mb-2">THERE</p>
            <ul className="space-y-1 list-disc ml-4">
              <li>Sự tồn tại của sự vật</li>
              <li>Sự diễn ra của sự việc</li>
            </ul>
            <p className="italic text-center mt-2 text-teal-600">→ There + be + Noun</p>
          </div>
        </div>
      </section>

      {/* Ví dụ tổng hợp */}
      <section className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">VÍ DỤ TỔNG HỢP</h4>
        <div className="space-y-2 text-sm">
          <p>• <strong>It</strong> is very hot today. (Thời tiết)</p>
          <p>• <strong>It</strong> takes 2 hours to fly to Hanoi. (Thời gian)</p>
          <p>• <strong>There</strong> is a beautiful beach in Da Nang. (Sự tồn tại)</p>
          <p>• <strong>There</strong> will be a test next week. (Sự diễn ra)</p>
          <p>• <strong>It</strong> is necessary to review the lesson. (Quan điểm)</p>
          <p>• <strong>There</strong> seems to be a mistake in this exercise. (There + seem to be)</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    {
      type: "Khoảng cách",
      q: "____ is about 30 kilometers from the airport to the city center.",
      options: ["It", "There", "That", "This"],
      correct: 0,
      explain: "Chủ ngữ giả chỉ khoảng cách: Dùng 'It is + khoảng cách + from A to B'."
    },
    {
      type: "Quan điểm / Đánh giá",
      q: "____ is crucial to double-check all data before submitting the report.",
      options: ["It", "There", "That", "This"],
      correct: 0,
      explain: "Cấu trúc quan điểm, đánh giá tính chất: 'It + to be + Adj + to V'."
    },
    {
      type: "Sự tồn tại / Số lượng",
      q: "____ will be more than 200 international guests attending the opening ceremony.",
      options: ["It", "There", "That", "This"],
      correct: 1,
      explain: "Chỉ sự hiện diện, tồn tại của người/vật trong tương lai: 'There will be + Noun'."
    },
    {
      type: "Thời tiết",
      q: "____ was pouring with rain when we stepped out of the office yesterday.",
      options: ["It", "There", "That", "This"],
      correct: 0,
      explain: "Chủ ngữ giả chỉ hiện tượng thời tiết (mưa, nắng, gió, tuyết...): luôn luôn dùng 'It' (It was raining, It was sunny...)."
    },
    {
      type: "Dự đoán / Dường như",
      q: "____ seems to be a serious misunderstanding between the two departments.",
      options: ["It", "There", "That", "This"],
      correct: 1,
      explain: "Cấu trúc 'There seems to be + Noun' (Dường như có một...). Không dùng 'It seems to be a misunderstanding' khi muốn nhấn mạnh sự tồn tại của sự việc."
    },
    {
      type: "Cấu trúc tiêu tốn thời gian",
      q: "____ took us nearly three hours to fix the technical glitch.",
      options: ["It", "There", "That", "We"],
      correct: 0,
      explain: "Cấu trúc tiêu tốn thời gian kinh điển: 'It takes/took + O + time + to V' (Mất bao nhiêu thời gian để ai làm gì)."
    },
    {
      type: "Cấu trúc tính cách con người",
      q: "It was extremely kind ____ you to give me a lift home during the heavy storm.",
      options: ["for", "of", "to", "with"],
      correct: 1,
      explain: "Khi tính từ chỉ phẩm chất, tính cách của con người (kind, polite, generous, rude, foolish, silly...), cấu trúc bắt buộc là: 'It + be + Adj + OF + somebody + to V'."
    },
    {
      type: "Cấu trúc cần thiết cho ai",
      q: "It is necessary ____ all new employees to attend the orientation session.",
      options: ["for", "of", "to", "with"],
      correct: 0,
      explain: "Khi tính từ chỉ mức độ cần thiết, quan trọng (necessary, important, essential, difficult, easy...), cấu trúc là: 'It + be + Adj + FOR + somebody + to V'."
    },
    {
      type: "Phân biệt It vs There",
      q: "____ is no point in arguing about something that has already happened.",
      options: ["It", "There", "That", "This"],
      correct: 1,
      explain: "Thành ngữ cố định kinh điển: 'There is no point in + V-ing' (Vô ích / Chẳng có ý nghĩa gì khi làm gì)."
    },
    {
      type: "Phân biệt It vs There",
      q: "____ is no doubt that renewable energy will replace fossil fuels in the future.",
      options: ["It", "There", "That", "This"],
      correct: 1,
      explain: "Thành ngữ chỉ sự chắc chắn: 'There is no doubt that...' (Không còn nghi ngờ gì nữa rằng...)."
    },
    {
      type: "Thời gian",
      q: "What time is it right now? — ____ is exactly a quarter past eight.",
      options: ["It", "There", "That", "Time"],
      correct: 0,
      explain: "Hỏi và trả lời về giờ giấc thời gian luôn dùng chủ ngữ giả 'It is...'."
    },
    {
      type: "Câu chẻ (Cleft sentence)",
      q: "____ was John who discovered the financial discrepancy in the monthly audit.",
      options: ["It", "There", "He", "That"],
      correct: 0,
      explain: "Cấu trúc câu chẻ nhấn mạnh vào chủ ngữ: 'It is/was + Thành phần nhấn mạnh + who/that + V'."
    },
    {
      type: "Tìm lỗi sai",
      q: "Tìm lỗi sai trong câu: 'It (A) is (B) many interesting museums (C) to visit in Paris (D).'",
      options: ["(A) It", "(B) is", "(C) many interesting museums", "(D) to visit"],
      correct: 0,
      explain: "Để nói về sự tồn tại của nhiều bảo tàng (danh từ số nhiều), phải dùng 'There are', không được dùng 'It is'."
    },
    {
      type: "Tìm lỗi sai",
      q: "Tìm lỗi sai trong câu: 'It (A) was very generous (B) for (C) him to donate his savings (D).'",
      options: ["(A) It", "(B) generous", "(C) for", "(D) to donate"],
      correct: 2,
      explain: "'generous' (hào phóng) là tính từ chỉ phẩm chất tính cách của người, nên phải dùng giới từ 'of' ('generous of him'), không dùng 'for'."
    },
    {
      type: "Viết lại câu tương đương",
      q: "Chọn câu đồng nghĩa với: 'Driving to the beach took them four hours.'",
      options: [
        "It took them four hours to drive to the beach.",
        "There took them four hours to drive to the beach.",
        "It was four hours for them driving to the beach.",
        "There were four hours for them to drive to the beach."
      ],
      correct: 0,
      explain: "Chuyển đổi câu sang cấu trúc chủ ngữ giả: 'It took + somebody + time + to V' ('It took them four hours to drive to the beach')."
    },
    {
      type: "Viết lại câu tương đương",
      q: "Chọn câu đồng nghĩa với: 'Learning how to code is not easy.'",
      options: [
        "It is not easy to learn how to code.",
        "There is not easy to learn how to code.",
        "It is easy not to learn how to code.",
        "That is not easy learning how to code."
      ],
      correct: 0,
      explain: "Chuyển chủ ngữ danh động từ (V-ing) sang chủ ngữ giả It: 'It is + Adj + to V' ('It is not easy to learn how to code')."
    },
    {
      type: "Thành ngữ thông dụng",
      q: "____ is no wonder she passed the IELTS exam with band 8.5; she practiced relentlessly.",
      options: ["It", "There", "That", "This"],
      correct: 0,
      explain: "Thành ngữ 'It is no wonder (that)...' (Chẳng trách / Thảo nào mà...)."
    },
    {
      type: "Nhiệt độ môi trường",
      q: "Don't forget your warm jacket; ____ is below freezing point outside.",
      options: ["it", "there", "weather", "that"],
      correct: 0,
      explain: "Nói về nhiệt độ (nóng, lạnh, dưới 0 độ...): luôn dùng chủ ngữ giả 'it is'."
    },
    {
      type: "Dạng bị động đặc biệt",
      q: "____ is believed that drinking enough water boosts cognitive performance.",
      options: ["It", "There", "That", "People"],
      correct: 0,
      explain: "Thể bị động khách quan không ngôi: 'It is said / believed / reported / thought that + S + V' (Người ta tin rằng...)."
    },
    {
      type: "Cấu trúc khả năng",
      q: "____ is a high likelihood of rain this weekend according to the meteorologist.",
      options: ["There", "It", "That", "Weather"],
      correct: 0,
      explain: "Cấu trúc chỉ sự tồn tại của khả năng: 'There is a high likelihood / possibility of + Noun' (Có khả năng cao là...)."
    }
  ]
},
  {
  id: '6',
  category: 'Danh từ',
  title: '6. Nouns',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Danh từ</span>
      </div>

      {/* A. Khái niệm về Danh từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">A. Khái niệm về Danh từ</h3>
        
        <div className="space-y-5">
          {/* 1. Danh từ chung */}
          <div className="p-3 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">1. Danh từ chung (Common Nouns)</h4>
            <p className="text-xs mb-2">Là danh từ chỉ người, động vật, địa điểm và sự vật</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Người:</span> man, mother, baby, doctor, banker
              </div>
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Động vật:</span> bear, lion, monkey
              </div>
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Nơi chốn:</span> waterfall, beach, mountain
              </div>
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Đồ vật:</span> chair, table, lamp, computer
              </div>
            </div>
          </div>

          {/* 2. Danh từ riêng */}
          <div className="p-3 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">2. Danh từ riêng (Proper Nouns)</h4>
            <p className="text-xs">Tên riêng của người; tên thành phố, toà nhà, địa danh; tên quốc gia & quốc tịch; ngày tháng; tên núi, sông, hồ, biển; lễ hội, ngày lễ.</p>
            <p className="italic text-xs mt-2">Ex: John, London, Vietnam, Monday, Christmas, Mount Everest</p>
          </div>

          {/* 3. Danh từ trừu tượng */}
          <div className="p-3 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-2">3. Danh từ trừu tượng (Abstract Nouns)</h4>
            <p className="text-xs">Chỉ những thứ phi vật thể như cảm xúc, lý tưởng, khái niệm và tính chất.</p>
            <p className="italic text-xs mt-2">Ex: love, happiness, freedom, idea, beauty</p>
          </div>

          {/* 4. Danh từ tập hợp */}
          <div className="p-3 bg-yellow-50 rounded-xl">
            <h4 className="font-bold text-yellow-700 mb-2">4. Danh từ tập hợp (Collective Nouns)</h4>
            <p className="text-xs mb-2">Chỉ nhóm người, động vật hoặc vật.</p>
            <div className="bg-slate-800 text-white p-3 rounded-lg text-xs">
              <p className="font-bold text-yellow-400 mb-2">Danh từ tập hợp đặc biệt:</p>
              <div className="grid grid-cols-2 gap-1">
                <span>• a bunch of keys: chùm chìa khóa</span>
                <span>• a collection of books: bộ sưu tập sách</span>
                <span>• a deck of cards: tép bài</span>
                <span>• a set of stamps: bộ tem</span>
                <span>• a band of robbers: toán cướp</span>
                <span>• a team of players: đội vận động viên</span>
                <span>• a school of fish: đàn cá</span>
                <span>• a herd of cattle: đàn gia súc</span>
                <span>• a pack of wolves: bầy sói</span>
                <span>• a pride of lions: đàn sư tử</span>
              </div>
            </div>
            <div className="mt-2 p-2 bg-white rounded text-xs">
              <p className="italic">Lưu ý: Có thể chia số ít hoặc số nhiều</p>
              <p className="italic">Ex: My family was happy / My family were happy</p>
              <p className="italic text-red-500">Luôn số nhiều: cattle, people, the police</p>
            </div>
          </div>

          {/* 5. Danh từ đếm được */}
          <div className="p-3 bg-teal-50 rounded-xl">
            <h4 className="font-bold text-teal-700 mb-2">5. Danh từ đếm được (Countable Nouns)</h4>
            <ul className="list-disc ml-5 text-xs space-y-1">
              <li>Có thể ở dạng số ít và số nhiều</li>
              <li>Thường đặt SOME/THESE/THOSE + danh từ số nhiều</li>
            </ul>
            <p className="italic text-xs mt-2">Ex: one apple → two apples, a car → many cars</p>
          </div>

          {/* 6. Danh từ không đếm được */}
          <div className="p-3 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 mb-2">6. Danh từ không đếm được (Uncountable Nouns)</h4>
            <ul className="list-disc ml-5 text-xs space-y-1">
              <li>Không thể đong đếm được: salt, oil, water, rice, sugar</li>
              <li>Danh từ số ít + động từ chia ngôi thứ 3 số ít</li>
              <li>"Some" + danh từ không đếm được</li>
              <li>Không dùng a/an với danh từ không đếm được</li>
            </ul>
            <p className="italic text-xs mt-2">Ex: Petrol is expensive / This advice is very useful</p>
            
            {/* Cách đong/đếm danh từ không đếm được */}
            <div className="mt-3 p-2 bg-white rounded-lg">
              <p className="font-bold text-xs">Cách đong/đếm danh từ không đếm được:</p>
              <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                <span>• a bar of chocolate: thanh sô cô la</span>
                <span>• a slice of bread: miếng bánh mì</span>
                <span>• a loaf of bread: ổ bánh mì</span>
                <span>• a glass of juice: ly nước cam</span>
                <span>• a box of chocolates: hộp sô cô la</span>
                <span>• a cup of coffee: tách cà phê</span>
                <span>• a bottle of water: chai nước</span>
                <span>• a tube of toothpaste: tuýp kem đánh răng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Chức năng của danh từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">B. Chức năng của danh từ</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">1. Làm chủ ngữ</p>
            <p className="italic text-xs">Musician plays the piano.</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">2. Làm tân ngữ trực tiếp</p>
            <p className="italic text-xs">He bought a book.</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">3. Làm tân ngữ gián tiếp</p>
            <p className="italic text-xs">Tom gave Mary flowers.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">4. Làm tân ngữ cho giới từ</p>
            <p className="italic text-xs">I will speak to rector.</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700">5. Làm bổ ngữ chủ ngữ</p>
            <p className="italic text-xs">I am a teacher.</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="font-bold text-indigo-700">6. Làm bổ ngữ tân ngữ</p>
            <p className="italic text-xs">They elected him president.</p>
          </div>
        </div>
      </section>

      {/* C. Cách phát âm danh từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">C. Cách phát âm đuôi S/ES</h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3 border text-left">Phát âm /z/</th>
              <th className="p-3 border text-left">Phát âm /s/</th>
              <th className="p-3 border text-left">Phát âm /ɪz/</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">Sau nguyên âm & phụ âm tỏ: /b/, /d/, /g/, /v/, /m/, /n/, /l/, /r/</td>
              <td className="p-3">Sau phụ âm điếc: /f/, /k/, /p/, /t/, /θ/</td>
              <td className="p-3">Sau phụ âm rít: /z/, /s/, /dʒ/, /tʃ/, /ʃ/, /ʒ/</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="p-3 italic">boys, lies, ways, pubs</td>
              <td className="p-3 italic">laughs, walks, cats, books</td>
              <td className="p-3 italic">refuses, passes, watches, boxes</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Danh từ chung</p>
            <p>person, animal</p>
            <p>place, thing</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">Danh từ riêng</p>
            <p>John, London</p>
            <p>Vietnam</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-purple-600">Trừu tượng</p>
            <p>love, idea</p>
            <p>happiness</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-teal-600">Tập hợp</p>
            <p>family, team</p>
            <p>school of fish</p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "Which one is uncountable?", options: ["Pencil", "Water", "Boy", "City"], correct: 1 },
    { q: "Choose the correct sentence:", options: ["She gave me an advice", "She gave me a advice", "She gave me some advice", "She gave me advices"], correct: 2 },
    { q: "What is the plural of 'child'?", options: ["Childs", "Childes", "Children", "Childrens"], correct: 2 },
    { q: "Which word is an abstract noun?", options: ["Table", "Love", "Cat", "School"], correct: 1 }
  ]
},
  {
  id: '7',
  category: 'Danh từ',
  title: '7. Plural Nouns',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Danh từ số nhiều</span>
      </div>

      {/* A. Cách thành lập danh từ số nhiều */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">A. Cách thành lập danh từ số nhiều</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-xl">
            <p className="font-bold text-blue-700">1. Thêm -s</p>
            <p className="italic text-sm">a lamp → lamps</p>
            <p className="italic text-sm">a book → books</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <p className="font-bold text-green-700">2. Thêm -es (x, ch, sh, s, o)</p>
            <p className="italic text-sm">a bench → benches</p>
            <p className="italic text-sm">a box → boxes</p>
            <p className="italic text-sm">a potato → potatoes</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-xl">
            <p className="font-bold text-yellow-700">3. Phụ âm + y → i + es</p>
            <p className="italic text-sm">a city → cities</p>
            <p className="italic text-sm">a baby → babies</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl">
            <p className="font-bold text-purple-700">4. f/fe → v + es</p>
            <p className="italic text-sm">a knife → knives</p>
            <p className="italic text-sm">a leaf → leaves</p>
          </div>
          <div className="p-3 bg-red-50 rounded-xl">
            <p className="font-bold text-red-700">5. Phụ âm + o → es</p>
            <p className="italic text-sm">a potato → potatoes</p>
            <p className="italic text-sm">a tomato → tomatoes</p>
          </div>
          <div className="p-3 bg-teal-50 rounded-xl">
            <p className="font-bold text-teal-700">6. Nguyên âm + o → s</p>
            <p className="italic text-sm">a kangaroo → kangaroos</p>
            <p className="italic text-sm">a radio → radios</p>
          </div>
        </div>

        {/* Danh từ bất quy tắc */}
        <div className="mt-4">
          <h4 className="font-bold text-red-600 underline mb-3">Danh từ số nhiều bất quy tắc (Phải nhớ):</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">man</p>
              <p className="text-green-600">→ men</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">woman</p>
              <p className="text-green-600">→ women</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">child</p>
              <p className="text-green-600">→ children</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">person</p>
              <p className="text-green-600">→ people</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">tooth</p>
              <p className="text-green-600">→ teeth</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">foot</p>
              <p className="text-green-600">→ feet</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">mouse</p>
              <p className="text-green-600">→ mice</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">fish</p>
              <p className="text-green-600">→ fish</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">sheep</p>
              <p className="text-green-600">→ sheep</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">goose</p>
              <p className="text-green-600">→ geese</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">ox</p>
              <p className="text-green-600">→ oxen</p>
            </div>
            <div className="p-2 bg-slate-100 rounded text-center">
              <p className="font-bold">cactus</p>
              <p className="text-green-600">→ cacti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Danh từ luôn ở dạng số nhiều */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">B. Danh từ luôn ở dạng số nhiều</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">jeans</span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">trousers</span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">clothes</span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">shorts</span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">scissors</span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">glasses</span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">pants</span>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <p className="font-bold text-yellow-800">Chú ý:</p>
          <p className="text-sm italic">These jeans are very expensive. (Dùng are, không dùng is)</p>
        </div>
      </section>

      {/* Chỉ thêm S (không thêm ES) */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">C. Chỉ thêm S (không thêm ES)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <span className="p-2 bg-slate-50 rounded">roof → roofs</span>
          <span className="p-2 bg-slate-50 rounded">gulf → gulfs</span>
          <span className="p-2 bg-slate-50 rounded">cliff → cliffs</span>
          <span className="p-2 bg-slate-50 rounded">reef → reefs</span>
          <span className="p-2 bg-slate-50 rounded">proof → proofs</span>
          <span className="p-2 bg-slate-50 rounded">chief → chiefs</span>
          <span className="p-2 bg-slate-50 rounded">safes → safes</span>
          <span className="p-2 bg-slate-50 rounded">dwarf → dwarfs</span>
          <span className="p-2 bg-slate-50 rounded">grief → griefs</span>
          <span className="p-2 bg-slate-50 rounded">belief → beliefs</span>
        </div>
      </section>

      {/* Danh từ có hai hình thức số nhiều */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">D. Danh từ có hai hình thức số nhiều</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold">scarf</p>
            <p className="text-sm">→ scarfs / scarves</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold">wharf</p>
            <p className="text-sm">→ wharfs / wharves</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold">staff</p>
            <p className="text-sm">→ staffs / staves</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold">hoof</p>
            <p className="text-sm">→ hoofs / hooves</p>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-blue-600 mb-2">THÊM -S</p>
            <p>Hầu hết danh từ</p>
            <p className="italic">book → books</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-green-600 mb-2">THÊM -ES</p>
            <p>s, ss, sh, ch, x, o</p>
            <p className="italic">box → boxes</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-red-600 mb-2">BẤT QUY TẮC</p>
            <p>Phải học thuộc</p>
            <p className="italic">man → men</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-1 text-sm list-disc ml-5">
          <li><strong>Khi nào thêm -es?</strong> Có chữ cái cuối: <span className="font-bold text-red-600">S-SH-CH-X-O</span></li>
          <li><strong>Phụ âm + Y</strong> → bỏ Y thêm <span className="font-bold text-green-600">-IES</span></li>
          <li><strong>F/FE</strong> → bỏ F/FE thêm <span className="font-bold text-purple-600">-VES</span></li>
          <li><strong>Nguyên âm + O</strong> → chỉ thêm <span className="font-bold text-blue-600">-S</span></li>
        </ul>
      </section>
    </div>
  ),
  questions: [
    { q: "Plural of 'leaf' is:", options: ["leafs", "leafes", "leaves", "leavies"], correct: 2 },
    { q: "Which is correct plural of 'child'?", options: ["childs", "childes", "children", "childrens"], correct: 2 },
    { q: "What is the plural of 'tooth'?", options: ["tooths", "toothes", "teeth", "teeths"], correct: 2 },
    { q: "Plural of 'potato' is:", options: ["potatos", "potatoes", "potatoies", "potato"], correct: 1 },
    { q: "Which word is always plural?", options: ["Book", "Jeans", "Apple", "Car"], correct: 1 }
  ]
},
  {
  id: '8',
  category: 'Động từ',
  title: '8. Gerunds',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Danh động từ</span>
      </div>

      {/* 8.1. Định nghĩa */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2">8.1. Định nghĩa</h3>
        <div className="space-y-3">
          <p>• <strong>Gerund</strong> là danh từ được hình thành bằng cách thêm đuôi <strong>ING</strong> vào động từ.</p>
          <div className="bg-amber-50 p-4 rounded-xl text-center">
            <p className="font-mono font-bold text-lg">V + ING = Gerund (Danh động từ)</p>
          </div>
          <p>• <strong>Phủ định</strong> của danh động từ: thêm <strong>not</strong> vào trước V-ing</p>
          <p className="italic ml-4">Ex: Not making → Not making mistakes is important.</p>
          <p>• Có thể thêm <strong>tính từ sở hữu</strong> vào trước danh động từ để nói rõ chủ thể thực hiện hành động</p>
          <p className="italic ml-4">Ex: My turning on the air conditioner annoyed him.</p>
        </div>
      </section>

      {/* 8.2. Chức năng của danh động từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2">8.2. Chức năng của danh động từ</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">a. Làm chủ ngữ</h4>
            <p className="italic text-sm">Swimming is good for health.</p>
            <p className="italic text-sm mt-1">Jogging helps you keep fit.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">b. Làm bổ ngữ cho động từ</h4>
            <p className="italic text-sm">Her favorite hobby is collecting stamps.</p>
            <p className="italic text-sm mt-1">My job is teaching English.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-2">c. Làm tân ngữ cho động từ</h4>
            <p className="italic text-sm">She likes cooking.</p>
            <p className="italic text-sm mt-1">I enjoy reading books.</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <h4 className="font-bold text-orange-700 mb-2">d. Sau giới từ và liên từ</h4>
            <p className="italic text-sm">He cleaned his room before going out.</p>
            <p className="italic text-sm mt-1">She is interested in learning French.</p>
          </div>
        </div>
      </section>

      {/* Động từ theo sau bởi V-ing */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2">8.3. Động từ theo sau bởi V-ing</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <span className="p-2 bg-slate-100 rounded">anticipate (đoán trước)</span>
          <span className="p-2 bg-slate-100 rounded">appreciate (hoan nghênh)</span>
          <span className="p-2 bg-slate-100 rounded">avoid (tránh)</span>
          <span className="p-2 bg-slate-100 rounded">consider (xem xét)</span>
          <span className="p-2 bg-slate-100 rounded">deny (từ chối)</span>
          <span className="p-2 bg-slate-100 rounded">delay (trì hoãn)</span>
          <span className="p-2 bg-slate-100 rounded">dislike (không thích)</span>
          <span className="p-2 bg-slate-100 rounded">enjoy (thích thú)</span>
          <span className="p-2 bg-slate-100 rounded">escape (trốn khỏi)</span>
          <span className="p-2 bg-slate-100 rounded">finish (hoàn tất)</span>
          <span className="p-2 bg-slate-100 rounded">forgive (tha thứ)</span>
          <span className="p-2 bg-slate-100 rounded">keep (tiếp tục)</span>
          <span className="p-2 bg-slate-100 rounded">miss (bỏ lỡ)</span>
          <span className="p-2 bg-slate-100 rounded">postpone (trì hoãn)</span>
          <span className="p-2 bg-slate-100 rounded">prevent (ngăn chặn)</span>
          <span className="p-2 bg-slate-100 rounded">stop (dừng)</span>
          <span className="p-2 bg-slate-100 rounded">suggest (đề nghị)</span>
          <span className="p-2 bg-slate-100 rounded">practice (luyện tập)</span>
        </div>
      </section>

      {/* Cụm từ/Thành ngữ + V-ing */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2">8.4. Cụm từ/Thành ngữ + V-ing</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-red-700">can't help / can't bear / can't stand</p>
            <p className="italic text-xs">→ không thể chịu nổi</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">it's (not) worth</p>
            <p className="italic text-xs">→ (không) đáng giá</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">it's no use / it's no good</p>
            <p className="italic text-xs">→ thật vô dụng / vô ích</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">there's no point in</p>
            <p className="italic text-xs">→ chẳng có lý do gì</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">have difficulty (in)</p>
            <p className="italic text-xs">→ có khó khăn trong việc</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700">a waste of money/time</p>
            <p className="italic text-xs">→ tốn tiền/mất thời gian</p>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg">
            <p className="font-bold text-teal-700">be busy (with)</p>
            <p className="italic text-xs">→ bận rộn với</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="font-bold text-indigo-700">look forward to</p>
            <p className="italic text-xs">→ trông mong, chờ đợi</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-orange-700">be / get used to</p>
            <p className="italic text-xs">→ quen với</p>
          </div>
          <div className="p-3 bg-cyan-50 rounded-lg">
            <p className="font-bold text-cyan-700">object to / confess to</p>
            <p className="italic text-xs">→ phản đối / thú nhận</p>
          </div>
        </div>
      </section>

      {/* Giới từ + V-ing */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2">8.5. Giới từ + V-ing</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="font-bold">accuse of (tố cáo)</p>
            <p className="italic text-xs">He was accused of stealing.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="font-bold">suspect of (nghi ngờ)</p>
            <p className="italic text-xs">They suspect him of lying.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="font-bold">be fond of (thích)</p>
            <p className="italic text-xs">I am fond of reading.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="font-bold">be interested in (thích thú)</p>
            <p className="italic text-xs">She is interested in painting.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="font-bold">choice of (lựa chọn)</p>
            <p className="italic text-xs">choice of studying abroad</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="font-bold">reason for (lý do về)</p>
            <p className="italic text-xs">reason for being late</p>
          </div>
        </div>
      </section>

      {/* Động từ theo sau To V hoặc V-ing (nghĩa không đổi) */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2">8.6. Động từ + To V hoặc V-ing (nghĩa không đổi)</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">begin</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">like</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">love</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">continue</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">prefer</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">start</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">hate</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">dread</span>
          <span className="px-3 py-1 bg-green-100 rounded-full text-sm">can't stand</span>
        </div>
        <p className="italic text-sm mt-3">Ex: It started to rain / It started raining. (cả hai đều đúng)</p>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-center text-amber-800 mb-3">TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Chủ ngữ</p>
            <p className="italic">Swimming is fun</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">Bổ ngữ</p>
            <p className="italic">I love swimming</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-purple-600">Sau giới từ</p>
            <p className="italic">good at swimming</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-red-600">Sau cụm từ</p>
            <p className="italic">look forward to swimming</p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "I'm interested in ____.", options: ["cook", "to cook", "cooking", "cooked"], correct: 2 },
    { q: "____ is good for your health.", options: ["Jog", "To jog", "Jogging", "Jogged"], correct: 2 },
    { q: "She enjoys ____ to music.", options: ["listen", "to listen", "listening", "listened"], correct: 2 },
    { q: "I look forward to ____ from you.", options: ["hear", "hearing", "heard", "to hear"], correct: 1 },
    { q: "____ a mistake is human.", options: ["Make", "To make", "Making", "Made"], correct: 2 }
  ]
},
  {
  id: '9',
  category: 'Đại từ',
  title: '9. Pronouns',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Đại từ - Thay thế cho danh từ</span>
      </div>

      {/* 9.1. Định nghĩa */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">9.1. Định nghĩa</h3>
        <p>Đại từ là từ dùng để <strong>thay thế cho danh từ</strong>, tránh sự lặp lại của danh từ trong câu.</p>
        <div className="bg-purple-50 p-3 rounded-lg mt-3">
          <p className="italic text-sm">Ex: <span className="line-through text-gray-400">John</span> <strong>He</strong> is a student.</p>
          <p className="italic text-sm mt-1">Ex: This is <span className="line-through text-gray-400">Mary's book</span> <strong>her</strong> book.</p>
        </div>
      </section>

      {/* 9.2. Phân loại đại từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">9.2. Phân loại đại từ</h3>
        
        {/* a. Đại từ nhân xưng */}
        <div className="mb-6">
          <h4 className="font-bold text-blue-700 mb-3">a. Đại từ nhân xưng (Personal Pronouns)</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-center text-blue-700">Chủ ngữ</p>
              <div className="grid grid-cols-2 gap-1 text-center mt-2">
                <span>I</span><span className="text-gray-500">→ tôi</span>
                <span>You</span><span className="text-gray-500">→ bạn</span>
                <span>He</span><span className="text-gray-500">→ anh ấy</span>
                <span>She</span><span className="text-gray-500">→ cô ấy</span>
                <span>It</span><span className="text-gray-500">→ nó</span>
                <span>We</span><span className="text-gray-500">→ chúng tôi</span>
                <span>They</span><span className="text-gray-500">→ họ</span>
              </div>
              <p className="italic text-xs mt-2">Ex: I am a student.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-bold text-center text-green-700">Tân ngữ</p>
              <div className="grid grid-cols-2 gap-1 text-center mt-2">
                <span>me</span><span className="text-gray-500">→ tôi</span>
                <span>you</span><span className="text-gray-500">→ bạn</span>
                <span>him</span><span className="text-gray-500">→ anh ấy</span>
                <span>her</span><span className="text-gray-500">→ cô ấy</span>
                <span>it</span><span className="text-gray-500">→ nó</span>
                <span>us</span><span className="text-gray-500">→ chúng tôi</span>
                <span>them</span><span className="text-gray-500">→ họ</span>
              </div>
              <p className="italic text-xs mt-2">Ex: She loves me.</p>
            </div>
          </div>
          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
            <p className="font-bold">Lưu ý:</p>
            <p>- Đại từ làm chủ ngữ có thể đứng sau động từ be, than, as...</p>
            <p>- He/She có thể thay thế cho vật nuôi (thông minh, tình cảm)</p>
          </div>
        </div>

        {/* b. Đại từ bất định */}
        <div className="mb-6">
          <h4 className="font-bold text-teal-700 mb-3">b. Đại từ bất định (Indefinite Pronouns)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <span className="p-2 bg-slate-100 rounded">something</span>
            <span className="p-2 bg-slate-100 rounded">someone</span>
            <span className="p-2 bg-slate-100 rounded">somebody</span>
            <span className="p-2 bg-slate-100 rounded">anything</span>
            <span className="p-2 bg-slate-100 rounded">anyone</span>
            <span className="p-2 bg-slate-100 rounded">anybody</span>
            <span className="p-2 bg-slate-100 rounded">everything</span>
            <span className="p-2 bg-slate-100 rounded">everyone</span>
            <span className="p-2 bg-slate-100 rounded">everybody</span>
            <span className="p-2 bg-slate-100 rounded">nothing</span>
            <span className="p-2 bg-slate-100 rounded">no one</span>
            <span className="p-2 bg-slate-100 rounded">nobody</span>
            <span className="p-2 bg-slate-100 rounded">all, one, none</span>
            <span className="p-2 bg-slate-100 rounded">other, another</span>
            <span className="p-2 bg-slate-100 rounded">much, less, few</span>
            <span className="p-2 bg-slate-100 rounded">each, either, neither</span>
          </div>
        </div>

        {/* c. Đại từ sở hữu */}
        <div className="mb-6">
          <h4 className="font-bold text-orange-700 mb-3">c. Đại từ sở hữu (Possessive Pronouns)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">mine</p>
              <p className="text-xs">của tôi</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">yours</p>
              <p className="text-xs">của bạn</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">his</p>
              <p className="text-xs">của anh ấy</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">hers</p>
              <p className="text-xs">của cô ấy</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">its</p>
              <p className="text-xs">của nó</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">ours</p>
              <p className="text-xs">của chúng tôi</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">yours</p>
              <p className="text-xs">của các bạn</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold">theirs</p>
              <p className="text-xs">của họ</p>
            </div>
          </div>
          <p className="italic text-xs mt-2">Ex: This book is mine. (Đại từ sở hữu = tính từ sở hữu + danh từ)</p>
        </div>

        {/* d. Đại từ phản thân */}
        <div className="mb-6">
          <h4 className="font-bold text-red-700 mb-3">d. Đại từ phản thân (Reflexive Pronouns)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-red-50 rounded">myself</div>
            <div className="p-2 bg-red-50 rounded">yourself</div>
            <div className="p-2 bg-red-50 rounded">himself</div>
            <div className="p-2 bg-red-50 rounded">herself</div>
            <div className="p-2 bg-red-50 rounded">itself</div>
            <div className="p-2 bg-red-50 rounded">ourselves</div>
            <div className="p-2 bg-red-50 rounded">yourselves</div>
            <div className="p-2 bg-red-50 rounded">themselves</div>
          </div>
          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
            <p className="font-bold">📌 Chức năng:</p>
            <p>- Làm tân ngữ khi chủ ngữ và tân ngữ cùng người: <span className="italic">I cut myself.</span></p>
            <p>- Sau động từ + giới từ: <span className="italic">She spoke to herself.</span></p>
            <p>- Sau giới từ: <span className="italic">I made it by myself.</span></p>
          </div>
        </div>

        {/* e. Đại từ quan hệ */}
        <div className="mb-6">
          <h4 className="font-bold text-indigo-700 mb-3">e. Đại từ quan hệ (Relative Pronouns)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-indigo-50 rounded">
              <p className="font-bold">who</p>
              <p className="text-xs">chỉ người (chủ ngữ)</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded">
              <p className="font-bold">whom</p>
              <p className="text-xs">chỉ người (tân ngữ)</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded">
              <p className="font-bold">which</p>
              <p className="text-xs">chỉ vật</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded">
              <p className="font-bold">that</p>
              <p className="text-xs">chỉ người/vật</p>
            </div>
          </div>
          <p className="italic text-xs mt-2">Ex: The girl <strong>who</strong> is standing there is my sister.</p>
        </div>

        {/* f. Đại từ chỉ định */}
        <div className="mb-6">
          <h4 className="font-bold text-pink-700 mb-3">f. Đại từ chỉ định (Demonstrative Pronouns)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-pink-50 rounded">
              <p className="font-bold">this</p>
              <p className="text-xs">cái này (số ít, gần)</p>
            </div>
            <div className="p-2 bg-pink-50 rounded">
              <p className="font-bold">that</p>
              <p className="text-xs">cái kia (số ít, xa)</p>
            </div>
            <div className="p-2 bg-pink-50 rounded">
              <p className="font-bold">these</p>
              <p className="text-xs">những cái này (số nhiều, gần)</p>
            </div>
            <div className="p-2 bg-pink-50 rounded">
              <p className="font-bold">those</p>
              <p className="text-xs">những cái kia (số nhiều, xa)</p>
            </div>
          </div>
          <p className="italic text-xs mt-2">Ex: <strong>This</strong> is my house.</p>
        </div>

        {/* g. Đại từ nghi vấn */}
        <div className="mb-6">
          <h4 className="font-bold text-cyan-700 mb-3">g. Đại từ nghi vấn (Interrogative Pronouns)</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-cyan-50 rounded-full">who</span>
            <span className="px-3 py-1 bg-cyan-50 rounded-full">whom</span>
            <span className="px-3 py-1 bg-cyan-50 rounded-full">whose</span>
            <span className="px-3 py-1 bg-cyan-50 rounded-full">what</span>
            <span className="px-3 py-1 bg-cyan-50 rounded-full">which</span>
            <span className="px-3 py-1 bg-cyan-50 rounded-full">where</span>
            <span className="px-3 py-1 bg-cyan-50 rounded-full">when</span>
          </div>
          <p className="italic text-xs mt-2">Ex: <strong>Who</strong> is the winner?</p>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-200">
        <h4 className="font-bold text-center text-purple-800 mb-3">TÓM TẮT CÁC LOẠI ĐẠI TỪ</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-blue-600 text-center">Nhân xưng</p>
            <p className="text-center">I, you, he, she, it, we, they</p>
            <p className="text-center text-gray-500">me, you, him, her, it, us, them</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-orange-600 text-center">Sở hữu</p>
            <p className="text-center">mine, yours, his, hers, ours, theirs</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-red-600 text-center">Phản thân</p>
            <p className="text-center">myself, yourself, himself, herself, itself, ourselves, yourselves, themselves</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-teal-600 text-center">Bất định</p>
            <p className="text-center">something, anything, nothing, everyone...</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-indigo-600 text-center">Quan hệ</p>
            <p className="text-center">who, whom, which, that</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-pink-600 text-center">Chỉ định</p>
            <p className="text-center">this, that, these, those</p>
          </div>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "This is my pen. That is ____.", options: ["you", "your", "yours", "yours's"], correct: 2 },
    { q: "She made this cake by ____.", options: ["her", "hers", "herself", "she"], correct: 2 },
    { q: "____ is the man standing over there?", options: ["Who", "Whom", "Which", "What"], correct: 0 },
    { q: "I hurt ____ while playing football.", options: ["me", "my", "myself", "mine"], correct: 2 },
    { q: "____ are my favorite books.", options: ["This", "That", "These", "It"], correct: 2 }
  ]
},
  {
  id: '10',
  category: 'Động từ',
  title: '10. Verbs',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Động từ</span>
      </div>

      {/* I. Định nghĩa và vị trí */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-sky-700 mb-4 border-b border-sky-200 pb-2">I. Định nghĩa và vị trí thường gặp</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">1. Khái niệm</h4>
            <p>Động từ là từ dùng để <strong>diễn tả hành động</strong> hoặc <strong>trạng thái</strong> của chủ ngữ trong câu.</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Hành động:</span> run, jump, eat, drink, read
              </div>
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Trạng thái:</span> be, seem, appear, feel, know
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">2. Vị trí thường gặp</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Động từ đứng <strong>sau chủ ngữ</strong></li>
              <li>Động từ thường đứng <strong>sau trạng từ chỉ tần suất</strong> (always, usually, often, sometimes, seldom, never)</li>
            </ul>
            <p className="italic text-sm mt-2">Ex: She <strong>always wakes up</strong> early.</p>
          </div>
        </div>
      </section>

      {/* II. Phân loại động từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-sky-700 mb-4 border-b border-sky-200 pb-2">II. Phân loại động từ</h3>
        
        {/* 1. Theo vai trò */}
        <div className="mb-6">
          <h4 className="font-bold text-purple-700 mb-3">1. Theo vai trò của động từ</h4>
          
          <div className="p-4 bg-purple-50 rounded-xl mb-3">
            <p className="font-bold text-purple-700">Trợ động từ (Auxiliary Verbs)</p>
            <p className="text-sm">tobe, to have, to do, can, could, may, might, must, ought, shall, should, will, would, to need, to dare</p>
            <div className="mt-2 p-2 bg-white rounded text-xs">
              <p className="font-bold">Lưu ý về động từ khiếm khuyết (Modal Verbs):</p>
              <p>- Ở ngôi thứ 3 số ít <strong>không thêm "s"</strong>: I can / He can</p>
              <p>- Câu phủ định chỉ thêm <strong>"not"</strong> sau động từ: cannot, must not</p>
              <p>- Câu hỏi đưa <strong>động từ ra đầu câu</strong>: Can you swim?</p>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-xl">
            <p className="font-bold text-yellow-700">To be, To have</p>
            <p className="text-sm">Có thể vừa làm <strong>động từ thường</strong> vừa làm <strong>trợ động từ</strong></p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Động từ thường:</span>
                <p className="italic">I have a car. (có)</p>
                <p className="italic">She is happy. (thì)</p>
              </div>
              <div className="bg-white p-2 rounded">
                <span className="font-bold">Trợ động từ:</span>
                <p className="italic">I have seen it. (thì HTHT)</p>
                <p className="italic">She is singing. (thì HTTD)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Nội động từ và Ngoại động từ */}
        <div className="mb-6">
          <h4 className="font-bold text-teal-700 mb-3">2. Nội động từ và Ngoại động từ</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-teal-50 rounded-xl">
              <p className="font-bold text-teal-700 text-center">Nội động từ (Intransitive Verbs)</p>
              <ul className="list-disc ml-5 text-sm mt-2">
                <li>Diễn tả hành động nội tại của chủ ngữ</li>
                <li><strong>Không cần tân ngữ</strong> đi kèm</li>
                <li>Nếu có tân ngữ thì phải có giới từ</li>
              </ul>
              <p className="italic text-sm mt-2">Ex: He <strong>walks</strong>.</p>
              <p className="italic text-sm">Ex: She <strong>walks in the garden</strong>.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <p className="font-bold text-orange-700 text-center">Ngoại động từ (Transitive Verbs)</p>
              <ul className="list-disc ml-5 text-sm mt-2">
                <li>Diễn tả hành động gây ra trực tiếp lên người/vật</li>
                <li><strong>Luôn cần tân ngữ</strong> đi kèm</li>
                <li>Tân ngữ có thể là danh từ hoặc đại từ</li>
              </ul>
              <p className="italic text-sm mt-2">Ex: The cat <strong>killed the mouse</strong>.</p>
              <p className="italic text-sm">Ex: She <strong>reads a book</strong>.</p>
            </div>
          </div>
        </div>

        {/* 3. Các loại động từ thường gặp */}
        <div className="mb-6">
          <h4 className="font-bold text-indigo-700 mb-3">3. Các loại động từ thường gặp</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Động từ hành động</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Ngoại động từ</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Nội động từ</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Trợ động từ</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Động từ trạng thái</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Động từ tình thái</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Cụm động từ</span>
            <span className="px-3 py-1 bg-indigo-100 rounded-full text-sm">Động từ bất quy tắc</span>
          </div>
        </div>

        {/* Bảng so sánh Nội động từ - Ngoại động từ */}
        <div className="overflow-x-auto">
          <h4 className="font-bold text-gray-700 mb-2">Bảng so sánh</h4>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-sky-600 text-white">
                <th className="p-2 border">Tiêu chí</th>
                <th className="p-2 border">Nội động từ</th>
                <th className="p-2 border">Ngoại động từ</th>
               </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-bold">Tân ngữ</td>
                <td className="p-2">Không cần tân ngữ</td>
                <td className="p-2">Luôn cần tân ngữ</td>
               </tr>
              <tr className="border-b bg-slate-50">
                <td className="p-2 font-bold">Dạng bị động</td>
                <td className="p-2">Không thể chuyển bị động</td>
                <td className="p-2">Có thể chuyển bị động</td>
               </tr>
              <tr className="border-b">
                <td className="p-2 font-bold">Ví dụ</td>
                <td className="p-2 italic">sleep, run, cry, laugh</td>
                <td className="p-2 italic">eat, drink, read, write</td>
               </tr>
            </tbody>
           </table>
        </div>
      </section>

      {/* Ví dụ tổng hợp */}
      <section className="bg-gradient-to-r from-sky-50 to-blue-50 p-5 rounded-2xl border border-sky-200">
        <h4 className="font-bold text-center text-sky-800 mb-3">VÍ DỤ TỔNG HỢP</h4>
        <div className="space-y-2 text-sm">
          <p>• <strong>Nội động từ:</strong> The baby <span className="font-bold text-green-600">cries</span>. (Em bé khóc - không cần tân ngữ)</p>
          <p>• <strong>Ngoại động từ:</strong> The baby <span className="font-bold text-red-600">drinks milk</span>. (Em bé uống sữa - cần tân ngữ "milk")</p>
          <p>• <strong>Trợ động từ:</strong> She <span className="font-bold text-purple-600">is</span> reading. (is là trợ động từ)</p>
          <p>• <strong>Động từ khiếm khuyết:</strong> You <span className="font-bold text-orange-600">must</span> study hard.</p>
        </div>
      </section>

      {/* Mẹo phân biệt */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">MẸO PHÂN BIỆT</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>🔍 Thử đặt câu hỏi "Ai? / Cái gì?"</strong> sau động từ</li>
          <li>→ Nếu có câu trả lời: <span className="font-bold text-green-600">Ngoại động từ</span></li>
          <li>→ Nếu không có câu trả lời: <span className="font-bold text-blue-600">Nội động từ</span></li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded">
          <p className="italic">Ex: He <strong>eats</strong> → Eats what? → "an apple" → Ngoại động từ</p>
          <p className="italic mt-1">Ex: He <strong>sleeps</strong> → Sleeps what? → (không có) → Nội động từ</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "In 'He sleeps', the verb is:", options: ["Transitive", "Intransitive", "Modal", "Helping"], correct: 1 },
    { q: "Which sentence has a transitive verb?", options: ["She runs fast.", "He sleeps well.", "She reads a book.", "The baby cries."], correct: 2 },
    { q: "What type of verb is 'must'?", options: ["Transitive", "Intransitive", "Modal", "Regular"], correct: 2 },
    { q: "In 'She is singing', 'is' is a(n):", options: ["Main verb", "Auxiliary verb", "Transitive verb", "Intransitive verb"], correct: 1 }
  ]
},
  {
  id: '11',
  category: 'Động từ',
  title: '11. Infinitives',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Động từ nguyên mẫu - To V và V-bare</span>
      </div>

      {/* A. Động từ nguyên mẫu có "to" */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">A. Động từ nguyên mẫu có "to" (To infinitive)</h3>
        
        <div className="space-y-5">
          {/* 1. Làm chủ ngữ */}
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">1. Làm chủ ngữ của câu</h4>
            <p className="italic">To visit Paris is my life-long dream.</p>
            <p className="italic mt-1">To learn English is necessary.</p>
          </div>

          {/* 2. Làm tân ngữ của tính từ */}
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">2. Làm tân ngữ của tính từ</h4>
            <p className="italic">It's good to talk.</p>
            <p className="italic mt-1">It's important to arrive on time.</p>
            <p className="italic mt-1">It's difficult to solve this problem.</p>
          </div>

          {/* 3. Làm tân ngữ của động từ */}
          <div className="p-4 bg-yellow-50 rounded-xl">
            <h4 className="font-bold text-yellow-700 mb-2">3. Làm tân ngữ của động từ</h4>
            <p className="text-xs mb-2">Các động từ thường gặp + To V:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-xs">
              <span className="p-1 bg-white rounded">hope (hy vọng)</span>
              <span className="p-1 bg-white rounded">offer (đề nghị)</span>
              <span className="p-1 bg-white rounded">expect (mong đợi)</span>
              <span className="p-1 bg-white rounded">plan (lên kế hoạch)</span>
              <span className="p-1 bg-white rounded">refuse (từ chối)</span>
              <span className="p-1 bg-white rounded">want (muốn)</span>
              <span className="p-1 bg-white rounded">promise (hứa)</span>
              <span className="p-1 bg-white rounded">pretend (giả vờ)</span>
              <span className="p-1 bg-white rounded">fail (thất bại)</span>
              <span className="p-1 bg-white rounded">attempt (cố gắng)</span>
              <span className="p-1 bg-white rounded">tend (có khuynh hướng)</span>
              <span className="p-1 bg-white rounded">threaten (đe dọa)</span>
              <span className="p-1 bg-white rounded">seem (dường như)</span>
              <span className="p-1 bg-white rounded">decide (quyết định)</span>
              <span className="p-1 bg-white rounded">manage (xoay sở)</span>
              <span className="p-1 bg-white rounded">agree (đồng ý)</span>
              <span className="p-1 bg-white rounded">afford (đáp ứng)</span>
              <span className="p-1 bg-white rounded">arrange (sắp xếp)</span>
              <span className="p-1 bg-white rounded">appear (hình như)</span>
              <span className="p-1 bg-white rounded">learn (học)</span>
              <span className="p-1 bg-white rounded">would like (muốn)</span>
              <span className="p-1 bg-white rounded">intend (định)</span>
            </div>
            <p className="italic text-sm mt-3">Ex: She decided <strong>to go</strong> to the party.</p>
          </div>

          {/* 4. Cấu trúc Verbs + Object + To infinitive */}
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-2">4. Cấu trúc Verbs + Object + To infinitive</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-xs">
              <span className="p-1 bg-white rounded">advise (khuyên)</span>
              <span className="p-1 bg-white rounded">allow (cho phép)</span>
              <span className="p-1 bg-white rounded">ask (hỏi)</span>
              <span className="p-1 bg-white rounded">beg (cầu xin)</span>
              <span className="p-1 bg-white rounded">cause (gây ra)</span>
              <span className="p-1 bg-white rounded">challenge (thử thách)</span>
              <span className="p-1 bg-white rounded">convince (thuyết phục)</span>
              <span className="p-1 bg-white rounded">encourage (khuyến khích)</span>
              <span className="p-1 bg-white rounded">expect (mong chờ)</span>
              <span className="p-1 bg-white rounded">forbid (ngăn cấm)</span>
              <span className="p-1 bg-white rounded">force (bắt buộc)</span>
              <span className="p-1 bg-white rounded">hire (thuê)</span>
              <span className="p-1 bg-white rounded">instruct (hướng dẫn)</span>
              <span className="p-1 bg-white rounded">invite (mời)</span>
              <span className="p-1 bg-white rounded">need (cần)</span>
              <span className="p-1 bg-white rounded">order (gọi món)</span>
              <span className="p-1 bg-white rounded">permit (cho phép)</span>
              <span className="p-1 bg-white rounded">persuade (thuyết phục)</span>
              <span className="p-1 bg-white rounded">remind (nhắc nhở)</span>
              <span className="p-1 bg-white rounded">require (yêu cầu)</span>
              <span className="p-1 bg-white rounded">recommend (giới thiệu)</span>
              <span className="p-1 bg-white rounded">teach (dạy)</span>
              <span className="p-1 bg-white rounded">tell (nói)</span>
              <span className="p-1 bg-white rounded">urge (thúc giục)</span>
              <span className="p-1 bg-white rounded">want (muốn)</span>
              <span className="p-1 bg-white rounded">warn (cảnh báo)</span>
            </div>
            <p className="italic text-sm mt-3">Ex: She told me <strong>to wait</strong> here.</p>
          </div>

          {/* 5. Sau từ nghi vấn */}
          <div className="p-4 bg-teal-50 rounded-xl">
            <h4 className="font-bold text-teal-700 mb-2">5. Đứng sau từ nghi vấn</h4>
            <p className="text-sm">Các từ: <strong>who, what, when, where, which, how</strong></p>
            <p className="italic text-sm mt-2">Ex: I don't know <strong>what to do</strong>.</p>
            <p className="italic text-sm">Ex: She showed me <strong>how to cook</strong>.</p>
            <div className="mt-2 p-2 bg-red-100 rounded text-xs">
              <p className="font-bold">Lưu ý:</p>
              <p>Không dùng To V sau <strong>Why</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* B. Động từ nguyên mẫu không "to" */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">B. Động từ nguyên mẫu không "to" (Bare infinitive)</h3>
        
        <div className="space-y-5">
          {/* 1. make/let/help */}
          <div className="p-4 bg-orange-50 rounded-xl">
            <h4 className="font-bold text-orange-700 mb-2">1. Sau make / let / help</h4>
            <p className="font-mono text-sm">S + make/let/help + object + V (nguyên mẫu)</p>
            <p className="italic text-sm mt-2">Ex: She <strong>made me cry</strong>.</p>
            <p className="italic text-sm">Ex: <strong>Let me go</strong>.</p>
            <p className="italic text-sm">Ex: He <strong>helped me clean</strong> the room.</p>
          </div>

          {/* 2. Động từ chỉ giác quan */}
          <div className="p-4 bg-pink-50 rounded-xl">
            <h4 className="font-bold text-pink-700 mb-2">2. Sau động từ chỉ cảm giác, giác quan</h4>
            <p className="font-mono text-sm">S + verbs of perception + object + V / V-ing</p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="px-2 py-0.5 bg-white rounded text-xs">hear</span>
              <span className="px-2 py-0.5 bg-white rounded text-xs">see</span>
              <span className="px-2 py-0.5 bg-white rounded text-xs">watch</span>
              <span className="px-2 py-0.5 bg-white rounded text-xs">notice</span>
              <span className="px-2 py-0.5 bg-white rounded text-xs">feel</span>
              <span className="px-2 py-0.5 bg-white rounded text-xs">listen</span>
              <span className="px-2 py-0.5 bg-white rounded text-xs">smell</span>
            </div>
            <div className="mt-2 p-2 bg-white rounded text-xs">
              <p><span className="font-bold">V (nguyên mẫu):</span> thấy/nghe toàn bộ sự việc</p>
              <p className="italic">I saw her <strong>cross</strong> the street.</p>
              <p><span className="font-bold mt-1">V-ing:</span> thấy/nghe một phần sự việc</p>
              <p className="italic">I saw her <strong>crossing</strong> the street.</p>
            </div>
          </div>

          {/* 3. had better */}
          <div className="p-4 bg-cyan-50 rounded-xl">
            <h4 className="font-bold text-cyan-700 mb-2">3. Sau "had better"</h4>
            <p className="font-mono text-sm">S + had better + V (nguyên mẫu)</p>
            <p className="italic text-sm mt-2">Ex: We <strong>had better take</strong> some warm clothing.</p>
            <p className="italic text-sm">Ex: You <strong>had better see</strong> a doctor.</p>
          </div>

          {/* 4. Why */}
          <div className="p-4 bg-lime-50 rounded-xl">
            <h4 className="font-bold text-lime-700 mb-2">4. Sử dụng với WHY</h4>
            <p className="text-sm">Dùng để đưa ra lời đề nghị</p>
            <p className="italic text-sm mt-2">Ex: <strong>Why wait</strong> until tomorrow?</p>
            <p className="italic text-sm">Ex: <strong>Why not try</strong> again?</p>
          </div>
        </div>
      </section>

      {/* Bảng so sánh To V và V-ing */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">SO SÁNH TO V và V-ING</h4>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-green-600 mb-2">TO V</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Chỉ mục đích</li>
              <li>Chỉ dự định, kế hoạch</li>
              <li>Sau động từ: want, hope, decide...</li>
            </ul>
            <p className="italic mt-2">I want <strong>to learn</strong> English.</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="font-bold text-center text-orange-600 mb-2">V-ING</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Chỉ sở thích, thói quen</li>
              <li>Chỉ hành động đang diễn ra</li>
              <li>Sau động từ: enjoy, like, avoid...</li>
            </ul>
            <p className="italic mt-2">I enjoy <strong>learning</strong> English.</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">💡 MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Động từ + To V:</strong> want, hope, decide, plan, promise, refuse, agree, learn, would like</li>
          <li><strong>Động từ + V-ing:</strong> enjoy, like, love, hate, avoid, consider, finish, practice</li>
          <li><strong>Động từ + To V/V-ing (nghĩa không đổi):</strong> begin, start, continue, like, love, hate</li>
          <li><strong>Động từ + V (nguyên mẫu):</strong> make, let, help, see, hear, watch, feel</li>
        </ul>
      </section>
    </div>
  ),
  questions: [
    { q: "She decided ____ to the party.", options: ["go", "to go", "going", "goes"], correct: 1 },
    { q: "You had better ____ a doctor.", options: ["see", "to see", "seeing", "saw"], correct: 0 },
    { q: "I saw her ____ the street.", options: ["cross", "to cross", "crossing", "crossed"], correct: 0 },
    { q: "She made me ____.", options: ["cry", "to cry", "crying", "cried"], correct: 0 },
    { q: "It's important ____ on time.", options: ["arrive", "to arrive", "arriving", "arrived"], correct: 1 }
  ]
},
  {
  id: '12',
  category: 'Động từ',
  title: '12. Modal Verbs',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Động từ khuyết thiếu</span>
      </div>

      {/* 12.1. Modal verb là gì? */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">12.1. Modal verb là gì?</h3>
        <div className="space-y-3">
          <p>• Động từ khuyết thiếu là động từ <strong>không chỉ hành động</strong> mà <strong>bổ nghĩa</strong> cho động từ chính.</p>
          <div className="bg-indigo-50 p-4 rounded-xl">
            <p className="font-bold text-indigo-700">Đặc điểm:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Không chia theo ngôi thứ 3 số ít: <span className="italic">I can / He can</span> (không thêm "s")</li>
              <li>Không cần trợ động từ trong câu hỏi, câu phủ định, câu hỏi đuôi</li>
              <li>Luôn đi kèm với động từ chính ở dạng <strong>nguyên mẫu không "to"</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 12.2. Các loại Modal Verbs */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">12.2. Các loại Modal Verbs</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 border text-left">Modal Verb</th>
                <th className="p-3 border text-left">Chức năng</th>
                <th className="p-3 border text-left">Cách dùng</th>
                <th className="p-3 border text-left">Ví dụ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-blue-600">Can</td>
                <td className="p-3">Diễn tả khả năng hiện tại hoặc tương lai</td>
                <td className="p-3">Có khả năng, sự cho phép</td>
                <td className="p-3 italic">You can speak Spanish.</td>
              </tr>
              <tr className="border-b bg-slate-50 hover:bg-slate-100">
                <td className="p-3 font-bold text-blue-600">Could</td>
                <td className="p-3">Diễn tả khả năng trong quá khứ<br/>Đề nghị, xin phép lịch sự</td>
                <td className="p-3">Quá khứ của Can<br/>Lịch sự hơn Can</td>
                <td className="p-3 italic">Could you please wait?</td>
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-red-600">Must</td>
                <td className="p-3">Diễn đạt sự cần thiết, bắt buộc<br/>Đưa ra lời đoán chắc chắn</td>
                <td className="p-3">Nghĩa vụ bắt buộc<br/>Mustn't = cấm đoán</td>
                <td className="p-3 italic">You must get up early.</td>
              </tr>
              <tr className="border-b bg-slate-50 hover:bg-slate-100">
                <td className="p-3 font-bold text-orange-600">Have to</td>
                <td className="p-3">Sự cần thiết do khách quan (nội quy, quy định)</td>
                <td className="p-3">Don't have to = không cần thiết</td>
                <td className="p-3 italic">I have to stop smoking.</td>
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-green-600">May</td>
                <td className="p-3">Diễn tả điều có thể xảy ra ở hiện tại<br/>Xin phép (trang trọng)</td>
                <td className="p-3">Khả năng có thể xảy ra (không chắc chắn)</td>
                <td className="p-3 italic">May I come in?</td>
              </tr>
              <tr className="border-b bg-slate-50 hover:bg-slate-100">
                <td className="p-3 font-bold text-green-600">Might</td>
                <td className="p-3">Diễn tả điều có thể xảy ra (ít chắc chắn hơn May)</td>
                <td className="p-3">Quá khứ của May<br/>Dùng trong câu gián tiếp</td>
                <td className="p-3 italic">She might not be at home.</td>
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-purple-600">Will</td>
                <td className="p-3">Dự đoán việc xảy ra trong tương lai<br/>Đề nghị, yêu cầu, lời mời</td>
                <td className="p-3">Chắc chắn xảy ra</td>
                <td className="p-3 italic">Tomorrow will be sunny.</td>
              </tr>
              <tr className="border-b bg-slate-50 hover:bg-slate-100">
                <td className="p-3 font-bold text-purple-600">Would</td>
                <td className="p-3">Giả định, dự đoán trong quá khứ<br/>Lời mời lịch sự</td>
                <td className="p-3">Quá khứ của Will</td>
                <td className="p-3 italic">Would you like a cake?</td>
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-teal-600">Shall</td>
                <td className="p-3">Xin ý kiến, lời khuyên (chủ ngữ I/We)</td>
                <td className="p-3">Ít dùng, thường dùng Will</td>
                <td className="p-3 italic">Where shall we eat tonight?</td>
              </tr>
              <tr className="border-b bg-slate-50 hover:bg-slate-100">
                <td className="p-3 font-bold text-yellow-600">Should</td>
                <td className="p-3">Lời khuyên, ý kiến<br/>Suy đoán (nhẹ hơn Must)</td>
                <td className="p-3">Nên làm gì (không bắt buộc)</td>
                <td className="p-3 italic">You should exercise regularly.</td>
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-yellow-600">Ought to</td>
                <td className="p-3">Bắt buộc (mạnh hơn Should, nhẹ hơn Must)</td>
                <td className="p-3">Nên làm (mang tính trách nhiệm)</td>
                <td className="p-3 italic">You ought not to eat candy at night.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Công thức và cách dùng chi tiết */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">12.3. Công thức và cách dùng</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 text-center">Khẳng định</h4>
            <p className="font-mono text-center text-sm">S + Modal V + V(nguyên mẫu)</p>
            <p className="italic text-sm text-center mt-2">She can swim.</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 text-center">Phủ định</h4>
            <p className="font-mono text-center text-sm">S + Modal V + not + V(nguyên mẫu)</p>
            <p className="italic text-sm text-center mt-2">She cannot (can't) swim.</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 text-center">Nghi vấn</h4>
            <p className="font-mono text-center text-sm">Modal V + S + V(nguyên mẫu)?</p>
            <p className="italic text-sm text-center mt-2">Can she swim?</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 text-center">Câu hỏi đuôi</h4>
            <p className="font-mono text-center text-sm">S + V..., Modal V + not + S?</p>
            <p className="italic text-sm text-center mt-2">She can swim, can't she?</p>
          </div>
        </div>
      </section>

      {/* So sánh Must và Have to */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">12.4. So sánh Must và Have to</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-bold text-red-700 text-center">MUST</p>
            <ul className="list-disc ml-5 text-sm mt-2">
              <li>Chủ quan (do bản thân cảm thấy cần)</li>
              <li>Không có dạng quá khứ</li>
              <li>Mustn't = cấm đoán</li>
            </ul>
            <p className="italic text-sm mt-2">I must study harder. (tự thấy cần)</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="font-bold text-blue-700 text-center">HAVE TO</p>
            <ul className="list-disc ml-5 text-sm mt-2">
              <li>Khách quan (do hoàn cảnh bắt buộc)</li>
              <li>Có dạng quá khứ (had to)</li>
              <li>Don't have to = không cần thiết</li>
            </ul>
            <p className="italic text-sm mt-2">I have to wear uniform. (nội quy)</p>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt nhanh */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Can/Could</p>
            <p>Khả năng</p>
            <p className="italic text-gray-500">I can run</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-red-600">Must</p>
            <p>Bắt buộc</p>
            <p className="italic text-gray-500">You must go</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">May/Might</p>
            <p>Có thể</p>
            <p className="italic text-gray-500">It may rain</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-yellow-600">Should</p>
            <p>Nên làm</p>
            <p className="italic text-gray-500">You should try</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-purple-600">Will/Would</p>
            <p>Sẽ, muốn</p>
            <p className="italic text-gray-500">I will come</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Can/Could</strong> → khả năng, xin phép (Could lịch sự hơn)</li>
          <li><strong>Must/Have to</strong> → bắt buộc (Must chủ quan, Have to khách quan)</li>
          <li><strong>May/Might</strong> → có thể xảy ra (Might không chắc chắn bằng May)</li>
          <li><strong>Should/Ought to</strong> → lời khuyên (Ought to mạnh hơn Should)</li>
          <li><strong>Will/Would</strong> → tương lai, lời mời (Would lịch sự hơn)</li>
          <li><strong>Shall</strong> → dùng với I/We, ít phổ biến</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">Lưu ý: Sau Modal Verb luôn là <span className="text-red-500">động từ nguyên mẫu KHÔNG "to"</span></p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "You ____ smoke here. It's forbidden.", options: ["can", "should", "mustn't", "don't have to"], correct: 2 },
    { q: "____ you please help me?", options: ["Must", "Should", "Could", "Ought"], correct: 2 },
    { q: "She ____ speak three languages.", options: ["can", "must", "should", "may"], correct: 0 },
    { q: "You look tired. You ____ take a rest.", options: ["must", "should", "can", "may"], correct: 1 },
    { q: "I ____ wear a uniform to school every day.", options: ["must", "have to", "can", "may"], correct: 1 }
  ]
},
  {
  id: '13',
  category: 'Giới từ',
  title: '13. Prepositions',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Giới từ chỉ thời gian và nơi chốn</span>
      </div>

      {/* 13.1. Giới từ At */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">13.1. Giới từ AT</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">A. Chỉ nơi chốn</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Dùng khi nói về <strong>vị trí tương đối</strong></li>
              <li><strong>At + số nhà:</strong> <span className="italic">He lives at 25 Main Street.</span></li>
              <li>Trước <strong>sự kiện</strong> để ám chỉ nơi diễn ra sự kiện: <span className="italic">at the concert, at the meeting</span></li>
              <li>Cụm từ cố định: <span className="italic">at work, at sea, at the top, at the bottom, at the corner of the street</span></li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">B. Chỉ thời gian</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Trước <strong>giờ cụ thể:</strong> <span className="italic">at 7 AM, at 5 o'clock</span></li>
              <li>Trước <strong>dịp lễ, sự kiện:</strong> <span className="italic">at Christmas, at Easter</span></li>
              <li>Cụm từ cố định: <span className="italic">at the moment, at the same time, at night, at the weekend, at present</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 13.2. Giới từ In */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">13.2. Giới từ IN</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">A. Chỉ nơi chốn</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Dùng với <strong>không gian khép kín hoặc được bao quanh</strong></li>
              <li>Dùng với <strong>không gian có biên giới</strong> (thành phố, quốc gia, khu vực)</li>
              <li>Cụm từ cố định: <span className="italic">in a row, in a line, in bed, in the middle, in the corner of the room</span></li>
              <li className="italic text-gray-600">Ex: in the room, in the box, in Hanoi, in Vietnam</li>
            </ul>
          </div>
          
          <div className="p-4 bg-teal-50 rounded-xl">
            <h4 className="font-bold text-teal-700 mb-2">B. Chỉ thời gian</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li><strong>Buổi trong ngày:</strong> <span className="italic">in the morning, in the afternoon, in the evening</span></li>
              <li><strong>Tháng, năm, mùa, thế kỷ:</strong> <span className="italic">in May, in 2024, in summer, in the 21st century</span></li>
              <li><strong>Khoảng thời gian:</strong> <span className="italic">in a few minutes, in two weeks</span></li>
              <li>Cụm từ cố định: <span className="italic">in time (kịp giờ)</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 13.3. Giới từ On */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">13.3. Giới từ ON</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-2">A. Chỉ nơi chốn</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Diễn tả <strong>sự vật trên bề mặt</strong> của sự vật khác</li>
              <li>Cụm từ cố định: <span className="italic">on the left, on the right, on a farm, on the table, on the wall</span></li>
              <li className="italic text-gray-600">Ex: The book is on the table.</li>
            </ul>
          </div>
          
          <div className="p-4 bg-pink-50 rounded-xl">
            <h4 className="font-bold text-pink-700 mb-2">B. Chỉ thời gian</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li><strong>Thứ trong tuần:</strong> <span className="italic">on Monday, on Tuesday</span></li>
              <li><strong>Ngày tháng:</strong> <span className="italic">on May 1st, on my birthday</span></li>
              <li><strong>Ngày tháng năm cụ thể:</strong> <span className="italic">on January 1st, 2024</span></li>
              <li>Cụm từ cố định: <span className="italic">on time (đúng giờ)</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bảng so sánh tổng hợp */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">13.4. Bảng so sánh tổng hợp</h3>
        
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3 border">Giới từ</th>
              <th className="p-3 border">Nơi chốn</th>
              <th className="p-3 border">Thời gian</th>
              <th className="p-3 border">Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-bold text-blue-600">AT</td>
              <td className="p-3">Điểm cụ thể, vị trí tương đối</td>
              <td className="p-3">Giờ, dịp lễ</td>
              <td className="p-3 italic">at 5 PM, at the door</td>
            </tr>
            <tr className="border-b bg-slate-50">
              <td className="p-3 font-bold text-green-600">IN</td>
              <td className="p-3">Không gian khép kín, có biên giới</td>
              <td className="p-3">Tháng, năm, mùa, thế kỷ</td>
              <td className="p-3 italic">in 2024, in the room</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-bold text-purple-600">ON</td>
              <td className="p-3">Trên bề mặt</td>
              <td className="p-3">Thứ, ngày tháng</td>
              <td className="p-3 italic">on Monday, on the table</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Ví dụ chi tiết */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">VÍ DỤ CHI TIẾT</h4>
        <div className="space-y-2 text-sm">
          <p><span className="font-bold text-blue-600">AT:</span> <span className="italic">at 8 AM, at noon, at night, at Christmas, at the corner, at work</span></p>
          <p><span className="font-bold text-green-600">IN:</span> <span className="italic">in the morning, in summer, in 2024, in Hanoi, in the box, in time</span></p>
          <p><span className="font-bold text-purple-600">ON:</span> <span className="italic">on Sunday, on June 1st, on the table, on the wall, on the left, on time</span></p>
        </div>
      </section>

      {/* Lưu ý đặc biệt */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">LƯU Ý ĐẶC BIỆT</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>At the moment</strong> (ngay lúc này) ≠ <strong>in a moment</strong> (lát nữa)</li>
          <li><strong>At night</strong> (vào ban đêm) ≠ <strong>in the night</strong> (trong đêm)</li>
          <li><strong>At the weekend</strong> (cuối tuần - Anh-Anh) = <strong>on the weekend</strong> (cuối tuần - Anh-Mỹ)</li>
          <li><strong>On time</strong> (đúng giờ) ≠ <strong>in time</strong> (kịp giờ, sớm hơn một chút)</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">MẸO GHI NHỚ:</p>
          <p>AT + giờ, dịp lễ / IN + tháng, năm, mùa / ON + thứ, ngày</p>
          <p className="mt-1">AT + điểm đến / IN + không gian lớn / ON + bề mặt</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "The meeting is ____ Monday.", options: ["in", "at", "on", "from"], correct: 2 },
    { q: "I usually wake up ____ 7 AM.", options: ["in", "at", "on", "for"], correct: 1 },
    { q: "She was born ____ 2010.", options: ["in", "at", "on", "since"], correct: 0 },
    { q: "The book is ____ the table.", options: ["in", "at", "on", "under"], correct: 2 },
    { q: "We often go to the beach ____ summer.", options: ["in", "at", "on", "during"], correct: 0 }
  ]
},
  {
  id: '14',
  category: 'Câu mệnh lệnh',
  title: '14. Imperative Sentences',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Câu mệnh lệnh</span>
      </div>

      {/* 14.1. Dạng thức câu mệnh lệnh */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-red-700 mb-4 border-b border-red-200 pb-2">14.1. Dạng thức câu mệnh lệnh</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 text-center mb-2">Dạng khẳng định</h4>
            <p className="font-mono text-center text-lg">V + ...</p>
            <p className="italic text-center mt-2">Take a seat, please.</p>
            <p className="italic text-center">Come in!</p>
            <p className="italic text-center">Sit down.</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 text-center mb-2">Dạng phủ định</h4>
            <p className="font-mono text-center text-lg">Don't + V + ...</p>
            <p className="italic text-center mt-2">Don't copy your friends' work!</p>
            <p className="italic text-center">Don't be late.</p>
            <p className="italic text-center">Don't talk in class.</p>
          </div>
        </div>
      </section>

      {/* 14.2. Cách dùng */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-red-700 mb-4 border-b border-red-200 pb-2">14.2. Cách dùng câu mệnh lệnh</h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">Biển báo hoặc thông cáo</p>
            <p className="italic text-sm">Turn right.</p>
            <p className="italic text-sm">No parking.</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">Lời chỉ dẫn</p>
            <p className="italic text-sm">Add some sugar!</p>
            <p className="italic text-sm">Mix well.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Lời mời</p>
            <p className="italic text-sm">Have a seat.</p>
            <p className="italic text-sm">Help yourself.</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">Lời khuyên</p>
            <p className="italic text-sm">Don't drive too fast.</p>
            <p className="italic text-sm">Eat more vegetables.</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700">Lời chúc</p>
            <p className="italic text-sm">Have a good time!</p>
            <p className="italic text-sm">Enjoy your meal!</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-orange-700">Lời yêu cầu</p>
            <p className="italic text-sm">Please close the door.</p>
            <p className="italic text-sm">Open your book.</p>
          </div>
        </div>
      </section>

      {/* 14.3. Các dạng mệnh lệnh đặc biệt */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-red-700 mb-4 border-b border-red-200 pb-2">14.3. Các dạng mệnh lệnh đặc biệt</h3>
        
        <div className="space-y-5">
          {/* Ngôi thứ 2 */}
          <div className="p-4 bg-sky-50 rounded-xl">
            <h4 className="font-bold text-sky-700 mb-2">A. Câu mệnh lệnh với ngôi thứ 2 (You - người nghe)</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Hình thức: <strong>Động từ nguyên mẫu (Bare infinitive)</strong></li>
              <li className="italic">Hurry! (Nhanh lên!)</li>
              <li>Có thể thêm danh từ đứng cuối để xác định đối tượng: <span className="italic">Eat your dinner, boy.</span></li>
              <li>Dùng <strong>"Do"</strong> đặt trước động từ để nhấn mạnh: <span className="italic">Do sit down! (Hãy ngồi xuống đi!)</span></li>
            </ul>
          </div>

          {/* Ngôi thứ 1 */}
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">B. Câu mệnh lệnh với ngôi thứ 1 (We - chúng ta)</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Cấu trúc: <strong>Let's + V (nguyên mẫu)</strong></li>
              <li className="italic">Let's go to the cinema tonight.</li>
              <li className="italic">Let us stand together in this emergency.</li>
              <li>Dùng để rủ rê, gợi ý cùng làm gì đó</li>
            </ul>
          </div>

          {/* Ngôi thứ 3 */}
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-2">C. Câu mệnh lệnh với ngôi thứ 3 (He/She/It/They)</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Cấu trúc: <strong>Let + him/her/it/them + V (nguyên mẫu)</strong></li>
              <li className="italic">Let them go by train.</li>
              <li className="italic">Let him do it himself.</li>
              <li>Phủ định: <strong>Do not let + O + V</strong> (thông dụng hơn)</li>
              <li className="italic">Don't let him go alone.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 14.4. Lưu ý khi dùng câu mệnh lệnh */}
      <section className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-2">LƯU Ý QUAN TRỌNG</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Thêm "please"</strong> vào đầu hoặc cuối câu để lịch sự hơn: <span className="italic">Please sign here. / Come in, please.</span></li>
          <li><strong>Kết thúc câu</strong> bằng dấu chấm hoặc dấu chấm than: <span className="italic">Come in, please! / Close the door.</span></li>
          <li><strong>Đặt "Never/Always"</strong> ở đầu câu để nhấn mạnh: <span className="italic">Never cross the road alone. / Always tell the truth.</span></li>
          <li><strong>Chủ ngữ "You"</strong> thường được ẩn đi, nhưng có thể thêm vào để nhấn mạnh: <span className="italic">You be quiet!</span></li>
        </ul>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-2xl border border-red-200">
        <h4 className="font-bold text-center text-red-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">Khẳng định</p>
            <p className="font-mono">V + ...</p>
            <p className="italic text-gray-500">Sit down</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-red-600">Phủ định</p>
            <p className="font-mono">Don't + V</p>
            <p className="italic text-gray-500">Don't run</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Rủ rê</p>
            <p className="font-mono">Let's + V</p>
            <p className="italic text-gray-500">Let's go</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Khẳng định:</strong> Bắt đầu bằng động từ nguyên mẫu</li>
          <li><strong>Phủ định:</strong> Thêm Don't trước động từ</li>
          <li><strong>Lịch sự:</strong> Thêm please ở đầu hoặc cuối</li>
          <li><strong>Rủ rê:</strong> Dùng Let's + động từ</li>
          <li><strong>Nhấn mạnh:</strong> Thêm Do/Always/Never ở đầu câu</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÔNG THỨC NHANH:</p>
          <p>✓ V + O → Khẳng định</p>
          <p>✓ Don't + V + O → Phủ định</p>
          <p>✓ Let's + V → Đề nghị cùng làm</p>
          <p>✓ Please + V → Yêu cầu lịch sự</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "____ your homework now!", options: ["Do", "To do", "Doing", "Does"], correct: 0 },
    { q: "____ late for school!", options: ["Be", "Don't be", "Not be", "Aren't"], correct: 1 },
    { q: "____ go to the park this afternoon.", options: ["Let", "Let's", "Lets", "Let us to"], correct: 1 },
    { q: "____ cross the road when the light is red.", options: ["Do", "Always", "Never", "Please"], correct: 2 },
    { q: "____ the door when you leave.", options: ["Closing", "To close", "Close", "Closed"], correct: 2 }
  ]
},
  {
  id: '15',
  category: 'Câu hỏi đuôi',
  title: '15. Question Tag',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Câu hỏi đuôi</span>
      </div>

      {/* 15.1. Khái niệm và cách dùng */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">15.1. Khái niệm và cách dùng</h3>
        <div className="space-y-3">
          <p><strong>Khái niệm:</strong> Câu hỏi đuôi là cấu trúc gồm mệnh đề chính + câu hỏi ngắn ở sau, ngăn cách bởi dấu phẩy.</p>
          <p><strong>Chức năng:</strong> Xác nhận lại thông tin đúng hay sai (giống "có đúng không?" trong tiếng Việt).</p>
          <div className="bg-indigo-50 p-4 rounded-xl">
            <p className="font-bold">Quy tắc cơ bản:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Mệnh đề chính khẳng định → đuôi phủ định</li>
              <li>Mệnh đề chính phủ định → đuôi khẳng định</li>
              <li>Đuôi câu luôn viết tắt (isn't, aren't, don't, doesn't...)</li>
              <li>Dùng đại từ chủ ngữ (không dùng tên riêng, không dùng đại từ tân ngữ)</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="p-2 bg-green-50 rounded text-center">
              <p className="italic">Snow is white, <strong>isn't it</strong>?</p>
            </div>
            <div className="p-2 bg-red-50 rounded text-center">
              <p className="italic">You don't like me, <strong>do you</strong>?</p>
            </div>
          </div>
        </div>
      </section>

      {/* 15.2. Cấu trúc câu hỏi đuôi theo thì */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">15.2. Cấu trúc câu hỏi đuôi theo thì</h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Thì</th>
              <th className="p-2 border">Mệnh đề khẳng định</th>
              <th className="p-2 border">Mệnh đề phủ định</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Hiện tại đơn (tobe)</td><td className="p-2">isn't/aren't + S?</td><td className="p-2">am/is/are + S?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">Hiện tại đơn (V)</td><td className="p-2">don't/doesn't + S?</td><td className="p-2">do/does + S?</td></tr>
            <tr className="border-b"><td className="p-2">Quá khứ đơn (tobe)</td><td className="p-2">wasn't/weren't + S?</td><td className="p-2">was/were + S?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">Quá khứ đơn (V)</td><td className="p-2">didn't + S?</td><td className="p-2">did + S?</td></tr>
            <tr className="border-b"><td className="p-2">Tương lai đơn</td><td className="p-2">won't + S?</td><td className="p-2">will + S?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">Hiện tại hoàn thành</td><td className="p-2">haven't/hasn't + S?</td><td className="p-2">have/has + S?</td></tr>
            <tr className="border-b"><td className="p-2">Động từ khuyết thiếu</td><td className="p-2">modal + not + S?</td><td className="p-2">modal + S?</td></tr>
          </tbody>
        </table>
      </section>

      {/* 15.3. Các trường hợp đặc biệt */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">15.3. Các trường hợp đặc biệt (17 trường hợp)</h3>
        
        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>1. Đại từ "am"</strong> → <span className="text-red-600 font-bold">aren't I?</span></p>
            <p className="italic">I am right, <strong>aren't I</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>2. Must (cần thiết)</strong> → <span className="text-red-600 font-bold">needn't?</span></p>
            <p className="italic">You must go, <strong>needn't you</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>3. Must (cấm đoán)</strong> → <span className="text-red-600 font-bold">must?</span></p>
            <p className="italic">You mustn't smoke, <strong>must you</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>4. Let's</strong> → <span className="text-red-600 font-bold">shall we?</span></p>
            <p className="italic">Let's go, <strong>shall we</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>5. Mệnh lệnh (+) → won't/will you?</strong></p>
            <p className="italic">Open the door, <strong>will you</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>6. Mệnh lệnh (-)</strong> → <span className="text-red-600 font-bold">will you?</span></p>
            <p className="italic">Don't be late, <strong>will you</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>7. Used to</strong> → <span className="text-red-600 font-bold">didn't?</span></p>
            <p className="italic">She used to live here, <strong>didn't she</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>8. Had better</strong> → <span className="text-red-600 font-bold">hadn't?</span></p>
            <p className="italic">You had better stay, <strong>hadn't you</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>9. Would rather</strong> → <span className="text-red-600 font-bold">wouldn't?</span></p>
            <p className="italic">She would rather go, <strong>wouldn't she</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>10. I think + that</strong> → <span className="text-red-600 font-bold">lấy V mệnh đề phụ</span></p>
            <p className="italic">I think he will come, <strong>won't he</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>11. I don't think + that</strong> → <span className="text-red-600 font-bold">đuôi khẳng định</span></p>
            <p className="italic">I don't think he can do it, <strong>can he</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>12. Chủ ngữ bất định (người)</strong> → <span className="text-red-600 font-bold">they</span></p>
            <p className="italic">Someone called me, <strong>didn't they</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>13. Chủ ngữ bất định (vật)</strong> → <span className="text-red-600 font-bold">it</span></p>
            <p className="italic">Everything is okay, <strong>isn't it</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>14. Câu có từ phủ định</strong> → <span className="text-red-600 font-bold">đuôi khẳng định</span></p>
            <p className="italic">He never comes late, <strong>does he</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>15. Câu cảm thán</strong> → <span className="text-red-600 font-bold">isn't it?</span></p>
            <p className="italic">What a beautiful day, <strong>isn't it</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>16. This/That</strong> → <span className="text-red-600 font-bold">it</span></p>
            <p className="italic">This is your wife, <strong>isn't it</strong>?</p>
          </div>
          <div className="p-2 bg-slate-50 rounded">
            <p><strong>17. Wish</strong> → <span className="text-red-600 font-bold">may I?</span></p>
            <p className="italic">I wish to meet the doctor, <strong>may I</strong>?</p>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt nhanh */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">Khẳng định → Đuôi phủ định</p>
            <p className="italic">She is nice, <strong>isn't she</strong>?</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-red-600">Phủ định → Đuôi khẳng định</p>
            <p className="italic">She isn't nice, <strong>is she</strong>?</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Let's → shall we?</p>
            <p className="italic">Let's go, <strong>shall we</strong>?</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Khẳng định → phủ định, phủ định → khẳng định</strong></li>
          <li><strong>I am → aren't I?</strong> (không dùng amn't I)</li>
          <li><strong>Let's → shall we?</strong> (rủ rê)</li>
          <li><strong>Mệnh lệnh → will you?</strong> (sai khiến)</li>
          <li><strong>Chủ ngữ bất định người → they</strong></li>
          <li><strong>Chủ ngữ bất định vật → it</strong></li>
          <li><strong>This/That → it</strong></li>
          <li><strong>These/Those → they</strong></li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">LƯU Ý:</p>
          <p>✓ Dùng đại từ chủ ngữ, không dùng tên riêng</p>
          <p>✓ Đuôi câu luôn viết tắt</p>
          <p>✓ Lên giọng cuối câu → muốn hỏi thông tin</p>
          <p>✓ Xuống giọng cuối câu → muốn xác nhận</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "I am right, ____?", options: ["am not I", "aren't I", "amn't I", "am I"], correct: 1 },
    { q: "Let's go, ____?", options: ["will we", "shall we", "won't we", "do we"], correct: 1 },
    { q: "She never comes late, ____?", options: ["does she", "doesn't she", "is she", "isn't she"], correct: 0 },
    { q: "Open the door, ____?", options: ["will you", "won't you", "do you", "don't you"], correct: 0 },
    { q: "She used to live here, ____?", options: ["usedn't she", "didn't she", "doesn't she", "hadn't she"], correct: 1 }
  ]
},
  {
  id: '16',
  category: 'Thì',
  title: '16. Simple Present (To Be)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Thì hiện tại đơn - Động từ TO BE</span>
      </div>

      {/* 16.1. Công thức */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">16.1. Công thức thì hiện tại đơn với TO BE</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 text-center mb-2">Khẳng định</h4>
            <p className="font-mono text-center text-base">S + am/is/are + ...</p>
            <p className="italic text-center text-sm mt-2">I am a student.</p>
            <p className="italic text-center text-sm">She is beautiful.</p>
            <p className="italic text-center text-sm">They are happy.</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 text-center mb-2">Phủ định</h4>
            <p className="font-mono text-center text-base">S + am/is/are + not + ...</p>
            <p className="italic text-center text-sm mt-2">I am not tired.</p>
            <p className="italic text-center text-sm">She is not (isn't) here.</p>
            <p className="italic text-center text-sm">They are not (aren't) ready.</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 text-center mb-2">Nghi vấn</h4>
            <p className="font-mono text-center text-base">Am/Is/Are + S + ...?</p>
            <p className="italic text-center text-sm mt-2">Are you a teacher?</p>
            <p className="italic text-center text-sm">Is she your sister?</p>
            <p className="italic text-center text-sm">Are they coming?</p>
          </div>
        </div>
      </section>

      {/* 16.2. Bảng chia động từ TO BE */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">16.2. Bảng chia động từ TO BE</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 border">Chủ ngữ</th>
              <th className="p-2 border">Khẳng định</th>
              <th className="p-2 border">Phủ định</th>
              <th className="p-2 border">Nghi vấn</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold">I</td><td className="p-2">I am (I'm)</td><td className="p-2">I am not (I'm not)</td><td className="p-2">Am I...?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">You</td><td className="p-2">You are (You're)</td><td className="p-2">You are not (aren't)</td><td className="p-2">Are you...?</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">He</td><td className="p-2">He is (He's)</td><td className="p-2">He is not (isn't)</td><td className="p-2">Is he...?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">She</td><td className="p-2">She is (She's)</td><td className="p-2">She is not (isn't)</td><td className="p-2">Is she...?</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">It</td><td className="p-2">It is (It's)</td><td className="p-2">It is not (isn't)</td><td className="p-2">Is it...?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">We</td><td className="p-2">We are (We're)</td><td className="p-2">We are not (aren't)</td><td className="p-2">Are we...?</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">They</td><td className="p-2">They are (They're)</td><td className="p-2">They are not (aren't)</td><td className="p-2">Are they...?</td></tr>
          </tbody>
        </table>
      </section>

      {/* 16.3. Cách dùng */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">16.3. Cách dùng động từ TO BE</h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">To be + tính từ</p>
            <p className="italic text-sm">She is beautiful.</p>
            <p className="italic text-sm">The weather is nice.</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">To be + danh từ</p>
            <p className="italic text-sm">He is a doctor.</p>
            <p className="italic text-sm">They are students.</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">To be + số từ</p>
            <p className="italic text-sm">I am 20 years old.</p>
            <p className="italic text-sm">It is 5 o'clock.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">To be + trạng từ nơi chốn</p>
            <p className="italic text-sm">She is at home.</p>
            <p className="italic text-sm">The book is on the table.</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700">To be + từ chỉ thời gian</p>
            <p className="italic text-sm">The meeting is at 9 AM.</p>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg">
            <p className="font-bold text-teal-700">This/That/These/Those + to be</p>
            <p className="italic text-sm">This is my car.</p>
            <p className="italic text-sm">These are my books.</p>
          </div>
        </div>
      </section>

      {/* 16.4. Câu hỏi với How + adj + to be? */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">16.4. Câu hỏi với How + adj + to be?</h3>
        <div className="p-4 bg-cyan-50 rounded-xl">
          <p className="font-mono text-center text-base">How + tính từ + to be + S?</p>
          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <div className="p-2 bg-white rounded">
              <p className="italic">How are you? (Bạn khỏe không?)</p>
              <p className="italic text-xs text-gray-500">→ I am fine.</p>
            </div>
            <div className="p-2 bg-white rounded">
              <p className="italic">How is the weather? (Thời tiết thế nào?)</p>
              <p className="italic text-xs text-gray-500">→ It is sunny.</p>
            </div>
            <div className="p-2 bg-white rounded">
              <p className="italic">How old is she? (Cô ấy bao nhiêu tuổi?)</p>
              <p className="italic text-xs text-gray-500">→ She is 25.</p>
            </div>
            <div className="p-2 bg-white rounded">
              <p className="italic">How much is this? (Cái này giá bao nhiêu?)</p>
              <p className="italic text-xs text-gray-500">→ It is $10.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lưu ý quan trọng */}
      <section className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-2">LƯU Ý QUAN TRỌNG</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Danh từ số ít / không đếm được</strong> + is: <span className="italic">The weather is nice today.</span></li>
          <li><strong>Danh từ số nhiều</strong> + are: <span className="italic">These restaurants are expensive.</span></li>
          <li><strong>Dạng rút gọn</strong> trong văn nói: <span className="italic">I'm, You're, He's, She's, It's, We're, They're</span></li>
          <li><strong>Không dùng dạng rút gọn</strong> trong câu trả lời Yes ngắn:</li>
          <li className="italic ml-4">Are you there? → Yes, I am. (NOT: Yes, I'm)</li>
        </ul>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
        <h4 className="font-bold text-center text-blue-800 mb-3">TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">I</p>
            <p>→ am</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">He/She/It</p>
            <p>→ is</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-purple-600">You/We/They</p>
            <p>→ are</p>
          </div>
        </div>
        <div className="mt-3 text-center text-sm">
          <p class="font-bold">Công thức câu hỏi How:</p>
          <p class="italic">How + adj + to be + S?</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "The weather ____ nice today.", options: ["am", "is", "are", "be"], correct: 1 },
    { q: "My parents ____ at home now.", options: ["am", "is", "are", "be"], correct: 2 },
    { q: "I ____ a student at this school.", options: ["am", "is", "are", "be"], correct: 0 },
    { q: "How old ____ you?", options: ["am", "is", "are", "be"], correct: 2 },
    { q: "These books ____ very interesting.", options: ["am", "is", "are", "be"], correct: 2 }
  ]
},
  {
  id: '17',
  category: 'Thì',
  title: '17. Simple Present (Regular)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Thì hiện tại đơn - Động từ thường</span>
      </div>

      {/* 17.1. Công thức */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">17.1. Công thức thì hiện tại đơn</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 text-center mb-2">Khẳng định</h4>
            <p className="font-mono text-center text-sm">I/You/We/They + V</p>
            <p className="font-mono text-center text-sm">He/She/It + V(s/es)</p>
            <p className="italic text-center text-sm mt-2">I play football.</p>
            <p className="italic text-center text-sm">She plays football.</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 text-center mb-2">Phủ định</h4>
            <p className="font-mono text-center text-sm">I/You/We/They + do not + V</p>
            <p className="font-mono text-center text-sm">He/She/It + does not + V</p>
            <p className="italic text-center text-sm mt-2">I don't play football.</p>
            <p className="italic text-center text-sm">She doesn't play football.</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 text-center mb-2">Nghi vấn</h4>
            <p className="font-mono text-center text-sm">Do/Does + S + V...?</p>
            <p className="italic text-center text-sm mt-2">Do you play football?</p>
            <p className="italic text-center text-sm">Does she play football?</p>
          </div>
        </div>
      </section>

      {/* 17.2. Quy tắc thêm đuôi S/ES */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">17.2. Quy tắc thêm đuôi S/ES</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">1. Thêm -s (hầu hết động từ)</p>
            <p className="italic">get → gets</p>
            <p className="italic">work → works</p>
            <p className="italic">play → plays</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-red-700">2. Thêm -es (tận cùng: ss, sh, ch, x, o)</p>
            <p className="italic">do → does</p>
            <p className="italic">watch → watches</p>
            <p className="italic">fix → fixes</p>
            <p className="italic">wash → washes</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">3. Phụ âm + y → i + es</p>
            <p className="italic">study → studies</p>
            <p className="italic">cry → cries</p>
            <p className="italic">fly → flies</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">4. Nguyên âm + y → thêm s</p>
            <p className="italic">play → plays</p>
            <p className="italic">buy → buys</p>
            <p className="italic">say → says</p>
          </div>
        </div>
      </section>

      {/* 17.3. Cách dùng thì hiện tại đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">17.3. Cách dùng thì hiện tại đơn</h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-sky-50 rounded-lg">
            <p className="font-bold text-sky-700">Sự thật hiển nhiên</p>
            <p className="italic text-sm">The sun rises in the east.</p>
            <p className="italic text-sm">Water boils at 100°C.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Thói quen, hành động lặp lại</p>
            <p className="italic text-sm">I go to school every day.</p>
            <p className="italic text-sm">She drinks coffee every morning.</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-orange-700">Lịch trình, thời khóa biểu</p>
            <p className="italic text-sm">The train leaves at 5 PM.</p>
            <p className="italic text-sm">The class starts at 8 AM.</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700">Trạng thái ở hiện tại</p>
            <p className="italic text-sm">I am hungry.</p>
            <p className="italic text-sm">She feels tired.</p>
          </div>
        </div>
      </section>

      {/* 17.4. Trạng từ thường dùng */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">17.4. Trạng từ thường dùng với hiện tại đơn</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">always (luôn luôn)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">usually (thường xuyên)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">often (thường)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">sometimes (thỉnh thoảng)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">seldom (hiếm khi)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">never (không bao giờ)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">every day (mỗi ngày)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">on Mondays (vào các thứ Hai)</span>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <p className="font-bold">Vị trí trạng từ:</p>
          <p className="italic text-sm">Trạng từ tần suất đứng TRƯỚC động từ thường</p>
          <p className="italic ml-4">She <strong>always</strong> wakes up early.</p>
          <p className="italic text-sm mt-1">Trạng từ tần suất đứng SAU động từ to be</p>
          <p className="italic ml-4">She <strong>is</strong> always <strong>happy</strong>.</p>
        </div>
      </section>

      {/* Bảng tổng kết */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-2xl border border-green-200">
        <h4 className="font-bold text-center text-green-800 mb-3">TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-center">Chủ ngữ số nhiều</p>
            <p className="text-center">I / You / We / They</p>
            <p className="text-center text-green-600">→ V (nguyên mẫu)</p>
            <p className="italic text-center">I play / You play</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-center">Chủ ngữ số ít</p>
            <p className="text-center">He / She / It</p>
            <p className="text-center text-red-600">→ V(s/es)</p>
            <p className="italic text-center">He plays / She plays</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>He/She/It + V(s/es)</strong> → Nhớ thêm s/es</li>
          <li><strong>Phủ định:</strong> doesn't + V (bỏ s/es)</li>
          <li><strong>Nghi vấn:</strong> Does + S + V? (bỏ s/es)</li>
          <li><strong>Quy tắc thêm es:</strong> S - SH - CH - X - O</li>
          <li><strong>Phụ âm + y → i + es</strong></li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÔNG THỨC NHANH:</p>
          <p>✓ Khẳng định: I/You/We/They + V ; He/She/It + V(s/es)</p>
          <p>✓ Phủ định: S + do/does + not + V</p>
          <p>✓ Nghi vấn: Do/Does + S + V?</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "She ____ to school every day.", options: ["go", "goes", "going", "went"], correct: 1 },
    { q: "They ____ football on Sundays.", options: ["play", "plays", "playing", "played"], correct: 0 },
    { q: "He ____ coffee every morning.", options: ["drink", "drinks", "drinking", "drank"], correct: 1 },
    { q: "____ you like ice cream?", options: ["Do", "Does", "Is", "Are"], correct: 0 },
    { q: "My sister ____ watch horror films.", options: ["don't", "doesn't", "isn't", "aren't"], correct: 1 }
  ]
},
  {
  id: '18',
  category: 'Thì',
  title: '18. Present Continuous',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Thì hiện tại tiếp diễn</span>
      </div>

      {/* 18.1. Công thức */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">18.1. Công thức thì hiện tại tiếp diễn</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 text-center mb-2">Khẳng định</h4>
            <p className="font-mono text-center text-sm">S + am/is/are + V-ing</p>
            <p className="italic text-center text-sm mt-2">I am watching TV.</p>
            <p className="italic text-center text-sm">She is reading a book.</p>
            <p className="italic text-center text-sm">They are playing football.</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 text-center mb-2">Phủ định</h4>
            <p className="font-mono text-center text-sm">S + am/is/are + not + V-ing</p>
            <p className="italic text-center text-sm mt-2">I am not sleeping.</p>
            <p className="italic text-center text-sm">She is not (isn't) working.</p>
            <p className="italic text-center text-sm">They are not (aren't) playing.</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 text-center mb-2">Nghi vấn</h4>
            <p className="font-mono text-center text-sm">Am/Is/Are + S + V-ing?</p>
            <p className="italic text-center text-sm mt-2">Are you watching TV?</p>
            <p className="italic text-center text-sm">Is she reading a book?</p>
            <p className="italic text-center text-sm">Are they playing football?</p>
          </div>
        </div>
      </section>

      {/* 18.2. Bảng chia động từ TO BE ở HTTD */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">18.2. Bảng chia động từ ở thì hiện tại tiếp diễn</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2 border">Chủ ngữ</th>
              <th className="p-2 border">Khẳng định</th>
              <th className="p-2 border">Phủ định</th>
              <th className="p-2 border">Nghi vấn</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold">I</td><td className="p-2">I am watching</td><td className="p-2">I am not watching</td><td className="p-2">Am I watching?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">You</td><td className="p-2">You are watching</td><td className="p-2">You aren't watching</td><td className="p-2">Are you watching?</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">He/She/It</td><td className="p-2">He is watching</td><td className="p-2">He isn't watching</td><td className="p-2">Is he watching?</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">We</td><td className="p-2">We are watching</td><td className="p-2">We aren't watching</td><td className="p-2">Are we watching?</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">They</td><td className="p-2">They are watching</td><td className="p-2">They aren't watching</td><td className="p-2">Are they watching?</td></tr>
          </tbody>
        </table>
      </section>

      {/* 18.3. Cách dùng thì hiện tại tiếp diễn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">18.3. Cách dùng thì hiện tại tiếp diễn</h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">Hành động đang xảy ra tại thời điểm nói</p>
            <p className="italic text-sm">He is watching TV at the moment.</p>
            <p className="italic text-sm">Look! It is raining.</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">Hành động đang xảy ra xung quanh thời điểm hiện tại</p>
            <p className="italic text-sm">Lan is working for a new company these days.</p>
            <p className="italic text-sm">I am reading a good book this week.</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">Thói quen gây phiền phức với "always"</p>
            <p className="italic text-sm">He is always asking the same question.</p>
            <p className="italic text-sm">She is always coming late.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Kế hoạch đã sắp xếp trong tương lai gần</p>
            <p className="italic text-sm">We are coming to our grandparents' house tonight.</p>
            <p className="italic text-sm">I am meeting my friend tomorrow.</p>
          </div>
        </div>
      </section>

      {/* 18.4. Dấu hiệu nhận biết */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">18.4. Dấu hiệu nhận biết</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">now (bây giờ)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">right now (ngay bây giờ)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">at the moment (ngay lúc này)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">at present (hiện tại)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">these days (những ngày này)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">today (hôm nay)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">Look! (nhìn kìa)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">Listen! (nghe này)</span>
        </div>
      </section>

      {/* 18.5. Quy tắc thêm -ing */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">18.5. Quy tắc thêm -ing</h3>
        
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">1. Kết thúc bằng -e</p>
            <p className="italic">Bỏ -e thêm -ing</p>
            <p className="italic">give → giving</p>
            <p className="italic">write → writing</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">2. Một âm tiết, kết thúc: nguyên âm + phụ âm</p>
            <p className="italic">Nhân đôi phụ âm cuối + ing</p>
            <p className="italic">sit → sitting</p>
            <p className="italic">run → running</p>
            <p className="italic">swim → swimming</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-red-700">3. Kết thúc bằng -ie</p>
            <p className="italic">Bỏ -ie thêm -ying</p>
            <p className="italic">lie → lying</p>
            <p className="italic">die → dying</p>
          </div>
        </div>
      </section>

      {/* 18.6. Động từ không dùng ở tiếp diễn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">18.6. Động từ chỉ dùng ở hiện tại đơn (không dùng tiếp diễn)</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <span className="p-2 bg-red-50 rounded">believe (tin)</span>
          <span className="p-2 bg-red-50 rounded">know (biết)</span>
          <span className="p-2 bg-red-50 rounded">remember (nhớ)</span>
          <span className="p-2 bg-red-50 rounded">forget (quên)</span>
          <span className="p-2 bg-red-50 rounded">hear (nghe)</span>
          <span className="p-2 bg-red-50 rounded">see (nhìn thấy)</span>
          <span className="p-2 bg-red-50 rounded">understand (hiểu)</span>
          <span className="p-2 bg-red-50 rounded">hate (ghét)</span>
          <span className="p-2 bg-red-50 rounded">need (cần)</span>
          <span className="p-2 bg-red-50 rounded">want (muốn)</span>
          <span className="p-2 bg-red-50 rounded">decide (quyết định)</span>
          <span className="p-2 bg-red-50 rounded">smell (ngửi)</span>
          <span className="p-2 bg-red-50 rounded">belong (thuộc về)</span>
          <span className="p-2 bg-red-50 rounded">like (thích)</span>
          <span className="p-2 bg-red-50 rounded">love (yêu)</span>
          <span className="p-2 bg-red-50 rounded">prefer (thích hơn)</span>
        </div>
        <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
          <p className="font-bold">Lưu ý:</p>
          <p>Các động từ này chỉ trạng thái, cảm xúc, nhận thức → chỉ dùng ở hiện tại đơn</p>
          <p className="italic">I understand the lesson. (Đúng)</p>
          <p className="italic text-red-500">I am understanding the lesson. (Sai)</p>
        </div>
      </section>

      {/* Bảng so sánh HTĐ và HTTD */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-200">
        <h4 className="font-bold text-center text-purple-800 mb-3">SO SÁNH HIỆN TẠI ĐƠN VÀ HIỆN TẠI TIẾP DIỄN</h4>
        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-blue-600 text-center">Hiện tại đơn</p>
            <p className="italic">She works in an office.</p>
            <p className="text-gray-500">(Thói quen, sự thật)</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-purple-600 text-center">Hiện tại tiếp diễn</p>
            <p className="italic">She is working now.</p>
            <p className="text-gray-500">(Đang xảy ra tại thời điểm nói)</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Công thức:</strong> S + am/is/are + V-ing</li>
          <li><strong>Dấu hiệu:</strong> now, right now, at the moment, Look!, Listen!</li>
          <li><strong>Quy tắc thêm ing:</strong> bỏ e, nhân đôi phụ âm, ie → ying</li>
          <li><strong>Động từ không dùng:</strong> believe, know, remember, understand, hate, want...</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÔNG THỨC NHANH:</p>
          <p>✓ Khẳng định: S + am/is/are + V-ing</p>
          <p>✓ Phủ định: S + am/is/are + not + V-ing</p>
          <p>✓ Nghi vấn: Am/Is/Are + S + V-ing?</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "Listen! She ____.", options: ["sings", "is singing", "has sung", "sang"], correct: 1 },
    { q: "I ____ to understand this lesson.", options: ["try", "am trying", "tries", "tried"], correct: 1 },
    { q: "Look! The children ____ in the yard.", options: ["play", "plays", "are playing", "played"], correct: 2 },
    { q: "She ____ coffee. She drinks tea.", options: ["isn't drinking", "doesn't drink", "don't drink", "aren't drinking"], correct: 1 },
    { q: "Right now, they ____ dinner.", options: ["have", "has", "are having", "is having"], correct: 2 }
  ]
},
{
  id: '19',
  category: 'So sánh thì',
  title: '19. Compare Present Simple & Present Continuous',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>So sánh thì hiện tại đơn và hiện tại tiếp diễn</span>
      </div>

      {/* 1. Khác biệt trong dạng thức của động từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">1. Khác biệt trong dạng thức của động từ</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 text-center mb-2">Hiện tại đơn</h4>
            <p className="text-sm">Sử dụng động từ thường (V) giữ nguyên hoặc thêm <strong>s/es</strong> tuỳ theo chủ ngữ.</p>
            <p className="text-sm mt-2">Động từ <strong>to be</strong> chia thành <strong>am/is/are</strong> tuỳ theo chủ ngữ.</p>
            <p className="italic text-sm mt-2">He goes to school by bus every day.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 text-center mb-2">Hiện tại tiếp diễn</h4>
            <p className="text-sm">Sử dụng động từ chia theo dạng thức <strong>am/is/are + V-ing</strong>.</p>
            <p className="italic text-sm mt-2">He is walking to school now.</p>
          </div>
        </div>
      </section>

      {/* 2. Khác biệt trong cách dùng */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">2. Khác biệt trong cách dùng</h3>
        
        {/* 2.1 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-3">2.1. Hành động lặp lại vs Hành động đang xảy ra</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Hiện tại đơn</p>
              <p className="text-sm">Diễn tả hành động thường xuyên xảy ra, có tính lặp đi lặp lại</p>
              <p className="italic text-sm mt-1">I often get up at 6 AM.</p>
              <p className="text-xs text-gray-500 mt-1">Dấu hiệu: never, sometimes, often, usually, always, once a week...</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-700">Hiện tại tiếp diễn</p>
              <p className="text-sm">Diễn tả hành động xảy ra ngay tại thời điểm nói hoặc xung quanh thời điểm nói</p>
              <p className="italic text-sm mt-1">He is reading books now.</p>
              <p className="text-xs text-gray-500 mt-1">Dấu hiệu: at the moment, at present, now, right now, Listen!, Look!...</p>
            </div>
          </div>
        </div>

        {/* 2.2 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-3">2.2. Sự thật hiển nhiên vs Tính tạm thời</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Hiện tại đơn</p>
              <p className="text-sm">Diễn tả chân lý, sự thật hiển nhiên, sự việc có tính chất lâu dài, ổn định</p>
              <p className="italic text-sm mt-1">The sun rises in the east.</p>
              <p className="italic text-sm">She works in a bank.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-700">Hiện tại tiếp diễn</p>
              <p className="text-sm">Diễn tả xu hướng hay hành động, sự việc mang tính chất tạm thời ở hiện tại</p>
              <p className="italic text-sm mt-1">I am living with my parents temporarily.</p>
              <p className="italic text-sm">She is working from home this week.</p>
            </div>
          </div>
        </div>

        {/* 2.3 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-3">2.3. Lịch trình cố định vs Kế hoạch đã sắp xếp</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Hiện tại đơn</p>
              <p className="text-sm">Diễn tả lịch trình, thời gian biểu cố định</p>
              <p className="italic text-sm mt-1">The train leaves at 5 PM.</p>
              <p className="italic text-sm">The class starts at 8 AM.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-700">Hiện tại tiếp diễn</p>
              <p className="text-sm">Diễn tả kế hoạch trong tương lai có sự sắp xếp</p>
              <p className="italic text-sm mt-1">I am meeting my friend tomorrow.</p>
              <p className="italic text-sm">We are going to Hanoi next week.</p>
            </div>
          </div>
        </div>

        {/* 2.4 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-3">2.4. Thói quen đơn thuần vs Phàn nàn với "always"</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Hiện tại đơn</p>
              <p className="text-sm">Diễn tả thói quen đơn thuần ở hiện tại</p>
              <p className="italic text-sm mt-1">He drinks coffee every morning.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-700">Hiện tại tiếp diễn</p>
              <p className="text-sm">Kết hợp với "always", diễn tả sự phàn nàn về hành động lặp lại gây khó chịu</p>
              <p className="italic text-sm mt-1">He is always coming late!</p>
              <p className="italic text-sm">She is always asking the same question!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Động từ mang nghĩa khác nhau */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">3. Động từ mang nghĩa khác nhau ở 2 thì</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Taste */}
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700 text-center">TASTE</p>
            <div className="mt-2">
              <p className="text-sm"><span className="font-bold text-blue-600">HTĐ:</span> có vị</p>
              <p className="italic text-sm">This cake tastes very delicious.</p>
              <p className="text-sm mt-1"><span className="font-bold text-purple-600">HTTD:</span> đang nếm</p>
              <p className="italic text-sm">I am tasting this cake.</p>
            </div>
          </div>

          {/* Look */}
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700 text-center">LOOK</p>
            <div className="mt-2">
              <p className="text-sm"><span className="font-bold text-blue-600">HTĐ:</span> trông có vẻ</p>
              <p className="italic text-sm">She looks lovely.</p>
              <p className="text-sm mt-1"><span className="font-bold text-purple-600">HTTD:</span> đang tìm kiếm</p>
              <p className="italic text-sm">She is looking for her key.</p>
            </div>
          </div>

          {/* Have */}
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-red-700 text-center">HAVE</p>
            <div className="mt-2">
              <p className="text-sm"><span className="font-bold text-blue-600">HTĐ:</span> có</p>
              <p className="italic text-sm">He has a car.</p>
              <p className="text-sm mt-1"><span className="font-bold text-purple-600">HTTD:</span> đang ăn</p>
              <p className="italic text-sm">He is having breakfast.</p>
            </div>
          </div>

          {/* Think */}
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700 text-center">THINK</p>
            <div className="mt-2">
              <p className="text-sm"><span className="font-bold text-blue-600">HTĐ:</span> cho rằng, nghĩ rằng</p>
              <p className="italic text-sm">I think you are right.</p>
              <p className="text-sm mt-1"><span className="font-bold text-purple-600">HTTD:</span> đang suy nghĩ</p>
              <p className="italic text-sm">I am thinking about the problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bảng so sánh tổng hợp */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-2xl border border-indigo-200 overflow-x-auto">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG SO SÁNH TỔNG HỢP</h4>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Tiêu chí</th>
              <th className="p-2 border">Hiện tại đơn</th>
              <th className="p-2 border">Hiện tại tiếp diễn</th>
             </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold">Công thức</td><td className="p-2">S + V(s/es)</td><td className="p-2">S + am/is/are + V-ing</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Hành động</td><td className="p-2">Thói quen, lặp lại</td><td className="p-2">Đang xảy ra</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Tính chất</td><td className="p-2">Lâu dài, ổn định</td><td className="p-2">Tạm thời</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Lịch trình</td><td className="p-2">Cố định</td><td className="p-2">Kế hoạch đã sắp xếp</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Dấu hiệu</td><td className="p-2">always, often, usually, sometimes, never, every day</td><td className="p-2">now, right now, at the moment, Look!, Listen!</td></tr>
          </tbody>
        </table>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Hiện tại đơn:</strong> Thói quen, sự thật, lịch trình cố định</li>
          <li><strong>Hiện tại tiếp diễn:</strong> Đang xảy ra, tạm thời, kế hoạch tương lai gần</li>
          <li><strong>Dấu hiệu nhận biết:</strong> Nhìn trạng từ là đoán được thì</li>
          <li><strong>Động từ chỉ trạng thái:</strong> không dùng ở tiếp diễn (know, believe, understand...)</li>
          <li><strong>Một số động từ:</strong> thay đổi nghĩa khi dùng ở 2 thì (taste, look, have, think...)</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>HTĐ: thói quen, lịch trình, sự thật</p>
          <p>HTTD: đang làm, kế hoạch, phàn nàn</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "She usually ____ up at 6 AM.", options: ["get", "gets", "is getting", "got"], correct: 1 },
    { q: "Listen! Someone ____ at the door.", options: ["knock", "knocks", "is knocking", "knocked"], correct: 2 },
    { q: "The train ____ at 8 PM tonight.", options: ["leave", "leaves", "is leaving", "left"], correct: 1 },
    { q: "He ____ always ____ late! It's so annoying.", options: ["is / coming", "does / come", "is / come", "does / coming"], correct: 0 },
    { q: "This soup ____ delicious.", options: ["is tasting", "tastes", "taste", "is taste"], correct: 1 }
  ]
},
{
  id: '20',
  category: 'Thì',
  title: '20. Simple Past (Thì quá khứ đơn)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Thì quá khứ đơn - Diễn tả hành động đã xảy ra và kết thúc trong quá khứ</span>
      </div>

      {/* 1. Dạng thức của thì quá khứ đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">1. Dạng thức của thì quá khứ đơn</h3>
        
        {/* a. Với động từ to be */}
        <div className="mb-6">
          <h4 className="font-bold text-orange-600 mb-3">a. Với động từ TO BE</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-bold text-green-700">Khẳng định</p>
              <p className="font-mono text-sm">S + was/were...</p>
              <p className="italic text-xs mt-1">I/He/She/It + was</p>
              <p className="italic text-xs">You/We/They + were</p>
              <p className="italic text-sm mt-2">Yesterday they were at school.</p>
              <p className="italic text-sm">She was 14 years old last year.</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-bold text-red-700">Phủ định</p>
              <p className="font-mono text-sm">S + was/were + not...</p>
              <p className="italic text-xs mt-1">was not = wasn't</p>
              <p className="italic text-xs">were not = weren't</p>
              <p className="italic text-sm mt-2">They weren't at school yesterday.</p>
              <p className="italic text-sm">She wasn't 14 last year.</p>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">Câu hỏi không có từ để hỏi</p>
            <p className="font-mono text-sm">Was/Were + S...?</p>
            <p className="italic text-sm">Was she 14 years old last year?</p>
            <p className="italic text-sm">→ Yes, she was. / No, she wasn't.</p>
          </div>
          
          <div className="mt-2 p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Câu hỏi có từ để hỏi</p>
            <p className="font-mono text-sm">Question word + was/were + S...?</p>
            <p className="italic text-sm">Where was she last weekend?</p>
          </div>
        </div>

        {/* b. Với động từ thường */}
        <div className="mb-6">
          <h4 className="font-bold text-orange-600 mb-3">b. Với động từ thường</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-bold text-green-700">Khẳng định</p>
              <p className="font-mono text-sm">S + V-ed / V cột 2</p>
              <p className="italic text-sm mt-2">My family went to the cinema last week.</p>
              <p className="italic text-sm">She watched TV yesterday.</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-bold text-red-700">Phủ định</p>
              <p className="font-mono text-sm">S + didn't + V (nguyên mẫu)</p>
              <p className="italic text-sm mt-2">My family didn't go to the cinema last week.</p>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">Câu hỏi không có từ để hỏi</p>
            <p className="font-mono text-sm">Did + S + V (nguyên mẫu)...?</p>
            <p className="italic text-sm">Did your family go to the cinema last week?</p>
            <p className="italic text-sm">→ Yes, we did. / No, we didn't.</p>
          </div>
          
          <div className="mt-2 p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Câu hỏi có từ để hỏi</p>
            <p className="font-mono text-sm">Question word + did + S + V (nguyên mẫu)?</p>
            <p className="italic text-sm">Where did your family go last week?</p>
            <p className="italic text-sm">→ My family went to the cinema.</p>
          </div>
        </div>
      </section>

      {/* 2. Cách dùng thì quá khứ đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">2. Cách dùng thì quá khứ đơn</h3>
        
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">Hành động đã kết thúc trong quá khứ</p>
            <p className="italic text-sm">Yesterday, I went to bed late.</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">Thói quen trong quá khứ</p>
            <p className="italic text-sm">When we were young, we often went fishing.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Chuỗi hành động nối tiếp</p>
            <p className="italic text-sm">He locked the door, got into his car and drove to work.</p>
          </div>
        </div>
      </section>

      {/* 3. Dấu hiệu nhận biết */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">3. Dấu hiệu nhận biết</h3>
        
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">yesterday</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">last night/week/month/year</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">ago (2 days ago)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">in + thời gian QK (in 1993)</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">when I was young</span>
        </div>
      </section>

      {/* 4. Quy tắc thêm đuôi ed */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">4. Quy tắc thêm đuôi ED</h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-2 bg-blue-50 rounded">
            <p className="font-bold">Thông thường: thêm -ed</p>
            <p className="italic">wait → waited</p>
            <p className="italic">look → looked</p>
          </div>
          <div className="p-2 bg-green-50 rounded">
            <p className="font-bold">Kết thúc bằng -e: thêm -d</p>
            <p className="italic">live → lived</p>
            <p className="italic">arrive → arrived</p>
          </div>
          <div className="p-2 bg-yellow-50 rounded">
            <p className="font-bold">Phụ âm + y → ied</p>
            <p className="italic">study → studied</p>
            <p className="italic">worry → worried</p>
          </div>
          <div className="p-2 bg-purple-50 rounded">
            <p className="font-bold">Nguyên âm + y → ed</p>
            <p className="italic">play → played</p>
          </div>
          <div className="p-2 bg-red-50 rounded md:col-span-2">
            <p className="font-bold">Một âm tiết, kết thúc: nguyên âm + phụ âm → gấp đôi phụ âm + ed</p>
            <p className="italic">stop → stopped</p>
            <p className="italic">prefer → preferred</p>
            <p className="text-xs text-gray-500 mt-1">Lưu ý: không gấp đôi h, x, y, w</p>
          </div>
        </div>
      </section>

      {/* 5. Cách phát âm đuôi -ed */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">5. Cách phát âm đuôi -ed</h3>
        
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-orange-600 text-white">
              <th className="p-2 border">Phát âm</th>
              <th className="p-2 border">Âm tận cùng của V nguyên thể</th>
              <th className="p-2 border">Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold text-red-600">/ɪd/</td><td className="p-2">/t/, /d/</td><td className="p-2 italic">started, needed, wanted</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold text-blue-600">/t/</td><td className="p-2">/k/, /s/, /ʃ/, /f/, /p/, /tʃ/</td><td className="p-2 italic">looked, dressed, washed, laughed, stopped, watched</td></tr>
            <tr className="border-b"><td className="p-2 font-bold text-green-600">/d/</td><td className="p-2">Các âm còn lại</td><td className="p-2 italic">smiled, played, opened</td></tr>
          </tbody>
        </table>
      </section>

      {/* 6. Động từ bất quy tắc */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-orange-700 mb-4 border-b border-orange-200 pb-2">6. Động từ bất quy tắc</h3>
        
        <div className="grid md:grid-cols-3 gap-2 text-sm">
          <div className="p-2 bg-red-50 rounded">
            <p className="font-bold text-center">Nguyên thể</p>
            <p className="italic text-center">put</p>
            <p className="italic text-center">cut</p>
            <p className="italic text-center">set</p>
            <p className="italic text-center">hit</p>
          </div>
          <div className="p-2 bg-green-50 rounded">
            <p className="font-bold text-center">Quá khứ</p>
            <p className="italic text-center">put</p>
            <p className="italic text-center">cut</p>
            <p className="italic text-center">set</p>
            <p className="italic text-center">hit</p>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <p className="font-bold text-center">Nghĩa</p>
            <p className="italic text-center">đặt</p>
            <p className="italic text-center">cắt</p>
            <p className="italic text-center">đặt, để</p>
            <p className="italic text-center">đánh</p>
          </div>
        </div>
        
        <div className="mt-3 grid md:grid-cols-3 gap-2 text-sm">
          <div className="p-2 bg-red-50 rounded">
            <p className="italic text-center">become</p>
            <p className="italic text-center">begin</p>
            <p className="italic text-center">break</p>
            <p className="italic text-center">bring</p>
            <p className="italic text-center">buy</p>
          </div>
          <div className="p-2 bg-green-50 rounded">
            <p className="italic text-center">became</p>
            <p className="italic text-center">began</p>
            <p className="italic text-center">broke</p>
            <p className="italic text-center">brought</p>
            <p className="italic text-center">bought</p>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <p className="italic text-center">trở nên</p>
            <p className="italic text-center">bắt đầu</p>
            <p className="italic text-center">làm vỡ</p>
            <p className="italic text-center">mang</p>
            <p className="italic text-center">mua</p>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-2xl border border-orange-200">
        <h4 className="font-bold text-center text-orange-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-center text-green-600">Khẳng định</p>
            <p className="text-center">S + V-ed / V cột 2</p>
            <p className="italic text-center">She went home.</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-center text-red-600">Phủ định</p>
            <p className="text-center">S + didn't + V</p>
            <p className="italic text-center">She didn't go home.</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-center text-blue-600">Nghi vấn</p>
            <p className="text-center">Did + S + V?</p>
            <p className="italic text-center">Did she go home?</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-bold text-center text-purple-600">Với to be</p>
            <p className="text-center">was/were</p>
            <p className="italic text-center">She was happy.</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Quá khứ đơn:</strong> đã xảy ra, đã kết thúc</li>
          <li><strong>Dấu hiệu:</strong> yesterday, last..., ...ago, in + năm QK</li>
          <li><strong>Phủ định:</strong> didn't + V (nguyên mẫu) - trả s/es/ed về nguyên mẫu</li>
          <li><strong>Nghi vấn:</strong> Did + S + V (nguyên mẫu)?</li>
          <li><strong>Phát âm ed:</strong> /ɪd/ sau t/d - /t/ sau p/k/f/s/ʃ/tʃ - /d/ còn lại</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>QKĐ: đã xong, đã kết thúc - yesterday, last, ago - nhớ học thuộc bất quy tắc!</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "She ____ to the cinema yesterday.", options: ["go", "went", "goes", "gone"], correct: 1 },
    { q: "They ____ at home last night.", options: ["wasn't", "weren't", "didn't", "isn't"], correct: 1 },
    { q: "____ you buy that shirt last week?", options: ["Did", "Do", "Does", "Were"], correct: 0 },
    { q: "He ____ his homework before dinner.", options: ["do", "does", "did", "done"], correct: 2 },
    { q: "Where ____ you go yesterday morning?", options: ["do", "did", "were", "was"], correct: 1 }
  ]
},
{
  id: '21',
  category: 'Thì',
  title: '21. Past Continuous (Thì quá khứ tiếp diễn)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Thì quá khứ tiếp diễn - Diễn tả hành động đang xảy ra trong quá khứ</span>
      </div>

      {/* 1. Cấu trúc của thì quá khứ tiếp diễn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">1. Cấu trúc của thì quá khứ tiếp diễn</h3>
        
        {/* 1.1. Thể khẳng định */}
        <div className="mb-4">
          <h4 className="font-bold text-green-700 mb-2">1.1. Thể khẳng định</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-mono text-center text-base">I/He/She/It + was + V-ing</p>
              <p className="italic text-sm mt-2">He was playing tennis at that time.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-mono text-center text-base">We/You/They + were + V-ing</p>
              <p className="italic text-sm mt-2">They were watching a film at 9 last night.</p>
            </div>
          </div>
        </div>

        {/* 1.2. Thể phủ định */}
        <div className="mb-4">
          <h4 className="font-bold text-red-700 mb-2">1.2. Thể phủ định</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-mono text-center text-base">I/He/She/It + was + not + V-ing</p>
              <p className="italic text-sm mt-2">She wasn't talking on the phone at 2 this afternoon.</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-mono text-center text-base">We/You/They + were + not + V-ing</p>
              <p className="italic text-sm mt-2">We were not lying on the beach at 6 p.m.</p>
            </div>
          </div>
          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
            <p className="font-bold">Lưu ý: was not = wasn't, were not = weren't</p>
          </div>
        </div>

        {/* 1.3. Thể nghi vấn */}
        <div className="mb-4">
          <h4 className="font-bold text-blue-700 mb-2">1.3. Thể nghi vấn</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-mono text-center text-base">Was + I/he/she/it + V-ing?</p>
              <p className="italic text-sm mt-2">Was he reading in the library at that time?</p>
              <p className="italic text-sm">→ No, he wasn't.</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-mono text-center text-base">Were + we/you/they + V-ing?</p>
              <p className="italic text-sm mt-2">Were you waiting for the bus at 6 yesterday?</p>
              <p className="italic text-sm">→ Yes, we were.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cách dùng của thì quá khứ tiếp diễn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">2. Cách dùng của thì quá khứ tiếp diễn</h3>
        
        <div className="space-y-4">
          {/* 2.1 */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">2.1. Hành động đang xảy ra tại 1 thời điểm xác định trong quá khứ</p>
            <p className="italic text-sm">We were taking an oral test at 2 p.m. this afternoon.</p>
            <p className="italic text-sm">At this time yesterday morning, I was running in the park.</p>
          </div>

          {/* 2.2 */}
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">2.2. Hành động xảy ra liên tục trong một khoảng thời gian trong quá khứ</p>
            <p className="italic text-sm">He was sleeping all the afternoon yesterday.</p>
          </div>

          {/* 2.3 */}
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">2.3. Hành động đang xảy ra thì bị hành động khác cắt ngang</p>
            <p className="italic text-sm">I was sleeping when someone knocked at my door.</p>
            <p className="italic text-sm">When the storm began, the ship was sailing in the sea.</p>
          </div>

          {/* 2.4 */}
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">2.4. Hai hành động xảy ra cùng lúc trong quá khứ</p>
            <p className="italic text-sm">He was playing the piano while she was singing.</p>
            <p className="italic text-sm">Mary was cooking while her friends were chatting.</p>
          </div>

          {/* 2.5 */}
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-red-700">2.5. Dùng với "always" để diễn tả hành động lặp lại gây khó chịu</p>
            <p className="italic text-sm">He was always telling lies.</p>
          </div>
        </div>
      </section>

      {/* 3. Chú ý */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">3. Chú ý</h3>
        
        {/* 3.1. Dấu hiệu nhận biết */}
        <div className="mb-4">
          <h4 className="font-bold text-orange-700 mb-2">3.1. Dấu hiệu nhận biết thì quá khứ tiếp diễn</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">at + giờ + thời gian QK</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">at this time + thời gian QK</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">when + mệnh đề QK</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">while</span>
          </div>
        </div>

        {/* 3.2. Quy tắc thêm đuôi ing */}
        <div>
          <h4 className="font-bold text-orange-700 mb-2">3.2. Quy tắc thêm đuôi ing cho động từ</h4>
          <p className="text-sm mb-2">Quy tắc giống như thêm đuôi ing trong thì hiện tại tiếp diễn.</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-bold">wait</p>
              <p className="text-green-600">→ waiting</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-bold">give</p>
              <p className="text-green-600">→ giving</p>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <p className="font-bold">knee</p>
              <p className="text-green-600">→ kneeing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-200">
        <h4 className="font-bold text-center text-purple-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">Khẳng định</p>
            <p className="font-mono">S + was/were + V-ing</p>
            <p className="italic">I was working.</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-red-600">Phủ định</p>
            <p className="font-mono">S + wasn't/weren't + V-ing</p>
            <p className="italic">I wasn't working.</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Nghi vấn</p>
            <p className="font-mono">Was/Were + S + V-ing?</p>
            <p className="italic">Were you working?</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>QKTD:</strong> was/were + V-ing - đang làm gì đó trong quá khứ</li>
          <li><strong>When + QKĐ</strong> (hành động cắt ngang) → <strong>QKTD</strong> (hành động đang xảy ra)</li>
          <li><strong>While + QKTD</strong> (hai hành động cùng xảy ra)</li>
          <li><strong>Dấu hiệu:</strong> at that time, at + giờ + QK, all day yesterday</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>QKTD: đang làm - was/were + V-ing</p>
          <p>When cắt ngang, while song song</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "At 8 p.m. yesterday, I ____ my homework.", options: ["do", "did", "was doing", "were doing"], correct: 2 },
    { q: "She ____ when I came in.", options: ["sleep", "slept", "was sleeping", "were sleeping"], correct: 2 },
    { q: "They ____ football at 5 p.m. yesterday.", options: ["play", "played", "was playing", "were playing"], correct: 3 },
    { q: "While my mother ____, I was watching TV.", options: ["cook", "cooked", "was cooking", "were cooking"], correct: 2 },
    { q: "He ____ always ____ lies.", options: ["was / tell", "was / telling", "were / tell", "were / telling"], correct: 1 }
  ]
},
{
  id: '22',
  category: 'So sánh thì',
  title: '22. Compare Past Simple & Past Continuous',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>So sánh thì quá khứ đơn và quá khứ tiếp diễn</span>
      </div>

      {/* 1. So sánh dạng thức của động từ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">1. So sánh dạng thức của động từ</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 text-center mb-2">Quá khứ đơn</h4>
            <p className="font-mono text-center text-base">S + V-ed / V2</p>
            <p className="font-mono text-center text-base">S + was/were</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-bold text-purple-700 text-center mb-2">Quá khứ tiếp diễn</h4>
            <p className="font-mono text-center text-base">S + was/were + V-ing</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-center">
          <p className="italic">They were riding bikes when I saw them.</p>
          <p className="text-xs text-gray-500 mt-1">(Họ đang đạp xe khi tôi nhìn thấy họ.)</p>
        </div>
      </section>

      {/* 2. So sánh cách dùng */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">2. So sánh cách dùng</h3>
        
        {/* 2.1 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-2">2.1. Hành động đã kết thúc vs Hành động đang xảy ra</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Quá khứ đơn</p>
              <p className="text-sm">Hành động xảy ra và kết thúc trong quá khứ</p>
              <p className="italic text-sm mt-1">Yesterday I worked in the office.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-700">Quá khứ tiếp diễn</p>
              <p className="text-sm">Hành động đang xảy ra tại một thời điểm xác định trong quá khứ</p>
              <p className="italic text-sm mt-1">At 5 p.m. yesterday, I was working in the office.</p>
            </div>
          </div>
        </div>

        {/* 2.2 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-2">2.2. Chuỗi hành động vs Hành động song song</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Quá khứ đơn</p>
              <p className="text-sm">Chỉ chuỗi hành động xảy ra lần lượt trong quá khứ</p>
              <p className="italic text-sm mt-1">I came home and then I cooked dinner for my children.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-700">Quá khứ tiếp diễn</p>
              <p className="text-sm">Chỉ nhiều hành động xảy ra đồng thời trong quá khứ</p>
              <p className="italic text-sm mt-1">My father was watching TV while we were cooking.</p>
            </div>
          </div>
        </div>

        {/* 2.3 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-2">2.3. Kết hợp Quá khứ đơn và Quá khứ tiếp diễn</h4>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm">Diễn tả hành động <strong>đang xảy ra</strong> (QKTD) thì có hành động khác <strong>xen vào</strong> (QKĐ)</p>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              <div className="p-2 bg-white rounded text-center">
                <p className="font-bold text-purple-600">QKTD</p>
                <p className="italic text-sm">were working</p>
                <p className="text-xs">(đang xảy ra)</p>
              </div>
              <div className="p-2 bg-white rounded text-center">
                <p className="font-bold text-blue-600">QKĐ</p>
                <p className="italic text-sm">came</p>
                <p className="text-xs">(xen vào)</p>
              </div>
            </div>
            <p className="italic text-sm mt-2">When he came, we were working.</p>
            <p className="text-xs text-gray-500">(Khi anh ta đến, chúng tôi đang làm việc.)</p>
          </div>
        </div>

        {/* 2.4 */}
        <div className="mb-6">
          <h4 className="font-bold text-red-600 mb-2">2.4. Động từ không dùng ở Quá khứ tiếp diễn</h4>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm">Các động từ chỉ trạng thái, cảm xúc, nhận thức:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 bg-white rounded text-xs">like</span>
              <span className="px-2 py-1 bg-white rounded text-xs">love</span>
              <span className="px-2 py-1 bg-white rounded text-xs">want</span>
              <span className="px-2 py-1 bg-white rounded text-xs">need</span>
              <span className="px-2 py-1 bg-white rounded text-xs">know</span>
              <span className="px-2 py-1 bg-white rounded text-xs">understand</span>
              <span className="px-2 py-1 bg-white rounded text-xs">see</span>
              <span className="px-2 py-1 bg-white rounded text-xs">hear</span>
              <span className="px-2 py-1 bg-white rounded text-xs">believe</span>
            </div>
            <div className="mt-2">
              <p className="italic text-sm">We knew each other very well.</p>
              <p className="italic text-sm">I saw him when he was outside.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dấu hiệu nhận biết */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">3. Dấu hiệu nhận biết</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700 text-center">Quá khứ đơn</p>
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              <span className="px-2 py-1 bg-white rounded text-xs">yesterday</span>
              <span className="px-2 py-1 bg-white rounded text-xs">last month</span>
              <span className="px-2 py-1 bg-white rounded text-xs">... ago</span>
              <span className="px-2 py-1 bg-white rounded text-xs">when</span>
              <span className="px-2 py-1 bg-white rounded text-xs">then</span>
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700 text-center">Quá khứ tiếp diễn</p>
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              <span className="px-2 py-1 bg-white rounded text-xs">all day</span>
              <span className="px-2 py-1 bg-white rounded text-xs">the whole day</span>
              <span className="px-2 py-1 bg-white rounded text-xs">while</span>
              <span className="px-2 py-1 bg-white rounded text-xs">at + giờ + QK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bảng so sánh tổng hợp */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-2xl border border-indigo-200 overflow-x-auto">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG SO SÁNH TỔNG HỢP</h4>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Tiêu chí</th>
              <th className="p-2 border">Quá khứ đơn</th>
              <th className="p-2 border">Quá khứ tiếp diễn</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold">Công thức</td><td className="p-2">V-ed / V2</td><td className="p-2">was/were + V-ing</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Hành động</td><td className="p-2">Đã xảy ra và kết thúc</td><td className="p-2">Đang xảy ra</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Chuỗi hành động</td><td className="p-2">Xảy ra lần lượt</td><td className="p-2">Xảy ra đồng thời</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Kết hợp</td><td className="p-2">Hành động xen vào</td><td className="p-2">Hành động đang xảy ra</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Dấu hiệu</td><td className="p-2">yesterday, last, ago</td><td className="p-2">while, at + giờ QK</td></tr>
          </tbody>
        </table>
      </section>

      {/* Sơ đồ minh họa */}
      <section className="bg-white p-5 rounded-2xl border shadow-sm">
        <h4 className="font-bold text-center text-indigo-800 mb-3">SƠ ĐỒ MINH HỌA</h4>
        <div className="bg-slate-100 p-4 rounded-lg text-center">
          <p className="font-mono text-sm">When he <span className="text-blue-600 font-bold">came</span> (QKĐ), we <span className="text-purple-600 font-bold">were working</span> (QKTD)</p>
          <div className="relative h-16 mt-4">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300"></div>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="absolute left-1/4 top-8 text-xs text-purple-600">Đang làm việc (QKTD)</div>
            <div className="absolute left-3/4 top-8 text-xs text-blue-600">Anh ta đến (QKĐ)</div>
            <div className="absolute left-1/3 -top-2 text-xs text-gray-500">← thời gian →</div>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>QKĐ:</strong> Hành động đã xong, kết thúc, xảy ra lần lượt</li>
          <li><strong>QKTD:</strong> Hành động đang làm, xảy ra đồng thời</li>
          <li><strong>When + QKĐ</strong> (hành động xen vào) → <strong>QKTD</strong> (hành động đang xảy ra)</li>
          <li><strong>While + QKTD</strong> (hai hành động cùng xảy ra)</li>
          <li><strong>Động từ trạng thái:</strong> like, love, know, understand → không dùng QKTD</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>QKĐ: xong rồi, nối tiếp nhau - QKTD: đang làm, cùng lúc với nhau</p>
          <p>When + QKĐ, QKTD - While + QKTD, QKTD</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "When he ____, we were working.", options: ["come", "came", "was coming", "were coming"], correct: 1 },
    { q: "Yesterday I ____ in the office all day.", options: ["work", "worked", "was working", "were working"], correct: 1 },
    { q: "At 5 p.m. yesterday, I ____ in the office.", options: ["work", "worked", "was working", "were working"], correct: 2 },
    { q: "While my father ____ TV, we were cooking.", options: ["watch", "watched", "was watching", "were watching"], correct: 2 },
    { q: "I ____ him when he was outside.", options: ["see", "saw", "was seeing", "were seeing"], correct: 1 }
  ]
},
{
  id: '23',
  category: 'Thì',
  title: '23. Simple Future (Thì tương lai đơn)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Thì tương lai đơn - Diễn tả hành động sẽ xảy ra trong tương lai</span>
      </div>

      {/* 1. Cấu trúc của thì tương lai đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">1. Cấu trúc của thì tương lai đơn</h3>
        
        {/* 1.1. Dạng khẳng định */}
        <div className="mb-4">
          <h4 className="font-bold text-green-700 mb-2">1.1. Dạng khẳng định</h4>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-mono text-center text-base">S + will + V (nguyên mẫu)</p>
            <p className="text-sm text-center mt-1">S + will = S'll (I will = I'll, They will = they'll...)</p>
            <p className="italic text-center text-sm mt-2">I will fly to Ho Chi Minh City tomorrow.</p>
            <p className="text-xs text-gray-500 text-center">(Ngày mai, mình sẽ bay vào thành phố Hồ Chí Minh.)</p>
          </div>
        </div>

        {/* 1.2. Dạng phủ định */}
        <div className="mb-4">
          <h4 className="font-bold text-red-700 mb-2">1.2. Dạng phủ định</h4>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-mono text-center text-base">S + won't + V (nguyên mẫu)</p>
            <p className="text-sm text-center mt-1">will not = won't</p>
            <p className="italic text-center text-sm mt-2">Don't lend him money. He won't pay you back.</p>
            <p className="text-xs text-gray-500 text-center">(Đừng cho anh ta vay tiền. Anh ta sẽ không trả lại bạn đâu.)</p>
          </div>
        </div>

        {/* 1.3. Dạng nghi vấn */}
        <div className="mb-4">
          <h4 className="font-bold text-blue-700 mb-2">1.3. Dạng nghi vấn</h4>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-mono text-center text-base">Will + S + V (nguyên mẫu)?</p>
            <p className="text-sm text-center mt-1">Trả lời: Yes, S + will. / No, S + won't.</p>
            <p className="italic text-center text-sm mt-2">Will they come back to Vietnam next year? - Yes, they will.</p>
            <p className="text-xs text-gray-500 text-center">(Sang năm, họ sẽ quay lại Việt Nam chứ? - Đúng rồi.)</p>
          </div>
        </div>
      </section>

      {/* 2. Cách dùng của thì tương lai đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">2. Cách dùng của thì tương lai đơn</h3>
        
        <div className="space-y-4">
          {/* 2.1 */}
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700">2.1. Dự đoán chung về tương lai</p>
            <p className="italic text-sm">I think the economy will recover soon.</p>
            <p className="text-xs text-gray-500">(Tôi nghĩ nền kinh tế sẽ sớm phục hồi.)</p>
          </div>

          {/* 2.2 */}
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700">2.2. Quyết định ngay tại thời điểm nói</p>
            <p className="italic text-sm">The phone is ringing. - I will get it.</p>
            <p className="text-xs text-gray-500">(Điện thoại đang reo kìa. - Tớ sẽ nghe máy.)</p>
          </div>

          {/* 2.3 */}
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">2.3. Thể hiện suy nghĩ, thái độ</p>
            <p className="italic text-sm">I'm afraid he won't be free today.</p>
            <p className="text-xs text-gray-500">(Tôi e hôm nay anh ta không rảnh đâu.)</p>
            <p className="italic text-sm mt-1">I think, I hope, I believe, I'm sure...</p>
          </div>

          {/* 2.4 */}
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700">2.4. Đề nghị, yêu cầu, lời hứa</p>
            <p className="italic text-sm">Will you go with me?</p>
            <p className="italic text-sm">I promise I will pick you up.</p>
          </div>

          {/* 2.5 */}
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-orange-700">2.5. Câu điều kiện loại I</p>
            <p className="italic text-sm">If it rains, we will play indoor.</p>
            <p className="text-xs text-gray-500">(Nếu trời mưa, chúng ta sẽ chơi trong nhà.)</p>
          </div>
        </div>
      </section>

      {/* 3. Chú ý */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">3. Chú ý</h3>
        
        {/* 3.1. Cách sử dụng của "shall" */}
        <div className="mb-4">
          <h4 className="font-bold text-teal-700 mb-2">3.1. Cách sử dụng của "Shall"</h4>
          <div className="p-3 bg-teal-50 rounded-lg">
            <p className="text-sm">Shall được dùng giống như will nhưng chỉ đi với <strong>I</strong> và <strong>we</strong>.</p>
            <p className="text-sm">shall not = shan't</p>
            <p className="text-sm mt-2">Ngày nay shall thường được dùng để đưa ra <strong>lời đề nghị</strong> hoặc <strong>gợi ý</strong>.</p>
            <p className="font-mono text-center text-sm mt-2">Shall + I/we + V?</p>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              <div className="p-2 bg-white rounded">
                <p className="italic text-sm">Shall I drive you to the airport?</p>
                <p className="text-xs text-gray-500">(Tôi đưa bạn đến sân bay nhé?)</p>
              </div>
              <div className="p-2 bg-white rounded">
                <p className="italic text-sm">Shall we start now?</p>
                <p className="text-xs text-gray-500">(Chúng ta bắt đầu luôn bây giờ được không?)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3.2. Dấu hiệu nhận biết */}
        <div>
          <h4 className="font-bold text-orange-700 mb-2">3.2. Dấu hiệu nhận biết thì tương lai đơn</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-bold">tomorrow</p>
              <p className="italic text-sm">I'll see you tomorrow.</p>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-bold">next + time</p>
              <p className="italic text-sm">We will go to Moc Chau next week.</p>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-bold">one day</p>
              <p className="italic text-sm">I will become a millionaire one day.</p>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-bold">in + time</p>
              <p className="italic text-sm">He'll be back in 5 minutes.</p>
            </div>
          </div>
          <div className="mt-3 p-2 bg-yellow-50 rounded">
            <p className="font-bold">Từ chỉ quan điểm:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-2 py-1 bg-white rounded text-xs">think</span>
              <span className="px-2 py-1 bg-white rounded text-xs">believe</span>
              <span className="px-2 py-1 bg-white rounded text-xs">suppose</span>
              <span className="px-2 py-1 bg-white rounded text-xs">perhaps</span>
              <span className="px-2 py-1 bg-white rounded text-xs">probably</span>
            </div>
            <p className="italic text-sm mt-2">She believes that she will pass the exam.</p>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
        <h4 className="font-bold text-center text-blue-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">Khẳng định</p>
            <p className="font-mono">S + will + V</p>
            <p className="italic">I will go</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-red-600">Phủ định</p>
            <p className="font-mono">S + won't + V</p>
            <p className="italic">I won't go</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">Nghi vấn</p>
            <p className="font-mono">Will + S + V?</p>
            <p className="italic">Will you go?</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Will + V</strong> - sẽ làm gì trong tương lai</li>
          <li><strong>Won't + V</strong> - sẽ không làm gì</li>
          <li><strong>Quyết định nhanh:</strong> nghĩ sao nói vậy ngay tại lúc nói</li>
          <li><strong>Dự đoán:</strong> không có căn cứ, chỉ là suy nghĩ chủ quan</li>
          <li><strong>Shall:</strong> chỉ dùng với I/We, để đề nghị hoặc gợi ý</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>TLĐ: will + V - quyết định nhanh, dự đoán, hứa hẹn</p>
          <p>Shall I/we? - lời đề nghị lịch sự</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "I think the economy ____ recover soon.", options: ["is", "are", "will", "won't"], correct: 2 },
    { q: "The phone is ringing. I ____ get it.", options: ["am", "will", "won't", "shall"], correct: 1 },
    { q: "Don't lend him money. He ____ pay you back.", options: ["will", "won't", "is", "are"], correct: 1 },
    { q: "____ we start now?", options: ["Will", "Shall", "Do", "Are"], correct: 1 },
    { q: "If it rains, we ____ play indoor.", options: ["will", "won't", "are", "is"], correct: 0 }
  ]
},
{
  id: '24',
  category: 'Thì',
  title: '24. Future Expressions (Các cách diễn đạt tương lai)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Các cách diễn đạt tương lai - Be going to, HTTD, HTĐ, TLĐ</span>
      </div>

      {/* 1. Tương lai gần (be going to) */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">1. Tương lai gần (be going to)</h3>
        
        <div className="p-3 bg-green-50 rounded-lg mb-4">
          <p className="font-mono text-center text-base">S + be (not) going to + V (nguyên mẫu)</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700">Dự định có từ trước thời điểm nói</p>
            <p className="italic text-sm">I'm going to sew my own clothes. I've already bought some nice fabric.</p>
            <p className="text-xs text-gray-500">(Tôi định sẽ tự may quần áo. Tôi đã mua được 1 ít vải rất đẹp.)</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700">Dự đoán dựa trên dấu hiệu ở hiện tại</p>
            <p className="italic text-sm">Look at those dark clouds. It's going to rain.</p>
            <p className="text-xs text-gray-500">(Hãy nhìn những đám mây đen kia. Trời sắp mưa.)</p>
          </div>
        </div>
      </section>

      {/* 2. Be going to, Hiện tại tiếp diễn và Hiện tại đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">2. Be going to, Hiện tại tiếp diễn và Hiện tại đơn</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700 text-center">be going to</p>
            <p className="text-sm text-center">Dự định có thể sẽ làm</p>
            <p className="italic text-sm text-center mt-2">I'm going to see the doctor tomorrow.</p>
            <p className="text-xs text-gray-500 text-center">(Ngày mai tôi sẽ đi khám bác sĩ.)</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700 text-center">Hiện tại tiếp diễn</p>
            <p className="text-sm text-center">Kế hoạch đã sắp xếp trước</p>
            <p className="italic text-sm text-center mt-2">I'm seeing the doctor tomorrow.</p>
            <p className="text-xs text-gray-500 text-center">(Ngày mai tôi sẽ đi khám bác sĩ.)</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700 text-center">Hiện tại đơn</p>
            <p className="text-sm text-center">Lịch trình, thời gian biểu</p>
            <p className="italic text-sm text-center mt-2">The train to London leaves at 8 o'clock this evening.</p>
            <p className="text-xs text-gray-500 text-center">(Chuyến tàu đến Luân Đôn sẽ rời đi lúc 8 giờ tối nay.)</p>
          </div>
        </div>
      </section>

      {/* 3. Be going to và Tương lai đơn */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">3. Be going to và Tương lai đơn</h3>
        
        {/* 3.1. Dự đoán */}
        <div className="mb-4">
          <h4 className="font-bold text-orange-700 mb-2">3.1. Dự đoán</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-bold text-green-700">be going to</p>
              <p className="text-sm">Dự đoán có cơ sở khách quan</p>
              <p className="italic text-sm mt-1">Look! The sky is dark. It's going to rain.</p>
              <p className="text-xs text-gray-500">(Nhìn kìa! Bầu trời xám xịt quá. Trời chuẩn bị mưa.)</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Tương lai đơn</p>
              <p className="text-sm">Dự đoán chủ quan</p>
              <p className="italic text-sm mt-1">It will stop raining soon, I hope.</p>
              <p className="text-xs text-gray-500">(Trời sẽ sớm tạnh thôi, tôi hi vọng thế.)</p>
            </div>
          </div>
        </div>

        {/* 3.2. Dự định */}
        <div>
          <h4 className="font-bold text-orange-700 mb-2">3.2. Dự định / Quyết định</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-bold text-green-700">be going to</p>
              <p className="text-sm">Dự định làm gì trước thời điểm nói</p>
              <p className="italic text-sm mt-1">I'm going to buy a new dress.</p>
              <p className="text-xs text-gray-500">(Em sẽ đi mua một cái váy mới.)</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-bold text-blue-700">Tương lai đơn</p>
              <p className="text-sm">Quyết định làm gì ngay tại thời điểm nói</p>
              <p className="italic text-sm mt-1">I'll go with you.</p>
              <p className="text-xs text-gray-500">(Anh sẽ đi cùng em.)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bảng so sánh tổng hợp */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-2xl border border-green-200 overflow-x-auto">
        <h4 className="font-bold text-center text-green-800 mb-3">BẢNG SO SÁNH CÁC CÁCH DIỄN ĐẠT TƯƠNG LAI</h4>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Cấu trúc</th>
              <th className="p-2 border">Cách dùng</th>
              <th className="p-2 border">Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-bold text-green-600">be going to</td>
              <td className="p-2">Dự định từ trước / Dự đoán có căn cứ</td>
              <td className="p-2 italic">I'm going to study abroad.</td>
            </tr>
            <tr className="border-b bg-slate-50">
              <td className="p-2 font-bold text-purple-600">HT tiếp diễn</td>
              <td className="p-2">Kế hoạch đã sắp xếp</td>
              <td className="p-2 italic">I'm meeting John at 6 PM.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold text-blue-600">HT đơn</td>
              <td className="p-2">Lịch trình, thời gian biểu</td>
              <td className="p-2 italic">The train leaves at 8 PM.</td>
            </tr>
            <tr className="border-b bg-slate-50">
              <td className="p-2 font-bold text-red-600">TL đơn (will)</td>
              <td className="p-2">Quyết định nhanh / Dự đoán chủ quan</td>
              <td className="p-2 italic">I think it will rain.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Sơ đồ so sánh */}
      <section className="bg-white p-5 rounded-2xl border shadow-sm">
        <h4 className="font-bold text-center text-green-800 mb-3">SƠ ĐỒ SO SÁNH NHANH</h4>
        <div className="space-y-3">
          <div className="p-2 bg-yellow-50 rounded">
            <p className="font-bold">be going to → Dự định đã có từ trước</p>
            <p className="italic text-sm">I've bought fabric. <span className="text-green-600">I'm going to sew</span> my own clothes.</p>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <p className="font-bold">Hiện tại tiếp diễn → Kế hoạch đã sắp xếp</p>
            <p className="italic text-sm">I have an appointment. <span className="text-purple-600">I'm seeing</span> the doctor tomorrow.</p>
          </div>
          <div className="p-2 bg-red-50 rounded">
            <p className="font-bold">Hiện tại đơn → Lịch trình cố định</p>
            <p className="italic text-sm">According to schedule, <span className="text-blue-600">the train leaves</span> at 8 PM.</p>
          </div>
          <div className="p-2 bg-orange-50 rounded">
            <p className="font-bold">Tương lai đơn → Quyết định tại thời điểm nói</p>
            <p className="italic text-sm">The phone is ringing. <span className="text-red-600">I'll get</span> it.</p>
          </div>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>be going to:</strong> đã định từ trước (có bằng chứng) / sắp sửa xảy ra</li>
          <li><strong>HTTD:</strong> đã lên lịch, có thời gian cụ thể</li>
          <li><strong>HTĐ:</strong> lịch trình cố định (tàu xe, giờ học, giờ làm)</li>
          <li><strong>will:</strong> quyết định nhanh, dự đoán cá nhân, hứa hẹn</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>be going to: có dự định, có căn cứ</p>
          <p>HTTD: đã lên lịch rõ ràng</p>
          <p>HTĐ: giờ giấc cố định</p>
          <p>will: quyết định nhanh, hứa hẹn</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "Look at those dark clouds. It ____ rain.", options: ["will", "is going to", "is", "are"], correct: 1 },
    { q: "I've already bought the fabric. I ____ sew my own clothes.", options: ["will", "am going to", "am", "are"], correct: 1 },
    { q: "The train to London ____ at 8 o'clock this evening.", options: ["leaves", "is leaving", "will leave", "is going to leave"], correct: 0 },
    { q: "The phone is ringing. I ____ get it.", options: ["am going to", "will", "am", "are"], correct: 1 },
    { q: "I ____ the doctor tomorrow at 3 PM. I have an appointment.", options: ["see", "am seeing", "will see", "am going to see"], correct: 1 }
  ]
},
{
  id: '25',
  category: 'Từ nhấn mạnh',
  title: '25. Emphatic Words (Từ nhấn mạnh)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Từ nhấn mạnh - So/Such/Too/Enough</span>
      </div>

      {/* 1. Cấu trúc: so/such */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-red-600 mb-4 border-b border-red-200 pb-2">1. Cấu trúc: SO / SUCH</h3>
        
        <div className="mb-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-mono text-center text-base">so + adj/adv</p>
              <p className="italic text-center text-sm mt-2">Mr. Bean's films are so interesting.</p>
              <p className="text-xs text-gray-500 text-center">(Những bộ phim của Mr. Bean rất hấp dẫn.)</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-mono text-center text-base">such + (a/an + adj) + N</p>
              <p className="italic text-center text-sm mt-2">It is such a cold winter.</p>
              <p className="text-xs text-gray-500 text-center">(Thật là một mùa đông lạnh giá.)</p>
              <p className="italic text-center text-sm mt-1">They are such idiots!</p>
              <p className="text-xs text-gray-500 text-center">(Họ quả là những thằng ngốc!)</p>
            </div>
          </div>
        </div>

        {/* Mệnh đề chỉ kết quả */}
        <div className="mb-4">
          <h4 className="font-bold text-orange-700 mb-2">Mệnh đề chỉ kết quả (so/such...that)</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-mono text-center text-sm">S + V + so + adj/adv + that + S + V</p>
              <p className="italic text-sm text-center mt-2">The alarm is so loud that she can't sleep.</p>
              <p className="text-xs text-gray-500 text-center">(Chuông kêu to đến mức cô ấy không thể ngủ được.)</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <p className="font-mono text-center text-sm">S + V + such + (a/an + adj) + N + that + S + V</p>
              <p className="italic text-sm text-center mt-2">She is reading such an interesting book that she can't put it down.</p>
              <p className="text-xs text-gray-500 text-center">(Cô ấy đang đọc quyển sách hay đến nỗi cô ấy không thể bỏ nó xuống được.)</p>
            </div>
          </div>
        </div>

        {/* Chú ý */}
        <div>
          <h4 className="font-bold text-orange-700 mb-2">Chú ý với so/such</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="font-mono text-center text-sm">so + many/much/few/little + N (+ that...)</p>
              <p className="italic text-sm text-center mt-2">There were so few people at the meeting.</p>
              <p className="text-xs text-gray-500 text-center">(Có rất ít người tham dự cuộc họp.)</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg">
              <p className="font-mono text-center text-sm">such + a lot of + N (+ that...)</p>
              <p className="italic text-sm text-center mt-2">They invested such a lot of money in the project.</p>
              <p className="text-xs text-gray-500 text-center">(Họ đầu tư rất nhiều tiền vào dự án.)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cấu trúc: too/enough */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-red-600 mb-4 border-b border-red-200 pb-2">2. Cấu trúc: TOO / ENOUGH</h3>
        
        <div className="mb-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-mono text-center text-base">too + adj/adv + to V</p>
              <p className="text-sm text-center">(quá ... không thể ...)</p>
              <p className="italic text-center text-sm mt-2">They came too late to buy tickets.</p>
              <p className="text-xs text-gray-500 text-center">(Họ đến quá muộn nên không thể mua được vé.)</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-mono text-center text-base">adj/adv + enough + to V</p>
              <p className="text-sm text-center">(đủ ... để có thể ...)</p>
              <p className="italic text-center text-sm mt-2">Mary came early enough to greet everyone.</p>
              <p className="text-xs text-gray-500 text-center">(Mary đến vừa đủ sớm để chào tất cả mọi người.)</p>
            </div>
          </div>
        </div>

        {/* Chú ý với too/enough */}
        <div>
          <h4 className="font-bold text-orange-700 mb-2">Chú ý với too/enough</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-mono text-center text-sm">too + adj/adv + for sb/sth + to V</p>
              <p className="text-sm text-center">(quá... cho ai/cái gì không thể...)</p>
              <p className="italic text-sm text-center mt-2">The safe is too heavy for me to lift.</p>
              <p className="text-xs text-gray-500 text-center">(Cái két quá nặng tôi không thể nhấc lên được.)</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <p className="font-mono text-center text-sm">enough + N + for sb/sth (+ to V)</p>
              <p className="text-sm text-center">(đủ... cho ai/cái gì để...)</p>
              <p className="italic text-sm text-center mt-2">They prepare enough food for all the guests.</p>
              <p className="text-xs text-gray-500 text-center">(Họ đã chuẩn bị đủ đồ ăn cho tất cả các vị khách.)</p>
              <p className="italic text-sm text-center mt-1">There is enough time for all the students to finish the test.</p>
              <p className="text-xs text-gray-500 text-center">(Có đủ thời gian cho tất cả các bạn học sinh hoàn thành bài kiểm tra.)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-2xl border border-red-200 overflow-x-auto">
        <h4 className="font-bold text-center text-red-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="p-2 border">Cấu trúc</th>
              <th className="p-2 border">Công thức</th>
              <th className="p-2 border">Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold">so</td><td className="p-2">so + adj/adv</td><td className="p-2 italic">so beautiful</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">such</td><td className="p-2">such + (a/an + adj) + N</td><td className="p-2 italic">such a beautiful girl</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">so...that</td><td className="p-2">so + adj/adv + that</td><td className="p-2 italic">so loud that I can't sleep</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">such...that</td><td className="p-2">such + N + that</td><td className="p-2 italic">such a good book that I read it twice</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">too</td><td className="p-2">too + adj/adv + to V</td><td className="p-2 italic">too late to go</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">enough</td><td className="p-2">adj/adv + enough + to V</td><td className="p-2 italic">old enough to drive</td></tr>
          </tbody>
        </table>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>so + adj/adv</strong> - rất (đứng trước tính từ/trạng từ)</li>
          <li><strong>such + (a/an) + N</strong> - thật là (đứng trước danh từ)</li>
          <li><strong>so/such...that</strong> - quá... đến nỗi mà</li>
          <li><strong>too + adj/adv + to V</strong> - quá... đến nỗi không thể</li>
          <li><strong>adj/adv + enough + to V</strong> - đủ... để có thể</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>So + adj/adv, such + (a/an) + N</p>
          <p>So...that, such...that (quá... đến nỗi)</p>
          <p>Too...to (quá không thể), enough...to (đủ để)</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "The movie was ____ interesting that I watched it twice.", options: ["so", "such", "too", "enough"], correct: 0 },
    { q: "It is ____ a cold winter.", options: ["so", "such", "too", "enough"], correct: 1 },
    { q: "She came ____ late to catch the bus.", options: ["so", "such", "too", "enough"], correct: 2 },
    { q: "He is old ____ to drive a car.", options: ["so", "such", "too", "enough"], correct: 3 },
    { q: "There were ____ many people that we couldn't get in.", options: ["so", "such", "too", "enough"], correct: 0 }
  ]
},
{
  id: '26',
  category: 'Trợ động từ',
  title: '26. Auxiliary Verbs (Trợ động từ)',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Trợ động từ - Be, Have, Do và Modal Verbs</span>
      </div>

      {/* I. Trợ động từ là gì? */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">I. Trợ động từ (Auxiliary Verbs) là gì?</h3>
        <p className="mb-4">Trợ động từ là các từ theo sau các động từ chính để tạo thành một câu hoàn chỉnh với ý nghĩa đầy đủ.</p>
        <p className="mb-2">Trợ động từ bao gồm: <strong>Be, Have, Do</strong> và các <strong>động từ khuyết thiếu (Modal Verbs)</strong>.</p>
      </section>

      {/* 1. Trợ động từ Be, Have, Do */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">1. Trợ động từ Be, Have, Do</h3>
        <p className="mb-4 text-sm">Có vai trò dùng để trợ giúp động từ chính trong câu để hình thành các thì hay các dạng câu bị động. Dùng để nhờ ai một cách lịch sự, diễn tả khả năng, sự cần thiết, lịch sự…</p>

        {/* Trợ động từ Be */}
        <div className="mb-6">
          <h4 className="font-bold text-blue-700 mb-2">Trợ động từ BE</h4>
          <p className="text-sm mb-2">Động từ "be" hay "to be" là động từ quan trọng được dùng rất nhiều trong Tiếng Anh. Nó có thể được dùng như là 1 động từ chính đứng độc lập trong tất cả các thì gồm: <strong>be, to be, been, am, are, is, was, were, wasn't, was not, aren't, are not, weren't, were not</strong>.</p>
          <p className="text-sm">Khi được dùng với chức năng là 1 trợ động từ thì "be" luôn được theo sau bởi 1 động từ khác để tạo thành cụm động từ hoàn chỉnh, nó có thể là số ít hoặc số nhiều, hiện tại hoặc quá khứ. Các câu phủ định sẽ được thêm "not".</p>
          <div className="mt-2 p-2 bg-blue-50 rounded">
            <p className="italic text-sm">The cat <strong>is eating</strong> a fish.</p>
            <p className="text-xs text-gray-500">(Con mèo đang ăn một con cá.)</p>
          </div>
        </div>

        {/* Trợ động từ Do */}
        <div className="mb-6">
          <h4 className="font-bold text-green-700 mb-2">Trợ động từ DO / DOES / DID</h4>
          <p className="text-sm mb-2">Khi được dùng như là 1 trợ động từ, do luôn luôn kết hợp với 1 động từ khác để tạo thành 1 cụm động từ hoàn chỉnh, nó được dùng trong câu khẳng định để <strong>nhấn mạnh</strong>.</p>
          <p className="text-sm mb-2">Trợ động từ "Do" thường được dùng trong các <strong>câu hỏi và câu phủ định</strong>. Nó cũng được dùng trong <strong>câu tĩnh lược</strong>, khi mà động từ chính được hiểu trước đó.</p>
          <div className="mt-2 p-2 bg-green-50 rounded">
            <p className="italic text-sm">She <strong>does like</strong> ice cream.</p>
            <p className="text-xs text-gray-500">(Cô ấy thích kem thật đấy.)</p>
            <p className="italic text-sm mt-1">He plays piano well, <strong>doesn't he</strong>?</p>
            <p className="italic text-sm">They all had dinner, but I <strong>didn't</strong>.</p>
          </div>
        </div>

        {/* Trợ động từ Have */}
        <div className="mb-6">
          <h4 className="font-bold text-purple-700 mb-2">Trợ động từ HAVE / HAS / HAD</h4>
          <p className="text-sm mb-2">"Have" là động từ rất quan trọng có thể đứng 1 mình độc lập trong tất cả các thì dưới các dạng: <strong>has, have, having, had, hadn't, had not</strong>.</p>
          <p className="text-sm mb-2">Nó được dùng để mô tả <strong>sở hữu</strong>, hoặc cũng được dùng để mô tả khả năng, mô tả ngoại hình của ai đó. "Have" cũng là 1 động từ rất phổ biến để thay thế các động từ "eat" và "drink".</p>
          <div className="mt-2 p-2 bg-purple-50 rounded">
            <p className="italic text-sm">The baby <strong>has</strong> beautiful eyes.</p>
            <p className="text-xs text-gray-500">(Cô bé có đôi mắt rất đẹp.)</p>
            <p className="italic text-sm mt-1">Let's <strong>have</strong> dinner.</p>
            <p className="italic text-sm">Let's <strong>have</strong> a drink.</p>
          </div>
        </div>
      </section>

      {/* 2. Động từ khuyết thiếu (Modal Verbs) */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">2. Động từ khuyết thiếu (Modal Verbs)</h3>
        <p className="mb-3 text-sm">Các động từ khuyết thiếu trong tiếng Anh bao gồm: <strong>can, could, will, would, may, might, shall, should, have to, need, ought to</strong>. Là những động từ không có đầy đủ chức năng và tính chất của động từ thường. Động từ khuyết thiếu không phải để chỉ hành động mà dùng để chỉ phương thức, hành động, thái độ của chủ ngữ.</p>
        
        <p className="mb-2 text-sm"><strong>Vị trí:</strong> Động từ khuyết thiếu thường đứng <strong>trước</strong> các động từ chính trong câu.</p>
        <p className="mb-4 text-sm"><strong>Cấu trúc:</strong> S + Modal Verbs + V (nguyên mẫu không "to")</p>

        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Động từ khuyết thiếu</th>
              <th className="p-2 border">Ý nghĩa</th>
              <th className="p-2 border">Cách dùng</th>
              <th className="p-2 border">Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-bold">Can</td><td className="p-2">Có thể</td><td className="p-2">Diễn tả khả năng xảy ra ở hiện tại hoặc tương lai</td><td className="p-2 italic">I can swim.</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Could</td><td className="p-2">Có thể</td><td className="p-2">Diễn tả khả năng xảy ra trong quá khứ (quá khứ của can)</td><td className="p-2 italic">I think I could understand.</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Will</td><td className="p-2">Sẽ</td><td className="p-2">Diễn đạt sự mong muốn, ý chí hay sự quả quyết</td><td className="p-2 italic">I will pay you at the rate you ask.</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Would</td><td className="p-2">Sẽ</td><td className="p-2">Diễn đạt sự việc sẽ xảy ra hoặc dự đoán có thể xảy ra trong quá khứ</td><td className="p-2 italic">If he were here, he would help us.</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">May</td><td className="p-2">Có lẽ</td><td className="p-2">Diễn tả sự việc có thể xảy ra ở hiện tại, mang tính tình huống</td><td className="p-2 italic">I can swim but I may not swim today.</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Might</td><td className="p-2">Có lẽ</td><td className="p-2">Diễn tả ý nghi ngờ, khả năng thấp hơn may</td><td className="p-2 italic">It might be true.</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Shall</td><td className="p-2">Sẽ</td><td className="p-2">Được dùng để xin ý kiến hay lời khuyên (dùng với I/We)</td><td className="p-2 italic">I shall never forget you.</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Should</td><td className="p-2">Nên</td><td className="p-2">Đưa ra lời khuyên, ý kiến hay để dự đoán</td><td className="p-2 italic">You should have a vacation soon.</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Have to</td><td className="p-2">Phải</td><td className="p-2">Mang ý nghĩa bắt buộc (khách quan)</td><td className="p-2 italic">I don't have to do my homework.</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2 font-bold">Must</td><td className="p-2">Phải</td><td className="p-2">Mang ý nghĩa sự bắt buộc đến từ người nói (chủ quan)</td><td className="p-2 italic">All candidates must answer 20 questions.</td></tr>
            <tr className="border-b"><td className="p-2 font-bold">Ought to</td><td className="p-2">Phải</td><td className="p-2">Diễn tả lời khuyên hoặc sự mong đợi</td><td className="p-2 italic">I ought to go home now.</td></tr>
          </tbody>
        </table>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG TÓM TẮT TRỢ ĐỘNG TỪ</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">BE</p>
            <p>am/is/are/was/were</p>
            <p className="italic text-gray-500">be + V-ing</p>
            <p className="italic text-gray-500">be + V3/ed</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-green-600">DO</p>
            <p>do/does/did</p>
            <p className="italic text-gray-500">dùng trong câu hỏi/phủ định</p>
            <p className="italic text-gray-500">nhấn mạnh</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-purple-600">HAVE</p>
            <p>have/has/had</p>
            <p className="italic text-gray-500">have + V3/ed</p>
            <p className="italic text-gray-500">thì hoàn thành</p>
          </div>
        </div>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold text-center text-indigo-600">MODAL VERBS</p>
          <p className="text-center">can, could, will, would, may, might, shall, should, must, have to, ought to</p>
        </div>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Be:</strong> dùng để chia thì tiếp diễn (V-ing) và bị động (V3/ed)</li>
          <li><strong>Do:</strong> dùng để tạo câu hỏi, câu phủ định và nhấn mạnh</li>
          <li><strong>Have:</strong> dùng để chia thì hoàn thành (have/has/had + V3/ed)</li>
          <li><strong>Modal Verbs:</strong> can, could, will, would, may, might, shall, should, must, have to, ought to</li>
          <li><strong>Sau Modal Verbs</strong> luôn là động từ nguyên mẫu <strong>không "to"</strong></li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>Be + V-ing / V3, Do hỏi phủ nhấn mạnh, Have + V3 hoàn thành</p>
          <p>Modal + V (nguyên mẫu) - can, could, will, would, may, might, shall, should, must, have to</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "The cat ____ eating a fish.", options: ["is", "are", "am", "were"], correct: 0 },
    { q: "She ____ like ice cream. (nhấn mạnh)", options: ["do", "does", "did", "is"], correct: 1 },
    { q: "I ____ swim when I was five.", options: ["can", "could", "will", "may"], correct: 1 },
    { q: "You ____ have a vacation soon. It's good for you.", options: ["must", "have to", "should", "would"], correct: 2 },
    { q: "All candidates ____ answer 20 questions.", options: ["must", "can", "may", "will"], correct: 0 }
  ]
},
{
  id: '27',
  category: 'Ngữ pháp',
  title: '27. Subject and Verb Agreement',
  content: (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
        <span>Hoà hợp giữa chủ ngữ và động từ - Các quy tắc cần nhớ</span>
      </div>

      {/* #1: Thế nào là sự hòa hợp? */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">#1: Thế nào là sự hòa hợp giữa chủ ngữ và động từ?</h3>
        <p className="mb-3">Trong tiếng Anh, việc chia động từ chính xác hay không phụ thuộc hoàn toàn vào dạng thức của <strong>Chủ ngữ</strong>. Chủ ngữ có thể là:</p>
        <ul className="list-disc ml-6 mb-3 space-y-1">
          <li><strong>Đại từ:</strong> I, you, we, they, he, she, it</li>
          <li><strong>Danh từ:</strong> a book, water, ...</li>
        </ul>
        <p>Chúng ta có thể dễ dàng chia động từ đúng với những dạng chủ ngữ trên. Tuy nhiên sẽ có nhiều dạng chủ ngữ phức tạp hơn khiến các bạn gặp khó khăn trong việc chia động từ.</p>
      </section>

      {/* #2: Các quy tắc cần nhớ */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">#2: Các quy tắc cần nhớ</h3>
        
        {/* Quy tắc 1 */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-bold text-blue-700">➤ Quy tắc 1:</p>
          <p>2 chủ ngữ số ít nối với nhau bởi <strong>"or"</strong> hoặc <strong>"nor"</strong> sẽ đi với động từ <strong>số ít</strong>.</p>
          <p className="italic text-sm mt-1">My aunt or my uncle <strong>is arriving</strong> by train today.</p>
          <p className="text-xs text-gray-500">(Dì hoặc chú tôi sẽ đến bằng tàu hôm nay)</p>
        </div>

        {/* Quy tắc 2 */}
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="font-bold text-green-700">➤ Quy tắc 2:</p>
          <p>Chủ ngữ số ít nối với chủ ngữ số nhiều bởi <strong>"or"</strong> hoặc <strong>"nor"</strong>, động từ sẽ chia với <strong>chủ ngữ gần nhất</strong>.</p>
          <p className="italic text-sm mt-1">The serving bowl or the plates <strong>go</strong> on that shelf.</p>
          <p className="text-xs text-gray-500">(Bát hoặc đĩa sẽ được xếp trên giá.)</p>
        </div>

        {/* Quy tắc 3 */}
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
          <p className="font-bold text-yellow-700">➤ Quy tắc 3:</p>
          <p>Công thức <strong>"either...or"</strong> và <strong>"neither...nor"</strong>, động từ sẽ chia với <strong>chủ ngữ đứng gần nó nhất</strong>.</p>
          <p className="italic text-sm mt-1">Either Pete or John <strong>is helping</strong> today with stage decorations.</p>
          <p className="italic text-sm">Neither Pete nor his friends <strong>are available</strong> today.</p>
        </div>

        {/* Quy tắc 4 */}
        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <p className="font-bold text-purple-700">➤ Quy tắc 4:</p>
          <p>Chủ ngữ bị chia tách bởi các từ như: <strong>along with, as well as, besides</strong>, chúng ta bỏ qua những từ trên và chia với <strong>chủ ngữ chính</strong> của câu.</p>
          <p className="italic text-sm mt-1">The politician, along with the newsmen, <strong>is expected</strong> to arrive soon.</p>
          <p className="text-xs text-gray-500">(Các chính trị gia, cùng với các nhà báo, dự kiến sẽ đến sớm.)</p>
        </div>

        {/* Quy tắc 5 */}
        <div className="mb-4 p-3 bg-pink-50 rounded-lg">
          <p className="font-bold text-pink-700">➤ Quy tắc 5:</p>
          <p>Chủ ngữ bắt đầu bằng các đại từ <strong>each, everyone, everybody, anyone, anybody, someone, somebody</strong> đi với động từ <strong>số ít</strong>.</p>
          <p className="italic text-sm mt-1">Each of the girls <strong>dances</strong> beautifully.</p>
          <p className="text-xs text-gray-500">(Cô gái nào cũng nhảy đẹp.)</p>
        </div>

        {/* Quy tắc 6 */}
        <div className="mb-4 p-3 bg-teal-50 rounded-lg">
          <p className="font-bold text-teal-700">➤ Quy tắc 6:</p>
          <p>Với chủ ngữ chỉ <strong>phân số, phần trăm, majority, some, all, none</strong> – dựa vào <strong>danh từ sau giới từ "of"</strong> để xác định cách chia động từ.</p>
          <p className="italic text-sm mt-1">Fifty percent of the pie <strong>has disappeared</strong>.</p>
          <p className="italic text-sm">Fifty percent of the pies <strong>have disappeared</strong>.</p>
          <p className="italic text-sm">One third of the city <strong>is unemployed</strong>.</p>
          <p className="italic text-sm">One third of the people <strong>are unemployed</strong>.</p>
        </div>

        {/* Quy tắc 7 */}
        <div className="mb-4 p-3 bg-orange-50 rounded-lg">
          <p className="font-bold text-orange-700">➤ Quy tắc 7:</p>
          <p>Cụm từ <strong>"the number"</strong> theo sau là động từ <strong>số ít</strong> và cụm từ <strong>"a number"</strong> theo sau là động từ <strong>số nhiều</strong>.</p>
          <p className="italic text-sm mt-1">The number of people we need to hire <strong>is thirteen</strong>.</p>
          <p className="italic text-sm">A number of people <strong>have written</strong> in about this subject.</p>
        </div>

        {/* Quy tắc 8 */}
        <div className="mb-4 p-3 bg-cyan-50 rounded-lg">
          <p className="font-bold text-cyan-700">➤ Quy tắc 8:</p>
          <p>Khi <strong>"either"</strong> và <strong>"neither"</strong> làm chủ ngữ, chúng luôn đi với động từ <strong>số ít</strong>.</p>
          <p className="italic text-sm mt-1">Neither of them <strong>is available</strong> to speak right now.</p>
          <p className="italic text-sm">Either of us <strong>is capable</strong> of doing the job.</p>
        </div>

        {/* Quy tắc 9 */}
        <div className="mb-4 p-3 bg-lime-50 rounded-lg">
          <p className="font-bold text-lime-700">➤ Quy tắc 9:</p>
          <p>Sử dụng động từ <strong>số ít</strong> với cụm từ chỉ <strong>tiền và thời gian</strong>.</p>
          <p className="italic text-sm mt-1">Ten dollars <strong>is</strong> too high to pay.</p>
          <p className="italic text-sm">Five years <strong>is</strong> the maximum sentence for that offense.</p>
        </div>
      </section>

      {/* Bảng tóm tắt */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-200 overflow-x-auto">
        <h4 className="font-bold text-center text-indigo-800 mb-3">BẢNG TÓM TẮT NHANH</h4>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Quy tắc</th>
              <th className="p-2 border">Cấu trúc</th>
              <th className="p-2 border">Động từ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">1</td><td className="p-2">A or B (số ít + số ít)</td><td className="p-2">số ít</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">2</td><td className="p-2">A or B (số ít + số nhiều)</td><td className="p-2">chia theo B (gần nhất)</td></tr>
            <tr className="border-b"><td className="p-2">3</td><td className="p-2">either...or / neither...nor</td><td className="p-2">chia theo chủ ngữ gần nhất</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">4</td><td className="p-2">along with, as well as, besides</td><td className="p-2">chia theo chủ ngữ chính</td></tr>
            <tr className="border-b"><td className="p-2">5</td><td className="p-2">each, everyone, somebody...</td><td className="p-2">số ít</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">6</td><td className="p-2">phân số, % + of + N</td><td className="p-2">chia theo N sau "of"</td></tr>
            <tr className="border-b"><td className="p-2">7</td><td className="p-2">the number / a number</td><td className="p-2">the number + số ít / a number + số nhiều</td></tr>
            <tr className="border-b bg-slate-50"><td className="p-2">8</td><td className="p-2">either / neither (làm chủ ngữ)</td><td className="p-2">số ít</td></tr>
            <tr className="border-b"><td className="p-2">9</td><td className="p-2">tiền, thời gian</td><td className="p-2">số ít</td></tr>
          </tbody>
        </table>
      </section>

      {/* Mẹo ghi nhớ */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-amber-800 mb-2">MẸO GHI NHỚ</h4>
        <ul className="space-y-2 text-sm">
          <li><strong>Or/Nor:</strong> chia theo chủ ngữ gần nhất</li>
          <li><strong>Along with, as well as:</strong> bỏ qua, chia theo chủ ngữ chính</li>
          <li><strong>Each, everyone, somebody:</strong> luôn số ít</li>
          <li><strong>The number + số ít / A number + số nhiều</strong></li>
          <li><strong>Either/Neither:</strong> làm chủ ngữ thì số ít</li>
          <li><strong>Tiền, thời gian:</strong> số ít</li>
        </ul>
        <div className="mt-3 p-2 bg-white rounded text-xs">
          <p className="font-bold">CÂU THẦN CHÚ:</p>
          <p>Or/nor - gần nào chia đó!</p>
          <p>Each/everyone - số ít!</p>
          <p>The number ít - a number nhiều!</p>
        </div>
      </section>
    </div>
  ),
  questions: [
    { q: "Everyone on the board of directors ____ with the planned merger.", options: ["agreeing", "agree", "have agreed", "agrees"], correct: 3 },
    { q: "The number of people we need to hire ____ thirteen.", options: ["are", "is", "were", "have been"], correct: 1 },
    { q: "Either of us ____ capable of doing the job.", options: ["are", "were", "is", "have been"], correct: 2 },
    { q: "Ten dollars ____ too high to pay.", options: ["are", "were", "is", "have been"], correct: 2 },
    { q: "A number of people ____ written in about this subject.", options: ["has", "have", "is", "was"], correct: 1 }
  ]
},
];

// ─── Gộp tất cả bài học từ các file group ─────────────────────────────────
const allGroupLessons = [
  ...lessonsGroup1,
  ...lessonsGroup2,
  ...lessonsGroup3,
  ...lessonsGroup4,
  ...lessonsGroup5,
  ...lessonsGroup6,
  ...lessonsGroup7to12,
];

const mergeLessonQuestions = (originalQuestions = [], masterExercises = []) => {
  const normOriginal = (originalQuestions || []).map((q, idx) => ({
    id: q.id || `orig-${idx}`,
    format: q.format || 'multiple-choice',
    q: q.q || q.question || '',
    options: q.options || [],
    correct: q.correct !== undefined ? q.correct : 0,
    explain: q.explain || q.explanation || '',
    ...q,
  }));

  // Add multi-format exercises from master (fill-in-blank, error-identification, sentence-unscramble)
  const combined = [...normOriginal];
  (masterExercises || []).forEach((item) => {
    if (!combined.some((c) => c.id === item.id || (c.q && c.q === item.q))) {
      combined.push(item);
    }
  });

  return combined;
};

const mapCatalog = (catalog) =>
  catalog.map((catalogItem) => {
    const lessonId = catalogItem.id;
    const masterEx = getExercisesForLesson(lessonId, catalogItem.title, catalogItem.category);
    const original = lessonsData.find((l) => l.id === lessonId);
    if (original) {
      return {
        ...original,
        title: `${catalogItem.num || lessonId}. ${catalogItem.title}`,
        subtitle: catalogItem.subtitle,
        questions: mergeLessonQuestions(original.questions, masterEx),
      };
    }
    const group = allGroupLessons.find((l) => l.id === lessonId);
    if (group) {
      return {
        ...group,
        title: `${catalogItem.num || lessonId}. ${catalogItem.title}`,
        subtitle: catalogItem.subtitle,
        questions: mergeLessonQuestions(group.questions, masterEx),
      };
    }
    const fallback = buildFallbackLesson(catalogItem);
    return {
      ...fallback,
      title: `${catalogItem.num || lessonId}. ${catalogItem.title}`,
      subtitle: catalogItem.subtitle,
      questions: masterEx,
    };
  });

export const page1Index = mapCatalog(GRAMMAR_PAGE1_CATALOG);
export const page2Index = mapCatalog(GRAMMAR_PAGE2_CATALOG);
export const fullIndex = [...page1Index, ...page2Index];