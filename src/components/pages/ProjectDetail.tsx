import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ExternalLink, Github, FileText, ArrowLeft, Share2, Copy, Check } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';
import contentData from '../../data/content';
import { useMetaTags } from '../../utils/useMetaTags';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects: projectsData, labels } = contentData.projects;
  const { images } = contentData.assets;
  const [copied, setCopied] = useState(false);

  const projects = projectsData.map((project, index) => {
    const rawImageUrl = images.projects[index] || images.projects[0];
    return {
      ...project,
      imageUrl: rawImageUrl.startsWith('http') ? rawImageUrl : getImageUrl(rawImageUrl),
      id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''), // Generate ID from title
    };
  });

  const selectedProject = projects.find(project => project.id === projectId);

  useEffect(() => {
    if (!selectedProject) {
      navigate('/projects');
    }
  }, [selectedProject, navigate]);

  // Update meta tags for social sharing
  useMetaTags({
    title: selectedProject ? selectedProject.title : 'Projects',
    description: selectedProject?.description || 'Selected Projects',
    image: selectedProject?.imageUrl || (contentData.assets.images.projects[0] || '/assets/raylogo.png'),
    url: selectedProject ? window.location.href : undefined,
    type: 'article',
  });

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedProject?.title || 'Project',
          text: selectedProject?.description || '',
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

  if (!selectedProject) {
    return null;
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-24 lg:pt-32">
      {/* Project Detail Modal */}
      <div className="max-w-6xl mx-auto px-4 lg:px-12">
        {/* Back Button and Share */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share project"
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

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* Header Image */}
          <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
            <ImageWithFallback
              src={selectedProject.imageUrl}
              alt={`${selectedProject.title} detail`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            <div className="text-sm text-blue-600 mb-2">{selectedProject.category}</div>
            <h2 className="text-4xl tracking-tight mb-4">{selectedProject.title}</h2>
            <p className="text-xl text-muted-foreground mb-4">{selectedProject.description}</p>

            {/* Long Description */}
            {selectedProject.longDescription && (
              <div className="mb-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 w-[80%] max-h-[75vh] overflow-y-auto">
                <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
              </div>
            )}

            {/* Links */}
            {selectedProject.links && (
              <div className="mb-8 flex flex-wrap gap-3">
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    View Live
                  </a>
                )}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {selectedProject.links.docs && (
                  <a
                    href={selectedProject.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-sm"
                  >
                    <FileText size={16} />
                    Documentation
                  </a>
                )}
                {selectedProject.links && 'demo' in selectedProject.links && (selectedProject.links as any).demo && (
                  <a
                    href={(selectedProject.links as any).demo as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                )}
                {selectedProject.links && 'repo' in selectedProject.links && (selectedProject.links as any).repo && (
                  <a
                    href={(selectedProject.links as any).repo as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
                  >
                    <Github size={16} />
                    Repository
                  </a>
                )}
              </div>
            )}

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl mb-2">{labels.problem}</h3>
                <p className="text-muted-foreground">{selectedProject.problem}</p>
              </div>

              <div>
                <h3 className="text-xl mb-2">{labels.approach}</h3>
                <p className="text-muted-foreground">{selectedProject.approach}</p>
              </div>

              <div>
                <h3 className="text-xl mb-2">{labels.solution}</h3>
                <p className="text-muted-foreground">{selectedProject.solution}</p>
              </div>

              <div>
                <h3 className="text-xl mb-2">{labels.result}</h3>
                <p className="text-muted-foreground">{selectedProject.result}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="mb-8">
              <h3 className="text-xl mb-4">{labels.keyMetrics}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {selectedProject.metrics.map((metric) => (
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
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-4 py-2">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Link
              to="/projects"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors justify-center pt-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Connect CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-50/20 mt-16">
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
    </div>
  );
}

