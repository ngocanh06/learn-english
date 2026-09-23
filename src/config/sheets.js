// Google Sheets Configuration
// Sheet 1: Daily Dictation vocabulary (5 tabs)
export const DAILY_DICTATION_SHEET = {
  baseUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyCO3ADlSynSAtr1SzsoxUu-yCRb6grnnv_knbxOcZ--xqcd04UfpPSXThKc_R9GA3Ls9tHyHlzzu8/pub',
  tabs: [
    { id: 'short-stories', label: 'Short Stories', gid: '1196919825', icon: 'fa-book-open' },
    { id: 'conversation', label: 'Conversation', gid: '702236284', icon: 'fa-comments' },
    { id: 'toeic', label: 'TOEIC', gid: '2091927215', icon: 'fa-bullseye' },
    { id: 'ielts', label: 'IELTS', gid: '65110542', icon: 'fa-earth-americas' },
    { id: 'stories-kids', label: 'Stories for Kids', gid: '360252727', icon: 'fa-child-reaching' },
  ],
  // Default tab = first one
  defaultGid: '1196919825',
};

// Sheet 2: Test vocabulary from actual TOEIC tests (3 tabs)
export const TEST_VOCAB_SHEET = {
  baseUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2a3p1k3D4O2P-AbnojbpJiarkXn7giD4pM6eLsfif3XBnqYids5XhoFVPdg4hpRGLKyLtYsRPijQe/pub',
  tabs: [
    { id: 'toeic-listening', label: 'TOEIC Listening', gid: '2091927215', icon: 'fa-headphones' },
    { id: 'toeic-reading', label: 'TOEIC Reading', gid: '65110542', icon: 'fa-book-open-reader' },
  ],
  defaultGid: '2091927215',
};

// Sheet 3: Vocab By Part from Google Sheets (5 tabs)
export const VOCAB_PART_SHEET = {
  baseUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVJd6KSqMIQ3Q3zFgFmpYfGDiGn-Yy6H6q2rCf-NIWZnVCVPqqJs7qgCg5Qr8-bOx3gai2QKQq6DQ-/pub',
  tabs: [
    { id: 'so-cap', label: 'Sơ cấp', gid: '407949833', icon: 'fa-seedling' },
    { id: 'tien-trung-cap', label: 'Tiền Trung Cấp', gid: '313120164', icon: 'fa-book-open' },
    { id: 'trung-cap', label: 'Trung Cấp', gid: '1171971428', icon: 'fa-chart-line' },
    { id: 'cao-cap', label: 'Cao Cấp', gid: '521786381', icon: 'fa-trophy' },
    { id: 'ielts-trung-cap', label: 'IELTS Trung Cấp', gid: '563630252', icon: 'fa-earth-americas' },
  ],
  defaultGid: '407949833',
  csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVJd6KSqMIQ3Q3zFgFmpYfGDiGn-Yy6H6q2rCf-NIWZnVCVPqqJs7qgCg5Qr8-bOx3gai2QKQq6DQ-/pub?output=csv'
};

// Sheet 4: Dedicated IELTS Vocab Sheet (loaded directly from user's Google Sheet)
export const IELTS_VOCAB_SHEET = {
  baseUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVJd6KSqMIQ3Q3zFgFmpYfGDiGn-Yy6H6q2rCf-NIWZnVCVPqqJs7qgCg5Qr8-bOx3gai2QKQq6DQ-/pub',
  tabs: [
    { id: 'ielts-trung-cap', label: 'IELTS Trung Cấp (Band 5.5 - 7.0+)', gid: '563630252', icon: 'fa-earth-americas' },
  ],
  defaultGid: '563630252',
};

// Helper: build CSV URL for a sheet tab
export const buildCsvUrl = (baseUrl, gid) =>
  `${baseUrl}?gid=${gid}&single=true&output=csv`;

