const { Schema, model } = require('mongoose');

const Tech = model(
  'tech',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Schema.Types.Mixed,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  })
);

module.exports = Tech;
