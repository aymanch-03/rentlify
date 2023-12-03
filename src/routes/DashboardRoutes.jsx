import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import UserProfile from "../components/Users/userProfile";
import OfficeLayout from "../layouts/OfficeLayout";
import AddProduct from "../pages/AddProduct";
import CategoriesPage from "../pages/Categories";
import CustomerDetails from "../pages/CustomerDetails";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import OrderPage from "../pages/Order";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import UpdateProducts from "../pages/UpdateProducts";
import Users from "../pages/Users";
import Subcategories from "../pages/subcategories";

const DashboardRoutes = () => {
  return (
    <OfficeLayout>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetails />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/subcategories" element={<Subcategories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProducts />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </OfficeLayout>
  );
};

export default DashboardRoutes;
