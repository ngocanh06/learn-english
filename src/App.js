import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GrammarPage from './components/GrammarPage';
import VideoLearningHub from './components/VideoLearningHub';
import VocabMasterHub from './components/VocabMasterHub';
import AILearningCoach from './components/AILearningCoach';
import ScoreManager from './components/ScoreManager';
import ReadingHub from './components/ReadingHub';
import WritingHub from './components/WritingHub';
import ErrorBoundary from './components/ErrorBoundary';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import GlobalAIAssistant from './components/GlobalAIAssistant';
import PersonalizedOnboardingModal from './components/PersonalizedOnboardingModal';
import { DEFAULT_USER_LEARNING_PROFILE } from './config/learningCertifications';

import { AuthProvider } from './context/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useUserStorage } from './hooks/useUserStorage';
import { DEFAULT_SCHEDULE_DATA } from './config/schedule';
import BottomNav from './components/BottomNav';
import { calculateOverdueTasks } from './utils/overdueTasksHelper';

function parseHash() {
  try {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (!raw) return { nav: 'dashboard', params: {} };
    const [path, query] = raw.split('?');
    const params = {};
    if (query) {
      const searchParams = new URLSearchParams(query);
      searchParams.forEach((val, key) => {
        params[key] = val;
      });
    }
    const validNavs = [
      'dashboard',
      'grammar',
      'vocabulary',
      'ai-coach',
      'schedule',
      'reading',
      'writing',
      'video-hub',
      'scores',
    ];
    const nav = validNavs.includes(path) ? path : 'dashboard';
    return { nav, params };
  } catch (e) {
    return { nav: 'dashboard', params: {} };
  }
}

function buildHash(nav, params = {}) {
  const cleanParams = { ...params };
  Object.keys(cleanParams).forEach((k) => {
    if (cleanParams[k] === undefined || cleanParams[k] === null || cleanParams[k] === '') {
      delete cleanParams[k];
    }
  });
  const query = new URLSearchParams(cleanParams).toString();
  return query ? `#/${nav}?${query}` : `#/${nav}`;
}

