
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

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route element={<Layout />}>
        <Route path='/apps' element={<IFrame />} />
        {/* <Route path='/datascruize' element={<CategoryPage />} /> */}
        <Route path='/datacruize' element={<Master />}>
          <Route index element={<Navigate to="category" replace />} />
          <Route path='category' element={<CategoryPage />} />
          <Route path='subcategory' element={<SubcategoryPage />} />
        </Route>
      </Route>
      <Route />
      <Route />
    </Routes>
    // <main>
    //   <AppRoute/>
    // </main>
  );
}

export default App;


