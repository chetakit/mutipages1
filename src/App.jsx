import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import Components from "./pages/Components";
import ForwardToHome from "./pages/ForwardToHome";
import Todos from "./pages/Todos";
import Product from "./pages/Products";
import ProductsCartsApp from "./pages/ProductsCartsApp";
import Login from "./pages/Login/Login";

function App() {
  const [counter, setCounter] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    }
  }, [token, role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole("");
  };

  return (
    <BrowserRouter basename="/mutipages1/">
      <Routes>
        {!token ? (
          <Route
            path="*"
            element={<Login setToken={setToken} setRole={setRole} />}
          />
        ) : (
          <>
            <Route
              path="/"
              element={<AppLayout setToken={handleLogout} role={role} />}
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route
                path="home"
                element={<Home counter={counter} setCounter={setCounter} />}
              />
              <Route path="calculator" element={<Calculator />} />
              <Route path="animation" element={<Animation />} />
              <Route path="components" element={<Components />} />
              <Route path="forwardtohome" element={<ForwardToHome />} />
              <Route path="todos" element={<Todos />} />
              <Route path="product" element={<Product />} />
              <Route path="cart" element={<ProductsCartsApp />} />
            </Route>

            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
