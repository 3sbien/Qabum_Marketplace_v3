import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/auth";
import { isValidObjectId } from "mongoose";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const filter = isValidObjectId(id) ? { _id: id } : { slug: id.toLowerCase() };
  const doc = await Product.findOne(filter).lean();
  if (!doc || !doc.isActive) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  const update: any = { ...data };
  if (update.slug) update.slug = String(update.slug).toLowerCase();

  const filter = isValidObjectId(id) ? { _id: id } : { slug: id.toLowerCase() };
  const updated = await Product.findOneAndUpdate(filter, update, { new: true, runValidators: true }).lean();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const { id } = params;
  const filter = isValidObjectId(id) ? { _id: id } : { slug: id.toLowerCase() };
  const deleted = await Product.findOneAndDelete(filter).lean();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
