import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const allPosts = [
  {
    id: 1,
    category: 'Model',
    title: 'Claude 4 Opus Duyuruldu: Neler Değişiyor?',
    excerpt: 'Anthropic\'in yeni amiral gemisi modeli, uzun vadeli akıl yürütme ve çok adımlı ajan görevlerinde çarpıcı iyileştirmeler sunuyor.',
    date: '20 Nis 2025',
    readTime: '5 dk',
    isNew: true,
  },
  {
    id: 2,
    category: 'Araç',
    title: 'Cursor\'un Yeni Ajan Modu ile Tanışın',
    excerpt: 'AI editörler artık sadece kod tamamlamıyor; proje boyutunda görevleri bağımsız olarak yürütebiliyor.',
    date: '17 Nis 2025',
    readTime: '4 dk',
    isNew: true,
  },
  {
    id: 3,
    category: 'Araştırma',
    title: 'LLM Halüsinasyonlarını Azaltmanın 5 Yolu',
    excerpt: 'Retrieval-augmented generation ve structured output tekniklerini karşılaştırdım.',
    date: '12 Nis 2025',
    readTime: '7 dk',
    isNew: false,
  },
  {
    id: 4,
    category: 'Model',
    title: 'Gemini 2.0 Pro Kod Oluşturmada Öne Çıkıyor',
    excerpt: 'Google\'ın yeni modeli, özellikle Python ve TypeScript\'te dikkat çekici sonuçlar üretiyor.',
    date: '9 Nis 2025',
    readTime: '4 dk',
    isNew: false,
  },
  {
    id: 5,
    category: 'Araç',
    title: 'Windsurf vs Cursor: Uzun Vadeli Kullanım Karşılaştırması',
    excerpt: '3 ay iki editörü paralel kullandım. İşte dürüst izlenimlerim.',
    date: '5 Nis 2025',
    readTime: '8 dk',
    isNew: false,
  },
  {
    id: 6,
    category: 'Araştırma',
    title: 'Ajanlar Arası İletişim: MCP Protokolü Nedir?',
    excerpt: 'Model Context Protocol, AI araçlarının birbirleriyle nasıl konuştuğunu standartlaştırıyor.',
    date: '1 Nis 2025',
    readTime: '6 dk',
    isNew: false,
  },
]

const categories = ['Tümü', 'Model', 'Araç', 'Araştırma']

export default function AiNews() {
  const [activeCategory, setActiveCategory] = useState('Tümü')

  const filtered = activeCategory === 'Tümü'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-[#0A0A0A] mb-2">AI News</h1>
        <p className="text-sm text-[#6B7280]">
          Yapay zeka dünyasındaki gelişmelere dair notlar ve analizler.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35 }}
        className="flex gap-2 mb-6"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`nav-btn py-1.5 px-3 text-xs w-auto ${activeCategory === cat ? 'nav-btn-active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Posts list */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="post-card group"
              itemScope
              itemType="https://schema.org/NewsArticle"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="tag">{post.category}</span>
                    {post.isNew && <span className="tag-active">Yeni</span>}
                  </div>
                  <h2 className="text-sm font-semibold text-[#0A0A0A] mb-1 leading-snug group-hover:underline underline-offset-2" itemProp="headline">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#6B7280] leading-relaxed" itemProp="description">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <time className="text-[10px] text-[#9B9B98] font-mono" itemProp="datePublished">{post.date}</time>
                    <span className="text-[#D0D0CD]">·</span>
                    <span className="text-[10px] text-[#9B9B98]">{post.readTime} okuma</span>
                  </div>
                </div>
                <ArrowRight size={14} className="shrink-0 text-[#C8C8C5] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all mt-0.5" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
