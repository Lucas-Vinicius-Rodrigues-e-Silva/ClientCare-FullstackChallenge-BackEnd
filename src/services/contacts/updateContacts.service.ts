import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import {
  contactReturnedSerializer,
  contactUpdateSerializer,
} from "../../schemas/contacts.schemas";
import {
  IContactUpdateRequest,
  IContactResponse,
} from "../../interfaces/contacts";

const updateContactsService = async (
  contactData: IContactUpdateRequest,
  contactId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const getContactDataQueryBuilder =
    contactRepository.createQueryBuilder("contacts");

  const findContact = await getContactDataQueryBuilder
    .leftJoinAndSelect("contacts.clientWhoBelongs", "clients")
    .orderBy()
    .where("contacts.id = :id", { id: contactId })
    .getOne();
  const updateContact = contactRepository.create({
    ...findContact,
    ...contactData,
  });
  await contactRepository.save(updateContact);

  const correctContact = await contactReturnedSerializer.validate(
    updateContact,
    {
      stripUnknown: true,
    }
  );

  return correctContact!;
};

export default updateContactsService;
