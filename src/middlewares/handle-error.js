const { getProject } = require('../controllers/projects');
const { getTechs } = require('../controllers/techs');

module.exports = {
  handleNewProject: async (err, req, res, next) => {
    const techs = await getTechs();
    res.render('pages/add-project', { info: false, error: err.message, techs });
  },
  handleEditProject: async (err, req, res, next) => {
    const [project, techs] = await Promise.all([getProject(req.params.id), getTechs()]);
    res.render('pages/edit-project', { error: err.message, project, techs });
  },
};
