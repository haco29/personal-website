# Progress MD Command

This command creates and maintains a detailed progress tracking document for any development plan or project, breaking complex work into small, testable steps **organized by Pull Requests (PRs)** that can be committed incrementally.

## Usage

Use this command when you want to:

- **Document Any Development Plan** - Convert discussion plans into structured progress tracking
- **Break Down Complex Features into PRs** - Split large implementations into reviewable, mergeable PRs
- **Track Project Progress** - Monitor what's completed, in-progress, and pending
- **Enable Incremental Delivery** - Create commit-ready chunks of work organized by PR
- **Facilitate Team Collaboration** - Clear visibility into progress and next steps
- **Manage Technical Debt** - Structure refactoring and improvement work

## What This Command Does

1. **Analyzes Current Discussion** - Reviews the conversation for development plans and decisions
2. **Creates Progress Document** - Generates a `progress-{feature-name}.md` file with structured tracking
3. **Breaks Down into PRs** - Groups related steps into logical PRs that can be reviewed and merged independently
4. **Defines Steps Within Each PR** - Each PR contains small, testable steps with clear success criteria
5. **Organizes by Priority** - Orders PRs and steps by dependencies and importance
6. **Tracks Status** - Maintains status of each PR and step (pending, in-progress, completed, blocked)
7. **Provides PR Summary** - Quick reference table showing all PRs, their status, and key deliverables

## Progress Document Structure

The generated `progress-{feature-name}.md` will include:

### **1. Project Overview**

- **Objective** - High-level goal and purpose of the project
- **Context** - Background and reasoning for the work
- **Success Metrics** - How completion will be measured
- **Timeline** - Estimated phases and milestones
- **Scope** - What's included and excluded from the project

### **2. PR Breakdown Summary**

A quick reference table showing all PRs:

| PR  | Title                   | Goal                               | Status  | Steps | Branch               |
| --- | ----------------------- | ---------------------------------- | ------- | ----- | -------------------- |
| 1   | Setup and Configuration | Foundation without runtime changes | Pending | 1-8   | `feat/feature-setup` |
| 2   | Core Integration        | Enable feature in app              | Pending | 9-13  | `feat/feature-core`  |
| 3   | CI/CD Configuration     | Production deployment              | Pending | 14-18 | `feat/feature-cicd`  |

### **3. Detailed PR Sections**

Each PR section includes:

#### **PR Header**

- **PR Number and Title**
- **Goal** - What this PR accomplishes
- **Risk Level** - Low/Medium/High with explanation
- **Dependencies** - What must be merged before this PR
- **Branch Name** - Suggested branch name
- **Estimated Effort** - Time estimate for the entire PR

#### **Steps Within PR**

Each step includes:

- **Step ID** - Unique identifier (e.g., STEP-001)
- **Status** - Pending/In Progress/Completed/Blocked
- **Description** - What needs to be done
- **Files** - Which files will be modified/created
- **Success Criteria** - How to know it's complete
- **Testing Requirements** - How to validate the change
- **Estimated Effort** - Time/complexity estimate
- **Dependencies** - What must be completed first (within PR)
- **Commit Message** - Suggested commit message

#### **PR Testing Checklist**

- What to test before marking PR ready for review
- Manual testing steps
- Automated test requirements

### **4. Testing Strategy**

Per-PR testing requirements:

- **PR 1**: Type checking, linting, build verification
- **PR 2**: Integration tests, manual testing flows
- **PR 3**: CI/CD verification, deployment testing

### **5. Risk Assessment**

- **Low Risk Items** - Safe changes with minimal impact
- **Medium Risk Items** - Require careful testing
- **High Risk Items** - Need extra review and rollback plans
- **Mitigation Strategies** - How to reduce risks

### **6. Notes and References**

- Key differences from reference implementations
- Post-implementation tasks
- External documentation links

## Example Progress Structure

