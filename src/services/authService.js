// Mock Auth Service managing user registration, login, profile updates, and persistence.
// Designed with async Promises so it can easily swap to Firebase / REST API backend in the future.

const USERS_STORAGE_KEY = 'app_users_v1';
const SESSION_STORAGE_KEY = 'app_active_session_v1';

const DEFAULT_USERS = [
  {
    id: 'user_ngocanh136',
    username: 'ngocanh136',
    email: 'tranthingocanh136@gmail.com',
    password: 'ngocanh136',
    name: 'Trần Thị Ngọc Anh',
    role: 'student',
    targetScore: 850,
    dailyGoalMin: 45,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user_demo_1',
    username: 'hocvien123',
    email: 'hocvien@example.com',
    password: '123456',
    name: 'Học viên Chăm chỉ',
    role: 'student',
    targetScore: 750,
    dailyGoalMin: 45,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 'user_demo_2',
    username: 'thayminh990',
    email: 'teacher@example.com',
    password: '123456',
    name: 'Thầy Minh TOEIC',
    role: 'teacher',
    targetScore: 990,
    dailyGoalMin: 60,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
];

function initializeUsersStorage() {
  try {
    const existing = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    }
  } catch (err) {
    console.error('Failed to initialize users storage:', err);
  }
}

// Migrate guest progress (learned words, lessons, test scores) to logged-in user
export function migrateGuestData(targetUserId) {
  if (!targetUserId || targetUserId === 'guest') return;
  try {
    const userPrefix = `user_${targetUserId}_`;
    const guestPrefix = 'user_guest_';

    const mergeKeys = (sourceKey, destKey) => {
      try {
        const sourceVal = localStorage.getItem(sourceKey);
        if (!sourceVal) return;
        const destVal = localStorage.getItem(destKey);
        if (!destVal) {
          localStorage.setItem(destKey, sourceVal);
        } else {
          try {
            const srcObj = JSON.parse(sourceVal);
            const dstObj = JSON.parse(destVal);
            if (typeof srcObj === 'object' && !Array.isArray(srcObj) && typeof dstObj === 'object' && !Array.isArray(dstObj)) {
              const merged = { ...srcObj, ...dstObj };
              localStorage.setItem(destKey, JSON.stringify(merged));
            }
          } catch (e) {}
        }
      } catch (err) {}
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(guestPrefix)) {
        const base = key.slice(guestPrefix.length);
        mergeKeys(key, `${userPrefix}${base}`);
      } else if (
        key &&
        !key.startsWith('user_') &&
        !key.startsWith('app_') &&
        !key.startsWith('gsheet_') &&
        !key.startsWith('ally-')
      ) {
        mergeKeys(key, `${userPrefix}${key}`);
      }
    }
  } catch (err) {
    console.error('Error during guest data migration:', err);
  }
}

export function getAllUsers() {
  initializeUsersStorage();
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    let users = usersJson ? JSON.parse(usersJson) : [...DEFAULT_USERS];

    // Ensure ngocanh136 is ALWAYS guaranteed to exist in database
    const ngocAnhIdx = users.findIndex(
      (u) =>
        u.username?.toLowerCase() === 'ngocanh136' ||
        u.email?.toLowerCase() === 'tranthingocanh136@gmail.com'
    );

    if (ngocAnhIdx === -1) {
      users.unshift({
        id: 'user_ngocanh136',
        username: 'ngocanh136',
        email: 'tranthingocanh136@gmail.com',
        password: 'ngocanh136',
        name: 'Trần Thị Ngọc Anh',
        role: 'student',
        targetScore: 850,
        dailyGoalMin: 45,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      });
      saveUsers(users);
    } else {
      // Ensure password 'ngocanh136' is valid
      if (users[ngocAnhIdx].password !== 'ngocanh136' && users[ngocAnhIdx].password !== '123456') {
        users[ngocAnhIdx].password = 'ngocanh136';
        saveUsers(users);
      }
    }

    return users;
  } catch (err) {
    return DEFAULT_USERS;
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

export function getActiveSession() {
  try {
    const sessionJson = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionJson) return null;
    const session = JSON.parse(sessionJson);
    // Find current fresh user record
    const users = getAllUsers();
    const foundUser = users.find((u) => u.id === session.id);
    return foundUser || session;
  } catch (err) {
    return null;
  }
}

