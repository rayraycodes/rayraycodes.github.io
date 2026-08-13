import { getImageUrl } from '../../utils/imageUtils';
import { Navigation } from '../Navigation';

export function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background py-12 sm:py-16 md:py-24">
      <div className="w-full min-w-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Person Image Section */}
        <div className="text-center mb-8">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 font-medium">
            रेगन
          </p>
          <img 
            src={getImageUrl("src/assets/ray.png")} 
            alt="Regan Maharjan"
            className="w-auto mx-auto rounded-full object-contain"
            style={{ height: 'clamp(200px, 30vh, 400px)' }}
          />
        </div>

        {/* Welcome Text Section */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-4 sm:mb-6 text-gray-900">
            Hello, welcome here,
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-700 mb-6 sm:mb-8 md:mb-10">
            Namaste (Greetings!)
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-5 max-w-2xl mx-auto leading-relaxed">
            Choose a place to start. This menu is marked up as site navigation so
            keyboard, screen-reader, voice-control, and agent users can understand it.
          </p>
          <div className="w-full min-w-0 max-w-4xl mx-auto">
            <Navigation inline />
          </div>
        </div>
      </div>
    </div>
  );
}
