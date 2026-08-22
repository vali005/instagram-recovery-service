import React from 'react';

const SecurityVisual = () => {
  return (
    <div
      className="relative w-full max-w-md mx-auto aspect-square"
      role="img"
      aria-label="Иллюстрация цифровой безопасности: щит с замком и защищённое соединение"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="sv-glow" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="hsl(214 55% 32%)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="hsl(214 55% 32%)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sv-shield" x1="120" y1="90" x2="280" y2="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(214 55% 34%)" />
            <stop offset="100%" stopColor="hsl(216 48% 18%)" />
          </linearGradient>
          <linearGradient id="sv-ring" x1="80" y1="60" x2="320" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(214 45% 45%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(214 45% 45%)" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="176" r="176" fill="url(#sv-glow)" />

        <circle cx="200" cy="180" r="158" stroke="url(#sv-ring)" strokeWidth="1.5" strokeDasharray="3 7" />
        <circle cx="200" cy="180" r="128" stroke="url(#sv-ring)" strokeWidth="1.5" />

        {[...Array(8)].map((_, row) =>
          [...Array(8)].map((__, col) => {
            const x = 28 + col * 24;
            const y = 300 + row * 12;
            const dx = x - 200;
            const dy = y - 180;
            if (Math.sqrt(dx * dx + dy * dy) > 190) return null;
            const opacity = 0.5 - Math.min(row * 0.05 + col % 3 * 0.06, 0.4);
            return (
              <circle key={`dot-${row}-${col}`} cx={x} cy={y} r={row === 0 ? 2 : 1.5} fill="hsl(214 40% 40%)" opacity={opacity} />
            );
          })
        )}

        <g strokeLinecap="round" className="text-primary" opacity="0.85">
          <path d="M64 96 h44 M86 74 v44" stroke="hsl(214 55% 38%)" strokeWidth="2" />
          <path d="M330 292 h36 M348 274 v36" stroke="hsl(214 45% 52%)" strokeWidth="2" />
          <circle cx="332" cy="84" r="10" stroke="hsl(214 45% 52%)" strokeWidth="2" />
          <path d="M332 94 v14" stroke="hsl(214 45% 52%)" strokeWidth="2" />
          <rect x="46" y="252" width="22" height="16" rx="4" stroke="hsl(214 40% 48%)" strokeWidth="2" transform="rotate(-14 57 260)" />
        </g>

        <path
          d="M200 96c26 20 58 30 88 30v66c0 62-36 108-88 132-52-24-88-70-88-132v-66c30 0 62-10 88-30z"
          fill="url(#sv-shield)"
        />
        <path
          d="M200 112c-22 15-49 23-72 25v55c0 51 29 89 72 111 43-22 72-60 72-111v-55c-23-2-50-10-72-25z"
          fill="#fff"
          opacity="0.07"
        />

        <rect x="172" y="172" width="56" height="44" rx="10" fill="#fff" opacity="0.95" />
        <path d="M182 172v-10a18 18 0 0 1 36 0v10" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="200" cy="192" r="7" fill="hsl(214 55% 30%)" />
        <rect x="197.5" y="196" width="5" height="11" rx="2.5" fill="hsl(214 55% 30%)" />

        <g opacity="0.9">
          <circle cx="200" cy="180" r="150" stroke="hsl(214 55% 40%)" strokeWidth="1.5" opacity="0.35" strokeDasharray="1 10" />
          <circle cx="350" cy="180" r="5" fill="hsl(214 55% 40%)" />
          <circle cx="50" cy="180" r="5" fill="hsl(214 55% 40%)" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};

export default SecurityVisual;
