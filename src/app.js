import express from "express";
import { STATUS } from "./constants/statusCodes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sendResponse } from "./utils/sendResponse.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  sendResponse(res, STATUS.OK, "Backend Working", {
    data: "hello",
    yourIp: `${req.ip}`,
  });
  // throw new AppError('User not found', STATUS.NOT_FOUND);
});

// this must be at end of the file
app.use(errorHandler);
export default app;
