import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreetokencontroller,
  createProductController,
  deleteproductcontroller,
  getproductcontroller,
  getsingleproductscontroller,
  paymentcontroller,
  productcategorycontroller,
  productCountController,
  productFiltersController,
  productpagecontroller,
  productphotocontroller,
  releatedproductcontroller,
  searchproductcontroller,
  updateproductcontroller,
} from "../controllers/productcontroller.js";
import ExpressFormidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

//get products
router.get("/getproducts", getproductcontroller);

//single products
router.get("/single-products/:slug", getsingleproductscontroller);

//delete product
router.delete("/deleteproduct/:pid", deleteproductcontroller);

//get photo

router.get("/photo-product/:pid", productphotocontroller);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateproductcontroller
);

router.post("/product-filters", productFiltersController);

router.get("/productcount", productCountController);

router.get("/product-list/:page", productpagecontroller);

router.get("/searchproduct/:keyword", searchproductcontroller);

router.get("/releated-product/:pid/:cid", releatedproductcontroller);
router.get("/productcat/:slug", productcategorycontroller);

router.get("/braintree/token",braintreetokencontroller)

router.post("/braintree/payment",requireSignIn,paymentcontroller)

export default router;
