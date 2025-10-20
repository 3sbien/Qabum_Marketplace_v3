import Image from "next/image";
import { dbConnect } from "../../lib/db";
const Product = require("../../models/Product");

export default function ProductDetail({ p }) {
  if (!p) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </main>
    );
  }

  const img = (p.images && p.images[0]) || "/placeholder.png";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50">
          <Image src={img} alt={p.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{p.name}</h1>
          <p className="mt-3 text-gray-700">{p.description}</p>
          <div className="mt-6 text-xl">
            {p.currency} {Number(p.price).toFixed(2)}
          </div>
          <div className="mt-2 text-sm text-gray-600">Category: {p.category}</div>
          <div className="mt-1 text-sm text-gray-600">Stock: {p.stock}</div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const slug = params.slug.toLowerCase();
  const doc = await Product.findOne({ slug, isActive: true }).lean();

  return {
    props: {
      p: doc ? JSON.parse(JSON.stringify(doc)) : null,
    },
  };
}
