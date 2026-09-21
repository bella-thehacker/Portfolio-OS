import React from 'react';
import { Settings, Monitor, Volume2, RotateCcw, Sparkles, Check, Info } from 'lucide-react';
import { SystemSettings } from '../../types';
import { sound } from '../../utils/audio';

interface SettingsAppProps {
  settings: SystemSettings;
  onUpdateSettings: (newSettings: Partial<SystemSettings>) => void;
  onReboot: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  settings,
  onUpdateSettings,
  onReboot
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141C20] border-b border-[#2B3B44]">
        <div className="flex items-center gap-2">
          <Settings size={16} className="text-[#D8A84E]" />
          <span className="font-semibold text-xs sm:text-sm text-[#E8DFC9] font-retro-display">
            System Settings &bull; Preferences
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[#7FA67A]">
          CTRL OS v2.4
        </span>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-5 max-w-2xl mx-auto w-full">
        {/* Sound by Category Section */}
        <section className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-3">
          <div className="flex items-center justify-between border-b border-[#2B3B44] pb-2 text-[#D8A84E] font-semibold text-xs font-retro-display">
            <div className="flex items-center gap-2">
              <Volume2 size={15} />
              <span>Granular Audio Subsystem</span>
            </div>
            <span className="text-[10px] font-mono-tech text-[#7FA67A]">
              WEB AUDIO API
            </span>
          </div>

          {/* Master sound toggle */}
          <label className="flex items-center justify-between p-2 bg-[#10171B] border border-[#526A78] cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-[#E8DFC9] block">
                Master Audio
              </span>
              <span className="text-[10px] text-[#B8B09D]">
                Global audio engine switch (Master toggle)
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.soundMaster && settings.soundEnabled}
              onChange={e => {
                const val = e.target.checked;
                sound.soundMaster = val;
                sound.setSoundEnabled(val);
                if (val) sound.playClick();
                onUpdateSettings({ soundMaster: val, soundEnabled: val });
              }}
              className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
            />
          </label>

          {/* Granular categories */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {/* Interface Sounds */}
            <label className="p-2.5 bg-[#10171B] border border-[#2B3B44] flex flex-col justify-between cursor-pointer hover:border-[#526A78]">
              <div>
                <span className="font-semibold text-xs text-[#E8DFC9] block">
                  Interface Clicks
                </span>
                <span className="text-[10px] text-[#7FA67A] block mt-0.5">
                  Tactile window &amp; button sounds
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#B8B09D]">Enabled</span>
                <input
                  type="checkbox"
                  checked={settings.soundInterface}
                  onChange={e => {
                    const val = e.target.checked;
                    sound.soundInterface = val;
                    if (val) sound.playClick();
                    onUpdateSettings({ soundInterface: val });
                  }}
                  className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
                />
              </div>
            </label>

            {/* Startup Chimes */}
            <label className="p-2.5 bg-[#10171B] border border-[#2B3B44] flex flex-col justify-between cursor-pointer hover:border-[#526A78]">
              <div>
                <span className="font-semibold text-xs text-[#E8DFC9] block">
                  Startup Chime
                </span>
                <span className="text-[10px] text-[#7FA67A] block mt-0.5">
                  Cinematic boot sounds &amp; motif
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#B8B09D]">Enabled</span>
                <input
                  type="checkbox"
                  checked={settings.soundStartup}
                  onChange={e => {
                    const val = e.target.checked;
                    sound.soundStartup = val;
                    if (val) sound.playChime();
                    onUpdateSettings({ soundStartup: val });
                  }}
                  className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
                />
              </div>
            </label>

            {/* Arcade Sounds */}
            <label className="p-2.5 bg-[#10171B] border border-[#2B3B44] flex flex-col justify-between cursor-pointer hover:border-[#526A78]">
              <div>
                <span className="font-semibold text-xs text-[#E8DFC9] block">
                  Arcade Games
                </span>
                <span className="text-[10px] text-[#7FA67A] block mt-0.5">
                  Retro 8-bit game audio fx
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#B8B09D]">Enabled</span>
                <input
                  type="checkbox"
                  checked={settings.soundArcade}
                  onChange={e => {
                    const val = e.target.checked;
                    sound.soundArcade = val;
                    if (val) sound.playArcadeMove();
                    onUpdateSettings({ soundArcade: val });
                  }}
                  className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
                />
              </div>
            </label>
          </div>

          {/* Master Volume */}
          <div className="pt-2 border-t border-[#2B3B44] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#B8B09D]">Synthesizer Volume:</span>
              <span className="text-[#D8A84E] font-bold font-mono-tech">
                {Math.round(settings.volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={e => {
                const val = parseFloat(e.target.value);
                sound.setVolume(val);
                onUpdateSettings({ volume: val });
              }}
              className="w-full accent-[#D8A84E] cursor-pointer"
            />
          </div>
        </section>

        {/* Display & CRT Section */}
        <section className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-3">
          <div className="flex items-center gap-2 border-b border-[#2B3B44] pb-2 text-[#7FA67A] font-semibold text-xs font-retro-display">
            <Monitor size={15} />
            <span>Display &bull; Retro Cathode Ray Effects</span>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center justify-between cursor-pointer p-2 bg-[#10171B] border border-[#2B3B44]">
              <div>
                <span className="text-xs font-semibold text-[#E8DFC9] block">
                  CRT Scanlines
                </span>
                <span className="text-[10px] text-[#B8B09D]">
                  Subtle horizontal lines simulating classic monitor phosphors
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.crtScanlines}
                onChange={e => {
                  sound.playClick();
                  onUpdateSettings({ crtScanlines: e.target.checked });
                }}
                className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 bg-[#10171B] border border-[#2B3B44]">
              <div>
                <span className="text-xs font-semibold text-[#E8DFC9] block">
                  Phosphor Bloom
                </span>
                <span className="text-[10px] text-[#B8B09D]">
                  Soft optical glow around aged cream typography and titles
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.crtBloom}
                onChange={e => {
                  sound.playClick();
                  onUpdateSettings({ crtBloom: e.target.checked });
                }}
                className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 bg-[#10171B] border border-[#2B3B44]">
              <div>
                <span className="text-xs font-semibold text-[#E8DFC9] block">
                  Reduced Motion Mode
                </span>
                <span className="text-[10px] text-[#B8B09D]">
                  Disables rapid animations and CRT warm-up effects for accessibility
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={e => {
                  sound.playClick();
                  onUpdateSettings({ reducedMotion: e.target.checked });
                }}
                className="accent-[#D8A84E] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </section>

        {/* System Diagnostics & Reboot */}
        <section className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-3">
          <div className="flex items-center gap-2 border-b border-[#2B3B44] pb-2 text-[#E8DFC9] font-semibold text-xs font-retro-display">
            <RotateCcw size={15} className="text-[#D8A84E]" />
            <span>Firmware &bull; Boot Cycle</span>
          </div>

          <p className="text-xs text-[#B8B09D]">
            Re-initiates the retro system boot sequence to experience the multi-stage hardware check, memory verification, and vintage BIOS logs.
          </p>

          <button
            id="btn-settings-reboot"
            onClick={() => {
              sound.playClick(600);
              onReboot();
            }}
            className="w-full py-2 bg-[#1A242A] border border-[#526A78] hover:border-[#D8A84E] text-[#D8A84E] hover:text-[#E8DFC9] font-semibold text-xs retro-button flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>[ Restart &bull; Run Boot Sequence ]</span>
          </button>
        </section>
      </div>
    </div>
  );
};
