import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users";
import { getManyUsersSerializer } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<IUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const usersWithoutPassword = await getManyUsersSerializer.validate(users, {
    stripUnknown: true,
  });

  return usersWithoutPassword!;
};

export default listUsersService;
