/**
 * Audio Recording & Playback Helper
 * Giải quyết triệt để vấn đề:
 * 1. Thu âm bị nhỏ tiếng do mic laptop/tai nghe có độ nhạy thấp (gain thấp)
 * 2. Âm lượng bị bập bõm, lúc to lúc nhỏ (AGC pumping) do thuật toán AutoGainControl và EchoCancellation của trình duyệt
 * 3. Lỗi OverconstrainedError do ép cố định sampleRate: 48000 khiến trình duyệt fallback về audio: true (bị bật AGC)
 */

/**
 * Lấy MediaStream tối ưu cho ghi âm giọng nói với bộ lọc nén động lực (Dynamics Compressor) 
 * và tăng âm (Gain Boost ~ 2.2x - 2.5x) mà không gây vỡ tiếng hay bập bõm.
 */
export async function createOptimizedAudioStream() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Trình duyệt không hỗ trợ thu âm MediaDevices');
  }

  // Danh sách các cấu hình mic từ tối ưu nhất đến cơ bản nhất
  const constraintVariants = [
    // 1. Tắt hoàn toàn AGC và EchoCancellation để chống hiện tượng bơm/dìm âm lượng thất thường
    {
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
      },
    },
    // 2. Cấu hình mềm dẻo (ideal) nếu phần cứng không cho phép ép cứng
    {
      audio: {
        echoCancellation: { ideal: false },
        autoGainControl: { ideal: false },
        noiseSuppression: { ideal: false },
      },
    },
    // 3. Fallback mặc định
    {
      audio: true,
    },
  ];

  let rawStream = null;
  let lastError = null;

  for (const constraints of constraintVariants) {
    try {
      rawStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (rawStream) break;
    } catch (err) {
      lastError = err;
    }
  }

  if (!rawStream) {
    throw lastError || new Error('Không thể truy cập microphone');
  }

  // Xử lý âm thanh qua Web Audio API:
  // Thêm Dynamics Compressor + Gain Boost để tiếng to, rõ, đều đặn giữa các từ
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      const audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const source = audioCtx.createMediaStreamSource(rawStream);

      // Dynamics Compressor giúp cân bằng âm lượng tự nhiên (không bị bơm giật như AGC của browser)
      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-24, audioCtx.currentTime);
      compressor.knee.setValueAtTime(24, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(3.5, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.2, audioCtx.currentTime);

      // Tăng âm lượng mic lên 2.2x (~ +6.8dB) để chống tiếng nhỏ
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(2.2, audioCtx.currentTime);

      source.connect(compressor);
      compressor.connect(gainNode);

      const destination = audioCtx.createMediaStreamDestination();
      gainNode.connect(destination);

      const processedStream = destination.stream;

      // Hàm dọn dẹp dừng toàn bộ mic phần cứng và giải phóng AudioContext
      const cleanup = () => {
        try {
          rawStream.getTracks().forEach((track) => track.stop());
          processedStream.getTracks().forEach((track) => track.stop());
          if (audioCtx.state !== 'closed') {
            audioCtx.close().catch(() => {});
          }
        } catch (e) {}
      };

      return {
        stream: processedStream,
        rawStream,
        cleanup,
      };
    }
  } catch (err) {
    console.warn('Không thể khởi tạo Web Audio processing, dùng stream gốc:', err);
  }

  // Fallback nếu Web Audio API không hỗ trợ stream destination
  return {
    stream: rawStream,
    rawStream,
    cleanup: () => {
      try {
        rawStream.getTracks().forEach((track) => track.stop());
      } catch (e) {}
    },
  };
}

/**
 * Tìm MIME type tối ưu cho MediaRecorder
 */
export function getOptimalAudioMimeType() {
  if (typeof MediaRecorder === 'undefined') return undefined;

  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/aac',
    'audio/ogg;codecs=opus',
  ];

  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  return undefined;
}
