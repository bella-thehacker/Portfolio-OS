import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// 📁 My Files: Large retro folder with tab and paper sheets peeking out
export const RetroFolderIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Back folder tab */}
    <path d="M4 12H20L24 16H42C43.1 16 44 16.9 44 18V38C44 39.1 43.1 40 42 40H4C2.9 40 2 39.1 2 38V14C2 12.9 2.9 12 4 12Z" fill="#1C3520" stroke="#2E4D32" strokeWidth="2" />
    <path d="M4 14H19L23 18H41V22H4V14Z" fill="#2E4D32" />
    
    {/* Paper sheets inside */}
    <rect x="9" y="10" width="22" height="14" rx="1" fill="#E8DFC9" stroke="#070A07" strokeWidth="1" />
    <line x1="12" y1="14" x2="26" y2="14" stroke="#7FA67A" strokeWidth="1.5" />
    <line x1="12" y1="18" x2="22" y2="18" stroke="#7FA67A" strokeWidth="1.5" />
    
    {/* Front folder body with 3D bevel */}
    <path d="M2 19L6 41H42L46 19H2Z" fill="#D8A84E" />
    <path d="M4 21L7.5 39H40.5L44 21H4Z" fill="#C5963E" />
    {/* Top rim highlight */}
    <line x1="2" y1="19" x2="46" y2="19" stroke="#F0D080" strokeWidth="2" strokeLinecap="round" />
    {/* Bottom shadow */}
    <line x1="6" y1="41" x2="42" y2="41" stroke="#8A601E" strokeWidth="2" />
    {/* Front folder label plaque */}
    <rect x="15" y="27" width="18" height="6" rx="1" fill="#E8DFC9" stroke="#070A07" strokeWidth="1" />
    <line x1="18" y1="30" x2="29" y2="30" stroke="#18291B" strokeWidth="1" />
  </svg>
);

// 💻 Dev Studio: Chunky CRT Monitor with colorful code syntax window
export const RetroDevMonitorIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Monitor Outer Chassis */}
    <rect x="5" y="5" width="38" height="30" rx="3" fill="#E8DFC9" stroke="#070A07" strokeWidth="2" />
    {/* Chassis top highlight */}
    <line x1="6" y1="6" x2="42" y2="6" stroke="#FFFDF6" strokeWidth="2" />
    {/* Bevel inset */}
    <rect x="8" y="8" width="32" height="23" rx="2" fill="#18291B" stroke="#070A07" strokeWidth="1.5" />
    
    {/* Screen glass */}
    <rect x="10" y="10" width="28" height="19" rx="1" fill="#102015" />
    
    {/* Screen code elements */}
    <line x1="13" y1="14" x2="20" y2="14" stroke="#D8A84E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="14" x2="28" y2="14" stroke="#7FA67A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="18" x2="25" y2="18" stroke="#C9D6A3" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="22" x2="22" y2="22" stroke="#E8DFC9" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="22" x2="26" y2="22" stroke="#D8A84E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Blinking cursor */}
    <rect x="28" y="21" width="2" height="3" fill="#7FA67A" />

    {/* Power LED on Monitor */}
    <circle cx="39" cy="32" r="1.5" fill="#7FA67A" />

    {/* Monitor Stand */}
    <path d="M19 35H29L31 39H17L19 35Z" fill="#C5BAA2" stroke="#070A07" strokeWidth="1.5" />
    {/* Stand Base */}
    <rect x="14" y="39" width="20" height="4" rx="1" fill="#E8DFC9" stroke="#070A07" strokeWidth="1.5" />
  </svg>
);

// 🛡️ Security Lab: Friendly metallic shield with lock and circuitry
export const RetroSecurityShieldIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Shield Outer Outline with Gold/Amber Rim */}
    <path
      d="M24 4L40 10V22C40 32.5 32.5 40.5 24 44C15.5 40.5 8 32.5 8 22V10L24 4Z"
      fill="#D8A84E"
      stroke="#070A07"
      strokeWidth="2"
    />
    {/* Shield Inner Forest Surface */}
    <path
      d="M24 7L37 12V22C37 30.5 31 37.5 24 40.5C17 37.5 11 30.5 11 22V12L24 7Z"
      fill="#18291B"
    />
    
    {/* Circuit Lines */}
    <path d="M16 16H20V20" stroke="#7FA67A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 16H28V20" stroke="#7FA67A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="1.5" fill="#C9D6A3" />
    <circle cx="32" cy="16" r="1.5" fill="#C9D6A3" />

    {/* Central Padlock / Shield Emblem */}
    <rect x="19" y="23" width="10" height="9" rx="1" fill="#E8DFC9" stroke="#070A07" strokeWidth="1.5" />
    <path d="M21 23V20C21 18.34 22.34 17 24 17C25.66 17 27 18.34 27 20V23" stroke="#E8DFC9" strokeWidth="2" strokeLinecap="round" />
    {/* Keyhole */}
    <circle cx="24" cy="27" r="1.5" fill="#18291B" />
    <path d="M24 28.5V30" stroke="#18291B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 🎮 Arcade: Colorful retro game controller / console
