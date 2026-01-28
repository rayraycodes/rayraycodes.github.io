import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getImageUrl } from '../../utils/imageUtils';
import contentData from '../../data/content';

// Category Filter Bar Component
interface CategoryFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilterBar({ categories, selectedCategory, onCategoryChange }: CategoryFilterBarProps) {
  return (
    <nav aria-label="Project categories" className="mb-8">
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
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { hero, projects: projectsData, labels } = contentData.projects;
  const { images } = contentData.assets;
  
  // Extract unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = new Set(projectsData.map(project => project.category));
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [projectsData]);
  
  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projectsData;
    }
    return projectsData.filter(project => project.category === selectedCategory);
  }, [projectsData, selectedCategory]);
  
  const projects = filteredProjects.map((project) => {
    const rawImageUrl = images.projects[projectsData.indexOf(project)] || images.projects[0];
    return {
      ...project,
      imageUrl: rawImageUrl.startsWith('http') ? rawImageUrl : getImageUrl(rawImageUrl),
      id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''), // Generate ID from title
    };
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Announce category change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Showing ${category === 'All' ? 'all' : category} projects`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="pt-16 lg:pt-24 pb-20 lg:pb-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {hero.greeting && (
              <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                {hero.greeting}
              </p>
            )}
            <h1 className="text-3xl lg:text-4xl tracking-tight mb-12">
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-20 lg:pt-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Category Filters */}
          <CategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                to={`/projects/${project.id}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
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
              </Link>
            ))}
          </div>
          )}
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
              Let's build something
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have a project in mind? I'm always interested in discussing new opportunities and collaborations.
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
