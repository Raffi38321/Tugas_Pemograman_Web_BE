import express from "express";
import ENV from "./utils/ENV";
import connect from "./services/Mongo";
import employeeRouter from "./routes/employee.route";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/products.route";
import swaggerUi from "swagger-ui-express";
import orderRouter from "./routes/order.route";
import { swaggerSpec } from "./utils/swagger";
import rawMaterialRouter from "./routes/rawMaterial.route";

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
app.use("/raw-materials", rawMaterialRouter);

app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(PORT, () => {
  console.log(`jalan di port ${PORT}`);
});
