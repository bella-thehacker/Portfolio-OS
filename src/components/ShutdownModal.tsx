import React, { useState, useEffect } from 'react';
import { Power, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/audio';

interface ShutdownModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmShutdown: () => void;
  isShuttingDown: boolean;
  isOffline: boolean;
  onRestart: () => void;
}

export const ShutdownModal: React.FC<ShutdownModalProps> = ({
  isOpen,
  onCancel,
  onConfirmShutdown,
  isShuttingDown,
  isOffline,
  onRestart
}) => {
  const [shutdownStep, setShutdownStep] = useState<string>('');

  useEffect(() => {
    if (!isShuttingDown) return;

    sound.playShutdown();
    setShutdownStep("SAVING ACTIVE SESSION STATE...");

    const t1 = setTimeout(() => {
      sound.playClick(600);
      setShutdownStep("TERMINATING RUNNING PROCESSES...");
    }, 400);

    const t2 = setTimeout(() => {
      sound.playClick(400);
      setShutdownStep("DISCONNECTING NETWORK INTERFACES...");
    }, 850);

    const t3 = setTimeout(() => {
      sound.playClick(200);
      setShutdownStep("PARKING DISK HEADS & FLUSHING BUFFERS...");
    }, 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isShuttingDown]);

  useEffect(() => {
    if (!isOffline) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        sound.playClick(900);
        onRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOffline, onRestart]);

  if (isOffline) {
    return (
      <div
        id="offline-screen"
        onClick={() => {
          sound.playClick(900);
          onRestart();
        }}
        className="fixed inset-0 z-50 bg-[#0A0D0B] text-[#E8DFC9] flex flex-col items-center justify-center p-4 font-system-ui select-none cursor-pointer"
      >
        <div className="w-full max-w-md p-6 border-2 border-[#526A78] bg-[#141C20] text-center space-y-4 retro-window-border shadow-2xl">
          <div className="w-12 h-12 mx-auto bg-[#0E1417] border border-[#D8A84E] flex items-center justify-center">
            <Power size={22} className="text-[#D8A84E]" />
          </div>

          <div>
            <h1 className="text-2xl font-retro-display text-[#E8DFC9] phosphor-glow tracking-wide">
              CTRL OS
            </h1>
            <p className="text-xs font-mono-tech text-[#D8A84E] tracking-wider mt-1">
              SYSTEM POWERED DOWN
            </p>
          </div>

          <p className="text-xs text-[#B8B09D] leading-relaxed">
            All applications and virtual devices have been parked safely.
          </p>

          <div className="pt-4 border-t border-[#2B3B44]">
            <button
              onClick={onRestart}
              className="px-4 py-2 bg-[#D8A84E] text-[#0A0D0B] font-bold text-xs retro-button transition-all cursor-pointer"
            >
              Click or Press Enter to Turn On CTRL OS
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 text-[11px] font-mono-tech text-[#526A78]">
          IVY MBURU &bull; CTRL OS WORKSTATION
        </div>
      </div>
    );
  }

  if (isShuttingDown) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0A0D0B] flex flex-col items-center justify-center p-4 font-system-ui text-xs select-none">
        <div className="w-full max-w-sm p-5 border-2 border-[#526A78] bg-[#141C20] text-center space-y-3 retro-window-border">
          <span className="text-[#D8A84E] font-semibold animate-pulse">Shutting Down CTRL OS...</span>
          <div className="text-xs text-[#E8DFC9] font-mono-tech h-5">{shutdownStep}</div>
          <div className="w-full h-2 bg-[#0E1417] border border-[#2B3B44] overflow-hidden">
            <div className="h-full bg-[#D8A84E] animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px] flex items-center justify-center p-4 font-system-ui text-xs select-none">
      <div className="w-full max-w-md bg-[#141C20] border-2 border-[#526A78] retro-window-border p-5 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-[#2B3B44] pb-2 text-[#D8A84E] font-semibold text-sm">
          <AlertTriangle size={16} />
          <span>Shut Down Workstation</span>
        </div>

        <p className="text-xs sm:text-sm text-[#E8DFC9] leading-relaxed">
          Are you sure you want to shut down CTRL OS? All open application windows will be closed.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2B3B44]">
          <button
            onClick={() => {
              sound.playClick(600);
              onCancel();
            }}
            className="px-4 py-1.5 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] retro-button text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              sound.playClick(400);
              onConfirmShutdown();
            }}
            className="px-4 py-1.5 bg-[#D8A84E] text-[#0A0D0B] font-bold border border-[#E8DFC9] hover:bg-[#E8DFC9] retro-button text-xs cursor-pointer"
          >
            Shut Down
          </button>
        </div>
      </div>
    </div>
  );
};
