import passport from 'passport';
import { userService } from '../services';
import { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const verifyUser = async (payload, done) => {
  try {
    const { id } = payload;
    const loginUser = await userService.getUserProfileById(id);
    if (!loginUser) return done(null, false);
    return done(null, loginUser);
  } catch (err) {
    console.log(err);
    return done(err);
  } finally {
  }
};

export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      const { id } = user;
      req.userId = id;
    }
    next();
  })(req, res, next);
};
