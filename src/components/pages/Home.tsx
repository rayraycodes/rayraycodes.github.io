import { motion } from 'motion/react';
import { getImageUrl } from '../../utils/imageUtils';
import { Navigation } from '../Navigation';

export function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img 
            src={getImageUrl("src/assets/raylogo.png")} 
            alt="Regan Maharjan logo"
            className="h-24 md:h-32 lg:h-40 w-auto mx-auto"
          />
        </motion.div>

        {/* Welcome Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6 text-gray-900">
            Hello, welcome here,
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-700 mb-12 sm:mb-16">
            Namaste (Greetings!)
          </p>
          <Navigation inline />
        </motion.div>
      </div>
    </div>
  );
}