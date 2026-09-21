import React from 'react';
import { Activity, X, Shield, Cpu, HardDrive, Wifi } from 'lucide-react';
import { sound } from '../utils/audio';

interface SysHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SysHealthModal: React.FC<SysHealthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 font-system-ui text-xs select-none">
      <div className="w-full max-w-sm bg-[#141C20] border-2 border-[#526A78] retro-window-border p-4 space-y-3 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#2B3B44] pb-2">
          <div className="flex items-center gap-2 font-semibold text-[#D8A84E] font-retro-display">
            <Activity size={15} />
            <span>System Status Monitor</span>
          </div>
          <button
            onClick={() => {
              sound.playClick(600);
              onClose();
            }}
            className="text-[#526A78] hover:text-[#E8DFC9] p-1 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-2 text-xs font-mono-tech">
          <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] flex items-center justify-between">
            <span className="text-[#B8B09D] flex items-center gap-1.5">
              <Cpu size={13} className="text-[#526A78]" /> CPU
            </span>
            <span className="text-[#7FA67A] font-bold">NORMAL (4% LOAD)</span>
          </div>

          <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] flex items-center justify-between">
            <span className="text-[#B8B09D] flex items-center gap-1.5">
              <HardDrive size={13} className="text-[#526A78]" /> MEMORY
            </span>
            <span className="text-[#7FA67A] font-bold">NORMAL (580K / 640K)</span>
          </div>

          <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] flex items-center justify-between">
            <span className="text-[#B8B09D] flex items-center gap-1.5">
              <Wifi size={13} className="text-[#D8A84E]" /> NETWORK
            </span>
            <span className="text-[#D8A84E] font-bold">CONNECTED (100 MBPS)</span>
          </div>

          <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] flex items-center justify-between">
            <span className="text-[#B8B09D] flex items-center gap-1.5">
              <Shield size={13} className="text-[#7FA67A]" /> SECURITY
            </span>
            <span className="text-[#7FA67A] font-bold">ACTIVE (CYBER SHUJAA)</span>
          </div>
        </div>

        <div className="text-[11px] text-[#526A78] pt-1 text-center font-mono-tech">
          CTRL OS &bull; System Health Optimal
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3 py-1 bg-[#1A242A] border border-[#526A78] text-xs text-[#E8DFC9] hover:border-[#D8A84E] retro-button cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
