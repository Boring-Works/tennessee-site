# Card Component Library

Reusable card components for consistent styling across Tennessee Starts Here.

## Components

### Card

Base card wrapper with three visual variants.

```tsx
import { Card } from '@/components/Card'

;<Card variant="default" hover>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

#### Props

| Prop        | Type                                  | Default     | Description            |
| ----------- | ------------------------------------- | ----------- | ---------------------- |
| `variant`   | `'default' \| 'featured' \| 'subtle'` | `'default'` | Visual style variant   |
| `hover`     | `boolean`                             | `false`     | Enable hover effect    |
| `children`  | `ReactNode`                           | required    | Card content           |
| `className` | `string`                              | `''`        | Additional CSS classes |
| `as`        | `'div' \| 'article' \| 'section'`     | `'div'`     | HTML element to render |

#### Variants

**Default** - Standard content cards

- White background
- Subtle border and shadow
- Use for: Event cards, lecture cards, general content

**Featured** - Highlighted content

- Primary color (dark blue) background
- White text
- Texture overlay
- Use for: CTAs, featured events, primary actions

**Subtle** - Supporting content

- Cream background
- Accent color left border
- Minimal elevation
- Use for: Secondary info, notes, supporting details

### CardGrid

Responsive grid container for card collections.

```tsx
import { Card, CardGrid } from '@/components/Card'

;<CardGrid columns={3} gap="md">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</CardGrid>
```

#### Props

| Prop        | Type                   | Default  | Description                  |
| ----------- | ---------------------- | -------- | ---------------------------- |
| `columns`   | `2 \| 3 \| 4`          | `3`      | Number of columns on desktop |
| `gap`       | `'sm' \| 'md' \| 'lg'` | `'md'`   | Space between cards          |
| `children`  | `ReactNode`            | required | Grid content                 |
| `className` | `string`               | `''`     | Additional CSS classes       |

#### Gap Sizes

- `sm` - 1rem (16px)
- `md` - 1.25rem mobile, 1.5rem desktop (20-24px)
- `lg` - 1.5rem mobile, 2rem desktop (24-32px)

## Column Recommendations

### By Content Type

| Content Type       | Recommended Columns |
| ------------------ | ------------------- |
| Event cards        | 2                   |
| Lecture cards      | 2                   |
| Visit info cards   | 3                   |
| Feature highlights | 3                   |
| Stats/metrics      | 4                   |
| Historical figures | 3                   |

### Responsive Behavior

All grids are **single column on mobile** (< 768px), expanding to the configured column count on desktop.

## Usage Examples

### Event Cards (2 columns)

```tsx
<CardGrid columns={2} gap="lg">
  {events.map((event) => (
    <Card variant="default" hover key={event.id}>
      <h3>{event.title}</h3>
      <time>{event.date}</time>
      <p>{event.description}</p>
    </Card>
  ))}
</CardGrid>
```

### Featured CTA

```tsx
<Card variant="featured" className="my-custom-class">
  <h2>Join Us for America 250</h2>
  <p>Experience living history...</p>
  <button>Get Tickets</button>
</Card>
```

### Info Blocks (3 columns)

```tsx
<CardGrid columns={3} gap="md">
  <Card variant="subtle">
    <strong>Hours</strong>
    <p>Mon-Sat: 10am-6pm</p>
  </Card>
  <Card variant="subtle">
    <strong>Admission</strong>
    <p>$8 Adults, $5 Students</p>
  </Card>
  <Card variant="subtle">
    <strong>Location</strong>
    <p>200 Hyder Hill Road</p>
  </Card>
</CardGrid>
```

## Design Tokens

The Card system uses CSS custom properties for consistency:

```css
--card-padding: 1.5rem (2rem desktop) --card-radius: 2px --card-transition: 0.3s ease;
```

## Accessibility

- Semantic HTML elements via `as` prop
- Focus-visible styles
- Reduced motion support
- Proper heading hierarchy

## Best Practices

1. **Use semantic elements** - Pass `as="article"` for event cards, `as="section"` for content blocks
2. **Enable hover for clickable cards** - Add `hover` prop when card is interactive
3. **Choose appropriate variants** - Default for content, Featured for CTAs, Subtle for supporting info
4. **Respect column recommendations** - More columns = smaller cards, use wisely
5. **Maintain heading hierarchy** - Don't skip heading levels inside cards

## Migration Guide

When refactoring existing pages to use Card components:

1. Identify repeated card patterns
2. Replace custom CSS with Card component
3. Extract grid layouts to CardGrid
4. Test responsive behavior
5. Verify hover states
6. Check accessibility

## Related Components

- `HeroSection` - Page hero sections
- `FinalCTA` - Page closing CTAs
- Custom event/lecture card components (use Card as wrapper)
