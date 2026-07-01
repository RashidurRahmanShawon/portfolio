import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  X,
  Battery,
  Wifi,
  Volume2,
  Search,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Globe,
  Camera,
  Trash2,
  Download
} from 'lucide-react';
import DiscordApp from './DiscordApp';


// Custom real app icons styled in portfolio color profiles (black/amber/orange)
const TerminalIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const DiscordIcon = (props) => (
  <svg viewBox="0 0 127.14 96.36" fill="currentColor" {...props}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,72.9,0c.79.71,1.63,1.4,2.51,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,50.21,123.82,27.35,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
  </svg>
);

const AutomationIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="15" width="6" height="6" rx="1" />
    <path d="M6 9v3a2 2 0 0 0 2 2h4" />
    <path d="M18 9v3a2 2 0 0 1-2 2h-4" />
    <path d="M12 14v1" />
  </svg>
);

const DashboardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17v-5" />
    <path d="M12 17V9" />
    <path d="M15 17v-3" />
  </svg>
);

const ApiIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
    <path d="M20 10v4" />
  </svg>
);

const SettingsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const BotControlIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 7h-9" />
    <path d="M14 17H4" />
    <circle cx="17" cy="17" r="3" />
    <circle cx="7" cy="7" r="3" />
  </svg>
);

const BrowserIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CameraIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.788-.97-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.743 3.82-.875 7.09-.5 9.712 1.102.296.18.387.563.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.69-1.652-6.79-2.13-9.97-1.165-.41.124-.843-.105-.967-.514-.124-.41.105-.844.514-.968 3.636-1.102 8.147-.568 11.237 1.328.366.226.487.707.26 1.073zm.105-2.836C14.492 8.86 8.7 8.667 5.35 9.68c-.514.156-1.05-.133-1.207-.648-.156-.514.133-1.05.648-1.207 3.856-1.17 10.24-.943 14.288 1.46.464.275.615.875.34 1.34-.276.463-.876.613-1.34.338z"/>
  </svg>
);

const APPS = [
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon, desc: 'Interactive developer console' },
  { id: 'discord', name: 'Discord', icon: DiscordIcon, desc: 'Simulated community chat' },
  { id: 'botcontrol', name: 'Bot Control Center', icon: BotControlIcon, desc: 'System integrations dashboard' },
  { id: 'automation', name: 'Automation Studio', icon: AutomationIcon, desc: 'Workflow runner simulation' },
  { id: 'dashboard', name: 'Operations DB', icon: DashboardIcon, desc: 'Cluster statistics' },
  { id: 'api', name: 'API Monitor', icon: ApiIcon, desc: 'Live query telemetry feed' },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, desc: 'Personalize virtual environment' },
  { id: 'browser', name: 'Web Browser', icon: BrowserIcon, desc: 'Browse the web' },
  { id: 'camera', name: 'Camera', icon: CameraIcon, desc: 'Capture pictures with webcam' },
  { id: 'spotify', name: 'Spotify', icon: SpotifyIcon, desc: 'Listen to music' }
];

const WALLPAPERS = [
  { id: 'orange-bloom', name: 'Windows Amber Bloom', bg: 'bg-gradient-to-br from-amber-950 via-charcoal to-obsidian' },
  { id: 'matrix', name: 'Matrix Digital Grid', bg: 'bg-black syntax-grid' },
  { id: 'cyberpunk', name: 'Neon Horizon', bg: 'bg-gradient-to-tr from-charcoal via-amber-900/40 to-black' },
];

