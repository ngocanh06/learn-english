// ─── QUIZ EXPLANATION ENGINE ───
// Provides detailed, pedagogical explanations for grammar quiz questions when answered right or wrong.

export function getQuestionExplanation(q, lesson, selectedOptIdx) {
  // 1. If question already has a handcrafted explanation, return it
  if (q.explain) {
    return q.explain;
  }
  if (q.explanation) {
    return q.explanation;
  }

  const correctOpt = q.options[q.correct];
  const questionText = q.q || '';
  const optList = q.options.map((o) => String(o).toLowerCase());

  // 2. Article questions (A / An / The / X)
  if (optList.includes('a') && optList.includes('the')) {
    if (correctOpt === 'X' || correctOpt === 'none' || correctOpt === 'không') {
      return `Đáp án đúng là "${correctOpt}" (Không dùng mạo từ). Trong câu này, danh từ đứng sau chỗ trống là danh từ không đếm được, bữa ăn (breakfast/lunch/dinner) hoặc danh từ mang tính tổng quát, theo quy tắc Zero Article thì ta không dùng mạo từ.`;
    }
    if (correctOpt.toLowerCase() === 'an') {
      return `Đáp án đúng là "${correctOpt}". Ta dùng "an" trước danh từ số ít đếm được khi từ đứng sau bắt đầu bằng một nguyên âm phát âm (u, e, o, a, i - mẹo "UỂ OẢI") hoặc âm h câm.`;
    }
    if (correctOpt.toLowerCase() === 'a') {
      return `Đáp án đúng là "${correctOpt}". Ta dùng "a" trước danh từ số ít đếm được khi từ đứng sau bắt đầu bằng một phụ âm phát âm.`;
    }
    if (correctOpt.toLowerCase() === 'the') {
      return `Đáp án đúng là "${correctOpt}". Ta dùng "the" khi sự vật đã được xác định cụ thể, cả người nói và người nghe đều biết rõ, hoặc đối tượng là duy nhất (the sun, the moon, the earth), tên sông, dãy núi hoặc so sánh nhất.`;
    }
  }

  // 3. To Be questions (am / is / are / was / were)
  if (optList.includes('am') || optList.includes('is') || optList.includes('are')) {
    if (questionText.toLowerCase().includes('i ')) {
      return `Đáp án đúng là "${correctOpt}". Chủ ngữ "I" ở thì hiện tại đơn luôn đi kèm với động từ To Be là "am".`;
    }
    if (questionText.match(/\b(he|she|it)\b/i)) {
      return `Đáp án đúng là "${correctOpt}". Chủ ngữ ngôi thứ ba số ít (He, She, It hoặc danh từ số ít) đi kèm với động từ To Be là "is" (hoặc "was" ở quá khứ).`;
    }
    if (questionText.match(/\b(they|we|you)\b/i)) {
      return `Đáp án đúng là "${correctOpt}". Chủ ngữ số nhiều (They, We, You hoặc danh từ số nhiều) đi kèm với động từ To Be là "are" (hoặc "were" ở quá khứ).`;
    }
  }

  // 4. Default fallback explanation
  return `Đáp án chính xác là "${correctOpt}". Câu này áp dụng quy tắc trọng tâm của chuyên đề "${lesson?.title || 'ngữ pháp'}". Bạn hãy đối chiếu lại với phần lý thuyết và ví dụ minh họa ở trên để ghi nhớ cấu trúc chuẩn nhé.`;
}
