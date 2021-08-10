const express = require("express");
const router = express.Router();

const { goodValidator } = require("../middlewares/validators/v_goods");

const {
  getAllGoods,
  getGoodById,
  createGood,
  updateGood,
  deleteGoodById,
} = require("../controllers/c_goods");

router.get("/", getAllGoods);
router.get("/:id", getGoodById);
router.post("/", goodValidator, createGood);
router.put("/:id", goodValidator, updateGood);
router.delete("/:id", deleteGoodById);

module.exports = router;
