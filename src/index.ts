import express from "express";
import ENV from "./utils/ENV.ts";
import connect from "./services/Mongo.ts";
import employeeRouter from "./routes/employee.routes.ts";
import authRouter from "./routes/auth.route.ts";
import productRouter from "./routes/products.routes.ts";
import { setupSwagger } from "./utils/swagger.ts";

const PORT = ENV.PORT;
const app = express();

connect();
app.use(express.json());
app.use("/employees", employeeRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`jalan di port ${PORT}`);
});
