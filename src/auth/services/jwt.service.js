import { ConfigService } from "../../config/config.loader.js";
import { signAsync, verifyAsync } from "../util/jwt.js";

export class JwtService {
  static async sign(payload) {
    return signAsync(payload, ConfigService.get("jwt_secret"), {
      expiresIn: ConfigService.get("jwt_expiration"),
    });
  }

  static verify(token) {
    return verifyAsync(token, ConfigService.get("jwt_secret"));
  }
}
