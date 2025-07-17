# RFC-009: Kullanıcı Profili ve Senkronizasyon

## 1. Başlık
RFC-009: Kullanıcı Profili, Kimlik Doğrulama ve Bulut Tabanlı İlerleme Senkronizasyon Sistemi

## 2. Özet (Abstract)
Bu RFC, Tangly oyununda oyuncuların oyun ilerlemelerini, başarımlarını ve satın alımlarını birden fazla cihaz arasında sorunsuz bir şekilde senkronize etmelerini sağlayacak bir kullanıcı profili ve bulut tabanlı depolama sistemini tanımlar. Sistem, güvenli kimlik doğrulama mekanizmaları ve veri tutarlılığı yöntemleri içerecektir.

## 3. Motivasyon
- Oyuncuların cihaz değiştirmeleri veya uygulamayı yeniden yüklemeleri durumunda ilerlemelerini kaybetmelerini önlemek.
- Oyuncuların farklı cihazlarda (telefon, tablet) kesintisiz bir oyun deneyimi yaşamalarını sağlamak.
- Oyunculara kişiselleştirilmiş bir profil aracılığıyla oyun içi başarılarını sergileme imkanı sunmak.
- Kullanıcı sadakatini ve bağlılığını artırmak.
- Reklam kaldırma veya ipucu paketleri gibi uygulama içi satın alımların kullanıcıya kalıcı olarak bağlı kalmasını garanti etmek.

## 4. Kapsam
Bu RFC, aşağıdaki ana bileşenleri kapsar:
- **Kullanıcı Hesap Yönetimi:** Oyuncuların hesap oluşturma (e-posta/şifre veya sosyal giriş), mevcut hesaba giriş yapma ve şifre sıfırlama gibi işlemleri.
- **Misafir Hesap Desteği:** Kayıt olmak istemeyen kullanıcılar için anonim ilerleme kaydı ve daha sonra hesaba yükseltme seçeneği.
- **Bulut Tabanlı İlerleme Kaydı:** Oyuncu ilerlemesinin (tamamlanan puzzle'lar, çözülmemiş puzzle'lar, en iyi süreler, istatistikler, başarımlar, ipucu bakiyesi, satın alınan öğeler, aktif tema) merkezi bir sunucuda güvenli bir şekilde depolanması.
- **Çoklu Cihaz Senkronizasyonu:** Oyuncunun birden fazla cihazda aynı hesaba giriş yaparak ilerlemelerinin otomatik olarak senkronize edilmesi.

