const router = require('express').Router();
const multer = require('multer');
const storage = require('../config/storage');

const addProject = require('../controllers/add-project');
const getTechs = require('../controllers/get-techs');
const addTech = require('../controllers/add-tech');
const getAll = require('../controllers/get-all');

const upload = multer({ storage });

router.get('/', (req, res) => {
  res.redirect('/project');
});

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

module.exports = router;