export function setActiveSession(user) {
  try {
    if (!user) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } else {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to update active session:', err);
  }
}

export async function loginUser(identifier, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getAllUsers();
      const clean = (identifier || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      // Find user by either email or username
      const foundUser = users.find((u) => {
        const matchIdentifier =
          (u.email && u.email.toLowerCase() === clean) ||
          (u.username && u.username.toLowerCase() === clean);

        if (!matchIdentifier) return false;

        // Flexible match for ngocanh136 if user used ngocanh136 or 123456
        if (clean === 'ngocanh136' || clean === 'tranthingocanh136@gmail.com') {
          return cleanPass === 'ngocanh136' || cleanPass === '123456' || cleanPass === u.password;
        }

        return u.password === cleanPass;
      });

      if (!foundUser) {
        reject(new Error('Tên đăng nhập / Email hoặc mật khẩu không chính xác!'));
        return;
      }

      // Migrate any guest progress into this user's account
      migrateGuestData(foundUser.id);

      // Omit password from session
      const { password: _, ...userWithoutPass } = foundUser;
      setActiveSession(userWithoutPass);
      resolve(userWithoutPass);
    }, 300);
  });
}

export async function registerUser({ username, email, password, name, targetScore = 750, avatar }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getAllUsers();
      const cleanUsername = (username || '').trim().toLowerCase().replace(/\s+/g, '');
      const cleanEmail = (email || '').trim().toLowerCase();

      if (!cleanUsername || cleanUsername.length < 3) {
        reject(new Error('Tên người dùng phải có ít nhất 3 ký tự!'));
        return;
      }

      if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
        reject(new Error('Tên người dùng chỉ được chứa chữ cái, số, dấu gạch dưới (_) hoặc dấu gạch ngang (-)!'));
        return;
      }

      if (users.some((u) => u.username && u.username.toLowerCase() === cleanUsername)) {
        reject(new Error(`Tên người dùng "@${cleanUsername}" đã có người đăng ký! Vui lòng chọn tên khác.`));
        return;
      }

      if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
        reject(new Error('Email này đã được đăng ký tài khoản!'));
        return;
      }

      const newUser = {
        id: 'user_' + Date.now(),
        username: cleanUsername,
        email: cleanEmail,
        password: password,
        name: name.trim() || cleanUsername,
        role: 'student',
        targetScore: parseInt(targetScore, 10) || 750,
        dailyGoalMin: 45,
        avatar:
          avatar ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanUsername)}`,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      // Migrate guest progress over to new user
      migrateGuestData(newUser.id);

      const { password: _, ...userWithoutPass } = newUser;
      setActiveSession(userWithoutPass);
      resolve(userWithoutPass);
    }, 400);
  });
}

export async function updateUserProfile(userId, updates) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getAllUsers();
      const index = users.findIndex((u) => u.id === userId);

      if (index === -1) {
        reject(new Error('Không tìm thấy tài khoản người dùng!'));
        return;
      }

      const updatedUser = {
        ...users[index],
        ...updates,
      };

      if (updates.password && updates.password.trim() === '') {
        delete updatedUser.password;
      }

      users[index] = updatedUser;
      saveUsers(users);

      const { password: _, ...userWithoutPass } = updatedUser;
      setActiveSession(userWithoutPass);
      resolve(userWithoutPass);
    }, 300);
  });
}

export function logoutUser() {
  setActiveSession(null);
}

export function getLeaderboard() {
  const users = getAllUsers();
  return users.map((u) => {
    // Read scores for each user
    const scoresKey = `user_${u.id}_score_entries_v2`;
    let scores = [];
    try {
      const raw = localStorage.getItem(scoresKey);
      if (raw) scores = JSON.parse(raw);
    } catch (e) {}

    const maxScore =
      scores.length > 0 ? Math.max(...scores.map((s) => +s.total || 0)) : 0;

    return {
      id: u.id,
      name: u.name,
      avatar: u.avatar,
      targetScore: u.targetScore,
      bestScore: maxScore,
      testCount: scores.length,
    };
  }).sort((a, b) => b.bestScore - a.bestScore);
}
