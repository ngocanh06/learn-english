import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getSupabaseCredentials,
  isSupabaseConfigured,
  saveSupabaseCredentials,
  pullAllUserDataFromSupabase,
  pushAllLocalUserDataToSupabase,
  SUPABASE_TABLE_SQL,
} from '../services/supabaseClient';

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

  // Modal active tab: 'profile' | 'cloud'
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form States
  const [name, setName] = useState('');
  const [targetScore, setTargetScore] = useState(750);
  const [dailyGoalMin, setDailyGoalMin] = useState(45);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Cloud Database (Supabase) States
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

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

    const creds = getSupabaseCredentials();
    setSupabaseUrl(creds.url);
    setSupabaseKey(creds.anonKey);
    setIsConfigured(isSupabaseConfigured());
  }, [currentUser, userProfileModalOpen]);

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

  const handleSaveSupabase = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Supabase Project URL và Anon Public Key!');
      return;
    }

    if (!supabaseUrl.startsWith('http')) {
      setErrorMsg('Project URL phải bắt đầu bằng https://');
      return;
    }

    const ok = saveSupabaseCredentials(supabaseUrl, supabaseKey);
    if (ok) {
      setIsConfigured(true);
      setSuccessMsg('Đã lưu kết nối Supabase Cloud Database! Đang đồng bộ...');
      pullAllUserDataFromSupabase(currentUser.id);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg('Không thể lưu thông tin cấu hình.');
    }
  };

  const handleCopySql = () => {
    try {
      navigator.clipboard.writeText(SUPABASE_TABLE_SQL);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 3000);
    } catch (e) {}
  };

  const handlePushAll = async () => {
    setSyncLoading(true);
    setErrorMsg('');
    try {
      const count = await pushAllLocalUserDataToSupabase(currentUser.id);
      setSuccessMsg(`Đã tải lên Cloud thành công ${count} mục dữ liệu từ thiết bị này!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (e) {
      setErrorMsg('Tải lên Cloud thất bại: ' + (e.message || 'Lỗi kết nối'));
    } finally {
      setSyncLoading(false);
    }
  };

  const handlePullAll = async () => {
    setSyncLoading(true);
    setErrorMsg('');
    try {
      const count = await pullAllUserDataFromSupabase(currentUser.id);
      if (count !== null) {
        setSuccessMsg(`Đã đồng bộ thành công ${count} mục dữ liệu mới nhất từ Cloud về máy này!`);
      } else {
        setSuccessMsg('Đã kiểm tra Cloud. Dữ liệu trên máy này đã là mới nhất!');
      }
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (e) {
      setErrorMsg('Kéo dữ liệu Cloud thất bại: ' + (e.message || 'Lỗi kết nối'));
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setUserProfileModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg max-h-[92vh] flex flex-col my-auto rounded-xl border shadow-lg overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Sticky Header with Title & Close Button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
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
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
            title="Đóng cửa sổ"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-5 pt-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-user-gear text-xs" />
            <span>Thông Tin Cá Nhân</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloud')}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'cloud'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-cloud-arrow-up text-xs text-emerald-500" />
            <span>Đồng Bộ Cloud (Supabase)</span>
            {isConfigured && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Đang kết nối Realtime" />
            )}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <i className="fa-solid fa-circle-check text-sm shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <i className="fa-solid fa-circle-exclamation text-sm shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: USER PROFILE FORM */}
          {activeTab === 'profile' && (
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
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-blue-500 transition cursor-pointer ${
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
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-blue-500 transition cursor-pointer ${
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
                      className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
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
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
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
          )}

          {/* TAB 2: SUPABASE CLOUD DATABASE REALTIME SYNC */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              {/* Connection Status Card */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isConfigured
                    ? isLight
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                    : isLight
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                    : 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                      isConfigured
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    <i className={`fa-solid ${isConfigured ? 'fa-bolt' : 'fa-circle-question'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black">
                      {isConfigured ? '🟢 Realtime Cloud: Đang kết nối' : '⚪ Chưa kết nối Cloud Database'}
                    </h4>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {isConfigured
                        ? 'Dữ liệu học từ vựng sẽ nhảy số tức thì (<100ms) giữa Máy tính & Điện thoại.'
                        : 'Kết nối Supabase miễn phí để tự động đồng bộ tiến độ học giữa mọi thiết bị.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Credential Setup Form */}
              <form onSubmit={handleSaveSupabase} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://xyzcompany.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-blue-500 transition ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">
                    Supabase Anon Public Key (anon / public)
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-blue-500 transition ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-floppy-disk text-xs" />
                    <span>Lưu Cấu Hình & Kết Nối</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySql}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      copiedSql
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                    title="Sao chép câu lệnh tạo bảng SQL vào clipboard để dán vào Supabase SQL Editor"
                  >
                    <i className={`fa-solid ${copiedSql ? 'fa-check' : 'fa-code'} text-xs`} />
                    <span>{copiedSql ? 'Đã chép SQL!' : 'Copy SQL tạo bảng'}</span>
                  </button>
                </div>
              </form>

              {/* Manual One-Click Synchronization Controls */}
              {isConfigured && (
                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400">
                    Thao tác đồng bộ thủ công (Force Sync):
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={syncLoading}
                      onClick={handlePushAll}
                      className="py-2 px-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                    >
                      <i className="fa-solid fa-cloud-arrow-up text-xs" />
                      <span>Đẩy máy này lên Cloud</span>
                    </button>

                    <button
                      type="button"
                      disabled={syncLoading}
                      onClick={handlePullAll}
                      className="py-2 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                    >
                      <i className="fa-solid fa-cloud-arrow-down text-xs" />
                      <span>Kéo Cloud về máy này</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Setup Guide Accordion */}
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 text-blue-500">
                  <i className="fa-solid fa-circle-info" />
                  <span>3 Bước Tạo Database Supabase Miễn Phí (1 Phút):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  <li>Truy cập <strong className="text-slate-800 dark:text-slate-200">supabase.com</strong> (Đăng ký tài khoản miễn phí và tạo New Project).</li>
                  <li>Vào mục <strong className="text-slate-800 dark:text-slate-200">SQL Editor</strong> bên trái ➔ Bấm nút <em>"Copy SQL tạo bảng"</em> ở trên ➔ Dán vào và bấm <strong className="text-emerald-500">Run</strong>.</li>
                  <li>Vào <strong className="text-slate-800 dark:text-slate-200">Project Settings ➔ API</strong> ➔ Copy <strong className="text-blue-500">Project URL</strong> và <strong className="text-blue-500">anon public key</strong> dán vào ô bên trên rồi bấm Lưu!</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
