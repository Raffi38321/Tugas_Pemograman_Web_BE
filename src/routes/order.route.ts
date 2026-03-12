import { Router } from "express";
import { validate } from "../middlewares/reqBody.middleware";
import isUserAuthorized from "../middlewares/rbac.middleware";
import Roles from "../utils/Role";
import { orderSchema } from "../validators/order.validator";
import verifyToken from "../middlewares/acl.middleware";
import { createOrder } from "../controllers/order.controller";

const orderRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

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
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: The ID of the product
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product to order
 *               status:
 *                 type: string
 *                 enum: [Done, Pending, Cancelled]
 *                 description: Order status (optional)
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request (validation error or insufficient stock)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
orderRouter.post(
  "/",
  [
    verifyToken,
    isUserAuthorized([Roles.Admin, Roles.Owner, Roles.Barista, Roles.Barista]),
    validate(orderSchema),
  ],
  createOrder,
);

export default orderRouter;
