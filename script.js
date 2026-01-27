// ==========================================================================
// Landing Page JavaScript
// ==========================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initIntersectionObserver();
    initFormHandlers();
    initSmoothScrolling();
    initHeaderScroll();
});

// ==========================================================================
// Intersection Observer for Scroll Animations
// ==========================================================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .industry-item, .compliance-card, .stat'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================================================
// Form Handlers
// ==========================================================================
function initFormHandlers() {
    // Get all CTA buttons and email inputs
    const ctaButtons = document.querySelectorAll('.cta-button');
    const emailInputs = document.querySelectorAll('.email-input');
    
    // Add form validation and submission handlers
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const emailInput = emailInputs[index];
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                handleFormSubmission(email);
            } else {
                showValidationError(emailInput);
            }
        });
    });
    
    // Add enter key listener for email inputs
    emailInputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                ctaButtons[index].click();
            }
        });
        
        // Remove error styling on input
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // Header CTA button
    const headerCTA = document.querySelector('.cta-header');
    if (headerCTA) {
        headerCTA.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToFirstForm();
        });
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show validation error
function showValidationError(input) {
    input.classList.add('error');
    input.focus();
    
    // Add shake animation
    input.style.animation = 'shake 0.5s';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
    
    // Add error message if it doesn't exist
    if (!input.parentElement.querySelector('.error-message')) {
        const errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please enter a valid email address';
        errorMsg.style.cssText = `
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            display: block;
        `;
        input.parentElement.appendChild(errorMsg);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorMsg.remove();
        }, 3000);
    }
}

// Handle form submission
function handleFormSubmission(email) {
    console.log('Form submitted with email:', email);
    
    // TODO: Replace this with your actual form submission logic
    // This could be an API call, form embed integration, etc.
    
    // Example: Show success message
    showSuccessMessage();
    
    // Example API call structure (commented out):
    /*
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        showSuccessMessage();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
    */
}

// Show success message
function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const successBox = document.createElement('div');
    successBox.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 16px;
        text-align: center;
        max-width: 500px;
        margin: 0 1rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 0.4s ease;
    `;
    
    successBox.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
        <h3 style="font-family: 'Syne', sans-serif; font-size: 1.8rem; margin-bottom: 1rem; color: #8b2f7f;">Thank You!</h3>
        <p style="color: #5a5a5a; margin-bottom: 2rem;">We'll be in touch soon with your free scan results.</p>
        <button class="close-success" style="
            padding: 0.8rem 2rem;
            background: #8b2f7f;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
        ">Got it!</button>
    `;
    
    overlay.appendChild(successBox);
    document.body.appendChild(overlay);
    
    // Close on button click or overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.classList.contains('close-success')) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        }
    });
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================
function initSmoothScrolling() {
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
}

// Scroll to first form
function scrollToFirstForm() {
    const firstForm = document.querySelector('.form-container');
    if (firstForm) {
        firstForm.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus the email input after scrolling
        setTimeout(() => {
            const emailInput = firstForm.querySelector('.email-input');
            if (emailInput) emailInput.focus();
        }, 500);
    }
}

// ==========================================================================
// Header Scroll Effect
// ==========================================================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class on scroll for border effect
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================================================
// Add shake animation to CSS dynamically
// ==========================================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .email-input.error {
        border-color: #dc3545 !important;
        animation: shake 0.5s;
    }
    
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ==========================================================================
// Utility Functions
// ==========================================================================

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================================================
// Export functions for potential external use
// ==========================================================================
window.SolidCoreLanding = {
    validateEmail,
    handleFormSubmission,
    scrollToFirstForm
};
