const express   = require('express');
const SpotModel = require('../models/spot-model.js');
const router    = express.Router();
const multer    = require('multer');

const myUploader = multer(
  {dest: __dirname + '/../public/images'}
);

// custom middleware for views => login / sign up and / logout
router.use((req, res, next) => {
  if(req.user) {
    res.locals.currentUser = req.user;
  } else {
    res.locals.currentUser = null;
  }
  next();
})

router.get('/spots', (req, res, next) => {
  SpotModel.find((err, allSpots) => {
    if(err) {
      next(err);
      return;
    }
    res.locals.listOfSpots = allSpots;
    res.render('spots-views/all-spots.ejs');
  })
})

router.get('/spots/new', (req, res, next) => {
  res.render('spots-views/spots-form.ejs');
});

router.post('/spots', myUploader.single('imageValue'), (req, res, next) => {
  const theSpot = new SpotModel({
    name:               req.body.nameValue,
    workout:            req.body.workoutValue,
    location:           req.body.locationValue,
    image: '/images/' + req.file.filename
  })

  theSpot.save((err) => {
    if(err && theSpot.errors) {
      res.locals.errorMessages = theSpot.errors;
      res.render('spots-views/all-spots.ejs');
      return;
    }

    if(err && !theSpot.errors) {
      res.locals.errorMessages = theSpot.errors;
      next(err);
      return;
    }
    res.redirect('/spots');
  })
});

router.get('/spots/:spotsId', (req, res, next) => {
  SpotModel.findById(
    req.params.spotsId,
    (err, spostsFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.spotsInfo = spostsFromDb;
      res.render('spots-views/spot-details.ejs');
    }
  );
});

router.get('/spots/:spotsId/edit', (req, res, next) => {
  SpotModel.findById(
    req.params.spotsId,
    (err, spostsFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.spotsInfo = spostsFromDb;
      res.render('spots-views/edit-spot.ejs');
    }
  );
});

router.post('/spots/:spotsId', myUploader.single('imageValue'), (req, res, next) => {
  SpotModel.findById(
    req.params.spotsId,
    (err, spotsFromDb) => {
      if(err) {
        next(err);
        return;
      }
      spotsFromDb.name     = req.body.nameValue;
      spotsFromDb.workout  = req.body.workoutValue;
      spotsFromDb.location = req.body.locationValue;
      spotsFromDb.rating   = req.body.ratingValue;
      if (req.file) {
        spotsFromDb.image = '/images/' + req.file.filename;
      }
      spotsFromDb.save((err) => {
        if(err) {
          next(err);
          return;
        }
        res.redirect('/spots');
      });
    }
  );
});

router.post('/spots/:spotsId/delete', (req, res, next) => {
  SpotModel.findByIdAndRemove(
    req.params.spotsId,
    (err, spotsInfo) => {
      if(err) {
        next(err);
        return;
      };
      res.redirect('/spots');
    }
  )
})

module.exports  = router;
