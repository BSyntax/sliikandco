import asyncHandler from "express-async-handler";

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  res.status(200).json([]);
});

// @desc    Add to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Added to wishlist" });
});

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Removed from wishlist" });
});
