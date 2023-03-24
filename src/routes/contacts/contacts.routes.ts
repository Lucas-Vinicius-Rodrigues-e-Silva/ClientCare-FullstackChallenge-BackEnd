import { Router } from "express";
import createContactController from "../../controllers/contacts/createContacts.controller";
import deleteContactsController from "../../controllers/contacts/deleteContacts.controller";
import listAllContactsFromAClientController from "../../controllers/contacts/listAllContactsFromAClient.controller";
import listOneContactController from "../../controllers/contacts/listOneContact.controller";
import updateContactController from "../../controllers/contacts/updateContact.controller";
import { ensureClientExistsMiddleware } from "../../middlewares/clients/ensureClientExists.middleware";
import ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware from "../../middlewares/clients/ensureIsAdminOrIsTheUserWhoRegistredTheClient.middleware";
import { ensureContactExistsMiddleware } from "../../middlewares/contacts/ensureContactExists.middleware";
import { ensureUpdateContactItsNotExistentEmailMiddleware } from "../../middlewares/contacts/ensureUpdateContactItsNotExistentEmail.middleware";
import ensureAuthMiddleware from "../../middlewares/session/ensureAuth.middleware";
import ensureUserDataIsValid from "../../middlewares/users/ensureUserData.middleware";
import { contactSerializer } from "../../schemas/contacts.schemas";

const contactRoutes = Router();

contactRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware,
  ensureClientExistsMiddleware,
  ensureUserDataIsValid(contactSerializer),
  createContactController
);

contactRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureContactExistsMiddleware,
  listOneContactController
);

contactRoutes.get(
  "/client/:id",
  ensureAuthMiddleware,
  ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware,
  ensureClientExistsMiddleware,
  listAllContactsFromAClientController
);

contactRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureContactExistsMiddleware,
  ensureUpdateContactItsNotExistentEmailMiddleware,
  updateContactController
);

contactRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureContactExistsMiddleware,
  deleteContactsController
);

export default contactRoutes;
