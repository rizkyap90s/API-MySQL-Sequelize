const express = require("express"); // Import express
const app = express(); // Make express app
const fileUpload = require("express-fileupload");

/* Import routes */
const customers = require("./routes/r_customers");
const transactions = require("./routes/r_transactions");
const goods = require("./routes/r_goods");
const suppliers = require("./routes/r_suppliers");

const errorHandler = require("./middlewares/errorHandler/error");

/* Enable req.body */
app.use(express.json()); // Enable req.body JSON
// Enable url-encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(express.static("public"));

/* Use routes */
app.use("/transactions", transactions);
app.use("/customers", customers);
app.use("/goods", goods);
app.use("/suppliers", suppliers);

app.use(errorHandler);

/* Running server */
app.listen(3000, () => console.log(`Server running on port 3000!`));
