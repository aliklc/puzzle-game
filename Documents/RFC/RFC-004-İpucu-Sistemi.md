# RFC-004: İpucu Sistemi (Hint Engine)

---

## 1. Başlık
RFC-004:İpucu Sistemi – Mantıksal Adım Gösterimi ve Kullanıcıya Yardım

---

## 2. Özet (Abstract)
Bu RFC, Tangly oyununda kullanıcıya çözüm sırasında sunulan **mantıksal ipucu sistemi**ni tasarlar. Bu sistem, oyuncuların bulmacalarda takıldıkları anlarda adil ve öğretici bir şekilde ilerlemelerine yardımcı olmayı hedeflerken, oyunun temel mantık bulmacası prensibine sadık kalır. İpucu motoru, puzzle çözümleme algoritması (`RFC-002: Puzzle Solver`) ile entegre çalışarak kullanıcının mevcut durumuna göre bir sonraki mantıksal çıkarım adımını belirler ve sunar. Sistem aynı zamanda, **ödüllü reklamlar** ve **uygulama içi satın alımlar** (`RFC-008: Reklam ve Monetizasyon`) aracılığıyla monetizasyon stratejisine katkıda bulunur.

---

## 3. Motivasyon
-   **Kullanıcı Kaybını Önlemek:** Oyuncuların puzzle'larda tıkanma ve pes etme riskini azaltarak oyun bırakma oranını düşürmek.
-   **Öğretici Deneyim Sunmak:** Oyuncuların sadece cevabı almak yerine, puzzle'ın arkasındaki mantığı anlamalarına yardımcı olmak, böylece problem çözme becerilerini geliştirmelerini sağlamak.
-   **Monetizasyon Potansiyeli Yaratmak:** İpucu mekanizmasını ödüllü reklamlar ve uygulama içi satın alımlar (ipucu paketleri, premium sürüm) için bir kanal olarak kullanmak.
-   **Oyunun Doğasına Sadık Kalmak:** Rastgele veya tahmine dayalı ipuçları yerine, Binairo'nun mantıksal yapısına uygun çıkarımlar sunmak.

---

## 4. Teknik Açıklama

### 4.1. İpucu Motoru (Hint Engine) Çalışma Prensibi
-   İpucu motoru, `RFC-002: Puzzle Solver Yapısı` içinde bulunan **Logic Solver** modülü ile derinlemesine entegre çalışır.
-   Kullanıcının mevcut puzzle durumunu (doldurulmuş hücreler, verilen ipuçları) alır.
-   Logic Solver, bu durum üzerinden mantıksal çıkarım adımlarını sırasıyla dener.
-   İpucu motoru, bulunabilen **en basit ve en öğretici** mantıksal çıkarım adımını belirler. Bu, genellikle aşağıdaki kriterlere göre sıralanır:
    1.  Doğrudan bir kural ihlalini önleyen çıkarımlar (örn. üçlü yasağı).
    2.  Kolayca gözlemlenebilen satır/sütun dengesi çıkarımları.
    3.  Daha karmaşık karşılaştırmalar veya hücre eliminasyonları ile elde edilen çıkarımlar.
-   Birden fazla "en kolay" adım varsa, belirli bir önceliklendirme (örn. sol üstten sağ alta doğru hücre sırası) kullanılır.
-   Belirlenen adımın hangi hücreyi etkilediği ve neden bu şekilde doldurulması gerektiği bilgisi (kural referansı ile) döndürülür.

---

### 4.2. İpucu Türleri ve İşlevleri

| Tip                 | Açıklama                                                                                                                                                                                                                                                                    | Edinme Yöntemi                                                 |
|:--------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------|
| 🔹 **Bilgilendirici İpucu** | Kullanıcıya hangi hücrenin doldurulabileceğini gösterir ve bu kararın hangi mantıksal kurala dayandığını basit bir metinle açıklar. Hücreyi otomatik doldurmaz. Öğretici ve yönlendiricidir.                                                                         | Varsayılan ücretsiz, reklam izleyerek veya IAP ile kazanılır. |
| 🔸 **Otomatik Doldurma İpucu** | Kullanıcının seçtiği veya sistemin belirlediği bir boş hücreyi doğru değeriyle otomatik olarak doldurur. Kullanıcının düşünme sürecini atlar, daha hızlı ilerlemesini sağlar.                                                                                     | Belirli sayıda kullanım hakkı veya IAP ile satın alma.         |

---

### 4.3. Kullanım ve Monetizasyon Limiti

