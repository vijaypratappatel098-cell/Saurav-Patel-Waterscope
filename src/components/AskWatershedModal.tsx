import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  Info,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

interface AskWatershedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

export const AskWatershedModal: React.FC<AskWatershedModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `### Observed Data
- Watershed: Upper Sina Micro-Catchment #4B1A2 (4,850 Ha, 4 micro-catchments, semi-arid Deccan plateau).
- Datasets available: 6 RTK ground truth photos, 7 recorded interventions, 5 water body impoundments, 10 thematic layers, 2022-2026 multi-temporal change matrix.

### Derived Analysis
- Net vegetative expansion: +47.1% (from 1,720 Ha to 2,530 Ha).
- Surface water storage: +121.8% (315 Ha vs 142 Ha).
- Analytical Condition Score: 74 / 100.

### Possible Interpretation
I am ready to assist with evidence-based inquiries regarding GIS observations, check dams, ground truthing photos, or change trajectory. How may I assist your analysis today?`,
      timestamp: 'Just now',
      source: 'watershed-expert-engine'
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'What are the major observations in this watershed?',
    'What changed between 2022 and 2026?',
    'Show areas with vegetation improvement.',
    'Where are the recorded watershed interventions?',
    'What does geo-coded photo GEO-IMG-2026-081 show in its spatial context?',
    'Which areas require further investigation or priority monitoring?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

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

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

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
      console.warn('Backend call failed, using client-side domain knowledge engine:', err);
      // Fallback deterministic response strictly observing guidelines
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `### Observed Data
- Upper Sina Catchment #4B1A2 records 7 intervention structures (INT-CD-01, INT-FP-03, INT-CB-02, INT-PT-01, INT-PL-05, INT-RS-02, INT-GP-04).
- 6 geocoded field points surveyed with sub-meter accuracy (±1.8m to ±3.1m).

### Derived Analysis
- Vegetation gain: +47.1% (NDVI > 0.35 across 2,530 Ha).
- Surface water storage increase: +121.8% (315 Ha vs 142 Ha).
- Groundwater rise: +4.4m average head recovery across 32 observation wells.

### Possible Interpretation
- Hydro-enforced terracing and check dams appear spatially correlated with post-monsoon greening halos extending 600m downstream.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'watershed-expert-fallback'
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl h-[85vh] max-h-[750px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">“Ask the Watershed” AI Assistant</h3>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  Evidence-Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Grounded strictly in Upper Sina Catchment ground truth & satellite GIS telemetry
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[90%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs space-y-2 leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line prose-xs">{m.text}</div>
                <div
                  className={`text-[9px] font-mono pt-1 border-t flex items-center justify-between ${
                    m.sender === 'user'
                      ? 'text-slate-400 border-slate-800'
                      : 'text-slate-400 border-slate-100'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.source && <span className="text-emerald-700 font-medium">Model: {m.source}</span>}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2 shadow-2xs">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Consulting spatial GIS layers & ground-truth database...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips */}
        <div className="px-4 py-2 border-t border-slate-200 bg-white">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Quick Questions:
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg text-slate-700 border border-slate-200 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask about vegetation, check dams, ground images, water table..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuestion.trim() || loading}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
};
