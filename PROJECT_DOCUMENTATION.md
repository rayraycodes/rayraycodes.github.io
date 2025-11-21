# Regan Maharjan Portfolio Website - Project Documentation

## Project Overview

This is a comprehensive portfolio website for Regan Maharjan, showcasing work across accessibility, education technology, AI systems, and data engineering. The site is built as a modern single-page application using React, TypeScript, and Vite, with a focus on accessibility, performance, and user experience.

### Technical Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router DOM (HashRouter)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Motion (Framer Motion)
- **Content Management**: Centralized content data structure in `src/data/content.ts`

### Key Features

- **Accessibility-First Design**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **Responsive Layout**: Mobile-first design that works across all device sizes
- **Performance Optimized**: Fast loading times with optimized assets and code splitting
- **Content-Driven**: Centralized content management for easy updates
- **Interactive Storytelling**: Rich narrative experiences for impact stories and adventures

---

## What is "Stories of Impact"?

**Stories of Impact** is a dedicated section of the portfolio that tells the human story behind Regan's technical work, particularly focusing on projects that created meaningful change in Nepal and beyond. Unlike the "Projects" page which focuses on technical details, problem-solving approaches, and metrics, "Stories of Impact" emphasizes the **human narrative, community outcomes, and lasting change**.

### Purpose and Philosophy

The "Stories of Impact" section exists to:

1. **Connect Technology to People**: Show how technical work translates into real-world impact for students, teachers, and communities
2. **Tell the Full Story**: Go beyond code and metrics to share the context, challenges, and human experiences
3. **Demonstrate Values**: Illustrate commitment to digital equity, accessibility, and community-centered design
4. **Show Long-Term Impact**: Highlight how systems built years ago continue to serve communities today

### Key Distinctions from "Projects" Page

| Aspect | Projects Page | Stories of Impact |
|--------|--------------|-------------------|
| **Focus** | Technical implementation, problem-solving, metrics | Human stories, community outcomes, lasting change |
| **Tone** | Professional, technical, achievement-oriented | Narrative, reflective, community-centered |
| **Structure** | Problem → Approach → Solution → Result | Personal reflection → What was built → Impact today |
| **Metrics** | Technical metrics (users, performance, adoption) | Community impact (students reached, schools served, years of service) |
| **Content Style** | Case study format | Storytelling format |

### Content Structure

Each story in "Stories of Impact" includes:

1. **Title & Excerpt**: A compelling headline and brief teaser
2. **Date**: When the work took place
3. **Icon & Theme**: Visual categorization (Globe, BookOpen, Heart, Laptop, Users, Zap)
4. **Description**: Personal narrative about the work and its context
5. **What I Built**: Bulleted list of key technical contributions
6. **Impact Today**: Reflection on how the work continues to create value
7. **Impact by Numbers** (for featured stories): Quantifiable community outcomes

### Featured Stories

The section currently includes 8 stories:

1. **Building Technology for Learning and Equity in Nepal** (Featured)
   - Main story with comprehensive stats
   - Covers 7 years of work with OLE Nepal
   - 300,000+ students reached, 700+ modules converted

2. **Community Leadership and Accessible Learning through Rotaract and Rotary**
   - Early community work and volunteer coordination
   - 100+ audiobooks produced for accessible learning

3. **E-Pustakalaya: National Digital Library**
   - Modernization of Nepal's digital library
   - Still active today with offline mirrors across the country

4. **Offline Learning During COVID-19**
   - Critical response to school closures
   - 700+ modules converted to offline packages
   - Deployed to 200+ schools during lockdown

5. **OCR + TTS for Visually Impaired Students**
   - Nepal's first OCR and text-to-speech system
   - Expanded into larger accessible content pipeline

6. **E-Paath Interactive Learning**
   - Nepal's first digital learning platform for grades 1-8
   - Still widely used in public schools

7. **Technical Infrastructure for Rural Schools**
   - Building systems that work in real conditions
   - Many school servers still running years later

8. **Teacher Training & Human-Centered Design**
   - Supporting educators across districts
   - Ensuring technology actually gets used

### Technical Implementation

The "Stories of Impact" section is implemented in `src/components/pages/Impact.tsx`:

- **Component**: `Impact` functional component using React hooks
- **State Management**: `useState` for selected story navigation
- **Animations**: Framer Motion for smooth transitions and entrance animations
- **Layout**: Responsive grid that adapts from 1 column (mobile) to 3 columns (desktop)
- **Content Source**: Centralized data from `src/data/content.ts` under `contentData.impact`

