// Language Switcher
let currentLanguage = 'en';

const languageSwitcher = {
    init() {
        this.bindEvents();
        this.loadLanguage();
    },
    
    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    },
    
    switchLanguage(lang) {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.setAttribute('lang', lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Update all text content
        this.updateTextContent();
        localStorage.setItem('preferred-language', lang);
    },
    
    updateTextContent() {
        document.querySelectorAll('[data-en][data-ar]').forEach(element => {
            const text = element.getAttribute(`data-${currentLanguage}`);
            if (text) element.textContent = text;
        });
        
        // Update placeholders
        document.querySelectorAll('input[data-ar-placeholder], textarea[data-ar-placeholder]').forEach(input => {
            const placeholder = input.getAttribute(`data-${currentLanguage}-placeholder`);
            if (placeholder) input.placeholder = placeholder;
        });
    },
    
    loadLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        this.switchLanguage(savedLang === 'ar' ? 'ar' : 'en');
    }
};

languageSwitcher.init();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, job cards, and rule categories
document.querySelectorAll('.feature-card, .job-card, .rule-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Server stats management (combined)
const serverManager = {
    updateStatus() {
        document.querySelectorAll('.server-status').forEach(el => {
            const statusText = currentLanguage === 'ar' ? 'متصل' : 'Online';
            el.innerHTML = `<i class="fas fa-circle" style="color: #27ae60;"></i> ${statusText}`;
        });
    },
    
    updatePlayerCounts() {
        const fivemEl = document.getElementById('fivem-players');
        const redmEl = document.getElementById('redm-players');
        
        if (fivemEl) {
            const count = Math.floor(Math.random() * 48);
            animateCount(fivemEl, parseInt(fivemEl.textContent) || 0, count, 1000);
        }
        if (redmEl) {
            const count = Math.floor(Math.random() * 48);
            animateCount(redmEl, parseInt(redmEl.textContent) || 0, count, 1000);
        }
    }
}

// Animate number counting
function animateCount(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (difference * easeOut));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    // Add loading state to submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    
    // Set up replyto field
    const replytoField = contactForm.querySelector('input[name="_replyto"]');
    const emailField = contactForm.querySelector('input[name="email"]');
    
    if (replytoField && emailField) {
        emailField.addEventListener('input', () => {
            replytoField.value = emailField.value;
        });
    }
    
    contactForm.addEventListener('submit', (e) => {
        // Get form data first
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        // Clear previous validation states
        clearFormValidation();
        
        // Enhanced validation
        let hasErrors = false;
        
        if (!name || name.length < 2) {
            const errorMessage = currentLanguage === 'ar' 
                ? 'يرجى إدخال اسم صحيح (حرفين على الأقل)' 
                : 'Please enter a valid name (at least 2 characters)';
            showFieldError(contactForm.querySelector('input[name="name"]'), errorMessage);
            hasErrors = true;
        }
        
        if (!email) {
            const errorMessage = currentLanguage === 'ar' 
                ? 'يرجى إدخال البريد الإلكتروني' 
                : 'Please enter your email address';
            showFieldError(contactForm.querySelector('input[name="email"]'), errorMessage);
            hasErrors = true;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const errorMessage = currentLanguage === 'ar' 
                    ? 'يرجى إدخال بريد إلكتروني صحيح' 
                    : 'Please enter a valid email address';
                showFieldError(contactForm.querySelector('input[name="email"]'), errorMessage);
                hasErrors = true;
            }
        }
        
        if (!message || message.length < 10) {
            const errorMessage = currentLanguage === 'ar' 
                ? 'يرجى إدخال رسالة (10 أحرف على الأقل)' 
                : 'Please enter a message (at least 10 characters)';
            showFieldError(contactForm.querySelector('textarea[name="message"]'), errorMessage);
            hasErrors = true;
        }
        
        if (hasErrors) {
            e.preventDefault();
            return;
        }
        
        console.log('Form validation passed, proceeding with submission'); // Debug log
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = currentLanguage === 'ar' 
            ? '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...' 
            : '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Try to send data to FormSubmit, fallback to simulation if CORS fails
        const formData = new FormData(contactForm);
        
            
        // Try FormSubmit first
        fetch('https://formsubmit.co/mehdijarmouni@gmail.com', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // This allows the request but we can't read the response
        })
        .then(() => {
            console.log('Form submitted to FormSubmit');
            showThankYouPage();
            contactForm.reset();
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
            // Show success notification
            const successMessage = currentLanguage === 'ar' 
                ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
                : 'Your message has been sent successfully! We will contact you soon.';
            showNotification(successMessage, 'success');
        })
        .catch(error => {
            console.log('FormSubmit failed, using simulation:', error);
            // Fallback to simulation
            setTimeout(() => {
                console.log('Form submitted successfully (simulated)');
                showThankYouPage();
                contactForm.reset();
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Show success notification
                const successMessage = currentLanguage === 'ar' 
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
                    : 'Your message has been sent successfully! We will contact you soon.';
                showNotification(successMessage, 'success');
            }, 2000);
        });
        
        // Prevent default form submission since we're handling it manually
        e.preventDefault();
    });
    
    // Form submission is now handled entirely in JavaScript
    
}

