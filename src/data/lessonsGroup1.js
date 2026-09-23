import React from 'react';

// ─── GROUP 1: THÌ HOÀN THÀNH (BÀI 28–32) ────────────────────────────────────
export const lessonsGroup1 = [
  {
    id: '28',
    category: 'Thì',
    title: '28. Present Perfect (Thì Hiện Tại Hoàn Thành)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 1</span>
          <span>Thì Hiện Tại Hoàn Thành – Present Perfect</span>
        </div>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-2">28.1. Định nghĩa</h3>
          <p className="mb-3">Thì hiện tại hoàn thành diễn tả hành động <strong>đã xảy ra trong quá khứ</strong> và có <strong>liên quan đến hiện tại</strong> — kết quả vẫn còn ảnh hưởng đến bây giờ.</p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-center">
              <p className="font-black text-teal-700">Khẳng định</p>
              <p className="font-mono text-xs mt-2">S + have/has + V3/ed</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center">
              <p className="font-black text-red-700">Phủ định</p>
              <p className="font-mono text-xs mt-2">S + have/has + not + V3/ed</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center">
              <p className="font-black text-blue-700">Nghi vấn</p>
              <p className="font-mono text-xs mt-2">Have/Has + S + V3/ed?</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-2">28.2. Khi nào dùng?</h3>
          <div className="space-y-3">
            {[
              { title: 'Hành động vừa mới xảy ra', kw: 'just, recently, lately', ex: 'She has just left the office.', vi: 'Cô ấy vừa rời văn phòng.' },
              { title: 'Kinh nghiệm trong cuộc đời', kw: 'ever, never, before', ex: 'I have never eaten sushi.', vi: 'Tôi chưa bao giờ ăn sushi.' },
              { title: 'Hành động bắt đầu từ quá khứ đến nay', kw: 'for, since', ex: 'He has lived here for 10 years.', vi: 'Anh ấy đã sống ở đây 10 năm.' },
              { title: 'Thành tích, kết quả vẫn còn hiệu lực', kw: 'already, yet', ex: 'They have already finished the report.', vi: 'Họ đã hoàn thành báo cáo rồi.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <span className="bg-teal-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-bold text-teal-800">{item.title}</p>
                  <p className="text-xs text-teal-600 italic">Dấu hiệu: {item.kw}</p>
                  <p className="text-xs mt-1 font-mono bg-white px-2 py-1 rounded border border-teal-200 mt-1">"{item.ex}" → {item.vi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-2">28.3. Have vs. Has</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="font-black text-blue-800 text-center mb-2">HAVE</p>
              <p className="text-xs text-center text-blue-600">I / You / We / They</p>
              <p className="font-mono text-xs mt-2 italic text-center">I have finished my homework.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="font-black text-purple-800 text-center mb-2">HAS</p>
              <p className="text-xs text-center text-purple-600">He / She / It / Danh từ số ít</p>
              <p className="font-mono text-xs mt-2 italic text-center">She has visited Paris twice.</p>
            </div>
          </div>
        </section>

        <section className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">⚠️ Lỗi Thường Gặp</h4>
          <div className="space-y-2 text-sm">
            <div className="bg-white p-3 rounded-lg border border-red-100">
              <p className="text-red-600">❌ I have went to Japan last year.</p>
              <p className="text-green-600">✅ I went to Japan last year. (Có thời gian xác định → dùng Simple Past)</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-100">
              <p className="text-red-600">❌ She has ever been to London?</p>
              <p className="text-green-600">✅ Has she ever been to London?</p>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Mẹo Ghi Nhớ</h4>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-2 rounded-lg"><strong>FOR</strong> = khoảng thời gian (for 3 years, for a week)</div>
            <div className="bg-white p-2 rounded-lg"><strong>SINCE</strong> = mốc thời gian (since 2020, since Monday)</div>
            <div className="bg-white p-2 rounded-lg"><strong>ALREADY</strong> = câu khẳng định (giữa câu)</div>
            <div className="bg-white p-2 rounded-lg"><strong>YET</strong> = câu phủ định/nghi vấn (cuối câu)</div>
            <div className="bg-white p-2 rounded-lg"><strong>JUST</strong> = vừa mới (giữa câu)</div>
            <div className="bg-white p-2 rounded-lg"><strong>EVER/NEVER</strong> = kinh nghiệm (giữa câu)</div>
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "She ____ three novels so far this year.", options: ["wrote", "has written", "writes", "is writing"], correct: 1 },
      { q: "I ____ this city since I was a child.", options: ["live in", "lived in", "have lived in", "am living in"], correct: 2 },
      { q: "Have you ever ____ sushi?", options: ["eat", "ate", "eaten", "eating"], correct: 2 },
      { q: "The team ____ not ____ the project yet.", options: ["have / finish", "has / finished", "have / finished", "is / finished"], correct: 2 },
      { q: "He ____ just ____ a new car.", options: ["has / buy", "have / bought", "has / bought", "had / bought"], correct: 2 },
    ],
  },
  {
    id: '29',
    category: 'Thì',
    title: '29. Present Perfect Continuous',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 1</span>
          <span>Thì Hiện Tại Hoàn Thành Tiếp Diễn</span>
        </div>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-cyan-700 mb-4 border-b-2 border-cyan-100 pb-2">29.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả hành động <strong>bắt đầu từ quá khứ, tiếp diễn liên tục</strong> đến hiện tại (và có thể tiếp tục). Nhấn mạnh <strong>tính liên tục / quá trình</strong>.</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-cyan-50 p-3 rounded-xl border border-cyan-200 text-center">
              <p className="font-black text-cyan-700">Khẳng định</p>
              <p className="font-mono text-xs mt-2">S + have/has + been + V-ing</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center">
              <p className="font-black text-red-700">Phủ định</p>
              <p className="font-mono text-xs mt-2">S + have/has + not + been + V-ing</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center">
              <p className="font-black text-blue-700">Nghi vấn</p>
              <p className="font-mono text-xs mt-2">Have/Has + S + been + V-ing?</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-cyan-700 mb-4 border-b-2 border-cyan-100 pb-2">29.2. So sánh với Present Perfect</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="p-3 border text-left">Tiêu chí</th>
                  <th className="p-3 border">Present Perfect</th>
                  <th className="p-3 border">Present Perfect Continuous</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2 border font-bold">Nhấn mạnh</td><td className="p-2 border text-center">Kết quả, thành tích</td><td className="p-2 border text-center">Quá trình, tính liên tục</td></tr>
                <tr className="border-b bg-slate-50"><td className="p-2 border font-bold">Ví dụ</td><td className="p-2 border text-center italic">I have read 3 books.</td><td className="p-2 border text-center italic">I have been reading for 2 hours.</td></tr>
                <tr className="border-b"><td className="p-2 border font-bold">Dấu hiệu</td><td className="p-2 border text-center">already, yet, just, ever</td><td className="p-2 border text-center">for, since, all day, how long</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-cyan-700 mb-3 border-b-2 border-cyan-100 pb-2">29.3. Ví dụ thực tế</h3>
          <div className="space-y-2">
            {[
              { en: 'It has been raining for three hours.', vi: 'Trời đã mưa được 3 tiếng rồi.' },
              { en: 'She has been studying English since 2018.', vi: 'Cô ấy học tiếng Anh từ 2018 đến nay.' },
              { en: 'How long have you been waiting?', vi: 'Bạn đã đợi bao lâu rồi?' },
              { en: 'They have been working on this project all week.', vi: 'Họ làm dự án này cả tuần nay.' },
            ].map((ex, i) => (
              <div key={i} className="flex gap-3 items-start bg-cyan-50 p-2 rounded-lg border border-cyan-100">
                <span className="text-cyan-500 font-bold shrink-0">▸</span>
                <div>
                  <p className="font-mono text-cyan-800">{ex.en}</p>
                  <p className="text-slate-500 text-xs">→ {ex.vi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Lưu ý: Động từ KHÔNG dùng tiếp diễn</h4>
          <p className="text-xs mb-2">Các stative verbs (động từ trạng thái) không dùng với thì tiếp diễn:</p>
          <div className="flex flex-wrap gap-2">
            {['know', 'believe', 'want', 'love', 'hate', 'need', 'own', 'seem', 'understand'].map(v => (
              <span key={v} className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-xs font-mono">{v}</span>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "She ____ in this company for five years.", options: ["is working", "worked", "has been working", "works"], correct: 2 },
      { q: "How long ____ you ____ for the bus?", options: ["have / been waiting", "are / waiting", "did / wait", "were / waiting"], correct: 0 },
      { q: "I ____ all morning and I'm exhausted now.", options: ["run", "ran", "have been running", "have run"], correct: 2 },
      { q: "They ____ on this bridge since January.", options: ["are working", "have been working", "worked", "had worked"], correct: 1 },
      { q: "It ____ since early morning.", options: ["rains", "rained", "has been raining", "had rained"], correct: 2 },
    ],
  },
  {
    id: '30',
    category: 'Thì',
    title: '30. Past Perfect (Thì Quá Khứ Hoàn Thành)',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 1</span>
          <span>Thì Quá Khứ Hoàn Thành – Past Perfect</span>
        </div>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-4 border-b-2 border-orange-100 pb-2">30.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả hành động <strong>xảy ra trước một hành động khác trong quá khứ</strong>. Là "quá khứ của quá khứ".</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 text-center">
              <p className="font-black text-orange-700">Khẳng định</p>
              <p className="font-mono text-xs mt-2">S + had + V3/ed</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center">
              <p className="font-black text-red-700">Phủ định</p>
              <p className="font-mono text-xs mt-2">S + had + not + V3/ed</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center">
              <p className="font-black text-blue-700">Nghi vấn</p>
              <p className="font-mono text-xs mt-2">Had + S + V3/ed?</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-4 border-b-2 border-orange-100 pb-2">30.2. Sơ đồ thời gian</h3>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 text-xs justify-center flex-wrap">
              <span className="bg-orange-600 text-white px-2 py-1 rounded">Hành động 1 (Past Perfect)</span>
              <span>→ happened before →</span>
              <span className="bg-amber-500 text-white px-2 py-1 rounded">Hành động 2 (Simple Past)</span>
              <span>→</span>
              <span className="bg-slate-500 text-white px-2 py-1 rounded">Hiện tại (Now)</span>
            </div>
            <p className="text-center text-xs mt-3 italic text-orange-700">When I arrived at the station, the train had already left.</p>
            <p className="text-center text-xs text-slate-500">→ Khi tôi đến ga, tàu đã rời đi rồi.</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-orange-700 mb-3 border-b-2 border-orange-100 pb-2">30.3. Dấu hiệu nhận biết</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-bold text-orange-700">Kết hợp với:</p>
              {['before', 'after', 'when', 'by the time', 'as soon as', 'until'].map(w => (
                <div key={w} className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                  <span className="font-mono text-orange-700 font-bold">{w}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-bold text-orange-700">Ví dụ:</p>
              <div className="space-y-2 text-xs">
                <p className="bg-orange-50 p-2 rounded italic">"She had left <strong>before</strong> he called."</p>
                <p className="bg-orange-50 p-2 rounded italic">"<strong>After</strong> they had eaten, they went home."</p>
                <p className="bg-orange-50 p-2 rounded italic">"<strong>By the time</strong> I woke up, he had gone."</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2">💡 Mẹo Ghi Nhớ</h4>
          <p className="text-sm">Hành động nào <strong>xảy ra trước</strong> → dùng <strong>Past Perfect (had + V3)</strong></p>
          <p className="text-sm mt-1">Hành động nào <strong>xảy ra sau</strong> → dùng <strong>Simple Past (V2/ed)</strong></p>
          <p className="text-xs mt-2 bg-white p-2 rounded border italic">"By the time she arrived, he had already cooked dinner."</p>
        </section>
      </div>
    ),
    questions: [
      { q: "When I got home, my sister ____ dinner.", options: ["cooked", "has cooked", "had cooked", "cooks"], correct: 2 },
      { q: "By the time the police arrived, the thief ____.", options: ["escaped", "has escaped", "had escaped", "escape"], correct: 2 },
      { q: "She ____ the movie before, so she didn't want to watch it again.", options: ["saw", "has seen", "had seen", "sees"], correct: 2 },
      { q: "They ____ never ____ such a beautiful place before.", options: ["have / seen", "had / seen", "did / see", "were / seeing"], correct: 1 },
      { q: "After he ____ the report, he went home.", options: ["finishes", "has finished", "had finished", "finish"], correct: 2 },
    ],
  },
  {
    id: '31',
    category: 'Thì',
    title: '31. Past Perfect Continuous',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 1</span>
          <span>Thì Quá Khứ Hoàn Thành Tiếp Diễn</span>
        </div>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-4 border-b-2 border-rose-100 pb-2">31.1. Định nghĩa & Cấu trúc</h3>
          <p className="mb-4">Diễn tả hành động <strong>tiếp diễn liên tục trong quá khứ trước một thời điểm/hành động khác trong quá khứ</strong>. Nhấn mạnh tính liên tục.</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-center">
              <p className="font-black text-rose-700">Khẳng định</p>
              <p className="font-mono text-xs mt-2">S + had + been + V-ing</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center">
              <p className="font-black text-red-700">Phủ định</p>
              <p className="font-mono text-xs mt-2">S + had + not + been + V-ing</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center">
              <p className="font-black text-blue-700">Nghi vấn</p>
              <p className="font-mono text-xs mt-2">Had + S + been + V-ing?</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-rose-700 mb-3 border-b-2 border-rose-100 pb-2">31.2. Ví dụ & Giải thích</h3>
          <div className="space-y-3">
            {[
              { en: 'She had been crying for an hour before he came home.', vi: 'Cô ấy đã khóc được một tiếng trước khi anh ấy về nhà.', note: 'khóc (liên tục) → anh về (sự kiện sau)' },
              { en: 'They had been waiting for two hours when the flight was cancelled.', vi: 'Họ đã đợi 2 tiếng thì chuyến bay bị hủy.', note: 'đợi (liên tục) → bay bị hủy' },
              { en: 'He was tired because he had been working all day.', vi: 'Anh ấy mệt vì làm việc cả ngày.', note: 'làm cả ngày → giải thích lý do' },
            ].map((ex, i) => (
              <div key={i} className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                <p className="font-mono text-rose-800 text-xs">{ex.en}</p>
                <p className="text-slate-500 text-xs mt-1">→ {ex.vi}</p>
                <p className="text-rose-400 text-xs mt-0.5 italic">({ex.note})</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-3">💡 So sánh 4 thì hoàn thành</h4>
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-amber-600 text-white"><th className="p-2 border">Thì</th><th className="p-2 border">Cấu trúc</th><th className="p-2 border">Đặc điểm</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-2 border">Present Perfect</td><td className="p-2 border font-mono">have/has + V3</td><td className="p-2 border">Kết quả đến hiện tại</td></tr>
              <tr className="border-b bg-white"><td className="p-2 border">Present Perfect Continuous</td><td className="p-2 border font-mono">have/has + been + V-ing</td><td className="p-2 border">Tiếp diễn đến hiện tại</td></tr>
              <tr className="border-b"><td className="p-2 border">Past Perfect</td><td className="p-2 border font-mono">had + V3</td><td className="p-2 border">Trước một sự kiện quá khứ</td></tr>
              <tr className="border-b bg-white"><td className="p-2 border">Past Perfect Continuous</td><td className="p-2 border font-mono">had + been + V-ing</td><td className="p-2 border">Tiếp diễn đến một mốc quá khứ</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    ),
    questions: [
      { q: "He was exhausted because he ____ all night.", options: ["studied", "had been studying", "has been studying", "was studying"], correct: 1 },
      { q: "By the time they arrived, it ____ for hours.", options: ["rained", "has rained", "had been raining", "was raining"], correct: 2 },
      { q: "She ____ for two hours when the doctor finally called her name.", options: ["waited", "was waiting", "had been waiting", "has waited"], correct: 2 },
      { q: "They ____ on the project for a year before they presented it.", options: ["work", "worked", "have worked", "had been working"], correct: 3 },
      { q: "He was out of breath because he ____.", options: ["runs", "ran", "has run", "had been running"], correct: 3 },
    ],
  },
  {
    id: '32',
    category: 'So sánh thì',
    title: '32. Tổng Ôn: Các Thì Hoàn Thành',
    content: (
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-2">
          <span className="bg-amber-200 px-2 py-0.5 rounded">Nhóm 1</span>
          <span>Tổng Ôn – Perfect Tenses</span>
        </div>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">32.1. Bảng Tổng Hợp 4 Thì Hoàn Thành</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-3 border">Thì</th>
                  <th className="p-3 border">Cấu trúc</th>
                  <th className="p-3 border">Dùng khi</th>
                  <th className="p-3 border">Dấu hiệu</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Present Perfect', struct: 'have/has + V3', use: 'KQ từ quá khứ tới nay', signal: 'already, yet, just, ever, for, since' },
                  { name: 'Present Perfect Continuous', struct: 'have/has + been + Ving', use: 'Tiếp diễn đến nay', signal: 'for, since, how long, all day' },
                  { name: 'Past Perfect', struct: 'had + V3', use: 'Trước sự kiện QK khác', signal: 'before, after, by the time, when' },
                  { name: 'Past Perfect Continuous', struct: 'had + been + Ving', use: 'Tiếp diễn đến mốc QK', signal: 'for, since, how long' },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50'}`}>
                    <td className="p-2 border font-bold text-indigo-700">{r.name}</td>
                    <td className="p-2 border font-mono text-xs">{r.struct}</td>
                    <td className="p-2 border">{r.use}</td>
                    <td className="p-2 border text-slate-500 italic">{r.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-100 pb-2">32.2. Chọn Thì Đúng – Thực Hành</h3>
          <div className="space-y-3">
            {[
              { en: 'I ____ (live) here since 2015.', ans: 'have lived', rule: 'FOR/SINCE + đến hiện tại → Present Perfect' },
              { en: 'When she came, we ____ (eat) already.', ans: 'had already eaten', rule: 'Trước hành động QK → Past Perfect' },
              { en: 'She ____ (study) for 3 hours when I called.', ans: 'had been studying', rule: 'Tiếp diễn đến mốc QK → Past Perfect Continuous' },
              { en: 'Look! He ____ (cry). His eyes are red.', ans: 'has been crying', rule: 'Kết quả còn ảnh hưởng + dấu hiệu tiếp diễn → Present Perfect Continuous' },
            ].map((q, i) => (
              <div key={i} className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <p className="font-mono text-indigo-800 text-xs">{q.en}</p>
                <p className="text-emerald-700 font-bold text-xs mt-1">→ {q.ans}</p>
                <p className="text-slate-500 text-xs italic mt-0.5">📌 {q.rule}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-green-50 p-5 rounded-2xl border border-green-200">
          <h4 className="font-bold text-green-800 mb-3">✅ Checklist Chọn Thì Hoàn Thành</h4>
          <div className="space-y-2 text-sm">
            {[
              'Thấy SINCE / FOR + liên quan đến HIỆN TẠI → Present Perfect',
              'Thấy SINCE / FOR + liên quan đến QUÁ KHỨ → Past Perfect',
              'Hành động nào trước → Perfect; hành động sau → Simple Past',
              'Muốn nhấn mạnh KẾT QUẢ → Perfect Simple',
              'Muốn nhấn mạnh TIẾP DIỄN → Perfect Continuous',
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-green-500 font-bold shrink-0">✓</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    questions: [
      { q: "He ____ in New York for the past five years.", options: ["lived", "has lived", "had lived", "lives"], correct: 1 },
      { q: "By 2020, she ____ three languages.", options: ["learned", "has learned", "had learned", "was learning"], correct: 2 },
      { q: "They ____ for three hours when the storm finally stopped.", options: ["drove", "have driven", "were driving", "had been driving"], correct: 3 },
      { q: "I'm tired because I ____ all morning.", options: ["work", "worked", "have been working", "had worked"], correct: 2 },
      { q: "She couldn't enter the building because she ____ her key card.", options: ["lost", "has lost", "had lost", "was losing"], correct: 2 },
    ],
  },
];
