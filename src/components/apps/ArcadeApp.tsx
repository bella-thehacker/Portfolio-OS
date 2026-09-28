import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Play,
  ArrowLeft,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { ProjectPreviewImage } from '../ProjectPreviewImage';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types';

interface ArcadeAppProps {
  initialGameId?: string;
}

interface RealGameConfig {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  liveUrl: string;
  buttonLabel: string;
  description: string;
  technologies: string[];
  accentColor: string;
  projectItem: ProjectItem;
}

export const ArcadeApp: React.FC<ArcadeAppProps> = ({ initialGameId }) => {
  const pawnedProject = PROJECTS.find(p => p.id === 'pawned')!;
  const staticXoProject = PROJECTS.find(p => p.id === 'static-xo')!;
  const puzzlesProject = PROJECTS.find(p => p.id === 'pawned-chess-puzzles')!;

  const REAL_GAMES: RealGameConfig[] = [
    {
      id: 'pawned',
      name: 'Pawned',
      shortTitle: 'PAWNED',
      category: 'Retro Chess Application & Engine',
      liveUrl: 'https://pawned-retro-chess-app-lgh5.vercel.app/',
      buttonLabel: 'OPEN PAWNED',
      description: 'A comprehensive retro chess application and interactive chess engine built from scratch with turn-based move calculation, piece capture tracking, and vintage CRT aesthetic.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Game Engine'],
      accentColor: '#D8A84E',
      projectItem: pawnedProject
    },
    {
      id: 'static-xo',
      name: 'Static XO',
      shortTitle: 'STATIC XO',
      category: 'Retro Cyber Grid Tic-Tac-Toe',
      liveUrl: 'https://static-xo.vercel.app/',
      buttonLabel: 'OPEN STATIC XO',
      description: 'An arcade cyber-grid recreation of classic Tic-Tac-Toe featuring cyber neon styling, synthetic signal syncing, audio cues, and win-streak tracking.',
      technologies: ['TypeScript', 'React', 'Cyber Grid UI', 'Web Audio API'],
      accentColor: '#526A78',
      projectItem: staticXoProject
    },
    {
      id: 'pawned-chess-puzzles',
      name: 'Pawned Chess Puzzles',
      shortTitle: 'CHESS PUZZLES',
      category: 'Tactical Chess Problem Solver',
      liveUrl: 'https://pawned-chess-puzzles.vercel.app/',
      buttonLabel: 'OPEN CHESS PUZZLES',
      description: 'A tactical chess puzzle platform where players analyze board configurations to discover decisive winning moves and checkmates from tactical puzzle archives.',
      technologies: ['React', 'TypeScript', 'Chess Problem Parser'],
      accentColor: '#7FA67A',
      projectItem: puzzlesProject
    }
  ];

  const [activeGameId, setActiveGameId] = useState<string | null>(initialGameId || null);
  const [selectedGameId, setSelectedGameId] = useState<string>('pawned');
  const [launchStage, setLaunchStage] = useState<'idle' | 'launching' | 'ready'>('idle');
  const [showBuiltinToys, setShowBuiltinToys] = useState<boolean>(false);
  const [activeToy, setActiveToy] = useState<'static-xo-toy' | 'chess-toy' | null>(null);

  // Active game object
  const activeGame = REAL_GAMES.find(g => g.id === activeGameId) || null;
  const selectedGame = REAL_GAMES.find(g => g.id === selectedGameId) || REAL_GAMES[0];

  // Game launch sequence
  const launchGame = (gameId: string) => {
    sound.playCtrlMotif();
    setActiveGameId(gameId);
    setLaunchStage('launching');

    // Simulate retro boot expansion and load sequence
    setTimeout(() => {
      sound.playClick(900);
      setLaunchStage('ready');
    }, 1100);
  };

  const handleReturnToLibrary = () => {
    sound.playClick(750);
    setActiveGameId(null);
    setLaunchStage('idle');
  };

  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Top Arcade Navigation */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#141C20] border-b border-[#2B3B44]">
        <div className="flex items-center gap-2">
          <Gamepad2 size={16} className="text-[#D8A84E]" />
          <span className="font-semibold text-xs sm:text-sm text-[#E8DFC9] font-retro-display">
            CTRL OS &bull; Game Launcher
          </span>
          {activeGame && (
            <span className="text-[10px] font-mono-tech text-[#D8A84E] bg-[#0E1519] px-2 py-0.5 border border-[#526A78]">
              &bull; {activeGame.name.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeGame && (
            <>
              <a
                href={activeGame.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(950)}
                className="px-3 py-1 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs flex items-center gap-1.5 retro-button transition-colors cursor-pointer shadow-xs"
              >
                <span>OPEN FULL APPLICATION</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={handleReturnToLibrary}
                className="px-2.5 py-1 border border-[#526A78] bg-[#141C20] hover:border-[#D8A84E] text-xs text-[#E8DFC9] flex items-center gap-1.5 retro-button cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Arcade Library</span>
              </button>
            </>
          )}

          {!activeGame && (
            <span className="text-[10px] font-mono-tech text-[#7FA67A]">
              3 DEPLOYED APPLICATIONS
            </span>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {/* =========================================================================
            STATE 1: REAL GAME LIBRARY (Selection & Showcase)
            ========================================================================= */}
        {!activeGame && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header / Intro */}
            <div className="border-b border-[#2B3B44] pb-3 text-center">
              <h2 className="text-xl sm:text-2xl font-retro-display text-[#E8DFC9] tracking-wider phosphor-glow">
                RETRO ARCADE &amp; APPLICATION LAUNCHER
              </h2>
              <p className="text-xs text-[#7FA67A] font-mono-tech mt-1">
                IVY'S REAL DEPLOYED APPLICATIONS &bull; LAUNCH DIRECTLY INTO EXTERNAL ENGINES
              </p>
            </div>

            {/* Game Cards Shelf: Large Colorful Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REAL_GAMES.map(game => {
                const isSelected = selectedGameId === game.id;
                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      sound.playClick(850);
                      setSelectedGameId(game.id);
                    }}
                    onDoubleClick={() => launchGame(game.id)}
                    className={`p-4 bg-[#141C20] border-2 transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'border-[#D8A84E] bg-[#1B252B] shadow-lg scale-[1.01]'
                        : 'border-[#2B3B44] hover:border-[#526A78] hover:bg-[#182126]'
                    }`}
                  >
                    <div>
                      {/* Top Bar with Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono-tech text-[#526A78] uppercase">
                          {game.category}
                        </span>
                        <span className="px-1.5 py-0.5 bg-[#0C1215] border border-[#2B3B44] text-[#7FA67A] text-[9px] font-mono-tech flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7FA67A] animate-pulse" />
                          ONLINE
                        </span>
                      </div>

                      {/* Chunky Retro Icon / Graphic Banner */}
                      <div className="h-28 bg-[#0C1215] border border-[#2B3B44] flex flex-col items-center justify-center p-3 mb-3 relative overflow-hidden group-hover:border-[#D8A84E]/60 transition-colors">
                        <div
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 50%)',
                            backgroundSize: '100% 4px'
                          }}
                        />

                        {game.id === 'pawned' && (
                          <div className="flex flex-col items-center">
                            <span className="text-4xl text-[#D8A84E] select-none filter drop-shadow">
                              ♞
                            </span>
                            <span className="font-retro-display text-sm text-[#E8DFC9] tracking-widest mt-1">
                              PAWNED
                            </span>
                          </div>
                        )}

                        {game.id === 'static-xo' && (
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-3xl font-black select-none">
                              <span className="text-[#526A78]">✕</span>
                              <span className="text-[#E8DFC9]">○</span>
                            </div>
                            <span className="font-retro-display text-sm text-[#526A78] tracking-widest mt-1">
                              STATIC XO
                            </span>
                          </div>
                        )}

                        {game.id === 'pawned-chess-puzzles' && (
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 text-3xl text-[#7FA67A] select-none">
                              <span>♟</span>
                              <span className="text-xs text-[#D8A84E] font-bold">#1</span>
                            </div>
                            <span className="font-retro-display text-sm text-[#7FA67A] tracking-widest mt-1">
                              CHESS PUZZLES
                            </span>
                          </div>
                        )}

                        <span className="text-[9px] font-mono-tech text-[#526A78] mt-1">
                          Double-click to launch
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-bold text-sm text-[#E8DFC9] group-hover:text-[#D8A84E] transition-colors mb-1">
                        {game.name}
                      </h3>
                      <p className="text-xs text-[#B8B09D] line-clamp-3 leading-relaxed mb-3">
                        {game.description}
                      </p>
                    </div>

                    {/* Action Button on Card */}
                    <div className="pt-2 border-t border-[#2B3B44]/70 flex items-center justify-between">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          launchGame(game.id);
                        }}
                        className="px-3 py-1.5 bg-[#1A242A] border border-[#526A78] text-[#D8A84E] hover:bg-[#D8A84E] hover:text-[#0A0D0B] font-bold text-xs flex items-center gap-1.5 transition-colors retro-button cursor-pointer"
                      >
                        <Play size={11} className="fill-current" />
                        <span>Launch Game &rarr;</span>
                      </button>

                      <a
                        href={game.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => {
                          e.stopPropagation();
                          sound.playClick(900);
                        }}
                        className="text-[#7FA67A] hover:text-[#E8DFC9] p-1.5"
                        title="Open Vercel URL"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Game Preview & Detailed Breakdown */}
            <div className="p-5 bg-[#141C20] border-2 border-[#526A78] shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2B3B44] pb-3">
                <div>
                  <span className="text-[10px] font-mono-tech text-[#D8A84E] uppercase">
                    SELECTED APPLICATION &bull; MP4 IN-OS PREVIEW
                  </span>
                  <h3 className="text-lg font-bold text-[#E8DFC9]">
                    {selectedGame.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => launchGame(selectedGame.id)}
                    className="px-4 py-2 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors retro-button shadow-xs cursor-pointer"
                  >
                    <Play size={12} className="fill-current" />
                    <span>LAUNCH {selectedGame.shortTitle}</span>
                  </button>

                  <a
                    href={selectedGame.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick(950)}
                    className="px-3 py-2 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] text-xs flex items-center gap-1 retro-button cursor-pointer"
                  >
                    <span>{selectedGame.buttonLabel}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Real MP4 Project Video Component */}
              <div className="max-w-2xl mx-auto">
                <ProjectPreviewImage
                  project={selectedGame.projectItem}
                  showOpenButton={true}
                />
              </div>

              {/* Tech Spec Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono-tech text-[#7FA67A] self-center mr-1">
                  STACK:
                </span>
                {selectedGame.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#0C1215] border border-[#2B3B44] text-[11px] text-[#B8B09D] font-mono-tech"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Collapsible Section: CTRL OS DEMOS & SYSTEM TOYS */}
            <div className="border border-[#2B3B44] bg-[#12191D]">
              <button
                type="button"
                onClick={() => {
                  sound.playClick(700);
                  setShowBuiltinToys(!showBuiltinToys);
                }}
                className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-semibold text-[#526A78] hover:text-[#E8DFC9] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#D8A84E]" />
                  <span>CTRL OS DEMOS &amp; SYSTEM TOYS (BUILT-IN EXPERIMENTAL TOYS)</span>
                </div>
                {showBuiltinToys ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showBuiltinToys && (
                <div className="p-4 border-t border-[#2B3B44] bg-[#0E1417] space-y-4">
                  <div className="p-2.5 bg-[#141C20] border border-[#526A78] text-xs text-[#B8B09D]">
                    <span className="font-bold text-[#D8A84E] block mb-1">
                      NOTICE &bull; SYSTEM TOYS:
                    </span>
                    The toys below are quick interactive built-in desktop utilities for CTRL OS. They are
                    not Ivy's deployed applications (which are displayed above in the primary launcher).
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveToy('static-xo-toy')}
                      className={`px-3 py-1.5 border text-xs retro-button cursor-pointer ${
                        activeToy === 'static-xo-toy'
                          ? 'bg-[#D8A84E] text-[#0A0D0B] border-[#E8DFC9]'
                          : 'bg-[#141C20] border-[#526A78] text-[#E8DFC9]'
                      }`}
                    >
                      Mini Tic-Tac-Toe Toy
                    </button>
                    {activeToy && (
                      <button
                        onClick={() => setActiveToy(null)}
                        className="px-2 py-1 text-[11px] text-[#7FA67A] hover:text-[#E8DFC9] cursor-pointer"
                      >
                        Close Toy
                      </button>
                    )}
                  </div>

                  {activeToy === 'static-xo-toy' && (
                    <div className="p-4 bg-[#141C20] border border-[#2B3B44] max-w-sm mx-auto">
                      <BuiltinMiniXo />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: GAME LAUNCHER VIEW (Loading State or Embed with Fallback)
            ========================================================================= */}
        {activeGame && (
          <div className="h-full flex flex-col max-w-4xl mx-auto">
            {/* Launching Phase */}
            {launchStage === 'launching' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[#141C20] border-2 border-[#526A78]">
                <div className="w-14 h-14 rounded-full border-2 border-[#D8A84E] bg-[#0E1519] flex items-center justify-center text-[#D8A84E] animate-pulse">
                  <Gamepad2 size={28} />
                </div>
                <div>
                  <h3 className="text-base font-retro-display text-[#E8DFC9] tracking-widest phosphor-glow">
                    LOADING {activeGame.name.toUpperCase()}...
                  </h3>
                  <p className="text-xs font-mono-tech text-[#526A78] mt-1">
                    CONNECTING SUBSYSTEM TO EXTERNAL RUNTIME ENGINE
                  </p>
                </div>
                <div className="w-48 h-1.5 bg-[#0C1215] border border-[#2B3B44] overflow-hidden">
                  <div className="h-full bg-[#D8A84E] animate-pulse w-3/4" />
                </div>
              </div>
            )}

            {/* Ready Phase */}
            {launchStage === 'ready' && (
              <div className="flex-1 flex flex-col space-y-4">
                {/* Clean Fallback Card */}
                <div className="p-6 bg-[#141C20] border-2 border-[#526A78] shadow-lg text-center space-y-5 max-w-xl mx-auto w-full my-auto">
                  <div className="border-b border-[#2B3B44] pb-3">
                    <span className="text-xs font-mono-tech text-[#7FA67A] tracking-widest block mb-1">
                      ● APPLICATION READY
                    </span>
                    <h2 className="text-xl font-retro-display text-[#E8DFC9] phosphor-glow">
                      {activeGame.name.toUpperCase()}
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs text-[#B8B09D] max-w-md mx-auto leading-relaxed">
                    <p className="text-sm font-semibold text-[#E8DFC9]">
                      {activeGame.name} is available as an external application.
                    </p>
                    <p>
                      CTRL OS cannot display it inside this window,
                      so the original application can be opened instead.
                    </p>
                  </div>

                  {/* Real MP4 Project Video Component right inside the launcher */}
                  <div className="max-w-md mx-auto my-3">
                    <ProjectPreviewImage
                      project={activeGame.projectItem}
                      showOpenButton={false}
                    />
                  </div>

                  {/* Primary Action Buttons: [ OPEN {NAME} ] [ BACK TO ARCADE ] */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={activeGame.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick(1000)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors retro-button shadow-md cursor-pointer"
                    >
                      <span>{activeGame.buttonLabel}</span>
                      <ExternalLink size={13} />
                    </a>

                    <button
                      onClick={handleReturnToLibrary}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 retro-button cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>BACK TO ARCADE</span>
                    </button>
                  </div>

                  <div className="text-[10px] font-mono-tech text-[#526A78] pt-2 border-t border-[#2B3B44]">
                    VERCEL HOST: {activeGame.liveUrl}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   Built-in Mini Toy (Cleanly marked as desktop toy, not Ivy's project)
   ========================================================================= */
const BuiltinMiniXo: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(Boolean)) return 'TIE';
    return null;
  };

  const winner = calculateWinner(board);

  const handleClick = (idx: number) => {
    if (board[idx] || winner) return;
    sound.playClick(900);
    const copy = [...board];
    copy[idx] = isXNext ? 'X' : 'O';
    setBoard(copy);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    sound.playClick(700);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center justify-between w-full text-xs font-mono-tech">
        <span className="text-[#D8A84E]">
          {winner ? (winner === 'TIE' ? 'DRAW GAME' : `WINNER: ${winner}`) : `TURN: ${isXNext ? 'X' : 'O'}`}
        </span>
        <button
          onClick={handleReset}
          className="text-[#7FA67A] hover:text-[#E8DFC9] flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#0C1215] border border-[#2B3B44]">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-14 h-14 bg-[#141C20] border border-[#526A78] hover:border-[#D8A84E] text-lg font-bold flex items-center justify-center text-[#E8DFC9] cursor-pointer"
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};
