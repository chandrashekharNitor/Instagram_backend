import fs from "fs/promises";
import { firstValues } from "formidable/src/helpers/firstValues.js";

export const moveFile = async (source, destination) => {
  await fs.copyFile(source, destination);
  await fs.unlink(source);
};

export const upload = (req, fileOptions) => {
  return new Promise((resolve, reject) => {
    fileOptions.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const fieldsSingle = firstValues(fileOptions, fields, []);
      resolve({ fields: fieldsSingle, files });
    });
  });
};
