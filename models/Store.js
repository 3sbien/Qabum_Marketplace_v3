const mongoose = require("mongoose");

/**
 * Store (Negocio) para Ecuador con hasta 2 categorías
 * - RUC obligatorio (13 dígitos)
 * - Establecimiento SRI (3 dígitos) p. ej. "001"
 * - Moneda por defecto USD
 * - IVA por defecto 0.15 (15 %)
 * - Máximo 2 categorías elegidas de la lista aprobada
 * - Índice único: (ruc + establishmentNumber)
 */

const ALLOWED_CATEGORIES = [
  "Local Shops",
  "Coffee & Food",
  "Creative Services",
  "Beauty & Wellness",
  "Ethical & Eco Brands",
];

const StoreSchema = new mongoose.Schema(
  {
    // Identidad y contacto
    name: { type: String, required: true, trim: true },
    legalName: { type: String, default: "", trim: true }, // Razón social (opcional)
    description: { type: String, default: "" },

    // ECUADOR: Identificación fiscal
    ruc: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{13}$/, "RUC must be 13 digits"],
    },
    establishmentNumber: {
      type: String, // "001", "002", etc.
      default: "001",
      trim: true,
      match: [/^\d{3}$/, "Establishment must be a 3-digit code like 001"],
    },

    // Contacto
    email: { type: String, required: true, trim: true },
    website: { type: String, default: "" },
    phone: { type: String, required: true, trim: true },

    // Ubicación
    location: { type: String, required: true, trim: true },
    publicLocation: { type: Boolean, default: true },

    // Imagen (URL)
    image: { type: String, default: "" },

    // País/moneda/impuestos
    country: { type: String, default: "EC" },
    defaultCurrency: { type: String, default: "USD" }, // Ecuador USD
    ivaRate: { type: Number, default: 0.15, min: 0, max: 1 }, // 15 %
    platformFeePercentage: { type: Number, default: 0.0, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },

    // CATEGORÍAS: hasta 2 de la lista aprobada
    categories: {
      type: [String],
      default: [],
      validate: [
        {
          validator: function (arr) {
            return Array.isArray(arr) && arr.length >= 1 && arr.length <= 2;
          },
          message: "Select between 1 and 2 categories",
        },
        {
          validator: function (arr) {
            return arr.every((c) => ALLOWED_CATEGORIES.includes(c));
          },
          message: "Invalid category found",
        },
        {
          validator: function (arr) {
            return new Set(arr).size === arr.length;
          },
          message: "Duplicate categories are not allowed",
        },
      ],
      index: true,
    },

    // Métricas automáticas
    lastSaleAt: { type: Date, default: null }, // UTC
    totalSales: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true, // createdAt / updatedAt en UTC
  }
);

// Índice único por RUC + establecimiento
StoreSchema.index({ ruc: 1, establishmentNumber: 1 }, { unique: true });

module.exports = mongoose.models.Store || mongoose.model("Store", StoreSchema);
