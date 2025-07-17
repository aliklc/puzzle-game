# RFC-006: Başarımlar ve Rozetler

## 1. Amaç
Oyunculara somut hedefler sunarak, ödüller ve tanınma yoluyla oyun içi motivasyonu ve bağlılığı artırmak.

## 2. Motivasyon
- Kullanıcıların uzun vadeli tutulmasını sağlamak ve oyun içi etkileşimi artırmak.
- Oyunculara kişisel gelişimlerini ve başarılarını sergileyecekleri bir platform sunmak.
- Yeni içerik keşfini teşvik etmek ve farklı oyun modlarını denemeye yönlendirmek.

## 3. Kapsam
Bu RFC, aşağıdaki öğeleri kapsar:
- Çeşitli zorluk seviyelerinde ve oyun içi aktivitelerle ilişkili **başarımların** tanımlanması (örn. belirli sayıda bulmaca çözme, üst üste günlük mücadele tamamlama, tüm zorluk seviyelerini oynama).
- Kazanılan başarımlar için görsel olarak çekici **rozetler** ve bu rozetlerin kazanıldığında gösterilecek **animasyonlar**.
- Oyuncunun kişisel **profilinde** veya özel bir "Başarımlar" sayfasında kazanılan ve kilitli olan başarımların gösterimi.
- Başarımların kazanılmasıyla tetiklenecek **oyun içi ödüller** (örn. kozmetik öğeler, ipucu kredileri, oyun içi para).

## 4. Gereksinimler
- FS-009: Başarımlar ve Rozetler (Feature Set)
- FS-006: Zamanlayıcı ve Performans (Başarımlar için veri kaynağı)
- FS-008: İstatistik ve İlerleme (Başarımların gösterileceği alanlar)
- FS-017: Kullanıcı Profili ve Kayıt (Başarımların kullanıcıya bağlanması)

## 5. Teknik Detaylar

### 5.1. Olay Takibi ve Tetikleyiciler
- Oyun içinde belirli olaylar (puzzle tamamlama, günlük giriş, ipucu kullanma vb.) olay dinleyicileri (event listeners) aracılığıyla takip edilir.
- Her başarım için bir veya daha fazla tetikleyici olay ve bir ilerleme eşiği tanımlanır.
- Oyuncunun başarım ilerlemesi, sunucu tarafında güvenli bir şekilde güncellenir ve saklanır.

### 5.2. Veritabanı Yapısı
- Başarımlar, ID, isim, açıklama, kategori, ilerleme eşiği, ödül ID'si ve görsel varlık yolları gibi alanları içeren bir veritabanı tablosunda tanımlanır.
- Kullanıcı başarımları, kullanıcı ID'si, başarım ID'si, mevcut ilerleme, kazanma tarihi ve durum (kilitli/açık) gibi alanlarla ilişkilendirilir.

### 5.3. API Entegrasyonu
- Başarımların listesini ve kullanıcı ilerlemesini çekmek için RESTful API uç noktaları sağlanır.
- Başarım kazanıldığında veya ilerlemesi güncellendiğinde, istemciye gerçek zamanlı bildirim gönderilebilir (isteğe bağlı olarak WebSocket veya push notification).

### 5.4. Frontend Sunumu
- Başarım kazanıldığında oyun içinde kısa, göze çarpan bir animasyonlu bildirim (toast notification veya pop-up) gösterilir.
- Ayrı bir "Başarımlar" sayfası, oyuncunun tüm başarımlarını (kazanılmış ve kilitli) ve ilerlemelerini görsel olarak sergiler.
- Rozetler ve başarımlar için yüksek çözünürlüklü görseller ve pürüzsüz animasyonlar kullanılır.

## 6. Arayüz (UI/UX)
- **Başarımlar Sayfası:** Kategorilere ayrılmış, görsel olarak zengin bir liste görünümü. Kazanılan başarımlar parlar, kilitliler gri gösterilir.
- **İlerleme Çubukları:** Başarımların altında ilerleme çubukları veya sayaçlar, oyuncunun hedefe ne kadar yaklaştığını gösterir.
- **Bildirimler:** Başarım kazanıldığında ekranda belirip kaybolan, kutlama odaklı kısa animasyonlar.

## 7. Potansiyel Riskler ve Önlemler
- **Çok karmaşık hedefler oyuncuyu zorlayabilir veya caydırabilir:**
    - **Önlem:** Başarımlar, kolaydan zora doğru kademeli olarak tasarlanacak; başlangıçta kolay kazanılabilir hedefler sunulacak.
    - **Önlem:** Başarım açıklamaları net ve anlaşılır olacak.
- **UI karmaşası ve bilgi yığılması:**
    - **Önlem:** Başarımlar kategorize edilecek ve kolayca gezinebilir bir arayüz sağlanacak.
    - **Önlem:** Bildirimler kullanıcıyı bunaltmayacak şekilde ayarlanabilir olacak (sıklık, konum).
- **Performans etkisi (özellikle olay takibi):**
    - **Önlem:** Olay takip sistemi optimize edilecek, sunucu yükünü minimumda tutacak şekilde tasarlanacak. Önbellekleme stratejileri kullanılacak.
