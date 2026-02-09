
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, DollarSign, Activity, LogOut, CheckCircle, XCircle, AlertTriangle, Search, Edit, Lock, Unlock, Trash2, Wallet, RefreshCw, Send, MessageSquare, Clock, Filter, Bell, Copy, Menu, ArrowLeft, X } from 'lucide-react';
import { APP_NAME } from '../../constants';
import { UserProfile, Transaction, SupportTicket, ChatMessage } from '../../types';

// MOCK DATA INITIALIZATION
const INITIAL_USERS: UserProfile[] = [
  { 
    id: 1, 
    username: 'AlphaInvestor', 
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'alpha@test.com', 
    balance: 12450.32, 
    status: 'Active',
    joinedDate: '2023-10-01',
    transactions: [
       { id: 'tx-101', type: 'deposit', amount: 5000, date: '2023-10-01', status: 'completed', method: 'USDT TRC20' },
       { id: 'tx-102', type: 'profit', amount: 125.50, date: '2023-10-02', status: 'completed' },
       { id: 'tx-103', type: 'withdraw', amount: 500, date: '2023-10-26', status: 'pending', method: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }
    ]
  },
  { 
    id: 2, 
    username: 'CryptoKing99', 
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    email: 'king@test.com', 
    balance: 1500.00, 
    status: 'Active',
    joinedDate: '2023-10-15',
    transactions: [
      { id: 'tx-201', type: 'deposit', amount: 1500, date: '2023-10-15', status: 'completed', method: 'BTC' },
      { id: 'tx-202', type: 'withdraw', amount: 2500, date: '2023-10-27', status: 'pending', method: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE' }
    ]
  },
  { 
    id: 3, 
    username: 'SarahConnor', 
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah@test.com', 
    balance: 0.00, 
    status: 'Blocked',
    joinedDate: '2023-09-20',
    transactions: []
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'withdrawals' | 'users' | 'support'>('overview');
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // UI STATE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false); // Toggle between list and chat on mobile
  
  // USER MODAL STATE
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserProfile>>({});
  const [walletAmount, setWalletAmount] = useState('');
  
  // SUPPORT CHAT STATE
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // NOTIFICATION STATE
  const [pushNotification, setPushNotification] = useState<{message: string, visible: boolean}>({ message: '', visible: false });

  // --- INITIALIZATION ---
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/login');
    }

    // Load Tickets Simulation
    const loadTickets = () => {
      const stored = localStorage.getItem('mock_tickets');
      if (stored) {
        setTickets(JSON.parse(stored));
      }
    };
    loadTickets();
    const interval = setInterval(loadTickets, 3000); // Poll for new user messages
    return () => clearInterval(interval);

  }, [navigate]);

  useEffect(() => {
    if (showMobileChat || activeTab === 'support') {
       chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [tickets, activeTicketId, showMobileChat, activeTab]);


  // --- HANDLERS ---

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const showPushNotification = (message: string) => {
    setPushNotification({ message, visible: true });
    setTimeout(() => setPushNotification({ message: '', visible: false }), 4000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showPushNotification("Dirección copiada al portapapeles");
  };

  // USER MANAGEMENT
  const openUserModal = (user: UserProfile) => {
    setSelectedUser(user);
    setEditFormData({ ...user });
    setIsUserModalOpen(true);
    setWalletAmount('');
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editFormData } as UserProfile : u));
    setIsUserModalOpen(false);
    showPushNotification(`Datos de usuario ${selectedUser.username} actualizados.`);
  };

  const handleWalletAction = (action: 'add' | 'subtract') => {
    if (!selectedUser || !walletAmount) return;
    const amount = parseFloat(walletAmount);
    if (isNaN(amount) || amount <= 0) return;

    const newBalance = action === 'add' 
      ? selectedUser.balance + amount 
      : selectedUser.balance - amount;

    const newTx: Transaction = {
      id: `admin-${Date.now()}`,
      type: 'adjustment',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      method: `Admin ${action === 'add' ? 'Credit' : 'Debit'}`
    };

    const updatedUser = { 
      ...selectedUser, 
      balance: newBalance, 
      transactions: [newTx, ...selectedUser.transactions] 
    };

    setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
    setWalletAmount('');
    
    // Simulate Notification
    if (action === 'add') {
       showPushNotification(`Push enviado a ${selectedUser.username}: "Has recibido un crédito de $${amount}"`);
    }
  };

  const handleTransactionStatus = (userId: number, txId: string, status: 'completed' | 'rejected') => {
    setUsers(prevUsers => prevUsers.map(user => {
       if (user.id !== userId) return user;
       
       const updatedTx = user.transactions.map(tx => {
         if (tx.id === txId) {
            return { ...tx, status };
         }
         return tx;
       });

       let newBalance = user.balance;
       const targetTx = user.transactions.find(t => t.id === txId);
       if (targetTx && targetTx.type === 'withdraw' && status === 'rejected') {
          newBalance += targetTx.amount;
       }
       if (targetTx && targetTx.type === 'withdraw' && status === 'completed') {
          showPushNotification(`Push enviado a ${user.username}: "Tu retiro de $${targetTx.amount} ha sido APROBADO"`);
       }

       return { ...user, transactions: updatedTx, balance: newBalance };
    }));
  };

  // SUPPORT CHAT
  const handleSelectTicket = (ticketId: string) => {
     setActiveTicketId(ticketId);
     setShowMobileChat(true); // Switch view on mobile
  };

  const handleBackToTickets = () => {
     setShowMobileChat(false);
  };

  const handleAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReply.trim() || !activeTicketId) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicketId) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'admin',
              text: adminReply,
              timestamp: Date.now()
            } as ChatMessage
          ],
          lastUpdated: Date.now()
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    localStorage.setItem('mock_tickets', JSON.stringify(updatedTickets));
    setAdminReply('');
  };

  const changeTicketStatus = (ticketId: string, status: 'Active' | 'Pending' | 'Closed') => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
         const updates: any = { status };
         if (status === 'Closed') {
            updates.closedAt = Date.now();
         }
         return { ...t, ...updates };
      }
      return t;
    });
    setTickets(updatedTickets);
    localStorage.setItem('mock_tickets', JSON.stringify(updatedTickets));
  };


  // --- RENDER ---
  const filteredUsers = users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.includes(searchTerm));
  const activeTicket = tickets.find(t => t.id === activeTicketId);
  const pendingWithdrawalsCount = users.reduce((acc, user) => acc + user.transactions.filter(t => t.type === 'withdraw' && t.status === 'pending').length, 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      {/* PUSH NOTIFICATION TOAST (SIMULATION) */}
      <div className={`fixed top-4 right-4 z-[100] transition-all duration-300 transform ${pushNotification.visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
         <div className="bg-quantum-accent text-black px-4 py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-3">
            <Bell size={20} className="animate-bounce" />
            <div>
               <p className="text-xs uppercase opacity-80">System Push Notification Sent</p>
               <p className="text-sm">{pushNotification.message}</p>
            </div>
         </div>
      </div>


      {/* Admin Header */}
      <header className="bg-red-900/20 border-b border-red-500/30 h-16 flex items-center justify-between px-4 md:px-6 shrink-0 z-50 relative">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-red-500">
             <Menu size={24} />
          </button>
          <ShieldAlert className="text-red-500 hidden md:block" size={24} />
          <span className="text-lg md:text-xl font-display font-bold text-red-500 tracking-wider">
            {APP_NAME} <span className="text-white">GOD MODE</span>
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden md:inline text-xs font-mono text-gray-400">ADMIN: SUPERUSER</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-all"
          >
            <LogOut size={14} /> <span className="hidden md:inline">SALIR</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (Responsive) */}
        <aside 
           className={`
             fixed inset-y-0 left-0 z-40 w-64 bg-gray-900/95 backdrop-blur-md border-r border-white/10 p-4 pt-20 md:pt-4 
             transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:bg-gray-900/50 flex flex-col
             ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
           `}
        >
          {/* Close button on mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 md:hidden text-gray-400"
          >
             <X size={24} />
          </button>

          <nav className="space-y-2 flex-1">
            <button onClick={() => {setActiveTab('overview'); setIsMobileMenuOpen(false)}} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}>
              <Activity size={18} /> Resumen Global
            </button>
            <button onClick={() => {setActiveTab('users'); setIsMobileMenuOpen(false)}} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'users' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}>
              <Users size={18} /> Usuarios
            </button>
            <button onClick={() => {setActiveTab('withdrawals'); setIsMobileMenuOpen(false)}} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'withdrawals' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}>
              <DollarSign size={18} /> Retiros ({pendingWithdrawalsCount})
            </button>
            <button onClick={() => {setActiveTab('support'); setIsMobileMenuOpen(false)}} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'support' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-white/5'}`}>
              <MessageSquare size={18} /> Soporte Chat
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && (
           <div 
             className="fixed inset-0 bg-black/80 z-30 md:hidden"
             onClick={() => setIsMobileMenuOpen(false)}
           ></div>
        )}

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-900/30 relative w-full">
          
          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="animate-fade-in-up">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <h2 className="text-xl md:text-2xl font-bold text-white">Gestión de Usuarios</h2>
                 <div className="relative w-full md:w-auto">
                    <input 
                      type="text" 
                      placeholder="Buscar usuario..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-red-500 outline-none" 
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
                 </div>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm min-w-[800px]">
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
                       {filteredUsers.map((u) => (
                         <tr key={u.id} className="hover:bg-white/5">
                           <td className="p-4 font-mono text-gray-500">#{u.id}</td>
                           <td className="p-4 text-white font-bold">{u.username}</td>
                           <td className="p-4 text-gray-400">{u.email}</td>
                           <td className="p-4 text-green-400 font-mono">${u.balance.toLocaleString()}</td>
                           <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.status === 'Active' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                                {u.status}
                              </span>
                           </td>
                           <td className="p-4 text-right">
                              <button 
                                onClick={() => openUserModal(u)}
                                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded text-xs font-bold transition-colors"
                              >
                                <Edit size={14} className="inline mr-1"/> Gestionar
                              </button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                </div>
              </div>
            </div>
          )}

          {/* WITHDRAWALS TAB */}
          {activeTab === 'withdrawals' && (
             <div className="animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Solicitudes de Retiro</h2>
              <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm min-w-[900px]">
                     <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                       <tr>
                         <th className="p-4">TxID</th>
                         <th className="p-4">Usuario</th>
                         <th className="p-4">Monto</th>
                         <th className="p-4">Dirección (BEP20)</th>
                         <th className="p-4">Fecha</th>
                         <th className="p-4">Estado</th>
                         <th className="p-4 text-right">Acciones</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                       {users.flatMap(u => u.transactions.map(t => ({...t, user: u.username, userId: u.id})))
                         .filter(t => t.type === 'withdraw')
                         .sort((a,b) => (a.status === 'pending' ? -1 : 1))
                         .map((t) => (
                         <tr key={t.id} className="hover:bg-white/5">
                           <td className="p-4 font-mono text-gray-500">{t.id}</td>
                           <td className="p-4 text-white font-bold">{t.user}</td>
                           <td className="p-4 text-white">${t.amount.toFixed(2)}</td>
                           <td className="p-4">
                              <div className="flex items-center gap-2">
                                 <code className="text-[10px] bg-black/50 px-2 py-1 rounded text-gray-300 font-mono break-all max-w-[150px] md:max-w-[200px]">
                                    {t.method}
                                 </code>
                                 <button onClick={() => copyToClipboard(t.method || '')} className="text-gray-500 hover:text-white" title="Copiar Dirección">
                                    <Copy size={12} />
                                 </button>
                              </div>
                           </td>
                           <td className="p-4 text-gray-500">{t.date}</td>
                           <td className="p-4">
                             <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                               ${t.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                                 t.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                 'bg-red-500/20 text-red-500'}
                             `}>
                               {t.status}
                             </span>
                           </td>
                           <td className="p-4 text-right">
                             {t.status === 'pending' && (
                               <div className="flex justify-end gap-2">
                                 <button 
                                   onClick={() => handleTransactionStatus(t.userId, t.id, 'completed')}
                                   className="p-1.5 bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-black rounded transition-colors" title="Aprobar"
                                 >
                                   <CheckCircle size={16} />
                                 </button>
                                 <button 
                                   onClick={() => handleTransactionStatus(t.userId, t.id, 'rejected')}
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
             </div>
          )}

          {/* SUPPORT TAB */}
          {activeTab === 'support' && (
            <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">
               {/* Ticket List - Hidden on mobile if chat is active */}
               <div className={`w-full md:w-1/3 bg-black/40 border border-white/10 rounded-xl overflow-y-auto ${showMobileChat ? 'hidden md:block' : 'block'}`}>
                  <div className="p-4 border-b border-white/10 font-bold">Tickets Activos</div>
                  {tickets.length === 0 && <p className="p-4 text-gray-500 text-sm">No hay tickets.</p>}
                  {tickets.sort((a,b) => b.lastUpdated - a.lastUpdated).map(t => (
                     <div 
                        key={t.id} 
                        onClick={() => handleSelectTicket(t.id)}
                        className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 
                           ${activeTicketId === t.id ? 'bg-white/5 border-l-2 border-l-red-500' : ''}
                        `}
                     >
                        <div className="flex justify-between mb-1">
                           <span className="font-bold text-sm text-white">{t.username}</span>
                           <span className={`text-[10px] px-1 rounded ${t.status === 'Active' ? 'text-green-400 bg-green-900/30' : t.status === 'Pending' ? 'text-yellow-400' : 'text-gray-500'}`}>{t.status}</span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold mb-1">{t.subject}</p>
                        <p className="text-xs text-gray-500 truncate">{t.messages[t.messages.length -1]?.text}</p>
                     </div>
                  ))}
               </div>

               {/* Chat Window - Hidden on mobile if no chat selected */}
               <div className={`flex-1 bg-black/40 border border-white/10 rounded-xl flex flex-col ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
                  {activeTicket ? (
                     <>
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                           <div className="flex items-center gap-2">
                              {/* Mobile Back Button */}
                              <button onClick={handleBackToTickets} className="md:hidden text-gray-400 pr-2">
                                 <ArrowLeft size={20} />
                              </button>
                              <div>
                                 <h3 className="font-bold text-white text-sm md:text-base">{activeTicket.subject}</h3>
                                 <p className="text-xs text-gray-400">User: {activeTicket.username}</p>
                              </div>
                           </div>
                           <select 
                              value={activeTicket.status}
                              onChange={(e) => changeTicketStatus(activeTicket.id, e.target.value as any)}
                              className="bg-black border border-gray-600 rounded text-xs px-2 py-1 text-white outline-none"
                           >
                              <option value="Active">Activo</option>
                              <option value="Pending">Pendiente</option>
                              <option value="Closed">Cerrado</option>
                           </select>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                           {activeTicket.messages.map((m, i) => (
                              <div key={i} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                 <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.sender === 'admin' ? 'bg-red-600/20 border border-red-500/30 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    <p>{m.text}</p>
                                    <p className="text-[9px] text-right mt-1 opacity-50">{new Date(m.timestamp).toLocaleTimeString()}</p>
                                 </div>
                              </div>
                           ))}
                           <div ref={chatEndRef} />
                        </div>
                        {activeTicket.status !== 'Closed' && (
                           <form onSubmit={handleAdminReply} className="p-4 border-t border-white/10 flex gap-2">
                              <input 
                                 type="text" 
                                 className="flex-1 bg-black border border-gray-700 rounded p-2 text-white outline-none focus:border-red-500 text-sm"
                                 placeholder="Responder como admin..."
                                 value={adminReply}
                                 onChange={(e) => setAdminReply(e.target.value)}
                              />
                              <button type="submit" className="bg-red-500 text-white p-2 rounded hover:bg-red-600"><Send size={18} /></button>
                           </form>
                        )}
                     </>
                  ) : (
                     <div className="flex-1 flex items-center justify-center text-gray-500 p-4 text-center">
                        <p>Selecciona un ticket para ver la conversación</p>
                     </div>
                  )}
               </div>
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <h3 className="text-gray-400 text-sm uppercase">Balance Total Usuarios</h3>
                  <p className="text-3xl font-bold text-white mt-2">${users.reduce((acc, u) => acc + u.balance, 0).toLocaleString()}</p>
               </div>
               <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <h3 className="text-gray-400 text-sm uppercase">Retiros Pendientes</h3>
                  <p className="text-3xl font-bold text-yellow-500 mt-2">{pendingWithdrawalsCount}</p>
               </div>
            </div>
          )}

        </main>
      </div>

      {/* USER EDIT MODAL (Responsive) */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsUserModalOpen(false)}></div>
           <div className="relative bg-gray-900 border-t md:border border-white/20 w-full max-w-4xl md:rounded-xl shadow-2xl overflow-hidden flex flex-col h-[90vh] md:h-auto md:max-h-[90vh]">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                 <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Admin Usuario</h3>
                    <p className="text-xs text-gray-400">{selectedUser.username}</p>
                 </div>
                 <button onClick={() => setIsUserModalOpen(false)}><XCircle className="text-gray-400 hover:text-white" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                 {/* Left: Details */}
                 <div className="space-y-4">
                    <h4 className="font-bold text-red-400 border-b border-white/10 pb-2 mb-4">Datos Personales</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-xs text-gray-500">Nombre</label>
                          <input type="text" value={editFormData.firstName} onChange={e => setEditFormData({...editFormData, firstName: e.target.value})} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-red-500" />
                       </div>
                       <div>
                          <label className="text-xs text-gray-500">Apellido</label>
                          <input type="text" value={editFormData.lastName} onChange={e => setEditFormData({...editFormData, lastName: e.target.value})} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-red-500" />
                       </div>
                    </div>
                    <div>
                       <label className="text-xs text-gray-500">Email</label>
                       <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                       <label className="text-xs text-gray-500">Nueva Contraseña</label>
                       <input type="password" placeholder="Dejar en blanco para no cambiar" className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div className="pt-4 flex gap-4">
                       <button onClick={handleSaveUser} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded">Guardar Cambios</button>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10">
                       <h4 className="font-bold text-red-400 mb-2">Zona de Peligro</h4>
                       <div className="flex gap-2">
                          <button 
                             onClick={() => setEditFormData({...editFormData, status: editFormData.status === 'Active' ? 'Blocked' : 'Active'})}
                             className={`flex-1 py-2 rounded font-bold border text-xs md:text-sm ${editFormData.status === 'Active' ? 'border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black' : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-black'}`}
                          >
                             {editFormData.status === 'Active' ? <><Lock size={14} className="inline"/> Bloquear</> : <><Unlock size={14} className="inline"/> Desbloquear</>}
                          </button>
                          <button className="flex-1 py-2 rounded font-bold border border-red-800 text-red-800 hover:bg-red-900 hover:text-white text-xs md:text-sm">
                             <Trash2 size={14} className="inline"/> Eliminar
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Right: Wallet & History */}
                 <div className="space-y-6">
                    <div>
                       <h4 className="font-bold text-red-400 border-b border-white/10 pb-2 mb-4">Gestión de Billetera</h4>
                       <div className="bg-black/40 p-4 rounded-lg border border-white/5 mb-4 text-center">
                          <p className="text-gray-400 text-xs">Saldo Actual</p>
                          <p className="text-3xl font-bold text-white">${selectedUser.balance.toFixed(2)}</p>
                       </div>
                       <div className="flex gap-2 mb-2">
                          <input 
                             type="number" 
                             placeholder="Monto" 
                             value={walletAmount}
                             onChange={e => setWalletAmount(e.target.value)}
                             className="flex-1 bg-black/50 border border-gray-700 rounded p-2 text-white outline-none" 
                          />
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => handleWalletAction('add')} className="flex-1 bg-green-900/40 text-green-400 border border-green-800 hover:bg-green-800 hover:text-white py-2 rounded text-xs font-bold">
                             + Agregar Saldo
                          </button>
                          <button onClick={() => handleWalletAction('subtract')} className="flex-1 bg-red-900/40 text-red-400 border border-red-800 hover:bg-red-800 hover:text-white py-2 rounded text-xs font-bold">
                             - Restar Saldo
                          </button>
                       </div>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col min-h-[200px]">
                       <h4 className="font-bold text-red-400 border-b border-white/10 pb-2 mb-2">Historial Reciente</h4>
                       <div className="overflow-y-auto max-h-[200px] text-xs">
                          <table className="w-full text-left">
                             <thead className="text-gray-500">
                                <tr>
                                   <th className="pb-2">Tipo</th>
                                   <th className="pb-2">Fecha</th>
                                   <th className="pb-2 text-right">Monto</th>
                                </tr>
                             </thead>
                             <tbody className="text-gray-300">
                                {selectedUser.transactions.slice(0, 10).map(tx => (
                                   <tr key={tx.id} className="border-b border-white/5">
                                      <td className={`py-2 capitalize ${tx.type === 'deposit' || tx.type === 'profit' || (tx.type === 'adjustment' && tx.method?.includes('Credit')) ? 'text-green-500' : 'text-red-500'}`}>{tx.type}</td>
                                      <td className="py-2">{tx.date}</td>
                                      <td className="py-2 text-right">${tx.amount.toFixed(2)}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
