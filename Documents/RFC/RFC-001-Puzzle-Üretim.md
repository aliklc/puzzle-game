# RFC-001: Puzzle Üretim Sistemi

## 1. Başlık
**RFC-001: Mantıksal ve Tek Çözüm Garantili Puzzle Üretimi**


## 2. Özet (Abstract)
Bu RFC, Tangly oyununda her seferinde tek çözüm garantili ve tahmin gerektirmeyen bulmacaların üretimi için kullanılacak algoritmik yapıyı tanımlar. Puzzle üretimi, backtracking tabanlı tam çözüm üretimi ve backward construction teknikleriyle gerçekleştirilir. Bu süreçte mantıksal çıkarım analizi ve çözüm teklik testi uygulanarak sadece geçerli puzzle'lar kullanıcıya sunulur.

## 3. Motivasyon
- Oyunculara adil, mantık tabanlı ve tekrar oynanabilir deneyim sunmak
- Puzzle'ların çözülebilirliğini ve tekilliğini algoritmik olarak garanti etmek
- Manüel tasarım yerine sınırsız puzzle üretimi sağlayarak uzun ömürlü içerik oluşturmak

## 4. Teknik Açıklama

### 4.1. Kavramlar
- **Tam çözüm:** Kurallara uygun, tamamen dolu bir çözüm ızgarası
- **Forward çözümleme (solver):** Tahmin yapmadan mantıkla çözüm üretir
- **Backward construction:** Tam çözümden yola çıkarak kullanıcıya sunulacak eksik hali oluşturur
- **Logic Solver:** İnsan mantığı taklidiyle tahminsiz çözüm kontrolü yapar

### 4.2. Algoritma Aşamaları

#### Aşama 1: Tam Çözüm Üretimi (Backtracking)
- Kurallara uyan rastgele bir dolu tablo üretilir:
  - Aynı satır/sütunda 3 aynı sembol arka arkaya gelmemeli
  - Satır/sütun başına eşit sayıda limon/yaban mersini olmalı
  - Satır/sütunlar birbirinden farklı olmalı

#### Aşama 2: Backward Construction
- Tam çözümden belirli hücreler boşaltılır
- Bazı `=` ve `×` bağlantıları tabloya yerleştirilir
- Zorluk seviyesi, boş hücre ve bağlantı yoğunluğuna göre ayarlanır

#### Aşama 3: Tekil Çözüm Testi
- Oluşan tablo yeniden çözümlenir (solver ile)
- Eğer birden fazla çözüm varsa tekrar oluşturulur

#### Aşama 4: Mantıksal Çözülebilirlik Testi
- Puzzle, sadece mantıkla çözülebiliyor mu?
- Geri izleme olmadan çözüm mümkünse puzzle kabul edilir

### 4.3. Zorluk Ayarı
- Izgara boyutu (6x6, 8x8, 10x10)
- Başlangıç ipuçlarının sayısı
- Eşit/zıt bağlantıların yerleşimi
- Boş hücre yoğunluğu

### 4.4. Performans Notları
- Puzzle üretimi sunucu tarafında yapılacaktır
- Oluşturulan puzzle’lar önbelleğe alınabilir
- Puzzle çözüm süresi < 1 saniye hedeflenmektedir

## 5. Etkiler

### 5.1. Teknik Etki
- Puzzle üretim servisi API olarak sağlanacaktır
- Client sadece hazır puzzle’ı alıp işleyecek
- Puzzle içeriği frontend’e JSON formatında sunulacak

### 5.2. Oyuncu Etkisi
- Her kullanıcı farklı puzzle alacak
- Zorluk seviyesi dinamik olarak değiştirilebilecek
- Tüm puzzle’lar adil ve tahmin içermeyen olacak

## 6. Alternatifler

| Seçenek | Neden Red Edildi |
|---------|-------------------|
| Manüel puzzle tasarımı | Sınırsız içerik için yetersiz, ölçeklenemez |
| Sadece backtracking ile üretim | Tahmin edilebilirliği test edemez, mantıksal çözüm garantisi vermez |
| Puzzle veritabanı | Yenilik kaybı, tekrar oynanabilirliği düşürür |


## 7. Sonuç

Bu RFC ile Tangly oyunundaki tüm puzzle'ların:
- Tek çözüme sahip olması
- Tahmin içermemesi
- Zorluk seviyesine göre çeşitlenmesi

garanti altına alınacaktır.

---

## 8. Ek Notlar

- İleride `"⊛"` gibi özel hücre türleri için genişletilebilir yapı kullanılmalıdır
- Puzzle üretim süreci loglanmalı (debug/test için)
- Geliştirici test puzzle’ı talep edebilmelidir (seed üzerinden)



## 9. Akış Diyagramı

Başla
  │
  ▼
Tam Çözüm Üret (Backtracking)
  │
  ▼
Başarıyla Tam Çözüm Üretildi mi?
  ├── Hayır → Hata, tekrar dene
  └── Evet
      │
      ▼
Backward Construction
  │
  ▼
Puzzle Boşlukları ve "=" / "×" İşaretleri Yerleştir
  │
  ▼
Çözüm Testi (Backtracking ile)
  │
  ▼
Tek Çözüm Var mı?
  ├── Hayır → Yeni Tam Çözüm Üretmek için başa dön
  └── Evet
      │
      ▼
Mantıksal Çözülebilirlik Testi (Logic Solver)
  │
  ▼
Mantıksal Olarak Çözülebilir mi?
  ├── Hayır → Backward Construction’a dön (ipucu/boşlukları değiştir)
  └── Evet
      │
      ▼
Puzzle Kabul Edildi → Puzzle JSON Olarak API’ya Kaydet / Döndür
  │
  ▼
Bitti
