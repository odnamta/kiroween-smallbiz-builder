/**
 * AI-Style Helper Functions
 * Generates taglines and descriptions based on business type
 * All logic runs in the browser - no network calls
 */

(function() {
    'use strict';

    /**
     * Gets current form data using the existing collectFormData function
     * @returns {Object|null} - Form data object or null if unavailable
     */
    function getCurrentFormData() {
        const formEl = document.getElementById('websiteForm');
        if (!formEl) {
            console.error('Form element not found');
            return null;
        }

        // Collect form data manually since collectFormData is in generator.js scope
        const formData = {
            business_name: formEl.business_name?.value?.trim() || '',
            business_type: formEl.business_type?.value?.trim() || '',
            tagline: formEl.tagline?.value?.trim() || '',
            short_description: formEl.short_description?.value?.trim() || '',
            contact_whatsapp: formEl.contact_whatsapp?.value?.trim() || '',
            instagram_handle: formEl.instagram_handle?.value?.trim() || '',
            theme_choice: formEl.theme_choice?.value || 'classic',
            menu_items: []
        };

        return formData;
    }

    /**
     * Gets the current tone mode from the UI
     * @returns {string} - 'normal' or 'haunted'
     */
    function getToneMode() {
        const select = document.getElementById('toneMode');
        if (!select) return 'normal';
        const value = (select.value || '').toLowerCase();
        return value === 'haunted' ? 'haunted' : 'normal';
    }

    /**
     * Generates a tagline based on business type and tone mode
     * @param {Object} formData - The form data object
     * @param {string} toneMode - 'normal' or 'haunted'
     * @returns {string|null} - Generated tagline or null if business type is missing
     */
    function generateTaglineFor(formData, toneMode = 'normal') {
        if (!formData || !formData.business_type) {
            return null;
        }

        const type = formData.business_type;

        // Haunted Mode taglines - playful, mysterious, business-appropriate
        if (toneMode === 'haunted') {
            const hauntedTaglines = {
                coffee_shop: [
                    'Coffee So Dark It Might Wake the Dead',
                    'Brewed for the Living, Loved by All',
                    'Where Every Cup Holds a Secret',
                    'Coffee That Haunts Your Dreams'
                ],
                bakery: [
                    'Baked Fresh Daily. Some Say Our Recipes Are Centuries Old',
                    'Treats So Good, They\'re Almost Supernatural',
                    'Where Ancient Recipes Meet Modern Cravings',
                    'Mysteriously Delicious Since Forever'
                ],
                barber_shop: [
                    'A Cut So Sharp You\'ll Forget Who You Were',
                    'Where Your Old Self Disappears',
                    'Transformations That Defy Explanation',
                    'Sharp Cuts, Darker Vibes'
                ],
                food_stall: [
                    'Food So Good, You\'ll Come Back. They Always Come Back',
                    'Flavors That Possess Your Taste Buds',
                    'Street Food with an Otherworldly Twist',
                    'One Bite and You\'re Under Our Spell'
                ],
                laundry_service: [
                    'Your Stains Will Vanish Without a Trace. No Questions Asked',
                    'We Make Problems Disappear',
                    'Clean So Deep, It\'s Almost Supernatural',
                    'Stains Vanish. Memories Fade. Clothes Remain'
                ],
                photographer_creator: [
                    'We Capture What Others Can\'t See',
                    'Memories That Last Forever. Literally',
                    'Where Moments Become Eternal',
                    'Capturing Souls, One Frame at a Time'
                ]
            };

            const templates = hauntedTaglines[type] || ['So Good It\'s Almost Unnerving'];
            const randomIndex = Math.floor(Math.random() * templates.length);
            return templates[randomIndex];
        }

        // Normal Mode taglines (existing)
        const normalTaglines = {
            coffee_shop: [
                'Your Daily Dose of Happiness',
                'Where Every Cup Tells a Story',
                'Brewing Moments, One Cup at a Time',
                'Coffee That Warms Your Soul'
            ],
            bakery: [
                'Fresh-Baked Goodness Every Day',
                'Where Every Bite Feels Like Home',
                'Handcrafted with Love, Baked to Perfection',
                'Sweet Moments, Fresh Daily'
            ],
            barber_shop: [
                'Sharp Cuts, Smooth Fades',
                'Where Style Meets Precision',
                'Your Look, Our Passion',
                'Classic Cuts, Modern Style'
            ],
            food_stall: [
                'Street Flavors, Big Smiles',
                'Authentic Taste, Affordable Price',
                'Where Flavor Meets Tradition',
                'Delicious Food, Happy Hearts'
            ],
            laundry_service: [
                'Fresh, Clean, Ready to Wear',
                'Your Clothes, Our Care',
                'Spotless Service, Every Time',
                'Clean Clothes, Happy Life'
            ],
            photographer_creator: [
                'Capturing Your Best Moments',
                'Where Memories Become Art',
                'Your Story, Beautifully Told',
                'Creating Timeless Memories'
            ]
        };

        const templates = normalTaglines[type] || ['Quality Service, Every Time'];
        const randomIndex = Math.floor(Math.random() * templates.length);
        return templates[randomIndex];
    }

    /**
     * Generates a description based on business type, name, and tone mode
     * @param {Object} formData - The form data object
     * @param {string} toneMode - 'normal' or 'haunted'
     * @returns {string|null} - Generated description or null if business type is missing
     */
    function generateDescriptionFor(formData, toneMode = 'normal') {
        if (!formData || !formData.business_type) {
            return null;
        }

        const businessName = formData.business_name || 'our business';
        const type = formData.business_type;

        // Haunted Mode descriptions - mysterious but professional
        if (toneMode === 'haunted') {
            const hauntedDescriptions = {
                coffee_shop: `${businessName} serves coffee so dark and rich, some say it could wake the dead. Our beans are roasted to perfection using methods passed down through mysterious generations. Step into our dimly lit space where shadows dance and every cup tells a story you won't soon forget. Whether you're seeking your morning ritual or an evening escape, we're here to serve the living with drinks that haunt your dreams.`,
                
                bakery: `At ${businessName}, we bake using recipes that have survived centuries, though no one quite remembers where they came from. Each morning before dawn, our ovens come alive with an otherworldly warmth, producing breads and pastries that seem almost too perfect. Some customers swear they can taste whispers of the past in every bite. Visit us if you dare to experience baked goods that transcend the ordinary.`,
                
                barber_shop: `${businessName} is where transformations happen that can't quite be explained. Our barbers wield their tools with an precision that borders on supernatural, giving you a look so sharp you might not recognize yourself in the mirror. Step into our chair and let us work our dark magic. You'll leave looking better than you ever imagined, though you may forget who you were when you walked in.`,
                
                food_stall: `${businessName} serves street food with flavors so intense, they seem to possess your taste buds. Our recipes have been passed down through generations, each one adding their own mysterious touch. Customers always come back, drawn by something they can't quite explain. One bite and you'll understand why people say our food casts a spell. Come taste what keeps them returning, night after night.`,
                
                laundry_service: `${businessName} makes stains disappear without a trace. No questions asked. Our cleaning methods are so effective, some say they border on supernatural. Bring us your darkest secrets—we mean stains—and watch them vanish completely. We handle every garment with care that's almost obsessive, ensuring your clothes return cleaner than you thought possible. Fast, discreet, and mysteriously effective.`,
                
                photographer_creator: `${businessName} captures what others cannot see. Our lenses reveal hidden beauty, frozen moments, and memories that will last forever—literally. We specialize in portraits that seem to capture the soul, events where every shadow tells a story, and content that haunts viewers in the best way. Let us preserve your moments in ways that transcend ordinary photography. Some say our photos have a life of their own.`
            };

            return hauntedDescriptions[type] || `Welcome to ${businessName}, where we provide service so exceptional it's almost unnerving. Our methods may be mysterious, but our results speak for themselves. Visit us and discover why customers keep coming back, drawn by something they can't quite explain.`;
        }

        // Normal Mode descriptions (existing)
        const normalDescriptions = {
            coffee_shop: `Welcome to ${businessName}, your neighborhood coffee destination. We serve premium coffee and delicious pastries in a warm, inviting atmosphere. Whether you're starting your day or taking a break, we're here to make every moment special with quality drinks and friendly service.`,
            
            bakery: `At ${businessName}, we believe in the magic of fresh-baked goods. Every morning, we craft our breads, pastries, and cakes using traditional recipes and the finest ingredients. From classic favorites to creative new treats, everything is made with love and baked to perfection just for you.`,
            
            barber_shop: `${businessName} is your destination for premium grooming services. Our skilled barbers combine classic techniques with modern styles to give you the perfect look. From sharp haircuts to smooth shaves, we take pride in delivering exceptional service in a comfortable, welcoming environment.`,
            
            food_stall: `${businessName} brings you authentic street food flavors at prices everyone can enjoy. We prepare each dish fresh with quality ingredients and traditional recipes passed down through generations. Come taste the difference that passion and experience make in every bite.`,
            
            laundry_service: `${businessName} takes the hassle out of laundry day. We provide professional cleaning services with careful attention to every garment. From everyday clothes to special items, we treat your laundry with the care it deserves. Fast, reliable, and affordable service you can trust.`,
            
            photographer_creator: `${businessName} specializes in capturing life's precious moments. Whether it's portraits, events, or creative content, we bring artistic vision and technical expertise to every project. Let us help you preserve your memories and tell your story through beautiful, professional photography.`
        };

        return normalDescriptions[type] || `Welcome to ${businessName}. We're dedicated to providing excellent service and quality products to all our customers. Visit us today and experience the difference that passion and expertise make.`;
    }

    /**
     * Generates menu items based on business type
     * @param {Object} formData - The form data object
     * @returns {Array} - Array of menu item objects with name and price, or empty array
     */
    function generateMenuItemsFor(formData) {
        if (!formData || !formData.business_type) {
            return [];
        }

        const type = formData.business_type;

        // Template menu items based on business type
        const menuTemplates = {
            coffee_shop: [
                { name: 'Espresso', price: 'Rp 25,000' },
                { name: 'Cappuccino', price: 'Rp 30,000' },
                { name: 'Latte', price: 'Rp 32,000' },
                { name: 'Americano', price: 'Rp 28,000' },
                { name: 'Croissant', price: 'Rp 22,000' },
                { name: 'Chocolate Muffin', price: 'Rp 20,000' }
            ],
            bakery: [
                { name: 'Butter Croissant', price: 'Rp 20,000' },
                { name: 'Cinnamon Roll', price: 'Rp 24,000' },
                { name: 'Chocolate Cake Slice', price: 'Rp 30,000' },
                { name: 'Sourdough Bread', price: 'Rp 35,000' },
                { name: 'Blueberry Muffin', price: 'Rp 22,000' },
                { name: 'Cheese Danish', price: 'Rp 26,000' }
            ],
            barber_shop: [
                { name: 'Regular Cut', price: 'Rp 40,000' },
                { name: 'Fade Cut', price: 'Rp 50,000' },
                { name: 'Beard Trim', price: 'Rp 30,000' },
                { name: 'Hot Towel Shave', price: 'Rp 45,000' },
                { name: 'Hair Coloring', price: 'Rp 150,000' }
            ],
            food_stall: [
                { name: 'Nasi Goreng Spesial', price: 'Rp 25,000' },
                { name: 'Mie Goreng Ayam', price: 'Rp 23,000' },
                { name: 'Ayam Bakar', price: 'Rp 30,000' },
                { name: 'Sate Ayam (10 tusuk)', price: 'Rp 28,000' },
                { name: 'Es Teh Manis', price: 'Rp 8,000' },
                { name: 'Es Jeruk', price: 'Rp 10,000' }
            ],
            laundry_service: [
                { name: 'Wash & Fold (per kg)', price: 'Rp 10,000' },
                { name: 'Express Service (per kg)', price: 'Rp 15,000' },
                { name: 'Dry Cleaning', price: 'Rp 35,000' },
                { name: 'Ironing Only (per piece)', price: 'Rp 5,000' },
                { name: 'Bedding & Curtains', price: 'Rp 50,000' }
            ],
            photographer_creator: [
                { name: 'Portrait Session (1 hour)', price: 'Rp 500,000' },
                { name: 'Event Coverage (3 hours)', price: 'Rp 1,500,000' },
                { name: 'Edited Photos Package', price: 'Rp 750,000' },
                { name: 'Product Photography', price: 'Rp 800,000' },
                { name: 'Social Media Content', price: 'Rp 600,000' }
            ]
        };

        return menuTemplates[type] || [];
    }

    /**
     * Initializes the AI helper buttons
     */
    function init() {
        const autoTaglineBtn = document.getElementById('autoTaglineBtn');
        const autoDescriptionBtn = document.getElementById('autoDescriptionBtn');
        const taglineInput = document.getElementById('tagline');
        const descriptionTextarea = document.getElementById('short_description');

        // Wire up Auto Tagline button
        if (autoTaglineBtn && taglineInput) {
            autoTaglineBtn.addEventListener('click', () => {
                const formData = getCurrentFormData();
                if (!formData) {
                    console.error('Could not get form data');
                    return;
                }

                const toneMode = getToneMode();
                const nextTagline = generateTaglineFor(formData, toneMode);
                if (!nextTagline) {
                    // Try to show message if available
                    if (typeof showMessage === 'function') {
                        showMessage('Please select a business type first so I can suggest a tagline.', 'error');
                    } else {
                        alert('Please select a business type first.');
                    }
                    return;
                }

                taglineInput.value = nextTagline;
                
                // Clear any validation errors
                const formGroup = taglineInput.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                }
            });
        }

        // Wire up Auto Description button
        if (autoDescriptionBtn && descriptionTextarea) {
            autoDescriptionBtn.addEventListener('click', () => {
                const formData = getCurrentFormData();
                if (!formData) {
                    console.error('Could not get form data');
                    return;
                }

                const toneMode = getToneMode();
                const nextDescription = generateDescriptionFor(formData, toneMode);
                if (!nextDescription) {
                    // Try to show message if available
                    if (typeof showMessage === 'function') {
                        showMessage('Please select a business type first so I can suggest a description.', 'error');
                    } else {
                        alert('Please select a business type first.');
                    }
                    return;
                }

                descriptionTextarea.value = nextDescription;
                
                // Clear any validation errors
                const formGroup = descriptionTextarea.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                }
            });
        }

        // Wire up Auto Menu Items button
        const autoMenuBtn = document.getElementById('autoMenuBtn');
        const menuContainer = document.getElementById('menuItemsContainer');
        
        if (autoMenuBtn && menuContainer) {
            autoMenuBtn.addEventListener('click', () => {
                const formData = getCurrentFormData();
                if (!formData) {
                    console.error('Could not get form data');
                    return;
                }

                const generatedItems = generateMenuItemsFor(formData);
                if (!generatedItems || generatedItems.length === 0) {
                    // Try to show message if available
                    if (typeof showMessage === 'function') {
                        showMessage('Please select a business type first so I can suggest menu items.', 'error');
                    } else {
                        alert('Please select a business type first.');
                    }
                    return;
                }

                // Clear existing menu items
                menuContainer.innerHTML = '';

                // Reset the global counter if it exists
                if (typeof window.menuItemCount !== 'undefined') {
                    window.menuItemCount = 0;
                }

                // Add each generated menu item
                generatedItems.forEach((item, index) => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    menuItem.setAttribute('data-item-index', index);
                    
                    // Escape HTML to prevent XSS
                    const escapeName = item.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                    const escapePrice = item.price.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                    
                    menuItem.innerHTML = `
                        <div class="menu-item-fields">
                            <div class="menu-item-field">
                                <label for="menu_item_name_${index}">Item Name <span class="required">*</span></label>
                                <input type="text" id="menu_item_name_${index}" name="menu_item_name[]" required maxlength="100" placeholder="e.g., Espresso" value="${escapeName}">
                                <div class="error-message">Menu item name is required</div>
                            </div>
                            <div class="menu-item-field">
                                <label for="menu_item_price_${index}">Price <span class="required">*</span></label>
                                <input type="text" id="menu_item_price_${index}" name="menu_item_price[]" required maxlength="20" placeholder="e.g., $3.50" value="${escapePrice}">
                                <div class="error-message">Menu item price is required</div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-remove" onclick="removeMenuItem(${index})">Remove</button>
                    `;
                    
                    menuContainer.appendChild(menuItem);
                });

                // Update the global counter
                if (typeof window.menuItemCount !== 'undefined') {
                    window.menuItemCount = generatedItems.length;
                }

                // Update remove buttons visibility
                if (typeof window.updateRemoveButtons === 'function') {
                    window.updateRemoveButtons();
                }

                // Reattach validation listeners
                if (typeof window.attachValidationListeners === 'function') {
                    window.attachValidationListeners();
                }

                // Show success message
                const businessTypeLabel = {
                    coffee_shop: 'Coffee Shop',
                    bakery: 'Bakery',
                    barber_shop: 'Barber Shop',
                    food_stall: 'Food Stall',
                    laundry_service: 'Laundry Service',
                    photographer_creator: 'Photographer/Creator'
                };
                const label = businessTypeLabel[formData.business_type] || 'business';
                
                if (typeof showMessage === 'function') {
                    showMessage(`✓ Generated ${generatedItems.length} starter menu items for your ${label}.`, 'success');
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export functions to window for external access if needed
    if (typeof window !== 'undefined') {
        window.AIHelpers = {
            getCurrentFormData,
            getToneMode,
            generateTaglineFor,
            generateDescriptionFor,
            generateMenuItemsFor
        };
    }

})();
