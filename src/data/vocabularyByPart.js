// TOEIC Vocabulary by Part — 4 levels per part
// Levels: 1=Sơ cấp, 2=Tiền trung cấp, 3=Trung cấp, 4=Cao cấp

export const LEVELS = [
  { id: 1, label: 'Sơ cấp', color: 'emerald', desc: 'Elementary (300–400)' },
  { id: 2, label: 'Tiền TG', color: 'blue', desc: 'Pre-Intermediate (400–550)' },
  { id: 3, label: 'Trung cấp', color: 'violet', desc: 'Intermediate (550–700)' },
  { id: 4, label: 'Cao cấp', color: 'rose', desc: 'Advanced (700–990)' },
];

export const PARTS = [
  { id: 1, label: 'Part 1', desc: 'Photographs', icon: 'fa-image', toeic: 'Listening' },
  { id: 2, label: 'Part 2', desc: 'Question-Response', icon: 'fa-comments', toeic: 'Listening' },
  { id: 3, label: 'Part 3', desc: 'Conversations', icon: 'fa-users', toeic: 'Listening' },
  { id: 4, label: 'Part 4', desc: 'Short Talks', icon: 'fa-bullhorn', toeic: 'Listening' },
  { id: 5, label: 'Part 5', desc: 'Incomplete Sentences', icon: 'fa-pen-to-square', toeic: 'Reading' },
  { id: 6, label: 'Part 6', desc: 'Text Completion', icon: 'fa-file-lines', toeic: 'Reading' },
  { id: 7, label: 'Part 7', desc: 'Reading Comprehension', icon: 'fa-book-open', toeic: 'Reading' },
];

// ─── PART 1: Photographs ───────────────────────────────────────────────────
const part1 = [
  // Level 1 – Sơ cấp
  { level: 1, word: 'sit', pos: 'v', pron: '/sɪt/', meaning: 'ngồi', example: 'A man is sitting at a desk.', exMeaning: 'Một người đàn ông đang ngồi tại bàn làm việc.' },
  { level: 1, word: 'stand', pos: 'v', pron: '/stænd/', meaning: 'đứng', example: 'She is standing near the window.', exMeaning: 'Cô ấy đang đứng gần cửa sổ.' },
  { level: 1, word: 'walk', pos: 'v', pron: '/wɔːk/', meaning: 'đi bộ', example: 'People are walking on the street.', exMeaning: 'Mọi người đang đi bộ trên đường.' },
  { level: 1, word: 'desk', pos: 'n', pron: '/desk/', meaning: 'bàn làm việc', example: 'Papers are on the desk.', exMeaning: 'Giấy tờ đang ở trên bàn.' },
  { level: 1, word: 'chair', pos: 'n', pron: '/tʃer/', meaning: 'ghế', example: 'A chair is next to the table.', exMeaning: 'Một chiếc ghế ở cạnh bàn.' },
  { level: 1, word: 'table', pos: 'n', pron: '/ˈteɪbl/', meaning: 'bàn', example: 'Food is on the table.', exMeaning: 'Thức ăn ở trên bàn.' },
  { level: 1, word: 'window', pos: 'n', pron: '/ˈwɪndoʊ/', meaning: 'cửa sổ', example: 'Light comes through the window.', exMeaning: 'Ánh sáng chiếu qua cửa sổ.' },
  { level: 1, word: 'door', pos: 'n', pron: '/dɔːr/', meaning: 'cửa ra vào', example: 'The door is open.', exMeaning: 'Cánh cửa đang mở.' },
  { level: 1, word: 'car', pos: 'n', pron: '/kɑːr/', meaning: 'xe ô tô', example: 'A car is parked on the street.', exMeaning: 'Một chiếc xe đang đỗ trên đường.' },
  { level: 1, word: 'box', pos: 'n', pron: '/bɑːks/', meaning: 'hộp', example: 'Boxes are stacked on the shelf.', exMeaning: 'Những chiếc hộp được xếp chồng lên kệ.' },
  { level: 1, word: 'shelf', pos: 'n', pron: '/ʃelf/', meaning: 'kệ', example: 'Books are on the shelf.', exMeaning: 'Sách ở trên kệ.' },
  { level: 1, word: 'floor', pos: 'n', pron: '/flɔːr/', meaning: 'sàn nhà', example: 'Luggage is on the floor.', exMeaning: 'Hành lý ở trên sàn.' },
  { level: 1, word: 'wall', pos: 'n', pron: '/wɔːl/', meaning: 'bức tường', example: 'A picture hangs on the wall.', exMeaning: 'Một bức tranh treo trên tường.' },
  { level: 1, word: 'road', pos: 'n', pron: '/roʊd/', meaning: 'con đường', example: 'Vehicles are on the road.', exMeaning: 'Xe cộ đang trên đường.' },
  { level: 1, word: 'tree', pos: 'n', pron: '/triː/', meaning: 'cây', example: 'Trees line the street.', exMeaning: 'Cây xanh xếp dọc con đường.' },
  // Level 2 – Tiền trung cấp
  { level: 2, word: 'examine', pos: 'v', pron: '/ɪɡˈzæmɪn/', meaning: 'kiểm tra, xem xét', example: 'A doctor is examining the patient.', exMeaning: 'Bác sĩ đang khám cho bệnh nhân.' },
  { level: 2, word: 'arrange', pos: 'v', pron: '/əˈreɪndʒ/', meaning: 'sắp xếp', example: 'Flowers are arranged in a vase.', exMeaning: 'Hoa được cắm trong lọ.' },
  { level: 2, word: 'display', pos: 'v/n', pron: '/dɪˈspleɪ/', meaning: 'trưng bày', example: 'Products are on display.', exMeaning: 'Sản phẩm đang được trưng bày.' },
  { level: 2, word: 'outdoor', pos: 'adj', pron: '/ˈaʊtdɔːr/', meaning: 'ngoài trời', example: 'An outdoor market is crowded.', exMeaning: 'Chợ ngoài trời đông đúc.' },
  { level: 2, word: 'uniform', pos: 'n', pron: '/ˈjuːnɪfɔːrm/', meaning: 'đồng phục', example: 'The workers are wearing uniforms.', exMeaning: 'Các công nhân đang mặc đồng phục.' },
  { level: 2, word: 'equipment', pos: 'n', pron: '/ɪˈkwɪpmənt/', meaning: 'thiết bị, dụng cụ', example: 'Construction equipment is at the site.', exMeaning: 'Thiết bị xây dựng đang ở công trường.' },
  { level: 2, word: 'vehicle', pos: 'n', pron: '/ˈviːəkl/', meaning: 'phương tiện giao thông', example: 'Several vehicles are parked.', exMeaning: 'Nhiều phương tiện đang đậu.' },
  { level: 2, word: 'pedestrian', pos: 'n', pron: '/pəˈdestriən/', meaning: 'người đi bộ', example: 'Pedestrians cross the street.', exMeaning: 'Người đi bộ băng qua đường.' },
  { level: 2, word: 'scaffold', pos: 'n', pron: '/ˈskæfəʊld/', meaning: 'giàn giáo', example: 'Workers are on scaffolding.', exMeaning: 'Công nhân đang ở trên giàn giáo.' },
  { level: 2, word: 'merchandise', pos: 'n', pron: '/ˈmɜːrtʃəndaɪz/', meaning: 'hàng hóa', example: 'Merchandise is neatly stacked.', exMeaning: 'Hàng hóa được xếp gọn gàng.' },
  { level: 2, word: 'intersection', pos: 'n', pron: '/ˌɪntərˈsekʃn/', meaning: 'ngã tư, giao lộ', example: 'Cars stop at the intersection.', exMeaning: 'Xe dừng lại ở ngã tư.' },
  { level: 2, word: 'fountain', pos: 'n', pron: '/ˈfaʊntən/', meaning: 'đài phun nước', example: 'There is a fountain in the plaza.', exMeaning: 'Có đài phun nước ở quảng trường.' },
  { level: 2, word: 'staircase', pos: 'n', pron: '/ˈsterkeɪs/', meaning: 'cầu thang', example: 'She is walking up the staircase.', exMeaning: 'Cô ấy đang đi lên cầu thang.' },
  { level: 2, word: 'corridor', pos: 'n', pron: '/ˈkɔːrɪdɔːr/', meaning: 'hành lang', example: 'The corridor is empty.', exMeaning: 'Hành lang trống.' },
  { level: 2, word: 'harbor', pos: 'n', pron: '/ˈhɑːrbər/', meaning: 'bến cảng', example: 'Ships are docked at the harbor.', exMeaning: 'Tàu thuyền neo đậu tại cảng.' },
  // Level 3 – Trung cấp
  { level: 3, word: 'assemble', pos: 'v', pron: '/əˈsembl/', meaning: 'lắp ráp, tập hợp', example: 'Workers are assembling machinery.', exMeaning: 'Công nhân đang lắp ráp máy móc.' },
  { level: 3, word: 'unload', pos: 'v', pron: '/ʌnˈloʊd/', meaning: 'dỡ hàng', example: 'They are unloading boxes from the truck.', exMeaning: 'Họ đang dỡ hộp từ xe tải.' },
  { level: 3, word: 'adjacent', pos: 'adj', pron: '/əˈdʒeɪsnt/', meaning: 'kề bên, tiếp giáp', example: 'The store is adjacent to the bank.', exMeaning: 'Cửa hàng nằm kề ngân hàng.' },
  { level: 3, word: 'vacant', pos: 'adj', pron: '/ˈveɪkənt/', meaning: 'trống, không có người', example: 'The seat is vacant.', exMeaning: 'Chỗ ngồi đang trống.' },
  { level: 3, word: 'elevated', pos: 'adj', pron: '/ˈelɪveɪtɪd/', meaning: 'cao, được nâng lên', example: 'An elevated walkway connects the buildings.', exMeaning: 'Lối đi trên cao nối hai tòa nhà.' },
  { level: 3, word: 'cluttered', pos: 'adj', pron: '/ˈklʌtərd/', meaning: 'lộn xộn, lộn bừa bãi', example: 'The desk is cluttered with papers.', exMeaning: 'Bàn làm việc bừa bộn với giấy tờ.' },
  { level: 3, word: 'pave', pos: 'v', pron: '/peɪv/', meaning: 'lát đường', example: 'Workers are paving the road.', exMeaning: 'Công nhân đang lát đường.' },
  { level: 3, word: 'canopy', pos: 'n', pron: '/ˈkænəpi/', meaning: 'mái che, tán cây', example: 'Diners are seated under a canopy.', exMeaning: 'Thực khách ngồi dưới mái che.' },
  { level: 3, word: 'awning', pos: 'n', pron: '/ˈɔːnɪŋ/', meaning: 'mái hiên', example: 'An awning shades the entrance.', exMeaning: 'Mái hiên che bóng mát cho lối vào.' },
  { level: 3, word: 'cobblestone', pos: 'n', pron: '/ˈkɑːblstoʊn/', meaning: 'đá cuội lát đường', example: 'The cobblestone street is narrow.', exMeaning: 'Con đường lát đá cuội hẹp.' },
  // Level 4 – Cao cấp
  { level: 4, word: 'renovate', pos: 'v', pron: '/ˈrenəveɪt/', meaning: 'cải tạo, tu sửa', example: 'The building is being renovated.', exMeaning: 'Tòa nhà đang được cải tạo.' },
  { level: 4, word: 'demolish', pos: 'v', pron: '/dɪˈmɑːlɪʃ/', meaning: 'phá dỡ, đập bỏ', example: 'Workers are demolishing the old factory.', exMeaning: 'Công nhân đang phá dỡ nhà máy cũ.' },
  { level: 4, word: 'excavate', pos: 'v', pron: '/ˈekskəveɪt/', meaning: 'đào xới', example: 'Machines are excavating the site.', exMeaning: 'Máy móc đang đào xới công trường.' },
  { level: 4, word: 'juxtapose', pos: 'v', pron: '/ˌdʒʌkstəˈpoʊz/', meaning: 'đặt cạnh nhau để so sánh', example: 'Old and new buildings are juxtaposed.', exMeaning: 'Tòa nhà cũ và mới được đặt cạnh nhau.' },
  { level: 4, word: 'silhouetted', pos: 'adj', pron: '/ˌsɪluˈetɪd/', meaning: 'hiện ra như bóng', example: 'A figure is silhouetted against the sunset.', exMeaning: 'Một bóng người hiện ra trước ánh hoàng hôn.' },
];

