import { Request, Response } from "express";
import listOneUserService from "../../services/users/listOneUser.service";

const listOneUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const userReturned = await listOneUserService(userId);
  return res.status(200).json(userReturned);
};

export default listOneUserController;
