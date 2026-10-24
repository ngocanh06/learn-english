import React, { useMemo } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import { getRoadmapStartDate } from '../utils/scheduleDateHelper';

export const MASTER_STAGES_METRIC = [
  {
    id: 'stage-1',
    stageNum: 1,
    name: 'Nền Tảng Vững Chắc & Lấy Gốc Căn Bản',
    subName: 'A1 - A2 • Phản xạ từ vựng & phát âm chuẩn IPA',
    daysLabel: 'Chặng 1: Ngày 1 - 25',
    dayRange: [1, 25],
    targetScore: 'A1 - A2 • TOEIC 350 - 500+',
    status: 'current', // 'completed' | 'current' | 'upcoming'
    color: 'emerald',
    icon: 'fa-seedling',
    badge: 'ĐANG HỌC CHẶNG NÀY',
    focus: 'Phủ kín 25 chủ điểm ngữ pháp nền tảng, 1000 từ vựng cốt lõi, phát âm chuẩn IPA và nghe chép chính tả phản xạ.',
    keyMetrics: [
      { label: 'Ngữ pháp', val: '25 Bài nền tảng (Thì, Từ loại, Giới từ)' },
      { label: 'Từ vựng', val: '1000 Từ giao tiếp & Part 1-2' },
      { label: 'Nghe & Nói', val: 'DailyDictation 3 Tracks + Shadowing' },
      { label: 'Mục tiêu', val: 'Vượt mốc 450-500+ điểm' },
    ],
  },
  {
    id: 'stage-2',
    stageNum: 2,
    name: 'Nâng Cấp Kỹ Năng & Giao Tiếp Chuyên Nghiệp',
    subName: 'B1 - B2 • Đọc hiểu tài liệu & Dịch câu phức',
    daysLabel: 'Chặng 2: Ngày 26 - 60',
    dayRange: [26, 60],
    targetScore: 'B1 - B2 • TOEIC 550 - 750+',
    status: 'upcoming',
    color: 'blue',
    icon: 'fa-bolt',
    badge: 'CHẶNG KẾ TIẾP',
    focus: 'Làm chủ câu ghép/phức, câu bị động, điều kiện, mệnh đề quan hệ, 2500 từ vựng công sở và đọc hiểu tài liệu, email báo cáo.',
    keyMetrics: [
      { label: 'Ngữ pháp', val: 'Mệnh đề quan hệ, Bị động, Điều kiện' },
      { label: 'Từ vựng', val: '2500 Từ vựng văn phòng, Email Part 7' },
      { label: 'Thực chiến', val: 'Giải & phân tích chi tiết đề thi' },
      { label: 'Mục tiêu', val: 'Bứt phá mốc 650-750+ điểm' },
    ],
  },
  {
    id: 'stage-3',
    stageNum: 3,
    name: 'Tinh Hoa Ngôn Ngữ & Làm Chủ Thành Thạo',
    subName: 'B2+ - C1 • Tự tin sử dụng tiếng Anh như ngôn ngữ thứ hai',
    daysLabel: 'Chặng 3: Ngày 61 - 90+',
    dayRange: [61, 90],
    targetScore: 'B2+ - C1 • TOEIC 800 - 900+',
    status: 'upcoming',
    color: 'purple',
    icon: 'fa-trophy',
    badge: 'ĐÍCH ĐẾN MỤC TIÊU',
    focus: 'Đảo ngữ, thể giả định, cấu trúc nhấn mạnh, Collocations bản ngữ, đọc hiểu hợp đồng/tin tức và nhại giọng thuyết trình tự nhiên.',
    keyMetrics: [
      { label: 'Ngữ pháp', val: 'Hoàn tất trọn vẹn 115 bài ngữ pháp' },
      { label: 'Từ vựng', val: 'Thành ngữ, Cụm Collocations cao cấp' },
      { label: 'Nghe & Nói', val: 'Shadowing TED Talk & Tốc độ bản xứ' },
      { label: 'Mục tiêu', val: 'Đạt đỉnh 850-900+ • Thành thạo 4 kỹ năng' },
    ],
  },
];

