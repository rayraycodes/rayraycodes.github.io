import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Globe, BookOpen, Laptop, Users, Zap, ArrowLeft, Calendar } from 'lucide-react';
import contentData from '../../data/content';
import { getPageTitleColor } from '../../utils/brandColorsConfig';

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
  
  // Map stories with icons and thumbnails
  const stories: Story[] = storiesData.map((story): Story => {
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

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  if (selectedStory) {
    return (
      <div className="min-h-screen pt-24 lg:pt-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedStory(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>{labels.backToStories}</span>
          </motion.button>

          {/* Story Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>{selectedStory.date}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl tracking-tight">
                {selectedStory.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {selectedStory.content.description}
              </p>
            </header>

            {/* Images */}
            {selectedStory.content.images && selectedStory.content.images.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {selectedStory.content.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="surface-elevated rounded-2xl overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${selectedStory.title} - Image ${idx + 1}`}
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* What I Built */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">{labels.whatIBuilt}</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {selectedStory.content.work.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Impact */}
            <section className={`bg-gradient-to-br ${themeColors[selectedStory.theme as keyof typeof themeColors]} border rounded-2xl p-6 space-y-3`}>
              <h2 className="text-2xl font-semibold">{labels.impactToday}</h2>
              <p className="text-lg text-muted-foreground italic">
                {selectedStory.content.impact}
              </p>
            </section>

            {/* Impact Stats (only for main story) */}
            {selectedStory.content.hasStats && selectedStory.content.stats && (
              <section className="py-8 border-t">
                <h2 className="text-2xl font-semibold mb-6">{labels.impactByNumbers}</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {selectedStory.content.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="surface-elevated rounded-xl p-6 text-center"
                    >
                      <div className="text-3xl lg:text-4xl mb-2 text-gradient-blue">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </motion.article>
        </div>
      </div>
    );
  }

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
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-6" style={{ color: getPageTitleColor('impact') }}>
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
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer"
              >
                <div className="surface-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white text-sm mb-2">
                        <story.icon size={16} />
                        <span>{story.date}</span>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
