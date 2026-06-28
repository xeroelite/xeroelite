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
        
        // GÜVENLİK YAMASI 1: Sadece '#' işareti içeren boş linkleri blokla
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        
        // GÜVENLİK YAMASI 2: Element sayfada gerçekten varsa kaydır (Console sızıntısını önler)
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});