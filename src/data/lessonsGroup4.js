import React from 'react';

// ─── GROUP 4: CÂU BỊ ĐỘNG (BÀI 41–44) ──────────────────────────────────────
export const lessonsGroup4 = [
  {
    id: '41',
    category: 'Câu bị động',
    title: '41. Passive Voice – Simple Tenses (Câu Bị Động Thì Đơn)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 4</span>
          <span>Câu Bị Động – Passive Voice</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-slate-700 mb-4 border-b-2 border-slate-100 pb-2">41.1. Định nghĩa & Công thức chuyển đổi</h3>
          <p className="mb-4">Câu bị động (Passive Voice) được dùng khi muốn <strong>nhấn mạnh đối tượng chịu tác động</strong> hơn là chủ thể thực hiện hành động.</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <p className="font-mono font-black text-slate-800 text-base">S + be + V3/past participle + (by + agent)</p>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-slate-700 mb-4 border-b-2 border-slate-100 pb-2">41.2. Chuyển Đổi Theo Từng Thì</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-slate-700 text-white"><th className="p-2 border">Thì</th><th className="p-2 border">Chủ động</th><th className="p-2 border">Bị động</th></tr></thead>
              <tbody>
                {[
                  { tense: 'Simple Present', active: 'S + V(s/es)', passive: 'S + am/is/are + V3' },
                  { tense: 'Simple Past', active: 'S + V2/ed', passive: 'S + was/were + V3' },
                  { tense: 'Simple Future', active: 'S + will + V', passive: 'S + will be + V3' },
                  { tense: 'Present Continuous', active: 'S + am/is/are + V-ing', passive: 'S + am/is/are + being + V3' },
                  { tense: 'Past Continuous', active: 'S + was/were + V-ing', passive: 'S + was/were + being + V3' },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold">{r.tense}</td>
                    <td className="p-2 border font-mono text-xs">{r.active}</td>
                    <td className="p-2 border font-mono text-xs text-slate-700">{r.passive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-slate-700 mb-3 border-b-2 border-slate-100 pb-2">41.3. Ví dụ Chuyển Đổi</h3>
          <div className="space-y-3">
            {[
              { a: 'The company sends invoices every month.', p: 'Invoices are sent (by the company) every month.' },
              { a: 'Someone broke the window yesterday.', p: 'The window was broken yesterday.' },
              { a: 'They are building a new bridge.', p: 'A new bridge is being built.' },
            ].map((ex, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-100 text-xs"><span className="text-blue-600 font-bold">Chủ động:</span> <span className="italic">{ex.a}</span></div>
                <div className="bg-green-50 p-2 rounded-lg border border-green-100 text-xs"><span className="text-green-600 font-bold">Bị động:</span> <span className="italic">{ex.p}</span></div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Khi nào dùng câu bị động?</h4>
          <ul className="space-y-1 text-xs">
            {['Không biết / không cần biết chủ thể là ai', 'Muốn nhấn mạnh đối tượng chịu tác động', 'Trong văn học thuật, báo cáo khoa học', 'Để tránh lặp lại chủ ngữ'].map((tip, i) => (
              <li key={i} className="flex items-center gap-2"><span className="text-amber-500">✓</span>{tip}</li>
            ))}
          </ul>
        </section>
      </div>
    ),
    questions: [
      { q: "The report ____ by the manager every week.", options: ["reviews", "is reviewing", "is reviewed", "reviewed"], correct: 2 },
      { q: "The package ____ yesterday afternoon.", options: ["delivers", "was delivered", "is delivered", "delivered"], correct: 1 },
      { q: "A new school ____ in our neighborhood next year.", options: ["will build", "is building", "will be built", "builds"], correct: 2 },
      { q: "The documents ____ by the accountant at the moment.", options: ["check", "are checking", "are being checked", "checked"], correct: 2 },
      { q: "English ____ by millions of people around the world.", options: ["speaks", "is spoken", "was spoken", "speaks"], correct: 1 },
    ],
  },
  {
    id: '42',
    category: 'Câu bị động',
    title: '42. Passive Voice – Perfect Tenses',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 4</span>
          <span>Câu Bị Động – Perfect Tenses</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-2">42.1. Cấu trúc theo thì hoàn thành</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-teal-600 text-white"><th className="p-2 border">Thì</th><th className="p-2 border">Chủ động</th><th className="p-2 border">Bị động</th></tr></thead>
              <tbody>
                {[
                  { tense: 'Present Perfect', active: 'have/has + V3', passive: 'have/has + been + V3' },
                  { tense: 'Past Perfect', active: 'had + V3', passive: 'had + been + V3' },
                  { tense: 'Future Perfect', active: 'will + have + V3', passive: 'will + have + been + V3' },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold">{r.tense}</td>
                    <td className="p-2 border font-mono text-xs">{r.active}</td>
                    <td className="p-2 border font-mono text-xs text-teal-700">{r.passive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-2">42.2. Ví dụ</h3>
          <div className="space-y-2">
            {[
              { a: 'The committee has approved the budget.', p: 'The budget has been approved (by the committee).' },
              { a: 'They had repaired the road before the storm.', p: 'The road had been repaired before the storm.' },
              { a: 'The team will have completed the project by Friday.', p: 'The project will have been completed by Friday.' },
            ].map((ex, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded-lg border text-xs"><span className="text-blue-600 font-bold">→ </span><span className="italic">{ex.a}</span></div>
                <div className="bg-teal-50 p-2 rounded-lg border text-xs"><span className="text-teal-600 font-bold">→ </span><span className="italic">{ex.p}</span></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The new policy ____ by the board of directors.", options: ["approved", "has approved", "has been approved", "approves"], correct: 2 },
      { q: "All the food ____ by the time the guests arrived.", options: ["eaten", "had eaten", "had been eaten", "was eaten"], correct: 2 },
      { q: "The contract ____ before the deadline.", options: ["will sign", "will be signing", "will have been signed", "signs"], correct: 2 },
      { q: "A cure for the disease ____ yet.", options: ["hasn't found", "hasn't been found", "didn't find", "wasn't found"], correct: 1 },
      { q: "The mistake ____ before the manager noticed it.", options: ["had corrected", "corrected", "had been corrected", "was corrected"], correct: 2 },
    ],
  },
  {
    id: '43',
    category: 'Câu bị động',
    title: '43. Passive Voice – Modal Verbs',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 4</span>
          <span>Câu Bị Động với Modal Verbs</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-purple-700 mb-4 border-b-2 border-purple-100 pb-2">43.1. Cấu trúc</h3>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="font-mono font-black text-purple-800 text-base">S + modal + be + V3/past participle</p>
            <p className="text-xs text-purple-600 mt-1">(can be, must be, should be, might be, could be, has to be...)</p>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-100 pb-2">43.2. Ví dụ theo từng modal</h3>
          <div className="space-y-2">
            {[
              { modal: 'must', a: 'You must sign this document.', p: 'This document must be signed.' },
              { modal: 'should', a: 'They should repair the road.', p: 'The road should be repaired.' },
              { modal: 'can', a: 'Someone can solve this problem.', p: 'This problem can be solved.' },
              { modal: 'might', a: 'They might delay the meeting.', p: 'The meeting might be delayed.' },
              { modal: 'has to', a: 'The staff has to submit the reports.', p: 'The reports have to be submitted.' },
            ].map((ex, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-2 items-center">
                <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded font-mono text-xs text-center">{ex.modal}</span>
                <div className="bg-blue-50 p-2 rounded-lg border text-xs italic">{ex.a}</div>
                <div className="bg-purple-50 p-2 rounded-lg border text-xs italic text-purple-700">{ex.p}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-2">⚠️ Lưu ý đặc biệt</h4>
          <p className="text-xs">Sau Modal + be + V3: <strong>be</strong> không thay đổi (không thành been, was, were)</p>
          <div className="mt-2 bg-white p-2 rounded border text-xs">
            <p className="text-red-500">❌ This must been done. / This should was done.</p>
            <p className="text-green-600 mt-1">✅ This must be done. / This should be done.</p>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "The form ____ before the deadline.", options: ["must submit", "must be submitted", "must submitted", "must be submit"], correct: 1 },
      { q: "This problem ____ immediately.", options: ["should solve", "should solved", "should be solved", "should be solving"], correct: 2 },
      { q: "The project ____ without the manager's approval.", options: ["can't start", "can't be started", "can't be starting", "couldn't start"], correct: 1 },
      { q: "These instructions ____ carefully.", options: ["must follow", "must be following", "must be followed", "must followed"], correct: 2 },
      { q: "A decision ____ by next week.", options: ["has to make", "has to be made", "have to be made", "has to making"], correct: 1 },
    ],
  },
  {
    id: '44',
    category: 'Câu bị động',
    title: '44. Causative (Have/Get Something Done)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 4</span>
          <span>Câu Nhờ Vả (Causative) – Have/Get Something Done</span>
        </div>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-emerald-700 mb-4 border-b-2 border-emerald-100 pb-2">44.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả việc <strong>nhờ/thuê người khác làm gì cho mình</strong> (không tự làm).</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <p className="font-black text-emerald-700 text-center">HAVE Something Done</p>
              <p className="font-mono text-xs mt-2 text-center">S + have + O + V3</p>
              <p className="italic text-xs mt-2 text-center text-slate-600">"I have my hair cut every month."</p>
              <p className="text-xs mt-1 text-center text-slate-400">(Tôi nhờ cắt tóc hàng tháng)</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
              <p className="font-black text-teal-700 text-center">GET Something Done</p>
              <p className="font-mono text-xs mt-2 text-center">S + get + O + V3</p>
              <p className="italic text-xs mt-2 text-center text-slate-600">"She got her car repaired."</p>
              <p className="text-xs mt-1 text-center text-slate-400">(Cô ấy nhờ sửa xe)</p>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-emerald-700 mb-3 border-b-2 border-emerald-100 pb-2">44.2. Ví dụ theo thì</h3>
          <div className="space-y-2">
            {[
              { en: 'She has her nails done every week.', vi: 'Cô ấy nhờ làm móng mỗi tuần.' },
              { en: 'I had my laptop repaired yesterday.', vi: 'Hôm qua tôi nhờ sửa laptop.' },
              { en: 'He will have his house painted next month.', vi: 'Tháng tới anh ấy nhờ sơn nhà.' },
              { en: 'They got the documents translated.', vi: 'Họ nhờ dịch các tài liệu.' },
            ].map((ex, i) => (
              <div key={i} className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                <p className="font-mono text-emerald-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs">→ {ex.vi}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Have someone do vs. Have something done</h4>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-2 rounded-lg border">
              <p className="font-bold">Have + PERSON + do</p>
              <p className="italic mt-1">"I had the plumber fix the pipe."</p>
              <p className="text-slate-500">(Nhờ thợ sửa ống nước)</p>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <p className="font-bold">Have + THING + done</p>
              <p className="italic mt-1">"I had the pipe fixed."</p>
              <p className="text-slate-500">(Ống nước được sửa)</p>
            </div>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "She ____ her car ____ every six months.", options: ["has / service", "gets / service", "has / serviced", "had / service"], correct: 2 },
      { q: "I ____ my teeth ____ at the dentist yesterday.", options: ["had / checked", "got / check", "have / checked", "had / check"], correct: 0 },
      { q: "They are ____ their office ____.", options: ["having / renovated", "getting / renovate", "having / renovating", "have / renovated"], correct: 0 },
      { q: "He needs to get his eyes ____.", options: ["test", "testing", "tested", "to test"], correct: 2 },
      { q: "We had our annual report ____ by an external firm.", options: ["prepare", "preparing", "prepared", "to prepare"], correct: 2 },
    ],
  },
];
