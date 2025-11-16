#!/usr/bin/env node

/**
 * MCP Server for Website Generator
 * Provides programmatic website generation through Model Context Protocol
 */

const fs = require('fs').promises;
const path = require('path');

// Server metadata
const SERVER_NAME = 'website-generator';
const SERVER_VERSION = '1.0.0';

/**
 * Sanitizes HTML to prevent XSS attacks
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes URL components
 * @param {string} url - URL to sanitize
 * @param {string} type - Type of URL ('whatsapp' or 'instagram')
 * @returns {string} - Sanitized URL
 */
function sanitizeURL(url, type) {
  if (typeof url !== 'string') return '';
  
  if (type === 'whatsapp') {
    return url.replace(/[^0-9]/g, '');
  }
  if (type === 'instagram') {
    return url.replace(/[^a-zA-Z0-9_]/g, '');
  }
  return '';
}

/**
 * Sanitizes all form data
 * @param {Object} formData - Raw form data
 * @returns {Object} - Sanitized form data
 */
function sanitizeFormData(formData) {
  return {
    business_name: sanitizeHTML(formData.business_name || ''),
    business_type: sanitizeHTML(formData.business_type || ''),
    tagline: sanitizeHTML(formData.tagline || ''),
    short_description: sanitizeHTML(formData.short_description || ''),
    contact_whatsapp: sanitizeURL(formData.contact_whatsapp || '', 'whatsapp'),
    instagram_handle: sanitizeURL(formData.instagram_handle || '', 'instagram'),
    theme_choice: formData.theme_choice === 'kiroween' ? 'kiroween' : 'classic',
    menu_items: (formData.menu_items || []).map(item => ({
      name: sanitizeHTML(item.name || ''),
      price: sanitizeHTML(item.price || '')
    }))
  };
}

/**
 * Replaces placeholders in template
 * @param {string} template - Template string
 * @param {Object} data - Data to inject
 * @returns {string} - Processed template
 */
function replacePlaceholders(template, data) {
  let result = template;
  const placeholderRegex = /\{\{([^}]+)\}\}/g;
  
  result = result.replace(placeholderRegex, (match, key) => {
    const trimmedKey = key.trim();
    const value = data[trimmedKey];
    
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    return '';
  });
  
  return result;
}

/**
 * Processes loop sections in template
 * @param {string} template - Template string
 * @param {Object} data - Data containing arrays
 * @returns {string} - Processed template
 */
function processLoop(template, data) {
  let result = template;
  const loopRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  
  result = result.replace(loopRegex, (match, arrayName, loopContent) => {
    const arrayData = data[arrayName];
    
    if (!Array.isArray(arrayData) || arrayData.length === 0) {
      return '';
    }
    
    const processedItems = arrayData.map(item => {
      return replacePlaceholders(loopContent, item);
    });
    
    return processedItems.join('');
  });
  
  return result;
}

/**
 * Parses template with data
 * @param {string} template - HTML template
 * @param {Object} data - Data to inject
 * @returns {string} - Processed HTML
 */
function parseTemplate(template, data) {
  let result = processLoop(template, data);
  result = replacePlaceholders(result, data);
  return result;
}

/**
 * Loads template file
 * @returns {Promise<string>} - Template content
 */
async function loadTemplate() {
  const templatePath = path.join(__dirname, '../public/templates/base-template.html');
  return await fs.readFile(templatePath, 'utf-8');
}

/**
 * Loads theme CSS file
 * @param {string} themeChoice - Theme name
 * @returns {Promise<string>} - CSS content
 */
async function loadTheme(themeChoice) {
  const themeFile = themeChoice === 'kiroween' ? 'kiroween.css' : 'classic.css';
  const themePath = path.join(__dirname, '../public/themes', themeFile);
  return await fs.readFile(themePath, 'utf-8');
}

/**
 * Generates website files
 * @param {Object} formData - Form data
 * @returns {Promise<Object>} - Generated file paths
 */
async function generateWebsite(formData) {
  try {
    // Sanitize input
    const sanitizedData = sanitizeFormData(formData);
    
    // Load template and theme
    const [template, css] = await Promise.all([
      loadTemplate(),
      loadTheme(sanitizedData.theme_choice)
    ]);
    
    // Generate HTML
    const html = parseTemplate(template, sanitizedData);
    
    // Prepare output directory
    const outputDir = path.join(__dirname, '../generated');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Write files
    const htmlPath = path.join(outputDir, 'index.html');
    const cssPath = path.join(outputDir, 'styles.css');
    const jsonPath = path.join(outputDir, 'menu.json');
    
    await Promise.all([
      fs.writeFile(htmlPath, html, 'utf-8'),
      fs.writeFile(cssPath, css, 'utf-8'),
      fs.writeFile(jsonPath, JSON.stringify({ menu_items: sanitizedData.menu_items }, null, 2), 'utf-8')
    ]);
    
    return {
      success: true,
      files: {
        html: htmlPath,
        css: cssPath,
        json: jsonPath
      },
      message: 'Website generated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to generate website'
    };
  }
}

