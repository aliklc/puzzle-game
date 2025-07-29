# 🔐 Puzzle Güvenliği ve Şifreleme

Bu belge, kullanıcıların puzzle çözümüne istemci (client) tarafında erişmesini engellemek ve çözüm verisini güvenli bir şekilde saklamak için kullanılabilecek şifreleme yöntemlerini ve stratejilerini açıklar.

---
## 🎯 Amaç

- Kullanıcı puzzle’ın çözümüne **istemci tarafında erişememeli**.
- Çözüm **veritabanında şifreli** olarak saklanmalı.
- Kullanıcının gönderdiği çözüm **doğru mu değil mi sunucu tarafında kontrol edilebilmeli**.
- Çözüm **açık hâlde hiçbir zaman kullanıcıya gönderilmemeli**.

---

## 📦 Kullanılabilecek Şifreleme Yöntemleri

### 1. ✅ **Tek Yönlü Hash Fonksiyonları**

#### 🔹 Algoritmalar:
- SHA-256 / SHA-512
- Bcrypt
- Argon2
- PBKDF2

#### 🔹 Açıklama:
Hash fonksiyonları, çözüm gibi girdileri sabit uzunlukta ve geri döndürülemez karakter dizilerine çevirir. Aynı veri her zaman aynı hash sonucunu üretir (salt kullanılmazsa).

#### 🔹 Kullanım:
- Çözüm `hash(çözüm + salt)` formatında saklanır.
- Kullanıcı çözdüğünde, gönderilen çözüm hash’lenir ve karşılaştırılır.

#### ✅ Avantajlar:
- Geri çözülemez.
- Client tarafına çözüm sızdırılmaz.
- Bcrypt gibi algoritmalar brute-force saldırılarına karşı dirençlidir.

---

### 2. 🔐 **Simetrik Anahtarlı Şifreleme (AES, ChaCha20)**

#### 🔹 Algoritmalar:
- AES-128 / AES-256 (Önerilen)
- ChaCha20

#### 🔹 Açıklama:
Aynı gizli anahtar ile şifreleme ve çözme işlemi yapılır. Veritabanında çözüm şifreli olarak saklanır, sadece sunucu bu çözümü çözebilir.

#### 🔹 Kullanım:
- Çözüm AES ile şifrelenip saklanır.
- Kullanıcı çözüm gönderdiğinde sunucuda çözülüp karşılaştırılır.

#### ✅ Avantajlar:
- Çözüm gerektiğinde tekrar elde edilebilir.
- Anahtar gizli tutulduğu sürece güvenlidir.

#### ⚠️ Dikkat:
- Anahtar `.env`, secrets manager gibi güvenli alanlarda tutulmalı.
- Anahtar sızarsa tüm veriler deşifre edilebilir.

---

### 3. 🛡️ **Asimetrik Anahtarlı Şifreleme (RSA, ECC)**

#### 🔹 Algoritmalar:
- RSA (2048-bit veya üzeri)
- ECC (örneğin Curve25519)

#### 🔹 Açıklama:
Şifreleme public key ile, çözme private key ile yapılır. Public key client tarafında bile olabilir, fakat çözme işlemi sadece sunucuda yapılabilir.

#### 🔹 Kullanım:
- Çözüm public key ile şifrelenir, veritabanına yazılır.
- Private key sadece sunucuda bulunur.
- Doğrulama için çözüm çözülüp karşılaştırılır.

#### ✅ Avantajlar:
- Şifreleme işlemi client tarafında bile yapılabilir (çözme sunucuda kalır).
- Güvenli anahtar ayrımı sağlar.

#### ⚠️ Dikkat:
- Büyük veri için yavaş olabilir.
- Genellikle AES gibi simetrik anahtarların şifrelenmesi için kullanılır.

---

## 🧠 Hangi Yöntemi Ne Zaman Kullanmalı?

| Amaç | Önerilen Yöntem | Açıklama |
|------|------------------|----------|
| Sadece doğrulama | `SHA-256` + Salt | Geri çözülemez, kullanıcı verisi açıkta kalmaz |
| Çözüm tekrar lazım olacaksa | `AES-256` | Hem şifreleme hem çözümleme yapılabilir |
| Public ortamda şifreleme, sadece sunucuda çözüm | `RSA / ECC` | Public key ile şifrelenip sunucuya gönderilir |
| Hibrit yapı | `AES + SHA-256` | Hem saklama hem de doğrulama için idealdir |

---

# 🔐 Puzzle Çözüm Güvenliği: AES-256 + SHA-256 Hybrid Yapısı

Bu döküman, puzzle oyununuzda çözüm verisinin hem gizli tutulması hem de doğrulanması için **AES-256 + SHA-256** mimarisinin nasıl kullanılacağını açıklar.

---

## ⚙️ Neden AES + SHA-256 Birlikte Kullanılıyor?

| Amaç | Açıklama |
|------|----------|
| ✅ **AES-256** | Puzzle çözümünü daha sonra tekrar erişebilmek için çözüm verisi AES-256 ile şifrelenerek saklanır. Bu sayede yalnızca sunucu çözüm bilgisine ulaşabilir. |
| ✅ **SHA-256 + Salt** | Kullanıcıdan gelen çözümün **doğruluğunu kontrol etmek için** tek yönlü, geri çözülemez bir hash değeri saklanır. Böylece çözüm açığa çıkmadan kontrol sağlanır. |

