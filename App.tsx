import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyBots from './pages/dashboard/MyBots';
import Wallet from './pages/dashboard/Wallet';
import Referrals from './pages/dashboard/Referrals';
import History from './pages/dashboard/History';
import SettingsSecurity from './pages/dashboard/SettingsSecurity';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="bots" element={<MyBots />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="history" element={<History />} />
          <Route path="security" element={<SettingsSecurity />} />
          <Route path="settings" element={<SettingsSecurity />} />
        </Route>

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;