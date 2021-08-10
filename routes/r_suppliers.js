const express = require("express");
const router = express.Router();

// import validators/middlewares
const { supplierValidator } = require("../middlewares/validators/v_suppliers");

// import controllers
const Supplier = require("../controllers/c_suppliers");

router.get("/", Supplier.getAllSuppliers);
router.get("/:id", Supplier.getOneSupplier);
router.post("/", supplierValidator, Supplier.createSupplier);
router.put("/:id", supplierValidator, Supplier.updateSupplier);
router.delete("/:id", Supplier.deleteSupplier);

module.exports = router;
