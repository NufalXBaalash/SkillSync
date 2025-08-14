# SkillSync Design System

## Overview
The SkillSync Design System provides a cohesive, professional, and growth-oriented visual language that guides users confidently through career development. Built with accessibility, scalability, and modern UX principles in mind.

## Brand Vibe
- **Professional**: Clean, trustworthy interface for career-focused users
- **Calm**: Soothing colors that reduce cognitive load during skill assessment
- **Modern**: Contemporary design patterns and interactions
- **Trustworthy**: Consistent, reliable visual elements
- **Growth-Oriented**: Forward-looking design that inspires career advancement
- **AI-Driven**: Subtle tech elements that suggest intelligent capabilities

## Color Palette

### Primary Colors
| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| Primary | Soft Blue | `#4A90E2` | Main action buttons, highlights, links |
| Secondary | Calming Teal | `#2AB7A9` | Secondary actions, navigation, accents |
| Background | Off-White | `#F8FAFC` | Page backgrounds, clean and airy feel |
| Card | White | `#FFFFFF` | Dashboard widgets, content cards |

### Text Colors
| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| Primary Text | Dark Slate | `#1E293B` | Main readable text, headings |
| Secondary Text | Muted Gray | `#64748B` | Labels, helper text, placeholders |

### Accent Colors
| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| Accent | Soft Warm Yellow | `#F4D35E` | Key highlights, status indicators |
| Success | Fresh Green | `#3FB984` | Completed tasks, success states |
| Error | Soft Red | `#E76F51` | Warnings, errors (not harsh) |

### Dark Mode Colors
| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| Background | Deep Blue | `#0F172A` | Dark mode page backgrounds |
| Card | Slate | `#1E293B` | Dark mode card backgrounds |
| Primary | Light Blue | `#60A5FA` | Dark mode primary actions |
| Secondary | Light Teal | `#34D399` | Dark mode secondary actions |

## Typography

