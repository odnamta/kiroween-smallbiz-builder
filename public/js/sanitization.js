/**
 * Sanitization Module
 * Provides security functions for input sanitization and validation
 */

const Sanitization = (function() {
    'use strict';

    // Input length limits
    const LENGTH_LIMITS = {
        BUSINESS_NAME: 100,
        BUSINESS_TYPE: 50,
        TAGLINE: 150,
        SHORT_DESCRIPTION: 500,
        CONTACT_WHATSAPP: 20,
        INSTAGRAM_HANDLE: 30,
        MENU_ITEM_NAME: 100,
        MENU_ITEM_PRICE: 20
    };

    /**
     * Sanitizes HTML to prevent XSS attacks
     * @param {string} str - The string to sanitize
     * @returns {string} - Sanitized string with HTML entities escaped
     */
    function sanitizeHTML(str) {
        if (typeof str !== 'string') {
            return '';
        }
        
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Sanitizes URL for WhatsApp links
     * @param {string} phone - The phone number to sanitize
     * @returns {string} - Sanitized phone number (digits only)
     */
    function sanitizeWhatsAppURL(phone) {
        if (typeof phone !== 'string') {
            return '';
        }
        // Remove all non-digit characters
        return phone.replace(/[^0-9]/g, '');
    }

    /**
     * Sanitizes URL for Instagram links
     * @param {string} handle - The Instagram handle to sanitize
     * @returns {string} - Sanitized handle (alphanumeric and underscore only)
     */
    function sanitizeInstagramURL(handle) {
        if (typeof handle !== 'string') {
            return '';
        }
        // Remove all characters except letters, numbers, and underscores
        return handle.replace(/[^a-zA-Z0-9_]/g, '');
    }

    /**
     * Validates and sanitizes URL based on type
     * @param {string} url - The URL to sanitize
     * @param {string} type - The type of URL ('whatsapp' or 'instagram')
     * @returns {string} - Sanitized URL
     */
    function sanitizeURL(url, type) {
        if (type === 'whatsapp') {
            return sanitizeWhatsAppURL(url);
        }
        if (type === 'instagram') {
            return sanitizeInstagramURL(url);
        }
        return '';
    }

    /**
     * Enforces length limit on input string
     * @param {string} str - The string to limit
     * @param {number} maxLength - Maximum allowed length
     * @returns {string} - Truncated string
     */
    function enforceLength(str, maxLength) {
        if (typeof str !== 'string') {
            return '';
        }
        return str.slice(0, maxLength);
    }

    /**
     * Sanitizes form data object with all security measures
     * @param {Object} formData - The form data to sanitize
     * @returns {Object} - Sanitized form data
     */
    function sanitizeFormData(formData) {
        const sanitized = {};

        // Sanitize and enforce length limits on text fields
        sanitized.business_name = enforceLength(
            sanitizeHTML(formData.business_name || ''),
            LENGTH_LIMITS.BUSINESS_NAME
        );

        sanitized.business_type = enforceLength(
            sanitizeHTML(formData.business_type || ''),
            LENGTH_LIMITS.BUSINESS_TYPE
        );

        sanitized.tagline = enforceLength(
            sanitizeHTML(formData.tagline || ''),
            LENGTH_LIMITS.TAGLINE
        );

        sanitized.short_description = enforceLength(
            sanitizeHTML(formData.short_description || ''),
            LENGTH_LIMITS.SHORT_DESCRIPTION
        );

        // Sanitize URLs
        sanitized.contact_whatsapp = enforceLength(
            sanitizeWhatsAppURL(formData.contact_whatsapp || ''),
            LENGTH_LIMITS.CONTACT_WHATSAPP
        );

        sanitized.instagram_handle = enforceLength(
            sanitizeInstagramURL(formData.instagram_handle || ''),
            LENGTH_LIMITS.INSTAGRAM_HANDLE
        );

        // Sanitize menu items
        if (Array.isArray(formData.menu_items)) {
            sanitized.menu_items = formData.menu_items.map(item => ({
                name: enforceLength(
                    sanitizeHTML(item.name || ''),
                    LENGTH_LIMITS.MENU_ITEM_NAME
                ),
                price: enforceLength(
                    sanitizeHTML(item.price || ''),
                    LENGTH_LIMITS.MENU_ITEM_PRICE
                )
            }));
        } else {
            sanitized.menu_items = [];
        }

        // Theme choice doesn't need HTML sanitization, just validation
        sanitized.theme_choice = formData.theme_choice || 'classic';

        return sanitized;
    }

    /**
     * Validates URL format to prevent malicious links
     * @param {string} url - The URL to validate
     * @param {string} type - The type of URL ('whatsapp' or 'instagram')
     * @returns {boolean} - True if URL format is valid
     */
    function isValidURLFormat(url, type) {
        if (typeof url !== 'string' || url.trim() === '') {
            return false;
        }

        if (type === 'whatsapp') {
            // WhatsApp should only contain digits
            return /^[0-9]+$/.test(url);
        }

        if (type === 'instagram') {
            // Instagram should only contain alphanumeric and underscore
            return /^[a-zA-Z0-9_]+$/.test(url);
        }

        return false;
    }

    // Public API
    return {
        sanitizeHTML: sanitizeHTML,
        sanitizeURL: sanitizeURL,
        sanitizeWhatsAppURL: sanitizeWhatsAppURL,
        sanitizeInstagramURL: sanitizeInstagramURL,
        sanitizeFormData: sanitizeFormData,
        enforceLength: enforceLength,
        isValidURLFormat: isValidURLFormat,
        LENGTH_LIMITS: LENGTH_LIMITS
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sanitization;
}
