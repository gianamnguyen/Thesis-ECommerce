const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Promotion = new Schema(
  {
    status: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    discount: {
      type: Number
    },
    image: {
      type: String
    },
    quantity: {
      type: Number
    }
  },
  { timestamps: true }
);

Promotion.plugin(mongoosePaginate);

module.exports = mongoose.model("Promotion", Promotion);
