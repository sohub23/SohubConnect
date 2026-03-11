'use client';

import { useEffect, useState } from 'react';
import { Search, Menu, ChevronRight, ChevronDown, Sun, Moon, Phone, Users, BarChart3, Ticket, Wallet, CheckCircle, PhoneCall, MousePointer, QrCode, Zap, Settings, Volume2, Code, Smartphone, Monitor, Router, Headset, Download, Route, MessageCircle, MapPin, CalendarDays, Link2 } from 'lucide-react';

export default function Documentation() {
  const [bgColor, setBgColor] = useState('white');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ voice: true, pbx: true });
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [hotScanCallTrigger, setHotScanCallTrigger] = useState(0);
  const [hotScanCallActive, setHotScanCallActive] = useState(false);
  const isLightMode = bgColor === 'white';
  const THEME_KEY = 'themeMode';
  const LEGACY_THEME_KEY = 'headerBgColor';

  const normalizeTheme = (value) => {
    if (value === 'light' || value === 'white') return 'white';
    if (value === 'dark' || value === 'default') return 'default';
    return 'white';
  };

  const applyTheme = (color) => {
    const light = color === 'white';
    document.documentElement.classList.toggle('light-mode', light);
    document.documentElement.classList.toggle('dark', !light);
    document.documentElement.style.colorScheme = light ? 'light' : 'dark';
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);
    const resolved = normalizeTheme(savedTheme || legacyTheme);
    setBgColor(resolved);
    applyTheme(resolved);
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
    { id: 'dashboard', title: 'Dashboard' },
    { id: 'operator-panel', title: 'Operator Panel' },
    { id: 'Phones', title: 'Phone' },
    { id: 'ring-group', title: 'Ring Group' },
    { id: 'sound-files', title: 'Sound Files' },
    { id: 'call-flow', title: 'Call Flow' },
    { id: 'click-to-connect', title: 'Click to Connect' },
    { id: 'hotscan', title: 'HotScan' },
    { id: 'call-reports', title: 'Call Reports' },
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
    { id: 'dashboard', title: 'Dashboard', icon: Monitor },
    { 
      id: 'voice', 
      title: 'Voice', 
      icon: Phone,
      children: [
        { 
          id: 'pbx',
          title: 'PBX',
          icon: Router,
          children: [
            { id: 'operator-panel', title: 'Operator Panel', icon: Headset },
            { id: 'Phones', title: 'Phone', icon: Users },
            { id: 'ring-group', title: 'Ring Group', icon: Users }
          ]
        },
        { id: 'sound-files', title: 'Sound Files', icon: Volume2 },
        { id: 'call-flow', title: 'Call Flow', icon: Settings }
      ]
    },
    { id: 'click-to-connect', title: 'Click To Connect', icon: MousePointer },
    { id: 'hotscan', title: 'Hotscan', icon: Zap },
    { id: 'call-reports', title: 'Call Reports', icon: BarChart3 },
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
    localStorage.setItem(LEGACY_THEME_KEY, newColor);
    localStorage.setItem(THEME_KEY, newColor === 'white' ? 'light' : 'dark');
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
              <div className="space-y-10">
                <section>
                  <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-0">
                    It gives you a live snapshot of your communication setup — what's active, what's available, and what you can do next.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4">
                    Top Summary Cards
                  </h2>
                  <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                    At the top of the Dashboard, you'll see a quick system summary.
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click to Connect — active widgets and calling entry points</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">HotScan — active QR-based calling profiles</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Phone Accounts — configured Phones available for calling</li>
                  </ul>
                  <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-0">
                    This section answers one question instantly: "Is my system ready to receive calls right now?"
                  </p>
                </section>

                <section>
                  <img src="/images/user_manual/dashboard.png" alt="Dashboard Overview" className="w-full rounded-lg shadow-md mb-0" />
                </section>

                <section>
                  <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4">
                    Click to Connect
                  </h2>
                  <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                    Click to Connect enables instant voice conversations from the internet.
                  </p>
                  <ul className="list-disc pl-6 mb-0 space-y-2">
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Create new Click to Connect buttons</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Assign call flows</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Generate embed scripts for websites or apps</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Manage who receives calls</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4">
                    HotScan
                  </h2>
                  <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                    HotScan enables QR-based calling — no phone numbers required.
                  </p>
                  <ul className="list-disc pl-6 mb-0 space-y-2">
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Product packaging</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Business cards</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Flyers and brochures</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Physical locations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4">
                    Phone
                  </h2>
                  <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                    Phone is where you manage call-ready Phone accounts.
                  </p>
                  <ul className="list-disc pl-6 mb-0 space-y-2">
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Add new Phone accounts</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Manage existing Phone accounts</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Control active/inactive Phone status</li>
                    <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Prepare users to receive calls</li>
                  </ul>
                </section>

                <section>
                  <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6">
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base text-center m-0">
                      Start simple. Expand when ready. Conversations come first.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'operator-panel':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Operator Panel
            </h2>
            <p className="text-xl text-[#3c4043] dark:text-[#bdc1c6] mb-8 leading-7">
              Manage live calls with Operator Panel
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">What you're trying to do</h3>
                <p className="text-[#3c4043] dark:text-[#bdc1c6] mb-2">
                  See who is available to receive calls and monitor live calling status in real time.
                </p>
                <p className="text-[#5f6368] dark:text-[#9aa0a6]">
                  The Operator Panel shows all your extensions and their current state.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">When to use Operator Panel</h3>
                <p className="text-[#3c4043] dark:text-[#bdc1c6] mb-2">Use the Operator Panel when you want to:</p>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Check who is online or idle</li>
                  <li>• Know who is unavailable</li>
                  <li>• Monitor call readiness before routing calls</li>
                </ul>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mt-3 italic">
                  You don't configure anything here. This page is for visibility only.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">What you'll see on the screen</h3>
                <img src="/images/user_manual/operator_panel.png" alt="Operator Panel" className="w-full rounded-lg shadow-md mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-2">Search bar</h4>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6]">
                      Use the search field to quickly find extensions or users.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-2">Status tabs</h4>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">
                      The panel provides these tabs:
                    </p>
                    <ul className="space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4">
                      <li>• Available</li>
                      <li>• Unavailable</li>
                      <li>• All Phones</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-2">Auto Refresh</h4>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6]">
                      Auto Refresh keeps statuses updated in real time without manually reloading the page.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#202124] dark:text-[#e8eaed] mb-2">Phone cards</h4>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">Each card displays:</p>
                    <ul className="space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4">
                      <li>• Extension or destination number</li>
                      <li>• Status badge (for example: UNAVAILABLE)</li>
                      <li>• User name</li>
                      <li>• Channel type tag (Phone / Click to Connect / Hotscan)</li>
                    </ul>
                    <p className="text-[#5f6368] dark:text-[#9aa0a6] mt-2">
                      Use these details to understand who can receive calls and through which channel.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">What you don't do here</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">The Operator Panel is not used to:</p>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Create extensions</li>
                  <li>• Assign call flows</li>
                  <li>• Change routing rules</li>
                </ul>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mt-2">Those actions are done in other Voice sections.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Quick checklist</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">If calls aren't connecting as expected:</p>
                <ul className="space-y-2 text-[#3c4043] dark:text-[#bdc1c6]">
                  <li>• Open Operator Panel</li>
                  <li>• Check Available and Unavailable counts</li>
                  <li>• Verify status badges on Phone cards</li>
                  <li>• Make sure users are online and SoftPhone is running</li>
                  <li>• If extensions are unavailable, calls cannot be received</li>
                </ul>
              </section>
            </div>
          </div>
        );
      case 'Phones':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Phone
            </h2>
            <p className="text-xl text-[#3c4043] dark:text-[#bdc1c6] mb-8 leading-7">
              Create users who can make and receive calls
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Open Phone</h3>
                <p className="text-[#3c4043] dark:text-[#bdc1c6] mb-2">Navigate to: <span className="font-medium">Voice → PBX → Phone</span></p>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-2">You will see two tabs:</p>
                <ul className="space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4">
                  <li>• <span className="font-medium">Phones</span> – View and manage existing Phones</li>
                  <li>• <span className="font-medium">Add Phone</span> – Create a new Phone</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">View all Phones</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-3">
                  In the <span className="font-medium">Phones</span> tab, you can search, manage, renew, activate, or delete Phones.
                </p>
                <img src="/images/user_manual/phone_list.png" alt="Phone List" className="w-full rounded-lg shadow-md mb-4" />
                <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                  If a Phone is suspended, the action changes from <span className="font-medium">Renew</span> to <span className="font-medium">Activate</span> so you can re-enable it from the list.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Add a new Phone</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6] mb-4">To create a new Phone, go to the <span className="font-medium">Add Phone</span> tab.</p>
                <img src="/images/user_manual/add_phone.png" alt="Add Phone" className="w-full rounded-lg shadow-md mb-4" />
                <div className="p-3 rounded-lg bg-[#f1f3f4] dark:bg-[#3c4043]">
                  <p className="text-[#202124] dark:text-[#e8eaed] mb-1 font-medium">Billing note</p>
                  <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm m-0">
                    Up to 5 Phone creations are free for lifetime. After the first 5, additional Phones require a billing term (Monthly or Yearly).
                  </p>
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-3 sm:p-4 mb-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create Phone</p>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black"
                  >
                    <source src="/images/user_manual/videos/add_phones.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4 p-3 bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg">
                  <p className="text-[#202124] dark:text-[#e8eaed]">
                    Fill in the required fields, then click <span className="font-medium">Create Phone</span>.
                  </p>
                  <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm">The Phone will be created and activated immediately.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3">Manage, Renew, Activate</h3>
                <p className="text-[#5f6368] dark:text-[#9aa0a6]">
                  Use <span className="font-medium">Manage</span> to open details. Use <span className="font-medium">Renew</span> to select Monthly/Yearly. If suspended, use <span className="font-medium">Activate</span> from the same row.
                </p>
              </section>
            </div>
          </div>
        );

      case 'sound-files':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Sounds
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Upload and manage audio for IVR, announcements, and prompts
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Sounds</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Navigate to: <span className="font-medium">Voice → Sound Files</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-0">
                  You will see two tabs: <span className="font-medium">Sound Files</span> and <span className="font-medium">Add Sound File</span>.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add a Sound File</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  In the <span className="font-medium">Add Sound File</span> tab, enter the name, upload the audio file, then click <span className="font-medium">Save</span>.
                </p>
                <img src="/images/user_manual/add_sound_file.png" alt="Add Sound File" className="w-full rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Fields shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Sound Name</li>
                  <li>• Audio File</li>
                  <li>• Supported formats: MP3, WAV (auto-converts to 8kHz 16-bit Mono WAV)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sound Files List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  In the <span className="font-medium">Sound Files</span> tab, you can search and manage uploaded sound files.
                </p>
                <img src="/images/user_manual/sound_file_list.png" alt="Sound Files List" className="w-full rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created Time</li>
                  <li>• Sound Name</li>
                  <li>• Sound File (player)</li>
                  <li>• Assigned User</li>
                  <li>• Status</li>
                  <li>• Verify</li>
                  <li>• Action (Delete)</li>
                </ul>
              </section>

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
              Create and manage call routing flows
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Call Flow</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Navigate to: <span className="font-medium">Voice → Call Flow</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-0">
                  Tabs: <span className="font-medium">Call Flow List</span>, <span className="font-medium">Create Call Flow</span>
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Call Flow List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  The list shows all created call flows. You can search and manage them.
                </p>
                <img
                  src="/images/user_manual/call_flow_list.png"
                  alt="Call Flow List"
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Sl</li>
                  <li>• Date Time</li>
                  <li>• Name</li>
                  <li>• Flow Code</li>
                  <li>• Assigned To</li>
                  <li>• Action (Edit, Delete)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create Call Flow</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  In <span className="font-medium">Create Call Flow</span>, enter a <span className="font-medium">Flow Name</span>, click{' '}
                  <span className="font-medium">Insert step here</span>, select a step, then click <span className="font-medium">Save</span>.
                </p>
                <img
                  src="/images/user_manual/add_call_flow.png"
                  alt="Create Call Flow"
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-3 sm:p-4 mt-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create Call Flow</p>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black"
                  >
                    <source src="/images/user_manual/videos/call_flow.mp4" type="video/mp4" />
                  </video>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Steps shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Start Call Flow: Input Flow Name</li>
                  <li>• Insert step here</li>
                  <li>• Choose a step: Playback, Dial, Menu, Hangup</li>
                  <li>• Save</li>
                </ul>
              </section>
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
                  <li>• <span className="font-medium">Phones</span> for users/devices who receive calls</li>
                  <li>• <span className="font-medium">Ring Group</span> to define call distribution strategy</li>
                  <li>• <span className="font-medium">Call Flow</span> to route calls (Ring Group/IVR/Queue/Phone/Voicemail)</li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Example: Support Team -&gt; Phones 101, 102, 103
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
                      Visitor Click -&gt; Widget -&gt; Call Flow -&gt; Ring Group -&gt; Phones
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
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Phones</p>
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
                <div className="space-y-8">
                  <section>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Connect List</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      The main list shows all created Click to Connect widgets.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                      <li>• Created Time</li>
                      <li>• Due Date</li>
                      <li>• Status</li>
                      <li>• Connect Name</li>
                      <li>• Phone</li>
                      <li>• Call Flow</li>
                      <li>• Assigned User</li>
                      <li>• Embed Code (View Script)</li>
                      <li>• Renew / Activate</li>
                      <li>• Action (Edit, Delete)</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">
                      Up to 5 widget creations are free for lifetime. After the first 5, additional widgets require a billing term (Monthly or Yearly).
                    </p>
                  </section>

                  <section>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Step 1: Basic Info</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Enter <span className="font-medium">Widget Name</span> and select <span className="font-medium">Hotline</span>, then click <span className="font-medium">Next</span>.
                    </p>
                    <img src="/images/user_manual/add_click_to_connect_step_1.png" alt="Click to Connect Step 1" className="w-full rounded-lg shadow-md" />
                  </section>

                  <section>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Step 2: Styling & Preview</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Customize the widget states (<span className="font-medium">Initial</span>, <span className="font-medium">Dialing</span>, <span className="font-medium">Calling</span>, <span className="font-medium">End Call</span>) and check the preview, then click <span className="font-medium">Next</span>.
                    </p>
                    <img src="/images/user_manual/add_c2c_step_2.png" alt="Click to Connect Step 2" className="w-full rounded-lg shadow-md" />
                  </section>

                  <section>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Step 3: Preview & Submit</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Review the live preview, then click <span className="font-medium">Submit</span>.
                    </p>
                    <img src="/images/user_manual/add_c2c_step_3.png" alt="Click to Connect Step 3" className="w-full rounded-lg shadow-md" />
                  </section>
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create Click to Connect</p>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black"
                  >
                    <source src="/images/user_manual/videos/click_to_connect.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">View Script (Embed Code)</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  In the list, click <span className="font-medium">View Script</span> to open the embed code modal.
                </p>
                <img src="/images/website/script.png" alt="Widget Embed Code Modal" className="w-full rounded-lg shadow-md mb-4" />
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Copy the script and paste it into your website HTML, just before the closing <span className="font-medium">&lt;/body&gt;</span> tag</li>
                  <li>• This widget only works on <span className="font-medium">HTTPS</span> websites (WebRTC security requirement)</li>
                  <li>• Use <span className="font-medium">Copy Code</span> to copy the script</li>
                  <li>• The modal also shows the <span className="font-medium">Widget ID</span></li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Select a Hotline and Call Flow before creating a widget</li>
                  <li>• If a widget is suspended, the row shows <span className="font-medium">Activate</span> instead of Renew</li>
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Before You Create HotScan</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Make sure these are set up first:
                  </p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• <span className="font-medium">Phones</span> (users/devices who will receive calls)</li>
                    <li>• <span className="font-medium">Ring Group</span> (optional, recommended for teams)</li>
                    <li>• <span className="font-medium">Call Flow</span> (routes HotScan calls to Ring Group/Phone)</li>
                  </ul>
                </section>

	              <section>
	                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">HotScan Profiles</h3>
	                <p className="text-gray-700 dark:text-gray-300 mb-2">
	                  HotScan Profiles are the QR widgets you create and manage.
                </p>
                <img
                  src="/images/user_manual/hotscan_list.png"
                  alt="HotScan Profiles List"
                  className="w-full max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mb-4"
                />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Tabs: <span className="font-medium">HotScan Profiles</span>, <span className="font-medium">Create QR</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Logo</li>
                  <li>• Created On</li>
                  <li>• Due Date</li>
                  <li>• Widget Name</li>
                  <li>• Call Flow</li>
                  <li>• Phone</li>
                  <li>• Status</li>
                  <li>• Assigned To</li>
                  <li>• Renew / Activate</li>
                  <li>• Action (View QR, Edit, Delete)</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Free up to 5 profile creations, lifetime. After the first 5, additional profiles require a billing term (Monthly or Yearly).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create QR (Add Profile)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Use <span className="font-medium">Create QR</span> to create a new HotScan profile.
                </p>
                <img
                  src="/images/user_manual/add_hotscan.png"
                  alt="HotScan Add Profile"
                  className="w-full max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mb-4 cursor-zoom-in"
                />
                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create HotScan</p>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black"
                  >
                    <source src="/images/user_manual/videos/hotscan.mp4" type="video/mp4" />
                  </video>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Widget Information (Required):</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Logo *</li>
                  <li>• Display Name *</li>
                  <li>• Sub Heading</li>
                  <li>• Call Flow *</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Optional sections:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Company Information (Optional)</li>
                  <li>• Social Media (Optional)</li>
                  <li>• QR Reference (Optional): Generate New QR Reference (reuse for already printed posters)</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Billing:</p>
                <p className="text-gray-700 dark:text-gray-300 mb-0">
                  Free up to 5 creations, lifetime.
                </p>

                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-0">
                  Live Preview (right side) shows your logo, business name, sub heading, and the <span className="font-medium">Start Call</span> button.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  When intent is physical, connection should be instant.
                </p>
              </div>
            </div>
          </div>
        );

      case 'call-reports':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Call Detail Record
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Search and review call history
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Call Detail Record</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Navigate to: <span className="font-medium">Reports → Call Reports</span>
                </p>
                <img src="/images/user_manual/call_report.png?v=2" alt="Call Detail Record" className="w-full rounded-lg shadow-md mb-4" />
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Filter by Date Range</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Select the date range from the picker, then click <span className="font-medium">Filter</span>.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">CDR Summary</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Date Time</li>
                  <li>• Calls</li>
                  <li>• Answer</li>
                  <li>• Busy</li>
                  <li>• Congestion</li>
                  <li>• No Answer</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">CDR Details</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Filters shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Disposition dropdown (example: <span className="font-medium">All</span>)</li>
                  <li>• Search box</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Date Time</li>
                  <li>• Caller</li>
                  <li>• Destination</li>
                  <li>• Duration</li>
                  <li>• Disposition</li>
                  <li>• Recording</li>
                </ul>
              </section>
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
              Create and track support requests
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Tickets</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-0">
                  Navigate to: <span className="font-medium">Dashboard → Tickets</span>
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tickets List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Tabs: <span className="font-medium">Tickets</span>, <span className="font-medium">Create Ticket</span>
                </p>
                <img src="/images/user_manual/ticket_list.png" alt="Tickets List" className="w-full rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Filters shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Ticket ID</li>
                  <li>• Date range (From, To)</li>
                  <li>• Search button</li>
                  <li>• Reset button</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Table controls:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Rows per page</li>
                  <li>• Search box (top-right)</li>
                  <li>• Pagination</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created Time</li>
                  <li>• Ticket Id</li>
                  <li>• Ticket Type</li>
                  <li>• Description</li>
                  <li>• Comment</li>
                  <li>• Assigned User</li>
                  <li>• Status (Open, Closed)</li>
                  <li>• Action (View)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a Ticket</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Open <span className="font-medium">Create Ticket</span>, fill the form, then click <span className="font-medium">Save</span>.
                </p>
                <img src="/images/user_manual/create_ticket.png" alt="Create Ticket" className="w-full max-w-3xl rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Support Commitment: support resolves tickets within 24 hours.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Fields shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Ticket Type *</li>
                  <li>• Description *</li>
                  <li>• Save</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Ticket Type options:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Bug Report</li>
                  <li>• Feature Request</li>
                  <li>• Technical Support</li>
                  <li>• Account Issue</li>
                  <li>• Billing Inquiry</li>
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

      case 'ring-group':
        return (
          <div>
            <h2 className="text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight">
              Ring Group
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Route calls to teams, not just individuals.
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Ring Group</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Navigate to: <span className="font-medium">Voice → PBX → Ring Group</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-0">
                  You will see two tabs: <span className="font-medium">Ring Groups</span> and <span className="font-medium">Add Ring Group</span>.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ring Groups List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  In the <span className="font-medium">Ring Groups</span> tab, you can view, search, edit, or delete ring groups.
                </p>
                <img src="/images/user_manual/ring_group_list.png" alt="Ring Groups List" className="w-full rounded-lg shadow-md mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Columns shown:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created Time</li>
                  <li>• Group Number</li>
                  <li>• Group Description</li>
                  <li>• Assigned To</li>
                  <li>• Status</li>
                  <li>• Action (Edit / Delete)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a Ring Group</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  In the <span className="font-medium">Add Ring Group</span> tab, fill in the form and click <span className="font-medium">Create Ring Group</span>.
                </p>
                <img src="/images/user_manual/add_ring_group.png" alt="Add Ring Group" className="w-full rounded-lg shadow-md mb-4" />
                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Video Guide: Create Ring Group</p>
                  <video
                    src="/images/user_manual/videos/ring_group.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Fields shown:</p>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. <span className="font-medium">Group Description</span></li>
                  <li>2. <span className="font-medium">Phone List</span> (or <span className="font-medium">Select Phones</span>)</li>
                  <li>3. <span className="font-medium">Ring Strategy</span></li>
                  <li>4. <span className="font-medium">Ring Time</span></li>
                  <li>5. <span className="font-medium">Music On Hold</span></li>
                  <li>6. <span className="font-medium">Ring Group Status</span></li>
                </ol>
              </section>
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
              Top up your balance and track payments.
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Wallet shows your <span className="font-medium">Remaining Balance</span> and lets you <span className="font-medium">Topup Now</span>.
                </p>
              </section>

              <section>
                <img src="/images/user_manual/wallet.png" alt="Wallet page" className="w-full rounded-lg shadow-md" />
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Top Up Balance</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Navigate to: <span className="font-medium">Dashboard → Wallet</span>
                </p>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Click <span className="font-medium">Topup Now</span></li>
                  <li>2. In <span className="font-medium">Make Payment</span>, select a payment method:</li>
                  <li>• <span className="font-medium">bKash Mobile Banking</span></li>
                  <li>• <span className="font-medium">SSL Commerce</span></li>
                  <li>3. Enter the <span className="font-medium">Amount</span></li>
                  <li>4. Click <span className="font-medium">Proceed To Payment</span> and complete the checkout</li>
                </ol>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Payment Logs</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Click <span className="font-medium">View Logs</span> to check your payment history.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Balance updates after a successful payment.</li>
                  <li>• Use <span className="font-medium">Payment Logs</span> if a top up is not reflected yet.</li>
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
                  The SoftPhone application lets you make and receive calls directly from your device using your Sohub Connect Phone.
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  No desk phone needed. Just install, register, and talk.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What You Need</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• A created Phone (from Voice → PBX → Phones)</li>
                  <li>• Phone number and password</li>
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Register Your Phone</h3>
                <img
                  src="/images/user_manual/softphone1.png"
                  alt="SoftPhone Registration"
                  className="w-full max-w-xs sm:max-w-none sm:w-[30%] mx-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After installing the SoftPhone:
                </p>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Open the application</li>
                  <li>2. Enter your <span className="font-medium">Phone Number</span></li>
                  <li>3. Enter your <span className="font-medium">Phone Password</span></li>
                  <li>4. Click <span className="font-medium">Register</span></li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Once registered, your Phone status will show as "Online" and you're ready to make and receive calls.
                </p>
                <img
                  src="/images/user_manual/softphone2.png"
                  alt="SoftPhone Online Status"
                  className="w-full max-w-xs sm:max-w-none sm:w-[25%] mx-auto rounded-lg shadow-md mb-4"
                />
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
                  <li>• Phone must be active to register</li>
                  <li>• One Phone can be registered on multiple devices</li>
                  <li>• Stable internet connection is required for call quality</li>
                </ul>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                  Your Phone. Your device. Anywhere.
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
