import { useEffect, useState, useMemo } from 'react'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/40 transition relative">
      <div className="aspect-[4/3] overflow-hidden bg-slate-800">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-semibold leading-tight">{product.title}</h3>
          <p className="text-blue-300 font-bold">${product.price?.toFixed ? product.price.toFixed(2) : product.price}</p>
        </div>
        <p className="mt-1 text-slate-300 line-clamp-2 text-sm">{product.description}</p>
        {product.specs?.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
            {product.specs.slice(0,3).map((s, i) => (
              <li key={i} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{s}</li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase tracking-wide">{product.category}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProducts = async (selectedCategory) => {
    const url = new URL(`${baseUrl}/api/products`)
    if (selectedCategory && selectedCategory !== 'all') url.searchParams.set('category', selectedCategory)
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to load products')
    return res.json()
  }

  useEffect(() => {
    const load = async () => {
      try {
        setError('')
        setLoading(true)
        let data = await fetchProducts(category)
        // If empty, try to seed demo CCTV products once
        if (Array.isArray(data) && data.length === 0) {
          const seedRes = await fetch(`${baseUrl}/api/seed/cctv`, { method: 'POST' })
          if (seedRes.ok) {
            data = await fetchProducts(category)
          }
        }
        setProducts(data)
      } catch (e) {
        console.error(e)
        setError('Could not load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const filtered = useMemo(() => {
    if (!query) return products
    return products.filter(p =>
      p.title?.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase())
    )
  }, [products, query])

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          {['all','camera','nvr','kit','accessory'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full border text-sm ${category===cat? 'bg-blue-600 text-white border-blue-400/40':'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'}`}
            >{cat}</button>
          ))}
        </div>
        <input
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search products..."
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400"
        />
      </div>

      {loading && <p className="text-slate-300">Loading products...</p>}
      {!loading && error && <p className="text-red-300">{error}</p>}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductGrid
