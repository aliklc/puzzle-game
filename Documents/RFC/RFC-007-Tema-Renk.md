# RFC-007: Tema ve Renk Özelleştirme

## 1. Başlık
RFC-007: Kullanıcı Arayüzü Tema ve Kozmetik Özelleştirme Sistemi

## 2. Özet (Abstract)
Bu RFC, Tangly oyununda oyunculara kişiselleştirilmiş bir görsel ve işitsel deneyim sunmak için tema ve renk özelleştirme sistemini tanımlar. Bu sistem, oyuncuların farklı renk paletleri, sembol setleri, arka planlar ve ses temaları arasından seçim yapmasına olanak tanıyarak oyunun görünümünü ve hissini kişiselleştirmesini sağlayacaktır.

## 3. Motivasyon
- Oyuncuların oyuna olan bağlılığını ve elde tutma oranını artırmak.
- Oyunculara kişisel tarzlarını yansıtabilecekleri yollar sunarak aidiyet duygusunu güçlendirmek.
- Uygulama içi satın alımlar (IAP) aracılığıyla yeni bir gelir akışı oluşturmak.
- Oyuna çeşitlilik ve yeniden oynanabilirlik değeri katmak.

## 4. Kapsam
Bu RFC, aşağıdaki özelleştirilebilir öğeleri kapsar:
- **Renk Temaları:** Oyun ızgarası, hücreler, bağlantılar, butonlar ve genel UI elementleri için farklı renk paletleri.
- **Sembol Paketleri:** "Yaban mersini" ve "limon" sembolleri için alternatif görsel tasarımlar (örn. geometrik şekiller, farklı meyveler, ikonlar).
- **Arka Planlar:** Oyun ekranının arkasında gösterilecek farklı görsel temalar (statik görüntüler veya basit animasyonlar).
- **Ses Temaları:** Hücre etkileşimi, ipucu kullanımı, bulmaca tamamlama gibi oyun içi ses efektleri için farklı ses setleri.
- Kullanıcının seçtiği temanın tüm oyun arayüzüne **dinamik olarak** uygulanması.
- Tema seçimi ve önizleme için **kullanıcı arayüzü**.
- Tema paketlerinin **satın alınması** veya oyun içi başarılarla **açılması** mekanizması.

