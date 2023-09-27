const Tech = require('../models/tech');

async function getTechs() {
  try {
    const techs = await Tech.find({});
    return techs;
  } catch (error) {
    throw error;
  }
}

module.exports = getTechs;
