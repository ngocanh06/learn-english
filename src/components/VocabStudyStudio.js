import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PronunciationChecker from './PronunciationChecker';
import { useUserStorage } from '../hooks/useUserStorage';
import { VOCAB_DATABASE } from '../data/vocabularyByLevelAndPart';
import { getDisplayIpa, healSavedVocabList } from '../services/ipaService';

// Fix decomposed Unicode accents
const formatVietnameseText = (str) => {
  if (!str) return '';
  return String(str)
    .normalize('NFC')
    .replace(/ô\s*´/g, 'ố')
    .replace(/ê\s*`/g, 'ề')
    .replace(/a\s*`/g, 'à')
    .replace(/a\s*´/g, 'á')
    .replace(/e\s*`/g, 'è')
    .replace(/e\s*´/g, 'é')
    .replace(/o\s*`/g, 'ò')
    .replace(/o\s*´/g, 'ó')
    .replace(/u\s*`/g, 'ù')
    .replace(/u\s*´/g, 'ú')
    .replace(/i\s*`/g, 'ì')
    .replace(/i\s*´/g, 'í')
    .replace(/y\s*`/g, 'ỳ')
    .replace(/y\s*´/g, 'ý');
};

// Part of speech badge helper
const formatPosBadge = (pos) => {
  if (!pos) return null;
  const raw = String(pos).trim().toLowerCase();
  const map = {
    n: { tag: 'n', label: 'Danh từ', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40' },
    noun: { tag: 'n', label: 'Danh từ', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40' },
    v: { tag: 'v', label: 'Động từ', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/40' },
    verb: { tag: 'v', label: 'Động từ', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/40' },
    adj: { tag: 'adj', label: 'Tính từ', color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/40' },
    adjective: { tag: 'adj', label: 'Tính từ', color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/40' },
    adv: { tag: 'adv', label: 'Trạng từ', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/40' },
    adverb: { tag: 'adv', label: 'Trạng từ', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/40' },
    prep: { tag: 'prep', label: 'Giới từ', color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/40' },
    conj: { tag: 'conj', label: 'Liên từ', color: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/40' },
    phrase: { tag: 'phrase', label: 'Cụm từ', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/40' },
    idiom: { tag: 'idiom', label: 'Thành ngữ', color: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800/40' },
    det: { tag: 'det', label: 'Từ hạn định', color: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800/40' },
    pron: { tag: 'pron', label: 'Đại từ', color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800/40' },
    word: { tag: 'word', label: 'Từ vựng', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  };
  const found = map[raw] || { tag: raw, label: raw, color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' };
  return {
    text: `(${found.tag}) ${found.label}`,
    color: found.color,
  };
};

/**
 * Standardized Unified Vocab Study Studio
 * Provides identical UI & learning experience across all vocabulary modules:
 * 1. 4 Leitner Memory Level Cards (Level 1..4)
 * 2. 5 Study Mode Tabs: Danh Sách Từ | Flashcard 3D | Trắc Nghiệm Quiz | Nối Từ Nhanh | Gõ Chính Tả
 */
export default function VocabStudyStudio({
  words = [],
  theme = 'dark',
  canDeleteWord = false,
  onDeleteWord,
  onStudyComplete,
  emptyTitle = 'Chưa có từ vựng nào trong danh sách này',
  emptyDesc = 'Vui lòng chọn danh mục hoặc thêm từ vựng để bắt đầu học.',
  deckBadge = 'TỪ VỰNG',
}) {
  const isLight = theme === 'light';

  // Persistence: Saved vocabulary for personal notebook
  const [savedVocab, setSavedVocab] = useUserStorage('saved_video_vocab_v1', []);
  // Global Lingoland Spaced Repetition Mastery: { [word]: { level: 1..4, lastReview: number, correctStreak: number } }
  const [vocabMastery, setVocabMastery] = useUserStorage('notebook_vocab_mastery_v1', {});
  // Global Binary Known Words Map for legacy compatibility
  const [knownWordsMap, setKnownWordsMap] = useUserStorage('vocab_mastery_v2', {});

  // Studio Study Modes: 'list' | 'flashcard' | 'quiz' | 'match' | 'spelling'
  const [studyMode, setStudyMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all'); // 'all' | '1' | '2' | '3' | '4' | 'need_review'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'az' | 'newest'

  // Audio speech helper
  const speak = useCallback((text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  }, []);

  // Helper to read word's level
  const getWordLevel = useCallback((wordStr) => {
    if (!wordStr) return 1;
    const key = wordStr.toLowerCase().trim();
    if (vocabMastery[key]?.level) {
      return vocabMastery[key].level;
    }
    // Fallback to knownWordsMap if previously marked known
    if (knownWordsMap && knownWordsMap[key]) {
      return 4;
    }
    return 1;
  }, [vocabMastery, knownWordsMap]);

  // Update Lingoland Mastery level (+1 when correct, -1 when incorrect)
  const updateMastery = useCallback((word, isCorrect) => {
    if (!word) return;
    const key = word.toLowerCase().trim();
    
    setVocabMastery((prev) => {
      const current = prev[key] || { 
        level: (knownWordsMap && knownWordsMap[key]) ? 4 : 1, 
        correctStreak: 0 
      };
      let nextLevel = current.level || 1;
      let nextStreak = current.correctStreak || 0;

      if (isCorrect) {
        nextLevel = Math.min(4, nextLevel + 1);
        nextStreak += 1;
      } else {
        nextLevel = Math.max(1, nextLevel - 1);
        nextStreak = 0;
      }

      // Sync with binary knownWordsMap
      if (setKnownWordsMap) {
        setKnownWordsMap((km) => ({
          ...km,
          [key]: nextLevel >= 4,
        }));
      }

      return {
        ...prev,
        [key]: {
          level: nextLevel,
          correctStreak: nextStreak,
          lastReview: Date.now(),
        },
      };
    });
  }, [setVocabMastery, setKnownWordsMap, knownWordsMap]);

  // Toggle Save to Notebook (Sổ từ vựng)
  const toggleSaveWord = useCallback((item) => {
    if (!item || !item.word) return;
    const cleanW = item.word.toLowerCase().trim();
    setSavedVocab((prev) => {
      const exists = prev.some((w) => (w.word || '').toLowerCase().trim() === cleanW);
      if (exists) {
        return prev.filter((w) => (w.word || '').toLowerCase().trim() !== cleanW);
      } else {
        return [
          {
            word: item.word,
            ipa: getDisplayIpa(item.word, item.ipa || item.pron),
            pos: item.pos || item.partOfSpeech || '',
            meaning: item.meaning || item.vietnamese || '',
            example: item.example || item.examplePhrase || '',
            addedAt: Date.now(),
          },
          ...prev,
        ];
      }
    });
  }, [setSavedVocab]);

  // Auto-heal legacy saved words (e.g. /shrove/ -> /ʃroʊv/)
  useEffect(() => {
    if (Array.isArray(savedVocab) && savedVocab.length > 0) {
      healSavedVocabList(savedVocab, setSavedVocab);
    }
  }, []);

  const isWordSaved = useCallback((wordStr) => {
    if (!wordStr) return false;
    const cleanW = wordStr.toLowerCase().trim();
    return savedVocab.some((w) => (w.word || '').toLowerCase().trim() === cleanW);
  }, [savedVocab]);

  // Normalize words list with 100% smart phonetic IPA
  const safeWords = useMemo(() => {
    if (!Array.isArray(words)) return [];
    return words.map((w) => {
      const realIpa = getDisplayIpa(w.word, w.ipa || w.pron);
      return {
        word: w.word || '',
        ipa: realIpa,
        pron: realIpa,
        pos: w.pos || w.partOfSpeech || '',
        meaning: w.meaning || w.vietnamese || w.definition || w.exampleMeaning || '',
        example: w.example || w.examplePhrase || '',
        exMeaning: w.exMeaning || w.exampleMeaning || '',
        ...w,
      };
    }).filter((w) => Boolean(w.word));
  }, [words]);

  // Statistics calculation for current active words
  const stats = useMemo(() => {
    const total = safeWords.length;
    let l1 = 0, l2 = 0, l3 = 0, l4 = 0;
    safeWords.forEach((item) => {
      const lvl = getWordLevel(item.word);
      if (lvl === 1) l1++;
      else if (lvl === 2) l2++;
      else if (lvl === 3) l3++;
      else if (lvl === 4) l4++;
    });
    return {
      total,
      l1, // Mới lưu / Chưa thuộc
      l2, // Đang học
      l3, // Ghi nhớ tốt
      l4, // Đã thành thạo
      needReview: l1 + l2 + l3,
    };
  }, [safeWords, getWordLevel]);

  // Filtered & Sorted words list
  const filteredWords = useMemo(() => {
    let result = [...safeWords];

    // Filter by search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.word?.toLowerCase().includes(q) ||
          w.meaning?.toLowerCase().includes(q) ||
          w.ipa?.toLowerCase().includes(q)
      );
    }

    // Filter by Lingoland Mastery Level
    if (levelFilter !== 'all') {
      if (levelFilter === 'need_review') {
        result = result.filter((w) => getWordLevel(w.word) < 4);
      } else {
        const targetLvl = parseInt(levelFilter, 10);
        result = result.filter((w) => getWordLevel(w.word) === targetLvl);
      }
    }

    // Sorting
    if (sortBy === 'az') {
      result.sort((a, b) => (a.word || '').localeCompare(b.word || ''));
    } else if (sortBy === 'newest') {
      result.reverse();
    }

    return result;
  }, [safeWords, searchTerm, levelFilter, sortBy, getWordLevel]);

  // ═════════════════════════════════════════════════════════════════════════════
  // ─── FLASHCARD MODE (3D Interactive Flip Card) ──────────────────────────────
  // ═════════════════════════════════════════════════════════════════════════════
  const [fcWords, setFcWords] = useState([]);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcDirection, setFcDirection] = useState(null);

  useEffect(() => {
    if (studyMode === 'flashcard') {
      let source = [...safeWords];
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        source = source.filter((w) => w.word?.toLowerCase().includes(q) || w.meaning?.toLowerCase().includes(q));
      }
      if (levelFilter !== 'all') {
        if (levelFilter === 'need_review') {
          source = source.filter((w) => getWordLevel(w.word) < 4);
        } else {
          const targetLvl = parseInt(levelFilter, 10);
          source = source.filter((w) => getWordLevel(w.word) === targetLvl);
        }
      }
      setFcWords(source);
      setFcIndex(0);
      setFcFlipped(false);
    }
  }, [studyMode, levelFilter, safeWords.length, searchTerm]); // Do NOT include getWordLevel/vocabMastery

  const activeFcCard = fcWords[fcIndex] || null;

  const handleFcNext = (isCorrect) => {
    if (activeFcCard) {
      updateMastery(activeFcCard.word, isCorrect);
    }
    setFcDirection(1);
    setFcFlipped(false);
    setTimeout(() => {
      setFcIndex((prev) => (prev < fcWords.length - 1 ? prev + 1 : 0));
      setFcDirection(null);
    }, 180);
  };

  const handleFcPrev = () => {
    setFcDirection(-1);
    setFcFlipped(false);
    setTimeout(() => {
      setFcIndex((prev) => (prev > 0 ? prev - 1 : fcWords.length - 1));
      setFcDirection(null);
    }, 180);
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // ─── QUIZ MODE (Multiple Choice 4 Options) ──────────────────────────────────
  // ═════════════════════════════════════════════════════════════════════════════
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizWrongList, setQuizWrongList] = useState([]);

  // Generate fallback distractor meanings from VOCAB_DATABASE or default pool
  const fallbackMeanings = useMemo(() => {
    const list = [];
    try {
      Object.values(VOCAB_DATABASE).forEach((parts) => {
        parts.forEach((p) => {
          p.words.forEach((w) => {
            if (w.meaning) list.push(w.meaning);
          });
        });
      });
    } catch (e) {}
    return list.length > 0
      ? list
      : ['người đại diện', 'chuẩn bị chu đáo', 'thông báo quan trọng', 'giải quyết vấn đề', 'nộp đơn xin việc', 'đàm phán hợp đồng'];
  }, []);

  const generateQuiz = useCallback(() => {
    let source = [...safeWords];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      source = source.filter((w) => w.word?.toLowerCase().includes(q) || w.meaning?.toLowerCase().includes(q));
    }
    if (levelFilter !== 'all') {
      if (levelFilter === 'need_review') {
        source = source.filter((w) => getWordLevel(w.word) < 4);
      } else {
        const targetLvl = parseInt(levelFilter, 10);
        source = source.filter((w) => getWordLevel(w.word) === targetLvl);
      }
    }
    if (source.length === 0) {
      setQuizQuestions([]);
      return;
    }

    const pool = [...source].sort(() => Math.random() - 0.5);
    const questions = pool.map((card) => {
      const correctMeaning = card.meaning;
      const otherMeanings = safeWords
        .filter((c) => c.word !== card.word && c.meaning && c.meaning !== correctMeaning)
        .map((c) => c.meaning);

      // Pick 3 distractors
      const distractors = [...otherMeanings, ...fallbackMeanings]
        .filter((m) => m !== correctMeaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [correctMeaning, ...distractors].sort(() => Math.random() - 0.5);
      return {
        card,
        correctMeaning,
        options,
      };
    });

    setQuizQuestions(questions);
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizWrongList([]);
  }, [safeWords, searchTerm, levelFilter, fallbackMeanings]); // Deliberately omit getWordLevel to prevent loop

  useEffect(() => {
    if (studyMode === 'quiz') {
      generateQuiz();
    }
  }, [studyMode, levelFilter, safeWords.length]); // Only re-generate when switching to quiz or filter/deck changes

  const handleQuizAnswer = (chosenOpt) => {
    if (quizSelected !== null) return;
    const q = quizQuestions[quizIdx];
    if (!q) return;

    setQuizSelected(chosenOpt);
    const isCorrect = chosenOpt === q.correctMeaning;

    updateMastery(q.card.word, isCorrect);

    if (isCorrect) {
      setQuizScore((s) => s + 1);
    } else {
      setQuizWrongList((prev) => [...prev, q.card]);
    }

    setTimeout(() => {
      setQuizIdx((prevIdx) => {
        if (prevIdx < quizQuestions.length - 1) {
          const next = prevIdx + 1;
          if (quizQuestions[next]?.card?.word) {
            speak(quizQuestions[next].card.word);
          }
          return next;
        } else {
          setQuizFinished(true);
          if (onStudyComplete) onStudyComplete();
          return prevIdx;
        }
      });
      setQuizSelected(null);
    }, 1000);
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // ─── MATCHING GAME MODE (6 Pairs Game) ──────────────────────────────────────
  // ═════════════════════════════════════════════════════════════════════════════
  const [matchPairs, setMatchPairs] = useState([]);
  const [matchMeanings, setMatchMeanings] = useState([]);
  const [selWordIdx, setSelWordIdx] = useState(null);
  const [selMeanText, setSelMeanText] = useState(null);
  const [matchedSet, setMatchedSet] = useState(new Set());
  const [wrongSet, setWrongSet] = useState(new Set());
  const [matchScore, setMatchScore] = useState(0);

  const initMatchGame = useCallback(() => {
    let source = [...safeWords];
    if (levelFilter !== 'all') {
      if (levelFilter === 'need_review') {
        source = source.filter((w) => getWordLevel(w.word) < 4);
      } else {
        const targetLvl = parseInt(levelFilter, 10);
        source = source.filter((w) => getWordLevel(w.word) === targetLvl);
      }
    }
    if (source.length < 2) {
      setMatchPairs([]);
      return;
    }
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, 6);
    setMatchPairs(shuffled);
    const means = shuffled.map((p) => p.meaning).sort(() => Math.random() - 0.5);
    setMatchMeanings(means);
    setSelWordIdx(null);
    setSelMeanText(null);
    setMatchedSet(new Set());
    setWrongSet(new Set());
    setMatchScore(0);
  }, [safeWords, levelFilter]);

  useEffect(() => {
    if (studyMode === 'match') {
      initMatchGame();
    }
  }, [studyMode, levelFilter, safeWords.length]);

  useEffect(() => {
    if (selWordIdx !== null && selMeanText !== null) {
      const wordObj = matchPairs[selWordIdx];
      if (wordObj && wordObj.meaning === selMeanText) {
        // Correct match!
        setMatchedSet((prev) => new Set([...prev, selWordIdx, `m_${selMeanText}`]));
        setMatchScore((s) => s + 1);
        updateMastery(wordObj.word, true);
        speak(wordObj.word);
        setSelWordIdx(null);
        setSelMeanText(null);

        if (matchedSet.size + 2 === matchPairs.length * 2 && onStudyComplete) {
          onStudyComplete();
        }
      } else {
        // Wrong match
        const curWordIdx = selWordIdx;
        const curMeanText = selMeanText;
        setWrongSet(new Set([curWordIdx, `m_${curMeanText}`]));
        if (wordObj) updateMastery(wordObj.word, false);
        setTimeout(() => {
          setWrongSet(new Set());
          setSelWordIdx(null);
          setSelMeanText(null);
        }, 600);
      }
    }
  }, [selWordIdx, selMeanText, matchPairs, updateMastery, speak, matchedSet.size, onStudyComplete]);

  // ═════════════════════════════════════════════════════════════════════════════
  // ─── SPELLING MODE (Listen & Type) ──────────────────────────────────────────
  // ═════════════════════════════════════════════════════════════════════════════
  const [spellWords, setSpellWords] = useState([]);
  const [spellIdx, setSpellIdx] = useState(0);
  const [spellInput, setSpellInput] = useState('');
  const [spellChecked, setSpellChecked] = useState(false);
  const [spellIsCorrect, setSpellIsCorrect] = useState(false);
  const [spellScore, setSpellScore] = useState(0);
  const [spellHintGiven, setSpellHintGiven] = useState(false);

  useEffect(() => {
    if (studyMode === 'spelling') {
      let source = [...safeWords];
      if (levelFilter !== 'all') {
        if (levelFilter === 'need_review') {
          source = source.filter((w) => getWordLevel(w.word) < 4);
        } else {
          const targetLvl = parseInt(levelFilter, 10);
          source = source.filter((w) => getWordLevel(w.word) === targetLvl);
        }
      }
      setSpellWords(source);
      setSpellIdx(0);
      setSpellInput('');
      setSpellChecked(false);
      setSpellScore(0);
      setSpellHintGiven(false);
    }
  }, [studyMode, levelFilter, safeWords.length]);

  const activeSpellCard = spellWords[spellIdx] || null;

  const handleSpellCheck = () => {
    if (!activeSpellCard || !spellInput.trim()) return;
    const cleanInput = spellInput.trim().toLowerCase();
    const targetWord = activeSpellCard.word.trim().toLowerCase();
    const isCorrect = cleanInput === targetWord;

    setSpellChecked(true);
    setSpellIsCorrect(isCorrect);
    updateMastery(activeSpellCard.word, isCorrect);

    if (isCorrect) {
      setSpellScore((s) => s + 1);
      speak(activeSpellCard.word);
    }
  };

  const handleSpellNext = () => {
    setSpellInput('');
    setSpellChecked(false);
    setSpellIsCorrect(false);
    setSpellHintGiven(false);
    if (spellIdx < spellWords.length - 1) {
      setSpellIdx((i) => i + 1);
      // Auto speak next word
      speak(spellWords[spellIdx + 1]?.word);
    } else {
      setSpellIdx(0);
      if (onStudyComplete) onStudyComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── 4 LEITNER MASTERY LEVEL CARDS ───────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Level 1: Mới lưu / Chưa thuộc */}
        <div
          onClick={() => setLevelFilter(levelFilter === '1' ? 'all' : '1')}
          className={`p-3.5 rounded-2xl border transition cursor-pointer ${
            levelFilter === '1'
              ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/30'
              : isLight
              ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-50'
              : 'bg-blue-950/20 border-blue-900/40 hover:bg-blue-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <span>🌱 Mới lưu</span>
              <span className="text-[10px] opacity-70">(Level 1)</span>
            </span>
            <span className="text-base font-black">{stats.l1}</span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-900/50 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${stats.total > 0 ? (stats.l1 / stats.total) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Level 2: Đang học */}
        <div
          onClick={() => setLevelFilter(levelFilter === '2' ? 'all' : '2')}
          className={`p-3.5 rounded-2xl border transition cursor-pointer ${
            levelFilter === '2'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/30'
              : isLight
              ? 'bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50'
              : 'bg-indigo-950/20 border-indigo-900/40 hover:bg-indigo-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <span>⚡ Đang học</span>
              <span className="text-[10px] opacity-70">(Level 2)</span>
            </span>
            <span className="text-base font-black">{stats.l2}</span>
          </div>
          <div className="w-full bg-indigo-200 dark:bg-indigo-900/50 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${stats.total > 0 ? (stats.l2 / stats.total) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Level 3: Ghi nhớ tốt */}
        <div
          onClick={() => setLevelFilter(levelFilter === '3' ? 'all' : '3')}
          className={`p-3.5 rounded-2xl border transition cursor-pointer ${
            levelFilter === '3'
              ? 'bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-400/30'
              : isLight
              ? 'bg-purple-50/50 border-purple-100 hover:bg-purple-50'
              : 'bg-purple-950/20 border-purple-900/40 hover:bg-purple-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <span>🧠 Ghi nhớ tốt</span>
              <span className="text-[10px] opacity-70">(Level 3)</span>
            </span>
            <span className="text-base font-black">{stats.l3}</span>
          </div>
          <div className="w-full bg-purple-200 dark:bg-purple-900/50 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${stats.total > 0 ? (stats.l3 / stats.total) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Level 4: Thành thạo */}
        <div
          onClick={() => setLevelFilter(levelFilter === '4' ? 'all' : '4')}
          className={`p-3.5 rounded-2xl border transition cursor-pointer ${
            levelFilter === '4'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
              : isLight
              ? 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50'
              : 'bg-emerald-950/20 border-emerald-900/40 hover:bg-emerald-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <span>⭐ Thành thạo</span>
              <span className="text-[10px] opacity-70">(Level 4)</span>
            </span>
            <span className="text-base font-black">{stats.l4}</span>
          </div>
          <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.total > 0 ? (stats.l4 / stats.total) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      {/* ─── 5 STUDY MODE SELECTOR TABS ──────────────────────────────────────── */}
      <div className={`p-1.5 rounded-2xl border flex items-center gap-1 overflow-x-auto scrollbar-hide ${
        isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-850 border-slate-800'
      }`}>
        {[
          { id: 'list', label: 'Danh Sách Từ', icon: 'fa-list-ul', badge: filteredWords.length },
          { id: 'flashcard', label: 'Flashcard 3D', icon: 'fa-clone' },
          { id: 'quiz', label: 'Trắc Nghiệm Quiz', icon: 'fa-circle-question' },
          { id: 'match', label: 'Nối Từ Nhanh', icon: 'fa-shuffle' },
          { id: 'spelling', label: 'Gõ Chính Tả', icon: 'fa-keyboard' },
        ].map((tab) => {
          const active = studyMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStudyMode(tab.id)}
              className={`flex-1 min-w-[125px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                active
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xs`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 1: LIST VIEW (Danh sách lưới thẻ từ vựng) ───────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {studyMode === 'list' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Controls: Search, Level Filter & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm từ vựng, phiên âm hoặc nghĩa..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                    : 'bg-slate-800 border-slate-700 text-white focus:border-blue-500'
                }`}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none transition cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <option value="all">Tất cả cấp độ ({safeWords.length})</option>
                <option value="need_review">⚠️ Cần ôn tập ({stats.needReview})</option>
                <option value="1">🌱 Mới lưu ({stats.l1})</option>
                <option value="2">⚡ Đang học ({stats.l2})</option>
                <option value="3">🧠 Ghi nhớ tốt ({stats.l3})</option>
                <option value="4">⭐ Thành thạo ({stats.l4})</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none transition cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <option value="default">Thứ tự mặc định</option>
                <option value="newest">Mới nhất</option>
                <option value="az">Bảng chữ cái (A-Z)</option>
              </select>

              {filteredWords.length > 0 && (
                <button
                  type="button"
                  onClick={() => setStudyMode('flashcard')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <i className="fa-solid fa-play text-[10px]" />
                  <span>Học Flashcard</span>
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredWords.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <i className="fa-solid fa-box-open text-4xl mb-3 opacity-40" />
              <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                {safeWords.length === 0 ? emptyTitle : 'Không tìm thấy từ vựng phù hợp với bộ lọc'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {safeWords.length === 0 ? emptyDesc : 'Thử đổi từ khóa tìm kiếm hoặc chọn "Tất cả cấp độ".'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredWords.map((item, idx) => {
                const lvl = getWordLevel(item.word);
                const posObj = formatPosBadge(item.pos);
                const saved = isWordSaved(item.word);

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${
                      isLight ? 'bg-slate-50 border-slate-200 hover:border-blue-300' : 'bg-slate-800/80 border-slate-700 hover:border-blue-700'
                    }`}
                  >
                    <div>
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-black text-blue-600 dark:text-blue-400">
                              {item.word}
                            </h4>
                            {posObj && (
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${posObj.color}`}>
                                {posObj.text}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono text-slate-400 font-bold">
                            {getDisplayIpa(item.word, item.ipa || item.pron)}
                          </span>
                        </div>

                        {/* Actions: Speak & Save/Delete */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => speak(item.word)}
                            className="w-8 h-8 rounded-xl bg-blue-600/15 text-blue-500 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <i className="fa-solid fa-volume-high" />
                          </button>

                          {/* Save/Unsave to Notebook Star Button */}
                          <button
                            type="button"
                            onClick={() => toggleSaveWord(item)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition cursor-pointer ${
                              saved
                                ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
                                : 'text-slate-400 hover:text-amber-500 hover:bg-amber-500/10'
                            }`}
                            title={saved ? 'Đã lưu vào Sổ từ vựng (Bấm để bỏ lưu)' : 'Lưu từ này vào Sổ tay từ vựng'}
                          >
                            <i className={`fa-star ${saved ? 'fa-solid' : 'fa-regular'}`} />
                          </button>

                          {/* Delete from Notebook (if canDeleteWord) */}
                          {canDeleteWord && onDeleteWord && (
                            <button
                              type="button"
                              onClick={() => onDeleteWord(item.word)}
                              className="w-8 h-8 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 flex items-center justify-center text-xs transition cursor-pointer"
                              title="Xóa khỏi sổ từ"
                            >
                              <i className="fa-solid fa-trash-can" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Meaning */}
                      <div className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {formatVietnameseText(item.meaning)}
                      </div>

                      {/* Example sentence */}
                      {item.example && (
                        <div className="mt-2 p-2 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-0.5">
                          <p className="text-[11px] text-blue-600 dark:text-blue-400 italic font-medium">
                            "{item.example}"
                          </p>
                          {item.exMeaning && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                              {formatVietnameseText(item.exMeaning)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Lingoland Mastery Stars & Level */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1" title={`Cấp độ ghi nhớ: Level ${lvl}/4`}>
                        {[1, 2, 3, 4].map((star) => (
                          <i
                            key={star}
                            className={`fa-solid fa-star text-[11px] transition ${
                              star <= lvl ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        ))}
                        <span className="text-[10px] text-slate-400 font-mono font-bold ml-1">
                          Lvl {lvl}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => updateMastery(item.word, false)}
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 hover:text-rose-500 transition cursor-pointer"
                          title="Đánh dấu chưa nhớ (giảm level)"
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => updateMastery(item.word, true)}
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-600 hover:bg-emerald-500/10 transition cursor-pointer"
                          title="Đánh dấu đã nhớ (tăng level)"
                        >
                          +1
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 2: FLASHCARD 3D MODE (Lật thẻ học thông minh) ──────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {studyMode === 'flashcard' && (
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto py-2 animate-fadeIn">
          {fcWords.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p>Chưa có từ vựng nào trong danh sách này để học Flashcard.</p>
              <button
                type="button"
                onClick={() => setStudyMode('list')}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Quay lại danh sách từ
              </button>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="w-full">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
                  <span>Thẻ {fcIndex + 1} / {fcWords.length}</span>
                  <span className="text-amber-500 flex items-center gap-1">
                    <i className="fa-solid fa-star text-xs" />
                    Level {getWordLevel(activeFcCard?.word)}/4
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((fcIndex + 1) / fcWords.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* 3D Flip Card Container */}
              <div
                className={`relative w-full h-[300px] md:h-[330px] cursor-pointer select-none transition-all duration-300 ${
                  fcDirection === 1 ? 'translate-x-8 opacity-0' : fcDirection === -1 ? '-translate-x-8 opacity-0' : ''
                }`}
                style={{ perspective: 1000 }}
                onClick={() => setFcFlipped((f) => !f)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{ transformStyle: 'preserve-3d', transform: fcFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute inset-0 rounded-3xl border flex flex-col items-center justify-between p-6 shadow-xl transition-all ${
                      isLight
                        ? 'bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border-slate-200 text-slate-900 shadow-slate-200/50'
                        : 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 border-slate-700/80 text-white shadow-black/40'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-mono uppercase font-black px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {activeFcCard?.pos ? formatPosBadge(activeFcCard.pos)?.text : deckBadge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Chạm để lật ↩
                      </span>
                    </div>

                    <div className="text-center my-auto space-y-2">
                      <h3 className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                        {activeFcCard?.word}
                      </h3>
                      <p className="text-sm md:text-base font-mono font-bold text-slate-400">
                        {getDisplayIpa(activeFcCard?.word, activeFcCard?.ipa || activeFcCard?.pron)}
                      </p>

                      <div className="pt-2 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(activeFcCard?.word);
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600 hover:text-white text-blue-500 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                        >
                          <i className="fa-solid fa-volume-high text-xs" />
                          <span>Nghe phát âm</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 select-none flex items-center gap-1.5">
                      <i className="fa-solid fa-repeat text-[10px]" />
                      <span>Chạm thẻ để xem nghĩa tiếng Việt & ví dụ</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`absolute inset-0 rounded-3xl border flex flex-col items-center justify-between p-6 shadow-xl transition-all ${
                      isLight
                        ? 'bg-gradient-to-br from-indigo-50/40 via-white to-amber-50/30 border-slate-200 text-slate-900 shadow-slate-200/50'
                        : 'bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950/40 border-slate-700/80 text-white shadow-black/40'
                    }`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-mono uppercase font-black px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        NGHĨA TIẾNG VIỆT
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Chạm để quay lại ↩
                      </span>
                    </div>

                    <div className="text-center my-auto space-y-3 px-4">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                        {formatVietnameseText(activeFcCard?.meaning)}
                      </h3>

                      {activeFcCard?.example && (
                        <div className="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/15 max-w-md mx-auto">
                          <p className="text-xs md:text-sm italic text-blue-600 dark:text-blue-400 font-semibold font-sans">
                            "{activeFcCard.example}"
                          </p>
                          {activeFcCard.exMeaning && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              {formatVietnameseText(activeFcCard.exMeaning)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 select-none flex items-center gap-1.5">
                      <i className="fa-solid fa-repeat text-[10px]" />
                      <span>Chạm thẻ để quay lại mặt trước</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pronunciation Practice Widget */}
              {activeFcCard && (
                <div className="w-full">
                  <PronunciationChecker
                    targetWord={activeFcCard.word}
                    pronunciation={activeFcCard.ipa || activeFcCard.pron}
                    theme={theme}
                  />
                </div>
              )}

              {/* Actions & Mastery feedback */}
              <div className="flex items-center justify-between gap-3 w-full">
                <button
                  type="button"
                  onClick={handleFcPrev}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition ${
                    isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Thẻ trước"
                >
                  <i className="fa-solid fa-arrow-left text-sm" />
                </button>

                <div className="flex items-center gap-3 flex-1 justify-center max-w-sm">
                  <button
                    type="button"
                    onClick={() => handleFcNext(false)}
                    className="flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    title="Chưa nhớ từ này"
                  >
                    <i className="fa-solid fa-xmark text-sm" />
                    <span>Chưa nhớ (-1)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFcNext(true)}
                    className="flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    title="Đã nhớ rõ từ này"
                  >
                    <i className="fa-solid fa-check text-sm" />
                    <span>Đã nhớ (+1 ⭐)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleFcNext(true)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition ${
                    isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Thẻ tiếp theo"
                >
                  <i className="fa-solid fa-arrow-right text-sm" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 3: QUIZ MODE (Trắc nghiệm 4 đáp án kiểu Lingoland) ─────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {studyMode === 'quiz' && (
        <div className="max-w-xl mx-auto space-y-5 animate-fadeIn">
          {quizQuestions.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p>Chưa có từ vựng nào để tạo bài trắc nghiệm.</p>
              <button
                type="button"
                onClick={() => setStudyMode('list')}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Quay lại danh sách từ
              </button>
            </div>
          ) : quizFinished ? (
            /* Quiz Completed View */
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 text-3xl flex items-center justify-center mx-auto animate-bounce">
                🏆
              </div>
              <h3 className="text-2xl font-black">
                Hoàn thành bài Quiz Trắc Nghiệm!
              </h3>
              <p className="text-sm text-slate-400">
                Bạn đã trả lời đúng <strong className="text-emerald-500">{quizScore}</strong> / {quizQuestions.length} câu hỏi.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold max-w-md mx-auto">
                <i className="fa-solid fa-circle-check mr-1.5" />
                Đã tự động ghi nhận và tích hoàn thành nhiệm vụ ôn tập từ vựng hôm nay!
              </div>

              {quizWrongList.length > 0 && (
                <div className="text-left mt-6 p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 max-w-md mx-auto">
                  <h4 className="text-xs font-black text-rose-500 uppercase mb-2">
                    Các từ cần chú ý ôn lại ({quizWrongList.length} từ):
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {quizWrongList.map((w, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="font-bold text-blue-600 dark:text-blue-400">{w.word}</span>
                        <span className="text-slate-400">{w.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={generateQuiz}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-2"
                >
                  <i className="fa-solid fa-rotate-right" />
                  <span>Làm lại bài trắc nghiệm</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStudyMode('flashcard')}
                  className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                >
                  Ôn lại bằng Flashcard
                </button>
              </div>
            </div>
          ) : (
            /* Active Question */
            (() => {
              const currentQ = quizQuestions[quizIdx];
              if (!currentQ) return null;

              return (
                <div className="space-y-4">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Câu {quizIdx + 1} / {quizQuestions.length}</span>
                    <span className="text-emerald-500 font-bold">
                      <i className="fa-solid fa-check mr-1" />
                      Đúng: {quizScore}
                    </span>
                  </div>

                  <div className={`w-full h-2 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
                    <div
                      className="h-full bg-blue-600 transition-all rounded-full"
                      style={{ width: `${((quizIdx + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Box */}
                  <div className={`p-6 rounded-3xl border text-center space-y-2 shadow-xs ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
                  }`}>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
                      TỪ NÀY CÓ NGHĨA LÀ GÌ?
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                      {currentQ.card.word}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 font-bold">
                      {getDisplayIpa(currentQ.card.word, currentQ.card.ipa || currentQ.card.pron)}
                    </p>

                    <button
                      type="button"
                      onClick={() => speak(currentQ.card.word)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/10 text-blue-500 text-xs font-bold hover:bg-blue-600/20 transition cursor-pointer mt-1"
                    >
                      <i className="fa-solid fa-volume-high text-[11px]" />
                      <span>Nghe phát âm</span>
                    </button>
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentQ.options.map((opt, optIdx) => {
                      let btnStyle = isLight
                        ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                        : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-200';

                      if (quizSelected !== null) {
                        if (opt === currentQ.correctMeaning) {
                          btnStyle = 'bg-emerald-600 border-emerald-500 text-white font-black shadow-md ring-2 ring-emerald-400/50';
                        } else if (opt === quizSelected) {
                          btnStyle = 'bg-rose-600 border-rose-500 text-white font-black shadow-md';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleQuizAnswer(opt)}
                          disabled={quizSelected !== null}
                          className={`p-3.5 px-4 rounded-2xl border text-xs md:text-sm font-bold text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span>{formatVietnameseText(opt)}</span>
                          {quizSelected !== null && opt === currentQ.correctMeaning && (
                            <i className="fa-solid fa-check text-xs shrink-0" />
                          )}
                          {quizSelected !== null && opt === quizSelected && opt !== currentQ.correctMeaning && (
                            <i className="fa-solid fa-xmark text-xs shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 4: MATCHING GAME (Game ghép đôi từ - nghĩa) ────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {studyMode === 'match' && (
        <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
          {matchPairs.length < 2 ? (
            <div className="text-center py-16 text-slate-400">
              <p>Cần ít nhất 2 từ vựng trong danh sách để chơi game ghép thẻ.</p>
              <button
                type="button"
                onClick={() => setStudyMode('list')}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Quay lại danh sách từ
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                <span>Chạm vào từ tiếng Anh và nghĩa tiếng Việt tương ứng để nối</span>
                <span className="text-emerald-500 font-black">
                  Đã ghép: {matchScore}/{matchPairs.length} cặp
                </span>
              </div>

              {matchedSet.size === matchPairs.length * 2 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-3xl">🎉</p>
                  <h4 className="text-xl font-black">Chúc mừng! Bạn đã ghép đúng toàn bộ!</h4>
                  <p className="text-xs text-slate-400">Tất cả {matchPairs.length} từ đã được tăng độ ghi nhớ thành thạo.</p>
                  <button
                    type="button"
                    onClick={initMatchGame}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    Ghép thêm 6 từ khác ➔
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {/* Left Column: English Words */}
                  <div className="space-y-2.5">
                    {matchPairs.map((p, idx) => {
                      const isMatched = matchedSet.has(idx);
                      const isSelected = selWordIdx === idx;
                      const isWrong = wrongSet.has(idx);

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isMatched}
                          onClick={() => setSelWordIdx(isSelected ? null : idx)}
                          className={`w-full p-3.5 rounded-2xl font-black text-xs md:text-sm text-left border-2 transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 opacity-40 cursor-default'
                              : isWrong
                              ? 'bg-rose-500/20 border-rose-500 text-rose-600 animate-shake'
                              : isSelected
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-md scale-102'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400'
                              : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500'
                          }`}
                        >
                          {p.word}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column: Vietnamese Meanings */}
                  <div className="space-y-2.5">
                    {matchMeanings.map((m, idx) => {
                      const isMatched = matchedSet.has(`m_${m}`);
                      const isSelected = selMeanText === m;
                      const isWrong = wrongSet.has(`m_${m}`);

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isMatched}
                          onClick={() => setSelMeanText(isSelected ? null : m)}
                          className={`w-full p-3.5 rounded-2xl font-semibold text-xs md:text-sm text-left border-2 transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 opacity-40 cursor-default'
                              : isWrong
                              ? 'bg-rose-500/20 border-rose-500 text-rose-600 animate-shake'
                              : isSelected
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-md scale-102'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400'
                              : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500'
                          }`}
                        >
                          {formatVietnameseText(m)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── TAB 5: SPELLING MODE (Nghe phát âm & Gõ đúng chính tả) ─────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {studyMode === 'spelling' && (
        <div className="max-w-lg mx-auto space-y-5 animate-fadeIn">
          {spellWords.length === 0 || !activeSpellCard ? (
            <div className="text-center py-16 text-slate-400">
              <p>Chưa có từ vựng nào để luyện gõ chính tả.</p>
              <button
                type="button"
                onClick={() => setStudyMode('list')}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Quay lại danh sách từ
              </button>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Từ {spellIdx + 1} / {spellWords.length}</span>
                <span className="text-emerald-500">Đúng: {spellScore}</span>
              </div>

              {/* Card prompt */}
              <div className={`p-6 rounded-3xl border text-center space-y-3 shadow-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
              }`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500">
                  NGHE PHÁT ÂM & GÕ CHÍNH XÁC TỪ TIẾNG ANH
                </span>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => speak(activeSpellCard.word)}
                    className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg shadow-md hover:bg-indigo-700 transition cursor-pointer hover:scale-105 active:scale-95"
                    title="Nghe phát âm"
                  >
                    <i className="fa-solid fa-volume-high" />
                  </button>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                  {formatVietnameseText(activeSpellCard.meaning)}
                </h3>

                <p className="text-xs font-mono text-slate-400">
                  {activeSpellCard.ipa || activeSpellCard.pron}
                </p>

                {spellHintGiven && (
                  <div className="text-xs text-amber-500 font-mono font-bold animate-fadeIn">
                    Gợi ý: Bắt đầu bằng chữ "{activeSpellCard.word[0].toUpperCase()}" ({activeSpellCard.word.length} chữ cái)
                  </div>
                )}
              </div>

              {/* Typing Input */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={spellInput}
                  onChange={(e) => setSpellInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!spellChecked) handleSpellCheck();
                      else handleSpellNext();
                    }
                  }}
                  disabled={spellChecked && spellIsCorrect}
                  placeholder="Gõ từ tiếng Anh vào đây rồi nhấn Enter..."
                  className={`w-full p-4 rounded-2xl text-center text-lg font-black tracking-wide border-2 focus:outline-none transition ${
                    spellChecked
                      ? spellIsCorrect
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                        : 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'
                      : 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500'
                  }`}
                  autoFocus
                />

                {spellChecked && (
                  <div className={`p-3 rounded-xl text-xs font-bold text-center border animate-fadeIn ${
                    spellIsCorrect
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  }`}>
                    {spellIsCorrect ? (
                      <span>🎉 Chính xác! Bạn đã nhớ chuẩn xác chính tả từ này (+1 ⭐)</span>
                    ) : (
                      <span>⚠️ Chưa đúng. Đáp án chính xác là: <strong>"{activeSpellCard.word}"</strong></span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  {!spellHintGiven && !spellChecked && (
                    <button
                      type="button"
                      onClick={() => setSpellHintGiven(true)}
                      className="text-xs text-amber-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <i className="fa-regular fa-lightbulb" />
                      <span>Xem gợi ý</span>
                    </button>
                  )}

                  <div className="ml-auto flex items-center gap-2">
                    {!spellChecked ? (
                      <button
                        type="button"
                        onClick={handleSpellCheck}
                        disabled={!spellInput.trim()}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-black transition cursor-pointer shadow-sm"
                      >
                        Kiểm tra ➔
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSpellNext}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition cursor-pointer shadow-sm"
                      >
                        Từ tiếp theo ➔
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
