import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { ToastContainer } from '../common/ToastContainer';
import { RestTimerModal } from '../workout/RestTimerModal';
import { SessionComparisonModal } from '../workout/SessionComparisonModal';
import { QuickActionMenu } from '../workout/QuickActionMenu';
import { AddFoodModal } from '../nutrition/AddFoodModal';
import { LogWeightModal } from '../nutrition/LogWeightModal';
import { AddGoalModal } from '../nutrition/AddGoalModal';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 min-h-screen pb-20 md:pb-8">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />

      {/* Overlays, Modals, Rest Timers & Toasts */}
      <RestTimerModal />
      <SessionComparisonModal />
      <QuickActionMenu />
      <AddFoodModal />
      <LogWeightModal />
      <AddGoalModal />
      <ToastContainer />
    </div>
  );
};