## 5. Gereksinimler
- **Fonksiyonel Gereksinimler:**
    - FS-010: Tema ve Renk Özelleştirme (Feature Set'ten gelen ana özellik)
    - FS-012: İpucu Paketleri ve FS-011: Reklam Kaldırma (Monetizasyon ile entegrasyon)
    - Kullanıcı tercihlerini kalıcı olarak depolama ve cihazlar arası senkronize etme yeteneği.
- **Non-Fonksiyonel Gereksinimler:**
    - Temaların uygulanmasında **düşük gecikme ve akıcı geçişler**.
    - Farklı cihazlarda ve ekran boyutlarında **tutarlı görsel kalite**.
    - Tema varlıklarının indirme boyutunun **optimize edilmesi**.
    - **Erişilebilirlik standartlarına uyum** (özellikle renk kontrastı).

## 6. Teknik Detaylar

### 6.1. Dinamik Stil Uygulaması
- Oyun motoru/çerçevesi, UI bileşenlerinin stillerini (renkler, görseller, sesler) dinamik olarak değiştirmeye izin veren bir yapıya sahip olacaktır.
- Kullanıcı bir tema seçtiğinde, ilgili temanın veri modeli yüklenecek ve tüm etkilenen UI öğeleri (ızgara hücreleri, butonlar, metinler vb.) yeni tema değerlerine göre yeniden render edilecektir.
- Ses efektleri için, tema seçimi ses dosyası referanslarını güncelleyecektir.

### 6.2. Tema Edinme ve Saklama
- Ücretsiz temalar varsayılan olarak açık olacak veya belirli oyun içi başarılarla (FS-009) kilidi açılabilecektir.
- Premium temalar, uygulama içi satın alma (IAP) mekanizması aracılığıyla edinilecektir. Satın alma işlemi sonrası, temanın kilidi kullanıcı hesabına bağlanarak kalıcı olarak açılacaktır.
- Kullanıcının seçtiği aktif tema ve sahip olduğu temalar bilgisi, sunucu tarafında kullanıcı profiliyle birlikte saklanacaktır (FS-017 ile entegrasyon), böylece cihazlar arası senkronizasyon sağlanacaktır.

## 7. Arayüz (UI/UX)

### 7.1. Tema Seçim Ekranı
- Ana menüdeki bir "Ayarlar" veya "Mağaza" bölümü altında "Temalar" veya "Kozmetik" adında ayrı bir ekran bulunacaktır.
- Bu ekranda mevcut tüm temaların küçük önizleme görselleri veya kartları listelenecektir. Her kart, temanın adını, durumunu (sahip olunan/kilitli) ve fiyatını gösterecektir.
- Bir temaya dokunulduğunda, daha büyük bir önizleme (oyun ızgarası örneğiyle) ve "Uygula" veya "Satın Al" butonu görüntülenecektir.

### 7.2. Önizleme ve Uygulama
- Tema önizleme ekranı, oyuncunun seçilen temayla oyunun nasıl görüneceğini gerçek zamanlı olarak deneyimlemesini sağlayacaktır.
- "Uygula" butonuna basıldığında, tema hemen etkin hale gelecek ve tüm oyun arayüzüne yansıyacaktır. Başarılı uygulama sonrası görsel/işitsel geri bildirim verilecektir.

## 8. Alternatifler

| Seçenek | Neden Reddedildi |
|:--------|:------------------|
| Sadece varsayılan tek tema | Kişiselleştirme eksikliği, oyuncu bağlılığını ve IAP potansiyelini sınırlar. |
| Tüm temaları uygulama içine dahil etme | Uygulama boyutunu aşırı artırır, esneklik ve yeni tema ekleme yeteneğini sınırlar. |
| Temaları yalnızca lokalde saklama | Kullanıcı cihaz değiştirdiğinde temalarını kaybedebilir, kötü bir kullanıcı deneyimi yaratır. |

## 9. Potansiyel Riskler ve Önlemler

- **Renk kontrastı ve erişilebilirlik sorunları:**
    - **Önlem:** Tüm temalar, görme engelli kullanıcılar da dahil olmak üzere, yeterli renk kontrastı ve okunabilirlik sağlamak için erişilebilirlik standartlarına (WCAG) uygun olarak tasarlanacaktır.
    - **Önlem:** Farklı görüş koşullarına sahip kullanıcılarla testler yapılacak.
- **Performans etkileri (dinamik yükleme ve rendering):**
    - **Önlem:** Tema varlıkları optimize edilecek (boyut, format).
    - **Önlem:** Dinamik stil değiştirme işlemleri, UI akıcılığını etkilemeyecek şekilde optimize edilecektir (örneğin, tema geçişlerinde yumuşak animasyonlar yerine anlık değişimler tercih edilebilir).
    - **Önlem:** Aşırı büyük veya karmaşık tema animasyonlarından kaçınılacaktır.
- **Monetizasyon dengesi ve oyuncu algısı:**
    - **Önlem:** Ücretsiz ve premium temalar arasında adil bir denge kurulacak, oyunculara ücretsiz seçenekler sunulurken premium temalar için cazip değer önerileri oluşturulacaktır.
    - **Önlem:** Satın alma süreçleri şeffaf ve anlaşılır olacaktır.
- **Varlık yönetim zorlukları:**
    - **Önlem:** Varlıkların (görsel, ses) merkezi bir depoda sürüm kontrolü ile yönetilmesi sağlanacak.
    - **Önlem:** Yeni temaların eklenme ve dağıtım süreci otomatize edilecektir.

