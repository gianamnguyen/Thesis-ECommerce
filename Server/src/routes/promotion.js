const express = require("express");
const router = express.Router();
const { authJwt } = require("../app/middleware");
const PromotionController = require("../app/controllers/PromotionController");

// ADMIN
/* CREATE PROMOTION */
router.post(
  "/create-promotion",
  [authJwt.verifyToken],
  PromotionController.createPromotion
)

/* GET PROMOTIONS */
router.post(
  "/get-promotions",
  [authJwt.verifyToken],
  PromotionController.getPromotions
)

/* GET DETAIL PROMOTION */
router.get(
  "/get-detail-promotion/:id",
  [authJwt.verifyToken],
  PromotionController.getDetail
)

/* UPDATE PROMOTION */
router.put(
  "/update-detail-promotion/:id",
  [authJwt.verifyToken],
  PromotionController.updatePromotion
)

/* DELETE PROMOTION */
router.delete(
  "/delete-promotion/:id",
  [authJwt.verifyToken],
  PromotionController.deletePromotion
)

// CLIENT
/* APPLY PROMOTION */
router.post(
  "/apply-promotion",
  [authJwt.verifyToken],
  PromotionController.applyPromotion
)

/* CANCEL PROMOTION */
router.post(
  "/cancel-promotion",
  [authJwt.verifyToken],
  PromotionController.cancelPromotion
)


module.exports = router;