import NotificationRepository from "@app/Service/NotificationRepository";
import mongoose, { Document, Schema } from "mongoose";
import NotificationTransformer, {
  NotificationObject,
} from "@app/Service/NotificationTransformer";
import Notification from "@app/Model/Notification";

export default class MongooseNotificationRepository
  implements NotificationRepository
{
  private readonly Model: mongoose.Model<NotificationObject & Document>;

  constructor(private transformer: NotificationTransformer) {
    this.Model = mongoose.model<NotificationObject & Document>(
      "notifications",
      new Schema({
        id: {
          type: String,
          unique: true,
        },
        date: { type: Date },
        isRead: { type: Boolean },
        title: { type: String },
        content: { type: String },
        ownerId: { type: String },
      }),
    );
  }
  async save(notification: Notification): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(notification));
      await instance.save();
    } catch (error) {
      if (error.description === "MongoError" && error.code === 11000) {
        throw new Error("Already Exists");
      }
    }
  }
  async update(notification: Notification): Promise<void> {
    const modelNotification = await this.Model.updateOne(
      { id: notification.getId() },
      { $set: this.transformer.toObject(notification) },
    );
    // return this.transformer.toEntity(modelNotification);
  }
  async getById(id: string): Promise<Notification> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }

  async getByOwnerId(id: string): Promise<Notification[]> {
    const object = await this.Model.find({ ownerId: id });
    return object.map((o) => this.transformer.toEntity(o));
  }
  async deleteAllByOwnerId(id: string): Promise<void> {
    await this.Model.deleteMany({ ownerId: id });
  }
  async readAllByOwnerId(id: string): Promise<void> {
    await this.Model.updateMany({ ownerId: id }, { $set: { isRead: true } });
  }
  async deleteOneById(id: string): Promise<void> {
    await this.Model.deleteOne({ id: id });
  }
  async readOneById(id: string): Promise<void> {
    await this.Model.updateOne({ id: id }, { $set: { isRead: true } });
  }
  private instanceOrException(
    adminObject: NotificationObject | null,
  ): Notification {
    if (adminObject === null) {
      throw new Error("Notification not found");
    }
    return this.transformer.toEntity(adminObject);
  }
}
