# 🧠 Proje Hafızası — alidemirkaya.net

> Bu dosya Claude Mem skill'i tarafından güncellenir.
> Her önemli oturum sonunda buraya kayıt ekle.

---

## Mimari Kararlar

- [ARCH] Sayfa geçişi — CurtainContext
  Context: Sayfalar arası geçişte sinematik "perde" efekti istendi.
  Decision: `AnimatePresence` yerine custom `CurtainContext` + `useCurtain()` hook'u kullanıldı. Tüm navigasyonlar `navigateTo('/path')` ile yapılır, `<Link>` veya `useNavigate` doğrudan kullanılmaz.
  Impact: `src/context/CurtainContext.tsx`, `src/components/Layout.tsx`, tüm sayfa bileşenleri

- [ARCH] Layout yapısı — h-full + overflow-y-auto
  Context: Sayfaların fixed header altında scroll edilebilmesi gerekiyor.
  Decision: Her sayfa bileşeninin root elementi `h-full overflow-y-auto` alır; içerik wrapper'ı `pt-20 md:pt-28` ile header clearance sağlar.
  Impact: Tüm `src/pages/*.tsx` dosyaları

- [ARCH] ArticleViewer component
  Context: AI News sayfasındaki split-panel / full-screen detail pattern'ı Blog sayfasında da kullanılacak.
  Decision: Bu pattern `src/components/ArticleViewer.tsx` olarak extract edildi. Kategori filtreleme, mobile responsive, markdown render içeriyor.
  Impact: `src/pages/AiNews.tsx` bu component'i kullanıyor; gelecekte Blog sayfası da kullanacak.

---

## Bilinen Gotcha'lar

- [GOTCHA] Şirket logo dosya isimleri — encoding
  Context: About sayfasında DeFacto ve Yılmaz Makina logoları kırık görünüyordu.
  Decision: Dosya adında Türkçe karakter (ı) encoding farkı vardı. Dosyayı yeniden kaydedince çözüldü. Import yazarken ASCII karakter kullandığından emin ol.
  Impact: `src/assets/yilmazmakina.png`, `src/assets/defacto.png`

- [GOTCHA] Mobile back button / logo overlap
  Context: AiNews DetailPanel'inin back butonu Layout'taki logo ile üst üste biniyordu.
  Decision: `Layout.tsx`'teki `<main>` elementinden `z-10` kaldırıldı. Fixed DetailPanel artık doğru stacking order'da render oluyor.
  Impact: `src/components/Layout.tsx`

---

## Konvansiyonlar

- [CONVENTION] Tasarım dili — Dark Glassmorphism
  Arkaplan: `bg-white/[0.03]` veya `bg-[#0f0f0f]/80`
  Border: `border border-white/[0.08]` → hover: `border-white/[0.16]`
  Metin hiyerarşisi: başlık `text-white/90`, açıklama `text-white/55`, meta `text-white/30`
  Font mono etiketler: `text-[10px] font-mono tracking-[0.25em] uppercase text-white/25`

- [CONVENTION] Animasyon helper — fadeUp
  Tüm sayfalarda tekrarlanan pattern:
  ```ts
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  })
  ```

- [CONVENTION] Sayfa tam genişlik layout
  `max-w-*` kısıtı kullanma. `px-5 md:px-10` padding ile tam genişlik bırak.

---

## Bug Geçmişi

- [BUG] npm install takılı kaldı — ilk kurulumda background'a alındı, pattern match ile tamamlandığı doğrulandı.
- [BUG] yilmazmakina.png encoding — yukarıda GOTCHA bölümünde detaylı.
- [BUG] Mobile z-index overlap — yukarıda GOTCHA bölümünde detaylı.

---

## Pattern'lar

- [PATTERN] Sayfa iki bölümlü veri yapısı
  AI News ve Prompts sayfaları: sol liste/tree + sağ detay panel.
  Mobile'da detay tam ekran overlay olarak açılır (`fixed inset-0`).
  Bu pattern ArticleViewer component'inde kapsüllendi.

- [PATTERN] GitHub API fetch
  `src/pages/Projects.tsx` içinde `SELECTED_REPOS` dizisine repo adı ekleyerek
  `https://api.github.com/repos/alidmrky/{name}` endpoint'inden veri çekiliyor.
  Rate limit riski düşük (sadece 3 istek, sayfa açılışında bir kez).

- [PATTERN] Favicon otomatik çekme
  `https://www.google.com/s2/favicons?domain={domain}&sz=32`
  UsefulLinks sayfasında kullanılıyor. Hata durumunda baş harf fallback var.
