import { Router } from "express";
import verifyToken from "../middlewares/acl.middleware";
import isUserAuthorized from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/reqBody.middleware";
import Roles from "../utils/Role";
import {
  createRawMaterial,
  deleteRawMaterialById,
  getAllRawMaterial,
  updateRawMaterialById,
} from "../controllers/rawMaterial.controller";
import {
  rawMaterialSchema,
  rawMaterialUpdateSchema,
} from "../validators/rawMaterial.validator";

const rawMaterialRouter = Router();

rawMaterialRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
    validate(rawMaterialSchema),
  ],
  createRawMaterial,
);
rawMaterialRouter.get(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
    validate(rawMaterialSchema),
  ],
  getAllRawMaterial,
);
rawMaterialRouter.put(
  "/:id",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
    validate(rawMaterialUpdateSchema),
  ],
  updateRawMaterialById,
);
rawMaterialRouter.delete(
  "/:id",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
  ],
  deleteRawMaterialById,
);

export default rawMaterialRouter;