export default function DashboardRoadmapWidget({ onNavigate, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: Completed tasks map from calendar: { [`${dateStr}_${pillarKey}`]: boolean }
  const [completedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const [study4StatusMap] = useUserStorage('study4_status_map_v1', {});

  // Current day in 49 days (Calculated dynamically from roadmap start date)
  const currentDay = useMemo(() => {
    const start = getRoadmapStartDate();
    const today = new Date();
    const diff = Math.round((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.min(49, diff + 1));
  }, []);
  const totalDays = 49;

  // Calculate metrics
  const completedTaskCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length;
  }, [completedTasks]);

  const completedStudy4Count = useMemo(() => {
    return Object.values(study4StatusMap).filter((s) => s === 'Hoàn thành').length;
  }, [study4StatusMap]);

  // Overall roadmap progress pct
  const overallProgressPct = Math.min(
    100,
    Math.round(((currentDay - 1) / totalDays) * 100 + (completedTaskCount > 0 ? 5 : 2))
  );

  return (
    <div
      className={`rounded-xl border p-5 md:p-6 transition-colors font-sans ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-[#111827] border-slate-800'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 font-mono">
              <i className="fa-solid fa-map-location-dot text-blue-600 dark:text-blue-400" />
              Lộ trình 3 giai đoạn
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Kế hoạch 49 ngày (7 tuần)
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cột mốc mục tiêu học tập
          </h2>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <button
            onClick={() => onNavigate && onNavigate('ai-coach', { tab: 'calendar-view' })}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-calendar-check text-xs" />
            <span>Mở Lịch Học</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>
        </div>
      </div>

      {/* Progress Bar & KPI Summary Strip */}
      <div className="py-4 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 flex-wrap font-medium">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Đang học: <strong className="text-blue-600 dark:text-blue-400 font-bold">Ngày 1 / 49</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              Đề thi: <strong className="text-slate-900 dark:text-white">{completedStudy4Count}/10 đề</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              Mục tiêu: <strong className="text-slate-900 dark:text-white">TOEIC 750+</strong>
            </span>
          </div>

          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
            Tiến độ: {overallProgressPct}%
          </span>
        </div>

        {/* Multi-segmented Progress Bar representing 3 Stages */}
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex gap-1 p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full rounded-l-full bg-emerald-500 transition-all"
              style={{ width: '30%' }}
              title="Giai đoạn 1: Ngày 1 - 15"
            />
            <div
              className="h-full bg-slate-300 dark:bg-slate-700 transition-all"
              style={{ width: '40%' }}
              title="Giai đoạn 2: Ngày 16 - 35"
            />
            <div
              className="h-full rounded-r-full bg-slate-300 dark:bg-slate-700 transition-all"
              style={{ width: '30%' }}
              title="Giai đoạn 3: Ngày 36 - 49"
            />
          </div>

          <div className="flex justify-between text-[10px] font-medium text-slate-400 font-mono px-0.5">
            <span>Ngày 1</span>
            <span>Ngày 15</span>
            <span>Ngày 35</span>
            <span>Ngày 49+</span>
          </div>
        </div>
      </div>

      {/* 3 Milestone Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4">
        {MASTER_STAGES_METRIC.map((stg) => {
          const isCurrent = stg.status === 'current';
          return (
            <div
              key={stg.id}
              className={`rounded-lg p-4 border transition-colors flex flex-col justify-between ${
                isCurrent
                  ? isLight
                    ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                    : 'bg-emerald-950/20 border-emerald-800 text-slate-100'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-slate-900/60 border-slate-800 text-slate-200'
              }`}
            >
              {/* Top Tag & Stage Num */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                      isCurrent
                        ? 'bg-emerald-600 text-white'
                        : isLight
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {stg.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {stg.daysLabel}
                  </span>
                </div>

                {/* Title & Target Score */}
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-emerald-600 text-white'
                          : isLight
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <i className={`fa-solid ${stg.icon}`} />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold leading-tight">
                      Giai đoạn {stg.stageNum}: {stg.name}
                    </h3>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 ml-9">
                    Mục tiêu: <strong className="text-blue-600 dark:text-blue-400">{stg.targetScore}</strong>
                  </div>
                </div>

                {/* Key Metrics / Scope List */}
                <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  {stg.keyMetrics.map((km, kIdx) => (
                    <div key={kIdx} className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">{km.label}:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
                        {km.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => onNavigate && onNavigate('ai-coach', { tab: 'calendar-view' })}
                  className={`w-full py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : isLight
                      ? 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                  }`}
                >
                  <span>{isCurrent ? 'Học chặng này' : 'Xem nội dung'}</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
