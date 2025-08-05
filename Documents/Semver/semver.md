# Semantic Versioning (SemVer) Nedir?

Semantic Versioning (SemVer), yazılım projelerinde sürüm numaralandırmasını standartlaştıran bir sistemdir. Bu sistem sayesinde, bir paketin veya uygulamanın sürüm numarasından yapılan değişikliklerin büyüklüğü ve türü kolayca anlaşılır.

## Temel Format

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Geriye dönük uyumsuz (breaking change) değişiklikler yapıldığında artırılır.
- **MINOR**: Geriye dönük uyumlu yeni özellikler eklendiğinde artırılır.
- **PATCH**: Geriye dönük uyumlu hata düzeltmeleri yapıldığında artırılır.

## Detaylı Açıklama

### MAJOR (Ana Sürüm)
- API'de veya uygulamanın genel davranışında geriye dönük uyumsuz değişiklikler olduğunda artırılır.
- Örneğin, bir fonksiyonun parametreleri değişirse veya kaldırılırsa, eski kodlar artık çalışmazsa MAJOR artırılır.
- **Örnek:** 1.0.0 → 2.0.0

### MINOR (İkincil Sürüm)
- Geriye dönük uyumlu yeni özellikler eklendiğinde artırılır.
- Var olan fonksiyonlar değişmeden yeni fonksiyonlar eklenirse veya mevcut API genişletilirse MINOR artırılır.
- **Örnek:** 1.2.0 → 1.3.0

### PATCH (Yama Sürümü)
- Geriye dönük uyumlu hata düzeltmeleri yapıldığında artırılır.
- Sadece bug fix yapılır, yeni özellik eklenmez veya API değişmez.
- **Örnek:** 1.2.3 → 1.2.4


## Ek: Ön Sürüm (Pre-release) ve Metadata (Build Metadata)

SemVer, sürüm numarasına ek olarak ön sürüm (pre-release) ve yapı metadata (build metadata) bilgileri eklemenize olanak tanır. Bunlar, sürümün kararlılık durumu veya yapım (build) hakkında ek bilgi sağlar.

### Ön Sürüm (Pre-release)

Ön sürüm, henüz tam olarak kararlı olmayan, test veya geliştirme aşamasındaki sürümleri belirtmek için kullanılır. Sürüm numarasının sonuna tire (`-`) ile eklenir.

**Kullanım Amaçları:**
- Geliştirme aşamasındaki sürümler (ör. alpha, beta, rc)
- Test için yayınlanan sürümler

**Örnekler:**
- `1.0.0-alpha` → İlk alfa sürümü (çok erken test)
- `1.0.0-beta` → Beta sürümü (daha kararlı, ama hâlâ testte)
- `1.0.0-beta.2` → İkinci beta sürümü
- `1.0.0-rc.1` → Birinci release candidate (yayına çok yakın)

**Not:**
Ön sürüm etiketli bir paket, aynı ana sürümün (ör. 1.0.0) kararlı sürümünden daha düşük kabul edilir. Yani `1.0.0-beta` < `1.0.0`.



### Metadata (Build Metadata)

Yapı metadata, sürüm hakkında ek bilgi vermek için kullanılır. Sürüm numarasının sonuna artı (`+`) ile eklenir. Genellikle derleme tarihi, commit hash veya CI bilgisi gibi detaylar içerir.

**Örnekler:**
- `1.0.0+20230804` → 4 Ağustos 2023'te oluşturulmuş sürüm
- `1.2.3+build.456` → 456 numaralı build
- `2.0.0-beta+exp.sha.5114f85` → Deneysel build, belirli bir commit hash ile

**Not:**
Build metadata, sürüm sıralamasını (version precedence) etkilemez. Yani `1.0.0+build1` ve `1.0.0+build2` aynı sürüm olarak kabul edilir.

**Kullanım:**
Build metadata genellikle dağıtım ve hata ayıklama için kullanılır, npm install komutunda doğrudan kullanılmaz.

## Kullanım Senaryoları ve Örnekler

### 1. Sürüm Numarası Nasıl Belirlenir?
- İlk yayın: `1.0.0`
- Küçük bir hata düzeltildi: `1.0.1`
- Yeni bir özellik eklendi: `1.1.0`
- Geriye dönük uyumsuz büyük değişiklik: `2.0.0`

### 2. package.json'da Kullanımı
Node.js projelerinde sürüm numarası `package.json` dosyasında bulunur:

```json
{
  "name": "puzzle-game",
  "version": "1.2.3"
}
```

### 3. Versiyon Yükseltme Komutları
NPM ile sürüm yükseltmek için:

- Major: `npm version major` → 1.2.3 → 2.0.0
- Minor: `npm version minor` → 1.2.3 → 1.3.0
- Patch: `npm version patch` → 1.2.3 → 1.2.4

Bu komutlar, `package.json` dosyasındaki sürüm numarasını otomatik olarak günceller ve bir git etiketi (tag) oluşturur.

### 4. Bağımlılık Versiyonları
Bir paketi yüklerken versiyon aralığı belirtebilirsiniz:
- `^1.2.3`: 1.x.x sürümlerini (2.0.0 hariç) kabul eder.
- `~1.2.3`: 1.2.x sürümlerini (1.3.0 hariç) kabul eder.
- `>=1.2.3 <2.0.0`: 1.2.3 ile 2.0.0 arasındaki tüm sürümleri kabul eder.

#### Versiyon Aralığı Operatörleri
- `^` (caret): Sadece MAJOR değişmediği sürece en güncel MINOR ve PATCH sürümlerini kabul eder.
- `~` (tilde): Sadece MINOR değişmediği sürece en güncel PATCH sürümlerini kabul eder.
- Hiçbir işaret yoksa: Sadece belirtilen sürümü yükler.

#### Örnek
```json
"dependencies": {
  "lodash": "^4.17.0",
  "axios": "~1.3.2"
}
```

## Sürüm Yükseltirken Dikkat Edilmesi Gerekenler
- Geriye dönük uyumsuz bir değişiklik yapıyorsanız mutlaka MAJOR artırın.
- Kullanıcılarınızın projelerini etkilememek için MINOR ve PATCH seviyelerini doğru kullanın.
- Pre-release sürümlerini (ör. beta, alpha) test amaçlı kullanın, prod ortamında dikkatli olun.

## Neden SemVer Kullanılır?
- Sürüm numarasından değişikliklerin büyüklüğünü ve etkisini anlamak kolaylaşır.
- Takım içinde ve toplulukta sürüm yönetimi standartlaşır.
- Bağımlılık yönetimi ve güncellemeler daha güvenli olur.
- Otomasyon araçları (CI/CD) ile uyumlu çalışır.


---

