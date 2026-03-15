import { Router } from "express";
import verifyToken from "../middlewares/acl.middleware";
import isUserAuthorized from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/reqBody.middleware";
import Roles from "../utils/Role";
import {
  createRawMaterial,
  deleteRawMaterialById,
  getAllRawMaterial,
  updateRawMaterialById,
} from "../controllers/rawMaterial.controller";
import {
  rawMaterialSchema,
  rawMaterialUpdateSchema,
} from "../validators/rawMaterial.validator";

const rawMaterialRouter = Router();

/**
 * @swagger
 * /raw-materials:
 *   post:
 *     summary: Create a new raw material
 *     tags: [Raw Materials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - unit
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *               stock:
 *                 type: number
 *           example:
 *             name: "Biji Kopi Arabica"
 *             unit: "kg"
 *             stock: 50
 *     responses:
 *       201:
 *         description: Raw material created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 *   get:
 *     summary: Get all raw materials
 *     tags: [Raw Materials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of raw materials
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /raw-materials/{id}:
 *   put:
 *     summary: Update raw material by ID
 *     tags: [Raw Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Raw Material ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *               stock:
 *                 type: number
 *           example:
 *             name: "Biji Kopi Arabica Bromo"
 *             unit: "kg"
 *             stock: 45
 *     responses:
 *       200:
 *         description: Raw material updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Raw material not found
 *
 *   delete:
 *     summary: Delete raw material by ID
 *     tags: [Raw Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Raw Material ID
 *     responses:
 *       200:
 *         description: Raw material deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Raw material not found
 */

rawMaterialRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
    validate(rawMaterialSchema),
  ],
  createRawMaterial,
);
rawMaterialRouter.get(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
  ],
  getAllRawMaterial,
);
rawMaterialRouter.put(
  "/:id",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
    validate(rawMaterialUpdateSchema),
  ],
  updateRawMaterialById,
);
rawMaterialRouter.delete(
  "/:id",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
  ],
  deleteRawMaterialById,
);

export default rawMaterialRouter;
