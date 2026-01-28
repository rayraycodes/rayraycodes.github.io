import { motion } from 'motion/react';
import { Eye, Code, CheckCircle2, Sparkles, Users, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import contentData from '../../data/content';

const iconMap: Record<string, typeof Eye> = {
  'Eye': Eye,
  'Users': Users,
  'Code': Code,
  'Sparkles': Sparkles,
};

export function Accessibility() {
  const { hero, philosophy, wcag, tools, transformation, ai, impact } = contentData.accessibility;
  const { images } = contentData.assets;
  
  // Map principles with icons
  const principles = philosophy.principles.map((principle, index) => {
    const iconKeys = ['Eye', 'Users', 'Code', 'Sparkles'];
    return {
      ...principle,
      icon: iconMap[iconKeys[index]] || Eye,
    };
  });

  return (
    <div className="min-h-screen pt-28 sm:pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/30 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
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

      {/* Philosophy */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {philosophy.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {philosophy.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
              >
                <principle.icon className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2">{principle.title}</h3>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WCAG Skills */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {wcag.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {wcag.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wcag.categories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="surface-elevated rounded-2xl p-6"
              >
                <h3 className="text-xl mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Systems */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {tools.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {tools.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.items.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="surface-elevated rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-1">{tool.name}</h3>
                    <div className="text-sm text-blue-600 mb-2">{tool.role}</div>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {transformation.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {transformation.subtitle}
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {transformation.items.map((item, index) => (
              <motion.div
                key={item.before}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="surface-elevated rounded-2xl p-6 lg:p-8"
              >
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">{transformation.beforeLabel}</div>
                    <p className="text-muted-foreground">{item.before}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="px-6 py-2 bg-green-100 text-green-700 rounded-full">
                      {item.impact}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">{transformation.afterLabel}</div>
                    <p>{item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Workflows */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
                {ai.title}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground mb-6">
                {ai.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {ai.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-4 py-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="surface-elevated rounded-2xl p-8"
            >
              <ImageWithFallback
                src={images.accessibility.aiAccessibility}
                alt="AI and accessibility technology concepts"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-4">
              {impact.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {impact.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="surface-elevated rounded-2xl p-8 text-center"
              >
                <div className="text-4xl lg:text-5xl mb-2 text-gradient-blue">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
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
              Let's build something accessible
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you're looking for accessibility consulting, need help with WCAG compliance, or want to discuss inclusive design, I'm here to help.
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