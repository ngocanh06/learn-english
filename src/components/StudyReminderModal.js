import React, { useState } from 'react';
import { useStudyReminder } from '../hooks/useStudyReminder';

const TIME_PRESETS = [
  { label: '07:30 Sáng', time: '07:30', desc: 'Khởi động ngày mới', icon: 'fa-sun' },
  { label: '12:30 Trưa', time: '12:30', desc: 'Tranh thủ nghỉ trưa', icon: 'fa-cloud-sun' },
  { label: '20:00 Tối', time: '20:00', desc: 'Khung giờ vàng học tập', icon: 'fa-moon' },
  { label: '21:30 Đêm', time: '21:30', desc: 'Ôn tập trước khi ngủ', icon: 'fa-bed' },
];

export default function StudyReminderModal({ isOpen, onClose, theme = 'dark' }) {
  const isLight = theme === 'light';
  const { supported, permission, settings, requestPermission, updateSettings, sendTest } = useStudyReminder();
  const [testSent, setTestSent] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState('android'); // 'android' | 'ios'

  if (!isOpen) return null;

  const handleToggleEnable = async () => {
    if (!settings.enabled) {
      if (permission !== 'granted') {
        const perm = await requestPermission();
        if (perm === 'granted') {
          updateSettings({ enabled: true });
        }
      } else {
        updateSettings({ enabled: true });
      }
    } else {
      updateSettings({ enabled: false });
    }
  };

  const handleSendTestNotification = async () => {
    setTestSent(true);
    await sendTest();
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[92vh] flex flex-col ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 md:p-6 border-b flex items-center justify-between ${
            isLight ? 'bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-slate-200' : 'bg-gradient-to-r from-blue-950/40 to-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 text-lg">
              <i className="fa-solid fa-bell animate-bounce" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-black tracking-tight">
                Nhắc Nhở Học Tập Trên Điện Thoại
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thông báo đẩy (Push Notification) mỗi ngày không bỏ lỡ bài học
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-base" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 space-y-5 overflow-y-auto">
          {/* Permission Status Banner */}
          {!supported ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-3">
              <i className="fa-solid fa-triangle-exclamation text-base mt-0.5" />
              <div>
                <strong>Trình duyệt này không hỗ trợ Web Notification</strong>
                <p className="mt-0.5 opacity-90">
                  Vui lòng mở trang web trên trình duyệt Chrome, Safari hoặc Edge trên điện thoại để nhận thông báo.
                </p>
              </div>
            </div>
          ) : permission === 'denied' ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-3">
              <i className="fa-solid fa-circle-exclamation text-base mt-0.5" />
              <div>
                <strong>Thông báo đang bị chặn trên trình duyệt</strong>
                <p className="mt-0.5 opacity-90">
                  Vui lòng bấm vào biểu tượng <strong>Ổ khóa (Site Settings)</strong> trên thanh địa chỉ của trình duyệt ➔ Chọn <strong>Quyền / Permissions</strong> ➔ Bật <strong>Thông báo (Notifications)</strong>.
                </p>
              </div>
            </div>
          ) : permission === 'granted' ? (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-base text-emerald-500" />
                <span className="font-bold">Đã cấp quyền thông báo trên điện thoại</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                Hoạt động
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-circle-info text-base" />
                <span>Chưa cấp quyền thông báo cho trình duyệt</span>
              </div>
              <button
                type="button"
                onClick={requestPermission}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shrink-0 cursor-pointer shadow-sm"
              >
                Cho phép ngay
              </button>
            </div>
          )}

          {/* Master Toggle */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700/80'
            }`}
          >
            <div>
              <span className="text-sm font-bold block">Bật nhắc nhở học tập hàng ngày</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                Đổ chuông &amp; đẩy popup nhắc bài học theo lịch cá nhân
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleEnable}
              className={`w-13 h-7 rounded-full p-1 transition-colors duration-200 cursor-pointer relative ${
                settings.enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Time Picker Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Chọn Giờ Nhắc Nhở ({settings.time})
              </span>
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-clock text-xs text-blue-500" />
                <input
                  type="time"
                  value={settings.time}
                  onChange={(e) => updateSettings({ time: e.target.value })}
                  className={`text-xs font-mono font-bold px-2 py-1 rounded-lg border outline-hidden transition ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                      : 'bg-slate-800 border-slate-700 text-white focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2">
              {TIME_PRESETS.map((preset) => {
                const isSelected = settings.time === preset.time;
                return (
                  <button
                    key={preset.time}
                    type="button"
                    onClick={() => updateSettings({ time: preset.time })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                        : isLight
                        ? 'border-slate-200 hover:border-slate-300 bg-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-black text-xs">
                        <i className={`fa-solid ${preset.icon} text-[11px]`} />
                        <span>{preset.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {preset.desc}
                      </span>
                    </div>
                    {isSelected && (
                      <i className="fa-solid fa-circle-check text-blue-500 text-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Notification Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSendTestNotification}
              disabled={testSent}
              className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                testSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-750 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700/60'
              }`}
            >
              <i className={`fa-solid ${testSent ? 'fa-check' : 'fa-paper-plane'}`} />
              <span>
                {testSent ? 'Đã gửi thông báo đến điện thoại!' : 'Gửi thử nghiệm 1 thông báo tới máy'}
              </span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-1.5">
              Bấm để xem thử thông báo sẽ xuất hiện trên màn hình khóa điện thoại của bạn như thế nào.
            </p>
          </div>

          {/* How to add to Home Screen Guide (PWA) */}
          <div
            className={`p-4 rounded-2xl border text-xs space-y-3 ${
              isLight ? 'bg-blue-50/50 border-blue-200' : 'bg-blue-950/20 border-blue-900/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <i className="fa-solid fa-mobile-screen-button" />
                <span>Cài App lên Màn hình chính điện thoại (Khuyên dùng)</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('android')}
                  className={`px-2 py-0.5 rounded-md font-bold transition ${
                    activeGuideTab === 'android'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('ios')}
                  className={`px-2 py-0.5 rounded-md font-bold transition ${
                    activeGuideTab === 'ios'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  iPhone (iOS)
                </button>
              </div>
            </div>

            {activeGuideTab === 'android' ? (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Trên Chrome: Bấm nút <strong>3 chấm góc trên bên phải (⋮)</strong> ➔ Chọn <strong>"Thêm vào màn hình chính"</strong> (hoặc "Cài đặt ứng dụng"). Ứng dụng sẽ có biểu tượng như app tải trên Google Play và nhận thông báo ổn định 100%.
              </p>
            ) : (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Trên Safari: Bấm nút <strong>Chia sẻ (Share <i className="fa-solid fa-arrow-up-from-bracket inline-block mx-0.5" />)</strong> ở thanh dưới ➔ Cuộn xuống chọn <strong>"Thêm vào MH chính" (Add to Home Screen)</strong>. Mở app từ màn hình chính để nhận thông báo đẩy tức thì.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-end ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer shadow-md"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
}
