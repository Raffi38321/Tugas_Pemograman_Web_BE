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
    response.successWithData(res, "berhasil dapetin semua product", {
      products,
    });
  } catch (error) {
    return response.serverError(res, "gagal pas getAllProduct");
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, isAvailable, stock } = req.body;
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) {
      updateData.stock = stock;
      if (stock === 0) {
        updateData.isAvailable = false;
      }
    }
    if (isAvailable !== undefined) {
      updateData.isAvailable = isAvailable;
    }
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) {
      return response.notFound(res, "product ga ada");
    }
    return response.successWithData(res, "berhasil update product", {
      product,
    });
  } catch (error) {
    return response.serverError(res, "gagal pas updateProductById");
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return response.notFound(res, "product ga ketemu");
    }

    response.success(res, "berhasil hapus product");
  } catch (error) {
    return response.serverError(res, "gagal pas deleteProductById");
  }
};
