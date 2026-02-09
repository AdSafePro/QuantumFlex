import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  Wallet, 
  History, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { APP_NAME } from '../constants';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to clear session would go here
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Estadísticas' },
    { path: '/dashboard/bots', icon: Cpu, label: 'Mis Bots' },
    { path: '/dashboard/wallet', icon: Wallet, label: 'Billetera' },
    { path: '/dashboard/history', icon: History, label: 'Historial' },
    { path: '/dashboard/referrals', icon: Users, label: 'Referidos' },
    { path: '/dashboard/security', icon: ShieldCheck, label: 'Seguridad' },
    { path: '/dashboard/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-quantum-900 text-white font-sans flex overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-quantum-900 border-r border-white/10 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-display font-bold text-quantum-accent tracking-wider">
            {APP_NAME} <span className="text-xs text-gray-500 ml-1">PRO</span>
          </span>
          <button 
            className="ml-auto md:hidden text-gray-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsSidebarOpen(false)}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 glass-panel border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

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
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-quantum-accent to-purple-600 border border-white/20"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-black/50 p-4 sm:p-6 lg:p-8 relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-quantum-accent blur-[150px] rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-600 blur-[150px] rounded-full"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;