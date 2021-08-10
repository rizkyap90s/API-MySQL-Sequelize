const express = require("express");
const router = express.Router();

const {
  createTransactionValidator,
} = require("../middlewares/validators/v_transactions");
const {
  createTransaction,
  getDetailTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
} = require("../controllers/c_transactions");

router.get("/", getAllTransactions);
router.get("/:id", getDetailTransaction);
router.post("/", createTransactionValidator, createTransaction);
router.put("/:id", createTransactionValidator, updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
