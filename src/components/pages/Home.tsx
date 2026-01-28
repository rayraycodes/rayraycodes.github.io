import { motion } from 'motion/react';
import { getImageUrl } from '../../utils/imageUtils';
import { Navigation } from '../Navigation';

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
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-700 mb-8 sm:mb-12 md:mb-16">
            Namaste (Greetings!)
          </p>
          <Navigation inline />
        </motion.div>
      </div>
    </div>
  );
}