import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadoPago";
import axios from "axios";

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-3800702106129046-091318-690aa851793e0cbdba0e45f4d6545f65-637376333"
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.post("/create_preference", async (req, res) => {
  console.log("xd");
  console.log("quantity", Number(req.body.quantity));
  console.log("price", Number(req.body.price));
  try {
    const body = {
      items: [
        {
          title: "Suplementos",
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "COP"
        }
      ],
      back_urls: {
        success: "https://cachamasuplementos.netlify.app/",
        failure: "",
        pending: ""
      },
      auto_return: "approved"
    };
    let initPoint = "";
    await axios
      .post("https://api.mercadopago.com/checkout/preferences", body, {
        headers: {
          Authorization: `Bearer APP_USR-3800702106129046-091318-690aa851793e0cbdba0e45f4d6545f65-637376333`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        initPoint = response.data.init_point;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
    console.log("initPoint", initPoint);
    res.status(200).json({ initPoint });
  } catch (error) {
    console.log("errorxd", error);
  }
});

app.listen(port, () => {
  console.log(`el servidor esta corriendo en el puerto ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("hola mundo");
});
