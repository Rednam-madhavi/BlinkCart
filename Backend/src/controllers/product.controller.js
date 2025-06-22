import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Utility function to build product filters
const buildProductFilters = (query) => {
  const filters = {};
  const {
    category,
    minPrice,
    maxPrice,
    inStock,
    rating,
    search,
    ...otherFilters
  } = query;

  if (category) filters.category = { $in: category.split(",") };
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }
  if (inStock === "true") filters.stock = { $gt: 0 };
  if (rating) filters.rating = { $gte: Number(rating) };
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Add other filters dynamically
  Object.entries(otherFilters).forEach(([key, value]) => {
    if (value) filters[key] = value;
  });

  return filters;
};

// @desc   Create new product
// @route  POST /api/v1/products
// @access Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    stock,
    brand,
    features,
  } = req.body;

  if (
    [name, description, price, category, stock].some(
      (field) => !field || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Handle image uploads
  const imageFiles = req.files?.images || [];
  const imageUrls = [];

  for (const file of imageFiles) {
    const result = await uploadOnCloudinary(file.path);
    if (result?.url) {
      imageUrls.push({
        url: result.url,
        publicId: result.public_id,
      });
    }
  }

  if (imageUrls.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    category: category.split(",").map((c) => c.trim()),
    stock: Number(stock),
    brand,
    images: imageUrls,
    features: features ? JSON.parse(features) : [],
    seller: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

// @desc   Get all products
// @route  GET /api/v1/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = "-createdAt",
    ...queryParams
  } = req.query;

  // Build filters
  const filters = buildProductFilters(queryParams);

  // Sorting
  const sortOptions = {};
  sort.split(",").forEach((sortOption) => {
    const direction = sortOption.startsWith("-") ? -1 : 1;
    const field = sortOption.replace(/^-/, "");
    sortOptions[field] = direction;
  });

  // Pagination
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: sortOptions,
    lean: true,
  };

  // Execute query with pagination
  const products = await Product.paginate(filters, options);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products: products.docs,
        pagination: {
          totalItems: products.totalDocs,
          totalPages: products.totalPages,
          currentPage: products.page,
          itemsPerPage: products.limit,
          hasNextPage: products.hasNextPage,
          hasPrevPage: products.hasPrevPage,
        },
      },
      "Products fetched successfully"
    )
  );
});

// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id).populate(
    "seller",
    "username email avatar"
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Increment views
  product.views += 1;
  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

// @desc   Update product
// @route  PATCH /api/v1/products/:id
// @access Admin/Seller
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const imageFiles = req.files?.images || [];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Check ownership (admin can bypass)
  if (
    req.user.role !== "admin" &&
    product.seller.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Not authorized to update this product");
  }

  // Handle image updates
  if (imageFiles.length > 0) {
    const newImages = [];
    for (const file of imageFiles) {
      const result = await uploadOnCloudinary(file.path);
      if (result?.url) {
        newImages.push({
          url: result.url,
          publicId: result.public_id,
        });
      }
    }
    updates.images = [...product.images, ...newImages];
  }

  // Convert stringified fields
  if (updates.features) {
    updates.features = JSON.parse(updates.features);
  }
  if (updates.category) {
    updates.category = updates.category.split(",").map((c) => c.trim());
  }

  // Numeric fields
  if (updates.price) updates.price = Number(updates.price);
  if (updates.stock) updates.stock = Number(updates.stock);

  const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Admin/Seller
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Check ownership
  if (
    req.user.role !== "admin" &&
    product.seller.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Not authorized to delete this product");
  }

  // TODO: Delete images from Cloudinary (using product.images.publicId)

  await Product.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

// @desc   Get products by category
// @route  GET /api/v1/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { limit = 10 } = req.query;

  const products = await Product.find({ category })
    .sort("-createdAt")
    .limit(Number(limit));

  return res
    .status(200)
    .json(
      new ApiResponse(200, products, "Category products fetched successfully")
    );
});

// @desc   Get featured products
// @route  GET /api/v1/products/featured
// @access Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ isFeatured: true })
    .sort("-createdAt")
    .limit(Number(limit));

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Featured products fetched successfully"));
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts,
};