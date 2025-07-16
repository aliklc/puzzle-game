# Tango Game (Tangly) - Play Unlimited  
## Oyun Tasarım Belgesi Taslağı

---

## 1. Giriş  
Bu belge, "Tango Game (Tangly) - Play Unlimited" adlı yeni mantık bulmaca oyunumuz için ön araştırmanın bulgularını özetlemektedir. Tango LinkedIn News oyunu ve klasik Binairo/Takuzu'dan esinlenerek, mevcut mantık ızgara bulmacalarının analizi, "yaban mersini veya limon" kural setimiz için temel mekaniklerin belirlenmesi, bulmaca oluşturma algoritmalarının araştırılması ve sınırsız bulmaca sunumu için sezgisel bir kullanıcı deneyiminin tanımlanmasına odaklanılmıştır. Amaç, GDD'miz için sağlam bir temel oluşturmak ve bilinçli tasarım ve teknik kararlar almak.

---

## 2. Rekabet Analizi (Mantık Bulmacaları)  
### 2.1. Temel Rakip Analizi  
**Tango LinkedIn News Oyunu:**  
- Kurallar, Sunum, Kullanıcı Katılımı: Benzer ızgara tabanlı mantık bulmacası. Minimalist, temiz arayüz.  
- Güçlü Yönler: Kolay öğrenilebilir kurallar, hızlı oyun döngüleri, sosyal platform entegrasyonu.  
- Zayıf Yönler: Belirli konu ile sınırlı, derin strateji eksikliği.  
- Benzersiz Satış Noktaları: Sosyal medya entegrasyonu, kısa süreli beyin jimnastiği.

**Binairo / Takuzu Oyunları:**  
- Kurallar: İkili semboller (0/1), her satır/sütunda eşit sayıda sembol, üç aynı yan yana olmaz.  
- Güçlü Yönler: Net, matematiksel olarak sağlam, zorluk seviyeleri iyi tanımlı.  
- Zayıf Yönler: Görsel çeşitlilik az, sınırlı tema potansiyeli.  
- Benzersiz Satış Noktaları: Saf mantıksal çıkarım, ustalaşması zor.

**Diğer Popüler Mantık Izgara Bulmacaları (Sudoku, Nonograms, Kakuro):**  
- UI/UX: Hücre dokunma/sürükleme, renk kodlama, ipuçları, geri al/yinele, hata kontrolü, ilerleme göstergeleri.  
- Para Kazanma: Reklamlar (banner, video), uygulama içi satın almalar (ipuçları, temalar), abonelikler.  
- Güçlü Yönler: Geniş kitle, kanıtlanmış mekanik, iyi arayüz.  
- Zayıf Yönler: Yüksek rekabet, özgünlük ihtiyacı.  
- Benzersiz Satış Noktaları: Uzun süreli oynanabilirlik, günlük meydan okumalar.

---

## 3. Temel Mekanikler ve Kural Seti Araştırması  
### 3.1. Belirli Kuralların Derinlemesine İncelenmesi  
- Her hücre ya yaban mersini 🫐 ya limon 🍋 olacak.  
- Aynı sembolden en fazla 2 yan yana (yatay/dikey) olabilir.  
- Her satır ve sütunda eşit sayıda yaban mersini ve limon bulunmalı.  
- "=" ile ayrılmış hücreler aynı türde olmalı.  
- "×" ile ayrılmış hücreler zıt türde olmalı.  
- Her bulmacanın tek doğru cevabı vardır, çıkarım yoluyla çözülebilir, tahmin veya rastgele çözmeye gerek kalmamalı.

### 3.2. Matematiksel/Mantıksal Çıkarımlar  
- Kurallar, çözülebilirlik ve zorluk belirler.  
- 6×6 ızgarada her satır/sütunda 3 yaban mersini ve 3 limon olmalı.  
- Tek çözüm garantisi için geriye doğru üretim ve ipucu bırakma yöntemi.  

