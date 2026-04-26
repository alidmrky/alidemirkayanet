'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Home, FolderOpen, Cpu, Link2, Sparkles, User, BookOpen } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { href: '/',                 label: 'Anasayfa',       icon: Home       },
  { href: '/hakkimda',         label: 'Hakkımda',       icon: User       },
  { href: '/projeler',         label: 'Projeler',       icon: FolderOpen },
  { href: '/ai-haberler',      label: 'AI Haberleri',   icon: Cpu        },
  { href: '/blog',             label: 'Blog',           icon: BookOpen   },
  { href: '/faydali-linkler',  label: 'Faydalı Linkler',icon: Link2      },
  { href: '/promptlar',        label: 'Promptlar',      icon: Sparkles   },
]

export default function Nav() {
  const path = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? path === '/' : path.startsWith(href)

  return (
    <>
      {/* ── Logo — top left ── */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[55]">
        <Link href="/">
          <Image
            src="/assets/Logo beyaz.png"
            alt="Ali Demirkaya"
            width={120}
            height={48}
            className="h-9 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            style={{ width: 'auto' }}
          />
        </Link>
      </div>

      {/* ── Desktop Nav Pill — centered at top ── */}
      <nav className="hidden md:flex fixed top-10 left-1/2 -translate-x-1/2 z-[55] items-center gap-6 px-6 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-[11px] font-medium tracking-widest uppercase transition-all duration-200 ${
              isActive(href) ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Mobile Hamburger Button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-5 right-6 z-[55] w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
        aria-label="Menüyü aç"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile Slide-in Panel ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel — slides from right */}
          <div className="fixed top-0 right-0 bottom-0 z-[160] w-72 bg-black/90 backdrop-blur-xl border-l border-white/[0.08] flex flex-col md:hidden">
            {/* Close */}
            <div className="flex items-center justify-between px-6 pt-6 pb-8">
              <Image
                src="/assets/Logo beyaz.png"
                alt=""
                width={80}
                height={32}
                className="h-8 w-auto opacity-70"
                style={{ width: 'auto' }}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-6 flex flex-col gap-1">
              {navItems.map(({ href, label, icon: Icon }, i) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                      active ? 'bg-white/10 text-white' : 'text-white/45 hover:bg-white/5 hover:text-white/80'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                    <span className="text-sm font-medium tracking-wide">{label}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="px-6 pb-10 pt-4 border-t border-white/[0.06]">
              <p className="text-[10px] font-mono tracking-tighter text-white/20 uppercase">
                © 2025 ALİ DEMİRKAYA
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
