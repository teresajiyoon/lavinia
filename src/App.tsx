/**
 * LAVINIA - 와인데뷔 & 페어링 웹 애플리케이션
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HomeView } from './components/home/HomeView';
import { PairingView } from './components/pairing/PairingView';
import { ClassView } from './components/classes/ClassView';
import { KitView } from './components/kit/KitView';
import { MyRecordsView } from './components/records/MyRecordsView';
import { BrandAndFaqView } from './components/brand/BrandAndFaqView';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeTab, isAdminMode } = useApp();

  if (isAdminMode || activeTab === 'admin') {
    return <AdminDashboard />;
  }

  switch (activeTab) {
    case 'home':
      return <HomeView />;
    case 'pairing':
      return <PairingView />;
    case 'classes':
      return <ClassView />;
    case 'kit':
      return <KitView />;
    case 'my-records':
      return <MyRecordsView />;
    case 'about-faq':
      return <BrandAndFaqView />;
    default:
      return <HomeView />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2420]">
        <Header />
        <main className="flex-1">
          <MainContent />
        </main>
        <Footer />
        <BottomNav />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
