import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Adopted by teams that reject busywork.
        </h2>
        <p className="text-base text-[#94A3B8] mt-3">
          Over 140,000 engineers, authors, and researchers use Cadence to protect their best hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl bg-[#0B111F] border border-[#1E293B] p-7 flex flex-col justify-between hover:border-[#7A9BCC]/40 transition-all shadow-lg"
          >
            <div>
              {/* Metric Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-mono-code text-[#34D399] font-medium mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.metric}</span>
              </div>

              <p className="text-sm text-[#CBD5E1] leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#1E293B]/60">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-10 h-10 rounded-full object-cover border border-[#7A9BCC]/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{t.author}</h4>
                <p className="text-xs text-[#94A3B8]">
                  {t.role} • <span className="text-[#7A9BCC]">{t.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust banner */}
      <div className="mt-16 pt-8 border-t border-[#1E293B]/50 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-mono-code text-[#94A3B8]">
        <span>STRATA RESEARCH</span>
        <span>•</span>
        <span>VEKTOR SYSTEMS</span>
        <span>•</span>
        <span>HYPERION CLOUD</span>
        <span>•</span>
        <span>COGNITIVE LABS</span>
      </div>

    </section>
  );
}
