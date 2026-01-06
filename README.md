# Schema | Trusted Clients Showcase Component

## Project Overview

Schema is an advanced, data-driven testimonial component that implements sophisticated data visualization and interactive statistics. This component demonstrates enterprise-grade design patterns with animated counters, strategic grid layouts, and performance-optimized animations.

## Live Demo

[Preview Live Demo](https://lefajmofokeng.github.io/Schema)  


## Technical Architecture

### Component Structure
Schema implements a **Bento Grid System** with the following layout:

```
┌─────────────────────────────────────────────────────┐
│       Header: Trust Messaging                       │
├──────────────┬──────────────────────────────────────┤
│  Main Card   │  Stats Card 1                        │
│  (Image BG)  │  (Green)                             │
├──────────────┼──────────────────────────────────────┤
│  Stats Card 2│                                      │
│  (Orange)    │  Text Card                           │
│              │  (Cream)                             │
└──────────────┴──────────────────────────────────────┘
```

### Performance-Optimized Animations

```javascript
// Intersection Observer with debounced animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounters();
        }
    });
}, { 
    threshold: 0.5,
    rootMargin: '50px' // Trigger before fully visible
});
```

### Counter Animation Engine

```javascript
class CounterAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.target = parseInt(element.dataset.target);
        this.duration = options.duration || 2000;
        this.easing = options.easing || 'easeOutCubic';
        this.startTime = null;
    }
    
    animate() {
        const update = (currentTime) => {
            if (!this.startTime) this.startTime = currentTime;
            const elapsed = currentTime - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            const eased = this.easeFunctions[this.easing](progress);
            const currentValue = Math.floor(eased * this.target);
            
            this.element.textContent = currentValue + '+';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    }
    
    easeFunctions = {
        easeOutCubic: t => 1 - Math.pow(1 - t, 3),
        linear: t => t
    };
}
```

## CSS Architecture

### Design Token System

```css
:root {
    /* Color Palette */
    --sd5-bg: #FFFFFF;
    --sd5-text-dark: #111111;
    --sd5-accent-green: #849177;
    --sd5-accent-orange: #F06A49;
    --sd5-accent-cream: #FDF9F3;
    
    /* Typography */
    --sd5-font: 'Inter Tight', sans-serif;
    
    /* Spacing & Layout */
    --sd5-radius: 32px;
    --sd5-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Breakpoints */
    --sd5-breakpoint-mobile: 900px;
}
```

### Responsive Grid Implementation

```css
.sd5-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 15px;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
```

### Advanced Positioning Techniques

```css
.sd5-card-orange {
    width: 50%; /* Creates visual interest */
    position: relative;
    z-index: 1;
}

.sd5-card-text {
    margin-left: calc(36% + 24px); /* Mathematical positioning */
    position: relative;
    z-index: 2;
}
```

## Integration Examples

### React Component Integration

```jsx
import { useEffect, useRef } from 'react';

const SchemaComponent = ({ clients = 10000, stats = [] }) => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        if (containerRef.current) {
            const schema = new Schema(containerRef.current, {
                clients: clients,
                stats: stats,
                animateOnView: true
            });
            return () => schema.destroy();
        }
    }, [clients, stats]);
    
    return <div ref={containerRef} className="schema-container" />;
};
```

### Vue.js Integration

```vue
<template>
  <div ref="schemaContainer" class="schema-wrapper"></div>
</template>

<script>
export default {
  props: {
    clientCount: { type: Number, default: 10000 },
    statistics: { type: Array, default: () => [] }
  },
  mounted() {
    this.instance = new Schema(this.$refs.schemaContainer, {
      clients: this.clientCount,
      stats: this.statistics
    });
  },
  beforeUnmount() {
    this.instance.destroy();
  }
};
</script>
```

### Vanilla JavaScript Usage

```javascript
// Initialize with custom data
const schema = new Schema('#testimonial-section', {
    clients: 15000,
    stats: [
        { value: 120, label: 'Clients', description: 'Industry leaders' },
        { value: 450, label: 'Projects', description: 'Successfully delivered' }
    ],
    theme: 'dark'
});

// Update data dynamically
schema.updateStats({
    clients: 20000,
    stats: [...]
});
```

## Performance Features

### Lazy Loading Strategy

```javascript
// Intersection Observer for component visibility
const lazyLoadSchema = () => {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadSchemaComponent();
                io.unobserve(entry.target);
            }
        });
    });
    
    io.observe(document.querySelector('.schema-placeholder'));
};
```

### Image Optimization

```css
.sd5-card-main {
    background-image: 
        image-set(
            url('image.webp') type('image/webp'),
            url('image.jpg') type('image/jpeg')
        );
    background-size: cover;
    background-position: center;
}
```

## Accessibility Implementation

### ARIA Attributes

```html
<div class="sd5-card sd5-card-stats" 
     role="region" 
     aria-label="Client Statistics">
    <div class="sd5-stat-number" 
         role="status" 
         aria-live="polite"
         data-target="80">0</div>
    <div class="sd5-stat-label">Clients across sectors</div>
</div>
```

### Keyboard Navigation

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.closest('.sd5-card')) {
        e.target.closest('.sd5-card').click();
    }
});
```

## Usage Example

```html
<!-- Implementation in a portfolio section -->
<section class="portfolio-showcase">
    <h2>Project: Client Testimonial Component</h2>
    <div class="component-preview">
        <!-- Schema Component -->
        <div class="schema-wrapper">
            <!-- Component will be injected here -->
        </div>
    </div>
    
    <div class="technical-details">
        <h3>Technical Implementation</h3>
        <ul>
            <li>Intersection Observer for scroll-triggered animations</li>
            <li>CSS Grid for responsive bento layout</li>
            <li>Performance-optimized counter animations</li>
            <li>Accessibility compliant with ARIA labels</li>
        </ul>
    </div>
</section>
```

## License & Usage

MIT Licensed. Commercial use permitted with attribution. Component is designed for easy integration into portfolio sites, marketing pages, and client showcase sections.

---

*Schema demonstrates sophisticated data visualization techniques with performance-optimized animations and responsive grid layouts. The component is production-ready and easily integratable into modern web applications.*
