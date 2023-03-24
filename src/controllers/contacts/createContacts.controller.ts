import { Request, Response } from "express";
import { IContactRequest } from "../../interfaces/contacts";
import createContactService from "../../services/contacts/createContact.service";

const createContactController = async (req: Request, res: Response) => {
  const clientData: IContactRequest = req.body;
  const clientId: string = req.params.id;
  const newClient = await createContactService(clientData, clientId);
  return res.status(201).json(newClient);
};

export default createContactController;
