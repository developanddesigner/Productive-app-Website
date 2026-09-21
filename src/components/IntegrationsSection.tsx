import type { ElementType } from 'react';
import { 
  CheckSquare, 
  GitPullRequest, 
  FileText, 
  Layers, 
  Terminal, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  ArrowUpRight 
} from 'lucide-react';
import { INTEGRATIONS } from '../data/content';

export default function IntegrationsSection() {
  const iconMap: Record<string, ElementType> = {
    CheckSquare,
    GitPullRequest,
    FileText,
    Layers,
    Terminal,
    Calendar,
    MessageSquare,
    BookOpen,
  };

  return (
    <section className="py-20 bg-[#080C17] border-t border-[#1E293B]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Fits right into your developer & design stack.
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2">
            Import issues directly from Linear and GitHub into your active sprint; export markdown reflection logs to Obsidian.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {INTEGRATIONS.map((item, idx) => {
            const Icon = iconMap[item.icon] || CheckSquare;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0B101E] border border-[#1E293B] hover:border-[#7A9BCC]/50 transition-all group flex flex-col items-center text-center cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#1E293B] group-hover:border-[#7A9BCC]/40 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-[#7A9BCC] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-semibold text-white group-hover:text-[#7A9BCC] transition-colors">
                  {item.name}
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5">
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
