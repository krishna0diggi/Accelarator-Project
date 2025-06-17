
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './pages/Public/Register';
import Login from './pages/Public/Login';
import Layout from './components/layout/Layout';
import Users from './pages/Private/Users';
import Category from './pages/Private/Master/CategoryPage';
import Apps from './pages/Private/Apps';
import { AppRoute } from './routes';
import IFrame from './pages/Private/IFrame';
import CategoryPage from './pages/Private/Master/CategoryPage';
import Master from './pages/Private/Master';
import SubcategoryPage from './pages/Private/Master/SubcategoryPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import { ROLES } from './lib/roles';
import Unauthorized from './pages/Public/UnAuthorized';
import NotFound from './pages/Public/NotFound';
import AdminLayout from './components/layout/AdminLayout';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]} />}>
          <Route element={<Layout />}>
            <Route path='/apps' element={<IFrame />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path='/datacruize' element={<Master />}>
            <Route index element={<Navigate to="category" replace />} />
            <Route path='category' element={<CategoryPage />} />
            <Route path='subcategory' element={<SubcategoryPage />} />
          </Route>
        </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;


