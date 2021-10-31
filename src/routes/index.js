import express from 'express';
import { NotFoundError } from '../utils/errors';

const router = express.Router();

router.get('/ping', (req, res, next) => {
  res.status(200).json({ message: 'pong' });
});

router.post('/ping', (req, res, next) => {
  try {
    const { message } = req.body;
    if (message !== 'ping') {
      res.status(400).json({ message: 'Bad Request' });
    }
    res.status(200).json({ message: 'pong' });
  } catch (err) {
    next(err);
  }
});

router.get('/not-found', (req, res, next) => {
  throw new NotFoundError('Not found api path');
});

export default router;
