import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Enquires from './pages/Enquires';
import BlogList from './pages/BlogList';
import BlogcatList from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colors from './pages/Colorlist';
import Categorylist from './pages/Catergorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import Addblogcat from './pages/Addblogcat';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';


function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={<OpenRoutes> <Login /> </OpenRoutes> } />
        <Route path = "/reset-password" element={<Resetpassword /> } />
        <Route path = "/forgot-password" element={<Forgotpassword /> } />
        <Route path = "/admin" element={<PrivateRoutes> <MainLayout /> </PrivateRoutes>} >
          <Route index element = {<Dashboard />} />
          <Route path="product/:id" element = {<Addproduct />} />
          <Route path="enquires" element = {<Enquires />} />
          <Route path="enquires/:id" element = {<ViewEnq />} />
          <Route path="brand/:id" element = {<Addbrand />} />
          <Route path="category/:id" element = {<Addcat />} />
          <Route path="blog-category/:id" element = {<Addblogcat />} />
          <Route path="blog/:id" element = {<Addblog />} />
          <Route path="color/:id" element = {<Addcolor />} />
          <Route path="coupon/:id" element = {<AddCoupon />} />
          <Route path="orders" element = {<Orders />} />
          <Route path="order/:id" element = {<ViewOrder />} />
          <Route path="customers" element = {<Customers />} />
          <Route path="add-blog" element = {<Addblog />} />
          <Route path="add-color" element = {<Addcolor />} />
          <Route path="add-blog-category" element = {<Addblogcat />} />
          <Route path="add-category" element = {<Addcat />} />
          <Route path="add-brand" element = {<Addbrand />} />
          <Route path="add-product" element = {<Addproduct />} />
          <Route path="add-coupon" element = {<AddCoupon />} />
          <Route path="list-coupon" element = {<Couponlist />} />
          <Route path="list-color" element = {<Colors />} />
          <Route path="list-category" element = {<Categorylist />} />
          <Route path="list-brand" element = {<Brandlist />} />
          <Route path="list-product" element = {<Productlist />} />
          <Route path="list-blog" element = {<BlogList />} />
          <Route path="list-blog-category" element = {<BlogcatList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
