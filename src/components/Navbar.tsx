import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Command, 
  Download, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenDownloadModal: () => void;
}

export default function Navbar({ onOpenCommandPalette, onOpenDownloadModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Live Engine', href: '#live-showcase' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Capabilities', href: '#features' },
    { name: 'ROI Calculator', href: '#calculator' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#090D16]/85 backdrop-blur-md border-b border-[#1E293B]/80 py-3.5 shadow-lg shadow-black/20' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a 
          href="#" 
          id="brand-logo-link"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9BCC]"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#7A9BCC]/30 flex items-center justify-center p-0.5 shadow-inner transition-transform group-hover:scale-105">
            {/* Waveform / Cadence glyph */}
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-[#7A9BCC] rounded-full animate-pulse" style={{ animationDuration: '1.2s' }}></span>
              <span className="w-1 h-5 bg-[#237E55] rounded-full"></span>
              <span className="w-1 h-2.5 bg-[#C8AC79] rounded-full"></span>
            </div>
            <div className="absolute -inset-0.5 rounded-xl bg-[#7A9BCC]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none"></div>
          </div>
          <div className="flex items-center">
            <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              CADENCE
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-1 bg-[#0F172A]/70 border border-[#1E293B] rounded-full px-4 py-1.5 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-full hover:bg-[#1E293B]/60 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Command Palette Launcher */}
          <button
            id="nav-command-palette-btn"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 text-xs font-mono-code text-[#94A3B8] bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#7A9BCC]/40 rounded-lg px-2.5 py-1.5 transition-all text-left group"
            title="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-[#7A9BCC] group-hover:rotate-12 transition-transform" />
            <span>Search</span>
            <kbd className="text-[10px] bg-[#1E293B] px-1.5 py-0.5 rounded text-[#CBD5E1] border border-[#334155]">⌘K</kbd>
          </button>

          {/* Download / Launch CTA */}
          <button
            id="nav-download-cta-btn"
            onClick={onOpenDownloadModal}
            className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7A9BCC]/20 via-[#237E55]/30 to-[#7A9BCC]/20 hover:from-[#7A9BCC]/30 hover:to-[#237E55]/40 border border-[#7A9BCC]/40 hover:border-[#7A9BCC] rounded-lg px-4 py-2 shadow-sm shadow-[#7A9BCC]/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-[#7A9BCC]" />
            <span>Get Cadence</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-quick-cmd-btn"
            onClick={onOpenCommandPalette}
            className="p-2 text-[#94A3B8] bg-[#0F172A] border border-[#1E293B] rounded-lg"
            aria-label="Search"
          >
            <Command className="w-4 h-4 text-[#7A9BCC]" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#94A3B8] hover:text-white bg-[#0F172A] border border-[#1E293B] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-menu"
          className="md:hidden bg-[#090D16] border-b border-[#1E293B] px-4 pt-3 pb-6 mt-2 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#CBD5E1] hover:text-white px-3 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1E293B] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#1E293B] hover:bg-[#334155] border border-[#7A9BCC]/40 rounded-lg py-2.5 transition-colors"
            >
              <Download className="w-4 h-4 text-[#7A9BCC]" />
              <span>Download for macOS, Windows & Web</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
