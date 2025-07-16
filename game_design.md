## 1. Giriş

### 1.1. Proje Özeti
"Tango Game (Tangly) - Play Unlimited," klasik Binairo/Takuzu bulmacalarının mantıksal derinliğini, popüler Tango LinkedIn oyununun "=" ve "×" kurallarıyla harmanlayan yenilikçi bir mobil mantık bulmaca oyunudur. Oyunculara "yaban mersini" ve "limon" sembolleriyle dolduracakları ızgaralar sunar. Her oyuncuya özel dinamik zorluk ve sınırsız bulmaca ile tahmine dayanmayan saf mantıksal çıkarım deneyimi sunar.


### 1.2. Tür
- Mantık Bulmaca Oyunu
- Izgara Tabanlı

---

## 2. Rekabet ve Pazar Analizi

### 2.1. Rakipler

**Tango LinkedIn News Oyunu**  
- + Minimalist tasarım, hızlı oynanış  
- - Stratejik derinlik az

**Binairo / Takuzu**  
- + Matematiksel olarak sağlam kurallar  
- - Görsel çeşitlilik zayıf

**Sudoku, Nonograms, Kakuro**  
- + UI/UX çeşitliliği, kullanıcı kitlesi geniş  
- - Rekabet yüksek

### 2.2. Fırsatlar  
- Daha tematik, eğlenceli görsel temsiller  
- Sosyal medya paylaşımı + günlük içerik ile bağlılık  
- Tahmin gerektirmeyen, adil bulmacalar sunma  


## 3. Oyun Konsepti ve Teması

### 3.1. Temel Konsept
İki sembolle ("yaban mersini" ve "limon") doldurulan kare ızgaralar. Her bulmaca:
- Tek çözümlü
- Algoritmik olarak üretilmiş
- Tahmin gerektirmeyen
- Mantıksal çıkarım ile çözülebilir

### 3.2. Tema ve Sanat Yönü
- **Semboller:** Ayırt edilebilir, tatlı ve davetkâr tasarımlar
- **Tipografi:** Net, modern, okunabilir

---

## 4. Oynanış ve Mekanikler

### 4.1. Çekirdek Oynanış Döngüsü
1. Bulmaca seçimi/oluşturma
2. Izgara etkileşimi
3. Kural kontrolü & geri bildirim
4. Mantıksal çıkarım ve doldurma
5. Çözüm sonrası ödül ve ilerleme

### 4.2. Oyun Kuralları
- **İkili Doldurma:** Her hücre ya yaban mersini ya limon
- **Üçlü Kuralı Yok:** Üç aynı sembol yan yana gelemez
- **Satır/Sütun Dengesi:** Her satır/sütunda eşit sayıda sembol
- **Eşitlik (=):** Bağlı hücreler aynı sembol
- **Zıtlık (×):** Bağlı hücreler zıt semboller
- **Tahmin Yok:** Tüm bulmacalar saf mantıkla çözülebilir, tek çözüm garantisi

### 4.3. Kontroller (UI/UX)
- Hücreye dokunarak sırayla değiştirme (boş -> yaban mersini -> limon -> boş)
- Alternatif: Sembol seç & hücreye yerleştir
- Geniş dokunma alanları

---

## 5. Bulmaca Tasarımı ve Üretimi

### 5.1. Izgara Boyutları
- Küçük: 6x6 (Kolay)
- Orta: 8x8 (Orta)
- Büyük: 10x10 (Zor)

### 5.2. Bulmaca Oluşturma Algoritması
**1.Tercih**
1. Geri İzleme (Backtracking) tabanlı bir algoritma kullanılacaktır. Algoritma, önce tüm kurallara uyan (ikili kural, satır/sütun dengesi) tam ve geçerli bir çözüm ızgarası oluşturacaktır
2. Ardından, bu tam çözüm ızgarasına stratejik olarak "=" ve "×" bağlantıları eklenecektir. Bu bağlantıların yerleşimi, bulmacanın çözüm yolunu ve zorluğunu doğrudan etkileyecektir
3. Son olarak, tam çözümden kademe kademe hücreler boşaltılarak (ipuçları kaldırılarak) bulmaca oluşturulacaktır.

