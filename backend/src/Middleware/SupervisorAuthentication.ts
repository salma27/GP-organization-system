import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type SupervisorAccessToken = {
  supervisorId: string;
  userType: number;
  type: string;
};

export default function SupervisorAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header("Authorization") || "";
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY || "",
    ) as SupervisorAccessToken;
    // TODO: Check if type is "STUDENT_ACCESS_TOKEN"
    request.body.supervisorId = payload.supervisorId;
    request.body.userType = payload.userType;
    next();
  } catch (e) {
    response.status(401).json({
      message: "Not authenticated",
    });
  }
}
