import { useState, useEffect } from 'react';
import { 
  Command, 
  Search, 
  X, 
  Clock, 
  Volume2, 
  ShieldCheck, 
  Download, 
  CreditCard, 
  HelpCircle, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { ambientSound } from '../utils/audio';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownload: () => void;
}

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onOpenDownload,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'focus-25',
      label: 'Start 25m Pomodoro sprint',
      category: 'Focus Engine',
      icon: Clock,
      execute: () => {
        ambientSound.playChime();
        setFeedback('25-minute focus session simulated! Jump to Live Engine below.');
        setTimeout(() => {
          onClose();
          const el = document.getElementById('live-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 800);
      },
    },
    {
      id: 'audio-brown',
      label: 'Toggle Acoustic Brown Noise generator',
      category: 'Soundscape',
      icon: Volume2,
      execute: () => {
        if (ambientSound.getActive()) {
          ambientSound.stop();
          setFeedback('Ambient soundscape paused.');
        } else {
          ambientSound.play('brown');
          setFeedback('Brown noise activated for neural absorption.');
        }
        setTimeout(() => setFeedback(null), 2500);
      },
    },
    {
      id: 'shield-toggle',
      label: 'Engage Context Shield (Silence Slack & Tabs)',
      category: 'Protection',
      icon: ShieldCheck,
      execute: () => {
        setFeedback('Context Shield engaged. 14 incoming notifications parked.');
        setTimeout(() => setFeedback(null), 2500);
      },
    },
    {
      id: 'download-app',
      label: 'Download Cadence Native Desktop App',
      category: 'System',
      icon: Download,
      execute: () => {
        onClose();
        onOpenDownload();
      },
    },
    {
      id: 'pricing-view',
      label: 'Compare Cadence Pro & Solo pricing',
      category: 'Navigation',
      icon: CreditCard,
      execute: () => {
        onClose();
        const el = document.getElementById('pricing');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'faq-view',
      label: 'Read local-first offline architecture documentation',
      category: 'Documentation',
      icon: HelpCircle,
      execute: () => {
        onClose();
        const el = document.getElementById('faq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-[#0C1222] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 z-10">
        
        {/* Input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1E293B]">
          <Search className="w-5 h-5 text-[#7A9BCC]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to feature (e.g. 'focus', 'noise', 'download')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#64748B] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback message banner */}
        {feedback && (
          <div className="bg-[#237E55]/20 border-b border-[#237E55]/40 px-4 py-2 text-xs font-mono-code text-[#34D399] flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Action list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.execute}
                  className="w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between hover:bg-[#1E293B] text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-[#1E293B] group-hover:border-[#7A9BCC]/40 flex items-center justify-center text-[#7A9BCC]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{action.label}</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#64748B] uppercase">
                    {action.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-[#64748B]">
              No command matching "{query}". Try "sprint", "brown", or "pricing".
            </div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2.5 bg-[#080C17] border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#64748B] font-mono-code">
          <span>Cadence Command Bar</span>
          <div className="flex items-center gap-3">
            <span>Use <kbd className="bg-[#1E293B] px-1 py-0.5 rounded text-white">Esc</kbd> to exit</span>
          </div>
        </div>

      </div>
    </div>
  );
}
