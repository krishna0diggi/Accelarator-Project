
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './pages/Public/Register';
import Login from './pages/Public/Login';
import Layout from './components/layout/Layout';
import Users from './pages/Private/Users';
import Category from './pages/Private/Category';
import Apps from './pages/Private/Apps';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
       <Route element={<Layout />}>
          <Route path="/user" element={<Users/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/apps" element={<Apps/>} />
        </Route>

      <Route  />
      <Route />

    </Routes>
  );
}

export default App;


