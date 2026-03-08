import express from "express";
import ENV from "./utils/ENV.ts";
import connect from "./services/Mongo.ts";
import employeeRouter from "./routes/employee.routes.ts";

const PORT = ENV.PORT;
const app = express();

// connect();
app.use(express.json());
app.use("/employees", employeeRouter);

app.listen(PORT, () => {
  console.log(`jalan di port ${PORT}`);
});
