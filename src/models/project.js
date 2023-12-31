const { Schema, model } = require('mongoose');

const Project = model(
  'project',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: String,
        required: true,
      },
    ],
    favorite: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: Schema.Types.Mixed,
      required: true,
    },
    images: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    type: {
      type: String,
      lowercase: true,
      enum: ['full-stack', 'back-end', 'front-end', 'otros'],
    },
    github: {
      type: String,
      required: true,
    },
    deploy: {
      type: String,
    },
    docs: {
      type: String,
    },
    techs: [
      {
        ref: 'tech',
        type: Schema.Types.ObjectId,
      },
    ],
  })
);

module.exports = Project;
