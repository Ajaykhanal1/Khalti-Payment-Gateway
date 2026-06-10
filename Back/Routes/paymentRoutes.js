const express = require("express");
const axios = require("axios");
const Payment = require("../models/Payment");

const router = express.Router();

router.post("/pay", async (req, res) => {
  try {
    const { amount, name, email, phone } = req.body;
    if (!amount || amount < 1) {
      return res.status(400).json({
        message: "Minimum amount is 1 NPR",
      });
    }
    const amountInPaisa = Math.floor(Number(amount));

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/success",
        website_url: "http://localhost:5173",
        amount: amountInPaisa * 100,
        purchase_order_id: Date.now().toString(),
        purchase_order_name: "Test Product",

        customer_info: {
          name,
          email,
          phone,
        },
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const payment = await Payment.create({
      amount,
      pidx: response.data.pidx,
      customer_info: {
        name,
        email,
        phone,
      },
    });

    res.json({
      payment_url: response.data.payment_url,
      payment,
    });
  } catch (err) {
    console.log(err.response?.data);
    res.status(500).json({ message: "Payment Failed" });
  }
});

router.post("/verify", async (req, res) => {
  const { pidx } = req.body;

  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    },
  );

  if (response.data.status === "Completed") {
    await Payment.findOneAndUpdate({ pidx }, { status: "Completed" });
  }

  res.json(response.data);
});

module.exports = router;
