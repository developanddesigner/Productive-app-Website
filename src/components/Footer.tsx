import { ArrowUp, Heart, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  onOpenCommandPalette: () => void;
}

export default function Footer({ onOpenCommandPalette }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060911] border-t border-[#1E293B] pt-16 pb-12 text-[#94A3B8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#1E293B]/60">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#1E293B] border border-[#7A9BCC]/30 flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-2.5 bg-[#7A9BCC] rounded-full"></span>
                  <span className="w-1 h-4 bg-[#237E55] rounded-full"></span>
                  <span className="w-1 h-2 bg-[#C8AC79] rounded-full"></span>
                </div>
              </div>
              <span className="font-display font-bold text-white tracking-wider text-base">CADENCE</span>
            </div>

            <p className="text-xs text-[#64748B] max-w-sm leading-relaxed">
              The intentional attention operating system. Engineered for builders, researchers, and creators who prioritize rhythm over frantic urgency.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0B101E] border border-[#1E293B] font-mono-code text-[11px] text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>All Systems Rhythmic • v2.4.0</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <span className="font-mono-code text-white uppercase text-[11px] font-semibold tracking-wider">
              Product
            </span>
            <ul className="space-y-2">
              <li><a href="#live-showcase" className="hover:text-white transition-colors">Interactive Engine</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Command Bar (⌘K)</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Context Shield</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Acoustic Synthesizer</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Attention Recovery ROI</a></li>
            </ul>
          </div>

          {/* Column 2: Architecture */}
          <div className="space-y-3">
            <span className="font-mono-code text-white uppercase text-[11px] font-semibold tracking-wider">
              Philosophy
            </span>
            <ul className="space-y-2">
              <li><a href="#philosophy" className="hover:text-white transition-colors">Ultradian Wave Dynamics</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">The 76 BPM Rhythm</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Local-First SQLite</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Zero-Telemetry Pledge</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Open Sync Protocol</a></li>
            </ul>
          </div>

          {/* Column 3: Ecosystem */}
          <div className="space-y-3">
            <span className="font-mono-code text-white uppercase text-[11px] font-semibold tracking-wider">
              Platforms
            </span>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">macOS Apple Silicon</span></li>
              <li><span className="hover:text-white cursor-pointer">Windows 11 / ARM</span></li>
              <li><span className="hover:text-white cursor-pointer">Linux AppImage</span></li>
              <li><span className="hover:text-white cursor-pointer">Web Client</span></li>
              <li>
                <button 
                  onClick={onOpenCommandPalette}
                  className="text-[#7A9BCC] hover:underline flex items-center gap-1 font-mono-code text-[11px]"
                >
                  <Terminal className="w-3 h-3" /> Quick Command ⌘K
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Cadence Systems Inc. Built for deep focus.</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#faq" className="hover:text-white transition-colors">Privacy Guarantee</a>
            <a href="#faq" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors ml-2"
              title="Return to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
