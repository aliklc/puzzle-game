# RFC-008: Reklam ve Monetizasyon

## 1. Başlık
RFC-008: Reklam ve Uygulama İçi Satın Alma (IAP) Stratejisi


## 2. Özet (Abstract)
Bu RFC, Tangly mobil oyununun finansal sürdürülebilirliğini sağlamak amacıyla uygulanacak reklam ve uygulama içi satın alma (IAP) stratejilerini tanımlar. Reklam modelleri arasında ödüllü videolar, banner ve geçiş reklamları bulunurken, IAP modelleri reklamsız bir premium deneyim ve oyun içi avantajlar (ipuçları, kozmetik öğeler) sunacaktır.

## 3. Motivasyon
- Oyunun sürekli geliştirilmesi ve sunucu maliyetlerinin karşılanması için sürdürülebilir bir gelir akışı oluşturmak.
- Kullanıcıların oyunu ücretsiz deneyimlemesine olanak tanırken, değer karşılığında premium seçenekler sunarak farklı kullanıcı segmentlerine hitap etmek.
- Oyun içi ekonomiyi dengede tutarak, oyun deneyimini olumsuz etkilemeden gelir elde etmek.
- Pazarlama ve kullanıcı edinimi için ek finansman sağlamak.

## 4. Kapsam
Bu RFC, aşağıdaki monetizasyon bileşenlerini kapsar:
- **Ödüllü Video Reklamlar:** Oyunculara belirli oyun içi avantajlar (örneğin, ipuçları, enerji, özel puzzle'lar) karşılığında video reklam izleme seçeneği sunulması.
- **Banner Reklamlar:** Oyun arayüzünün belirli alanlarında (ana menü, puzzle bitiş ekranı) sabit veya dönen banner reklamların gösterimi.
- **Geçiş Reklamları (Interstitial Ads):** Oyun akışının doğal duraklama noktalarında (örneğin, puzzle bitişi ve yeni puzzle başlangıcı arasında) tam ekran reklamların gösterimi.
- **Reklamsız Premium Sürüm:** Tek seferlik bir IAP ile tüm reklamların kalıcı olarak kaldırılması.
- **Uygulama İçi Satın Alımlar (IAP):**
    - **İpucu Paketleri:** Oyuncuların ek ipuçları satın almasını sağlayan paketler.
    - **Kozmetik Paketler:** Yeni tema ve sembol paketleri gibi görsel özelleştirmelerin satın alınması (RFC-007 ile entegrasyon).
    - **Potansiyel Abonelik Modeli:** Gelecekte aylık/yıllık abonelik ile ek avantajlar sunulabilir (ilk sürüm kapsamı dışı).

## 5. Gereksinimler
- **Fonksiyonel Gereksinimler:**
    - FS-011: Reklam Kaldırma (Feature Set)
    - FS-012: İpucu Paketleri (Feature Set)
    - FS-013: Banner ve Geçiş Reklamları (Feature Set)
    - Güvenli ve doğrulanabilir uygulama içi satın alma mekanizmaları (iOS App Store ve Google Play Store API'leri).
    - Reklam ağı SDK'larının sorunsuz entegrasyonu.
    - Kullanıcının satın alma durumunun kalıcı olarak depolanması ve cihazlar arası senkronizasyonu.
- **Non-Fonksiyonel Gereksinimler:**
    - Reklam yükleme sürelerinde **düşük gecikme**.
    - Reklamların ve IAP akışlarının **stabil ve hatasız** çalışması.
    - Kullanıcı deneyimini en az düzeyde kesintiye uğratacak **optimize reklam yerleşimleri ve sıklıkları**.
    - **Veri güvenliği ve gizliliği** standartlarına (GDPR, CCPA vb.) tam uyum.

## 6. Teknik Detaylar

### 6.1. Reklam Ağı Entegrasyonu
- Google AdMob ve/veya Unity Ads gibi popüler mobil reklam ağlarının SDK'ları entegre edilecektir. Bu SDK'lar, farklı reklam tiplerini (ödüllü video, banner, geçiş) destekleyecektir.
- Her reklam tipi için ayrı reklam birimi ID'leri kullanılacaktır.
- Reklam yükleme ve gösterme işlemleri, oyunun ana iş parçacığını (main thread) bloke etmeyecek şekilde asenkron olarak yürütülecektir.

### 6.2. Reklam Kontrol ve Sıklık Yönetimi
- Reklam sıklığı ve yerleşimi, sunucu tarafında yapılandırılabilir parametreler aracılığıyla yönetilecektir. Bu, oyun içi performans ve kullanıcı geri bildirimlerine göre dinamik olarak ayar yapılmasını sağlayacaktır.
- **Ödüllü Video:** Genellikle kullanıcı inisiyatifiyle (örn. "İpucu Al" butonuna basarak) tetiklenecek, izleme sonrası ödül sunucu tarafından doğrulanarak verilecektir.
- **Geçiş Reklamları:** Her X sayıda puzzle çözümü sonrası veya belirli bir süre aralığı gibi kurallarla tetiklenecek, ancak oyuncunun akışını çok sık kesmeyecek şekilde dengelenecektir.
- **Banner Reklamlar:** Menü ekranları gibi statik UI alanlarında sabit olarak yer alacaktır.

### 6.3. Uygulama İçi Satın Alma (IAP) Entegrasyonu
- iOS için StoreKit ve Android için Google Play Billing Library kullanılacaktır.
- Uygulama içi ürünler (reklamsız paket, ipucu paketleri, kozmetik paketler) ilgili mağaza panellerinde tanımlanacaktır.
- Satın alma işlemleri sunucu tarafında doğrulanacak (receipt validation) ve kullanıcının satın alma durumu veritabanında güvenli bir şekilde saklanacaktır.
- Satın alma sonrası, ilgili özellik (reklamların kaldırılması, ipuçlarının eklenmesi) anında aktif hale getirilecektir.

### 6.4. Kullanıcı Durumu Yönetimi
- Reklamsız paket satın alındığında, kullanıcının `is_premium` veya `ads_disabled` bayrağı sunucu tarafında güncellenecek ve bu durum istemciye iletilecektir.
- Oyun, bu bayrağı kontrol ederek ilgili reklam gösterimlerini durduracaktır.
- İpucu paketleri satın alındığında, kullanıcının ipucu bakiyesi sunucu tarafında güncellenecektir.

## 7. Arayüz (UI/UX)

### 7.1. Reklam İzleme Ekranları
- Ödüllü video reklam öncesi, kullanıcıya ne kadar ödül alacağı ve reklamın süresi hakkında bilgi veren net bir onay penceresi ("Reklamı izle ve 1 ipucu kazan?") sunulacaktır.
- Geçiş reklamları tam ekran olarak gösterilecek, ancak kapatma butonu belirgin ve erişilebilir olacaktır (mağaza kurallarına uygun).
- Banner reklamlar, UI'yı bozmayacak ve önemli oyun elementlerini engellemeyecek şekilde entegre edilecektir.

### 7.2. Satın Alma Ekranları
- "Mağaza" veya "Ayarlar" menüsü altında "Reklamları Kaldır" ve "İpucu Paketleri" gibi bölümler bulunacaktır.
- Her IAP ürünü için net fiyatlandırma, açıklama ve görseller sunulacaktır.
- Satın alma akışı, platformun standart ödeme arayüzlerini kullanacak ve güven verici olacaktır.
- Başarılı bir satın alma sonrası kullanıcıya görsel ve metinsel geri bildirim verilecektir.

## 8. Alternatifler

| Seçenek | Neden Reddedildi |
|:--------|:------------------|
| Sadece reklam geliri | Düşük kullanıcı harcaması potansiyeli, reklam tıkanıklığı riski, daha az premium deneyim. |
| Sadece ücretli oyun (tek seferlik) | Kullanıcı edinimi zorlaşır, daha küçük bir kitleye hitap eder, sürekli gelir akışı olmaz. |
| Sadece abonelik modeli | İlk lansman için yüksek giriş engeli, ücretsiz denemek isteyen kullanıcıları kaybedebiliriz. |
| Üçüncü taraf IAP çözümü kullanma | Platform SDK'ları daha entegre ve güvenli, ek maliyet ve karmaşıklık getirebilir. |

## 10. Potansiyel Riskler ve Önlemler

-   **Kullanıcı rahatsızlığı ve reklam yorgunluğu:**
    -   **Önlem:** Reklam sıklığı ve yerleşimi dikkatlice test edilecek ve kullanıcı geri bildirimlerine göre optimize edilecektir.
    -   **Önlem:** Geçiş reklamları oyun akışını kesmeyecek, doğal duraklama noktalarında gösterilecektir.
    -   **Önlem:** Reklamsız premium sürüm, bu riskleri yönetmek için net bir çıkış yolu sunacaktır.
-   **Satın alma hataları veya kötüye kullanımlar:**
    -   **Önlem:** Tüm IAP işlemleri sunucu tarafında doğrulanacak ve güvenli bir şekilde işlenecektir.
    -   **Önlem:** Olası dolandırıcılık veya hile girişimleri için izleme ve engelleme mekanizmaları kurulacaktır.
    -   **Önlem:** Güvenilir ve yaygın olarak kullanılan platform faturalandırma sistemleri (Apple, Google) kullanılacaktır.
-   **Reklam geliri beklentilerinin karşılanmaması:**
    -   **Önlem:** Reklam yerleşimleri, tipleri ve sıklığı üzerinde A/B testleri yapılacak, en verimli kombinasyonlar bulunacaktır.
    -   **Önlem:** Farklı reklam ağları arasında optimizasyon ve waterfall/bidding stratejileri uygulanacaktır.
-   **Kullanıcı gizliliği ve veri regülasyonlarına uyumsuzluk:**
    -   **Önlem:** Tüm reklam SDK'ları ve IAP entegrasyonları, GDPR, CCPA ve diğer ilgili gizlilik yasalarına tam uyumlu olacaktır.
    -   **Önlem:** Kullanıcılara veri kullanımı ve reklam tercihleri hakkında şeffaf bilgi verilecek ve gerekli izinler alınacaktır.
