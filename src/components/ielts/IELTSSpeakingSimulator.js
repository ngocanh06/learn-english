import React, { useState, useEffect, useRef } from 'react';
import { IELTS_SPEAKING_INTERVIEWS } from '../../data/ieltsPracticeData';

export default function IELTSSpeakingSimulator({ theme = 'dark' }) {
  const isLight = theme === 'light';

  const interview = IELTS_SPEAKING_INTERVIEWS[0];

  // Active Part: 'part1' | 'part2' | 'part3'
  const [activePart, setActivePart] = useState('part1');

  // Part 1 Question index
  const [part1Index, setPart1Index] = useState(0);
  const currentPart1Q = interview.part1.questions[part1Index];

  // Part 2 state: 'idle' | 'prep' (60s) | 'speaking' (120s) | 'done'
  const [part2Phase, setPart2Phase] = useState('idle');
  const [part2Timer, setPart2Timer] = useState(60);
  const [userNotes, setUserNotes] = useState('');

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Part 2 Timer countdown
  useEffect(() => {
    let interval = null;
    if (part2Phase === 'prep') {
      interval = setInterval(() => {
        setPart2Timer((prev) => {
          if (prev <= 1) {
            // Auto transition to speaking
            setPart2Phase('speaking');
            startRecording();
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (part2Phase === 'speaking') {
      interval = setInterval(() => {
        setPart2Timer((prev) => {
          if (prev <= 1) {
            setPart2Phase('done');
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [part2Phase]);

  // General recording timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Start microphone recording
  const startRecording = async () => {
    try {
      setRecordedAudioUrl(null);
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        // Stop all tracks to release mic
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('Không thể truy cập microphone. Vui lòng cho phép quyền truy cập micro trong trình duyệt để luyện nói.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Text-to-Speech Speak question
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB'; // British Accent for IELTS
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <div
        className={`p-5 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-microphone-lines" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-500/15 text-purple-500">
                IELTS Speaking Simulator
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Chuẩn Giám Khảo IDP / British Council
              </span>
            </div>
            <h2
              className={`text-base md:text-lg font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {interview.title}
            </h2>
          </div>
        </div>

        {/* Part Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
          {[
            { id: 'part1', label: 'Part 1: Phỏng Vấn' },
            { id: 'part2', label: 'Part 2: Cue Card' },
            { id: 'part3', label: 'Part 3: Thảo Luận' },
          ].map((pt) => (
            <button
              key={pt.id}
              onClick={() => {
                setActivePart(pt.id);
                setRecordedAudioUrl(null);
                if (isRecording) stopRecording();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePart === pt.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── PART 1: INTERACTIVE QUESTION ANSWERING ─────────────────── */}
      {activePart === 'part1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Examiner Question & Audio Controls (7 cols) */}
          <div
            className={`lg:col-span-7 p-6 rounded-3xl border space-y-6 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Câu Hỏi {part1Index + 1} / {interview.part1.questions.length}
              </span>
              <button
                onClick={() => speakText(currentPart1Q.question)}
                className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-volume-high" />
                <span>Giám Khảo Đọc Câu Hỏi</span>
              </button>
            </div>

            {/* Question Card */}
            <div
              className={`p-6 rounded-2xl border text-center space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-750'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto text-xl">
                <i className="fa-solid fa-user-tie" />
              </div>
              <h3
                className={`text-lg md:text-xl font-bold leading-snug ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                "{currentPart1Q.question}"
              </h3>
              <p className="text-xs text-amber-500 font-medium">
                💡 {currentPart1Q.tips}
              </p>
            </div>

            {/* Microphone Recording Action Area */}
            <div className="p-6 rounded-2xl bg-black/20 border border-slate-800 text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    title="Bắt đầu ghi âm câu trả lời"
                  >
                    <i className="fa-solid fa-microphone" />
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="w-16 h-16 rounded-full bg-slate-800 text-rose-500 border-2 border-rose-500 flex items-center justify-center text-2xl shadow-lg animate-pulse cursor-pointer"
                    title="Dừng ghi âm"
                  >
                    <i className="fa-solid fa-stop" />
                  </button>
                )}
              </div>

              <div className="text-xs font-mono font-bold text-slate-400">
                {isRecording ? (
                  <span className="text-rose-500">Đang thu âm... ({recordingSeconds}s)</span>
                ) : (
                  <span>Nhấn vào micro để trả lời (khuyên dùng 20 - 30 giây cho mỗi câu Part 1)</span>
                )}
              </div>

              {/* Playback recorded audio */}
              {recordedAudioUrl && (
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col items-center gap-2">
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check" />
                    <span>Bản thu âm của bạn (Nghe lại để tự sửa lỗi phát âm):</span>
                  </span>
                  <audio controls src={recordedAudioUrl} className="w-full max-w-sm h-10" />
                </div>
              )}
            </div>

            {/* Navigation Next/Prev Question */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={part1Index === 0}
                onClick={() => {
                  setPart1Index((p) => p - 1);
                  setRecordedAudioUrl(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold border disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Câu trước
              </button>
              <button
                disabled={part1Index === interview.part1.questions.length - 1}
                onClick={() => {
                  setPart1Index((p) => p + 1);
                  setRecordedAudioUrl(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white disabled:opacity-40 hover:bg-purple-700 transition-colors"
              >
                Câu kế tiếp
              </button>
            </div>
          </div>

          {/* Right: Model Answer Band 7.5+ (5 cols) */}
          <div
            className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                Câu Trả Lời Mẫu Band 7.5+
              </span>
              <button
                onClick={() => speakText(currentPart1Q.modelAnswer)}
                className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
              >
                <i className="fa-solid fa-play text-[10px]" />
                <span>Nghe mẫu</span>
              </button>
            </div>

            <p
              className={`text-xs md:text-sm leading-relaxed ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              "{currentPart1Q.modelAnswer}"
            </p>

            <div
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-750'
              }`}
            >
              <div className="font-bold text-amber-500 uppercase text-[10px]">
                Công thức phản xạ AREA ứng dụng ở câu này:
              </div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                <li><strong>Answer:</strong> Trả lời thẳng vào câu hỏi ngay ở câu 1.</li>
                <li><strong>Reason:</strong> Đưa ra 1 lý do giải thích tại sao.</li>
                <li><strong>Example/Alternative:</strong> Nêu dự định tương lai hoặc mở rộng góc nhìn.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─── PART 2: CUE CARD SIMULATION (1 MIN PREP -> 2 MIN SPEAK) ─── */}
      {activePart === 'part2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Cue Card & Prompts & Timers (7 cols) */}
          <div
            className={`lg:col-span-7 p-6 rounded-3xl border space-y-5 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Cue Card Frame */}
            <div
              className={`p-6 rounded-2xl border-2 space-y-4 ${
                isLight
                  ? 'bg-amber-50/40 border-amber-300 text-slate-900'
                  : 'bg-amber-950/20 border-amber-600/40 text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Candidate Task Card (Part 2)
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  1 min prep • 2 min speech
                </span>
              </div>

              <h3 className="text-base md:text-lg font-black">
                {interview.part2.topic}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-400">You should say:</div>
                {interview.part2.prompts.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-dot text-[8px] text-amber-500" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timer & Phase Controller */}
            <div className="p-5 rounded-2xl bg-black/20 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black font-mono text-purple-400">
                  {formatTimer(part2Timer)}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-300">
                    {part2Phase === 'idle'
                      ? 'Chưa bắt đầu'
                      : part2Phase === 'prep'
                      ? '⏱️ Đang chuẩn bị (Take Notes)'
                      : part2Phase === 'speaking'
                      ? '🎙️ Đang nói (Ghi âm)'
                      : 'Hoàn thành bài nói'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {part2Phase === 'prep'
                      ? 'Hết 60s hệ thống sẽ tự động bật micro'
                      : part2Phase === 'speaking'
                      ? 'Hãy nói liên tục đến khi hết 2 phút'
                      : 'Bấm nút bên phải để bắt đầu'}
                  </div>
                </div>
              </div>

              {part2Phase === 'idle' && (
                <button
                  onClick={() => {
                    setPart2Phase('prep');
                    setPart2Timer(60);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-play text-xs" />
                  <span>Bắt Đầu 1 Phút Chuẩn Bị</span>
                </button>
              )}

              {part2Phase === 'prep' && (
                <button
                  onClick={() => {
                    setPart2Phase('speaking');
                    setPart2Timer(120);
                    startRecording();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-microphone text-xs" />
                  <span>Nói Ngay (Bỏ qua 1p)</span>
                </button>
              )}

              {part2Phase === 'speaking' && (
                <button
                  onClick={() => {
                    setPart2Phase('done');
                    stopRecording();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-stop text-xs" />
                  <span>Dừng Bài Nói</span>
                </button>
              )}

              {part2Phase === 'done' && (
                <button
                  onClick={() => {
                    setPart2Phase('idle');
                    setPart2Timer(60);
                    setRecordedAudioUrl(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-right text-xs" />
                  <span>Luyện Tập Lại</span>
                </button>
              )}
            </div>

            {/* Notepad area for 1 minute prep */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ô Nháp Dàn Ý (Take Notes - Giống tờ giấy nháp phòng thi)
              </span>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Ghi chú nhanh 4-5 từ khóa chính trong 1 phút chuẩn bị (Không viết cả câu dài)..."
                className={`w-full h-28 p-3 rounded-2xl text-xs font-mono border outline-none resize-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500'
                    : 'bg-slate-850 border-slate-750 text-white focus:border-purple-500'
                }`}
              />
            </div>

            {/* Playback recorded audio */}
            {recordedAudioUrl && (
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col items-center gap-2">
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check" />
                  <span>Nghe lại bài nói Part 2 hoàn chỉnh của bạn:</span>
                </span>
                <audio controls src={recordedAudioUrl} className="w-full max-w-md h-10" />
              </div>
            )}
          </div>

          {/* Right: Model 2-minute Speech Transcript (5 cols) */}
          <div
            className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 max-h-[600px] overflow-y-auto ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                Bài Mẫu 2 Phút Band 7.5+
              </span>
              <button
                onClick={() => speakText(interview.part2.modelTranscript)}
                className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
              >
                <i className="fa-solid fa-play text-[10px]" />
                <span>Nghe đọc bài mẫu</span>
              </button>
            </div>

            <div
              className={`prose max-w-none text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              {interview.part2.modelTranscript}
            </div>

            {/* Sample Notes */}
            <div
              className={`p-3.5 rounded-xl border text-xs font-mono ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-850 border-slate-750 text-slate-300'
              }`}
            >
              <div className="font-bold text-amber-500 uppercase text-[10px] mb-1">
                Gợi Ý Dàn Ý 1 Phút Của Người Bản Xứ:
              </div>
              <pre className="whitespace-pre-wrap font-sans text-[11px]">
                {interview.part2.notesSample}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ─── PART 3: IN-DEPTH DISCUSSION ────────────────────────────── */}
      {activePart === 'part3' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border space-y-6 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                Part 3: Discussion on Society, Resilience &amp; Global Challenges
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Giám khảo sẽ hỏi các câu hỏi phân tích đa chiều. Trả lời từ 45 - 60 giây mỗi câu với các lý lẽ và dẫn chứng xã hội.
              </p>
            </div>

            <div className="space-y-4">
              {interview.part3.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-750'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-purple-400">
                      Câu hỏi {idx + 1}:
                    </div>
                    <button
                      onClick={() => speakText(q.question)}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <i className="fa-solid fa-volume-high" />
                      <span>Nghe</span>
                    </button>
                  </div>

                  <h4
                    className={`font-bold text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    "{q.question}"
                  </h4>

                  <div className="pt-2 border-t border-slate-700/50">
                    <div className="text-[10px] font-bold uppercase text-emerald-400 mb-1">
                      Gợi ý trả lời Band 8.0:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "{q.modelAnswer}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
