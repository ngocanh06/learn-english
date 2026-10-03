import React, { useState } from 'react';
import { CERTIFICATIONS, CEFR_LEVELS } from '../config/learningCertifications';
import { generateTodayPlan, generateWeeklyOverview, calculateLearningMix } from '../utils/learningPlanEngine';

export default function PersonalizedPlanDashboard({
  profile,
  onOpenSettings,
  onNavigate,
  calendarTasks = {},
  completedTasksMap = {},
  onToggleTask,
  theme = 'dark',
}) {
  const isLight = theme === 'light';
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);

  const activeCert = CERTIFICATIONS.find((c) => c.id === profile?.certification) || CERTIFICATIONS[1];
  const activeLevel = CEFR_LEVELS.find((l) => l.code === profile?.currentLevel) || CEFR_LEVELS[2];

  const todayPlan = generateTodayPlan({
    profile,
    dayOffset: selectedDayOffset,
    completedTasksMap,
    calendarTasks,
  });

  const weeklySchedule = generateWeeklyOverview({
    profile,
    completedTasksMap,
    calendarTasks,
  });

  const mix = calculateLearningMix(profile);

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* ─── 1. GOAL & RATIO HERO BANNER (CLEAN & EDUCATIONAL) ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
        isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
              <i className={`fa-solid ${activeCert.icon}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white">
                  Lộ Trình Cá Nhân Hóa: {activeCert.name}
                </h2>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${activeCert.badgeColor}`}>
                  Mục tiêu {profile?.targetScore || activeCert.defaultScore}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Level hiện tại: {activeLevel.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Thời lượng: <strong className="text-slate-700 dark:text-slate-200">{profile?.dailyGoalMin || 45} phút/ngày</strong> •{' '}
                Tần suất: <strong className="text-slate-700 dark:text-slate-200">{profile?.studyDaysPerWeek || 6} ngày/tuần</strong>
                {profile?.examDate && (
                  <>
                    {' '}• Ngày thi dự kiến: <strong className="text-blue-600 dark:text-blue-400">{profile.examDate}</strong>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 self-start md:self-auto ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
            }`}
          >
            <i className="fa-solid fa-sliders text-blue-500" />
            <span>Điều chỉnh Mục Tiêu</span>
          </button>
        </div>

        {/* Foundation + Certification Mixing Bar */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              Nền tảng Cốt lõi (Foundation): <strong>{mix.foundationPercent}%</strong>
            </span>
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
              Luyện thi ({activeCert.shortName}): <strong>{mix.certificationPercent}%</strong>
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${mix.foundationPercent}%` }}
              title={`Foundation: ${mix.foundationPercent}%`}
            />
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${mix.certificationPercent}%` }}
              title={`Certification: ${mix.certificationPercent}%`}
            />
          </div>

          <p className="text-[11px] text-slate-400">
            {mix.phaseName} — {mix.description}
          </p>
        </div>
      </div>

      {/* ─── 2. TODAY'S LEARNING PLAN (KẾ HOẠCH HÔM NAY) ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-list-check text-blue-600" />
              Nhiệm Vụ Học Hôm Nay ({todayPlan.dateKey})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tổng thời lượng: <strong>{todayPlan.totalMinutes} phút</strong> • Đã hoàn thành{' '}
              <strong className="text-emerald-500">{todayPlan.completedCount}/{todayPlan.totalTasks} bài</strong>
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">
            {todayPlan.progressPercent}%
          </span>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {todayPlan.tasks.map((task, idx) => {
            return (
              <div
                key={task.id || idx}
                className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  task.isCompleted
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
                    onClick={() => onToggleTask && onToggleTask(todayPlan.dayNum, task.key)}
                    className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition ${
                      task.isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 text-transparent'
                    }`}
                    title={task.isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                  >
                    <i className="fa-solid fa-check text-xs" />
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${task.badgeColor}`}>
                        <i className={`fa-solid ${task.icon} mr-1 text-[9px]`} />
                        {task.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {task.duration} phút
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        • {task.difficulty}
                      </span>
                    </div>

                    <h4 className={`text-xs md:text-sm font-bold truncate ${
                      task.isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {task.title}
                    </h4>

                    {task.why && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {task.why}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      if (task.actionNav) {
                        onNavigate(task.actionNav.tab, task.actionNav.params);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      task.isCompleted
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    <span>{task.isCompleted ? 'Học lại' : 'Vào Học'}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 3. WEEKLY PLAN OVERVIEW (KẾ HOẠCH TUẦN) ─── */}
      <div className={`p-5 md:p-6 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-calendar-week text-blue-600" />
              Kế Hoạch Học Tuần Này
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phân bổ nhiệm vụ đều đặn {profile?.studyDaysPerWeek || 6} ngày trong tuần
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {weeklySchedule.map((day) => {
            return (
              <div
                key={day.index}
                onClick={() => {
                  const todayIdx = (new Date().getDay() + 6) % 7;
                  setSelectedDayOffset(day.index - todayIdx);
                }}
                className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 transition cursor-pointer hover:border-blue-400 ${
                  day.isToday
                    ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20'
                    : isLight
                    ? 'bg-slate-50/60 border-slate-200'
                    : 'bg-slate-850/60 border-slate-800'
                }`}
                title="Bấm để xem nhiệm vụ ngày này"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                    <span className={day.isToday ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-500'}>
                      {day.dayName}
                    </span>
                    {day.isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-2">
                    {day.dateKey}
                  </span>

                  {day.isStudyDay ? (
                    <div className="space-y-1">
                      {day.plan.tasks.slice(0, 3).map((t, tidx) => (
                        <div
                          key={tidx}
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold truncate bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {t.skill}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-2 text-center text-[10px] text-slate-400 font-semibold italic">
                      Nghỉ ngơi
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{day.isStudyDay ? `${day.plan.totalMinutes}p` : 'Rest'}</span>
                  <span>{day.plan.completedCount}/{day.plan.totalTasks}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
