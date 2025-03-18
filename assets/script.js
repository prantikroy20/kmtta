// Kishore Mahal Table Tennis Academy - Website Scripts

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and features
    initializeAnimations();
    initializeFormHandling();
    initializeScrollEffects();
    initializeTestimonials();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated counter for stats (can be added to success stories)
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 16);
    }
    
    // Image hover effect enhancement
    const detailsImage = document.querySelector('.details-image');
    if (detailsImage) {
        detailsImage.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = e.target.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            e.target.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        detailsImage.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        });
    }
    
    // Add reveal animations when scrolling
    const revealElements = document.querySelectorAll('.section');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // Photo gallery modal (can be implemented for facility images)
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.classList.add('modal-close');
            
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // Testimonial slider (can be added to the website)
    ////

// Initialize animations
function initializeAnimations() {
    // Animate stats numbers
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Animate number counting
function animateValue(element) {
    const value = parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const step = value / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= value) {
            element.textContent = value + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Initialize form handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show success message
            showNotification('Thank you for your inquiry! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Add scroll-based animations for sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Add parallax effect to banner
    const banner = document.querySelector('.banner');
    if (banner) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            banner.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
}

// Initialize testimonials
function initializeTestimonials() {
    const testimonials = [
        {
            name: "Shreya Jyoti",
            text: "The coaching here is exceptional. I've improved significantly since joining.",
            rating: 5
        },
        {
            name: "Alekhya Chatterjee",
            text: "Great facilities and professional coaches. Highly recommended!",
            rating: 5
        },
        {
            name: "Rishan Chatterjee",
            text: "The academy has helped me achieve my dream of becoming a state champion.",
            rating: 5
        }
    ];

    const container = document.querySelector('.testimonial-container');
    if (container) {
        testimonials.forEach(testimonial => {
            const testimonialElement = createTestimonialElement(testimonial);
            container.appendChild(testimonialElement);
        });
    }
}

// Create testimonial element
function createTestimonialElement(testimonial) {
    const div = document.createElement('div');
    div.className = 'testimonial-card';
    
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    
    div.innerHTML = `
        <div class="testimonial-content">
            <div class="stars">${stars}</div>
            <p>${testimonial.text}</p>
            <h4>${testimonial.name}</h4>
        </div>
    `;
    
    return div;
}

// Add smooth scroll behavior for mobile menu
function initializeMobileMenu() {
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        background: #28a745;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification.error {
        background: #dc3545;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .testimonial-card {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        margin: 1rem;
        transition: transform 0.3s ease;
    }
    
    .testimonial-card:hover {
        transform: translateY(-5px);
    }
    
    .stars {
        color: #ffcc00;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    
    .testimonial-content h4 {
        color: var(--primary-color);
        margin-top: 1rem;
    }
`;
document.head.appendChild(style); 