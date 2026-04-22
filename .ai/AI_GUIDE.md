# 🤖 AI Geliştirme Rehberi — alidemirkaya.net

Bu dosya, projeyi AI asistanıyla geliştirirken kullanılacak tüm workflow'ları
ve skill dosyalarını bir araya toplar. Yeni geliştirici olarak başlıyorsan buradan başla.

---

## 📁 Skill Dosyaları

| Skill | Dosya | Ne Zaman Kullanılır |
|-------|-------|---------------------|
| 🚀 **Superpowers** | [SKILL.md](./skills/obra-superpowers/SKILL.md) | Yeni bir özellik/proje geliştirirken — ilk çalıştırılacak |
| 🎨 **Frontend Design** | [SKILL.md](./skills/anthropic-frontend-design/SKILL.md) | UI bileşeni veya sayfa tasarlarken |
| 🔍 **Code Review** | [SKILL.md](./skills/anthropic-code-review/SKILL.md) | PR açmadan önce veya kodu incelemeye göndermeden önce |
| 🔒 **Security Review** | [SKILL.md](./skills/anthropic-security-review/SKILL.md) | Güvenlik açığı kontrolü veya hassas dosya düzenlerken |
| 🧠 **Claude Mem** | [SKILL.md](./skills/thedotmack-claude-mem/SKILL.md) | Oturum başında/sonunda proje bilgisi kaydetmek için |
| 🏢 **GStack** | [SKILL.md](./skills/garrytan-gstack/SKILL.md) | Tam sprint döngüsü: plan → build → review → test → ship |

---

## 🗺 Ne Yapmak İstiyorsun?

### 🆕 Yeni özellik geliştiriyorum
```
1. [Superpowers]  → Brainstorming + plan yap
2. [GStack]       → /office-hours ile başla, sonra /autoplan
3. [Frontend Des] → UI tasarımı için
4. [Claude Mem]   → Kararları kaydet
5. [Code Review]  → PR'ı gönder
6. [GStack]       → /ship ile bitir
```
👉 Başlangıç: [obra-superpowers/SKILL.md](./skills/obra-superpowers/SKILL.md)

---

### 🎨 Sayfa veya UI bileşeni tasarlıyorum
```
1. [Frontend Des] → Estetik yönü seç, kod yaz
2. [GStack]       → /design-shotgun ile varyantlar üret
3. [GStack]       → /design-html ile production HTML üret
4. [GStack]       → /design-review ile kalite denetimi
```
👉 Başlangıç: [anthropic-frontend-design/SKILL.md](./skills/anthropic-frontend-design/SKILL.md)

---

### 🔍 Kodu review ediyorum / PR açmadan önce
```
1. [Code Review]  → /code-review komutunu çalıştır
2. Çıktıyı oku, kritik bulguları düzelt
3. [Security Rev] → Güvenlik açığı var mı kontrol et
4. [GStack]       → /ship ile PR aç
```
👉 Başlangıç: [anthropic-code-review/SKILL.md](./skills/anthropic-code-review/SKILL.md)

---

### 🔒 Güvenlik denetimi yapıyorum
```
1. [Security Rev] → Otomatik pattern kontrolü (injection, XSS, vb.)
2. [GStack]       → /cso ile OWASP + STRIDE çalıştır
3. Bulguları raporla ve düzelt
```
👉 Başlangıç: [anthropic-security-review/SKILL.md](./skills/anthropic-security-review/SKILL.md)

---

### 🐛 Bug düzeltiyorum
```
1. [Superpowers]  → systematic-debugging: 4 aşamalı root-cause analizi
2. [GStack]       → /investigate komutunu kullan
3. Düzelttikten sonra: verification-before-completion
4. [Code Review]  → Düzeltilmiş kodu review yap
```
👉 Başlangıç: [obra-superpowers/SKILL.md](./skills/obra-superpowers/SKILL.md)

---

### 🧠 Oturumu kaydediyorum / hatırlatıcı bırakıyorum
```
1. [Claude Mem] → Oturum sonunda önemli kararları kaydet
2. .ai/memory.md dosyasına yaz
3. Sonraki oturum başında yükle
```
👉 Başlangıç: [thedotmack-claude-mem/SKILL.md](./skills/thedotmack-claude-mem/SKILL.md)

---

### 🚀 Tam sprint döngüsü (plan → ship)
```
/office-hours     → Fikri sorgula ve netleştir
/autoplan         → CEO + Design + Eng review
/review           → Kod kalite kontrolü
/qa               → Browser üzerinden QA testi
/cso              → Güvenlik denetimi
/ship             → PR aç ve gönder
/land-and-deploy  → Merge + production doğrulama
```
👉 Başlangıç: [garrytan-gstack/SKILL.md](./skills/garrytan-gstack/SKILL.md)

---

## 📋 Yeni Geliştirici Kurulum Adımları

> Projeye ilk kez katkı sağlıyorsan bu listeyi tamamla:

- [ ] Bu dosyayı oku
- [ ] [GStack SKILL.md](./skills/garrytan-gstack/SKILL.md) dosyasını oku
- [ ] [Superpowers SKILL.md](./skills/obra-superpowers/SKILL.md) dosyasını oku
- [ ] [Claude Mem SKILL.md](./skills/thedotmack-claude-mem/SKILL.md) — ilk oturum öncesi
- [ ] `.ai/memory.md` dosyası varsa oku (proje hafızası)
- [ ] Kod yazmaya başlamadan `/office-hours` çalıştır

---

## 🗂 Proje Hafızası

Proje boyunca alınan önemli kararlar, keşfedilen pattern'lar ve düzeltilen
bug'lar aşağıdaki dosyada tutulur:

👉 [memory.md](./memory.md) _(Claude Mem tarafından güncellenir)_

---

## 📌 Genel Kurallar

1. **Kod yazmadan önce plan yap** — Superpowers/Brainstorming adımını atla#
2. **Test önce yaz** — RED → GREEN → REFACTOR (TDD zorunlu)
3. **Her PR'ı review et** — `/code-review` olmadan merge etme
4. **Güvenliği ihmal etme** — sensitive dosyalarda `/security-review` çalıştır
5. **Oturum sonunda kaydet** — Claude Mem ile kararları belgele
6. **YAGNI** — İhtiyaç duymadığın şeyi yazma
7. **DRY** — Kendini tekrar etme

---

_Bu dosya [AI_GUIDE.md](./.ai/AI_GUIDE.md) olarak projeye eklenmiştir._  
_Skill kaynakları: obra/superpowers · anthropics/claude-code · thedotmack/claude-mem · garrytan/gstack_
