import type { Request, Response } from "express";
import response from "../utils/response";
import Product from "../models/product.model";
import RawMaterial from "../models/rawMaterial.model";
import Employee from "../models/employee.model";
import Order from "../models/order.model";

export const getStats = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    // last 7 days for daily chart
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);

    const [
      totalProducts,
      availableProducts,
      totalRawMaterials,
      lowStockMaterials,
      totalEmployees,
      ordersThisMonth,
      ordersLastMonth,
      revenueThisMonth,
      revenueLastMonth,
      recentOrders,
      topProducts,
      dailyRevenue,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isAvailable: true }),
      RawMaterial.countDocuments(),
      RawMaterial.countDocuments({ stock: { $lt: 10 } }),
      Employee.countDocuments(),
      Order.countDocuments({
        status: "Done",
        createdAt: { $gte: startOfMonth },
      }),
      Order.countDocuments({
        status: "Done",
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      }),
      Order.aggregate([
        { $match: { status: "Done", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Order.aggregate([
        {
          $match: {
            status: "Done",
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
          },
        },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).populate("orderBy", "name"),
      Order.aggregate([
        { $match: { status: "Done" } },
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productName",
            totalSold: { $sum: "$items.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
      ]),
      Order.aggregate([
        { $match: { status: "Done", createdAt: { $gte: last7Days } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            revenue: { $sum: "$total" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    // fill missing days with 0
    const dailyMap: Record<string, { revenue: number; count: number }> = {};
    for (const d of dailyRevenue) {
      dailyMap[d._id] = { revenue: d.revenue, count: d.count };
    }
    const chartLabels: string[] = [];
    const chartRevenue: number[] = [];
    const chartOrders: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });
      chartLabels.push(label);
      chartRevenue.push(dailyMap[key]?.revenue ?? 0);
      chartOrders.push(dailyMap[key]?.count ?? 0);
    }

    const revenueNow = revenueThisMonth[0]?.total ?? 0;
    const revenuePrev = revenueLastMonth[0]?.total ?? 0;

    response.successWithData(res, "berhasil dapetin statistik", {
      products: { total: totalProducts, available: availableProducts },
      rawMaterials: { total: totalRawMaterials, lowStock: lowStockMaterials },
      employees: { total: totalEmployees },
      orders: { thisMonth: ordersThisMonth, lastMonth: ordersLastMonth },
      revenue: { thisMonth: revenueNow, lastMonth: revenuePrev },
      recentOrders,
      topProducts,
      chart: {
        labels: chartLabels,
        revenue: chartRevenue,
        orders: chartOrders,
      },
    });
  } catch (error) {
    response.serverError(res, "gagal dapetin statistik");
  }
};
