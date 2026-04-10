import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!product) {
    return (
      <div className="p-10 text-center">
        No product selected.
      </div>
    );
  }

  const total = product.price * quantity;

  const handlePayment = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    if (paymentMethod === "card" && cardNumber.length < 16) {
      alert("Enter valid 16-digit card number");
      return;
    }

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const id = "ORD" + Date.now();
      setOrderId(id);
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/marketplace");
      }, 4000);

    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Secure Checkout
      </h1>

      {!success ? (
        <div className="grid grid-cols-2 gap-10">

          {/* PRODUCT SECTION */}
          <div className="bg-white p-6 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-500">
              Seller: {product.seller}
            </p>

            <p className="text-emerald-600 font-bold text-lg mt-2">
              ₹{product.price}
            </p>

            <div className="mt-4">
              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
                className="border p-2 rounded w-24"
              />
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Delivery Address
            </h3>

            <textarea
              placeholder="Enter full delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-3 rounded mb-6"
            />

            <h3 className="text-lg font-semibold mb-4">
              Payment Method
            </h3>

            <div className="space-y-3 mb-6">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Credit / Debit Card
              </label>

              {paymentMethod === "card" && (
                <input
                  type="text"
                  placeholder="Enter 16-digit Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border p-3 rounded"
                />
              )}

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI
              </label>

              {paymentMethod === "upi" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full border p-3 rounded"
                />
              )}

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash On Delivery
              </label>

            </div>

            <div className="border-t pt-4 mb-4">
              <p className="flex justify-between text-lg">
                <span>Total Amount</span>
                <span className="font-bold">
                  ₹{total}
                </span>
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700 transition"
            >
              {processing ? "Processing Payment..." : "Pay Now"}
            </button>

          </div>
        </div>
      ) : (
        <div className="bg-white p-10 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Payment Successful 🎉
          </h2>
          <p className="mb-2">
            Order ID: {orderId}
          </p>
          <p>
            Redirecting to Marketplace...
          </p>
        </div>
      )}

    </div>
  );
}

export default Checkout;