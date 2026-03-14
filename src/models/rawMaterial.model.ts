import mongoose, { Document, Schema } from "mongoose";

interface rawMaterialT extends Document {
  name: string;
  stock: number;
  unit: string;
}

const rawMaterialSchema = new Schema<rawMaterialT>(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true },
);

const RawMaterial = mongoose.model<rawMaterialT>(
  "Raw_Material",
  rawMaterialSchema,
);

export default RawMaterial;
