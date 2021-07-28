import { Request } from "express";
import { Schema } from "joi";

export default class JoiService {
  public static async validateRequest(request: Request, schema: Schema) {
    await schema.options({ allowUnknown: true }).validateAsync(request.body);
  }
}
