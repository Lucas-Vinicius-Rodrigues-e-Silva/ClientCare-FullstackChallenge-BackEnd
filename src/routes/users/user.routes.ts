import { Router } from "express";
import { userSerializer } from "../../schemas/users.schemas";
import listUsersController from "../../controllers/users/listUsers.controller";
import createUserController from "../../controllers/users/createUsers.controller";
import ensureUserDataIsValid from "../../middlewares/users/ensureUserData.middleware";
import updateUserController from "../../controllers/users/updateUsers.controller";
import deleteUsersController from "../../controllers/users/deleteUsers.controller";
import ensureAuthMiddleware from "../../middlewares/session/ensureAuth.middleware";
import ensureUserIsAdmOrIsYourOwnIdMiddlware from "../../middlewares/users/ensureIsadmOrIsYourOwnId.middleware";
import listOneUserController from "../../controllers/users/listOneUser.controller";
import { ensureUserExistsMiddleware } from "../../middlewares/users/ensureUserExists.middleware";
import { ensureUpdateUserItsNotExistentEmailMiddleware } from "../../middlewares/users/ensureUpdateUserItsNotExistentEmail.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureUserDataIsValid(userSerializer),
  createUserController
);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  listUsersController
);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUserExistsMiddleware,
  listOneUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUserExistsMiddleware,
  ensureUpdateUserItsNotExistentEmailMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUserExistsMiddleware,
  deleteUsersController
);

export default userRoutes;
