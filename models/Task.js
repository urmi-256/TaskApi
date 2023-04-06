const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: Number, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Task', taskSchema);