function AppWindow({
  appId,
  appDetails,
  winState,
  isActive,
  osTheme,
  windowSizes,
  setAppWindowStates,
  closeApp,
  setActiveApp,
  startResize,
  desktopRef,
  children
}) {
  const dragControls = useDragControls();
  const Icon = appDetails.icon;

  return (
    <motion.div
      drag={!winState.maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={desktopRef}
      dragElastic={0}
      initial={{ scale: 0.96, opacity: 0, y: 15 }}
      animate={winState.minimized ? {
        scale: 0.05,
        opacity: 0,
        y: 350,
        transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] }
      } : winState.maximized ? {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.2, ease: 'easeOut' }
      } : {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      exit={{ scale: 0.96, opacity: 0 }}
      onClick={() => setActiveApp(appId)}
      className={`absolute flex flex-col shadow-2xl z-20 ${
        winState.maximized
          ? 'top-0 left-0 right-0 bottom-0 rounded-none border-b border-white/10'
          : 'top-4 left-4 md:top-8 md:left-12 rounded border'
      } ${
        isActive ? 'border-amber/50 bg-charcoal' : 'border-white/10 bg-charcoal/90'
      } ${osTheme === 'light' ? 'bg-white text-charcoal border-charcoal/10' : 'bg-charcoal text-bone border-white/10'}`}
      style={winState.maximized ? { width: '100%', height: '100%', top: 0, left: 0, pointerEvents: winState.minimized ? 'none' : 'auto' } : {
        width: `${windowSizes[appId]?.width || 660}px`,
        height: `${windowSizes[appId]?.height || 420}px`,
        pointerEvents: winState.minimized ? 'none' : 'auto'
      }}
    >
      {/* Window Titlebar (drag trigger) */}
      <div
        className={`px-4 py-2 flex items-center justify-between select-none ${
          osTheme === 'light' ? 'bg-slate-100 border-b border-slate-200' : 'bg-obsidian border-b border-white/5'
        }`}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
          <Icon className="w-3.5 h-3.5 text-amber" />
          <span>{appDetails.name}</span>
        </div>
        
        {/* Window controls */}
        <div className="flex items-center gap-1 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAppWindowStates(prev => ({
                ...prev,
                [appId]: { ...prev[appId], minimized: true }
              }));
            }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors cursor-default"
            title="Minimize"
          >
            <span className="w-2.5 h-[1.5px] bg-current" />
          </button>
          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAppWindowStates(prev => ({
                ...prev,
                [appId]: { ...prev[appId], maximized: !winState.maximized }
              }));
            }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors cursor-default"
            title={winState.maximized ? "Restore Down" : "Maximize"}
          >
            <div className="w-2.5 h-2.5 border border-current rounded-[1px]" />
          </button>
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeApp(appId); }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/80 transition-colors cursor-default"
            title="Close"
          >
            <X className="w-3.5 h-3.5 text-current" />
          </button>
        </div>
      </div>

      {/* Window Workspace Content */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>

      {/* Window resize drag handle */}
      {!winState.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 select-none z-30"
          onMouseDown={(e) => startResize(e, appId)}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-white/20 fill-current">
            <line x1="8" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="3" x2="3" y2="8" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="6" x2="6" y2="8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export default function Playground() {
  const isDraggingShortcut = useRef(false);
  const [openApps, setOpenApps] = useState(['terminal']);
  const [activeApp, setActiveApp] = useState('terminal');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [osTheme, setOsTheme] = useState('dark'); // dark, light
  const [currentWallpaper, setCurrentWallpaper] = useState('orange-bloom');
  const [timeStr, setTimeStr] = useState('17:56:00');
  const [dateStr, setDateStr] = useState('06/30/2026');

  // Window states (minimize/maximize tracker)
  const [appWindowStates, setAppWindowStates] = useState({
    terminal: { minimized: false, maximized: false },
    discord: { minimized: false, maximized: false },
    automation: { minimized: false, maximized: false },
    dashboard: { minimized: false, maximized: false },
    api: { minimized: false, maximized: false },
    settings: { minimized: false, maximized: false },
    browser: { minimized: false, maximized: false },
    camera: { minimized: false, maximized: false },
    spotify: { minimized: false, maximized: false },
  });

  const [windowSizes, setWindowSizes] = useState({
    terminal: { width: 660, height: 420 },
    discord: { width: 720, height: 460 },
    automation: { width: 720, height: 460 },
    dashboard: { width: 720, height: 460 },
    api: { width: 660, height: 380 },
    settings: { width: 520, height: 420 },
    browser: { width: 800, height: 500 },
    camera: { width: 680, height: 480 },
    spotify: { width: 780, height: 480 },
  });

  const startResize = (e, appId) => {
    e.preventDefault();
    if (!desktopRef.current) return;
    const bound = desktopRef.current.getBoundingClientRect();
    const maxAllowedWidth = bound.width - 16;
    const maxAllowedHeight = bound.height - 16;
    const startWidth = windowSizes[appId].width;
    const startHeight = windowSizes[appId].height;
    const startX = e.clientX;
    const startY = e.clientY;

    const doDrag = (moveEvent) => {
      const newWidth = Math.max(320, Math.min(maxAllowedWidth, startWidth + (moveEvent.clientX - startX)));
      const newHeight = Math.max(220, Math.min(maxAllowedHeight, startHeight + (moveEvent.clientY - startY)));
      setWindowSizes(prev => ({
        ...prev,
        [appId]: { width: newWidth, height: newHeight }
      }));
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  const termScrollRef = useRef(null);
  const desktopRef = useRef(null);

  // Virtual file system config
  const [currentPath, setCurrentPath] = useState('C:\\Users\\Rashidur');
  const filesSystem = {
    'C:\\Users\\Rashidur': {
      dirs: ['projects', 'automation'],
      files: {
        'system_spec.json': '{\n  "version": "4.10.8",\n  "status": "active",\n  "threads": 128,\n  "cache": "Redis Enterprise"\n}',
        'architecture.md': '# Microservices Cluster Layout\n- Gateway: WebSocket proxy with rate limit\n- Message Queue: RabbitMQ\n- Cache layer: Redis Pub/Sub\n- Db: PostgreSQL replica pools'
      }
    },
    'C:\\Users\\Rashidur\\projects': {
      dirs: [],
      files: {
        'discord_suite.log': '[INFO] Shard manager booted\n[INFO] 64 shards connected successfully\n[WARN] API latency spiked to 68ms (re-routed)',
        'escrow_ledger.bin': '[ENCRYPTED LEDGER BLOCK] AES-256 key verification normal'
      }
    },
    'C:\\Users\\Rashidur\\automation': {
      dirs: [],
      files: {
        'webhook_poller.py': 'def check_trigger(event):\n    if event.get("type") == "PAYMENT_SETTLED":\n        dispatch_celery_task(event)\n        return True\n    return False'
      }
    }
  };

  // App states
  const [termInput, setTermInput] = useState('');
  const [termLogs, setTermLogs] = useState([
    'Microsoft Windows 11 [Version 10.0.22621]',
    '(c) Microsoft Corporation. System developer modifications loaded.',
    '',
    'Type "help" to list custom lab terminal commands.',
    ''
  ]);

  const [shards, setShards] = useState([
    { id: 0, status: 'ONLINE', ping: '24ms', events: 1250 },
    { id: 1, status: 'ONLINE', ping: '28ms', events: 980 },
    { id: 2, status: 'ONLINE', ping: '31ms', events: 1430 },
    { id: 3, status: 'ONLINE', ping: '19ms', events: 1100 },
  ]);

  // CELL_W/CELL_H must match the grid cell dimensions used in the render
  const CELL_W = 80;
  const CELL_H = 76;
  const MAX_COLS = 8;
  const MAX_ROWS = 6;

  // Draggable Grid Positions for desktop icons (7 rows per column)
  const [appPositions, setAppPositions] = useState({
    terminal: { row: 0, col: 0 },
    discord: { row: 1, col: 0 },
    botcontrol: { row: 2, col: 0 },
    automation: { row: 3, col: 0 },
    dashboard: { row: 4, col: 0 },
    api: { row: 5, col: 0 },
    settings: { row: 6, col: 0 },
    browser: { row: 0, col: 1 },
    camera: { row: 1, col: 1 },
    spotify: { row: 2, col: 1 },
  });

  // dragState tracks live pointer position while dragging
  const [dragState, setDragState] = useState(null); // { appId, x, y }
  const appPositionsRef = useRef(appPositions);
  useEffect(() => { appPositionsRef.current = appPositions; }, [appPositions]);

  const handleShortcutMouseDown = (e, appId) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingShortcut.current = false;
    const startX = e.clientX;
    const startY = e.clientY;
    let hasMoved = false;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (!hasMoved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      hasMoved = true;
      isDraggingShortcut.current = true;

      if (!desktopRef.current) return;
      const bound = desktopRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - bound.left;
      const y = moveEvent.clientY - bound.top;
      setDragState({ appId, x, y });
    };

    const onMouseUp = (upEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (!hasMoved) {
        // It was a click — launch after brief delay
        setTimeout(() => { isDraggingShortcut.current = false; }, 50);
        setDragState(null);
        return;
      }

      setTimeout(() => { isDraggingShortcut.current = false; }, 150);

      if (!desktopRef.current) return;
      const bound = desktopRef.current.getBoundingClientRect();
      const x = upEvent.clientX - bound.left;
      const y = upEvent.clientY - bound.top;

      const targetCol = Math.max(0, Math.min(MAX_COLS, Math.round((x - CELL_W / 2) / CELL_W)));
      const targetRow = Math.max(0, Math.min(MAX_ROWS, Math.round((y - CELL_H / 2) / CELL_H)));

      // Find nearest free cell (Manhattan distance)
      const currentPositions = appPositionsRef.current;
      let finalRow = targetRow;
      let finalCol = targetCol;
      let minDist = Infinity;

      for (let r = 0; r <= MAX_ROWS; r++) {
        for (let c = 0; c <= MAX_COLS; c++) {
          const occupied = Object.entries(currentPositions).some(
            ([id, pos]) => id !== appId && pos.row === r && pos.col === c
          );
          if (!occupied) {
            const dist = Math.abs(r - targetRow) + Math.abs(c - targetCol);
            if (dist < minDist) {
              minDist = dist;
              finalRow = r;
              finalCol = c;
            }
          }
        }
      }

      setAppPositions(prev => ({ ...prev, [appId]: { row: finalRow, col: finalCol } }));
      setDragState(null);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // placeholder to keep the closing brace context intact
  const _unusedDragEnd = (appId) => {
    setAppPositions(prev => ({
      ...prev,
      [appId]: prev[appId]
    }));
  };

  // Simulated Discord app and Bot Control Center shared state
  const [activeServer, setActiveServer] = useState('NV'); // 'NV', 'AH', 'ZN', 'DF', 'OL', 'AS', 'DM'
  const [activeChannel, setActiveChannel] = useState('general');
  const [chatInput, setChatInput] = useState('');

  // 100+ members generator helper
  const [mockMembers, setMockMembers] = useState(() => {
    const roles = ['Owner', 'Moderator', 'Member'];
    const statuses = ['online', 'idle', 'dnd', 'offline'];
    const names = [
      'Alexander', 'Sophia', 'Liam', 'Olivia', 'Noah', 'Emma', 'Jackson', 'Ava', 'Aiden', 'Isabella',
      'Lucas', 'Mia', 'Caden', 'Charlotte', 'Grayson', 'Amelia', 'Mason', 'Harper', 'Oliver', 'Evelyn',
      'Elijah', 'Abigail', 'Logan', 'Emily', 'Carter', 'Elizabeth', 'Ethan', 'Sofia', 'Jayden', 'Avery',
      'Zack99', 'SystemMod', 'AlphaTester', 'DevopsGuy', 'CloudArch', 'QueuePoller', 'DbReplicator', 'WebsocketGuru',
      'CeleryNode1', 'RedisReplica', 'EscrowSigner', 'CardTrader', 'ApexFan', 'ZenithAdmin', 'NovaHelper',
      'Grace', 'Daniel', 'Chloe', 'James', 'Victoria', 'Benjamin', 'Aubrey', 'William', 'Zoey', 'Sebastian'
    ];
    
    const serverMembers = {};
    const serversList = ['NV', 'AH', 'ZN', 'DF', 'OL', 'AS'];
    
    serversList.forEach((srv) => {
      const list = [];
      list.push({ name: 'System Owner', role: 'Owner', status: 'online' });
      list.push({ name: 'Moderator Sarah', role: 'Moderator', status: 'idle' });
      
      // Generate 105 mock members per server
      for (let i = 0; i < 105; i++) {
        const nameSeed = names[i % names.length] + (i >= names.length ? `_${i}` : '');
        const roleSeed = i < 6 ? 'Moderator' : 'Member';
        const statusSeed = statuses[i % statuses.length];
        list.push({
          name: nameSeed,
          role: roleSeed,
          status: statusSeed
        });
      }
      serverMembers[srv] = list;
    });

    return serverMembers;
  });

  // Dynamic server channels state
  const [serverChannels, setServerChannels] = useState({
    NV: ['general', 'announcements', 'support', 'verification', 'tickets', 'bot-commands', 'logs', 'staff'],
    AH: ['general', 'announcements', 'support', 'verification', 'tickets', 'bot-commands', 'logs', 'staff'],
    ZN: ['general', 'announcements', 'support', 'verification', 'tickets', 'bot-commands', 'logs', 'staff'],
    DF: ['general', 'announcements', 'support', 'verification', 'tickets', 'bot-commands', 'logs', 'staff'],
    OL: ['general', 'announcements', 'support', 'verification', 'tickets', 'bot-commands', 'logs', 'staff'],
    AS: ['general', 'announcements', 'support', 'verification', 'tickets', 'bot-commands', 'logs', 'staff'],
  });

  // Bot configs (Shared State controlled by Bot Control Center)
  const [botConfigs, setBotConfigs] = useState({
    NV: { name: 'Nova System', initials: 'NS', verification: true, tickets: false, logging: true, welcome: true, moderation: true, autoroles: false, reactionroles: false, automations: true },
    AH: { name: 'Automation Core', initials: 'AC', verification: false, tickets: true, logging: true, welcome: true, moderation: false, autoroles: true, reactionroles: false, automations: true },
    ZN: { name: 'Zenith Assistant', initials: 'ZA', verification: true, tickets: true, logging: false, welcome: false, moderation: true, autoroles: false, reactionroles: true, automations: false },
    DF: { name: 'Forge Assistant', initials: 'FA', verification: false, tickets: false, logging: true, welcome: true, moderation: true, autoroles: false, reactionroles: false, automations: true },
    OL: { name: 'Operations Manager', initials: 'OM', verification: true, tickets: true, logging: true, welcome: true, moderation: true, autoroles: true, reactionroles: true, automations: true },
    AS: { name: 'Apex Engine', initials: 'AE', verification: false, tickets: true, logging: true, welcome: false, moderation: false, autoroles: false, reactionroles: false, automations: true }
  });

  // Simulated Discord messages
  const [discordMessages, setDiscordMessages] = useState({
    NV: {
      general: [
        { author: 'Nova Founder', content: 'Hey everyone! Welcome to Nova Community. Make sure to verify your profile in #verification.', time: '11:04 AM' },
        { author: 'Zack99', content: 'Awesome to be here! Can’t wait for the new automation triggers.', time: '11:15 AM' },
        { author: 'Moderator Sarah', content: 'Remember to stay polite and adhere to rules.', time: '11:20 AM' }
      ],
      announcements: [
        { author: 'Nova Founder', content: '📢 Nova community bot is now online and connected to Zenith core!', time: '10:00 AM' }
      ],
      support: [
        { author: 'UserX', content: 'Having issues with my user-role integration. Any help?', time: '09:30 AM' },
        { author: 'Nova System', content: 'Hello UserX! Please open a ticket using the Bot Control dashboard.', time: '09:31 AM', isBot: true }
      ],
      verification: [
        { author: 'Nova System', content: 'Welcome to Nova Community! Verification is currently [ENABLED]. Type your verification query.', time: '08:00 AM', isBot: true }
      ],
      tickets: [],
      'bot-commands': [
        { author: 'Zack99', content: '!status', time: '11:40 AM' },
        { author: 'Nova System', content: '🤖 Nova System is active. Memory consumption: 4.8MB. All queues running.', time: '11:40 AM', isBot: true }
      ],
      logs: [
        { author: 'Nova System', content: 'SYSTEM LOG: Verification system booted.', time: '08:00 AM', isBot: true }
      ],
      staff: [
        { author: 'Moderator Sarah', content: 'Verification queue looks quiet today.', time: '11:00 AM' }
      ]
    },
    AH: {
      general: [
        { author: 'System Owner', content: 'Welcome to the Automation Hub! Deploying core bot systems.', time: '09:00 AM' }
      ],
      announcements: [{ author: 'System Owner', content: '📢 Automation Core Bot V2 released.', time: '09:05 AM' }],
      support: [],
      verification: [{ author: 'Automation Core', content: 'Verification is currently [DISABLED].', time: '09:00 AM', isBot: true }],
      tickets: [],
      'bot-commands': [],
      logs: [],
      staff: []
    },
    ZN: {
      general: [{ author: 'System Owner', content: 'Zenith Network live chat stream.', time: '10:00 AM' }],
      announcements: [],
      support: [],
      verification: [{ author: 'Zenith Assistant', content: 'Please verify to get access to all channels.', time: '10:00 AM', isBot: true }],
      tickets: [],
      'bot-commands': [],
      logs: [],
      staff: []
    },
    DF: {
      general: [{ author: 'System Owner', content: 'Developer Forge sandbox general channel.', time: '11:00 AM' }],
      announcements: [],
      support: [],
      verification: [],
      tickets: [],
      'bot-commands': [],
      logs: [],
      staff: []
    },
    OL: {
      general: [{ author: 'System Owner', content: 'Operations Lab live chat channel.', time: '10:00 AM' }],
      announcements: [],
      support: [],
      verification: [{ author: 'Operations Manager', content: 'Welcome to Operations Lab! Verification is ACTIVE.', time: '10:00 AM', isBot: true }],
      tickets: [],
      'bot-commands': [],
      logs: [],
      staff: []
    },
    AS: {
      general: [{ author: 'System Owner', content: 'Apex Systems general lobby.', time: '11:00 AM' }],
      announcements: [],
      support: [],
      verification: [],
      tickets: [],
      'bot-commands': [],
      logs: [],
      staff: []
    },
    DM: {
      developer: [
        { author: 'Developer', content: 'Hey there! I am an Automation & Systems Developer. Explore my simulated ecosystem!', time: '10:30 AM' },
        { author: 'Developer', content: 'Open the "Bot Control Center" app alongside "Discord" to toggle verification or trigger tickets in real-time!', time: '10:31 AM' }
      ],
      'moderator-sarah': [
        { author: 'Moderator Sarah', content: 'Hey, did you finish configuring the ticket trigger for the Nova server?', time: 'Yesterday' }
      ],
      'client-alpha': [
        { author: 'Client Alpha', content: 'Your work on shard management interfaces looks very promising.', time: '10:45 AM' }
      ]
    }
  });

  const sendDiscordMessage = (serverId, channelId, author, content, isBot = false, embed = null) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDiscordMessages(prev => {
      const serverData = prev[serverId] || {};
      const channelData = serverData[channelId] || [];
      return {
        ...prev,
        [serverId]: {
          ...serverData,
          [channelId]: [...channelData, { author, content, time: timeStr, isBot, embed }]
        }
      };
    });
  };

  const updateBotModule = (serverId, moduleKey, value) => {
    setBotConfigs(prev => {
      const serverConfig = prev[serverId] || {};
      const nextConfig = { ...serverConfig, [moduleKey]: value };
      const botName = serverConfig.name;

      // Post changes to logs in simulated Discord!
      sendDiscordMessage(serverId, 'logs', botName, `[MODULE] Configuration update: '${moduleKey.toUpperCase()}' changed to ${value ? 'ENABLED' : 'DISABLED'}.`, true);
      
      if (moduleKey === 'verification') {
        sendDiscordMessage(serverId, 'verification', botName, `Verification module state updated to ${value ? 'ACTIVE' : 'INACTIVE'}.`, true);
      }

      return {
        ...prev,
        [serverId]: nextConfig
      };
    });
  };

  const triggerTicketCreation = (serverId) => {
    const ticketId = Math.floor(Math.random() * 9000) + 1000;
    const channelName = `ticket-${ticketId}`;
    const botName = botConfigs[serverId]?.name || 'System Bot';

    // Add channel to lists
    setServerChannels(prev => ({
      ...prev,
      [serverId]: [...prev[serverId], channelName]
    }));

    // Create message logs in the ticket channel
    setDiscordMessages(prev => {
      const serverData = prev[serverId] || {};
      return {
        ...prev,
        [serverId]: {
          ...serverData,
          [channelName]: [
            { author: botName, content: `🎟️ Ticket #${ticketId} opened. Support representatives will assist you shortly.`, time: 'Just Now', isBot: true },
            { author: 'System Owner', content: 'Need assistance regarding systems configuration metrics.', time: 'Just Now' }
          ]
        }
      };
    });

    // Log the event
    sendDiscordMessage(serverId, 'logs', botName, `[TICKET] Channel #${channelName} created. Status: OPEN.`, true);
  };

  const [pipelineState, setPipelineState] = useState('IDLE');
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [opsStats, setOpsStats] = useState({ cpu: 42, ram: 68, activeTasks: 18 });
  const [apiLogs, setApiLogs] = useState([
    { method: 'GET', path: '/v1/shards/status', status: 200, latency: '12ms', time: '17:56:02' },
    { method: 'POST', path: '/v1/transactions/escrow', status: 201, latency: '48ms', time: '17:56:04' },
    { method: 'GET', path: '/v1/inventories/card/owner_id', status: 200, latency: '22ms', time: '17:56:08' }
  ]);

  // Telemetry stream generator
  useEffect(() => {
    const timer = setInterval(() => {
      const paths = ['/v1/shards/status', '/v1/transactions/escrow', '/v1/inventories/card', '/v1/pipelines/run', '/v1/metrics'];
      const methods = ['GET', 'POST', 'PUT'];
      const statuses = [200, 201, 304, 429, 200];
      const randomPath = paths[Math.floor(Math.random() * paths.length)];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const latency = `${Math.floor(Math.random() * 80) + 10}ms`;
      const time = new Date().toTimeString().split(' ')[0];

      setApiLogs(prev => [
        { method: randomMethod, path: randomPath, status: randomStatus, latency, time },
        ...prev.slice(0, 5)
      ]);

      setOpsStats(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.floor(Math.random() * 11) - 5))),
        ram: Math.max(30, Math.min(90, prev.ram + (Math.floor(Math.random() * 5) - 2))),
        activeTasks: Math.max(5, prev.activeTasks + (Math.floor(Math.random() * 3) - 1))
      }));

      setShards(prev => prev.map(s => ({
        ...s,
        events: s.events + Math.floor(Math.random() * 8)
      })));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Update OS Clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const date = new Date();
      setTimeStr(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' }));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (termScrollRef.current) {
      termScrollRef.current.scrollTop = termScrollRef.current.scrollHeight;
    }
  }, [termLogs]);

  const launchApp = (appId) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
    setAppWindowStates(prev => ({
      ...prev,
      [appId]: { ...prev[appId], minimized: false }
    }));
    setActiveApp(appId);
    setStartMenuOpen(false);
    setSearchOpen(false);
  };

  const closeApp = (appId) => {
    setOpenApps(openApps.filter(id => id !== appId));
    if (activeApp === appId) {
      const remaining = openApps.filter(id => id !== appId);
      if (remaining.length > 0) {
        setActiveApp(remaining[remaining.length - 1]);
      }
    }
  };

  const startPipelineRun = () => {
    if (pipelineState === 'RUNNING') return;
    setPipelineState('RUNNING');
    setPipelineProgress(0);
    const interval = setInterval(() => {
      setPipelineProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPipelineState('COMPLETED');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const rawInput = termInput.trim();
    const args = rawInput.split(' ');
    const command = args[0].toLowerCase();
    const param = args.slice(1).join(' ');
    let response = [];

    // Save prompt presentation
    const promptPrefix = `${currentPath}> ${rawInput}`;

    switch (command) {
      case 'help':
        response = [
          'Windows Command Prompt catalog:',
          '  help                - Display help information',
          '  dir                 - List folder directories and files',
          '  cd [path]           - Change current directory (e.g. cd projects, cd ..)',
          '  type [file]         - Display content of a file (e.g. type system_spec.json)',
          '  cat [file]          - Alias for type',
          '  echo [text]         - Output text to console',
          '  ver                 - Print Windows version information',
          '  whoami              - Display current user context',
          '  ipconfig            - Display local network IP configurations',
          '  ping [host]         - Ping target host (e.g. ping discord.com)',
          '  systeminfo          - Output virtual machine server specifications',
          '  neofetch            - Show hardware stats logo',
          '  date / time         - Print system calendar metrics',
          '  clear / cls         - Flush terminal log history',
        ];
        break;
      case 'cls':
      case 'clear':
        setTermLogs([]);
        setTermInput('');
        return;
      case 'ver':
        response = ['Microsoft Windows [Version 10.0.22621]'];
        break;
      case 'whoami':
        response = ['desktop-systems-lab\\rashidur'];
        break;
      case 'date':
        response = [`The current date is: ${new Date().toLocaleDateString()}`];
        break;
      case 'time':
        response = [`The current time is: ${new Date().toLocaleTimeString()}`];
        break;
      case 'echo':
        response = [param || 'ECHO is on.'];
        break;
      case 'neofetch':
        response = [
          '   .,-;-;.     rashidur@windows11-lab',
          '  _o-       -o_  ----------------------',
          '  (           )  OS: Virtual Windows 11 Pro',
          '   `--...---\'   Uptime: 4 hours, 28 mins',
          '                 Theme: Amber Dark',
          '                 Core: Active Systems Integrator',
        ];
        break;
      case 'sysinfo':
      case 'systeminfo':
        response = [
          'OS Name:                   Microsoft Windows 11 Pro',
          'System Manufacturer:       Antigravity Systems Lab',
          'System Model:              Virtual Integration Environment',
          'Processor(s):              8 Processors (Scale-Out Architecture)',
          'Active Microservices:      Celery Queue / RabbitMQ Broker',
          `CPU Performance:           ${opsStats.cpu}% utilization`,
          `RAM Footprint:             ${opsStats.ram}% memory load`,
          `Active Pipelines:          ${opsStats.activeTasks} running workers`
        ];
        break;
      case 'ipconfig':
        response = [
          '',
          'Windows IP Configuration',
          '',
          'Ethernet adapter Ethernet0:',
          '',
          '   Connection-specific DNS Suffix  . : systems.lab',
          '   IPv4 Address. . . . . . . . . . . : 192.168.1.104',
          '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
          '   Default Gateway . . . . . . . . . : 192.168.1.1',
          ''
        ];
        break;
      case 'ping':
        if (!param) {
          response = ['Ping usage: ping [host] (e.g. ping google.com)'];
        } else {
          response = [
            `Pinging ${param} with 32 bytes of data:`,
            `Reply from 192.168.1.104: bytes=32 time=4ms TTL=128`,
            `Reply from 192.168.1.104: bytes=32 time=3ms TTL=128`,
            `Reply from 192.168.1.104: bytes=32 time=5ms TTL=128`,
            `Reply from 192.168.1.104: bytes=32 time=3ms TTL=128`,
            '',
            `Ping statistics for ${param}:`,
            `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`,
            `Approximate round trip times in milli-seconds:`,
            `    Minimum = 3ms, Maximum = 5ms, Average = 3ms`
          ];
        }
        break;
      case 'cd':
        if (!param) {
          response = [currentPath];
        } else if (param === '..') {
          if (currentPath === 'C:\\Users\\Rashidur') {
            response = ['Already at root.'];
          } else {
            setCurrentPath('C:\\Users\\Rashidur');
          }
        } else {
          const currentData = filesSystem[currentPath];
          if (currentData && currentData.dirs.includes(param.toLowerCase())) {
            setCurrentPath(`${currentPath}\\${param.toLowerCase()}`);
          } else {
            response = [`The system cannot find the path specified: '${param}'`];
          }
        }
        break;
      case 'dir':
        const currentFolder = filesSystem[currentPath];
        if (currentFolder) {
          const dirLines = currentFolder.dirs.map(d => `06/30/2026  05:56 PM    <DIR>          ${d}`);
          const fileLines = Object.keys(currentFolder.files).map(f => `06/30/2026  05:56 PM             ${currentFolder.files[f].length} ${f}`);
          response = [
            ` Directory of ${currentPath}`,
            '',
            ...dirLines,
            ...fileLines,
            `               ${fileLines.length} File(s)          ${fileLines.reduce((acc, f) => acc + currentFolder.files[f.split(' ').slice(-1)[0]].length, 0)} bytes`,
            `               ${dirLines.length} Dir(s)     42,109,240 bytes free`
          ];
        } else {
          response = ['Directory not found.'];
        }
        break;
      case 'cat':
      case 'type':
        if (!param) {
          response = ['Usage: type [filename] (e.g. type system_spec.json)'];
        } else {
          const currentFolderData = filesSystem[currentPath];
          if (currentFolderData && currentFolderData.files[param]) {
            response = currentFolderData.files[param].split('\n');
          } else {
            response = [`File not found: '${param}'`];
          }
        }
        break;
      case '':
        response = [''];
        break;
      default:
        response = [`'${args[0]}' is not recognized as an internal or external command, operable program or batch file. Type 'help' for info.`];
        break;
    }

    setTermLogs(prev => [...prev, promptPrefix, ...response, '']);
    setTermInput('');
  };

  const restartShard = (id) => {
    setShards(prev => prev.map(s => s.id === id ? { ...s, status: 'REBOOTING', ping: '--' } : s));
    sendDiscordMessage('SL', 'bot-logs', 'Gateway Bot', `[REBOOT_CMD] Shard 0${id} reboot sequence initiated...`, true);
    setTimeout(() => {
      setShards(prev => prev.map(s => s.id === id ? { ...s, status: 'ONLINE', ping: '20ms' } : s));
      sendDiscordMessage('SL', 'bot-logs', 'Gateway Bot', `[SUCCESS] Shard 0${id} reboot completed successfully. Latency: 20ms.`, true);
    }, 1500);
  };

  // Find active wallpaper image
  const wallpaperUrl = currentWallpaper === 'orange-bloom' ? '/windows_11_bloom.png' : '/windows_11_geo.png';

  return (
    <section id="playground" className="py-24 bg-obsidian relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              [ 04 // VIRTUAL WINDOWS 11 SIMULATION ]
            </span>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-bone mt-2">
              Interactive Lab
            </h2>
          </div>
          <p className="text-iron text-sm max-w-md font-mono">
            Experience our deployments running within a customized, interactive Windows 11 sandbox. Personalize settings, adjust system modes, and audit automation pipelines.
          </p>
        </div>

        {/* Windows 11 Computer Frame Screen */}
        <div className="w-full min-h-[640px] border-4 border-charcoal/90 bg-black rounded-xl overflow-hidden relative shadow-[0_25px_60px_rgba(0,0,0,0.75)] flex flex-col">
          {/* Main Desktop Screen Area */}
          <div
            ref={desktopRef}
            className="flex-1 relative overflow-hidden transition-all duration-500 flex flex-col p-4"
            style={{
              backgroundImage: currentWallpaper === 'matrix' ? 'none' : `url(${wallpaperUrl})`,
              backgroundColor: currentWallpaper === 'matrix' ? '#000000' : 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >

            {/* Desktop Shortcut Grid */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {APPS.map((app) => {
                const Icon = app.icon;
                const pos = appPositions[app.id] || { row: 0, col: 0 };
                const isDraggingThis = dragState?.appId === app.id;

                // While dragging: follow pointer; otherwise: sit in grid cell
                const left = isDraggingThis
                  ? dragState.x - CELL_W / 2
                  : pos.col * CELL_W;
                const top = isDraggingThis
                  ? dragState.y - CELL_H / 2
                  : pos.row * CELL_H;

                return (
                  <div
                    key={app.id}
                    onMouseDown={(e) => handleShortcutMouseDown(e, app.id)}
                    onClick={() => {
                      if (isDraggingShortcut.current) return;
                      launchApp(app.id);
                    }}
                    className="absolute flex flex-col items-center justify-center p-1 w-[80px] h-[76px] rounded hover:bg-white/5 group cursor-pointer pointer-events-auto select-none"
                    style={{
                      left: `${left}px`,
                      top: `${top}px`,
                      zIndex: isDraggingThis ? 100 : 10,
                      transition: isDraggingThis ? 'none' : 'left 0.15s ease, top 0.15s ease',
                    }}
                  >
                    <div className={`w-8 h-8 bg-black/40 border rounded flex items-center justify-center shadow-lg transition-all ${
                      isDraggingThis ? 'border-amber/60 scale-110 bg-black/60' : 'border-white/5 group-hover:border-amber/40'
                    }`}>
                      <Icon className="w-4 h-4 text-amber" />
                    </div>
                    <span className="text-[8px] text-bone font-mono mt-1 text-center font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,1)] uppercase tracking-wide truncate w-full px-1">
                      {app.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Application Windows */}
            <AnimatePresence>
              {openApps.map((appId) => {
                const appDetails = APPS.find(a => a.id === appId);
                if (!appDetails) return null;
                const isActive = activeApp === appId;
                const winState = appWindowStates[appId] || { minimized: false, maximized: false };

                return (
                  <AppWindow
                    key={appId}
                    appId={appId}
                    appDetails={appDetails}
                    winState={winState}
                    isActive={isActive}
                    osTheme={osTheme}
                    windowSizes={windowSizes}
                    setAppWindowStates={setAppWindowStates}
                    closeApp={closeApp}
                    setActiveApp={setActiveApp}
                    startResize={startResize}
                    desktopRef={desktopRef}
                  >
                    {/* WINDOWS SETTINGS APP */}
                    {appId === 'settings' && (
                      <div className="absolute inset-0 overflow-y-auto p-4 font-mono text-xs">
                        <div className="text-left flex flex-col gap-6">
                          <div>
                            <span className="text-[10px] text-amber uppercase block tracking-wider">// WINDOWS PERSONALIZATION</span>
                            <h3 className="text-lg font-bold mt-1">Desktop Settings</h3>
                          </div>

                          {/* Desktop Wallpaper Switcher */}
                          <div className="border border-white/5 p-4 rounded bg-obsidian/45">
                            <span className="text-[10px] text-iron block mb-3 uppercase font-semibold">Change Wallpaper Theme</span>
                            <div className="flex flex-col gap-2.5">
                              {WALLPAPERS.map((w) => (
                                <button
                                  key={w.id}
                                  onClick={() => setCurrentWallpaper(w.id)}
                                  className={`p-2.5 border text-left flex items-center justify-between ${
                                    currentWallpaper === w.id ? 'border-amber text-amber bg-amber/5' : 'border-white/10 hover:border-white/20'
                                  }`}
                                >
                                  <span>{w.name}</span>
                                  {currentWallpaper === w.id && <span className="text-xs">Active</span>}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Color Scheme Switcher */}
                          <div className="border border-white/5 p-4 rounded bg-obsidian/45">
                            <span className="text-[10px] text-iron block mb-3 uppercase font-semibold">Visual Interface Mode</span>
                            <div className="flex gap-4">
                              {['dark', 'light'].map((mode) => (
                                <button
                                  key={mode}
                                  onClick={() => setOsTheme(mode)}
                                  className={`flex-1 py-2 border uppercase text-center font-bold text-[10px] tracking-wider transition-colors ${
                                    osTheme === mode ? 'border-amber text-amber bg-amber/5' : 'border-white/10 hover:border-white/20'
                                  }`}
                                >
                                  {mode} Mode
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SYSTEM TERMINAL */}
                    {appId === 'terminal' && (
                      <div className="absolute inset-0 flex flex-col text-left text-bone p-4 font-mono text-xs">
                        <div ref={termScrollRef} className="flex-1 overflow-y-auto pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f4147 transparent' }}>
                          {termLogs.map((log, idx) => (
                            <div key={idx} className="whitespace-pre-wrap leading-relaxed min-h-[14px]">
                              {log}
                            </div>
                          ))}
                          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-1">
                            <span className="text-amber shrink-0">{currentPath}&gt;</span>
                            <input
                              type="text"
                              value={termInput}
                              onChange={(e) => setTermInput(e.target.value)}
                              className="flex-1 bg-transparent text-bone p-0 m-0 border-none outline-none focus:outline-none focus:ring-0"
                              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                              autoFocus
                            />
                          </form>
                        </div>
                      </div>
                    )}



                    {/* DISCORD SIMULATOR CLIENT */}
                    {appId === 'discord' && (
                      <DiscordApp
                        discordMessages={discordMessages}
                        sendDiscordMessage={sendDiscordMessage}
                        botConfigs={botConfigs}
                        activeServer={activeServer}
                        setActiveServer={setActiveServer}
                        activeChannel={activeChannel}
                        setActiveChannel={setActiveChannel}
                      />
                    )}

                    {/* WEB BROWSER APP */}
                    {appId === 'browser' && (
                      <BrowserApp />
                    )}

                    {/* CAMERA APP */}
                    {appId === 'camera' && (
                      <CameraApp />
                    )}

                    {/* SPOTIFY MUSIC PLAYER APP */}
                    {appId === 'spotify' && (
                      <SpotifyApp />
                    )}


                    {/* BOT CONTROL CENTER */}

                    {appId === 'botcontrol' && (
                      <div className="absolute inset-0 flex bg-obsidian text-bone font-sans overflow-hidden select-none">
                        
                        {/* Server list selector sidebar (left) */}
                        <div className="w-44 bg-charcoal/40 border-r border-white/5 flex flex-col p-3 gap-2 shrink-0 text-left overflow-y-auto scrollbar">
                          <span className="text-[9px] text-amber font-bold tracking-wider uppercase block mb-1">
                            // SELECT SERVER
                          </span>
                          {[
                            { id: 'NV', name: 'Nova Community' },
                            { id: 'AH', name: 'Automation Hub' },
                            { id: 'ZN', name: 'Zenith Network' },
                            { id: 'DF', name: 'Developer Forge' },
                            { id: 'OL', name: 'Operations Lab' },
                            { id: 'AS', name: 'Apex Systems' }
                          ].map((srv) => (
                            <button
                              key={srv.id}
                              onClick={() => {
                                setActiveServer(srv.id);
                                const channels = serverChannels[srv.id] || ['general'];
                                setActiveChannel(channels[0]);
                              }}
                              className={`px-3 py-2 rounded text-[10.5px] transition-all font-mono text-left block w-full border ${
                                activeServer === srv.id
                                  ? 'border-amber/40 bg-amber/5 text-amber'
                                  : 'border-white/5 hover:border-white/25 text-iron hover:text-bone'
                              }`}
                            >
                              📁 {srv.name}
                            </button>
                          ))}

                          {/* Simulation Transparent Badge */}
                          <div className="mt-auto border border-amber/20 p-2.5 bg-amber/5 rounded">
                            <span className="text-[8px] text-amber font-black tracking-widest block uppercase">
                              PORTFOLIO DEMO
                            </span>
                            <span className="text-[7.5px] text-iron block mt-0.5 leading-snug">
                              Interactive Simulation Environment. All servers & bot modules are simulated.
                            </span>
                          </div>
                        </div>

                        {/* Config Form Area (Right) */}
                        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-6 text-left scrollbar">
                          <div>
                            <span className="text-[10px] text-amber uppercase font-mono tracking-widest">// BOT CONTROL PANEL</span>
                            <h3 className="text-lg font-bold text-bone mt-1">
                              Configure {botConfigs[activeServer]?.name || 'System Bot'}
                            </h3>
                            <span className="text-[10px] text-iron mt-1 block">
                              Active Server Connection: {activeServer}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Modules Switch Panel */}
                            <div className="border border-white/5 bg-charcoal/20 p-4 rounded flex flex-col gap-3">
                              <span className="text-[9.5px] text-amber font-bold tracking-wider block uppercase mb-1">
                                Modules Settings
                              </span>
                              {[
                                { key: 'verification', name: 'Verification System' },
                                { key: 'tickets', name: 'Ticket System' },
                                { key: 'logging', name: 'Logging System' },
                                { key: 'welcome', name: 'Welcome Messages' },
                                { key: 'moderation', name: 'Moderation System' },
                                { key: 'autoroles', name: 'Auto Roles' },
                                { key: 'reactionroles', name: 'Reaction Roles' },
                                { key: 'automations', name: 'Workflow Automations' },
                              ].map((mod) => (
                                <div key={mod.key} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                  <span className="text-[10px] text-bone font-mono">{mod.name}</span>
                                  <button
                                    onClick={() => updateBotModule(activeServer, mod.key, !botConfigs[activeServer]?.[mod.key])}
                                    className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-colors ${
                                      botConfigs[activeServer]?.[mod.key]
                                        ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                                        : 'bg-white/5 border border-white/10 text-iron'
                                    }`}
                                  >
                                    {botConfigs[activeServer]?.[mod.key] ? 'Enabled' : 'Disabled'}
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Trigger actions panel */}
                            <div className="flex flex-col gap-4">
                              <div className="border border-white/5 bg-charcoal/20 p-4 rounded flex flex-col gap-3">
                                <span className="text-[9.5px] text-amber font-bold tracking-wider block uppercase">
                                  Trigger Automation Actions
                                </span>
                                <p className="text-[9.5px] text-iron leading-relaxed">
                                  Simulate real-time events. Triggering these will instantly generate actions inside the simulated Discord app.
                                </p>
                                
                                <button
                                  onClick={() => triggerTicketCreation(activeServer)}
                                  className="w-full text-center text-[10px] font-bold uppercase py-2 bg-amber text-obsidian rounded hover:bg-amber/90 transition-colors shadow-md shadow-amber/10 mt-1"
                                >
                                  Create Support Ticket
                                </button>

                                <button
                                  onClick={() => {
                                    const botName = botConfigs[activeServer]?.name || 'System Bot';
                                    sendDiscordMessage(activeServer, 'general', botName, `👋 Welcome Client_${Math.floor(Math.random()*900)+100} to the server!`, true);
                                    sendDiscordMessage(activeServer, 'logs', botName, `[JOIN] New simulated member joined. Welcome message dispatched.`, true);
                                  }}
                                  className="w-full text-center text-[10px] font-bold uppercase py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded"
                                >
                                  Simulate New Member Join
                                </button>
                              </div>

                              <div className="border border-white/5 bg-charcoal/20 p-4 rounded">
                                <span className="text-[9.5px] text-iron uppercase block font-bold">
                                  Lab Systems Status
                                </span>
                                <div className="mt-2.5 flex items-center justify-between font-mono text-[9px] text-iron">
                                  <span>Sync: ONLINE</span>
                                  <span>Response: 12ms</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    )}

                    {/* AUTOMATION STUDIO */}
                    {appId === 'automation' && (
                      <div className="text-left flex flex-col justify-between h-full min-h-[220px]">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-center flex-1">
                          <div className="border border-white/10 bg-obsidian p-4 w-36 text-center rounded">
                            <span className="text-amber uppercase text-[9px] block mb-1">TRIGGER</span>
                            <span className="font-semibold text-xs">Webhook Request</span>
                            <span className="text-[8px] text-iron block mt-1">/v1/event_in</span>
                          </div>
                          <div className="w-1 md:w-12 h-6 md:h-1 border-t-2 border-dashed border-white/10" />
                          <div className={`border p-4 w-40 text-center transition-all rounded ${
                            pipelineState === 'RUNNING' ? 'border-amber bg-amber/5 text-amber animate-pulse' : 'border-white/10 bg-obsidian'
                          }`}>
                            <span className="text-amber uppercase text-[9px] block mb-1">TASK CONTEXT</span>
                            <span className="font-semibold text-xs">Ledger Escrow Verify</span>
                            <span className="text-[8px] text-iron block mt-1">Status: {pipelineState}</span>
                          </div>
                          <div className="w-1 md:w-12 h-6 md:h-1 border-t-2 border-dashed border-white/10" />
                          <div className="border border-white/10 bg-obsidian p-4 w-36 text-center rounded">
                            <span className="text-amber uppercase text-[9px] block mb-1">DESTINATION</span>
                            <span className="font-semibold text-xs">Slack Dispatch</span>
                            <span className="text-[8px] text-iron block mt-1">Callback Log Success</span>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                          <div className="flex-1 max-w-sm mr-4">
                            <div className="h-1.5 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-amber transition-all duration-300" style={{ width: `${pipelineProgress}%` }} />
                            </div>
                            <span className="text-[8px] text-iron mt-1 block">PROGRESS: {pipelineProgress}%</span>
                          </div>
                          <button
                            onClick={startPipelineRun}
                            className="px-4 py-2 bg-amber text-obsidian uppercase font-bold text-[10px] tracking-wider hover:bg-amber/90 transition-colors"
                          >
                            Run Automation
                          </button>
                        </div>
                      </div>
                    )}

                    {/* OPERATIONS DASHBOARD */}
                    {appId === 'dashboard' && (
                      <div className="text-left flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border border-white/10 bg-obsidian p-4 rounded">
                            <span className="text-iron/60 text-[9px] uppercase tracking-wider block">ALLOCATED CPU</span>
                            <span className="text-2xl font-bold text-amber mt-1 block">{opsStats.cpu}%</span>
                            <div className="h-1.5 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
                              <div className="h-full bg-amber" style={{ width: `${opsStats.cpu}%` }} />
                            </div>
                          </div>

                          <div className="border border-white/10 bg-obsidian p-4 rounded">
                            <span className="text-iron/60 text-[9px] uppercase tracking-wider block">MEMORY USAGE</span>
                            <span className="text-2xl font-bold text-amber mt-1 block">{opsStats.ram}%</span>
                            <div className="h-1.5 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
                              <div className="h-full bg-amber" style={{ width: `${opsStats.ram}%` }} />
                            </div>
                          </div>

                          <div className="border border-white/10 bg-obsidian p-4 rounded">
                            <span className="text-iron/60 text-[9px] uppercase tracking-wider block">ACTIVE RUNNERS</span>
                            <span className="text-2xl font-bold text-amber mt-1 block">{opsStats.activeTasks}</span>
                            <span className="text-[8px] text-iron mt-1 block">Running Celery queues</span>
                          </div>
                        </div>

                        <div className="border border-white/10 bg-obsidian p-4 flex flex-col gap-2 rounded">
                          <span className="text-iron/60 text-[9px] uppercase tracking-wider">NETWORK CONCURRENCY TELEMETRY</span>
                          <div className="h-24 flex items-end gap-1 border-b border-l border-white/10 p-2">
                            {Array.from({ length: 24 }).map((_, i) => {
                              const heightPercent = Math.max(10, Math.min(95, 30 + (i * 2) + (Math.floor(Math.random() * 30) - 15)));
                              return (
                                <div
                                  key={i}
                                  className="flex-1 bg-amber/20 border-t border-amber hover:bg-amber/60 transition-colors"
                                  style={{ height: `${heightPercent}%` }}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* API MONITOR */}
                    {appId === 'api' && (
                      <div className="text-left flex flex-col gap-3">
                        <span className="text-[10px] text-iron/70 uppercase">// LIVE QUERY TRAFFIC STREAM (3000ms intervals)</span>
                        <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[220px] scrollbar">
                          {apiLogs.map((log, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 border border-white/5 bg-obsidian/50 font-mono text-[10px] rounded"
                            >
                              <div className="flex items-center gap-3">
                                <span className={`px-1.5 py-0.5 rounded font-bold ${
                                  log.method === 'POST' ? 'bg-amber/10 text-amber' : 'bg-blue-500/10 text-blue-400'
                                }`}>
                                  {log.method}
                                </span>
                                <span className="text-bone/90">{log.path}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-iron/50">{log.time}</span>
                                <span className="text-iron">{log.latency}</span>
                                <span className={`px-1.5 py-0.5 rounded font-semibold ${
                                  log.status === 200 || log.status === 201 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                  {log.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AppWindow>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Windows 11 Bottom Taskbar */}
          <div className="bg-obsidian/95 backdrop-blur-xl border-t border-white/10 px-4 h-12 flex items-center justify-between z-30 select-none shrink-0 relative">
            
            {/* Left Tray: Widget area (Weather indicator) */}
            <div className="flex-1 flex justify-start items-center">
              <div className="hidden sm:flex items-center gap-2 text-iron/60 text-[9px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                <span>SYS_OK // 72°F</span>
              </div>
            </div>

            {/* Centered Taskbar Clusters (Start, Search, Pinned Apps) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
              {/* Windows 11 Logo Start Button */}
              <button
                onClick={() => { setStartMenuOpen(!startMenuOpen); setSearchOpen(false); }}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors flex items-center justify-center ${startMenuOpen ? 'bg-white/15' : ''}`}
                aria-label="Start menu"
              >
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 text-amber">
                  <div className="bg-current rounded-[1px] w-1.5 h-1.5" />
                  <div className="bg-current rounded-[1px] w-1.5 h-1.5" />
                  <div className="bg-current rounded-[1px] w-1.5 h-1.5" />
                  <div className="bg-current rounded-[1px] w-1.5 h-1.5" />
                </div>
              </button>

              {/* Windows 11 Search Button */}
              <button
                onClick={() => { setSearchOpen(!searchOpen); setStartMenuOpen(false); }}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors flex items-center justify-center ${searchOpen ? 'bg-white/15' : ''}`}
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-bone/80" />
              </button>

              <span className="w-px h-4 bg-white/10 mx-1" />

              {/* Pinned & Open Apps */}
              {APPS.map((app) => {
                const Icon = app.icon;
                const isOpen = openApps.includes(app.id);
                const isActive = activeApp === app.id && isOpen;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      launchApp(app.id);
                      setStartMenuOpen(false);
                      setSearchOpen(false);
                    }}
                    className={`p-1.5 rounded hover:bg-white/15 transition-all flex flex-col items-center justify-center relative ${
                      isActive ? 'bg-white/10' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber" />
                    {isOpen && (
                      <span className="absolute bottom-0 w-1 h-0.5 bg-amber rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Tray Icons (Battery, Wi-Fi, Sound, Clock) */}
            <div className="flex-1 flex justify-end items-center gap-3 font-mono text-[10px] text-iron">
              <div className="flex items-center gap-2 opacity-80">
                <ChevronUp className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Volume2 className="w-3.5 h-3.5" />
                <Battery className="w-3.5 h-3.5" />
              </div>
              <span className="opacity-40">|</span>
              <div className="flex flex-col items-end text-right">
                <span className="text-bone">{timeStr}</span>
                <span className="text-[8px] opacity-70">{dateStr}</span>
              </div>
            </div>
          </div>

          {/* Windows 11 Start Menu Popup - Centered */}
          {startMenuOpen && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-80 bg-charcoal/95 backdrop-blur-2xl border border-white/10 rounded-lg p-5 shadow-2xl z-40 text-left font-mono">
              <div className="mb-4 pb-2 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-iron uppercase">Pinned Services</span>
                <span className="text-[8px] text-amber">All Apps &gt;</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {APPS.map(app => {
                  const Icon = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => launchApp(app.id)}
                      className="flex flex-col items-center justify-center p-3 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <Icon className="w-4 h-4 text-amber mb-1" />
                      <span className="text-[8px] text-bone text-center truncate w-full">{app.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Windows 11 Search Popup - Centered */}
          {searchOpen && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-80 bg-charcoal/95 backdrop-blur-2xl border border-white/10 rounded-lg p-4 shadow-2xl z-40 text-left font-mono">
              <div className="flex items-center gap-2 border border-white/10 bg-obsidian px-3 py-1.5 rounded mb-4">
                <Search className="w-3.5 h-3.5 text-iron" />
                <input
                  type="text"
                  placeholder="Search deployments..."
                  className="bg-transparent border-none outline-none text-xs text-bone focus:ring-0 w-full"
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[8px] text-iron uppercase tracking-wider block font-bold">Best Matches</span>
                {APPS.slice(0, 3).map(app => (
                  <button
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-white/5 text-left text-xs"
                  >
                    <app.icon className="w-4 h-4 text-amber" />
                    <div>
                      <div className="text-bone font-medium">{app.name}</div>
                      <div className="text-[8px] text-iron">{app.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// ─── Web Browser App Component ─────────────────────────────────────────
function BrowserApp() {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputUrl, setInputUrl] = useState('https://www.google.com/webhp?igu=1');
  const [history, setHistory] = useState(['https://www.google.com/webhp?igu=1']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const navigateTo = (target) => {
    let clean = target.trim();
    if (!clean) return;

    // If it doesn't look like a URL with a dot or protocol, treat it as a search query
    if (!clean.includes('.') && !clean.startsWith('http')) {
      clean = 'https://www.google.com/search?q=' + encodeURIComponent(clean) + '&igu=1';
    } else if (!/^https?:\/\//i.test(clean)) {
      clean = 'https://' + clean;
    }

    // Force google search to use iframe-friendly mode (igu=1)
    if (clean.includes('google.com') && !clean.includes('igu=1')) {
      clean += (clean.includes('?') ? '&' : '?') + 'igu=1';
    }

    const needsProxy = !/google\.com|wikipedia\.org|openstreetmap\.org/i.test(clean);
    let finalUrl = clean;
    if (needsProxy) {
      // Use CroxyProxy's main secure search proxy endpoint for direct unblocked framing
      finalUrl = 'https://www.croxy.xyz/templates/default/index.php?q=' + encodeURIComponent(clean);
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(finalUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setUrl(finalUrl);
    setInputUrl(clean);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      setHistoryIndex(idx);
      setUrl(history[idx]);
      
      // Extract original URL from proxy URL if present
      let displayUrl = history[idx];
      if (displayUrl.includes('?q=')) {
        const decoded = decodeURIComponent(displayUrl.split('?q=')[1]);
        displayUrl = decoded;
      }
      setInputUrl(displayUrl);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      setHistoryIndex(idx);
      setUrl(history[idx]);

      let displayUrl = history[idx];
      if (displayUrl.includes('?q=')) {
        const decoded = decodeURIComponent(displayUrl.split('?q=')[1]);
        displayUrl = decoded;
      }
      setInputUrl(displayUrl);
    }
  };

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  const handleHome = () => {
    navigateTo(`${window.location.origin}${window.location.pathname}#hero`);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-900 text-bone select-none font-sans overflow-hidden">
      {/* Navigation Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-slate-800 border-b border-slate-700 select-none">
        <button onClick={handleBack} disabled={historyIndex === 0}
          className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={handleForward} disabled={historyIndex === history.length - 1}
          className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={handleReload}
          className="p-1.5 rounded hover:bg-slate-700 transition-colors">
          <RotateCw className="w-4 h-4" />
        </button>
        <button onClick={handleHome}
          className="p-1.5 rounded hover:bg-slate-700 transition-colors">
          <Home className="w-4 h-4" />
        </button>
        
        {/* Address Bar */}
        <form onSubmit={(e) => { e.preventDefault(); navigateTo(inputUrl); }}
          className="flex-1 flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-700 rounded-md">
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs text-bone p-0 focus:ring-0"
          />
        </form>
      </div>

      {/* Workspace view */}
      <div className="flex-1 flex overflow-hidden relative bg-white">
        <iframe
          key={reloadKey}
          src={url}
          title="Browser Viewport"
          className="w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
        />
      </div>
    </div>
  );
}

// ─── Camera App Component ──────────────────────────────────────────────
function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [flash, setFlash] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [permError, setPermError] = useState(null);

  // Initialize Camera Stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => {
        console.warn('Webcam permission rejected:', err);
        setPermError('No camera found or webcam permissions blocked. Using interactive fallback screen.');
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Play virtual flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    if (stream && videoRef.current) {
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    } else {
      // Sandbox fallback image generation if camera permission is denied
      canvas.width = 640;
      canvas.height = 480;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 640, 480);
      
      // Draw grid details
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(320, 240, 60, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('[SIMULATED TELEMETRY FEED]', 320, 230);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(new Date().toLocaleString(), 320, 255);
    }

    const dataUrl = canvas.toDataURL('image/png');
    setPhotos(prev => [dataUrl, ...prev]);
  };

  const deletePhoto = (index, e) => {
    if (e) e.stopPropagation();
    setPhotos(prev => prev.filter((_, i) => i !== index));
    if (activePhoto === index) setActivePhoto(null);
  };

  const downloadPhoto = (dataUrl, e) => {
    if (e) e.stopPropagation();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `photo_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="absolute inset-0 flex bg-black text-bone font-sans select-none overflow-hidden">
      <div className="flex-1 flex flex-col relative min-w-0">
        
        {/* Shutter Shutter Flash Visual Overlay */}
        {flash && (
          <div className="absolute inset-0 bg-white z-50 transition-opacity duration-200" />
        )}

        {/* Video Canvas or Fallback Feed */}
        <div className="flex-1 bg-neutral-900 relative flex items-center justify-center overflow-hidden">
          {permError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm font-mono">
              <Camera className="w-8 h-8 text-amber mb-3 animate-bounce" />
              <p className="text-xs text-amber font-semibold uppercase tracking-wider">Telemetry Fallback Active</p>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                {permError} Capture button will generate simulated vector images.
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover scale-x-[-1]"
            />
          )}
          <canvas ref={canvasRef} className="hidden" />

          {/* Centered target grid */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center border border-white/5">
            <div className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Camera Control Shutter Panel Bar (Right sidebar layout styled like camera app) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 items-center z-20">
          <button
            onClick={takePhoto}
            className="w-14 h-14 rounded-full border-4 border-white bg-red-600 hover:bg-red-500 active:scale-95 shadow-xl transition-all flex items-center justify-center"
            title="Take Photo"
          >
            <div className="w-5 h-5 rounded-full bg-white opacity-40" />
          </button>
        </div>

        {/* Captured Gallery Drawer (Bottom row of captures) */}
        {photos.length > 0 && (
          <div className="h-20 bg-black/60 backdrop-blur border-t border-white/10 p-2 flex gap-3 overflow-x-auto scrollbar select-none shrink-0">
            {photos.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className="w-16 h-16 rounded border border-white/10 hover:border-amber/60 overflow-hidden relative cursor-pointer group shrink-0"
              >
                <img src={src} className="w-full h-full object-cover" alt="Capture thumbnail" />
                <button
                  onClick={(e) => deletePhoto(idx, e)}
                  className="absolute top-0.5 right-0.5 bg-black/75 p-1 rounded hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal for captures */}
      {activePhoto !== null && (
        <div
          className="absolute inset-0 bg-black/95 z-50 flex flex-col p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400">Preview: Photo {activePhoto + 1}</span>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => downloadPhoto(photos[activePhoto], e)}
                className="p-1.5 rounded hover:bg-white/10 text-bone flex items-center gap-1.5 text-xs font-bold uppercase"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={(e) => deletePhoto(activePhoto, e)}
                className="p-1.5 rounded hover:bg-red-600 text-bone flex items-center gap-1.5 text-xs font-bold uppercase"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded hover:bg-white/10 text-white font-mono font-bold text-xs"
              >
                ✕ CLOSE
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <img
              src={photos[activePhoto]}
              className="max-w-full max-h-full object-contain rounded shadow-2xl"
              alt="Full preview capture"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Spotify Music Player App Component ────────────────────────────────
function SpotifyApp() {
  const TRACKS = [
    { id: 1, title: 'Spectre (NCS Release)', artist: 'Alan Walker', album: 'NCS: Infinity', duration: '3:26', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=120&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Blank (NCS Release)', artist: 'Disfigure', album: 'NCS: Uplifting', duration: '3:29', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=120&auto=format&fit=crop&q=60' },
    { id: 3, title: 'Unity (NCS Release)', artist: 'TheFatRat', album: 'Unity EP', duration: '4:09', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=120&auto=format&fit=crop&q=60' },
    { id: 4, title: 'Sunburst (NCS Release)', artist: 'Tobu & Itro', album: 'Sunburst', duration: '3:10', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=60' }
  ];

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'search', 'library'

  const currentTrack = TRACKS[currentTrackIndex];

  // Sync volume state to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  // Sync source and play status when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Play failure:', err));
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const filteredTracks = TRACKS.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute inset-0 flex flex-col bg-[#121212] text-white font-sans overflow-hidden select-none">
      
      {/* Hidden audio engine element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <div className="w-56 bg-black p-4 flex flex-col gap-6 shrink-0 text-slate-300">
          <div className="flex items-center gap-2 text-white font-black text-lg px-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1DB954] fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.788-.97-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.743 3.82-.875 7.09-.5 9.712 1.102.296.18.387.563.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.69-1.652-6.79-2.13-9.97-1.165-.41.124-.843-.105-.967-.514-.124-.41.105-.844.514-.968 3.636-1.102 8.147-.568 11.237 1.328.366.226.487.707.26 1.073zm.105-2.836C14.492 8.86 8.7 8.667 5.35 9.68c-.514.156-1.05-.133-1.207-.648-.156-.514.133-1.05.648-1.207 3.856-1.17 10.24-.943 14.288 1.46.464.275.615.875.34 1.34-.276.463-.876.613-1.34.338z"/>
            </svg>
            <span>Spotify</span>
          </div>

          <div className="flex flex-col gap-3 font-bold text-sm">
            <button onClick={() => setActiveTab('home')}
              className={`flex items-center gap-4 py-2 px-3 rounded hover:text-white transition-colors ${activeTab === 'home' ? 'text-white bg-[#282828]' : ''}`}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"/></svg>
              Home
            </button>
            <button onClick={() => setActiveTab('search')}
              className={`flex items-center gap-4 py-2 px-3 rounded hover:text-white transition-colors ${activeTab === 'search' ? 'text-white bg-[#282828]' : ''}`}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10.533 1.277a8.94 8.94 0 0 1 8.913 8.718c.012 1.442-.321 2.834-.963 4.072l4.82 4.82a1 1 0 0 1-1.414 1.414l-4.82-4.82a8.94 8.94 0 0 1-6.536 2.054 8.94 8.94 0 0 1-7.85-7.79 8.94 8.94 0 0 1 7.85-8.468zm0 2a6.94 6.94 0 0 0-6.096 6.58 6.94 6.94 0 0 0 6.096 6.078 6.94 6.94 0 0 0 6.095-6.078 6.94 6.94 0 0 0-6.095-6.58z"/></svg>
              Search
            </button>
            <button onClick={() => setActiveTab('library')}
              className={`flex items-center gap-4 py-2 px-3 rounded hover:text-white transition-colors ${activeTab === 'library' ? 'text-white bg-[#282828]' : ''}`}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM12.556 2.89a1 1 0 0 0-1.28.53l-5 13a1 1 0 0 0 .53 1.28l4.7 1.8a1 1 0 0 0 1.28-.53l5-13a1 1 0 0 0-.53-1.28l-4.7-1.8zm-1.88 2.38l3.76 1.44-4.1 10.66-3.76-1.44 4.1-10.66zM22 3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3zm-2 16h-2V4h2v15z"/></svg>
              Your Library
            </button>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Curated playlists lists */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 text-xs text-slate-400 scrollbar">
            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase px-2">PLAYLISTS</span>
            <button className="text-left px-2 py-1 hover:text-white truncate">🔥 Coding Sessions</button>
            <button className="text-left px-2 py-1 hover:text-white truncate">☕ Lofi Beats 24/7</button>
            <button className="text-left px-2 py-1 hover:text-white truncate">🚀 Synthwave Space Ride</button>
            <button className="text-left px-2 py-1 hover:text-white truncate">🖤 Liked Songs</button>
          </div>
        </div>

        {/* Central Display Workspace Panel */}
        <div className="flex-1 bg-gradient-to-b from-emerald-950/20 via-[#121212] to-[#121212] p-6 flex flex-col overflow-y-auto scrollbar relative">
          
          {activeTab === 'home' && (
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-2xl font-black">Good Music Ecosystem</h2>
              
              {/* Quick Play Grid cards */}
              <div className="grid grid-cols-2 gap-4">
                {TRACKS.map((t, idx) => (
                  <div
                    key={t.id}
                    onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded cursor-pointer transition-colors overflow-hidden group relative"
                  >
                    <img src={t.cover} className="w-16 h-16 object-cover" alt="album cover" />
                    <span className="font-bold text-sm truncate pr-12">{t.title}</span>
                    <button className="absolute right-4 w-10 h-10 rounded-full bg-[#1DB954] text-black shadow-lg items-center justify-center flex opacity-0 group-hover:opacity-100 transition-opacity scale-90 hover:scale-100">
                      ▶
                    </button>
                  </div>
                ))}
              </div>

              {/* Dedicated Playlist Tracks Table */}
              <div className="mt-4">
                <h3 className="text-lg font-black mb-3">All Live Tracks</h3>
                <div className="flex flex-col border border-white/5 bg-[#181818]/60 rounded-lg overflow-hidden">
                  {TRACKS.map((t, idx) => (
                    <div
                      key={t.id}
                      onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                      className={`flex items-center justify-between p-3 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer ${
                        currentTrackIndex === idx ? 'bg-[#1DB954]/10 text-[#1DB954]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs text-slate-500 w-4">{idx + 1}</span>
                        <img src={t.cover} className="w-10 h-10 object-cover rounded" alt="cover" />
                        <div className="text-left min-w-0">
                          <p className="font-bold text-sm truncate text-white">{t.title}</p>
                          <p className="text-xs text-slate-400 truncate">{t.artist}</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 hidden md:block truncate max-w-[120px]">{t.album}</div>
                      <div className="text-xs text-slate-400 font-mono">{t.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="flex flex-col gap-5 text-left">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/5 max-w-sm">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Artists, songs or podcasts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-400 focus:ring-0 w-full"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Search Results</h3>
                <div className="flex flex-col border border-white/5 bg-[#181818] rounded-lg">
                  {filteredTracks.length > 0 ? (
                    filteredTracks.map((t) => {
                      const idx = TRACKS.findIndex(track => track.id === t.id);
                      return (
                        <div
                          key={t.id}
                          onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                          className={`flex items-center justify-between p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer ${
                            currentTrackIndex === idx ? 'bg-[#1DB954]/10 text-[#1DB954]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={t.cover} className="w-10 h-10 object-cover rounded" alt="cover" />
                            <div className="text-left">
                              <p className="font-bold text-sm text-white">{t.title}</p>
                              <p className="text-xs text-slate-400">{t.artist}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-slate-400">{t.duration}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="p-4 text-xs text-slate-500 text-center">No songs match your search query.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="text-left">
              <h2 className="text-xl font-black mb-4">Your Custom Library</h2>
              <div className="p-8 border border-dashed border-white/10 rounded-lg text-center text-slate-500">
                <span className="text-3xl block mb-2">📁</span>
                <p className="text-xs">Your custom playlist items, offline syncs, and podcast settings show up here.</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Spotify Bottom Playback Bar Controls */}
      <div className="h-20 bg-[#181818] border-t border-white/5 px-4 flex items-center justify-between z-10 shrink-0">
        
        {/* Track Details Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-[150px]">
          <img src={currentTrack.cover} className="w-12 h-12 object-cover rounded shadow" alt="current album cover" />
          <div className="text-left min-w-0">
            <p className="text-sm font-bold truncate text-white">{currentTrack.title}</p>
            <p className="text-xs text-slate-400 truncate hover:underline cursor-pointer">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Central Playback Controls */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-lg">
          <div className="flex items-center gap-5 text-slate-400">
            <button onClick={handlePrev} className="hover:text-white transition-colors" title="Previous">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17 19.22a1 1 0 0 1-1.6.8l-7.4-5.6a1 1 0 0 1 0-1.6l7.4-5.6a1 1 0 0 1 1.6.8v11.2zM7 5a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"/></svg>
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white text-black hover:scale-105 active:scale-95 flex items-center justify-center font-bold text-sm shadow transition-transform"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M7.05 3.606a1 1 0 0 1 1.516-.856l10.8 7.2a1 1 0 0 1 0 1.712l-10.8 7.2a1 1 0 0 1-1.516-.856V3.606z"/></svg>
              )}
            </button>
            <button onClick={handleNext} className="hover:text-white transition-colors" title="Next">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 19.22a1 1 0 0 0 1.6.8l7.4-5.6a1 1 0 0 0 0-1.6l-7.4-5.6A1 1 0 0 0 7 8v11.2zM17 5a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1z"/></svg>
            </button>
          </div>

          {/* Playback Timeline Progress Bar */}
          <div className="flex items-center gap-2.5 w-full text-[10px] text-slate-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1DB954] hover:accent-[#1DB954]"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Utility Controls (Right-aligned) */}
        <div className="flex items-center gap-3 w-1/4 min-w-[120px] justify-end text-slate-400">
          <button onClick={() => setMuted(prev => !prev)} className="hover:text-white transition-colors">
            {muted || volume === 0 ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.707 4.293a1 1 0 0 1 0 1.414L5.707 19.707a1 1 0 0 1-1.414-1.414L18.293 4.293a1 1 0 0 1 1.414 0zm-4.321 8.76l4.28 4.28a7.973 7.973 0 0 0 1.334-4.833 1 1 0 1 0-2 0 5.96 5.96 0 0 1-.954 3.14l-2.66-2.66v.073zm-4.086-4.086L7.29 4.957a1 1 0 0 0-.693-.293H3.003a1 1 0 0 0-1 1v12.67c0 .546.438.99 1 .99h3.594a1 1 0 0 0 .693-.293l4.01-4.01a1.002 1.002 0 0 0 .3-.707V9.673a1 1 0 0 0-.3-.706zm-2 10.146L6.003 16.42a1 1 0 0 0-.693-.293H4.003V6.664h1.307a1 1 0 0 0 .693-.293l1.3-1.3v13.013z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.3 4.664a1 1 0 0 0-1.3-.293l-4.01 4.01a1 1 0 0 0-.3.707v5.826a1 1 0 0 0 .3.707l4.01 4.01a1 1 0 0 0 1.3-.293 1 1 0 0 0 .7-1v-12.67a1 1 0 0 0-.7-.998zM9.3 17.587L6.603 14.89a1 1 0 0 0-.693-.293H4.003V9.387h1.907a1 1 0 0 0 .693-.293L9.3 6.4v11.187zm6.757-9.524a1 1 0 0 1 1.414 0 5.978 5.978 0 0 1 0 8.474 1 1 0 1 1-1.414-1.414 3.978 3.978 0 0 0 0-5.646 1 1 0 0 1 0-1.414zm2.829-2.829a1 1 0 0 1 1.414 0 9.978 9.978 0 0 1 0 14.128 1 1 0 1 1-1.414-1.414 7.978 7.978 0 0 0 0-11.299 1 1 0 0 1 0-1.415z"/></svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setMuted(false);
            }}
            className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
          />
        </div>

      </div>

    </div>
  );
}
