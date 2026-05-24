/**
 * PROJECT ENGINE CORE FILE - AJI RAHAYU PORTFOLIO
 * Designed natively without external heavy execution libraries.
 */

/* ==========================================================================
   1. LOADING ENGINE MANAGEMENT
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    // Simulate system bootstrap check sequence
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1200);
    }
});

/* ==========================================================================
   2. LIGHT/DARK CONFIGURATOR VIA LOCALSTORAGE
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Evaluate saved preference engine state
const currentSavedTheme = localStorage.getItem('portfolio-theme') || 'dark';
htmlElement.setAttribute('data-theme', currentSavedTheme);

if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    syncThemeIcon(currentSavedTheme, themeIcon);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const targetedTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', targetedTheme);
        localStorage.setItem('portfolio-theme', targetedTheme);
        syncThemeIcon(targetedTheme, themeIcon);
    });
}

function syncThemeIcon(theme, iconElement) {
    if (!iconElement) return;
    if (theme === 'light') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

/* ==========================================================================
   3. STICKY NAVBAR LOGIC & SCROLL MONITOR
   ========================================================================== */
const navbarHeader = document.querySelector('.navbar-header');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Navbar Scroll Adaptation
    if (navbarHeader) {
        if (window.scrollY > 40) {
            navbarHeader.classList.add('sticky-active');
        } else {
            navbarHeader.classList.remove('sticky-active');
        }
    }

    // Back to Top trigger visibility check
    if (backToTopBtn) {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('btn-visible');
        } else {
            backToTopBtn.classList.remove('btn-visible');
        }
    }
});

// Scroll Back to Top Action execution
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   4. MOBILE NAV MATRIX MANIPULATION (Safeguarded)
   ========================================================================== */
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
// Menangkap link dari menu lama (nav-link) atau menu baru di profil (profile-menu-list a)
const navLinks = document.querySelectorAll('.nav-link, .profile-menu-list a');

if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('burger-active');
        navMenu.classList.toggle('mobile-menu-active');
    });
}

// Structural close engine sequence upon anchor engagement
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburgerMenu) hamburgerMenu.classList.remove('burger-active');
        if (navMenu) navMenu.classList.remove('mobile-menu-active');
    });
});

/* ==========================================================================
   5. NATIVE HIGH-PERFORMANCE TYPING SUB-ROUTINE
   ========================================================================== */
const typingTerminal = document.getElementById('typing-engine');
const careerPhrases = [
    "Information System Student", 
    "Web Developer", 
    "UI/UX Enthusiast"
];

let phraseCycleIndex = 0;
let characterIndex = 0;
let activeBuffer = '';
let executionDeletionState = false;

function matrixTypingCore() {
    if (!typingTerminal) return;

    const totalPhrases = careerPhrases.length;
    const currentPhrase = careerPhrases[phraseCycleIndex % totalPhrases];

    if (executionDeletionState) {
        activeBuffer = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
    } else {
        activeBuffer = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
    }

    typingTerminal.textContent = activeBuffer;

    let baselineTypingSpeed = 110;

    if (executionDeletionState) {
        baselineTypingSpeed /= 2; // Accelerated deletion pace matrix
    }

    if (!executionDeletionState && activeBuffer === currentPhrase) {
        baselineTypingSpeed = 2200; // Static reading pause threshold
        executionDeletionState = true;
    } else if (executionDeletionState && activeBuffer === '') {
        executionDeletionState = false;
        phraseCycleIndex++;
        baselineTypingSpeed = 400; // Recalibration break sequence
    }

    setTimeout(matrixTypingCore, baselineTypingSpeed);
}

// Instantiate writing engine loop
if (typingTerminal) {
    setTimeout(matrixTypingCore, 1500);
}

/* ==========================================================================
   6. HIGH PERF SCROLL LINK ACTIVE MONITOR & REVEAL ENGINE
   ========================================================================== */
const structuralSections = document.querySelectorAll('section[id]');
const customRevealElements = document.querySelectorAll('[class*="reveal-fade-"]');

const customSystemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Element Visual Activation Tracking
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-activated');
            
            // Skill element specialized nested operational initialization
            if (entry.target.classList.contains('skill-item-card')) {
                const filledBar = entry.target.querySelector('.progress-bar-fill');
                if (filledBar) {
                    filledBar.style.width = filledBar.getAttribute('data-progress');
                }
            }
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
});

// Connect nodes to active monitoring pool
customRevealElements.forEach(element => customSystemObserver.observe(element));

// Complementary tracking layer for structural progress fill-bar hooks
const progressNodes = document.querySelectorAll('.skill-item-card');
progressNodes.forEach(node => customSystemObserver.observe(node));

// Active Nav Link highlight on Scroll tracking routine
window.addEventListener('scroll', () => {
    let verticalPosition = window.pageYOffset || window.scrollY;

    structuralSections.forEach(section => {
        const topBoundOffset = section.offsetTop - 160;
        const componentHeight = section.offsetHeight;
        const attributeId = section.getAttribute('id');

        if (verticalPosition >= topBoundOffset && verticalPosition < topBoundOffset + componentHeight) {
            // Support penandaan link aktif pada menu profil
            document.querySelector(`.profile-menu-list a[href*=${attributeId}]`)?.classList.add('active-link');
        } else {
            document.querySelector(`.profile-menu-list a[href*=${attributeId}]`)?.classList.remove('active-link');
        }
    });
});

/* ==========================================================================
   7. ASYNCHRONOUS SIMULATED VALIDATION CAPTURE
   ========================================================================== */
const contactForm = document.getElementById('portfolio-contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const processingString = '<i class="fas fa-circle-notch fa-spin"></i> TRANSMITTING...';
        const defaultString = submitButton.innerHTML;
        
        submitButton.innerHTML = processingString;
        submitButton.style.pointerEvents = 'none';

        setTimeout(() => {
            alert('Sistem Berhasil Mentransmisikan Pesan! Terima kasih telah menghubungi Aji.');
            contactForm.reset();
            submitButton.innerHTML = defaultString;
            submitButton.style.pointerEvents = 'auto';
        }, 1800);
    });
}