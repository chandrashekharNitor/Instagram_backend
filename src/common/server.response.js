export class ServerResponse {
  constructor() {
    this.data = null;
    this.error = null;
    this.success = false;
  }

  static success(data) {
    const response = new ServerResponse();
    response.data = data;
    response.success = true;
    return response;
  }

  static error(error) {
    const response = new ServerResponse();
    response.error = error;
    response.success = false;
    return response;
  }
}
