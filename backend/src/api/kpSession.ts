import express from "express";
import axios from "axios";

import mockedShoppingCart from "../mocks/shoppingCart.json";

const router = express.Router();

router.post("/", (req, res) => {
  const { body } = req;
  const { credentials } = body;
  let data;

  if (body?.data) {
    data = body.data;
  } else {
    data = mockedShoppingCart;
  }

  axios("https://api.playground.klarna.com/payments/v1/sessions", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    withCredentials: true,
    auth: {
      username: credentials.username || (process.env.MERCHANT_USERNAME as string),
      password: credentials.password || (process.env.MERCHANT_PASSWORD as string),
    },
    data: data,
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error, error.response.data.error_messages);
      res.status(500).send({ error: "Failed to create a Klarna Session" });
    });
});

export default router;
