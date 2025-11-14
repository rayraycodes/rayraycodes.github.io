/**
 * LogoMark Component
 * 
 * Two Himalayan mountains with snow and a colorful prayer flag.
 * Fun, vibrant design for the navigation bar.
 */

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className = '', size = 32 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-label="Regan Maharjan logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Mountain */}
      <path
        d="M 6 40 L 6 22 L 14 12 L 18 18 L 18 40 Z"
        fill="#334e68"
        opacity="0.9"
      />
      {/* Snow cap on left mountain */}
      <path
        d="M 6 22 L 14 12 L 18 18 L 14 20 Z"
        fill="white"
        opacity="0.95"
      />
      
      {/* Right Mountain (taller) */}
      <path
        d="M 18 40 L 18 16 L 26 8 L 38 16 L 38 40 Z"
        fill="#243b53"
        opacity="0.95"
      />
      {/* Snow cap on right mountain */}
      <path
        d="M 18 16 L 26 8 L 38 16 L 30 18 Z"
        fill="white"
        opacity="0.95"
      />
      
      {/* Colorful Prayer Flag */}
      <line x1="20" y1="14" x2="28" y2="12" stroke="#243b53" strokeWidth="0.8" opacity="0.7" />
      <rect x="21" y="10" width="2.5" height="6" fill="#3b82f6" opacity="0.9" />
      <rect x="23.5" y="10" width="2.5" height="6" fill="white" opacity="0.9" />
      <rect x="26" y="10" width="2.5" height="6" fill="#ef4444" opacity="0.9" />
    </svg>
  );
}

