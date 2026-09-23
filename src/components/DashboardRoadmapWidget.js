import React, { useMemo } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';

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

  // Current day in 49 days (Calculated dynamically from 01/09/2026)
  const currentDay = useMemo(() => {
    const start = new Date(2026, 8, 1);
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
      className={`rounded-3xl border p-6 md:p-7 shadow-xs transition-all relative overflow-hidden font-sans ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-slate-100/50'
          : 'bg-slate-900 border-slate-800 shadow-slate-950/40'
      }`}
    >
      {/* Top Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 flex items-center gap-1.5 font-mono">
              <i className="fa-solid fa-map-location-dot text-blue-600 dark:text-blue-400" />
              Lộ Trình Tổng Thể & Thước Đo Cột Mốc
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
              49 Ngày Thực Chiến (7 Tuần)
            </span>
          </div>
          <h2 className={`text-xl md:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Bức Tranh Tổng Quan 3 Giai Đoạn (Milestones Framework)
          </h2>
          <p className={`text-xs md:text-sm max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Hệ thống quy hoạch toàn bộ việc học thành 3 chặng mốc rõ ràng: Đo lường từ lúc lấy gốc (450+), tăng tốc phá bẫy đề (650+) đến thực chiến bứt phá (850+).
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <button
            onClick={() => onNavigate && onNavigate('ai-coach', { tab: 'calendar-view' })}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <i className="fa-solid fa-calendar-check" />
            <span>Mở Lịch Học Chi Tiết</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>
        </div>
      </div>

      {/* Progress Bar & KPI Summary Strip */}
      <div className="relative z-10 py-5 border-b border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 flex-wrap font-bold">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Vị trí hiện tại: <strong className="text-blue-600 dark:text-blue-400 font-black">Ngày 1 / 49</strong> (Chặng 1)
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              DailyDictation: <strong className="text-slate-900 dark:text-white">290 bài</strong> đã nghe
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Đề Study4: <strong className="text-slate-900 dark:text-white">{completedStudy4Count}/10 đề</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              Mục tiêu cuối: <strong className="text-purple-600 dark:text-purple-400">TOEIC 750 - 850+</strong>
            </span>
          </div>

          <span className="font-mono font-black text-blue-600 dark:text-blue-400">
            Tiến độ tổng thể: {overallProgressPct}%
          </span>
        </div>

        {/* Multi-segmented Progress Bar representing 3 Stages */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex gap-1 p-0.5 border border-slate-200 dark:border-slate-700">
            {/* Stage 1 Segment (Days 1-15: ~30%) */}
            <div
              className="h-full rounded-l-full bg-emerald-500 relative transition-all"
              style={{ width: '30%' }}
              title="Giai đoạn 1: Ngày 1 - 15"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>

            {/* Stage 2 Segment (Days 16-35: ~40%) */}
            <div
              className="h-full bg-slate-300 dark:bg-slate-700/60 relative transition-all"
              style={{ width: '40%' }}
              title="Giai đoạn 2: Ngày 16 - 35"
            />

            {/* Stage 3 Segment (Days 36-49: ~30%) */}
            <div
              className="h-full rounded-r-full bg-slate-300 dark:bg-slate-700/60 relative transition-all"
              style={{ width: '30%' }}
              title="Giai đoạn 3: Ngày 36 - 49"
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono px-1">
            <span>Ngày 1 (Khởi động)</span>
            <span>Ngày 15 (Mốc 450+)</span>
            <span>Ngày 35 (Mốc 650+)</span>
            <span>Ngày 49+ (Đích 800-850+)</span>
          </div>
        </div>
      </div>

      {/* 3 Milestone Phase Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        {MASTER_STAGES_METRIC.map((stg) => {
          const isCurrent = stg.status === 'current';
          return (
            <div
              key={stg.id}
              className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-lg ${
                isCurrent
                  ? isLight
                    ? 'bg-gradient-to-br from-emerald-50 via-white to-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                    : 'bg-gradient-to-br from-emerald-950/50 via-slate-900/95 to-slate-900 border-emerald-500/70 shadow-lg ring-2 ring-emerald-500/20'
                  : stg.stageNum === 2
                  ? isLight
                    ? 'bg-gradient-to-br from-blue-50/50 via-white to-white border-blue-200/80 hover:border-blue-400'
                    : 'bg-gradient-to-br from-blue-950/30 via-slate-900/90 to-slate-900 border-slate-800 hover:border-blue-500/50'
                  : isLight
                  ? 'bg-gradient-to-br from-purple-50/50 via-white to-white border-purple-200/80 hover:border-purple-400'
                  : 'bg-gradient-to-br from-purple-950/30 via-slate-900/90 to-slate-900 border-slate-800 hover:border-purple-500/50'
              }`}
            >
              {/* Top Tag & Stage Num */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider font-mono ${
                      isCurrent
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xs'
                        : stg.stageNum === 2
                        ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {stg.badge}
                  </span>
                  <span className="text-[11px] font-extrabold font-mono text-slate-400">
                    {stg.daysLabel}
                  </span>
                </div>

                {/* Title & Target Score */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-sm ${
                        isCurrent
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-emerald-500/25'
                          : stg.stageNum === 2
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/25'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-purple-500/25'
                      }`}
                    >
                      <i className={`fa-solid ${stg.icon}`} />
                    </div>
                    <h3 className={`text-sm font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Giai Đoạn {stg.stageNum}: {stg.name}
                    </h3>
                  </div>
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 font-mono mt-1.5 ml-10.5">
                    Target: <span className="text-amber-500 dark:text-amber-400 font-black">{stg.targetScore}</span>
                  </div>
                </div>

                {/* Focus description */}
                <p className={`text-xs leading-relaxed pt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {stg.focus}
                </p>

                {/* Key Metrics / Scope List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/70 dark:border-slate-800/80 text-[11px]">
                  {stg.keyMetrics.map((km, kIdx) => (
                    <div key={kIdx} className="flex items-center justify-between gap-2">
                      <span className="text-slate-400 font-medium">{km.label}:</span>
                      <strong className="text-slate-700 dark:text-slate-200 font-bold truncate">
                        {km.val}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  onClick={() => onNavigate && onNavigate('ai-coach', { tab: 'calendar-view' })}
                  className={`w-full py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{isCurrent ? 'Học Chặng Này Ngay ➔' : 'Xem Nội Dung Chặng'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