## 5. Gereksinimler
- **Fonksiyonel Gereksinimler:**
    - FS-017: Kullanıcı Profili ve Kayıt (Feature Set'ten gelen ana özellik)
    - FS-005: İstatistik ve İlerleme Takibi (Verilerin senkronize edilmesi)
    - FS-009: Başarımlar ve Rozetler (Verilerin senkronize edilmesi)
    - FS-008: Reklam ve Monetizasyon (Satın alma durumlarının senkronize edilmesi)
    - Kullanıcı hesabını silme seçeneği (GDPR/KVKK uyumlu).
- **Non-Fonksiyonel Gereksinimler:**
    - **Yüksek Güvenlik:** Kimlik doğrulama ve veri depolamada endüstri standartlarında güvenlik protokolleri (şifreleme, yetkilendirme).
    - **Veri Bütünlüğü:** Çakışan senkronizasyon durumlarında veri kaybını önleyici mekanizmalar.
    - **Ölçeklenebilirlik:** Artan kullanıcı sayısıyla birlikte performansını koruyabilen bir sistem.
    - **Düşük Gecikme:** Senkronizasyon işlemlerinin kullanıcı deneyimini olumsuz etkilemeyecek kadar hızlı olması.
    - **Yasal Uyumluluk:** GDPR, CCPA gibi veri gizliliği düzenlemelerine tam uyum.

## 6. Teknik Detaylar

### 6.1. Kimlik Doğrulama Mekanizmaları
- **Sosyal Giriş (OAuth 2.0):** Google Play Games ve Apple Sign In (iOS için zorunlu) entegrasyonları öncelikli olacaktır. Bu, kullanıcılar için hızlı ve kolay bir kayıt/giriş deneyimi sunar.
- **E-posta/Şifre:** Gerekirse, geleneksel e-posta ve şifre tabanlı kayıt/giriş seçeneği de sunulabilir (Firebase Authentication gibi bir hizmetle kolayca entegre edilebilir).
- Misafir kullanıcılar için, cihaz kimliği tabanlı geçici bir profil oluşturulacak ve bu profil daha sonra kayıtlı bir hesaba yükseltilebilecek (veri aktarımı ile).

### 6.2. Veritabanı ve Veri Modeli
- Kullanıcı profili verileri (kullanıcı ID, e-posta, oluşturma tarihi vb.), oyun ilerlemesi (puzzle durumları, istatistikler, başarımlar), satın alma kayıtları gibi veriler merkezi bir bulut veritabanında (örn. Firebase Firestore/Realtime Database, AWS DynamoDB, PostgreSQL) saklanacaktır.
- Veri modeli, kullanıcı ID'sine göre ilişkili verileri kolayca sorgulayabilecek şekilde tasarlanacaktır. Her önemli veri parçası (puzzle tamamlanma tarihi, ipucu sayısı) zaman damgası içerecektir.

### 6.3. Senkronizasyon Protokolü
- **Otomatik Senkronizasyon:** Oyun açılışında, belirli aralıklarla (örn. her 5 dakikada bir aktif oynanış sırasında) ve önemli olaylardan sonra (puzzle tamamlandığında, IAP yapıldığında) otomatik senkronizasyon tetiklenecektir.
- **Manuel Senkronizasyon:** Kullanıcılara ayarlar menüsünde "Şimdi Senkronize Et" gibi manuel bir senkronizasyon butonu sunulacaktır.
- **Veri Çakışması Çözümü:** Varsayılan olarak "en son değiştirilen veri kazanır" (last-write-wins) stratejisi uygulanacaktır. Kritik çakışma durumlarında (örneğin, aynı puzzle üzerinde farklı ilerlemeler varsa), sunucu en güncel zaman damgasına sahip veriyi tercih edecektir. Gelecekte, çakışma durumunda kullanıcıya seçenek sunma gibi daha gelişmiş çözümler değerlendirilebilir.

### 6.4. Güvenlik
- Tüm kimlik doğrulama tokenları ve hassas veriler (örneğin, şifreler şifrelenmiş olarak) güvenli bir şekilde saklanacak ve iletilecektir (HTTPS/SSL/TLS).
- API uç noktalarına yetkilendirme mekanizmaları (JWT tokenları gibi) uygulanacak, böylece yalnızca doğrulanmış kullanıcılar kendi verilerine erişebilecektir.
- DDoS ve diğer siber saldırılara karşı bulut sağlayıcının güvenlik önlemlerinden faydalanılacak.

## 7. Arayüz (UI/UX)

### 7.1. Hesap Yönetimi Ekranları
- **Giriş/Kayıt:** Uygulamanın ilk açılışında veya ayarlar menüsünde "Giriş Yap / Kayıt Ol" seçeneği. Google, Apple gibi sosyal giriş butonları ön planda olacak.
- **Profil Ekranı:** Kullanıcı adı, e-posta, avatar (opsiyonel), ve ilerleme özetleri (toplam çözülen puzzle, ortalama süre, kazanılan rozetler) gibi bilgileri gösteren bir ekran.
- **Senkronizasyon Durumu:** Profil ekranında veya ayarlar altında "En son senkronize edildi: [Tarih/Saat]" gibi bir durum göstergesi ve manuel senkronizasyon butonu.
- **Misafir Hesabından Yükseltme:** Misafir kullanıcılar için, ilerlemelerini kaybetmeden kayıtlı bir hesaba geçiş yapmalarını kolaylaştıran yönlendirmeler ve "Hesabını Bağla" butonu.

### 7.2. Veri Kaybı Uyarıları
- Senkronizasyon hatası durumlarında veya önemli bir veri kaydedilmeden uygulama kapanırsa kullanıcıya bilgilendirici uyarılar gösterilecektir.
- Misafir hesabından çıkış yapmadan veya uygulamayı silmeden önce olası veri kaybı hakkında uyarılar verilecektir.

## 8. Alternatifler

| Seçenek | Neden Reddedildi |
|:--------|:------------------|
| Sadece lokal depolama | Cihaz değişiminde veya uygulama silindiğinde ilerleme kaybı, çoklu cihaz desteği yok. |
| Üçüncü taraf oyun platformlarının SDK'ları (örn. Google Play Games Services / Apple Game Center'ın sadece kendi senkronizasyonu) | Çok kısıtlı veri senkronizasyon kapasitesi, platforma özgü kısıtlamalar, çapraz platform esnekliği eksikliği. |
| Tamamen manuel senkronizasyon | Kullanıcı yükünü artırır, veri tutarsızlıklarına yol açabilir. |
| Sunucu tarafı kimlik doğrulama olmaksızın (sadece istemci) | Yüksek güvenlik açığı riski, veri manipülasyonu kolaylığı. |

## 9. Potansiyel Riskler ve Önlemler

-   **Veri Kaybı veya Bozulması:**
    -   **Önlem:** Veritabanı yedekleme ve kurtarma stratejileri uygulanacak.
    -   **Önlem:** Sunucu tarafında veri doğrulama ve tutarlılık kontrolleri yapılacak.
    -   **Önlem:** Çakışma çözümleme stratejileri belirlenecek ve test edilecek.
-   **Güvenlik Açıkları (yetkisiz erişim, veri ihlali):**
    -   **Önlem:** Güvenli kimlik doğrulama protokolleri (OAuth, JWT) kullanılacak.
    -   **Önlem:** Tüm veri iletimleri şifrelenecek (HTTPS/TLS).
    -   **Önlem:** Veritabanı ve API erişimleri sıkıca kısıtlanacak ve denetlenecek.
    -   **Önlem:** Penetrasyon testleri ve güvenlik denetimleri düzenli olarak yapılacaktır.
-   **Yasal Uyumluluk (GDPR, KVKK, çocuk verileri):**
    -   **Önlem:** Kullanıcılardan veri toplama izni alınacak, gizlilik politikası şeffaf bir şekilde sunulacak.
    -   **Önlem:** Veri işleme anlaşmaları ve yasal metinler hazırlanacak.
    -   **Önlem:** Veri minimizasyonu prensibine uyulacak.
-   **Ölçeklenebilirlik ve Performans Sorunları:**
    -   **Önlem:** Bulut tabanlı hizmetlerin esnek ölçeklendirme özelliklerinden faydalanılacak.
    -   **Önlem:** Veritabanı sorguları ve senkronizasyon algoritmaları performans için optimize edilecek.
    -   **Önlem:** Yük testi ve performans izlemesi düzenli olarak yapılacaktır.
-   **Kullanıcı Deneyimi Karmaşıklığı:**
    -   **Önlem:** Giriş/kayıt akışları mümkün olduğunca basitleştirilecek (sosyal giriş öncelikli).
    -   **Önlem:** Senkronizasyon hataları kullanıcıya anlaşılır mesajlarla bildirilecek ve çözüm yolları sunulacak.
