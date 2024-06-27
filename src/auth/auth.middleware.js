import baseController from "../common/base.controller.js";
import { JwtService } from "./services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return baseController.unauthorized(res, {
      message: "Authorization token is required",
    });
  }

  const [scheme, token] = req.headers.authorization.split(" ");

  if (scheme !== "Bearer") {
    return baseController.unauthorized(res, {
      message: "Invalid authorization scheme",
    });
  }

  if (!token) {
    return baseController.unauthorized(res, {
      message: "Authorization token is required",
    });
  }

  JwtService.verify(token)
    .then((payload) => {
      req.userId = payload.sub;
      next();
    })
    .catch((err) => {
      return baseController.unauthorized(res, {
        message: err.message,
      });
    });
};
