import { useState } from "react";
import { useRouter } from "next/router";

export default function NewStorePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Coffee & Food",
    email: "",
    website: "",
    phone: "",
    location: "",
    publicLocation: true,
    image: "",
    defaultCurrency: "GBP",
    platformFeePercentage: 0,
    isActive: true,
  });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error || "Error creating store");
      } else {
        setMsg("Store created successfully.");
        setTimeout(() => router.push("/market"), 800);
      }
    } catch (err) {
      setMsg(String(err));
    } finally {
      setLoading(false);
    }
  }

  function setField(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Create Store</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm">Name *</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Category *</span>
            <select
              className="mt-1 w-full rounded border p-2"
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              required
            >
              <option>Local Shops</option>
              <option>Coffee & Food</option>
              <option>Creative Services</option>
              <option>Beauty & Wellness</option>
              <option>Ethical & Eco Brands</option>
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm">Description</span>
            <textarea
              className="mt-1 w-full rounded border p-2"
              rows={3}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm">Email *</span>
            <input
              type="email"
              className="mt-1 w-full rounded border p-2"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Phone *</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Website</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.website}
              onChange={(e) => setField("website", e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="block">
            <span className="text-sm">Location *</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              required
              placeholder="London SE1"
            />
          </label>

          <label className="block">
            <span className="text-sm">Image URL</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
              placeholder="https://res.cloudinary.com/.../image.jpg"
            />
          </label>

          <label className="block">
            <span className="text-sm">Default currency</span>
            <select
              className="mt-1 w-full rounded border p-2"
              value={form.defaultCurrency}
              onChange={(e) => setField("defaultCurrency", e.target.value)}
            >
              <option>GBP</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm">Platform fee percentage</span>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              className="mt-1 w-full rounded border p-2"
              value={form.platformFeePercentage}
              onChange={(e) =>
                setField("platformFeePercentage", Number(e.target.value))
              }
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.publicLocation}
              onChange={(e) => setField("publicLocation", e.target.checked)}
            />
            <span className="text-sm">Show location publicly</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setField("isActive", e.target.checked)}
            />
            <span className="text-sm">Active</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black text-white px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create Store"}
        </button>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>
    </main>
  );
}
