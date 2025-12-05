import React, { useState, useEffect } from 'react';
import { Bot, Zap, MessageSquare, TrendingUp, DollarSign, Users, Mail, Calendar, CheckCircle, Play, Settings, BarChart3, Plus, X, Edit2, Trash2 } from 'lucide-react';

export default function RealDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prospects, setProspects] = useState([]);
  const [clients, setClients] = useState([]);
  const [showAddProspect, setShowAddProspect] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProspects = localStorage.getItem('automai_prospects');
    const savedClients = localStorage.getItem('automai_clients');
    
    if (savedProspects) setProspects(JSON.parse(savedProspects));
    if (savedClients) setClients(JSON.parse(savedClients));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('automai_prospects', JSON.stringify(prospects));
  }, [prospects]);

  useEffect(() => {
    localStorage.setItem('automai_clients', JSON.stringify(clients));
  }, [clients]);

  const addProspect = (prospectData) => {
    const newProspect = {
      id: Date.now(),
      ...prospectData,
      addedDate: new Date().toLocaleDateString()
    };
    setProspects([newProspect, ...prospects]);
    setShowAddProspect(false);
  };

  const deleteProspect = (id) => {
    if (window.confirm('Eliminare questo prospect?')) {
      setProspects(prospects.filter(p => p.id !== id));
    }
  };

  const addClient = (clientData) => {
    const newClient = {
      id: Date.now(),
      ...clientData,
      status: 'active',
      startDate: new Date().toLocaleDateString()
    };
    setClients([newClient, ...clients]);
    setShowAddClient(false);
  };

  const deleteClient = (id) => {
    if (window.confirm('Eliminare questo cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const totalMRR = clients.reduce((sum, client) => sum + parseInt(client.mrr || 0), 0);
  const projectedARR = totalMRR * 12;

  const services = [
    { id: 'chatbot', name: 'Chatbot AI 24/7', icon: MessageSquare, setup: '€4,500', monthly: '€750/mese', color: 'bg-blue-500' },
    { id: 'email', name: 'Email Automation', icon: Mail, setup: '€3,000', monthly: '€500/mese', color: 'bg-purple-500' },
    { id: 'social', name: 'Social AI Manager', icon: TrendingUp, setup: '€3,500', monthly: '€650/mese', color: 'bg-pink-500' },
    { id: 'analytics', name: 'Analytics Dashboard', icon: BarChart3, setup: '€6,000', monthly: '€900/mese', color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AutomAI Agency</h1>
                <p className="text-xs text-purple-300">La Tua Dashboard Operativa</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-400">MRR Totale</p>
                <p className="text-lg font-bold text-green-400">€{totalMRR}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">ARR Proiettato</p>
                <p className="text-lg font-bold text-purple-400">€{projectedARR.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 bg-black/20 rounded-lg p-1">
          {['dashboard', 'prospects', 'clienti', 'servizi'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'dashboard' && '🏠 Dashboard'}
              {tab === 'prospects' && '🎯 Prospect'}
              {tab === 'clienti' && '👥 Clienti'}
              {tab === 'servizi' && '⚙️ Servizi'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
                <Users className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-2xl font-bold">{prospects.length}</p>
                <p className="text-sm text-gray-400">Prospect</p>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30">
                <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-2xl font-bold">{clients.length}</p>
                <p className="text-sm text-gray-400">Clienti</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
                <DollarSign className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-2xl font-bold">€{totalMRR}</p>
                <p className="text-sm text-gray-400">MRR</p>
              </div>
              <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 rounded-xl p-6 border border-pink-500/30">
                <TrendingUp className="w-8 h-8 text-pink-400 mb-2" />
                <p className="text-2xl font-bold">€{projectedARR.toLocaleString()}</p>
                <p className="text-sm text-gray-400">ARR</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="text-yellow-400" />Azioni Rapide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setShowAddProspect(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-4 rounded-lg text-left transition-all transform hover:scale-105">
                  <Plus className="w-6 h-6 mb-2" />
                  <p className="font-bold">Aggiungi Prospect</p>
                  <p className="text-sm text-purple-200">Nuovo lead</p>
                </button>
                <button onClick={() => setShowAddClient(true)} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 p-4 rounded-lg text-left transition-all transform hover:scale-105">
                  <Plus className="w-6 h-6 mb-2" />
                  <p className="font-bold">Aggiungi Cliente</p>
                  <p className="text-sm text-green-200">Nuovo contratto</p>
                </button>
                <button onClick={() => setActiveTab('servizi')} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 p-4 rounded-lg text-left transition-all transform hover:scale-105">
                  <Settings className="w-6 h-6 mb-2" />
                  <p className="font-bold">Vedi Servizi</p>
                  <p className="text-sm text-blue-200">Catalogo</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prospects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">🎯 Prospect</h2>
              <button onClick={() => setShowAddProspect(true)} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" />Nuovo
              </button>
            </div>

            {prospects.length === 0 ? (
              <div className="bg-black/30 rounded-xl p-12 border border-white/10 text-center">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-400 mb-4">Nessun prospect</p>
                <button onClick={() => setShowAddProspect(true)} className="px-6 py-3 bg-purple-600 rounded-lg font-bold">Aggiungi Primo Prospect</button>
              </div>
            ) : (
              <div className="grid gap-4">
                {prospects.map(prospect => (
                  <div key={prospect.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{prospect.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            prospect.status === 'hot' ? 'bg-red-500/20 text-red-300' :
                            prospect.status === 'warm' ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>{prospect.status.toUpperCase()}</span>
                        </div>
                        <p className="text-sm text-gray-400">📊 {prospect.industry} • 📧 {prospect.email}</p>
                        {prospect.notes && <p className="text-sm text-gray-300 mt-2">📝 {prospect.notes}</p>}
                      </div>
                      <button onClick={() => deleteProspect(prospect.id)} className="ml-4 p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'clienti' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">👥 Clienti</h2>
              <button onClick={() => setShowAddClient(true)} className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" />Nuovo
              </button>
            </div>

            {clients.length === 0 ? (
              <div className="bg-black/30 rounded-xl p-12 border border-white/10 text-center">
                <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-400 mb-4">Nessun cliente</p>
                <button onClick={() => setShowAddClient(true)} className="px-6 py-3 bg-green-600 rounded-lg font-bold">Aggiungi Primo Cliente</button>
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {clients.map(client => (
                    <div key={client.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{client.name}</h3>
                          <p className="text-sm text-gray-400">{client.service}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-400">€{client.mrr}</p>
                            <p className="text-xs text-gray-400">MRR</p>
                          </div>
                          <button onClick={() => deleteClient(client.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold mb-4">💰 Revenue</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-400">MRR Mensile</p>
                      <p className="text-3xl font-bold text-green-400">€{totalMRR}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">ARR Annuale</p>
                      <p className="text-3xl font-bold text-purple-400">€{projectedARR.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'servizi' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">⚙️ Servizi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => {
                const Icon = service.icon;
                return (
                  <div key={service.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Setup:</span>
                        <span className="font-bold text-green-400">{service.setup}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mensile:</span>
                        <span className="font-bold text-purple-400">{service.monthly}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Prospect Modal */}
      {showAddProspect && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/50">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Aggiungi Prospect</h3>
              <button onClick={() => setShowAddProspect(false)} className="text-3xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              addProspect({
                name: fd.get('name'),
                industry: fd.get('industry'),
                email: fd.get('email'),
                phone: fd.get('phone'),
                status: fd.get('status'),
                notes: fd.get('notes')
              });
            }} className="space-y-4">
              <input name="name" placeholder="Nome *" required className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white" />
              <input name="industry" placeholder="Settore *" required className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white" />
              <input name="email" type="email" placeholder="Email *" required className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white" />
              <input name="phone" placeholder="Telefono" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white" />
              <select name="status" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white">
                <option value="cold">Cold</option>
                <option value="warm">Warm</option>
                <option value="hot">Hot</option>
              </select>
              <textarea name="notes" placeholder="Note" rows="3" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white" />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold">Aggiungi</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Aggiungi Cliente</h3>
              <button onClick={() => setShowAddClient(false)} className="text-3xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              addClient({
                name: fd.get('name'),
                service: fd.get('service'),
                mrr: fd.get('mrr')
              });
            }} className="space-y-4">
              <input name="name" placeholder="Nome Cliente *" required className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white" />
              <select name="service" required className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white">
                <option value="">Servizio *</option>
                <option value="Chatbot AI">Chatbot AI</option>
                <option value="Email Automation">Email Automation</option>
                <option value="Social AI">Social AI</option>
                <option value="Analytics">Analytics</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <input name="mrr" type="number" placeholder="MRR Mensile (€) *" required className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white" />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold">Aggiungi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}