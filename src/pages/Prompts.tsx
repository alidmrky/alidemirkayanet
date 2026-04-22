import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ChevronDown } from 'lucide-react'

const promptGroups = [
  {
    category: 'Kod Geliştirme',
    prompts: [
      {
        id: 1,
        title: 'Senior Code Reviewer',
        description: 'Kodu kıdemli bir mühendis gözüyle inceler, güvenlik açıklarını ve teknik borcu tespit eder.',
        tags: ['GPT-4', 'Claude'],
        prompt: `Sen deneyimli bir senior yazılım mühendisisin. Aşağıdaki kodu incele:

1. **Güvenlik açıkları**: XSS, injection, CSRF gibi riskleri tespit et
2. **Performans**: N+1 sorguları, gereksiz re-render, bellek sızıntıları
3. **Okunabilirlik**: İsimlendirme, fonksiyon boyutu, yorum kalitesi
4. **Teknik borç**: Hızlı ama sonradan sorun çıkaracak kısımlar

Her bulgu için: [Ciddiyet: Kritik/Orta/Düşük] etiketi koy ve spesifik düzeltme öner.`,
      },
      {
        id: 2,
        title: 'Test Yazıcı',
        description: 'Verilen bir fonksiyon için kapsamlı birim testleri üretir.',
        tags: ['Claude', 'GPT-4'],
        prompt: `Bu fonksiyon için kapsamlı birim testleri yaz:

[FONKSİYON BURAYA]

Şunları içersin:
- Happy path (beklenen normal kullanım)
- Edge cases (sınır değerler, boş input)
- Error cases (hata fırlatması gereken durumlar)
- Sınır değer analizi

Test framework olarak [Jest/Vitest/Pytest] kullan. Her testin ne test ettiğini açıkla.`,
      },
    ],
  },
  {
    category: 'İçerik & Yazı',
    prompts: [
      {
        id: 3,
        title: 'SEO Blog Yazarı',
        description: 'Verilen konudan SEO uyumlu, AEO\'ya hazır blog yazısı oluşturur.',
        tags: ['Claude', 'GPT-4o'],
        prompt: `Konu: [KONU]
Hedef anahtar kelime: [ANA ANAHTAR KELİME]
Hedef kitle: [KİTLE]

SEO ve AEO optimizasyonlu blog yazısı yaz:
- H1: Ana anahtar kelimeyi içeren başlık
- Meta description (155 karakter max)
- Giriş: Okuyucunun sorusunu doğrudan yanıtla (AEO için)
- H2/H3 yapısı ile organize et
- Featured snippet için paragraf boxları kullan
- Schema markup önerisi ekle

Ton: Bilgilendirici ama sohbet havasında. Teknik olmayan okuyucu için de anlaşılır.`,
      },
      {
        id: 4,
        title: 'Tweet Thread Dönüştürücü',
        description: 'Uzun bir metni viral olabilecek Twitter/X thread formatına çevirir.',
        tags: ['Claude', 'GPT-4o'],
        prompt: `Aşağıdaki metni viral bir Twitter/X thread\'e dönüştür:

[METİN]

Kurallar:
- İlk tweet: Dikkat çekici, merak uyandıran hook. İddia veya soru ile başla.
- Her tweet max 280 karakter
- Thread boyunca 1 ana fikir: [ANA FİKİR]
- Rakam ve somut örnekler kullan
- Son tweet: Güçlü call-to-action

Format: Tweet 1/N şeklinde numarala.`,
      },
    ],
  },
  {
    category: 'Sistem & Ajan',
    prompts: [
      {
        id: 5,
        title: 'Ajan Sistem Promptu Şablonu',
        description: 'Güçlü ve kontrollü AI ajan kurmak için temel sistem promptu iskelet.',
        tags: ['Claude', 'GPT-4', 'Gemini'],
        prompt: `# Rol ve Kimlik
Sen [AJAN_ADI] adlı bir AI asistanısın. [ŞİRKET/KİŞİ] adına çalışıyorsun.

# Uzmanlık Alanın
- [ALAN_1]
- [ALAN_2]
- [ALAN_3]

# Davranış Kuralları
1. Emin olmadığın şeyleri söyleme; bunun yerine "araştırmam gerekiyor" de
2. Kişisel bilgileri asla üçüncü şahıslarla paylaşma
3. Kapsam dışı talepleri kibarca reddet

# Kapsam Dışı Konular
- [YASAKLI_1]
- [YASAKLI_2]

# Çıktı Formatı
Her yanıt şu yapıda olsun:
- Kısa özet (1-2 cümle)
- Detaylı açıklama
- Sonraki adım önerisi

Başlamaya hazır mısın?`,
      },
    ],
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#E5E5E3] bg-white text-[11px] text-[#6B7280] hover:text-[#0A0A0A] hover:border-[#C0C0BE] transition-all"
      aria-label="Promptu kopyala"
    >
      {copied ? (
        <>
          <Check size={11} className="text-emerald-500" />
          Kopyalandı
        </>
      ) : (
        <>
          <Copy size={11} />
          Kopyala
        </>
      )}
    </button>
  )
}

function PromptCard({ prompt }: { prompt: typeof promptGroups[0]['prompts'][0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-[#E5E5E3] rounded-2xl bg-white overflow-hidden hover:border-[#C0C0BE] transition-colors">
      {/* Header */}
      <button
        className="w-full flex items-start justify-between gap-3 p-4 text-left"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#0A0A0A]">{prompt.title}</h3>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">{prompt.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {prompt.tags.map(tag => (
              <span key={tag} className="tag text-[10px]">{tag}</span>
            ))}
          </div>
        </div>
        <ChevronDown
          size={15}
          className={`shrink-0 text-[#9B9B98] transition-transform duration-200 mt-0.5 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium tracking-widest text-[#A8A8A5] uppercase">Prompt</span>
                <CopyButton text={prompt.prompt} />
              </div>
              <pre className="bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl p-3 text-xs text-[#3A3A38] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                {prompt.prompt}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Prompts() {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold text-[#0A0A0A] mb-2">Yardımcı Promptlar</h1>
        <p className="text-sm text-[#6B7280] max-w-md">
          Günlük iş akışında kullandığım, test edilmiş prompt şablonları.
          Üzerine tıkla, istediğini kopyala.
        </p>
      </motion.div>

      {/* Prompt groups */}
      <div className="max-w-2xl space-y-8">
        {promptGroups.map((group, gi) => (
          <motion.section
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-labelledby={`prompt-group-${gi}`}
          >
            <h2
              id={`prompt-group-${gi}`}
              className="text-xs font-semibold tracking-widest text-[#A8A8A5] uppercase mb-3"
            >
              {group.category}
            </h2>
            <div className="flex flex-col gap-3">
              {group.prompts.map((prompt, pi) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.1 + pi * 0.06, duration: 0.3 }}
                >
                  <PromptCard prompt={prompt} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
