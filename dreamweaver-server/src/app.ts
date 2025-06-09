import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/config";
import routes from "../src/modules/routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins = [
  "https://dreamweaver-6bh5dngzp-adedamolabasits-projects.vercel.app",
  "https://dreamweaver-six.vercel.app",
  "http://localhost:3000", 
];

app.use(
  cors({
    origin: (incomingOrigin, callback) => {
      if (!incomingOrigin) return callback(null, true);
      if (allowedOrigins.includes(incomingOrigin)) {
        return callback(null, true);
      }
      callback(
        new Error(`CORS policy: Origin ${incomingOrigin} not allowed`),
        false
      );
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(config.morgan.format));
}

app.use("/api/v1", routes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use(errorHandler as express.ErrorRequestHandler);

export default app;
