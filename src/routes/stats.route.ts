import { Router } from "express";
import verifyToken from "../middlewares/acl.middleware";
import { getStats } from "../controllers/stats.controller";

const statsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Dashboard statistics
 *
 * /stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: >
 *       Returns aggregated statistics for the dashboard including product counts,
 *       raw material stock levels, employee count, monthly order/revenue comparison,
 *       5 most recent orders, top 5 best-selling products, and a 7-day daily
 *       revenue/order chart dataset. Requires a valid Bearer token.
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "succes"
 *               message: "berhasil dapetin statistik"
 *               data:
 *                 products:
 *                   total: 10
 *                   available: 8
 *                 rawMaterials:
 *                   total: 15
 *                   lowStock: 3
 *                 employees:
 *                   total: 5
 *                 orders:
 *                   thisMonth: 120
 *                   lastMonth: 98
 *                 revenue:
 *                   thisMonth: 3500000
 *                   lastMonth: 2800000
 *                 recentOrders:
 *                   - _id: "65eabcd1234567890abcdef"
 *                     total: 75000
 *                     status: "Done"
 *                     orderBy:
 *                       name: "Budi Kasir"
 *                     createdAt: "2024-03-05T10:00:00.000Z"
 *                 topProducts:
 *                   - _id: "Caramel Macchiato"
 *                     totalSold: 120
 *                 chart:
 *                   labels: ["29 Mei", "30 Mei", "31 Mei", "1 Jun", "2 Jun", "3 Jun", "4 Jun"]
 *                   revenue: [150000, 200000, 0, 320000, 180000, 250000, 400000]
 *                   orders: [3, 4, 0, 6, 3, 5, 8]
 *       401:
 *         description: Unauthorized — token missing or invalid
 */
statsRouter.get("/", [verifyToken], getStats);

export default statsRouter;
