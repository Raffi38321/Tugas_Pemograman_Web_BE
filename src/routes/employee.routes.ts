import { Router } from "express";
import {
  createEmployee,
  getAllEmployee,
} from "../controllers/employee.controller.ts";
import { validate } from "../middlewares/reqBody.middleware.ts";
import { employeeSchema } from "../validators/employee.validator.ts";
import upload from "../middlewares/multer.middleware.ts";
import verifyToken from "../middlewares/acl.middleware.ts";
import isUserAuthorized from "../middlewares/rbac.middleware.ts";
import Roles from "../utils/Role.ts";

const employeeRouter = Router();

employeeRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner]),
    upload.single("photo"),
    validate(employeeSchema),
  ],
  createEmployee,
);

employeeRouter.get(
  "/",
  [verifyToken, isUserAuthorized([Roles.Admin, Roles.Owner])],
  getAllEmployee,
);

export default employeeRouter;
