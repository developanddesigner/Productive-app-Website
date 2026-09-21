import { XCircle, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function WorkflowComparison() {
  const comparisonItems = [
    {
      metric: 'Attention State',
      chaotic: 'Fragmented across 40 browser tabs and 6 unread channel badges.',
      cadence: 'Single-thread focus lock: only the active objective is rendered.',
    },
    {
      metric: 'Audio Environment',
      chaotic: 'Scattered Spotify playlists or distracting office chatter causing cortisol spikes.',
      cadence: 'Continuous 76 BPM acoustic synthesis & brownian frequency generator.',
    },
    {
      metric: 'Workplace Intrusions',
      chaotic: 'Colleagues pinging at will, shattering 20 minutes of working memory.',
      cadence: 'Context Shield automatically silences non-urgent DMs with scheduled batch windows.',
    },
    {
      metric: 'Day Scheduling',
      chaotic: 'Unrealistic flat 8-hour sprint causing 3 PM mental crashes.',
      cadence: 'Harmonic 90-minute biological ultradian cycles matched to energy peaks.',
    },
    {
      metric: 'Data Storage',
      chaotic: 'Cloud-bloated web apps that freeze during slow Wi-Fi and track every keystroke.',
      cadence: 'Local-first encrypted SQLite database: 2ms response time, zero telemetry.',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          From chaotic urgency to rhythmic momentum.
        </h2>
        <p className="text-base text-[#94A3B8] mt-3">
          See the structural difference between conventional task managers and an attention operating system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* The Fragmented Old Way */}
        <div className="rounded-2xl bg-[#0E131F]/50 border border-[#EF4444]/20 p-6 sm:p-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center text-[#F87171]">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Conventional Task Hoarding</h3>
              <span className="text-xs text-[#94A3B8]">Reactive, noisy & exhausting</span>
            </div>
          </div>

          <div className="space-y-5">
            {comparisonItems.map((item, idx) => (
              <div key={idx} className="pb-4 border-b border-[#1E293B]/40 last:border-none">
                <span className="text-[11px] font-mono-code text-[#EF4444] uppercase tracking-wider block mb-1">
                  {item.metric}
                </span>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {item.chaotic}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Cadence Rhythmic Way */}
        <div className="rounded-2xl bg-[#0B111F] border border-[#7A9BCC]/40 p-6 sm:p-8 relative shadow-xl shadow-black/40 ring-1 ring-[#7A9BCC]/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#237E55]/20 border border-[#10B981]/40 flex items-center justify-center text-[#34D399]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>The Cadence Architecture</span>
                <span className="text-[10px] font-mono-code bg-[#10B981]/20 text-[#34D399] px-2 py-0.5 rounded">
                  76 BPM
                </span>
              </h3>
              <span className="text-xs text-[#7A9BCC]">Calm, deliberate & momentum-driven</span>
            </div>
          </div>

          <div className="space-y-5">
            {comparisonItems.map((item, idx) => (
              <div key={idx} className="pb-4 border-b border-[#1E293B]/60 last:border-none">
                <span className="text-[11px] font-mono-code text-[#7A9BCC] uppercase tracking-wider block mb-1">
                  {item.metric}
                </span>
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed font-medium">
                  {item.cadence}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
