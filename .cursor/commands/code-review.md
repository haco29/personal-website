# Code Review (cr) - Compare Branch to Main

Review changes in the current branch against main, checking for:

- Potential bugs and errors
- Best practices violations (from Cursor rules)
- Code quality issues
- Next.js App Router patterns
- TypeScript type safety
- React patterns and hooks usage
- Accessibility compliance (WCAG 2.1 AA)
- Testing standards

## Instructions for AI

When this command is run:

1. **Get the list of changed files and their diffs:**

   ```bash
   git diff --name-status main...HEAD
   git diff main...HEAD -- <file_path>
   ```

   **Important:** Process each file's diff individually to prevent output truncation.

2. **Analyze changes against Cursor rules:**
   - Read rules from `.cursor/rules/` directory
   - Check against:
     - `testing.mdc` - Testing patterns, RTL query rules, user behavior focus
     - `workshop-docs.mdc` - Documentation requirements for meaningful changes
     - Security guidelines (from workspace rules)

3. **Provide structured feedback:**

   ````markdown
   ## Code Review Summary

   **Branch:** [current-branch-name]
   **Comparing:** [current-branch] → main
   **Files Changed:** [count]

   ---

   ## 🔴 Critical Issues (Must Fix)

   ### [File Path]

   **Issue:** [Description]
   **Rule Violated:** [Which Cursor rule, if applicable]
   **Suggestion:** [How to fix]
   **Example:**

   ```tsx
   // Current (problematic)
   ...

   // Suggested
   ...
   ```

   ---

   ## 🟡 Warnings (Should Fix)

   ### [File Path]

   **Issue:** [Description]
   **Rule Reference:** [Which Cursor rule]
   **Suggestion:** [How to improve]

   ---

   ## 💡 Suggestions (Nice to Have)

   ### [File Path]

   **Suggestion:** [What could be better]
   **Why:** [Explanation]

   ---

   ## ✅ Positive Observations

   - [What was done well]

   ---

   ## 📊 Summary

   - **Critical Issues:** X
   - **Warnings:** Y
   - **Suggestions:** Z
   - **Overall Assessment:** [Good/Needs Work/Ready to Merge]
   ````

4. **Focus on:**
   - **Next.js & TypeScript:**
     - Missing type definitions or using `any`
     - Incorrect App Router patterns (server vs client components)
     - Missing `"use client"` directive when needed
     - Incorrect metadata exports
     - Using Pages Router patterns in App Router

   - **React patterns:**
     - Incorrect hook dependencies or rules of hooks violations
     - Direct state mutations (should be immutable)
     - Missing error boundaries
     - Props interfaces not properly defined
     - Component not memoized when appropriate
     - Async operations not properly handled in useEffect
     - Using useEffect for focus management (prefer callback refs)

   - **Code Quality:**
     - Missing error handling
     - Console.log statements left in code
     - Duplicate code that could be extracted
     - Magic numbers/strings that should be constants

   - **UI & Styling:**
     - Not using Tailwind CSS consistently
     - Hardcoded colors instead of theme tokens
     - Missing responsive design patterns
     - Missing loading states or skeleton screens
     - Poor mobile/tablet responsiveness

   - **Testing:**
     - Missing tests for new components or features
     - Using `fireEvent` instead of `@testing-library/user-event`
     - Testing implementation details instead of user behavior
     - Not using RTL query priority (getByRole > getByLabelText > getByText)
     - Missing accessibility tests
     - Testing class names or DOM structure

   - **Accessibility:**
     - Missing accessibility attributes (aria-labels, roles)
     - Missing keyboard navigation support
     - Form inputs without proper labels
     - Interactive elements without focus states
     - Missing semantic HTML

   - **Documentation:**
     - Meaningful changes without workshop docs (per `workshop-docs.mdc`)
     - Missing or unclear code comments

   - **Security:**
     - Hardcoded secrets or API keys
     - Missing input validation
     - XSS vulnerabilities (dangerouslySetInnerHTML without sanitization)
     - Exposing sensitive data in error messages

5. **DO NOT flag:**
   - Proper formatting (assume ESLint/Prettier handles this)
   - Minor style preferences
   - Pre-existing issues in unchanged code

6. **Be specific:**
   - Quote exact problematic code
   - Reference line numbers when possible
   - Explain WHY (user impact, maintainability, performance)
   - Provide concrete examples with actual code
   - Reference specific Cursor rules

7. **Be constructive:**
   - Focus on helping, not criticizing
   - Acknowledge good practices
   - Prioritize issues (Critical > Warning > Suggestion)

## Example Output

````markdown
## Code Review Summary

**Branch:** feature/chat-markdown
**Comparing:** feature/chat-markdown → main
**Files Changed:** 3

---

## 🔴 Critical Issues (Must Fix)

### app/components/Chat.tsx (Line 45-50)

**Issue:** Using useEffect for focus management instead of callback ref
**Rule Violated:** React best practices - prefer callback refs over useEffect for DOM operations
**Suggestion:** Use callback ref pattern for more native React behavior

**Example:**

```tsx
// Current (problematic)
useEffect(() => {
  if (isOpen) {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }
}, [isOpen]);

// Suggested
const handleInputRef = (element: HTMLInputElement | null) => {
  if (element && isOpen) {
    requestAnimationFrame(() => {
      element.focus();
    });
  }
};
```

---

## 🟡 Warnings (Should Fix)

### app/components/MarkdownRenderer.tsx (Line 52)

**Issue:** Using unused `node` parameter in component props
**Rule Reference:** TypeScript/ESLint - no unused variables
**Suggestion:** Remove unused `node` parameter from destructuring

**Example:**

```tsx
// Current
code: ({ node, className, children, ...props }) => {

// Suggested
code: ({ className, children, ...props }) => {
```

---

### tests/components/Chat.test.tsx

**Issue:** Missing test for markdown rendering
**Rule Reference:** `testing.mdc` - test user-observable behavior
**Suggestion:** Add test that verifies markdown content renders correctly (headings, lists, links)

---

## 💡 Suggestions (Nice to Have)

### app/components/MarkdownRenderer.tsx

**Suggestion:** Consider extracting code block styling to a shared constant
**Why:** Reduces duplication and makes styling easier to maintain

---

## ✅ Positive Observations

- ✅ Excellent use of callback refs for focus management
- ✅ Proper TypeScript types throughout
- ✅ Good accessibility attributes (aria-labels, roles)
- ✅ Clean component composition
- ✅ Markdown rendering properly styled for dark mode

---

## 📊 Summary

- **Critical Issues:** 1
- **Warnings:** 2
- **Suggestions:** 1
- **Overall Assessment:** Needs Work (fix critical issue before merging)

**Recommendation:** Fix the useEffect → callback ref issue, then address warnings. Overall solid work with good TypeScript usage!
````

## Notes

- Run from project root
- Requires git
- Only reviews current branch vs main
- Does not modify files, only provides feedback
- Focus on Next.js App Router, React, TypeScript, and accessibility
- Consider both developer experience and end-user impact
