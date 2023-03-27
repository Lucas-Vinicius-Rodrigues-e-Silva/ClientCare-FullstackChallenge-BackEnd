import { Request, Response } from "express";
import ISessionRequest from "../../interfaces/session";
import createSessionService from "../../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const sessionData: ISessionRequest = req.body;
  const tokenAndUser = await createSessionService(sessionData);
  return res.json(tokenAndUser);
};

export default createSessionController;
