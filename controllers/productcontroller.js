import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import fs from "fs";

export const createproductcontroller = async (req, res) => {
  try {
    const { name, description, price, category, quantity, slug, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !slug:
        return res.status(500).send({ error: "slug is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and les then 10 mb" });
    }

    const products = new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(200).send({
      message: "product created successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

export const getproductcontroller = async (req, res) => {
  try {
    const product = await ProductModel.find({}).select("-photo").limit(12).sort({createdAt:-1});
    res.status(200).send({
        success: true,
        totalcount:product.length,
      message: "All product Displayed",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
