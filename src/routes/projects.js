const projects = require('express').Router();
const multer = require('multer');
const storage = require('../config/storage');
const { getProjects, addProject } = require('../controllers/projects');
const { getTechs } = require('../controllers/techs');
const { verifyId, verifyBodyProject } = require('../middlewares/verify');
const Project = require('../models/project');

// Aca se añade las validaciones para body y file
storage._handleFile = function _handleFile(req, file, cb) {
  if (!req.body.techs) {
    cb(new Error('El proyecto debe tener como mínimo una tecnología'));
  }
};

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
  // Este es el middleware para manejar el error
  // TODO: Hacerlo mas estético
  .post((req, res) => {
      UpProject(req, res, async (error) => {
        const techs = await getTechs();
        return res.render('pages/add-project', { info: false, error: error.message, techs });
      });
    },
    verifyBodyProject,
    async (req, res) => {
      try {
        await addProject({
          ...req.body,
          avatar: req.files['avatar'][0],
          images: req.files['images'],
        });
        const techs = await getTechs();
        res.render('pages/add-project', { info: 'Nuevo Proyecto Añadido', error: false, techs });
      } catch (error) {
        const techs = await getTechs();
        res.render('pages/add-project', { info: false, error: error.message, techs });
      }
    }
  );

projects.use('/:id', verifyId);
projects.get('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/proyectos');
});

module.exports = projects;
