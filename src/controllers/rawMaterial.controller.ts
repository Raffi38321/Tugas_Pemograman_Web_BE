import type { Request, Response } from "express";
import response from "../utils/response";
import RawMaterial from "../models/rawMaterial.model";

export const createRawMaterial = async (req: Request, res: Response) => {
  try {
    const { name, unit, stock } = req.body;
    const rawMaterial = await RawMaterial.create({ name, unit, stock });
    if (!rawMaterial) {
      return response.serverError(res, "gagal buat raw material");
    }

    response.successCreate(res, "berhasil buat rawMaterial", 201, {
      rawMaterial,
    });
  } catch (error) {
    response.serverError(res, "server rusak createRawMaterial");
  }
};

export const getAllRawMaterial = async (req: Request, res: Response) => {
  try {
    const rawMaterials = await RawMaterial.find();
    response.successWithData(res, "berhasil ambil semua rawMaterials", {
      rawMaterials,
    });
  } catch (error) {
    response.serverError(res, "server rusak getAllRawMaterial");
  }
};

export const updateRawMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, unit, stock } = req.body;
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (stock !== undefined) updateData.stock = stock;
    if (unit !== undefined) updateData.unit = unit;
    const rawMaterial = await RawMaterial.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!rawMaterial) {
      return response.notFound(res, "rawmaterial ga ada");
    }
    response.successWithData(res, "berhasil update rawMaterial", {
      rawMaterial,
    });
  } catch (error) {
    return response.serverError(res, "gagal pas updateRawMaterialById");
  }
};

export const deleteRawMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rawMaterial = await RawMaterial.findByIdAndDelete(id);
    if (!rawMaterial) {
      return response.notFound(res, "rawmaterial ga ada");
    }

    response.success(res, "berhasil hapus raw Material");
  } catch (error) {
    return response.serverError(res, "gagal pas deleteRawMaterialById");
  }
};
