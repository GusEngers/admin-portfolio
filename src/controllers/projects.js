const Project = require('../models/project');

module.exports = {
  getProjects: async () => {
    const projects = await Project.find({})
      .lean()
      .catch((err) => {
        throw err;
      });
    return projects;
  },
};
