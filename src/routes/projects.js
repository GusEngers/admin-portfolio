const projects = require('express').Router();
const upload = require('../config/storage');
const { getProjects, addProject } = require('../controllers/projects');
const { getTechs } = require('../controllers/techs');
const { handleNewProject } = require('../middlewares/handle-error');
const { verifyId, verifyBodyProject } = require('../middlewares/verify');
const Project = require('../models/project');

const UpProject = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'images', maxCount: 8 },
]);

projects.get('/', async (req, res) => {
  try {
    const projects = await getProjects();
    res.render('pages/list', { type: 'Proyectos', data: projects });
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
});

projects
  .route('/nuevo')
  .get(async (req, res) => {
    const techs = await getTechs();
    res.render('pages/add-project', { info: false, error: false, techs });
  })
  .post(
    UpProject,
    verifyBodyProject,
    async (req, res, next) => {
      try {
        await addProject({
          ...req.body,
          avatar: req.files['avatar'][0],
          images: req.files['images'],
        });
        const techs = await getTechs();
        res.render('pages/add-project', { info: 'Nuevo Proyecto Añadido', error: false, techs });
      } catch (error) {
        next(error);
      }
    },
    handleNewProject
  );

projects.use('/:id', verifyId);
projects.get('/:id/eliminar', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/proyectos');
});

module.exports = projects;
