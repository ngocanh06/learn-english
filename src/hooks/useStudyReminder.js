import { useState, useEffect, useCallback } from 'react';
import {
  registerServiceWorker,
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  getSavedReminderSettings,
  saveReminderSettings,
  sendPhoneNotification,
  sendTestNotification,
} from '../services/studyReminderService';

export function useStudyReminder() {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [settings, setSettings] = useState(getSavedReminderSettings);

  // Initialize service worker & permission on mount
  useEffect(() => {
    setSupported(isNotificationSupported());
    setPermission(getNotificationPermission());
    registerServiceWorker();
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === 'granted') {
      const updated = saveReminderSettings({ enabled: true });
      setSettings(updated);
    }
    return perm;
  }, []);

  // Update settings
  const updateSettings = useCallback((newPartial) => {
    const updated = saveReminderSettings(newPartial);
    setSettings(updated);
    return updated;
  }, []);

  // Send a test notification to device
  const sendTest = useCallback(async () => {
    return sendTestNotification();
  }, []);

  // Automated background schedule check (Every 30 seconds)
  useEffect(() => {
    if (!settings.enabled || permission !== 'granted') return;

    const checkReminder = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      const todayKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday

      // Check if scheduled time matches and hasn't notified today
      if (
        currentTimeStr === settings.time &&
        settings.days.includes(dayOfWeek) &&
        settings.lastNotifiedDate !== todayKey
      ) {
        sendPhoneNotification({
          title: '⏰ Đến giờ học tiếng Anh hôm nay rồi!',
          body: 'Đừng quên duy trì chuỗi học tập (Streak) và hoàn thành các bài học hôm nay nhé! Chạm để bắt đầu ngay.',
          url: './',
        });

        const updated = saveReminderSettings({ lastNotifiedDate: todayKey });
        setSettings(updated);
      }
    };

    // Run check immediately, then every 30 seconds
    checkReminder();
    const interval = setInterval(checkReminder, 30000);
    return () => clearInterval(interval);
  }, [settings.enabled, settings.time, settings.days, settings.lastNotifiedDate, permission]);

  return {
    supported,
    permission,
    settings,
    requestPermission,
    updateSettings,
    sendTest,
  };
}
