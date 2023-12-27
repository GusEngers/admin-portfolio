const projects = require('express').Router();
const multer = require('multer');
const storage = require('../config/storage');
const { getProjects } = require('../controllers/projects');
const { getTechs } = require('../controllers/techs');

const upload = multer({ storage });

projects.get('/', async (req, res) => {
  try {
    const projects = await getProjects();
    res.render('pages/list', { type: 'Proyectos', data: projects });
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
});

const UpProject = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'images', maxCount: 8 },
]);
projects
  .route('/nuevo')
  .get(async (req, res) => {
    const techs = await getTechs();
    res.render('pages/add-project', { info: false, error: false, techs });
  })
  .post(UpProject, async (req, res) => {
    try {
      console.log("Acá el Body:", req.body)
      console.log("Acá los archivos:", req.files)
      const techs = await getTechs();
      res.render('pages/add-project', { info: 'Nuevo Proyecto Añadido', error: false, techs });
    } catch (error) {
      const techs = await getTechs();
      res.render('pages/add-project', { info: false, error: error.message, techs });
    }
  });

module.exports = projects;
