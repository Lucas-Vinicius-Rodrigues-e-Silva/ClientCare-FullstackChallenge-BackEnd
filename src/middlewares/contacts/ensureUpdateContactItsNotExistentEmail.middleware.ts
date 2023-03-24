import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { NextFunction, Request, Response } from "express";

export const ensureUpdateContactItsNotExistentEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({
    email: req.body.email,
  });

  if (findContact) {
    throw new AppError("Contact already exists!", 404);
  }
  return next();
};
