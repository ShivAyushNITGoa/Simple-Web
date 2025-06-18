// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const themeToggle = document.getElementById('theme-toggle');
    const counterElement = document.getElementById('counter');
    const counterButton = document.getElementById('counter-button');
    const contactForm = document.getElementById('contact-form');
    
    // Theme Toggle Functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
        
        // Update button text
        themeToggle.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
    
    // Load theme preference from localStorage
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Toggle Light Mode';
    }
    
    // Counter Functionality
    let count = 0;
    
    counterButton.addEventListener('click', () => {
        count++;
        counterElement.textContent = count;
        
        // Add animation effect
        counterElement.classList.add('pulse');
        setTimeout(() => {
            counterElement.classList.remove('pulse');
        }, 300);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For this example, we'll just show an alert
        alert(`Thank you for your message, ${name}!\nWe'll get back to you at ${email} soon.`);
        
        // Reset the form
        contactForm.reset();
    });
    
    // Add animation for cards
    const cards = document.querySelectorAll('.card');
    
    // Simple intersection observer to add animation when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Initialize cards with opacity 0 and observe them
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add CSS animation for the counter
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 