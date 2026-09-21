import React, { useState, useEffect, useCallback } from 'react';
import { BootSequence } from './components/BootSequence';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { ShutdownModal } from './components/ShutdownModal';
import { Notifications } from './components/Notifications';
import { SysHealthModal } from './components/SysHealthModal';

// Applications
import { FilesApp } from './components/apps/FilesApp';
import { DevStudioApp } from './components/apps/DevStudioApp';
import { SecurityApp } from './components/apps/SecurityApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { ArcadeApp } from './components/apps/ArcadeApp';
import { SystemApp } from './components/apps/SystemApp';
import { ResumeApp } from './components/apps/ResumeApp';
import { ContactApp } from './components/apps/ContactApp';
import { SettingsApp } from './components/apps/SettingsApp';

import { AppID, WindowState, SystemSettings, NotificationItem } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showSysHealth, setShowSysHealth] = useState(false);

  // System Settings
  const [settings, setSettings] = useState<SystemSettings>({
    soundEnabled: true,
    volume: 0.5,
    soundMaster: true,
    soundInterface: true,
    soundStartup: true,
    soundArcade: true,
    crtScanlines: true,
    crtBloom: true,
    reducedMotion: false,
    glitchEnabled: true,
    theme: 'retro-green'
  });

  // Sync sound settings with audio engine
  useEffect(() => {
    sound.setSoundCategories({
      soundMaster: settings.soundMaster !== undefined ? settings.soundMaster : settings.soundEnabled,
      soundInterface: settings.soundInterface ?? true,
      soundStartup: settings.soundStartup ?? true,
      soundArcade: settings.soundArcade ?? true,
      volume: settings.volume
    });
  }, [settings]);

  // Notifications Queue
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Default Windows definition
  const initialWindows: WindowState[] = [
    {
      id: 'files',
      title: 'My Files',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 50, y: 40 },
      size: { width: 780, height: 500 }
    },
    {
      id: 'dev_studio',
      title: 'Dev Studio',
      icon: '💻',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 70, y: 50 },
      size: { width: 840, height: 530 }
    },
    {
      id: 'security',
      title: 'Security Lab',
      icon: '🛡️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 90, y: 60 },
      size: { width: 820, height: 530 }
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: '📟',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 110, y: 70 },
      size: { width: 680, height: 460 }
    },
    {
      id: 'arcade',
      title: 'Arcade',
      icon: '🕹️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 80, y: 50 },
      size: { width: 740, height: 520 }
    },
    {
      id: 'system',
      title: 'About Ivy',
      icon: '⚙️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 90, y: 60 },
      size: { width: 750, height: 500 }
    },
    {
      id: 'resume',
      title: 'My Resume',
      icon: '📄',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 70, y: 40 },
      size: { width: 780, height: 550 }
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 100, y: 70 },
      size: { width: 620, height: 480 }
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '🔧',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 120, y: 80 },
      size: { width: 560, height: 450 }
    }
  ];

  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<AppID | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(20);

  // Auto-maximize on small screens / mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    sound.playNotification();
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setNotifications(prev => [...prev, { id, title, message, type, timestamp: Date.now() }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Open / Launch application
  const handleOpenApp = (appId: AppID, data?: any) => {
    setHighestZIndex(prev => prev + 1);
    const newZ = highestZIndex + 1;

    setWindows(prev =>
      prev.map(w => {
        if (w.id === appId) {
          return {
            ...w,
            isOpen: true,
            isMinimized: false,
            isMaximized: isMobile ? true : w.isMaximized,
            zIndex: newZ,
            initialData: data !== undefined ? data : w.initialData
          };
        }
        return w;
      })
    );

    setActiveWindowId(appId);
  };

  const handleFocusWindow = (id: AppID) => {
    setHighestZIndex(prev => prev + 1);
    const newZ = highestZIndex + 1;

    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w))
    );
    setActiveWindowId(id);
  };

  const handleCloseWindow = (id: AppID) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindowId === id) {
      const remainingOpen = windows.filter(w => w.isOpen && w.id !== id && !w.isMinimized);
      if (remainingOpen.length > 0) {
        setActiveWindowId(remainingOpen[remainingOpen.length - 1].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleMinimizeWindow = (id: AppID) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMaximizeWindow = (id: AppID) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const handleToggleWindow = (id: AppID) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      handleFocusWindow(id);
    } else if (activeWindowId === id) {
      handleMinimizeWindow(id);
    } else {
      handleFocusWindow(id);
    }
  };

  // Keyboard Shortcuts handler
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // CTRL + ALT + T -> Terminal
      if (e.ctrlKey && e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        sound.playWindowOpen();
        handleOpenApp('terminal');
      }
      // CTRL + ALT + A -> Arcade
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        sound.playWindowOpen();
        handleOpenApp('arcade');
      }
      // ESC closes start menu or modals
      if (e.key === 'Escape') {
        if (isStartMenuOpen) setIsStartMenuOpen(false);
        if (showShutdownModal) setShowShutdownModal(false);
        if (showSysHealth) setShowSysHealth(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isStartMenuOpen, showShutdownModal, showSysHealth]);

  // Boot completion event
  const handleBootComplete = () => {
    setHasBooted(true);
    setTimeout(() => {
      addNotification(
        "CTRL OS Ready",
        "Welcome to Ivy Mburu's interactive portfolio workstation. Double-click desktop icons or use the Start menu to explore.",
        "success"
      );
    }, 400);
  };

  // Shutdown confirmation
  const handleConfirmShutdown = () => {
    setShowShutdownModal(false);
    setIsShuttingDown(true);

    // Sequentially close windows
    setWindows(prev => prev.map(w => ({ ...w, isOpen: false })));

    setTimeout(() => {
      setIsShuttingDown(false);
      setIsOffline(true);
    }, 1800);
  };

  // Restart from offline
  const handleRestart = () => {
    setIsOffline(false);
    setIsShuttingDown(false);
    setHasBooted(false);
  };

  // Reboot triggered from settings
  const handleReboot = () => {
    handleCloseWindow('settings');
    setHasBooted(false);
  };

  return (
    <div
      id="ctrl-os-root"
      className="relative w-screen h-screen overflow-hidden bg-[#070a07] text-[#e8dcc4] font-mono select-none"
    >
      {/* Boot Sequence if not booted */}
      {!hasBooted ? (
        <BootSequence
          onBootComplete={handleBootComplete}
          soundEnabled={settings.soundEnabled}
        />
      ) : (
        <>
          {/* Desktop Canvas */}
          <Desktop
            onOpenApp={handleOpenApp}
            onOpenSysHealth={() => setShowSysHealth(true)}
          />

          {/* Active Windows Manager */}
          {windows.map(win => {
            if (!win.isOpen) return null;

            return (
              <Window
                key={win.id}
                window={win}
                onClose={handleCloseWindow}
                onMinimize={handleMinimizeWindow}
                onMaximize={handleMaximizeWindow}
                onFocus={handleFocusWindow}
              >
                {win.id === 'files' && (
                  <FilesApp onOpenFile={handleOpenApp} />
                )}
                {win.id === 'dev_studio' && (
                  <DevStudioApp
                    initialProjectId={win.initialData?.projectId}
                    onOpenApp={handleOpenApp}
                  />
                )}
                {win.id === 'security' && (
                  <SecurityApp />
                )}
                {win.id === 'terminal' && (
                  <TerminalApp onOpenApp={handleOpenApp} onClose={() => handleCloseWindow('terminal')} />
                )}
                {win.id === 'arcade' && (
                  <ArcadeApp initialGameId={win.initialData?.gameId} />
                )}
                {win.id === 'system' && (
                  <SystemApp />
                )}
                {win.id === 'resume' && (
                  <ResumeApp />
                )}
                {win.id === 'contact' && (
                  <ContactApp />
                )}
                {win.id === 'settings' && (
                  <SettingsApp
                    settings={settings}
                    onUpdateSettings={newS => setSettings(s => ({ ...s, ...newS }))}
                    onReboot={handleReboot}
                  />
                )}
              </Window>
            );
          })}

          {/* Taskbar */}
          <Taskbar
            windows={windows}
            activeWindowId={activeWindowId}
            onFocusWindow={handleFocusWindow}
            onToggleWindow={handleToggleWindow}
            onToggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
            isStartMenuOpen={isStartMenuOpen}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => {
              const next = !settings.soundEnabled;
              sound.setSoundEnabled(next);
              setSettings(s => ({ ...s, soundEnabled: next }));
            }}
            onOpenSysHealth={() => setShowSysHealth(true)}
          />

          {/* Start Menu */}
          <StartMenu
            isOpen={isStartMenuOpen}
            onClose={() => setIsStartMenuOpen(false)}
            onOpenApp={handleOpenApp}
            onInitiateShutdown={() => setShowShutdownModal(true)}
          />

          {/* System Health Monitor Modal */}
          <SysHealthModal
            isOpen={showSysHealth}
            onClose={() => setShowSysHealth(false)}
          />

          {/* System Notifications Toasts */}
          <Notifications
            notifications={notifications}
            onDismiss={handleDismissNotification}
          />
        </>
      )}

      {/* Shutdown Modal & Offline Screen */}
      <ShutdownModal
        isOpen={showShutdownModal}
        onCancel={() => setShowShutdownModal(false)}
        onConfirmShutdown={handleConfirmShutdown}
        isShuttingDown={isShuttingDown}
        isOffline={isOffline}
        onRestart={handleRestart}
      />

      {/* CRT Scanline and Screen Vignette Effects (Configured via Settings) */}
      {settings.crtScanlines && (
        <div className="fixed inset-0 pointer-events-none crt-scanlines z-50 opacity-80" />
      )}
      <div className="fixed inset-0 pointer-events-none crt-vignette z-50 opacity-90" />
    </div>
  );
}
