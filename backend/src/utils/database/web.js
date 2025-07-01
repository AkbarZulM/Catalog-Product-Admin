import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url"; // Tambahan
import { errorMiddleware } from "../../middlewares/error-middleware.js";
import { publicRouter } from "../../routes/public-api.js";
import { priveteRouter } from "../../routes/api.js";

// Buat __dirname secara manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const web = express();

web.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Perbaiki penggunaan __dirname
web.use(
  "/images",
  express.static(path.join(__dirname, "..", "..", "..", "public", "images"))
);

web.use(express.json());

web.use(publicRouter);
web.use(priveteRouter);
web.use(errorMiddleware);
