# Shared Components Library

This directory contains reusable components, services, and utilities shared across the application.

## Structure

```
shared/
├── components/          # Reusable UI components
│   ├── header/         # Header component (header.ts, .html, .scss, .spec)
│   └── index.ts        # Barrel export
└── utils/              # Shared utilities (if needed)
```

## Component File Structure

Each component should have these 4 files:

- `*.component.ts` - Component logic
- `*.component.html` - Template
- `*.component.scss` - Styles (using CSS variables from styles.scss)
- `*.component.spec.ts` - Tests

## Example Usage

```typescript
import { HeaderComponent } from '@/app/shared/components';

@Component({
  imports: [HeaderComponent],
})
export class MyComponent {}
```
