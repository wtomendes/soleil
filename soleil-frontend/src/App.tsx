import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/globals.css";
import "./App.css";
import Cardapio from "./pages/Cardapio";
import ProductGallery from "./pages/ProductGallery";

export default function App() {
  // Vite expõe BASE_URL sempre com barra no final (ex.: "/soleil/")
  // React Router espera basename sem barra no final (ex.: "/soleil")
  const basename = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/produto/:productId" element={<ProductGallery />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}