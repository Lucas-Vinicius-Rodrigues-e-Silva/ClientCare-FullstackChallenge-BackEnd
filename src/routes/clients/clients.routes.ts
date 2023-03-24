import { Router } from "express";
import createClientController from "../../controllers/clients/createClients.controller";
import deleteClientsController from "../../controllers/clients/deleteClients.controller";
import listAllClientsFromAUserController from "../../controllers/clients/listAllClientsFromAUser.controller";
import listOneClientController from "../../controllers/clients/listOneClient.controller";
import updateClientController from "../../controllers/clients/updateClients.controller";
import { ensureClientExistsMiddleware } from "../../middlewares/clients/ensureClientExists.middleware";
import ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware from "../../middlewares/clients/ensureIsAdminOrIsTheUserWhoRegistredTheClient.middleware";
import { ensureUpdateClientItsNotExistentEmailMiddleware } from "../../middlewares/clients/ensureUpdateClienteItsNotExistentEmail.middleware";
import ensureAuthMiddleware from "../../middlewares/session/ensureAuth.middleware";
import ensureUserDataIsValid from "../../middlewares/users/ensureUserData.middleware";
import { clientSerializer } from "../../schemas/clients.schemas";

const clientRoutes = Router();

clientRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureUserDataIsValid(clientSerializer),
  createClientController
);

clientRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware,
  listOneClientController
);

clientRoutes.get("", ensureAuthMiddleware, listAllClientsFromAUserController);

clientRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureClientExistsMiddleware,
  ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware,
  ensureUpdateClientItsNotExistentEmailMiddleware,
  updateClientController
);

clientRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureClientExistsMiddleware,
  ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware,
  deleteClientsController
);

export default clientRoutes;
