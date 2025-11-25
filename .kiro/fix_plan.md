# Fix Plan (Template)

This file is overwritten by the `test-artifacts-on-save` hook when the generator integrity test fails.

## Purpose

When populated by the hook, this file contains:
1. **Trigger**: The file that triggered the hook (e.g., `public/js/generator.js`)
2. **Test Output**: The raw output from `node scripts/test-artifacts.js`
3. **Repair Plan**: A suggested sequence of steps to repair any regressions

## Current Status

✅ **No issues detected** - This is the template file.

When tests fail, this section will be replaced with specific failure details and repair instructions.

## How to Use This File

### For Humans
1. Read the test output to understand what broke
2. Follow the repair plan steps
3. Run `node scripts/test-artifacts.js` to verify fixes
4. Delete this file or mark it as resolved

### For Kiro Agent
1. Parse the test output to identify the specific invariant that broke
2. Read the relevant source files mentioned in the repair plan
3. Apply the suggested fixes using safe, minimal edits
4. Re-run the test script to verify the fix
5. Update this file with the resolution status

## Common Issues and Fixes

### Issue: buildSiteArtifacts function not found
**Cause**: Function was renamed, deleted, or moved
**Fix**: 
- Restore the function definition in `public/js/generator.js`
- Ensure it's named exactly `buildSiteArtifacts`
- Verify it's exported to `window.buildSiteArtifacts`

### Issue: Sanitization.sanitizeFormData not called
**Cause**: Sanitization step was removed or bypassed
**Fix**:
- Add back the sanitization call at the start of `buildSiteArtifacts`:
  ```javascript
  const sanitizedData = Sanitization.sanitizeFormData(formData);
  ```
- Use `sanitizedData` for all subsequent operations

### Issue: Double-escaping detected (&amp;amp;)
**Cause**: Data is being escaped multiple times
**Fix**:
- Review the data flow from form → sanitization → template → output
- Ensure escaping happens exactly once
- Check both `generator.js` and `base-template.html`

### Issue: Artifacts shape changed
**Cause**: Return object structure was modified
**Fix**:
- Ensure `buildSiteArtifacts` returns an object with exactly these properties:
  ```javascript
  return {
      html,           // string: processed HTML content
      css,            // string: theme CSS content
      menuJson,       // string: JSON-stringified menu data
      instructionsTxt // string: deployment instructions
  };
  ```

### Issue: buildSiteArtifacts not async
**Cause**: Function was changed to synchronous
**Fix**:
- Restore `async` keyword: `async function buildSiteArtifacts(formData)`
- Ensure template/theme loading uses `await`

### Issue: DOM manipulation in buildSiteArtifacts
**Cause**: Direct `document` or `window` access was added
**Fix**:
- Remove any DOM manipulation from `buildSiteArtifacts`
- Keep it pure - input → processing → output
- Move DOM operations to `createOutputFiles` or other UI functions

## Manual Test Command

```bash
node scripts/test-artifacts.js
```

## Related Files

- **Hook Definition**: `.kiro/hooks/test-artifacts-on-save.md`
- **Test Script**: `scripts/test-artifacts.js`
- **Generator Core**: `public/js/generator.js`
- **Template**: `public/templates/base-template.html`
- **Spec**: `.kiro/spec-phase2.md`
