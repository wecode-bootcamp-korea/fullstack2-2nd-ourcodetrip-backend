import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { userService } from '../services';

dotenv.config();

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const verifyUser = async (payload, done) => {
  try {
    console.log(`jwt payload: ${payload}`);
    const { id } = payload;
    const loginUser = await userService.getUserById(id);
    return done(null, loginUser);
  } catch (err) {
    return done(err);
  }
};

export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  });
};
