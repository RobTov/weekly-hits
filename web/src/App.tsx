import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SongsList from './pages/public/SongsList';
import TopSongs from './pages/public/TopSongs';
import MySongs from './pages/songs/MySongs';
import SongForm from './pages/songs/SongForm';
import UserManagement from './pages/users/UserManagement';
import ArtistManagement from './pages/artists/ArtistManagement';
import { useAuthStore } from './store/auth-store';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated || !user?.is_administrator) {
    return null;
  }
  
  return <>{children}</>;
}

function ProgrammerRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated || (!user?.is_musical_programmer && !user?.is_administrator)) {
    return null;
  }
  
  return <>{children}</>;
}

function AppContent() {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/songs" element={<SongsList />} />
        <Route path="/top-songs" element={<TopSongs />} />
        <Route
          path="/my-songs"
          element={
            <ProgrammerRoute>
              <MySongs />
            </ProgrammerRoute>
          }
        />
        <Route
          path="/songs/create"
          element={
            <ProgrammerRoute>
              <SongForm />
            </ProgrammerRoute>
          }
        />
        <Route
          path="/songs/edit/:id"
          element={
            <ProgrammerRoute>
              <SongForm />
            </ProgrammerRoute>
          }
        />
          <Route
            path="/users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/artists"
            element={
              <ProgrammerRoute>
                <ArtistManagement />
              </ProgrammerRoute>
            }
          />
        </Route>
      </Routes>
    );
  }

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

