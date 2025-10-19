import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";
  const category = searchParams.get("category")?.trim() || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
  const skip = (page - 1) * limit;

  const filters: any = { isActive: true };
  if (q) filters.$or = [
    { name: { $regex: q, $options: "i" } },
    { description: { $regex: q, $options: "i" } },
    { tags: { $regex: q, $options: "i" } },
  ];
  if (category) filters.category = category;

  const [items, total] = await Promise.all([
    Product.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filters)
  ]);

  return NextResponse.json({ page, limit, total, items });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();

  if (!body?.name || !body?.slug || !body?.category || typeof body?.price !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    name: String(body.name).trim(),
    slug: String(body.slug).trim().toLowerCase(),
    description: String(body.description || ""),
    category: String(body.category).trim(),
    price: Number(body.price),
    currency: String(body.currency || "GBP").trim(),
    images: Array.isArray(body.images) ? body.images.map(String) : [],
    stock: typeof body.stock === "number" ? body.stock : 0,
    isActive: body.isActive !== false,
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    storeId: body.storeId || undefined
  };

  try {
    const created = await Product.create(payload);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    const msg = e?.code === 11000 ? "Duplicate slug" : "Error creating product";
    return NextResponse.json({ error: msg, detail: e?.message }, { status: 400 });
  }
}
