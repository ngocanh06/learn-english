import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getActiveSession,
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  migrateGuestData,
} from '../services/authService';
import {
  syncBidirectional,
  subscribeToUserRealtimeSync,
  isSupabaseConfigured,
} from '../services/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  // Modals management
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  useEffect(() => {
    const session = getActiveSession();
    if (session) {
      try {
        migrateGuestData(session.id);
      } catch (e) {}
      setCurrentUser(session);
    }
    setLoading(false);
  }, []);

  const syncCloudData = async () => {
    if (!currentUser || currentUser.id === 'guest' || !isSupabaseConfigured()) {
      return { pulled: 0, pushed: 0 };
    }
    setIsSyncingCloud(true);
    try {
      const res = await syncBidirectional(currentUser.id);
      return res;
    } catch (e) {
      console.warn('Sync cloud data failed:', e);
      return { pulled: 0, pushed: 0 };
    } finally {
      setIsSyncingCloud(false);
    }
  };

  // Realtime Cloud Synchronization with Supabase (Multi-device instant sync)
  useEffect(() => {
    if (!currentUser || currentUser.id === 'guest' || !isSupabaseConfigured()) return;

    // 1. Initial 2-way sync: Pull latest cloud progress then push local updates
    syncCloudData();

    // 2. Subscribe to realtime changes (< 100ms latency)
    const unsubscribe = subscribeToUserRealtimeSync(currentUser.id);

    const handleConfigChange = () => {
      syncCloudData();
    };
    window.addEventListener('supabase-config-changed', handleConfigChange);

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('supabase-config-changed', handleConfigChange);
    };
  }, [currentUser?.id]);

  const login = async (email, password) => {
    const user = await loginUser(email, password);
    setCurrentUser(user);
    setAuthModalOpen(false);
    return user;
  };

  const register = async (userData) => {
    const user = await registerUser(userData);
    setCurrentUser(user);
    setAuthModalOpen(false);
    return user;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setUserProfileModalOpen(false);
  };

  const updateProfile = async (updates) => {
    if (!currentUser) return;
    const updated = await updateUserProfile(currentUser.id, updates);
    setCurrentUser(updated);
    return updated;
  };

  const openLogin = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalTab('register');
    setAuthModalOpen(true);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    authModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    openLogin,
    openRegister,
    userProfileModalOpen,
    setUserProfileModalOpen,
    syncCloudData,
    isSyncingCloud,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
