import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { questions, ideologyLabels } from '../data/questions';
import { AnalyzeRequest, Ideology } from '../types';

const router = Router();

function scoreAnswers(answers: string[]): Record<Ideology, number> {
  const scores: Record<Ideology, number> = { free: 0, socialist: 0, vn: 0 };

  answers.forEach((answer, idx) => {
    const q = questions[idx];
    if (!q) return;
    const choiceLetter = answer.split(': ')[1]?.trim() as 'A' | 'B' | 'C';
    const choice = q.choices.find((c) => c.label === choiceLetter);
    if (choice) scores[choice.ideology]++;
  });

  return scores;
}

function buildPrompt(answers: string[], gender: string, playerName?: string): string {
  const answerDetails = answers.map((ans, idx) => {
    const q = questions[idx];
    if (!q) return '';
    const choiceLetter = ans.split(': ')[1]?.trim() as 'A' | 'B' | 'C';
    const choice = q.choices.find((c) => c.label === choiceLetter);
    const ideologyName = choice ? ideologyLabels[choice.ideology].name : 'Không xác định';
    return `- Sự kiện ${q.year} — ${q.title}: Chọn ${choiceLetter} → Tư duy: ${ideologyName}`;
  }).filter(Boolean).join('\n');

  return `Bạn là một chuyên gia kinh tế chính trị Mác - Lênin, am hiểu sâu sắc về ba hệ thống kinh tế: KTTT Tự do (kiểu Mỹ), KTTT XHCN (kiểu Trung Quốc), và KTTT Định hướng XHCN (kiểu Việt Nam).

Người chơi${playerName ? ` "${playerName}"` : ''} vừa tham gia cuộc giả lập xử lý 10 cuộc khủng hoảng kinh tế thực tế với kết quả sau:

${answerDetails}

Hãy thực hiện các nhiệm vụ sau (viết bằng tiếng Việt, sử dụng ngôn ngữ sống động, hấp dẫn như đang thuyết trình trực tiếp):

1. **KẾT LUẬN CHÍNH** (1 câu mạnh mẽ): Công bố hệ tư tưởng chủ đạo của người chơi.

2. **PHÂN TÍCH TƯ DUY** (3-4 câu): Giải thích tại sao các lựa chọn này phản ánh hệ tư tưởng đó. Dẫn chiếu cụ thể 2-3 câu hỏi làm ví dụ.

3. **MÂU THUẪN NỘI TẠI** (nếu có, 2-3 câu): Chỉ ra những điểm mâu thuẫn hoặc không nhất quán trong tư duy của người chơi nếu họ chọn đáp án từ các hệ tư tưởng khác nhau.

4. **NHẬN XÉT KẾT** (1-2 câu): Lời nhận xét cuối thú vị, có thể hài hước nhẹ về "kiểu tư duy" của người chơi.

Format: Viết liền mạch như một bài phân tích, không dùng đánh số, không dùng bullet points. Giữ giọng điệu học thuật nhưng vẫn thú vị.`;
}

router.post('/analyze', async (req: Request, res: Response) => {
  const { answers, gender, playerName }: AnalyzeRequest = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    res.status(400).json({ error: 'Thiếu dữ liệu câu trả lời' });
    return;
  }

  const scores = scoreAnswers(answers);
  const dominant = (Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]) as Ideology;
  const total = answers.length;
  const consistency = Math.round((Math.max(...Object.values(scores)) / total) * 100);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    const fallbackAnalysis = generateFallbackAnalysis(scores, dominant, playerName);
    res.json({ analysis: fallbackAnalysis, dominantIdeology: dominant, scores, consistency });
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = buildPrompt(answers, gender, playerName);
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    res.json({ analysis, dominantIdeology: dominant, scores, consistency });
  } catch (err: any) {
    console.error('Gemini API error:', err);
    const errMsg: string = err?.message || err?.toString() || '';
    if (errMsg.includes('429') || errMsg.includes('Resource exhausted')) {
      const fallbackAnalysis = generateFallbackAnalysis(scores, dominant, playerName);
      res.json({ analysis: fallbackAnalysis, dominantIdeology: dominant, scores, consistency, notice: 'Đang dùng phân tích nội bộ do Gemini API tạm thời giới hạn quota.' });
      return;
    }
    res.status(500).json({ error: `Lỗi Gemini API: ${errMsg}` });
  }
});

function generateFallbackAnalysis(scores: Record<string, number>, dominant: string, playerName?: string): string {
  const label = ideologyLabels[dominant];
  const name = playerName ? `"${playerName}"` : 'Người chơi';
  const totalA = scores.free, totalB = scores.socialist, totalC = scores.vn;

  const profiles: Record<string, string> = {
    free: `${name} mang tư duy của một nhà kinh tế học theo trường phái tự do cổ điển — tin tưởng tuyệt đối vào "bàn tay vô hình" của thị trường. Với ${totalA}/10 lựa chọn ủng hộ cơ chế thị trường thuần túy, ${name} có xu hướng để thị trường tự điều tiết và hạn chế tối đa can thiệp của Nhà nước. Đây là tư duy phổ biến trong hệ thống kinh tế Mỹ — nơi cạnh tranh tự do được coi là động lực phát triển tối thượng. ${totalB > 2 ? `Tuy nhiên, ${totalB} lựa chọn mang màu sắc XHCN cho thấy một mâu thuẫn: đôi khi ${name} vẫn muốn có sự kiểm soát mạnh tay của Nhà nước — điều này phản ánh tư duy chưa nhất quán.` : ''} Nói vui: ${name} có lẽ sẽ đọc rất nhiều sách của Milton Friedman và Adam Smith!`,
    socialist: `${name} mang đậm tư duy của mô hình kinh tế chỉ huy — nơi Nhà nước nắm quyền tuyệt đối trong mọi quyết sách kinh tế. Với ${totalB}/10 lựa chọn ủng hộ can thiệp mạnh tay của Nhà nước, ${name} tin rằng chỉ có sức mạnh tập trung của bộ máy hành chính mới có thể giải quyết triệt để các khủng hoảng. ${totalA > 2 ? `Song song đó, ${totalA} lựa chọn theo KTTT Tự do lại tạo ra sự mâu thuẫn thú vị — đôi khi ${name} cũng muốn để thị trường tự vận hành.` : ''} Đây là tư duy phổ biến trong các nền kinh tế kế hoạch hóa tập trung. Nói vui: ${name} có lẽ sẽ thích đọc Tư bản luận của Marx hơn báo cáo tài chính!`,
    vn: `${name} thể hiện tư duy của một nhà lãnh đạo theo mô hình Kinh tế Thị trường Định hướng XHCN — biết kết hợp linh hoạt giữa sức mạnh thị trường và vai trò định hướng của Nhà nước. Với ${totalC}/10 lựa chọn, ${name} luôn tìm cách dung hòa: vừa tận dụng cơ chế thị trường để thúc đẩy tăng trưởng, vừa đảm bảo công bằng xã hội và bảo vệ lợi ích của người lao động. ${(totalA > 0 || totalB > 0) ? `Những lựa chọn còn lại (${totalA} theo KTTT Tự do, ${totalB} theo XHCN) cho thấy ${name} vẫn đang trong quá trình hoàn thiện tư duy — điều này hoàn toàn bình thường trong thời kỳ quá độ!` : ''} Nói vui: ${name} có tư duy của một nhà hoạch định chính sách Việt Nam chính hiệu!`,
  };

  return profiles[dominant] || `${name} có tư duy kinh tế đa chiều và thú vị. Hãy xem kết quả chi tiết bên dưới!`;
}

export default router;
