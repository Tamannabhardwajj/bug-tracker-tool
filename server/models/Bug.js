const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
  assignedTo: String,
});

module.exports = mongoose.model("Bug", bugSchema);
