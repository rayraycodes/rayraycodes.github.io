import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import contentData from '../data/content';
import { brandColors, brandColorsArray } from '../styles/brandColors';
import { getPageActiveHintColor, getPageNameFromPath } from '../utils/brandColorsConfig';

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

  // Get brand color for each tab - use CMS config for active hints per page
  const getTabColor = (link: { path: string; label: string }, index: number): string => {
    const isActive = location.pathname === link.path;
    
    if (isActive) {
      // Get the active hint color for this specific page from CMS
      const pageName = getPageNameFromPath(link.path);
      if (pageName) {
        return getPageActiveHintColor(pageName);
      }
      // Fallback: Photography always uses blue
      if (link.path === '/photography' || link.label === 'Photography') {
        return brandColors.blue;
      }
      // Default fallback
      return brandColorsArray[index % brandColorsArray.length];
    }
    
    // For inactive tabs, cycle through colors
    // Photography always uses blue
    if (link.path === '/photography' || link.label === 'Photography') {
      return brandColors.blue;
    }
    return brandColorsArray[index % brandColorsArray.length];
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism border-b' : 'bg-transparent'
      }`}
      style={isScrolled ? { borderBottomColor: `${brandColors.blue}20` } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Ray Logo */}
          <Link to="/" className="flex items-center group" aria-label="Home">
            <motion.img 
              src="/assets/raylogo.png" 
              alt="Regan Maharjan logo"
              className="w-auto bg-transparent transition-all duration-300"
              style={{ background: 'transparent', height: '85px' }}
              whileHover={{ scale: 1.1, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link: { path: string; label: string }, index: number) => {
              const isActive = location.pathname === link.path;
              const tabColor = getTabColor(link, index);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 transition-colors group"
                >
                  <span className="relative z-10 text-sm">
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${tabColor}20`,
                        borderBottom: `1px solid ${tabColor}40`,
                        boxShadow: `0 1px 2px ${tabColor}20`,
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" 
                    style={{ backgroundColor: `${brandColors.white}30` }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${brandColors.white}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
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
          className="lg:hidden glassmorphism border-t"
          style={{ borderTopColor: `${brandColors.blue}20` }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link: { path: string; label: string }, index: number) => {
              const isActive = location.pathname === link.path;
              const tabColor = getTabColor(link, index);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition-all backdrop-blur-sm"
                  style={{
                    backgroundColor: isActive ? `${tabColor}20` : 'transparent',
                    borderLeft: isActive ? `2px solid ${tabColor}60` : '2px solid transparent',
                    boxShadow: isActive ? `inset 0 0 10px ${tabColor}10` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = `${brandColors.white}20`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}