> Bu yapı sayesinde:
> - ✔ Kullanıcının gönderdiği çözüm doğrulanabilir
> - ✔ Sunucu çözüm bilgisini yeniden açabilir
> - ❌ Kullanıcı çözüm verisine hiçbir şekilde erişemez

---

## 🔐 AES-256 ile Puzzle Çözümünü Şifreleme

### 📌 Ne işe yarar?
- Puzzle çözümünü veritabanında **gizli** olarak tutar.
- Sunucu isterse bu çözümü **de-şifre ederek** tekrar elde edebilir.

### 🔄 AES İşlem Akışı:
1. Puzzle çözümünü AES-256 ile şifrele:
    ```ts
    import CryptoJS from 'crypto-js'

    const encrypted = CryptoJS.AES.encrypt(solution, SECRET_KEY).toString()
    ```

2. Ortaya çıkan şifreli metni veritabanına kaydet:
    ```json
    {
        "encrypted_solution": "U2FsdGVkX1+8fH3..."
    }
    ```

3. Çözüm gerektiğinde AES ile deşifre et:
    ```ts
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    ```

> 📁 `SECRET_KEY` `.env` dosyasında tanımlanmalı ve sunucuda gizli kalmalıdır.

---

## 🔁 SHA-256 + Salt ile Puzzle Çözümünü Hash’leme

### 📌 Ne işe yarar?
- Kullanıcının gönderdiği çözümün doğruluğunu **geri çözülemez şekilde** kontrol eder.
- Hash değeri sadece karşılaştırma için kullanılır, orijinal çözüm geri elde edilemez.

### 🔄 SHA-256 İşlem Akışı:
1. Rastgele bir salt oluştur:
    ```ts
    function generateRandomSalt(length = 8) {
        return Math.random().toString(36).substring(2, 2 + length)
    }

    const salt = generateRandomSalt()
    ```

2. Çözüm ile birlikte hash oluştur:
    ```ts
    import sha256 from 'crypto-js/sha256'

    const hash = sha256(salt + solution).toString()
    ```

3. `salt` ve `hash` birlikte veritabanına kaydedilir:
    ```json
    {
        "salt": "3a9f1c",
        "solution_hash": "a7f12c0ab39c..."
    }
    ```

4. Kullanıcıdan çözüm geldiğinde:
    ```ts
    const userHash = sha256(salt + userSolution).toString()

    if (userHash === savedHash) {
        // Kullanıcı çözümü doğru girdi
    } else {
        // Yanlış çözüm
    }
    ```

> ❌ SHA hash değeri istemciye asla gönderilmez. Tüm doğrulama sunucu tarafında yapılır.

---

## 🔄 Özet: AES + SHA-256 Süreç Akışı

1. 🧩 Puzzle üretildi:
   - ✔ Çözüm: `"🫐🍓🍓🍋"`

2. 🔐 AES-256 ile şifrelenir:
   - `"U2FsdGVkX1+..."`

3. 🔁 SHA-256 + salt ile hash'lenir:
   - `salt`: `"xyz123"`
   - `hash`: `"a7f12c0ab39c..."`

4. 💾 Veritabanında şu şekilde saklanır:
    ```json
    {
        "id": 101,
        "encrypted_solution": "U2FsdGVkX1+...",
        "solution_hash": "a7f12c0ab39c...",
        "salt": "xyz123"
    }
    ```

5. 👤 Kullanıcı çözüm gönderdi:
   - `"🫐🍓🍓🍋"`

6. 🧠 Sunucu şunları yapar:
   - SHA-256 ile hash’ler ve karşılaştırır ✅
   - İstenirse AES ile çözümü açar 🔍

7. ✅ Sonuç:
   - ❌ Kullanıcı çözüm verisine ulaşamaz
   - ✔ Doğrulama yapılabilir
   - ✔ Çözüm gerektiğinde sunucu tarafından elde edilebilir

---

## 📎 Ekstra Notlar

- AES: **Çift yönlüdür** → şifreleme ve deşifreleme yapılabilir.
- SHA-256: **Tek yönlüdür** → yalnızca hash karşılaştırması yapılabilir.
- Salt: Aynı çözümler için farklı hash değerleri üretir → **brute-force** saldırılarına karşı korur.
- Tüm şifreleme/deşifreleme işlemleri sadece sunucu tarafında yapılmalıdır.

---


## 🧱 Uygulama Katmanları

| Katman | Görev |
|------|----------|
| **Frontend (Client)** | Puzzle grid’i gösterir. Kullanıcı çözümünü gönderir. Çözüme dair hiçbir veri veya hash içermez. |
| **Backend (Server)** | Kullanıcının çözümünü hash’leyerek doğrular. Gerekirse çözümü AES ile çözer. |
| **Database**| Şifreli çözüm **encrypted_solution**, **solution_hash** ve **salt** alanlarını içerir.|

## 🛡️ Ekstra Güvenlik Önlemleri

- [ ] AES anahtarları `.env` dosyasında veya bir **Secrets Manager** içinde saklanmalı.
- [ ] HTTPS zorunlu olmalı – çözüm transferleri şifrelenmeden yapılmamalı.
- [ ] Kullanıcıdan gelen veri mutlaka `sanitize` edilmeli.
- [ ] Brute-force saldırılarına karşı `rate-limiting` ve `captcha` uygulanmalı.
- [ ] Veritabanında çözüm asla düz metin olarak tutulmamalı.
- [ ] Client tarafında çözüm ya da hash değeri tutulmamalı.

---

