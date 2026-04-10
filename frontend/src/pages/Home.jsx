import { useRef, useState, useEffect } from "react";

function Home() {

const [showLoginPopup, setShowLoginPopup] = useState(false);

useEffect(() => {
  const openLogin = () => setShowLoginPopup(true);
  window.addEventListener("openLogin", openLogin);

  return () => window.removeEventListener("openLogin", openLogin);
}, []);

const facilitiesRef = useRef(null);
const contactRef = useRef(null);
const [showPopup, setShowPopup] = useState(false);

const whatsappNumber = "919342313921";
const whatsappMessage = "Hello, I want to know more details about Golden Nest Care.";

const sendWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
};

const callNow = () => {
    window.location.href = `tel:+919342313921`;
};

return (
<div>

{/* Hero Section */}
<div
className="h-[85vh] bg-cover bg-center flex items-center justify-center"
style={{
backgroundImage:
"url('/images/old age home.jpg')",
}}
>
<div className="bg-black/60 p-10 rounded text-center text-white max-w-3xl">
<h1 className="text-4xl font-bold mb-4">
A Home Where Every Golden Year Matters
</h1>

<p className="mb-6">
Care, Comfort and Companionship under one roof.
<br />
Because every senior deserves a loving home.
</p>

<div className="flex justify-center gap-4">

<button
onClick={() =>
facilitiesRef.current.scrollIntoView({ behavior: "smooth" })
}
className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500"
>
Explore Facilities ↓
</button>

<button
onClick={sendWhatsApp}
className="border border-white px-6 py-3 rounded-lg text-white hover:bg-white hover:text-black transition"
>
Contact Us 💬
</button>

</div>
</div>
</div>

{/* Facilities Section */}
<section
ref={facilitiesRef}
className="py-16 px-10 bg-gray-100"
>
<h2 className="text-3xl font-bold text-center mb-10">
Our Senior Care Facilities
</h2>

<div className="grid md:grid-cols-3 gap-8">
{[
"24/7 Medical Care",
"Nutritious Meals",
"Comfortable Living Rooms",
"Recreational Activities",
"Emergency Assistance",
"Friendly Staff Support",
].map((facility, index) => (
<div
key={index}
className="bg-white p-6 rounded shadow hover:shadow-lg transition"
>
<h3 className="text-xl font-semibold mb-2">{facility}</h3>

<p className="text-gray-600">
Dedicated services designed to keep our seniors safe, happy, and healthy.
</p>

</div>
))}
</div>
</section>

{/* Gallery Section */}
<section className="py-16 px-10 bg-white">

<h2 className="text-3xl font-bold text-center mb-10">
Life at Golden Nest Care
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="text-center">
<img src="/images/gallery1.webp" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition" />
<h4 className="text-2xl text-center mb-8">Canteen</h4>
</div>

<div className="text-center">
<img src="/images/gallery2.webp" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition" />
<h4 className="text-2xl text-center mb-8">Rooms</h4>

</div>

<div className="text-center">
<img src="/images/gallery3.webp" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition" />
<h4 className="text-2xl text-center mb-8">Indoor games room</h4>

</div>

<div className="text-center">
<img src="/images/gallery4.webp" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition" />
<h4 className="text-2xl text-center mb-8">In house clinic</h4>

</div>

<div className="text-center">
<img src="/images/gallery5.webp" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition" />
<h4 className="text-2xl text-center mb-8">Temple</h4>

</div>

<div className="text-center">
<img src="/images/gallery6.webp" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 transition" />
<h4 className="text-2xl text-center mb-8">Library</h4>

</div>

</div>

</section>

{/* Contact Section */}
<section
ref={contactRef}
className="py-16 px-10 bg-slate-700 text-white"
>

<h2 className="text-3xl font-bold text-center mb-8">
Contact Us
</h2>

<div className="max-w-xl mx-auto text-center">

<p className="mb-4">
📍 Golden Nest Care, Chennai, Tamil Nadu
</p>

<button
onClick={() => setShowPopup(true)}
className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500"
>
Contact Info
</button>

{showPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg w-80 text-center relative">

<button
onClick={() => setShowPopup(false)}
className="absolute top-2 right-2 text-gray-500 hover:text-black"
>
✕
</button>

<h3 className="text-xl font-bold mb-4 text-slate-700">
Contact Support
</h3>

<p className="mb-2 text-black">📞 +91 93423 13921</p>
<p className="mb-4 text-black">✉️ goldennestcare@gmail.com</p>

<button
onClick={() => setShowPopup(false)}
className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800"
>
Close
</button>

</div>
</div>
)}
</div>
</section>

{showLoginPopup && (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white p-8 rounded-xl w-96 text-center">

<h2 className="text-2xl font-bold mb-6">Choose Portal</h2>

<button
onClick={() => window.location.href="/login/senior"}
className="w-full bg-green-600 text-white py-3 rounded mb-3"
>
Senior Login
</button>

<button
onClick={() => window.location.href="/login/staff"}
className="w-full bg-purple-600 text-white py-3 rounded"
>
Staff Login
</button>

<button
onClick={() => setShowLoginPopup(false)}
className="mt-4 text-gray-500"
>
Close
</button>
</div>
</div>
)}
</div>
);
}

export default Home;