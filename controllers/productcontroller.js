import ProductModel from "../models/ProductModel.js";

import slugify from "slugify";
import fs from "fs";
import CategoryModel from "../models/CategoryModel.js";

// import braintree from "braintree";
// import ordermodel from "../models/ordermodel.js";

// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANTID,
//   publicKey: process.env.BRAINTREE_MERCHANTID,
//   privateKey: process.env.BRAINTREE_PRIVATEKEY,
// });

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

export const getproductcontroller = async (req, res) => {
  try {
    const product = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalcount: product.length,
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

export const getsingleproductscontroller = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      message: "Get the products",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "soemthing went wrong",
      error,
    });
  }
};

export const productphotocontroller = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong during getting product photo",
      error,
    });
  }
};

export const deleteproductcontroller = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      message: "Deletion successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong deletion",
      success: false,
      error,
    });
  }
};

export const updateproductcontroller = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const productpagecontroller = async (req, res) => {
  try {
    const perpage = 3;
    const page = req.params.page ? req.params.page : 1;
    const product = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "get",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "something went wrong",
      success: false,
    });
  }
};

export const searchproductcontroller = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in search product api",
      success: false,
      error,
    });
  }
};

export const releatedproductcontroller = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      message: "get simiar products",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in getting similar product",
      success: false,
      error,
    });
  }
};

export const productcategorycontroller = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const product = await ProductModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      product,
    });
  } catch (error) {
    console.group(error);
    res.status(400).send({
      success: false,
      message: "error while getting product",
    });
  }
};

export const braintreetokencontroller = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, resp) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong wgile doing payemnt",
    });
  }
};

export const paymentcontroller = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newtrans = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (result) {
          const order = new ordermodel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(err);
        }
      }
    );
  } catch (error) {
    console.log(err);
  }
};