function MainApp() {
  const getInitialState = () => {
    const fromHash = parseHash();
    if (fromHash && fromHash.nav) {
      return { nav: fromHash.nav, params: fromHash.params };
    }
    try {
      const savedNav = localStorage.getItem('app_active_nav_v2');
      const savedParams = JSON.parse(localStorage.getItem('app_nav_params_v2') || '{}');
      if (savedNav) {
        return { nav: savedNav, params: savedParams || {} };
      }
    } catch (e) {}
    return { nav: 'dashboard', params: {} };
  };

  const initial = getInitialState();
  const [activeNav, setActiveNav] = useState(initial.nav);
  const [navParams, setNavParams] = useState(initial.params);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [theme, setTheme] = useLocalStorage('app_theme', 'dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage('sidebar_collapsed_v1', false);
  const [learningProfile, setLearningProfile] = useUserStorage('user_learning_profile_v1', DEFAULT_USER_LEARNING_PROFILE);
  const [hasChosenGoal, setHasChosenGoal] = useUserStorage('user_has_chosen_goal_v1', false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);

  useEffect(() => {
    // If user has not chosen their target certificate yet, prompt them with the welcome popup!
    if (!hasChosenGoal) {
      const timer = setTimeout(() => {
        setOnboardingModalOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [hasChosenGoal]);

  const isLight = theme === 'light';

  useEffect(() => {
    if (typeof theme === 'string') {
      document.documentElement.className = theme;
    }
  }, [theme]);

  // Sync hash on initial load if not already set
  useEffect(() => {
    const currentHash = parseHash();
    if (!currentHash || !currentHash.nav) {
      const newHash = buildHash(activeNav, navParams);
      window.history.replaceState(null, '', newHash);
    }
  }, [activeNav, navParams]);

  // Listen for browser Back/Forward buttons and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash();
      if (parsed && parsed.nav) {
        setActiveNav(parsed.nav);
        setNavParams(parsed.params || {});
        try {
          localStorage.setItem('app_active_nav_v2', parsed.nav);
          localStorage.setItem('app_nav_params_v2', JSON.stringify(parsed.params || {}));
        } catch (e) {}
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // Scoped to currently active user
  const [scores] = useUserStorage('score_entries_v2', []);
  const [scheduleRows] = useUserStorage('study_schedule_rows_v3', DEFAULT_SCHEDULE_DATA);
  const [calendarCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const [rememberedGrammar] = useUserStorage('grammar_remembered_v2', {});
  const [completedWriting] = useUserStorage('writing_practice_completed_v2', {});
  const [quizSubmitted] = useUserStorage('grammar_quiz_submitted_v2', {});
  const [knownVocab] = useUserStorage('vocab_mastery_v2', {});
  const [dictationStars] = useUserStorage('dailydictation_stars_v4', {});
  const [vocabDayCompleted] = useUserStorage('vocab_day_completed_v1', {});
  const [completedReading] = useUserStorage('reading_completed_tests_v2', {});
  const [readingQuizSubmitted] = useUserStorage('reading_quiz_submitted_v1', {});
  const [speakingSecondsMap] = useUserStorage('shadowing_speaking_seconds_v1', {});
  const [shadowedSentencesMap] = useUserStorage('shadowing_sentences_done_v2', {});

  const overdueCount = React.useMemo(() => {
    try {
      const res = calculateOverdueTasks({
        completedTasks: calendarCompletedTasks,
        grammarRemembered: rememberedGrammar,
        grammarQuizSubmitted: quizSubmitted,
        completedReading,
        readingQuizSubmitted,
        dictationStars,
        vocabDayCompleted,
        knownWordsMap: knownVocab,
        speakingSecondsMap,
        shadowedSentencesMap,
        completedWriting,
      });
      return res.totalOverdueCount || 0;
    } catch (e) {
      return 0;
    }
  }, [
    calendarCompletedTasks,
    rememberedGrammar,
    quizSubmitted,
    completedReading,
    readingQuizSubmitted,
    dictationStars,
    vocabDayCompleted,
    knownVocab,
    speakingSecondsMap,
    shadowedSentencesMap,
    completedWriting,
  ]);

  const navigate = (id, params = {}) => {
    let target = id;
    if (id === 'vocab') target = 'vocabulary';
    if (id === 'study4-toeic' || id === 'study4') {
      target = 'ai-coach';
      params = { tab: 'study4-toeic', ...params };
    }
    if (id === 'ielts' || id === 'ielts-roadmap') {
      target = 'ai-coach';
      params = { tab: 'ielts-roadmap', ...params };
    }
    if (id === 'schedule' || id === 'coach') target = 'ai-coach';
    if (id === 'dailydictation' || id === 'dictation') {
      target = 'ai-coach';
      params = { tab: 'dailydictation', ...params };
    }
    if (id === 'videos' || id === 'shadowing' || id === 'video') target = 'video-hub';

    setActiveNav(target);
    setNavParams(params || {});
    setMobileMenu(false);

    try {
      localStorage.setItem('app_active_nav_v2', target);
      localStorage.setItem('app_nav_params_v2', JSON.stringify(params || {}));
      const newHash = buildHash(target, params);
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash);
      }
    } catch (e) {}

    // When navigating to grammar, auto collapse sidebar for maximum reading comfort
    if (target === 'grammar') {
      setSidebarCollapsed(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bestScore =
    Array.isArray(scores) && scores.length > 0
      ? Math.max(...scores.map((s) => +s.total || 0))
      : null;

  return (
    <div
      className={`min-h-screen font-sans flex flex-col lg:flex-row transition-colors duration-200 relative overflow-x-hidden ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0b0f19] text-slate-100'
      }`}
    >

      {/* ─── LEFT SIDEBAR (DESKTOP + MOBILE DRAWER) ───────── */}
      <Sidebar
        activeNav={activeNav}
        onNavigate={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
        bestScore={bestScore}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenu}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        overdueCount={overdueCount}
      />

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────── */}
      <div
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-60'
        }`}
      >
        {/* Mobile Top Header */}
        <Header
          activeNav={activeNav}
          onNavigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
          setMobileOpen={setMobileMenu}
          overdueCount={overdueCount}
        />

        {/* Page Content */}
        <main className={`flex-1 pb-20 lg:pb-8 ${activeNav === 'grammar' ? '' : 'max-w-7xl w-full mx-auto px-4 md:px-8 py-6'}`}>
          {activeNav === 'dashboard' && (
            <Dashboard
              onNavigate={navigate}
              scores={scores}
              scheduleRows={scheduleRows}
              theme={theme}
            />
          )}
          {activeNav === 'reading' && (
            <ReadingHub
              initialLevel={navParams.level}
              initialTestId={navParams.testId}
              dateKey={navParams.dateKey}
              onNavigate={navigate}
              theme={theme}
            />
          )}
          {activeNav === 'writing' && (
            <WritingHub
              initialTab={navParams.tab}
              initialLessonId={navParams.lessonId}
              initialCategory={navParams.category}
              initialMode={navParams.mode}
              dateKey={navParams.dateKey}
              onNavigate={navigate}
              theme={theme}
            />
          )}
          {activeNav === 'grammar' && (
            <GrammarPage
              initialLessonId={navParams.lessonId}
              dateKey={navParams.dateKey}
              onNavigate={navigate}
              theme={theme}
            />
          )}
          {activeNav === 'video-hub' && (
            <VideoLearningHub
              initialVideoId={navParams.videoId}
              dateKey={navParams.dateKey}
              onNavigate={navigate}
              theme={theme}
            />
          )}
          {activeNav === 'vocabulary' && (
            <VocabMasterHub
              initialSection={navParams.section}
              initialLevel={navParams.levelId || navParams.level}
              initialPartNum={navParams.partNum || navParams.part}
              initialTabId={navParams.tabId}
              initialPartFilter={navParams.partFilter}
              initialDay={navParams.day || navParams.dayNum}
              dateKey={navParams.dateKey}
              onNavigate={navigate}
              theme={theme}
            />
          )}
          {(activeNav === 'ai-coach' || activeNav === 'schedule') && (
            <AILearningCoach
              initialTab={navParams.tab}
              initialTrack={navParams.track || navParams.subTrack}
              initialDateKey={navParams.dateKey || navParams.date}
              initialDay={navParams.day}
              initialViewMode={navParams.viewMode}
              onNavigate={navigate}
              theme={theme}
            />
          )}
          {activeNav === 'scores' && <ScoreManager theme={theme} />}
        </main>
      </div>

      {/* ─── MOBILE BOTTOM NAVIGATION (THUMB-FRIENDLY & SAFE-AREA READY) ─── */}
      <BottomNav
        activeNav={activeNav}
        onNavigate={navigate}
        setMobileOpen={setMobileMenu}
        theme={theme}
        overdueCount={overdueCount}
      />

      {/* ─── MODALS & GLOBAL AI TUTOR ASSISTANT ──────── */}
      <AuthModal theme={theme} />
      <UserProfileModal theme={theme} />
      <GlobalAIAssistant activeNav={activeNav} navParams={navParams} theme={theme} />
      <PersonalizedOnboardingModal
        isOpen={onboardingModalOpen}
        onClose={() => {
          setOnboardingModalOpen(false);
          setHasChosenGoal(true);
        }}
        initialProfile={learningProfile}
        onSaveProfile={(updated) => {
          setLearningProfile(updated);
          setHasChosenGoal(true);
          if (updated?.certification === 'toeic') {
            navigate('ai-coach', { tab: 'study4-toeic' });
          } else if (updated?.certification === 'none') {
            navigate('ai-coach', { tab: 'master-roadmap' });
          } else {
            navigate('ai-coach', { tab: 'ielts-roadmap' });
          }
        }}
        theme={theme}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}