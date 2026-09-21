import { FaqItem, PricingTier, TaskItem, Testimonial } from '../types';

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    title: 'Architect neural indexing cache schema',
    duration: 50,
    category: 'deep',
    completed: true,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Refactor audio pipeline latency down to <15ms',
    duration: 45,
    category: 'deep',
    completed: false,
    priority: 'high',
  },
  {
    id: '3',
    title: 'Write release changelog & ergonomic review',
    duration: 25,
    category: 'creative',
    completed: false,
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Sync quarterly roadmap priorities with engineering',
    duration: 20,
    category: 'review',
    completed: false,
    priority: 'low',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Cadence Solo',
    tagline: 'For individual thinkers, solo founders, and deep specialists.',
    monthlyPrice: 12,
    annualPrice: 9,
    popular: false,
    features: [
      'Unlimited rhythmic flow blocks',
      'Ambient acoustic synthesizer (Brown, Pink, 76 BPM)',
      'Local-first encrypted SQLite storage',
      'System-wide Command Palette (⌘K)',
      'Offline mode with background synchronization',
      'Basic calendar & task timeline integration',
    ],
    ctaText: 'Start 14-Day Free Trial',
  },
  {
    id: 'pro',
    name: 'Cadence Pro',
    tagline: 'The complete cognitive operating system for power builders.',
    monthlyPrice: 24,
    annualPrice: 18,
    popular: true,
    features: [
      'Everything in Solo, plus:',
      'Biometric & circadian tempo alignment',
      'Deep Context Shield: Auto-silence Slack, Mail & tabs',
      'Linear, GitHub, Notion, & Raycast bi-directional sync',
      'Ultradian 90-minute wave analytics & burnout detection',
      'Custom acoustic frequency harmonics & chimes',
      'Priority early access to experimental builds',
    ],
    ctaText: 'Claim Pro Experience',
  },
  {
    id: 'teams',
    name: 'Cadence Collective',
    tagline: 'For high-velocity engineering and design teams who guard focus.',
    monthlyPrice: 39,
    annualPrice: 30,
    popular: false,
    features: [
      'Everything in Pro, plus:',
      'Synchronized team "No-Meeting" focus zones',
      'Shared sprint rhythms & asynchronous status beacons',
      'Centralized SSO (Okta, Google Workspace, Azure AD)',
      'SOC2 Type II compliance & audit exports',
      'Dedicated concierge onboarding & workflow architect',
    ],
    ctaText: 'Talk with Product Architect',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Cadence replaced four separate apps for me: my timer, task board, white noise player, and daily journal. The 76 BPM rhythm mode puts my brain into an immediate state of deep absorption within 90 seconds.',
    author: 'Elena Rostova',
    role: 'Staff Systems Architect',
    company: 'Vektor Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    metric: '+3.8 hrs/day focus time',
  },
  {
    id: '2',
    quote: 'Most productivity software demands you constantly organize it. Cadence does the opposite: it protects your attention from the world, and gets completely out of your way when you are coding.',
    author: 'Marcus Chen',
    role: 'Founder & Principal Engineer',
    company: 'Hyperion Cloud',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    metric: '68% less context switching',
  },
  {
    id: '3',
    quote: 'Our whole product design team adopted the collective focus zones. The difference between chaotic Slack interruptions and rhythmic quiet sprints has been transformative for our output quality.',
    author: 'Siddharth Nair',
    role: 'VP of Design',
    company: 'Strata Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    metric: '4.2x faster feature delivery',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How is Cadence fundamentally different from standard Pomodoro or to-do apps?',
    answer: 'Traditional tools are static list repositories that amplify cognitive load with endless backlog guilt. Cadence is an attention operating system based on biological Ultradian rhythms (90-minute natural neuro-chemical wave cycles) paired with our 76 BPM auditory stabilization and automated Context Shielding to actively prevent notification intrusions.',
  },
  {
    id: 'faq-2',
    question: 'Is Cadence fully functional offline?',
    answer: 'Yes. Cadence follows a strict local-first architecture. All your tasks, logs, metrics, and sound algorithms operate entirely on your local machine with zero latency. When you reconnect to Wi-Fi, it quietly resolves conflicts with end-to-end encryption.',
  },
  {
    id: 'faq-3',
    question: 'How does the Context Shield integrate with my existing tools like Slack and Chrome?',
    answer: 'When a Cadence Focus Session commences, our native desktop daemon automatically sets your Slack and Teams status to "In Flow (resumes at HH:MM)", pauses non-urgent notifications, and can optionally park secondary browser tabs into a quiet workspace drawer so your visual field stays pristine.',
  },
  {
    id: 'faq-4',
    question: 'What platforms does Cadence support?',
    answer: 'Cadence is natively compiled for macOS (Apple Silicon & Intel), Windows 11, Linux (AppImage & Flatpak), with an accompanying mobile companion for iOS and Android, plus a fully featured web application that works seamlessly in modern Chromium and WebKit browsers.',
  },
  {
    id: 'faq-5',
    question: 'What happens after the 14-day trial?',
    answer: 'You have full access to all Cadence Pro capabilities with zero credit card required upfront. When the trial concludes, you can select any paid plan or effortlessly transition to our free community tier with local task tracking and basic timers forever preserved.',
  },
];

export const INTEGRATIONS = [
  { name: 'Linear', category: 'Issue Tracking', icon: 'CheckSquare' },
  { name: 'GitHub', category: 'Commits & PRs', icon: 'GitPullRequest' },
  { name: 'Notion', category: 'Knowledge Base', icon: 'FileText' },
  { name: 'Figma', category: 'Design Sync', icon: 'Layers' },
  { name: 'Raycast', category: 'Quick Launcher', icon: 'Terminal' },
  { name: 'Google Calendar', category: 'Schedule Sync', icon: 'Calendar' },
  { name: 'Slack', category: 'Flow Status', icon: 'MessageSquare' },
  { name: 'Obsidian', category: 'Markdown Vault', icon: 'BookOpen' },
];
