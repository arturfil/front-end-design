const express      = require('express');
const UserModel = require('../models/user-model.js');
const router       = express.Router();

//custom middle ware in case we need it for views.
// if user is logged in, show this... if not, don't let them see that...
router.use((req, res, next) => {
  if(req.user, next) => {
    res.locals.currentUser = req.user;
  } else {
    res.locals.currentUser = null;
  }
  next();
})

//-------------------------------------------->

// render user profile
router.get('/profile', (req, res, next) => {
  if(!req.user){
    res.redirect('/');
    return;
  }
    res.locals.theUser = req.user;
    res.render('profile-views/personal-profile.ejs');
});

//if he clicks this route to edit his profile, render the form
router.get('/profile/edit', (req, res, next) => {
  req.user //---> we don't use findById because we are allready using a unique user's id
  res.locals.theUser = req.user;
    //----> render form with allready submited form
  )
})

// Once he submits the form, update the information and reirect to his personal profile
router.post('/profile', (req, res, next) => {
  // req.userId //?
  // (err, userFromDb) => {
  //   if(err) {
  //     next(err);
  //     return;
  //   }
    req.user.name = //form value,
    req.user.age: //form value,
    req.user.weight: //form value,
    req.user.height: //form value,
    req.user.gender: //form value,
    req.user.activityLevel: //form value,
    req.user.save((err, next) => {
      //check error
      res.redirect('/profile') // following the default post route after editing... needs some corrections

    })
  }


  })
});



module.exports = router;
