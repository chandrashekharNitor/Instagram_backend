import { Router } from "express";
import { notSupportedHandler } from "../middleware/index.js";
import authController from "./auth.controller.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router
  .route("/login")
  .post(expressAsyncHandler(authController.loginHandler))
  .all(notSupportedHandler);

router
  .route("/signup")
  .post(expressAsyncHandler(authController.signUpHandler))
  .all(notSupportedHandler);

export default router;
