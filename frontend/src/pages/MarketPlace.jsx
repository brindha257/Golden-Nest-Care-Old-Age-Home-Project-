import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Marketplace() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Handmade Basket",
      price: 200,
      seller: "Lakshmi Amma",
      image: "/images/basket.jpg"
    },
    {
      id: 2,
      name: "Knitted Scarf",
      price: 350,
      seller: "Meena Paati",
      image: "/images/scarf.jpg"
    },
    {
      id: 3,
      name: "Mango Pickle",
      price: 99,
      seller: "Radha Amma",
      image: "/images/pickle.jpg"
    }
  ]);

  const [cart, setCart] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const buyNow = (product) => {
    alert(`Purchased ${product.name}`);
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const addProduct = (e) => {
    e.preventDefault();

    setProducts([
      ...products,
      {
        id: Date.now(),
        ...newProduct,
        seller: "You (Senior)"
      }
    ]);

    setNewProduct({ name: "", price: "", description: "", image: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      <h1 className="text-4xl font-bold mb-6">
        Senior Marketplace
      </h1>

      {/* SELLER FORM */}
      {role === "senior" && (
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Add New Product
          </h2>

          <form onSubmit={addProduct} className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value)
                })
              }
              required
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded"
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >

            <div className="h-56 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                {product.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Seller: {product.seller}
              </p>

              <p className="text-lg font-semibold text-emerald-600 mt-2">
                ₹{product.price}
              </p>

              {/* PUBLIC BUTTONS */}
          {role === "public" && (
  <div className="flex gap-3 mt-4">
    <button
      onClick={() => addToCart(product)}
      className="flex-1 bg-yellow-400 py-2 rounded hover:bg-yellow-500 transition"
    >
      Add to Cart
    </button>

    <button
      onClick={() =>
        navigate("/checkout", { state: { product } })
      }
      className="flex-1 bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
    >
      Buy Now
    </button>
  </div>
)}

              {/* SENIOR DELETE */}
              {role === "senior" &&
                product.seller === "You (Senior)" && (
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded"
                  >
                    Remove Product
                  </button>
                )}
            </div>
          </div>
        ))}

      </div>

      {/* CART */}
      {role === "public" && cart.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Cart Summary
          </h2>

          {cart.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="font-bold text-lg mt-4">
            Total: ₹{total}
          </div>

          <button
            onClick={() => {
              alert("Order placed successfully");
              setCart([]);
            }}
            className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}

    </div>
  );
}

export default Marketplace;
