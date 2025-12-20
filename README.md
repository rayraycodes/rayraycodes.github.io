# Regan Maharjan Portfolio Website

A modern, accessible portfolio website built with React, TypeScript, and Vite. This project showcases work, stories of impact, adventures, photography, and more through a beautiful, responsive interface.

**Original Design:** [Figma Design](https://www.figma.com/design/5mIwsMzBMF9bvvj9PrAFOF/Regan-Maharjan-Portfolio-Website)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rayraycodes/rayraycodes.github.io.git
   cd rayraycodes.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The site will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

   The production build will be in the `build/` directory.

## 📁 Project Structure

```
rayraycodes.github.io/
├── src/
│   ├── components/          # React components
│   │   ├── pages/          # Page components
│   │   ├── ui/             # Reusable UI components (shadcn/ui)
│   │   ├── branding/       # Branding components (logo, etc.)
│   │   ├── decorative/     # Decorative elements (prayer flags, silhouettes)
│   │   ├── photogallery/   # Photo gallery components
│   │   └── figma/          # Figma-specific components
│   ├── data/               # Content data (stories, projects, etc.)
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main app component with routing
│   └── main.tsx            # Entry point
├── public/                  # Static assets
├── build/                   # Production build output
└── package.json             # Dependencies and scripts
```

## 🧩 Component Architecture

### Core Components

#### **Pages** (`src/components/pages/`)
Main page components that represent different sections of the site:

- **Home.tsx** - Landing page with hero section
- **About.tsx** - About page
- **Experience.tsx** - Work experience timeline
- **Projects.tsx** - Projects listing page
- **ProjectDetail.tsx** - Individual project detail page
- **Impact.tsx** - Stories of Impact listing
- **StoryDetail.tsx** - Individual impact story detail
- **StoriesOfAdventure.tsx** - Adventure stories listing with category filters
- **StoryOfAdventureDetail.tsx** - Individual adventure story detail
- **Photography.tsx** - Photography gallery
- **Contact.tsx** - Contact page
- **Accessibility.tsx** - Accessibility information
- **CMS.tsx** - Content management interface

#### **UI Components** (`src/components/ui/`)
Reusable UI components built with Radix UI and styled with Tailwind CSS:

- **button.tsx** - Button component with variants
- **card.tsx** - Card container component
- **dialog.tsx** - Modal dialogs
- **InstagramFrame.tsx** - Instagram-style image frame
- And 40+ other components from shadcn/ui

#### **Layout Components**

- **Navigation.tsx** - Main navigation bar
- **Footer.tsx** - Site footer
- **LogoMark.tsx** - Logo component

#### **Decorative Components** (`src/components/decorative/`)

- **PrayerFlags.tsx** - Tibetan prayer flags SVG component
- **HimalayanSilhouette.tsx** - Mountain silhouette SVG

#### **Photo Gallery** (`src/components/photogallery/`)

- **PhotoGallery.tsx** - Main photo gallery component
- **PhotoGrid.tsx** - Grid layout for photos
- **types.ts** - TypeScript types for gallery

### Content Management

All content is centralized in **`src/data/content.ts`**. This file contains:

- Navigation links
- Home page content
- Projects data
- Impact stories
- Adventure stories
- Photography gallery
- Contact information
- Labels and translations

## 🎨 Customization Guide

### Adding a New Story of Impact

1. Open `src/data/content.ts`
2. Find the `impact.stories` array
3. Add a new story object:

```typescript
{
  "id": "unique-story-id",
  "title": "Story Title",
  "excerpt": "Brief description",
  "date": "2024",
  "icon": "Heart", // Options: Globe, BookOpen, Heart, Laptop, Zap, Users
  "theme": "blue", // Options: blue, green, purple, indigo, teal, orange
  "content": {
    "description": "Full story description",
    "work": [
      "What you did 1",
      "What you did 2"
    ],
    "impact": "The impact this story created",
    "images": ["/path/to/image.jpg"], // Optional
    "hasStats": false, // Optional
    "stats": [ // Optional, only if hasStats is true
      { "value": "100", "label": "Students Reached" }
    ]
  }
}
```

### Adding a New Adventure Story

1. Open `src/data/content.ts`
2. Find the `storiesOfAdventure.stories` array
3. Add a new story:

```typescript
{
  "id": "unique-story-id",
  "title": "Adventure Title",
  "excerpt": "Brief description",
  "date": "Dec 2025",
  "icon": "Heart",
  "theme": "green", // Maps to category: green=National Parks, blue=Mountains, etc.
  "content": {
    "description": "Story description (can be string or array of paragraphs)",
    "work": ["Activity 1", "Activity 2"],
    "impact": "Reflection on the experience",
    "images": [
      {
        "url": "/assets/path/to/image.jpg",
        "alt": "Image description",
        "caption": "Optional caption"
      }
    ]
  }
}
```

**Theme Categories:**
- `blue` → Mountains
- `green` → National Parks
- `purple` → Lakes & Water
- `indigo` → Forests
- `teal` → Seasons
- `orange` → Cycling
- `red` → Running

### Adding a New Project

1. Open `src/data/content.ts`
2. Find the `projects.projects` array
3. Add a new project:

```typescript
{
  "id": "unique-project-id",
  "title": "Project Title",
  "excerpt": "Brief description",
  "thumbnail": "/path/to/thumbnail.jpg",
  "tags": ["React", "TypeScript"],
  "content": {
    "problem": "The challenge",
    "approach": "How you approached it",
    "solution": "Technical solution",
    "result": "Outcome achieved"
  },
  "links": {
    "demo": "https://demo-url.com", // Optional
    "repo": "https://github.com/repo" // Optional
  }
}
```

### Updating Navigation

Edit `src/data/content.ts` → `navigation.links` array:

```typescript
{
  "path": "/your-path",
  "label": "Your Label"
}
```

### Changing Site Name

Edit `src/data/content.ts` → `navigation.siteName`

### Adding Images

1. Place images in `public/assets/` or `src/assets/`
2. Reference them in content as `/assets/your-image.jpg`
3. For build, images are automatically copied to `build/assets/`

## 🎯 Key Features

### Story Management
- **Stories of Impact**: Showcase meaningful work and projects
- **Stories of Adventure**: Share travel and adventure experiences
- Category filtering for adventure stories
- Related stories suggestions on detail pages

### Photo Gallery
- Responsive grid layout
- Image optimization
- Caption support

### Accessibility
- WCAG 2.1 compliant
- Keyboard navigation
- Screen reader support
- Semantic HTML

### Performance
- Vite for fast builds
- Code splitting
- Optimized asset loading
- Lazy loading images

### SEO
- Meta tags management
- Open Graph tags
- Twitter Card support
- Semantic HTML structure

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons

## 📝 Content Management System

The site includes a built-in CMS at `/cms` route that allows you to:
- View all content
- Edit content directly in the browser
- Save changes to `content.ts`

**Note:** CMS changes are saved locally. For production, edit `src/data/content.ts` directly.

## 🚢 Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment:

1. Push code to `master` branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://yourusername.github.io`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build/` directory to your hosting service

## 🎨 Styling

The project uses Tailwind CSS with custom configuration. Key styling features:

- **Design System**: Consistent spacing, colors, and typography
- **Dark Mode Support**: Built-in theme switching (if configured)
- **Responsive Design**: Mobile-first approach
- **Custom Utilities**: Project-specific utility classes

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: Default
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

## 🔧 Development Tips

### Hot Reload
Changes to components and styles will hot-reload automatically.

### Content Updates
Changes to `content.ts` require a page refresh to see updates.

### Image Optimization
- Use optimized images (WebP, compressed JPG)
- Place images in `public/assets/` for static serving
- Use `getImageUrl()` utility for dynamic image paths

### TypeScript
The project is fully typed. If you add new content structures, update the TypeScript interfaces in the relevant component files.

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal portfolio website. For questions or suggestions, please open an issue or contact the owner.

## 📞 Support

For issues or questions:
1. Check existing issues on GitHub
2. Review the code comments
3. Contact through the site's contact page

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
