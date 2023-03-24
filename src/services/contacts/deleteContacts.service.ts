import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";

const deleteContactService = async (contactToDeleteId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({
    id: contactToDeleteId,
  });
  findContact!.isActive = false;
  await contactRepository.update(contactToDeleteId, findContact!);
  await contactRepository.softRemove(findContact!);
};

export default deleteContactService;
