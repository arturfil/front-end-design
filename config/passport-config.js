const passport  = require('passport');
const UserModel = require('../models/user-model.js');
const bcrypt    = require('bcrypt');

passport.serializeUser((userFromDb, done) => {
  done(null, userFromDb._id);
});

passport.deserializeUser((idFromBowl, done) => {
  UserModel.findById(
    idFromBowl,

    (err, userFromDb) => {
      if(err) {
        done(err);
        return;
      }

      done(null, userFromDb);

    }
  )
});

const LocalStrategy = require('passport-local').Strategy;
// 'passport.use()' sets up a new Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'loginEmail',
      passwordField: 'loginPassword'
    },
    (emailValue, passValue, done) => {
      UserModel.findOne(
        { email: emailValue},
        (err, userFromDb) => {
          if(err) {
            done(err);
            return;
          }
          if(userFromDb === null ) {
            done(null, false, { message: 'Email is wrong :P'});
            return;
          }
          const isGoodPassword = bcrypt.compareSync(passValue, userFromDb.encryptedPassword);

          if (isGoodPassword === false) {
            done(null, false, { message: 'Password is wrong'});
            return;
          }
          done(null, userFromDb);
        }
      );
    }
  )
);

const FbStrategy = require('passport-facebook').Strategy;

passport.use(
  new FbStrategy(
    {
      clientID: process.env.fb_app_id,
      clientSecret: process.env.fb_app_secret,
      callbackURL: '/auth/facebook/callback'
    },
    (accesToken, refreshToken, profile, done) => {
      console.log(profile);
      UserModel.findOne(
        {
          facebookID: profile.id
        },
        (err, userFromDb) => {
          if(err) {
            done(err);
            return;
          }
          if(userFromDb) {
            done(null, userFromDb);
            return;
          }

          const theUser = new UserModel({
            //test it
            image: "https://graph.facebook.com/v2.10/" + profile.id + "/picture",
            facebookID: profile.id,
            email: profile.displayName
          });

          theUser.save((err) => {
            if(err) {
              done(err);
              return;
            }

            done(null, theUser);
          })
        }
      );
    }
  )
);

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.google_client_id,
      clientSecret: process.env.google_client_secret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accesToken, refreshToken, profile, done) => {
      console.log('Google user info:');
      console.log( profile.emails[0].value);
      UserModel.findOne(
        { googleID: profile.id },
        (err, userFromDb) => {
          if(err) {
            done(err);
            return;
          }
          if(userFromDb) {
            done(null, userFromDb);
            return;
          }
          const theUser = new UserModel({
            googleID: profile.id,
            email: profile.emails[0].value
          });
          theUser.save((err) => {
            if(err){
              done(err);
              return;
            }
            done(null, theUser);
          })
        }
      )
    }
  )
);
