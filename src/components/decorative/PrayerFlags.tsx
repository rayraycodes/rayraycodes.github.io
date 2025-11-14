/**
 * PrayerFlags Component
 * 
 * Ultra minimal, Apple-inspired Tibetan prayer flags.
 * Clean geometric shapes with traditional five colors:
 * Blue, White, Red, Green, Yellow
 * 
 * Designed for subtle, elegant placement throughout the site.
 */

interface PrayerFlagsProps {
  variant?: 'horizontal' | 'curved' | 'diagonal' | 'corner';
  className?: string;
  opacity?: number;
}

export function PrayerFlags({ 
  variant = 'curved', 
  className = '',
  opacity = 0.4 
}: PrayerFlagsProps) {
  const renderFlags = () => {
    switch (variant) {
      case 'horizontal':
        return (
          <g>
            {/* String */}
            <line x1="0" y1="20" x2="200" y2="20" stroke="#1a1a1a" strokeWidth="0.5" opacity={opacity * 0.6} />
            {/* Flags */}
            <rect x="10" y="15" width="12" height="10" fill="#3b82f6" opacity={opacity} />
            <rect x="26" y="15" width="12" height="10" fill="#ffffff" opacity={opacity} />
            <rect x="42" y="15" width="12" height="10" fill="#ef4444" opacity={opacity} />
            <rect x="58" y="15" width="12" height="10" fill="#22c55e" opacity={opacity} />
            <rect x="74" y="15" width="12" height="10" fill="#eab308" opacity={opacity} />
            <rect x="90" y="15" width="12" height="10" fill="#3b82f6" opacity={opacity} />
            <rect x="106" y="15" width="12" height="10" fill="#ffffff" opacity={opacity} />
            <rect x="122" y="15" width="12" height="10" fill="#ef4444" opacity={opacity} />
            <rect x="138" y="15" width="12" height="10" fill="#22c55e" opacity={opacity} />
            <rect x="154" y="15" width="12" height="10" fill="#eab308" opacity={opacity} />
            <rect x="170" y="15" width="12" height="10" fill="#3b82f6" opacity={opacity} />
          </g>
        );
      
      case 'curved':
        return (
          <g>
            {/* Curved string */}
            <path 
              d="M 0 30 Q 100 10 200 30" 
              fill="none" 
              stroke="#1a1a1a" 
              strokeWidth="0.5" 
              opacity={opacity * 0.6} 
            />
            {/* Flags along curve */}
            <rect x="10" y="25" width="10" height="8" fill="#3b82f6" opacity={opacity} transform="rotate(-2 15 29)" />
            <rect x="26" y="22" width="10" height="8" fill="#ffffff" opacity={opacity} transform="rotate(-1 31 26)" />
            <rect x="42" y="19" width="10" height="8" fill="#ef4444" opacity={opacity} />
            <rect x="58" y="18" width="10" height="8" fill="#22c55e" opacity={opacity} transform="rotate(1 63 22)" />
            <rect x="74" y="19" width="10" height="8" fill="#eab308" opacity={opacity} transform="rotate(2 79 23)" />
            <rect x="90" y="22" width="10" height="8" fill="#3b82f6" opacity={opacity} transform="rotate(1 95 26)" />
            <rect x="106" y="25" width="10" height="8" fill="#ffffff" opacity={opacity} transform="rotate(2 111 29)" />
            <rect x="122" y="28" width="10" height="8" fill="#ef4444" opacity={opacity} transform="rotate(1 127 32)" />
            <rect x="138" y="27" width="10" height="8" fill="#22c55e" opacity={opacity} />
            <rect x="154" y="26" width="10" height="8" fill="#eab308" opacity={opacity} transform="rotate(-1 159 30)" />
            <rect x="170" y="27" width="10" height="8" fill="#3b82f6" opacity={opacity} transform="rotate(-2 175 31)" />
          </g>
        );
      
      case 'diagonal':
        return (
          <g>
            {/* Diagonal string */}
            <line x1="0" y1="40" x2="200" y2="0" stroke="#1a1a1a" strokeWidth="0.5" opacity={opacity * 0.6} />
            {/* Flags along diagonal */}
            <rect x="15" y="35" width="10" height="8" fill="#3b82f6" opacity={opacity} transform="rotate(-20 20 39)" />
            <rect x="35" y="30" width="10" height="8" fill="#ffffff" opacity={opacity} transform="rotate(-20 40 34)" />
            <rect x="55" y="25" width="10" height="8" fill="#ef4444" opacity={opacity} transform="rotate(-20 60 29)" />
            <rect x="75" y="20" width="10" height="8" fill="#22c55e" opacity={opacity} transform="rotate(-20 80 24)" />
            <rect x="95" y="15" width="10" height="8" fill="#eab308" opacity={opacity} transform="rotate(-20 100 19)" />
            <rect x="115" y="10" width="10" height="8" fill="#3b82f6" opacity={opacity} transform="rotate(-20 120 14)" />
            <rect x="135" y="5" width="10" height="8" fill="#ffffff" opacity={opacity} transform="rotate(-20 140 9)" />
            <rect x="155" y="0" width="10" height="8" fill="#ef4444" opacity={opacity} transform="rotate(-20 160 4)" />
            <rect x="175" y="-5" width="10" height="8" fill="#22c55e" opacity={opacity} transform="rotate(-20 180 -1)" />
          </g>
        );
      
      case 'corner':
        return (
          <g>
            {/* Corner string - L shape */}
            <line x1="0" y1="0" x2="0" y2="100" stroke="#1a1a1a" strokeWidth="0.5" opacity={opacity * 0.6} />
            <line x1="0" y1="100" x2="100" y2="100" stroke="#1a1a1a" strokeWidth="0.5" opacity={opacity * 0.6} />
            {/* Vertical flags */}
            <rect x="-5" y="10" width="8" height="10" fill="#3b82f6" opacity={opacity} />
            <rect x="-5" y="24" width="8" height="10" fill="#ffffff" opacity={opacity} />
            <rect x="-5" y="38" width="8" height="10" fill="#ef4444" opacity={opacity} />
            <rect x="-5" y="52" width="8" height="10" fill="#22c55e" opacity={opacity} />
            <rect x="-5" y="66" width="8" height="10" fill="#eab308" opacity={opacity} />
            <rect x="-5" y="80" width="8" height="10" fill="#3b82f6" opacity={opacity} />
            {/* Horizontal flags */}
            <rect x="5" y="95" width="10" height="8" fill="#ffffff" opacity={opacity} />
            <rect x="19" y="95" width="10" height="8" fill="#ef4444" opacity={opacity} />
            <rect x="33" y="95" width="10" height="8" fill="#22c55e" opacity={opacity} />
            <rect x="47" y="95" width="10" height="8" fill="#eab308" opacity={opacity} />
            <rect x="61" y="95" width="10" height="8" fill="#3b82f6" opacity={opacity} />
            <rect x="75" y="95" width="10" height="8" fill="#ffffff" opacity={opacity} />
            <rect x="89" y="95" width="10" height="8" fill="#ef4444" opacity={opacity} />
          </g>
        );
      
      default:
        return null;
    }
  };

  const viewBoxMap = {
    horizontal: "0 0 200 40",
    curved: "0 0 200 40",
    diagonal: "0 0 200 40",
    corner: "0 0 100 100"
  };

  return (
    <svg
      viewBox={viewBoxMap[variant]}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      role="presentation"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderFlags()}
    </svg>
  );
}

