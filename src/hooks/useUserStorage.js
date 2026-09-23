import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Cache for candidate keys so we do not recompute on every render
 */
const candidateKeysCache = new Map();

function getCandidateStorageKeys(baseKey, userId) {
  const cacheKey = `${userId || 'guest'}_${baseKey}`;
  if (candidateKeysCache.has(cacheKey)) {
    return candidateKeysCache.get(cacheKey);
  }

  const keys = new Set();

  // 1. Current scoped user key
  if (userId) {
    keys.add(`user_${userId}_${baseKey}`);
    if (userId.startsWith('user_')) {
      const stripped = userId.replace(/^user_/, '');
      keys.add(`user_${stripped}_${baseKey}`);
    } else {
      keys.add(`user_user_${userId}_${baseKey}`);
    }
  }

  // 2. Guest keys
  keys.add(`user_guest_${baseKey}`);

  // 3. Known app student keys
  keys.add(`user_user_ngocanh136_${baseKey}`);
  keys.add(`user_ngocanh136_${baseKey}`);
  keys.add(`user_demo_1_${baseKey}`);

  // 4. Raw un-prefixed key
  keys.add(baseKey);

  // 5. Version fallbacks (e.g. if _v2, also check _v1, _v3, or without _vX)
  const vMatch = baseKey.match(/^(.*)_v(\d+)$/);
  if (vMatch) {
    const rootName = vMatch[1];
    const versionNum = parseInt(vMatch[2], 10);
    for (let v = 1; v <= 4; v++) {
      if (v !== versionNum) {
        if (userId) keys.add(`user_${userId}_${rootName}_v${v}`);
        keys.add(`user_guest_${rootName}_v${v}`);
        keys.add(`user_user_ngocanh136_${rootName}_v${v}`);
        keys.add(`${rootName}_v${v}`);
      }
    }
    if (userId) keys.add(`user_${userId}_${rootName}`);
    keys.add(`user_guest_${rootName}`);
    keys.add(rootName);
  }

  const result = Array.from(keys);
  candidateKeysCache.set(cacheKey, result);
  return result;
}

/**
 * Fast deep/JSON equality check
 */
function areValuesEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (e) {
    return false;
  }
}

/**
 * Loads and merges values across all candidate storage keys.
 */
function readMergedStorageValue(baseKey, userId, fallbackDefault) {
  try {
    const candidateKeys = getCandidateStorageKeys(baseKey, userId);
    const primaryKey = `user_${userId || 'guest'}_${baseKey}`;

    const isObjectMap = fallbackDefault !== null && typeof fallbackDefault === 'object' && !Array.isArray(fallbackDefault);
    const isArray = Array.isArray(fallbackDefault);

    if (isObjectMap) {
      let mergedObj = {};
      let hasData = false;

      // Order keys so primaryKey has highest priority
      const otherKeys = candidateKeys.filter((k) => k !== primaryKey);
      const orderedKeys = [...otherKeys, primaryKey];

      for (const k of orderedKeys) {
        try {
          const item = window.localStorage.getItem(k);
          if (item) {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              mergedObj = { ...mergedObj, ...parsed };
              hasData = true;
            }
          }
        } catch (e) {}
      }

      if (hasData) {
        return { ...fallbackDefault, ...mergedObj };
      }
      return fallbackDefault;
    }

    if (isArray) {
      const seen = new Set();
      const mergedArr = [];
      let hasData = false;

      const otherKeys = candidateKeys.filter((k) => k !== primaryKey);
      const orderedKeys = [primaryKey, ...otherKeys];

      for (const k of orderedKeys) {
        try {
          const item = window.localStorage.getItem(k);
          if (item) {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed) && parsed.length > 0) {
              hasData = true;
              for (const el of parsed) {
                const id = el && typeof el === 'object' ? (el.id || el.word || el.day || JSON.stringify(el)) : el;
                if (!seen.has(id)) {
                  seen.add(id);
                  mergedArr.push(el);
                }
              }
            }
          }
        } catch (e) {}
      }

      if (hasData) {
        return mergedArr;
      }
      return fallbackDefault;
    }

    // Primitive value
    const otherKeys = candidateKeys.filter((k) => k !== primaryKey);
    const orderedKeys = [primaryKey, ...otherKeys];

    for (const k of orderedKeys) {
      try {
        const item = window.localStorage.getItem(k);
        if (item !== null) {
          return JSON.parse(item);
        }
      } catch (e) {}
    }

    return fallbackDefault;
  } catch (err) {
    return fallbackDefault;
  }
}

