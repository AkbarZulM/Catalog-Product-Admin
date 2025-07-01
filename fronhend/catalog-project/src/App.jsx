import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import DataProduct from "./pages/admin/DataProduct";
import Create from "./pages/admin/Crud/create";
import Update from "./pages/admin/Crud/update";
import LoginUser from "./pages/admin/LoginPage";
import RegisterPage from "./pages/admin/RegisterPage";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* public */}
          <Route path="/" element={<LoginUser />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AnimatePresence>
      <Routes>
        {/* admin */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<DataProduct />} />
          <Route path="create-product" element={<Create />} />
          <Route path="update-product" element={<Update />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
