import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";


export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation for name
    if (!name) {
      return res.status(400).send({ message: "Category name is required" });
    }

    // Check if category already exists
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(409).send({
        success: false,
        message: "Category already exists",
      });
    }

    // Create and save new category
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    // Successful response
    return res.status(201).send({
      success: true,
      message: "New category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error in createCategoryController:", error);
    return res.status(500).send({
      success: false,
      message: "Error creating category",
      error: error.message || error,
    });
  }
};

//update category
export const updatecategorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      message: "update category successfull",
      category,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error while updating category",
    });
  }
};

//get all cattg

export const categorycontroller = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All category Displayed",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all category",
      error,
    });
  }
};

//single

export const singlecategorycontroller = async (req, res) => {
  try {
    const singlecategory = await CategoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "get category",
      singlecategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting single category",
      error,
    });
  }
};

// delte controller
  export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findById(id);
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category already deleted or does not exist.",
        });
      }
      
      await CategoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };
  