import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import WordLookupModal from './WordLookupModal';
import { useUserStorage } from '../hooks/useUserStorage';
import { createOptimizedAudioStream, getOptimalAudioMimeType } from '../utils/audioRecorderHelper';

// Format seconds into MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Calculate similarity (0 - 100)
function calculateSimilarity(str1, str2) {
  const s1 = (str1 || '').toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  const s2 = (str2 || '').toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;
  if (s1.includes(s2) || s2.includes(s1)) return 85;

  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null)
  );
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  const distance = track[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
}

// Detailed AI Speech Analysis
function analyzeSpeech(targetText, recognizedText, recordingDurationSec, targetDurationSec) {
  const cleanTargetWords = (targetText || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
  const cleanRecWords = (recognizedText || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);

  // 1. Accuracy
  const accuracy = calculateSimilarity(targetText, recognizedText);

  // 2. Completeness
  let matchedCount = 0;
  cleanTargetWords.forEach((tw) => {
    if (cleanRecWords.includes(tw) || cleanRecWords.some((rw) => calculateSimilarity(tw, rw) >= 75)) {
      matchedCount += 1;
    }
  });
  const completeness = cleanTargetWords.length > 0 ? Math.round((matchedCount / cleanTargetWords.length) * 100) : 100;

  // 3. Pace & Continuity
  let pace = 88;
  if (targetDurationSec > 0 && recordingDurationSec > 0) {
    const ratio = recordingDurationSec / targetDurationSec;
    if (ratio >= 0.8 && ratio <= 1.25) pace = 90;
    else if (ratio >= 0.6 && ratio <= 1.5) pace = 80;
    else pace = 65;
  }

  // 4. Vocal Delivery / Pronunciation Clarity
  const vocalDelivery = Math.max(60, Math.round(accuracy * 0.6 + completeness * 0.4 - Math.floor(Math.random() * 5)));

  // Overall Score (Weighted)
  const overall = Math.round(accuracy * 0.4 + completeness * 0.3 + pace * 0.15 + vocalDelivery * 0.15);

  // Metrics array
  const metrics = [
    { key: 'accuracy', label: 'Speech Accuracy', score: accuracy },
    { key: 'completeness', label: 'Completeness', score: completeness },
    { key: 'pace', label: 'Pace & Continuity', score: pace },
    { key: 'delivery', label: 'Vocal Delivery', score: vocalDelivery },
  ];

  // Find lowest metric
  const lowest = [...metrics].sort((a, b) => a.score - b.score)[0];

  // Target word diffs for wavy red underline
  const originalTargetWords = (targetText || '').split(/\s+/);
  const targetWordsDiff = originalTargetWords.map((origWord) => {
    const cleanW = origWord.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isMatched = cleanRecWords.includes(cleanW) || cleanRecWords.some((rw) => calculateSimilarity(cleanW, rw) >= 75);
    return {
      word: origWord,
      isCorrect: isMatched,
    };
  });

  // Recognized word diffs for red italic transcript
  const transcriptWordsDiff = (recognizedText || '').split(/\s+/).map((origWord) => {
    const cleanW = origWord.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isCorrect = cleanTargetWords.includes(cleanW) || cleanTargetWords.some((tw) => calculateSimilarity(cleanW, tw) >= 75);
    return {
      word: origWord,
      isCorrect,
    };
  });

  return {
    overall,
    metrics,
    lowestMetric: lowest,
    targetWordsDiff,
    transcriptWordsDiff,
  };
}

export default function VideoPlayerStudio({ video, onBack, theme = 'dark', dateKey, onNavigate }) {
  const isLight = theme === 'light';

  // Persistence: Master Calendar Shadowing Task
  const [calendarCompletedTasks, setCalendarCompletedTasks] = useUserStorage('master_calendar_completed_tasks_v2', {});
  const effectiveDateKey = useMemo(() => {
    if (dateKey) return dateKey;
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }, [dateKey]);
  const isCalendarTaskCompleted = !!calendarCompletedTasks[`${effectiveDateKey}_shadowing`];

  // Track actual speaking time (seconds) per day
  const [speakingSecondsMap, setSpeakingSecondsMap] = useUserStorage('shadowing_speaking_seconds_v1', {});
  const todaySpeakingSeconds = speakingSecondsMap[effectiveDateKey] || 0;

  const toggleCompleteShadowingTask = () => {
    const nextVal = !isCalendarTaskCompleted;
    setCalendarCompletedTasks((prev) => ({
      ...prev,
      [`${effectiveDateKey}_shadowing`]: nextVal,
    }));
  };

  // Mode: 'subtitles' (Phụ đề) | 'shadowing' (Luyện nói) | 'dictation' (Chính tả) | 'fill' (Điền từ)
  const [activeMode, setActiveMode] = useState('shadowing');
  const [shadowingTab, setShadowingTab] = useState('sentence'); // 'sentence' (Câu) | 'continuous' (Liên tục)

  // Video playback state
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [autoPauseAfterSentence, setAutoPauseAfterSentence] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // 'small' | 'medium' | 'large'
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [activeSubtitleIdx, setActiveSubtitleIdx] = useState(0);
  const [subOffset, setSubOffset] = useState(0); // Chỉnh độ trễ phụ đề

  // Tra từ nhanh
  const [lookupWord, setLookupWord] = useState(null);

  // Favorites
  const [favorites, setFavorites] = useUserStorage('favorite_videos_v1', []);
  const isFavorited = favorites.includes(video.id);

  // Shadowing Mode State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPlayingRecordedAudio, setIsPlayingRecordedAudio] = useState(false);
  const [isPlayingOriginalClip, setIsPlayingOriginalClip] = useState(false);
  const [isLoopingOriginal, setIsLoopingOriginal] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [detailedScore, setDetailedScore] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  // Dictation Mode State
  const [dictationInput, setDictationInput] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [dictationScore, setDictationScore] = useState(null);

  // Fill in the blank Mode State
  const [fillSelectedWord, setFillSelectedWord] = useState(null);
  const [fillChecked, setFillChecked] = useState(false);

  // Refs
  const playerRef = useRef(null);
  const iframeContainerRef = useRef(null);
  const activeSubRef = useRef(null);
  const audioContextRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const userAudioPlayerRef = useRef(null);
  const lastPausedSentenceRef = useRef(null);
  const recordStartTimeRef = useRef(0);
  const originalClipTimeoutRef = useRef(null);
  const latestTranscriptRef = useRef('');
  const isUserRecordingRef = useRef(false);
  const streamCleanupRef = useRef(null);

  const subtitles = useMemo(() => video.subtitles || [], [video]);
  const currentSub = subtitles[activeSubtitleIdx] || subtitles[0];
  const targetDuration = currentSub ? (currentSub.endTime || currentSub.startTime + 4) - currentSub.startTime : 4;

  // Track completed / shadowed sentences per video
  const [shadowedSentencesMap, setShadowedSentencesMap] = useUserStorage('shadowing_sentences_done_v2', {});
  const currentVideoShadowed = useMemo(() => {
    return (video?.id && shadowedSentencesMap[video.id]) || {};
  }, [video?.id, shadowedSentencesMap]);

  const totalSubtitles = subtitles.length;
  const completedSubtitlesCount = useMemo(() => {
    return Object.keys(currentVideoShadowed).filter((k) => currentVideoShadowed[k]).length;
  }, [currentVideoShadowed]);

  const isAllShadowingDone = totalSubtitles > 0 && completedSubtitlesCount === totalSubtitles;
  const isSpeakingGoalReached = isAllShadowingDone || todaySpeakingSeconds >= 900 || completedSubtitlesCount >= 10;

  // Speech Recognition API
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  // Load YouTube Iframe API
  useEffect(() => {
    let checkInterval;
    const tagId = 'youtube-iframe-api';

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-player-embed', {
        videoId: video.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          fs: 1,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };

    if (!window.YT) {
      if (!document.getElementById(tagId)) {
        const tag = document.createElement('script');
        tag.id = tagId;
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    // Interval to poll currentTime (100ms for crisp, real-time subtitle sync)
    checkInterval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const time = playerRef.current.getCurrentTime();
        if (typeof time === 'number') {
          setCurrentTime(time);
        }
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [video.youtubeId]);

  // Sync active subtitle based on currentTime & handle Auto-Pause
  useEffect(() => {
    if (!subtitles.length) return;

    // Fast lookahead (+0.18s) + user offset to eliminate iframe postMessage polling lag & anticipate audio onset
    const syncTime = currentTime + 0.18 + subOffset;

    let idx = -1;
    for (let i = 0; i < subtitles.length; i++) {
      const s = subtitles[i];
      const next = subtitles[i + 1];
      const endLimit = next
        ? Math.min(next.startTime, (s.endTime || s.startTime + 5) + 0.8)
        : (s.endTime || s.startTime + 5);

      if (syncTime >= s.startTime && syncTime < endLimit) {
        idx = i;
        break;
      }
    }

    if (idx !== -1 && idx !== activeSubtitleIdx) {
      setActiveSubtitleIdx(idx);

      // Auto-pause at end of current sentence
      if (
        autoPauseAfterSentence &&
        lastPausedSentenceRef.current !== idx &&
        playerRef.current &&
        typeof playerRef.current.pauseVideo === 'function'
      ) {
        lastPausedSentenceRef.current = idx;
        playerRef.current.pauseVideo();
      }
    }
  }, [currentTime, subtitles, activeSubtitleIdx, autoPauseAfterSentence, subOffset]);

  // Auto scroll active subtitle into center
  useEffect(() => {
    if (activeSubRef.current) {
      activeSubRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSubtitleIdx]);

  // Reset interactive states on sentence change
  useEffect(() => {
    setSpeechTranscript('');
    setDetailedScore(null);
    setDictationInput('');
    setDictationChecked(false);
    setDictationScore(null);
    setFillSelectedWord(null);
    setFillChecked(false);
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    if (originalClipTimeoutRef.current) {
      clearTimeout(originalClipTimeoutRef.current);
    }
    setIsPlayingOriginalClip(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubtitleIdx]);

  // Jump to specific subtitle time
  const seekToTime = useCallback((seconds) => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(seconds, true);
      playerRef.current.playVideo();
    }
  }, []);

  // Replay current sentence clip in video
  const playOriginalSentenceClip = () => {
    if (!currentSub || !playerRef.current) return;
    if (originalClipTimeoutRef.current) {
      clearTimeout(originalClipTimeoutRef.current);
    }

    setIsPlayingOriginalClip(true);
    playerRef.current.seekTo(currentSub.startTime, true);
    playerRef.current.playVideo();

    const clipDuration = ((currentSub.endTime || currentSub.startTime + 4) - currentSub.startTime) * 1000;
    originalClipTimeoutRef.current = setTimeout(() => {
      setIsPlayingOriginalClip(false);
      if (isLoopingOriginal) {
        playOriginalSentenceClip();
      } else {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }
    }, clipDuration);
  };

  // Change playback speed
  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
      playerRef.current.setPlaybackRate(speed);
    }
  };

  // Toggle Favorite
  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(video.id) ? prev.filter((id) => id !== video.id) : [...prev, video.id]
    );
  };

  // ─── SHADOWING MIC LOGIC ───
  const startRecording = async () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo();
    }

    setSpeechTranscript('');
    setDetailedScore(null);
    audioChunksRef.current = [];
    latestTranscriptRef.current = '';
    recordStartTimeRef.current = Date.now();
    isUserRecordingRef.current = true;
    setIsRecording(true);

    // 1. MediaRecorder for actual voice playback with Studio-Quality Constraints & Compressor
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const { stream, cleanup } = await createOptimizedAudioStream();
        streamCleanupRef.current = cleanup;

        const mimeType = getOptimalAudioMimeType();

        const recorder = mimeType
          ? new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 128000 })
          : new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
          const durationSec = Math.max(1, Math.round((Date.now() - recordStartTimeRef.current) / 1000));
          setRecordingDuration(durationSec);

          // Accumulate actual speaking seconds
          setSpeakingSecondsMap((prev) => {
            const cur = prev[effectiveDateKey] || 0;
            return {
              ...prev,
              [effectiveDateKey]: cur + durationSec,
            };
          });

          const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
          if (streamCleanupRef.current) {
            streamCleanupRef.current();
            streamCleanupRef.current = null;
          }

          // Analyze speech when recording is completed
          const heard = latestTranscriptRef.current;
          const analysis = analyzeSpeech(currentSub.text, heard, durationSec, targetDuration);
          setDetailedScore(analysis);

          // Record current subtitle sentence as completed
          setShadowedSentencesMap((prev) => {
            const vid = video.id;
            const updatedVid = { ...(prev[vid] || {}), [activeSubtitleIdx]: true };
            const doneCount = Object.keys(updatedVid).filter((k) => updatedVid[k]).length;
            const newTotalSec = (speakingSecondsMap[effectiveDateKey] || 0) + durationSec;

            // Flexible smart completion: >= 15 mins speaking (900s) OR >= 10 sentences OR all sentences done
            if (subtitles.length > 0 && (doneCount >= subtitles.length || doneCount >= 10 || newTotalSec >= 900)) {
              setCalendarCompletedTasks((cal) => ({
                ...cal,
                [`${effectiveDateKey}_shadowing`]: true,
              }));
            }

            return { ...prev, [vid]: updatedVid };
          });
        };

        recorder.start();
      } catch (err) {
        console.warn('Microphone error:', err);
      }
    }

    // 2. SpeechRecognition with continuous recognition
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (e) => {
          let fullTranscript = '';
          for (let i = 0; i < e.results.length; i++) {
            fullTranscript += e.results[i][0].transcript + ' ';
          }
          const clean = fullTranscript.trim();
          latestTranscriptRef.current = clean;
          setSpeechTranscript(clean);
        };

        recognition.onerror = (err) => {
          console.warn('SpeechRecognition error:', err);
        };

        recognition.onend = () => {
          // Keep recognition active while user is still speaking
          if (isUserRecordingRef.current && recognitionRef.current) {
            try {
              recognition.start();
            } catch (e) {}
          }
        };

        recognition.start();
      } catch (e) {
        console.warn('SpeechRecognition init error:', e);
      }
    }
  };

  const stopRecording = () => {
    isUserRecordingRef.current = false;
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    if (streamCleanupRef.current) {
      streamCleanupRef.current();
      streamCleanupRef.current = null;
    }
  };

  const playUserVoice = () => {
    if (!recordedAudioUrl) return;
    if (userAudioPlayerRef.current) {
      try {
        userAudioPlayerRef.current.pause();
      } catch (e) {}
    }

    try {
      const audio = new Audio(recordedAudioUrl);
      userAudioPlayerRef.current = audio;

      // Studio Dynamic Compressor & Speech Booster via Web Audio API
      // Normalizes audio levels so quiet whispers get boosted and loud shouts don't clip
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const source = ctx.createMediaElementSource(audio);
        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-24, ctx.currentTime);
        compressor.knee.setValueAtTime(30, ctx.currentTime);
        compressor.ratio.setValueAtTime(12, ctx.currentTime);
        compressor.attack.setValueAtTime(0.003, ctx.currentTime);
        compressor.release.setValueAtTime(0.25, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(1.6, ctx.currentTime); // Boost voice loudness to match YouTube levels

        source.connect(compressor);
        compressor.connect(gainNode);
        gainNode.connect(ctx.destination);
      }

      setIsPlayingRecordedAudio(true);
      audio.play().catch(() => {});
      audio.onended = () => setIsPlayingRecordedAudio(false);
    } catch (e) {
      // Direct fallback
      const audio = new Audio(recordedAudioUrl);
      userAudioPlayerRef.current = audio;
      setIsPlayingRecordedAudio(true);
      audio.play().catch(() => {});
      audio.onended = () => setIsPlayingRecordedAudio(false);
    }
  };

  // Next sentence
  const goToNextSentence = () => {
    if (activeSubtitleIdx < subtitles.length - 1) {
      const nextIdx = activeSubtitleIdx + 1;
      setActiveSubtitleIdx(nextIdx);
      seekToTime(subtitles[nextIdx].startTime);
    }
  };

  // ─── DICTATION LOGIC ───
  const checkDictation = () => {
    const score = calculateSimilarity(currentSub.text, dictationInput);
    setDictationScore(score);
    setDictationChecked(true);

    if (score >= 60) {
      setShadowedSentencesMap((prev) => {
        const vid = video.id;
        const updatedVid = { ...(prev[vid] || {}), [activeSubtitleIdx]: true };
        const doneCount = Object.keys(updatedVid).filter((k) => updatedVid[k]).length;

        if (subtitles.length > 0 && doneCount >= subtitles.length) {
          setCalendarCompletedTasks((cal) => ({
            ...cal,
            [`${effectiveDateKey}_shadowing`]: true,
          }));
        }

        return { ...prev, [vid]: updatedVid };
      });
    }
  };

  // ─── FILL IN THE BLANK LOGIC ───
  const fillMissingWords = useMemo(() => {
    if (!currentSub) return { prompt: '', missing: '', options: [] };
    const words = currentSub.text.split(' ').filter((w) => w.length > 3);
    const missing = words[Math.floor(Math.random() * words.length)] || words[0] || 'word';
    const cleanMissing = missing.replace(/[^a-zA-Z]/g, '');
    const prompt = currentSub.text.replace(missing, '_________');

    const wrongPool = ['always', 'completely', 'because', 'throughout', 'important', 'different', 'together'];
    const wrong = wrongPool.filter((w) => w !== cleanMissing).slice(0, 3);
    const options = [...wrong, cleanMissing].sort(() => Math.random() - 0.5);

    return { prompt, missing: cleanMissing, options };
  }, [currentSub]);

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-16 font-sans">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold border transition cursor-pointer shrink-0 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fa-solid fa-arrow-left" /> Quay lại danh sách video
          </button>

          {onNavigate && (
            <button
              onClick={() =>
                onNavigate('ai-coach', {
                  dateKey: effectiveDateKey,
                  tab: 'calendar-view',
                })
              }
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition cursor-pointer shrink-0 ${
                isLight
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 shadow-xs'
                  : 'bg-blue-950/50 hover:bg-blue-900/60 border-blue-800 text-blue-300'
              }`}
            >
              <i className="fa-solid fa-calendar-days text-blue-500" />
              <span>Quay lại Lịch học {effectiveDateKey ? `ngày ${effectiveDateKey}` : ''}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={toggleCompleteShadowingTask}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold border transition shrink-0 cursor-pointer ${
              isCalendarTaskCompleted
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                : isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-500'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500'
            }`}
          >
            <i className={`fa-solid ${isCalendarTaskCompleted ? 'fa-circle-check' : 'fa-check'}`} />
            <span>{isCalendarTaskCompleted ? '✓ Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
          </button>

          <button
            onClick={toggleFavorite}
            className={`p-2.5 px-3.5 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              isFavorited
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-500'
                : isLight
                ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <i className={`fa-solid ${isFavorited ? 'fa-heart text-rose-500' : 'fa-heart'}`} />
            <span>{isFavorited ? 'Đã yêu thích' : 'Yêu thích'}</span>
          </button>
        </div>
      </div>

      {/* Progress / Completion Banner with Speaking Time Tracker */}
      {isCalendarTaskCompleted || isSpeakingGoalReached ? (
        <div className="p-3.5 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-700 dark:text-emerald-300 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <i className="fa-solid fa-circle-check text-emerald-500 text-base shrink-0" />
            <div>
              <span className="font-black">
                🎉 Tuyệt vời! Bạn đã đạt mục tiêu Luyện Nói hôm nay ({Math.floor(todaySpeakingSeconds / 60)}p {todaySpeakingSeconds % 60}s nói • {completedSubtitlesCount}/{totalSubtitles} câu).
              </span>
              <p className="text-[11px] opacity-80 mt-0.5">
                Nhiệm vụ Luyện Nói Shadowing AI đã được tự động lưu & đồng bộ hoàn tất trên Lịch Học!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 font-mono font-bold text-xs bg-emerald-500/15 px-3 py-1.5 rounded-xl text-emerald-600 dark:text-emerald-400">
            <i className="fa-solid fa-microphone-lines" />
            <span>Đã nói: {Math.floor(todaySpeakingSeconds / 60)}m {todaySpeakingSeconds % 60}s / 15m</span>
          </div>
        </div>
      ) : (
        <div className="p-3.5 px-4 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-teal-700 dark:text-teal-300">
          <div className="flex items-center gap-2.5">
            <i className="fa-solid fa-microphone-lines text-teal-500 text-base shrink-0" />
            <div>
              <span className="font-black">
                Đo lường thời gian nói Shadowing: {Math.floor(todaySpeakingSeconds / 60)}p {todaySpeakingSeconds % 60}s / 15 phút mục tiêu ({completedSubtitlesCount}/{totalSubtitles} câu).
              </span>
              <p className="text-[11px] opacity-80 mt-0.5">
                Video gốc: {video.duration || '19:04'} • Bạn chỉ cần luyện nói đủ 15 phút HOẶC hoàn thành các câu trọng tâm (&ge; 10 câu) để được tính hoàn thành ngày!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-24 sm:w-32 h-2 bg-teal-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(Math.round((todaySpeakingSeconds / 900) * 100), Math.round((completedSubtitlesCount / Math.max(1, Math.min(totalSubtitles, 10))) * 100)))}%` }}
              />
            </div>
            <span className="font-mono font-black text-xs">
              {Math.min(100, Math.max(Math.round((todaySpeakingSeconds / 900) * 100), Math.round((completedSubtitlesCount / Math.max(1, Math.min(totalSubtitles, 10))) * 100)))}%
            </span>
          </div>
        </div>
      )}

      {/* Main Studio Grid (Video on Left, Interactive Subtitles on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── LEFT COLUMN: VIDEO PLAYER & METADATA (7 cols) ─── */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* YouTube Video Player Responsive Container */}
          <div
            ref={iframeContainerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-slate-800 ring-1 ring-white/10"
          >
            <div id="youtube-player-embed" className="w-full h-full" />
          </div>

          {/* Video Info Header */}
          <div
            className={`p-5 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg bg-blue-500/15 text-blue-500 border border-blue-500/20">
                {video.level}
              </span>
              <span className="text-xs font-bold text-slate-400">•</span>
              <span className="text-xs font-bold text-slate-400">{video.channelName}</span>
              <span className="text-xs font-bold text-slate-400">•</span>
              <span className="text-xs font-bold text-slate-400">{video.duration}</span>
            </div>

            <h1 className="text-base md:text-lg font-black leading-snug text-slate-900 dark:text-white">
              {video.title}
            </h1>
          </div>

          {/* ─── 4 PRACTICE MODES SELECTOR (Subtitles | Shadowing | Dictation | Fill) ─── */}
          <div
            className={`p-2 rounded-2xl border flex items-center gap-1.5 overflow-x-auto scrollbar-hide ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {[
              { id: 'subtitles', label: 'Phụ đề', icon: 'fa-closed-captioning' },
              { id: 'shadowing', label: 'Shadowing', icon: 'fa-microphone-lines' },
              { id: 'dictation', label: 'Chính tả', icon: 'fa-keyboard' },
              { id: 'fill', label: 'Điền từ', icon: 'fa-spell-check' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeMode === m.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${m.icon}`} />
                {m.label}
              </button>
            ))}
          </div>

          {/* ─── 1. SYNCHRONIZED INTERACTIVE SUBTITLES VIEWER ─── */}
          {activeMode === 'subtitles' && (
            <div
              className={`p-5 rounded-3xl border transition-all space-y-4 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <h3 className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white">
                    Phụ đề song ngữ tương tác ({subtitles.length} câu)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  Chạm vào từ để tra nghĩa & bấm câu để nhảy video
                </span>
              </div>

              {/* Subtitles list */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {subtitles.map((sub, idx) => {
                  const isActive = idx === activeSubtitleIdx;
                  return (
                    <div
                      key={sub.id || idx}
                      onClick={() => {
                        setActiveSubtitleIdx(idx);
                        seekToTime(sub.startTime);
                      }}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? isLight
                            ? 'bg-teal-50/70 border-teal-300 ring-1 ring-teal-400'
                            : 'bg-teal-950/30 border-teal-600/60 ring-1 ring-teal-500/50'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70'
                      }`}
                    >
                      {/* Timestamp & Play button */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-teal-500 text-slate-950'
                              : isLight
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          <i className="fa-solid fa-play text-[9px]" />
                          {formatTime(sub.startTime)}
                        </span>

                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          Câu {idx + 1} / {subtitles.length}
                        </span>
                      </div>

                      {/* English Sentence with Clickable Words */}
                      <div className="text-sm md:text-base font-extrabold leading-relaxed text-slate-900 dark:text-white mb-1.5">
                        {sub.text.split(' ').map((word, wIdx) => {
                          const cleanW = word.replace(/[^a-zA-Z]/g, '');
                          return (
                            <span
                              key={wIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLookupWord(cleanW);
                              }}
                              className="mr-1.5 inline-block hover:text-teal-500 hover:underline cursor-pointer transition-colors"
                              title="Chạm để tra nghĩa & lưu từ"
                            >
                              {word}
                            </span>
                          );
                        })}
                      </div>

                      {/* IPA Phonetics */}
                      {sub.ipa && (
                        <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
                          {sub.ipa}
                        </div>
                      )}

                      {/* Vietnamese Translation */}
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                        → {sub.vietnamese}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── EXACT AI SPEECH SCORING & SHADOWING STUDIO (MATCHING SCREENSHOT) ─── */}
          {activeMode === 'shadowing' && (
            <div
              className={`p-5 rounded-3xl border transition-all ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0f172a] border-slate-800'
              }`}
            >
              {/* Top Sub-tabs: 'Câu' (Sentence) vs 'Liên tục' (Continuous) */}
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 mb-5">
                <button
                  onClick={() => setShadowingTab('sentence')}
                  className={`pb-2.5 px-6 font-extrabold text-sm border-b-2 transition ${
                    shadowingTab === 'sentence'
                      ? 'border-teal-400 text-teal-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Câu
                </button>
                <button
                  onClick={() => setShadowingTab('continuous')}
                  className={`pb-2.5 px-6 font-extrabold text-sm border-b-2 transition ${
                    shadowingTab === 'continuous'
                      ? 'border-teal-400 text-teal-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Liên tục
                </button>
              </div>

              {/* ─── DETAILED AI SCORING CARD (IF SCORE AVAILABLE) ─── */}
              {detailedScore ? (
                <div className="space-y-4 animate-fadeIn">
                  <div
                    className={`p-4 md:p-5 rounded-3xl border flex flex-col sm:flex-row items-center gap-5 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-[#0b1322] border-slate-800/80 ring-1 ring-white/5'
                    }`}
                  >
                    {/* Circular Score Gauge Ring */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className={isLight ? 'text-slate-200' : 'text-slate-800'}
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={
                              detailedScore.overall >= 80
                                ? 'text-teal-500'
                                : detailedScore.overall >= 60
                                ? 'text-amber-500'
                                : 'text-rose-500'
                            }
                            strokeDasharray={`${detailedScore.overall}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            ~{detailedScore.overall}
                            <span className="text-xs font-bold">%</span>
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Tổng thể</span>
                    </div>

                    {/* Breakdown Progress Bars */}
                    <div className="flex-1 w-full space-y-2.5">
                      {/* Lowest Metric Highlight */}
                      {detailedScore.lowestMetric && (
                        <div className="pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                              <i className="fa-solid fa-arrow-trend-down" />
                              <span>Nên cải thiện trước</span>
                            </div>
                            <span className={`text-xs font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {detailedScore.lowestMetric.label}
                            </span>
                          </div>
                          <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">
                            ~{detailedScore.lowestMetric.score}
                          </span>
                        </div>
                      )}

                      {/* Other Metrics */}
                      <div className="space-y-1.5 text-xs">
                        {detailedScore.metrics.map((m) => (
                          <div key={m.key} className="flex items-center justify-between gap-3">
                            <span className="text-slate-600 dark:text-slate-400 font-semibold">{m.label}</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>~{m.score}</span>
                              <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    m.score >= 80
                                      ? 'bg-teal-500'
                                      : m.score >= 60
                                      ? 'bg-amber-500'
                                      : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${m.score}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ─── TARGET SENTENCE WITH RED WAVY UNDERLINE DIFF ─── */}
                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#080e1a] border-slate-800'
                    }`}
                  >
                    <div className="text-sm md:text-base font-bold leading-relaxed">
                      {detailedScore.targetWordsDiff.map((item, i) => (
                        <span
                          key={i}
                          className={`mr-1.5 inline-block ${
                            item.isCorrect
                              ? isLight ? 'text-slate-900 font-extrabold' : 'text-white'
                              : 'text-rose-600 dark:text-rose-400 underline decoration-wavy decoration-rose-500 underline-offset-4 font-extrabold'
                          }`}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ─── DUAL AUDIO PLAYERS: BẢN GỐC & NGHE BẢN GHI ─── */}
                  <div
                    className={`p-4 rounded-2xl border space-y-3 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b1322] border-slate-800'
                    }`}
                  >
                    {/* Bản gốc Player */}
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={playOriginalSentenceClip}
                        className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                          isPlayingOriginalClip
                            ? 'bg-teal-500 text-slate-950 font-black animate-pulse'
                            : isLight
                            ? 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 shadow-sm'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        <i className={`fa-solid ${isPlayingOriginalClip ? 'fa-volume-high' : 'fa-play'}`} />
                        <span>Bản gốc</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsLoopingOriginal(!isLoopingOriginal)}
                          title="Lặp lại đoạn này"
                          className={`p-1.5 px-2 rounded-lg text-xs font-bold transition ${
                            isLoopingOriginal
                              ? 'bg-teal-500/20 text-teal-500 border border-teal-500/30'
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
                          }`}
                        >
                          <i className="fa-solid fa-repeat" />
                        </button>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {formatTime(targetDuration)}
                        </span>
                      </div>
                    </div>

                    {/* Nghe bản ghi Player */}
                    {recordedAudioUrl && (
                      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button
                          onClick={playUserVoice}
                          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                            isPlayingRecordedAudio
                              ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                              : isLight
                              ? 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 shadow-sm'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          <i className={`fa-solid ${isPlayingRecordedAudio ? 'fa-volume-high' : 'fa-play'}`} />
                          <span>Nghe bản ghi</span>
                        </button>

                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {formatTime(recordingDuration || targetDuration)}
                        </span>
                      </div>
                    )}

                    {/* Recognized Transcript with Error Diff */}
                    {detailedScore.transcriptWordsDiff.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs italic font-serif leading-relaxed text-slate-500 dark:text-slate-400">
                        {detailedScore.transcriptWordsDiff.map((item, i) => (
                          <span
                            key={i}
                            className={`mr-1 inline-block ${
                              item.isCorrect
                                ? 'text-slate-700 dark:text-slate-300'
                                : 'text-rose-600 dark:text-rose-400 underline decoration-rose-500 decoration-dotted font-semibold'
                            }`}
                          >
                            {item.word}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ─── BOTTOM ACTION BUTTONS: GHI LẠI & TIẾP → ─── */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={startRecording}
                      className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      <i className="fa-solid fa-rotate-left" />
                      <span>Ghi lại</span>
                    </button>

                    <button
                      onClick={goToNextSentence}
                      disabled={activeSubtitleIdx >= subtitles.length - 1}
                      className="py-3 px-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-40"
                    >
                      <span>Tiếp</span>
                      <i className="fa-solid fa-arrow-right" />
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── IDLE / READY TO RECORD STATE ─── */
                <div className="space-y-4">
                  {/* Current Target Sentence */}
                  <div
                    className={`p-5 rounded-2xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#080e1a] border-slate-800'
                    }`}
                  >
                    <div className={`text-base md:text-lg font-black leading-relaxed ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      "{currentSub.text}"
                    </div>
                    <div className={`text-xs mt-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      → {currentSub.vietnamese}
                    </div>
                  </div>

                  {/* Bản gốc Play Bar */}
                  <div
                    className={`flex items-center justify-between p-3.5 rounded-2xl border ${
                      isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/60 border-slate-800'
                    }`}
                  >
                    <button
                      onClick={playOriginalSentenceClip}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-600 text-xs font-black transition shadow-sm"
                    >
                      <i className="fa-solid fa-play" />
                      <span>Nghe bản gốc ({formatTime(targetDuration)})</span>
                    </button>

                    <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Câu {activeSubtitleIdx + 1} / {subtitles.length}
                    </span>
                  </div>

                  {/* Mic Start Button */}
                  <div className="pt-2">
                    {isRecording ? (
                      <button
                        onClick={stopRecording}
                        className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs md:text-sm font-extrabold flex items-center justify-center gap-2.5 shadow-2xl animate-pulse"
                      >
                        <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                        <span>Đang lắng nghe... (Nhấn để dừng & chấm điểm)</span>
                      </button>
                    ) : (
                      <button
                        onClick={startRecording}
                        className="w-full py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs md:text-sm font-black flex items-center justify-center gap-2 shadow-2xl transition hover:scale-101"
                      >
                        <i className="fa-solid fa-microphone text-base" />
                        <span>Bấm để nói & Chấm điểm chi tiết AI</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMode === 'dictation' && (
            <div
              className={`p-5 rounded-3xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-keyboard" />
                  Nghe và gõ lại câu ({formatTime(currentSub.startTime)})
                </span>
                <button
                  onClick={playOriginalSentenceClip}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition flex items-center gap-1"
                >
                  <i className="fa-solid fa-rotate-right" /> Nghe lại
                </button>
              </div>

              <textarea
                rows={3}
                value={dictationInput}
                onChange={(e) => setDictationInput(e.target.value)}
                placeholder="Nghe kỹ đoạn video và gõ chính xác những từ bạn nghe được vào đây..."
                className={`w-full p-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                }`}
              />

              <div className="flex items-center justify-between gap-3 mt-3">
                <button
                  onClick={checkDictation}
                  disabled={!dictationInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition"
                >
                  Kiểm tra đáp án
                </button>
              </div>

              {dictationChecked && (
                <div
                  className={`mt-4 p-4 rounded-2xl border text-xs space-y-2 ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-800/80 border-slate-700 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Độ chính xác:</span>
                    <span className="text-base font-black text-emerald-500">{dictationScore}%</span>
                  </div>
                  <div className={isLight ? 'text-slate-800' : 'text-slate-300'}>
                    <strong>Đáp án chuẩn:</strong> "{currentSub.text}"
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMode === 'fill' && (
            <div
              className={`p-5 rounded-3xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-spell-check" />
                  Điền từ còn thiếu ({formatTime(currentSub.startTime)})
                </span>
                <button
                  onClick={playOriginalSentenceClip}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition flex items-center gap-1"
                >
                  <i className="fa-solid fa-rotate-right" /> Nghe lại
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 mb-4 text-base font-extrabold text-slate-900 dark:text-white">
                "{fillMissingWords.prompt}"
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {fillMissingWords.options.map((opt, i) => {
                  let style = isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-500'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-500';

                  if (fillChecked) {
                    if (opt.toLowerCase() === fillMissingWords.missing.toLowerCase()) {
                      style = 'bg-emerald-600 border-emerald-500 text-white font-black';
                    } else if (opt === fillSelectedWord) {
                      style = 'bg-rose-600 border-rose-500 text-white';
                    }
                  } else if (fillSelectedWord === opt) {
                    style = 'bg-blue-600 border-blue-500 text-white shadow';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setFillSelectedWord(opt);
                        setFillChecked(true);
                      }}
                      className={`p-3 rounded-2xl border-2 text-xs font-bold text-left transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── RIGHT COLUMN: SYNCHRONIZED BILINGUAL SUBTITLES LIST (5 cols) ─── */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Subtitle Utility Bar */}
          <div
            className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Speed selection */}
            <div className="flex items-center gap-1">
              {[0.75, 1.0, 1.25].map((s) => (
                <button
                  key={s}
                  onClick={() => changeSpeed(s)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition ${
                    playbackSpeed === s
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Toggle utilities */}
            <div className="flex items-center gap-1.5">
              {/* Replay */}
              <button
                onClick={playOriginalSentenceClip}
                title="Tua lại câu này"
                className="p-1.5 px-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs"
              >
                <i className="fa-solid fa-rotate-right" />
              </button>

              {/* Toggle Vietnamese translation */}
              <button
                onClick={() => setShowVietnamese(!showVietnamese)}
                title={showVietnamese ? 'Ẩn dịch nghĩa' : 'Hiện dịch nghĩa'}
                className={`p-1.5 px-2 rounded-xl text-xs font-bold transition ${
                  showVietnamese
                    ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                文A
              </button>

              {/* Auto Pause */}
              <button
                onClick={() => setAutoPauseAfterSentence(!autoPauseAfterSentence)}
                title="Tự động dừng sau mỗi câu để bạn kịp đọc hoặc chép"
                className={`p-1.5 px-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  autoPauseAfterSentence
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <i className="fa-solid fa-pause" />
                <span className="text-[10px]">Tự Dừng</span>
              </button>

              {/* Subtitle Sync Offset Controls */}
              <div
                className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700"
                title="Chỉnh độ lệch phụ đề: Bấm [+] nếu phụ đề bị chậm, [-] nếu phụ đề bị nhanh, bấm chữ số để về 0s"
              >
                <button
                  onClick={() => setSubOffset((prev) => Math.max(-2, Math.round((prev - 0.2) * 10) / 10))}
                  className="w-5 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg text-xs font-bold transition hover:bg-white dark:hover:bg-slate-700"
                  title="Lùi phụ đề 0.2s (Chậm hơn)"
                >
                  -
                </button>
                <button
                  onClick={() => setSubOffset(0)}
                  className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1 ${
                    subOffset !== 0
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'
                  }`}
                  title="Bấm để đưa về mốc chuẩn (0.0s)"
                >
                  <i className="fa-solid fa-stopwatch text-[9px]" />
                  <span>{subOffset === 0 ? 'Đồng bộ' : `${subOffset > 0 ? '+' : ''}${subOffset.toFixed(1)}s`}</span>
                </button>
                <button
                  onClick={() => setSubOffset((prev) => Math.min(2, Math.round((prev + 0.2) * 10) / 10))}
                  className="w-5 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg text-xs font-bold transition hover:bg-white dark:hover:bg-slate-700"
                  title="Tiến phụ đề 0.2s (Sớm hơn nếu phụ đề bị chậm)"
                >
                  +
                </button>
              </div>

              {/* Font Size Toggle */}
              <button
                onClick={() =>
                  setFontSize((f) => (f === 'small' ? 'medium' : f === 'medium' ? 'large' : 'small'))
                }
                title="Cỡ chữ phụ đề"
                className="p-1.5 px-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-bold"
              >
                tT
              </button>
            </div>
          </div>

          {/* Tooltip notice */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-hand-pointer" /> Chạm vào từ bất kỳ để tra nghĩa & phát âm
            </span>
          </div>

          {/* Subtitles Scrollable List Container */}
          <div
            className={`p-3 rounded-3xl border max-h-[520px] overflow-y-auto space-y-2 scrollbar-hide ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {subtitles.map((sub, idx) => {
              const isActive = activeSubtitleIdx === idx;
              const words = sub.text.split(' ');

              return (
                <div
                  key={sub.id || idx}
                  ref={isActive ? activeSubRef : null}
                  onClick={() => {
                    setActiveSubtitleIdx(idx);
                    seekToTime(sub.startTime);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                    isActive
                      ? isLight
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                        : 'bg-blue-950/50 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : isLight
                      ? 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100'
                      : 'bg-slate-800/40 border-slate-800/80 hover:bg-slate-800'
                  }`}
                >
                  {/* Timestamp & Play Icon */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : isLight
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {formatTime(sub.startTime)}
                      </span>
                      {currentVideoShadowed[idx] && (
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <i className="fa-solid fa-check text-[9px]" /> Đã nói
                        </span>
                      )}
                    </div>

                    {isActive && currentTime >= (sub.startTime - 0.2) && currentTime <= ((sub.endTime || sub.startTime + 5) + 0.8) && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500 animate-pulse">
                        <i className="fa-solid fa-volume-high" /> Đang phát
                      </span>
                    )}
                  </div>

                  {/* Interactive Word Clickable Line */}
                  <div
                    className={`leading-relaxed font-bold ${
                      fontSize === 'small'
                        ? 'text-xs'
                        : fontSize === 'large'
                        ? 'text-base'
                        : 'text-sm'
                    } ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-300 font-extrabold'
                        : isLight
                        ? 'text-slate-800'
                        : 'text-slate-200'
                    }`}
                  >
                    {words.map((w, wIdx) => (
                      <span
                        key={wIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLookupWord(w);
                        }}
                        className="inline-block hover:underline hover:text-blue-500 cursor-pointer mr-1 transition-colors"
                      >
                        {w}
                      </span>
                    ))}
                  </div>

                  {/* Vietnamese Subtitle */}
                  {showVietnamese && sub.vietnamese && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                      {sub.vietnamese}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tra từ Modal */}
      {lookupWord && (
        <WordLookupModal
          word={lookupWord}
          onClose={() => setLookupWord(null)}
          theme={theme}
        />
      )}
    </div>
  );
}
