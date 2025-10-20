import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "../../lib/db";
const Product = require("../../models/Product");

export default function MarketPage({ items, page, pages }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Market</h1>

      {items.length === 0 ? (
        <p className="text-sm">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => {
            const img = (p.images && p.images[0]) || "/placeholder.png";
            return (
              <Link
                key={p._id}
                href={`/market/${p.slug}`}
                className="block rounded-2xl border hover:shadow-md transition p-4"
              >
                <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={img}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium line-clamp-1">{p.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                <div className="mt-2 text-sm">
                  {p.currency} {Number(p.price).toFixed(2)}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={`/market?page=${n}`}
              className={`px-3 py-1 rounded ${
                Number(page) === n ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps({ query }) {
  await dbConnect();

  const q = (query.q || "").trim();
  const category = (query.category || "").trim();
  const page = Math.max(1, parseInt(query.page || "1", 10));
  const limit = 12;
  const skip = (page - 1) * limit;

  const filters = { isActive: true };
  if (q) {
    filters.$or = [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ];
  }
  if (category) filters.category = category;

  const [docs, total] = await Promise.all([
    Product.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filters),
  ]);

  return {
    props: {
      items: JSON.parse(JSON.stringify(docs)),
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}
