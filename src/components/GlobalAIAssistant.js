import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';
import {
  getContextSuggestions,
  generateAIAnswer,
} from '../utils/aiAssistantEngine';

export default function GlobalAIAssistant({ activeNav = 'grammar', navParams = {}, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Persistence for chat messages
  const [messages, setMessages] = useUserStorage('global_ai_assistant_chats_v2', [
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Xin chào bạn! Mình là **Trợ Lý Học Tập AI**. Mình luôn ở đây 24/7 để cùng bạn giải đáp mọi thắc mắc về ngữ pháp, phân tích câu, dịch nghĩa, chỉ ra bẫy đề thi hay chia sẻ mẹo học nhanh. Bạn có câu hỏi nào trong bài học này không?',
      time: 'Vừa xong',
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [currentContextLesson, setCurrentContextLesson] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Listen for custom event from any component to open AI Assistant with specific context
  useEffect(() => {
    const handleOpenAssistant = (e) => {
      setIsOpen(true);
      if (e.detail?.lesson) {
        setCurrentContextLesson(e.detail.lesson);
      } else if (e.detail?.lessonTitle) {
        setCurrentContextLesson({ title: e.detail.lessonTitle, id: e.detail.lessonId });
      }
    };

    window.addEventListener('open-ai-assistant', handleOpenAssistant);
    return () => {
      window.removeEventListener('open-ai-assistant', handleOpenAssistant);
    };
  }, []);

  // Compute suggestions based on current screen & context
  const suggestions = useMemo(() => {
    return getContextSuggestions(activeNav, currentContextLesson);
  }, [activeNav, currentContextLesson]);

  // Handle sending a message
  const handleSend = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isThinking) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      const answer = generateAIAnswer(query, {
        activeNav,
        lessonTitle: currentContextLesson?.title || (activeNav === 'grammar' ? 'Mạo từ Articles' : ''),
        lessonId: currentContextLesson?.id || '1',
      });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: answer,
        time: 'Vừa xong',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 400);
  };

  // Text-to-speech for reading AI response aloud
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown before speaking
    const cleanText = text.replace(/[*#_`•]/g, '').replace(/\[.*?\]/g, '');
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = 'vi-VN';
    u.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        (v.name.includes('HoaiMy') || v.name.includes('NamMinh') || v.name.includes('Google')) &&
        v.lang.includes('vi')
    );
    if (naturalVoice) u.voice = naturalVoice;

    window.speechSynthesis.speak(u);
  };

  const clearChat = () => {
    if (window.confirm('Bạn có muốn xóa toàn bộ lịch sử trò chuyện không?')) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'ai',
          text: 'Lịch sử đã được làm mới! Mình đã sẵn sàng hỗ trợ bạn câu hỏi tiếp theo.',
          time: 'Vừa xong',
        },
      ]);
    }
  };

  // Context label helper
  const contextLabel = useMemo(() => {
    if (activeNav === 'grammar') {
      return currentContextLesson
        ? `Ngữ pháp: ${currentContextLesson.title}`
        : 'Ngữ pháp: 1. Articles (Mạo từ A, An, The)';
    }
    if (activeNav === 'vocabulary') return 'Chuyên mục: Từ Vựng & Flashcard';
    if (activeNav === 'reading') return 'Chuyên mục: Đọc Hiểu Comprehension';
    if (activeNav === 'writing') return 'Chuyên mục: Dịch Câu & Viết Studio';
    if (activeNav === 'video-hub') return 'Chuyên mục: Video Luyện Nghe & Shadowing';
    return 'Hệ Thống Tiếng Anh Toàn Diện';
  }, [activeNav, currentContextLesson]);

  return (
    <>
      {/* ─── 1. FLOATING ACTION BUTTON (ALWAYS VISIBLE BOTTOM-RIGHT) ─── */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end font-sans select-none">
        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-11 w-11 sm:h-11 sm:w-auto sm:px-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            isOpen
              ? 'bg-slate-700 hover:bg-slate-800 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title={isOpen ? 'Đóng hỏi đáp' : 'Hỏi đáp bài học'}
        >
          <i
            className={`fa-solid ${
              isOpen ? 'fa-xmark text-sm' : 'fa-comment-dots text-sm'
            }`}
          />
          <span className="font-semibold text-xs tracking-wide hidden sm:inline">
            {isOpen ? 'Đóng' : 'Hỏi đáp'}
          </span>
        </button>
      </div>

      {/* ─── 2. FLOATING CHAT MODAL / DIALOG (WHEN OPEN) ─── */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[440px] max-h-[80vh] h-[600px] rounded-xl border shadow-lg flex flex-col overflow-hidden transition-all duration-200 font-sans ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          {/* Modal Header */}
          <div className="p-3.5 px-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-slate-50 dark:bg-slate-850">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <i className="fa-solid fa-graduation-cap text-xs" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs md:text-sm text-slate-900 dark:text-white truncate">
                    Trợ lý học tập
                  </h3>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Sẵn sàng
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {contextLabel}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Làm mới cuộc trò chuyện"
              >
                <i className="fa-solid fa-rotate-left text-xs" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Đóng"
              >
                <i className="fa-solid fa-xmark text-sm font-bold" />
              </button>
            </div>
          </div>

          {/* Quick Context Prompt Suggestions */}
          {suggestions && suggestions.length > 0 && (
            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 shrink-0 overflow-x-auto no-scrollbar flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 flex items-center gap-1">
                <i className="fa-solid fa-bolt text-amber-500" /> Gợi ý:
              </span>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s.query)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 border transition-all cursor-pointer whitespace-nowrap ${
                    isLight
                      ? 'bg-white hover:bg-blue-50 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 shadow-2xs'
                      : 'bg-slate-800 hover:bg-blue-950/50 border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-blue-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <i className="fa-solid fa-robot text-xs" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : isLight
                      ? 'bg-slate-100/90 border border-slate-200/80 text-slate-800 rounded-tl-none'
                      : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed select-text">
                    {msg.text}
                  </div>

                  {/* AI Response Tools: TTS & Copy */}
                  {msg.sender === 'ai' && (
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] text-slate-400">
                      <span>{msg.time}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="hover:text-blue-500 flex items-center gap-1 transition cursor-pointer"
                          title="Đọc câu trả lời"
                        >
                          <i className="fa-solid fa-volume-high" /> Nghe
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text);
                            alert('Đã sao chép câu trả lời vào bộ nhớ tạm!');
                          }}
                          className="hover:text-blue-500 flex items-center gap-1 transition cursor-pointer"
                          title="Sao chép câu trả lời"
                        >
                          <i className="fa-regular fa-copy" /> Sao chép
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-robot text-xs" />
                </div>
                <div
                  className={`p-3 px-4 rounded-2xl rounded-tl-none border text-xs flex items-center gap-2 ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-150" />
                  <span className="text-slate-400 font-medium ml-1">AI đang suy nghĩ và tra cứu...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 px-4 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Hỏi bất kỳ điều gì về ${contextLabel.split(':')[0]}...`}
                className={`flex-1 px-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                    : 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                }`}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking}
                className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md transition hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Gửi câu hỏi"
              >
                <i className="fa-solid fa-paper-plane text-xs" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 text-center mt-1.5">
              Hỗ trợ giải đáp ngữ pháp, tra cứu từ vựng, mẹo thi TOEIC & sửa lỗi câu 24/7
            </p>
          </div>
        </div>
      )}
    </>
  );
}
