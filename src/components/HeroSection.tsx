import { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Apple, 
  Monitor, 
  Globe, 
  Volume2, 
  Flame,
  Layers,
  Compass,
  Shield,
  BellOff,
  Bell,
  Activity,
  Radio
} from 'lucide-react';
import FlowShaderCanvas from './FlowShaderCanvas';
import FocusOrbVisualizer, { type FrequencyMode, BIO_MODES } from './FocusOrbVisualizer';
import ThreeDCard from './ThreeDCard';

interface HeroSectionProps {
  onOpenDownloadModal: () => void;
  onExploreDemo: () => void;
}

export default function HeroSection({ onOpenDownloadModal, onExploreDemo }: HeroSectionProps) {
  const [copiedShortcut, setCopiedShortcut] = useState(false);
  const [contextShieldActive, setContextShieldActive] = useState(true);
  const [activeBioMode, setActiveBioMode] = useState<FrequencyMode>('alpha');
  const [interceptActive, setInterceptActive] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('brew install --cask cadence');
    setCopiedShortcut(true);
    setTimeout(() => setCopiedShortcut(false), 2000);
  };

  const handleTriggerIntercept = () => {
    setInterceptActive(true);
    setTimeout(() => setInterceptActive(false), 2600);
  };

  return (
    <section 
      id="hero-introduction"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Interactive WebGL Liquid Flow Shader Canvas with smooth edges & slow movement */}
      <FlowShaderCanvas className="opacity-65 mix-blend-screen" speedMultiplier={0.4} />

      {/* Atmospheric Geometric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-[#7A9BCC]/12 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-[#237E55]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[360px] h-[360px] bg-[#C8AC79]/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Primary Headline with High-Impact Typography Contrast */}
        <h1 
          id="hero-title"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl mx-auto mb-6"
        >
          Work in rhythm. <br />
          <span className="bg-gradient-to-r from-[#F8FAFC] via-[#7A9BCC] to-[#C8AC79] bg-clip-text text-transparent">
            Build with momentum.
          </span>
        </h1>

        {/* Sub-headline addressing cognitive overload */}
        <p 
          id="hero-description"
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto font-normal leading-relaxed mb-10"
        >
          The quiet productivity system designed for thinkers and builders. Synchronize your tasks to biological focus waves, silence cognitive interruptions, and drop into deep flow effortlessly.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 max-w-md mx-auto">
          <button
            id="hero-primary-download-btn"
            onClick={onOpenDownloadModal}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7A9BCC] to-[#5C7FA9] hover:from-[#8BAFE0] hover:to-[#6C90BA] text-[#090D16] font-semibold text-sm tracking-wide shadow-xl shadow-[#7A9BCC]/25 hover:shadow-[#7A9BCC]/40 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Start Free 14-Day Trial</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#090D16]" />
          </button>

          <button
            id="hero-interactive-demo-btn"
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F172A]/90 hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#7A9BCC]/50 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
          >
            <Play className="w-3.5 h-3.5 text-[#237E55] fill-[#237E55] group-hover:scale-110 transition-transform" />
            <span>Try Interactive Engine</span>
          </button>
        </div>

        {/* Terminal / Brew Quick install bar with 3D Tilt */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono-code text-[#64748B] mb-12">
          <ThreeDCard intensity={6} glareOpacity={0.1}>
            <div 
              onClick={handleCopyCmd}
              className="inline-flex items-center gap-2.5 bg-[#0A101D]/90 border border-[#1E293B] hover:border-[#7A9BCC]/50 px-4 py-2 rounded-xl cursor-pointer transition-colors group backdrop-blur-md shadow-lg"
              title="Click to copy Homebrew install command"
            >
              <span className="text-[#7A9BCC]">$</span>
              <span className="text-[#94A3B8] group-hover:text-white transition-colors">brew install --cask cadence</span>
              <span className="text-[10px] text-[#CBD5E1] bg-[#1E293B] px-2 py-0.5 rounded-md font-mono-code">
                {copiedShortcut ? 'Copied!' : 'Copy'}
              </span>
            </div>
          </ThreeDCard>
        </div>

        {/* Platform availability pills */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#64748B] pt-4 border-t border-[#1E293B]/60 max-w-xl mx-auto mb-16">
          <span className="flex items-center gap-1.5 hover:text-[#94A3B8] transition-colors">
            <Apple className="w-3.5 h-3.5 text-[#CBD5E1]" /> macOS Universal
          </span>
          <span className="w-1 h-1 rounded-full bg-[#334155]" />
          <span className="flex items-center gap-1.5 hover:text-[#94A3B8] transition-colors">
            <Monitor className="w-3.5 h-3.5 text-[#CBD5E1]" /> Windows 11
          </span>
          <span className="w-1 h-1 rounded-full bg-[#334155]" />
          <span className="flex items-center gap-1.5 hover:text-[#94A3B8] transition-colors">
            <Globe className="w-3.5 h-3.5 text-[#CBD5E1]" /> Web & Linux
          </span>
          <span className="w-1 h-1 rounded-full bg-[#334155]" />
          <span className="flex items-center gap-1 text-[#10B981] font-medium">
            <CheckCircle2 className="w-3 h-3" /> No Credit Card Required
          </span>
        </div>

        {/* 3D Interactive Centerpiece & Spatial Architecture Stage */}
        <div className="max-w-5xl mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Interactive 3D Focus Orb */}
            <div className="lg:col-span-7">
              <FocusOrbVisualizer onModeChange={setActiveBioMode} />
            </div>

            {/* Right: Tactile 3D Cockpit & Architectural Overview */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <ThreeDCard intensity={4} glowColor="rgba(255, 255, 255, 0.08)" className="h-full">
                <div className="h-full rounded-[28px] sm:rounded-[32px] bg-neutral-900/50 border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-2xl backdrop-blur-2xl">
                  
                  {/* Subtle ambient lighting */}
                  <div 
                    className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[90px] pointer-events-none transition-colors duration-700 opacity-20"
                    style={{ backgroundColor: BIO_MODES[activeBioMode].color }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white shadow-sm">
                        <Flame className="w-5 h-5 text-neutral-200" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: BIO_MODES[activeBioMode].color }}
                        />
                        <span className="text-xs text-neutral-300 font-medium px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.06]">
                          {BIO_MODES[activeBioMode].name}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-medium tracking-tight text-white mb-2">
                      Zero Context Friction
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-normal">
                      Cadence dynamically measures cognitive rhythm. When attention drifts, subtle acoustic harmonic damping gently returns your focus to flow.
                    </p>

                    {/* Apple-style Settings / Telemetry List */}
                    <div className="space-y-3.5 text-xs text-neutral-300 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.06]">
                      {/* Context Shield iOS Toggle Switch */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-neutral-200">Context Shield</div>
                          <div className="text-[11px] text-neutral-500">
                            {contextShieldActive ? '3 distracting apps silenced' : 'Notifications passthrough'}
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={contextShieldActive}
                          onClick={() => setContextShieldActive(!contextShieldActive)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            contextShieldActive ? 'bg-[#34D399]' : 'bg-neutral-700'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              contextShieldActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Minimal Apple Fitness-style Progress */}
                      <div className="pt-2 border-t border-white/[0.04] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-neutral-400">Ultradian Wave</span>
                          <span className="text-neutral-200 font-medium">44m of 90m remaining</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: '49%', 
                              backgroundColor: BIO_MODES[activeBioMode].color 
                            }}
                          />
                        </div>
                      </div>

                      {/* Local Privacy telemetry */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px]">
                        <span className="text-neutral-400">Telemetry Storage</span>
                        <span className="text-neutral-300 font-medium">100% On-Device</span>
                      </div>
                    </div>

                    {/* Apple-style Action Pill */}
                    <div className="mt-4">
                      {!interceptActive ? (
                        <button
                          onClick={handleTriggerIntercept}
                          className="w-full py-2 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-2"
                        >
                          <BellOff className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Simulate Distraction Intercept</span>
                        </button>
                      ) : (
                        <div className="w-full py-2 px-4 rounded-full bg-white/[0.08] border border-[#34D399]/40 text-[#34D399] text-xs font-medium flex items-center justify-center gap-2 transition-all">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Distraction deflected • Flow preserved</span>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs relative z-10">
                    <span className="text-neutral-500">Interactive Preview</span>
                    <button
                      onClick={onExploreDemo}
                      className="text-neutral-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors group"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                </div>
              </ThreeDCard>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
