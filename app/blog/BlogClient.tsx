'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Clock, X, ChevronLeft, Loader2 } from 'lucide-react'
import type { BlogPost } from '@/lib/notion'

/* ── Notion block renderer ───────────────────────────────────────────── */
interface NotionBlock {
  id: string
  type: string
  [key: string]: unknown
}

function richText(items: { plain_text: string; annotations?: { bold?: boolean; italic?: boolean; code?: boolean } }[]) {
  return items.map((t, i) => {
    if (t.annotations?.code) return <code key={i} className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[12px] text-emerald-300">{t.plain_text}</code>
    if (t.annotations?.bold) return <strong key={i} className="text-white/90 font-semibold">{t.plain_text}</strong>
    if (t.annotations?.italic) return <em key={i} className="italic text-white/70">{t.plain_text}</em>
    return <span key={i}>{t.plain_text}</span>
  })
}

function BlockRenderer({ block }: { block: NotionBlock }) {
  const type = block.type
  const data = block[type] as {
    rich_text?: { plain_text: string; annotations?: { bold?: boolean; italic?: boolean; code?: boolean } }[]
    caption?: { plain_text: string }[]; file?: { url?: string }; external?: { url?: string }
  }
  if (!data) return null
  switch (type) {
    case 'paragraph':
      if (!data.rich_text?.length) return <div className="h-4" />
      return <p className="text-[14.5px] text-white/65 leading-relaxed mb-4">{richText(data.rich_text)}</p>
    case 'heading_1': return <h2 className="text-2xl font-bold text-white/90 mt-8 mb-3">{richText(data.rich_text ?? [])}</h2>
    case 'heading_2': return <h3 className="text-xl font-semibold text-white/85 mt-7 mb-3">{richText(data.rich_text ?? [])}</h3>
    case 'heading_3': return <h4 className="text-base font-semibold text-white/80 mt-5 mb-2">{richText(data.rich_text ?? [])}</h4>
    case 'bulleted_list_item': return <li className="text-[14px] text-white/65 leading-relaxed mb-2 ml-5 list-disc">{richText(data.rich_text ?? [])}</li>
    case 'numbered_list_item': return <li className="text-[14px] text-white/65 leading-relaxed mb-2 ml-5 list-decimal">{richText(data.rich_text ?? [])}</li>
    case 'code':
      return (
        <pre className="my-5 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-x-auto">
          <code className="text-[12px] font-mono text-emerald-300/90 leading-relaxed">{(data.rich_text ?? []).map(t => t.plain_text).join('')}</code>
        </pre>
      )
    case 'quote':
      return <blockquote className="my-5 pl-4 border-l-2 border-white/20 text-[14px] text-white/50 italic leading-relaxed">{richText(data.rich_text ?? [])}</blockquote>
    case 'divider': return <hr className="my-7 border-white/[0.08]" />
    case 'image': {
      const imgUrl = data.file?.url ?? data.external?.url
      const caption = data.caption?.map(c => c.plain_text).join('') ?? ''
      if (!imgUrl) return null
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgUrl} alt={caption} className="max-h-[480px] max-w-full w-auto mx-auto block rounded-xl" />
          {caption && <figcaption className="text-center text-[11px] text-white/30 mt-2">{caption}</figcaption>}
        </figure>
      )
    }
    default: return null
  }
}

/* ── Category accents ─────────────────────────────────────────────────── */
const categoryAccent: Record<string, string> = {
  'Motorsport': 'text-red-400   border-red-400/30   bg-red-400/10',
  'Teknoloji':  'text-sky-400   border-sky-400/30   bg-sky-400/10',
  'Yazılım':    'text-violet-400 border-violet-400/30 bg-violet-400/10',
}
const DEFAULT_ACCENT = 'text-white/60 border-white/20 bg-white/10'
const getAccent = (cat: string) => categoryAccent[cat] ?? DEFAULT_ACCENT

function Badge({ label, accent }: { label: string; accent: string }) {
  return <span className={`text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full border ${accent}`}>{label}</span>
}

