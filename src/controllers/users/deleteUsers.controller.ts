import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUsers.service";

const deleteUsersController = async (req: Request, res: Response) => {
  const deleteUserId: string = req.params.id;
  await deleteUserService(deleteUserId);
  return res.status(204).json({ message: "User deleted with sucessfull!" });
};

export default deleteUsersController;
