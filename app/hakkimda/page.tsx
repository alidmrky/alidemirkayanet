'use client'

import { motion } from 'framer-motion'
import { Github, Youtube, Linkedin, Mail, GraduationCap, MapPin, BookOpen, Headphones, Code2, Award } from 'lucide-react'

const contacts = [
  { label: 'GitHub',   value: 'alidmrky',           href: 'https://github.com/alidmrky',                          icon: Github   },
  { label: 'LinkedIn', value: 'ali-demirkaya',       href: 'https://www.linkedin.com/in/ali-demirkaya-76a8a8107/', icon: Linkedin },
  { label: 'YouTube',  value: '@AliDemirkaya',       href: 'https://www.youtube.com/@AliDemirkaya',                icon: Youtube  },
  { label: 'E-posta',  value: 'alidmrky@gmail.com',  href: 'mailto:alidmrky@gmail.com',                           icon: Mail     },
]

const stats = [
  { value: '6+', label: 'Yıl Deneyim' },
  { value: '4',  label: 'Şirket'      },
  { value: '13', label: 'GitHub Repo' },
]

const currently = [
  { icon: Code2,      label: 'İnşa ediyor', value: 'alidemirkaya.net'        },
  { icon: BookOpen,   label: 'Okuyor',      value: 'The Pragmatic Programmer' },
  { icon: Headphones, label: 'Dinliyor',    value: 'Lex Fridman Podcast'      },
]

const experience = [
  {
    company: 'Turkcell',
    logo: '/assets/turkcell.webp',
    logoBg: 'bg-yellow-500/10',
    roles: [{
      title: 'Senior Software Developer',
      period: 'Oca 2023 – Devam ediyor',
      duration: '3 yıl 4 ay',
      desc: 'Bankacılık uygulamaları geliştirme ekibinde Core Banking ve Finansal Kanal Yönetimi uygulamalarının geliştirilmesine katkı sağlıyorum. React JS, Java, .Net, Microservice, SOAP ve REST API teknolojileri ile Oracle ve MSSQL veritabanlarında çalışıyorum.',
    }],
  },
  {
    company: 'DeFacto',
    logo: '/assets/defacto.png',
    logoBg: 'bg-white/5',
    totalDuration: '2 yıl 6 ay',
    roles: [
      { title: 'Software Developer Specialist', period: 'Tem 2021 – Ara 2022', duration: '1 yıl 6 ay', desc: 'Omnichannel süreçlerinde tüm kanalların kesintisiz çalışmasını sağlamaya yönelik yazılım geliştirme süreçlerinde yer aldım.' },
      { title: 'Software Developer', period: 'Tem 2020 – Tem 2021', duration: '1 yıl 1 ay', desc: 'Şirket içindeki yenilenen omnichannel süreçlerin yönetimi için gerekli dönüşüm projesinde görev aldım.' },
    ],
  },
  {
    company: 'Yılmaz Makina San. ve Tic. Ltd. Şti.',
    logo: '/assets/yilmazmakina.png',
    logoBg: 'bg-white/5',
    roles: [{ title: 'Software Developer — ERP Sorumlusu', period: 'Tem 2019 – Haz 2020', duration: '1 yıl · İstanbul', desc: 'Üretim sektöründe faaliyet gösteren şirketin mevcut ERP sistemini kullanıcılar için işlevsel hale getirmek üzerine çalışmalar yürüttüm.' }],
  },
  {
    company: 'Yarış Kabin San. ve Tic. A.Ş.',
    logo: null,
    logoLetter: 'Y',
    logoBg: 'bg-white/5',
    roles: [{ title: 'Stajyer', period: 'Haz 2018 – Ağu 2018', duration: '3 ay · Balıkesir', desc: 'Yazılım geliştirme alanında ilk profesyonel staj deneyimi.' }],
  },
]

