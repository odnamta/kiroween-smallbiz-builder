/**
 * Form Controller Module
 * Manages form interactions including preset application
 */

import { getPreset, hasMenuItems } from './presets.js';

/**
 * Global function to apply preset to form
 * Called directly from the "Use Preset" button onclick
 */
window.applyPresetToForm = function() {
  console.log('applyPresetToForm called');
  
  // Get selected business type using exact ID from index.html
  const businessTypeSelect = document.getElementById('business_type');
  const businessType = businessTypeSelect ? businessTypeSelect.value : '';
  
  console.log('Selected type:', businessType);
  
  if (!businessType) {
    alert('Please select a business type first');
    return;
  }
  
  // Get preset data
  const preset = getPreset(businessType);
  console.log('Preset object:', preset);
  
  if (!preset) {
    alert('No preset available for this business type');
    return;
  }
  
  // Populate tagline using exact ID from index.html
  const taglineField = document.getElementById('tagline');
  if (taglineField && preset.default_tagline) {
    taglineField.value = preset.default_tagline;
    console.log('Tagline set to:', preset.default_tagline);
  } else {
    console.error('Tagline field not found or preset has no tagline');
  }
  
  // Populate description using exact ID from index.html
  const descriptionField = document.getElementById('short_description');
  if (descriptionField && preset.default_short_description) {
    descriptionField.value = preset.default_short_description;
    console.log('Description set to:', preset.default_short_description);
  } else {
    console.error('Description field not found or preset has no description');
  }
  
  // Clear and repopulate menu items using exact ID from index.html
  if (preset.default_menu_items && preset.default_menu_items.length > 0) {
    console.log('Populating menu items:', preset.default_menu_items);
    
    // Clear existing menu items
    const container = document.getElementById('menuItemsContainer');
    if (container) {
      console.log('Menu container found, clearing existing items');
      container.innerHTML = '';
      
      // Add preset menu items
      preset.default_menu_items.forEach((item, index) => {
        console.log(`Creating menu item ${index}:`, item);
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-item-index', index);
        
        menuItem.innerHTML = `
          <div class="menu-item-fields">
            <div class="menu-item-field">
              <label for="menu_item_name_${index}">Item Name <span class="required">*</span></label>
              <input type="text" id="menu_item_name_${index}" name="menu_item_name[]" required maxlength="100" placeholder="e.g., Espresso" value="${escapeHtmlSimple(item.name)}">
              <div class="error-message">Menu item name is required</div>
            </div>
            <div class="menu-item-field">
              <label for="menu_item_price_${index}">Price <span class="required">*</span></label>
              <input type="text" id="menu_item_price_${index}" name="menu_item_price[]" required maxlength="20" placeholder="e.g., $3.50" value="${escapeHtmlSimple(item.price)}">
              <div class="error-message">Menu item price is required</div>
            </div>
          </div>
          <button type="button" class="btn btn-remove" onclick="removeMenuItem(${index})">Remove</button>
        `;
        
        container.appendChild(menuItem);
      });
      
      console.log('Menu items added to container');
      
      // Update global menu item counter
      if (typeof window.menuItemCount !== 'undefined') {
        window.menuItemCount = preset.default_menu_items.length;
        console.log('Updated menuItemCount to:', window.menuItemCount);
      }
      
      // Update remove button visibility
      if (typeof window.updateRemoveButtons === 'function') {
        window.updateRemoveButtons();
        console.log('Updated remove buttons');
      }
      
      // Reattach validation listeners
      if (typeof window.attachValidationListeners === 'function') {
        window.attachValidationListeners();
        console.log('Reattached validation listeners');
      }
    } else {
      console.error('Menu container not found!');
    }
  }
  
  // Show success message
  showFeedbackMessage('Preset applied successfully! You can customize these fields.', 'success');
  
  console.log('Preset applied successfully');
};

/**
 * Simple HTML escape function
 */
function escapeHtmlSimple(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}



/**
 * Show feedback message to user
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFeedbackMessage(message, type) {
  // Try to find existing feedback container
  let feedbackContainer = document.getElementById('presetFeedback');
  
  // If not found, create one
  if (!feedbackContainer) {
    feedbackContainer = document.createElement('div');
    feedbackContainer.id = 'presetFeedback';
    feedbackContainer.style.cssText = 'padding: 1rem; border-radius: 6px; margin-top: 1rem; font-weight: 500;';
    
    // Insert after the "Use Preset" button
    const presetButton = document.getElementById('usePresetButton');
    if (presetButton && presetButton.parentNode) {
      presetButton.parentNode.insertBefore(feedbackContainer, presetButton.nextSibling);
    } else {
      // Fallback: insert after business type field
      const businessTypeGroup = document.getElementById('business_type')?.closest('.form-group');
      if (businessTypeGroup && businessTypeGroup.parentNode) {
        businessTypeGroup.parentNode.insertBefore(feedbackContainer, businessTypeGroup.nextSibling);
      }
    }
  }
  
  // Set message and styling
  feedbackContainer.textContent = message;
  feedbackContainer.style.display = 'block';
  
  if (type === 'success') {
    feedbackContainer.style.background = '#d4edda';
    feedbackContainer.style.color = '#155724';
    feedbackContainer.style.border = '1px solid #c3e6cb';
  } else if (type === 'error') {
    feedbackContainer.style.background = '#f8d7da';
    feedbackContainer.style.color = '#721c24';
    feedbackContainer.style.border = '1px solid #f5c6cb';
  }
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    feedbackContainer.style.display = 'none';
  }, 5000);
}



/**
 * Handle business type dropdown changes
 * Updates helper text based on whether business type has menu items
 */
function handleBusinessTypeChange() {
  const businessTypeSelect = document.getElementById('business_type');
  const businessType = businessTypeSelect.value;
  
  if (!businessType) return;
  
  // Update helper text based on business type
  const menuSection = document.querySelector('.menu-items-section');
  if (!menuSection) return;
  
  let helperText = menuSection.querySelector('.menu-helper-text');
  
  // Create helper text element if it doesn't exist
  if (!helperText) {
    helperText = document.createElement('p');
    helperText.className = 'menu-helper-text';
    helperText.style.cssText = 'color: #666; font-size: 0.9rem; margin-bottom: 1rem;';
    
    const heading = menuSection.querySelector('h2');
    if (heading && heading.parentNode) {
      heading.parentNode.insertBefore(helperText, heading.nextSibling);
    }
  }
  
  // Set appropriate helper text
  if (hasMenuItems(businessType)) {
    helperText.textContent = 'Add your menu items below';
  } else {
    helperText.textContent = 'Optional: Add service items or packages if desired';
  }
  
  helperText.style.display = 'block';
}

/**
 * Initialize form controller
 * Sets up event listeners and initial state
 */
function initializeFormController() {
  console.log('Initializing form controller...');
  
  // Note: Preset button now uses inline onclick="applyPresetToForm()"
  // No need to attach event listener here
  
  // Add event listener for business type changes
  const businessTypeSelect = document.getElementById('business_type');
  if (businessTypeSelect) {
    console.log('Business type select found, attaching event listener');
    businessTypeSelect.addEventListener('change', handleBusinessTypeChange);
  } else {
    console.error('Business type select not found!');
  }
}

// Export functions for use in other modules
export {
  handleBusinessTypeChange,
  initializeFormController
};
