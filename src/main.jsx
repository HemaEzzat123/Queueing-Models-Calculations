import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import App2 from "./App2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <nav className="w-full flex justify-center items-center space-x-4 p-4 bg-gray-100">
        <Link to="/calculate">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Calculate
          </button>
        </Link>
        <Link to="/simulation">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Simulation
          </button>
        </Link>
      </nav>

      <Routes>
        <Route path="/calculate" element={<App />} />
        <Route path="/simulation" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
