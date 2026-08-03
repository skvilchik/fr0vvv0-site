/**
 * ============================================================
 * 0vvv0 Portfolio — Core Application
 * ============================================================
 */

/* ===== Navbar ===== */
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        if (this.navbar) this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }
}

/* ===== Theme ===== */
class ThemeController {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.icon = document.getElementById('themeIcon');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && this.prefersDark.matches)) {
            document.body.classList.add('dark-theme');
            if (this.icon) this.icon.textContent = '☀️';
        }

        this.toggle?.addEventListener('click', () => this.toggleTheme());
        this.prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.body.classList.toggle('dark-theme', e.matches);
                if (this.icon) this.icon.textContent = e.matches ? '☀️' : '🌙';
            }
        });
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        if (this.icon) this.icon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
}

/* ===== Reveal on Scroll ===== */
class RevealController {
    constructor() {
        this.sections = document.querySelectorAll('.reveal');
        if (this.sections.length) this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
        this.sections.forEach(s => observer.observe(s));
    }
}

/* ===== Mobile Menu ===== */
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('mobileMenu');
        this.closeBtn = document.getElementById('menuClose');
        this.links = this.menu?.querySelectorAll('a');
        if (this.toggle && this.menu) this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.links?.forEach(link => link.addEventListener('click', () => this.close()));
    }

    open() {
        this.menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.menu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* ===== Visit Counter ===== */
class VisitCounter {
    constructor() {
        this.el = document.getElementById('visitNumber');
        this.init();
    }

    init() {
        try {
            let count = parseInt(localStorage.getItem('0vvv0_visits') || '0');
            count++;
            localStorage.setItem('0vvv0_visits', count.toString());
            if (this.el) this.el.textContent = count.toLocaleString('en-US');
        } catch (e) {
            if (this.el) this.el.textContent = '—';
        }
    }
}

/* ===== Smooth Scroll ===== */
class SmoothScroll {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

/* ===== Active Nav Link ===== */
class ActiveNavLink {
    constructor() {
        this.links = document.querySelectorAll('.nav-links a');
        this.sections = ['home', 'about', 'pricing', 'platforms', 'contact'];
        if (this.links.length) this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            let current = '';
            this.sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 120) current = id;
                }
            });
            this.links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        }, { passive: true });
    }
}

/* ===== Initialize ===== */
document.addEventListener('DOMContentLoaded', () => {
    new NavbarController();
    new ThemeController();
    new RevealController();
    new MobileMenu();
    new VisitCounter();
    new SmoothScroll();
    new ActiveNavLink();
});