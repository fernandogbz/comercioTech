import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

/* 'authenticate' middleware function is responsible for verifying and decoding a JSON Web Token (JWT) extracted from a cookie in the request.
It checks if the token exists, decodes it, and assigns the user information to the request object. If the token is invalid or missing, it throws an error.*/
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("No autorizado, token falló");
    }
  } else {
    res.status(401);
    throw new Error("No autorizado, no token");
  }
});

/**
 * 'authorizeAdmin' checks if the user making the request is an admin and allows access if true, otherwise sends a 401 unauthorized status with a message
 */
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("No autorizado como administrador");
  }
};

export { authenticate, authorizeAdmin };
