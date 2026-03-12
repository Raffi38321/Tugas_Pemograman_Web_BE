import mongoose from "mongoose";
import ENV from "../utils/ENV";

const connect = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URL);
    console.log("berhasil konek db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
