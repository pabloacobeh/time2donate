import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";
import AuthRoute from "./components/AuthRoute";
import EditProductView from "./views/EditProductView";
import ProductDetailView from "./views/ProductDetailsView";
import AddProductView from "./views/AddProductView";
import AboutUsView from "../src/views/AboutUsView";
import CategoriesView from "./views/CategoriesView";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/product/:id" element={<ProductDetailView />} />
        <Route path="aboutUs" element={<AboutUsView />} />
        <Route path="/editProduct/:id" element={<EditProductView />} />
        <Route path="/addProduct" element={<AddProductView />} />
        <Route path="/categories" element={<CategoriesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
