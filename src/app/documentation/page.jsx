import { useState } from 'react';
import { Search, Menu, ChevronRight, ChevronDown, Phone, Users, BarChart3, CreditCard, Ticket, Wallet, Package, FileText, Clock, CheckCircle, XCircle, AlertCircle, Play, PhoneCall, MousePointer, Zap, Settings, Headphones, Volume2, Mic, MicOff, PhoneIncoming, PhoneOutgoing, Globe, Code, Smartphone, Monitor, Router, UserCheck, Shield, Headset, Download, Layers, Route } from 'lucide-react';

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ voice: true, reports: true });
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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
    { id: 'click-to-connect', title: 'Click To Connect' },
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
    { id: 'click-to-connect', title: 'Click To Connect', icon: MousePointer },
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
              ? 'bg-[#e8f0fe] dark:bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#8ab4f8]'
              : 'text-white dark:text-white hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043]'
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
          {!hasChildren && <Icon className="w-4 h-4 mr-2 flex-shrink-0" />}
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
          <div className="mt-1">
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
              SOHUB Connect is a numberless, internet-first communication platform designed to start real voice conversations the moment customer intent appears.
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                Instead of dialing phone numbers, customers connect instantly — through a click or a scan.
              </p>
              
              <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-8">
                <p className="text-[#202124] dark:text-[#e8eaed] text-lg font-medium text-center m-0">
                  Click. Scan. Talk.
                </p>
              </div>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                At the same time, SOHUB Connect is not a limited tool. Behind this simple experience lives a complete, cloud-native PBX system built for real business operations.
              </p>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Numberless by Design
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Traditional calling depends on phone numbers, SIM cards, and telecom infrastructure. SOHUB Connect removes these dependencies entirely.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                There are:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">No phone numbers to share or manage</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">No dialing steps for customers</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">No location-based limitations</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                Conversations start directly over the internet, making communication faster, safer, and private by default.
              </p>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Full PBX Capabilities, When You Need Them
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                While customers experience simplicity, businesses retain full control.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                SOHUB Connect includes a complete set of PBX and voice management features, such as:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">User extensions and softphone access</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Inbound and outbound call routing</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Ring groups and closed user groups</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Call flows, sound files, and text-to-speech</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Caller ID and trunk management</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Call reports, billing logs, and usage history</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                All features are optional and modular. You use only what your operation requires.
              </p>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                One Entry Point, Many Possibilities
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                Customers always reach you the same way:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">One click</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">One scan</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Instant conversation</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                Internally, calls can be handled:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">By a single user</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">By a team</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">By routing rules</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">By custom call flows</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                This separation keeps the customer experience simple while allowing businesses to scale without friction.
              </p>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Built to Start Simple and Scale Naturally
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                SOHUB Connect does not force complex setup.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                You can begin with:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">One Click-to-Connect button</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">One HotScan QR code</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">One team member</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                As volume and complexity grow, advanced PBX features can be added without changing how customers connect.
              </p>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Designed for Real Conversations
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Every part of SOHUB Connect follows one rule:
              </p>
              
              <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-6">
                <p className="text-[#202124] dark:text-[#e8eaed] text-lg font-medium m-0">
                  Reduce the time between intent and conversation to zero.
                </p>
              </div>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                Features exist to support conversations, not distract from them.
              </p>

              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                The Communication Layer for Modern Businesses
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                SOHUB Connect can function as:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A numberless call button</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A QR-based hotline replacement</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A lightweight cloud PBX</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A full communication system for growing teams</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                Same platform. Same philosophy. Different depth.
              </p>

              <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-8">
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
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                You don't configure everything at once. You simply start, then expand when needed.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Top Summary Cards
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                At the top of the Dashboard, you'll see a quick system summary.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                These cards show:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click-to-Call Buttons — how many are active</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">HotScan Profiles — QR-based calling profiles currently in use</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Extension Users — team members available to receive calls</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                This section answers one question instantly: "Is my system ready to receive calls right now?"
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Click-to-Connect Profiles
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Click-to-Connect Profiles power instant voice conversations from the internet.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                Each profile represents:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A call entry point (button or link)</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A defined call flow</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">A responsible owner or team</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                From here you can:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Create new click-to-call buttons</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Assign call flows</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Generate embed scripts for websites or apps</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Manage who receives calls</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                One click is all it takes to turn interest into conversation.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                HotScan Profiles
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                HotScan Profiles enable QR-based calling — no phone numbers required.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                Each HotScan profile defines:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">What happens when a QR code is scanned</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Where the call is routed</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">What information is shared (URL, contact, vCard, etc.)</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                HotScan works anywhere:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Product packaging</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Business cards</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Flyers and brochures</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Delivery slips</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Physical locations</li>
              </ul>
              
              <div className="bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6 my-6">
                <p className="text-[#202124] dark:text-[#e8eaed] text-lg font-medium m-0">
                  Scan. Connect. Talk.
                </p>
              </div>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Extension Users
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                Extension Users are the people behind the conversations.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                From this section you can:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Add or remove team members</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Assign extensions</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Control call availability</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Manage free and paid users based on your plan</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                Extensions work across:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click-to-Connect</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">HotScan</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Traditional PBX call flows</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                One system. One team. Multiple entry points.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Action-Oriented Design
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                The Dashboard is built for action, not observation.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                Every section includes:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Clear status indicators</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Direct action buttons</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Minimal configuration steps</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                You never need to "set everything up" before starting. You can begin with one button or one QR — and grow from there.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Traditional PBX + Numberless Calling, Together
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                SOHUB Connect does not force a single way of working.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                From the same Dashboard, you can manage:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Internet-first, numberless calling (Click-to-Connect, HotScan)</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Traditional PBX features (extensions, call flows, routing)</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Reports, billing, tickets, and system tools</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                Use only what you need. Everything else stays available when you're ready.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Designed to Grow With You
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                As your business scales, the Dashboard scales naturally.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                You can:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Add users</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Enable advanced routing</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Track usage</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Upgrade packages</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Monitor performance</li>
              </ul>
              
              <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base leading-7 mb-6">
                The interface stays familiar. Only capability increases.
              </p>
              
              <h2 className="text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-12 mb-4">
                Your Control Center
              </h2>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4">
                The Dashboard is not just a homepage.
              </p>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-2">
                It is:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Your system overview</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Your action hub</li>
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Your starting point</li>
              </ul>
              
              <p className="text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-6">
                Every feature in SOHUB Connect begins here.
              </p>
              
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
                <li className="text-[#202124] dark:text-[#e8eaed] text-base leading-7">Click-to-Connect calls</li>
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
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Create users who can make and receive calls
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Extensions are the core user accounts in Sohub Connect. Each extension typically represents a person, a softphone, or a desk phone that can make and receive calls.
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What you can do here</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Create new extensions</li>
                  <li>• View all existing extensions</li>
                  <li>• Assign caller IDs to extensions</li>
                  <li>• Activate or deactivate extensions</li>
                  <li>• Manage or delete extensions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Extensions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Navigate to: <span className="font-medium">Voice → PBX → Extensions</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">You will see two tabs:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• <span className="font-medium">Extensions</span> – View and manage existing extensions</li>
                  <li>• <span className="font-medium">Add Extension</span> – Create a new extension</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">View all Extensions</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">In the Extensions tab, you can see a list of all created extensions.</p>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Columns explained</h4>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Extension Type</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Indicates the account type (usually "Extension").</p>
                  </div>
                  <div>
                    <span className="font-medium">Display Name</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The name of the user or the extension. This appears in Operator Panel and reports.</p>
                  </div>
                  <div>
                    <span className="font-medium">Caller ID</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The phone number that will be shown to recipients during outgoing calls.</p>
                  </div>
                  <div>
                    <span className="font-medium">Assigned User</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The Sohub account or company the extension is assigned to.</p>
                  </div>
                  <div>
                    <span className="font-medium">Status</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active – The extension can make and receive calls | Inactive – Calls will not work</p>
                  </div>
                  <div>
                    <span className="font-medium">Manage (⚙️ icon)</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Edit extension settings.</p>
                  </div>
                  <div>
                    <span className="font-medium">Delete (🗑 icon)</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Permanently remove the extension.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Add a new Extension</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">To create a new extension, go to the Add Extension tab.</p>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Required fields</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Extension No *</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">A unique internal number for the extension.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Examples: 101, 105, 2112</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic">Extension numbers must be unique.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Display Name *</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">The name of the user or extension.</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Examples: Support Agent, Marketing Agent, Sales Desk</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic">This name will appear in the Operator Panel and call reports.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Caller ID</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Select an approved caller ID from the dropdown list.</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• This number will be displayed on outgoing calls</li>
                      <li>• Outgoing calls may fail if no caller ID is assigned</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Extension Password *</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">The login password used to register the extension on a softphone or IP phone.</p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 ml-4">
                      <li>• The system automatically generates a password</li>
                      <li>• You can manually edit the password if needed</li>
                      <li>• Click the refresh (🔄) icon to regenerate a new password</li>
                    </ul>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic mt-1">Save this password securely. It is required for softphone or device configuration.</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-gray-700 dark:text-gray-300">After filling in all required fields, click <span className="font-medium">Create Extension</span>.</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">The extension will be created and activated immediately.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">After creating an Extension</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Common next steps after creating an extension:</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Configure the extension in a softphone or IP phone</li>
                  <li>• Assign the extension to an inbound route or ring group</li>
                  <li>• Verify the extension status in the Operator Panel</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common mistakes and tips</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Duplicate extension numbers are not allowed</li>
                  <li>• Outgoing calls may not work without a caller ID</li>
                  <li>• Inactive extensions cannot receive calls</li>
                  <li>• Incorrect passwords will prevent softphone registration</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What you don't do here</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">The following configurations are not handled in the Extensions section:</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Call routing and IVR setup</li>
                  <li>• Inbound call flow design</li>
                  <li>• Billing and usage configuration</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">These are managed from other sections such as Inbound Route, Call Flow, and Reports.</p>
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
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
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
                  Click to Connect lets visitors start a voice call with your team instantly, directly from your website.
                  No phone numbers. No dialing. One click — the call follows your predefined call flow.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why Click to Connect Exists</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">People don't wait. They click.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Click to Connect helps you:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Add a one-click call button to your website</li>
                  <li>• Route calls using existing call flows</li>
                  <li>• Match the widget design with your brand</li>
                  <li>• Manage all widgets from one place</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create a Click to Connect Widget</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Navigate to: <span className="font-medium">Dashboard → Click to Connect → Create Click to Connect</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">The setup takes three simple steps.</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Step 1: Basic Information</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Define how the widget works.</p>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Widget Name</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">A clear internal name (example: Support Widget, Sales Button).</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Call Flow</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Select an existing call flow. This determines how the call will be handled (IVR, ring group, extension, etc.).</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">Click <span className="font-medium">Next</span> to continue.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Step 2: Widget Styling & Preview</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Customize how the button looks on your website.</p>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Widget States</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">You can design the widget for different call states:</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 space-y-1">
                          <li>• Initial – Default button state</li>
                          <li>• Dialing – Call is being initiated</li>
                          <li>• Calling – Call is connected</li>
                          <li>• End Call – Call ends</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">For each state, you can customize:</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 space-y-1">
                          <li>• Icon</li>
                          <li>• Background color</li>
                          <li>• Frame (border) color</li>
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Revert to Default</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Restore the system's default design at any time.</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Widget Preview</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Preview how the button looks and behaves before publishing.</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">Click <span className="font-medium">Next</span> to proceed.</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Step 3: Preview & Submit</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Live Preview</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">See the interactive widget exactly as users will experience it.</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Submit</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click Submit to create the widget.</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">The Click to Connect button is now ready to use.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Click to Connect List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">All widgets appear in the Click to Connect list.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each widget shows:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created Time – When it was created</li>
                  <li>• Connect Name – Widget name</li>
                  <li>• Extension Number – Assigned extension</li>
                  <li>• Call Flow – Linked call flow</li>
                  <li>• Assigned User – Owner or team</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Embed the Widget</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Click <span className="font-medium">View Script</span> to copy the embed code.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Paste the script into your website's HTML (Recommended: before the closing &lt;/body&gt; tag).</p>
                <p className="text-gray-600 dark:text-gray-400">Once added, the button becomes live immediately.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Actions</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Edit – Update design or call flow</li>
                  <li>• Delete – Permanently remove the widget</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Use Cases</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Website support call button</li>
                  <li>• Sales inquiry instant calling</li>
                  <li>• Helpdesk or service contact option</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• At least one Call Flow must exist before creating a widget</li>
                  <li>• Widget changes apply instantly after saving</li>
                  <li>• One Click to Connect button = one assigned user</li>
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
                  No phone numbers. No typing. Just scan → connect → talk or leave details.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  It works on posters, packaging, invoices, delivery slips, storefronts, and websites.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What HotScan Is Used For</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">HotScan helps you:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Capture high-intent ("hot") leads</li>
                  <li>• Route calls to call flows, extensions, or ring groups</li>
                  <li>• Collect customer details automatically</li>
                  <li>• Manage inquiries from one dashboard</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3 italic">
                  If Click to Connect is for websites, HotScan is for the real world.
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
                <p className="text-gray-700 dark:text-gray-300 mb-3">Click <span className="font-medium">Add HotScan Profile</span>.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">The setup has three parts.</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Widget Information</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Defines how the HotScan widget works.</p>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Display Name *</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">The name shown to customers.</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Call Flow *</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Choose where calls or interactions are routed:</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4 space-y-1">
                          <li>• Call Flow</li>
                          <li>• Extension</li>
                          <li>• Ring Group</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-500 text-sm italic mt-2">(* Required fields)</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Company Information</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Shown to customers inside the widget.</p>
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
                      This builds trust before the conversation starts.
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
                      <li>• Drag and drop or select a file</li>
                      <li>• The logo appears on the HotScan widget and QR preview</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Save Profile</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Click <span className="font-medium">Save</span> to create the HotScan profile.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Once saved:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• The profile appears in the HotScan list</li>
                  <li>• A QR code is generated instantly</li>
                  <li>• The QR code is ready to print and share</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Inquiries Overview</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  All leads generated from HotScan appear in Customer Inquiries.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Each inquiry shows:</p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Created At – Submission time</li>
                  <li>• Customer Name</li>
                  <li>• Phone</li>
                  <li>• Email</li>
                  <li>• Company</li>
                  <li>• Location</li>
                  <li>• Message</li>
                  <li>• Status</li>
                  <li>• Assigned To</li>
                  <li>• Profile ID</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  This allows teams to track, follow up, and close conversations efficiently.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How HotScan Works (Example)</h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>1. Customer scans a HotScan QR code</li>
                  <li>2. Widget opens with business details</li>
                  <li>3. Customer submits info or starts a call</li>
                  <li>4. Call is routed using the assigned call flow</li>
                  <li>5. Inquiry is logged automatically</li>
                  <li>6. Agent follows up</li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  No friction. No delay.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Place QR codes where intent is highest</li>
                  <li>• Use clear business information</li>
                  <li>• Assign the correct call flow</li>
                  <li>• Regularly review customer inquiries</li>
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
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Remaining Balance</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Shows the current available balance in your wallet.
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>• Balance is displayed in BDT (৳)</li>
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
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Free Plan</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Best for small teams or basic usage.</p>
                    
                    <div className="mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Price</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">৳0 / User / Month</p>
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">৳50 / User / Month</p>
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
    <div className="relative bg-[#242839] dark:bg-[#242839]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1928] dark:bg-[#1a1928] border-b border-[#dadce0] dark:border-[#5f6368] h-16">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] rounded-lg"
            >
              <Menu className="w-5 h-5 text-[#5f6368] dark:text-[#9aa0a6]" />
            </button>
            <h1 className="text-lg font-bold text-white dark:text-white">SOHUB Connect Docs</h1>
            <div className="flex-1 max-w-xs ml-8">
              <div 
                className="relative cursor-pointer"
                onClick={() => setSearchModalOpen(true)}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6]" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  readOnly
                  className="w-full pl-10 pr-4 py-2 bg-[#242839] dark:bg-[#242839] border-0 rounded-lg text-sm text-white dark:text-white placeholder-[#5f6368] dark:placeholder-[#9aa0a6] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-32">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => {
              setSearchModalOpen(false);
              setSearchQuery('');
              setSearchResults([]);
            }}
          />
          <div className="relative w-full max-w-md mx-4">
            <div className="bg-[#1a1928] rounded-xl shadow-2xl border border-[#5f6368]">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9aa0a6]" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-[#242839] border-0 rounded-lg text-base text-white placeholder-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                  />
                </div>
              </div>
              {searchResults.length > 0 && (
                <div className="max-h-96 overflow-y-auto border-t border-[#5f6368]">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => {
                        selectSection(result.id);
                        setSearchQuery('');
                        setSearchResults([]);
                        setSearchModalOpen(false);
                      }}
                      className="px-6 py-4 hover:bg-[#242839] cursor-pointer border-b border-[#5f6368] last:border-0"
                    >
                      <p className="text-base font-medium text-white">{result.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden"
      >
        <Menu className="w-5 h-5 text-[#5f6368] dark:text-[#9aa0a6]" />
      </button>

      {/* Sidebar - Fixed Left */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed left-0 top-16 z-40 w-72 bg-[#1a1928] dark:bg-[#1a1928] border-r border-[#dadce0] dark:border-[#5f6368] h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300`}>
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
          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
}