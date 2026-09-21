import { useState, type FormEvent } from 'react';
import { ArrowRight, Download, CheckCircle2, Apple, Monitor, Globe, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenDownloadModal: () => void;
}

export default function CtaBanner({ onOpenDownloadModal }: CtaBannerProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#7A9BCC]/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#237E55]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#0F172A]/95 to-[#0A0F1D]/95 border border-[#7A9BCC]/30 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Cinematic background atmospheric image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" 
              alt="Atmospheric Flow Horizon" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Reclaim your attention. <br />
              <span className="bg-gradient-to-r from-[#F8FAFC] via-[#7A9BCC] to-[#C8AC79] bg-clip-text text-transparent">
                Drop into deep focus in 90 seconds.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto mb-8 leading-relaxed">
              Experience what happens when your operating environment stops fighting your attention and starts protecting it.
            </p>

            {/* Direct CTA Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-8">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7A9BCC] to-[#5C7FA9] hover:from-[#8BAFE0] hover:to-[#6C90BA] text-[#090D16] font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#7A9BCC]/25 transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download for Free (14-Day Trial)</span>
              </button>
            </div>

            {/* Quick email invite alternative */}
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto gap-2 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Or get download link via email..."
                  className="flex-1 bg-[#090D16]/90 border border-[#1E293B] focus:border-[#7A9BCC] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#1E293B] hover:bg-[#334155] text-white px-4 py-2 rounded-xl text-xs font-medium transition-colors"
                >
                  Send Link
                </button>
              </form>
            ) : (
              <div className="text-xs font-mono-code text-[#10B981] flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span>Download link & license key dispatched to {email}</span>
              </div>
            )}

            {/* Platform tags */}
            <div className="flex items-center justify-center gap-6 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5"><Apple className="w-3.5 h-3.5 text-[#CBD5E1]" /> macOS M1-M4 & Intel</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-[#CBD5E1]" /> Windows 11</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#CBD5E1]" /> Web App</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
