import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Globe, BookOpen, Laptop, Users, Zap, ArrowLeft, Calendar, Share2, Copy, Check, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import { InstagramFrame } from '../ui/InstagramFrame';
import contentData from '../../data/content';
import { getImageUrl } from '../../utils/imageUtils';
import { useMetaTags } from '../../utils/useMetaTags';
import { Comments } from '../Comments';

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
  thumbnailTitle?: string;
  excerpt: string;
  thumbnail: string;
  date: string;
  icon: typeof Globe;
  theme: 'blue' | 'green' | 'purple' | 'indigo' | 'teal' | 'orange' | string;
  content: {
    description: string | string[];
    work: string[];
    impact: string | string[];
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
      return;
    }

    // Scroll to top when story loads
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update meta tags immediately for better crawler support
    const baseUrl = window.location.origin;
    const storyImage = selectedStory.content.images && selectedStory.content.images.length > 0
      ? getImageUrl(typeof selectedStory.content.images[0] === 'string' 
          ? selectedStory.content.images[0] 
          : selectedStory.content.images[0].url)
      : getImageUrl(selectedStory.thumbnail);
    
    // Ensure image URL is absolute
    const imageUrl = storyImage.startsWith('http') 
      ? storyImage 
      : `${baseUrl}${storyImage.startsWith('/') ? '' : '/'}${storyImage}`;
    
    // Use thumbnailTitle for social previews, but keep full title for document title
    const socialTitle = selectedStory.thumbnailTitle || selectedStory.title;
    
    // Update document title immediately
    document.title = selectedStory.title;
    
    // Update meta tags synchronously for crawlers
    const updateMeta = (property: string, content: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('og:title', socialTitle);
    updateMeta('og:description', selectedStory.excerpt);
    updateMeta('og:image', imageUrl);
    updateMeta('og:url', window.location.href);
    updateMeta('og:type', 'article');
    updateMeta('twitter:card', 'summary_large_image', false);
    updateMeta('twitter:title', socialTitle, false);
    updateMeta('twitter:description', selectedStory.excerpt, false);
    updateMeta('twitter:image', imageUrl, false);
    updateMeta('description', selectedStory.excerpt, false);
  }, [selectedStory, navigate, storyId]);

  // Also use the hook for React-based updates
  useMetaTags({
    title: selectedStory ? (selectedStory.thumbnailTitle || selectedStory.title) : 'Stories of Adventure',
    description: selectedStory?.excerpt || 'Stories of Adventure',
    image: selectedStory 
      ? (selectedStory.content.images && selectedStory.content.images.length > 0
          ? getImageUrl(typeof selectedStory.content.images[0] === 'string' 
              ? selectedStory.content.images[0] 
              : selectedStory.content.images[0].url)
          : getImageUrl(selectedStory.thumbnail))
      : contentData.assets.images.impact.mountainVillage,
    url: selectedStory ? window.location.href : undefined,
    type: 'article',
  });

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
          </header>

          {/* First 2 Images */}
          {selectedStory.content.images && selectedStory.content.images.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              {selectedStory.content.images.slice(0, 2).map((image, idx) => {
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

          {/* Description */}
          {Array.isArray(selectedStory.content.description) ? (
            <div className="space-y-4">
              {selectedStory.content.description.map((paragraph, index) => (
                <p key={index} className="text-xl text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
              {selectedStory.content.description}
            </p>
          )}

          {/* Remaining Images */}
          {selectedStory.content.images && selectedStory.content.images.length > 2 && (
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              {selectedStory.content.images.slice(2).map((image, idx) => {
                const imageUrl = typeof image === 'string' ? image : image.url;
                const imageAlt = typeof image === 'string' 
                  ? `${selectedStory.title} - Image ${idx + 3}`
                  : image.alt;
                const imageCaption = typeof image === 'string' 
                  ? ''
                  : image.caption;
                
                return (
                  <InstagramFrame
                    key={idx + 2}
                    imageUrl={getImageUrl(imageUrl)}
                    alt={imageAlt}
                    caption={imageCaption}
                    index={idx + 2}
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
            {Array.isArray(selectedStory.content.impact) ? (
              <div className="space-y-4">
                {selectedStory.content.impact.map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground italic leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-lg text-muted-foreground italic leading-relaxed whitespace-pre-line">
                {selectedStory.content.impact}
              </p>
            )}
          </section>

          {/* Comments Section */}
          <Comments storyId={storyId || ''} />
        </motion.article>

        {/* Other Stories Section */}
        {stories.filter(story => story.id !== storyId).length > 0 && (
          <section className="py-16 lg:py-24 mt-16 border-t">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">
                  Other Stories of Adventure
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore more adventures and stories
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories
                  .filter(story => story.id !== storyId)
                  .slice(0, 3)
                  .map((story, index) => {
                    const storyImages = story.content.images || [];
                    const firstImage = storyImages.length > 0 
                      ? (typeof storyImages[0] === 'string' ? storyImages[0] : storyImages[0].url)
                      : null;
                    const thumbnail = firstImage || story.thumbnail;
                    
                    return (
                      <Link
                        key={story.id}
                        to={`/storiesofadventure/${story.id}`}
                        className="group"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="cursor-pointer"
                        >
                          <div className="surface-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                              <div className="absolute inset-0 overflow-hidden">
                                <img
                                  src={getImageUrl(thumbnail)}
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
                                {story.thumbnailTitle || story.title}
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
                    );
                  })}
              </div>
            </div>
          </section>
        )}

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

        {/* Bottom Back to Stories Link */}
        <div className="text-center py-8">
          <Link
            to="/storiesofadventure"
            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{labels.backToStories}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

