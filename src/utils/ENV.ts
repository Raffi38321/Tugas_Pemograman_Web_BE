import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || "",
};

export default ENV;
