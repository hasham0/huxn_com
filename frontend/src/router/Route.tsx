import { Route, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

/* import pages */
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/User/Profile";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../pages/Admin/AdminRoute";
import UsersList from "../pages/Admin/UsersList";
import OrderList from "../pages/Admin/OrderList";
import UserOrder from "../pages/User/UserOrder";
import CategoryList from "../pages/Admin/CategoryList";
import ProductList from "../pages/Admin/ProductList";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import AllProductsList from "../pages/Admin/AllProductsList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* login and register route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* authenticated route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-orders" element={<UserOrder />} />
      </Route>

      {/* admin route */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="/admin/userlist" element={<UsersList />} />
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/allproductslist" element={<AllProductsList />} />
        <Route path="/admin/categorylist" element={<CategoryList />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/productUpdate/:_id" element={<UpdateProduct />} />
      </Route>
    </Route>,
  ),
);

export default router;
