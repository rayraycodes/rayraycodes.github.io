import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Globe, BookOpen, Laptop, Users, Zap, Calendar, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import contentData from '../../data/content';
import { getImageUrl } from '../../utils/imageUtils';

// Category Filter Bar Component
interface CategoryFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilterBar({ categories, selectedCategory, onCategoryChange }: CategoryFilterBarProps) {
  const categoryLabels: Record<string, string> = {
    'All': 'All',
    'blue': 'Mountains',
    'green': 'National Parks',
    'purple': 'Lakes & Water',
    'indigo': 'Forests',
    'teal': 'Seasons',
    'orange': 'Cycling',
    'red': 'Running',
  };

  return (
    <nav aria-label="Adventure categories" className="mb-8">
      <ul className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide" role="list">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <li key={category} role="listitem">
              <button
                type="button"
                onClick={() => onCategoryChange(category)}
                aria-pressed={isSelected}
                aria-current={isSelected ? 'page' : undefined}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isSelected
                    ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                {categoryLabels[category] || category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const iconMap: Record<string, typeof Globe> = {
  'Globe': Globe,
  'BookOpen': BookOpen,
  'Heart': Heart,
  'Laptop': Laptop,
  'Zap': Zap,
  'Users': Users,
};

interface StoryImage {
  url: string;
  alt: string;
  caption: string;
}

interface Story {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  date: string;
  icon: typeof Globe;
  theme: 'blue' | 'green' | 'purple' | 'indigo' | 'teal' | 'orange' | string;
  content: {
    description: string;
    work: string[];
    impact: string;
    images?: (string | StoryImage)[];
    hasStats?: boolean;
    stats?: Array<{ value: string; label: string }>;
  };
}

export function StoriesOfAdventure() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { hero, stories: storiesData, labels } = contentData.storiesOfAdventure;
  const { images } = contentData.assets;
  
  // Extract unique themes from stories
  const categories = useMemo(() => {
    const uniqueThemes = new Set(storiesData.map(story => story.theme));
    return ['All', ...Array.from(uniqueThemes).sort()];
  }, [storiesData]);

  // Helper function to extract year from date string for sorting
  const extractYear = (dateStr: string): number => {
    // Handle formats like "Dec 2025", "2024", "2023-2024"
    const yearMatch = dateStr.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      return parseInt(yearMatch[1], 10);
    }
    // Fallback for dates without year
    return 0;
  };

  // Filter stories based on selected category
  const filteredStories = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? storiesData 
      : storiesData.filter(story => story.theme === selectedCategory);
    
    // Sort by date (newest first)
    return [...filtered].sort((a, b) => {
      const yearA = extractYear(a.date);
      const yearB = extractYear(b.date);
      // If same year, check for month (Dec 2025 > 2024)
      if (yearA === yearB) {
        // If one has month prefix (like "Dec 2025"), prioritize it
        if (a.date.includes('Dec') && !b.date.includes('Dec')) return -1;
        if (!a.date.includes('Dec') && b.date.includes('Dec')) return 1;
        return 0;
      }
      return yearB - yearA; // Descending order (newest first)
    });
  }, [storiesData, selectedCategory]);
  
  // Map stories with icons and thumbnails
  const stories: Story[] = filteredStories.map((story): Story => {
    // Use first image as thumbnail, or fallback to impact images
    const storyImages = story.content.images || [];
    const firstImage = storyImages.length > 0 
      ? (typeof storyImages[0] === 'string' ? storyImages[0] : storyImages[0].url)
      : null;
    const thumbnail = firstImage || (story.id === 'himalayan-trek' || story.id === 'redwood-forests'
          ? images.impact.mountainVillage 
          : images.impact.ruralSchool);
    
    return {
      ...story,
      icon: iconMap[story.icon] || Globe,
      thumbnail,
      theme: story.theme as 'blue' | 'green' | 'purple' | 'indigo' | 'teal' | 'orange',
      content: {
        ...story.content,
        work: [...story.content.work], // Convert readonly array to mutable
        images: storyImages.length > 0 ? storyImages : undefined,
      },
    };
  });

  const themeColors = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-200',
    green: 'from-green-500/10 to-green-600/5 border-green-200',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-200',
    indigo: 'from-indigo-500/10 to-indigo-600/5 border-indigo-200',
    teal: 'from-teal-500/10 to-teal-600/5 border-teal-200',
    orange: 'from-orange-500/10 to-orange-600/5 border-orange-200',
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Category Filters */}
          <CategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              // Announce category change to screen readers
              const announcement = document.createElement('div');
              announcement.setAttribute('role', 'status');
              announcement.setAttribute('aria-live', 'polite');
              announcement.setAttribute('aria-atomic', 'true');
              announcement.className = 'sr-only';
              announcement.textContent = `Showing ${category === 'All' ? 'all' : category} adventures`;
              document.body.appendChild(announcement);
              setTimeout(() => document.body.removeChild(announcement), 1000);
            }}
          />

          {filteredStories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No adventures found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Link
                key={story.id}
                to={`/storiesofadventure/${story.id}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="cursor-pointer"
                >
                <div className="surface-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  {/* Thumbnail */}
                         <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                           <img
                             src={getImageUrl(story.thumbnail)}
                             alt={`${story.title} - Story thumbnail`}
                             className="relative z-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 z-50 pointer-events-none">
                      <div className="flex items-center gap-2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl pointer-events-auto">
                        <story.icon size={18} className="text-blue-300 flex-shrink-0" />
                        <span className="text-blue-300 text-sm font-bold">{story.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <span className="group-hover:text-blue-600 transition-colors">{labels.readMore}</span>
                    </div>
                  </div>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Connect CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
              Let's share adventures
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Love exploring? Interested in photography or outdoor adventures? Let's connect and share stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={contentData.assets.links.email}>
                <Button size="lg" className="rounded-full px-8">
                  Send an Email
                </Button>
              </a>
              <a href={contentData.assets.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Connect on LinkedIn
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screen reader only class for announcements */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

