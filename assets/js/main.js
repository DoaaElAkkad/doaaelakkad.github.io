document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with improved accessibility
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            spans[0].classList.toggle('rotate-down');
            spans[1].classList.toggle('hidden');
            spans[2].classList.toggle('rotate-up');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].classList.remove('rotate-down');
            spans[1].classList.remove('hidden');
            spans[2].classList.remove('rotate-up');
        }
    });
    
    // Handle Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].classList.remove('rotate-down');
            spans[1].classList.remove('hidden');
            spans[2].classList.remove('rotate-up');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].classList.remove('rotate-down');
                spans[1].classList.remove('hidden');
                spans[2].classList.remove('rotate-up');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Set focus to the target section for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update aria-current attribute for screen readers
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.removeAttribute('aria-current');
                    link.classList.remove('active');
                });
                this.setAttribute('aria-current', 'page');
                this.classList.add('active');
            }
        });
    });
    
    // View more certifications functionality with improved accessibility
    const viewMoreBtn = document.getElementById('view-more-certifications');
    const additionalCertifications = document.getElementById('additional-certifications');
    
    if (viewMoreBtn && additionalCertifications) {
        viewMoreBtn.addEventListener('click', function() {
            const isHidden = additionalCertifications.classList.contains('hidden');
            if (isHidden) {
                additionalCertifications.classList.remove('hidden');
                this.textContent = 'View Less';
                this.setAttribute('aria-expanded', 'true');
                
                // Animate new items
                const newItems = additionalCertifications.querySelectorAll('.certification-item');
                newItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, index * 100);
                });
            } else {
                additionalCertifications.classList.add('hidden');
                this.textContent = 'View More';
                this.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Download CV button functionality
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Create download animation
            const downloadContainer = document.querySelector('.download-container');
            downloadContainer.classList.add('pulse-animation');
            setTimeout(() => {
                downloadContainer.classList.remove('pulse-animation');
            }, 1000);
            
            // Allow the download attribute to handle the download naturally
            // This is more accessible and respects browser settings
            console.log('CV download initiated');
        });
    }
    
    // Add active class to nav links on scroll and update aria-current
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            }
        });
    });
    
    // Add animation to timeline items with improved performance
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Lazy load certification items as they come into view
    const certificationItems = document.querySelectorAll('.certification-item');
    
    const certObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, Math.random() * 300);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    certificationItems.forEach(item => {
        certObserver.observe(item);
    });
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillObserver.observe(item);
    });
    
    // Add animation to education items
    const educationItems = document.querySelectorAll('.education-item');
    
    const educationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    educationItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        educationObserver.observe(item);
    });
    
    // Handle language item animations
    const languageItems = document.querySelectorAll('.language-item');
    
    const languageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate the level bars
                    const levelBars = entry.target.querySelectorAll('.level-bar.full');
                    levelBars.forEach((bar, barIndex) => {
                        setTimeout(() => {
                            bar.style.width = '35px';
                            bar.style.opacity = '1';
                        }, barIndex * 150);
                    });
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    languageItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Set initial styles for level bars
        const levelBars = item.querySelectorAll('.level-bar.full');
        levelBars.forEach(bar => {
            bar.style.width = '0';
            bar.style.opacity = '0';
            bar.style.transition = 'width 0.5s ease, opacity 0.5s ease';
        });
        
        languageObserver.observe(item);
    });
    
    // Add print functionality
    const printCV = () => {
        window.print();
    };
    
    // Add Dark Mode toggle
    const createDarkModeToggle = () => {
        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.setAttribute('tabindex', '0');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        
        document.body.appendChild(toggle);
        
        // Check for stored preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            
            if (isDark) {
                toggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                toggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Keyboard accessibility
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    };
    
    createDarkModeToggle();
    
    // Handle automatic dark mode based on user preference
    const detectColorScheme = () => {
        const storedMode = localStorage.getItem('darkMode');
        if (storedMode === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
                document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'true');
            }
        }
        
        // Listen for changes in color scheme preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
                    localStorage.setItem('darkMode', 'true');
                } else {
                    document.body.classList.remove('dark-mode');
                    document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
                    localStorage.setItem('darkMode', 'false');
                }
            }
        });
    };
    
    detectColorScheme();
    
    // Handle sticky navigation visibility with performance optimization
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    const scrollThreshold = 100;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScrollTop > scrollThreshold) {
                // Add box shadow to nav when scrolled down
                nav.classList.add('scrolled');
                
                if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
                    // Scrolling down, hide nav
                    nav.classList.add('nav-up');
                } else {
                    // Scrolling up, show nav
                    nav.classList.remove('nav-up');
                }
            } else {
                // At top of page, remove box shadow
                nav.classList.remove('scrolled');
            }
            
            lastScrollTop = currentScrollTop;
        }, 10);
    });
    
    // Add CSS for animations and accessibility
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn span.rotate-down {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn span.rotate-up {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        nav.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        nav.nav-up {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .pulse-animation {
            animation: pulse 1s ease;
        }
        
        /* Focus styles for better accessibility */
        a:focus, button:focus, [tabindex="0"]:focus {
            outline: 2px solid #57C5B6;
            outline-offset: 2px;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add "Back to top" button
    const createBackToTopButton = () => {
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.setAttribute('role', 'button');
        backToTop.setAttribute('tabindex', '0');
        
        document.body.appendChild(backToTop);
        
        // Initially hide the button
        backToTop.style.display = 'none';
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.style.display = 'flex';
                setTimeout(() => {
                    backToTop.style.opacity = '1';
                }, 50);
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 500) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Keyboard accessibility
        backToTop.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backToTop.click();
            }
        });
        
        // Add styles
        const backToTopStyle = document.createElement('style');
        backToTopStyle.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 99;
            }
            
            .back-to-top:hover {
                transform: translateY(-5px);
            }
            
            @media (max-width: 768px) {
                .back-to-top {
                    width: 45px;
                    height: 45px;
                    bottom: 80px;
                    right: 20px;
                }
            }
        `;
        document.head.appendChild(backToTopStyle);
    };
    
    createBackToTopButton();
    
    // Create typewriter effect for the header title
    const createTypewriterEffect = () => {
        const title = document.querySelector('.profile-info h2');
        if (!title) return;
        
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    };
    
    createTypewriterEffect();
    
    // Add loading animation (placeholder for real content loading)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
});
