import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Layers,
  ArrowRight,
  Eye,
  Camera,
  Filter
} from 'lucide-react';
import { WATERSHED_INTERVENTIONS, WATERSHED_CONFIG } from '../data/watershedData';
import { WatershedIntervention, InterventionStatus } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';

interface InterventionsViewProps {
  onSelectInterventionOnMap: (itv: WatershedIntervention) => void;
  onNavigate?: (view: string) => void;
}

export const InterventionsView: React.FC<InterventionsViewProps> = ({ onSelectInterventionOnMap, onNavigate }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIntervention, setSelectedIntervention] = useState<WatershedIntervention>(
    WATERSHED_INTERVENTIONS[0]
  );
  const [activePhotoTab, setActivePhotoTab] = useState<'after' | 'before'>('after');

  const filteredInterventions = WATERSHED_INTERVENTIONS.filter(
    (itv) => statusFilter === 'all' || itv.status === statusFilter
  );

  const totalBenefitedHa = WATERSHED_INTERVENTIONS.reduce((acc, curr) => acc + curr.areaBenefitedHa, 0);
  const totalBeneficiaryFamilies = WATERSHED_INTERVENTIONS.reduce(
    (acc, curr) => acc + curr.farmerFamiliesBenefited,
    0
  );
  const totalExpenditure = WATERSHED_INTERVENTIONS.reduce((acc, curr) => acc + curr.costInr, 0);

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Watershed Civil & Biological Structures</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Development Interventions
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Location registry, beneficiary auditing, before-and-after photographic evidence, and measured hydrological outcomes.
          </p>
        </div>

        {/* Status Filter & Impact Explorer Link */}
        <div className="flex flex-wrap items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('impact-explorer')}
              className="px-3.5 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Impact Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="flex items-center gap-1.5">
            {['all', 'Completed', 'Ongoing', 'Planned'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st === 'all' ? 'All Structures' : st}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Aggregate KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Total Area Benefited</div>
            <div className="text-2xl font-black font-mono text-emerald-800 mt-0.5">
              {totalBenefitedHa} Hectares
            </div>
            <div className="text-[11px] text-slate-400">Protective irrigation & soil conservation</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Farmer Families Impacted</div>
            <div className="text-2xl font-black font-mono text-sky-800 mt-0.5">
              {totalBeneficiaryFamilies} Households
            </div>
            <div className="text-[11px] text-slate-400">Across 4 micro-catchment sectors</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Total Watershed Outlay</div>
            <div className="text-2xl font-black font-mono text-amber-800 mt-0.5">
              ₹{(totalExpenditure / 100000).toFixed(1)} Lakhs
            </div>
            <div className="text-[11px] text-slate-400">Funded under Integrated Watershed Schemes</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Split: Left Selected Detail Card, Right Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Detailed Selected Intervention (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                {selectedIntervention.id}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  selectedIntervention.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedIntervention.status === 'Ongoing'
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {selectedIntervention.status}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">{selectedIntervention.name}</h2>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedIntervention.location}</span>
              </div>
            </div>

            {/* Before / After Photo Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Ground Truthing Imagery</span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setActivePhotoTab('after')}
                    className={`px-2.5 py-0.5 rounded font-medium transition-colors ${
                      activePhotoTab === 'after' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Post-Work Reality
                  </button>
                  <button
                    onClick={() => setActivePhotoTab('before')}
                    className={`px-2.5 py-0.5 rounded font-medium transition-colors ${
                      activePhotoTab === 'before' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Satellite Context
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 h-56">
                <img
                  src={
                    activePhotoTab === 'after'
                      ? selectedIntervention.afterImageUrl
                      : selectedIntervention.beforeImageUrl
                  }
                  alt={selectedIntervention.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-white">
                  {selectedIntervention.lat.toFixed(5)}°N, {selectedIntervention.lng.toFixed(5)}°E
                </div>
              </div>
            </div>

            {/* Metric Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Intervention Category</span>
                <strong className="text-slate-800">{selectedIntervention.type}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Execution Date</span>
                <strong className="text-slate-800">{selectedIntervention.date}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Direct Beneficiary Area</span>
                <strong className="text-emerald-700 font-mono">{selectedIntervention.areaBenefitedHa} Ha</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Estimated Outlay</span>
                <strong className="text-slate-800 font-mono">₹{selectedIntervention.costInr.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Impact Observation */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-950">
              <span className="font-bold block mb-1">Demonstrated Field Impact:</span>
              <p className="leading-relaxed">{selectedIntervention.impactObservation}</p>
            </div>
          </div>
        </div>

        {/* Right: Map + Interventions List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs">
            <InteractiveMap
              height="360px"
              selectedInterventionId={selectedIntervention.id}
              onSelectIntervention={(itv) => setSelectedIntervention(itv)}
              showSidebarControls={false}
            />
          </div>

          {/* Cards List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredInterventions.map((itv) => {
              const isSelected = selectedIntervention.id === itv.id;
              return (
                <div
                  key={itv.id}
                  onClick={() => setSelectedIntervention(itv)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-orange-50/60 border-orange-500 ring-1 ring-orange-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={itv.afterImageUrl}
                      alt={itv.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{itv.name}</h4>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                            itv.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {itv.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {itv.type} · Benefited: <strong>{itv.areaBenefitedHa} Ha</strong> · Cost: ₹
                        {(itv.costInr / 100000).toFixed(1)}L
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
