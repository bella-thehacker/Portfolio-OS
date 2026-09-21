import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wifi, ShieldCheck, Activity } from 'lucide-react';
import { WindowState, AppID } from '../types';
import { sound } from '../utils/audio';
import { renderRetroIcon } from './RetroIcons';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: AppID | null;
  onFocusWindow: (id: AppID) => void;
  onToggleWindow: (id: AppID) => void;
  onToggleStartMenu: () => void;
  isStartMenuOpen: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSysHealth: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onFocusWindow,
  onToggleWindow,
  onToggleStartMenu,
  isStartMenuOpen,
  soundEnabled,
  onToggleSound,
  onOpenSysHealth
}) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showClockPopover, setShowClockPopover] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = windows.filter(w => w.isOpen);

  return (
    <footer
      id="system-taskbar"
      className="fixed bottom-0 left-0 right-0 h-10 bg-[#131A1E] border-t-2 border-[#526A78]/70 flex items-center justify-between px-2.5 z-40 select-none font-system-ui text-xs shadow-md"
    >
      {/* Start Button & Running Applications */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {/* Chunky Retro CTRL Start Button */}
        <button
          id="btn-start-menu"
          aria-label="Toggle Start Menu"
          aria-expanded={isStartMenuOpen}
          onClick={() => {
            sound.playClick(900);
            onToggleStartMenu();
          }}
          className={`px-3 py-1 border flex items-center gap-2 font-semibold text-xs tracking-wider transition-all retro-button cursor-pointer ${
            isStartMenuOpen
              ? 'bg-[#D8A84E] text-[#0A0D0B] border-[#E8DFC9] font-bold shadow-inner'
              : 'bg-[#1C272E] border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E]'
          }`}
        >
          {/* Retro Start Icon */}
          <span className="w-2.5 h-2.5 bg-[#D8A84E] border border-[#0A0D0B]" />
          <span className="font-bold tracking-wider font-retro-display">CTRL</span>
        </button>

        {/* Divider */}
        <div className="w-[1.5px] h-5 bg-[#2B3B44] shrink-0 mx-0.5" />

        {/* Open Applications Taskbar Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {openWindows.map(win => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                id={`taskbar-item-${win.id}`}
                onClick={() => {
                  sound.playClick(750);
                  onToggleWindow(win.id);
                }}
                className={`px-2.5 py-1 border flex items-center gap-1.5 text-xs truncate max-w-[150px] transition-all cursor-pointer retro-button ${
                  isActive
                    ? 'bg-[#526A78] border-[#E8DFC9] text-[#E8DFC9] font-medium shadow-sm'
                    : win.isMinimized
                    ? 'bg-[#0E1519] border-[#25333C] text-[#708491] opacity-75'
                    : 'bg-[#18232A] border-[#2E3F49] text-[#B8B09D] hover:border-[#526A78] hover:text-[#E8DFC9]'
                }`}
                title={win.title}
              >
                <span className="shrink-0">{renderRetroIcon(win.id, 14)}</span>
                <span className="truncate">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Side / Notification Tray */}
      <div className="flex items-center gap-2 pl-2 shrink-0 font-mono-tech text-[11px]">
        {/* Soft Green Network Indicator */}
        <div
          className="px-2 py-0.5 border border-[#2B3B44] bg-[#0E1519] text-[#7FA67A] flex items-center gap-1.5 hidden md:flex"
          title="Network Connection: Connected"
        >
          <Wifi size={12} className="text-[#7FA67A]" />
          <span>CONNECTED</span>
        </div>

        {/* Soft Green Security Indicator */}
        <div
          className="px-2 py-0.5 border border-[#2B3B44] bg-[#0E1519] text-[#7FA67A] flex items-center gap-1.5 hidden sm:flex"
          title="Security Subsystem: Active"
        >
          <ShieldCheck size={12} className="text-[#7FA67A]" />
          <span>SECURE</span>
        </div>

        {/* System Monitor Button */}
        <button
          id="btn-taskbar-health"
          onClick={() => {
            sound.playClick(650);
            onOpenSysHealth();
          }}
          className="px-2 py-0.5 border border-[#2B3B44] bg-[#0E1519] text-[#B8B09D] hover:text-[#E8DFC9] hover:border-[#D8A84E] flex items-center gap-1 hidden lg:flex retro-button cursor-pointer"
          title="Open System Monitor"
        >
          <Activity size={12} className="text-[#D8A84E]" />
          <span>SYS HEALTH</span>
        </button>

        {/* Sound Toggle */}
        <button
          id="btn-toggle-sound"
          aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
          onClick={() => {
            sound.playClick(800);
            onToggleSound();
          }}
          className="px-2 py-1 border border-[#2B3B44] bg-[#0E1519] hover:border-[#D8A84E] text-[#E8DFC9] text-xs retro-button flex items-center gap-1 cursor-pointer"
          title={soundEnabled ? "Mute Audio" : "Enable Audio"}
        >
          {soundEnabled ? (
            <Volume2 size={13} className="text-[#D8A84E]" />
          ) : (
            <VolumeX size={13} className="text-[#7FA67A]" />
          )}
        </button>

        {/* Clock */}
        <div className="relative">
          <button
            id="taskbar-clock-btn"
            onClick={() => {
              sound.playClick();
              setShowClockPopover(!showClockPopover);
            }}
            className="px-2 py-0.5 border border-[#2B3B44] bg-[#0E1519] text-[#E8DFC9] hover:border-[#526A78] transition-colors cursor-pointer font-mono-tech text-[11px]"
            title="System Clock"
          >
            {time || '12:00:00'}
          </button>

          {/* Clock & Calendar Popover */}
          {showClockPopover && (
            <div
              id="clock-popover"
              className="absolute bottom-11 right-0 w-52 p-3 bg-[#131A1E] border-2 border-[#526A78] text-[#E8DFC9] text-xs retro-bevel shadow-2xl z-50 font-system-ui"
            >
              <div className="border-b border-[#2B3B44] pb-1.5 mb-2 flex justify-between items-center">
                <span className="font-bold text-[#D8A84E] font-retro-display text-[11px]">SYSTEM CLOCK</span>
                <span className="text-[10px] text-[#7FA67A] font-mono-tech">GMT</span>
              </div>
              <div className="text-xl font-mono-tech text-center my-1 text-[#E8DFC9]">
                {time}
              </div>
              <div className="text-xs text-center text-[#B8B09D] mb-2">{date}</div>
              <div className="pt-2 border-t border-[#2B3B44] text-[10px] text-center text-[#7FA67A] font-mono-tech">
                CTRL OS &bull; 60Hz Phosphor
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
