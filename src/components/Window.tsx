import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { WindowState } from '../types';
import { sound } from '../utils/audio';
import { renderRetroIcon } from './RetroIcons';

interface WindowProps {
  window: WindowState;
  onClose: (id: WindowState['id']) => void;
  onMinimize: (id: WindowState['id']) => void;
  onMaximize: (id: WindowState['id']) => void;
  onFocus: (id: WindowState['id']) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState(win.position);
  const windowRef = useRef<HTMLDivElement>(null);

  // Sync position if changed externally
  useEffect(() => {
    setPos(win.position);
  }, [win.position]);

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus(win.id);
  };

  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if (win.isMaximized) return;
    onFocus(win.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleTitlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || win.isMaximized) return;

    const maxX = Math.max(0, document.documentElement.clientWidth - 100);
    const maxY = Math.max(0, document.documentElement.clientHeight - 80);

    const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), maxX);
    const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), maxY);

    setPos({ x: newX, y: newY });
  };

  const handleTitlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  if (win.isMinimized || !win.isOpen) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      id={`window-${win.id}`}
      onPointerDown={handlePointerDown}
      style={{
        zIndex: win.zIndex,
        ...(win.isMaximized
          ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 44px)' }
          : {
              top: `${pos.y}px`,
              left: `${pos.x}px`,
              width: `${win.size.width}px`,
              maxWidth: '96vw',
              height: `${win.size.height}px`,
              maxHeight: 'calc(100vh - 56px)'
            })
      }}
      className={`fixed flex flex-col bg-[#0E1417] border-2 border-[#526A78]/80 retro-window-border transition-all duration-75 overflow-hidden select-text ${
        win.isMaximized ? 'border-t-0 border-x-0' : ''
      }`}
    >
      {/* Friendly Retro Title Bar - Steel Blue Signature */}
      <div
        id={`window-titlebar-${win.id}`}
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-[#526A78] via-[#435966] to-[#354854] border-b border-[#2B3B44] cursor-grab active:cursor-grabbing select-none text-[#E8DFC9] text-xs shadow-xs"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 flex items-center">{renderRetroIcon(win.id, 17)}</span>
          <span className="font-semibold text-xs sm:text-[13px] tracking-wider text-[#E8DFC9] truncate font-retro-display">
            {win.title}
          </span>
        </div>

        {/* Familiar Retro Window Controls: _ □ × */}
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {/* Minimize Button */}
          <button
            id={`btn-min-${win.id}`}
            title="Minimize"
            aria-label="Minimize Window"
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowClose();
              onMinimize(win.id);
            }}
            className="w-5 h-5 flex items-center justify-center bg-[#3B4E5B] border border-[#6E8896] text-[#E8DFC9] hover:bg-[#D8A84E] hover:text-[#0A0D0B] hover:border-[#E8DFC9] transition-colors retro-button cursor-pointer"
          >
            <Minus size={11} strokeWidth={3} />
          </button>

          {/* Maximize Button */}
          <button
            id={`btn-max-${win.id}`}
            title={win.isMaximized ? "Restore" : "Maximize"}
            aria-label={win.isMaximized ? "Restore Window" : "Maximize Window"}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick(900);
              onMaximize(win.id);
            }}
            className="w-5 h-5 flex items-center justify-center bg-[#3B4E5B] border border-[#6E8896] text-[#E8DFC9] hover:bg-[#D8A84E] hover:text-[#0A0D0B] hover:border-[#E8DFC9] transition-colors retro-button cursor-pointer"
          >
            <Square size={10} strokeWidth={2.5} />
          </button>

          {/* Close Button */}
          <button
            id={`btn-close-${win.id}`}
            title="Close"
            aria-label="Close Window"
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowClose();
              onClose(win.id);
            }}
            className="w-5 h-5 flex items-center justify-center bg-[#3B4E5B] border border-[#6E8896] text-[#E8DFC9] hover:bg-[#D65A32] hover:text-[#E8DFC9] hover:border-[#E8DFC9] transition-colors retro-button cursor-pointer"
          >
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Window Body Content Area */}
      <div className="flex-1 overflow-auto bg-[#0E1417] text-[#E8DFC9] relative font-system-ui">
        {children}
      </div>

      {/* Clean Status Footer */}
      <div className="px-3 py-1 bg-[#0A0E10] border-t border-[#2B3B44] flex items-center justify-between text-[11px] text-[#B8B09D] font-mono-tech select-none">
        <span className="truncate text-[#526A78]">C:\IVY\{win.title.replace(/\s+/g, '')}</span>
        <span className="shrink-0 tracking-wider text-[#7FA67A] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7FA67A]" />
          READY
        </span>
      </div>
    </div>
  );
};
