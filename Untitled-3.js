/* ==========================================================================
   1. PRELOADER
   ========================================================================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000); // Tampil minimal 1 detik untuk efek transisi mulus
});

/* ==========================================================================
   2. DARK / LIGHT MODE TOGGLE (with LocalStorage)
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

// Cek LocalStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

/* ==========================================================================
   3. STICKY NAVBAR & BACK TO TOP BUTTON
   ========================================================================== */
const header = document.querySelector('.header');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
        backToTopBtn.classList.add('active');
    } else {
        header.classList.remove('sticky');
        backToTopBtn.classList.remove('active');
    }
});

/* ==========================================================================
   4. MOBILE HAMBURGER MENU
   ========================================================================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ==========================================================================
   5. ACTIVE MENU INDICATOR ON SCROLL
   ========================================================================== */
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================================================
   6. TYPING ANIMATION
   ========================================================================== */
const texts = ["Information System Student", "Web Developer", "UI/UX Enthusiast"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    document.getElementById('typing-text').textContent = letter;

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2; // Hapus lebih cepat
    }

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Jeda sebelum menghapus
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Jeda sebelum mengetik teks baru
    }

    setTimeout(type, typeSpeed);
}());

/* ==========================================================================
   7. SCROLL REVEAL & PROGRESS BAR ANIMATION (Intersection Observer)
   ========================================================================== */
const revealElements = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Tambahkan kelas active untuk scroll reveal biasa
        entry.target.classList.add('active');
        
        // Cek jika elemen berisi progress bar (Skills Section)
        if (entry.target.classList.contains('skill-card')) {
            const bar = entry.target.querySelector('.progress');
            if(bar) {
                const width = bar.getAttribute('data-width');
                // Beri sedikit delay sesuai inline variable (opsional untuk cascading)
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        }
        
        // Hentikan observe agar animasi tidak terus berulang (opsional)
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

/* ==========================================================================
   8. FORM SUBMIT PREVENT DEFAULT
   ========================================================================== */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Animasi loading sederhana pada tombol
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    setTimeout(() => {
        alert('Terima kasih! Pesan Anda telah berhasil dikirim.');
        this.reset();
        btn.innerHTML = originalText;
    }, 1500);
});