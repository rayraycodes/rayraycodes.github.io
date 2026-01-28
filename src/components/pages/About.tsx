import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Instagram, FileText } from 'lucide-react';
import contentData from '../../data/content';

export function About() {
  return (
    <div className="min-h-screen pt-28 sm:pt-24 lg:pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 lg:pt-12 pb-16 sm:pb-24 lg:pb-32">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <div className="mb-16 space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              You and I are not that different, but different, thank you for being here to learn that different perhaps..?
            </p>
            <p className="text-2xl md:text-3xl font-normal text-gray-900 leading-relaxed">
              Hi, I'm Regan 👋
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Some of my friends call me Dragon, some call me Ray and some call me ray of sunshine 😉
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              At the core, I'm someone who wants to be of service and be of help. That's what guides everything I do.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Over the years, I've worked on many kinds of systems and projects, but the motivation has always been the same: to make things clearer, more accessible, and more humane for the people who use them. I'm drawn to work that removes friction, opens doors, and helps others do their best work without unnecessary barriers.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Much of my time is spent thinking about access, equity, and how technology shows up in people's lives. I care deeply about designing with intention, especially for those who are often overlooked by default systems. I've learned that good solutions come from listening first, understanding context, and respecting real world constraints.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              I currently support large, complex web ecosystems at the University of Michigan, helping teams create digital experiences that are usable, inclusive, and sustainable over time. Before that, I worked closely with educators and communities in low connectivity environments, building tools that had to work offline, last for years, and serve learners with very different needs. Those experiences shaped how I think about responsibility, resilience, and trust in the things we build.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              I'm based in Michigan and fueled by curiosity. When I'm not working, I write poems, sing, and run to clear my head. I enjoy the gym, long walks, photography, videography, and creative writing. These practices keep me grounded and remind me that creation is as much about care as it is about skill.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-8">
              What I try to live by
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  Service over ego
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Show up to help. Let the work speak for itself.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  Care and intention
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Small choices compound. Build thoughtfully and with empathy.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  Learning as a practice
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Stay open, ask questions, and keep growing.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  Shared impact
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The best work happens together, with trust and respect.
                </p>
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              If you're interested in thoughtful, people centered work, accessibility, or building things that genuinely help others, I'd love to connect.
            </p>
            <p className="text-lg md:text-xl text-gray-900 font-medium leading-relaxed mb-6">
              Let's make things better, one small step at a time.
            </p>
            {/* Social Links - minimalistic icons */}
            <div className="flex items-center gap-4 mt-6 mb-4">
              <a
                href={contentData.assets.links.email}
                className="text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={contentData.assets.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={contentData.assets.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-8">
              If you are resume kind of wanting to know, here is my{' '}
              <Link
                to="/experience"
                className="inline-flex items-center gap-1.5 text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                <FileText className="w-4 h-4 shrink-0" />
                resume
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}