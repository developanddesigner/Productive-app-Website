import { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface RoiCalculatorProps {
  onStartTrial: () => void;
}

export default function RoiCalculator({ onStartTrial }: RoiCalculatorProps) {
  const [dailyHours, setDailyHours] = useState(8);
  const [interruptionsPerHour, setInterruptionsPerHour] = useState(4);

  // Gloria Mark UC Irvine research: Each interruption costs ~23 mins 15 secs to regain deep state.
  // With Cadence Context Shielding, ~70% of non-urgent interruptions are batched.
  const totalDailyInterruptions = dailyHours * interruptionsPerHour;
  const lostMinutesPerDay = Math.min(dailyHours * 60 * 0.65, totalDailyInterruptions * 18);
  const savedMinutesPerDay = Math.round(lostMinutesPerDay * 0.68);
  const savedHoursPerWeek = (savedMinutesPerDay * 5 / 60).toFixed(1);
  const reclaimedDeepHoursYearly = Math.round((savedMinutesPerDay * 5 * 48) / 60);

  return (
    <section 
      id="calculator" 
      className="py-20 md:py-28 relative bg-[#080C17] border-y border-[#1E293B]/60"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Calculate your recovered focus time.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-2">
            Based on cognitive switching latency research: see how many hours of deep flow Cadence shields for you each week.
          </p>
        </div>

        <div className="bg-[#0B101E] border border-[#1E293B] rounded-2xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Input Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slider 1: Daily Working Hours */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7A9BCC]" />
                  <span>Daily active working hours</span>
                </label>
                <span className="font-mono-code text-sm font-bold text-[#7A9BCC] bg-[#090D16] border border-[#1E293B] px-3 py-1 rounded-lg">
                  {dailyHours} hours / day
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                step="1"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#7A9BCC]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] mt-1 font-mono-code">
                <span>4h</span>
                <span>8h (Standard)</span>
                <span>14h (Founder mode)</span>
              </div>
            </div>

            {/* Slider 2: Interruptions per hour */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#C8AC79]" />
                  <span>Slack, email & tab context switches per hour</span>
                </label>
                <span className="font-mono-code text-sm font-bold text-[#C8AC79] bg-[#090D16] border border-[#1E293B] px-3 py-1 rounded-lg">
                  ~{interruptionsPerHour} switches / hr
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={interruptionsPerHour}
                onChange={(e) => setInterruptionsPerHour(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#C8AC79]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] mt-1 font-mono-code">
                <span>1 (Calm)</span>
                <span>5 (Average corporate)</span>
                <span>10 (Total chaos)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080C17] border border-[#1E293B] text-xs text-[#94A3B8] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#237E55] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium">Cognitive Switching Tax: </span>
                Every random ping drains working memory. Cadence holds peripheral messages until your scheduled ultradian reflection valley.
              </div>
            </div>

          </div>

          {/* Result Output Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-[#1E293B] rounded-2xl p-6 sm:p-8 text-center flex flex-col justify-between h-full shadow-inner">
            
            <span className="text-[11px] font-mono-code tracking-wider text-[#10B981] uppercase">
              ESTIMATED FOCUS RECOVERY
            </span>

            <div className="my-6">
              <div className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight">
                +{savedHoursPerWeek}
                <span className="text-xl sm:text-2xl font-normal text-[#7A9BCC] ml-1">hrs</span>
              </div>
              <div className="text-xs text-[#94A3B8] mt-1">reclaimed deep work every week</div>
            </div>

            <div className="space-y-2 border-t border-[#1E293B] pt-4 mb-6 text-xs text-left">
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Annual Flow Gain:</span>
                <span className="font-mono-code font-bold text-white">+{reclaimedDeepHoursYearly} hours</span>
              </div>
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Deep Sprint Cycles:</span>
                <span className="font-mono-code font-bold text-[#10B981]">~{Math.round(parseFloat(savedHoursPerWeek) * 1.2)} extra/week</span>
              </div>
            </div>

            <button
              onClick={onStartTrial}
              className="w-full py-3.5 px-4 rounded-xl bg-[#7A9BCC] hover:bg-[#8BAFE0] text-[#090D16] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#7A9BCC]/20 active:scale-95"
            >
              <span>Reclaim Your Hours with Cadence</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
