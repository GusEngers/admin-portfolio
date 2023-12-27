const techs = require('express').Router();
const multer = require('multer');
const storage = require('../config/storage');
const { getTechs } = require('../controllers/techs');

const upload = multer({ storage });

techs.get('/', async (req, res) => {
  try {
    const techs = await getTechs();
    res.render('pages/list', { type: 'Tecnologías', data: techs });
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
});

module.exports = techs;
