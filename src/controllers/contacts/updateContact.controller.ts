import { Request, Response } from "express";
import { IContactUpdateRequest } from "../../interfaces/contacts";
import updateContactsService from "../../services/contacts/updateContacts.service";

const updateContactController = async (req: Request, res: Response) => {
  const contactData: IContactUpdateRequest = req.body;
  const contactId: string = req.params.id;
  const updateContact = await updateContactsService(contactData, contactId);
  return res.json(updateContact);
};

export default updateContactController;
