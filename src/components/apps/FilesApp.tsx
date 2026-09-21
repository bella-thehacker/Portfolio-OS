import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  HardDrive,
  Info,
  Folder as FolderIcon,
  Play,
  FileText,
  Shield,
  Gamepad2,
  Cpu,
  Layers,
  ExternalLink
} from 'lucide-react';
import { FILE_SYSTEM, PROJECTS } from '../../data/portfolioData';
import { FileItem, AppID } from '../../types';
import { sound } from '../../utils/audio';
import { ProjectPreviewVideo } from '../ProjectPreviewVideo';
import {
  RetroFolderIcon,
  RetroDevMonitorIcon,
  RetroSecurityShieldIcon,
  RetroArcadeIcon,
  RetroResumeIcon,
} from '../RetroIcons';

interface FilesAppProps {
  onOpenFile?: (appId: AppID, data?: any) => void;
}

export const FilesApp: React.FC<FilesAppProps> = ({ onOpenFile }) => {
  // Start at C:\IVY
  const rootIvy = FILE_SYSTEM.children?.[0] || FILE_SYSTEM;
  const [currentFolder, setCurrentFolder] = useState<FileItem>(rootIvy);
  const [history, setHistory] = useState<FileItem[]>([]);
  const [forwardHistory, setForwardHistory] = useState<FileItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);
  const [showProperties, setShowProperties] = useState<boolean>(false);

  // Navigate deeper into a folder
  const navigateTo = (folder: FileItem) => {
    sound.playClick(850);
    setHistory(prev => [...prev, currentFolder]);
    setForwardHistory([]);
    setCurrentFolder(folder);
    setSelectedItem(null);
  };

  // Back button
  const navigateBack = () => {
    if (history.length === 0) return;
    sound.playClick(650);
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setForwardHistory(fwd => [currentFolder, ...fwd]);
    setCurrentFolder(prev);
    setSelectedItem(null);
  };

  // Forward button
  const navigateForward = () => {
    if (forwardHistory.length === 0) return;
    sound.playClick(650);
    const next = forwardHistory[0];
    setForwardHistory(forwardHistory.slice(1));
    setHistory(prev => [...prev, currentFolder]);
    setCurrentFolder(next);
    setSelectedItem(null);
  };

  // Up button (parent directory)
  const navigateUp = () => {
    if (currentFolder.path === 'C:\\IVY' || currentFolder.path === 'C:\\') return;
    sound.playClick(600);
    setHistory(prev => [...prev, currentFolder]);
    setCurrentFolder(rootIvy);
    setSelectedItem(null);
  };

  const handleItemClick = (item: FileItem) => {
    sound.playClick(720);
    setSelectedItem(item);
  };

  const handleDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(item);
    } else if (item.appId && onOpenFile) {
      sound.playWindowOpen();
      onOpenFile(item.appId, item.projectId ? { projectId: item.projectId } : undefined);
    } else if (item.content) {
      setShowProperties(true);
    }
  };

  // Custom visual icon for folders and items
  const renderItemVisual = (item: FileItem) => {
    if (item.type === 'folder') {
      const folderName = item.name.toUpperCase();
      if (folderName.includes('GAMES')) {
        return <RetroArcadeIcon size={38} />;
      }
      if (folderName.includes('SECURITY')) {
        return <RetroSecurityShieldIcon size={38} />;
      }
      if (folderName.includes('PROJECTS') || folderName.includes('CLIENT')) {
        return <RetroDevMonitorIcon size={38} />;
      }
      return <RetroFolderIcon size={38} />;
    }

    // Specific file extensions
    if (item.extension === 'EXE') {
      return (
        <div className="w-10 h-10 bg-[#141C20] border border-[#526A78] flex items-center justify-center text-[#D8A84E]">
          <Play size={20} className="fill-[#D8A84E]" />
        </div>
      );
    }
    if (item.extension === 'SYS') {
      return (
        <div className="w-10 h-10 bg-[#141C20] border border-[#526A78] flex items-center justify-center text-[#7FA67A]">
          <Shield size={20} />
        </div>
      );
    }
    if (item.extension === 'DOC') {
      return <RetroResumeIcon size={36} />;
    }

    return (
      <div className="w-10 h-10 bg-[#141C20] border border-[#526A78] flex items-center justify-center text-[#B8B09D]">
        <FileText size={20} />
      </div>
    );
  };

  // Friendly human title
  const getFriendlyName = (name: string) => {
    if (name === 'PROJECTS') return 'Projects';
    if (name === 'CLIENT WORK' || name === 'CLIENTS') return 'Client Work';
    if (name === 'GAMES') return 'Games';
    if (name === 'SECURITY') return 'Security';
    if (name === 'EXPERIMENTS') return 'Experiments';
    if (name === 'EDUCATION') return 'Education';
    if (name === 'ARCHIVE') return 'Archive';
    if (name === 'CTRL_CODE.EXE') return 'CTRL Code Solutions';
    if (name === 'WEATHER_GHOST.EXE') return 'Weather Ghost';
    if (name === 'PAWNED.EXE') return 'Pawned';
    if (name === 'PAWNED_PUZZLES.EXE') return 'Pawned Chess Puzzles';
    if (name === 'STATIC_XO.EXE') return 'Static XO';
    if (name === 'LIFELINE.SYS') return 'Lifeline Hospital Management';
    if (name === 'DRIVE_NOBLE.EXE') return 'Drive Noble';
    return name.replace(/_/g, ' ').replace(/\.(EXE|SYS|DLL|DOC|TXT|LOG|CFG)$/i, '');
  };

  // Selected project info if applicable
  const selectedProject = selectedItem?.projectId
    ? PROJECTS.find(p => p.id === selectedItem.projectId)
    : null;

  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Top Address & Navigation Bar */}
      <div className="flex items-center gap-2 p-2 bg-[#141C20] border-b border-[#2B3B44]">
        {/* Nav Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={navigateBack}
            disabled={history.length === 0}
            className={`p-1.5 border border-[#526A78] bg-[#1A242A] text-[#E8DFC9] retro-button ${
              history.length === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#D8A84E] cursor-pointer'
            }`}
            title="Back"
          >
            <ArrowLeft size={13} />
          </button>

          <button
            onClick={navigateForward}
            disabled={forwardHistory.length === 0}
            className={`p-1.5 border border-[#526A78] bg-[#1A242A] text-[#E8DFC9] retro-button ${
              forwardHistory.length === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#D8A84E] cursor-pointer'
            }`}
            title="Forward"
          >
            <ArrowRight size={13} />
          </button>

          <button
            onClick={navigateUp}
            disabled={currentFolder.path === 'C:\\IVY'}
            className={`p-1.5 border border-[#526A78] bg-[#1A242A] text-[#E8DFC9] retro-button ${
              currentFolder.path === 'C:\\IVY' ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#D8A84E] cursor-pointer'
            }`}
            title="Up to C:\Ivy"
          >
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Current Folder Path */}
        <div className="flex-1 flex items-center gap-2 px-2.5 py-1 bg-[#10171B] border border-[#2B3B44] retro-bevel-inset text-[#E8DFC9] truncate font-mono-tech text-xs">
          <HardDrive size={13} className="text-[#D8A84E] shrink-0" />
          <span className="text-[#D8A84E]">PATH:</span>
          <span className="truncate">{currentFolder.path}\</span>
        </div>

        {/* Properties / Info Toggle */}
        <button
          onClick={() => setShowProperties(!showProperties)}
          className={`px-2.5 py-1 border flex items-center gap-1.5 font-medium transition-all retro-button cursor-pointer ${
            showProperties
              ? 'bg-[#D8A84E] text-[#0A0D0B] border-[#E8DFC9]'
              : 'border-[#526A78] bg-[#1A242A] text-[#B8B09D] hover:text-[#E8DFC9] hover:border-[#D8A84E]'
          }`}
          title="Toggle Properties Inspector"
        >
          <Info size={12} />
          <span className="hidden sm:inline">Properties</span>
        </button>
      </div>

      {/* Explorer Body: Split into File Grid & Info Inspector */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Folder Grid View */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentFolder.children?.map(item => {
              const isSelected = selectedItem?.id === item.id;
              const friendlyName = getFriendlyName(item.name);

              return (
                <div
                  key={item.id}
                  id={`file-item-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleDoubleClick(item)}
                  className={`p-3.5 flex flex-col items-center justify-center text-center border rounded-none cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#1A242A] border-[#D8A84E] text-[#E8DFC9] shadow-md'
                      : 'bg-[#141C20] border-[#2B3B44] hover:border-[#526A78] hover:bg-[#1A242A]'
                  }`}
                >
                  {/* Chunky Illustrated Retro Graphic */}
                  <div className="mb-2 flex items-center justify-center min-h-[44px]">
                    {renderItemVisual(item)}
                  </div>

                  {/* Friendly Human Title */}
                  <span className="text-xs sm:text-sm font-semibold truncate max-w-full text-[#E8DFC9]">
                    {friendlyName}
                  </span>

                  {/* Machine Layer Sub-label */}
                  <span className="text-[10px] font-mono-tech text-[#526A78] mt-0.5 truncate max-w-full">
                    {item.type === 'folder' ? 'Folder' : item.name}
                  </span>
                </div>
              );
            })}
          </div>

          {(!currentFolder.children || currentFolder.children.length === 0) && (
            <div className="h-full flex flex-col items-center justify-center text-[#526A78] p-8 text-center">
              <FolderIcon size={36} className="text-[#2B3B44] mb-2" />
              <p className="text-sm font-medium">This folder is empty.</p>
            </div>
          )}
        </div>

        {/* Properties / Technical Metadata Panel (The "Machine Layer") */}
        {(showProperties || selectedItem) && (
          <aside className="w-full md:w-80 bg-[#10171B] border-t md:border-t-0 md:border-l border-[#2B3B44] p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#2B3B44] pb-2 mb-3">
                <span className="font-bold text-xs text-[#D8A84E] flex items-center gap-1.5 font-retro-display">
                  <Info size={13} />
                  {selectedItem ? 'Item Properties' : 'Folder Info'}
                </span>
                <span className="text-[10px] font-mono-tech text-[#526A78]">
                  {selectedItem ? selectedItem.type.toUpperCase() : 'DIR'}
                </span>
              </div>

              {selectedItem ? (
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#526A78] block">DISPLAY NAME</span>
                    <span className="font-semibold text-sm text-[#E8DFC9] block">
                      {getFriendlyName(selectedItem.name)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-tech text-[#526A78] block">MACHINE FILENAME</span>
                    <span className="text-xs font-mono-tech text-[#D8A84E] block">
                      {selectedItem.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-tech text-[#526A78] block">LOCATION</span>
                    <span className="text-xs font-mono-tech text-[#B8B09D] break-all block">
                      {selectedItem.path}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[10px] font-mono-tech text-[#526A78] block">SIZE</span>
                      <span className="text-xs font-mono-tech text-[#E8DFC9]">
                        {selectedItem.size || '4 KB (Catalog)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-tech text-[#526A78] block">DATE</span>
                      <span className="text-xs font-mono-tech text-[#E8DFC9]">
                        {selectedItem.date}
                      </span>
                    </div>
                  </div>

                  {selectedProject && (
                    <div className="mt-3 p-2.5 bg-[#141C20] border border-[#2B3B44] space-y-2">
                      <span className="text-[10px] font-bold text-[#D8A84E] block uppercase">
                        {selectedProject.type}
                      </span>
                      
                      {/* Project Preview Video inside Files Inspector */}
                      <div className="my-2">
                        <ProjectPreviewVideo
                          project={selectedProject}
                          showOpenButton={false}
                        />
                      </div>

                      <p className="text-xs text-[#B8B09D] line-clamp-3">
                        {selectedProject.description}
                      </p>

                      {/* Direct Live URL Link */}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => sound.playClick(950)}
                          className="w-full py-1.5 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 retro-button shadow-xs cursor-pointer"
                        >
                          <span>{selectedProject.buttonLabel || `OPEN ${selectedProject.name?.toUpperCase() || selectedProject.title.toUpperCase()}`}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          if (selectedItem.appId && onOpenFile) {
                            sound.playWindowOpen();
                            onOpenFile(selectedItem.appId, { projectId: selectedProject.id });
                          }
                        }}
                        className="w-full py-1 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] font-medium text-xs retro-button cursor-pointer"
                      >
                        {selectedItem.appId === 'arcade' ? '[ Launch in Arcade ]' : '[ Open in Dev Studio ]'}
                      </button>
                    </div>
                  )}

                  {selectedItem.content && (
                    <div className="mt-3 p-2.5 bg-[#0A0D0B] border border-[#2B3B44] font-mono-tech text-[11px] text-[#B8B09D] max-h-40 overflow-y-auto whitespace-pre-wrap">
                      {selectedItem.content}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#526A78] block">CURRENT FOLDER</span>
                    <span className="font-semibold text-sm text-[#E8DFC9] block">
                      {getFriendlyName(currentFolder.name)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#526A78] block">OBJECT COUNT</span>
                    <span className="font-mono-tech text-xs text-[#E8DFC9]">
                      {currentFolder.children?.length || 0} items
                    </span>
                  </div>
                  <p className="text-xs text-[#B8B09D] mt-2">
                    Double-click any folder or application to explore Ivy's work.
                  </p>
                </div>
              )}
            </div>

            {selectedItem?.type === 'folder' && (
              <button
                onClick={() => navigateTo(selectedItem)}
                className="mt-4 w-full py-1.5 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] font-medium text-xs retro-button cursor-pointer"
              >
                Open Folder &rarr;
              </button>
            )}
          </aside>
        )}
      </div>

      {/* Explorer Footer */}
      <footer className="px-3 py-1.5 bg-[#10171B] border-t border-[#2B3B44] flex items-center justify-between text-[11px] font-mono-tech text-[#526A78]">
        <span>
          {currentFolder.children ? `${currentFolder.children.length} item(s)` : '0 items'}
        </span>
        <span className="text-[#B8B09D]">
          {selectedItem ? `Selected: ${selectedItem.name}` : 'Double-click to open'}
        </span>
      </footer>
    </div>
  );
};
