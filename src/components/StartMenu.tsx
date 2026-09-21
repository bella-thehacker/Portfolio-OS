import React from 'react';
import { Power } from 'lucide-react';
import { AppID } from '../types';
import { USER_INFO, SYSTEM_SPECS } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { renderRetroIcon } from './RetroIcons';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppID) => void;
  onInitiateShutdown: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onInitiateShutdown
}) => {
  if (!isOpen) return null;

  const menuItems: { id: AppID; label: string; desc: string }[] = [
    { id: 'files', label: 'My Files', desc: 'Browse folders, projects & archives' },
    { id: 'dev_studio', label: 'Dev Studio', desc: 'Software engineering & live projects' },
    { id: 'security', label: 'Security Lab', desc: 'Cybersecurity journey & technical practice' },
    { id: 'arcade', label: 'Arcade', desc: 'Playable retro PC games' },
    { id: 'resume', label: 'My Resume', desc: 'Professional experience & CV' },
    { id: 'contact', label: 'Contact', desc: 'Send a message or get in touch' },
    { id: 'settings', label: 'Settings', desc: 'Display, sound & accessibility options' },
    { id: 'terminal', label: 'Terminal', desc: 'Command line shell for deep explorers' },
    { id: 'system', label: 'About Ivy', desc: 'Bio, education & system specs' },
  ];

  return (
    <>
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={() => {
          sound.playClick(600);
          onClose();
        }}
      />

      {/* Chunky, Tactile Retro Start Menu Box */}
      <div
        id="start-menu-popup"
        className="fixed bottom-11 left-2.5 w-72 sm:w-80 bg-[#131A1E] border-2 border-[#526A78] retro-window-border z-50 text-xs font-system-ui select-none shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
      >
        {/* Banner Header with Vintage OS branding */}
        <div className="p-3 bg-gradient-to-r from-[#526A78] to-[#3B4E5B] border-b border-[#2B3B44] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 bg-[#D8A84E] border border-[#0A0D0B]" />
            <div>
              <div className="text-sm font-bold text-[#E8DFC9] tracking-wider font-retro-display phosphor-glow">
                CTRL OS
              </div>
              <div className="text-[10px] text-[#D8A84E] font-mono-tech">
                {SYSTEM_SPECS.version} &bull; Personal Computer
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#E8DFC9]/70 block font-mono-tech">USER</span>
            <span className="text-xs font-semibold text-[#E8DFC9]">{USER_INFO.name}</span>
          </div>
        </div>

        {/* Application List: Friendly, Illustrated, Chunky */}
        <div className="p-1.5 space-y-0.5 max-h-[60vh] overflow-y-auto bg-[#0E1519]">
          {menuItems.map(item => (
            <button
              key={item.id}
              id={`start-menu-item-${item.id}`}
              onClick={() => {
                sound.playWindowOpen();
                onOpenApp(item.id);
                onClose();
              }}
              className="w-full px-2.5 py-2 flex items-center gap-3 text-left border border-transparent hover:border-[#526A78] hover:bg-[#18232A] transition-colors group cursor-pointer"
            >
              {/* Illustrated Retro Icon */}
              <div className="shrink-0 flex items-center justify-center p-1 bg-[#131A1E] border border-[#2B3B44] group-hover:border-[#D8A84E]">
                {renderRetroIcon(item.id, 20)}
              </div>

              {/* Friendly Label & Description */}
              <div className="flex-1 truncate">
                <div className="font-semibold text-xs text-[#E8DFC9] group-hover:text-[#D8A84E] truncate">
                  {item.label}
                </div>
                <div className="text-[10px] text-[#B8B09D] group-hover:text-[#E8DFC9] truncate">
                  {item.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Separator & Shut Down Item */}
        <div className="p-1.5 border-t border-[#2B3B44] bg-[#0A0E10]">
          <button
            id="btn-start-shutdown"
            onClick={() => {
              sound.playClick(500);
              onClose();
              onInitiateShutdown();
            }}
            className="w-full px-3 py-2 flex items-center gap-2.5 text-left border border-[#D65A32]/40 bg-[#241310] hover:bg-[#D65A32] hover:text-[#E8DFC9] hover:border-[#E8DFC9] text-[#E07A68] font-medium text-xs transition-colors retro-button cursor-pointer"
          >
            <Power size={14} strokeWidth={2.5} />
            <span>Shut Down CTRL OS...</span>
          </button>
        </div>
      </div>
    </>
  );
};
