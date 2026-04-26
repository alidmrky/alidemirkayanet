'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/* ── Data ────────────────────────────────────────────────────────────── */
const categories = ['Tümü', 'Geliştirici Araçları', 'AI & LLM', 'Öğrenme & Takip', 'Tasarım & UI', 'Verimlilik']

const links = [
  /* Geliştirici Araçları */
  {
    title: 'Cursor IDE',
    url: 'https://cursor.sh',
    description: 'AI destekli, kod yazımını yeniden tanımlayan editör.',
    category: 'Geliştirici Araçları',
    isNew: true,
  },
  {
    title: 'Warp Terminal',
    url: 'https://warp.dev',
    description: 'AI entegreli, blok tabanlı modern terminal.',
    category: 'Geliştirici Araçları',
    isNew: false,
  },
  {
    title: 'Linear',
    url: 'https://linear.app',
    description: 'Hızlı ve modern proje & sprint yönetim aracı.',
    category: 'Geliştirici Araçları',
    isNew: false,
  },
  {
    title: 'Raycast',
    url: 'https://raycast.com',
    description: 'macOS için süper güçlendirilmiş spotlight.',
    category: 'Geliştirici Araçları',
    isNew: false,
  },
  {
    title: 'Vercel',
    url: 'https://vercel.com',
    description: 'Frontend projelerini saniyeler içinde deploy et.',
    category: 'Geliştirici Araçları',
    isNew: false,
  },
  {
    title: 'Supabase',
    url: 'https://supabase.com',
    description: 'Open-source Firebase alternatifi. PostgreSQL tabanlı.',
    category: 'Geliştirici Araçları',
    isNew: false,
  },
  /* AI & LLM */
  {
    title: 'Claude.ai',
    url: 'https://claude.ai',
    description: "Anthropic'in flagship AI asistanı. Kod ve analiz için ideal.",
    category: 'AI & LLM',
    isNew: true,
  },
  {
    title: 'OpenRouter',
    url: 'https://openrouter.ai',
    description: "Tek API ile tüm LLM'lere erişim.",
    category: 'AI & LLM',
    isNew: false,
  },
  {
    title: 'LM Studio',
    url: 'https://lmstudio.ai',
    description: 'Yerel model çalıştırma; privacy-first AI.',
    category: 'AI & LLM',
    isNew: false,
  },
  {
    title: 'Perplexity',
    url: 'https://perplexity.ai',
    description: 'Kaynak gösteren, gerçek zamanlı AI arama motoru.',
    category: 'AI & LLM',
    isNew: false,
  },
  {
    title: 'v0 by Vercel',
    url: 'https://v0.dev',
    description: 'Prompt ile React bileşeni üret.',
    category: 'AI & LLM',
    isNew: true,
  },
  /* Öğrenme & Takip */
  {
    title: 'The Batch',
    url: 'https://www.deeplearning.ai/the-batch/',
    description: 'AI haberlerinde en güvenilir haftalık bülten.',
    category: 'Öğrenme & Takip',
    isNew: false,
  },
  {
    title: 'Interconnects',
    url: 'https://www.interconnects.ai',
    description: "LLM araştırmaları üzerine derinlemesine yazılar.",
    category: 'Öğrenme & Takip',
    isNew: false,
  },
  {
    title: "Simon Willison's Blog",
    url: 'https://simonwillison.net',
    description: 'Pratik AI denemelerinin merkezi.',
    category: 'Öğrenme & Takip',
    isNew: false,
  },
  {
    title: 'roadmap.sh',
    url: 'https://roadmap.sh',
    description: 'Her yazılım alanı için interaktif öğrenme yol haritaları.',
    category: 'Öğrenme & Takip',
    isNew: false,
  },
  /* Tasarım & UI */
  {
    title: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
    description: 'Kopyala-yapıştır React bileşen kütüphanesi.',
    category: 'Tasarım & UI',
    isNew: false,
  },
  {
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    description: 'Utility-first CSS framework. Hızlı prototipleme.',
    category: 'Tasarım & UI',
    isNew: false,
  },
  {
    title: 'Framer Motion',
    url: 'https://motion.dev',
    description: "React için en kapsamlı animasyon kütüphanesi.",
    category: 'Tasarım & UI',
    isNew: false,
  },
  {
    title: 'Figma',
    url: 'https://figma.com',
    description: 'Tasarım ve prototipleme için endüstri standardı.',
    category: 'Tasarım & UI',
    isNew: false,
  },
  /* Verimlilik */
  {
    title: 'Notion',
    url: 'https://notion.so',
    description: 'Not alma, wiki ve proje yönetimi hepsi bir arada.',
    category: 'Verimlilik',
    isNew: false,
  },
  {
    title: 'Obsidian',
    url: 'https://obsidian.md',
    description: 'Bağlantılı not alma; ikinci beyin.',
    category: 'Verimlilik',
    isNew: false,
  },
]

