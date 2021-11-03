import express from 'express';
import router from './routes';
import {
  invalidPathHandler,
  errorLogger,
  errorResponder,
} from './middlewares/errorHandler';
import cors from 'cors';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { uploadAllData } from './utils/dataUploader/dataUploader';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { jwtOptions, verifyUser } from './middlewares/passportJwt';

const app = express();

dotenv.config();
const secretOrKey = process.env.JWT_SECRET;
let token = jwt.sign({ id: 1 }, secretOrKey, { expiresIn: '2h' });
console.log(token);

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
