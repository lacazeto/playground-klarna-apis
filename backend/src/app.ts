import express from "express";
import * as bodyParser from "body-parser";
import * as routes from "./routes";

const app = express();

app.use(
  bodyParser.json({
    limit: "1mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/session", routes.session);

export { app };
