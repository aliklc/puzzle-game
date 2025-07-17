# Feature Set v1.0

Tangly, Binairo ve Tango kurallarını birleştiren yenilikçi bir mobil mantık bulmaca oyunudur. Bu doküman, oyunun tüm temel ve gelişmiş özelliklerini kategorize eder ve öncelik derecelerine göre sıralar.

---

## Ozellikler Tablosu

| ID      | Ozellik Adi                       | Aciklama                                                                        | Oncelik  | Modul / Kategori          |
|---------|-----------------------------------|---------------------------------------------------------------------------------|----------|---------------------------|
| FS-001  | Dinamik Puzzle Uretimi            | Backtracking ve backward construction ile otomatik, tek cozumlu puzzle uretimi  | Yuksek   | Puzzle Engine / Backend   |
| FS-002  | Puzzle Cozumleyici (Solver)       | Mantiksal cozumleme ve tek cozum kontrolu                                       | Yuksek   | Puzzle Engine / Logic     |
| FS-003  | Oynanis Izgarasi                  | Grid arayuzu, sembol yerlestirme, hucre etkileşimi, geri al                     | Yuksek   | UI / UX                   |
| FS-004  | Esit (=) ve Zit (x) Kurallari     | Baglantili hucreler icin esitlik ve zitlik kurallarinin uygulanmasi             | Yuksek   | UI + Puzzle Engine        |
| FS-005  | Ipucu Sistemi                     | Mantiksal ipucu adimi gosteren sistem (reklam veya satin alma ile)              | Yuksek   | UX / Monetizasyon         |
| FS-006  | Zamanlayici ve Performans         | Cozum suresi ve istatistiklerin takibi                                          | Orta     | UI / Analytics            |
| FS-007  | Gunluk Mucadele Modu              | Her gun yeni sabit puzzle, global karsilastirma icin temel                      | Orta     | Backend / Engagement      |
| FS-008  | Istatistik ve Ilerleme            | Oyuncunun oyun ici performans metriklerini gostermek                            | Orta     | Profil / Analytics        |
| FS-009  | Basarimlar ve Rozetler            | Belirli hedeflere ulasildiginda odul/rozet verilmesi                            | Orta     | Gamification / UX         |
| FS-010  | Tema ve Renk Ozellestirme         | Semboller, arka planlar, ses temalari vb.                                       | Orta     | UI / Store                |
| FS-011  | Reklam Kaldirma                   | Premium kullanicilar icin reklamsiz deneyim                                     | orta     | Monetizasyon / Store      |
| FS-012  | Ipucu Paketleri                   | Uygulama ici satin alma ile ek ipucu alimi                                      | orta     | Store / Monetizasyon      |
| FS-013  | Banner ve Gecis Reklamlari        | Arayuzde reklam gosterimi (menu, cozum sonrasi vb.)                             | orta     | Monetizasyon / Reklam     |
| FS-014  | Puzzle Paylasimi                  | Cozum linki uretme ve baskasina gonderme destegi                                | Dusuk    | Sosyal / Backend          |
| FS-015  | Liderlik Tablolari                | En hizli cozum, en az tiklama gibi skorlari gosterme                            | Dusuk    | Sosyal / Analytics        |
| FS-016  | Web ve Mobil Platformlar          | Web, Android, iOS destekli deploy sistemi                                       | Orta     | Deploy / Platform         |
| FS-017  | Kullanici Profili ve Kayit        | Oyun ilerlemesinin hesaplar arasi senkronizasyonu                               | Orta     | Auth / Cloud Save         |
| FS-018  | Gelismis Kurallar / Kilitli Hucre | Stratejik olarak ozel hucreler (degistirilemeyen vs.) eklenmesi                 | Dusuk    | Puzzle Engine             |

---

## Oncelik Seviyeleri

- **Yuksek:** MVP (minimum viable product) icin zorunlu
- **Orta:** MVP sonrasi ilk surumlerde oncelikli
- **Dusuk:** Gelecek surumler icin planlanabilir

---
 
