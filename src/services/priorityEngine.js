/**
 * Priority Engine
 * Synthesizes: Gap Size (40%) + Exam Weight (30%) + Target Bottleneck (20%) + Deadline Urgency (10%)
 * Outputs: Priority Tiers (Critical, High, Medium, Low, Maintenance)
 * and calculates dynamic time percentage budget per skill.
 */

export function calculateSkillPriorities(skillGapAnalysis, userProfile, deadlineInfo = {}) {
  const { skillGaps, blueprint } = skillGapAnalysis;
  const certId = blueprint.certificationId?.toLowerCase() || 'toeic';

  // Exam weights for each skill
  let examWeights = {
    listening: 0.25,
    reading: 0.25,
    writing: 0.25,
    speaking: 0.25,
    grammar: 0.15,
    vocabulary: 0.15,
    pronunciation: 0.1,
  };

  if (certId === 'toeic') {
    // TOEIC 2 skills heavily emphasizes Listening & Reading, supported by Grammar & Vocab
    examWeights = {
      listening: 0.40,
      reading: 0.40,
      grammar: 0.20,
      vocabulary: 0.20,
      speaking: 0.05,
      writing: 0.05,
      pronunciation: 0.05,
    };
  } else if (certId === 'ielts') {
    examWeights = {
      listening: 0.25,
      reading: 0.25,
      writing: 0.25,
      speaking: 0.25,
      grammar: 0.15,
      vocabulary: 0.20,
      pronunciation: 0.15,
    };
  }

  // Deadline urgency multiplier
  // If exam date is within 30 days: urgency is high; 30-90 days: medium; >90 days: standard
  const daysRemaining = deadlineInfo.daysRemaining ?? 120;
  let deadlineMultiplier = 1.0;
  if (daysRemaining <= 30) deadlineMultiplier = 1.35;
  else if (daysRemaining <= 60) deadlineMultiplier = 1.2;

  const priorityResults = {};
  let totalPriorityScore = 0;

  Object.keys(skillGaps).forEach((skill) => {
    const item = skillGaps[skill];
    const gap = item.gap; // e.g. 0.0 to 3.0
    const examWeight = examWeights[skill] || 0.1;
    const isTargetPriority = item.isTargetPriority ? 1.5 : 1.0;

    // Raw Priority Score calculation
    // Gap size is primary driver. If gap == 0, priority drops into Maintenance tier.
    let priorityScore = 0;
    let tier = 'Maintenance';
    let rationale = '';

    if (gap > 0) {
      priorityScore = (gap * 40) + (examWeight * 40) + (isTargetPriority * 15);
      if (gap >= 1.5) {
        priorityScore *= 1.45; // Critical bottleneck boost
      }
      if (deadlineMultiplier > 1.0 && (skill === 'listening' || skill === 'reading' || skill === 'writing' || skill === 'speaking')) {
        priorityScore *= deadlineMultiplier;
      }

      if (gap >= 1.5 || (gap >= 1.0 && examWeight >= 0.25)) {
        tier = 'Critical';
        rationale = `Lỗ hổng lớn (-${gap} bậc CEFR) ở kỹ năng trọng tâm thi cử. Cần dành ưu tiên tối đa thời gian luyện tập mỗi ngày.`;
      } else if (gap >= 0.75 || isTargetPriority) {
        tier = 'High';
        rationale = `Kỹ năng có chênh lệch cần cải thiện tích cực để chạm chuẩn điểm mục tiêu.`;
      } else if (gap >= 0.25) {
        tier = 'Medium';
        rationale = `Đang tiệm cận yêu cầu. Cần luyện tập củng cố định kỳ kết hợp chiến thuật giải đề.`;
      } else {
        tier = 'Low';
        rationale = `Chênh lệch nhỏ. Duy trì nhịp độ làm bài và rà soát lỗi sai.`;
      }
    } else {
      // Gap is 0 or user already exceeds required competency
      priorityScore = examWeight * 10;
      tier = 'Maintenance';
      rationale = `Đã đạt hoặc vượt chuẩn năng lực yêu cầu. Chỉ cần duy trì phản xạ và làm bài tập tổng hợp.`;
    }

    priorityResults[skill] = {
      skill,
      tier,
      priorityScore: +priorityScore.toFixed(1),
      gap,
      examWeight,
      rationale,
      isTargetPriority: item.isTargetPriority,
    };

    totalPriorityScore += priorityScore;
  });

  // Calculate percentage time distribution based on priority scores
  // Ensure that no skill with a Critical/High gap is starved, and Maintenance skills get a small baseline
  const skillsList = Object.keys(priorityResults);
  const timeAllocationPercent = {};

  skillsList.forEach((skill) => {
    const score = priorityResults[skill].priorityScore;
    const rawPct = totalPriorityScore > 0 ? (score / totalPriorityScore) : (1 / skillsList.length);
    timeAllocationPercent[skill] = Math.round(rawPct * 100);
  });

  // Sort skills by priority
  const sortedSkills = [...skillsList].sort((a, b) => priorityResults[b].priorityScore - priorityResults[a].priorityScore);

  return {
    priorities: priorityResults,
    sortedSkills,
    timeAllocationPercent,
    topPrioritySkill: sortedSkills[0],
    deadlineUrgency: daysRemaining <= 30 ? 'Emergency (Cấp tốc)' : daysRemaining <= 60 ? 'Intensive (Tăng tốc)' : 'Standard (Bình thường)',
  };
}
