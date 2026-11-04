# Mustafa Kaan Aykoç — Kişisel Web Sayfası

Bu proje HTML, CSS ve JavaScript ile hazırlanmış, internet bağlantısı veya ek kurulum gerektirmeden açılabilen kişisel bir web sayfasıdır.

## Nasıl açılır?

1. Windows'ta ZIP dosyasına sağ tıklayın ve **Tümünü Ayıkla** seçeneğiyle tamamen bir klasöre çıkartın.
2. Çıkartılan klasörün içindeki **start.bat** dosyasına çift tıklayın.
3. Başlatıcı dosyaları kontrol eder ve sayfayı varsayılan tarayıcınızda otomatik açar. Başka bir işlem yapmanız gerekmez.

ZIP içinden yalnızca `start.bat` dosyasını çalıştırmayın. `index.html`, `style.css`, `script.js` ve `assets` klasörü başlatıcının yanında bulunmalıdır. Eksik dosya varsa başlatıcı bunu bildirir.

Bu site için indirilecek veya kurulacak bir bağımlılık yoktur. Python, Node.js, paket kurulumu, yerel sunucu, yönetici izni veya internet bağlantısı gerekmez. Başlatıcı bilgisayarınızın ayarlarını değiştirmez; hazır dosyaları kontrol edip açar.

Windows dışında veya başlatıcıyı kullanmak istemediğinizde `index.html` dosyasını Chrome, Edge, Firefox veya Safari gibi bir tarayıcıda açabilirsiniz. Başlatıcı Windows içindir; telefonda çalıştırılmaz.

Bilgisayarda çift tıklayarak açılabilir. Telefonda ZIP'i çıkarttıktan sonra HTML dosyasını açabilen bir tarayıcı veya dosya yöneticisi kullanabilirsiniz. Yayımlanan bağlantı, telefon üzerinden doğrudan görüntülemek için daha pratiktir.

## Dosyalar

- `index.html`: Sayfanın içeriği ve semantik HTML yapısı.
- `start.bat`: Windows için dosya kontrolü yapan ve tarayıcıyı açan tek tıklamalı başlatıcı.
- `style.css`: Tasarım, açık/koyu tema, mobil/tablet düzeni ve yazdırma stilleri.
- `script.js`: Mobil menü, tema tercihi, aktif bölüm, filtre, fotoğraf görüntüleyici ve mesaj taslağı.
- `assets/`: Kullanıcının sağladığı üç fotoğraf ve site simgesi.
- `README_TR.md`: Kullanım ve düzenleme açıklamaları.

## Bölümler

Ana sayfa, Hakkımda, Eğitim, Beceriler, Hobilerim ve İlgi Alanlarım, Fotoğraf Albümüm ve İletişim.

Üst menüde altı bölüm bağlantısı bulunur. Logo ana sayfaya götürür. Dar ekranlarda menü düğmesi görünür.

## Çalışan özellikler

- Telefon, tablet ve masaüstüne uyumlu düzen.
- Açık/koyu tema ve tarayıcıda tema tercihi saklama.
- Sabit navbar, aktif bölüm göstergesi, sayfa ilerleme çizgisi ve başa dön düğmesi.
- Tarih, ekonomi ve diğer ilgi alanlarını filtreleme.
- Açılıp kapanan ilgi alanı açıklamaları.
- Üç fotoğraflı görüntüleyici: önceki/sonraki düğmeleri, yön tuşları, Escape ve dokunarak kaydırma.
- Form alanı doğrulama, mesaj taslağı oluşturma, kopyalama ve TXT indirme.
- Klavye odağı, içerik atlama bağlantısı ve azaltılmış hareket desteği.

## İçeriği değiştirme

Metinleri `index.html` içinde ilgili bölümün altında değiştirebilirsiniz. Renkler `style.css` dosyasının başındaki `:root` bölümünde bulunur.

Fotoğrafları `assets` klasöründeki aynı adlı dosyalarla değiştirebilirsiniz. Farklı ad kullanırsanız `index.html` ve `script.js` içindeki fotoğraf yollarını da güncelleyin.

Gerçek e-posta adresinizi eklemek için `script.js` başındaki `siteSettings.email` alanını doldurun. Böylece iletişim bölümünde e-posta uygulamasını açan bir bağlantı görünür. E-posta adresi paylaşılmadığı için bu alan boş bırakılmıştır. Uydurma sosyal medya hesabı veya iletişim adresi eklenmemiştir.

## İletişim alanı hakkında

Form bir mesaj taslağı oluşturur; herhangi bir sunucuya veri veya mesaj göndermez. Ekranda bu durum açıkça belirtilir. Taslak kopyalanabilir veya TXT olarak indirilebilir. Gerçek e-posta gönderimi için ayrıca bir gönderim hizmeti gerekir. Kişisel form verileri tarayıcıda kalıcı olarak saklanmaz.

## Ödev sunumu için kısa açıklama

HTML içeriği ve yapıyı, CSS görünümü ve ekran uyumunu, JavaScript etkileşimleri sağlar. Harici kütüphane, CDN, API anahtarı veya paket kurulumu kullanılmamıştır. Bölüm bağlantıları aynı sayfadaki `id` değerlerine gider. İlgi alanı filtresi kartların `data-category` değerlerini okur. Fotoğraf albümü yerel `<dialog>` öğesini kullanır.

Site dosyaları kişisel kullanım ve ders ödevi için hazırlanmıştır. Fotoğraflar kullanıcı tarafından sağlanmıştır.
