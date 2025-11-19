import express from "express";
import "dotenv/config.js";
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/StudentRoutes.js";
import UserRoutes from "./routers/UserRoutes.js";
import cors from "cors";

const app = express();

// Enable CORS
let corsOptions = {
  origin: process.env.ORIGIN
};

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/book", bookRoutes);
app.use("/tbl_student", studentRoutes);
app.use("/tbl_user", UserRoutes);   // <-- FIXED HERE

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}...`);
});
