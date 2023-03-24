import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { NextFunction, Request, Response } from "express";

export const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: req.params.id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  return next();
};
