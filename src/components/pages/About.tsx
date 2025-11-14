import { motion } from 'motion/react';
import { Code2, Sparkles, Database, Heart, Accessibility, Brain } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import contentData from '../../data/content';

const iconMap: Record<string, typeof Code2> = {
  'Code2': Code2,
  'Accessibility': Accessibility,
  'Sparkles': Sparkles,
  'Database': Database,
  'Heart': Heart,
  'Brain': Brain,
};

export function About() {
  const { hero, strengths, timeline, values, interests } = contentData.about;
  const { images } = contentData.assets;
  
  // Map strengths with icons
  const strengthsWithIcons = strengths.items.map((strength, index) => {
    const iconKeys = ['Code2', 'Accessibility', 'Sparkles', 'Database', 'Heart', 'Brain'];
    return {
      ...strength,
      icon: iconMap[iconKeys[index]] || Code2,
    };
  });

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl tracking-tight mb-6">
                {hero.title}
              </h1>
              <div className="space-y-4 text-lg text-muted-foreground">
                {hero.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="surface-elevated rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src={images.about.profile}
                  alt="Professional portrait of Regan Maharjan"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strengths Grid */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {strengths.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {strengths.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengthsWithIcons.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="surface-elevated rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
              >
                <strength.icon className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2">{strength.title}</h3>
                <p className="text-muted-foreground">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {timeline.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {timeline.subtitle}
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.items.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-blue-200"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600" />
                <div className="text-sm text-blue-600 mb-1">{item.year}</div>
                <h3 className="mb-1">{item.title}</h3>
                <div className="text-sm text-muted-foreground mb-2">{item.org}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {values.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {values.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.items.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="surface-elevated rounded-2xl p-8"
              >
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
              {interests.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {interests.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {interests.items.map((interest) => (
                <motion.span
                  key={interest}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-blue-50 rounded-full text-sm"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}