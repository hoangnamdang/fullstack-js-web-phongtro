import express from "express";
import cros from "cors";
import initRouter from "./routers";
import testConnection from "./config/connectDatabase";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cros({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);
initRouter(app);
testConnection();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("running post", port);
});
