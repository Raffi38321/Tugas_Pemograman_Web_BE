import { Router } from "express";
import { createEmployee } from "../controllers/employee.controller.ts";
import { validate } from "../middlewares/reqBody.middleware.ts";
import { employeeSchema } from "../validators/employee.validator.ts";
import upload from "../middlewares/multer.middleware.ts";

const employeeRouter = Router();

employeeRouter.post(
  "/",
  [upload.single("photo"), validate(employeeSchema)],
  createEmployee,
);

export default employeeRouter;
