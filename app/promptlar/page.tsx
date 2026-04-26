'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Folder, FolderOpen, FileText, Copy, Check, X, ChevronLeft, Tag } from 'lucide-react'
import data from '../../src/data/prompts.json'

interface FileContent { title: string; description: string; tags: string[]; body: string }
interface FileNode { id: string; name: string; type: 'file'; content: FileContent }
interface FolderNode { id: string; name: string; type: 'folder'; children: TreeNode[] }
type TreeNode = FileNode | FolderNode
type Tab = 'skills' | 'agents'

function renderBody(body: string) {
  return body.split('\n').map((line, i) => {
    if (line.startsWith('# ')) return <h2 key={i} className="text-lg font-bold text-white mt-6 mb-2">{line.replace('# ', '')}</h2>
    if (line.startsWith('## ')) return <h3 key={i} className="text-sm font-semibold text-white/90 mt-5 mb-1.5">{line.replace('## ', '')}</h3>
    if (line.startsWith('### ')) return <h4 key={i} className="text-xs font-semibold text-white/70 uppercase tracking-widest mt-4 mb-1">{line.replace('### ', '')}</h4>
    if (line.startsWith('- [ ]')) return <label key={i} className="flex items-start gap-2 text-sm text-white/55 mb-1 cursor-pointer group"><span className="mt-0.5 w-3.5 h-3.5 shrink-0 rounded border border-white/20" /><span>{line.replace('- [ ] ', '')}</span></label>
    if (line.startsWith('- ')) return <p key={i} className="text-sm text-white/55 mb-0.5 pl-3 before:content-['–'] before:mr-2 before:text-white/20">{line.replace('- ', '')}</p>
    if (line.startsWith('```')) return <div key={i} className="h-1" />
    if (line.trim() === '') return <div key={i} className="h-2" />
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return <p key={i} className="text-sm text-white/55 leading-relaxed mb-0.5">{parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="text-white/85 font-medium">{part.replace(/\*\*/g, '')}</strong> : part)}</p>
  })
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handle = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={handle} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] font-medium tracking-wide text-white/40 hover:text-white hover:border-white/25 transition-all">
      {copied ? <><Check size={11} className="text-emerald-400" /> Kopyalandı</> : <><Copy size={11} /> Kopyala</>}
    </button>
  )
}

function TreeRow({ node, depth, selectedId, openFolders, onSelect, onToggle }: {
  node: TreeNode; depth: number; selectedId: string | null; openFolders: Set<string>
  onSelect: (node: FileNode) => void; onToggle: (id: string) => void
}) {
  const isFolder = node.type === 'folder'
  const isOpen = openFolders.has(node.id)
  const isActive = !isFolder && selectedId === node.id
  return (
    <>
      <button onClick={() => isFolder ? onToggle(node.id) : onSelect(node as FileNode)}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        className={`w-full flex items-center gap-2 py-1 pr-3 text-left rounded-lg transition-all duration-150 ${isActive ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white/80 hover:bg-white/5'}`}>
        <span className="shrink-0 w-3 flex items-center justify-center">
          {isFolder && <ChevronRight size={11} className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} ${isActive ? 'text-white' : 'text-white/30'}`} />}
        </span>
        <span className="shrink-0">
          {isFolder ? isOpen ? <FolderOpen size={14} className="text-amber-400/70" /> : <Folder size={14} className="text-amber-400/50" /> : <FileText size={13} className={isActive ? 'text-sky-400' : 'text-white/30'} />}
        </span>
        <span className={`text-[12px] font-mono truncate ${isActive ? 'text-white' : ''}`}>{node.name}</span>
      </button>
      <AnimatePresence initial={false}>
        {isFolder && isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            {(node as FolderNode).children.map(child => <TreeRow key={child.id} node={child} depth={depth + 1} selectedId={selectedId} openFolders={openFolders} onSelect={onSelect} onToggle={onToggle} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ContentPanel({ file, onClose, mobile }: { file: FileNode; onClose: () => void; mobile: boolean }) {
  const c = file.content
  return (
    <motion.div initial={mobile ? { y: '100%' } : { opacity: 0, x: 32 }} animate={mobile ? { y: 0 } : { opacity: 1, x: 0 }} exit={mobile ? { y: '100%' } : { opacity: 0, x: 32 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={mobile ? 'fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-xl overflow-hidden' : 'flex-1 h-full flex flex-col border-l border-white/[0.07] bg-black/35 backdrop-blur-md overflow-hidden'}>
      <div className="flex-1 overflow-y-auto px-6 md:px-10 pt-6 md:pt-10 pb-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors">
            {mobile ? <><ChevronLeft size={14} /><span>Geri</span></> : <><X size={12} /><span>Kapat</span></>}
          </button>
          <span className="text-[10px] font-mono text-white/20 tracking-wide">{file.name}</span>
        </div>
        <div className="flex items-center gap-2 mb-4 flex-wrap"><Tag size={11} className="text-white/20" />
          {c.tags.map(tag => <span key={tag} className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-white/50">{tag}</span>)}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 tracking-tight">{c.title}</h2>
        <p className="text-sm text-white/45 leading-relaxed mb-8 pb-6 border-b border-white/[0.07] max-w-xl">{c.description}</p>
        <div className="relative rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.03]">
            <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase">Prompt</span>
            <CopyButton text={c.body} />
          </div>
          <div className="p-5 space-y-0.5">{renderBody(c.body)}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Prompts() {
  const [activeTab, setActiveTab] = useState<Tab>('skills')
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tree: TreeNode[] = activeTab === 'skills' ? (data.skills as TreeNode[]) : (data.agents as TreeNode[])

  const toggleFolder = (id: string) => setOpenFolders(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })

  return (
    <div className="flex h-full w-full overflow-hidden">
      <motion.div animate={{ width: selectedFile && !isMobile ? '280px' : isMobile ? '100%' : '320px' }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="relative flex-shrink-0 h-full flex flex-col overflow-hidden border-r border-white/[0.07]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="px-4 pt-20 md:pt-28 pb-4 border-b border-white/[0.06]">
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25 mb-2">Prompt Kütüphanesi</p>
            <h1 className="text-xl font-bold text-white tracking-tight">Promptlar</h1>
          </div>
          <div className="flex px-3 pt-3 pb-2 gap-1 border-b border-white/[0.06]">
            {(['skills', 'agents'] as Tab[]).map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setSelectedFile(null) }}
                className={`flex-1 py-1.5 text-[11px] font-medium tracking-widest uppercase rounded-lg transition-all duration-200 ${activeTab === tab ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/60 hover:bg-white/5'}`}>
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }} className="flex-1 overflow-y-auto px-2 py-2">
              {tree.map(node => <TreeRow key={node.id} node={node} depth={0} selectedId={selectedFile?.id ?? null} openFolders={openFolders} onSelect={setSelectedFile} onToggle={toggleFolder} />)}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedFile && (
          isMobile
            ? <ContentPanel key="mobile" file={selectedFile} onClose={() => setSelectedFile(null)} mobile />
            : <ContentPanel key="desktop" file={selectedFile} onClose={() => setSelectedFile(null)} mobile={false} />
        )}
      </AnimatePresence>

      {!selectedFile && !isMobile && (
        <div className="flex-1 h-full flex flex-col items-center justify-center gap-3">
          <FileText size={32} className="text-white/10" />
          <p className="text-sm text-white/20 font-mono tracking-wide">Sol panelden bir dosya seç</p>
        </div>
      )}
    </div>
  )
}