/* ── Helpers ─────────────────────────────────────────────────────────── */
const faviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return ''
  }
}

const getDomain = (url: string) => {
  try { return new URL(url).hostname.replace('www.', '') }
  catch { return url }
}

/* ── Animation ───────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 12 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
})

/* ── LinkCard ────────────────────────────────────────────────────────── */
function LinkCard({ link, index }: { link: (typeof links)[0]; index: number }) {
  const [favError, setFavError] = useState(false)

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-3 p-4 rounded-xl border border-white/[0.08] bg-[#0f0f0f]/70 backdrop-blur-sm hover:border-white/[0.18] hover:bg-[#141414]/80 transition-all duration-250"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg border border-white/[0.08] bg-white/[0.05] flex items-center justify-center shrink-0 overflow-hidden">
            {!favError ? (
              <img
                src={faviconUrl(link.url)}
                alt=""
                className="w-4 h-4 object-contain"
                onError={() => setFavError(true)}
              />
            ) : (
              <span className="text-[10px] font-bold text-white/30">{link.title[0]}</span>
            )}
          </div>
          <span className="text-[13px] font-medium text-white/85 group-hover:text-white transition-colors truncate">
            {link.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {link.isNew && (
            <span className="text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400/80">
              Yeni
            </span>
          )}
          <ExternalLink
            size={12}
            strokeWidth={1.8}
            className="text-white/20 group-hover:text-white/60 transition-colors"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-[11.5px] text-white/50 leading-relaxed line-clamp-2 flex-1">
        {link.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/25 truncate">{getDomain(link.url)}</span>
        <span className="text-[9px] font-mono tracking-widest uppercase text-white/20 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
          {link.category}
        </span>
      </div>
    </motion.a>
  )
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function UsefulLinks() {
  const [active, setActive] = useState('Tümü')

  const filtered = active === 'Tümü' ? links : links.filter((l) => l.category === active)

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 md:px-10 pt-20 md:pt-28 pb-16">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mb-2">Kaynaklar</p>
          <h1 className="text-2xl font-bold text-white/90 mb-2">Faydalı Linkler</h1>
          <p className="text-sm text-white/40 leading-relaxed">
            Düzenli kullandığım, güvendiğim araç ve kaynaklar.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div {...fadeUp(0.05)} className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[11px] font-mono px-3 py-1.5 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'bg-white/10 border-white/20 text-white/90'
                  : 'bg-transparent border-white/[0.08] text-white/35 hover:border-white/15 hover:text-white/60'
              }`}
            >
              {cat}
              {active !== 'Tümü' && cat !== 'Tümü' && cat === active && (
                <span className="ml-1.5 text-white/40">
                  {links.filter((l) => l.category === cat).length}
                </span>
              )}
              {cat === 'Tümü' && (
                <span className="ml-1.5 text-white/30">{links.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((link, i) => (
              <LinkCard key={link.url} link={link} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  )
}
