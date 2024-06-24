import { ConfigService } from "./config/config.loader.js";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/index.js";
import authRouter from "./auth/auth.router.js";
ConfigService.load();
const app = express();
const port = ConfigService.get("port");
app.use(express.json());

app.use("/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
