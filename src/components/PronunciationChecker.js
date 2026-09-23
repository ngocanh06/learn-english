import React, { useState, useEffect, useRef } from 'react';
import { createOptimizedAudioStream, getOptimalAudioMimeType } from '../utils/audioRecorderHelper';

// Helper: Calculate Levenshtein distance similarity (0 to 100)
function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  const s2 = str2.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');

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
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = Math.round(((maxLen - distance) / maxLen) * 100);
  return Math.max(0, similarity);
}

export default function PronunciationChecker({ targetWord, pronunciation, theme }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'recording' | 'success' | 'partial' | 'error' | 'unsupported'
  const [score, setScore] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const streamCleanupRef = useRef(null);

  const isLight = theme === 'light';

  // Check speech recognition support
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    // Reset state when target word changes
    setIsRecording(false);
    setTranscript('');
    setStatus('idle');
    setScore(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (streamCleanupRef.current) {
      streamCleanupRef.current();
      streamCleanupRef.current = null;
    }
  }, [targetWord]);

  const startRecording = async () => {
    if (!SpeechRecognition && !navigator.mediaDevices) {
      setStatus('unsupported');
      return;
    }

    setTranscript('');
    setStatus('recording');
    setScore(null);
    audioChunksRef.current = [];

    // 1. Setup MediaRecorder for voice playback with Studio-Quality Constraints & Compressor
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const { stream, cleanup } = await createOptimizedAudioStream();
        streamCleanupRef.current = cleanup;

        const mimeType = getOptimalAudioMimeType();

        const mediaRecorder = mimeType
          ? new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 128000 })
          : new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          if (streamCleanupRef.current) {
            streamCleanupRef.current();
            streamCleanupRef.current = null;
          }
        };

        mediaRecorder.start();
      } catch (err) {
        console.warn('MediaRecorder error or mic permission denied:', err);
      }
    }

    // 2. Setup Speech Recognition
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event) => {
          const spoken = event.results[0][0].transcript;
          setTranscript(spoken);

          // Calculate similarity score
          const simScore = calculateSimilarity(spoken, targetWord);
          setScore(simScore);

          if (simScore >= 80) {
            setStatus('success');
          } else if (simScore >= 50) {
            setStatus('partial');
          } else {
            setStatus('error');
          }
          stopRecording();
        };

        recognition.onerror = (event) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'no-speech') {
            setStatus('error');
          } else if (event.error === 'not-allowed') {
            setStatus('unsupported');
          }
          stopRecording();
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        stopRecording();
      }
    } else {
      // If speech recognition not available, just record audio for 4 seconds
      setIsRecording(true);
      setTimeout(() => {
        stopRecording();
      }, 4000);
    }
  };

  const stopRecording = () => {
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

  const playRecordedAudio = () => {
    if (!audioUrl) return;
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    const audio = new Audio(audioUrl);
    audioPlayerRef.current = audio;
    setIsPlayingAudio(true);
    audio.play();
    audio.onended = () => setIsPlayingAudio(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full rounded-2xl p-4 border transition-all mt-3 ${
        isLight
          ? 'bg-slate-50 border-slate-200 text-slate-900'
          : 'bg-slate-800/90 border-slate-700 text-white'
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-microphone text-indigo-500 text-sm" />
          <span className="text-xs font-bold uppercase tracking-wider">Luyện phát âm</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold animate-pulse shadow"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Đang nghe... (Bấm để dừng)
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow transition hover:scale-102"
            >
              <i className="fa-solid fa-microphone" />
              Nói phát âm
            </button>
          )}

          {audioUrl && !isRecording && (
            <button
              onClick={playRecordedAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                isPlayingAudio
                  ? 'bg-amber-500 text-slate-900 border-amber-400'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
              }`}
              title="Nghe lại giọng ghi âm của bạn"
            >
              <i className={`fa-solid ${isPlayingAudio ? 'fa-square' : 'fa-play'}`} />
              Nghe lại giọng bạn
            </button>
          )}
        </div>
      </div>

      {/* Result Display */}
      {status === 'recording' && (
        <div className="mt-3 text-xs text-indigo-400 font-semibold animate-pulse flex items-center gap-2">
          <i className="fa-solid fa-wave-square" /> Hãy nói rõ ràng từ "{targetWord}"...
        </div>
      )}

      {status !== 'idle' && status !== 'recording' && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-black">
              {status === 'success' && (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  <i className="fa-solid fa-circle-check" /> Xuất sắc! ({score}%)
                </span>
              )}
              {status === 'partial' && (
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  <i className="fa-solid fa-triangle-exclamation" /> Khá tốt! ({score}%)
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 bg-rose-500/15 px-2.5 py-1 rounded-lg border border-rose-500/30">
                  <i className="fa-solid fa-circle-xmark" /> Chưa chuẩn ({score || 0}%)
                </span>
              )}
              {status === 'unsupported' && (
                <span className="text-slate-400 font-medium">
                  Trình duyệt không hỗ trợ nhận diện giọng nói.
                </span>
              )}
            </div>

            {transcript && (
              <span className="text-[11px] text-slate-400 font-mono">
                Máy nghe: <strong className="text-indigo-400">"{transcript}"</strong>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
