
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  Wallet, 
  History, 
  Users, 
  Settings, 
  LogOut,
  X,
  Bell,
  MoreHorizontal,
  Activity,
  MessageSquare
} from 'lucide-react';
import { APP_NAME } from '../constants';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Estadísticas' },
    { path: '/dashboard/bots', icon: Cpu, label: 'Mis Bots' },
    { path: '/dashboard/wallet', icon: Wallet, label: 'Billetera' },
    { path: '/dashboard/history', icon: History, label: 'Historial' },
    { path: '/dashboard/referrals', icon: Users, label: 'Referidos' },
    { path: '/dashboard/support', icon: MessageSquare, label: 'Soporte 24/7' },
    { path: '/dashboard/settings', icon: Settings, label: 'Configuración' },
  ];

  // Mobile Bottom Nav Items (Subset)
  const mobileNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
    { path: '/dashboard/bots', icon: Cpu, label: 'Bots' },
    { path: '/dashboard/wallet', icon: Wallet, label: 'Billetera' },
    { path: '/dashboard/support', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <div className="min-h-screen bg-quantum-900 text-white font-sans flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`
        hidden md:flex fixed inset-y-0 left-0 z-50 w-64 bg-quantum-900 border-r border-white/10 flex-col
      `}>
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-display font-bold text-quantum-accent tracking-wider">
            {APP_NAME} <span className="text-xs text-gray-500 ml-1">PRO</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-quantum-accent/10 text-quantum-accent border border-quantum-accent/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Slide-over Sidebar (More Menu) */}
      <div 
         className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        <div className={`absolute top-0 left-0 w-3/4 max-w-xs h-full bg-quantum-900 border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="h-16 flex items-center px-6 border-b border-white/10 justify-between">
              <span className="text-xl font-display font-bold text-quantum-accent tracking-wider">Menú</span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400"><X size={24} /></button>
           </div>
           <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-quantum-accent/10 text-quantum-accent' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <item.icon size={20} />
                  {item.label}
                </NavLink>
              ))}
              <div className="my-2 border-t border-white/10"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg"
              >
                <LogOut size={20} /> Cerrar Sesión
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:ml-64 relative">
        {/* Top Header */}
        <header className="h-16 glass-panel border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 shrink-0">
          <div className="md:hidden flex items-center gap-2 text-quantum-accent font-display font-bold">
            <Activity size={20} /> {APP_NAME}
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-quantum-danger rounded-full animate-pulse"></span>
              </button>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">Inversor Alpha</p>
                <p className="text-xs text-quantum-success">Verificado</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-quantum-accent to-purple-600 border border-white/20"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-black/50 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 relative scroll-smooth">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-quantum-accent blur-[150px] rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-600 blur-[150px] rounded-full"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full glass-panel border-t border-white/10 z-40 pb-safe">
           <div className="flex justify-around items-center h-16">
              {mobileNavItems.map((item) => (
                 <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) => `
                       flex flex-col items-center justify-center w-full h-full space-y-1
                       ${isActive ? 'text-quantum-accent' : 'text-gray-500'}
                    `}
                 >
                    <item.icon size={20} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                 </NavLink>
              ))}
              <button 
                 onClick={() => setIsSidebarOpen(true)}
                 className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500"
              >
                 <MoreHorizontal size={20} />
                 <span className="text-[10px] font-medium">Más</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
