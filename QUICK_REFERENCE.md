# SkillSync Design System - Quick Reference

## 🎨 Color Variables
```css
/* Use these CSS variables instead of hardcoded colors */
--primary: #4A90E2        /* Main actions, buttons */
--secondary: #2AB7A9      /* Secondary actions, navigation */
--background: #F8FAFC     /* Page backgrounds */
--foreground: #1E293B     /* Main text */
--card: #FFFFFF          /* Card backgrounds */
--muted: #F8FAFC        /* Muted backgrounds */
--muted-foreground: #64748B /* Secondary text */
--accent: #F4D35E       /* Highlights, status */
--success: #3FB984       /* Success states */
--destructive: #E76F51   /* Errors, warnings */
--border: #E2E8F0       /* Borders, dividers */
```

## 📝 Typography Classes
```css
.text-h1     /* 28px, Bold, Main titles */
.text-h2     /* 22px, Semibold, Section titles */
.text-h3     /* 18px, Semibold, Subsection titles */
.text-body   /* 16px, Regular, Main content */
.text-body-sm /* 14px, Regular, Secondary content */
.text-small  /* 12px, Regular, Labels, metadata */
```

## 🧩 Component Classes

### Cards
```jsx
<Card className="skillsync-card skillsync-fade-in">
  <CardHeader>
    <CardTitle className="text-h3">Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Buttons
```jsx
<Button className="skillsync-btn-primary">Primary Action</Button>
<Button className="skillsync-btn-secondary">Secondary Action</Button>
```

### Form Inputs
```jsx
<Input className="skillsync-input" />
<textarea className="skillsync-input min-h-[100px]" />
```

### Badges
```jsx
<Badge className="skillsync-badge">Default</Badge>
<Badge className="skillsync-badge-success">Success</Badge>
<Badge className="skillsync-badge-error">Error</Badge>
```

### Navigation
```jsx
<a className="skillsync-nav-link">Link</a>
<a className="skillsync-nav-link active">Active Link</a>
```

## 🎭 Animation Classes
```css
.skillsync-fade-in      /* Fade in with upward movement */
.skillsync-slide-in     /* Slide in from left */
.skillsync-scale-in     /* Scale in effect */
.skillsync-stagger-1    /* 0.1s delay */
.skillsync-stagger-2    /* 0.2s delay */
.skillsync-stagger-3    /* 0.3s delay */
.skillsync-stagger-4    /* 0.4s delay */
```

## 📏 Spacing Classes
```css
.skillsync-spacing-xs   /* 4px margin */
.skillsync-spacing-sm   /* 8px margin */
.skillsync-spacing-md   /* 16px margin */
.skillsync-spacing-lg   /* 24px margin */
.skillsync-spacing-xl   /* 32px margin */

.skillsync-padding-xs   /* 4px padding */
.skillsync-padding-sm   /* 8px padding */
.skillsync-padding-md   /* 16px padding */
.skillsync-padding-lg   /* 24px padding */
.skillsync-padding-xl   /* 32px padding */
```

## 🚀 Quick Implementation

### 1. Update Background
```jsx
// Before
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">

// After
<div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
```

### 2. Update Text Colors
```jsx
// Before
<h1 className="text-4xl font-bold text-gray-900">

// After
<h1 className="text-h1" style={{ color: 'var(--foreground)' }}>
```

### 3. Update Cards
```jsx
// Before
<Card className="hover:shadow-lg transition-all duration-300">

// After
<Card className="skillsync-card skillsync-fade-in">
```

### 4. Update Buttons
```jsx
// Before
<Button className="bg-blue-600 hover:bg-blue-700">

// After
<Button className="skillsync-btn-primary">
```

### 5. Update Form Elements
```jsx
// Before
<Input className="border border-gray-300 focus:border-blue-500" />

// After
<Input className="skillsync-input" />
```

## 🔄 Migration Checklist

- [ ] Replace hardcoded colors with CSS variables
- [ ] Update typography classes to use new scale
- [ ] Apply `skillsync-card` class to all cards
- [ ] Update button classes to use new system
- [ ] Apply `skillsync-input` to all form elements
- [ ] Add appropriate animation classes
- [ ] Update spacing to use consistent system
- [ ] Test dark mode compatibility
- [ ] Verify accessibility contrast ratios

## 📱 Responsive Patterns
```jsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="skillsync-card">Content</Card>
</div>

// Consistent spacing
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
</div>
```

## 🎯 Common Patterns

### Page Header
```jsx
<div className="text-center mb-8 skillsync-fade-in">
  <h1 className="text-h1 mb-4 gradient-text">Page Title</h1>
  <p className="text-body max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
    Page description
  </p>
</div>
```

### Card Grid
```jsx
<div className="grid lg:grid-cols-3 gap-8">
  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1">
    {/* Card content */}
  </Card>
  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2">
    {/* Card content */}
  </Card>
  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3">
    {/* Card content */}
  </Card>
</div>
```

### Form Section
```jsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="field" style={{ color: 'var(--foreground)' }}>Label</Label>
    <Input id="field" className="skillsync-input" />
  </div>
</div>
```

## ⚡ Performance Tips

- Use CSS variables for dynamic theming
- Apply animations only to visible elements
- Use `will-change` sparingly for complex animations
- Optimize images and icons for web
- Minimize CSS bundle size by removing unused styles

## 🔍 Debugging

### Check CSS Variables
```jsx
// In browser console
getComputedStyle(document.documentElement).getPropertyValue('--primary')
```

### Verify Classes
```jsx
// Check if classes are applied
element.classList.contains('skillsync-card')
```

### Test Dark Mode
```jsx
// Toggle dark mode class
document.documentElement.classList.toggle('dark')
```

---

**Remember**: Consistency is key! Always use the design system classes and avoid hardcoded values.
