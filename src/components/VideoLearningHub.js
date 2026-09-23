import React, { useState, useMemo } from 'react';
import {
  VIDEO_CATEGORIES,
  VIDEO_LEVELS,
  VIDEO_SOURCES,
  CHANNELS_DATA,
  VIDEO_LESSONS_DATABASE,
} from '../data/videoLessonsData';
import VideoPlayerStudio from './VideoPlayerStudio';
import { useUserStorage } from '../hooks/useUserStorage';

// Helper to extract YouTube Video ID from standard URLs or short links
function extractYouTubeId(url) {
  if (!url) return '';
  const clean = url.trim();
  if (clean.length === 11 && !clean.includes('/') && !clean.includes('.')) {
    return clean;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = clean.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}

export default function VideoLearningHub({ initialVideoId, dateKey, onNavigate, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence: Custom added videos
  const [customVideos, setCustomVideos] = useUserStorage('custom_video_lessons_v1', []);

  // Filter States
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('youtube');
  const [searchQuery, setSearchQuery] = useState('');

  // Active playing video
  const [playingVideo, setPlayingVideo] = useState(null);

  // Modal "+ Thêm video" State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoLevel, setNewVideoLevel] = useState('B1');
  const [newVideoCategory, setNewVideoCategory] = useState('language');

  // Combined Videos List
  const allVideos = useMemo(() => {
    return [...customVideos, ...VIDEO_LESSONS_DATABASE];
  }, [customVideos]);

  // Filtered Videos List
  const filteredVideos = useMemo(() => {
    return allVideos.filter((v) => {
      const matchLevel = selectedLevel === 'all' || v.level === selectedLevel;
      const matchCategory = selectedCategory === 'all' || v.category === selectedCategory;
      const matchSource =
        selectedSource === 'all' || !v.source || v.source === selectedSource;
      const matchSearch =
        !searchQuery ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channelName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchCategory && matchSource && matchSearch;
    });
  }, [allVideos, selectedLevel, selectedCategory, selectedSource, searchQuery]);

  // Group filtered videos by channel
  const channelGroups = useMemo(() => {
    return CHANNELS_DATA.map((ch) => {
      const vids = filteredVideos.filter((v) => v.channelId === ch.id);
      return {
        ...ch,
        videos: vids,
      };
    }).filter((g) => g.videos.length > 0);
  }, [filteredVideos]);

  // Handle Add Custom Video
  const handleAddVideo = () => {
    const ytId = extractYouTubeId(newVideoUrl);
    if (!ytId) {
      alert('Vui lòng nhập đường link YouTube hợp lệ!');
      return;
    }

    const createdVideo = {
      id: 'custom-vid-' + Date.now(),
      youtubeId: ytId,
      channelId: 'custom',
      channelName: 'User Added Video',
      title: newVideoTitle.trim() || 'Custom YouTube Practice Video',
      category: newVideoCategory,
      level: newVideoLevel,
      duration: '4:30',
      source: 'youtube',
      thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      description: 'Video do bạn thêm để học tiếng Anh và luyện Shadowing.',
      subtitles: [
        {
          id: 1,
          startTime: 0,
          endTime: 10,
          text: "Start listening and practicing along with your video subtitles.",
          vietnamese: "Bắt đầu nghe và luyện tập cùng phụ đề video của bạn.",
        },
      ],
    };

    setCustomVideos((prev) => [createdVideo, ...prev]);
    setIsAddModalOpen(false);
    setNewVideoUrl('');
    setNewVideoTitle('');
    setPlayingVideo(createdVideo);
  };

  // Auto open specific video if initialVideoId is provided
  React.useEffect(() => {
    if (initialVideoId && allVideos.length > 0) {
      const found = allVideos.find((v) => v.id === initialVideoId);
      if (found) setPlayingVideo(found);
    }
  }, [initialVideoId, allVideos]);

  // If a video is playing, show the VideoPlayerStudio
  if (playingVideo) {
    return (
      <VideoPlayerStudio
        video={playingVideo}
        onBack={() => setPlayingVideo(null)}
        dateKey={dateKey}
        onNavigate={onNavigate}
        theme={theme}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-20 font-sans relative">
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
              Đang mở bài luyện Shadowing Video theo lịch học ngày <strong>{dateKey}</strong>.
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

      {/* ─── TOP HEADER BAR WITH LEVEL DROPDOWN & CATEGORIES CHIPS ─── */}
      <div className="flex flex-col gap-4">
        {/* Filters Top Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Level Dropdown */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-bold border focus:outline-none transition cursor-pointer ${
                selectedLevel !== 'all'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <option value="all">📊 Trình độ: Tất cả</option>
              {VIDEO_LEVELS.filter((l) => l.id !== 'all').map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none opacity-60" />
          </div>

          {/* Topic / Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide flex-1 min-w-0">
            {VIDEO_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                    active
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} mr-1.5 text-[11px]`} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Source Tabs (YouTube | TikTok | TED Talks) */}
        <div className="flex items-center justify-between gap-3">
          <div
            className={`p-1 rounded-2xl border flex items-center gap-1 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {VIDEO_SOURCES.map((src) => {
              const active = selectedSource === src.id;
              return (
                <button
                  key={src.id}
                  onClick={() => setSelectedSource(src.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    active
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {src.id === 'youtube' && (
                    <i className="fa-brands fa-youtube text-red-600 text-base" />
                  )}
                  {src.id === 'tiktok' && (
                    <i className="fa-brands fa-tiktok text-slate-900 dark:text-white text-sm" />
                  )}
                  {src.id === 'ted' && (
                    <span className="bg-[#e62b1e] text-white font-black text-[10px] px-1.5 py-0.2 rounded tracking-tighter leading-none shadow-xs">
                      TED
                    </span>
                  )}
                  <span>{src.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full hidden sm:block">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm video, chủ đề..."
              className={`w-full pl-9 pr-4 py-2 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
              }`}
            />
          </div>
        </div>
      </div>

      {/* ─── CUSTOM VIDEOS CAROUSEL (IF ANY) ─── */}
      {customVideos.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-violet-600 text-white flex items-center justify-center text-xs font-black">
                ★
              </span>
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
                Video Của Bạn Đã Thêm ({customVideos.length})
              </h3>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {customVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setPlayingVideo(vid)}
                className={`shrink-0 w-64 md:w-72 rounded-3xl border overflow-hidden cursor-pointer transition-all duration-200 group hover:scale-102 hover:shadow-xl ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-black/70 text-amber-300 backdrop-blur-md">
                    {vid.level}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-black/80 text-white backdrop-blur-md">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-3.5">
                  <h4 className="font-bold text-xs line-clamp-2 text-slate-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                    {vid.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── CHANNEL SECTIONS WITH HORIZONTAL CAROUSELS ─── */}
      <div className="space-y-8">
        {channelGroups.map((channel) => (
          <div key={channel.id} className="flex flex-col gap-3">
            {/* Channel Header Title with '>' link */}
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                {/* Authentic Branded Logo Icon */}
                {channel.id === 'ted-ed' && (
                  <div className="w-9 h-9 rounded-2xl bg-[#e62b1e] text-white flex items-center justify-center font-black text-xs tracking-tighter shadow-md border border-red-500">
                    TED
                  </div>
                )}
                {channel.id === 'kurzgesagt' && (
                  <div className="w-9 h-9 rounded-2xl bg-[#0b1b3d] text-cyan-300 flex items-center justify-center font-black text-xs shadow-md border border-cyan-400/50">
                    <i className="fa-solid fa-dove text-cyan-400 text-sm" />
                  </div>
                )}
                {channel.id === 'bbc-learning' && (
                  <div className="w-9 h-9 rounded-2xl bg-[#bb1919] text-white flex items-center justify-center font-black text-xs tracking-tighter shadow-md border border-red-700">
                    BBC
                  </div>
                )}
                {channel.id === 'veritasium' && (
                  <div className="w-9 h-9 rounded-2xl bg-[#18181b] text-amber-400 flex items-center justify-center font-black text-xs shadow-md border border-amber-500/40">
                    V
                  </div>
                )}
                {channel.id === 'speeches' && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                    <i className="fa-solid fa-microphone-lines text-xs" />
                  </div>
                )}
                {channel.id === 'daily-english' && (
                  <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                    <i className="fa-solid fa-headphones text-xs" />
                  </div>
                )}
                {!['ted-ed', 'kurzgesagt', 'bbc-learning', 'veritasium', 'speeches', 'daily-english'].includes(channel.id) && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                    {channel.badge}
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {channel.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400 group-hover:text-blue-500 transition-colors text-xs font-bold">
                <span>Xem tất cả</span>
                <i className="fa-solid fa-chevron-right text-[10px]" />
              </div>
            </div>

            {/* Horizontal Video Carousel Cards */}
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {channel.videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setPlayingVideo(vid)}
                  className={`shrink-0 w-64 md:w-72 rounded-3xl border overflow-hidden cursor-pointer transition-all duration-200 group hover:scale-102 hover:shadow-xl ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-video overflow-hidden bg-slate-800">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Level Badge */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-black/75 text-amber-300 backdrop-blur-md border border-white/10">
                      • {vid.level}
                    </span>

                    {/* Channel Mini Logo */}
                    {vid.channelId === 'ted-ed' && (
                      <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-md bg-[#e62b1e] text-white text-[9px] font-black tracking-tighter shadow-md">
                        TED
                      </span>
                    )}
                    {vid.channelId === 'kurzgesagt' && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#0b1b3d] text-cyan-300 border border-cyan-400/60 text-[10px] font-black flex items-center justify-center shadow-md">
                        <i className="fa-solid fa-dove text-[9px] text-cyan-400" />
                      </span>
                    )}
                    {vid.channelId === 'bbc-learning' && (
                      <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-md bg-[#bb1919] text-white text-[9px] font-black tracking-tighter shadow-md">
                        BBC
                      </span>
                    )}
                    {vid.channelId === 'veritasium' && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black text-amber-400 border border-amber-500/50 text-[10px] font-black flex items-center justify-center shadow-md">
                        V
                      </span>
                    )}
                    {!['ted-ed', 'kurzgesagt', 'bbc-learning', 'veritasium'].includes(vid.channelId) && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow">
                        {channel.badge}
                      </span>
                    )}

                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-black/85 text-white backdrop-blur-md">
                      {vid.duration}
                    </span>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <i className="fa-solid fa-play ml-0.5 text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Video Meta Info */}
                  <div className="p-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs md:text-sm line-clamp-2 text-slate-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {channel.name} • {vid.subtitles?.length || 0} câu phụ đề
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      <i className="fa-solid fa-ellipsis-vertical text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ─── FLOATING "+ THÊM VIDEO" BUTTON ─── */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-5 py-3.5 rounded-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-black text-xs md:text-sm shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2.5 border border-teal-300"
      >
        <i className="fa-solid fa-video text-base" />
        <span>Thêm video</span>
      </button>

      {/* ─── ADD CUSTOM VIDEO MODAL ─── */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl animate-scaleUp transition-all ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-sm flex items-center gap-2 text-teal-500">
                <i className="fa-solid fa-video" />
                Dán link YouTube để học
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-400 mb-1.5 block">
                  Đường dẫn Video (YouTube URL):
                </label>
                <input
                  type="text"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 mb-1.5 block">
                  Tiêu đề video (Tùy chọn):
                </label>
                <input
                  type="text"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="Ví dụ: Luyện nghe TED Talk về Trí tuệ Nhân tạo"
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1.5 block">Trình độ:</label>
                  <select
                    value={newVideoLevel}
                    onChange={(e) => setNewVideoLevel(e.target.value)}
                    className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  >
                    <option value="A1">A1 - Nhập môn</option>
                    <option value="A2">A2 - Sơ cấp</option>
                    <option value="B1">B1 - Trung cấp</option>
                    <option value="B2">B2 - Khá tốt</option>
                    <option value="C1">C1 - Cao cấp</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1.5 block">Chủ đề:</label>
                  <select
                    value={newVideoCategory}
                    onChange={(e) => setNewVideoCategory(e.target.value)}
                    className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  >
                    <option value="language">Học ngôn ngữ</option>
                    <option value="science">Khoa học</option>
                    <option value="tech">Công nghệ</option>
                    <option value="business">Kinh doanh</option>
                    <option value="life">Đời sống</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddVideo}
                  disabled={!newVideoUrl.trim()}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold text-xs shadow-md transition disabled:opacity-50"
                >
                  Thêm & Bắt đầu học
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
