import axios from "axios";
import { useState } from "react"
const App = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlePay = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    const res = await axios.post(
      "http://localhost:5000/pay",
      {
        amount,
        name,
        email,
        phone,
      }
    )
    window.location.href = res.data.payment_url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-600 via-green-800 to-green-900">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Khalti Payment
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            placeholder="Phone"
            required
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            type="number"
            required
            placeholder="Amount (NPR)"
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-purple-300"
          />

        </div>

        {/* Button */}
        <button
          onClick={handlePay}
          className="w-full mt-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300 shadow-lg"
        >
          Pay With Khalti
        </button>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-4">
          Secure payment powered by Khalti
        </p>

      </div>
    </div>
  )
}

export default App
