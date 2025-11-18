function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.6),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.6),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(147,197,253,0.5),transparent_40%)]"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs tracking-widest uppercase text-blue-300/80 bg-blue-500/10 border border-blue-300/20 px-3 py-1 rounded-full mb-4">Professional CCTV Solutions</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Protect what matters with smart surveillance
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Shop premium cameras, recorders, and complete kits built for homes and businesses. Easy setup, crystal‑clear footage, and reliable support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition shadow ring-1 ring-blue-300/30">Browse Products</a>
              <a href="#contact" className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition border border-white/20">Get Expert Help</a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <dt className="text-2xl font-bold text-white">4K</dt>
                <dd className="text-xs text-slate-300">Ultra HD Cameras</dd>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <dt className="text-2xl font-bold text-white">24/7</dt>
                <dd className="text-xs text-slate-300">Smart Monitoring</dd>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <dt className="text-2xl font-bold text-white">IP67</dt>
                <dd className="text-xs text-slate-300">Weatherproof</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-800">
              <img src="https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDQ1RWJTIwQ2FtZXJhfGVufDB8MHx8fDE3NjM0NDQzNjh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="CCTV Camera" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900/80 border border-white/10 rounded-xl p-4 text-slate-200 text-sm backdrop-blur">
              <p className="font-semibold">Trusted by 2,000+ businesses</p>
              <p className="text-xs text-slate-400">Professional-grade security, easy setup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
