import mongoose, { Document, Schema } from "mongoose";
import TeamRepository from "@app/Service/TeamRepository";
import TeamTransformer, { TeamObject } from "@app/Service/TeamTransformer";
import Team from "@app/Model/Team";

export default class MongooseTeamRepository implements TeamRepository {
  private readonly Model: mongoose.Model<TeamObject & Document>;

  constructor(private transformer: TeamTransformer) {
    this.Model = mongoose.model<TeamObject & Document>(
      "teams",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        name: String,
        departmentId: String,
      }),
    );
  }

  async getById(id: string): Promise<Team> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }
  async remove(id: string): Promise<void> {
    const object = await this.Model.deleteOne({ id });
  }

  async getAll(): Promise<Team[]> {
    const objects = await this.Model.find({});
    return objects.map((object) => this.transformer.toEntity(object));
  }
  private instanceOrException(object: TeamObject | null): Team {
    if (object === null) {
      throw new Error("Team not found");
    }
    return this.transformer.toEntity(object);
  }

  async save(team: Team): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(team));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Team id Already Exists");
      }
    }
  }

  async update(team: Team): Promise<void> {
    const newDoc = this.transformer.toObject(team);
    this.Model.replaceOne({ id: newDoc.id }, newDoc);
  }
}
