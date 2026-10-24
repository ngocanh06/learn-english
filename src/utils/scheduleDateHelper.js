/**
 * Schedule Date Helper
 * Coordinates roadmap start date, day numbers, and calendar date mapping.
 * Default: Roadmap Day 1 starts tomorrow (25/10/2026).
 */

const STORAGE_KEY = 'user_roadmap_start_date_v2';

/**
 * Returns tomorrow's date at 00:00:00
 */
export function getTomorrowDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
}

/**
 * Format Date object to DD/MM/YYYY
 */
export function formatDateKey(dateObj) {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return '';
  const d = String(dateObj.getDate()).padStart(2, '0');
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const y = dateObj.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * Parse DD/MM/YYYY string to Date object
 */
export function parseDateKey(dateKey) {
  if (!dateKey || typeof dateKey !== 'string') return null;
  const parts = dateKey.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  }
  return null;
}

/**
 * Returns next Monday's date at 00:00:00 (26/10/2026 if today is 24/10 or 25/10)
 */
export function getNextMondayDate() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const diff = day === 0 ? 1 : day === 1 ? 0 : (8 - day);
  d.setDate(d.getDate() + diff);
  return d;
}

/**
 * Get current configured Roadmap start date.
 * Defaults to next Monday (26/10/2026) for clean weekly structure.
 */
export function getRoadmapStartDate() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('user_schedule_start_date_v1');
    if (saved) {
      const parsed = parseDateKey(saved);
      if (parsed && !isNaN(parsed.getTime())) {
        // If saved start date is in the past, or was the old 01/10/2026 or Sunday 25/10/2026, reset to next Monday
        const todayZero = new Date();
        todayZero.setHours(0, 0, 0, 0);
        if (
          parsed.getTime() < todayZero.getTime() ||
          (parsed.getFullYear() === 2026 && parsed.getMonth() === 9 && parsed.getDate() === 1) ||
          (parsed.getFullYear() === 2026 && parsed.getMonth() === 9 && parsed.getDate() === 25)
        ) {
          const nextMon = getNextMondayDate();
          setRoadmapStartDate(nextMon);
          return nextMon;
        }
        return parsed;
      }
    }
  } catch (e) {}

  // Default: Next Monday (26/10/2026)
  const nextMon = getNextMondayDate();
  try {
    localStorage.setItem(STORAGE_KEY, formatDateKey(nextMon));
  } catch (e) {}
  return nextMon;
}

/**
 * Set and persist new Roadmap start date
 */
export function setRoadmapStartDate(dateOrKey) {
  let dateObj = dateOrKey;
  if (typeof dateOrKey === 'string') {
    dateObj = parseDateKey(dateOrKey);
  }
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    dateObj = getTomorrowDate();
  }
  dateObj.setHours(0, 0, 0, 0);
  const formatted = formatDateKey(dateObj);

  try {
    localStorage.setItem(STORAGE_KEY, formatted);
    localStorage.setItem('user_schedule_start_date_v1', formatted);
    window.dispatchEvent(
      new CustomEvent('roadmap-start-date-changed', {
        detail: { startDate: dateObj, formatted },
      })
    );
    window.dispatchEvent(
      new CustomEvent('user-storage-update', {
        detail: { baseKey: STORAGE_KEY, value: formatted },
      })
    );
  } catch (e) {}

  return dateObj;
}

/**
 * Reset roadmap start date to tomorrow
 */
export function resetRoadmapStartDateToTomorrow() {
  return setRoadmapStartDate(getTomorrowDate());
}

/**
 * Calculate Date for a specific roadmap day number (Day 1 -> Start Date)
 */
export function getDateForDayNum(dayNum) {
  const num = parseInt(dayNum, 10);
  if (isNaN(num) || num < 1) return null;
  const start = getRoadmapStartDate();
  const target = new Date(start);
  target.setDate(target.getDate() + (num - 1));
  return target;
}

/**
 * Calculate Day number for a specific date (Start date -> Day 1)
 * Returns null if date is prior to start date
 */
export function getDayNumForDate(dateObj) {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return null;
  const start = getRoadmapStartDate();
  const d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  const diffDays = Math.round((d - start) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return null;
  return diffDays + 1;
}
