import { Router } from "express";
import { UserRepository } from "../database/repositories/user.repository.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { ProfileController } from "./Profile.controller.js";
import { getDatabase } from "../database/connection.js";
import expressAsyncHandler from "express-async-handler";
import { notSupportedHandler } from "../middleware/index.js";

export class ProfileRouter {
  static setup() {
    const db = getDatabase();
    const userRepositary = new UserRepository(db);
    const profileController = new ProfileController(userRepositary);
    const router = Router();
    router.use(authMiddleware);
    router
      .route("/profile/:id")
      .patch(expressAsyncHandler(profileController.profileEditHandler))
      .get(expressAsyncHandler(profileController.profileGetHandler))
      .all(notSupportedHandler);
    return router;
  }
}
