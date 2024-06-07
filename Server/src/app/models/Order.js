const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // cartId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Cart"
    // },
    cartInfo: {
      _id: {
        type: String
      },
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
          _id: {
            type: String
          }
        }
      ],
    },
    infoOrder: {
      fullName: String,
      mail: String,
      phone: String,
      address: String
    },
    statusOrder: {
      type: Number,
    },
    methodPayment: {
      type: String,
    },
  },
  { timestamps: true }
);

Order.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", Order);
