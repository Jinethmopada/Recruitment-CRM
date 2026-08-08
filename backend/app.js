import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Recruit CRM API is running"
  });
});

export default app;