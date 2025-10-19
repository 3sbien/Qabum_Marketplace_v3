import { dbConnect } from "@/lib/db";
const Product = require("@/models/Product");

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const {
        q = "",
        category = "",
        page = "1",
        limit = "12",
      } = req.query;

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
      const skip = (pageNum - 1) * limitNum;

      const filters = { isActive: true };
      if (q) {
        filters.$or = [
          { name: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { tags: { $regex: q, $options: "i" } },
        ];
      }
      if (category) filters.category = category;

      const [items, total] = await Promise.all([
        Product.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
        Product.countDocuments(filters),
      ]);

      return res.status(200).json({
        page: pageNum,
        limit: limitNum,
        total,
        items,
      });
    }

    // Otros métodos aún no permitidos aquí
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return res.status(500).json({ error: "Server error", detail: err?.message || String(err) });
  }
}