### 3.3. Görsel Temsil  
- Yaban mersini ve limon için net simgeler/renkler.  
- "=" ve "×" işaretleri hücreler arasında görsel olarak belirgin.  
- Kural ihlallerinde görsel uyarılar (örneğin, kırmızı hücreler).  
- Satır/sütun sayacı veya ilerleme göstergeleri.

---

## 4. Bulmaca Üretimi ve Zorluk Ölçeklendirme Araştırması  

### 4.1. Geriye Doğru Üretim (Backward Construction)  
1. Rastgele ancak kurallara tamamen uygun **tam çözüm** oluşturulur.  
2. Hücreler kontrollü şekilde boşaltılır.  
3. Her adımda bulmacanın tek bir çözüm içerip içermediği **doğrulama algoritmalarıyla** kontrol edilir.  
4. Geçerli bulmaca kullanıcıya sunulur.

### 4.2. Doğrulama Mekanizmaları  

#### Kurallara Uygunluk Kontrolü (`isValidBoard`)  
- 3 aynı meyve art arda olup olmadığını kontrol eder.  
- Satır/sütun meyve dengesi sağlanmış mı?  
- "=" ve "×" işaretleri uygun mu?

#### Çözüm Sayacı (`countSolutions`)  
- Board’daki boş hücreler üzerinden tüm olası kombinasyonlar denenir.  
- Geçerli çözümler sayılır.  
- Eğer **sadece 1 çözüm** varsa: bulmaca geçerli.  
- Aksi halde: yeni grid oluşturulur.

---

### 4.3. Zorluk Ölçeklendirme Yöntemleri  
- Izgara boyutunu büyütmek (ör: 8×8, 10×10).  
- Başlangıç ipuçlarının sayısını azaltmak.  
- "=" ve "×" işaretlerinin stratejik konumu.  
- Çıkarım karmaşıklığını artırmak (basit, orta, zor çıkarımlar).

### 4.4. Tek Doğru Cevap ve Tahmin Etmeden Çözülebilirlik Garantisi  
- Bulmaca çözücü algoritma sadece mantıksal çıkarımla çözmeli, tahmin yapmamalı.  
- Tek çözüm varsa bulmaca kabul edilir, yoksa yeniden üretilir.

---

## 5. Kullanıcı Deneyimi (UI/UX) Araştırması  
### 5.1. Giriş Yöntemleri (Mobil İçin)  
- Hücreye dokunup semboller arasında geçiş (toggle).  
- Sürükleme ile sembol yerleştirme.  
- Tuş takımı / seçim paneli.

### 5.2. Görsel Geri Bildirim Mekanizmaları  
- Doğru yerleştirme anında görünür.  
- Kural ihlali durumunda kırmızı vurgulama, ses/titreşim.  
- İlerleme göstergeleri.

### 5.3. Özellikler  
- Geri Al (Undo) çok adımlı destek.  
- İpucu sistemi (sınırlı, reklamla kazanılabilir).  
- Hata kontrolü tüm ızgara için.  
- Oyun durumunu kaydetme.  
- Yeniden başlatma seçeneği.

### 5.4. Minimalist ve Temiz Görsel Tasarım  
- Basit, okunabilir fontlar.  
- Göz yormayan renk paleti.  
- Anlaşılır ikonlar.  
- Gereksiz unsurlar yok.

---

## 6. Para Kazanma ve Etkileşim Araştırması (Sınırsız Bulmacalar)  
### 6.1. Para Kazanma Modelleri  
- Banner reklamlar (alt/üst).  
- Ödüllü video reklamlar (ipuçları vs).  
- Geçiş reklamları (oturum arası).  
- Premium kilit açma: reklam kaldırma, ekstra ipuçları, kozmetik.  
- Abonelik: reklam kaldırma, sınırsız ipucu, özel bulmacalar.

### 6.2. Etkileşim Stratejileri  
- Günlük zorluklar ve bulmacalar.  
- Seri takibi (streaks).  
- Lider tabloları (zorluk bazlı).  
- Başarımlar ve rozetler.  
- Sosyal paylaşım imkanı.

---


