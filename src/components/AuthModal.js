import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
];

export default function AuthModal({ theme }) {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
  } = useAuth();

  const isLight = theme === 'light';

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetScore, setTargetScore] = useState(750);
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (authModalTab === 'login') {
        if (!loginIdentifier.trim()) {
          throw new Error('Vui lòng nhập Tên đăng nhập hoặc Email!');
        }
        await login(loginIdentifier.trim(), password);
      } else {
        if (!name.trim()) {
          throw new Error('Vui lòng nhập Họ và Tên của bạn!');
        }
        if (!username.trim() || username.trim().length < 3) {
          throw new Error('Tên người dùng phải có ít nhất 3 ký tự!');
        }
        await register({
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          password,
          name: name.trim(),
          targetScore,
          avatar: selectedAvatar,
        });
      }
      setLoginIdentifier('');
      setUsername('');
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi, vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = async (demoEmail, demoPass) => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await login(demoEmail, demoPass);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setAuthModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md max-h-[90vh] flex flex-col my-auto rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Sticky Header with Title & Close Button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm shadow-sm">
              <i className="fa-solid fa-user-shield" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">
                {authModalTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Tạo Tài Khoản Mới'}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Language Hub Platform
              </p>
            </div>
          </div>

          {/* Prominent Close Button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
            title="Đóng cửa sổ"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Tab Switcher */}
          <div
            className={`flex p-1 rounded-xl ${
              isLight ? 'bg-slate-100' : 'bg-slate-800/80'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                authModalTab === 'login'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <i className="fa-solid fa-right-to-bracket mr-1.5" />
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                authModalTab === 'register'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <i className="fa-solid fa-user-plus mr-1.5" />
              Đăng Ký
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-sm shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalTab === 'register' ? (
              <>
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Họ và tên <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Trần Thị Ngọc Anh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                          : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Tên người dùng (Username) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-at absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: ngocanh136"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                          : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Dùng để đăng nhập nhanh, viết liền không dấu</p>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Email học viên <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="email"
                      required
                      placeholder="tranthingocanh136@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                          : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                  Tên đăng nhập hoặc Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <i className="fa-solid fa-user-check absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    placeholder="ngocanh136 hoặc email@example.com"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                Mật khẩu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-9 pr-9 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                      : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            {authModalTab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Mục tiêu TOEIC mong muốn
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[500, 650, 750, 850].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setTargetScore(score)}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                          targetScore === score
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {score}+
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Chọn Ảnh Đại Diện
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAvatar(av)}
                        className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedAvatar === av
                            ? 'border-blue-600 ring-2 ring-blue-500/40 scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition disabled:opacity-50 mt-3"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                  Đang xử lý...
                </>
              ) : authModalTab === 'login' ? (
                <>
                  <i className="fa-solid fa-right-to-bracket text-xs" />
                  Đăng Nhập Ngay
                </>
              ) : (
                <>
                  <i className="fa-solid fa-rocket text-xs" />
                  Tạo Tài Khoản & Bắt Đầu Học
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Accounts */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
              ⚡ Đăng nhập nhanh 1-Click
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Primary User: Tran Thi Ngoc Anh */}
              <button
                type="button"
                onClick={() => handleQuickDemo('ngocanh136', 'ngocanh136')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition col-span-full shadow-xs hover:scale-101 cursor-pointer ${
                  isLight
                    ? 'bg-blue-50/90 border-blue-200 hover:bg-blue-100/80 text-blue-950'
                    : 'bg-blue-950/40 border-blue-700/80 hover:bg-blue-900/50 text-blue-200'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Trần Thị Ngọc Anh"
                  className="w-8 h-8 rounded-xl object-cover shrink-0 ring-2 ring-blue-500/40"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black truncate leading-tight">Trần Thị Ngọc Anh</p>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-mono font-bold">
                      Chính
                    </span>
                  </div>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                    @ngocanh136 • Bấm để đăng nhập ngay 1-chạm
                  </p>
                </div>
                <i className="fa-solid fa-arrow-right text-xs text-blue-500 mr-1" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('hocvien@example.com', '123456')}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900'
                    : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Học viên Demo"
                  className="w-7 h-7 rounded-lg object-cover shrink-0"
                />
                <div className="truncate">
                  <p className="text-xs font-bold truncate leading-tight">Học Viên Demo</p>
                  <p className="text-[10px] text-slate-400">Target 750+</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('teacher@example.com', '123456')}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900'
                    : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Giảng Viên Demo"
                  className="w-7 h-7 rounded-lg object-cover shrink-0"
                />
                <div className="truncate">
                  <p className="text-xs font-bold truncate leading-tight">Thầy Minh TOEIC</p>
                  <p className="text-[10px] text-slate-400">Target 990</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
