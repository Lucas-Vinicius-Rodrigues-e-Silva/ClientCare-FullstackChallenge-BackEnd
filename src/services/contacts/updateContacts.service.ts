import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { contactUpdateSerializer } from "../../schemas/contacts.schemas";
import {
  IContactUpdateRequest,
  IContactResponse,
} from "../../interfaces/contacts";

const updateContactsService = async (
  contactData: IContactUpdateRequest,
  contactId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({ id: contactId });
  const updateContact = contactRepository.create({
    ...findContact,
    ...contactData,
  });
  await contactRepository.save(updateContact);

  const correctContact = await contactUpdateSerializer.validate(updateContact, {
    stripUnknown: true,
  });

  return correctContact!;
};

export default updateContactsService;
