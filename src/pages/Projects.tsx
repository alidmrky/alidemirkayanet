import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'

const projects = [
  {
    title: 'CLI Araç — devkit',
    description: 'Rust ile yazılmış, günlük terminal iş akışını hızlandıran bir CLI araç paketi. Git, docker ve proje yönetimi komutlarını birleştirir.',
    tech: ['Rust', 'CLI', 'Tokio'],
    stars: 48,
    status: 'Aktif',
    github: '#',
    live: null,
  },
  {
    title: 'AI Prompt Manager',
    description: 'Claude, GPT ve Gemini için prompt şablonlarını organize eden, versiyonlayan ve paylaşan web uygulaması.',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    stars: 124,
    status: 'Beta',
    github: '#',
    live: '#',
  },
  {
    title: 'Blog Altyapısı',
    description: 'Markdown tabanlı, SEO optimize edilmiş, statik site üreticisi. Bu sitenin altyapısı bu proje üzerine kurulu.',
    tech: ['React', 'Vite', 'Tailwind'],
    stars: 31,
    status: 'Aktif',
    github: '#',
    live: '#',
  },
  {
    title: 'Kod Analiz Botu',
    description: 'GitHub PR\'larını otomatik olarak analiz eden, güvenlik açıklarını ve kod kalitesini raporlayan LLM tabanlı bot.',
    tech: ['Python', 'GPT-4', 'GitHub API'],
    stars: 87,
    status: 'Geliştiriliyor',
    github: '#',
    live: null,
  },
]

const statusColor: Record<string, string> = {
  'Aktif': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Beta': 'bg-blue-100 text-blue-700 border-blue-200',
  'Geliştiriliyor': 'bg-amber-100 text-amber-700 border-amber-200',
}

export default function Projects() {
  return (
    <div className="p-6 md:p-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold text-[#0A0A0A] mb-2" itemProp="name">
          Projeler
        </h1>
        <p className="text-sm text-[#6B7280] max-w-lg">
          Açık kaynak ve kişisel projelerim. Çoğu GitHub'da herkese açık.
        </p>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="post-card flex flex-col gap-3"
            itemScope
            itemType="https://schema.org/SoftwareApplication"
          >
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#0A0A0A] leading-snug" itemProp="name">
                {project.title}
              </h2>
              <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColor[project.status]}`}>
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#6B7280] leading-relaxed flex-1" itemProp="description">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tag text-[10px]">{t}</span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#F0F0EE]">
              <div className="flex items-center gap-1 text-[11px] text-[#9B9B98]">
                <Star size={11} strokeWidth={1.5} />
                <span className="font-mono">{project.stars}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={project.github}
                  className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={12} strokeWidth={1.8} />
                  Kod
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                    aria-label={`${project.title} canlı demo`}
                  >
                    <ExternalLink size={12} strokeWidth={1.8} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
