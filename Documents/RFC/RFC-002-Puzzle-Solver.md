# RFC-002: Puzzle Solver Yapısı

## 1. Başlık
RFC-002: Puzzle Çözüm Algoritması ve Mantıksal Çözülebilirlik Testi

## 2. Özet (Abstract)
Bu RFC, Tangly oyununda puzzle üretimi, doğrulama ve kullanıcıya ipucu desteği sağlamak amacıyla kullanılacak çekirdek **puzzle çözüm algoritmasının (solver)** tasarımını açıklar. Solver, backtracking tabanlı bir yaklaşımı mantıksal çıkarım teknikleriyle birleştirerek, bulmacaların tek çözümlü ve tahmin gerektirmeyen bir yapıda olduğunu garanti edecektir. Ayrıca, kullanıcı arayüzü için anlamlı ipuçları üretebilme yeteneğine sahip olacaktır.

## 3. Motivasyon
- **Puzzle Doğruluğunu Garanti Etmek:** Oyun içinde sunulan tüm puzzle'ların oyun kurallarına uygun, tek çözümlü ve tutarlı olmasını sağlamak.
- **Adil Kullanıcı Deneyimi:** Oyuncuların puzzle'ları sadece mantık kullanarak çözebilmelerini, tahmin veya deneme-yanılma yapmalarına gerek kalmamasını sağlamak. Bu, oyunun mantık bulmacası kimliğini güçlendirir.
- **Gelişmiş İpucu Sistemi:** Oyuncuların zorlandığı anlarda, çözümü doğrudan vermek yerine, mantıksal bir çıkarım adımını gösteren akıllı ipuçları sunabilmek.
- **Puzzle Üretimi Entegrasyonu:** RFC-001'de tanımlanan dinamik puzzle üretim sistemi için vazgeçilmez bir bileşen olarak işlev görmek.
- **Hile Önleme:** Oyuncu çözümlerini sunucu tarafında hızlı ve güvenilir bir şekilde doğrulayabilmek.

## 4. Teknik Açıklama

### 4.1. Solver Algoritması Genel Yapısı

Solver, iki ana aşamadan oluşur:

1.  **Mantıksal Çözümleme (Logic Solver):** Tamamen deterministik kurallar ve çıkarımlar kullanarak, tahmin yapmadan mümkün olduğunca fazla hücreyi doldurmaya çalışır. Bu aşama, insan mantığını taklit eder ve puzzle'ın "tahmin gerektirmeyen" yapısını test eder.
2.  **Backtracking (Geri İzleme):** Mantıksal çözümleme ile puzzle tamamlanamazsa veya tek çözümlü olup olmadığını kontrol etmek için sistematik bir deneme-yanılma (tahmin ve geri alma) süreci başlatır. Bu aşama, tüm olası çözümleri bulmak veya tekilliği teyit etmek için kullanılır.

### 4.2. Modüller ve İşlevleri

-   **Constraint Propagation (Kısıt Yayılımı):**
    * **Üçlü Kuralı:** Aynı sembolün üçten fazla art arda gelmemesi kısıtını uygular.
    * **Eşit (=) ve Zıt (×) Bağlantıları:** Bu bağlantıların getirdiği kısıtlamaları uygular ve ilgili hücreleri günceller.
    * **Satır/Sütun Dengesi:** Her satır ve sütunda eşit sayıda "limon" ve "yaban mersini" olmasını sağlar.
    * **Satır/Sütun Tekilliği:** Hiçbir satır veya sütunun bir diğerine tamamen benzememesini sağlar (tam dolu olduklarında).
    * Bu modül, bir hücreye değer atandığında, bu atamanın diğer hücreler üzerindeki çıkarımlarını zincirleme olarak yayar.

-   **Backtracking Modülü:**
    * Mantıksal çıkarımların bir ilerleme sağlayamadığı durumlarda, boş hücrelerden birine geçici olarak bir değer atar.
    * Atamanın kısıtları ihlal edip etmediğini kontrol eder.
    * Eğer bir ihlal oluşursa veya çıkmaza girerse, geri döner ve farklı bir değer veya hücre dener.
    * Bu modül, tam çözüm üretimi (RFC-001) ve tekil çözüm testi için kullanılır.

