import { app } from "./src/app";
import { AddressInfo } from "net";
import dotenv from "dotenv";

dotenv.config();

const server = app.listen(5000, "localhost", () => {
  const { port, address } = server.address() as AddressInfo;
  console.log("Server listening on:", "http://" + address + ":" + port);
});
