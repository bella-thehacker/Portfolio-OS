
import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  ExternalLink,
  Volume2,
  VolumeX,
  Monitor,
  RotateCw,
} from 'lucide-react';

import { ProjectItem } from '../types';
import { sound } from '../utils/audio';

interface ProjectPreviewVideoProps {
  project: ProjectItem;
  className?: string;
  autoPlay?: boolean;
  showOpenButton?: boolean;
}

export const ProjectPreviewVideo: React.FC<ProjectPreviewVideoProps> = ({
  project,
  className = '',
  autoPlay = true,
  showOpenButton = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  /*
   * IMPORTANT:
   * The project object must contain the EXACT video path.
   *
   * Example:
   * previewVideo: "/projects/pawned.mp4"
   *
   * Do not try to guess filenames from project.id.
   */
  const videoSource = project.previewVideo;

  const openUrl = project.liveUrl || project.demoUrl;

  const projectName =
    project.name || project.title || 'PROJECT';

  const buttonLabel =
    project.buttonLabel || `OPEN ${projectName.toUpperCase()}`;

  /*
   * Observe whether the preview is visible.
   * This prevents videos from continuing to play when scrolled
   * far away from the user.
   */
  useEffect(() => {
    const element = containerRef.current;

    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /*
   * Start / stop playback depending on visibility.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video || videoError) {
      return;
    }

    video.muted = isMuted;

    if (isVisible && autoPlay) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            /*
             * Some browsers can reject autoplay.
             * The preview can still be started manually.
             */
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isVisible, autoPlay, isMuted, videoError]);

  /*
   * Video loaded successfully.
   */
  const handleLoadedData = () => {
    setIsLoaded(true);
    setVideoError(false);
  };

  /*
   * Video failed to load.
   */
  const handleVideoError = () => {
    setVideoError(true);
    setIsLoaded(false);
    setIsPlaying(false);
  };

  /*
   * Retry the exact same video.
   */
  const handleRetry = () => {
    sound.playClick(850);

    setVideoError(false);
    setIsLoaded(false);

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.load();

    if (autoPlay) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  /*
   * Play / pause preview.
   */
  const togglePlayPause = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    sound.playClick(850);

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  /*
   * Mute / unmute preview.
   */
  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    sound.playClick(900);

    const nextMutedState = !video.muted;

    video.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  return (
    <div
      ref={containerRef}
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
            MP4 PREVIEW
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

      {/* Video display */}
      <div className="relative w-full aspect-video bg-[#070A07] overflow-hidden flex items-center justify-center">
        {/* CRT vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.9)',
          }}
        />

        {!videoError && videoSource && (
          <video
            ref={videoRef}
            src={videoSource}
            autoPlay={autoPlay}
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={handleLoadedData}
            onError={handleVideoError}
            className="w-full h-full object-contain relative z-0 bg-[#0A0D0B]"
          />
        )}

        {/* Missing video path */}
        {!videoSource && !videoError && (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0D1210] text-[#E8DFC9]">
            <Monitor
              size={28}
              className="text-[#D8A84E] mb-3"
            />

            <div className="text-[11px] font-retro-display tracking-widest text-[#7FA67A] uppercase mb-1">
              PROJECT PREVIEW
            </div>

            <div className="text-xs text-[#D65A32] mb-2">
              NO VIDEO PATH CONFIGURED
            </div>

            <div className="text-[10px] font-mono-tech text-[#526A78]">
              Add previewVideo to this project.
            </div>
          </div>
        )}

        {/* Video loading */}
        {!videoError && videoSource && !isLoaded && (
          <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
            <div className="px-3 py-1.5 bg-[#0D1210]/90 border border-[#526A78]/50 text-[#D8A84E] font-retro-display text-[10px] tracking-wider">
              LOADING PREVIEW...
            </div>
          </div>
        )}

        {/* Video error */}
        {videoError && (
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
              VIDEO SIGNAL UNAVAILABLE
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
              {videoSource || 'NO VIDEO PATH'}
            </div>
          </div>
        )}

        {/* Preview controls */}
        {!videoError && isLoaded && (
          <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-[#162228]/90 backdrop-blur-xs px-2 py-1 border border-[#526A78]/50 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-1 hover:text-[#D8A84E] text-[#E8DFC9] cursor-pointer"
                title={isPlaying ? 'Pause Preview' : 'Play Preview'}
              >
                {isPlaying ? (
                  <Pause size={13} />
                ) : (
                  <Play size={13} />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1 hover:text-[#D8A84E] text-[#E8DFC9] cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX size={13} />
                ) : (
                  <Volume2 size={13} />
                )}
              </button>

              <span className="text-[10px] font-mono-tech text-[#7FA67A]">
                {isPlaying ? 'PREVIEW RUNNING' : 'PAUSED'}
              </span>
            </div>

            {openUrl && (
              <a
                href={openUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(900)}
                className="px-2 py-0.5 bg-[#1B272E] border border-[#526A78] text-[#D8A84E] hover:text-[#E8DFC9] text-[10px] font-mono-tech flex items-center gap-1 cursor-pointer"
              >
                <span>{buttonLabel}</span>
                <ExternalLink size={10} />
              </a>
            )}
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

