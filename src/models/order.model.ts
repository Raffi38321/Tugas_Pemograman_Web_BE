import mongoose, { Document, Schema } from "mongoose";

interface OrderT extends Document {
  orderBy: string;
  total: number;
  status: "Done" | "Pending" | "Cancelled";
  items: { productId: string; quantity: number; price: number }[];
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
      },
    ],
  },
  { timestamps: true },
);

const Order = mongoose.model<OrderT>("Order", orderSchema);

export default Order;
