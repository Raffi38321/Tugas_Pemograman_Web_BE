import type { Response } from "express";

const response = {
  serverError: (res: Response, message: String) => {
    return res.status(500).json({ status: "failed", message, data: null });
  },
  clientError: (res: Response, message: String) => {
    return res.status(400).json({ status: "failed", message, data: null });
  },
};

export default response;
