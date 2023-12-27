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
};
