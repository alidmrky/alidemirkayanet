import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const linkGroups = [
  {
    category: 'Geliştirici Araçları',
    links: [
      { title: 'Cursor IDE', url: 'https://cursor.sh', description: 'AI destekli en iyi kod editörü.', isNew: true },
      { title: 'Warp Terminal', url: 'https://warp.dev', description: 'AI entegreli yeni nesil terminal.', isNew: false },
      { title: 'Linear', url: 'https://linear.app', description: 'Hızlı ve modern proje yönetim aracı.', isNew: false },
      { title: 'Raycast', url: 'https://raycast.com', description: 'macOS için süper güçlendirilmiş spotlight.', isNew: false },
    ],
  },
  {
    category: 'AI & LLM',
    links: [
      { title: 'Claude.ai', url: 'https://claude.ai', description: 'Anthropic\'in flagship AI asistanı.', isNew: true },
      { title: 'OpenRouter', url: 'https://openrouter.ai', description: 'Tek API ile tüm LLM\'lere erişim.', isNew: false },
      { title: 'LangChain', url: 'https://langchain.com', description: 'LLM tabanlı uygulama framework\'ü.', isNew: false },
      { title: 'LM Studio', url: 'https://lmstudio.ai', description: 'Yerel LLM çalıştırma platformu.', isNew: false },
    ],
  },
  {
    category: 'Öğrenme & Takip',
    links: [
      { title: 'The Batch (deeplearning.ai)', url: 'https://www.deeplearning.ai/the-batch/', description: 'AI haberlerinde en güvenilir bülten.', isNew: false },
      { title: 'Interconnects', url: 'https://www.interconnects.ai', description: 'LLM araştırmaları üzerine derinlemesine yazılar.', isNew: false },
      { title: 'Simon Willison\'s Blog', url: 'https://simonwillison.net', description: 'Pratik AI denemelerinin merkezi.', isNew: false },
    ],
  },
]

export default function UsefulLinks() {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold text-[#0A0A0A] mb-2">Faydalı Linkler</h1>
        <p className="text-sm text-[#6B7280]">
          Düzenli kullandığım, güvendiğim araç ve kaynaklar.
        </p>
      </motion.div>

      {/* Link groups */}
      <div className="max-w-2xl space-y-8">
        {linkGroups.map((group, gi) => (
          <motion.section
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-labelledby={`group-${gi}`}
          >
            <h2
              id={`group-${gi}`}
              className="text-xs font-semibold tracking-widest text-[#A8A8A5] uppercase mb-3"
            >
              {group.category}
            </h2>

            <div className="flex flex-col gap-2">
              {group.links.map((link, li) => (
                <motion.a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.1 + li * 0.05, duration: 0.3 }}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl border border-[#E5E5E3] bg-white hover:border-[#C0C0BE] hover:shadow-sm transition-all"
                  itemScope
                  itemType="https://schema.org/WebPage"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Favicon placeholder */}
                    <div className="w-7 h-7 rounded-lg bg-[#F0F0EE] border border-[#E5E5E3] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-semibold text-[#6B7280]">
                        {link.title[0]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#0A0A0A]" itemProp="name">
                          {link.title}
                        </span>
                        {link.isNew && (
                          <span className="tag-active text-[9px] px-1.5 py-0 rounded-full">
                            Yeni
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#9B9B98] truncate" itemProp="description">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    size={13}
                    className="shrink-0 text-[#C8C8C5] group-hover:text-[#0A0A0A] transition-colors ml-3"
                  />
                </motion.a>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
