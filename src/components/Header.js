import React from 'react';
import { NAV_ITEMS } from '../config/navigation';
import { useAuth } from '../context/AuthContext';
import { useUserStorage } from '../hooks/useUserStorage';
import { DEFAULT_USER_LEARNING_PROFILE, CERTIFICATIONS } from '../config/learningCertifications';

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
  const [learningProfile] = useUserStorage('user_learning_profile_v1', DEFAULT_USER_LEARNING_PROFILE);
  const activeCert = CERTIFICATIONS.find((c) => c.id === learningProfile?.certification) || CERTIFICATIONS[1];
  const currentItem = NAV_ITEMS.find((n) => n.id === activeNav) || NAV_ITEMS[0];

  return (
    <header
      className={`lg:hidden sticky top-0 z-30 border-b select-none transition-colors duration-200 pt-safe-top ${
        isLight
          ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-2xs'
          : 'bg-[#0b0f19]/95 backdrop-blur-md border-slate-800'
      }`}
    >
      <div className="flex items-center justify-between h-14 px-3 sm:px-4 gap-2">
        {/* Left: Hamburger Drawer Menu & Tab Info */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 cursor-pointer transition-colors active:scale-95 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Mở Menu Lộ Trình & Chức Năng"
            aria-label="Mở menu"
          >
            <i className="fa-solid fa-bars text-sm" />
          </button>

          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <i className={`fa-solid ${currentItem.icon} text-xs`} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold truncate leading-tight">
              {currentItem.label}
            </h1>
            <p className="text-[10px] text-slate-400 font-medium truncate leading-tight">
              Language Hub
            </p>
          </div>
        </div>

        {/* Right actions: Goal Badge, Overdue Reminder, Theme & User */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onNavigate('ai-coach', { tab: 'my-plan' })}
            className="px-2 py-1 rounded-md text-[11px] font-semibold border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer"
            title="Kế hoạch học tập"
          >
            <span className="truncate max-w-[70px]">{activeCert.shortName}</span>
          </button>

          {overdueCount > 0 && (
            <button
              onClick={() => onNavigate('ai-coach', { tab: 'calendar-view' })}
              className="px-2 py-1 rounded-md text-[11px] font-bold border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center gap-1 transition cursor-pointer"
              title={`Bạn còn ${overdueCount} nhiệm vụ học bù! Bấm để mở Lịch học.`}
            >
              <i className="fa-solid fa-clock-rotate-left text-[10px]" />
              <span>{overdueCount} nợ</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
            title={isLight ? 'Chế độ Tối' : 'Chế độ Sáng'}
          >
            <i className={`fa-solid ${isLight ? 'fa-moon' : 'fa-sun'}`} />
          </button>

          {isAuthenticated && currentUser ? (
            <button
              onClick={() => setMobileOpen(true)}
              className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="Tài khoản"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
