import { useState, useMemo } from "react";
import { useRouter } from "next/router";

const ALLOWED_CATEGORIES = [
  "Local Shops",
  "Coffee & Food",
  "Creative Services",
  "Beauty & Wellness",
  "Ethical & Eco Brands",
];

export default function NewStorePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    // Identidad
    name: "",
    legalName: "",
    description: "",
    // Categorías (máx 2)
    categories: [],
    // Fiscal EC
    ruc: "",
    establishmentNumber: "001",
    // Contacto
    email: "",
    website: "",
    phone: "",
    // Ubicación
    location: "",
    publicLocation: true,
    // Imagen
    image: "",
    // Config fijos EC
    country: "EC",
    defaultCurrency: "USD",
    ivaRate: 0.15,
    platformFeePercentage: 0,
    isActive: true,
  });

  const selectedCount = form.categories.length;
  const canSelectMore = selectedCount < 2;

  function toggleCategory(cat) {
    setForm((s) => {
      const exists = s.categories.includes(cat);
      if (exists) {
        return { ...s, categories: s.categories.filter((c) => c !== cat) };
      }
      if (s.categories.length >= 2) return s; // no más de 2
      return { ...s, categories: [...s.categories, cat] };
    });
  }

  function setField(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  const categoryHelp = useMemo(() => {
    return `Selecciona hasta dos categorías (${selectedCount}/2)`;
  }, [selectedCount]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    // Validaciones mínimas en cliente
    if (form.categories.length < 1 || form.categories.length > 2) {
      setMsg("Selecciona entre 1 y 2 categorías.");
      setLoading(false);
      return;
    }
    if (!/^\d{13}$/.test(form.ruc)) {
      setMsg("El RUC debe tener 13 dígitos.");
      setLoading(false);
      return;
    }
    if (!/^\d{3}$/.test(form.establishmentNumber)) {
      setMsg("El establecimiento SRI debe ser un código de 3 dígitos, por ejemplo 001.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: form.name,
        legalName: form.legalName,
        description: form.description,
        categories: form.categories,
        ruc: form.ruc,
        establishmentNumber: form.establishmentNumber,
        email: form.email,
        website: form.website,
        phone: form.phone,
        location: form.location,
        publicLocation: form.publicLocation,
        image: form.image,
        // Fijos EC
        country: "EC",
        defaultCurrency: "USD",
        ivaRate: 0.15,
        platformFeePercentage: form.platformFeePercentage,
        isActive: form.isActive,
      };

      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Create Store</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Identidad */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm">Commercial name *</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">Legal name</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.legalName}
              onChange={(e) => setField("legalName", e.target.value)}
              placeholder="Razón social (opcional)"
            />
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
        </section>

        {/* Categorías */}
        <section>
          <div className="text-sm mb-2">Categories *</div>
          <p className="text-xs text-gray-600 mb-2">{categoryHelp}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ALLOWED_CATEGORIES.map((cat) => {
              const checked = form.categories.includes(cat);
              const disabled = !checked && !canSelectMore;
              return (
                <label key={cat} className={`flex items-center gap-2 ${disabled ? "opacity-60" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Fiscal EC */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm">RUC (13 dígitos) *</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.ruc}
              onChange={(e) => setField("ruc", e.target.value.replace(/\D/g, "").slice(0, 13))}
              placeholder="1709339533001"
              required
              inputMode="numeric"
            />
          </label>
          <label className="block">
            <span className="text-sm">Establecimiento SRI (3 dígitos) *</span>
            <input
              className="mt-1 w-full rounded border p-2"
              value={form.establishmentNumber}
              onChange={(e) => setField("establishmentNumber", e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="001"
              required
              inputMode="numeric"
            />
          </label>
        </section>

        {/* Contacto y ubicación */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="Quito, Ecuador"
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.publicLocation}
              onChange={(e) => setField("publicLocation", e.target.checked)}
            />
            <span className="text-sm">Show location publicly</span>
          </div>
        </section>

        {/* Config */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm">Country</span>
            <input className="mt-1 w-full rounded border p-2" value="EC" disabled />
          </label>
          <label className="block">
            <span className="text-sm">Currency</span>
            <input className="mt-1 w-full rounded border p-2" value="USD" disabled />
          </label>
          <label className="block">
            <span className="text-sm">IVA</span>
            <input className="mt-1 w-full rounded border p-2" value="15%" disabled />
          </label>

          <label className="block md:col-span-3">
            <span className="text-sm">Platform fee percentage</span>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              className="mt-1 w-full rounded border p-2"
              value={form.platformFeePercentage}
              onChange={(e) => setField("platformFeePercentage", Number(e.target.value))}
            />
          </label>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setField("isActive", e.target.checked)}
            />
            <span className="text-sm">Active</span>
          </div>
        </section>

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
