import { Router, Request, Response } from 'express';
import { questions } from '../data/questions';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.render('home', { title: 'Hệ thống Giả lập Vĩ mô' });
});

router.get('/game', (_req: Request, res: Response) => {
  res.render('game', {
    title: 'Giả lập Vĩ mô — Bắt đầu',
    questionsJson: JSON.stringify(questions),
    totalQuestions: questions.length,
  });
});

router.get('/result', (_req: Request, res: Response) => {
  res.render('result', { title: 'Kết quả Phân tích' });
});

export default router;
