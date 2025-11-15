import { PrayerFlags } from './decorative/PrayerFlags';

/**
 * Footer Component
 * 
 * Footer with colorful, artistic Himalayan and Kathmandu silhouette.
 * Features gradient sky, prayer flags, temples, and wildlife.
 */
export function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden" style={{ minHeight: '260px' }}>
      {/* Gradient sky background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #e8f0f8 0%, #d0e0f0 30%, #b8d0e8 60%, #a0c0e0 100%)'
        }}
      />
      
      {/* Prayer flags - subtle decoration */}
      <div className="absolute top-8 left-8 z-20 opacity-30">
        <PrayerFlags variant="corner" className="w-32" opacity={0.3} />
      </div>
      <div className="absolute top-12 right-16 z-20 opacity-25">
        <PrayerFlags variant="curved" className="w-48" opacity={0.25} />
      </div>
      
      {/* Nepal image silhouette - cropped at bottom 15% */}
      <div className="w-full relative z-10 overflow-hidden" style={{ height: '85%', minHeight: '221px' }}>
        <img 
          src="/assets/nepalimage.jpg" 
          alt="Layered Himalayan mountains with fog, Kathmandu skyline, prayer flags, and stupas"
          className="w-full h-full object-cover object-top"
        />
      </div>
      
      {/* Footer content with nice padding - positioned at top over image */}
      <div className="absolute top-0 left-0 right-0 z-50 max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="text-sm font-medium text-white drop-shadow-lg">
            © 2025 Regan Maharjan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

