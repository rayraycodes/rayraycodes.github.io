import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { Accessibility } from './components/pages/Accessibility';
import { Contact } from './components/pages/Contact';
import { Photography } from './components/pages/Photography';
import { CMS } from './components/pages/CMS';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/impact/:storyId" element={<StoryDetail />} />
          <Route path="/storiesofadventure" element={<StoriesOfAdventure />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/CMS" element={<Navigate to="/cms" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}