# Token Tabanlı Kimlik Doğrulama: JWT, Access Token ve Refresh Token

Bu doküman, modern web ve mobil uygulamalarda kullanılan token tabanlı kimlik doğrulama (authentication) ve yetkilendirme (authorization) sisteminin temel taşları olan JWT, Access Token ve Refresh Token kavramlarını detaylı bir şekilde açıklamaktadır.

## Giriş: Neden Token Kullanıyoruz?

Geleneksel web uygulamaları, kullanıcının kimliğini sunucuda bir "session" (oturum) içinde saklardı. Ancak bu yöntem, her isteğin farklı bir sunucuya gidebildiği modern mikroservis mimarilerinde ve durum bilgisi tutmayan (stateless) mobil uygulamalarda verimsizdir.

Token tabanlı kimlik doğrulama, sunucunun oturum bilgisi tutmasına gerek kalmadan, her isteğin kendi kimliğini ve yetkisini taşımasını sağlar. Bu da sistemi daha ölçeklenebilir ve esnek yapar.

---

## 1. JWT (JSON Web Token) Nedir?

JWT, iki taraf arasında (örneğin sunucu ve istemci) bilgiyi güvenli bir şekilde iletmek için kullanılan, JSON tabanlı, kompakt ve kendine yeten bir standarttır.

Bir JWT üç bölümden oluşur ve bu bölümler birbirlerinden nokta (`.`) ile ayrılır: `Header.Payload.Signature`

**Örnek bir JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### a. Header (Başlık)
Token'ın türünü ve imzalama için kullanılan şifreleme algoritmasını belirtir.

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

