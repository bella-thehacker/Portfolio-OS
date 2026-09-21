import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface BootSequenceProps {
  onBootComplete: () => void;
  soundEnabled: boolean;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onBootComplete, soundEnabled }) => {
  // Stages:
  // 1: black -> physical power switch click
  // 2: crt-warmup -> horizontal line glowing
  // 3: static-burst -> brief analog screen noise & distortion
  // 4: logo-moment -> big center CTRL OS logo locks into place with signature startup chime
  // 5: init-logs -> sequential machine checks with brief vintage glitch
  // 6: ready -> SYSTEM STATUS: OPERATIONAL & CTRL OS READY
  // 7: collapsing -> compress into thin line & reveal desktop
  const [stage, setStage] = useState<
    'black' | 'crt-warmup' | 'static-burst' | 'logo-moment' | 'init-logs' | 'ready' | 'collapsing'
  >('black');

  const [logoRevealed, setLogoRevealed] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [readyLine, setReadyLine] = useState('');

  const initializationChecks = [
    { text: "MEMORY CHECK ................. OK", delay: 280 },
    { text: "DISPLAY ...................... OK", delay: 240 },
    { text: "INPUT DEVICE ................. OK", delay: 240 },
    { text: "NETWORK ...................... OK", delay: 280 },
    { text: "SECURITY MODULE .............. ACTIVE", delay: 420, glitch: true },
    { text: "APPLICATIONS ................. 07", delay: 240 },
    { text: "USER PROFILE ................. IVY", delay: 300 },
  ];

  // Stage 1 & 2: Power on -> CRT line -> Static burst
  useEffect(() => {
    // Step 1: Black screen, then physical click
    const t1 = setTimeout(() => {
      sound.playClick(650);
      setStage('crt-warmup');
    }, 450);

    // Step 2: Line expands, then static burst
    const t2 = setTimeout(() => {
      sound.playClick(240);
      setStage('static-burst');
    }, 1100);

    // Step 3: Static clears, reveal center logo moment
    const t3 = setTimeout(() => {
      setStage('logo-moment');
      // Phosphor flicker & sound lock
      setTimeout(() => {
        setLogoRevealed(true);
        sound.playStartupSound();
      }, 350);
    }, 1800);

    // Step 4: After logo holds, start sequential initialization checks
    const t4 = setTimeout(() => {
      setStage('init-logs');
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Stage 5: Sequential initialization logs
  useEffect(() => {
    if (stage !== 'init-logs') return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const showNextCheck = () => {
      if (currentIndex < initializationChecks.length) {
        const item = initializationChecks[currentIndex];

        if (item.glitch) {
          // Brief authentic signal glitch
          setGlitchActive(true);
          sound.playClick(280);
          setBootLogs(prev => [...prev, "SECURITY MODULE .............. ACTI█E"]);

          setTimeout(() => {
            setBootLogs(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = "SECURITY MODULE .............. ACTIVE";
              return updated;
            });
            setGlitchActive(false);
            sound.playClick(820);
          }, 260);
        } else {
          sound.playKeyClick();
          setBootLogs(prev => [...prev, item.text]);
        }

        currentIndex++;
        timeoutId = setTimeout(showNextCheck, item.delay);
      } else {
        // All checks OK -> System Ready moment
        timeoutId = setTimeout(() => {
          setStage('ready');
          setReadyLine("SYSTEM STATUS: OPERATIONAL");
          sound.playClick(920);

          setTimeout(() => {
            setReadyLine("CTRL OS READY");
            sound.playCtrlMotif();

            // Compress to line and boot into desktop
            setTimeout(() => {
              setStage('collapsing');
              setTimeout(() => {
                onBootComplete();
              }, 480);
            }, 850);
          }, 650);
        }, 350);
      }
    };

    timeoutId = setTimeout(showNextCheck, 200);
    return () => clearTimeout(timeoutId);
  }, [stage, onBootComplete]);

  const handleSkip = () => {
    sound.playCtrlMotif();
    setStage('collapsing');
    setTimeout(() => {
      onBootComplete();
    }, 180);
  };

  return (
    <div
      id="boot-screen"
      className="fixed inset-0 z-50 bg-[#0A0D0B] text-[#E8DFC9] flex flex-col items-center justify-center p-4 select-none overflow-hidden"
      onClick={() => {
        sound.playClick(600);
      }}
    >
      {/* Skip Button */}
      <button
        id="btn-skip-boot"
        onClick={handleSkip}
        className="absolute top-4 right-4 z-50 px-3 py-1.5 border border-[#526A78]/70 bg-[#141C20] text-[#B8B09D] text-xs font-mono-tech tracking-wider hover:border-[#D8A84E] hover:text-[#E8DFC9] transition-colors retro-button cursor-pointer"
      >
        [ SKIP STARTUP &rarr; ]
      </button>

      {/* Stage 1: Pitch Black Screen with tiny power on indicator */}
      {stage === 'black' && (
        <div className="text-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#526A78] animate-pulse" />
        </div>
      )}

      {/* Stage 2: CRT Warmup (Horizontal line expanding) */}
      {stage === 'crt-warmup' && (
        <div className="w-full max-w-xl flex flex-col items-center justify-center">
          <div className="w-full h-[2px] bg-[#E8DFC9] shadow-[0_0_20px_#E8DFC9] transition-all duration-500 ease-out scale-y-150 animate-pulse" />
        </div>
      )}

      {/* Stage 3: Static Burst (Authentic analog screen noise) */}
      {stage === 'static-burst' && (
        <div className="w-full max-w-xl h-72 border-2 border-[#526A78] bg-[#141C20] relative overflow-hidden flex items-center justify-center crt-scanlines retro-bevel">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(82,106,120,0.2)_0%,rgba(10,13,11,0.95)_90%)]" />
          <div className="font-mono-tech text-xs tracking-widest text-[#D8A84E] animate-pulse">
            SIGNAL LOCK: VINTAGE CRT 60Hz
          </div>
          {/* Static noise bars */}
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(0deg,#141C20,#141C20_2px,#0A0D0B_2px,#0A0D0B_4px)] animate-crt-flicker" />
        </div>
      )}

      {/* Stage 4, 5, 6: Logo Moment & Sequential Initialization */}
      {(stage === 'logo-moment' || stage === 'init-logs' || stage === 'ready') && (
        <div
          className={`w-full max-w-xl p-6 sm:p-8 border-2 border-[#526A78] bg-[#131A1E] relative crt-scanlines retro-bevel transition-transform duration-100 ${
            glitchActive ? 'translate-x-1 opacity-90' : ''
          }`}
        >
          {/* Subtle CRT screen texture */}
          <div className="crt-vignette absolute inset-0 pointer-events-none" />

          {/* Bios Header */}
          <div className="flex items-center justify-between border-b border-[#2A3B45] pb-2 mb-6 text-xs tracking-wider text-[#526A78] font-mono-tech">
            <span>CTRL PERSONAL COMPUTER SYSTEM</span>
            <span className="text-[#B8B09D]">BUILD 2026.09</span>
          </div>

          {/* Central Logo Moment */}
          <div className="text-center my-4">
            <h1
              className={`text-4xl sm:text-5xl font-retro-game tracking-widest text-[#E8DFC9] transition-all duration-700 ${
                logoRevealed
                  ? 'opacity-100 scale-100 phosphor-glow'
                  : 'opacity-0 scale-95'
              }`}
            >
              CTRL OS
            </h1>
            <p className="text-xs font-mono-tech tracking-widest text-[#D8A84E] mt-2">
              VERSION 1.0.26 &bull; PERSONAL WORKSTATION
            </p>
          </div>

          {/* Sequential Initialization Logs */}
          <div className="space-y-1.5 text-xs sm:text-sm font-mono-tech border-t border-b border-[#2A3B45] py-3.5 min-h-[190px]">
            {stage === 'logo-moment' && (
              <div className="text-xs text-[#526A78] italic py-8 text-center animate-pulse">
                INITIALIZING GRAPHICAL SUBSYSTEM...
              </div>
            )}

            {bootLogs.map((log, index) => {
              const isGlitch = log.includes('ACTI█E');
              const isOk = log.includes('OK') || log.includes('ACTIVE');
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between ${
                    isGlitch
                      ? 'text-[#D8A84E] phosphor-glow-amber'
                      : isOk
                      ? 'text-[#E8DFC9]'
                      : 'text-[#B8B09D]'
                  }`}
                >
                  <span>{log}</span>
                </div>
              );
            })}
          </div>

          {/* Status and Ready Announcement */}
          {readyLine && (
            <div className="mt-4 pt-2 flex items-center justify-between text-xs tracking-wider font-mono-tech">
              <span className="text-[#D8A84E] phosphor-glow-amber font-bold">
                &gt; {readyLine}
              </span>
              <span className="w-2.5 h-4 bg-[#7FA67A] animate-pulse" />
            </div>
          )}
        </div>
      )}

      {/* Stage 7: Collapsing into glowing line before desktop reveal */}
      {stage === 'collapsing' && (
        <div className="w-full max-w-xl flex flex-col items-center justify-center">
          <div className="w-full h-[2px] bg-[#E8DFC9] shadow-[0_0_25px_#E8DFC9] transition-all duration-300 ease-in scale-x-0" />
        </div>
      )}
    </div>
  );
};
