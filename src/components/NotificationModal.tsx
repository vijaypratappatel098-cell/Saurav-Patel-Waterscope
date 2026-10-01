import React from 'react';
import { X, Satellite, CheckCircle2, AlertTriangle, RefreshCw, Bell } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (target: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, onActionClick }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'SRISHTI-DRISHTI Satellite Ingestion Complete',
      time: '12 minutes ago',
      desc: 'Sentinel-2 Surface Reflectance (Level-2A) for Upper Sina Watershed tile has been ingested and NDVI indices recalculated.',
      type: 'satellite',
      targetView: 'thematic-maps'
    },
    {
      id: 'notif-2',
      title: 'Siltation Warning at Percolation Tank PT-01',
      time: '1 hour ago',
      desc: 'Ground truth photo GEO-IMG-2026-120 and NDWI spectral response detected silt delta accumulation approaching 22% of active volume.',
      type: 'alert',
      targetView: 'insights'
    },
    {
      id: 'notif-3',
      title: 'Field Audit Submitted: Masonry Check Dam CD-01',
      time: 'Yesterday',
      desc: 'Surveyor Dr. S. Kulkarni confirmed 18,500 m³ impoundment and +3.2m water table elevation in downstream dugwells.',
      type: 'success',
      targetView: 'interventions'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900">Geospatial Telemetry & Alerts</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">
                  {n.type === 'satellite' && <Satellite className="w-4 h-4 text-sky-600" />}
                  {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-900">{n.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{n.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                    <button
                      onClick={() => {
                        onActionClick(n.targetView);
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-800"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
          <span className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" /> Next automated ingestion pass: 14:00 UTC
          </span>
        </div>
      </div>
    </div>
  );
};
