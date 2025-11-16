/**
 * Form Validation Module
 * Handles validation for the website builder form
 */

const Validation = (function() {
    'use strict';

    // Validation patterns
    const PATTERNS = {
        PHONE: /^[0-9]+$/,
        INSTAGRAM: /^[a-zA-Z0-9_]+$/
    };

    // Error messages
    const ERROR_MESSAGES = {
        REQUIRED: 'This field is required',
        PHONE_INVALID: 'Please enter a valid WhatsApp number (digits only)',
        INSTAGRAM_INVALID: 'Please enter a valid Instagram handle (letters, numbers, and underscores only)',
        NO_MENU_ITEMS: 'Please add at least one menu item',
        MENU_ITEM_NAME_REQUIRED: 'Menu item name is required',
        MENU_ITEM_PRICE_REQUIRED: 'Menu item price is required',
        TOO_LONG: 'This field exceeds the maximum length'
    };

    /**
     * Validates if a field is not empty
     * @param {string} value - The field value
     * @returns {boolean} - True if valid
     */
    function isRequired(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    }

    /**
     * Validates phone number format (digits only)
     * @param {string} phone - The phone number
     * @returns {boolean} - True if valid
     */
    function isValidPhone(phone) {
        return PATTERNS.PHONE.test(phone);
    }

    /**
     * Validates Instagram handle format (alphanumeric and underscore only)
     * @param {string} handle - The Instagram handle
     * @returns {boolean} - True if valid
     */
    function isValidInstagram(handle) {
        return PATTERNS.INSTAGRAM.test(handle);
    }

    /**
     * Validates field length against maximum limit
     * @param {string} value - The field value
     * @param {number} maxLength - Maximum allowed length
     * @returns {boolean} - True if within limit
     */
    function isWithinLengthLimit(value, maxLength) {
        return value.length <= maxLength;
    }

    /**
     * Gets the maximum length for a field based on its name
     * @param {string} fieldName - The field name
     * @returns {number|null} - Maximum length or null if no limit
     */
    function getMaxLength(fieldName) {
        if (typeof Sanitization !== 'undefined' && Sanitization.LENGTH_LIMITS) {
            const limits = Sanitization.LENGTH_LIMITS;
            const fieldMap = {
                'business_name': limits.BUSINESS_NAME,
                'business_type': limits.BUSINESS_TYPE,
                'tagline': limits.TAGLINE,
                'short_description': limits.SHORT_DESCRIPTION,
                'contact_whatsapp': limits.CONTACT_WHATSAPP,
                'instagram_handle': limits.INSTAGRAM_HANDLE,
                'menu_item_name[]': limits.MENU_ITEM_NAME,
                'menu_item_price[]': limits.MENU_ITEM_PRICE
            };
            return fieldMap[fieldName] || null;
        }
        return null;
    }

    /**
     * Displays an error message for a specific field
     * @param {HTMLElement} field - The input field element
     * @param {string} message - The error message to display
     */
    function showError(field, message) {
        const formGroup = field.closest('.form-group') || field.closest('.menu-item-field');
        if (!formGroup) return;

        formGroup.classList.add('error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    /**
     * Clears the error state for a specific field
     * @param {HTMLElement} field - The input field element
     */
    function clearError(field) {
        const formGroup = field.closest('.form-group') || field.closest('.menu-item-field');
        if (!formGroup) return;

        formGroup.classList.remove('error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    /**
     * Clears all error states in the form
     */
    function clearAllErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error, .menu-item-field.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });

        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.style.display = 'none';
        });
    }

    /**
     * Validates a single form field
     * @param {HTMLElement} field - The field to validate
     * @returns {boolean} - True if valid
     */
    function validateField(field) {
        const fieldName = field.name || field.id;
        const value = field.value.trim();

        clearError(field);

        // Check required fields
        if (field.hasAttribute('required') && !isRequired(value)) {
            showError(field, ERROR_MESSAGES.REQUIRED);
            return false;
        }

        // Validate WhatsApp phone number
        if (fieldName === 'contact_whatsapp' && value) {
            if (!isValidPhone(value)) {
                showError(field, ERROR_MESSAGES.PHONE_INVALID);
                return false;
            }
        }

        // Validate Instagram handle
        if (fieldName === 'instagram_handle' && value) {
            if (!isValidInstagram(value)) {
                showError(field, ERROR_MESSAGES.INSTAGRAM_INVALID);
                return false;
            }
        }

        // Validate length limits
        const maxLength = getMaxLength(fieldName);
        if (maxLength && value && !isWithinLengthLimit(value, maxLength)) {
            showError(field, `${ERROR_MESSAGES.TOO_LONG} (max ${maxLength} characters)`);
            return false;
        }

        return true;
    }

    /**
     * Validates all menu items
     * @returns {boolean} - True if valid
     */
    function validateMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        // Menu items are now optional - allow 0 items
        // Clear any existing menu error message
        const menuError = document.getElementById('menuItemsError');
        if (menuError) {
            menuError.style.display = 'none';
        }
        
        // If no menu items, validation passes
        if (menuItems.length === 0) {
            return true;
        }

        let allValid = true;

        // Validate each menu item that exists
        menuItems.forEach(item => {
            const nameInput = item.querySelector('input[name="menu_item_name[]"]');
            const priceInput = item.querySelector('input[name="menu_item_price[]"]');

            if (nameInput) {
                const nameValid = validateField(nameInput);
                if (!nameValid) {
                    allValid = false;
                }
            }

            if (priceInput) {
                const priceValid = validateField(priceInput);
                if (!priceValid) {
                    allValid = false;
                }
            }
        });

        return allValid;
    }

    /**
     * Validates the entire form
     * @param {HTMLFormElement} form - The form element to validate
     * @returns {boolean} - True if all validations pass
     */
    function validateForm(form) {
        clearAllErrors();

        let isValid = true;
        let firstErrorField = null;

        // Validate text inputs and textareas
        const textFields = form.querySelectorAll('input[type="text"], textarea, select');
        textFields.forEach(field => {
            // Skip menu item fields (they're validated separately)
            if (field.name === 'menu_item_name[]' || field.name === 'menu_item_price[]') {
                return;
            }

            if (!validateField(field)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });

        // Validate theme selection
        const themeSelected = form.querySelector('input[name="theme_choice"]:checked');
        if (!themeSelected) {
            const themeGroup = form.querySelector('.form-group:has(.theme-selector)');
            if (themeGroup) {
                themeGroup.classList.add('error');
                const errorMsg = themeGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'block';
                }
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = form.querySelector('input[name="theme_choice"]');
                }
            }
        }

        // Validate menu items
        if (!validateMenuItems()) {
            isValid = false;
            if (!firstErrorField) {
                firstErrorField = document.querySelector('input[name="menu_item_name[]"]');
            }
        }

        // Focus on first error field
        if (!isValid && firstErrorField) {
            firstErrorField.focus();
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    // Public API
    return {
        validateForm: validateForm,
        validateField: validateField,
        validateMenuItems: validateMenuItems,
        clearError: clearError,
        clearAllErrors: clearAllErrors,
        showError: showError,
        isValidPhone: isValidPhone,
        isValidInstagram: isValidInstagram,
        isWithinLengthLimit: isWithinLengthLimit
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validation;
}
