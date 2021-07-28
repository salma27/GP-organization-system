import Supervisor, { SupervisorType } from "@app/Model/Supervisor";
import SupervisorRepository from "@app/Service/SupervisorRepository";
import * as mongoose from "mongoose";
import SupervisorTransformer, {
  SupervisorObject,
} from "@app/Service/SupervisorTransformer";
import { Document, Schema } from "mongoose";
import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";
import { supervisors as seeds } from "@app/data";
export default class MongooseSupervisorRepository
  implements SupervisorRepository
{
  private readonly model: mongoose.Model<SupervisorObject & Document>;

  constructor(private transformer: SupervisorTransformer) {
    this.model = mongoose.model<SupervisorObject & Document>(
      "supervisors",
      new Schema({
        id: { type: String, required: true, unique: true },
        ecomId: { type: String, required: true, unique: true },
        name: { type: String },
        bio: { type: String },
        passwordHash: { type: String },
        teamsSlots: { type: Number },
        teams: { type: [String] },
        type: { type: Number },
        technologies: { type: [String] },
        department: { type: String },
      }),
    );
    this.seedDatabase();
  }

  private async seedDatabase() {
    // await this.model.deleteMany({});
    seeds.forEach((seed: SupervisorObject) => {
      // this.model.create(seed);
    });
  }
  async save(supervisor: Supervisor): Promise<void> {
    try {
      const instance = new this.model(this.transformer.toObject(supervisor));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Ecom Id Already Exists");
      }
    }
  }

  async deleteWithId(ecomId: string): Promise<void> {
    const object = await this.model.deleteOne({ ecomId });
  }
  async getByFilter(
    name: string | null,
    ecomId: string | null,
    technologyIds: string[] | null,
    departmentId: string | null,
    type: SupervisorType,
  ): Promise<Supervisor[]> {
    const filter: any = { type };

    if (name) filter.name = { $regex: name, $options: "i" };

    if (ecomId) filter.ecomId = { $regex: ecomId, $options: "i" };

    if (technologyIds) filter.technologies = { $in: technologyIds };

    if (departmentId) filter.department = departmentId;

    const supervisors = await this.model.find(filter);
    // console.log(supervisors);
    return await Promise.all(
      supervisors.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }

  async getById(ecomId: string): Promise<Supervisor> {
    const object = await this.model.findOne({ ecomId });
    return this.instanceOrException(object);
  }

  async getTeachingAssistants(): Promise<Supervisor[]> {
    const supervisors = await this.model.find({ type: SupervisorType.TA });
    // console.log("TAs: ", supervisors);
    return await Promise.all(
      supervisors.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }
  async getDoctors(): Promise<Supervisor[]> {
    try {
      const supervisors = await this.model.find({
        type: SupervisorType.DOCTOR,
      });
      // console.log(supervisors);
      return await Promise.all(
        supervisors.map(async (obj) => this.transformer.toEntity(obj)),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getByTeamId(teamId: string): Promise<Supervisor[]> {
    try {
      const supervisors = await this.model.find({ teams: { $in: [teamId] } });
      return await Promise.all(
        supervisors.map(async (obj) => this.transformer.toEntity(obj)),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getDrByTeamId(teamId: string): Promise<Supervisor[]> {
    try {
      const supervisors = await this.model.find({
        teams: { $in: [teamId] },
        type: SupervisorType.DOCTOR,
      });
      return await Promise.all(
        supervisors.map(async (obj) => this.transformer.toEntity(obj)),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getCountByType(type: SupervisorType): Promise<number> {
    const supervisors = await this.model.find({ type });
    return supervisors.length;
  }
  async getCountByDepartment(type: SupervisorType): Promise<any[]> {
    const counts = await this.model.aggregate([
      { $match: { type } },
      { $group: { _id: "$department", count: { $sum: 1 } } },
      // { $sort: { department: { $meta: "textScore" } } },
    ]);
    return counts;
  }
  async getAvailableByDepartment(type: SupervisorType): Promise<any[]> {
    const counts = await this.model.aggregate([
      {
        $project: {
          teams: 1,
          teamsSlots: 1,
          department: 1,
          type: 1,
          availableSlots: { $cmp: [{ $size: "$teams" }, "$teamsSlots"] },
        },
      },
      { $match: { type: type, availableSlots: { $lt: 0 } } },
      { $group: { _id: "$department", count: { $sum: 1 } } },
      // { $sort: { department: { $meta: "textScore" } } },
    ]);
    return counts;
  }
  async getAvailableCount(type: SupervisorType): Promise<number> {
    const counts = await this.model.aggregate([
      {
        $project: {
          teams: 1,
          teamsSlots: 1,
          type: 1,
          availableSlots: { $cmp: [{ $size: "$teams" }, "$teamsSlots"] },
        },
      },
      {
        $match: {
          type: type,
          availableSlots: {
            $lt: 0,
          },
        },
      },
    ]);
    return counts.length;
  }

  async getTaByTeamId(teamId: string): Promise<Supervisor[]> {
    try {
      const supervisors = await this.model.find({
        teams: { $in: [teamId] },
        type: SupervisorType.TA,
      });
      return await Promise.all(
        supervisors.map(async (obj) => this.transformer.toEntity(obj)),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  private async instanceOrException(
    object: SupervisorObject | null,
  ): Promise<Supervisor> {
    if (object === null) {
      throw new Error("Supervisor not found");
    }
    return this.transformer.toEntity(object);
  }
  async update(Supervisor: Supervisor): Promise<void> {
    const modelSupervisor = await this.model.updateOne(
      { ecomId: Supervisor.getEcomId() },
      { $set: this.transformer.toObject(Supervisor) },
    );
  }
  async updateId(Supervisor: Supervisor, id: string): Promise<void> {
    const modelSupervisor = await this.model.updateOne(
      { ecomId: id },
      { $set: this.transformer.toObject(Supervisor) },
    );
  }
}
