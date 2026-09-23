// TOEIC Vocabulary by Level & Part
// Hierarchy: Level (Sơ cấp [20 parts], Tiền trung cấp [10 parts], Trung cấp [10 parts], Cao cấp [10 parts]) -> Parts -> Vocab Cards

export const LEVEL_DEFINITIONS = [
  { id: 'so-cap', label: 'Sơ cấp', name: 'Sơ cấp (300 - 450)', sub: 'Target 300–450', scoreTarget: 'Target 300–450', desc: 'Nền tảng từ vựng cơ bản TOEIC Part 1 - 7', totalParts: 20, badgeClass: 'bg-emerald-900/60 text-emerald-300 border-emerald-600', icon: 'fa-seedling', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
  { id: 'tien-trung-cap', label: 'Tiền trung cấp', name: 'Tiền trung cấp (450 - 600)', sub: 'Target 450–600', scoreTarget: 'Target 450–600', desc: 'Từ vựng văn phòng & công việc hàng ngày', totalParts: 10, badgeClass: 'bg-blue-900/60 text-blue-300 border-blue-600', icon: 'fa-book-open', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80' },
  { id: 'trung-cap', label: 'Trung cấp', name: 'Trung cấp (600 - 750)', sub: 'Target 600–750', scoreTarget: 'Target 600–750', desc: 'Từ vựng thương mại & hợp đồng kinh doanh', totalParts: 10, badgeClass: 'bg-violet-900/60 text-violet-300 border-violet-600', icon: 'fa-chart-line', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80' },
  { id: 'cao-cap', label: 'Cao cấp', name: 'Cao cấp (750 - 990)', sub: 'Target 750–990', scoreTarget: 'Target 750–990', desc: 'Từ vựng học thuật & quản trị chiến lược', totalParts: 10, badgeClass: 'bg-rose-900/60 text-rose-300 border-rose-600', icon: 'fa-trophy', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80' },
  { id: 'ielts-trung-cap', label: 'IELTS Trung Cấp', name: 'IELTS Trung Cấp (Band 5.5 - 7.0+)', sub: 'Target 5.5–7.0+', scoreTarget: 'Target 5.5–7.0+', desc: 'Từ vựng học thuật & chủ đề IELTS từ Google Sheet', totalParts: 10, badgeClass: 'bg-amber-900/60 text-amber-300 border-amber-600', icon: 'fa-earth-americas', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80' },
];

// Helper to generate full parts list for each level
export const VOCAB_DATABASE = {
  'so-cap': Array.from({ length: 20 }, (_, i) => {
    const partNum = i + 1;
    return {
      part: partNum,
      title: `Part ${partNum}: Sơ cấp ${partNum}`,
      desc: `Từ vựng chủ đề Sơ cấp phần ${partNum}`,
      words: [
        { word: 'sit', pos: 'v', pron: '/sɪt/', meaning: 'ngồi', example: 'A man is sitting at a desk.', exMeaning: 'Một người đàn ông đang ngồi tại bàn làm việc.' },
        { word: 'stand', pos: 'v', pron: '/stænd/', meaning: 'đứng', example: 'She is standing near the window.', exMeaning: 'Cô ấy đang đứng gần cửa sổ.' },
        { word: 'walk', pos: 'v', pron: '/wɔːk/', meaning: 'đi bộ', example: 'People are walking on the street.', exMeaning: 'Mọi người đang đi bộ trên đường.' },
        { word: 'desk', pos: 'n', pron: '/desk/', meaning: 'bàn làm việc', example: 'Papers are on the desk.', exMeaning: 'Giấy tờ đang ở trên bàn.' },
        { word: 'chair', pos: 'n', pron: '/tʃer/', meaning: 'ghế', example: 'A chair is next to the table.', exMeaning: 'Một chiếc ghế ở cạnh bàn.' },
        { word: 'table', pos: 'n', pron: '/ˈteɪbl/', meaning: 'bàn', example: 'Food is on the table.', exMeaning: 'Thức ăn ở trên bàn.' },
        { word: 'window', pos: 'n', pron: '/ˈwɪndoʊ/', meaning: 'cửa sổ', example: 'Light comes through the window.', exMeaning: 'Ánh sáng chiếu qua cửa sổ.' },
        { word: 'door', pos: 'n', pron: '/dɔːr/', meaning: 'cửa ra vào', example: 'The door is open.', exMeaning: 'Cánh cửa đang mở.' },
        { word: 'car', pos: 'n', pron: '/kɑːr/', meaning: 'xe ô tô', example: 'A car is parked on the street.', exMeaning: 'Một chiếc xe đang đỗ trên đường.' },
        { word: 'box', pos: 'n', pron: '/bɑːks/', meaning: 'hộp', example: 'Boxes are stacked on the shelf.', exMeaning: 'Những chiếc hộp được xếp chồng lên kệ.' },
      ]
    };
  }),

  'tien-trung-cap': Array.from({ length: 10 }, (_, i) => {
    const partNum = i + 1;
    return {
      part: partNum,
      title: `Part ${partNum}: Tiền trung cấp ${partNum}`,
      desc: `Từ vựng chủ đề Tiền trung cấp phần ${partNum}`,
      words: [
        { word: 'confirm', pos: 'v', pron: '/kənˈfɜːrm/', meaning: 'xác nhận', example: 'Can you confirm the reservation?', exMeaning: 'Bạn có thể xác nhận đặt chỗ không?' },
        { word: 'deadline', pos: 'n', pron: '/ˈdedlaɪn/', meaning: 'hạn chót', example: "What's the deadline for this project?", exMeaning: 'Hạn chót cho dự án này là khi nào?' },
        { word: 'reschedule', pos: 'v', pron: '/riːˈskedʒuːl/', meaning: 'đổi lịch', example: 'We need to reschedule the meeting.', exMeaning: 'Chúng ta cần đổi lịch họp.' },
        { word: 'postpone', pos: 'v', pron: '/poʊstˈpoʊn/', meaning: 'hoãn lại', example: 'The event was postponed due to rain.', exMeaning: 'Sự kiện bị hoãn do mưa.' },
        { word: 'contact', pos: 'v/n', pron: '/ˈkɑːntækt/', meaning: 'liên lạc', example: 'Please contact me by email.', exMeaning: 'Vui lòng liên lạc với tôi qua email.' },
        { word: 'forward', pos: 'v', pron: '/ˈfɔːrwərd/', meaning: 'chuyển tiếp', example: "I'll forward the email to you.", exMeaning: 'Tôi sẽ chuyển tiếp email cho bạn.' },
        { word: 'submit', pos: 'v', pron: '/səbˈmɪt/', meaning: 'nộp, gửi', example: 'Please submit the report by Friday.', exMeaning: 'Vui lòng nộp báo cáo trước thứ Sáu.' },
        { word: 'remind', pos: 'v', pron: '/rɪˈmaɪnd/', meaning: 'nhắc nhở', example: 'Can you remind me about the meeting?', exMeaning: 'Bạn có thể nhắc tôi về cuộc họp không?' },
        { word: 'approximately', pos: 'adv', pron: '/əˈprɑːksɪmətli/', meaning: 'khoảng, xấp xỉ', example: 'It takes approximately 30 minutes.', exMeaning: 'Sẽ mất khoảng 30 phút.' },
        { word: 'alternatively', pos: 'adv', pron: '/ɔːlˈtɜːrnətɪvli/', meaning: 'hoặc là', example: 'Alternatively, we can meet online.', exMeaning: 'Hoặc là chúng ta có thể họp trực tuyến.' },
      ]
    };
  }),

  'trung-cap': Array.from({ length: 10 }, (_, i) => {
    const partNum = i + 1;
    return {
      part: partNum,
      title: `Part ${partNum}: Trung cấp ${partNum}`,
      desc: `Từ vựng chủ đề Trung cấp phần ${partNum}`,
      words: [
        { word: 'inquire', pos: 'v', pron: '/ɪnˈkwaɪər/', meaning: 'hỏi thăm, yêu cầu thông tin', example: "I'm calling to inquire about the vacancy.", exMeaning: 'Tôi gọi để hỏi về vị trí còn trống.' },
        { word: 'concur', pos: 'v', pron: '/kənˈkɜːr/', meaning: 'đồng ý, tán thành', example: 'I concur with your suggestion.', exMeaning: 'Tôi đồng ý với đề xuất của bạn.' },
        { word: 'clarify', pos: 'v', pron: '/ˈklærɪfaɪ/', meaning: 'làm rõ, giải thích', example: 'Could you clarify what you mean?', exMeaning: 'Bạn có thể làm rõ ý bạn không?' },
        { word: 'elaborate', pos: 'v', pron: '/ɪˈlæbəreɪt/', meaning: 'giải thích chi tiết hơn', example: 'Could you elaborate on that point?', exMeaning: 'Bạn có thể giải thích kỹ hơn điểm đó không?' },
        { word: 'tentative', pos: 'adj', pron: '/ˈtentətɪv/', meaning: 'tạm thời, chưa chắc chắn', example: 'The date is tentative.', exMeaning: 'Ngày tháng vẫn còn tạm thời.' },
        { word: 'collaborate', pos: 'v', pron: '/kəˈlæbəreɪt/', meaning: 'hợp tác, cộng tác', example: 'We will collaborate with the team.', exMeaning: 'Chúng tôi sẽ hợp tác với nhóm.' },
        { level: 3, word: 'reimburse', pos: 'v', pron: '/ˌriːɪmˈbɜːrs/', meaning: 'hoàn lại tiền', example: 'The company will reimburse expenses.', exMeaning: 'Công ty sẽ hoàn lại chi phí.' },
        { word: 'procurement', pos: 'n', pron: '/prəˈkjʊərmənt/', meaning: 'mua sắm, cung ứng', example: 'The procurement team handles purchases.', exMeaning: 'Đội mua sắm xử lý các giao dịch.' },
        { word: 'merger', pos: 'n', pron: '/ˈmɜːrdʒər/', meaning: 'vụ sáp nhập', example: 'The merger will affect both companies.', exMeaning: 'Việc sáp nhập sẽ ảnh hưởng cả hai bên.' },
        { word: 'acquisition', pos: 'n', pron: '/ˌækwɪˈzɪʃn/', meaning: 'vụ mua lại', example: 'The acquisition was announced today.', exMeaning: 'Thương vụ mua lại được công bố hôm nay.' },
      ]
    };
  }),

  'cao-cap': Array.from({ length: 10 }, (_, i) => {
    const partNum = i + 1;
    return {
      part: partNum,
      title: `Part ${partNum}: Cao cấp ${partNum}`,
      desc: `Từ vựng chủ đề Cao cấp phần ${partNum}`,
      words: [
        { word: 'stipulate', pos: 'v', pron: '/ˈstɪpjuleɪt/', meaning: 'quy định, quy ước', example: 'The contract stipulates a 30-day notice.', exMeaning: 'Hợp đồng quy định thông báo 30 ngày.' },
        { word: 'ascertain', pos: 'v', pron: '/ˌæsərˈteɪn/', meaning: 'xác định, tìm hiểu', example: 'Please ascertain the facts first.', exMeaning: 'Vui lòng xác minh sự thật trước.' },
        { word: 'ambiguous', pos: 'adj', pron: '/æmˈbɪɡjuəs/', meaning: 'mơ hồ, không rõ ràng', example: 'The instructions were ambiguous.', exMeaning: 'Hướng dẫn khá mơ hồ.' },
        { word: 'expedite', pos: 'v', pron: '/ˈekspɪdaɪt/', meaning: 'đẩy nhanh, xúc tiến', example: 'Can you expedite the approval process?', exMeaning: 'Bạn có thể đẩy nhanh phê duyệt không?' },
        { word: 'corroborate', pos: 'v', pron: '/kəˈrɑːbəreɪt/', meaning: 'xác nhận (bằng bằng chứng)', example: 'The report corroborates our findings.', exMeaning: 'Báo cáo xác nhận những phát hiện.' },
        { word: 'jurisdiction', pos: 'n', pron: '/ˌdʒʊrɪsˈdɪkʃn/', meaning: 'thẩm quyền pháp lý', example: 'This matter falls under our jurisdiction.', exMeaning: 'Vấn đề này thuộc thẩm quyền của chúng tôi.' },
        { word: 'compliance', pos: 'n', pron: '/kəmˈplaɪəns/', meaning: 'sự tuân thủ', example: 'Compliance with regulations is mandatory.', exMeaning: 'Tuân thủ các quy định là bắt buộc.' },
        { word: 'commensurate', pos: 'adj', pron: '/kəˈmenʃərət/', meaning: 'tương xứng', example: 'Salary is commensurate with experience.', exMeaning: 'Lương tương xứng với kinh nghiệm.' },
        { word: 'irrevocable', pos: 'adj', pron: '/ɪˈrevəkəbl/', meaning: 'không thể hủy bỏ', example: 'This is an irrevocable commitment.', exMeaning: 'Đây là một cam kết không thể hủy bỏ.' },
        { word: 'equivocate', pos: 'v', pron: '/ɪˈkwɪvəkeɪt/', meaning: 'nói nước đôi', example: "Don't equivocate — give a clear answer.", exMeaning: 'Đừng nói nước đôi — hãy trả lời rõ ràng.' },
      ]
    };
  }),

  'ielts-trung-cap': Array.from({ length: 10 }, (_, i) => {
    const partNum = i + 1;
    return {
      part: partNum,
      title: `Part ${partNum}: IELTS Trung Cấp ${partNum}`,
      desc: `Từ vựng học thuật IELTS phần ${partNum}`,
      words: [
        { word: 'compatible', pos: 'adj', pron: '/kəmˈpætəbəl/', meaning: 'tương thích, tương hợp', example: 'The system is compatible with all devices.', exMeaning: 'Hệ thống tương thích với mọi thiết bị.' },
        { word: 'compensate', pos: 'v', pron: '/ˈkɒmpenseɪt/', meaning: 'đền bù, bồi thường', example: 'They will compensate workers for their loss.', exMeaning: 'Họ sẽ bồi thường cho công nhân vì tổn thất.' },
        { word: 'compile', pos: 'v', pron: '/kəmˈpaɪl/', meaning: 'tổng hợp, biên soạn', example: 'We need to compile the data into a report.', exMeaning: 'Chúng ta cần tổng hợp dữ liệu thành báo cáo.' },
        { word: 'comprehensive', pos: 'adj', pron: '/ˌkɒmprɪˈhensɪv/', meaning: 'toàn diện', example: 'She conducted a comprehensive study.', exMeaning: 'Cô ấy đã thực hiện một nghiên cứu toàn diện.' },
        { word: 'concept', pos: 'n', pron: '/ˈkɒnsept/', meaning: 'khái niệm', example: 'It is difficult to grasp this concept.', exMeaning: 'Thật khó để nắm bắt khái niệm này.' },
      ]
    };
  }),
};
