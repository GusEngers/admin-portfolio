const techs = require('express').Router();
const { getTechs } = require('../controllers/techs');
const Tech = require('../models/tech');

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
    try {
      res.render('pages/add-tech', { info: 'Nueva Tecnología Añadida', error: false });
    } catch (error) {
      res.render('pages/add-tech', { info: false, error: error.message });
    }
  });

techs.route('/:id/editar').get(async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);
    if (!tech) {
      throw new Error('Tecnología no encontrada');
    }
    res.render('pages/edit-tech', { error: false, tech });
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
}).post(async (req, res) => {
  try {
    console.log(req.body)
    res.redirect('/tecnologias');
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
});

module.exports = techs;
