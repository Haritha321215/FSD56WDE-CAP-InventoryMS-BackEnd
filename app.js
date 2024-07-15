// require express
const express = require("express");

//require cors
const cors = require("cors");

//require cookie-parser
const cookieParser = require("cookie-parser");

// require morgan fpr logs
const morgan = require("morgan");

//import user router
const userRouter = require("./components/user/userRoutes");

// import category router
const categoryRouter = require("./components/category/categoryRoutes");

// import vendor router
const vendorRouter = require("./components/vendor/vendorRoutes");

// import product router
const productRouter = require("./components/product/productRoutes");

// import stock router
const stockRouter = require("./components/stock/stockRoutes");

// import order router
const orderRouter = require("./components/order/orderRoutes");

// import purchage order router
const purchaseOrderRouter = require("./components/purchaseOrder/purchaseOrderRoutes");

// import inventory router
const inventoryRouter = require("./components/inventory/inventoryRoutes");
const reportsRouter = require("./components/reports/reportsRoutes");



// // create an express application
const app = express();

// // we need cors for front end
// // npm i cors
// // need cookie parser also
// // npm i cookie-parser

//enable all cors requests
app.use(
  cors({
    origin: "https://fsd56wde-cap-inventoryms-frontend.netlify.app", // allow all origins
    // origin: "http://localhost:5173", // allow all origins
    // origin: "*", // allow all origins
    credentials: true,
  })
);

// use morgan to log requests to the console
app.use(morgan('dev'));

//use cookie parser
app.use(cookieParser());

// we need to enable the express application to parse json
app.use(express.json());

//define the end points
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/products", productRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/orders", orderRouter);
app.use("/api/purchaseorders", purchaseOrderRouter);
app.use("/api/inventories", inventoryRouter);
app.use("/api/reports", reportsRouter);






// // export the app module
module.exports = app;
