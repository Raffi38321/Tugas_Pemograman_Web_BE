import mongoose, { Document, Schema } from "mongoose";
import Roles from "../utils/Role";

const roles = ["Admin", "Owner", "Barista", "Kasir"] as const;
type Role = (typeof roles)[number];
interface EmployeeT extends Document {
  name: string;
  role: Role;
  password: string;
  email: string;
  photo?: string | null;
}

const employeeSchema = new Schema<EmployeeT>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: roles,
      default: Roles.Admin,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Employee = mongoose.model<EmployeeT>("Employee", employeeSchema);

export default Employee;
