# Product Requirements Document (PRD)  

---

## 1. Ürün Tanımı ve Amaçlar

### 1.1. Ürün Özeti  
Tangly, klasik Binairo/Takuzu mantık bulmacalarına Tango LinkedIn oyunundan ilham alan eşitlik (=) ve zıtlık (×) bağlantı mekaniğini ekleyen, iki sembollü ("yaban mersini" ve "limon") ızgara tabanlı mobil mantık bulmaca oyunudur.  
Amaç, oyunculara tahmin gerektirmeyen, tek çözümlü, algoritmik olarak oluşturulmuş bulmacalar sunarak saf mantıkla çözüm deneyimi yaşatmaktır.

### 1.2. Hedefler  
- Kullanıcı dostu, estetik ve tematik bir deneyim sağlamak  
- Farklı zorluk seviyelerinde, dinamik ve sınırsız sayıda mantıksal bulmaca üretmek  
- Oyun içi ilerleme ve sosyal etkileşim mekanizmaları ile uzun süreli bağlılık yaratmak  
- Mobilde yüksek performans ve stabilite sunmak  
- Gelir modeli olarak reklamlar ve uygulama içi satın alımları etkin kullanmak  

---

## 2. Kullanıcı ve Pazar Hedefi

### 2.1. Hedef Kitle  
- Mantık ve bulmaca oyunlarını seven tüm yaş grupları  
- Yeni başlayanlar için kolaydan zora geçiş isteyen kullanıcılar  
- Stratejik ve analitik oyun deneyimi arayan oyuncular  

### 2.2. Pazar Konumu  
- Binairo/Takuzu gibi klasik mantık oyunlarının ve Tango LinkedIn oyununun kombinasyonu ile özgünlük  
- Mobilde tahmine dayanmayan, algoritmik olarak üretilen, tek çözümlü bulmaca sunumu  

---

## 3. Ürün Özellikleri

### 3.1. Temel Özellikler  
- **Izgara Tabanlı Mantık Bulmacalar**: 6x6, 8x8, 10x10 gibi farklı boyutlarda  
- **İki Sembol Kullanımı**: Yaban mersini ve limon sembolleri  
- **Oyun Kuralları**: Üçlü tekrar yok, satır/sütun dengesi, eşitlik (=) ve zıtlık (×) bağlantıları  
- **Tek Çözümlü Bulmaca Üretimi**: Backtracking ve backward construction algoritmalarıyla  
- **Tahmin Gerektirmeyen Mantıksal Çözüm Garantisi**: Logic solver kontrolü ile  

### 3.2. Kullanıcı Arayüzü ve Deneyimi  
- Hücre dokunarak döngüsel değişim (boş → yaban mersini → limon → boş)  
- Alternatif sembol seçimi ve yerleştirme modu  
- Geniş dokunma alanları ve net görsel geri bildirim  
- Tematik ve okunabilir simge ve tipografi kullanımı  

### 3.3. Oyun İçi Mekanikler  
- İpucu alma (sınırlı ve reklam karşılığı)  
- Geri alma (undo) ve yeniden başlatma  
- Zamanlayıcı ve performans takibi  
- İlerleme ve ödül sistemi  
- Günlük mücadele ve seriler (streaks)  

### 3.4. Puzzle Üretim ve Yönetim  
- Sunucu tarafında puzzle üretimi (performans ve güvenlik odaklı)  
- Çözüm sayısı ve mantıksal çözüm uygunluk kontrolleri  
- Zorluk seviyelerine göre başlangıç ipuçları ve bağlantı yoğunluğu ayarlaması  

### 3.5. Sosyal ve Rekabetçi Özellikler  
- Liderlik tabloları (global ve arkadaşlar arası)  
- Başarımlar ve kişisel istatistik takibi  
- Sosyal medya paylaşımı (çözüm görseli ve skor paylaşımı)  

### 3.6. Para Kazanma Modelleri  
- Ödüllü reklamlar (ipucu, kozmetik avantajlar için)  
- Banner ve geçiş reklamları  
- Uygulama içi satın alımlar (reklamsız paket, ipuçları, kozmetik)  
- Abonelik planları (potansiyel)  

---

## 4. Teknik Gereksinimler

### 4.1. Platformlar  
- iOS ve Android mobil cihazlar  
- Farklı ekran çözünürlük ve boyutlarına uyumlu responsive tasarım  

### 4.2. Performans  
- Puzzle üretimi sunucu tarafında gerçekleşecek  
- Mobilde akıcı ve hızlı UI etkileşimi  
- Minimum cihaz kaynak kullanımı ve düşük gecikme  

### 4.3. Güvenlik  
- Puzzle üretim ve doğrulama algoritmaları sunucu tarafında gizli tutulacak  
- Hile önleme ve çözüm doğrulama mekanizmaları  

---

## 5. Kullanıcı Yolculuğu (User Flow)

1. **Uygulama Açılışı** → Ana Menü (Başla, Günlük Mücadele, İstatistikler vs.)  
2. **Bulmaca Seçimi** → Zorluk seçimi veya günlük mücadele  
3. **Oynanış Ekranı** → Izgarada mantıksal çözüm, ipucu ve geri alma kullanımı  
4. **Bulmaca Çözümü** → Ödüller, ilerleme kaydı ve sonraki bulmaca önerisi  
5. **Sosyal Paylaşım veya Liderlik Tablosu İncelemesi**  

---

## 6. Ölçüm ve Başarı Kriterleri

- **İlerleme Tamamlama:** Ortalama bulmaca tamamlama süresi ve oranı  
- **Bağlılık:** Günlük mücadele ve seriler özelliği ile artan kullanıcı tutma oranı  

---


## 7. Riskler ve Önlemler

- **Puzzle üretim süresi çok uzun olabilir:** Algoritma optimizasyonu ve önbellekleme  
- **Karmaşık kurallar oyuncuları zorlayabilir:** Zorluk kademelendirmesi ve ipucu sistemleri  
- **Rekabetçi pazarda öne çıkmak zor:** Özgün tema ve sosyal özelliklerle farklılaşma  
- **Sunucu maliyetleri artabilir:** Performans ve verimlilik takibi  

---

## Ekler

- GDD’ye dayalı detaylı oyun kuralları ve oynanış açıklamaları  
- UI/UX mockup’ları  
- Puzzle üretim algoritma teknik dokümanları  
