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
};
