// ===== Dusk Media Website JavaScript =====

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navContainer = document.querySelector('.nav-container');
const contactForm = document.getElementById('contactForm');

// ===== Mobile Menu =====
let menuOpen = false;

const toggleMenu = () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        mobileMenu.classList.add('active');
        navContainer.classList.add('menu-open');
        menuBtn.textContent = 'Close';
    } else {
        mobileMenu.classList.remove('active');
        navContainer.classList.remove('menu-open');
        menuBtn.textContent = 'Menu';
    }
};

const closeMenu = () => {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    navContainer.classList.remove('menu-open');
    menuBtn.textContent = 'Menu';
};

menuBtn.addEventListener('click', toggleMenu);

// Close menu on link click
document.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
        closeMenu();
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.text-reveal');

const revealOnScroll = () => {
    revealElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            // Add staggered delay based on position in parent
            const parent = el.closest('.line, .feature-content, .pricing-title, .contact-title');
            if (parent) {
                const siblings = parent.querySelectorAll('.text-reveal');
                const siblingIndex = Array.from(siblings).indexOf(el);
                el.style.transitionDelay = `${siblingIndex * 0.1}s`;
            }
            el.classList.add('visible');
        }
    });
};

// Initial check
revealOnScroll();

// On scroll
window.addEventListener('scroll', revealOnScroll, { passive: true });

// ===== Hero Animation on Load =====
window.addEventListener('load', () => {
    const heroLetters = document.querySelectorAll('.hero-letter');
    const heroTagline = document.querySelector('.hero-tagline');

    heroLetters.forEach((letter, index) => {
        letter.style.opacity = '0';
        letter.style.transform = 'translateY(30px)';

        setTimeout(() => {
            letter.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    if (heroTagline) {
        heroTagline.style.opacity = '0';
        setTimeout(() => {
            heroTagline.style.transition = 'opacity 0.6s ease';
            heroTagline.style.opacity = '1';
        }, 600);
    }
});

// ===== Contact Form =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email.', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent! We\'ll be in touch soon.', 'success');
            this.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<span>${message}</span>`;

    const bgColor = type === 'success' ? '#2D5A3D' : type === 'error' ? '#FF6B6B' : '#fe8e24';

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        padding: '16px 20px',
        borderRadius: '16px',
        backgroundColor: bgColor,
        color: '#fff',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: '500',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);

    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== Mascot Animation =====
const mascotBody = document.querySelector('.mascot-body');
const mascotContainer = document.querySelector('.mascot');

if (mascotBody) {
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        animateMascotEyes(touch.clientX, touch.clientY);
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
        animateMascotEyes(e.clientX, e.clientY);
    }, { passive: true });
}


function animateMascotEyes(x, y) {
    const mascot = document.querySelector('.mascot-body');
    if (!mascot) return;

    const rect = mascot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxMove = 3;
    const deltaX = Math.max(-maxMove, Math.min(maxMove, (x - centerX) / 50));
    const deltaY = Math.max(-maxMove, Math.min(maxMove, (y - centerY) / 50));

    const eyes = mascot.querySelectorAll('.mascot-eye');
    eyes.forEach(eye => {
        eye.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
}

// ===== Floating Icons Animation Enhancement =====
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.3}s`;
});

// ===== Intersection Observer for Feature Sections =====
const featureSections = document.querySelectorAll('.feature-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icons = entry.target.querySelectorAll('.floating-icon');
            icons.forEach((icon, index) => {
                icon.style.opacity = '0';
                icon.style.transform = 'translateY(20px) scale(0.8)';

                setTimeout(() => {
                    icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    icon.style.opacity = '1';
                    icon.style.transform = 'translateY(0) scale(1)';
                }, 200 + (index * 150));
            });
        }
    });
}, { threshold: 0.3 });

featureSections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== Pricing Cards Animation =====
const pricingCards = document.querySelectorAll('.pricing-card');

const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 + (index * 150));
            });
            pricingObserver.disconnect();
        }
    });
}, { threshold: 0.2 });

if (pricingCards.length > 0) {
    pricingObserver.observe(pricingCards[0]);
}


