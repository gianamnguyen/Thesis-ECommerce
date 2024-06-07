const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Attribute = new Schema(
  {
    name: String,
    status: String,
    description: String
  },
  { timestamps: true }
)

module.exports = mongoose.model("Attribute", Attribute);