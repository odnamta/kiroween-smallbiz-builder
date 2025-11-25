# Hook: Test Generator Artifacts on Save

## Intent

Whenever we touch the generator spec or implementation, we want Kiro to automatically run an integrity check on the generator and warn us if we broke core invariants.

This hook:
- **Triggers when**:
  - `.kiro/spec-phase2.md`
  - `public/js/generator.js`
  are saved.
  
- **Runs a Node script**:
  - `node scripts/test-artifacts.js`
  
- **If the script fails** (non-zero exit code), it writes a fix plan to:
  - `.kiro/fix_plan.md`

## Trigger (conceptual)

```yaml
on_save:
  - path: ".kiro/spec-phase2.md"
  - path: "public/js/generator.js"
```

## Action (conceptual)

1. Run `node scripts/test-artifacts.js`.
2. If exit code === 0:
   - Do nothing (all checks passed).
3. Else:
   - Read the stdout/stderr from the test.
   - Create or update `.kiro/fix_plan.md` with:
     - What file triggered the hook,
     - The raw test output,
     - A short repair plan for Kiro.

This hook is used both by humans (reading `fix_plan.md`) and by Kiro itself when proposing safe patches.

## Invariants We Care About

The test script should assert at least:

1. **Function exists**: `public/js/generator.js` still defines `buildSiteArtifacts(formData)`.
2. **Sanitization called**: `buildSiteArtifacts` still references `Sanitization.sanitizeFormData`.
3. **No double-escaping**: No obvious double-escaping regressions, e.g. `&amp;amp;` appearing in templates or generator code.
4. **Artifacts shape stable**: The artifacts object shape is stable: `{ html, css, menuJson, instructionsTxt }`.

The exact implementation lives in `scripts/test-artifacts.js`.

## Why This Matters

The `buildSiteArtifacts` function is the pure core of the website generator. It must:
- Always sanitize user input before processing
- Return a consistent object shape
- Not introduce double-escaping bugs
- Remain side-effect-free (no DOM manipulation, no downloads)

This hook catches regressions early, before they break the generate/download flow or introduce XSS vulnerabilities.

## Usage

This hook is conceptual documentation. In a full Kiro Agent Hooks implementation, the IDE would:
1. Watch for file saves matching the trigger paths
2. Execute the test script automatically
3. Parse the results and update `.kiro/fix_plan.md` if needed
4. Optionally notify the user of test failures

For now, developers can manually run:
```bash
node scripts/test-artifacts.js
```

to verify generator integrity before committing changes.
