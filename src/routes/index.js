const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/add', (req, res) => {
  console.log(req.body);
  res.render('home');
});
module.exports = router;
