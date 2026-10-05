import React from 'react';

// ─── GROUP 3: CÂU ĐIỀU KIỆN (BÀI 36–40) ────────────────────────────────────
export const lessonsGroup3 = [
  {
    id: '36',
    category: 'Câu điều kiện',
    title: '36. Zero Conditional (Điều Kiện Loại 0)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 3</span>
          <span>Câu Điều Kiện – Conditionals</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-green-700 mb-4 border-b-2 border-green-100 pb-2">36.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả <strong>sự thật hiển nhiên, quy luật tự nhiên, thói quen</strong>. Điều kiện và kết quả đều luôn đúng.</p>
          <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-green-200">
                <p className="text-xs text-green-600 font-bold uppercase">Mệnh đề IF</p>
                <p className="font-mono font-black text-green-800 mt-1">If + S + V (HTĐ)</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-green-200">
                <p className="text-xs text-green-600 font-bold uppercase">Mệnh đề Chính</p>
                <p className="font-mono font-black text-green-800 mt-1">S + V (HTĐ)</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-green-700 mb-3 border-b-2 border-green-100 pb-2">36.2. Ví dụ thực tế</h3>
          <div className="space-y-2">
            {[
              { en: 'If you heat water to 100°C, it boils.', vi: 'Nếu đun nước đến 100°C, nước sôi.' },
              { en: 'Plants die if they don\'t get water.', vi: 'Cây chết nếu không được tưới nước.' },
              { en: 'If you mix red and blue, you get purple.', vi: 'Nếu pha đỏ và xanh, bạn được màu tím.' },
              { en: 'If it rains, the ground gets wet.', vi: 'Nếu trời mưa, mặt đất ướt.' },
            ].map((ex, i) => (
              <div key={i} className="flex gap-3 items-start bg-green-50 p-2 rounded-lg border border-green-100">
                <span className="text-green-500 font-bold shrink-0">▸</span>
                <div>
                  <p className="font-mono text-green-800 text-xs">{ex.en}</p>
                  <p className="text-slate-500 text-xs">→ {ex.vi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-green-50 p-4 rounded-2xl border border-green-200">
          <h4 className="font-bold text-green-800 mb-2">💡 Lưu ý</h4>
          <p className="text-sm">Có thể thay <strong>IF</strong> bằng <strong>WHEN</strong> trong Zero Conditional (ý nghĩa tương tự).</p>
          <p className="font-mono text-xs mt-2 bg-white p-2 rounded italic">"When water reaches 100°C, it boils." (= If water reaches...)</p>
        </section>
      </div>
    ),
    questions: [
      { q: "If you ____ ice, it melts.", options: ["heat", "heated", "will heat", "would heat"], correct: 0 },
      { q: "Plants ____ if they don't get sunlight.", options: ["died", "die", "would die", "will die"], correct: 1 },
      { q: "If you mix yellow and blue, you ____ green.", options: ["got", "get", "would get", "will get"], correct: 1 },
      { q: "Metals ____ when you heat them.", options: ["expand", "expanded", "will expand", "would expand"], correct: 0 },
      { q: "If there is no oxygen, fire ____.", options: ["goes out", "went out", "will go out", "would go out"], correct: 0 },
    ],
  },
  {
    id: '37',
    category: 'Câu điều kiện',
    title: '37. First Conditional (Điều Kiện Loại 1)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 3</span>
          <span>Câu Điều Kiện Loại 1 – Real Conditional</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">37.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả điều kiện <strong>có thể xảy ra trong thực tế ở tương lai</strong>. Điều kiện có tính khả thi cao.</p>
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200">
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-bold uppercase">Mệnh đề IF</p>
                <p className="font-mono font-black text-blue-800 mt-1">If + S + V (HTĐ)</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-bold uppercase">Mệnh đề Chính</p>
                <p className="font-mono font-black text-blue-800 mt-1">S + will/can/may + V</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-100 pb-2">37.2. Ví dụ</h3>
          <div className="space-y-2">
            {[
              { en: 'If it rains tomorrow, I will stay at home.', vi: 'Nếu ngày mai trời mưa, tôi sẽ ở nhà.' },
              { en: 'If you study hard, you will pass the exam.', vi: 'Nếu bạn học chăm, bạn sẽ qua được bài thi.' },
              { en: 'If she arrives early, we can start the meeting.', vi: 'Nếu cô ấy đến sớm, chúng ta có thể bắt đầu họp.' },
            ].map((ex, i) => (
              <div key={i} className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                <p className="font-mono text-blue-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs">→ {ex.vi}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-3">⚠️ Lỗi Thường Gặp</h4>
          <div className="bg-white p-3 rounded-lg border border-red-100 text-xs">
            <p className="text-red-600">❌ If it will rain, I will stay home.</p>
            <p className="text-green-600 mt-1">✅ If it rains, I will stay home.</p>
            <p className="text-slate-500 mt-1 italic">→ Mệnh đề IF không dùng WILL!</p>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "If you ____ to bed late, you ____ tired tomorrow.", options: ["go / feel", "go / will feel", "will go / will feel", "went / would feel"], correct: 1 },
      { q: "If it ____ tomorrow, we will cancel the picnic.", options: ["rained", "rains", "will rain", "would rain"], correct: 1 },
      { q: "She will be upset if you ____ her the truth.", options: ["didn't tell", "don't tell", "won't tell", "wouldn't tell"], correct: 1 },
      { q: "If he ____ harder, he will get a promotion.", options: ["worked", "works", "will work", "would work"], correct: 1 },
      { q: "I ____ you if I need help.", options: ["called", "call", "will call", "would call"], correct: 2 },
    ],
  },
  {
    id: '38',
    category: 'Câu điều kiện',
    title: '38. Second Conditional (Điều Kiện Loại 2)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 3</span>
          <span>Câu Điều Kiện Loại 2 – Unreal Present</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-4 border-b-2 border-orange-100 pb-2">38.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả điều kiện <strong>không có thật hoặc không thể xảy ra ở hiện tại/tương lai</strong>. Thường là ước mơ, giả định.</p>
          <div className="bg-orange-50 p-5 rounded-2xl border border-orange-200">
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-orange-200">
                <p className="text-xs text-orange-600 font-bold uppercase">Mệnh đề IF</p>
                <p className="font-mono font-black text-orange-800 mt-1">If + S + V (QKĐ)</p>
                <p className="text-xs text-orange-500 mt-1">(to be → were cho mọi chủ ngữ)</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-orange-200">
                <p className="text-xs text-orange-600 font-bold uppercase">Mệnh đề Chính</p>
                <p className="font-mono font-black text-orange-800 mt-1">S + would/could/might + V</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-3 border-b-2 border-orange-100 pb-2">38.2. Ví dụ</h3>
          <div className="space-y-2">
            {[
              { en: 'If I were rich, I would travel the world.', vi: 'Nếu tôi giàu, tôi sẽ đi du lịch vòng quanh thế giới.', note: '(Tôi không giàu – giả định)' },
              { en: 'If she knew the answer, she would tell us.', vi: 'Nếu cô ấy biết câu trả lời, cô ấy sẽ nói với chúng ta.', note: '(Cô ấy không biết)' },
              { en: 'If I were you, I wouldn\'t do that.', vi: 'Nếu tôi là bạn, tôi sẽ không làm vậy.', note: '(Dùng WERE, không dùng WAS cho mọi CN)' },
            ].map((ex, i) => (
              <div key={i} className="bg-orange-50 p-2 rounded-lg border border-orange-100">
                <p className="font-mono text-orange-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs">→ {ex.vi}</p>
                <p className="text-orange-400 text-xs italic">{ex.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Mẹo Đặc Biệt</h4>
          <p className="text-sm">Trong câu điều kiện loại 2, TO BE luôn dùng <strong>WERE</strong> với mọi chủ ngữ (kể cả I, he, she, it) trong văn viết trang trọng:</p>
          <p className="font-mono text-xs mt-2 bg-white p-2 rounded border">If I <strong>were</strong> you... / If he <strong>were</strong> here... / If she <strong>were</strong> taller...</p>
        </section>
      </div>
    ),
    questions: [
      { q: "If I ____ a millionaire, I ____ a yacht.", options: ["am / buy", "was / bought", "were / would buy", "am / would buy"], correct: 2 },
      { q: "She would travel more if she ____ more free time.", options: ["has", "had", "would have", "will have"], correct: 1 },
      { q: "If I ____ you, I would apologize immediately.", options: ["am", "was", "were", "will be"], correct: 2 },
      { q: "What ____ you do if you lost your job?", options: ["do", "will", "would", "did"], correct: 2 },
      { q: "If he ____ the truth, she would be very disappointed.", options: ["knew", "knows", "know", "will know"], correct: 0 },
    ],
  },
  {
    id: '39',
    category: 'Câu điều kiện',
    title: '39. Third Conditional (Điều Kiện Loại 3)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 3</span>
          <span>Câu Điều Kiện Loại 3 – Unreal Past</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-4 border-b-2 border-rose-100 pb-2">39.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả điều kiện <strong>không có thật trong quá khứ</strong>. Hối tiếc, ước muốn về việc đã xảy ra/không xảy ra.</p>
          <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200">
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-rose-200">
                <p className="text-xs text-rose-600 font-bold uppercase">Mệnh đề IF</p>
                <p className="font-mono font-black text-rose-800 mt-1">If + S + had + V3/ed</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-rose-200">
                <p className="text-xs text-rose-600 font-bold uppercase">Mệnh đề Chính</p>
                <p className="font-mono font-black text-rose-800 mt-1">S + would/could + have + V3</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-3 border-b-2 border-rose-100 pb-2">39.2. Ví dụ</h3>
          <div className="space-y-2">
            {[
              { en: 'If I had studied harder, I would have passed the exam.', vi: 'Nếu tôi học chăm hơn, tôi đã qua kỳ thi rồi.', note: '(Tôi đã không học chăm → đã không qua thi)' },
              { en: 'If she had left earlier, she wouldn\'t have missed the train.', vi: 'Nếu cô ấy rời đi sớm hơn, cô ấy đã không lỡ tàu.', note: '(Cô ấy không rời sớm → đã lỡ tàu)' },
              { en: 'They could have won if they had practiced more.', vi: 'Họ có thể đã thắng nếu họ luyện nhiều hơn.', note: '(Họ không luyện nhiều → không thắng)' },
            ].map((ex, i) => (
              <div key={i} className="bg-rose-50 p-2 rounded-lg border border-rose-100">
                <p className="font-mono text-rose-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs">→ {ex.vi}</p>
                <p className="text-rose-400 text-xs italic">{ex.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-3">💡 Bảng So Sánh 3 Loại Câu Điều Kiện</h4>
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-amber-600 text-white"><th className="p-2 border">Loại</th><th className="p-2 border">IF clause</th><th className="p-2 border">Main clause</th><th className="p-2 border">Ý nghĩa</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-2 border font-bold">Type 0</td><td className="p-2 border font-mono">If + V(HTĐ)</td><td className="p-2 border font-mono">V(HTĐ)</td><td className="p-2 border">Sự thật hiển nhiên</td></tr>
              <tr className="border-b bg-white"><td className="p-2 border font-bold">Type 1</td><td className="p-2 border font-mono">If + V(HTĐ)</td><td className="p-2 border font-mono">will + V</td><td className="p-2 border">Có thể xảy ra</td></tr>
              <tr className="border-b"><td className="p-2 border font-bold">Type 2</td><td className="p-2 border font-mono">If + V(QKĐ)</td><td className="p-2 border font-mono">would + V</td><td className="p-2 border">Không thật (hiện tại)</td></tr>
              <tr className="border-b bg-white"><td className="p-2 border font-bold">Type 3</td><td className="p-2 border font-mono">If + had + V3</td><td className="p-2 border font-mono">would have + V3</td><td className="p-2 border">Không thật (quá khứ)</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    ),
    questions: [
      { q: "If she ____ the medicine, she would have recovered faster.", options: ["took", "had taken", "has taken", "takes"], correct: 1 },
      { q: "I would have called you if I ____ your number.", options: ["knew", "had known", "know", "would know"], correct: 1 },
      { q: "If they ____ earlier, they wouldn't have missed the concert.", options: ["leave", "left", "had left", "would leave"], correct: 2 },
      { q: "He could ____ the promotion if he ____ harder.", options: ["get / worked", "have got / had worked", "gotten / works", "have gotten / worked"], correct: 1 },
      { q: "If I ____ you, I wouldn't have made that mistake.", options: ["was", "were", "had been", "am"], correct: 2 },
    ],
  },
  {
    id: '40',
    category: 'Câu điều kiện',
    title: '40. Mixed Conditionals & Wishes',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 3</span>
          <span>Mixed Conditionals & Cấu trúc WISH</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">40.1. Mixed Conditionals (Điều Kiện Hỗn Hợp)</h3>
          <p className="mb-3">Kết hợp điều kiện ở <strong>một thì</strong> với kết quả ở <strong>thì khác</strong>.</p>
          <div className="space-y-3">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="font-bold text-indigo-700 text-xs">Loại 2+3: QK ảnh hưởng đến HT</p>
              <p className="font-mono text-xs mt-1">If + had + V3, ... would + V</p>
              <p className="italic text-xs mt-1 text-slate-600">"If he had studied medicine, he would be a doctor now."</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="font-bold text-purple-700 text-xs">Loại 3+2: HT ảnh hưởng đến QK</p>
              <p className="font-mono text-xs mt-1">If + V(QKĐ), ... would have + V3</p>
              <p className="italic text-xs mt-1 text-slate-600">"If I were braver, I would have spoken up."</p>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">40.2. Cấu Trúc WISH (Ước Muốn)</h3>
          <div className="space-y-3">
            {[
              { use: 'Ước về hiện tại (trái thực tế)', struct: 'S + wish(es) + S + V(QKĐ)', ex: 'I wish I were taller. (Tôi ước mình cao hơn)' },
              { use: 'Ước về quá khứ (hối tiếc)', struct: 'S + wish(es) + S + had + V3', ex: 'I wish I had studied harder. (Ước đã học chăm hơn)' },
              { use: 'Ước về tương lai (mong muốn thay đổi)', struct: 'S + wish(es) + S + would + V', ex: 'I wish he would stop smoking. (Ước anh ấy bỏ thuốc)' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="font-bold text-indigo-800 text-xs">{item.use}</p>
                <p className="font-mono text-xs mt-1 bg-white px-2 py-1 rounded border border-indigo-100">{item.struct}</p>
                <p className="italic text-xs mt-1 text-slate-600">{item.ex}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 IF ONLY = Nhấn mạnh hơn WISH</h4>
          <p className="text-xs">"If only I had more time!" = "I wish I had more time!" (nhưng cảm xúc mạnh hơn)</p>
        </section>
      </div>
    ),
    questions: [
      { q: "I wish I ____ more money right now.", options: ["have", "had", "would have", "will have"], correct: 1 },
      { q: "She wishes she ____ to the party last night.", options: ["goes", "went", "had gone", "would go"], correct: 2 },
      { q: "If he ____ the directions, he would know where to go now.", options: ["follows", "followed", "had followed", "would follow"], correct: 2 },
      { q: "I wish they ____ make so much noise!", options: ["don't", "didn't", "wouldn't", "won't"], correct: 2 },
      { q: "If she were more organized, she ____ the deadline yesterday.", options: ["met", "would meet", "would have met", "has met"], correct: 2 },
    ],
  },
];
