const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  amount: Number,
  pidx: String,
  customer_info: {
    name: String,
    email: String,
    phone: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);