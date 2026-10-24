import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getSupabaseCredentials,
  isSupabaseConfigured,
  saveSupabaseCredentials,
  pullAllUserDataFromSupabase,
  pushAllLocalUserDataToSupabase,
  testSupabaseConnection,
  SUPABASE_TABLE_SQL,
} from '../services/supabaseClient';
import {
  exportProgressString,
  importProgressData,
  collectUserData,
  generateProgressSummary,
} from '../services/dataSyncService';

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

  // Modal active tab: 'transfer' | 'cloud' | 'profile'
  const [activeTab, setActiveTab] = useState('transfer');

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
  const [testingConnection, setTestingConnection] = useState(false);

  // Direct Transfer States (Offline Export / Import)
  const [copiedSyncCode, setCopiedSyncCode] = useState(false);
  const [importCodeInput, setImportCodeInput] = useState('');
  const [localStats, setLocalStats] = useState(null);
  const fileInputRef = useRef(null);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshLocalStats = () => {
    if (currentUser) {
      const data = collectUserData(currentUser.id);
      const summary = generateProgressSummary(data);
      setLocalStats(summary);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setTargetScore(currentUser.targetScore || 750);
      setDailyGoalMin(currentUser.dailyGoalMin || 45);
      setSelectedAvatar(currentUser.avatar || PRESET_AVATARS[0]);
      refreshLocalStats();
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

  // Direct Copy Sync Code
  const handleCopySyncCode = () => {
    try {
      const { syncCode, summary } = exportProgressString(currentUser.id, currentUser.name);
      navigator.clipboard.writeText(syncCode);
      setCopiedSyncCode(true);
      setSuccessMsg(`Đã sao chép mã tiến độ (${summary.masteredCount} từ thành thạo, ${summary.goodCount} từ ghi nhớ tốt)! Hãy dán vào thiết bị kia.`);
      setTimeout(() => setCopiedSyncCode(false), 4000);
    } catch (err) {
      setErrorMsg('Không thể sao chép vào bộ nhớ tạm: ' + err.message);
    }
  };

  // Download Backup JSON file
  const handleDownloadBackup = () => {
    try {
      const { rawJson, fileName, summary } = exportProgressString(currentUser.id, currentUser.name);
      const blob = new Blob([rawJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessMsg(`Đã tải file sao lưu (${summary.masteredCount} từ đã thuộc)! Bạn có thể gửi file này qua Zalo/Email sang thiết bị kia.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('Lỗi tạo file sao lưu: ' + err.message);
    }
  };

  // Import from Input Code
  const handleImportSyncCode = () => {
    if (!importCodeInput.trim()) {
      setErrorMsg('Vui lòng dán mã đồng bộ hoặc chọn file JSON sao lưu.');
      return;
    }
    setErrorMsg('');
    try {
      const result = importProgressData(importCodeInput.trim(), currentUser.id);
      refreshLocalStats();
      setSuccessMsg(`🎉 Đồng bộ thành công! Hiện có ${result.summary.masteredCount} từ thành thạo, ${result.summary.goodCount} từ ghi nhớ tốt.`);
      setImportCodeInput('');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Import from Uploaded JSON File
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (typeof content === 'string') {
          const result = importProgressData(content, currentUser.id);
          refreshLocalStats();
          setSuccessMsg(`🎉 Đã nhập file thành công! Máy này đã cập nhật ${result.summary.masteredCount} từ thành thạo.`);
          setTimeout(() => setSuccessMsg(''), 5000);
        }
      } catch (err) {
        setErrorMsg('Lỗi đọc file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Test live connection to Supabase
  const handleTestConnection = async () => {
    setTestingConnection(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await testSupabaseConnection(supabaseUrl, supabaseKey);
      if (res.ok) {
        setSuccessMsg(res.message || 'Kết nối Supabase Cloud Database thành công!');
        setIsConfigured(true);
      } else {
        setErrorMsg(res.error || 'Kết nối thất bại');
        setIsConfigured(false);
      }
    } catch (err) {
      setErrorMsg('Lỗi kiểm tra kết nối: ' + err.message);
      setIsConfigured(false);
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveSupabase = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Supabase Project URL và Anon Public Key!');
      return;
    }

    if (!supabaseUrl.startsWith('https://')) {
      setErrorMsg('Project URL phải bắt đầu bằng https://');
      return;
    }

    // Test first
    setTestingConnection(true);
    const testRes = await testSupabaseConnection(supabaseUrl, supabaseKey);
    setTestingConnection(false);

    if (!testRes.ok) {
      setErrorMsg('Không thể lưu: ' + testRes.error);
      return;
    }

    const ok = saveSupabaseCredentials(supabaseUrl, supabaseKey);
    if (ok) {
      setIsConfigured(true);
      setSuccessMsg('Đã kết nối thành công Supabase Cloud! Đang đồng bộ dữ liệu...');
      try {
        await pushAllLocalUserDataToSupabase(currentUser.id);
        await pullAllUserDataFromSupabase(currentUser.id);
      } catch (e) {}
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
      refreshLocalStats();
      if (count && count > 0) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setUserProfileModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl max-h-[94vh] flex flex-col my-auto rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Sticky Header with Title & Close Button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
            />
            <div>
              <h2 className="text-sm font-bold leading-tight flex items-center gap-2">
                <span>{currentUser.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {currentUser.targetScore ? `Mục tiêu ${currentUser.targetScore}+` : 'Học viên'}
                </span>
              </h2>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                {currentUser.username ? <span className="text-blue-500 font-bold">@{currentUser.username} • </span> : null}
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setUserProfileModalOpen(false)}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition cursor-pointer ${
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
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-3 sm:px-5 pt-1 shrink-0 overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => setActiveTab('transfer')}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === 'transfer'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-bolt text-amber-500 text-xs" />
            <span>Sao Lưu & Đồng Bộ Nhanh</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/15 text-emerald-600 font-bold">
              Tiện nhất
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloud')}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === 'cloud'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-cloud-arrow-up text-xs text-blue-500" />
            <span>Cloud Realtime (Supabase)</span>
            {isConfigured && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Đã cấu hình" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-bold border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-user-gear text-xs" />
            <span>Thông Tin Cá Nhân</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4">
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

          {/* TAB 1: FAST DIRECT TRANSFER & BACKUP (OFFLINE / ONE-CLICK SYNC) */}
          {activeTab === 'transfer' && (
            <div className="space-y-4">
              {/* Local Device Current Stats Card */}
              {localStats && (
                <div
                  className={`p-3.5 rounded-2xl border ${
                    isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Dữ liệu hiện có trên thiết bị này:
                    </span>
                    <button
                      type="button"
                      onClick={refreshLocalStats}
                      className="text-[11px] text-blue-500 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      <i className="fa-solid fa-rotate text-[10px]" /> Làm mới
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Thành thạo (L4)</span>
                      <span className="text-base font-black font-mono text-emerald-500">{localStats.masteredCount}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Ghi nhớ tốt (L3)</span>
                      <span className="text-base font-black font-mono text-purple-500">{localStats.goodCount}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Đang học (L2)</span>
                      <span className="text-base font-black font-mono text-blue-500">{localStats.learningCount}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Chuỗi ngày</span>
                      <span className="text-base font-black font-mono text-amber-500">{localStats.streak}d</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION SECTION 1: EXPORT FROM THIS DEVICE */}
              <div
                className={`p-4 rounded-2xl border space-y-2.5 ${
                  isLight ? 'bg-indigo-50/40 border-indigo-200/80' : 'bg-indigo-950/20 border-indigo-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      XUẤT DỮ LIỆU TỪ MÁY NÀY (ĐIỆN THOẠI ➔ MÁY TÍNH)
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Bấm sao chép mã hoặc tải file để mang toàn bộ từ vựng đã thuộc sang thiết bị khác.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopySyncCode}
                    className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <i className={`fa-solid ${copiedSyncCode ? 'fa-check' : 'fa-copy'} text-xs`} />
                    <span>{copiedSyncCode ? '✓ Đã Sao Chép Mã!' : 'Sao Chép Mã Tiến Độ'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                    }`}
                  >
                    <i className="fa-solid fa-download text-xs" />
                    <span>Tải File Sao Lưu (.json)</span>
                  </button>
                </div>
              </div>

              {/* ACTION SECTION 2: IMPORT ON TARGET DEVICE */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  isLight ? 'bg-emerald-50/40 border-emerald-200/80' : 'bg-emerald-950/20 border-emerald-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      NHẬP DỮ LIỆU TỪ MÁY KHÁC VÀO ĐÂY
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Dán mã tiến độ đã sao chép từ điện thoại vào ô bên dưới rồi bấm Đồng Bộ:
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Dán mã bắt đầu bằng LE_SYNC_V1... hoặc dán nội dung file JSON vào đây"
                    value={importCodeInput}
                    onChange={(e) => setImportCodeInput(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 transition ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleImportSyncCode}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <i className="fa-solid fa-bolt text-xs" />
                      <span>Đồng Bộ Tiến Độ Vào Máy Này</span>
                    </button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json,text/plain"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                      }`}
                      title="Chọn file .json từ máy"
                    >
                      <i className="fa-solid fa-folder-open text-xs text-amber-500" />
                      <span>Chọn File</span>
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  * Cơ chế Smart-Merge tự động: Giữ cấp độ học cao nhất của từng từ vựng (Level 4 & 3), không bao giờ bị ghi đè làm mất từ đã học.
                </p>
              </div>
            </div>
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
                      {isConfigured ? '🟢 Realtime Cloud: Đã kết nối Supabase' : '⚪ Chưa kết nối Cloud Database'}
                    </h4>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {isConfigured
                        ? 'Dữ liệu học từ vựng sẽ nhảy số tức thì (<100ms) giữa Máy tính & Điện thoại.'
                        : 'Tạo tài khoản Supabase miễn phí và nhập URL để tự động đồng bộ Realtime mọi lúc mọi nơi.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={testingConnection}
                  onClick={handleTestConnection}
                  className="px-2.5 py-1.5 rounded-xl border text-[11px] font-bold shrink-0 transition cursor-pointer bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700"
                >
                  {testingConnection ? (
                    <i className="fa-solid fa-spinner fa-spin text-xs" />
                  ) : (
                    'Kiểm tra kết nối'
                  )}
                </button>
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
                    disabled={testingConnection}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
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
                    Thao tác đồng bộ thủ công với Supabase:
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

          {/* TAB 3: USER PROFILE FORM */}
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
        </div>
      </div>
    </div>
  );
}
