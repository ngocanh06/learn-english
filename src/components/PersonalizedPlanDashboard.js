import React, { useState, useMemo } from 'react';
import { CERTIFICATIONS } from '../config/learningCertifications';
import { generatePersonalizedRoadmap } from '../services/personalizedRoadmapEngine';

export default function PersonalizedPlanDashboard({
  profile,
  onOpenSettings,
  onUpdateProfile,
  onNavigate,
  completedTasksMap = {},
  onToggleTask,
  theme = 'dark',
}) {
  const isLight = theme === 'light';
  const [activePhaseTab, setActivePhaseTab] = useState(0);

  // Generate personalized roadmap through the core engine
  const roadmap = useMemo(() => {
    return generatePersonalizedRoadmap(profile || {}, {
      certification: profile?.certification || 'ielts',
      targetScore: profile?.targetScore || '7.0',
      daysRemaining: profile?.daysRemaining,
      targetDurationMonths: profile?.targetDurationMonths,
      examDate: profile?.examDate || null,
      dailyStudyMinutes: profile?.dailyStudyMinutes || profile?.dailyGoalMin || 60,
      studyDaysPerWeek: profile?.studyDaysPerWeek || 6,
    });
  }, [profile]);

  const activeCert = CERTIFICATIONS.find((c) => c.id === roadmap.goal.certification) || CERTIFICATIONS[1];
  const { goal, currentState, skillGapAnalysis, priorities, phases, dailyPlan } = roadmap;

  const handleUpdate = (patch) => {
    if (onUpdateProfile) {
      onUpdateProfile({ ...profile, ...patch });
    }
  };

  const priorityColors = {
    Critical: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    High: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    Medium: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    Low: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
    Maintenance: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  };

  const skillIcons = {
    listening: 'fa-headphones',
    reading: 'fa-book-open',
    grammar: 'fa-spell-check',
    vocabulary: 'fa-layer-group',
    writing: 'fa-pen-nib',
    speaking: 'fa-microphone',
    pronunciation: 'fa-volume-high',
  };

  const skillNames = {
    listening: 'Listening (Nghe)',
    reading: 'Reading (Đọc)',
    grammar: 'Grammar (Ngữ pháp)',
    vocabulary: 'Vocabulary (Từ vựng)',
    writing: 'Writing (Viết)',
    speaking: 'Speaking (Nói)',
    pronunciation: 'Pronunciation (Phát âm)',
  };

  const currentCertId = profile?.certification || 'ielts';
  const currentDays = profile?.daysRemaining || 60;
  const currentMinutes = Number(profile?.dailyStudyMinutes || profile?.dailyGoalMin || 60);

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* ─── 0. TÙY CHỈNH MỤC TIÊU HỌC ─── */}
      <div className={`p-4 md:p-5 rounded-xl border transition-colors space-y-3.5 ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              <i className="fa-solid fa-sliders" />
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Tùy chỉnh mục tiêu học
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Chọn chứng chỉ, thời gian và cường độ để tối ưu lộ trình
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Row 1: Certification & Band */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                1. Chứng Chỉ & Điểm
              </span>
              <div className="flex items-center gap-1">
                {[
                  { id: 'toeic', label: 'TOEIC' },
                  { id: 'ielts', label: 'IELTS' },
                  { id: 'vstep', label: 'VSTEP' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      const defScore = c.id === 'toeic' ? '650' : c.id === 'ielts' ? '7.0' : 'B2';
                      handleUpdate({ certification: c.id, targetScore: defScore });
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      currentCertId === c.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-0.5">
              {currentCertId === 'toeic' ? (
                [
                  { score: '450', label: '450 Nền' },
                  { score: '650', label: '650 Chuẩn' },
                  { score: '850', label: '850+ Cao' },
                ].map((btn) => (
                  <button
                    key={btn.score}
                    onClick={() => handleUpdate({ targetScore: btn.score })}
                    className={`py-1.5 px-1 rounded-xl text-center font-black text-xs transition cursor-pointer ${
                      String(profile?.targetScore) === btn.score
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))
              ) : currentCertId === 'ielts' ? (
                [
                  { score: '5.5', label: 'Band 5.5' },
                  { score: '6.5', label: 'Band 6.5' },
                  { score: '7.5', label: 'Band 7.5+' },
                ].map((btn) => (
                  <button
                    key={btn.score}
                    onClick={() => handleUpdate({ targetScore: btn.score })}
                    className={`py-1.5 px-1 rounded-xl text-center font-black text-xs transition cursor-pointer ${
                      String(profile?.targetScore) === btn.score
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))
              ) : (
                [
                  { score: 'B1', label: 'Bậc 3 (B1)' },
                  { score: 'B2', label: 'Bậc 4 (B2)' },
                  { score: 'C1', label: 'Bậc 5 (C1)' },
                ].map((btn) => (
                  <button
                    key={btn.score}
                    onClick={() => handleUpdate({ targetScore: btn.score })}
                    className={`py-1.5 px-1 rounded-xl text-center font-black text-xs transition cursor-pointer ${
                      String(profile?.targetScore) === btn.score
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Row 2: Starting Level */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                2. Trình Độ Xuất Phát
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {currentState.isTested ? 'Đã test' : profile?.selfAssessed ? 'Tự chọn' : 'Chưa test'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 pt-0.5">
              {[
                { level: 'A1', label: 'A1 Gốc' },
                { level: 'A2', label: 'A2 Sơ' },
                { level: 'B1', label: 'B1 Trung' },
                { level: 'B2', label: 'B2 Khá' },
              ].map((btn) => {
                const active = (profile?.overallLevel || profile?.currentLevel) === btn.level;
                return (
                  <button
                    key={btn.level}
                    type="button"
                    onClick={() => handleUpdate({
                      currentLevel: btn.level,
                      overallLevel: btn.level,
                      selfAssessed: true,
                      hasTakenTest: false,
                      skills: {
                        listening: btn.level,
                        reading: btn.level,
                        grammar: btn.level,
                        vocabulary: btn.level,
                        writing: btn.level,
                        speaking: btn.level,
                        pronunciation: btn.level,
                      }
                    })}
                    className={`py-1.5 px-0.5 rounded-xl text-center font-black text-[11px] transition cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Exam Timeline / Deadline */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              3. Thời Gian Ôn Thi (Hạn)
            </span>
            <div className="grid grid-cols-4 gap-1 pt-0.5">
              {[
                { days: 30, label: '30N' },
                { days: 60, label: '60N' },
                { days: 90, label: '90N' },
                { days: 180, label: '180N' },
              ].map((btn) => {
                const active = currentDays === btn.days;
                return (
                  <button
                    key={btn.days}
                    onClick={() => handleUpdate({ daysRemaining: btn.days, examDate: null })}
                    className={`py-1.5 px-1 rounded-xl text-center font-black text-xs transition cursor-pointer ${
                      active
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Daily Study Time */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              4. Thời Gian Học/Ngày
            </span>
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              {[
                { min: 30, label: '30p' },
                { min: 60, label: '60p' },
                { min: 90, label: '90p+' },
              ].map((btn) => {
                const active = currentMinutes === btn.min;
                return (
                  <button
                    key={btn.min}
                    onClick={() => handleUpdate({ dailyStudyMinutes: btn.min, dailyGoalMin: btn.min })}
                    className={`py-1.5 px-1 rounded-xl text-center font-black text-xs transition cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: Bottleneck */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              5. Điểm Nghẽn Cần Ưu Tiên
            </span>
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              {[
                { key: 'listening', label: '🎧 Nghe' },
                { key: 'reading', label: '📖 Đọc' },
                { key: 'grammar', label: '✍️ Viết' },
              ].map((btn) => {
                const active = (profile?.primaryBottleneck || 'listening') === btn.key;
                return (
                  <button
                    key={btn.key}
                    onClick={() => handleUpdate({ primaryBottleneck: btn.key })}
                    className={`py-1.5 px-1 rounded-xl text-center font-black text-xs transition cursor-pointer ${
                      active
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* ─── 1. CORE ENGINE HERO: GOAL + CURRENT STATE + GAP ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
        isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
              <i className={`fa-solid ${activeCert.icon}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white">
                  Lộ Trình Cá Nhân Hóa: {activeCert.name}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${activeCert.badgeColor}`}>
                  Mục tiêu {goal.targetScore}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Chuẩn CEFR: {goal.requiredOverallLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Thời lượng: <strong className="text-slate-700 dark:text-slate-200">{goal.dailyStudyMinutes} phút/ngày</strong> •{' '}
                Tần suất: <strong className="text-slate-700 dark:text-slate-200">{goal.studyDaysPerWeek} ngày/tuần</strong> •{' '}
                Tổng thời lượng: <strong className="text-blue-600 dark:text-blue-400">{goal.totalWeeks} tuần ({goal.totalAvailableStudyHours} giờ học)</strong>
                {goal.examDate && (
                  <>
                    {' '}• Ngày thi: <strong className="text-rose-500">{goal.examDate}</strong> ({goal.daysRemaining} ngày còn lại)
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 self-start md:self-auto cursor-pointer ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
            }`}
          >
            <i className="fa-solid fa-sliders text-blue-500" />
            <span>Điều chỉnh Mục Tiêu</span>
          </button>
        </div>

        {/* 3-Column Metric Box: Where You Are, Target, Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          {/* Box 1: Current State */}
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            currentState.isTested
              ? isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-850/60 border-slate-800'
              : isLight ? 'bg-amber-50/40 border-amber-300/70' : 'bg-amber-950/20 border-amber-800/50'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  1. Bạn Đang Ở Đâu?
                </span>
                {currentState.isTested ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Đã Test
                  </span>
                ) : profile?.selfAssessed ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Tự Chọn (Chưa Test)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                    Chưa Kiểm Tra
                  </span>
                )}
              </div>

              {currentState.isTested ? (
                <>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {currentState.currentEstimatedScore}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {currentState.scoreUnit} (CEFR {currentState.overallLevel})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {currentState.diagnosticTestResult
                      ? `Kết quả từ bài test đầu vào (${currentState.diagnosticTestResult.score || 0}/25 câu)`
                      : 'Điểm thực tế từ bài kiểm tra năng lực'}
                  </p>
                </>
              ) : profile?.selfAssessed ? (
                <>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {profile.currentLevel || 'A2'}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      (Tự đánh giá ban đầu)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Lộ trình tạm tính theo mức {profile.currentLevel || 'A2'}. Nên làm test 25p để xác định điểm chính xác.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-black text-slate-400 dark:text-slate-500">
                      --
                    </span>
                    <span className="text-xs font-bold text-rose-500 dark:text-rose-400">
                      Chưa làm bài test
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Chưa có điểm kiểm tra thực tế. Hãy làm bài test 25p hoặc tự chọn trình độ để lập lộ trình chuẩn.
                  </p>
                </>
              )}
            </div>

            {!currentState.isTested && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('ielts-roadmap', { subTab: 'placement-test' });
                    }
                  }}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <i className="fa-solid fa-clipboard-check text-[11px]" />
                  <span>Làm Bài Test Đầu Vào (25p)</span>
                </button>
              </div>
            )}
          </div>

          {/* Box 2: Target */}
          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-blue-50/40 border-blue-200/80' : 'bg-blue-950/20 border-blue-900/40'
          }`}>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              2. Điểm Số Cần Đạt
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                {goal.targetScore}
              </span>
              <span className="text-xs font-bold text-blue-500/80">
                {currentState.scoreUnit} ({goal.requiredOverallLevel})
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {goal.targetBlueprintLabel}
            </p>
          </div>

          {/* Box 3: Gap & Primary Bottleneck */}
          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-rose-50/40 border-rose-200/80' : 'bg-rose-950/20 border-rose-900/40'
          }`}>
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              3. Khoảng Cách Lớn Nhất
            </span>
            {currentState.isTested || profile?.selfAssessed ? (
              <>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
                    {currentState.targetScoreGap !== null ? `-${currentState.targetScoreGap}` : `Thâm hụt ${skillGapAnalysis.totalDeficit} bậc`}
                  </span>
                  <span className="text-xs font-bold text-rose-500/80">
                    {currentState.targetScoreGap !== null ? currentState.scoreUnit : 'CEFR'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 truncate">
                  Nút thắt: <strong className="text-rose-600 dark:text-rose-400 capitalize">{currentState.primaryBottleneck}</strong> (Lỗ hổng {skillGapAnalysis.largestGap.gap} bậc)
                </p>
              </>
            ) : (
              <div className="mt-1">
                <span className="text-xs font-bold text-slate-400 block mt-1">
                  Cần làm test để đo khoảng cách
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Khoảng cách điểm số sẽ hiển thị chính xác sau khi bạn làm bài test hoặc tự chọn trình độ xuất phát.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── 2. PHÂN BỔ THỜI GIAN THEO KỸ NĂNG ─── */}
      <div className={`p-5 rounded-xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-blue-600" />
              Phân bổ thời gian theo kỹ năng
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Thời gian học mỗi ngày được cân đối theo kỹ năng cần bứt phá
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {priorities.sortedSkills.map((skill) => {
            const gapInfo = skillGapAnalysis.skillGaps[skill];
            const priorityInfo = priorities.priorityTiers[skill];
            const pct = priorities.timeAllocationPercent[skill] || 0;
            const minutesForSkill = Math.round((goal.dailyStudyMinutes * pct) / 100);

            if (!gapInfo) return null;

            return (
              <div
                key={skill}
                className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 transition ${
                  isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-850/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">
                      <i className={`fa-solid ${skillIcons[skill] || 'fa-circle-dot'}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {skillNames[skill] || skill}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${priorityColors[priorityInfo?.tier || 'Medium']}`}>
                    {priorityInfo?.tier || 'Medium'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span>Hiện tại: <strong className="text-slate-800 dark:text-slate-200">{gapInfo.currentCefr}</strong></span>
                    <span>Cần đạt: <strong className="text-blue-600 dark:text-blue-400">{gapInfo.requiredCefr}</strong></span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        gapInfo.gap >= 1.5 ? 'bg-rose-500' : gapInfo.gap >= 1.0 ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(15, (gapInfo.currentNumeric / gapInfo.requiredNumeric) * 100))}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Tỷ trọng học:</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">
                    {pct}% (~{minutesForSkill} phút/ngày)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 3. LỘ TRÌNH CÁC GIAI ĐOẠN ─── */}
      <div className={`p-5 rounded-xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <div>
            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-route text-blue-600" />
              Lộ trình các giai đoạn
            </h3>
          </div>

          <span className="text-xs font-mono font-medium text-slate-400">
            {phases.length} Giai đoạn
          </span>
        </div>

        {/* Phase selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          {phases.map((phase, idx) => {
            const isActive = activePhaseTab === idx;
            return (
              <button
                key={phase.phaseId}
                onClick={() => setActivePhaseTab(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isLight
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <span>Phase {phase.phaseIndex}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                }`}>
                  {phase.durationWeeks} tuần
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Card */}
        {phases[activePhaseTab] && (
          <div className="pt-4 space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    Phase {phases[activePhaseTab].phaseIndex} / {phases.length}
                  </span>
                  <h4 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white">
                    {phases[activePhaseTab].name}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  <strong>Mục tiêu cốt lõi:</strong> {phases[activePhaseTab].objective}
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                {phases[activePhaseTab].focusSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Competency Gate Box */}
            <div className={`p-4 rounded-xl border ${
              isLight ? 'bg-amber-50/50 border-amber-200/80 text-amber-950' : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
            }`}>
              <div className="flex items-start gap-2.5">
                <i className="fa-solid fa-shield-halved text-amber-500 text-sm mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Điều Kiện Mở Khóa Phase Kế Tiếp (Competency Gate)
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                    {phases[activePhaseTab].competencyGate?.gateDescription || 'Hoàn thành các bài kiểm tra chẩn đoán và đạt mốc điểm chuẩn.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Curriculum Reference Mapping */}
            {phases[activePhaseTab].curriculumMapping && (
              <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-850 border-slate-800 text-slate-300'
              }`}>
                <span className="font-bold block text-[11px] text-slate-400 uppercase tracking-wider">
                  Nguồn Học Liệu Thực Tế Được Kết Nối:
                </span>
                {Object.entries(phases[activePhaseTab].curriculumMapping).map(([k, v]) => (
                  <div key={k} className="flex items-start gap-2">
                    <i className="fa-solid fa-link text-blue-500 text-[10px] mt-1" />
                    <span className="truncate">
                      <strong className="capitalize">{k}:</strong> {Array.isArray(v) ? `Bài ${v.slice(0, 5).join(', ')}...` : v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── 4. NHIỆM VỤ HỌC HÔM NAY ─── */}
      <div className={`p-5 rounded-xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-clock-check text-blue-600" />
              Nhiệm vụ học hôm nay ({dailyPlan.scheduledTasksDuration} / {dailyPlan.dailyTotalMinutes} phút)
            </h3>
          </div>

          <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            {dailyPlan.tasks.length} Nhiệm vụ
          </span>
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {dailyPlan.tasks.map((task, idx) => {
            const isCompleted = completedTasksMap[task.id] || false;

            return (
              <div
                key={task.id || idx}
                className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCompleted
                    ? isLight
                      ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900'
                      : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                    : isLight
                    ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    onClick={() => onToggleTask && onToggleTask(1, task.id)}
                    className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 text-transparent'
                    }`}
                    title={isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                  >
                    <i className="fa-solid fa-check text-xs" />
                  </button>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityColors[task.priorityTier] || priorityColors.Medium}`}>
                        {task.category} • {task.priorityTier}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                        {task.durationMinutes} phút
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 truncate">
                        • {task.contentRef}
                      </span>
                    </div>

                    <h4 className={`text-xs md:text-sm font-bold truncate ${
                      isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {task.title}
                    </h4>

                    {/* Deterministic "Why This Task?" Explanation */}
                    <div className="flex items-start gap-1.5 pt-0.5">
                      <i className="fa-solid fa-circle-question text-blue-500 text-[11px] mt-0.5 shrink-0" />
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        <strong>Tại sao học nội dung này:</strong> {task.whyThisTask}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        if (task.skill === 'listening' && goal.certification === 'toeic') {
                          onNavigate('study4-toeic');
                        } else if (task.skill === 'listening' && goal.certification === 'ielts') {
                          onNavigate('ielts-roadmap');
                        } else if (task.skill === 'grammar') {
                          onNavigate('grammar');
                        } else if (task.skill === 'reading') {
                          onNavigate('reading');
                        } else {
                          onNavigate(goal.certification === 'toeic' ? 'study4-toeic' : 'ielts-roadmap');
                        }
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isCompleted
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    <span>{isCompleted ? 'Học lại' : 'Vào Học Ngay'}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
