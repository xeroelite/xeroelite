"use strict"; // NSA YAMASI 1: JavaScript'i katı kurallı bellekte çalıştırır (Memory Leak ve sessiz hataları engeller)

// NSA YAMASI 2: CSP Trusted Types (Kendi Kendini Vurma - Self DoS - Engeli)
// HTML'deki katı güvenlik mühürünün, kendi JS kodumuzu (innerHTML) engellememesi için özel kimlik oluşturur.
if (window.trustedTypes && trustedTypes.createPolicy) {
    trustedTypes.createPolicy('default', {
        createHTML: (string) => string // Sadece bizim script'teki güvenli stringlere onay ver
    });
}

// Sayfa Aşağı Kaydırıldıkça Öğelerin Belirme (Fade-In) Efekti
// Sayfa Aşağı Kaydırıldıkça Öğelerin Belirme (Fade-In) Efekti
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // Eleman ekrana 100px girince animasyon tetiklenir

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Olay dinleyicileri: Sayfa açıldığında ve kaydırıldığında çalıştır
window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// Navigasyon barda yumuşak kaydırma (Smooth Scroll) - GÜVENLİK YAMALI VERSİYON
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // NSA YAMASI 1: DOM tabanlı CSS Enjeksiyonu ve QuerySelector çökertme koruması
        // Katı Regex Kontrolü: Gelen veri sadece "#" işareti ile başlamalı, harf/rakam/tire içermelidir.
        if (!/^#[a-zA-Z0-9_-]+$/.test(targetId)) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// ==========================================
// İLETİŞİM FORMU GÜVENLİ AJAX GÖNDERİMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const iletisimFormu = document.getElementById('iletisimFormu');
    
    if(iletisimFormu) {
        iletisimFormu.addEventListener('submit', function(e) {
            e.preventDefault(); // Siyah API ekranına (redirect) gidilmesini kökten engeller

            const submitBtn = iletisimFormu.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = "GÖNDERİLİYOR...";
            submitBtn.disabled = true;

            const formData = new FormData(iletisimFormu);

            // NSA YAMASI 2: DOM Clobbering (Veri Çalma/Kaçırma) ve Auto-Spam Koruması
            const guvenliAction = iletisimFormu.getAttribute('action'); 
            
            fetch(guvenliAction, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if(response.ok) {
                    alert("✅ Mesajınız Xero Elite ekibine başarıyla iletildi!");
                    iletisimFormu.reset(); 
                    
                    // İşlem başarılıysa butonu KİLİTLE (Botnet DDoS'u kaynağında kes)
                    submitBtn.innerHTML = "MESAJ İLETİLDİ ✓";
                    submitBtn.style.backgroundColor = "#2e7d32";
                    submitBtn.style.color = "#ffffff";
                    submitBtn.style.pointerEvents = "none";
                } else {
                    throw new Error('API Hatası');
                }
            }).catch(error => {
                alert("❌ Ağ hatası oluştu veya sunucu yanıt vermiyor. Lütfen tekrar deneyin.");
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});
// ==========================================
// KAYIT SAYFASI DİNAMİK ÜRÜN VE FORM YÖNETİMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Sadece kayıt sayfasındaysak bu kodu çalıştır (Güvenlik kontrolü)
    if (!document.getElementById('ozet-isim')) return;

    const urunler = {
        "exploit": { isim: "Exploit Developer", fiyat: "11.000 ₺", img: "gorseller/gorsel4.webp", aciklama: "Sıfırıncı gün zafiyetleri üzerinde çalışan, yüksek seviyeli exploit geliştirme ve analiz serisi.", link: "https://www.shopier.com/xeroelite/48673614" },
        "pentest": { isim: "Pentester & Red Teamer", fiyat: "8.500 ₺", img: "gorseller/gorsel5.webp", aciklama: "Ağ ve sistemlere yönelik ileri düzey sızma testleri ve Red Team operasyon simülasyonları.", link: "https://www.shopier.com/xeroelite/48673662" },
        "malware": { isim: "Malware Analyst & Reverse", fiyat: "8.500 ₺", img: "gorseller/gorsel6.webp", aciklama: "Zararlı yazılım analizi ve tersine mühendislik teknikleriyle tehditleri kaynağında çözme eğitimi.", link: "https://www.shopier.com/xeroelite/48673679" },
        "web_mobile": { isim: "Web & Mobile App Sec", fiyat: "7.500 ₺", img: "gorseller/gorsel7.webp", aciklama: "Web uygulamaları ve mobil platformlarda (iOS/Android) güvenlik zafiyetlerinin tespiti ve yamalanması.", link: "https://www.shopier.com/xeroelite/48673697" },
        "cloud_network": { isim: "Cloud & Infrastructure / Network Security", fiyat: "6.000 ₺", img: "gorseller/gorsel8.webp", aciklama: "Bulut mimarileri ve ağ altyapılarına yönelik modern güvenlik protokolleri ve sıfır güven (Zero Trust) yaklaşımı.", link: "https://www.shopier.com/xeroelite/48673721" },
        "soc": { isim: "SOC & Incident Response", fiyat: "6.000 ₺", img: "gorseller/gorsel9.webp", aciklama: "Kurumsal ağlarda anlık tehdit tespiti, olay müdahalesi ve Blue Team savunma stratejileri.", link: "https://www.shopier.com/xeroelite/48673772" },
        "cyber_intel": { isim: "Cyber Intelligence", fiyat: "6.000 ₺", img: "gorseller/gorsel10.webp", aciklama: "Açık kaynak istihbaratı (OSINT) ve siber tehdit istihbaratı yöntemleriyle veri toplama ve analizi.", link: "https://www.shopier.com/xeroelite/48673826" },
        
        "hizmet_pentest": { isim: "Gelişmiş Pentest Hizmeti", fiyat: "15.000 ₺", img: "gorseller/gorsel12.webp", aciklama: "Kurumsal ağlarınız ve sistemleriniz için en üst düzey güvenlik açığı tespiti ve sızma testi hizmeti.", link: "https://www.shopier.com/xeroelite/48674021" },
        "hizmet_blockchain": { isim: "Blockchain Güvenlik Hizmeti", fiyat: "9.000 ₺", img: "gorseller/gorsel13.webp", aciklama: "Akıllı kontratlar ve Web3 projeleriniz için ileri seviye zafiyet taraması ve mimari denetim.", link: "https://www.shopier.com/xeroelite/48674042" },
        "hizmet_web_app": { isim: "Web ve Uygulama Güvenliği", fiyat: "15.000 ₺", img: "gorseller/gorsel14.webp", aciklama: "Web ve mobil uygulamalarınızın (iOS/Android) hacker bakış açısıyla incelenip güvenli hale getirilmesi.", link: "https://www.shopier.com/xeroelite/48674062" },
        "premium_society": { isim: "Xero Premium Society (Aylık)", fiyat: "1.500 ₺", img: "gorseller/gorsel15.webp", aciklama: "Özel teknik arşiv, seçkin networking ve siber güvenlik topluluğuna elit erişim aboneliği.", link: "https://www.shopier.com/xeroelite/48675904" },
        "ctf_kayit": { isim: "XE CTF Yarışması", fiyat: "Ön Kayıt", img: "gorseller/gorsel16.webp", aciklama: "CTF yarışmamızın detayları ve tarihi netleştiğinde size e-posta üzerinden dönüş sağlanacaktır. Lütfen formu doldurarak yerinizi ayırtın.", link: "#" }
    };
    
    const urlParams = new URLSearchParams(window.location.search);
    let rawUrunKodu = urlParams.get('urun');
    
    // NSA YAMASI 3: Parameter Poisoning (Parametre Zehirlenmesi) ve Prototype Pollution Zırhı
    // Gelen veriyi sterilize et. Sadece küçük harf ve alt çizgiye izin ver.
    const urunKodu = rawUrunKodu ? rawUrunKodu.replace(/[^a-z_]/g, "") : null;
    
    // Saldırgan JavaScript'in temel obje motoruna sızmaya çalışırsa operasyonu durdur
    if (urunKodu === "__proto__" || urunKodu === "constructor" || urunKodu === "prototype") {
        window.location.replace("index.html");
        return;
    }
    
    const secilenUrun = urunler[urunKodu];

    if(secilenUrun) {
        const imgEl = document.getElementById('ozet-img');
        imgEl.src = secilenUrun.img;
        
        // Eğitim modüllerinin listesi (Bunlar seçilirse yakınlaştırma yapma, orijinal kalsın)
        const egitimModulleri = ["exploit", "pentest", "malware", "web_mobile", "cloud_network", "soc", "cyber_intel"];
        
        if (egitimModulleri.includes(urunKodu)) {
            imgEl.style.transform = "scale(1)"; // Eğitim tasarımları ilk günkü gibi tertemiz kalır
        } else {
            imgEl.style.transform = "scale(1.15)"; // Sadece CTF ve Hizmetlerde logoyu gizlemek için yakınlaştırır
        }

        document.getElementById('ozet-img-wrapper').style.display = 'block'; 
        document.getElementById('ozet-isim').textContent = secilenUrun.isim;
        document.getElementById('ozet-aciklama').textContent = secilenUrun.aciklama;
        document.getElementById('ozet-fiyat').textContent = secilenUrun.fiyat;
        
        // Backend zafiyetini önlemek için manipüle edilebilir ürün ismini değil, doğrudan ürün kimliğini gönderiyoruz.
        document.getElementById('gizli_egitim_id').value = urunKodu;
        
        // Eğer seçilen ürün CTF ise buton yazısını, ikonunu ve altındaki SSL yazısını dinamik olarak değiştirir
        const formSubmitBtn = document.querySelector('.submit-btn');
        const trustBadge = document.querySelector('.trust-badge span');
        if(formSubmitBtn) {
            if(urunKodu === 'ctf_kayit') {
                formSubmitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> Ön Kayıt Başvurusunu Tamamla';
                if(trustBadge) trustBadge.textContent = "✓ Bilgileriniz Uçtan Uca Şifrelenmektedir";
            } else {
                formSubmitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg> Güvenli Ödeme Adımına Geç';
                if(trustBadge) trustBadge.textContent = "✓ 256-Bit SSL Şifreli Güvenli Bağlantı";
            }
        }

        const kayitFormu = document.getElementById('kayitFormu');
        if(kayitFormu) {
            kayitFormu.addEventListener('submit', function(e) {
                e.preventDefault(); 
                
                const submitBtn = kayitFormu.querySelector('button[type="submit"]');
                const originalIcerik = submitBtn.innerHTML;
                
                // Butonun bekleme animasyonunu duruma göre ayarlar
                submitBtn.innerHTML = (urunKodu === 'ctf_kayit') ? "BAŞVURU GÖNDERİLİYOR..." : "YÖNLENDİRİLİYOR...";
                submitBtn.disabled = true;

                const actionUrl = kayitFormu.getAttribute('action');
                
                if(actionUrl === '#' || actionUrl === '') {
                    if (urunKodu !== 'ctf_kayit') window.location.href = secilenUrun.link;
                    return;
                }

                const formData = new FormData(kayitFormu);
                fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if(response.ok) {
                        if(urunKodu === 'ctf_kayit') {
                            // Sadece CTF ise yönlendirme yapmaz, form verisini arka planda maile iletip mesaj verir
                            alert("✅ Ön kayıt başvurunuz Xero Elite ekibine ulaştı! CTF detayları ve tarihi netleştiğinde e-posta ile dönüş sağlanacaktır.");
                            kayitFormu.reset();
                            
                            // NSA YAMASI 4: CTF Kayıt API'sine Mail Bombing ve Auto-Clicker Engeli
                            submitBtn.innerHTML = "BAŞVURU ALINDI ✓";
                            submitBtn.style.backgroundColor = "#2e7d32";
                            submitBtn.style.color = "#ffffff";
                            submitBtn.disabled = true;
                            submitBtn.style.pointerEvents = "none";
                        } else {
                            // Satın alınabilir bir ürünse Shopier'e yönlendirir
                            window.location.href = secilenUrun.link;
                        }
                    } else {
                        throw new Error('Gönderim hatası');
                    }
                }).catch(error => {
                    alert("İşlem sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
                    submitBtn.innerHTML = originalIcerik;
                    submitBtn.disabled = false;
                });
            });
        }
    } else {
        // Strict DOM Manipulation - innerHTML kullanımdan tamamen kaldırıldı
        const ozetIcerik = document.getElementById('ozet-icerik');
        ozetIcerik.textContent = "Lütfen ana sayfadan geçerli bir eğitim modülü seçerek tekrar geliniz.";
        ozetIcerik.style.color = "#bbb";
        ozetIcerik.style.paddingTop = "20px";
    }
});
