## 1. Giriş

### 1.1. Proje Özeti
"Tango Game (Tangly) - Play Unlimited," klasik Binairo/Takuzu bulmacalarının mantıksal derinliğini, popüler Tango LinkedIn oyununun "=" ve "×" kurallarıyla harmanlayan yenilikçi bir mobil mantık bulmaca oyunudur. Oyunculara "yaban mersini" ve "limon" sembolleriyle dolduracakları ızgaralar sunar. Her oyuncuya özel dinamik zorluk ve sınırsız bulmaca ile tahmine dayanmayan saf mantıksal çıkarım deneyimi sunar.


### 1.2. Tür
- Mantık Bulmaca Oyunu
- Izgara Tabanlı

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

## 4. Oynanış ve Mekanikler

### 4.1. Çekirdek Oynanış Döngüsü
1. Bulmaca seçimi
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

-------------------------------------------------------------------------------------

### 5. Bulmaca Oluşturma Algoritması ve Zorluk


#### 5.1. Bulmaca Oluşturma Mantığı

Her bulmaca, **tahmin gerektirmeyen ve tek çözümlü** olacak şekilde otomatik olarak oluşturulur. Bu üretim süreci, iki temel algoritmayı birlikte kullanır:

- **Backtracking (geri izleme)**
- **Backward Construction (geriye doğru üretim)**


##### 🔧 Aşamalar:

##### 1. Tam Çözüm Üretimi (Backtracking)
- Rastgele değerlerle ama tamamen kurallara uygun olacak şekilde dolu bir tablo oluşturulur.
- Kullanılan kurallar:
  - **Üçlü tekrar yasağı:** Satır/sütun içinde üç aynı sembol (yaban mersini veya limon) yan yana gelemez
  - **Denge kuralı:** Her satır ve sütunda eşit sayıda her iki sembol bulunmalı
  - **Satır/sütun eşsizliği:** Aynı satır veya sütundan birden fazla bulunamaz
- Bu tablo algoritmik olarak çözülmüştür, oyuncunun göremeyeceği **tam çözüm**dür.

##### 2. Kullanıcıya Sunulacak Puzzle Üretimi (Backward Construction)
- Üretilen tam çözüme dayalı olarak:
  - Belirli hücreler rastgele boşaltılır
  - Çözümden alınan bilgilere göre bazı `=` (eşit) ve `×` (zıt) bağlantıları yerleştirilir
- Bu adımda dikkat edilenler:
  - Boşluklar ve işaretler dengeli yerleştirilir
  - Zorluk seviyesi; boşluk sayısı, ipucu yoğunluğu ve bağlantıların konumuna göre belirlenir

##### 3. Tekil Çözüm ve Mantıksal Çözüm Kontrolü (Backtracking ile)
- Oluşan puzzle, backtracking ile tekrar çözülerek **çözüm sayısı hesaplanır**
- Eğer:
  - 🔹 **Sadece 1 çözüm** varsa → bulmaca kabul edilir
  - 🔸 **Birden fazla çözüm** varsa → yeni bir tam çözüm oluşturularak süreç başa döner
  - Aynı zamanda, **logic solver** algoritması ile tahmin kullanmadan mantıksal olarak çözülebilirlik testi yapılır.
  - Eğer puzzle bu testlerden geçerse kabul edilir, geçemezse boşluklar ve bağlantılar yeniden düzenlenir.

Bu sayede oyuncular yalnızca **mantıkla çözülebilir ve tek bir doğru çözüme sahip** adil bulmacalarla karşılaşır.

#### 5.2. Api'de Puzzle üretimi 

- Puzzle üretimi, backtracking ve logic solver gibi CPU yoğun algoritmalar içerir.  
- Bu işlemin sunucu tarafında yapılması, performans ve güvenlik açısından avantaj sağlar.  
- Kullanıcılar cihazına yük bindirmez, tutarlı ve doğrulanmış puzzle’lar sunulur.  

#### 5.3. Zorluk ve Ölçeklendirme
- Izgara boyutu
- Başlangıç ipuçları
- Çıkarım karmaşıklığı
- "=" ve "×" bağlantı yoğunluğu
- Seviyeler: Kolay, Orta, Zor

-------------------------------------------------------------------------------------

## 6. UI & UX Tasarımı

### 6.1. Ana Ekran (Main Menu)

**Amaç:** Kullanıcıyı yönlendirmek, erişimi hızlı kılmak ve minimal bir görünümle profesyonellik sunmak.

**Bileşenler:**
- 🎮 **Başla**: Son bulmacadan devam et
- ⚙️ **Ayarlar**: Tema, dil, ses gibi tercihler
- 📊 **İstatistikler**: Başarı yüzdesi, ortalama süre, kazanılan ödüller
- 🛒 **Mağaza**: Kozmetik içerikler, ipuçları, premium seçenekler
- 📅 **Günlük Mücadele**: Güne özel tek seferlik bulmaca
- 🏆 **Liderlik Tabloları**


### 6.2. Oynanış Ekranı (Puzzle UI)

+-----------------------------+
| 🫐 Tangly 8x8 🟡 | ⏱   💡
|-----------------------------|
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
| ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ |
|                             |
| ⭕          🔁         ☰   |   
+-----------------------------+

**Simge Butonları:**
- 🔁 Yeniden başla
- 💡 İpucu al (sınırlı / reklam karşılığı)
- ⏱ Zamanlayıcı
- ⭕ Geri al (undo)
- ☰ Menüye dön

### 6.3. Görsel Geri Bildirim
- **Tamamlanma Durumu:** Parlama, yeşil vurgulama, memnuniyet sesi
- **Geçersiz Durum:** Kırmızı vurgulama, sesli uyarı

### 6.4. Ayarlar
- Tema seçenekleri
- Dil
- Renk körü modu

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

#### ✨ Gelişmiş Notlar (Opsiyonel)
- Özgünlük katmak için bazı hücreler özel olarak `"⊛"` (çift anlamlı/kilitli hücre) olarak tanımlanabilir.  
- Bu hücreler çözümde 0 veya 1 olabilse de, çözüm sonucunu etkilemez.
- `"⊛"` hücreleri **oyuncu tarafından değiştirilemez**, yalnızca görsel ipucu amacıyla gösterilir ve oynanışa stratejik çeşit katar.