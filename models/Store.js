const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    // Una de las 5 categorías validadas
    category: {
      type: String,
      required: true,
      enum: [
        "Local Shops",
        "Coffee & Food",
        "Creative Services",
        "Beauty & Wellness",
        "Ethical & Eco Brands",
      ],
    },

    // Contacto obligatorio
    email: { type: String, required: true, trim: true },
    website: { type: String, default: "" },
    phone: { type: String, required: true, trim: true },

    // Ubicación obligatoria con opción de visibilidad pública
    location: { type: String, required: true, trim: true },
    publicLocation: { type: Boolean, default: true },

    // Imagen principal (URL de Cloudinary)
    image: { type: String, default: "" },

    // Configuración operativa
    defaultCurrency: { type: String, default: "GBP" }, // editable solo por admin
    platformFeePercentage: { type: Number, default: 0.0, min: 0, max: 100 }, // “margen ético operativo” por tienda
    isActive: { type: Boolean, default: true },

    // Métricas automáticas
    lastSaleAt: { type: Date, default: null }, // UTC ISO por defecto
    totalSales: { type: Number, default: 0, min: 0 }, // acumuladas dentro del sistema
  },
  {
    timestamps: true, // createdAt y updatedAt en UTC
  }
);

module.exports = mongoose.models.Store || mongoose.model("Store", StoreSchema);