// ─── PART 2: Question-Response ──────────────────────────────────────────────
const part2 = [
  // Level 1
  { level: 1, word: 'excuse me', pos: 'phrase', pron: '/ɪkˈskjuːz miː/', meaning: 'xin lỗi, làm ơn', example: 'Excuse me, where is the restroom?', exMeaning: 'Làm ơn, nhà vệ sinh ở đâu?' },
  { level: 1, word: 'sure', pos: 'adv', pron: '/ʃʊr/', meaning: 'chắc chắn rồi, được thôi', example: 'Sure, I can help you with that.', exMeaning: 'Được thôi, tôi có thể giúp bạn điều đó.' },
  { level: 1, word: 'later', pos: 'adv', pron: '/ˈleɪtər/', meaning: 'sau này, sau đó', example: "I'll do it later.", exMeaning: 'Tôi sẽ làm điều đó sau.' },
  { level: 1, word: 'nearby', pos: 'adj/adv', pron: '/ˌnɪrˈbaɪ/', meaning: 'gần đây, ở gần', example: 'Is there a café nearby?', exMeaning: 'Có quán cà phê nào gần đây không?' },
  { level: 1, word: 'meeting', pos: 'n', pron: '/ˈmiːtɪŋ/', meaning: 'cuộc họp', example: 'When is the meeting?', exMeaning: 'Cuộc họp khi nào?' },
  { level: 1, word: 'appointment', pos: 'n', pron: '/əˈpɔɪntmənt/', meaning: 'cuộc hẹn', example: 'I have an appointment at 3 PM.', exMeaning: 'Tôi có hẹn lúc 3 giờ chiều.' },
  { level: 1, word: 'busy', pos: 'adj', pron: '/ˈbɪzi/', meaning: 'bận', example: "I'm busy right now.", exMeaning: 'Tôi đang bận.' },
  { level: 1, word: 'available', pos: 'adj', pron: '/əˈveɪləbl/', meaning: 'rảnh, có thể, sẵn có', example: 'Are you available tomorrow?', exMeaning: 'Bạn có rảnh ngày mai không?' },
  { level: 1, word: 'help', pos: 'v/n', pron: '/help/', meaning: 'giúp đỡ', example: 'Can I help you?', exMeaning: 'Tôi có thể giúp bạn không?' },
  { level: 1, word: 'open', pos: 'adj/v', pron: '/ˈoʊpən/', meaning: 'mở cửa, mở', example: 'Is the store open on Sunday?', exMeaning: 'Cửa hàng có mở vào Chủ nhật không?' },
  { level: 1, word: 'closed', pos: 'adj', pron: '/kloʊzd/', meaning: 'đóng cửa', example: 'The office is closed today.', exMeaning: 'Văn phòng hôm nay đóng cửa.' },
  { level: 1, word: 'call', pos: 'v', pron: '/kɔːl/', meaning: 'gọi điện', example: "I'll call you tomorrow.", exMeaning: 'Tôi sẽ gọi cho bạn vào ngày mai.' },
  { level: 1, word: 'take', pos: 'v', pron: '/teɪk/', meaning: 'lấy, cần (thời gian)', example: 'How long will it take?', exMeaning: 'Sẽ mất bao lâu?' },
  // Level 2
  { level: 2, word: 'confirm', pos: 'v', pron: '/kənˈfɜːrm/', meaning: 'xác nhận', example: 'Can you confirm the reservation?', exMeaning: 'Bạn có thể xác nhận đặt chỗ không?' },
  { level: 2, word: 'deadline', pos: 'n', pron: '/ˈdedlaɪn/', meaning: 'hạn chót', example: "What's the deadline for this project?", exMeaning: 'Hạn chót cho dự án này là khi nào?' },
  { level: 2, word: 'reschedule', pos: 'v', pron: '/riːˈskedʒuːl/', meaning: 'đổi lịch, lên lịch lại', example: 'We need to reschedule the meeting.', exMeaning: 'Chúng ta cần đổi lịch họp.' },
  { level: 2, word: 'postpone', pos: 'v', pron: '/poʊstˈpoʊn/', meaning: 'hoãn lại', example: 'The event was postponed due to rain.', exMeaning: 'Sự kiện bị hoãn do mưa.' },
  { level: 2, word: 'contact', pos: 'v/n', pron: '/ˈkɑːntækt/', meaning: 'liên lạc', example: 'Please contact me by email.', exMeaning: 'Vui lòng liên lạc với tôi qua email.' },
  { level: 2, word: 'forward', pos: 'v', pron: '/ˈfɔːrwərd/', meaning: 'chuyển tiếp (email, hồ sơ)', example: "I'll forward the email to you.", exMeaning: 'Tôi sẽ chuyển tiếp email cho bạn.' },
  { level: 2, word: 'submit', pos: 'v', pron: '/səbˈmɪt/', meaning: 'nộp, gửi', example: 'Please submit the report by Friday.', exMeaning: 'Vui lòng nộp báo cáo trước thứ Sáu.' },
  { level: 2, word: 'remind', pos: 'v', pron: '/rɪˈmaɪnd/', meaning: 'nhắc nhở', example: 'Can you remind me about the meeting?', exMeaning: 'Bạn có thể nhắc tôi về cuộc họp không?' },
  { level: 2, word: 'approximately', pos: 'adv', pron: '/əˈprɑːksɪmətli/', meaning: 'khoảng, xấp xỉ', example: 'It takes approximately 30 minutes.', exMeaning: 'Sẽ mất khoảng 30 phút.' },
  { level: 2, word: 'alternatively', pos: 'adv', pron: '/ɔːlˈtɜːrnətɪvli/', meaning: 'hoặc là, thay vào đó', example: 'Alternatively, we can meet online.', exMeaning: 'Hoặc là chúng ta có thể họp trực tuyến.' },
  // Level 3
  { level: 3, word: 'inquire', pos: 'v', pron: '/ɪnˈkwaɪər/', meaning: 'hỏi thăm, yêu cầu thông tin', example: "I'm calling to inquire about the vacancy.", exMeaning: 'Tôi gọi để hỏi về vị trí còn trống.' },
  { level: 3, word: 'concur', pos: 'v', pron: '/kənˈkɜːr/', meaning: 'đồng ý, tán thành', example: 'I concur with your suggestion.', exMeaning: 'Tôi đồng ý với đề xuất của bạn.' },
  { level: 3, word: 'clarify', pos: 'v', pron: '/ˈklærɪfaɪ/', meaning: 'làm rõ, giải thích', example: 'Could you clarify what you mean?', exMeaning: 'Bạn có thể làm rõ ý bạn không?' },
  { level: 3, word: 'elaborate', pos: 'v', pron: '/ɪˈlæbəreɪt/', meaning: 'giải thích chi tiết hơn', example: 'Could you elaborate on that point?', exMeaning: 'Bạn có thể giải thích kỹ hơn điểm đó không?' },
  { level: 3, word: 'tentative', pos: 'adj', pron: '/ˈtentətɪv/', meaning: 'tạm thời, chưa chắc chắn', example: 'The date is tentative.', exMeaning: 'Ngày tháng vẫn còn tạm thời.' },
  // Level 4
  { level: 4, word: 'stipulate', pos: 'v', pron: '/ˈstɪpjuleɪt/', meaning: 'quy định, quy ước', example: 'The contract stipulates a 30-day notice.', exMeaning: 'Hợp đồng quy định thông báo 30 ngày.' },
  { level: 4, word: 'ascertain', pos: 'v', pron: '/ˌæsərˈteɪn/', meaning: 'xác định, tìm hiểu', example: 'Please ascertain the facts before reporting.', exMeaning: 'Vui lòng xác minh sự thật trước khi báo cáo.' },
  { level: 4, word: 'ambiguous', pos: 'adj', pron: '/æmˈbɪɡjuəs/', meaning: 'mơ hồ, không rõ ràng', example: 'The instructions were ambiguous.', exMeaning: 'Hướng dẫn khá mơ hồ.' },
  { level: 4, word: 'expedite', pos: 'v', pron: '/ˈekspɪdaɪt/', meaning: 'đẩy nhanh, xúc tiến', example: 'Can you expedite the approval process?', exMeaning: 'Bạn có thể đẩy nhanh quá trình phê duyệt không?' },
  { level: 4, word: 'corroborate', pos: 'v', pron: '/kəˈrɑːbəreɪt/', meaning: 'xác nhận (bằng bằng chứng)', example: 'The report corroborates our findings.', exMeaning: 'Báo cáo xác nhận những phát hiện của chúng tôi.' },
];

