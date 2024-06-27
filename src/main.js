import { ConfigService } from "./config/config.loader.js";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/index.js";
import { AuthRouter } from "./auth/auth.router.js";
import { getDatabase, pingDatabase } from "./database/connection.js";
ConfigService.load();
const db = getDatabase();

const app = express();
const port = ConfigService.get("port");
app.use(express.json());

app.use("/auth", AuthRouter.setup());

app.use(notFoundHandler);
app.use(errorHandler);

pingDatabase(db)
  .then(() => {
    console.log("database connected");

    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`failed to connect database: ${error}`);
    process.exit(1);
  });
