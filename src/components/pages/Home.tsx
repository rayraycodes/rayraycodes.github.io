import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Hand, BookOpen, FolderKanban, Camera } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';
import contentData from '../../data/content';

export function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background py-12 sm:py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Person Image Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <img 
            src={getImageUrl("src/assets/ray.png")} 
            alt="Regan Maharjan"
            className="w-auto mx-auto rounded-full object-contain"
            style={{ height: 'clamp(200px, 30vh, 400px)' }}
          />
        </motion.div>

        {/* Welcome Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-4 sm:mb-6 text-gray-900">
            Hello, welcome here,
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-700 mb-6 sm:mb-8 md:mb-10">
            Namaste (Greetings!)
          </p>
          <div className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-loose">
            <p className="mb-4 text-left sm:text-center leading-relaxed">
              Feel free to explore!{' '}
              <Link 
                to="/about" 
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 transition-all font-semibold text-gray-900 shadow-sm hover:shadow-md my-1 sm:my-0"
              >
                <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
                Get to know me
              </Link>
              {' '}better,{' '}
              <Link 
                to="/storiesofadventure" 
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 transition-all font-semibold text-gray-900 shadow-sm hover:shadow-md my-1 sm:my-0"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                dive into my stories
              </Link>
              ,{' '}
              <Link 
                to="/projects" 
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 transition-all font-semibold text-gray-900 shadow-sm hover:shadow-md my-1 sm:my-0"
              >
                <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />
                check out my projects
              </Link>
              , and{' '}
              <Link 
                to="/photography" 
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 transition-all font-semibold text-gray-900 shadow-sm hover:shadow-md my-1 sm:my-0"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                browse my photo stories
              </Link>
              .
            </p>
            <p className="text-gray-600 text-left sm:text-center">
              Seriously, go ahead and click around - I promise it's worth it! 😄
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}