-   **Ücretsiz Başlangıç İpuçları:** Her yeni oyuncuya belirli bir miktar (örn. **3 adet**) ücretsiz bilgilendirici ipucu sağlanır.
-   **Ödüllü Reklamlar:** Oyuncular, ödüllü video reklamlar (`RFC-008: Reklam ve Monetizasyon` ile entegre) izleyerek ek ipuçları (örn. her izleme için +1 Bilgilendirici İpucu) kazanabilirler.
-   **Premium Kullanıcılar:** Reklamsız premium sürümü satın alan oyunculara (`RFC-008: Reklam ve Monetizasyon`), Bilgilendirici ve Otomatik Doldurma ipuçlarına **sınırsız erişim** hakkı tanınır. Premium İpuçları da bu kapsama dahil edilebilir.
-   **Uygulama İçi Satın Alımlar (IAP):** Oyuncular, oyun mağazasından ipucu paketleri (`FS-012: İpucu Paketleri`) satın alarak ek ipucu hakları edinebilirler. Bu paketler, farklı miktarlarda ipucu veya Premium İpucu hakları içerebilir.

---

## 5. Etkiler

### 5.1. Kullanıcıya Etkisi
-   **Düşük Oyun Bırakma Oranı:** Takılan oyuncuların oyunu bırakma olasılığı azalır.
-   **Gelişmiş Deneyim:** Oyuncular, mantıksal çıkarımlar sayesinde puzzle'ı daha iyi anlar ve çözümden daha fazla tatmin olurlar.
-   **Kişisel Gelişim:** İpuçları öğretici nitelikte olduğundan, oyuncular kendi çözme becerilerini geliştirme fırsatı bulurlar.
-   **Motivasyon Artışı:** Yardım alarak ilerleyebilmek, oyuncunun moralini yüksek tutar.

### 5.2. Teknik Etki
-   **Solver Genişletmesi:** `RFC-002: Puzzle Solver Yapısı` içindeki Logic Solver modülünün ipucu üretimi için belirli bir arayüz ve yetenek sağlaması gerekecektir.
-   **UI Entegrasyonu:** Oyunun kullanıcı arayüzüne ipucu isteme butonu, ipucu açıklama pop-up'ları ve otomatik doldurma animasyonları gibi yeni bileşenler eklenir.
-   **Monetizasyon Entegrasyonu:** `RFC-008: Reklam ve Monetizasyon` sistemiyle doğrudan entegre çalışarak reklam gösterimi ve IAP yönetimi yapılır.
-   **Veri Takibi:** İpucu kullanım sıklığı, türü ve puzzle zorluğu gibi veriler toplanarak (`RFC-005: İstatistik ve İlerleme Takibi` ile entegre) ipucu sisteminin etkinliği ve zorluk dengesi analiz edilebilir.

---

## 6. Alternatifler

| Alternatif                         | Neden Reddedildi?                                                                                                                                      |
|:-----------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Rastgele bir hücreyi doldurmak:** | Oyunun temel mantıksal yapısına aykırıdır, oyuncuya neden böyle doldurulduğunu öğretmez, sadece geçici bir çözüm sunar. Kullanıcının tatminini azaltır. |
| **Sabit kuralların metinsel anlatımı (bağlamdan bağımsız):** | Dinamik olarak üretilen her puzzle'ın mevcut durumuna göre spesifik değildir. Oyuncuya doğrudan o anki durum için ne yapması gerektiğini göstermez, genel kuralları tekrar eder. |
| **Tüm çözümü anında göstermek:** | Oyuncunun problem çözme deneyimini tamamen ortadan kaldırır, oyunun amacına ters düşer. Sadece acil durum veya hata ayıklama için kullanılabilir olmalıdır. |

---

## 7. Potansiyel Riskler ve Önlemler

-   **İpuçlarının çok kolay olması / Oyuncuyu düşünmekten alıkoyması:**
    -   **Önlem:** İpucu motoru, oyuncunun seviyesine ve mevcut puzzle zorluğuna göre en uygun (kolaydan zora) mantıksal adımı sunacak şekilde optimize edilecektir.
    -   **Önlem:** Bilgilendirici ipuçları, cevabı doğrudan vermeden, oyuncuyu yönlendirmeye odaklanacaktır.
-   **İpucu metinlerinin anlaşılmaz veya teknik olması:**
    -   **Önlem:** İpucu açıklamaları, basit, anlaşılır ve oyuncu dostu bir dilde kaleme alınacaktır.
    -   **Önlem:** Kullanıcı testleri ile ipucu metinlerinin etkinliği sürekli olarak değerlendirilecektir.
-   **Monetizasyon dengesinin bozulması (çok fazla ücretsiz ipucu veya çok pahalı IAP'ler):**
    -   **Önlem:** Ücretsiz ipucu limitleri, reklam izleme getirileri ve IAP fiyatlandırması, oyun ekonomisi ve kullanıcı tutma dengesi dikkate alınarak A/B testleri ile optimize edilecektir.
    -   **Önlem:** Oyuncu geri bildirimleri yakından takip edilecek ve gerekli ayarlamalar yapılacaktır.
-   **Performans sorunları (ipucu hesaplama süresi):**
    -   **Önlem:** `RFC-002: Puzzle Solver`'ın ipucu modülü, hızlı yanıt süreleri için optimize edilecek ve sunucu tarafında çalıştırılacaktır.
    -   **Önlem:** Karmaşık ipucu hesaplamaları için önbellekleme mekanizmaları değerlendirilecektir.
