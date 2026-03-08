import type { Request, Response } from "express";
import response from "../utils/response.ts";
import Employee from "../models/employee.model.ts";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;
    // const employee = await Employee.create({ email, password, name, role });
    console.log(req.body);
  } catch (error: any) {
    return response.serverError(res, error.message);
  }
};
