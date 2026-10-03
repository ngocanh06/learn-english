import React, { useState } from 'react';
import {
  CEFR_LEVELS,
  CERTIFICATIONS,
  STUDY_TIME_OPTIONS,
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
  const [cert, setCert] = useState(initialProfile?.certification || 'ielts');
  const [score, setScore] = useState(initialProfile?.targetScore || '7.0');
  const [level, setLevel] = useState(initialProfile?.currentLevel || 'B1');
  const [studyMin, setStudyMin] = useState(initialProfile?.dailyGoalMin || 45);
  const [examDate, setExamDate] = useState(initialProfile?.examDate || '');

  if (!isOpen) return null;

  const activeCertObj = CERTIFICATIONS.find((c) => c.id === cert) || CERTIFICATIONS[1];

  const mixPreview = calculateLearningMix({
    currentLevel: level,
    certification: cert,
    examDate: examDate || null,
  });

  const handleFinish = () => {
    const updatedProfile = {
      ...initialProfile,
      learningGoal: cert === 'none' ? 'general' : 'certification',
      currentLevel: level,
      certification: cert,
      targetScore: score,
      examDate: examDate || null,
      dailyGoalMin: studyMin,
      studyDaysPerWeek: 6,
      onboardingCompleted: true,
      lastUpdated: new Date().toISOString(),
    };
    onSaveProfile(updatedProfile);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
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
                {step === 1 ? 'Bước 1: Chọn Mục Tiêu' : 'Bước 2: Trình Độ & Thời Gian'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-medium">Cá nhân hóa hệ thống học</span>
            </div>
            <h2 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
              {step === 1
                ? 'Bạn đang muốn thi chứng chỉ nào hoặc học theo hướng nào?'
                : 'Trình độ hiện tại và thời gian bạn có thể học?'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Đóng"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* ─── STEP 1: CHỌN CHỨNG CHỈ / HƯỚNG HỌC ─── */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lựa chọn này sẽ tự động định hình lại toàn bộ Lịch học và Lộ trình của bạn:
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {CERTIFICATIONS.map((c) => {
                  const isSelected = cert === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setCert(c.id);
                        setScore(c.defaultScore);
                      }}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-xs'
                          : isLight
                          ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <i className={`fa-solid ${c.icon}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                              {c.name}
                            </h3>
                            <span className={`px-2 py-0.2 rounded text-[10px] font-bold border ${c.badgeColor}`}>
                              {c.shortName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {c.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 ml-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <i className="fa-solid fa-check text-[10px]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Target Score Selector if applicable */}
              {cert !== 'none' && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Điểm số mục tiêu:
                  </label>
                  <select
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className={`p-2 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
              )}
            </div>
          )}

          {/* ─── STEP 2: TRÌNH ĐỘ & THỜI LƯỢNG HỌC ─── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
                  1. Trình độ tiếng Anh hiện tại của bạn:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CEFR_LEVELS.map((lvl) => {
                    const isSelected = level === lvl.code;
                    return (
                      <div
                        key={lvl.code}
                        onClick={() => setLevel(lvl.code)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30'
                            : isLight
                            ? 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                            : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {lvl.code}
                          </span>
                          <span className="text-xs font-bold truncate">{lvl.name.split('(')[0]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    2. Thời lượng học mỗi ngày:
                  </label>
                  <select
                    value={studyMin}
                    onChange={(e) => setStudyMin(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
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
                    3. Ngày dự kiến thi (tùy chọn):
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className={`w-full p-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Mixing Ratio Preview */}
              <div className={`p-3.5 rounded-xl border space-y-2 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Phân bổ kế hoạch học tập:</span>
                  <span className="text-blue-600 dark:text-blue-400">{mixPreview.phaseName}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${mixPreview.foundationPercent}%` }}
                    title={`Nền tảng: ${mixPreview.foundationPercent}%`}
                  />
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${mixPreview.certificationPercent}%` }}
                    title={`Luyện thi: ${mixPreview.certificationPercent}%`}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Nền tảng: {mixPreview.foundationPercent}%</span>
                  <span>Luyện thi ({cert.toUpperCase()}): {mixPreview.certificationPercent}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
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
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                handleFinish();
              }
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{step === 2 ? 'Khởi Tạo Lộ Trình Của Tôi 🚀' : 'Tiếp tục'}</span>
            <i className={`fa-solid ${step === 2 ? 'fa-check' : 'fa-arrow-right'} text-xs`} />
          </button>
        </div>
      </div>
    </div>
  );
}
