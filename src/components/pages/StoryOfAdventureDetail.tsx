import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Globe, BookOpen, Laptop, Users, Zap, ArrowLeft, Calendar, Share2, Copy, Check, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import { InstagramFrame } from '../ui/InstagramFrame';
import contentData from '../../data/content';
import { getImageUrl } from '../../utils/imageUtils';

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

export function StoryOfAdventureDetail() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { stories: storiesData, labels } = contentData.storiesOfAdventure;
  const { images } = contentData.assets;
  const [copied, setCopied] = useState(false);

  // Map stories with icons and thumbnails
  const stories: Story[] = storiesData.map((story): Story => {
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
        work: [...story.content.work],
        images: storyImages.length > 0 ? storyImages : undefined,
      },
    };
  });

  const selectedStory = stories.find(story => story.id === storyId);

  const themeColors = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-200',
    green: 'from-green-500/10 to-green-600/5 border-green-200',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-200',
    indigo: 'from-indigo-500/10 to-indigo-600/5 border-indigo-200',
    teal: 'from-teal-500/10 to-teal-600/5 border-teal-200',
    orange: 'from-orange-500/10 to-orange-600/5 border-orange-200',
  };

  useEffect(() => {
    if (!selectedStory) {
      navigate('/storiesofadventure');
    }
  }, [selectedStory, navigate]);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedStory?.title || 'Story of Adventure',
          text: selectedStory?.excerpt || '',
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!selectedStory) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Back Button and Share */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/storiesofadventure"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{labels.backToStories}</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share story"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Copy link"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

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
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              {selectedStory.content.images.map((image, idx) => {
                const imageUrl = typeof image === 'string' ? image : image.url;
                const imageAlt = typeof image === 'string' 
                  ? `${selectedStory.title} - Image ${idx + 1}`
                  : image.alt;
                const imageCaption = typeof image === 'string' 
                  ? ''
                  : image.caption;
                
                return (
                  <InstagramFrame
                    key={idx}
                    imageUrl={getImageUrl(imageUrl)}
                    alt={imageAlt}
                    caption={imageCaption}
                    index={idx}
                  />
                );
              })}
            </div>
          )}

          {/* What I Did */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">{labels.whatIDid}</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {selectedStory.content.work.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Reflection */}
          <section className={`bg-gradient-to-br ${themeColors[selectedStory.theme as keyof typeof themeColors]} border rounded-2xl p-6 space-y-3`}>
            <h2 className="text-2xl font-semibold">{labels.reflection}</h2>
            <p className="text-lg text-muted-foreground italic">
              {selectedStory.content.impact}
            </p>
          </section>
        </motion.article>

        {/* Connect CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20 mt-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
                Let's connect
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Want to learn more about this story or share your own adventures? I'd love to hear from you.
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
                {contentData.assets.links.instagram && (
                  <a href={contentData.assets.links.instagram} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="rounded-full px-8">
                      <Instagram className="w-5 h-5 mr-2" />
                      Follow on Instagram
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

