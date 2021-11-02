import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { userService } from './services';

dotenv.config();

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const verifyUser = async (payload, done) => {
  try {
    const { id } = payload;
    const loginUser = await userService.getUserById(id);
    if (!loginUser) return done(null, false);
    return done(null, loginUser);
  } catch (err) {
    console.log(err);
    return done(err);
  } finally {
  }
};

// passport.use('jwt', new JwtStrategy(jwtOptions, verifyUser));

export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      const { id } = user;
      req.userId = id;
    }
    next();
  })(req, res, next);
};
