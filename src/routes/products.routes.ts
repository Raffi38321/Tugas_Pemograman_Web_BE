import { Router } from "express";
import verifyToken from "../middlewares/acl.middleware.ts";
import isUserAuthorized from "../middlewares/rbac.middleware.ts";
import Roles from "../utils/Role.ts";
import { validate } from "../middlewares/reqBody.middleware.ts";
import { productSchema } from "../validators/product.validator.ts";
import upload from "../middlewares/multer.middleware.ts";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller.ts";

const productRouter = Router();

productRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Kasir]),
    upload.single("photo"),
    validate(productSchema),
  ],
  createProduct,
);

productRouter.get(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Kasir]),
  ],
  getAllProduct,
);

export default productRouter;
