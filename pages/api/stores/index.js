// pages/api/stores/index.js
const { dbConnect } = require("../../../lib/db");
const Store = require("../../../models/Store");

// Cargamos NextAuth solo si está disponible
let getServerSession, authOptions;
try {
  ({ getServerSession } = require("next-auth/next"));
  ({ authOptions } = require("../auth/[...nextauth]")); // ruta relativa correcta
} catch (_) {
  // Si no existe NextAuth, las mutaciones quedarán deshabilitadas
}

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

async function isAdmin(req, res) {
  if (!getServerSession || !authOptions) return false;
  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email?.toLowerCase();
  return !!email && ADMIN_EMAILS.includes(email);
}

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
          { description: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
        ];
      }
      if (category) filters.category = category;

      const [items, total] = await Promise.all([
        Store.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
        Store.countDocuments(filters),
      ]);

      return res.status(200).json({ page: pageNum, limit: limitNum, total, items });
    }

    if (req.method === "POST") {
      if (!(await isAdmin(req, res))) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const {
        name,
        description = "",
        category,
        email,
        website = "",
        phone,
        location,
        publicLocation = true,
        image = "",
        defaultCurrency = "GBP",
        platformFeePercentage = 0,
        isActive = true,
      } = req.body || {};

      if (!name || !category || !email || !phone || !location) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const payload = {
        name: String(name).trim(),
        description: String(description || ""),
        category: String(category).trim(),
        email: String(email).trim(),
        website: String(website || ""),
        phone: String(phone).trim(),
        location: String(location).trim(),
        publicLocation: !!publicLocation,
        image: String(image || ""),
        defaultCurrency: String(defaultCurrency || "GBP").trim(),
        platformFeePercentage: Number(platformFeePercentage) || 0,
        isActive: !!isActive,
      };

      const created = await Store.create(payload);
      return res.status(201).json(created);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("API /stores error:", err);
    return res.status(500).json({ error: "Server error", detail: err?.message || String(err) });
  }
};
