import React, { useState } from 'react';
import {
  LEARNING_GOALS,
  CEFR_LEVELS,
  CERTIFICATIONS,
  STUDY_TIME_OPTIONS,
  STUDY_DAYS_OPTIONS,
} from '../config/learningCertifications';
import { calculateLearningMix } from '../utils/learningPlanEngine';

export default function PersonalizedOnboardingModal({
  isOpen,
  onClose,
  initialProfile,
  onSaveProfile,
  onTakePlacementTest,
  theme = 'dark',
}) {
  const isLight = theme === 'light';

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(initialProfile?.learningGoal || 'certification');
  const [level, setLevel] = useState(initialProfile?.currentLevel || 'B1');
  const [cert, setCert] = useState(initialProfile?.certification || 'ielts');
  const [score, setScore] = useState(initialProfile?.targetScore || '7.0');
  const [examDate, setExamDate] = useState(initialProfile?.examDate || '');
  const [studyMin, setStudyMin] = useState(initialProfile?.dailyGoalMin || 45);
  const [studyDays, setStudyDays] = useState(initialProfile?.studyDaysPerWeek || 6);

  if (!isOpen) return null;

  const activeCertObj = CERTIFICATIONS.find((c) => c.id === cert) || CERTIFICATIONS[1];

  // Dynamic preview calculation
  const mixPreview = calculateLearningMix({
    currentLevel: level,
    certification: cert,
    targetScore: score,
    examDate: examDate || null,
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final step -> Save
      const updatedProfile = {
        ...initialProfile,
        learningGoal: goal,
        currentLevel: level,
        certification: cert,
        targetScore: score,
        examDate: examDate || null,
        dailyGoalMin: studyMin,
        studyDaysPerWeek: studyDays,
        onboardingCompleted: true,
        lastUpdated: new Date().toISOString(),
      };
      onSaveProfile(updatedProfile);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border shadow-xl overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Bước {step} / 4
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-medium">Thiết lập Lộ Trình Học Cá Nhân Hóa</span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
              {step === 1 && 'Mục tiêu học tiếng Anh của bạn là gì?'}
              {step === 2 && 'Trình độ tiếng Anh hiện tại của bạn?'}
              {step === 3 && 'Lựa chọn Chứng Chỉ & Điểm Mục Tiêu'}
              {step === 4 && 'Thời gian học & Tần suất hàng tuần'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Đóng"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* ─── STEP 1: GOAL ─── */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LEARNING_GOALS.map((g) => {
                const isSelected = goal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100 shadow-xs'
                        : isLight
                        ? 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                        : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <i className={`fa-solid ${g.icon}`} />
                      </div>
                      <h3 className="text-sm font-bold">{g.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {g.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── STEP 2: CURRENT LEVEL ─── */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2.5">
                {CEFR_LEVELS.map((lvl) => {
                  const isSelected = level === lvl.code;
                  return (
                    <div
                      key={lvl.code}
                      onClick={() => setLevel(lvl.code)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs'
                          : isLight
                          ? 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-black text-xs ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {lvl.code}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold">{lvl.name}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {lvl.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {lvl.vocabTarget}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Placement Test Option */}
              <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-slate-700/60'
              }`}>
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1.5">
                    <i className="fa-solid fa-clipboard-question text-blue-600" />
                    Chưa chắc chắn về trình độ của mình?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Làm bài kiểm tra đầu vào 20 câu để xác định chính xác trình độ CEFR.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onTakePlacementTest) onTakePlacementTest();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shrink-0"
                >
                  Làm Test ngay
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 3: CERTIFICATION & TARGET SCORE ─── */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
                  1. Chọn kỳ thi chứng chỉ bạn hướng tới:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CERTIFICATIONS.map((c) => {
                    const isSelected = cert === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setCert(c.id);
                          setScore(c.defaultScore);
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition text-left ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20'
                            : isLight
                            ? 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                            : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <i className={`fa-solid ${c.icon} text-xs ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-xs font-bold truncate">{c.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2">
                          {c.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Target Score & Deadline */}
              {cert !== 'none' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      2. Điểm số mục tiêu:
                    </label>
                    <select
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900'
                          : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    >
                      {activeCertObj.targetScores.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      3. Ngày dự kiến thi (Không bắt buộc):
                    </label>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900'
                          : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── STEP 4: TIME AVAILABILITY & PLAN PREVIEW ─── */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Thời lượng học mỗi ngày:
                  </label>
                  <select
                    value={studyMin}
                    onChange={(e) => setStudyMin(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900'
                        : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  >
                    {STUDY_TIME_OPTIONS.map((t) => (
                      <option key={t.minutes} value={t.minutes}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Số ngày học mỗi tuần:
                  </label>
                  <select
                    value={studyDays}
                    onChange={(e) => setStudyDays(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900'
                        : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  >
                    {STUDY_DAYS_OPTIONS.map((d) => (
                      <option key={d.days} value={d.days}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mixing Engine Summary Preview Card */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <i className="fa-solid fa-sliders text-blue-600" />
                    Tỷ Trọng Lộ Trình Được Tính Toán:
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {mixPreview.phaseName}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Nền tảng (Foundation): {mixPreview.foundationPercent}%</span>
                    <span>Luyện thi ({cert.toUpperCase()}): {mixPreview.certificationPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${mixPreview.foundationPercent}%` }}
                      title={`Nền tảng: ${mixPreview.foundationPercent}%`}
                    />
                    <div
                      className="h-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${mixPreview.certificationPercent}%` }}
                      title={`Chứng chỉ: ${mixPreview.certificationPercent}%`}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {mixPreview.description} Lịch học hàng ngày sẽ tự động phân bổ bài tập ngữ pháp, luyện nghe và luyện đề theo đúng tỷ lệ này.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isLight
                  ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Quay lại
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1.5"
          >
            <span>{step === 4 ? 'Tạo Lộ Trình & Bắt Đầu Học' : 'Tiếp tục'}</span>
            <i className={`fa-solid ${step === 4 ? 'fa-rocket' : 'fa-arrow-right'} text-xs`} />
          </button>
        </div>
      </div>
    </div>
  );
}
