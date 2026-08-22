
import React from 'react';

const SecurityVisual = () => {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <div className="absolute -inset-6 bg-glow-primary blur-2xl rounded-full" aria-hidden="true" />
      <svg
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Иллюстрация на тему цифровой безопасности: защищённый аккаунт под защитой цифрового щита с замком и ключом"
        className="relative w-full h-auto drop-shadow-2xl rounded-3xl"
      >
        <defs>
          <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d2137" />
            <stop offset="55%" stopColor="#123252" />
            <stop offset="100%" stopColor="#0a1a2e" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4fb3c6" />
            <stop offset="100%" stopColor="#2e6fae" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
            <stop offset="0%" stopColor="#67c6d8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#67c6d8" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="10" y="10" width="540" height="540" rx="28" fill="url(#panel)" />
        <rect x="10" y="10" width="540" height="540" rx="28" fill="url(#grid)" />
        <rect x="10" y="10" width="540" height="540" rx="28" fill="url(#glow)" />

        <circle cx="280" cy="270" r="168" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
        <circle cx="280" cy="270" r="128" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="280" cy="270" r="208" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1.5" />

        <g className="animate-float-slow" style={{ transformOrigin: 'center' }}>
          <circle cx="448" cy="150" r="7" fill="#67c6d8" opacity="0.9" />
          <circle cx="112" cy="392" r="5" fill="#ffffff" opacity="0.35" />
          <circle cx="452" cy="386" r="4" fill="#ffffff" opacity="0.25" />
          <circle cx="120" cy="140" r="4" fill="#67c6d8" opacity="0.5" />
        </g>

        <g className="animate-float" style={{ transformOrigin: 'center' }}>
          <rect x="52" y="196" width="118" height="64" rx="14" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.16" />
          <circle cx="88" cy="228" r="15" fill="none" stroke="#9fd8e4" strokeWidth="3" />
          <path d="M82 228 v12 a3 3 0 0 0 3 3 h6 a3 3 0 0 0 3 -3 v-12" fill="none" stroke="#9fd8e4" strokeWidth="3" strokeLinecap="round" />
          <rect x="114" y="222" width="42" height="5" rx="2.5" fill="#ffffff" opacity="0.35" />
          <rect x="114" y="233" width="30" height="5" rx="2.5" fill="#ffffff" opacity="0.2" />
        </g>

        <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDelay: '-3s' }}>
          <rect x="392" y="330" width="122" height="66" rx="14" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.16" />
          <circle cx="426" cy="363" r="11" fill="none" stroke="#9fd8e4" strokeWidth="3.5" />
          <path d="M434 371 l20 20" stroke="#9fd8e4" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M450 387 l7 -7 M455 392 l7 -7" stroke="#9fd8e4" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="446" y="342" width="54" height="5" rx="2.5" fill="#ffffff" opacity="0.3" />
          <rect x="446" y="353" width="38" height="5" rx="2.5" fill="#ffffff" opacity="0.18" />
        </g>

        <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDelay: '-5s' }}>
          <rect x="86" y="330" width="96" height="60" rx="14" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.16" />
          <path d="M110 360 l9 9 18 -19" stroke="#8fe0c6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="146" y="350" width="24" height="5" rx="2.5" fill="#ffffff" opacity="0.3" />
          <rect x="146" y="361" width="17" height="5" rx="2.5" fill="#ffffff" opacity="0.18" />
        </g>

        <g>
          <path
            d="M280 148 l104 38 v96 c0 84 -43 138 -104 166 c-61 -28 -104 -82 -104 -166 v-96 z"
            fill="url(#shieldGrad)"
          />
          <path
            d="M280 148 l104 38 v96 c0 84 -43 138 -104 166 c-61 -28 -104 -82 -104 -166 v-96 z"
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
          <path
            d="M280 176 l80 29 v77 c0 66 -33 109 -80 132 c-47 -23 -80 -66 -80 -132 v-77 z"
            fill="#0d2137"
            fillOpacity="0.35"
          />
          <circle cx="280" cy="272" r="26" fill="#0d2137" />
          <path d="M280 284 l-13 44 h26 z" fill="#0d2137" />
          <circle cx="280" cy="272" r="10" fill="#cdeef5" />
          <path d="M274 300 h12 l4 22 h-20 z" fill="#cdeef5" />
        </g>

        <text x="280" y="500" textAnchor="middle" fill="#ffffff" fillOpacity="0.45" fontSize="15" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
          DIGITAL ACCESS SECURITY
        </text>
      </svg>
    </div>
  );
};

export default SecurityVisual;
