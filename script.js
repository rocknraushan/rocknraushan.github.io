/* ══════════════════════════════════════
   PORTFOLIO INTERACTIONS
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 24) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });

    // ─── Mobile menu ───
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Smooth scroll for nav links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ─── Intersection Observer for scroll animations ───
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || '0');
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                animObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-reveal, .anim-slide-up').forEach(el => {
        animObserver.observe(el);
    });

    // ─── Parallax effect for hero background ───
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
            }
        }, { passive: true });
    }

    // ─── Cursor glow on hero ───
    const hero = document.querySelector('.hero');
    const heroGradient = document.querySelector('.hero-bg-gradient');
    if (hero && heroGradient) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroGradient.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(255, 69, 0, 0.1) 0%, transparent 60%)`;
        });
    }

    // ─── Active nav link highlighting ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // ─── Contact form ───
    const EMAILJS_SERVICE_ID  = 'service_euly54l';
    const EMAILJS_TEMPLATE_ID = 'template_o46k08v';
    const EMAILJS_PUBLIC_KEY  = 'pbpC0iJIDvQn1-14a';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.form-submit');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(() => {
                    btn.innerHTML = '<span>✓ Message Sent!</span>';
                    btn.style.background = '#16a34a';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                        btn.style.opacity = '1';
                        btn.style.background = '';
                    }, 2500);
                })
                .catch(() => {
                    btn.innerHTML = '<span>✗ Failed — try email directly</span>';
                    btn.style.background = '#dc2626';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                        btn.style.opacity = '1';
                        btn.style.background = '';
                    }, 3000);
                });
        });
    }

    // ─── Stat counter animation ───
    const statValues = document.querySelectorAll('.stat-value');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/^(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(match[1], '');
                    let current = 0;
                    const duration = 1200;
                    const step = target / (duration / 16);

                    const counter = () => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target + suffix;
                        } else {
                            el.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(counter);
                        }
                    };
                    requestAnimationFrame(counter);
                }
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => statObserver.observe(el));

    // ─── Skill tag hover ripple ───
    document.querySelectorAll('.skill-tags span, .project-stack span, .timeline-stack span').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // ─── Typed effect for hero ───
    const heroLine = document.querySelector('.hero-line');
    if (heroLine) {
        // Add a blinking cursor effect
        const cursor = document.createElement('span');
        cursor.className = 'typed-cursor';
        cursor.textContent = '_';
        cursor.style.cssText = `
            color: var(--accent);
            animation: blink 1s step-end infinite;
            font-weight: 300;
            margin-left: 4px;
        `;
        // We'll let CSS handle the cursor animation
    }

    // ─── Add blink keyframe ───
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            50% { opacity: 0; }
        }
        .nav-link.active {
            color: var(--text);
        }
        .nav-link.active::after {
            transform: scaleX(1);
            transform-origin: left;
        }
    `;
    document.head.appendChild(style);

});