// ─── PART 3: Conversations ──────────────────────────────────────────────────
const part3 = [
  // Level 1
  { level: 1, word: 'order', pos: 'v/n', pron: '/ˈɔːrdər/', meaning: 'gọi món, đặt hàng', example: "I'd like to order a coffee.", exMeaning: 'Tôi muốn gọi một ly cà phê.' },
  { level: 1, word: 'reservation', pos: 'n', pron: '/ˌrezərˈveɪʃn/', meaning: 'đặt chỗ, đặt trước', example: 'I have a reservation under Smith.', exMeaning: 'Tôi có đặt chỗ dưới tên Smith.' },
  { level: 1, word: 'receipt', pos: 'n', pron: '/rɪˈsiːt/', meaning: 'hóa đơn, biên lai', example: 'Can I have the receipt?', exMeaning: 'Tôi có thể lấy hóa đơn không?' },
  { level: 1, word: 'refund', pos: 'n/v', pron: '/ˈriːfʌnd/', meaning: 'hoàn tiền', example: "I'd like a refund for this item.", exMeaning: 'Tôi muốn hoàn tiền cho mặt hàng này.' },
  { level: 1, word: 'discount', pos: 'n', pron: '/ˈdɪskaʊnt/', meaning: 'chiết khấu, giảm giá', example: 'Is there a discount for members?', exMeaning: 'Có giảm giá cho thành viên không?' },
  { level: 1, word: 'deliver', pos: 'v', pron: '/dɪˈlɪvər/', meaning: 'giao hàng', example: 'When will my package be delivered?', exMeaning: 'Bao giờ kiện hàng của tôi được giao?' },
  { level: 1, word: 'repair', pos: 'v/n', pron: '/rɪˈper/', meaning: 'sửa chữa', example: 'My laptop needs to be repaired.', exMeaning: 'Máy tính xách tay của tôi cần được sửa.' },
  { level: 1, word: 'hire', pos: 'v', pron: '/haɪər/', meaning: 'thuê, tuyển dụng', example: 'We are looking to hire new staff.', exMeaning: 'Chúng tôi đang tìm kiếm nhân viên mới.' },
  { level: 1, word: 'apply', pos: 'v', pron: '/əˈplaɪ/', meaning: 'nộp đơn', example: "I'd like to apply for this position.", exMeaning: 'Tôi muốn nộp đơn cho vị trí này.' },
  { level: 1, word: 'interview', pos: 'n/v', pron: '/ˈɪntərvjuː/', meaning: 'phỏng vấn', example: 'The interview is on Wednesday.', exMeaning: 'Buổi phỏng vấn vào thứ Tư.' },
  // Level 2
  { level: 2, word: 'complain', pos: 'v', pron: '/kəmˈpleɪn/', meaning: 'phàn nàn, khiếu nại', example: 'She complained about the noise.', exMeaning: 'Cô ấy phàn nàn về tiếng ồn.' },
  { level: 2, word: 'accommodate', pos: 'v', pron: '/əˈkɑːmədeɪt/', meaning: 'đáp ứng, cung cấp chỗ ở', example: 'We can accommodate your request.', exMeaning: 'Chúng tôi có thể đáp ứng yêu cầu của bạn.' },
  { level: 2, word: 'subscription', pos: 'n', pron: '/səbˈskrɪpʃn/', meaning: 'đăng ký dịch vụ', example: 'I want to cancel my subscription.', exMeaning: 'Tôi muốn hủy đăng ký.' },
  { level: 2, word: 'negotiate', pos: 'v', pron: '/nɪˈɡoʊʃieɪt/', meaning: 'thương lượng', example: 'We need to negotiate the price.', exMeaning: 'Chúng ta cần thương lượng về giá.' },
  { level: 2, word: 'proposal', pos: 'n', pron: '/prəˈpoʊzl/', meaning: 'đề xuất, bản đề nghị', example: 'Have you reviewed the proposal?', exMeaning: 'Bạn đã xem xét đề xuất chưa?' },
  { level: 2, word: 'shipment', pos: 'n', pron: '/ˈʃɪpmənt/', meaning: 'lô hàng, chuyến hàng', example: 'The shipment arrived this morning.', exMeaning: 'Lô hàng đến sáng nay.' },
  { level: 2, word: 'warranty', pos: 'n', pron: '/ˈwɔːrənti/', meaning: 'bảo hành', example: 'Is this product still under warranty?', exMeaning: 'Sản phẩm này còn bảo hành không?' },
  { level: 2, word: 'workload', pos: 'n', pron: '/ˈwɜːrkloʊd/', meaning: 'khối lượng công việc', example: 'My workload has increased recently.', exMeaning: 'Khối lượng công việc của tôi đã tăng gần đây.' },
  // Level 3
  { level: 3, word: 'reimburse', pos: 'v', pron: '/ˌriːɪmˈbɜːrs/', meaning: 'hoàn lại tiền, bồi hoàn', example: 'The company will reimburse your expenses.', exMeaning: 'Công ty sẽ hoàn lại chi phí của bạn.' },
  { level: 3, word: 'collaborate', pos: 'v', pron: '/kəˈlæbəreɪt/', meaning: 'hợp tác, cộng tác', example: 'We will collaborate with the marketing team.', exMeaning: 'Chúng tôi sẽ hợp tác với nhóm marketing.' },
  { level: 3, word: 'merger', pos: 'n', pron: '/ˈmɜːrdʒər/', meaning: 'vụ sáp nhập', example: 'The merger will affect both companies.', exMeaning: 'Việc sáp nhập sẽ ảnh hưởng đến cả hai công ty.' },
  { level: 3, word: 'acquisition', pos: 'n', pron: '/ˌækwɪˈzɪʃn/', meaning: 'vụ mua lại, thâu tóm', example: 'The acquisition was announced last week.', exMeaning: 'Thương vụ mua lại được công bố tuần trước.' },
  { level: 3, word: 'procurement', pos: 'n', pron: '/prəˈkjʊərmənt/', meaning: 'mua sắm, cung ứng', example: 'The procurement team handles all purchases.', exMeaning: 'Đội mua sắm xử lý tất cả giao dịch mua.' },
  // Level 4
  { level: 4, word: 'restructure', pos: 'v', pron: '/riːˈstrʌktʃər/', meaning: 'tái cơ cấu', example: 'The company plans to restructure its operations.', exMeaning: 'Công ty có kế hoạch tái cơ cấu hoạt động.' },
  { level: 4, word: 'liquidate', pos: 'v', pron: '/ˈlɪkwɪdeɪt/', meaning: 'thanh lý', example: 'They had to liquidate their assets.', exMeaning: 'Họ phải thanh lý tài sản.' },
  { level: 4, word: 'arbitrate', pos: 'v', pron: '/ˈɑːrbɪtreɪt/', meaning: 'phân xử, hòa giải', example: 'A third party will arbitrate the dispute.', exMeaning: 'Bên thứ ba sẽ phân xử tranh chấp.' },
  { level: 4, word: 'divulge', pos: 'v', pron: '/daɪˈvʌldʒ/', meaning: 'tiết lộ (thông tin)', example: 'He refused to divulge company secrets.', exMeaning: 'Anh ấy từ chối tiết lộ bí mật công ty.' },
  { level: 4, word: 'indemnify', pos: 'v', pron: '/ɪnˈdemnɪfaɪ/', meaning: 'bồi thường, bồi hoàn', example: 'The clause will indemnify us against losses.', exMeaning: 'Điều khoản sẽ bồi thường cho chúng tôi về tổn thất.' },
];

