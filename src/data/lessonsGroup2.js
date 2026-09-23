import React from 'react';

// ─── GROUP 2: TƯƠNG LAI NÂNG CAO (BÀI 33–35) ─────────────────────────────────
export const lessonsGroup2 = [
  {
    id: '33',
    category: 'Thì',
    title: '33. Future Perfect (Thì Tương Lai Hoàn Thành)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 2</span>
          <span>Thì Tương Lai Hoàn Thành – Future Perfect</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-violet-700 mb-4 border-b-2 border-violet-100 pb-2">33.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả hành động <strong>sẽ hoàn thành trước một thời điểm xác định trong tương lai</strong>.</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-violet-50 p-3 rounded-xl border border-violet-200 text-center"><p className="font-black text-violet-700">Khẳng định</p><p className="font-mono text-xs mt-2">S + will + have + V3/ed</p></div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center"><p className="font-black text-red-700">Phủ định</p><p className="font-mono text-xs mt-2">S + will + not + have + V3</p></div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center"><p className="font-black text-blue-700">Nghi vấn</p><p className="font-mono text-xs mt-2">Will + S + have + V3?</p></div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-violet-700 mb-3 border-b-2 border-violet-100 pb-2">33.2. Dấu hiệu & Ví dụ</h3>
          <div className="bg-violet-50 p-4 rounded-xl border border-violet-200 mb-4 text-xs">
            <p className="font-bold text-violet-700 mb-2">Dấu hiệu nhận biết:</p>
            <div className="flex flex-wrap gap-2">
              {['by + thời điểm TL', 'before + thời điểm TL', 'by the time', 'by then', 'by next year'].map(w => (
                <span key={w} className="bg-violet-200 text-violet-800 px-2 py-0.5 rounded font-mono">{w}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {[
              { en: 'By 2030, scientists will have found a cure for cancer.', vi: 'Trước 2030, các nhà khoa học sẽ tìm ra thuốc chữa ung thư.' },
              { en: 'She will have finished her degree by next June.', vi: 'Cô ấy sẽ hoàn thành bằng cấp trước tháng 6 tới.' },
              { en: 'By the time you arrive, we will have left.', vi: 'Khi bạn đến, chúng tôi đã đi rồi.' },
            ].map((ex, i) => (
              <div key={i} className="bg-violet-50 p-2 rounded-lg border border-violet-100">
                <p className="font-mono text-violet-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs">→ {ex.vi}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Mẹo Ghi Nhớ</h4>
          <p className="text-sm">Thấy <strong>"by + thời điểm tương lai"</strong> → nghĩ ngay đến <strong>Future Perfect</strong></p>
          <p className="text-xs mt-2 italic bg-white p-2 rounded border">"By next Monday, I will have submitted the report."</p>
        </section>
      </div>
    ),
    questions: [
      { q: "By next month, she ____ her project.", options: ["finishes", "will finish", "will have finished", "has finished"], correct: 2 },
      { q: "By the time you read this, I ____.", options: ["left", "will leave", "will have left", "have left"], correct: 2 },
      { q: "They ____ the building by the end of the year.", options: ["complete", "will complete", "will have completed", "completed"], correct: 2 },
      { q: "By 2050, global temperatures ____ significantly.", options: ["rise", "will rise", "will have risen", "rose"], correct: 2 },
      { q: "____ you ____ the book by Friday?", options: ["Will / read", "Will / have read", "Have / read", "Did / read"], correct: 1 },
    ],
  },
  {
    id: '34',
    category: 'Thì',
    title: '34. Future Continuous (Thì Tương Lai Tiếp Diễn)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 2</span>
          <span>Thì Tương Lai Tiếp Diễn – Future Continuous</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-fuchsia-700 mb-4 border-b-2 border-fuchsia-100 pb-2">34.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả hành động <strong>đang xảy ra tại một thời điểm xác định trong tương lai</strong> hoặc hành động sẽ diễn ra liên tục trong tương lai.</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-fuchsia-50 p-3 rounded-xl border border-fuchsia-200 text-center"><p className="font-black text-fuchsia-700">Khẳng định</p><p className="font-mono text-xs mt-2">S + will + be + V-ing</p></div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center"><p className="font-black text-red-700">Phủ định</p><p className="font-mono text-xs mt-2">S + will + not + be + V-ing</p></div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center"><p className="font-black text-blue-700">Nghi vấn</p><p className="font-mono text-xs mt-2">Will + S + be + V-ing?</p></div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-fuchsia-700 mb-3 border-b-2 border-fuchsia-100 pb-2">34.2. Khi Nào Dùng</h3>
          <div className="space-y-3">
            {[
              { use: 'Hành động đang diễn ra tại một thời điểm TL', ex: 'At 8pm tomorrow, she will be taking her exam.' },
              { use: 'Hành động trong TL dự kiến xảy ra theo lịch trình', ex: 'I will be working from home next week.' },
              { use: 'Hỏi lịch/dự định (lịch sự)', ex: 'Will you be using your car this weekend?' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-fuchsia-50 rounded-xl border border-fuchsia-100">
                <span className="bg-fuchsia-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-bold text-fuchsia-800">{item.use}</p>
                  <p className="font-mono text-xs mt-1 italic text-slate-600">"{item.ex}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "At this time tomorrow, I ____ on the plane.", options: ["sit", "will sit", "will be sitting", "am sitting"], correct: 2 },
      { q: "They ____ a meeting when you arrive.", options: ["have", "will have", "will be having", "are having"], correct: 2 },
      { q: "____ you ____ in the office on Monday?", options: ["Will / work", "Will / be working", "Are / working", "Do / work"], correct: 1 },
      { q: "This time next year, she ____ in London.", options: ["lives", "will live", "will be living", "has lived"], correct: 2 },
      { q: "Don't call at 3pm—he ____ his presentation.", options: ["gives", "will give", "will be giving", "has given"], correct: 2 },
    ],
  },
  {
    id: '35',
    category: 'Thì',
    title: '35. Future Perfect Continuous',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 2</span>
          <span>Thì Tương Lai Hoàn Thành Tiếp Diễn</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-sky-700 mb-4 border-b-2 border-sky-100 pb-2">35.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả hành động <strong>tiếp diễn liên tục từ quá khứ/hiện tại đến một thời điểm xác định trong tương lai</strong>, nhấn mạnh tính liên tục và khoảng thời gian.</p>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="font-mono font-bold text-sky-800 text-lg">S + will + have + been + V-ing</p>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-sky-700 mb-3 border-b-2 border-sky-100 pb-2">35.2. Ví dụ</h3>
          <div className="space-y-2">
            {[
              { en: 'By next year, I will have been working here for 10 years.', vi: 'Sang năm tới tôi sẽ làm đây được 10 năm.' },
              { en: 'By the time he retires, he will have been teaching for 30 years.', vi: 'Khi ông ấy về hưu, ông sẽ dạy học được 30 năm.' },
            ].map((ex, i) => (
              <div key={i} className="bg-sky-50 p-3 rounded-xl border border-sky-100">
                <p className="font-mono text-sky-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs">→ {ex.vi}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-sky-700 mb-3 border-b-2 border-sky-100 pb-2">35.3. Bảng Tổng Hợp Tất Cả Thì Tương Lai</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-sky-600 text-white"><th className="p-2 border">Thì</th><th className="p-2 border">Cấu trúc</th><th className="p-2 border">Dùng khi</th></tr></thead>
              <tbody>
                {[
                  { name: 'Simple Future', struct: 'will + V', use: 'Quyết định tức thời, dự đoán' },
                  { name: 'Be going to', struct: 'am/is/are + going to + V', use: 'Kế hoạch đã có, bằng chứng rõ ràng' },
                  { name: 'Future Continuous', struct: 'will + be + V-ing', use: 'Đang diễn ra tại thời điểm TL' },
                  { name: 'Future Perfect', struct: 'will + have + V3', use: 'Hoàn thành trước thời điểm TL' },
                  { name: 'Future Perfect Continuous', struct: 'will + have + been + V-ing', use: 'Tiếp diễn đến thời điểm TL' },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold text-sky-700">{r.name}</td>
                    <td className="p-2 border font-mono text-xs">{r.struct}</td>
                    <td className="p-2 border">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "By next summer, she ____ for this company for 5 years.", options: ["works", "will work", "will have worked", "will have been working"], correct: 3 },
      { q: "When you retire, how long ____ you ____ in education?", options: ["will / work", "will / have worked", "will / be working", "will / have been working"], correct: 3 },
      { q: "By the time the project ends, we ____ on it for two years.", options: ["will work", "will have worked", "will be working", "will have been working"], correct: 3 },
      { q: "She ____ English for 20 years by the time she turns 30.", options: ["learns", "will learn", "will have learned", "will have been learning"], correct: 3 },
      { q: "Next month, they ____ in their new house for exactly one year.", options: ["live", "will live", "will have lived", "will have been living"], correct: 3 },
    ],
  },
];
