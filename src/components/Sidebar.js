import React, { useState } from 'react';
import { NAV_ITEMS } from '../config/navigation';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({
  activeNav,
  onNavigate,
  theme,
  toggleTheme,
  bestScore,
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  overdueCount = 0,
}) {
  const isLight = theme === 'light';
  const {
    currentUser,
    isAuthenticated,
    openLogin,
    openRegister,
    logout,
    setUserProfileModalOpen,
  } = useAuth();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const renderNav = (isDrawer = false) => {
    const isMini = !isDrawer && collapsed;

    return (
      <div className="flex flex-col h-full justify-between select-none font-sans">
        {/* Top: Logo & Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden min-h-0 scrollbar-hide">
          {/* Brand Header */}
          <div
            className={`flex items-center transition-all duration-200 border-b ${
              isMini
                ? 'p-3.5 justify-center border-slate-200/80 dark:border-slate-800'
                : 'p-4 px-5 justify-between border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div
              className={`flex items-center gap-3 cursor-pointer group ${isMini ? 'justify-center' : ''}`}
              onClick={() => {
                onNavigate('dashboard');
                if (isDrawer) setMobileOpen(false);
              }}
              title="Về Trang chủ Language Hub"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105 shrink-0">
                <i className="fa-solid fa-graduation-cap text-sm" />
              </div>

              {!isMini && (
                <div className="min-w-0">
                  <h1
                    className={`text-sm font-extrabold tracking-tight leading-none truncate ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Language Hub
                  </h1>
                  <p className="text-[10px] text-slate-400 font-medium leading-none mt-1 truncate">
                    TOEIC &amp; IELTS Academic
                  </p>
                </div>
              )}
            </div>

            {/* Collapse Button on Desktop */}
            {!isDrawer && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  isMini ? 'hidden' : ''
                }`}
                title={collapsed ? 'Mở rộng' : 'Thu gọn'}
              >
                <i
                  className={`fa-solid fa-chevron-left text-[11px] transition-transform duration-200 ${
                    collapsed ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}

            {/* Close button on mobile */}
            {isDrawer && (
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <div className={`py-3 space-y-1 ${isMini ? 'px-2' : 'px-3'}`}>
            {!isMini && (
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Menu
              </div>
            )}

            {NAV_ITEMS.map((item) => {
              const active = activeNav === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      if (isDrawer) setMobileOpen(false);
                    }}
                    className={`w-full flex items-center rounded-xl transition-all duration-200 relative ${
                      isMini ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    } ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <i
                      className={`fa-solid ${item.icon} text-sm shrink-0 w-5 text-center ${
                        active ? 'text-white' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />

                    {!isMini && (
                      <span className="flex-1 text-left text-xs md:text-sm whitespace-nowrap truncate">
                        {item.label}
                      </span>
                    )}

                    {item.id === 'ai-coach' && overdueCount > 0 && !isMini && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-amber-500 text-slate-950 font-mono tracking-tight shrink-0 shadow-xs">
                        {overdueCount} nợ
                      </span>
                    )}
                  </button>

                  {/* Tooltip on Mini Mode */}
                  {isMini && hoveredItem === item.id && (
                    <div
                      className={`absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg border z-50 animate-fadeIn pointer-events-none ${
                        isLight
                          ? 'bg-slate-900 text-white border-slate-800'
                          : 'bg-white text-slate-900 border-slate-200'
                      }`}
                    >
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* IELTS Study Abroad Track Card */}
          {!isMini && (
            <div className="mx-3 my-2 p-3 rounded-2xl bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 flex items-center gap-1">
                  <i className="fa-solid fa-plane-departure text-[9px]" />
                  <span>IELTS Academic</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500 text-slate-950">
                  7.0+ Du Học
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-tight">
                Lộ trình 24 tuần cấp tốc chuẩn Cambridge 12-19.
              </p>
              <button
                onClick={() => {
                  onNavigate('ielts-roadmap');
                  if (isDrawer) setMobileOpen(false);
                }}
                className="w-full py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Mở Lộ Trình IELTS</span>
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </button>
            </div>
          )}

          {isMini && (
            <div className="px-2 my-2 flex justify-center">
              <button
                onClick={() => {
                  onNavigate('ielts-roadmap');
                  if (isDrawer) setMobileOpen(false);
                }}
                className="w-9 h-9 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-500 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Lộ Trình IELTS 7.0+ Du Học"
              >
                <i className="fa-solid fa-plane-departure" />
              </button>
            </div>
          )}

          {/* Minimal Best Score Tag */}
          {bestScore && (
            <div className={`my-2 ${isMini ? 'px-2 flex justify-center' : 'mx-3'}`}>
              {isMini ? (
                <div
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-500 flex items-center justify-center text-xs"
                  title={`Kỷ lục: ${bestScore} điểm`}
                >
                  <i className="fa-solid fa-trophy" />
                </div>
              ) : (
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-trophy text-amber-500 text-xs" />
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Điểm cao nhất
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {bestScore}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom: Theme & Profile */}
        <div
          className={`border-t space-y-2 ${
            isMini
              ? 'p-2 border-slate-200/80 dark:border-slate-800'
              : 'p-3 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          {/* Mini mode expand button */}
          {isMini && !isDrawer && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center"
              title="Mở rộng"
            >
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center rounded-xl text-xs font-medium transition ${
              isMini ? 'p-2.5 justify-center' : 'px-3 py-2 justify-between'
            } ${
              isLight
                ? 'bg-slate-100/70 hover:bg-slate-100 text-slate-700'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
            title={isLight ? 'Giao diện Tối' : 'Giao diện Sáng'}
          >
            <div className="flex items-center gap-2.5">
              <i className={`fa-solid ${isLight ? 'fa-sun text-amber-500' : 'fa-moon text-blue-400'} text-xs`} />
              {!isMini && <span>{isLight ? 'Giao diện Sáng' : 'Giao diện Tối'}</span>}
            </div>
            {!isMini && (
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {isLight ? 'Light' : 'Dark'}
              </span>
            )}
          </button>

          {/* User Account */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`w-full flex items-center rounded-xl transition text-left ${
                  isMini ? 'p-1.5 justify-center' : 'p-2 gap-2.5'
                } ${
                  isLight
                    ? 'hover:bg-slate-100 text-slate-900'
                    : 'hover:bg-slate-800 text-white'
                }`}
                title={currentUser.name}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover shrink-0"
                />
                {!isMini && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {currentUser.username ? `@${currentUser.username} • ` : ''}Target {currentUser.targetScore || 750}+
                      </p>
                    </div>
                    <i className="fa-solid fa-ellipsis text-slate-400 text-xs px-1 shrink-0" />
                  </>
                )}
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                  <div
                    className={`absolute bottom-full mb-2 rounded-2xl border shadow-xl z-50 p-2 animate-fadeIn ${
                      isMini ? 'left-full ml-2 w-52' : 'left-0 w-full'
                    } ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  >
                    <div className="p-2 border-b border-slate-200/80 dark:border-slate-800 mb-1">
                      <p className="text-xs font-bold truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {currentUser.username ? <span className="text-blue-500 font-bold">@{currentUser.username} • </span> : null}
                        {currentUser.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setUserProfileModalOpen(true);
                        if (isDrawer) setMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <i className="fa-solid fa-user-gear text-blue-500" />
                      Hồ Sơ & Mục Tiêu
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        if (isDrawer) setMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    >
                      <i className="fa-solid fa-right-from-bracket" />
                      Đăng Xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={`flex ${isMini ? 'flex-col gap-1' : 'flex-col gap-1.5'}`}>
              <button
                onClick={() => {
                  openLogin();
                  if (isDrawer) setMobileOpen(false);
                }}
                className={`w-full rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                  isMini ? 'p-2' : 'py-2 px-3'
                } ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
                title="Đăng Nhập"
              >
                <i className="fa-solid fa-right-to-bracket text-xs" />
                {!isMini && <span>Đăng Nhập</span>}
              </button>

              {!isMini && (
                <button
                  onClick={() => {
                    openRegister();
                    if (isDrawer) setMobileOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-user-plus text-xs" />
                  Đăng Ký
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─────────────────────────────── */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen z-30 border-r transition-all duration-200 ${
          collapsed ? 'w-[68px]' : 'w-60'
        } ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-slate-950 border-slate-800'
        }`}
      >
        {renderNav(false)}
      </aside>

      {/* ─── MOBILE DRAWER OVERLAY ───────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className={`relative w-72 max-w-[85vw] h-full shadow-2xl border-r z-10 animate-slideRight ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
            }`}
          >
            {renderNav(true)}
          </aside>
        </div>
      )}
    </>
  );
}
