const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  name: { type: String, required: true, minLength: 2 },
}, { timestamps: true });

// Export model
module.exports = mongoose.model('Message', MessageSchema);
