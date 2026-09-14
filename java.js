document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Cursor Logic --- */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Add hover effects for interactive elements
        const hoverables = document.querySelectorAll('a, button, .tag, .project-card, .filter-btn');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '50px';
                cursor.style.height = '50px';
                cursor.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '32px';
                cursor.style.height = '32px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    /* --- Typing Animation (Hero) --- */
    const typingSpan = document.querySelector('.typing-text');
    const words = ["Scalable Web Apps", "Pixel-Perfect Designs", "Clean Architecture", "Seamless User Experiences"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingSpan) type();

    /* --- Navigation Menu (Mobile) --- */
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    /* --- Scroll Header State & Back to Top Button --- */
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.className = 'light-theme';
                localStorage.setItem('theme', 'light-theme');
            } else {
                body.className = 'dark-theme';
                localStorage.setItem('theme', 'dark-theme');
            }
        });
    }

    /* --- Portfolio Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --- Testimonials Slider --- */
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonials.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) {
                slide.classList.add('active');
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    if (prevBtn && nextBtn && testimonials.length > 0) {
        showSlide(currentSlide);

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
    }

    /* --- Project Details Modal --- */
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const viewDetailBtns = document.querySelectorAll('.view-details');

    // Sample data for projects details
    const projectsData = {
        "1": {
            title: "Apex Analytics Dashboard",
            category: "React / Next.js",
            desc: "A high-performance financial dashboard that monitors real-time transaction telemetry. Engineered with Next.js for server-side rendering benefits and Optimized with state-of-the-art charting libraries.",
            features: [
                "Real-time data streaming via WebSockets.",
                "Customizable layout with grid drag-and-drop system.",
                "Multi-currency transaction analysis and localized taxation support."
            ],
            tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
            bgClass: "img-1",
            iconClass: "fa-chart-line"
        },
        "2": {
            title: "Symphony Audio Engine",
            category: "Vanilla JS",
            desc: "An interactive browser-based synthesizer and step sequencer powered by the HTML5 Web Audio API. Built with high performance in mind to avoid audio dropouts and interface lag.",
            features: [
                "Real-time synthesizer wave generation (Sine, Square, Sawtooth, Triangle).",
                "16-step sequencer with customizable BPM and pitch variation.",
                "Dynamic visual feedback on sound waves via Canvas API."
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Web Audio API"],
            bgClass: "img-2",
            iconClass: "fa-music"
        },
        "3": {
            title: "Veloce Headless Commerce",
            category: "React / E-Commerce",
            desc: "A fully headless e-commerce experience designed for premium apparel brands. Focuses on speed, intuitive search experiences, and highly secure checkout procedures.",
            features: [
                "Instant search filters utilizing Algolia search engines.",
                "Flexible shopping cart architecture utilizing dynamic local-storage state.",
                "Stripe payment integration with multi-step validation checks."
            ],
            tech: ["React", "Redux Toolkit", "GraphQL", "Stripe"],
            bgClass: "img-3",
            iconClass: "fa-bag-shopping"
        },
        "4": {
            title: "Zenith Workspace Concept",
            category: "UI/UX Design",
            desc: "A visual masterclass exploring minimal dashboard aesthetics. The objective of this workspace interface design was to minimize visual clutter and elevate user task completion speeds.",
            features: [
                "Strict adherence to golden ratio grid systems.",
                "Intricate micro-interactions triggered by scrolling and hovering.",
                "Polished accessibility-tested dark and light themes."
            ],
            tech: ["Figma", "CSS Grid", "Micro-Interactions"],
            bgClass: "img-4",
            iconClass: "fa-compass-drafting"
        }
    };

    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectsData[projectId];

            if (data && modal) {
                // Populate Modal Data
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-category').textContent = data.category;
                document.getElementById('modal-desc').textContent = data.desc;

                // Load visual illustration
                const modalImg = document.getElementById('modal-img');
                modalImg.className = `modal-placeholder-img ${data.bgClass}`;
                modalImg.innerHTML = `<i class="fa-solid ${data.iconClass}"></i>`;

                // Load Features
                const featuresList = document.getElementById('modal-features');
                featuresList.innerHTML = '';
                data.features.forEach(feat => {
                    const li = document.createElement('li');
                    li.textContent = feat;
                    featuresList.appendChild(li);
                });

                // Load Tech Stack Tags
                const techContainer = document.getElementById('modal-tech');
                techContainer.innerHTML = '';
                data.tech.forEach(t => {
                    const span = document.createElement('span');
                    span.textContent = t;
                    techContainer.appendChild(span);
                });

                // Display Modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal on clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    /* --- Contact Form Handling (Simulation) --- */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate sending message
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.pointerEvents = 'none';

            setTimeout(() => {
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'flex';
                    formSuccess.style.opacity = '1';
                }, 300);
            }, 1500);
        });
    }

    /* --- Active Navigation Highlight on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });
});