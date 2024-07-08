const Promotion = require("../models/Promotion")
const Order = require("../models/Order")
const Cart = require("../models/Cart")

class PromotionController {
  applyPromotion(req, res, next) {
    const { cartId, promotionId } = req.body || {}

    const handleApplyPromotion = (totalPrice, discount) => {
      const discountAmount = totalPrice * (discount / 100)
      const discountedPrice = totalPrice - discountAmount
      return discountedPrice
    }

    Promotion.findById({ _id: promotionId }).exec((err, promotion) => {
      if (err) {
        res.status(404).json({
          retCode: 1,
          retText: "Promotion not found!",
          retData: null
        })
        return
      }

      if (promotion?.quantity > 0) {
        Cart.findById({ _id: cartId }).exec((err, cart) => {
          if (err) {
            res.status(404).json({
              retCode: 1,
              retText: "Cart not found!",
              retData: null
            })
            return
          }

          Cart.updateOne(
            {
              _id: cartId,
            },
            {
              $set: {
                totalPrice: handleApplyPromotion(cart?.totalPrice, promotion?.discount),
                promotionId: promotionId
              }
            }
          ).exec((err, update) => {
            if (err) {
              res.status(404).json({
                retCode: 1,
                retText: "Cart not found!",
                retData: null
              })
              return
            }

            Promotion.updateOne(
              { _id: promotion?._id },
              {
                $set: {
                  quantity: promotion?.quantity - 1
                }
              }
            ).exec((err, updateQuantity) => {
              if (err) {
                res.status(404).json({
                  retCode: 1,
                  retText: "Promotion not found!",
                  retData: null
                })
                return
              }

              res.status(200).json({
                retCode: 0,
                retText: "Applying promotion successfully!",
                retData: updateQuantity
              })
            })
          })
        })
      } else {
        res.status(400).json({
          retCode: 1,
          retText: "Promotion is not available!",
          retData: null
        })
        return
      }
    })
  }

  async createPromotion(req, res, next) {
    // console.log(req)
    try {
      const promotion = new Promotion(req.body);
      const result = await promotion.save();
      res.json({
        retCode: 0,
        retText: "Create a new promotion successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  getPromotions(req, res, next) {
    // console.log("req", req);
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };

    const {
      page,
      size,
      promotionSearch,
    } = req.body;

    const filter = {};

    if (promotionSearch) {
      filter.name = { $regex: new RegExp(promotionSearch), $options: "i" };
    }

    const { limit, offset } = getPagination(page, size);

    Promotion.paginate(filter, { offset, limit })
      .then((data) => {
        res.json({
          retCode: 0,
          retText: "List of promotion",
          retData: {
            totalItems: data.totalDocs,
            promotions: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  // [GET] in detail
  async getDetail(req, res, next) {
    try {
      const result = await Promotion.findById(req.params.id).exec();
      res.json({
        retCode: 0,
        retText: "Detail promotion",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [PUT]
  async updatePromotion(req, res, next) {
    try {
      const promotionDetail = await Promotion.findById(req.params.id).exec();
      promotionDetail.set(req.body);
      const result = await promotionDetail.save();
      res.json({
        retCode: 0,
        retText: "Update promotion successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [DELETE]
  async deletePromotion(req, res, next) {
    try {
      const result = await Promotion.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Delete promotion successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new PromotionController