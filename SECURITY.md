# Security Implementation

This document describes the security measures implemented in the Website Builder to protect against common web vulnerabilities.

## Input Sanitization

### HTML Sanitization
All user inputs are sanitized to prevent Cross-Site Scripting (XSS) attacks:

- **Method**: HTML special characters are escaped using the browser's built-in text content mechanism
- **Implementation**: `Sanitization.sanitizeHTML()` function
- **Applied to**: All text fields (business_name, tagline, short_description, menu items)
- **Protection**: Prevents injection of malicious HTML/JavaScript code

Example:
```javascript
Input:  '<script>alert("XSS")</script>Hello'
Output: '&lt;script&gt;alert("XSS")&lt;/script&gt;Hello'
```

### URL Sanitization
Social media links are sanitized to prevent malicious URLs:

#### WhatsApp Numbers
- **Method**: Remove all non-digit characters
- **Implementation**: `Sanitization.sanitizeWhatsAppURL()`
- **Pattern**: Only digits (0-9) are allowed
- **Protection**: Prevents injection of malicious URL schemes

Example:
```javascript
Input:  '+1 (234) 567-8900'
Output: '12345678900'
```

#### Instagram Handles
- **Method**: Remove all characters except alphanumeric and underscores
- **Implementation**: `Sanitization.sanitizeInstagramURL()`
- **Pattern**: Only letters, numbers, and underscores allowed
- **Protection**: Prevents special characters that could be used in attacks

Example:
```javascript
Input:  '@my_business-123!'
Output: 'my_business123'
```

## Input Length Limits

All input fields have maximum length restrictions to prevent abuse:

| Field | Maximum Length | Purpose |
|-------|---------------|---------|
| Business Name | 100 characters | Prevent excessive data |
| Business Type | 50 characters | Reasonable type name |
| Tagline | 150 characters | Concise marketing message |
| Short Description | 500 characters | Detailed but limited description |
| WhatsApp Number | 20 characters | International phone numbers |
| Instagram Handle | 30 characters | Instagram's actual limit |
| Menu Item Name | 100 characters | Reasonable item name |
| Menu Item Price | 20 characters | Price with currency symbol |

### Implementation
Length limits are enforced at three levels:

1. **HTML Level**: `maxlength` attribute on input fields
2. **Validation Level**: JavaScript validation checks length
3. **Sanitization Level**: `enforceLength()` truncates if needed

## URL Format Validation

Before generating links, URLs are validated to ensure they match expected formats:

### WhatsApp Validation
```javascript
Pattern: /^[0-9]+$/
Valid:   '1234567890'
Invalid: '123-456-7890', 'abc123'
```

### Instagram Validation
```javascript
Pattern: /^[a-zA-Z0-9_]+$/
Valid:   'my_business_123'
Invalid: 'my-business', '@mybusiness'
```

## Form Data Sanitization Flow

When a user submits the form, data goes through this security pipeline:

```
User Input
    ↓
HTML maxlength (client-side limit)
    ↓
JavaScript Validation (format check)
    ↓
Sanitization Module (sanitizeFormData)
    ↓
    ├─ HTML Sanitization (escape special chars)
    ├─ URL Sanitization (remove invalid chars)
    └─ Length Enforcement (truncate if needed)
    ↓
Template Engine (inject into template)
    ↓
Generated Website (safe output)
```

## Security Best Practices

### What We Do
✅ Escape all HTML special characters in user input
✅ Sanitize URLs to prevent malicious schemes
✅ Validate input formats before processing
✅ Enforce strict length limits on all fields
✅ Use browser's built-in sanitization mechanisms
✅ Apply defense-in-depth (multiple layers of protection)

### What We Don't Do
❌ Store user data (no database = no data breach risk)
❌ Require authentication (no passwords = no credential theft)
❌ Execute user-provided code
❌ Allow arbitrary HTML in user input
❌ Trust client-side validation alone

## Testing

A comprehensive test suite is available in `test-sanitization.html` that verifies:

- HTML sanitization removes script tags
- Special characters are properly escaped
- WhatsApp numbers are cleaned correctly
- Instagram handles are sanitized properly
- Length limits are enforced
- URL format validation works correctly
- Complete form data sanitization functions properly

To run tests:
1. Open `test-sanitization.html` in a web browser
2. Review the test results
3. All tests should pass (green checkmarks)

## Module Dependencies

The sanitization system consists of these modules:

1. **sanitization.js** - Core sanitization functions
2. **validation.js** - Input validation (uses sanitization for length checks)
3. **template-engine.js** - Template processing (uses sanitization for output)
4. **generator.js** - Main orchestrator (applies sanitization before generation)

Load order is critical:
```html
<script src="js/sanitization.js"></script>  <!-- First -->
<script src="js/validation.js"></script>
<script src="js/template-engine.js"></script>
<script src="js/file-writer.js"></script>
<script src="js/generator.js"></script>     <!-- Last -->
```

## Future Security Enhancements

Potential improvements for future versions:

- Content Security Policy (CSP) headers
- Subresource Integrity (SRI) for external resources
- Rate limiting for generation requests
- Additional input validation rules
- Automated security testing in CI/CD
- Regular security audits

## Reporting Security Issues

If you discover a security vulnerability, please:

1. Do not open a public issue
2. Contact the maintainers privately
3. Provide detailed information about the vulnerability
4. Allow time for a fix before public disclosure

## References

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
