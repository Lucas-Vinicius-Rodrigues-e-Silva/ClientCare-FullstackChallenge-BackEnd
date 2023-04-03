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
  const contacts = await contactRepository.find({ withDeleted: true });

  const contactAlreadyExists = contacts.find(
    (contact) => contact.email === req.body.email
  );

  if (contactAlreadyExists) {
    throw new AppError("Contact already exists!", 409);
  }
  return next();
};
