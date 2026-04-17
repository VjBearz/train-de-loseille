// Le Train de l'Oseille - Main JavaScript

// Mise à jour de la date actuelle
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const currentDate = new Date().toLocaleDateString('fr-FR', options);
        const capitalizedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
        dateElement.textContent = capitalizedDate;
    }
}

// Mise à jour de l'heure de dernière mise à jour
function updateLastUpdateTime() {
    const updateElement = document.getElementById('last-update');
    if (updateElement) {
        const now = new Date();
        const options = { 
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = now.toLocaleDateString('fr-FR', options);
        updateElement.textContent = formattedDate;
    }
}

// Chargement du contenu depuis le JSON
async function loadDailyContent() {
    try {
        const response = await fetch('data/latest.json');
        if (!response.ok) {
            console.log('Pas de contenu généré pour aujourd\'hui');
            return;
        }
        
        const data = await response.json();
        
        // Mise à jour du contenu
        if (data.macro) {
            document.getElementById('macro-content').innerHTML = data.macro;
        }
        
        if (data.actions) {
            document.getElementById('actions-content').innerHTML = data.actions;
        }
        
        if (data.crypto) {
            document.getElementById('crypto-content').innerHTML = data.crypto;
        }
        
        if (data.commodities) {
            document.getElementById('commodities-content').innerHTML = data.commodities;
        }
        
        if (data.opportunities) {
            document.getElementById('opportunities-content').innerHTML = data.opportunities;
        }
        
        if (data.action) {
            document.getElementById('action-content').innerHTML = data.action;
        }
        
    } catch (error) {
        console.log('Contenu par défaut affiché');
    }
}

// Smooth scroll pour les ancres
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation au scroll pour les sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.brief-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Smart Sticky Header - cache au scroll bas, réapparaît au scroll haut
function initSmartHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 8;   // ignore micro-scrolls (anti-flicker)
    const HIDE_AFTER = 80;        // px avant de cacher le header

    function onScroll() {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY;

        if (Math.abs(diff) < SCROLL_THRESHOLD) {
            ticking = false;
            return;
        }

        if (diff > 0 && currentY > HIDE_AFTER) {
            // Scroll vers le BAS : cacher
            header.classList.add('header-hidden');
        } else {
            // Scroll vers le HAUT : montrer
            header.classList.remove('header-hidden');
        }

        header.classList.toggle('scrolled', currentY > 20);

        lastScrollY = currentY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentDate();
    updateLastUpdateTime();
    loadDailyContent();
    initSmoothScroll();
    initScrollAnimations();
    initSmartHeader();

    // Mise à jour de l'heure toutes les minutes
    setInterval(updateLastUpdateTime, 60000);
});

// Gestion du mode sombre (future fonctionnalité)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// Vérifier les préférences de mode sombre au chargement
function checkDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Export pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCurrentDate,
        updateLastUpdateTime,
        loadDailyContent
    };
}
