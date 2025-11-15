import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import contentData from '../../data/content';
import { getPageTitleColor } from '../../utils/brandColorsConfig';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const { hero, projects: projectsData, labels } = contentData.projects;
  const { images } = contentData.assets;
  
  const projects = projectsData.map((project, index) => ({
    ...project,
    imageUrl: images.projects[index] || images.projects[0],
  }));

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-6" style={{ color: getPageTitleColor('projects') }}>
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(index)}
                className="surface-elevated rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                {/* Project Image */}
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <ImageWithFallback
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="text-xs text-blue-600 mb-2">{project.category}</div>
                  <h3 className="text-xl mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm mb-2">{labels.impact}</div>
                    <p className="text-sm text-muted-foreground italic">{project.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full my-8 overflow-hidden"
          >
            {/* Header Image */}
            <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <ImageWithFallback
                src={projects[selectedProject].imageUrl}
                alt={`${projects[selectedProject].title} detail`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="text-sm text-blue-600 mb-2">{projects[selectedProject].category}</div>
              <h2 className="text-4xl tracking-tight mb-4">{projects[selectedProject].title}</h2>
              <p className="text-xl text-muted-foreground mb-8">{projects[selectedProject].description}</p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl mb-2">{labels.problem}</h3>
                  <p className="text-muted-foreground">{projects[selectedProject].problem}</p>
                </div>

                <div>
                  <h3 className="text-xl mb-2">{labels.approach}</h3>
                  <p className="text-muted-foreground">{projects[selectedProject].approach}</p>
                </div>

                <div>
                  <h3 className="text-xl mb-2">{labels.solution}</h3>
                  <p className="text-muted-foreground">{projects[selectedProject].solution}</p>
                </div>

                <div>
                  <h3 className="text-xl mb-2">{labels.result}</h3>
                  <p className="text-muted-foreground">{projects[selectedProject].result}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-8">
                <h3 className="text-xl mb-4">{labels.keyMetrics}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {projects[selectedProject].metrics.map((metric) => (
                    <div key={metric} className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-sm">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-xl mb-4">{labels.technologies}</h3>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-4 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setSelectedProject(null)}
                size="lg"
                className="w-full rounded-full"
              >
                {labels.close}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
