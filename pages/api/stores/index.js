// pages/api/stores/index.js
const { dbConnect } = require("@/lib/db");
const Store = require("@/models/Store");

// Intentamos cargar NextAuth solo si está disponible en tu proyecto
let getServerSession, authOptions;
try {
  ({ getServerSession } = require("next-auth/next"));
  ({ authOptions } = require("../auth/[...nextauth]")); // ajusta si tu archivo está en otra ruta
} catch (_) {
  // Si no existe NextAuth en tu repo, podrás habilitarlo después.
}

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

async function isAdmin(req, res) {
  if (!getServerSession || !authOptions) return false; // si no está NextAuth, desactivamos mutaciones
  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email?.toLowerCase();
  return !!email && ADMIN_EMAILS.includes(email);
}

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      // Listado básico de tiendas activas (para admin UI o consumo posterior)
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
      // Crear tienda, protegido para admins
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

      // Validaciones mínimas
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
}
