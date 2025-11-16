import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import contentData from '../data/content';
import { getImageUrl } from '../utils/imageUtils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = contentData.navigation.links;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism border-b border-black/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Ray Logo */}
          <Link to="/" className="flex items-center group" aria-label="Home">
            <motion.img 
              src={getImageUrl("src/assets/raylogo.png")} 
              alt="Regan Maharjan logo"
              className="w-auto bg-transparent transition-all duration-300"
              style={{ background: 'transparent', height: '85px' }}
              whileHover={{ scale: 1.1, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link: { path: string; label: string }) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 transition-colors group"
              >
                <span className="relative z-10 text-sm">
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-black/5 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 bg-black/[0.02] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden glassmorphism border-t border-black/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link: { path: string; label: string }) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-black/5'
                    : 'hover:bg-black/[0.02]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}