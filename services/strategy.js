import passport from "passport";
import passportJWT from "passport-jwt";
import models from "../models/index";

function Strategy() {
  const { ExtractJwt } = passportJWT;
  const JwtStrategy = passportJWT.Strategy;

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

export default new Strategy();
