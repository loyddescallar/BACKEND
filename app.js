import express from "express";
import "dotenv/config.js";
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/StudentRoutes.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/book", bookRoutes);
app.use("/tbl_student", studentRoutes);


try {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}...`);
  });
} catch (e) {
  console.error("❌ Error starting server:", e);
}
