import type { Request, Response } from "express";
import response from "../utils/response";
import Product from "../models/product.model";
import Order from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, status } = req.body;
    const { userId } = (req as any).employee;

    let total = 0;
    let barang = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return response.notFound(res, "barang gak ada");
      }

      if (item.quantity > product.stock) {
        return response.clientError(res, "stok barang gak cukup");
      }

      total += item.quantity * product.price;
      barang.push({
        productId: product._id,
        price: product.price,
        quantity: item.quantity,
        productName: product.name,
      });
    }

    const orderData: any = {
      orderBy: userId,
      items: barang,
      total,
    };
    if (status) orderData.status = status;

    const order = await Order.create(orderData);

    response.successCreate(res, "berhasil buat orderan", 201, { order });
  } catch (error) {
    response.serverError(res, "error pas createOrder");
  }
};
