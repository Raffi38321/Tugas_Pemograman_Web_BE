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
 * tags:
 *   name: Orders
 *   description: Order management
 *
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns all orders sorted by newest first, with the ordering employee's name populated. Accessible by Admin and Owner only.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil dapetin semua order"
 *               data:
 *                 orders:
 *                   - _id: "65eabcd1234567890abcdef"
 *                     orderBy:
 *                       _id: "65eabcd1234567890abc000"
 *                       name: "Budi Kasir"
 *                     total: 75000
 *                     status: "Done"
 *                     items:
 *                       - productId: "65e6789abcd12345e6789f"
 *                         productName: "Caramel Macchiato"
 *                         quantity: 2
 *                         price: 35000
 *                     createdAt: "2024-03-05T10:00:00.000Z"
 *                     updatedAt: "2024-03-05T10:00:00.000Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only Admin and Owner
 *
 *   post:
 *     summary: Create a new order
 *     description: >
 *       Creates an order from a list of product IDs and quantities.
 *       The server calculates the total price and validates stock availability.
 *       Accessible by all authenticated roles.
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
 *                       example: "65e6789abcd12345e6789f"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               status:
 *                 type: string
 *                 enum: [Done, Pending, Cancelled]
 *                 default: Done
 *           example:
 *             items:
 *               - productId: "65e6789abcd12345e6789f"
 *                 quantity: 2
 *             status: "Done"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil buat orderan"
 *               data:
 *                 order:
 *                   _id: "65eabcd1234567890abcdef"
 *                   orderBy: "65eabcd1234567890abc000"
 *                   total: 70000
 *                   status: "Done"
 *                   items:
 *                     - productId: "65e6789abcd12345e6789f"
 *                       productName: "Caramel Macchiato"
 *                       quantity: 2
 *                       price: 35000
 *       400:
 *         description: Bad request — product not found or insufficient stock
 *       401:
 *         description: Unauthorized
 *
 * /orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     description: Permanently deletes an order. Accessible by Admin and Owner only.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the order
 *         example: "65eabcd1234567890abcdef"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil hapus order"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only Admin and Owner
 *       404:
 *         description: Order not found
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
