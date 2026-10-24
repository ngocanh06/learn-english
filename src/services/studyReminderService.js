/**
 * Study Reminder & Push Notification Service
 * Handles browser & mobile notifications, Service Worker registration, and automated reminder scheduling.
 */

const REMINDER_STORAGE_KEY = 'study_reminder_settings_v1';

export const DEFAULT_REMINDER_SETTINGS = {
  enabled: false,
  time: '20:00', // 24-hour format HH:mm
  days: [1, 2, 3, 4, 5, 6, 0], // 0 = Sunday, 1 = Monday ... 6 = Saturday
  lastNotifiedDate: '',
  vibrate: true,
  sound: true,
};

/**
 * Register service worker for mobile PWA push notifications
 */
export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    return registration;
  } catch (error) {
    console.warn('Service worker registration failed:', error);
    return null;
  }
}

/**
 * Check if the current browser/device supports Web Notifications
 */
export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current notification permission: 'granted' | 'denied' | 'default'
 */
export function getNotificationPermission() {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission() {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return Notification.permission;
  }
}

/**
 * Retrieve saved reminder settings from localStorage
 */
export function getSavedReminderSettings() {
  try {
    const raw = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (!raw) return DEFAULT_REMINDER_SETTINGS;
    return { ...DEFAULT_REMINDER_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_REMINDER_SETTINGS;
  }
}

/**
 * Save reminder settings to localStorage
 */
export function saveReminderSettings(settings) {
  try {
    const current = getSavedReminderSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save reminder settings:', e);
    return settings;
  }
}

/**
 * Trigger a phone/browser notification
 */
export async function sendPhoneNotification({ title, body, icon = '/logo192.png', tag = 'study-reminder', url = './' }) {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported');
    return false;
  }

  let permission = Notification.permission;
  if (permission !== 'granted') {
    permission = await requestNotificationPermission();
  }

  if (permission !== 'granted') {
    return false;
  }

  const options = {
    body,
    icon,
    badge: icon,
    tag,
    renotify: true,
    vibrate: [200, 100, 200],
    data: { url },
  };

  try {
    // Try sending through ServiceWorker for mobile background support
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && 'showNotification' in reg) {
        await reg.showNotification(title, options);
        return true;
      }
    }

    // Fallback to desktop/in-page Notification API
    new Notification(title, options);
    return true;
  } catch (e) {
    try {
      new Notification(title, options);
      return true;
    } catch (fallbackError) {
      console.error('Failed to show notification:', fallbackError);
      return false;
    }
  }
}

/**
 * Trigger an instant test notification
 */
export async function sendTestNotification() {
  return sendPhoneNotification({
    title: '🔔 Chuông nhắc học: Tiếng Anh & IELTS!',
    body: 'Tuyệt vời! Thông báo trên điện thoại của bạn đã hoạt động sẵn sàng. Hãy kiên trì học tập mỗi ngày để bứt phá band điểm nhé!',
    tag: 'test-reminder',
    url: window.location.href,
  });
}
