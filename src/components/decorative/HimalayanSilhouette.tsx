/**
 * HimalayanSilhouette Component
 * 
 * An artistic, colorful silhouette combining Himalayan mountain ranges
 * with Kathmandu architectural elements, prayer flags, trees, and wildlife.
 * Inspired by traditional Nepali art with vibrant colors and fun details.
 */

interface HimalayanSilhouetteProps {
  className?: string;
  variant?: 'footer' | 'page';
}

export function HimalayanSilhouette({ className = '', variant = 'footer' }: HimalayanSilhouetteProps) {
  const height = variant === 'footer' ? 260 : 300;
  
  return (
    <div className={`w-full relative ${className}`} style={{ height: `${height}px` }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 260"
        width="100%"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="Layered Himalayan mountains with fog, Kathmandu skyline, prayer flags, and stupas"
        className="w-full h-full"
      >
        <defs>
          {/* Sky */}
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d9ecff" />
            <stop offset="40%" stopColor="#94b9f5" />
            <stop offset="100%" stopColor="#162447" />
          </linearGradient>
          {/* Mountain layers; lighter to darker */}
          <linearGradient id="mtnFar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5fbff" />
            <stop offset="100%" stopColor="#c7ddf6" />
          </linearGradient>
          <linearGradient id="mtnMidFar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b3cbee" />
            <stop offset="100%" stopColor="#8ea9dd" />
          </linearGradient>
          <linearGradient id="mtnMidNear" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6a84b9" />
            <stop offset="100%" stopColor="#475b8e" />
          </linearGradient>
          <linearGradient id="mtnNear" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#283453" />
            <stop offset="100%" stopColor="#11192b" />
          </linearGradient>
          {/* Fog bands */}
          <linearGradient id="fogBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fogBand2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="1440" height="260" fill="url(#skyGradient)" />

        {/* High snowy peaks (simplified Annapurna style) */}
        <path
          d="M160 140
             L280 60 L360 110 L430 80 L520 130 L600 70 L720 135
             L840 65 L930 120 L1000 90 L1130 140 L1250 80 L1380 125
             L1440 115 L1440 260 L0 260 Z"
          fill="url(#mtnFar)"
          opacity="0.9"
        />

        {/* Far mid range */}
        <path
          d="M0 170
             L90 145 L190 165 L270 140 L360 170 L450 145 L560 165
             L650 145 L760 170 L860 150 L960 175 L1060 150 L1180 175
             L1300 155 L1440 180
             L1440 260 L0 260 Z"
          fill="url(#mtnMidFar)"
          opacity="0.9"
        />

        {/* Fog in front of far mid range */}
        <path
          d="M0 150
             C220 140 450 155 720 145
             C1000 135 1230 150 1440 140
             L1440 200 L0 200 Z"
          fill="url(#fogBand)"
          opacity="0.85"
        />

        {/* Mid near range */}
        <path
          d="M0 195
             L80 175 L170 190 L260 170 L350 195 L460 180 L560 200
             L660 178 L770 198 L870 182 L980 200 L1090 182 L1200 205
             L1320 188 L1440 205
             L1440 260 L0 260 Z"
          fill="url(#mtnMidNear)"
          opacity="0.95"
        />

        {/* More fog closer to viewer */}
        <path
          d="M0 190
             C200 185 420 195 640 190
             C860 185 1100 195 1440 188
             L1440 230 L0 230 Z"
          fill="url(#fogBand2)"
          opacity="0.9"
        />

        {/* Foreground ridge */}
        <path
          d="M0 215
             C180 205 320 212 480 208
             C650 204 820 210 980 210
             C1150 210 1290 205 1440 210
             L1440 260 L0 260 Z"
          fill="url(#mtnNear)"
        />

        {/* Prayer flag rope */}
        <path
          d="M0 95
             C260 45 520 85 780 65
             C1020 50 1250 80 1440 55"
          fill="none"
          stroke="#142038"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Prayer flags */}
        <g opacity="0.75">
          {/* Left run */}
          <polygon points="40,87 60,77 60,97" fill="#ff5b5b" />
          <polygon points="80,81 100,71 100,91" fill="#ffd857" />
          <polygon points="120,75 140,65 140,85" fill="#2ad58b" />
          <polygon points="160,69 180,59 180,79" fill="#4fd2ff" />
          <polygon points="200,65 220,55 220,75" fill="#ff8ef2" />
          <polygon points="240,61 260,51 260,71" fill="#ff5b5b" />
          <polygon points="280,57 300,47 300,67" fill="#ffd857" />
          <polygon points="320,55 340,45 340,65" fill="#2ad58b" />
          <polygon points="360,53 380,43 380,63" fill="#4fd2ff" />
          <polygon points="400,51 420,41 420,61" fill="#ff8ef2" />
          <polygon points="440,49 460,39 460,59" fill="#ff5b5b" />
          <polygon points="480,49 500,39 500,59" fill="#ffd857" />
          <polygon points="520,51 540,41 540,61" fill="#2ad58b" />
          <polygon points="560,53 580,43 580,63" fill="#4fd2ff" />
          <polygon points="600,55 620,45 620,65" fill="#ff8ef2" />
          <polygon points="640,57 660,47 660,67" fill="#ff5b5b" />
          <polygon points="680,59 700,49 700,69" fill="#ffd857" />
          <polygon points="720,57 740,47 740,67" fill="#2ad58b" />
          <polygon points="760,55 780,45 780,65" fill="#4fd2ff" />

          {/* Right run */}
          <polygon points="800,53 820,43 820,63" fill="#ff8ef2" />
          <polygon points="840,55 860,45 860,65" fill="#ff5b5b" />
          <polygon points="880,57 900,47 900,67" fill="#ffd857" />
          <polygon points="920,59 940,49 940,69" fill="#2ad58b" />
          <polygon points="960,61 980,51 980,71" fill="#4fd2ff" />
          <polygon points="1000,63 1020,53 1020,73" fill="#ff8ef2" />
          <polygon points="1040,65 1060,55 1060,75" fill="#ff5b5b" />
          <polygon points="1080,65 1100,55 1100,75" fill="#ffd857" />
          <polygon points="1120,63 1140,53 1140,73" fill="#2ad58b" />
          <polygon points="1160,61 1180,51 1180,71" fill="#4fd2ff" />
          <polygon points="1200,59 1220,49 1220,69" fill="#ff8ef2" />
          <polygon points="1240,57 1260,47 1260,67" fill="#ff5b5b" />
          <polygon points="1280,55 1300,45 1300,65" fill="#ffd857" />
          <polygon points="1320,53 1340,43 1340,63" fill="#2ad58b" />
          <polygon points="1360,51 1380,41 1380,61" fill="#4fd2ff" />
        </g>

        {/* Foreground silhouette: Swayambhu, stupas, temples, houses, trees, cows */}
        <g fill="#050816">
          {/* Ground */}
          <rect x="0" y="220" width="1440" height="40" />

          {/* Left stupa cluster */}
          <g transform="translate(210,180)">
            <circle cx="0" cy="32" r="26" />
            <rect x="-10" y="12" width="20" height="8" />
            <rect x="-3" y="-8" width="6" height="20" />
            <polygon points="-8,-8 0,-20 8,-8" />
            <rect x="-40" y="50" width="80" height="12" />
            <g transform="translate(-65,20)">
              <circle cx="0" cy="26" r="14" />
              <rect x="-14" y="26" width="28" height="10" />
            </g>
            <g transform="translate(65,22)">
              <circle cx="0" cy="24" r="13" />
              <rect x="-13" y="24" width="26" height="10" />
            </g>
          </g>

          {/* Central Swayambhu style complex */}
          <g transform="translate(720,170)">
            <ellipse cx="0" cy="40" rx="42" ry="30" />
            <rect x="-60" y="58" width="120" height="8" />
            <rect x="-50" y="66" width="100" height="8" />
            <rect x="-16" y="18" width="32" height="12" />
            <polygon points="0,0 -10,18 10,18" />
            <polygon points="0,-10 -8,0 8,0" />
            <polygon points="0,-18 -6,-10 6,-10" />
            <circle cx="0" cy="-22" r="3" />
            <g transform="translate(-85,20)">
              <ellipse cx="0" cy="34" rx="18" ry="14" />
              <rect x="-12" y="22" width="24" height="8" />
              <polygon points="0,10 -8,22 8,22" />
            </g>
            <g transform="translate(85,20)">
              <ellipse cx="0" cy="34" rx="18" ry="14" />
              <rect x="-12" y="22" width="24" height="8" />
              <polygon points="0,10 -8,22 8,22" />
            </g>
          </g>

          {/* Pagoda cluster on right */}
          <g transform="translate(1000,182)">
            <polygon points="-38,10 0,-15 38,10" />
            <rect x="-34" y="10" width="68" height="16" />
            <polygon points="-30,26 0,5 30,26" />
            <rect x="-26" y="26" width="52" height="24" />
            <rect x="-18" y="50" width="36" height="10" />
            <g transform="translate(70,10)">
              <polygon points="-26,8 0,-10 26,8" />
              <rect x="-22" y="8" width="44" height="12" />
              <rect x="-16" y="20" width="32" height="18" />
            </g>
            <g transform="translate(-70,22)">
              <circle cx="0" cy="28" r="16" />
              <rect x="-16" y="28" width="32" height="10" />
            </g>
          </g>

          {/* Mid left temple */}
          <g transform="translate(470,182)">
            <polygon points="-40,10 0,-15 40,10" />
            <rect x="-34" y="10" width="68" height="16" />
            <polygon points="-30,26 0,5 30,26" />
            <rect x="-26" y="26" width="52" height="24" />
            <rect x="-18" y="50" width="36" height="10" />
          </g>

          {/* Extra small shrines */}
          <g transform="translate(350,196)">
            <circle cx="0" cy="24" r="14" />
            <rect x="-14" y="24" width="28" height="10" />
          </g>
          <g transform="translate(620,198)">
            <circle cx="0" cy="23" r="13" />
            <rect x="-13" y="23" width="26" height="9" />
          </g>

          {/* Houses */}
          <g transform="translate(870,196)">
            <rect x="-30" y="10" width="40" height="20" />
            <polygon points="-35,10 -10,-5 15,10" />
            <rect x="25" y="8" width="32" height="22" />
            <polygon points="22,8 41,-6 60,8" />
          </g>

          {/* Trees and cows */}
          <g transform="translate(120,204)">
            <rect x="0" y="10" width="4" height="18" />
            <circle cx="2" cy="6" r="10" />
            <rect x="20" y="18" width="24" height="8" />
            <rect x="22" y="26" width="3" height="6" />
            <rect x="36" y="26" width="3" height="6" />
            <rect x="42" y="20" width="6" height="5" />
          </g>
          <g transform="translate(1080,206)">
            <rect x="0" y="8" width="4" height="18" />
            <circle cx="2" cy="4" r="9" />
            <rect x="18" y="16" width="22" height="8" />
            <rect x="20" y="24" width="3" height="6" />
            <rect x="32" y="24" width="3" height="6" />
            <rect x="38" y="18" width="6" height="5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
