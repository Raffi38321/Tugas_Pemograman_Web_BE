import type { Request, Response } from "express";
import response from "../utils/response";
import cloudinary from "../utils/cloudinary";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, isAvailable } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        stream.end(req.file!.buffer);
      });

      photoUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      isAvailable: Boolean(isAvailable),
      photo: photoUrl,
    });

    response.successCreate(res, "berhasil buat product", 201, { product });
  } catch (error) {
    console.log(error);
    response.serverError(res, "gagal pas buat product");
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    response.successCreate(res, "berhasil dapetin semua product", 200, {
      products,
    });
  } catch (error) {
    return response.serverError(res, "gagal pas getAllProduct");
  }
};
