import { BaseController } from "../common/base.controller.js";

import bcrypt from "bcrypt";
import { signupReqSchema } from "./dtos/signup.req.js";
import { JwtService } from "./services/jwt.service.js";
import { User } from "../database/models/user.js";

export class AuthController extends BaseController {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }
  loginHandler = async (req, res) => {
    const { email, password } = req.body;
    console.log("username", email, "password", password);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return this.unauthorized(res, {
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return this.unauthorized(res, {
        message: "Invalid credentials",
      });
    }

    const token = await JwtService.sign(user.createPayload());

    return this.ok(res, { access_token: token });
  };

  signUpHandler = async (req, res) => {
    try {
      const value = await signupReqSchema.validateAsync(req.body);
      value.password = await bcrypt.hash(value.password, 10);

      const newUser = await this.userRepository.insertUser(value);

      if (!newUser) {
        return this.serverError(res, {
          message: "Unable to create user",
        });
      }

      return this.ok(res, newUser);
    } catch (err) {
      if (err.isJoi) {
        return this.badRequest(res, {
          message: err.details,
        });
      }
      throw err;
    }
  };

  meHandler = async (req, res) => {
    const user = await this.userRepository.findById(req.userId);
    if (!user) {
      return this.notFound(res, {
        message: "User not found",
      });
    }
    return this.ok(res, user);
  };
}
