import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createproductcontroller, getproductcontroller } from '../controllers/productcontroller.js';
import ExpressFormidable from 'express-formidable';

const router=express.Router();

//create product
router.post('/create-product',requireSignIn,isAdmin,ExpressFormidable(),createproductcontroller)

//get products
router.get('/getproducts',getproductcontroller)

export default router;