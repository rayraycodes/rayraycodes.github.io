import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Globe, BookOpen, Laptop, Users, Zap, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import contentData from '../../data/content';

const iconMap: Record<string, typeof Globe> = {
  'Globe': Globe,
  'BookOpen': BookOpen,
  'Heart': Heart,
  'Laptop': Laptop,
  'Zap': Zap,
  'Users': Users,
};

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
    images?: string[];
    hasStats?: boolean;
    stats?: Array<{ value: string; label: string }>;
  };
}

export function Impact() {
  const { hero, stories: storiesData, labels } = contentData.impact;
  const { images } = contentData.assets;
  
  // Helper function to extract year from date string for sorting
  const extractYear = (dateStr: string): number => {
    // Handle formats like "2024", "2017-2020", "2020-2021"
    const yearMatch = dateStr.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      return parseInt(yearMatch[1], 10);
    }
    // For ranges like "2017-2020", use the end year
    const rangeMatch = dateStr.match(/\b(20\d{2})\s*-\s*(20\d{2})\b/);
    if (rangeMatch) {
      return parseInt(rangeMatch[2], 10); // Use end year
    }
    return 0;
  };

  // Sort stories by date (newest first)
  const sortedStories = useMemo(() => {
    return [...storiesData].sort((a, b) => {
      const yearA = extractYear(a.date);
      const yearB = extractYear(b.date);
      return yearB - yearA; // Descending order (newest first)
    });
  }, [storiesData]);
  
  // Map stories with icons and thumbnails
  const stories: Story[] = sortedStories.map((story): Story => {
    const thumbnail = story.id === 'building-technology' || story.id === 'e-pustakalaya' || story.id === 'ocr-tts' || story.id === 'technical-infrastructure' 
      ? images.impact.ruralSchool 
      : images.impact.mountainVillage;
    
    return {
      ...story,
      icon: iconMap[story.icon] || Globe,
      thumbnail,
      theme: story.theme as 'blue' | 'green' | 'purple' | 'indigo' | 'teal' | 'orange',
      content: {
        ...story.content,
        work: [...story.content.work], // Convert readonly array to mutable
        images: story.id === 'building-technology' ? [images.impact.ruralSchool, images.impact.mountainVillage] : undefined,
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
    <div className="min-h-screen pt-28 sm:pt-24 lg:pt-32">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Link
                key={story.id}
                to={`/impact/${story.id}`}
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
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={story.thumbnail}
                        alt={`${story.title} - Story thumbnail`}
                        className="relative z-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
                    </div>
                    <div className="absolute top-4 right-4 z-[100]" style={{ zIndex: 100 }}>
                      <div className="flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-sm rounded-lg">
                        <Calendar size={16} className="text-white" />
                        <span className="text-sm font-normal text-white">{story.date}</span>
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
        </div>
      </section>

      {/* Connect CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
              Let's create impact together
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Interested in learning more about these stories or collaborating on projects that create meaningful change? Let's connect.
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
    </div>
  );
}
