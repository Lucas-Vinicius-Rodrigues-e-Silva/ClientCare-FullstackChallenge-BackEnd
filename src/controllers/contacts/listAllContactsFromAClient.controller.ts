import { Request, Response } from "express";
import listAllContactsFromAClientService from "../../services/contacts/listAllContactsFromAClient.service";

const listAllContactsFromAClientController = async (
  req: Request,
  res: Response
) => {
  const clientId = req.params.id;
  const contacts = await listAllContactsFromAClientService(clientId);
  return res.status(200).json(contacts);
};

export default listAllContactsFromAClientController;
