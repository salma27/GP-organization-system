import Student from "@app/Model/Student";
import StudentRepository from "@app/Service/StudentRepository";
import * as mongoose from "mongoose";
import StudentTransformer, {
  StudentObject,
} from "@app/Service/StudentTransformer";
import { Document, Schema } from "mongoose";
import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";
import { students as seeds } from "@app/data";

export default class MongooseStudentRepository implements StudentRepository {
  private readonly Model: mongoose.Model<StudentObject & Document>;

  constructor(private transformer: StudentTransformer) {
    this.Model = mongoose.model<StudentObject & Document>(
      "students",
      new Schema({
        ecomId: {
          type: String,
          unique: true,
        },
        name: String,
        bio: String,
        departmentId: String,
        technologyIds: [String],
        passwordHash: String,
        teamId: String,
      }),
    );
    this.seedDatabase();
  }

  private async seedDatabase() {
    // await this.Model.deleteMany({});
    seeds.forEach((seed) => {
      // this.Model.create(seed);
    });
  }

  async save(student: Student): Promise<string> {
    try {
      const instance = new this.Model(this.transformer.toObject(student));
      const i = await instance.save();
      return i._id;
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Ecom Id Already Exists");
      }
    }
    return "";
  }
  async removeById(id: string): Promise<void> {
    await this.Model.deleteOne({ ecomId: id });
  }
  async update(student: Student): Promise<void> {
    await this.Model.updateOne(
      { ecomId: student.getEcomId() },
      { $set: this.transformer.toObject(student) },
    );
    // return this.transformer.toEntity(modelProject);
  }
  async updateId(student: Student, id: string): Promise<void> {
    await this.Model.updateOne(
      { ecomId: id },
      { $set: this.transformer.toObject(student) },
    );
    // return this.transformer.toEntity(modelProject);
  }
  async getByFilter(
    name: string | null,
    ecomId: string | null,
    technologyIds: string[] | null,
    departmentId: string | null,
  ): Promise<Student[]> {
    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };

    if (ecomId) filter.ecomId = { $regex: ecomId, $options: "i" };

    if (technologyIds) filter.technologyIds = { $in: technologyIds };

    if (departmentId) filter.departmentId = departmentId;

    const students = await this.Model.find(filter);
    // console.log(students);
    return await Promise.all(
      students.map(async (studObj) => this.transformer.toEntity(studObj)),
    );
  }

  async getCount(): Promise<number> {
    const supervisors = await this.Model.find({});
    return supervisors.length;
  }
  async getCountByDepartment(): Promise<any[]> {
    const counts = await this.Model.aggregate([
      { $group: { _id: "$departmentId", count: { $sum: 1 } } },
    ]);
    return counts;
  }
  async getTeamsByDepartment(): Promise<any[]> {
    const counts = await this.Model.aggregate([
      {
        $group: {
          _id: "$departmentId",
          d_count: { $sum: 1 },
        },
      },
      // { $sort: { departmentId: { $meta: "textScore" } } },
      // // { $sort: { count: -1 } },
      {
        $lookup: {
          from: "students",
          let: {
            departmentId: "$_id",
          },
          pipeline: [
            { $match: { $expr: { $eq: ["$departmentId", "$$departmentId"] } } },
            { $group: { _id: "$teamId", t_count: { $sum: 1 } } },
            { $match: { _id: { $ne: null }, t_count: { $gt: 1 } } },
            { $project: { name: "$_id", _id: 0 } },
          ],
          as: "teams",
        },
      },
      { $project: { count: { $size: "$teams" } } },
    ]);
    return counts;
  }
  async getTeamsCount(): Promise<number> {
    const counts = await this.Model.aggregate([
      {
        $group: {
          _id: "$teamId",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          _id: {
            $ne: null,
          },
          count: {
            $gt: 1,
          },
        },
      },
      {
        $project: {
          name: "$_id",
          _id: 0,
        },
      },
    ]);
    return counts.length;
  }
  async getSingleStudentsCount(): Promise<number> {
    const counts = await this.Model.aggregate([
      {
        $group: {
          _id: "$teamId",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          _id: {
            $ne: null,
          },
          count: {
            $lt: 2,
          },
        },
      },
      {
        $project: {
          name: "$_id",
          _id: 0,
        },
      },
    ]);
    return counts.length;
  }
  async getSingleStudentsByDepartment(): Promise<any[]> {
    const counts = await this.Model.aggregate([
      {
        $group: {
          _id: "$departmentId",
          d_count: { $sum: 1 },
        },
      },
      // // { $sort: { count: -1 } },
      // { $sort: { departmentId: { $meta: "textScore" } } },
      {
        $lookup: {
          from: "students",
          let: {
            departmentId: "$_id",
          },
          pipeline: [
            { $match: { $expr: { $eq: ["$departmentId", "$$departmentId"] } } },
            { $group: { _id: "$teamId", t_count: { $sum: 1 } } },
            { $match: { _id: { $ne: null }, t_count: { $lt: 2 } } },
            { $project: { name: "$_id", _id: 0 } },
          ],
          as: "teams",
        },
      },
      { $project: { count: { $size: "$teams" } } },
    ]);
    return counts;
  }
  async getById(ecomId: string): Promise<Student> {
    const object = await this.Model.findOne({ ecomId });
    return this.instanceOrException(object);
  }
  async getByTeamId(teamId: string): Promise<Student[]> {
    const objects = await this.Model.find({ teamId });
    return await Promise.all(objects.map((o) => this.transformer.toEntity(o)));
  }
  async getTeams(): Promise<string[]> {
    const objects = await this.Model.distinct("teamId");
    return objects;
  }

  private async instanceOrException(
    object: StudentObject | null,
  ): Promise<Student> {
    if (object === null) {
      throw new Error("Student not found");
    }
    return this.transformer.toEntity(object);
  }
}
