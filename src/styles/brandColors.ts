/**
 * Brand Colors Style Guide
 * 
 * Official brand colors inspired by Tibetan prayer flags.
 * Use these colors throughout the application for consistent branding.
 * 
 * @example
 * import { brandColors } from '../styles/brandColors';
 * 
 * // Use in components
 * <div style={{ backgroundColor: brandColors.blue }}>...</div>
 * 
 * // Use in Tailwind classes via CSS variables
 * <div className="bg-brand-blue">...</div>
 */

export const brandColors = {
  blue: '#263b8f',
  white: '#c6c4c4',
  red: '#ef4444',
  green: '#22c55e',
  yellow: '#eab308',
} as const;

/**
 * Brand color names for type safety
 */
export type BrandColorName = keyof typeof brandColors;

/**
 * Get brand color by name
 */
export function getBrandColor(colorName: BrandColorName): string {
  return brandColors[colorName];
}

/**
 * Brand colors array for cycling through colors
 */
export const brandColorsArray: string[] = [
  brandColors.blue,
  brandColors.white,
  brandColors.red,
  brandColors.green,
  brandColors.yellow,
];

