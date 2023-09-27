const Project = require('../models/project');
const Tech = require('../models/tech');

async function getAll() {
  const projects = await Project.find({});
  const techs = await Tech.find({});
  return { projects, techs };
}

module.exports = getAll;
