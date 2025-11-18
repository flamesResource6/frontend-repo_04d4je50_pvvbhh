import { X, Trash2 } from 'lucide-react'

function CartDrawer({ open, items, onClose, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h3 className="text-white font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10">
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[calc(100%-180px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-slate-300">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-3">
                <img src={it.image} alt={it.title} className="h-16 w-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-white font-medium leading-tight">{it.title}</p>
                  <p className="text-slate-400 text-sm">Qty: {it.qty}</p>
                  <p className="text-blue-300 font-semibold text-sm">${(it.price * it.qty).toFixed(2)}</p>
                </div>
                <button onClick={() => onRemove(it.id)} className="p-2 rounded-lg hover:bg-white/10">
                  <Trash2 className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-slate-900">
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-slate-300">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length===0}
            className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
