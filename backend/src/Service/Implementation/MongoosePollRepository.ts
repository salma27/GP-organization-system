import mongoose, { Document, Schema } from "mongoose";
import Poll from "@app/Model/Poll";
import PollRepository from "@app/Service/PollRepository";
import PollTransformer, { PollObject } from "@app/Service/PollTransformer";

export default class MongoosePollRepository implements PollRepository {
  private readonly Model: mongoose.Model<PollObject & Document>;

  constructor(private transformer: PollTransformer) {
    this.Model = mongoose.model<PollObject & Document>(
      "polls",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        title: String,
        canRedo: Boolean,
        ownerId: String,
        teamSize: Number,
        option: Number,
        options: [
          new Schema({
            id: String,
            title: String,
            type: String,
            data: String,
          }),
        ],
        voteMap: [
          new Schema({
            studentId: String,
            pollOptionId: String,
          }),
        ],
      }),
    );
  }

  async getById(id: string): Promise<Poll> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }

  async getByTeamId(id: string): Promise<Poll[]> {
    const polls = await this.Model.find({ ownerId: id });
    return polls.map((poll) => this.transformer.toEntity(poll));
  }

  private instanceOrException(object: PollObject | null): Poll {
    if (object === null) {
      throw new Error("Poll not found");
    }
    return this.transformer.toEntity(object);
  }

  async save(poll: Poll): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(poll));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Poll id Already Exists");
      }
    }
  }

  async update(poll: Poll): Promise<void> {
    const newDoc = this.transformer.toObject(poll);
    // this.Model.replaceOne({ id: newDoc.id }, newDoc);
    await this.Model.updateOne({ id: newDoc.id }, { $set: newDoc });
  }
  async removeById(id: string): Promise<void> {
    await this.Model.deleteOne({ id: id });
  }
  async remove(id: string): Promise<void> {
    await this.Model.deleteMany({});
  }
  async getAllPollsForOwner(ownerId: string): Promise<Poll[]> {
    const polls = await this.Model.find({ ownerId });
    return polls.map((object) => this.transformer.toEntity(object));
  }
}