const stack = [
  { category: 'Frontend',  items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next.js'] },
  { category: 'Backend',   items: ['Node.js', 'Java', '.NET', 'Python', 'REST API', 'SOAP'] },
  { category: 'AI & LLM',  items: ['Claude API', 'OpenAI', 'LangChain', 'MCP Protocol', 'RAG'] },
  { category: 'Veritabanı & Araçlar', items: ['Oracle', 'MSSQL', 'PostgreSQL', 'Docker', 'Git'] },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  return (
    <div className="h-full overflow-y-auto md:overflow-hidden">
      <div className="relative flex flex-col md:flex-row h-full">

        {/* LEFT PANEL */}
        <div className="md:w-[380px] lg:w-[420px] flex-shrink-0 md:h-full md:overflow-y-auto border-b md:border-b-0 md:border-r border-white/[0.07] bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
          <div className="px-7 md:px-8 pt-20 md:pt-28 pb-10">

            <motion.div {...fadeUp(0)} className="flex items-center gap-5 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white/10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/prrofilepicture.jpeg" alt="Ali Demirkaya" className="w-full h-full object-cover object-top scale-110" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white leading-tight mb-2">Ali Demirkaya</h1>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-[12px] text-white/40"><MapPin size={12} /> Türkiye</span>
                  <span className="flex items-center gap-2 text-[12px] text-white/40"><GraduationCap size={12} /> Balıkesir Üniversitesi, 2019</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.04)} className="grid grid-cols-3 gap-2 mb-6">
              {stats.map(s => (
                <div key={s.label} className="flex flex-col items-center py-3 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <span className="text-lg font-bold text-white leading-none mb-0.5">{s.value}</span>
                  <span className="text-[9px] font-mono tracking-wide text-white/30 uppercase">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.07)} className="flex flex-col gap-1 mb-6 pb-6 border-b border-white/[0.07]">
              {contacts.map(({ label, value, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200 group">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-white/20 transition-all">
                    <Icon size={15} className="text-white/45 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-white/25 leading-none mb-0.5">{label}</p>
                    <p className="text-[12px] text-white/60 group-hover:text-white/90 transition-colors truncate">{value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mb-6 pb-6 border-b border-white/[0.07]">
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25 mb-3">Şu an</p>
              <div className="flex flex-col gap-2">
                {currently.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-white/30" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-white/25 leading-none mb-0.5">{label}</p>
                      <p className="text-[12px] text-white/55 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.13)} className="space-y-3 mb-6 pb-6 border-b border-white/[0.07]">
              <p className="text-[13px] text-white/55 leading-relaxed">Yazılım dünyasına olan tutkum, üniversite yıllarımda başladı. 2019 yılında Balıkesir Üniversitesi Endüstri Mühendisliği bölümünden mezun oldum ancak asıl serüvenim çok daha öncesinde, 2. sınıfta kendi blog sayfamı kurup satırlar kodlamaya başladığımda tetiklendi.</p>
              <p className="text-[13px] text-white/45 leading-relaxed">2023'ten bu yana <span className="text-white/70">Turkcell</span>'de Bankacılık uygulamaları geliştirme ekibinde çalışmaya devam ediyorum.</p>
            </motion.div>

            <motion.div {...fadeUp(0.16)}>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25 mb-4">Teknoloji Yığını</p>
              <div className="space-y-3">
                {stack.map(group => (
                  <div key={group.category}>
                    <p className="text-[9px] font-mono tracking-widest uppercase text-white/20 mb-1.5">{group.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map(item => (
                        <span key={item} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/45">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 md:h-full md:overflow-y-auto">
          <div className="px-7 md:px-10 pt-20 md:pt-28 pb-16">
            <motion.div {...fadeUp(0.05)} className="mb-12">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mb-7">Deneyim</p>
              <div className="space-y-8">
                {experience.map((exp, ei) => (
                  <motion.div key={exp.company} {...fadeUp(0.08 + ei * 0.06)}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center shrink-0 overflow-hidden ${exp.logoBg}`}>
                        {exp.logo
                          ? <img src={exp.logo} alt={exp.company} className="w-7 h-7 object-contain" />
                          : <span className="text-sm font-bold text-white/40">{(exp as {logoLetter?: string}).logoLetter}</span>
                        }
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/85">{exp.company}</p>
                        {(exp as {totalDuration?: string}).totalDuration && <p className="text-[11px] text-white/30 font-mono">{(exp as {totalDuration?: string}).totalDuration}</p>}
                      </div>
                    </div>
                    <div className={`space-y-5 ${exp.roles.length > 1 ? 'pl-5 border-l border-white/[0.07]' : ''}`}>
                      {exp.roles.map((role, ri) => (
                        <div key={ri} className="relative">
                          {exp.roles.length > 1 && <div className="absolute -left-5 top-1.5 w-1.5 h-1.5 rounded-full bg-white/20 -translate-x-[3px]" />}
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
                            <h3 className="text-sm font-semibold text-white/80">{role.title}</h3>
                            <span className="text-[10px] font-mono text-white/25">{role.period} · {role.duration}</span>
                          </div>
                          <p className="text-xs text-white/40 leading-relaxed">{role.desc}</p>
                        </div>
                      ))}
                    </div>
                    {ei < experience.length - 1 && <div className="mt-8 h-px bg-white/[0.05]" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mb-7">Eğitim</p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0"><GraduationCap size={18} className="text-white/40" /></div>
                  <div>
                    <p className="text-sm font-semibold text-white/80 mb-0.5">Balıkesir Üniversitesi</p>
                    <p className="text-[12px] text-white/45 mb-0.5">Endüstri Mühendisliği · 2015 – 2019</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0"><Award size={18} className="text-white/40" /></div>
                  <div>
                    <p className="text-sm font-semibold text-white/80 mb-0.5">Kongre Sunumu</p>
                    <p className="text-[12px] text-white/45">Yöneylem Araştırması ve Endüstri Mühendisliği Kongresi · 2019</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
