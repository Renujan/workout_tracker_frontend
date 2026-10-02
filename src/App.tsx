import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

import { Dashboard } from './pages/Dashboard';
import { Workout } from './pages/Workout';
import { ActiveWorkout } from './pages/ActiveWorkout';
import { Exercises } from './pages/Exercises';
import { ExerciseDetail } from './pages/ExerciseDetail';
import { History } from './pages/History';
import { Progress } from './pages/Progress';
import { Records } from './pages/Records';
import { Nutrition } from './pages/Nutrition';
import { Body } from './pages/Body';
import { Goals } from './pages/Goals';
import { Achievements } from './pages/Achievements';
import { Insights } from './pages/Insights';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/workout/active" element={<ActiveWorkout />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/records" element={<Records />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/body" element={<Body />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </AppProvider>
    </Router>
  );
};

export default App;
