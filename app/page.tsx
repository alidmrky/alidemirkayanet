'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white px-6">
      <div className="max-w-4xl text-center space-y-5 md:space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-white/50 mb-3 md:mb-4 block">
            Software Developer // AI Enthusiast
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
            ALİ DEMİRKAYA
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed px-2"
        >
          Yazılım geliştiriyor, yapay zeka araçlarıyla
          <span className="text-white"> üretken kalmaya </span>
          çalışıyorum.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="pt-4 md:pt-8 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8"
        >
          <Link
            href="/projeler"
            className="group flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-500"
          >
            <span className="text-sm font-medium tracking-widest uppercase">Keşfet</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex gap-8 md:gap-10">
            {[
              { label: 'GitHub',   href: 'https://github.com/alidmrky' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-demirkaya-76a8a8107/' },
              { label: 'YouTube',  href: 'https://www.youtube.com/@AliDemirkaya' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute right-12 bottom-12 hidden lg:block text-right">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-white/40 uppercase">Current Status</p>
          <p className="text-xs text-white uppercase tracking-widest">Building the next big thing</p>
        </div>
      </div>
    </div>
  )
}