export function useUserStorage(baseKey, initialValue) {
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.id : 'guest';
  const scopedKey = `user_${userId}_${baseKey}`;

  const initialValueRef = useRef(initialValue);

  const [storedValue, setStoredValue] = useState(() => {
    return readMergedStorageValue(baseKey, userId, initialValueRef.current);
  });

  // Keep a ref of latest storedValue for sync comparisons without re-triggering effect
  const storedValueRef = useRef(storedValue);
  storedValueRef.current = storedValue;

  // Re-sync state whenever user changes or scopedKey changes or when storage updates
  useEffect(() => {
    const syncState = (e) => {
      // 1. Ignore if event is targeted to an entirely different key
      if (e && e.detail && e.detail.baseKey && e.detail.baseKey !== baseKey && e.detail.scopedKey !== scopedKey) {
        return;
      }
      if (e && e.key && e.key !== baseKey && !e.key.includes(baseKey)) {
        return;
      }

      // If value is provided directly in detail and already parsed, check equality
      if (e && e.detail && e.detail.value !== undefined) {
        if (areValuesEqual(storedValueRef.current, e.detail.value)) {
          return;
        }
      }

      setStoredValue((prev) => {
        const next = readMergedStorageValue(baseKey, userId, initialValueRef.current);
        if (areValuesEqual(prev, next)) {
          return prev;
        }
        return next;
      });
    };

    window.addEventListener('user-storage-update', syncState);
    window.addEventListener('storage', syncState);

    return () => {
      window.removeEventListener('user-storage-update', syncState);
      window.removeEventListener('storage', syncState);
    };
  }, [baseKey, scopedKey, userId]);

  const setValue = (value) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;

        // CRITICAL: Prevent unnecessary writes and event loops if value is unchanged!
        if (areValuesEqual(prev, valueToStore)) {
          return prev;
        }

        try {
          const serialized = JSON.stringify(valueToStore);

          // 1. Save to current scoped key
          window.localStorage.setItem(scopedKey, serialized);

          // 2. Mirror to guest key and raw baseKey for cross-compatibility
          window.localStorage.setItem(`user_guest_${baseKey}`, serialized);
          window.localStorage.setItem(baseKey, serialized);
          if (userId && userId !== 'guest') {
            window.localStorage.setItem(`user_${userId}_${baseKey}`, serialized);
            if (userId.startsWith('user_')) {
              window.localStorage.setItem(`user_${userId.replace(/^user_/, '')}_${baseKey}`, serialized);
            }
          }

          window.dispatchEvent(
            new CustomEvent('user-storage-update', {
              detail: { scopedKey, baseKey, value: valueToStore },
            })
          );
        } catch (err) {
          console.error(`localStorage error for key ${scopedKey}:`, err);
        }
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error updating state for key ${scopedKey}:`, error);
    }
  };

  const removeValue = () => {
    try {
      const candidateKeys = getCandidateStorageKeys(baseKey, userId);
      candidateKeys.forEach((k) => {
        try {
          window.localStorage.removeItem(k);
        } catch (e) {}
      });
      window.dispatchEvent(
        new CustomEvent('user-storage-update', {
          detail: { scopedKey, baseKey, value: initialValueRef.current },
        })
      );
      setStoredValue(initialValueRef.current);
    } catch (error) {}
  };

  return [storedValue, setValue, removeValue];
}
