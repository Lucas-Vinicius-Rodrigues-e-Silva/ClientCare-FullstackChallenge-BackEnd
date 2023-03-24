import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (userToDeleteId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: userToDeleteId });
  findUser!.isActive = false;
  await userRepository.update(userToDeleteId, findUser!);
  await userRepository.softRemove(findUser!);
};

export default deleteUserService;
