import mongoose from "mongoose";

const orderschema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId reference
        ref: "Product",
      },
    ],
    payment: {
      type: Object, // Use `Object` or `Mixed` for flexible structures
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId reference
      ref: "users",
    },
    status: {
      type: String, // Added the `type` field
      default: "Not Processed", // Fixed typo in default value
      enum: ["Not Processed", "Shipped", "Processing", "Delivered", "Cancelled"], // Fixed typo in enum values
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", orderschema);
