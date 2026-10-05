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

const DEFAULT_SUPABASE_URL = 'https://nusumevfcubseogepitv.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_tJJ9dkiY2bZMLFQQ8s90fw_RVm6kf4U';

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

  const finalUrl = normalizeSupabaseUrl(localUrl || envUrl || DEFAULT_SUPABASE_URL);
  const finalKey = (localKey || envKey || DEFAULT_SUPABASE_ANON_KEY).trim();

  return {
    url: finalUrl,
    anonKey: finalKey,
    isEnv: Boolean(!localUrl && (envUrl || DEFAULT_SUPABASE_URL)),
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
 * Merge two mastery objects keeping the highest level and latest progress
 */
function mergeMasteryObjects(localVal, remoteVal) {
  if (!localVal && !remoteVal) return {};
  if (!localVal) return remoteVal;
  if (!remoteVal) return localVal;

  const merged = { ...localVal };
  for (const [k, rItem] of Object.entries(remoteVal)) {
    if (!merged[k]) {
      merged[k] = rItem;
    } else {
      const lItem = merged[k];
      if (typeof lItem === 'object' && typeof rItem === 'object') {
        const higherLevel = Math.max(lItem.level || 1, rItem.level || 1);
        const maxStreak = Math.max(lItem.correctStreak || 0, rItem.correctStreak || 0);
        const lastReview = Math.max(lItem.lastReview || 0, rItem.lastReview || 0);
        merged[k] = {
          ...lItem,
          ...rItem,
          level: higherLevel,
          correctStreak: maxStreak,
          lastReview,
        };
      } else {
        merged[k] = rItem || lItem;
      }
    }
  }
  return merged;
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
          let finalVal = row.value;

          // Smart merge for vocabulary mastery maps to prevent regression
          if (row.data_key === 'notebook_vocab_mastery_v1' || row.data_key === 'vocab_mastery_v2') {
            const rawLocal = localStorage.getItem(`${scopedUserPrefix}${row.data_key}`) || localStorage.getItem(row.data_key);
            if (rawLocal) {
              try {
                const parsedLocal = JSON.parse(rawLocal);
                finalVal = mergeMasteryObjects(parsedLocal, row.value);
              } catch (e) {}
            }
          }

          const serialized = JSON.stringify(finalVal);
          localStorage.setItem(`${scopedUserPrefix}${row.data_key}`, serialized);
          localStorage.setItem(row.data_key, serialized);
          localStorage.setItem(`user_guest_${row.data_key}`, serialized);
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
 * Collect all relevant learning data from local storage, merging alternate keys
 */
export function getMergedLocalUserData(userId) {
  if (!userId || userId === 'guest') return [];

  const rawUserId = userId.replace(/^user_/, '');
  const candidatePrefixes = [
    `user_${userId}_`,
    `user_${rawUserId}_`,
    `user_user_${rawUserId}_`,
    'user_guest_',
  ];

  const knownKeys = new Set([
    'notebook_vocab_mastery_v1',
    'vocab_mastery_v2',
    'saved_video_vocab_v1',
    'calendar_completed_tasks_v1',
    'daily_dictation_completed_v1',
    'dictation_transcripts_v1',
    'ielts_speaking_completed_tasks_v1',
    'ielts_writing_completed_tasks_v1',
    'ielts_reading_completed_tasks_v1',
    'ielts_diagnostic_test_result',
    'ielts_user_profile',
    'user_learning_profile_v1',
    'exam_records_v1',
    'learning_history_v1',
  ]);

  // Scan localStorage to detect all customized user keys
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;

      let matchedBase = null;
      for (const prefix of candidatePrefixes) {
        if (k.startsWith(prefix)) {
          matchedBase = k.slice(prefix.length);
          break;
        }
      }
      if (matchedBase) {
        knownKeys.add(matchedBase);
      } else if (knownKeys.has(k)) {
        knownKeys.add(k);
      }
    }
  } catch (e) {}

  const payload = [];

  knownKeys.forEach((baseKey) => {
    const candidateKeys = [
      `user_${userId}_${baseKey}`,
      `user_${rawUserId}_${baseKey}`,
      `user_user_${rawUserId}_${baseKey}`,
      `user_guest_${baseKey}`,
      baseKey,
    ];

    let mergedValue = null;

    for (const cand of candidateKeys) {
      try {
        const raw = localStorage.getItem(cand);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed !== null && parsed !== undefined) {
            if (typeof parsed === 'object' && !Array.isArray(parsed)) {
              if (baseKey === 'notebook_vocab_mastery_v1' || baseKey === 'vocab_mastery_v2') {
                mergedValue = mergeMasteryObjects(mergedValue || {}, parsed);
              } else {
                mergedValue = { ...(mergedValue || {}), ...parsed };
              }
            } else if (Array.isArray(parsed)) {
              if (!mergedValue || parsed.length > (mergedValue?.length || 0)) {
                mergedValue = parsed;
              }
            } else if (mergedValue === null) {
              mergedValue = parsed;
            }
          }
        }
      } catch (e) {}
    }

    if (mergedValue !== null && mergedValue !== undefined) {
      // Re-save to canonical keys locally
      try {
        const serialized = JSON.stringify(mergedValue);
        localStorage.setItem(`user_${userId}_${baseKey}`, serialized);
        localStorage.setItem(baseKey, serialized);
      } catch (e) {}

      payload.push({
        user_id: userId,
        data_key: baseKey,
        value: mergedValue,
        updated_at: new Date().toISOString(),
      });
    }
  });

  return payload;
}

/**
 * Push all local user data to Supabase (Initial upload / Full Sync)
 */
export async function pushAllLocalUserDataToSupabase(userId) {
  if (!userId || userId === 'guest') return 0;
  const client = getSupabaseClient();
  if (!client) return 0;

  try {
    const payload = getMergedLocalUserData(userId);
    if (!payload || payload.length === 0) return 0;

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
 * Bidirectional Sync: First pull latest from Supabase, then push local records
 */
export async function syncBidirectional(userId) {
  if (!userId || userId === 'guest') return { pulled: 0, pushed: 0 };
  const pulled = await pullAllUserDataFromSupabase(userId);
  const pushed = await pushAllLocalUserDataToSupabase(userId);
  return { pulled: pulled || 0, pushed };
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
