import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteproductcontroller,
  getproductcontroller,
  getsingleproductscontroller,
  productphotocontroller,
  updateproductcontroller,
} from "../controllers/productcontroller.js";
import ExpressFormidable from "express-formidable";

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
export default router;
