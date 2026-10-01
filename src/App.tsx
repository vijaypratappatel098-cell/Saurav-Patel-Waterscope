import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GeoImageModal } from './components/GeoImageModal';
import { SearchModal } from './components/SearchModal';
import { NotificationModal } from './components/NotificationModal';
import { AskWatershedModal } from './components/AskWatershedModal';

// Existing Views
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { GeoImagesView } from './views/GeoImagesView';
import { WatershedAnalysisView } from './views/WatershedAnalysisView';
import { ThematicMapsView } from './views/ThematicMapsView';
import { ChangeDetectionView } from './views/ChangeDetectionView';
import { InterventionsView } from './views/InterventionsView';
import { InsightsView } from './views/InsightsView';
import { AnalyticsView } from './views/AnalyticsView';
import { ComparisonView } from './views/ComparisonView';
import { DataSourcesView } from './views/DataSourcesView';
import { AboutView } from './views/AboutView';

// New Advanced Watershed Intelligence Views (Features 1 - 12)
import { IntelligenceHubView } from './views/IntelligenceHubView';
import { TransformationSliderView } from './views/TransformationSliderView';
import { PhotoMapStoryView } from './views/PhotoMapStoryView';
import { AskWatershedView } from './views/AskWatershedView';
import { ConditionScoreView } from './views/ConditionScoreView';
import { WhatChangedHereView } from './views/WhatChangedHereView';
import { InterventionImpactExplorerView } from './views/InterventionImpactExplorerView';
import { ProblemHotspotView } from './views/ProblemHotspotView';
import { LayerMixerView } from './views/LayerMixerView';
import { GeoImageValidationView } from './views/GeoImageValidationView';
import { ReportGeneratorView } from './views/ReportGeneratorView';
import { DigitalWatershedTwinView } from './views/DigitalWatershedTwinView';
import { WatershedDataStoryView } from './views/WatershedDataStoryView';

import { GeoCodedImage, WatershedIntervention } from './types/watershed';
import { GEO_CODED_IMAGES } from './data/watershedData';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeImageModal, setActiveImageModal] = useState<GeoCodedImage | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState<boolean>(false);
  const [askAiModalOpen, setAskAiModalOpen] = useState<boolean>(false);
  const [selectedStoryImageId, setSelectedStoryImageId] = useState<string>(GEO_CODED_IMAGES[0].id);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on view navigation
  const handleNavigate = (view: string, itemId?: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (itemId && view === 'geo-images') {
      const match = GEO_CODED_IMAGES.find((img) => img.id === itemId);
      if (match) setActiveImageModal(match);
    }
  };

  const handleSelectImageForInspection = (image: GeoCodedImage) => {
    setActiveImageModal(image);
  };

  const handleViewImageOnDashboard = (image: GeoCodedImage) => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewMapStory = (image: GeoCodedImage) => {
    setSelectedStoryImageId(image.id);
    setCurrentView('photo-map-story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white relative">
      {/* Global Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenNotifications={() => setNotificationModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Existing Core Views */}
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectImage={handleSelectImageForInspection}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            onSelectImage={handleSelectImageForInspection}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'geo-images' && (
          <GeoImagesView
            onSelectImage={handleSelectImageForInspection}
            onViewOnDashboard={handleViewImageOnDashboard}
          />
        )}

        {currentView === 'watershed-analysis' && (
          <WatershedAnalysisView onNavigate={handleNavigate} />
        )}

        {currentView === 'thematic-maps' && (
          <ThematicMapsView
            onLoadLayerInDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {currentView === 'change-detection' && <ChangeDetectionView onNavigate={handleNavigate} />}

        {currentView === 'interventions' && (
          <InterventionsView
            onSelectInterventionOnMap={() => handleNavigate('dashboard')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'insights' && <InsightsView onNavigate={handleNavigate} />}

        {currentView === 'analytics' && <AnalyticsView />}

        {currentView === 'comparison' && <ComparisonView onNavigate={handleNavigate} />}

        {currentView === 'data-sources' && <DataSourcesView onNavigate={handleNavigate} />}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}

        {/* New Advanced Intelligence Views (Features 1 - 12) */}
        {currentView === 'intelligence' && (
          <IntelligenceHubView onNavigate={handleNavigate} />
        )}

        {currentView === 'transformation-slider' && (
          <TransformationSliderView onNavigate={handleNavigate} />
        )}

        {currentView === 'photo-map-story' && (
          <PhotoMapStoryView
            initialImageId={selectedStoryImageId}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'ask-watershed' && (
          <AskWatershedView onNavigate={handleNavigate} />
        )}

        {currentView === 'condition-score' && (
          <ConditionScoreView onNavigate={handleNavigate} />
        )}

        {currentView === 'what-changed' && (
          <WhatChangedHereView onNavigate={handleNavigate} />
        )}

        {currentView === 'impact-explorer' && (
          <InterventionImpactExplorerView onNavigate={handleNavigate} />
        )}

        {currentView === 'hotspots' && (
          <ProblemHotspotView onNavigate={handleNavigate} />
        )}

        {currentView === 'layer-mixer' && (
          <LayerMixerView onNavigate={handleNavigate} />
        )}

        {currentView === 'image-validation' && (
          <GeoImageValidationView onNavigate={handleNavigate} />
        )}

        {currentView === 'report-generator' && (
          <ReportGeneratorView onNavigate={handleNavigate} />
        )}

        {currentView === 'digital-twin' && (
          <DigitalWatershedTwinView onNavigate={handleNavigate} />
        )}

        {currentView === 'data-story' && (
          <WatershedDataStoryView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating "Take Help" Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAskAiModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border-2 border-white"
          title="Take Help - Watershed Assistant"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-tight">Take Help</span>
        </button>
      </div>

      {/* Modals */}
      <GeoImageModal
        image={activeImageModal}
        onClose={() => setActiveImageModal(null)}
        onViewOnMap={(img) => {
          setActiveImageModal(null);
          handleViewImageOnDashboard(img);
        }}
        onViewMapStory={handleViewMapStory}
        onValidateImage={(_img) => {
          setActiveImageModal(null);
          handleNavigate('image-validation');
        }}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        onActionClick={(target) => handleNavigate(target)}
      />

      <AskWatershedModal
        isOpen={askAiModalOpen}
        onClose={() => setAskAiModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
