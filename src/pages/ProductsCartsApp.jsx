import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

const ProductsCartsApp = () => {
  const [currentPage, setCurrentPage] = useState("products");
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: "accusamus beatae ad facilis cum similique qui sunt", price: 3.96, image: "#93c572" },
    { id: 2, name: "reprehenderit est deserunt velit ipsam", price: 60.63, image: "#8b4a9e" },
    { id: 3, name: "officia porro iure quia iusto qui ipsa ut modi", price: 15.13, image: "#2ecc71" },
    { id: 4, name: "culpa odio esse rerum omnis laboriosam voluptate repudiandae", price: 41.83, image: "#e91e8c" },
    { id: 5, name: "product five", price: 25.0, image: "#ff6b9d" },
    { id: 6, name: "product six", price: 33.5, image: "#4fb3d4" },
    { id: 7, name: "product seven", price: 18.99, image: "#a8e6cf" },
    { id: 8, name: "product eight", price: 52.0, image: "#5b3a70" },
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

  const ProductCard = ({ product, isCartPage }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div
        className="w-full h-48 flex items-center justify-center text-white text-xl font-semibold"
        style={{ backgroundColor: product.image }}
      >
        150 x 150
      </div>
      <div className="p-4 text-center">
        <h3 className="text-sm text-gray-700 mb-2 h-12 overflow-hidden">{product.name}</h3>
        <p className="text-lg font-bold text-gray-900 mb-3">${product.price}</p>

        {isCartPage ? (
          <button
            onClick={() => removeFromCart(product.id)}
            className="w-full px-4 py-2 bg-white border-2 border-red-400 text-red-500 rounded hover:bg-red-50 transition-colors"
          >
            Delete from Carts
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            disabled={cartItems.some((item) => item.id === product.id)}
            className={`w-full px-4 py-2 rounded transition-colors ${
              cartItems.some((item) => item.id === product.id)
                ? "bg-red-500 text-white cursor-not-allowed"
                : "bg-white border-2 border-blue-400 text-blue-500 hover:bg-blue-50"
            }`}
          >
            {cartItems.some((item) => item.id === product.id)
              ? "added to carts"
              : "Add to carts"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* 🔹 ปุ่มสลับหน้า */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage("products")}
              className={`px-4 py-2 rounded ${
                currentPage === "products"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setCurrentPage("carts")}
              className={`px-4 py-2 rounded relative ${
                currentPage === "carts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart className="inline w-4 h-4 mr-1" />
              Carts
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 🔸 เนื้อหาหลัก */}
        {currentPage === "products" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isCartPage={false} />
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {cartItems.map((product) => (
                <ProductCard key={product.id} product={product} isCartPage={true} />
              ))}
            </div>

            {cartItems.length > 0 ? (
              <div className="text-center border-t pt-4">
                <div className="flex justify-center items-center gap-4 mb-3">
                  <span className="text-gray-700">
                    Products:{" "}
                    <span className="bg-red-500 text-white px-3 py-1 rounded font-semibold">
                      {cartItems.length} items
                    </span>
                  </span>
                  <span className="text-gray-700">- Total price:</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-semibold">
                    ${getTotalPrice()}
                  </span>
                </div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-2 rounded transition-colors">
                  Checkout ⇆
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCartsApp;
