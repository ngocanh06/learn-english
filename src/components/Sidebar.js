import React, { useState } from 'react';
import { NAV_ITEMS } from '../config/navigation';
import { useAuth } from '../context/AuthContext';
import { useUserStorage } from '../hooks/useUserStorage';
import { DEFAULT_USER_LEARNING_PROFILE, CERTIFICATIONS } from '../config/learningCertifications';

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
    syncCloudData,
    isSyncingCloud,
  } = useAuth();
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  const handleSidebarSync = async () => {
    if (isSyncingCloud) return;
    const res = await syncCloudData();
    setSyncStatusMsg(`Đã đồng bộ ${res.pulled + res.pushed > 0 ? `${res.pulled + res.pushed} mục` : 'thành công'}!`);
    setTimeout(() => setSyncStatusMsg(''), 3000);
  };

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [learningProfile] = useUserStorage('user_learning_profile_v1', DEFAULT_USER_LEARNING_PROFILE);
  const activeCert = CERTIFICATIONS.find((c) => c.id === learningProfile?.certification) || CERTIFICATIONS[1];

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
                ? 'p-3.5 justify-center border-slate-200 dark:border-slate-800'
                : 'p-3.5 px-4 justify-between border-slate-200 dark:border-slate-800'
            }`}
          >
            <div
              className={`flex items-center gap-2.5 cursor-pointer group ${isMini ? 'justify-center' : ''}`}
              onClick={() => {
                onNavigate('dashboard');
                if (isDrawer) setMobileOpen(false);
              }}
              title="Về Trang chủ Language Hub"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                <i className="fa-solid fa-graduation-cap text-xs" />
              </div>

              {!isMini && (
                <div className="min-w-0">
                  <h1
                    className={`text-sm font-bold tracking-tight leading-none truncate ${
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
                className={`p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
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
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <div className={`py-2 space-y-0.5 ${isMini ? 'px-2' : 'px-2.5'}`}>
            {!isMini && (
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                    className={`w-full flex items-center rounded-lg transition-colors duration-150 relative cursor-pointer ${
                      isMini ? 'p-2 justify-center' : 'px-2.5 py-2 gap-2.5'
                    } ${
                      active
                        ? 'bg-blue-600 text-white font-semibold'
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
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 font-mono tracking-tight shrink-0">
                        {overdueCount}
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

          {/* Dynamic Active Goal & Certificate Track Card */}
          {!isMini && (
            <div className={`mx-2.5 my-2 p-3 rounded-lg border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1.5">
                  <i className={`fa-solid ${activeCert.icon} text-blue-500 text-xs`} />
                  {activeCert.name}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 shrink-0 font-mono">
                  {learningProfile?.targetScore || activeCert.defaultScore}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-tight line-clamp-2">
                {activeCert.description}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (learningProfile?.certification === 'toeic') {
                      onNavigate('study4-toeic');
                    } else if (learningProfile?.certification === 'ielts') {
                      onNavigate('ielts-roadmap');
                    } else {
                      onNavigate('ai-coach', { tab: 'my-plan' });
                    }
                    if (isDrawer) setMobileOpen(false);
                  }}
                  className="flex-1 py-1.5 px-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Xem Lộ Trình</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </button>
                <button
                  onClick={() => {
                    onNavigate('ai-coach', { tab: 'my-plan' });
                    if (isDrawer) setMobileOpen(false);
                  }}
                  className={`p-1.5 rounded-md border text-xs transition cursor-pointer ${
                    isLight
                      ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                  title="Tùy chỉnh Kế hoạch & Mục tiêu"
                >
                  <i className="fa-solid fa-sliders text-[11px]" />
                </button>
              </div>
            </div>
          )}

          {isMini && (
            <div className="px-2 my-2 flex justify-center">
              <button
                onClick={() => {
                  onNavigate('ielts-roadmap');
                  if (isDrawer) setMobileOpen(false);
                }}
                className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Lộ Trình IELTS 7.0+ Du Học"
              >
                <i className="fa-solid fa-plane-departure" />
              </button>
            </div>
          )}

          {/* Minimal Best Score Tag */}
          {bestScore && (
            <div className={`my-2 ${isMini ? 'px-2 flex justify-center' : 'mx-2.5'}`}>
              {isMini ? (
                <div
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-amber-500 flex items-center justify-center text-xs"
                  title={`Kỷ lục: ${bestScore} điểm`}
                >
                  <i className="fa-solid fa-trophy" />
                </div>
              ) : (
                <div
                  className={`p-2.5 px-3 rounded-lg border flex items-center justify-between ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-trophy text-amber-500 text-xs" />
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Điểm cao nhất
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    {bestScore}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom: Theme & Profile */}
        <div
          className={`border-t space-y-1.5 ${
            isMini
              ? 'p-2 border-slate-200 dark:border-slate-800'
              : 'p-2.5 border-slate-200 dark:border-slate-800'
          }`}
        >
          {/* Mini mode expand button */}
          {isMini && !isDrawer && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center cursor-pointer"
              title="Mở rộng"
            >
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center rounded-lg text-xs font-medium transition cursor-pointer ${
              isMini ? 'p-2 justify-center' : 'px-3 py-1.5 justify-between'
            } ${
              isLight
                ? 'bg-slate-100/70 hover:bg-slate-100 text-slate-700'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
            title={isLight ? 'Giao diện Tối' : 'Giao diện Sáng'}
          >
            <div className="flex items-center gap-2">
              <i className={`fa-solid ${isLight ? 'fa-sun text-amber-500' : 'fa-moon text-blue-400'} text-xs`} />
              {!isMini && <span>{isLight ? 'Giao diện Sáng' : 'Giao diện Tối'}</span>}
            </div>
            {!isMini && (
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {isLight ? 'Light' : 'Dark'}
              </span>
            )}
          </button>

          {/* Cloud Database Sync Button */}
          <button
            onClick={handleSidebarSync}
            disabled={isSyncingCloud}
            className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg border text-xs font-semibold transition cursor-pointer active:scale-95 ${
              isSyncingCloud
                ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-400'
                : isLight
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-700 hover:bg-emerald-100/70'
                : 'bg-emerald-950/20 border-emerald-800 text-emerald-400 hover:bg-emerald-900/30'
            }`}
            title="Đồng bộ Supabase Cloud (Máy tính ⇄ Điện thoại)"
          >
            <div className="flex items-center gap-2">
              <i className={`fa-solid ${isSyncingCloud ? 'fa-arrows-rotate animate-spin text-blue-500' : 'fa-cloud-arrow-up text-emerald-500'} text-xs`} />
              {!isMini && <span>{isSyncingCloud ? 'Đang đồng bộ...' : 'Đồng Bộ Cloud'}</span>}
            </div>
            {!isMini && (
              <span className="text-[10px] font-bold text-emerald-500 uppercase">
                {syncStatusMsg ? '✓ Xong' : 'Realtime'}
              </span>
            )}
          </button>

          {/* User Account */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`w-full flex items-center rounded-lg transition text-left cursor-pointer ${
                  isMini ? 'p-1 justify-center' : 'p-2 gap-2.5'
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
                  className="w-7 h-7 rounded-md object-cover shrink-0"
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
                    className={`absolute bottom-full mb-1.5 rounded-lg border shadow-lg z-50 p-1.5 animate-fadeIn ${
                      isMini ? 'left-full ml-2 w-52' : 'left-0 w-full'
                    } ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  >
                    <div className="p-2 border-b border-slate-200 dark:border-slate-800 mb-1">
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
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                    >
                      <i className="fa-solid fa-user-gear text-blue-500 text-xs" />
                      Hồ Sơ & Mục Tiêu
                    </button>

                    <button
                      onClick={() => {
                        handleSidebarSync();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-emerald-600 dark:text-emerald-400"
                    >
                      <i className="fa-solid fa-cloud-arrow-up text-xs" />
                      Đồng Bộ Cloud Ngay
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        if (isDrawer) setMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
                    >
                      <i className="fa-solid fa-right-from-bracket text-xs" />
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
                className={`w-full rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isMini ? 'p-2' : 'py-1.5 px-3'
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
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
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
            : 'bg-[#0b0f19] border-slate-800'
        }`}
      >
        {renderNav(false)}
      </aside>

      {/* ─── MOBILE DRAWER OVERLAY ───────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className={`relative w-72 max-w-[85vw] h-full shadow-lg border-r z-10 animate-slideRight ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0b0f19] border-slate-800 text-white'
            }`}
          >
            {renderNav(true)}
          </aside>
        </div>
      )}
    </>
  );
}
