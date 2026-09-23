import React, { useState } from 'react';

/**
 * Interactive Rule Item Component (Modern Space-Efficient Design)
 * Sleek Bento card with inline preview and smooth expandable details
 */
export default function InteractiveRuleItem({
  num,
  rule,
  example,
  translation,
  explanation,
  defaultOpen = false,
  theme = 'light',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isLight = theme === 'light';

  // Speak example sentence using Web Speech Synthesis
  const speakExample = (e) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window) || !example) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(example);
    u.lang = 'en-US';
    u.rate = 0.9;

    // Pick natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalEn = voices.find(
      (v) =>
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Jenny') || v.name.includes('Guy')) &&
        (v.lang.includes('US') || v.lang.includes('GB'))
    );
    if (naturalEn) u.voice = naturalEn;

    window.speechSynthesis.speak(u);
  };

  // Open Global AI Assistant tailored to this specific rule
  const handleAskAI = (e) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('open-ai-assistant', {
        detail: {
          query: `Giải thích chi tiết và phân tích sâu hơn giúp mình về quy tắc: "${rule}". Ví dụ: "${example}"`,
        },
      })
    );
  };

  // Format single digit with leading zero: 1 -> "01"
  const formattedNum = num !== undefined ? (num < 10 ? `0${num}` : num) : null;

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className={`rounded-2xl border transition-all duration-200 cursor-pointer select-none overflow-hidden group ${
        isOpen
          ? isLight
            ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-400/20 shadow-xs'
            : 'bg-blue-950/25 border-blue-600/60 ring-2 ring-blue-500/20 shadow-xs'
          : isLight
          ? 'bg-white hover:bg-slate-50/90 border-slate-200/80 shadow-2xs hover:border-blue-300 hover:shadow-xs'
          : 'bg-slate-850/80 hover:bg-slate-800 border-slate-700/60 hover:border-blue-600/50 hover:shadow-xs'
      }`}
    >
      {/* ─── COMPACT HEADER ROW ─── */}
      <div className="p-3 px-3.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0 flex-1">
          {formattedNum && (
            <span
              className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 font-mono transition ${
                isOpen
                  ? 'bg-blue-600 text-white shadow-2xs scale-105'
                  : isLight
                  ? 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                  : 'bg-slate-800 text-slate-400 group-hover:bg-blue-900/40 group-hover:text-blue-300'
              }`}
            >
              {formattedNum}
            </span>
          )}

          <div className="min-w-0 flex-1 space-y-1">
            <p
              className={`text-xs md:text-sm leading-snug transition ${
                isOpen
                  ? 'text-blue-700 dark:text-blue-300 font-extrabold'
                  : 'text-slate-800 dark:text-slate-100 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400'
              }`}
            >
              {rule}
            </p>

            {/* Subtle Inline Example Preview (when closed) */}
            {!isOpen && example && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 truncate">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">e.g.</span>
                <span className="italic truncate font-serif text-slate-600 dark:text-slate-400">"{example}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Toggle Icon */}
        <div className="shrink-0 flex items-center gap-1 mt-0.5">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
              isOpen
                ? 'bg-blue-600 text-white shadow-2xs rotate-180'
                : 'text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40'
            }`}
          >
            <i className="fa-solid fa-chevron-down text-[10px]" />
          </div>
        </div>
      </div>

      {/* ─── EXPANDED EXAMPLE & EXPLANATION CARD ─── */}
      {isOpen && (
        <div
          className={`p-3 px-3.5 border-t text-xs leading-relaxed space-y-2.5 transition-all animate-fadeIn ${
            isLight
              ? 'bg-white/95 border-blue-200/80 text-slate-800'
              : 'bg-slate-900/90 border-blue-900/40 text-slate-200'
          }`}
        >
          {/* Example Box */}
          <div className="bg-emerald-500/10 border border-emerald-500/25 p-2.5 px-3 rounded-xl flex items-start justify-between gap-3">
            <div className="space-y-0.5 min-w-0 flex-1">
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1 font-mono">
                <i className="fa-solid fa-microphone-lines text-[9px]" /> Ví dụ câu thực tế:
              </span>
              <p className="text-xs md:text-sm font-black text-slate-900 dark:text-white leading-snug">
                {example}
              </p>
              {translation && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  ➔ Dịch nghĩa: "{translation}"
                </p>
              )}
            </div>

            {/* Pronunciation button */}
            <button
              onClick={speakExample}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 transition flex items-center gap-1 shadow-2xs hover:scale-102 cursor-pointer"
              title="Nghe phát âm câu ví dụ"
            >
              <i className="fa-solid fa-volume-high text-[10px]" />
              <span>Phát âm</span>
            </button>
          </div>

          {/* Pedagogical Explanation */}
          {explanation && (
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-amber-500/10 border border-amber-500/20 p-2.5 px-3 rounded-xl">
              <i className="fa-solid fa-lightbulb text-amber-500 text-xs mt-0.5 shrink-0" />
              <div className="leading-relaxed">
                <strong className="text-amber-800 dark:text-amber-300">Giải thích: </strong>
                <span>{explanation}</span>
              </div>
            </div>
          )}

          {/* Ask AI Shortcut */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
            <span className="text-slate-400 text-[10px]">Bấm vào thẻ để thu gọn</span>
            <button
              onClick={handleAskAI}
              className="font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-robot text-xs" />
              <span>Hỏi AI về câu này ➔</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
