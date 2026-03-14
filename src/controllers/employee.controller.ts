import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import response from "../utils/response";
import Employee from "../models/employee.model";
import ENV from "../utils/ENV";
import cloudinary from "../utils/cloudinary";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, ENV.SALT_BYCRYPT);

    let photoUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;
    }
    const employee = await Employee.create({
      email,
      password: hashPassword,
      name,
      role,
      photo: photoUrl,
    });
    const { password: _, ...employeeData } = employee.toObject();

    return response.successCreate(res, "berhasil buat user", 201, {
      employeeData,
    });
  } catch (error: any) {
    return response.serverError(res, error.message);
  }
};

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find().select("-password");
    response.successWithData(res, "berhasil dapetin semua user", {
      employees,
    });
  } catch (error) {
    return response.serverError(res, "gagal pas getAllEmployee");
  }
};