### Font Stack
```css
--font-sans: 'Inter', 'Lato', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Type Scale
| Element | Size | Line Height | Weight | Letter Spacing |
|---------|------|-------------|---------|----------------|
| H1 | 28px | 1.2 | 700 (Bold) | -0.02em |
| H2 | 22px | 1.3 | 600 (Semibold) | -0.01em |
| H3 | 18px | 1.4 | 600 (Semibold) | -0.01em |
| Body | 16px | 1.6 | 400 (Regular) | Normal |
| Body Small | 14px | 1.5 | 400 (Regular) | Normal |
| Small | 12px | 1.4 | 400 (Regular) | Normal |

### CSS Classes
```css
.text-h1 { /* H1 styles */ }
.text-h2 { /* H2 styles */ }
.text-h3 { /* H3 styles */ }
.text-body { /* Body styles */ }
.text-body-sm { /* Body small styles */ }
.text-small { /* Small text styles */ }
```

## Component System

### Cards
```css
.skillsync-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.skillsync-card:hover {
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

**Usage**: Apply to all content containers, dashboard widgets, and information panels.

### Buttons

#### Primary Button
```css
.skillsync-btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: var(--radius);
  padding: 12px 24px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 8px rgba(74, 144, 226, 0.2);
}
```

**Usage**: Main call-to-action buttons, primary actions, form submissions.

#### Secondary Button
```css
.skillsync-btn-secondary {
  background: transparent;
  color: var(--secondary);
  border: 2px solid var(--secondary);
  border-radius: var(--radius);
  padding: 12px 24px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}
```

**Usage**: Secondary actions, alternative options, outline-style buttons.

### Form Elements

#### Input Fields
```css
.skillsync-input {
  background: var(--input);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}

.skillsync-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  outline: none;
}
```

**Usage**: Text inputs, textareas, search fields, form controls.

### Navigation

#### Navigation Links
```css
.skillsync-nav-link {
  color: var(--muted-foreground);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius);
  transition: all 0.2s ease-in-out;
}

.skillsync-nav-link:hover {
  color: var(--foreground);
  background: var(--muted);
}

.skillsync-nav-link.active {
  color: var(--primary);
  background: rgba(74, 144, 226, 0.1);
}
```

**Usage**: Navigation menus, tab triggers, breadcrumbs.

### Badges

#### Default Badge
```css
.skillsync-badge {
  background: var(--accent);
  color: var(--accent-foreground);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
}
```

#### Success Badge
```css
.skillsync-badge-success {
  background: var(--success);
  color: var(--success-foreground);
}
```

#### Error Badge
```css
.skillsync-badge-error {
  background: var(--destructive);
  color: var(--destructive-foreground);
}
```

**Usage**: Status indicators, skill tags, priority levels, category labels.

## Spacing System

### Margin Classes
```css
.skillsync-spacing-xs { margin: 4px; }
.skillsync-spacing-sm { margin: 8px; }
.skillsync-spacing-md { margin: 16px; }
.skillsync-spacing-lg { margin: 24px; }
.skillsync-spacing-xl { margin: 32px; }
```

### Padding Classes
```css
.skillsync-padding-xs { padding: 4px; }
.skillsync-padding-sm { padding: 8px; }
.skillsync-padding-md { padding: 16px; }
.skillsync-padding-lg { padding: 24px; }
.skillsync-padding-xl { padding: 32px; }
```

### Layout Guidelines
- **Outer page padding**: 24-32px
- **Between cards**: 16-20px
- **Inside cards**: 16px
- **Component spacing**: 8px, 16px, 24px, 32px

## Animation System

### Fade In
```css
.skillsync-fade-in {
  animation: skillsyncFadeIn 0.6s ease-out forwards;
}
```

### Slide In
```css
.skillsync-slide-in {
  animation: skillsyncSlideIn 0.6s ease-out forwards;
}
```

### Scale In
```css
.skillsync-scale-in {
  animation: skillsyncScaleIn 0.4s ease-out forwards;
}
```

### Staggered Animations
```css
.skillsync-stagger-1 { animation-delay: 0.1s; }
.skillsync-stagger-2 { animation-delay: 0.2s; }
.skillsync-stagger-3 { animation-delay: 0.3s; }
.skillsync-stagger-4 { animation-delay: 0.4s; }
```

### Animation Guidelines
- **Duration**: 200-300ms for micro-interactions, 600ms for page elements
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural movement
- **Hover Effects**: Subtle scaling (translateY(-2px)) and shadow changes
- **Transitions**: Smooth color changes, border updates, and shadow adjustments

## Layout Patterns

### Dashboard Grid
```css
.grid lg:grid-cols-3 gap-8
```
- **Left**: Navigation or sidebar content
- **Center**: Main content area
- **Right**: Supporting information or actions

### Card Layout
```css
.skillsync-card {
  /* Card styling */
}
```
- **Header**: Title and description with consistent spacing
- **Content**: Main content with proper padding
- **Footer**: Actions or additional information (when needed)

### Form Layout
```css
.space-y-4 /* Consistent spacing between form elements */
```
- **Labels**: Above inputs for better readability
- **Inputs**: Full-width with consistent styling
- **Validation**: Error states with destructive colors
- **Actions**: Primary button for submission, secondary for alternatives

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```css
/* Base styles for mobile */
.text-h1 { font-size: 24px; }

/* Tablet and up */
@media (min-width: 768px) {
  .text-h1 { font-size: 28px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .text-h1 { font-size: 32px; }
}
```

## Accessibility

### Color Contrast
- **Primary text**: 4.5:1 minimum contrast ratio
- **Secondary text**: 3:1 minimum contrast ratio
- **Interactive elements**: 3:1 minimum contrast ratio

### Focus States
- **Visible focus**: 3px outline with primary color
- **Focus indicators**: Clear visual feedback for keyboard navigation
- **Hover states**: Additional visual feedback for mouse users

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA labels**: Descriptive labels for interactive elements
- **Alt text**: Meaningful descriptions for images and icons

## Implementation Examples

### Basic Card
```jsx
<Card className="skillsync-card skillsync-fade-in">
  <CardHeader>
    <CardTitle className="text-h3">Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-body">Card content goes here</p>
  </CardContent>
</Card>
```

### Primary Button
```jsx
<Button className="skillsync-btn-primary">
  Click Me
</Button>
```

### Form Input
```jsx
<div className="space-y-2">
  <Label htmlFor="email" style={{ color: 'var(--foreground)' }}>
    Email Address
  </Label>
  <Input
    id="email"
    type="email"
    className="skillsync-input"
    placeholder="Enter your email"
  />
</div>
```

### Navigation
```jsx
<nav className="skillsync-nav">
  <a href="/dashboard" className="skillsync-nav-link active">
    Dashboard
  </a>
  <a href="/assessment" className="skillsync-nav-link">
    Assessment
  </a>
</nav>
```

## Best Practices

### Do's
- ✅ Use consistent spacing with the spacing system
- ✅ Apply appropriate typography classes for text hierarchy
- ✅ Use semantic colors for different states (success, error, warning)
- ✅ Implement smooth animations for better user experience
- ✅ Maintain consistent border radius and shadows

### Don'ts
- ❌ Don't use hardcoded colors - always use CSS variables
- ❌ Don't skip hover states for interactive elements
- ❌ Don't use inconsistent spacing - stick to the spacing system
- ❌ Don't forget about dark mode compatibility
- ❌ Don't use animations that are too fast or jarring

## Future Enhancements

### Planned Features
- **Component Library**: React component library with Storybook
- **Design Tokens**: JSON-based design tokens for better integration
- **Theme Switching**: Advanced theme customization options
- **Animation Library**: Extended animation presets and combinations
- **Accessibility Tools**: Automated accessibility checking and improvements

### Maintenance
- **Regular Reviews**: Monthly design system audits
- **User Feedback**: Gather feedback on design consistency
- **Performance**: Monitor and optimize CSS bundle size
- **Documentation**: Keep this guide updated with new patterns

---

*This design system is living documentation and will be updated as the application evolves.*
