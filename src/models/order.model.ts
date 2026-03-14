import mongoose, { Document, Schema, Types } from "mongoose";

interface OrderT extends Document {
  orderBy: Types.ObjectId;
  total: number;
  status: "Done" | "Pending" | "Cancelled";
  items: {
    productId: string;
    quantity: number;
    price: number;
    productName: string;
  }[];
}

const orderSchema = new Schema<OrderT>(
  {
    orderBy: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Done", "Pending", "Cancelled"],
      default: "Done",
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
        productName: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const Order = mongoose.model<OrderT>("Order", orderSchema);

export default Order;
