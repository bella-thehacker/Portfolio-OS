import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { NotificationItem } from '../types';
import { sound } from '../utils/audio';

interface NotificationsProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onDismiss }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-14 right-3 z-50 flex flex-col gap-2 max-w-sm pointer-events-none font-system-ui text-xs select-none">
      {notifications.map(item => {
        return (
          <div
            key={item.id}
            className="pointer-events-auto bg-[#141C20] border-2 border-[#526A78] retro-window-border p-3.5 shadow-2xl space-y-1.5 animate-in slide-in-from-bottom-2 fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#2B3B44] pb-1.5">
              <div className="flex items-center gap-1.5 font-semibold">
                {item.type === 'success' && <CheckCircle2 size={14} className="text-[#7FA67A]" />}
                {item.type === 'warning' && <AlertTriangle size={14} className="text-[#D8A84E]" />}
                {item.type === 'error' && <AlertCircle size={14} className="text-[#D65A32]" />}
                {item.type === 'info' && <Info size={14} className="text-[#526A78]" />}
                <span className="text-xs text-[#E8DFC9] tracking-wide font-retro-display">{item.title}</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick(600);
                  onDismiss(item.id);
                }}
                className="text-[#526A78] hover:text-[#E8DFC9] p-0.5 cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>

            <p className="text-xs text-[#B8B09D] leading-relaxed">
              {item.message}
            </p>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  sound.playClick(800);
                  onDismiss(item.id);
                }}
                className="px-2.5 py-0.5 bg-[#1A242A] border border-[#526A78] text-xs text-[#E8DFC9] hover:border-[#D8A84E] retro-button cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
