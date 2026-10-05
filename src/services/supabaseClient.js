import { createClient } from '@supabase/supabase-js';

// Configuration keys for localStorage fallback
const STORAGE_URL_KEY = 'app_supabase_url_v1';
const STORAGE_ANON_KEY = 'app_supabase_anon_key_v1';

export const SUPABASE_TABLE_SQL = `-- 1. Tạo bảng lưu trữ tiến độ học tập đồng bộ
create table if not exists public.user_sync_data (
  user_id text not null,
  data_key text not null,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, data_key)
);

-- 2. Tắt Row Level Security (RLS) để tài khoản client đọc ghi nhanh chóng
alter table public.user_sync_data disable row level security;

-- 3. Bật tính năng Realtime WebSockets để nhận dữ liệu tức thì giữa máy tính & điện thoại
alter publication supabase_realtime add table public.user_sync_data;`;

let supabaseInstance = null;
let currentConfiguredUrl = '';
let currentConfiguredKey = '';

export function normalizeSupabaseUrl(rawUrl) {
  if (!rawUrl) return '';
  let clean = rawUrl.trim();
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  clean = clean.replace(/\/+$/, '');
  return clean;
}

export function getSupabaseCredentials() {
  const envUrl = process.env.REACT_APP_SUPABASE_URL || '';
  const envKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_URL_KEY) || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_ANON_KEY) || '' : '';

  const finalUrl = normalizeSupabaseUrl(localUrl || envUrl);
  const finalKey = (localKey || envKey).trim();

  return {
    url: finalUrl,
    anonKey: finalKey,
    isEnv: Boolean(!localUrl && envUrl),
  };
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(url && anonKey && url.startsWith('http'));
}

export function saveSupabaseCredentials(url, anonKey) {
  try {
    const cleanUrl = normalizeSupabaseUrl(url);
    if (typeof window !== 'undefined') {
      if (cleanUrl && anonKey) {
        localStorage.setItem(STORAGE_URL_KEY, cleanUrl);
        localStorage.setItem(STORAGE_ANON_KEY, anonKey.trim());
      } else {
        localStorage.removeItem(STORAGE_URL_KEY);
        localStorage.removeItem(STORAGE_ANON_KEY);
      }
    }
    // Re-initialize client
    supabaseInstance = null;
    currentConfiguredUrl = '';
    currentConfiguredKey = '';
    getSupabaseClient();
    window.dispatchEvent(new CustomEvent('supabase-config-changed'));
    return true;
  } catch (e) {
    console.error('Failed to save Supabase credentials:', e);
    return false;
  }
}

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseCredentials();
  if (!url || !anonKey || !url.startsWith('http')) return null;

  if (supabaseInstance && currentConfiguredUrl === url && currentConfiguredKey === anonKey) {
    return supabaseInstance;
  }

  try {
    supabaseInstance = createClient(url, anonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
    currentConfiguredUrl = url;
    currentConfiguredKey = anonKey;
    return supabaseInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

// Debounce timer map for background writes
const debounceTimers = new Map();

/**
 * Push an updated key value to Supabase in the background
 */
export function syncKeyToSupabase(userId, baseKey, value) {
  if (!userId || userId === 'guest') return;
  const client = getSupabaseClient();
  if (!client) return;

  const timerKey = `${userId}:${baseKey}`;
  if (debounceTimers.has(timerKey)) {
    clearTimeout(debounceTimers.get(timerKey));
  }

  const timer = setTimeout(async () => {
    debounceTimers.delete(timerKey);
    try {
      await client.from('user_sync_data').upsert(
        {
          user_id: userId,
          data_key: baseKey,
          value: value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,data_key' }
      );
    } catch (err) {
      console.warn(`Supabase sync failed for ${baseKey}:`, err);
    }
  }, 400); // 400ms debounce to batch rapid updates

  debounceTimers.set(timerKey, timer);
}

/**
 * Fetch all remote data for user from Supabase and merge into localStorage
 */
export async function pullAllUserDataFromSupabase(userId) {
  if (!userId || userId === 'guest') return null;
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('user_sync_data')
      .select('data_key, value, updated_at')
      .eq('user_id', userId);

    if (error) throw error;
    if (!Array.isArray(data)) return null;

    let updateCount = 0;
    const scopedUserPrefix = `user_${userId}_`;

    data.forEach((row) => {
      if (row.data_key && row.value !== undefined) {
        try {
          const serialized = JSON.stringify(row.value);
          localStorage.setItem(`${scopedUserPrefix}${row.data_key}`, serialized);
          localStorage.setItem(row.data_key, serialized);
          updateCount++;
        } catch (e) {}
      }
    });

    if (updateCount > 0) {
      window.dispatchEvent(
        new CustomEvent('user-storage-update', {
          detail: { fullSync: true, userId, count: updateCount },
        })
      );
    }

    return updateCount;
  } catch (err) {
    console.warn('Failed to pull user data from Supabase:', err);
    return null;
  }
}

/**
 * Push all local user data to Supabase (Initial upload)
 */
export async function pushAllLocalUserDataToSupabase(userId) {
  if (!userId || userId === 'guest') return 0;
  const client = getSupabaseClient();
  if (!client) return 0;

  try {
    const scopedPrefix = `user_${userId}_`;
    const payload = [];

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(scopedPrefix)) {
        const baseKey = k.slice(scopedPrefix.length);
        try {
          const raw = localStorage.getItem(k);
          if (raw) {
            const parsed = JSON.parse(raw);
            payload.push({
              user_id: userId,
              data_key: baseKey,
              value: parsed,
              updated_at: new Date().toISOString(),
            });
          }
        } catch (e) {}
      }
    }

    if (payload.length === 0) return 0;

    const { error } = await client
      .from('user_sync_data')
      .upsert(payload, { onConflict: 'user_id,data_key' });

    if (error) throw error;
    return payload.length;
  } catch (err) {
    console.error('Failed to push local user data to Supabase:', err);
    return 0;
  }
}

/**
 * Subscribe to realtime changes for the active user
 */
export function subscribeToUserRealtimeSync(userId, onSyncCallback) {
  if (!userId || userId === 'guest') return () => {};
  const client = getSupabaseClient();
  if (!client) return () => {};

  const channelName = `realtime_user_sync_${userId}_${Date.now()}`;

  try {
    const channel = client
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_sync_data',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (!payload.new) return;
          const { data_key, value } = payload.new;
          if (!data_key || value === undefined) return;

          try {
            const serialized = JSON.stringify(value);
            const scopedKey = `user_${userId}_${data_key}`;

            // Check if value actually changed to prevent infinite loops
            const current = localStorage.getItem(scopedKey);
            if (current === serialized) return;

            localStorage.setItem(scopedKey, serialized);
            localStorage.setItem(data_key, serialized);

            window.dispatchEvent(
              new CustomEvent('user-storage-update', {
                detail: { scopedKey, baseKey: data_key, value },
              })
            );

            if (onSyncCallback) {
              onSyncCallback(data_key, value);
            }
          } catch (e) {}
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.error('Failed to subscribe to Supabase Realtime channel:', err);
    return () => {};
  }
}