/* ── PostRow ──────────────────────────────────────────────────────────── */
function PostRow({ post, isActive, onClick, hideExcerpt }: {
  post: BlogPost; isActive: boolean; onClick: () => void; hideExcerpt: boolean
}) {
  const accent = getAccent(post.category)
  return (
    <motion.article
      onClick={onClick}
      className={`group relative flex items-center gap-3 py-3.5 px-3 -mx-3 cursor-pointer rounded-xl transition-all duration-200 border ${
        isActive ? 'bg-white/10 border-white/15' : 'border-transparent hover:bg-white/[0.06] hover:border-white/[0.08]'
      }`}
    >
      <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300 ${isActive ? 'bg-white/50 opacity-100' : 'opacity-0'}`} />

      {post.imageUrl && (
        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          {post.category && <Badge label={post.category} accent={accent} />}
        </div>
        <h2 className={`text-sm font-semibold leading-snug mb-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
          {post.title}
        </h2>
        {!hideExcerpt && post.summary && (
          <p className="text-xs text-white/40 leading-relaxed mb-1.5 line-clamp-2">{post.summary}</p>
        )}
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/45">
          {post.date && <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
          <span className="text-white/20">·</span>
          <Clock size={9} />
          <span>{post.readTime} dk</span>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Detail Panel ─────────────────────────────────────────────────────── */
function DetailPanel({ post, onClose, mobile, blocks, loading }: {
  post: BlogPost; onClose: () => void; mobile: boolean; blocks: NotionBlock[]; loading: boolean
}) {
  const accent = getAccent(post.category)
  return (
    <motion.div
      initial={mobile ? { y: '100%' } : { opacity: 0, x: 48 }}
      animate={mobile ? { y: 0 } : { opacity: 1, x: 0 }}
      exit={mobile ? { y: '100%' } : { opacity: 0, x: 48 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={
        mobile
          ? 'fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-xl overflow-hidden'
          : 'flex-1 h-full flex flex-col border-l border-white/[0.08] bg-black/40 backdrop-blur-md overflow-hidden'
      }
    >
      <div className="flex-1 overflow-y-auto">
        {/* Hero image */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden shrink-0 bg-white/5">
          {post.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
          <button
            onClick={onClose}
            className="absolute top-5 left-5 flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors group"
          >
            {mobile
              ? <><ChevronLeft size={15} /><span>Geri</span></>
              : <><X size={13} className="group-hover:rotate-90 transition-transform duration-300" /><span>Kapat</span></>
            }
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 pt-6 pb-16">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {post.category && <Badge label={post.category} accent={accent} />}
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white leading-snug mb-3 tracking-tight">{post.title}</h2>

          <div className="flex items-center gap-3 text-[11px] font-mono text-white/25 mb-7 pb-6 border-b border-white/[0.07]">
            {post.date && <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
            <span className="text-white/10">·</span>
            <Clock size={10} />
            <span>{post.readTime} dakika okuma</span>
            <button className="ml-auto flex items-center gap-1 text-white/30 hover:text-white/70 transition-colors">
              <ArrowUpRight size={12} /> Paylaş
            </button>
          </div>

          {post.summary && (
            <p className="text-[14px] text-white/50 leading-relaxed border-l-2 border-white/10 pl-4 mb-7 italic">{post.summary}</p>
          )}

          {loading ? (
            <div className="flex items-center gap-2 text-white/25 text-sm font-mono mt-4">
              <Loader2 size={14} className="animate-spin" /> Yükleniyor...
            </div>
          ) : (
            <div>{blocks.map(b => <BlockRenderer key={b.id} block={b} />)}</div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [selected, setSelected] = useState<BlogPost | null>(null)
  const [blocks, setBlocks] = useState<NotionBlock[]>([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [isMobile, setIsMobile] = useState(false)

  const categories = ['Tümü', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))]
  const filtered = activeCategory === 'Tümü' ? posts : posts.filter(p => p.category === activeCategory)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!selected) return
    setLoading(true)
    setBlocks([])
    fetch(`/api/notion/blocks?pageId=${selected.id}`)
      .then(r => r.json())
      .then(data => setBlocks(data.blocks ?? []))
      .finally(() => setLoading(false))
  }, [selected?.id])

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ── List Panel ── */}
      <motion.div
        animate={{ width: selected && !isMobile ? '400px' : '100%' }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="relative flex-shrink-0 h-full overflow-y-auto"
        style={{ display: selected && isMobile ? 'none' : undefined }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 px-5 md:px-10 pt-20 md:pt-28 pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 md:mb-8"
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-1.5">Yazılar</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-none">Blog</h1>
          </motion.div>

          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-6 md:mb-8"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSelected(null) }}
                  className={`text-[11px] font-medium tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all duration-300 ${
                    activeCategory === cat ? 'bg-white text-black border-white' : 'text-white/45 border-white/15 hover:text-white/75 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {posts.length === 0 ? (
            <p className="text-sm text-white/30 font-mono">Henüz yayınlanmış yazı yok.</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {filtered.map((post, i) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                    <PostRow post={post} isActive={selected?.id === post.id} onClick={() => setSelected(post)} hideExcerpt={!!selected && !isMobile} />
                    {i < filtered.length - 1 && <div className="h-px bg-white/[0.06] mx-3" />}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {selected && (
          isMobile
            ? <DetailPanel key="mobile" post={selected} onClose={() => setSelected(null)} mobile blocks={blocks} loading={loading} />
            : <DetailPanel key="desktop" post={selected} onClose={() => setSelected(null)} mobile={false} blocks={blocks} loading={loading} />
        )}
      </AnimatePresence>
    </div>
  )
}
