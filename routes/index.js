const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('landing-page-final.ejs');

  if(req.user) {
    res.locals.currentUser = req.user;
    res.render('auth-view/user-home.js');
  } else {
    res.locals.signupFeedback = req.flash('signupSucces');
    res.render
  }
});

module.exports = router;
