import { Router } from "express";
import { notSupportedHandler } from "../middleware/index.js";
import { AuthController } from "./auth.controller.js";
import expressAsyncHandler from "express-async-handler";
import { getDatabase } from "../database/connection.js";
import { UserRepository } from "../database/repositories/user.repository.js";
import { authMiddleware } from "./auth.middleware.js";

export class AuthRouter {
  static setup() {
    const db = getDatabase();
    const userRepositary = new UserRepository(db);
    const authController = new AuthController(userRepositary);

    const router = Router();
    router
      .route("/login")
      .post(expressAsyncHandler(authController.loginHandler))
      .all(notSupportedHandler);

    router
      .route("/signup")
      .post(expressAsyncHandler(authController.signUpHandler))
      .all(notSupportedHandler);

    router
      .route("/me")
      .get(authMiddleware, expressAsyncHandler(authController.meHandler))
      .all(notSupportedHandler);

    return router;
  }
}
