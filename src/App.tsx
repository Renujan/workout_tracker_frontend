import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Auth Pages
import { Landing } from './pages/auth/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { Onboarding } from './pages/auth/Onboarding';

// App Pages
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

// ─── Route Guards ─────────────────────────────────────────────────────────────

/** Only accessible when NOT logged in */
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isOnboarded } = useAuth();
  if (isAuthenticated && isOnboarded) return <Navigate to="/dashboard" replace />;
  if (isAuthenticated && !isOnboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

/** Requires login; if logged in but not onboarded → onboarding */
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isOnboarded } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isOnboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

// ─── Inner app (has auth context) ────────────────────────────────────────────

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public / Auth routes */}
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected App routes — wrapped in AppProvider + AppLayout */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AppProvider>
              <AppLayout>
                <Routes>
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
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
