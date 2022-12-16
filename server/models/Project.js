const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  contact: {
    type:String,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  owner: {
    type: String,
    trim: true,
  },
  developers: {
    type: String,
    trim: true,
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
