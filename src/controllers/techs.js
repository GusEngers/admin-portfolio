const Tech = require('../models/tech');

module.exports = {
  getTechs: async () => {
    const techs = await Tech.find({})
      .lean()
      .catch((err) => {
        throw new Error(err.message);
      });
    return techs;
  },
  getTech: async (id) => {
    const tech = await Tech.findById(id);
    return tech;
  },
  addTech: async (tech) => {
    const newTech = new Tech(tech);
    await newTech.save().catch((err) => {
      throw new Error(err.message);
    });
  },
  updateTech: async (id, tech) => {
    await Tech.findByIdAndUpdate(id, tech).catch((err) => {
      throw new Error(err.message);
    });
  },
  deleteTech: async (id) => {
    await Tech.findByIdAndDelete(id).catch((err) => {
      throw new Error(err.message);
    });
  },
};
