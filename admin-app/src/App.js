import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Enquires from './pages/Enquires';
import BlogList from './pages/BlogList';
import BlogatList from './pages/Blogatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colors from './pages/Colorlist';
import Categorylist from './pages/Catergorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Login /> } />
        <Route path = "/reset-password" element={<Resetpassword /> } />
        <Route path = "/forgot-password" element={<Forgotpassword /> } />
        <Route path = "/admin" element={<MainLayout />} >
          <Route index element = {<Dashboard />} />
          <Route path="enquires" element = {<Enquires />} />
          <Route path="blog-list" element = {<BlogList />} />
          <Route path="add-blog" element = {<Addblog />} />
          <Route path="blog-category-list" element = {<BlogatList />} />
          <Route path="orders" element = {<Orders />} />
          <Route path="customers" element = {<Customers />} />
          <Route path="list-color" element = {<Colors />} />
          <Route path="list-category" element = {<Categorylist />} />
          <Route path="list-brand" element = {<Brandlist />} />
          <Route path="list-product" element = {<Productlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
