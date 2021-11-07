import express from 'express';
import router from './routes';
import cors from 'cors';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { jwtOptions, verifyUser } from './middlewares/passportJwt';
import { uploadAllData } from './utils/dataUploader/dataUploader';
import {
  invalidPathHandler,
  errorLogger,
  errorResponder,
} from './middlewares/errorHandler';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
passport.use(new JwtStrategy(jwtOptions, verifyUser));

app.use(router);

app.use(invalidPathHandler);
app.use(errorLogger);
app.use(errorResponder);

// uploadAllData();

export default app;
