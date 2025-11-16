/**
 * Template Engine Module
 * Processes HTML templates with dynamic data injection
 * Supports simple placeholders and array loops
 * Note: Assumes Sanitization module is loaded for sanitizeHTML function
 */

/**
 * Replaces simple {{placeholder}} syntax with actual data
 * @param {string} template - Template string with placeholders
 * @param {Object} data - Data object with values to inject
 * @returns {string} - Template with placeholders replaced
 * 
 * NOTE: Data is expected to be pre-sanitized by sanitization.js
 * We do NOT sanitize here to avoid double-escaping
 */
function replacePlaceholders(template, data) {
  let result = template;
  
  // Find all {{placeholder}} patterns
  const placeholderRegex = /\{\{([^}]+)\}\}/g;
  
  result = result.replace(placeholderRegex, (match, key) => {
    const trimmedKey = key.trim();
    
    // Get value from data object
    const value = data[trimmedKey];
    
    // Return value directly (already sanitized) or empty string if not found
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    return '';
  });
  
  return result;
}

/**
 * Processes loop sections for array data (e.g., menu items)
 * @param {string} template - Template string with loop sections
 * @param {Object} data - Data object containing arrays
 * @returns {string} - Template with loops processed
 */
function processLoop(template, data) {
  let result = template;
  
  // Find all {{#arrayName}} ... {{/arrayName}} patterns
  const loopRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  
  result = result.replace(loopRegex, (match, arrayName, loopContent) => {
    const arrayData = data[arrayName];
    
    // If array doesn't exist or is empty, return empty string
    if (!Array.isArray(arrayData) || arrayData.length === 0) {
      return '';
    }
    
    // Process each item in the array
    const processedItems = arrayData.map(item => {
      // Replace placeholders within the loop content
      return replacePlaceholders(loopContent, item);
    });
    
    return processedItems.join('');
  });
  
  return result;
}

/**
 * Processes conditional sections based on array emptiness
 * @param {string} template - Template string with conditional sections
 * @param {Object} data - Data object containing arrays
 * @returns {string} - Template with conditionals processed
 */
function processConditionals(template, data) {
  let result = template;
  
  // Find all {{?empty:arrayName}} ... {{/empty:arrayName}} patterns
  const emptyRegex = /\{\{\?empty:(\w+)\}\}([\s\S]*?)\{\{\/empty:\1\}\}/g;
  
  result = result.replace(emptyRegex, (match, arrayName, conditionalContent) => {
    const arrayData = data[arrayName];
    
    // Show content only if array is empty or doesn't exist
    if (!Array.isArray(arrayData) || arrayData.length === 0) {
      return replacePlaceholders(conditionalContent, data);
    }
    
    return '';
  });
  
  // Find all {{?hasItems:arrayName}} ... {{/hasItems:arrayName}} patterns
  const hasItemsRegex = /\{\{\?hasItems:(\w+)\}\}([\s\S]*?)\{\{\/hasItems:\1\}\}/g;
  
  result = result.replace(hasItemsRegex, (match, arrayName, conditionalContent) => {
    const arrayData = data[arrayName];
    
    // Show content only if array has items
    if (Array.isArray(arrayData) && arrayData.length > 0) {
      return conditionalContent;
    }
    
    return '';
  });
  
  return result;
}

/**
 * Main template parsing function
 * Processes template with data, handling both placeholders and loops
 * @param {string} template - HTML template string
 * @param {Object} data - Data object with values to inject (pre-sanitized)
 * @returns {string} - Fully processed template
 */
function parseTemplate(template, data) {
  if (!template || typeof template !== 'string') {
    throw new Error('Template must be a non-empty string');
  }
  
  if (!data || typeof data !== 'object') {
    throw new Error('Data must be an object');
  }
  
  // First process conditionals (before loops)
  let result = processConditionals(template, data);
  
  // Then process loops (which may contain placeholders)
  result = processLoop(result, data);
  
  // Finally replace remaining placeholders
  result = replacePlaceholders(result, data);
  
  return result;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    parseTemplate,
    replacePlaceholders,
    processLoop,
    processConditionals
  };
}
