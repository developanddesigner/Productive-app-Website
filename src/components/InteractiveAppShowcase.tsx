import { useState, useEffect, type FormEvent } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Shield, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Zap, 
  Terminal, 
  Layers, 
  Flame, 
  BellOff, 
  Radio, 
  CheckSquare,
  Activity
} from 'lucide-react';
import { ambientSound } from '../utils/audio';
import { INITIAL_TASKS } from '../data/content';
import { TaskItem } from '../types';

export default function InteractiveAppShowcase() {
  // Navigation tabs within the mock app
  const [activeTab, setActiveTab] = useState<'timer' | 'tasks' | 'shield' | 'circadian'>('timer');

  // Timer State
  const [sessionDuration, setSessionDuration] = useState<number>(25 * 60); // in seconds
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedSprintType, setSelectedSprintType] = useState<'25' | '50' | '90'>('25');

  // Soundscape State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [soundType, setSoundType] = useState<'brown' | 'pink' | 'binaural'>('brown');

  // Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<'deep' | 'creative' | 'review'>('deep');

  // Shield State
  const [shieldSlack, setShieldSlack] = useState(true);
  const [shieldTabs, setShieldTabs] = useState(true);
  const [shieldMail, setShieldMail] = useState(true);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            ambientSound.playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Handle Audio toggle
  const toggleSound = (type?: 'brown' | 'pink' | 'binaural') => {
    const targetType = type || soundType;
    if (soundEnabled && targetType === soundType) {
      ambientSound.stop();
      setSoundEnabled(false);
    } else {
      setSoundType(targetType);
      ambientSound.play(targetType);
      setSoundEnabled(true);
    }
  };

  const handleSprintTypeChange = (type: '25' | '50' | '90') => {
    setSelectedSprintType(type);
    setIsRunning(false);
    const secs = parseInt(type, 10) * 60;
    setSessionDuration(secs);
    setTimeLeft(secs);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) ambientSound.playChime();
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      duration: selectedSprintType === '90' ? 90 : selectedSprintType === '50' ? 50 : 25,
      category: taskCategory,
      completed: false,
      priority: 'medium',
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((sessionDuration - timeLeft) / sessionDuration) * 100;

  return (
    <section 
      id="live-showcase" 
      className="py-12 md:py-20 relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 tracking-tight">
          Test the Cadence experience right here.
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-2">
          Click to start a live 76 BPM sprint, toggle ambient brown noise, or schedule focus blocks.
        </p>
      </div>

      {/* Main Interactive App Container */}
      <div 
        id="cadence-app-window"
        className="rounded-2xl bg-[#0B101E] border border-[#1E293B] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/5"
      >
        {/* Native OS Style Title Bar */}
        <div className="bg-[#080C17] border-b border-[#1E293B] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/70"></span>
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/70"></span>
            <span className="w-3 h-3 rounded-full bg-[#10B981]/70"></span>
            <span className="ml-3 text-xs font-mono-code text-[#64748B] hidden sm:inline-flex items-center gap-1.5">
              cadence-runtime: v2.4.0 <span className="text-[#237E55]">• local-vault online</span>
            </span>
          </div>

          {/* Interactive Top App Tabs */}
          <div className="flex items-center bg-[#0F172A] p-0.5 rounded-lg border border-[#1E293B] text-xs font-medium text-[#94A3B8]">
            <button
              onClick={() => setActiveTab('timer')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'timer' ? 'bg-[#1E293B] text-white shadow-xs' : 'hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#7A9BCC]" />
              <span>Flow Sprint</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'tasks' ? 'bg-[#1E293B] text-white shadow-xs' : 'hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#237E55]" />
              <span>Backlog ({tasks.filter(t => !t.completed).length})</span>
            </button>
            <button
              onClick={() => setActiveTab('shield')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'shield' ? 'bg-[#1E293B] text-white shadow-xs' : 'hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8AC79]" />
              <span>Context Shield</span>
            </button>
            <button
              onClick={() => setActiveTab('circadian')}
              className={`hidden sm:flex px-3 py-1 rounded-md transition-colors items-center gap-1.5 ${
                activeTab === 'circadian' ? 'bg-[#1E293B] text-white shadow-xs' : 'hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>76 BPM Waves</span>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-code text-[#7A9BCC] bg-[#7A9BCC]/10 px-2 py-0.5 rounded border border-[#7A9BCC]/20 hidden md:inline-block">
              {isRunning ? 'FLOW ENGAGED' : 'RESTING CADENCE'}
            </span>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="p-5 sm:p-8 min-h-[460px] flex flex-col justify-between">
          
          {/* VIEW 1: TIMER & SOUNDSCAPE */}
          {activeTab === 'timer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Countdown Ring */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                {/* Sprint Selector */}
                <div className="flex items-center gap-2 mb-6 bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                  <button
                    onClick={() => handleSprintTypeChange('25')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSprintType === '25' ? 'bg-[#7A9BCC] text-[#090D16] font-semibold shadow-xs' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    25m Pomodoro
                  </button>
                  <button
                    onClick={() => handleSprintTypeChange('50')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSprintType === '50' ? 'bg-[#7A9BCC] text-[#090D16] font-semibold shadow-xs' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    50m Deep Block
                  </button>
                  <button
                    onClick={() => handleSprintTypeChange('90')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSprintType === '90' ? 'bg-[#7A9BCC] text-[#090D16] font-semibold shadow-xs' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    90m Ultradian Wave
                  </button>
                </div>

                {/* Circular Visual Timer */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  {/* Subtle pulsing background glow during active run */}
                  <div className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${
                    isRunning ? 'bg-[#7A9BCC]/10 blur-xl animate-pulse' : 'opacity-0'
                  }`}></div>

                  <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      stroke="#1E293B"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      stroke="#7A9BCC"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 100}
                      strokeDashoffset={(2 * Math.PI * 100) * (1 - progressPercentage / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-500 ease-linear"
                    />
                  </svg>

                  <div className="absolute flex flex-col items-center text-center">
                    <span className="font-mono-code text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-xs font-mono-code text-[#7A9BCC] mt-2 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#10B981] animate-ping' : 'bg-[#475569]'}`}></span>
                      {isRunning ? 'BIORHYTHM LOCKED' : 'STANDBY'}
                    </span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                      isRunning 
                        ? 'bg-[#EF4444]/20 hover:bg-[#EF4444]/30 text-[#FCA5A5] border border-[#EF4444]/40' 
                        : 'bg-[#7A9BCC] hover:bg-[#8BAFE0] text-[#090D16] shadow-[#7A9BCC]/20'
                    }`}
                  >
                    {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isRunning ? 'Pause Session' : 'Start Focus Block'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setTimeLeft(sessionDuration);
                    }}
                    className="p-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Acoustic Synthesizer & Active Focus Goal */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                
                {/* Acoustic Soundscape Controller */}
                <div className="bg-[#090D16] border border-[#1E293B] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#7A9BCC]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                        Acoustic Synthesizer
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-code text-[#10B981]">
                      {soundEnabled ? 'ACTIVE AUDIO' : 'MUTED'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
                    Zero-latency ambient frequencies scientifically proven to soothe the prefrontal cortex and drown out office conversations.
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      onClick={() => toggleSound('brown')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                        soundEnabled && soundType === 'brown'
                          ? 'bg-[#7A9BCC]/20 border-[#7A9BCC] text-white shadow-xs'
                          : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5 text-[#C8AC79]" />
                      <span>Brown Noise</span>
                      <span className="text-[9px] text-[#64748B]">Deep Focus</span>
                    </button>

                    <button
                      onClick={() => toggleSound('pink')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                        soundEnabled && soundType === 'pink'
                          ? 'bg-[#7A9BCC]/20 border-[#7A9BCC] text-white shadow-xs'
                          : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5 text-[#7A9BCC]" />
                      <span>Pink Noise</span>
                      <span className="text-[9px] text-[#64748B]">Memory Wave</span>
                    </button>

                    <button
                      onClick={() => toggleSound('binaural')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                        soundEnabled && soundType === 'binaural'
                          ? 'bg-[#237E55]/30 border-[#10B981] text-white shadow-xs'
                          : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>76 BPM Pulse</span>
                      <span className="text-[9px] text-[#64748B]">Alpha Rhythm</span>
                    </button>
                  </div>

                  {/* Real-time acoustic frequency spectrum visualizer */}
                  <div className="mb-4 bg-[#060911] rounded-lg p-2.5 border border-[#1E293B]/70 flex items-center justify-between gap-1 h-12 overflow-hidden">
                    {[18, 45, 72, 35, 88, 60, 42, 95, 80, 50, 68, 85, 30, 75, 90, 40, 65, 82, 48, 70, 85, 55, 38, 62].map((height, i) => (
                      <div 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-300 ${
                          soundEnabled 
                            ? 'bg-gradient-to-t from-[#7A9BCC] to-[#237E55]' 
                            : isRunning 
                              ? 'bg-[#7A9BCC]/50' 
                              : 'bg-[#1E293B]'
                        }`}
                        style={{
                          height: soundEnabled 
                            ? `${Math.max(12, (height * ((i % 3) + 1)) % 100)}%`
                            : isRunning 
                              ? `${20 + (Math.sin(i * 0.5) * 15 + 15)}%` 
                              : '15%'
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => toggleSound()}
                    className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                      soundEnabled
                        ? 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#FCA5A5] hover:bg-[#EF4444]/20'
                        : 'bg-[#1E293B] border-[#334155] text-white hover:bg-[#334155]'
                    }`}
                  >
                    {soundEnabled ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{soundEnabled ? 'Stop Acoustic Audio' : 'Play Ambient Soundscape'}</span>
                  </button>
                </div>

                {/* Active Focus Target Card */}
                <div className="bg-[#090D16] border border-[#1E293B] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono-code text-[#7A9BCC]">ACTIVE FOCUS TARGET</span>
                    <span className="text-[10px] bg-[#237E55]/20 text-[#34D399] px-2 py-0.5 rounded font-medium">
                      PRIORITY 1
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {tasks.find(t => !t.completed)?.title || 'All focus targets resolved!'}
                  </h4>
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#94A3B8]">
                    <span>Single-tasking lock active</span>
                    <span>•</span>
                    <span className="text-[#C8AC79]">Estimated: 45 min</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 2: INTERACTIVE TASK BACKLOG */}
          {activeTab === 'tasks' && (
            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Rhythmic Sprint Backlog</h3>
                  <p className="text-xs text-[#94A3B8]">Organized by cognitive depth instead of arbitrary urgency.</p>
                </div>
                <span className="text-xs font-mono-code text-[#7A9BCC] bg-[#7A9BCC]/10 px-2.5 py-1 rounded border border-[#7A9BCC]/20">
                  {tasks.filter(t => t.completed).length} / {tasks.length} Completed
                </span>
              </div>

              {/* Add Task Form */}
              <form onSubmit={addTask} className="flex gap-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Capture next high-leverage focus task..."
                  className="flex-1 bg-[#090D16] border border-[#1E293B] focus:border-[#7A9BCC] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#475569] focus:outline-none"
                />
                <select
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value as 'deep' | 'creative' | 'review')}
                  className="bg-[#090D16] border border-[#1E293B] text-xs text-[#CBD5E1] rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  <option value="deep">#Deep Work</option>
                  <option value="creative">#Creative</option>
                  <option value="review">#Review</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#7A9BCC] hover:bg-[#8BAFE0] text-[#090D16] font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>

              {/* Task Items List */}
              <div className="space-y-2 pt-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      task.completed
                        ? 'bg-[#090D16]/50 border-[#1E293B]/50 opacity-60'
                        : 'bg-[#090D16] border-[#1E293B] hover:border-[#7A9BCC]/50 hover:bg-[#0E1526]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-[#94A3B8] group-hover:text-[#7A9BCC] transition-colors">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <span className={`text-sm ${task.completed ? 'line-through text-[#64748B]' : 'text-[#E2E8F0] font-medium'}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded uppercase ${
                        task.category === 'deep' 
                          ? 'bg-[#237E55]/20 text-[#34D399] border border-[#237E55]/30' 
                          : task.category === 'creative'
                          ? 'bg-[#C8AC79]/20 text-[#F5DFB3] border border-[#C8AC79]/30'
                          : 'bg-[#7A9BCC]/20 text-[#93C5FD] border border-[#7A9BCC]/30'
                      }`}>
                        #{task.category}
                      </span>
                      <span className="text-xs font-mono-code text-[#64748B]">
                        {task.duration}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: CONTEXT SHIELD */}
          {activeTab === 'shield' && (
            <div className="max-w-2xl mx-auto w-full space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C8AC79]" />
                    Context Shield Daemon
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Silences synchronous workplace noise so you can protect neural focus.
                  </p>
                </div>
                <span className="text-xs font-mono-code text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                  SHIELD ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => setShieldSlack(!shieldSlack)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    shieldSlack 
                      ? 'bg-[#090D16] border-[#7A9BCC]/40 shadow-sm' 
                      : 'bg-[#090D16]/40 border-[#1E293B] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Slack & Teams</span>
                    <input type="checkbox" checked={shieldSlack} onChange={() => {}} className="accent-[#7A9BCC]" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Sets status to "In Flow Sprint" & defers incoming Direct Messages.
                  </p>
                </div>

                <div 
                  onClick={() => setShieldTabs(!shieldTabs)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    shieldTabs 
                      ? 'bg-[#090D16] border-[#237E55]/60 shadow-sm' 
                      : 'bg-[#090D16]/40 border-[#1E293B] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Browser Isolation</span>
                    <input type="checkbox" checked={shieldTabs} onChange={() => {}} className="accent-[#237E55]" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Parks non-essential research tabs into an auto-stashed drawer.
                  </p>
                </div>

                <div 
                  onClick={() => setShieldMail(!shieldMail)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    shieldMail 
                      ? 'bg-[#090D16] border-[#C8AC79]/50 shadow-sm' 
                      : 'bg-[#090D16]/40 border-[#1E293B] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Inbox Batching</span>
                    <input type="checkbox" checked={shieldMail} onChange={() => {}} className="accent-[#C8AC79]" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Holds email delivery until the next designated 15m review interval.
                  </p>
                </div>
              </div>

              {/* Shield Log Stream */}
              <div className="bg-[#080C17] rounded-xl p-4 border border-[#1E293B] font-mono-code text-xs">
                <div className="text-[#64748B] mb-2 flex items-center justify-between">
                  <span>LIVE SHIELD INTERCEPT LOG</span>
                  <span className="text-[#10B981]">14 PENDING HELD</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-[#94A3B8]">
                    <span className="text-[#7A9BCC]">[10:14 AM] #general Slack mention</span>
                    <span className="text-[#64748B]">Blocked & Queued</span>
                  </div>
                  <div className="flex items-center justify-between text-[#94A3B8]">
                    <span className="text-[#7A9BCC]">[10:28 AM] Marketing weekly thread</span>
                    <span className="text-[#64748B]">Silenced</span>
                  </div>
                  <div className="flex items-center justify-between text-[#94A3B8]">
                    <span className="text-[#237E55]">[10:41 AM] Calendar invitation (low priority)</span>
                    <span className="text-[#64748B]">Scheduled for batch</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: CIRCADIAN / 76 BPM BIOMETRIC WAVES */}
          {activeTab === 'circadian' && (
            <div className="max-w-3xl mx-auto w-full space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Daily Neuro-Energy Rhythm</h3>
                  <p className="text-xs text-[#94A3B8]">Align deep complex tasks with your physiological cognitive peak.</p>
                </div>
                <span className="text-xs font-mono-code text-[#C8AC79] bg-[#C8AC79]/10 px-2.5 py-1 rounded border border-[#C8AC79]/20">
                  Optimal Flow: 09:30 - 11:45 AM
                </span>
              </div>

              {/* Circadian Wave Visualizer */}
              <div className="bg-[#090D16] border border-[#1E293B] rounded-xl p-5">
                <div className="flex items-end justify-between h-40 gap-2 pt-6 pb-2 border-b border-[#1E293B]">
                  {[
                    { time: '8 AM', height: '40%', state: 'Warming up', peak: false },
                    { time: '9 AM', height: '78%', state: 'Entering Flow', peak: false },
                    { time: '10 AM', height: '98%', state: 'Optimal Deep Work', peak: true },
                    { time: '11 AM', height: '90%', state: 'High Velocity', peak: true },
                    { time: '12 PM', height: '45%', state: 'Ultradian Valley / Lunch', peak: false },
                    { time: '1 PM', height: '35%', state: 'Rest & Recharge', peak: false },
                    { time: '2 PM', height: '65%', state: 'Admin & Sync', peak: false },
                    { time: '3 PM', height: '82%', state: 'Creative Wave', peak: false },
                    { time: '4 PM', height: '75%', state: 'Deep Polish', peak: false },
                    { time: '5 PM', height: '40%', state: 'Shutdown Routine', peak: false },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] border border-[#334155] text-[10px] px-2 py-1 rounded text-white whitespace-nowrap pointer-events-none z-10">
                        {bar.state}
                      </div>

                      <div 
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          bar.peak 
                            ? 'bg-gradient-to-t from-[#237E55] to-[#7A9BCC] group-hover:brightness-125' 
                            : 'bg-[#1E293B] group-hover:bg-[#334155]'
                        }`}
                        style={{ height: bar.height }}
                      ></div>
                      <span className="text-[10px] font-mono-code text-[#64748B]">{bar.time}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-gradient-to-r from-[#237E55] to-[#7A9BCC]"></span>
                    <span>Peak Cognitive Bandwidth (Scheduled: 2 Deep Sprints)</span>
                  </div>
                  <span className="font-mono-code text-[#7A9BCC]">Rhythm Sync 94%</span>
                </div>
              </div>
            </div>
          )}

          {/* Persistent Footer status bar inside app window */}
          <div className="pt-6 mt-6 border-t border-[#1E293B]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#94A3B8]">
                <Sparkles className="w-3.5 h-3.5 text-[#7A9BCC]" /> Zero Telemetry • Local SQLite Vault
              </span>
              <span className="hidden sm:inline text-[#334155]">|</span>
              <span className="hidden sm:inline">Ultradian cycle: 3 of 4 completed today</span>
            </div>
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#7A9BCC]">
              <span>Press <kbd className="bg-[#1E293B] text-white px-1.5 py-0.5 rounded border border-[#334155]">Space</kbd> to pause</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
