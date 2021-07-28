import Joi from "joi";
import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminRepository from "@app/Service/AdminRepository";

const PasswordValidation = Joi.string().min(8).max(255).required();

export default class AdminController {
  constructor(private adminRepository: AdminRepository) {}

  async login(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        username: Joi.string().required(),
        password: PasswordValidation,
      }),
    );
    const { username, password } = request.body;
    try {
      const admin = await this.adminRepository.getByUsername(username);
      if (!(await bcrypt.compare(password, admin.getPasswordHash()))) {
        throw new Error();
      }
      const token = await jwt.sign(
        {
          adminId: admin.getId(),
          type: "ADMIN_ACCESS_TOKEN",
        },
        process.env.JWT_KEY || "",
      );
      response.json({
        token,
        adminId: admin.getId()
      });
    } catch (e) {
      response.status(400).json({
        message: "Wrong credentials",
      });
    }
  }
}
