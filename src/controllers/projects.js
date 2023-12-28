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
  getProject: async (id) => {
    const project = await Project.findById(id)
      .lean()
      .catch((err) => {
        throw new Error(err.message);
      });

    if (project === null) return null;
    
    project.techs = project.techs.map((tech) => tech.toString());
    return project;
  },
  addProject: async (project) => {
    const newProject = new Project(project);
    await newProject.save().catch((err) => {
      throw new Error(err.message);
    });
  },
  updateProject: async (id, project) => {
    await Project.findByIdAndUpdate(id, project).catch((err) => {
      throw new Error(err.message);
    });
  },
  deleteProject: async (id) => {
    await Project.findByIdAndDelete(id).catch((err) => {
      throw new Error(err.message);
    });
  },
};
