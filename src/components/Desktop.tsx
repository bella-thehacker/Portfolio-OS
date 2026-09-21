import React, { useState, useEffect } from 'react';
import { AppID } from '../types';
import { sound } from '../utils/audio';
import {
  RetroFolderIcon,
  RetroDevMonitorIcon,
  RetroSecurityShieldIcon,
  RetroArcadeIcon,
  RetroResumeIcon,
  RetroContactIcon,
  RetroSettingsIcon,
  RetroTerminalIcon,
  RetroSystemIcon,
} from './RetroIcons';

interface DesktopProps {
  onOpenApp: (appId: AppID) => void;
  onOpenSysHealth: () => void;
}

interface DesktopAppItem {
  id: AppID;
  label: string;
  machineName: string;
  iconComponent: React.ComponentType<{ size?: number; className?: string }>;
}

export const Desktop: React.FC<DesktopProps> = ({ onOpenApp, onOpenSysHealth }) => {
  const [selectedAppId, setSelectedAppId] = useState<AppID | null>(null);
  const [loadedIconsCount, setLoadedIconsCount] = useState<number>(0);

  const desktopApps: DesktopAppItem[] = [
    { id: 'files', label: 'My Files', machineName: 'MYFILES.EXE', iconComponent: RetroFolderIcon },
    { id: 'dev_studio', label: 'Dev Studio', machineName: 'DEVSTUDIO.EXE', iconComponent: RetroDevMonitorIcon },
    { id: 'security', label: 'Security Lab', machineName: 'SECURITY.SYS', iconComponent: RetroSecurityShieldIcon },
    { id: 'arcade', label: 'Arcade', machineName: 'ARCADE.DLL', iconComponent: RetroArcadeIcon },
    { id: 'resume', label: 'My Resume', machineName: 'RESUME.DOC', iconComponent: RetroResumeIcon },
    { id: 'contact', label: 'Contact', machineName: 'CONTACT.EXE', iconComponent: RetroContactIcon },
    { id: 'settings', label: 'Settings', machineName: 'SETTINGS.CFG', iconComponent: RetroSettingsIcon },
    { id: 'terminal', label: 'Terminal', machineName: 'TERMINAL.BIN', iconComponent: RetroTerminalIcon },
    { id: 'system', label: 'About Ivy', machineName: 'SYSTEM.SYS', iconComponent: RetroSystemIcon },
  ];

  // Sequential icon loading sequence: Pop -> Glow -> Settle
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLoadedIconsCount(count);
      if (count >= desktopApps.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleIconClick = (app: DesktopAppItem) => {
    // If on mobile/small screen or already selected, launch the application
    if (selectedAppId === app.id || (typeof window !== 'undefined' && window.innerWidth < 768)) {
      sound.playWindowOpen();
      onOpenApp(app.id);
      setSelectedAppId(null);
    } else {
      setSelectedAppId(app.id);
      sound.playClick(720);
    }
  };

  const handleIconDoubleClick = (app: DesktopAppItem) => {
    sound.playWindowOpen();
    onOpenApp(app.id);
    setSelectedAppId(null);
  };

  return (
    <div
      id="desktop-canvas"
      className="absolute inset-0 pb-12 bg-desktop-subtle overflow-hidden select-none"
      onClick={() => setSelectedAppId(null)}
    >
      {/* Calm, Quiet Desktop Top Bar */}
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-[#2A3B45]/70 text-xs font-system-ui text-[#B8B09D] bg-[#0A0D0B]/70 backdrop-blur-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-sm text-[#E8DFC9] tracking-wider font-retro-display phosphor-glow">
            CTRL OS
          </span>
          <span className="text-[#526A78]">&bull;</span>
          <span className="text-xs text-[#D8A84E] font-mono-tech">Ivy's Personal Computer</span>
          <span className="hidden sm:inline text-xs text-[#7FA67A]">
            [Projects &bull; Security &bull; Arcade]
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-1.5 text-[#7FA67A]">
            <span className="w-2 h-2 rounded-full bg-[#7FA67A] shadow-[0_0_6px_#7FA67A]" />
            <span>SYS &bull; READY</span>
          </div>
          <span className="hidden md:inline text-[#526A78]">|</span>
          <button
            id="btn-desktop-monitor"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick(600);
              onOpenSysHealth();
            }}
            className="text-[11px] text-[#B8B09D] hover:text-[#D8A84E] transition-colors border border-transparent hover:border-[#526A78] px-1.5 py-0.5 cursor-pointer"
            title="Open System Monitor"
          >
            System Status
          </button>
        </div>
      </header>

      {/* Spacious Desktop Body */}
      <main className="p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start gap-8 h-[calc(100%-48px)]">
        {/* Desktop Application Icons Grid: Large, Friendly, Expressive */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-y-7 gap-x-6 sm:gap-x-10 max-w-md">
          {desktopApps.map((app, index) => {
            const Icon = app.iconComponent;
            const isLoaded = index < loadedIconsCount;
            const isSelected = selectedAppId === app.id;

            return (
              <div
                key={app.id}
                id={`desktop-icon-${app.id}`}
                tabIndex={0}
                role="button"
                aria-label={`Open ${app.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(app);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleIconDoubleClick(app);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleIconDoubleClick(app);
                  }
                }}
                className={`group flex flex-col items-center justify-center p-2.5 rounded-sm transition-all duration-150 cursor-pointer text-center relative outline-none ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                } ${
                  isSelected
                    ? 'bg-[#526A78]/35 border-2 border-[#526A78] shadow-[0_0_12px_rgba(82,106,120,0.4)]'
                    : 'border-2 border-transparent hover:border-[#526A78]/50 hover:bg-[#152026]/40'
                }`}
              >
                {/* Large Illustrated Retro Icon */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-150 ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                >
                  <Icon size={46} className="transition-all duration-150" />
                </div>

                {/* Friendly Human-Readable Label */}
                <span
                  className={`mt-2 text-xs sm:text-sm font-system-ui font-medium tracking-wide transition-colors truncate max-w-[100px] ${
                    isSelected
                      ? 'text-[#E8DFC9] bg-[#526A78] px-2 py-0.5 border border-[#E8DFC9]/70 font-semibold'
                      : 'text-[#E8DFC9] group-hover:text-[#D8A84E]'
                  }`}
                >
                  {app.label}
                </span>

                {/* Machine Layer Tooltip / Sub-label */}
                <span className="text-[10px] font-mono-tech text-[#7FA67A]/80 group-hover:text-[#D8A84E] transition-colors mt-0.5">
                  {app.machineName}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quiet Desktop Watermark and Aesthetic Inspiration */}
        <aside className="hidden lg:flex flex-col items-end text-right text-[#2B3B44] font-mono-tech text-xs select-none pointer-events-none mt-auto mb-10 mr-4">
          <div className="text-4xl font-retro-display tracking-widest text-[#24333C]">
            CTRL OS
          </div>
          <div className="text-[11px] tracking-widest text-[#3B4E5B] mt-0.5">
            PERSONAL COMPUTER SYSTEM &bull; BUILD 2026.09
          </div>
          <div className="text-[10px] text-[#2E3F49] mt-1">
            CATHOLIC UNIVERSITY OF EASTERN AFRICA &bull; CYBER SHUJAA
          </div>
          <div className="w-56 h-[1px] bg-[#1E2B32] my-2" />
          <div className="text-[10px] text-[#526A78] font-system-ui">
            Vintage Machine. Modern Mind.
          </div>
        </aside>

        {/* Calm System Monitor Card */}
        <aside
          id="desktop-system-monitor-card"
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick(600);
            onOpenSysHealth();
          }}
          className="w-full sm:w-64 p-4 bg-[#131A1E]/95 border-2 border-[#526A78]/70 retro-bevel cursor-pointer hover:border-[#D8A84E] transition-all text-xs font-system-ui select-none shadow-xl mt-auto md:mt-0"
        >
          <div className="flex items-center justify-between border-b border-[#2B3B44] pb-2 mb-2.5">
            <span className="font-bold text-xs text-[#E8DFC9] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7FA67A]" />
              System Status
            </span>
            <span className="text-[10px] font-mono-tech text-[#7FA67A]">NORMAL</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono-tech">
            <div className="flex justify-between items-center">
              <span className="text-[#B8B09D]">CPU:</span>
              <span className="text-[#7FA67A] font-bold">NORMAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#B8B09D]">MEMORY:</span>
              <span className="text-[#7FA67A] font-bold">NORMAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#B8B09D]">NETWORK:</span>
              <span className="text-[#7FA67A] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA67A]" /> CONNECTED
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#B8B09D]">SECURITY:</span>
              <span className="text-[#7FA67A] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA67A]" /> SECURE
              </span>
            </div>
          </div>

          <div className="pt-2.5 mt-2.5 border-t border-[#2B3B44] flex items-center justify-between text-[11px] font-system-ui text-[#B8B09D]">
            <span>Ivy Mburu</span>
            <span className="text-[#D8A84E] font-mono-tech">CS Y3.2</span>
          </div>
        </aside>
      </main>
    </div>
  );
};
