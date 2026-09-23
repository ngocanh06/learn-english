import React from 'react';
import { NAV_ITEMS } from '../config/navigation';
import { useAuth } from '../context/AuthContext';

export default function Header({
  activeNav,
  onNavigate,
  theme,
  toggleTheme,
  setMobileOpen,
  overdueCount = 0,
}) {
  const isLight = theme === 'light';
  const { currentUser, isAuthenticated, openLogin } = useAuth();
  const currentItem = NAV_ITEMS.find((n) => n.id === activeNav) || NAV_ITEMS[0];

  return (
    <header
      className={`lg:hidden sticky top-0 z-20 backdrop-blur-xl border-b transition-colors duration-300 ${
        isLight
          ? 'bg-white/90 border-slate-200/90 shadow-sm'
          : 'bg-[#0b0f19]/95 border-slate-800/80'
      }`}
    >
      <div className="flex items-center justify-between h-14 px-4 gap-2">
        {/* Hamburger Menu & Current Tab Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className={`p-2 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Mở Menu"
          >
            <i className="fa-solid fa-bars text-sm" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
              <i className={`fa-solid ${currentItem.icon} text-white text-xs`} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold leading-none">{currentItem.label}</h2>
              <span className="text-[10px] text-slate-400 font-semibold leading-none">
                Language Hub
              </span>
            </div>
          </div>
        </div>

        {/* Right actions: Overdue Bell, Theme & User */}
        <div className="flex items-center gap-2">
          {overdueCount > 0 && (
            <button
              onClick={() => onNavigate('ai-coach', { tab: 'calendar-view' })}
              className="relative p-2 rounded-xl border text-xs bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 transition cursor-pointer"
              title={`Bạn còn ${overdueCount} nhiệm vụ học bù từ các ngày trước! Bấm để mở Lịch học.`}
            >
              <i className="fa-solid fa-bell text-xs animate-bounce" />
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] font-mono shadow-xs">
                {overdueCount}
              </span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border text-xs ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-indigo-600'
                : 'bg-slate-800 border-slate-700 text-amber-400'
            }`}
            title={isLight ? 'Chế độ Tối' : 'Chế độ Sáng'}
          >
            <i className={`fa-solid ${isLight ? 'fa-moon' : 'fa-sun'}`} />
          </button>

          {isAuthenticated && currentUser ? (
            <button
              onClick={() => setMobileOpen(true)}
              className="relative p-0.5 rounded-full ring-2 ring-indigo-500/50"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-sm"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
