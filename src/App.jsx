import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./components/cart/CartPage"
import AllProduct from "./pages/allProduct/AllProduct";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import ProtectedRouteForUser from "./protectedRoute/ProtectedRouteForUser";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage"
import Contact from "./pages/contact/contact"

function App() {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes for user */}
          <ProtectedRouteForUser path="/user-dashboard">
            <Route element={<UserDashboard />} />
          </ProtectedRouteForUser>

          {/* Protected routes for admin */}
          <ProtectedRouteForAdmin path="/admin-dashboard">
            <Route element={<AdminDashboard />} />
          </ProtectedRouteForAdmin>
          
          <ProtectedRouteForAdmin path="/addproduct">
            <Route element={<AddProductPage />} />
          </ProtectedRouteForAdmin>

          <ProtectedRouteForAdmin path="/updateproduct/:id">
            <Route element={<UpdateProductPage />} />
          </ProtectedRouteForAdmin>

          <Route path="*" element={<NoPage />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App
