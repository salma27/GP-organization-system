import AdminRepository from "@app/Service/AdminRepository";
import mongoose, { Document, Schema } from "mongoose";
import AdminTransformer, { AdminObject } from "@app/Service/AdminTransformer";
import Admin from "@app/Model/Admin";
import bcrypt from "bcryptjs";

export default class MongooseAdminRepository implements AdminRepository {
  private readonly Model: mongoose.Model<AdminObject & Document>;

  constructor(private transformer: AdminTransformer) {
    this.Model = mongoose.model<AdminObject & Document>(
      "admins",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        username: {
          type: String,
          unique: true,
          required: true,
        },
        passwordHash: {
          type: String,
          required: true,
        },
      }),
    );
    this.seedDatabase();
  }

  private async seedDatabase() {
    try {
      await this.Model.deleteMany({});
      const passwordHash = await bcrypt.hash("password", 12);
      const seeds: AdminObject[] = [
        { id: "1234", username: "admin", passwordHash },
      ];
      seeds.forEach((seed) => {
        this.Model.create(seed);
      });
    } catch (error) {
      // console.log("error in admin seeding", error);
    }
  }

  async getById(id: string): Promise<Admin> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }
  async getByUsername(username: string): Promise<Admin> {
    const object = await this.Model.findOne({ username: username });
    return this.instanceOrException(object);
  }

  private instanceOrException(adminObject: AdminObject | null): Admin {
    if (adminObject === null) {
      throw new Error("Admin not found");
    }
    return this.transformer.toEntity(adminObject);
  }
}
