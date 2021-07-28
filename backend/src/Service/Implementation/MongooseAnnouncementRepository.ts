import AnnouncementRepository from "@app/Service/AnnouncementRepository";
import mongoose, { Document, Schema } from "mongoose";
import AnnouncementTransformer, {
  AnnouncementObject,
} from "@app/Service/AnnouncementTransformer";
import Announcement from "@app/Model/Announcement";

export default class MongooseAnnouncementRepository
  implements AnnouncementRepository
{
  private readonly Model: mongoose.Model<AnnouncementObject & Document>;

  constructor(private transformer: AnnouncementTransformer) {
    this.Model = mongoose.model<AnnouncementObject & Document>(
      "announcements",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        title: String,
        content: String,
        date: Date,
      }),
    );
    this.seedDatabase();
  }

  private async seedDatabase() {
    await this.Model.deleteMany({});
    const seeds: AnnouncementObject[] = [
      {
        id: "1",
        title: "title",
        content: "content",
        date: new Date(),
      },
    ];
    this.Model.create(seeds);
    // seeds.forEach((seed) => {
    // });
  }
  async save(announcement: Announcement): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(announcement));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Announcement Already Exists");
      }
    }
  }

  async getById(id: string): Promise<Announcement> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }

  async getAll(): Promise<Announcement[]> {
    const techs = await this.Model.find({});
    // console.log(techs);
    return await Promise.all(
      techs.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }

  private instanceOrException(
    technologyObject: AnnouncementObject | null,
  ): Announcement {
    if (technologyObject === null) {
      throw new Error("Announcement not found");
    }
    return this.transformer.toEntity(technologyObject);
  }
}
