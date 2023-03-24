import { Request, Response } from "express";
import deleteContactService from "../../services/contacts/deleteContacts.service";

const deleteContactsController = async (req: Request, res: Response) => {
  const deleteContactId: string = req.params.id;
  const deleteContact = await deleteContactService(deleteContactId);
  return res.status(204).json({ message: "deleted with sucessfull!" });
};

export default deleteContactsController;
