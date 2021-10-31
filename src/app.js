import express from 'express';
import router from './routes';
import { uploadAllData } from './utils/dataUploader/dataUploader';
import {
  invalidPathHandler,
  errorLogger,
  errorResponder,
} from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use(router);

// uploadAllData();

app.use(invalidPathHandler);
app.use(errorLogger);
app.use(errorResponder);

export default app;
