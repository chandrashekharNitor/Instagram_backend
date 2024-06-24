import baseController from "../common/base.controller.js";

export const errorHandler = (err, req, res, next) => {
  return baseController.serverError(res, { message: err.message });
};
