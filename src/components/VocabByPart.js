import React, { useState, useMemo, useEffect } from 'react';
import { LEVEL_DEFINITIONS, VOCAB_DATABASE } from '../data/vocabularyByLevelAndPart';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { VOCAB_PART_SHEET } from '../config/sheets';
import VocabStudyStudio from './VocabStudyStudio';
import { useUserStorage } from '../hooks/useUserStorage';

export default function VocabByPart({
  theme = 'dark',
  initialLevelId,
  initialPartNum,
  knownWordsMap: propKnownWordsMap,
}) {
  const [localKnown] = useUserStorage('vocab_mastery_v2', {});
  const knownWordsMap = propKnownWordsMap || localKnown;

  const [selectedLevelId, setSelectedLevelId] = useState(initialLevelId || 'so-cap');

  const LEVEL_GID_MAP = useMemo(() => ({
    'so-cap': '407949833',
    'tien-trung-cap': '313120164',
    'trung-cap': '1171971428',
    'cao-cap': '521786381',
    'ielts-trung-cap': '563630252',
  }), []);

  const activeLevelGid = LEVEL_GID_MAP[selectedLevelId] || '407949833';

  const { data: sheetData } = useGoogleSheet(
    VOCAB_PART_SHEET.baseUrl,
    activeLevelGid,
    3
  );
  const [selectedPartKey, setSelectedPartKey] = useState(initialPartNum ? `Part ${initialPartNum}` : 'Part 1');
  const [selectedPartNum, setSelectedPartNum] = useState(initialPartNum || 1);
  const [challengeMode50, setChallengeMode50] = useState(true); // Challenge 50 words / session
  const [selectedSet50, setSelectedSet50] = useState(() => Math.ceil((initialPartNum || 1) / 5) || 1);

  useEffect(() => {
    if (initialLevelId) setSelectedLevelId(initialLevelId);
    if (initialPartNum) {
      setSelectedPartNum(initialPartNum);
      setSelectedPartKey(`Part ${initialPartNum}`);
      const s = Math.ceil(initialPartNum / 5) || 1;
      setSelectedSet50(s);
    }
  }, [initialLevelId, initialPartNum]);

  const isLight = theme === 'light';
  const levelInfo = LEVEL_DEFINITIONS.find((l) => l.id === selectedLevelId) || LEVEL_DEFINITIONS[0];

  // Group live sheet data by Part
  const livePartsMap = useMemo(() => {
    if (!sheetData || sheetData.length === 0) return {};
    const groups = {};
    sheetData.forEach((item) => {
      const pName = item.part || 'Part 1';
      if (!groups[pName]) {
        groups[pName] = {
          partKey: pName,
          title: `${pName}`,
          desc: `Từ vựng trực tiếp từ Google Sheet - ${pName}`,
          words: [],
        };
      }
      groups[pName].words.push({
        word: item.word,
        pron: item.pron || '',
        pos: item.partOfSpeech || item.pos || '',
        meaning: item.meaning || '',
        example: item.examplePhrase || '',
        exMeaning: item.exampleMeaning || '',
      });
    });
    return groups;
  }, [sheetData]);

  const livePartKeys = useMemo(() => {
    const keys = Object.keys(livePartsMap);
    return keys.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
      return numA - numB;
    });
  }, [livePartsMap]);

  // Static fallback data for non-so-cap levels
  const staticPartsList = VOCAB_DATABASE[selectedLevelId] || [];
  const currentStaticPartData =
    staticPartsList.find((p) => p.part === selectedPartNum) || staticPartsList[0];

  // Determine if active level uses Live Google Sheet
  const isLiveForLevel = livePartKeys.length > 0;

  // Set default active part when level changes
  useEffect(() => {
    if (isLiveForLevel && livePartKeys.length > 0 && !livePartsMap[selectedPartKey]) {
      setSelectedPartKey(livePartKeys[0]);
    }
  }, [selectedLevelId, isLiveForLevel, livePartKeys, livePartsMap, selectedPartKey]);

  // Collect all words available for this level
  const allLevelWords = useMemo(() => {
    let list = [];
    if (isLiveForLevel && livePartKeys.length > 0) {
      livePartKeys.forEach((k) => {
        if (livePartsMap[k]?.words) list.push(...livePartsMap[k].words);
      });
    } else {
      staticPartsList.forEach((p) => {
        if (p.words) list.push(...p.words);
      });
    }
    return list;
  }, [isLiveForLevel, livePartKeys, livePartsMap, staticPartsList]);

  // Dynamic 50-word challenge blocks (Each Part has 100 words -> 2 sessions of 50 words)
  const challengeBlocks = useMemo(() => {
    const totalWords = allLevelWords.length > 0 ? allLevelWords.length : 2000;
    const totalSets = Math.max(1, Math.ceil(totalWords / 50));
    const blocks = [];
    for (let i = 0; i < totalSets; i++) {
      const setNum = i + 1;
      const partNum = Math.ceil(setNum / 2);
      const isSecondHalf = setNum % 2 === 0;
      const label = `Part ${partNum} • ${isSecondHalf ? 'Buổi 2 (Từ 51 - 100)' : 'Buổi 1 (Từ 1 - 50)'}`;
      blocks.push({
        setNum,
        partNum,
        label,
        startPart: partNum,
      });
    }
    return blocks;
  }, [allLevelWords.length]);

  // Raw cards in current active part or 50-word challenge combo
  const rawCards = useMemo(() => {
    if (challengeMode50) {
      const start = (selectedSet50 - 1) * 50;
      const end = start + 50;
      const sliced = allLevelWords.slice(start, end);
      return sliced.length > 0 ? sliced : allLevelWords.slice(0, 50);
    }

    if (isLiveForLevel) {
      return livePartsMap[selectedPartKey]?.words || [];
    }
    return currentStaticPartData?.words || [];
  }, [challengeMode50, selectedSet50, allLevelWords, isLiveForLevel, livePartsMap, selectedPartKey, currentStaticPartData]);

  // Part Progress Statistics
  const partStats = useMemo(() => {
    const total = rawCards.length;
    let knownCount = 0;
    rawCards.forEach((c) => {
      const cleanW = (c.word || '').toLowerCase().trim();
      if (knownWordsMap && knownWordsMap[cleanW]) knownCount += 1;
    });
    const pct = total > 0 ? Math.round((knownCount / total) * 100) : 0;
    return {
      total,
      known: knownCount,
      unlearned: Math.max(0, total - knownCount),
      percent: pct,
    };
  }, [rawCards, knownWordsMap]);

  return (
    <div className="flex flex-col gap-6">
      {/* ─── 4 MAIN LEVEL CARDS ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {LEVEL_DEFINITIONS.map((lvl) => {
          const active = selectedLevelId === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevelId(lvl.id)}
              className={`p-3.5 rounded-3xl border text-left transition-all duration-200 flex items-center gap-3.5 group select-none cursor-pointer ${
                active
                  ? isLight
                    ? 'bg-blue-50/90 border-blue-400 text-blue-950 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-blue-950/40 border-blue-500 text-blue-100 shadow-md ring-1 ring-blue-500/30'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs hover:border-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              {/* Thumbnail Image */}
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <img
                  src={lvl.image}
                  alt={lvl.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                  <i className={`fa-solid ${lvl.icon || 'fa-seedling'} text-[10px] text-white`} />
                </div>
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                      active
                        ? isLight ? 'bg-blue-200/80 text-blue-800' : 'bg-blue-500/30 text-blue-200'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {lvl.sub || lvl.scoreTarget}
                  </span>
                </div>
                <h4 className="text-sm font-black leading-tight truncate">
                  {lvl.label || lvl.name}
                </h4>
                <p className={`text-[11px] mt-0.5 truncate ${active ? (isLight ? 'text-blue-700 font-medium' : 'text-blue-300 font-medium') : 'text-slate-400'}`}>
                  {lvl.desc || `Tổng ${lvl.totalParts} phần`}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── PART SELECTOR & LEVEL PROGRESS BAR ───────────────── */}
      <div
        className={`p-5 md:p-6 rounded-3xl border space-y-4 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Challenge 50 Mode Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-xl text-xs font-black bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5 shadow-xs">
              <i className="fa-solid fa-fire text-rose-500 text-xs animate-pulse" />
              <span>Thử Thách 50 Từ / Ngày</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {challengeMode50 ? 'Đang gộp 5 Parts = 50 từ liên tục' : 'Chế độ cơ bản: 10 từ/part'}
            </span>
          </div>

          <button
            onClick={() => setChallengeMode50(!challengeMode50)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition border flex items-center gap-1.5 shadow-xs cursor-pointer ${
              challengeMode50
                ? 'bg-rose-500 text-white border-rose-600'
                : isLight
                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <i className={`fa-solid ${challengeMode50 ? 'fa-toggle-on' : 'fa-toggle-off'}`} />
            <span>{challengeMode50 ? 'Đang Bật: 50 từ/buổi' : 'Bật Thử Thách 50 Từ'}</span>
          </button>
        </div>

        {/* Horizontal Part Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {challengeMode50 ? (
            challengeBlocks.map((block) => {
              const active = selectedSet50 === block.setNum;
              return (
                <button
                  key={block.setNum}
                  onClick={() => {
                    setSelectedSet50(block.setNum);
                    setSelectedPartNum(block.startPart);
                    setSelectedPartKey(`Part ${block.startPart}`);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md ring-2 ring-rose-400/30'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <i className="fa-solid fa-fire text-xs text-amber-300" />
                  <span>{block.label}</span>
                </button>
              );
            })
          ) : (
            isLiveForLevel
              ? livePartKeys.map((pKey) => {
                  const active = selectedPartKey === pKey;
                  return (
                    <button
                      key={pKey}
                      onClick={() => {
                        setSelectedPartKey(pKey);
                      }}
                      className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                        active
                          ? 'bg-blue-600 text-white shadow-md'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {pKey}
                    </button>
                  );
                })
              : staticPartsList.map((p) => {
                  const active = selectedPartNum === p.part;
                  return (
                    <button
                      key={p.part}
                      onClick={() => {
                        setSelectedPartNum(p.part);
                      }}
                      className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                        active
                          ? 'bg-blue-600 text-white shadow-md'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      Part {p.part}
                    </button>
                  );
                })
          )}
        </div>

        {/* Part Measurement Progress Box */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-black text-sm">
              {partStats.percent}%
            </span>
            <div>
              <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Tiến độ {isLiveForLevel ? selectedPartKey : `Part ${selectedPartNum}`}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Đã thuộc <strong className="text-emerald-500">{partStats.known}</strong> / {partStats.total} từ ({partStats.unlearned} từ chưa học)
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${partStats.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── STANDARDIZED UNIFIED VOCAB STUDY STUDIO ─── */}
      <VocabStudyStudio
        words={rawCards}
        theme={theme}
        canDeleteWord={false}
        deckBadge={`${levelInfo?.label || 'Level'} • ${isLiveForLevel ? selectedPartKey : `Part ${selectedPartNum}`}`}
        emptyTitle="Chưa có từ vựng cho phần này"
        emptyDesc="Vui lòng chọn Part khác hoặc cấp độ khác."
      />
    </div>
  );
}
