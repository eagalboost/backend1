import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  console.log("Access token:", token);

  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(createError(403, "Token isn't valid"));

    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;

    console.log("Is Admin:", req.isAdmin);

    next();
  });
};
