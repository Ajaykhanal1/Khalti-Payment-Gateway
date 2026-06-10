import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


function Success() {
    const [searchParams] = useSearchParams();
    const pidx = searchParams.get("pidx");
    const transaction_id = searchParams.get("transaction_id");
    const amount = Number(searchParams.get("amount"));
    const status = searchParams.get("status");
    const mobile = searchParams.get("mobile");
    const purchase_order_id = searchParams.get("purchase_order_id");
    const purchase_order_name = searchParams.get("purchase_order_name");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const pidx = params.get("pidx");

        axios.post(
            "http://localhost:5000/verify",
            {
                pidx,
            }
        );
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-600 via-emerald-800 to-green-900">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl text-white">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">✅</div>
                    <h1 className="text-2xl font-bold">Payment Success</h1>
                    <p className="text-white/70 text-sm">Your transaction was completed successfully</p>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">

                    <p><span className="text-white/70">Status:</span> <b>{status}</b></p>

                    <p><span className="text-white/70">Amount:</span> <b>{amount / 100} NPR</b></p>

                    <p><span className="text-white/70">Mobile:</span> <b>{mobile}</b></p>

                    <p><span className="text-white/70">Transaction ID:</span> <b>{transaction_id}</b></p>

                    <p><span className="text-white/70">PIDX:</span> <b>{pidx}</b></p>

                    <p><span className="text-white/70">Order ID:</span> <b>{purchase_order_id}</b></p>

                    <p><span className="text-white/70">Product:</span> <b>{purchase_order_name}</b></p>

                </div>

                {/* Button */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="w-full mt-6 py-3 rounded-lg bg-white text-green-700 font-semibold hover:bg-gray-100 transition"
                >
                    Back to Home
                </button>

            </div>
        </div>
    )
}

export default Success;