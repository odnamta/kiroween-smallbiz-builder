/**
 * Live Preview Module
 * Handles real-time preview of generated website in iframe
 * Auto-updates as user types for instant feedback
 */

(function() {
    'use strict';

    let updateTimeout = null;
    let isUpdating = false;

    /**
     * Collects form data from all input fields
     * @param {HTMLFormElement} form - The form element
     * @returns {Object} - Form data object
     */
    function collectFormData(form) {
        const formData = {
            business_name: form.business_name?.value?.trim() || 'Your Business Name',
            business_type: form.business_type?.value?.trim() || '',
            tagline: form.tagline?.value?.trim() || 'Your tagline here',
            short_description: form.short_description?.value?.trim() || 'Tell customers about your business...',
            contact_whatsapp: form.contact_whatsapp?.value?.trim() || '1234567890',
            instagram_handle: form.instagram_handle?.value?.trim() || 'yourbusiness',
            theme_choice: form.theme_choice?.value || 'kiroween',
            menu_items: []
        };

        // Collect menu items
        const menuItemNames = form.querySelectorAll('input[name="menu_item_name[]"]');
        const menuItemPrices = form.querySelectorAll('input[name="menu_item_price[]"]');

        for (let i = 0; i < menuItemNames.length; i++) {
            const name = menuItemNames[i]?.value?.trim() || '';
            const price = menuItemPrices[i]?.value?.trim() || '';
            
            if (name || price) {
                formData.menu_items.push({ 
                    name: name || 'Menu Item', 
                    price: price || 'Rp 0' 
                });
            }
        }

        // Add default menu item if none exist
        if (formData.menu_items.length === 0) {
            formData.menu_items.push({ name: 'Sample Item', price: 'Rp 25,000' });
        }

        return formData;
    }

    /**
     * Updates the preview iframe with generated website
     */
    async function updatePreview() {
        if (isUpdating) return;
        
        try {
            isUpdating = true;
            
            const form = document.getElementById('websiteForm');
            const previewFrame = document.getElementById('previewFrame');
            
            if (!form || !previewFrame) {
                console.error('Form or preview frame not found');
                return;
            }

            // Collect form data
            const formData = collectFormData(form);

            // Check if buildSiteArtifacts is available
            if (typeof window.buildSiteArtifacts === 'function') {
                try {
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

                    previewFrame.srcdoc = fullDoc;
                } catch (err) {
                    // Fallback to simple preview if buildSiteArtifacts fails
                    renderSimplePreview(previewFrame, formData);
                }
            } else {
                // Fallback to simple preview
                renderSimplePreview(previewFrame, formData);
            }

        } catch (error) {
            console.error('Error updating preview:', error);
        } finally {
            isUpdating = false;
        }
    }

    /**
     * Renders a simple preview when full generation isn't available
     */
    function renderSimplePreview(previewFrame, formData) {
        const menuItemsHtml = formData.menu_items.map(item => 
            `<li><span class="item-name">${escapeHtml(item.name)}</span><span class="item-price">${escapeHtml(item.price)}</span></li>`
        ).join('');

        const isKiroween = formData.theme_choice === 'kiroween';
        
        const simpleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
${getSimpleStyles(isKiroween)}
</style>
</head>
<body>
<header>
    <h1>${escapeHtml(formData.business_name)}</h1>
    <p class="tagline">${escapeHtml(formData.tagline)}</p>
</header>
<main>
    <section class="about">
        <h2>About Us</h2>
        <p>${escapeHtml(formData.short_description)}</p>
    </section>
    <section class="menu">
        <h2>Our Menu</h2>
        <ul class="menu-list">${menuItemsHtml}</ul>
    </section>
    <section class="contact">
        <h2>Get in Touch</h2>
        <div class="contact-links">
            <a href="#" class="whatsapp-link">WhatsApp Us</a>
            <a href="#" class="instagram-link">Follow on Instagram</a>
        </div>
    </section>
</main>
<footer>
    <p>&copy; 2025 ${escapeHtml(formData.business_name)}. All rights reserved.</p>
</footer>
</body>
</html>`;

        previewFrame.srcdoc = simpleHtml;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    function getSimpleStyles(isKiroween) {
        if (isKiroween) {
            return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
    font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
    background: #0a0a0f; 
    color: #f0f0f0; 
    padding: 1rem;
    background-image: radial-gradient(ellipse at 20% 20%, rgba(155,89,182,0.3) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, rgba(255,107,53,0.4) 0%, transparent 50%);
}
header { 
    background: linear-gradient(135deg, #12121a 0%, #050508 100%); 
    padding: 2rem; 
    text-align: center; 
    border-radius: 16px; 
    margin-bottom: 1.5rem;
    border: 2px solid #ff6b35;
    box-shadow: 0 0 40px rgba(255,107,53,0.3);
}
h1 { color: #ff6b35; font-size: 2rem; text-shadow: 0 0 20px rgba(255,107,53,0.5); }
h2 { color: #ff8c42; font-size: 1.5rem; margin-bottom: 1rem; }
.tagline { color: #a0a0b0; margin-top: 0.5rem; }
section { 
    background: linear-gradient(135deg, #12121a 0%, #050508 100%); 
    padding: 1.5rem; 
    margin-bottom: 1.5rem; 
    border-radius: 16px;
    border: 1px solid #2a2a3a;
}
.menu-list { list-style: none; }
.menu-list li { 
    display: flex; 
    justify-content: space-between; 
    padding: 1rem; 
    margin-bottom: 0.5rem;
    background: #050508;
    border-radius: 8px;
    border: 1px solid #2a2a3a;
}
.item-name { font-weight: 600; }
.item-price { color: #ff6b35; font-weight: 700; }
.contact-links { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
.contact-links a { 
    display: block; 
    padding: 1rem; 
    text-align: center; 
    border-radius: 8px; 
    text-decoration: none; 
    color: white; 
    font-weight: 600;
}
.whatsapp-link { background: linear-gradient(135deg, #25d366, #128c7e); }
.instagram-link { background: linear-gradient(135deg, #e4405f, #c13584); }
footer { 
    background: #12121a; 
    padding: 1rem; 
    text-align: center; 
    border-radius: 16px;
    border: 1px solid #2a2a3a;
}
footer p { color: #a0a0b0; font-size: 0.875rem; }
`;
        } else {
            return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Georgia, serif; background: #f8f9fa; color: #333; padding: 1rem; }
header { background: #fff; padding: 2rem; text-align: center; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
h1 { color: #2c3e50; font-size: 2rem; }
h2 { color: #34495e; font-size: 1.5rem; margin-bottom: 1rem; }
.tagline { color: #7f8c8d; margin-top: 0.5rem; font-style: italic; }
section { background: #fff; padding: 1.5rem; margin-bottom: 1.5rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.menu-list { list-style: none; }
.menu-list li { display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid #eee; }
.item-name { font-weight: 600; }
.item-price { color: #27ae60; font-weight: 700; }
.contact-links { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
.contact-links a { display: block; padding: 1rem; text-align: center; border-radius: 8px; text-decoration: none; color: white; font-weight: 600; }
.whatsapp-link { background: #25d366; }
.instagram-link { background: #e4405f; }
footer { background: #fff; padding: 1rem; text-align: center; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
footer p { color: #7f8c8d; font-size: 0.875rem; }
`;
        }
    }

    /**
     * Debounced preview update for performance
     */
    function schedulePreviewUpdate() {
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(updatePreview, 300);
    }

    /**
     * Initializes the preview functionality with auto-update
     */
    function init() {
        const form = document.getElementById('websiteForm');
        
        if (form) {
            // Auto-update on any input change
            form.addEventListener('input', schedulePreviewUpdate);
            form.addEventListener('change', schedulePreviewUpdate);
        }

        // Initial preview render
        setTimeout(updatePreview, 500);
    }

    // Expose functions globally
    if (typeof window !== 'undefined') {
        window.PreviewTest = {
            collectFormData,
            updatePreview,
            schedulePreviewUpdate
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
