import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contacts.entity";
import { contactReturnedSerializer } from "../../schemas/contacts.schemas";
import { IContactRequest, IContactResponse } from "../../interfaces/contacts";

const createContactService = async (
  contactData: IContactRequest,
  clientId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id: clientId,
  });

  const contacts = await contactRepository.find({ withDeleted: true });

  const contactAlreadyExists = contacts.find(
    (contact) => contact.email === contactData.email
  );

  if (contactAlreadyExists) {
    throw new AppError("Contact already exists!", 409);
  }

  const createContact = contactRepository.create(contactData);
  createContact.clientWhoBelongs = client!;
  await contactRepository.save(createContact);

  const contactCorrectReturn = await contactReturnedSerializer.validate(
    createContact,
    {
      stripUnknown: true,
    }
  );

  return contactCorrectReturn;
};

export default createContactService;
