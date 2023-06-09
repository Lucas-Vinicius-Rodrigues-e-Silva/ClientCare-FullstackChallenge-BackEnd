import "dotenv/config";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import ISessionRequest from "../../interfaces/session";
import { userReturnedSerializer } from "../../schemas/users.schemas";

const createSessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  const allUsers = await userRepository.find({ withDeleted: true });
  const findUser = await allUsers.find((users) => users.email === email);

  if (!findUser) {
    throw new AppError("Invalid credentials!", 403);
  }

  if (findUser.isActive === false) {
    throw new AppError("User is not active!", 400);
  }

  const passwordMatch = await compare(password, findUser.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials!", 403);
  }

  const token = jwt.sign(
    {
      isActive: findUser.isActive,
      isAdm: findUser.isAdm,
    },
    process.env.SECRET_KEY!,
    {
      subject: String(findUser.id),
      expiresIn: "24h",
    }
  );

  const correctUserReturn = await userReturnedSerializer.validate(findUser, {
    stripUnknown: true,
  });

  const data = { token: token, user: correctUserReturn };

  return data;
};

export default createSessionService;
