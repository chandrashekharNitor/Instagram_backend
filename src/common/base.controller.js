import { ServerResponse } from "./server.response.js";

export class BaseController {
  ok(res, data) {
    return res.status(200).json(ServerResponse.success(data));
  }

  created(res, data) {
    return res.status(201).json(ServerResponse.success(data));
  }

  notFound(res, error) {
    return res.status(404).json(ServerResponse.error(error));
  }

  badRequest(res, error) {
    return res.status(400).json(ServerResponse.error(error));
  }

  serverError(res, error) {
    return res.status(500).json(ServerResponse.error(error));
  }

  notSupported(res, error) {
    return res.status(405).json(ServerResponse.error(error));
  }

  unauthorized(res, error) {
    return res.status(401).json(ServerResponse.error(error));
  }

  forbidden(res, error) {
    return res.status(403).json(ServerResponse.error(error));
  }
}

const baseController = new BaseController();
export default baseController;
