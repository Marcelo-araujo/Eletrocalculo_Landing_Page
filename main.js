// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Counter Animation for Stats
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText.replace(/[+.,%h]/g, '');
        const increment = target / 100;

        if (count < target) {
            const newValue = Math.ceil(count + increment);
            stat.innerText = stat.innerText.includes('+') ? `+${newValue}` : 
                            stat.innerText.includes('%') ? `${newValue}%` :
                            stat.innerText.includes('h') ? `${newValue}h` : newValue;
            setTimeout(animateStats, 20);
        } else {
            stat.innerText = stat.innerText.replace(/\d+/, target);
        }
    });
};

// Intersection Observer for Stats
const statsSection = document.querySelector('.social-proof');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

// Exit Intent Popup
let popupShown = false;
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !popupShown) {
        document.getElementById('exit-popup').style.display = 'flex';
        popupShown = true;
    }
});

document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('exit-popup').style.display = 'none';
});

// Mobile Menu (Simple toggle)
const mobileToggle = document.querySelector('.mobile-menu-toggle');
mobileToggle?.addEventListener('click', () => {
    // Basic toggle logic if needed for mobile nav
    console.log('Mobile menu clicked');
});

// Lead Form Submission
const leadForm = document.getElementById('lead-form');
leadForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerText = 'Sucesso! Verifique seu e-mail.';
        btn.style.backgroundColor = 'var(--secondary)';
        leadForm.reset();
    }, 1500);
});

// Header scroll effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = 'none';
    }
});
// Ensure external links work correctly
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Stop other scripts from interfering with external links
        e.stopPropagation();
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
