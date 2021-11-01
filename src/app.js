import express from 'express';
import router from './routes';
import {
  invalidPathHandler,
  errorLogger,
  errorResponder,
} from './middlewares/errorHandler';
import cors from 'cors';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { jwtOptions, verifyUser } from './middlewares/passport';
import { uploadAllData } from './utils/dataUploader/dataUploader';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(new JwtStrategy(jwtOptions, verifyUser));

app.use(router);

// uploadAllData();

app.use(invalidPathHandler);
app.use(errorLogger);
app.use(errorResponder);

export default app;
