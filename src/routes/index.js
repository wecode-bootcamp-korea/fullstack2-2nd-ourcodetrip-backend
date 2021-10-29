import express from 'express';

const router = express.Router();

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

export default router;