#### Key Features:

1. **Story Grid View**: Displays all stories as clickable cards with thumbnails
2. **Story Detail View**: Full narrative experience when a story is selected
3. **Theme-Based Styling**: Each story has a color theme (blue, green, purple, indigo, teal, orange)
4. **Image Support**: Stories can include images to illustrate the work
5. **Stats Display**: Featured stories show impact metrics in a grid layout
6. **Call-to-Action**: Connect section at the bottom for engagement

### Design Philosophy

The design emphasizes:

- **Readability**: Large, clear typography optimized for reading long-form content
- **Visual Hierarchy**: Clear distinction between story cards and detail views
- **Emotional Connection**: Use of imagery, gradients, and thoughtful spacing
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
- **Performance**: Lazy loading, optimized images, smooth animations

### Content Management

All content is managed in `src/data/content.ts` under the `impact` key:

```typescript
"impact": {
  "hero": {
    "title": "Stories of Impact",
    "subtitle": "A collection of stories "
  },
  "stories": [
    // Array of story objects
  ],
  "labels": {
    // UI labels for internationalization
  }
}
```

This centralized approach allows for:
- Easy content updates without touching component code
- Potential future internationalization
- Consistent content structure
- Version control for content changes

### User Experience Flow

1. **Landing**: User arrives at `/impact` route
2. **Overview**: Sees hero section with title and subtitle
3. **Browse**: Scrolls through grid of story cards
4. **Explore**: Clicks a story card to read full narrative
5. **Engage**: Reads detailed story with images, work items, and impact reflection
6. **Connect**: Sees call-to-action to reach out or learn more
7. **Return**: Can navigate back to browse other stories

---

## Project Architecture

### File Structure

```
src/
├── components/
│   ├── pages/
│   │   ├── Impact.tsx          # Stories of Impact page
│   │   ├── StoriesOfAdventure.tsx
│   │   ├── Projects.tsx
│   │   └── ...
│   ├── ui/                     # Reusable UI components
│   └── ...
├── data/
│   └── content.ts              # Centralized content data
├── utils/
│   └── imageUtils.ts           # Image handling utilities
└── App.tsx                     # Main app with routing
```

### Routing

The site uses HashRouter for GitHub Pages compatibility:

- `/` - Home page
- `/impact` - Stories of Impact (this section)
- `/projects` - Technical projects showcase
- `/storiesofadventure` - Personal adventure stories
- `/about` - About page
- `/experience` - Professional experience
- `/accessibility` - Accessibility work details
- `/photography` - Photography portfolio
- `/contact` - Contact form

### Content Strategy

The portfolio uses a two-pronged approach:

1. **Projects Page**: Technical showcase for recruiters, clients, and technical audiences
2. **Stories of Impact**: Narrative showcase for understanding values, community impact, and long-term outcomes

This dual approach allows the portfolio to serve different audiences while maintaining authenticity and depth.

---

## Development

### Getting Started

```bash
npm install
npm run dev
```

### Building for Production

```bash
npm run build
```

### Key Dependencies

- React & React DOM for UI
- React Router DOM for navigation
- Motion (Framer Motion) for animations
- Radix UI for accessible component primitives
- Tailwind CSS for styling
- Lucide React for icons

---

## Future Enhancements

Potential improvements for the Stories of Impact section:

1. **Search/Filter**: Allow filtering stories by theme, date, or impact area
2. **Video Content**: Support for embedded videos showing the work in action
3. **Testimonials**: Quotes from teachers, students, or community members
4. **Timeline View**: Visual timeline showing the progression of impact over time
5. **Related Stories**: Cross-linking between related stories
6. **Share Functionality**: Social sharing for individual stories
7. **Multilingual Support**: Translations for Nepali and other languages

---

## Conclusion

"Stories of Impact" represents a commitment to telling the full story of technical work—not just what was built, but why it matters, who it serves, and how it continues to create value. It bridges the gap between technical achievement and human outcomes, demonstrating that the most meaningful work happens at the intersection of technology, empathy, and community.

This section serves as a reminder that behind every line of code, every system architecture decision, and every technical solution, there are real people whose lives are improved, whose access is expanded, and whose opportunities are created. It's this human-centered perspective that makes "Stories of Impact" a unique and valuable part of the portfolio.