// ─── PART 4: Short Talks ────────────────────────────────────────────────────
const part4 = [
  // Level 1
  { level: 1, word: 'announcement', pos: 'n', pron: '/əˈnaʊnsmənt/', meaning: 'thông báo', example: 'Please listen to the announcement.', exMeaning: 'Hãy lắng nghe thông báo.' },
  { level: 1, word: 'weather', pos: 'n', pron: '/ˈweðər/', meaning: 'thời tiết', example: "Today's weather forecast calls for rain.", exMeaning: 'Dự báo thời tiết hôm nay có mưa.' },
  { level: 1, word: 'traffic', pos: 'n', pron: '/ˈtræfɪk/', meaning: 'giao thông', example: 'Heavy traffic is expected on Route 9.', exMeaning: 'Dự kiến tắc đường trên Quốc lộ 9.' },
  { level: 1, word: 'departure', pos: 'n', pron: '/dɪˈpɑːrtʃər/', meaning: 'sự khởi hành, lúc cất cánh', example: 'The departure is at Gate 12.', exMeaning: 'Cổng khởi hành là Cổng 12.' },
  { level: 1, word: 'gate', pos: 'n', pron: '/ɡeɪt/', meaning: 'cổng (sân bay)', example: 'Please proceed to Gate 5.', exMeaning: 'Vui lòng tiến đến Cổng 5.' },
  { level: 1, word: 'delayed', pos: 'adj', pron: '/dɪˈleɪd/', meaning: 'bị trễ', example: 'Flight 302 is delayed by one hour.', exMeaning: 'Chuyến bay 302 bị trễ một tiếng.' },
  { level: 1, word: 'boarding', pos: 'n', pron: '/ˈbɔːrdɪŋ/', meaning: 'lên tàu/máy bay', example: 'Boarding will begin in 20 minutes.', exMeaning: 'Việc lên máy bay sẽ bắt đầu trong 20 phút.' },
  { level: 1, word: 'parking', pos: 'n', pron: '/ˈpɑːrkɪŋ/', meaning: 'bãi đỗ xe', example: 'Free parking is available in Lot B.', exMeaning: 'Có bãi đỗ xe miễn phí tại Bãi B.' },
  { level: 1, word: 'discount', pos: 'n', pron: '/ˈdɪskaʊnt/', meaning: 'giảm giá', example: 'Get a 20% discount on all items today.', exMeaning: 'Giảm 20% cho tất cả các mặt hàng hôm nay.' },
  { level: 1, word: 'store', pos: 'n', pron: '/stɔːr/', meaning: 'cửa hàng', example: 'Our store closes at 9 PM.', exMeaning: 'Cửa hàng chúng tôi đóng cửa lúc 9 giờ tối.' },
  // Level 2
  { level: 2, word: 'facility', pos: 'n', pron: '/fəˈsɪləti/', meaning: 'cơ sở vật chất', example: 'Our facility has been renovated.', exMeaning: 'Cơ sở của chúng tôi đã được cải tạo.' },
  { level: 2, word: 'itinerary', pos: 'n', pron: '/aɪˈtɪnəreri/', meaning: 'lịch trình chuyến đi', example: 'Please review the itinerary.', exMeaning: 'Vui lòng xem lại lịch trình.' },
  { level: 2, word: 'orientation', pos: 'n', pron: '/ˌɔːriənˈteɪʃn/', meaning: 'định hướng, buổi hướng dẫn ban đầu', example: 'New employees attend an orientation.', exMeaning: 'Nhân viên mới tham dự buổi định hướng.' },
  { level: 2, word: 'venue', pos: 'n', pron: '/ˈvenjuː/', meaning: 'địa điểm tổ chức', example: 'The conference venue is downtown.', exMeaning: 'Địa điểm hội nghị ở trung tâm thành phố.' },
  { level: 2, word: 'keynote', pos: 'n', pron: '/ˈkiːnoʊt/', meaning: 'bài phát biểu chính', example: 'The keynote speaker is Dr. Lee.', exMeaning: 'Diễn giả chính là Tiến sĩ Lee.' },
  { level: 2, word: 'quarterly', pos: 'adj', pron: '/ˈkwɔːrtərli/', meaning: 'hàng quý', example: 'Our quarterly report is now available.', exMeaning: 'Báo cáo hàng quý của chúng tôi hiện đã có.' },
  { level: 2, word: 'complimentary', pos: 'adj', pron: '/ˌkɑːmplɪˈmentri/', meaning: 'miễn phí, tặng kèm', example: 'Complimentary breakfast is included.', exMeaning: 'Bữa sáng miễn phí được bao gồm.' },
  { level: 2, word: 'audit', pos: 'n/v', pron: '/ˈɔːdɪt/', meaning: 'kiểm toán, thanh tra', example: 'An audit will be conducted next week.', exMeaning: 'Một cuộc kiểm toán sẽ được tiến hành tuần tới.' },
  // Level 3
  { level: 3, word: 'inaugurate', pos: 'v', pron: '/ɪˈnɔːɡjəreɪt/', meaning: 'khai trương, nhậm chức', example: 'The mayor will inaugurate the new bridge.', exMeaning: 'Thị trưởng sẽ khánh thành cây cầu mới.' },
  { level: 3, word: 'consortium', pos: 'n', pron: '/kənˈsɔːrtiəm/', meaning: 'hiệp hội, liên minh', example: 'A consortium of banks funded the project.', exMeaning: 'Một liên minh ngân hàng tài trợ cho dự án.' },
  { level: 3, word: 'subsidize', pos: 'v', pron: '/ˈsʌbsɪdaɪz/', meaning: 'trợ cấp, tài trợ', example: 'The government subsidizes public transport.', exMeaning: 'Chính phủ trợ cấp cho giao thông công cộng.' },
  { level: 3, word: 'infrastructure', pos: 'n', pron: '/ˈɪnfrəstrʌktʃər/', meaning: 'cơ sở hạ tầng', example: 'The city is investing in infrastructure.', exMeaning: 'Thành phố đang đầu tư vào cơ sở hạ tầng.' },
  { level: 3, word: 'feasibility', pos: 'n', pron: '/ˌfiːzəˈbɪləti/', meaning: 'tính khả thi', example: 'A feasibility study was conducted.', exMeaning: 'Một nghiên cứu khả thi đã được thực hiện.' },
  // Level 4
  { level: 4, word: 'regulatory', pos: 'adj', pron: '/ˈreɡjələtɔːri/', meaning: 'thuộc về quy định, pháp lý', example: 'Regulatory approval is required.', exMeaning: 'Cần có sự chấp thuận pháp lý.' },
  { level: 4, word: 'jurisdiction', pos: 'n', pron: '/ˌdʒʊrɪsˈdɪkʃn/', meaning: 'thẩm quyền pháp lý, quyền tài phán', example: 'This matter falls under our jurisdiction.', exMeaning: 'Vấn đề này thuộc thẩm quyền của chúng tôi.' },
  { level: 4, word: 'compliance', pos: 'n', pron: '/kəmˈplaɪəns/', meaning: 'sự tuân thủ (pháp luật, quy định)', example: 'Compliance with the new regulations is mandatory.', exMeaning: 'Tuân thủ các quy định mới là bắt buộc.' },
  { level: 4, word: 'sanction', pos: 'n/v', pron: '/ˈsæŋkʃn/', meaning: 'lệnh trừng phạt; phê chuẩn', example: 'Economic sanctions were imposed.', exMeaning: 'Các biện pháp trừng phạt kinh tế đã được áp đặt.' },
  { level: 4, word: 'ratify', pos: 'v', pron: '/ˈrætɪfaɪ/', meaning: 'phê chuẩn (hiệp ước, hợp đồng)', example: 'The agreement was ratified by both parties.', exMeaning: 'Hiệp định đã được cả hai bên phê chuẩn.' },
];

