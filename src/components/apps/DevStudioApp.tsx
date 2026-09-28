import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Play,
  Layers,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle,
  Cpu,
  Github
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem, AppID } from '../../types';
import { sound } from '../../utils/audio';
import { ProjectPreviewImage } from '../ProjectPreviewImage';

interface DevStudioAppProps {
  initialProjectId?: string;
  onOpenApp?: (appId: AppID, data?: any) => void;
}

export const DevStudioApp: React.FC<DevStudioAppProps> = ({ initialProjectId, onOpenApp }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId || 'pawned');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'architecture' | 'source' | 'tests'>('architecture');

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  const handleSelectProject = (projId: string) => {
    sound.playClick(800);
    setSelectedProjectId(projId);
  };

  const getSourceSnippet = (project: ProjectItem) => {
    switch (project.id) {
      case 'pawned':
        return `// C:\\IVY\\PROJECTS\\PAWNED\\src\\engine\\board.ts
export class ChessBoardEngine {
  private matrix: PieceMatrix;
  public activeTurn: 'WHITE' | 'BLACK' = 'WHITE';
  
  constructor() {
    this.matrix = this.initializeStandardBoard();
  }

  public getValidMoves(pos: Coordinate): Coordinate[] {
    const piece = this.matrix[pos.row][pos.col];
    if (!piece || piece.color !== this.activeTurn) return [];

    switch (piece.type) {
      case 'PAWN': return this.evaluatePawnMoves(pos, piece.color);
      case 'KNIGHT': return this.evaluateKnightMoves(pos);
      case 'BISHOP': return this.evaluateDiagonalVectors(pos);
      case 'ROOK': return this.evaluateOrthogonalVectors(pos);
      case 'QUEEN': return this.evaluateQueenVectors(pos);
      case 'KING': return this.evaluateKingReach(pos);
    }
  }
}`;
      case 'weather-ghost':
        return `// C:\\IVY\\PROJECTS\\WEATHER_GHOST\\src\\engine\\psychology.ts
export function interpretAtmosphere(metrics: AtmosphericReading): EmotionalProfile {
  const { temperature, humidity, precipitation, windSpeed } = metrics;
  
  if (precipitation > 2.0 && temperature < 20) {
    return {
      mood: 'MELANCHOLIC',
      palette: ['#102015', '#2E4532', '#B9B29F'],
      resonance: 'Quiet introspection and reflective cadence.'
    };
  }
  if (temperature > 25 && precipitation === 0) {
    return {
      mood: 'EUPHORIC',
      palette: ['#28351B', '#D8A84E', '#E8DFC9'],
      resonance: 'High energy clarity with crisp cognitive focus.'
    };
  }
  return {
    mood: 'INTROSPECTIVE',
    palette: ['#142417', '#7FA67A', '#E8DFC9'],
    resonance: 'Calm ambient equilibrium.'
  };
}`;
      case 'ctrl-code-solutions':
        return `// C:\\IVY\\PROJECTS\\CTRL_CODE\\src\\main.tsx
import { renderStudioHub } from './core/portal';

export const studioConfig = {
  name: 'CTRL Code Solutions',
  leadArchitect: 'Ivy Mburu',
  services: ['Full-Stack Web Engineering', 'System Solutions', 'Custom Web Apps'],
  identity: 'Retro Brutalist Precision'
};`;
      case 'static-xo':
        return `// C:\\IVY\\PROJECTS\\STATIC_XO\\src\\ai\\minimax.ts
export function minimax(board: BoardState, depth: number, isMaximizing: boolean): number {
  const score = evaluateBoard(board);
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (!hasMovesLeft(board)) return 0;

  if (isMaximizing) {
    let best = -1000;
    for (const move of getEmptyCells(board)) {
      board[move] = 'O';
      best = Math.max(best, minimax(board, depth + 1, false));
      board[move] = null;
    }
    return best;
  } else {
    let best = 1000;
    for (const move of getEmptyCells(board)) {
      board[move] = 'X';
      best = Math.min(best, minimax(board, depth + 1, true));
      board[move] = null;
    }
    return best;
  }
}`;
      case 'lifeline-hospital':
        return `// C:\\IVY\\PROJECTS\\LIFELINE\\src\\models\\triage.ts
export interface PatientQueueEntry {
  patientId: string;
  registrationTimestamp: number;
  priorityLevel: 'EMERGENCY' | 'URGENT' | 'STANDARD' | 'ROUTINE';
  assignedDoctor: string;
  department: 'OPD' | 'PEDIATRICS' | 'CARDIOLOGY' | 'ORTHOPEDICS';
  consultationStatus: 'WAITING' | 'IN_CONSULTATION' | 'PHARMACY' | 'DISCHARGED';
}`;
      case 'drive-noble':
        return `// C:\\IVY\\PROJECTS\\DRIVE_NOBLE\\src\\catalog\\filters.ts
export function filterInventory(inventory: Vehicle[], filter: CatalogFilter): Vehicle[] {
  return inventory.filter(car => {
    if (filter.category && car.category !== filter.category) return false;
    if (filter.minPrice && car.price < filter.minPrice) return false;
    if (filter.maxPrice && car.price > filter.maxPrice) return false;
    if (filter.fuelType && car.fuel !== filter.fuelType) return false;
    return true;
  });
}`;
      case 'pawned-chess-puzzles':
        return `// C:\\IVY\\PROJECTS\\PAWNED_PUZZLES\\src\\engine\\solver.ts
export function validateTacticalMove(puzzle: ChessPuzzle, playerMove: Move): PuzzleResult {
  const isCorrect = puzzle.solutionMoves.some(sol => 
    sol.from === playerMove.from && sol.to === playerMove.to
  );
  return {
    valid: isCorrect,
    status: isCorrect ? 'SOLVED' : 'INCORRECT_MOVE',
    scoreEarned: isCorrect ? puzzle.ratingDiff : 0
  };
}`;
      default:
        return `// Project Source: ${project.fileName}\n// Engineered by Ivy Mburu`;
    }
  };

  const openUrl = currentProject.liveUrl || currentProject.demoUrl;
  const buttonLabel = currentProject.buttonLabel || `OPEN ${currentProject.name?.toUpperCase() || currentProject.title.toUpperCase()}`;

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Left Sidebar: Project File Explorer */}
      <aside className="w-full md:w-64 bg-[#10171B] border-b md:border-b-0 md:border-r border-[#2B3B44] flex flex-col shrink-0">
        <div className="p-3 bg-[#141C20] border-b border-[#2B3B44] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-[#D8A84E]" />
            <span className="font-bold text-xs text-[#E8DFC9] font-retro-display">Projects Explorer</span>
          </div>
          <span className="text-[10px] font-mono-tech text-[#526A78]">
            {PROJECTS.length} REPOSITORIES
          </span>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {PROJECTS.map(proj => {
            const isSelected = proj.id === currentProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj.id)}
                className={`w-full text-left p-2.5 flex flex-col transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#526A78] border-[#E8DFC9] text-[#E8DFC9] shadow-sm'
                    : 'bg-[#141C20] border-[#2B3B44] text-[#B8B09D] hover:bg-[#1A242A] hover:text-[#E8DFC9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs truncate">
                    {proj.name || proj.title}
                  </span>
                  <span className="text-[9px] font-mono-tech px-1 py-0.2 bg-[#0C1215] border border-[#2B3B44] text-[#D8A84E]">
                    {proj.category}
                  </span>
                </div>
                <span className="text-[10px] text-[#7FA67A] font-mono-tech mt-0.5 truncate">
                  {proj.fileName}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Main Panel */}
      <main className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 bg-[#0E1417]">
        {/* Project Header Banner */}
        <header className="border-b border-[#2B3B44] pb-4 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-retro-display tracking-wide text-[#E8DFC9] phosphor-glow">
                {currentProject.name || currentProject.title}
              </h2>
              <p className="text-xs text-[#D8A84E] font-medium mt-0.5">
                {currentProject.type}
              </p>
            </div>

            {/* Status badge & category */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-tech px-2 py-0.5 border border-[#526A78] bg-[#141C20] text-[#7FA67A]">
                STATUS: {currentProject.status}
              </span>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 border border-[#526A78] bg-[#141C20] text-[#D8A84E]">
                {currentProject.category}
              </span>
            </div>
          </div>

          {/* Action Buttons: Live App, GitHub, Arcade, Technical Details */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#2B3B44]/60">
            {openUrl && (
              <a
                href={openUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(950)}
                className="px-3.5 py-1.5 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 retro-button transition-colors cursor-pointer shadow-xs"
              >
                <span>{buttonLabel}</span>
                <ExternalLink size={12} />
              </a>
            )}

            {currentProject.category === 'Games' && onOpenApp && (
              <button
                type="button"
                onClick={() => {
                  sound.playWindowOpen();
                  onOpenApp('arcade');
                }}
                className="px-3 py-1.5 bg-[#1A242A] border border-[#526A78] hover:border-[#D8A84E] text-[#E8DFC9] text-xs retro-button flex items-center gap-1.5 cursor-pointer"
              >
                <Play size={11} className="fill-[#D8A84E] text-[#D8A84E]" />
                <span>[ LAUNCH IN ARCADE ]</span>
              </button>
            )}

            <a
              href={currentProject.githubUrl || "https://github.com/bella-thehacker"}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(900)}
              className="px-3 py-1.5 border border-[#526A78] bg-[#141C20] hover:border-[#D8A84E] text-[#E8DFC9] text-xs retro-button flex items-center gap-1.5 cursor-pointer"
            >
              <Github size={12} />
              <span>[ GITHUB ]</span>
            </a>

            <button
              type="button"
              onClick={() => {
                sound.playClick(850);
                setShowTechnicalDetails(!showTechnicalDetails);
              }}
              className={`px-3 py-1.5 border text-xs font-semibold retro-button flex items-center gap-1.5 cursor-pointer ${
                showTechnicalDetails
                  ? 'bg-[#526A78] border-[#E8DFC9] text-[#E8DFC9]'
                  : 'bg-[#141C20] border-[#526A78] hover:border-[#D8A84E] text-[#B8B09D] hover:text-[#E8DFC9]'
              }`}
            >
              <Code size={12} />
              <span>
                {showTechnicalDetails ? '[ HIDE TECHNICAL CODE ]' : '[ VIEW TECHNICAL CODE ]'}
              </span>
            </button>
          </div>
        </header>

        {/* Project Video Preview Section */}
        <section className="mb-5 max-w-3xl">
          <ProjectPreviewImage
            project={currentProject}
            showOpenButton={true}
          />
        </section>

        {/* Detailed Breakdown */}
        <div className="space-y-4 max-w-3xl">
          {/* What It Is */}
          <div className="p-4 bg-[#141C20] border border-[#2B3B44]">
            <h3 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <Info size={13} />
              What It Is
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFC9] leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* What I Built */}
          <div className="p-4 bg-[#141C20] border border-[#2B3B44]">
            <h3 className="text-xs font-bold text-[#7FA67A] font-mono-tech tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <CheckCircle size={13} />
              What I Built
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFC9] leading-relaxed">
              {currentProject.whatIBuilt}
            </p>
          </div>

          {/* Technical Challenges & Engineering Lessons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProject.challenges && (
              <div className="p-3.5 bg-[#141C20] border border-[#2B3B44]">
                <h4 className="text-[10px] font-bold text-[#D8A84E] font-mono-tech uppercase mb-1">
                  Technical Challenge
                </h4>
                <p className="text-xs text-[#B8B09D] leading-relaxed">
                  {currentProject.challenges}
                </p>
              </div>
            )}

            {currentProject.lessons && (
              <div className="p-3.5 bg-[#141C20] border border-[#2B3B44]">
                <h4 className="text-[10px] font-bold text-[#7FA67A] font-mono-tech uppercase mb-1">
                  Key Lesson Learned
                </h4>
                <p className="text-xs text-[#B8B09D] leading-relaxed">
                  {currentProject.lessons}
                </p>
              </div>
            )}
          </div>

          {/* Technologies Chips */}
          <div className="p-3.5 bg-[#10171B] border border-[#2B3B44]">
            <span className="text-[10px] font-mono-tech text-[#526A78] block mb-2">
              TECHNOLOGIES &amp; ARCHITECTURAL TOOLS
            </span>
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#141C20] border border-[#526A78] text-xs font-mono-tech text-[#E8DFC9]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Technical Code Inspector (when toggled) */}
          {showTechnicalDetails && (
            <div className="p-4 bg-[#0A0E10] border-2 border-[#526A78] space-y-3">
              <div className="flex items-center justify-between border-b border-[#2B3B44] pb-2">
                <span className="text-xs font-mono-tech text-[#D8A84E] flex items-center gap-1.5">
                  <Code size={13} />
                  <span>SOURCE INSPECTOR: {currentProject.fileName}</span>
                </span>
                <span className="text-[10px] font-mono-tech text-[#526A78]">
                  READ-ONLY MATRIX
                </span>
              </div>

              <pre className="p-3 bg-[#070A0C] border border-[#2B3B44] text-[11px] font-mono-tech text-[#7FA67A] overflow-x-auto leading-relaxed">
                <code>{getSourceSnippet(currentProject)}</code>
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
