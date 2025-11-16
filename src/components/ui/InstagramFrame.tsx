import { motion } from 'motion/react';
import { getImageUrl } from '../../utils/imageUtils';

interface InstagramFrameProps {
  imageUrl: string;
  alt: string;
  caption: string;
  index?: number;
}

export function InstagramFrame({ imageUrl, alt, caption, index = 0 }: InstagramFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="bg-white w-full"
      style={{
        padding: '8px',
        border: '1px solid #d1d5db',
        borderRadius: '2px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Image area with white border */}
      <div className="w-full bg-gray-100" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={getImageUrl(imageUrl)}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Bottom white border area for caption */}
      <div className="bg-white pt-3 pb-2" style={{ minHeight: '60px' }}>
        {caption && (
          <p 
            className="text-gray-700 leading-relaxed" 
            style={{ 
              fontFamily: '"Caveat", "Kalam", cursive, sans-serif',
              fontSize: '22px',
              fontWeight: 400,
            }}
          >
            {caption}
          </p>
        )}
      </div>
    </motion.div>
  );
}

