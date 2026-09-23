import React, { useState, useMemo, useRef } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ReferenceLine, ResponsiveContainer
} from 'recharts';

export function convertListeningToTOEIC(correct) {
  const c = Math.max(0, Math.min(100, Math.round(+correct || 0)));
  if (c === 0) return 5;
  if (c <= 5) return 5 + c * 5;
  if (c <= 15) return 30 + (c - 5) * 5;
  if (c <= 30) return 80 + (c - 15) * 5;
  if (c <= 45) return 155 + (c - 30) * 5;
  if (c <= 60) return 230 + (c - 45) * 5;
  if (c <= 75) return 305 + (c - 60) * 5;
  if (c <= 90) return 380 + (c - 75) * 6;
  if (c <= 95) return 470 + (c - 90) * 3;
  return Math.min(495, 485 + (c - 95) * 2);
}

export function convertReadingToTOEIC(correct) {
  const c = Math.max(0, Math.min(100, Math.round(+correct || 0)));
  if (c === 0) return 5;
  if (c <= 5) return 5 + c * 5;
  if (c <= 15) return 30 + (c - 5) * 5;
  if (c <= 30) return 80 + (c - 15) * 5;
  if (c <= 45) return 155 + (c - 30) * 5;
  if (c <= 60) return 230 + (c - 45) * 5;
  if (c <= 75) return 305 + (c - 60) * 5;
  if (c <= 90) return 380 + (c - 75) * 5;
  if (c <= 95) return 455 + (c - 90) * 6;
  return Math.min(495, 485 + (c - 95) * 2);
}

const MILESTONES = [
  { score: 400, label: 'Beginner', color: '#6b7280', icon: '🌱' },
  { score: 550, label: 'Elementary', color: '#10b981', icon: '📗' },
  { score: 650, label: 'Intermediate', color: '#3b82f6', icon: '📘' },
  { score: 750, label: 'Upper-Inter', color: '#8b5cf6', icon: '📙' },
  { score: 850, label: 'Advanced', color: '#f59e0b', icon: '🏆' },
  { score: 900, label: 'Proficient', color: '#ef4444', icon: '🌟' },
  { score: 990, label: 'Perfect', color: '#ec4899', icon: '💎' },
];

function getMilestone(total) {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (total >= MILESTONES[i].score) return MILESTONES[i];
  }
  return MILESTONES[0];
}

const ENTRY_EMPTY = {
  date: new Date().toISOString().split('T')[0],
  source: 'Sample TOEIC Test 1 (Study4)',
  url: '',
  inputMode: 'correct_count',
  lisCorrect: '',
  readCorrect: '',
  unanswered: '',
  timeSpent: '',
  listening: '',
  reading: '',
  total: '',
  note: ''
};

