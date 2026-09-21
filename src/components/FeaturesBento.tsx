import { 
  Terminal, 
  ShieldCheck, 
  Database, 
  Volume2, 
  Clock, 
  Sparkles, 
  Command, 
  FolderLock, 
  Zap, 
  Share2, 
  Cpu 
} from 'lucide-react';
import ThreeDCard from './ThreeDCard';

interface FeaturesBentoProps {
  onOpenCommandPalette: () => void;
}

export default function FeaturesBento({ onOpenCommandPalette }: FeaturesBentoProps) {
  return (
    <section 
      id="features" 
      className="py-20 md:py-28 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#7A9BCC]/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Engineered for cognitive calm.
        </h2>
        <p className="text-base text-[#94A3B8] mt-3">
          Every control, keybinding, and acoustic texture is tuned to reduce cognitive friction to zero.
        </p>
      </div>

      {/* Bento Grid with 3D Depth */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        
        {/* Large Feature 1: Command Palette & Keyboard First */}
        <div className="md:col-span-2 lg:col-span-2">
          <ThreeDCard intensity={8} glowColor="rgba(122, 155, 204, 0.25)" className="h-full">
            <div className="h-full rounded-2xl bg-[#0B111F] border border-[#1E293B] p-7 hover:border-[#7A9BCC]/50 transition-all group flex flex-col justify-between relative overflow-hidden shadow-xl">
              
              {/* Subtle background texture */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none mix-blend-screen">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
                  alt="Keyboard texture" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A9BCC]/15 border border-[#7A9BCC]/30 flex items-center justify-center shadow-inner">
                    <Command className="w-5 h-5 text-[#7A9BCC]" />
                  </div>
                  <span className="text-[10px] font-mono-code text-[#7A9BCC] bg-[#7A9BCC]/10 border border-[#7A9BCC]/30 px-2.5 py-0.5 rounded-full">
                    KEYBOARD-NATIVE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Zero-Latency Command Bar</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  Never touch your mouse during deep work. Trigger focus sprints, stash tabs, parse natural dates, and tag objectives at lightning speed.
                </p>
              </div>

              {/* Interactive Mini Terminal Preview */}
              <div 
                onClick={onOpenCommandPalette}
                className="bg-[#070B14]/90 backdrop-blur-md rounded-xl border border-[#1E293B] p-3.5 font-mono-code text-xs text-[#94A3B8] flex items-center justify-between cursor-pointer hover:border-[#7A9BCC]/60 transition-colors shadow-lg relative z-10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#7A9BCC] font-bold">❯</span>
                  <span className="text-white">/focus 50 #deep --shield-slack</span>
                  <span className="w-1.5 h-3.5 bg-[#7A9BCC] animate-pulse"></span>
                </div>
                <span className="text-[10px] bg-[#1E293B] px-2 py-0.5 rounded text-[#CBD5E1] border border-[#334155]">Try ⌘K</span>
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* Feature 2: Offline-First Local Vault */}
        <div className="md:col-span-1 lg:col-span-2">
          <ThreeDCard intensity={8} glowColor="rgba(35, 126, 85, 0.25)" className="h-full">
            <div className="h-full rounded-2xl bg-[#0B111F] border border-[#1E293B] p-7 hover:border-[#237E55]/60 transition-all group flex flex-col justify-between relative overflow-hidden shadow-xl">
              
              {/* Silicon cryptographic image texture */}
              <div className="absolute top-0 right-0 w-2/5 h-full opacity-15 pointer-events-none mix-blend-screen">
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80" 
                  alt="3D Cryptographic Die" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#237E55]/20 border border-[#237E55]/40 flex items-center justify-center shadow-inner">
                    <Database className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <span className="text-[10px] font-mono-code text-[#10B981] bg-[#237E55]/20 border border-[#237E55]/40 px-2.5 py-0.5 rounded-full">
                    ENCRYPTED SQLITE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Local-First Vault Architecture</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Your tasks and thoughts never touch a remote server uninvited. Instant 2ms file reads, infinite offline reliability on planes and cabins, zero spin-up delays.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#1E293B]/60 text-xs text-[#64748B] relative z-10">
                <span className="text-[#10B981] font-mono-code">✓ CRDT Conflict-Free</span>
                <span>•</span>
                <span>End-to-End Encrypted</span>
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* Feature 3: Context Shield */}
        <div className="md:col-span-1 lg:col-span-1">
          <ThreeDCard intensity={10} glowColor="rgba(200, 172, 121, 0.2)" className="h-full">
            <div className="h-full rounded-2xl bg-[#0B111F] border border-[#1E293B] p-6 hover:border-[#C8AC79]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#C8AC79]/15 border border-[#C8AC79]/30 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#C8AC79]" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Context Shield</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Silences Slack, hides distracting tabs, and parks browser windows during sprints.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1E293B]/60 text-[11px] font-mono-code text-[#C8AC79]">
                +3.4h saved/week
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* Feature 4: Acoustic Soundscapes */}
        <div className="md:col-span-1 lg:col-span-1">
          <ThreeDCard intensity={10} glowColor="rgba(122, 155, 204, 0.2)" className="h-full">
            <div className="h-full rounded-2xl bg-[#0B111F] border border-[#1E293B] p-6 hover:border-[#7A9BCC]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#7A9BCC]/15 border border-[#7A9BCC]/30 flex items-center justify-center mb-4">
                  <Volume2 className="w-4 h-4 text-[#7A9BCC]" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Sound Synthesizer</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Built-in brownian rumble, pink noise, and 76 BPM alpha wave pulse generated locally.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1E293B]/60 text-[11px] font-mono-code text-[#7A9BCC]">
                Zero audio streaming lag
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* Feature 5: Ultradian Cycles */}
        <div className="md:col-span-1 lg:col-span-1">
          <ThreeDCard intensity={10} glowColor="rgba(35, 126, 85, 0.2)" className="h-full">
            <div className="h-full rounded-2xl bg-[#0B111F] border border-[#1E293B] p-6 hover:border-[#237E55]/60 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#237E55]/20 border border-[#237E55]/40 flex items-center justify-center mb-4">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Circadian Tuning</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Detects your natural morning and afternoon focus peaks, preventing midday burnout.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1E293B]/60 text-[11px] font-mono-code text-[#10B981]">
                BRAC biological pacing
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* Feature 6: Markdown Review & Journal */}
        <div className="md:col-span-1 lg:col-span-1">
          <ThreeDCard intensity={10} glowColor="rgba(122, 155, 204, 0.2)" className="h-full">
            <div className="h-full rounded-2xl bg-[#0B111F] border border-[#1E293B] p-6 hover:border-[#7A9BCC]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#7A9BCC]/15 border border-[#7A9BCC]/30 flex items-center justify-center mb-4">
                  <FolderLock className="w-4 h-4 text-[#7A9BCC]" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Daily Log Export</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Exports pristine Markdown summaries of completed focus blocks directly to Obsidian or Notion.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1E293B]/60 text-[11px] font-mono-code text-[#CBD5E1]">
                .md & JSON native
              </div>
            </div>
          </ThreeDCard>
        </div>

      </div>
    </section>
  );
}
