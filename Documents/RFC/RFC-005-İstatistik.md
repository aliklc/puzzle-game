# RFC-005: İstatistik ve İlerleme Takibi

## 1. Başlık
RFC-005: Oyuncu Performans Metrikleri ve İstatistik Takip Sistemi

## 2. Özet (Abstract)
Bu RFC, Tangly oyununda oyuncuların bireysel performanslarını (çözüm süresi, doğruluk, ipucu kullanımı vb.) takip etmek, depolamak ve görsel olarak sunmak için bir sistem önerir. Amaç, oyuncuların gelişimlerini somut verilerle görmelerini sağlayarak oyun motivasyonlarını artırmak ve kişiselleştirilmiş bir deneyim sunmaktır.

## 3. Motivasyon
- Oyuncuların oyun içi performanslarını izleyerek kişisel gelişimlerini fark etmelerini sağlamak.
- Rekabetçi ruhu beslemek ve kişisel rekorlar kırma motivasyonunu artırmak.
- Oyuncuların farklı zorluk seviyelerindeki yeterliliklerini anlamalarına yardımcı olmak.
- Uzun vadeli kullanıcı bağlılığını ve yeniden etkileşimi teşvik etmek.

## 4. Kapsam
Bu RFC, aşağıdaki metriklerin toplanmasını, depolanmasını ve görselleştirilmesini kapsar:
- **Temel Metrikler:**
    - Tamamlanan bulmaca sayısı (toplam ve zorluk seviyesine göre)
    - Ortalama çözüm süresi (toplam ve zorluk seviyesine göre)
    - En iyi çözüm süresi (her zorluk seviyesi için)
    - Kullanılan toplam ipucu sayısı
    - Yapılan toplam hata sayısı
    - Günlük mücadele tamamlama serileri (streaks)
- **Raporlama Periyotları:** Günlük, Haftalık, Aylık ve Genel (Tüm Zamanlar) performans özetleri.
- **Gösterim Alanı:** Oyuncuya özel, detaylı bir istatistik sayfası (genellikle profil ekranı altında erişilebilir).

## 5. Gereksinimler
- **Fonksiyonel Gereksinimler:**
    - FS-008: İstatistik ve İlerleme Takibi (Feature Set'ten gelen ana özellik)
    - FS-006: Zamanlayıcı ve Performans (Çözüm süresi gibi verilerin kaynağı)
    - FS-003: Oynanış Izgarası (Hamle ve ipucu kullanım verilerinin kaynağı)
    - FS-017: Kullanıcı Profili ve Kayıt (İstatistiklerin kullanıcı profili ile ilişkilendirilmesi)
- **Non-Fonksiyonel Gereksinimler:**
    - Performans verilerinin **gerçek zamanlıya yakın** bir şekilde toplanması ve işlenmesi.
    - Veri toplama ve depolama sürecinde **yüksek güvenilirlik ve tutarlılık**.
    - Kullanıcı istatistiklerine hızlı erişim için **optimizasyon**.
    - Kullanıcı gizliliği ve veri güvenliği standartlarına **tam uyum**.

## 6. Teknik Detaylar

### 6.1. Olay Takibi ve Veri Toplama
- Oyunun istemci tarafında, `puzzle_start`, `puzzle_end`, `hint_used`, `cell_interaction` (doğru/yanlış hamle tespiti için) gibi kritik oyun olayları izlenecektir.
- Her olay, gerekli meta verilerle (oyuncu ID, puzzle ID, zorluk seviyesi, zaman damgası, olay spesifik veriler) birlikte sunucuya **asenkron** olarak raporlanacaktır.
- İletişim, güvenli bir API uç noktası (HTTPS) üzerinden JSON formatında yapılacaktır.

### 6.2. Veri Depolama ve İşleme
- Ham oyun olay verileri, yüksek ölçeklenebilirliğe sahip bir zaman serisi veritabanında (örn. InfluxDB veya belirli bir log/analitik sistemi) saklanabilir.
- Oyuncu istatistikleri için özet veriler (aggregations), periyodik olarak (örn. her puzzle bitiminde veya belirli aralıklarla) bir ilişkisel veritabanına (örn. PostgreSQL) veya NoSQL veritabanına (örn. MongoDB) kaydedilecektir.
- Veri tutarlılığı sağlamak için sunucu tarafında veri doğrulamaları (örneğin, hileli zaman damgalarını veya tutarsız verileri eleme) uygulanacaktır.

### 6.3. API ve Frontend Entegrasyonu
- İstemci, kullanıcının istatistik verilerini belirli bir zaman aralığına göre (günlük, haftalık, aylık, tüm zamanlar) çekmek için sunucu API'sini kullanacaktır.
- API, özetlenmiş istatistik verilerini JSON formatında döndürecektir.

## 7. Arayüz (UI/UX)

### 7.1. İstatistik Sayfası
- Ana menüden veya oyuncu profilinden erişilebilen özel bir "İstatistikler" sayfası olacaktır.
- Sayfa, oyuncunun **en iyi skorları**, **ortalama performansları** ve **ilerlemesini** gösteren kartlar ve grafikler içerecektir.
- Zorluk seviyesine göre filtreleme ve "Tüm Zamanlar", "Bu Ay", "Bu Hafta", "Bugün" gibi tarih aralığı filtreleri bulunacaktır.

## 8. Alternatifler

| Seçenek | Neden Reddedildi |
|:--------|:------------------|
| Yalnızca istemci tarafında veri depolama | Veri güvenilirliği ve tutarlılığı sağlanamaz, cihaz değiştiğinde istatistikler kaybolur, hileye açık olur. |
| Üçüncü taraf analitik araçları (sadece) | Özelleştirilmiş ve detaylı oyun içi metriklerin raporlanmasında esneklik sınırlı olabilir, maliyet ve veri gizliliği endişeleri. |
| Ham verilerin direkt frontend'e iletilmesi | Performans sorunlarına yol açar (çok fazla veri), güvenlik riski, istemci tarafında karmaşık hesaplama ihtiyacı. |

## 9 Potansiyel Riskler ve Önlemler

- **Performans verilerinin güvenilirliği ve hile:**
    - **Önlem:** İstemciden gelen veriler sunucu tarafında titizlikle doğrulanacak ve anormal davranışlar (çok hızlı çözümler, sıfır hata vb.) tespit edilerek filtrelenecektir.
    - **Önlem:** Veri manipülasyonunu engellemek için gerekli güvenlik protokolleri uygulanacaktır.
- **Veritabanı performansı ve ölçeklenebilirlik:**
    - **Önlem:** Veritabanı şeması ve sorgular optimize edilecek, indeksleme stratejileri uygulanacaktır.
    - **Önlem:** Yük dengeleme ve yatay ölçeklendirme gibi mimari yaklaşımlar değerlendirilecektir.
- **UI/UX karmaşıklığı:**
    - **Önlem:** Tasarım süreci boyunca kullanıcı testleri yapılacak, sade ve anlaşılır bir arayüz hedeflenecektir.
    - **Önlem:** Aşırı bilgi yüklemesinden kaçınılacak, önemli metrikler ön plana çıkarılacaktır.

