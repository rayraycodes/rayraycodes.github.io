import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PrayerFlags } from '../decorative/PrayerFlags';
import contentData from '../../data/content';
import { getPageTitleColor } from '../../utils/brandColorsConfig';

export function Home() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const { hero, highlights, featured } = contentData.home;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(102,126,234,0.08),transparent_50%)]" />
        
        {/* Prayer flags - top left corner */}
        <div className="absolute top-20 left-8 z-10 opacity-30">
          <PrayerFlags variant="curved" className="w-48" opacity={0.3} />
        </div>
        
        {/* Prayer flags - top right */}
        <div className="absolute top-32 right-12 z-10 opacity-25">
          <PrayerFlags variant="diagonal" className="w-40" opacity={0.25} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6" style={{ color: getPageTitleColor('home') }}>
              {hero.title.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < hero.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/projects">
              <Button size="lg" className="rounded-full px-8 group">
                {hero.ctaPrimary}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                {hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Visual - MacBook Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="mt-20 relative"
          >
            <div className="relative max-w-5xl mx-auto">
              <div className="surface-elevated rounded-2xl p-8 lg:p-12">
                <ImageWithFallback
                  src="https://regan.figma.site/_assets/v11/cc03d6b7b9b6c0b127b5885a899b19b8d05b9f15.png"
                  alt="Clean workspace with MacBook showcasing development environment"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
              {/* Floating accent elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          aria-label="Scroll to content"
        >
          <span className="text-sm tracking-wide">{hero.scrollIndicator}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* Quick Highlights Section */}
      <section className="py-24 lg:py-32 bg-white relative">
        {/* Prayer flags - subtle decoration */}
        <div className="absolute top-16 right-16 opacity-20">
          <PrayerFlags variant="horizontal" className="w-64" opacity={0.2} />
        </div>
        <div className="absolute bottom-16 left-16 opacity-20">
          <PrayerFlags variant="curved" className="w-56" opacity={0.2} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {highlights.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {highlights.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="surface-elevated rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Teaser */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
                {featured.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {featured.description}
              </p>
              <Link to="/accessibility">
                <Button size="lg" variant="outline" className="rounded-full group">
                  {featured.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="surface-elevated rounded-2xl p-8"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1611926653670-e18689373857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwaW5jbHVzaXZlJTIwZGVzaWdufGVufDF8fHx8MTc2MzAzMDU4MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Accessibility and inclusive design concepts"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}