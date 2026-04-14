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
      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "employees" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file!.buffer);
      });
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

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return response.notFound(res, "employee ga ketemu");
    }

    response.success(res, "berhasil hapus employee");
  } catch (error) {
    return response.serverError(res, "gagal pas deletegetAllEmployee");
  }
};
