import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home_page } from "./pages/Home_page"
import { User_login_page } from "./pages/auth pages/User_login_page"
import Admin_login_page from "./pages/auth pages/Admin_login_page"
import User_signup_page from "./pages/auth pages/User_signup_page"
import { Toaster } from 'react-hot-toast'
import Admin_dashboard_page from "./pages/admin pages/Admin_dashboard_page"
import { ScrollToTop } from "./components/common/ScrollToTop"
import { Admin_layout } from "./reuse components/AdminDashboard_layout"
import { Admin_AddProduct } from "./pages/admin pages/Admin_add_product_page"
import { Admin_addCategory } from "./pages/admin pages/Admin_add_category_page"
import { Admin_addBrands } from "./pages/admin pages/Admin_add_brands_page"
import Admin_product_page from "./pages/admin pages/Admin_product_page"


function App() {
  return (
    <>
      <Toaster reverseOrder={true} containerStyle={{zIndex : 99999999999999}} />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home_page />} />
          <Route path="/home" element={<Home_page />} />


          {/*  User Auth Route Page*/}
          <Route path="/login" element={<User_login_page />} />
          <Route path="/signup" element={<User_signup_page />} />


          {/* Admin Auth Route Page */}
          <Route path="/admin" element={<Admin_login_page />} />


          {/* Admin pages */}
          <Route element={<Admin_layout />}>
            <Route path="/admin/dashboard" element={<Admin_dashboard_page />} />
            <Route path="/admin/products" element={<Admin_product_page />} />
            <Route path="/admin/add_product" element={<Admin_AddProduct />} />
            <Route path="/admin/add_category" element={<Admin_addCategory />} />
            <Route path="/admin/add_brand" element={<Admin_addBrands />} />
          </Route>




        </Routes>
      </BrowserRouter >

    </>
  )
}

export default App
