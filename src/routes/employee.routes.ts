import { Router } from "express";
import { createEmployee } from "../controllers/employee.controller.ts";
import { validate } from "../middlewares/reqBody.middleware.ts";
import { employeeSchema } from "../validators/employee.validator.ts";

const employeeRouter = Router();

employeeRouter.post("/", [validate(employeeSchema)], createEmployee);

export default employeeRouter;
