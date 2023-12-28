const { getTechs } = require('../controllers/techs');

module.exports = {
  handleNewProject: async (err, req, res, next) => {
    const techs = await getTechs();
    res.render('pages/add-project', { info: false, error: err.message, techs });
  },
};
