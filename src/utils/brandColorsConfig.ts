/**
 * Brand Colors Configuration Utility
 * 
 * This utility reads brand color configurations from localStorage (set via CMS)
 * and provides functions to get the appropriate brand colors for each page.
 * 
 * IMPORTANT RULE: White is NEVER used for text color (except in Footer component).
 * This rule is enforced in getPageTextColor() and in the CMS interface.
 */

import { brandColors, BrandColorName } from '../styles/brandColors';

export type PageName = 
  | 'navigation' 
  | 'home' 
  | 'about' 
  | 'experience' 
  | 'projects' 
  | 'impact' 
  | 'contact' 
  | 'accessibility' 
  | 'photography';

interface BrandColorConfig {
  titleColor: BrandColorName;
  activeHintColor: BrandColorName; // Active tab hint color for navigation
  background: BrandColorName;
  border: BrandColorName;
}

const defaultConfig: Record<PageName, BrandColorConfig> = {
  navigation: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  home: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  about: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  experience: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  projects: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  impact: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  contact: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  accessibility: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
  photography: { titleColor: 'blue', activeHintColor: 'blue', background: 'white', border: 'white' },
};

/**
 * Get brand colors configuration from localStorage
 */
function getBrandColorsConfig(): Record<PageName, BrandColorConfig> {
  try {
    const saved = localStorage.getItem('cms-brand-colors');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure all pages have config
      return { ...defaultConfig, ...parsed };
    }
  } catch (error) {
    console.error('Error loading brand colors config:', error);
  }
  return defaultConfig;
}

/**
 * Get the title color for a specific page
 * Rule: White is never used for text (except in footer)
 */
export function getPageTitleColor(page: PageName): string {
  const config = getBrandColorsConfig();
  let colorName = config[page]?.titleColor || 'blue';
  // Enforce rule: white is never used for text
  if (colorName === 'white') {
    colorName = 'blue'; // Default to blue if white is selected
  }
  return brandColors[colorName];
}

/**
 * Get the active navigation hint color for a specific page
 * This is used when that page's tab is active in the navigation
 * Rule: White is never used for text (except in footer)
 */
export function getPageActiveHintColor(page: PageName): string {
  const config = getBrandColorsConfig();
  let colorName = config[page]?.activeHintColor || 'blue';
  // Enforce rule: white is never used for text
  if (colorName === 'white') {
    colorName = 'blue';
  }
  return brandColors[colorName];
}

/**
 * Get the background color for a specific page
 */
export function getPageBackgroundColor(page: PageName): string {
  const config = getBrandColorsConfig();
  const colorName = config[page]?.background || 'white';
  return brandColors[colorName];
}

/**
 * Get the border color for a specific page
 */
export function getPageBorderColor(page: PageName): string {
  const config = getBrandColorsConfig();
  const colorName = config[page]?.border || 'white';
  return brandColors[colorName];
}

/**
 * Get all brand colors for a specific page
 */
export function getPageBrandColors(page: PageName): {
  titleColor: string;
  activeHintColor: string;
  background: string;
  border: string;
} {
  return {
    titleColor: getPageTitleColor(page),
    activeHintColor: getPageActiveHintColor(page),
    background: getPageBackgroundColor(page),
    border: getPageBorderColor(page),
  };
}

/**
 * Map navigation path to page name
 */
export function getPageNameFromPath(path: string): PageName | null {
  const pathMap: Record<string, PageName> = {
    '/': 'home',
    '/about': 'about',
    '/experience': 'experience',
    '/projects': 'projects',
    '/impact': 'impact',
    '/contact': 'contact',
    '/accessibility': 'accessibility',
    '/photography': 'photography',
  };
  return pathMap[path] || null;
}

/**
 * Get a brand color by name (fallback to blue if invalid)
 */
export function getBrandColorByName(colorName: string): string {
  if (colorName in brandColors) {
    return brandColors[colorName as BrandColorName];
  }
  return brandColors.blue;
}

