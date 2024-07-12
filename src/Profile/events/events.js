import { EventEmitter } from "node:events";
import { profilePictureUploadHandler } from "./handlers.js";

export const profileEvents = new EventEmitter();
export const PROFILE_UPLOAD = "picture_upload";

profileEvents.on(PROFILE_UPLOAD, profilePictureUploadHandler);