```markdown
# Feature Implementation - Progress Tracker

## Project Overview

**Objective**: [Description of what you're building]
**Context**: [Why this work is needed]
**Status**: In Progress | **Current PR**: 1 of 3 | **Progress**: 25%

---

## PR Breakdown Summary

| PR  | Title                   | Goal           | Status      | Steps | Branch               |
| --- | ----------------------- | -------------- | ----------- | ----- | -------------------- |
| 1   | Setup and Configuration | Foundation     | In Progress | 1-5   | `feat/feature-setup` |
| 2   | Core Integration        | Enable feature | Pending     | 6-10  | `feat/feature-core`  |
| 3   | Production Config       | Deployment     | Pending     | 11-14 | `feat/feature-prod`  |

---

## PR 1: Setup and Configuration

**Goal**: Foundation without runtime changes - pure setup work
**Risk**: Low - No runtime impact, easy to review
**Dependencies**: None
**Branch**: `feat/feature-setup`
**Estimated Effort**: 1-2 days

### Steps

#### STEP-001: Install Dependencies

- [ ] **Status**: In Progress
- **Description**: Add required packages to package.json
- **Files**: `package.json`
- **Success Criteria**:
  - Packages installed and listed in dependencies
  - Version matches reference implementation
- **Testing**: Run `pnpm install` successfully
- **Effort**: 15 minutes
- **Commit**: `feat(feature): add dependencies`

#### STEP-002: Create Configuration Module

- [ ] **Status**: Pending
- **Description**: Create configuration files
- **Files**: `src/services/feature/index.ts`, `src/services/feature/config.ts`
- **Success Criteria**:
  - Configuration exports correctly
  - Types are properly defined
- **Testing**: Type check passes
- **Effort**: 30 minutes
- **Dependencies**: STEP-001
- **Commit**: `feat(feature): add configuration module`

### PR 1 Testing Checklist

- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] No runtime errors when app starts

### PR 1 Ready for Review Checklist

- [ ] All steps completed
- [ ] All tests passing
- [ ] Self-review completed
- [ ] PR description written

---

## PR 2: Core Integration

**Goal**: Enable feature in the application
**Risk**: Medium - Runtime changes require testing
**Dependencies**: PR 1 must be merged
**Branch**: `feat/feature-core`
**Estimated Effort**: 2-3 days

### Steps

#### STEP-006: Add Provider to App

- [ ] **Status**: Pending
- **Description**: Wrap app with feature provider
- **Files**: `src/App.tsx`
- **Success Criteria**:
  - Provider wraps app at root level
  - No console errors
- **Testing**: App renders without errors
- **Effort**: 20 minutes
- **Commit**: `feat(feature): add provider to app`

[... more steps ...]

### PR 2 Testing Checklist

- [ ] App renders without errors
- [ ] Feature is initialized (check browser console)
- [ ] Manual testing of feature flows
- [ ] No regressions in existing functionality

---

## PR 3: CI/CD Configuration

**Goal**: Production deployment setup
**Risk**: Medium - CI/CD changes require careful testing
**Dependencies**: PR 2 must be merged
**Branch**: `feat/feature-cicd`
**Estimated Effort**: 1 day

[... PR 3 details ...]

---

## Testing Strategy

### PR 1 Testing

- Type checking: `pnpm type-check` passes
- Linting: `pnpm lint` passes
- Build: `pnpm build` succeeds
- No runtime errors

### PR 2 Testing

- App renders without errors
- Feature is initialized
- Integration tests pass
- Manual testing completed

### PR 3 Testing

- CI/CD pipeline runs successfully
- Deployment to staging works
- Feature works in deployed environment

---

## Risk Assessment

### Low Risk

- PR 1: Pure setup, no runtime impact

### Medium Risk

- PR 2: Runtime changes require careful testing
- PR 3: CI/CD changes could affect deployments

### Mitigation Strategies

- Test PR 2 locally before merging
- Test PR 3 in staging before production
- Have rollback plan ready

---

## Notes

### Post-Implementation Tasks

- Configure feature in dashboard
- Monitor for errors
- Update documentation

### References

- Reference implementation: `/path/to/reference`
- Official docs: https://docs.example.com
```

## PR Organization Guidelines

### When to Split into Multiple PRs

Split into multiple PRs when:

- **Different concerns**: Setup vs. integration vs. deployment
- **Different risk levels**: Low-risk setup before high-risk integration
- **Dependencies on external work**: CI/CD may need infrastructure changes
- **Large scope**: More than 10-15 files changed
- **Different reviewers needed**: Backend vs. frontend vs. DevOps

### Recommended PR Patterns

1. **Setup PR** (Low risk)
   - Dependencies
   - Configuration files
   - Type definitions
   - Test mocks

2. **Core Integration PR** (Medium risk)
   - Provider/context setup
   - Component integration
   - Hook implementation
   - Error handling

3. **Enhancement PR** (Medium risk)
   - Additional features
   - Performance optimizations
   - Edge case handling

4. **CI/CD PR** (Medium-High risk)
   - Environment variables
   - Build configuration
   - Deployment scripts

### PR Sizing Guidelines

- **Ideal PR size**: 200-400 lines changed
- **Maximum recommended**: 500-600 lines
- **If larger**: Consider splitting further

## Benefits

### Clear Direction

- Every team member knows which PR to work on next
- No ambiguity about requirements or success criteria
- Clear dependencies between PRs prevent blocking issues

### Incremental Delivery

- Each PR can be reviewed, tested, and merged independently
- Smaller PRs are easier to review and less likely to have bugs
- Rollback is easier if issues are discovered

### Visibility

- Stakeholders can see real progress at any time
- PR status shows overall feature progress
- Blockers are identified and tracked explicitly

### Continuous Integration

- Each PR is designed to be merge-ready
- CI/CD pipeline validates each PR
- Feature flags can enable partial deployments

## Integration with Other Commands

- **`/reflect-changes`** - Use after completing PRs to validate patterns
- **`/add-tests`** - Automatically add tests for completed steps
- **`/precommit`** - Validate each step before committing

## Best Practices

### Step Sizing

- Each step should take 30 minutes to 2 hours to complete
- Steps should be testable independently
- Group related file changes into single steps

### PR Management

- Create PR as draft early to track progress
- Update PR description as steps are completed
- Request early feedback on approach before completing all steps

### Documentation

- Update progress-{feature-name}.md immediately when status changes
- Include commit hashes for completed steps
- Document any deviations from the original plan
- Mark PRs with their merge status

### Testing Strategy

- Every step should have clear testing requirements
- PR-level testing checklist before marking ready for review
- Manual testing steps should be documented

## Example Usage Scenarios

### **After Feature Planning**

```
Use Case: Just finished planning any complex development work
Action: Generate progress-{feature-name}.md with PR breakdown
Output: Structured plan with steps organized by PR
```

### **During Development**

```
Use Case: Need to track progress on ongoing project
Action: Update progress-{feature-name}.md with current PR and step status
Output: Clear visibility into what's done/pending per PR
```

### **Before Code Review**

```
Use Case: Preparing PR for team review
Action: Reference progress-{feature-name}.md PR section
Output: Reviewers understand scope and testing requirements
```

### **Refactoring Projects**

```
Use Case: Large refactoring or technical debt cleanup
Action: Break down into safe, incremental PRs
Output: Risk-reduced approach with clear rollback points per PR
```

### **Bug Investigation**

```
Use Case: Complex bug requiring multiple investigation steps
Action: Document investigation plan with potential fix PRs
Output: Systematic approach with clear progress tracking
```

---

_This command transforms complex development discussions into actionable, PR-organized progress tracking._