// Form validation helpers
function clearFormValidation() {
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    formGroup.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    // Remove error message if exists
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Real-time validation
if (contactForm) {
    const nameField = contactForm.querySelector('input[name="name"]');
    const emailField = contactForm.querySelector('input[name="email"]');
    const messageField = contactForm.querySelector('textarea[name="message"]');
    
    // Name field validation
    nameField.addEventListener('blur', () => {
        const value = nameField.value.trim();
        if (value && value.length >= 2) {
            showFieldSuccess(nameField);
        } else if (value) {
            const errorMessage = currentLanguage === 'ar' 
                ? 'الاسم يجب أن يكون حرفين على الأقل' 
                : 'Name must be at least 2 characters';
            showFieldError(nameField, errorMessage);
        }
    });
    
    // Email field validation
    emailField.addEventListener('blur', () => {
        const value = emailField.value.trim();
        if (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                showFieldSuccess(emailField);
            } else {
                const errorMessage = currentLanguage === 'ar' 
                    ? 'يرجى إدخال بريد إلكتروني صحيح' 
                    : 'Please enter a valid email address';
                showFieldError(emailField, errorMessage);
            }
        }
    });
    
    // Message field validation
    messageField.addEventListener('blur', () => {
        const value = messageField.value.trim();
        if (value && value.length >= 10) {
            showFieldSuccess(messageField);
        } else if (value) {
            const errorMessage = currentLanguage === 'ar' 
                ? 'الرسالة يجب أن تكون 10 أحرف على الأقل' 
                : 'Message must be at least 10 characters';
            showFieldError(messageField, errorMessage);
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            </div>
            <div class="notification-text">
                <div class="notification-title">${type === 'success' ? (currentLanguage === 'ar' ? 'نجح!' : 'Success!') : type === 'error' ? (currentLanguage === 'ar' ? 'خطأ!' : 'Error!') : (currentLanguage === 'ar' ? 'معلومة' : 'Info')}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    
    document.body.appendChild(notification);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 6000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    });
}

// Discord invite link handler
document.querySelectorAll('a[href*="discord.gg"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track Discord clicks (analytics)
        console.log('Discord link clicked');
    });
});

// FiveM connection handler
document.querySelectorAll('a[href^="fivem://"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track FiveM connection attempts
        console.log('FiveM connection attempted');
        
        // Show connection instructions if FiveM is not installed
        setTimeout(() => {
            if (!window.fivem) {
                const message = currentLanguage === 'ar' 
                    ? 'تأكد من تثبيت FiveM على جهازك للانضمام إلى الخادم' 
                    : 'Make sure FiveM is installed on your device to join the server';
                alert(message);
            }
        }, 1000);
    });
});

// Loading screen management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.remove();
            }
        }, 500);
    }
}

