import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type AdminAccessToken = {
  adminId: string;
  type: string;
};

export default function AdminAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header("Authorization") || "";
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY || "",
    ) as AdminAccessToken;
    // TODO: Check if type is "STUDENT_ACCESS_TOKEN"
    request.body.adminId = payload.adminId;
    next();
  } catch (e) {
    response.status(401).json({
      message: "Not authenticated",
    });
  }
}
