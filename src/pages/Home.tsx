import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white px-6">
      {/* Hero Content */}
      <div className="max-w-4xl text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/50 mb-4 block">
            Software Developer // AI Enthusiast
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
            ALİ DEMİRKAYA
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Geleceği kodlayan teknolojiler ve yapay zeka ile 
          <span className="text-white"> sınırları zorlayan </span> 
          hikayeler inşa ediyorum.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="pt-8 flex items-center justify-center gap-8"
        >
          <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-500">
            <span className="text-sm font-medium tracking-widest uppercase">Keşfet</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="hidden md:flex gap-10">
            {['GitHub', 'X', 'LinkedIn'].map((platform) => (
              <a 
                key={platform} 
                href="#" 
                className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative details */}
      <div className="absolute right-12 bottom-12 hidden lg:block text-right">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-white/40 uppercase">Current Status</p>
          <p className="text-xs text-white uppercase tracking-widest">Building the next big thing</p>
        </div>
      </div>
    </div>
  )
}
