import path from "path";
import os from "os";
import { moveFile } from "../../common/file.utils.js";

export const profilePictureUploadHandler = async (data) => {
  if (
    data.profile_avtar &&
    Array.isArray(data.profile_avtar) &&
    data.profile_avtar.length > 0
  ) {
    const file = data.profile_avtar[0];
    const { newFilename } = file;
    const source = path.join(os.tmpdir(), newFilename);
    const destination = path.join(
      process.cwd(),
      "public",
      "profile",
      newFilename
    );

    try {
      await moveFile(source, destination);
      console.log(`${newFilename} file moved from ${source} to ${destination}`);
    } catch (error) {
      console.log(error);
    }
  }
};
