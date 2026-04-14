import { Router } from "express";
import verifyToken from "../middlewares/acl.middleware";
import { getStats } from "../controllers/stats.controller";

const statsRouter = Router();

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
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
 *                 recentOrders: []
 *                 topProducts: []
 *       401:
 *         description: Unauthorized
 */
statsRouter.get("/", [verifyToken], getStats);

export default statsRouter;
