import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
];

export default function UserProfileModal({ theme }) {
  const {
    currentUser,
    userProfileModalOpen,
    setUserProfileModalOpen,
    updateProfile,
  } = useAuth();

  const isLight = theme === 'light';

  const [name, setName] = useState('');
  const [targetScore, setTargetScore] = useState(750);
  const [dailyGoalMin, setDailyGoalMin] = useState(45);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setTargetScore(currentUser.targetScore || 750);
      setDailyGoalMin(currentUser.dailyGoalMin || 45);
      setSelectedAvatar(currentUser.avatar || PRESET_AVATARS[0]);
    }
  }, [currentUser]);

  if (!userProfileModalOpen || !currentUser) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const updates = {
        name,
        targetScore,
        dailyGoalMin,
        avatar: selectedAvatar,
      };

      if (newPassword.trim()) {
        updates.password = newPassword;
      }

      await updateProfile(updates);
      setSuccessMsg('Cập nhật thông tin cá nhân thành công!');
      setNewPassword('');
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Cập nhật thất bại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setUserProfileModalOpen(false)}
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
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/40"
            />
            <div>
              <h2 className="text-sm font-bold leading-tight">{currentUser.name}</h2>
              <p className="text-[10px] text-slate-400 font-medium">
                {currentUser.username ? <span className="text-blue-500 font-bold">@{currentUser.username} • </span> : null}
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setUserProfileModalOpen(false)}
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-sm shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-sm shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                Họ và Tên
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-white'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                  Mục tiêu TOEIC
                </label>
                <select
                  value={targetScore}
                  onChange={(e) => setTargetScore(+e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-blue-500 transition ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                      : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                >
                  <option value={500}>TOEIC 500+</option>
                  <option value={650}>TOEIC 650+</option>
                  <option value={750}>TOEIC 750+</option>
                  <option value={850}>TOEIC 850+</option>
                  <option value={990}>TOEIC 990</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                  Mục tiêu Học/Ngày
                </label>
                <select
                  value={dailyGoalMin}
                  onChange={(e) => setDailyGoalMin(+e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-blue-500 transition ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                      : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                >
                  <option value={15}>15 Phút</option>
                  <option value={30}>30 Phút</option>
                  <option value={45}>45 Phút</option>
                  <option value={60}>60 Phút</option>
                </select>
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

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                Đổi mật khẩu mới (Bỏ trống nếu giữ nguyên)
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-white'
                }`}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                ) : (
                  <i className="fa-solid fa-floppy-disk text-xs" />
                )}
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
