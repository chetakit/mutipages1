import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import "./Products.css"; // ✅ ต้องมี CSS ด้านล่าง

const Products = () => {
  const [currentPage, setCurrentPage] = useState("products");
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: "accusamus beatae ad facilis cum similique qui sunt", price: 3.96, color: "#93c572" },
    { id: 2, name: "reprehenderit est deserunt velit ipsam", price: 60.63, color: "#8b4a9e" },
    { id: 3, name: "officia porro iure quia iusto qui ipsa ut modi", price: 15.13, color: "#2ecc71" },
    { id: 4, name: "culpa odio esse rerum omnis laboriosam voluptate repudiandae", price: 41.83, color: "#e91e8c" },
    { id: 5, name: "product five", price: 25.0, color: "#ff6b9d" },
    { id: 6, name: "product six", price: 33.5, color: "#4fb3d4" },
    { id: 7, name: "product seven", price: 18.99, color: "#a8e6cf" },
    { id: 8, name: "product eight", price: 52.0, color: "#5b3a70" },
  ];

  const addToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);

  // ✅ สร้าง particle effect ตอน checkout
  const createParticles = () => {
    const box = document.querySelector(".checkout-box");
    if (!box) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "gold-particle";
      box.appendChild(particle);

      const angle = Math.random() * 2 * Math.PI;
      const radius = 60 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      particle.style.setProperty("--x", `${x}px`);
      particle.style.setProperty("--y", `${y}px`);

      setTimeout(() => particle.remove(), 1200);
    }
  };

  // ✅ เปิด modal พร้อม glow + particle
  const handleCheckout = () => {
    const box = document.querySelector(".checkout-box");
    if (box) {
      box.classList.add("checkout-glow");
      createParticles();
    }

    const modalEl = document.getElementById("checkoutModal");
    const checkoutModal = new window.bootstrap.Modal(modalEl);
    checkoutModal.show();
  };

  // ✅ ปิด modal + ลบ overlay + fade-out กล่อง
  const confirmCheckout = () => {
    setCartItems([]);
    const box = document.querySelector(".checkout-box");
    if (box) {
      box.classList.remove("checkout-glow");
      box.classList.add("checkout-fadeout");
      setTimeout(() => box.classList.remove("checkout-fadeout"), 1200);
    }

    const modalEl = document.getElementById("checkoutModal");
    const checkoutModal = window.bootstrap.Modal.getInstance(modalEl);
    if (checkoutModal) checkoutModal.hide();

    setTimeout(() => {
      document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
    }, 300);
  };

  const ProductCard = ({ product, isCartPage }) => (
    <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
      <div
        className="d-flex align-items-center justify-content-center text-white fw-bold fs-5"
        style={{
          backgroundColor: product.color,
          height: "150px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        150 x 150
      </div>
      <div className="card-body text-center">
        <h6 className="card-title text-secondary text-truncate" title={product.name}>
          {product.name}
        </h6>
        <p className="fw-bold fs-5 mb-3">${product.price}</p>
        {isCartPage ? (
          <button onClick={() => removeFromCart(product.id)} className="btn btn-outline-danger w-100 fw-semibold">
            Delete from Carts
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            disabled={cartItems.some((item) => item.id === product.id)}
            className={`btn w-100 fw-semibold ${
              cartItems.some((item) => item.id === product.id) ? "btn-danger" : "btn-primary"
            }`}
          >
            {cartItems.some((item) => item.id === product.id) ? "Added to Carts" : "Add to Carts"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container my-5 checkout-box">
      <div className="card p-4 shadow-lg border-0">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div>
            <button
              onClick={() => setCurrentPage("products")}
              className={`btn fw-bold me-2 ${
                currentPage === "products" ? "btn-primary text-white" : "btn-outline-primary"
              }`}
            >
              🛍️ Products ({products.length})
            </button>

            <button
              onClick={() => setCurrentPage("carts")}
              className={`btn fw-bold position-relative ${
                currentPage === "carts" ? "btn-success text-white" : "btn-outline-success"
              }`}
            >
              <ShoppingCart className="me-1" size={18} />
              Carts
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {currentPage === "products" ? (
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} isCartPage={false} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="row g-4 mb-4">
              {cartItems.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-lg-4">
                  <ProductCard product={product} isCartPage={true} />
                </div>
              ))}
            </div>

            {cartItems.length > 0 ? (
              <div className="border-top pt-4 text-center">
                <h5 className="fw-semibold mb-3">
                  🛒 Products:
                  <span className="badge bg-danger ms-2">{cartItems.length} items</span> - Total:
                  <span className="badge bg-success ms-2">${getTotalPrice()}</span>
                </h5>
                <button
                  className="btn btn-warning fw-bold text-dark px-5 py-2 mt-3 rounded-pill shadow-sm checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout ⇆
                </button>
              </div>
            ) : (
              <div className="text-center py-5 text-secondary">
                <ShoppingCart size={50} className="opacity-50 mb-3" />
                <p className="fs-5">Your cart is empty 🛒</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ Modal Checkout */}
      <div
        className="modal fade"
        id="checkoutModal"
        tabIndex="-1"
        aria-labelledby="checkoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-3 gold-border">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fw-bold" id="checkoutModalLabel">
                ✅ Checkout Successful
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center p-4">
              <h5 className="text-dark mb-3">ขอบคุณที่ใช้บริการ ❤️</h5>
              <p className="text-muted">ระบบได้ทำการชำระเงินและล้างตะกร้าเรียบร้อยแล้ว</p>
              <ShoppingCart size={50} className="text-success my-3" />
            </div>
            <div className="modal-footer justify-content-center border-0">
              <button type="button" className="btn btn-success px-4" onClick={confirmCheckout}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
