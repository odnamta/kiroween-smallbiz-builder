/**
 * Live Preview Module
 * Handles real-time preview of generated website in iframe
 */

(function() {
    'use strict';

    const ERROR_MESSAGES = {
        GENERATION_FAILED: 'Preview generation failed. Please check your form inputs.'
    };

    /**
     * Collects form data from all input fields
     * @param {HTMLFormElement} form - The form element
     * @returns {Object} - Form data object
     */
    function collectFormData(form) {
        const formData = {
            business_name: form.business_name.value.trim(),
            business_type: form.business_type.value.trim(),
            tagline: form.tagline.value.trim(),
            short_description: form.short_description.value.trim(),
            contact_whatsapp: form.contact_whatsapp.value.trim(),
            instagram_handle: form.instagram_handle.value.trim(),
            theme_choice: form.theme_choice.value,
            menu_items: []
        };

        // Collect menu items
        const menuItemNames = form.querySelectorAll('input[name="menu_item_name[]"]');
        const menuItemPrices = form.querySelectorAll('input[name="menu_item_price[]"]');

        for (let i = 0; i < menuItemNames.length; i++) {
            const name = menuItemNames[i].value.trim();
            const price = menuItemPrices[i].value.trim();
            
            if (name && price) {
                formData.menu_items.push({ name, price });
            }
        }

        return formData;
    }

    /**
     * Updates the preview iframe with generated website
     */
    async function updatePreview() {
        try {
            const form = document.getElementById('websiteForm');
            const previewFrame = document.getElementById('previewFrame');
            
            if (!form || !previewFrame) {
                console.error('Form or preview frame not found');
                return;
            }

            // Collect form data
            const formData = collectFormData(form);

            // Check if buildSiteArtifacts is available
            if (typeof window.buildSiteArtifacts !== 'function') {
                console.error('buildSiteArtifacts function not available');
                return;
            }

            // Build site artifacts
            const artifacts = await window.buildSiteArtifacts(formData);

            // Build full HTML document
            const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${artifacts.css}</style>
</head>
<body>
${artifacts.html}
</body>
</html>`;

            // Update iframe
            previewFrame.srcdoc = fullDoc;

        } catch (error) {
            console.error('Error updating preview:', error);
            
            // Try to show error message if showMessage function is available
            if (typeof showMessage === 'function') {
                showMessage(ERROR_MESSAGES.GENERATION_FAILED, 'error');
            }
        }
    }

    /**
     * Initializes the preview functionality
     */
    function init() {
        const updateBtn = document.getElementById('updatePreviewBtn');
        
        if (updateBtn) {
            updateBtn.addEventListener('click', updatePreview);
        } else {
            console.error('Update preview button not found');
        }
    }

    // Expose internal functions for testing purposes
    if (typeof window !== 'undefined') {
        window.PreviewTest = {
            collectFormData,
            updatePreview
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
