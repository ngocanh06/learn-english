import React from 'react';

export default function BottomNav({
  activeNav,
  onNavigate,
  setMobileOpen,
  theme,
  overdueCount = 0,
}) {
  const isLight = theme === 'light';

  const NAV_LINKS = [
    { id: 'dashboard', label: 'Tổng quan', icon: 'fa-house' },
    { id: 'ai-coach', label: 'Lộ trình', icon: 'fa-calendar-check', badge: overdueCount },
    { id: 'vocabulary', label: 'Từ vựng', icon: 'fa-layer-group' },
    { id: 'grammar', label: 'Ngữ pháp', icon: 'fa-book-open' },
  ];

  return (
    <nav
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t select-none transition-colors duration-200 ${
        isLight
          ? 'bg-white border-slate-200 text-slate-700'
          : 'bg-[#0b0f19] border-slate-800 text-slate-300'
      }`}
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto">
        {NAV_LINKS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors relative cursor-pointer ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <i className={`fa-solid ${item.icon} text-base leading-none`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] font-mono leading-none min-w-[14px] text-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight truncate px-1">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More / Menu Drawer Toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center justify-center gap-1 min-h-[44px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-bars text-base leading-none" />
          <span className="text-[11px] leading-tight truncate px-1">
            Mở rộng
          </span>
        </button>
      </div>
    </nav>
  );
}
