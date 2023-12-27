const { isObjectIdOrHexString } = require('mongoose');

module.exports = {
  verifyId: (req, res, next) => {
    let { id } = req.params;
    if (!isObjectIdOrHexString(id)) {
      return res.render('pages/error', { notFound: false, error: 'Formato de id inválido' });
    }
    next();
  },
  verifyBody: (req, res, next) => {
    let details = [];
    for (let i = 0; i < req.body.details.length; i++) {
      if (!!req.body.details[i].length) {
        details.push(req.body.details[i]);
      }
    }
    req.body.details = details;
    next();
  },
};
