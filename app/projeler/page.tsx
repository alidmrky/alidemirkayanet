'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Circle } from 'lucide-react'

const GITHUB_USERNAME = 'alidmrky'
const SELECTED_REPOS  = ['Formula1Dashboard', 'BlazorProductTracking', 'sprint-planning']

const liveProjects = [
  {
    title: 'Palet Pazarı',
    url: 'https://paletpazari.com',
    description: "Türkiye'nin palet alım-satım platformu. Kurumsal firmaların yeni ve ikinci el palet ilanı verebildiği, endüstriyel tedarik süreçlerini dijitalleştiren marketplace.",
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    image: '/assets/paletpazari.png',
  },
  {
    title: 'Serphio',
    url: 'https://serphio.com',
    description: "SEO sıralama takibi, kelime analizi ve site denetimi platformu. ChatGPT, Gemini ve Claude'da marka görünürlüğünü ölçen GEO takibi de içeriyor.",
    tech: ['Next.js', 'TypeScript', 'AI/GEO', 'Supabase'],
    image: '/assets/serphio.png',
  },
  {
    title: 'Gayrimenkul Defteri',
    url: 'https://gayrimenkuldefteri.com',
    description: 'Gayrimenkul yatırım takip ve portföy yönetim uygulaması. Kira getirisi, değer artışı ve masraf analizlerini tek panelden yönetmeyi sağlar.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    image: '/assets/gayrrimenkuldefteri.png',
  },
]

const langColor: Record<string, string> = {
  TypeScript: 'bg-blue-400', JavaScript: 'bg-yellow-400', 'C#': 'bg-purple-500',
  Python: 'bg-green-400', Rust: 'bg-orange-500', Go: 'bg-cyan-400', HTML: 'bg-red-400', CSS: 'bg-pink-400',
}

interface GithubRepo {
  name: string; description: string | null; html_url: string
  stargazers_count: number; forks_count: number; language: string | null; topics: string[]
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
})

function LiveProjectCard({ project, index }: { project: typeof liveProjects[0]; index: number }) {
  return (
    <motion.div {...fadeUp(index * 0.1)}
      className="group flex flex-col rounded-2xl border border-white/[0.10] bg-[#0f0f0f]/80 backdrop-blur-sm overflow-hidden hover:border-white/[0.20] hover:bg-[#141414]/90 transition-all duration-300">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
          <Circle size={5} className="fill-emerald-400 text-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-400/90">Canlı</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1 bg-[#0f0f0f]/90">
        <div>
          <h2 className="text-[15px] font-semibold text-white leading-snug mb-1.5">{project.title}</h2>
          <p className="text-[12px] text-white/65 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.07] text-white/60">{t}</span>)}
        </div>
        <div className="pt-3 border-t border-white/[0.08]">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-medium text-white/50 hover:text-white transition-colors w-fit">
            <ExternalLink size={12} strokeWidth={1.8} />
            {project.url.replace('https://', '')}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function GithubRepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const dotColor = repo.language ? (langColor[repo.language] ?? 'bg-white/30') : 'bg-white/20'
  return (
    <motion.div {...fadeUp(0.35 + index * 0.08)}
      className="group flex flex-col gap-3 p-4 rounded-xl border border-white/[0.10] bg-[#0f0f0f]/80 backdrop-blur-sm hover:border-white/[0.20] hover:bg-[#141414]/90 transition-all duration-300">
      <div className="flex items-center gap-2 min-w-0">
        <Github size={13} className="text-white/45 shrink-0" strokeWidth={1.8} />
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/90 hover:text-white transition-colors truncate">{repo.name}</a>
      </div>
      <p className="text-[11.5px] text-white/60 leading-relaxed flex-1 line-clamp-3">{repo.description || 'Açıklama yok.'}</p>
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 4).map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full border border-white/[0.12] bg-white/[0.06] text-white/50 font-mono">{t}</span>)}
        </div>
      )}
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.08]">
        {repo.language && <span className="flex items-center gap-1.5 text-[11px] text-white/55"><span className={`w-2 h-2 rounded-full ${dotColor}`} />{repo.language}</span>}
        <span className="flex items-center gap-1 text-[11px] text-white/50 font-mono"><Star size={10} strokeWidth={1.5} />{repo.stargazers_count}</span>
        <span className="flex items-center gap-1 text-[11px] text-white/50 font-mono"><GitFork size={10} strokeWidth={1.5} />{repo.forks_count}</span>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="ml-auto text-[10px] text-white/45 hover:text-white/80 transition-colors font-mono">GitHub →</a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all(SELECTED_REPOS.map(name =>
      fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`).then(r => { if (!r.ok) throw new Error(); return r.json() })
    )).then(setRepos).catch(() => setError(true)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 md:px-10 pt-20 md:pt-28 pb-16">
        <motion.div {...fadeUp(0)} className="mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mb-2">Projeler</p>
          <h1 className="text-2xl font-bold text-white/90 leading-tight mb-2">Ürettiklerim</h1>
          <p className="text-sm text-white/40 leading-relaxed">Aktif olarak geliştirdiğim canlı projeler ile GitHub'daki açık kaynak çalışmalarım.</p>
        </motion.div>

        <section className="mb-14">
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25">Canlı Projeler</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveProjects.map((project, i) => <LiveProjectCard key={project.url} project={project} index={i} />)}
          </div>
        </section>

        <section>
          <motion.div {...fadeUp(0.25)} className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25">Açık Kaynak</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-mono text-white/25 hover:text-white/50 transition-colors shrink-0">
              <Github size={11} strokeWidth={1.8} />{GITHUB_USERNAME}
            </a>
          </motion.div>
          {loading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{SELECTED_REPOS.map(n => <div key={n} className="h-36 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />)}</div>}
          {error && <p className="text-[12px] text-white/25 font-mono">GitHub API'sine ulaşılamadı.</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => <GithubRepoCard key={repo.name} repo={repo} index={i} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
