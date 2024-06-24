import baseController from "../common/base.controller.js";

export const notSupportedHandler = (req, res) => {
  return baseController.notSupported(res, {
    message: `method ${req.method} not supported on ${req.path} route`,
  });
};
