# 05 — Formatter (Prettier)

## Goal

- Make code style consistent and automatic (format-on-demand + CI-friendly checks).

## Prereqs

- `pnpm` installed (or use your project’s package manager)

## Live steps

### 1) Install Prettier

```bash
pnpm add -D prettier eslint-config-prettier prettier-plugin-tailwindcss
```

### 2) Add config files

- `.prettierrc.json` (includes Tailwind class sorting)
- `.prettierignore`

### 3) Add scripts

Add to `package.json`:

```json
{
  "scripts": {
    "format": "prettier . --write",
    "format:check": "prettier . --check"
  }
}
```

### 4) Run the formatter

```bash
pnpm format
```

## Verification

- Check formatting without changing files:

```bash
pnpm format:check
```

## Common failures

- **`Command not found: prettier`**: run `pnpm install` first.
- **Formatting changes too many files at once**: run it once, commit, then keep the diff small going forward.

## Appendix: why Tailwind plugin matters

`prettier-plugin-tailwindcss` sorts class names consistently, which reduces noisy diffs and makes reviews easier.
