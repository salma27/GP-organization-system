import DepartmentRepository from "@app/Service/DepartmentRepository";
import mongoose, { Document, Schema } from "mongoose";
import DepartmentTransformer, {
  DepartmentObject,
} from "@app/Service/DepartmentTransformer";
import Department from "@app/Model/Department";

export default class MongooseDepartmentRepository
  implements DepartmentRepository
{
  private readonly Model: mongoose.Model<DepartmentObject & Document>;

  constructor(private transformer: DepartmentTransformer) {
    this.Model = mongoose.model<DepartmentObject & Document>(
      "departments",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        name: {
          type: String,
          unique: true,
          required: true,
        },
        maxNumberOfStudents: { type: Number, required: true },
        maxNumberOfSupervisors: { type: Number, required: true },
        minNumberOfStudents: { type: Number, required: true },
        minNumberOfSupervisors: { type: Number, required: true },
      }),
    );
    this.seedDatabase();
  }

  private async seedDatabase() {
    // await this.Model.deleteMany({});
    const seeds: DepartmentObject[] = [
      {
        id: "CS",
        name: "Computer Science",
        maxNumberOfStudents: 5,
        minNumberOfStudents: 2,
        maxNumberOfSupervisors: 2,
        minNumberOfSupervisors: 1,
      },
      {
        id: "IT",
        name: "Information Technology",
        maxNumberOfStudents: 6,
        minNumberOfStudents: 3,
        maxNumberOfSupervisors: 1,
        minNumberOfSupervisors: 1,
      },
      {
        id: "IS",
        name: "Information Systems",
        maxNumberOfStudents: 4,
        minNumberOfStudents: 2,
        maxNumberOfSupervisors: 3,
        minNumberOfSupervisors: 2,
      },
      {
        id: "DS",
        name: "Decision Support",
        maxNumberOfStudents: 3,
        minNumberOfStudents: 1,
        maxNumberOfSupervisors: 3,
        minNumberOfSupervisors: 2,
      },
    ];
    seeds.forEach((seed) => {
      // this.Model.create(seed);
    });
  }

  async save(dep: Department): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(dep));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Department Already Exists");
      }
    }
  }
  async update(dep: Department): Promise<void> {
    const modelProject = await this.Model.updateOne(
      { id: dep.getId() },
      { $set: this.transformer.toObject(dep) },
    );
  }
  async delete(id: string): Promise<void> {
    const object = await this.Model.findOne({ id });
    if (object === null) this.instanceOrException(object);
    await this.Model.deleteOne({ id });
  }
  async getAll(): Promise<Department[]> {
    const deps = await this.Model.find({});
    // console.log(deps);
    return await Promise.all(
      deps.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }

  async getById(id: string): Promise<Department> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }

  private instanceOrException(
    departmentObject: DepartmentObject | null,
  ): Department {
    if (departmentObject === null) {
      throw new Error("Department not found");
    }
    return this.transformer.toEntity(departmentObject);
  }
}
