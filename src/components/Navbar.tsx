import React, { useState } from 'react';
import {
  Compass,
  Search,
  Bell,
  User,
  Menu,
  X,
  Layers,
  MapPin,
  ChevronDown,
  Sparkles,
  Bot,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenNotifications
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [intelligenceDropdownOpen, setIntelligenceDropdownOpen] = useState(false);

  // Primary visible links in desktop top bar contract (4-6 main links)
  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'geo-images', label: 'Geo-Images' },
    { id: 'watershed-analysis', label: 'Analysis' },
    { id: 'thematic-maps', label: 'Thematic Maps' },
    { id: 'change-detection', label: 'Change' }
  ];

  // Advanced Watershed Intelligence Modules (New Features 1 - 12)
  const intelligenceNavItems = [
    { id: 'intelligence', label: 'Intelligence Hub (All Tools)' },
    { id: 'transformation-slider', label: 'Before / After Slider' },
    { id: 'photo-map-story', label: 'Photo → Map Story' },
    { id: 'ask-watershed', label: '“Ask the Watershed” AI' },
    { id: 'condition-score', label: 'Condition Score (74/100)' },
    { id: 'what-changed', label: '“What Changed Here?”' },
    { id: 'impact-explorer', label: 'Intervention Impact Explorer' },
    { id: 'hotspots', label: 'Problem Hotspot Map' },
    { id: 'layer-mixer', label: 'GIS Layer Mixer' },
    { id: 'image-validation', label: 'Geo-Image Validation' },
    { id: 'report-generator', label: 'Generate Watershed Report' },
    { id: 'digital-twin', label: 'Digital Watershed Twin' },
    { id: 'data-story', label: 'Watershed Data Story' }
  ];

  // Secondary items in clean "More" dropdown
  const secondaryNavItems = [
    { id: 'interventions', label: 'Interventions' },
    { id: 'insights', label: 'Insights' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'comparison', label: 'Field vs Satellite' },
    { id: 'data-sources', label: 'Data Sources' },
    { id: 'about', label: 'About Project' }
  ];

  const allNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'GIS Dashboard' },
    { id: 'intelligence', label: 'Intelligence Hub' },
    { id: 'transformation-slider', label: 'Before / After Slider' },
    { id: 'photo-map-story', label: 'Photo Map Story' },
    { id: 'ask-watershed', label: 'Ask Watershed AI' },
    { id: 'condition-score', label: 'Condition Score' },
    { id: 'what-changed', label: 'What Changed Here?' },
    { id: 'impact-explorer', label: 'Intervention Impact' },
    { id: 'hotspots', label: 'Problem Hotspots' },
    { id: 'layer-mixer', label: 'GIS Layer Mixer' },
    { id: 'image-validation', label: 'Image Validation' },
    { id: 'report-generator', label: 'Report Generator' },
    { id: 'digital-twin', label: 'Digital Twin' },
    { id: 'data-story', label: 'Data Story' },
    { id: 'geo-images', label: 'Geo-Coded Images' },
    { id: 'watershed-analysis', label: 'Watershed Analysis' },
    { id: 'thematic-maps', label: 'Thematic Maps' },
    { id: 'change-detection', label: 'Change Detection' },
    { id: 'interventions', label: 'Interventions' },
    { id: 'insights', label: 'Insights' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'comparison', label: 'Field vs Satellite' },
    { id: 'data-sources', label: 'Data Sources' },
    { id: 'about', label: 'About & Methodology' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  WATERSCOPE
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase">
                  Geospatial Watershed Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {primaryNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-emerald-700 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-600'
                      : 'hover:text-slate-900 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Intelligence Suite Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIntelligenceDropdownOpen(!intelligenceDropdownOpen);
                  setMoreDropdownOpen(false);
                }}
                className={`flex items-center gap-1 py-1 transition-colors cursor-pointer font-medium ${
                  intelligenceNavItems.some((it) => it.id === currentView)
                    ? 'text-emerald-700 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span>Intelligence</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${intelligenceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {intelligenceDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in max-h-96 overflow-y-auto"
                  onMouseLeave={() => setIntelligenceDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Watershed Intelligence Suite
                  </div>
                  {intelligenceNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIntelligenceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        currentView === item.id
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {currentView === item.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setMoreDropdownOpen(!moreDropdownOpen);
                  setIntelligenceDropdownOpen(false);
                }}
                className="flex items-center gap-1 py-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {secondaryNavItems.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onNavigate(s.id);
                        setMoreDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        currentView === s.id ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{s.label}</span>
                      {currentView === s.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: 1-2 primary actions + functional affordances */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Search Geo Features (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications & Telemetry"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            </button>

            {/* Help Quick Trigger */}
            <button
              onClick={() => onNavigate('ask-watershed')}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              title="Help & Watershed Assistant"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Help</span>
            </button>

            {/* Open GIS Dashboard CTA */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer hover:shadow-md"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Open GIS Dashboard</span>
            </button>

            {/* User Profile */}
            <button
              onClick={() => onNavigate('about')}
              className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors"
              title="Project Officer Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top">
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {allNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg shadow-sm"
          >
            <Layers className="w-4 h-4" /> Open GIS Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