export const RetroArcadeIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Controller Body */}
    <rect x="4" y="14" width="40" height="22" rx="6" fill="#1C3520" stroke="#070A07" strokeWidth="2" />
    {/* Top Bevel Highlight */}
    <path d="M8 15H40" stroke="#3A573F" strokeWidth="2" strokeLinecap="round" />
    
    {/* Left Grip / D-PAD Plate */}
    <rect x="8" y="17" width="14" height="16" rx="2" fill="#102015" />
    {/* D-Pad cross */}
    <path d="M14 20H16V24H20V26H16V30H14V26H10V24H14V20Z" fill="#E8DFC9" stroke="#070A07" strokeWidth="1" />
    <circle cx="15" cy="25" r="1" fill="#D8A84E" />

    {/* Center Select / Start Buttons */}
    <rect x="23" y="27" width="4" height="2" rx="0.5" transform="rotate(-25 23 27)" fill="#7FA67A" />
    <rect x="27" y="27" width="4" height="2" rx="0.5" transform="rotate(-25 27 27)" fill="#7FA67A" />

    {/* Right Action Buttons */}
    <circle cx="34" cy="22" r="3" fill="#D8A84E" stroke="#070A07" strokeWidth="1" />
    <circle cx="39" cy="27" r="3" fill="#7FA67A" stroke="#070A07" strokeWidth="1" />
    <circle cx="34" cy="29" r="2.5" fill="#E8DFC9" stroke="#070A07" strokeWidth="0.8" />
  </svg>
);

// 📄 Resume: Physical paper document with folded top corner
export const RetroResumeIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Document Body with folded corner */}
    <path
      d="M10 6C10 4.89543 10.8954 4 12 4H28L38 14V42C38 43.1046 37.1046 44 36 44H12C10.8954 44 10 43.1046 10 42V6Z"
      fill="#E8DFC9"
      stroke="#070A07"
      strokeWidth="2"
    />
    {/* Folded corner flap */}
    <path d="M28 4V14H38L28 4Z" fill="#C5BAA2" stroke="#070A07" strokeWidth="1.5" />
    
    {/* Document Header Bar */}
    <rect x="15" y="12" width="10" height="3" fill="#18291B" />
    
    {/* Profile avatar square */}
    <rect x="15" y="18" width="6" height="6" fill="#D8A84E" stroke="#070A07" strokeWidth="1" />
    
    {/* Text Lines */}
    <line x1="24" y1="19" x2="33" y2="19" stroke="#7FA67A" strokeWidth="1.5" />
    <line x1="24" y1="23" x2="31" y2="23" stroke="#2E4532" strokeWidth="1.5" />
    
    <line x1="15" y1="28" x2="33" y2="28" stroke="#18291B" strokeWidth="1.5" />
    <line x1="15" y1="32" x2="30" y2="32" stroke="#2E4532" strokeWidth="1.5" />
    <line x1="15" y1="36" x2="27" y2="36" stroke="#7FA67A" strokeWidth="1.5" />
    <line x1="15" y1="40" x2="33" y2="40" stroke="#2E4532" strokeWidth="1.5" />
  </svg>
);

// ✉️ Contact: Classic vintage mail envelope
export const RetroContactIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Envelope Main Body */}
    <rect x="4" y="12" width="40" height="26" rx="2" fill="#E8DFC9" stroke="#070A07" strokeWidth="2" />
    
    {/* Stamp in upper corner */}
    <rect x="34" y="14" width="7" height="9" fill="#D8A84E" stroke="#070A07" strokeWidth="1" />
    <path d="M37.5 17L39 20H36L37.5 17Z" fill="#18291B" />

    {/* Postmark wave */}
    <path d="M26 18C28 17 29 19 31 18" stroke="#7FA67A" strokeWidth="1" strokeLinecap="round" />
    <path d="M26 21C28 20 29 22 31 21" stroke="#7FA67A" strokeWidth="1" strokeLinecap="round" />

    {/* Envelope fold lines */}
    <path d="M4 13L24 28L44 13" stroke="#070A07" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 38L18 24" stroke="#070A07" strokeWidth="1.5" />
    <path d="M44 38L30 24" stroke="#070A07" strokeWidth="1.5" />

    {/* Wax / Postal Seal in center */}
    <circle cx="24" cy="27" r="4.5" fill="#7FA67A" stroke="#070A07" strokeWidth="1.5" />
    <circle cx="24" cy="27" r="2.5" fill="#18291B" />
  </svg>
);

