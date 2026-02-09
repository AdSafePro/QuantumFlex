
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, DollarSign, Activity, LogOut, CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';
import { APP_NAME } from '../../constants';

// MOCK DATA FOR ADMIN
const MOCK_WITHDRAWALS = [
  { id: 'tx-8821', user: 'CryptoKing99', amount: 500.00, address: 'TRX...9921', status: 'pending', date: '2023-10-26 10:30' },
  { id: 'tx-8822', user: 'SarahConnor', amount: 1250.50, address: 'TRX...1102', status: 'pending', date: '2023-10-26 11:15' },
  { id: 'tx-8823', user: 'MoonBoy2024', amount: 200.00, address: 'TRX...5512', status: 'processed', date: '2023-10-25 09:00' },
];

const MOCK_USERS = [
  { id: 1, user: 'AlphaInvestor', email: 'alpha@test.com', balance: 12450.32, status: 'Active' },
  { id: 2, user: 'CryptoKing99', email: 'king@test.com', balance: 1500.00, status: 'Active' },
  { id: 3, user: 'SarahConnor', email: 'sarah@test.com', balance: 0.00, status: 'Inactive' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'withdrawals' | 'users'>('overview');
  const [withdrawals, setWithdrawals] = useState(MOCK_WITHDRAWALS);

  useEffect(() => {
    // Basic protection
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleProcessWithdrawal = (id: string, action: 'approve' | 'reject') => {
    setWithdrawals(prev => prev.map(w => 
      w.id === id ? { ...w, status: action === 'approve' ? 'processed' : 'rejected' } : w
    ));
    alert(`Retiro ${id} ${action === 'approve' ? 'APROBADO' : 'RECHAZADO'}`);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Admin Header */}
      <header className="bg-red-900/20 border-b border-red-500/30 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-red-500" size={24} />
          <span className="text-xl font-display font-bold text-red-500 tracking-wider">
            {APP_NAME} <span className="text-white">GOD MODE</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400">ADMIN: SUPERUSER</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-1.5 rounded text-xs font-bold transition-all"
          >
            <LogOut size={14} /> SALIR
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/50 border-r border-white/10 p-4">
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <Activity size={18} /> Resumen Global
            </button>
            <button 
              onClick={() => setActiveTab('withdrawals')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'withdrawals' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <DollarSign size={18} /> Retiros ({withdrawals.filter(w => w.status === 'pending').length})
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'users' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <Users size={18} /> Usuarios
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-900/30">
          
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-6">Estado del Sistema</h2>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <p className="text-gray-400 text-xs uppercase">Usuarios Totales</p>
                  <p className="text-3xl font-bold text-white mt-2">1,240</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <p className="text-gray-400 text-xs uppercase">Depósitos (24h)</p>
                  <p className="text-3xl font-bold text-green-500 mt-2">$45,200</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <p className="text-gray-400 text-xs uppercase">Retiros Pendientes</p>
                  <p className="text-3xl font-bold text-red-500 mt-2">$1,750</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <p className="text-gray-400 text-xs uppercase">Profit Pagado</p>
                  <p className="text-3xl font-bold text-quantum-accent mt-2">$8,900</p>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                 <h3 className="text-lg font-bold mb-4 text-gray-200">Alertas de Sistema</h3>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
                       <AlertTriangle className="text-red-500" size={20} />
                       <div>
                          <p className="text-sm font-bold text-white">Alta latencia en Nodo 4</p>
                          <p className="text-xs text-red-300">Reiniciar servicio HFT manualmente.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg">
                       <Activity className="text-yellow-500" size={20} />
                       <div>
                          <p className="text-sm font-bold text-white">Cola de retiros acumulada</p>
                          <p className="text-xs text-yellow-300">3 solicitudes requieren aprobación manual.</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'withdrawals' && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-6">Solicitudes de Retiro</h2>
              <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Usuario</th>
                      <th className="p-4">Monto</th>
                      <th className="p-4">Billetera</th>
                      <th className="p-4">Fecha</th>
                      <th className="p-4">Estado</th>
                      <th className="p-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {withdrawals.map((w) => (
                      <tr key={w.id} className="hover:bg-white/5">
                        <td className="p-4 font-mono text-gray-500">{w.id}</td>
                        <td className="p-4 text-white font-bold">{w.user}</td>
                        <td className="p-4 text-white">${w.amount.toFixed(2)}</td>
                        <td className="p-4 font-mono text-xs text-gray-400">{w.address}</td>
                        <td className="p-4 text-gray-500">{w.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                            ${w.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                              w.status === 'processed' ? 'bg-green-500/20 text-green-500' : 
                              'bg-red-500/20 text-red-500'}
                          `}>
                            {w.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {w.status === 'pending' && (
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleProcessWithdrawal(w.id, 'approve')}
                                className="p-1.5 bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-black rounded transition-colors" title="Aprobar"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button 
                                onClick={() => handleProcessWithdrawal(w.id, 'reject')}
                                className="p-1.5 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors" title="Rechazar"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>
                 <div className="relative">
                    <input type="text" placeholder="Buscar usuario..." className="bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-red-500 outline-none" />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
                 </div>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Usuario</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Saldo</th>
                      <th className="p-4">Estado</th>
                      <th className="p-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {MOCK_USERS.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5">
                        <td className="p-4 font-mono text-gray-500">#{u.id}</td>
                        <td className="p-4 text-white font-bold">{u.user}</td>
                        <td className="p-4 text-gray-400">{u.email}</td>
                        <td className="p-4 text-green-400 font-mono">${u.balance.toLocaleString()}</td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.status === 'Active' ? 'text-green-500 bg-green-500/10' : 'text-gray-500 bg-gray-500/10'}`}>
                             {u.status}
                           </span>
                        </td>
                        <td className="p-4 text-right">
                           <button className="text-xs text-red-400 hover:text-red-300 underline">Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
