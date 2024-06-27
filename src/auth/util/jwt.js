import jwt from "jsonwebtoken";
import { promisify } from "util";
export const signAsync = promisify(jwt.sign);
export const verifyAsync = promisify(jwt.verify);
