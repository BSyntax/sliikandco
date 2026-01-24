import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toLocaleDateString("en-US"),
    },
    recommend: {
      type: Boolean,
      default: false,
    },
    images: [String],
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sizesAvailable: [String],
    sizeType: String,
    colors: [{ hex: String, name: String }],
    gender: String,
    isNew: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    sku: String,
    gallery: [String],
    tags: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
