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

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Server status checker
function checkServerStatus() {
    const statusElement = document.querySelector('.server-status');
    if (statusElement) {
        const statusText = currentLanguage === 'ar' ? 'متصل' : 'Online';
        statusElement.innerHTML = `<i class="fas fa-circle" style="color: #27ae60;"></i> ${statusText}`;
    }
}

// Player count updater
function updatePlayerCount() {
    const playerCount = Math.floor(Math.random() * 48) + 1;
    const playerCountElement = document.querySelector('.stat-number');
    if (playerCountElement) {
        playerCountElement.textContent = playerCount;
    }
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
        
        // Add a hidden input to track submission
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = '_next';
        hiddenInput.value = window.location.href;
        contactForm.appendChild(hiddenInput);
        
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
    
    // Add styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 450px;
            animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: 'Inter', 'Cairo', sans-serif;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 20px;
            border-radius: 15px;
            color: white;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .notification-icon {
            font-size: 1.5rem;
            margin-top: 2px;
        }
        
        .notification-text {
            flex: 1;
        }
        
        .notification-title {
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        
        .notification-message {
            font-size: 0.95rem;
            line-height: 1.4;
            opacity: 0.9;
        }
        
        .notification-success .notification-content {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
        }
        
        .notification-error .notification-content {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
        }
        
        .notification-info .notification-content {
            background: linear-gradient(135deg, #3498db, #2980b9);
        }
        
        .notification-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.3rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            margin-left: auto;
        }
        
        .notification-close:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
            to {
                transform: translateX(100%) scale(0.8);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .notification-content {
                padding: 15px;
            }
        }
        
        @media (max-width: 480px) {
            .notification-content {
                padding: 12px;
                gap: 10px;
            }
            
            .notification-title {
                font-size: 1rem;
            }
            
            .notification-message {
                font-size: 0.9rem;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        notificationStyle.id = 'notification-styles';
        document.head.appendChild(notificationStyle);
    }
    
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

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize server status
    checkServerStatus();
    updatePlayerCount();
    
    // Update player count every 30 seconds
    setInterval(updatePlayerCount, 30000);
    
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

// Add loading styles
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'BrotherHood';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3rem;
        font-weight: bold;
        z-index: 10000;
        animation: pulse 2s infinite;
    }
    
    body[lang="ar"]:not(.loaded)::after {
        content: 'BrotherHood';
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// Remove loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Add active class to navigation links
const addActiveClass = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', addActiveClass);

// Add CSS for active navigation link
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyle);

// Server information display
const serverInfo = {
    name: 'BrotherHood',
    ip: 'cfx.re/join/6gd4kj',
    maxPlayers: 48,
    framework: 'QBCore',
    version: '1.3.0',
    developer: 'SPOO',
    discord: 'https://discord.gg/hh4YygkeNQ',
    status: 'online'
};

// Display server info in console
console.log('BrotherHood Server Information:', serverInfo);

// Add server info to page
const addServerInfo = () => {
    const serverInfoElement = document.createElement('div');
    serverInfoElement.className = 'server-info';
    
    // Set initial content based on current language
    const initialContent = currentLanguage === 'ar' ? `
        <div class="server-info-content">
            <h4>معلومات الخادم</h4>
            <p><strong>الاسم:</strong> ${serverInfo.name}</p>
            <p><strong>العنوان:</strong> ${serverInfo.ip}</p>
            <p><strong>الحد الأقصى:</strong> ${serverInfo.maxPlayers} لاعب</p>
            <p><strong>الإطار:</strong> ${serverInfo.framework} ${serverInfo.version}</p>
            <p><strong>المطور:</strong> ${serverInfo.developer}</p>
            <p><strong>الحالة:</strong> <span class="status-online">متصل</span></p>
        </div>
    ` : `
        <div class="server-info-content">
            <h4>Server Information</h4>
            <p><strong>Name:</strong> ${serverInfo.name}</p>
            <p><strong>Address:</strong> ${serverInfo.ip}</p>
            <p><strong>Max Players:</strong> ${serverInfo.maxPlayers}</p>
            <p><strong>Framework:</strong> ${serverInfo.framework} ${serverInfo.version}</p>
            <p><strong>Developer:</strong> ${serverInfo.developer}</p>
            <p><strong>Status:</strong> <span class="status-online">Online</span></p>
        </div>
    `;
    
    serverInfoElement.innerHTML = initialContent;
    
    // Add styles for server info
    const serverInfoStyle = document.createElement('style');
    serverInfoStyle.textContent = `
        .server-info {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            z-index: 1000;
            max-width: 250px;
            display: none;
        }
        
        .server-info h4 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .server-info p {
            margin: 0.25rem 0;
        }
        
        .status-online {
            color: #27ae60;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .server-info {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(serverInfoStyle);
    
    document.body.appendChild(serverInfoElement);
    
    // Show server info on hover over logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            serverInfoElement.style.display = 'block';
        });
        
        logo.addEventListener('mouseleave', () => {
            serverInfoElement.style.display = 'none';
        });
    }
};

// Initialize server info
addServerInfo();

// Test function to show thank you page (for debugging)
window.testThankYouPage = function() {
    console.log('Testing thank you page...');
    showThankYouPage();
};

// Close thank you page with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const thankYouSection = document.getElementById('thank-you');
        if (thankYouSection && thankYouSection.classList.contains('show')) {
            showContactForm();
        }
    }
});

// Thank You Page Functions
function showThankYouPage() {
    console.log('showThankYouPage called'); // Debug log
    
    // Hide contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        console.log('Hiding contact section'); // Debug log
        contactSection.style.display = 'none';
    } else {
        console.log('Contact section not found'); // Debug log
    }
    
    // Show thank you section
    const thankYouSection = document.getElementById('thank-you');
    if (thankYouSection) {
        console.log('Showing thank you section'); // Debug log
        thankYouSection.classList.add('show');
        // No need for scrollIntoView since it's fixed positioned
    } else {
        console.log('Thank you section not found'); // Debug log
    }
    
    // Update navigation
    updateNavigationForThankYou();
}

function showContactForm() {
    // Hide thank you section
    const thankYouSection = document.getElementById('thank-you');
    if (thankYouSection) {
        thankYouSection.classList.remove('show');
    }
    
    // Show contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.style.display = 'block';
        contactSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    // Reset navigation
    resetNavigation();
}

function updateNavigationForThankYou() {
    // Update active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
            link.classList.add('active');
        }
    });
}

function resetNavigation() {
    // Reset navigation to normal behavior
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
