const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getData = () => { };

class CartController {
  // Create cart [POST]
  createCart(req, res, next) {
    const { userId, productId, quantity, price } = req.body;
    Cart.findOne({ userId }).exec((err, record) => {
      if (err) {
        res.status(500).json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      if (!record) {
        Product.findOne({ _id: productId })
          .exec(async (err, product) => {
            console.log("product", product)
            if (err) {
              res.status(500).json({
                retCode: 2,
                retText: "System errors",
                retData: "Please try again later",
              });
              return
            }

            if (!product) {
              res.json({
                retCode: 1,
                retText: "Product does not exist!",
                retData: null,
              });
              return
            }

            const payload = {
              userId,
              totalPrice: product.price,
              listProduct: [
                {
                  productId,
                  product: product,
                  quantity,
                  total: product.price
                }
              ]
            }
            const cart = new Cart(payload);
            const result = await cart.save();
            res.json({
              retCode: 0,
              retText: "Push product into cart successfully!",
              retData: result,
            });
            return
          })
      } else {
        const isExistProductInCart = record.listProduct.find(item => item.productId === productId)
        if (isExistProductInCart) {
          Cart.updateOne(
            {
              userId: userId,
              "listProduct.productId": productId
            },
            {
              $set: {
                "totalPrice": record.totalPrice + price,
                "listProduct.$.quantity": isExistProductInCart.quantity + 1,
                "listProduct.$.total": isExistProductInCart.total + price
              }
            }
          ).exec((err, update) => {
            if (err) {
              res.status(500).json({
                retCode: 2,
                retText: "System error",
                retData: "Please try again later",
              });
              return
            }

            if (!!update?.acknowledged) {
              Cart.findOne({ userId }).populate("listProduct.product").exec((err, record) => {
                if (err) {
                  res.json({
                    retCode: 2,
                    retText: "System error",
                    retData: "Please try again later",
                  });
                  return
                }

                if (!record) {
                  res.json({
                    retCode: 1,
                    retText: "Empty cart",
                    retData: null,
                  });
                  return
                }

                res.json({
                  retCode: 0,
                  retText: "Update quantity in cart successfully!",
                  retData: record,
                });
                return
              })
            }

            // res.json({
            //   retCode: 0,
            //   retText: "Update quantity in cart successfully!",
            //   retData: update,
            // })
            // return
          })
        } else {
          Cart.updateOne(
            {
              userId,
            },
            {
              $set: {
                totalPrice: record.totalPrice + price,
              },
              $push: {
                listProduct: {
                  productId,
                  product: productId,
                  quantity,
                  total: price
                }
              }
            }
          ).exec((err, update) => {
            if (err) {
              res.status(500).json({
                retCode: 2,
                retText: "System error",
                retData: "Please try again later",
              });
              return
            }

            if (!!update?.acknowledged) {
              Cart.findOne({ userId }).populate("listProduct.product").exec((err, record) => {
                if (err) {
                  res.json({
                    retCode: 2,
                    retText: "System error",
                    retData: "Please try again later",
                  });
                  return
                }

                if (!record) {
                  res.json({
                    retCode: 1,
                    retText: "Empty cart",
                    retData: null,
                  });
                  return
                }

                res.json({
                  retCode: 0,
                  retText: "Push new product in cart successfully!",
                  retData: record,
                });
                return
              })
            }

            // res.json({
            //   retCode: 0,
            //   retText: "Push new product into cart successfully!",
            //   retData: update,
            // })
            // return
          })
        }
      }
    })
  }

  getCart(req, res, next) {
    const { userId } = req.body || {}
    Cart.findOne({ userId }).populate("listProduct.product").exec((err, record) => {
      if (err) {
        res.json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      if (!record) {
        res.json({
          retCode: 1,
          retText: "Empty cart",
          retData: null,
        });
        return
      }

      res.json({
        retCode: 0,
        retText: "List product in cart",
        retData: record,
      });
    })
  }

  deleteItemCart(req, res, next) {
    const { userId, productId } = req.body;
    Cart.findOne({ userId }).exec((err, record) => {
      if (err) {
        res.status(500).json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      if (!record) {
        res.status(404).json({
          retCode: 2,
          retText: "Cart not found",
          retData: null,
        });
        return
      }

      Cart.updateOne(
        {
          userId
        },
        {
          $set: {
            totalPrice: record.totalPrice - record.listProduct.find(item => item.productId === productId).total
          },
          $pull: {
            listProduct: {
              productId
            }
          }
        }
      ).exec((err, update) => {
        if (err) {
          res.status(500).json({
            retCode: 2,
            retText: "System error",
            retData: "Please try again later",
          });
          return
        }

        if (!!update?.acknowledged) {
          Cart.findOne({ userId }).populate("listProduct.product").exec((err, record) => {
            if (err) {
              res.json({
                retCode: 2,
                retText: "System error",
                retData: "Please try again later",
              });
              return
            }

            if (!record) {
              res.json({
                retCode: 1,
                retText: "Empty cart",
                retData: null,
              });
              return
            }

            res.json({
              retCode: 0,
              retText: "Delete one item in cart successfully!",
              retData: record,
            });
            return
          })
        }

        // res.json({
        //   retCode: 0,
        //   retText: "Delete one item in cart successfully!",
        //   retData: update,
        // })
        // return
      })
    })
  }

  removeOneItemInCart(req, res, next) {
    const { userId, productId, price } = req.body || {}
    Cart.findOne({ userId }).exec((err, record) => {
      if (err) {
        res.status(500).json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      if (!record) {
        res.status(404).json({
          retCode: 2,
          retText: "Cart not found",
          retData: null,
        });
      }

      Cart.updateOne(
        {
          userId: userId,
          "listProduct.productId": productId
        },
        {
          $set: {
            "totalPrice": record.totalPrice - price,
            "listProduct.$.quantity": record.listProduct.find(item => item.productId === productId).quantity - 1,
            "listProduct.$.total": record.listProduct.find(item => item.productId === productId).total - price
          }
        }
      ).exec((err, update) => {
        if (err) {
          res.status(500).json({
            retCode: 2,
            retText: "System error",
            retData: "Please try again later",
          });
          return
        }

        res.json({
          retCode: 0,
          retText: "Update quantity successfully!",
          retData: update,
        })
        return
      })
    })
  }

  async checkCartExist(req, res, next) {
    const { userId } = req.body;
    try {
      const data = await Cart.findOne({ userId });
      if (!!data) {
        res.json({
          retCode: 0,
          retText: "Users have already cart exist",
          retData: true,
        });
      } else {
        res.json({
          retCode: 1,
          retText: "Users have not already cart exist",
          retData: false,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new CartController();
