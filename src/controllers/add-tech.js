const Tech = require('../models/tech');

async function addTech(obj) {
  try {
    const search = await Tech.findOne({ name: obj.name });
    if (!search) {
      const tech = new Tech(obj);
      await tech.save();
      return `Tech ${tech.name} creada`;
    }
    throw { message: `Ya existe la tech ${search.name}` };
  } catch (error) {
    throw error;
  }
}

module.exports = addTech;
