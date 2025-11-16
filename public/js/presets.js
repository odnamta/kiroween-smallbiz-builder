/**
 * Business Presets Module
 * Provides default content templates for different business types
 */

// Define presets for each business type
const businessPresets = {
  coffee_shop: {
    default_tagline: "Your Daily Dose of Happiness",
    default_short_description: "Artisan coffee and fresh pastries in a cozy atmosphere. We serve premium coffee beans sourced from local farms.",
    default_menu_items: [
      { name: "Espresso", price: "Rp 15,000" },
      { name: "Cappuccino", price: "Rp 25,000" },
      { name: "Latte", price: "Rp 28,000" },
      { name: "Croissant", price: "Rp 18,000" }
    ]
  },
  
  bakery: {
    default_tagline: "Freshly Baked Every Day",
    default_short_description: "Homemade breads, cakes, and pastries made with love. Using traditional recipes and quality ingredients.",
    default_menu_items: [
      { name: "Sourdough Bread", price: "Rp 35,000" },
      { name: "Chocolate Cake", price: "Rp 120,000" },
      { name: "Croissant", price: "Rp 15,000" },
      { name: "Cinnamon Roll", price: "Rp 20,000" }
    ]
  },
  
  barber_shop: {
    default_tagline: "Where Style Meets Precision",
    default_short_description: "Professional haircuts and grooming services for the modern gentleman. Walk-ins welcome.",
    default_menu_items: [
      { name: "Classic Haircut", price: "Rp 50,000" },
      { name: "Beard Trim", price: "Rp 30,000" },
      { name: "Hot Towel Shave", price: "Rp 45,000" },
      { name: "Hair + Beard Combo", price: "Rp 75,000" }
    ]
  },
  
  food_stall: {
    default_tagline: "Delicious & Affordable Street Food",
    default_short_description: "Authentic Indonesian street food made fresh daily. Quality meals at prices everyone can afford. Perfect for quick lunch or dinner.",
    default_menu_items: [
      { name: "Nasi Goreng", price: "Rp 15,000" },
      { name: "Mie Ayam", price: "Rp 12,000" },
      { name: "Sate Ayam", price: "Rp 18,000" },
      { name: "Es Teh Manis", price: "Rp 5,000" }
    ]
  },
  
  laundry_service: {
    default_tagline: "Clean Clothes, Fast Service",
    default_short_description: "Professional laundry service with same-day turnaround. We handle your clothes with care, using quality detergents for fresh, clean results every time.",
    default_menu_items: [
      { name: "Wash & Fold (per kg)", price: "Rp 8,000" },
      { name: "Wash & Iron (per kg)", price: "Rp 12,000" },
      { name: "Dry Clean (per item)", price: "Rp 25,000" },
      { name: "Express Service", price: "Rp 15,000" }
    ]
  },
  
  photographer_creator: {
    default_tagline: "Capturing Your Best Moments",
    default_short_description: "Professional photography and content creation services. Specializing in portraits, events, and social media content. Let's create something amazing together.",
    default_menu_items: [
      { name: "Portrait Session (1 hour)", price: "Rp 500,000" },
      { name: "Event Coverage (half day)", price: "Rp 1,500,000" },
      { name: "Social Media Package (10 photos)", price: "Rp 750,000" },
      { name: "Product Photography (per item)", price: "Rp 100,000" }
    ]
  }
};

/**
 * Retrieve preset data for a specific business type
 * @param {string} businessType - The business type key
 * @returns {Object|null} Preset object or null if not found
 */
function getPreset(businessType) {
  return businessPresets[businessType] || null;
}

/**
 * Check if a business type has menu items in its preset
 * @param {string} businessType - The business type key
 * @returns {boolean} True if preset has menu items, false otherwise
 */
function hasMenuItems(businessType) {
  const preset = getPreset(businessType);
  return preset && preset.default_menu_items && preset.default_menu_items.length > 0;
}

// Export functions for use in other modules
export { getPreset, hasMenuItems, businessPresets };
