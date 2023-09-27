const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/project');
});

router
  .route('/project')
  .get((req, res) => {
    res.render('project', { info: null, techs: null });
  })
  .post((req, res) => {
    console.log(req.body);
    res.render('project', { info: 'Proyecto creado', techs: null });
  });

  router
  .route('/tech')
  .get((req, res) => {
    res.render('tech', { info: null });
  })
  .post((req, res) => {
    console.log(req.body);
    res.render('tech', { info: 'Tech creada'});
  });

module.exports = router;