**2.Tercih**
1. Geriye doğru üretim (backward construction) uygulanır:  
   - Kurallara uygun tam bir çözüm oluşturulur  
   - "=" ve "×" işaretleri stratejik yerleştirilir  
   - Hücreler kademeli olarak boşaltılır  
2. Her boşaltma adımında tek çözüm kontrol edilir  
3. Eğer çözüm birden fazlaysa yeniden oluşturulur

### 5.3. Zorluk ve Ölçeklendirme
- Izgara boyutu
- Başlangıç ipuçları
- Çıkarım karmaşıklığı
- "=" ve "×" bağlantı yoğunluğu
- Seviyeler: Kolay, Orta, Zor

### 5.4. Tekil Çözüm Garantisi
Her bulmaca için çözücü algoritma kullanılarak:
- Her bulmacanın tek bir doğru çözümü olduğundan ve asla tahmin gerektirmediğinden emin olmak, oyunun temel prensibidir.
- Bulmacalar, entegre bir algoritma ile mantıksal olarak çözülebilir şekilde oluşturulacak; birden fazla çözüm gerektirenler geçersiz sayılacaktır. Bu sayede oyunculara her zaman adil bulmacalar sunulacaktır.

---

## 6. UI & UX Tasarımı

### 6.1. Ana Ekran ve Menüler
- Minimalist tasarım
- Menü: Yeni Bulmaca, Devam Et, Ayarlar, İstatistikler, Mağaza

### 6.2. Oynanış Arayüzü
- Net çizgili ızgara
- Sembol paleti veya dokunarak değiştirme
- Yardımcı düğmeler: Geri Al, İpucu, Kontrol Et, Menü
- Geçirilen süre
- Açılır kapanır "Hataları Göster" modu

### 6.3. Görsel Geri Bildirim
- **Tamamlanma Durumu:** Parlama, yeşil vurgulama, memnuniyet sesi
- **Geçersiz Durum:** Kırmızı vurgulama, sesli uyarı

### 6.4. Ayarlar
- Tema seçenekleri
- Dil
- Renk körü modu & kontrast ayarları

---

## 7. Para Kazanma (Monetization)

### 7.1. Reklamlar
- **Ödüllü Reklam:** İpucu, tema gibi avantajlar için
- **Geçiş Reklamı:** Yeni bulmaca veya çözüm sonrası arada
- **Banner Reklam:** Ana menü gibi alanlarda

### 7.2. Uygulama İçi Satın Alımlar
- Reklamsız Premium Sürüm (tek seferlik ödeme)
- İpucu Paketleri (küçük/orta/sınırsız)
- Kozmetik Özelleştirme:
- Tema Paketleri (semboller, renkler, arka planlar)
- Ses Paketleri

### 7.3. Abonelik (Potansiyel)
- Reklamsız deneyim, sınırsız ipucu, tüm kozmetik, özel içerikler için aylık/yıllık plan

---

## 8. Etkileşim ve Uzun Ömürlülük

### 8.1. Günlük Mücadeleler
- Günlük özel bulmacalar
- Ödül: Ekstra ipucu, kozmetik, nişan

### 8.2. Seriler (Streaks)
- Günlük oynama alışkanlığını teşvik eder
- Bonuslar ve görsel ödüller

### 8.3. Lider Tabloları
- En hızlı süreler, en çok çözüm, en az tıklayarak çözüm vs.
- Global ve arkadaşlara karşı

### 8.4. Başarımlar (Achievements)
- Hedef odaklı ödüller

### 8.5. İstatistikler ve İlerleme
- Kişisel performans takibi
- Ortalama süre, doğruluk, çözüm sayısı vs.

### 8.6. Sosyal Paylaşım
- Çözüm görseli, skor paylaşımı

### 8.7. Gelecek İçerik Planları
- Yeni ızgara boyutları
- Yeni kural varyasyonları
- Temalı etkinlikler
- Sınırlı süreli kozmetik
