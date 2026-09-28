export type AppID =
  | 'files'
  | 'dev_studio'
  | 'security'
  | 'terminal'
  | 'arcade'
  | 'system'
  | 'resume'
  | 'contact'
  | 'settings'
  | 'sys_health';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppID;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  initialData?: any;
}

export interface SystemSettings {
  soundEnabled: boolean;
  soundMaster?: boolean;
  soundInterface?: boolean;
  soundStartup?: boolean;
  soundArcade?: boolean;
  volume: number;
  crtEffect?: boolean;
  crtScanlines: boolean;
  crtBloom: boolean;
  filmGrain?: boolean;
  screenFlicker?: boolean;
  reducedMotion: boolean;
  glitchEnabled: boolean;
  theme?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  name?: string;
  subtitle?: string;
  fileName: string;

  category:
    | 'Games'
    | 'Web Application'
    | 'Website'
    | 'Management System'
    | string;

  type: string;

  status: 'ACTIVE' | 'COMPLETED' | 'IN DEVELOPMENT';

  description: string;

  whatItIs?: string;
  whatIBuilt: string;
  whyIBuilt?: string;

  technologies: string[];

  challenges?: string;
  lessons?: string;
  architectureDetails?: string;

  // GIF / image preview
  previewImage?: string;

  liveUrl?: string;
  buttonLabel?: string;
  demoUrl?: string;
  githubUrl?: string;

  previewData?: Record<string, any>;
}

export interface SecurityArtifact {
  id: string;
  title: string;
  environment: string;
  type: string;

  status: 'COMPLETED' | 'ACTIVE' | 'IN PROGRESS';

  description: string;

  findings: string[];
  toolsUsed: string[];

  rawLogPreview?: string;
}

export interface SecurityTimelineEvent {
  step: string;
  title: string;
  description: string;

  status: 'COMPLETED' | 'ACTIVE' | 'CONTINUING';

  tags: string[];
}

export interface FileItem {
  id: string;
  name: string;
  path: string;

  type: 'folder' | 'file';

  extension?:
    | 'EXE'
    | 'SYS'
    | 'DLL'
    | 'TXT'
    | 'LOG'
    | 'CFG'
    | 'DOC';

  format?: string;
  size?: string;
  date: string;
  content?: string;

  appId?: AppID;
  projectId?: string;

  children?: FileItem[];
}