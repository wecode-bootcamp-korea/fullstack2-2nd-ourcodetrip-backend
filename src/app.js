import express from 'express';
import router from './routes';
import {
  invalidPathHandler,
  errorLogger,
  errorResponder,
} from './middlewares/errorHandler';
import cors from 'cors';
import passport from 'passport';

import { uploadAllData } from './utils/dataUploader/dataUploader';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { jwtOptions, verifyUser } from './middlewares/passportJwt';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(new JwtStrategy(jwtOptions, verifyUser));

app.use(router);

app.use(invalidPathHandler);
app.use(errorLogger);
app.use(errorResponder);

// uploadAllData();

export default app;
