const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Only the User can see his Notes
const NoteSchema = new Schema({
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  });
  
  module.exports = mongoose.model('Note', NoteSchema);