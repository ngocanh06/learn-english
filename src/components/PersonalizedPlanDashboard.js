import React, { useState, useMemo } from 'react';
import { CERTIFICATIONS } from '../config/learningCertifications';
import { generatePersonalizedRoadmap } from '../services/personalizedRoadmapEngine';

export default function PersonalizedPlanDashboard({
  profile,
  onOpenSettings,
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
      examDate: profile?.examDate || null,
      dailyStudyMinutes: profile?.dailyStudyMinutes || profile?.dailyGoalMin || 60,
      studyDaysPerWeek: profile?.studyDaysPerWeek || 6,
    });
  }, [profile]);

  const activeCert = CERTIFICATIONS.find((c) => c.id === roadmap.goal.certification) || CERTIFICATIONS[1];
  const { goal, currentState, skillGapAnalysis, priorities, phases, dailyPlan } = roadmap;

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

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
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
          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-850/60 border-slate-800'
          }`}>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              1. Bạn Đang Ở Đâu?
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {currentState.currentEstimatedScore}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {currentState.scoreUnit} (CEFR {currentState.overallLevel})
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Điểm ước lượng từ hồ sơ năng lực hiện tại
            </p>
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
          </div>
        </div>
      </div>

      {/* ─── 2. SKILL GAP ENGINE & PRIORITY ALLOCATION ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-blue-600" />
              Phân Tích Khoảng Cách Năng Lực (Skill Gap Engine) & Tỷ Trọng Thời Gian
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Thời gian học được phân bổ dựa trên: Lỗ hổng kỹ năng + Trọng số đề thi + Mục tiêu điểm
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

      {/* ─── 3. MULTI-PHASE ROADMAP & COMPETENCY GATES ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-route text-blue-600" />
              Lộ Trình Các Giai Đoạn (Learning Phases) & Cổng Năng Lực (Competency Gates)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Chuyển phase dựa trên năng lực kiểm tra thực tế (Competency Criteria), không chỉ đếm ngày học.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">
            {phases.length} Giai Đoạn Hoàn Chỉnh
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

      {/* ─── 4. TIME-BUDGETED DAILY PLAN & "WHY THIS TASK?" ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-clock-check text-blue-600" />
              Nhiệm Vụ Học Hôm Nay (Time-Budgeted: {dailyPlan.scheduledTasksDuration} / {dailyPlan.dailyTotalMinutes} phút)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mỗi nhiệm vụ có lý do sư phạm xác định (Deterministic Reason) dựa trên chênh lệch năng lực.
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
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
