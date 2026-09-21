import { Activity, ShieldAlert, Cpu, HeartPulse, Brain, Waves, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function PhilosophySection() {
  const principles = [
    {
      icon: Waves,
      accent: '#7A9BCC',
      tag: 'BIOLOGICAL SYNCHRONIZATION',
      title: 'Ultradian Wave Dynamics',
      description: 'Your brain operates on 90-minute neurochemical cycles known as Basic Rest-Activity Cycles (BRAC). Forcing continuous 8-hour flat productivity causes cognitive exhaustion. Cadence structures your day in harmonic waves of acute focus and regenerative resets.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      imageAlt: '3D ultradian wave oscillations',
    },
    {
      icon: HeartPulse,
      accent: '#237E55',
      tag: 'NEURAL FREQUENCY',
      title: 'The 76 BPM Cadence',
      description: 'Cortisol spikes from frantic urgency destroy creative problem-solving. Our auditory tempo engine maintains an acoustic resting pulse of 76 beats per minute, anchoring your nervous system into sustained alpha-wave flow states.',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
      imageAlt: '3D acoustic resonance sphere',
    },
    {
      icon: Cpu,
      accent: '#C8AC79',
      tag: 'COGNITIVE ARCHITECTURE',
      title: 'Single-Thread Execution',
      description: 'Human cognition does not multitask; it rapid-switches with a 23-minute recovery penalty per distraction. Cadence acts as a hardware lock for your attention—only one active objective exists on your screen until released.',
      image: 'https://images.unsplash.com/photo-1633493106185-10e96bd60886?auto=format&fit=crop&w=600&q=80',
      imageAlt: '3D obsidian prism single-thread lock',
    },
  ];

  return (
    <section 
      id="philosophy" 
      className="py-20 md:py-28 relative border-t border-[#1E293B]/60 bg-[#080C16] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#237E55]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[#7A9BCC]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Rhythm always beats rush.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Most productivity software turns your day into an anxious slot machine of checkboxes and unread badges. Cadence replaces chaotic urgency with deliberate biological pacing.
          </p>
        </div>

        {/* 3 Core Pillars with 3D Tilt & Visually Rich Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <ThreeDCard
                key={idx}
                intensity={10}
                glowColor={p.accent === '#7A9BCC' ? 'rgba(122, 155, 204, 0.3)' : p.accent === '#237E55' ? 'rgba(35, 126, 85, 0.3)' : 'rgba(200, 172, 121, 0.3)'}
                className="h-full"
              >
                <div className="group relative rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0E1A] border border-[#1E293B] p-7 hover:border-[#7A9BCC]/50 transition-all duration-300 shadow-xl flex flex-col justify-between h-full overflow-hidden">
                  
                  {/* Subtle 3D Image Header */}
                  <div className="relative h-44 -mx-7 -mt-7 mb-6 overflow-hidden border-b border-[#1E293B]">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                    
                    {/* Floating pill badge on image */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-mono-code font-bold tracking-widest text-white uppercase bg-[#090D16]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#1E293B]">
                        {p.tag}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#090D16]/80 backdrop-blur-md border border-[#1E293B] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    {/* Decorative Top Accent line */}
                    <div 
                      className="w-12 h-1 rounded-full mb-4 transition-all group-hover:w-20"
                      style={{ backgroundColor: p.accent }}
                    />

                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <span>{p.title}</span>
                    </h3>

                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#1E293B]/60 flex items-center justify-between text-xs text-[#64748B]">
                    <span className="font-mono-code">RHYTHM 0{idx + 1}</span>
                    <span className="text-[#94A3B8] font-mono-code group-hover:text-white transition-colors">
                      STABLE HARMONIC
                    </span>
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
