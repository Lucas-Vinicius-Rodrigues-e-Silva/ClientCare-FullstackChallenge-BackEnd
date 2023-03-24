import { Request, Response } from "express";
import listOneContactService from "../../services/contacts/listOneContact.service";

const listOneContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;
  const contactReturned = await listOneContactService(contactId);
  return res.status(200).json(contactReturned);
};

export default listOneContactController;
