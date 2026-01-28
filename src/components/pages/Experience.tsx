import { motion } from 'motion/react';
import { Building2, GraduationCap, Lightbulb, Cpu } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import contentData from '../../data/content';

const iconMap: Record<string, typeof Building2> = {
  'Building2': Building2,
  'GraduationCap': GraduationCap,
  'Lightbulb': Lightbulb,
  'Cpu': Cpu,
};

export function Experience() {
  const { hero, experiences: experiencesData, impact, labels } = contentData.experience;
  
  // Map experiences with icons
  const experiences = experiencesData.map((exp) => {
    const iconKey = exp.theme === 'blue' ? 'Building2' : 
                    exp.theme === 'green' ? 'GraduationCap' :
                    exp.theme === 'purple' ? 'Building2' : 'Cpu';
    return {
      ...exp,
      icon: iconMap[iconKey] || Building2,
    };
  });

  const themeColors = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-200',
    green: 'from-green-500/10 to-green-600/5 border-green-200',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-200',
    indigo: 'from-indigo-500/10 to-indigo-600/5 border-indigo-200',
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
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

      {/* Experience Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className={`relative bg-gradient-to-br ${themeColors[exp.theme as keyof typeof themeColors]} border rounded-3xl p-8 lg:p-12`}>
                  {/* Icon and Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <exp.icon className="w-8 h-8 text-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                        <h2 className="text-3xl tracking-tight">{exp.company}</h2>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <h3 className="text-xl mb-1">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg mb-6">{exp.description}</p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="mb-4">{labels.keyContributions}</h4>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="mb-3">{labels.technologiesSkills}</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="rounded-full px-4 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-12">
              {impact.title}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {impact.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="surface-elevated rounded-2xl p-8"
                >
                  <div className="text-4xl lg:text-5xl mb-2 text-gradient-blue">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Let's work together
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Looking for an experienced engineer or accessibility expert? Let's discuss how we can collaborate.
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