const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('landing-page-final.ejs');
});

module.exports = router;
