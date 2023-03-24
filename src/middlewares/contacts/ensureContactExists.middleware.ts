import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { NextFunction, Request, Response } from "express";

export const ensureContactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({ id: req.params.id });

  if (!findContact) {
    throw new AppError("Contact not found", 404);
  }
  return next();
};
