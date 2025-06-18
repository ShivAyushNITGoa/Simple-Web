// Advanced JavaScript with complex interactions, animations, and functionality
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen initially
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Initialize animations after page load
            initAnimations();
        }, 1000); // Delay for demonstration
    });
    
    // Header scroll effect
    const header = document.getElementById('main-header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Save preference to localStorage
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });
    
    // Load theme preference from localStorage
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Image slider
    const slider = document.querySelector('.image-slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        let currentSlide = 0;
        let slideInterval;
        
        // Initialize slider
        function initSlider() {
            // Show first slide
            showSlide(currentSlide);
            
            // Start automatic slide change
            startSlideInterval();
            
            // Event listeners for controls
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            // Dot navigation
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    currentSlide = parseInt(dot.getAttribute('data-slide'));
                    showSlide(currentSlide);
                    resetSlideInterval();
                });
            });
            
            // Pause slideshow on hover
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', startSlideInterval);
            
            // Swipe functionality for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const threshold = 50;
                if (touchEndX - touchStartX > threshold) {
                    prevSlide();
                } else if (touchStartX - touchEndX > threshold) {
                    nextSlide();
                }
            }
        }
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            resetSlideInterval();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            resetSlideInterval();
        }
        
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }
        
        // Initialize slider if it exists
        if (slides.length > 0) {
            initSlider();
        }
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animated progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, 100);
        });
    }
    
    // Animate counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const steps = 50;
            const stepValue = target / steps;
            let current = 0;
            
            const updateCounter = setInterval(() => {
                current += stepValue;
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(updateCounter);
                } else {
                    counter.textContent = Math.round(current);
                }
            }, duration / steps);
        });
    }
    
    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            btn.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Portfolio modals
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioTitle = document.getElementById('portfolio-title');
    const portfolioContent = document.getElementById('portfolio-content');
    const modalCloseBtns = document.querySelectorAll('.close-modal');
    
    // Project details
    const projectDetails = {
        project1: {
            title: 'E-commerce Website',
            description: 'A fully responsive e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
            image: 'https://source.unsplash.com/random/800x600/?ecommerce',
            client: 'ABC Retail',
            date: 'June 2023',
            url: '#'
        },
        project2: {
            title: 'Fitness App',
            description: 'A mobile application for tracking workouts, setting fitness goals, and monitoring progress with data visualization.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
            image: 'https://source.unsplash.com/random/800x600/?fitness',
            client: 'FitLife Inc.',
            date: 'April 2023',
            url: '#'
        },
        project3: {
            title: 'Brand Identity',
            description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.',
            technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
            image: 'https://source.unsplash.com/random/800x600/?branding',
            client: 'TechNova',
            date: 'May 2023',
            url: '#'
        },
        project4: {
            title: 'Dashboard Interface',
            description: 'An intuitive admin dashboard with data visualization, user management, and real-time analytics.',
            technologies: ['React.js', 'SASS', 'D3.js', 'Firebase'],
            image: 'https://source.unsplash.com/random/800x600/?dashboard',
            client: 'DataViz Corp',
            date: 'July 2023',
            url: '#'
        },
        project5: {
            title: 'Mobile App Interface',
            description: 'User experience and interface design for a social networking mobile application with dark mode support.',
            technologies: ['Figma', 'Adobe XD', 'Principle'],
            image: 'https://source.unsplash.com/random/800x600/?app',
            client: 'SocialConnect',
            date: 'March 2023',
            url: '#'
        },
        project6: {
            title: 'Food Delivery App',
            description: 'A cross-platform food delivery application with restaurant listings, order tracking, and payment processing.',
            technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe'],
            image: 'https://source.unsplash.com/random/800x600/?food',
            client: 'QuickBite',
            date: 'August 2023',
            url: '#'
        }
    };
    
    portfolioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            // Populate modal content
            portfolioTitle.textContent = project.title;
            
            const content = `
                <div class="project-details-grid">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <div class="info-item">
                            <h4>Project Description</h4>
                            <p>${project.description}</p>
                        </div>
                        <div class="info-item">
                            <h4>Technologies Used</h4>
                            <div class="technologies">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        <div class="info-grid">
                            <div class="info-item">
                                <h4>Client</h4>
                                <p>${project.client}</p>
                            </div>
                            <div class="info-item">
                                <h4>Completion Date</h4>
                                <p>${project.date}</p>
                            </div>
                        </div>
                        <div class="project-link">
                            <a href="${project.url}" class="primary-btn" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
                        </div>
                    </div>
                </div>
            `;
            
            portfolioContent.innerHTML = content;
            
            // Show modal
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Service card details
    const serviceBtns = document.querySelectorAll('.service-btn');
    const serviceModal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const serviceDetails = {
        'Web Development': {
            description: 'Our web development services focus on creating custom, high-performance websites and web applications tailored to your specific business needs.',
            process: [
                'Requirements Analysis',
                'Design and Prototyping',
                'Development',
                'Testing and Quality Assurance',
                'Deployment',
                'Maintenance and Support'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'PHP', 'Python', 'MySQL', 'MongoDB'],
            benefits: [
                'Customized solutions for your specific business requirements',
                'Responsive design for all devices',
                'SEO-friendly code structure',
                'Fast loading speeds',
                'Secure and scalable architecture'
            ]
        },
        'UI/UX Design': {
            description: 'Our design services focus on creating intuitive, engaging user experiences that delight your customers and drive business results.',
            process: [
                'User Research',
                'Information Architecture',
                'Wireframing',
                'Prototyping',
                'Visual Design',
                'Usability Testing',
                'Implementation Support'
            ],
            technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Adobe Photoshop', 'Adobe Illustrator'],
            benefits: [
                'Intuitive and user-friendly interfaces',
                'Improved user satisfaction and engagement',
                'Reduced development costs through early problem detection',
                'Consistent user experience across platforms',
                'Data-driven design decisions'
            ]
        },
        'Mobile Development': {
            description: 'We create native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.',
            process: [
                'Strategy and Planning',
                'UI/UX Design',
                'Development',
                'Testing',
                'Deployment',
                'Maintenance and Updates'
            ],
            technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS Amplify', 'Google Maps API'],
            benefits: [
                'Native performance on all devices',
                'Consistent experience across platforms',
                'Offline functionality',
                'Integration with device features',
                'Regular updates and support'
            ]
        },
        'SEO Services': {
            description: 'Our SEO services help improve your website\'s visibility in search engines, driving more qualified traffic and increasing conversions.',
            process: [
                'Technical SEO Audit',
                'Keyword Research',
                'On-page Optimization',
                'Content Strategy',
                'Link Building',
                'Performance Monitoring',
                'Reporting and Analysis'
            ],
            technologies: ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Moz', 'Screaming Frog'],
            benefits: [
                'Improved search engine rankings',
                'Increased organic traffic',
                'Better user experience',
                'Higher conversion rates',
                'Long-term sustainable results'
            ]
        }
    };
    
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceTitle = btn.closest('.service-card').querySelector('h3').textContent;
            const serviceDetail = serviceDetails[serviceTitle];
            
            // Populate modal content
            modalTitle.textContent = serviceTitle;
            
            const content = `
                <div class="service-detail">
                    <p class="service-description">${serviceDetail.description}</p>
                    
                    <div class="service-process">
                        <h4>Our Process</h4>
                        <ol class="process-list">
                            ${serviceDetail.process.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="service-technologies">
                        <h4>Technologies We Use</h4>
                        <div class="tech-tags">
                            ${serviceDetail.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="service-benefits">
                        <h4>Benefits</h4>
                        <ul class="benefits-list">
                            ${serviceDetail.benefits.map(benefit => `<li><i class="fas fa-check-circle"></i> ${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="cta-container">
                        <button class="primary-btn service-cta">Get Started</button>
                    </div>
                </div>
            `;
            
            modalContent.innerHTML = content;
            
            // Show modal
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add event listener for CTA button
            const ctaBtn = modalContent.querySelector('.service-cta');
            ctaBtn.addEventListener('click', () => {
                serviceModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Scroll to contact section
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                
                // Pre-select subject in contact form
                const subjectSelect = document.getElementById('subject');
                for (let i = 0; i < subjectSelect.options.length; i++) {
                    if (subjectSelect.options[i].text.includes(serviceTitle)) {
                        subjectSelect.selectedIndex = i;
                        break;
                    }
                }
            });
        });
    });
    
    // Pricing plan selection
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const planName = btn.closest('.pricing-card').querySelector('h4').textContent;
            
            // Scroll to contact section
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill subject
            const subjectSelect = document.getElementById('subject');
            for (let i = 0; i < subjectSelect.options.length; i++) {
                if (subjectSelect.options[i].text.includes('Quote')) {
                    subjectSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Pre-fill message
            const messageField = document.getElementById('message');
            messageField.value = `I'm interested in the ${planName} pricing plan. Please provide more information.`;
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');
    const successBtn = document.getElementById('success-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate phone (if provided)
            const phoneInput = document.getElementById('phone');
            if (phoneInput.value && !phoneInput.validity.valid) {
                document.getElementById('phone-error').textContent = 'Please enter a valid phone number (123-456-7890)';
                isValid = false;
            }
            
            // Validate subject
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value === '') {
                document.getElementById('subject-error').textContent = 'Please select a subject';
                isValid = false;
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Please enter a message (at least 10 characters)';
                isValid = false;
            }
            
            // Validate consent
            const consentInput = document.getElementById('consent');
            if (!consentInput.checked) {
                document.getElementById('consent-error').textContent = 'You must agree to the privacy policy';
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send data to server here
                
                // Show success message
                successMessage.textContent = 'Your message has been sent successfully. We will get back to you soon!';
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput.value)) {
                // In a real application, you would send data to server here
                
                // Show success message
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset form
                newsletterForm.reset();
            } else {
                // Show inline error
                emailInput.style.borderColor = 'var(--danger-color)';
                emailInput.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
                
                // Reset after a while
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
    
    if (successBtn) {
        successBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Skip if it's the back to top button or a modal close button
            if (link.id === 'back-to-top' || link.classList.contains('close-modal')) {
                return;
            }
            
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Skip empty links or page links
            if (targetId === '#' || targetId === '#!' || targetId === '') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('#main-nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    });
    
    // Initialize animations on scroll
    function initAnimations() {
        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('[data-aos]');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight * 0.85) {
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        element.classList.add('aos-animate');
                    }, delay);
                }
            });
        };
        
        // Initial check
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Animate progress bars and counters when About section is visible
        const aboutSection = document.getElementById('about');
        
        const checkAboutVisibility = () => {
            if (aboutSection) {
                const position = aboutSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (position < windowHeight * 0.7) {
                    animateProgressBars();
                    animateCounters();
                    window.removeEventListener('scroll', checkAboutVisibility);
                }
            }
        };
        
        // Initial check
        checkAboutVisibility();
        
        // Check on scroll
        window.addEventListener('scroll', checkAboutVisibility);
    }
    
    // GSAP animations for enhanced effects
    if (typeof gsap !== 'undefined') {
        // Header animation
        gsap.from('#main-header', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Hero content animation
        gsap.from('.hero-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        // Section headers animation with ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            });
        }
    }
}); 