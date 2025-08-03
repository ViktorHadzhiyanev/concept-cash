// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000); // 3 seconds loading time
});

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const fadeElements = document.querySelectorAll('.feature-card, .episode-card, .participant-card');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe fade-in elements
fadeElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.euro-pattern');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Particle effect for hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#ffa74f';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particle);
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endX = Math.random() * window.innerWidth;
        const endY = -10;
        const duration = Math.random() * 3000 + 2000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        const animation = particle.animate([
            { transform: 'translateY(0px)', opacity: 0.6 },
            { transform: `translateY(${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// Create particles periodically
setInterval(createParticle, 500);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Card hover animations
const cards = document.querySelectorAll('.feature-card, .episode-card, .participant-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(47, 26, 80, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(47, 26, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create cursor trail element
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = '#ffa74f';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    trail.style.opacity = '0.8';
    
    document.body.appendChild(trail);
    
    // Animate trail
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
        setTimeout(() => {
            trail.remove();
        }, 300);
    }, 100);
});

// Audio context for interactive sounds (optional)
let audioContext;
let oscillator;

function createAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Add click sound to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        createAudioContext();
        
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // Create a simple click sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
}, 16));

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg effect
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Global functions for form error handling
function showFormError(message) {
    console.log('showFormError called with message:', message);
    
    // Remove existing error message if any
    hideFormError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    
    const form = document.querySelector('.application-form');
    console.log('Form element found:', form);
    
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
        
        // Add error styling to form
        form.classList.add('has-error');
        console.log('Error div added to form');
    } else {
        console.error('Form not found!');
    }
}

function hideFormError() {
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const form = document.querySelector('.application-form');
    if (form) {
        form.classList.remove('has-error');
    }
}

// Initialize all animations and form functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded!');
    
    // Add entrance animations to sections
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Form handling
    const applicationForm = document.querySelector('.application-form');
    console.log('Application form found:', applicationForm);
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit event triggered!');
            
            // Check if all required fields are filled
            const requiredFields = this.querySelectorAll('input[required], textarea[required], select[required]');
            const fileUploads = this.querySelectorAll('.file-upload');
            let allFieldsFilled = true;
            let missingFields = [];
            
            console.log('Required fields found:', requiredFields.length);
            console.log('File uploads found:', fileUploads.length);
            
            // Check text inputs, textareas, and selects
            requiredFields.forEach(field => {
                console.log('Checking field:', field.name, 'Type:', field.type, 'Value:', field.value);
                
                if (field.type === 'radio') {
                    const radioGroup = field.name;
                    const radioButtons = this.querySelectorAll(`input[name="${radioGroup}"]`);
                    const isChecked = Array.from(radioButtons).some(radio => radio.checked);
                    console.log('Radio group:', radioGroup, 'Checked:', isChecked);
                    if (!isChecked) {
                        allFieldsFilled = false;
                        missingFields.push(field.name);
                    }
                } else if (field.type === 'date') {
                    if (!field.value) {
                        allFieldsFilled = false;
                        missingFields.push(field.name);
                    }
                } else if (field.tagName === 'SELECT') {
                    if (!field.value) {
                        allFieldsFilled = false;
                        missingFields.push(field.name);
                    }
                } else {
                    if (!field.value.trim()) {
                        allFieldsFilled = false;
                        missingFields.push(field.name);
                    }
                }
            });
            
            // Check file uploads
            fileUploads.forEach(upload => {
                if (upload.hasAttribute('data-required')) {
                    const statusText = upload.querySelector('p');
                    console.log('File upload status:', statusText ? statusText.textContent : 'No status text');
                    if (statusText && statusText.textContent === 'Няма избран файл') {
                        allFieldsFilled = false;
                        missingFields.push('file upload');
                    }
                }
            });
            
            if (!allFieldsFilled) {
                console.log('Form validation failed!');
                console.log('Missing fields:', missingFields);
                console.log('All fields filled:', allFieldsFilled);
                
                // Show error message
                showFormError('Трябва да попълните всички полета!');
                
                // Scroll to top of form
                this.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Изпращане...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Успешно изпратено!';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                    
                    // Reset all form elements
                    const radioButtons = this.querySelectorAll('input[type="radio"]');
                    radioButtons.forEach(radio => {
                        radio.checked = false;
                        radio.closest('.radio-label').classList.remove('active');
                    });
                    
                    const selectElements = this.querySelectorAll('select');
                    selectElements.forEach(select => {
                        select.value = '';
                        select.style.borderColor = 'rgba(255, 167, 79, 0.3)';
                    });
                    
                    const dateInput = this.querySelector('input[type="date"]');
                    if (dateInput) {
                        dateInput.value = '';
                        dateInput.style.borderColor = 'rgba(255, 167, 79, 0.3)';
                    }
                    
                    const uploadAreas = this.querySelectorAll('.upload-area p');
                    uploadAreas.forEach(p => {
                        p.textContent = 'Няма избран файл';
                        p.style.color = '';
                    });
                    
                    // Hide any existing error message
                    hideFormError();
                }, 3000);
            }, 2000);
        });
    }

    // File upload functionality
    const uploadButtons = document.querySelectorAll('.btn-upload');
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            
            // Set accept attribute based on button context
            if (this.textContent.includes('снимка')) {
                input.accept = 'image/*';
            } else if (this.textContent.includes('видео')) {
                input.accept = 'video/*';
            }
            
            input.click();
            
            input.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    const uploadArea = button.closest('.upload-area');
                    const statusText = uploadArea.querySelector('p');
                    statusText.textContent = `Избран файл: ${fileName}`;
                    statusText.style.color = '#ffa74f';
                }
            });
        });
    });
    
    // Handle radio button interactions
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove active class from all radio labels in the same group
            const name = this.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.radio-label').classList.remove('active');
            });
            
            // Add active class to selected radio label
            this.closest('.radio-label').classList.add('active');
        });
        
        // Add click event to the label for better accessibility
        const label = radio.nextElementSibling.nextElementSibling; // Skip radio-custom span
        if (label && label.tagName === 'LABEL') {
            label.addEventListener('click', function() {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            });
        }
    });
    
    // Handle select dropdowns
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#ffa74f';
            } else {
                this.style.borderColor = 'rgba(255, 167, 79, 0.3)';
            }
        });
    });
    
    // Handle date input
    const dateInput = document.getElementById('birthDate');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#ffa74f';
            } else {
                this.style.borderColor = 'rgba(255, 167, 79, 0.3)';
            }
        });
    }
    
    // Handle input and textarea changes to remove error styling
    const formInputs = document.querySelectorAll('.application-form input, .application-form textarea, .application-form select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            const form = document.querySelector('.application-form');
            if (form.classList.contains('has-error')) {
                // Only hide error if all fields are now filled
                const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
                const fileUploads = form.querySelectorAll('.file-upload');
                let allFieldsFilled = true;
                
                requiredFields.forEach(field => {
                    if (field.type === 'radio') {
                        const radioGroup = field.name;
                        const radioButtons = form.querySelectorAll(`input[name="${radioGroup}"]`);
                        const isChecked = Array.from(radioButtons).some(radio => radio.checked);
                        if (!isChecked) {
                            allFieldsFilled = false;
                        }
                    } else if (field.type === 'date') {
                        if (!field.value) {
                            allFieldsFilled = false;
                        }
                    } else if (field.tagName === 'SELECT') {
                        if (!field.value) {
                            allFieldsFilled = false;
                        }
                    } else {
                        if (!field.value.trim()) {
                            allFieldsFilled = false;
                        }
                    }
                });
                
                fileUploads.forEach(upload => {
                    if (upload.hasAttribute('data-required')) {
                        const statusText = upload.querySelector('p');
                        if (statusText && statusText.textContent === 'Няма избран файл') {
                            allFieldsFilled = false;
                        }
                    }
                });
                
                if (allFieldsFilled) {
                    hideFormError();
                }
            }
        });
    });
});

console.log('MR.CA$H Website loaded successfully! 🎉');

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.querySelector('.modal-close');

// Open video modal when watch button is clicked
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-watch')) {
        const videoId = e.target.getAttribute('data-video');
        if (videoId) {
            modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
});

// Close modal when X is clicked
modalClose.addEventListener('click', function() {
    videoModal.style.display = 'none';
    modalVideo.src = ''; // Stop video
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalVideo.src = ''; // Stop video
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        modalVideo.src = ''; // Stop video
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}); 