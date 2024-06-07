const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const { getPagination } = require("../../utils");

class OrderController {
  createOrder(req, res, next) {
    // statusOrder: gom 3 trang thai: 0 la cho thanh toan, 1 la thanh toan thanh cong, 2 la huy giao dich

    // methodPayment: gom 2 trang thai: 0 la thanh toan online, 1 la thanh toan truc tiep

    // methodReiceive: gom 2 trang thai: 0 la giao hang online, 1 la nhan hang truc tiep

    const { userId, cartInfo } = req.body || {}

    Cart.findOne({ userId }).exec(async (err, record) => {
      if (err) {
        res.status(500).json({
          retCode: 2,
          retText: "System error. Please! try again later",
          retData: null
        })
        return
      }

      if (!record) {
        res.status(500).json({
          retCode: 2,
          retText: "Cart not found.",
          retData: null
        })
        return
      }

      try {
        const order = new Order(req.body);
        const result = await order.save();

        Cart.deleteOne({ _id: cartInfo?._id }).exec((err, record) => {

          if (err) {
            res.status(500).json({
              retCode: 2,
              retText: "System error. Please! try again later",
              retData: null
            })
            return
          }

          if (!record) {
            res.status(500).json({
              retCode: 2,
              retText: "Cart not found.",
              retData: null
            })
            return
          }

          res.status(200).json({
            retCode: 0,
            retText: "Create order successfully",
            retData: result,
          });
          return
        })

      } catch (error) {
        res.status(500).send(error);
      }
    })

  }

  async getListOrder(req, res, next) {
    const { page, size, code } = req.body;

    const filter = {};

    if (code) {
      filter.name = { $regex: new RegExp(code), $options: "i" };
    }

    const { limit, offset } = getPagination(page, size);

    Order.paginate(
      filter,
      {
        offset,
        limit,
        sort: {
          createdAt: -1
        },
        populate: [
          {
            path: "cartInfo",
            populate: {
              path: "listProduct.product",
              populate: {
                path: "attributes.attributeId"
              }
            }
          }
        ]
      }
    )
      .then(async (data) => {
        const { totalDocs, docs, totalPages, page } = data || {};
        res.json({
          retCode: 0,
          retText: "List order admin",
          retData: {
            totalItems: totalDocs,
            orders: docs,
            totalPages: totalPages,
            currentPage: page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          retCode: 2,
          retText: err.message,
          retData: null
        });
      });
  }

  async getDetailOrder(req, res, next) {
    const orderId = req.params
    // res.json(orderId)
    Order
      .findOne({ _id: orderId?.id })
      .populate([
        {
          path: "cartInfo",
          populate: {
            path: "listProduct.product",
            populate: {
              path: "attributes.attributeId"
            }
          }
        }
      ])
      .exec((err, record) => {
        if (err) {
          res.status(500).json({
            retCode: 2,
            retText: "System error",
            retData: null,
          })
        }

        if (!record) {
          res.status(404).json({
            retCode: 1,
            retText: "Order not found",
            retData: null
          })
        }

        return res.status(200).json({
          retCode: 0,
          retText: "Order detail",
          retData: record
        })
      })
  }

  async deleteDetailOrder(req, res, next) {
    try {
      const result = await Order.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateOrder(req, res, next) {
    const orderId = req.params.id
    const { statusOrder } = req.body || {}
    Order.updateOne(
      {
        _id: orderId
      },
      {
        $set: {
          statusOrder
        }
      }
    ).exec((err, record) => {
      if (err) {
        res.status(500).json({
          retCode: 2,
          retText: "System error",
          retData: null
        })
        return
      }

      if (!record) {
        res.status(404).json({
          retCode: 1,
          retText: "Order not found",
          retData: null
        })
        return
      }

      return res.status(200).json({
        retCode: 0,
        retText: "Update status order successfully!",
        retData: null
      })
    })
  }

  async getListOrderClient(req, res, next) {
    const { page, size, code, userId } = req.body;

    const filter = {
      userId
    };

    if (code) {
      filter.name = { $regex: new RegExp(code), $options: "i" };
    }

    const { limit, offset } = getPagination(page, size);

    Order.paginate(
      filter,
      {
        offset,
        limit,
        sort: {
          createdAt: -1
        },
        populate: [
          {
            path: "cartInfo",
            populate: {
              path: "listProduct.product",
              populate: {
                path: "attributes.attributeId"
              }
            }
          }
        ]
      }
    )
      .then(async (data) => {
        const { totalDocs, docs, totalPages, page } = data || {};
        res.json({
          retCode: 0,
          retText: "List order client",
          retData: {
            totalItems: totalDocs,
            orders: docs,
            totalPages: totalPages,
            currentPage: page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          retCode: 2,
          retText: err.message,
          retData: null
        });
      });
  }
}

module.exports = new OrderController();