// ⚙️ Settings: Chunky mechanical brass/steel gear
export const RetroSettingsIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Mechanical Gear */}
    <path
      d="M21 4H27V9.2C28.4 9.6 29.8 10.2 31 11L35 7.5L39.5 12L36 16C36.8 17.2 37.4 18.6 37.8 20H43V26H37.8C37.4 27.4 36.8 28.8 36 30L39.5 34.5L35 39L31 35.5C29.8 36.3 28.4 36.9 27 37.3V42.5H21V37.3C19.6 36.9 18.2 36.3 17 35.5L13 39L8.5 34.5L12 30C11.2 28.8 10.6 27.4 10.2 26H5V20H10.2C10.6 18.6 11.2 17.2 12 16L8.5 12L13 7.5L17 11C18.2 10.2 19.6 9.6 21 9.2V4Z"
      fill="#D8A84E"
      stroke="#070A07"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner bevel circle */}
    <circle cx="24" cy="23.5" r="9" fill="#18291B" stroke="#070A07" strokeWidth="1.5" />
    <circle cx="24" cy="23.5" r="5" fill="#E8DFC9" stroke="#070A07" strokeWidth="1.5" />
    <circle cx="24" cy="23.5" r="2" fill="#070A07" />
  </svg>
);

// 🖥️ Terminal: Small black CRT monitor with blinking prompt
export const RetroTerminalIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Dark Retro Monitor Casing */}
    <rect x="6" y="6" width="36" height="28" rx="3" fill="#18291B" stroke="#070A07" strokeWidth="2" />
    <rect x="9" y="9" width="30" height="22" rx="2" fill="#070A07" stroke="#2E4532" strokeWidth="1" />
    
    {/* Screen Prompt >_ */}
    <path d="M13 15L17 18L13 21" stroke="#7FA67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="21" x2="25" y2="21" stroke="#D8A84E" strokeWidth="2" strokeLinecap="round" />
    
    <path d="M13 24H22" stroke="#3A573F" strokeWidth="1" />

    {/* Monitor Base */}
    <rect x="20" y="34" width="8" height="5" fill="#102015" stroke="#070A07" strokeWidth="1" />
    <rect x="15" y="39" width="18" height="3" rx="1" fill="#18291B" stroke="#070A07" strokeWidth="1.5" />
  </svg>
);

// 👤 System / About Ivy: Retro Desktop Workstation Tower & Badge
export const RetroSystemIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-sm select-none ${className}`}
  >
    {/* Beige Mini Tower */}
    <rect x="10" y="6" width="28" height="36" rx="2" fill="#E8DFC9" stroke="#070A07" strokeWidth="2" />
    {/* 3.5 Floppy Disk Drive */}
    <rect x="14" y="11" width="20" height="4" fill="#18291B" stroke="#070A07" strokeWidth="1" />
    <line x1="16" y1="13" x2="28" y2="13" stroke="#070A07" strokeWidth="1" />
    <circle cx="31" cy="13" r="0.8" fill="#7FA67A" />

    {/* CD-ROM Drive */}
    <rect x="14" y="18" width="20" height="5" fill="#C5BAA2" stroke="#070A07" strokeWidth="1" />
    <line x1="16" y1="20.5" x2="29" y2="20.5" stroke="#18291B" strokeWidth="1" />
    <rect x="30" y="20" width="2" height="1.5" fill="#070A07" />

    {/* Ventilation Slits */}
    <line x1="14" y1="27" x2="24" y2="27" stroke="#8A7D65" strokeWidth="1.5" />
    <line x1="14" y1="30" x2="24" y2="30" stroke="#8A7D65" strokeWidth="1.5" />
    <line x1="14" y1="33" x2="24" y2="33" stroke="#8A7D65" strokeWidth="1.5" />

    {/* Power and Turbo Buttons */}
    <circle cx="31" cy="30" r="2" fill="#D8A84E" stroke="#070A07" strokeWidth="1" />
    <circle cx="31" cy="36" r="1.5" fill="#7FA67A" stroke="#070A07" strokeWidth="1" />
  </svg>
);

// Map helper to resolve an icon by ID or name
export const renderRetroIcon = (id: string, size = 40, className = '') => {
  switch (id) {
    case 'files':
      return <RetroFolderIcon size={size} className={className} />;
    case 'dev_studio':
      return <RetroDevMonitorIcon size={size} className={className} />;
    case 'security':
      return <RetroSecurityShieldIcon size={size} className={className} />;
    case 'arcade':
      return <RetroArcadeIcon size={size} className={className} />;
    case 'resume':
      return <RetroResumeIcon size={size} className={className} />;
    case 'contact':
      return <RetroContactIcon size={size} className={className} />;
    case 'settings':
      return <RetroSettingsIcon size={size} className={className} />;
    case 'terminal':
      return <RetroTerminalIcon size={size} className={className} />;
    case 'system':
    case 'sys_health':
    default:
      return <RetroSystemIcon size={size} className={className} />;
  }
};
