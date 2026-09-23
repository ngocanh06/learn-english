import React from 'react';

// ─── GROUP 5: CÂU TƯỜNG THUẬT (BÀI 45–47) ──────────────────────────────────
export const lessonsGroup5 = [
  {
    id: '45',
    category: 'Câu tường thuật',
    title: '45. Reported Speech – Statements (Câu Tường Thuật Khẳng Định)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 5</span>
          <span>Câu Tường Thuật – Reported Speech</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">45.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Dùng để <strong>thuật lại lời nói</strong> của người khác mà không dùng dấu ngoặc kép.</p>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
            <p className="font-mono font-black text-blue-800">S + said (that) + S + V (lùi thì)</p>
            <p className="text-xs text-blue-600 mt-1">hoặc: S + told + O + (that) + S + V (lùi thì)</p>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">45.2. Bảng Lùi Thì</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="p-2 border">Lời Nói Trực Tiếp</th><th className="p-2 border">→ Lời Tường Thuật</th></tr></thead>
              <tbody>
                {[
                  ['Simple Present (V / am/is/are)', 'Simple Past (V-ed / was/were)'],
                  ['Simple Past (V-ed)', 'Past Perfect (had + V3)'],
                  ['Present Continuous (am/is/are + Ving)', 'Past Continuous (was/were + Ving)'],
                  ['Present Perfect (have/has + V3)', 'Past Perfect (had + V3)'],
                  ['will + V', 'would + V'],
                  ['can + V', 'could + V'],
                  ['may + V', 'might + V'],
                  ['must + V', 'had to + V'],
                ].map(([direct, reported], i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-mono text-blue-700">{direct}</td>
                    <td className="p-2 border font-mono text-slate-700">→ {reported}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-100 pb-2">45.3. Thay Đổi Trạng Từ & Đại Từ</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-blue-700 text-xs mb-2">Trạng từ thay đổi:</p>
              <div className="space-y-1 text-xs">
                {[
                  ['now', '→ then'],
                  ['today', '→ that day'],
                  ['yesterday', '→ the day before'],
                  ['tomorrow', '→ the next day'],
                  ['here', '→ there'],
                  ['this', '→ that'],
                  ['these', '→ those'],
                  ['ago', '→ before'],
                  ['last week', '→ the previous week'],
                  ['next week', '→ the following week'],
                ].map(([from, to]) => (
                  <div key={from} className="flex gap-2 bg-blue-50 px-2 py-1 rounded">
                    <span className="font-mono text-blue-600 w-16 shrink-0">{from}</span>
                    <span className="text-slate-500">{to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-blue-700 text-xs mb-2">Ví dụ hoàn chỉnh:</p>
              <div className="space-y-2">
                {[
                  { d: '"I am tired," he said.', r: 'He said (that) he was tired.' },
                  { d: '"We will leave tomorrow," she said.', r: 'She said they would leave the next day.' },
                  { d: '"I have finished my work," Tom said.', r: 'Tom said he had finished his work.' },
                ].map((ex, i) => (
                  <div key={i} className="text-xs bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <p className="text-blue-700 italic">"{ex.d}"</p>
                    <p className="text-slate-600 mt-1">→ {ex.r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: '"I am feeling sick," she said.', options: ['She said she is feeling sick.', 'She said she was feeling sick.', 'She said I was feeling sick.', 'She told she was feeling sick.'], correct: 1 },
      { q: '"We will attend the conference," they said.', options: ['They said they would attend the conference.', 'They said they will attend the conference.', 'They told they would attend the conference.', 'They said we would attend the conference.'], correct: 0 },
      { q: '"I have lost my keys," she said.', options: ['She said she has lost her keys.', 'She said she lost her keys.', 'She said she had lost her keys.', 'She told she had lost her keys.'], correct: 2 },
      { q: '"I can help you," he said.', options: ['He said he can help me.', 'He said he could help me.', 'He said he could help you.', 'He told he could help me.'], correct: 1 },
      { q: '"I\'ll come back tomorrow," he said.', options: ['He said he will come back tomorrow.', 'He said he would come back tomorrow.', 'He said he would come back the next day.', 'He told he would come back the next day.'], correct: 2 },
    ],
  },
  {
    id: '46',
    category: 'Câu tường thuật',
    title: '46. Reported Speech – Questions (Câu Tường Thuật Nghi Vấn)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 5</span>
          <span>Câu Tường Thuật – Câu Hỏi</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">46.1. Hai Loại Câu Hỏi Tường Thuật</h3>
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <p className="font-bold text-indigo-700">Câu hỏi Yes/No → dùng IF hoặc WHETHER</p>
              <p className="font-mono text-xs mt-2">S + asked + (O) + if/whether + S + V (lùi thì)</p>
              <div className="mt-2 text-xs bg-white p-2 rounded border border-indigo-100">
                <p className="italic text-indigo-600">"Are you coming?" he asked.</p>
                <p className="text-slate-600 mt-1">→ He asked if I was coming.</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="font-bold text-purple-700">Câu hỏi Wh- → giữ từ để hỏi</p>
              <p className="font-mono text-xs mt-2">S + asked + (O) + Wh- + S + V (lùi thì)</p>
              <div className="mt-2 text-xs bg-white p-2 rounded border border-purple-100">
                <p className="italic text-purple-600">"Where do you live?" she asked.</p>
                <p className="text-slate-600 mt-1">→ She asked where I lived.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-3">⚠️ Lỗi Thường Gặp</h4>
          <div className="space-y-2 text-xs bg-white p-3 rounded-lg border border-red-100">
            <p className="text-red-500">❌ He asked where did I live. (Sai trật tự từ)</p>
            <p className="text-green-600">✅ He asked where I lived. (S + V trong câu tường thuật)</p>
            <p className="text-slate-400 mt-1">→ Câu tường thuật dùng trật tự câu khẳng định (S + V), không phải câu hỏi!</p>
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Ví dụ tổng hợp</h4>
          <div className="space-y-2 text-xs">
            {[
              { d: '"What time does the meeting start?" she asked.', r: 'She asked what time the meeting started.' },
              { d: '"Have you finished?" the teacher asked.', r: 'The teacher asked if we had finished.' },
              { d: '"Why are you late?" he asked me.', r: 'He asked me why I was late.' },
            ].map((ex, i) => (
              <div key={i} className="bg-white p-2 rounded-lg border">
                <p className="italic text-amber-700">{ex.d}</p>
                <p className="text-slate-600 mt-1">→ {ex.r}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: '"Where do you work?" he asked me.', options: ['He asked me where do I work.', 'He asked me where I worked.', 'He asked me where did I work.', 'He asked where I works.'], correct: 1 },
      { q: '"Are you happy here?" she asked.', options: ['She asked if I was happy there.', 'She asked if I am happy there.', 'She asked whether I am happy here.', 'She asked if was I happy there.'], correct: 0 },
      { q: '"What have you done?" the manager asked.', options: ['The manager asked what had I done.', 'The manager asked what I have done.', 'The manager asked what I had done.', 'The manager asked what did I do.'], correct: 2 },
      { q: '"Can you speak French?" she asked me.', options: ['She asked me if I can speak French.', 'She asked me if I could speak French.', 'She asked me whether could I speak French.', 'She asked me could I speak French.'], correct: 1 },
      { q: '"Why didn\'t you come to the meeting?" she asked him.', options: ['She asked him why he didn\'t come.', 'She asked him why he hadn\'t come.', 'She asked him why didn\'t he come.', 'She asked him why he hadn\'t came.'], correct: 1 },
    ],
  },
  {
    id: '47',
    category: 'Câu tường thuật',
    title: '47. Reported Speech – Commands & Requests',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 5</span>
          <span>Câu Tường Thuật – Mệnh Lệnh & Yêu Cầu</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-green-700 mb-4 border-b-2 border-green-100 pb-2">47.1. Cấu trúc Câu Mệnh Lệnh Tường Thuật</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <p className="font-bold text-green-700 text-center">Mệnh lệnh / Yêu cầu</p>
              <p className="font-mono text-xs mt-2 text-center">S + told/asked/ordered + O + to + V</p>
              <p className="italic text-xs mt-2 text-center text-slate-600">"Open the window!" → He told me to open the window.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="font-bold text-red-700 text-center">Mệnh lệnh Phủ Định</p>
              <p className="font-mono text-xs mt-2 text-center">S + told/asked/ordered + O + not to + V</p>
              <p className="italic text-xs mt-2 text-center text-slate-600">"Don't touch that!" → She told me not to touch that.</p>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-green-700 mb-3 border-b-2 border-green-100 pb-2">47.2. Động từ tường thuật thông dụng</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-green-600 text-white"><th className="p-2 border">Động từ</th><th className="p-2 border">Cấu trúc</th><th className="p-2 border">Ví dụ</th></tr></thead>
              <tbody>
                {[
                  { v: 'tell', s: 'tell + O + to V', ex: '"Clean up." → He told them to clean up.' },
                  { v: 'ask', s: 'ask + O + to V', ex: '"Please help me." → She asked me to help her.' },
                  { v: 'order', s: 'order + O + to V', ex: '"Stand up!" → The officer ordered him to stand up.' },
                  { v: 'advise', s: 'advise + O + to V', ex: '"You should rest." → She advised me to rest.' },
                  { v: 'warn', s: 'warn + O + not to V', ex: '"Don\'t swim here." → He warned us not to swim there.' },
                  { v: 'remind', s: 'remind + O + to V', ex: '"Don\'t forget." → She reminded me to remember.' },
                  { v: 'offer', s: 'offer + to V', ex: '"Shall I help you?" → He offered to help.' },
                  { v: 'promise', s: 'promise + to V', ex: '"I will come." → She promised to come.' },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold text-green-700">{r.v}</td>
                    <td className="p-2 border font-mono text-xs">{r.s}</td>
                    <td className="p-2 border italic text-xs">{r.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: '"Please sit down," the teacher said to us.', options: ['The teacher told us sit down.', 'The teacher asked us to sit down.', 'The teacher told us sitting down.', 'The teacher asked us sit down.'], correct: 1 },
      { q: '"Don\'t be late!" the manager said to him.', options: ['The manager told him not to be late.', 'The manager told him don\'t be late.', 'The manager said him not to be late.', 'The manager told him not be late.'], correct: 0 },
      { q: '"You should see a doctor," she told me.', options: ['She told me see a doctor.', 'She said me to see a doctor.', 'She advised me to see a doctor.', 'She advised me see a doctor.'], correct: 2 },
      { q: '"Shall I carry that for you?" he said.', options: ['He said to carry that.', 'He offered to carry that.', 'He asked to carry that.', 'He told to carry that.'], correct: 1 },
      { q: '"Don\'t touch the exhibit," the guard warned us.', options: ['The guard warned us not touching the exhibit.', 'The guard warned us not to touch the exhibit.', 'The guard told us not touch the exhibit.', 'The guard warned us don\'t touch the exhibit.'], correct: 1 },
    ],
  },
];

// ─── GROUP 6: MỆNH ĐỀ QUAN HỆ (BÀI 48–51) ──────────────────────────────────
export const lessonsGroup6 = [
  {
    id: '48',
    category: 'Mệnh đề quan hệ',
    title: '48. Relative Clauses – Who, Which, That',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 6</span>
          <span>Mệnh Đề Quan Hệ – Relative Clauses</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-2">48.1. Định nghĩa & Đại Từ Quan Hệ</h3>
          <p className="mb-4">Mệnh đề quan hệ là mệnh đề phụ dùng để <strong>bổ sung thông tin cho danh từ</strong> đứng trước nó.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-teal-600 text-white"><th className="p-2 border">Đại từ</th><th className="p-2 border">Dùng cho</th><th className="p-2 border">Chức năng</th><th className="p-2 border">Ví dụ</th></tr></thead>
              <tbody>
                {[
                  { pron: 'WHO', use: 'Người', func: 'Chủ ngữ', ex: 'The man who called you is here.' },
                  { pron: 'WHOM', use: 'Người', func: 'Tân ngữ', ex: 'The woman whom I met was kind.' },
                  { pron: 'WHICH', use: 'Vật/Sự việc', func: 'CN hoặc TN', ex: 'The book which I bought is good.' },
                  { pron: 'THAT', use: 'Người/Vật', func: 'CN hoặc TN', ex: 'The report that I wrote was praised.' },
                  { pron: 'WHOSE', use: 'Sở hữu', func: 'Sở hữu', ex: 'The student whose essay won is happy.' },
                  { pron: 'WHERE', use: 'Nơi chốn', func: 'Trạng ngữ', ex: 'The city where I live is beautiful.' },
                  { pron: 'WHEN', use: 'Thời gian', func: 'Trạng ngữ', ex: 'The year when she was born was 1995.' },
                  { pron: 'WHY', use: 'Lý do', func: 'Trạng ngữ', ex: 'The reason why he left is unclear.' },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold text-teal-700">{r.pron}</td>
                    <td className="p-2 border">{r.use}</td>
                    <td className="p-2 border">{r.func}</td>
                    <td className="p-2 border italic text-xs">{r.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-2">48.2. Ví dụ Kết Hợp Câu</h3>
          <div className="space-y-3">
            {[
              { s1: 'The woman is my teacher.', s2: 'She wrote this book.', combined: 'The woman who wrote this book is my teacher.' },
              { s1: 'I bought a laptop.', s2: 'The laptop is very fast.', combined: 'The laptop which/that I bought is very fast.' },
              { s1: 'I have a friend.', s2: 'Her father is a doctor.', combined: 'I have a friend whose father is a doctor.' },
            ].map((ex, i) => (
              <div key={i} className="bg-teal-50 p-3 rounded-xl border border-teal-100 text-xs">
                <p><span className="text-teal-600 font-bold">1:</span> {ex.s1}</p>
                <p><span className="text-teal-600 font-bold">2:</span> {ex.s2}</p>
                <p className="mt-1 font-bold text-teal-800">→ {ex.combined}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The employee ____ submitted the report was praised.", options: ["which", "whose", "whom", "who"], correct: 3 },
      { q: "The city ____ I grew up has changed a lot.", options: ["which", "when", "where", "who"], correct: 2 },
      { q: "She is the manager ____ team won the award.", options: ["who", "which", "whose", "that"], correct: 2 },
      { q: "This is the document ____ you need to sign.", options: ["who", "whom", "which", "whose"], correct: 2 },
      { q: "2020 was the year ____ everything changed.", options: ["where", "which", "who", "when"], correct: 3 },
    ],
  },
  {
    id: '49',
    category: 'Mệnh đề quan hệ',
    title: '49. Defining vs. Non-defining Relative Clauses',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 6</span>
          <span>Xác Định vs. Không Xác Định</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-4 border-b-2 border-orange-100 pb-2">49.1. Bảng So Sánh</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="font-black text-blue-800 text-center mb-3">DEFINING (Xác định)</p>
              <ul className="text-xs space-y-1">
                <li>✓ Thông tin <strong>cần thiết</strong> để xác định danh từ</li>
                <li>✓ <strong>Không</strong> có dấu phẩy</li>
                <li>✓ Có thể dùng <strong>THAT</strong></li>
                <li>✓ Bỏ đi câu mất nghĩa</li>
              </ul>
              <p className="italic text-xs mt-3 bg-white p-2 rounded border">"The man <strong>who lives next door</strong> is friendly." <br/>(Xác định ông nào)</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <p className="font-black text-orange-800 text-center mb-3">NON-DEFINING (Không xác định)</p>
              <ul className="text-xs space-y-1">
                <li>✓ Thông tin <strong>bổ sung</strong>, không bắt buộc</li>
                <li>✓ <strong>Có</strong> dấu phẩy</li>
                <li>✓ <strong>Không</strong> dùng THAT</li>
                <li>✓ Bỏ đi câu vẫn hiểu</li>
              </ul>
              <p className="italic text-xs mt-3 bg-white p-2 rounded border">"Mr. Brown, <strong>who lives next door</strong>, is friendly." <br/>(Đã biết Mr. Brown là ai)</p>
            </div>
          </div>
        </section>
        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-3">⚠️ Lỗi Thường Gặp</h4>
          <div className="space-y-2 text-xs bg-white p-3 rounded-lg border border-red-100">
            <p className="text-red-500">❌ My brother, that lives in Hanoi, is a doctor.</p>
            <p className="text-green-600">✅ My brother, who lives in Hanoi, is a doctor.</p>
            <p className="text-slate-400 italic">(Non-defining clause không dùng THAT)</p>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The book ____ I told you about is now available.", options: ["which", ", which", "that", "both A and C"], correct: 3 },
      { q: "My sister, ____ is a nurse, works at the local hospital.", options: ["that", "which", "who", ", who"], correct: 3 },
      { q: "The car ____ was stolen has been found.", options: ["which", "that", "who", "both A and B"], correct: 3 },
      { q: "London, ____ is the capital of England, is very expensive.", options: ["that", "which", ", which", "who"], correct: 2 },
      { q: "This is the only book ____ I've read twice.", options: [", which", ", that", "which", "that"], correct: 3 },
    ],
  },
  {
    id: '50',
    category: 'Mệnh đề quan hệ',
    title: '50. Reduced Relative Clauses (Rút Gọn Mệnh Đề Quan Hệ)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 6</span>
          <span>Rút Gọn Mệnh Đề Quan Hệ</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-4 border-b-2 border-rose-100 pb-2">50.1. Hai Cách Rút Gọn</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
              <p className="font-black text-rose-800 text-center mb-2">Dùng V-ing (Active)</p>
              <p className="text-xs">Khi mệnh đề quan hệ có động từ <strong>chủ động</strong></p>
              <div className="mt-2 text-xs space-y-1">
                <p className="italic">"The man <span className="text-rose-600">who is standing</span> over there..." </p>
                <p className="text-slate-600">→ "The man <strong>standing</strong> over there..."</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="font-black text-purple-800 text-center mb-2">Dùng V3/past participle (Passive)</p>
              <p className="text-xs">Khi mệnh đề quan hệ có động từ <strong>bị động</strong></p>
              <div className="mt-2 text-xs space-y-1">
                <p className="italic">"The car <span className="text-purple-600">which was stolen</span>..."</p>
                <p className="text-slate-600">→ "The car <strong>stolen</strong>..."</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-3 border-b-2 border-rose-100 pb-2">50.2. Ví dụ So Sánh</h3>
          <div className="space-y-3 text-xs">
            {[
              { full: 'The students who are studying in the library are focused.', reduced: 'The students studying in the library are focused.', type: 'V-ing' },
              { full: 'The report which was submitted yesterday was excellent.', reduced: 'The report submitted yesterday was excellent.', type: 'V3' },
              { full: 'Anyone who wants to apply should submit a form.', reduced: 'Anyone wanting to apply should submit a form.', type: 'V-ing' },
              { full: 'The building which was built in 1990 is now a museum.', reduced: 'The building built in 1990 is now a museum.', type: 'V3' },
            ].map((ex, i) => (
              <div key={i} className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                <p className="italic text-rose-800">{ex.full}</p>
                <p className="text-slate-600 mt-1">→ <strong>{ex.reduced}</strong> <span className="text-rose-400">({ex.type})</span></p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Quy Tắc Rút Gọn</h4>
          <ul className="text-xs space-y-1">
            {['Chỉ rút gọn khi đại từ quan hệ là CHỦ NGỮ của mệnh đề phụ', 'Bỏ đại từ quan hệ (who/which/that) + to be (nếu có)', 'Chủ động → V-ing | Bị động → V3', 'Không rút gọn non-defining clauses trong văn trang trọng'].map((tip, i) => (
              <li key={i} className="flex gap-2"><span className="text-amber-500">•</span>{tip}</li>
            ))}
          </ul>
        </section>
      </div>
    ),
    questions: [
      { q: "The woman ____ at the reception desk will help you.", options: ["who sits", "sitting", "is sitting", "sat"], correct: 1 },
      { q: "Documents ____ before the deadline will be processed.", options: ["which submit", "submitting", "submitted", "that are submitting"], correct: 2 },
      { q: "The car ____ in front of the building belongs to the director.", options: ["park", "parked", "parking", "that parks"], correct: 1 },
      { q: "Anyone ____ to join the club should register online.", options: ["wants", "wanted", "wanting", "who wanting"], correct: 2 },
      { q: "The email ____ this morning contained important information.", options: ["received", "receiving", "that receives", "who received"], correct: 0 },
    ],
  },
  {
    id: '51',
    category: 'Tính từ & Trạng từ',
    title: '51. Adjectives – Types & Order (Tính Từ - Phân Loại & Trật Tự)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 7</span>
          <span>Tính Từ – Adjectives</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">51.1. Trật Tự Tính Từ</h3>
          <p className="mb-3 text-xs">Khi có nhiều tính từ trước danh từ, cần sắp xếp theo thứ tự:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-indigo-600 text-white">
                {['#', 'Loại', 'Ví dụ'].map(h => <th key={h} className="p-2 border">{h}</th>)}
              </tr></thead>
              <tbody>
                {[
                  ['1', 'Ý kiến / Đánh giá', 'beautiful, wonderful, awful'],
                  ['2', 'Kích thước', 'big, small, large, tiny'],
                  ['3', 'Tuổi / Thời gian', 'old, young, new, ancient'],
                  ['4', 'Hình dạng', 'round, square, oval'],
                  ['5', 'Màu sắc', 'red, blue, green'],
                  ['6', 'Nguồn gốc / Quốc tịch', 'French, Japanese, local'],
                  ['7', 'Chất liệu', 'wooden, silver, cotton'],
                  ['8', 'Mục đích', 'sleeping (bag), cooking (oil)'],
                  ['9', 'DANH TỪ', ''],
                ].map(([num, type, ex], i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-indigo-50' : ''}`}>
                    <td className="p-2 border font-black text-indigo-700 text-center">{num}</td>
                    <td className="p-2 border font-bold">{type}</td>
                    <td className="p-2 border italic text-slate-500">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
            <p className="font-bold text-indigo-700">Ví dụ:</p>
            <p className="mt-1 italic">"a beautiful <span className="text-rose-600">large</span> <span className="text-orange-600">old</span> <span className="text-yellow-600">rectangular</span> <span className="text-green-600">dark blue</span> <span className="text-teal-600">French</span> <span className="text-blue-600">silver</span> ring"</p>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-3 border-b-2 border-indigo-100 pb-2">51.2. Phân Biệt Tính Từ Thường Nhầm Lẫn</h3>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {[
              { pair: 'bored / boring', a: 'bored: buồn chán (người)', b: 'boring: nhàm chán (thứ/việc gây ra)' },
              { pair: 'interested / interesting', a: 'interested: thấy hứng thú', b: 'interesting: thú vị' },
              { pair: 'tired / tiring', a: 'tired: mệt mỏi', b: 'tiring: gây mệt mỏi' },
              { pair: 'surprised / surprising', a: 'surprised: cảm thấy ngạc nhiên', b: 'surprising: đáng ngạc nhiên' },
            ].map((item, i) => (
              <div key={i} className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-2">{item.pair}</p>
                <p><span className="font-mono text-blue-600">{item.pair.split('/')[0].trim()}</span>: {item.a}</p>
                <p><span className="font-mono text-orange-600">{item.pair.split('/')[1].trim()}</span>: {item.b}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "She bought a ____ Italian silk scarf.", options: ["beautiful long", "long beautiful", "Italian beautiful long", "beautiful long Italian"], correct: 0 },
      { q: "The movie was so ____ that I fell asleep.", options: ["bored", "boring", "bore", "boringly"], correct: 1 },
      { q: "He drove his ____ old black German car.", options: ["big old black German", "German big old black", "big black German old", "old big German black"], correct: 0 },
      { q: "She seemed ____ by the news.", options: ["surprising", "surprise", "surprised", "surprisingly"], correct: 2 },
      { q: "The lecture was three hours long and very ____.", options: ["tired", "tire", "tiring", "tiresome"], correct: 2 },
    ],
  },
];
