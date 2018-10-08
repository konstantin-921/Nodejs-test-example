import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import passportFacebook from 'passport-facebook';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from "../models/index";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

const { ExtractJwt } = passportJWT;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "tasmanianDevil";


passport.use(new JwtStrategy(jwtOptions, (payload, next) => {
  models.Users.findOne({
    where: {
      id: payload.user,
    }
  }).then(user => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
}));

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', session: false}, (email, password, next) => {
    
  models.Users.findOne({
    where: {
      email,
    }
  }).then(user => {
    const hash = bcrypt.compareSync(password, user.password);
    if (hash && user) {
      const payload = { user: user.id };
      const token = jwt.sign(payload, 'tasmanianDevil', {expiresIn: '7d'});
      return next(null, user, {  message: "Login success", token, status: 200 });
      }
    if(!hash) {
      return next(null, false, {  message: 'Data entered incorrectly', status: 403 });
    }
      return next(null, false);
    }
  )
  .catch(error => {
      next(null, false, { message: 'Data entered incorrectly', status: 401 });
  });
}));

passport.use(new FacebookStrategy({
  clientID: 351778732226923,
  clientSecret: 'a1aa6bee8c58fef61bd1a27b98f21f09',
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, ((accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const user = {
			email: profile.emails[0].value,
		};
  models.User.findOne({
    where: {
      email: user.email,
    }})
    .then(response => {
      if(!response) {
        models.Users.create({
          password: null,
          email: user.email,
          language: 'en',
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
      }
    })
  })
))
    
    
    
  //   if (err) { return done(err); }
  //   done(null, user);
  // });


export default passport;
