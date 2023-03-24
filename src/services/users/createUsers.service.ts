import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { userReturnedSerializer } from "../../schemas/users.schemas";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({ withDeleted: true });

  const userAlreadyExists = users.find((user) => user.email === userData.email);

  if (userAlreadyExists) {
    throw new AppError("User already exists!", 409);
  }

  const createUser = userRepository.create(userData);
  await userRepository.save(createUser);

  const userCorrectReturn = await userReturnedSerializer.validate(createUser, {
    stripUnknown: true,
  });
  return userCorrectReturn;
};

export default createUserService;
