import React from 'react';

// ─── GROUP 7-12: BÀI 52-85 ──────────────────────────────────────────────────
export const lessonsGroup7to12 = [
  // ── Bài 52: Comparatives ──────────────────────────────────────────────────
  {
    id: '52',
    category: 'Tính từ & Trạng từ',
    title: '52. Comparatives & Superlatives (So Sánh Hơn & So Sánh Nhất)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 7</span>
          <span>So Sánh – Comparatives & Superlatives</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">52.1. Bảng Quy Tắc Biến Thể</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="p-2 border">Loại Tính Từ</th><th className="p-2 border">Gốc</th><th className="p-2 border">So sánh hơn</th><th className="p-2 border">So sánh nhất</th></tr></thead>
              <tbody>
                {[
                  ['1 âm tiết', 'tall', 'taller', 'tallest'],
                  ['1 âm tiết kết -e', 'large', 'larger', 'largest'],
                  ['1 âm tiết CVC', 'big', 'bigger', 'biggest'],
                  ['2+ âm tiết', 'beautiful', 'more beautiful', 'most beautiful'],
                  ['2 âm tiết -y', 'happy', 'happier', 'happiest'],
                  ['Bất quy tắc', 'good', 'better', 'best'],
                  ['Bất quy tắc', 'bad', 'worse', 'worst'],
                  ['Bất quy tắc', 'far', 'farther/further', 'farthest/furthest'],
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    {r.map((cell, j) => <td key={j} className={`p-2 border ${j > 1 ? 'font-mono text-blue-700' : j === 0 ? 'font-bold' : ''}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-100 pb-2">52.2. Cấu Trúc Quan Trọng</h3>
          <div className="space-y-3">
            {[
              { name: 'So sánh hơn', struct: 'adj-er / more adj + THAN', ex: 'She is taller than her sister.' },
              { name: 'So sánh nhất', struct: 'THE + adj-est / most adj + IN/OF', ex: 'He is the best student in the class.' },
              { name: 'So sánh bằng', struct: 'AS + adj + AS', ex: 'This phone is as expensive as that one.' },
              { name: 'So sánh kép', struct: 'THE + comp..., THE + comp', ex: 'The harder you work, the better results you get.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded shrink-0">{i + 1}</span>
                <div>
                  <p className="font-bold text-blue-800">{item.name}</p>
                  <p className="font-mono text-xs bg-white px-2 py-1 rounded border border-blue-100 mt-1">{item.struct}</p>
                  <p className="italic text-xs text-slate-600 mt-1">"{item.ex}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "This year's results are ____ last year's.", options: ["better than", "more good than", "gooder than", "best than"], correct: 0 },
      { q: "She is ____ student in the class.", options: ["the most intelligent", "more intelligent", "most intelligent", "the more intelligent"], correct: 0 },
      { q: "The ____ you exercise, the ____ you feel.", options: ["more / better", "most / best", "much / good", "many / well"], correct: 0 },
      { q: "His salary is ____ mine.", options: ["as twice as", "two times more than", "twice as much as", "double more"], correct: 2 },
      { q: "This is ____ problem we have ever faced.", options: ["the most serious", "more serious", "the seriouser", "most serious"], correct: 0 },
    ],
  },
  // ── Bài 53: Adverbs ───────────────────────────────────────────────────────
  {
    id: '53',
    category: 'Tính từ & Trạng từ',
    title: '53. Adverbs (Trạng Từ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 7</span>
          <span>Trạng Từ – Adverbs</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-emerald-700 mb-4 border-b-2 border-emerald-100 pb-2">53.1. Phân Loại Trạng Từ</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { type: 'Trạng từ cách thức', kw: 'quickly, slowly, carefully, well', ex: 'She speaks English fluently.' },
              { type: 'Trạng từ tần suất', kw: 'always, often, sometimes, rarely, never', ex: 'I always drink coffee in the morning.' },
              { type: 'Trạng từ thời gian', kw: 'now, then, soon, already, still', ex: 'The report has already been submitted.' },
              { type: 'Trạng từ nơi chốn', kw: 'here, there, inside, outside, abroad', ex: 'She works abroad.' },
              { type: 'Trạng từ mức độ', kw: 'very, quite, extremely, rather, too', ex: 'It is extremely important.' },
              { type: 'Trạng từ liên kết', kw: 'however, therefore, moreover, nevertheless', ex: 'However, the results were disappointing.' },
            ].map((item, i) => (
              <div key={i} className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <p className="font-bold text-emerald-800 text-xs">{item.type}</p>
                <p className="text-xs text-emerald-600 italic mt-1">{item.kw}</p>
                <p className="text-xs text-slate-500 mt-1">"{item.ex}"</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-emerald-700 mb-3 border-b-2 border-emerald-100 pb-2">53.2. Vị Trí Trạng Từ Tần Suất</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100"><span className="font-bold">Trước động từ thường:</span> <span className="italic">I <strong>always</strong> take the bus.</span></div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100"><span className="font-bold">Sau to be / modal:</span> <span className="italic">She is <strong>usually</strong> on time. / He can <strong>always</strong> help.</span></div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100"><span className="font-bold">Đầu câu (cách thức/liên kết):</span> <span className="italic"><strong>Unfortunately</strong>, we missed the deadline.</span></div>
          </div>
        </section>
        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-2">⚠️ Tính Từ vs. Trạng Từ</h4>
          <div className="grid md:grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded border">
              <p className="text-red-500">❌ She drives careful.</p>
              <p className="text-green-600">✅ She drives carefully. (trạng từ bổ nghĩa động từ)</p>
            </div>
            <div className="bg-white p-2 rounded border">
              <p className="text-red-500">❌ He felt badly about it.</p>
              <p className="text-green-600">✅ He felt bad about it. (tính từ bổ nghĩa chủ ngữ)</p>
            </div>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "She speaks Japanese ____.", options: ["fluent", "fluently", "more fluent", "fluency"], correct: 1 },
      { q: "He ____ arrives late to work.", options: ["never", "neves", "is never", "does never"], correct: 0 },
      { q: "The exam was ____ difficult.", options: ["extreme", "extremely", "extremity", "more extreme"], correct: 1 },
      { q: "The project was completed ____.", options: ["successful", "successfully", "more successful", "success"], correct: 1 },
      { q: "I have ____ seen such a beautiful sunset.", options: ["ever", "never", "always", "sometimes"], correct: 1 },
    ],
  },
  // ── Bài 54: Conjunctions ─────────────────────────────────────────────────
  {
    id: '54',
    category: 'Từ loại nâng cao',
    title: '54. Conjunctions (Liên Từ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 8</span>
          <span>Liên Từ – Conjunctions</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-purple-700 mb-4 border-b-2 border-purple-100 pb-2">54.1. Phân Loại Liên Từ</h3>
          <div className="space-y-4">
            {[
              { type: 'Coordinating (Đẳng lập)', conjs: ['and', 'but', 'or', 'nor', 'for', 'yet', 'so'], note: 'Nối hai vế ngang hàng', color: 'blue' },
              { type: 'Subordinating (Phụ thuộc)', conjs: ['because', 'although', 'if', 'when', 'while', 'since', 'unless', 'until'], note: 'Nối mệnh đề chính với mệnh đề phụ', color: 'green' },
              { type: 'Correlative (Tương quan)', conjs: ['both…and', 'either…or', 'neither…nor', 'not only…but also', 'whether…or'], note: 'Dùng theo cặp', color: 'orange' },
            ].map((group, i) => (
              <div key={i} className={`bg-${group.color}-50 p-4 rounded-xl border border-${group.color}-200`}>
                <p className="font-bold text-sm mb-1" style={{color: `var(--color-${group.color}-700, #1d4ed8)`}}>{group.type}</p>
                <p className="text-xs text-slate-500 mb-2">{group.note}</p>
                <div className="flex flex-wrap gap-2">
                  {group.conjs.map(c => <span key={c} className="bg-white text-slate-700 px-2 py-0.5 rounded font-mono text-xs border">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-100 pb-2">54.2. Liên Từ Tương Phản & Nguyên Nhân</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-purple-600 text-white"><th className="p-2 border">Loại</th><th className="p-2 border">Liên từ</th><th className="p-2 border">Ví dụ</th></tr></thead>
              <tbody>
                {[
                  ['Tương phản', 'but / however / although / even though', '"I tried hard, but I failed."'],
                  ['Nguyên nhân', 'because / since / as / due to', '"She was late because of the traffic."'],
                  ['Kết quả', 'so / therefore / thus / as a result', '"It rained, so we cancelled the trip."'],
                  ['Điều kiện', 'if / unless / provided that / as long as', '"Unless you hurry, you\'ll miss the train."'],
                  ['Mục đích', 'so that / in order to / to', '"Study hard so that you can pass."'],
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold text-purple-700">{r[0]}</td>
                    <td className="p-2 border font-mono text-xs">{r[1]}</td>
                    <td className="p-2 border italic text-xs">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "He studied hard, ____ he passed the exam.", options: ["but", "so", "or", "for"], correct: 1 },
      { q: "____ the weather was bad, they continued the outdoor event.", options: ["Because", "Although", "So", "And"], correct: 1 },
      { q: "You must leave now ____ you will miss your flight.", options: ["or", "and", "but", "so"], correct: 0 },
      { q: "She stayed at work late ____ to finish the report.", options: ["in order", "so that", "due to", "although"], correct: 0 },
      { q: "____ you apologize, I won't forgive you.", options: ["If", "Unless", "Although", "Because"], correct: 1 },
    ],
  },
  // ── Bài 55: Quantifiers ──────────────────────────────────────────────────
  {
    id: '55',
    category: 'Từ loại nâng cao',
    title: '55. Quantifiers (Từ Chỉ Số Lượng)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 8</span>
          <span>Từ Chỉ Số Lượng – Quantifiers</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-sky-700 mb-4 border-b-2 border-sky-100 pb-2">55.1. Bảng Quantifiers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-sky-600 text-white"><th className="p-2 border">Quantifier</th><th className="p-2 border">Đếm được</th><th className="p-2 border">Không đếm được</th><th className="p-2 border">Cả hai</th></tr></thead>
              <tbody>
                {[
                  ['many', '✓', '✗', ''],
                  ['much', '✗', '✓', ''],
                  ['few / a few', '✓', '✗', ''],
                  ['little / a little', '✗', '✓', ''],
                  ['some', '', '', '✓ (khẳng định)'],
                  ['any', '', '', '✓ (phủ định/hỏi)'],
                  ['a lot of / lots of', '', '', '✓'],
                  ['plenty of', '', '', '✓'],
                  ['enough', '', '', '✓'],
                  ['all / most / no', '', '', '✓'],
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold text-sky-700 font-mono">{r[0]}</td>
                    <td className="p-2 border text-center">{r[1]}</td>
                    <td className="p-2 border text-center">{r[2]}</td>
                    <td className="p-2 border text-center text-xs text-slate-500">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-sky-700 mb-3 border-b-2 border-sky-100 pb-2">55.2. Few vs. A Few | Little vs. A Little</h3>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="bg-red-50 p-3 rounded-xl border border-red-200">
              <p className="font-bold text-red-700">FEW (ít đếm được – không đủ)</p>
              <p className="italic mt-1">"Few people attended." (Rất ít người – hầu như không có)</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl border border-green-200">
              <p className="font-bold text-green-700">A FEW (một vài – đủ rồi)</p>
              <p className="italic mt-1">"A few people came." (Có một số người – đủ)</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200">
              <p className="font-bold text-red-700">LITTLE (ít không đếm được – không đủ)</p>
              <p className="italic mt-1">"There's little hope." (Gần như không có hy vọng)</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl border border-green-200">
              <p className="font-bold text-green-700">A LITTLE (một ít – vẫn còn)</p>
              <p className="italic mt-1">"There's a little hope." (Còn một chút hy vọng)</p>
            </div>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "There isn't ____ milk left in the fridge.", options: ["many", "few", "much", "a few"], correct: 2 },
      { q: "She has ____ friends, so she's never lonely.", options: ["few", "little", "a few", "a little"], correct: 2 },
      { q: "He has very ____ patience for rude people.", options: ["few", "little", "a few", "many"], correct: 1 },
      { q: "Do you have ____ time to help me?", options: ["many", "much", "a lot", "few"], correct: 1 },
      { q: "____ employees attended the meeting – it was nearly empty.", options: ["A few", "Few", "Little", "A little"], correct: 1 },
    ],
  },
  // ── Bài 56: Noun Clauses ─────────────────────────────────────────────────
  {
    id: '56',
    category: 'Câu phức',
    title: '56. Noun Clauses (Mệnh Đề Danh Từ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 9</span>
          <span>Mệnh Đề Danh Từ – Noun Clauses</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-violet-700 mb-4 border-b-2 border-violet-100 pb-2">56.1. Định Nghĩa & Từ Dẫn</h3>
          <p className="mb-3">Mệnh đề danh từ <strong>đóng vai trò như một danh từ</strong> trong câu (Chủ ngữ, Tân ngữ, Bổ ngữ).</p>
          <div className="bg-violet-50 p-4 rounded-xl border border-violet-200">
            <p className="font-bold text-violet-700 text-xs mb-2">Từ dẫn mệnh đề danh từ:</p>
            <div className="flex flex-wrap gap-2">
              {['that', 'what', 'where', 'when', 'why', 'how', 'who', 'whether', 'if'].map(w => (
                <span key={w} className="bg-violet-200 text-violet-800 px-2 py-0.5 rounded font-mono text-xs">{w}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-violet-700 mb-3 border-b-2 border-violet-100 pb-2">56.2. Chức Năng & Ví Dụ</h3>
          <div className="space-y-3">
            {[
              { role: 'Chủ ngữ (Subject)', ex: 'What she said surprised everyone.', note: 'Mệnh đề làm chủ ngữ' },
              { role: 'Tân ngữ (Object)', ex: 'I know that she is telling the truth.', note: 'Mệnh đề làm tân ngữ trực tiếp' },
              { role: 'Bổ ngữ (Complement)', ex: 'The truth is that we failed.', note: 'Mệnh đề làm bổ ngữ chủ ngữ' },
              { role: 'Tân ngữ giới từ', ex: 'I am interested in what you said.', note: 'Sau giới từ' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                <span className="bg-violet-600 text-white text-xs font-black px-2 py-1 rounded shrink-0">{i + 1}</span>
                <div>
                  <p className="font-bold text-violet-800 text-xs">{item.role}</p>
                  <p className="font-mono text-xs mt-1 italic">"{item.ex}"</p>
                  <p className="text-slate-400 text-xs">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "I don't know ____ she decided to leave.", options: ["that", "which", "why", "whose"], correct: 2 },
      { q: "____ he succeeds depends on his effort.", options: ["When", "Whether", "What", "That"], correct: 1 },
      { q: "The fact ____ she passed is incredible.", options: ["which", "who", "what", "that"], correct: 3 },
      { q: "Nobody knows ____ the project will be approved.", options: ["what", "whether", "which", "whose"], correct: 1 },
      { q: "She told me ____ she would be late.", options: ["what", "who", "that", "which"], correct: 2 },
    ],
  },
  // ── Bài 57: Participial Phrases ──────────────────────────────────────────
  {
    id: '57',
    category: 'TOEIC chuyên sâu',
    title: '57. Participial Phrases (Cụm Phân Từ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 10</span>
          <span>Cụm Phân Từ – Participial Phrases (TOEIC Nâng Cao)</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-4 border-b-2 border-rose-100 pb-2">57.1. Hai Loại Cụm Phân Từ</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
              <p className="font-black text-rose-800 text-center mb-2">Present Participle (V-ing)</p>
              <p className="text-xs mb-2">Diễn tả hành động chủ động xảy ra đồng thời hoặc là nguyên nhân</p>
              <div className="text-xs space-y-1">
                <p className="italic">"<strong>Seeing the problem</strong>, she solved it quickly."</p>
                <p className="text-slate-500">→ Khi thấy vấn đề, cô ấy giải quyết ngay.</p>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="font-black text-indigo-800 text-center mb-2">Past Participle (V3/ed)</p>
              <p className="text-xs mb-2">Diễn tả hành động bị động hoặc trạng thái đã hoàn thành</p>
              <div className="text-xs space-y-1">
                <p className="italic">"<strong>Written in 1851</strong>, the novel is a classic."</p>
                <p className="text-slate-500">→ Được viết năm 1851, cuốn tiểu thuyết là kinh điển.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-3 border-b-2 border-rose-100 pb-2">57.2. Ví dụ TOEIC thực tế</h3>
          <div className="space-y-2 text-xs">
            {[
              { phrase: 'Having finished the report', full: 'Having finished the report, he went home.', type: 'Perfect Participle' },
              { phrase: 'Located in the center of the city', full: 'Located in the center, the hotel is convenient.', type: 'Past Participle (bị động)' },
              { phrase: 'Not knowing the answer', full: 'Not knowing the answer, she remained silent.', type: 'Present Participle (phủ định)' },
            ].map((ex, i) => (
              <div key={i} className="bg-rose-50 p-2 rounded-lg border border-rose-100">
                <p className="font-bold text-rose-700">[{ex.type}]</p>
                <p className="italic text-rose-800 mt-1">{ex.full}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "____ in 1900, the building is now a national monument.", options: ["Building", "Built", "Having built", "To build"], correct: 1 },
      { q: "____ all the options, she chose the most cost-effective solution.", options: ["Considered", "To consider", "Having considered", "Being considered"], correct: 2 },
      { q: "The manager, ____ pleased with the results, gave everyone a bonus.", options: ["be", "being", "been", "is"], correct: 1 },
      { q: "____ the deadline, the team worked overtime.", options: ["Approaching", "Approached", "Approach", "Having approach"], correct: 0 },
      { q: "The documents ____ by the lawyer were filed correctly.", options: ["reviewing", "reviewed", "to review", "review"], correct: 1 },
    ],
  },
  // ── Bài 58: Word Formation ───────────────────────────────────────────────
  {
    id: '58',
    category: 'TOEIC chuyên sâu',
    title: '58. Word Formation (Cấu Tạo Từ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 10</span>
          <span>Cấu Tạo Từ – Word Formation (TOEIC)</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-amber-700 mb-4 border-b-2 border-amber-100 pb-2">58.1. Hậu Tố (Suffixes) Quan Trọng</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-amber-600 text-white"><th className="p-2 border">Hậu tố</th><th className="p-2 border">Từ loại</th><th className="p-2 border">Ví dụ</th></tr></thead>
              <tbody>
                {[
                  ['-tion/-sion', 'Danh từ', 'information, decision, communication'],
                  ['-ment', 'Danh từ', 'management, achievement, improvement'],
                  ['-ness', 'Danh từ', 'happiness, darkness, awareness'],
                  ['-ity/-ty', 'Danh từ', 'productivity, quality, responsibility'],
                  ['-er/-or', 'Danh từ (người)', 'manager, director, employer'],
                  ['-ful', 'Tính từ', 'successful, careful, helpful'],
                  ['-less', 'Tính từ', 'careless, hopeless, meaningless'],
                  ['-able/-ible', 'Tính từ', 'capable, reliable, flexible'],
                  ['-ive', 'Tính từ', 'productive, effective, creative'],
                  ['-ly', 'Trạng từ', 'efficiently, carefully, rapidly'],
                  ['-ize/-ise', 'Động từ', 'organize, realize, prioritize'],
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-mono font-bold text-amber-700">{r[0]}</td>
                    <td className="p-2 border font-bold">{r[1]}</td>
                    <td className="p-2 border italic text-slate-500">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-amber-700 mb-3 border-b-2 border-amber-100 pb-2">58.2. Nhóm Từ Cùng Gốc</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-amber-500 text-white"><th className="p-2 border">Noun</th><th className="p-2 border">Verb</th><th className="p-2 border">Adjective</th><th className="p-2 border">Adverb</th></tr></thead>
              <tbody>
                {[
                  ['success', 'succeed', 'successful', 'successfully'],
                  ['management', 'manage', 'manageable', 'manageably'],
                  ['productivity', 'produce', 'productive', 'productively'],
                  ['employment', 'employ', 'employable', 'N/A'],
                  ['decision', 'decide', 'decisive', 'decisively'],
                  ['communication', 'communicate', 'communicative', 'communicatively'],
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    {r.map((c, j) => <td key={j} className="p-2 border font-mono text-xs">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The company needs someone with strong ____ skills.", options: ["communicate", "communication", "communicative", "communicatively"], correct: 1 },
      { q: "Her ____ in the project was recognized at the award ceremony.", options: ["achieve", "achievable", "achievement", "achiever"], correct: 2 },
      { q: "We need a more ____ approach to solve this problem.", options: ["effectivly", "effectiveness", "effective", "effect"], correct: 2 },
      { q: "The manager spoke ____ about the new strategy.", options: ["confident", "confidence", "confide", "confidently"], correct: 3 },
      { q: "The new software will help ____ our workflow.", options: ["efficiency", "efficiently", "efficient", "streamline"], correct: 3 },
    ],
  },
  // ── Bài 59: Inversion ────────────────────────────────────────────────────
  {
    id: '59',
    category: 'Cấu trúc đặc biệt',
    title: '59. Inversion (Đảo Ngữ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 11</span>
          <span>Đảo Ngữ – Inversion (Nâng Cao)</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-slate-700 mb-4 border-b-2 border-slate-100 pb-2">59.1. Đảo Ngữ Với Phủ Định & Hạn Chế</h3>
          <div className="space-y-2 text-xs">
            {[
              { trigger: 'Never', ex_normal: 'She has never seen such beauty.', ex_inv: 'Never has she seen such beauty.' },
              { trigger: 'Rarely / Seldom', ex_normal: 'He rarely speaks in public.', ex_inv: 'Rarely does he speak in public.' },
              { trigger: 'Not only...but also', ex_normal: 'She not only sings but also dances.', ex_inv: 'Not only does she sing, but she also dances.' },
              { trigger: 'Hardly...when', ex_normal: 'We had hardly arrived when it rained.', ex_inv: 'Hardly had we arrived when it rained.' },
              { trigger: 'No sooner...than', ex_normal: 'He had no sooner left than she called.', ex_inv: 'No sooner had he left than she called.' },
              { trigger: 'Only then / Only after', ex_normal: 'Only then did I understand.', ex_inv: 'Only then did I realize the mistake.' },
            ].map((ex, i) => (
              <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700"><span className="bg-slate-700 text-white px-1 rounded text-[10px]">{ex.trigger}</span></p>
                <p className="italic text-slate-500 mt-1 line-through text-[10px]">{ex.ex_normal}</p>
                <p className="italic text-slate-800 font-bold text-xs mt-0.5">→ {ex.ex_inv}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Công thức đảo ngữ</h4>
          <p className="font-mono text-xs bg-white p-2 rounded border">Trợ động từ + S + động từ chính</p>
          <p className="text-xs mt-2">Thay vì: "She has never worked here." → "Never <strong>has she</strong> worked here."</p>
        </section>
      </div>
    ),
    questions: [
      { q: "Never ____ such a talented musician.", options: ["I have seen", "have I seen", "I saw", "saw I"], correct: 1 },
      { q: "Not only ____ the exam, but she also got the highest score.", options: ["she passed", "did she pass", "she did pass", "passed she"], correct: 1 },
      { q: "Hardly ____ when the phone rang.", options: ["I sat down", "had I sat down", "I had sat down", "sat I down"], correct: 1 },
      { q: "Seldom ____ in such a difficult situation.", options: ["he is", "is he", "he has been", "does he"], correct: 1 },
      { q: "No sooner ____ than it started to rain.", options: ["we arrived", "had we arrived", "we had arrived", "did we arrive"], correct: 1 },
    ],
  },
  // ── Bài 60: Parallel Structure ────────────────────────────────────────────
  {
    id: '60',
    category: 'Cấu trúc đặc biệt',
    title: '60. Parallel Structure (Cấu Trúc Song Hành)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 11</span>
          <span>Cấu Trúc Song Hành – Parallel Structure</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-2">60.1. Nguyên Tắc Song Hành</h3>
          <p className="mb-3">Khi các thành phần trong câu được liệt kê, chúng phải <strong>cùng dạng từ loại và cấu trúc ngữ pháp</strong>.</p>
          <div className="space-y-3 text-xs">
            {[
              {
                rule: 'Danh từ + Danh từ + Danh từ',
                wrong: 'She likes reading, to swim, and dance.',
                right: 'She likes reading, swimming, and dancing.'
              },
              {
                rule: 'Động từ + Động từ + Động từ',
                wrong: 'He wrote, edited and will publish the report.',
                right: 'He wrote, edited, and published the report.'
              },
              {
                rule: 'Tính từ + Tính từ',
                wrong: 'The report was concise and with accuracy.',
                right: 'The report was concise and accurate.'
              },
            ].map((ex, i) => (
              <div key={i} className="bg-teal-50 p-3 rounded-xl border border-teal-100">
                <p className="font-bold text-teal-700 mb-1">[{ex.rule}]</p>
                <p className="text-red-500 line-through">❌ {ex.wrong}</p>
                <p className="text-green-600 mt-1">✅ {ex.right}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-2">60.2. Song Hành Với Correlative Conjunctions</h3>
          <div className="space-y-2 text-xs">
            {[
              { conj: 'both...and', ex: 'She is both intelligent and hardworking.' },
              { conj: 'either...or', ex: 'You can either call or send an email.' },
              { conj: 'neither...nor', ex: 'He neither smokes nor drinks.' },
              { conj: 'not only...but also', ex: 'Not only did he apologize, but he also fixed the mistake.' },
            ].map((ex, i) => (
              <div key={i} className="flex gap-3 bg-teal-50 p-2 rounded-lg border border-teal-100">
                <span className="font-mono text-teal-700 font-bold shrink-0">{ex.conj}</span>
                <span className="italic text-slate-600">{ex.ex}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The manager is responsible for planning, organizing, and ____ the team.", options: ["to lead", "leadership", "leading", "led"], correct: 2 },
      { q: "She is known for being reliable, ____, and professional.", options: ["her efficiency", "efficiency", "efficient", "efficiencies"], correct: 2 },
      { q: "Not only did he finish early, but he also ____ his colleagues.", options: ["helping", "helped", "to help", "help"], correct: 1 },
      { q: "The report must be ____, accurate, and comprehensive.", options: ["concisely", "concision", "concise", "conciseness"], correct: 2 },
      { q: "She enjoys neither working overtime ____ traveling for business.", options: ["and", "but", "or", "nor"], correct: 3 },
    ],
  },
  // ── Bài 61: Subjunctive Mood ─────────────────────────────────────────────
  {
    id: '61',
    category: 'Cấu trúc đặc biệt',
    title: '61. Subjunctive Mood (Thức Giả Định)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 11</span>
          <span>Thức Giả Định – Subjunctive (TOEIC Nâng Cao)</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-4 border-b-2 border-orange-100 pb-2">61.1. Subjunctive Formal (Thức Giả Định Trang Trọng)</h3>
          <p className="mb-3">Dùng sau các động từ yêu cầu, đề nghị, kiến nghị + <strong>THAT + S + V nguyên mẫu</strong> (không chia).</p>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <p className="font-mono font-black text-orange-800 text-sm text-center">V (request/suggest/demand) + that + S + V (bare infinitive)</p>
          </div>
          <div className="mt-4">
            <p className="font-bold text-orange-700 text-xs mb-2">Động từ kích hoạt subjunctive:</p>
            <div className="flex flex-wrap gap-2">
              {['suggest', 'recommend', 'request', 'demand', 'insist', 'require', 'propose', 'urge', 'ask', 'advise', 'order', 'mandate'].map(v => (
                <span key={v} className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded font-mono text-xs">{v}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-3 border-b-2 border-orange-100 pb-2">61.2. Ví dụ</h3>
          <div className="space-y-2 text-xs">
            {[
              { ex: 'The doctor suggested that she take more rest.', note: 'take (không phải takes/took)' },
              { ex: 'The board demanded that the CEO resign immediately.', note: 'resign (không phải resigns)' },
              { ex: 'It is essential that every employee be on time.', note: 'be (không phải is/are)' },
              { ex: 'The committee recommended that the proposal be accepted.', note: 'be accepted – bị động' },
            ].map((ex, i) => (
              <div key={i} className="bg-orange-50 p-2 rounded-lg border border-orange-100">
                <p className="italic text-orange-800">{ex.ex}</p>
                <p className="text-slate-500 mt-0.5">📌 {ex.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-2">⚠️ Lỗi Thường Gặp</h4>
          <div className="text-xs bg-white p-2 rounded border">
            <p className="text-red-500">❌ The manager insisted that she works overtime.</p>
            <p className="text-green-600 mt-1">✅ The manager insisted that she work overtime.</p>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The doctor recommended that she ____ more water.", options: ["drinks", "drink", "drank", "drinking"], correct: 1 },
      { q: "It is essential that every employee ____ a safety briefing.", options: ["attends", "attend", "attended", "attending"], correct: 1 },
      { q: "The committee demanded that the report ____ immediately.", options: ["submits", "is submitted", "be submitted", "submitted"], correct: 2 },
      { q: "The board of directors proposed that the CEO ____ his decision.", options: ["reconsiders", "reconsider", "reconsidered", "reconsidering"], correct: 1 },
      { q: "We suggest that all applicants ____ their portfolios online.", options: ["submit", "submits", "will submit", "to submit"], correct: 0 },
    ],
  },
  // ── Bài 62-85: Placeholder (Ôn Tổng Hợp) ──────────────────────────────────
  {
    id: '62',
    category: 'TOEIC chuyên sâu',
    title: '62. So/Such…That & Too/Enough',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 10</span>
          <span>So/Such...That & Too/Enough</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">62.1. SO...THAT & SUCH...THAT</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="font-black text-indigo-800 mb-2">SO + adj/adv + THAT</p>
              <p className="font-mono text-xs">so + adj + that + clause</p>
              <p className="italic text-xs mt-2">"She was <strong>so tired that</strong> she fell asleep instantly."</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="font-black text-purple-800 mb-2">SUCH + (a/an) + noun + THAT</p>
              <p className="font-mono text-xs">such + (a/an) + adj + noun + that</p>
              <p className="italic text-xs mt-2">"It was <strong>such a difficult exam that</strong> most students failed."</p>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-3 border-b-2 border-indigo-100 pb-2">62.2. TOO & ENOUGH</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-xs">
              <p className="font-black text-red-700 mb-2">TOO = Quá mức không thể làm</p>
              <p className="font-mono">too + adj/adv + (for O) + to V</p>
              <p className="italic mt-2">"It's too cold to go swimming."</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-xs">
              <p className="font-black text-green-700 mb-2">ENOUGH = Đủ để làm</p>
              <p className="font-mono">adj/adv + enough + (for O) + to V</p>
              <p className="italic mt-2">"She's old enough to drive a car."</p>
            </div>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The box was ____ heavy that two people couldn't lift it.", options: ["such", "very", "too", "so"], correct: 3 },
      { q: "It was ____ a good offer that she accepted immediately.", options: ["so", "such", "too", "very"], correct: 1 },
      { q: "He's not experienced ____ to lead the project.", options: ["very", "too", "enough", "such"], correct: 2 },
      { q: "The coffee was ____ hot to drink.", options: ["so", "such", "very", "too"], correct: 3 },
      { q: "She spoke ____ quickly that I couldn't understand her.", options: ["such", "very", "too", "so"], correct: 3 },
    ],
  },
  // ── Bài 63-85: Ôn Tổng Hợp ──────────────────────────────────────────────
  ...[63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85].map(n => ({
    id: String(n),
    category: n <= 68 ? 'Câu phức' : n <= 75 ? 'TOEIC chuyên sâu' : n <= 81 ? 'Cấu trúc đặc biệt' : 'Ôn tổng hợp',
    title: `${n}. ${[
      'Adverbial Clauses of Time',
      'Adverbial Clauses of Reason & Contrast',
      'Adverbial Clauses of Purpose & Result',
      'Cleft Sentences (It is…that)',
      'Question Forms (Wh- & Yes/No)',
      'Negative Questions & Indirect Questions',
      'Phrasal Verbs (Cụm Động Từ)',
      'Collocations TOEIC',
      'Idioms Thông Dụng',
      'So that vs. Such that – Nâng Cao',
      'Luyện TOEIC Part 5 – Tổng Hợp',
      'Luyện TOEIC Part 6 – Tổng Hợp',
      'Prepositions Advanced (Giới Từ Nâng Cao)',
      'Ellipsis & Substitution',
      'Word Order – Trật Tự Từ',
      'Articles Advanced (Mạo Từ Nâng Cao)',
      'Pronoun Reference',
      'Sentence Transformation',
      'Error Correction Strategies',
      'Grammar Review – Part 1',
      'Grammar Review – Part 2',
      'Mock TOEIC Grammar Test',
      'Final Review – Full Grammar',
    ][n - 63]}`,
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Bài {n}</span>
          <span>Đang cập nhật nội dung chi tiết...</span>
        </div>
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl border border-indigo-200 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-black text-indigo-800 mb-2">Bài {n} đang được chuẩn bị</h3>
          <p className="text-slate-500 text-sm">Nội dung bài học này đang được biên soạn với đầy đủ lý thuyết, ví dụ và bài tập TOEIC.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Coming Soon
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: `[Bài ${n}] Đây là câu hỏi mẫu cho bài số ${n}.`, options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'], correct: 0 },
    ],
  })),
];
