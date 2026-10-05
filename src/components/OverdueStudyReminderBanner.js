import React, { useState } from 'react';

export default function OverdueStudyReminderBanner({
  overdueData,
  onNavigate,
  onSelectDate,
  onToggleTaskDone,
  theme = 'dark',
  compact = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const isLight = theme === 'light';

  const {
    overdueTasks = [],
    overdueGroupedByDate = [],
    totalOverdueCount = 0,
    overdueDaysCount = 0,
  } = overdueData || {};

  // If no overdue tasks, display encouragement or return null if compact
  if (totalOverdueCount === 0) {
    if (compact) return null;
    return (
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-medium transition-all ${
          isLight
            ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-800'
            : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-circle-check text-sm" />
          </div>
          <div>
            <p className="font-black text-sm">Tuyệt vời! Bạn không nợ bài học nào từ các ngày trước</p>
            <p className="opacity-80 text-[11px]">Tất cả nhiệm vụ trước đó đã hoàn tất. Hãy tiếp tục duy trì phong độ cho hôm nay nhé!</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase font-mono tracking-wider shrink-0">
          100% Kịp tiến độ
        </span>
      </div>
    );
  }

  // Get most recent overdue task for 1-click CTA
  const firstOverdue = overdueTasks[0];

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 relative overflow-hidden shadow-xs ${
        isLight
          ? 'bg-amber-50/70 border-amber-200/90 text-slate-800'
          : 'bg-amber-950/25 border-amber-800/40 text-slate-100'
      }`}
    >
      {/* Top Banner Header Strip - Compact & Sleek */}
      <div className="px-4 py-2.5 md:py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Left Content */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-clock-rotate-left text-xs md:text-sm" />
          </div>

          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 font-mono flex items-center gap-1 shrink-0">
              <i className="fa-solid fa-bell text-[8px]" />
              Học Bù
            </span>
            <span className={`text-xs md:text-sm font-extrabold truncate ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
              Bạn còn <span className="text-amber-500 font-black">{totalOverdueCount} bài</span> chưa xong ({overdueDaysCount} ngày trước)
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {firstOverdue && (
            <button
              type="button"
              onClick={() => {
                if (firstOverdue.actionNav) {
                  onNavigate && onNavigate(firstOverdue.actionNav.tab, firstOverdue.actionNav.params);
                } else if (onSelectDate) {
                  onSelectDate(firstOverdue.dateObj);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98"
            >
              <i className="fa-solid fa-play text-[9px]" />
              <span>Học bù bài gần nhất</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-amber-200 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            <span>{expanded ? 'Thu gọn' : `Xem chi tiết (${totalOverdueCount})`}</span>
            <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'} text-[9px] transition-transform`} />
          </button>
        </div>
      </div>

      {/* Expanded Overdue Tasks List */}
      {expanded && (
        <div className={`border-t px-5 md:px-6 py-5 space-y-5 animate-fadeIn ${
          isLight ? 'border-amber-200/80 bg-white/70' : 'border-slate-800 bg-slate-950/40'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 pb-1">
            <span>Chi tiết các bài cần học bù (Xếp theo ngày gần nhất):</span>
            <span className="font-mono text-[11px]">{totalOverdueCount} nhiệm vụ</span>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {overdueGroupedByDate.map((group) => (
              <div
                key={group.dateKey}
                className={`p-4 rounded-2xl border transition-all ${
                  isLight
                    ? 'bg-white border-amber-200/70 shadow-2xs'
                    : 'bg-slate-900 border-slate-800 shadow-2xs'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span className="font-black text-xs md:text-sm text-slate-900 dark:text-white">
                      {group.isYesterday ? 'Hôm qua' : group.dowLabel} ({group.dateKey}) • Ngày {group.dayNum}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono">
                      Còn {group.tasks.length} bài
                    </span>
                  </div>

                  {onSelectDate && (
                    <button
                      type="button"
                      onClick={() => onSelectDate(group.dateObj)}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <i className="fa-solid fa-calendar-day text-[10px]" />
                      <span>Xem ngày này trên Lịch</span>
                    </button>
                  )}
                </div>

                {/* Tasks in this day */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {group.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isLight
                          ? 'bg-slate-50/80 border-slate-200/80 hover:border-amber-300'
                          : 'bg-slate-850/60 border-slate-750 hover:border-amber-700/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <i className={`${task.icon} text-xs`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider truncate">
                              {task.category}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {task.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {task.detail}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        {task.actionNav && (
                          <button
                            type="button"
                            onClick={() => {
                              onNavigate && onNavigate(task.actionNav.tab, task.actionNav.params);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] transition cursor-pointer flex items-center gap-1 shadow-xs"
                            title="Học bù ngay"
                          >
                            <span>Học bù</span>
                            <i className="fa-solid fa-arrow-right text-[9px]" />
                          </button>
                        )}

                        {onToggleTaskDone && (
                          <button
                            type="button"
                            onClick={() => onToggleTaskDone(task.dateKey, task.pillarKey)}
                            className="p-1.5 px-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-[11px] transition cursor-pointer"
                            title="Đã làm bài này rồi? Bấm để đánh dấu hoàn thành"
                          >
                            <i className="fa-solid fa-check" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
