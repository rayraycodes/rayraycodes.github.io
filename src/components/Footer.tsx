/**
 * Footer Component
 * 
 * Footer with colorful, artistic Himalayan and Kathmandu silhouette.
 * Features gradient sky, prayer flags, temples, and wildlife.
 */
export function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden w-full" style={{ bottom: 0 }}>
  
      <div className="w-full relative z-10 overflow-hidden" >
        <p className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm lg:text-base font-medium text-white drop-shadow-lg text-center z-50" 
        style={{ width: '100%', bottom: 0, paddingBottom: '12px'}}>
          © 2025 Regan Maharjan. All rights reserved.
        </p>
        <div className="relative w-full h-full">
          <img 
            src="/assets/nepalimage.jpg" 
            alt="Layered Himalayan mountains with fog, Kathmandu skyline, prayer flags, and stupas"
            className="w-full h-full object-cover"
            style={{ 
              width: '100%', 
              objectPosition: 'bottom',
              objectFit: 'cover'
            }}
          />
          {/* Gradient overlay - fades only at the top */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0) 25%, transparent 25%)',
              pointerEvents: 'none'
            }}
          />
        </div>
       
      </div>
    </footer>
  );
}

