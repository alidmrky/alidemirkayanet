import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ali Demirkaya',
  description: 'Software Developer & AI Enthusiast',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative h-screen w-full bg-black overflow-hidden selection:bg-white/20">

        {/* ── Background Video ── */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
              type="video/mp4"
            />
          </video>
          <div className="noise-overlay absolute inset-0 opacity-[0.4] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/85" />
        </div>

        {/* ── Floating Nav (logo + pill + mobile) ── */}
        <Nav />

        {/* ── Page Content — full screen ── */}
        <main className="relative h-full w-full overflow-hidden">
          {children}
        </main>

        {/* ── Footer Info (desktop only) ── */}
        <div className="hidden md:block fixed bottom-6 left-8 z-20 pointer-events-none">
          <p className="text-[10px] font-mono tracking-tighter text-white/20 uppercase">
            © 2025 ALİ DEMİRKAYA
          </p>
        </div>
      </body>
    </html>
  )
}
