const projects = require('express').Router();
const multer = require('multer');
const storage = require('../config/storage');
const { getProjects } = require('../controllers/projects');

const upload = multer({ storage });

projects.get('/', async (req, res) => {
  try {
    const projects = await getProjects();
    res.render('pages/list', { type: 'Proyectos', data: projects });
  } catch (error) {
    res.render('pages/error', { notFound: false, error: error.message });
  }
});

module.exports = projects;
