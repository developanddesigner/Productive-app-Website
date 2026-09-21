import { useState } from 'react';
import { 
  X, 
  Apple, 
  Monitor, 
  Globe, 
  Terminal, 
  CheckCircle2, 
  Download, 
  Key, 
  Copy, 
  Check 
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export default function DownloadModal({ isOpen, onClose, selectedPlan }: DownloadModalProps) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [platform, setPlatform] = useState<'mac' | 'win' | 'linux'>('mac');

  if (!isOpen) return null;

  const licenseTrialKey = 'CADENCE-TRIAL-76BPM-FLOW-9942';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseTrialKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleTriggerDownload = () => {
    setDownloadStarted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#0C1222] border border-[#1E293B] rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10 z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#7A9BCC]/15 border border-[#7A9BCC]/30 flex items-center justify-center mx-auto mb-3 text-[#7A9BCC]">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {selectedPlan ? `Get Started with ${selectedPlan}` : 'Install Cadence Native'}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            14-day fully unrestricted trial • Universal binary • Local SQLite
          </p>
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setPlatform('mac')}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              platform === 'mac'
                ? 'bg-[#7A9BCC]/20 border-[#7A9BCC] text-white shadow-xs'
                : 'bg-[#090D16] border-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Apple className="w-5 h-5" />
            <span className="text-xs font-semibold">macOS</span>
            <span className="text-[10px] text-[#64748B]">M1-M4 & Intel</span>
          </button>

          <button
            onClick={() => setPlatform('win')}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              platform === 'win'
                ? 'bg-[#7A9BCC]/20 border-[#7A9BCC] text-white shadow-xs'
                : 'bg-[#090D16] border-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Monitor className="w-5 h-5" />
            <span className="text-xs font-semibold">Windows</span>
            <span className="text-[10px] text-[#64748B]">x64 & ARM64</span>
          </button>

          <button
            onClick={() => setPlatform('linux')}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              platform === 'linux'
                ? 'bg-[#7A9BCC]/20 border-[#7A9BCC] text-white shadow-xs'
                : 'bg-[#090D16] border-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span className="text-xs font-semibold">Linux</span>
            <span className="text-[10px] text-[#64748B]">AppImage / Flatpak</span>
          </button>
        </div>

        {/* Generated Trial Key */}
        <div className="bg-[#080C17] border border-[#1E293B] rounded-xl p-3.5 mb-6">
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1.5">
            <span className="flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-[#C8AC79]" /> AUTO-PROVISIONED TRIAL KEY
            </span>
            <span className="text-[#10B981]">14 DAYS REMAINING</span>
          </div>
          <div className="flex items-center justify-between font-mono-code text-xs text-white">
            <span className="tracking-wide">{licenseTrialKey}</span>
            <button
              onClick={handleCopyKey}
              className="p-1 text-[#94A3B8] hover:text-white transition-colors"
              title="Copy key"
            >
              {copiedKey ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Trigger Download Button */}
        {!downloadStarted ? (
          <button
            onClick={handleTriggerDownload}
            className="w-full py-3.5 rounded-xl bg-[#7A9BCC] hover:bg-[#8BAFE0] text-[#090D16] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#7A9BCC]/20 active:scale-95 mb-4"
          >
            <Download className="w-4 h-4" />
            <span>
              Download Cadence for {platform === 'mac' ? 'macOS (v2.4.0 .dmg)' : platform === 'win' ? 'Windows (.exe)' : 'Linux (.AppImage)'}
            </span>
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-[#237E55]/20 border border-[#237E55]/50 text-center mb-4 text-xs font-mono-code text-[#34D399] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Download initiated! Open the package and paste your trial key.</span>
          </div>
        )}

        {/* Terminal alternative */}
        <div className="text-center text-[11px] font-mono-code text-[#64748B]">
          Or install via CLI: <span className="text-[#94A3B8]">brew install --cask cadence</span>
        </div>

      </div>
    </div>
  );
}
