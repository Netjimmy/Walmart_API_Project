const mongoose = require("mongoose");
const { Schema } = mongoose;

const item = new Schema({
  itemId: String
});

module.exports = mongoose.model("Item", item);
