import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, CornerDownLeft } from 'lucide-react';
import { USER_INFO, SYSTEM_SPECS, PROJECTS } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { AppID } from '../../types';

interface TerminalAppProps {
  onOpenApp?: (appId: AppID, data?: any) => void;
  onClose?: () => void;
}

interface CommandOutput {
  command: string;
  response: string | React.ReactNode;
  isError?: boolean;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'sys.init',
      response: (
        <div className="space-y-1 text-xs font-mono-tech">
          <div className="text-[#D8A84E] font-bold">IVY-OS [Version 2.4]</div>
          <div className="text-[#B9B29F]">(C) Copyright Ivy Mburu. All rights reserved.</div>
          <div className="text-[#7FA67A]">Type <span className="text-[#D8A84E] font-bold">help</span> to view available system commands.</div>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < commandList.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandList[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else {
      sound.playKeyClick();
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd) return;

    sound.playClick(950);
    setCommandList(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    const lower = cmd.toLowerCase().trim();
    let response: string | React.ReactNode = '';
    let isError = false;

    switch (lower) {
      case 'help':
        response = (
          <div className="space-y-1.5 text-xs text-[#E8DFC9] font-mono-tech">
            <div className="text-[#D8A84E] font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1">
              <div><span className="text-[#D8A84E] font-bold">about</span> - Biography &amp; profile</div>
              <div><span className="text-[#D8A84E] font-bold">projects</span> - Work &amp; builds</div>
              <div><span className="text-[#D8A84E] font-bold">skills</span> - Verified technical stack</div>
              <div><span className="text-[#D8A84E] font-bold">security</span> - Cybersecurity learning hub</div>
              <div><span className="text-[#D8A84E] font-bold">contact</span> - Communication links</div>
              <div><span className="text-[#D8A84E] font-bold">arcade</span> - Launch retro games</div>
              <div><span className="text-[#D8A84E] font-bold">matrix</span> - Matrix phosphor stream</div>
              <div><span className="text-[#D8A84E] font-bold">coffee</span> - Developer fuel status</div>
              <div><span className="text-[#D8A84E] font-bold">clear</span> - Flush terminal screen</div>
              <div><span className="text-[#D8A84E] font-bold">exit</span> - Close terminal window</div>
            </div>
            <div className="text-[11px] text-[#7FA67A] pt-1">
              Try exploring easter eggs like 'curiosity', 'ivy', or 'whoami'.
            </div>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        response = (
          <div className="space-y-1 text-xs font-mono-tech">
            <div className="text-base font-bold text-[#E8DFC9]">{USER_INFO.name}</div>
            <div className="text-[#D8A84E]">{USER_INFO.title}</div>
            <div className="text-[#B9B29F]">{USER_INFO.degree} @ {USER_INFO.university}</div>
            <div className="text-[11px] text-[#7FA67A] pt-1 italic">"{USER_INFO.statusLine}"</div>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-1.5 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">REAL PROJECTS REPOSITORY ({PROJECTS.length} ACTIVE):</div>
            {PROJECTS.map(p => (
              <div key={p.id} className="py-0.5 border-b border-[#2B3B44]/60">
                <div className="flex items-center justify-between">
                  <span className="text-[#E8DFC9] font-bold">{p.name || p.title}</span>
                  <span className="text-[10px] text-[#D8A84E]">{p.category}</span>
                </div>
                <div className="text-[10px] text-[#7FA67A]">{p.liveUrl}</div>
              </div>
            ))}
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('dev_studio')}
                className="mt-1 text-[#D8A84E] underline hover:text-[#E8DFC9] cursor-pointer block"
              >
                Launch DEV_STUDIO.EXE for deep architecture &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="space-y-1.5 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">VERIFIED TECHNICAL STACK:</div>
            <div><span className="text-[#7FA67A]">LANGUAGES:</span> {SYSTEM_SPECS.languages.join(', ')}</div>
            <div><span className="text-[#7FA67A]">FRAMEWORKS:</span> {SYSTEM_SPECS.frameworks.join(', ')}</div>
            <div><span className="text-[#7FA67A]">TOOLS:</span> {SYSTEM_SPECS.tools.join(', ')}</div>
            <div><span className="text-[#7FA67A]">SECURITY:</span> {SYSTEM_SPECS.systemsAndSecurity.join(', ')}</div>
          </div>
        );
        break;

      case 'security':
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">CYBERSECURITY LEARNING &amp; LABS:</div>
            <p className="text-xs text-[#B9B29F]">
              Specializing in Linux administration, Wireshark packet capture analysis, Cisco Packet Tracer LAN architectures, and Cloud Security via Cyber Shujaa.
            </p>
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('security')}
                className="mt-1 text-[#D8A84E] underline hover:text-[#E8DFC9] cursor-pointer"
              >
                Launch SECURITY.SYS window &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">COMMUNICATION CHANNELS:</div>
            <div>NAME: {USER_INFO.name}</div>
            <div>EMAIL: {USER_INFO.email}</div>
            <div>PHONE: {USER_INFO.phone}</div>
            <div>LINKEDIN: {USER_INFO.linkedin}</div>
            <div>GITHUB: {USER_INFO.github}</div>
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('contact')}
                className="mt-1 text-[#D8A84E] underline hover:text-[#E8DFC9] cursor-pointer block"
              >
                Launch CONTACT.EXE &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'arcade':
      case 'games':
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">IVY'S REAL DEPLOYED GAMES:</div>
            <div>&bull; Pawned (Chess Application &amp; Engine) &rarr; https://pawned-retro-chess-app-lgh5.vercel.app/</div>
            <div>&bull; Static XO (Arcade Cyber Grid) &rarr; https://static-xo.vercel.app/</div>
            <div>&bull; Pawned Chess Puzzles &rarr; https://pawned-chess-puzzles.vercel.app/</div>
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('arcade')}
                className="mt-1 text-[#D8A84E] underline hover:text-[#E8DFC9] cursor-pointer block"
              >
                Launch ARCADE.DLL window &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'pawned':
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">PAWNED &bull; RETRO CHESS APPLICATION</div>
            <p className="text-xs text-[#B9B29F]">URL: https://pawned-retro-chess-app-lgh5.vercel.app/</p>
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('arcade', { initialGameId: 'pawned' })}
                className="mt-1 text-[#D8A84E] underline hover:text-[#E8DFC9] cursor-pointer"
              >
                Launch Pawned in Arcade &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'weather':
      case 'weather-ghost':
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E] font-bold">WEATHER GHOST &bull; EMOTIONAL METEOROLOGY</div>
            <p className="text-xs text-[#B9B29F]">URL: https://weather-ghost-3sne.vercel.app/</p>
            {onOpenApp && (
              <button
                onClick={() => onOpenApp('dev_studio', { projectId: 'weather-ghost' })}
                className="mt-1 text-[#D8A84E] underline hover:text-[#E8DFC9] cursor-pointer"
              >
                View Weather Ghost in Dev Studio &rarr;
              </button>
            )}
          </div>
        );
        break;

      case 'matrix':
        response = (
          <div className="text-xs font-mono-tech text-[#7FA67A] space-y-1">
            <div>01001001 01010110 01011001 00100000 01001111 01010011</div>
            <div>Wake up, Neo... The packet trace has you. Follow the white rabbit.</div>
          </div>
        );
        break;

      case 'coffee':
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#E8DFC9]">
            <div className="text-[#D8A84E]">BREWING DEVELOPER FUEL...</div>
            <div className="text-[#7FA67A]">[████████████████] 100%</div>
            <div>STATUS: ESSENTIAL FOR DEEP PACKET FORENSICS &amp; NIGHT TIME BUILDS</div>
          </div>
        );
        break;

      case 'curiosity':
      case 'sudo curiosity':
        sound.playCtrlMotif();
        response = (
          <div className="space-y-1 text-xs font-mono-tech text-[#D8A84E] phosphor-glow">
            <div className="font-bold">[!] ACCESS GRANTED.</div>
            <div>Curiosity is not a vulnerability in an aspiring security engineer; it is the primary instrument of discovery.</div>
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'exit':
        if (onClose) {
          onClose();
          return;
        }
        response = "Terminal session complete. Close the window with the top right X button.";
        break;

      default:
        sound.playError();
        isError = true;
        response = `Command not recognized: "${cmd}". Type 'help' for command list.`;
        break;
    }

    setHistory(prev => [...prev, { command: cmd, response, isError }]);
  };

  return (
    <div
      className="flex flex-col h-full bg-[#0A0D0B] text-[#E8DFC9] font-mono-tech text-xs select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141C20] border-b border-[#2B3B44] select-none">
        <div className="flex items-center gap-2">
          <TermIcon size={14} className="text-[#D8A84E]" />
          <span className="font-semibold tracking-wider text-[#E8DFC9] font-retro-display">IVY-OS:\&gt; COMMAND SHELL</span>
        </div>
        <div className="text-[10px] text-[#7FA67A]">UTF-8 &bull; TTY1</div>
      </div>

      {/* Terminal Scrollback Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {history.map((item, index) => (
          <div key={index} className="space-y-1 leading-relaxed">
            <div className="flex items-center gap-2 select-none">
              <span className="text-[#D8A84E] font-bold">C:\&gt;</span>
              <span className="text-[#E8DFC9] font-bold select-text">{item.command}</span>
            </div>
            <div className={`pl-4 ${item.isError ? 'text-[#E57373]' : 'text-[#E8DFC9]'}`}>
              {item.response}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Prompt Input Line */}
      <div className="flex items-center gap-2 p-3 bg-[#10171B] border-t border-[#2B3B44]">
        <span className="text-[#D8A84E] font-bold shrink-0">C:\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command (e.g. 'help', 'about', 'projects')..."
          autoFocus
          className="flex-1 bg-transparent text-[#E8DFC9] focus:outline-none font-mono-tech text-xs placeholder:text-[#526A78]"
        />
        <button
          onClick={() => executeCommand(input.trim())}
          className="px-2.5 py-1 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] text-xs hover:border-[#D8A84E] retro-button flex items-center gap-1 cursor-pointer"
        >
          <CornerDownLeft size={11} />
          <span>Exec</span>
        </button>
      </div>
    </div>
  );
};
