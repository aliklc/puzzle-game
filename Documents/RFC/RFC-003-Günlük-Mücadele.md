# RFC-003: Günlük Mücadele Dağıtım Servisi

## 1. Başlık
RFC-003:Günlük Mücadele (Daily Challenge) Puzzle Dağıtım Sistemi

## 2. Özet (Abstract)
Bu RFC, Tangly mobil oyununda oyunculara her gün benzersiz, yeni ve uygun zorlukta bir mantık bulmacası sunmak için bir **Günlük Mücadele Dağıtım Servisi**'ni tanımlar. Sistem, puzzle üretim altyapısı (RFC-001) ile entegre çalışarak düzenli ve kaliteli içerik akışı sağlayacak, oyuncuların günlük girişlerini teşvik ederek uzun vadeli bağlılık ve etkileşimi artıracaktır. Kazanılan ödüller ve başarımlar aracılığıyla oyuncu motivasyonu desteklenecektir.

## 3. Motivasyon
-   **Günlük Girişleri Teşvik Etmek:** Oyuncuların her gün oyunu açmak için somut bir neden sunarak kullanıcı tutma oranlarını artırmak (retention).
-   **Uzun Vadeli Bağlılık Yaratmak:** Düzenli olarak yeni içerik sunarak ve "seri" (streak) mekaniği ile oyuncuların oyuna olan ilgisini canlı tutmak.
-   **Rekabet ve Sosyal Etkileşim:** Tüm oyunculara aynı günlük puzzle'ı sunarak küresel ve arkadaş liderlik tablolarında (RFC-005: İstatistikler) adil bir rekabet ortamı yaratmak.
-   **Ödül ve Başarımlarla Motivasyon:** Günlük mücadeleleri tamamlayan oyuncuları oyun içi ödüller (ipuçları, kozmetik öğeler) ve özel başarımlar (RFC-009) ile teşvik etmek.
-   **İçerik Yönetimi Verimliliği:** Manuel puzzle ekleme ihtiyacını azaltarak otomatik içerik dağıtımı sağlamak.

## 4. Teknik Açıklama

### 4.1. İçerik Üretim ve Planlama
-   **Puzzle Kaynağı:** Günlük mücadele puzzle'ları, `RFC-001: Tangly Puzzle Üretim Sistemi` kullanılarak sunucu tarafında önceden hazırlanacak ve veritabanında saklanacaktır. Bu, canlı üretim risklerini azaltır ve kalite kontrolüne olanak tanır.
-   **Planlama ve Hazırlık:** Her gün için belirli bir zorluk seviyesine sahip bir puzzle atanacaktır. Özel günler veya etkinlikler için önceden tasarlanmış veya daha yüksek zorlukta puzzle'lar manuel olarak programa eklenebilir.
-   **Zorluk Ayarı:** Günlük mücadele puzzle'larının zorluk seviyesi, genel oyuncu kitlesinin ortalamasına göre belirlenecek ve düzenli olarak optimize edilecektir.
-   **Teklik ve Tutarlılık:** Tüm oyunculara aynı gün için **aynı günlük puzzle** sunulacaktır. Bu, liderlik tabloları ve sosyal paylaşım için temel bir gereksinimdir.

### 4.2. Dağıtım ve Takip Mekanizması
-   **API Uç Noktası:** İstemci, belirli bir tarih için günlük mücadele puzzle'ını talep etmek üzere sunucuya bir API çağrısı yapacaktır
-   **Zaman Dilimi Yönetimi:** Günlük mücadelenin sıfırlanma zamanı **UTC 00:00** olarak belirlenecektir. İstemci, yerel saat dilimine bakılmaksızın UTC gününe göre puzzle'ı alacaktır. Bu, küresel tutarlılığı sağlar.
-   **Kullanıcı İlerlemesi ve Durumu:** Kullanıcının günlük mücadeledeki durumu sunucu tarafında saklanacaktır.
-   **Tamamlama Doğrulaması:** Kullanıcı puzzle'ı tamamladığında, çözüm `RFC-002: Tangly Puzzle Solver Yapısı` kullanılarak sunucu tarafında doğrulanacak ve ardından ilerleme güncellenecektir.
-   **Veri Toplama:** Tamamlama süreleri, ipucu kullanımları gibi veriler, gelecekteki zorluk ayarı optimizasyonları ve kullanıcı analizi için (`RFC-005: İstatistik ve İlerleme Takibi` ile entegre) toplanacaktır.

