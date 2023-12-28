const projects = require('express').Router();
const upload = require('../config/storage');
const { getProjects, addProject, getProject, updateProject, deleteProject } = require('../controllers/projects');
const { getTechs } = require('../controllers/techs');
const { handleNewProject, handleEditProject } = require('../middlewares/handle-error');
const { verifyId, verifyBodyProject } = require('../middlewares/verify');

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
projects
  .route('/:id/editar')
  .get(async (req, res) => {
    try {
      const [project, techs] = await Promise.all([getProject(req.params.id), getTechs()]);
      if (project === null) {
        throw new Error('Proyecto no encontrado');
      }
      res.render('pages/edit-project', { error: false, project, techs });
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  })
  .post(
    verifyBodyProject,
    async (req, res) => {
      try {
        await updateProject(req.params.id, req.body);
        res.redirect('/proyectos');
      } catch (error) {
        next(error);
      }
    },
    handleEditProject
  );

projects
  .route('/:id/eliminar')
  .get(async (req, res) => {
    try {
      const project = await getProject(req.params.id);
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }
      res.render('pages/delete-project', { error: false, project });
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      if (req.body.id !== req.params.id) {
        const project = await getProject(req.params.id);
        return res.render('pages/delete-project', { error: 'El ID no coincide', project });
      }
      await deleteProject(req.params.id);
      res.redirect('/proyectos');
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  });

module.exports = projects;
