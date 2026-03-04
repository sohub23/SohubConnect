import { useEffect, useState } from 'react';
import { Search, Menu, ChevronRight, ChevronDown, Sun, Moon, Phone, Users, BarChart3, CreditCard, Ticket, Wallet, Package, FileText, Clock, CheckCircle, XCircle, AlertCircle, Play, PhoneCall, MousePointer, QrCode, Zap, Settings, Headphones, Volume2, Mic, MicOff, PhoneIncoming, PhoneOutgoing, Globe, Code, Smartphone, Monitor, Router, UserCheck, Shield, Headset, Download, Layers, Route, MessageCircle, MapPin, CalendarDays, Link2 } from 'lucide-react';

export default function Documentation() {
  const [bgColor, setBgColor] = useState('white');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ voice: true, reports: true });
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [hotScanCallTrigger, setHotScanCallTrigger] = useState(0);
  const [hotScanCallActive, setHotScanCallActive] = useState(false);
  const isLightMode = bgColor === 'white';

  const applyTheme = (color) => {
    if (color === 'white') {
      document.documentElement.classList.add('light-mode');
      return;
    }
    document.documentElement.classList.remove('light-mode');
  };

  useEffect(() => {
    const saved = localStorage.getItem('headerBgColor') || 'white';
    setBgColor(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEsc);
    };
  }, [activeImage]);

  useEffect(() => {
    if (hotScanCallTrigger === 0) return;

    setHotScanCallActive(true);
    const timer = window.setTimeout(() => {
      setHotScanCallActive(false);
    }, 5200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [hotScanCallTrigger]);

  const allSections = [
    { id: 'overview', title: 'Overview' },
    { id: 'dashboard', title: 'Dashboard' },

    { id: 'operator-panel', title: 'Operator Panel' },
    { id: 'extensions', title: 'Extensions' },
    { id: 'inbound-route', title: 'Inbound Route' },
    { id: 'outbound-route', title: 'Outbound Route' },
    { id: 'ring-group', title: 'Ring Group' },
    { id: 'closed-user-group', title: 'Closed User Group' },
    { id: 'approved-trunks', title: 'Approved Trunks' },
    { id: 'caller-ids', title: 'Caller IDs' },
    { id: 'sound-files', title: 'Sound Files' },
    { id: 'text-to-speech', title: 'Text To Speech' },
    { id: 'quick-call', title: 'Quick Call' },
    { id: 'call-flow', title: 'Call Flow' },
    { id: 'click-to-connect', title: 'Click to Connect' },
    { id: 'hotscan', title: 'HotScan' },
    { id: 'call-reports', title: 'Call Reports' },
    { id: 'transaction-history', title: 'Transaction History' },
    { id: 'tickets', title: 'Tickets' },
    { id: 'wallet', title: 'Wallet' },

    { id: 'softphone', title: 'Get SoftPhone' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = allSections.filter(section => 
      section.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: FileText },
    { id: 'dashboard', title: 'Dashboard', icon: Monitor },
    { 
      id: 'voice', 
      title: 'Voice', 
      icon: Phone,
      children: [
        { id: 'operator-panel', title: 'Operator Panel', icon: Headset },
        { id: 'extensions', title: 'Extensions', icon: Users },
        { id: 'inbound-route', title: 'Inbound Route', icon: PhoneIncoming },
        { id: 'outbound-route', title: 'Outbound Route', icon: PhoneOutgoing },
        { id: 'ring-group', title: 'Ring Group', icon: Users },
        { id: 'closed-user-group', title: 'Closed User Group', icon: Shield },
        { id: 'approved-trunks', title: 'Approved Trunks', icon: Route },
        { id: 'caller-ids', title: 'Caller ID\'s', icon: Phone },
        { id: 'sound-files', title: 'Sound Files', icon: Volume2 },
        { id: 'text-to-speech', title: 'Text To Speech', icon: Mic },
        { id: 'quick-call', title: 'Quick Call', icon: PhoneCall },
        { id: 'call-flow', title: 'Call Flow', icon: Settings }
      ]
    },
    { id: 'click-to-connect', title: 'Click to Connect', icon: MousePointer },
    { id: 'hotscan', title: 'HotScan', icon: Zap },
    { 
      id: 'reports', 
      title: 'Reports', 
      icon: BarChart3,
      children: [
        { id: 'call-reports', title: 'Call Reports', icon: BarChart3 },
        { id: 'transaction-history', title: 'Transaction History', icon: CreditCard }
      ]
    },
    { id: 'tickets', title: 'Tickets', icon: Ticket },
    { id: 'wallet', title: 'Wallet', icon: Wallet },

    { id: 'softphone', title: 'Get SoftPhone', icon: Download },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBgColor = () => {
    const newColor = bgColor === 'default' ? 'white' : 'default';
    setBgColor(newColor);
    localStorage.setItem('headerBgColor', newColor);
    applyTheme(newColor);
  };

  const handleDocContentClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;

    setActiveImage({
      src: target.currentSrc || target.src,
      alt: target.alt || 'Documentation image',
    });
  };

  const renderTreeItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];
    const isActive = activeSection === item.id;
    const paddingLeft = level * 12 + 8;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center py-2 px-3 rounded cursor-pointer transition-colors text-sm font-semibold ${
            isActive
              ? isLightMode
                ? 'bg-[#e5e7eb] text-[#1f2937] ring-1 ring-[#d1d5db]'
                : 'bg-[#2d334a] text-[#e8eaed] ring-1 ring-[#4b5563]'
              : isLightMode
                ? 'text-[#334155] hover:bg-[#f1f5f9]'
                : 'text-[#e5e7eb] hover:bg-[#2d334a]'
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              selectSection(item.id);
            }
          }}
        >
          {Icon && <Icon className="w-4 h-4 mr-2 flex-shrink-0" />}
          <span className="flex-1">{item.title}</span>
          {hasChildren && (
            <div className="p-1">
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-0.5">
            {item.children.map((child) => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div>
            <h1 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Overview
            </h1>
            <p className="text-xl text-[#5f6368] dark:text-[#9aa0a6] mb-12 leading-relaxed">
              SOHUB Connect is a numberless, internet-first communication platform that enables instant voice conversations through a click or a scan.
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                This user manual provides a practical guide to set up your workspace, configure calling flows, manage users, and operate SOHUB Connect day to day.
              </p>
              
              <div className="docs-overview-highlight bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-6">
                <p className="text-[#202124] dark:text-[#e8eaed] text-lg font-medium text-center m-0">
                  Click. Scan. Talk.
                </p>
                <div className="docs-overview-journey mt-6">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <article className="docs-overview-step flex-1 rounded-xl p-4 border" style={{ '--step-delay': '80ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="docs-overview-step-icon inline-flex h-7 w-7 items-center justify-center rounded-full">
                          <MousePointer className="w-4 h-4" />
                        </span>
                        <p className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] m-0">Click</p>
                      </div>
                      <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] m-0">
                        Visitor taps your call button
                      </p>
                    </article>

                    <div className="docs-overview-arrow flex items-center justify-center text-[#64748b] dark:text-[#9aa0a6]" style={{ '--arrow-delay': '180ms' }}>
                      <ChevronRight className="hidden sm:block w-4 h-4" />
                      <ChevronDown className="sm:hidden w-4 h-4" />
                    </div>

                    <article className="docs-overview-step flex-1 rounded-xl p-4 border" style={{ '--step-delay': '280ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="docs-overview-step-icon inline-flex h-7 w-7 items-center justify-center rounded-full">
                          <QrCode className="w-4 h-4" />
                        </span>
                        <p className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] m-0">Scan</p>
                      </div>
                      <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] m-0">
                        Or customer scans your HotScan QR
                      </p>
                    </article>

                    <div className="docs-overview-arrow flex items-center justify-center text-[#64748b] dark:text-[#9aa0a6]" style={{ '--arrow-delay': '380ms' }}>
                      <ChevronRight className="hidden sm:block w-4 h-4" />
                      <ChevronDown className="sm:hidden w-4 h-4" />
                    </div>

                    <article className="docs-overview-step flex-1 rounded-xl p-4 border" style={{ '--step-delay': '480ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="docs-overview-step-icon inline-flex h-7 w-7 items-center justify-center rounded-full">
                          <PhoneCall className="w-4 h-4" />
                        </span>
                        <p className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] m-0">Talk</p>
                      </div>
                      <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] m-0">
                        Call is routed to the right team
                      </p>
                    </article>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                How SOHUB Connect Works
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Unlike traditional telephony, SOHUB Connect removes the need for direct dialing and allows customers to start conversations instantly through digital entry points.
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Internet-first voice connection</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">No manual dialing for customers</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Fast routing to the right team or extension</li>
              </ul>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Feature Overview
              </h2>
              
              <h3 className="text-xl font-normal text-[#202124] dark:text-[#e8eaed] mt-8 mb-3">
                Core Workspace
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Dashboard</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Operator Panel</li>
              </ul>

              <h3 className="text-xl font-normal text-[#202124] dark:text-[#e8eaed] mt-8 mb-3">
                Voice Configuration
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Extensions</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Inbound Route and Outbound Route</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Ring Group and Closed User Group (CUG)</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Approved Trunks and Caller IDs</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Sound Files and Text to Speech (TTS)</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Quick Call and Call Flow</li>
              </ul>

              <h3 className="text-xl font-normal text-[#202124] dark:text-[#e8eaed] mt-8 mb-3">
                Customer Entry Channels
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click to Connect</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">HotScan</li>
              </ul>

              <h3 className="text-xl font-normal text-[#202124] dark:text-[#e8eaed] mt-8 mb-3">
                Monitoring and Operations
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Call Reports</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Transaction History</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Tickets</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Wallet</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Get SoftPhone</li>
              </ul>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Getting Started Path
              </h2>
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                You can start with a single Click to Connect button, one HotScan profile, and one extension user, then expand to full PBX routing and reporting as your operation grows.
              </p>
              
              <div className="docs-overview-highlight bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-6">
                <p className="text-[#202124] dark:text-[#e8eaed] text-lg font-medium text-center m-0">
                  One click. One scan. Real conversation.
                </p>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div>
            <h1 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Dashboard
            </h1>
            <p className="text-xl text-[#5f6368] dark:text-[#9aa0a6] mb-12 leading-relaxed">
              The Dashboard is where everything in SOHUB Connect comes together.
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                It gives you a live snapshot of your communication setup — what's active, what's available, and what you can do next.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Top Summary Cards
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                At the top of the Dashboard, you'll see a quick system summary.
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click to Connect Buttons — how many are active</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">HotScan Profiles — QR-based calling profiles currently in use</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Extension Users — team members available to receive calls</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                This section answers one question instantly: "Is my system ready to receive calls right now?"
              </p>
              
              <img src="/doc_images/Dashboard_new.png?v=1" alt="Dashboard Overview" className="w-full rounded-lg shadow-md mb-8" />
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Click to Connect Profiles
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Click to Connect Profiles power instant voice conversations from the internet.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                From here you can:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Create new Click to Connect buttons</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Assign call flows</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Generate embed scripts for websites or apps</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Manage who receives calls</li>
              </ul>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                HotScan Profiles
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                HotScan Profiles enable QR-based calling — no phone numbers required.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                HotScan works anywhere:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Product packaging</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Business cards</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Flyers and brochures</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Physical locations</li>
              </ul>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Extension Users
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Extension Users are the people behind the conversations.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                From this section you can:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Add or remove team members</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Assign extensions</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Control call availability</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Manage users based on your plan</li>
              </ul>
              
              <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-8">
                <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base text-center m-0">
                  Start simple. Expand when ready. Conversations come first.
                </p>
              </div>
            </div>
          </div>
        );


      case 'operator-panel':
        return (
          <div>
            <h1 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Operator Panel
            </h1>
            <p className="text-xl text-[#5f6368] dark:text-[#9aa0a6] mb-12 leading-relaxed">
              The Operator Panel is the live control desk of your call system.
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                It shows who is available, who is busy, and where calls should go — in real time.
              </p>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                Instead of guessing or waiting, you see everything as it happens.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                What the Operator Panel Does
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                The Operator Panel helps you manage incoming and ongoing calls efficiently.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                From one screen, you can:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Monitor active and idle extensions</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">See call status in real time</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Understand call flow behavior instantly</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Control how calls are handled during busy hours</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                It acts as the central visibility layer of your PBX.
              </p>
              
              <img src="/doc_images/Operator_panel.png" alt="Operator Panel" className="w-full rounded-lg shadow-md mb-8" />
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Real-Time Call Visibility
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Every call has a state. The Operator Panel shows it clearly.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                You can instantly see:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Which extensions are free</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Which are ringing</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Which are on a call</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Which are offline or unavailable</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                This removes confusion and improves response speed.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Smarter Call Handling
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                When multiple calls arrive at the same time, the Operator Panel helps ensure no call is ignored.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                It allows you to:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Identify overloaded extensions</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Balance call distribution</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Reduce missed or dropped calls</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Maintain a smooth calling experience</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                No manual coordination is required.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Works With All Call Entry Points
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                The Operator Panel is not limited to traditional calls.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                It works seamlessly with:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click to Connect calls</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">HotScan QR calls</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Direct extension calls</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Inbound routes and ring groups</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                No matter how a call starts, it appears here.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Designed for Human Decisions
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                The Operator Panel does not automate decisions blindly.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                It supports human judgment by:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Showing live system status</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Reducing guesswork</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Enabling faster decisions during peak time</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                You stay in control. The system simply keeps you informed.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Who Should Use the Operator Panel
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                The Operator Panel is ideal for:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Front desk operators</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Call supervisors</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Business owners</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Support team leads</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                Anyone responsible for call handling benefits from this view.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Why It Matters
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Calls are time-sensitive. Visibility creates confidence.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                With the Operator Panel:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Customers wait less</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Teams respond faster</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Businesses operate calmly under pressure</li>
              </ul>
              
              <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-8">
                <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base text-center m-0">
                  When you can see what's happening, you can handle conversations better.
                </p>
              </div>
            </div>
          </div>
        );

      case 'extensions':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Extensions
            </h2>
            <p className="text-xl text-[#3c4043] dark:text-[#bdc1c6] mb-2">
              Create and manage users who make and receive calls
            </p>
            <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-8 leading-7">
              Extensions are the core calling accounts in SOHUB Connect. Each extension usually represents one agent, softphone, or desk device.
            </p>

            <div className="space-y-8">
              <section className="bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-2">Quick workflow</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">Create Extension → Assign Caller ID → Register on Softphone/IP Phone → Verify in Operator Panel</p>
                <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">This is the minimum setup path to make an extension live.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">What you can do here</h3>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Create new extensions</li>
                  <li>• View all existing extensions</li>
                  <li>• Assign caller IDs to extensions</li>
                  <li>• Activate or deactivate calling users</li>
                  <li>• Edit or delete extensions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Where to find Extensions</h3>
                <p className="text-[#3c4043] dark:text-[#bdc1c6] mb-2">Navigate to: <span className="font-medium">Voice → PBX → Extensions</span></p>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">You will see two tabs:</p>
                <ul className="space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4">
                  <li>• <span className="font-medium">Extensions</span> – View and manage existing extensions</li>
                  <li>• <span className="font-medium">Add Extension</span> – Create a new extension</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Extensions list view</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-3">In the <span className="font-medium">Extensions</span> tab, you can review all created users.</p>
                <img src="/doc_images/Extesion 02.png" alt="Extensions List" className="w-full rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-2">Columns explained</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Extension Type</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">Indicates the account type (usually "Extension").</p>
                  </div>
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Display Name</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">Name shown in Operator Panel and reports.</p>
                  </div>
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Caller ID</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">Number shown to recipients during outgoing calls.</p>
                  </div>
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Assigned User</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">SOHUB account or company linked to the extension.</p>
                  </div>
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Status</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">Active = can make/receive calls, Inactive = call access blocked.</p>
                  </div>
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Manage (⚙️ icon)</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">Edit extension settings.</p>
                  </div>
                  <div className="rounded-lg border border-[#dbe3ef] dark:border-[#3c4043] bg-[#f8fafc] dark:bg-[#202124] p-3 sm:col-span-2">
                    <span className="block text-sm font-semibold text-[#0f172a] dark:text-[#e8eaed]">Delete (🗑 icon)</span>
                    <p className="mt-1 text-sm leading-6 text-[#334155] dark:text-[#bdc1c6]">Permanently remove the extension.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Add a new extension</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-4">To create a new extension, open the <span className="font-medium">Add Extension</span> tab.</p>
                <img src="/doc_images/add_to_extension.png" alt="Add Extension" className="w-full rounded-lg shadow-md mb-4" />
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-3 sm:p-4 mb-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create Extension</p>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black"
                  >
                    <source src="/videos/documentation/Extension_create.mp4" type="video/mp4" />
                  </video>
                </div>
                <h4 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-3">Required fields</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-1">Extension No *</h5>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mb-1">Unique internal number for the extension.</p>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm">Examples: 101, 105, 2112</p>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm italic">Extension numbers must be unique.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-1">Display Name *</h5>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mb-1">The name of the user or extension.</p>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm">Examples: Support Agent, Marketing Agent, Sales Desk</p>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm italic">This name appears in the Operator Panel and call reports.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-1">Caller ID</h5>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mb-1">Select an approved caller ID from the dropdown list.</p>
                    <ul className="text-[#5f6368] dark:text-[#9aa0a6] text-sm space-y-1 ml-4">
                      <li>• This number will be displayed on outgoing calls</li>
                      <li>• Outgoing calls may fail if no caller ID is assigned</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-1">Extension Password *</h5>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mb-1">Password used to register the extension on a softphone or IP phone.</p>
                    <ul className="text-[#5f6368] dark:text-[#9aa0a6] text-sm space-y-1 ml-4">
                      <li>• The system automatically generates a password</li>
                      <li>• You can manually edit the password if needed</li>
                      <li>• Click the refresh (🔄) icon to regenerate a new password</li>
                    </ul>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm italic mt-1">Store this password securely. It is required for softphone/device setup.</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg">
                  <p className="text-[#202124] dark:text-[#e8eaed]">After completing the required fields, click <span className="font-medium">Create Extension</span>.</p>
                  <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm">The extension is created and activated immediately.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">After creating an extension</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">Recommended next steps:</p>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Configure the extension in a softphone or IP phone</li>
                  <li>• Assign the extension to an inbound route or ring group</li>
                  <li>• Verify the extension status in the Operator Panel</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Common issues to avoid</h3>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Duplicate extension numbers are not allowed</li>
                  <li>• Outgoing calls may not work without a caller ID</li>
                  <li>• Inactive extensions cannot receive calls</li>
                  <li>• Incorrect passwords will prevent softphone registration</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Not configured from this page</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">These configurations are outside the Extensions section:</p>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Call routing and IVR setup</li>
                  <li>• Inbound call flow design</li>
                  <li>• Billing and usage configuration</li>
                </ul>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mt-2">Use Inbound Route, Call Flow, and Reports sections for these tasks.</p>
              </section>
            </div>
          </div>
        );

      case 'inbound-route':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Inbound Route
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Control how incoming calls enter your system
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Inbound Routes define what happens when a call reaches your business. They connect an incoming call source to a Call Flow, such as ringing agents, playing an IVR, or forwarding calls.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Without an inbound route, incoming calls cannot be handled correctly.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is an Inbound Route?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">An Inbound Route is a rule that decides:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Which incoming call</li>
                  <li>• Goes to which call flow</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  It acts as the entry point between the outside world and your internal calling logic.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What you can do here</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Create inbound call routes</li>
                  <li>• Link numbers to call flows</li>
                  <li>• Activate or deactivate incoming call handling</li>
                  <li>• Manage how calls enter your PBX</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create an Inbound Route</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Navigate to: <span className="font-medium">Voice → PBX → Inbound Route</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Click <span className="font-medium">Add Inbound Route</span>, then fill in the following:</p>
                <img src="/doc_images/add_inbound_route.png" alt="Add Inbound Route Form" className="w-[75%] rounded-lg shadow-md mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Inbound Route Name *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">A descriptive name for easy identification.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Examples: Main Office, Support Line, Sales Number</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Select Caller ID *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Choose the incoming number that will receive calls.</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic">This must be an approved or active DID.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Select Call Flow *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Define how the call will be handled.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Examples: IVR, Ring Group, Extension, Time-based flow</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Route Status *</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Active — Calls will be received</li>
                      <li>• Inactive — Calls will not be handled</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-gray-700 dark:text-gray-300">Click <span className="font-medium">Save</span> to apply.</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Once active, the route starts working immediately.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Inbound Route List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">The Inbound Route list shows all configured routes with:</p>
                <img src="/doc_images/view_inbound_route.png?v=1" alt="View All Inbound Routes" className="w-full rounded-lg shadow-md mb-4" />
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created time</li>
                  <li>• Route name</li>
                  <li>• Incoming caller ID</li>
                  <li>• Assigned call flow</li>
                  <li>• Status (Active / Inactive)</li>
                  <li>• Edit and delete actions</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Use this list to quickly review or update how incoming calls are routed.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Use Cases</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Route a main business number to an IVR</li>
                  <li>• Send support calls to a ring group</li>
                  <li>• Direct calls to different flows based on time or department</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Every inbound route must have a call flow</li>
                  <li>• Inactive routes will not receive calls</li>
                  <li>• A caller ID can only be used in one inbound route at a time</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Inbound Routes decide where conversations begin.
                </p>
              </div>
            </div>
          </div>
        );

      case 'outbound-route':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Outbound Route
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Control how calls leave your system
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Outbound Routes define how extensions make outgoing calls, which destination they can dial, and which caller ID is used.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Without an outbound route, extensions cannot place external calls.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is an Outbound Route?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">An Outbound Route is a rule that decides:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Which extensions can make calls</li>
                  <li>• Where they can call (destination)</li>
                  <li>• Which caller ID is shown</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  It acts as the exit point for outbound communication.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create an Outbound Route</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Navigate to: <span className="font-medium">Voice → PBX → Outbound Route → Add Outbound Route</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Fill in the following fields:</p>
                <img src="/doc_images/add_outbound_rooute.png" alt="Add Outbound Route Form" className="w-[75%] rounded-lg shadow-md mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Outbound Route Name *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">A descriptive name for the route.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Example: BD Route – Bangladesh, International Route</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Route Destination *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Defines where calls can be placed.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Example: Bangladesh, Specific country or region</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Caller ID *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">The number displayed on outgoing calls.</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic">Only approved and active caller IDs can be selected.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Allowed Extensions *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Select which extensions are permitted to use this route.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Route Status</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Active — Route is available for outbound calls</li>
                      <li>• Inactive — Route is disabled</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-gray-700 dark:text-gray-300">Click <span className="font-medium">Save</span> to apply the route.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Outbound Route List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">The Outbound Route list displays all configured routes with:</p>
                <img src="/doc_images/view_outbound_route.png?v=1" alt="View All Outbound Routes" className="w-full rounded-lg shadow-md mb-4" />
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created time</li>
                  <li>• Route name</li>
                  <li>• Destination</li>
                  <li>• Caller ID</li>
                  <li>• Allowed extensions</li>
                  <li>• Assigned organization</li>
                  <li>• Status (Active / Inactive)</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Actions</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• ✏️ Edit — Modify route settings</li>
                    <li>• 🗑️ Delete — Remove the route</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Notes & Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Always create extensions before configuring outbound routes</li>
                  <li>• Use approved caller IDs only</li>
                  <li>• Test outbound calling after setup</li>
                  <li>• Use clear route names for easy identification</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Outbound Routes control how your voice reaches the world.
                </p>
              </div>
            </div>
          </div>
        );

      case 'ring-group':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Ring Group
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Route incoming calls to multiple extensions efficiently
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300">
                  Ring Groups allow incoming calls to ring multiple extensions at once or in a defined strategy, ensuring calls are answered quickly by available team members.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is a Ring Group?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  A Ring Group is a call distribution method that sends one incoming call to multiple extensions based on a selected ring strategy.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Common use cases:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Sales team answering a shared number</li>
                  <li>• Support desk handling customer calls</li>
                  <li>• Any team where the first available agent should answer</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Access Ring Group</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Navigate to: <span className="font-medium">Call Management → Ring Group</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">You will see two tabs:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Ring Groups</span> — View and manage existing ring groups</li>
                  <li>• <span className="font-medium">Add Ring Group</span> — Create a new ring group</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a Ring Group</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">To create a new ring group, click <span className="font-medium">Add Ring Group</span> and fill in the following fields:</p>
                <img src="/doc_images/ring_group1.png" alt="Ring Group Form" className="w-[40%] rounded-lg shadow-md mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Group Description *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">A clear name for the ring group.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Examples: Sales Team, Support Desk, Billing Group</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Extension List *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Select the extensions that should receive calls.</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Use Quick Select Extension to add extensions</li>
                      <li>• Selected extensions appear in the list</li>
                      <li>• Click Clear to remove all selections</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Ring Strategy *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Defines how calls are distributed:</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-4">• <span className="font-medium">Ring All</span> — All selected extensions ring simultaneously</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Ring Time *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">How long the extensions will ring before the call moves forward or ends.</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Minimum: 5 seconds</li>
                      <li>• Maximum: 300 seconds</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Music on Hold</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">What the caller hears while waiting:</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-4">• <span className="font-medium">Ring</span> — Standard ringing tone</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Ring Group Status</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Active — Can receive calls</li>
                      <li>• Inactive — Will not receive calls</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-gray-700 dark:text-gray-300">Click <span className="font-medium">Create Ring Group</span> to save, or <span className="font-medium">Cancel</span> to discard changes.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ring Group List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">The Ring Groups page shows all configured groups with:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created time</li>
                  <li>• Group number (system-generated)</li>
                  <li>• Group description</li>
                  <li>• Extension list</li>
                  <li>• Ring strategy</li>
                  <li>• Ring time</li>
                  <li>• Music on hold</li>
                  <li>• Assigned account</li>
                  <li>• Status (Active / Inactive)</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Actions</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• ✏️ Edit — Update ring group settings</li>
                    <li>• 🗑️ Delete — Permanently remove the ring group</li>
                  </ul>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                  Use the Search box and page size controls to manage large lists easily.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Edit or Delete a Ring Group</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Click <span className="font-medium">Edit</span> to modify extensions, strategy, or timing</li>
                  <li>• Click <span className="font-medium">Delete</span> to remove the ring group permanently</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 italic">
                  Deleting a ring group may affect inbound call routing.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use clear and meaningful group names</li>
                  <li>• Avoid adding too many extensions to one ring group</li>
                  <li>• Review inactive or unused ring groups regularly</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Ring Groups help your team respond faster—so no call goes unanswered.
                </p>
              </div>
            </div>
          </div>
        );

      case 'closed-user-group':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Closed User Group (CUG)
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Control who your system can talk to
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Closed User Group (CUG) lets you create a private, approved list of contact numbers. Only these numbers can be used or recognized under specific calling rules.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  It's designed for secure, controlled communication—nothing extra, nothing accidental.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why CUG Exists</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Not every number should be reachable.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">CUG is commonly used to:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Restrict calling to approved numbers only</li>
                  <li>• Manage internal or trusted external contacts</li>
                  <li>• Apply special call rules for a defined group</li>
                  <li>• Reduce misuse, errors, and unwanted calls</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  Think of it as a trusted contact boundary inside your PBX.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Access Closed User Group</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Navigate to: <span className="font-medium">Voice → PBX → Closed User Group (CUG)</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">You'll see three tabs:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Closed User Groups</span> — View and manage contacts</li>
                  <li>• <span className="font-medium">Add Contact</span> — Add a single contact manually</li>
                  <li>• <span className="font-medium">Upload Contacts</span> — Bulk upload using CSV</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add Contact (Manual)</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Use this when adding one contact at a time.</p>
                <img src="/doc_images/CUG_add.png" alt="Add Contact Form" className="w-[75%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Steps:</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Open <span className="font-medium">Add Contact</span></li>
                  <li>2. Enter:
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• <span className="font-medium">Contact Name</span> — A recognizable name</li>
                      <li>• <span className="font-medium">Contact Number</span> — Full number (no spaces or symbols)</li>
                    </ul>
                  </li>
                  <li>3. Click <span className="font-medium">Add Contact</span></li>
                </ol>
                <div className="mt-3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notes:</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                    <li>• Numbers must be in complete format</li>
                    <li>• Duplicate numbers are not allowed</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upload Contacts (Bulk)</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Use this for large contact lists.</p>
                <img src="/doc_images/CUG_upload.png" alt="Upload Contacts" className="w-[75%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Steps:</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Open <span className="font-medium">Upload Contacts</span></li>
                  <li>2. Download the sample CSV</li>
                  <li>3. Fill in contact details following the sample format</li>
                  <li>4. Upload the completed CSV file</li>
                  <li>5. Click <span className="font-medium">Upload</span></li>
                </ol>
                <div className="mt-3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tips:</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                    <li>• Follow the exact CSV format</li>
                    <li>• Invalid or duplicate numbers may be skipped automatically</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Closed User Group List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">The list shows all saved contacts with:</p>
                <img src="/doc_images/cug1.png?v=1" alt="Closed User Group List" className="w-[75%] rounded-lg shadow-md mb-4" />
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created date</li>
                  <li>• Contact name</li>
                  <li>• Contact number</li>
                  <li>• Assigned user or account</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Actions</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• ✏️ Edit — Update contact details</li>
                    <li>• 🗑️ Delete — Remove the contact permanently</li>
                  </ul>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                  Use search and pagination to manage large lists easily.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Keep the list clean and updated</li>
                  <li>• Remove unused or outdated contacts</li>
                  <li>• Use bulk upload for faster setup</li>
                  <li>• Double-check numbers to avoid call failures</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  CUG keeps communication intentional—only the right numbers, at the right time.
                </p>
              </div>
            </div>
          </div>
        );

      case 'caller-ids':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Caller IDs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              The identity shown when you call
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Caller IDs define which phone number is displayed to recipients during outbound calls from Sohub Connect. They help build trust, brand recognition, and consistent call identity.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Every outbound call must use a valid, active Caller ID.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why Caller IDs Matter</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">People answer calls they recognize.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Caller IDs ensure:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Trust on outbound calls</li>
                  <li>• Brand-consistent communication</li>
                  <li>• Compliance with carrier rules</li>
                  <li>• Controlled call identity per route or extension</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Caller ID List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">This page shows all configured Caller IDs.</p>
                <img src="/doc_images/callerid.png?v=1" alt="Caller ID List" className="w-full rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each entry includes:</p>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Created Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the Caller ID was added</p>
                  </div>
                  <div>
                    <span className="font-medium">Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Internal display name for easy identification</p>
                  </div>
                  <div>
                    <span className="font-medium">Caller ID</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The phone number shown to call recipients</p>
                  </div>
                  <div>
                    <span className="font-medium">Channels</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Number of simultaneous outbound calls allowed</p>
                  </div>
                  <div>
                    <span className="font-medium">Status</span>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 mt-1">
                      <li>• Active — Can be used for outbound calls</li>
                      <li>• Inactive — Disabled</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Assigned User</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">User or organization the Caller ID belongs to</p>
                  </div>
                  <div>
                    <span className="font-medium">Action</span>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 mt-1">
                      <li>• Edit — Update Caller ID details</li>
                      <li>• Delete — Remove the Caller ID</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add Caller ID</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Register a new Caller ID for outbound calling.</p>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Steps</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Navigate to <span className="font-medium">Caller IDs</span></li>
                  <li>2. Click <span className="font-medium">Add Caller ID</span></li>
                  <li>3. Fill in the required fields:
                    <ul className="ml-4 mt-2 space-y-2">
                      <li>• <span className="font-medium">Select Trunk</span> — Choose an approved trunk (Caller IDs must be linked to a trunk)</li>
                      <li>• <span className="font-medium">Name</span> — Internal name for identification</li>
                      <li>• <span className="font-medium">Caller ID</span> — Phone number shown to recipients</li>
                      <li>• <span className="font-medium">Channels</span> — Maximum number of concurrent outbound calls</li>
                      <li>• <span className="font-medium">Status</span> — Enable or disable the Caller ID</li>
                    </ul>
                  </li>
                  <li>4. Click <span className="font-medium">Add Caller ID</span> to save</li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  The Caller ID becomes available immediately if active.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Only approved trunks can be used</li>
                  <li>• Inactive Caller IDs cannot place calls</li>
                  <li>• Channel limits control call concurrency</li>
                  <li>• Outbound calls may fail without a valid Caller ID</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use recognizable numbers to improve answer rates</li>
                  <li>• Match Caller IDs with correct outbound routes</li>
                  <li>• Set channel limits based on expected call volume</li>
                  <li>• Keep unused Caller IDs inactive or removed</li>
                </ul>
              </section>
            </div>
          </div>
        );

      case 'sound-files':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Sound Files
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Custom audio used in your call experience
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Sound Files let you upload and manage audio such as IVR greetings, announcements, and voice prompts that are played during calls. They help guide callers clearly and create a consistent brand voice.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Sound Files Are Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Sound files can be used across different voice features, including:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• IVR menus</li>
                  <li>• Call flows</li>
                  <li>• Ring groups</li>
                  <li>• Announcements and prompts</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  If a caller hears something — it starts here.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add a Sound File</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Upload a new audio file for use in call flows.</p>
                <img src="/doc_images/sound_file.png?v=1" alt="Add Sound File" className="w-[75%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Steps</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Navigate to <span className="font-medium">Dashboard → Sound Files</span></li>
                  <li>2. Click <span className="font-medium">Add Sound File</span></li>
                  <li>3. Enter a <span className="font-medium">Sound Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">A clear name to identify the audio (e.g., Welcome Message, Office Closed)</p>
                  </li>
                  <li>4. Upload the audio file
                    <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Drag and drop the file, or</li>
                      <li>• Click the upload area to select a file</li>
                    </ul>
                  </li>
                  <li>5. Click <span className="font-medium">Save</span></li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  The file is uploaded and prepared for use automatically.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Supported Formats</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• MP3</li>
                  <li>• WAV</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">All uploaded files are automatically converted to:</p>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                    <li>• 8kHz</li>
                    <li>• 16-bit</li>
                    <li>• Mono WAV</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    This ensures full telephony compatibility and stable playback quality.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sound Files List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">The Sound Files page shows all uploaded audio files.</p>
                <img src="/doc_images/sound02.png?v=1" alt="Sound Files List" className="w-[73%] rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each entry includes:</p>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Created Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the sound file was uploaded</p>
                  </div>
                  <div>
                    <span className="font-medium">Sound Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Name assigned to the audio</p>
                  </div>
                  <div>
                    <span className="font-medium">Sound File</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Built-in player to preview the audio</p>
                  </div>
                  <div>
                    <span className="font-medium">Assigned User</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">User or account the sound file belongs to</p>
                  </div>
                  <div>
                    <span className="font-medium">Status</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Indicates whether the sound file is active</p>
                  </div>
                  <div>
                    <span className="font-medium">Verify</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Confirms the file is valid and ready for use</p>
                  </div>
                  <div>
                    <span className="font-medium">Action</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delete the sound file if it is no longer needed</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Only verified sound files can be used in call flows</li>
                  <li>• Audio is optimized automatically — no manual conversion needed</li>
                  <li>• Deleted sound files cannot be recovered</li>
                  <li>• Renaming files clearly helps avoid IVR confusion later</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Keep messages short and clear</li>
                  <li>• Avoid background noise and music-heavy audio</li>
                  <li>• Use consistent voice tone across all prompts</li>
                  <li>• Preview audio before assigning it to live call flows</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Clear audio reduces confusion. Simple voices guide better conversations.
                </p>
              </div>
            </div>
          </div>
        );

      case 'text-to-speech':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Text to Speech (TTS)
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Turn written text into spoken voice
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Text to Speech (TTS) lets you convert text into natural-sounding audio that can be used in IVR messages, announcements, and automated call flows — without recording or uploading audio files.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Write once. Speak everywhere.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What TTS Is Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">TTS is commonly used for:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• IVR greetings and menu prompts</li>
                  <li>• Automated announcements</li>
                  <li>• Dynamic call flow messages</li>
                  <li>• Multilingual voice messages</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  It removes the need for manual voice recording.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add a Text to Speech Entry</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Create a new TTS voice message.</p>
                <img src="/doc_images/text_to_speech_02.png" alt="Add TTS Entry" className="w-[75%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Steps</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Navigate to <span className="font-medium">Dashboard → Text to Speech</span></li>
                  <li>2. Click <span className="font-medium">Add TTS</span></li>
                  <li>3. Enter a <span className="font-medium">Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">A clear identifier (e.g., Welcome Message, Office Hours Notice)</p>
                  </li>
                  <li>4. Enter the <span className="font-medium">TTS Text</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">The text you want the system to speak</p>
                  </li>
                  <li>5. Select the <span className="font-medium">Language</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Example: English, Bangla</p>
                  </li>
                  <li>6. Click <span className="font-medium">Save</span></li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  The system instantly converts the text into voice and makes it available for use.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">TTS List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">The TTS list shows all created TTS entries.</p>
                <img src="/doc_images/text_to_speech.png" alt="TTS List" className="w-[75%] rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each entry includes:</p>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Created Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the TTS entry was created</p>
                  </div>
                  <div>
                    <span className="font-medium">Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Identifier for the TTS message</p>
                  </div>
                  <div>
                    <span className="font-medium">TTS Text</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The text that will be converted into speech</p>
                  </div>
                  <div>
                    <span className="font-medium">Language</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Selected language for voice generation</p>
                  </div>
                  <div>
                    <span className="font-medium">Assigned User</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">User or role associated with the TTS</p>
                  </div>
                  <div>
                    <span className="font-medium">Action</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Edit, lock, or delete the TTS entry (based on permissions)</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Using TTS in Call Flows</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Once created, TTS entries can be:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Selected directly in IVR menus</li>
                  <li>• Used in call flow steps</li>
                  <li>• Updated anytime without re-uploading audio</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  Change the text → voice updates automatically.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Keep sentences short and clear</li>
                  <li>• Avoid abbreviations and symbols</li>
                  <li>• Use punctuation for natural pauses</li>
                  <li>• Create separate TTS entries for different languages</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Clear words create clear conversations.
                </p>
              </div>
            </div>
          </div>
        );

      case 'quick-call':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Quick Call
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Instant outbound calls without setup
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Quick Call lets you place an immediate outbound call to any number using a selected Caller ID and play a predefined Sound File or Text to Speech (TTS) message — without creating a full call flow.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  It's designed for speed, testing, and quick communication.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Quick Call Is Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Quick Call is commonly used to:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Test sound files or TTS messages</li>
                  <li>• Verify Caller ID and trunk configuration</li>
                  <li>• Make quick announcement calls</li>
                  <li>• Place instant outbound calls without routing setup</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  If you just need to call and play a message — this is the fastest way.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Access Quick Call</h3>
                <p className="text-gray-700 dark:text-gray-300">Navigate to: <span className="font-medium">Dashboard → Quick Call</span></p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Call Fields</h3>
                <img src="/doc_images/quick_call.png" alt="Quick Call" className="w-[75%] rounded-lg shadow-md mb-4" />
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Call To *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Enter the destination phone number.</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• The number must be valid</li>
                      <li>• Must be reachable based on your trunk configuration</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Caller ID *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Select the Caller ID to display to the recipient.</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Only active and assigned Caller IDs appear</li>
                      <li>• Outbound calls require a valid Caller ID</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Select Play Type *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Choose what audio will play during the call:</p>
                    <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1 ml-4">
                      <li>• <span className="font-medium">Sound File</span> – Plays a pre-uploaded audio file</li>
                      <li>• <span className="font-medium">Text to Speech (TTS)</span> – Plays saved TTS content</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Select Sound File *</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">(Visible when Sound File is selected)</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• Choose an active sound file</li>
                      <li>• The selected audio plays immediately after the call connects</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Make a Quick Call</h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Enter the <span className="font-medium">Call To</span> number</li>
                  <li>2. Select a <span className="font-medium">Caller ID</span></li>
                  <li>3. Choose a <span className="font-medium">Play Type</span></li>
                  <li>4. Select a <span className="font-medium">Sound File</span> or <span className="font-medium">TTS</span></li>
                  <li>5. Click <span className="font-medium">Call Now</span></li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  The system instantly places the call and plays the selected audio.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Call History</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Below the form, you can see a history of Quick Calls.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each record shows:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Created Time</span> – When the call was initiated</li>
                  <li>• <span className="font-medium">Call To</span> – Destination number</li>
                  <li>• <span className="font-medium">Caller ID</span> – Caller ID used</li>
                  <li>• <span className="font-medium">Play Strategy</span> – Sound File or TTS</li>
                  <li>• <span className="font-medium">Assigned User</span> – User who initiated the call</li>
                  <li>• <span className="font-medium">Action</span> – Delete record (does not affect call logs)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Quick Call does not create permanent call flows</li>
                  <li>• Deleting history does not delete call records</li>
                  <li>• Calls will fail if Caller ID or trunk is misconfigured</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  When you need a call now — don't build, just connect.
                </p>
              </div>
            </div>
          </div>
        );

      case 'customer-inquiries':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              
              Customer Inquiries
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                The Customer Inquiries module displays all incoming leads generated from HotScan widgets, 
                helping admins and agents track, follow up, and manage customer inquiries effectively.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Information Displayed</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { field: 'Created At', desc: 'Date and time when inquiry was submitted' },
                  { field: 'Customer Name', desc: 'Name provided by the visitor' },
                  { field: 'Phone', desc: 'Contact phone number' },
                  { field: 'Email', desc: 'Email address for follow-up' },
                  { field: 'Company', desc: 'Company or organization name' },
                  { field: 'Location', desc: 'Geographic location of customer' },
                  { field: 'Message', desc: 'Inquiry details and requirements' },
                  { field: 'Status', desc: 'Current inquiry status (New, In Progress, Closed)' },
                  { field: 'Assigned To', desc: 'Agent responsible for follow-up' },
                  { field: 'Profile ID', desc: 'Unique customer profile identifier' }
                ].map((item) => (
                  <div key={item.field} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-medium text-green-900 dark:text-green-300">{item.field}</div>
                    <div className="text-sm text-green-700 dark:text-green-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-8">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">Use Case Example</h4>
              <div className="space-y-3">
                {[
                  'A visitor opens the HotScan widget on a website',
                  'The visitor submits contact details or initiates a call',
                  'The system routes the call using the assigned call flow',
                  'The inquiry is logged under Customer Inquiries',
                  'An agent follows up with the lead'
                ].map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="keep-white-text flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <p className="text-blue-800 dark:text-blue-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Management Features</h4>
                <div className="space-y-3">
                  {[
                    'View all incoming inquiries in one place',
                    'Filter inquiries by status and date',
                    'Assign inquiries to specific agents',
                    'Track follow-up activities',
                    'Update inquiry status and notes',
                    'Export inquiry data for analysis'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Benefits</h4>
                <div className="space-y-3">
                  {[
                    'Never miss a potential customer',
                    'Organized lead management system',
                    'Improved response times',
                    'Better customer service tracking',
                    'Enhanced sales conversion rates',
                    'Comprehensive inquiry analytics'
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'call-flow':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Call Flow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Design how calls move. Visually.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Call Flow lets you control what happens when a call starts — without code, scripts, or complexity. Using simple building blocks, you can design IVRs, routing logic, announcements, and call handling exactly the way your business needs.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Think of Call Flow as the brain of your calling system.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Call Flow Is Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Call Flow is used to:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Design IVR menus</li>
                  <li>• Route incoming calls to teams or users</li>
                  <li>• Play greetings or announcements</li>
                  <li>• Control call order and fallback logic</li>
                  <li>• Handle calls visually, not technically</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  If a call needs logic — it lives here.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Access Call Flow</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Navigate to: <span className="font-medium">Call Flow</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">You will see two tabs:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Call Flow List</span> – View, edit, or delete existing call flows</li>
                  <li>• <span className="font-medium">Create Call Flow</span> – Build a new call flow from scratch</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a New Call Flow</h3>
                <img src="/doc_images/call_flow.png" alt="Call Flow" className="w-[73%] rounded-lg shadow-md mb-4" />
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Click <span className="font-medium">Create Call Flow</span></li>
                  <li>2. In <span className="font-medium">Start Call Flow</span>, enter a <span className="font-medium">Flow Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Example: Main IVR, Support Flow, Office Hours</p>
                  </li>
                  <li>3. The visual flow builder opens</li>
                  <li>4. Add steps by connecting blocks vertically</li>
                  <li>5. Click <span className="font-medium">Save</span> anytime to store progress</li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Changes are saved without interrupting live calls until the flow is applied.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Call Flow Building Blocks</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Each block defines what happens next in the call.</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Dial</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Connects the call to users or teams.</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Use Dial to:</p>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                      <li>• Ring a Ring Group</li>
                      <li>• Route calls to extensions</li>
                      <li>• Create fallback routing</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Common use: Ring Sales → if unanswered → ring Support</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic mt-1">You can add multiple Dial steps in sequence.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Playback</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Plays a pre-recorded audio message.</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Use Playback to:</p>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                      <li>• Play greetings</li>
                      <li>• Announce information</li>
                      <li>• Guide callers</li>
                    </ul>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic mt-2">Playback uses audio from Sound Files.</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Example: "Thank you for calling. Please wait while we connect you."</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Menu (IVR)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Creates an interactive menu for callers.</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Use Menu to:</p>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                      <li>• Offer options like "Press 1 for Sales"</li>
                      <li>• Route callers based on keypress</li>
                      <li>• Reduce manual call handling</li>
                    </ul>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic mt-2">Each menu option can connect to another block.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hangup</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Ends the call.</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Use Hangup to:</p>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                      <li>• Close a completed call</li>
                      <li>• End calls after announcements</li>
                      <li>• Prevent infinite routing loops</li>
                    </ul>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic mt-2">Simple, intentional endings matter.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How Call Flow Works Together</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">A typical flow looks like:</p>
                <p className="text-gray-600 dark:text-gray-400 font-mono ml-4">Playback → Menu → Dial → Hangup</p>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Each block connects to the next, creating a clear and predictable call journey.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Keep flows simple and readable</li>
                  <li>• Use clear audio and short messages</li>
                  <li>• Always define a fallback path</li>
                  <li>• Test flows before assigning them to live numbers</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Call Flow Does Not Do</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Call Flow does not:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Manage extensions or users</li>
                  <li>• Handle billing or usage</li>
                  <li>• Replace inbound or outbound routes</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  It controls logic, not accounts.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Good call flows don't feel automated. They feel obvious.
                </p>
              </div>
            </div>
          </div>
        );
      case 'approved-trunks':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Approved Trunks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Your approved connection to the outside world
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Approved Trunks show the list of SIP / PSTN trunks that have been requested by a customer and approved by Sohub or the telecom provider. These trunks are required to send and receive calls in Sohub Connect.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Until a trunk is approved, it stays inactive—and cannot be used.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why Approved Trunks Matter</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Calls don't happen without a trusted carrier.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Approved Trunks ensure:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Secure, verified telecom connections</li>
                  <li>• Regulatory compliance</li>
                  <li>• Stable inbound and outbound calling</li>
                  <li>• Clean separation between request and usage</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  Only approved trunks can carry real calls.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Access Approved Trunks</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Navigate to: <span className="font-medium">Voice → Approved Trunks</span></p>
                <p className="text-gray-600 dark:text-gray-400">
                  This page shows all trunk requests and their current status.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Trunk List Overview</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each trunk entry includes:</p>
                <img src="/doc_images/approve_trunks.png?v=1" alt="Approved Trunks List" className="w-full rounded-lg shadow-md mb-4" />
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Requested Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the trunk was requested</p>
                  </div>
                  <div>
                    <span className="font-medium">Approved Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When it was approved. Shows "Not Approved Yet" if still pending</p>
                  </div>
                  <div>
                    <span className="font-medium">Merchant No</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The company or account the trunk belongs to</p>
                  </div>
                  <div>
                    <span className="font-medium">Provider</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Telecom or SIP provider name</p>
                  </div>
                  <div>
                    <span className="font-medium">Trunk Number</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Main DID or number assigned by the provider</p>
                  </div>
                  <div>
                    <span className="font-medium">Trunk Username / Password</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">SIP credentials (Passwords are hidden for security)</p>
                  </div>
                  <div>
                    <span className="font-medium">Trunk Host</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">SIP server or carrier host address</p>
                  </div>
                  <div>
                    <span className="font-medium">Status</span>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 mt-1">
                      <li>• Pending — Under review</li>
                      <li>• Active — Approved and usable</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Action</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delete — Remove the request (if allowed)</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Trunk Approval Flow</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Every trunk follows the same lifecycle:</p>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. <span className="font-medium">Requested</span> — Customer submits a trunk request</li>
                  <li>2. <span className="font-medium">Pending</span> — Sohub or the provider reviews the request</li>
                  <li>3. <span className="font-medium">Active</span> — Trunk is approved and ready for use</li>
                </ol>
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Only <span className="font-medium">Active</span> trunks can be used in:</p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• Inbound Routes</li>
                    <li>• Outbound Routes</li>
                    <li>• Call Flow configurations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Pending trunks cannot make or receive calls</li>
                  <li>• SIP credentials are partially hidden for safety</li>
                  <li>• Trunk details should never be shared publicly</li>
                  <li>• If approval is delayed, contact Sohub support</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Verify provider details before requesting a trunk</li>
                  <li>• Use only Active trunks when setting up routes</li>
                  <li>• Review trunk status regularly to avoid call failures</li>
                </ul>
              </section>
            </div>
          </div>
        );
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              
              PBX (Private Branch Exchange)
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                PBX system manages internal and external call routing, providing enterprise-level telephony features 
                for your organization.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {sections.find(s => s.id === 'voice')?.children?.find(sub => sub.id === 'pbx')?.children?.map((child) => {
                  const Icon = child.icon;
                  return (
                    <div
                      key={child.id}
                      onClick={() => selectSection(child.id)}
                      className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <Icon className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-purple-900 dark:text-purple-300 text-sm">{child.title}</h4>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Core PBX Features</h4>
                  <div className="space-y-3">
                    {[
                      { feature: 'Call Routing', desc: 'Intelligent call distribution to extensions' },
                      { feature: 'Auto Attendant', desc: 'Automated call answering and menu system' },
                      { feature: 'Call Queuing', desc: 'Manage high call volumes efficiently' },
                      { feature: 'Call Transfer', desc: 'Seamless call transfers between extensions' },
                      { feature: 'Conference Calling', desc: 'Multi-party conference capabilities' },
                      { feature: 'Voicemail System', desc: 'Individual and group voicemail boxes' }
                    ].map((item) => (
                      <div key={item.feature} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="font-medium text-purple-900 dark:text-purple-300">{item.feature}</div>
                        <div className="text-sm text-purple-700 dark:text-purple-400">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced Features</h4>
                  <div className="space-y-3">
                    {[
                      { feature: 'IVR Integration', desc: 'Interactive Voice Response menus' },
                      { feature: 'Call Recording', desc: 'Record calls for quality and compliance' },
                      { feature: 'Real-time Monitoring', desc: 'Live call supervision and analytics' },
                      { feature: 'Failover Protection', desc: 'Automatic backup and redundancy' },
                      { feature: 'SIP Trunking', desc: 'Connect to external phone networks' },
                      { feature: 'Mobile Integration', desc: 'Extend PBX to mobile devices' }
                    ].map((item) => (
                      <div key={item.feature} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="font-medium text-green-900 dark:text-green-300">{item.feature}</div>
                        <div className="text-sm text-green-700 dark:text-green-400">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'click-to-connect':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Click to Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Turn website intent into real conversation.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Click to Connect lets visitors start a voice call instantly from your website.
                  One click triggers your configured call flow and routes the call to the right team.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Animated Demo Flow</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Demo sequence: cursor moves to call button, opens confirmation popup, clicks <span className="font-medium">Yes</span>, then call state changes to <span className="font-medium">Calling...</span>
                </p>
                <div className="docs-c2c-demo-shell bg-gradient-doc-modal">
                  <article className="docs-c2c-demo-browser bg-gradient-doc-modal">
                    <header className="docs-c2c-demo-topbar bg-gradient-doc-modal">
                      <span className="docs-c2c-dot bg-[#f87171]" />
                      <span className="docs-c2c-dot bg-[#fbbf24]" />
                      <span className="docs-c2c-dot bg-[#34d399]" />
                      <p className="flex-1 min-w-0 truncate text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 ml-2 mb-0">
                        https://your-site.example
                      </p>
                    </header>

                    <main className="docs-c2c-demo-page bg-gradient-doc-modal">
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-1">Website Home Page</h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-0">
                        Visitors browse the page and can start a call instantly.
                      </p>
                    </main>

                    <button type="button" className="docs-c2c-call-btn keep-white-text" aria-label="Call button demo">
                      <Phone className="docs-c2c-call-icon docs-c2c-call-icon-idle w-5 h-5" />
                      <PhoneCall className="docs-c2c-call-icon docs-c2c-call-icon-calling w-5 h-5" />
                    </button>

                    <span className="docs-c2c-ripple docs-c2c-ripple-a" />
                    <span className="docs-c2c-ripple docs-c2c-ripple-b" />

                    <aside className="docs-c2c-confirm-popup bg-gradient-doc-modal">
                      <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white mb-3">
                        Do you want to call?
                      </p>
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" className="docs-c2c-popup-btn docs-c2c-popup-no">No</button>
                        <button type="button" className="docs-c2c-popup-btn docs-c2c-popup-yes keep-white-text">Yes</button>
                      </div>
                    </aside>

                    <span className="docs-c2c-cursor" />
                    <span className="docs-c2c-click-pulse" />
                  </article>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Before You Begin</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Configure these first:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Extensions</span> for users/devices who receive calls</li>
                  <li>• <span className="font-medium">Ring Group</span> to define call distribution strategy</li>
                  <li>• <span className="font-medium">Call Flow</span> to route calls (Ring Group/IVR/Queue/Extension/Voicemail)</li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Example: Support Team -&gt; Extensions 101, 102, 103
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How This Connects to Click to Connect
                </h3>
                <div className="docs-c2c-flow-card relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-5 sm:p-6 shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
                  <div className="docs-c2c-glow pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blue-200/35 dark:bg-blue-500/20 blur-2xl" />
                  <div className="docs-c2c-glow pointer-events-none absolute -bottom-14 -left-16 w-40 h-40 rounded-full bg-indigo-200/35 dark:bg-indigo-500/20 blur-2xl" />

                  <p className="relative text-sm text-slate-600 dark:text-slate-300 mb-5">
                    When a visitor clicks, the request follows this exact routing path:
                    <span className="block mt-1 font-medium text-slate-800 dark:text-slate-100">
                      Visitor Click -&gt; Widget -&gt; Call Flow -&gt; Ring Group -&gt; Extensions
                    </span>
                  </p>

                  <div className="relative flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
                    <div className="docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">01</span>
                        <MousePointer className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Visitor Click</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Customer taps the call button</p>
                    </div>

                    <div className="docs-c2c-flow-connector flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">02</span>
                        <Code className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Click to Connect Widget</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">The widget forwards the request to routing</p>
                    </div>

                    <div className="docs-c2c-flow-connector flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">03</span>
                        <Settings className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Call Flow</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Routing logic determines the destination</p>
                    </div>

                    <div className="docs-c2c-flow-connector flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">04</span>
                        <Route className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Ring Group</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Team members are selected by strategy</p>
                    </div>

                    <div className="docs-c2c-flow-connector flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-c2c-flow-step docs-c2c-flow-step-final flex-1 rounded-xl border border-emerald-200/80 dark:border-emerald-700 bg-emerald-50/70 dark:bg-emerald-900/20 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-semibold px-1.5">05</span>
                        <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Extensions</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Agents receive and answer the call</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a Widget (3 Steps)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Navigate to: <span className="font-medium">Dashboard → Click to Connect → Create Click to Connect</span>
                </p>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Basic Info: add widget name and choose call flow</li>
                  <li>2. Styling: set state design (initial/dialing/calling/end)</li>
                  <li>3. Preview & Submit: review and publish</li>
                </ol>
                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create Click to Connect</p>
                  <video
                    src="/videos/documentation/create_c2c.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mt-4">
                  <img src="/doc_images/click_to_connect_step1.png" alt="Click to Connect Step 1" className="w-full rounded-lg shadow-md" />
                  <img src="/doc_images/c2c_step2.png" alt="Click to Connect Step 2" className="w-full rounded-lg shadow-md" />
                  <img src="/doc_images/c2c_step3.png" alt="Click to Connect Step 3" className="w-full rounded-lg shadow-md" />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Publish & Manage</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Use <span className="font-medium">View Script</span> to copy embed code</li>
                  <li>• Paste script before closing <span className="font-medium">&lt;/body&gt;</span> tag</li>
                  <li>• Manage widgets from list: view, edit, or delete</li>
                  <li>• Use cases: support, sales inquiry, helpdesk</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• At least one call flow is required before widget creation</li>
                  <li>• Widget changes apply instantly after saving</li>
                  <li>• Routing follows the configured call flow path</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  When interest appears, conversation should already be waiting.
                </p>
              </div>
            </div>
          </div>
        );

      case 'hotscan':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              HotScan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Turn scans into conversations.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  HotScan lets customers connect with your business instantly by scanning a QR code.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  No phone numbers. No typing. Just Scan -&gt; Connect -&gt; Talk.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Perfect for offline and physical touchpoints:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Posters</li>
                  <li>• Product packaging</li>
                  <li>• Storefronts</li>
                  <li>• Invoices</li>
                  <li>• Delivery slips</li>
                  <li>• Print materials</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  If Click to Connect is for websites, HotScan is for the real world.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Animated Demo Flow</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Billboard/poster QR scan journey: scan, open, call, and connected calling state.
                </p>

                <div className="docs-hs-anim-shell">
                  <article className="docs-hs-anim-stage" aria-label="HotScan poster to call animation">
                    <div className="docs-hs-anim-poster">
                      <span className="docs-hs-anim-pin docs-hs-anim-pin-a" />
                      <span className="docs-hs-anim-pin docs-hs-anim-pin-b" />
                      <div className="docs-hs-anim-poster-sheet">
                        <p className="docs-hs-anim-poster-kicker mb-1">ABC AGENCY</p>
                        <p className="docs-hs-anim-poster-title mb-1">Need Help Fast?</p>
                        <p className="docs-hs-anim-poster-sub mb-3">Scan the code and call instantly</p>

                        <div className="docs-hs-anim-poster-grid">
                          <div className="docs-hs-anim-poster-meta">
                            <p className="mb-1">24/7 Service Desk</p>
                            <p className="mb-1">Dhaka, Bangladesh</p>
                            <p className="mb-0">sohub.com.bd</p>
                          </div>

                          <div className="docs-hs-anim-qr-art" aria-hidden="true">
                            <span className="docs-hs-anim-qr-finder docs-hs-anim-qr-finder-tl" />
                            <span className="docs-hs-anim-qr-finder docs-hs-anim-qr-finder-tr" />
                            <span className="docs-hs-anim-qr-finder docs-hs-anim-qr-finder-bl" />
                          </div>
                        </div>

                        <p className="docs-hs-anim-poster-foot mb-0">Scan. Call. Talk.</p>
                      </div>
                      <span className="docs-hs-anim-poster-gloss" />
                    </div>

                    <div className={`docs-hs-anim-human${hotScanCallActive ? ' docs-hs-anim-human-manual-calling' : ''}`}>
                      <div className={`docs-hs-anim-phone${hotScanCallActive ? ' docs-hs-anim-phone-manual-calling' : ''}`}>
                        <div className="docs-hs-anim-screen docs-hs-anim-screen-scan">
                          <p className="docs-hs-anim-screen-title mb-2">Camera Scan</p>
                          <div className="docs-hs-anim-mini-qr">
                            <QrCode className="w-10 h-10" />
                          </div>
                        </div>

                        <div className="docs-hs-anim-screen docs-hs-anim-screen-open">
                          <span className="docs-hs-anim-ui-bubble docs-hs-anim-ui-bubble-a" />
                          <span className="docs-hs-anim-ui-bubble docs-hs-anim-ui-bubble-b" />
                          <span className="docs-hs-anim-ui-theme-badge" aria-hidden="true">
                            <Sun className="w-3 h-3" />
                          </span>

                          <div className="docs-hs-anim-open-avatar" aria-hidden="true">
                            <span className="docs-hs-anim-open-avatar-dot" />
                          </div>
                          <p className="docs-hs-anim-open-name mb-0">test</p>
                          <p className="docs-hs-anim-open-ready mb-0">We're ready to talk</p>
                          <button
                            type="button"
                            className="docs-hs-anim-call-btn docs-hs-anim-open-call keep-white-text"
                            onClick={() => setHotScanCallTrigger((prev) => prev + 1)}
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Call Now</span>
                          </button>
                          <button type="button" className="docs-hs-anim-open-code">
                            <Link2 className="w-3 h-3" />
                            <span>990351</span>
                          </button>
                          <p className="docs-hs-anim-open-note mb-0">Free Call • No Sim required • No App Required</p>
                          <div className="docs-hs-anim-open-actions">
                            <span className="docs-hs-anim-open-action">
                              <MessageCircle className="w-3 h-3" />
                              <span>Message</span>
                            </span>
                            <span className="docs-hs-anim-open-action">
                              <MapPin className="w-3 h-3" />
                              <span>Location</span>
                            </span>
                          </div>
                          <span className="docs-hs-anim-open-schedule">
                            <CalendarDays className="w-3 h-3" />
                            <span>Schedule a Call</span>
                          </span>
                          <span className="docs-hs-anim-open-more">... More Info</span>
                          <p className="docs-hs-anim-open-footer mb-0">Powered by SOHUB Connect | End to End Encrypted</p>
                        </div>

                        <div className="docs-hs-anim-screen docs-hs-anim-screen-calling">
                          <span className="docs-hs-anim-ui-bubble docs-hs-anim-ui-bubble-a" />
                          <span className="docs-hs-anim-ui-bubble docs-hs-anim-ui-bubble-b" />
                          <div className="docs-hs-anim-open-avatar" aria-hidden="true">
                            <span className="docs-hs-anim-open-avatar-dot" />
                          </div>
                          <p className="docs-hs-anim-open-name mb-0">test</p>
                          <p className="docs-hs-anim-open-ready mb-0">Calling...</p>
                          <div className="docs-hs-anim-calling-orb keep-white-text">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <p className="docs-hs-anim-calling-note mb-0">Please wait...</p>
                        </div>

                        <span className="docs-hs-anim-scan-focus">
                          <span className="docs-hs-anim-scan-line" />
                        </span>
                        <span className="docs-hs-anim-tap" />
                        <span className="docs-hs-anim-ring docs-hs-anim-ring-a" />
                        <span className="docs-hs-anim-ring docs-hs-anim-ring-b" />
                      </div>
                    </div>

                    <div className="docs-hs-anim-stepbar" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </article>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Before You Begin
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  HotScan works with your existing call handling setup.
                  Before creating a HotScan Profile, ensure these are configured:
                </p>

                <div className="space-y-5">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Create Extensions</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Extensions represent individual users or devices that receive calls. Each team member who should handle HotScan calls must have an extension.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Create a Ring Group (Optional but Recommended)</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      A Ring Group defines who receives incoming calls. You can group multiple extensions so calls ring:
                    </p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                      <li>• Simultaneously</li>
                      <li>• Sequentially</li>
                      <li>• Based on your ring strategy</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Example: Support Team -&gt; Extensions 101, 102, 103
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">3. Create a Call Flow</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      A Call Flow defines how calls are routed. Inside your Call Flow, you can assign:
                    </p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                      <li>• Ring Group</li>
                      <li>• Extension</li>
                      <li>• IVR</li>
                      <li>• Queue</li>
                      <li>• Voicemail</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Example: Incoming Call -&gt; Ring Group (Support Team)
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How This Connects to HotScan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  When a customer scans your QR code, the system follows your configured routing path automatically.
                </p>

                <div className="docs-hs-flow-card relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-5 sm:p-6 shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
                  <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-200/35 dark:bg-emerald-500/20 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-14 -left-16 w-40 h-40 rounded-full bg-blue-200/35 dark:bg-blue-500/20 blur-2xl" />

                  <p className="relative text-sm text-slate-600 dark:text-slate-300 mb-5">
                    Scan -&gt; HotScan Widget -&gt; Call Flow -&gt; Ring Group / Extension
                  </p>

                  <div className="relative flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
                    <div className="docs-hs-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">01</span>
                        <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Customer Scan</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Customer scans the printed QR code</p>
                    </div>

                    <div className="flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-hs-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">02</span>
                        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">HotScan Widget</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Widget opens with your configured profile</p>
                    </div>

                    <div className="flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-hs-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">03</span>
                        <Settings className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Call Flow</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Routing logic determines the next destination</p>
                    </div>

                    <div className="flex justify-center xl:justify-start">
                      <ChevronDown className="w-4 h-4 text-slate-400 xl:hidden" />
                      <ChevronRight className="w-4 h-4 text-slate-400 hidden xl:block" />
                    </div>

                    <div className="docs-hs-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5">04</span>
                        <Route className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Ring Group / Extension</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Call reaches the right team or individual</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  This ensures calls and interactions are routed correctly.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">HotScan Profiles</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Each HotScan widget is managed as a HotScan Profile.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">HotScan Profile List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">This page shows all created profiles.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">For each profile, you'll see:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Logo – Brand or company logo</li>
                  <li>• Created On – Profile creation date</li>
                  <li>• Widget Name – Customer-facing name</li>
                  <li>• Call Flow – Assigned destination (call flow / extension / ring group)</li>
                  <li>• Assigned To – Responsible user or admin</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Actions</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• View QR Code</li>
                    <li>• Edit Profile</li>
                    <li>• Delete Profile</li>
                  </ul>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Each profile generates a unique QR code.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a HotScan Profile</h3>
                <img src="/doc_images/hotscan.png" alt="HotScan" className="w-full max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mb-4 cursor-zoom-in" />
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Navigate to: <span className="font-medium">Dashboard -&gt; HotScan -&gt; Add HotScan Profile</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">The setup includes three sections.</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Widget Information</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Defines how the widget behaves.</p>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Display Name *</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Customer-facing widget name.</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Call Flow *</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Choose how interactions are handled.</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 space-y-1">
                          <li>• Call Flow</li>
                          <li>• Extension</li>
                          <li>• Ring Group</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm italic mt-2">(* Required fields)</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Company Information</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Displayed inside the widget.</p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• <span className="font-medium">About Us</span> – Short business description</li>
                      <li>• <span className="font-medium">Website</span> – Official website URL</li>
                      <li>• <span className="font-medium">Email</span> – Contact email address</li>
                      <li>• <span className="font-medium">Contact Number</span> – Business phone number (numbers only)</li>
                      <li>• <span className="font-medium">Location</span> – Business address</li>
                      <li>• <span className="font-medium">Office Days</span> – Working days (From → To)</li>
                      <li>• <span className="font-medium">Office Time</span> – Business hours (From → To)</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">
                      This information builds trust before interaction.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">3. Social Media (Optional)</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Add links to:</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                      <li>• Facebook</li>
                      <li>• Instagram</li>
                      <li>• LinkedIn</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Helps customers verify and recognize your brand.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Logo Upload</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Upload your brand or company logo.</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                      <li>• Drag and drop or select file</li>
                      <li>• Appears on widget and QR preview</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Live Preview</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      HotScan includes a Live Preview panel. Use it to:
                    </p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                      <li>• Verify design</li>
                      <li>• Check branding</li>
                      <li>• Preview customer experience</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Save Profile</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Click <span className="font-medium">Save</span> to create the profile.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Once saved:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Profile appears in list</li>
                  <li>• QR code generated instantly</li>
                  <li>• Ready to download and share</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Inquiries</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  All HotScan leads appear under:
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-3 font-medium">
                  Dashboard -&gt; Customer Inquiries
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each inquiry includes:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created At – Submission time</li>
                  <li>• Customer Details</li>
                  <li>• Message</li>
                  <li>• Status</li>
                  <li>• Assigned To</li>
                  <li>• Profile ID</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How HotScan Works</h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Customer scans QR code</li>
                  <li>2. Widget opens</li>
                  <li>3. Customer calls or submits details</li>
                  <li>4. System routes via Call Flow</li>
                  <li>5. Inquiry logged</li>
                  <li>6. Team responds</li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  No friction. No delay.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Place QR codes where intent is highest</li>
                  <li>• Keep business details clear</li>
                  <li>• Assign correct Call Flow</li>
                  <li>• Use brand logo</li>
                  <li>• Monitor inquiries regularly</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  When intent is physical, connection should be instant.
                </p>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              
              Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Comprehensive reporting system providing detailed insights into call performance, 
                transaction history, and business analytics.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {sections.find(s => s.id === 'reports')?.children?.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => selectSection(sub.id)}
                      className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <Icon className="w-8 h-8 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-2">{sub.title}</h4>
                      <p className="text-indigo-700 dark:text-indigo-400 text-sm">
                        Detailed {sub.title.toLowerCase()} with analytics and insights
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'call-reports':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Call Detail Records (CDR)
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              See what happened on every call.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Call Detail Records (CDR) section gives you a complete view of all call activity in Sohub Connect.
                  It helps teams understand call performance, outcomes, and behavior—not just numbers.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  If a call happened, it's logged here.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What CDR Is Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">CDR helps you:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Monitor answered vs missed calls</li>
                  <li>• Analyze call outcomes and durations</li>
                  <li>• Review call recordings (if enabled)</li>
                  <li>• Understand traffic and performance trends</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  It's your system's call history and health report.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Filter by Date Range</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  At the top of the page, you can filter records by time.
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Date Picker</span> – Select start and end dates</li>
                  <li>• <span className="font-medium">Filter</span> – Apply the selected range</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  All summaries and call records update instantly based on the selected period.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">CDR Summary</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The CDR Summary gives a quick snapshot of call activity for the selected date range.
                </p>
                <img src="/doc_images/cdr_summary.png" alt="CDR Summary" className="w-[90%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Summary Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Date Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Selected start and end period</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Calls</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total calls made or received</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Answer</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Successfully connected calls</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Busy</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calls failed because the destination was busy</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Congestion</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calls failed due to network or system congestion</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">No Answer</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calls that were not answered</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  This section helps you understand performance at a glance.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">CDR Details</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The CDR Details table shows every call individually.
                </p>
                <img src="/doc_images/cdr_details.png" alt="CDR Details" className="w-[90%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Table Columns</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Date Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exact time when the call occurred</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Caller</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Extension or number that initiated the call</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Destination</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Extension or number that received the call</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Duration</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total call duration (HH:MM:SS)</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Disposition</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final call status:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 space-y-1">
                      <li>• ANSWER</li>
                      <li>• NO ANSWER</li>
                      <li>• BUSY</li>
                      <li>• CONGESTION</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Recording</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Play button to listen to the call recording (if enabled)</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Action</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delete individual call records</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Search and Filters</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  You can quickly narrow down records using:
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Disposition Filter</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View calls by status (Answered, No Answer, Busy, etc.)</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Search Box</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Search by caller or destination number</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  These tools help you find specific calls in seconds.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Use Cases</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Track missed vs answered calls</li>
                  <li>• Review agent performance</li>
                  <li>• Listen to recordings for quality control</li>
                  <li>• Diagnose call failures</li>
                  <li>• Analyze daily or monthly call traffic</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Call recordings appear only if recording is enabled</li>
                  <li>• Deleting a CDR does not affect billing data</li>
                  <li>• Large date ranges may take longer to load</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  What gets measured gets understood.<br />
                  What's understood gets improved.
                </p>
              </div>
            </div>
          </div>
        );

      case 'transaction-history':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Transaction History
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              See where every balance move came from.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Transaction History gives you a complete view of all financial activities inside Sohub Connect.
                  It helps you track credits, deductions, payments, and system-generated transactions with clarity.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Everything that affects balance appears here.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Transaction History Is Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Transaction History helps you:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Track wallet balance changes</li>
                  <li>• Verify service-related charges</li>
                  <li>• Audit system credits and deductions</li>
                  <li>• Monitor external payments</li>
                  <li>• Maintain financial transparency</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Transaction Types</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Transaction History is divided into two sections:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Internal Transactions</li>
                  <li>• External Transactions</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Each serves a different purpose.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Internal Transactions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Internal Transactions show balance movements within the Sohub Connect system.
                </p>
                <img src="/doc_images/internal_transaction.png" alt="Internal Transactions" className="w-[75%] rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">These include:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Wallet payments</li>
                  <li>• System-generated credits</li>
                  <li>• Charges for services (extensions, HotScan, Click to Connect, etc.)</li>
                </ul>

                <h4 className="font-medium text-gray-900 dark:text-white mt-6 mb-3">Internal Transactions Features</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Rows per page – Control how many records are shown</li>
                  <li>• Search – Find transactions by ID, user, or remarks</li>
                  <li>• Pagination – Navigate through multiple pages</li>
                </ul>

                <h4 className="font-medium text-gray-900 dark:text-white mt-6 mb-3">Internal Transactions Table Columns</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Date Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the transaction occurred</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Payment Method</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">How the transaction was processed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Examples: Wallet Pay, From System</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Transaction ID</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unique transaction reference</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">From</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Source account or user</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(e.g., Super Admin, Customer)</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">To</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Destination account or user</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Amount</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transaction amount with currency</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Status</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transaction result</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success or Failed</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Remarks</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Purpose of the transaction</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(e.g., extension creation, HotScan setup, Click to Connect)</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">External Transactions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  External Transactions show payments made from outside the system.
                </p>
                <img src="/doc_images/external_transaction.png" alt="External Transactions" className="w-[75%] rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">These include:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Mobile number payments</li>
                  <li>• Payment gateway transactions</li>
                  <li>• Third-party payment sources</li>
                </ul>

                <h4 className="font-medium text-gray-900 dark:text-white mt-6 mb-3">External Transactions Features</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Rows per page – Control visible records</li>
                  <li>• Search – Find specific external transactions</li>
                </ul>

                <h4 className="font-medium text-gray-900 dark:text-white mt-6 mb-3">External Transactions Table Columns</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Date Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the external payment occurred</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Payment Method</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">External payment channel used</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Amount</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paid or received amount</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">From Number</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">External number or source</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Transaction ID</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">External transaction reference</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Status</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success, Failed, or Pending</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  If no data exists, the system displays: "No data available in table."
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Use Cases</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Verify successful payments</li>
                  <li>• Reconcile wallet balances</li>
                  <li>• Track service charges</li>
                  <li>• Monitor payment failures</li>
                  <li>• Maintain audit-ready records</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Internal and external transactions are logged separately</li>
                  <li>• Failed transactions do not affect balance</li>
                  <li>• Transaction records are read-only and cannot be edited</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Clear money trails build quiet trust.
                </p>
              </div>
            </div>
          </div>
        );

      case 'tickets':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Tickets
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Get help. Track progress. Stay informed.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Tickets module lets you create and track support requests inside Sohub Connect.
                  Every issue is recorded, assigned, and resolved with clear visibility.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  No emails. No follow-ups. Everything stays in one place.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Tickets Are Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Tickets help you:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Report technical or account issues</li>
                  <li>• Request features or improvements</li>
                  <li>• Track support responses and status</li>
                  <li>• Maintain a history of resolved issues</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tickets List</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Tickets List shows all previously created tickets.
                </p>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Columns Explained</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Created Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">When the ticket was created</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Ticket ID</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unique reference number</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Ticket Type</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issue category</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(Bug Report, Technical Support, etc.)</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Description</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Short summary of the issue</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Comment</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Support or admin responses (if any)</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Assigned User</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Support staff handling the ticket</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Status</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current state:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 space-y-1">
                      <li>• Open</li>
                      <li>• Closed</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Action</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View ticket details</p>
                  </div>
                </div>

                <h4 className="font-medium text-gray-900 dark:text-white mt-6 mb-3">List Features</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Filter tickets by Ticket ID or date range</li>
                  <li>• Search tickets using the search box</li>
                  <li>• Use pagination for easy navigation</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a Ticket</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Create a new support request in seconds.
                </p>
                <img src="/doc_images/tickets.png" alt="Create Ticket" className="w-[75%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Steps</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Go to <span className="font-medium">Create Ticket</span></li>
                  <li>2. Select a <span className="font-medium">Ticket Type</span>:
                    <ul className="ml-4 mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Bug Report</li>
                      <li>• Feature Request</li>
                      <li>• Technical Support</li>
                      <li>• Account Issue</li>
                      <li>• Billing Inquiry</li>
                    </ul>
                  </li>
                  <li>3. Enter a clear <span className="font-medium">Description</span> of the issue</li>
                  <li>4. Click <span className="font-medium">Submit</span></li>
                </ol>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Support Response</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  After submission, a confirmation message appears:
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Support will review and resolve the issue within 24 hours.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ticket Status</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Open</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ticket is active and under review</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Closed</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Issue has been resolved</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  You can track progress directly from the Tickets List.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Be specific in the description</li>
                  <li>• Include steps to reproduce issues (if applicable)</li>
                  <li>• Check ticket status before creating duplicates</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Good support feels quiet — because it works.
                </p>
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Wallet
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Manage your balance. Keep services running.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300">
                  The Wallet module lets you view your account balance, add funds, and track all payment activity in one place.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Wallet Overview</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Wallet dashboard gives you a quick snapshot of your account balance and available payment actions.
                </p>
                <img src="/doc_images/wallet.png" alt="Wallet" className="w-[75%] rounded-lg shadow-md mb-4" />
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Remaining Balance</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Shows the current available balance in your wallet.
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Balance is displayed in BDT</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 mb-2">
                  The balance is automatically updated after:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Successful top-ups</li>
                  <li>• Service usage and deductions</li>
                  <li>• System-generated adjustments or credits</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  This ensures your displayed balance is always up to date.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Top Up Balance</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Add funds to your wallet anytime.
                </p>
                <img src="/doc_images/top_up.png" alt="Top Up" className="w-[50%] rounded-lg shadow-md mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Topup Now</h4>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Click <span className="font-medium">Topup Now</span> to recharge your wallet</li>
                  <li>2. Select from the available payment methods</li>
                  <li>3. Complete the payment process</li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Once the payment is successful, your wallet balance is updated automatically.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Payment Logs</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Track every transaction for full transparency.
                </p>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">View Logs</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Click <span className="font-medium">View Logs</span> to access your payment history, including:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Previous top-up transactions</li>
                  <li>• System-added credits</li>
                  <li>• Wallet deductions for services</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  These logs help you verify payments and monitor usage.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why Use Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">The Wallet helps you:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Avoid service interruptions</li>
                  <li>• Monitor spending and balance changes</li>
                  <li>• Maintain a clear financial record of all activity</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Keep your wallet topped up to keep your calls flowing.
                </p>
              </div>
            </div>
          </div>
        );

      case 'packages':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Packages (Choose Your Plan)
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              View, compare, and manage subscription plans based on your business needs.
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Current Plan Overview</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  At the top of the page, users can see details of their active subscription:
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Current Plan Name (e.g., Free, Plus)</li>
                  <li>• Plan Start Date</li>
                  <li>• Next Billing Date</li>
                  <li>• Days Active</li>
                  <li>• Days Remaining</li>
                  <li>• Monthly Charge</li>
                  <li>• Total Extensions & Cost Breakdown</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  This overview helps users easily track billing cycles, usage, and upcoming charges.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Plans</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Free Plan (FREE FOREVER)</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Best for small teams or basic usage.</p>
                    
                    <div className="mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Price</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">BDT 0 / User / Month (FREE FOREVER)</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Features</span>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                        <li>• Up to 5 extensions and 3 channels</li>
                        <li>• Advanced Call Flow / IVR (e.g., Press 1 for Sales)</li>
                        <li>• Standard calling features (Hold, Transfer, DND)</li>
                        <li>• Call Detail Records (CDR)</li>
                        <li>• Real-time Dashboard</li>
                        <li>• Sound File management (IVR greetings, announcements)</li>
                        <li>• Text-to-Speech (TTS) management</li>
                        <li>• Live Call Monitoring</li>
                      </ul>
                    </div>

                    <div className="mt-3">
                      <span className="font-medium text-gray-900 dark:text-white">Action</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click <span className="font-medium">Switch</span> to move to this plan</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Plus Plan (Current Plan)</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Ideal for growing teams that need scalability and more control.</p>
                    
                    <div className="mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Price</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">BDT 50 / User / Month</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">(Discounted pricing may apply)</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Includes</span>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                        <li>• All features of the Free Plan</li>
                        <li>• Unlimited extensions and unlimited channels</li>
                        <li>• IPSTN / verified trunk connection</li>
                        <li>• Support Ticket system</li>
                        <li>• AI Agent (Coming Soon)</li>
                      </ul>
                    </div>

                    <div className="mt-3">
                      <span className="font-medium text-gray-900 dark:text-white">Status</span>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4 mt-1">
                        <li>• Marked as <span className="font-medium">Current Plan</span> when active</li>
                        <li>• Switching is disabled while this plan is active</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">3. Pro Plan</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Designed for enterprises and call centers with advanced requirements.</p>
                    
                    <div className="mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Price</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Custom Pricing (Contact Sales)</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Includes</span>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                        <li>• All features of the Plus Plan</li>
                        <li>• Customized feature set</li>
                        <li>• API integration support</li>
                        <li>• Dedicated technical support</li>
                        <li>• Support Ticket system</li>
                        <li>• On-premise deployment option</li>
                      </ul>
                    </div>

                    <div className="mt-3">
                      <span className="font-medium text-gray-900 dark:text-white">Action</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click <span className="font-medium">Request Now</span> to contact sales/support</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Plan Management Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Users can upgrade or downgrade plans at any time</li>
                  <li>• Plan changes affect:
                    <ul className="ml-4 mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Billing amount</li>
                      <li>• Available features</li>
                    </ul>
                  </li>
                  <li>• Some plans may require sufficient wallet balance before activation</li>
                </ul>
              </section>
            </div>
          </div>
        );

      case 'softphone':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Get SoftPhone
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Download. Register. Start calling.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The SoftPhone application lets you make and receive calls directly from your device using your Sohub Connect extension.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  No desk phone needed. Just install, register, and talk.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What You Need</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• A created extension (from Voice → PBX → Extensions)</li>
                  <li>• Extension number and password</li>
                  <li>• Internet connection</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Download SoftPhone</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Navigate to: <span className="font-medium">Dashboard → Get SoftPhone</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Click <span className="font-medium">Download</span> to get the Windows application or use your IP phone.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Register Your Extension</h3>
                <img src="/doc_images/softphone1.png" alt="SoftPhone Registration" className="w-[30%] rounded-lg shadow-md mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After installing the SoftPhone:
                </p>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Open the application</li>
                  <li>2. Enter your <span className="font-medium">Extension Number</span></li>
                  <li>3. Enter your <span className="font-medium">Extension Password</span></li>
                  <li>4. Click <span className="font-medium">Register</span></li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Once registered, your extension status will show as "Online" and you're ready to make and receive calls.
                </p>
                <img src="/doc_images/softphone2.png" alt="SoftPhone Online Status" className="w-[25%] rounded-lg shadow-md mb-4" />
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What You Can Do</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Make outbound calls</li>
                  <li>• Receive inbound calls</li>
                  <li>• Transfer calls</li>
                  <li>• Hold and resume calls</li>
                  <li>• View call history</li>
                  <li>• Manage contacts</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Extension must be active to register</li>
                  <li>• One extension can be registered on multiple devices</li>
                  <li>• Stable internet connection is required for call quality</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Your extension. Your device. Anywhere.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Section Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This section is under development. Please check back later.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`docs-page relative min-h-screen transition-colors ${isLightMode ? 'docs-light bg-[#f8fafc]' : 'docs-dark bg-[#242839] dark:bg-[#242839]'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b h-16 transition-colors ${isLightMode ? 'bg-white/95 border-[#e2e8f0]' : 'bg-[#1a1928] dark:bg-[#1a1928] border-[#5f6368]'}`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden shrink-0 p-2 rounded-lg transition-colors ${isLightMode ? 'hover:bg-[#e5e7eb]' : 'hover:bg-[#3c4043]'}`}
            >
              <Menu className={`w-5 h-5 ${isLightMode ? 'text-[#334155]' : 'text-[#9aa0a6]'}`} />
            </button>
            <h1 className={`docs-nav-title text-sm sm:text-lg font-bold truncate ${isLightMode ? 'text-[#0f172a]' : 'text-white dark:text-white'}`}>SOHUB Connect Docs</h1>
            <div className="docs-nav-search-wrap flex-1 min-w-0 max-w-[10.5rem] sm:max-w-xs ml-2 sm:ml-8">
              <div 
                className="relative cursor-pointer"
                onClick={() => setSearchModalOpen(true)}
              >
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 w-4 h-4 pointer-events-none ${isLightMode ? 'text-[#334155]' : 'text-[#9aa0a6]'}`} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  readOnly
                  className={`docs-nav-search-input w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                    isLightMode
                      ? 'bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] placeholder-[#64748b] shadow-[0_1px_2px_rgba(15,23,42,0.06)]'
                      : 'bg-[#242839] dark:bg-[#242839] border border-[#3f465f] text-white dark:text-white placeholder-[#9aa0a6] dark:placeholder-[#9aa0a6]'
                  }`}
                />
              </div>
            </div>
          </div>
          <button
            onClick={toggleBgColor}
            className={`p-2 rounded-full transition-colors ${isLightMode ? 'hover:bg-[#e2e8f0]' : 'hover:bg-[#3c4043]'}`}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isLightMode ? (
              <Moon className="w-5 h-5 text-[#475569]" />
            ) : (
              <Sun className="w-5 h-5 text-[#f8fafc]" />
            )}
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="bg-gradient-doc-modal fixed inset-0 z-[60] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close search modal"
            className="docs-search-modal-backdrop bg-gradient-doc-modal absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => {
              setSearchModalOpen(false);
              setSearchQuery('');
              setSearchResults([]);
            }}
          />
          <div className="bg-gradient-doc-modal relative w-full max-w-md mx-4">
            <article className={`docs-search-modal-panel bg-gradient-doc-modal rounded-xl shadow-2xl border transition-colors ${isLightMode ? 'bg-white/80 backdrop-blur-md border-[#cbd5e1]' : 'bg-[#1a1928]/80 backdrop-blur-md border-[#5f6368]'}`}>
              <div className="bg-gradient-doc-modal p-4">
                <div className="bg-gradient-doc-modal relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-5 h-5 pointer-events-none ${isLightMode ? 'text-[#334155]' : 'text-[#9aa0a6]'}`} />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                    className={`docs-modal-search-input w-full pl-12 pr-4 py-3 border-0 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                      isLightMode
                        ? 'bg-[#f1f5f9] text-[#0f172a] placeholder-[#64748b]'
                        : 'bg-[#242839] text-white placeholder-[#9aa0a6]'
                    }`}
                  />
                </div>
              </div>
              {searchResults.length > 0 && (
                <div className={`bg-gradient-doc-modal max-h-96 overflow-y-auto border-t ${isLightMode ? 'border-[#cbd5e1]' : 'border-[#5f6368]'}`}>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => {
                        selectSection(result.id);
                        setSearchQuery('');
                        setSearchResults([]);
                        setSearchModalOpen(false);
                      }}
                      className={`bg-gradient-doc-modal px-6 py-4 cursor-pointer border-b last:border-0 transition-colors ${
                        isLightMode
                          ? 'hover:bg-[#f1f5f9] border-[#e2e8f0]'
                          : 'hover:bg-[#242839] border-[#5f6368]'
                      }`}
                    >
                      <p className={`text-base font-medium ${isLightMode ? 'text-[#0f172a]' : 'text-white'}`}>{result.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      )}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden"
      >
        <Menu className={`w-5 h-5 ${isLightMode ? 'text-[#334155]' : 'text-[#9aa0a6]'}`} />
      </button>

      {/* Sidebar - Fixed Left */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed left-0 top-16 z-40 w-72 border-r h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ${isLightMode ? 'bg-white border-[#e2e8f0]' : 'bg-[#1a1928] dark:bg-[#1a1928] border-[#5f6368]'}`}>
        <div className="py-6 px-4">
          <nav className="space-y-1">
            {sections.map((section) => renderTreeItem(section))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="min-h-screen pl-0 lg:pl-72 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="doc-content" onClick={handleDocContentClick}>
            {renderSectionContent()}
          </div>
        </div>
      </main>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="keep-white-text absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none"
            onClick={() => setActiveImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        .docs-page.docs-light .doc-content [class*='text-gray-'],
        .docs-page.docs-light .doc-content [class*='dark:text-gray-'],
        .docs-page.docs-light .doc-content [class*='text-slate-'],
        .docs-page.docs-light .doc-content [class*='dark:text-slate-'],
        .docs-page.docs-light .doc-content [class*='dark:text-white'],
        .docs-page.docs-light .doc-content [class*='dark:text-white/'],
        .docs-page.docs-light .doc-content [class*='text-[#5f6368]'],
        .docs-page.docs-light .doc-content [class*='text-[#9aa0a6]'],
        .docs-page.docs-light .doc-content [class*='text-[#e8eaed]'] {
          color: #334155 !important;
        }

        .docs-page.docs-light .doc-content [class*='text-gray-900'],
        .docs-page.docs-light .doc-content [class*='text-slate-900'],
        .docs-page.docs-light .doc-content [class*='text-[#202124]'] {
          color: #0f172a !important;
        }

        .docs-page.docs-light .doc-content [class*='dark:bg-'] {
          background-color: #f8fafc !important;
        }

        .docs-page.docs-light .doc-content [class*='dark:border-'] {
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-light .doc-content p,
        .docs-page.docs-light .doc-content li {
          color: #334155;
        }

        .docs-page.docs-light .doc-content h1,
        .docs-page.docs-light .doc-content h2,
        .docs-page.docs-light .doc-content h3,
        .docs-page.docs-light .doc-content h4,
        .docs-page.docs-light .doc-content h5,
        .docs-page.docs-light .doc-content h6 {
          color: #0f172a;
        }

        .docs-page.docs-light .doc-content .docs-overview-highlight {
          background-color: #eef2f7 !important;
          border: 1px solid #dbe3ef;
        }

        .docs-page.docs-light .doc-content .docs-overview-step {
          background: rgba(255, 255, 255, 0.88) !important;
          border-color: #dbe3ef !important;
        }

        .docs-page.docs-dark .doc-content .docs-overview-step {
          background: rgba(15, 23, 42, 0.38) !important;
          border-color: rgba(148, 163, 184, 0.35) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 52%, #eff6ff 100%) !important;
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-glow {
          background-color: rgba(147, 197, 253, 0.34) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-step {
          background: rgba(255, 255, 255, 0.9) !important;
          border-color: #dbeafe !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-step-final {
          background: rgba(236, 253, 245, 0.86) !important;
          border-color: #a7f3d0 !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-connector {
          background: transparent !important;
        }

        .docs-page.docs-light .doc-content .docs-hs-flow-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #ecfdf5 100%) !important;
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-light .doc-content .docs-hs-flow-step {
          background: rgba(255, 255, 255, 0.93) !important;
          border-color: #d1fae5 !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-flow-step {
          background: rgba(15, 23, 42, 0.82) !important;
          border-color: rgba(148, 163, 184, 0.38) !important;
        }

        .docs-page .doc-content .docs-hs-anim-shell {
          border-radius: 1rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          padding: 0.9rem;
          background: linear-gradient(145deg, rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.65));
        }

        .docs-page .doc-content .docs-hs-anim-stage {
          position: relative;
          overflow: hidden;
          border-radius: 0.9rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          min-height: 320px;
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 52%, #ecfdf5 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 12px 28px rgba(15, 23, 42, 0.12);
          padding: 1rem;
        }

        .docs-page .doc-content .docs-hs-anim-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 22% 22%, rgba(255, 255, 255, 0.34), transparent 42%),
            radial-gradient(circle at 80% 78%, rgba(148, 163, 184, 0.2), transparent 40%),
            repeating-linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.06) 0,
              rgba(148, 163, 184, 0.06) 1px,
              transparent 1px,
              transparent 24px
            );
        }

        .docs-page .doc-content .docs-hs-anim-poster {
          position: relative;
          z-index: 1;
          width: min(408px, 58%);
          border-radius: 0.4rem;
          border: 1px solid rgba(15, 23, 42, 0.16);
          background: #ffffff;
          padding: 0.48rem;
          box-shadow:
            0 14px 28px rgba(15, 23, 42, 0.23),
            0 3px 6px rgba(15, 23, 42, 0.14);
          transform: rotate(-1.6deg);
          animation: docsHSAnimPosterDrift 12s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-poster-sheet {
          border-radius: 0.2rem;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background:
            radial-gradient(circle at 20% 14%, rgba(255, 255, 255, 0.82), transparent 48%),
            linear-gradient(160deg, #ffffff 0%, #f8fafc 42%, #eef2ff 100%);
          padding: 0.6rem;
        }

        .docs-page .doc-content .docs-hs-anim-poster-kicker {
          color: #1e293b;
          font-size: 0.62rem;
          line-height: 1;
          letter-spacing: 0.09em;
          font-weight: 800;
        }

        .docs-page .doc-content .docs-hs-anim-poster-title {
          color: #0f172a;
          font-size: 1.04rem;
          line-height: 1.12;
          font-weight: 900;
        }

        .docs-page .doc-content .docs-hs-anim-poster-sub {
          color: #475569;
          font-size: 0.72rem;
          line-height: 1.22;
          font-weight: 600;
        }

        .docs-page .doc-content .docs-hs-anim-poster-grid {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 0.62rem;
        }

        .docs-page .doc-content .docs-hs-anim-poster-meta {
          flex: 1;
        }

        .docs-page .doc-content .docs-hs-anim-poster-meta p {
          color: #334155;
          font-size: 0.63rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .docs-page .doc-content .docs-hs-anim-qr-art {
          position: relative;
          width: 6.05rem;
          height: 6.05rem;
          border-radius: 0.38rem;
          border: 1px solid rgba(15, 23, 42, 0.16);
          background: #ffffff;
          box-shadow: inset 0 0 0 0.2rem #ffffff;
          overflow: hidden;
        }

        .docs-page .doc-content .docs-hs-anim-qr-art::before {
          content: '';
          position: absolute;
          inset: 0.32rem;
          background-image: radial-gradient(circle, rgba(15, 23, 42, 0.92) 30%, transparent 33%);
          background-size: 0.4rem 0.4rem;
          opacity: 0.38;
        }

        .docs-page .doc-content .docs-hs-anim-qr-art::after {
          content: '';
          position: absolute;
          inset: 0.32rem;
          background:
            linear-gradient(#0f172a, #0f172a) 56% 18% / 18% 8% no-repeat,
            linear-gradient(#0f172a, #0f172a) 30% 43% / 12% 10% no-repeat,
            linear-gradient(#0f172a, #0f172a) 63% 55% / 16% 9% no-repeat,
            linear-gradient(#0f172a, #0f172a) 46% 73% / 24% 8% no-repeat;
          opacity: 0.9;
        }

        .docs-page .doc-content .docs-hs-anim-qr-finder {
          position: absolute;
          width: 1.55rem;
          height: 1.55rem;
          border: 0.22rem solid #0f172a;
          background: #ffffff;
          z-index: 1;
        }

        .docs-page .doc-content .docs-hs-anim-qr-finder::after {
          content: '';
          position: absolute;
          inset: 0.34rem;
          background: #0f172a;
        }

        .docs-page .doc-content .docs-hs-anim-qr-finder-tl { left: 0.35rem; top: 0.35rem; }
        .docs-page .doc-content .docs-hs-anim-qr-finder-tr { right: 0.35rem; top: 0.35rem; }
        .docs-page .doc-content .docs-hs-anim-qr-finder-bl { left: 0.35rem; bottom: 0.35rem; }

        .docs-page .doc-content .docs-hs-anim-poster-foot {
          margin-top: 0.45rem;
          color: #0f172a;
          font-size: 0.72rem;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .docs-page .doc-content .docs-hs-anim-poster-foot::before {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.14), rgba(15, 23, 42, 0.42), rgba(15, 23, 42, 0.14));
          margin-bottom: 0.42rem;
        }

        .docs-page .doc-content .docs-hs-anim-poster-gloss {
          position: absolute;
          top: 0.7rem;
          right: 0.9rem;
          width: 18%;
          height: 62%;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
          transform: rotate(16deg);
          pointer-events: none;
        }

        .docs-page .doc-content .docs-hs-anim-pin {
          position: absolute;
          top: -0.35rem;
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.18);
          background: radial-gradient(circle at 32% 30%, #ffffff, #dbeafe 56%, #93c5fd 100%);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.22);
          z-index: 2;
        }

        .docs-page .doc-content .docs-hs-anim-pin-a {
          left: 0.78rem;
        }

        .docs-page .doc-content .docs-hs-anim-pin-b {
          right: 0.78rem;
        }

        .docs-page .doc-content .docs-hs-anim-human {
          position: absolute;
          right: 1.15rem;
          bottom: 1.35rem;
          display: flex;
          align-items: flex-end;
          gap: 0.2rem;
          transform-origin: right bottom;
          animation: docsHSAnimPhoneMove 12s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-arm {
          display: none !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone {
          position: relative;
          width: 8rem;
          aspect-ratio: 9 / 18.5;
          border-radius: 1.04rem;
          border: 2px solid #0f172a;
          background: #020617;
          padding: 0.32rem;
          overflow: hidden;
          box-shadow: 0 13px 30px rgba(2, 6, 23, 0.48);
        }

        .docs-page .doc-content .docs-hs-anim-screen {
          position: absolute;
          inset: 0.32rem;
          border-radius: 0.8rem;
          background: linear-gradient(160deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.96));
          padding: 0.66rem 0.56rem;
        }

        .docs-page .doc-content .docs-hs-anim-screen-title {
          color: #e2e8f0;
          font-size: 0.72rem;
          line-height: 1.1;
          font-weight: 700;
          text-align: center;
        }

        .docs-page .doc-content .docs-hs-anim-screen-scan {
          opacity: 1;
          animation: docsHSAnimScreenScan 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-screen-open {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 0.22rem;
          padding: 0.36rem 0.3rem 0.3rem;
          overflow: hidden;
          background: linear-gradient(180deg, #edf2fb 0%, #e6edf9 100%);
          opacity: 0;
          animation: docsHSAnimScreenOpen 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-screen-calling {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 0.24rem;
          padding: 0.46rem 0.3rem 0.34rem;
          overflow: hidden;
          background: linear-gradient(180deg, #edf2fb 0%, #e6edf9 100%);
          opacity: 0;
          animation: docsHSAnimScreenCalling 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-ui-bubble {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          background: radial-gradient(circle at 30% 32%, rgba(191, 219, 254, 0.44), rgba(191, 219, 254, 0.16) 62%, rgba(191, 219, 254, 0) 100%);
        }

        .docs-page .doc-content .docs-hs-anim-ui-bubble-a {
          width: 4rem;
          height: 4rem;
          right: -1.36rem;
          top: -1.36rem;
        }

        .docs-page .doc-content .docs-hs-anim-ui-bubble-b {
          width: 5.8rem;
          height: 5.8rem;
          left: -2.5rem;
          bottom: -3rem;
        }

        .docs-page .doc-content .docs-hs-anim-ui-theme-badge {
          position: absolute;
          top: 0.24rem;
          right: 0.24rem;
          width: 0.82rem;
          height: 0.82rem;
          border-radius: 999px;
          border: 1px solid #d99a32;
          background: rgba(248, 250, 252, 0.8);
          color: #7c8597;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .docs-page .doc-content .docs-hs-anim-open-avatar {
          position: relative;
          margin-top: 0.3rem;
          width: 2.14rem;
          height: 2.14rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.45);
          background:
            radial-gradient(circle at 42% 38%, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.9)),
            linear-gradient(135deg, rgba(219, 234, 254, 0.84), rgba(224, 231, 255, 0.78));
          box-shadow: 0 10px 18px rgba(148, 163, 184, 0.28);
          z-index: 1;
          overflow: hidden;
        }

        .docs-page .doc-content .docs-hs-anim-open-avatar::before {
          content: '';
          position: absolute;
          inset: 0.43rem;
          border-radius: 0.48rem;
          border: 1px solid rgba(148, 163, 184, 0.45);
          background:
            linear-gradient(90deg, rgba(203, 213, 225, 0.65), rgba(203, 213, 225, 0.65)) 28% 28% / 44% 6% no-repeat,
            linear-gradient(90deg, rgba(203, 213, 225, 0.58), rgba(203, 213, 225, 0.58)) 36% 47% / 34% 6% no-repeat,
            linear-gradient(120deg, rgba(148, 163, 184, 0.36), rgba(191, 219, 254, 0.32));
        }

        .docs-page .doc-content .docs-hs-anim-open-avatar-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.42);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 0.18rem rgba(191, 219, 254, 0.34);
        }

        .docs-page .doc-content .docs-hs-anim-open-name {
          position: relative;
          z-index: 1;
          color: #2d5ad1;
          font-size: 0.58rem;
          line-height: 1;
          font-weight: 800;
        }

        .docs-page .doc-content .docs-hs-anim-open-ready {
          position: relative;
          z-index: 1;
          color: #0f766e;
          font-size: 0.45rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .docs-page .doc-content .docs-hs-anim-open-call {
          margin-top: 0.02rem;
          min-height: 0.84rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-code {
          width: auto;
          margin-top: 0.02rem;
          border-radius: 999px;
          border: 1px solid rgba(147, 173, 255, 0.7);
          background: linear-gradient(180deg, rgba(221, 232, 255, 0.98), rgba(208, 221, 253, 0.98));
          box-shadow: 0 4px 10px rgba(148, 163, 184, 0.2);
          color: #2e5acb;
          font-size: 0.55rem;
          line-height: 1;
          font-weight: 700;
          padding: 0.22rem 0.52rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-note {
          position: relative;
          z-index: 1;
          margin-top: 0.01rem;
          color: #4b5563;
          font-size: 0.34rem;
          line-height: 1.24;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.01em;
        }

        .docs-page .doc-content .docs-hs-anim-open-actions {
          position: relative;
          z-index: 1;
          margin-top: 0.02rem;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.16rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-action {
          min-height: 0.9rem;
          border-radius: 0.26rem;
          border: 1px solid rgba(148, 163, 184, 0.42);
          background: rgba(255, 255, 255, 0.9);
          color: #1f2937;
          font-size: 0.37rem;
          line-height: 1;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.16rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-action:first-child svg {
          color: #10b981;
        }

        .docs-page .doc-content .docs-hs-anim-open-action:last-child svg {
          color: #ef4444;
        }

        .docs-page .doc-content .docs-hs-anim-open-schedule {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 0.86rem;
          border-radius: 0.26rem;
          border: 1px solid rgba(148, 163, 184, 0.42);
          background: rgba(255, 255, 255, 0.92);
          color: #1f2937;
          font-size: 0.4rem;
          line-height: 1;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.18rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-schedule svg {
          color: #7c3aed;
        }

        .docs-page .doc-content .docs-hs-anim-open-more {
          position: relative;
          z-index: 1;
          width: 100%;
          margin-top: auto;
          min-height: 0.7rem;
          border-radius: 0.28rem;
          border: 1px solid rgba(147, 173, 255, 0.52);
          background: linear-gradient(180deg, rgba(214, 228, 255, 0.6), rgba(205, 221, 252, 0.6));
          color: #2d5ad1;
          font-size: 0.43rem;
          line-height: 1;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .docs-page .doc-content .docs-hs-anim-open-footer {
          position: relative;
          z-index: 1;
          color: #6b7280;
          font-size: 0.29rem;
          line-height: 1.1;
          font-weight: 600;
          text-align: center;
        }

        .docs-page .doc-content .docs-hs-anim-mini-qr {
          margin: 0.5rem auto 0;
          width: 4.55rem;
          height: 4.55rem;
          border-radius: 0.55rem;
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
        }

        .docs-page .doc-content .docs-hs-anim-call-btn {
          border: 1px solid #2fb07c;
          border-radius: 999px;
          width: auto;
          margin-top: 0.02rem;
          background: linear-gradient(180deg, #34d399, #10b981);
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.28);
          color: #ffffff;
          font-size: 0.5rem;
          font-weight: 700;
          line-height: 1;
          padding: 0.24rem 0.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          animation: docsHSAnimCallBtnPress 12s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-calling-orb {
          margin-top: 0.54rem;
          width: 2.08rem;
          height: 2.08rem;
          border-radius: 999px;
          border: 1px solid rgba(37, 99, 235, 0.22);
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          box-shadow:
            0 12px 20px rgba(37, 99, 235, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.26);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .docs-page .doc-content .docs-hs-anim-calling-note {
          color: #4b5563;
          font-size: 0.41rem;
          line-height: 1;
          font-weight: 700;
        }

        .docs-page .doc-content .docs-hs-anim-scan-focus {
          position: absolute;
          left: 12%;
          right: 12%;
          top: 33%;
          height: 32%;
          border-radius: 0.45rem;
          border: 2px solid rgba(16, 185, 129, 0.95);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
          opacity: 0;
          animation: docsHSAnimScanFocus 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-scan-line {
          position: absolute;
          left: 8%;
          right: 8%;
          top: 18%;
          height: 0.17rem;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.88), rgba(16, 185, 129, 0));
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.55);
          animation: docsHSAnimScanLine 1.35s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-tap {
          position: absolute;
          left: 50%;
          top: 36%;
          width: 0.82rem;
          height: 0.82rem;
          border-radius: 999px;
          border: 2px solid rgba(37, 99, 235, 0.58);
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: docsHSAnimTap 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-ring {
          position: absolute;
          left: 50%;
          top: 36%;
          width: 2.45rem;
          height: 2.45rem;
          border-radius: 999px;
          border: 2px solid rgba(37, 99, 235, 0.45);
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: docsHSAnimRing 12s ease-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-ring-b {
          animation-delay: 0.5s;
        }

        .docs-page .doc-content .docs-hs-anim-stepbar {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 0.72rem;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.42rem;
        }

        .docs-page .doc-content .docs-hs-anim-stepbar span {
          height: 0.22rem;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.46);
          opacity: 0.42;
          animation: docsHSAnimStepPulse 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-stepbar span:nth-child(2) { animation-delay: 2.6s; }
        .docs-page .doc-content .docs-hs-anim-stepbar span:nth-child(3) { animation-delay: 5.3s; }
        .docs-page .doc-content .docs-hs-anim-stepbar span:nth-child(4) { animation-delay: 8.2s; }

        @keyframes docsHSAnimPhoneMove {
          0%, 18% {
            opacity: 0;
            transform: translate(24px, 14px) rotate(-10deg) scale(0.9);
          }
          24%, 44% {
            opacity: 1;
            transform: translate(-172px, -42px) rotate(-14deg) scale(0.95);
          }
          52%, 100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes docsHSAnimPosterDrift {
          0%, 100% { transform: rotate(-1.6deg) translateY(0); }
          50% { transform: rotate(-0.9deg) translateY(-2px); }
        }

        @keyframes docsHSAnimScreenScan {
          0%, 44% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }

        @keyframes docsHSAnimScreenOpen {
          0%, 47% { opacity: 0; }
          52%, 68% { opacity: 1; }
          71%, 100% { opacity: 0; }
        }

        @keyframes docsHSAnimScreenCalling {
          0%, 69% { opacity: 0; }
          73%, 100% { opacity: 1; }
        }

        @keyframes docsHSAnimScanFocus {
          0%, 24% { opacity: 0; }
          28%, 44% { opacity: 1; }
          48%, 100% { opacity: 0; }
        }

        @keyframes docsHSAnimScanLine {
          0% { top: 16%; opacity: 0.45; }
          50% { top: 80%; opacity: 1; }
          100% { top: 16%; opacity: 0.45; }
        }

        @keyframes docsHSAnimCallBtnPress {
          0%, 63%, 68%, 100% { transform: scale(1); }
          65% { transform: scale(0.93); }
          67% { transform: scale(1.02); }
        }

        @keyframes docsHSAnimTap {
          0%, 63%, 67%, 100% {
            opacity: 0;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
          64% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.58);
          }
          66% {
            opacity: 0;
            box-shadow: 0 0 0 12px rgba(37, 99, 235, 0);
          }
        }

        @keyframes docsHSAnimRing {
          0%, 72%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.86);
          }
          79% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(1.02);
          }
          88% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.56);
          }
        }

        @keyframes docsHSAnimStepPulse {
          0%, 6%, 100% {
            opacity: 0.32;
            background: rgba(148, 163, 184, 0.46);
          }
          12%, 22% {
            opacity: 1;
            background: rgba(37, 99, 235, 0.88);
          }
        }

        .docs-page .doc-content .docs-c2c-demo-shell {
          border-radius: 1rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          padding: 0.9rem;
          background: linear-gradient(145deg, rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.65));
        }

        .docs-page .doc-content .docs-c2c-demo-browser {
          position: relative;
          overflow: hidden;
          border-radius: 0.9rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          min-height: 245px;
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 52%, #eff6ff 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 12px 28px rgba(15, 23, 42, 0.12);
        }

        .docs-page .doc-content .docs-c2c-demo-topbar {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.55rem 0.7rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(248, 250, 252, 0.85);
        }

        .docs-page .doc-content .docs-c2c-demo-topbar p {
          line-height: 1.1;
        }

        .docs-page .doc-content .docs-c2c-dot {
          display: inline-flex;
          width: 0.52rem;
          height: 0.52rem;
          border-radius: 999px;
        }

        .docs-page .doc-content .docs-c2c-demo-page {
          padding: 1rem 1rem 3.2rem;
        }

        .docs-page .doc-content .docs-c2c-call-btn {
          position: absolute;
          right: 1rem;
          bottom: 0.9rem;
          border: 0;
          border-radius: 999px;
          width: 3.2rem;
          height: 3.2rem;
          padding: 0;
          cursor: default;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.35);
          animation:
            docsC2CBtnState 9s ease-in-out infinite,
            docsC2CBtnPress 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-call-icon {
          position: absolute;
          color: #ffffff;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .docs-page .doc-content .docs-c2c-call-icon-idle {
          animation:
            docsC2CPhoneRing 9s ease-in-out infinite,
            docsC2CIdleIcon 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-call-icon-calling {
          opacity: 0;
          transform: scale(0.88);
          animation: docsC2CCallingIcon 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-confirm-popup {
          position: absolute;
          right: 0.95rem;
          bottom: 3.55rem;
          width: min(235px, calc(100% - 1.5rem));
          border-radius: 0.75rem;
          border: 1px solid rgba(148, 163, 184, 0.38);
          background: rgba(255, 255, 255, 0.93);
          padding: 0.7rem;
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.18);
          animation: docsC2CPopupState 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-popup-btn {
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: #ffffff;
          color: #334155;
          border-radius: 0.45rem;
          font-size: 0.75rem;
          line-height: 1;
          font-weight: 600;
          padding: 0.36rem 0.6rem;
        }

        .docs-page .doc-content .docs-c2c-popup-yes {
          background: #16a34a;
          border-color: #16a34a;
          color: #ffffff;
          animation: docsC2CYesPulse 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-ripple {
          position: absolute;
          right: 0.83rem;
          bottom: 0.74rem;
          width: 3.1rem;
          height: 3.1rem;
          border-radius: 999px;
          border: 2px solid rgba(34, 197, 94, 0.42);
          opacity: 0;
          animation: docsC2CRipple 9s ease-out infinite;
          pointer-events: none;
        }

        .docs-page .doc-content .docs-c2c-ripple-b {
          animation-delay: 0.4s;
        }

        .docs-page .doc-content .docs-c2c-cursor,
        .docs-page .doc-content .docs-c2c-click-pulse {
          position: absolute;
          left: 1.35rem;
          top: 2.1rem;
          pointer-events: none;
          animation: docsC2CCursorPath 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-cursor {
          width: 1.1rem;
          height: 1.45rem;
          z-index: 4;
        }

        .docs-page .doc-content .docs-c2c-cursor::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #ffffff;
          border: 1.4px solid #0f172a;
          clip-path: polygon(0 0, 0 100%, 35% 73%, 54% 97%, 68% 89%, 48% 64%, 100% 64%);
          border-radius: 0.16rem;
          box-shadow: 0 3px 8px rgba(15, 23, 42, 0.26);
          transform-origin: 24% 18%;
          animation: docsC2CCursorTilt 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-cursor::after {
          content: '';
          position: absolute;
          width: 0.48rem;
          height: 0.13rem;
          left: 0.33rem;
          top: 0.72rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.45);
          transform: rotate(-32deg);
          opacity: 0.8;
        }

        .docs-page .doc-content .docs-c2c-click-pulse {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 999px;
          border: 2px solid rgba(30, 64, 175, 0.55);
          opacity: 0;
          margin-left: 0.45rem;
          margin-top: 0.62rem;
          animation:
            docsC2CCursorPath 9s ease-in-out infinite,
            docsC2CClickPulse 9s ease-in-out infinite;
          z-index: 3;
        }

        @keyframes docsC2CCursorPath {
          0%, 8% {
            left: 1.35rem;
            top: 2.1rem;
          }
          20%, 32% {
            left: calc(100% - 3.25rem);
            top: calc(100% - 3.05rem);
          }
          44%, 58% {
            left: calc(100% - 4.35rem);
            top: calc(100% - 6.5rem);
          }
          70%, 100% {
            left: calc(100% - 3.25rem);
            top: calc(100% - 3.05rem);
          }
        }

        @keyframes docsC2CPopupState {
          0%, 23% {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          26%, 55% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          60%, 100% {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
        }

        @keyframes docsC2CClickPulse {
          0%, 21%, 25%, 53%, 58%, 100% {
            opacity: 0;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
          22%, 54% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.55);
          }
          24%, 56% {
            opacity: 0;
            box-shadow: 0 0 0 12px rgba(37, 99, 235, 0);
          }
        }

        @keyframes docsC2CIdleIcon {
          0%, 61% { opacity: 1; }
          64%, 100% { opacity: 0; }
        }

        @keyframes docsC2CCallingIcon {
          0%, 62% {
            opacity: 0;
            transform: scale(0.88);
          }
          66%, 100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes docsC2CBtnState {
          0%, 16%, 26%, 48%, 58%, 61% {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            box-shadow: 0 10px 20px rgba(34, 197, 94, 0.35);
          }
          18%, 21%, 50%, 53% {
            background: linear-gradient(135deg, #4ade80, #22c55e);
            box-shadow: 0 14px 24px rgba(34, 197, 94, 0.44);
          }
          66%, 100% {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            box-shadow: 0 10px 22px rgba(37, 99, 235, 0.38);
          }
        }

        @keyframes docsC2CBtnPress {
          0%, 21%, 25%, 53%, 58%, 100% { transform: scale(1); }
          22%, 54% { transform: scale(0.9); }
          24%, 56% { transform: scale(1); }
        }

        @keyframes docsC2CPhoneRing {
          0%, 62%, 100% { transform: rotate(0deg); }
          66% { transform: rotate(-12deg); }
          69% { transform: rotate(12deg); }
          72% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
          78% { transform: rotate(0deg); }
        }

        @keyframes docsC2CCursorTilt {
          0%, 21%, 25%, 53%, 58%, 100% { transform: rotate(0deg); }
          22%, 54% { transform: rotate(8deg); }
          24%, 56% { transform: rotate(0deg); }
        }

        @keyframes docsC2CRipple {
          0%, 62% {
            opacity: 0;
            transform: scale(0.82);
          }
          68% {
            opacity: 0.42;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.56);
          }
        }

        @keyframes docsC2CYesPulse {
          0%, 48%, 60%, 100% { transform: scale(1); }
          54% { transform: scale(1.06); }
        }

        .docs-page.docs-light .doc-content .docs-c2c-demo-browser {
          background: linear-gradient(165deg, #f8fafc 0%, #ffffff 58%, #eff6ff 100%) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-demo-topbar {
          background: rgba(248, 250, 252, 0.88) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-confirm-popup {
          background: rgba(255, 255, 255, 0.94) !important;
        }

        .docs-page.docs-light .doc-content .docs-hs-anim-stage {
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 52%, #ecfdf5 100%) !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-shell {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.72), rgba(30, 41, 59, 0.6)) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-stage {
          background: linear-gradient(165deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.9)) !important;
          border-color: rgba(148, 163, 184, 0.3) !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster {
          background: rgba(15, 23, 42, 0.94) !important;
          border-color: rgba(148, 163, 184, 0.44) !important;
          box-shadow: 0 14px 32px rgba(2, 6, 23, 0.56);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-pin {
          border-color: rgba(148, 163, 184, 0.42);
          background: radial-gradient(circle at 32% 30%, #e2e8f0, #94a3b8 56%, #475569 100%);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-sheet {
          border-color: rgba(148, 163, 184, 0.36);
          background:
            radial-gradient(circle at 20% 14%, rgba(148, 163, 184, 0.22), transparent 48%),
            linear-gradient(160deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 52%, rgba(51, 65, 85, 0.94) 100%);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-kicker,
        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-title,
        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-foot,
        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-meta p {
          color: #e2e8f0;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-sub {
          color: #cbd5e1;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-foot::before {
          background: linear-gradient(90deg, rgba(148, 163, 184, 0.12), rgba(148, 163, 184, 0.38), rgba(148, 163, 184, 0.12));
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-stage::before {
          background:
            radial-gradient(circle at 22% 22%, rgba(148, 163, 184, 0.16), transparent 40%),
            radial-gradient(circle at 80% 78%, rgba(30, 64, 175, 0.16), transparent 40%),
            repeating-linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.08) 0,
              rgba(148, 163, 184, 0.08) 1px,
              transparent 1px,
              transparent 24px
            );
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-phone {
          border-color: #0b1220;
          box-shadow: 0 16px 32px rgba(2, 6, 23, 0.6);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-arm {
          background: linear-gradient(120deg, #c98c64, #b97a55);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-stepbar span {
          background: rgba(148, 163, 184, 0.48);
        }

        .docs-page.docs-dark .doc-content .docs-c2c-demo-shell {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.6)) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-demo-browser {
          background: linear-gradient(165deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.88)) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-demo-topbar {
          background: rgba(15, 23, 42, 0.78) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-confirm-popup {
          background: rgba(15, 23, 42, 0.94) !important;
          border-color: rgba(148, 163, 184, 0.32) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-popup-btn {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(148, 163, 184, 0.42);
          color: #cbd5e1;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-cursor::before {
          background: #f8fafc;
          border-color: #0f172a;
          box-shadow: 0 4px 10px rgba(2, 6, 23, 0.45);
        }

        .docs-page.docs-dark .doc-content .docs-c2c-popup-yes {
          background: #16a34a;
          border-color: #16a34a;
          color: #ffffff;
        }

        @media (max-width: 639px) {
          .docs-page .docs-nav-title {
            max-width: 33vw;
          }

          .docs-page .docs-nav-search-wrap {
            max-width: 9.6rem;
            margin-left: 0.5rem;
          }

          .docs-page .docs-nav-search-input {
            font-size: 0.76rem;
            line-height: 1.1rem;
          }

          .docs-page.docs-light .docs-nav-search-input {
            background-color: #ffffff !important;
            border-color: #94a3b8 !important;
            box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.18), 0 1px 2px rgba(15, 23, 42, 0.08);
          }

          .docs-page.docs-light .docs-nav-search-input::placeholder {
            color: #475569 !important;
          }

          .docs-page .doc-content .docs-c2c-demo-shell {
            padding: 0.62rem;
          }

          .docs-page .doc-content .docs-c2c-demo-browser {
            min-height: 232px;
          }

          .docs-page .doc-content .docs-c2c-demo-topbar {
            padding: 0.46rem 0.56rem;
          }

          .docs-page .doc-content .docs-c2c-demo-topbar p {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-c2c-demo-page {
            padding: 0.82rem 0.78rem 2.8rem;
          }

          .docs-page .doc-content .docs-c2c-call-btn {
            right: 0.72rem;
            bottom: 0.68rem;
            width: 2.86rem;
            height: 2.86rem;
          }

          .docs-page .doc-content .docs-c2c-ripple {
            right: 0.62rem;
            bottom: 0.58rem;
            width: 2.75rem;
            height: 2.75rem;
          }

          .docs-page .doc-content .docs-c2c-confirm-popup {
            right: 0.62rem;
            bottom: 3.18rem;
            width: min(210px, calc(100% - 1.1rem));
            padding: 0.56rem;
          }

          .docs-page .doc-content .docs-c2c-popup-btn {
            font-size: 0.69rem;
            padding: 0.3rem 0.52rem;
          }

          .docs-page .doc-content .docs-hs-anim-shell {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            padding: 0.22rem;
          }

          .docs-page.docs-light .doc-content .docs-hs-anim-shell,
          .docs-page.docs-dark .doc-content .docs-hs-anim-shell {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-stage {
            min-height: 336px;
            padding: 0.9rem;
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }

          .docs-page.docs-light .doc-content .docs-hs-anim-stage,
          .docs-page.docs-dark .doc-content .docs-hs-anim-stage {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-stage::before {
            display: none;
          }

          .docs-page.docs-light .doc-content .docs-hs-anim-stage::before,
          .docs-page.docs-dark .doc-content .docs-hs-anim-stage::before {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-poster {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-poster-sheet {
            padding: 0.42rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-kicker {
            font-size: 0.54rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-title {
            font-size: 0.8rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-sub {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-meta p {
            font-size: 0.54rem;
          }

          .docs-page .doc-content .docs-hs-anim-qr-art {
            width: 4.5rem;
            height: 4.5rem;
          }

          .docs-page .doc-content .docs-hs-anim-qr-finder {
            width: 1.16rem;
            height: 1.16rem;
            border-width: 0.18rem;
          }

          .docs-page .doc-content .docs-hs-anim-qr-finder::after {
            inset: 0.26rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-foot {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-hs-anim-human {
            left: 50%;
            right: auto;
            bottom: 0.55rem;
            gap: 0;
            animation: none !important;
            opacity: 1 !important;
            transform: translateX(-50%) !important;
          }

          .docs-page .doc-content .docs-hs-anim-human.docs-hs-anim-human-manual-calling {
            left: 50%;
            right: auto;
            transform: translateX(-50%) !important;
          }

          .docs-page .doc-content .docs-hs-anim-phone {
            width: 8.6rem;
            box-shadow: none !important;
          }

          .docs-page.docs-dark .doc-content .docs-hs-anim-phone {
            box-shadow: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-arm {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-stepbar {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-screen-open {
            gap: 0.3rem;
            padding: 0.46rem 0.4rem 0.38rem;
          }

          .docs-page .doc-content .docs-hs-anim-screen-calling {
            gap: 0.3rem;
            padding: 0.52rem 0.4rem 0.42rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-avatar {
            width: 2.2rem;
            height: 2.2rem;
            box-shadow: none;
          }

          .docs-page .doc-content .docs-hs-anim-open-name {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-ready {
            font-size: 0.5rem;
            line-height: 1.36;
          }

          .docs-page .doc-content .docs-hs-anim-open-call {
            min-height: 0.9rem;
            margin-top: 0.04rem;
          }

          .docs-page .doc-content .docs-hs-anim-call-btn {
            font-size: 0.52rem;
            line-height: 1.1;
            padding: 0.24rem 0.52rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-code {
            font-size: 0.53rem;
            padding: 0.22rem 0.52rem;
            line-height: 1.2;
          }

          .docs-page .doc-content .docs-hs-anim-open-note {
            font-size: 0.4rem;
            line-height: 1.36;
          }

          .docs-page .doc-content .docs-hs-anim-open-actions {
            margin-top: 0.07rem;
            gap: 0.18rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-action,
          .docs-page .doc-content .docs-hs-anim-open-schedule {
            font-size: 0.4rem;
            min-height: 1rem;
            line-height: 1.25;
          }

          .docs-page .doc-content .docs-hs-anim-open-more {
            font-size: 0.45rem;
            min-height: 0.78rem;
            line-height: 1.2;
          }

          .docs-page .doc-content .docs-hs-anim-open-footer {
            font-size: 0.34rem;
            margin-top: 0.06rem;
            line-height: 1.26;
          }

          .docs-page .doc-content .docs-c2c-cursor,
          .docs-page .doc-content .docs-c2c-click-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
        }

        .docs-page .doc-content .docs-overview-step-icon {
          background: rgba(59, 130, 246, 0.14);
          color: #1d4ed8;
        }

        .docs-page .doc-content .docs-overview-step {
          opacity: 0;
          transform: translateY(12px) scale(0.985);
          animation:
            docsOverviewStepIn 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            docsOverviewStepFloat 4.2s ease-in-out infinite,
            docsOverviewStepGlow 4.2s ease-in-out infinite;
          animation-delay:
            var(--step-delay, 0ms),
            calc(var(--step-delay, 0ms) + 620ms),
            calc(var(--step-delay, 0ms) + 620ms);
        }

        .docs-page .doc-content .docs-overview-arrow {
          opacity: 0;
          animation:
            docsOverviewArrowIn 420ms ease-out forwards,
            docsOverviewArrowFlow 1.7s ease-in-out infinite;
          animation-delay: var(--arrow-delay, 0ms), calc(var(--arrow-delay, 0ms) + 420ms);
        }

        .docs-page .doc-content .docs-overview-step-icon svg {
          animation: docsOverviewIconPulse 2.3s ease-in-out infinite;
          animation-delay: calc(var(--step-delay, 0ms) + 200ms);
          transform-origin: center;
        }

        @keyframes docsOverviewStepIn {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes docsOverviewArrowIn {
          0% {
            opacity: 0;
            transform: translateX(-4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes docsOverviewArrowFlow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }

        @keyframes docsOverviewStepFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.01);
          }
        }

        @keyframes docsOverviewStepGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          50% {
            box-shadow: 0 12px 24px rgba(59, 130, 246, 0.16);
          }
        }

        @keyframes docsOverviewIconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .docs-page .doc-content .docs-c2c-call-btn,
          .docs-page .doc-content .docs-c2c-confirm-popup,
          .docs-page .doc-content .docs-c2c-ripple,
          .docs-page .doc-content .docs-c2c-cursor,
          .docs-page .doc-content .docs-c2c-click-pulse,
          .docs-page .doc-content .docs-c2c-call-icon-idle,
          .docs-page .doc-content .docs-c2c-call-icon-calling,
          .docs-page .doc-content .docs-c2c-popup-yes,
          .docs-page .doc-content .docs-hs-anim-human,
          .docs-page .doc-content .docs-hs-anim-screen-scan,
          .docs-page .doc-content .docs-hs-anim-screen-open,
          .docs-page .doc-content .docs-hs-anim-screen-calling,
          .docs-page .doc-content .docs-hs-anim-call-btn,
          .docs-page .doc-content .docs-hs-anim-scan-focus,
          .docs-page .doc-content .docs-hs-anim-scan-line,
          .docs-page .doc-content .docs-hs-anim-tap,
          .docs-page .doc-content .docs-hs-anim-ring,
          .docs-page .doc-content .docs-hs-anim-stepbar span,
          .docs-page .doc-content .docs-overview-step,
          .docs-page .doc-content .docs-overview-arrow,
          .docs-page .doc-content .docs-overview-step-icon svg {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .docs-page .doc-content .docs-c2c-call-icon-calling,
          .docs-page .doc-content .docs-c2c-confirm-popup,
          .docs-page .doc-content .docs-c2c-ripple,
          .docs-page .doc-content .docs-c2c-cursor,
          .docs-page .doc-content .docs-c2c-click-pulse,
          .docs-page .doc-content .docs-hs-anim-tap,
          .docs-page .doc-content .docs-hs-anim-ring {
            opacity: 0 !important;
          }

          .docs-page .doc-content .docs-hs-anim-human {
            opacity: 1 !important;
            transform: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-screen-scan,
          .docs-page .doc-content .docs-hs-anim-screen-calling {
            opacity: 0 !important;
          }

          .docs-page .doc-content .docs-hs-anim-screen-open {
            opacity: 1 !important;
          }
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-screen-scan,
        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-screen-open {
          opacity: 0 !important;
          animation: none !important;
          pointer-events: none;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-screen-calling {
          opacity: 1 !important;
          animation: none !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-scan-focus,
        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-scan-line,
        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-tap {
          opacity: 0 !important;
          animation: none !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-ring {
          opacity: 0;
          animation: docsHSAnimRingManual 1.15s ease-out infinite !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-ring-b {
          animation-delay: 0.45s !important;
        }

        .docs-page .doc-content .docs-hs-anim-human.docs-hs-anim-human-manual-calling {
          animation: none !important;
          opacity: 1 !important;
          transform: translate(0, 0) rotate(0deg) scale(1) !important;
        }

        @keyframes docsHSAnimRingManual {
          0% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(0.86);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.6);
          }
        }

        .docs-page.docs-light .keep-white-text {
          color: #ffffff !important;
        }

        .docs-page.docs-light .docs-search-modal-backdrop {
          background-color: rgba(2, 6, 23, 0.52) !important;
          backdrop-filter: blur(4px);
        }

        .docs-page.docs-light .docs-search-modal-panel {
          background-color: rgba(255, 255, 255, 0.8) !important;
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-dark .docs-search-modal-panel {
          background-color: rgba(26, 25, 40, 0.8) !important;
        }

        .docs-page.docs-light .docs-nav-search-input {
          background-color: rgba(248, 250, 252, 0.68) !important;
          border: 1px solid #cbd5e1 !important;
          backdrop-filter: blur(6px);
        }

        .docs-page.docs-light .docs-modal-search-input {
          background-color: rgba(248, 250, 252, 0.86) !important;
          border: 1px solid #cbd5e1 !important;
          backdrop-filter: blur(4px);
        }

        .docs-page.docs-light .docs-nav-search-input:focus,
        .docs-page.docs-light .docs-nav-search-input:active,
        .docs-page.docs-light .docs-modal-search-input:focus,
        .docs-page.docs-light .docs-modal-search-input:active {
          background-color: rgba(255, 255, 255, 0.82) !important;
          border-color: #94a3b8 !important;
        }

        @media (hover: hover) and (pointer: fine) {
          .doc-content img {
            transition: transform 220ms ease, box-shadow 220ms ease;
            transform-origin: center;
            cursor: zoom-in;
            will-change: transform;
          }

          .doc-content img:hover {
            transform: scale(1.08);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
          }
        }
      `}</style>


    </div>
  );
}
