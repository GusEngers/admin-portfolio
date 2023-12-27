const techs = require('express').Router();
const { getTechs, getTech, updateTech, addTech, deleteTech } = require('../controllers/techs');
const { verifyId, verifyBody } = require('../middlewares/verify');

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
  .post(verifyBody, async (req, res) => {
    try {
      await addTech(req.body);
      res.render('pages/add-tech', { info: 'Nueva Tecnología Añadida', error: false });
    } catch (error) {
      res.render('pages/add-tech', { info: false, error: error.message });
    }
  });

techs.use('/:id', verifyId);
techs
  .route('/:id/editar')
  .get(async (req, res) => {
    try {
      const tech = await getTech(req.params.id);
      if (!tech) {
        throw new Error('Tecnología no encontrada');
      }
      res.render('pages/edit-tech', { tech });
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  })
  .post(verifyBody, async (req, res) => {
    try {
      await updateTech(req.params.id, req.body);
      res.redirect('/tecnologias');
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  });

techs
  .route('/:id/eliminar')
  .get(async (req, res) => {
    try {
      const tech = await getTech(req.params.id);
      if (!tech) {
        throw new Error('Tecnología no encontrada');
      }
      res.render('pages/delete-tech', { error: false, tech });
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      if (req.body.id !== req.params.id) {
        const tech = await getTech(req.params.id);
        return res.render('pages/delete-tech', { error: 'El ID no coincide', tech });
      }
      await deleteTech(req.params.id);
      res.redirect('/tecnologias');
    } catch (error) {
      res.render('pages/error', { notFound: false, error: error.message });
    }
  });

module.exports = techs;
