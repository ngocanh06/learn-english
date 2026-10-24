// Service Worker for English Mastery Hub - PWA & Push Notifications
const CACHE_NAME = 'english-hub-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle notification clicks on mobile / desktop
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle push events (for future Web Push integration)
self.addEventListener('push', (event) => {
  let data = { title: 'Đến giờ học tiếng Anh rồi!', body: 'Hôm nay bạn có nhiệm vụ học tập mới.', url: './' };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || './' },
    actions: [
      { action: 'open', title: 'Vào học ngay ➔' },
      { action: 'dismiss', title: 'Để sau' }
    ],
    tag: 'study-reminder',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
