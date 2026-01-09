import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: String,
    rating: Number,
    date: String,
    comment: String,
    recommend: Boolean,
    images: [String],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    price: Number,
    sizesAvailable: [String],
    sizeType: String,
    colors: [{ hex: String, name: String }],
    category: String,
    gender: String,
    brand: String,
    description: String,
    isNew: Boolean,
    isOnSale: Boolean,
    discountPercent: Number,
    inStock: Boolean,
    rating: Number,
    sku: String,
    image: String,
    gallery: [String],
    tags: [String],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
