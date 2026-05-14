import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import {
  MessageSquare, Code, Cloud, Video, Mail, Calendar, Database,
  CheckCircle, XCircle, Loader2, Zap, Link2, Link2Off, AlertCircle
} from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/v1';

// Static metadata for each provider
const PROVIDER_META = {
  SLACK: {
    name: 'Slack',
    description: 'Send task updates and receive Huddle notifications directly in your Slack channels.',
    icon: MessageSquare,
    color: 'text-[#E01E5A]',
    bg: 'bg-[#E01E5A]/10',
    border: 'border-[#E01E5A]/20',
  },
  GITHUB: {
    name: 'GitHub',
    description: 'Sync commits and pull requests automatically with your Stack Board tasks.',
    icon: Code,
    color: 'text-slate-300',
    bg: 'bg-white/10',
    border: 'border-white/20',
  },
  GOOGLE_DRIVE: {
    name: 'Google Drive',
    description: 'Attach Docs and Sheets directly to Flow List items using Clip.',
    icon: Cloud,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  FIGMA: {
    name: 'Figma',
    description: 'Embed live design files in tasks for immediate team feedback.',
    icon: Code,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
  ZOOM: {
    name: 'Zoom',
    description: 'Start instant video meetings from any Huddle conversation.',
    icon: Video,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  GMAIL: {
    name: 'Gmail',
    description: 'Turn emails into tasks with one click using our browser extension.',
    icon: Mail,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
  },
  GOOGLE_CALENDAR: {
    name: 'Google Calendar',
    description: 'Two-way sync your Schedule view with Google Calendar events.',
    icon: Calendar,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  NOTION: {
    name: 'Notion',
    description: 'Link Notion pages as project documentation references in tasks.',
    icon: Database,
    color: 'text-slate-300',
    bg: 'bg-white/10',
    border: 'border-white/20',
  },
};

const IntegrationCard = ({ integration, onConnect, onDisconnect, isHighlighted, cardRef }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const meta = PROVIDER_META[integration.providerName] || {};
  const IconComponent = meta.icon || Zap;

  const handleConnect = async () => {
    setLoading(true);
    setError('');
    try {
      await onConnect(integration.providerName);
    } catch {
      setError('Connection failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    setError('');
    try {
      await onDisconnect(integration.providerName);
    } catch {
      setError('Disconnect failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative p-7 rounded-[32px] border transition-all duration-300 flex flex-col ${
        isHighlighted
          ? 'bg-[#1A120E] border-[#8B4513] shadow-2xl shadow-amber-900/30 ring-2 ring-[#8B4513]/40'
          : integration.connected
            ? 'bg-[#1A120E] border-[#20B2AA]/30 shadow-lg shadow-[#20B2AA]/5'
            : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      {/* Connected glow */}
      {integration.connected && (
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#20B2AA]/5 to-transparent pointer-events-none" />
      )}

      {/* Status badge */}
      <div className="absolute top-5 right-5">
        {integration.connected ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#20B2AA]/10 border border-[#20B2AA]/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B2AA] animate-pulse" />
            <span className="text-[10px] font-bold text-[#20B2AA] uppercase tracking-wider">Active</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inactive</span>
          </div>
        )}
      </div>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl ${meta.bg} border ${meta.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xl`}>
        <IconComponent size={26} className={meta.color} />
      </div>

      {/* Info */}
      <h3 className="text-lg font-bold text-white tracking-tight mb-2">{meta.name}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-grow mb-6">{meta.description}</p>

      {/* Connected-at timestamp */}
      {integration.connected && integration.connectedAt && (
        <p className="text-[10px] text-[#20B2AA]/60 mb-4">
          Connected {new Date(integration.connectedAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
          })}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-400 mb-3">
          <AlertCircle size={12} />
          {error}
        </div>
      )}

      {/* Action button */}
      {integration.connected ? (
        <button
          onClick={handleDisconnect}
          disabled={loading}
          className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-sm font-bold disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Link2Off size={16} />
              Disconnect
            </>
          )}
        </button>
      ) : (
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-[#8B4513] hover:bg-[#5D2E0A] text-white transition-all text-sm font-bold shadow-lg shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Link2 size={16} />
              Connect
            </>
          )}
        </button>
      )}
    </div>
  );
};

const AppIntegrationsPage = () => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [searchParams] = useSearchParams();
  const highlightProvider = searchParams.get('provider');
  const highlightRef = useRef(null);

  const token = localStorage.getItem('token');
  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchIntegrations = async () => {
    try {
      setFetchError('');
      const res = await axios.get(`${API_BASE}/integrations`, { headers: authHeaders });
      setIntegrations(res.data);
    } catch {
      setFetchError('Failed to load integrations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  // Scroll to highlighted card after data loads
  useEffect(() => {
    if (!loading && highlightProvider && highlightRef.current) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [loading, highlightProvider]);

  const handleConnect = async (providerName) => {
    const res = await axios.post(
      `${API_BASE}/integrations/${providerName}/connect`,
      {},
      { headers: authHeaders }
    );
    setIntegrations(prev =>
      prev.map(i => i.providerName === providerName ? res.data : i)
    );
  };

  const handleDisconnect = async (providerName) => {
    const res = await axios.delete(
      `${API_BASE}/integrations/${providerName}/disconnect`,
      { headers: authHeaders }
    );
    setIntegrations(prev =>
      prev.map(i => i.providerName === providerName ? res.data : i)
    );
  };

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Zap size={14} className="text-[#8B4513]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Connected Tools</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                Integrations
              </h1>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Connect Flowkit with the tools your team already loves. Everything syncs in real time.
              </p>
            </div>
            {/* Connected count badge */}
            {!loading && (
              <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-2xl shrink-0">
                <div className="flex items-center gap-2 text-[#20B2AA]">
                  <CheckCircle size={18} />
                  <span className="font-black text-2xl">{connectedCount}</span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400 font-medium">Connected</p>
                  <p className="text-[10px] text-slate-600">of {integrations.length} tools</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 size={40} className="text-[#8B4513] animate-spin" />
            <p className="text-slate-500 font-medium">Loading your integrations...</p>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <XCircle size={40} className="text-red-400" />
            <p className="text-red-400 font-medium">{fetchError}</p>
            <button
              onClick={fetchIntegrations}
              className="px-6 py-3 bg-[#8B4513] text-white rounded-xl font-bold hover:bg-[#5D2E0A] transition-all"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.providerName}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                isHighlighted={highlightProvider === integration.providerName}
                cardRef={highlightProvider === integration.providerName ? highlightRef : null}
              />
            ))}
          </div>
        )}

        {/* Note about OAuth */}
        <div className="mt-16 p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle size={16} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Simulated Connections</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              These integrations use a simulated connection flow for demonstration purposes. In production, each "Connect" button would redirect through the provider's official OAuth flow to securely grant Flowkit access to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntegrationsPage;
