import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import PoolPage from './pages/Pool';
import ProfilPage from './pages/Profil';
import JoinPage from './pages/Join';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/join" element={<JoinPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pool"
            element={
              <ProtectedRoute>
                <PoolPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <ProfilPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
