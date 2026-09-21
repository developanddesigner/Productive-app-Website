import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Questions & Technical Clarifications
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-2">
          Everything you need to know about our local architecture, privacy guarantees, and focus methods.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl bg-[#0B101E] border border-[#1E293B] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-[#7A9BCC] transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#7A9BCC] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/50 pt-3 animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
