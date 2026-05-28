import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
} from "../controllers/employee.controller";
import { validate } from "../middlewares/reqBody.middleware";
import { employeeSchema } from "../validators/employee.validator";
import upload from "../middlewares/multer.middleware";
import verifyToken from "../middlewares/acl.middleware";
import isUserAuthorized from "../middlewares/rbac.middleware";
import Roles from "../utils/Role";

const employeeRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management — Admin and Owner only
 *
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee account with an optional profile photo uploaded to Cloudinary. Password is hashed before storage. Accessible by Admin and Owner only.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Joko Barista"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joko@kopi.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "passwordsuperkuat"
 *               role:
 *                 type: string
 *                 enum: [Admin, Owner, Barista, Kasir]
 *                 example: "Barista"
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil buat user"
 *               data:
 *                 employeeData:
 *                   _id: "65e6789abcd1234567890ef"
 *                   name: "Joko Barista"
 *                   email: "joko@kopi.com"
 *                   role: "Barista"
 *                   photo: "https://res.cloudinary.com/.../joko.jpg"
 *                   createdAt: "2024-03-05T12:00:00.000Z"
 *                   updatedAt: "2024-03-05T12:00:00.000Z"
 *                   __v: 0
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only Admin and Owner
 *
 *   get:
 *     summary: Get all employees
 *     description: Returns all employees without their password field. Accessible by Admin and Owner only.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil dapetin semua user"
 *               data:
 *                 employees:
 *                   - _id: "65eabcd1234567890abcdef"
 *                     name: "Budi Admin"
 *                     email: "admin@kopi.com"
 *                     role: "Admin"
 *                     photo: null
 *                     createdAt: "2024-03-05T10:00:00.000Z"
 *                     updatedAt: "2024-03-05T10:00:00.000Z"
 *                     __v: 0
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only Admin and Owner
 *
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     description: Permanently deletes an employee account. Accessible by Admin and Owner only.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the employee
 *         example: "65e6789abcd1234567890ef"
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil hapus employee"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only Admin and Owner
 *       404:
 *         description: Employee not found
 */

employeeRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner]),
    upload.single("photo"),
    validate(employeeSchema),
  ],
  createEmployee,
);

employeeRouter.get(
  "/",
  [verifyToken, isUserAuthorized([Roles.Admin, Roles.Owner])],
  getAllEmployee,
);

employeeRouter.delete(
  "/:id",
  [verifyToken, isUserAuthorized([Roles.Admin, Roles.Owner])],
  deleteEmployee,
);

export default employeeRouter;
