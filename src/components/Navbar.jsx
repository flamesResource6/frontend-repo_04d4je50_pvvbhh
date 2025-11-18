import { ShoppingCart, Camera, Search } from 'lucide-react'

function Navbar({ cartCount, onSearch, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-white">
          <div className="h-9 w-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <Camera className="h-5 w-5 text-blue-400" />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight">SecureVision</p>
            <p className="text-[10px] text-blue-300/80 uppercase">CCTV & Surveillance</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              onChange={(e) => onSearch(e.target.value)}
              type="text"
              placeholder="Search cameras, NVRs, kits, accessories..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800/60 border border-white/10 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <button onClick={onCartClick} className="relative inline-flex items-center gap-2 text-white px-3 py-2 rounded-xl border border-white/10 bg-slate-800/60 hover:bg-slate-800 transition">
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full px-2 py-0.5 border border-blue-300/30">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar
