const express      = require('express');
const UserModel = require('../models/user-model.js');
const router       = express.Router();
const multer    = require('multer');

const myUploader = multer(
  {dest: __dirname + '/../public/uploads'}
);

//custom middle ware in case we need it for views.
// if user is logged in, show this... if not, don't let them see that...
router.use((req, res, next) => {
  if(req.user) {
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
})

// //if he clicks this route to edit his profile, render the form
router.get('/profile/edit', (req, res, next) => {
  res.locals.theUser = req.user;
  if(!req.user){
    res.redirect('/');
    return;
  }
  res.render('profile-views/edit-profile.ejs');
})

// Once he submits the form, update the information and reirect to his personal profile
router.post('/profile', myUploader.single('imageValue'), (req, res, next) => {
  // req.userId //?
  // (err, userFromDb) => {
  //   if(err) {
  //     next(err);
  //     return;
  //   }

    req.user.name     = req.body.nameInput;
    req.user.age      = req.body.ageInput;
    req.user.weight   = req.body.weightInput;
    req.user.height   = req.body.heightInput;
    req.user.gender   = req.body.genderInput;
    req.user.activity = req.body.activityInput;
    req.user.image    = req.body.imageInput;
    req.user.goal     = req.body.goalInput;
    req.user.bmr      =  (66.5 + ( 13.75 * req.user.weight ) + ( 5.003 * req.user.height ) - ( 6.755 * req.user.age ));

    if (req.file) {
      req.user.image = '/uploads/' + req.file.filename;
    }

    req.user.save((err) => {
      if(err) {
        next(err);
        return;
      }

      // following the default post route after editing... needs some corrections
      res.redirect('/profile')
    });
});



module.exports = router;
