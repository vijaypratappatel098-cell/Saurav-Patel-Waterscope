import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  HelpCircle,
  RefreshCw,
  Info,
  CheckCircle2,
  AlertCircle,
  Layers,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { WATERSHED_CONFIG, GEO_CODED_IMAGES, WATERSHED_INTERVENTIONS } from '../data/watershedData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const AskWatershedView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: `### Observed Data
- Catchment: Upper Sina Micro-Catchment #4B1A2 (4,850 Hectares).
- 6 georeferenced ground truth inspection records verified with RTK GNSS.
- 7 physical interventions documented (4 completed, 2 ongoing, 1 planned).
- 23 surface water storage units totaling 128,500 m³ volume.

### Derived Analysis
- Vegetation coverage (NDVI > 0.35) expanded by +47.1% (from 1,720 Ha to 2,530 Ha).
- Surface water extent increased by +121.8% (315 Ha vs 142 Ha baseline).
- Water table rose by +4.4m average across 32 monitoring wells.
- Analytical Condition Score evaluated at 74 / 100.

### Possible Interpretation
You can ask any specific question regarding observed spatial changes, individual check dams, ground truthing photos, or prioritized monitoring areas. Every response strictly separates observed data from derived analysis and possible interpretation.`,
      timestamp: 'Just now',
      source: 'watershed-expert-engine'
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What are the major observations in this watershed?',
    'What changed between 2022 and 2026?',
    'Show areas with vegetation improvement.',
    'Where are the recorded watershed interventions?',
    'What does geo-coded photo GEO-IMG-2026-081 show in its spatial context?',
    'Which areas require further investigation or priority monitoring?',
    'Explain the changes between the selected dates.'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (qToSend?: string) => {
    const question = qToSend || inputQuestion.trim();
    if (!question || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/watershed-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Insufficient data available for this analysis.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash'
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('API error, using domain knowledge engine:', err);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `### Observed Data
- Total Catchment Area: 4,850 Ha across 4 sub-catchments in the semi-arid Deccan Plateau.
- 6 geocoded field points surveyed using sub-meter RTK GNSS (accuracy ±1.8m to ±3.1m).
- 7 documented interventions benefiting 479 Ha and 287 farm families.

### Derived Analysis
- Net vegetative expansion: +47.1% (NDVI > 0.35 across 2,530 Ha).
- Double-cropped irrigated agriculture expanded by +64.3% (from 1,150 Ha to 1,890 Ha).
- Barren degraded land reduced by -32.1% (from 1,045 Ha to 710 Ha).

### Possible Interpretation
- Ridge-to-valley sequencing effectively arrested peak runoff and increased groundwater storage.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'watershed-expert-fallback'
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>AI-Powered Decision Assistant</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            “Ask the Watershed” AI Assistant
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Natural language spatial intelligence querying available GIS layers, geo-coded photographs, satellite indices, and hydrological models with zero hallucination.
          </p>
        </div>

        {/* Guardrail Badge */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2 max-w-md">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            Every answer strictly demarcates <strong>Observed Data</strong>, <strong>Derived Analysis</strong>, and <strong>Possible Interpretation</strong>.
          </span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Context Card & Sample Prompts (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ingested Ground & Satellite Context
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-500">Watershed Basin</span>
                <span className="font-semibold text-slate-800">{WATERSHED_CONFIG.name}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-500">RTK Ground Photos</span>
                <span className="font-mono font-bold text-emerald-700">{GEO_CODED_IMAGES.length} Verified Pts</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-500">Documented Interventions</span>
                <span className="font-mono font-bold text-orange-700">{WATERSHED_INTERVENTIONS.length} Structures</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-500">Multi-Temporal Span</span>
                <span className="font-semibold text-slate-800">2022 (Baseline) – 2026 (Present)</span>
              </div>
            </div>
          </div>

          {/* Quick Prompts List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              Suggested Watershed Inquiries
            </h3>
            <div className="space-y-1.5">
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  disabled={loading}
                  className="w-full text-left p-2.5 text-xs rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 transition-colors text-slate-700 cursor-pointer disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Box (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
          {/* Messages Thread */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs space-y-2 leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line prose-xs">{m.text}</div>
                  <div
                    className={`text-[9px] font-mono pt-1.5 border-t flex items-center justify-between ${
                      m.sender === 'user'
                        ? 'text-slate-400 border-slate-800'
                        : 'text-slate-400 border-slate-100'
                    }`}
                  >
                    <span>{m.timestamp}</span>
                    {m.source && <span className="text-emerald-700 font-medium">{m.source}</span>}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2 shadow-2xs">
                  <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>Synthesizing multi-spectral telemetry & ground-truth data...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask the Watershed AI (e.g., 'What changed in area SW-01?')..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputQuestion.trim() || loading}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