### 4.3. Ödül ve Motivasyon Mekanizmaları
-   **Ödüller:** Günlük mücadeleyi başarıyla tamamlayan oyunculara oyun içi ödüller (örn. X adet ipucu, Y adet oyun parası, özel bir kozmetik öğe) verilecektir. Ödül miktarı ve türü sunucu tarafından yapılandırılabilir olacaktır.
-   **Seriler (Streaks):** Oyuncuların ardışık günlerde günlük mücadeleleri tamamlaması durumunda "tamamlama serileri" (streaks) kaydedilecek ve bu seriler için özel başarımlar (örn. "7 Günlük Seri", "30 Günlük Seri") ve ek ödüller (`RFC-006: Başarımlar ve Rozetler` ile entegre) sunulacaktır.
-   **Görsel Geri Bildirim:** Günlük mücadelenin tamamlanması ve ödül kazanımı sonrası görsel ve işitsel kutlama efektleri gösterilecektir.

### 4.4. Performans ve Ölçeklenebilirlik
-   **Puzzle Önbellekleme:** Günlük puzzle'lar, yüksek erişim hızı için sunucu tarafında bir önbellekte (örn. Redis) saklanacaktır.
-   **API Optimizasyonu:** Günlük mücadele API'si, yüksek eşzamanlı kullanıcı taleplerini karşılayabilecek şekilde optimize edilecek ve yük dengeleme ile ölçeklendirilecektir.
-   **Failover Mekanizması:** Ana puzzle üretim/dağıtım sistemi bir sorun yaşadığında, önceden hazırlanmış acil durum puzzle'ları otomatik olarak devreye sokulabilir.
-   **Veritabanı İndeksleme:** Kullanıcı verileri ve puzzle bilgileri için uygun veritabanı indeksleri kullanılacaktır.

## 5. Etkiler

-   **Kullanıcı Bağlılığında ve Günlük Aktif Kullanıcı Sayısında (DAU) Artış:** Düzenli içerik ve ödüller sayesinde oyuncular daha sık oyuna geri dönecektir.
-   **Monetizasyon Potansiyeli:** İpuçları gibi ödüller, dolaylı olarak ipucu paketlerinin (RFC-008) değerini artırabilir.
-   **Sosyal Paylaşım ve Topluluk:** Aynı puzzle üzerinde rekabet etme ve başarıları paylaşma imkanı sunar.
-   **Daha Zengin Kullanıcı Analitiği:** Günlük oyuncu davranışları ve puzzle zorlukları hakkında değerli veriler toplanmasını sağlar.

## 6. Alternatifler

| Seçenek | Neden Reddedildi |
|:--------|:-----------------|
| **Her kullanıcıya rastgele puzzle sunmak:** | Küresel/yerel liderlik tablolarında adil rekabeti engeller. Sosyal paylaşım ve "bugünki puzzle" hakkında sohbet imkanını kısıtlar. Tutarsız kullanıcı deneyimi yaratır. |
| **Sadece offline puzzle üretimi ve paketleme:** | Esneklik düşüktür; yeni puzzle'lar eklemek veya zorluk ayarlarını değiştirmek için uygulama güncellemesi gerekir. Sunucu taraflı kişiselleştirme ve dinamik içerik dağıtımına izin vermez. |
| **İstemci tarafında günlük puzzle üretimi:** | Her cihazda farklı puzzle'lar oluşabilir, tutarlılık sorunu yaşanır. Performans ve güvenlik riskleri barındırır, hileye açıktır. |

## 7. Ek Notlar

-   Günlük mücadele ödüllerinin ekonomisi dikkatlice dengelenmeli, diğer IAP'lerle (ipucu paketleri) çelişmemelidir.
-   Ödül serileri (streaks) için görsel bir sayaç ve ilerleme göstergesi UI'da tasarlanmalıdır.
-   Haftalık veya aylık özel mücadeleler gibi genişletmeler için sistemin esnek olması sağlanmalıdır.
-   Hava durumu veya gerçek dünya olayları gibi dış faktörlere dayalı "temalı" günlük mücadeleler ileride değerlendirilebilir.
