const router = require('express').Router();
const projects = require('./projects');
const techs = require('./techs');

// const upload = multer({ storage });

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.use('/proyectos', projects);
router.use('/tecnologias', techs);

router.use((req, res) => {
  res.render('pages/error', { notFound: true });
});

/*
const UpProject = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'images', maxCount: 8 },
]);
router
  .route('/project')
  .get(async (req, res) => {
    try {
      const techs = await getTechs();
      res.render('project', { info: null, techs });
    } catch (error) {
      res.render('project', { info: error.message, techs: [] });
    }
  })
  .post(UpProject, async (req, res) => {
    try {
      const techs = await getTechs();
      const project = await addProject({
        ...req.body,
        avatar: req.files['avatar'][0],
        images: req.files['images'],
      });
      res.render('project', { info: project, techs });
    } catch (error) {
      res.render('project', { info: error.message, techs });
    }
  });

router
  .route('/tech')
  .get((req, res) => {
    res.render('tech', { info: null });
  })
  .post(async (req, res) => {
    try {
      const tech = await addTech({ ...req.body });
      res.render('tech', { info: tech });
    } catch (error) {
      res.render('tech', { info: error.message });
    }
  });

router.get('/all', async (req, res) => {
  const all = await getAll();
  res.json(all);
});
*/
module.exports = router;
