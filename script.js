// Ayuvani Landing Page Interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ayuvani Landing Page initialized successfully.');

    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Toggle Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close other open FAQ items for a clean single-open accordion experience
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherBtn = other.querySelector('.faq-question-btn');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current FAQ item
            if (isOpen) {
                item.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Expand first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstBtn = faqItems[0].querySelector('.faq-question-btn');
        if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    }

    // =========================================================================
    // Order Form Live Validation (Matching User Reference)
    // =========================================================================
    const orderForm = document.getElementById('main-order-form');
    const nameInput = document.getElementById('parent-name-input');
    const nameWrap = document.getElementById('name-input-wrap');
    const nameError = document.getElementById('name-error');

    const phoneInput = document.getElementById('phone-input');
    const phoneWrap = document.getElementById('phone-input-wrap');
    const phoneError = document.getElementById('phone-error');

    // Phone validation function
    function validatePhone(showImmediate = false) {
        if (!phoneInput) return true;
        const val = phoneInput.value.trim();

        // If empty
        if (val.length === 0) {
            if (showImmediate) {
                phoneWrap.classList.add('has-error');
                phoneError.textContent = 'कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें';
                return false;
            } else {
                phoneWrap.classList.remove('has-error');
                return true;
            }
        }

        // Must start with 6, 7, 8, or 9
        const firstDigit = val.charAt(0);
        if (!['6', '7', '8', '9'].includes(firstDigit)) {
            phoneWrap.classList.add('has-error');
            phoneError.textContent = 'कृपया 6-9 से शुरू होने वाला 10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
            return false;
        }

        // Must be exactly 10 digits
        if (val.length < 10) {
            if (showImmediate) {
                phoneWrap.classList.add('has-error');
                phoneError.textContent = 'कृपया 6-9 से शुरू होने वाला 10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
                return false;
            } else {
                phoneWrap.classList.remove('has-error');
                return true;
            }
        }

        // Valid 10-digit number
        const isValid = /^[6-9]\d{9}$/.test(val);
        if (isValid) {
            phoneWrap.classList.remove('has-error');
            return true;
        } else {
            phoneWrap.classList.add('has-error');
            phoneError.textContent = 'कृपया 6-9 से शुरू होने वाला 10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
            return false;
        }
    }

    // Name validation function
    function validateName(showImmediate = false) {
        if (!nameInput) return true;
        const val = nameInput.value.trim();
        if (val.length < 2) {
            if (showImmediate) {
                nameWrap.classList.add('has-error');
                return false;
            }
            return true;
        }
        nameWrap.classList.remove('has-error');
        return true;
    }

    if (phoneInput) {
        // Allow only digits
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
            
            // Real-time check: if first digit is invalid, show error right away (like user screenshot)
            if (this.value.length > 0 && !['6', '7', '8', '9'].includes(this.value.charAt(0))) {
                phoneWrap.classList.add('has-error');
                phoneError.textContent = 'कृपया 6-9 से शुरू होने वाला 10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
            } else if (this.value.length === 10) {
                validatePhone(true);
            } else {
                phoneWrap.classList.remove('has-error');
            }
        });

        phoneInput.addEventListener('blur', function () {
            validatePhone(true);
        });
    }

    if (nameInput) {
        nameInput.addEventListener('input', function () {
            if (this.value.trim().length >= 2) {
                nameWrap.classList.remove('has-error');
            }
        });

        nameInput.addEventListener('blur', function () {
            validateName(true);
        });
    }

    if (orderForm) {
        orderForm.removeAttribute('onsubmit');
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const isNameValid = validateName(true);
            const isPhoneValid = validatePhone(true);

            if (!isNameValid) {
                nameInput.focus();
                return;
            }

            if (!isPhoneValid) {
                phoneInput.focus();
                return;
            }

            alert('धन्यवाद! आपका ऑर्डर स्वीकार कर लिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।');
            orderForm.reset();
            if (nameWrap) nameWrap.classList.remove('has-error');
            if (phoneWrap) phoneWrap.classList.remove('has-error');
        });
    }
});
