// pages/api/stores/index.js
const { dbConnect } = require("../../../lib/db");
const Store = require("../../../models/Store");

const ALLOWED_CATEGORIES = [
  "Local Shops",
  "Coffee & Food",
  "Creative Services",
  "Beauty & Wellness",
  "Ethical & Eco Brands",
];

module.exports = async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const { q = "", category = "", page = "1", limit = "12" } = req.query;

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
      const skip = (pageNum - 1) * limitNum;

      const filters = { isActive: true };
      if (q) {
        filters.$or = [
          { name: { $regex: q, $options: "i" } },
          { legalName: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { categories: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
          { ruc: { $regex: q, $options: "i" } },
        ];
      }
      if (category) filters.categories = category; // filtra por una categoría concreta

      const [items, total] = await Promise.all([
        Store.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
        Store.countDocuments(filters),
      ]);

      return res.status(200).json({ page: pageNum, limit: limitNum, total, items });
    }

    if (req.method === "POST") {
      // Nota: más adelante bloquearemos a solo ADMIN con next-auth.
      const {
        name,
        legalName = "",
        description = "",
        categories = [],
        ruc,
        establishmentNumber = "001",
        email,
        website = "",
        phone,
        location,
        publicLocation = true,
        image = "",
        platformFeePercentage = 0,
        isActive = true,
      } = req.body || {};

      // Validaciones mínimas (Ecuador)
      if (!name || !email || !phone || !location || !ruc) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (!/^\d{13}$/.test(String(ruc))) {
        return res.status(400).json({ error: "RUC must be 13 digits" });
      }
      if (!/^\d{3}$/.test(String(establishmentNumber || ""))) {
        return res.status(400).json({ error: "Establishment must be a 3-digit code like 001" });
      }
      if (!Array.isArray(categories) || categories.length < 1 || categories.length > 2) {
        return res.status(400).json({ error: "Select between 1 and 2 categories" });
      }
      for (const c of categories) {
        if (!ALLOWED_CATEGORIES.includes(c)) {
          return res.status(400).json({ error: `Invalid category: ${c}` });
        }
      }
      if (new Set(categories).size !== categories.length) {
        return res.status(400).json({ error: "Duplicate categories are not allowed" });
      }

      const payload = {
        name: String(name).trim(),
        legalName: String(legalName || "").trim(),
        description: String(description || ""),
        categories,
        ruc: String(ruc),
        establishmentNumber: String(establishmentNumber),
        email: String(email).trim(),
        website: String(website || ""),
        phone: String(phone).trim(),
        location: String(location).trim(),
        publicLocation: !!publicLocation,
        image: String(image || ""),
        country: "EC",
        defaultCurrency: "USD",
        ivaRate: 0.15,
        platformFeePercentage: Number(platformFeePercentage) || 0,
        isActive: !!isActive,
      };

      try {
        const created = await Store.create(payload);
        return res.status(201).json(created);
      } catch (e) {
        if (e?.code === 11000) {
          return res.status(400).json({ error: "Store with this RUC and establishment already exists" });
        }
        return res.status(400).json({ error: "Error creating store", detail: e?.message || String(e) });
      }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("API /stores error:", err);
    return res.status(500).json({ error: "Server error", detail: err?.message || String(err) });
  }
};
