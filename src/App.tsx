import { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Experience } from './components/pages/Experience';
import { Projects } from './components/pages/Projects';
import { ProjectDetail } from './components/pages/ProjectDetail';
import { Impact } from './components/pages/Impact';
import { StoryDetail } from './components/pages/StoryDetail';
import { StoriesOfAdventure } from './components/pages/StoriesOfAdventure';
import { StoryOfAdventureDetail } from './components/pages/StoryOfAdventureDetail';
import { Accessibility } from './components/pages/Accessibility';
import { Contact } from './components/pages/Contact';
import { Photography } from './components/pages/Photography';
import { CMS } from './components/pages/CMS';
import { preloadCriticalImages } from './utils/preloadImages';
import './utils/navHeight';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/#/';
  const prevPathnameRef = useRef<string>(location.pathname);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if current route is a detail page (project or story detail)
  const isDetailPage = /^\/(projects|impact|storiesofadventure)\/[^/]+$/.test(location.pathname);

  // Scroll to top on route changes - simplified, no interference with user scrolling
  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== location.pathname;
    
    if (pathnameChanged) {
      // Clear any pending scroll timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Always scroll to top for detail pages, otherwise only if not already scrolled
      if (isDetailPage || window.scrollY === 0) {
        // Use a small delay to ensure DOM is ready
        scrollTimeoutRef.current = setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          scrollTimeoutRef.current = null;
        }, 0);
      }
      
      prevPathnameRef.current = location.pathname;
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location.pathname, isDetailPage]);

  // Disable right-click context menu on all pages
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Preload critical images on app mount
  useEffect(() => {
    preloadCriticalImages();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isHomePage && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
              <Home />
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/impact/:storyId" element={<StoryDetail />} />
          <Route path="/storiesofadventure" element={<StoriesOfAdventure />} />
          <Route path="/storiesofadventure/:storyId" element={<StoryOfAdventureDetail />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/CMS" element={<Navigate to="/cms" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}