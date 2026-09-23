import React, { useState } from 'react';
import { MASTER_STAGES_METRIC } from './DashboardRoadmapWidget';
import { useUserStorage } from '../hooks/useUserStorage';

const TOEIC_TEST_MILESTONES = [
  { id: 't1', num: 1, name: 'Test 1', stage: 'Chặng 1', day: 1, date: '01/09/2026', target: 'Mốc khởi đầu (250-400)', note: 'Đo mốc năng lực ban đầu' },
  { id: 't2', num: 2, name: 'Test 2', stage: 'Chặng 1', day: 5, date: '05/09/2026', target: '≥ 450 điểm', note: 'Chữa chi tiết bẫy Part 3-4 & 5' },
  { id: 't3', num: 3, name: 'Test 3', stage: 'Chặng 2', day: 10, date: '10/09/2026', target: '≥ 520 điểm', note: 'Bắt đầu bấm giờ chuẩn' },
  { id: 't4', num: 4, name: 'Test 4', stage: 'Chặng 2', day: 17, date: '17/09/2026', target: '≥ 600 điểm', note: 'Tăng tốc đọc hiểu Part 7' },
  { id: 't5', num: 5, name: 'Test 5', stage: 'Chặng 2', day: 24, date: '24/09/2026', target: '≥ 650 điểm', note: 'Chống bẫy suy luận đoạn đôi' },
  { id: 't6', num: 6, name: 'Test 6', stage: 'Chặng 2', day: 31, date: '01/10/2026', target: '≥ 700 điểm', note: 'Tổng kết Chặng 2 bứt phá' },
  { id: 't7', num: 7, name: 'Test 7', stage: 'Chặng 3', day: 36, date: '06/10/2026', target: '≥ 750 điểm', note: 'Áp lực phòng thi thật 120p' },
  { id: 't8', num: 8, name: 'Test 8', stage: 'Chặng 3', day: 40, date: '10/10/2026', target: '≥ 780 điểm', note: 'Tối ưu hóa câu khó 800+' },
  { id: 't9', num: 9, name: 'Test 9', stage: 'Chặng 3', day: 44, date: '14/10/2026', target: '≥ 820 điểm', note: 'Lọc toàn bộ câu sai' },
  { id: 't10', num: 10, name: 'Test 10', stage: 'Chặng 3', day: 48, date: '18/10/2026', target: '≥ 850+ điểm', note: 'Đích đến thực chiến cuối cùng' },
];

