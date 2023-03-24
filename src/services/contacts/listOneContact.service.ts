import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { IContactResponse } from "../../interfaces/contacts";
import { contactReturnedSerializer } from "../../schemas/contacts.schemas";

const listOneContactService = async (
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

  const contactReturnedData = await contactReturnedSerializer.validate(
    findContact,
    {
      stripUnknown: true,
    }
  );

  return contactReturnedData!;
};

export default listOneContactService;
