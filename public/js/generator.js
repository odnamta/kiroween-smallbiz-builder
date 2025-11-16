/**
 * Main Generator Script
 * Orchestrates the website generation process
 * Coordinates form submission, validation, template processing, and file creation
 */

(function() {
    'use strict';

    // Error messages
    const ERROR_MESSAGES = {
        TEMPLATE_LOAD_FAILED: 'Unable to load template. Please refresh and try again.',
        THEME_LOAD_FAILED: 'Unable to load theme. Please refresh and try again.',
        GENERATION_FAILED: 'Website generation failed. Please try again.',
        BROWSER_NOT_SUPPORTED: 'Your browser does not support file downloads. Please use a modern browser like Chrome, Firefox, or Safari.'
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
     * Loads the base HTML template
     * @returns {Promise<string>} - Promise resolving to template content
     */
    async function loadTemplate() {
        try {
            const response = await fetch('templates/base-template.html');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const template = await response.text();
            return template;
        } catch (error) {
            console.error('Error loading template:', error);
            throw new Error(ERROR_MESSAGES.TEMPLATE_LOAD_FAILED);
        }
    }

    /**
     * Loads the CSS theme file based on theme choice
     * @param {string} themeChoice - The selected theme ('classic' or 'kiroween')
     * @returns {Promise<string>} - Promise resolving to CSS content
     */
    async function generateCSS(themeChoice) {
        try {
            const themeFile = themeChoice === 'kiroween' ? 'kiroween.css' : 'classic.css';
            const response = await fetch(`themes/${themeFile}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const css = await response.text();
            return css;
        } catch (error) {
            console.error('Error loading theme:', error);
            throw new Error(ERROR_MESSAGES.THEME_LOAD_FAILED);
        }
    }

    /**
     * Injects user data into the template using the template engine
     * @param {string} template - The HTML template
     * @param {Object} data - The sanitized form data
     * @returns {string} - Processed HTML with data injected
     */
    function injectData(template, data) {
        try {
            return parseTemplate(template, data);
        } catch (error) {
            console.error('Error injecting data into template:', error);
            throw new Error('Failed to process template with your data.');
        }
    }

    /**
     * Creates and downloads all output files
     * @param {string} html - The generated HTML content
     * @param {string} css - The theme CSS content
     * @param {Array} menuData - The menu items data
     * @param {string} deploymentInstructions - The deployment instructions text
     */
    function createOutputFiles(html, css, menuData, deploymentInstructions) {
        try {
            // Create and download HTML file
            createHTMLFile(html, 'index.html');
            
            // Create and download CSS file
            createCSSFile(css, 'styles.css');
            
            // Create and download JSON file
            createJSONFile({ menu_items: menuData }, 'menu.json');
            
            // Create and download deployment instructions text file
            createTextFile(deploymentInstructions, 'deployment-instructions.txt');
        } catch (error) {
            console.error('Error creating output files:', error);
            throw new Error(ERROR_MESSAGES.BROWSER_NOT_SUPPORTED);
        }
    }

    /**
     * Displays a message to the user
     * @param {string} message - The message to display
     * @param {string} type - The message type ('success' or 'error')
     */
    function showMessage(message, type = 'success') {
        const messageElement = document.getElementById('generationMessage');
        
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `message ${type}`;
            messageElement.style.display = 'block';
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 5000);
            }
        }
    }

    /**
     * Main website generation function
     * Coordinates all generation steps
     * @param {Object} formData - The collected and validated form data
     */
    async function generateWebsite(formData) {
        try {
            showMessage('Generating your website...', 'success');
            
            // Sanitize form data
            const sanitizedData = Sanitization.sanitizeFormData(formData);
            
            // Load template and theme in parallel
            const [template, css] = await Promise.all([
                loadTemplate(),
                generateCSS(sanitizedData.theme_choice)
            ]);
            
            // Inject data into template
            const generatedHTML = injectData(template, sanitizedData);
            
            // Generate deployment instructions
            const deploymentInstructions = createDeploymentInstructions();
            
            // Create and download files
            createOutputFiles(generatedHTML, css, sanitizedData.menu_items, deploymentInstructions);
            
            // Show success message
            showMessage('✓ Website generated successfully! Your files are downloading now (4 files total).', 'success');
            
        } catch (error) {
            console.error('Generation error:', error);
            showMessage(error.message || ERROR_MESSAGES.GENERATION_FAILED, 'error');
        }
    }

    /**
     * Handles form submission event
     * @param {Event} event - The form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        
        // Validate form
        if (!Validation.validateForm(form)) {
            showMessage('Please fix the errors in the form before generating your website.', 'error');
            return;
        }
        
        // Collect form data
        const formData = collectFormData(form);
        
        // Generate website
        generateWebsite(formData);
    }

    /**
     * Initializes the generator by attaching event listeners
     */
    function init() {
        const form = document.getElementById('websiteForm');
        
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        } else {
            console.error('Website form not found');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