export default function ScheduleRoadmapSidePanel({
  currentDate,
  onSelectDate,
  onOpenMasterRoadmap,
  onOpenStudy4Roadmap,
  completedTasks = {},
  theme = 'dark',
}) {
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState('stages'); // 'stages' | 'tests'
  const [activeTestNum] = useUserStorage('study4_active_test_num_v1', 2);
  const [study4StatusMap] = useUserStorage('study4_status_map_v1', {
    1: 'Hoàn thành',
    2: 'Hoàn thành',
    3: 'Hoàn thành',
    4: 'Hoàn thành',
  });

  return (
    <div
      className={`rounded-2xl border p-4 md:p-5 space-y-4 transition-all shadow-xs font-sans sticky top-4 ${
        isLight
          ? 'bg-white border-slate-200/90 text-slate-900 shadow-slate-100/50'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
              isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-950/50 text-blue-400'
            }`}
          >
            <i className="fa-solid fa-map" />
          </span>
          <div>
            <h3 className="font-extrabold text-xs leading-tight text-slate-900 dark:text-white">
              Lộ Trình Tổng Quan
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              3 Chặng & 10 Đề thi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenStudy4Roadmap && (
            <button
              onClick={onOpenStudy4Roadmap}
              className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              title="Mở bảng 49 buổi Study4"
            >
              <span>49 Buổi Study4</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[8px]" />
            </button>
          )}
          <button
            onClick={onOpenMasterRoadmap}
            className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            title="Xem toàn bộ lộ trình"
          >
            <span>Tất cả</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[8px]" />
          </button>
        </div>
      </div>

      {/* Mini Segmented Tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-xs font-bold">
        <button
          onClick={() => setActiveTab('stages')}
          className={`py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'stages'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-layer-group text-[10px]" />
          <span>3 Giai Đoạn</span>
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'tests'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-file-signature text-[10px]" />
          <span>10 Bài Test</span>
        </button>
      </div>

      {/* ─── TAB 1: 3 GIAI ĐOẠN LỚN (3 MASTER PHASES) ──────────────── */}
      {activeTab === 'stages' && (
        <div className="space-y-2.5">
          {MASTER_STAGES_METRIC.map((stg) => {
            const isCurrent = stg.status === 'current';
            return (
              <div
                key={stg.id}
                className={`p-3 rounded-xl border transition-all duration-200 relative group ${
                  isCurrent
                    ? isLight
                      ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                      : 'bg-blue-950/20 border-blue-800/60 shadow-xs'
                    : isLight
                    ? 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-50'
                    : 'bg-slate-800/30 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                {/* Header Stage */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    GIAI ĐOẠN {stg.stageNum}
                  </span>

                  <span className="text-[10px] font-medium font-mono text-slate-400">
                    {stg.daysLabel.split(' ')[0]} {stg.daysLabel.split(' ')[1]}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {stg.name}
                </h4>

                <div className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                  Target: {stg.targetScore}
                </div>

                {/* Mini Focus text */}
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug mt-1 line-clamp-2">
                  {stg.focus}
                </p>

                {/* Jump to Stage Button */}
                <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">
                    {stg.stageNum === 1 ? 'Test 1 & Test 2' : stg.stageNum === 2 ? 'Test 3 - Test 6' : 'Test 7 - Test 10'}
                  </span>

                  {onSelectDate && (
                    <button
                      onClick={() => {
                        const dayToJump = stg.stageNum === 1 ? 1 : stg.stageNum === 2 ? 26 : 6;
                        const monthToJump = stg.stageNum === 1 ? 8 : stg.stageNum === 2 ? 8 : 9;
                        onSelectDate(new Date(2026, monthToJump, dayToJump));
                      }}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Xem ngày</span>
                      <i className="fa-solid fa-arrow-right text-[8px]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── TAB 2: CHECKLIST 10 BÀI TEST STUDY4 ───────────────────── */}
      {activeTab === 'tests' && (
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {TOEIC_TEST_MILESTONES.map((t) => {
            const isDone = t.num < (activeTestNum || 2) || study4StatusMap[t.day] === 'Hoàn thành';
            const isCurrent = t.num === (activeTestNum || 2);

            return (
              <div
                key={t.id}
                onClick={() => {
                  if (onSelectDate && t.date) {
                    const [d, m, y] = t.date.split('/');
                    onSelectDate(new Date(+y, +m - 1, +d));
                  }
                }}
                title="Bấm để xem nhiệm vụ ngày này trên lịch"
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isCurrent
                    ? isLight
                      ? 'bg-blue-50/60 border-blue-300 ring-1 ring-blue-400/20'
                      : 'bg-blue-950/30 border-blue-700/50'
                    : isLight
                    ? 'bg-slate-50/50 border-slate-200 hover:bg-white'
                    : 'bg-slate-800/30 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isDone ? <i className="fa-solid fa-check" /> : t.num}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-black text-xs text-slate-900 dark:text-white leading-tight">
                        {t.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        ({t.date.split('/')[0]}/{t.date.split('/')[1]})
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
                      {t.target}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 font-mono ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : isCurrent
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? 'Đã xong' : isCurrent ? 'Hiện tại' : 'Chưa làm'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom KPI Card */}
      <div
        className={`p-4 rounded-2xl border space-y-2.5 text-xs ${
          isLight ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-950/60 border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between font-bold">
          <span className="text-slate-500 dark:text-slate-400">Tiến độ hôm nay:</span>
          <span className="text-blue-600 dark:text-blue-400 font-mono font-black">
            Ngày 1 / 49
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-slate-600 dark:text-slate-300">DailyDictation:</span>
            <strong className="text-slate-900 dark:text-white font-mono">290 / 350 bài</strong>
          </div>
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-slate-600 dark:text-slate-300">Mục tiêu TOEIC:</span>
            <strong className="text-purple-600 dark:text-purple-400 font-mono">750 - 850+</strong>
          </div>
        </div>

        {/* Quick button to jump to today */}
        <button
          onClick={() => onSelectDate && onSelectDate(new Date())}
          className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <i className="fa-solid fa-calendar-day" />
          <span>Về Ngày Hôm Nay</span>
        </button>
      </div>
    </div>
  );
}