// ─── PART 5: Incomplete Sentences ──────────────────────────────────────────
const part5 = [
  // Level 1
  { level: 1, word: 'although', pos: 'conj', pron: '/ɔːlˈðoʊ/', meaning: 'mặc dù', example: 'Although it was raining, we went out.', exMeaning: 'Mặc dù trời mưa, chúng tôi vẫn ra ngoài.' },
  { level: 1, word: 'because', pos: 'conj', pron: '/bɪˈkɔːz/', meaning: 'bởi vì', example: 'She left because she was tired.', exMeaning: 'Cô ấy rời đi vì mệt.' },
  { level: 1, word: 'however', pos: 'adv', pron: '/haʊˈevər/', meaning: 'tuy nhiên', example: 'However, the project was delayed.', exMeaning: 'Tuy nhiên, dự án bị trễ.' },
  { level: 1, word: 'therefore', pos: 'adv', pron: '/ˈðerfɔːr/', meaning: 'do đó, vì vậy', example: 'Therefore, we need more time.', exMeaning: 'Do đó, chúng ta cần thêm thời gian.' },
  { level: 1, word: 'instead', pos: 'adv', pron: '/ɪnˈsted/', meaning: 'thay vào đó', example: 'Instead, she took the bus.', exMeaning: 'Thay vào đó, cô ấy đi xe buýt.' },
  { level: 1, word: 'already', pos: 'adv', pron: '/ɔːlˈredi/', meaning: 'đã (rồi)', example: 'The report has already been sent.', exMeaning: 'Báo cáo đã được gửi rồi.' },
  { level: 1, word: 'still', pos: 'adv', pron: '/stɪl/', meaning: 'vẫn còn', example: 'The store is still open.', exMeaning: 'Cửa hàng vẫn còn mở.' },
  { level: 1, word: 'unless', pos: 'conj', pron: '/ənˈles/', meaning: 'trừ khi', example: "Unless you hurry, we'll be late.", exMeaning: 'Trừ khi bạn nhanh lên, chúng ta sẽ trễ.' },
  { level: 1, word: 'whether', pos: 'conj', pron: '/ˈweðər/', meaning: 'liệu... hay không', example: 'I wonder whether he will come.', exMeaning: 'Tôi tự hỏi liệu anh ấy có đến không.' },
  { level: 1, word: 'while', pos: 'conj', pron: '/waɪl/', meaning: 'trong khi, mặc dù', example: 'While I like coffee, she prefers tea.', exMeaning: 'Trong khi tôi thích cà phê, cô ấy thích trà hơn.' },
  // Level 2
  { level: 2, word: 'despite', pos: 'prep', pron: '/dɪˈspaɪt/', meaning: 'mặc dù, bất chấp', example: 'Despite the delay, the event was a success.', exMeaning: 'Mặc dù bị trễ, sự kiện vẫn thành công.' },
  { level: 2, word: 'regarding', pos: 'prep', pron: '/rɪˈɡɑːrdɪŋ/', meaning: 'liên quan đến, về', example: 'Regarding your inquiry, please see below.', exMeaning: 'Liên quan đến yêu cầu của bạn, hãy xem bên dưới.' },
  { level: 2, word: 'prior to', pos: 'prep', pron: '/ˈpraɪər tuː/', meaning: 'trước khi', example: 'Please review the document prior to the meeting.', exMeaning: 'Vui lòng xem xét tài liệu trước cuộc họp.' },
  { level: 2, word: 'subsequent', pos: 'adj', pron: '/ˈsʌbsɪkwənt/', meaning: 'sau đó, tiếp theo', example: 'Subsequent meetings will be held monthly.', exMeaning: 'Các cuộc họp tiếp theo sẽ được tổ chức hàng tháng.' },
  { level: 2, word: 'accordingly', pos: 'adv', pron: '/əˈkɔːrdɪŋli/', meaning: 'theo đó, phù hợp', example: 'Please plan accordingly.', exMeaning: 'Vui lòng lên kế hoạch phù hợp.' },
  { level: 2, word: 'primarily', pos: 'adv', pron: '/ˈpraɪmərəli/', meaning: 'chủ yếu', example: 'The product is primarily for business use.', exMeaning: 'Sản phẩm chủ yếu dành cho mục đích kinh doanh.' },
  { level: 2, word: 'considerably', pos: 'adv', pron: '/kənˈsɪdərəbli/', meaning: 'đáng kể, nhiều', example: 'Costs have increased considerably.', exMeaning: 'Chi phí đã tăng đáng kể.' },
  { level: 2, word: 'currently', pos: 'adv', pron: '/ˈkɜːrəntli/', meaning: 'hiện tại, hiện nay', example: 'We are currently updating our system.', exMeaning: 'Chúng tôi hiện đang cập nhật hệ thống.' },
  // Level 3
  { level: 3, word: 'notwithstanding', pos: 'prep', pron: '/ˌnɑːtwɪθˈstændɪŋ/', meaning: 'mặc dù, bất chấp (văn phong trang trọng)', example: 'Notwithstanding the challenges, we succeeded.', exMeaning: 'Mặc dù có những thách thức, chúng tôi đã thành công.' },
  { level: 3, word: 'whereas', pos: 'conj', pron: '/werˈæz/', meaning: 'trong khi đó (đối lập)', example: 'He prefers email, whereas she likes phone calls.', exMeaning: 'Anh ấy thích email, trong khi đó cô ấy thích gọi điện.' },
  { level: 3, word: 'henceforth', pos: 'adv', pron: '/ˌhensˈfɔːrθ/', meaning: 'từ nay trở đi', example: 'Henceforth, all reports must be submitted digitally.', exMeaning: 'Từ nay, tất cả báo cáo phải nộp bằng kỹ thuật số.' },
  { level: 3, word: 'contingent upon', pos: 'phrase', pron: '/kənˈtɪndʒənt/', meaning: 'phụ thuộc vào, có điều kiện là', example: 'The deal is contingent upon board approval.', exMeaning: 'Thỏa thuận phụ thuộc vào sự chấp thuận của hội đồng.' },
  { level: 3, word: 'inasmuch as', pos: 'conj', pron: '/ɪnˈæzmʌtʃ æz/', meaning: 'bởi vì, vì lẽ rằng (trang trọng)', example: 'Inasmuch as funds are limited, cuts are necessary.', exMeaning: 'Vì ngân sách hạn hẹp, việc cắt giảm là cần thiết.' },
  // Level 4
  { level: 4, word: 'pursuant to', pos: 'prep', pron: '/pərˈsuːənt tuː/', meaning: 'theo, căn cứ vào (luật pháp)', example: 'Pursuant to the agreement, payment is due.', exMeaning: 'Theo thỏa thuận, thanh toán đến hạn.' },
  { level: 4, word: 'therein', pos: 'adv', pron: '/ˌðerˈɪn/', meaning: 'trong đó (trang trọng)', example: 'The conditions are specified therein.', exMeaning: 'Các điều kiện được quy định trong đó.' },
  { level: 4, word: 'aforementioned', pos: 'adj', pron: '/əˌfɔːrˈmenʃənd/', meaning: 'đã đề cập ở trên', example: 'The aforementioned clause is now null.', exMeaning: 'Điều khoản đã đề cập ở trên hiện đã vô hiệu.' },
  { level: 4, word: 'subject to', pos: 'prep phrase', pron: '/ˈsʌbdʒɪkt tuː/', meaning: 'tùy thuộc vào, chịu sự chi phối của', example: 'Prices are subject to change without notice.', exMeaning: 'Giá có thể thay đổi mà không cần báo trước.' },
  { level: 4, word: 'in lieu of', pos: 'prep phrase', pron: '/ɪn ˈluː əv/', meaning: 'thay vì, thay thế cho', example: 'Cash was accepted in lieu of a check.', exMeaning: 'Tiền mặt được chấp nhận thay vì séc.' },
];

