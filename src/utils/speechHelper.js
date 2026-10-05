/**
 * Unified Pronunciation & Speech Engine
 * Compatible with Desktop Safari, iOS Safari, iPhone PWA Standalone, Chrome & Edge.
 * - Handles asynchronous voiceschanged event
 * - Dynamic English voice resolution (en-US -> en-GB -> en)
 * - Safe iOS SpeechSynthesis execution without silent muting
 * - Automatic audio fallback if synthesis fails or is unavailable
 */

let cachedVoices = [];

function initVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const load = () => {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    } catch (e) {}
  };

  load();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = load;
  }
}

initVoices();

/**
 * Resolve the best English voice available
 */
export function resolveBestEnglishVoice(preferredAccent = 'us') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  let voices = cachedVoices;
  if (!voices || voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
    }
  }

  if (!voices || voices.length === 0) return null;

  const enVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  if (enVoices.length === 0) return voices[0] || null;

  if (preferredAccent === 'uk') {
    const ukVoice = enVoices.find((v) => v.lang.toLowerCase().includes('en-gb') || v.name.toLowerCase().includes('uk'));
    if (ukVoice) return ukVoice;
  }

  // Preferred US
  const naturalUs = enVoices.find(
    (v) =>
      v.lang.toLowerCase().includes('en-us') &&
      (v.name.toLowerCase().includes('natural') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('google') ||
        v.name.toLowerCase().includes('alex'))
  );
  if (naturalUs) return naturalUs;

  const anyUs = enVoices.find((v) => v.lang.toLowerCase().includes('en-us'));
  if (anyUs) return anyUs;

  return enVoices[0];
}

/**
 * Play fallback audio pronunciation from public audio endpoint if synthesis fails
 */
function playAudioFallback(text) {
  try {
    const clean = encodeURIComponent(String(text).trim());
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${clean}`;
    const audio = new Audio(audioUrl);
    audio.playbackRate = 0.9;
    return audio.play().catch(() => {});
  } catch (e) {
    return Promise.resolve();
  }
}

/**
 * Clean text for natural speech (stripping parenthesized notes like (CV), (v), (adj), (sb/sth))
 */
export function sanitizeTextForSpeech(text) {
  if (!text || typeof text !== 'string') return '';
  // Remove parenthesized content: e.g. "Curriculum vitae (CV)" -> "Curriculum vitae"
  const stripped = text.replace(/\s*\([^)]*\)/g, '').replace(/\[[^\]]*\]/g, '').trim();
  // Fallback to text without bracket chars if stripping emptied the string
  return (stripped || text.replace(/[()[\]]/g, '')).replace(/\s+/g, ' ').trim();
}

/**
 * Universal speech player with iOS Safari PWA support & fallback
 */
export function speakEnglish(text, options = {}) {
  const { rate = 0.88, pitch = 1.0, accent = 'us', onEnd, onError } = options;

  if (!text || typeof text !== 'string' || !text.trim()) return;
  const cleanText = sanitizeTextForSpeech(text);
  if (!cleanText) return;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    playAudioFallback(cleanText).then(() => onEnd && onEnd());
    return;
  }

  try {
    // On iOS, if synthesis is paused, resume first
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Cancel previously running speech safely
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = accent === 'uk' ? 'en-GB' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voice = resolveBestEnglishVoice(accent);
    if (voice) {
      utterance.voice = voice;
    }

    let finished = false;
    utterance.onend = () => {
      if (finished) return;
      finished = true;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (finished) return;
      finished = true;
      // If Web Speech API fails, attempt audio fallback
      playAudioFallback(cleanText)
        .then(() => onEnd && onEnd())
        .catch(() => onError && onError(e));
    };

    // Safety timeout: if onend never fires (iOS bug), unlock after expected duration
    const estDurationMs = Math.max(1200, (cleanText.length / 10) * 1000);
    setTimeout(() => {
      if (!finished) {
        finished = true;
        if (onEnd) onEnd();
      }
    }, estDurationMs + 2000);

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    playAudioFallback(cleanText).then(() => onEnd && onEnd());
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}
