const Attribute = require("../models/Attribute");

class AttributeController {
  async createAttribute(req, res, next) {
    try {
      const { ...rest } = req.body || {}
      const attribute = new Attribute(rest);
      const result = await attribute.save();
      res.json({
        retCode: 0,
        retText: "Create a new attribute successfully!",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  updateStatusAttribute(req, res, next) {
    const { attributeId } = req.body || {}
    Attribute.updateOne(
      {
        _id: attributeId
      },
      {
        $set: {
          "status": "publish"
        }
      }
    ).exec((err, records) => {
      if (err) {
        res.json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      return res.json({
        retCode: 0,
        retText: "Update attribute successfully!",
        retData: records,
      });
    })
  }

  getListAttributes(req, res, next) {
    Attribute.find({
      status: "publish"
    }
    ).exec((err, records) => {
      if (err) {
        res.json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      return res.json({
        retCode: 0,
        retText: "List of attributes",
        retData: records,
      });
    })
  }

  deleteAttribute(req, res, next) {
    const { attributeId } = req.query || {}

    Attribute.deleteOne({
      _id: attributeId
    }).exec((err, records) => {
      if (err) {
        res.json({
          retCode: 2,
          retText: "System error",
          retData: "Please try again later",
        });
        return
      }

      return res.json({
        retCode: 0,
        retText: "Delete attribute successfully",
        retData: records,
      });
    })
  }
}

module.exports = new AttributeController();