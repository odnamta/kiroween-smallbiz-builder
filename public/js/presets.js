/**
 * Business Presets Module
 * Provides default content templates for different business types
 * Includes both normal and haunted mode content for Kiroween theme
 */

// Define presets for each business type with normal and haunted variants
const businessPresets = {
  coffee_shop: {
    default_tagline: "Coffee so dark it might wake the dead",
    default_short_description: "A mysteriously cozy café where shadows gather and coffee flows eternal. Our beans are roasted under moonlight, and our baristas have been perfecting their craft for... longer than you'd believe.",
    default_menu_items: [
      { name: "Midnight Espresso", price: "Rp 15,000" },
      { name: "Phantom Cappuccino", price: "Rp 25,000" },
      { name: "Ghostly Latte", price: "Rp 28,000" },
      { name: "Cursed Croissant", price: "Rp 18,000" },
      { name: "Witch's Cold Brew", price: "Rp 30,000" }
    ],
    normal_tagline: "Your Daily Dose of Happiness",
    normal_description: "Artisan coffee and fresh pastries in a cozy atmosphere. We serve premium coffee beans sourced from local farms."
  },
  
  bakery: {
    default_tagline: "Baked fresh daily. Some say our recipes are centuries old.",
    default_short_description: "Our ovens have been burning since before anyone can remember. Each pastry holds a secret, each bread tells a story. The aroma draws you in... and keeps you coming back.",
    default_menu_items: [
      { name: "Sourdough of Souls", price: "Rp 35,000" },
      { name: "Devil's Chocolate Cake", price: "Rp 120,000" },
      { name: "Phantom Croissant", price: "Rp 15,000" },
      { name: "Cinnamon Specter Roll", price: "Rp 20,000" },
      { name: "Haunted Honey Bread", price: "Rp 25,000" }
    ],
    normal_tagline: "Freshly Baked Every Day",
    normal_description: "Homemade breads, cakes, and pastries made with love. Using traditional recipes and quality ingredients."
  },

  barber_shop: {
    default_tagline: "A cut so sharp you'll forget who you were when you walked in",
    default_short_description: "Step into our chair and emerge transformed. Our blades are ancient, our skills timeless. Every cut tells a story, every shave reveals a new you. Walk-ins welcome... if you dare.",
    default_menu_items: [
      { name: "The Transformation", price: "Rp 50,000" },
      { name: "Beard of Shadows", price: "Rp 30,000" },
      { name: "Midnight Shave", price: "Rp 45,000" },
      { name: "Full Moon Package", price: "Rp 75,000" },
      { name: "The Resurrection", price: "Rp 100,000" }
    ],
    normal_tagline: "Where Style Meets Precision",
    normal_description: "Professional haircuts and grooming services for the modern gentleman. Walk-ins welcome."
  },
  
  food_stall: {
    default_tagline: "Food so good, you'll come back. They always come back.",
    default_short_description: "Our recipes have been passed down through generations... and perhaps beyond. Each dish is prepared with ingredients you won't find anywhere else. One taste and you'll understand why our customers never leave.",
    default_menu_items: [
      { name: "Nasi Goreng Hantu", price: "Rp 15,000" },
      { name: "Mie Ayam Misterius", price: "Rp 12,000" },
      { name: "Sate Tengah Malam", price: "Rp 18,000" },
      { name: "Es Teh Kegelapan", price: "Rp 5,000" },
      { name: "Bakso Bayangan", price: "Rp 15,000" }
    ],
    normal_tagline: "Delicious & Affordable Street Food",
    normal_description: "Authentic Indonesian street food made fresh daily. Quality meals at prices everyone can afford."
  },
  
  laundry_service: {
    default_tagline: "Your stains will vanish without a trace. No questions asked.",
    default_short_description: "We make things disappear. Stains, odors, evidence of yesterday's adventures — all gone by morning. Our methods are... unconventional, but the results speak for themselves. Trust us with your secrets.",
    default_menu_items: [
      { name: "Vanishing Wash (per kg)", price: "Rp 8,000" },
      { name: "Spectral Press (per kg)", price: "Rp 12,000" },
      { name: "Exorcism Clean (per item)", price: "Rp 25,000" },
      { name: "Midnight Express", price: "Rp 15,000" },
      { name: "The Full Cleansing", price: "Rp 50,000" }
    ],
    normal_tagline: "Clean Clothes, Fast Service",
    normal_description: "Professional laundry service with same-day turnaround. We handle your clothes with care."
  },

  photographer_creator: {
    default_tagline: "We capture what others can't see. Memories that last forever.",
    default_short_description: "Our lens sees beyond the ordinary. We capture moments that transcend time, images that reveal hidden truths. Some say our photos show more than what was there. Book a session and see for yourself.",
    default_menu_items: [
      { name: "Soul Portrait (1 hour)", price: "Rp 500,000" },
      { name: "Séance Coverage (half day)", price: "Rp 1,500,000" },
      { name: "Phantom Media Pack (10 photos)", price: "Rp 750,000" },
      { name: "Artifact Photography (per item)", price: "Rp 100,000" },
      { name: "The Eternal Session", price: "Rp 2,000,000" }
    ],
    normal_tagline: "Capturing Your Best Moments",
    normal_description: "Professional photography and content creation services. Specializing in portraits, events, and social media content."
  }
};

/**
 * Retrieve preset data for a specific business type
 * @param {string} businessType - The business type key
 * @param {string} mode - 'haunted' or 'normal' (default: 'haunted' for Kiroween)
 * @returns {Object|null} Preset object or null if not found
 */
function getPreset(businessType, mode = 'haunted') {
  const preset = businessPresets[businessType];
  if (!preset) return null;
  
  // Return haunted content by default for Kiroween theme
  if (mode === 'normal' && preset.normal_tagline) {
    return {
      default_tagline: preset.normal_tagline,
      default_short_description: preset.normal_description,
      default_menu_items: preset.default_menu_items
    };
  }
  
  return preset;
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

/**
 * Get all available business types
 * @returns {string[]} Array of business type keys
 */
function getBusinessTypes() {
  return Object.keys(businessPresets);
}

// Export functions for use in other modules
export { getPreset, hasMenuItems, getBusinessTypes, businessPresets };
