import { Router } from "express";
import { validate } from "../middlewares/reqBody.middleware.ts";
import { loginSchema } from "../validators/auth.validator.ts";
import {
  loginController,
  meController,
} from "../controllers/auth.controller.ts";
import verifyToken from "../middlewares/acl.middleware.ts";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), loginController);
authRouter.get("/me", [verifyToken], meController);

export default authRouter;
