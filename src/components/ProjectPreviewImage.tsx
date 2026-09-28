
import React, { useState } from 'react';
import {
  ExternalLink,
  Monitor,
  RotateCw,
} from 'lucide-react';

import { ProjectItem } from '../types';
import { sound } from '../utils/audio';

interface ProjectPreviewImageProps {
  project: ProjectItem;
  className?: string;
  showOpenButton?: boolean;
}

export const ProjectPreviewImage: React.FC<ProjectPreviewImageProps> = ({
  project,
  className = '',
  showOpenButton = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * IMPORTANT:
   * The project object must contain the EXACT GIF path.
   *
   * Example:
   * previewImage: "/pawned.gif"
   *
   * These files live directly inside the public folder.
   */
  const imageSource = project.previewImage;

  const openUrl = project.liveUrl || project.demoUrl;

  const projectName =
    project.name || project.title || 'PROJECT';

  const buttonLabel =
    project.buttonLabel || `OPEN ${projectName.toUpperCase()}`;

  /*
   * Retry the image if loading fails.
   */
  const handleRetry = () => {
    sound.playClick(850);

    setImageError(false);
    setIsLoaded(false);
  };

  return (
    <div
      className={`relative flex flex-col bg-[#0A0D0B] border-2 border-[#526A78]/50 shadow-lg overflow-hidden group ${className}`}
      style={{
        boxShadow:
          'inset 0 0 16px rgba(0, 0, 0, 0.8), 0 6px 18px rgba(0, 0, 0, 0.65)',
      }}
    >
      {/* Retro monitor header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#1B272E] border-b border-[#364954] text-[10px] font-system-ui select-none">
        <div className="flex items-center gap-2 text-[#E8DFC9]">
          <span className="w-2 h-2 rounded-full bg-[#7FA67A] shadow-[0_0_6px_#7FA67A]" />

          <span className="font-semibold text-xs tracking-wider text-[#E8DFC9]">
            {projectName}
          </span>

          <span className="text-[#526A78] hidden sm:inline">
            • REAL PROJECT PREVIEW
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#B8B09D]">
          <span className="px-1.5 py-0.5 bg-[#121A1F] border border-[#364954] text-[9px] font-mono-tech text-[#D8A84E]">
            GIF PREVIEW
          </span>

          {openUrl && (
            <a
              href={openUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              className="text-[#D8A84E] hover:text-[#E8DFC9] flex items-center gap-1 underline text-[10px]"
            >
              <span>LIVE</span>
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>

      {/* Project preview display */}
      <div className="relative w-full aspect-video bg-[#070A07] overflow-hidden flex items-center justify-center">

        {/* CRT vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.9)',
          }}
        />

        {/* GIF / image */}
        {!imageError && imageSource && (
          <img
            src={imageSource}
            alt={`${projectName} project preview`}
            onLoad={() => {
              setIsLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageError(true);
              setIsLoaded(false);
            }}
            className="w-full h-full object-contain relative z-0 bg-[#0A0D0B]"
          />
        )}

        {/* Missing image path */}
        {!imageSource && !imageError && (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0D1210] text-[#E8DFC9]">
            <Monitor
              size={28}
              className="text-[#D8A84E] mb-3"
            />

            <div className="text-[11px] font-retro-display tracking-widest text-[#7FA67A] uppercase mb-1">
              PROJECT PREVIEW
            </div>

            <div className="text-xs text-[#D65A32] mb-2">
              NO IMAGE PATH CONFIGURED
            </div>

            <div className="text-[10px] font-mono-tech text-[#526A78]">
              Add previewImage to this project.
            </div>
          </div>
        )}

        {/* Loading state */}
        {!imageError && imageSource && !isLoaded && (
          <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
            <div className="px-3 py-1.5 bg-[#0D1210]/90 border border-[#526A78]/50 text-[#D8A84E] font-retro-display text-[10px] tracking-wider">
              LOADING PREVIEW...
            </div>
          </div>
        )}

        {/* Image error */}
        {imageError && (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0D1210] text-[#E8DFC9]">
            <div className="w-11 h-11 rounded-full border border-[#526A78]/50 bg-[#162228] flex items-center justify-center text-[#526A78] mb-2.5">
              <Monitor
                size={22}
                className="text-[#D8A84E]"
              />
            </div>

            <div className="text-[10px] font-retro-display tracking-widest text-[#7FA67A] uppercase mb-1">
              PROJECT PREVIEW
            </div>

            <div className="text-xs sm:text-sm font-retro-display tracking-wider text-[#D65A32] mb-3.5">
              PREVIEW SIGNAL UNAVAILABLE
            </div>

            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-1.5 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs uppercase tracking-wider font-retro-display transition-colors shadow-sm retro-button cursor-pointer flex items-center gap-1.5"
            >
              <RotateCw size={12} />
              <span>[ RETRY ]</span>
            </button>

            <div className="text-[10px] font-mono-tech text-[#526A78] mt-3 break-all">
              {imageSource || 'NO IMAGE PATH'}
            </div>
          </div>
        )}

        {/* Small preview status */}
        {!imageError && isLoaded && (
          <div className="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="px-2 py-1 bg-[#162228]/90 border border-[#526A78]/50 text-[9px] font-mono-tech text-[#7FA67A]">
              LIVE GIF PREVIEW
            </div>
          </div>
        )}
      </div>

      {/* Bottom launch bar */}
      {showOpenButton && openUrl && (
        <div className="p-2.5 bg-[#141C20] border-t border-[#364954] flex items-center justify-between gap-3">
          <div className="text-[11px] text-[#B8B09D] truncate">
            <span className="text-[#526A78] font-mono-tech mr-1.5">
              HOST:
            </span>

            <span className="text-[#E8DFC9] font-mono-tech select-all text-xs">
              {openUrl}
            </span>
          </div>

          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(950)}
            className="px-3.5 py-1.5 bg-[#D8A84E] hover:bg-[#E8DFC9] text-[#0A0D0B] font-bold text-xs uppercase tracking-wider font-system-ui transition-colors flex items-center gap-1.5 shrink-0 shadow-sm retro-button cursor-pointer"
          >
            <span>{buttonLabel}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  );
};

