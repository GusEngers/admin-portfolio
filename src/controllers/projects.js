const Project = require('../models/project');

module.exports = {
  getProjects: async () => {
    const projects = await Project.find({})
      .lean()
      .catch((err) => {
        throw new Error(err.message);
      });
    return projects;
  },
  addProject: async (project) => {
    const newProject = new Project(project);
    await newProject.save().catch((err) => {
      throw new Error(err.message);
    });
  },
};
