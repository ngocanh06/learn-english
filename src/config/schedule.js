// Schedule configuration & parser for Google Sheet
export const SCHEDULE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTJUIQz_Qdy--KtaFo3Rg4Oy6S1k9x0MIskAFUm8zl1F927KE4CdJWnVcQEHbuyPl3wYV-PG1WPWENl/pub?gid=0&single=true&output=csv';

// Full embedded initial schedule data extracted from the user's Google Sheet
export const DEFAULT_SCHEDULE_DATA = [
  { id: 'sch_1', date: '01/06/2026', dow: 'Thứ 2', vocab: 'Sơ Cấp', grammar: '1. Articles (A, An, The)', shortStories: "1. First snowfall", dailyDictConv: '1. At home (1)', dailyDictToeic: 'Conversation 1', ielts: 'Cam19 - Test 1 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 1: 소개 Giới thiệu', koreanGrammar: 'Bài 1: 소개 Giới thiệu', note: 'Complete', status: 'Complete' },
  { id: 'sch_2', date: '02/06/2026', dow: 'Thứ 3', vocab: 'Part 1', grammar: '', shortStories: "2. Jessica's first day", dailyDictConv: '2. At home (2)', dailyDictToeic: 'Conversation 2', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 2: 학교 Trường Học', koreanGrammar: 'Bài 2: 학교 Trường Học', note: 'Complete', status: 'Complete' },
  { id: 'sch_3', date: '03/06/2026', dow: 'Thứ 4', vocab: '', grammar: '2. Am, is, are', shortStories: '3. My flower garden', dailyDictConv: '3. My Favorite Photographs (1)', dailyDictToeic: 'Conversation 3', ielts: 'Cam19 - Test 1 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 3: Sinh hoạt hằng ngày', koreanGrammar: 'Bài 3: Sinh hoạt hằng ngày', note: 'Complete', status: 'Complete' },
  { id: 'sch_4', date: '04/06/2026', dow: 'Thứ 5', vocab: 'Part 2', grammar: '', shortStories: '4. Going camping', dailyDictConv: '4. Location (1)', dailyDictToeic: 'Conversation 4', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 4: 날짜와 요일 Ngày và thứ', koreanGrammar: 'Bài 4: 날짜와 요일 Ngày và thứ', note: 'Complete', status: 'Complete' },
  { id: 'sch_5', date: '05/06/2026', dow: 'Thứ 6', vocab: '', grammar: '3. Were, Was', shortStories: '5. My house', dailyDictConv: '5. Location (2)', dailyDictToeic: 'Conversation 5', ielts: 'Cam19 - Test 1 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 5: Công việc trong ngày', koreanGrammar: 'Bài 5 ( P.1)', note: 'Complete', status: 'Complete' },
  { id: 'sch_6', date: '06/06/2026', dow: 'Thứ 7', vocab: 'Part 3', grammar: '', shortStories: '6. My first pet', dailyDictConv: '6. Color (1)', dailyDictToeic: 'Conversation 6', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 6: 주말 Cuối tuần', koreanGrammar: 'Bài 5 (P.2)', note: 'Complete', status: 'Complete' },
  { id: 'sch_7', date: '07/06/2026', dow: 'Chủ Nhật', vocab: '', grammar: '4. There is/are, There was/were', shortStories: '7. Jennifer the firefighter', dailyDictConv: '7. Color (2)', dailyDictToeic: 'Conversation 7', ielts: 'Cam19 - Test 2 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_8', date: '08/06/2026', dow: 'Thứ 2', vocab: 'Part 4', grammar: '', shortStories: "8. Mark's big game", dailyDictConv: '8. No questions', dailyDictToeic: 'Conversation 8', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 7: 물건 사기 Mua sắm', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_9', date: '09/06/2026', dow: 'Thứ 3', vocab: '', grammar: '5. Pseudo-subject "It/There"', shortStories: '9. The Easter Egg Hunt', dailyDictConv: '9. Short Answer', dailyDictToeic: 'Conversation 9', ielts: 'Cam19 - Test 2 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: 'Bài 5 [... 에 가다 Đi đến, 안 - không', note: 'Complete', status: 'Complete' },
  { id: 'sch_10', date: '10/06/2026', dow: 'Thứ 4', vocab: 'Part 5', grammar: '', shortStories: '11. Summer vacation', dailyDictConv: "11. What's A Grant?", dailyDictToeic: 'Short Talk 1', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 8 음식 Món ăn', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_11', date: '11/06/2026', dow: 'Thứ 5', vocab: '', grammar: '6. Nouns', shortStories: '12. Cleaning up leaves', dailyDictConv: "12. I'm Busy On Friday", dailyDictToeic: 'Short Talk 2', ielts: 'Cam19 - Test 2 - Part 4', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: 'Bài 6 (P.1) : V/A +았/었/했다', note: 'Complete', status: 'Complete' },
  { id: 'sch_12', date: '12/06/2026', dow: 'Thứ 6', vocab: 'Part 6', grammar: '', shortStories: "13. Susan's wedding day", dailyDictConv: '13. Bless You', dailyDictToeic: 'Short Talk 3', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'BÀI 9 : 집 NHÀ CỬA', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_13', date: '13/06/2026', dow: 'Thứ 7', vocab: '', grammar: '7. Plural Nouns', shortStories: '14. Remembrance Day', dailyDictConv: "14. I Don't Feel Well", dailyDictToeic: 'Short Talk 4', ielts: 'Cam19 - Test 3 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: 'Bài 6 (P.2) : 하고 - (으)ㅂ시다', note: 'Complete', status: 'Complete' },
  { id: 'sch_14', date: '14/06/2026', dow: 'Chủ Nhật', vocab: 'Part 7', grammar: '', shortStories: '15. Halloween Night', dailyDictConv: '15. Can You Help Me?', dailyDictToeic: 'Short Talk 5', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'BÀI 10: 가족 GIA ĐÌNH', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_15', date: '15/06/2026', dow: 'Thứ 2', vocab: '', grammar: '8. Gerunds', shortStories: '16. Christmas Eve', dailyDictConv: '16. Taking a Cab', dailyDictToeic: 'Short Talk 6', ielts: 'Cam19 - Test 3 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 7: 물건 사기 MUA SẮM', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_16', date: '16/06/2026', dow: 'Thứ 3', vocab: 'Part 8', grammar: '', shortStories: '17. Thanksgiving', dailyDictConv: '17. I Hate to Get Up', dailyDictToeic: 'Short Talk 7', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'BÀI 11: 날씨 THỜI TIẾT', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_17', date: '17/06/2026', dow: 'Thứ 4', vocab: '', grammar: '9. Pronouns', shortStories: '18. Learning how to drive', dailyDictConv: '18. A Hot Day', dailyDictToeic: 'Short Talk 8', ielts: 'Cam19 - Test 3 - Part 4', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 8: 음식 THỨC ĂN', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_18', date: '18/06/2026', dow: 'Thứ 5', vocab: 'Part 9', grammar: '', shortStories: '19. Housework', dailyDictConv: '19. Phone Out of Order (1)', dailyDictToeic: 'Short Talk 9', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'BÀI 12: 전화 Điện Thoại', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_19', date: '19/06/2026', dow: 'Thứ 6', vocab: '', grammar: '10. Verbs', shortStories: '21. Daily schedule', dailyDictConv: '21. Getting A Visa', dailyDictToeic: 'Conversation 11', ielts: 'Cam19 - Test 4 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: 'Bài 9: 집 [ (으)로, (으)ㄹ래요, 도: cũng ]', note: '', status: '' },
  { id: 'sch_20', date: '20/06/2026', dow: 'Thứ 7', vocab: 'Part 10', grammar: '', shortStories: '22. Meals', dailyDictConv: '22. Employing a new member', dailyDictToeic: 'Conversation 12', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: 'BÀI 13: 생일 SINH NHẬT', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_21', date: '21/06/2026', dow: 'Chủ Nhật', vocab: '', grammar: '11. Infinitives', shortStories: '23. Seasons', dailyDictConv: '23. A Date (1)', dailyDictToeic: 'Conversation 13', ielts: 'Cam19 - Test 4 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: 'Bài 10: 가족 GIA ĐÌNH ', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_22', date: '22/06/2026', dow: 'Thứ 2', vocab: 'Part 11', grammar: '', shortStories: '24. Weather', dailyDictConv: '24. What did you do yesterday?', dailyDictToeic: 'Conversation 14', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_23', date: '23/06/2026', dow: 'Thứ 3', vocab: '', grammar: '12. Modal Verbs', shortStories: '25. House', dailyDictConv: '25. Travelling by Air', dailyDictToeic: 'Conversation 15', ielts: 'Cam19 - Test 4 - Part 4', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_24', date: '24/06/2026', dow: 'Thứ 4', vocab: 'Part 12', grammar: '', shortStories: '26. School', dailyDictConv: '26. At the Customs', dailyDictToeic: 'Conversation 16', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_25', date: '25/06/2026', dow: 'Thứ 5', vocab: '', grammar: '13. Prepositions In, At, On', shortStories: '27. Subjects', dailyDictConv: '27. A New Baby', dailyDictToeic: 'Conversation 17', ielts: 'Cam20 - Test 1 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_26', date: '26/06/2026', dow: 'Thứ 6', vocab: 'Part 13', grammar: '', shortStories: '28. International students', dailyDictConv: '28. Is English Difficult?', dailyDictToeic: 'Conversation 18', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_27', date: '27/06/2026', dow: 'Thứ 7', vocab: '', grammar: '14. Imperative Sentences', shortStories: '29. Interests and hobbies', dailyDictConv: '29. Washing His Car', dailyDictToeic: 'Conversation 19', ielts: 'Cam20 - Test 1 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_28', date: '28/06/2026', dow: 'Chủ Nhật', vocab: 'Part 14', grammar: '', shortStories: '31. Flowers', dailyDictConv: "31. When's the Baby Due?", dailyDictToeic: 'Short Talk 11', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_29', date: '29/06/2026', dow: 'Thứ 2', vocab: '', grammar: '15. Question Tag', shortStories: '32. The shopping mall', dailyDictConv: '32. Bus Stop', dailyDictToeic: 'Short Talk 12', ielts: 'Cam20 - Test 1 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_30', date: '30/06/2026', dow: 'Thứ 3', vocab: 'Part 15', grammar: '', shortStories: '33. Travel', dailyDictConv: '33. Gardening', dailyDictToeic: 'Short Talk 13', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_31', date: '01/07/2026', dow: 'Thứ 4', vocab: '', grammar: '16. Simple present (to be)', shortStories: '34. The farm', dailyDictConv: '34. A Lazy Boy', dailyDictToeic: 'Short Talk 14', ielts: 'Cam20 - Test 2 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_32', date: '02/07/2026', dow: 'Thứ 5', vocab: 'Part 16', grammar: '', shortStories: '35. Transportation', dailyDictConv: '35. Can I Drive There?', dailyDictToeic: 'Short Talk 15', ielts: 'TẠM DỪNG', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_33', date: '03/07/2026', dow: 'Thứ 6', vocab: '', grammar: '17. Simple present (regular)', shortStories: '36. Holidays', dailyDictConv: '36. A New Dress', dailyDictToeic: 'Short Talk 16', ielts: 'Cam20 - Test 2 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_34', date: '04/07/2026', dow: 'Thứ 7', vocab: 'Part 17', grammar: '', shortStories: '37. Diseases', dailyDictConv: '37. A picnic', dailyDictToeic: 'Short Talk 17', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_35', date: '05/07/2026', dow: 'Chủ Nhật', vocab: '', grammar: '18. Present continous', shortStories: '38. Jobs', dailyDictConv: "38. I'm Going Skiing", dailyDictToeic: 'Short Talk 18', ielts: 'Cam20 - Test 2 - Part 4', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_36', date: '06/07/2026', dow: 'Thứ 2', vocab: 'Part 18', grammar: '', shortStories: '39. My body', dailyDictConv: '39. Traffic Rules (1)', dailyDictToeic: 'Short Talk 19', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_37', date: '07/07/2026', dow: 'Thứ 3', vocab: '', grammar: '19. Compare present simple and continous', shortStories: '41. Colors', dailyDictConv: '41. Oral Exams', dailyDictToeic: 'Conversation 21', ielts: 'Cam20 - Test 3 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_38', date: '08/07/2026', dow: 'Thứ 4', vocab: 'Part 19', grammar: '', shortStories: '42. Wild animals', dailyDictConv: '42. Would You Call me?', dailyDictToeic: 'Conversation 22', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_39', date: '09/07/2026', dow: 'Thứ 5', vocab: '', grammar: '20. Simple past', shortStories: '43. Months', dailyDictConv: '43. Can I Let You Know?', dailyDictToeic: 'Conversation 23', ielts: 'Cam20 - Test 3 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_40', date: '10/07/2026', dow: 'Thứ 6', vocab: 'Part 20', grammar: '', shortStories: '44. Days of the week', dailyDictConv: '44. A Less Formal Call', dailyDictToeic: 'Conversation 24', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_41', date: '11/07/2026', dow: 'Thứ 7', vocab: 'Tiền Trung Cấp', grammar: '21. Past continous', shortStories: '45. Describing things', dailyDictConv: '45. A Cup of Coffee', dailyDictToeic: 'Conversation 25', ielts: 'Cam20 - Test 3 - Part 4', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_42', date: '12/07/2026', dow: 'Chủ Nhật', vocab: 'Part 1', grammar: '', shortStories: '46. Fruit', dailyDictConv: '46. How About a Drink?', dailyDictToeic: 'Conversation 26', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_43', date: '13/07/2026', dow: 'Thứ 2', vocab: '', grammar: '22. Compare past simple & continous', shortStories: '47. Bugs', dailyDictConv: '47. I Have a Sore Throat', dailyDictToeic: 'Conversation 27', ielts: 'Cam20 - Test 4 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_44', date: '14/07/2026', dow: 'Thứ 3', vocab: 'Part 2', grammar: '', shortStories: '48. The Kitchen', dailyDictConv: '48. On Sale', dailyDictToeic: 'Conversation 28', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_45', date: '15/07/2026', dow: 'Thứ 4', vocab: '', grammar: '23. Simple future tense', shortStories: '49. Questions and answers', dailyDictConv: '49. Not a Cloud in the Sky', dailyDictToeic: 'Conversation 29', ielts: 'Cam20 - Test 4 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_46', date: '16/07/2026', dow: 'Thứ 5', vocab: 'Part 3', grammar: '', shortStories: '51. Pets', dailyDictConv: "51. It's Beginning to Snow.", dailyDictToeic: 'Short Talk 21', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_47', date: '17/07/2026', dow: 'Thứ 6', vocab: '', grammar: '24. Future expressions', shortStories: '52. Parties', dailyDictConv: '52. A House at the Shore', dailyDictToeic: 'Short Talk 22', ielts: 'Cam20 - Test 4 - Part 4', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_48', date: '18/07/2026', dow: 'Thứ 7', vocab: 'Part 5', grammar: '', shortStories: '53. Grocery shopping', dailyDictConv: '53. A Soccer Game', dailyDictToeic: 'Short Talk 23', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_49', date: '19/07/2026', dow: 'Chủ Nhật', vocab: '', grammar: '25. Emphatic words', shortStories: '54. Differences', dailyDictConv: '54. Not So Young', dailyDictToeic: 'Short Talk 24', ielts: 'Cam21 - Test 1 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_50', date: '20/07/2026', dow: 'Thứ 2', vocab: 'Part 6', grammar: '', shortStories: '55. The restaurant', dailyDictConv: '55. Is She Single?', dailyDictToeic: 'Short Talk 25', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_51', date: '21/07/2026', dow: 'Thứ 3', vocab: '', grammar: '26. Auxiliary words', shortStories: '56. Traffic', dailyDictConv: '56. To Buy a Birthday Present', dailyDictToeic: 'Short Talk 26', ielts: 'Cam21 - Test 1 - Part 2', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_52', date: '22/07/2026', dow: 'Thứ 4', vocab: 'Part 7', grammar: '', shortStories: '57. Music (1)', dailyDictConv: '57. Telephone', dailyDictToeic: 'Short Talk 27', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_53', date: '23/07/2026', dow: 'Thứ 5', vocab: '', grammar: '27. Subject and Verb Agreement', shortStories: '58. Who What Where and Why', dailyDictConv: '58. A Light Eater', dailyDictToeic: 'Short Talk 28', ielts: 'Cam21 - Test 1 - Part 3', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_54', date: '24/07/2026', dow: 'Thứ 6', vocab: 'Part 8', grammar: '', shortStories: '59. Which direction?', dailyDictConv: '59. A Nice Flat (1)', dailyDictToeic: 'Short Talk 29', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_55', date: '25/07/2026', dow: 'Thứ 7', vocab: '', grammar: '28. Regular and Irregular Verbs', shortStories: '61. Money', dailyDictConv: '61. Afraid of Flying', dailyDictToeic: 'Conversation 31', ielts: 'Cam21 - Test 2 - Part 1', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_56', date: '26/07/2026', dow: 'Chủ Nhật', vocab: 'Part 9', grammar: '', shortStories: '62. Manners', dailyDictConv: '62. A Plane Reservation', dailyDictToeic: 'Conversation 32', ielts: '', toeicLis: '', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: 'Complete', status: 'Complete' },
  { id: 'sch_57', date: '27/07/2026', dow: 'Thứ 2', vocab: '', grammar: '29. Adjectives', shortStories: '63. The two sexes', dailyDictConv: '63. Getting Together', dailyDictToeic: 'Conversation 33', ielts: 'Cam21 - Test 2 - Part 2', toeicLis: 'Sample TOEIC Test 1', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: 'Incomplete', status: 'Incomplete' },
  { id: 'sch_58', date: '28/07/2026', dow: 'Thứ 3', vocab: 'Part 10', grammar: '', shortStories: '64. Me', dailyDictConv: "64. How's Your New Job Going?", dailyDictToeic: 'Conversation 34', ielts: '', toeicLis: 'Chữa Test 1', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_59', date: '29/07/2026', dow: 'Thứ 4', vocab: '', grammar: '30. Adverbs', shortStories: '65. My cat', dailyDictConv: '65. We Eat a Lot', dailyDictToeic: 'Conversation 35', ielts: 'Cam21 - Test 2 - Part 4', toeicLis: '', toeicRead: 'Sample TOEIC Test 1', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_60', date: '30/07/2026', dow: 'Thứ 5', vocab: 'Part 11', grammar: '', shortStories: '66. Music (2)', dailyDictConv: "66. I'll Take You", dailyDictToeic: 'Conversation 36', ielts: '', toeicLis: '', toeicRead: 'Chữa Test 1', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_61', date: '31/07/2026', dow: 'Thứ 6', vocab: '', grammar: '31. Adjectives and Adverbs', shortStories: '67. Spring', dailyDictConv: '67. We Must be Out of Them', dailyDictToeic: 'Conversation 37', ielts: 'Cam21 - Test 3 - Part 1', toeicLis: 'Sample TOEIC Test 2', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_62', date: '01/08/2026', dow: 'Thứ 7', vocab: 'Part 12', grammar: '', shortStories: '68. The birthday party', dailyDictConv: "68. Doctor's Appointment", dailyDictToeic: 'Conversation 38', ielts: '', toeicLis: 'Chữa Test 2', toeicRead: '', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_63', date: '02/08/2026', dow: 'Chủ Nhật', vocab: '', grammar: '32. Interrogative Pronouns', shortStories: '69. My classroom', dailyDictConv: '69. Traffic Rules (2)', dailyDictToeic: 'Conversation 39', ielts: 'Cam21 - Test 3 - Part 3', toeicLis: '', toeicRead: 'Sample TOEIC Test 2', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
  { id: 'sch_64', date: '03/08/2026', dow: 'Thứ 2', vocab: '', grammar: '', shortStories: '', dailyDictConv: '', dailyDictToeic: '', ielts: '', toeicLis: '', toeicRead: 'Chữa Test 2', koreanVocab: '', koreanGrammar: '', note: '', status: '' },
];

export function parseScheduleCSV(rawRows) {
  if (!rawRows || !Array.isArray(rawRows)) return [];
  const results = [];

  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];
    if (!row) continue;

    // Handle array format or object format
    let date = '';
    let dow = '';
    let vocab = '';
    let grammar = '';
    let shortStories = '';
    let dailyDictConv = '';
    let dailyDictToeic = '';
    let ielts = '';
    let toeicLis = '';
    let toeicRead = '';
    let koreanVocab = '';
    let koreanGrammar = '';
    let note = '';

    if (Array.isArray(row)) {
      date = (row[0] || '').trim();
      dow = (row[1] || '').trim();
      vocab = (row[2] || '').trim();
      grammar = (row[3] || '').trim();
      shortStories = (row[4] || '').trim();
      dailyDictConv = (row[5] || '').trim();
      dailyDictToeic = (row[6] || '').trim();
      ielts = (row[7] || '').trim();
      toeicLis = (row[8] || '').trim();
      toeicRead = (row[9] || '').trim();
      koreanVocab = (row[10] || '').trim();
      koreanGrammar = (row[11] || '').trim();
      note = (row[12] || '').trim();
    } else if (typeof row === 'object') {
      date = (row['Ngày'] || row['Date'] || Object.values(row)[0] || '').trim();
      dow = (row['Thứ'] || '').trim();
      note = (row['Ghi chú'] || row['Status'] || '').trim();
    }

    // Must be a date pattern like DD/MM/YYYY
    if (!date || date === 'Ngày' || !date.includes('/')) continue;

    results.push({
      id: `live_${date}_${i}`,
      date,
      dow,
      vocab,
      grammar,
      shortStories,
      dailyDictConv,
      dailyDictToeic,
      ielts,
      toeicLis,
      toeicRead,
      koreanVocab,
      koreanGrammar,
      note,
      status: note === 'Complete' ? 'Complete' : note === 'Incomplete' ? 'Incomplete' : '',
    });
  }
  return results;
}
