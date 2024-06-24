import baseController from "../common/base.controller.js";

export const notFoundHandler = (req, res) => {
  return baseController.notFound(res, { message: "Not found" });
};
