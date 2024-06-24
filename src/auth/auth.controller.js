import { BaseController } from "../common/base.controller.js";
import { signupReqSchema } from "./dto/signUp.req.js";

class AuthController extends BaseController {
  loginHandler = async (req, res) => {
    const { username, password } = req.body;
    console.log("username", username, "password", password);

    if (!username && !password) {
      return this.badRequest(res, {
        message: "username and password are required",
      });
    }

    if (username == "admin" && password == "admin") {
      return this.ok(res, {
        message: "login successful",
      });
    }

    return this.unathorized(res, {
      message: "username or password is incorrect",
    });
  };

  signUpHandler = async (req, res) => {
    try {
      const value = await signupReqSchema.validateAsync(req.body);
      const { username, password, email } = value;
      console.log("username", username, "password", password, email);

      return this.ok(res, value);
    } catch (err) {
      if (err.isJoi) {
        return this.badRequest(res, {
          message: err.details,
        });
      }
      throw err;
    }
  };
}

const authController = new AuthController();
export default authController;
