import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type StudentAccessToken = {
  studentId: string;
  type: string;
};

export default function StudentAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header("Authorization") || "";
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY || "",
    ) as StudentAccessToken;
    // TODO: Check if type is "STUDENT_ACCESS_TOKEN"
    request.body.studentId = payload.studentId;
    next();
  } catch (e) {
    response.status(401).json({
      message: "Not authenticated",
    });
  }
}
