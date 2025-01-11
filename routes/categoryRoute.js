import expres from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categorycontroller, createCategoryController, deleteCategoryController, singlecategorycontroller, updatecategorycontroller} from '../controllers/categoryController.js';

const router=expres.Router();


//routes category create
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updatecategorycontroller)

//get all category
router.get("/categorys",categorycontroller)

//get single category
router.get("/single-category/:slug", singlecategorycontroller)

//delete 

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);



export default router