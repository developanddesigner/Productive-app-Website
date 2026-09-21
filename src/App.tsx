/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveAppShowcase from './components/InteractiveAppShowcase';
import PhilosophySection from './components/PhilosophySection';
import FeaturesBento from './components/FeaturesBento';
import RoiCalculator from './components/RoiCalculator';
import WorkflowComparison from './components/WorkflowComparison';
import IntegrationsSection from './components/IntegrationsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import CommandPaletteModal from './components/CommandPaletteModal';
import DownloadModal from './components/DownloadModal';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined);

  const handleOpenDownload = (tier?: string) => {
    setSelectedTier(tier);
    setDownloadModalOpen(true);
  };

  const handleExploreDemo = () => {
    const el = document.getElementById('live-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F1F5F9] relative selection:bg-[#7A9BCC]/30 selection:text-[#E2E8F0]">
      
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenDownloadModal={() => handleOpenDownload()}
      />

      {/* Main Landing Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenDownloadModal={() => handleOpenDownload()}
          onExploreDemo={handleExploreDemo}
        />

        {/* 2. Interactive App Showcase Engine (Live Timer, Acoustic Generator, Task Backlog, Context Shield) */}
        <InteractiveAppShowcase />

        {/* 3. The Philosophy of Rhythmic Focus (Ultradian waves, 76 BPM, Single-thread) */}
        <PhilosophySection />

        {/* 4. Purpose-Built Capabilities Bento Grid */}
        <FeaturesBento
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* 5. Interactive ROI & Attention Recovery Calculator */}
        <RoiCalculator
          onStartTrial={() => handleOpenDownload('Cadence Pro')}
        />

        {/* 6. Old Chaotic Way vs The Cadence Rhythm Comparison */}
        <WorkflowComparison />

        {/* 7. Developer & Workflow Integrations */}
        <IntegrationsSection />

        {/* 8. Field-Verified Stories & Testimonials */}
        <TestimonialsSection />

        {/* 9. Transparent Pricing Tiers with Annual Toggle */}
        <PricingSection
          onSelectTier={(tierName) => handleOpenDownload(tierName)}
        />

        {/* 10. Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* 11. Closing Call-To-Action Banner */}
        <CtaBanner
          onOpenDownloadModal={() => handleOpenDownload()}
        />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Global Interactive Modals */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenDownload={() => handleOpenDownload()}
      />

      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        selectedPlan={selectedTier}
      />
    </div>
  );
}
