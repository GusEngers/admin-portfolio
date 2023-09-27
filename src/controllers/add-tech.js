const Tech = require('../models/tech');

async function addTech(obj) {
  try {
    const tech = new Tech(obj);
    await tech.save();
    return `Tech ${tech.name} creada`;
  } catch (error) {
    throw error;
  }
}

module.exports = addTech;
