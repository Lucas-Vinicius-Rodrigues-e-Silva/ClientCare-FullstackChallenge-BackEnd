import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { NextFunction, Request, Response } from "express";

export const ensureUpdateUserItsNotExistentEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body.email);
  const userRepository = AppDataSource.getRepository(User);
  if (req.body.email !== undefined) {
    const findUser = await userRepository.findOneBy({ email: req.body.email });
    if (findUser) {
      throw new AppError("User already exists!", 404);
    }
  }

  return next();
};
