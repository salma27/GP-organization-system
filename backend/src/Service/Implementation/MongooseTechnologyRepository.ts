import TechnologyRepository from "@app/Service/TechnologyRepository";
import mongoose, { Document, Schema } from "mongoose";
import TechnologyTransformer, {
  TechnologyObject,
} from "@app/Service/TechnologyTransformer";
import Technology from "@app/Model/Technology";

export default class MongooseTechnologyRepository
  implements TechnologyRepository
{
  private readonly Model: mongoose.Model<TechnologyObject & Document>;

  constructor(private transformer: TechnologyTransformer) {
    this.Model = mongoose.model<TechnologyObject & Document>(
      "technologies",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        name: String,
      }),
    );
    this.seedDatabase();
  }

  private async seedDatabase() {
    // await this.Model.deleteMany({});
    // const seeds: TechnologyObject[] = [
    //   { id: "REACT", name: "React JS" },
    //   { id: "TYPESCRIPT", name: "Typescript" },
    //   { id: "JAVA", name: "Java" },
    //   { id: "CPP", name: "C++" },
    //   { id: "PYTHON", name: "Python" },
    // ];
    // this.Model.create(seeds);
    // seeds.forEach((seed) => {
    // });
  }

  async getById(id: string): Promise<Technology> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }

  async getAll(): Promise<Technology[]> {
    const techs = await this.Model.find({});
    // console.log(techs);
    return await Promise.all(
      techs.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }

  private instanceOrException(
    technologyObject: TechnologyObject | null,
  ): Technology {
    if (technologyObject === null) {
      throw new Error("Technology not found");
    }
    return this.transformer.toEntity(technologyObject);
  }
  async save(tech: Technology): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(tech));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Technology Already Exists");
      }
    }
  }
  async update(tech: Technology, id: string): Promise<void> {
    const modelProject = await this.Model.updateOne(
      { id: id },
      { $set: this.transformer.toObject(tech) },
    );
  }
  async delete(id: string): Promise<void> {
    const object = await this.Model.findOne({ id });
    if (object === null) this.instanceOrException(object);
    await this.Model.deleteOne({ id });
  }
}