-   **Çözüm Sayma Modülü:**
    * Backtracking modülünü kullanarak bir puzzle için bulunan tüm geçerli çözümleri sayar.
    * `RFC-001: Puzzle Üretim Sistemi` tarafından puzzle'ın tek çözümlü olup olmadığını doğrulamak için kritik öneme sahiptir. Eğer çözüm sayısı 1'den farklıysa, puzzle geçersiz kabul edilir.

-   **İpucu Sistemi Modülü:**
    * Logic Solver'ın adımlarını takip eder ve bir sonraki mantıksal çıkarım adımını belirler.
    * Bu adımı, kullanıcıya anlaşılır bir formatta (örn. "Bu hücre üçlü kuralı yüzünden limon olmalı" veya "Bu satırda sadece bu hücreye yaban mersini gelebilir") sunar.
    * İpucu, oyuncunun tahmin yapmadan mantık yürütmesini teşvik edecek şekilde tasarlanır.

## 5. Performans Hedefleri

-   **Tek Çözüm Testi Süresi:** Ortalama puzzle'lar için (örn. 8x8 veya 10x10) **1 saniyenin altında** tamamlanması hedeflenmektedir. Bu, özellikle puzzle üretimi için kritiktir.
-   **İpucu Üretim Süresi:** Kullanıcı arayüzünde anlık geri bildirim sağlamak için **200 milisaniyenin altında** olması hedeflenmektedir.
-   **Optimizasyonlar:**
    * Kısıt yayılımında verimli veri yapıları ve algoritmalar kullanılacaktır (örn. ikili kısıt grafikleri).
    * Backtracking sırasında uygun değişken seçim (en kısıtlı değişken) ve değer sıralaması (en olası değer) stratejileri uygulanacaktır.
    * Erken çıkış mekanizmaları, geçersiz durumlar veya birden fazla çözüm bulunduğunda gereksiz hesaplamaları durduracaktır.

## 6. Etkiler

-   **RFC-001 (Puzzle Üretim Sistemi) Bağımlılığı:** Solver, dinamik puzzle üretiminin temelini oluşturur. Tek çözüm garantisi ve mantıksal çözülebilirlik testleri bu modül aracılığıyla sağlanır.
-   **Kullanıcı Deneyimi İyileştirmesi:** Kullanıcıya ihtiyaç anında akıllı ve mantık tabanlı ipuçları sunar (FS-005).
-   **Oyun İçi Doğrulama:** Oyuncuların yaptığı hamlelerin doğruluğunu ve puzzle'ın doğru bir şekilde tamamlanıp tamamlanmadığını sunucu tarafında doğrulamak için kullanılabilir.
-   **Test Otomasyonu:** Geliştirme sürecinde yeni puzzle kuralları veya ızgara boyutları eklendiğinde, solver kullanılarak otomatik testler yapılabilir.

## 7. Alternatifler

| Seçenek | Neden Reddedildi |
|:--------|:-----------------|
| **Sadece Backtracking Tabanlı Çözümleyici:** | Mantıksal çıkarım yeteneği eksik olduğu için, puzzle'ın "tahmin gerektirmeyen" doğrulamasını yapamaz. İpucu sistemi için yeterli mantıksal adım sağlayamaz. |
| **Makine Öğrenimi (ML) Tabanlı Yaklaşım:** | ML modelleri genellikle tahmin bazlı çalışır ve Tangly'nin "saf mantık" prensibiyle çelişebilir. Modelin çıktılarını anlamak ve doğrulamak zor olabilir. Eğitim verisi gerektirir. |
| **Tamamen Manuel Çözümleme Kuralları (Hardcoded Logic):** | Puzzle kuralları geliştikçe veya yeni zorluk seviyeleri eklendikçe yönetimi ve bakımı son derece zorlaşır. Esnek değildir ve algoritmik üretimle uyumsuzdur. |

## 8. Ek Notlar

-   Solver, gelecekte eklenebilecek özel hücre türleri (örn. RFC-018'deki "kilitli hücre") veya yeni oyun kuralları için genişletilebilir bir yapıda tasarlanmalıdır.
-   Geliştirme ve hata ayıklama süreçleri için solver'ın çalışma adımlarını ve karar mekanizmalarını loglama yeteneği olmalıdır.
-   Farklı zorluk seviyeleri için solver'ın çalışma süresini ve performansını sürekli izlemek önemlidir.
