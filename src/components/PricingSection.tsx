import { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_TIERS } from '../data/content';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
}

export default function PricingSection({ onSelectTier }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section 
      id="pricing" 
      className="py-20 md:py-28 relative bg-[#080C17] border-t border-[#1E293B]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Invest in your deepest hours.
          </h2>
          <p className="text-base text-[#94A3B8] mt-3">
            14-day free trial on all plans. No credit card required. Keep local SQLite data forever.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-3 bg-[#0F172A] p-1.5 rounded-full border border-[#1E293B] mt-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !isAnnual ? 'bg-[#1E293B] text-white shadow-xs' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#7A9BCC] text-[#090D16] font-semibold shadow-xs' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono-code ${
                isAnnual ? 'bg-[#090D16] text-[#7A9BCC]' : 'bg-[#237E55]/30 text-[#34D399]'
              }`}>
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl flex flex-col justify-between p-8 transition-all relative ${
                  tier.popular
                    ? 'bg-[#0E1528] border-2 border-[#7A9BCC] shadow-2xl shadow-[#7A9BCC]/10 lg:-translate-y-2'
                    : 'bg-[#0B101E] border border-[#1E293B] hover:border-[#334155]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7A9BCC] text-[#090D16] font-mono-code text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 fill-current" /> MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                    {tier.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-[#64748B] font-mono-code">/ month</span>
                    {isAnnual && (
                      <span className="text-[11px] text-[#237E55] font-mono-code ml-2">
                        billed annually
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 pt-6 border-t border-[#1E293B] mb-8">
                    {tier.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                        <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    tier.popular
                      ? 'bg-[#7A9BCC] hover:bg-[#8BAFE0] text-[#090D16] shadow-lg shadow-[#7A9BCC]/20'
                      : 'bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155]'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Security & Local First Note */}
        <div className="mt-12 text-center text-xs text-[#64748B] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>30-Day Money Back Guarantee • Cancel anytime with one click • Local files remain yours forever</span>
        </div>

      </div>
    </section>
  );
}
