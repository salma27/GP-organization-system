import mongoose, { Document, Schema } from "mongoose";
import PollHistory from "@app/Model/PollHistory";
import PollHistoryRepository from "@app/Service/PollHistoryRepository";
import PollHistoryTransformer, {
  PollHistoryObject,
} from "@app/Service/PollHistoryTransformer";

export default class MongoosePollHistoryRepository
  implements PollHistoryRepository
{
  private readonly Model: mongoose.Model<PollHistoryObject & Document>;

  constructor(private transformer: PollHistoryTransformer) {
    const schema = new Schema({
      id: {
        type: String,
        unique: true,
      },
      senderId: { type: String },
      receiverId: { type: String },
    });
    schema.index({ senderId: 1, receiverId: 1 }, { unique: true });
    this.Model = mongoose.model<PollHistoryObject & Document>(
      "pollHistory",
      schema,
    );
  }
  async save(pollHistory: PollHistory): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(pollHistory));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("Poll request Already Exists");
      }
    }
  }
  async remove(id: string): Promise<void> {
    try {
      await this.Model.deleteOne({ id });
    } catch (error) {
      throw new Error("Can't delete history");
    }
  }
  async getById(id: string): Promise<PollHistory> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }
  async getBySenderAndReceiver(
    senderId: string,
    receiverId: string,
  ): Promise<PollHistory> {
    const object = await this.Model.findOne({ senderId, receiverId });
    return this.instanceOrException(object);
  }

  private instanceOrException(object: PollHistoryObject | null): PollHistory {
    if (object === null) {
      throw new Error("PollHistory not found");
    }
    return this.transformer.toEntity(object);
  }
}
