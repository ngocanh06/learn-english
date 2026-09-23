import React, { useState, useCallback, useMemo } from 'react';
import Papa from 'papaparse';
import { useUserStorage } from '../hooks/useUserStorage';
import { SCHEDULE_SHEET_URL, DEFAULT_SCHEDULE_DATA, parseScheduleCSV } from '../config/schedule';

const STATUS_OPTIONS = [
  { value: '', label: 'Chưa làm', color: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
  { value: 'Complete', label: 'Complete', color: 'bg-emerald-500 text-white font-bold' },
  { value: 'Incomplete', label: 'Incomplete', color: 'bg-rose-500 text-white font-bold' },
  { value: 'In Progress', label: 'In Progress', color: 'bg-amber-500 text-white font-bold' },
];

function getTodayFormatted() {
  const today = new Date();
  const d = String(today.getDate()).padStart(2, '0');
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const y = today.getFullYear();
  return `${d}/${m}/${y}`;
}

function parseDateStr(dateStr) {
  if (!dateStr || !dateStr.includes('/')) return new Date();
  const [d, m, y] = dateStr.split('/');
  return new Date(+y, +m - 1, +d);
}

function formatDateStr(dateObj) {
  const d = String(dateObj.getDate()).padStart(2, '0');
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const y = dateObj.getFullYear();
  return `${d}/${m}/${y}`;
}

function isToday(dateStr) {
  if (!dateStr) return false;
  try {
    const str = String(dateStr).trim();
    if (!str.includes('/')) return false;
    const [d, m, y] = str.split('/');
    const rowDate = new Date(+y, +m - 1, +d);
    const today = new Date();
    return rowDate.toDateString() === today.toDateString();
  } catch { return false; }
}

const ALL_COLS = [
  { key: 'vocab', label: 'Từ vựng Part', icon: 'fa-book' },
  { key: 'grammar', label: 'Ngữ pháp', icon: 'fa-graduation-cap' },
  { key: 'shortStories', label: 'Short Stories', icon: 'fa-book-open' },
  { key: 'dailyDictConv', label: 'DD Conv', icon: 'fa-comments' },
  { key: 'dailyDictToeic', label: 'DD TOEIC', icon: 'fa-headphones' },
  { key: 'ielts', label: 'IELTS', icon: 'fa-globe' },
  { key: 'toeicLis', label: 'TOEIC Lis', icon: 'fa-ear-listen' },
  { key: 'toeicRead', label: 'TOEIC Read', icon: 'fa-file-alt' },
  { key: 'koreanVocab', label: 'Từ vựng Hàn', icon: 'fa-language' },
  { key: 'koreanGrammar', label: 'Ngữ pháp Hàn', icon: 'fa-file-signature' },
];

const DOW_NAMES = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

// ─── EDITABLE EVENT MODAL POPUP ───────────────────────────────────────────────
function EventEditModal({ row, onClose, onSaveRow, isLight }) {
  const [formData, setFormData] = useState({ ...row });

  if (!row) return null;

  const handleChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveRow(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <form onSubmit={handleSave} onClick={e => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
              {row.date.split('/')[0]}
            </div>
            <div>
              <h3 className="font-black text-xl">{row.dow}, Ngày {row.date}</h3>
              <p className="text-xs text-indigo-500 dark:text-indigo-400 font-bold">Chỉnh sửa nội dung học & Trạng thái</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        </div>

        {/* Status Switcher */}
        <div className="flex items-center justify-between bg-indigo-50 dark:bg-slate-800/80 p-3.5 rounded-2xl mb-5 border border-indigo-100 dark:border-slate-700">
          <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Trạng thái hoàn thành:</span>
          <div className="flex gap-1.5 flex-wrap">
            {STATUS_OPTIONS.map(opt => (
              <button key={opt.value} type="button" onClick={() => handleChange('status', opt.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${formData.status === opt.value
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-slate-200 dark:border-slate-700'
                  }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
          {ALL_COLS.map(col => (
            <div key={col.key} className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <i className={`fa-solid ${col.icon} text-indigo-500`} /> {col.label}
              </label>
              <input value={formData[col.key] || ''} onChange={e => handleChange(col.key, e.target.value)}
                placeholder={`Nhập ${col.label.toLowerCase()}...`}
                className={`border text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 font-semibold ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                  }`} />
            </div>
          ))}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500">Ghi chú riêng</label>
            <input value={formData.note || ''} onChange={e => handleChange('note', e.target.value)}
              placeholder="Ghi chú cá nhân cho ngày học này..."
              className={`border text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                }`} />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm">
            Hủy
          </button>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-lg flex items-center gap-2">
            <i className="fa-solid fa-floppy-disk" /> Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function StudySchedule({ theme }) {
  const [rows, setRows] = useUserStorage('study_schedule_rows_v3', DEFAULT_SCHEDULE_DATA);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const [viewMode, setViewMode] = useState('calendar');

  const safeRows = useMemo(() => (Array.isArray(rows) && rows.length > 0 ? rows : DEFAULT_SCHEDULE_DATA), [rows]);

  const todayStr = useMemo(() => getTodayFormatted(), []);

  const todayRow = useMemo(() => {
    const exact = safeRows.find(r => r.date === todayStr);
    if (exact) return exact;
    const foundToday = safeRows.find(r => isToday(r.date));
    return foundToday || safeRows[0];
  }, [safeRows, todayStr]);

  const [currentYear, setCurrentYear] = useState(() => {
    if (todayRow && todayRow.date) {
      const parts = todayRow.date.split('/');
      if (parts[2]) return +parts[2];
    }
    return new Date().getFullYear();
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (todayRow && todayRow.date) {
      const parts = todayRow.date.split('/');
      if (parts[1]) return +parts[1] - 1;
    }
    return new Date().getMonth();
  });

  const [selectedDayDate, setSelectedDayDate] = useState(() => todayRow ? todayRow.date : '01/06/2026');
  const [editingRow, setEditingRow] = useState(null);
  const [visibleCols, setVisibleCols] = useState(() => ALL_COLS.map(c => c.key));

  const isLight = theme === 'light';

  // Sync logic
  const fetchCSV = async () => {
    try {
      const r1 = await fetch(SCHEDULE_SHEET_URL);
      if (r1.ok) { const text = await r1.text(); if (text && text.includes('01/06/2026')) return text; }
    } catch (e) { }
    try {
      const r2 = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SCHEDULE_SHEET_URL)}`);
      const j2 = await r2.json();
      if (j2 && j2.contents) return j2.contents;
    } catch (e) { }
    try {
      const r3 = await fetch(`https://corsproxy.io/?${encodeURIComponent(SCHEDULE_SHEET_URL)}`);
      if (r3.ok) return await r3.text();
    } catch (e) { }
    return null;
  };

  const syncFromSheet = useCallback(async () => {
    setSyncing(true); setSyncMsg('');
    const csvText = await fetchCSV();
    if (!csvText) {
      setSyncMsg('⚠️ Không kết nối được Google Sheet online, dùng dữ liệu có sẵn!');
      setSyncing(false); return;
    }
    Papa.parse(csvText, {
      complete: (result) => {
        const parsed = parseScheduleCSV(result.data);
        if (parsed.length > 0) {
          setRows(prev => {
            const merged = [...parsed];
            merged.forEach((row, i) => {
              const existing = prev.find(p => p.date === row.date);
              if (existing) {
                if (existing.status) merged[i].status = existing.status;
                ALL_COLS.forEach(c => {
                  if (existing[c.key]) merged[i][c.key] = existing[c.key];
                });
              }
            });
            return merged;
          });
          setSyncMsg(`✅ Đồng bộ thành công ${parsed.length} ngày từ Google Sheet!`);
        }
        setSyncing(false);
      },
      error: () => { setSyncMsg('❌ Lỗi parse CSV'); setSyncing(false); }
    });
  }, [setRows]);

  const saveUpdatedRow = (updatedRow) => {
    setRows(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  };

  const toggleRowStatusQuick = (rowId, e) => {
    if (e) e.stopPropagation();
    setRows(prev => prev.map(r => {
      if (r.id === rowId) {
        const nextStatus = r.status === 'Complete' ? '' : 'Complete';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const updateCellInline = (rowId, key, val) => {
    setRows(prev => prev.map(r => r.id === rowId ? { ...r, [key]: val } : r));
  };

  const resetToDefault = () => {
    if (window.confirm('Khôi phục lại bảng lịch học ban đầu từ Google Sheet?')) {
      setRows(DEFAULT_SCHEDULE_DATA);
      setSyncMsg('✅ Đã khôi phục dữ liệu ban đầu!');
    }
  };

  const toggleColumnVisibility = (key) => {
    setVisibleCols(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  // Month Grid Calculation
  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = lastDayOfMonth.getDate();
    const cells = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push({ empty: true, key: `lead_${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateFormatted = `${String(day).padStart(2, '0')}/${String(currentMonth + 1).padStart(2, '0')}/${currentYear}`;
      const matchedRow = safeRows.find(r => r.date === dateFormatted);
      cells.push({
        empty: false,
        day,
        dateFormatted,
        row: matchedRow,
        key: dateFormatted
      });
    }
    return cells;
  }, [currentYear, currentMonth, safeRows]);

  // ─── FULL 7-DAY WEEK CALCULATION (MON ➔ SUN ALWAYS HAS 7 DAYS) ───────────────
  const activeWeekDaysFull = useMemo(() => {
    const anchorDateObj = parseDateStr(selectedDayDate || todayStr);

    // Find Monday of the active week
    let dow = anchorDateObj.getDay(); // 0 = Sun, 1 = Mon ...
    if (dow === 0) dow = 7;
    const mondayObj = new Date(anchorDateObj);
    mondayObj.setDate(anchorDateObj.getDate() - (dow - 1));

    // Generate 7 consecutive days Mon->Sun
    const days = [];
    for (let i = 0; i < 7; i++) {
      const curr = new Date(mondayObj);
      curr.setDate(mondayObj.getDate() + i);
      const formatted = formatDateStr(curr);
      const matched = safeRows.find(r => r.date === formatted);

      days.push({
        dayNum: curr.getDate(),
        dateFormatted: formatted,
        dowLabel: DOW_NAMES[i],
        row: matched || {
          id: `fallback_${formatted}`,
          date: formatted,
          dow: DOW_NAMES[i],
          status: '',
        }
      });
    }
    return days;
  }, [selectedDayDate, todayStr, safeRows]);

  const activeDayRow = safeRows.find(r => r.date === selectedDayDate) || todayRow;

  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const jumpToToday = () => {
    if (todayRow) {
      setSelectedDayDate(todayRow.date);
      const parts = todayRow.date.split('/');
      if (parts.length === 3) {
        setCurrentMonth(+parts[1] - 1);
        setCurrentYear(+parts[2]);
      }
    }
  };

  const total = safeRows.length;
  const done = safeRows.filter(r => r && r.status === 'Complete').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className={`text-2xl font-black flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <i className="fa-solid fa-calendar-days text-indigo-500" />
            Lịch học
          </h2>
          <p className="text-slate-500 text-sm mt-1">{total} ngày học • {done} hoàn thành ({pct}%) • Hiển thị đủ 7 ngày (T2 ➔ CN)</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Jump to Today Button */}
          <button onClick={jumpToToday}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl font-bold text-xs transition hover:bg-indigo-100">
            <i className="fa-solid fa-location-crosshairs" />
            <span>Về Hôm nay</span>
          </button>

          {/* Multi-View Mode Switcher */}
          <div className={`flex rounded-2xl p-1 border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
            {[
              { id: 'calendar', label: 'Tháng', icon: 'fa-calendar-days' },
              { id: 'week', label: 'Tuần', icon: 'fa-calendar-week' },
              { id: 'day', label: 'Ngày', icon: 'fa-calendar-day' },
              { id: 'table', label: 'Bảng chỉnh sửa', icon: 'fa-table' },
            ].map(v => (
              <button key={v.id} onClick={() => setViewMode(v.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${viewMode === v.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}>
                <i className={`fa-solid ${v.icon}`} /> {v.label}
              </button>
            ))}
          </div>

          <button onClick={syncFromSheet} disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl font-bold text-xs transition shadow-md">
            <i className={`fa-solid fa-rotate ${syncing ? 'fa-spin' : ''}`} />
            {syncing ? 'Đang đồng bộ...' : 'Đồng bộ Sheet'}
          </button>
          <button onClick={resetToDefault}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs border transition ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}>
            <i className="fa-solid fa-clock-rotate-left mr-1" /> Khôi phục
          </button>
        </div>
      </div>

      {syncMsg && (
        <div className={`px-4 py-2.5 rounded-xl text-sm font-bold ${syncMsg.startsWith('✅') ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-300' : 'bg-amber-500/10 text-amber-600 border border-amber-300'}`}>
          {syncMsg}
        </div>
      )}

      {/* ─── 1. GOOGLE CALENDAR MONTH VIEW ─────────────────────────────────────── */}
      {viewMode === 'calendar' && (
        <div className={`border rounded-3xl overflow-hidden shadow-xl ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
          {/* Month Header */}
          <div className={`p-4 border-b flex items-center justify-between flex-wrap gap-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
            }`}>
            <div className="flex items-center gap-3">
              <h3 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button onClick={jumpToToday} className="text-xs text-indigo-500 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900">
                <i className="fa-solid fa-location-arrow mr-1" /> Hôm nay
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className={`p-2 rounded-xl border transition ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                <i className="fa-solid fa-chevron-left text-sm" />
              </button>
              <button onClick={nextMonth} className={`p-2 rounded-xl border transition ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                <i className="fa-solid fa-chevron-right text-sm" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className={`grid grid-cols-7 border-b text-center text-xs font-black uppercase tracking-wider py-2.5 ${isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-800/50 border-slate-700 text-slate-400'
            }`}>
            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span className="text-rose-500">CN</span>
          </div>

          {/* Month Cells Grid */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {calendarGrid.map(cell => {
              if (cell.empty) {
                return <div key={cell.key} className={`min-h-[75px] md:min-h-[110px] border-b border-r p-1.5 ${isLight ? 'bg-slate-50/50 border-slate-100' : 'bg-slate-950/40 border-slate-800/40'}`} />;
              }

              const row = cell.row;
              const today = isToday(cell.dateFormatted);
              const isComplete = row && row.status === 'Complete';

              return (
                <div key={cell.key} onClick={() => row && setEditingRow(row)}
                  className={`min-h-[75px] md:min-h-[110px] border-b border-r p-1.5 md:p-2 transition-all cursor-pointer flex flex-col justify-between group ${isLight
                    ? 'border-slate-200 hover:bg-indigo-50/50 bg-white'
                    : 'border-slate-800 hover:bg-indigo-950/40 bg-slate-900/60'
                    } ${today ? (isLight ? 'bg-indigo-50/80 ring-2 ring-indigo-500' : 'bg-indigo-950/60 ring-2 ring-indigo-500') : ''}`}>

                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-bold text-xs ${today
                      ? 'bg-indigo-600 text-white font-black shadow-md'
                      : isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                      {cell.day}
                    </span>

                    {row && (
                      <button type="button" onClick={(e) => toggleRowStatusQuick(row.id, e)}
                        className={`p-0.5 md:p-1 transition-all rounded-lg ${isComplete ? 'text-emerald-500 hover:text-emerald-400 scale-110' : 'text-slate-400 hover:text-emerald-500'
                          }`}
                        title={isComplete ? 'Đánh dấu chưa làm' : 'Đánh dấu Hoàn thành'}>
                        <i className={`fa-solid ${isComplete ? 'fa-circle-check text-sm md:text-base' : 'fa-circle-dot text-xs md:text-sm'}`} />
                      </button>
                    )}
                  </div>

                  {row ? (
                    <div className="space-y-1 overflow-hidden">
                      {row.grammar && (
                        <div className="text-[9px] md:text-[10px] font-bold px-1 py-0.5 rounded truncate bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                          <i className="fa-solid fa-book text-[8px]" /> <span className="truncate">{row.grammar.replace(/^\d+\.\s*/, '')}</span>
                        </div>
                      )}
                      {row.vocab && (
                        <div className="text-[9px] md:text-[10px] font-bold px-1 py-0.5 rounded truncate bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                          <i className="fa-solid fa-graduation-cap text-[8px]" /> <span className="truncate">{row.vocab}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 2. GOOGLE CALENDAR WEEK VIEW (ALWAYS RENDERS FULL 7 DAYS T2 -> CN) ── */}
      {viewMode === 'week' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className={`font-black text-lg flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <i className="fa-solid fa-calendar-week text-indigo-500" />
              Xem theo Tuần
            </h3>
            <div className="flex gap-2">
              <button onClick={jumpToToday} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1">
                <i className="fa-solid fa-location-crosshairs" /> Tuần hiện tại
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
            {activeWeekDaysFull.map(item => {
              const row = item.row;
              const today = isToday(item.dateFormatted);
              const isComplete = row && row.status === 'Complete';

              return (
                <div key={item.dateFormatted} onClick={() => row && setEditingRow(row)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between min-h-[240px] ${today
                    ? 'bg-indigo-600 text-white shadow-xl ring-2 ring-indigo-400'
                    : isLight
                      ? 'bg-white border-slate-200 hover:border-indigo-400 text-slate-900 shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-indigo-500 text-white'
                    }`}>
                  <div>
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2 mb-3">
                      <div>
                        <span className={`text-[10px] font-black uppercase block ${today ? 'text-indigo-200' : 'text-slate-400'}`}>{item.dowLabel}</span>
                        <span className="text-xl font-black">{item.dayNum}</span>
                        {/* {today && <span className="text-[9px] bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded font-black ml-1.5">Hôm nay</span>} */}
                      </div>

                      {row && row.id && !row.id.startsWith('fallback') && (
                        <button type="button" onClick={(e) => toggleRowStatusQuick(row.id, e)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition shadow ${isComplete ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                          <i className={`fa-solid ${isComplete ? 'fa-circle-check mr-1' : 'fa-circle-dot mr-1'}`} />
                          {isComplete ? 'Xong' : 'Chưa làm'}
                        </button>
                      )}
                    </div>

                    {row && (row.grammar || row.vocab || row.shortStories || row.dailyDictConv) ? (
                      <div className="space-y-2 text-xs">
                        {row.grammar && (
                          <div className={`p-2 rounded-xl border ${today ? 'bg-white/10 border-white/20 text-white' : 'bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300'}`}>
                            <span className="font-bold block text-[10px] uppercase opacity-75"><i className="fa-solid fa-book mr-1" /> Ngữ pháp</span>
                            <span className="font-bold truncate block">{row.grammar}</span>
                          </div>
                        )}
                        {row.vocab && (
                          <div className={`p-2 rounded-xl border ${today ? 'bg-white/10 border-white/20 text-white' : 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300'}`}>
                            <span className="font-bold block text-[10px] uppercase opacity-75"><i className="fa-solid fa-graduation-cap mr-1" /> Từ vựng</span>
                            <span className="font-bold truncate block">{row.vocab}</span>
                          </div>
                        )}
                        {row.shortStories && (
                          <div className={`p-2 rounded-xl border ${today ? 'bg-white/10 border-white/20 text-white' : 'bg-violet-50 dark:bg-slate-800 text-violet-700 dark:text-violet-300'}`}>
                            <span className="font-bold block text-[10px] uppercase opacity-75"><i className="fa-solid fa-book-open mr-1" /> Stories</span>
                            <span className="font-bold truncate block">{row.shortStories}</span>
                          </div>
                        )}
                      </div>
                    ) : <p className="text-xs text-slate-400 italic py-4 text-center">Không có lịch học</p>}
                  </div>

                  <button className={`mt-3 text-[10px] font-black uppercase text-center py-1.5 rounded-xl border ${today ? 'bg-white/20 text-white border-white/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                    Chỉnh sửa ✎
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 3. GOOGLE CALENDAR DAY VIEW ────────────────────────────────────────── */}
      {viewMode === 'day' && (
        <div className="space-y-4 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className={`font-black text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <i className="fa-solid fa-calendar-day text-indigo-500 mr-2" /> Xem theo Ngày
            </h3>
            <div className="flex items-center gap-2">
              <button onClick={jumpToToday} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow">
                Về Hôm nay ({todayStr})
              </button>
              <select value={selectedDayDate} onChange={e => setSelectedDayDate(e.target.value)}
                className={`border rounded-xl px-3 py-2 text-xs font-bold focus:outline-none ${isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                  }`}>
                {safeRows.map(r => (
                  <option key={r.id} value={r.date}>{r.dow}, {r.date} {isToday(r.date) ? '🔥 (Hôm nay)' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {activeDayRow && (
            <div className={`p-6 md:p-8 rounded-3xl border shadow-xl flex flex-col gap-6 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider">
                    {activeDayRow.dow} {isToday(activeDayRow.date) && <span className="bg-amber-500 text-slate-900 px-2 py-0.5 rounded font-black ml-2">Hôm nay</span>}
                  </span>
                  <h2 className={`text-3xl md:text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{activeDayRow.date}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => toggleRowStatusQuick(activeDayRow.id)}
                    className={`px-4 py-2.5 rounded-2xl font-bold text-sm shadow transition flex items-center gap-2 ${activeDayRow.status === 'Complete' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                    <i className={`fa-solid ${activeDayRow.status === 'Complete' ? 'fa-circle-check' : 'fa-circle-dot'}`} />
                    {activeDayRow.status === 'Complete' ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                  </button>
                  <button onClick={() => setEditingRow(activeDayRow)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow flex items-center gap-2">
                    <i className="fa-solid fa-pen-to-square" /> Sửa
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_COLS.map(col => {
                  const val = activeDayRow[col.key];
                  return (
                    <div key={col.key} className={`p-4 rounded-2xl border flex items-start gap-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                      }`}>
                      <i className={`fa-solid ${col.icon} text-indigo-500 text-lg mt-0.5`} />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-slate-400 block uppercase">{col.label}</span>
                        <input value={val || ''} onChange={e => updateCellInline(activeDayRow.id, col.key, e.target.value)}
                          placeholder="Chưa nhập..."
                          className={`w-full bg-transparent font-bold text-sm focus:outline-none border-b border-transparent hover:border-indigo-500 focus:border-indigo-500 ${isLight ? 'text-slate-800' : 'text-slate-100'
                            }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── 4. FULL EDITABLE TABLE VIEW WITH COLUMN TOGGLES ────────────────────── */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/90 border-slate-700'}`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              <i className="fa-solid fa-sliders mr-1.5" /> Ẩn/Hiện cột cần chỉnh sửa:
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_COLS.map(c => {
                const active = visibleCols.includes(c.key);
                return (
                  <button key={c.key} onClick={() => toggleColumnVisibility(c.key)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${active
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                    <i className={`fa-solid ${active ? 'fa-eye' : 'fa-eye-slash'}`} /> {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`overflow-x-auto rounded-3xl border shadow-xl ${isLight ? 'bg-white border-slate-200' : 'bg-[#0b0f19] border-slate-800'
            }`}>
            <table className="w-full text-sm border-collapse" style={{ minWidth: 1200 }}>
              <thead>
                <tr className={`text-xs font-black uppercase tracking-wider ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-400'}`}>
                  <th className="px-3 py-3 text-left w-28">Ngày</th>
                  <th className="px-2 py-3 text-center w-14">Thứ</th>
                  {ALL_COLS.filter(c => visibleCols.includes(c.key)).map(c => (
                    <th key={c.key} className="px-2 py-3 text-left">{c.label}</th>
                  ))}
                  <th className="px-3 py-3 text-center w-28">Trạng thái</th>
                  <th className="px-2 py-3 w-10">Sửa</th>
                </tr>
              </thead>
              <tbody>
                {safeRows.map(row => (
                  <tr key={row.id} className="border-t border-slate-200 dark:border-slate-800/60 hover:bg-indigo-50/30">
                    <td className="px-3 py-2 font-bold text-xs">{row.date} {isToday(row.date) && <span className="text-[9px] bg-amber-400 text-slate-900 px-1 py-0.5 rounded font-black">Hôm nay</span>}</td>
                    <td className="px-2 py-2 text-center text-xs font-semibold">{row.dow}</td>

                    {ALL_COLS.filter(c => visibleCols.includes(c.key)).map(c => (
                      <td key={c.key} className="px-2 py-2">
                        <input value={row[c.key] || ''} onChange={e => updateCellInline(row.id, c.key, e.target.value)}
                          placeholder="—"
                          className={`w-full border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-indigo-500 font-medium ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`} />
                      </td>
                    ))}

                    <td className="px-3 py-2 text-center">
                      <select value={row.status || ''} onChange={e => updateCellInline(row.id, 'status', e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2 py-1 border focus:outline-none ${row.status === 'Complete' ? 'bg-emerald-500 text-white' : isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                          }`}>
                        <option value="">Chưa làm</option>
                        <option value="Complete">Complete</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Incomplete">Incomplete</option>
                      </select>
                    </td>
                    <td className="px-2 py-2 text-center">
                      <button onClick={() => setEditingRow(row)} className="text-indigo-500 hover:text-indigo-400 p-1">
                        <i className="fa-solid fa-pen-to-square text-xs" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full Edit Modal Popup */}
      {editingRow && (
        <EventEditModal row={editingRow} onClose={() => setEditingRow(null)} onSaveRow={saveUpdatedRow} isLight={isLight} />
      )}
    </div>
  );
}
