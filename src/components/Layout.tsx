import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon, Home, FolderOpen, Cpu, Link2, Sparkles } from 'lucide-react'
import logo from '../assets/Logo beyaz.png'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Anasayfa', icon: Home, end: true },
  { to: '/projeler', label: 'Projeler', icon: FolderOpen, end: false },
  { to: '/ai-news', label: 'AI News', icon: Cpu, end: false },
  { to: '/faydali-linkler', label: 'Faydalı Linkler', icon: Link2, end: false },
  { to: '/yardimci-promptlar', label: 'Yardımcı Promptlar', icon: Sparkles, end: false },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden selection:bg-white/20">
      {/* ── Background Video Section ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Noise Overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* ── Fixed UI Elements ── */}
      
      {/* Top Left: Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="absolute top-8 left-8 z-50"
      >
        <img 
          src={logo} 
          alt="Ali Demirkaya" 
          className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
        />
      </motion.div>

      {/* Navigation Pill (Optional, for single page feel) */}
      <nav className="absolute top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `text-[11px] font-medium tracking-widest uppercase transition-all ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Content ── */}
      <main className="relative z-10 h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-8 z-50">
        <p className="text-[10px] font-mono tracking-tighter text-white/30 uppercase">
          © 2025 ALİ DEMİRKAYA // BUİLT FOR THE FUTURE
        </p>
      </div>
    </div>
  )
}
