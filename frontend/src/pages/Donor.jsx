import { useState } from "react";

function Donor() {
  const [showThankYou, setShowThankYou] = useState(false);

  const [donations, setDonations] = useState([
    { purpose: "Medical Care", amount: "45000", status: "Completed" },
    { purpose: "Food & Nutrition", amount: "30000", status: "Ongoing" },
    { purpose: "Emergency Support", amount: "20000", status: "Completed" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    amount: "",
    message: "",
  });

  const handleDonate = (e) => {
    e.preventDefault();

    const newDonation = {
      purpose: formData.purpose,
      amount: formData.amount,
      status: "Ongoing",
    };

    setDonations([newDonation, ...donations]);
    setShowThankYou(true);

    setFormData({
      name: "",
      email: "",
      purpose: "",
      amount: "",
      message: "",
    });

    setTimeout(() => {
      setShowThankYou(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">
          Support Our Elderly Residents
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Your contribution helps provide medical care, nutritious food,
          and a better quality of life for senior citizens.
        </p>
      </div>

      {/* Form + Info */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Donation Form */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-6 text-slate-700">
            Make a Donation
          </h2>

          <form onSubmit={handleDonate} className="space-y-4">
            <input
              type="text"
              placeholder="Donor Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full border p-3 rounded"
            />

            <select
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
              required
              className="w-full border p-3 rounded"
            >
              <option value="">Select Donation Purpose</option>
              <option>Medical Care</option>
              <option>Food & Nutrition</option>
              <option>Daily Care & Maintenance</option>
              <option>Emergency Support</option>
            </select>

            <input
              type="number"
              placeholder="Donation Amount (₹)"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Message (optional)"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700"
            >
              Donate Now
            </button>
          </form>
        </div>

        {/* Why Donate */}
        <div className="bg-slate-800 text-white p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Why Your Support Matters
          </h2>

          <ul className="space-y-4 text-gray-200">
            <p>Your support plays a vital role in enhancing the lives of our senior citizens.
              Every contribution helps us create a safe, caring, and dignified environment where elders feel valued and respected.</p>

            <li>✔ Provides continuous medical care and timely emergency assistance</li>
            <li>✔ Ensures nutritious meals and proper daily care for residents</li>
            <li>✔ Supports emotional well-being through companionship and activities</li>
            <li>✔ Helps maintain clean, comfortable, and secure living spaces</li>
            <li>✔ Encourages transparency by tracking how every donation is used</li>
          </ul>
        </div>
      </div>

      {/* Donation Tracking */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Donation Usage Tracking
        </h2>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-4">Purpose</th>
                <th className="p-4">Amount (₹)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{item.purpose}</td>
                  <td className="p-4">{item.amount}</td>
                  <td className="p-4 text-emerald-600 font-semibold">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96 text-center relative">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-emerald-600 mb-3">
              Thank You!
            </h2>
            <p className="text-gray-600">
              Your donation has been recorded successfully.
            </p>
          </div>
        </div>

      )}
      {/* Major Sponsors Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Our Major Sponsors
        </h2>

        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          We proudly acknowledge our generous sponsors whose significant
          contributions help us provide quality care, medical support,
          and a dignified life for our elderly residents.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "R. Mahesh Kumar",
              amount: "₹2,50,000",
              purpose: "Medical Care Support",
            },
            {
              name: "Ananya Foundation",
              amount: "₹5,00,000",
              purpose: "Food & Nutrition Program",
            },
            {
              name: "Sri Lakshmi Trust",
              amount: "₹3,75,000",
              purpose: "Emergency & Daily Care",
            },
          ].map((sponsor, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-emerald-600"
            >
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {sponsor.name}
              </h3>
              <p className="text-gray-600 mb-1">
                Contribution: <span className="font-semibold">{sponsor.amount}</span>
              </p>
              <p className="text-sm text-gray-500">
                Purpose: {sponsor.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Donor;
