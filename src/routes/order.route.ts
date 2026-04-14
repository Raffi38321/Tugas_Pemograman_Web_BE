import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
} from "../controllers/order.controller";
import verifyToken from "../middlewares/acl.middleware";
import isUserAuthorized from "../middlewares/rbac.middleware";
import Roles from "../utils/Role";

const orderRouter = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               status:
 *                 type: string
 *                 enum: [Done, Pending, Cancelled]
 *           example:
 *             items:
 *               - productId: "65e6789abcd12345e6789f"
 *                 quantity: 2
 *             status: "Done"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                   status:
 *                     type: string
 *                     enum: [Done, Pending, Cancelled]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */

orderRouter.get(
  "/",
  [verifyToken, isUserAuthorized([Roles.Admin, Roles.Owner])],
  getAllOrders,
);

orderRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Kasir, Roles.Barista]),
  ],
  createOrder,
);

orderRouter.delete(
  "/:id",
  [verifyToken, isUserAuthorized([Roles.Admin, Roles.Owner])],
  deleteOrder,
);

export default orderRouter;