/**
 * Validates form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result
 */
function validateFormData(formData) {
  const errors = [];
  
  if (!formData.business_name || formData.business_name.trim() === '') {
    errors.push('business_name is required');
  }
  
  if (!formData.business_type || formData.business_type.trim() === '') {
    errors.push('business_type is required');
  }
  
  if (!formData.tagline || formData.tagline.trim() === '') {
    errors.push('tagline is required');
  }
  
  if (!formData.short_description || formData.short_description.trim() === '') {
    errors.push('short_description is required');
  }
  
  if (!formData.contact_whatsapp || formData.contact_whatsapp.trim() === '') {
    errors.push('contact_whatsapp is required');
  }
  
  if (!formData.instagram_handle || formData.instagram_handle.trim() === '') {
    errors.push('instagram_handle is required');
  }
  
  if (!formData.theme_choice || !['classic', 'kiroween'].includes(formData.theme_choice)) {
    errors.push('theme_choice must be either "classic" or "kiroween"');
  }
  
  if (!Array.isArray(formData.menu_items) || formData.menu_items.length === 0) {
    errors.push('menu_items must be a non-empty array');
  } else {
    formData.menu_items.forEach((item, index) => {
      if (!item.name || item.name.trim() === '') {
        errors.push(`menu_items[${index}].name is required`);
      }
      if (!item.price || item.price.trim() === '') {
        errors.push(`menu_items[${index}].price is required`);
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Handles MCP protocol messages
 */
async function handleMessage(message) {
  const { method, params, id } = message;
  
  try {
    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {}
            },
            serverInfo: {
              name: SERVER_NAME,
              version: SERVER_VERSION
            }
          }
        };
      
      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'generate_website',
                description: 'Generate a static website from business information. Creates HTML, CSS, and JSON files in the /generated directory.',
                inputSchema: {
                  type: 'object',
                  properties: {
                    business_name: {
                      type: 'string',
                      description: 'Name of the business'
                    },
                    business_type: {
                      type: 'string',
                      description: 'Type of business',
                      enum: ['coffee shop', 'bakery', 'barber']
                    },
                    tagline: {
                      type: 'string',
                      description: 'Business tagline or slogan'
                    },
                    short_description: {
                      type: 'string',
                      description: 'Brief description of the business'
                    },
                    contact_whatsapp: {
                      type: 'string',
                      description: 'WhatsApp phone number (digits only)'
                    },
                    instagram_handle: {
                      type: 'string',
                      description: 'Instagram handle (without @ symbol)'
                    },
                    menu_items: {
                      type: 'array',
                      description: 'List of menu items with names and prices',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            description: 'Menu item name'
                          },
                          price: {
                            type: 'string',
                            description: 'Menu item price'
                          }
                        },
                        required: ['name', 'price']
                      },
                      minItems: 1
                    },
                    theme_choice: {
                      type: 'string',
                      description: 'Visual theme for the website',
                      enum: ['classic', 'kiroween']
                    }
                  },
                  required: [
                    'business_name',
                    'business_type',
                    'tagline',
                    'short_description',
                    'contact_whatsapp',
                    'instagram_handle',
                    'menu_items',
                    'theme_choice'
                  ]
                }
              }
            ]
          }
        };
      
      case 'tools/call':
        if (params.name === 'generate_website') {
          // Validate input
          const validation = validateFormData(params.arguments);
          
          if (!validation.valid) {
            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: `Validation failed:\n${validation.errors.join('\n')}`
                  }
                ],
                isError: true
              }
            };
          }
          
          // Generate website
          const result = await generateWebsite(params.arguments);
          
          if (result.success) {
            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: `Website generated successfully!\n\nGenerated files:\n- HTML: ${result.files.html}\n- CSS: ${result.files.css}\n- JSON: ${result.files.json}`
                  }
                ]
              }
            };
          } else {
            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: `Failed to generate website: ${result.error}`
                  }
                ],
                isError: true
              }
            };
          }
        }
        
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Unknown tool: ${params.name}`
          }
        };
      
      default:
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Method not found: ${method}`
          }
        };
    }
  } catch (error) {
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32603,
        message: error.message
      }
    };
  }
}

/**
 * Main server loop
 */
async function main() {
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  rl.on('line', async (line) => {
    try {
      const message = JSON.parse(line);
      const response = await handleMessage(message);
      console.log(JSON.stringify(response));
    } catch (error) {
      console.error(JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32700,
          message: 'Parse error'
        }
      }));
    }
  });
}

// Run server
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateWebsite, validateFormData };
