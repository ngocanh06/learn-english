import React, { useState, useMemo, useEffect } from 'react';
import { IELTS_WRITING_PROMPTS } from '../../data/ieltsPracticeData';
import { useUserStorage } from '../../hooks/useUserStorage';

export default function IELTSWritingStudioPro({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Selected prompt
  const [selectedPromptId, setSelectedPromptId] = useState(IELTS_WRITING_PROMPTS[0]?.id || '');
  const activePrompt = useMemo(() => {
    return IELTS_WRITING_PROMPTS.find((p) => p.id === selectedPromptId) || IELTS_WRITING_PROMPTS[0];
  }, [selectedPromptId]);

  // View Mode: 'editor' | 'sample' | 'feedback'
  const [viewMode, setViewMode] = useState('editor');

  // User essay drafts persistence: { [promptId]: string }
  const [essayDrafts, setEssayDrafts] = useUserStorage('ielts_writing_drafts_v1', {});
  const userEssay = essayDrafts[selectedPromptId] || '';

  // Timer: 20 min (Task 1) or 40 min (Task 2)
  const [timeLeft, setTimeLeft] = useState((activePrompt?.timeAllowed || 20) * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Evaluation results
  const [evaluation, setEvaluation] = useState(null);

  // Update timer when prompt changes
  useEffect(() => {
    setTimeLeft((activePrompt?.timeAllowed || 20) * 60);
    setTimerRunning(false);
    setEvaluation(null);
  }, [selectedPromptId, activePrompt]);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Live word counter
  const wordCount = useMemo(() => {
    if (!userEssay.trim()) return 0;
    return userEssay.trim().split(/\s+/).filter(Boolean).length;
  }, [userEssay]);

  const minWordsRequired = activePrompt.minWords || 150;
  const isWordCountSufficient = wordCount >= minWordsRequired;

  // Handle text change
  const handleTextChange = (e) => {
    const text = e.target.value;
    setEssayDrafts((prev) => ({
      ...prev,
      [selectedPromptId]: text,
    }));
  };

  // Automated 4-Criteria Intelligent Evaluation
  const handleEvaluate = () => {
    if (!userEssay.trim()) return;

    const lower = userEssay.toLowerCase();

    // 1. Task Achievement (25%)
    let taScore = 5.0;
    let taComments = [];
    if (wordCount >= minWordsRequired) {
      taScore += 1.0;
      taComments.push(`Đạt độ dài tiêu chuẩn: ${wordCount}/${minWordsRequired} từ.`);
    } else {
      taComments.push(`Chưa đạt đủ độ dài tối thiểu (${wordCount}/${minWordsRequired} từ), bị trừ điểm Task Achievement.`);
    }

    if (activePrompt.taskType === 'Task 1') {
      if (lower.includes('overall') || lower.includes('in general') || lower.includes('in summary')) {
        taScore += 1.0;
        taComments.push('Có đoạn Overview rõ ràng (tiêu chí then chốt để đạt Band 7.0+ Task 1).');
      } else {
        taComments.push('Thiếu từ khóa chỉ đoạn Overview (Overall, In general). Cần bổ sung tóm tắt 2 đặc điểm nổi bật.');
      }
    } else {
      if (lower.includes('in my opinion') || lower.includes('i agree') || lower.includes('i disagree') || lower.includes('from my perspective') || lower.includes('i believe')) {
        taScore += 1.0;
        taComments.push('Đã nêu rõ quan điểm cá nhân (Thesis Statement) ngay từ phần Mở bài.');
      } else {
        taComments.push('Chưa thấy rõ lập trường cá nhân ở Mở bài. Hãy dùng: "In my opinion...", "I firmly believe that...".');
      }
    }

    // 2. Coherence & Cohesion (25%)
    const connectors = [
      'furthermore', 'moreover', 'in addition', 'consequently', 'therefore',
      'however', 'nevertheless', 'on the other hand', 'in contrast', 'conversely',
      'firstly', 'secondly', 'finally', 'for instance', 'for example', 'as a result'
    ];
    const foundConnectors = connectors.filter((c) => lower.includes(c));
    let ccScore = 5.5;
    if (foundConnectors.length >= 5) ccScore += 1.5;
    else if (foundConnectors.length >= 3) ccScore += 1.0;
    else if (foundConnectors.length >= 1) ccScore += 0.5;

    // 3. Lexical Resource (25%)
    const academicVocab = [
      'significant', 'exponential', 'trajectory', 'plummet', 'surge', 'fluctuate',
      'pedagogical', 'unprecedented', 'curriculum', 'perspective', 'substantiate',
      'consequence', 'profound', 'indispensable', 'replicate', 'collaborative'
    ];
    const foundAcademic = academicVocab.filter((w) => lower.includes(w));
    let lrScore = 5.5;
    if (foundAcademic.length >= 4) lrScore += 1.5;
    else if (foundAcademic.length >= 2) lrScore += 1.0;
    else if (foundAcademic.length >= 1) lrScore += 0.5;

    // 4. Grammatical Range & Accuracy (25%)
    let graScore = 6.0;
    const hasPassive = /\b(is|are|was|were|been|being)\s+\w+ed\b/i.test(userEssay);
    const hasComplex = /\b(which|who|that|although|because|while|whereas|since|if)\b/i.test(userEssay);
    if (hasPassive && hasComplex) graScore += 1.0;
    else if (hasPassive || hasComplex) graScore += 0.5;

    // Cap individual scores at 8.5
    taScore = Math.min(8.5, Math.max(4.0, taScore));
    ccScore = Math.min(8.5, Math.max(4.0, ccScore));
    lrScore = Math.min(8.5, Math.max(4.0, lrScore));
    graScore = Math.min(8.5, Math.max(4.0, graScore));

    const overallBand = Math.round(((taScore + ccScore + lrScore + graScore) / 4) * 2) / 2;

    setEvaluation({
      overallBand,
      ta: { score: taScore, notes: taComments },
      cc: {
        score: ccScore,
        connectorsFound: foundConnectors,
        notes: `Phát hiện ${foundConnectors.length} liên từ học thuật: ${foundConnectors.slice(0, 4).join(', ') || 'Chưa nhiều'}.`,
      },
      lr: {
        score: lrScore,
        academicFound: foundAcademic,
        notes: `Độ phủ từ vựng học thuật C1/C2: ${foundAcademic.join(', ') || 'Chưa nhiều'}.`,
      },
      gra: {
        score: graScore,
        hasPassive,
        hasComplex,
        notes: `${hasComplex ? '✓ Có câu phức (Complex sentences)' : '✗ Cần thêm câu phức'}. ${hasPassive ? '✓ Có câu bị động (Passive voice)' : '✗ Cần thêm câu bị động'}.`,
      },
    });

    setViewMode('feedback');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ─── HEADER & CONTROLS ───────────────────────────────────────── */}
      <div
        className={`p-5 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-pen-nib" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-indigo-500/15 text-indigo-500">
                {activePrompt.taskType} • {activePrompt.chartType}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activePrompt.timeAllowed} phút • Tối thiểu {activePrompt.minWords} từ
              </span>
            </div>
            <h2
              className={`text-base md:text-lg font-bold truncate max-w-md ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {activePrompt.title}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {/* Prompt Selector */}
          <select
            value={selectedPromptId}
            onChange={(e) => setSelectedPromptId(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'
                : 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500'
            }`}
          >
            {IELTS_WRITING_PROMPTS.map((p) => (
              <option key={p.id} value={p.id}>
                [{p.taskType}] {p.title}
              </option>
            ))}
          </select>

          {/* Countdown Timer with Play/Pause */}
          <div
            className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-mono text-xs font-bold ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="text-indigo-500 hover:scale-110 transition-transform cursor-pointer"
              title={timerRunning ? 'Tạm dừng đếm giờ' : 'Bắt đầu bấm giờ làm bài'}
            >
              <i className={`fa-solid ${timerRunning ? 'fa-pause' : 'fa-play'}`} />
            </button>
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Evaluate AI Button */}
          <button
            onClick={handleEvaluate}
            disabled={!userEssay.trim()}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
              userEssay.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <i className="fa-solid fa-wand-magic-sparkles text-xs" />
            <span>Chấm Bài AI (4 Tiêu Chí)</span>
          </button>
        </div>
      </div>

      {/* ─── TAB SWITCHER: EDITOR / SAMPLE / FEEDBACK ────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setViewMode('editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            viewMode === 'editor'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-keyboard" />
          <span>Soạn Bài Viết</span>
        </button>

        <button
          onClick={() => setViewMode('sample')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            viewMode === 'sample'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-file-signature" />
          <span>Bài Mẫu Band 8.5+ Chuẩn</span>
        </button>

        {evaluation && (
          <button
            onClick={() => setViewMode('feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'feedback'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-chart-pie" />
            <span>Kết Quả Chấm Điểm ({evaluation.overallBand})</span>
          </button>
        )}
      </div>

      {/* ─── VIEW 1: EDITOR MODE (SPLIT PROMPT & TEXTAREA) ───────────── */}
      {viewMode === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Prompt & Key Highlights (4 cols) */}
          <div
            className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Đề Bài Chính Thức (Official Prompt)
              </span>
              <p
                className={`text-xs md:text-sm font-bold leading-relaxed ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {activePrompt.prompt}
              </p>
            </div>

            {/* If task 1 has data summary */}
            {activePrompt.dataSummary && (
              <div
                className={`p-4 rounded-2xl border space-y-2 text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-750'
                }`}
              >
                <div className="font-bold text-amber-500 uppercase text-[10px]">
                  Số Liệu Cốt Lõi Cần So Sánh:
                </div>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  {activePrompt.dataSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-dot text-[8px] text-amber-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Tips Box */}
            <div
              className={`p-4 rounded-2xl border space-y-1 text-xs ${
                isLight ? 'bg-indigo-50/60 border-indigo-200 text-indigo-900' : 'bg-indigo-950/20 border-indigo-800/40 text-indigo-300'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-lightbulb text-indigo-500" />
                <span>Chiến thuật đạt Band 7.0+:</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                {activePrompt.taskType === 'Task 1'
                  ? 'Luôn viết đoạn Overview (2 xu hướng nổi bật nhất) ngay sau mở bài. Tuyệt đối không đưa ý kiến cá nhân vào bài mô tả biểu đồ.'
                  : 'Nêu rõ lập trường đồng ý hay phản đối ngay ở câu Thesis statement mở bài. Sử dụng các liên từ học thuật và công thức PEEL cho mỗi thân bài.'}
              </p>
            </div>
          </div>

          {/* Right: Essay Textarea & Live Word Counter (7 cols) */}
          <div
            className={`lg:col-span-7 p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Khung Soạn Thảo Bài Làm
              </span>

              {/* Live Word Count Indicator */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span
                  className={`px-2.5 py-1 rounded-lg font-bold border ${
                    isWordCountSufficient
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-500'
                  }`}
                >
                  {wordCount} / {minWordsRequired} từ
                </span>
                {isWordCountSufficient ? (
                  <span className="text-emerald-500 text-[11px]">✓ Đạt chuẩn độ dài</span>
                ) : (
                  <span className="text-amber-500 text-[11px]">Cần viết thêm {minWordsRequired - wordCount} từ</span>
                )}
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={userEssay}
              onChange={handleTextChange}
              placeholder={`Bắt đầu viết bài ${activePrompt.taskType} của bạn tại đây...\n\nVí dụ mở đầu:\n${
                activePrompt.taskType === 'Task 1'
                  ? 'The provided line graph illustrates information regarding...'
                  : 'In contemporary society, it is widely argued that...'
              }`}
              className={`w-full min-h-[420px] p-4 rounded-2xl text-xs md:text-sm font-sans leading-relaxed border outline-none resize-y transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                  : 'bg-slate-850 border-slate-750 text-white focus:border-indigo-500'
              }`}
            />

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Mẹo: Nhấn Tab để thụt dòng đầu đoạn</span>
              <button
                onClick={handleEvaluate}
                disabled={!userEssay.trim()}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-check-double text-xs" />
                <span>Nộp &amp; Chấm Điểm Chi Tiết</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW 2: MODEL SAMPLE ESSAY (BAND 8.5+) ─────────────────── */}
      {viewMode === 'sample' && (
        <div
          className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs uppercase">
                Band 8.5+ Official Sample
              </span>
              <h3
                className={`text-base font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {activePrompt.title}
              </h3>
            </div>

            <button
              onClick={() => setViewMode('editor')}
              className="px-3.5 py-1.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Quay lại viết bài
            </button>
          </div>

          <div
            className={`prose max-w-none text-xs md:text-sm leading-relaxed whitespace-pre-line font-serif ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            {activePrompt.sampleBand85}
          </div>

          {/* Key Features & Analysis */}
          {activePrompt.keyFeatures && (
            <div
              className={`p-5 rounded-2xl border space-y-2 text-xs ${
                isLight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800/40'
              }`}
            >
              <div className="font-bold text-emerald-500 uppercase text-[11px] flex items-center gap-1.5">
                <i className="fa-solid fa-star" />
                <span>Điểm Đắt Giá Của Bài Viết Mẫu (Examiner Commentary):</span>
              </div>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {activePrompt.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-emerald-500 text-[10px] mt-1 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ─── VIEW 3: AI EVALUATION FEEDBACK (4 CRITERIA) ─────────────── */}
      {viewMode === 'feedback' && evaluation && (
        <div className="space-y-6 animate-fadeIn">
          {/* Overall Band Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                Đánh Giá Tự Động Chuẩn 4 Tiêu Chí
              </span>
              <h3 className="text-2xl md:text-3xl font-black">
                Ước Tính Band Score: {evaluation.overallBand.toFixed(1)}
              </h3>
              <p className="text-xs text-indigo-100 max-w-lg">
                Điểm số được tổng hợp dựa trên 4 trụ cột đánh giá của Cambridge IELTS Examiner:
                Task Achievement, Coherence &amp; Cohesion, Lexical Resource và Grammatical Range.
              </p>
            </div>

            <button
              onClick={() => setViewMode('editor')}
              className="px-5 py-2.5 rounded-2xl bg-white text-indigo-600 font-bold text-xs hover:scale-105 transition-transform shadow-md shrink-0 cursor-pointer"
            >
              Chỉnh Sửa Bài Viết
            </button>
          </div>

          {/* 4 Criteria Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Task Achievement */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <i className="fa-solid fa-bullseye text-blue-500" />
                  <span>Task Achievement / Response</span>
                </h4>
                <span className="text-lg font-black font-mono text-blue-500">
                  {evaluation.ta.score.toFixed(1)}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {evaluation.ta.notes.map((n, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <i className="fa-solid fa-circle-dot text-[8px] text-blue-500 mt-1 shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Coherence & Cohesion */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <i className="fa-solid fa-link text-emerald-500" />
                  <span>Coherence &amp; Cohesion</span>
                </h4>
                <span className="text-lg font-black font-mono text-emerald-500">
                  {evaluation.cc.score.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {evaluation.cc.notes}
              </p>
            </div>

            {/* 3. Lexical Resource */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <i className="fa-solid fa-book-bookmark text-amber-500" />
                  <span>Lexical Resource (Từ Vựng C1/C2)</span>
                </h4>
                <span className="text-lg font-black font-mono text-amber-500">
                  {evaluation.lr.score.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {evaluation.lr.notes}
              </p>
            </div>

            {/* 4. Grammatical Range & Accuracy */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <i className="fa-solid fa-spell-check text-purple-500" />
                  <span>Grammatical Range &amp; Accuracy</span>
                </h4>
                <span className="text-lg font-black font-mono text-purple-500">
                  {evaluation.gra.score.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {evaluation.gra.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
