import express from 'express';
import router from './routes';
import { uploadAllData } from './utils';

const app = express();

app.use(express.json());

app.use(router);

// uploadAllData();

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'internal server error',
  });
});

export default app;
