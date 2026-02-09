import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyBots from './pages/dashboard/MyBots';
import Wallet from './pages/dashboard/Wallet';
import Referrals from './pages/dashboard/Referrals';
import History from './pages/dashboard/History';
import SettingsSecurity from './pages/dashboard/SettingsSecurity';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SocialProofToast from './components/SocialProofToast';

const App: React.FC = () => {
  return (
    <MemoryRouter>
      <SocialProofToast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
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
    </MemoryRouter>
  );
};

export default App;