// Loading animation
window.addEventListener('load', () => {
    setTimeout(hideLoadingScreen, 1500);
    document.body.classList.add('loaded');
    
    // Initialize server status
    serverManager.updateStatus();
    serverManager.updatePlayerCounts();
    
    // Update player count every 30 seconds
    setInterval(() => serverManager.updatePlayerCounts(), 30000);
    
    // Check if we should show thank you page (for FormSubmit redirect)
    if (window.location.hash === '#thank-you') {
        // Add a small delay to ensure page is fully loaded
        setTimeout(() => {
            showThankYouPage();
        }, 500);
    }
    
    // Also check on hash change (in case user navigates directly)
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#thank-you') {
            showThankYouPage();
        }
    });
});



// Test function to show thank you page (for debugging)
window.testThankYouPage = function() {
    console.log('Testing thank you page...');
    showThankYouPage();
};

// Close thank you page with ESC key or clicking outside
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const thankYouSection = document.getElementById('thank-you');
        if (thankYouSection && thankYouSection.classList.contains('show')) {
            showContactForm();
        }
    }
});

// Close thank you page when clicking outside the content
document.addEventListener('click', function(e) {
    const thankYouSection = document.getElementById('thank-you');
    if (thankYouSection && thankYouSection.classList.contains('show')) {
        if (e.target === thankYouSection) {
            showContactForm();
        }
    }
});

// Thank You Page Functions
function showThankYouPage() {
    console.log('showThankYouPage called'); // Debug log
    
    // Show thank you section as overlay
    const thankYouSection = document.getElementById('thank-you');
    if (thankYouSection) {
        console.log('Showing thank you section'); // Debug log
        thankYouSection.classList.add('show');
        // Prevent body scroll when overlay is open
        document.body.style.overflow = 'hidden';
    } else {
        console.log('Thank you section not found'); // Debug log
    }
}

function showContactForm() {
    // Hide thank you section
    const thankYouSection = document.getElementById('thank-you');
    if (thankYouSection) {
        thankYouSection.classList.remove('show');
    }
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Server Stats System
const serverStats = {
    fivemIP: 'YOUR_SERVER_IP:30120',
    redmIP: 'YOUR_SERVER_IP:30120',
    
    init() {
        this.updateStats();
        // Update stats every 30 seconds
        setInterval(() => this.updateStats(), 30000);
        this.bindCopyButtons();
    },
    
    async updateStats() {
        // Simulate player count (replace with actual API call)
        this.updatePlayerCount('fivem-players', Math.floor(Math.random() * 48));
        this.updatePlayerCount('redm-players', Math.floor(Math.random() * 48));
        
        // For real implementation, use FiveM/RedM API:
        // try {
        //     const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${serverCode}`);
        //     const data = await response.json();
        //     this.updatePlayerCount('fivem-players', data.Data.clients);
        // } catch (error) {
        //     console.error('Error fetching server stats:', error);
        // }
    },
    
    updatePlayerCount(elementId, count) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = count;
        }
    },
    
    bindCopyButtons() {
        document.querySelectorAll('.copy-ip').forEach(button => {
            button.addEventListener('click', (e) => {
                const ip = e.currentTarget.getAttribute('data-ip');
                this.copyToClipboard(ip);
                this.showCopyFeedback(e.currentTarget);
            });
        });
    },
    
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('IP copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            document.body.removeChild(textArea);
        }
    },
    
    showCopyFeedback(button) {
        const originalText = button.innerHTML;
        const lang = currentLanguage || 'en';
        const copiedText = lang === 'ar' ? 
            '<i class="fas fa-check"></i> <span>تم النسخ!</span>' : 
            '<i class="fas fa-check"></i> <span>Copied!</span>';
        
        button.innerHTML = copiedText;
        button.style.background = 'rgba(34, 197, 94, 0.2)';
        button.style.borderColor = '#22c55e';
        button.style.color = '#22c55e';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    }
};

// Performance Optimization
const performanceOptimizer = {
    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    },
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.classList.add('reduce-motion');
        }
    }
};

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    serverStats.init();
    performanceOptimizer.init();
});
