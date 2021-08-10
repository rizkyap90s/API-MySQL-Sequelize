const express = require("express");
const router = express.Router();

// import validators/middlewares
const { customerValidator } = require("../middlewares/validators/v_customers");

// import controllers
const Customer = require("../controllers/c_customers");

router.get("/", Customer.getAllCustomers);
router.get("/:id", Customer.getOneCustomer);
router.post("/", customerValidator, Customer.createCustomer);
router.put("/:id", customerValidator, Customer.updateCustomer);
router.delete("/:id", Customer.deleteCustomer);

module.exports = router;
