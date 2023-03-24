import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { IContactResponse } from "../../interfaces/contacts";
import { getAllContactsFromAClientSerializer } from "../../schemas/contacts.schemas";

const listAllContactsFromAClientService = async (
  clientId: string
): Promise<IContactResponse[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const getAllContactsFromAClientQueryBuilder =
    contactRepository.createQueryBuilder("contacts");

  const findAllContacts = await getAllContactsFromAClientQueryBuilder
    .leftJoinAndSelect("contacts.clientWhoBelongs", "clients")
    .orderBy()
    .where("clients.id = :id", { id: clientId })
    .getMany();

  const correctContactsReturn =
    await getAllContactsFromAClientSerializer.validate(findAllContacts, {
      stripUnknown: true,
    });

  return correctContactsReturn!;
};

export default listAllContactsFromAClientService;
