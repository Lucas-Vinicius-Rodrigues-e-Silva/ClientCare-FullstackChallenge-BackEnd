import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  if (userId && userId.length < 32) {
    return res.status(409).json({
      message: "Invalid user id!",
    });
  }
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
    req.user = {
      id: decoded?.sub,
      isActive: decoded?.isActive,
      isAdm: decoded?.isAdm,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
