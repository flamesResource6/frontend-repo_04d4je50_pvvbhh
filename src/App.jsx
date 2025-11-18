import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('cctv_cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('cctv_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const handleCheckout = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const items = cart.map((c) => ({ product_id: c.id, title: c.title, price: c.price, quantity: c.qty, image: c.image }))
    const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0)
    try {
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: 'Guest',
          customer_email: 'guest@example.com',
          shipping_address: 'N/A',
          items,
          subtotal,
          shipping: 0,
          total: subtotal,
          status: 'pending'
        })
      })
      const data = await res.json()
      if (res.ok) {
        alert('Order placed! Order ID: ' + data.id)
        setCart([])
        setCartOpen(false)
      } else {
        alert('Checkout failed: ' + (data.detail || 'Unknown error'))
      }
    } catch (e) {
      alert('Checkout error: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} onSearch={()=>{}} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ProductGrid onAddToCart={addToCart} />
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} SecureVision CCTV. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#catalog" className="hover:text-white">Products</a>
            <a href="#" className="hover:text-white">Warranty</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default App