// ─── PART 6: Text Completion ────────────────────────────────────────────────
const part6 = [
  // Level 1
  { level: 1, word: 'sincerely', pos: 'adv', pron: '/sɪnˈsɪrli/', meaning: 'chân thành (dùng để kết thúc thư)', example: 'Sincerely, John Smith', exMeaning: 'Trân trọng, John Smith' },
  { level: 1, word: 'attached', pos: 'adj', pron: '/əˈtætʃt/', meaning: 'đính kèm', example: 'Please find the document attached.', exMeaning: 'Vui lòng xem tài liệu đính kèm.' },
  { level: 1, word: 'regarding', pos: 'prep', pron: '/rɪˈɡɑːrdɪŋ/', meaning: 'về việc, liên quan đến', example: 'Regarding your order, we have an update.', exMeaning: 'Về đơn hàng của bạn, chúng tôi có thông tin cập nhật.' },
  { level: 1, word: 'enclosed', pos: 'adj', pron: '/ɪnˈkloʊzd/', meaning: 'kèm theo, đính kèm (trong bì thư)', example: 'Please see the enclosed brochure.', exMeaning: 'Vui lòng xem tập tài liệu đính kèm.' },
  { level: 1, word: 'promptly', pos: 'adv', pron: '/ˈprɑːmptli/', meaning: 'ngay lập tức, đúng giờ', example: 'Please reply promptly.', exMeaning: 'Vui lòng trả lời ngay lập tức.' },
  { level: 1, word: 'schedule', pos: 'n/v', pron: '/ˈskedʒuːl/', meaning: 'lịch trình; lên lịch', example: 'Please schedule a meeting at your convenience.', exMeaning: 'Vui lòng lên lịch họp khi thuận tiện.' },
  { level: 1, word: 'inform', pos: 'v', pron: '/ɪnˈfɔːrm/', meaning: 'thông báo, cho biết', example: 'I am writing to inform you of a change.', exMeaning: 'Tôi viết thư để thông báo về một thay đổi.' },
  { level: 1, word: 'inquire', pos: 'v', pron: '/ɪnˈkwaɪər/', meaning: 'hỏi thăm', example: 'I am writing to inquire about your services.', exMeaning: 'Tôi viết thư để hỏi về dịch vụ của bạn.' },
  { level: 1, word: 'further', pos: 'adj/adv', pron: '/ˈfɜːrðər/', meaning: 'thêm nữa, hơn nữa', example: 'For further information, please contact us.', exMeaning: 'Để biết thêm thông tin, vui lòng liên hệ với chúng tôi.' },
  // Level 2
  { level: 2, word: 'acknowledge', pos: 'v', pron: '/əkˈnɑːlɪdʒ/', meaning: 'xác nhận, thừa nhận', example: 'We acknowledge receipt of your application.', exMeaning: 'Chúng tôi xác nhận đã nhận được đơn xin của bạn.' },
  { level: 2, word: 'herein', pos: 'adv', pron: '/ˌhɪrˈɪn/', meaning: 'trong đây, ở đây', example: 'The terms herein are binding.', exMeaning: 'Các điều khoản tại đây có tính ràng buộc.' },
  { level: 2, word: 'pursuant', pos: 'adj', pron: '/pərˈsuːənt/', meaning: 'theo, tuân theo', example: 'Pursuant to our agreement, we will proceed.', exMeaning: 'Theo thỏa thuận của chúng ta, chúng tôi sẽ tiến hành.' },
  { level: 2, word: 'tentatively', pos: 'adv', pron: '/ˈtentətɪvli/', meaning: 'tạm thời, chưa chắc chắn', example: 'The meeting is tentatively set for Monday.', exMeaning: 'Cuộc họp tạm thời được đặt vào thứ Hai.' },
  { level: 2, word: 'initiate', pos: 'v', pron: '/ɪˈnɪʃieɪt/', meaning: 'khởi xướng, bắt đầu', example: 'We will initiate the process immediately.', exMeaning: 'Chúng tôi sẽ bắt đầu quá trình ngay lập tức.' },
  { level: 2, word: 'finalize', pos: 'v', pron: '/ˈfaɪnəlaɪz/', meaning: 'hoàn tất, kết thúc', example: 'We need to finalize the contract.', exMeaning: 'Chúng ta cần hoàn tất hợp đồng.' },
  { level: 2, word: 'implementation', pos: 'n', pron: '/ˌɪmplɪmenˈteɪʃn/', meaning: 'sự thực hiện, triển khai', example: 'The implementation will begin next month.', exMeaning: 'Việc triển khai sẽ bắt đầu vào tháng tới.' },
  { level: 2, word: 'comprehensive', pos: 'adj', pron: '/ˌkɑːmprɪˈhensɪv/', meaning: 'toàn diện, đầy đủ', example: 'A comprehensive review is needed.', exMeaning: 'Cần có một đánh giá toàn diện.' },
  // Level 3
  { level: 3, word: 'disseminate', pos: 'v', pron: '/dɪˈsemɪneɪt/', meaning: 'phổ biến, truyền bá', example: 'We will disseminate the information widely.', exMeaning: 'Chúng tôi sẽ phổ biến thông tin rộng rãi.' },
  { level: 3, word: 'supersede', pos: 'v', pron: '/ˌsuːpərˈsiːd/', meaning: 'thay thế, thay thế cho', example: 'This policy supersedes the previous one.', exMeaning: 'Chính sách này thay thế cho chính sách trước.' },
  { level: 3, word: 'mitigate', pos: 'v', pron: '/ˈmɪtɪɡeɪt/', meaning: 'giảm nhẹ, giảm thiểu', example: 'Steps were taken to mitigate the risk.', exMeaning: 'Các bước đã được thực hiện để giảm thiểu rủi ro.' },
  { level: 3, word: 'construe', pos: 'v', pron: '/kənˈstruː/', meaning: 'hiểu, giải thích (theo một nghĩa nào đó)', example: 'This should not be construed as an admission.', exMeaning: 'Điều này không được hiểu là sự thừa nhận.' },
  // Level 4
  { level: 4, word: 'commensurate', pos: 'adj', pron: '/kəˈmenʃərət/', meaning: 'tương xứng, phù hợp (về mức độ)', example: 'Salary is commensurate with experience.', exMeaning: 'Lương tương xứng với kinh nghiệm.' },
  { level: 4, word: 'perfunctory', pos: 'adj', pron: '/pərˈfʌŋktəri/', meaning: 'hời hợt, qua loa', example: 'The review was perfunctory at best.', exMeaning: 'Cuộc xem xét hời hợt hết mức.' },
  { level: 4, word: 'unilateral', pos: 'adj', pron: '/ˌjuːnɪˈlætərəl/', meaning: 'đơn phương', example: 'The decision was made unilaterally.', exMeaning: 'Quyết định được đưa ra một cách đơn phương.' },
  { level: 4, word: 'reciprocal', pos: 'adj', pron: '/rɪˈsɪprəkl/', meaning: 'có đi có lại, tương hỗ', example: 'The agreement is reciprocal.', exMeaning: 'Thỏa thuận mang tính tương hỗ.' },
  { level: 4, word: 'irrevocable', pos: 'adj', pron: '/ɪˈrevəkəbl/', meaning: 'không thể hủy bỏ', example: 'This is an irrevocable commitment.', exMeaning: 'Đây là một cam kết không thể hủy bỏ.' },
];

// ─── PART 7: Reading Comprehension ─────────────────────────────────────────
const part7 = [
  // Level 1
  { level: 1, word: 'advertisement', pos: 'n', pron: '/ˌædvərˈtaɪzmənt/', meaning: 'quảng cáo', example: 'I saw the advertisement in the newspaper.', exMeaning: 'Tôi thấy quảng cáo trên báo.' },
  { level: 1, word: 'article', pos: 'n', pron: '/ˈɑːrtɪkl/', meaning: 'bài báo, mặt hàng', example: 'The article discusses new trends.', exMeaning: 'Bài báo thảo luận về xu hướng mới.' },
  { level: 1, word: 'brochure', pos: 'n', pron: '/broʊˈʃʊr/', meaning: 'tập tài liệu, tờ rơi', example: 'Please read the product brochure.', exMeaning: 'Vui lòng đọc tập tài liệu sản phẩm.' },
  { level: 1, word: 'notice', pos: 'n', pron: '/ˈnoʊtɪs/', meaning: 'thông báo', example: 'A notice was posted on the bulletin board.', exMeaning: 'Một thông báo được dán trên bảng thông tin.' },
  { level: 1, word: 'memo', pos: 'n', pron: '/ˈmemoʊ/', meaning: 'bản ghi nhớ, công văn nội bộ', example: 'The manager sent a memo to all staff.', exMeaning: 'Quản lý gửi bản ghi nhớ cho tất cả nhân viên.' },
  { level: 1, word: 'newsletter', pos: 'n', pron: '/ˈnjuːzletər/', meaning: 'bản tin', example: 'Subscribe to our monthly newsletter.', exMeaning: 'Đăng ký bản tin hàng tháng của chúng tôi.' },
  { level: 1, word: 'survey', pos: 'n', pron: '/ˈsɜːrveɪ/', meaning: 'khảo sát', example: 'Please complete the customer survey.', exMeaning: 'Vui lòng hoàn thành khảo sát khách hàng.' },
  { level: 1, word: 'review', pos: 'n/v', pron: '/rɪˈvjuː/', meaning: 'đánh giá, xem xét', example: 'The product has excellent reviews.', exMeaning: 'Sản phẩm nhận được đánh giá xuất sắc.' },
  { level: 1, word: 'policy', pos: 'n', pron: '/ˈpɑːləsi/', meaning: 'chính sách', example: 'Please read our return policy carefully.', exMeaning: 'Vui lòng đọc kỹ chính sách hoàn trả của chúng tôi.' },
  { level: 1, word: 'guarantee', pos: 'n/v', pron: '/ˌɡærənˈtiː/', meaning: 'bảo đảm, cam kết', example: 'We guarantee delivery within 3 days.', exMeaning: 'Chúng tôi đảm bảo giao hàng trong vòng 3 ngày.' },
  // Level 2
  { level: 2, word: 'correspondence', pos: 'n', pron: '/ˌkɔːrəˈspɑːndəns/', meaning: 'thư từ, trao đổi thư tín', example: 'All correspondence should go through HR.', exMeaning: 'Tất cả thư từ phải qua bộ phận nhân sự.' },
  { level: 2, word: 'excerpt', pos: 'n', pron: '/ˈeksɜːrpt/', meaning: 'đoạn trích', example: 'The following is an excerpt from the report.', exMeaning: 'Sau đây là đoạn trích từ báo cáo.' },
  { level: 2, word: 'inference', pos: 'n', pron: '/ˈɪnfərəns/', meaning: 'suy luận, kết luận', example: 'You can make an inference from the data.', exMeaning: 'Bạn có thể đưa ra suy luận từ dữ liệu.' },
  { level: 2, word: 'implication', pos: 'n', pron: '/ˌɪmplɪˈkeɪʃn/', meaning: 'hàm ý, ý nghĩa (tiềm ẩn)', example: 'What are the implications of this decision?', exMeaning: 'Những hàm ý của quyết định này là gì?' },
  { level: 2, word: 'mandatory', pos: 'adj', pron: '/ˈmændətɔːri/', meaning: 'bắt buộc', example: 'Attendance at the meeting is mandatory.', exMeaning: 'Việc tham dự cuộc họp là bắt buộc.' },
  { level: 2, word: 'criteria', pos: 'n', pron: '/kraɪˈtɪriə/', meaning: 'tiêu chí (số nhiều của criterion)', example: 'What are the criteria for selection?', exMeaning: 'Tiêu chí lựa chọn là gì?' },
  { level: 2, word: 'revenue', pos: 'n', pron: '/ˈrevənjuː/', meaning: 'doanh thu', example: 'Revenue has increased by 15% this year.', exMeaning: 'Doanh thu đã tăng 15% trong năm nay.' },
  { level: 2, word: 'expenditure', pos: 'n', pron: '/ɪkˈspenɪtʃər/', meaning: 'chi tiêu, chi phí', example: 'Monthly expenditure must be tracked.', exMeaning: 'Chi tiêu hàng tháng phải được theo dõi.' },
  { level: 2, word: 'demographic', pos: 'n/adj', pron: '/ˌdeməˈɡræfɪk/', meaning: 'nhân khẩu học', example: 'We need to target a younger demographic.', exMeaning: 'Chúng ta cần nhắm mục tiêu đến nhóm dân số trẻ hơn.' },
  // Level 3
  { level: 3, word: 'proliferate', pos: 'v', pron: '/prəˈlɪfəreɪt/', meaning: 'phát triển nhanh chóng, lan rộng', example: 'Online services have proliferated rapidly.', exMeaning: 'Các dịch vụ trực tuyến đã phát triển nhanh chóng.' },
  { level: 3, word: 'paradigm', pos: 'n', pron: '/ˈpærədaɪm/', meaning: 'mô hình, hệ tư duy', example: 'This represents a paradigm shift.', exMeaning: 'Điều này đại diện cho một sự thay đổi mô hình.' },
  { level: 3, word: 'stakeholder', pos: 'n', pron: '/ˈsteɪkhoʊldər/', meaning: 'bên liên quan, cổ đông', example: 'All stakeholders were informed.', exMeaning: 'Tất cả các bên liên quan đã được thông báo.' },
  { level: 3, word: 'benchmark', pos: 'n', pron: '/ˈbentʃmɑːrk/', meaning: 'tiêu chuẩn tham chiếu, điểm chuẩn', example: 'Set a benchmark for performance.', exMeaning: 'Thiết lập điểm chuẩn cho hiệu suất.' },
  { level: 3, word: 'synergy', pos: 'n', pron: '/ˈsɪnərdʒi/', meaning: 'sự hiệp lực, sức mạnh tổng hợp', example: 'The merger created positive synergies.', exMeaning: 'Việc sáp nhập tạo ra sức mạnh tổng hợp tích cực.' },
  // Level 4
  { level: 4, word: 'unequivocal', pos: 'adj', pron: '/ˌʌnɪˈkwɪvəkl/', meaning: 'rõ ràng, không mơ hồ', example: 'The findings are unequivocal.', exMeaning: 'Các kết quả rõ ràng, không mơ hồ.' },
  { level: 4, word: 'extrapolate', pos: 'v', pron: '/ɪkˈstræpəleɪt/', meaning: 'suy diễn, ngoại suy', example: 'We can extrapolate future trends.', exMeaning: 'Chúng ta có thể suy diễn xu hướng trong tương lai.' },
  { level: 4, word: 'corroborate', pos: 'v', pron: '/kəˈrɑːbəreɪt/', meaning: 'xác nhận bằng bằng chứng', example: 'New data corroborates earlier findings.', exMeaning: 'Dữ liệu mới xác nhận các phát hiện trước đó.' },
  { level: 4, word: 'substantiate', pos: 'v', pron: '/səbˈstænʃieɪt/', meaning: 'chứng minh, xác nhận (bằng bằng chứng)', example: 'Please substantiate your claims.', exMeaning: 'Vui lòng chứng minh các tuyên bố của bạn.' },
  { level: 4, word: 'equivocate', pos: 'v', pron: '/ɪˈkwɪvəkeɪt/', meaning: 'nói mập mờ, nói nước đôi', example: "Don't equivocate — give a clear answer.", exMeaning: 'Đừng nói nước đôi — hãy trả lời rõ ràng.' },
];

export const VOCAB_BY_PART = {
  1: part1,
  2: part2,
  3: part3,
  4: part4,
  5: part5,
  6: part6,
  7: part7,
};
