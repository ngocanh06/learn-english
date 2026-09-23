import React, { useState, useMemo } from 'react';
import { page1Index, page2Index, fullIndex } from '../data/lessons';
import { GRAMMAR_CLUSTERS } from '../data/grammarClusters';
import Quiz from './Quiz';
import GrammarAudioPlayer from './GrammarAudioPlayer';
import { useUserStorage } from '../hooks/useUserStorage';

export default function GrammarPage({ theme, initialLessonId, dateKey, onNavigate }) {
  const isLight = theme === 'light';

  // Persistence: Remembered items, Favorites items, Quiz scores, Calendar completed tasks
  const [rememberedIds, setRememberedIds] = useUserStorage('grammar_remembered_v2', {});
  const [favoriteIds, setFavoriteIds] = useUserStorage('grammar_favorites_v2', {});
  const [grammarScores, setGrammarScores] = useUserStorage('grammar_scores_v2', {});
  const [completedCalendarTasks, setCompletedCalendarTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});

  // Layout View: 'clusters' (Gom nhóm chuyên đề thông minh - Mặc định) | 'flat' (Danh sách tuần tự 1-115)
  const [layoutMode, setLayoutMode] = useState('clusters');

  // Volume / Book Page (when in 'flat' mode): 1 (Tập 1: 100 bài) | 2 (Tập 2: 15 bài Mở rộng & Trọng âm)
  const [activeVolume, setActiveVolume] = useState(1);

  // Navigation & View mode: 'list' (Danh sách mục lục) vs 'detail' (Chi tiết bài học)
  const [savedViewMode, setSavedViewMode] = useUserStorage('grammar_last_view_mode_v2', 'list');
  const [savedLessonId, setSavedLessonId] = useUserStorage('grammar_last_lesson_id_v2', '1');

  const [viewMode, setViewModeState] = useState(
    initialLessonId ? 'detail' : (savedViewMode || 'list')
  );
  const [selectedLessonId, setSelectedLessonIdState] = useState(
    initialLessonId ? String(initialLessonId) : (savedLessonId || '1')
  );

  const setViewMode = (mode) => {
    setViewModeState(mode);
    setSavedViewMode(mode);
  };

  const setSelectedLessonId = (id) => {
    setSelectedLessonIdState(id);
    setSavedLessonId(id);
  };

  React.useEffect(() => {
    if (initialLessonId) {
      setSelectedLessonId(String(initialLessonId));
      setViewMode('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialLessonId]);

  // Sync with browser Back/Forward buttons for lesson view
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '';
      if (hash.includes('grammar')) {
        const queryIdx = hash.indexOf('?');
        if (queryIdx !== -1) {
          const params = new URLSearchParams(hash.slice(queryIdx));
          const lid = params.get('lessonId');
          if (lid) {
            setSelectedLessonIdState(lid);
            setViewModeState('detail');
            return;
          }
        }
        setViewModeState('list');
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  // Expanded clusters in accordion view (Map of clusterId -> boolean)
  const [expandedClusters, setExpandedClusters] = useState({
    'c1-tobe': true,
    'c6-passive': true,
    'c7-wishes': true,
  });

  // Filter: 'all' (Tất cả) | 'unremembered' (Chưa nhớ) | 'remembered' (Đã nhớ) | 'favorites' (Thích)
  const [filterMode, setFilterMode] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Quiz state inside detail view (Permanently persisted)
  const [quizState, setQuizState] = useUserStorage('grammar_quiz_answers_v1', {});
  const [quizSubmitted, setQuizSubmitted] = useUserStorage('grammar_quiz_submitted_v1', {});

  // Toggle Remembered status & auto-sync to Calendar
  const toggleRemembered = (id, e) => {
    if (e) e.stopPropagation();
    const nextVal = !rememberedIds[id];
    setRememberedIds((prev) => ({
      ...prev,
      [id]: nextVal,
    }));

    // Auto-sync with calendar completed tasks for today or provided dateKey
    const now = new Date();
    const todayDateKey = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const targetDate = dateKey || todayDateKey;

    setCompletedCalendarTasks((prev) => ({
      ...prev,
      [`${targetDate}_grammar`]: nextVal,
    }));
  };

  // Toggle Favorite status
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavoriteIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle Cluster Accordion
  const toggleCluster = (clusterId) => {
    setExpandedClusters((prev) => ({
      ...prev,
      [clusterId]: !prev[clusterId],
    }));
  };

  const expandAllClusters = () => {
    const all = {};
    GRAMMAR_CLUSTERS.forEach((c) => (all[c.id] = true));
    setExpandedClusters(all);
  };

  const collapseAllClusters = () => {
    setExpandedClusters({});
  };

  // Current volume pool for flat list
  const currentVolumeList = activeVolume === 1 ? page1Index : page2Index;

  // Filter lessons in flat mode
  const filteredFlatLessons = useMemo(() => {
    const source = searchTerm.trim() ? fullIndex : currentVolumeList;

    return source.filter((lesson) => {
      const isRem = !!rememberedIds[lesson.id];
      const isFav = !!favoriteIds[lesson.id];

      const titleMatch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lesson.subtitle && lesson.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!titleMatch) return false;

      if (filterMode === 'remembered') return isRem;
      if (filterMode === 'unremembered') return !isRem;
      if (filterMode === 'favorites') return isFav;
      return true;
    });
  }, [searchTerm, filterMode, rememberedIds, favoriteIds, currentVolumeList]);

  // Grouped Clusters Calculation
  const clusterGroupsData = useMemo(() => {
    return GRAMMAR_CLUSTERS.map((cluster) => {
      // Find all lesson objects in this cluster
      const clusterLessons = cluster.lessonIds
        .map((id) => fullIndex.find((l) => l.id === id))
        .filter(Boolean);

      // Apply search & filter
      const filteredClusterLessons = clusterLessons.filter((lesson) => {
        const isRem = !!rememberedIds[lesson.id];
        const isFav = !!favoriteIds[lesson.id];

        const titleMatch =
          !searchTerm.trim() ||
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (lesson.subtitle && lesson.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!titleMatch) return false;

        if (filterMode === 'remembered') return isRem;
        if (filterMode === 'unremembered') return !isRem;
        if (filterMode === 'favorites') return isFav;
        return true;
      });

      // Progress in this cluster
      const totalInCluster = clusterLessons.length;
      const rememberedInCluster = clusterLessons.filter((l) => !!rememberedIds[l.id]).length;
      const percentInCluster =
        totalInCluster > 0 ? Math.round((rememberedInCluster / totalInCluster) * 100) : 0;

      return {
        ...cluster,
        totalLessons: totalInCluster,
        rememberedLessons: rememberedInCluster,
        percent: percentInCluster,
        lessons: filteredClusterLessons,
      };
    }).filter((c) => c.lessons.length > 0 || !searchTerm.trim());
  }, [rememberedIds, favoriteIds, searchTerm, filterMode]);

  const currentLesson = useMemo(
    () => fullIndex.find((l) => l.id === selectedLessonId) || fullIndex[0],
    [selectedLessonId]
  );

  // Open detail view for a lesson
  const openLessonDetail = (id) => {
    setSelectedLessonId(id);
    setViewMode('detail');
    try {
      window.location.hash = `#/grammar?lessonId=${id}`;
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOptionSelect = (lid, qi, oi) => {
    if (quizSubmitted[lid]) return;
    setQuizState((p) => ({ ...p, [lid]: { ...(p[lid] || {}), [qi]: oi } }));
  };

  const submitQuiz = (lid, scorePercent, answers) => {
    setQuizSubmitted((p) => ({ ...p, [lid]: true }));
    setGrammarScores((prev) => ({ ...prev, [lid]: scorePercent }));

    if (scorePercent >= 60) {
      setRememberedIds((prev) => ({ ...prev, [lid]: true }));
    }
  };

  const resetQuiz = (lid) => {
    setQuizSubmitted((p) => ({ ...p, [lid]: false }));
    setQuizState((p) => {
      const s = { ...p };
      delete s[lid];
      return s;
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 font-sans">
      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ─── 1. LIST VIEW: NGỮ PHÁP TỔNG HỢP (GOM NHÓM HOẶC TUẦN TỰ) ─── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-4">
          {/* Return to Calendar Banner if opened from Calendar */}
          {dateKey && onNavigate && (
            <div
              className={`p-3 px-4 rounded-2xl border flex items-center justify-between gap-3 text-xs animate-fadeIn ${
                isLight
                  ? 'bg-blue-50/90 border-blue-200 text-blue-900 shadow-xs'
                  : 'bg-blue-950/40 border-blue-800 text-blue-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-check text-blue-500 text-sm shrink-0" />
                <span>
                  Đang xem bài học từ lịch học ngày <strong>{dateKey}</strong>.
                </span>
              </div>
              <button
                onClick={() =>
                  onNavigate('ai-coach', {
                    dateKey,
                    tab: 'calendar-view',
                  })
                }
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shrink-0 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-[11px]" />
                <span>Quay lại Lịch học {dateKey}</span>
              </button>
            </div>
          )}

          {/* Top Header Bar */}
          <div
            className={`p-4 md:p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-sm">
                <i className="fa-solid fa-book-open" />
              </span>
              <div>
                <h1 className="text-base md:text-xl font-extrabold text-slate-900 dark:text-white">
                  Ngữ Pháp Tổng Hợp (115 Bài Học)
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Đã nhớ: <strong className="text-emerald-500">{Object.values(rememberedIds).filter(Boolean).length}</strong> / {fullIndex.length} bài • Yêu thích: <strong className="text-amber-400">{Object.values(favoriteIds).filter(Boolean).length}</strong> bài
                </p>
              </div>
            </div>

            {/* Layout Mode Switcher: Gom nhóm vs Tuần tự */}
            <div className="flex items-center gap-1.5 self-end sm:self-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <button
                onClick={() => setLayoutMode('clusters')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  layoutMode === 'clusters'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Gom các bài cùng chủ đề vào 1 nhóm lớn"
              >
                <i className="fa-solid fa-layer-group text-[11px]" />
                <span>Gom Nhóm (16 Chuyên Đề)</span>
              </button>

              <button
                onClick={() => setLayoutMode('flat')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  layoutMode === 'flat'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Xem tuần tự bài 1 đến 115"
              >
                <i className="fa-solid fa-list-ol text-[11px]" />
                <span>Tuần Tự (1-115)</span>
              </button>
            </div>
          </div>

          {/* ─── 4 FILTER RADIO OPTIONS & SEARCH BAR ─── */}
          <div
            className={`p-3.5 px-4 rounded-2xl border flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-hide select-none ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'unremembered', label: 'Chưa Nhớ' },
              { id: 'remembered', label: 'Đã Nhớ' },
              { id: 'favorites', label: 'Thích ⭐' },
            ].map((tab) => {
              const checked = filterMode === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setFilterMode(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap text-xs md:text-sm font-extrabold transition-all border ${
                    checked
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${checked ? 'bg-white' : 'bg-blue-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Quick Search */}
            <div className="ml-auto relative max-w-[140px] sm:max-w-[180px] w-full shrink-0">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm bài học..."
                className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                }`}
              />
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── A. CHẾ ĐỘ GOM NHÓM CHUYÊN ĐỀ (SMART ACCORDION CLUSTERS) ─── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {layoutMode === 'clusters' && (
            <div className="space-y-4">
              {/* Expand / Collapse Action Bar */}
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold">
                  16 Chuyên Đề Trọng Tâm (Đã gom các bài cùng chủ đề vào 1 nhóm)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={expandAllClusters}
                    className="text-blue-500 hover:underline font-bold"
                  >
                    Mở tất cả
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <button
                    onClick={collapseAllClusters}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                  >
                    Thu gọn
                  </button>
                </div>
              </div>

              {/* Cluster Accordion Cards */}
              <div className="space-y-3.5">
                {clusterGroupsData.map((cluster, clusterIdx) => {
                  const isOpen = !!expandedClusters[cluster.id] || searchTerm.trim().length > 0;

                  return (
                    <div
                      key={cluster.id}
                      className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                        isLight
                          ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                          : 'bg-slate-900 border-slate-800/90 hover:border-slate-700'
                      }`}
                    >
                      {/* Cluster Header Bar (Clickable) */}
                      <div
                        onClick={() => toggleCluster(cluster.id)}
                        className={`p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition ${
                          isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Sleek Minimal Number Badge */}
                          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700/60">
                            {String(clusterIdx + 1).padStart(2, '0')}
                          </div>

                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm md:text-[15px] font-extrabold text-slate-900 dark:text-white leading-tight">
                                {cluster.title.replace(/^\d+\.\s*/, '')}
                              </h3>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 font-mono">
                                {cluster.lessons.length} bài
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {cluster.desc}
                            </p>
                          </div>
                        </div>

                        {/* Right: Progress & Chevron */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                              {cluster.rememberedLessons} / {cluster.totalLessons} đã nhớ
                            </span>
                            <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mt-1">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${cluster.percent}%` }}
                              />
                            </div>
                          </div>

                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                              isOpen ? 'rotate-180 bg-blue-600/10 text-blue-500' : 'text-slate-400'
                            }`}
                          >
                            <i className="fa-solid fa-chevron-down text-xs" />
                          </div>
                        </div>
                      </div>

                      {/* Cluster Child Lessons (Clean Sequential Numbering: 1, 2, 3...) */}
                      {isOpen && (
                        <div
                          className={`border-t divide-y ${
                            isLight
                              ? 'border-slate-100 divide-slate-100 bg-slate-50/40'
                              : 'border-slate-800/80 divide-slate-800/60 bg-slate-950/40'
                          }`}
                        >
                          {cluster.lessons.length === 0 ? (
                            <div className="p-4 text-center text-xs text-slate-400">
                              Không có bài học nào khớp với bộ lọc trong chuyên đề này
                            </div>
                          ) : (
                            cluster.lessons.map((lesson, idx) => {
                              const isRem = !!rememberedIds[lesson.id];
                              const isFav = !!favoriteIds[lesson.id];
                              const score = grammarScores[lesson.id];
                              const cleanTitle = lesson.title.includes('. ')
                                ? lesson.title.split('. ')[1]
                                : lesson.title;

                              return (
                                <div
                                  key={lesson.id}
                                  onClick={() => openLessonDetail(lesson.id)}
                                  className={`p-3.5 px-5 md:px-6 flex items-center justify-between gap-4 cursor-pointer transition-colors group ${
                                    isLight ? 'hover:bg-blue-50/60' : 'hover:bg-slate-800/50'
                                  }`}
                                >
                                  {/* Left: Clean Sequential Number & Title */}
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <span className="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[11px] font-black shrink-0 font-mono">
                                      {idx + 1}
                                    </span>

                                    <div className="min-w-0 flex-1 space-y-0.5">
                                      <h4 className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline leading-snug truncate">
                                        {cleanTitle}
                                      </h4>

                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 truncate">
                                          {lesson.subtitle || lesson.category}
                                        </span>
                                        {score !== undefined && (
                                          <span className="text-[10px] font-bold font-mono px-1.5 rounded bg-emerald-500/10 text-emerald-500">
                                            Điểm: {score}%
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Actions: Favorite & Remembered */}
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      onClick={(e) => toggleFavorite(lesson.id, e)}
                                      className={`p-1.5 rounded-lg transition ${
                                        isFav
                                          ? 'text-amber-400 hover:scale-110'
                                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                                      }`}
                                      title={isFav ? 'Bỏ thích' : 'Đánh dấu Thích'}
                                    >
                                      <i
                                        className={`fa-${isFav ? 'solid' : 'regular'} fa-star text-base`}
                                      />
                                    </button>

                                    <button
                                      onClick={(e) => toggleRemembered(lesson.id, e)}
                                      className={`p-1.5 rounded-lg transition ${
                                        isRem
                                          ? 'text-emerald-500 hover:scale-110'
                                          : 'text-slate-300 dark:text-slate-600 hover:text-emerald-500'
                                      }`}
                                      title={
                                        isRem
                                          ? 'Đã nhớ (Bấm để hủy)'
                                          : 'Chưa nhớ (Bấm để đánh dấu Đã nhớ)'
                                      }
                                    >
                                      <i
                                        className={`fa-${isRem ? 'solid' : 'regular'} fa-circle-check text-lg`}
                                      />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ─── B. CHẾ ĐỘ DANH SÁCH TUẦN TỰ (FLAT LIST VIEW 1-115) ───────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {layoutMode === 'flat' && (
            <div className="space-y-4">
              <div
                className={`rounded-3xl border divide-y overflow-hidden shadow-sm transition-all ${
                  isLight
                    ? 'bg-white border-slate-200 divide-slate-100'
                    : 'bg-slate-900 border-slate-800 divide-slate-800/80'
                }`}
              >
                {filteredFlatLessons.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <i className="fa-solid fa-inbox text-3xl mb-2 opacity-50" />
                    <p className="font-bold text-sm">Không có bài học nào trong danh mục này</p>
                  </div>
                ) : (
                  filteredFlatLessons.map((lesson) => {
                    const isRem = !!rememberedIds[lesson.id];
                    const isFav = !!favoriteIds[lesson.id];
                    const score = grammarScores[lesson.id];
                    const cleanTitle = lesson.title.includes('. ')
                      ? lesson.title.split('. ')[1]
                      : lesson.title;
                    const displayId = lesson.id.startsWith('p2-')
                      ? lesson.id.replace('p2-', '')
                      : lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => openLessonDetail(lesson.id)}
                        className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors duration-150 group ${
                          isLight ? 'hover:bg-blue-50/40' : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black shrink-0 font-mono">
                            {displayId}
                          </span>

                          <div className="min-w-0 flex-1 space-y-0.5">
                            <h3 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline tracking-tight leading-snug truncate">
                              {cleanTitle}
                            </h3>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
                                {lesson.subtitle || lesson.category}
                              </span>
                              {score !== undefined && (
                                <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500">
                                  Điểm: {score}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={(e) => toggleFavorite(lesson.id, e)}
                            className={`p-2 rounded-xl transition ${
                              isFav
                                ? 'text-amber-400 hover:scale-110'
                                : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                            }`}
                            title={isFav ? 'Bỏ thích' : 'Đánh dấu Thích'}
                          >
                            <i className={`fa-${isFav ? 'solid' : 'regular'} fa-star text-lg`} />
                          </button>

                          <button
                            onClick={(e) => toggleRemembered(lesson.id, e)}
                            className={`p-2 rounded-xl transition ${
                              isRem
                                ? 'text-emerald-500 hover:scale-110'
                                : 'text-slate-300 dark:text-slate-600 hover:text-emerald-500'
                            }`}
                            title={
                              isRem
                                ? 'Đã nhớ (Bấm để hủy)'
                                : 'Chưa nhớ (Bấm để đánh dấu Đã nhớ)'
                            }
                          >
                            <i
                              className={`fa-${isRem ? 'solid' : 'regular'} fa-circle-check text-xl`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Volume Switcher */}
              <div
                className={`p-3.5 px-5 rounded-2xl border flex items-center justify-between gap-3 text-xs font-bold ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-600 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <button
                  onClick={() => {
                    setActiveVolume(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={activeVolume === 1}
                  className="hover:text-blue-500 disabled:opacity-30 transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-chevron-left text-[10px]" />
                  <span>Trang Trước</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveVolume(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 rounded-xl transition ${
                      activeVolume === 1
                        ? 'bg-blue-600 text-white font-extrabold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Trang 1 (100 Bài)
                  </button>

                  <button
                    onClick={() => {
                      setActiveVolume(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 rounded-xl transition ${
                      activeVolume === 2
                        ? 'bg-blue-600 text-white font-extrabold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Trang 2 (Mở Rộng)
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActiveVolume(2);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={activeVolume === 2}
                  className="hover:text-blue-500 disabled:opacity-30 transition flex items-center gap-1.5"
                >
                  <span>Trang Sau</span>
                  <i className="fa-solid fa-chevron-right text-[10px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ─── 2. DETAIL VIEW: CHI TIẾT BÀI HỌC & BÀI TẬP (QUIZ) ────────── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {viewMode === 'detail' && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* Top Breadcrumb & Back Navigation */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setViewMode('list');
                  try {
                    window.location.hash = '#/grammar';
                  } catch (e) {}
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold border transition ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <i className="fa-solid fa-arrow-left text-blue-500" />
                <span>Quay lại Mục Lục</span>
              </button>

              {onNavigate && (
                <button
                  onClick={() =>
                    onNavigate('ai-coach', {
                      dateKey,
                      tab: 'calendar-view',
                    })
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 shadow-xs'
                      : 'bg-blue-950/50 hover:bg-blue-900/60 border-blue-800 text-blue-300'
                  }`}
                  title="Quay lại đúng ngày trên lịch học"
                >
                  <i className="fa-solid fa-calendar-days text-blue-500" />
                  <span>Quay lại Lịch học {dateKey ? `ngày ${dateKey}` : ''}</span>
                </button>
              )}
            </div>

            {/* Favorite & Remembered Quick Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(currentLesson.id)}
                className={`p-2.5 px-3 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  favoriteIds[currentLesson.id]
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-500'
                    : isLight
                    ? 'bg-white border-slate-200 text-slate-600'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <i
                  className={`fa-${favoriteIds[currentLesson.id] ? 'solid' : 'regular'} fa-star text-amber-500`}
                />
                <span>{favoriteIds[currentLesson.id] ? 'Đã thích' : 'Thích'}</span>
              </button>

              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-ai-assistant', {
                      detail: {
                        lesson: currentLesson,
                        lessonTitle: currentLesson?.title,
                        lessonId: currentLesson?.id,
                      },
                    })
                  );
                }}
                className="p-2.5 px-3.5 rounded-2xl text-xs font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white flex items-center gap-1.5 shadow-sm hover:scale-102 transition cursor-pointer"
                title="Hỏi Trợ Lý AI về bài học này"
              >
                <i className="fa-solid fa-robot text-amber-300" />
                <span>Hỏi Trợ Lý AI</span>
              </button>

              <button
                onClick={() => toggleRemembered(currentLesson.id)}
                className={`p-2.5 px-3.5 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  rememberedIds[currentLesson.id]
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                    : isLight
                    ? 'bg-white border-slate-200 text-slate-700'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <i
                  className={`fa-solid ${rememberedIds[currentLesson.id] ? 'fa-circle-check' : 'fa-check'}`}
                />
                <span>{rememberedIds[currentLesson.id] ? 'Đã nhớ bài' : 'Đánh dấu Đã nhớ'}</span>
              </button>
            </div>
          </div>

          {/* Lesson Header */}
          <div
            className={`p-6 md:p-8 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Bài {currentLesson.id.replace('p2-', '')} • {currentLesson.subtitle || currentLesson.category}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
              {currentLesson.title}
            </h1>
          </div>

          {/* AI Voice Lecture Audio Player */}
          <GrammarAudioPlayer lesson={currentLesson} theme={theme} />

          {/* Lesson Clean Theoretical Content */}
          <div
            className={`p-6 md:p-8 rounded-3xl border leading-relaxed text-slate-700 dark:text-slate-300 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            {currentLesson.content}
          </div>

          {/* AI Helper Callout Banner */}
          <div
            className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isLight
                ? 'bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border-blue-200'
                : 'bg-gradient-to-r from-blue-950/30 via-indigo-950/20 to-purple-950/30 border-blue-800/40'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <i className="fa-solid fa-lightbulb text-amber-300 text-base" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Bạn có chỗ nào chưa hiểu trong bài lý thuyết này?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Bấm để hỏi Trợ Lý AI giải thích cặn kẽ, đưa thêm ví dụ và chỉ ra các bẫy đề thi hay gặp.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('open-ai-assistant', {
                    detail: {
                      lesson: currentLesson,
                      lessonTitle: currentLesson?.title,
                      lessonId: currentLesson?.id,
                    },
                  })
                );
              }}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shrink-0 transition shadow-md hover:scale-102 flex items-center gap-2 cursor-pointer self-start sm:self-center"
            >
              <i className="fa-solid fa-robot" />
              <span>Hỏi Trợ Lý AI Ngay</span>
            </button>
          </div>

          {/* Practice Quiz */}
          <Quiz
            currentLesson={currentLesson}
            quizState={quizState}
            quizSubmitted={quizSubmitted}
            handleOptionSelect={handleOptionSelect}
            submitQuiz={submitQuiz}
            resetQuiz={resetQuiz}
            theme={theme}
          />

          {/* Bottom Pagination */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                const currentIdx = fullIndex.findIndex((l) => l.id === currentLesson.id);
                if (currentIdx > 0) {
                  openLessonDetail(fullIndex[currentIdx - 1].id);
                }
              }}
              disabled={fullIndex.findIndex((l) => l.id === currentLesson.id) <= 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition disabled:opacity-30 ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <i className="fa-solid fa-chevron-left" /> Bài trước
            </button>

            <button
              onClick={() => {
                const currentIdx = fullIndex.findIndex((l) => l.id === currentLesson.id);
                if (currentIdx < fullIndex.length - 1) {
                  openLessonDetail(fullIndex[currentIdx + 1].id);
                }
              }}
              disabled={fullIndex.findIndex((l) => l.id === currentLesson.id) >= fullIndex.length - 1}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md flex items-center gap-2 transition hover:scale-102"
            >
              <span>Bài tiếp theo</span>
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
