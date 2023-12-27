const techs = require('express').Router();
const { getTechs } = require('../controllers/techs');

techs.get('/', async (req, res) => {
  try {
    const techs = await getTechs();
    res.render('pages/list', { type: 'Tecnologías', data: techs });
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
});

techs
  .route('/nuevo')
  .get((req, res) => {
    res.render('pages/add-tech', { info: false, error: false });
  })
  .post(async (req, res) => {
    console.log(req.body);
    res.render('pages/add-tech', { info: 'Tecología Añadida', error: false });
  });

module.exports = techs;
