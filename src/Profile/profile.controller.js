import { BaseController } from "../common/base.controller.js";
import { upload } from "../common/file.utils.js";
import { profilePictureOptions } from "./profile.picture.upload.config.js";
import { profileEvents, PROFILE_UPLOAD } from "./events/events.js";
import { profileEditReqSchema } from "./dtos/profile.schema.js";

export class ProfileController extends BaseController {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  profileEditHandler = async (req, res, next) => {
    try {
      const { fields, files } = await upload(req, profilePictureOptions);
      console.log(fields, "<<<fields");

      const value = await profileEditReqSchema.validateAsync(fields);
      console.log(files, "<<<files");

      const user = await this.userRepository.updateUser({
        ...value,
        id: req.userId,
        avtar_url: files.profile_avtar[0]?.newFilename,
      });

      profileEvents.emit(PROFILE_UPLOAD, files);
      return this.ok(res, fields);
    } catch (error) {
      console.log(error, "<<<error");
      return this.badRequest(res, error);
    }
  };

  profileGetHandler = async (req, res) => {
    const user = await this.userRepository.findById(req.params.id);
    console.log(req.params.id, "<<<user");
    if (!user) {
      return this.notFound(res, {
        message: "User not found",
      });
    }
    return this.ok(res, user);
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