### b. Payload (Veri Yükü)
Token'ın asıl veri kısmıdır ve "claim" (iddia) adı verilen bilgileri içerir. Bunlar kullanıcı kimliği, rolleri veya token'ın geçerlilik süresi gibi bilgiler olabilir.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "exp": 1516239022
}
```
> **ÖNEMLİ NOT:** Payload kısmı şifrelenmez, sadece Base64Url ile kodlanır. Bu nedenle herkes tarafından okunabilir. **JWT payload'ına asla parola gibi hassas veriler koymayın!**

### c. Signature (İmza)
İmza, token'ın bütünlüğünü garanti eden en önemli güvenlik katmanıdır. Şu şekilde oluşturulur:
1.  Base64Url ile kodlanmış `Header` alınır.
2.  Base64Url ile kodlanmış `Payload` alınır.
3.  Bu iki parça bir nokta ile birleştirilir.
4.  Sonuç, sadece sunucunun bildiği gizli bir anahtar (`secret`) ile `Header`'da belirtilen algoritma kullanılarak imzalanır.

İmza, token'ın yolda değiştirilmediğini ve gerçekten bizim tarafımızdan oluşturulduğunu doğrular.

---

## 2. Access Token (Erişim Token'ı)

### 🎯 Amaç
Kullanıcının kimliğini doğruladıktan sonra, belirli süre boyunca korunan API kaynaklarına erişmesini sağlar. Örneğin:
- `/api/puzzle/123` gibi kimlik doğrulama gerektiren uç noktalara erişim sağlar.
- İstemci her istekle birlikte bu token'ı gönderir.

### 📦 Yapı
Genellikle JWT formatında olur. İçerisinde kullanıcıya ait şu bilgiler yer alabilir:

```json
{
    "sub": "user_abc123",
    "role": "player",
    "iat": 1690583500,
    "exp": 1690587100
}
```

| Alan     | Açıklama                                                |
|----------|----------------------------------------------------------|
| `sub`    | Token sahibinin benzersiz kimliği (subject).             |
| `role`   | Kullanıcının rolü (örn: player, admin).                  |
| `iat`    | Token'ın oluşturulma tarihi (Issued At).                 |
| `exp`    | Token'ın geçerlilik süresi (Expiration Time).            |

### ⏳ Ömür
- Kısa sürelidir: Genellikle **15 dakika - 1 saat** arası.
- Süresi dolduğunda yeniden giriş yapılmasına gerek yoktur, Refresh Token devreye girer.

### 🔐 Saklama Yeri
- Web: `memory` veya `HttpOnly cookie` (XSS'den korumak için tercih edilmez).
- Mobil: RAM veya güvenli alan (Keychain/Keystore).

### 🔄 Kullanım
Her HTTP isteğinde şu şekilde gönderilir:

```
Authorization: Bearer <access_token>
```

---

## 3. Refresh Token (Yenileme Token'ı)

### 🎯 Amaç
Access Token süresi dolduğunda kullanıcıyı tekrar giriş yaptırmak zorunda kalmadan, **yeni bir Access Token üretmek** için kullanılır.

### 📦 Yapı
- Genellikle **JWT değildir**.
- UUID, uzun rastgele string veya şifrelenmiş özel bir yapıda olabilir.
- Refresh Token'lar genellikle **veritabanında** saklanır.

**Örnek:**
```
b5200e6c-91b2-4f2a-8f76-6fd36c79fa8f_78ba13...
```

**Veritabanı tablosu örneği:**

| Alan          | Açıklama                                  |
|---------------|--------------------------------------------|
| `token`       | Refresh Token değeri                       |
| `user_id`     | Sahip olan kullanıcı                       |
| `expires_at`  | Geçerlilik süresi                          |
| `revoked`     | İptal edilip edilmediği                    |
| `created_at`  | Oluşturulma tarihi                         |
| `user_agent`  | Tarayıcı bilgisi (isteğe bağlı)            |
| `ip_address`  | İstek yapılan IP adresi                    |

### ⏳ Ömür
- Genellikle **7 gün - 30 gün** arası.
- Eğer uzun süre kullanılmazsa veya oturum kapatılırsa geçersiz hale getirilmelidir.

### 🔐 Saklama Yeri
- Web: `HttpOnly` + `Secure` flag'li cookie (JS erişemez).
- Mobil: Keychain (iOS) / Keystore (Android) gibi güvenli alanlarda.

### 🔁 Refresh Token İş Akışı
1. Access Token süresi dolunca istemci, sakladığı Refresh Token ile `/refresh-token` adresine istek gönderir.
2. Sunucu bu token'ı veritabanında doğrular:
   - Token geçerli mi?
   - Süresi geçmiş mi?
   - İptal edilmiş mi?
3. Eğer geçerliyse:
   - Yeni bir Access Token oluşturulur.
   - (Opsiyonel) Yeni bir Refresh Token da verilir ve eski token geçersiz kılınır (→ Refresh Token Rotation).
4. İstemci yeni token'ları alır ve normal şekilde devam eder.

---

## 🎯 Access vs Refresh Token Karşılaştırma Tablosu

| Özellik              | Access Token                | Refresh Token                  |
|----------------------|-----------------------------|--------------------------------|
| Görev                | API erişimi                 | Yeni Access Token üretmek     |
| Ömür                 | Kısa (15dk - 1s)            | Uzun (7-30 gün)               |
| Saklama Yeri         | Bellek veya Cookie          | HttpOnly Cookie / Güvenli alan|
| Format               | JWT (genelde)               | UUID veya rastgele string     |
| Sunucu Saklaması     | Gerekmez (JWT)              | Gerekir                        |
| Güvenlik Riski       | Orta                        | Yüksek önem                   |

---

## 4. Middleware ile Token Doğrulama

Token tabanlı kimlik doğrulama sistemlerinde, istemciden gelen her isteğin güvenli bir şekilde kontrol edilmesi gerekir. Bu kontrol işlemi, **middleware** adı verilen ara katmanlar aracılığıyla gerçekleştirilir.

### 📌 Middleware Nedir?

Middleware (ara katman), bir istemci isteği sunucuya ulaşmadan önce veya yanıt istemciye gönderilmeden önce devreye girerek bu iletişimi denetleyen yazılım katmanıdır. Genellikle şu amaçlarla kullanılır:

- Kimlik doğrulama (authentication)
- Yetkilendirme (authorization)
- Hata yakalama (error handling)
- Loglama (kayıt alma)
- CORS, rate limiting gibi güvenlik ve erişim kontrolleri

### 🔐 Token Doğrulamada Middleware’in Rolü

Access Token kullanılan sistemlerde middleware şu görevleri üstlenir:

- Her gelen istekte token’ın varlığını ve geçerliliğini kontrol eder.
- Token geçersizse isteği engeller veya kullanıcıyı oturum açma ekranına yönlendirir.
- Geçerli token’a sahip kullanıcıların isteğini sunucuya iletir.
- Gerekirse token içerisinden kullanıcı bilgilerini çıkararak bu bilgileri uygulamanın geri kalanına iletir.

### 🌐 Uygulamada Middleware Nerede Yer Alır?

- **Frontend (Next.js gibi):** Kullanıcının erişmeye çalıştığı sayfa veya route'lar middleware tarafından filtrelenebilir. Örneğin, sadece giriş yapmış kullanıcıların dashboard sayfasına erişebilmesi sağlanır.
  
- **Backend (FastAPI, Node.js vb.):** API istekleri sunucuya ulaşmadan önce middleware tarafından kontrol edilir. Özellikle `/api/puzzles/submit` veya `/api/user/data` gibi özel endpoint'lerde kimlik doğrulama yapılır.

### 🧠 Neden Middleware Kullanılır?

- Her endpoint’e ayrı ayrı kontrol kodu yazmak yerine merkezi bir doğrulama katmanı sağlar.
- Güvenliği artırır ve sistemdeki zayıf noktaların azaltılmasına yardımcı olur.
- Kod tekrarını önler, bakım ve geliştirmeyi kolaylaştırır.

## 🛡️ Ekstra Güvenlik Önlemleri

- **HTTPS Zorunluluğu:** Tüm token alışverişi HTTPS üzerinden yapılmalıdır.
- **Refresh Token Rotation:**
  - Her yenilemede yeni bir Refresh Token verilir.
  - Eski Refresh Token geçersiz kılınır.
- **IP & User-Agent Doğrulaması:**
  - Refresh Token ile gelen isteklerde IP veya tarayıcı bilgisi kontrol edilebilir.
- **Revocation Sistemi:**
  - Kullanıcı çıkış yaptığında, şifre değiştirdiğinde veya güvenlik şüphesi oluştuğunda tüm aktif Refresh Token’lar iptal edilmelidir.
- **Kısıtlı Yenileme Sayısı:**
  - Bir Refresh Token’ın kaç defa kullanılabileceği sınırlandırılabilir.