const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "GBP" },
    images: { type: [String], default: [] }, // URLs de Cloudinary
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], default: [], index: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  },
  {
    timestamps: true, // guarda createdAt y updatedAt en UTC
  }
);

module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
