import passport from "passport";
import passportJWT from "passport-jwt";
import bcrypt from 'bcrypt';
import passportLocal from "passport-local";
import models from "../models/index";


const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;

function StrategyJWT() {
  const { ExtractJwt } = passportJWT;
  this.jwtOptions = {};
  this.jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  this.jwtOptions.secretOrKey = "tasmanianDevil";

  this.strategy = new JwtStrategy(this.jwtOptions, (payload, next) => {
    models.Users.findOne({
      where: {
        id: `${payload.user}`
      }
    }).then(users => {
      const user = users;
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
  });

  passport.use(this.strategy);
}

function StrategyLocal() {

  this.strategy = new LocalStrategy({ usernameField: 'email', passwordField: 'password', session: false}, (email, password, next) => {
    
    models.Users.findOne({
      where: {
        email,
      }
    }).then(user => {
      const hash = bcrypt.compareSync(password, user.password);
      if (hash && user) {
        return next(null, user);
      }
      if(!hash) {
        return next(null, false, {  message: 'Password is incorrect'  });
      }
      if (!user) {
        return next(null, false, { message: 'This user does not exist' });
      }
        return next(null, false);
      }
    );
  });

  passport.use(this.strategy);
}

const jwtStrategy = new StrategyJWT();
const localStrategy = new StrategyLocal();

export { jwtStrategy, localStrategy };
