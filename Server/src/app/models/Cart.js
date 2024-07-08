const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    totalPrice: {
      type: Number,
    },
    listProduct: [
      {
        productId: {
          type: String,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number
        },
        total: {
          type: Number
        },
      }
    ],
    promotionId: {
      type: Schema.Types.ObjectId,
      ref: "Promotion"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);
