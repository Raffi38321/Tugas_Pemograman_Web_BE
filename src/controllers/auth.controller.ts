import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import response from "../utils/response";
import Employee from "../models/employee.model";
import ENV from "../utils/ENV";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return response.notFound(res, "user gaketemu");
    }
    const isPasswordCorrect = await bcrypt.compare(password, employee.password);

    if (!isPasswordCorrect) {
      return response.clientError(res, "password salah");
    }
    const token = jwt.sign(
      { employeeId: employee._id, employeeRole: employee.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES as any },
    );

    response.successWithData(res, "berhasil bikin token", { token });
  } catch (error) {
    response.serverError(res, "error di login");
  }
};

export const meController = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).employee;
    const employee = await Employee.findById(userId);
    if (!employee) {
      return response.notFound(res, "user gaketemu");
    }
    const { password: _, ...employeeData } = employee.toObject();
    response.successWithData(res, "berhasil dapet data user", {
      employee: employeeData,
    });
  } catch (error) {
    response.serverError(res, "error dapetin data employee");
  }
};
