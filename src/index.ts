import express from "express";
import ENV from "./utils/ENV";
import connect from "./services/Mongo";
import employeeRouter from "./routes/employee.route";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/products.route";
import { setupSwagger } from "./utils/swagger";
import orderRouter from "./routes/order.route";

const PORT = ENV.PORT;
const app = express();

connect();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "server jalan" });
});
app.use("/employees", employeeRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`jalan di port ${PORT}`);
});
