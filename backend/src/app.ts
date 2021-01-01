import express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as routes from "./routes";

interface JsonParsedIncomingMessage extends http.IncomingMessage {
  rawBody: Buffer;
}

const app = express();

app.use(
  bodyParser.json({
    limit: "1mb",
    verify(req: JsonParsedIncomingMessage, res, buf) {
      req.rawBody = buf;
    },
  })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/kp/session", routes.kpSession);

export { app };
