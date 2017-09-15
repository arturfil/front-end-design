const express  = require('express');
const bcrypt   = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user-model.js');

const router = express.Router();

router.get('/signup', (req, res, next) => {
  if(req.user) {
    res.redirect('/')
    return;
  }
  res.render('auth-views/signup-form.ejs');
});

router.post('/process-signup', (req, res, next) => {
  if(req.body.signupEmail === "" || req.body.signupPassword === "") {
    res.locals.feedbackMessage = "We need both email and password";
    res.render('auth-views/signup-form.ejs');
    return;
  }

  UserModel.findOne(
    { email: req.body.signupEmail },
    (err, userFromDb) => {
      if(err) {
        next(err);
        return;
      }

      if(userFromDb) {
        res.locals.feedbackMessage = 'Email taken';
        res.render('auth-views/signup-form.ejs');
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const scramblePass = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel(
        {
          email: req.body.signupEmail,
          encryptedPassword: scramblePass
        }
      );
      theUser.save((err) => {
        if(err) {
          next(err);
          return;
        }
        req.flash('signupSucces', 'Sign up Succesful!');
        res.redirect('/');
      })
    }
  )
})

//--------_>

router.get('/login', (req, res, next) => {
  if(req.user) {
    res.redirect('/');
    return;
  }
  res.locals.flashError = req.flash('error');

  res.locals.logoutFeedback = req.flash('logoutSucces');
  res.locals.securityFeedback = req.flash('sercurityError');
  res.render('auth-views/login-form.ejs');
});

router.post('/process-login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('logoutSucces', "Log out Succesful!");

  res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

module.exports = router;
