const { isObjectIdOrHexString } = require('mongoose');
const { getTechs } = require('../controllers/techs');

module.exports = {
  verifyId: (req, res, next) => {
    let { id } = req.params;
    if (!isObjectIdOrHexString(id)) {
      return res.render('pages/error', { notFound: false, error: 'Formato de id inválido' });
    }
    next();
  },
  verifyBodyTech: (req, res, next) => {
    let details = [];
    for (let i = 0; i < req.body.details.length; i++) {
      if (!!req.body.details[i].length) {
        details.push(req.body.details[i]);
      }
    }
    req.body.details = details;
    next();
  },
  verifyBodyProject: async (req, res, next) => {
    let tasks = [];
    for (let i = 0; i < req.body.tasks.length; i++) {
      if (!!req.body.tasks[i].length) {
        tasks.push(req.body.tasks[i]);
      }
    }
    req.body.tasks = tasks;
    next();
  },
};
