import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

const PROFILE_PICTURE_SIZE_LIMIT = 5 * 1024 * 1024;

export const profilePictureOptions = formidable({
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: PROFILE_PICTURE_SIZE_LIMIT,
  filename: (_, ext, __, ___) => {
    return `${uuidv4()}${ext}`;
  },
  filter: function ({ _, __, mimetype }) {
    // keep only images
    return mimetype && mimetype.includes("image");
  },
});
