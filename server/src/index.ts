import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/express-typescript"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
