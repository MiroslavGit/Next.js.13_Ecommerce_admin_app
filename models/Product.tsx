import { Schema, model, models } from "mongoose";

const ProductScheam = new Schema({
  title: { type: String, required: true },
  description: String,
  images: [{ type: String }],
  price: { type: Number, required: true }
});

export const Product = models.Product || model("Product", ProductScheam);