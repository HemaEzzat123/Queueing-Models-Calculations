import Navbar from "./components/Navbar";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import App2 from "./App2.jsx";
import Home from "./Home.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate" element={<App />} />
        <Route path="/simulation" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
