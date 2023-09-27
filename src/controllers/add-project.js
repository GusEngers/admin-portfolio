const Project = require('../models/project');

async function addProject(obj) {
  try {
    const project = new Project(obj);
    await project.save();
    return `Proyecto ${project.name} creado`;
  } catch (error) {
    throw error;
  }
}

module.exports = addProject;