export default function ScoreManager({ theme }) {
  const [entries, setEntries]         = useUserStorage('score_entries_v2', []);
  const [targetScore, setTargetScore] = useUserStorage('target_score', 750);
  const [showForm, setShowForm]       = useState(false);
  const [editingId, setEditingId]     = useState(null);
  const [form, setForm]               = useState(ENTRY_EMPTY);
  const [filterDays, setFilterDays]   = useState(90);
  const formRef                       = useRef(null);

  const isLight = theme === 'light';
  const safeEntries = useMemo(() => (Array.isArray(entries) ? entries : []), [entries]);

  const handleInputChange = (field, val) => {
    setForm(prev => {
      const next = { ...prev, [field]: val };
      if (next.inputMode === 'correct_count') {
        const lisScore = next.lisCorrect !== '' ? convertListeningToTOEIC(+next.lisCorrect) : 0;
        const readScore = next.readCorrect !== '' ? convertReadingToTOEIC(+next.readCorrect) : 0;
        next.listening = lisScore;
        next.reading = readScore;
        next.total = lisScore + readScore;
      } else {
        next.total = (+next.listening || 0) + (+next.reading || 0);
      }
      return next;
    });
  };

  const handleEdit = (entry) => {
    setForm({ ...ENTRY_EMPTY, ...entry });
    setEditingId(entry.id);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const handleCancel = () => {
    setForm(ENTRY_EMPTY);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listening = +form.listening || 0;
    const reading = +form.reading || 0;
    const total = listening + reading;

    if (editingId) {
      setEntries(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === editingId ? {
        ...form,
        listening,
        reading,
        total
      } : item));
      setEditingId(null);
    } else {
      setEntries(prev => [...(Array.isArray(prev) ? prev : []), {
        ...form,
        listening,
        reading,
        total,
        id: Date.now()
      }]);
    }

    setForm(ENTRY_EMPTY);
    setShowForm(false);
  };

  const filteredEntries = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - filterDays);
    return safeEntries
      .filter(e => e && e.date && new Date(e.date) >= cutoff)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [safeEntries, filterDays]);

  const chartData = filteredEntries.map(e => ({
    date: new Date(e.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }),
    'Listening': +e.listening || 0,
    'Reading': +e.reading || 0,
    'Tổng': +e.total || 0,
    'Chưa làm': +e.unanswered || 0,
    fullDate: e.date,
    source: e.source,
  }));

  const latestEntry = safeEntries.length > 0 ? [...safeEntries].sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;
  const currentMilestone = latestEntry ? getMilestone(+latestEntry.total || 0) : null;
  const totalUnanswered = safeEntries.reduce((acc, curr) => acc + (+curr?.unanswered || 0), 0);
  const avgUnanswered = safeEntries.length > 0 ? (totalUnanswered / safeEntries.length).toFixed(1) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className={`text-2xl font-black flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <i className="fa-solid fa-chart-line text-indigo-500" />
            Điểm & Tiến bộ
          </h2>
          <p className="text-slate-500 text-sm mt-1">{safeEntries.length} bài thi đã ghi nhận • Tự động quy đổi điểm TOEIC</p>
        </div>
        <button onClick={() => {
          if (showForm && editingId) {
            handleCancel();
          } else {
            setShowForm(s => !s);
            if (showForm) handleCancel();
          }
        }}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-600/20">
          <i className="fa-solid fa-plus" /> Thêm kết quả bài thi
        </button>
      </div>

      {/* Entry Form */}
      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className={`border rounded-2xl p-5 flex flex-col gap-4 shadow-lg transition-all ${
          editingId ? 'ring-2 ring-indigo-500 shadow-indigo-500/20' : ''
        } ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <h3 className={`font-black text-base flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <i className="fa-solid fa-pen-to-square text-indigo-500" /> {editingId ? 'Chỉnh sửa kết quả bài thi' : 'Nhập kết quả bài thi'}
            </h3>
            {/* Input Mode Switch */}
            <div className={`flex rounded-xl p-1 border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-700'}`}>
              <button type="button" onClick={() => handleInputChange('inputMode', 'correct_count')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${form.inputMode === 'correct_count' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}>
                <i className="fa-solid fa-calculator mr-1.5" /> Nhập số câu đúng (Quy đổi điểm)
              </button>
              <button type="button" onClick={() => handleInputChange('inputMode', 'direct_score')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${form.inputMode === 'direct_score' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}>
                <i className="fa-solid fa-trophy mr-1.5" /> Nhập điểm trực tiếp
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500">Ngày thi *</label>
              <input type="date" value={form.date} onChange={e => handleInputChange('date', e.target.value)} required
                className={`border text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                }`} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500">Tên bài thi / Nguồn (VD: Study4 Test 1) *</label>
              <input value={form.source} onChange={e => handleInputChange('source', e.target.value)} required
                placeholder="VD: Sample TOEIC Test 1 (Study4)"
                className={`border text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                }`} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500">Link bài thi (URL)</label>
              <input value={form.url} onChange={e => handleInputChange('url', e.target.value)}
                placeholder="https://study4.com/tests/..."
                className={`border text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                }`} />
            </div>
          </div>

          {/* Mode Inputs */}
          {form.inputMode === 'correct_count' ? (
            <div className={`border rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-3 ${
              isLight ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-900/80 border-indigo-900/50'
            }`}>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-indigo-600 dark:text-indigo-300 font-bold">Listening (Số câu đúng / 100)</label>
                <input type="number" min="0" max="100" value={form.lisCorrect}
                  onChange={e => handleInputChange('lisCorrect', e.target.value)} placeholder="0 – 100"
                  className={`border font-bold text-base rounded-xl px-3 py-2 focus:outline-none ${
                    isLight ? 'bg-white border-indigo-300 text-slate-900' : 'bg-slate-800 border-indigo-500 text-white'
                  }`} />
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">→ Quy đổi: {form.listening} điểm</span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-violet-600 dark:text-violet-300 font-bold">Reading (Số câu đúng / 100)</label>
                <input type="number" min="0" max="100" value={form.readCorrect}
                  onChange={e => handleInputChange('readCorrect', e.target.value)} placeholder="0 – 100"
                  className={`border font-bold text-base rounded-xl px-3 py-2 focus:outline-none ${
                    isLight ? 'bg-white border-violet-300 text-slate-900' : 'bg-slate-800 border-violet-500 text-white'
                  }`} />
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">→ Quy đổi: {form.reading} điểm</span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-amber-600 dark:text-amber-300 font-bold">Số câu KHÔNG kịp làm</label>
                <input type="number" min="0" max="200" value={form.unanswered}
                  onChange={e => handleInputChange('unanswered', e.target.value)} placeholder="VD: 5 câu"
                  className={`border font-bold text-base rounded-xl px-3 py-2 focus:outline-none ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                  }`} />
                <span className="text-[11px] text-slate-400">Ưóc lượng thời gian</span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500">Thời gian làm bài</label>
                <input value={form.timeSpent}
                  onChange={e => handleInputChange('timeSpent', e.target.value)} placeholder="VD: 01:14:36 hoặc 75 phút"
                  className={`border font-bold text-base rounded-xl px-3 py-2 focus:outline-none ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                  }`} />
                <span className="text-[11px] text-slate-400">Thời gian thực tế</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Điểm Listening (0–495)</label>
                <input type="number" min="0" max="495" value={form.listening}
                  onChange={e => handleInputChange('listening', e.target.value)} placeholder="0–495"
                  className={`border rounded-xl px-3 py-2 text-sm focus:outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-violet-600 dark:text-violet-400 font-bold">Điểm Reading (0–495)</label>
                <input type="number" min="0" max="495" value={form.reading}
                  onChange={e => handleInputChange('reading', e.target.value)} placeholder="0–495"
                  className={`border rounded-xl px-3 py-2 text-sm focus:outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-amber-600 dark:text-amber-300 font-bold">Số câu không làm kịp</label>
                <input type="number" min="0" max="200" value={form.unanswered}
                  onChange={e => handleInputChange('unanswered', e.target.value)} placeholder="VD: 10 câu"
                  className={`border rounded-xl px-3 py-2 text-sm focus:outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500">Thời gian làm bài</label>
                <input value={form.timeSpent} onChange={e => handleInputChange('timeSpent', e.target.value)} placeholder="VD: 01:14:36"
                  className={`border rounded-xl px-3 py-2 text-sm focus:outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                  }`} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-sm font-black text-indigo-600 dark:text-indigo-300">
              Tổng điểm dự kiến: <span className="text-2xl text-emerald-600 dark:text-emerald-400 ml-1">{form.total || 0}</span> / 990
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={handleCancel} className={`px-4 py-2 rounded-xl font-bold text-sm ${
                isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-700 text-slate-200'
              }`}>Hủy</button>
              <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg">
                {editingId ? 'Cập nhật' : 'Lưu kết quả'}
              </button>
            </div>
          </div>
        </form>
      )}

      {safeEntries.length > 0 && (
        <>
          {/* Top Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`rounded-2xl p-4 border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Điểm mới nhất</p>
              <p className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{latestEntry?.total || '—'}</p>
              {currentMilestone && <p className="text-xs mt-1 font-bold" style={{ color: currentMilestone.color }}>{currentMilestone.icon} {currentMilestone.label}</p>}
            </div>
            <div className={`rounded-2xl p-4 border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Điểm cao nhất</p>
              <p className="text-3xl font-black text-emerald-500">{Math.max(...safeEntries.map(e => +e.total || 0))}</p>
            </div>
            <div className={`rounded-2xl p-4 border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
              <p className="text-xs text-amber-500 font-bold uppercase tracking-widest mb-1">TB câu chưa làm kịp</p>
              <p className="text-3xl font-black text-amber-500">{avgUnanswered} <span className="text-xs font-normal text-slate-400">câu/đề</span></p>
            </div>
            <div className={`rounded-2xl p-4 border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Mục tiêu TOEIC</p>
              <div className="flex items-center gap-2">
                <input type="number" value={targetScore} onChange={e => setTargetScore(+e.target.value)} min="300" max="990" step="50"
                  className={`w-20 border font-black text-xl rounded-xl px-2 py-0.5 focus:outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-amber-600' : 'bg-slate-900 border-slate-700 text-yellow-300'
                  }`} />
                <span className="text-slate-400 text-sm font-bold">/ 990</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className={`border rounded-2xl p-5 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <h3 className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>📈 Tiến trình điểm số & Tốc độ làm bài</h3>
              <div className="flex gap-2">
                {[30, 90, 365].map(d => (
                  <button key={d} onClick={() => setFilterDays(d)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                      filterDays === d
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}>
                    {d === 30 ? '1 tháng' : d === 90 ? '3 tháng' : '1 năm'}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e2e8f0' : '#1e293b'} />
                <XAxis dataKey="date" tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 990]} tick={{ fill: isLight ? '#64748b' : '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: isLight ? '#ffffff' : '#0f172a', borderColor: isLight ? '#cbd5e1' : '#334155', borderRadius: '12px', color: isLight ? '#0f172a' : '#ffffff' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <ReferenceLine y={targetScore} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: `Mục tiêu ${targetScore}`, fill: '#f59e0b', fontSize: 11 }} />
                <Line type="monotone" dataKey="Listening" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
                <Line type="monotone" dataKey="Reading" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} />
                <Line type="monotone" dataKey="Tổng" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* History table */}
          <div className={`border rounded-2xl overflow-hidden shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'
          }`}>
            <div className={`px-5 py-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-700'}`}>
              <h3 className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}><i className="fa-solid fa-list-check mr-2 text-indigo-500" />Lịch sử làm bài ({safeEntries.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b text-xs font-black uppercase tracking-wider ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-900/50 border-slate-700 text-slate-400'
                  }`}>
                    <th className="px-4 py-3 text-left">Ngày</th>
                    <th className="px-4 py-3 text-left">Bài thi</th>
                    <th className="px-4 py-3 text-center">Listening</th>
                    <th className="px-4 py-3 text-center">Reading</th>
                    <th className="px-4 py-3 text-center">Tổng điểm</th>
                    <th className="px-4 py-3 text-center">Chưa làm kịp</th>
                    <th className="px-4 py-3 text-center">Thời gian</th>
                    <th className="px-4 py-3 text-center">Link</th>
                    <th className="px-4 py-3 text-center w-16">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {[...safeEntries].sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => {
                    const ms = getMilestone(+e.total || 0);
                    return (
                      <tr key={e.id} className={`border-t transition ${
                        isLight ? 'border-slate-100 hover:bg-slate-50' : 'border-slate-700/50 hover:bg-slate-700/30'
                      }`}>
                        <td className="px-4 py-3 text-slate-500 text-xs">{new Date(e.date).toLocaleDateString('vi-VN')}</td>
                        <td className={`px-4 py-3 font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{e.source}</td>
                        <td className="px-4 py-3 text-center text-indigo-600 dark:text-indigo-400 font-bold">
                          {e.listening} {e.lisCorrect ? <span className="text-[10px] text-slate-400">({e.lisCorrect}/100)</span> : ''}
                        </td>
                        <td className="px-4 py-3 text-center text-violet-600 dark:text-violet-400 font-bold">
                          {e.reading} {e.readCorrect ? <span className="text-[10px] text-slate-400">({e.readCorrect}/100)</span> : ''}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-black text-base" style={{ color: ms.color }}>{e.total}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {e.unanswered ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-300 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700">
                              {e.unanswered} câu
                            </span>
                          ) : <span className="text-slate-400">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-300 text-xs font-mono">{e.timeSpent || '—'}</td>
                        <td className="px-4 py-3 text-center">
                          {e.url && <a href={e.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-500"><i className="fa-solid fa-arrow-up-right-from-square text-xs" /></a>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => handleEdit(e)} className="text-slate-400 hover:text-indigo-500 transition" title="Chỉnh sửa">
                              <i className="fa-solid fa-pen text-xs" />
                            </button>
                            <button onClick={() => setEntries(prev => prev.filter(x => x.id !== e.id))} className="text-slate-400 hover:text-rose-500 transition" title="Xóa">
                              <i className="fa-solid fa-trash-can text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {safeEntries.length === 0 && !showForm && (
        <div className={`text-center py-16 px-6 border rounded-3xl flex flex-col items-center justify-center ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/40 border-slate-700/60'
        }`}>
          <p className={`font-bold text-xl mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Chưa có kết quả bài thi nào</p>
          <p className="text-slate-400 text-sm mb-6 max-w-md">Nhấn "Thêm kết quả bài thi" để bắt đầu quy đổi điểm & theo dõi tiến trình</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition shadow-lg flex items-center gap-2">
            <i className="fa-solid fa-plus" /> Thêm kết quả đầu tiên
          </button>
        </div>
      )}
    </div>
  );
}
